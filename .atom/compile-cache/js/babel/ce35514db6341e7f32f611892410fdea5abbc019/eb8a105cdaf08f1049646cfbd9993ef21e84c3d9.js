var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _helpers = require('../helpers');

var StatusBar = (function () {
  function StatusBar() {
    var _this = this;

    _classCallCheck(this, StatusBar);

    this.element = new _element2['default']();
    this.messages = [];
    this.subscriptions = new _atom.CompositeDisposable();

    this.subscriptions.add(this.element);
    this.subscriptions.add(atom.config.observe('linter-ui-default.statusBarRepresents', function (statusBarRepresents) {
      var notInitial = typeof _this.statusBarRepresents !== 'undefined';
      _this.statusBarRepresents = statusBarRepresents;
      if (notInitial) {
        _this.update();
      }
    }));
    this.subscriptions.add(atom.config.observe('linter-ui-default.statusBarClickBehavior', function (statusBarClickBehavior) {
      var notInitial = typeof _this.statusBarClickBehavior !== 'undefined';
      _this.statusBarClickBehavior = statusBarClickBehavior;
      if (notInitial) {
        _this.update();
      }
    }));
    this.subscriptions.add(atom.config.observe('linter-ui-default.showStatusBar', function (showStatusBar) {
      _this.element.setVisibility('config', showStatusBar);
    }));
    this.subscriptions.add(atom.workspace.observeActivePaneItem(function (paneItem) {
      var isTextEditor = atom.workspace.isTextEditor(paneItem);
      _this.element.setVisibility('pane', isTextEditor);
      if (isTextEditor && _this.statusBarRepresents === 'Current File') {
        _this.update();
      }
    }));

    this.element.onDidClick(function (type) {
      var workspaceView = atom.views.getView(atom.workspace);
      if (_this.statusBarClickBehavior === 'Toggle Panel') {
        atom.commands.dispatch(workspaceView, 'linter-ui-default:toggle-panel');
      } else {
        var postfix = _this.statusBarRepresents === 'Current File' ? '-in-current-file' : '';
        atom.commands.dispatch(workspaceView, 'linter-ui-default:next-' + type + postfix);
      }
    });
  }

  _createClass(StatusBar, [{
    key: 'update',
    value: function update() {
      var _this2 = this;

      var messages = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (messages) {
        this.messages = messages;
      } else {
        messages = this.messages;
      }

      var count = { error: 0, warning: 0, info: 0 };
      var currentTextEditor = atom.workspace.getActiveTextEditor();
      var currentPath = currentTextEditor && currentTextEditor.getPath() || NaN;
      // NOTE: ^ Setting default to NaN so it won't match empty file paths in messages

      messages.forEach(function (message) {
        if (_this2.statusBarRepresents === 'Entire Project' || (0, _helpers.$file)(message) === currentPath) {
          if (message.severity === 'error') {
            count.error++;
          } else if (message.severity === 'warning') {
            count.warning++;
          } else {
            count.info++;
          }
        }
      });
      this.element.update(count.error, count.warning, count.info);
    }
  }, {
    key: 'attach',
    value: function attach(statusBarRegistry) {
      var _this3 = this;

      var statusBar = null;

      this.subscriptions.add(atom.config.observe('linter-ui-default.statusBarPosition', function (statusBarPosition) {
        if (statusBar) {
          statusBar.destroy();
        }
        statusBar = statusBarRegistry['add' + statusBarPosition + 'Tile']({
          item: _this3.element.item,
          priority: statusBarPosition === 'Left' ? 0 : 1000
        });
      }));
      this.subscriptions.add(new _atom.Disposable(function () {
        if (statusBar) {
          statusBar.destroy();
        }
      }));
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.subscriptions.dispose();
    }
  }]);

  return StatusBar;
})();

module.exports = StatusBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL3N0YXR1cy1iYXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUVnRCxNQUFNOzt1QkFFbEMsV0FBVzs7Ozt1QkFDVCxZQUFZOztJQUc1QixTQUFTO0FBT0YsV0FQUCxTQUFTLEdBT0M7OzswQkFQVixTQUFTOztBQVFYLFFBQUksQ0FBQyxPQUFPLEdBQUcsMEJBQWEsQ0FBQTtBQUM1QixRQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixRQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBOztBQUU5QyxRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDcEMsUUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUNBQXVDLEVBQUUsVUFBQyxtQkFBbUIsRUFBSztBQUMzRyxVQUFNLFVBQVUsR0FBRyxPQUFPLE1BQUssbUJBQW1CLEtBQUssV0FBVyxDQUFBO0FBQ2xFLFlBQUssbUJBQW1CLEdBQUcsbUJBQW1CLENBQUE7QUFDOUMsVUFBSSxVQUFVLEVBQUU7QUFDZCxjQUFLLE1BQU0sRUFBRSxDQUFBO09BQ2Q7S0FDRixDQUFDLENBQUMsQ0FBQTtBQUNILFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLDBDQUEwQyxFQUFFLFVBQUMsc0JBQXNCLEVBQUs7QUFDakgsVUFBTSxVQUFVLEdBQUcsT0FBTyxNQUFLLHNCQUFzQixLQUFLLFdBQVcsQ0FBQTtBQUNyRSxZQUFLLHNCQUFzQixHQUFHLHNCQUFzQixDQUFBO0FBQ3BELFVBQUksVUFBVSxFQUFFO0FBQ2QsY0FBSyxNQUFNLEVBQUUsQ0FBQTtPQUNkO0tBQ0YsQ0FBQyxDQUFDLENB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LElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLFVBQUMsaUJBQWlCLEVBQUs7QUFDdkcsWUFBSSxTQUFTLEVBQUU7QUFDYixtQkFBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ3BCO0FBQ0QsaUJBQVMsR0FBRyxpQkFBaUIsU0FBTyxpQkFBaUIsVUFBTyxDQUFDO0FBQzNELGNBQUksRUFBRSxPQUFLLE9BQU8sQ0FBQyxJQUFJO0FBQ3ZCLGtCQUFRLEVBQUUsaUJBQWlCLEtBQUssTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJO1NBQ2xELENBQUMsQ0FBQTtPQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0gsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMscUJBQWUsWUFBVztBQUMvQyxZQUFJLFNBQVMsRUFBRTtBQUNiLG1CQUFTLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDcEI7T0FDRixDQUFDLENBQUMsQ0FBQTtLQUNKOzs7V0FDTSxtQkFBRztBQUNSLFVBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDN0I7OztTQTdGRyxTQUFTOzs7QUFnR2YsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUEiLCJmaWxlIjoiL1VzZXJzL0NyaXNGb3Juby9kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC9saWIvc3RhdHVzLWJhci9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL2VsZW1lbnQnXG5pbXBvcnQgeyAkZmlsZSB9IGZyb20gJy4uL2hlbHBlcnMnXG5pbXBvcnQgdHlwZSB7IExpbnRlck1lc3NhZ2UgfSBmcm9tICcuLi90eXBlcydcblxuY2xhc3MgU3RhdHVzQmFyIHtcbiAgZWxlbWVudDogRWxlbWVudDtcbiAgbWVzc2FnZXM6IEFycmF5PExpbnRlck1lc3NhZ2U+O1xuICBzdWJzY3JpcHRpb25zOiBDb21wb3NpdGVEaXNwb3NhYmxlO1xuICBzdGF0dXNCYXJSZXByZXNlbnRzOiAnRW50aXJlIFByb2plY3QnIHwgJ0N1cnJlbnQgRmlsZSc7XG4gIHN0YXR1c0JhckNsaWNrQmVoYXZpb3I6ICdUb2dnbGUgUGFuZWwnIHwgJ0p1bXAgdG8gbmV4dCBpc3N1ZSc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IEVsZW1lbnQoKVxuICAgIHRoaXMubWVzc2FnZXMgPSBbXVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5lbGVtZW50KVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXVpLWRlZmF1bHQuc3RhdHVzQmFyUmVwcmVzZW50cycsIChzdGF0dXNCYXJSZXByZXNlbnRzKSA9PiB7XG4gICAgICBjb25zdCBub3RJbml0aWFsID0gdHlwZW9mIHRoaXMuc3RhdHVzQmFyUmVwcmVzZW50cyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgIHRoaXMuc3RhdHVzQmFyUmVwcmVzZW50cyA9IHN0YXR1c0JhclJlcHJlc2VudHNcbiAgICAgIGlmIChub3RJbml0aWFsKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKClcbiAgICAgIH1cbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci11aS1kZWZhdWx0LnN0YXR1c0JhckNsaWNrQmVoYXZpb3InLCAoc3RhdHVzQmFyQ2xpY2tCZWhhdmlvcikgPT4ge1xuICAgICAgY29uc3Qgbm90SW5pdGlhbCA9IHR5cGVvZiB0aGlzLnN0YXR1c0JhckNsaWNrQmVoYXZpb3IgIT09ICd1bmRlZmluZWQnXG4gICAgICB0aGlzLnN0YXR1c0JhckNsaWNrQmVoYXZpb3IgPSBzdGF0dXNCYXJDbGlja0JlaGF2aW9yXG4gICAgICBpZiAobm90SW5pdGlhbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICB9XG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItdWktZGVmYXVsdC5zaG93U3RhdHVzQmFyJywgKHNob3dTdGF0dXNCYXIpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRWaXNpYmlsaXR5KCdjb25maWcnLCBzaG93U3RhdHVzQmFyKVxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS53b3Jrc3BhY2Uub2JzZXJ2ZUFjdGl2ZVBhbmVJdGVtKChwYW5lSXRlbSkgPT4ge1xuICAgICAgY29uc3QgaXNUZXh0RWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuaXNUZXh0RWRpdG9yKHBhbmVJdGVtKVxuICAgICAgdGhpcy5lbGVtZW50LnNldFZpc2liaWxpdHkoJ3BhbmUnLCBpc1RleHRFZGl0b3IpXG4gICAgICBpZiAoaXNUZXh0RWRpdG9yICYmIHRoaXMuc3RhdHVzQmFyUmVwcmVzZW50cyA9PT0gJ0N1cnJlbnQgRmlsZScpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgICAgfVxuICAgIH0pKVxuXG4gICAgdGhpcy5lbGVtZW50Lm9uRGlkQ2xpY2soKHR5cGUpID0+IHtcbiAgICAgIGNvbnN0IHdvcmtzcGFjZVZpZXcgPSBhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpXG4gICAgICBpZiAodGhpcy5zdGF0dXNCYXJDbGlja0JlaGF2aW9yID09PSAnVG9nZ2xlIFBhbmVsJykge1xuICAgICAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHdvcmtzcGFjZVZpZXcsICdsaW50ZXItdWktZGVmYXVsdDp0b2dnbGUtcGFuZWwnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcG9zdGZpeCA9IHRoaXMuc3RhdHVzQmFyUmVwcmVzZW50cyA9PT0gJ0N1cnJlbnQgRmlsZScgPyAnLWluLWN1cnJlbnQtZmlsZScgOiAnJ1xuICAgICAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHdvcmtzcGFjZVZpZXcsIGBsaW50ZXItdWktZGVmYXVsdDpuZXh0LSR7dHlwZX0ke3Bvc3RmaXh9YClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHVwZGF0ZShtZXNzYWdlczogP0FycmF5PExpbnRlck1lc3NhZ2U+ID0gbnVsbCk6IHZvaWQge1xuICAgIGlmIChtZXNzYWdlcykge1xuICAgICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzXG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlc1xuICAgIH1cblxuICAgIGNvbnN0IGNvdW50ID0geyBlcnJvcjogMCwgd2FybmluZzogMCwgaW5mbzogMCB9XG4gICAgY29uc3QgY3VycmVudFRleHRFZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICBjb25zdCBjdXJyZW50UGF0aCA9IChjdXJyZW50VGV4dEVkaXRvciAmJiBjdXJyZW50VGV4dEVkaXRvci5nZXRQYXRoKCkpIHx8IE5hTlxuICAgIC8vIE5PVEU6IF4gU2V0dGluZyBkZWZhdWx0IHRvIE5hTiBzbyBpdCB3b24ndCBtYXRjaCBlbXB0eSBmaWxlIHBhdGhzIGluIG1lc3NhZ2VzXG5cbiAgICBtZXNzYWdlcy5mb3JFYWNoKChtZXNzYWdlKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0dXNCYXJSZXByZXNlbnRzID09PSAnRW50aXJlIFByb2plY3QnIHx8ICRmaWxlKG1lc3NhZ2UpID09PSBjdXJyZW50UGF0aCkge1xuICAgICAgICBpZiAobWVzc2FnZS5zZXZlcml0eSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgIGNvdW50LmVycm9yKytcbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnNldmVyaXR5ID09PSAnd2FybmluZycpIHtcbiAgICAgICAgICBjb3VudC53YXJuaW5nKytcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3VudC5pbmZvKytcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5lbGVtZW50LnVwZGF0ZShjb3VudC5lcnJvciwgY291bnQud2FybmluZywgY291bnQuaW5mbylcbiAgfVxuICBhdHRhY2goc3RhdHVzQmFyUmVnaXN0cnk6IE9iamVjdCkge1xuICAgIGxldCBzdGF0dXNCYXIgPSBudWxsXG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci11aS1kZWZhdWx0LnN0YXR1c0JhclBvc2l0aW9uJywgKHN0YXR1c0JhclBvc2l0aW9uKSA9PiB7XG4gICAgICBpZiAoc3RhdHVzQmFyKSB7XG4gICAgICAgIHN0YXR1c0Jhci5kZXN0cm95KClcbiAgICAgIH1cbiAgICAgIHN0YXR1c0JhciA9IHN0YXR1c0JhclJlZ2lzdHJ5W2BhZGQke3N0YXR1c0JhclBvc2l0aW9ufVRpbGVgXSh7XG4gICAgICAgIGl0ZW06IHRoaXMuZWxlbWVudC5pdGVtLFxuICAgICAgICBwcmlvcml0eTogc3RhdHVzQmFyUG9zaXRpb24gPT09ICdMZWZ0JyA/IDAgOiAxMDAwLFxuICAgICAgfSlcbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKG5ldyBEaXNwb3NhYmxlKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHN0YXR1c0Jhcikge1xuICAgICAgICBzdGF0dXNCYXIuZGVzdHJveSgpXG4gICAgICB9XG4gICAgfSkpXG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0dXNCYXJcbiJdfQ==