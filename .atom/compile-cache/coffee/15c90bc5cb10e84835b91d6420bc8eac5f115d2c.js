(function() {
  module.exports = function(colorPicker) {
    return {
      Emitter: (require('../modules/Emitter'))(),
      element: null,
      color: null,
      emitVisibility: function(visible) {
        if (visible == null) {
          visible = true;
        }
        return this.Emitter.emit('visible', visible);
      },
      onVisibility: function(callback) {
        return this.Emitter.on('visible', callback);
      },
      activate: function() {
        var View, _isClicking, hasChild;
        View = this;
        this.element = {
          el: (function() {
            var _classPrefix, _el;
            _classPrefix = colorPicker.element.el.className;
            _el = document.createElement('div');
            _el.classList.add(_classPrefix + "-return");
            return _el;
          })(),
          addClass: function(className) {
            this.el.classList.add(className);
            return this;
          },
          removeClass: function(className) {
            this.el.classList.remove(className);
            return this;
          },
          hasClass: function(className) {
            return this.el.classList.contains(className);
          },
          hide: function() {
            this.removeClass('is--visible');
            return View.emitVisibility(false);
          },
          show: function() {
            this.addClass('is--visible');
            return View.emitVisibility(true);
          },
          add: function(element) {
            this.el.appendChild(element);
            return this;
          },
          setColor: function(smartColor) {
            return this.el.style.backgroundColor = smartColor.toRGBA();
          }
        };
        colorPicker.element.add(this.element.el);
        hasChild = function(element, child) {
          var _parent;
          if (child && (_parent = child.parentNode)) {
            if (child === element) {
              return true;
            } else {
              return hasChild(element, _parent);
            }
          }
          return false;
        };
        _isClicking = false;
        colorPicker.onMouseDown((function(_this) {
          return function(e, isOnPicker) {
            if (!(isOnPicker && hasChild(_this.element.el, e.target))) {
              return;
            }
            e.preventDefault();
            return _isClicking = true;
          };
        })(this));
        colorPicker.onMouseMove(function(e) {
          return _isClicking = false;
        });
        colorPicker.onMouseUp((function(_this) {
          return function(e) {
            if (!(_isClicking && _this.color)) {
              return;
            }
            return colorPicker.emitInputColor(_this.color);
          };
        })(this));
        setTimeout((function(_this) {
          return function() {
            var Alpha;
            Alpha = colorPicker.getExtension('Alpha');
            colorPicker.onBeforeOpen(function() {
              return _this.color = null;
            });
            colorPicker.onInputColor(function(smartColor, wasFound) {
              if (wasFound) {
                return _this.color = smartColor;
              }
            });
            Alpha.onColorChanged(function(smartColor) {
              if (!_this.color) {
                return _this.element.hide();
              }
              if (smartColor.equals(_this.color)) {
                return _this.element.hide();
              } else {
                return _this.element.show();
              }
            });
          };
        })(this));
        setTimeout((function(_this) {
          return function() {
            colorPicker.onInputColor(function(smartColor, wasFound) {
              if (wasFound) {
                return _this.element.setColor(smartColor);
              }
            });
          };
        })(this));
        setTimeout((function(_this) {
          return function() {
            var _text, setColor;
            _text = document.createElement('p');
            _text.classList.add(_this.element.el.className + "-text");
            setColor = function(smartColor) {
              return _text.innerText = smartColor.value;
            };
            colorPicker.onInputColor(function(smartColor, wasFound) {
              if (wasFound) {
                return setColor(smartColor);
              }
            });
            return _this.element.add(_text);
          };
        })(this));
        return this;
      }
    };
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL0NyaXNGb3Juby9kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9jb2xvci1waWNrZXIvbGliL2V4dGVuc2lvbnMvUmV0dXJuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNSTtFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsV0FBRDtXQUNiO01BQUEsT0FBQSxFQUFTLENBQUMsT0FBQSxDQUFRLG9CQUFSLENBQUQsQ0FBQSxDQUFBLENBQVQ7TUFFQSxPQUFBLEVBQVMsSUFGVDtNQUdBLEtBQUEsRUFBTyxJQUhQO01BU0EsY0FBQSxFQUFnQixTQUFDLE9BQUQ7O1VBQUMsVUFBUTs7ZUFDckIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsU0FBZCxFQUF5QixPQUF6QjtNQURZLENBVGhCO01BV0EsWUFBQSxFQUFjLFNBQUMsUUFBRDtlQUNWLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLFNBQVosRUFBdUIsUUFBdkI7TUFEVSxDQVhkO01BaUJBLFFBQUEsRUFBVSxTQUFBO0FBQ04sWUFBQTtRQUFBLElBQUEsR0FBTztRQUlQLElBQUMsQ0FBQSxPQUFELEdBQ0k7VUFBQSxFQUFBLEVBQU8sQ0FBQSxTQUFBO0FBQ0gsZ0JBQUE7WUFBQSxZQUFBLEdBQWUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDdEMsR0FBQSxHQUFNLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCO1lBQ04sR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFkLENBQXNCLFlBQUYsR0FBZ0IsU0FBcEM7QUFFQSxtQkFBTztVQUxKLENBQUEsQ0FBSCxDQUFBLENBQUo7VUFPQSxRQUFBLEVBQVUsU0FBQyxTQUFEO1lBQWUsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBZCxDQUFrQixTQUFsQjtBQUE2QixtQkFBTztVQUFuRCxDQVBWO1VBUUEsV0FBQSxFQUFhLFNBQUMsU0FBRDtZ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QUg7dUJBQ0ksS0FBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQUEsRUFESjtlQUFBLE1BQUE7dUJBRUssS0FBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQUEsRUFGTDs7WUFIaUIsQ0FBckI7VUFaTztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBWDtRQXNCQSxVQUFBLENBQVcsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTtZQUNQLFdBQVcsQ0FBQyxZQUFaLENBQXlCLFNBQUMsVUFBRCxFQUFhLFFBQWI7Y0FDckIsSUFBZ0MsUUFBaEM7dUJBQUEsS0FBQyxDQUFBLE9BQU8sQ0FBQyxRQUFULENBQWtCLFVBQWxCLEVBQUE7O1lBRHFCLENBQXpCO1VBRE87UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVg7UUFPQSxVQUFBLENBQVcsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTtBQUVQLGdCQUFBO1lBQUEsS0FBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCO1lBQ1IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFoQixDQUF3QixLQUFDLENBQUEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFkLEdBQXlCLE9BQS9DO1lBR0EsUUFBQSxHQUFXLFNBQUMsVUFBRDtxQkFDUCxLQUFLLENBQUMsU0FBTixHQUFrQixVQUFVLENBQUM7WUFEdEI7WUFHWCxXQUFXLENBQUMsWUFBWixDQUF5QixTQUFDLFVBQUQsRUFBYSxRQUFiO2NBQ3JCLElBQXVCLFFBQXZCO3VCQUFBLFFBQUEsQ0FBUyxVQUFULEVBQUE7O1lBRHFCLENBQXpCO21CQUVBLEtBQUMsQ0FBQSxPQUFPLENBQUMsR0FBVCxDQUFhLEtBQWI7VUFYTztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBWDtBQVlBLGVBQU87TUFoR0QsQ0FqQlY7O0VBRGE7QUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgIENvbG9yIFBpY2tlci9leHRlbnNpb25zOiBSZXR1cm5cbiMgIFRoZSBlbGVtZW50IHNob3dpbmcgdGhlIGluaXRpYWwgY29sb3IgdmFsdWUsIGVuYWJsaW5nIHRoZSB1c2VyIHRvIHJldHVyblxuIyAgdG8gaXQgYXQgYW55IHRpbWVcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSAoY29sb3JQaWNrZXIpIC0+XG4gICAgICAgIEVtaXR0ZXI6IChyZXF1aXJlICcuLi9tb2R1bGVzL0VtaXR0ZXInKSgpXG5cbiAgICAgICAgZWxlbWVudDogbnVsbFxuICAgICAgICBjb2xvcjogbnVsbFxuXG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgIyAgU2V0IHVwIGV2ZW50cyBhbmQgaGFuZGxpbmdcbiAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgIyBWaXNpYmlsaXR5IGV2ZW50XG4gICAgICAgIGVtaXRWaXNpYmlsaXR5OiAodmlzaWJsZT10cnVlKSAtPlxuICAgICAgICAgICAgQEVtaXR0ZXIuZW1pdCAndmlzaWJsZScsIHZpc2libGVcbiAgICAgICAgb25WaXNpYmlsaXR5OiAoY2FsbGJhY2spIC0+XG4gICAgICAgICAgICBARW1pdHRlci5vbiAndmlzaWJsZScsIGNhbGxiYWNrXG5cbiAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAjICBDcmVhdGUgYW5kIGFjdGl2YXRlIFJldHVybiBlbGVtZW50XG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICAgICAgVmlldyA9IHRoaXNcblxuICAgICAgICAjICBCdWlsZCB0aGUgZWxlbWVudFxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgQGVsZW1lbnQgPVxuICAgICAgICAgICAgICAgIGVsOiBkbyAtPlxuICAgICAgICAgICAgICAgICAgICBfY2xhc3NQcmVmaXggPSBjb2xvclBpY2tlci5lbGVtZW50LmVsLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICBfZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gICAgICAgICAgICAgICAgICAgIF9lbC5jbGFzc0xpc3QuYWRkIFwiI3sgX2NsYXNzUHJlZml4IH0tcmV0dXJuXCJcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2VsXG4gICAgICAgICAgICAgICAgIyBVdGlsaXR5IGZ1bmN0aW9uc1xuICAgICAgICAgICAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSAtPiBAZWwuY2xhc3NMaXN0LmFkZCBjbGFzc05hbWU7IHJldHVybiB0aGlzXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpIC0+IEBlbC5jbGFzc0xpc3QucmVtb3ZlIGNsYXNzTmFtZTsgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgICAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgLT4gQGVsLmNsYXNzTGlzdC5jb250YWlucyBjbGFzc05hbWVcblxuICAgICAgICAgICAgICAgIGhpZGU6IC0+IEByZW1vdmVDbGFzcyAnaXMtLXZpc2libGUnOyBWaWV3LmVtaXRWaXNpYmlsaXR5IGZhbHNlXG4gICAgICAgICAgICAgICAgc2hvdzogLT4gQGFkZENsYXNzICdpcy0tdmlzaWJsZSc7IFZpZXcuZW1pdFZpc2liaWxpdHkgdHJ1ZVxuXG4gICAgICAgICAgICAgICAgIyBBZGQgYSBjaGlsZCBvbiB0aGUgUmV0dXJuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBhZGQ6IChlbGVtZW50KSAtPlxuICAgICAgICAgICAgICAgICAgICBAZWwuYXBwZW5kQ2hpbGQgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xuXG4gICAgICAgICAgICAgICAgIyBTZXQgdGhlIFJldHVybiBlbGVtZW50IGJhY2tncm91bmQgY29sb3JcbiAgICAgICAgICAgICAgICBzZXRDb2xvcjogKHNtYXJ0Q29sb3IpIC0+XG4gICAgICAgICAgICAgICAgICAgIEBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzbWFydENvbG9yLnRvUkdCQSgpXG4gICAgICAgICAgICBjb2xvclBpY2tlci5lbGVtZW50LmFkZCBAZWxlbWVudC5lbFxuXG4gICAgICAgICMgIFJldHVybiBjb2xvciBvbiBjbGlja1xuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaGFzQ2hpbGQgPSAoZWxlbWVudCwgY2hpbGQpIC0+XG4gICAgICAgICAgICAgICAgaWYgY2hpbGQgYW5kIF9wYXJlbnQgPSBjaGlsZC5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgICAgIGlmIGNoaWxkIGlzIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIGhhc0NoaWxkIGVsZW1lbnQsIF9wYXJlbnRcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgX2lzQ2xpY2tpbmcgPSBub1xuXG4gICAgICAgICAgICBjb2xvclBpY2tlci5vbk1vdXNlRG93biAoZSwgaXNPblBpY2tlcikgPT5cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5sZXNzIGlzT25QaWNrZXIgYW5kIGhhc0NoaWxkIEBlbGVtZW50LmVsLCBlLnRhcmdldFxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIF9pc0NsaWNraW5nID0geWVzXG5cbiAgICAgICAgICAgIGNvbG9yUGlja2VyLm9uTW91c2VNb3ZlIChlKSAtPlxuICAgICAgICAgICAgICAgIF9pc0NsaWNraW5nID0gbm9cblxuICAgICAgICAgICAgY29sb3JQaWNrZXIub25Nb3VzZVVwIChlKSA9PlxuICAgICAgICAgICAgICAgIHJldHVybiB1bmxlc3MgX2lzQ2xpY2tpbmcgYW5kIEBjb2xvclxuICAgICAgICAgICAgICAgIGNvbG9yUGlja2VyLmVtaXRJbnB1dENvbG9yIEBjb2xvclxuXG4gICAgICAgICMgIFNob3cgdGhlIGVsZW1lbnQgd2hlbiB0aGUgaW5wdXQgY29sb3IgaXNuJ3QgdGhlIGN1cnJlbnQgY29sb3JcbiAgICAgICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgICAgICAgICBBbHBoYSA9IGNvbG9yUGlja2VyLmdldEV4dGVuc2lvbiAnQWxwaGEnXG5cbiAgICAgICAgICAgICAgICAjIFJlc2V0IG9uIGNvbG9yUGlja2VyIG9wZW5cbiAgICAgICAgICAgICAgICBjb2xvclBpY2tlci5vbkJlZm9yZU9wZW4gPT5cbiAgICAgICAgICAgICAgICAgICAgQGNvbG9yID0gbnVsbFxuXG4gICAgICAgICAgICAgICAgIyBTYXZlIHRoZSBjdXJyZW50IGNvbG9yXG4gICAgICAgICAgICAgICAgY29sb3JQaWNrZXIub25JbnB1dENvbG9yIChzbWFydENvbG9yLCB3YXNGb3VuZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgQGNvbG9yID0gc21hcnRDb2xvciBpZiB3YXNGb3VuZFxuXG4gICAgICAgICAgICAgICAgIyBEbyB0aGUgY2hlY2sgb24gQWxwaGEgY2hhbmdlXG4gICAgICAgICAgICAgICAgQWxwaGEub25Db2xvckNoYW5nZWQgKHNtYXJ0Q29sb3IpID0+XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBAZWxlbWVudC5oaWRlKCkgdW5sZXNzIEBjb2xvclxuXG4gICAgICAgICAgICAgICAgICAgIGlmIHNtYXJ0Q29sb3IuZXF1YWxzIEBjb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgQGVsZW1lbnQuaGlkZSgpXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgQGVsZW1lbnQuc2hvdygpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgIyAgU2V0IGJhY2tncm91bmQgZWxlbWVudCBjb2xvciBvbiBpbnB1dCBjb2xvclxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgICAgIGNvbG9yUGlja2VyLm9uSW5wdXRDb2xvciAoc21hcnRDb2xvciwgd2FzRm91bmQpID0+XG4gICAgICAgICAgICAgICAgICAgIEBlbGVtZW50LnNldENvbG9yIHNtYXJ0Q29sb3IgaWYgd2FzRm91bmRcbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAjICBDcmVhdGUgUmV0dXJuIHRleHQgZWxlbWVudFxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgICAgICMgQ3JlYXRlIHRleHQgZWxlbWVudFxuICAgICAgICAgICAgICAgIF90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAncCdcbiAgICAgICAgICAgICAgICBfdGV4dC5jbGFzc0xpc3QuYWRkIFwiI3sgQGVsZW1lbnQuZWwuY2xhc3NOYW1lIH0tdGV4dFwiXG5cbiAgICAgICAgICAgICAgICAjIFNldCB0aGUgdGV4dCBlbGVtZW50IHRvIGNvbnRhaW4gdGhlIFJldHVybiBkYXRhXG4gICAgICAgICAgICAgICAgc2V0Q29sb3IgPSAoc21hcnRDb2xvcikgPT5cbiAgICAgICAgICAgICAgICAgICAgX3RleHQuaW5uZXJUZXh0ID0gc21hcnRDb2xvci52YWx1ZVxuXG4gICAgICAgICAgICAgICAgY29sb3JQaWNrZXIub25JbnB1dENvbG9yIChzbWFydENvbG9yLCB3YXNGb3VuZCkgLT5cbiAgICAgICAgICAgICAgICAgICAgc2V0Q29sb3Igc21hcnRDb2xvciBpZiB3YXNGb3VuZFxuICAgICAgICAgICAgICAgIEBlbGVtZW50LmFkZCBfdGV4dFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiJdfQ==
