function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libUiRegistry = require('../lib/ui-registry');

var _libUiRegistry2 = _interopRequireDefault(_libUiRegistry);

var uiRegistry = undefined;
var uiProvider = undefined;

describe('UI Registry', function () {
  beforeEach(function () {
    if (uiRegistry) {
      uiRegistry.dispose();
    }
    uiRegistry = new _libUiRegistry2['default']();
    uiProvider = {
      name: 'Test',
      render: jasmine.createSpy('ui.didCalculateMessages'),
      didBeginLinting: jasmine.createSpy('ui.didBeginLinting'),
      didFinishLinting: jasmine.createSpy('ui.didFinishLinting'),
      dispose: jasmine.createSpy('ui.dispose')
    };
  });

  it('works in a lifecycle', function () {
    var testObjA = {};
    var testObjB = {};
    var testObjC = {};

    uiRegistry.add(uiProvider);

    uiRegistry.render(testObjA);
    expect(uiProvider.render).toHaveBeenCalledWith(testObjA);

    uiRegistry.didBeginLinting(testObjB);
    expect(uiProvider.didBeginLinting.mostRecentCall.args[0]).toBe(testObjB);
    expect(uiProvider.didBeginLinting.mostRecentCall.args[1]).toBe(null);

    uiRegistry.didFinishLinting(testObjC);
    expect(uiProvider.didFinishLinting.mostRecentCall.args[0]).toBe(testObjC);
    expect(uiProvider.didFinishLinting.mostRecentCall.args[1]).toBe(null);

    uiRegistry.dispose();
    expect(uiProvider.dispose).toHaveBeenCalled();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvbGludGVyL3NwZWMvdWktcmVnaXN0cnktc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs2QkFFdUIsb0JBQW9COzs7O0FBRTNDLElBQUksVUFBVSxZQUFBLENBQUE7QUFDZCxJQUFJLFVBQWtCLFlBQUEsQ0FBQTs7QUFFdEIsUUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFXO0FBQ2pDLFlBQVUsQ0FBQyxZQUFXO0FBQ3BCLFFBQUksVUFBVSxFQUFFO0FBQ2QsZ0JBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUNyQjtBQUNELGNBQVUsR0FBRyxnQ0FBZ0IsQ0FBQTtBQUM3QixjQUFVLEdBQUc7QUFDWCxVQUFJLEVBQUUsTUFBTTtBQUNaLFlBQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDO0FBQ3BELHFCQUFlLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQztBQUN4RCxzQkFBZ0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDO0FBQzFELGFBQU8sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztLQUN6QyxDQUFBO0dBQ0YsQ0FBQyxDQUFBOztBQUVGLElBQUUsQ0FBQyxzQkFBc0IsRUFBRSxZQUFXO0FBQ3BDLFFBQU0sUUFBZ0IsR0FBRyxFQUFFLENBQUE7QUFDM0IsUUFBTSxRQUFnQixHQUFHLEVBQUUsQ0FBQTtBQUMzQixRQUFNLFFBQWdCLEdBQUcsRUFBRSxDQUFBOztBQUUzQixjQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBOztBQUUxQixjQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzNCLFVBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRXhELGNBQVUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDcEMsVUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN4RSxVQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBOztBQUVwRSxjQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDckMsVUFBTSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3pFLFVBQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFckUsY0FBVSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ3BCLFVBQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtHQUM5QyxDQUFDLENBQUE7Q0FDSCxDQUFDLENBQUEiLCJmaWxlIjoiL1VzZXJzL0NyaXNGb3Juby8uYXRvbS9wYWNrYWdlcy9saW50ZXIvc3BlYy91aS1yZWdpc3RyeS1zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IFVJUmVnaXN0cnkgZnJvbSAnLi4vbGliL3VpLXJlZ2lzdHJ5J1xuXG5sZXQgdWlSZWdpc3RyeVxubGV0IHVpUHJvdmlkZXI6IE9iamVjdFxuXG5kZXNjcmliZSgnVUkgUmVnaXN0cnknLCBmdW5jdGlvbigpIHtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICBpZiAodWlSZWdpc3RyeSkge1xuICAgICAgdWlSZWdpc3RyeS5kaXNwb3NlKClcbiAgICB9XG4gICAgdWlSZWdpc3RyeSA9IG5ldyBVSVJlZ2lzdHJ5KClcbiAgICB1aVByb3ZpZGVyID0ge1xuICAgICAgbmFtZTogJ1Rlc3QnLFxuICAgICAgcmVuZGVyOiBqYXNtaW5lLmNyZWF0ZVNweSgndWkuZGlkQ2FsY3VsYXRlTWVzc2FnZXMnKSxcbiAgICAgIGRpZEJlZ2luTGludGluZzogamFzbWluZS5jcmVhdGVTcHkoJ3VpLmRpZEJlZ2luTGludGluZycpLFxuICAgICAgZGlkRmluaXNoTGludGluZzogamFzbWluZS5jcmVhdGVTcHkoJ3VpLmRpZEZpbmlzaExpbnRpbmcnKSxcbiAgICAgIGRpc3Bvc2U6IGphc21pbmUuY3JlYXRlU3B5KCd1aS5kaXNwb3NlJyksXG4gICAgfVxuICB9KVxuXG4gIGl0KCd3b3JrcyBpbiBhIGxpZmVjeWNsZScsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHRlc3RPYmpBOiBPYmplY3QgPSB7fVxuICAgIGNvbnN0IHRlc3RPYmpCOiBPYmplY3QgPSB7fVxuICAgIGNvbnN0IHRlc3RPYmpDOiBPYmplY3QgPSB7fVxuXG4gICAgdWlSZWdpc3RyeS5hZGQodWlQcm92aWRlcilcblxuICAgIHVpUmVnaXN0cnkucmVuZGVyKHRlc3RPYmpBKVxuICAgIGV4cGVjdCh1aVByb3ZpZGVyLnJlbmRlcikudG9IYXZlQmVlbkNhbGxlZFdpdGgodGVzdE9iakEpXG5cbiAgICB1aVJlZ2lzdHJ5LmRpZEJlZ2luTGludGluZyh0ZXN0T2JqQilcbiAgICBleHBlY3QodWlQcm92aWRlci5kaWRCZWdpbkxpbnRpbmcubW9zdFJlY2VudENhbGwuYXJnc1swXSkudG9CZSh0ZXN0T2JqQilcbiAgICBleHBlY3QodWlQcm92aWRlci5kaWRCZWdpbkxpbnRpbmcubW9zdFJlY2VudENhbGwuYXJnc1sxXSkudG9CZShudWxsKVxuXG4gICAgdWlSZWdpc3RyeS5kaWRGaW5pc2hMaW50aW5nKHRlc3RPYmpDKVxuICAgIGV4cGVjdCh1aVByb3ZpZGVyLmRpZEZpbmlzaExpbnRpbmcubW9zdFJlY2VudENhbGwuYXJnc1swXSkudG9CZSh0ZXN0T2JqQylcbiAgICBleHBlY3QodWlQcm92aWRlci5kaWRGaW5pc2hMaW50aW5nLm1vc3RSZWNlbnRDYWxsLmFyZ3NbMV0pLnRvQmUobnVsbClcblxuICAgIHVpUmVnaXN0cnkuZGlzcG9zZSgpXG4gICAgZXhwZWN0KHVpUHJvdmlkZXIuZGlzcG9zZSkudG9IYXZlQmVlbkNhbGxlZCgpXG4gIH0pXG59KVxuIl19