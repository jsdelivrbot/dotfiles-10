Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.$range = $range;
exports.$file = $file;
exports.copySelection = copySelection;
exports.getPathOfMessage = getPathOfMessage;
exports.getActiveTextEditor = getActiveTextEditor;
exports.getEditorsMap = getEditorsMap;
exports.filterMessages = filterMessages;
exports.filterMessagesByRangeOrPoint = filterMessagesByRangeOrPoint;
exports.openFile = openFile;
exports.visitMessage = visitMessage;
exports.openExternally = openExternally;
exports.sortMessages = sortMessages;
exports.sortSolutions = sortSolutions;
exports.applySolution = applySolution;

var _atom = require('atom');

var _electron = require('electron');

var lastPaneItem = null;
var severityScore = {
  error: 3,
  warning: 2,
  info: 1
};

exports.severityScore = severityScore;
var severityNames = {
  error: 'Error',
  warning: 'Warning',
  info: 'Info'
};
exports.severityNames = severityNames;
var WORKSPACE_URI = 'atom://linter-ui-default';

exports.WORKSPACE_URI = WORKSPACE_URI;

function $range(message) {
  return message.version === 1 ? message.range : message.location.position;
}

function $file(message) {
  return message.version === 1 ? message.filePath : message.location.file;
}

function copySelection() {
  var selection = getSelection();
  if (selection) {
    atom.clipboard.write(selection.toString());
  }
}

function getPathOfMessage(message) {
  return atom.project.relativizePath($file(message) || '')[1];
}

function getActiveTextEditor() {
  var paneItem = atom.workspace.getCenter().getActivePaneItem();
  var paneIsTextEditor = atom.workspace.isTextEditor(paneItem);
  if (!paneIsTextEditor && paneItem && lastPaneItem && paneItem.getURI && paneItem.getURI() === WORKSPACE_URI && (!lastPaneItem.isAlive || lastPaneItem.isAlive())) {
    paneItem = lastPaneItem;
  } else {
    lastPaneItem = paneItem;
  }
  return atom.workspace.isTextEditor(paneItem) ? paneItem : null;
}

function getEditorsMap(editors) {
  var editorsMap = {};
  var filePaths = [];
  for (var entry of editors.editors) {
    var filePath = entry.textEditor.getPath();
    if (editorsMap[filePath]) {
      editorsMap[filePath].editors.push(entry);
    } else {
      editorsMap[filePath] = {
        added: [],
        removed: [],
        editors: [entry]
      };
      filePaths.push(filePath);
    }
  }
  return { editorsMap: editorsMap, filePaths: filePaths };
}

function filterMessages(messages, filePath) {
  var severity = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var filtered = [];
  messages.forEach(function (message) {
    if ((filePath === null || $file(message) === filePath) && (!severity || message.severity === severity)) {
      filtered.push(message);
    }
  });
  return filtered;
}

function filterMessagesByRangeOrPoint(messages, filePath, rangeOrPoint) {
  var filtered = [];
  var expectedRange = rangeOrPoint.constructor.name === 'Point' ? new _atom.Range(rangeOrPoint, rangeOrPoint) : _atom.Range.fromObject(rangeOrPoint);
  messages.forEach(function (message) {
    var file = $file(message);
    var range = $range(message);
    if (file && range && file === filePath && range.intersectsWith(expectedRange)) {
      filtered.push(message);
    }
  });
  return filtered;
}

function openFile(file, position) {
  var options = {};
  options.searchAllPanes = true;
  if (position) {
    options.initialLine = position.row;
    options.initialColumn = position.column;
  }
  atom.workspace.open(file, options);
}

function visitMessage(message) {
  var reference = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var messageFile = undefined;
  var messagePosition = undefined;
  if (reference) {
    if (message.version !== 2) {
      console.warn('[Linter-UI-Default] Only messages v2 are allowed in jump to reference. Ignoring');
      return;
    }
    if (!message.reference || !message.reference.file) {
      console.warn('[Linter-UI-Default] Message does not have a valid reference. Ignoring');
      return;
    }
    messageFile = message.reference.file;
    messagePosition = message.reference.position;
  } else {
    var messageRange = $range(message);
    messageFile = $file(message);
    if (messageRange) {
      messagePosition = messageRange.start;
    }
  }
  if (messageFile) {
    openFile(messageFile, messagePosition);
  }
}

function openExternally(message) {
  if (message.version === 2 && message.url) {
    _electron.shell.openExternal(message.url);
  }
}

function sortMessages(sortInfo, rows) {
  var sortColumns = {};

  sortInfo.forEach(function (entry) {
    sortColumns[entry.column] = entry.type;
  });

  return rows.slice().sort(function (a, b) {
    if (sortColumns.severity) {
      var multiplyWith = sortColumns.severity === 'asc' ? 1 : -1;
      var severityA = severityScore[a.severity];
      var severityB = severityScore[b.severity];
      if (severityA !== severityB) {
        return multiplyWith * (severityA > severityB ? 1 : -1);
      }
    }
    if (sortColumns.linterName) {
      var multiplyWith = sortColumns.linterName === 'asc' ? 1 : -1;
      var sortValue = a.severity.localeCompare(b.severity);
      if (sortValue !== 0) {
        return multiplyWith * sortValue;
      }
    }
    if (sortColumns.file) {
      var multiplyWith = sortColumns.file === 'asc' ? 1 : -1;
      var fileA = getPathOfMessage(a);
      var fileALength = fileA.length;
      var fileB = getPathOfMessage(b);
      var fileBLength = fileB.length;
      if (fileALength !== fileBLength) {
        return multiplyWith * (fileALength > fileBLength ? 1 : -1);
      } else if (fileA !== fileB) {
        return multiplyWith * fileA.localeCompare(fileB);
      }
    }
    if (sortColumns.line) {
      var multiplyWith = sortColumns.line === 'asc' ? 1 : -1;
      var rangeA = $range(a);
      var rangeB = $range(b);
      if (rangeA && !rangeB) {
        return 1;
      } else if (rangeB && !rangeA) {
        return -1;
      } else if (rangeA && rangeB) {
        if (rangeA.start.row !== rangeB.start.row) {
          return multiplyWith * (rangeA.start.row > rangeB.start.row ? 1 : -1);
        }
        if (rangeA.start.column !== rangeB.start.column) {
          return multiplyWith * (rangeA.start.column > rangeB.start.column ? 1 : -1);
        }
      }
    }

    return 0;
  });
}

function sortSolutions(solutions) {
  return solutions.slice().sort(function (a, b) {
    return b.priority - a.priority;
  });
}

function applySolution(textEditor, version, solution) {
  if (solution.apply) {
    solution.apply();
    return true;
  }
  var range = version === 1 ? solution.range : solution.position;
  var currentText = version === 1 ? solution.oldText : solution.currentText;
  var replaceWith = version === 1 ? solution.newText : solution.replaceWith;
  if (currentText) {
    var textInRange = textEditor.getTextInBufferRange(range);
    if (currentText !== textInRange) {
      console.warn('[linter-ui-default] Not applying fix because text did not match the expected one', 'expected', currentText, 'but got', textInRange);
      return false;
    }
  }
  textEditor.setTextInBufferRange(range, replaceWith);
  return true;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUVzQixNQUFNOzt3QkFDTixVQUFVOztBQUtoQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7QUFDaEIsSUFBTSxhQUFhLEdBQUc7QUFDM0IsT0FBSyxFQUFFLENBQUM7QUFDUixTQUFPLEVBQUUsQ0FBQztBQUNWLE1BQUksRUFBRSxDQUFDO0NBQ1IsQ0FBQTs7O0FBRU0sSUFBTSxhQUFhLEdBQUc7QUFDM0IsT0FBSyxFQUFFLE9BQU87QUFDZCxTQUFPLEVBQUUsU0FBUztBQUNsQixNQUFJLEVBQUUsTUFBTTtDQUNiLENBQUE7O0FBQ00sSUFBTSxhQUFhLEdBQUcsMEJBQTBCLENBQUE7Ozs7QUFFaEQsU0FBUyxNQUFNLENBQUMsT0FBc0IsRUFBVztBQUN0RCxTQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUE7Q0FDekU7O0FBQ00sU0FBUyxLQUFLLENBQUMsT0FBc0IsRUFBVztBQUNyRCxTQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUE7Q0FDeEU7O0FBQ00sU0FBUyxhQUFhLEdBQUc7QUFDOUIsTUFBTSxTQUFTLEdBQUcsWUFBWSxFQUFFLENBQUE7QUFDaEMsTUFBSSxTQUFTLEVBQUU7QUFDYixRQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtHQUMzQztDQUNGOztBQUNNLFNBQVMsZ0JBQWdCLENBQUMsT0FBc0IsRUFBVTtBQUMvRCxTQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FB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QUMvQixDQUFDLENBQUE7Q0FDSDs7QUFFTSxTQUFTLGFBQWEsQ0FBQyxVQUFzQixFQUFFLE9BQWMsRUFBRSxRQUFnQixFQUFXO0FBQy9GLE1BQUksUUFBUSxDQUFDLEtBQUssRUFBRTtBQUNsQixZQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7QUFDaEIsV0FBTyxJQUFJLENBQUE7R0FDWjtBQUNELE1BQU0sS0FBSyxHQUFHLE9BQU8sS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFBO0FBQ2hFLE1BQU0sV0FBVyxHQUFHLE9BQU8sS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFBO0FBQzNFLE1BQU0sV0FBVyxHQUFHLE9BQU8sS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFBO0FBQzNFLE1BQUksV0FBVyxFQUFFO0FBQ2YsUUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzFELFFBQUksV0FBVyxLQUFLLFdBQVcsRUFBRTtBQUMvQixhQUFPLENBQUMsSUFBSSxDQUNWLGtGQUFrRixFQUNsRixVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxXQUFXLENBQ1osQ0FBQTtBQUNELGFBQU8sS0FBSyxDQUFBO0tBQ2I7R0FDRjtBQUNELFlBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDbkQsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiIvVXNlcnMvQ3Jpc0Zvcm5vL2RvdGZpbGVzLy5hdG9tL3BhY2thZ2VzL2xpbnRlci11aS1kZWZhdWx0L2xpYi9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgc2hlbGwgfSBmcm9tICdlbGVjdHJvbidcbmltcG9ydCB0eXBlIHsgUG9pbnQsIFRleHRFZGl0b3IgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHR5cGUgRWRpdG9ycyBmcm9tICcuL2VkaXRvcnMnXG5pbXBvcnQgdHlwZSB7IExpbnRlck1lc3NhZ2UgfSBmcm9tICcuL3R5cGVzJ1xuXG5sZXQgbGFzdFBhbmVJdGVtID0gbnVsbFxuZXhwb3J0IGNvbnN0IHNldmVyaXR5U2NvcmUgPSB7XG4gIGVycm9yOiAzLFxuICB3YXJuaW5nOiAyLFxuICBpbmZvOiAxLFxufVxuXG5leHBvcnQgY29uc3Qgc2V2ZXJpdHlOYW1lcyA9IHtcbiAgZXJyb3I6ICdFcnJvcicsXG4gIHdhcm5pbmc6ICdXYXJuaW5nJyxcbiAgaW5mbzogJ0luZm8nLFxufVxuZXhwb3J0IGNvbnN0IFdPUktTUEFDRV9VUkkgPSAnYXRvbTovL2xpbnRlci11aS1kZWZhdWx0J1xuXG5leHBvcnQgZnVuY3Rpb24gJHJhbmdlKG1lc3NhZ2U6IExpbnRlck1lc3NhZ2UpOiA/T2JqZWN0IHtcbiAgcmV0dXJuIG1lc3NhZ2UudmVyc2lvbiA9PT0gMSA/IG1lc3NhZ2UucmFuZ2UgOiBtZXNzYWdlLmxvY2F0aW9uLnBvc2l0aW9uXG59XG5leHBvcnQgZnVuY3Rpb24gJGZpbGUobWVzc2FnZTogTGludGVyTWVzc2FnZSk6ID9zdHJpbmcge1xuICByZXR1cm4gbWVzc2FnZS52ZXJzaW9uID09PSAxID8gbWVzc2FnZS5maWxlUGF0aCA6IG1lc3NhZ2UubG9jYXRpb24uZmlsZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTZWxlY3Rpb24oKSB7XG4gIGNvbnN0IHNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbigpXG4gIGlmIChzZWxlY3Rpb24pIHtcbiAgICBhdG9tLmNsaXBib2FyZC53cml0ZShzZWxlY3Rpb24udG9TdHJpbmcoKSlcbiAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhPZk1lc3NhZ2UobWVzc2FnZTogTGludGVyTWVzc2FnZSk6IHN0cmluZyB7XG4gIHJldHVybiBhdG9tLnByb2plY3QucmVsYXRpdml6ZVBhdGgoJGZpbGUobWVzc2FnZSkgfHwgJycpWzFdXG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVGV4dEVkaXRvcigpOiA/VGV4dEVkaXRvciB7XG4gIGxldCBwYW5lSXRlbSA9IGF0b20ud29ya3NwYWNlLmdldENlbnRlcigpLmdldEFjdGl2ZVBhbmVJdGVtKClcbiAgY29uc3QgcGFuZUlzVGV4dEVkaXRvciA9IGF0b20ud29ya3NwYWNlLmlzVGV4dEVkaXRvcihwYW5lSXRlbSlcbiAgaWYgKFxuICAgICFwYW5lSXNUZXh0RWRpdG9yICYmXG4gICAgcGFuZUl0ZW0gJiZcbiAgICBsYXN0UGFuZUl0ZW0gJiZcbiAgICBwYW5lSXRlbS5nZXRVUkkgJiZcbiAgICBwYW5lSXRlbS5nZXRVUkkoKSA9PT0gV09SS1NQQUNFX1VSSSAmJlxuICAgICghbGFzdFBhbmVJdGVtLmlzQWxpdmUgfHwgbGFzdFBhbmVJdGVtLmlzQWxpdmUoKSlcbiAgKSB7XG4gICAgcGFuZUl0ZW0gPSBsYXN0UGFuZUl0ZW1cbiAgfSBlbHNlIHtcbiAgICBsYXN0UGFuZUl0ZW0gPSBwYW5lSXRlbVxuICB9XG4gIHJldHVybiBhdG9tLndvcmtzcGFjZS5pc1RleHRFZGl0b3IocGFuZUl0ZW0pID8gcGFuZUl0ZW0gOiBudWxsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZGl0b3JzTWFwKGVkaXRvcnM6IEVkaXRvcnMpOiB7IGVkaXRvcnNNYXA6IE9iamVjdCwgZmlsZVBhdGhzOiBBcnJheTxzdHJpbmc+IH0ge1xuICBjb25zdCBlZGl0b3JzTWFwID0ge31cbiAgY29uc3QgZmlsZVBhdGhzID0gW11cbiAgZm9yIChjb25zdCBlbnRyeSBvZiBlZGl0b3JzLmVkaXRvcnMpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGVudHJ5LnRleHRFZGl0b3IuZ2V0UGF0aCgpXG4gICAgaWYgKGVkaXRvcnNNYXBbZmlsZVBhdGhdKSB7XG4gICAgICBlZGl0b3JzTWFwW2ZpbGVQYXRoXS5lZGl0b3JzLnB1c2goZW50cnkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGVkaXRvcnNNYXBbZmlsZVBhdGhdID0ge1xuICAgICAgICBhZGRlZDogW10sXG4gICAgICAgIHJlbW92ZWQ6IFtdLFxuICAgICAgICBlZGl0b3JzOiBbZW50cnldLFxuICAgICAgfVxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpXG4gICAgfVxuICB9XG4gIHJldHVybiB7IGVkaXRvcnNNYXAsIGZpbGVQYXRocyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJNZXNzYWdlcyhcbiAgbWVzc2FnZXM6IEFycmF5PExpbnRlck1lc3NhZ2U+LFxuICBmaWxlUGF0aDogP3N0cmluZyxcbiAgc2V2ZXJpdHk6ID9zdHJpbmcgPSBudWxsLFxuKTogQXJyYXk8TGludGVyTWVzc2FnZT4ge1xuICBjb25zdCBmaWx0ZXJlZCA9IFtdXG4gIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIGlmICgoZmlsZVBhdGggPT09IG51bGwgfHwgJGZpbGUobWVzc2FnZSkgPT09IGZpbGVQYXRoKSAmJiAoIXNldmVyaXR5IHx8IG1lc3NhZ2Uuc2V2ZXJpdHkgPT09IHNldmVyaXR5KSkge1xuICAgICAgZmlsdGVyZWQucHVzaChtZXNzYWdlKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGZpbHRlcmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJNZXNzYWdlc0J5UmFuZ2VPclBvaW50KFxuICBtZXNzYWdlczogU2V0PExpbnRlck1lc3NhZ2U+IHwgQXJyYXk8TGludGVyTWVzc2FnZT4sXG4gIGZpbGVQYXRoOiBzdHJpbmcsXG4gIHJhbmdlT3JQb2ludDogUG9pbnQgfCBSYW5nZSxcbik6IEFycmF5PExpbnRlck1lc3NhZ2U+IHtcbiAgY29uc3QgZmlsdGVyZWQgPSBbXVxuICBjb25zdCBleHBlY3RlZFJhbmdlID1cbiAgICByYW5nZU9yUG9pbnQuY29uc3RydWN0b3IubmFtZSA9PT0gJ1BvaW50JyA/IG5ldyBSYW5nZShyYW5nZU9yUG9pbnQsIHJhbmdlT3JQb2ludCkgOiBSYW5nZS5mcm9tT2JqZWN0KHJhbmdlT3JQb2ludClcbiAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc3QgZmlsZSA9ICRmaWxlKG1lc3NhZ2UpXG4gICAgY29uc3QgcmFuZ2UgPSAkcmFuZ2UobWVzc2FnZSlcbiAgICBpZiAoZmlsZSAmJiByYW5nZSAmJiBmaWxlID09PSBmaWxlUGF0aCAmJiByYW5nZS5pbnRlcnNlY3RzV2l0aChleHBlY3RlZFJhbmdlKSkge1xuICAgICAgZmlsdGVyZWQucHVzaChtZXNzYWdlKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGZpbHRlcmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuRmlsZShmaWxlOiBzdHJpbmcsIHBvc2l0aW9uOiA/UG9pbnQpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHt9XG4gIG9wdGlvbnMuc2VhcmNoQWxsUGFuZXMgPSB0cnVlXG4gIGlmIChwb3NpdGlvbikge1xuICAgIG9wdGlvbnMuaW5pdGlhbExpbmUgPSBwb3NpdGlvbi5yb3dcbiAgICBvcHRpb25zLmluaXRpYWxDb2x1bW4gPSBwb3NpdGlvbi5jb2x1bW5cbiAgfVxuICBhdG9tLndvcmtzcGFjZS5vcGVuKGZpbGUsIG9wdGlvbnMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdE1lc3NhZ2UobWVzc2FnZTogTGludGVyTWVzc2FnZSwgcmVmZXJlbmNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgbGV0IG1lc3NhZ2VGaWxlXG4gIGxldCBtZXNzYWdlUG9zaXRpb25cbiAgaWYgKHJlZmVyZW5jZSkge1xuICAgIGlmIChtZXNzYWdlLnZlcnNpb24gIT09IDIpIHtcbiAgICAgIGNvbnNvbGUud2FybignW0xpbnRlci1VSS1EZWZhdWx0XSBPbmx5IG1lc3NhZ2VzIHYyIGFyZSBhbGxvd2VkIGluIGp1bXAgdG8gcmVmZXJlbmNlLiBJZ25vcmluZycpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFtZXNzYWdlLnJlZmVyZW5jZSB8fCAhbWVzc2FnZS5yZWZlcmVuY2UuZmlsZSkge1xuICAgICAgY29uc29sZS53YXJuKCdbTGludGVyLVVJLURlZmF1bHRdIE1lc3NhZ2UgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZmVyZW5jZS4gSWdub3JpbmcnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG1lc3NhZ2VGaWxlID0gbWVzc2FnZS5yZWZlcmVuY2UuZmlsZVxuICAgIG1lc3NhZ2VQb3NpdGlvbiA9IG1lc3NhZ2UucmVmZXJlbmNlLnBvc2l0aW9uXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbWVzc2FnZVJhbmdlID0gJHJhbmdlKG1lc3NhZ2UpXG4gICAgbWVzc2FnZUZpbGUgPSAkZmlsZShtZXNzYWdlKVxuICAgIGlmIChtZXNzYWdlUmFuZ2UpIHtcbiAgICAgIG1lc3NhZ2VQb3NpdGlvbiA9IG1lc3NhZ2VSYW5nZS5zdGFydFxuICAgIH1cbiAgfVxuICBpZiAobWVzc2FnZUZpbGUpIHtcbiAgICBvcGVuRmlsZShtZXNzYWdlRmlsZSwgbWVzc2FnZVBvc2l0aW9uKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuRXh0ZXJuYWxseShtZXNzYWdlOiBMaW50ZXJNZXNzYWdlKTogdm9pZCB7XG4gIGlmIChtZXNzYWdlLnZlcnNpb24gPT09IDIgJiYgbWVzc2FnZS51cmwpIHtcbiAgICBzaGVsbC5vcGVuRXh0ZXJuYWwobWVzc2FnZS51cmwpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRNZXNzYWdlcyhcbiAgc29ydEluZm86IEFycmF5PHsgY29sdW1uOiBzdHJpbmcsIHR5cGU6ICdhc2MnIHwgJ2Rlc2MnIH0+LFxuICByb3dzOiBBcnJheTxMaW50ZXJNZXNzYWdlPixcbik6IEFycmF5PExpbnRlck1lc3NhZ2U+IHtcbiAgY29uc3Qgc29ydENvbHVtbnM6IHtcbiAgICBzZXZlcml0eT86ICdhc2MnIHwgJ2Rlc2MnLFxuICAgIGxpbnRlck5hbWU/OiAnYXNjJyB8ICdkZXNjJyxcbiAgICBmaWxlPzogJ2FzYycgfCAnZGVzYycsXG4gICAgbGluZT86ICdhc2MnIHwgJ2Rlc2MnLFxuICB9ID0ge31cblxuICBzb3J0SW5mby5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgc29ydENvbHVtbnNbZW50cnkuY29sdW1uXSA9IGVudHJ5LnR5cGVcbiAgfSlcblxuICByZXR1cm4gcm93cy5zbGljZSgpLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIGlmIChzb3J0Q29sdW1ucy5zZXZlcml0eSkge1xuICAgICAgY29uc3QgbXVsdGlwbHlXaXRoID0gc29ydENvbHVtbnMuc2V2ZXJpdHkgPT09ICdhc2MnID8gMSA6IC0xXG4gICAgICBjb25zdCBzZXZlcml0eUEgPSBzZXZlcml0eVNjb3JlW2Euc2V2ZXJpdHldXG4gICAgICBjb25zdCBzZXZlcml0eUIgPSBzZXZlcml0eVNjb3JlW2Iuc2V2ZXJpdHldXG4gICAgICBpZiAoc2V2ZXJpdHlBICE9PSBzZXZlcml0eUIpIHtcbiAgICAgICAgcmV0dXJuIG11bHRpcGx5V2l0aCAqIChzZXZlcml0eUEgPiBzZXZlcml0eUIgPyAxIDogLTEpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0Q29sdW1ucy5saW50ZXJOYW1lKSB7XG4gICAgICBjb25zdCBtdWx0aXBseVdpdGggPSBzb3J0Q29sdW1ucy5saW50ZXJOYW1lID09PSAnYXNjJyA/IDEgOiAtMVxuICAgICAgY29uc3Qgc29ydFZhbHVlID0gYS5zZXZlcml0eS5sb2NhbGVDb21wYXJlKGIuc2V2ZXJpdHkpXG4gICAgICBpZiAoc29ydFZhbHVlICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBtdWx0aXBseVdpdGggKiBzb3J0VmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvcnRDb2x1bW5zLmZpbGUpIHtcbiAgICAgIGNvbnN0IG11bHRpcGx5V2l0aCA9IHNvcnRDb2x1bW5zLmZpbGUgPT09ICdhc2MnID8gMSA6IC0xXG4gICAgICBjb25zdCBmaWxlQSA9IGdldFBhdGhPZk1lc3NhZ2UoYSlcbiAgICAgIGNvbnN0IGZpbGVBTGVuZ3RoID0gZmlsZUEubGVuZ3RoXG4gICAgICBjb25zdCBmaWxlQiA9IGdldFBhdGhPZk1lc3NhZ2UoYilcbiAgICAgIGNvbnN0IGZpbGVCTGVuZ3RoID0gZmlsZUIubGVuZ3RoXG4gICAgICBpZiAoZmlsZUFMZW5ndGggIT09IGZpbGVCTGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBtdWx0aXBseVdpdGggKiAoZmlsZUFMZW5ndGggPiBmaWxlQkxlbmd0aCA/IDEgOiAtMSlcbiAgICAgIH0gZWxzZSBpZiAoZmlsZUEgIT09IGZpbGVCKSB7XG4gICAgICAgIHJldHVybiBtdWx0aXBseVdpdGggKiBmaWxlQS5sb2NhbGVDb21wYXJlKGZpbGVCKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29ydENvbHVtbnMubGluZSkge1xuICAgICAgY29uc3QgbXVsdGlwbHlXaXRoID0gc29ydENvbHVtbnMubGluZSA9PT0gJ2FzYycgPyAxIDogLTFcbiAgICAgIGNvbnN0IHJhbmdlQSA9ICRyYW5nZShhKVxuICAgICAgY29uc3QgcmFuZ2VCID0gJHJhbmdlKGIpXG4gICAgICBpZiAocmFuZ2VBICYmICFyYW5nZUIpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAocmFuZ2VCICYmICFyYW5nZUEpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9IGVsc2UgaWYgKHJhbmdlQSAmJiByYW5nZUIpIHtcbiAgICAgICAgaWYgKHJhbmdlQS5zdGFydC5yb3cgIT09IHJhbmdlQi5zdGFydC5yb3cpIHtcbiAgICAgICAgICByZXR1cm4gbXVsdGlwbHlXaXRoICogKHJhbmdlQS5zdGFydC5yb3cgPiByYW5nZUIuc3RhcnQucm93ID8gMSA6IC0xKVxuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZUEuc3RhcnQuY29sdW1uICE9PSByYW5nZUIuc3RhcnQuY29sdW1uKSB7XG4gICAgICAgICAgcmV0dXJuIG11bHRpcGx5V2l0aCAqIChyYW5nZUEuc3RhcnQuY29sdW1uID4gcmFuZ2VCLnN0YXJ0LmNvbHVtbiA/IDEgOiAtMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0U29sdXRpb25zKHNvbHV0aW9uczogQXJyYXk8T2JqZWN0Pik6IEFycmF5PE9iamVjdD4ge1xuICByZXR1cm4gc29sdXRpb25zLnNsaWNlKCkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGIucHJpb3JpdHkgLSBhLnByaW9yaXR5XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVNvbHV0aW9uKHRleHRFZGl0b3I6IFRleHRFZGl0b3IsIHZlcnNpb246IDEgfCAyLCBzb2x1dGlvbjogT2JqZWN0KTogYm9vbGVhbiB7XG4gIGlmIChzb2x1dGlvbi5hcHBseSkge1xuICAgIHNvbHV0aW9uLmFwcGx5KClcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGNvbnN0IHJhbmdlID0gdmVyc2lvbiA9PT0gMSA/IHNvbHV0aW9uLnJhbmdlIDogc29sdXRpb24ucG9zaXRpb25cbiAgY29uc3QgY3VycmVudFRleHQgPSB2ZXJzaW9uID09PSAxID8gc29sdXRpb24ub2xkVGV4dCA6IHNvbHV0aW9uLmN1cnJlbnRUZXh0XG4gIGNvbnN0IHJlcGxhY2VXaXRoID0gdmVyc2lvbiA9PT0gMSA/IHNvbHV0aW9uLm5ld1RleHQgOiBzb2x1dGlvbi5yZXBsYWNlV2l0aFxuICBpZiAoY3VycmVudFRleHQpIHtcbiAgICBjb25zdCB0ZXh0SW5SYW5nZSA9IHRleHRFZGl0b3IuZ2V0VGV4dEluQnVmZmVyUmFuZ2UocmFuZ2UpXG4gICAgaWYgKGN1cnJlbnRUZXh0ICE9PSB0ZXh0SW5SYW5nZSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnW2xpbnRlci11aS1kZWZhdWx0XSBOb3QgYXBwbHlpbmcgZml4IGJlY2F1c2UgdGV4dCBkaWQgbm90IG1hdGNoIHRoZSBleHBlY3RlZCBvbmUnLFxuICAgICAgICAnZXhwZWN0ZWQnLFxuICAgICAgICBjdXJyZW50VGV4dCxcbiAgICAgICAgJ2J1dCBnb3QnLFxuICAgICAgICB0ZXh0SW5SYW5nZSxcbiAgICAgIClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICB0ZXh0RWRpdG9yLnNldFRleHRJbkJ1ZmZlclJhbmdlKHJhbmdlLCByZXBsYWNlV2l0aClcbiAgcmV0dXJuIHRydWVcbn1cbiJdfQ==