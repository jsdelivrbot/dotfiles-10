function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _libHelpers = require('../lib/helpers');

var Helpers = _interopRequireWildcard(_libHelpers);

describe('Helpers', function () {
  describe('processListItems', function () {
    it('works', function () {
      var suggestions = [{
        priority: 100,
        title: 'title 1',
        'class': 'class1',
        selected: function selected() {},
        icon: 'icon1'
      }, {
        priority: 200,
        title: 'title 2',
        'class': 'class2',
        selected: function selected() {}
      }];
      suggestions = Helpers.processListItems(suggestions);
      expect(suggestions[0].priority).toBe(200);
      expect(suggestions[0][Helpers.$class]).toBe('class2');
      expect(suggestions[1].priority).toBe(100);
      expect(suggestions[1][Helpers.$class]).toBe('class1 icon icon-icon1');
    });
  });
  describe('showError', function () {
    it('works well with error objects', function () {
      var error = new Error('Something');
      Helpers.showError(error);
      var notification = atom.notifications.getNotifications()[0];
      expect(notification).toBeDefined();
      expect(notification.message).toBe('[Intentions] Something');
      expect(notification.options.detail).toBe(error.stack);
    });
    it('works well with strings', function () {
      var title = 'Some Title';
      var detail = 'Some Detail';

      Helpers.showError(title, detail);
      var notification = atom.notifications.getNotifications()[0];
      expect(notification).toBeDefined();
      expect(notification.message).toBe('[Intentions] ' + title);
      expect(notification.options.detail).toBe(detail);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvaW50ZW50aW9ucy9zcGVjL2hlbHBlcnMtc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzswQkFFeUIsZ0JBQWdCOztJQUE3QixPQUFPOztBQUVuQixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVc7QUFDN0IsVUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQVc7QUFDdEMsTUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFXO0FBQ3JCLFVBQUksV0FBMEIsR0FBRyxDQUMvQjtBQUNFLGdCQUFRLEVBQUUsR0FBRztBQUNiLGFBQUssRUFBRSxTQUFTO0FBQ2hCLGlCQUFPLFFBQVE7QUFDZixnQkFBUSxFQUFBLG9CQUFHLEVBQUU7QUFDYixZQUFJLEVBQUUsT0FBTztPQUNkLEVBQ0Q7QUFDRSxnQkFBUSxFQUFFLEdBQUc7QUFDYixhQUFLLEVBQUUsU0FBUztBQUNoQixpQkFBTyxRQUFRO0FBQ2YsZ0JBQVEsRUFBQSxvQkFBRyxFQUFFO09BQ2QsQ0FDRixDQUFBO0FBQ0QsaUJBQVcsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDbkQsWUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDekMsWUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDckQsWUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDekMsWUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtLQUN0RSxDQUFDLENBQUE7R0FDSCxDQUFDLENBQUE7QUFDRixVQUFRLENBQUMsV0FBVyxFQUFFLFlBQVc7QUFDL0IsTUFBRSxDQUFDLCtCQUErQixFQUFFLFlBQVc7QUFDN0MsVUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDcEMsYUFBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN4QixVQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0QsWUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQ2xDLFlBQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUE7QUFDM0QsWUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUN0RCxDQUFDLENBQUE7QUFDRixNQUFFLENBQUMseUJBQXlCLEVBQUUsWUFBVztBQUN2QyxVQUFNLEtBQUssR0FBRyxZQUFZLENBQUE7QUFDMUIsVUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFBOztBQUU1QixhQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUNoQyxVQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0QsWUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQ2xDLFlBQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQTtBQUMxRCxZQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDakQsQ0FBQyxDQUFBO0dBQ0gsQ0FBQyxDQUFBO0NBQ0gsQ0FBQyxDQUFBIiwiZmlsZSI6Ii9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvaW50ZW50aW9ucy9zcGVjL2hlbHBlcnMtc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCAqIGFzIEhlbHBlcnMgZnJvbSAnLi4vbGliL2hlbHBlcnMnXG5cbmRlc2NyaWJlKCdIZWxwZXJzJywgZnVuY3Rpb24oKSB7XG4gIGRlc2NyaWJlKCdwcm9jZXNzTGlzdEl0ZW1zJywgZnVuY3Rpb24oKSB7XG4gICAgaXQoJ3dvcmtzJywgZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgc3VnZ2VzdGlvbnM6IEFycmF5PE9iamVjdD4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcmlvcml0eTogMTAwLFxuICAgICAgICAgIHRpdGxlOiAndGl0bGUgMScsXG4gICAgICAgICAgY2xhc3M6ICdjbGFzczEnLFxuICAgICAgICAgIHNlbGVjdGVkKCkge30sXG4gICAgICAgICAgaWNvbjogJ2ljb24xJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByaW9yaXR5OiAyMDAsXG4gICAgICAgICAgdGl0bGU6ICd0aXRsZSAyJyxcbiAgICAgICAgICBjbGFzczogJ2NsYXNzMicsXG4gICAgICAgICAgc2VsZWN0ZWQoKSB7fSxcbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICAgIHN1Z2dlc3Rpb25zID0gSGVscGVycy5wcm9jZXNzTGlzdEl0ZW1zKHN1Z2dlc3Rpb25zKVxuICAgICAgZXhwZWN0KHN1Z2dlc3Rpb25zWzBdLnByaW9yaXR5KS50b0JlKDIwMClcbiAgICAgIGV4cGVjdChzdWdnZXN0aW9uc1swXVtIZWxwZXJzLiRjbGFzc10pLnRvQmUoJ2NsYXNzMicpXG4gICAgICBleHBlY3Qoc3VnZ2VzdGlvbnNbMV0ucHJpb3JpdHkpLnRvQmUoMTAwKVxuICAgICAgZXhwZWN0KHN1Z2dlc3Rpb25zWzFdW0hlbHBlcnMuJGNsYXNzXSkudG9CZSgnY2xhc3MxIGljb24gaWNvbi1pY29uMScpXG4gICAgfSlcbiAgfSlcbiAgZGVzY3JpYmUoJ3Nob3dFcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgIGl0KCd3b3JrcyB3ZWxsIHdpdGggZXJyb3Igb2JqZWN0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoJ1NvbWV0aGluZycpXG4gICAgICBIZWxwZXJzLnNob3dFcnJvcihlcnJvcilcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IGF0b20ubm90aWZpY2F0aW9ucy5nZXROb3RpZmljYXRpb25zKClbMF1cbiAgICAgIGV4cGVjdChub3RpZmljYXRpb24pLnRvQmVEZWZpbmVkKClcbiAgICAgIGV4cGVjdChub3RpZmljYXRpb24ubWVzc2FnZSkudG9CZSgnW0ludGVudGlvbnNdIFNvbWV0aGluZycpXG4gICAgICBleHBlY3Qobm90aWZpY2F0aW9uLm9wdGlvbnMuZGV0YWlsKS50b0JlKGVycm9yLnN0YWNrKVxuICAgIH0pXG4gICAgaXQoJ3dvcmtzIHdlbGwgd2l0aCBzdHJpbmdzJywgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCB0aXRsZSA9ICdTb21lIFRpdGxlJ1xuICAgICAgY29uc3QgZGV0YWlsID0gJ1NvbWUgRGV0YWlsJ1xuXG4gICAgICBIZWxwZXJzLnNob3dFcnJvcih0aXRsZSwgZGV0YWlsKVxuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gYXRvbS5ub3RpZmljYXRpb25zLmdldE5vdGlmaWNhdGlvbnMoKVswXVxuICAgICAgZXhwZWN0KG5vdGlmaWNhdGlvbikudG9CZURlZmluZWQoKVxuICAgICAgZXhwZWN0KG5vdGlmaWNhdGlvbi5tZXNzYWdlKS50b0JlKCdbSW50ZW50aW9uc10gJyArIHRpdGxlKVxuICAgICAgZXhwZWN0KG5vdGlmaWNhdGlvbi5vcHRpb25zLmRldGFpbCkudG9CZShkZXRhaWwpXG4gICAgfSlcbiAgfSlcbn0pXG4iXX0=