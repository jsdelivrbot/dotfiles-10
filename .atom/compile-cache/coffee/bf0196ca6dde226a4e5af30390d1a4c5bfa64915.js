(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module.exports = function() {
    var DEFINITIONS, VARIABLE_PATTERN, VARIABLE_TYPES, path;
    path = require('path');
    VARIABLE_PATTERN = '\\{{ VARIABLE }}[\\s]*[:=][\\s]*([^\\;\\n]+)[\\;|\\n]';
    VARIABLE_TYPES = [
      {
        type: 'sass',
        extensions: ['.scss', '.sass'],
        regExp: /([\$])([\w0-9-_]+)/i
      }, {
        type: 'less',
        extensions: ['.less'],
        regExp: /([\@])([\w0-9-_]+)/i
      }, {
        type: 'stylus',
        extensions: ['.stylus', '.styl'],
        regExp: /([\$])([\w0-9-_]+)/i
      }
    ];
    DEFINITIONS = {};
    return {
      find: function(string, pathName) {
        var SmartVariable, _match, _matches, _variables, extensions, fn, j, k, len, len1, ref, ref1, regExp, type;
        SmartVariable = this;
        _variables = [];
        for (j = 0, len = VARIABLE_TYPES.length; j < len; j++) {
          ref = VARIABLE_TYPES[j], type = ref.type, extensions = ref.extensions, regExp = ref.regExp;
          _matches = string.match(new RegExp(regExp.source, 'ig'));
          if (!_matches) {
            continue;
          }
          if (pathName) {
            if (ref1 = path.extname(pathName), indexOf.call(extensions, ref1) < 0) {
              continue;
            }
          }
          fn = function(type, extensions, _match) {
            var _index;
            if ((_index = string.indexOf(_match)) === -1) {
              return;
            }
            _variables.push({
              match: _match,
              type: type,
              extensions: extensions,
              start: _index,
              end: _index + _match.length,
              getDefinition: function() {
                return SmartVariable.getDefinition(this);
              },
              isVariable: true
            });
            return string = string.replace(_match, (new Array(_match.length + 1)).join(' '));
          };
          for (k = 0, len1 = _matches.length; k < len1; k++) {
            _match = _matches[k];
            fn(type, extensions, _match);
          }
        }
        return _variables;
      },
      getDefinition: function(variable, initial) {
        var _definition, _options, _pointer, _regExp, _results, extensions, match, type;
        match = variable.match, type = variable.type, extensions = variable.extensions;
        _regExp = new RegExp(VARIABLE_PATTERN.replace('{{ VARIABLE }}', match));
        if (_definition = DEFINITIONS[match]) {
          if (initial == null) {
            initial = _definition;
          }
          _pointer = _definition.pointer;
          return atom.project.bufferForPath(_pointer.filePath).then((function(_this) {
            return function(buffer) {
              var _found, _match, _text;
              _text = buffer.getTextInRange(_pointer.range);
              _match = _text.match(_regExp);
              if (!_match) {
                DEFINITIONS[match] = null;
                return _this.getDefinition(variable, initial);
              }
              _definition.value = _match[1];
              _found = (_this.find(_match[1], _pointer.filePath))[0];
              if (_found && _found.isVariable) {
                return _this.getDefinition(_found, initial);
              }
              return {
                value: _definition.value,
                variable: _definition.variable,
                type: _definition.type,
                pointer: initial.pointer
              };
            };
          })(this))["catch"]((function(_this) {
            return function(error) {
              return console.error(error);
            };
          })(this));
        }
        _options = {
          paths: (function() {
            var _extension, j, len, results;
            results = [];
            for (j = 0, len = extensions.length; j < len; j++) {
              _extension = extensions[j];
              results.push("**/*" + _extension);
            }
            return results;
          })()
        };
        _results = [];
        return atom.workspace.scan(_regExp, _options, function(result) {
          return _results.push(result);
        }).then((function(_this) {
          return function() {
            var _bestMatch, _bestMatchHits, _match, _pathFragments, _targetFragments, _targetPath, _thisMatchHits, i, j, k, len, len1, pathFragment, result;
            _targetPath = atom.workspace.getActivePaneItem().getPath();
            _targetFragments = _targetPath.split(path.sep);
            _bestMatch = null;
            _bestMatchHits = 0;
            for (j = 0, len = _results.length; j < len; j++) {
              result = _results[j];
              _thisMatchHits = 0;
              _pathFragments = result.filePath.split(path.sep);
              for (i = k = 0, len1 = _pathFragments.length; k < len1; i = ++k) {
                pathFragment = _pathFragments[i];
                if (pathFragment === _targetFragments[i]) {
                  _thisMatchHits++;
                }
              }
              if (_thisMatchHits > _bestMatchHits) {
                _bestMatch = result;
                _bestMatchHits = _thisMatchHits;
              }
            }
            if (!(_bestMatch && (_match = _bestMatch.matches[0]))) {
              return;
            }
            DEFINITIONS[match] = {
              value: null,
              variable: match,
              type: type,
              pointer: {
                filePath: _bestMatch.filePath,
                range: _match.range
              }
            };
            if (initial == null) {
              initial = DEFINITIONS[match];
            }
            return _this.getDefinition(variable, initial);
          };
        })(this))["catch"]((function(_this) {
          return function(error) {
            return console.error(error);
          };
        })(this));
      }
    };
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL0NyaXNGb3Juby9kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9jb2xvci1waWNrZXIvbGliL21vZHVsZXMvU21hcnRWYXJpYWJsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUk7QUFBQSxNQUFBOztFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUE7QUFDYixRQUFBO0lBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSO0lBS1AsZ0JBQUEsR0FBbUI7SUFFbkIsY0FBQSxHQUFpQjtNQUdiO1FBQ0ksSUFBQSxFQUFNLE1BRFY7UUFFSSxVQUFBLEVBQVksQ0FBQyxPQUFELEVBQVUsT0FBVixDQUZoQjtRQUdJLE1BQUEsRUFBUSxxQkFIWjtPQUhhLEVBV2I7UUFDSSxJQUFBLEVBQU0sTUFEVjtRQUVJLFVBQUEsRUFBWSxDQUFDLE9BQUQsQ0FGaEI7UUFHSSxNQUFBLEVBQVEscUJBSFo7T0FYYSxFQW1CYjtRQUNJLElBQUEsRUFBTSxRQURWO1FBRUksVUFBQSxFQUFZLENBQUMsU0FBRCxFQUFZLE9BQVosQ0FGaEI7UUFHSSxNQUFBLEVBQVEscUJBSFo7T0FuQmE7O0lBNkJqQixXQUFBLEdBQWM7QUFLZCxXQUFPO01BT0gsSUFBQSxFQUFNLFNBQUMsTUFBRCxFQUFTLFFBQVQ7QUFDRixZQUFBO1FBQUEsYUFBQSxHQUFnQjtRQUNoQixVQUFBLEdBQWE7QUFFYixhQUFBLGdEQUFBO21DQUFLLGlCQUFNLDZCQUFZO1VBQ25CLFFBQUEsR0FBVyxNQUFNLENBQUMsS0FBUCxDQUFrQixJQUFBLE1BQUEsQ0FBTyxNQUFNLENBQUMsTUFBZCxFQUFzQixJQUF0QixDQUFsQjtVQUNYLElBQUEsQ0FBZ0IsUUFBaEI7QUFBQSxxQkFBQTs7VUFHQSxJQUFHLFFBQUg7WUFDSSxXQUFpQixJQUFJLENBQUMsT0FBTCxDQUFhLFFBQWIsQ0FBRCxFQUFBLGFBQTJCLFVBQTNCLEVBQUEsSUFBQSxLQUFoQjtBQUFBLHVCQUFBO2FBREo7O2VBRytCLFNBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsTUFBbkI7QUFDM0IsZ0JBQUE7WUFBQSxJQUFVLENBQUMsTUFBQSxHQUFTLE1BQU0sQ0FBQyxPQUFQLENBQWUsTUFBZixDQUFWLENBQUEsS0FBb0MsQ0FBQyxDQUEvQztBQUFBLHFCQUFBOztZQUVBLFVBQVUsQ0FBQyxJQUFYLENBQ0k7Y0FBQSxLQUFBLEVBQU8sTUFBUDtjQUNBLElBQUEsRUFBTSxJQUROO2NBRUEsVUFBQSxFQUFZLFVBRlo7Y0FHQSxLQUFBLEVBQU8sTUFIUDtjQUlBLEdBQUEsRUFBSyxNQUFBLEdBQVMsTUFBTSxDQUFDLE1BSnJCO2NBTUEsYUFBQSxFQUFlLFNBQUE7dUJBQUcsYUFBYSxDQUFDLGFBQWQsQ0FBNEIsSUFBNUI7Y0FBSCxDQU5mO2NBT0EsVUFBQSxFQUFZLElBUFo7YUFESjttQkFjQSxNQUFBLEdBQVMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxNQUFmLEVBQXVCLENBQUssSUFBQSxLQUFBLENBQU0sTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBdEIsQ0FBTCxDQUE2QixDQUFDLElBQTlCLENBQW1DLEdBQW5DLENBQXZCO1VBakJrQjtBQUEvQixlQUFBLDRDQUFBOztlQUFnQyxNQUFNLFlBQVk7QUFBbEQ7QUFSSjtBQTBCQSxlQUFPO01BOUJMLENBUEg7TUE4Q0gsYUFBQSxFQUFlLFNBQUMsUUFBRCxFQUFXLE9BQVg7QUFDWCxZQUFBO1FBQUMsc0JBQUQsRUFBUSxvQkFBUixFQUFjO1FBR2QsT0FBQSxHQUFjLElBQUEsTUFBQSxDQUFRLGdCQUFnQixDQUFDLE9BQWpCLENBQXlCLGdCQUF6QixFQUEyQyxLQUEzQyxDQUFSO1FBR2QsSUFBRyxXQUFBLEdBQWMsV0FBWSxDQUFBLEtBQUEsQ0FBN0I7O1lBRUksVUFBVzs7VUFDWCxRQUFBLEdBQVcsV0FBVyxDQUFDO0FBR3ZCLGlCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYixDQUEyQixRQUFRLENBQUMsUUFBcEMsQ0FDSCxDQUFDLElBREUsQ0FDRyxDQUFBLFNBQUEsS0FBQTttQkFBQSxTQUFDLE1BQUQ7QUFDRixrQkFBQTtjQUFBLEtBQUEsR0FBUSxNQUFNLENBQUMsY0FBUCxDQUFzQixRQUFRLENBQUMsS0FBL0I7Y0FDUixNQUFBLEdBQVMsS0FBSyxDQUFDLEtBQU4sQ0FBWSxPQUFaO2NBR1QsSUFBQSxDQUFPLE1BQVA7Z0JBQ0ksV0FBWSxDQUFBLEtBQUEsQ0FBWixHQUFxQjtBQUNyQix1QkFBTyxLQUFDLENBQUEsYUFBRCxDQUFlLFFBQWYsRUFBeUIsT0FBekIsRUFGWDs7Y0FLQSxXQUFXLENBQUMsS0FBWixHQUFvQixNQUFPLENBQUEsQ0FBQTtjQUkzQixNQUFBLEdBQVMsQ0FBQyxLQUFDLENBQUEsSUFBRCxDQUFNLE1BQU8sQ0FBQSxDQUFBLENBQWIsRUFBaUIsUUFBUSxDQUFDLFFBQTFCLENBQUQsQ0FBcUMsQ0FBQSxDQUFBO2NBRzlDLElBQUcsTUFBQSxJQUFXLE1BQU0sQ0FBQyxVQUFyQjtBQUNJLHVCQUFPLEtBQUMsQ0FBQSxhQUFELENBQWUsTUFBZixFQUF1QixPQUF2QixFQURYOztBQUdBLHFCQUFPO2dCQUNILEtBQUEsRUFBTyxXQUFXLENBQUMsS0FEaEI7Z0JBRUgsUUFBQSxFQUFVLFdBQVcsQ0FBQyxRQUZuQjtnQkFHSCxJQUFBLEVBQU0sV0FBVyxDQUFDLElBSGY7Z0JBS0gsT0FBQSxFQUFTLE9BQU8sQ0FBQyxPQUxkOztZQXBCTDtVQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FESCxDQTRCSCxFQUFDLEtBQUQsRUE1QkcsQ0E0QkksQ0FBQSxTQUFBLEtBQUE7bUJBQUEsU0FBQyxLQUFEO3FCQUFXLE9BQU8sQ0FBQyxLQUFSLENBQWMsS0FBZDtZQUFYO1VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQTVCSixFQU5YOztRQXVDQSxRQUFBLEdBQVc7VUFBQSxLQUFBLEVBQVUsQ0FBQSxTQUFBO0FBQ2pCLGdCQUFBO0FBQUE7aUJBQUEsNENBQUE7OzJCQUFBLE1BQUEsR0FBUTtBQUFSOztVQURpQixDQUFBLENBQUgsQ0FBQSxDQUFQOztRQUVYLFFBQUEsR0FBVztBQUVYLGVBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLE9BQXBCLEVBQTZCLFFBQTdCLEVBQXVDLFNBQUMsTUFBRDtpQkFDMUMsUUFBUSxDQUFDLElBQVQsQ0FBYyxNQUFkO1FBRDBDLENBQXZDLENBRVAsQ0FBQyxJQUZNLENBRUQsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTtBQUdGLGdCQUFBO1lBQUEsV0FBQSxHQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWYsQ0FBQSxDQUFrQyxDQUFDLE9BQW5DLENBQUE7WUFDZCxnQkFBQSxHQUFtQixXQUFXLENBQUMsS0FBWixDQUFrQixJQUFJLENBQUMsR0FBdkI7WUFFbkIsVUFBQSxHQUFhO1lBQ2IsY0FBQSxHQUFpQjtBQUVqQixpQkFBQSwwQ0FBQTs7Y0FDSSxjQUFBLEdBQWlCO2NBQ2pCLGNBQUEsR0FBaUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFoQixDQUFzQixJQUFJLENBQUMsR0FBM0I7QUFDakIsbUJBQUEsMERBQUE7O29CQUE0RCxZQUFBLEtBQWdCLGdCQUFpQixDQUFBLENBQUE7a0JBQTdGLGNBQUE7O0FBQUE7Y0FFQSxJQUFHLGNBQUEsR0FBaUIsY0FBcEI7Z0JBQ0ksVUFBQSxHQUFhO2dCQUNiLGNBQUEsR0FBaUIsZUFGckI7O0FBTEo7WUFRQSxJQUFBLENBQUEsQ0FBYyxVQUFBLElBQWUsQ0FBQSxNQUFBLEdBQVMsVUFBVSxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQTVCLENBQTdCLENBQUE7QUFBQSxxQkFBQTs7WUFJQSxXQUFZLENBQUEsS0FBQSxDQUFaLEdBQXFCO2NBQ2pCLEtBQUEsRUFBTyxJQURVO2NBRWpCLFFBQUEsRUFBVSxLQUZPO2NBR2pCLElBQUEsRUFBTSxJQUhXO2NBS2pCLE9BQUEsRUFDSTtnQkFBQSxRQUFBLEVBQVUsVUFBVSxDQUFDLFFBQXJCO2dCQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FEZDtlQU5hOzs7Y0FXckIsVUFBVyxXQUFZLENBQUEsS0FBQTs7QUFDdkIsbUJBQU8sS0FBQyxDQUFBLGFBQUQsQ0FBZSxRQUFmLEVBQXlCLE9BQXpCO1VBakNMO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZDLENBb0NQLEVBQUMsS0FBRCxFQXBDTyxDQW9DQSxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFDLEtBQUQ7bUJBQVcsT0FBTyxDQUFDLEtBQVIsQ0FBYyxLQUFkO1VBQVg7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBcENBO01BbERJLENBOUNaOztFQTFDTTtBQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyAgU21hcnRWYXJpYWJsZVxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IC0+XG4gICAgICAgIHBhdGggPSByZXF1aXJlICdwYXRoJ1xuXG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgIyAgVmFyaWFibGUgVHlwZXNcbiAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgVkFSSUFCTEVfUEFUVEVSTiA9ICdcXFxce3sgVkFSSUFCTEUgfX1bXFxcXHNdKls6PV1bXFxcXHNdKihbXlxcXFw7XFxcXG5dKylbXFxcXDt8XFxcXG5dJ1xuXG4gICAgICAgIFZBUklBQkxFX1RZUEVTID0gW1xuICAgICAgICAgICAgIyBNYXRjaGVzIFNhc3MgdmFyaWFibGU6IGVnLlxuICAgICAgICAgICAgIyAkY29sb3ItdmFyXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Nhc3MnXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogWycuc2NzcycsICcuc2FzcyddXG4gICAgICAgICAgICAgICAgcmVnRXhwOiAvKFtcXCRdKShbXFx3MC05LV9dKykvaVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAjIE1hdGNoZXMgTEVTUyB2YXJpYWJsZTogZWcuXG4gICAgICAgICAgICAjIEBjb2xvci12YXJcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGVzcydcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJy5sZXNzJ11cbiAgICAgICAgICAgICAgICByZWdFeHA6IC8oW1xcQF0pKFtcXHcwLTktX10rKS9pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICMgTWF0Y2hlcyBTdHlsdXMgdmFyaWFibGU6IGVnLlxuICAgICAgICAgICAgIyAkY29sb3ItdmFyXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0eWx1cydcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJy5zdHlsdXMnLCAnLnN0eWwnXVxuICAgICAgICAgICAgICAgIHJlZ0V4cDogLyhbXFwkXSkoW1xcdzAtOS1fXSspL2lcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuXG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgIyAgRGVmaW5pdGlvbiBzdG9yYWdlXG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIERFRklOSVRJT05TID0ge31cblxuICAgICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICMgIFB1YmxpYyBmdW5jdGlvbmFsaXR5XG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAjICBGaW5kIHZhcmlhYmxlcyBpbiBzdHJpbmdcbiAgICAgICAgIyAgLSBzdHJpbmcge1N0cmluZ31cbiAgICAgICAgI1xuICAgICAgICAjICBAcmV0dXJuIFN0cmluZ1xuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGZpbmQ6IChzdHJpbmcsIHBhdGhOYW1lKSAtPlxuICAgICAgICAgICAgICAgIFNtYXJ0VmFyaWFibGUgPSB0aGlzXG4gICAgICAgICAgICAgICAgX3ZhcmlhYmxlcyA9IFtdXG5cbiAgICAgICAgICAgICAgICBmb3Ige3R5cGUsIGV4dGVuc2lvbnMsIHJlZ0V4cH0gaW4gVkFSSUFCTEVfVFlQRVNcbiAgICAgICAgICAgICAgICAgICAgX21hdGNoZXMgPSBzdHJpbmcubWF0Y2ggKG5ldyBSZWdFeHAgcmVnRXhwLnNvdXJjZSwgJ2lnJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWUgdW5sZXNzIF9tYXRjaGVzXG5cbiAgICAgICAgICAgICAgICAgICAgIyBNYWtlIHN1cmUgdGhlIGZpbGUgdHlwZSBtYXRjaGVzIHBvc3NpYmxlIGV4dGVuc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgaWYgcGF0aE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIHVubGVzcyAocGF0aC5leHRuYW1lIHBhdGhOYW1lKSBpbiBleHRlbnNpb25zXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIF9tYXRjaCBpbiBfbWF0Y2hlcyB0aGVuIGRvICh0eXBlLCBleHRlbnNpb25zLCBfbWF0Y2gpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWYgKF9pbmRleCA9IHN0cmluZy5pbmRleE9mIF9tYXRjaCkgaXMgLTFcblxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZhcmlhYmxlcy5wdXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IF9tYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBleHRlbnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IF9pbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogX2luZGV4ICsgX21hdGNoLmxlbmd0aFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGVmaW5pdGlvbjogLT4gU21hcnRWYXJpYWJsZS5nZXREZWZpbml0aW9uIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZhcmlhYmxlOiB0cnVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgUmVtb3ZlIHRoZSBtYXRjaCBmcm9tIHRoZSBsaW5lIGNvbnRlbnQgc3RyaW5nIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAjIOKAnG1hcmsgaXTigJ0gYXMgaGF2aW5nIGJlZW4g4oCcc3BlbnTigJ0uIEJlIGNhcmVmdWwgdG8ga2VlcCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICMgY29ycmVjdCBhbW91bnQgb2YgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGFzIHRoaXMgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICMgbGF0ZXIgdXNlZCB0byBzZWUgd2hpY2ggbWF0Y2ggZml0cyBiZXN0LCBpZiBhbnlcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlIF9tYXRjaCwgKG5ldyBBcnJheSBfbWF0Y2gubGVuZ3RoICsgMSkuam9pbiAnICdcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZhcmlhYmxlc1xuXG4gICAgICAgICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAjICBGaW5kIGEgdmFyaWFibGUgZGVmaW5pdGlvbiBpbiB0aGUgcHJvamVjdFxuICAgICAgICAjICAtIG5hbWUge1N0cmluZ31cbiAgICAgICAgIyAgLSB0eXBlIHtTdHJpbmd9XG4gICAgICAgICNcbiAgICAgICAgIyAgQHJldHVybiBQcm9taXNlXG4gICAgICAgICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgZ2V0RGVmaW5pdGlvbjogKHZhcmlhYmxlLCBpbml0aWFsKSAtPlxuICAgICAgICAgICAgICAgIHttYXRjaCwgdHlwZSwgZXh0ZW5zaW9uc30gPSB2YXJpYWJsZVxuXG4gICAgICAgICAgICAgICAgIyBGaWd1cmUgb3V0IHdoYXQgdG8gbG9vayBmb3JcbiAgICAgICAgICAgICAgICBfcmVnRXhwID0gbmV3IFJlZ0V4cCAoVkFSSUFCTEVfUEFUVEVSTi5yZXBsYWNlICd7eyBWQVJJQUJMRSB9fScsIG1hdGNoKVxuXG4gICAgICAgICAgICAgICAgIyBXZSBhbHJlYWR5IGtub3cgd2hlcmUgdGhlIGRlZmluaXRpb24gaXNcbiAgICAgICAgICAgICAgICBpZiBfZGVmaW5pdGlvbiA9IERFRklOSVRJT05TW21hdGNoXVxuICAgICAgICAgICAgICAgICAgICAjIFNhdmUgaW5pdGlhbCBwb2ludGVyIHZhbHVlLCBpZiBpdCBpc24ndCBzZXQgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsID89IF9kZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgICAgIF9wb2ludGVyID0gX2RlZmluaXRpb24ucG9pbnRlclxuXG4gICAgICAgICAgICAgICAgICAgICMgLi4uIGJ1dCBjaGVjayBpZiBpdCdzIHN0aWxsIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhdG9tLnByb2plY3QuYnVmZmVyRm9yUGF0aCBfcG9pbnRlci5maWxlUGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4gKGJ1ZmZlcikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IGJ1ZmZlci5nZXRUZXh0SW5SYW5nZSBfcG9pbnRlci5yYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYXRjaCA9IF90ZXh0Lm1hdGNoIF9yZWdFeHBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgRGVmaW5pdGlvbiBub3QgZm91bmQsIHJlc2V0IGFuZCB0cnkgYWdhaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgX21hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERFRklOSVRJT05TW21hdGNoXSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEBnZXREZWZpbml0aW9uIHZhcmlhYmxlLCBpbml0aWFsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIERlZmluaXRpb24gZm91bmQsIHNhdmUgaXQgb24gdGhlIERFRklOSVRJT04gb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2RlZmluaXRpb24udmFsdWUgPSBfbWF0Y2hbMV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgLi4uIGJ1dCBpdCBtaWdodCBiZSBhbm90aGVyIHZhcmlhYmxlLCBpbiB3aGljaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgY2FzZSB3ZSBtdXN0IGtlZXAgZGlnZ2luZyB0byBmaW5kIHdoYXQgd2UncmUgYWZ0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZm91bmQgPSAoQGZpbmQgX21hdGNoWzFdLCBfcG9pbnRlci5maWxlUGF0aClbMF1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgUnVuIHRoZSBzZWFyY2ggYWdhaW4sIGJ1dCBrZWVwIHRoZSBpbml0aWFsIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBfZm91bmQgYW5kIF9mb3VuZC5pc1ZhcmlhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBAZ2V0RGVmaW5pdGlvbiBfZm91bmQsIGluaXRpYWxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfZGVmaW5pdGlvbi52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZTogX2RlZmluaXRpb24udmFyaWFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogX2RlZmluaXRpb24udHlwZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IGluaXRpYWwucG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCAoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IgZXJyb3JcblxuICAgICAgICAgICAgICAgICMgLi4uIHdlIGRvbid0IGtub3cgd2hlcmUgdGhlIGRlZmluaXRpb24gaXNcblxuICAgICAgICAgICAgICAgICMgRmlndXJlIG91dCB3aGVyZSB0byBsb29rXG4gICAgICAgICAgICAgICAgX29wdGlvbnMgPSBwYXRoczogZG8gLT5cbiAgICAgICAgICAgICAgICAgICAgXCIqKi8qI3sgX2V4dGVuc2lvbiB9XCIgZm9yIF9leHRlbnNpb24gaW4gZXh0ZW5zaW9uc1xuICAgICAgICAgICAgICAgIF9yZXN1bHRzID0gW11cblxuICAgICAgICAgICAgICAgIHJldHVybiBhdG9tLndvcmtzcGFjZS5zY2FuIF9yZWdFeHAsIF9vcHRpb25zLCAocmVzdWx0KSAtPlxuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoIHJlc3VsdFxuICAgICAgICAgICAgICAgIC50aGVuID0+XG4gICAgICAgICAgICAgICAgICAgICMgRmlndXJlIG91dCB3aGF0IGZpbGUgaXMgaG9sZGluZyB0aGUgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgICAgICAjIEFzc3VtZSBpdCdzIHRoZSBvbmUgY2xvc2VzdCB0byB0aGUgY3VycmVudCBwYXRoXG4gICAgICAgICAgICAgICAgICAgIF90YXJnZXRQYXRoID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKS5nZXRQYXRoKClcbiAgICAgICAgICAgICAgICAgICAgX3RhcmdldEZyYWdtZW50cyA9IF90YXJnZXRQYXRoLnNwbGl0IHBhdGguc2VwXG5cbiAgICAgICAgICAgICAgICAgICAgX2Jlc3RNYXRjaCA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgX2Jlc3RNYXRjaEhpdHMgPSAwXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIHJlc3VsdCBpbiBfcmVzdWx0c1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXNNYXRjaEhpdHMgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICBfcGF0aEZyYWdtZW50cyA9IHJlc3VsdC5maWxlUGF0aC5zcGxpdCBwYXRoLnNlcFxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXNNYXRjaEhpdHMrKyBmb3IgcGF0aEZyYWdtZW50LCBpIGluIF9wYXRoRnJhZ21lbnRzIHdoZW4gcGF0aEZyYWdtZW50IGlzIF90YXJnZXRGcmFnbWVudHNbaV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgX3RoaXNNYXRjaEhpdHMgPiBfYmVzdE1hdGNoSGl0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iZXN0TWF0Y2ggPSByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYmVzdE1hdGNoSGl0cyA9IF90aGlzTWF0Y2hIaXRzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmxlc3MgX2Jlc3RNYXRjaCBhbmQgX21hdGNoID0gX2Jlc3RNYXRjaC5tYXRjaGVzWzBdXG5cbiAgICAgICAgICAgICAgICAgICAgIyBTYXZlIHRoZSBkZWZpbml0aW9uIG9uIHRoZSBERUZJTklUSU9OIG9iamVjdCBzbyB0aGF0IGl0XG4gICAgICAgICAgICAgICAgICAgICMgY2FuIGJlIGFjY2Vzc2VkIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIERFRklOSVRJT05TW21hdGNoXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZTogbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogX2Jlc3RNYXRjaC5maWxlUGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlOiBfbWF0Y2gucmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICMgU2F2ZSBpbml0aWFsIHBvaW50ZXIgdmFsdWUsIGlmIGl0IGlzbid0IHNldCBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWwgPz0gREVGSU5JVElPTlNbbWF0Y2hdXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBAZ2V0RGVmaW5pdGlvbiB2YXJpYWJsZSwgaW5pdGlhbFxuICAgICAgICAgICAgICAgIC5jYXRjaCAoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IgZXJyb3JcbiAgICAgICAgfVxuIl19
