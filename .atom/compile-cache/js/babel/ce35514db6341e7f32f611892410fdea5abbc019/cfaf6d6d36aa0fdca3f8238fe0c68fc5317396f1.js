var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _helpers = require('./helpers');

var Commands = (function () {
  function Commands() {
    var _this = this;

    _classCallCheck(this, Commands);

    this.messages = [];
    this.subscriptions = new _atom.CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'linter-ui-default:next': function linterUiDefaultNext() {
        return _this.move(true, true);
      },
      'linter-ui-default:previous': function linterUiDefaultPrevious() {
        return _this.move(false, true);
      },
      'linter-ui-default:next-error': function linterUiDefaultNextError() {
        return _this.move(true, true, 'error');
      },
      'linter-ui-default:previous-error': function linterUiDefaultPreviousError() {
        return _this.move(false, true, 'error');
      },
      'linter-ui-default:next-warning': function linterUiDefaultNextWarning() {
        return _this.move(true, true, 'warning');
      },
      'linter-ui-default:previous-warning': function linterUiDefaultPreviousWarning() {
        return _this.move(false, true, 'warning');
      },
      'linter-ui-default:next-info': function linterUiDefaultNextInfo() {
        return _this.move(true, true, 'info');
      },
      'linter-ui-default:previous-info': function linterUiDefaultPreviousInfo() {
        return _this.move(false, true, 'info');
      },

      'linter-ui-default:next-in-current-file': function linterUiDefaultNextInCurrentFile() {
        return _this.move(true, false);
      },
      'linter-ui-default:previous-in-current-file': function linterUiDefaultPreviousInCurrentFile() {
        return _this.move(false, false);
      },
      'linter-ui-default:next-error-in-current-file': function linterUiDefaultNextErrorInCurrentFile() {
        return _this.move(true, false, 'error');
      },
      'linter-ui-default:previous-error-in-current-file': function linterUiDefaultPreviousErrorInCurrentFile() {
        return _this.move(false, false, 'error');
      },
      'linter-ui-default:next-warning-in-current-file': function linterUiDefaultNextWarningInCurrentFile() {
        return _this.move(true, false, 'warning');
      },
      'linter-ui-default:previous-warning-in-current-file': function linterUiDefaultPreviousWarningInCurrentFile() {
        return _this.move(false, false, 'warning');
      },
      'linter-ui-default:next-info-in-current-file': function linterUiDefaultNextInfoInCurrentFile() {
        return _this.move(true, false, 'info');
      },
      'linter-ui-default:previous-info-in-current-file': function linterUiDefaultPreviousInfoInCurrentFile() {
        return _this.move(false, false, 'info');
      },

      'linter-ui-default:toggle-panel': function linterUiDefaultTogglePanel() {
        return _this.togglePanel();
      },

      // NOTE: Add no-ops here so they are recognized by commands registry
      // Real commands are registered when tooltip is shown inside tooltip's delegate
      'linter-ui-default:expand-tooltip': function linterUiDefaultExpandTooltip() {},
      'linter-ui-default:collapse-tooltip': function linterUiDefaultCollapseTooltip() {}
    }));
    this.subscriptions.add(atom.commands.add('atom-text-editor:not([mini])', {
      'linter-ui-default:apply-all-solutions': function linterUiDefaultApplyAllSolutions() {
        return _this.applyAllSolutions();
      }
    }));
    this.subscriptions.add(atom.commands.add('#linter-panel', {
      'core:copy': function coreCopy() {
        var selection = document.getSelection();
        if (selection) {
          atom.clipboard.write(selection.toString());
        }
      }
    }));
  }

  _createClass(Commands, [{
    key: 'togglePanel',
    value: function togglePanel() {
      atom.config.set('linter-ui-default.showPanel', !atom.config.get('linter-ui-default.showPanel'));
    }

    // NOTE: Apply solutions from bottom to top, so they don't invalidate each other
  }, {
    key: 'applyAllSolutions',
    value: function applyAllSolutions() {
      var textEditor = atom.workspace.getActiveTextEditor();
      var messages = (0, _helpers.sortMessages)([{ column: 'line', type: 'desc' }], (0, _helpers.filterMessages)(this.messages, textEditor.getPath()));
      messages.forEach(function (message) {
        if (message.version === 1 && message.fix) {
          (0, _helpers.applySolution)(textEditor, 1, message.fix);
        } else if (message.version === 2 && message.solutions && message.solutions.length) {
          (0, _helpers.applySolution)(textEditor, 2, (0, _helpers.sortSolutions)(message.solutions)[0]);
        }
      });
    }
  }, {
    key: 'move',
    value: function move(forward, globally) {
      var severity = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var currentEditor = atom.workspace.getActiveTextEditor();
      var currentFile = currentEditor && currentEditor.getPath() || NaN;
      // NOTE: ^ Setting default to NaN so it won't match empty file paths in messages
      var messages = (0, _helpers.sortMessages)([{ column: 'file', type: 'asc' }, { column: 'line', type: 'asc' }], (0, _helpers.filterMessages)(this.messages, globally ? null : currentFile, severity));
      var expectedValue = forward ? -1 : 1;

      if (!currentEditor) {
        var message = forward ? messages[0] : messages[messages.length - 1];
        if (message) {
          (0, _helpers.visitMessage)(message);
        }
        return;
      }
      var currentPosition = currentEditor.getCursorBufferPosition();

      // NOTE: Iterate bottom to top to find the previous message
      // Because if we search top to bottom when sorted, first item will always
      // be the smallest
      if (!forward) {
        messages.reverse();
      }

      var found = undefined;
      var currentFileEncountered = false;
      for (var i = 0, _length = messages.length; i < _length; i++) {
        var message = messages[i];
        var messageFile = (0, _helpers.$file)(message);
        var messageRange = (0, _helpers.$range)(message);

        if (!currentFileEncountered && messageFile === currentFile) {
          currentFileEncountered = true;
        }
        if (messageFile && messageRange) {
          if (currentFileEncountered && messageFile !== currentFile) {
            found = message;
            break;
          } else if (messageFile === currentFile && currentPosition.compare(messageRange.start) === expectedValue) {
            found = message;
            break;
          }
        }
      }

      if (!found && messages.length) {
        // Reset back to first or last depending on direction
        found = messages[0];
      }

      if (found) {
        (0, _helpers.visitMessage)(found);
      }
    }
  }, {
    key: 'update',
    value: function update(messages) {
      this.messages = messages;
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.subscriptions.dispose();
    }
  }]);

  return Commands;
})();

module.exports = Commands;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL2NvbW1hbmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7b0JBRW9DLE1BQU07O3VCQUU4RCxXQUFXOztJQUc3RyxRQUFRO0FBSUQsV0FKUCxRQUFRLEdBSUU7OzswQkFKVixRQUFROztBQUtWLFFBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO0FBQ2xCLFFBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUE7O0FBRTlDLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO0FBQ3pELDhCQUF3QixFQUFFO2VBQU0sTUFBSyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztPQUFBO0FBQ3JELGtDQUE0QixFQUFFO2VBQU0sTUFBSyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztPQUFBO0FBQzFELG9DQUE4QixFQUFFO2VBQU0sTUFBSyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7T0FBQTtBQUNwRSx3Q0FBa0MsRUFBRTtlQUFNLE1BQUssSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO09BQUE7QUFDekUsc0NBQWdDLEVBQUU7ZUFBTSxNQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQztPQUFBO0FBQ3hFLDBDQUFvQyxFQUFFO2VBQU0sTUFBSyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUM7T0FBQTtBQUM3RSxtQ0FBNkIsRUFBRTtlQUFNLE1BQUssSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO09BQUE7QUFDbEUsdUNBQWlDLEVBQUU7ZUFBTSxNQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFF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bS9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC9saWIvY29tbWFuZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcblxuaW1wb3J0IHsgJGZpbGUsICRyYW5nZSwgdmlzaXRNZXNzYWdlLCBzb3J0TWVzc2FnZXMsIHNvcnRTb2x1dGlvbnMsIGZpbHRlck1lc3NhZ2VzLCBhcHBseVNvbHV0aW9uIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHR5cGUgeyBMaW50ZXJNZXNzYWdlIH0gZnJvbSAnLi90eXBlcydcblxuY2xhc3MgQ29tbWFuZHMge1xuICBtZXNzYWdlczogQXJyYXk8TGludGVyTWVzc2FnZT47XG4gIHN1YnNjcmlwdGlvbnM6IENvbXBvc2l0ZURpc3Bvc2FibGU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAnbGludGVyLXVpLWRlZmF1bHQ6bmV4dCc6ICgpID0+IHRoaXMubW92ZSh0cnVlLCB0cnVlKSxcbiAgICAgICdsaW50ZXItdWktZGVmYXVsdDpwcmV2aW91cyc6ICgpID0+IHRoaXMubW92ZShmYWxzZSwgdHJ1ZSksXG4gICAgICAnbGludGVyLXVpLWRlZmF1bHQ6bmV4dC1lcnJvcic6ICgpID0+IHRoaXMubW92ZSh0cnVlLCB0cnVlLCAnZXJyb3InKSxcbiAgICAgICdsaW50ZXItdWktZGVmYXVsdDpwcmV2aW91cy1lcnJvcic6ICgpID0+IHRoaXMubW92ZShmYWxzZSwgdHJ1ZSwgJ2Vycm9yJyksXG4gICAgICAnbGludGVyLXVpLWRlZmF1bHQ6bmV4dC13YXJuaW5nJzogKCkgPT4gdGhpcy5tb3ZlKHRydWUsIHRydWUsICd3YXJuaW5nJyksXG4gICAgICAnbGludGVyLXVpLWRlZmF1bHQ6cHJldmlvdXMtd2FybmluZyc6ICgpID0+IHRoaXMubW92ZShmYWxzZSwgdHJ1ZSwgJ3dhcm5pbmcnKSxcbiAgICAgICdsaW50ZXItdWktZGVmYXVsdDpuZXh0LWluZm8nOiAoKSA9PiB0aGlzLm1vdmUodHJ1ZSwgdHJ1ZSwgJ2luZm8nKSxcbiAgICAgICdsaW50ZXItdWktZGVmYXVsdDpwcmV2aW91cy1pbmZvJzogKCkgPT4gdGhpcy5tb3ZlKGZhbHNlLCB0cnVlLCAnaW5mbycpLFxuXG4gICAgICAnbGludGVyLXVpLWRlZmF1bHQ6bmV4dC1pbi1jdXJyZW50LWZpbGUnOiAoKSA9PiB0aGlzLm1vdmUodHJ1ZSwgZmFsc2UpLFxuICAgICAgJ2xpbnRlci11aS1kZWZhdWx0OnByZXZpb3VzLWluLWN1cnJlbnQtZmlsZSc6ICgpID0+IHRoaXMubW92ZShmYWxzZSwgZmFsc2UpLFxuICAgICAgJ2xpbnRlci11aS1kZWZhdWx0Om5leHQtZXJyb3ItaW4tY3VycmVudC1maWxlJzogKCkgPT4gdGhpcy5tb3ZlKHRydWUsIGZhbHNlLCAnZXJyb3InKSxcbiAgICAgICdsaW50ZXItdWktZGVmYXVsdDpwcmV2aW91cy1lcnJvci1pbi1jdXJyZW50LWZpbGUnOiAoKSA9PiB0aGlzLm1vdmUoZmFsc2UsIGZhbHNlLCAnZXJyb3InKSxcbiAgICAgICdsaW50ZXItdWktZGVmYXVsdDpuZXh0LXdhcm5pbmctaW4tY3VycmVudC1maWxlJzogKCkgPT4gdGhpcy5tb3ZlKHRydWUsIGZhbHNlLCAnd2FybmluZycpLFxuICAgICAgJ2xpbnRlci11aS1kZWZhdWx0OnByZXZpb3VzLXdhcm5pbmctaW4tY3VycmVudC1maWxlJzogKCkgPT4gdGhpcy5tb3ZlKGZhbHNlLCBmYWxzZSwgJ3dhcm5pbmcnKSxcbiAgICAgICdsaW50ZXItdWktZGVmYXVsdDpuZXh0LWluZm8taW4tY3VycmVudC1maWxlJzogKCkgPT4gdGhpcy5tb3ZlKHRydWUsIGZhbHNlLCAnaW5mbycpLFxuICAgICAgJ2xpbnRlci11aS1kZWZhdWx0OnByZXZpb3VzLWluZm8taW4tY3VycmVudC1maWxlJzogKCkgPT4gdGhpcy5tb3ZlKGZhbHNlLCBmYWxzZSwgJ2luZm8nKSxcblxuICAgICAgJ2xpbnRlci11aS1kZWZhdWx0OnRvZ2dsZS1wYW5lbCc6ICgpID0+IHRoaXMudG9nZ2xlUGFuZWwoKSxcblxuICAgICAgLy8gTk9URTogQWRkIG5vLW9wcyBoZXJlIHNvIHRoZXkgYXJlIHJlY29nbml6ZWQgYnkgY29tbWFuZHMgcmVnaXN0cnlcbiAgICAgIC8vIFJlYWwgY29tbWFuZHMgYXJlIHJlZ2lzdGVyZWQgd2hlbiB0b29sdGlwIGlzIHNob3duIGluc2lkZSB0b29sdGlwJ3MgZGVsZWdhdGVcbiAgICAgICdsaW50ZXItdWktZGVmYXVsdDpleHBhbmQtdG9vbHRpcCc6IGZ1bmN0aW9uKCkgeyB9LFxuICAgICAgJ2xpbnRlci11aS1kZWZhdWx0OmNvbGxhcHNlLXRvb2x0aXAnOiBmdW5jdGlvbigpIHsgfSxcbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yOm5vdChbbWluaV0pJywge1xuICAgICAgJ2xpbnRlci11aS1kZWZhdWx0OmFwcGx5LWFsbC1zb2x1dGlvbnMnOiAoKSA9PiB0aGlzLmFwcGx5QWxsU29sdXRpb25zKCksXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnI2xpbnRlci1wYW5lbCcsIHtcbiAgICAgICdjb3JlOmNvcHknOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpXG4gICAgICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICBhdG9tLmNsaXBib2FyZC53cml0ZShzZWxlY3Rpb24udG9TdHJpbmcoKSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSlcbiAgfVxuICB0b2dnbGVQYW5lbCgpOiB2b2lkIHtcbiAgICBhdG9tLmNvbmZpZy5zZXQoJ2xpbnRlci11aS1kZWZhdWx0LnNob3dQYW5lbCcsICFhdG9tLmNvbmZpZy5nZXQoJ2xpbnRlci11aS1kZWZhdWx0LnNob3dQYW5lbCcpKVxuICB9XG4gIC8vIE5PVEU6IEFwcGx5IHNvbHV0aW9ucyBmcm9tIGJvdHRvbSB0byB0b3AsIHNvIHRoZXkgZG9uJ3QgaW52YWxpZGF0ZSBlYWNoIG90aGVyXG4gIGFwcGx5QWxsU29sdXRpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IHRleHRFZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICBjb25zdCBtZXNzYWdlcyA9IHNvcnRNZXNzYWdlcyhbeyBjb2x1bW46ICdsaW5lJywgdHlwZTogJ2Rlc2MnIH1dLCBmaWx0ZXJNZXNzYWdlcyh0aGlzLm1lc3NhZ2VzLCB0ZXh0RWRpdG9yLmdldFBhdGgoKSkpXG4gICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAobWVzc2FnZS52ZXJzaW9uID09PSAxICYmIG1lc3NhZ2UuZml4KSB7XG4gICAgICAgIGFwcGx5U29sdXRpb24odGV4dEVkaXRvciwgMSwgbWVzc2FnZS5maXgpXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudmVyc2lvbiA9PT0gMiAmJiBtZXNzYWdlLnNvbHV0aW9ucyAmJiBtZXNzYWdlLnNvbHV0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgYXBwbHlTb2x1dGlvbih0ZXh0RWRpdG9yLCAyLCBzb3J0U29sdXRpb25zKG1lc3NhZ2Uuc29sdXRpb25zKVswXSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIG1vdmUoZm9yd2FyZDogYm9vbGVhbiwgZ2xvYmFsbHk6IGJvb2xlYW4sIHNldmVyaXR5OiA/c3RyaW5nID0gbnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRFZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICBjb25zdCBjdXJyZW50RmlsZTogYW55ID0gKGN1cnJlbnRFZGl0b3IgJiYgY3VycmVudEVkaXRvci5nZXRQYXRoKCkpIHx8IE5hTlxuICAgIC8vIE5PVEU6IF4gU2V0dGluZyBkZWZhdWx0IHRvIE5hTiBzbyBpdCB3b24ndCBtYXRjaCBlbXB0eSBmaWxlIHBhdGhzIGluIG1lc3NhZ2VzXG4gICAgY29uc3QgbWVzc2FnZXMgPSBzb3J0TWVzc2FnZXMoW3sgY29sdW1uOiAnZmlsZScsIHR5cGU6ICdhc2MnIH0sIHsgY29sdW1uOiAnbGluZScsIHR5cGU6ICdhc2MnIH1dLCBmaWx0ZXJNZXNzYWdlcyh0aGlzLm1lc3NhZ2VzLCBnbG9iYWxseSA/IG51bGwgOiBjdXJyZW50RmlsZSwgc2V2ZXJpdHkpKVxuICAgIGNvbnN0IGV4cGVjdGVkVmFsdWUgPSBmb3J3YXJkID8gLTEgOiAxXG5cbiAgICBpZiAoIWN1cnJlbnRFZGl0b3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBmb3J3YXJkID8gbWVzc2FnZXNbMF0gOiBtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXVxuICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgdmlzaXRNZXNzYWdlKG1lc3NhZ2UpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gY3VycmVudEVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbigpXG5cbiAgICAvLyBOT1RFOiBJdGVyYXRlIGJvdHRvbSB0byB0b3AgdG8gZmluZCB0aGUgcHJldmlvdXMgbWVzc2FnZVxuICAgIC8vIEJlY2F1c2UgaWYgd2Ugc2VhcmNoIHRvcCB0byBib3R0b20gd2hlbiBzb3J0ZWQsIGZpcnN0IGl0ZW0gd2lsbCBhbHdheXNcbiAgICAvLyBiZSB0aGUgc21hbGxlc3RcbiAgICBpZiAoIWZvcndhcmQpIHtcbiAgICAgIG1lc3NhZ2VzLnJldmVyc2UoKVxuICAgIH1cblxuICAgIGxldCBmb3VuZFxuICAgIGxldCBjdXJyZW50RmlsZUVuY291bnRlcmVkID0gZmFsc2VcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gbWVzc2FnZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1tpXVxuICAgICAgY29uc3QgbWVzc2FnZUZpbGUgPSAkZmlsZShtZXNzYWdlKVxuICAgICAgY29uc3QgbWVzc2FnZVJhbmdlID0gJHJhbmdlKG1lc3NhZ2UpXG5cbiAgICAgIGlmICghY3VycmVudEZpbGVFbmNvdW50ZXJlZCAmJiBtZXNzYWdlRmlsZSA9PT0gY3VycmVudEZpbGUpIHtcbiAgICAgICAgY3VycmVudEZpbGVFbmNvdW50ZXJlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGlmIChtZXNzYWdlRmlsZSAmJiBtZXNzYWdlUmFuZ2UpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRGaWxlRW5jb3VudGVyZWQgJiYgbWVzc2FnZUZpbGUgIT09IGN1cnJlbnRGaWxlKSB7XG4gICAgICAgICAgZm91bmQgPSBtZXNzYWdlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlRmlsZSA9PT0gY3VycmVudEZpbGUgJiYgY3VycmVudFBvc2l0aW9uLmNvbXBhcmUobWVzc2FnZVJhbmdlLnN0YXJ0KSA9PT0gZXhwZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgIGZvdW5kID0gbWVzc2FnZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kICYmIG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgLy8gUmVzZXQgYmFjayB0byBmaXJzdCBvciBsYXN0IGRlcGVuZGluZyBvbiBkaXJlY3Rpb25cbiAgICAgIGZvdW5kID0gbWVzc2FnZXNbMF1cbiAgICB9XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHZpc2l0TWVzc2FnZShmb3VuZClcbiAgICB9XG4gIH1cbiAgdXBkYXRlKG1lc3NhZ2VzOiBBcnJheTxMaW50ZXJNZXNzYWdlPikge1xuICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlc1xuICB9XG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbWFuZHNcbiJdfQ==