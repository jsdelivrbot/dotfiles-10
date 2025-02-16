function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libIndieRegistry = require('../lib/indie-registry');

var _libIndieRegistry2 = _interopRequireDefault(_libIndieRegistry);

var _common = require('./common');

describe('IndieRegistry', function () {
  var indieRegistry = undefined;

  beforeEach(function () {
    indieRegistry = new _libIndieRegistry2['default']();
  });
  afterEach(function () {
    indieRegistry.dispose();
  });

  it('triggers observe with existing and new delegates', function () {
    var observeCalled = 0;
    indieRegistry.register({ name: 'Chi' }, 2);
    indieRegistry.observe(function () {
      observeCalled++;
    });
    expect(observeCalled).toBe(1);
    indieRegistry.register({ name: 'Ping' }, 2);
    expect(observeCalled).toBe(2);
    indieRegistry.register({ name: 'Pong' }, 2);
    expect(observeCalled).toBe(3);
  });
  it('removes delegates from registry as soon as they are dispose', function () {
    expect(indieRegistry.delegates.size).toBe(0);
    var delegate = indieRegistry.register({ name: 'Chi' }, 2);
    expect(indieRegistry.delegates.size).toBe(1);
    delegate.dispose();
    expect(indieRegistry.delegates.size).toBe(0);
  });
  it('triggers update as delegates are updated', function () {
    var timesUpdated = 0;
    indieRegistry.onDidUpdate(function () {
      timesUpdated++;
    });
    expect(timesUpdated).toBe(0);
    var delegate = indieRegistry.register({ name: 'Panda' }, 2);
    expect(timesUpdated).toBe(0);
    delegate.setAllMessages([(0, _common.getMessage)()]);
    expect(timesUpdated).toBe(1);
    delegate.setAllMessages([(0, _common.getMessage)()]);
    expect(timesUpdated).toBe(2);
    delegate.dispose();
    delegate.setAllMessages([(0, _common.getMessage)()]);
    expect(timesUpdated).toBe(2);
  });
  it('passes on version correctly to the delegates', function () {
    expect(indieRegistry.register({ name: 'Ola' }, 2).version).toBe(2);
    expect(indieRegistry.register({ name: 'Hello' }, 1).version).toBe(1);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvbGludGVyL3NwZWMvaW5kaWUtcmVnaXN0cnktc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztnQ0FFMEIsdUJBQXVCOzs7O3NCQUN0QixVQUFVOztBQUVyQyxRQUFRLENBQUMsZUFBZSxFQUFFLFlBQVc7QUFDbkMsTUFBSSxhQUFhLFlBQUEsQ0FBQTs7QUFFakIsWUFBVSxDQUFDLFlBQVc7QUFDcEIsaUJBQWEsR0FBRyxtQ0FBbUIsQ0FBQTtHQUNwQyxDQUFDLENBQUE7QUFDRixXQUFTLENBQUMsWUFBVztBQUNuQixpQkFBYSxDQUFDLE9BQU8sRUFBRSxDQUFBO0dBQ3hCLENBQUMsQ0FBQTs7QUFFRixJQUFFLENBQUMsa0RBQWtELEVBQUUsWUFBVztBQUNoRSxRQUFJLGFBQWEsR0FBRyxDQUFDLENBQUE7QUFDckIsaUJBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDMUMsaUJBQWEsQ0FBQyxPQUFPLENBQUMsWUFBVztBQUMvQixtQkFBYSxFQUFFLENBQUE7S0FDaEIsQ0FBQyxDQUFBO0FBQ0YsVUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM3QixpQkFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUMzQyxVQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzdCLGlCQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzNDLFVBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FDOUIsQ0FBQyxDQUFBO0FBQ0YsSUFBRSxDQUFDLDZEQUE2RCxFQUFFLFlBQVc7QUFDM0UsVUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzVDLFFBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDM0QsVUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzVDLFlBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUNsQixVQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FDN0MsQ0FBQyxDQUFBO0FBQ0YsSUFBRSxDQUFDLDBDQUEwQyxFQUFFLFlBQVc7QUFDeEQsUUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLGlCQUFhLENBQUMsV0FBVyxDQUFDLFlBQVc7QUFDbkMsa0JBQVksRUFBRSxDQUFBO0tBQ2YsQ0FBQyxDQUFBO0FBQ0YsVUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM1QixRQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzdELFVBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDNUIsWUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLHlCQUFZLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLFVBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDNUIsWUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLHlCQUFZLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLFVBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDNUIsWUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ2xCLFlBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyx5QkFBWSxDQUFDLENBQUMsQ0FBQTtBQUN2QyxVQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQzdCLENBQUMsQ0FBQTtBQUNGLElBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxZQUFXO0FBQzVELFVBQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNsRSxVQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FDckUsQ0FBQyxDQUFBO0NBQ0gsQ0FBQyxDQUFBIiwiZmlsZSI6Ii9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvbGludGVyL3NwZWMvaW5kaWUtcmVnaXN0cnktc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCBJbmRpZVJlZ2lzdHJ5IGZyb20gJy4uL2xpYi9pbmRpZS1yZWdpc3RyeSdcbmltcG9ydCB7IGdldE1lc3NhZ2UgfSBmcm9tICcuL2NvbW1vbidcblxuZGVzY3JpYmUoJ0luZGllUmVnaXN0cnknLCBmdW5jdGlvbigpIHtcbiAgbGV0IGluZGllUmVnaXN0cnlcblxuICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgIGluZGllUmVnaXN0cnkgPSBuZXcgSW5kaWVSZWdpc3RyeSgpXG4gIH0pXG4gIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICBpbmRpZVJlZ2lzdHJ5LmRpc3Bvc2UoKVxuICB9KVxuXG4gIGl0KCd0cmlnZ2VycyBvYnNlcnZlIHdpdGggZXhpc3RpbmcgYW5kIG5ldyBkZWxlZ2F0ZXMnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgb2JzZXJ2ZUNhbGxlZCA9IDBcbiAgICBpbmRpZVJlZ2lzdHJ5LnJlZ2lzdGVyKHsgbmFtZTogJ0NoaScgfSwgMilcbiAgICBpbmRpZVJlZ2lzdHJ5Lm9ic2VydmUoZnVuY3Rpb24oKSB7XG4gICAgICBvYnNlcnZlQ2FsbGVkKytcbiAgICB9KVxuICAgIGV4cGVjdChvYnNlcnZlQ2FsbGVkKS50b0JlKDEpXG4gICAgaW5kaWVSZWdpc3RyeS5yZWdpc3Rlcih7IG5hbWU6ICdQaW5nJyB9LCAyKVxuICAgIGV4cGVjdChvYnNlcnZlQ2FsbGVkKS50b0JlKDIpXG4gICAgaW5kaWVSZWdpc3RyeS5yZWdpc3Rlcih7IG5hbWU6ICdQb25nJyB9LCAyKVxuICAgIGV4cGVjdChvYnNlcnZlQ2FsbGVkKS50b0JlKDMpXG4gIH0pXG4gIGl0KCdyZW1vdmVzIGRlbGVnYXRlcyBmcm9tIHJlZ2lzdHJ5IGFzIHNvb24gYXMgdGhleSBhcmUgZGlzcG9zZScsIGZ1bmN0aW9uKCkge1xuICAgIGV4cGVjdChpbmRpZVJlZ2lzdHJ5LmRlbGVnYXRlcy5zaXplKS50b0JlKDApXG4gICAgY29uc3QgZGVsZWdhdGUgPSBpbmRpZVJlZ2lzdHJ5LnJlZ2lzdGVyKHsgbmFtZTogJ0NoaScgfSwgMilcbiAgICBleHBlY3QoaW5kaWVSZWdpc3RyeS5kZWxlZ2F0ZXMuc2l6ZSkudG9CZSgxKVxuICAgIGRlbGVnYXRlLmRpc3Bvc2UoKVxuICAgIGV4cGVjdChpbmRpZVJlZ2lzdHJ5LmRlbGVnYXRlcy5zaXplKS50b0JlKDApXG4gIH0pXG4gIGl0KCd0cmlnZ2VycyB1cGRhdGUgYXMgZGVsZWdhdGVzIGFyZSB1cGRhdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHRpbWVzVXBkYXRlZCA9IDBcbiAgICBpbmRpZVJlZ2lzdHJ5Lm9uRGlkVXBkYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgdGltZXNVcGRhdGVkKytcbiAgICB9KVxuICAgIGV4cGVjdCh0aW1lc1VwZGF0ZWQpLnRvQmUoMClcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IGluZGllUmVnaXN0cnkucmVnaXN0ZXIoeyBuYW1lOiAnUGFuZGEnIH0sIDIpXG4gICAgZXhwZWN0KHRpbWVzVXBkYXRlZCkudG9CZSgwKVxuICAgIGRlbGVnYXRlLnNldEFsbE1lc3NhZ2VzKFtnZXRNZXNzYWdlKCldKVxuICAgIGV4cGVjdCh0aW1lc1VwZGF0ZWQpLnRvQmUoMSlcbiAgICBkZWxlZ2F0ZS5zZXRBbGxNZXNzYWdlcyhbZ2V0TWVzc2FnZSgpXSlcbiAgICBleHBlY3QodGltZXNVcGRhdGVkKS50b0JlKDIpXG4gICAgZGVsZWdhdGUuZGlzcG9zZSgpXG4gICAgZGVsZWdhdGUuc2V0QWxsTWVzc2FnZXMoW2dldE1lc3NhZ2UoKV0pXG4gICAgZXhwZWN0KHRpbWVzVXBkYXRlZCkudG9CZSgyKVxuICB9KVxuICBpdCgncGFzc2VzIG9uIHZlcnNpb24gY29ycmVjdGx5IHRvIHRoZSBkZWxlZ2F0ZXMnLCBmdW5jdGlvbigpIHtcbiAgICBleHBlY3QoaW5kaWVSZWdpc3RyeS5yZWdpc3Rlcih7IG5hbWU6ICdPbGEnIH0sIDIpLnZlcnNpb24pLnRvQmUoMilcbiAgICBleHBlY3QoaW5kaWVSZWdpc3RyeS5yZWdpc3Rlcih7IG5hbWU6ICdIZWxsbycgfSwgMSkudmVyc2lvbikudG9CZSgxKVxuICB9KVxufSlcbiJdfQ==