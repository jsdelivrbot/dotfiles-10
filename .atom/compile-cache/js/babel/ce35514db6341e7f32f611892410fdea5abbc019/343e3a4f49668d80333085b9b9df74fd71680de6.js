Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.showError = showError;

function showError(title, description, points) {
  var renderedPoints = points.map(function (item) {
    return '  • ' + item;
  });
  atom.notifications.addWarning('[Linter] ' + title, {
    dismissable: true,
    detail: description + '\n' + renderedPoints.join('\n')
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvbGludGVyL2xpYi92YWxpZGF0ZS9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRU8sU0FBUyxTQUFTLENBQUMsS0FBYSxFQUFFLFdBQW1CLEVBQUUsTUFBcUIsRUFBRTtBQUNuRixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtvQkFBVyxJQUFJO0dBQUUsQ0FBQyxDQUFBO0FBQ3hELE1BQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxlQUFhLEtBQUssRUFBSTtBQUNqRCxlQUFXLEVBQUUsSUFBSTtBQUNqQixVQUFNLEVBQUssV0FBVyxVQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUU7R0FDdkQsQ0FBQyxDQUFBO0NBQ0giLCJmaWxlIjoiL1VzZXJzL0NyaXNGb3Juby9kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9saW50ZXIvbGliL3ZhbGlkYXRlL2hlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHBvaW50czogQXJyYXk8c3RyaW5nPikge1xuICBjb25zdCByZW5kZXJlZFBvaW50cyA9IHBvaW50cy5tYXAoaXRlbSA9PiBgICDigKIgJHtpdGVtfWApXG4gIGF0b20ubm90aWZpY2F0aW9ucy5hZGRXYXJuaW5nKGBbTGludGVyXSAke3RpdGxlfWAsIHtcbiAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICBkZXRhaWw6IGAke2Rlc2NyaXB0aW9ufVxcbiR7cmVuZGVyZWRQb2ludHMuam9pbignXFxuJyl9YCxcbiAgfSlcbn1cbiJdfQ==