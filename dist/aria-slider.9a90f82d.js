// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"aria-slider.js":[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);
(function () {

  var RAIL_WIDTH = 300;

  var THUMB_WIDTH = 8;

  var KEYCODES = {
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'pageUp': 33,
    'pageDown': 34,
    'end': 35,
    'home': 36
  };

  var template = document.createElement('template');
  template.innerHTML = '\n  <style>\n:host {\n    --slider-bg: #eee;\n    --slider-border: #888;\n    --slider-thumb-border: var(--slider-border);\n    --slider-thumb-top-border: #666;\n    --slider-thumb-left-border: var(--slider-thumb-top-border);\n    --slider-thumb-bg: #ddd;\n    --slider-thumb-active-bg: #def;\n    --slider-thumb-active-outline: #888;\n    --slider-active-bg: #aaa;\n}\n\n.aria-widget-slider {\n    margin-top: 0.5em;\n    margin-bottom: 0.5em;\n    height: 4em;\n}\n\n.rail {\n    margin: 2px;\n    padding: 1px;\n    background-color: var(--slider-bg);\n    border: 1px solid var(--slider-border);\n    position: relative;\n    top: 2em;\n    height: 4px;\n    width: 300px;\n}\n\n\n\n.rail.focus {\n    background-color: var(--slider-active-bg);\n}\n\n.value  {\n    width:      2em;\n    text-align: right;\n    position: relative;\n    left: 310px;\n    top: 16px;\n}\n\n.thumb  {\n    border: 1px solid var(--slider-thumb-border);\n    border-top-color:  var(--slider-thumb-top-border);\n    border-left-color: var(--slider-thumb-left-border);\n    background-color: var(--slider-thumb-bg);\n    position: relative;\n    width:8px;\n    height:28px;\n    top:-14px;\n}\n\n.thumb.focus,\n.thumb:hover {\n    outline: 2px solid var(--slider-thumb-active-outline);\n    background-color: var(--slider-thumb-active-bg);\n}\n</style>\n<div class="aria-widget-slider">\n   <div class="rail" >\n    <div id="idRedValue"\n           role="slider"\n           tabindex="0"\n           class="thumb"\n           aria-valuemin="0"\n           aria-valuenow="0"\n           aria-valuemax="255"\n           aria-labelledby="idRed">\n      </div>\n  </div>\n  <div class="value">0</div>\n</div>\n';

  var ARIASlider = function (_CustomElement2) {
    _inherits(ARIASlider, _CustomElement2);

    function ARIASlider() {
      _classCallCheck(this, ARIASlider);

      var _this = _possibleConstructorReturn(this, (ARIASlider.__proto__ || Object.getPrototypeOf(ARIASlider)).call(this));

      _this.attachShadow({ mode: 'open' });
      _this.shadowRoot.appendChild(template.content.cloneNode(true));

      _this.addEventListener('focus', _this._onFocus);
      _this.addEventListener('blur', _this._onBlur);
      var $thumb = _this.shadowRoot.querySelector('.thumb');
      $thumb.addEventListener('keydown', _this._onKeyDown.bind(_this));
      $thumb.addEventListener('mousedown', _this._onMouseDown.bind(_this));
      return _this;
    }

    _createClass(ARIASlider, [{
      key: '_onFocus',
      value: function _onFocus(event) {
        var $rail = this.shadowRoot.querySelector('.rail');
        var $thumb = this.shadowRoot.querySelector('.thumb');
        $rail.classList.add('focus');
        $thumb.classList.add('focus');
      }
    }, {
      key: '_onBlur',
      value: function _onBlur(event) {
        var $rail = this.shadowRoot.querySelector('.rail');
        var $thumb = this.shadowRoot.querySelector('.thumb');
        $rail.classList.remove('focus');
        $thumb.classList.remove('focus');
      }
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        this._moveSliderTo(this.getAttribute('value'));
      }
    }, {
      key: '_onKeyDown',
      value: function _onKeyDown(event) {
        var flag = false;

        var currentVal = this.currentValue;
        switch (event.keyCode) {
          case KEYCODES.left:
          case KEYCODES.down:
            this._moveSliderTo(currentVal - 1);
            flag = true;
            break;

          case KEYCODES.right:
          case KEYCODES.up:
            this._moveSliderTo(currentVal + 1);
            flag = true;
            break;

          case KEYCODES.pageDown:
            this._moveSliderTo(currentVal - 10);
            flag = true;
            break;

          case KEYCODES.pageUp:
            this._moveSliderTo(currentVal + 10);
            flag = true;
            break;

          case KEYCODES.home:
            this._moveSliderTo(this.get('minValue'));
            flag = true;
            break;

          case KEYCODES.end:
            this._moveSliderTo(this.get('maxValue'));
            flag = true;
            break;

          default:
            break;
        }

        if (flag) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }, {
      key: '_onMouseDown',
      value: function _onMouseDown(e) {
        var _this2 = this;

        var parentNode = e.target.parentNode;
        var minValue = this.getAttribute('min');
        var maxValue = this.getAttribute('max');

        var handleMouseMove = function handleMouseMove(event) {

          var diffX = event.pageX - parentNode.offsetLeft;
          var valueNow = minValue + parseInt((maxValue - minValue) * diffX / RAIL_WIDTH);
          _this2._moveSliderTo(valueNow);

          event.preventDefault();
          event.stopPropagation();
        };

        var handleMouseUp = function handleMouseUp() {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        // bind a mousemove event handler to move pointer
        document.addEventListener('mousemove', handleMouseMove);

        // bind a mouseup event handler to stop tracking mouse movements
        document.addEventListener('mouseup', handleMouseUp);

        e.preventDefault();
        e.stopPropagation();

        // Set focus to the clicked handle
        e.target.focus();
      }
    }, {
      key: '_moveSliderTo',
      value: function _moveSliderTo(value) {
        var minValue = Number(this.getAttribute('min'));
        var maxValue = Number(this.getAttribute('max'));

        var _value = Number(value);

        if (_value < minValue) {
          _value = minValue;
        }

        if (_value > maxValue) {
          _value = maxValue;
        }

        this.currentValue = _value;
        this.setAttribute('value', _value);
        var $value = this.shadowRoot.querySelector('.value');
        $value.textContent = _value;

        // Emit custom event;
        var _onUpdate = this.getAttribute('on-update');
        var eventDetails = JSON.stringify({ value: _value });
        this.dispatchEvent(new CustomEvent(_onUpdate, {
          bubbles: true,
          composed: true,
          detail: eventDetails
        }));

        var pos = Math.round(_value * RAIL_WIDTH / (maxValue - minValue)) - THUMB_WIDTH / 2;

        var $thumb = this.shadowRoot.querySelector('.thumb');

        $thumb.style.left = pos + 'px';
      }
    }, {
      key: 'updateARIAValues',
      value: function updateARIAValues() {}
    }]);

    return ARIASlider;
  }(_CustomElement);

  window.customElements.define('aria-slider', ARIASlider);
})();
},{}],"../../../../.nvm/versions/node/v8.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59821' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../.nvm/versions/node/v8.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","aria-slider.js"], null)
//# sourceMappingURL=/aria-slider.9a90f82d.map