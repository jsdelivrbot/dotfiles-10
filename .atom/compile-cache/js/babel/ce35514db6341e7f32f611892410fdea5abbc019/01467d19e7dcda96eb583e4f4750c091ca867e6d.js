Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.create = create;
var PADDING_CHARACTER = ' ';

exports.PADDING_CHARACTER = PADDING_CHARACTER;

function create(intention, length) {
  var tries = 0;
  var element = document.createElement('intention-inline');
  element.style.opacity = '0';
  element.textContent = PADDING_CHARACTER.repeat(length);
  function checkStyle() {
    if (++tries === 20) {
      return;
    }
    var styles = getComputedStyle(element);
    if (styles.lineHeight && styles.width !== 'auto') {
      element.style.opacity = '1';
      element.style.top = '-' + styles.lineHeight;
    } else requestAnimationFrame(checkStyle);
  }
  requestAnimationFrame(checkStyle);
  return element;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvZWxlbWVudHMvaGlnaGxpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJTyxJQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7OztBQUU3QixTQUFTLE1BQU0sQ0FBQyxTQUF3QixFQUFFLE1BQWMsRUFBZTtBQUM1RSxNQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7QUFDYixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFDMUQsU0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBO0FBQzNCLFNBQU8sQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3RELFdBQVMsVUFBVSxHQUFHO0FBQ3BCLFFBQUksRUFBRSxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQUUsYUFBTTtLQUFFO0FBQzlCLFFBQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3hDLFFBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtBQUNoRCxhQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7QUFDM0IsYUFBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7S0FDNUMsTUFBTSxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQTtHQUN6QztBQUNELHVCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2pDLFNBQU8sT0FBTyxDQUFBO0NBQ2YiLCJmaWxlIjoiL1VzZXJzL0NyaXNGb3Juby8uYXRvbS9wYWNrYWdlcy9pbnRlbnRpb25zL2xpYi9lbGVtZW50cy9oaWdobGlnaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdHlwZSB7IEhpZ2hsaWdodEl0ZW0gfSBmcm9tICcuLi90eXBlcydcblxuZXhwb3J0IGNvbnN0IFBBRERJTkdfQ0hBUkFDVEVSID0gJ+KAhydcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShpbnRlbnRpb246IEhpZ2hsaWdodEl0ZW0sIGxlbmd0aDogbnVtYmVyKTogSFRNTEVsZW1lbnQge1xuICBsZXQgdHJpZXMgPSAwXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnRlbnRpb24taW5saW5lJylcbiAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSBQQURESU5HX0NIQVJBQ1RFUi5yZXBlYXQobGVuZ3RoKVxuICBmdW5jdGlvbiBjaGVja1N0eWxlKCkge1xuICAgIGlmICgrK3RyaWVzID09PSAyMCkgeyByZXR1cm4gfVxuICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcbiAgICBpZiAoc3R5bGVzLmxpbmVIZWlnaHQgJiYgc3R5bGVzLndpZHRoICE9PSAnYXV0bycpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAnLScgKyBzdHlsZXMubGluZUhlaWdodFxuICAgIH0gZWxzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2hlY2tTdHlsZSlcbiAgfVxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2hlY2tTdHlsZSlcbiAgcmV0dXJuIGVsZW1lbnRcbn1cbiJdfQ==