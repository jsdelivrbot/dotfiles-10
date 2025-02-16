function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var idleCallbacks = new Set();

var linterUiDefault = {
  instances: new Set(),
  signalRegistry: null,
  statusBarRegistry: null,
  activate: function activate() {
    if (atom.config.get('linter-ui-default.useBusySignal')) {
      // This is a necessary evil, see steelbrain/linter#1355
      atom.packages.getLoadedPackage('linter-ui-default').metadata['package-deps'].push('busy-signal');
    }

    var callbackID = window.requestIdleCallback(function installLinterUIDefaultDeps() {
      idleCallbacks['delete'](callbackID);
      if (!atom.inSpecMode()) {
        // eslint-disable-next-line global-require
        require('atom-package-deps').install('linter-ui-default');
      }
    });
    idleCallbacks.add(callbackID);
  },
  deactivate: function deactivate() {
    idleCallbacks.forEach(function (callbackID) {
      return window.cancelIdleCallback(callbackID);
    });
    idleCallbacks.clear();
    for (var entry of this.instances) {
      entry.dispose();
    }
    this.instances.clear();
  },
  provideUI: function provideUI() {
    var instance = new _main2['default']();
    this.instances.add(instance);
    if (this.signalRegistry) {
      instance.signal.attach(this.signalRegistry);
    }
    return instance;
  },
  provideIntentions: function provideIntentions() {
    return Array.from(this.instances).map(function (entry) {
      return entry.intentions;
    });
  },
  consumeSignal: function consumeSignal(signalRegistry) {
    this.signalRegistry = signalRegistry;
    this.instances.forEach(function (instance) {
      instance.signal.attach(signalRegistry);
    });
  },
  consumeStatusBar: function consumeStatusBar(statusBarRegistry) {
    this.statusBarRegistry = statusBarRegistry;
    this.instances.forEach(function (instance) {
      instance.statusBar.attach(statusBarRegistry);
    });
  }
};

module.exports = linterUiDefault;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O29CQUVxQixRQUFROzs7O0FBRzdCLElBQU0sYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRS9CLElBQU0sZUFBZSxHQUFHO0FBQ3RCLFdBQVMsRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUNwQixnQkFBYyxFQUFFLElBQUk7QUFDcEIsbUJBQWlCLEVBQUUsSUFBSTtBQUN2QixVQUFRLEVBQUEsb0JBQUc7QUFDVCxRQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLEVBQUU7O0FBRXRELFVBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0tBQ2pHOztBQUVELFFBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLDBCQUEwQixHQUFHO0FBQ2xGLG1CQUFhLFVBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoQyxVQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFOztBQUV0QixlQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtPQUMxRDtLQUNGLENBQUMsQ0FBQTtBQUNGLGlCQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0dBQzlCO0FBQ0QsWUFBVSxFQUFBLHNCQUFHO0FBQ1gsaUJBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2FBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztLQUFBLENBQUMsQ0FBQTtBQUMxRSxpQkFBYSxDQUFDLEtBQUssRUFBRSxDQUFBO0FBQ3JCLFNBQUssSUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQyxXQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDaEI7QUFDRCxRQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFBO0dBQ3ZCO0FBQ0QsV0FBUyxFQUFBLHFCQUFhO0FBQ3BCLFFBQU0sUUFBUSxHQUFHLHVCQUFjLENBQUE7QUFDL0IsUUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDNUIsUUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO0FBQ3ZCLGNBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtLQUM1QztBQUNELFdBQU8sUUFBUSxDQUFBO0dBQ2hCO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQXNCO0FBQ3JDLFdBQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSzthQUFJLEtBQUssQ0FBQyxVQUFVO0tBQUEsQ0FBQyxDQUFBO0dBQ2pFO0FBQ0QsZUFBYSxFQUFBLHVCQUFDLGNBQXNCLEVBQUU7QUFDcEMsUUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7QUFDcEMsUUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFRLEVBQUU7QUFDeEMsY0FBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7S0FDdkMsQ0FBQyxDQUFBO0dBQ0g7QUFDRCxrQkFBZ0IsRUFBQSwwQkFBQyxpQkFBeUIsRUFBRTtBQUMxQyxRQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUE7QUFDMUMsUUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFRLEVBQUU7QUFDeEMsY0FBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtLQUM3QyxDQUFDLENBQUE7R0FDSDtDQUNGLENBQUE7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUEiLCJmaWxlIjoiL1VzZXJzL0NyaXNGb3Juby9kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC9saWIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTGludGVyVUkgZnJvbSAnLi9tYWluJ1xuaW1wb3J0IHR5cGUgSW50ZW50aW9ucyBmcm9tICcuL2ludGVudGlvbnMnXG5cbmNvbnN0IGlkbGVDYWxsYmFja3MgPSBuZXcgU2V0KClcblxuY29uc3QgbGludGVyVWlEZWZhdWx0ID0ge1xuICBpbnN0YW5jZXM6IG5ldyBTZXQoKSxcbiAgc2lnbmFsUmVnaXN0cnk6IG51bGwsXG4gIHN0YXR1c0JhclJlZ2lzdHJ5OiBudWxsLFxuICBhY3RpdmF0ZSgpIHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdsaW50ZXItdWktZGVmYXVsdC51c2VCdXN5U2lnbmFsJykpIHtcbiAgICAgIC8vIFRoaXMgaXMgYSBuZWNlc3NhcnkgZXZpbCwgc2VlIHN0ZWVsYnJhaW4vbGludGVyIzEzNTVcbiAgICAgIGF0b20ucGFja2FnZXMuZ2V0TG9hZGVkUGFja2FnZSgnbGludGVyLXVpLWRlZmF1bHQnKS5tZXRhZGF0YVsncGFja2FnZS1kZXBzJ10ucHVzaCgnYnVzeS1zaWduYWwnKVxuICAgIH1cblxuICAgIGNvbnN0IGNhbGxiYWNrSUQgPSB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjayhmdW5jdGlvbiBpbnN0YWxsTGludGVyVUlEZWZhdWx0RGVwcygpIHtcbiAgICAgIGlkbGVDYWxsYmFja3MuZGVsZXRlKGNhbGxiYWNrSUQpXG4gICAgICBpZiAoIWF0b20uaW5TcGVjTW9kZSgpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBnbG9iYWwtcmVxdWlyZVxuICAgICAgICByZXF1aXJlKCdhdG9tLXBhY2thZ2UtZGVwcycpLmluc3RhbGwoJ2xpbnRlci11aS1kZWZhdWx0JylcbiAgICAgIH1cbiAgICB9KVxuICAgIGlkbGVDYWxsYmFja3MuYWRkKGNhbGxiYWNrSUQpXG4gIH0sXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgaWRsZUNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrSUQgPT4gd2luZG93LmNhbmNlbElkbGVDYWxsYmFjayhjYWxsYmFja0lEKSlcbiAgICBpZGxlQ2FsbGJhY2tzLmNsZWFyKClcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHRoaXMuaW5zdGFuY2VzKSB7XG4gICAgICBlbnRyeS5kaXNwb3NlKClcbiAgICB9XG4gICAgdGhpcy5pbnN0YW5jZXMuY2xlYXIoKVxuICB9LFxuICBwcm92aWRlVUkoKTogTGludGVyVUkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IExpbnRlclVJKClcbiAgICB0aGlzLmluc3RhbmNlcy5hZGQoaW5zdGFuY2UpXG4gICAgaWYgKHRoaXMuc2lnbmFsUmVnaXN0cnkpIHtcbiAgICAgIGluc3RhbmNlLnNpZ25hbC5hdHRhY2godGhpcy5zaWduYWxSZWdpc3RyeSlcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlXG4gIH0sXG4gIHByb3ZpZGVJbnRlbnRpb25zKCk6IEFycmF5PEludGVudGlvbnM+IHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmluc3RhbmNlcykubWFwKGVudHJ5ID0+IGVudHJ5LmludGVudGlvbnMpXG4gIH0sXG4gIGNvbnN1bWVTaWduYWwoc2lnbmFsUmVnaXN0cnk6IE9iamVjdCkge1xuICAgIHRoaXMuc2lnbmFsUmVnaXN0cnkgPSBzaWduYWxSZWdpc3RyeVxuICAgIHRoaXMuaW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgICAgIGluc3RhbmNlLnNpZ25hbC5hdHRhY2goc2lnbmFsUmVnaXN0cnkpXG4gICAgfSlcbiAgfSxcbiAgY29uc3VtZVN0YXR1c0JhcihzdGF0dXNCYXJSZWdpc3RyeTogT2JqZWN0KSB7XG4gICAgdGhpcy5zdGF0dXNCYXJSZWdpc3RyeSA9IHN0YXR1c0JhclJlZ2lzdHJ5XG4gICAgdGhpcy5pbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbihpbnN0YW5jZSkge1xuICAgICAgaW5zdGFuY2Uuc3RhdHVzQmFyLmF0dGFjaChzdGF0dXNCYXJSZWdpc3RyeSlcbiAgICB9KVxuICB9LFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpbnRlclVpRGVmYXVsdFxuIl19