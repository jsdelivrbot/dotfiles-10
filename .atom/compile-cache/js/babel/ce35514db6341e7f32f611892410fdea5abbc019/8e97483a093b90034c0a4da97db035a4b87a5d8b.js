function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tinycolor2 = require('tinycolor2');

var _tinycolor22 = _interopRequireDefault(_tinycolor2);

var _helperWriteConfigFile = require('../helper/write-config-file');

var _helperWriteConfigFile2 = _interopRequireDefault(_helperWriteConfigFile);

var _helperToggleClassName = require('../helper/toggle-class-name');

var _helperToggleClassName2 = _interopRequireDefault(_helperToggleClassName);

var _helperToCamelCase = require('../helper/to-camel-case');

var _helperToCamelCase2 = _interopRequireDefault(_helperToCamelCase);

var _colorTemplatesJson = require('../color-templates.json');

var _colorTemplatesJson2 = _interopRequireDefault(_colorTemplatesJson);

var _buildColorSettings = require('./build-color-settings');

var _buildColorSettings2 = _interopRequireDefault(_buildColorSettings);

'use babel';

atom.config.observe('atom-material-ui.colors.abaseColor', function (color) {
    var baseColor = typeof color === 'object' ? (0, _tinycolor22['default'])(color.toHexString()) : (0, _tinycolor22['default'])(color);

    if (atom.config.get('atom-material-ui.colors.genAccent')) {
        var accentColor = baseColor.complement().saturate(20).lighten(5);
        return atom.config.set('atom-material-ui.colors.accentColor', accentColor.toRgbString());
    }

    return (0, _helperWriteConfigFile2['default'])((0, _buildColorSettings2['default'])(color, atom.config.get('atom-material-ui.colors.accentColor')), true);
});

atom.config.onDidChange('atom-material-ui.colors.predefinedColor', function (value) {
    var newValue = (0, _helperToCamelCase2['default'])(value.newValue);

    atom.config.set('atom-material-ui.colors.abaseColor', _colorTemplatesJson2['default'][newValue].base);
    atom.config.set('atom-material-ui.colors.accentColor', _colorTemplatesJson2['default'][newValue].accent);
});

atom.config.observe('atom-material-ui.colors.accentColor', function (color) {
    return (0, _helperWriteConfigFile2['default'])((0, _buildColorSettings2['default'])(atom.config.get('atom-material-ui.colors.abaseColor'), color), true);
});

atom.config.observe('atom-material-ui.colors.paintCursor', function (value) {
    return (0, _helperToggleClassName2['default'])('amu-paint-cursor', value);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvY29sb3JzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzBCQUVzQixZQUFZOzs7O3FDQUNOLDZCQUE2Qjs7OztxQ0FDN0IsNkJBQTZCOzs7O2lDQUNqQyx5QkFBeUI7Ozs7a0NBQ3RCLHlCQUF5Qjs7OztrQ0FDckIsd0JBQXdCOzs7O0FBUHZELFdBQVcsQ0FBQzs7QUFTWixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNqRSxRQUFNLFNBQVMsR0FBRyxBQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBSSw2QkFBVSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyw2QkFBVSxLQUFLLENBQUMsQ0FBQzs7QUFFbEcsUUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFO0FBQ3RELFlBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLGVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDNUY7O0FBRUQsV0FBTyx3Q0FDSCxxQ0FDSSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FDaEUsRUFDRCxJQUFJLENBQ1AsQ0FBQztDQUNMLENBQUMsQ0FBQzs7QUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyx5Q0FBeUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUMxRSxRQUFNLFFBQVEsR0FBRyxvQ0FBWSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTdDLFFBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLGdDQUFlLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JGLFFBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLGdDQUFlLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzNGLENBQUMsQ0FBQzs7QUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxVQUFBLEtBQUs7V0FDNUQsd0NBQ0kscUNBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsRUFBRSxLQUFLLENBQy9ELEVBQ0QsSUFBSSxDQUNQO0NBQ0osQ0FBQyxDQUFDOztBQUVILElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLFVBQUEsS0FBSztXQUFJLHdDQUFnQixrQkFBa0IsRUFBRSxLQUFLLENBQUM7Q0FBQSxDQUFDLENBQUMiLCJmaWxlIjoiL1VzZXJzL0NyaXNGb3Juby8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9jb2xvcnMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcbmltcG9ydCB3cml0ZUNvbmZpZ0ZpbGUgZnJvbSAnLi4vaGVscGVyL3dyaXRlLWNvbmZpZy1maWxlJztcbmltcG9ydCB0b2dnbGVDbGFzc05hbWUgZnJvbSAnLi4vaGVscGVyL3RvZ2dsZS1jbGFzcy1uYW1lJztcbmltcG9ydCB0b0NhbWVsQ2FzZSBmcm9tICcuLi9oZWxwZXIvdG8tY2FtZWwtY2FzZSc7XG5pbXBvcnQgY29sb3JUZW1wbGF0ZXMgZnJvbSAnLi4vY29sb3ItdGVtcGxhdGVzLmpzb24nO1xuaW1wb3J0IGJ1aWxkQ29sb3JTZXR0aW5ncyBmcm9tICcuL2J1aWxkLWNvbG9yLXNldHRpbmdzJztcblxuYXRvbS5jb25maWcub2JzZXJ2ZSgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWJhc2VDb2xvcicsIChjb2xvcikgPT4ge1xuICAgIGNvbnN0IGJhc2VDb2xvciA9ICh0eXBlb2YgY29sb3IgPT09ICdvYmplY3QnKSA/IHRpbnljb2xvcihjb2xvci50b0hleFN0cmluZygpKSA6IHRpbnljb2xvcihjb2xvcik7XG5cbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5nZW5BY2NlbnQnKSkge1xuICAgICAgICBjb25zdCBhY2NlbnRDb2xvciA9IGJhc2VDb2xvci5jb21wbGVtZW50KCkuc2F0dXJhdGUoMjApLmxpZ2h0ZW4oNSk7XG4gICAgICAgIHJldHVybiBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFjY2VudENvbG9yJywgYWNjZW50Q29sb3IudG9SZ2JTdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyaXRlQ29uZmlnRmlsZShcbiAgICAgICAgYnVpbGRDb2xvclNldHRpbmdzKFxuICAgICAgICAgICAgY29sb3IsIGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWNjZW50Q29sb3InKSxcbiAgICAgICAgKSxcbiAgICAgICAgdHJ1ZSxcbiAgICApO1xufSk7XG5cbmF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5wcmVkZWZpbmVkQ29sb3InLCAodmFsdWUpID0+IHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRvQ2FtZWxDYXNlKHZhbHVlLm5ld1ZhbHVlKTtcblxuICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWJhc2VDb2xvcicsIGNvbG9yVGVtcGxhdGVzW25ld1ZhbHVlXS5iYXNlKTtcbiAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFjY2VudENvbG9yJywgY29sb3JUZW1wbGF0ZXNbbmV3VmFsdWVdLmFjY2VudCk7XG59KTtcblxuYXRvbS5jb25maWcub2JzZXJ2ZSgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWNjZW50Q29sb3InLCBjb2xvciA9PiAoXG4gICAgd3JpdGVDb25maWdGaWxlKFxuICAgICAgICBidWlsZENvbG9yU2V0dGluZ3MoXG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFiYXNlQ29sb3InKSwgY29sb3IsXG4gICAgICAgICksXG4gICAgICAgIHRydWUsXG4gICAgKVxuKSk7XG5cbmF0b20uY29uZmlnLm9ic2VydmUoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLnBhaW50Q3Vyc29yJywgdmFsdWUgPT4gdG9nZ2xlQ2xhc3NOYW1lKCdhbXUtcGFpbnQtY3Vyc29yJywgdmFsdWUpKTtcbiJdfQ==