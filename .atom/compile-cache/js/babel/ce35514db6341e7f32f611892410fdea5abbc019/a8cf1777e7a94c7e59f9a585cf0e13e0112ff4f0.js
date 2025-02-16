function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libElement = require('../lib/element');

var _libElement2 = _interopRequireDefault(_libElement);

describe('Element', function () {
  var element = undefined;

  beforeEach(function () {
    element = new _libElement2['default']();
    spyOn(element, 'setTooltip').andCallThrough();
    spyOn(element, 'setBusy').andCallThrough();
  });
  afterEach(function () {
    element.dispose();
  });

  it('sets a title properly', function () {
    element.update(['Hello'], []);
    expect(element.setBusy).toHaveBeenCalledWith(true);
    expect(element.setTooltip).toHaveBeenCalledWith('<strong>Current:</strong><br>Hello');
  });
  it('escapes the given texts', function () {
    element.update(['<div>'], []);
    expect(element.setBusy).toHaveBeenCalledWith(true);
    expect(element.setTooltip).toHaveBeenCalledWith('<strong>Current:</strong><br>&lt;div&gt;');
  });
  it('shows idle message when nothing is provided', function () {
    element.update([], []);
    expect(element.setBusy).toHaveBeenCalledWith(false);
    expect(element.setTooltip).toHaveBeenCalledWith('Idle');
  });
  it('shows only history when current is not present', function () {
    element.update([], [{ title: 'Yo', duration: '1m' }]);
    expect(element.setBusy).toHaveBeenCalledWith(false);
    expect(element.setTooltip).toHaveBeenCalledWith('<strong>History:</strong><br>Yo (1m)');
  });
  it('shows both history and current when both are present', function () {
    element.update(['Hey'], [{ title: 'Yo', duration: '1m' }]);
    expect(element.setBusy).toHaveBeenCalledWith(true);
    expect(element.setTooltip).toHaveBeenCalledWith('<strong>History:</strong><br>Yo (1m)<br><strong>Current:</strong><br>Hey');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvYnVzeS1zaWduYWwvc3BlYy9lbGVtZW50LXNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7MEJBRW9CLGdCQUFnQjs7OztBQUVwQyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVc7QUFDN0IsTUFBSSxPQUFPLFlBQUEsQ0FBQTs7QUFFWCxZQUFVLENBQUMsWUFBVztBQUNwQixXQUFPLEdBQUcsNkJBQWEsQ0FBQTtBQUN2QixTQUFLLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFBO0FBQzdDLFNBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7R0FDM0MsQ0FBQyxDQUFBO0FBQ0YsV0FBUyxDQUFDLFlBQVc7QUFDbkIsV0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0dBQ2xCLENBQUMsQ0FBQTs7QUFFRixJQUFFLENBQUMsdUJBQXVCLEVBQUUsWUFBVztBQUNyQyxXQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDN0IsVUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsRCxVQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLG9DQUFvQyxDQUFDLENBQUE7R0FDdEYsQ0FBQyxDQUFBO0FBQ0YsSUFBRSxDQUFDLHlCQUF5QixFQUFFLFlBQVc7QUFDdkMsV0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQzdCLFVBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEQsVUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO0dBQzVGLENBQUMsQ0FBQTtBQUNGLElBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxZQUFXO0FBQzNELFdBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3RCLFVBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbkQsVUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUN4RCxDQUFDLENBQUE7QUFDRixJQUFFLENBQUMsZ0RBQWdELEVBQUUsWUFBVztBQUM5RCxXQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFVBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbkQsVUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO0dBQ3hGLENBQUMsQ0FBQTtBQUNGLElBQUUsQ0FBQyxzREFBc0QsRUFBRSxZQUFXO0FBQ3BFLFdBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzFELFVBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEQsVUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQywwRUFBMEUsQ0FBQyxDQUFBO0dBQzVILENBQUMsQ0FBQTtDQUNILENBQUMsQ0FBQSIsImZpbGUiOiIvVXNlcnMvQ3Jpc0Zvcm5vLy5hdG9tL3BhY2thZ2VzL2J1c3ktc2lnbmFsL3NwZWMvZWxlbWVudC1zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi4vbGliL2VsZW1lbnQnXG5cbmRlc2NyaWJlKCdFbGVtZW50JywgZnVuY3Rpb24oKSB7XG4gIGxldCBlbGVtZW50XG5cbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICBlbGVtZW50ID0gbmV3IEVsZW1lbnQoKVxuICAgIHNweU9uKGVsZW1lbnQsICdzZXRUb29sdGlwJykuYW5kQ2FsbFRocm91Z2goKVxuICAgIHNweU9uKGVsZW1lbnQsICdzZXRCdXN5JykuYW5kQ2FsbFRocm91Z2goKVxuICB9KVxuICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgZWxlbWVudC5kaXNwb3NlKClcbiAgfSlcblxuICBpdCgnc2V0cyBhIHRpdGxlIHByb3Blcmx5JywgZnVuY3Rpb24oKSB7XG4gICAgZWxlbWVudC51cGRhdGUoWydIZWxsbyddLCBbXSlcbiAgICBleHBlY3QoZWxlbWVudC5zZXRCdXN5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKVxuICAgIGV4cGVjdChlbGVtZW50LnNldFRvb2x0aXApLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCc8c3Ryb25nPkN1cnJlbnQ6PC9zdHJvbmc+PGJyPkhlbGxvJylcbiAgfSlcbiAgaXQoJ2VzY2FwZXMgdGhlIGdpdmVuIHRleHRzJywgZnVuY3Rpb24oKSB7XG4gICAgZWxlbWVudC51cGRhdGUoWyc8ZGl2PiddLCBbXSlcbiAgICBleHBlY3QoZWxlbWVudC5zZXRCdXN5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKVxuICAgIGV4cGVjdChlbGVtZW50LnNldFRvb2x0aXApLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCc8c3Ryb25nPkN1cnJlbnQ6PC9zdHJvbmc+PGJyPiZsdDtkaXYmZ3Q7JylcbiAgfSlcbiAgaXQoJ3Nob3dzIGlkbGUgbWVzc2FnZSB3aGVuIG5vdGhpbmcgaXMgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBlbGVtZW50LnVwZGF0ZShbXSwgW10pXG4gICAgZXhwZWN0KGVsZW1lbnQuc2V0QnVzeSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZmFsc2UpXG4gICAgZXhwZWN0KGVsZW1lbnQuc2V0VG9vbHRpcCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ0lkbGUnKVxuICB9KVxuICBpdCgnc2hvd3Mgb25seSBoaXN0b3J5IHdoZW4gY3VycmVudCBpcyBub3QgcHJlc2VudCcsIGZ1bmN0aW9uKCkge1xuICAgIGVsZW1lbnQudXBkYXRlKFtdLCBbeyB0aXRsZTogJ1lvJywgZHVyYXRpb246ICcxbScgfV0pXG4gICAgZXhwZWN0KGVsZW1lbnQuc2V0QnVzeSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZmFsc2UpXG4gICAgZXhwZWN0KGVsZW1lbnQuc2V0VG9vbHRpcCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJzxzdHJvbmc+SGlzdG9yeTo8L3N0cm9uZz48YnI+WW8gKDFtKScpXG4gIH0pXG4gIGl0KCdzaG93cyBib3RoIGhpc3RvcnkgYW5kIGN1cnJlbnQgd2hlbiBib3RoIGFyZSBwcmVzZW50JywgZnVuY3Rpb24oKSB7XG4gICAgZWxlbWVudC51cGRhdGUoWydIZXknXSwgW3sgdGl0bGU6ICdZbycsIGR1cmF0aW9uOiAnMW0nIH1dKVxuICAgIGV4cGVjdChlbGVtZW50LnNldEJ1c3kpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpXG4gICAgZXhwZWN0KGVsZW1lbnQuc2V0VG9vbHRpcCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJzxzdHJvbmc+SGlzdG9yeTo8L3N0cm9uZz48YnI+WW8gKDFtKTxicj48c3Ryb25nPkN1cnJlbnQ6PC9zdHJvbmc+PGJyPkhleScpXG4gIH0pXG59KVxuIl19