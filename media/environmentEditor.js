"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l3 = Symbol.for("react.element");
      var n9 = Symbol.for("react.portal");
      var p4 = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r8 = Symbol.for("react.profiler");
      var t7 = Symbol.for("react.provider");
      var u5 = Symbol.for("react.context");
      var v3 = Symbol.for("react.forward_ref");
      var w2 = Symbol.for("react.suspense");
      var x2 = Symbol.for("react.memo");
      var y3 = Symbol.for("react.lazy");
      var z2 = Symbol.iterator;
      function A2(a3) {
        if (null === a3 || "object" !== typeof a3) return null;
        a3 = z2 && a3[z2] || a3["@@iterator"];
        return "function" === typeof a3 ? a3 : null;
      }
      var B2 = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C2 = Object.assign;
      var D = {};
      function E2(a3, b3, e12) {
        this.props = a3;
        this.context = b3;
        this.refs = D;
        this.updater = e12 || B2;
      }
      E2.prototype.isReactComponent = {};
      E2.prototype.setState = function(a3, b3) {
        if ("object" !== typeof a3 && "function" !== typeof a3 && null != a3) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a3, b3, "setState");
      };
      E2.prototype.forceUpdate = function(a3) {
        this.updater.enqueueForceUpdate(this, a3, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E2.prototype;
      function G(a3, b3, e12) {
        this.props = a3;
        this.context = b3;
        this.refs = D;
        this.updater = e12 || B2;
      }
      var H2 = G.prototype = new F();
      H2.constructor = G;
      C2(H2, E2.prototype);
      H2.isPureReactComponent = true;
      var I2 = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L2 = { key: true, ref: true, __self: true, __source: true };
      function M3(a3, b3, e12) {
        var d3, c6 = {}, k2 = null, h3 = null;
        if (null != b3) for (d3 in void 0 !== b3.ref && (h3 = b3.ref), void 0 !== b3.key && (k2 = "" + b3.key), b3) J.call(b3, d3) && !L2.hasOwnProperty(d3) && (c6[d3] = b3[d3]);
        var g2 = arguments.length - 2;
        if (1 === g2) c6.children = e12;
        else if (1 < g2) {
          for (var f3 = Array(g2), m3 = 0; m3 < g2; m3++) f3[m3] = arguments[m3 + 2];
          c6.children = f3;
        }
        if (a3 && a3.defaultProps) for (d3 in g2 = a3.defaultProps, g2) void 0 === c6[d3] && (c6[d3] = g2[d3]);
        return { $$typeof: l3, type: a3, key: k2, ref: h3, props: c6, _owner: K.current };
      }
      function N2(a3, b3) {
        return { $$typeof: l3, type: a3.type, key: b3, ref: a3.ref, props: a3.props, _owner: a3._owner };
      }
      function O(a3) {
        return "object" === typeof a3 && null !== a3 && a3.$$typeof === l3;
      }
      function escape(a3) {
        var b3 = { "=": "=0", ":": "=2" };
        return "$" + a3.replace(/[=:]/g, function(a4) {
          return b3[a4];
        });
      }
      var P2 = /\/+/g;
      function Q(a3, b3) {
        return "object" === typeof a3 && null !== a3 && null != a3.key ? escape("" + a3.key) : b3.toString(36);
      }
      function R2(a3, b3, e12, d3, c6) {
        var k2 = typeof a3;
        if ("undefined" === k2 || "boolean" === k2) a3 = null;
        var h3 = false;
        if (null === a3) h3 = true;
        else switch (k2) {
          case "string":
          case "number":
            h3 = true;
            break;
          case "object":
            switch (a3.$$typeof) {
              case l3:
              case n9:
                h3 = true;
            }
        }
        if (h3) return h3 = a3, c6 = c6(h3), a3 = "" === d3 ? "." + Q(h3, 0) : d3, I2(c6) ? (e12 = "", null != a3 && (e12 = a3.replace(P2, "$&/") + "/"), R2(c6, b3, e12, "", function(a4) {
          return a4;
        })) : null != c6 && (O(c6) && (c6 = N2(c6, e12 + (!c6.key || h3 && h3.key === c6.key ? "" : ("" + c6.key).replace(P2, "$&/") + "/") + a3)), b3.push(c6)), 1;
        h3 = 0;
        d3 = "" === d3 ? "." : d3 + ":";
        if (I2(a3)) for (var g2 = 0; g2 < a3.length; g2++) {
          k2 = a3[g2];
          var f3 = d3 + Q(k2, g2);
          h3 += R2(k2, b3, e12, f3, c6);
        }
        else if (f3 = A2(a3), "function" === typeof f3) for (a3 = f3.call(a3), g2 = 0; !(k2 = a3.next()).done; ) k2 = k2.value, f3 = d3 + Q(k2, g2++), h3 += R2(k2, b3, e12, f3, c6);
        else if ("object" === k2) throw b3 = String(a3), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b3 ? "object with keys {" + Object.keys(a3).join(", ") + "}" : b3) + "). If you meant to render a collection of children, use an array instead.");
        return h3;
      }
      function S3(a3, b3, e12) {
        if (null == a3) return a3;
        var d3 = [], c6 = 0;
        R2(a3, d3, "", "", function(a4) {
          return b3.call(e12, a4, c6++);
        });
        return d3;
      }
      function T2(a3) {
        if (-1 === a3._status) {
          var b3 = a3._result;
          b3 = b3();
          b3.then(function(b4) {
            if (0 === a3._status || -1 === a3._status) a3._status = 1, a3._result = b4;
          }, function(b4) {
            if (0 === a3._status || -1 === a3._status) a3._status = 2, a3._result = b4;
          });
          -1 === a3._status && (a3._status = 0, a3._result = b3);
        }
        if (1 === a3._status) return a3._result.default;
        throw a3._result;
      }
      var U = { current: null };
      var V2 = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V2, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S3, forEach: function(a3, b3, e12) {
        S3(a3, function() {
          b3.apply(this, arguments);
        }, e12);
      }, count: function(a3) {
        var b3 = 0;
        S3(a3, function() {
          b3++;
        });
        return b3;
      }, toArray: function(a3) {
        return S3(a3, function(a4) {
          return a4;
        }) || [];
      }, only: function(a3) {
        if (!O(a3)) throw Error("React.Children.only expected to receive a single React element child.");
        return a3;
      } };
      exports.Component = E2;
      exports.Fragment = p4;
      exports.Profiler = r8;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w2;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a3, b3, e12) {
        if (null === a3 || void 0 === a3) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a3 + ".");
        var d3 = C2({}, a3.props), c6 = a3.key, k2 = a3.ref, h3 = a3._owner;
        if (null != b3) {
          void 0 !== b3.ref && (k2 = b3.ref, h3 = K.current);
          void 0 !== b3.key && (c6 = "" + b3.key);
          if (a3.type && a3.type.defaultProps) var g2 = a3.type.defaultProps;
          for (f3 in b3) J.call(b3, f3) && !L2.hasOwnProperty(f3) && (d3[f3] = void 0 === b3[f3] && void 0 !== g2 ? g2[f3] : b3[f3]);
        }
        var f3 = arguments.length - 2;
        if (1 === f3) d3.children = e12;
        else if (1 < f3) {
          g2 = Array(f3);
          for (var m3 = 0; m3 < f3; m3++) g2[m3] = arguments[m3 + 2];
          d3.children = g2;
        }
        return { $$typeof: l3, type: a3.type, key: c6, ref: k2, props: d3, _owner: h3 };
      };
      exports.createContext = function(a3) {
        a3 = { $$typeof: u5, _currentValue: a3, _currentValue2: a3, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a3.Provider = { $$typeof: t7, _context: a3 };
        return a3.Consumer = a3;
      };
      exports.createElement = M3;
      exports.createFactory = function(a3) {
        var b3 = M3.bind(null, a3);
        b3.type = a3;
        return b3;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a3) {
        return { $$typeof: v3, render: a3 };
      };
      exports.isValidElement = O;
      exports.lazy = function(a3) {
        return { $$typeof: y3, _payload: { _status: -1, _result: a3 }, _init: T2 };
      };
      exports.memo = function(a3, b3) {
        return { $$typeof: x2, type: a3, compare: void 0 === b3 ? null : b3 };
      };
      exports.startTransition = function(a3) {
        var b3 = V2.transition;
        V2.transition = {};
        try {
          a3();
        } finally {
          V2.transition = b3;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a3, b3) {
        return U.current.useCallback(a3, b3);
      };
      exports.useContext = function(a3) {
        return U.current.useContext(a3);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a3) {
        return U.current.useDeferredValue(a3);
      };
      exports.useEffect = function(a3, b3) {
        return U.current.useEffect(a3, b3);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a3, b3, e12) {
        return U.current.useImperativeHandle(a3, b3, e12);
      };
      exports.useInsertionEffect = function(a3, b3) {
        return U.current.useInsertionEffect(a3, b3);
      };
      exports.useLayoutEffect = function(a3, b3) {
        return U.current.useLayoutEffect(a3, b3);
      };
      exports.useMemo = function(a3, b3) {
        return U.current.useMemo(a3, b3);
      };
      exports.useReducer = function(a3, b3, e12) {
        return U.current.useReducer(a3, b3, e12);
      };
      exports.useRef = function(a3) {
        return U.current.useRef(a3);
      };
      exports.useState = function(a3) {
        return U.current.useState(a3);
      };
      exports.useSyncExternalStore = function(a3, b3, e12) {
        return U.current.useSyncExternalStore(a3, b3, e12);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f3(a3, b3) {
        var c6 = a3.length;
        a3.push(b3);
        a: for (; 0 < c6; ) {
          var d3 = c6 - 1 >>> 1, e12 = a3[d3];
          if (0 < g2(e12, b3)) a3[d3] = b3, a3[c6] = e12, c6 = d3;
          else break a;
        }
      }
      function h3(a3) {
        return 0 === a3.length ? null : a3[0];
      }
      function k2(a3) {
        if (0 === a3.length) return null;
        var b3 = a3[0], c6 = a3.pop();
        if (c6 !== b3) {
          a3[0] = c6;
          a: for (var d3 = 0, e12 = a3.length, w2 = e12 >>> 1; d3 < w2; ) {
            var m3 = 2 * (d3 + 1) - 1, C2 = a3[m3], n9 = m3 + 1, x2 = a3[n9];
            if (0 > g2(C2, c6)) n9 < e12 && 0 > g2(x2, C2) ? (a3[d3] = x2, a3[n9] = c6, d3 = n9) : (a3[d3] = C2, a3[m3] = c6, d3 = m3);
            else if (n9 < e12 && 0 > g2(x2, c6)) a3[d3] = x2, a3[n9] = c6, d3 = n9;
            else break a;
          }
        }
        return b3;
      }
      function g2(a3, b3) {
        var c6 = a3.sortIndex - b3.sortIndex;
        return 0 !== c6 ? c6 : a3.id - b3.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l3 = performance;
        exports.unstable_now = function() {
          return l3.now();
        };
      } else {
        p4 = Date, q = p4.now();
        exports.unstable_now = function() {
          return p4.now() - q;
        };
      }
      var l3;
      var p4;
      var q;
      var r8 = [];
      var t7 = [];
      var u5 = 1;
      var v3 = null;
      var y3 = 3;
      var z2 = false;
      var A2 = false;
      var B2 = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E2 = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a3) {
        for (var b3 = h3(t7); null !== b3; ) {
          if (null === b3.callback) k2(t7);
          else if (b3.startTime <= a3) k2(t7), b3.sortIndex = b3.expirationTime, f3(r8, b3);
          else break;
          b3 = h3(t7);
        }
      }
      function H2(a3) {
        B2 = false;
        G(a3);
        if (!A2) if (null !== h3(r8)) A2 = true, I2(J);
        else {
          var b3 = h3(t7);
          null !== b3 && K(H2, b3.startTime - a3);
        }
      }
      function J(a3, b3) {
        A2 = false;
        B2 && (B2 = false, E2(L2), L2 = -1);
        z2 = true;
        var c6 = y3;
        try {
          G(b3);
          for (v3 = h3(r8); null !== v3 && (!(v3.expirationTime > b3) || a3 && !M3()); ) {
            var d3 = v3.callback;
            if ("function" === typeof d3) {
              v3.callback = null;
              y3 = v3.priorityLevel;
              var e12 = d3(v3.expirationTime <= b3);
              b3 = exports.unstable_now();
              "function" === typeof e12 ? v3.callback = e12 : v3 === h3(r8) && k2(r8);
              G(b3);
            } else k2(r8);
            v3 = h3(r8);
          }
          if (null !== v3) var w2 = true;
          else {
            var m3 = h3(t7);
            null !== m3 && K(H2, m3.startTime - b3);
            w2 = false;
          }
          return w2;
        } finally {
          v3 = null, y3 = c6, z2 = false;
        }
      }
      var N2 = false;
      var O = null;
      var L2 = -1;
      var P2 = 5;
      var Q = -1;
      function M3() {
        return exports.unstable_now() - Q < P2 ? false : true;
      }
      function R2() {
        if (null !== O) {
          var a3 = exports.unstable_now();
          Q = a3;
          var b3 = true;
          try {
            b3 = O(true, a3);
          } finally {
            b3 ? S3() : (N2 = false, O = null);
          }
        } else N2 = false;
      }
      var S3;
      if ("function" === typeof F) S3 = function() {
        F(R2);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T2 = new MessageChannel(), U = T2.port2;
        T2.port1.onmessage = R2;
        S3 = function() {
          U.postMessage(null);
        };
      } else S3 = function() {
        D(R2, 0);
      };
      var T2;
      var U;
      function I2(a3) {
        O = a3;
        N2 || (N2 = true, S3());
      }
      function K(a3, b3) {
        L2 = D(function() {
          a3(exports.unstable_now());
        }, b3);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a3) {
        a3.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A2 || z2 || (A2 = true, I2(J));
      };
      exports.unstable_forceFrameRate = function(a3) {
        0 > a3 || 125 < a3 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a3 ? Math.floor(1e3 / a3) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y3;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h3(r8);
      };
      exports.unstable_next = function(a3) {
        switch (y3) {
          case 1:
          case 2:
          case 3:
            var b3 = 3;
            break;
          default:
            b3 = y3;
        }
        var c6 = y3;
        y3 = b3;
        try {
          return a3();
        } finally {
          y3 = c6;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a3, b3) {
        switch (a3) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a3 = 3;
        }
        var c6 = y3;
        y3 = a3;
        try {
          return b3();
        } finally {
          y3 = c6;
        }
      };
      exports.unstable_scheduleCallback = function(a3, b3, c6) {
        var d3 = exports.unstable_now();
        "object" === typeof c6 && null !== c6 ? (c6 = c6.delay, c6 = "number" === typeof c6 && 0 < c6 ? d3 + c6 : d3) : c6 = d3;
        switch (a3) {
          case 1:
            var e12 = -1;
            break;
          case 2:
            e12 = 250;
            break;
          case 5:
            e12 = 1073741823;
            break;
          case 4:
            e12 = 1e4;
            break;
          default:
            e12 = 5e3;
        }
        e12 = c6 + e12;
        a3 = { id: u5++, callback: b3, priorityLevel: a3, startTime: c6, expirationTime: e12, sortIndex: -1 };
        c6 > d3 ? (a3.sortIndex = c6, f3(t7, a3), null === h3(r8) && a3 === h3(t7) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K(H2, c6 - d3))) : (a3.sortIndex = e12, f3(r8, a3), A2 || z2 || (A2 = true, I2(J)));
        return a3;
      };
      exports.unstable_shouldYield = M3;
      exports.unstable_wrapCallback = function(a3) {
        var b3 = y3;
        return function() {
          var c6 = y3;
          y3 = b3;
          try {
            return a3.apply(this, arguments);
          } finally {
            y3 = c6;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p4(a3) {
        for (var b3 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a3, c6 = 1; c6 < arguments.length; c6++) b3 += "&args[]=" + encodeURIComponent(arguments[c6]);
        return "Minified React error #" + a3 + "; visit " + b3 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a3, b3) {
        ha(a3, b3);
        ha(a3 + "Capture", b3);
      }
      function ha(a3, b3) {
        ea[a3] = b3;
        for (a3 = 0; a3 < b3.length; a3++) da.add(b3[a3]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a3) {
        if (ja.call(ma, a3)) return true;
        if (ja.call(la, a3)) return false;
        if (ka.test(a3)) return ma[a3] = true;
        la[a3] = true;
        return false;
      }
      function pa(a3, b3, c6, d3) {
        if (null !== c6 && 0 === c6.type) return false;
        switch (typeof b3) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d3) return false;
            if (null !== c6) return !c6.acceptsBooleans;
            a3 = a3.toLowerCase().slice(0, 5);
            return "data-" !== a3 && "aria-" !== a3;
          default:
            return false;
        }
      }
      function qa(a3, b3, c6, d3) {
        if (null === b3 || "undefined" === typeof b3 || pa(a3, b3, c6, d3)) return true;
        if (d3) return false;
        if (null !== c6) switch (c6.type) {
          case 3:
            return !b3;
          case 4:
            return false === b3;
          case 5:
            return isNaN(b3);
          case 6:
            return isNaN(b3) || 1 > b3;
        }
        return false;
      }
      function v3(a3, b3, c6, d3, e12, f3, g2) {
        this.acceptsBooleans = 2 === b3 || 3 === b3 || 4 === b3;
        this.attributeName = d3;
        this.attributeNamespace = e12;
        this.mustUseProperty = c6;
        this.propertyName = a3;
        this.type = b3;
        this.sanitizeURL = f3;
        this.removeEmptyString = g2;
      }
      var z2 = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a3) {
        z2[a3] = new v3(a3, 0, false, a3, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a3) {
        var b3 = a3[0];
        z2[b3] = new v3(b3, 1, false, a3[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a3) {
        z2[a3] = new v3(a3, 2, false, a3.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a3) {
        z2[a3] = new v3(a3, 2, false, a3, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a3) {
        z2[a3] = new v3(a3, 3, false, a3.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a3) {
        z2[a3] = new v3(a3, 3, true, a3, null, false, false);
      });
      ["capture", "download"].forEach(function(a3) {
        z2[a3] = new v3(a3, 4, false, a3, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a3) {
        z2[a3] = new v3(a3, 6, false, a3, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a3) {
        z2[a3] = new v3(a3, 5, false, a3.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a3) {
        return a3[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a3) {
        var b3 = a3.replace(
          ra,
          sa
        );
        z2[b3] = new v3(b3, 1, false, a3, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a3) {
        var b3 = a3.replace(ra, sa);
        z2[b3] = new v3(b3, 1, false, a3, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a3) {
        var b3 = a3.replace(ra, sa);
        z2[b3] = new v3(b3, 1, false, a3, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a3) {
        z2[a3] = new v3(a3, 1, false, a3.toLowerCase(), null, false, false);
      });
      z2.xlinkHref = new v3("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a3) {
        z2[a3] = new v3(a3, 1, false, a3.toLowerCase(), null, true, true);
      });
      function ta(a3, b3, c6, d3) {
        var e12 = z2.hasOwnProperty(b3) ? z2[b3] : null;
        if (null !== e12 ? 0 !== e12.type : d3 || !(2 < b3.length) || "o" !== b3[0] && "O" !== b3[0] || "n" !== b3[1] && "N" !== b3[1]) qa(b3, c6, e12, d3) && (c6 = null), d3 || null === e12 ? oa(b3) && (null === c6 ? a3.removeAttribute(b3) : a3.setAttribute(b3, "" + c6)) : e12.mustUseProperty ? a3[e12.propertyName] = null === c6 ? 3 === e12.type ? false : "" : c6 : (b3 = e12.attributeName, d3 = e12.attributeNamespace, null === c6 ? a3.removeAttribute(b3) : (e12 = e12.type, c6 = 3 === e12 || 4 === e12 && true === c6 ? "" : "" + c6, d3 ? a3.setAttributeNS(d3, b3, c6) : a3.setAttribute(b3, c6)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a3) {
        if (null === a3 || "object" !== typeof a3) return null;
        a3 = Ja && a3[Ja] || a3["@@iterator"];
        return "function" === typeof a3 ? a3 : null;
      }
      var A2 = Object.assign;
      var La;
      function Ma(a3) {
        if (void 0 === La) try {
          throw Error();
        } catch (c6) {
          var b3 = c6.stack.trim().match(/\n( *(at )?)/);
          La = b3 && b3[1] || "";
        }
        return "\n" + La + a3;
      }
      var Na = false;
      function Oa(a3, b3) {
        if (!a3 || Na) return "";
        Na = true;
        var c6 = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b3) if (b3 = function() {
            throw Error();
          }, Object.defineProperty(b3.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b3, []);
            } catch (l3) {
              var d3 = l3;
            }
            Reflect.construct(a3, [], b3);
          } else {
            try {
              b3.call();
            } catch (l3) {
              d3 = l3;
            }
            a3.call(b3.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l3) {
              d3 = l3;
            }
            a3();
          }
        } catch (l3) {
          if (l3 && d3 && "string" === typeof l3.stack) {
            for (var e12 = l3.stack.split("\n"), f3 = d3.stack.split("\n"), g2 = e12.length - 1, h3 = f3.length - 1; 1 <= g2 && 0 <= h3 && e12[g2] !== f3[h3]; ) h3--;
            for (; 1 <= g2 && 0 <= h3; g2--, h3--) if (e12[g2] !== f3[h3]) {
              if (1 !== g2 || 1 !== h3) {
                do
                  if (g2--, h3--, 0 > h3 || e12[g2] !== f3[h3]) {
                    var k2 = "\n" + e12[g2].replace(" at new ", " at ");
                    a3.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a3.displayName));
                    return k2;
                  }
                while (1 <= g2 && 0 <= h3);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c6;
        }
        return (a3 = a3 ? a3.displayName || a3.name : "") ? Ma(a3) : "";
      }
      function Pa(a3) {
        switch (a3.tag) {
          case 5:
            return Ma(a3.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a3 = Oa(a3.type, false), a3;
          case 11:
            return a3 = Oa(a3.type.render, false), a3;
          case 1:
            return a3 = Oa(a3.type, true), a3;
          default:
            return "";
        }
      }
      function Qa(a3) {
        if (null == a3) return null;
        if ("function" === typeof a3) return a3.displayName || a3.name || null;
        if ("string" === typeof a3) return a3;
        switch (a3) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a3) switch (a3.$$typeof) {
          case Ca:
            return (a3.displayName || "Context") + ".Consumer";
          case Ba:
            return (a3._context.displayName || "Context") + ".Provider";
          case Da:
            var b3 = a3.render;
            a3 = a3.displayName;
            a3 || (a3 = b3.displayName || b3.name || "", a3 = "" !== a3 ? "ForwardRef(" + a3 + ")" : "ForwardRef");
            return a3;
          case Ga:
            return b3 = a3.displayName || null, null !== b3 ? b3 : Qa(a3.type) || "Memo";
          case Ha:
            b3 = a3._payload;
            a3 = a3._init;
            try {
              return Qa(a3(b3));
            } catch (c6) {
            }
        }
        return null;
      }
      function Ra(a3) {
        var b3 = a3.type;
        switch (a3.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b3.displayName || "Context") + ".Consumer";
          case 10:
            return (b3._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a3 = b3.render, a3 = a3.displayName || a3.name || "", b3.displayName || ("" !== a3 ? "ForwardRef(" + a3 + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b3;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b3);
          case 8:
            return b3 === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b3) return b3.displayName || b3.name || null;
            if ("string" === typeof b3) return b3;
        }
        return null;
      }
      function Sa(a3) {
        switch (typeof a3) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a3;
          case "object":
            return a3;
          default:
            return "";
        }
      }
      function Ta(a3) {
        var b3 = a3.type;
        return (a3 = a3.nodeName) && "input" === a3.toLowerCase() && ("checkbox" === b3 || "radio" === b3);
      }
      function Ua(a3) {
        var b3 = Ta(a3) ? "checked" : "value", c6 = Object.getOwnPropertyDescriptor(a3.constructor.prototype, b3), d3 = "" + a3[b3];
        if (!a3.hasOwnProperty(b3) && "undefined" !== typeof c6 && "function" === typeof c6.get && "function" === typeof c6.set) {
          var e12 = c6.get, f3 = c6.set;
          Object.defineProperty(a3, b3, { configurable: true, get: function() {
            return e12.call(this);
          }, set: function(a4) {
            d3 = "" + a4;
            f3.call(this, a4);
          } });
          Object.defineProperty(a3, b3, { enumerable: c6.enumerable });
          return { getValue: function() {
            return d3;
          }, setValue: function(a4) {
            d3 = "" + a4;
          }, stopTracking: function() {
            a3._valueTracker = null;
            delete a3[b3];
          } };
        }
      }
      function Va(a3) {
        a3._valueTracker || (a3._valueTracker = Ua(a3));
      }
      function Wa(a3) {
        if (!a3) return false;
        var b3 = a3._valueTracker;
        if (!b3) return true;
        var c6 = b3.getValue();
        var d3 = "";
        a3 && (d3 = Ta(a3) ? a3.checked ? "true" : "false" : a3.value);
        a3 = d3;
        return a3 !== c6 ? (b3.setValue(a3), true) : false;
      }
      function Xa(a3) {
        a3 = a3 || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a3) return null;
        try {
          return a3.activeElement || a3.body;
        } catch (b3) {
          return a3.body;
        }
      }
      function Ya(a3, b3) {
        var c6 = b3.checked;
        return A2({}, b3, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c6 ? c6 : a3._wrapperState.initialChecked });
      }
      function Za(a3, b3) {
        var c6 = null == b3.defaultValue ? "" : b3.defaultValue, d3 = null != b3.checked ? b3.checked : b3.defaultChecked;
        c6 = Sa(null != b3.value ? b3.value : c6);
        a3._wrapperState = { initialChecked: d3, initialValue: c6, controlled: "checkbox" === b3.type || "radio" === b3.type ? null != b3.checked : null != b3.value };
      }
      function ab(a3, b3) {
        b3 = b3.checked;
        null != b3 && ta(a3, "checked", b3, false);
      }
      function bb(a3, b3) {
        ab(a3, b3);
        var c6 = Sa(b3.value), d3 = b3.type;
        if (null != c6) if ("number" === d3) {
          if (0 === c6 && "" === a3.value || a3.value != c6) a3.value = "" + c6;
        } else a3.value !== "" + c6 && (a3.value = "" + c6);
        else if ("submit" === d3 || "reset" === d3) {
          a3.removeAttribute("value");
          return;
        }
        b3.hasOwnProperty("value") ? cb(a3, b3.type, c6) : b3.hasOwnProperty("defaultValue") && cb(a3, b3.type, Sa(b3.defaultValue));
        null == b3.checked && null != b3.defaultChecked && (a3.defaultChecked = !!b3.defaultChecked);
      }
      function db(a3, b3, c6) {
        if (b3.hasOwnProperty("value") || b3.hasOwnProperty("defaultValue")) {
          var d3 = b3.type;
          if (!("submit" !== d3 && "reset" !== d3 || void 0 !== b3.value && null !== b3.value)) return;
          b3 = "" + a3._wrapperState.initialValue;
          c6 || b3 === a3.value || (a3.value = b3);
          a3.defaultValue = b3;
        }
        c6 = a3.name;
        "" !== c6 && (a3.name = "");
        a3.defaultChecked = !!a3._wrapperState.initialChecked;
        "" !== c6 && (a3.name = c6);
      }
      function cb(a3, b3, c6) {
        if ("number" !== b3 || Xa(a3.ownerDocument) !== a3) null == c6 ? a3.defaultValue = "" + a3._wrapperState.initialValue : a3.defaultValue !== "" + c6 && (a3.defaultValue = "" + c6);
      }
      var eb = Array.isArray;
      function fb(a3, b3, c6, d3) {
        a3 = a3.options;
        if (b3) {
          b3 = {};
          for (var e12 = 0; e12 < c6.length; e12++) b3["$" + c6[e12]] = true;
          for (c6 = 0; c6 < a3.length; c6++) e12 = b3.hasOwnProperty("$" + a3[c6].value), a3[c6].selected !== e12 && (a3[c6].selected = e12), e12 && d3 && (a3[c6].defaultSelected = true);
        } else {
          c6 = "" + Sa(c6);
          b3 = null;
          for (e12 = 0; e12 < a3.length; e12++) {
            if (a3[e12].value === c6) {
              a3[e12].selected = true;
              d3 && (a3[e12].defaultSelected = true);
              return;
            }
            null !== b3 || a3[e12].disabled || (b3 = a3[e12]);
          }
          null !== b3 && (b3.selected = true);
        }
      }
      function gb(a3, b3) {
        if (null != b3.dangerouslySetInnerHTML) throw Error(p4(91));
        return A2({}, b3, { value: void 0, defaultValue: void 0, children: "" + a3._wrapperState.initialValue });
      }
      function hb(a3, b3) {
        var c6 = b3.value;
        if (null == c6) {
          c6 = b3.children;
          b3 = b3.defaultValue;
          if (null != c6) {
            if (null != b3) throw Error(p4(92));
            if (eb(c6)) {
              if (1 < c6.length) throw Error(p4(93));
              c6 = c6[0];
            }
            b3 = c6;
          }
          null == b3 && (b3 = "");
          c6 = b3;
        }
        a3._wrapperState = { initialValue: Sa(c6) };
      }
      function ib(a3, b3) {
        var c6 = Sa(b3.value), d3 = Sa(b3.defaultValue);
        null != c6 && (c6 = "" + c6, c6 !== a3.value && (a3.value = c6), null == b3.defaultValue && a3.defaultValue !== c6 && (a3.defaultValue = c6));
        null != d3 && (a3.defaultValue = "" + d3);
      }
      function jb(a3) {
        var b3 = a3.textContent;
        b3 === a3._wrapperState.initialValue && "" !== b3 && null !== b3 && (a3.value = b3);
      }
      function kb(a3) {
        switch (a3) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a3, b3) {
        return null == a3 || "http://www.w3.org/1999/xhtml" === a3 ? kb(b3) : "http://www.w3.org/2000/svg" === a3 && "foreignObject" === b3 ? "http://www.w3.org/1999/xhtml" : a3;
      }
      var mb;
      var nb = (function(a3) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b3, c6, d3, e12) {
          MSApp.execUnsafeLocalFunction(function() {
            return a3(b3, c6, d3, e12);
          });
        } : a3;
      })(function(a3, b3) {
        if ("http://www.w3.org/2000/svg" !== a3.namespaceURI || "innerHTML" in a3) a3.innerHTML = b3;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b3.valueOf().toString() + "</svg>";
          for (b3 = mb.firstChild; a3.firstChild; ) a3.removeChild(a3.firstChild);
          for (; b3.firstChild; ) a3.appendChild(b3.firstChild);
        }
      });
      function ob(a3, b3) {
        if (b3) {
          var c6 = a3.firstChild;
          if (c6 && c6 === a3.lastChild && 3 === c6.nodeType) {
            c6.nodeValue = b3;
            return;
          }
        }
        a3.textContent = b3;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a3) {
        qb.forEach(function(b3) {
          b3 = b3 + a3.charAt(0).toUpperCase() + a3.substring(1);
          pb[b3] = pb[a3];
        });
      });
      function rb(a3, b3, c6) {
        return null == b3 || "boolean" === typeof b3 || "" === b3 ? "" : c6 || "number" !== typeof b3 || 0 === b3 || pb.hasOwnProperty(a3) && pb[a3] ? ("" + b3).trim() : b3 + "px";
      }
      function sb(a3, b3) {
        a3 = a3.style;
        for (var c6 in b3) if (b3.hasOwnProperty(c6)) {
          var d3 = 0 === c6.indexOf("--"), e12 = rb(c6, b3[c6], d3);
          "float" === c6 && (c6 = "cssFloat");
          d3 ? a3.setProperty(c6, e12) : a3[c6] = e12;
        }
      }
      var tb = A2({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a3, b3) {
        if (b3) {
          if (tb[a3] && (null != b3.children || null != b3.dangerouslySetInnerHTML)) throw Error(p4(137, a3));
          if (null != b3.dangerouslySetInnerHTML) {
            if (null != b3.children) throw Error(p4(60));
            if ("object" !== typeof b3.dangerouslySetInnerHTML || !("__html" in b3.dangerouslySetInnerHTML)) throw Error(p4(61));
          }
          if (null != b3.style && "object" !== typeof b3.style) throw Error(p4(62));
        }
      }
      function vb(a3, b3) {
        if (-1 === a3.indexOf("-")) return "string" === typeof b3.is;
        switch (a3) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a3) {
        a3 = a3.target || a3.srcElement || window;
        a3.correspondingUseElement && (a3 = a3.correspondingUseElement);
        return 3 === a3.nodeType ? a3.parentNode : a3;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a3) {
        if (a3 = Cb(a3)) {
          if ("function" !== typeof yb) throw Error(p4(280));
          var b3 = a3.stateNode;
          b3 && (b3 = Db(b3), yb(a3.stateNode, a3.type, b3));
        }
      }
      function Eb(a3) {
        zb ? Ab ? Ab.push(a3) : Ab = [a3] : zb = a3;
      }
      function Fb() {
        if (zb) {
          var a3 = zb, b3 = Ab;
          Ab = zb = null;
          Bb(a3);
          if (b3) for (a3 = 0; a3 < b3.length; a3++) Bb(b3[a3]);
        }
      }
      function Gb(a3, b3) {
        return a3(b3);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a3, b3, c6) {
        if (Ib) return a3(b3, c6);
        Ib = true;
        try {
          return Gb(a3, b3, c6);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a3, b3) {
        var c6 = a3.stateNode;
        if (null === c6) return null;
        var d3 = Db(c6);
        if (null === d3) return null;
        c6 = d3[b3];
        a: switch (b3) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d3 = !d3.disabled) || (a3 = a3.type, d3 = !("button" === a3 || "input" === a3 || "select" === a3 || "textarea" === a3));
            a3 = !d3;
            break a;
          default:
            a3 = false;
        }
        if (a3) return null;
        if (c6 && "function" !== typeof c6) throw Error(p4(231, b3, typeof c6));
        return c6;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a3) {
        Lb = false;
      }
      var Mb;
      function Nb(a3, b3, c6, d3, e12, f3, g2, h3, k2) {
        var l3 = Array.prototype.slice.call(arguments, 3);
        try {
          b3.apply(c6, l3);
        } catch (m3) {
          this.onError(m3);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a3) {
        Ob = true;
        Pb = a3;
      } };
      function Tb(a3, b3, c6, d3, e12, f3, g2, h3, k2) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a3, b3, c6, d3, e12, f3, g2, h3, k2) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l3 = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p4(198));
          Qb || (Qb = true, Rb = l3);
        }
      }
      function Vb(a3) {
        var b3 = a3, c6 = a3;
        if (a3.alternate) for (; b3.return; ) b3 = b3.return;
        else {
          a3 = b3;
          do
            b3 = a3, 0 !== (b3.flags & 4098) && (c6 = b3.return), a3 = b3.return;
          while (a3);
        }
        return 3 === b3.tag ? c6 : null;
      }
      function Wb(a3) {
        if (13 === a3.tag) {
          var b3 = a3.memoizedState;
          null === b3 && (a3 = a3.alternate, null !== a3 && (b3 = a3.memoizedState));
          if (null !== b3) return b3.dehydrated;
        }
        return null;
      }
      function Xb(a3) {
        if (Vb(a3) !== a3) throw Error(p4(188));
      }
      function Yb(a3) {
        var b3 = a3.alternate;
        if (!b3) {
          b3 = Vb(a3);
          if (null === b3) throw Error(p4(188));
          return b3 !== a3 ? null : a3;
        }
        for (var c6 = a3, d3 = b3; ; ) {
          var e12 = c6.return;
          if (null === e12) break;
          var f3 = e12.alternate;
          if (null === f3) {
            d3 = e12.return;
            if (null !== d3) {
              c6 = d3;
              continue;
            }
            break;
          }
          if (e12.child === f3.child) {
            for (f3 = e12.child; f3; ) {
              if (f3 === c6) return Xb(e12), a3;
              if (f3 === d3) return Xb(e12), b3;
              f3 = f3.sibling;
            }
            throw Error(p4(188));
          }
          if (c6.return !== d3.return) c6 = e12, d3 = f3;
          else {
            for (var g2 = false, h3 = e12.child; h3; ) {
              if (h3 === c6) {
                g2 = true;
                c6 = e12;
                d3 = f3;
                break;
              }
              if (h3 === d3) {
                g2 = true;
                d3 = e12;
                c6 = f3;
                break;
              }
              h3 = h3.sibling;
            }
            if (!g2) {
              for (h3 = f3.child; h3; ) {
                if (h3 === c6) {
                  g2 = true;
                  c6 = f3;
                  d3 = e12;
                  break;
                }
                if (h3 === d3) {
                  g2 = true;
                  d3 = f3;
                  c6 = e12;
                  break;
                }
                h3 = h3.sibling;
              }
              if (!g2) throw Error(p4(189));
            }
          }
          if (c6.alternate !== d3) throw Error(p4(190));
        }
        if (3 !== c6.tag) throw Error(p4(188));
        return c6.stateNode.current === c6 ? a3 : b3;
      }
      function Zb(a3) {
        a3 = Yb(a3);
        return null !== a3 ? $b(a3) : null;
      }
      function $b(a3) {
        if (5 === a3.tag || 6 === a3.tag) return a3;
        for (a3 = a3.child; null !== a3; ) {
          var b3 = $b(a3);
          if (null !== b3) return b3;
          a3 = a3.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B2 = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a3) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a3, void 0, 128 === (a3.current.flags & 128));
        } catch (b3) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a3) {
        a3 >>>= 0;
        return 0 === a3 ? 32 : 31 - (pc(a3) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a3) {
        switch (a3 & -a3) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a3 & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a3 & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a3;
        }
      }
      function uc(a3, b3) {
        var c6 = a3.pendingLanes;
        if (0 === c6) return 0;
        var d3 = 0, e12 = a3.suspendedLanes, f3 = a3.pingedLanes, g2 = c6 & 268435455;
        if (0 !== g2) {
          var h3 = g2 & ~e12;
          0 !== h3 ? d3 = tc(h3) : (f3 &= g2, 0 !== f3 && (d3 = tc(f3)));
        } else g2 = c6 & ~e12, 0 !== g2 ? d3 = tc(g2) : 0 !== f3 && (d3 = tc(f3));
        if (0 === d3) return 0;
        if (0 !== b3 && b3 !== d3 && 0 === (b3 & e12) && (e12 = d3 & -d3, f3 = b3 & -b3, e12 >= f3 || 16 === e12 && 0 !== (f3 & 4194240))) return b3;
        0 !== (d3 & 4) && (d3 |= c6 & 16);
        b3 = a3.entangledLanes;
        if (0 !== b3) for (a3 = a3.entanglements, b3 &= d3; 0 < b3; ) c6 = 31 - oc(b3), e12 = 1 << c6, d3 |= a3[c6], b3 &= ~e12;
        return d3;
      }
      function vc(a3, b3) {
        switch (a3) {
          case 1:
          case 2:
          case 4:
            return b3 + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b3 + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a3, b3) {
        for (var c6 = a3.suspendedLanes, d3 = a3.pingedLanes, e12 = a3.expirationTimes, f3 = a3.pendingLanes; 0 < f3; ) {
          var g2 = 31 - oc(f3), h3 = 1 << g2, k2 = e12[g2];
          if (-1 === k2) {
            if (0 === (h3 & c6) || 0 !== (h3 & d3)) e12[g2] = vc(h3, b3);
          } else k2 <= b3 && (a3.expiredLanes |= h3);
          f3 &= ~h3;
        }
      }
      function xc(a3) {
        a3 = a3.pendingLanes & -1073741825;
        return 0 !== a3 ? a3 : a3 & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a3 = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a3;
      }
      function zc(a3) {
        for (var b3 = [], c6 = 0; 31 > c6; c6++) b3.push(a3);
        return b3;
      }
      function Ac(a3, b3, c6) {
        a3.pendingLanes |= b3;
        536870912 !== b3 && (a3.suspendedLanes = 0, a3.pingedLanes = 0);
        a3 = a3.eventTimes;
        b3 = 31 - oc(b3);
        a3[b3] = c6;
      }
      function Bc(a3, b3) {
        var c6 = a3.pendingLanes & ~b3;
        a3.pendingLanes = b3;
        a3.suspendedLanes = 0;
        a3.pingedLanes = 0;
        a3.expiredLanes &= b3;
        a3.mutableReadLanes &= b3;
        a3.entangledLanes &= b3;
        b3 = a3.entanglements;
        var d3 = a3.eventTimes;
        for (a3 = a3.expirationTimes; 0 < c6; ) {
          var e12 = 31 - oc(c6), f3 = 1 << e12;
          b3[e12] = 0;
          d3[e12] = -1;
          a3[e12] = -1;
          c6 &= ~f3;
        }
      }
      function Cc(a3, b3) {
        var c6 = a3.entangledLanes |= b3;
        for (a3 = a3.entanglements; c6; ) {
          var d3 = 31 - oc(c6), e12 = 1 << d3;
          e12 & b3 | a3[d3] & b3 && (a3[d3] |= b3);
          c6 &= ~e12;
        }
      }
      var C2 = 0;
      function Dc(a3) {
        a3 &= -a3;
        return 1 < a3 ? 4 < a3 ? 0 !== (a3 & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a3, b3) {
        switch (a3) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b3.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b3.pointerId);
        }
      }
      function Tc(a3, b3, c6, d3, e12, f3) {
        if (null === a3 || a3.nativeEvent !== f3) return a3 = { blockedOn: b3, domEventName: c6, eventSystemFlags: d3, nativeEvent: f3, targetContainers: [e12] }, null !== b3 && (b3 = Cb(b3), null !== b3 && Fc(b3)), a3;
        a3.eventSystemFlags |= d3;
        b3 = a3.targetContainers;
        null !== e12 && -1 === b3.indexOf(e12) && b3.push(e12);
        return a3;
      }
      function Uc(a3, b3, c6, d3, e12) {
        switch (b3) {
          case "focusin":
            return Lc = Tc(Lc, a3, b3, c6, d3, e12), true;
          case "dragenter":
            return Mc = Tc(Mc, a3, b3, c6, d3, e12), true;
          case "mouseover":
            return Nc = Tc(Nc, a3, b3, c6, d3, e12), true;
          case "pointerover":
            var f3 = e12.pointerId;
            Oc.set(f3, Tc(Oc.get(f3) || null, a3, b3, c6, d3, e12));
            return true;
          case "gotpointercapture":
            return f3 = e12.pointerId, Pc.set(f3, Tc(Pc.get(f3) || null, a3, b3, c6, d3, e12)), true;
        }
        return false;
      }
      function Vc(a3) {
        var b3 = Wc(a3.target);
        if (null !== b3) {
          var c6 = Vb(b3);
          if (null !== c6) {
            if (b3 = c6.tag, 13 === b3) {
              if (b3 = Wb(c6), null !== b3) {
                a3.blockedOn = b3;
                Ic(a3.priority, function() {
                  Gc(c6);
                });
                return;
              }
            } else if (3 === b3 && c6.stateNode.current.memoizedState.isDehydrated) {
              a3.blockedOn = 3 === c6.tag ? c6.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a3.blockedOn = null;
      }
      function Xc(a3) {
        if (null !== a3.blockedOn) return false;
        for (var b3 = a3.targetContainers; 0 < b3.length; ) {
          var c6 = Yc(a3.domEventName, a3.eventSystemFlags, b3[0], a3.nativeEvent);
          if (null === c6) {
            c6 = a3.nativeEvent;
            var d3 = new c6.constructor(c6.type, c6);
            wb = d3;
            c6.target.dispatchEvent(d3);
            wb = null;
          } else return b3 = Cb(c6), null !== b3 && Fc(b3), a3.blockedOn = c6, false;
          b3.shift();
        }
        return true;
      }
      function Zc(a3, b3, c6) {
        Xc(a3) && c6.delete(b3);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a3, b3) {
        a3.blockedOn === b3 && (a3.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a3) {
        function b3(b4) {
          return ad(b4, a3);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a3);
          for (var c6 = 1; c6 < Kc.length; c6++) {
            var d3 = Kc[c6];
            d3.blockedOn === a3 && (d3.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a3);
        null !== Mc && ad(Mc, a3);
        null !== Nc && ad(Nc, a3);
        Oc.forEach(b3);
        Pc.forEach(b3);
        for (c6 = 0; c6 < Qc.length; c6++) d3 = Qc[c6], d3.blockedOn === a3 && (d3.blockedOn = null);
        for (; 0 < Qc.length && (c6 = Qc[0], null === c6.blockedOn); ) Vc(c6), null === c6.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a3, b3, c6, d3) {
        var e12 = C2, f3 = cd.transition;
        cd.transition = null;
        try {
          C2 = 1, fd(a3, b3, c6, d3);
        } finally {
          C2 = e12, cd.transition = f3;
        }
      }
      function gd(a3, b3, c6, d3) {
        var e12 = C2, f3 = cd.transition;
        cd.transition = null;
        try {
          C2 = 4, fd(a3, b3, c6, d3);
        } finally {
          C2 = e12, cd.transition = f3;
        }
      }
      function fd(a3, b3, c6, d3) {
        if (dd) {
          var e12 = Yc(a3, b3, c6, d3);
          if (null === e12) hd(a3, b3, d3, id, c6), Sc(a3, d3);
          else if (Uc(e12, a3, b3, c6, d3)) d3.stopPropagation();
          else if (Sc(a3, d3), b3 & 4 && -1 < Rc.indexOf(a3)) {
            for (; null !== e12; ) {
              var f3 = Cb(e12);
              null !== f3 && Ec(f3);
              f3 = Yc(a3, b3, c6, d3);
              null === f3 && hd(a3, b3, d3, id, c6);
              if (f3 === e12) break;
              e12 = f3;
            }
            null !== e12 && d3.stopPropagation();
          } else hd(a3, b3, d3, null, c6);
        }
      }
      var id = null;
      function Yc(a3, b3, c6, d3) {
        id = null;
        a3 = xb(d3);
        a3 = Wc(a3);
        if (null !== a3) if (b3 = Vb(a3), null === b3) a3 = null;
        else if (c6 = b3.tag, 13 === c6) {
          a3 = Wb(b3);
          if (null !== a3) return a3;
          a3 = null;
        } else if (3 === c6) {
          if (b3.stateNode.current.memoizedState.isDehydrated) return 3 === b3.tag ? b3.stateNode.containerInfo : null;
          a3 = null;
        } else b3 !== a3 && (a3 = null);
        id = a3;
        return null;
      }
      function jd(a3) {
        switch (a3) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a3, b3 = ld, c6 = b3.length, d3, e12 = "value" in kd ? kd.value : kd.textContent, f3 = e12.length;
        for (a3 = 0; a3 < c6 && b3[a3] === e12[a3]; a3++) ;
        var g2 = c6 - a3;
        for (d3 = 1; d3 <= g2 && b3[c6 - d3] === e12[f3 - d3]; d3++) ;
        return md = e12.slice(a3, 1 < d3 ? 1 - d3 : void 0);
      }
      function od(a3) {
        var b3 = a3.keyCode;
        "charCode" in a3 ? (a3 = a3.charCode, 0 === a3 && 13 === b3 && (a3 = 13)) : a3 = b3;
        10 === a3 && (a3 = 13);
        return 32 <= a3 || 13 === a3 ? a3 : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a3) {
        function b3(b4, d3, e12, f3, g2) {
          this._reactName = b4;
          this._targetInst = e12;
          this.type = d3;
          this.nativeEvent = f3;
          this.target = g2;
          this.currentTarget = null;
          for (var c6 in a3) a3.hasOwnProperty(c6) && (b4 = a3[c6], this[c6] = b4 ? b4(f3) : f3[c6]);
          this.isDefaultPrevented = (null != f3.defaultPrevented ? f3.defaultPrevented : false === f3.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A2(b3.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a4 = this.nativeEvent;
          a4 && (a4.preventDefault ? a4.preventDefault() : "unknown" !== typeof a4.returnValue && (a4.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a4 = this.nativeEvent;
          a4 && (a4.stopPropagation ? a4.stopPropagation() : "unknown" !== typeof a4.cancelBubble && (a4.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b3;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a3) {
        return a3.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A2({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A2({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a3) {
        return void 0 === a3.relatedTarget ? a3.fromElement === a3.srcElement ? a3.toElement : a3.fromElement : a3.relatedTarget;
      }, movementX: function(a3) {
        if ("movementX" in a3) return a3.movementX;
        a3 !== yd && (yd && "mousemove" === a3.type ? (wd = a3.screenX - yd.screenX, xd = a3.screenY - yd.screenY) : xd = wd = 0, yd = a3);
        return wd;
      }, movementY: function(a3) {
        return "movementY" in a3 ? a3.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A2({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A2({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A2({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A2({}, sd, { clipboardData: function(a3) {
        return "clipboardData" in a3 ? a3.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A2({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a3) {
        var b3 = this.nativeEvent;
        return b3.getModifierState ? b3.getModifierState(a3) : (a3 = Od[a3]) ? !!b3[a3] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A2({}, ud, { key: function(a3) {
        if (a3.key) {
          var b3 = Md[a3.key] || a3.key;
          if ("Unidentified" !== b3) return b3;
        }
        return "keypress" === a3.type ? (a3 = od(a3), 13 === a3 ? "Enter" : String.fromCharCode(a3)) : "keydown" === a3.type || "keyup" === a3.type ? Nd[a3.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a3) {
        return "keypress" === a3.type ? od(a3) : 0;
      }, keyCode: function(a3) {
        return "keydown" === a3.type || "keyup" === a3.type ? a3.keyCode : 0;
      }, which: function(a3) {
        return "keypress" === a3.type ? od(a3) : "keydown" === a3.type || "keyup" === a3.type ? a3.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A2({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A2({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A2({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A2({}, Ad, {
        deltaX: function(a3) {
          return "deltaX" in a3 ? a3.deltaX : "wheelDeltaX" in a3 ? -a3.wheelDeltaX : 0;
        },
        deltaY: function(a3) {
          return "deltaY" in a3 ? a3.deltaY : "wheelDeltaY" in a3 ? -a3.wheelDeltaY : "wheelDelta" in a3 ? -a3.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a3, b3) {
        switch (a3) {
          case "keyup":
            return -1 !== $d.indexOf(b3.keyCode);
          case "keydown":
            return 229 !== b3.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a3) {
        a3 = a3.detail;
        return "object" === typeof a3 && "data" in a3 ? a3.data : null;
      }
      var ie = false;
      function je(a3, b3) {
        switch (a3) {
          case "compositionend":
            return he(b3);
          case "keypress":
            if (32 !== b3.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a3 = b3.data, a3 === ee && fe ? null : a3;
          default:
            return null;
        }
      }
      function ke(a3, b3) {
        if (ie) return "compositionend" === a3 || !ae && ge(a3, b3) ? (a3 = nd(), md = ld = kd = null, ie = false, a3) : null;
        switch (a3) {
          case "paste":
            return null;
          case "keypress":
            if (!(b3.ctrlKey || b3.altKey || b3.metaKey) || b3.ctrlKey && b3.altKey) {
              if (b3.char && 1 < b3.char.length) return b3.char;
              if (b3.which) return String.fromCharCode(b3.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b3.locale ? null : b3.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a3) {
        var b3 = a3 && a3.nodeName && a3.nodeName.toLowerCase();
        return "input" === b3 ? !!le[a3.type] : "textarea" === b3 ? true : false;
      }
      function ne(a3, b3, c6, d3) {
        Eb(d3);
        b3 = oe(b3, "onChange");
        0 < b3.length && (c6 = new td("onChange", "change", null, c6, d3), a3.push({ event: c6, listeners: b3 }));
      }
      var pe = null;
      var qe = null;
      function re(a3) {
        se(a3, 0);
      }
      function te(a3) {
        var b3 = ue(a3);
        if (Wa(b3)) return a3;
      }
      function ve(a3, b3) {
        if ("change" === a3) return b3;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a3) {
        if ("value" === a3.propertyName && te(qe)) {
          var b3 = [];
          ne(b3, qe, a3, xb(a3));
          Jb(re, b3);
        }
      }
      function Ce(a3, b3, c6) {
        "focusin" === a3 ? (Ae(), pe = b3, qe = c6, pe.attachEvent("onpropertychange", Be)) : "focusout" === a3 && Ae();
      }
      function De(a3) {
        if ("selectionchange" === a3 || "keyup" === a3 || "keydown" === a3) return te(qe);
      }
      function Ee(a3, b3) {
        if ("click" === a3) return te(b3);
      }
      function Fe(a3, b3) {
        if ("input" === a3 || "change" === a3) return te(b3);
      }
      function Ge(a3, b3) {
        return a3 === b3 && (0 !== a3 || 1 / a3 === 1 / b3) || a3 !== a3 && b3 !== b3;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a3, b3) {
        if (He(a3, b3)) return true;
        if ("object" !== typeof a3 || null === a3 || "object" !== typeof b3 || null === b3) return false;
        var c6 = Object.keys(a3), d3 = Object.keys(b3);
        if (c6.length !== d3.length) return false;
        for (d3 = 0; d3 < c6.length; d3++) {
          var e12 = c6[d3];
          if (!ja.call(b3, e12) || !He(a3[e12], b3[e12])) return false;
        }
        return true;
      }
      function Je(a3) {
        for (; a3 && a3.firstChild; ) a3 = a3.firstChild;
        return a3;
      }
      function Ke(a3, b3) {
        var c6 = Je(a3);
        a3 = 0;
        for (var d3; c6; ) {
          if (3 === c6.nodeType) {
            d3 = a3 + c6.textContent.length;
            if (a3 <= b3 && d3 >= b3) return { node: c6, offset: b3 - a3 };
            a3 = d3;
          }
          a: {
            for (; c6; ) {
              if (c6.nextSibling) {
                c6 = c6.nextSibling;
                break a;
              }
              c6 = c6.parentNode;
            }
            c6 = void 0;
          }
          c6 = Je(c6);
        }
      }
      function Le(a3, b3) {
        return a3 && b3 ? a3 === b3 ? true : a3 && 3 === a3.nodeType ? false : b3 && 3 === b3.nodeType ? Le(a3, b3.parentNode) : "contains" in a3 ? a3.contains(b3) : a3.compareDocumentPosition ? !!(a3.compareDocumentPosition(b3) & 16) : false : false;
      }
      function Me() {
        for (var a3 = window, b3 = Xa(); b3 instanceof a3.HTMLIFrameElement; ) {
          try {
            var c6 = "string" === typeof b3.contentWindow.location.href;
          } catch (d3) {
            c6 = false;
          }
          if (c6) a3 = b3.contentWindow;
          else break;
          b3 = Xa(a3.document);
        }
        return b3;
      }
      function Ne(a3) {
        var b3 = a3 && a3.nodeName && a3.nodeName.toLowerCase();
        return b3 && ("input" === b3 && ("text" === a3.type || "search" === a3.type || "tel" === a3.type || "url" === a3.type || "password" === a3.type) || "textarea" === b3 || "true" === a3.contentEditable);
      }
      function Oe(a3) {
        var b3 = Me(), c6 = a3.focusedElem, d3 = a3.selectionRange;
        if (b3 !== c6 && c6 && c6.ownerDocument && Le(c6.ownerDocument.documentElement, c6)) {
          if (null !== d3 && Ne(c6)) {
            if (b3 = d3.start, a3 = d3.end, void 0 === a3 && (a3 = b3), "selectionStart" in c6) c6.selectionStart = b3, c6.selectionEnd = Math.min(a3, c6.value.length);
            else if (a3 = (b3 = c6.ownerDocument || document) && b3.defaultView || window, a3.getSelection) {
              a3 = a3.getSelection();
              var e12 = c6.textContent.length, f3 = Math.min(d3.start, e12);
              d3 = void 0 === d3.end ? f3 : Math.min(d3.end, e12);
              !a3.extend && f3 > d3 && (e12 = d3, d3 = f3, f3 = e12);
              e12 = Ke(c6, f3);
              var g2 = Ke(
                c6,
                d3
              );
              e12 && g2 && (1 !== a3.rangeCount || a3.anchorNode !== e12.node || a3.anchorOffset !== e12.offset || a3.focusNode !== g2.node || a3.focusOffset !== g2.offset) && (b3 = b3.createRange(), b3.setStart(e12.node, e12.offset), a3.removeAllRanges(), f3 > d3 ? (a3.addRange(b3), a3.extend(g2.node, g2.offset)) : (b3.setEnd(g2.node, g2.offset), a3.addRange(b3)));
            }
          }
          b3 = [];
          for (a3 = c6; a3 = a3.parentNode; ) 1 === a3.nodeType && b3.push({ element: a3, left: a3.scrollLeft, top: a3.scrollTop });
          "function" === typeof c6.focus && c6.focus();
          for (c6 = 0; c6 < b3.length; c6++) a3 = b3[c6], a3.element.scrollLeft = a3.left, a3.element.scrollTop = a3.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a3, b3, c6) {
        var d3 = c6.window === c6 ? c6.document : 9 === c6.nodeType ? c6 : c6.ownerDocument;
        Te || null == Qe || Qe !== Xa(d3) || (d3 = Qe, "selectionStart" in d3 && Ne(d3) ? d3 = { start: d3.selectionStart, end: d3.selectionEnd } : (d3 = (d3.ownerDocument && d3.ownerDocument.defaultView || window).getSelection(), d3 = { anchorNode: d3.anchorNode, anchorOffset: d3.anchorOffset, focusNode: d3.focusNode, focusOffset: d3.focusOffset }), Se && Ie(Se, d3) || (Se = d3, d3 = oe(Re, "onSelect"), 0 < d3.length && (b3 = new td("onSelect", "select", null, b3, c6), a3.push({ event: b3, listeners: d3 }), b3.target = Qe)));
      }
      function Ve(a3, b3) {
        var c6 = {};
        c6[a3.toLowerCase()] = b3.toLowerCase();
        c6["Webkit" + a3] = "webkit" + b3;
        c6["Moz" + a3] = "moz" + b3;
        return c6;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a3) {
        if (Xe[a3]) return Xe[a3];
        if (!We[a3]) return a3;
        var b3 = We[a3], c6;
        for (c6 in b3) if (b3.hasOwnProperty(c6) && c6 in Ye) return Xe[a3] = b3[c6];
        return a3;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a3, b3) {
        df.set(a3, b3);
        fa(b3, [a3]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a3, b3, c6) {
        var d3 = a3.type || "unknown-event";
        a3.currentTarget = c6;
        Ub(d3, b3, void 0, a3);
        a3.currentTarget = null;
      }
      function se(a3, b3) {
        b3 = 0 !== (b3 & 4);
        for (var c6 = 0; c6 < a3.length; c6++) {
          var d3 = a3[c6], e12 = d3.event;
          d3 = d3.listeners;
          a: {
            var f3 = void 0;
            if (b3) for (var g2 = d3.length - 1; 0 <= g2; g2--) {
              var h3 = d3[g2], k2 = h3.instance, l3 = h3.currentTarget;
              h3 = h3.listener;
              if (k2 !== f3 && e12.isPropagationStopped()) break a;
              nf(e12, h3, l3);
              f3 = k2;
            }
            else for (g2 = 0; g2 < d3.length; g2++) {
              h3 = d3[g2];
              k2 = h3.instance;
              l3 = h3.currentTarget;
              h3 = h3.listener;
              if (k2 !== f3 && e12.isPropagationStopped()) break a;
              nf(e12, h3, l3);
              f3 = k2;
            }
          }
        }
        if (Qb) throw a3 = Rb, Qb = false, Rb = null, a3;
      }
      function D(a3, b3) {
        var c6 = b3[of];
        void 0 === c6 && (c6 = b3[of] = /* @__PURE__ */ new Set());
        var d3 = a3 + "__bubble";
        c6.has(d3) || (pf(b3, a3, 2, false), c6.add(d3));
      }
      function qf(a3, b3, c6) {
        var d3 = 0;
        b3 && (d3 |= 4);
        pf(c6, a3, d3, b3);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a3) {
        if (!a3[rf]) {
          a3[rf] = true;
          da.forEach(function(b4) {
            "selectionchange" !== b4 && (mf.has(b4) || qf(b4, false, a3), qf(b4, true, a3));
          });
          var b3 = 9 === a3.nodeType ? a3 : a3.ownerDocument;
          null === b3 || b3[rf] || (b3[rf] = true, qf("selectionchange", false, b3));
        }
      }
      function pf(a3, b3, c6, d3) {
        switch (jd(b3)) {
          case 1:
            var e12 = ed;
            break;
          case 4:
            e12 = gd;
            break;
          default:
            e12 = fd;
        }
        c6 = e12.bind(null, b3, c6, a3);
        e12 = void 0;
        !Lb || "touchstart" !== b3 && "touchmove" !== b3 && "wheel" !== b3 || (e12 = true);
        d3 ? void 0 !== e12 ? a3.addEventListener(b3, c6, { capture: true, passive: e12 }) : a3.addEventListener(b3, c6, true) : void 0 !== e12 ? a3.addEventListener(b3, c6, { passive: e12 }) : a3.addEventListener(b3, c6, false);
      }
      function hd(a3, b3, c6, d3, e12) {
        var f3 = d3;
        if (0 === (b3 & 1) && 0 === (b3 & 2) && null !== d3) a: for (; ; ) {
          if (null === d3) return;
          var g2 = d3.tag;
          if (3 === g2 || 4 === g2) {
            var h3 = d3.stateNode.containerInfo;
            if (h3 === e12 || 8 === h3.nodeType && h3.parentNode === e12) break;
            if (4 === g2) for (g2 = d3.return; null !== g2; ) {
              var k2 = g2.tag;
              if (3 === k2 || 4 === k2) {
                if (k2 = g2.stateNode.containerInfo, k2 === e12 || 8 === k2.nodeType && k2.parentNode === e12) return;
              }
              g2 = g2.return;
            }
            for (; null !== h3; ) {
              g2 = Wc(h3);
              if (null === g2) return;
              k2 = g2.tag;
              if (5 === k2 || 6 === k2) {
                d3 = f3 = g2;
                continue a;
              }
              h3 = h3.parentNode;
            }
          }
          d3 = d3.return;
        }
        Jb(function() {
          var d4 = f3, e13 = xb(c6), g3 = [];
          a: {
            var h4 = df.get(a3);
            if (void 0 !== h4) {
              var k3 = td, n9 = a3;
              switch (a3) {
                case "keypress":
                  if (0 === od(c6)) break a;
                case "keydown":
                case "keyup":
                  k3 = Rd;
                  break;
                case "focusin":
                  n9 = "focus";
                  k3 = Fd;
                  break;
                case "focusout":
                  n9 = "blur";
                  k3 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k3 = Fd;
                  break;
                case "click":
                  if (2 === c6.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k3 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k3 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k3 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k3 = Hd;
                  break;
                case cf:
                  k3 = Xd;
                  break;
                case "scroll":
                  k3 = vd;
                  break;
                case "wheel":
                  k3 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k3 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k3 = Td;
              }
              var t7 = 0 !== (b3 & 4), J = !t7 && "scroll" === a3, x2 = t7 ? null !== h4 ? h4 + "Capture" : null : h4;
              t7 = [];
              for (var w2 = d4, u5; null !== w2; ) {
                u5 = w2;
                var F = u5.stateNode;
                5 === u5.tag && null !== F && (u5 = F, null !== x2 && (F = Kb(w2, x2), null != F && t7.push(tf(w2, F, u5))));
                if (J) break;
                w2 = w2.return;
              }
              0 < t7.length && (h4 = new k3(h4, n9, null, c6, e13), g3.push({ event: h4, listeners: t7 }));
            }
          }
          if (0 === (b3 & 7)) {
            a: {
              h4 = "mouseover" === a3 || "pointerover" === a3;
              k3 = "mouseout" === a3 || "pointerout" === a3;
              if (h4 && c6 !== wb && (n9 = c6.relatedTarget || c6.fromElement) && (Wc(n9) || n9[uf])) break a;
              if (k3 || h4) {
                h4 = e13.window === e13 ? e13 : (h4 = e13.ownerDocument) ? h4.defaultView || h4.parentWindow : window;
                if (k3) {
                  if (n9 = c6.relatedTarget || c6.toElement, k3 = d4, n9 = n9 ? Wc(n9) : null, null !== n9 && (J = Vb(n9), n9 !== J || 5 !== n9.tag && 6 !== n9.tag)) n9 = null;
                } else k3 = null, n9 = d4;
                if (k3 !== n9) {
                  t7 = Bd;
                  F = "onMouseLeave";
                  x2 = "onMouseEnter";
                  w2 = "mouse";
                  if ("pointerout" === a3 || "pointerover" === a3) t7 = Td, F = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
                  J = null == k3 ? h4 : ue(k3);
                  u5 = null == n9 ? h4 : ue(n9);
                  h4 = new t7(F, w2 + "leave", k3, c6, e13);
                  h4.target = J;
                  h4.relatedTarget = u5;
                  F = null;
                  Wc(e13) === d4 && (t7 = new t7(x2, w2 + "enter", n9, c6, e13), t7.target = u5, t7.relatedTarget = J, F = t7);
                  J = F;
                  if (k3 && n9) b: {
                    t7 = k3;
                    x2 = n9;
                    w2 = 0;
                    for (u5 = t7; u5; u5 = vf(u5)) w2++;
                    u5 = 0;
                    for (F = x2; F; F = vf(F)) u5++;
                    for (; 0 < w2 - u5; ) t7 = vf(t7), w2--;
                    for (; 0 < u5 - w2; ) x2 = vf(x2), u5--;
                    for (; w2--; ) {
                      if (t7 === x2 || null !== x2 && t7 === x2.alternate) break b;
                      t7 = vf(t7);
                      x2 = vf(x2);
                    }
                    t7 = null;
                  }
                  else t7 = null;
                  null !== k3 && wf(g3, h4, k3, t7, false);
                  null !== n9 && null !== J && wf(g3, J, n9, t7, true);
                }
              }
            }
            a: {
              h4 = d4 ? ue(d4) : window;
              k3 = h4.nodeName && h4.nodeName.toLowerCase();
              if ("select" === k3 || "input" === k3 && "file" === h4.type) var na = ve;
              else if (me(h4)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k3 = h4.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h4.type || "radio" === h4.type) && (na = Ee);
              if (na && (na = na(a3, d4))) {
                ne(g3, na, c6, e13);
                break a;
              }
              xa && xa(a3, h4, d4);
              "focusout" === a3 && (xa = h4._wrapperState) && xa.controlled && "number" === h4.type && cb(h4, "number", h4.value);
            }
            xa = d4 ? ue(d4) : window;
            switch (a3) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d4, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g3, c6, e13);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g3, c6, e13);
            }
            var $a;
            if (ae) b: {
              switch (a3) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a3, c6) && (ba = "onCompositionEnd") : "keydown" === a3 && 229 === c6.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c6.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e13, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d4, ba), 0 < xa.length && (ba = new Ld(ba, a3, null, c6, e13), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c6), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a3, c6) : ke(a3, c6)) d4 = oe(d4, "onBeforeInput"), 0 < d4.length && (e13 = new Ld("onBeforeInput", "beforeinput", null, c6, e13), g3.push({ event: e13, listeners: d4 }), e13.data = $a);
          }
          se(g3, b3);
        });
      }
      function tf(a3, b3, c6) {
        return { instance: a3, listener: b3, currentTarget: c6 };
      }
      function oe(a3, b3) {
        for (var c6 = b3 + "Capture", d3 = []; null !== a3; ) {
          var e12 = a3, f3 = e12.stateNode;
          5 === e12.tag && null !== f3 && (e12 = f3, f3 = Kb(a3, c6), null != f3 && d3.unshift(tf(a3, f3, e12)), f3 = Kb(a3, b3), null != f3 && d3.push(tf(a3, f3, e12)));
          a3 = a3.return;
        }
        return d3;
      }
      function vf(a3) {
        if (null === a3) return null;
        do
          a3 = a3.return;
        while (a3 && 5 !== a3.tag);
        return a3 ? a3 : null;
      }
      function wf(a3, b3, c6, d3, e12) {
        for (var f3 = b3._reactName, g2 = []; null !== c6 && c6 !== d3; ) {
          var h3 = c6, k2 = h3.alternate, l3 = h3.stateNode;
          if (null !== k2 && k2 === d3) break;
          5 === h3.tag && null !== l3 && (h3 = l3, e12 ? (k2 = Kb(c6, f3), null != k2 && g2.unshift(tf(c6, k2, h3))) : e12 || (k2 = Kb(c6, f3), null != k2 && g2.push(tf(c6, k2, h3))));
          c6 = c6.return;
        }
        0 !== g2.length && a3.push({ event: b3, listeners: g2 });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a3) {
        return ("string" === typeof a3 ? a3 : "" + a3).replace(xf, "\n").replace(yf, "");
      }
      function Af(a3, b3, c6) {
        b3 = zf(b3);
        if (zf(a3) !== b3 && c6) throw Error(p4(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a3, b3) {
        return "textarea" === a3 || "noscript" === a3 || "string" === typeof b3.children || "number" === typeof b3.children || "object" === typeof b3.dangerouslySetInnerHTML && null !== b3.dangerouslySetInnerHTML && null != b3.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a3) {
        return Hf.resolve(null).then(a3).catch(If);
      } : Ff;
      function If(a3) {
        setTimeout(function() {
          throw a3;
        });
      }
      function Kf(a3, b3) {
        var c6 = b3, d3 = 0;
        do {
          var e12 = c6.nextSibling;
          a3.removeChild(c6);
          if (e12 && 8 === e12.nodeType) if (c6 = e12.data, "/$" === c6) {
            if (0 === d3) {
              a3.removeChild(e12);
              bd(b3);
              return;
            }
            d3--;
          } else "$" !== c6 && "$?" !== c6 && "$!" !== c6 || d3++;
          c6 = e12;
        } while (c6);
        bd(b3);
      }
      function Lf(a3) {
        for (; null != a3; a3 = a3.nextSibling) {
          var b3 = a3.nodeType;
          if (1 === b3 || 3 === b3) break;
          if (8 === b3) {
            b3 = a3.data;
            if ("$" === b3 || "$!" === b3 || "$?" === b3) break;
            if ("/$" === b3) return null;
          }
        }
        return a3;
      }
      function Mf(a3) {
        a3 = a3.previousSibling;
        for (var b3 = 0; a3; ) {
          if (8 === a3.nodeType) {
            var c6 = a3.data;
            if ("$" === c6 || "$!" === c6 || "$?" === c6) {
              if (0 === b3) return a3;
              b3--;
            } else "/$" === c6 && b3++;
          }
          a3 = a3.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a3) {
        var b3 = a3[Of];
        if (b3) return b3;
        for (var c6 = a3.parentNode; c6; ) {
          if (b3 = c6[uf] || c6[Of]) {
            c6 = b3.alternate;
            if (null !== b3.child || null !== c6 && null !== c6.child) for (a3 = Mf(a3); null !== a3; ) {
              if (c6 = a3[Of]) return c6;
              a3 = Mf(a3);
            }
            return b3;
          }
          a3 = c6;
          c6 = a3.parentNode;
        }
        return null;
      }
      function Cb(a3) {
        a3 = a3[Of] || a3[uf];
        return !a3 || 5 !== a3.tag && 6 !== a3.tag && 13 !== a3.tag && 3 !== a3.tag ? null : a3;
      }
      function ue(a3) {
        if (5 === a3.tag || 6 === a3.tag) return a3.stateNode;
        throw Error(p4(33));
      }
      function Db(a3) {
        return a3[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a3) {
        return { current: a3 };
      }
      function E2(a3) {
        0 > Tf || (a3.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a3, b3) {
        Tf++;
        Sf[Tf] = a3.current;
        a3.current = b3;
      }
      var Vf = {};
      var H2 = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a3, b3) {
        var c6 = a3.type.contextTypes;
        if (!c6) return Vf;
        var d3 = a3.stateNode;
        if (d3 && d3.__reactInternalMemoizedUnmaskedChildContext === b3) return d3.__reactInternalMemoizedMaskedChildContext;
        var e12 = {}, f3;
        for (f3 in c6) e12[f3] = b3[f3];
        d3 && (a3 = a3.stateNode, a3.__reactInternalMemoizedUnmaskedChildContext = b3, a3.__reactInternalMemoizedMaskedChildContext = e12);
        return e12;
      }
      function Zf(a3) {
        a3 = a3.childContextTypes;
        return null !== a3 && void 0 !== a3;
      }
      function $f() {
        E2(Wf);
        E2(H2);
      }
      function ag(a3, b3, c6) {
        if (H2.current !== Vf) throw Error(p4(168));
        G(H2, b3);
        G(Wf, c6);
      }
      function bg(a3, b3, c6) {
        var d3 = a3.stateNode;
        b3 = b3.childContextTypes;
        if ("function" !== typeof d3.getChildContext) return c6;
        d3 = d3.getChildContext();
        for (var e12 in d3) if (!(e12 in b3)) throw Error(p4(108, Ra(a3) || "Unknown", e12));
        return A2({}, c6, d3);
      }
      function cg(a3) {
        a3 = (a3 = a3.stateNode) && a3.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H2.current;
        G(H2, a3);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a3, b3, c6) {
        var d3 = a3.stateNode;
        if (!d3) throw Error(p4(169));
        c6 ? (a3 = bg(a3, b3, Xf), d3.__reactInternalMemoizedMergedChildContext = a3, E2(Wf), E2(H2), G(H2, a3)) : E2(Wf);
        G(Wf, c6);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a3) {
        null === eg ? eg = [a3] : eg.push(a3);
      }
      function ig(a3) {
        fg = true;
        hg(a3);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a3 = 0, b3 = C2;
          try {
            var c6 = eg;
            for (C2 = 1; a3 < c6.length; a3++) {
              var d3 = c6[a3];
              do
                d3 = d3(true);
              while (null !== d3);
            }
            eg = null;
            fg = false;
          } catch (e12) {
            throw null !== eg && (eg = eg.slice(a3 + 1)), ac(fc, jg), e12;
          } finally {
            C2 = b3, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a3, b3) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a3;
        ng = b3;
      }
      function ug(a3, b3, c6) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a3;
        var d3 = rg;
        a3 = sg;
        var e12 = 32 - oc(d3) - 1;
        d3 &= ~(1 << e12);
        c6 += 1;
        var f3 = 32 - oc(b3) + e12;
        if (30 < f3) {
          var g2 = e12 - e12 % 5;
          f3 = (d3 & (1 << g2) - 1).toString(32);
          d3 >>= g2;
          e12 -= g2;
          rg = 1 << 32 - oc(b3) + e12 | c6 << e12 | d3;
          sg = f3 + a3;
        } else rg = 1 << f3 | c6 << e12 | d3, sg = a3;
      }
      function vg(a3) {
        null !== a3.return && (tg(a3, 1), ug(a3, 1, 0));
      }
      function wg(a3) {
        for (; a3 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a3 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I2 = false;
      var zg = null;
      function Ag(a3, b3) {
        var c6 = Bg(5, null, null, 0);
        c6.elementType = "DELETED";
        c6.stateNode = b3;
        c6.return = a3;
        b3 = a3.deletions;
        null === b3 ? (a3.deletions = [c6], a3.flags |= 16) : b3.push(c6);
      }
      function Cg(a3, b3) {
        switch (a3.tag) {
          case 5:
            var c6 = a3.type;
            b3 = 1 !== b3.nodeType || c6.toLowerCase() !== b3.nodeName.toLowerCase() ? null : b3;
            return null !== b3 ? (a3.stateNode = b3, xg = a3, yg = Lf(b3.firstChild), true) : false;
          case 6:
            return b3 = "" === a3.pendingProps || 3 !== b3.nodeType ? null : b3, null !== b3 ? (a3.stateNode = b3, xg = a3, yg = null, true) : false;
          case 13:
            return b3 = 8 !== b3.nodeType ? null : b3, null !== b3 ? (c6 = null !== qg ? { id: rg, overflow: sg } : null, a3.memoizedState = { dehydrated: b3, treeContext: c6, retryLane: 1073741824 }, c6 = Bg(18, null, null, 0), c6.stateNode = b3, c6.return = a3, a3.child = c6, xg = a3, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a3) {
        return 0 !== (a3.mode & 1) && 0 === (a3.flags & 128);
      }
      function Eg(a3) {
        if (I2) {
          var b3 = yg;
          if (b3) {
            var c6 = b3;
            if (!Cg(a3, b3)) {
              if (Dg(a3)) throw Error(p4(418));
              b3 = Lf(c6.nextSibling);
              var d3 = xg;
              b3 && Cg(a3, b3) ? Ag(d3, c6) : (a3.flags = a3.flags & -4097 | 2, I2 = false, xg = a3);
            }
          } else {
            if (Dg(a3)) throw Error(p4(418));
            a3.flags = a3.flags & -4097 | 2;
            I2 = false;
            xg = a3;
          }
        }
      }
      function Fg(a3) {
        for (a3 = a3.return; null !== a3 && 5 !== a3.tag && 3 !== a3.tag && 13 !== a3.tag; ) a3 = a3.return;
        xg = a3;
      }
      function Gg(a3) {
        if (a3 !== xg) return false;
        if (!I2) return Fg(a3), I2 = true, false;
        var b3;
        (b3 = 3 !== a3.tag) && !(b3 = 5 !== a3.tag) && (b3 = a3.type, b3 = "head" !== b3 && "body" !== b3 && !Ef(a3.type, a3.memoizedProps));
        if (b3 && (b3 = yg)) {
          if (Dg(a3)) throw Hg(), Error(p4(418));
          for (; b3; ) Ag(a3, b3), b3 = Lf(b3.nextSibling);
        }
        Fg(a3);
        if (13 === a3.tag) {
          a3 = a3.memoizedState;
          a3 = null !== a3 ? a3.dehydrated : null;
          if (!a3) throw Error(p4(317));
          a: {
            a3 = a3.nextSibling;
            for (b3 = 0; a3; ) {
              if (8 === a3.nodeType) {
                var c6 = a3.data;
                if ("/$" === c6) {
                  if (0 === b3) {
                    yg = Lf(a3.nextSibling);
                    break a;
                  }
                  b3--;
                } else "$" !== c6 && "$!" !== c6 && "$?" !== c6 || b3++;
              }
              a3 = a3.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a3.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a3 = yg; a3; ) a3 = Lf(a3.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I2 = false;
      }
      function Jg(a3) {
        null === zg ? zg = [a3] : zg.push(a3);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a3, b3, c6) {
        a3 = c6.ref;
        if (null !== a3 && "function" !== typeof a3 && "object" !== typeof a3) {
          if (c6._owner) {
            c6 = c6._owner;
            if (c6) {
              if (1 !== c6.tag) throw Error(p4(309));
              var d3 = c6.stateNode;
            }
            if (!d3) throw Error(p4(147, a3));
            var e12 = d3, f3 = "" + a3;
            if (null !== b3 && null !== b3.ref && "function" === typeof b3.ref && b3.ref._stringRef === f3) return b3.ref;
            b3 = function(a4) {
              var b4 = e12.refs;
              null === a4 ? delete b4[f3] : b4[f3] = a4;
            };
            b3._stringRef = f3;
            return b3;
          }
          if ("string" !== typeof a3) throw Error(p4(284));
          if (!c6._owner) throw Error(p4(290, a3));
        }
        return a3;
      }
      function Mg(a3, b3) {
        a3 = Object.prototype.toString.call(b3);
        throw Error(p4(31, "[object Object]" === a3 ? "object with keys {" + Object.keys(b3).join(", ") + "}" : a3));
      }
      function Ng(a3) {
        var b3 = a3._init;
        return b3(a3._payload);
      }
      function Og(a3) {
        function b3(b4, c7) {
          if (a3) {
            var d4 = b4.deletions;
            null === d4 ? (b4.deletions = [c7], b4.flags |= 16) : d4.push(c7);
          }
        }
        function c6(c7, d4) {
          if (!a3) return null;
          for (; null !== d4; ) b3(c7, d4), d4 = d4.sibling;
          return null;
        }
        function d3(a4, b4) {
          for (a4 = /* @__PURE__ */ new Map(); null !== b4; ) null !== b4.key ? a4.set(b4.key, b4) : a4.set(b4.index, b4), b4 = b4.sibling;
          return a4;
        }
        function e12(a4, b4) {
          a4 = Pg(a4, b4);
          a4.index = 0;
          a4.sibling = null;
          return a4;
        }
        function f3(b4, c7, d4) {
          b4.index = d4;
          if (!a3) return b4.flags |= 1048576, c7;
          d4 = b4.alternate;
          if (null !== d4) return d4 = d4.index, d4 < c7 ? (b4.flags |= 2, c7) : d4;
          b4.flags |= 2;
          return c7;
        }
        function g2(b4) {
          a3 && null === b4.alternate && (b4.flags |= 2);
          return b4;
        }
        function h3(a4, b4, c7, d4) {
          if (null === b4 || 6 !== b4.tag) return b4 = Qg(c7, a4.mode, d4), b4.return = a4, b4;
          b4 = e12(b4, c7);
          b4.return = a4;
          return b4;
        }
        function k2(a4, b4, c7, d4) {
          var f4 = c7.type;
          if (f4 === ya) return m3(a4, b4, c7.props.children, d4, c7.key);
          if (null !== b4 && (b4.elementType === f4 || "object" === typeof f4 && null !== f4 && f4.$$typeof === Ha && Ng(f4) === b4.type)) return d4 = e12(b4, c7.props), d4.ref = Lg(a4, b4, c7), d4.return = a4, d4;
          d4 = Rg(c7.type, c7.key, c7.props, null, a4.mode, d4);
          d4.ref = Lg(a4, b4, c7);
          d4.return = a4;
          return d4;
        }
        function l3(a4, b4, c7, d4) {
          if (null === b4 || 4 !== b4.tag || b4.stateNode.containerInfo !== c7.containerInfo || b4.stateNode.implementation !== c7.implementation) return b4 = Sg(c7, a4.mode, d4), b4.return = a4, b4;
          b4 = e12(b4, c7.children || []);
          b4.return = a4;
          return b4;
        }
        function m3(a4, b4, c7, d4, f4) {
          if (null === b4 || 7 !== b4.tag) return b4 = Tg(c7, a4.mode, d4, f4), b4.return = a4, b4;
          b4 = e12(b4, c7);
          b4.return = a4;
          return b4;
        }
        function q(a4, b4, c7) {
          if ("string" === typeof b4 && "" !== b4 || "number" === typeof b4) return b4 = Qg("" + b4, a4.mode, c7), b4.return = a4, b4;
          if ("object" === typeof b4 && null !== b4) {
            switch (b4.$$typeof) {
              case va:
                return c7 = Rg(b4.type, b4.key, b4.props, null, a4.mode, c7), c7.ref = Lg(a4, null, b4), c7.return = a4, c7;
              case wa:
                return b4 = Sg(b4, a4.mode, c7), b4.return = a4, b4;
              case Ha:
                var d4 = b4._init;
                return q(a4, d4(b4._payload), c7);
            }
            if (eb(b4) || Ka(b4)) return b4 = Tg(b4, a4.mode, c7, null), b4.return = a4, b4;
            Mg(a4, b4);
          }
          return null;
        }
        function r8(a4, b4, c7, d4) {
          var e13 = null !== b4 ? b4.key : null;
          if ("string" === typeof c7 && "" !== c7 || "number" === typeof c7) return null !== e13 ? null : h3(a4, b4, "" + c7, d4);
          if ("object" === typeof c7 && null !== c7) {
            switch (c7.$$typeof) {
              case va:
                return c7.key === e13 ? k2(a4, b4, c7, d4) : null;
              case wa:
                return c7.key === e13 ? l3(a4, b4, c7, d4) : null;
              case Ha:
                return e13 = c7._init, r8(
                  a4,
                  b4,
                  e13(c7._payload),
                  d4
                );
            }
            if (eb(c7) || Ka(c7)) return null !== e13 ? null : m3(a4, b4, c7, d4, null);
            Mg(a4, c7);
          }
          return null;
        }
        function y3(a4, b4, c7, d4, e13) {
          if ("string" === typeof d4 && "" !== d4 || "number" === typeof d4) return a4 = a4.get(c7) || null, h3(b4, a4, "" + d4, e13);
          if ("object" === typeof d4 && null !== d4) {
            switch (d4.$$typeof) {
              case va:
                return a4 = a4.get(null === d4.key ? c7 : d4.key) || null, k2(b4, a4, d4, e13);
              case wa:
                return a4 = a4.get(null === d4.key ? c7 : d4.key) || null, l3(b4, a4, d4, e13);
              case Ha:
                var f4 = d4._init;
                return y3(a4, b4, c7, f4(d4._payload), e13);
            }
            if (eb(d4) || Ka(d4)) return a4 = a4.get(c7) || null, m3(b4, a4, d4, e13, null);
            Mg(b4, d4);
          }
          return null;
        }
        function n9(e13, g3, h4, k3) {
          for (var l4 = null, m4 = null, u5 = g3, w2 = g3 = 0, x2 = null; null !== u5 && w2 < h4.length; w2++) {
            u5.index > w2 ? (x2 = u5, u5 = null) : x2 = u5.sibling;
            var n10 = r8(e13, u5, h4[w2], k3);
            if (null === n10) {
              null === u5 && (u5 = x2);
              break;
            }
            a3 && u5 && null === n10.alternate && b3(e13, u5);
            g3 = f3(n10, g3, w2);
            null === m4 ? l4 = n10 : m4.sibling = n10;
            m4 = n10;
            u5 = x2;
          }
          if (w2 === h4.length) return c6(e13, u5), I2 && tg(e13, w2), l4;
          if (null === u5) {
            for (; w2 < h4.length; w2++) u5 = q(e13, h4[w2], k3), null !== u5 && (g3 = f3(u5, g3, w2), null === m4 ? l4 = u5 : m4.sibling = u5, m4 = u5);
            I2 && tg(e13, w2);
            return l4;
          }
          for (u5 = d3(e13, u5); w2 < h4.length; w2++) x2 = y3(u5, e13, w2, h4[w2], k3), null !== x2 && (a3 && null !== x2.alternate && u5.delete(null === x2.key ? w2 : x2.key), g3 = f3(x2, g3, w2), null === m4 ? l4 = x2 : m4.sibling = x2, m4 = x2);
          a3 && u5.forEach(function(a4) {
            return b3(e13, a4);
          });
          I2 && tg(e13, w2);
          return l4;
        }
        function t7(e13, g3, h4, k3) {
          var l4 = Ka(h4);
          if ("function" !== typeof l4) throw Error(p4(150));
          h4 = l4.call(h4);
          if (null == h4) throw Error(p4(151));
          for (var u5 = l4 = null, m4 = g3, w2 = g3 = 0, x2 = null, n10 = h4.next(); null !== m4 && !n10.done; w2++, n10 = h4.next()) {
            m4.index > w2 ? (x2 = m4, m4 = null) : x2 = m4.sibling;
            var t8 = r8(e13, m4, n10.value, k3);
            if (null === t8) {
              null === m4 && (m4 = x2);
              break;
            }
            a3 && m4 && null === t8.alternate && b3(e13, m4);
            g3 = f3(t8, g3, w2);
            null === u5 ? l4 = t8 : u5.sibling = t8;
            u5 = t8;
            m4 = x2;
          }
          if (n10.done) return c6(
            e13,
            m4
          ), I2 && tg(e13, w2), l4;
          if (null === m4) {
            for (; !n10.done; w2++, n10 = h4.next()) n10 = q(e13, n10.value, k3), null !== n10 && (g3 = f3(n10, g3, w2), null === u5 ? l4 = n10 : u5.sibling = n10, u5 = n10);
            I2 && tg(e13, w2);
            return l4;
          }
          for (m4 = d3(e13, m4); !n10.done; w2++, n10 = h4.next()) n10 = y3(m4, e13, w2, n10.value, k3), null !== n10 && (a3 && null !== n10.alternate && m4.delete(null === n10.key ? w2 : n10.key), g3 = f3(n10, g3, w2), null === u5 ? l4 = n10 : u5.sibling = n10, u5 = n10);
          a3 && m4.forEach(function(a4) {
            return b3(e13, a4);
          });
          I2 && tg(e13, w2);
          return l4;
        }
        function J(a4, d4, f4, h4) {
          "object" === typeof f4 && null !== f4 && f4.type === ya && null === f4.key && (f4 = f4.props.children);
          if ("object" === typeof f4 && null !== f4) {
            switch (f4.$$typeof) {
              case va:
                a: {
                  for (var k3 = f4.key, l4 = d4; null !== l4; ) {
                    if (l4.key === k3) {
                      k3 = f4.type;
                      if (k3 === ya) {
                        if (7 === l4.tag) {
                          c6(a4, l4.sibling);
                          d4 = e12(l4, f4.props.children);
                          d4.return = a4;
                          a4 = d4;
                          break a;
                        }
                      } else if (l4.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l4.type) {
                        c6(a4, l4.sibling);
                        d4 = e12(l4, f4.props);
                        d4.ref = Lg(a4, l4, f4);
                        d4.return = a4;
                        a4 = d4;
                        break a;
                      }
                      c6(a4, l4);
                      break;
                    } else b3(a4, l4);
                    l4 = l4.sibling;
                  }
                  f4.type === ya ? (d4 = Tg(f4.props.children, a4.mode, h4, f4.key), d4.return = a4, a4 = d4) : (h4 = Rg(f4.type, f4.key, f4.props, null, a4.mode, h4), h4.ref = Lg(a4, d4, f4), h4.return = a4, a4 = h4);
                }
                return g2(a4);
              case wa:
                a: {
                  for (l4 = f4.key; null !== d4; ) {
                    if (d4.key === l4) if (4 === d4.tag && d4.stateNode.containerInfo === f4.containerInfo && d4.stateNode.implementation === f4.implementation) {
                      c6(a4, d4.sibling);
                      d4 = e12(d4, f4.children || []);
                      d4.return = a4;
                      a4 = d4;
                      break a;
                    } else {
                      c6(a4, d4);
                      break;
                    }
                    else b3(a4, d4);
                    d4 = d4.sibling;
                  }
                  d4 = Sg(f4, a4.mode, h4);
                  d4.return = a4;
                  a4 = d4;
                }
                return g2(a4);
              case Ha:
                return l4 = f4._init, J(a4, d4, l4(f4._payload), h4);
            }
            if (eb(f4)) return n9(a4, d4, f4, h4);
            if (Ka(f4)) return t7(a4, d4, f4, h4);
            Mg(a4, f4);
          }
          return "string" === typeof f4 && "" !== f4 || "number" === typeof f4 ? (f4 = "" + f4, null !== d4 && 6 === d4.tag ? (c6(a4, d4.sibling), d4 = e12(d4, f4), d4.return = a4, a4 = d4) : (c6(a4, d4), d4 = Qg(f4, a4.mode, h4), d4.return = a4, a4 = d4), g2(a4)) : c6(a4, d4);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a3) {
        var b3 = Wg.current;
        E2(Wg);
        a3._currentValue = b3;
      }
      function bh(a3, b3, c6) {
        for (; null !== a3; ) {
          var d3 = a3.alternate;
          (a3.childLanes & b3) !== b3 ? (a3.childLanes |= b3, null !== d3 && (d3.childLanes |= b3)) : null !== d3 && (d3.childLanes & b3) !== b3 && (d3.childLanes |= b3);
          if (a3 === c6) break;
          a3 = a3.return;
        }
      }
      function ch(a3, b3) {
        Xg = a3;
        Zg = Yg = null;
        a3 = a3.dependencies;
        null !== a3 && null !== a3.firstContext && (0 !== (a3.lanes & b3) && (dh = true), a3.firstContext = null);
      }
      function eh(a3) {
        var b3 = a3._currentValue;
        if (Zg !== a3) if (a3 = { context: a3, memoizedValue: b3, next: null }, null === Yg) {
          if (null === Xg) throw Error(p4(308));
          Yg = a3;
          Xg.dependencies = { lanes: 0, firstContext: a3 };
        } else Yg = Yg.next = a3;
        return b3;
      }
      var fh = null;
      function gh(a3) {
        null === fh ? fh = [a3] : fh.push(a3);
      }
      function hh(a3, b3, c6, d3) {
        var e12 = b3.interleaved;
        null === e12 ? (c6.next = c6, gh(b3)) : (c6.next = e12.next, e12.next = c6);
        b3.interleaved = c6;
        return ih(a3, d3);
      }
      function ih(a3, b3) {
        a3.lanes |= b3;
        var c6 = a3.alternate;
        null !== c6 && (c6.lanes |= b3);
        c6 = a3;
        for (a3 = a3.return; null !== a3; ) a3.childLanes |= b3, c6 = a3.alternate, null !== c6 && (c6.childLanes |= b3), c6 = a3, a3 = a3.return;
        return 3 === c6.tag ? c6.stateNode : null;
      }
      var jh = false;
      function kh(a3) {
        a3.updateQueue = { baseState: a3.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a3, b3) {
        a3 = a3.updateQueue;
        b3.updateQueue === a3 && (b3.updateQueue = { baseState: a3.baseState, firstBaseUpdate: a3.firstBaseUpdate, lastBaseUpdate: a3.lastBaseUpdate, shared: a3.shared, effects: a3.effects });
      }
      function mh(a3, b3) {
        return { eventTime: a3, lane: b3, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a3, b3, c6) {
        var d3 = a3.updateQueue;
        if (null === d3) return null;
        d3 = d3.shared;
        if (0 !== (K & 2)) {
          var e12 = d3.pending;
          null === e12 ? b3.next = b3 : (b3.next = e12.next, e12.next = b3);
          d3.pending = b3;
          return ih(a3, c6);
        }
        e12 = d3.interleaved;
        null === e12 ? (b3.next = b3, gh(d3)) : (b3.next = e12.next, e12.next = b3);
        d3.interleaved = b3;
        return ih(a3, c6);
      }
      function oh(a3, b3, c6) {
        b3 = b3.updateQueue;
        if (null !== b3 && (b3 = b3.shared, 0 !== (c6 & 4194240))) {
          var d3 = b3.lanes;
          d3 &= a3.pendingLanes;
          c6 |= d3;
          b3.lanes = c6;
          Cc(a3, c6);
        }
      }
      function ph(a3, b3) {
        var c6 = a3.updateQueue, d3 = a3.alternate;
        if (null !== d3 && (d3 = d3.updateQueue, c6 === d3)) {
          var e12 = null, f3 = null;
          c6 = c6.firstBaseUpdate;
          if (null !== c6) {
            do {
              var g2 = { eventTime: c6.eventTime, lane: c6.lane, tag: c6.tag, payload: c6.payload, callback: c6.callback, next: null };
              null === f3 ? e12 = f3 = g2 : f3 = f3.next = g2;
              c6 = c6.next;
            } while (null !== c6);
            null === f3 ? e12 = f3 = b3 : f3 = f3.next = b3;
          } else e12 = f3 = b3;
          c6 = { baseState: d3.baseState, firstBaseUpdate: e12, lastBaseUpdate: f3, shared: d3.shared, effects: d3.effects };
          a3.updateQueue = c6;
          return;
        }
        a3 = c6.lastBaseUpdate;
        null === a3 ? c6.firstBaseUpdate = b3 : a3.next = b3;
        c6.lastBaseUpdate = b3;
      }
      function qh(a3, b3, c6, d3) {
        var e12 = a3.updateQueue;
        jh = false;
        var f3 = e12.firstBaseUpdate, g2 = e12.lastBaseUpdate, h3 = e12.shared.pending;
        if (null !== h3) {
          e12.shared.pending = null;
          var k2 = h3, l3 = k2.next;
          k2.next = null;
          null === g2 ? f3 = l3 : g2.next = l3;
          g2 = k2;
          var m3 = a3.alternate;
          null !== m3 && (m3 = m3.updateQueue, h3 = m3.lastBaseUpdate, h3 !== g2 && (null === h3 ? m3.firstBaseUpdate = l3 : h3.next = l3, m3.lastBaseUpdate = k2));
        }
        if (null !== f3) {
          var q = e12.baseState;
          g2 = 0;
          m3 = l3 = k2 = null;
          h3 = f3;
          do {
            var r8 = h3.lane, y3 = h3.eventTime;
            if ((d3 & r8) === r8) {
              null !== m3 && (m3 = m3.next = {
                eventTime: y3,
                lane: 0,
                tag: h3.tag,
                payload: h3.payload,
                callback: h3.callback,
                next: null
              });
              a: {
                var n9 = a3, t7 = h3;
                r8 = b3;
                y3 = c6;
                switch (t7.tag) {
                  case 1:
                    n9 = t7.payload;
                    if ("function" === typeof n9) {
                      q = n9.call(y3, q, r8);
                      break a;
                    }
                    q = n9;
                    break a;
                  case 3:
                    n9.flags = n9.flags & -65537 | 128;
                  case 0:
                    n9 = t7.payload;
                    r8 = "function" === typeof n9 ? n9.call(y3, q, r8) : n9;
                    if (null === r8 || void 0 === r8) break a;
                    q = A2({}, q, r8);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h3.callback && 0 !== h3.lane && (a3.flags |= 64, r8 = e12.effects, null === r8 ? e12.effects = [h3] : r8.push(h3));
            } else y3 = { eventTime: y3, lane: r8, tag: h3.tag, payload: h3.payload, callback: h3.callback, next: null }, null === m3 ? (l3 = m3 = y3, k2 = q) : m3 = m3.next = y3, g2 |= r8;
            h3 = h3.next;
            if (null === h3) if (h3 = e12.shared.pending, null === h3) break;
            else r8 = h3, h3 = r8.next, r8.next = null, e12.lastBaseUpdate = r8, e12.shared.pending = null;
          } while (1);
          null === m3 && (k2 = q);
          e12.baseState = k2;
          e12.firstBaseUpdate = l3;
          e12.lastBaseUpdate = m3;
          b3 = e12.shared.interleaved;
          if (null !== b3) {
            e12 = b3;
            do
              g2 |= e12.lane, e12 = e12.next;
            while (e12 !== b3);
          } else null === f3 && (e12.shared.lanes = 0);
          rh |= g2;
          a3.lanes = g2;
          a3.memoizedState = q;
        }
      }
      function sh(a3, b3, c6) {
        a3 = b3.effects;
        b3.effects = null;
        if (null !== a3) for (b3 = 0; b3 < a3.length; b3++) {
          var d3 = a3[b3], e12 = d3.callback;
          if (null !== e12) {
            d3.callback = null;
            d3 = c6;
            if ("function" !== typeof e12) throw Error(p4(191, e12));
            e12.call(d3);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a3) {
        if (a3 === th) throw Error(p4(174));
        return a3;
      }
      function yh(a3, b3) {
        G(wh, b3);
        G(vh, a3);
        G(uh, th);
        a3 = b3.nodeType;
        switch (a3) {
          case 9:
          case 11:
            b3 = (b3 = b3.documentElement) ? b3.namespaceURI : lb(null, "");
            break;
          default:
            a3 = 8 === a3 ? b3.parentNode : b3, b3 = a3.namespaceURI || null, a3 = a3.tagName, b3 = lb(b3, a3);
        }
        E2(uh);
        G(uh, b3);
      }
      function zh() {
        E2(uh);
        E2(vh);
        E2(wh);
      }
      function Ah(a3) {
        xh(wh.current);
        var b3 = xh(uh.current);
        var c6 = lb(b3, a3.type);
        b3 !== c6 && (G(vh, a3), G(uh, c6));
      }
      function Bh(a3) {
        vh.current === a3 && (E2(uh), E2(vh));
      }
      var L2 = Uf(0);
      function Ch(a3) {
        for (var b3 = a3; null !== b3; ) {
          if (13 === b3.tag) {
            var c6 = b3.memoizedState;
            if (null !== c6 && (c6 = c6.dehydrated, null === c6 || "$?" === c6.data || "$!" === c6.data)) return b3;
          } else if (19 === b3.tag && void 0 !== b3.memoizedProps.revealOrder) {
            if (0 !== (b3.flags & 128)) return b3;
          } else if (null !== b3.child) {
            b3.child.return = b3;
            b3 = b3.child;
            continue;
          }
          if (b3 === a3) break;
          for (; null === b3.sibling; ) {
            if (null === b3.return || b3.return === a3) return null;
            b3 = b3.return;
          }
          b3.sibling.return = b3.return;
          b3 = b3.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a3 = 0; a3 < Dh.length; a3++) Dh[a3]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M3 = null;
      var N2 = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P2() {
        throw Error(p4(321));
      }
      function Mh(a3, b3) {
        if (null === b3) return false;
        for (var c6 = 0; c6 < b3.length && c6 < a3.length; c6++) if (!He(a3[c6], b3[c6])) return false;
        return true;
      }
      function Nh(a3, b3, c6, d3, e12, f3) {
        Hh = f3;
        M3 = b3;
        b3.memoizedState = null;
        b3.updateQueue = null;
        b3.lanes = 0;
        Fh.current = null === a3 || null === a3.memoizedState ? Oh : Ph;
        a3 = c6(d3, e12);
        if (Jh) {
          f3 = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f3) throw Error(p4(301));
            f3 += 1;
            O = N2 = null;
            b3.updateQueue = null;
            Fh.current = Qh;
            a3 = c6(d3, e12);
          } while (Jh);
        }
        Fh.current = Rh;
        b3 = null !== N2 && null !== N2.next;
        Hh = 0;
        O = N2 = M3 = null;
        Ih = false;
        if (b3) throw Error(p4(300));
        return a3;
      }
      function Sh() {
        var a3 = 0 !== Kh;
        Kh = 0;
        return a3;
      }
      function Th() {
        var a3 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M3.memoizedState = O = a3 : O = O.next = a3;
        return O;
      }
      function Uh() {
        if (null === N2) {
          var a3 = M3.alternate;
          a3 = null !== a3 ? a3.memoizedState : null;
        } else a3 = N2.next;
        var b3 = null === O ? M3.memoizedState : O.next;
        if (null !== b3) O = b3, N2 = a3;
        else {
          if (null === a3) throw Error(p4(310));
          N2 = a3;
          a3 = { memoizedState: N2.memoizedState, baseState: N2.baseState, baseQueue: N2.baseQueue, queue: N2.queue, next: null };
          null === O ? M3.memoizedState = O = a3 : O = O.next = a3;
        }
        return O;
      }
      function Vh(a3, b3) {
        return "function" === typeof b3 ? b3(a3) : b3;
      }
      function Wh(a3) {
        var b3 = Uh(), c6 = b3.queue;
        if (null === c6) throw Error(p4(311));
        c6.lastRenderedReducer = a3;
        var d3 = N2, e12 = d3.baseQueue, f3 = c6.pending;
        if (null !== f3) {
          if (null !== e12) {
            var g2 = e12.next;
            e12.next = f3.next;
            f3.next = g2;
          }
          d3.baseQueue = e12 = f3;
          c6.pending = null;
        }
        if (null !== e12) {
          f3 = e12.next;
          d3 = d3.baseState;
          var h3 = g2 = null, k2 = null, l3 = f3;
          do {
            var m3 = l3.lane;
            if ((Hh & m3) === m3) null !== k2 && (k2 = k2.next = { lane: 0, action: l3.action, hasEagerState: l3.hasEagerState, eagerState: l3.eagerState, next: null }), d3 = l3.hasEagerState ? l3.eagerState : a3(d3, l3.action);
            else {
              var q = {
                lane: m3,
                action: l3.action,
                hasEagerState: l3.hasEagerState,
                eagerState: l3.eagerState,
                next: null
              };
              null === k2 ? (h3 = k2 = q, g2 = d3) : k2 = k2.next = q;
              M3.lanes |= m3;
              rh |= m3;
            }
            l3 = l3.next;
          } while (null !== l3 && l3 !== f3);
          null === k2 ? g2 = d3 : k2.next = h3;
          He(d3, b3.memoizedState) || (dh = true);
          b3.memoizedState = d3;
          b3.baseState = g2;
          b3.baseQueue = k2;
          c6.lastRenderedState = d3;
        }
        a3 = c6.interleaved;
        if (null !== a3) {
          e12 = a3;
          do
            f3 = e12.lane, M3.lanes |= f3, rh |= f3, e12 = e12.next;
          while (e12 !== a3);
        } else null === e12 && (c6.lanes = 0);
        return [b3.memoizedState, c6.dispatch];
      }
      function Xh(a3) {
        var b3 = Uh(), c6 = b3.queue;
        if (null === c6) throw Error(p4(311));
        c6.lastRenderedReducer = a3;
        var d3 = c6.dispatch, e12 = c6.pending, f3 = b3.memoizedState;
        if (null !== e12) {
          c6.pending = null;
          var g2 = e12 = e12.next;
          do
            f3 = a3(f3, g2.action), g2 = g2.next;
          while (g2 !== e12);
          He(f3, b3.memoizedState) || (dh = true);
          b3.memoizedState = f3;
          null === b3.baseQueue && (b3.baseState = f3);
          c6.lastRenderedState = f3;
        }
        return [f3, d3];
      }
      function Yh() {
      }
      function Zh(a3, b3) {
        var c6 = M3, d3 = Uh(), e12 = b3(), f3 = !He(d3.memoizedState, e12);
        f3 && (d3.memoizedState = e12, dh = true);
        d3 = d3.queue;
        $h(ai.bind(null, c6, d3, a3), [a3]);
        if (d3.getSnapshot !== b3 || f3 || null !== O && O.memoizedState.tag & 1) {
          c6.flags |= 2048;
          bi(9, ci.bind(null, c6, d3, e12, b3), void 0, null);
          if (null === Q) throw Error(p4(349));
          0 !== (Hh & 30) || di(c6, b3, e12);
        }
        return e12;
      }
      function di(a3, b3, c6) {
        a3.flags |= 16384;
        a3 = { getSnapshot: b3, value: c6 };
        b3 = M3.updateQueue;
        null === b3 ? (b3 = { lastEffect: null, stores: null }, M3.updateQueue = b3, b3.stores = [a3]) : (c6 = b3.stores, null === c6 ? b3.stores = [a3] : c6.push(a3));
      }
      function ci(a3, b3, c6, d3) {
        b3.value = c6;
        b3.getSnapshot = d3;
        ei(b3) && fi(a3);
      }
      function ai(a3, b3, c6) {
        return c6(function() {
          ei(b3) && fi(a3);
        });
      }
      function ei(a3) {
        var b3 = a3.getSnapshot;
        a3 = a3.value;
        try {
          var c6 = b3();
          return !He(a3, c6);
        } catch (d3) {
          return true;
        }
      }
      function fi(a3) {
        var b3 = ih(a3, 1);
        null !== b3 && gi(b3, a3, 1, -1);
      }
      function hi(a3) {
        var b3 = Th();
        "function" === typeof a3 && (a3 = a3());
        b3.memoizedState = b3.baseState = a3;
        a3 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a3 };
        b3.queue = a3;
        a3 = a3.dispatch = ii.bind(null, M3, a3);
        return [b3.memoizedState, a3];
      }
      function bi(a3, b3, c6, d3) {
        a3 = { tag: a3, create: b3, destroy: c6, deps: d3, next: null };
        b3 = M3.updateQueue;
        null === b3 ? (b3 = { lastEffect: null, stores: null }, M3.updateQueue = b3, b3.lastEffect = a3.next = a3) : (c6 = b3.lastEffect, null === c6 ? b3.lastEffect = a3.next = a3 : (d3 = c6.next, c6.next = a3, a3.next = d3, b3.lastEffect = a3));
        return a3;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a3, b3, c6, d3) {
        var e12 = Th();
        M3.flags |= a3;
        e12.memoizedState = bi(1 | b3, c6, void 0, void 0 === d3 ? null : d3);
      }
      function li(a3, b3, c6, d3) {
        var e12 = Uh();
        d3 = void 0 === d3 ? null : d3;
        var f3 = void 0;
        if (null !== N2) {
          var g2 = N2.memoizedState;
          f3 = g2.destroy;
          if (null !== d3 && Mh(d3, g2.deps)) {
            e12.memoizedState = bi(b3, c6, f3, d3);
            return;
          }
        }
        M3.flags |= a3;
        e12.memoizedState = bi(1 | b3, c6, f3, d3);
      }
      function mi(a3, b3) {
        return ki(8390656, 8, a3, b3);
      }
      function $h(a3, b3) {
        return li(2048, 8, a3, b3);
      }
      function ni(a3, b3) {
        return li(4, 2, a3, b3);
      }
      function oi(a3, b3) {
        return li(4, 4, a3, b3);
      }
      function pi(a3, b3) {
        if ("function" === typeof b3) return a3 = a3(), b3(a3), function() {
          b3(null);
        };
        if (null !== b3 && void 0 !== b3) return a3 = a3(), b3.current = a3, function() {
          b3.current = null;
        };
      }
      function qi(a3, b3, c6) {
        c6 = null !== c6 && void 0 !== c6 ? c6.concat([a3]) : null;
        return li(4, 4, pi.bind(null, b3, a3), c6);
      }
      function ri() {
      }
      function si(a3, b3) {
        var c6 = Uh();
        b3 = void 0 === b3 ? null : b3;
        var d3 = c6.memoizedState;
        if (null !== d3 && null !== b3 && Mh(b3, d3[1])) return d3[0];
        c6.memoizedState = [a3, b3];
        return a3;
      }
      function ti(a3, b3) {
        var c6 = Uh();
        b3 = void 0 === b3 ? null : b3;
        var d3 = c6.memoizedState;
        if (null !== d3 && null !== b3 && Mh(b3, d3[1])) return d3[0];
        a3 = a3();
        c6.memoizedState = [a3, b3];
        return a3;
      }
      function ui(a3, b3, c6) {
        if (0 === (Hh & 21)) return a3.baseState && (a3.baseState = false, dh = true), a3.memoizedState = c6;
        He(c6, b3) || (c6 = yc(), M3.lanes |= c6, rh |= c6, a3.baseState = true);
        return b3;
      }
      function vi(a3, b3) {
        var c6 = C2;
        C2 = 0 !== c6 && 4 > c6 ? c6 : 4;
        a3(true);
        var d3 = Gh.transition;
        Gh.transition = {};
        try {
          a3(false), b3();
        } finally {
          C2 = c6, Gh.transition = d3;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a3, b3, c6) {
        var d3 = yi(a3);
        c6 = { lane: d3, action: c6, hasEagerState: false, eagerState: null, next: null };
        if (zi(a3)) Ai(b3, c6);
        else if (c6 = hh(a3, b3, c6, d3), null !== c6) {
          var e12 = R2();
          gi(c6, a3, d3, e12);
          Bi(c6, b3, d3);
        }
      }
      function ii(a3, b3, c6) {
        var d3 = yi(a3), e12 = { lane: d3, action: c6, hasEagerState: false, eagerState: null, next: null };
        if (zi(a3)) Ai(b3, e12);
        else {
          var f3 = a3.alternate;
          if (0 === a3.lanes && (null === f3 || 0 === f3.lanes) && (f3 = b3.lastRenderedReducer, null !== f3)) try {
            var g2 = b3.lastRenderedState, h3 = f3(g2, c6);
            e12.hasEagerState = true;
            e12.eagerState = h3;
            if (He(h3, g2)) {
              var k2 = b3.interleaved;
              null === k2 ? (e12.next = e12, gh(b3)) : (e12.next = k2.next, k2.next = e12);
              b3.interleaved = e12;
              return;
            }
          } catch (l3) {
          } finally {
          }
          c6 = hh(a3, b3, e12, d3);
          null !== c6 && (e12 = R2(), gi(c6, a3, d3, e12), Bi(c6, b3, d3));
        }
      }
      function zi(a3) {
        var b3 = a3.alternate;
        return a3 === M3 || null !== b3 && b3 === M3;
      }
      function Ai(a3, b3) {
        Jh = Ih = true;
        var c6 = a3.pending;
        null === c6 ? b3.next = b3 : (b3.next = c6.next, c6.next = b3);
        a3.pending = b3;
      }
      function Bi(a3, b3, c6) {
        if (0 !== (c6 & 4194240)) {
          var d3 = b3.lanes;
          d3 &= a3.pendingLanes;
          c6 |= d3;
          b3.lanes = c6;
          Cc(a3, c6);
        }
      }
      var Rh = { readContext: eh, useCallback: P2, useContext: P2, useEffect: P2, useImperativeHandle: P2, useInsertionEffect: P2, useLayoutEffect: P2, useMemo: P2, useReducer: P2, useRef: P2, useState: P2, useDebugValue: P2, useDeferredValue: P2, useTransition: P2, useMutableSource: P2, useSyncExternalStore: P2, useId: P2, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a3, b3) {
        Th().memoizedState = [a3, void 0 === b3 ? null : b3];
        return a3;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a3, b3, c6) {
        c6 = null !== c6 && void 0 !== c6 ? c6.concat([a3]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b3, a3),
          c6
        );
      }, useLayoutEffect: function(a3, b3) {
        return ki(4194308, 4, a3, b3);
      }, useInsertionEffect: function(a3, b3) {
        return ki(4, 2, a3, b3);
      }, useMemo: function(a3, b3) {
        var c6 = Th();
        b3 = void 0 === b3 ? null : b3;
        a3 = a3();
        c6.memoizedState = [a3, b3];
        return a3;
      }, useReducer: function(a3, b3, c6) {
        var d3 = Th();
        b3 = void 0 !== c6 ? c6(b3) : b3;
        d3.memoizedState = d3.baseState = b3;
        a3 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a3, lastRenderedState: b3 };
        d3.queue = a3;
        a3 = a3.dispatch = xi.bind(null, M3, a3);
        return [d3.memoizedState, a3];
      }, useRef: function(a3) {
        var b3 = Th();
        a3 = { current: a3 };
        return b3.memoizedState = a3;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a3) {
        return Th().memoizedState = a3;
      }, useTransition: function() {
        var a3 = hi(false), b3 = a3[0];
        a3 = vi.bind(null, a3[1]);
        Th().memoizedState = a3;
        return [b3, a3];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a3, b3, c6) {
        var d3 = M3, e12 = Th();
        if (I2) {
          if (void 0 === c6) throw Error(p4(407));
          c6 = c6();
        } else {
          c6 = b3();
          if (null === Q) throw Error(p4(349));
          0 !== (Hh & 30) || di(d3, b3, c6);
        }
        e12.memoizedState = c6;
        var f3 = { value: c6, getSnapshot: b3 };
        e12.queue = f3;
        mi(ai.bind(
          null,
          d3,
          f3,
          a3
        ), [a3]);
        d3.flags |= 2048;
        bi(9, ci.bind(null, d3, f3, c6, b3), void 0, null);
        return c6;
      }, useId: function() {
        var a3 = Th(), b3 = Q.identifierPrefix;
        if (I2) {
          var c6 = sg;
          var d3 = rg;
          c6 = (d3 & ~(1 << 32 - oc(d3) - 1)).toString(32) + c6;
          b3 = ":" + b3 + "R" + c6;
          c6 = Kh++;
          0 < c6 && (b3 += "H" + c6.toString(32));
          b3 += ":";
        } else c6 = Lh++, b3 = ":" + b3 + "r" + c6.toString(32) + ":";
        return a3.memoizedState = b3;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a3) {
          var b3 = Uh();
          return ui(b3, N2.memoizedState, a3);
        },
        useTransition: function() {
          var a3 = Wh(Vh)[0], b3 = Uh().memoizedState;
          return [a3, b3];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a3) {
        var b3 = Uh();
        return null === N2 ? b3.memoizedState = a3 : ui(b3, N2.memoizedState, a3);
      }, useTransition: function() {
        var a3 = Xh(Vh)[0], b3 = Uh().memoizedState;
        return [a3, b3];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a3, b3) {
        if (a3 && a3.defaultProps) {
          b3 = A2({}, b3);
          a3 = a3.defaultProps;
          for (var c6 in a3) void 0 === b3[c6] && (b3[c6] = a3[c6]);
          return b3;
        }
        return b3;
      }
      function Di(a3, b3, c6, d3) {
        b3 = a3.memoizedState;
        c6 = c6(d3, b3);
        c6 = null === c6 || void 0 === c6 ? b3 : A2({}, b3, c6);
        a3.memoizedState = c6;
        0 === a3.lanes && (a3.updateQueue.baseState = c6);
      }
      var Ei = { isMounted: function(a3) {
        return (a3 = a3._reactInternals) ? Vb(a3) === a3 : false;
      }, enqueueSetState: function(a3, b3, c6) {
        a3 = a3._reactInternals;
        var d3 = R2(), e12 = yi(a3), f3 = mh(d3, e12);
        f3.payload = b3;
        void 0 !== c6 && null !== c6 && (f3.callback = c6);
        b3 = nh(a3, f3, e12);
        null !== b3 && (gi(b3, a3, e12, d3), oh(b3, a3, e12));
      }, enqueueReplaceState: function(a3, b3, c6) {
        a3 = a3._reactInternals;
        var d3 = R2(), e12 = yi(a3), f3 = mh(d3, e12);
        f3.tag = 1;
        f3.payload = b3;
        void 0 !== c6 && null !== c6 && (f3.callback = c6);
        b3 = nh(a3, f3, e12);
        null !== b3 && (gi(b3, a3, e12, d3), oh(b3, a3, e12));
      }, enqueueForceUpdate: function(a3, b3) {
        a3 = a3._reactInternals;
        var c6 = R2(), d3 = yi(a3), e12 = mh(c6, d3);
        e12.tag = 2;
        void 0 !== b3 && null !== b3 && (e12.callback = b3);
        b3 = nh(a3, e12, d3);
        null !== b3 && (gi(b3, a3, d3, c6), oh(b3, a3, d3));
      } };
      function Fi(a3, b3, c6, d3, e12, f3, g2) {
        a3 = a3.stateNode;
        return "function" === typeof a3.shouldComponentUpdate ? a3.shouldComponentUpdate(d3, f3, g2) : b3.prototype && b3.prototype.isPureReactComponent ? !Ie(c6, d3) || !Ie(e12, f3) : true;
      }
      function Gi(a3, b3, c6) {
        var d3 = false, e12 = Vf;
        var f3 = b3.contextType;
        "object" === typeof f3 && null !== f3 ? f3 = eh(f3) : (e12 = Zf(b3) ? Xf : H2.current, d3 = b3.contextTypes, f3 = (d3 = null !== d3 && void 0 !== d3) ? Yf(a3, e12) : Vf);
        b3 = new b3(c6, f3);
        a3.memoizedState = null !== b3.state && void 0 !== b3.state ? b3.state : null;
        b3.updater = Ei;
        a3.stateNode = b3;
        b3._reactInternals = a3;
        d3 && (a3 = a3.stateNode, a3.__reactInternalMemoizedUnmaskedChildContext = e12, a3.__reactInternalMemoizedMaskedChildContext = f3);
        return b3;
      }
      function Hi(a3, b3, c6, d3) {
        a3 = b3.state;
        "function" === typeof b3.componentWillReceiveProps && b3.componentWillReceiveProps(c6, d3);
        "function" === typeof b3.UNSAFE_componentWillReceiveProps && b3.UNSAFE_componentWillReceiveProps(c6, d3);
        b3.state !== a3 && Ei.enqueueReplaceState(b3, b3.state, null);
      }
      function Ii(a3, b3, c6, d3) {
        var e12 = a3.stateNode;
        e12.props = c6;
        e12.state = a3.memoizedState;
        e12.refs = {};
        kh(a3);
        var f3 = b3.contextType;
        "object" === typeof f3 && null !== f3 ? e12.context = eh(f3) : (f3 = Zf(b3) ? Xf : H2.current, e12.context = Yf(a3, f3));
        e12.state = a3.memoizedState;
        f3 = b3.getDerivedStateFromProps;
        "function" === typeof f3 && (Di(a3, b3, f3, c6), e12.state = a3.memoizedState);
        "function" === typeof b3.getDerivedStateFromProps || "function" === typeof e12.getSnapshotBeforeUpdate || "function" !== typeof e12.UNSAFE_componentWillMount && "function" !== typeof e12.componentWillMount || (b3 = e12.state, "function" === typeof e12.componentWillMount && e12.componentWillMount(), "function" === typeof e12.UNSAFE_componentWillMount && e12.UNSAFE_componentWillMount(), b3 !== e12.state && Ei.enqueueReplaceState(e12, e12.state, null), qh(a3, c6, e12, d3), e12.state = a3.memoizedState);
        "function" === typeof e12.componentDidMount && (a3.flags |= 4194308);
      }
      function Ji(a3, b3) {
        try {
          var c6 = "", d3 = b3;
          do
            c6 += Pa(d3), d3 = d3.return;
          while (d3);
          var e12 = c6;
        } catch (f3) {
          e12 = "\nError generating stack: " + f3.message + "\n" + f3.stack;
        }
        return { value: a3, source: b3, stack: e12, digest: null };
      }
      function Ki(a3, b3, c6) {
        return { value: a3, source: null, stack: null != c6 ? c6 : null, digest: null != b3 ? b3 : null };
      }
      function Li(a3, b3) {
        try {
          console.error(b3.value);
        } catch (c6) {
          setTimeout(function() {
            throw c6;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a3, b3, c6) {
        c6 = mh(-1, c6);
        c6.tag = 3;
        c6.payload = { element: null };
        var d3 = b3.value;
        c6.callback = function() {
          Oi || (Oi = true, Pi = d3);
          Li(a3, b3);
        };
        return c6;
      }
      function Qi(a3, b3, c6) {
        c6 = mh(-1, c6);
        c6.tag = 3;
        var d3 = a3.type.getDerivedStateFromError;
        if ("function" === typeof d3) {
          var e12 = b3.value;
          c6.payload = function() {
            return d3(e12);
          };
          c6.callback = function() {
            Li(a3, b3);
          };
        }
        var f3 = a3.stateNode;
        null !== f3 && "function" === typeof f3.componentDidCatch && (c6.callback = function() {
          Li(a3, b3);
          "function" !== typeof d3 && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c7 = b3.stack;
          this.componentDidCatch(b3.value, { componentStack: null !== c7 ? c7 : "" });
        });
        return c6;
      }
      function Si(a3, b3, c6) {
        var d3 = a3.pingCache;
        if (null === d3) {
          d3 = a3.pingCache = new Mi();
          var e12 = /* @__PURE__ */ new Set();
          d3.set(b3, e12);
        } else e12 = d3.get(b3), void 0 === e12 && (e12 = /* @__PURE__ */ new Set(), d3.set(b3, e12));
        e12.has(c6) || (e12.add(c6), a3 = Ti.bind(null, a3, b3, c6), b3.then(a3, a3));
      }
      function Ui(a3) {
        do {
          var b3;
          if (b3 = 13 === a3.tag) b3 = a3.memoizedState, b3 = null !== b3 ? null !== b3.dehydrated ? true : false : true;
          if (b3) return a3;
          a3 = a3.return;
        } while (null !== a3);
        return null;
      }
      function Vi(a3, b3, c6, d3, e12) {
        if (0 === (a3.mode & 1)) return a3 === b3 ? a3.flags |= 65536 : (a3.flags |= 128, c6.flags |= 131072, c6.flags &= -52805, 1 === c6.tag && (null === c6.alternate ? c6.tag = 17 : (b3 = mh(-1, 1), b3.tag = 2, nh(c6, b3, 1))), c6.lanes |= 1), a3;
        a3.flags |= 65536;
        a3.lanes = e12;
        return a3;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a3, b3, c6, d3) {
        b3.child = null === a3 ? Vg(b3, null, c6, d3) : Ug(b3, a3.child, c6, d3);
      }
      function Yi(a3, b3, c6, d3, e12) {
        c6 = c6.render;
        var f3 = b3.ref;
        ch(b3, e12);
        d3 = Nh(a3, b3, c6, d3, f3, e12);
        c6 = Sh();
        if (null !== a3 && !dh) return b3.updateQueue = a3.updateQueue, b3.flags &= -2053, a3.lanes &= ~e12, Zi(a3, b3, e12);
        I2 && c6 && vg(b3);
        b3.flags |= 1;
        Xi(a3, b3, d3, e12);
        return b3.child;
      }
      function $i(a3, b3, c6, d3, e12) {
        if (null === a3) {
          var f3 = c6.type;
          if ("function" === typeof f3 && !aj(f3) && void 0 === f3.defaultProps && null === c6.compare && void 0 === c6.defaultProps) return b3.tag = 15, b3.type = f3, bj(a3, b3, f3, d3, e12);
          a3 = Rg(c6.type, null, d3, b3, b3.mode, e12);
          a3.ref = b3.ref;
          a3.return = b3;
          return b3.child = a3;
        }
        f3 = a3.child;
        if (0 === (a3.lanes & e12)) {
          var g2 = f3.memoizedProps;
          c6 = c6.compare;
          c6 = null !== c6 ? c6 : Ie;
          if (c6(g2, d3) && a3.ref === b3.ref) return Zi(a3, b3, e12);
        }
        b3.flags |= 1;
        a3 = Pg(f3, d3);
        a3.ref = b3.ref;
        a3.return = b3;
        return b3.child = a3;
      }
      function bj(a3, b3, c6, d3, e12) {
        if (null !== a3) {
          var f3 = a3.memoizedProps;
          if (Ie(f3, d3) && a3.ref === b3.ref) if (dh = false, b3.pendingProps = d3 = f3, 0 !== (a3.lanes & e12)) 0 !== (a3.flags & 131072) && (dh = true);
          else return b3.lanes = a3.lanes, Zi(a3, b3, e12);
        }
        return cj(a3, b3, c6, d3, e12);
      }
      function dj(a3, b3, c6) {
        var d3 = b3.pendingProps, e12 = d3.children, f3 = null !== a3 ? a3.memoizedState : null;
        if ("hidden" === d3.mode) if (0 === (b3.mode & 1)) b3.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c6;
        else {
          if (0 === (c6 & 1073741824)) return a3 = null !== f3 ? f3.baseLanes | c6 : c6, b3.lanes = b3.childLanes = 1073741824, b3.memoizedState = { baseLanes: a3, cachePool: null, transitions: null }, b3.updateQueue = null, G(ej, fj), fj |= a3, null;
          b3.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d3 = null !== f3 ? f3.baseLanes : c6;
          G(ej, fj);
          fj |= d3;
        }
        else null !== f3 ? (d3 = f3.baseLanes | c6, b3.memoizedState = null) : d3 = c6, G(ej, fj), fj |= d3;
        Xi(a3, b3, e12, c6);
        return b3.child;
      }
      function gj(a3, b3) {
        var c6 = b3.ref;
        if (null === a3 && null !== c6 || null !== a3 && a3.ref !== c6) b3.flags |= 512, b3.flags |= 2097152;
      }
      function cj(a3, b3, c6, d3, e12) {
        var f3 = Zf(c6) ? Xf : H2.current;
        f3 = Yf(b3, f3);
        ch(b3, e12);
        c6 = Nh(a3, b3, c6, d3, f3, e12);
        d3 = Sh();
        if (null !== a3 && !dh) return b3.updateQueue = a3.updateQueue, b3.flags &= -2053, a3.lanes &= ~e12, Zi(a3, b3, e12);
        I2 && d3 && vg(b3);
        b3.flags |= 1;
        Xi(a3, b3, c6, e12);
        return b3.child;
      }
      function hj(a3, b3, c6, d3, e12) {
        if (Zf(c6)) {
          var f3 = true;
          cg(b3);
        } else f3 = false;
        ch(b3, e12);
        if (null === b3.stateNode) ij(a3, b3), Gi(b3, c6, d3), Ii(b3, c6, d3, e12), d3 = true;
        else if (null === a3) {
          var g2 = b3.stateNode, h3 = b3.memoizedProps;
          g2.props = h3;
          var k2 = g2.context, l3 = c6.contextType;
          "object" === typeof l3 && null !== l3 ? l3 = eh(l3) : (l3 = Zf(c6) ? Xf : H2.current, l3 = Yf(b3, l3));
          var m3 = c6.getDerivedStateFromProps, q = "function" === typeof m3 || "function" === typeof g2.getSnapshotBeforeUpdate;
          q || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h3 !== d3 || k2 !== l3) && Hi(b3, g2, d3, l3);
          jh = false;
          var r8 = b3.memoizedState;
          g2.state = r8;
          qh(b3, d3, g2, e12);
          k2 = b3.memoizedState;
          h3 !== d3 || r8 !== k2 || Wf.current || jh ? ("function" === typeof m3 && (Di(b3, c6, m3, d3), k2 = b3.memoizedState), (h3 = jh || Fi(b3, c6, h3, d3, r8, k2, l3)) ? (q || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b3.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b3.flags |= 4194308), b3.memoizedProps = d3, b3.memoizedState = k2), g2.props = d3, g2.state = k2, g2.context = l3, d3 = h3) : ("function" === typeof g2.componentDidMount && (b3.flags |= 4194308), d3 = false);
        } else {
          g2 = b3.stateNode;
          lh(a3, b3);
          h3 = b3.memoizedProps;
          l3 = b3.type === b3.elementType ? h3 : Ci(b3.type, h3);
          g2.props = l3;
          q = b3.pendingProps;
          r8 = g2.context;
          k2 = c6.contextType;
          "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c6) ? Xf : H2.current, k2 = Yf(b3, k2));
          var y3 = c6.getDerivedStateFromProps;
          (m3 = "function" === typeof y3 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h3 !== q || r8 !== k2) && Hi(b3, g2, d3, k2);
          jh = false;
          r8 = b3.memoizedState;
          g2.state = r8;
          qh(b3, d3, g2, e12);
          var n9 = b3.memoizedState;
          h3 !== q || r8 !== n9 || Wf.current || jh ? ("function" === typeof y3 && (Di(b3, c6, y3, d3), n9 = b3.memoizedState), (l3 = jh || Fi(b3, c6, l3, d3, r8, n9, k2) || false) ? (m3 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d3, n9, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d3, n9, k2)), "function" === typeof g2.componentDidUpdate && (b3.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b3.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h3 === a3.memoizedProps && r8 === a3.memoizedState || (b3.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h3 === a3.memoizedProps && r8 === a3.memoizedState || (b3.flags |= 1024), b3.memoizedProps = d3, b3.memoizedState = n9), g2.props = d3, g2.state = n9, g2.context = k2, d3 = l3) : ("function" !== typeof g2.componentDidUpdate || h3 === a3.memoizedProps && r8 === a3.memoizedState || (b3.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h3 === a3.memoizedProps && r8 === a3.memoizedState || (b3.flags |= 1024), d3 = false);
        }
        return jj(a3, b3, c6, d3, f3, e12);
      }
      function jj(a3, b3, c6, d3, e12, f3) {
        gj(a3, b3);
        var g2 = 0 !== (b3.flags & 128);
        if (!d3 && !g2) return e12 && dg(b3, c6, false), Zi(a3, b3, f3);
        d3 = b3.stateNode;
        Wi.current = b3;
        var h3 = g2 && "function" !== typeof c6.getDerivedStateFromError ? null : d3.render();
        b3.flags |= 1;
        null !== a3 && g2 ? (b3.child = Ug(b3, a3.child, null, f3), b3.child = Ug(b3, null, h3, f3)) : Xi(a3, b3, h3, f3);
        b3.memoizedState = d3.state;
        e12 && dg(b3, c6, true);
        return b3.child;
      }
      function kj(a3) {
        var b3 = a3.stateNode;
        b3.pendingContext ? ag(a3, b3.pendingContext, b3.pendingContext !== b3.context) : b3.context && ag(a3, b3.context, false);
        yh(a3, b3.containerInfo);
      }
      function lj(a3, b3, c6, d3, e12) {
        Ig();
        Jg(e12);
        b3.flags |= 256;
        Xi(a3, b3, c6, d3);
        return b3.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a3) {
        return { baseLanes: a3, cachePool: null, transitions: null };
      }
      function oj(a3, b3, c6) {
        var d3 = b3.pendingProps, e12 = L2.current, f3 = false, g2 = 0 !== (b3.flags & 128), h3;
        (h3 = g2) || (h3 = null !== a3 && null === a3.memoizedState ? false : 0 !== (e12 & 2));
        if (h3) f3 = true, b3.flags &= -129;
        else if (null === a3 || null !== a3.memoizedState) e12 |= 1;
        G(L2, e12 & 1);
        if (null === a3) {
          Eg(b3);
          a3 = b3.memoizedState;
          if (null !== a3 && (a3 = a3.dehydrated, null !== a3)) return 0 === (b3.mode & 1) ? b3.lanes = 1 : "$!" === a3.data ? b3.lanes = 8 : b3.lanes = 1073741824, null;
          g2 = d3.children;
          a3 = d3.fallback;
          return f3 ? (d3 = b3.mode, f3 = b3.child, g2 = { mode: "hidden", children: g2 }, 0 === (d3 & 1) && null !== f3 ? (f3.childLanes = 0, f3.pendingProps = g2) : f3 = pj(g2, d3, 0, null), a3 = Tg(a3, d3, c6, null), f3.return = b3, a3.return = b3, f3.sibling = a3, b3.child = f3, b3.child.memoizedState = nj(c6), b3.memoizedState = mj, a3) : qj(b3, g2);
        }
        e12 = a3.memoizedState;
        if (null !== e12 && (h3 = e12.dehydrated, null !== h3)) return rj(a3, b3, g2, d3, h3, e12, c6);
        if (f3) {
          f3 = d3.fallback;
          g2 = b3.mode;
          e12 = a3.child;
          h3 = e12.sibling;
          var k2 = { mode: "hidden", children: d3.children };
          0 === (g2 & 1) && b3.child !== e12 ? (d3 = b3.child, d3.childLanes = 0, d3.pendingProps = k2, b3.deletions = null) : (d3 = Pg(e12, k2), d3.subtreeFlags = e12.subtreeFlags & 14680064);
          null !== h3 ? f3 = Pg(h3, f3) : (f3 = Tg(f3, g2, c6, null), f3.flags |= 2);
          f3.return = b3;
          d3.return = b3;
          d3.sibling = f3;
          b3.child = d3;
          d3 = f3;
          f3 = b3.child;
          g2 = a3.child.memoizedState;
          g2 = null === g2 ? nj(c6) : { baseLanes: g2.baseLanes | c6, cachePool: null, transitions: g2.transitions };
          f3.memoizedState = g2;
          f3.childLanes = a3.childLanes & ~c6;
          b3.memoizedState = mj;
          return d3;
        }
        f3 = a3.child;
        a3 = f3.sibling;
        d3 = Pg(f3, { mode: "visible", children: d3.children });
        0 === (b3.mode & 1) && (d3.lanes = c6);
        d3.return = b3;
        d3.sibling = null;
        null !== a3 && (c6 = b3.deletions, null === c6 ? (b3.deletions = [a3], b3.flags |= 16) : c6.push(a3));
        b3.child = d3;
        b3.memoizedState = null;
        return d3;
      }
      function qj(a3, b3) {
        b3 = pj({ mode: "visible", children: b3 }, a3.mode, 0, null);
        b3.return = a3;
        return a3.child = b3;
      }
      function sj(a3, b3, c6, d3) {
        null !== d3 && Jg(d3);
        Ug(b3, a3.child, null, c6);
        a3 = qj(b3, b3.pendingProps.children);
        a3.flags |= 2;
        b3.memoizedState = null;
        return a3;
      }
      function rj(a3, b3, c6, d3, e12, f3, g2) {
        if (c6) {
          if (b3.flags & 256) return b3.flags &= -257, d3 = Ki(Error(p4(422))), sj(a3, b3, g2, d3);
          if (null !== b3.memoizedState) return b3.child = a3.child, b3.flags |= 128, null;
          f3 = d3.fallback;
          e12 = b3.mode;
          d3 = pj({ mode: "visible", children: d3.children }, e12, 0, null);
          f3 = Tg(f3, e12, g2, null);
          f3.flags |= 2;
          d3.return = b3;
          f3.return = b3;
          d3.sibling = f3;
          b3.child = d3;
          0 !== (b3.mode & 1) && Ug(b3, a3.child, null, g2);
          b3.child.memoizedState = nj(g2);
          b3.memoizedState = mj;
          return f3;
        }
        if (0 === (b3.mode & 1)) return sj(a3, b3, g2, null);
        if ("$!" === e12.data) {
          d3 = e12.nextSibling && e12.nextSibling.dataset;
          if (d3) var h3 = d3.dgst;
          d3 = h3;
          f3 = Error(p4(419));
          d3 = Ki(f3, d3, void 0);
          return sj(a3, b3, g2, d3);
        }
        h3 = 0 !== (g2 & a3.childLanes);
        if (dh || h3) {
          d3 = Q;
          if (null !== d3) {
            switch (g2 & -g2) {
              case 4:
                e12 = 2;
                break;
              case 16:
                e12 = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e12 = 32;
                break;
              case 536870912:
                e12 = 268435456;
                break;
              default:
                e12 = 0;
            }
            e12 = 0 !== (e12 & (d3.suspendedLanes | g2)) ? 0 : e12;
            0 !== e12 && e12 !== f3.retryLane && (f3.retryLane = e12, ih(a3, e12), gi(d3, a3, e12, -1));
          }
          tj();
          d3 = Ki(Error(p4(421)));
          return sj(a3, b3, g2, d3);
        }
        if ("$?" === e12.data) return b3.flags |= 128, b3.child = a3.child, b3 = uj.bind(null, a3), e12._reactRetry = b3, null;
        a3 = f3.treeContext;
        yg = Lf(e12.nextSibling);
        xg = b3;
        I2 = true;
        zg = null;
        null !== a3 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a3.id, sg = a3.overflow, qg = b3);
        b3 = qj(b3, d3.children);
        b3.flags |= 4096;
        return b3;
      }
      function vj(a3, b3, c6) {
        a3.lanes |= b3;
        var d3 = a3.alternate;
        null !== d3 && (d3.lanes |= b3);
        bh(a3.return, b3, c6);
      }
      function wj(a3, b3, c6, d3, e12) {
        var f3 = a3.memoizedState;
        null === f3 ? a3.memoizedState = { isBackwards: b3, rendering: null, renderingStartTime: 0, last: d3, tail: c6, tailMode: e12 } : (f3.isBackwards = b3, f3.rendering = null, f3.renderingStartTime = 0, f3.last = d3, f3.tail = c6, f3.tailMode = e12);
      }
      function xj(a3, b3, c6) {
        var d3 = b3.pendingProps, e12 = d3.revealOrder, f3 = d3.tail;
        Xi(a3, b3, d3.children, c6);
        d3 = L2.current;
        if (0 !== (d3 & 2)) d3 = d3 & 1 | 2, b3.flags |= 128;
        else {
          if (null !== a3 && 0 !== (a3.flags & 128)) a: for (a3 = b3.child; null !== a3; ) {
            if (13 === a3.tag) null !== a3.memoizedState && vj(a3, c6, b3);
            else if (19 === a3.tag) vj(a3, c6, b3);
            else if (null !== a3.child) {
              a3.child.return = a3;
              a3 = a3.child;
              continue;
            }
            if (a3 === b3) break a;
            for (; null === a3.sibling; ) {
              if (null === a3.return || a3.return === b3) break a;
              a3 = a3.return;
            }
            a3.sibling.return = a3.return;
            a3 = a3.sibling;
          }
          d3 &= 1;
        }
        G(L2, d3);
        if (0 === (b3.mode & 1)) b3.memoizedState = null;
        else switch (e12) {
          case "forwards":
            c6 = b3.child;
            for (e12 = null; null !== c6; ) a3 = c6.alternate, null !== a3 && null === Ch(a3) && (e12 = c6), c6 = c6.sibling;
            c6 = e12;
            null === c6 ? (e12 = b3.child, b3.child = null) : (e12 = c6.sibling, c6.sibling = null);
            wj(b3, false, e12, c6, f3);
            break;
          case "backwards":
            c6 = null;
            e12 = b3.child;
            for (b3.child = null; null !== e12; ) {
              a3 = e12.alternate;
              if (null !== a3 && null === Ch(a3)) {
                b3.child = e12;
                break;
              }
              a3 = e12.sibling;
              e12.sibling = c6;
              c6 = e12;
              e12 = a3;
            }
            wj(b3, true, c6, null, f3);
            break;
          case "together":
            wj(b3, false, null, null, void 0);
            break;
          default:
            b3.memoizedState = null;
        }
        return b3.child;
      }
      function ij(a3, b3) {
        0 === (b3.mode & 1) && null !== a3 && (a3.alternate = null, b3.alternate = null, b3.flags |= 2);
      }
      function Zi(a3, b3, c6) {
        null !== a3 && (b3.dependencies = a3.dependencies);
        rh |= b3.lanes;
        if (0 === (c6 & b3.childLanes)) return null;
        if (null !== a3 && b3.child !== a3.child) throw Error(p4(153));
        if (null !== b3.child) {
          a3 = b3.child;
          c6 = Pg(a3, a3.pendingProps);
          b3.child = c6;
          for (c6.return = b3; null !== a3.sibling; ) a3 = a3.sibling, c6 = c6.sibling = Pg(a3, a3.pendingProps), c6.return = b3;
          c6.sibling = null;
        }
        return b3.child;
      }
      function yj(a3, b3, c6) {
        switch (b3.tag) {
          case 3:
            kj(b3);
            Ig();
            break;
          case 5:
            Ah(b3);
            break;
          case 1:
            Zf(b3.type) && cg(b3);
            break;
          case 4:
            yh(b3, b3.stateNode.containerInfo);
            break;
          case 10:
            var d3 = b3.type._context, e12 = b3.memoizedProps.value;
            G(Wg, d3._currentValue);
            d3._currentValue = e12;
            break;
          case 13:
            d3 = b3.memoizedState;
            if (null !== d3) {
              if (null !== d3.dehydrated) return G(L2, L2.current & 1), b3.flags |= 128, null;
              if (0 !== (c6 & b3.child.childLanes)) return oj(a3, b3, c6);
              G(L2, L2.current & 1);
              a3 = Zi(a3, b3, c6);
              return null !== a3 ? a3.sibling : null;
            }
            G(L2, L2.current & 1);
            break;
          case 19:
            d3 = 0 !== (c6 & b3.childLanes);
            if (0 !== (a3.flags & 128)) {
              if (d3) return xj(a3, b3, c6);
              b3.flags |= 128;
            }
            e12 = b3.memoizedState;
            null !== e12 && (e12.rendering = null, e12.tail = null, e12.lastEffect = null);
            G(L2, L2.current);
            if (d3) break;
            else return null;
          case 22:
          case 23:
            return b3.lanes = 0, dj(a3, b3, c6);
        }
        return Zi(a3, b3, c6);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a3, b3) {
        for (var c6 = b3.child; null !== c6; ) {
          if (5 === c6.tag || 6 === c6.tag) a3.appendChild(c6.stateNode);
          else if (4 !== c6.tag && null !== c6.child) {
            c6.child.return = c6;
            c6 = c6.child;
            continue;
          }
          if (c6 === b3) break;
          for (; null === c6.sibling; ) {
            if (null === c6.return || c6.return === b3) return;
            c6 = c6.return;
          }
          c6.sibling.return = c6.return;
          c6 = c6.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a3, b3, c6, d3) {
        var e12 = a3.memoizedProps;
        if (e12 !== d3) {
          a3 = b3.stateNode;
          xh(uh.current);
          var f3 = null;
          switch (c6) {
            case "input":
              e12 = Ya(a3, e12);
              d3 = Ya(a3, d3);
              f3 = [];
              break;
            case "select":
              e12 = A2({}, e12, { value: void 0 });
              d3 = A2({}, d3, { value: void 0 });
              f3 = [];
              break;
            case "textarea":
              e12 = gb(a3, e12);
              d3 = gb(a3, d3);
              f3 = [];
              break;
            default:
              "function" !== typeof e12.onClick && "function" === typeof d3.onClick && (a3.onclick = Bf);
          }
          ub(c6, d3);
          var g2;
          c6 = null;
          for (l3 in e12) if (!d3.hasOwnProperty(l3) && e12.hasOwnProperty(l3) && null != e12[l3]) if ("style" === l3) {
            var h3 = e12[l3];
            for (g2 in h3) h3.hasOwnProperty(g2) && (c6 || (c6 = {}), c6[g2] = "");
          } else "dangerouslySetInnerHTML" !== l3 && "children" !== l3 && "suppressContentEditableWarning" !== l3 && "suppressHydrationWarning" !== l3 && "autoFocus" !== l3 && (ea.hasOwnProperty(l3) ? f3 || (f3 = []) : (f3 = f3 || []).push(l3, null));
          for (l3 in d3) {
            var k2 = d3[l3];
            h3 = null != e12 ? e12[l3] : void 0;
            if (d3.hasOwnProperty(l3) && k2 !== h3 && (null != k2 || null != h3)) if ("style" === l3) if (h3) {
              for (g2 in h3) !h3.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c6 || (c6 = {}), c6[g2] = "");
              for (g2 in k2) k2.hasOwnProperty(g2) && h3[g2] !== k2[g2] && (c6 || (c6 = {}), c6[g2] = k2[g2]);
            } else c6 || (f3 || (f3 = []), f3.push(
              l3,
              c6
            )), c6 = k2;
            else "dangerouslySetInnerHTML" === l3 ? (k2 = k2 ? k2.__html : void 0, h3 = h3 ? h3.__html : void 0, null != k2 && h3 !== k2 && (f3 = f3 || []).push(l3, k2)) : "children" === l3 ? "string" !== typeof k2 && "number" !== typeof k2 || (f3 = f3 || []).push(l3, "" + k2) : "suppressContentEditableWarning" !== l3 && "suppressHydrationWarning" !== l3 && (ea.hasOwnProperty(l3) ? (null != k2 && "onScroll" === l3 && D("scroll", a3), f3 || h3 === k2 || (f3 = [])) : (f3 = f3 || []).push(l3, k2));
          }
          c6 && (f3 = f3 || []).push("style", c6);
          var l3 = f3;
          if (b3.updateQueue = l3) b3.flags |= 4;
        }
      };
      Cj = function(a3, b3, c6, d3) {
        c6 !== d3 && (b3.flags |= 4);
      };
      function Dj(a3, b3) {
        if (!I2) switch (a3.tailMode) {
          case "hidden":
            b3 = a3.tail;
            for (var c6 = null; null !== b3; ) null !== b3.alternate && (c6 = b3), b3 = b3.sibling;
            null === c6 ? a3.tail = null : c6.sibling = null;
            break;
          case "collapsed":
            c6 = a3.tail;
            for (var d3 = null; null !== c6; ) null !== c6.alternate && (d3 = c6), c6 = c6.sibling;
            null === d3 ? b3 || null === a3.tail ? a3.tail = null : a3.tail.sibling = null : d3.sibling = null;
        }
      }
      function S3(a3) {
        var b3 = null !== a3.alternate && a3.alternate.child === a3.child, c6 = 0, d3 = 0;
        if (b3) for (var e12 = a3.child; null !== e12; ) c6 |= e12.lanes | e12.childLanes, d3 |= e12.subtreeFlags & 14680064, d3 |= e12.flags & 14680064, e12.return = a3, e12 = e12.sibling;
        else for (e12 = a3.child; null !== e12; ) c6 |= e12.lanes | e12.childLanes, d3 |= e12.subtreeFlags, d3 |= e12.flags, e12.return = a3, e12 = e12.sibling;
        a3.subtreeFlags |= d3;
        a3.childLanes = c6;
        return b3;
      }
      function Ej(a3, b3, c6) {
        var d3 = b3.pendingProps;
        wg(b3);
        switch (b3.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S3(b3), null;
          case 1:
            return Zf(b3.type) && $f(), S3(b3), null;
          case 3:
            d3 = b3.stateNode;
            zh();
            E2(Wf);
            E2(H2);
            Eh();
            d3.pendingContext && (d3.context = d3.pendingContext, d3.pendingContext = null);
            if (null === a3 || null === a3.child) Gg(b3) ? b3.flags |= 4 : null === a3 || a3.memoizedState.isDehydrated && 0 === (b3.flags & 256) || (b3.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a3, b3);
            S3(b3);
            return null;
          case 5:
            Bh(b3);
            var e12 = xh(wh.current);
            c6 = b3.type;
            if (null !== a3 && null != b3.stateNode) Bj(a3, b3, c6, d3, e12), a3.ref !== b3.ref && (b3.flags |= 512, b3.flags |= 2097152);
            else {
              if (!d3) {
                if (null === b3.stateNode) throw Error(p4(166));
                S3(b3);
                return null;
              }
              a3 = xh(uh.current);
              if (Gg(b3)) {
                d3 = b3.stateNode;
                c6 = b3.type;
                var f3 = b3.memoizedProps;
                d3[Of] = b3;
                d3[Pf] = f3;
                a3 = 0 !== (b3.mode & 1);
                switch (c6) {
                  case "dialog":
                    D("cancel", d3);
                    D("close", d3);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d3);
                    break;
                  case "video":
                  case "audio":
                    for (e12 = 0; e12 < lf.length; e12++) D(lf[e12], d3);
                    break;
                  case "source":
                    D("error", d3);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d3
                    );
                    D("load", d3);
                    break;
                  case "details":
                    D("toggle", d3);
                    break;
                  case "input":
                    Za(d3, f3);
                    D("invalid", d3);
                    break;
                  case "select":
                    d3._wrapperState = { wasMultiple: !!f3.multiple };
                    D("invalid", d3);
                    break;
                  case "textarea":
                    hb(d3, f3), D("invalid", d3);
                }
                ub(c6, f3);
                e12 = null;
                for (var g2 in f3) if (f3.hasOwnProperty(g2)) {
                  var h3 = f3[g2];
                  "children" === g2 ? "string" === typeof h3 ? d3.textContent !== h3 && (true !== f3.suppressHydrationWarning && Af(d3.textContent, h3, a3), e12 = ["children", h3]) : "number" === typeof h3 && d3.textContent !== "" + h3 && (true !== f3.suppressHydrationWarning && Af(
                    d3.textContent,
                    h3,
                    a3
                  ), e12 = ["children", "" + h3]) : ea.hasOwnProperty(g2) && null != h3 && "onScroll" === g2 && D("scroll", d3);
                }
                switch (c6) {
                  case "input":
                    Va(d3);
                    db(d3, f3, true);
                    break;
                  case "textarea":
                    Va(d3);
                    jb(d3);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f3.onClick && (d3.onclick = Bf);
                }
                d3 = e12;
                b3.updateQueue = d3;
                null !== d3 && (b3.flags |= 4);
              } else {
                g2 = 9 === e12.nodeType ? e12 : e12.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a3 && (a3 = kb(c6));
                "http://www.w3.org/1999/xhtml" === a3 ? "script" === c6 ? (a3 = g2.createElement("div"), a3.innerHTML = "<script><\/script>", a3 = a3.removeChild(a3.firstChild)) : "string" === typeof d3.is ? a3 = g2.createElement(c6, { is: d3.is }) : (a3 = g2.createElement(c6), "select" === c6 && (g2 = a3, d3.multiple ? g2.multiple = true : d3.size && (g2.size = d3.size))) : a3 = g2.createElementNS(a3, c6);
                a3[Of] = b3;
                a3[Pf] = d3;
                zj(a3, b3, false, false);
                b3.stateNode = a3;
                a: {
                  g2 = vb(c6, d3);
                  switch (c6) {
                    case "dialog":
                      D("cancel", a3);
                      D("close", a3);
                      e12 = d3;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a3);
                      e12 = d3;
                      break;
                    case "video":
                    case "audio":
                      for (e12 = 0; e12 < lf.length; e12++) D(lf[e12], a3);
                      e12 = d3;
                      break;
                    case "source":
                      D("error", a3);
                      e12 = d3;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a3
                      );
                      D("load", a3);
                      e12 = d3;
                      break;
                    case "details":
                      D("toggle", a3);
                      e12 = d3;
                      break;
                    case "input":
                      Za(a3, d3);
                      e12 = Ya(a3, d3);
                      D("invalid", a3);
                      break;
                    case "option":
                      e12 = d3;
                      break;
                    case "select":
                      a3._wrapperState = { wasMultiple: !!d3.multiple };
                      e12 = A2({}, d3, { value: void 0 });
                      D("invalid", a3);
                      break;
                    case "textarea":
                      hb(a3, d3);
                      e12 = gb(a3, d3);
                      D("invalid", a3);
                      break;
                    default:
                      e12 = d3;
                  }
                  ub(c6, e12);
                  h3 = e12;
                  for (f3 in h3) if (h3.hasOwnProperty(f3)) {
                    var k2 = h3[f3];
                    "style" === f3 ? sb(a3, k2) : "dangerouslySetInnerHTML" === f3 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a3, k2)) : "children" === f3 ? "string" === typeof k2 ? ("textarea" !== c6 || "" !== k2) && ob(a3, k2) : "number" === typeof k2 && ob(a3, "" + k2) : "suppressContentEditableWarning" !== f3 && "suppressHydrationWarning" !== f3 && "autoFocus" !== f3 && (ea.hasOwnProperty(f3) ? null != k2 && "onScroll" === f3 && D("scroll", a3) : null != k2 && ta(a3, f3, k2, g2));
                  }
                  switch (c6) {
                    case "input":
                      Va(a3);
                      db(a3, d3, false);
                      break;
                    case "textarea":
                      Va(a3);
                      jb(a3);
                      break;
                    case "option":
                      null != d3.value && a3.setAttribute("value", "" + Sa(d3.value));
                      break;
                    case "select":
                      a3.multiple = !!d3.multiple;
                      f3 = d3.value;
                      null != f3 ? fb(a3, !!d3.multiple, f3, false) : null != d3.defaultValue && fb(
                        a3,
                        !!d3.multiple,
                        d3.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e12.onClick && (a3.onclick = Bf);
                  }
                  switch (c6) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d3 = !!d3.autoFocus;
                      break a;
                    case "img":
                      d3 = true;
                      break a;
                    default:
                      d3 = false;
                  }
                }
                d3 && (b3.flags |= 4);
              }
              null !== b3.ref && (b3.flags |= 512, b3.flags |= 2097152);
            }
            S3(b3);
            return null;
          case 6:
            if (a3 && null != b3.stateNode) Cj(a3, b3, a3.memoizedProps, d3);
            else {
              if ("string" !== typeof d3 && null === b3.stateNode) throw Error(p4(166));
              c6 = xh(wh.current);
              xh(uh.current);
              if (Gg(b3)) {
                d3 = b3.stateNode;
                c6 = b3.memoizedProps;
                d3[Of] = b3;
                if (f3 = d3.nodeValue !== c6) {
                  if (a3 = xg, null !== a3) switch (a3.tag) {
                    case 3:
                      Af(d3.nodeValue, c6, 0 !== (a3.mode & 1));
                      break;
                    case 5:
                      true !== a3.memoizedProps.suppressHydrationWarning && Af(d3.nodeValue, c6, 0 !== (a3.mode & 1));
                  }
                }
                f3 && (b3.flags |= 4);
              } else d3 = (9 === c6.nodeType ? c6 : c6.ownerDocument).createTextNode(d3), d3[Of] = b3, b3.stateNode = d3;
            }
            S3(b3);
            return null;
          case 13:
            E2(L2);
            d3 = b3.memoizedState;
            if (null === a3 || null !== a3.memoizedState && null !== a3.memoizedState.dehydrated) {
              if (I2 && null !== yg && 0 !== (b3.mode & 1) && 0 === (b3.flags & 128)) Hg(), Ig(), b3.flags |= 98560, f3 = false;
              else if (f3 = Gg(b3), null !== d3 && null !== d3.dehydrated) {
                if (null === a3) {
                  if (!f3) throw Error(p4(318));
                  f3 = b3.memoizedState;
                  f3 = null !== f3 ? f3.dehydrated : null;
                  if (!f3) throw Error(p4(317));
                  f3[Of] = b3;
                } else Ig(), 0 === (b3.flags & 128) && (b3.memoizedState = null), b3.flags |= 4;
                S3(b3);
                f3 = false;
              } else null !== zg && (Fj(zg), zg = null), f3 = true;
              if (!f3) return b3.flags & 65536 ? b3 : null;
            }
            if (0 !== (b3.flags & 128)) return b3.lanes = c6, b3;
            d3 = null !== d3;
            d3 !== (null !== a3 && null !== a3.memoizedState) && d3 && (b3.child.flags |= 8192, 0 !== (b3.mode & 1) && (null === a3 || 0 !== (L2.current & 1) ? 0 === T2 && (T2 = 3) : tj()));
            null !== b3.updateQueue && (b3.flags |= 4);
            S3(b3);
            return null;
          case 4:
            return zh(), Aj(a3, b3), null === a3 && sf(b3.stateNode.containerInfo), S3(b3), null;
          case 10:
            return ah(b3.type._context), S3(b3), null;
          case 17:
            return Zf(b3.type) && $f(), S3(b3), null;
          case 19:
            E2(L2);
            f3 = b3.memoizedState;
            if (null === f3) return S3(b3), null;
            d3 = 0 !== (b3.flags & 128);
            g2 = f3.rendering;
            if (null === g2) if (d3) Dj(f3, false);
            else {
              if (0 !== T2 || null !== a3 && 0 !== (a3.flags & 128)) for (a3 = b3.child; null !== a3; ) {
                g2 = Ch(a3);
                if (null !== g2) {
                  b3.flags |= 128;
                  Dj(f3, false);
                  d3 = g2.updateQueue;
                  null !== d3 && (b3.updateQueue = d3, b3.flags |= 4);
                  b3.subtreeFlags = 0;
                  d3 = c6;
                  for (c6 = b3.child; null !== c6; ) f3 = c6, a3 = d3, f3.flags &= 14680066, g2 = f3.alternate, null === g2 ? (f3.childLanes = 0, f3.lanes = a3, f3.child = null, f3.subtreeFlags = 0, f3.memoizedProps = null, f3.memoizedState = null, f3.updateQueue = null, f3.dependencies = null, f3.stateNode = null) : (f3.childLanes = g2.childLanes, f3.lanes = g2.lanes, f3.child = g2.child, f3.subtreeFlags = 0, f3.deletions = null, f3.memoizedProps = g2.memoizedProps, f3.memoizedState = g2.memoizedState, f3.updateQueue = g2.updateQueue, f3.type = g2.type, a3 = g2.dependencies, f3.dependencies = null === a3 ? null : { lanes: a3.lanes, firstContext: a3.firstContext }), c6 = c6.sibling;
                  G(L2, L2.current & 1 | 2);
                  return b3.child;
                }
                a3 = a3.sibling;
              }
              null !== f3.tail && B2() > Gj && (b3.flags |= 128, d3 = true, Dj(f3, false), b3.lanes = 4194304);
            }
            else {
              if (!d3) if (a3 = Ch(g2), null !== a3) {
                if (b3.flags |= 128, d3 = true, c6 = a3.updateQueue, null !== c6 && (b3.updateQueue = c6, b3.flags |= 4), Dj(f3, true), null === f3.tail && "hidden" === f3.tailMode && !g2.alternate && !I2) return S3(b3), null;
              } else 2 * B2() - f3.renderingStartTime > Gj && 1073741824 !== c6 && (b3.flags |= 128, d3 = true, Dj(f3, false), b3.lanes = 4194304);
              f3.isBackwards ? (g2.sibling = b3.child, b3.child = g2) : (c6 = f3.last, null !== c6 ? c6.sibling = g2 : b3.child = g2, f3.last = g2);
            }
            if (null !== f3.tail) return b3 = f3.tail, f3.rendering = b3, f3.tail = b3.sibling, f3.renderingStartTime = B2(), b3.sibling = null, c6 = L2.current, G(L2, d3 ? c6 & 1 | 2 : c6 & 1), b3;
            S3(b3);
            return null;
          case 22:
          case 23:
            return Hj(), d3 = null !== b3.memoizedState, null !== a3 && null !== a3.memoizedState !== d3 && (b3.flags |= 8192), d3 && 0 !== (b3.mode & 1) ? 0 !== (fj & 1073741824) && (S3(b3), b3.subtreeFlags & 6 && (b3.flags |= 8192)) : S3(b3), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p4(156, b3.tag));
      }
      function Ij(a3, b3) {
        wg(b3);
        switch (b3.tag) {
          case 1:
            return Zf(b3.type) && $f(), a3 = b3.flags, a3 & 65536 ? (b3.flags = a3 & -65537 | 128, b3) : null;
          case 3:
            return zh(), E2(Wf), E2(H2), Eh(), a3 = b3.flags, 0 !== (a3 & 65536) && 0 === (a3 & 128) ? (b3.flags = a3 & -65537 | 128, b3) : null;
          case 5:
            return Bh(b3), null;
          case 13:
            E2(L2);
            a3 = b3.memoizedState;
            if (null !== a3 && null !== a3.dehydrated) {
              if (null === b3.alternate) throw Error(p4(340));
              Ig();
            }
            a3 = b3.flags;
            return a3 & 65536 ? (b3.flags = a3 & -65537 | 128, b3) : null;
          case 19:
            return E2(L2), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b3.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V2 = null;
      function Lj(a3, b3) {
        var c6 = a3.ref;
        if (null !== c6) if ("function" === typeof c6) try {
          c6(null);
        } catch (d3) {
          W(a3, b3, d3);
        }
        else c6.current = null;
      }
      function Mj(a3, b3, c6) {
        try {
          c6();
        } catch (d3) {
          W(a3, b3, d3);
        }
      }
      var Nj = false;
      function Oj(a3, b3) {
        Cf = dd;
        a3 = Me();
        if (Ne(a3)) {
          if ("selectionStart" in a3) var c6 = { start: a3.selectionStart, end: a3.selectionEnd };
          else a: {
            c6 = (c6 = a3.ownerDocument) && c6.defaultView || window;
            var d3 = c6.getSelection && c6.getSelection();
            if (d3 && 0 !== d3.rangeCount) {
              c6 = d3.anchorNode;
              var e12 = d3.anchorOffset, f3 = d3.focusNode;
              d3 = d3.focusOffset;
              try {
                c6.nodeType, f3.nodeType;
              } catch (F) {
                c6 = null;
                break a;
              }
              var g2 = 0, h3 = -1, k2 = -1, l3 = 0, m3 = 0, q = a3, r8 = null;
              b: for (; ; ) {
                for (var y3; ; ) {
                  q !== c6 || 0 !== e12 && 3 !== q.nodeType || (h3 = g2 + e12);
                  q !== f3 || 0 !== d3 && 3 !== q.nodeType || (k2 = g2 + d3);
                  3 === q.nodeType && (g2 += q.nodeValue.length);
                  if (null === (y3 = q.firstChild)) break;
                  r8 = q;
                  q = y3;
                }
                for (; ; ) {
                  if (q === a3) break b;
                  r8 === c6 && ++l3 === e12 && (h3 = g2);
                  r8 === f3 && ++m3 === d3 && (k2 = g2);
                  if (null !== (y3 = q.nextSibling)) break;
                  q = r8;
                  r8 = q.parentNode;
                }
                q = y3;
              }
              c6 = -1 === h3 || -1 === k2 ? null : { start: h3, end: k2 };
            } else c6 = null;
          }
          c6 = c6 || { start: 0, end: 0 };
        } else c6 = null;
        Df = { focusedElem: a3, selectionRange: c6 };
        dd = false;
        for (V2 = b3; null !== V2; ) if (b3 = V2, a3 = b3.child, 0 !== (b3.subtreeFlags & 1028) && null !== a3) a3.return = b3, V2 = a3;
        else for (; null !== V2; ) {
          b3 = V2;
          try {
            var n9 = b3.alternate;
            if (0 !== (b3.flags & 1024)) switch (b3.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n9) {
                  var t7 = n9.memoizedProps, J = n9.memoizedState, x2 = b3.stateNode, w2 = x2.getSnapshotBeforeUpdate(b3.elementType === b3.type ? t7 : Ci(b3.type, t7), J);
                  x2.__reactInternalSnapshotBeforeUpdate = w2;
                }
                break;
              case 3:
                var u5 = b3.stateNode.containerInfo;
                1 === u5.nodeType ? u5.textContent = "" : 9 === u5.nodeType && u5.documentElement && u5.removeChild(u5.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p4(163));
            }
          } catch (F) {
            W(b3, b3.return, F);
          }
          a3 = b3.sibling;
          if (null !== a3) {
            a3.return = b3.return;
            V2 = a3;
            break;
          }
          V2 = b3.return;
        }
        n9 = Nj;
        Nj = false;
        return n9;
      }
      function Pj(a3, b3, c6) {
        var d3 = b3.updateQueue;
        d3 = null !== d3 ? d3.lastEffect : null;
        if (null !== d3) {
          var e12 = d3 = d3.next;
          do {
            if ((e12.tag & a3) === a3) {
              var f3 = e12.destroy;
              e12.destroy = void 0;
              void 0 !== f3 && Mj(b3, c6, f3);
            }
            e12 = e12.next;
          } while (e12 !== d3);
        }
      }
      function Qj(a3, b3) {
        b3 = b3.updateQueue;
        b3 = null !== b3 ? b3.lastEffect : null;
        if (null !== b3) {
          var c6 = b3 = b3.next;
          do {
            if ((c6.tag & a3) === a3) {
              var d3 = c6.create;
              c6.destroy = d3();
            }
            c6 = c6.next;
          } while (c6 !== b3);
        }
      }
      function Rj(a3) {
        var b3 = a3.ref;
        if (null !== b3) {
          var c6 = a3.stateNode;
          switch (a3.tag) {
            case 5:
              a3 = c6;
              break;
            default:
              a3 = c6;
          }
          "function" === typeof b3 ? b3(a3) : b3.current = a3;
        }
      }
      function Sj(a3) {
        var b3 = a3.alternate;
        null !== b3 && (a3.alternate = null, Sj(b3));
        a3.child = null;
        a3.deletions = null;
        a3.sibling = null;
        5 === a3.tag && (b3 = a3.stateNode, null !== b3 && (delete b3[Of], delete b3[Pf], delete b3[of], delete b3[Qf], delete b3[Rf]));
        a3.stateNode = null;
        a3.return = null;
        a3.dependencies = null;
        a3.memoizedProps = null;
        a3.memoizedState = null;
        a3.pendingProps = null;
        a3.stateNode = null;
        a3.updateQueue = null;
      }
      function Tj(a3) {
        return 5 === a3.tag || 3 === a3.tag || 4 === a3.tag;
      }
      function Uj(a3) {
        a: for (; ; ) {
          for (; null === a3.sibling; ) {
            if (null === a3.return || Tj(a3.return)) return null;
            a3 = a3.return;
          }
          a3.sibling.return = a3.return;
          for (a3 = a3.sibling; 5 !== a3.tag && 6 !== a3.tag && 18 !== a3.tag; ) {
            if (a3.flags & 2) continue a;
            if (null === a3.child || 4 === a3.tag) continue a;
            else a3.child.return = a3, a3 = a3.child;
          }
          if (!(a3.flags & 2)) return a3.stateNode;
        }
      }
      function Vj(a3, b3, c6) {
        var d3 = a3.tag;
        if (5 === d3 || 6 === d3) a3 = a3.stateNode, b3 ? 8 === c6.nodeType ? c6.parentNode.insertBefore(a3, b3) : c6.insertBefore(a3, b3) : (8 === c6.nodeType ? (b3 = c6.parentNode, b3.insertBefore(a3, c6)) : (b3 = c6, b3.appendChild(a3)), c6 = c6._reactRootContainer, null !== c6 && void 0 !== c6 || null !== b3.onclick || (b3.onclick = Bf));
        else if (4 !== d3 && (a3 = a3.child, null !== a3)) for (Vj(a3, b3, c6), a3 = a3.sibling; null !== a3; ) Vj(a3, b3, c6), a3 = a3.sibling;
      }
      function Wj(a3, b3, c6) {
        var d3 = a3.tag;
        if (5 === d3 || 6 === d3) a3 = a3.stateNode, b3 ? c6.insertBefore(a3, b3) : c6.appendChild(a3);
        else if (4 !== d3 && (a3 = a3.child, null !== a3)) for (Wj(a3, b3, c6), a3 = a3.sibling; null !== a3; ) Wj(a3, b3, c6), a3 = a3.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a3, b3, c6) {
        for (c6 = c6.child; null !== c6; ) Zj(a3, b3, c6), c6 = c6.sibling;
      }
      function Zj(a3, b3, c6) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c6);
        } catch (h3) {
        }
        switch (c6.tag) {
          case 5:
            U || Lj(c6, b3);
          case 6:
            var d3 = X, e12 = Xj;
            X = null;
            Yj(a3, b3, c6);
            X = d3;
            Xj = e12;
            null !== X && (Xj ? (a3 = X, c6 = c6.stateNode, 8 === a3.nodeType ? a3.parentNode.removeChild(c6) : a3.removeChild(c6)) : X.removeChild(c6.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a3 = X, c6 = c6.stateNode, 8 === a3.nodeType ? Kf(a3.parentNode, c6) : 1 === a3.nodeType && Kf(a3, c6), bd(a3)) : Kf(X, c6.stateNode));
            break;
          case 4:
            d3 = X;
            e12 = Xj;
            X = c6.stateNode.containerInfo;
            Xj = true;
            Yj(a3, b3, c6);
            X = d3;
            Xj = e12;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d3 = c6.updateQueue, null !== d3 && (d3 = d3.lastEffect, null !== d3))) {
              e12 = d3 = d3.next;
              do {
                var f3 = e12, g2 = f3.destroy;
                f3 = f3.tag;
                void 0 !== g2 && (0 !== (f3 & 2) ? Mj(c6, b3, g2) : 0 !== (f3 & 4) && Mj(c6, b3, g2));
                e12 = e12.next;
              } while (e12 !== d3);
            }
            Yj(a3, b3, c6);
            break;
          case 1:
            if (!U && (Lj(c6, b3), d3 = c6.stateNode, "function" === typeof d3.componentWillUnmount)) try {
              d3.props = c6.memoizedProps, d3.state = c6.memoizedState, d3.componentWillUnmount();
            } catch (h3) {
              W(c6, b3, h3);
            }
            Yj(a3, b3, c6);
            break;
          case 21:
            Yj(a3, b3, c6);
            break;
          case 22:
            c6.mode & 1 ? (U = (d3 = U) || null !== c6.memoizedState, Yj(a3, b3, c6), U = d3) : Yj(a3, b3, c6);
            break;
          default:
            Yj(a3, b3, c6);
        }
      }
      function ak(a3) {
        var b3 = a3.updateQueue;
        if (null !== b3) {
          a3.updateQueue = null;
          var c6 = a3.stateNode;
          null === c6 && (c6 = a3.stateNode = new Kj());
          b3.forEach(function(b4) {
            var d3 = bk.bind(null, a3, b4);
            c6.has(b4) || (c6.add(b4), b4.then(d3, d3));
          });
        }
      }
      function ck(a3, b3) {
        var c6 = b3.deletions;
        if (null !== c6) for (var d3 = 0; d3 < c6.length; d3++) {
          var e12 = c6[d3];
          try {
            var f3 = a3, g2 = b3, h3 = g2;
            a: for (; null !== h3; ) {
              switch (h3.tag) {
                case 5:
                  X = h3.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X = h3.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X = h3.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h3 = h3.return;
            }
            if (null === X) throw Error(p4(160));
            Zj(f3, g2, e12);
            X = null;
            Xj = false;
            var k2 = e12.alternate;
            null !== k2 && (k2.return = null);
            e12.return = null;
          } catch (l3) {
            W(e12, b3, l3);
          }
        }
        if (b3.subtreeFlags & 12854) for (b3 = b3.child; null !== b3; ) dk(b3, a3), b3 = b3.sibling;
      }
      function dk(a3, b3) {
        var c6 = a3.alternate, d3 = a3.flags;
        switch (a3.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b3, a3);
            ek(a3);
            if (d3 & 4) {
              try {
                Pj(3, a3, a3.return), Qj(3, a3);
              } catch (t7) {
                W(a3, a3.return, t7);
              }
              try {
                Pj(5, a3, a3.return);
              } catch (t7) {
                W(a3, a3.return, t7);
              }
            }
            break;
          case 1:
            ck(b3, a3);
            ek(a3);
            d3 & 512 && null !== c6 && Lj(c6, c6.return);
            break;
          case 5:
            ck(b3, a3);
            ek(a3);
            d3 & 512 && null !== c6 && Lj(c6, c6.return);
            if (a3.flags & 32) {
              var e12 = a3.stateNode;
              try {
                ob(e12, "");
              } catch (t7) {
                W(a3, a3.return, t7);
              }
            }
            if (d3 & 4 && (e12 = a3.stateNode, null != e12)) {
              var f3 = a3.memoizedProps, g2 = null !== c6 ? c6.memoizedProps : f3, h3 = a3.type, k2 = a3.updateQueue;
              a3.updateQueue = null;
              if (null !== k2) try {
                "input" === h3 && "radio" === f3.type && null != f3.name && ab(e12, f3);
                vb(h3, g2);
                var l3 = vb(h3, f3);
                for (g2 = 0; g2 < k2.length; g2 += 2) {
                  var m3 = k2[g2], q = k2[g2 + 1];
                  "style" === m3 ? sb(e12, q) : "dangerouslySetInnerHTML" === m3 ? nb(e12, q) : "children" === m3 ? ob(e12, q) : ta(e12, m3, q, l3);
                }
                switch (h3) {
                  case "input":
                    bb(e12, f3);
                    break;
                  case "textarea":
                    ib(e12, f3);
                    break;
                  case "select":
                    var r8 = e12._wrapperState.wasMultiple;
                    e12._wrapperState.wasMultiple = !!f3.multiple;
                    var y3 = f3.value;
                    null != y3 ? fb(e12, !!f3.multiple, y3, false) : r8 !== !!f3.multiple && (null != f3.defaultValue ? fb(
                      e12,
                      !!f3.multiple,
                      f3.defaultValue,
                      true
                    ) : fb(e12, !!f3.multiple, f3.multiple ? [] : "", false));
                }
                e12[Pf] = f3;
              } catch (t7) {
                W(a3, a3.return, t7);
              }
            }
            break;
          case 6:
            ck(b3, a3);
            ek(a3);
            if (d3 & 4) {
              if (null === a3.stateNode) throw Error(p4(162));
              e12 = a3.stateNode;
              f3 = a3.memoizedProps;
              try {
                e12.nodeValue = f3;
              } catch (t7) {
                W(a3, a3.return, t7);
              }
            }
            break;
          case 3:
            ck(b3, a3);
            ek(a3);
            if (d3 & 4 && null !== c6 && c6.memoizedState.isDehydrated) try {
              bd(b3.containerInfo);
            } catch (t7) {
              W(a3, a3.return, t7);
            }
            break;
          case 4:
            ck(b3, a3);
            ek(a3);
            break;
          case 13:
            ck(b3, a3);
            ek(a3);
            e12 = a3.child;
            e12.flags & 8192 && (f3 = null !== e12.memoizedState, e12.stateNode.isHidden = f3, !f3 || null !== e12.alternate && null !== e12.alternate.memoizedState || (fk = B2()));
            d3 & 4 && ak(a3);
            break;
          case 22:
            m3 = null !== c6 && null !== c6.memoizedState;
            a3.mode & 1 ? (U = (l3 = U) || m3, ck(b3, a3), U = l3) : ck(b3, a3);
            ek(a3);
            if (d3 & 8192) {
              l3 = null !== a3.memoizedState;
              if ((a3.stateNode.isHidden = l3) && !m3 && 0 !== (a3.mode & 1)) for (V2 = a3, m3 = a3.child; null !== m3; ) {
                for (q = V2 = m3; null !== V2; ) {
                  r8 = V2;
                  y3 = r8.child;
                  switch (r8.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r8, r8.return);
                      break;
                    case 1:
                      Lj(r8, r8.return);
                      var n9 = r8.stateNode;
                      if ("function" === typeof n9.componentWillUnmount) {
                        d3 = r8;
                        c6 = r8.return;
                        try {
                          b3 = d3, n9.props = b3.memoizedProps, n9.state = b3.memoizedState, n9.componentWillUnmount();
                        } catch (t7) {
                          W(d3, c6, t7);
                        }
                      }
                      break;
                    case 5:
                      Lj(r8, r8.return);
                      break;
                    case 22:
                      if (null !== r8.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y3 ? (y3.return = r8, V2 = y3) : gk(q);
                }
                m3 = m3.sibling;
              }
              a: for (m3 = null, q = a3; ; ) {
                if (5 === q.tag) {
                  if (null === m3) {
                    m3 = q;
                    try {
                      e12 = q.stateNode, l3 ? (f3 = e12.style, "function" === typeof f3.setProperty ? f3.setProperty("display", "none", "important") : f3.display = "none") : (h3 = q.stateNode, k2 = q.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h3.style.display = rb("display", g2));
                    } catch (t7) {
                      W(a3, a3.return, t7);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m3) try {
                    q.stateNode.nodeValue = l3 ? "" : q.memoizedProps;
                  } catch (t7) {
                    W(a3, a3.return, t7);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a3) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a3) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a3) break a;
                  m3 === q && (m3 = null);
                  q = q.return;
                }
                m3 === q && (m3 = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b3, a3);
            ek(a3);
            d3 & 4 && ak(a3);
            break;
          case 21:
            break;
          default:
            ck(
              b3,
              a3
            ), ek(a3);
        }
      }
      function ek(a3) {
        var b3 = a3.flags;
        if (b3 & 2) {
          try {
            a: {
              for (var c6 = a3.return; null !== c6; ) {
                if (Tj(c6)) {
                  var d3 = c6;
                  break a;
                }
                c6 = c6.return;
              }
              throw Error(p4(160));
            }
            switch (d3.tag) {
              case 5:
                var e12 = d3.stateNode;
                d3.flags & 32 && (ob(e12, ""), d3.flags &= -33);
                var f3 = Uj(a3);
                Wj(a3, f3, e12);
                break;
              case 3:
              case 4:
                var g2 = d3.stateNode.containerInfo, h3 = Uj(a3);
                Vj(a3, h3, g2);
                break;
              default:
                throw Error(p4(161));
            }
          } catch (k2) {
            W(a3, a3.return, k2);
          }
          a3.flags &= -3;
        }
        b3 & 4096 && (a3.flags &= -4097);
      }
      function hk(a3, b3, c6) {
        V2 = a3;
        ik(a3, b3, c6);
      }
      function ik(a3, b3, c6) {
        for (var d3 = 0 !== (a3.mode & 1); null !== V2; ) {
          var e12 = V2, f3 = e12.child;
          if (22 === e12.tag && d3) {
            var g2 = null !== e12.memoizedState || Jj;
            if (!g2) {
              var h3 = e12.alternate, k2 = null !== h3 && null !== h3.memoizedState || U;
              h3 = Jj;
              var l3 = U;
              Jj = g2;
              if ((U = k2) && !l3) for (V2 = e12; null !== V2; ) g2 = V2, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e12) : null !== k2 ? (k2.return = g2, V2 = k2) : jk(e12);
              for (; null !== f3; ) V2 = f3, ik(f3, b3, c6), f3 = f3.sibling;
              V2 = e12;
              Jj = h3;
              U = l3;
            }
            kk(a3, b3, c6);
          } else 0 !== (e12.subtreeFlags & 8772) && null !== f3 ? (f3.return = e12, V2 = f3) : kk(a3, b3, c6);
        }
      }
      function kk(a3) {
        for (; null !== V2; ) {
          var b3 = V2;
          if (0 !== (b3.flags & 8772)) {
            var c6 = b3.alternate;
            try {
              if (0 !== (b3.flags & 8772)) switch (b3.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b3);
                  break;
                case 1:
                  var d3 = b3.stateNode;
                  if (b3.flags & 4 && !U) if (null === c6) d3.componentDidMount();
                  else {
                    var e12 = b3.elementType === b3.type ? c6.memoizedProps : Ci(b3.type, c6.memoizedProps);
                    d3.componentDidUpdate(e12, c6.memoizedState, d3.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f3 = b3.updateQueue;
                  null !== f3 && sh(b3, f3, d3);
                  break;
                case 3:
                  var g2 = b3.updateQueue;
                  if (null !== g2) {
                    c6 = null;
                    if (null !== b3.child) switch (b3.child.tag) {
                      case 5:
                        c6 = b3.child.stateNode;
                        break;
                      case 1:
                        c6 = b3.child.stateNode;
                    }
                    sh(b3, g2, c6);
                  }
                  break;
                case 5:
                  var h3 = b3.stateNode;
                  if (null === c6 && b3.flags & 4) {
                    c6 = h3;
                    var k2 = b3.memoizedProps;
                    switch (b3.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k2.autoFocus && c6.focus();
                        break;
                      case "img":
                        k2.src && (c6.src = k2.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b3.memoizedState) {
                    var l3 = b3.alternate;
                    if (null !== l3) {
                      var m3 = l3.memoizedState;
                      if (null !== m3) {
                        var q = m3.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p4(163));
              }
              U || b3.flags & 512 && Rj(b3);
            } catch (r8) {
              W(b3, b3.return, r8);
            }
          }
          if (b3 === a3) {
            V2 = null;
            break;
          }
          c6 = b3.sibling;
          if (null !== c6) {
            c6.return = b3.return;
            V2 = c6;
            break;
          }
          V2 = b3.return;
        }
      }
      function gk(a3) {
        for (; null !== V2; ) {
          var b3 = V2;
          if (b3 === a3) {
            V2 = null;
            break;
          }
          var c6 = b3.sibling;
          if (null !== c6) {
            c6.return = b3.return;
            V2 = c6;
            break;
          }
          V2 = b3.return;
        }
      }
      function jk(a3) {
        for (; null !== V2; ) {
          var b3 = V2;
          try {
            switch (b3.tag) {
              case 0:
              case 11:
              case 15:
                var c6 = b3.return;
                try {
                  Qj(4, b3);
                } catch (k2) {
                  W(b3, c6, k2);
                }
                break;
              case 1:
                var d3 = b3.stateNode;
                if ("function" === typeof d3.componentDidMount) {
                  var e12 = b3.return;
                  try {
                    d3.componentDidMount();
                  } catch (k2) {
                    W(b3, e12, k2);
                  }
                }
                var f3 = b3.return;
                try {
                  Rj(b3);
                } catch (k2) {
                  W(b3, f3, k2);
                }
                break;
              case 5:
                var g2 = b3.return;
                try {
                  Rj(b3);
                } catch (k2) {
                  W(b3, g2, k2);
                }
            }
          } catch (k2) {
            W(b3, b3.return, k2);
          }
          if (b3 === a3) {
            V2 = null;
            break;
          }
          var h3 = b3.sibling;
          if (null !== h3) {
            h3.return = b3.return;
            V2 = h3;
            break;
          }
          V2 = b3.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z2 = 0;
      var fj = 0;
      var ej = Uf(0);
      var T2 = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R2() {
        return 0 !== (K & 6) ? B2() : -1 !== Ak ? Ak : Ak = B2();
      }
      function yi(a3) {
        if (0 === (a3.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z2) return Z2 & -Z2;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a3 = C2;
        if (0 !== a3) return a3;
        a3 = window.event;
        a3 = void 0 === a3 ? 16 : jd(a3.type);
        return a3;
      }
      function gi(a3, b3, c6, d3) {
        if (50 < yk) throw yk = 0, zk = null, Error(p4(185));
        Ac(a3, c6, d3);
        if (0 === (K & 2) || a3 !== Q) a3 === Q && (0 === (K & 2) && (qk |= c6), 4 === T2 && Ck(a3, Z2)), Dk(a3, d3), 1 === c6 && 0 === K && 0 === (b3.mode & 1) && (Gj = B2() + 500, fg && jg());
      }
      function Dk(a3, b3) {
        var c6 = a3.callbackNode;
        wc(a3, b3);
        var d3 = uc(a3, a3 === Q ? Z2 : 0);
        if (0 === d3) null !== c6 && bc(c6), a3.callbackNode = null, a3.callbackPriority = 0;
        else if (b3 = d3 & -d3, a3.callbackPriority !== b3) {
          null != c6 && bc(c6);
          if (1 === b3) 0 === a3.tag ? ig(Ek.bind(null, a3)) : hg(Ek.bind(null, a3)), Jf(function() {
            0 === (K & 6) && jg();
          }), c6 = null;
          else {
            switch (Dc(d3)) {
              case 1:
                c6 = fc;
                break;
              case 4:
                c6 = gc;
                break;
              case 16:
                c6 = hc;
                break;
              case 536870912:
                c6 = jc;
                break;
              default:
                c6 = hc;
            }
            c6 = Fk(c6, Gk.bind(null, a3));
          }
          a3.callbackPriority = b3;
          a3.callbackNode = c6;
        }
      }
      function Gk(a3, b3) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p4(327));
        var c6 = a3.callbackNode;
        if (Hk() && a3.callbackNode !== c6) return null;
        var d3 = uc(a3, a3 === Q ? Z2 : 0);
        if (0 === d3) return null;
        if (0 !== (d3 & 30) || 0 !== (d3 & a3.expiredLanes) || b3) b3 = Ik(a3, d3);
        else {
          b3 = d3;
          var e12 = K;
          K |= 2;
          var f3 = Jk();
          if (Q !== a3 || Z2 !== b3) uk = null, Gj = B2() + 500, Kk(a3, b3);
          do
            try {
              Lk();
              break;
            } catch (h3) {
              Mk(a3, h3);
            }
          while (1);
          $g();
          mk.current = f3;
          K = e12;
          null !== Y ? b3 = 0 : (Q = null, Z2 = 0, b3 = T2);
        }
        if (0 !== b3) {
          2 === b3 && (e12 = xc(a3), 0 !== e12 && (d3 = e12, b3 = Nk(a3, e12)));
          if (1 === b3) throw c6 = pk, Kk(a3, 0), Ck(a3, d3), Dk(a3, B2()), c6;
          if (6 === b3) Ck(a3, d3);
          else {
            e12 = a3.current.alternate;
            if (0 === (d3 & 30) && !Ok(e12) && (b3 = Ik(a3, d3), 2 === b3 && (f3 = xc(a3), 0 !== f3 && (d3 = f3, b3 = Nk(a3, f3))), 1 === b3)) throw c6 = pk, Kk(a3, 0), Ck(a3, d3), Dk(a3, B2()), c6;
            a3.finishedWork = e12;
            a3.finishedLanes = d3;
            switch (b3) {
              case 0:
              case 1:
                throw Error(p4(345));
              case 2:
                Pk(a3, tk, uk);
                break;
              case 3:
                Ck(a3, d3);
                if ((d3 & 130023424) === d3 && (b3 = fk + 500 - B2(), 10 < b3)) {
                  if (0 !== uc(a3, 0)) break;
                  e12 = a3.suspendedLanes;
                  if ((e12 & d3) !== d3) {
                    R2();
                    a3.pingedLanes |= a3.suspendedLanes & e12;
                    break;
                  }
                  a3.timeoutHandle = Ff(Pk.bind(null, a3, tk, uk), b3);
                  break;
                }
                Pk(a3, tk, uk);
                break;
              case 4:
                Ck(a3, d3);
                if ((d3 & 4194240) === d3) break;
                b3 = a3.eventTimes;
                for (e12 = -1; 0 < d3; ) {
                  var g2 = 31 - oc(d3);
                  f3 = 1 << g2;
                  g2 = b3[g2];
                  g2 > e12 && (e12 = g2);
                  d3 &= ~f3;
                }
                d3 = e12;
                d3 = B2() - d3;
                d3 = (120 > d3 ? 120 : 480 > d3 ? 480 : 1080 > d3 ? 1080 : 1920 > d3 ? 1920 : 3e3 > d3 ? 3e3 : 4320 > d3 ? 4320 : 1960 * lk(d3 / 1960)) - d3;
                if (10 < d3) {
                  a3.timeoutHandle = Ff(Pk.bind(null, a3, tk, uk), d3);
                  break;
                }
                Pk(a3, tk, uk);
                break;
              case 5:
                Pk(a3, tk, uk);
                break;
              default:
                throw Error(p4(329));
            }
          }
        }
        Dk(a3, B2());
        return a3.callbackNode === c6 ? Gk.bind(null, a3) : null;
      }
      function Nk(a3, b3) {
        var c6 = sk;
        a3.current.memoizedState.isDehydrated && (Kk(a3, b3).flags |= 256);
        a3 = Ik(a3, b3);
        2 !== a3 && (b3 = tk, tk = c6, null !== b3 && Fj(b3));
        return a3;
      }
      function Fj(a3) {
        null === tk ? tk = a3 : tk.push.apply(tk, a3);
      }
      function Ok(a3) {
        for (var b3 = a3; ; ) {
          if (b3.flags & 16384) {
            var c6 = b3.updateQueue;
            if (null !== c6 && (c6 = c6.stores, null !== c6)) for (var d3 = 0; d3 < c6.length; d3++) {
              var e12 = c6[d3], f3 = e12.getSnapshot;
              e12 = e12.value;
              try {
                if (!He(f3(), e12)) return false;
              } catch (g2) {
                return false;
              }
            }
          }
          c6 = b3.child;
          if (b3.subtreeFlags & 16384 && null !== c6) c6.return = b3, b3 = c6;
          else {
            if (b3 === a3) break;
            for (; null === b3.sibling; ) {
              if (null === b3.return || b3.return === a3) return true;
              b3 = b3.return;
            }
            b3.sibling.return = b3.return;
            b3 = b3.sibling;
          }
        }
        return true;
      }
      function Ck(a3, b3) {
        b3 &= ~rk;
        b3 &= ~qk;
        a3.suspendedLanes |= b3;
        a3.pingedLanes &= ~b3;
        for (a3 = a3.expirationTimes; 0 < b3; ) {
          var c6 = 31 - oc(b3), d3 = 1 << c6;
          a3[c6] = -1;
          b3 &= ~d3;
        }
      }
      function Ek(a3) {
        if (0 !== (K & 6)) throw Error(p4(327));
        Hk();
        var b3 = uc(a3, 0);
        if (0 === (b3 & 1)) return Dk(a3, B2()), null;
        var c6 = Ik(a3, b3);
        if (0 !== a3.tag && 2 === c6) {
          var d3 = xc(a3);
          0 !== d3 && (b3 = d3, c6 = Nk(a3, d3));
        }
        if (1 === c6) throw c6 = pk, Kk(a3, 0), Ck(a3, b3), Dk(a3, B2()), c6;
        if (6 === c6) throw Error(p4(345));
        a3.finishedWork = a3.current.alternate;
        a3.finishedLanes = b3;
        Pk(a3, tk, uk);
        Dk(a3, B2());
        return null;
      }
      function Qk(a3, b3) {
        var c6 = K;
        K |= 1;
        try {
          return a3(b3);
        } finally {
          K = c6, 0 === K && (Gj = B2() + 500, fg && jg());
        }
      }
      function Rk(a3) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b3 = K;
        K |= 1;
        var c6 = ok.transition, d3 = C2;
        try {
          if (ok.transition = null, C2 = 1, a3) return a3();
        } finally {
          C2 = d3, ok.transition = c6, K = b3, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E2(ej);
      }
      function Kk(a3, b3) {
        a3.finishedWork = null;
        a3.finishedLanes = 0;
        var c6 = a3.timeoutHandle;
        -1 !== c6 && (a3.timeoutHandle = -1, Gf(c6));
        if (null !== Y) for (c6 = Y.return; null !== c6; ) {
          var d3 = c6;
          wg(d3);
          switch (d3.tag) {
            case 1:
              d3 = d3.type.childContextTypes;
              null !== d3 && void 0 !== d3 && $f();
              break;
            case 3:
              zh();
              E2(Wf);
              E2(H2);
              Eh();
              break;
            case 5:
              Bh(d3);
              break;
            case 4:
              zh();
              break;
            case 13:
              E2(L2);
              break;
            case 19:
              E2(L2);
              break;
            case 10:
              ah(d3.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c6 = c6.return;
        }
        Q = a3;
        Y = a3 = Pg(a3.current, null);
        Z2 = fj = b3;
        T2 = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b3 = 0; b3 < fh.length; b3++) if (c6 = fh[b3], d3 = c6.interleaved, null !== d3) {
            c6.interleaved = null;
            var e12 = d3.next, f3 = c6.pending;
            if (null !== f3) {
              var g2 = f3.next;
              f3.next = e12;
              d3.next = g2;
            }
            c6.pending = d3;
          }
          fh = null;
        }
        return a3;
      }
      function Mk(a3, b3) {
        do {
          var c6 = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d3 = M3.memoizedState; null !== d3; ) {
                var e12 = d3.queue;
                null !== e12 && (e12.pending = null);
                d3 = d3.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N2 = M3 = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c6 || null === c6.return) {
              T2 = 1;
              pk = b3;
              Y = null;
              break;
            }
            a: {
              var f3 = a3, g2 = c6.return, h3 = c6, k2 = b3;
              b3 = Z2;
              h3.flags |= 32768;
              if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
                var l3 = k2, m3 = h3, q = m3.tag;
                if (0 === (m3.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r8 = m3.alternate;
                  r8 ? (m3.updateQueue = r8.updateQueue, m3.memoizedState = r8.memoizedState, m3.lanes = r8.lanes) : (m3.updateQueue = null, m3.memoizedState = null);
                }
                var y3 = Ui(g2);
                if (null !== y3) {
                  y3.flags &= -257;
                  Vi(y3, g2, h3, f3, b3);
                  y3.mode & 1 && Si(f3, l3, b3);
                  b3 = y3;
                  k2 = l3;
                  var n9 = b3.updateQueue;
                  if (null === n9) {
                    var t7 = /* @__PURE__ */ new Set();
                    t7.add(k2);
                    b3.updateQueue = t7;
                  } else n9.add(k2);
                  break a;
                } else {
                  if (0 === (b3 & 1)) {
                    Si(f3, l3, b3);
                    tj();
                    break a;
                  }
                  k2 = Error(p4(426));
                }
              } else if (I2 && h3.mode & 1) {
                var J = Ui(g2);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g2, h3, f3, b3);
                  Jg(Ji(k2, h3));
                  break a;
                }
              }
              f3 = k2 = Ji(k2, h3);
              4 !== T2 && (T2 = 2);
              null === sk ? sk = [f3] : sk.push(f3);
              f3 = g2;
              do {
                switch (f3.tag) {
                  case 3:
                    f3.flags |= 65536;
                    b3 &= -b3;
                    f3.lanes |= b3;
                    var x2 = Ni(f3, k2, b3);
                    ph(f3, x2);
                    break a;
                  case 1:
                    h3 = k2;
                    var w2 = f3.type, u5 = f3.stateNode;
                    if (0 === (f3.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u5 && "function" === typeof u5.componentDidCatch && (null === Ri || !Ri.has(u5)))) {
                      f3.flags |= 65536;
                      b3 &= -b3;
                      f3.lanes |= b3;
                      var F = Qi(f3, h3, b3);
                      ph(f3, F);
                      break a;
                    }
                }
                f3 = f3.return;
              } while (null !== f3);
            }
            Sk(c6);
          } catch (na) {
            b3 = na;
            Y === c6 && null !== c6 && (Y = c6 = c6.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a3 = mk.current;
        mk.current = Rh;
        return null === a3 ? Rh : a3;
      }
      function tj() {
        if (0 === T2 || 3 === T2 || 2 === T2) T2 = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z2);
      }
      function Ik(a3, b3) {
        var c6 = K;
        K |= 2;
        var d3 = Jk();
        if (Q !== a3 || Z2 !== b3) uk = null, Kk(a3, b3);
        do
          try {
            Tk();
            break;
          } catch (e12) {
            Mk(a3, e12);
          }
        while (1);
        $g();
        K = c6;
        mk.current = d3;
        if (null !== Y) throw Error(p4(261));
        Q = null;
        Z2 = 0;
        return T2;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a3) {
        var b3 = Vk(a3.alternate, a3, fj);
        a3.memoizedProps = a3.pendingProps;
        null === b3 ? Sk(a3) : Y = b3;
        nk.current = null;
      }
      function Sk(a3) {
        var b3 = a3;
        do {
          var c6 = b3.alternate;
          a3 = b3.return;
          if (0 === (b3.flags & 32768)) {
            if (c6 = Ej(c6, b3, fj), null !== c6) {
              Y = c6;
              return;
            }
          } else {
            c6 = Ij(c6, b3);
            if (null !== c6) {
              c6.flags &= 32767;
              Y = c6;
              return;
            }
            if (null !== a3) a3.flags |= 32768, a3.subtreeFlags = 0, a3.deletions = null;
            else {
              T2 = 6;
              Y = null;
              return;
            }
          }
          b3 = b3.sibling;
          if (null !== b3) {
            Y = b3;
            return;
          }
          Y = b3 = a3;
        } while (null !== b3);
        0 === T2 && (T2 = 5);
      }
      function Pk(a3, b3, c6) {
        var d3 = C2, e12 = ok.transition;
        try {
          ok.transition = null, C2 = 1, Wk(a3, b3, c6, d3);
        } finally {
          ok.transition = e12, C2 = d3;
        }
        return null;
      }
      function Wk(a3, b3, c6, d3) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p4(327));
        c6 = a3.finishedWork;
        var e12 = a3.finishedLanes;
        if (null === c6) return null;
        a3.finishedWork = null;
        a3.finishedLanes = 0;
        if (c6 === a3.current) throw Error(p4(177));
        a3.callbackNode = null;
        a3.callbackPriority = 0;
        var f3 = c6.lanes | c6.childLanes;
        Bc(a3, f3);
        a3 === Q && (Y = Q = null, Z2 = 0);
        0 === (c6.subtreeFlags & 2064) && 0 === (c6.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f3 = 0 !== (c6.flags & 15990);
        if (0 !== (c6.subtreeFlags & 15990) || f3) {
          f3 = ok.transition;
          ok.transition = null;
          var g2 = C2;
          C2 = 1;
          var h3 = K;
          K |= 4;
          nk.current = null;
          Oj(a3, c6);
          dk(c6, a3);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a3.current = c6;
          hk(c6, a3, e12);
          dc();
          K = h3;
          C2 = g2;
          ok.transition = f3;
        } else a3.current = c6;
        vk && (vk = false, wk = a3, xk = e12);
        f3 = a3.pendingLanes;
        0 === f3 && (Ri = null);
        mc(c6.stateNode, d3);
        Dk(a3, B2());
        if (null !== b3) for (d3 = a3.onRecoverableError, c6 = 0; c6 < b3.length; c6++) e12 = b3[c6], d3(e12.value, { componentStack: e12.stack, digest: e12.digest });
        if (Oi) throw Oi = false, a3 = Pi, Pi = null, a3;
        0 !== (xk & 1) && 0 !== a3.tag && Hk();
        f3 = a3.pendingLanes;
        0 !== (f3 & 1) ? a3 === zk ? yk++ : (yk = 0, zk = a3) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a3 = Dc(xk), b3 = ok.transition, c6 = C2;
          try {
            ok.transition = null;
            C2 = 16 > a3 ? 16 : a3;
            if (null === wk) var d3 = false;
            else {
              a3 = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p4(331));
              var e12 = K;
              K |= 4;
              for (V2 = a3.current; null !== V2; ) {
                var f3 = V2, g2 = f3.child;
                if (0 !== (V2.flags & 16)) {
                  var h3 = f3.deletions;
                  if (null !== h3) {
                    for (var k2 = 0; k2 < h3.length; k2++) {
                      var l3 = h3[k2];
                      for (V2 = l3; null !== V2; ) {
                        var m3 = V2;
                        switch (m3.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m3, f3);
                        }
                        var q = m3.child;
                        if (null !== q) q.return = m3, V2 = q;
                        else for (; null !== V2; ) {
                          m3 = V2;
                          var r8 = m3.sibling, y3 = m3.return;
                          Sj(m3);
                          if (m3 === l3) {
                            V2 = null;
                            break;
                          }
                          if (null !== r8) {
                            r8.return = y3;
                            V2 = r8;
                            break;
                          }
                          V2 = y3;
                        }
                      }
                    }
                    var n9 = f3.alternate;
                    if (null !== n9) {
                      var t7 = n9.child;
                      if (null !== t7) {
                        n9.child = null;
                        do {
                          var J = t7.sibling;
                          t7.sibling = null;
                          t7 = J;
                        } while (null !== t7);
                      }
                    }
                    V2 = f3;
                  }
                }
                if (0 !== (f3.subtreeFlags & 2064) && null !== g2) g2.return = f3, V2 = g2;
                else b: for (; null !== V2; ) {
                  f3 = V2;
                  if (0 !== (f3.flags & 2048)) switch (f3.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f3, f3.return);
                  }
                  var x2 = f3.sibling;
                  if (null !== x2) {
                    x2.return = f3.return;
                    V2 = x2;
                    break b;
                  }
                  V2 = f3.return;
                }
              }
              var w2 = a3.current;
              for (V2 = w2; null !== V2; ) {
                g2 = V2;
                var u5 = g2.child;
                if (0 !== (g2.subtreeFlags & 2064) && null !== u5) u5.return = g2, V2 = u5;
                else b: for (g2 = w2; null !== V2; ) {
                  h3 = V2;
                  if (0 !== (h3.flags & 2048)) try {
                    switch (h3.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h3);
                    }
                  } catch (na) {
                    W(h3, h3.return, na);
                  }
                  if (h3 === g2) {
                    V2 = null;
                    break b;
                  }
                  var F = h3.sibling;
                  if (null !== F) {
                    F.return = h3.return;
                    V2 = F;
                    break b;
                  }
                  V2 = h3.return;
                }
              }
              K = e12;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a3);
              } catch (na) {
              }
              d3 = true;
            }
            return d3;
          } finally {
            C2 = c6, ok.transition = b3;
          }
        }
        return false;
      }
      function Xk(a3, b3, c6) {
        b3 = Ji(c6, b3);
        b3 = Ni(a3, b3, 1);
        a3 = nh(a3, b3, 1);
        b3 = R2();
        null !== a3 && (Ac(a3, 1, b3), Dk(a3, b3));
      }
      function W(a3, b3, c6) {
        if (3 === a3.tag) Xk(a3, a3, c6);
        else for (; null !== b3; ) {
          if (3 === b3.tag) {
            Xk(b3, a3, c6);
            break;
          } else if (1 === b3.tag) {
            var d3 = b3.stateNode;
            if ("function" === typeof b3.type.getDerivedStateFromError || "function" === typeof d3.componentDidCatch && (null === Ri || !Ri.has(d3))) {
              a3 = Ji(c6, a3);
              a3 = Qi(b3, a3, 1);
              b3 = nh(b3, a3, 1);
              a3 = R2();
              null !== b3 && (Ac(b3, 1, a3), Dk(b3, a3));
              break;
            }
          }
          b3 = b3.return;
        }
      }
      function Ti(a3, b3, c6) {
        var d3 = a3.pingCache;
        null !== d3 && d3.delete(b3);
        b3 = R2();
        a3.pingedLanes |= a3.suspendedLanes & c6;
        Q === a3 && (Z2 & c6) === c6 && (4 === T2 || 3 === T2 && (Z2 & 130023424) === Z2 && 500 > B2() - fk ? Kk(a3, 0) : rk |= c6);
        Dk(a3, b3);
      }
      function Yk(a3, b3) {
        0 === b3 && (0 === (a3.mode & 1) ? b3 = 1 : (b3 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c6 = R2();
        a3 = ih(a3, b3);
        null !== a3 && (Ac(a3, b3, c6), Dk(a3, c6));
      }
      function uj(a3) {
        var b3 = a3.memoizedState, c6 = 0;
        null !== b3 && (c6 = b3.retryLane);
        Yk(a3, c6);
      }
      function bk(a3, b3) {
        var c6 = 0;
        switch (a3.tag) {
          case 13:
            var d3 = a3.stateNode;
            var e12 = a3.memoizedState;
            null !== e12 && (c6 = e12.retryLane);
            break;
          case 19:
            d3 = a3.stateNode;
            break;
          default:
            throw Error(p4(314));
        }
        null !== d3 && d3.delete(b3);
        Yk(a3, c6);
      }
      var Vk;
      Vk = function(a3, b3, c6) {
        if (null !== a3) if (a3.memoizedProps !== b3.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a3.lanes & c6) && 0 === (b3.flags & 128)) return dh = false, yj(a3, b3, c6);
          dh = 0 !== (a3.flags & 131072) ? true : false;
        }
        else dh = false, I2 && 0 !== (b3.flags & 1048576) && ug(b3, ng, b3.index);
        b3.lanes = 0;
        switch (b3.tag) {
          case 2:
            var d3 = b3.type;
            ij(a3, b3);
            a3 = b3.pendingProps;
            var e12 = Yf(b3, H2.current);
            ch(b3, c6);
            e12 = Nh(null, b3, d3, a3, e12, c6);
            var f3 = Sh();
            b3.flags |= 1;
            "object" === typeof e12 && null !== e12 && "function" === typeof e12.render && void 0 === e12.$$typeof ? (b3.tag = 1, b3.memoizedState = null, b3.updateQueue = null, Zf(d3) ? (f3 = true, cg(b3)) : f3 = false, b3.memoizedState = null !== e12.state && void 0 !== e12.state ? e12.state : null, kh(b3), e12.updater = Ei, b3.stateNode = e12, e12._reactInternals = b3, Ii(b3, d3, a3, c6), b3 = jj(null, b3, d3, true, f3, c6)) : (b3.tag = 0, I2 && f3 && vg(b3), Xi(null, b3, e12, c6), b3 = b3.child);
            return b3;
          case 16:
            d3 = b3.elementType;
            a: {
              ij(a3, b3);
              a3 = b3.pendingProps;
              e12 = d3._init;
              d3 = e12(d3._payload);
              b3.type = d3;
              e12 = b3.tag = Zk(d3);
              a3 = Ci(d3, a3);
              switch (e12) {
                case 0:
                  b3 = cj(null, b3, d3, a3, c6);
                  break a;
                case 1:
                  b3 = hj(null, b3, d3, a3, c6);
                  break a;
                case 11:
                  b3 = Yi(null, b3, d3, a3, c6);
                  break a;
                case 14:
                  b3 = $i(null, b3, d3, Ci(d3.type, a3), c6);
                  break a;
              }
              throw Error(p4(
                306,
                d3,
                ""
              ));
            }
            return b3;
          case 0:
            return d3 = b3.type, e12 = b3.pendingProps, e12 = b3.elementType === d3 ? e12 : Ci(d3, e12), cj(a3, b3, d3, e12, c6);
          case 1:
            return d3 = b3.type, e12 = b3.pendingProps, e12 = b3.elementType === d3 ? e12 : Ci(d3, e12), hj(a3, b3, d3, e12, c6);
          case 3:
            a: {
              kj(b3);
              if (null === a3) throw Error(p4(387));
              d3 = b3.pendingProps;
              f3 = b3.memoizedState;
              e12 = f3.element;
              lh(a3, b3);
              qh(b3, d3, null, c6);
              var g2 = b3.memoizedState;
              d3 = g2.element;
              if (f3.isDehydrated) if (f3 = { element: d3, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b3.updateQueue.baseState = f3, b3.memoizedState = f3, b3.flags & 256) {
                e12 = Ji(Error(p4(423)), b3);
                b3 = lj(a3, b3, d3, c6, e12);
                break a;
              } else if (d3 !== e12) {
                e12 = Ji(Error(p4(424)), b3);
                b3 = lj(a3, b3, d3, c6, e12);
                break a;
              } else for (yg = Lf(b3.stateNode.containerInfo.firstChild), xg = b3, I2 = true, zg = null, c6 = Vg(b3, null, d3, c6), b3.child = c6; c6; ) c6.flags = c6.flags & -3 | 4096, c6 = c6.sibling;
              else {
                Ig();
                if (d3 === e12) {
                  b3 = Zi(a3, b3, c6);
                  break a;
                }
                Xi(a3, b3, d3, c6);
              }
              b3 = b3.child;
            }
            return b3;
          case 5:
            return Ah(b3), null === a3 && Eg(b3), d3 = b3.type, e12 = b3.pendingProps, f3 = null !== a3 ? a3.memoizedProps : null, g2 = e12.children, Ef(d3, e12) ? g2 = null : null !== f3 && Ef(d3, f3) && (b3.flags |= 32), gj(a3, b3), Xi(a3, b3, g2, c6), b3.child;
          case 6:
            return null === a3 && Eg(b3), null;
          case 13:
            return oj(a3, b3, c6);
          case 4:
            return yh(b3, b3.stateNode.containerInfo), d3 = b3.pendingProps, null === a3 ? b3.child = Ug(b3, null, d3, c6) : Xi(a3, b3, d3, c6), b3.child;
          case 11:
            return d3 = b3.type, e12 = b3.pendingProps, e12 = b3.elementType === d3 ? e12 : Ci(d3, e12), Yi(a3, b3, d3, e12, c6);
          case 7:
            return Xi(a3, b3, b3.pendingProps, c6), b3.child;
          case 8:
            return Xi(a3, b3, b3.pendingProps.children, c6), b3.child;
          case 12:
            return Xi(a3, b3, b3.pendingProps.children, c6), b3.child;
          case 10:
            a: {
              d3 = b3.type._context;
              e12 = b3.pendingProps;
              f3 = b3.memoizedProps;
              g2 = e12.value;
              G(Wg, d3._currentValue);
              d3._currentValue = g2;
              if (null !== f3) if (He(f3.value, g2)) {
                if (f3.children === e12.children && !Wf.current) {
                  b3 = Zi(a3, b3, c6);
                  break a;
                }
              } else for (f3 = b3.child, null !== f3 && (f3.return = b3); null !== f3; ) {
                var h3 = f3.dependencies;
                if (null !== h3) {
                  g2 = f3.child;
                  for (var k2 = h3.firstContext; null !== k2; ) {
                    if (k2.context === d3) {
                      if (1 === f3.tag) {
                        k2 = mh(-1, c6 & -c6);
                        k2.tag = 2;
                        var l3 = f3.updateQueue;
                        if (null !== l3) {
                          l3 = l3.shared;
                          var m3 = l3.pending;
                          null === m3 ? k2.next = k2 : (k2.next = m3.next, m3.next = k2);
                          l3.pending = k2;
                        }
                      }
                      f3.lanes |= c6;
                      k2 = f3.alternate;
                      null !== k2 && (k2.lanes |= c6);
                      bh(
                        f3.return,
                        c6,
                        b3
                      );
                      h3.lanes |= c6;
                      break;
                    }
                    k2 = k2.next;
                  }
                } else if (10 === f3.tag) g2 = f3.type === b3.type ? null : f3.child;
                else if (18 === f3.tag) {
                  g2 = f3.return;
                  if (null === g2) throw Error(p4(341));
                  g2.lanes |= c6;
                  h3 = g2.alternate;
                  null !== h3 && (h3.lanes |= c6);
                  bh(g2, c6, b3);
                  g2 = f3.sibling;
                } else g2 = f3.child;
                if (null !== g2) g2.return = f3;
                else for (g2 = f3; null !== g2; ) {
                  if (g2 === b3) {
                    g2 = null;
                    break;
                  }
                  f3 = g2.sibling;
                  if (null !== f3) {
                    f3.return = g2.return;
                    g2 = f3;
                    break;
                  }
                  g2 = g2.return;
                }
                f3 = g2;
              }
              Xi(a3, b3, e12.children, c6);
              b3 = b3.child;
            }
            return b3;
          case 9:
            return e12 = b3.type, d3 = b3.pendingProps.children, ch(b3, c6), e12 = eh(e12), d3 = d3(e12), b3.flags |= 1, Xi(a3, b3, d3, c6), b3.child;
          case 14:
            return d3 = b3.type, e12 = Ci(d3, b3.pendingProps), e12 = Ci(d3.type, e12), $i(a3, b3, d3, e12, c6);
          case 15:
            return bj(a3, b3, b3.type, b3.pendingProps, c6);
          case 17:
            return d3 = b3.type, e12 = b3.pendingProps, e12 = b3.elementType === d3 ? e12 : Ci(d3, e12), ij(a3, b3), b3.tag = 1, Zf(d3) ? (a3 = true, cg(b3)) : a3 = false, ch(b3, c6), Gi(b3, d3, e12), Ii(b3, d3, e12, c6), jj(null, b3, d3, true, a3, c6);
          case 19:
            return xj(a3, b3, c6);
          case 22:
            return dj(a3, b3, c6);
        }
        throw Error(p4(156, b3.tag));
      };
      function Fk(a3, b3) {
        return ac(a3, b3);
      }
      function $k(a3, b3, c6, d3) {
        this.tag = a3;
        this.key = c6;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b3;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d3;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a3, b3, c6, d3) {
        return new $k(a3, b3, c6, d3);
      }
      function aj(a3) {
        a3 = a3.prototype;
        return !(!a3 || !a3.isReactComponent);
      }
      function Zk(a3) {
        if ("function" === typeof a3) return aj(a3) ? 1 : 0;
        if (void 0 !== a3 && null !== a3) {
          a3 = a3.$$typeof;
          if (a3 === Da) return 11;
          if (a3 === Ga) return 14;
        }
        return 2;
      }
      function Pg(a3, b3) {
        var c6 = a3.alternate;
        null === c6 ? (c6 = Bg(a3.tag, b3, a3.key, a3.mode), c6.elementType = a3.elementType, c6.type = a3.type, c6.stateNode = a3.stateNode, c6.alternate = a3, a3.alternate = c6) : (c6.pendingProps = b3, c6.type = a3.type, c6.flags = 0, c6.subtreeFlags = 0, c6.deletions = null);
        c6.flags = a3.flags & 14680064;
        c6.childLanes = a3.childLanes;
        c6.lanes = a3.lanes;
        c6.child = a3.child;
        c6.memoizedProps = a3.memoizedProps;
        c6.memoizedState = a3.memoizedState;
        c6.updateQueue = a3.updateQueue;
        b3 = a3.dependencies;
        c6.dependencies = null === b3 ? null : { lanes: b3.lanes, firstContext: b3.firstContext };
        c6.sibling = a3.sibling;
        c6.index = a3.index;
        c6.ref = a3.ref;
        return c6;
      }
      function Rg(a3, b3, c6, d3, e12, f3) {
        var g2 = 2;
        d3 = a3;
        if ("function" === typeof a3) aj(a3) && (g2 = 1);
        else if ("string" === typeof a3) g2 = 5;
        else a: switch (a3) {
          case ya:
            return Tg(c6.children, e12, f3, b3);
          case za:
            g2 = 8;
            e12 |= 8;
            break;
          case Aa:
            return a3 = Bg(12, c6, b3, e12 | 2), a3.elementType = Aa, a3.lanes = f3, a3;
          case Ea:
            return a3 = Bg(13, c6, b3, e12), a3.elementType = Ea, a3.lanes = f3, a3;
          case Fa:
            return a3 = Bg(19, c6, b3, e12), a3.elementType = Fa, a3.lanes = f3, a3;
          case Ia:
            return pj(c6, e12, f3, b3);
          default:
            if ("object" === typeof a3 && null !== a3) switch (a3.$$typeof) {
              case Ba:
                g2 = 10;
                break a;
              case Ca:
                g2 = 9;
                break a;
              case Da:
                g2 = 11;
                break a;
              case Ga:
                g2 = 14;
                break a;
              case Ha:
                g2 = 16;
                d3 = null;
                break a;
            }
            throw Error(p4(130, null == a3 ? a3 : typeof a3, ""));
        }
        b3 = Bg(g2, c6, b3, e12);
        b3.elementType = a3;
        b3.type = d3;
        b3.lanes = f3;
        return b3;
      }
      function Tg(a3, b3, c6, d3) {
        a3 = Bg(7, a3, d3, b3);
        a3.lanes = c6;
        return a3;
      }
      function pj(a3, b3, c6, d3) {
        a3 = Bg(22, a3, d3, b3);
        a3.elementType = Ia;
        a3.lanes = c6;
        a3.stateNode = { isHidden: false };
        return a3;
      }
      function Qg(a3, b3, c6) {
        a3 = Bg(6, a3, null, b3);
        a3.lanes = c6;
        return a3;
      }
      function Sg(a3, b3, c6) {
        b3 = Bg(4, null !== a3.children ? a3.children : [], a3.key, b3);
        b3.lanes = c6;
        b3.stateNode = { containerInfo: a3.containerInfo, pendingChildren: null, implementation: a3.implementation };
        return b3;
      }
      function al(a3, b3, c6, d3, e12) {
        this.tag = b3;
        this.containerInfo = a3;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d3;
        this.onRecoverableError = e12;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a3, b3, c6, d3, e12, f3, g2, h3, k2) {
        a3 = new al(a3, b3, c6, h3, k2);
        1 === b3 ? (b3 = 1, true === f3 && (b3 |= 8)) : b3 = 0;
        f3 = Bg(3, null, null, b3);
        a3.current = f3;
        f3.stateNode = a3;
        f3.memoizedState = { element: d3, isDehydrated: c6, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f3);
        return a3;
      }
      function cl(a3, b3, c6) {
        var d3 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d3 ? null : "" + d3, children: a3, containerInfo: b3, implementation: c6 };
      }
      function dl(a3) {
        if (!a3) return Vf;
        a3 = a3._reactInternals;
        a: {
          if (Vb(a3) !== a3 || 1 !== a3.tag) throw Error(p4(170));
          var b3 = a3;
          do {
            switch (b3.tag) {
              case 3:
                b3 = b3.stateNode.context;
                break a;
              case 1:
                if (Zf(b3.type)) {
                  b3 = b3.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b3 = b3.return;
          } while (null !== b3);
          throw Error(p4(171));
        }
        if (1 === a3.tag) {
          var c6 = a3.type;
          if (Zf(c6)) return bg(a3, c6, b3);
        }
        return b3;
      }
      function el(a3, b3, c6, d3, e12, f3, g2, h3, k2) {
        a3 = bl(c6, d3, true, a3, e12, f3, g2, h3, k2);
        a3.context = dl(null);
        c6 = a3.current;
        d3 = R2();
        e12 = yi(c6);
        f3 = mh(d3, e12);
        f3.callback = void 0 !== b3 && null !== b3 ? b3 : null;
        nh(c6, f3, e12);
        a3.current.lanes = e12;
        Ac(a3, e12, d3);
        Dk(a3, d3);
        return a3;
      }
      function fl(a3, b3, c6, d3) {
        var e12 = b3.current, f3 = R2(), g2 = yi(e12);
        c6 = dl(c6);
        null === b3.context ? b3.context = c6 : b3.pendingContext = c6;
        b3 = mh(f3, g2);
        b3.payload = { element: a3 };
        d3 = void 0 === d3 ? null : d3;
        null !== d3 && (b3.callback = d3);
        a3 = nh(e12, b3, g2);
        null !== a3 && (gi(a3, e12, g2, f3), oh(a3, e12, g2));
        return g2;
      }
      function gl(a3) {
        a3 = a3.current;
        if (!a3.child) return null;
        switch (a3.child.tag) {
          case 5:
            return a3.child.stateNode;
          default:
            return a3.child.stateNode;
        }
      }
      function hl(a3, b3) {
        a3 = a3.memoizedState;
        if (null !== a3 && null !== a3.dehydrated) {
          var c6 = a3.retryLane;
          a3.retryLane = 0 !== c6 && c6 < b3 ? c6 : b3;
        }
      }
      function il(a3, b3) {
        hl(a3, b3);
        (a3 = a3.alternate) && hl(a3, b3);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a3) {
        console.error(a3);
      };
      function ll(a3) {
        this._internalRoot = a3;
      }
      ml.prototype.render = ll.prototype.render = function(a3) {
        var b3 = this._internalRoot;
        if (null === b3) throw Error(p4(409));
        fl(a3, b3, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a3 = this._internalRoot;
        if (null !== a3) {
          this._internalRoot = null;
          var b3 = a3.containerInfo;
          Rk(function() {
            fl(null, a3, null, null);
          });
          b3[uf] = null;
        }
      };
      function ml(a3) {
        this._internalRoot = a3;
      }
      ml.prototype.unstable_scheduleHydration = function(a3) {
        if (a3) {
          var b3 = Hc();
          a3 = { blockedOn: null, target: a3, priority: b3 };
          for (var c6 = 0; c6 < Qc.length && 0 !== b3 && b3 < Qc[c6].priority; c6++) ;
          Qc.splice(c6, 0, a3);
          0 === c6 && Vc(a3);
        }
      };
      function nl(a3) {
        return !(!a3 || 1 !== a3.nodeType && 9 !== a3.nodeType && 11 !== a3.nodeType);
      }
      function ol(a3) {
        return !(!a3 || 1 !== a3.nodeType && 9 !== a3.nodeType && 11 !== a3.nodeType && (8 !== a3.nodeType || " react-mount-point-unstable " !== a3.nodeValue));
      }
      function pl() {
      }
      function ql(a3, b3, c6, d3, e12) {
        if (e12) {
          if ("function" === typeof d3) {
            var f3 = d3;
            d3 = function() {
              var a4 = gl(g2);
              f3.call(a4);
            };
          }
          var g2 = el(b3, d3, a3, 0, null, false, false, "", pl);
          a3._reactRootContainer = g2;
          a3[uf] = g2.current;
          sf(8 === a3.nodeType ? a3.parentNode : a3);
          Rk();
          return g2;
        }
        for (; e12 = a3.lastChild; ) a3.removeChild(e12);
        if ("function" === typeof d3) {
          var h3 = d3;
          d3 = function() {
            var a4 = gl(k2);
            h3.call(a4);
          };
        }
        var k2 = bl(a3, 0, false, null, null, false, false, "", pl);
        a3._reactRootContainer = k2;
        a3[uf] = k2.current;
        sf(8 === a3.nodeType ? a3.parentNode : a3);
        Rk(function() {
          fl(b3, k2, c6, d3);
        });
        return k2;
      }
      function rl(a3, b3, c6, d3, e12) {
        var f3 = c6._reactRootContainer;
        if (f3) {
          var g2 = f3;
          if ("function" === typeof e12) {
            var h3 = e12;
            e12 = function() {
              var a4 = gl(g2);
              h3.call(a4);
            };
          }
          fl(b3, g2, a3, e12);
        } else g2 = ql(c6, b3, a3, e12, d3);
        return gl(g2);
      }
      Ec = function(a3) {
        switch (a3.tag) {
          case 3:
            var b3 = a3.stateNode;
            if (b3.current.memoizedState.isDehydrated) {
              var c6 = tc(b3.pendingLanes);
              0 !== c6 && (Cc(b3, c6 | 1), Dk(b3, B2()), 0 === (K & 6) && (Gj = B2() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b4 = ih(a3, 1);
              if (null !== b4) {
                var c7 = R2();
                gi(b4, a3, 1, c7);
              }
            }), il(a3, 1);
        }
      };
      Fc = function(a3) {
        if (13 === a3.tag) {
          var b3 = ih(a3, 134217728);
          if (null !== b3) {
            var c6 = R2();
            gi(b3, a3, 134217728, c6);
          }
          il(a3, 134217728);
        }
      };
      Gc = function(a3) {
        if (13 === a3.tag) {
          var b3 = yi(a3), c6 = ih(a3, b3);
          if (null !== c6) {
            var d3 = R2();
            gi(c6, a3, b3, d3);
          }
          il(a3, b3);
        }
      };
      Hc = function() {
        return C2;
      };
      Ic = function(a3, b3) {
        var c6 = C2;
        try {
          return C2 = a3, b3();
        } finally {
          C2 = c6;
        }
      };
      yb = function(a3, b3, c6) {
        switch (b3) {
          case "input":
            bb(a3, c6);
            b3 = c6.name;
            if ("radio" === c6.type && null != b3) {
              for (c6 = a3; c6.parentNode; ) c6 = c6.parentNode;
              c6 = c6.querySelectorAll("input[name=" + JSON.stringify("" + b3) + '][type="radio"]');
              for (b3 = 0; b3 < c6.length; b3++) {
                var d3 = c6[b3];
                if (d3 !== a3 && d3.form === a3.form) {
                  var e12 = Db(d3);
                  if (!e12) throw Error(p4(90));
                  Wa(d3);
                  bb(d3, e12);
                }
              }
            }
            break;
          case "textarea":
            ib(a3, c6);
            break;
          case "select":
            b3 = c6.value, null != b3 && fb(a3, !!c6.multiple, b3, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a3) {
        a3 = Zb(a3);
        return null === a3 ? null : a3.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a3) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a3, b3) {
        var c6 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b3)) throw Error(p4(200));
        return cl(a3, b3, null, c6);
      };
      exports.createRoot = function(a3, b3) {
        if (!nl(a3)) throw Error(p4(299));
        var c6 = false, d3 = "", e12 = kl;
        null !== b3 && void 0 !== b3 && (true === b3.unstable_strictMode && (c6 = true), void 0 !== b3.identifierPrefix && (d3 = b3.identifierPrefix), void 0 !== b3.onRecoverableError && (e12 = b3.onRecoverableError));
        b3 = bl(a3, 1, false, null, null, c6, false, d3, e12);
        a3[uf] = b3.current;
        sf(8 === a3.nodeType ? a3.parentNode : a3);
        return new ll(b3);
      };
      exports.findDOMNode = function(a3) {
        if (null == a3) return null;
        if (1 === a3.nodeType) return a3;
        var b3 = a3._reactInternals;
        if (void 0 === b3) {
          if ("function" === typeof a3.render) throw Error(p4(188));
          a3 = Object.keys(a3).join(",");
          throw Error(p4(268, a3));
        }
        a3 = Zb(b3);
        a3 = null === a3 ? null : a3.stateNode;
        return a3;
      };
      exports.flushSync = function(a3) {
        return Rk(a3);
      };
      exports.hydrate = function(a3, b3, c6) {
        if (!ol(b3)) throw Error(p4(200));
        return rl(null, a3, b3, true, c6);
      };
      exports.hydrateRoot = function(a3, b3, c6) {
        if (!nl(a3)) throw Error(p4(405));
        var d3 = null != c6 && c6.hydratedSources || null, e12 = false, f3 = "", g2 = kl;
        null !== c6 && void 0 !== c6 && (true === c6.unstable_strictMode && (e12 = true), void 0 !== c6.identifierPrefix && (f3 = c6.identifierPrefix), void 0 !== c6.onRecoverableError && (g2 = c6.onRecoverableError));
        b3 = el(b3, null, a3, 1, null != c6 ? c6 : null, e12, false, f3, g2);
        a3[uf] = b3.current;
        sf(a3);
        if (d3) for (a3 = 0; a3 < d3.length; a3++) c6 = d3[a3], e12 = c6._getVersion, e12 = e12(c6._source), null == b3.mutableSourceEagerHydrationData ? b3.mutableSourceEagerHydrationData = [c6, e12] : b3.mutableSourceEagerHydrationData.push(
          c6,
          e12
        );
        return new ml(b3);
      };
      exports.render = function(a3, b3, c6) {
        if (!ol(b3)) throw Error(p4(200));
        return rl(null, a3, b3, false, c6);
      };
      exports.unmountComponentAtNode = function(a3) {
        if (!ol(a3)) throw Error(p4(40));
        return a3._reactRootContainer ? (Rk(function() {
          rl(null, null, a3, false, function() {
            a3._reactRootContainer = null;
            a3[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a3, b3, c6, d3) {
        if (!ol(c6)) throw Error(p4(200));
        if (null == a3 || void 0 === a3._reactInternals) throw Error(p4(38));
        return rl(a3, b3, c6, false, d3);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m3 = require_react_dom();
      if (true) {
        exports.createRoot = m3.createRoot;
        exports.hydrateRoot = m3.hydrateRoot;
      } else {
        i7 = m3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c6, o9) {
          i7.usingClientEntryPoint = true;
          try {
            return m3.createRoot(c6, o9);
          } finally {
            i7.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c6, h3, o9) {
          i7.usingClientEntryPoint = true;
          try {
            return m3.hydrateRoot(c6, h3, o9);
          } finally {
            i7.usingClientEntryPoint = false;
          }
        };
      }
      var i7;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f3 = require_react();
      var k2 = Symbol.for("react.element");
      var l3 = Symbol.for("react.fragment");
      var m3 = Object.prototype.hasOwnProperty;
      var n9 = f3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p4 = { key: true, ref: true, __self: true, __source: true };
      function q(c6, a3, g2) {
        var b3, d3 = {}, e12 = null, h3 = null;
        void 0 !== g2 && (e12 = "" + g2);
        void 0 !== a3.key && (e12 = "" + a3.key);
        void 0 !== a3.ref && (h3 = a3.ref);
        for (b3 in a3) m3.call(a3, b3) && !p4.hasOwnProperty(b3) && (d3[b3] = a3[b3]);
        if (c6 && c6.defaultProps) for (b3 in a3 = c6.defaultProps, a3) void 0 === d3[b3] && (d3[b3] = a3[b3]);
        return { $$typeof: k2, type: c6, key: e12, ref: h3, props: d3, _owner: n9.current };
      }
      exports.Fragment = l3;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // src/webview/react/boot/environmentEditorEntry.tsx
  var import_client = __toESM(require_client());

  // src/webview/react/pages/EnvironmentEditor.tsx
  var import_react77 = __toESM(require_react());

  // src/webview/react/hooks/useSyncSelectValue.ts
  var import_react = __toESM(require_react());
  function useSyncSelectValue(controlId, currentValue, onChange) {
    (0, import_react.useEffect)(() => {
      const selector = `[data-control-id="${controlId}"] vscode-single-select`;
      const el = document.querySelector(selector);
      if (!el) return;
      const sync = () => {
        const val = el.value;
        if (val !== currentValue) {
          onChange(val);
        }
      };
      sync();
      el.addEventListener("change", sync);
      el.addEventListener("input", sync);
      return () => {
        el.removeEventListener("change", sync);
        el.removeEventListener("input", sync);
      };
    }, [controlId, currentValue, onChange]);
  }

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeBadge.js
  var import_react2 = __toESM(require_react(), 1);

  // node_modules/@lit/react/create-component.js
  var e = /* @__PURE__ */ new Set(["children", "localName", "ref", "style", "className"]);
  var n = /* @__PURE__ */ new WeakMap();
  var t = (e12, t7, o9, l3, a3) => {
    const s8 = a3 == null ? void 0 : a3[t7];
    void 0 === s8 ? (e12[t7] = o9, null == o9 && t7 in HTMLElement.prototype && e12.removeAttribute(t7)) : o9 !== l3 && ((e13, t8, o10) => {
      let l4 = n.get(e13);
      void 0 === l4 && n.set(e13, l4 = /* @__PURE__ */ new Map());
      let a4 = l4.get(t8);
      void 0 !== o10 ? void 0 === a4 ? (l4.set(t8, a4 = { handleEvent: o10 }), e13.addEventListener(t8, a4)) : a4.handleEvent = o10 : void 0 !== a4 && (l4.delete(t8), e13.removeEventListener(t8, a4));
    })(e12, s8, o9);
  };
  var o = ({ react: n9, tagName: o9, elementClass: l3, events: a3, displayName: s8 }) => {
    const c6 = new Set(Object.keys(a3 != null ? a3 : {})), r8 = n9.forwardRef(((s9, r9) => {
      const i7 = n9.useRef(/* @__PURE__ */ new Map()), d3 = n9.useRef(null), f3 = {}, u5 = {};
      for (const [n10, t7] of Object.entries(s9)) e.has(n10) ? f3["className" === n10 ? "class" : n10] = t7 : c6.has(n10) || n10 in l3.prototype ? u5[n10] = t7 : f3[n10] = t7;
      return n9.useLayoutEffect((() => {
        if (null === d3.current) return;
        const e12 = /* @__PURE__ */ new Map();
        for (const n10 in u5) t(d3.current, n10, s9[n10], i7.current.get(n10), a3), i7.current.delete(n10), e12.set(n10, s9[n10]);
        for (const [e13, n10] of i7.current) t(d3.current, e13, void 0, n10, a3);
        i7.current = e12;
      })), n9.useLayoutEffect((() => {
        var _a6;
        (_a6 = d3.current) == null ? void 0 : _a6.removeAttribute("defer-hydration");
      }), []), f3.suppressHydrationWarning = true, n9.createElement(o9, { ...f3, ref: n9.useCallback(((e12) => {
        d3.current = e12, "function" == typeof r9 ? r9(e12) : null !== r9 && (r9.current = e12);
      }), [r9]) });
    }));
    return r8.displayName = s8 != null ? s8 : l3.name, r8;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t2 = globalThis;
  var e2 = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o2 = /* @__PURE__ */ new WeakMap();
  var n2 = class {
    constructor(t7, e12, o9) {
      if (this._$cssResult$ = true, o9 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7, this.t = e12;
    }
    get styleSheet() {
      let t7 = this.o;
      const s8 = this.t;
      if (e2 && void 0 === t7) {
        const e12 = void 0 !== s8 && 1 === s8.length;
        e12 && (t7 = o2.get(s8)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e12 && o2.set(s8, t7));
      }
      return t7;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t7) => new n2("string" == typeof t7 ? t7 : t7 + "", void 0, s);
  var i = (t7, ...e12) => {
    const o9 = 1 === t7.length ? t7[0] : e12.reduce(((e13, s8, o10) => e13 + ((t8) => {
      if (true === t8._$cssResult$) return t8.cssText;
      if ("number" == typeof t8) return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s8) + t7[o10 + 1]), t7[0]);
    return new n2(o9, t7, s);
  };
  var S = (s8, o9) => {
    if (e2) s8.adoptedStyleSheets = o9.map(((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet));
    else for (const e12 of o9) {
      const o10 = document.createElement("style"), n9 = t2.litNonce;
      void 0 !== n9 && o10.setAttribute("nonce", n9), o10.textContent = e12.cssText, s8.appendChild(o10);
    }
  };
  var c = e2 ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e12 = "";
    for (const s8 of t8.cssRules) e12 += s8.cssText;
    return r(e12);
  })(t7) : t7;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e3, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o3, getPrototypeOf: n3 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t7, s8) => t7;
  var u = { toAttribute(t7, s8) {
    switch (s8) {
      case Boolean:
        t7 = t7 ? l : null;
        break;
      case Object:
      case Array:
        t7 = null == t7 ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, s8) {
    let i7 = t7;
    switch (s8) {
      case Boolean:
        i7 = null !== t7;
        break;
      case Number:
        i7 = null === t7 ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          i7 = JSON.parse(t7);
        } catch (t8) {
          i7 = null;
        }
    }
    return i7;
  } };
  var f = (t7, s8) => !i2(t7, s8);
  var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  var _a, _b;
  (_a = Symbol.metadata) != null ? _a : Symbol.metadata = Symbol("metadata"), (_b = a.litPropertyMetadata) != null ? _b : a.litPropertyMetadata = /* @__PURE__ */ new WeakMap();
  var y = class extends HTMLElement {
    static addInitializer(t7) {
      var _a6;
      this._$Ei(), ((_a6 = this.l) != null ? _a6 : this.l = []).push(t7);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t7, s8 = b) {
      if (s8.state && (s8.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t7) && ((s8 = Object.create(s8)).wrapped = true), this.elementProperties.set(t7, s8), !s8.noAccessor) {
        const i7 = Symbol(), h3 = this.getPropertyDescriptor(t7, i7, s8);
        void 0 !== h3 && e3(this.prototype, t7, h3);
      }
    }
    static getPropertyDescriptor(t7, s8, i7) {
      var _a6;
      const { get: e12, set: r8 } = (_a6 = h(this.prototype, t7)) != null ? _a6 : { get() {
        return this[s8];
      }, set(t8) {
        this[s8] = t8;
      } };
      return { get: e12, set(s9) {
        const h3 = e12 == null ? void 0 : e12.call(this);
        r8 == null ? void 0 : r8.call(this, s9), this.requestUpdate(t7, h3, i7);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      var _a6;
      return (_a6 = this.elementProperties.get(t7)) != null ? _a6 : b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t7 = n3(this);
      t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t8 = this.properties, s8 = [...r2(t8), ...o3(t8)];
        for (const i7 of s8) this.createProperty(i7, t8[i7]);
      }
      const t7 = this[Symbol.metadata];
      if (null !== t7) {
        const s8 = litPropertyMetadata.get(t7);
        if (void 0 !== s8) for (const [t8, i7] of s8) this.elementProperties.set(t8, i7);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t8, s8] of this.elementProperties) {
        const i7 = this._$Eu(t8, s8);
        void 0 !== i7 && this._$Eh.set(i7, t8);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s8) {
      const i7 = [];
      if (Array.isArray(s8)) {
        const e12 = new Set(s8.flat(1 / 0).reverse());
        for (const s9 of e12) i7.unshift(c(s9));
      } else void 0 !== s8 && i7.push(c(s8));
      return i7;
    }
    static _$Eu(t7, s8) {
      const i7 = s8.attribute;
      return false === i7 ? void 0 : "string" == typeof i7 ? i7 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      var _a6;
      this._$ES = new Promise(((t7) => this.enableUpdating = t7)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a6 = this.constructor.l) == null ? void 0 : _a6.forEach(((t7) => t7(this)));
    }
    addController(t7) {
      var _a6, _b2;
      ((_a6 = this._$EO) != null ? _a6 : this._$EO = /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && ((_b2 = t7.hostConnected) == null ? void 0 : _b2.call(t7));
    }
    removeController(t7) {
      var _a6;
      (_a6 = this._$EO) == null ? void 0 : _a6.delete(t7);
    }
    _$E_() {
      const t7 = /* @__PURE__ */ new Map(), s8 = this.constructor.elementProperties;
      for (const i7 of s8.keys()) this.hasOwnProperty(i7) && (t7.set(i7, this[i7]), delete this[i7]);
      t7.size > 0 && (this._$Ep = t7);
    }
    createRenderRoot() {
      var _a6;
      const t7 = (_a6 = this.shadowRoot) != null ? _a6 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(t7, this.constructor.elementStyles), t7;
    }
    connectedCallback() {
      var _a6, _b2;
      (_a6 = this.renderRoot) != null ? _a6 : this.renderRoot = this.createRenderRoot(), this.enableUpdating(true), (_b2 = this._$EO) == null ? void 0 : _b2.forEach(((t7) => {
        var _a7;
        return (_a7 = t7.hostConnected) == null ? void 0 : _a7.call(t7);
      }));
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      var _a6;
      (_a6 = this._$EO) == null ? void 0 : _a6.forEach(((t7) => {
        var _a7;
        return (_a7 = t7.hostDisconnected) == null ? void 0 : _a7.call(t7);
      }));
    }
    attributeChangedCallback(t7, s8, i7) {
      this._$AK(t7, i7);
    }
    _$ET(t7, s8) {
      var _a6;
      const i7 = this.constructor.elementProperties.get(t7), e12 = this.constructor._$Eu(t7, i7);
      if (void 0 !== e12 && true === i7.reflect) {
        const h3 = (void 0 !== ((_a6 = i7.converter) == null ? void 0 : _a6.toAttribute) ? i7.converter : u).toAttribute(s8, i7.type);
        this._$Em = t7, null == h3 ? this.removeAttribute(e12) : this.setAttribute(e12, h3), this._$Em = null;
      }
    }
    _$AK(t7, s8) {
      var _a6, _b2, _c;
      const i7 = this.constructor, e12 = i7._$Eh.get(t7);
      if (void 0 !== e12 && this._$Em !== e12) {
        const t8 = i7.getPropertyOptions(e12), h3 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== ((_a6 = t8.converter) == null ? void 0 : _a6.fromAttribute) ? t8.converter : u;
        this._$Em = e12;
        const r8 = h3.fromAttribute(s8, t8.type);
        this[e12] = (_c = r8 != null ? r8 : (_b2 = this._$Ej) == null ? void 0 : _b2.get(e12)) != null ? _c : r8, this._$Em = null;
      }
    }
    requestUpdate(t7, s8, i7) {
      var _a6, _b2;
      if (void 0 !== t7) {
        const e12 = this.constructor, h3 = this[t7];
        if (i7 != null ? i7 : i7 = e12.getPropertyOptions(t7), !(((_a6 = i7.hasChanged) != null ? _a6 : f)(h3, s8) || i7.useDefault && i7.reflect && h3 === ((_b2 = this._$Ej) == null ? void 0 : _b2.get(t7)) && !this.hasAttribute(e12._$Eu(t7, i7)))) return;
        this.C(t7, s8, i7);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t7, s8, { useDefault: i7, reflect: e12, wrapped: h3 }, r8) {
      var _a6, _b2, _c;
      i7 && !((_a6 = this._$Ej) != null ? _a6 : this._$Ej = /* @__PURE__ */ new Map()).has(t7) && (this._$Ej.set(t7, (_b2 = r8 != null ? r8 : s8) != null ? _b2 : this[t7]), true !== h3 || void 0 !== r8) || (this._$AL.has(t7) || (this.hasUpdated || i7 || (s8 = void 0), this._$AL.set(t7, s8)), true === e12 && this._$Em !== t7 && ((_c = this._$Eq) != null ? _c : this._$Eq = /* @__PURE__ */ new Set()).add(t7));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return null != t7 && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var _a6, _b2;
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if ((_a6 = this.renderRoot) != null ? _a6 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
          for (const [t9, s9] of this._$Ep) this[t9] = s9;
          this._$Ep = void 0;
        }
        const t8 = this.constructor.elementProperties;
        if (t8.size > 0) for (const [s9, i7] of t8) {
          const { wrapped: t9 } = i7, e12 = this[s9];
          true !== t9 || this._$AL.has(s9) || void 0 === e12 || this.C(s9, void 0, i7, e12);
        }
      }
      let t7 = false;
      const s8 = this._$AL;
      try {
        t7 = this.shouldUpdate(s8), t7 ? (this.willUpdate(s8), (_b2 = this._$EO) == null ? void 0 : _b2.forEach(((t8) => {
          var _a7;
          return (_a7 = t8.hostUpdate) == null ? void 0 : _a7.call(t8);
        })), this.update(s8)) : this._$EM();
      } catch (s9) {
        throw t7 = false, this._$EM(), s9;
      }
      t7 && this._$AE(s8);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      var _a6;
      (_a6 = this._$EO) == null ? void 0 : _a6.forEach(((t8) => {
        var _a7;
        return (_a7 = t8.hostUpdated) == null ? void 0 : _a7.call(t8);
      })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      this._$Eq && (this._$Eq = this._$Eq.forEach(((t8) => this._$ET(t8, this[t8])))), this._$EM();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  var _a2;
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: y }), ((_a2 = a.reactiveElementVersions) != null ? _a2 : a.reactiveElementVersions = []).push("2.1.1");

  // node_modules/lit-html/lit-html.js
  var t3 = globalThis;
  var i3 = t3.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var e4 = "$lit$";
  var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o4 = "?" + h2;
  var n4 = `<${o4}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
  var a2 = Array.isArray;
  var u2 = (t7) => a2(t7) || "function" == typeof (t7 == null ? void 0 : t7[Symbol.iterator]);
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t7) => (i7, ...s8) => ({ _$litType$: t7, strings: i7, values: s8 });
  var x = y2(1);
  var b2 = y2(2);
  var w = y2(3);
  var T = Symbol.for("lit-noChange");
  var E = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129);
  function P(t7, i7) {
    if (!a2(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i7) : i7;
  }
  var V = (t7, i7) => {
    const s8 = t7.length - 1, o9 = [];
    let r8, l3 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c6 = f2;
    for (let i8 = 0; i8 < s8; i8++) {
      const s9 = t7[i8];
      let a3, u5, d3 = -1, y3 = 0;
      for (; y3 < s9.length && (c6.lastIndex = y3, u5 = c6.exec(s9), null !== u5); ) y3 = c6.lastIndex, c6 === f2 ? "!--" === u5[1] ? c6 = v : void 0 !== u5[1] ? c6 = _ : void 0 !== u5[2] ? ($.test(u5[2]) && (r8 = RegExp("</" + u5[2], "g")), c6 = m) : void 0 !== u5[3] && (c6 = m) : c6 === m ? ">" === u5[0] ? (c6 = r8 != null ? r8 : f2, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c6.lastIndex - u5[2].length, a3 = u5[1], c6 = void 0 === u5[3] ? m : '"' === u5[3] ? g : p2) : c6 === g || c6 === p2 ? c6 = m : c6 === v || c6 === _ ? c6 = f2 : (c6 = m, r8 = void 0);
      const x2 = c6 === m && t7[i8 + 1].startsWith("/>") ? " " : "";
      l3 += c6 === f2 ? s9 + n4 : d3 >= 0 ? (o9.push(a3), s9.slice(0, d3) + e4 + s9.slice(d3) + h2 + x2) : s9 + h2 + (-2 === d3 ? i8 : x2);
    }
    return [P(t7, l3 + (t7[s8] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), o9];
  };
  var N = class _N {
    constructor({ strings: t7, _$litType$: s8 }, n9) {
      let r8;
      this.parts = [];
      let c6 = 0, a3 = 0;
      const u5 = t7.length - 1, d3 = this.parts, [f3, v3] = V(t7, s8);
      if (this.el = _N.createElement(f3, n9), C.currentNode = this.el.content, 2 === s8 || 3 === s8) {
        const t8 = this.el.content.firstChild;
        t8.replaceWith(...t8.childNodes);
      }
      for (; null !== (r8 = C.nextNode()) && d3.length < u5; ) {
        if (1 === r8.nodeType) {
          if (r8.hasAttributes()) for (const t8 of r8.getAttributeNames()) if (t8.endsWith(e4)) {
            const i7 = v3[a3++], s9 = r8.getAttribute(t8).split(h2), e12 = /([.?@])?(.*)/.exec(i7);
            d3.push({ type: 1, index: c6, name: e12[2], strings: s9, ctor: "." === e12[1] ? H : "?" === e12[1] ? I : "@" === e12[1] ? L : k }), r8.removeAttribute(t8);
          } else t8.startsWith(h2) && (d3.push({ type: 6, index: c6 }), r8.removeAttribute(t8));
          if ($.test(r8.tagName)) {
            const t8 = r8.textContent.split(h2), s9 = t8.length - 1;
            if (s9 > 0) {
              r8.textContent = i3 ? i3.emptyScript : "";
              for (let i7 = 0; i7 < s9; i7++) r8.append(t8[i7], l2()), C.nextNode(), d3.push({ type: 2, index: ++c6 });
              r8.append(t8[s9], l2());
            }
          }
        } else if (8 === r8.nodeType) if (r8.data === o4) d3.push({ type: 2, index: c6 });
        else {
          let t8 = -1;
          for (; -1 !== (t8 = r8.data.indexOf(h2, t8 + 1)); ) d3.push({ type: 7, index: c6 }), t8 += h2.length - 1;
        }
        c6++;
      }
    }
    static createElement(t7, i7) {
      const s8 = r3.createElement("template");
      return s8.innerHTML = t7, s8;
    }
  };
  function S2(t7, i7, s8 = t7, e12) {
    var _a6, _b2, _c;
    if (i7 === T) return i7;
    let h3 = void 0 !== e12 ? (_a6 = s8._$Co) == null ? void 0 : _a6[e12] : s8._$Cl;
    const o9 = c3(i7) ? void 0 : i7._$litDirective$;
    return (h3 == null ? void 0 : h3.constructor) !== o9 && ((_b2 = h3 == null ? void 0 : h3._$AO) == null ? void 0 : _b2.call(h3, false), void 0 === o9 ? h3 = void 0 : (h3 = new o9(t7), h3._$AT(t7, s8, e12)), void 0 !== e12 ? ((_c = s8._$Co) != null ? _c : s8._$Co = [])[e12] = h3 : s8._$Cl = h3), void 0 !== h3 && (i7 = S2(t7, h3._$AS(t7, i7.values), h3, e12)), i7;
  }
  var M = class {
    constructor(t7, i7) {
      this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i7;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t7) {
      var _a6;
      const { el: { content: i7 }, parts: s8 } = this._$AD, e12 = ((_a6 = t7 == null ? void 0 : t7.creationScope) != null ? _a6 : r3).importNode(i7, true);
      C.currentNode = e12;
      let h3 = C.nextNode(), o9 = 0, n9 = 0, l3 = s8[0];
      for (; void 0 !== l3; ) {
        if (o9 === l3.index) {
          let i8;
          2 === l3.type ? i8 = new R(h3, h3.nextSibling, this, t7) : 1 === l3.type ? i8 = new l3.ctor(h3, l3.name, l3.strings, this, t7) : 6 === l3.type && (i8 = new z(h3, this, t7)), this._$AV.push(i8), l3 = s8[++n9];
        }
        o9 !== (l3 == null ? void 0 : l3.index) && (h3 = C.nextNode(), o9++);
      }
      return C.currentNode = r3, e12;
    }
    p(t7) {
      let i7 = 0;
      for (const s8 of this._$AV) void 0 !== s8 && (void 0 !== s8.strings ? (s8._$AI(t7, s8, i7), i7 += s8.strings.length - 2) : s8._$AI(t7[i7])), i7++;
    }
  };
  var R = class _R {
    get _$AU() {
      var _a6, _b2;
      return (_b2 = (_a6 = this._$AM) == null ? void 0 : _a6._$AU) != null ? _b2 : this._$Cv;
    }
    constructor(t7, i7, s8, e12) {
      var _a6;
      this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t7, this._$AB = i7, this._$AM = s8, this.options = e12, this._$Cv = (_a6 = e12 == null ? void 0 : e12.isConnected) != null ? _a6 : true;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i7 = this._$AM;
      return void 0 !== i7 && 11 === (t7 == null ? void 0 : t7.nodeType) && (t7 = i7.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i7 = this) {
      t7 = S2(this, t7, i7), c3(t7) ? t7 === E || null == t7 || "" === t7 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t7 !== this._$AH && t7 !== T && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : u2(t7) ? this.k(t7) : this._(t7);
    }
    O(t7) {
      return this._$AA.parentNode.insertBefore(t7, this._$AB);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
    }
    _(t7) {
      this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(r3.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      var _a6;
      const { values: i7, _$litType$: s8 } = t7, e12 = "number" == typeof s8 ? this._$AC(t7) : (void 0 === s8.el && (s8.el = N.createElement(P(s8.h, s8.h[0]), this.options)), s8);
      if (((_a6 = this._$AH) == null ? void 0 : _a6._$AD) === e12) this._$AH.p(i7);
      else {
        const t8 = new M(e12, this), s9 = t8.u(this.options);
        t8.p(i7), this.T(s9), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i7 = A.get(t7.strings);
      return void 0 === i7 && A.set(t7.strings, i7 = new N(t7)), i7;
    }
    k(t7) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i7 = this._$AH;
      let s8, e12 = 0;
      for (const h3 of t7) e12 === i7.length ? i7.push(s8 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s8 = i7[e12], s8._$AI(h3), e12++;
      e12 < i7.length && (this._$AR(s8 && s8._$AB.nextSibling, e12), i7.length = e12);
    }
    _$AR(t7 = this._$AA.nextSibling, i7) {
      var _a6;
      for ((_a6 = this._$AP) == null ? void 0 : _a6.call(this, false, true, i7); t7 !== this._$AB; ) {
        const i8 = t7.nextSibling;
        t7.remove(), t7 = i8;
      }
    }
    setConnected(t7) {
      var _a6;
      void 0 === this._$AM && (this._$Cv = t7, (_a6 = this._$AP) == null ? void 0 : _a6.call(this, t7));
    }
  };
  var k = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t7, i7, s8, e12, h3) {
      this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t7, this.name = i7, this._$AM = e12, this.options = h3, s8.length > 2 || "" !== s8[0] || "" !== s8[1] ? (this._$AH = Array(s8.length - 1).fill(new String()), this.strings = s8) : this._$AH = E;
    }
    _$AI(t7, i7 = this, s8, e12) {
      const h3 = this.strings;
      let o9 = false;
      if (void 0 === h3) t7 = S2(this, t7, i7, 0), o9 = !c3(t7) || t7 !== this._$AH && t7 !== T, o9 && (this._$AH = t7);
      else {
        const e13 = t7;
        let n9, r8;
        for (t7 = h3[0], n9 = 0; n9 < h3.length - 1; n9++) r8 = S2(this, e13[s8 + n9], i7, n9), r8 === T && (r8 = this._$AH[n9]), o9 || (o9 = !c3(r8) || r8 !== this._$AH[n9]), r8 === E ? t7 = E : t7 !== E && (t7 += (r8 != null ? r8 : "") + h3[n9 + 1]), this._$AH[n9] = r8;
      }
      o9 && !e12 && this.j(t7);
    }
    j(t7) {
      t7 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 != null ? t7 : "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === E ? void 0 : t7;
    }
  };
  var I = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      this.element.toggleAttribute(this.name, !!t7 && t7 !== E);
    }
  };
  var L = class extends k {
    constructor(t7, i7, s8, e12, h3) {
      super(t7, i7, s8, e12, h3), this.type = 5;
    }
    _$AI(t7, i7 = this) {
      var _a6;
      if ((t7 = (_a6 = S2(this, t7, i7, 0)) != null ? _a6 : E) === T) return;
      const s8 = this._$AH, e12 = t7 === E && s8 !== E || t7.capture !== s8.capture || t7.once !== s8.once || t7.passive !== s8.passive, h3 = t7 !== E && (s8 === E || e12);
      e12 && this.element.removeEventListener(this.name, this, s8), h3 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      var _a6, _b2;
      "function" == typeof this._$AH ? this._$AH.call((_b2 = (_a6 = this.options) == null ? void 0 : _a6.host) != null ? _b2 : this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var z = class {
    constructor(t7, i7, s8) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s8;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      S2(this, t7);
    }
  };
  var Z = { M: e4, P: h2, A: o4, C: 1, L: V, R: M, D: u2, V: S2, I: R, H: k, N: I, U: L, B: H, F: z };
  var j = t3.litHtmlPolyfillSupport;
  var _a3;
  j == null ? void 0 : j(N, R), ((_a3 = t3.litHtmlVersions) != null ? _a3 : t3.litHtmlVersions = []).push("3.3.1");
  var B = (t7, i7, s8) => {
    var _a6, _b2;
    const e12 = (_a6 = s8 == null ? void 0 : s8.renderBefore) != null ? _a6 : i7;
    let h3 = e12._$litPart$;
    if (void 0 === h3) {
      const t8 = (_b2 = s8 == null ? void 0 : s8.renderBefore) != null ? _b2 : null;
      e12._$litPart$ = h3 = new R(i7.insertBefore(l2(), t8), t8, void 0, s8 != null ? s8 : {});
    }
    return h3._$AI(t7), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = globalThis;
  var i4 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var _a6, _b2;
      const t7 = super.createRenderRoot();
      return (_b2 = (_a6 = this.renderOptions).renderBefore) != null ? _b2 : _a6.renderBefore = t7.firstChild, t7;
    }
    update(t7) {
      const r8 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = B(r8, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var _a6;
      super.connectedCallback(), (_a6 = this._$Do) == null ? void 0 : _a6.setConnected(true);
    }
    disconnectedCallback() {
      var _a6;
      super.disconnectedCallback(), (_a6 = this._$Do) == null ? void 0 : _a6.setConnected(false);
    }
    render() {
      return T;
    }
  };
  var _a4;
  i4._$litElement$ = true, i4["finalized"] = true, (_a4 = s3.litElementHydrateSupport) == null ? void 0 : _a4.call(s3, { LitElement: i4 });
  var o5 = s3.litElementPolyfillSupport;
  o5 == null ? void 0 : o5({ LitElement: i4 });
  var _a5;
  ((_a5 = s3.litElementVersions) != null ? _a5 : s3.litElementVersions = []).push("4.2.1");

  // node_modules/@lit/reactive-element/decorators/property.js
  var o6 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r4 = (t7 = o6, e12, r8) => {
    const { kind: n9, metadata: i7 } = r8;
    let s8 = globalThis.litPropertyMetadata.get(i7);
    if (void 0 === s8 && globalThis.litPropertyMetadata.set(i7, s8 = /* @__PURE__ */ new Map()), "setter" === n9 && ((t7 = Object.create(t7)).wrapped = true), s8.set(r8.name, t7), "accessor" === n9) {
      const { name: o9 } = r8;
      return { set(r9) {
        const n10 = e12.get.call(this);
        e12.set.call(this, r9), this.requestUpdate(o9, n10, t7);
      }, init(e13) {
        return void 0 !== e13 && this.C(o9, void 0, t7, e13), e13;
      } };
    }
    if ("setter" === n9) {
      const { name: o9 } = r8;
      return function(r9) {
        const n10 = this[o9];
        e12.call(this, r9), this.requestUpdate(o9, n10, t7);
      };
    }
    throw Error("Unsupported decorator location: " + n9);
  };
  function n5(t7) {
    return (e12, o9) => "object" == typeof o9 ? r4(t7, e12, o9) : ((t8, e13, o10) => {
      const r8 = e13.hasOwnProperty(o10);
      return e13.constructor.createProperty(o10, t8), r8 ? Object.getOwnPropertyDescriptor(e13, o10) : void 0;
    })(t7, e12, o9);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function r5(r8) {
    return n5({ ...r8, state: true, attribute: false });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var e5 = (e12, t7, c6) => (c6.configurable = true, c6.enumerable = true, Reflect.decorate && "object" != typeof t7 && Object.defineProperty(e12, t7, c6), c6);

  // node_modules/@lit/reactive-element/decorators/query.js
  function e6(e12, r8) {
    return (n9, s8, i7) => {
      const o9 = (t7) => {
        var _a6, _b2;
        return (_b2 = (_a6 = t7.renderRoot) == null ? void 0 : _a6.querySelector(e12)) != null ? _b2 : null;
      };
      if (r8) {
        const { get: e13, set: r9 } = "object" == typeof s8 ? n9 : i7 != null ? i7 : (() => {
          const t7 = Symbol();
          return { get() {
            return this[t7];
          }, set(e14) {
            this[t7] = e14;
          } };
        })();
        return e5(n9, s8, { get() {
          let t7 = e13.call(this);
          return void 0 === t7 && (t7 = o9(this), (null !== t7 || this.hasUpdated) && r9.call(this, t7)), t7;
        } });
      }
      return e5(n9, s8, { get() {
        return o9(this);
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-all.js
  var e7;
  function r6(r8) {
    return (n9, o9) => e5(n9, o9, { get() {
      var _a6;
      return ((_a6 = this.renderRoot) != null ? _a6 : e7 != null ? e7 : e7 = document.createDocumentFragment()).querySelectorAll(r8);
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  function o7(o9) {
    return (e12, n9) => {
      const { slot: r8, selector: s8 } = o9 != null ? o9 : {}, c6 = "slot" + (r8 ? `[name=${r8}]` : ":not([name])");
      return e5(e12, n9, { get() {
        var _a6, _b2;
        const t7 = (_a6 = this.renderRoot) == null ? void 0 : _a6.querySelector(c6), e13 = (_b2 = t7 == null ? void 0 : t7.assignedElements(o9)) != null ? _b2 : [];
        return void 0 === s8 ? e13 : e13.filter(((t8) => t8.matches(s8)));
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
  function n6(n9) {
    return (o9, r8) => {
      const { slot: e12 } = n9 != null ? n9 : {}, s8 = "slot" + (e12 ? `[name=${e12}]` : ":not([name])");
      return e5(o9, r8, { get() {
        var _a6, _b2;
        const t7 = (_a6 = this.renderRoot) == null ? void 0 : _a6.querySelector(s8);
        return (_b2 = t7 == null ? void 0 : t7.assignedNodes(n9)) != null ? _b2 : [];
      } });
    };
  }

  // node_modules/@vscode-elements/elements/dist/includes/VscElement.js
  var VERSION = "2.3.0";
  var CONFIG_KEY = "__vscodeElements_disableRegistryWarning__";
  var VscElement = class extends i4 {
    /** VSCode Elements version */
    get version() {
      return VERSION;
    }
  };
  var customElement = (tagName) => {
    return (classOrTarget) => {
      const customElementClass = customElements.get(tagName);
      if (!customElementClass) {
        customElements.define(tagName, classOrTarget);
        return;
      }
      if (CONFIG_KEY in window) {
        return;
      }
      const el = document.createElement(tagName);
      const anotherVersion = el == null ? void 0 : el.version;
      let message = "";
      if (!anotherVersion) {
        message += "is already registered by an unknown custom element handler class.";
      } else if (anotherVersion !== VERSION) {
        message += "is already registered by a different version of VSCode Elements. ";
        message += `This version is "${VERSION}", while the other one is "${anotherVersion}".`;
      } else {
        message += `is already registered by the same version of VSCode Elements (${VERSION}).`;
      }
      console.warn(`[VSCode Elements] ${tagName} ${message}
To suppress this warning, set window.${CONFIG_KEY} to true`);
    };
  };

  // node_modules/@vscode-elements/elements/dist/includes/default.styles.js
  var default_styles_default = i`
  :host([hidden]) {
    display: none;
  }

  :host([disabled]),
  :host(:disabled) {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
`;

  // node_modules/@vscode-elements/elements/dist/includes/helpers.js
  var DEFAULT_LINE_HEIGHT = 16;
  var DEFAULT_FONT_SIZE = 13;
  var INPUT_LINE_HEIGHT_RATIO = DEFAULT_LINE_HEIGHT / DEFAULT_FONT_SIZE;
  function getDefaultFontStack() {
    if (navigator.userAgent.indexOf("Linux") > -1) {
      return 'system-ui, "Ubuntu", "Droid Sans", sans-serif';
    } else if (navigator.userAgent.indexOf("Mac") > -1) {
      return "-apple-system, BlinkMacSystemFont, sans-serif";
    } else if (navigator.userAgent.indexOf("Windows") > -1) {
      return '"Segoe WPC", "Segoe UI", sans-serif';
    } else {
      return "sans-serif";
    }
  }

  // node_modules/@vscode-elements/elements/dist/vscode-badge/vscode-badge.styles.js
  var defaultFontStack = r(getDefaultFontStack());
  var styles = [
    default_styles_default,
    i`
    :host {
      display: inline-block;
    }

    .root {
      background-color: var(--vscode-badge-background, #616161);
      border: 1px solid var(--vscode-contrastBorder, transparent);
      border-radius: 2px;
      box-sizing: border-box;
      color: var(--vscode-badge-foreground, #f8f8f8);
      display: block;
      font-family: var(--vscode-font-family, ${defaultFontStack});
      font-size: 11px;
      font-weight: 400;
      line-height: 14px;
      min-width: 18px;
      padding: 2px 3px;
      text-align: center;
      white-space: nowrap;
    }

    :host([variant='counter']) .root {
      border-radius: 11px;
      line-height: 11px;
      min-height: 18px;
      min-width: 18px;
      padding: 3px 6px;
    }

    :host([variant='activity-bar-counter']) .root {
      background-color: var(--vscode-activityBarBadge-background, #0078d4);
      border-radius: 20px;
      color: var(--vscode-activityBarBadge-foreground, #ffffff);
      font-size: 9px;
      font-weight: 600;
      line-height: 16px;
      padding: 0 4px;
    }

    :host([variant='tab-header-counter']) .root {
      background-color: var(--vscode-activityBarBadge-background, #0078d4);
      border-radius: 10px;
      color: var(--vscode-activityBarBadge-foreground, #ffffff);
      line-height: 10px;
      min-height: 16px;
      min-width: 16px;
      padding: 3px 5px;
    }
  `
  ];
  var vscode_badge_styles_default = styles;

  // node_modules/@vscode-elements/elements/dist/vscode-badge/vscode-badge.js
  var __decorate = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeBadge = class VscodeBadge2 extends VscElement {
    constructor() {
      super(...arguments);
      this.variant = "default";
    }
    render() {
      return x`<div class="root"><slot></slot></div>`;
    }
  };
  VscodeBadge.styles = vscode_badge_styles_default;
  __decorate([
    n5({ reflect: true })
  ], VscodeBadge.prototype, "variant", void 0);
  VscodeBadge = __decorate([
    customElement("vscode-badge")
  ], VscodeBadge);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeBadge.js
  var VscodeBadge3 = o({
    tagName: "vscode-badge",
    elementClass: VscodeBadge,
    react: import_react2.default,
    displayName: "VscodeBadge"
  });
  var VscodeBadge_default = VscodeBadge3;

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeButton.js
  var import_react4 = __toESM(require_react(), 1);

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e8 = (t7) => (...e12) => ({ _$litDirective$: t7, values: e12 });
  var i5 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e12, i7) {
      this._$Ct = t7, this._$AM = e12, this._$Ci = i7;
    }
    _$AS(t7, e12) {
      return this.update(t7, e12);
    }
    update(t7, e12) {
      return this.render(...e12);
    }
  };

  // node_modules/lit-html/directives/class-map.js
  var e9 = e8(class extends i5 {
    constructor(t7) {
      var _a6;
      if (super(t7), t7.type !== t4.ATTRIBUTE || "class" !== t7.name || ((_a6 = t7.strings) == null ? void 0 : _a6.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return " " + Object.keys(t7).filter(((s8) => t7[s8])).join(" ") + " ";
    }
    update(s8, [i7]) {
      var _a6, _b2;
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s8.strings && (this.nt = new Set(s8.strings.join(" ").split(/\s/).filter(((t7) => "" !== t7))));
        for (const t7 in i7) i7[t7] && !((_a6 = this.nt) == null ? void 0 : _a6.has(t7)) && this.st.add(t7);
        return this.render(i7);
      }
      const r8 = s8.element.classList;
      for (const t7 of this.st) t7 in i7 || (r8.remove(t7), this.st.delete(t7));
      for (const t7 in i7) {
        const s9 = !!i7[t7];
        s9 === this.st.has(t7) || ((_b2 = this.nt) == null ? void 0 : _b2.has(t7)) || (s9 ? (r8.add(t7), this.st.add(t7)) : (r8.remove(t7), this.st.delete(t7)));
      }
      return T;
    }
  });

  // node_modules/lit-html/directives/if-defined.js
  var o8 = (o9) => o9 != null ? o9 : E;

  // node_modules/@vscode-elements/elements/dist/includes/style-property-map.js
  var StylePropertyMap = class extends i5 {
    constructor(partInfo) {
      super(partInfo);
      this._prevProperties = {};
      if (partInfo.type !== t4.PROPERTY || partInfo.name !== "style") {
        throw new Error("The `stylePropertyMap` directive must be used in the `style` property");
      }
    }
    update(part, [styleProps]) {
      Object.entries(styleProps).forEach(([key, val]) => {
        if (this._prevProperties[key] !== val) {
          if (key.startsWith("--")) {
            part.element.style.setProperty(key, val);
          } else {
            part.element.style[key] = val;
          }
          this._prevProperties[key] = val;
        }
      });
      return T;
    }
    render(_styleProps) {
      return T;
    }
  };
  var stylePropertyMap = e8(StylePropertyMap);

  // node_modules/@vscode-elements/elements/dist/vscode-icon/vscode-icon.styles.js
  var styles2 = [
    default_styles_default,
    i`
    :host {
      color: var(--vscode-icon-foreground, #cccccc);
      display: inline-block;
    }

    .codicon[class*='codicon-'] {
      display: block;
    }

    .icon,
    .button {
      background-color: transparent;
      display: block;
      padding: 0;
    }

    .button {
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      color: currentColor;
      cursor: pointer;
      padding: 2px;
    }

    .button:hover {
      background-color: var(
        --vscode-toolbar-hoverBackground,
        rgba(90, 93, 94, 0.31)
      );
    }

    .button:active {
      background-color: var(
        --vscode-toolbar-activeBackground,
        rgba(99, 102, 103, 0.31)
      );
    }

    .button:focus {
      outline: none;
    }

    .button:focus-visible {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    @keyframes icon-spin {
      100% {
        transform: rotate(360deg);
      }
    }

    .spin {
      animation-name: icon-spin;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  `
  ];
  var vscode_icon_styles_default = styles2;

  // node_modules/@vscode-elements/elements/dist/vscode-icon/vscode-icon.js
  var __decorate2 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeIcon_1;
  var VscodeIcon = VscodeIcon_1 = class VscodeIcon2 extends VscElement {
    constructor() {
      super(...arguments);
      this.label = "";
      this.name = "";
      this.size = 16;
      this.spin = false;
      this.spinDuration = 1.5;
      this.actionIcon = false;
      this._onButtonClick = (ev) => {
        this.dispatchEvent(new CustomEvent("vsc-click", { detail: { originalEvent: ev } }));
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const { href, nonce } = this._getStylesheetConfig();
      VscodeIcon_1.stylesheetHref = href;
      VscodeIcon_1.nonce = nonce;
    }
    /**
     * For using web fonts in web components, the font stylesheet must be included
     * twice: on the page and in the web component. This function looks for the
     * font stylesheet on the page and returns the stylesheet URL and the nonce
     * id.
     */
    _getStylesheetConfig() {
      const linkElement = document.getElementById("vscode-codicon-stylesheet");
      const href = (linkElement == null ? void 0 : linkElement.getAttribute("href")) || void 0;
      const nonce = (linkElement == null ? void 0 : linkElement.nonce) || void 0;
      if (!linkElement) {
        let msg = "[VSCode Elements] To use the Icon component, the codicons.css file must be included in the page with the id `vscode-codicon-stylesheet`! ";
        msg += "See https://vscode-elements.github.io/components/icon/ for more details.";
        console.warn(msg);
      }
      return { nonce, href };
    }
    render() {
      const { stylesheetHref, nonce } = VscodeIcon_1;
      const content = x`<span
      class=${e9({
        codicon: true,
        ["codicon-" + this.name]: true,
        spin: this.spin
      })}
      .style=${stylePropertyMap({
        animationDuration: String(this.spinDuration) + "s",
        fontSize: this.size + "px",
        height: this.size + "px",
        width: this.size + "px"
      })}
    ></span>`;
      const wrapped = this.actionIcon ? x` <button
          class="button"
          @click=${this._onButtonClick}
          aria-label=${this.label}
        >
          ${content}
        </button>` : x` <span class="icon" aria-hidden="true" role="presentation"
          >${content}</span
        >`;
      return x`
      <link
        rel="stylesheet"
        href=${o8(stylesheetHref)}
        nonce=${o8(nonce)}
      >
      ${wrapped}
    `;
    }
  };
  VscodeIcon.styles = vscode_icon_styles_default;
  VscodeIcon.stylesheetHref = "";
  VscodeIcon.nonce = "";
  __decorate2([
    n5()
  ], VscodeIcon.prototype, "label", void 0);
  __decorate2([
    n5({ type: String })
  ], VscodeIcon.prototype, "name", void 0);
  __decorate2([
    n5({ type: Number })
  ], VscodeIcon.prototype, "size", void 0);
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], VscodeIcon.prototype, "spin", void 0);
  __decorate2([
    n5({ type: Number, attribute: "spin-duration" })
  ], VscodeIcon.prototype, "spinDuration", void 0);
  __decorate2([
    n5({ type: Boolean, reflect: true, attribute: "action-icon" })
  ], VscodeIcon.prototype, "actionIcon", void 0);
  VscodeIcon = VscodeIcon_1 = __decorate2([
    customElement("vscode-icon")
  ], VscodeIcon);

  // node_modules/@vscode-elements/elements/dist/vscode-button/vscode-button.styles.js
  var defaultFontStack2 = r(getDefaultFontStack());
  var styles3 = [
    default_styles_default,
    i`
    :host {
      cursor: pointer;
      display: inline-block;
      width: auto;
    }

    .base {
      align-items: center;
      background-color: var(--vscode-button-background, #0078d4);
      border-bottom-left-radius: var(--vsc-border-left-radius, 2px);
      border-bottom-right-radius: var(--vsc-border-right-radius, 2px);
      border-bottom-width: 1px;
      border-color: var(--vscode-button-border, transparent);
      border-left-width: var(--vsc-border-left-width, 1px);
      border-right-width: var(--vsc-border-right-width, 1px);
      border-style: solid;
      border-top-left-radius: var(--vsc-border-left-radius, 2px);
      border-top-right-radius: var(--vsc-border-right-radius, 2px);
      border-top-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-button-foreground, #ffffff);
      display: flex;
      font-family: var(--vscode-font-family, ${defaultFontStack2});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      height: 100%;
      justify-content: center;
      line-height: 22px;
      overflow: hidden;
      padding: 1px calc(13px + var(--vsc-base-additional-right-padding, 0px))
        1px 13px;
      position: relative;
      user-select: none;
      white-space: nowrap;
      width: 100%;
    }

    .base:after {
      background-color: var(
        --vscode-button-separator,
        rgba(255, 255, 255, 0.4)
      );
      content: var(--vsc-base-after-content);
      display: var(--vsc-divider-display, none);
      position: absolute;
      right: 0;
      top: 4px;
      bottom: 4px;
      width: 1px;
    }

    :host([secondary]) .base:after {
      background-color: var(--vscode-button-secondaryForeground, #cccccc);
      opacity: 0.4;
    }

    :host([secondary]) .base {
      color: var(--vscode-button-secondaryForeground, #cccccc);
      background-color: var(--vscode-button-secondaryBackground, #313131);
      border-color: var(
        --vscode-button-border,
        var(--vscode-button-secondaryBackground, rgba(255, 255, 255, 0.07))
      );
    }

    :host([disabled]) {
      cursor: default;
      opacity: 0.4;
      pointer-events: none;
    }

    :host(:hover) .base {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
    }

    :host([disabled]:hover) .base {
      background-color: var(--vscode-button-background, #0078d4);
    }

    :host([secondary]:hover) .base {
      background-color: var(--vscode-button-secondaryHoverBackground, #3c3c3c);
    }

    :host([secondary][disabled]:hover) .base {
      background-color: var(--vscode-button-secondaryBackground, #313131);
    }

    :host(:focus),
    :host(:active) {
      outline: none;
    }

    :host(:focus) .base {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: 2px;
    }

    :host([disabled]:focus) .base {
      background-color: var(--vscode-button-background, #0078d4);
      outline: 0;
    }

    :host([secondary]:focus) .base {
      background-color: var(--vscode-button-secondaryHoverBackground, #3c3c3c);
    }

    :host([secondary][disabled]:focus) .base {
      background-color: var(--vscode-button-secondaryBackground, #313131);
    }

    ::slotted(*) {
      display: inline-block;
      margin-left: 4px;
      margin-right: 4px;
    }

    ::slotted(*:first-child) {
      margin-left: 0;
    }

    ::slotted(*:last-child) {
      margin-right: 0;
    }

    ::slotted(vscode-icon) {
      color: inherit;
    }

    .content {
      display: flex;
      position: relative;
      width: 100%;
      height: 100%;
      padding: 1px 13px;
    }

    :host(:empty) .base,
    .base.icon-only {
      min-height: 24px;
      min-width: 26px;
      padding: 1px 4px;
    }

    slot {
      align-items: center;
      display: flex;
      height: 100%;
    }

    .has-content-before slot[name='content-before'] {
      margin-right: 4px;
    }

    .has-content-after slot[name='content-after'] {
      margin-left: 4px;
    }

    .icon,
    .icon-after {
      color: inherit;
      display: block;
    }

    :host(:not(:empty)) .icon {
      margin-right: 3px;
    }

    :host(:not(:empty)) .icon-after,
    :host([icon]) .icon-after {
      margin-left: 3px;
    }
  `
  ];
  var vscode_button_styles_default = styles3;

  // node_modules/@vscode-elements/elements/dist/vscode-button/vscode-button.js
  var __decorate3 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeButton = class VscodeButton2 extends VscElement {
    get form() {
      return this._internals.form;
    }
    constructor() {
      super();
      this.autofocus = false;
      this.tabIndex = 0;
      this.secondary = false;
      this.role = "button";
      this.disabled = false;
      this.icon = "";
      this.iconSpin = false;
      this.iconAfter = "";
      this.iconAfterSpin = false;
      this.focused = false;
      this.name = void 0;
      this.iconOnly = false;
      this.type = "button";
      this.value = "";
      this._prevTabindex = 0;
      this._hasContentBefore = false;
      this._hasContentAfter = false;
      this._handleFocus = () => {
        this.focused = true;
      };
      this._handleBlur = () => {
        this.focused = false;
      };
      this.addEventListener("keydown", this._handleKeyDown.bind(this));
      this.addEventListener("click", this._handleClick.bind(this));
      this._internals = this.attachInternals();
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.autofocus) {
        if (this.tabIndex < 0) {
          this.tabIndex = 0;
        }
        this.updateComplete.then(() => {
          this.focus();
          this.requestUpdate();
        });
      }
      this.addEventListener("focus", this._handleFocus);
      this.addEventListener("blur", this._handleBlur);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("focus", this._handleFocus);
      this.removeEventListener("blur", this._handleBlur);
    }
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("value")) {
        this._internals.setFormValue(this.value);
      }
      if (changedProperties.has("disabled")) {
        if (this.disabled) {
          this._prevTabindex = this.tabIndex;
          this.tabIndex = -1;
        } else {
          this.tabIndex = this._prevTabindex;
        }
      }
    }
    _executeAction() {
      if (this.type === "submit" && this._internals.form) {
        this._internals.form.requestSubmit();
      }
      if (this.type === "reset" && this._internals.form) {
        this._internals.form.reset();
      }
    }
    _handleKeyDown(event) {
      if ((event.key === "Enter" || event.key === " ") && !this.hasAttribute("disabled")) {
        const syntheticClick = new MouseEvent("click", {
          bubbles: true,
          cancelable: true
        });
        syntheticClick.synthetic = true;
        this.dispatchEvent(syntheticClick);
        this._executeAction();
      }
    }
    _handleClick(event) {
      if (event.synthetic) {
        return;
      }
      if (!this.hasAttribute("disabled")) {
        this._executeAction();
      }
    }
    _handleSlotChange(ev) {
      const slot = ev.target;
      if (slot.name === "content-before") {
        this._hasContentBefore = slot.assignedElements().length > 0;
      }
      if (slot.name === "content-after") {
        this._hasContentAfter = slot.assignedElements().length > 0;
      }
    }
    render() {
      const hasIcon = this.icon !== "";
      const hasIconAfter = this.iconAfter !== "";
      const baseClasses = {
        base: true,
        "icon-only": this.iconOnly,
        "has-content-before": this._hasContentBefore,
        "has-content-after": this._hasContentAfter
      };
      const iconElem = hasIcon ? x`<vscode-icon
          name=${this.icon}
          ?spin=${this.iconSpin}
          spin-duration=${o8(this.iconSpinDuration)}
          class="icon"
        ></vscode-icon>` : E;
      const iconAfterElem = hasIconAfter ? x`<vscode-icon
          name=${this.iconAfter}
          ?spin=${this.iconAfterSpin}
          spin-duration=${o8(this.iconAfterSpinDuration)}
          class="icon-after"
        ></vscode-icon>` : E;
      return x`
      <div
        class=${e9(baseClasses)}
        part="base"
        @slotchange=${this._handleSlotChange}
      >
        <slot name="content-before"></slot>
        ${iconElem}
        <slot></slot>
        ${iconAfterElem}
        <slot name="content-after"></slot>
      </div>
    `;
    }
  };
  VscodeButton.styles = vscode_button_styles_default;
  VscodeButton.formAssociated = true;
  __decorate3([
    n5({ type: Boolean, reflect: true })
  ], VscodeButton.prototype, "autofocus", void 0);
  __decorate3([
    n5({ type: Number, reflect: true })
  ], VscodeButton.prototype, "tabIndex", void 0);
  __decorate3([
    n5({ type: Boolean, reflect: true })
  ], VscodeButton.prototype, "secondary", void 0);
  __decorate3([
    n5({ reflect: true })
  ], VscodeButton.prototype, "role", void 0);
  __decorate3([
    n5({ type: Boolean, reflect: true })
  ], VscodeButton.prototype, "disabled", void 0);
  __decorate3([
    n5()
  ], VscodeButton.prototype, "icon", void 0);
  __decorate3([
    n5({ type: Boolean, reflect: true, attribute: "icon-spin" })
  ], VscodeButton.prototype, "iconSpin", void 0);
  __decorate3([
    n5({ type: Number, reflect: true, attribute: "icon-spin-duration" })
  ], VscodeButton.prototype, "iconSpinDuration", void 0);
  __decorate3([
    n5({ attribute: "icon-after" })
  ], VscodeButton.prototype, "iconAfter", void 0);
  __decorate3([
    n5({ type: Boolean, reflect: true, attribute: "icon-after-spin" })
  ], VscodeButton.prototype, "iconAfterSpin", void 0);
  __decorate3([
    n5({
      type: Number,
      reflect: true,
      attribute: "icon-after-spin-duration"
    })
  ], VscodeButton.prototype, "iconAfterSpinDuration", void 0);
  __decorate3([
    n5({ type: Boolean, reflect: true })
  ], VscodeButton.prototype, "focused", void 0);
  __decorate3([
    n5({ type: String, reflect: true })
  ], VscodeButton.prototype, "name", void 0);
  __decorate3([
    n5({ type: Boolean, reflect: true, attribute: "icon-only" })
  ], VscodeButton.prototype, "iconOnly", void 0);
  __decorate3([
    n5({ reflect: true })
  ], VscodeButton.prototype, "type", void 0);
  __decorate3([
    n5()
  ], VscodeButton.prototype, "value", void 0);
  __decorate3([
    r5()
  ], VscodeButton.prototype, "_hasContentBefore", void 0);
  __decorate3([
    r5()
  ], VscodeButton.prototype, "_hasContentAfter", void 0);
  VscodeButton = __decorate3([
    customElement("vscode-button")
  ], VscodeButton);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeButton.js
  var VscodeButton3 = o({
    tagName: "vscode-button",
    elementClass: VscodeButton,
    react: import_react4.default,
    displayName: "VscodeButton"
  });
  var VscodeButton_default = VscodeButton3;

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCheckbox.js
  var import_react6 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/includes/form-button-widget/FormButtonWidgetBase.js
  var __decorate4 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var FormButtonWidgetBase = class extends VscElement {
    constructor() {
      super();
      this.focused = false;
      this._prevTabindex = 0;
      this._handleFocus = () => {
        this.focused = true;
      };
      this._handleBlur = () => {
        this.focused = false;
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("focus", this._handleFocus);
      this.addEventListener("blur", this._handleBlur);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("focus", this._handleFocus);
      this.removeEventListener("blur", this._handleBlur);
    }
    attributeChangedCallback(name, oldVal, newVal) {
      super.attributeChangedCallback(name, oldVal, newVal);
      if (name === "disabled" && this.hasAttribute("disabled")) {
        this._prevTabindex = this.tabIndex;
        this.tabIndex = -1;
      } else if (name === "disabled" && !this.hasAttribute("disabled")) {
        this.tabIndex = this._prevTabindex;
      }
    }
  };
  __decorate4([
    n5({ type: Boolean, reflect: true })
  ], FormButtonWidgetBase.prototype, "focused", void 0);

  // node_modules/@vscode-elements/elements/dist/includes/form-button-widget/LabelledCheckboxOrRadio.js
  var __decorate5 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var LabelledCheckboxOrRadioMixin = (superClass) => {
    class LabelledCheckboxOrRadio extends superClass {
      constructor() {
        super(...arguments);
        this._label = "";
        this._slottedText = "";
      }
      set label(val) {
        this._label = val;
        if (this._slottedText === "") {
          this.setAttribute("aria-label", val);
        }
      }
      get label() {
        return this._label;
      }
      _handleSlotChange() {
        this._slottedText = this.textContent ? this.textContent.trim() : "";
        if (this._slottedText !== "") {
          this.setAttribute("aria-label", this._slottedText);
        }
      }
      _renderLabelAttribute() {
        return this._slottedText === "" ? x`<span class="label-attr">${this._label}</span>` : x`${E}`;
      }
    }
    __decorate5([
      n5()
    ], LabelledCheckboxOrRadio.prototype, "label", null);
    return LabelledCheckboxOrRadio;
  };

  // node_modules/@vscode-elements/elements/dist/includes/form-button-widget/base.styles.js
  var base_styles_default = [
    i`
    :host {
      display: inline-block;
    }

    :host(:focus) {
      outline: none;
    }

    :host([disabled]) {
      opacity: 0.4;
    }

    .wrapper {
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 18px;
      margin-bottom: 4px;
      margin-top: 4px;
      min-height: 18px;
      position: relative;
      user-select: none;
    }

    :host([disabled]) .wrapper {
      cursor: default;
    }

    input {
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      left: 9px;
      margin: 0;
      overflow: hidden;
      position: absolute;
      top: 17px;
      white-space: nowrap;
      width: 1px;
    }

    .icon {
      align-items: center;
      background-color: var(--vscode-settings-checkboxBackground, #313131);
      background-size: 16px;
      border: 1px solid var(--vscode-settings-checkboxBorder, #3c3c3c);
      box-sizing: border-box;
      color: var(--vscode-settings-checkboxForeground, #cccccc);
      display: flex;
      height: 18px;
      justify-content: center;
      left: 0;
      margin-left: 0;
      margin-right: 9px;
      padding: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 18px;
    }

    .icon.before-empty-label {
      margin-right: 0;
    }

    .label {
      cursor: pointer;
      display: block;
      min-height: 18px;
      min-width: 18px;
    }

    .label-inner {
      display: block;
      opacity: 0.9;
      padding-left: 27px;
    }

    .label-inner.empty {
      padding-left: 0;
    }

    :host([disabled]) .label {
      cursor: default;
    }
  `
  ];

  // node_modules/@vscode-elements/elements/dist/vscode-checkbox/vscode-checkbox.styles.js
  var styles4 = [
    default_styles_default,
    base_styles_default,
    i`
    :host(:invalid) .icon,
    :host([invalid]) .icon {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    .icon {
      border-radius: 3px;
    }

    .indeterminate-icon {
      background-color: currentColor;
      position: absolute;
      height: 1px;
      width: 12px;
    }

    :host(:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }

    /* Toggle appearance */
    :host([toggle]) .icon {
      /* Track */
      width: 36px;
      height: 20px;
      border-radius: 999px;
      background-color: var(--vscode-button-secondaryBackground, #313131);
      border-color: var(--vscode-button-border, transparent);
      justify-content: flex-start;
      position: absolute;
    }

    :host(:focus):host([toggle]):host(:not([disabled])) .icon {
      outline-offset: 2px;
    }

    /* Reserve space for the wider toggle track so text doesn't overlap */
    :host([toggle]) .label-inner {
      padding-left: 45px; /* 36px track + 9px spacing */
    }

    :host([toggle]) .label {
      min-height: 20px;
    }

    :host([toggle]) .wrapper {
      min-height: 20px;
      line-height: 20px;
    }

    :host([toggle]) .thumb {
      /* Thumb */
      box-sizing: border-box;
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: var(--vscode-button-secondaryForeground, #cccccc);
      margin-left: 1px;
      transition: transform 120ms ease-in-out;
    }

    :host([toggle][checked]) .icon {
      background-color: var(--vscode-button-background, #04395e);
      border-color: var(--vscode-button-border, transparent);
    }

    :host([toggle][checked]) .thumb {
      transform: translateX(16px);
      background-color: var(--vscode-button-foreground, #ffffff);
    }

    :host([toggle]):host(:invalid) .icon {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    :host([toggle]):host(:invalid) .thumb {
      background-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    :host([toggle]) .check-icon,
    :host([toggle]) .indeterminate-icon {
      display: none;
    }

    :host([toggle]:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }
  `
  ];
  var vscode_checkbox_styles_default = styles4;

  // node_modules/@vscode-elements/elements/dist/vscode-checkbox/vscode-checkbox.js
  var __decorate6 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeCheckbox = class VscodeCheckbox2 extends LabelledCheckboxOrRadioMixin(FormButtonWidgetBase) {
    set checked(newVal) {
      this._checked = newVal;
      this._manageRequired();
      this.requestUpdate();
    }
    get checked() {
      return this._checked;
    }
    set required(newVal) {
      this._required = newVal;
      this._manageRequired();
      this.requestUpdate();
    }
    get required() {
      return this._required;
    }
    get form() {
      return this._internals.form;
    }
    get validity() {
      return this._internals.validity;
    }
    get validationMessage() {
      return this._internals.validationMessage;
    }
    get willValidate() {
      return this._internals.willValidate;
    }
    /**
     * Returns `true` if the element's value is valid; otherwise, it returns `false`.
     * If the element's value is invalid, an invalid event is triggered on the element.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity)
     */
    checkValidity() {
      return this._internals.checkValidity();
    }
    /**
     * Returns `true` if the element's value is valid; otherwise, it returns `false`.
     * If the element's value is invalid, an invalid event is triggered on the element, and the
     * browser displays an error message to the user.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity)
     */
    reportValidity() {
      return this._internals.reportValidity();
    }
    constructor() {
      super();
      this.autofocus = false;
      this._checked = false;
      this.defaultChecked = false;
      this.invalid = false;
      this.name = void 0;
      this.toggle = false;
      this.value = "";
      this.disabled = false;
      this.indeterminate = false;
      this._required = false;
      this.type = "checkbox";
      this._handleClick = (ev) => {
        ev.preventDefault();
        if (this.disabled) {
          return;
        }
        this._toggleState();
      };
      this._handleKeyDown = (ev) => {
        var _a6;
        if (!this.disabled && (ev.key === "Enter" || ev.key === " ")) {
          ev.preventDefault();
          if (ev.key === " ") {
            this._toggleState();
          }
          if (ev.key === "Enter") {
            (_a6 = this._internals.form) == null ? void 0 : _a6.requestSubmit();
          }
        }
      };
      this._internals = this.attachInternals();
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this._handleKeyDown);
      this.updateComplete.then(() => {
        this._manageRequired();
        this._setActualFormValue();
      });
    }
    disconnectedCallback() {
      this.removeEventListener("keydown", this._handleKeyDown);
    }
    /** @internal */
    formResetCallback() {
      this.checked = this.defaultChecked;
    }
    /** @internal */
    formStateRestoreCallback(state, _mode) {
      if (state) {
        this.checked = true;
      }
    }
    // Sets the value of the control according to the native checkbox behavior.
    // - If the checkbox is unchecked, the value will be null, so the control will
    //   excluded from the form.
    // - If the control is checked but the value is not set, the value will be "on".
    // - If the control is checked and value is set, the value won't be changed.
    _setActualFormValue() {
      let actualValue = "";
      if (this.checked) {
        actualValue = !this.value ? "on" : this.value;
      } else {
        actualValue = null;
      }
      this._internals.setFormValue(actualValue);
    }
    _toggleState() {
      this.checked = !this.checked;
      this.indeterminate = false;
      this._setActualFormValue();
      this._manageRequired();
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    _manageRequired() {
      var _a6;
      if (!this.checked && this.required) {
        this._internals.setValidity({
          valueMissing: true
        }, "Please check this box if you want to proceed.", (_a6 = this._inputEl) != null ? _a6 : void 0);
      } else {
        this._internals.setValidity({});
      }
    }
    render() {
      const iconClasses = e9({
        icon: true,
        checked: this.checked,
        indeterminate: this.indeterminate
      });
      const labelInnerClasses = e9({
        "label-inner": true
      });
      const icon = x`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="check-icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
      />
    </svg>`;
      const check = this.checked && !this.indeterminate ? icon : E;
      const indeterminate = this.indeterminate ? x`<span class="indeterminate-icon"></span>` : E;
      const iconContent = this.toggle ? x`<span class="thumb"></span>` : x`${indeterminate}${check}`;
      return x`
      <div class="wrapper">
        <input
          ?autofocus=${this.autofocus}
          id="input"
          class="checkbox"
          type="checkbox"
          ?checked=${this.checked}
          role=${o8(this.toggle ? "switch" : void 0)}
          aria-checked=${o8(this.toggle ? this.checked ? "true" : "false" : void 0)}
          value=${this.value}
        >
        <div class=${iconClasses}>${iconContent}</div>
        <label for="input" class="label" @click=${this._handleClick}>
          <span class=${labelInnerClasses}>
            ${this._renderLabelAttribute()}
            <slot @slotchange=${this._handleSlotChange}></slot>
          </span>
        </label>
      </div>
    `;
    }
  };
  VscodeCheckbox.styles = vscode_checkbox_styles_default;
  VscodeCheckbox.formAssociated = true;
  VscodeCheckbox.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate6([
    n5({ type: Boolean, reflect: true })
  ], VscodeCheckbox.prototype, "autofocus", void 0);
  __decorate6([
    n5({ type: Boolean, reflect: true })
  ], VscodeCheckbox.prototype, "checked", null);
  __decorate6([
    n5({ type: Boolean, reflect: true, attribute: "default-checked" })
  ], VscodeCheckbox.prototype, "defaultChecked", void 0);
  __decorate6([
    n5({ type: Boolean, reflect: true })
  ], VscodeCheckbox.prototype, "invalid", void 0);
  __decorate6([
    n5({ reflect: true })
  ], VscodeCheckbox.prototype, "name", void 0);
  __decorate6([
    n5({ type: Boolean, reflect: true })
  ], VscodeCheckbox.prototype, "toggle", void 0);
  __decorate6([
    n5()
  ], VscodeCheckbox.prototype, "value", void 0);
  __decorate6([
    n5({ type: Boolean, reflect: true })
  ], VscodeCheckbox.prototype, "disabled", void 0);
  __decorate6([
    n5({ type: Boolean, reflect: true })
  ], VscodeCheckbox.prototype, "indeterminate", void 0);
  __decorate6([
    n5({ type: Boolean, reflect: true })
  ], VscodeCheckbox.prototype, "required", null);
  __decorate6([
    n5()
  ], VscodeCheckbox.prototype, "type", void 0);
  __decorate6([
    e6("#input")
  ], VscodeCheckbox.prototype, "_inputEl", void 0);
  VscodeCheckbox = __decorate6([
    customElement("vscode-checkbox")
  ], VscodeCheckbox);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCheckbox.js
  var VscodeCheckbox3 = o({
    tagName: "vscode-checkbox",
    elementClass: VscodeCheckbox,
    react: import_react6.default,
    displayName: "VscodeCheckbox",
    events: {
      onChange: "change"
    }
  });
  var VscodeCheckbox_default = VscodeCheckbox3;

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCheckboxGroup.js
  var import_react8 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-checkbox-group/vscode-checkbox-group.styles.js
  var styles5 = [
    default_styles_default,
    i`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper {
      display: block;
    }

    ::slotted(vscode-checkbox) {
      margin-right: 20px;
    }

    ::slotted(vscode-checkbox:last-child) {
      margin-right: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-checkbox) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant='vertical']) ::slotted(vscode-checkbox:last-child) {
      margin-bottom: 0;
    }
  `
  ];
  var vscode_checkbox_group_styles_default = styles5;

  // node_modules/@vscode-elements/elements/dist/vscode-checkbox-group/vscode-checkbox-group.js
  var __decorate7 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeCheckboxGroup = class VscodeCheckboxGroup2 extends VscElement {
    constructor() {
      super(...arguments);
      this.role = "group";
      this.variant = "horizontal";
    }
    render() {
      return x`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
    }
  };
  VscodeCheckboxGroup.styles = vscode_checkbox_group_styles_default;
  __decorate7([
    n5({ reflect: true })
  ], VscodeCheckboxGroup.prototype, "role", void 0);
  __decorate7([
    n5({ reflect: true })
  ], VscodeCheckboxGroup.prototype, "variant", void 0);
  VscodeCheckboxGroup = __decorate7([
    customElement("vscode-checkbox-group")
  ], VscodeCheckboxGroup);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCheckboxGroup.js
  var VscodeCheckboxGroup3 = o({
    tagName: "vscode-checkbox-group",
    elementClass: VscodeCheckboxGroup,
    react: import_react8.default,
    displayName: "VscodeCheckboxGroup"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCollapsible.js
  var import_react10 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-collapsible/vscode-collapsible.styles.js
  var styles6 = [
    default_styles_default,
    i`
    .collapsible {
      background-color: var(--vscode-sideBar-background, #181818);
    }

    .collapsible-header {
      align-items: center;
      background-color: var(--vscode-sideBarSectionHeader-background, #181818);
      cursor: pointer;
      display: flex;
      height: 22px;
      line-height: 22px;
      user-select: none;
    }

    .collapsible-header:focus {
      opacity: 1;
      outline-offset: -1px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: var(--vscode-focusBorder, #0078d4);
    }

    .title {
      color: var(--vscode-sideBarTitle-foreground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: 11px;
      font-weight: 700;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .title .description {
      font-weight: 400;
      margin-left: 10px;
      text-transform: none;
      opacity: 0.6;
    }

    .header-icon {
      color: var(--vscode-icon-foreground, #cccccc);
      display: block;
      flex-shrink: 0;
      margin: 0 3px;
    }

    .collapsible.open .header-icon {
      transform: rotate(90deg);
    }

    .header-slots {
      align-items: center;
      display: flex;
      height: 22px;
      margin-left: auto;
      margin-right: 4px;
    }

    .actions {
      display: none;
    }

    .collapsible.open .actions.always-visible,
    .collapsible.open:hover .actions {
      display: block;
    }

    .header-slots slot {
      display: flex;
      max-height: 22px;
      overflow: hidden;
    }

    .header-slots slot::slotted(div) {
      align-items: center;
      display: flex;
    }

    .collapsible-body {
      display: none;
      overflow: hidden;
    }

    .collapsible.open .collapsible-body {
      display: block;
    }
  `
  ];
  var vscode_collapsible_styles_default = styles6;

  // node_modules/@vscode-elements/elements/dist/vscode-collapsible/vscode-collapsible.js
  var __decorate8 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeCollapsible = class VscodeCollapsible2 extends VscElement {
    constructor() {
      super(...arguments);
      this.alwaysShowHeaderActions = false;
      this.title = "";
      this.heading = "";
      this.description = "";
      this.open = false;
    }
    _emitToggleEvent() {
      this.dispatchEvent(new CustomEvent("vsc-collapsible-toggle", {
        detail: { open: this.open }
      }));
    }
    _onHeaderClick() {
      this.open = !this.open;
      this._emitToggleEvent();
    }
    _onHeaderKeyDown(event) {
      if (event.key === "Enter") {
        this.open = !this.open;
        this._emitToggleEvent();
      }
    }
    render() {
      const classes = { collapsible: true, open: this.open };
      const actionsClasses = {
        actions: true,
        "always-visible": this.alwaysShowHeaderActions
      };
      const heading = this.heading ? this.heading : this.title;
      const icon = x`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="header-icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
      />
    </svg>`;
      const descriptionMarkup = this.description ? x`<span class="description">${this.description}</span>` : E;
      return x`
      <div class=${e9(classes)}>
        <div
          class="collapsible-header"
          tabindex="0"
          @click=${this._onHeaderClick}
          @keydown=${this._onHeaderKeyDown}
        >
          ${icon}
          <h3 class="title">${heading}${descriptionMarkup}</h3>
          <div class="header-slots">
            <div class=${e9(actionsClasses)}>
              <slot name="actions"></slot>
            </div>
            <div class="decorations"><slot name="decorations"></slot></div>
          </div>
        </div>
        <div class="collapsible-body" part="body">
          <slot></slot>
        </div>
      </div>
    `;
    }
  };
  VscodeCollapsible.styles = vscode_collapsible_styles_default;
  __decorate8([
    n5({
      type: Boolean,
      reflect: true,
      attribute: "always-show-header-actions"
    })
  ], VscodeCollapsible.prototype, "alwaysShowHeaderActions", void 0);
  __decorate8([
    n5({ type: String })
  ], VscodeCollapsible.prototype, "title", void 0);
  __decorate8([
    n5()
  ], VscodeCollapsible.prototype, "heading", void 0);
  __decorate8([
    n5()
  ], VscodeCollapsible.prototype, "description", void 0);
  __decorate8([
    n5({ type: Boolean, reflect: true })
  ], VscodeCollapsible.prototype, "open", void 0);
  VscodeCollapsible = __decorate8([
    customElement("vscode-collapsible")
  ], VscodeCollapsible);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCollapsible.js
  var VscodeCollapsible3 = o({
    tagName: "vscode-collapsible",
    elementClass: VscodeCollapsible,
    react: import_react10.default,
    displayName: "VscodeCollapsible"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeContextMenu.js
  var import_react12 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-context-menu-item/vscode-context-menu-item.styles.js
  var styles7 = [
    default_styles_default,
    i`
    :host {
      display: block;
      outline: none;
      position: relative;
    }

    .context-menu-item {
      background-color: var(--vscode-menu-background, #1f1f1f);
      color: var(--vscode-menu-foreground, #cccccc);
      display: flex;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 1.4em;
      user-select: none;
      white-space: nowrap;
    }

    .ruler {
      border-bottom: 1px solid var(--vscode-menu-separatorBackground, #454545);
      display: block;
      margin: 0 0 4px;
      padding-top: 4px;
      width: 100%;
    }

    .context-menu-item a {
      align-items: center;
      border-color: transparent;
      border-radius: 3px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-menu-foreground, #cccccc);
      cursor: pointer;
      display: flex;
      flex: 1 1 auto;
      height: 2em;
      margin-left: 4px;
      margin-right: 4px;
      outline: none;
      position: relative;
      text-decoration: inherit;
    }

    :host([selected]) .context-menu-item a {
      background-color: var(--vscode-menu-selectionBackground, #0078d4);
      border-color: var(--vscode-menu-selectionBorder, transparent);
      color: var(--vscode-menu-selectionForeground, #ffffff);
    }

    .label {
      background: none;
      display: flex;
      flex: 1 1 auto;
      font-size: 12px;
      line-height: 1;
      padding: 0 22px;
      text-decoration: none;
    }

    .keybinding {
      display: block;
      flex: 2 1 auto;
      line-height: 1;
      padding: 0 22px;
      text-align: right;
    }
  `
  ];
  var vscode_context_menu_item_styles_default = styles7;

  // node_modules/@vscode-elements/elements/dist/vscode-context-menu-item/vscode-context-menu-item.js
  var __decorate9 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeContextMenuItem = class VscodeContextMenuItem2 extends VscElement {
    constructor() {
      super(...arguments);
      this.label = "";
      this.keybinding = "";
      this.value = "";
      this.separator = false;
      this.tabindex = 0;
    }
    onItemClick() {
      this.dispatchEvent(new CustomEvent("vsc-click", {
        detail: {
          label: this.label,
          keybinding: this.keybinding,
          value: this.value || this.label,
          separator: this.separator,
          tabindex: this.tabindex
        },
        bubbles: true,
        composed: true
      }));
    }
    render() {
      return x`
      ${this.separator ? x`
            <div class="context-menu-item separator">
              <span class="ruler"></span>
            </div>
          ` : x`
            <div class="context-menu-item">
              <a @click=${this.onItemClick}>
                ${this.label ? x`<span class="label">${this.label}</span>` : E}
                ${this.keybinding ? x`<span class="keybinding">${this.keybinding}</span>` : E}
              </a>
            </div>
          `}
    `;
    }
  };
  VscodeContextMenuItem.styles = vscode_context_menu_item_styles_default;
  __decorate9([
    n5({ type: String })
  ], VscodeContextMenuItem.prototype, "label", void 0);
  __decorate9([
    n5({ type: String })
  ], VscodeContextMenuItem.prototype, "keybinding", void 0);
  __decorate9([
    n5({ type: String })
  ], VscodeContextMenuItem.prototype, "value", void 0);
  __decorate9([
    n5({ type: Boolean, reflect: true })
  ], VscodeContextMenuItem.prototype, "separator", void 0);
  __decorate9([
    n5({ type: Number })
  ], VscodeContextMenuItem.prototype, "tabindex", void 0);
  VscodeContextMenuItem = __decorate9([
    customElement("vscode-context-menu-item")
  ], VscodeContextMenuItem);

  // node_modules/@vscode-elements/elements/dist/vscode-context-menu/vscode-context-menu.styles.js
  var styles8 = [
    default_styles_default,
    i`
    :host {
      display: block;
      position: relative;
    }

    .context-menu {
      background-color: var(--vscode-menu-background, #1f1f1f);
      border-color: var(--vscode-menu-border, #454545);
      border-radius: 5px;
      border-style: solid;
      border-width: 1px;
      box-shadow: 0 2px 8px var(--vscode-widget-shadow, rgba(0, 0, 0, 0.36));
      color: var(--vscode-menu-foreground, #cccccc);
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 1.4em;
      padding: 4px 0;
      white-space: nowrap;
    }

    .context-menu:focus {
      outline: 0;
    }
  `
  ];
  var vscode_context_menu_styles_default = styles8;

  // node_modules/@vscode-elements/elements/dist/vscode-context-menu/vscode-context-menu.js
  var __decorate10 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeContextMenu = class VscodeContextMenu2 extends VscElement {
    set data(data) {
      this._data = data;
      const indexes = [];
      data.forEach((v3, i7) => {
        if (!v3.separator) {
          indexes.push(i7);
        }
      });
      this._clickableItemIndexes = indexes;
    }
    get data() {
      return this._data;
    }
    set show(show) {
      this._show = show;
      this._selectedClickableItemIndex = -1;
      if (show) {
        this.updateComplete.then(() => {
          if (this._wrapperEl) {
            this._wrapperEl.focus();
          }
          requestAnimationFrame(() => {
            document.addEventListener("click", this._onClickOutsideBound, {
              once: true
            });
          });
        });
      }
    }
    get show() {
      return this._show;
    }
    constructor() {
      super();
      this.preventClose = false;
      this.tabIndex = 0;
      this._selectedClickableItemIndex = -1;
      this._show = false;
      this._data = [];
      this._clickableItemIndexes = [];
      this._onClickOutsideBound = this._onClickOutside.bind(this);
      this.addEventListener("keydown", this._onKeyDown);
    }
    _onClickOutside(ev) {
      if (!ev.composedPath().includes(this)) {
        this.show = false;
      }
    }
    _onKeyDown(ev) {
      const { key } = ev;
      if (key === "ArrowUp" || key === "ArrowDown" || key === "Escape" || key === "Enter") {
        ev.preventDefault();
      }
      switch (key) {
        case "ArrowUp":
          this._handleArrowUp();
          break;
        case "ArrowDown":
          this._handleArrowDown();
          break;
        case "Escape":
          this._handleEscape();
          break;
        case "Enter":
          this._handleEnter();
          break;
        default:
      }
    }
    _handleArrowUp() {
      if (this._selectedClickableItemIndex === 0) {
        this._selectedClickableItemIndex = this._clickableItemIndexes.length - 1;
      } else {
        this._selectedClickableItemIndex -= 1;
      }
    }
    _handleArrowDown() {
      if (this._selectedClickableItemIndex + 1 < this._clickableItemIndexes.length) {
        this._selectedClickableItemIndex += 1;
      } else {
        this._selectedClickableItemIndex = 0;
      }
    }
    _handleEscape() {
      this.show = false;
      document.removeEventListener("click", this._onClickOutsideBound);
    }
    _dispatchSelectEvent(selectedOption) {
      const { keybinding, label, value, separator, tabindex } = selectedOption;
      this.dispatchEvent(new CustomEvent("vsc-context-menu-select", {
        detail: {
          keybinding,
          label,
          separator,
          tabindex,
          value
        }
      }));
    }
    _handleEnter() {
      if (this._selectedClickableItemIndex === -1) {
        return;
      }
      const realItemIndex = this._clickableItemIndexes[this._selectedClickableItemIndex];
      const options = this._wrapperEl.querySelectorAll("vscode-context-menu-item");
      const selectedOption = options[realItemIndex];
      this._dispatchSelectEvent(selectedOption);
      if (!this.preventClose) {
        this.show = false;
        document.removeEventListener("click", this._onClickOutsideBound);
      }
    }
    _onItemClick(event) {
      const et = event.currentTarget;
      this._dispatchSelectEvent(et);
      if (!this.preventClose) {
        this.show = false;
      }
    }
    _onItemMouseOver(event) {
      const el = event.target;
      const index = el.dataset.index ? +el.dataset.index : -1;
      const found = this._clickableItemIndexes.findIndex((item) => item === index);
      if (found !== -1) {
        this._selectedClickableItemIndex = found;
      }
    }
    _onItemMouseOut() {
      this._selectedClickableItemIndex = -1;
    }
    render() {
      if (!this._show) {
        return x`${E}`;
      }
      const selectedIndex = this._clickableItemIndexes[this._selectedClickableItemIndex];
      return x`
      <div class="context-menu" tabindex="0">
        ${this.data ? this.data.map(({ label = "", keybinding = "", value = "", separator = false, tabindex = 0 }, index) => x`
                <vscode-context-menu-item
                  label=${label}
                  keybinding=${keybinding}
                  value=${value}
                  ?separator=${separator}
                  ?selected=${index === selectedIndex}
                  tabindex=${tabindex}
                  @vsc-click=${this._onItemClick}
                  @mouseover=${this._onItemMouseOver}
                  @mouseout=${this._onItemMouseOut}
                  data-index=${index}
                ></vscode-context-menu-item>
              `) : x`<slot></slot>`}
      </div>
    `;
    }
  };
  VscodeContextMenu.styles = vscode_context_menu_styles_default;
  __decorate10([
    n5({ type: Array, attribute: false })
  ], VscodeContextMenu.prototype, "data", null);
  __decorate10([
    n5({ type: Boolean, reflect: true, attribute: "prevent-close" })
  ], VscodeContextMenu.prototype, "preventClose", void 0);
  __decorate10([
    n5({ type: Boolean, reflect: true })
  ], VscodeContextMenu.prototype, "show", null);
  __decorate10([
    n5({ type: Number, reflect: true })
  ], VscodeContextMenu.prototype, "tabIndex", void 0);
  __decorate10([
    r5()
  ], VscodeContextMenu.prototype, "_selectedClickableItemIndex", void 0);
  __decorate10([
    r5()
  ], VscodeContextMenu.prototype, "_show", void 0);
  __decorate10([
    e6(".context-menu")
  ], VscodeContextMenu.prototype, "_wrapperEl", void 0);
  VscodeContextMenu = __decorate10([
    customElement("vscode-context-menu")
  ], VscodeContextMenu);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeContextMenu.js
  var VscodeContextMenu3 = o({
    tagName: "vscode-context-menu",
    elementClass: VscodeContextMenu,
    react: import_react12.default,
    displayName: "VscodeContextMenu",
    events: {
      onVscContextMenuSelect: "vsc-context-menu-select"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeContextMenuItem.js
  var import_react14 = __toESM(require_react(), 1);
  var VscodeContextMenuItem3 = o({
    tagName: "vscode-context-menu-item",
    elementClass: VscodeContextMenuItem,
    react: import_react14.default,
    displayName: "VscodeContextMenuItem"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeDivider.js
  var import_react16 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-divider/vscode-divider.styles.js
  var styles9 = [
    default_styles_default,
    i`
    :host {
      display: block;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    div {
      background-color: var(--vscode-foreground, #cccccc);
      height: 1px;
      opacity: 0.4;
    }
  `
  ];
  var vscode_divider_styles_default = styles9;

  // node_modules/@vscode-elements/elements/dist/vscode-divider/vscode-divider.js
  var __decorate11 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeDivider = class VscodeDivider2 extends VscElement {
    constructor() {
      super(...arguments);
      this.role = "separator";
    }
    render() {
      return x`<div></div>`;
    }
  };
  VscodeDivider.styles = vscode_divider_styles_default;
  __decorate11([
    n5({ reflect: true })
  ], VscodeDivider.prototype, "role", void 0);
  VscodeDivider = __decorate11([
    customElement("vscode-divider")
  ], VscodeDivider);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeDivider.js
  var VscodeDivider3 = o({
    tagName: "vscode-divider",
    elementClass: VscodeDivider,
    react: import_react16.default,
    displayName: "VscodeDivider"
  });
  var VscodeDivider_default = VscodeDivider3;

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormContainer.js
  var import_react18 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-form-container/vscode-form-container.styles.js
  var styles10 = [
    default_styles_default,
    i`
    :host {
      display: block;
      max-width: 727px;
    }
  `
  ];
  var vscode_form_container_styles_default = styles10;

  // node_modules/@vscode-elements/elements/dist/vscode-form-container/vscode-form-container.js
  var __decorate12 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var FormGroupLayout;
  (function(FormGroupLayout2) {
    FormGroupLayout2["HORIZONTAL"] = "horizontal";
    FormGroupLayout2["VERTICAL"] = "vertical";
  })(FormGroupLayout || (FormGroupLayout = {}));
  var VscodeFormContainer = class VscodeFormContainer2 extends VscElement {
    constructor() {
      super(...arguments);
      this.breakpoint = 490;
      this._responsive = false;
      this._firstUpdateComplete = false;
      this._resizeObserverCallbackBound = this._resizeObserverCallback.bind(this);
    }
    set responsive(isResponsive) {
      this._responsive = isResponsive;
      if (this._firstUpdateComplete) {
        if (isResponsive) {
          this._activateResponsiveLayout();
        } else {
          this._deactivateResizeObserver();
        }
      }
    }
    get responsive() {
      return this._responsive;
    }
    _toggleCompactLayout(layout) {
      this._assignedFormGroups.forEach((group) => {
        if (!group.dataset.originalVariant) {
          group.dataset.originalVariant = group.variant;
        }
        const oVariant = group.dataset.originalVariant;
        if (layout === FormGroupLayout.VERTICAL && oVariant === "horizontal") {
          group.variant = "vertical";
        } else {
          group.variant = oVariant;
        }
        const checkboxOrRadioGroup = group.querySelectorAll("vscode-checkbox-group, vscode-radio-group");
        checkboxOrRadioGroup.forEach((widgetGroup) => {
          if (!widgetGroup.dataset.originalVariant) {
            widgetGroup.dataset.originalVariant = widgetGroup.variant;
          }
          const originalVariant = widgetGroup.dataset.originalVariant;
          if (layout === FormGroupLayout.HORIZONTAL && originalVariant === FormGroupLayout.HORIZONTAL) {
            widgetGroup.variant = "horizontal";
          } else {
            widgetGroup.variant = "vertical";
          }
        });
      });
    }
    _resizeObserverCallback(entries) {
      let wrapperWidth = 0;
      for (const entry of entries) {
        wrapperWidth = entry.contentRect.width;
      }
      const nextLayout = wrapperWidth < this.breakpoint ? FormGroupLayout.VERTICAL : FormGroupLayout.HORIZONTAL;
      if (nextLayout !== this._currentFormGroupLayout) {
        this._toggleCompactLayout(nextLayout);
        this._currentFormGroupLayout = nextLayout;
      }
    }
    _activateResponsiveLayout() {
      this._resizeObserver = new ResizeObserver(this._resizeObserverCallbackBound);
      this._resizeObserver.observe(this._wrapperElement);
    }
    _deactivateResizeObserver() {
      var _a6;
      (_a6 = this._resizeObserver) == null ? void 0 : _a6.disconnect();
      this._resizeObserver = null;
    }
    firstUpdated() {
      this._firstUpdateComplete = true;
      if (this._responsive) {
        this._activateResponsiveLayout();
      }
    }
    render() {
      return x`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
    }
  };
  VscodeFormContainer.styles = vscode_form_container_styles_default;
  __decorate12([
    n5({ type: Boolean, reflect: true })
  ], VscodeFormContainer.prototype, "responsive", null);
  __decorate12([
    n5({ type: Number })
  ], VscodeFormContainer.prototype, "breakpoint", void 0);
  __decorate12([
    e6(".wrapper")
  ], VscodeFormContainer.prototype, "_wrapperElement", void 0);
  __decorate12([
    o7({ selector: "vscode-form-group" })
  ], VscodeFormContainer.prototype, "_assignedFormGroups", void 0);
  VscodeFormContainer = __decorate12([
    customElement("vscode-form-container")
  ], VscodeFormContainer);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormContainer.js
  var VscodeFormContainer3 = o({
    tagName: "vscode-form-container",
    elementClass: VscodeFormContainer,
    react: import_react18.default,
    displayName: "VscodeFormContainer"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormGroup.js
  var import_react20 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-form-group/vscode-form-group.styles.js
  var styles11 = [
    default_styles_default,
    i`
    :host {
      --label-right-margin: 14px;
      --label-width: 150px;

      display: block;
      margin: 15px 0;
    }

    :host([variant='settings-group']) {
      margin: 0;
      padding: 12px 14px 18px;
      max-width: 727px;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper,
    :host([variant='settings-group']) .wrapper {
      display: block;
    }

    :host([variant='horizontal']) ::slotted(vscode-checkbox-group),
    :host([variant='horizontal']) ::slotted(vscode-radio-group) {
      width: calc(100% - calc(var(--label-width) + var(--label-right-margin)));
    }

    :host([variant='horizontal']) ::slotted(vscode-label) {
      margin-right: var(--label-right-margin);
      text-align: right;
      width: var(--label-width);
    }

    :host([variant='settings-group']) ::slotted(vscode-label) {
      height: 18px;
      line-height: 18px;
      margin-bottom: 4px;
      margin-right: 0;
      padding: 0;
    }

    ::slotted(vscode-form-helper) {
      margin-left: calc(var(--label-width) + var(--label-right-margin));
    }

    :host([variant='vertical']) ::slotted(vscode-form-helper),
    :host([variant='settings-group']) ::slotted(vscode-form-helper) {
      display: block;
      margin-left: 0;
    }

    :host([variant='settings-group']) ::slotted(vscode-form-helper) {
      margin-bottom: 0;
      margin-top: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-label),
    :host([variant='settings-group']) ::slotted(vscode-label) {
      display: block;
      margin-left: 0;
      text-align: left;
    }

    :host([variant='settings-group']) ::slotted(vscode-inputbox),
    :host([variant='settings-group']) ::slotted(vscode-textfield),
    :host([variant='settings-group']) ::slotted(vscode-textarea),
    :host([variant='settings-group']) ::slotted(vscode-single-select),
    :host([variant='settings-group']) ::slotted(vscode-multi-select) {
      margin-top: 9px;
    }

    ::slotted(vscode-button:first-child) {
      margin-left: calc(var(--label-width) + var(--label-right-margin));
    }

    :host([variant='vertical']) ::slotted(vscode-button) {
      margin-left: 0;
    }

    ::slotted(vscode-button) {
      margin-right: 4px;
    }
  `
  ];
  var vscode_form_group_styles_default = styles11;

  // node_modules/@vscode-elements/elements/dist/vscode-form-group/vscode-form-group.js
  var __decorate13 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeFormGroup = class VscodeFormGroup2 extends VscElement {
    constructor() {
      super(...arguments);
      this.variant = "horizontal";
    }
    render() {
      return x`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
    }
  };
  VscodeFormGroup.styles = vscode_form_group_styles_default;
  __decorate13([
    n5({ reflect: true })
  ], VscodeFormGroup.prototype, "variant", void 0);
  VscodeFormGroup = __decorate13([
    customElement("vscode-form-group")
  ], VscodeFormGroup);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormGroup.js
  var VscodeFormGroup3 = o({
    tagName: "vscode-form-group",
    elementClass: VscodeFormGroup,
    react: import_react20.default,
    displayName: "VscodeFormGroup"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormHelper.js
  var import_react22 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-form-helper/vscode-form-helper.styles.js
  var styles12 = [
    default_styles_default,
    i`
    :host {
      display: block;
      line-height: 1.4em;
      margin-bottom: 4px;
      margin-top: 4px;
      max-width: 720px;
      opacity: 0.9;
    }

    :host([vertical]) {
      margin-left: 0;
    }
  `
  ];
  var vscode_form_helper_styles_default = styles12;

  // node_modules/@vscode-elements/elements/dist/vscode-form-helper/vscode-form-helper.js
  var __decorate14 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var lightDOMStyles = new CSSStyleSheet();
  lightDOMStyles.replaceSync(`
  vscode-form-helper * {
    margin: 0;
  }

  vscode-form-helper *:not(:last-child) {
    margin-bottom: 8px;
  }
`);
  var VscodeFormHelper = class VscodeFormHelper2 extends VscElement {
    constructor() {
      super();
      this._injectLightDOMStyles();
    }
    _injectLightDOMStyles() {
      const found = document.adoptedStyleSheets.find((s8) => s8 === lightDOMStyles);
      if (!found) {
        document.adoptedStyleSheets.push(lightDOMStyles);
      }
    }
    render() {
      return x`<slot></slot>`;
    }
  };
  VscodeFormHelper.styles = vscode_form_helper_styles_default;
  VscodeFormHelper = __decorate14([
    customElement("vscode-form-helper")
  ], VscodeFormHelper);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormHelper.js
  var VscodeFormHelper3 = o({
    tagName: "vscode-form-helper",
    elementClass: VscodeFormHelper,
    react: import_react22.default,
    displayName: "VscodeFormHelper"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeIcon.js
  var import_react24 = __toESM(require_react(), 1);
  var VscodeIcon3 = o({
    tagName: "vscode-icon",
    elementClass: VscodeIcon,
    react: import_react24.default,
    displayName: "VscodeIcon"
  });
  var VscodeIcon_default = VscodeIcon3;

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeLabel.js
  var import_react26 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/includes/uniqueId.js
  var counter = 0;
  var uniqueId = (prefix = "") => {
    counter++;
    return `${prefix}${counter}`;
  };
  var uniqueId_default = uniqueId;

  // node_modules/@vscode-elements/elements/dist/vscode-label/vscode-label.styles.js
  var styles13 = [
    default_styles_default,
    i`
    :host {
      display: block;
    }

    .wrapper {
      color: var(--vscode-foreground, #cccccc);
      cursor: default;
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: 600;
      line-height: ${INPUT_LINE_HEIGHT_RATIO};
      padding: 5px 0;
    }

    .wrapper.required:after {
      content: ' *';
    }

    ::slotted(.normal) {
      font-weight: normal;
    }

    ::slotted(.lightened) {
      color: var(--vscode-foreground, #cccccc);
      opacity: 0.9;
    }
  `
  ];
  var vscode_label_styles_default = styles13;

  // node_modules/@vscode-elements/elements/dist/vscode-label/vscode-label.js
  var __decorate15 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeLabel = class VscodeLabel2 extends VscElement {
    constructor() {
      super(...arguments);
      this.required = false;
      this._id = "";
      this._htmlFor = "";
      this._connected = false;
    }
    set htmlFor(val) {
      this._htmlFor = val;
      this.setAttribute("for", val);
      if (this._connected) {
        this._connectWithTarget();
      }
    }
    get htmlFor() {
      return this._htmlFor;
    }
    set id(val) {
      this._id = val;
    }
    get id() {
      return this._id;
    }
    attributeChangedCallback(name, old, value) {
      super.attributeChangedCallback(name, old, value);
    }
    connectedCallback() {
      super.connectedCallback();
      this._connected = true;
      if (this._id === "") {
        this._id = uniqueId_default("vscode-label-");
        this.setAttribute("id", this._id);
      }
      this._connectWithTarget();
    }
    _getTarget() {
      let target = null;
      if (this._htmlFor) {
        const root = this.getRootNode({ composed: false });
        if (root) {
          target = root.querySelector(`#${this._htmlFor}`);
        }
      }
      return target;
    }
    async _connectWithTarget() {
      var _a6, _b2;
      await this.updateComplete;
      const target = this._getTarget();
      if (["vscode-radio-group", "vscode-checkbox-group"].includes((_a6 = target == null ? void 0 : target.tagName.toLowerCase()) != null ? _a6 : "")) {
        target.setAttribute("aria-labelledby", this._id);
      }
      let label = "";
      if (this.textContent) {
        label = this.textContent.trim();
      }
      if (target && "label" in target && [
        "vscode-textfield",
        "vscode-textarea",
        "vscode-single-select",
        "vscode-multi-select"
      ].includes((_b2 = target == null ? void 0 : target.tagName.toLowerCase()) != null ? _b2 : "")) {
        target.label = label;
      }
    }
    _handleClick() {
      const target = this._getTarget();
      if (target && "focus" in target) {
        target.focus();
      }
    }
    render() {
      return x`
      <label
        class=${e9({ wrapper: true, required: this.required })}
        @click=${this._handleClick}
        ><slot></slot
      ></label>
    `;
    }
  };
  VscodeLabel.styles = vscode_label_styles_default;
  __decorate15([
    n5({ reflect: true, attribute: "for" })
  ], VscodeLabel.prototype, "htmlFor", null);
  __decorate15([
    n5()
  ], VscodeLabel.prototype, "id", null);
  __decorate15([
    n5({ type: Boolean, reflect: true })
  ], VscodeLabel.prototype, "required", void 0);
  VscodeLabel = __decorate15([
    customElement("vscode-label")
  ], VscodeLabel);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeLabel.js
  var VscodeLabel3 = o({
    tagName: "vscode-label",
    elementClass: VscodeLabel,
    react: import_react26.default,
    displayName: "VscodeLabel"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeMultiSelect.js
  var import_react28 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/includes/vscode-select/template-elements.js
  var chevronDownIcon = x`
  <span class="icon">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"
      />
    </svg>
  </span>
`;
  var checkIcon = b2`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
  />
</svg>`;

  // node_modules/lit-html/directive-helpers.js
  var { I: t5 } = Z;
  var r7 = () => document.createComment("");
  var s4 = (o9, i7, n9) => {
    var _a6;
    const e12 = o9._$AA.parentNode, l3 = void 0 === i7 ? o9._$AB : i7._$AA;
    if (void 0 === n9) {
      const i8 = e12.insertBefore(r7(), l3), d3 = e12.insertBefore(r7(), l3);
      n9 = new t5(i8, d3, o9, o9.options);
    } else {
      const t7 = n9._$AB.nextSibling, i8 = n9._$AM, d3 = i8 !== o9;
      if (d3) {
        let t8;
        (_a6 = n9._$AQ) == null ? void 0 : _a6.call(n9, o9), n9._$AM = o9, void 0 !== n9._$AP && (t8 = o9._$AU) !== i8._$AU && n9._$AP(t8);
      }
      if (t7 !== l3 || d3) {
        let o10 = n9._$AA;
        for (; o10 !== t7; ) {
          const t8 = o10.nextSibling;
          e12.insertBefore(o10, l3), o10 = t8;
        }
      }
    }
    return n9;
  };
  var v2 = (o9, t7, i7 = o9) => (o9._$AI(t7, i7), o9);
  var u3 = {};
  var m2 = (o9, t7 = u3) => o9._$AH = t7;
  var p3 = (o9) => o9._$AH;
  var M2 = (o9) => {
    o9._$AR(), o9._$AA.remove();
  };

  // node_modules/lit-html/directives/repeat.js
  var u4 = (e12, s8, t7) => {
    const r8 = /* @__PURE__ */ new Map();
    for (let l3 = s8; l3 <= t7; l3++) r8.set(e12[l3], l3);
    return r8;
  };
  var c4 = e8(class extends i5 {
    constructor(e12) {
      if (super(e12), e12.type !== t4.CHILD) throw Error("repeat() can only be used in text expressions");
    }
    dt(e12, s8, t7) {
      let r8;
      void 0 === t7 ? t7 = s8 : void 0 !== s8 && (r8 = s8);
      const l3 = [], o9 = [];
      let i7 = 0;
      for (const s9 of e12) l3[i7] = r8 ? r8(s9, i7) : i7, o9[i7] = t7(s9, i7), i7++;
      return { values: o9, keys: l3 };
    }
    render(e12, s8, t7) {
      return this.dt(e12, s8, t7).values;
    }
    update(s8, [t7, r8, c6]) {
      var _a6;
      const d3 = p3(s8), { values: p4, keys: a3 } = this.dt(t7, r8, c6);
      if (!Array.isArray(d3)) return this.ut = a3, p4;
      const h3 = (_a6 = this.ut) != null ? _a6 : this.ut = [], v3 = [];
      let m3, y3, x2 = 0, j2 = d3.length - 1, k2 = 0, w2 = p4.length - 1;
      for (; x2 <= j2 && k2 <= w2; ) if (null === d3[x2]) x2++;
      else if (null === d3[j2]) j2--;
      else if (h3[x2] === a3[k2]) v3[k2] = v2(d3[x2], p4[k2]), x2++, k2++;
      else if (h3[j2] === a3[w2]) v3[w2] = v2(d3[j2], p4[w2]), j2--, w2--;
      else if (h3[x2] === a3[w2]) v3[w2] = v2(d3[x2], p4[w2]), s4(s8, v3[w2 + 1], d3[x2]), x2++, w2--;
      else if (h3[j2] === a3[k2]) v3[k2] = v2(d3[j2], p4[k2]), s4(s8, d3[x2], d3[j2]), j2--, k2++;
      else if (void 0 === m3 && (m3 = u4(a3, k2, w2), y3 = u4(h3, x2, j2)), m3.has(h3[x2])) if (m3.has(h3[j2])) {
        const e12 = y3.get(a3[k2]), t8 = void 0 !== e12 ? d3[e12] : null;
        if (null === t8) {
          const e13 = s4(s8, d3[x2]);
          v2(e13, p4[k2]), v3[k2] = e13;
        } else v3[k2] = v2(t8, p4[k2]), s4(s8, d3[x2], t8), d3[e12] = null;
        k2++;
      } else M2(d3[j2]), j2--;
      else M2(d3[x2]), x2++;
      for (; k2 <= w2; ) {
        const e12 = s4(s8, v3[w2 + 1]);
        v2(e12, p4[k2]), v3[k2++] = e12;
      }
      for (; x2 <= j2; ) {
        const e12 = d3[x2++];
        null !== e12 && M2(e12);
      }
      return this.ut = a3, m2(s8, v3), T;
    }
  });

  // node_modules/lit-html/directives/when.js
  function n7(n9, r8, t7) {
    return n9 ? r8(n9) : t7 == null ? void 0 : t7(n9);
  }

  // node_modules/@vscode-elements/elements/dist/vscode-option/vscode-option.styles.js
  var vscode_option_styles_default = default_styles_default;

  // node_modules/@vscode-elements/elements/dist/vscode-option/vscode-option.js
  var __decorate16 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeOption = class VscodeOption2 extends VscElement {
    constructor() {
      super(...arguments);
      this.description = "";
      this.selected = false;
      this.disabled = false;
      this._initialized = false;
      this._handleSlotChange = () => {
        if (this._initialized) {
          this.dispatchEvent(new Event("vsc-option-state-change", { bubbles: true }));
        }
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.updateComplete.then(() => {
        this._initialized = true;
      });
    }
    willUpdate(changedProperties) {
      if (this._initialized && (changedProperties.has("description") || changedProperties.has("value") || changedProperties.has("selected") || changedProperties.has("disabled"))) {
        this.dispatchEvent(new Event("vsc-option-state-change", { bubbles: true }));
      }
    }
    render() {
      return x`<slot @slotchange=${this._handleSlotChange}></slot>`;
    }
  };
  VscodeOption.styles = vscode_option_styles_default;
  __decorate16([
    n5({ type: String })
  ], VscodeOption.prototype, "value", void 0);
  __decorate16([
    n5({ type: String })
  ], VscodeOption.prototype, "description", void 0);
  __decorate16([
    n5({ type: Boolean, reflect: true })
  ], VscodeOption.prototype, "selected", void 0);
  __decorate16([
    n5({ type: Boolean, reflect: true })
  ], VscodeOption.prototype, "disabled", void 0);
  VscodeOption = __decorate16([
    customElement("vscode-option")
  ], VscodeOption);

  // node_modules/@vscode-elements/elements/dist/includes/vscode-select/helpers.js
  var startsWithPerTermSearch = (subject, pattern) => {
    const result = {
      match: false,
      ranges: []
    };
    const lcSubject = subject.toLowerCase();
    const lcPattern = pattern.toLowerCase();
    const terms = lcSubject.split(" ");
    let offset = 0;
    terms.forEach((t7, i7) => {
      if (i7 > 0) {
        offset += terms[i7 - 1].length + 1;
      }
      if (result.match) {
        return;
      }
      const foundIndex = t7.indexOf(lcPattern);
      const patternLength = lcPattern.length;
      if (foundIndex === 0) {
        result.match = true;
        result.ranges.push([
          offset + foundIndex,
          Math.min(offset + foundIndex + patternLength, subject.length)
        ]);
      }
    });
    return result;
  };
  var startsWithSearch = (subject, pattern) => {
    const result = {
      match: false,
      ranges: []
    };
    const foundIndex = subject.toLowerCase().indexOf(pattern.toLowerCase());
    if (foundIndex === 0) {
      result.match = true;
      result.ranges = [[0, pattern.length]];
    }
    return result;
  };
  var containsSearch = (subject, pattern) => {
    const result = {
      match: false,
      ranges: []
    };
    const foundIndex = subject.toLowerCase().indexOf(pattern.toLowerCase());
    if (foundIndex > -1) {
      result.match = true;
      result.ranges = [[foundIndex, foundIndex + pattern.length]];
    }
    return result;
  };
  var fuzzySearch = (subject, pattern) => {
    const result = {
      match: false,
      ranges: []
    };
    let fromIndex = 0;
    let foundIndex = 0;
    const iMax = pattern.length - 1;
    const lcSubject = subject.toLowerCase();
    const lcPattern = pattern.toLowerCase();
    for (let i7 = 0; i7 <= iMax; i7++) {
      foundIndex = lcSubject.indexOf(lcPattern[i7], fromIndex);
      if (foundIndex === -1) {
        return {
          match: false,
          ranges: []
        };
      }
      result.match = true;
      result.ranges.push([foundIndex, foundIndex + 1]);
      fromIndex = foundIndex + 1;
    }
    return result;
  };
  var filterOptionsByPattern = (list, pattern, method) => {
    const filtered = [];
    list.forEach((op) => {
      let result;
      switch (method) {
        case "startsWithPerTerm":
          result = startsWithPerTermSearch(op.label, pattern);
          break;
        case "startsWith":
          result = startsWithSearch(op.label, pattern);
          break;
        case "contains":
          result = containsSearch(op.label, pattern);
          break;
        default:
          result = fuzzySearch(op.label, pattern);
      }
      if (result.match) {
        filtered.push({ ...op, ranges: result.ranges });
      }
    });
    return filtered;
  };
  var preventSpaces = (text) => {
    const res = [];
    if (text === " ") {
      res.push(x`&nbsp;`);
      return res;
    }
    if (text.indexOf(" ") === 0) {
      res.push(x`&nbsp;`);
    }
    res.push(x`${text.trimStart().trimEnd()}`);
    if (text.lastIndexOf(" ") === text.length - 1) {
      res.push(x`&nbsp;`);
    }
    return res;
  };
  var highlightRanges = (text, ranges) => {
    const res = [];
    const rl = ranges.length;
    if (rl < 1) {
      return x`${text}`;
    }
    ranges.forEach((r8, i7) => {
      const match = text.substring(r8[0], r8[1]);
      if (i7 === 0 && r8[0] !== 0) {
        res.push(...preventSpaces(text.substring(0, ranges[0][0])));
      }
      if (i7 > 0 && i7 < rl && r8[0] - ranges[i7 - 1][1] !== 0) {
        res.push(...preventSpaces(text.substring(ranges[i7 - 1][1], r8[0])));
      }
      res.push(x`<b>${preventSpaces(match)}</b>`);
      if (i7 === rl - 1 && r8[1] < text.length) {
        res.push(...preventSpaces(text.substring(r8[1], text.length)));
      }
    });
    return res;
  };

  // node_modules/@vscode-elements/elements/dist/includes/vscode-select/OptionListController.js
  var OptionListController = class {
    constructor(host) {
      this._activeIndex = -1;
      this._options = [];
      this._filterPattern = "";
      this._filterMethod = "fuzzy";
      this._combobox = false;
      this._indexByValue = /* @__PURE__ */ new Map();
      this._indexByLabel = /* @__PURE__ */ new Map();
      this._selectedIndex = -1;
      this._selectedIndexes = /* @__PURE__ */ new Set();
      this._multiSelect = false;
      this._numOfVisibleOptions = 0;
      (this._host = host).addController(this);
    }
    hostConnected() {
    }
    //#region getters/setters
    get activeIndex() {
      return this._activeIndex;
    }
    set activeIndex(index) {
      this._activeIndex = index;
      this._host.requestUpdate();
    }
    get relativeActiveIndex() {
      var _a6, _b2;
      return (_b2 = (_a6 = this._options[this._activeIndex]) == null ? void 0 : _a6.filteredIndex) != null ? _b2 : -1;
    }
    set comboboxMode(enabled) {
      this._combobox = enabled;
      this._host.requestUpdate();
    }
    get comboboxMode() {
      return this._combobox;
    }
    get multiSelect() {
      return this._multiSelect;
    }
    set multiSelect(multiSelect) {
      this._selectedIndex = -1;
      this._selectedIndexes.clear();
      this._multiSelect = multiSelect;
      this._host.requestUpdate();
    }
    get selectedIndex() {
      return this._selectedIndex;
    }
    set selectedIndex(index) {
      var _a6, _b2;
      if (this._selectedIndex !== -1) {
        (_b2 = (_a6 = this._options[this._selectedIndex]).selected) != null ? _b2 : _a6.selected = false;
      }
      const op = this.getOptionByIndex(index);
      this._selectedIndex = op ? index : -1;
      this._host.requestUpdate();
    }
    get selectedIndexes() {
      return Array.from(this._selectedIndexes);
    }
    set selectedIndexes(value) {
      this._selectedIndexes.forEach((v3) => {
        this._options[v3].selected = false;
      });
      this._selectedIndexes = new Set(value);
      value.forEach((v3) => {
        if (this._options[v3] !== void 0) {
          this._options[v3].selected = true;
        }
      });
      this._host.requestUpdate();
    }
    set value(newValue) {
      var _a6;
      if (this._multiSelect) {
        const valueList = newValue.map((v3) => this._indexByValue.get(v3)).filter((v3) => v3 !== void 0);
        this._selectedIndexes = new Set(valueList);
      } else {
        this._selectedIndex = (_a6 = this._indexByValue.get(newValue)) != null ? _a6 : -1;
      }
      this._host.requestUpdate();
    }
    get value() {
      if (this._multiSelect) {
        return this._selectedIndexes.size > 0 ? Array.from(this._selectedIndexes).map((v3) => this._options[v3].value) : [];
      } else {
        return this._selectedIndex > -1 ? this._options[this._selectedIndex].value : "";
      }
    }
    set multiSelectValue(newValue) {
      const valueList = newValue.map((v3) => this._indexByValue.get(v3)).filter((v3) => v3 !== void 0);
      this._selectedIndexes = new Set(valueList);
    }
    get multiSelectValue() {
      return this._selectedIndexes.size > 0 ? Array.from(this._selectedIndexes).map((v3) => this._options[v3].value) : [];
    }
    get filterPattern() {
      return this._filterPattern;
    }
    set filterPattern(pattern) {
      if (pattern !== this._filterPattern) {
        this._filterPattern = pattern;
        this._updateState();
      }
    }
    get filterMethod() {
      return this._filterMethod;
    }
    set filterMethod(method) {
      if (method !== this._filterMethod) {
        this._filterMethod = method;
        this._updateState();
      }
    }
    get options() {
      return this._options;
    }
    get numOfVisibleOptions() {
      return this._numOfVisibleOptions;
    }
    get numOptions() {
      return this._options.length;
    }
    //#endregion
    //#region public functions
    populate(options) {
      this._indexByValue.clear();
      this._indexByLabel.clear();
      this._options = options.map((op, index) => {
        var _a6, _b2, _c, _d, _e, _f, _g;
        this._indexByValue.set((_a6 = op.value) != null ? _a6 : "", index);
        this._indexByLabel.set((_b2 = op.label) != null ? _b2 : "", index);
        return {
          description: (_c = op.description) != null ? _c : "",
          disabled: (_d = op.disabled) != null ? _d : false,
          label: (_e = op.label) != null ? _e : "",
          selected: (_f = op.selected) != null ? _f : false,
          value: (_g = op.value) != null ? _g : "",
          index,
          filteredIndex: index,
          ranges: [],
          visible: true
        };
      });
      this._numOfVisibleOptions = this._options.length;
    }
    add(option) {
      const nextIndex = this._options.length;
      const { description, disabled, label, selected, value } = option;
      let visible = true;
      let ranges = [];
      if (this._combobox && this._filterPattern !== "") {
        const res = this._searchByPattern(label != null ? label : "");
        visible = res.match;
        ranges = res.ranges;
      }
      this._indexByValue.set(value != null ? value : "", nextIndex);
      this._indexByLabel.set(label != null ? label : "", nextIndex);
      if (selected) {
        this._selectedIndex = nextIndex;
        this._selectedIndexes.add(nextIndex);
        this._activeIndex = nextIndex;
      }
      this._options.push({
        index: nextIndex,
        filteredIndex: nextIndex,
        description: description != null ? description : "",
        disabled: disabled != null ? disabled : false,
        label: label != null ? label : "",
        selected: selected != null ? selected : false,
        value: value != null ? value : "",
        visible,
        ranges
      });
      if (visible) {
        this._numOfVisibleOptions += 1;
      }
    }
    clear() {
      this._options = [];
      this._indexByValue.clear();
      this._indexByLabel.clear();
      this._numOfVisibleOptions = 0;
    }
    getIsIndexSelected(index) {
      if (this._multiSelect) {
        return this._selectedIndexes.has(index);
      } else {
        return this._selectedIndex === index;
      }
    }
    expandMultiSelection(values) {
      values.forEach((v3) => {
        var _a6;
        const foundIndex = (_a6 = this._indexByValue.get(v3)) != null ? _a6 : -1;
        if (foundIndex !== -1) {
          this._selectedIndexes.add(foundIndex);
        }
      });
      this._host.requestUpdate();
    }
    toggleActiveMultiselectOption() {
      var _a6;
      const activeOption = (_a6 = this._options[this._activeIndex]) != null ? _a6 : null;
      if (!activeOption) {
        return;
      }
      const checked = this._selectedIndexes.has(activeOption.index);
      if (checked) {
        this._selectedIndexes.delete(activeOption.index);
      } else {
        this._selectedIndexes.add(activeOption.index);
      }
      this._host.requestUpdate();
    }
    toggleOptionSelected(optIndex) {
      const checked = this._selectedIndexes.has(optIndex);
      this._options[optIndex].selected = !this._options[optIndex].selected;
      if (checked) {
        this._selectedIndexes.delete(optIndex);
      } else {
        this._selectedIndexes.add(optIndex);
      }
      this._host.requestUpdate();
    }
    getActiveOption() {
      var _a6;
      return (_a6 = this._options[this._activeIndex]) != null ? _a6 : null;
    }
    getSelectedOption() {
      var _a6;
      return (_a6 = this._options[this._selectedIndex]) != null ? _a6 : null;
    }
    getOptionByIndex(index) {
      var _a6;
      return (_a6 = this._options[index]) != null ? _a6 : null;
    }
    findOptionIndex(value) {
      var _a6;
      return (_a6 = this._indexByValue.get(value)) != null ? _a6 : -1;
    }
    getOptionByValue(value, includeHiddenOptions = false) {
      var _a6;
      const index = (_a6 = this._indexByValue.get(value)) != null ? _a6 : -1;
      if (index === -1) {
        return null;
      }
      if (!includeHiddenOptions) {
        return this._options[index].visible ? this._options[index] : null;
      }
      return this._options[index];
    }
    getOptionByLabel(label) {
      var _a6;
      const index = (_a6 = this._indexByLabel.get(label)) != null ? _a6 : -1;
      if (index === -1) {
        return null;
      }
      return this._options[index];
    }
    next(fromIndex) {
      const from = fromIndex != null ? fromIndex : this._activeIndex;
      let nextIndex = -1;
      for (let i7 = from + 1; i7 < this._options.length; i7++) {
        if (this._options[i7] && !this._options[i7].disabled && this._options[i7].visible) {
          nextIndex = i7;
          break;
        }
      }
      return nextIndex > -1 ? this._options[nextIndex] : null;
    }
    prev(fromIndex) {
      const from = fromIndex != null ? fromIndex : this._activeIndex;
      let prevIndex = -1;
      for (let i7 = from - 1; i7 >= 0; i7--) {
        if (this._options[i7] && !this._options[i7].disabled && this._options[i7].visible) {
          prevIndex = i7;
          break;
        }
      }
      return prevIndex > -1 ? this._options[prevIndex] : null;
    }
    activateDefault() {
      if (this._multiSelect) {
        if (this._selectedIndexes.size > 0) {
          const indexes = this._selectedIndexes.values();
          const first = indexes.next();
          this._activeIndex = first.value ? first.value : 0;
        }
      } else {
        if (this._selectedIndex > -1) {
          this._activeIndex = this._selectedIndex;
        } else {
          this._activeIndex = 0;
        }
      }
      this._host.requestUpdate();
    }
    selectAll() {
      if (!this._multiSelect) {
        return;
      }
      this._options.forEach((_2, i7) => {
        this._options[i7].selected = true;
        this._selectedIndexes.add(i7);
      });
      this._host.requestUpdate();
    }
    selectNone() {
      if (!this._multiSelect) {
        return;
      }
      this._options.forEach((_2, i7) => {
        this._options[i7].selected = false;
      });
      this._selectedIndexes.clear();
      this._host.requestUpdate();
    }
    //#endregion
    //#region private functions
    _searchByPattern(text) {
      let result;
      switch (this._filterMethod) {
        case "startsWithPerTerm":
          result = startsWithPerTermSearch(text, this._filterPattern);
          break;
        case "startsWith":
          result = startsWithSearch(text, this._filterPattern);
          break;
        case "contains":
          result = containsSearch(text, this._filterPattern);
          break;
        default:
          result = fuzzySearch(text, this._filterPattern);
      }
      return result;
    }
    _updateState() {
      if (!this._combobox || this._filterPattern === "") {
        this._options.forEach((_2, i7) => {
          this._options[i7].visible = true;
          this._options[i7].ranges = [];
        });
        this._numOfVisibleOptions = this._options.length;
      } else {
        let filteredListNextIndex = -1;
        this._numOfVisibleOptions = 0;
        this._options.forEach(({ label }, i7) => {
          const result = this._searchByPattern(label);
          this._options[i7].visible = result.match;
          this._options[i7].ranges = result.ranges;
          this._options[i7].filteredIndex = result.match ? ++filteredListNextIndex : -1;
          if (result.match) {
            this._numOfVisibleOptions += 1;
          }
        });
      }
      this._host.requestUpdate();
    }
  };

  // node_modules/@vscode-elements/elements/dist/vscode-scrollable/vscode-scrollable.styles.js
  var styles14 = [
    default_styles_default,
    i`
    :host {
      display: block;
      position: relative;
    }

    .scrollable-container {
      height: 100%;
      overflow: auto;
    }

    .scrollable-container::-webkit-scrollbar {
      cursor: default;
      width: 0;
    }

    .scrollable-container {
      scrollbar-width: none;
    }

    .shadow {
      box-shadow: var(--vscode-scrollbar-shadow, #000000) 0 6px 6px -6px inset;
      display: none;
      height: 3px;
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      z-index: 1;
      width: 100%;
    }

    .shadow.visible {
      display: block;
    }

    .scrollbar-track {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      width: 10px;
      z-index: 100;
    }

    .scrollbar-track.hidden {
      display: none;
    }

    .scrollbar-thumb {
      background-color: transparent;
      min-height: var(--min-thumb-height, 20px);
      opacity: 0;
      position: absolute;
      right: 0;
      width: 10px;
    }

    .scrollbar-thumb.visible {
      background-color: var(
        --vscode-scrollbarSlider-background,
        rgba(121, 121, 121, 0.4)
      );
      opacity: 1;
      transition: opacity 100ms;
    }

    .scrollbar-thumb.fade {
      background-color: var(
        --vscode-scrollbarSlider-background,
        rgba(121, 121, 121, 0.4)
      );
      opacity: 0;
      transition: opacity 800ms;
    }

    .scrollbar-thumb.visible:hover {
      background-color: var(
        --vscode-scrollbarSlider-hoverBackground,
        rgba(100, 100, 100, 0.7)
      );
    }

    .scrollbar-thumb.visible.active,
    .scrollbar-thumb.visible.active:hover {
      background-color: var(
        --vscode-scrollbarSlider-activeBackground,
        rgba(191, 191, 191, 0.4)
      );
    }

    .prevent-interaction {
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      position: absolute;
      z-index: 99;
    }

    .content {
      overflow: hidden;
    }
  `
  ];
  var vscode_scrollable_styles_default = styles14;

  // node_modules/@vscode-elements/elements/dist/vscode-scrollable/vscode-scrollable.js
  var __decorate17 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeScrollable = class VscodeScrollable2 extends VscElement {
    /**
     * Scroll position.
     */
    set scrollPos(val) {
      this._scrollPos = this._limitScrollPos(val);
      this._updateScrollbar();
      this._updateThumbPosition();
      this.requestUpdate();
    }
    get scrollPos() {
      return this._scrollPos;
    }
    /**
     * The maximum amount of the `scrollPos`.
     */
    get scrollMax() {
      if (!this._scrollableContainer) {
        return 0;
      }
      return this._scrollableContainer.scrollHeight - this._scrollableContainer.clientHeight;
    }
    //#region lifecycle methods
    constructor() {
      super();
      this.alwaysVisible = false;
      this.fastScrollSensitivity = 5;
      this.minThumbSize = 20;
      this.mouseWheelScrollSensitivity = 1;
      this.shadow = true;
      this.scrolled = false;
      this._scrollPos = 0;
      this._isDragging = false;
      this._thumbHeight = 0;
      this._thumbY = 0;
      this._thumbVisible = false;
      this._thumbFade = false;
      this._thumbActive = false;
      this._scrollThumbStartY = 0;
      this._mouseStartY = 0;
      this._scrollbarVisible = true;
      this._scrollbarTrackZ = 0;
      this._resizeObserverCallback = () => {
        this._updateScrollbar();
        this._updateThumbPosition();
      };
      this._handleSlotChange = () => {
        this._updateScrollbar();
        this._updateThumbPosition();
        this._zIndexFix();
      };
      this._handleScrollThumbMouseMove = (event) => {
        const rawThumbPos = this._scrollThumbStartY + (event.screenY - this._mouseStartY);
        this._thumbY = this._limitThumbPos(rawThumbPos);
        this.scrollPos = this._calculateScrollPosFromThumbPos(this._thumbY);
        this.dispatchEvent(new CustomEvent("vsc-scrollable-scroll", {
          detail: this.scrollPos
        }));
      };
      this._handleScrollThumbMouseUp = (event) => {
        this._isDragging = false;
        this._thumbActive = false;
        const cr = this.getBoundingClientRect();
        const { x: x2, y: y3, width, height } = cr;
        const { pageX, pageY } = event;
        if (pageX > x2 + width || pageX < x2 || pageY > y3 + height || pageY < y3) {
          this._thumbFade = true;
          this._thumbVisible = false;
        }
        document.removeEventListener("mousemove", this._handleScrollThumbMouseMove);
        document.removeEventListener("mouseup", this._handleScrollThumbMouseUp);
      };
      this._handleComponentMouseOver = () => {
        this._thumbVisible = true;
        this._thumbFade = false;
      };
      this._handleComponentMouseOut = () => {
        if (!this._thumbActive) {
          this._thumbVisible = false;
          this._thumbFade = true;
        }
      };
      this._handleComponentWheel = (ev) => {
        ev.preventDefault();
        const multiplier = ev.altKey ? this.mouseWheelScrollSensitivity * this.fastScrollSensitivity : this.mouseWheelScrollSensitivity;
        this.scrollPos = this._limitScrollPos(this.scrollPos + ev.deltaY * multiplier);
        this.dispatchEvent(new CustomEvent("vsc-scrollable-scroll", {
          detail: this.scrollPos
        }));
      };
      this._handleScrollableContainerScroll = (ev) => {
        if (ev.currentTarget) {
          this.scrollPos = ev.currentTarget.scrollTop;
        }
      };
      this.addEventListener("mouseover", this._handleComponentMouseOver);
      this.addEventListener("mouseout", this._handleComponentMouseOut);
      this.addEventListener("wheel", this._handleComponentWheel);
    }
    connectedCallback() {
      super.connectedCallback();
      this._hostResizeObserver = new ResizeObserver(this._resizeObserverCallback);
      this._contentResizeObserver = new ResizeObserver(this._resizeObserverCallback);
      this.requestUpdate();
      this.updateComplete.then(() => {
        this._hostResizeObserver.observe(this);
        this._contentResizeObserver.observe(this._contentElement);
        this._updateThumbPosition();
      });
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this._hostResizeObserver.unobserve(this);
      this._hostResizeObserver.disconnect();
      this._contentResizeObserver.unobserve(this._contentElement);
      this._contentResizeObserver.disconnect();
    }
    firstUpdated(_changedProperties) {
      this._updateThumbPosition();
    }
    _calcThumbHeight() {
      var _a6, _b2;
      const componentHeight = this.offsetHeight;
      const contentHeight = (_b2 = (_a6 = this._contentElement) == null ? void 0 : _a6.offsetHeight) != null ? _b2 : 0;
      const proposedSize = componentHeight * (componentHeight / contentHeight);
      return Math.max(this.minThumbSize, proposedSize);
    }
    _updateScrollbar() {
      var _a6, _b2;
      const contentHeight = (_b2 = (_a6 = this._contentElement) == null ? void 0 : _a6.offsetHeight) != null ? _b2 : 0;
      const componentHeight = this.offsetHeight;
      if (componentHeight >= contentHeight) {
        this._scrollbarVisible = false;
      } else {
        this._scrollbarVisible = true;
        this._thumbHeight = this._calcThumbHeight();
      }
      this.requestUpdate();
    }
    _zIndexFix() {
      let highestZ = 0;
      this._assignedElements.forEach((n9) => {
        if ("style" in n9) {
          const computedZIndex = window.getComputedStyle(n9).zIndex;
          const isNumber = /([0-9-])+/g.test(computedZIndex);
          if (isNumber) {
            highestZ = Number(computedZIndex) > highestZ ? Number(computedZIndex) : highestZ;
          }
        }
      });
      this._scrollbarTrackZ = highestZ + 1;
      this.requestUpdate();
    }
    _updateThumbPosition() {
      if (!this._scrollableContainer) {
        return;
      }
      this.scrolled = this.scrollPos > 0;
      const componentH = this.offsetHeight;
      const thumbH = this._thumbHeight;
      const contentH = this._contentElement.offsetHeight;
      const overflown = contentH - componentH;
      const ratio = this.scrollPos / overflown;
      const thumbYMax = componentH - thumbH;
      this._thumbY = Math.min(ratio * (componentH - thumbH), thumbYMax);
    }
    _calculateScrollPosFromThumbPos(scrollPos) {
      const cmpH = this.getBoundingClientRect().height;
      const thumbH = this._scrollThumbElement.getBoundingClientRect().height;
      const contentH = this._contentElement.getBoundingClientRect().height;
      const rawScrollPos = scrollPos / (cmpH - thumbH) * (contentH - cmpH);
      return this._limitScrollPos(rawScrollPos);
    }
    _limitScrollPos(newPos) {
      if (newPos < 0) {
        return 0;
      } else if (newPos > this.scrollMax) {
        return this.scrollMax;
      } else {
        return newPos;
      }
    }
    _limitThumbPos(newPos) {
      const cmpH = this.getBoundingClientRect().height;
      const thumbH = this._scrollThumbElement.getBoundingClientRect().height;
      if (newPos < 0) {
        return 0;
      } else if (newPos > cmpH - thumbH) {
        return cmpH - thumbH;
      } else {
        return newPos;
      }
    }
    _handleScrollThumbMouseDown(event) {
      const cmpCr = this.getBoundingClientRect();
      const thCr = this._scrollThumbElement.getBoundingClientRect();
      this._mouseStartY = event.screenY;
      this._scrollThumbStartY = thCr.top - cmpCr.top;
      this._isDragging = true;
      this._thumbActive = true;
      document.addEventListener("mousemove", this._handleScrollThumbMouseMove);
      document.addEventListener("mouseup", this._handleScrollThumbMouseUp);
    }
    _handleScrollbarTrackPress(ev) {
      if (ev.target !== ev.currentTarget) {
        return;
      }
      this._thumbY = ev.offsetY - this._thumbHeight / 2;
      this.scrollPos = this._calculateScrollPosFromThumbPos(this._thumbY);
    }
    //#endregion
    render() {
      return x`
      <div
        class="scrollable-container"
        .style=${stylePropertyMap({
        userSelect: this._isDragging ? "none" : "auto"
      })}
        .scrollTop=${this.scrollPos}
        @scroll=${this._handleScrollableContainerScroll}
      >
        <div
          class=${e9({ shadow: true, visible: this.scrolled })}
          .style=${stylePropertyMap({
        zIndex: String(this._scrollbarTrackZ)
      })}
        ></div>
        ${this._isDragging ? x`<div class="prevent-interaction"></div>` : E}
        <div
          class=${e9({
        "scrollbar-track": true,
        hidden: !this._scrollbarVisible
      })}
          @mousedown=${this._handleScrollbarTrackPress}
        >
          <div
            class=${e9({
        "scrollbar-thumb": true,
        visible: this.alwaysVisible ? true : this._thumbVisible,
        fade: this.alwaysVisible ? false : this._thumbFade,
        active: this._thumbActive
      })}
            .style=${stylePropertyMap({
        height: `${this._thumbHeight}px`,
        top: `${this._thumbY}px`
      })}
            @mousedown=${this._handleScrollThumbMouseDown}
          ></div>
        </div>
        <div class="content">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
    }
  };
  VscodeScrollable.styles = vscode_scrollable_styles_default;
  __decorate17([
    n5({ type: Boolean, reflect: true, attribute: "always-visible" })
  ], VscodeScrollable.prototype, "alwaysVisible", void 0);
  __decorate17([
    n5({ type: Number, attribute: "fast-scroll-sensitivity" })
  ], VscodeScrollable.prototype, "fastScrollSensitivity", void 0);
  __decorate17([
    n5({ type: Number, attribute: "min-thumb-size" })
  ], VscodeScrollable.prototype, "minThumbSize", void 0);
  __decorate17([
    n5({ type: Number, attribute: "mouse-wheel-scroll-sensitivity" })
  ], VscodeScrollable.prototype, "mouseWheelScrollSensitivity", void 0);
  __decorate17([
    n5({ type: Boolean, reflect: true })
  ], VscodeScrollable.prototype, "shadow", void 0);
  __decorate17([
    n5({ type: Boolean, reflect: true })
  ], VscodeScrollable.prototype, "scrolled", void 0);
  __decorate17([
    n5({ type: Number, attribute: "scroll-pos" })
  ], VscodeScrollable.prototype, "scrollPos", null);
  __decorate17([
    r5()
  ], VscodeScrollable.prototype, "_isDragging", void 0);
  __decorate17([
    r5()
  ], VscodeScrollable.prototype, "_thumbHeight", void 0);
  __decorate17([
    r5()
  ], VscodeScrollable.prototype, "_thumbY", void 0);
  __decorate17([
    r5()
  ], VscodeScrollable.prototype, "_thumbVisible", void 0);
  __decorate17([
    r5()
  ], VscodeScrollable.prototype, "_thumbFade", void 0);
  __decorate17([
    r5()
  ], VscodeScrollable.prototype, "_thumbActive", void 0);
  __decorate17([
    e6(".content")
  ], VscodeScrollable.prototype, "_contentElement", void 0);
  __decorate17([
    e6(".scrollbar-thumb", true)
  ], VscodeScrollable.prototype, "_scrollThumbElement", void 0);
  __decorate17([
    e6(".scrollable-container")
  ], VscodeScrollable.prototype, "_scrollableContainer", void 0);
  __decorate17([
    o7()
  ], VscodeScrollable.prototype, "_assignedElements", void 0);
  VscodeScrollable = __decorate17([
    customElement("vscode-scrollable")
  ], VscodeScrollable);

  // node_modules/@vscode-elements/elements/dist/includes/vscode-select/vscode-select-base.js
  var __decorate18 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VISIBLE_OPTS = 10;
  var OPT_HEIGHT = 22;
  var VscodeSelectBase = class extends VscElement {
    /**
     * Options can be filtered by typing into a text input field.
     */
    set combobox(enabled) {
      this._opts.comboboxMode = enabled;
    }
    get combobox() {
      return this._opts.comboboxMode;
    }
    /**
     * The element cannot be used and is not focusable.
     */
    set disabled(newState) {
      var _a6;
      this._disabled = newState;
      this.ariaDisabled = newState ? "true" : "false";
      if (newState === true) {
        this._originalTabIndex = this.tabIndex;
        this.tabIndex = -1;
      } else {
        this.tabIndex = (_a6 = this._originalTabIndex) != null ? _a6 : 0;
        this._originalTabIndex = void 0;
      }
      this.requestUpdate();
    }
    get disabled() {
      return this._disabled;
    }
    /**
     * Search method in the filtered list within the combobox mode.
     *
     * - contains - The list item includes the searched pattern at any position.
     * - fuzzy - The list item contains the letters of the search pattern in the same order, but at any position.
     * - startsWith - The search pattern matches the beginning of the searched text.
     * - startsWithPerTerm - The search pattern matches the beginning of any word in the searched text.
     *
     * @default 'fuzzy'
     */
    set filter(val) {
      const validValues = [
        "contains",
        "fuzzy",
        "startsWith",
        "startsWithPerTerm"
      ];
      let fm;
      if (validValues.includes(val)) {
        fm = val;
      } else {
        console.warn(`[VSCode Webview Elements] Invalid filter: "${val}", fallback to default. Valid values are: "contains", "fuzzy", "startsWith", "startsWithPerm".`, this);
        fm = "fuzzy";
      }
      this._opts.filterMethod = fm;
    }
    get filter() {
      return this._opts.filterMethod;
    }
    /**
     * @attr [options=[]]
     * @type {Option[]}
     */
    set options(opts) {
      this._opts.populate(opts);
    }
    get options() {
      return this._opts.options.map(({ label, value, description, selected, disabled }) => ({
        label,
        value,
        description,
        selected,
        disabled
      }));
    }
    //#region lifecycle callbacks
    constructor() {
      super();
      this.creatable = false;
      this.label = "";
      this.invalid = false;
      this.focused = false;
      this.open = false;
      this.position = "below";
      this._opts = new OptionListController(this);
      this._firstUpdateCompleted = false;
      this._currentDescription = "";
      this._filter = "fuzzy";
      this._selectedIndexes = [];
      this._options = [];
      this._value = "";
      this._values = [];
      this._isPlaceholderOptionActive = false;
      this._isBeingFiltered = false;
      this._optionListScrollPos = 0;
      this._isHoverForbidden = false;
      this._disabled = false;
      this._originalTabIndex = void 0;
      this._onMouseMove = () => {
        this._isHoverForbidden = false;
        window.removeEventListener("mousemove", this._onMouseMove);
      };
      this._onOptionListScroll = (ev) => {
        this._optionListScrollPos = ev.detail;
      };
      this._onComponentKeyDown = (event) => {
        if ([" ", "ArrowUp", "ArrowDown", "Escape"].includes(event.key)) {
          event.stopPropagation();
          event.preventDefault();
        }
        if (event.key === "Enter") {
          this._onEnterKeyDown(event);
        }
        if (event.key === " ") {
          this._onSpaceKeyDown();
        }
        if (event.key === "Escape") {
          this._onEscapeKeyDown();
        }
        if (event.key === "ArrowUp") {
          this._onArrowUpKeyDown();
        }
        if (event.key === "ArrowDown") {
          this._onArrowDownKeyDown();
        }
      };
      this._onComponentFocus = () => {
        this.focused = true;
      };
      this._onComponentBlur = () => {
        this.focused = false;
      };
      this._handleWindowScroll = () => {
        this.open = false;
      };
      this.addEventListener("vsc-option-state-change", (ev) => {
        ev.stopPropagation();
        this._setStateFromSlottedElements();
        this.requestUpdate();
      });
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this._onComponentKeyDown);
      this.addEventListener("focus", this._onComponentFocus);
      this.addEventListener("blur", this._onComponentBlur);
      this._setAutoFocus();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this._onComponentKeyDown);
      this.removeEventListener("focus", this._onComponentFocus);
      this.removeEventListener("blur", this._onComponentBlur);
    }
    firstUpdated(_changedProperties) {
      this._firstUpdateCompleted = true;
    }
    willUpdate(changedProperties) {
      if (changedProperties.has("required") && this._firstUpdateCompleted) {
        this._manageRequired();
      }
      if (changedProperties.has("open") && this._firstUpdateCompleted) {
        if (this.open) {
          this._dropdownEl.showPopover();
          window.addEventListener("scroll", this._handleWindowScroll, {
            capture: true
          });
          this._opts.activateDefault();
          this._scrollActiveElementToTop();
        } else {
          this._dropdownEl.hidePopover();
          window.removeEventListener("scroll", this._handleWindowScroll);
        }
      }
    }
    get _filteredOptions() {
      if (!this.combobox || this._opts.filterPattern === "") {
        return this._options;
      }
      return filterOptionsByPattern(this._options, this._opts.filterPattern, this._filter);
    }
    _setAutoFocus() {
      if (this.hasAttribute("autofocus")) {
        if (this.tabIndex < 0) {
          this.tabIndex = 0;
        }
        if (this.combobox) {
          this.updateComplete.then(() => {
            var _a6;
            (_a6 = this.shadowRoot) == null ? void 0 : _a6.querySelector(".combobox-input").focus();
          });
        } else {
          this.updateComplete.then(() => {
            var _a6;
            (_a6 = this.shadowRoot) == null ? void 0 : _a6.querySelector(".select-face").focus();
          });
        }
      }
    }
    get _isSuggestedOptionVisible() {
      if (!(this.combobox && this.creatable)) {
        return false;
      }
      const filterPatternExistsAsOption = this._opts.getOptionByValue(this._opts.filterPattern) !== null;
      const filtered = this._opts.filterPattern.length > 0;
      return !filterPatternExistsAsOption && filtered;
    }
    _manageRequired() {
    }
    _setStateFromSlottedElements() {
      var _a6;
      const optionElements = (_a6 = this._assignedOptions) != null ? _a6 : [];
      this._opts.clear();
      optionElements.forEach((el) => {
        var _a7;
        const { innerText, description, disabled } = el;
        const value = typeof el.value === "string" ? el.value : innerText.trim();
        const selected = (_a7 = el.selected) != null ? _a7 : false;
        const op = {
          label: innerText.trim(),
          value,
          description,
          selected,
          disabled
        };
        this._opts.add(op);
      });
    }
    _createSuggestedOption() {
      const nextSelectedIndex = this._opts.numOptions;
      const op = document.createElement("vscode-option");
      op.value = this._opts.filterPattern;
      B(this._opts.filterPattern, op);
      this.appendChild(op);
      return nextSelectedIndex;
    }
    _dispatchChangeEvent() {
      this.dispatchEvent(new Event("change"));
      this.dispatchEvent(new Event("input"));
    }
    async _createAndSelectSuggestedOption() {
    }
    _toggleComboboxDropdown() {
      this._opts.filterPattern = "";
      this.open = !this.open;
    }
    _scrollActiveElementToTop() {
      this._optionListScrollPos = Math.floor(this._opts.relativeActiveIndex * OPT_HEIGHT);
    }
    async _adjustOptionListScrollPos(direction, optionIndex) {
      let numOpts = this._opts.numOfVisibleOptions;
      const suggestedOptionVisible = this._isSuggestedOptionVisible;
      if (suggestedOptionVisible) {
        numOpts += 1;
      }
      if (numOpts <= VISIBLE_OPTS) {
        return;
      }
      this._isHoverForbidden = true;
      window.addEventListener("mousemove", this._onMouseMove);
      const ulScrollTop = this._optionListScrollPos;
      const liPosY = optionIndex * OPT_HEIGHT;
      const fullyVisible = liPosY >= ulScrollTop && liPosY <= ulScrollTop + VISIBLE_OPTS * OPT_HEIGHT - OPT_HEIGHT;
      if (direction === "down") {
        if (!fullyVisible) {
          this._optionListScrollPos = optionIndex * OPT_HEIGHT - (VISIBLE_OPTS - 1) * OPT_HEIGHT;
        }
      }
      if (direction === "up") {
        if (!fullyVisible) {
          this._optionListScrollPos = Math.floor(this._opts.relativeActiveIndex * OPT_HEIGHT);
        }
      }
    }
    //#region event handlers
    _onFaceClick() {
      this.open = !this.open;
    }
    _handleDropdownToggle(event) {
      this.open = event.newState === "open";
    }
    _onComboboxButtonClick() {
      this._toggleComboboxDropdown();
    }
    _onComboboxButtonKeyDown(ev) {
      if (ev.key === "Enter") {
        this._toggleComboboxDropdown();
      }
    }
    _onOptionMouseOver(ev) {
      if (this._isHoverForbidden) {
        return;
      }
      const el = ev.target;
      if (!el.matches(".option")) {
        return;
      }
      if (el.matches(".placeholder")) {
        this._isPlaceholderOptionActive = true;
        this._opts.activeIndex = -1;
      } else {
        this._isPlaceholderOptionActive = false;
        this._opts.activeIndex = +el.dataset.index;
      }
    }
    _onPlaceholderOptionMouseOut() {
      this._isPlaceholderOptionActive = false;
    }
    _onNoOptionsClick(ev) {
      ev.stopPropagation();
    }
    _onEnterKeyDown(ev) {
      this._isBeingFiltered = false;
      const clickedOnAcceptButton = (ev == null ? void 0 : ev.composedPath) ? ev.composedPath().find((el) => el.matches ? el.matches("vscode-button.button-accept") : false) : false;
      if (clickedOnAcceptButton) {
        return;
      }
    }
    _onSpaceKeyDown() {
      if (!this.open) {
        this.open = true;
        return;
      }
    }
    _onArrowUpKeyDown() {
      var _a6, _b2;
      if (this.open) {
        if (this._opts.activeIndex <= 0 && !(this.combobox && this.creatable)) {
          return;
        }
        if (this._isPlaceholderOptionActive) {
          const optionIndex = this._opts.numOfVisibleOptions - 1;
          this._opts.activeIndex = optionIndex;
          this._isPlaceholderOptionActive = false;
        } else {
          const prevOp = this._opts.prev();
          if (prevOp !== null) {
            this._opts.activeIndex = (_a6 = prevOp == null ? void 0 : prevOp.index) != null ? _a6 : -1;
            const prevSelectableIndex = (_b2 = prevOp == null ? void 0 : prevOp.filteredIndex) != null ? _b2 : -1;
            if (prevSelectableIndex > -1) {
              this._adjustOptionListScrollPos("up", prevSelectableIndex);
            }
          }
        }
      } else {
        this.open = true;
        this._opts.activateDefault();
      }
    }
    _onArrowDownKeyDown() {
      var _a6, _b2;
      let numOpts = this._opts.numOfVisibleOptions;
      const suggestedOptionVisible = this._isSuggestedOptionVisible;
      if (suggestedOptionVisible) {
        numOpts += 1;
      }
      if (this.open) {
        if (this._isPlaceholderOptionActive && this._opts.activeIndex === -1) {
          return;
        }
        const nextOp = this._opts.next();
        if (suggestedOptionVisible && nextOp === null) {
          this._isPlaceholderOptionActive = true;
          this._adjustOptionListScrollPos("down", numOpts - 1);
          this._opts.activeIndex = -1;
        } else if (nextOp !== null) {
          const nextSelectableIndex = (_a6 = nextOp == null ? void 0 : nextOp.filteredIndex) != null ? _a6 : -1;
          this._opts.activeIndex = (_b2 = nextOp == null ? void 0 : nextOp.index) != null ? _b2 : -1;
          if (nextSelectableIndex > -1) {
            this._adjustOptionListScrollPos("down", nextSelectableIndex);
          }
        }
      } else {
        this.open = true;
        this._opts.activateDefault();
      }
    }
    _onEscapeKeyDown() {
      this.open = false;
    }
    _onSlotChange() {
      this._setStateFromSlottedElements();
      this.requestUpdate();
    }
    _onComboboxInputFocus(ev) {
      ev.target.select();
      this._isBeingFiltered = false;
      this._opts.filterPattern = "";
    }
    _onComboboxInputBlur() {
      this._isBeingFiltered = false;
    }
    _onComboboxInputInput(ev) {
      this._isBeingFiltered = true;
      this._opts.filterPattern = ev.target.value;
      this._opts.activeIndex = -1;
      this.open = true;
    }
    _onComboboxInputClick() {
      this._isBeingFiltered = this._opts.filterPattern !== "";
      this.open = true;
    }
    _onComboboxInputSpaceKeyDown(ev) {
      if (ev.key === " ") {
        ev.stopPropagation();
      }
    }
    _onOptionClick(_ev) {
      this._isBeingFiltered = false;
      return;
    }
    //#endregion
    //#region render functions
    _renderCheckbox(checked, label) {
      const checkboxClasses = {
        "checkbox-icon": true,
        checked
      };
      return x`<span class=${e9(checkboxClasses)}>${checkIcon}</span
      ><span class="option-label">${label}</span>`;
    }
    _renderOptions() {
      var _a6;
      const list = this._opts.options;
      return x`
      <ul
        aria-label=${o8((_a6 = this.label) != null ? _a6 : void 0)}
        aria-multiselectable=${o8(this._opts.multiSelect ? "true" : void 0)}
        class="options"
        id="select-listbox"
        role="listbox"
        tabindex="-1"
        @click=${this._onOptionClick}
        @mouseover=${this._onOptionMouseOver}
      >
        ${c4(list, (op) => op.index, (op, index) => {
        var _a7, _b2, _c;
        if (!op.visible) {
          return E;
        }
        const active = op.index === this._opts.activeIndex && !op.disabled;
        const selected = this._opts.getIsIndexSelected(op.index);
        const optionClasses = {
          active,
          disabled: op.disabled,
          option: true,
          "single-select": !this._opts.multiSelect,
          "multi-select": this._opts.multiSelect,
          selected
        };
        const labelText = ((_b2 = (_a7 = op.ranges) == null ? void 0 : _a7.length) != null ? _b2 : 0 > 0) ? highlightRanges(op.label, (_c = op.ranges) != null ? _c : []) : op.label;
        return x`
              <li
                aria-selected=${selected ? "true" : "false"}
                class=${e9(optionClasses)}
                data-index=${op.index}
                data-filtered-index=${index}
                id=${`op-${op.index}`}
                role="option"
                tabindex="-1"
              >
                ${n7(this._opts.multiSelect, () => this._renderCheckbox(selected, labelText), () => labelText)}
              </li>
            `;
      })}
        ${this._renderPlaceholderOption(this._opts.numOfVisibleOptions < 1)}
      </ul>
    `;
    }
    _renderPlaceholderOption(isListEmpty) {
      if (!this.combobox) {
        return E;
      }
      const foundOption = this._opts.getOptionByLabel(this._opts.filterPattern);
      if (foundOption) {
        return E;
      }
      if (this.creatable && this._opts.filterPattern.length > 0) {
        return x`<li
        class=${e9({
          option: true,
          placeholder: true,
          active: this._isPlaceholderOptionActive
        })}
        @mouseout=${this._onPlaceholderOptionMouseOut}
      >
        Add "${this._opts.filterPattern}"
      </li>`;
      } else {
        return isListEmpty ? x`<li class="no-options" @click=${this._onNoOptionsClick}>
            No options
          </li>` : E;
      }
    }
    _renderDescription() {
      const op = this._opts.getActiveOption();
      if (!op) {
        return E;
      }
      const { description } = op;
      return description ? x`<div class="description">${description}</div>` : E;
    }
    _renderSelectFace() {
      return x`${E}`;
    }
    _renderComboboxFace() {
      return x`${E}`;
    }
    _renderDropdownControls() {
      return x`${E}`;
    }
    _renderDropdown() {
      const classes = {
        dropdown: true,
        multiple: this._opts.multiSelect,
        open: this.open
      };
      const visibleOptions = this._isSuggestedOptionVisible || this._opts.numOfVisibleOptions === 0 ? this._opts.numOfVisibleOptions + 1 : this._opts.numOfVisibleOptions;
      const scrollPaneHeight = Math.min(visibleOptions * OPT_HEIGHT, VISIBLE_OPTS * OPT_HEIGHT);
      const cr = this.getBoundingClientRect();
      const dropdownStyles = {
        width: `${cr.width}px`,
        left: `${cr.left}px`,
        top: this.position === "below" ? `${cr.top + cr.height}px` : "unset",
        bottom: this.position === "below" ? "unset" : `${document.documentElement.clientHeight - cr.top}px`
      };
      return x`
      <div
        class=${e9(classes)}
        popover="auto"
        @toggle=${this._handleDropdownToggle}
        .style=${stylePropertyMap(dropdownStyles)}
      >
        ${this.position === "above" ? this._renderDescription() : E}
        <vscode-scrollable
          always-visible
          class="scrollable"
          min-thumb-size="40"
          tabindex="-1"
          @vsc-scrollable-scroll=${this._onOptionListScroll}
          .scrollPos=${this._optionListScrollPos}
          .style=${stylePropertyMap({
        height: `${scrollPaneHeight}px`
      })}
        >
          ${this._renderOptions()} ${this._renderDropdownControls()}
        </vscode-scrollable>
        ${this.position === "below" ? this._renderDescription() : E}
      </div>
    `;
    }
  };
  __decorate18([
    n5({ type: Boolean, reflect: true })
  ], VscodeSelectBase.prototype, "creatable", void 0);
  __decorate18([
    n5({ type: Boolean, reflect: true })
  ], VscodeSelectBase.prototype, "combobox", null);
  __decorate18([
    n5({ reflect: true })
  ], VscodeSelectBase.prototype, "label", void 0);
  __decorate18([
    n5({ type: Boolean, reflect: true })
  ], VscodeSelectBase.prototype, "disabled", null);
  __decorate18([
    n5({ type: Boolean, reflect: true })
  ], VscodeSelectBase.prototype, "invalid", void 0);
  __decorate18([
    n5()
  ], VscodeSelectBase.prototype, "filter", null);
  __decorate18([
    n5({ type: Boolean, reflect: true })
  ], VscodeSelectBase.prototype, "focused", void 0);
  __decorate18([
    n5({ type: Boolean, reflect: true })
  ], VscodeSelectBase.prototype, "open", void 0);
  __decorate18([
    n5({ type: Array })
  ], VscodeSelectBase.prototype, "options", null);
  __decorate18([
    n5({ reflect: true })
  ], VscodeSelectBase.prototype, "position", void 0);
  __decorate18([
    o7({
      flatten: true,
      selector: "vscode-option"
    })
  ], VscodeSelectBase.prototype, "_assignedOptions", void 0);
  __decorate18([
    e6(".dropdown", true)
  ], VscodeSelectBase.prototype, "_dropdownEl", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_currentDescription", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_filter", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_filteredOptions", null);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_selectedIndexes", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_options", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_value", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_values", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_isPlaceholderOptionActive", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_isBeingFiltered", void 0);
  __decorate18([
    r5()
  ], VscodeSelectBase.prototype, "_optionListScrollPos", void 0);

  // node_modules/@vscode-elements/elements/dist/includes/vscode-select/styles.js
  var styles_default = [
    default_styles_default,
    i`
    :host {
      display: inline-block;
      max-width: 100%;
      outline: none;
      position: relative;
      width: 320px;
    }

    .main-slot {
      display: none;
    }

    .select-face,
    .combobox-face {
      background-color: var(--vscode-settings-dropdownBackground, #313131);
      border-color: var(--vscode-settings-dropdownBorder, #3c3c3c);
      border-radius: 2px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-dropdownForeground, #cccccc);
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 18px;
      position: relative;
      user-select: none;
      width: 100%;
    }

    :host([invalid]) .select-face,
    :host(:invalid) .select-face,
    :host([invalid]) .combobox-face,
    :host(:invalid) .combobox-face {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    .select-face {
      cursor: pointer;
      display: block;
      padding: 3px 4px;
    }

    .select-face .text {
      display: block;
      height: 18px;
      overflow: hidden;
      padding-right: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-face.multiselect {
      padding: 0;
    }

    .select-face-badge {
      background-color: var(--vscode-badge-background, #616161);
      border-radius: 2px;
      color: var(--vscode-badge-foreground, #f8f8f8);
      display: inline-block;
      flex-shrink: 0;
      font-size: 11px;
      line-height: 16px;
      margin: 2px;
      padding: 2px 3px;
      white-space: nowrap;
    }

    .select-face-badge.no-item {
      background-color: transparent;
      color: inherit;
    }

    .combobox-face {
      display: flex;
    }

    :host(:focus) .select-face,
    :host(:focus) .combobox-face,
    :host([focused]) .select-face,
    :host([focused]) .combobox-face {
      border-color: var(--vscode-focusBorder, #0078d4);
      outline: none;
    }

    .combobox-input {
      background-color: transparent;
      box-sizing: border-box;
      border: 0;
      color: var(--vscode-foreground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      line-height: 16px;
      padding: 4px;
      width: 100%;
    }

    .combobox-input:focus {
      outline: none;
    }

    .combobox-button {
      align-items: center;
      background-color: transparent;
      border: 0;
      border-radius: 2px;
      box-sizing: content-box;
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      display: flex;
      flex-shrink: 0;
      height: 16px;
      justify-content: center;
      margin: 1px 1px 0 0;
      padding: 3px;
      width: 22px;
    }

    .combobox-button:hover,
    .combobox-button:focus-visible {
      background-color: var(
        --vscode-toolbar-hoverBackground,
        rgba(90, 93, 94, 0.31)
      );
      outline-style: dashed;
      outline-color: var(--vscode-toolbar-hoverOutline, transparent);
    }

    .combobox-button:focus-visible {
      outline: none;
    }

    .icon {
      color: var(--vscode-foreground, #cccccc);
      display: block;
      height: 14px;
      pointer-events: none;
      width: 14px;
    }

    .select-face .icon {
      position: absolute;
      right: 6px;
      top: 5px;
    }

    .icon svg {
      color: var(--vscode-foreground, #cccccc);
      height: 100%;
      width: 100%;
    }

    .dropdown {
      background-color: var(--vscode-settings-dropdownBackground, #313131);
      border-color: var(--vscode-settings-dropdownListBorder, #454545);
      border-radius: 0 0 3px 3px;
      border-style: solid;
      border-width: 1px;
      bottom: unset;
      box-sizing: border-box;
      display: none;
      padding-bottom: 2px;
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
      right: unset;
    }

    .dropdown.open {
      display: block;
    }

    :host([position='above']) .dropdown {
      border-radius: 3px 3px 0 0;
      bottom: 26px;
      padding-bottom: 0;
      padding-top: 2px;
      top: unset;
    }

    :host(:focus) .dropdown,
    :host([focused]) .dropdown {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    .scrollable {
      display: block;
      max-height: 222px;
      margin: 1px;
      outline: none;
      overflow: hidden;
    }

    .options {
      box-sizing: border-box;
      cursor: pointer;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .option {
      box-sizing: border-box;
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      height: 22px;
      line-height: 20px;
      min-height: calc(var(--vscode-font-size) * 1.3);
      padding: 1px 3px;
      user-select: none;
      outline-color: transparent;
      outline-offset: -1px;
      outline-style: solid;
      outline-width: 1px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .option.single-select {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .option.multi-select {
      align-items: center;
      display: flex;
    }

    .option b {
      color: var(--vscode-list-highlightForeground, #2aaaff);
    }

    .option.active b {
      color: var(--vscode-list-focusHighlightForeground, #2aaaff);
    }

    .option:not(.disabled):hover {
      background-color: var(--vscode-list-hoverBackground, #2a2d2e);
      color: var(--vscode-list-hoverForeground, #ffffff);
    }

    :host-context(body[data-vscode-theme-kind='vscode-high-contrast'])
      .option:hover,
    :host-context(body[data-vscode-theme-kind='vscode-high-contrast-light'])
      .option:hover {
      outline-style: dotted;
      outline-color: var(--vscode-list-focusOutline, #0078d4);
      outline-width: 1px;
    }

    .option.disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .option.active,
    .option.active:hover {
      background-color: var(--vscode-list-activeSelectionBackground, #04395e);
      color: var(--vscode-list-activeSelectionForeground, #ffffff);
      outline-color: var(--vscode-list-activeSelectionBackground, #04395e);
      outline-style: solid;
      outline-width: 1px;
    }

    .no-options {
      align-items: center;
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      color: var(--vscode-foreground, #cccccc);
      cursor: default;
      display: flex;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 18px;
      min-height: calc(var(--vscode-font-size) * 1.3);
      opacity: 0.85;
      padding: 1px 3px;
      user-select: none;
    }

    .placeholder {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .placeholder span {
      font-weight: bold;
    }

    .placeholder:not(.disabled):hover {
      color: var(--vscode-list-activeSelectionForeground, #ffffff);
    }

    :host-context(body[data-vscode-theme-kind='vscode-high-contrast'])
      .option.active,
    :host-context(body[data-vscode-theme-kind='vscode-high-contrast-light'])
      .option.active:hover {
      outline-color: var(--vscode-list-focusOutline, #0078d4);
      outline-style: dashed;
    }

    .option-label {
      display: block;
      overflow: hidden;
      pointer-events: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    .dropdown.multiple .option.selected {
      background-color: var(--vscode-list-hoverBackground, #2a2d2e);
      outline-color: var(--vscode-list-hoverBackground, #2a2d2e);
    }

    .dropdown.multiple .option.selected.active {
      background-color: var(--vscode-list-activeSelectionBackground, #04395e);
      color: var(--vscode-list-activeSelectionForeground, #ffffff);
      outline-color: var(--vscode-list-activeSelectionBackground, #04395e);
    }

    .checkbox-icon {
      align-items: center;
      background-color: var(--vscode-checkbox-background, #313131);
      border-radius: 2px;
      border: 1px solid var(--vscode-checkbox-border);
      box-sizing: border-box;
      color: var(--vscode-checkbox-foreground);
      display: flex;
      flex-basis: 15px;
      flex-shrink: 0;
      height: 15px;
      justify-content: center;
      margin-right: 5px;
      overflow: hidden;
      position: relative;
      width: 15px;
    }

    .checkbox-icon svg {
      display: none;
      height: 13px;
      width: 13px;
    }

    .checkbox-icon.checked svg {
      display: block;
    }

    .dropdown-controls {
      display: flex;
      justify-content: flex-end;
      padding: 4px;
    }

    .dropdown-controls :not(:last-child) {
      margin-right: 4px;
    }

    .action-icon {
      align-items: center;
      background-color: transparent;
      border: 0;
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      display: flex;
      height: 24px;
      justify-content: center;
      padding: 0;
      width: 24px;
    }

    .action-icon:focus {
      outline: none;
    }

    .action-icon:focus-visible {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }

    .description {
      border-color: var(--vscode-settings-dropdownBorder, #3c3c3c);
      border-style: solid;
      border-width: 1px 0 0;
      color: var(--vscode-foreground, #cccccc);
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 1.3;
      padding: 6px 4px;
      word-wrap: break-word;
    }

    :host([position='above']) .description {
      border-width: 0 0 1px;
    }
  `
  ];

  // node_modules/@vscode-elements/elements/dist/vscode-multi-select/vscode-multi-select.styles.js
  var vscode_multi_select_styles_default = styles_default;

  // node_modules/@vscode-elements/elements/dist/vscode-multi-select/vscode-multi-select.js
  var __decorate19 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeMultiSelect = class VscodeMultiSelect2 extends VscodeSelectBase {
    set selectedIndexes(val) {
      this._opts.selectedIndexes = val;
    }
    get selectedIndexes() {
      return this._opts.selectedIndexes;
    }
    set value(val) {
      this._opts.multiSelectValue = val;
      if (this._opts.selectedIndexes.length > 0) {
        this._requestedValueToSetLater = [];
      } else {
        this._requestedValueToSetLater = Array.isArray(val) ? val : [val];
      }
      this._setFormValue();
      this._manageRequired();
    }
    get value() {
      return this._opts.multiSelectValue;
    }
    get form() {
      return this._internals.form;
    }
    /** @internal */
    get type() {
      return "select-multiple";
    }
    get validity() {
      return this._internals.validity;
    }
    get validationMessage() {
      return this._internals.validationMessage;
    }
    get willValidate() {
      return this._internals.willValidate;
    }
    checkValidity() {
      return this._internals.checkValidity();
    }
    reportValidity() {
      return this._internals.reportValidity();
    }
    selectAll() {
      this._opts.selectAll();
    }
    selectNone() {
      this._opts.selectNone();
    }
    constructor() {
      super();
      this.defaultValue = [];
      this.required = false;
      this.name = void 0;
      this._requestedValueToSetLater = [];
      this._onOptionClick = (ev) => {
        const composedPath = ev.composedPath();
        const optEl = composedPath.find((et) => {
          if ("matches" in et) {
            return et.matches("li.option");
          }
          return false;
        });
        if (!optEl) {
          return;
        }
        const isPlaceholderOption = optEl.classList.contains("placeholder");
        if (isPlaceholderOption) {
          this._createAndSelectSuggestedOption();
          return;
        }
        const index = Number(optEl.dataset.index);
        this._opts.toggleOptionSelected(index);
        this._setFormValue();
        this._manageRequired();
        this._dispatchChangeEvent();
      };
      this._opts.multiSelect = true;
      this._internals = this.attachInternals();
    }
    connectedCallback() {
      super.connectedCallback();
      this.updateComplete.then(() => {
        this._setDefaultValue();
        this._manageRequired();
      });
    }
    /** @internal */
    formResetCallback() {
      this.updateComplete.then(() => {
        this.value = this.defaultValue;
      });
    }
    /** @internal */
    formStateRestoreCallback(state, _mode) {
      const entries = Array.from(state.entries()).map((e12) => String(e12[1]));
      this.updateComplete.then(() => {
        this.value = entries;
      });
    }
    _setDefaultValue() {
      if (Array.isArray(this.defaultValue) && this.defaultValue.length > 0) {
        const val = this.defaultValue.map((v3) => String(v3));
        this.value = val;
      }
    }
    _dispatchChangeEvent() {
      super._dispatchChangeEvent();
    }
    _onFaceClick() {
      super._onFaceClick();
      this._opts.activeIndex = 0;
    }
    _toggleComboboxDropdown() {
      super._toggleComboboxDropdown();
      this._opts.activeIndex = -1;
    }
    _manageRequired() {
      const { value } = this;
      if (value.length === 0 && this.required) {
        this._internals.setValidity({
          valueMissing: true
        }, "Please select an item in the list.", this._faceElement);
      } else {
        this._internals.setValidity({});
      }
    }
    _setFormValue() {
      const fd = new FormData();
      this._values.forEach((v3) => {
        var _a6;
        fd.append((_a6 = this.name) != null ? _a6 : "", v3);
      });
      this._internals.setFormValue(fd);
    }
    async _createAndSelectSuggestedOption() {
      var _a6, _b2;
      super._createAndSelectSuggestedOption();
      const nextIndex = this._createSuggestedOption();
      await this.updateComplete;
      this.selectedIndexes = [...this.selectedIndexes, nextIndex];
      this._dispatchChangeEvent();
      const opCreateEvent = new CustomEvent("vsc-multi-select-create-option", { detail: { value: (_b2 = (_a6 = this._opts.getOptionByIndex(nextIndex)) == null ? void 0 : _a6.value) != null ? _b2 : "" } });
      this.dispatchEvent(opCreateEvent);
      this.open = false;
      this._isPlaceholderOptionActive = false;
    }
    //#region event handlers
    _onSlotChange() {
      super._onSlotChange();
      if (this._requestedValueToSetLater.length > 0) {
        this._opts.expandMultiSelection(this._requestedValueToSetLater);
        this._requestedValueToSetLater = this._requestedValueToSetLater.filter((v3) => this._opts.findOptionIndex(v3) === -1);
      }
    }
    _onEnterKeyDown(ev) {
      super._onEnterKeyDown(ev);
      if (!this.open) {
        this._opts.filterPattern = "";
        this.open = true;
      } else {
        if (this._isPlaceholderOptionActive) {
          this._createAndSelectSuggestedOption();
        } else {
          this._opts.toggleActiveMultiselectOption();
          this._setFormValue();
          this._manageRequired();
          this._dispatchChangeEvent();
        }
      }
    }
    _onMultiAcceptClick() {
      this.open = false;
    }
    _onMultiDeselectAllClick() {
      this._opts.selectedIndexes = [];
      this._values = [];
      this._options = this._options.map((op) => ({ ...op, selected: false }));
      this._manageRequired();
      this._dispatchChangeEvent();
    }
    _onMultiSelectAllClick() {
      this._opts.selectedIndexes = [];
      this._values = [];
      this._options = this._options.map((op) => ({ ...op, selected: true }));
      this._options.forEach((op, index) => {
        this._selectedIndexes.push(index);
        this._values.push(op.value);
        this._dispatchChangeEvent();
      });
      this._setFormValue();
      this._manageRequired();
    }
    //#endregion
    //#region render functions
    _renderLabel() {
      switch (this._opts.selectedIndexes.length) {
        case 0:
          return x`<span class="select-face-badge no-item">0 Selected</span>`;
        default:
          return x`<span class="select-face-badge"
          >${this._opts.selectedIndexes.length} Selected</span
        >`;
      }
    }
    _renderComboboxFace() {
      var _a6;
      let inputVal = "";
      if (this._isBeingFiltered) {
        inputVal = this._opts.filterPattern;
      } else {
        const op = this._opts.getSelectedOption();
        inputVal = (_a6 = op == null ? void 0 : op.label) != null ? _a6 : "";
      }
      const activeDescendant = this._opts.activeIndex > -1 ? `op-${this._opts.activeIndex}` : "";
      const expanded = this.open ? "true" : "false";
      return x`
      <div class="combobox-face face">
        ${this._opts.multiSelect ? this._renderLabel() : E}
        <input
          aria-activedescendant=${activeDescendant}
          aria-autocomplete="list"
          aria-controls="select-listbox"
          aria-expanded=${expanded}
          aria-haspopup="listbox"
          aria-label=${o8(this.label)}
          class="combobox-input"
          role="combobox"
          spellcheck="false"
          type="text"
          autocomplete="off"
          .value=${inputVal}
          @focus=${this._onComboboxInputFocus}
          @blur=${this._onComboboxInputBlur}
          @input=${this._onComboboxInputInput}
          @click=${this._onComboboxInputClick}
          @keydown=${this._onComboboxInputSpaceKeyDown}
        >
        <button
          aria-label="Open the list of options"
          class="combobox-button"
          type="button"
          @click=${this._onComboboxButtonClick}
          @keydown=${this._onComboboxButtonKeyDown}
          tabindex="-1"
        >
          ${chevronDownIcon}
        </button>
      </div>
    `;
    }
    _renderSelectFace() {
      var _a6;
      const activeDescendant = this._opts.activeIndex > -1 ? `op-${this._opts.activeIndex}` : "";
      const expanded = this.open ? "true" : "false";
      return x`
      <div
        aria-activedescendant=${o8(this._opts.multiSelect ? void 0 : activeDescendant)}
        aria-controls="select-listbox"
        aria-expanded=${o8(this._opts.multiSelect ? void 0 : expanded)}
        aria-haspopup="listbox"
        aria-label=${o8((_a6 = this.label) != null ? _a6 : void 0)}
        class="select-face face multiselect"
        @click=${this._onFaceClick}
        .tabIndex=${this.disabled ? -1 : 0}
      >
        ${this._renderLabel()} ${chevronDownIcon}
      </div>
    `;
    }
    _renderDropdownControls() {
      return this._filteredOptions.length > 0 ? x`
          <div class="dropdown-controls">
            <button
              type="button"
              @click=${this._onMultiSelectAllClick}
              title="Select all"
              class="action-icon"
              id="select-all"
            >
              <vscode-icon name="checklist"></vscode-icon>
            </button>
            <button
              type="button"
              @click=${this._onMultiDeselectAllClick}
              title="Deselect all"
              class="action-icon"
              id="select-none"
            >
              <vscode-icon name="clear-all"></vscode-icon>
            </button>
            <vscode-button
              class="button-accept"
              @click=${this._onMultiAcceptClick}
              >OK</vscode-button
            >
          </div>
        ` : x`${E}`;
    }
    render() {
      return x`
      <div class="multi-select">
        <slot class="main-slot" @slotchange=${this._onSlotChange}></slot>
        ${this.combobox ? this._renderComboboxFace() : this._renderSelectFace()}
        ${this._renderDropdown()}
      </div>
    `;
    }
  };
  VscodeMultiSelect.styles = vscode_multi_select_styles_default;
  VscodeMultiSelect.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  VscodeMultiSelect.formAssociated = true;
  __decorate19([
    n5({ type: Array, attribute: "default-value" })
  ], VscodeMultiSelect.prototype, "defaultValue", void 0);
  __decorate19([
    n5({ type: Boolean, reflect: true })
  ], VscodeMultiSelect.prototype, "required", void 0);
  __decorate19([
    n5({ reflect: true })
  ], VscodeMultiSelect.prototype, "name", void 0);
  __decorate19([
    n5({ type: Array, attribute: false })
  ], VscodeMultiSelect.prototype, "selectedIndexes", null);
  __decorate19([
    n5({ type: Array })
  ], VscodeMultiSelect.prototype, "value", null);
  __decorate19([
    e6(".face")
  ], VscodeMultiSelect.prototype, "_faceElement", void 0);
  VscodeMultiSelect = __decorate19([
    customElement("vscode-multi-select")
  ], VscodeMultiSelect);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeMultiSelect.js
  var VscodeMultiSelect3 = o({
    tagName: "vscode-multi-select",
    elementClass: VscodeMultiSelect,
    react: import_react28.default,
    displayName: "VscodeMultiSelect",
    events: {
      onChange: "change",
      onInvalid: "invalid",
      onVscMultiSelectCreateOption: "vsc-multi-select-create-option"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeOption.js
  var import_react30 = __toESM(require_react(), 1);
  var VscodeOption3 = o({
    tagName: "vscode-option",
    elementClass: VscodeOption,
    react: import_react30.default,
    displayName: "VscodeOption"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeProgressBar.js
  var import_react32 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-progress-bar/vscode-progress-bar.styles.js
  var styles15 = [
    default_styles_default,
    i`
    :host {
      display: block;
      height: 2px;
      width: 100%;
      outline: none;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .track {
      position: absolute;
      inset: 0;
      background: transparent;
    }

    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      background: var(--vscode-progressBar-background, #0078d4);
      will-change: transform, width, left;
    }

    /* Determinate mode: width is set inline via style attribute */
    .discrete .indicator {
      transition: width 100ms linear;
    }

    /* Indeterminate mode: VS Code style progress bit */
    .infinite .indicator {
      width: 2%;
      animation-name: progress;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      transform: translate3d(0px, 0px, 0px);
    }

    /* Long running: reduce GPU pressure using stepped animation */
    .infinite.infinite-long-running .indicator {
      animation-timing-function: steps(100);
    }

    /* Keyframes adapted from VS Code */
    @keyframes progress {
      from {
        transform: translateX(0%) scaleX(1);
      }
      50% {
        transform: translateX(2500%) scaleX(3);
      }
      to {
        transform: translateX(4900%) scaleX(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .discrete .indicator {
        transition: none;
      }
      .infinite .indicator,
      .infinite-long-running .indicator {
        animation: none;
        width: 100%;
      }
    }
  `
  ];
  var vscode_progress_bar_styles_default = styles15;

  // node_modules/@vscode-elements/elements/dist/vscode-progress-bar/vscode-progress-bar.js
  var __decorate20 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeProgressBar = class VscodeProgressBar2 extends VscElement {
    constructor() {
      super(...arguments);
      this.ariaLabel = "Loading";
      this.max = 100;
      this.indeterminate = false;
      this.longRunningThreshold = 15e3;
      this._longRunning = false;
    }
    get _isDeterminate() {
      return !this.indeterminate && typeof this.value === "number" && isFinite(this.value);
    }
    connectedCallback() {
      super.connectedCallback();
      this._maybeStartLongRunningTimer();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this._clearLongRunningTimer();
    }
    willUpdate() {
      this._maybeStartLongRunningTimer();
    }
    render() {
      var _a6;
      const max = this.max > 0 ? this.max : 100;
      const clamped = this._isDeterminate ? Math.min(Math.max((_a6 = this.value) != null ? _a6 : 0, 0), max) : 0;
      const percent = this._isDeterminate ? clamped / max * 100 : 0;
      const containerClasses = {
        container: true,
        discrete: this._isDeterminate,
        infinite: !this._isDeterminate,
        "infinite-long-running": this._longRunning && !this._isDeterminate
      };
      return x`
      <div
        class=${e9(containerClasses)}
        part="container"
        role="progressbar"
        aria-label=${this.ariaLabel}
        aria-valuemin="0"
        aria-valuemax=${String(max)}
        aria-valuenow=${o8(this._isDeterminate ? String(Math.round(clamped)) : void 0)}
      >
        <div class="track" part="track"></div>
        <div
          class="indicator"
          part="indicator"
          .style=${stylePropertyMap({
        width: this._isDeterminate ? `${percent}%` : void 0
      })}
        ></div>
      </div>
    `;
    }
    _maybeStartLongRunningTimer() {
      const shouldRun = !this._isDeterminate && this.longRunningThreshold > 0 && this.isConnected;
      if (!shouldRun) {
        this._clearLongRunningTimer();
        this._longRunning = false;
        return;
      }
      if (this._longRunningHandle) {
        return;
      }
      this._longRunningHandle = setTimeout(() => {
        this._longRunning = true;
        this._longRunningHandle = void 0;
        this.requestUpdate();
      }, this.longRunningThreshold);
    }
    _clearLongRunningTimer() {
      if (this._longRunningHandle) {
        clearTimeout(this._longRunningHandle);
        this._longRunningHandle = void 0;
      }
    }
  };
  VscodeProgressBar.styles = vscode_progress_bar_styles_default;
  __decorate20([
    n5({ reflect: true, attribute: "aria-label" })
  ], VscodeProgressBar.prototype, "ariaLabel", void 0);
  __decorate20([
    n5({ type: Number, reflect: true })
  ], VscodeProgressBar.prototype, "value", void 0);
  __decorate20([
    n5({ type: Number, reflect: true })
  ], VscodeProgressBar.prototype, "max", void 0);
  __decorate20([
    n5({ type: Boolean, reflect: true })
  ], VscodeProgressBar.prototype, "indeterminate", void 0);
  __decorate20([
    n5({ type: Number, attribute: "long-running-threshold" })
  ], VscodeProgressBar.prototype, "longRunningThreshold", void 0);
  __decorate20([
    r5()
  ], VscodeProgressBar.prototype, "_longRunning", void 0);
  VscodeProgressBar = __decorate20([
    customElement("vscode-progress-bar")
  ], VscodeProgressBar);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeProgressBar.js
  var VscodeProgressBar3 = o({
    tagName: "vscode-progress-bar",
    elementClass: VscodeProgressBar,
    react: import_react32.default,
    displayName: "VscodeProgressBar"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeProgressRing.js
  var import_react34 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-progress-ring/vscode-progress-ring.styles.js
  var styles16 = [
    default_styles_default,
    i`
    :host {
      display: block;
      height: 28px;
      margin: 0;
      outline: none;
      width: 28px;
    }

    .progress {
      height: 100%;
      width: 100%;
    }

    .background {
      fill: none;
      stroke: transparent;
      stroke-width: 2px;
    }

    .indeterminate-indicator-1 {
      fill: none;
      stroke: var(--vscode-progressBar-background, #0078d4);
      stroke-width: 2px;
      stroke-linecap: square;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
      animation: spin-infinite 2s linear infinite;
    }

    @keyframes spin-infinite {
      0% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(0deg);
      }
      50% {
        stroke-dasharray: 21.99px 21.99px;
        transform: rotate(450deg);
      }
      100% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(1080deg);
      }
    }
  `
  ];
  var vscode_progress_ring_styles_default = styles16;

  // node_modules/@vscode-elements/elements/dist/vscode-progress-ring/vscode-progress-ring.js
  var __decorate21 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeProgressRing = class VscodeProgressRing2 extends VscElement {
    constructor() {
      super(...arguments);
      this.ariaLabel = "Loading";
      this.ariaLive = "assertive";
      this.role = "alert";
    }
    render() {
      return x`<svg class="progress" part="progress" viewBox="0 0 16 16">
      <circle
        class="background"
        part="background"
        cx="8px"
        cy="8px"
        r="7px"
      ></circle>
      <circle
        class="indeterminate-indicator-1"
        part="indeterminate-indicator-1"
        cx="8px"
        cy="8px"
        r="7px"
      ></circle>
    </svg>`;
    }
  };
  VscodeProgressRing.styles = vscode_progress_ring_styles_default;
  __decorate21([
    n5({ reflect: true, attribute: "aria-label" })
  ], VscodeProgressRing.prototype, "ariaLabel", void 0);
  __decorate21([
    n5({ reflect: true, attribute: "aria-live" })
  ], VscodeProgressRing.prototype, "ariaLive", void 0);
  __decorate21([
    n5({ reflect: true })
  ], VscodeProgressRing.prototype, "role", void 0);
  VscodeProgressRing = __decorate21([
    customElement("vscode-progress-ring")
  ], VscodeProgressRing);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeProgressRing.js
  var VscodeProgressRing3 = o({
    tagName: "vscode-progress-ring",
    elementClass: VscodeProgressRing,
    react: import_react34.default,
    displayName: "VscodeProgressRing"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeRadio.js
  var import_react36 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-radio/vscode-radio.styles.js
  var styles17 = [
    default_styles_default,
    base_styles_default,
    i`
    :host(:invalid) .icon,
    :host([invalid]) .icon {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    .icon {
      border-radius: 9px;
    }

    .icon.checked:before {
      background-color: currentColor;
      border-radius: 4px;
      content: '';
      height: 8px;
      left: 50%;
      margin: -4px 0 0 -4px;
      position: absolute;
      top: 50%;
      width: 8px;
    }

    :host(:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }
  `
  ];
  var vscode_radio_styles_default = styles17;

  // node_modules/@vscode-elements/elements/dist/vscode-radio/vscode-radio.js
  var __decorate22 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeRadio = class VscodeRadio2 extends LabelledCheckboxOrRadioMixin(FormButtonWidgetBase) {
    constructor() {
      super();
      this.autofocus = false;
      this.checked = false;
      this.defaultChecked = false;
      this.invalid = false;
      this.name = "";
      this.value = "";
      this.disabled = false;
      this.required = false;
      this.role = "radio";
      this.tabIndex = 0;
      this._slottedText = "";
      this.type = "radio";
      this._handleClick = () => {
        if (this.disabled) {
          return;
        }
        if (!this.checked) {
          this._checkButton();
          this._handleValueChange();
          this.dispatchEvent(new Event("change", { bubbles: true }));
        }
      };
      this._handleKeyDown = (ev) => {
        var _a6;
        if (!this.disabled && (ev.key === "Enter" || ev.key === " ")) {
          ev.preventDefault();
          if (ev.key === " " && !this.checked) {
            this.checked = true;
            this._handleValueChange();
            this.dispatchEvent(new Event("change", { bubbles: true }));
          }
          if (ev.key === "Enter") {
            (_a6 = this._internals.form) == null ? void 0 : _a6.requestSubmit();
          }
        }
      };
      this._internals = this.attachInternals();
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this._handleKeyDown);
      this.addEventListener("click", this._handleClick);
      this._handleValueChange();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this._handleKeyDown);
      this.removeEventListener("click", this._handleClick);
    }
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("checked")) {
        this._handleValueChange();
      }
      if (changedProperties.has("required")) {
        this._handleValueChange();
      }
    }
    get form() {
      return this._internals.form;
    }
    get validity() {
      return this._internals.validity;
    }
    get validationMessage() {
      return this._internals.validationMessage;
    }
    get willValidate() {
      return this._internals.willValidate;
    }
    checkValidity() {
      return this._internals.checkValidity();
    }
    reportValidity() {
      return this._internals.reportValidity();
    }
    /** @internal */
    formResetCallback() {
      const radios = this._getRadios();
      radios.forEach((r8) => {
        r8.checked = r8.defaultChecked;
      });
      this.updateComplete.then(() => {
        this._handleValueChange();
      });
    }
    /** @internal */
    formStateRestoreCallback(state, _mode) {
      if (this.value === state && state !== "") {
        this.checked = true;
      }
    }
    _getRadios() {
      const root = this.getRootNode({ composed: true });
      if (!root) {
        return [];
      }
      const radios = root.querySelectorAll(`vscode-radio[name="${this.name}"]`);
      return Array.from(radios);
    }
    _uncheckOthers(radios) {
      radios.forEach((r8) => {
        if (r8 !== this) {
          r8.checked = false;
        }
      });
    }
    _checkButton() {
      const radios = this._getRadios();
      this.checked = true;
      radios.forEach((r8) => {
        if (r8 !== this) {
          r8.checked = false;
        }
      });
    }
    /**
     * @internal
     */
    setComponentValidity(isValid) {
      if (isValid) {
        this._internals.setValidity({});
      } else {
        this._internals.setValidity({
          valueMissing: true
        }, "Please select one of these options.", this._inputEl);
      }
    }
    _setGroupValidity(radios, isValid) {
      this.updateComplete.then(() => {
        radios.forEach((r8) => {
          r8.setComponentValidity(isValid);
        });
      });
    }
    _setActualFormValue() {
      let actualValue = "";
      if (this.checked) {
        actualValue = !this.value ? "on" : this.value;
      } else {
        actualValue = null;
      }
      this._internals.setFormValue(actualValue);
    }
    _handleValueChange() {
      const radios = this._getRadios();
      const anyRequired = radios.some((r8) => {
        return r8.required;
      });
      this._setActualFormValue();
      if (this.checked) {
        this._uncheckOthers(radios);
        this._setGroupValidity(radios, true);
      } else {
        const anyChecked = !!radios.find((r8) => r8.checked);
        const isInvalid = anyRequired && !anyChecked;
        this._setGroupValidity(radios, !isInvalid);
      }
    }
    render() {
      const iconClasses = e9({
        icon: true,
        checked: this.checked
      });
      const labelInnerClasses = e9({
        "label-inner": true,
        "is-slot-empty": this._slottedText === ""
      });
      return x`
      <div class="wrapper">
        <input
          ?autofocus=${this.autofocus}
          id="input"
          class="radio"
          type="checkbox"
          ?checked=${this.checked}
          value=${this.value}
          tabindex=${this.tabIndex}
        >
        <div class=${iconClasses}></div>
        <label for="input" class="label" @click=${this._handleClick}>
          <span class=${labelInnerClasses}>
            ${this._renderLabelAttribute()}
            <slot @slotchange=${this._handleSlotChange}></slot>
          </span>
        </label>
      </div>
    `;
    }
  };
  VscodeRadio.styles = vscode_radio_styles_default;
  VscodeRadio.formAssociated = true;
  VscodeRadio.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate22([
    n5({ type: Boolean, reflect: true })
  ], VscodeRadio.prototype, "autofocus", void 0);
  __decorate22([
    n5({ type: Boolean, reflect: true })
  ], VscodeRadio.prototype, "checked", void 0);
  __decorate22([
    n5({ type: Boolean, reflect: true, attribute: "default-checked" })
  ], VscodeRadio.prototype, "defaultChecked", void 0);
  __decorate22([
    n5({ type: Boolean, reflect: true })
  ], VscodeRadio.prototype, "invalid", void 0);
  __decorate22([
    n5({ reflect: true })
  ], VscodeRadio.prototype, "name", void 0);
  __decorate22([
    n5()
  ], VscodeRadio.prototype, "value", void 0);
  __decorate22([
    n5({ type: Boolean, reflect: true })
  ], VscodeRadio.prototype, "disabled", void 0);
  __decorate22([
    n5({ type: Boolean, reflect: true })
  ], VscodeRadio.prototype, "required", void 0);
  __decorate22([
    n5({ reflect: true })
  ], VscodeRadio.prototype, "role", void 0);
  __decorate22([
    n5({ type: Number, reflect: true })
  ], VscodeRadio.prototype, "tabIndex", void 0);
  __decorate22([
    r5()
  ], VscodeRadio.prototype, "_slottedText", void 0);
  __decorate22([
    e6("#input")
  ], VscodeRadio.prototype, "_inputEl", void 0);
  __decorate22([
    n5()
  ], VscodeRadio.prototype, "type", void 0);
  VscodeRadio = __decorate22([
    customElement("vscode-radio")
  ], VscodeRadio);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeRadio.js
  var VscodeRadio3 = o({
    tagName: "vscode-radio",
    elementClass: VscodeRadio,
    react: import_react36.default,
    displayName: "VscodeRadio",
    events: {
      onChange: "change",
      onInvalid: "invalid"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeRadioGroup.js
  var import_react38 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-radio-group/vscode-radio-group.styles.js
  var styles18 = [
    default_styles_default,
    i`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper {
      display: block;
    }

    ::slotted(vscode-radio) {
      margin-right: 20px;
    }

    ::slotted(vscode-radio:last-child) {
      margin-right: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-radio) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant='vertical']) ::slotted(vscode-radio:last-child) {
      margin-bottom: 0;
    }
  `
  ];
  var vscode_radio_group_styles_default = styles18;

  // node_modules/@vscode-elements/elements/dist/vscode-radio-group/vscode-radio-group.js
  var __decorate23 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeRadioGroup = class VscodeRadioGroup2 extends VscElement {
    constructor() {
      super(...arguments);
      this.variant = "horizontal";
      this.role = "radiogroup";
      this._focusedRadio = -1;
      this._checkedRadio = -1;
      this._firstContentLoaded = false;
      this._onKeyDownBound = this._onKeyDown.bind(this);
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this._onKeyDownBound);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this._onKeyDownBound);
    }
    _uncheckPreviousChecked(prevChecked, prevFocused) {
      if (prevChecked !== -1) {
        this._radios[prevChecked].checked = false;
      }
      if (prevFocused !== -1) {
        this._radios[prevFocused].tabIndex = -1;
      }
    }
    _afterCheck() {
      this._focusedRadio = this._checkedRadio;
      this._radios[this._checkedRadio].checked = true;
      this._radios[this._checkedRadio].tabIndex = 0;
      this._radios[this._checkedRadio].focus();
    }
    _checkPrev() {
      const prevChecked = this._radios.findIndex((r8) => r8.checked);
      const prevFocused = this._radios.findIndex((r8) => r8.focused);
      const startPos = prevFocused !== -1 ? prevFocused : prevChecked;
      this._uncheckPreviousChecked(prevChecked, prevFocused);
      if (startPos === -1) {
        this._checkedRadio = this._radios.length - 1;
      } else if (startPos - 1 >= 0) {
        this._checkedRadio = startPos - 1;
      } else {
        this._checkedRadio = this._radios.length - 1;
      }
      this._afterCheck();
    }
    _checkNext() {
      const prevChecked = this._radios.findIndex((r8) => r8.checked);
      const prevFocused = this._radios.findIndex((r8) => r8.focused);
      const startPos = prevFocused !== -1 ? prevFocused : prevChecked;
      this._uncheckPreviousChecked(prevChecked, prevFocused);
      if (startPos === -1) {
        this._checkedRadio = 0;
      } else if (startPos + 1 < this._radios.length) {
        this._checkedRadio = startPos + 1;
      } else {
        this._checkedRadio = 0;
      }
      this._afterCheck();
    }
    _onKeyDown(ev) {
      const { key } = ev;
      const listenedKeys2 = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
      if (listenedKeys2.includes(key)) {
        ev.preventDefault();
      }
      if (key === "ArrowRight" || key === "ArrowDown") {
        this._checkNext();
      }
      if (key === "ArrowLeft" || key === "ArrowUp") {
        this._checkPrev();
      }
    }
    _onChange(ev) {
      const clickedIndex = this._radios.findIndex((r8) => r8 === ev.target);
      if (clickedIndex !== -1) {
        if (this._focusedRadio !== -1) {
          this._radios[this._focusedRadio].tabIndex = -1;
        }
        if (this._checkedRadio !== -1 && this._checkedRadio !== clickedIndex) {
          this._radios[this._checkedRadio].checked = false;
        }
        this._focusedRadio = clickedIndex;
        this._checkedRadio = clickedIndex;
        this._radios[clickedIndex].tabIndex = 0;
      }
    }
    _onSlotChange() {
      if (!this._firstContentLoaded) {
        const autoFocusedRadio = this._radios.findIndex((r8) => r8.autofocus);
        if (autoFocusedRadio > -1) {
          this._focusedRadio = autoFocusedRadio;
        }
        this._firstContentLoaded = true;
      }
      this._radios.forEach((r8, i7) => {
        if (this._focusedRadio > -1) {
          r8.tabIndex = i7 === this._focusedRadio ? 0 : -1;
        } else {
          r8.tabIndex = i7 === 0 ? 0 : -1;
        }
      });
    }
    render() {
      return x`
      <div class="wrapper">
        <slot
          @slotchange=${this._onSlotChange}
          @vsc-change=${this._onChange}
        ></slot>
      </div>
    `;
    }
  };
  VscodeRadioGroup.styles = vscode_radio_group_styles_default;
  __decorate23([
    n5({ reflect: true })
  ], VscodeRadioGroup.prototype, "variant", void 0);
  __decorate23([
    n5({ reflect: true })
  ], VscodeRadioGroup.prototype, "role", void 0);
  __decorate23([
    o7({ selector: "vscode-radio" })
  ], VscodeRadioGroup.prototype, "_radios", void 0);
  __decorate23([
    r5()
  ], VscodeRadioGroup.prototype, "_focusedRadio", void 0);
  __decorate23([
    r5()
  ], VscodeRadioGroup.prototype, "_checkedRadio", void 0);
  VscodeRadioGroup = __decorate23([
    customElement("vscode-radio-group")
  ], VscodeRadioGroup);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeRadioGroup.js
  var VscodeRadioGroup3 = o({
    tagName: "vscode-radio-group",
    elementClass: VscodeRadioGroup,
    react: import_react38.default,
    displayName: "VscodeRadioGroup",
    events: {
      onChange: "change"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeScrollable.js
  var import_react40 = __toESM(require_react(), 1);
  var VscodeScrollable3 = o({
    tagName: "vscode-scrollable",
    elementClass: VscodeScrollable,
    react: import_react40.default,
    displayName: "VscodeScrollable"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeSingleSelect.js
  var import_react42 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-single-select/vscode-single-select.styles.js
  var vscode_single_select_styles_default = styles_default;

  // node_modules/@vscode-elements/elements/dist/vscode-single-select/vscode-single-select.js
  var __decorate24 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeSingleSelect = class VscodeSingleSelect2 extends VscodeSelectBase {
    set selectedIndex(val) {
      this._opts.selectedIndex = val;
      const op = this._opts.getOptionByIndex(val);
      if (op) {
        this._opts.activeIndex = val;
        this._value = op.value;
        this._internals.setFormValue(this._value);
        this._manageRequired();
      } else {
        this._value = "";
        this._internals.setFormValue("");
        this._manageRequired();
      }
    }
    get selectedIndex() {
      return this._opts.selectedIndex;
    }
    set value(val) {
      this._opts.value = val;
      if (this._opts.selectedIndex > -1) {
        this._requestedValueToSetLater = "";
      } else {
        this._requestedValueToSetLater = val;
      }
      this._internals.setFormValue(this._value);
      this._manageRequired();
    }
    get value() {
      return this._opts.value;
    }
    get validity() {
      return this._internals.validity;
    }
    get validationMessage() {
      return this._internals.validationMessage;
    }
    get willValidate() {
      return this._internals.willValidate;
    }
    checkValidity() {
      return this._internals.checkValidity();
    }
    reportValidity() {
      return this._internals.reportValidity();
    }
    updateInputValue() {
      var _a6;
      if (!this.combobox) {
        return;
      }
      const input = this.renderRoot.querySelector(".combobox-input");
      if (input) {
        const selectedOption = this._opts.getSelectedOption();
        input.value = (_a6 = selectedOption == null ? void 0 : selectedOption.label) != null ? _a6 : "";
      }
    }
    constructor() {
      super();
      this.defaultValue = "";
      this.name = void 0;
      this.required = false;
      this._requestedValueToSetLater = "";
      this._opts.multiSelect = false;
      this._internals = this.attachInternals();
    }
    connectedCallback() {
      super.connectedCallback();
      this.updateComplete.then(() => {
        this._manageRequired();
      });
    }
    /** @internal */
    formResetCallback() {
      this.value = this.defaultValue;
    }
    /** @internal */
    formStateRestoreCallback(state, _mode) {
      this.updateComplete.then(() => {
        this.value = state;
      });
    }
    /** @internal */
    get type() {
      return "select-one";
    }
    get form() {
      return this._internals.form;
    }
    async _createAndSelectSuggestedOption() {
      var _a6, _b2;
      const nextIndex = this._createSuggestedOption();
      await this.updateComplete;
      this._opts.selectedIndex = nextIndex;
      this._dispatchChangeEvent();
      const opCreateEvent = new CustomEvent("vsc-single-select-create-option", { detail: { value: (_b2 = (_a6 = this._opts.getOptionByIndex(nextIndex)) == null ? void 0 : _a6.value) != null ? _b2 : "" } });
      this.dispatchEvent(opCreateEvent);
      this.open = false;
      this._isPlaceholderOptionActive = false;
    }
    _setStateFromSlottedElements() {
      super._setStateFromSlottedElements();
      if (!this.combobox && this._opts.selectedIndexes.length === 0) {
        this._opts.selectedIndex = this._opts.options.length > 0 ? 0 : -1;
      }
    }
    //#region event handlers
    _onSlotChange() {
      super._onSlotChange();
      if (this._requestedValueToSetLater) {
        const foundOption = this._opts.getOptionByValue(this._requestedValueToSetLater);
        if (foundOption) {
          this._opts.selectedIndex = foundOption.index;
          this._requestedValueToSetLater = "";
        }
      }
      if (this._opts.selectedIndex > -1 && this._opts.numOptions > 0) {
        this._internals.setFormValue(this._opts.value);
        this._manageRequired();
      } else {
        this._internals.setFormValue(null);
        this._manageRequired();
      }
    }
    _onEnterKeyDown(ev) {
      super._onEnterKeyDown(ev);
      let valueChanged = false;
      if (this.combobox) {
        if (this.open) {
          if (this._isPlaceholderOptionActive) {
            this._createAndSelectSuggestedOption();
          } else {
            valueChanged = this._opts.activeIndex !== this._opts.selectedIndex;
            this._opts.selectedIndex = this._opts.activeIndex;
            this.open = false;
          }
        } else {
          this.open = true;
          this._scrollActiveElementToTop();
        }
      } else {
        if (this.open) {
          valueChanged = this._opts.activeIndex !== this._opts.selectedIndex;
          this._opts.selectedIndex = this._opts.activeIndex;
          this.open = false;
        } else {
          this.open = true;
          this._scrollActiveElementToTop();
        }
      }
      if (valueChanged) {
        this._dispatchChangeEvent();
        this.updateInputValue();
        this._internals.setFormValue(this._opts.value);
        this._manageRequired();
      }
    }
    _onOptionClick(ev) {
      super._onOptionClick(ev);
      const composedPath = ev.composedPath();
      const optEl = composedPath.find((et) => {
        const el = et;
        if ("matches" in el) {
          return el.matches("li.option");
        }
        return;
      });
      if (!optEl || optEl.matches(".disabled")) {
        return;
      }
      const isPlaceholderOption = optEl.classList.contains("placeholder");
      if (isPlaceholderOption) {
        if (this.creatable) {
          this._createAndSelectSuggestedOption();
        }
      } else {
        this._opts.selectedIndex = Number(optEl.dataset.index);
        this.open = false;
        this._internals.setFormValue(this._value);
        this._manageRequired();
        this._dispatchChangeEvent();
      }
    }
    //#endregion
    _manageRequired() {
      const { value } = this;
      if (value === "" && this.required) {
        this._internals.setValidity({ valueMissing: true }, "Please select an item in the list.", this._face);
      } else {
        this._internals.setValidity({});
      }
    }
    //#region render functions
    _renderSelectFace() {
      var _a6;
      const selectedOption = this._opts.getSelectedOption();
      const label = (_a6 = selectedOption == null ? void 0 : selectedOption.label) != null ? _a6 : "";
      const activeDescendant = this._opts.activeIndex > -1 ? `op-${this._opts.activeIndex}` : "";
      return x`
      <div
        aria-activedescendant=${activeDescendant}
        aria-controls="select-listbox"
        aria-expanded=${this.open ? "true" : "false"}
        aria-haspopup="listbox"
        aria-label=${o8(this.label)}
        class="select-face face"
        @click=${this._onFaceClick}
        role="combobox"
        tabindex="0"
      >
        <span class="text">${label}</span> ${chevronDownIcon}
      </div>
    `;
    }
    _renderComboboxFace() {
      var _a6;
      let inputVal = "";
      if (this._isBeingFiltered) {
        inputVal = this._opts.filterPattern;
      } else {
        const op = this._opts.getSelectedOption();
        inputVal = (_a6 = op == null ? void 0 : op.label) != null ? _a6 : "";
      }
      const activeDescendant = this._opts.activeIndex > -1 ? `op-${this._opts.activeIndex}` : "";
      const expanded = this.open ? "true" : "false";
      return x`
      <div class="combobox-face face">
        <input
          aria-activedescendant=${activeDescendant}
          aria-autocomplete="list"
          aria-controls="select-listbox"
          aria-expanded=${expanded}
          aria-haspopup="listbox"
          aria-label=${o8(this.label)}
          class="combobox-input"
          role="combobox"
          spellcheck="false"
          type="text"
          autocomplete="off"
          .value=${inputVal}
          @focus=${this._onComboboxInputFocus}
          @blur=${this._onComboboxInputBlur}
          @input=${this._onComboboxInputInput}
          @click=${this._onComboboxInputClick}
          @keydown=${this._onComboboxInputSpaceKeyDown}
        >
        <button
          aria-label="Open the list of options"
          class="combobox-button"
          type="button"
          @click=${this._onComboboxButtonClick}
          @keydown=${this._onComboboxButtonKeyDown}
          tabindex="-1"
        >
          ${chevronDownIcon}
        </button>
      </div>
    `;
    }
    render() {
      return x`
      <div class="single-select">
        <slot class="main-slot" @slotchange=${this._onSlotChange}></slot>
        ${this.combobox ? this._renderComboboxFace() : this._renderSelectFace()}
        ${this._renderDropdown()}
      </div>
    `;
    }
  };
  VscodeSingleSelect.styles = vscode_single_select_styles_default;
  VscodeSingleSelect.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  VscodeSingleSelect.formAssociated = true;
  __decorate24([
    n5({ attribute: "default-value" })
  ], VscodeSingleSelect.prototype, "defaultValue", void 0);
  __decorate24([
    n5({ reflect: true })
  ], VscodeSingleSelect.prototype, "name", void 0);
  __decorate24([
    n5({ type: Number, attribute: "selected-index" })
  ], VscodeSingleSelect.prototype, "selectedIndex", null);
  __decorate24([
    n5({ type: String })
  ], VscodeSingleSelect.prototype, "value", null);
  __decorate24([
    n5({ type: Boolean, reflect: true })
  ], VscodeSingleSelect.prototype, "required", void 0);
  __decorate24([
    e6(".face")
  ], VscodeSingleSelect.prototype, "_face", void 0);
  VscodeSingleSelect = __decorate24([
    customElement("vscode-single-select")
  ], VscodeSingleSelect);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeSingleSelect.js
  var VscodeSingleSelect3 = o({
    tagName: "vscode-single-select",
    elementClass: VscodeSingleSelect,
    react: import_react42.default,
    displayName: "VscodeSingleSelect",
    events: {
      onChange: "change",
      onInvalid: "invalid",
      onVscSingleSelectCreateOption: "vsc-single-select-create-option"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeSplitLayout.js
  var import_react44 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-split-layout/vscode-split-layout.styles.js
  var styles19 = [
    default_styles_default,
    i`
    :host {
      --separator-border: var(--vscode-editorWidget-border, #454545);

      border: 1px solid var(--vscode-editorWidget-border, #454545);
      display: block;
      overflow: hidden;
      position: relative;
    }

    ::slotted(*) {
      height: 100%;
      width: 100%;
    }

    ::slotted(vscode-split-layout) {
      border: 0;
    }

    .wrapper {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .wrapper.horizontal {
      flex-direction: column;
    }

    .start {
      box-sizing: border-box;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    :host([split='vertical']) .start {
      border-right: 1px solid var(--separator-border);
    }

    :host([split='horizontal']) .start {
      border-bottom: 1px solid var(--separator-border);
    }

    .end {
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    :host([split='vertical']) .start,
    :host([split='vertical']) .end {
      height: 100%;
    }

    :host([split='horizontal']) .start,
    :host([split='horizontal']) .end {
      width: 100%;
    }

    .handle-overlay {
      display: none;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    .handle-overlay.active {
      display: block;
    }

    .handle-overlay.split-vertical {
      cursor: ew-resize;
    }

    .handle-overlay.split-horizontal {
      cursor: ns-resize;
    }

    .handle {
      background-color: transparent;
      position: absolute;
      z-index: 2;
    }

    .handle.hover {
      transition: background-color 0.1s ease-out 0.3s;
      background-color: var(--vscode-sash-hoverBorder, #0078d4);
    }

    .handle.hide {
      background-color: transparent;
      transition: background-color 0.1s ease-out;
    }

    .handle.split-vertical {
      cursor: ew-resize;
      height: 100%;
    }

    .handle.split-horizontal {
      cursor: ns-resize;
      width: 100%;
    }
  `
  ];
  var vscode_split_layout_styles_default = styles19;

  // node_modules/@vscode-elements/elements/dist/vscode-split-layout/vscode-split-layout.js
  var __decorate25 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeSplitLayout_1;
  var DEFAULT_INITIAL_POSITION = "50%";
  var DEFAULT_HANDLE_SIZE = 4;
  var parseValue = (raw) => {
    if (!raw) {
      return { value: 0, unit: "pixel" };
    }
    let unit;
    let rawVal;
    if (raw.endsWith("%")) {
      unit = "percent";
      rawVal = +raw.substring(0, raw.length - 1);
    } else if (raw.endsWith("px")) {
      unit = "pixel";
      rawVal = +raw.substring(0, raw.length - 2);
    } else {
      unit = "pixel";
      rawVal = +raw;
    }
    const value = isNaN(rawVal) ? 0 : rawVal;
    return { unit, value };
  };
  var pxToPercent = (current, max) => {
    return max === 0 ? 0 : Math.min(100, current / max * 100);
  };
  var percentToPx = (current, max) => {
    return max * (current / 100);
  };
  var VscodeSplitLayout = VscodeSplitLayout_1 = class VscodeSplitLayout2 extends VscElement {
    /**
     * Direction of the divider.
     */
    set split(newVal) {
      if (this._split === newVal) {
        return;
      }
      this._split = newVal;
      this.resetHandlePosition();
    }
    get split() {
      return this._split;
    }
    /**
     * Set the handle position programmatically. The value must include a unit,
     * either `%` or `px`. If no unit is specified, the value is interpreted as
     * `px`.
     */
    set handlePosition(newVal) {
      this._rawHandlePosition = newVal;
      this._handlePositionPropChanged();
    }
    get handlePosition() {
      return this._rawHandlePosition;
    }
    /**
     * The size of the fixed pane will not change when the component is resized.
     */
    set fixedPane(newVal) {
      this._fixedPane = newVal;
      this._fixedPanePropChanged();
    }
    get fixedPane() {
      return this._fixedPane;
    }
    constructor() {
      super();
      this._split = "vertical";
      this.resetOnDblClick = false;
      this.handleSize = 4;
      this.initialHandlePosition = DEFAULT_INITIAL_POSITION;
      this._fixedPane = "none";
      this._handlePosition = 0;
      this._isDragActive = false;
      this._hover = false;
      this._hide = false;
      this._boundRect = new DOMRect();
      this._handleOffset = 0;
      this._wrapperObserved = false;
      this._fixedPaneSize = 0;
      this._handleResize = (entries) => {
        const rect = entries[0].contentRect;
        const { width, height } = rect;
        this._boundRect = rect;
        const max = this.split === "vertical" ? width : height;
        if (this.fixedPane === "start") {
          this._handlePosition = this._fixedPaneSize;
        }
        if (this.fixedPane === "end") {
          this._handlePosition = max - this._fixedPaneSize;
        }
      };
      this._handleMouseUp = (ev) => {
        this._isDragActive = false;
        if (ev.target !== this) {
          this._hover = false;
          this._hide = true;
        }
        window.removeEventListener("mouseup", this._handleMouseUp);
        window.removeEventListener("mousemove", this._handleMouseMove);
        const { width, height } = this._boundRect;
        const max = this.split === "vertical" ? width : height;
        const positionInPercentage = pxToPercent(this._handlePosition, max);
        this.dispatchEvent(new CustomEvent("vsc-split-layout-change", {
          detail: {
            position: this._handlePosition,
            positionInPercentage
          },
          composed: true
        }));
      };
      this._handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { left, top, height, width } = this._boundRect;
        const vert = this.split === "vertical";
        const maxPos = vert ? width : height;
        const mousePos = vert ? clientX - left : clientY - top;
        this._handlePosition = Math.max(0, Math.min(mousePos - this._handleOffset + this.handleSize / 2, maxPos));
        if (this.fixedPane === "start") {
          this._fixedPaneSize = this._handlePosition;
        }
        if (this.fixedPane === "end") {
          this._fixedPaneSize = maxPos - this._handlePosition;
        }
      };
      this._resizeObserver = new ResizeObserver(this._handleResize);
    }
    /**
     * Sets the handle position to the value specified in the `initialHandlePosition` property.
     */
    resetHandlePosition() {
      var _a6;
      if (!this._wrapperEl) {
        this._handlePosition = 0;
        return;
      }
      const { width, height } = this._wrapperEl.getBoundingClientRect();
      const max = this.split === "vertical" ? width : height;
      const { value, unit } = parseValue((_a6 = this.initialHandlePosition) != null ? _a6 : DEFAULT_INITIAL_POSITION);
      if (unit === "percent") {
        this._handlePosition = percentToPx(value, max);
      } else {
        this._handlePosition = value;
      }
    }
    connectedCallback() {
      super.connectedCallback();
    }
    firstUpdated(_changedProperties) {
      if (this.fixedPane !== "none") {
        this._resizeObserver.observe(this._wrapperEl);
        this._wrapperObserved = true;
      }
      this._boundRect = this._wrapperEl.getBoundingClientRect();
      const { value, unit } = this.handlePosition ? parseValue(this.handlePosition) : parseValue(this.initialHandlePosition);
      this._setPosition(value, unit);
      this._initFixedPane();
    }
    _handlePositionPropChanged() {
      if (this.handlePosition && this._wrapperEl) {
        this._boundRect = this._wrapperEl.getBoundingClientRect();
        const { value, unit } = parseValue(this.handlePosition);
        this._setPosition(value, unit);
      }
    }
    _fixedPanePropChanged() {
      if (!this._wrapperEl) {
        return;
      }
      this._initFixedPane();
    }
    _initFixedPane() {
      if (this.fixedPane === "none") {
        if (this._wrapperObserved) {
          this._resizeObserver.unobserve(this._wrapperEl);
          this._wrapperObserved = false;
        }
      } else {
        const { width, height } = this._boundRect;
        const max = this.split === "vertical" ? width : height;
        this._fixedPaneSize = this.fixedPane === "start" ? this._handlePosition : max - this._handlePosition;
        if (!this._wrapperObserved) {
          this._resizeObserver.observe(this._wrapperEl);
          this._wrapperObserved = true;
        }
      }
    }
    _setPosition(value, unit) {
      const { width, height } = this._boundRect;
      const max = this.split === "vertical" ? width : height;
      this._handlePosition = unit === "percent" ? percentToPx(value, max) : value;
    }
    _handleMouseOver() {
      this._hover = true;
      this._hide = false;
    }
    _handleMouseOut(event) {
      if (event.buttons !== 1) {
        this._hover = false;
        this._hide = true;
      }
    }
    _handleMouseDown(event) {
      event.stopPropagation();
      event.preventDefault();
      this._boundRect = this._wrapperEl.getBoundingClientRect();
      const { left, top } = this._boundRect;
      const { left: handleLeft, top: handleTop } = this._handleEl.getBoundingClientRect();
      const mouseXLocal = event.clientX - left;
      const mouseYLocal = event.clientY - top;
      if (this.split === "vertical") {
        this._handleOffset = mouseXLocal - (handleLeft - left);
      }
      if (this.split === "horizontal") {
        this._handleOffset = mouseYLocal - (handleTop - top);
      }
      this._isDragActive = true;
      window.addEventListener("mouseup", this._handleMouseUp);
      window.addEventListener("mousemove", this._handleMouseMove);
    }
    _handleDblClick() {
      if (!this.resetOnDblClick) {
        return;
      }
      this.resetHandlePosition();
    }
    _handleSlotChange() {
      const nestedLayouts = [
        ...this._nestedLayoutsAtStart,
        ...this._nestedLayoutsAtEnd
      ];
      nestedLayouts.forEach((e12) => {
        if (e12 instanceof VscodeSplitLayout_1) {
          e12.resetHandlePosition();
        }
      });
    }
    render() {
      var _a6;
      const { width, height } = this._boundRect;
      const maxPos = this.split === "vertical" ? width : height;
      const handlePosCss = this.fixedPane !== "none" ? `${this._handlePosition}px` : `${pxToPercent(this._handlePosition, maxPos)}%`;
      let startPaneSize = "";
      if (this.fixedPane === "start") {
        startPaneSize = `0 0 ${this._fixedPaneSize}px`;
      } else {
        startPaneSize = `1 1 ${pxToPercent(this._handlePosition, maxPos)}%`;
      }
      let endPaneSize = "";
      if (this.fixedPane === "end") {
        endPaneSize = `0 0 ${this._fixedPaneSize}px`;
      } else {
        endPaneSize = `1 1 ${pxToPercent(maxPos - this._handlePosition, maxPos)}%`;
      }
      const handleStylesPropObj = {
        left: this.split === "vertical" ? handlePosCss : "0",
        top: this.split === "vertical" ? "0" : handlePosCss
      };
      const handleSize = (_a6 = this.handleSize) != null ? _a6 : DEFAULT_HANDLE_SIZE;
      if (this.split === "vertical") {
        handleStylesPropObj.marginLeft = `${0 - handleSize / 2}px`;
        handleStylesPropObj.width = `${handleSize}px`;
      }
      if (this.split === "horizontal") {
        handleStylesPropObj.height = `${handleSize}px`;
        handleStylesPropObj.marginTop = `${0 - handleSize / 2}px`;
      }
      const handleOverlayClasses = e9({
        "handle-overlay": true,
        active: this._isDragActive,
        "split-vertical": this.split === "vertical",
        "split-horizontal": this.split === "horizontal"
      });
      const handleClasses = e9({
        handle: true,
        hover: this._hover,
        hide: this._hide,
        "split-vertical": this.split === "vertical",
        "split-horizontal": this.split === "horizontal"
      });
      const wrapperClasses = {
        wrapper: true,
        horizontal: this.split === "horizontal"
      };
      return x`
      <div class=${e9(wrapperClasses)}>
        <div class="start" .style=${stylePropertyMap({ flex: startPaneSize })}>
          <slot name="start" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class="end" .style=${stylePropertyMap({ flex: endPaneSize })}>
          <slot name="end" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class=${handleOverlayClasses}></div>
        <div
          class=${handleClasses}
          .style=${stylePropertyMap(handleStylesPropObj)}
          @mouseover=${this._handleMouseOver}
          @mouseout=${this._handleMouseOut}
          @mousedown=${this._handleMouseDown}
          @dblclick=${this._handleDblClick}
        ></div>
      </div>
    `;
    }
  };
  VscodeSplitLayout.styles = vscode_split_layout_styles_default;
  __decorate25([
    n5({ reflect: true })
  ], VscodeSplitLayout.prototype, "split", null);
  __decorate25([
    n5({ type: Boolean, reflect: true, attribute: "reset-on-dbl-click" })
  ], VscodeSplitLayout.prototype, "resetOnDblClick", void 0);
  __decorate25([
    n5({ type: Number, reflect: true, attribute: "handle-size" })
  ], VscodeSplitLayout.prototype, "handleSize", void 0);
  __decorate25([
    n5({ reflect: true, attribute: "initial-handle-position" })
  ], VscodeSplitLayout.prototype, "initialHandlePosition", void 0);
  __decorate25([
    n5({ attribute: "handle-position" })
  ], VscodeSplitLayout.prototype, "handlePosition", null);
  __decorate25([
    n5({ attribute: "fixed-pane" })
  ], VscodeSplitLayout.prototype, "fixedPane", null);
  __decorate25([
    r5()
  ], VscodeSplitLayout.prototype, "_handlePosition", void 0);
  __decorate25([
    r5()
  ], VscodeSplitLayout.prototype, "_isDragActive", void 0);
  __decorate25([
    r5()
  ], VscodeSplitLayout.prototype, "_hover", void 0);
  __decorate25([
    r5()
  ], VscodeSplitLayout.prototype, "_hide", void 0);
  __decorate25([
    e6(".wrapper")
  ], VscodeSplitLayout.prototype, "_wrapperEl", void 0);
  __decorate25([
    e6(".handle")
  ], VscodeSplitLayout.prototype, "_handleEl", void 0);
  __decorate25([
    o7({ slot: "start", selector: "vscode-split-layout" })
  ], VscodeSplitLayout.prototype, "_nestedLayoutsAtStart", void 0);
  __decorate25([
    o7({ slot: "end", selector: "vscode-split-layout" })
  ], VscodeSplitLayout.prototype, "_nestedLayoutsAtEnd", void 0);
  VscodeSplitLayout = VscodeSplitLayout_1 = __decorate25([
    customElement("vscode-split-layout")
  ], VscodeSplitLayout);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeSplitLayout.js
  var VscodeSplitLayout3 = o({
    tagName: "vscode-split-layout",
    elementClass: VscodeSplitLayout,
    react: import_react44.default,
    displayName: "VscodeSplitLayout",
    events: {
      onVscSplitLayoutChange: "vsc-split-layout-change"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabHeader.js
  var import_react46 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-tab-header/vscode-tab-header.styles.js
  var styles20 = [
    default_styles_default,
    i`
    :host {
      cursor: pointer;
      display: block;
      user-select: none;
    }

    .wrapper {
      align-items: center;
      border-bottom: 1px solid transparent;
      color: var(--vscode-foreground, #cccccc);
      display: flex;
      min-height: 20px;
      overflow: hidden;
      padding: 7px 8px;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host([active]) .wrapper {
      border-bottom-color: var(--vscode-panelTitle-activeForeground, #cccccc);
      color: var(--vscode-panelTitle-activeForeground, #cccccc);
    }

    :host([panel]) .wrapper {
      border-bottom: 0;
      margin-bottom: 0;
      padding: 0;
    }

    :host(:focus-visible) {
      outline: none;
    }

    .wrapper {
      align-items: center;
      color: var(--vscode-foreground, #cccccc);
      display: flex;
      min-height: 20px;
      overflow: inherit;
      text-overflow: inherit;
      position: relative;
    }

    .wrapper.panel {
      color: var(--vscode-panelTitle-inactiveForeground, #9d9d9d);
    }

    .wrapper.panel.active,
    .wrapper.panel:hover {
      color: var(--vscode-panelTitle-activeForeground, #cccccc);
    }

    :host([panel]) .wrapper {
      display: flex;
      font-size: 11px;
      height: 31px;
      padding: 2px 10px;
      text-transform: uppercase;
    }

    .main {
      overflow: inherit;
      text-overflow: inherit;
    }

    .active-indicator {
      display: none;
    }

    .active-indicator.panel.active {
      border-top: 1px solid var(--vscode-panelTitle-activeBorder, #0078d4);
      bottom: 4px;
      display: block;
      left: 8px;
      pointer-events: none;
      position: absolute;
      right: 8px;
    }

    :host(:focus-visible) .wrapper {
      outline-color: var(--vscode-focusBorder, #0078d4);
      outline-offset: 3px;
      outline-style: solid;
      outline-width: 1px;
    }

    :host(:focus-visible) .wrapper.panel {
      outline-offset: -2px;
    }

    slot[name='content-before']::slotted(vscode-badge) {
      margin-right: 8px;
    }

    slot[name='content-after']::slotted(vscode-badge) {
      margin-left: 8px;
    }
  `
  ];
  var vscode_tab_header_styles_default = styles20;

  // node_modules/@vscode-elements/elements/dist/vscode-tab-header/vscode-tab-header.js
  var __decorate26 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTabHeader = class VscodeTabHeader2 extends VscElement {
    constructor() {
      super(...arguments);
      this.active = false;
      this.ariaControls = "";
      this.panel = false;
      this.role = "tab";
      this.tabId = -1;
    }
    attributeChangedCallback(name, old, value) {
      super.attributeChangedCallback(name, old, value);
      if (name === "active") {
        const active = value !== null;
        this.ariaSelected = active ? "true" : "false";
        this.tabIndex = active ? 0 : -1;
      }
    }
    render() {
      return x`
      <div
        class=${e9({
        wrapper: true,
        active: this.active,
        panel: this.panel
      })}
      >
        <div class="before"><slot name="content-before"></slot></div>
        <div class="main"><slot></slot></div>
        <div class="after"><slot name="content-after"></slot></div>
        <span
          class=${e9({
        "active-indicator": true,
        active: this.active,
        panel: this.panel
      })}
        ></span>
      </div>
    `;
    }
  };
  VscodeTabHeader.styles = vscode_tab_header_styles_default;
  __decorate26([
    n5({ type: Boolean, reflect: true })
  ], VscodeTabHeader.prototype, "active", void 0);
  __decorate26([
    n5({ reflect: true, attribute: "aria-controls" })
  ], VscodeTabHeader.prototype, "ariaControls", void 0);
  __decorate26([
    n5({ type: Boolean, reflect: true })
  ], VscodeTabHeader.prototype, "panel", void 0);
  __decorate26([
    n5({ reflect: true })
  ], VscodeTabHeader.prototype, "role", void 0);
  __decorate26([
    n5({ type: Number, reflect: true, attribute: "tab-id" })
  ], VscodeTabHeader.prototype, "tabId", void 0);
  VscodeTabHeader = __decorate26([
    customElement("vscode-tab-header")
  ], VscodeTabHeader);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabHeader.js
  var VscodeTabHeader3 = o({
    tagName: "vscode-tab-header",
    elementClass: VscodeTabHeader,
    react: import_react46.default,
    displayName: "VscTabHeader"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTable.js
  var import_react48 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-table/helpers.js
  var rawValueToPercentage = (raw, base) => {
    if (typeof raw === "number" && !Number.isNaN(raw)) {
      return raw / base * 100;
    } else if (typeof raw === "string" && /^[0-9.]+$/.test(raw)) {
      const val = Number(raw);
      return val / base * 100;
    } else if (typeof raw === "string" && /^[0-9.]+%$/.test(raw)) {
      return Number(raw.substring(0, raw.length - 1));
    } else if (typeof raw === "string" && /^[0-9.]+px$/.test(raw)) {
      const val = Number(raw.substring(0, raw.length - 2));
      return val / base * 100;
    } else {
      return null;
    }
  };

  // node_modules/@vscode-elements/elements/dist/vscode-table/vscode-table.styles.js
  var styles21 = [
    default_styles_default,
    i`
    :host {
      display: block;
      --vsc-row-even-background: transparent;
      --vsc-row-odd-background: transparent;
      --vsc-row-border-bottom-width: 0;
      --vsc-row-border-top-width: 0;
      --vsc-row-display: table-row;
    }

    :host([bordered]),
    :host([bordered-rows]) {
      --vsc-row-border-bottom-width: 1px;
    }

    :host([compact]) {
      --vsc-row-display: block;
    }

    :host([bordered][compact]),
    :host([bordered-rows][compact]) {
      --vsc-row-border-bottom-width: 0;
      --vsc-row-border-top-width: 1px;
    }

    :host([zebra]) {
      --vsc-row-even-background: var(
        --vscode-keybindingTable-rowsBackground,
        rgba(204, 204, 204, 0.04)
      );
    }

    :host([zebra-odd]) {
      --vsc-row-odd-background: var(
        --vscode-keybindingTable-rowsBackground,
        rgba(204, 204, 204, 0.04)
      );
    }

    ::slotted(vscode-table-row) {
      width: 100%;
    }

    .wrapper {
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .wrapper.select-disabled {
      user-select: none;
    }

    .wrapper.resize-cursor {
      cursor: ew-resize;
    }

    .wrapper.compact-view .header-slot-wrapper {
      height: 0;
      overflow: hidden;
    }

    .scrollable {
      height: 100%;
    }

    .scrollable:before {
      background-color: transparent;
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      width: 100%;
    }

    .wrapper:not(.compact-view) .scrollable:not([scrolled]):before {
      background-color: var(
        --vscode-editorGroup-border,
        rgba(255, 255, 255, 0.09)
      );
    }

    .sash {
      visibility: hidden;
    }

    :host([bordered-columns]) .sash,
    :host([bordered]) .sash {
      visibility: visible;
    }

    :host([resizable]) .wrapper:hover .sash {
      visibility: visible;
    }

    .sash {
      height: 100%;
      position: absolute;
      top: 0;
      width: 1px;
    }

    .wrapper.compact-view .sash {
      display: none;
    }

    .sash.resizable {
      cursor: ew-resize;
    }

    .sash-visible {
      background-color: var(
        --vscode-editorGroup-border,
        rgba(255, 255, 255, 0.09)
      );
      height: 100%;
      position: absolute;
      top: 30px;
      width: 1px;
    }

    .sash.hover .sash-visible {
      background-color: var(--vscode-sash-hoverBorder, #0078d4);
      transition: background-color 50ms linear 300ms;
    }

    .sash .sash-clickable {
      background-color: transparent;
      height: 100%;
      left: -2px;
      position: absolute;
      width: 5px;
    }
  `
  ];
  var vscode_table_styles_default = styles21;

  // node_modules/@vscode-elements/elements/dist/vscode-table/vscode-table.js
  var __decorate27 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var COMPONENT_WIDTH_PERCENTAGE = 100;
  var VscodeTable = class VscodeTable2 extends VscElement {
    constructor() {
      super(...arguments);
      this.role = "table";
      this.resizable = false;
      this.responsive = false;
      this.bordered = false;
      this.borderedColumns = false;
      this.borderedRows = false;
      this.breakpoint = 300;
      this.minColumnWidth = "50px";
      this.delayedResizing = false;
      this.compact = false;
      this.zebra = false;
      this.zebraOdd = false;
      this._sashPositions = [];
      this._isDragging = false;
      this._sashHovers = [];
      this._columns = [];
      this._activeSashElementIndex = -1;
      this._activeSashCursorOffset = 0;
      this._componentX = 0;
      this._componentH = 0;
      this._componentW = 0;
      this._headerCells = [];
      this._cellsOfFirstRow = [];
      this._prevHeaderHeight = 0;
      this._prevComponentHeight = 0;
      this._componentResizeObserverCallback = () => {
        this._memoizeComponentDimensions();
        this._updateResizeHandlersSize();
        if (this.responsive) {
          this._toggleCompactView();
        }
        this._resizeTableBody();
      };
      this._headerResizeObserverCallback = () => {
        this._updateResizeHandlersSize();
      };
      this._bodyResizeObserverCallback = () => {
        this._resizeTableBody();
      };
      this._onResizingMouseMove = (event) => {
        event.stopPropagation();
        this._updateActiveSashPosition(event.pageX);
        if (!this.delayedResizing) {
          this._resizeColumns(true);
        } else {
          this._resizeColumns(false);
        }
      };
      this._onResizingMouseUp = (event) => {
        this._resizeColumns(true);
        this._updateActiveSashPosition(event.pageX);
        this._sashHovers[this._activeSashElementIndex] = false;
        this._isDragging = false;
        this._activeSashElementIndex = -1;
        document.removeEventListener("mousemove", this._onResizingMouseMove);
        document.removeEventListener("mouseup", this._onResizingMouseUp);
      };
    }
    /**
     * Initial column sizes in a JSON-encoded array.
     * Accepted values are:
     * - number
     * - string-type number (ex.: "100")
     * - px value (ex.: "100px")
     * - percentage value (ex.: "50%")
     * - percentage value (ex.: "50%")
     * - "auto" keyword
     */
    set columns(val) {
      this._columns = val;
      if (this.isConnected) {
        this._initDefaultColumnSizes();
      }
    }
    get columns() {
      return this._columns;
    }
    connectedCallback() {
      super.connectedCallback();
      this._memoizeComponentDimensions();
      this._initDefaultColumnSizes();
    }
    disconnectedCallback() {
      var _a6, _b2, _c;
      super.disconnectedCallback();
      (_a6 = this._componentResizeObserver) == null ? void 0 : _a6.unobserve(this);
      (_b2 = this._componentResizeObserver) == null ? void 0 : _b2.disconnect();
      (_c = this._bodyResizeObserver) == null ? void 0 : _c.disconnect();
    }
    _px2Percent(px) {
      return px / this._componentW * 100;
    }
    _percent2Px(percent) {
      return this._componentW * percent / 100;
    }
    _memoizeComponentDimensions() {
      const cr = this.getBoundingClientRect();
      this._componentH = cr.height;
      this._componentW = cr.width;
      this._componentX = cr.x;
    }
    _queryHeaderCells() {
      const headers = this._assignedHeaderElements;
      if (!(headers && headers[0])) {
        return [];
      }
      return Array.from(headers[0].querySelectorAll("vscode-table-header-cell"));
    }
    /**
     * Get cached header cells
     */
    _getHeaderCells() {
      if (!this._headerCells.length) {
        this._headerCells = this._queryHeaderCells();
      }
      return this._headerCells;
    }
    _queryCellsOfFirstRow() {
      const assignedBodyElements = this._assignedBodyElements;
      if (!(assignedBodyElements && assignedBodyElements[0])) {
        return [];
      }
      return Array.from(assignedBodyElements[0].querySelectorAll("vscode-table-row:first-child vscode-table-cell"));
    }
    /**
     * Get cached cells of first row
     */
    _getCellsOfFirstRow() {
      if (!this._cellsOfFirstRow.length) {
        this._cellsOfFirstRow = this._queryCellsOfFirstRow();
      }
      return this._cellsOfFirstRow;
    }
    _resizeTableBody() {
      let headerHeight = 0;
      let tbodyHeight = 0;
      const tableHeight = this.getBoundingClientRect().height;
      if (this._assignedHeaderElements && this._assignedHeaderElements.length) {
        headerHeight = this._assignedHeaderElements[0].getBoundingClientRect().height;
      }
      if (this._assignedBodyElements && this._assignedBodyElements.length) {
        tbodyHeight = this._assignedBodyElements[0].getBoundingClientRect().height;
      }
      const overflownContentHeight = tbodyHeight - headerHeight - tableHeight;
      this._scrollableElement.style.height = overflownContentHeight > 0 ? `${tableHeight - headerHeight}px` : "auto";
    }
    _initResizeObserver() {
      this._componentResizeObserver = new ResizeObserver(this._componentResizeObserverCallback);
      this._componentResizeObserver.observe(this);
      this._headerResizeObserver = new ResizeObserver(this._headerResizeObserverCallback);
      this._headerResizeObserver.observe(this._headerElement);
    }
    _calcColWidthPercentages() {
      const numCols = this._getHeaderCells().length;
      let cols = this.columns.slice(0, numCols);
      const numAutoCols = cols.filter((c6) => c6 === "auto").length + numCols - cols.length;
      let availablePercent = 100;
      cols = cols.map((col) => {
        const percentage = rawValueToPercentage(col, this._componentW);
        if (percentage === null) {
          return "auto";
        }
        availablePercent -= percentage;
        return percentage;
      });
      if (cols.length < numCols) {
        for (let i7 = cols.length; i7 < numCols; i7++) {
          cols.push("auto");
        }
      }
      cols = cols.map((col) => {
        if (col === "auto") {
          return availablePercent / numAutoCols;
        }
        return col;
      });
      return cols;
    }
    _initHeaderCellSizes(colWidths) {
      this._getHeaderCells().forEach((cell, index) => {
        cell.style.width = `${colWidths[index]}%`;
      });
    }
    _initBodyColumnSizes(colWidths) {
      this._getCellsOfFirstRow().forEach((cell, index) => {
        cell.style.width = `${colWidths[index]}%`;
      });
    }
    _initSashes(colWidths) {
      const l3 = colWidths.length;
      let prevHandlerPos = 0;
      this._sashPositions = [];
      colWidths.forEach((collW, index) => {
        if (index < l3 - 1) {
          const pos = prevHandlerPos + collW;
          this._sashPositions.push(pos);
          prevHandlerPos = pos;
        }
      });
    }
    _initDefaultColumnSizes() {
      const colWidths = this._calcColWidthPercentages();
      this._initHeaderCellSizes(colWidths);
      this._initBodyColumnSizes(colWidths);
      this._initSashes(colWidths);
    }
    _updateResizeHandlersSize() {
      const headerCr = this._headerElement.getBoundingClientRect();
      if (headerCr.height === this._prevHeaderHeight && this._componentH === this._prevComponentHeight) {
        return;
      }
      this._prevHeaderHeight = headerCr.height;
      this._prevComponentHeight = this._componentH;
      const bodyHeight = this._componentH - headerCr.height;
      this._sashVisibleElements.forEach((el) => {
        el.style.height = `${bodyHeight}px`;
        el.style.top = `${headerCr.height}px`;
      });
    }
    _applyCompactViewColumnLabels() {
      const headerCells = this._getHeaderCells();
      const labels = headerCells.map((c6) => c6.innerText);
      const rows = this.querySelectorAll("vscode-table-row");
      rows.forEach((r8) => {
        const cells = r8.querySelectorAll("vscode-table-cell");
        cells.forEach((c6, i7) => {
          c6.columnLabel = labels[i7];
          c6.compact = true;
        });
      });
    }
    _clearCompactViewColumnLabels() {
      this.querySelectorAll("vscode-table-cell").forEach((c6) => {
        c6.columnLabel = "";
        c6.compact = false;
      });
    }
    _toggleCompactView() {
      const cr = this.getBoundingClientRect();
      const nextCompactView = cr.width < this.breakpoint;
      if (this.compact !== nextCompactView) {
        this.compact = nextCompactView;
        if (nextCompactView) {
          this._applyCompactViewColumnLabels();
        } else {
          this._clearCompactViewColumnLabels();
        }
      }
    }
    _onDefaultSlotChange() {
      this._assignedElements.forEach((el) => {
        if (el.tagName.toLowerCase() === "vscode-table-header") {
          el.slot = "header";
          return;
        }
        if (el.tagName.toLowerCase() === "vscode-table-body") {
          el.slot = "body";
          return;
        }
      });
    }
    _onHeaderSlotChange() {
      this._headerCells = this._queryHeaderCells();
    }
    _onBodySlotChange() {
      var _a6;
      this._initDefaultColumnSizes();
      this._initResizeObserver();
      this._updateResizeHandlersSize();
      if (!this._bodyResizeObserver) {
        const tbody = (_a6 = this._assignedBodyElements[0]) != null ? _a6 : null;
        if (tbody) {
          this._bodyResizeObserver = new ResizeObserver(this._bodyResizeObserverCallback);
          this._bodyResizeObserver.observe(tbody);
        }
      }
    }
    _onSashMouseOver(event) {
      if (this._isDragging) {
        return;
      }
      const target = event.currentTarget;
      const index = Number(target.dataset.index);
      this._sashHovers[index] = true;
      this.requestUpdate();
    }
    _onSashMouseOut(event) {
      event.stopPropagation();
      if (this._isDragging) {
        return;
      }
      const target = event.currentTarget;
      const index = Number(target.dataset.index);
      this._sashHovers[index] = false;
      this.requestUpdate();
    }
    _onSashMouseDown(event) {
      event.stopPropagation();
      const { pageX, currentTarget } = event;
      const el = currentTarget;
      const index = Number(el.dataset.index);
      const cr = el.getBoundingClientRect();
      const elX = cr.x;
      this._isDragging = true;
      this._activeSashElementIndex = index;
      this._sashHovers[this._activeSashElementIndex] = true;
      this._activeSashCursorOffset = this._px2Percent(pageX - elX);
      const headerCells = this._getHeaderCells();
      this._headerCellsToResize = [];
      this._headerCellsToResize.push(headerCells[index]);
      if (headerCells[index + 1]) {
        this._headerCellsToResize[1] = headerCells[index + 1];
      }
      const tbody = this._bodySlot.assignedElements()[0];
      const cells = tbody.querySelectorAll("vscode-table-row:first-child > vscode-table-cell");
      this._cellsToResize = [];
      this._cellsToResize.push(cells[index]);
      if (cells[index + 1]) {
        this._cellsToResize.push(cells[index + 1]);
      }
      document.addEventListener("mousemove", this._onResizingMouseMove);
      document.addEventListener("mouseup", this._onResizingMouseUp);
    }
    _updateActiveSashPosition(mouseX) {
      const { prevSashPos, nextSashPos } = this._getSashPositions();
      let minColumnWidth = rawValueToPercentage(this.minColumnWidth, this._componentW);
      if (minColumnWidth === null) {
        minColumnWidth = 0;
      }
      const minX = prevSashPos ? prevSashPos + minColumnWidth : minColumnWidth;
      const maxX = nextSashPos ? nextSashPos - minColumnWidth : COMPONENT_WIDTH_PERCENTAGE - minColumnWidth;
      let newX = this._px2Percent(mouseX - this._componentX - this._percent2Px(this._activeSashCursorOffset));
      newX = Math.max(newX, minX);
      newX = Math.min(newX, maxX);
      this._sashPositions[this._activeSashElementIndex] = newX;
      this.requestUpdate();
    }
    _getSashPositions() {
      const sashPos = this._sashPositions[this._activeSashElementIndex];
      const prevSashPos = this._sashPositions[this._activeSashElementIndex - 1] || 0;
      const nextSashPos = this._sashPositions[this._activeSashElementIndex + 1] || COMPONENT_WIDTH_PERCENTAGE;
      return {
        sashPos,
        prevSashPos,
        nextSashPos
      };
    }
    _resizeColumns(resizeBodyCells = true) {
      const { sashPos, prevSashPos, nextSashPos } = this._getSashPositions();
      const prevColW = sashPos - prevSashPos;
      const nextColW = nextSashPos - sashPos;
      const prevColCss = `${prevColW}%`;
      const nextColCss = `${nextColW}%`;
      this._headerCellsToResize[0].style.width = prevColCss;
      if (this._headerCellsToResize[1]) {
        this._headerCellsToResize[1].style.width = nextColCss;
      }
      if (resizeBodyCells && this._cellsToResize[0]) {
        this._cellsToResize[0].style.width = prevColCss;
        if (this._cellsToResize[1]) {
          this._cellsToResize[1].style.width = nextColCss;
        }
      }
    }
    render() {
      const sashes = this._sashPositions.map((val, index) => {
        const classes = e9({
          sash: true,
          hover: this._sashHovers[index],
          resizable: this.resizable
        });
        const left = `${val}%`;
        return this.resizable ? x`
            <div
              class=${classes}
              data-index=${index}
              .style=${stylePropertyMap({ left })}
              @mousedown=${this._onSashMouseDown}
              @mouseover=${this._onSashMouseOver}
              @mouseout=${this._onSashMouseOut}
            >
              <div class="sash-visible"></div>
              <div class="sash-clickable"></div>
            </div>
          ` : x`<div
            class=${classes}
            data-index=${index}
            .style=${stylePropertyMap({ left })}
          >
            <div class="sash-visible"></div>
          </div>`;
      });
      const wrapperClasses = e9({
        wrapper: true,
        "select-disabled": this._isDragging,
        "resize-cursor": this._isDragging,
        "compact-view": this.compact
      });
      return x`
      <div class=${wrapperClasses}>
        <div class="header">
          <slot name="caption"></slot>
          <div class="header-slot-wrapper">
            <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
          </div>
        </div>
        <vscode-scrollable class="scrollable">
          <div>
            <slot name="body" @slotchange=${this._onBodySlotChange}></slot>
          </div>
        </vscode-scrollable>
        ${sashes}
        <slot @slotchange=${this._onDefaultSlotChange}></slot>
      </div>
    `;
    }
  };
  VscodeTable.styles = vscode_table_styles_default;
  __decorate27([
    n5({ reflect: true })
  ], VscodeTable.prototype, "role", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true })
  ], VscodeTable.prototype, "resizable", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true })
  ], VscodeTable.prototype, "responsive", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true })
  ], VscodeTable.prototype, "bordered", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true, attribute: "bordered-columns" })
  ], VscodeTable.prototype, "borderedColumns", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true, attribute: "bordered-rows" })
  ], VscodeTable.prototype, "borderedRows", void 0);
  __decorate27([
    n5({ type: Number })
  ], VscodeTable.prototype, "breakpoint", void 0);
  __decorate27([
    n5({ type: Array })
  ], VscodeTable.prototype, "columns", null);
  __decorate27([
    n5({ attribute: "min-column-width" })
  ], VscodeTable.prototype, "minColumnWidth", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true, attribute: "delayed-resizing" })
  ], VscodeTable.prototype, "delayedResizing", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true })
  ], VscodeTable.prototype, "compact", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true })
  ], VscodeTable.prototype, "zebra", void 0);
  __decorate27([
    n5({ type: Boolean, reflect: true, attribute: "zebra-odd" })
  ], VscodeTable.prototype, "zebraOdd", void 0);
  __decorate27([
    e6('slot[name="body"]')
  ], VscodeTable.prototype, "_bodySlot", void 0);
  __decorate27([
    e6(".header")
  ], VscodeTable.prototype, "_headerElement", void 0);
  __decorate27([
    e6(".scrollable")
  ], VscodeTable.prototype, "_scrollableElement", void 0);
  __decorate27([
    r6(".sash-visible")
  ], VscodeTable.prototype, "_sashVisibleElements", void 0);
  __decorate27([
    o7({
      flatten: true,
      selector: "vscode-table-header, vscode-table-body"
    })
  ], VscodeTable.prototype, "_assignedElements", void 0);
  __decorate27([
    o7({
      slot: "header",
      flatten: true,
      selector: "vscode-table-header"
    })
  ], VscodeTable.prototype, "_assignedHeaderElements", void 0);
  __decorate27([
    o7({
      slot: "body",
      flatten: true,
      selector: "vscode-table-body"
    })
  ], VscodeTable.prototype, "_assignedBodyElements", void 0);
  __decorate27([
    r5()
  ], VscodeTable.prototype, "_sashPositions", void 0);
  __decorate27([
    r5()
  ], VscodeTable.prototype, "_isDragging", void 0);
  VscodeTable = __decorate27([
    customElement("vscode-table")
  ], VscodeTable);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTable.js
  var VscodeTable3 = o({
    tagName: "vscode-table",
    elementClass: VscodeTable,
    react: import_react48.default,
    displayName: "VscodeTable"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableBody.js
  var import_react50 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-table-body/vscode-table-body.styles.js
  var styles22 = [
    default_styles_default,
    i`
    :host {
      display: table;
      table-layout: fixed;
      width: 100%;
    }

    ::slotted(vscode-table-row:nth-child(even)) {
      background-color: var(--vsc-row-even-background);
    }

    ::slotted(vscode-table-row:nth-child(odd)) {
      background-color: var(--vsc-row-odd-background);
    }
  `
  ];
  var vscode_table_body_styles_default = styles22;

  // node_modules/@vscode-elements/elements/dist/vscode-table-body/vscode-table-body.js
  var __decorate28 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTableBody = class VscodeTableBody2 extends VscElement {
    constructor() {
      super(...arguments);
      this.role = "rowgroup";
    }
    render() {
      return x` <slot></slot> `;
    }
  };
  VscodeTableBody.styles = vscode_table_body_styles_default;
  __decorate28([
    n5({ reflect: true })
  ], VscodeTableBody.prototype, "role", void 0);
  VscodeTableBody = __decorate28([
    customElement("vscode-table-body")
  ], VscodeTableBody);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableBody.js
  var VscodeTableBody3 = o({
    tagName: "vscode-table-body",
    elementClass: VscodeTableBody,
    react: import_react50.default,
    displayName: "VscodeTableBody"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableCell.js
  var import_react52 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-table-cell/vscode-table-cell.styles.js
  var styles23 = [
    default_styles_default,
    i`
    :host {
      border-bottom-color: var(
        --vscode-editorGroup-border,
        rgba(255, 255, 255, 0.09)
      );
      border-bottom-style: solid;
      border-bottom-width: var(--vsc-row-border-bottom-width);
      box-sizing: border-box;
      color: var(--vscode-foreground, #cccccc);
      display: table-cell;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      height: 24px;
      overflow: hidden;
      padding-left: 10px;
      text-overflow: ellipsis;
      vertical-align: middle;
      white-space: nowrap;
    }

    :host([compact]) {
      display: block;
      height: auto;
      padding-bottom: 5px;
      width: 100% !important;
    }

    :host([compact]:first-child) {
      padding-top: 10px;
    }

    :host([compact]:last-child) {
      padding-bottom: 10px;
    }

    .wrapper {
      overflow: inherit;
      text-overflow: inherit;
      white-space: inherit;
      width: 100%;
    }

    .column-label {
      font-weight: bold;
    }
  `
  ];
  var vscode_table_cell_styles_default = styles23;

  // node_modules/@vscode-elements/elements/dist/vscode-table-cell/vscode-table-cell.js
  var __decorate29 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTableCell = class VscodeTableCell2 extends VscElement {
    constructor() {
      super(...arguments);
      this.role = "cell";
      this.columnLabel = "";
      this.compact = false;
    }
    render() {
      const columnLabelElement = this.columnLabel ? x`<div class="column-label" role="presentation">
          ${this.columnLabel}
        </div>` : E;
      return x`
      <div class="wrapper">
        ${columnLabelElement}
        <slot></slot>
      </div>
    `;
    }
  };
  VscodeTableCell.styles = vscode_table_cell_styles_default;
  __decorate29([
    n5({ reflect: true })
  ], VscodeTableCell.prototype, "role", void 0);
  __decorate29([
    n5({ attribute: "column-label" })
  ], VscodeTableCell.prototype, "columnLabel", void 0);
  __decorate29([
    n5({ type: Boolean, reflect: true })
  ], VscodeTableCell.prototype, "compact", void 0);
  VscodeTableCell = __decorate29([
    customElement("vscode-table-cell")
  ], VscodeTableCell);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableCell.js
  var VscodeTableCell3 = o({
    tagName: "vscode-table-cell",
    elementClass: VscodeTableCell,
    react: import_react52.default,
    displayName: "VscodeTableCell"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableHeader.js
  var import_react54 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-table-header/vscode-table-header.styles.js
  var styles24 = [
    default_styles_default,
    i`
    :host {
      background-color: var(
        --vscode-keybindingTable-headerBackground,
        rgba(204, 204, 204, 0.04)
      );
      display: table;
      table-layout: fixed;
      width: 100%;
    }
  `
  ];
  var vscode_table_header_styles_default = styles24;

  // node_modules/@vscode-elements/elements/dist/vscode-table-header/vscode-table-header.js
  var __decorate30 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTableHeader = class VscodeTableHeader2 extends VscElement {
    constructor() {
      super(...arguments);
      this.role = "rowgroup";
    }
    render() {
      return x` <slot></slot> `;
    }
  };
  VscodeTableHeader.styles = vscode_table_header_styles_default;
  __decorate30([
    n5({ reflect: true })
  ], VscodeTableHeader.prototype, "role", void 0);
  VscodeTableHeader = __decorate30([
    customElement("vscode-table-header")
  ], VscodeTableHeader);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableHeader.js
  var VscodeTableHeader3 = o({
    tagName: "vscode-table-header",
    elementClass: VscodeTableHeader,
    react: import_react54.default,
    displayName: "VscodeTableHeader"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableHeaderCell.js
  var import_react56 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-table-header-cell/vscode-table-header-cell.styles.js
  var styles25 = [
    default_styles_default,
    i`
    :host {
      box-sizing: border-box;
      color: var(--vscode-foreground, #cccccc);
      display: table-cell;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: bold;
      line-height: 20px;
      overflow: hidden;
      padding-bottom: 5px;
      padding-left: 10px;
      padding-right: 0;
      padding-top: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .wrapper {
      box-sizing: inherit;
      overflow: inherit;
      text-overflow: inherit;
      white-space: inherit;
      width: 100%;
    }
  `
  ];
  var vscode_table_header_cell_styles_default = styles25;

  // node_modules/@vscode-elements/elements/dist/vscode-table-header-cell/vscode-table-header-cell.js
  var __decorate31 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTableHeaderCell = class VscodeTableHeaderCell2 extends VscElement {
    constructor() {
      super(...arguments);
      this.role = "columnheader";
    }
    render() {
      return x`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
    }
  };
  VscodeTableHeaderCell.styles = vscode_table_header_cell_styles_default;
  __decorate31([
    n5({ reflect: true })
  ], VscodeTableHeaderCell.prototype, "role", void 0);
  VscodeTableHeaderCell = __decorate31([
    customElement("vscode-table-header-cell")
  ], VscodeTableHeaderCell);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableHeaderCell.js
  var VscodeTableHeaderCell3 = o({
    tagName: "vscode-table-header-cell",
    elementClass: VscodeTableHeaderCell,
    react: import_react56.default,
    displayName: "VscodeTableHeaderCell"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableRow.js
  var import_react58 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-table-row/vscode-table-row.styles.js
  var styles26 = [
    default_styles_default,
    i`
    :host {
      border-top-color: var(
        --vscode-editorGroup-border,
        rgba(255, 255, 255, 0.09)
      );
      border-top-style: solid;
      border-top-width: var(--vsc-row-border-top-width);
      display: var(--vsc-row-display);
      width: 100%;
    }
  `
  ];
  var vscode_table_row_styles_default = styles26;

  // node_modules/@vscode-elements/elements/dist/vscode-table-row/vscode-table-row.js
  var __decorate32 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTableRow = class VscodeTableRow2 extends VscElement {
    constructor() {
      super(...arguments);
      this.role = "row";
    }
    render() {
      return x` <slot></slot> `;
    }
  };
  VscodeTableRow.styles = vscode_table_row_styles_default;
  __decorate32([
    n5({ reflect: true })
  ], VscodeTableRow.prototype, "role", void 0);
  VscodeTableRow = __decorate32([
    customElement("vscode-table-row")
  ], VscodeTableRow);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableRow.js
  var VscodeTableRow3 = o({
    tagName: "vscode-table-row",
    elementClass: VscodeTableRow,
    react: import_react58.default,
    displayName: "VscodeTableRow"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabPanel.js
  var import_react60 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-tab-panel/vscode-tab-panel.styles.js
  var styles27 = [
    default_styles_default,
    i`
    :host {
      display: block;
      overflow: hidden;
    }

    :host(:focus-visible) {
      outline-color: var(--vscode-focusBorder, #0078d4);
      outline-offset: 3px;
      outline-style: solid;
      outline-width: 1px;
    }

    :host([panel]) {
      background-color: var(--vscode-panel-background, #181818);
    }
  `
  ];
  var vscode_tab_panel_styles_default = styles27;

  // node_modules/@vscode-elements/elements/dist/vscode-tab-panel/vscode-tab-panel.js
  var __decorate33 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTabPanel = class VscodeTabPanel2 extends VscElement {
    constructor() {
      super(...arguments);
      this.hidden = false;
      this.ariaLabelledby = "";
      this.panel = false;
      this.role = "tabpanel";
      this.tabIndex = 0;
    }
    render() {
      return x` <slot></slot> `;
    }
  };
  VscodeTabPanel.styles = vscode_tab_panel_styles_default;
  __decorate33([
    n5({ type: Boolean, reflect: true })
  ], VscodeTabPanel.prototype, "hidden", void 0);
  __decorate33([
    n5({ reflect: true, attribute: "aria-labelledby" })
  ], VscodeTabPanel.prototype, "ariaLabelledby", void 0);
  __decorate33([
    n5({ type: Boolean, reflect: true })
  ], VscodeTabPanel.prototype, "panel", void 0);
  __decorate33([
    n5({ reflect: true })
  ], VscodeTabPanel.prototype, "role", void 0);
  __decorate33([
    n5({ type: Number, reflect: true })
  ], VscodeTabPanel.prototype, "tabIndex", void 0);
  VscodeTabPanel = __decorate33([
    customElement("vscode-tab-panel")
  ], VscodeTabPanel);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabPanel.js
  var VscodeTabPanel3 = o({
    tagName: "vscode-tab-panel",
    elementClass: VscodeTabPanel,
    react: import_react60.default,
    displayName: "VscodeTabPanel"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabs.js
  var import_react62 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-tabs/vscode-tabs.styles.js
  var styles28 = [
    default_styles_default,
    i`
    :host {
      display: block;
    }

    .header {
      align-items: center;
      display: flex;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      width: 100%;
    }

    .header {
      border-bottom-color: var(--vscode-settings-headerBorder, #2b2b2b);
      border-bottom-style: solid;
      border-bottom-width: 1px;
    }

    .header.panel {
      background-color: var(--vscode-panel-background, #181818);
      border-bottom-width: 0;
      box-sizing: border-box;
      padding-left: 8px;
      padding-right: 8px;
    }

    .tablist {
      display: flex;
      margin-bottom: -1px;
    }

    slot[name='addons'] {
      display: block;
      margin-left: auto;
    }
  `
  ];
  var vscode_tabs_styles_default = styles28;

  // node_modules/@vscode-elements/elements/dist/vscode-tabs/vscode-tabs.js
  var __decorate34 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTabs = class VscodeTabs2 extends VscElement {
    constructor() {
      super();
      this.panel = false;
      this.selectedIndex = 0;
      this._tabHeaders = [];
      this._tabPanels = [];
      this._componentId = "";
      this._tabFocus = 0;
      this._componentId = uniqueId_default();
    }
    attributeChangedCallback(name, old, value) {
      super.attributeChangedCallback(name, old, value);
      if (name === "selected-index") {
        this._setActiveTab();
      }
      if (name === "panel") {
        this._tabHeaders.forEach((h3) => h3.panel = value !== null);
        this._tabPanels.forEach((p4) => p4.panel = value !== null);
      }
    }
    _dispatchSelectEvent() {
      this.dispatchEvent(new CustomEvent("vsc-tabs-select", {
        detail: {
          selectedIndex: this.selectedIndex
        },
        composed: true
      }));
    }
    _setActiveTab() {
      this._tabFocus = this.selectedIndex;
      this._tabPanels.forEach((el, i7) => {
        el.hidden = i7 !== this.selectedIndex;
      });
      this._tabHeaders.forEach((el, i7) => {
        el.active = i7 === this.selectedIndex;
      });
    }
    _focusPrevTab() {
      if (this._tabFocus === 0) {
        this._tabFocus = this._tabHeaders.length - 1;
      } else {
        this._tabFocus -= 1;
      }
    }
    _focusNextTab() {
      if (this._tabFocus === this._tabHeaders.length - 1) {
        this._tabFocus = 0;
      } else {
        this._tabFocus += 1;
      }
    }
    _onHeaderKeyDown(ev) {
      if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
        ev.preventDefault();
        this._tabHeaders[this._tabFocus].setAttribute("tabindex", "-1");
        if (ev.key === "ArrowLeft") {
          this._focusPrevTab();
        } else if (ev.key === "ArrowRight") {
          this._focusNextTab();
        }
        this._tabHeaders[this._tabFocus].setAttribute("tabindex", "0");
        this._tabHeaders[this._tabFocus].focus();
      }
      if (ev.key === "Enter") {
        ev.preventDefault();
        this.selectedIndex = this._tabFocus;
        this._dispatchSelectEvent();
      }
    }
    _moveHeadersToHeaderSlot() {
      const headers = this._mainSlotElements.filter((el) => el instanceof VscodeTabHeader);
      if (headers.length > 0) {
        headers.forEach((h3) => h3.setAttribute("slot", "header"));
      }
    }
    _onMainSlotChange() {
      this._moveHeadersToHeaderSlot();
      this._tabPanels = this._mainSlotElements.filter((el) => el instanceof VscodeTabPanel);
      this._tabPanels.forEach((el, i7) => {
        el.ariaLabelledby = `t${this._componentId}-h${i7}`;
        el.id = `t${this._componentId}-p${i7}`;
        el.panel = this.panel;
      });
      this._setActiveTab();
    }
    _onHeaderSlotChange() {
      this._tabHeaders = this._headerSlotElements.filter((el) => el instanceof VscodeTabHeader);
      this._tabHeaders.forEach((el, i7) => {
        el.tabId = i7;
        el.id = `t${this._componentId}-h${i7}`;
        el.ariaControls = `t${this._componentId}-p${i7}`;
        el.panel = this.panel;
        el.active = i7 === this.selectedIndex;
      });
    }
    _onHeaderClick(event) {
      const path = event.composedPath();
      const headerEl = path.find((et) => et instanceof VscodeTabHeader);
      if (headerEl) {
        this.selectedIndex = headerEl.tabId;
        this._setActiveTab();
        this._dispatchSelectEvent();
      }
    }
    render() {
      return x`
      <div
        class=${e9({ header: true, panel: this.panel })}
        @click=${this._onHeaderClick}
        @keydown=${this._onHeaderKeyDown}
      >
        <div role="tablist" class="tablist">
          <slot
            name="header"
            @slotchange=${this._onHeaderSlotChange}
            role="tablist"
          ></slot>
        </div>
        <slot name="addons"></slot>
      </div>
      <slot @slotchange=${this._onMainSlotChange}></slot>
    `;
    }
  };
  VscodeTabs.styles = vscode_tabs_styles_default;
  __decorate34([
    n5({ type: Boolean, reflect: true })
  ], VscodeTabs.prototype, "panel", void 0);
  __decorate34([
    n5({ type: Number, reflect: true, attribute: "selected-index" })
  ], VscodeTabs.prototype, "selectedIndex", void 0);
  __decorate34([
    o7({ slot: "header" })
  ], VscodeTabs.prototype, "_headerSlotElements", void 0);
  __decorate34([
    o7()
  ], VscodeTabs.prototype, "_mainSlotElements", void 0);
  VscodeTabs = __decorate34([
    customElement("vscode-tabs")
  ], VscodeTabs);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabs.js
  var VscodeTabs3 = o({
    tagName: "vscode-tabs",
    elementClass: VscodeTabs,
    react: import_react62.default,
    events: {
      onVscTabsSelect: "vsc-tabs-select"
    },
    displayName: "VscodeTabs"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTextarea.js
  var import_react64 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-textarea/vscode-textarea.styles.js
  var styles29 = [
    default_styles_default,
    i`
    :host {
      display: inline-block;
      height: auto;
      position: relative;
      width: 320px;
    }

    :host([cols]) {
      width: auto;
    }

    :host([rows]) {
      height: auto;
    }

    .shadow {
      box-shadow: var(--vscode-scrollbar-shadow, #000000) 0 6px 6px -6px inset;
      display: none;
      inset: 0 0 auto 0;
      height: 6px;
      pointer-events: none;
      position: absolute;
      width: 100%;
    }

    .shadow.visible {
      display: block;
    }

    textarea {
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border-color: var(--vscode-settings-textInputBorder, transparent);
      border-radius: 2px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      height: 100%;
      width: 100%;
    }

    :host([cols]) textarea {
      width: auto;
    }

    :host([rows]) textarea {
      height: auto;
    }

    :host([invalid]) textarea,
    :host(:invalid) textarea {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    textarea.monospace {
      background-color: var(--vscode-editor-background, #1f1f1f);
      color: var(--vscode-editor-foreground, #cccccc);
      font-family: var(--vscode-editor-font-family, monospace);
      font-size: var(--vscode-editor-font-size, 14px);
      font-weight: var(--vscode-editor-font-weight, normal);
    }

    .textarea.monospace::placeholder {
      color: var(
        --vscode-editor-inlineValuesForeground,
        rgba(255, 255, 255, 0.5)
      );
    }

    textarea.cursor-pointer {
      cursor: pointer;
    }

    textarea:focus {
      border-color: var(--vscode-focusBorder, #0078d4);
      outline: none;
    }

    textarea::placeholder {
      color: var(--vscode-input-placeholderForeground, #989898);
      opacity: 1;
    }

    textarea::-webkit-scrollbar-track {
      background-color: transparent;
    }

    textarea::-webkit-scrollbar {
      width: 14px;
    }

    textarea::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    textarea:hover::-webkit-scrollbar-thumb {
      background-color: var(
        --vscode-scrollbarSlider-background,
        rgba(121, 121, 121, 0.4)
      );
    }

    textarea::-webkit-scrollbar-thumb:hover {
      background-color: var(
        --vscode-scrollbarSlider-hoverBackground,
        rgba(100, 100, 100, 0.7)
      );
    }

    textarea::-webkit-scrollbar-thumb:active {
      background-color: var(
        --vscode-scrollbarSlider-activeBackground,
        rgba(191, 191, 191, 0.4)
      );
    }

    textarea::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    textarea::-webkit-resizer {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACJJREFUeJxjYMAOZuIQZ5j5//9/rJJESczEKYGsG6cEXgAAsEEefMxkua4AAAAASUVORK5CYII=');
      background-repeat: no-repeat;
      background-position: right bottom;
    }
  `
  ];
  var vscode_textarea_styles_default = styles29;

  // node_modules/@vscode-elements/elements/dist/vscode-textarea/vscode-textarea.js
  var __decorate35 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTextarea = class VscodeTextarea2 extends VscElement {
    set value(val) {
      this._value = val;
      this._internals.setFormValue(val);
    }
    get value() {
      return this._value;
    }
    /**
     * Getter for the inner textarea element if it needs to be accessed for some reason.
     */
    get wrappedElement() {
      return this._textareaEl;
    }
    get form() {
      return this._internals.form;
    }
    /** @internal */
    get type() {
      return "textarea";
    }
    get validity() {
      return this._internals.validity;
    }
    get validationMessage() {
      return this._internals.validationMessage;
    }
    get willValidate() {
      return this._internals.willValidate;
    }
    /**
     * Lowercase alias to minLength
     */
    set minlength(val) {
      this.minLength = val;
    }
    get minlength() {
      return this.minLength;
    }
    /**
     * Lowercase alias to maxLength
     */
    set maxlength(val) {
      this.maxLength = val;
    }
    get maxlength() {
      return this.maxLength;
    }
    // #endregion
    constructor() {
      super();
      this.autocomplete = void 0;
      this.autofocus = false;
      this.defaultValue = "";
      this.disabled = false;
      this.invalid = false;
      this.label = "";
      this.maxLength = void 0;
      this.minLength = void 0;
      this.rows = void 0;
      this.cols = void 0;
      this.name = void 0;
      this.placeholder = void 0;
      this.readonly = false;
      this.resize = "none";
      this.required = false;
      this.spellcheck = false;
      this.monospace = false;
      this._value = "";
      this._textareaPointerCursor = false;
      this._shadow = false;
      this._internals = this.attachInternals();
    }
    connectedCallback() {
      super.connectedCallback();
      this.updateComplete.then(() => {
        this._textareaEl.checkValidity();
        this._setValidityFromInput();
        this._internals.setFormValue(this._textareaEl.value);
      });
    }
    updated(changedProperties) {
      const validationRelatedProps = ["maxLength", "minLength", "required"];
      for (const key of changedProperties.keys()) {
        if (validationRelatedProps.includes(String(key))) {
          this.updateComplete.then(() => {
            this._setValidityFromInput();
          });
          break;
        }
      }
    }
    /** @internal */
    formResetCallback() {
      this.value = this.defaultValue;
    }
    /** @internal */
    formStateRestoreCallback(state, _mode) {
      this.updateComplete.then(() => {
        this._value = state;
      });
    }
    checkValidity() {
      return this._internals.checkValidity();
    }
    reportValidity() {
      return this._internals.reportValidity();
    }
    _setValidityFromInput() {
      this._internals.setValidity(this._textareaEl.validity, this._textareaEl.validationMessage, this._textareaEl);
    }
    _dataChanged() {
      this._value = this._textareaEl.value;
      this._internals.setFormValue(this._textareaEl.value);
    }
    _handleChange() {
      this._dataChanged();
      this._setValidityFromInput();
      this.dispatchEvent(new Event("change"));
    }
    _handleInput() {
      this._dataChanged();
      this._setValidityFromInput();
    }
    _handleMouseMove(ev) {
      if (this._textareaEl.clientHeight >= this._textareaEl.scrollHeight) {
        this._textareaPointerCursor = false;
        return;
      }
      const SCROLLBAR_WIDTH = 14;
      const BORDER_WIDTH = 1;
      const br = this._textareaEl.getBoundingClientRect();
      const x2 = ev.clientX;
      this._textareaPointerCursor = x2 >= br.left + br.width - SCROLLBAR_WIDTH - BORDER_WIDTH * 2;
    }
    _handleScroll() {
      this._shadow = this._textareaEl.scrollTop > 0;
    }
    render() {
      return x`
      <div
        class=${e9({
        shadow: true,
        visible: this._shadow
      })}
      ></div>
      <textarea
        autocomplete=${o8(this.autocomplete)}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        id="textarea"
        class=${e9({
        monospace: this.monospace,
        "cursor-pointer": this._textareaPointerCursor
      })}
        maxlength=${o8(this.maxLength)}
        minlength=${o8(this.minLength)}
        rows=${o8(this.rows)}
        cols=${o8(this.cols)}
        name=${o8(this.name)}
        placeholder=${o8(this.placeholder)}
        ?readonly=${this.readonly}
        .style=${stylePropertyMap({
        resize: this.resize
      })}
        ?required=${this.required}
        spellcheck=${this.spellcheck}
        @change=${this._handleChange}
        @input=${this._handleInput}
        @mousemove=${this._handleMouseMove}
        @scroll=${this._handleScroll}
        .value=${this._value}
      ></textarea>
    `;
    }
  };
  VscodeTextarea.styles = vscode_textarea_styles_default;
  VscodeTextarea.formAssociated = true;
  VscodeTextarea.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate35([
    n5()
  ], VscodeTextarea.prototype, "autocomplete", void 0);
  __decorate35([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextarea.prototype, "autofocus", void 0);
  __decorate35([
    n5({ attribute: "default-value" })
  ], VscodeTextarea.prototype, "defaultValue", void 0);
  __decorate35([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextarea.prototype, "disabled", void 0);
  __decorate35([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextarea.prototype, "invalid", void 0);
  __decorate35([
    n5({ attribute: false })
  ], VscodeTextarea.prototype, "label", void 0);
  __decorate35([
    n5({ type: Number })
  ], VscodeTextarea.prototype, "maxLength", void 0);
  __decorate35([
    n5({ type: Number })
  ], VscodeTextarea.prototype, "minLength", void 0);
  __decorate35([
    n5({ type: Number })
  ], VscodeTextarea.prototype, "rows", void 0);
  __decorate35([
    n5({ type: Number })
  ], VscodeTextarea.prototype, "cols", void 0);
  __decorate35([
    n5()
  ], VscodeTextarea.prototype, "name", void 0);
  __decorate35([
    n5()
  ], VscodeTextarea.prototype, "placeholder", void 0);
  __decorate35([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextarea.prototype, "readonly", void 0);
  __decorate35([
    n5()
  ], VscodeTextarea.prototype, "resize", void 0);
  __decorate35([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextarea.prototype, "required", void 0);
  __decorate35([
    n5({ type: Boolean })
  ], VscodeTextarea.prototype, "spellcheck", void 0);
  __decorate35([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextarea.prototype, "monospace", void 0);
  __decorate35([
    n5()
  ], VscodeTextarea.prototype, "value", null);
  __decorate35([
    e6("#textarea")
  ], VscodeTextarea.prototype, "_textareaEl", void 0);
  __decorate35([
    r5()
  ], VscodeTextarea.prototype, "_value", void 0);
  __decorate35([
    r5()
  ], VscodeTextarea.prototype, "_textareaPointerCursor", void 0);
  __decorate35([
    r5()
  ], VscodeTextarea.prototype, "_shadow", void 0);
  VscodeTextarea = __decorate35([
    customElement("vscode-textarea")
  ], VscodeTextarea);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTextarea.js
  var VscodeTextarea3 = o({
    tagName: "vscode-textarea",
    elementClass: VscodeTextarea,
    react: import_react64.default,
    displayName: "VscodeTextarea",
    events: {
      onChange: "change",
      onInput: "input",
      onInvalid: "invalid"
    }
  });
  var VscodeTextarea_default = VscodeTextarea3;

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTextfield.js
  var import_react66 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-textfield/vscode-textfield.styles.js
  var defaultFontStack3 = r(getDefaultFontStack());
  var styles30 = [
    default_styles_default,
    i`
    :host {
      display: inline-block;
      width: 320px;
    }

    .root {
      align-items: center;
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border-color: var(
        --vscode-settings-textInputBorder,
        var(--vscode-settings-textInputBackground, #3c3c3c)
      );
      border-radius: 2px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: flex;
      max-width: 100%;
      position: relative;
      width: 100%;
    }

    :host([focused]) .root {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    :host([invalid]),
    :host(:invalid) {
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    :host([invalid]) input,
    :host(:invalid) input {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
    }

    ::slotted([slot='content-before']) {
      display: block;
      margin-left: 2px;
    }

    ::slotted([slot='content-after']) {
      display: block;
      margin-right: 2px;
    }

    slot[name='content-before'],
    slot[name='content-after'] {
      align-items: center;
      display: flex;
    }

    input {
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border: 0;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, ${defaultFontStack3});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, 'normal');
      line-height: 18px;
      outline: none;
      padding-bottom: 3px;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 3px;
      width: 100%;
    }

    input:read-only:not([type='file']) {
      cursor: not-allowed;
    }

    input::placeholder {
      color: var(--vscode-input-placeholderForeground, #989898);
      opacity: 1;
    }

    input[type='file'] {
      line-height: 24px;
      padding-bottom: 0;
      padding-left: 2px;
      padding-top: 0;
    }

    input[type='file']::file-selector-button {
      background-color: var(--vscode-button-background, #0078d4);
      border: 0;
      border-radius: 2px;
      color: var(--vscode-button-foreground, #ffffff);
      cursor: pointer;
      font-family: var(--vscode-font-family, ${defaultFontStack3});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, 'normal');
      line-height: 20px;
      padding: 0 14px;
    }

    input[type='file']::file-selector-button:hover {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
    }
  `
  ];
  var vscode_textfield_styles_default = styles30;

  // node_modules/@vscode-elements/elements/dist/vscode-textfield/vscode-textfield.js
  var __decorate36 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeTextfield = class VscodeTextfield2 extends VscElement {
    /**
     * Same as the `type` of the native `<input>` element but only a subset of types are supported.
     * The supported ones are: `color`,`date`,`datetime-local`,`email`,`file`,`month`,`number`,`password`,`search`,`tel`,`text`,`time`,`url`,`week`
     */
    set type(val) {
      const validTypes = [
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "month",
        "number",
        "password",
        "search",
        "tel",
        "text",
        "time",
        "url",
        "week"
      ];
      this._type = validTypes.includes(val) ? val : "text";
    }
    get type() {
      return this._type;
    }
    set value(val) {
      if (this.type !== "file") {
        this._value = val;
        this._internals.setFormValue(val);
      }
      this.updateComplete.then(() => {
        this._setValidityFromInput();
      });
    }
    get value() {
      return this._value;
    }
    /**
     * Lowercase alias to minLength
     */
    set minlength(val) {
      this.minLength = val;
    }
    get minlength() {
      return this.minLength;
    }
    /**
     * Lowercase alias to maxLength
     */
    set maxlength(val) {
      this.maxLength = val;
    }
    get maxlength() {
      return this.maxLength;
    }
    get form() {
      return this._internals.form;
    }
    get validity() {
      return this._internals.validity;
    }
    get validationMessage() {
      return this._internals.validationMessage;
    }
    get willValidate() {
      return this._internals.willValidate;
    }
    /**
     * Check the component's validity state when built-in validation is used.
     * Built-in validation is triggered when any validation-related attribute is set. Validation-related
     * attributes are: `max, maxlength, min, minlength, pattern, required, step`.
     * See this [the MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity) for more details.
     * @returns {boolean}
     */
    checkValidity() {
      this._setValidityFromInput();
      return this._internals.checkValidity();
    }
    reportValidity() {
      this._setValidityFromInput();
      return this._internals.reportValidity();
    }
    get wrappedElement() {
      return this._inputEl;
    }
    constructor() {
      super();
      this.autocomplete = void 0;
      this.autofocus = false;
      this.defaultValue = "";
      this.disabled = false;
      this.focused = false;
      this.invalid = false;
      this.label = "";
      this.max = void 0;
      this.maxLength = void 0;
      this.min = void 0;
      this.minLength = void 0;
      this.multiple = false;
      this.name = void 0;
      this.pattern = void 0;
      this.placeholder = void 0;
      this.readonly = false;
      this.required = false;
      this.step = void 0;
      this._value = "";
      this._type = "text";
      this._internals = this.attachInternals();
    }
    connectedCallback() {
      super.connectedCallback();
      this.updateComplete.then(() => {
        this._inputEl.checkValidity();
        this._setValidityFromInput();
        this._internals.setFormValue(this._inputEl.value);
      });
    }
    attributeChangedCallback(name, old, value) {
      super.attributeChangedCallback(name, old, value);
      const validationRelatedAttributes = [
        "max",
        "maxlength",
        "min",
        "minlength",
        "pattern",
        "required",
        "step"
      ];
      if (validationRelatedAttributes.includes(name)) {
        this.updateComplete.then(() => {
          this._setValidityFromInput();
        });
      }
    }
    /** @internal */
    formResetCallback() {
      this.value = this.defaultValue;
      this.requestUpdate();
    }
    /** @internal */
    formStateRestoreCallback(state, _mode) {
      this.value = state;
    }
    _dataChanged() {
      this._value = this._inputEl.value;
      if (this.type === "file" && this._inputEl.files) {
        for (const f3 of this._inputEl.files) {
          this._internals.setFormValue(f3);
        }
      } else {
        this._internals.setFormValue(this._inputEl.value);
      }
    }
    _setValidityFromInput() {
      if (this._inputEl) {
        this._internals.setValidity(this._inputEl.validity, this._inputEl.validationMessage, this._inputEl);
      }
    }
    _onInput() {
      this._dataChanged();
      this._setValidityFromInput();
    }
    _onChange() {
      this._dataChanged();
      this._setValidityFromInput();
      this.dispatchEvent(new Event("change"));
    }
    _onFocus() {
      this.focused = true;
    }
    _onBlur() {
      this.focused = false;
    }
    _onKeyDown(ev) {
      var _a6;
      if (ev.key === "Enter" && this._internals.form) {
        (_a6 = this._internals.form) == null ? void 0 : _a6.requestSubmit();
      }
    }
    render() {
      return x`
      <div class="root">
        <slot name="content-before"></slot>
        <input
          id="input"
          type=${this.type}
          ?autofocus=${this.autofocus}
          autocomplete=${o8(this.autocomplete)}
          aria-label=${this.label}
          ?disabled=${this.disabled}
          max=${o8(this.max)}
          maxlength=${o8(this.maxLength)}
          min=${o8(this.min)}
          minlength=${o8(this.minLength)}
          ?multiple=${this.multiple}
          name=${o8(this.name)}
          pattern=${o8(this.pattern)}
          placeholder=${o8(this.placeholder)}
          ?readonly=${this.readonly}
          ?required=${this.required}
          step=${o8(this.step)}
          .value=${this._value}
          @blur=${this._onBlur}
          @change=${this._onChange}
          @focus=${this._onFocus}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
        >
        <slot name="content-after"></slot>
      </div>
    `;
    }
  };
  VscodeTextfield.styles = vscode_textfield_styles_default;
  VscodeTextfield.formAssociated = true;
  VscodeTextfield.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate36([
    n5()
  ], VscodeTextfield.prototype, "autocomplete", void 0);
  __decorate36([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextfield.prototype, "autofocus", void 0);
  __decorate36([
    n5({ attribute: "default-value" })
  ], VscodeTextfield.prototype, "defaultValue", void 0);
  __decorate36([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextfield.prototype, "disabled", void 0);
  __decorate36([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextfield.prototype, "focused", void 0);
  __decorate36([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextfield.prototype, "invalid", void 0);
  __decorate36([
    n5({ attribute: false })
  ], VscodeTextfield.prototype, "label", void 0);
  __decorate36([
    n5({ type: Number })
  ], VscodeTextfield.prototype, "max", void 0);
  __decorate36([
    n5({ type: Number })
  ], VscodeTextfield.prototype, "maxLength", void 0);
  __decorate36([
    n5({ type: Number })
  ], VscodeTextfield.prototype, "min", void 0);
  __decorate36([
    n5({ type: Number })
  ], VscodeTextfield.prototype, "minLength", void 0);
  __decorate36([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextfield.prototype, "multiple", void 0);
  __decorate36([
    n5({ reflect: true })
  ], VscodeTextfield.prototype, "name", void 0);
  __decorate36([
    n5()
  ], VscodeTextfield.prototype, "pattern", void 0);
  __decorate36([
    n5()
  ], VscodeTextfield.prototype, "placeholder", void 0);
  __decorate36([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextfield.prototype, "readonly", void 0);
  __decorate36([
    n5({ type: Boolean, reflect: true })
  ], VscodeTextfield.prototype, "required", void 0);
  __decorate36([
    n5({ type: Number })
  ], VscodeTextfield.prototype, "step", void 0);
  __decorate36([
    n5({ reflect: true })
  ], VscodeTextfield.prototype, "type", null);
  __decorate36([
    n5()
  ], VscodeTextfield.prototype, "value", null);
  __decorate36([
    e6("#input")
  ], VscodeTextfield.prototype, "_inputEl", void 0);
  __decorate36([
    r5()
  ], VscodeTextfield.prototype, "_value", void 0);
  __decorate36([
    r5()
  ], VscodeTextfield.prototype, "_type", void 0);
  VscodeTextfield = __decorate36([
    customElement("vscode-textfield")
  ], VscodeTextfield);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTextfield.js
  var VscodeTextfield3 = o({
    tagName: "vscode-textfield",
    elementClass: VscodeTextfield,
    react: import_react66.default,
    displayName: "VscodeTextfield",
    events: {
      onChange: "change",
      onInput: "input",
      onInvalid: "invalid"
    }
  });
  var VscodeTextfield_default = VscodeTextfield3;

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeToolbarButton.js
  var import_react68 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-toolbar-button/vscode-toolbar-button.styles.js
  var styles31 = [
    default_styles_default,
    i`
    :host {
      display: inline-flex;
    }

    button {
      align-items: center;
      background-color: transparent;
      border: 0;
      border-radius: 5px;
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      display: flex;
      outline-offset: -1px;
      outline-width: 1px;
      padding: 0;
      user-select: none;
    }

    button:focus-visible {
      outline-color: var(--vscode-focusBorder, #0078d4);
      outline-style: solid;
    }

    button:hover {
      background-color: var(
        --vscode-toolbar-hoverBackground,
        rgba(90, 93, 94, 0.31)
      );
      outline-style: dashed;
      outline-color: var(--vscode-toolbar-hoverOutline, transparent);
    }

    button:active {
      background-color: var(
        --vscode-toolbar-activeBackground,
        rgba(99, 102, 103, 0.31)
      );
    }

    button.checked {
      background-color: var(
        --vscode-inputOption-activeBackground,
        rgba(36, 137, 219, 0.51)
      );
      outline-color: var(--vscode-inputOption-activeBorder, #2488db);
      outline-style: solid;
      color: var(--vscode-inputOption-activeForeground, #ffffff);
    }

    button.checked vscode-icon {
      color: var(--vscode-inputOption-activeForeground, #ffffff);
    }

    vscode-icon {
      display: block;
      padding: 3px;
    }

    slot:not(.empty) {
      align-items: center;
      display: flex;
      height: 22px;
      padding: 0 5px 0 2px;
    }

    slot.textOnly:not(.empty) {
      padding: 0 5px;
    }
  `
  ];
  var vscode_toolbar_button_styles_default = styles31;

  // node_modules/@vscode-elements/elements/dist/vscode-toolbar-button/vscode-toolbar-button.js
  var __decorate37 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeToolbarButton = class VscodeToolbarButton2 extends VscElement {
    constructor() {
      super(...arguments);
      this.icon = "";
      this.label = void 0;
      this.toggleable = false;
      this.checked = false;
      this._isSlotEmpty = true;
    }
    _handleSlotChange() {
      var _a6, _b2;
      this._isSlotEmpty = !(((_b2 = (_a6 = this._assignedNodes) == null ? void 0 : _a6.length) != null ? _b2 : 0) > 0);
    }
    _handleButtonClick() {
      if (!this.toggleable) {
        return;
      }
      this.checked = !this.checked;
      this.dispatchEvent(new Event("change"));
    }
    render() {
      const checked = this.checked ? "true" : "false";
      return x`
      <button
        type="button"
        aria-label=${o8(this.label)}
        role=${o8(this.toggleable ? "switch" : void 0)}
        aria-checked=${o8(this.toggleable ? checked : void 0)}
        class=${e9({ checked: this.toggleable && this.checked })}
        @click=${this._handleButtonClick}
      >
        ${this.icon ? x`<vscode-icon name=${this.icon}></vscode-icon>` : E}
        <slot
          @slotchange=${this._handleSlotChange}
          class=${e9({ empty: this._isSlotEmpty, textOnly: !this.icon })}
        ></slot>
      </button>
    `;
    }
  };
  VscodeToolbarButton.styles = vscode_toolbar_button_styles_default;
  __decorate37([
    n5({ reflect: true })
  ], VscodeToolbarButton.prototype, "icon", void 0);
  __decorate37([
    n5()
  ], VscodeToolbarButton.prototype, "label", void 0);
  __decorate37([
    n5({ type: Boolean, reflect: true })
  ], VscodeToolbarButton.prototype, "toggleable", void 0);
  __decorate37([
    n5({ type: Boolean, reflect: true })
  ], VscodeToolbarButton.prototype, "checked", void 0);
  __decorate37([
    r5()
  ], VscodeToolbarButton.prototype, "_isSlotEmpty", void 0);
  __decorate37([
    n6()
  ], VscodeToolbarButton.prototype, "_assignedNodes", void 0);
  VscodeToolbarButton = __decorate37([
    customElement("vscode-toolbar-button")
  ], VscodeToolbarButton);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeToolbarButton.js
  var VscodeToolbarButton3 = o({
    tagName: "vscode-toolbar-button",
    elementClass: VscodeToolbarButton,
    react: import_react68.default,
    displayName: "VscodeToolbarButton",
    events: {
      onChange: "change"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeToolbarContainer.js
  var import_react70 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-toolbar-container/vscode-toolbar-container.styles.js
  var styles32 = [
    default_styles_default,
    i`
    :host {
      display: block;
    }

    div {
      gap: 4px;
      display: flex;
      align-items: center;
    }
  `
  ];
  var vscode_toolbar_container_styles_default = styles32;

  // node_modules/@vscode-elements/elements/dist/vscode-toolbar-container/vscode-toolbar-container.js
  var __decorate38 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var VscodeToolbarContainer = class VscodeToolbarContainer2 extends VscElement {
    render() {
      return x`<div><slot></slot></div>`;
    }
  };
  VscodeToolbarContainer.styles = vscode_toolbar_container_styles_default;
  VscodeToolbarContainer = __decorate38([
    customElement("vscode-toolbar-container")
  ], VscodeToolbarContainer);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeToolbarContainer.js
  var VscodeToolbarContainer3 = o({
    tagName: "vscode-toolbar-container",
    elementClass: VscodeToolbarContainer,
    react: import_react70.default,
    displayName: "VscodeToolbarContainer"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTree.js
  var import_react72 = __toESM(require_react(), 1);

  // node_modules/@lit/context/lib/context-request-event.js
  var s5 = class extends Event {
    constructor(s8, t7, e12, o9) {
      super("context-request", { bubbles: true, composed: true }), this.context = s8, this.contextTarget = t7, this.callback = e12, this.subscribe = o9 != null ? o9 : false;
    }
  };

  // node_modules/@lit/context/lib/create-context.js
  function n8(n9) {
    return n9;
  }

  // node_modules/@lit/context/lib/controllers/context-consumer.js
  var s6 = class {
    constructor(t7, s8, i7, h3) {
      var _a6;
      if (this.subscribe = false, this.provided = false, this.value = void 0, this.t = (t8, s9) => {
        this.unsubscribe && (this.unsubscribe !== s9 && (this.provided = false, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = t8, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = true, this.callback && this.callback(t8, s9)), this.unsubscribe = s9;
      }, this.host = t7, void 0 !== s8.context) {
        const t8 = s8;
        this.context = t8.context, this.callback = t8.callback, this.subscribe = (_a6 = t8.subscribe) != null ? _a6 : false;
      } else this.context = s8, this.callback = i7, this.subscribe = h3 != null ? h3 : false;
      this.host.addController(this);
    }
    hostConnected() {
      this.dispatchRequest();
    }
    hostDisconnected() {
      this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
    }
    dispatchRequest() {
      this.host.dispatchEvent(new s5(this.context, this.host, this.t, this.subscribe));
    }
  };

  // node_modules/@lit/context/lib/value-notifier.js
  var s7 = class {
    get value() {
      return this.o;
    }
    set value(s8) {
      this.setValue(s8);
    }
    setValue(s8, t7 = false) {
      const i7 = t7 || !Object.is(s8, this.o);
      this.o = s8, i7 && this.updateObservers();
    }
    constructor(s8) {
      this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
        for (const [s9, { disposer: t7 }] of this.subscriptions) s9(this.o, t7);
      }, void 0 !== s8 && (this.value = s8);
    }
    addCallback(s8, t7, i7) {
      if (!i7) return void s8(this.value);
      this.subscriptions.has(s8) || this.subscriptions.set(s8, { disposer: () => {
        this.subscriptions.delete(s8);
      }, consumerHost: t7 });
      const { disposer: h3 } = this.subscriptions.get(s8);
      s8(this.value, h3);
    }
    clearCallbacks() {
      this.subscriptions.clear();
    }
  };

  // node_modules/@lit/context/lib/controllers/context-provider.js
  var e10 = class extends Event {
    constructor(t7, s8) {
      super("context-provider", { bubbles: true, composed: true }), this.context = t7, this.contextTarget = s8;
    }
  };
  var i6 = class extends s7 {
    constructor(s8, e12, i7) {
      var _a6, _b2;
      super(void 0 !== e12.context ? e12.initialValue : i7), this.onContextRequest = (t7) => {
        var _a7;
        if (t7.context !== this.context) return;
        const s9 = (_a7 = t7.contextTarget) != null ? _a7 : t7.composedPath()[0];
        s9 !== this.host && (t7.stopPropagation(), this.addCallback(t7.callback, s9, t7.subscribe));
      }, this.onProviderRequest = (s9) => {
        var _a7;
        if (s9.context !== this.context) return;
        if (((_a7 = s9.contextTarget) != null ? _a7 : s9.composedPath()[0]) === this.host) return;
        const e13 = /* @__PURE__ */ new Set();
        for (const [s10, { consumerHost: i8 }] of this.subscriptions) e13.has(s10) || (e13.add(s10), i8.dispatchEvent(new s5(this.context, i8, s10, true)));
        s9.stopPropagation();
      }, this.host = s8, void 0 !== e12.context ? this.context = e12.context : this.context = e12, this.attachListeners(), (_b2 = (_a6 = this.host).addController) == null ? void 0 : _b2.call(_a6, this);
    }
    attachListeners() {
      this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
    }
    hostConnected() {
      this.host.dispatchEvent(new e10(this.context, this.host));
    }
  };

  // node_modules/@lit/context/lib/decorators/provide.js
  function e11({ context: e12 }) {
    return (n9, i7) => {
      const r8 = /* @__PURE__ */ new WeakMap();
      if ("object" == typeof i7) return { get() {
        return n9.get.call(this);
      }, set(t7) {
        return r8.get(this).setValue(t7), n9.set.call(this, t7);
      }, init(n10) {
        return r8.set(this, new i6(this, { context: e12, initialValue: n10 })), n10;
      } };
      {
        n9.constructor.addInitializer(((n10) => {
          r8.set(n10, new i6(n10, { context: e12 }));
        }));
        const o9 = Object.getOwnPropertyDescriptor(n9, i7);
        let s8;
        if (void 0 === o9) {
          const t7 = /* @__PURE__ */ new WeakMap();
          s8 = { get() {
            return t7.get(this);
          }, set(e13) {
            r8.get(this).setValue(e13), t7.set(this, e13);
          }, configurable: true, enumerable: true };
        } else {
          const t7 = o9.set;
          s8 = { ...o9, set(e13) {
            r8.get(this).setValue(e13), t7 == null ? void 0 : t7.call(this, e13);
          } };
        }
        return void Object.defineProperty(n9, i7, s8);
      }
    };
  }

  // node_modules/@lit/context/lib/decorators/consume.js
  function c5({ context: c6, subscribe: e12 }) {
    return (o9, n9) => {
      "object" == typeof n9 ? n9.addInitializer((function() {
        new s6(this, { context: c6, callback: (t7) => {
          o9.set.call(this, t7);
        }, subscribe: e12 });
      })) : o9.constructor.addInitializer(((o10) => {
        new s6(o10, { context: c6, callback: (t7) => {
          o10[n9] = t7;
        }, subscribe: e12 });
      }));
    };
  }

  // node_modules/@vscode-elements/elements/dist/vscode-tree/vscode-tree.styles.js
  var styles33 = [
    default_styles_default,
    i`
    :host {
      --vsc-tree-item-arrow-display: flex;
      --internal-selectionBackground: var(
        --vscode-list-inactiveSelectionBackground,
        #37373d
      );
      --internal-selectionForeground: var(--vscode-foreground, #cccccc);
      --internal-selectionIconForeground: var(
        --vscode-icon-foreground,
        #cccccc
      );
      --internal-defaultIndentGuideDisplay: none;
      --internal-highlightedIndentGuideDisplay: block;

      display: block;
    }

    :host(:hover) {
      --internal-defaultIndentGuideDisplay: block;
      --internal-highlightedIndentGuideDisplay: block;
    }

    :host(:focus-within) {
      --internal-selectionBackground: var(
        --vscode-list-activeSelectionBackground,
        #04395e
      );
      --internal-selectionForeground: var(
        --vscode-list-activeSelectionForeground,
        #ffffff
      );
      --internal-selectionIconForeground: var(
        --vscode-list-activeSelectionIconForeground,
        #ffffff
      );
    }

    :host([hide-arrows]) {
      --vsc-tree-item-arrow-display: none;
    }

    :host([indent-guides='none']),
    :host([indent-guides='none']:hover) {
      --internal-defaultIndentGuideDisplay: none;
      --internal-highlightedIndentGuideDisplay: none;
    }

    :host([indent-guides='always']),
    :host([indent-guides='always']:hover) {
      --internal-defaultIndentGuideDisplay: block;
      --internal-highlightedIndentGuideDisplay: block;
    }
  `
  ];
  var vscode_tree_styles_default = styles33;

  // node_modules/@vscode-elements/elements/dist/vscode-tree/tree-context.js
  var treeContext = n8("vscode-list");
  var configContext = n8(Symbol("configContext"));

  // node_modules/@vscode-elements/elements/dist/vscode-tree/helpers.js
  var isTreeItem = (item) => item instanceof Element && item.matches("vscode-tree-item");
  var isTreeRoot = (item) => item instanceof Element && item.matches("vscode-tree");
  var initPathTrackerProps = (parentElement, items) => {
    const numChildren = items.length;
    const parentElementLevel = isTreeRoot(parentElement) ? -1 : parentElement.level;
    if ("branch" in parentElement) {
      parentElement.branch = numChildren > 0;
    }
    items.forEach((item, i7) => {
      if ("path" in parentElement) {
        item.path = [...parentElement.path, i7];
      } else {
        item.path = [i7];
      }
      item.level = parentElementLevel + 1;
      item.dataset.path = item.path.join(".");
    });
  };
  var findLastChildItem = (item) => {
    const lastItem = item.lastElementChild;
    if (!lastItem || !isTreeItem(lastItem)) {
      return item;
    }
    if (lastItem.branch && lastItem.open) {
      return findLastChildItem(lastItem);
    } else {
      return lastItem;
    }
  };
  var findClosestAncestorHasNextSibling = (item) => {
    if (!item.parentElement) {
      return null;
    }
    if (!isTreeItem(item.parentElement)) {
      return null;
    }
    const nextSiblingOfParent = findNextTreeItemElementSibling(item.parentElement);
    if (nextSiblingOfParent) {
      return nextSiblingOfParent;
    } else {
      return findClosestAncestorHasNextSibling(item.parentElement);
    }
  };
  var findNextTreeItemElementSibling = (item) => {
    let nextSibling = item.nextElementSibling;
    while (nextSibling && !isTreeItem(nextSibling)) {
      nextSibling = nextSibling.nextElementSibling;
    }
    return nextSibling;
  };
  var findNextItem = (item) => {
    const { parentElement } = item;
    if (!parentElement || !isTreeItem(item)) {
      return null;
    }
    let nextItem;
    if (item.branch && item.open) {
      const firstChildItem = item.querySelector("vscode-tree-item");
      if (!firstChildItem) {
        nextItem = findNextTreeItemElementSibling(item);
        if (!nextItem) {
          nextItem = findClosestAncestorHasNextSibling(item);
        }
      } else {
        nextItem = firstChildItem;
      }
    } else {
      nextItem = findNextTreeItemElementSibling(item);
      if (!nextItem) {
        nextItem = findClosestAncestorHasNextSibling(item);
      }
    }
    if (!nextItem) {
      return item;
    } else {
      return nextItem;
    }
  };
  var findPrevItem = (item) => {
    const { parentElement } = item;
    if (!parentElement || !isTreeItem(item)) {
      return null;
    }
    let prevSibling = item.previousElementSibling;
    while (prevSibling && !isTreeItem(prevSibling)) {
      prevSibling = prevSibling.previousElementSibling;
    }
    if (!prevSibling) {
      if (isTreeItem(parentElement)) {
        return parentElement;
      }
    }
    if (prevSibling && prevSibling.branch && prevSibling.open) {
      const lastChild = findLastChildItem(prevSibling);
      return lastChild;
    }
    return prevSibling;
  };
  function findParentItem(childItem) {
    if (!childItem.parentElement) {
      return null;
    }
    if (!isTreeItem(childItem.parentElement)) {
      return null;
    }
    return childItem.parentElement;
  }

  // node_modules/@vscode-elements/elements/dist/vscode-tree/vscode-tree.js
  var __decorate39 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var ExpandMode = {
    singleClick: "singleClick",
    doubleClick: "doubleClick"
  };
  var IndentGuides = {
    none: "none",
    onHover: "onHover",
    always: "always"
  };
  var listenedKeys = [
    " ",
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
    "Enter",
    "Escape",
    "Shift"
  ];
  var VscodeTree = class VscodeTree2 extends VscElement {
    //#endregion
    //#region lifecycle methods
    constructor() {
      super();
      this.expandMode = "singleClick";
      this.hideArrows = false;
      this.indent = 8;
      this.indentGuides = "onHover";
      this.multiSelect = false;
      this._treeContextState = {
        isShiftPressed: false,
        activeItem: null,
        selectedItems: /* @__PURE__ */ new Set(),
        allItems: null,
        itemListUpToDate: false,
        focusedItem: null,
        prevFocusedItem: null,
        hasBranchItem: false,
        rootElement: this,
        highlightedItems: /* @__PURE__ */ new Set(),
        highlightIndentGuides: () => {
          this._highlightIndentGuides();
        },
        emitSelectEvent: () => {
          this._emitSelectEvent();
        }
      };
      this._configContext = {
        hideArrows: this.hideArrows,
        expandMode: this.expandMode,
        indent: this.indent,
        indentGuides: this.indentGuides,
        multiSelect: this.multiSelect
      };
      this._handleComponentKeyDown = (ev) => {
        const key = ev.key;
        if (listenedKeys.includes(key)) {
          ev.stopPropagation();
          ev.preventDefault();
        }
        switch (key) {
          case " ":
          case "Enter":
            this._handleEnterPress();
            break;
          case "ArrowDown":
            this._handleArrowDownPress();
            break;
          case "ArrowLeft":
            this._handleArrowLeftPress(ev);
            break;
          case "ArrowRight":
            this._handleArrowRightPress();
            break;
          case "ArrowUp":
            this._handleArrowUpPress();
            break;
          case "Shift":
            this._handleShiftPress();
            break;
          default:
        }
      };
      this._handleComponentKeyUp = (ev) => {
        if (ev.key === "Shift") {
          this._treeContextState.isShiftPressed = false;
        }
      };
      this._handleSlotChange = () => {
        this._treeContextState.itemListUpToDate = false;
        initPathTrackerProps(this, this._assignedTreeItems);
        this.updateComplete.then(() => {
          if (this._treeContextState.activeItem === null) {
            const firstChild = this.querySelector(":scope > vscode-tree-item");
            if (firstChild) {
              firstChild.active = true;
            }
          }
        });
      };
      this.addEventListener("keyup", this._handleComponentKeyUp);
      this.addEventListener("keydown", this._handleComponentKeyDown);
    }
    connectedCallback() {
      super.connectedCallback();
      this.role = "tree";
    }
    willUpdate(changedProperties) {
      this._updateConfigContext(changedProperties);
      if (changedProperties.has("multiSelect")) {
        this.ariaMultiSelectable = this.multiSelect ? "true" : "false";
      }
    }
    //#endregion
    //#region public methods
    /**
     * Expands all folders.
     */
    expandAll() {
      const children = this.querySelectorAll("vscode-tree-item");
      children.forEach((item) => {
        if (item.branch) {
          item.open = true;
        }
      });
    }
    /**
     * Collapses all folders.
     */
    collapseAll() {
      const children = this.querySelectorAll("vscode-tree-item");
      children.forEach((item) => {
        if (item.branch) {
          item.open = false;
        }
      });
    }
    /**
     * @internal
     * Updates `hasBranchItem` property in the context state in order to removing
     * extra padding before the leaf elements, if it is required.
     */
    updateHasBranchItemFlag() {
      const hasBranchItem = this._assignedTreeItems.some((li) => li.branch);
      this._treeContextState = { ...this._treeContextState, hasBranchItem };
    }
    //#endregion
    //#region private methods
    _emitSelectEvent() {
      const ev = new CustomEvent("vsc-tree-select", {
        detail: Array.from(this._treeContextState.selectedItems)
      });
      this.dispatchEvent(ev);
    }
    _highlightIndentGuideOfItem(item) {
      var _a6, _b2;
      if (item.branch && item.open) {
        item.highlightedGuides = true;
        (_a6 = this._treeContextState.highlightedItems) == null ? void 0 : _a6.add(item);
      } else {
        const parent = findParentItem(item);
        if (parent) {
          parent.highlightedGuides = true;
          (_b2 = this._treeContextState.highlightedItems) == null ? void 0 : _b2.add(parent);
        }
      }
    }
    _highlightIndentGuides() {
      var _a6, _b2;
      if (this.indentGuides === IndentGuides.none) {
        return;
      }
      (_a6 = this._treeContextState.highlightedItems) == null ? void 0 : _a6.forEach((i7) => i7.highlightedGuides = false);
      (_b2 = this._treeContextState.highlightedItems) == null ? void 0 : _b2.clear();
      if (this._treeContextState.activeItem) {
        this._highlightIndentGuideOfItem(this._treeContextState.activeItem);
      }
      this._treeContextState.selectedItems.forEach((item) => {
        this._highlightIndentGuideOfItem(item);
      });
    }
    _updateConfigContext(changedProperties) {
      const { hideArrows, expandMode, indent, indentGuides, multiSelect } = this;
      if (changedProperties.has("hideArrows")) {
        this._configContext = { ...this._configContext, hideArrows };
      }
      if (changedProperties.has("expandMode")) {
        this._configContext = { ...this._configContext, expandMode };
      }
      if (changedProperties.has("indent")) {
        this._configContext = { ...this._configContext, indent };
      }
      if (changedProperties.has("indentGuides")) {
        this._configContext = { ...this._configContext, indentGuides };
      }
      if (changedProperties.has("multiSelect")) {
        this._configContext = { ...this._configContext, multiSelect };
      }
    }
    _focusItem(item) {
      item.active = true;
      item.updateComplete.then(() => {
        item.focus();
        this._highlightIndentGuides();
      });
    }
    _focusPrevItem() {
      if (this._treeContextState.focusedItem) {
        const item = findPrevItem(this._treeContextState.focusedItem);
        if (item) {
          this._focusItem(item);
          if (this._treeContextState.isShiftPressed && this.multiSelect) {
            item.selected = !item.selected;
            this._emitSelectEvent();
          }
        }
      }
    }
    _focusNextItem() {
      if (this._treeContextState.focusedItem) {
        const item = findNextItem(this._treeContextState.focusedItem);
        if (item) {
          this._focusItem(item);
          if (this._treeContextState.isShiftPressed && this.multiSelect) {
            item.selected = !item.selected;
            this._emitSelectEvent();
          }
        }
      }
    }
    //#endregion
    //#region event handlers
    _handleArrowRightPress() {
      if (!this._treeContextState.focusedItem) {
        return;
      }
      const { focusedItem } = this._treeContextState;
      if (focusedItem.branch) {
        if (focusedItem.open) {
          this._focusNextItem();
        } else {
          focusedItem.open = true;
        }
      }
    }
    _handleArrowLeftPress(ev) {
      if (ev.ctrlKey) {
        this.collapseAll();
        return;
      }
      if (!this._treeContextState.focusedItem) {
        return;
      }
      const { focusedItem } = this._treeContextState;
      const parent = findParentItem(focusedItem);
      if (!focusedItem.branch) {
        if (parent && parent.branch) {
          this._focusItem(parent);
        }
      } else {
        if (focusedItem.open) {
          focusedItem.open = false;
        } else {
          if (parent && parent.branch) {
            this._focusItem(parent);
          }
        }
      }
    }
    _handleArrowDownPress() {
      if (this._treeContextState.focusedItem) {
        this._focusNextItem();
      } else {
        this._focusItem(this._assignedTreeItems[0]);
      }
    }
    _handleArrowUpPress() {
      if (this._treeContextState.focusedItem) {
        this._focusPrevItem();
      } else {
        this._focusItem(this._assignedTreeItems[0]);
      }
    }
    _handleEnterPress() {
      const { focusedItem } = this._treeContextState;
      if (focusedItem) {
        this._treeContextState.selectedItems.forEach((li) => li.selected = false);
        this._treeContextState.selectedItems.clear();
        this._highlightIndentGuides();
        focusedItem.selected = true;
        this._emitSelectEvent();
        if (focusedItem.branch) {
          focusedItem.open = !focusedItem.open;
        }
      }
    }
    _handleShiftPress() {
      this._treeContextState.isShiftPressed = true;
    }
    //#endregion
    render() {
      return x`<div>
      <slot @slotchange=${this._handleSlotChange}></slot>
    </div>`;
    }
  };
  VscodeTree.styles = vscode_tree_styles_default;
  __decorate39([
    n5({ type: String, attribute: "expand-mode" })
  ], VscodeTree.prototype, "expandMode", void 0);
  __decorate39([
    n5({ type: Boolean, reflect: true, attribute: "hide-arrows" })
  ], VscodeTree.prototype, "hideArrows", void 0);
  __decorate39([
    n5({ type: Number, reflect: true })
  ], VscodeTree.prototype, "indent", void 0);
  __decorate39([
    n5({
      type: String,
      attribute: "indent-guides",
      useDefault: true,
      reflect: true
    })
  ], VscodeTree.prototype, "indentGuides", void 0);
  __decorate39([
    n5({ type: Boolean, reflect: true, attribute: "multi-select" })
  ], VscodeTree.prototype, "multiSelect", void 0);
  __decorate39([
    e11({ context: treeContext })
  ], VscodeTree.prototype, "_treeContextState", void 0);
  __decorate39([
    e11({ context: configContext })
  ], VscodeTree.prototype, "_configContext", void 0);
  __decorate39([
    o7({ selector: "vscode-tree-item" })
  ], VscodeTree.prototype, "_assignedTreeItems", void 0);
  VscodeTree = __decorate39([
    customElement("vscode-tree")
  ], VscodeTree);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTree.js
  var VscodeTree3 = o({
    tagName: "vscode-tree",
    elementClass: VscodeTree,
    react: import_react72.default,
    displayName: "VscodeTree",
    events: {
      onVscTreeSelect: "vsc-tree-select"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTreeItem.js
  var import_react74 = __toESM(require_react(), 1);

  // node_modules/@vscode-elements/elements/dist/vscode-tree-item/vscode-tree-item.styles.js
  var styles34 = [
    default_styles_default,
    i`
    :host {
      --hover-outline-color: transparent;
      --hover-outline-style: solid;
      --hover-outline-width: 0;

      --selected-outline-color: transparent;
      --selected-outline-style: solid;
      --selected-outline-width: 0;

      cursor: pointer;
      display: block;
      user-select: none;
    }

    ::slotted(vscode-icon) {
      display: block;
    }

    .root {
      display: block;
    }

    .wrapper {
      align-items: flex-start;
      color: var(--vscode-foreground, #cccccc);
      display: flex;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      outline-offset: -1px;
      padding-right: 12px;
    }

    .wrapper:hover {
      background-color: var(--vscode-list-hoverBackground, #2a2d2e);
      color: var(
        --vscode-list-hoverForeground,
        var(--vscode-foreground, #cccccc)
      );
    }

    :host([selected]) .wrapper {
      color: var(--internal-selectionForeground);
      background-color: var(--internal-selectionBackground);
    }

    :host([selected]) ::slotted(vscode-icon) {
      color: var(--internal-selectionForeground);
    }

    :host(:focus) {
      outline: none;
    }

    :host(:focus) .wrapper.active {
      outline-color: var(
        --vscode-list-focusAndSelectionOutline,
        var(--vscode-list-focusOutline, #0078d4)
      );
      outline-style: solid;
      outline-width: 1px;
    }

    .arrow-container {
      align-items: center;
      display: var(--vsc-tree-item-arrow-display);
      height: 22px;
      justify-content: center;
      padding-left: 8px;
      padding-right: 6px;
      width: 16px;
    }

    .arrow-container svg {
      display: block;
      fill: var(--vscode-icon-foreground, #cccccc);
    }

    .arrow-container.icon-rotated svg {
      transform: rotate(90deg);
    }

    :host([selected]) .arrow-container svg {
      fill: var(--internal-selectionIconForeground);
    }

    .icon-container {
      align-items: center;
      display: flex;
      margin-bottom: 3px;
      margin-top: 3px;
      overflow: hidden;
    }

    .icon-container slot {
      display: block;
    }

    .icon-container.has-icon {
      height: 16px;
      margin-right: 6px;
      width: 16px;
    }

    .children {
      position: relative;
    }

    .children.guide:before {
      background-color: var(
        --vscode-tree-inactiveIndentGuidesStroke,
        rgba(88, 88, 88, 0.4)
      );
      content: '';
      display: none;
      height: 100%;
      left: var(--indentation-guide-left);
      pointer-events: none;
      position: absolute;
      width: 1px;
      z-index: 1;
    }

    .children.guide.default-guide:before {
      display: var(--internal-defaultIndentGuideDisplay);
    }

    .children.guide.highlighted-guide:before {
      display: var(--internal-highlightedIndentGuideDisplay);
      background-color: var(--vscode-tree-indentGuidesStroke, #585858);
    }

    .content {
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host([branch]) ::slotted(vscode-tree-item) {
      display: none;
    }

    :host([branch][open]) ::slotted(vscode-tree-item) {
      display: block;
    }
  `
  ];
  var vscode_tree_item_styles_default = styles34;

  // node_modules/@vscode-elements/elements/dist/vscode-tree-item/vscode-tree-item.js
  var __decorate40 = function(decorators, target, key, desc) {
    var c6 = arguments.length, r8 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i7 = decorators.length - 1; i7 >= 0; i7--) if (d3 = decorators[i7]) r8 = (c6 < 3 ? d3(r8) : c6 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c6 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  };
  var BASE_INDENT = 3;
  var ARROW_CONTAINER_WIDTH = 30;
  var arrowIcon = x`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
  />
</svg>`;
  function getParentItem(childItem) {
    if (!childItem.parentElement) {
      return null;
    }
    if (!(childItem.parentElement instanceof VscodeTreeItem)) {
      return null;
    }
    return childItem.parentElement;
  }
  var VscodeTreeItem = class VscodeTreeItem2 extends VscElement {
    set selected(selected) {
      this._selected = selected;
      this._treeContextState.selectedItems.add(this);
      this.ariaSelected = selected ? "true" : "false";
    }
    get selected() {
      return this._selected;
    }
    set path(newPath) {
      this._path = newPath;
    }
    get path() {
      return this._path;
    }
    //#endregion
    //#region lifecycle methods
    constructor() {
      super();
      this.active = false;
      this.branch = false;
      this.hasActiveItem = false;
      this.hasSelectedItem = false;
      this.highlightedGuides = false;
      this.open = false;
      this.level = 0;
      this._selected = false;
      this._path = [];
      this._hasBranchIcon = false;
      this._hasBranchOpenedIcon = false;
      this._hasLeafIcon = false;
      this._treeContextState = {
        isShiftPressed: false,
        selectedItems: /* @__PURE__ */ new Set(),
        allItems: null,
        itemListUpToDate: false,
        focusedItem: null,
        prevFocusedItem: null,
        hasBranchItem: false,
        rootElement: null,
        activeItem: null
      };
      this._handleMainSlotChange = () => {
        this._mainSlotChange();
        this._treeContextState.itemListUpToDate = false;
      };
      this._handleComponentFocus = () => {
        if (this._treeContextState.focusedItem && this._treeContextState.focusedItem !== this) {
          if (!this._treeContextState.isShiftPressed) {
            this._treeContextState.prevFocusedItem = this._treeContextState.focusedItem;
          }
          this._treeContextState.focusedItem = null;
        }
        this._treeContextState.focusedItem = this;
      };
      this._internals = this.attachInternals();
      this.addEventListener("focus", this._handleComponentFocus);
    }
    connectedCallback() {
      super.connectedCallback();
      this._mainSlotChange();
      this.role = "treeitem";
      this.ariaDisabled = "false";
    }
    willUpdate(changedProperties) {
      if (changedProperties.has("active")) {
        this._toggleActiveState();
      }
      if (changedProperties.has("open") || changedProperties.has("branch")) {
        this._setAriaExpanded();
      }
    }
    //#endregion
    //#region private methods
    _setAriaExpanded() {
      if (!this.branch) {
        this.ariaExpanded = null;
      } else {
        this.ariaExpanded = this.open ? "true" : "false";
      }
    }
    _setHasActiveItemFlagOnParent(childItem, value) {
      const parent = getParentItem(childItem);
      if (parent) {
        parent.hasActiveItem = value;
      }
    }
    _toggleActiveState() {
      if (this.active) {
        if (this._treeContextState.activeItem) {
          this._treeContextState.activeItem.active = false;
          this._setHasActiveItemFlagOnParent(this._treeContextState.activeItem, false);
        }
        this._treeContextState.activeItem = this;
        this._setHasActiveItemFlagOnParent(this, true);
        this.tabIndex = 0;
        this._internals.states.add("active");
      } else {
        if (this._treeContextState.activeItem === this) {
          this._treeContextState.activeItem = null;
          this._setHasActiveItemFlagOnParent(this, false);
        }
        this.tabIndex = -1;
        this._internals.states.delete("active");
      }
    }
    _selectItem(isCtrlDown) {
      const { selectedItems } = this._treeContextState;
      const { multiSelect } = this._configContext;
      if (multiSelect && isCtrlDown) {
        if (this.selected) {
          this.selected = false;
          selectedItems.delete(this);
        } else {
          this.selected = true;
          selectedItems.add(this);
        }
      } else {
        selectedItems.forEach((li) => li.selected = false);
        selectedItems.clear();
        this.selected = true;
        selectedItems.add(this);
      }
    }
    _selectRange() {
      var _a6, _b2;
      const prevFocused = this._treeContextState.prevFocusedItem;
      if (!prevFocused || prevFocused === this) {
        return;
      }
      if (!this._treeContextState.itemListUpToDate) {
        this._treeContextState.allItems = this._treeContextState.rootElement.querySelectorAll("vscode-tree-item");
        if (this._treeContextState.allItems) {
          this._treeContextState.allItems.forEach((li, i7) => {
            li.dataset.score = i7.toString();
          });
        }
        this._treeContextState.itemListUpToDate = true;
      }
      let from = +((_a6 = prevFocused.dataset.score) != null ? _a6 : -1);
      let to = +((_b2 = this.dataset.score) != null ? _b2 : -1);
      if (from > to) {
        [from, to] = [to, from];
      }
      this._treeContextState.selectedItems.forEach((li) => li.selected = false);
      this._treeContextState.selectedItems.clear();
      this._selectItemsAndAllVisibleDescendants(from, to);
    }
    _selectItemsAndAllVisibleDescendants(from, to) {
      let i7 = from;
      while (i7 <= to) {
        if (this._treeContextState.allItems) {
          const item = this._treeContextState.allItems[i7];
          if (item.branch && !item.open) {
            item.selected = true;
            const numChildren = item.querySelectorAll("vscode-tree-item").length;
            i7 += numChildren;
          } else if (item.branch && item.open) {
            item.selected = true;
            i7 += this._selectItemsAndAllVisibleDescendants(i7 + 1, to);
          } else {
            item.selected = true;
            i7 += 1;
          }
        }
      }
      return i7;
    }
    _mainSlotChange() {
      this._initiallyAssignedTreeItems.forEach((li) => {
        li.setAttribute("slot", "children");
      });
    }
    //#endregion
    //#region event handlers
    _handleChildrenSlotChange() {
      initPathTrackerProps(this, this._childrenTreeItems);
      if (this._treeContextState.rootElement) {
        this._treeContextState.rootElement.updateHasBranchItemFlag();
      }
    }
    _handleContentClick(ev) {
      var _a6, _b2, _c, _d;
      ev.stopPropagation();
      const isCtrlDown = ev.ctrlKey;
      const isShiftDown = ev.shiftKey;
      if (isShiftDown && this._configContext.multiSelect) {
        this._selectRange();
        (_b2 = (_a6 = this._treeContextState).emitSelectEvent) == null ? void 0 : _b2.call(_a6);
        this.updateComplete.then(() => {
          var _a7, _b3;
          (_b3 = (_a7 = this._treeContextState).highlightIndentGuides) == null ? void 0 : _b3.call(_a7);
        });
      } else {
        this._selectItem(isCtrlDown);
        (_d = (_c = this._treeContextState).emitSelectEvent) == null ? void 0 : _d.call(_c);
        this.updateComplete.then(() => {
          var _a7, _b3;
          (_b3 = (_a7 = this._treeContextState).highlightIndentGuides) == null ? void 0 : _b3.call(_a7);
        });
        if (this._configContext.expandMode === ExpandMode.singleClick) {
          if (this.branch && !(this._configContext.multiSelect && isCtrlDown)) {
            this.open = !this.open;
          }
        }
      }
      this.active = true;
      if (!isShiftDown) {
        this._treeContextState.prevFocusedItem = this;
      }
    }
    _handleDoubleClick(ev) {
      if (this._configContext.expandMode === ExpandMode.doubleClick) {
        if (this.branch && !(this._configContext.multiSelect && ev.ctrlKey)) {
          this.open = !this.open;
        }
      }
    }
    _handleIconSlotChange(ev) {
      const slot = ev.target;
      const hasContent = slot.assignedElements().length > 0;
      switch (slot.name) {
        case "icon-branch":
          this._hasBranchIcon = hasContent;
          break;
        case "icon-branch-opened":
          this._hasBranchOpenedIcon = hasContent;
          break;
        case "icon-leaf":
          this._hasLeafIcon = hasContent;
          break;
        default:
      }
    }
    //#endregion
    render() {
      const { hideArrows, indent, indentGuides } = this._configContext;
      const { hasBranchItem } = this._treeContextState;
      let indentation = BASE_INDENT + this.level * indent;
      const guideOffset = !hideArrows ? 13 : 3;
      const indentGuideX = BASE_INDENT + this.level * indent + guideOffset;
      if (!this.branch && !hideArrows && hasBranchItem) {
        indentation += ARROW_CONTAINER_WIDTH;
      }
      const hasVisibleIcon = this._hasBranchIcon && this.branch || this._hasBranchOpenedIcon && this.branch && this.open || this._hasLeafIcon && !this.branch;
      const wrapperClasses = {
        wrapper: true,
        active: this.active
      };
      const childrenClasses = {
        children: true,
        guide: indentGuides !== IndentGuides.none,
        "default-guide": indentGuides !== IndentGuides.none,
        "highlighted-guide": this.highlightedGuides
      };
      const iconContainerClasses = {
        "icon-container": true,
        "has-icon": hasVisibleIcon
      };
      return x` <div class="root">
      <div
        class=${e9(wrapperClasses)}
        @click=${this._handleContentClick}
        @dblclick=${this._handleDoubleClick}
        .style=${stylePropertyMap({ paddingLeft: `${indentation}px` })}
      >
        ${this.branch && !hideArrows ? x`<div
              class=${e9({
        "arrow-container": true,
        "icon-rotated": this.open
      })}
            >
              ${arrowIcon}
            </div>` : E}
        <div class=${e9(iconContainerClasses)}>
          ${this.branch && !this.open ? x`<slot
                name="icon-branch"
                @slotchange=${this._handleIconSlotChange}
              ></slot>` : E}
          ${this.branch && this.open ? x`<slot
                name="icon-branch-opened"
                @slotchange=${this._handleIconSlotChange}
              ></slot>` : E}
          ${!this.branch ? x`<slot
                name="icon-leaf"
                @slotchange=${this._handleIconSlotChange}
              ></slot>` : E}
        </div>
        <div class="content" part="content">
          <slot @slotchange=${this._handleMainSlotChange}></slot>
        </div>
      </div>
      <div
        class=${e9(childrenClasses)}
        .style=${stylePropertyMap({
        "--indentation-guide-left": `${indentGuideX}px`
      })}
        role="group"
        part="children"
      >
        <slot
          name="children"
          @slotchange=${this._handleChildrenSlotChange}
        ></slot>
      </div>
    </div>`;
    }
  };
  VscodeTreeItem.styles = vscode_tree_item_styles_default;
  __decorate40([
    n5({ type: Boolean })
  ], VscodeTreeItem.prototype, "active", void 0);
  __decorate40([
    n5({ type: Boolean, reflect: true })
  ], VscodeTreeItem.prototype, "branch", void 0);
  __decorate40([
    n5({ type: Boolean })
  ], VscodeTreeItem.prototype, "hasActiveItem", void 0);
  __decorate40([
    n5({ type: Boolean })
  ], VscodeTreeItem.prototype, "hasSelectedItem", void 0);
  __decorate40([
    n5({ type: Boolean })
  ], VscodeTreeItem.prototype, "highlightedGuides", void 0);
  __decorate40([
    n5({ type: Boolean, reflect: true })
  ], VscodeTreeItem.prototype, "open", void 0);
  __decorate40([
    n5({ type: Number, reflect: true })
  ], VscodeTreeItem.prototype, "level", void 0);
  __decorate40([
    n5({ type: Boolean, reflect: true })
  ], VscodeTreeItem.prototype, "selected", null);
  __decorate40([
    r5()
  ], VscodeTreeItem.prototype, "_hasBranchIcon", void 0);
  __decorate40([
    r5()
  ], VscodeTreeItem.prototype, "_hasBranchOpenedIcon", void 0);
  __decorate40([
    r5()
  ], VscodeTreeItem.prototype, "_hasLeafIcon", void 0);
  __decorate40([
    c5({ context: treeContext, subscribe: true })
  ], VscodeTreeItem.prototype, "_treeContextState", void 0);
  __decorate40([
    c5({ context: configContext, subscribe: true })
  ], VscodeTreeItem.prototype, "_configContext", void 0);
  __decorate40([
    o7({ selector: "vscode-tree-item" })
  ], VscodeTreeItem.prototype, "_initiallyAssignedTreeItems", void 0);
  __decorate40([
    o7({ selector: "vscode-tree-item", slot: "children" })
  ], VscodeTreeItem.prototype, "_childrenTreeItems", void 0);
  VscodeTreeItem = __decorate40([
    customElement("vscode-tree-item")
  ], VscodeTreeItem);

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTreeItem.js
  var VscodeTree4 = o({
    tagName: "vscode-tree-item",
    elementClass: VscodeTreeItem,
    react: import_react74.default,
    displayName: "VscodeTreeItem"
  });

  // src/webview/react/components/SettingField.tsx
  var import_react76 = __toESM(require_react());

  // src/webview/react/components/SettingItem.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var SettingItem = ({
    id,
    label,
    selected,
    hoverColor,
    selectedColor,
    helperText,
    badges,
    error,
    actions,
    onSelect,
    children
  }) => {
    const style = {
      // Allow overrides via props while falling back to theme variables
      ["--setting-hover"]: hoverColor || "var(--vscode-list-hoverBackground)",
      ["--setting-selected"]: selectedColor || "var(--vscode-list-inactiveSelectionBackground)",
      ["--setting-selected-active"]: "var(--vscode-list-activeSelectionBackground)"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        role: "listitem",
        "aria-selected": selected ? true : void 0,
        className: `setting-item-row ${selected ? "is-selected" : ""}`,
        onClick: () => onSelect == null ? void 0 : onSelect(id),
        style,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "setting-item-label", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "label-text", children: [
              label,
              badges && badges.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badges", children: badges.map((b3, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                VscodeBadge_default,
                {
                  variant: b3.variant === "counter" ? "counter" : void 0,
                  title: b3.title,
                  className: b3.variant && b3.variant !== "counter" && b3.variant !== "default" ? `badge-${b3.variant}` : void 0,
                  children: b3.text
                },
                idx
              )) })
            ] }),
            helperText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "label-help", children: helperText })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "setting-item-control", "data-control-id": id, children: [
            children,
            actions && actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "setting-item-actions", children: actions.map((a3) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              VscodeButton_default,
              {
                title: a3.title || a3.label,
                onClick: (e12) => {
                  e12.stopPropagation();
                  a3.onClick(a3.id);
                },
                disabled: a3.disabled,
                children: [
                  a3.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VscodeIcon_default, { slot: "content-before", name: a3.icon }),
                  a3.variant !== "icon" && (a3.label || a3.title)
                ]
              },
              a3.id
            )) }),
            error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "error-row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VscodeIcon_default, { name: "error" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .setting-item-row {
          display: grid;
          grid-template-columns: minmax(220px, 30%) 1fr;
          gap: 16px;
          align-items: flex-start;
          padding: 8px 6px;
          border-radius: 4px;
          cursor: default;
        }
        .setting-item-row:hover { background: var(--setting-hover); }
        .setting-item-row.is-selected { background: var(--setting-selected); box-shadow: inset 0 0 0 1px var(--vscode-editorWidget-border, var(--vscode-editorWidget.border)); }
        .setting-item-label { display:flex; flex-direction:column; gap:4px; }
        .setting-item-label .label-text { font-weight:500; display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
        .setting-item-label .label-help { font-size:12px; opacity:0.7; }
        .setting-item-label .badges { display:inline-flex; gap:4px; }
        .setting-item-control { display:flex; align-items:center; gap:8px; }
        .setting-item-actions { display:flex; gap:6px; margin-left:8px; }
        .error-row { display:flex; align-items:center; gap:4px; color: var(--vscode-errorForeground); font-size:11px; }

        /* Badge variants using subtle filled styles (no border box) */
        .badge-info { color: var(--vscode-editorInfo-foreground, var(--vscode-editorInfo.foreground)); }
        .badge-warning { color: var(--vscode-editorWarning-foreground, var(--vscode-editorWarning.foreground)); }
        .badge-error { color: var(--vscode-editorError-foreground, var(--vscode-editorError.foreground)); }
        .badge-success { color: var(--vscode-charts-green, var(--vscode-charts.green)); }
        .badge-info::part(control) { background: color-mix(in srgb, currentColor 15%, transparent); border: none; }
        .badge-warning::part(control) { background: color-mix(in srgb, currentColor 15%, transparent); border: none; }
        .badge-error::part(control) { background: color-mix(in srgb, currentColor 15%, transparent); border: none; }
        .badge-success::part(control) { background: color-mix(in srgb, currentColor 15%, transparent); border: none; }
      ` })
        ]
      }
    );
  };
  var SettingItem_default = SettingItem;

  // src/webview/react/components/SettingField.tsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  var SettingField = ({
    meta,
    form,
    selectedId,
    reveal,
    onSelect,
    updateValue,
    focusControl,
    setReveal
  }) => {
    var _a6;
    const state = form[meta.id];
    const err = state == null ? void 0 : state.error;
    const invalid = !!err && (state == null ? void 0 : state.touched);
    const requiredIndicator = meta.required ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "req-indicator", "aria-hidden": "true", children: "*" }) : null;
    const description = meta.description;
    const common = {
      placeholder: meta.placeholder || "",
      value: state == null ? void 0 : state.value,
      onInput: (e12) => updateValue(meta.id, e12.target.value)
    };
    const selectElRef = (0, import_react76.useRef)(null);
    (0, import_react76.useEffect)(() => {
      const el = selectElRef.current;
      if (el) {
        const handleChange = (e12) => updateValue(meta.id, e12.target.value);
        el.addEventListener("change", handleChange);
        el.addEventListener("vsc-change", handleChange);
        return () => {
          el.removeEventListener("change", handleChange);
          el.removeEventListener("vsc-change", handleChange);
        };
      }
    }, [meta.id, updateValue]);
    const selectElement = (() => {
      const currentValue = state == null ? void 0 : state.value;
      const options = meta.options || [];
      const hasCustomValue = currentValue && !options.includes(currentValue);
      const displayOptions = hasCustomValue ? [...options, currentValue] : options;
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "vscode-single-select",
        {
          value: currentValue,
          combobox: meta.allowCustom || void 0,
          creatable: meta.allowCustom || void 0,
          ref: selectElRef,
          children: displayOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("vscode-option", { value: opt, children: opt }, opt))
        }
      );
    })();
    switch (meta.type) {
      case "boolean":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SettingItem_default,
          {
            id: meta.id,
            label: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "setting-label-text", children: [
              meta.label,
              " ",
              requiredIndicator
            ] }),
            helperText: !invalid ? description : void 0,
            badges: meta.badges,
            selected: selectedId === meta.id,
            hoverColor: "var(--vscode-list-hoverBackground)",
            selectedColor: "var(--vscode-list-inactiveSelectionBackground)",
            error: invalid ? err : void 0,
            onSelect: () => {
              onSelect(meta.id);
              focusControl(meta.id);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VscodeCheckbox_default, { checked: !!(state == null ? void 0 : state.value), onInput: (e12) => updateValue(meta.id, !!e12.target.checked), onChange: (e12) => updateValue(meta.id, !!e12.target.checked) })
          },
          meta.id
        );
      case "radio":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SettingItem_default,
          {
            id: meta.id,
            label: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "setting-label-text", children: [
              meta.label,
              " ",
              requiredIndicator
            ] }),
            helperText: !invalid ? description : void 0,
            badges: meta.badges,
            selected: selectedId === meta.id,
            hoverColor: "var(--vscode-list-hoverBackground)",
            selectedColor: "var(--vscode-list-inactiveSelectionBackground)",
            error: invalid ? err : void 0,
            onSelect: () => {
              onSelect(meta.id);
              focusControl(meta.id);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", gap: "16px", paddingTop: 4 }, children: (_a6 = meta.options) == null ? void 0 : _a6.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { style: { display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "input",
                {
                  type: "radio",
                  name: meta.id,
                  value: opt,
                  checked: (state == null ? void 0 : state.value) === opt,
                  onChange: (e12) => updateValue(meta.id, e12.target.value)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { textTransform: "capitalize" }, children: opt })
            ] }, opt)) })
          },
          meta.id
        );
      case "multiline":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SettingItem_default,
          {
            id: meta.id,
            label: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "setting-label-text", children: [
              meta.label,
              " ",
              requiredIndicator
            ] }),
            helperText: !invalid ? description : void 0,
            badges: meta.badges,
            selected: selectedId === meta.id,
            hoverColor: "var(--vscode-list-hoverBackground)",
            selectedColor: "var(--vscode-list-inactiveSelectionBackground)",
            error: invalid ? err : void 0,
            onSelect: () => {
              onSelect(meta.id);
              focusControl(meta.id);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VscodeTextarea_default, { rows: 4, ...common })
          },
          meta.id
        );
      case "password":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SettingItem_default,
          {
            id: meta.id,
            label: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "setting-label-text", children: [
              meta.label,
              " ",
              requiredIndicator
            ] }),
            helperText: !invalid ? description : void 0,
            badges: meta.badges,
            selected: selectedId === meta.id,
            hoverColor: "var(--vscode-list-hoverBackground)",
            selectedColor: "var(--vscode-list-inactiveSelectionBackground)",
            error: invalid ? err : void 0,
            onSelect: () => {
              onSelect(meta.id);
              focusControl(meta.id);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              VscodeTextfield_default,
              {
                type: reveal[meta.id] ? "text" : "password",
                ...common,
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  VscodeIcon_default,
                  {
                    slot: "content-after",
                    name: reveal[meta.id] ? "eye-closed" : "eye",
                    "action-icon": true,
                    title: reveal[meta.id] ? "Hide value" : "Show value",
                    onClick: (e12) => {
                      e12.stopPropagation();
                      setReveal((r8) => ({ ...r8, [meta.id]: !r8[meta.id] }));
                    }
                  }
                )
              }
            )
          },
          meta.id
        );
      case "number":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SettingItem_default,
          {
            id: meta.id,
            label: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "setting-label-text", children: [
              meta.label,
              " ",
              requiredIndicator
            ] }),
            helperText: !invalid ? description : void 0,
            badges: meta.badges,
            selected: selectedId === meta.id,
            hoverColor: "var(--vscode-list-hoverBackground)",
            selectedColor: "var(--vscode-list-inactiveSelectionBackground)",
            error: invalid ? err : void 0,
            onSelect: () => {
              onSelect(meta.id);
              focusControl(meta.id);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VscodeTextfield_default, { type: "number", ...common })
          },
          meta.id
        );
      case "select":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SettingItem_default,
          {
            id: meta.id,
            label: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "setting-label-text", children: [
              meta.label,
              " ",
              requiredIndicator
            ] }),
            helperText: !invalid ? description : void 0,
            badges: meta.badges,
            selected: selectedId === meta.id,
            hoverColor: "var(--vscode-list-hoverBackground)",
            selectedColor: "var(--vscode-list-inactiveSelectionBackground)",
            error: invalid ? err : void 0,
            onSelect: () => {
              onSelect(meta.id);
              focusControl(meta.id);
            },
            children: selectElement
          },
          meta.id
        );
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SettingItem_default,
          {
            id: meta.id,
            label: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "setting-label-text", children: [
              meta.label,
              " ",
              requiredIndicator
            ] }),
            helperText: !invalid ? description : void 0,
            badges: meta.badges,
            selected: selectedId === meta.id,
            hoverColor: "var(--vscode-list-hoverBackground)",
            selectedColor: "var(--vscode-list-inactiveSelectionBackground)",
            error: invalid ? err : void 0,
            onSelect: () => {
              onSelect(meta.id);
              focusControl(meta.id);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VscodeTextfield_default, { ...common })
          },
          meta.id
        );
    }
  };
  var SettingField_default = SettingField;

  // src/webview/react/components/SettingsGroup.tsx
  var import_jsx_runtime3 = __toESM(require_jsx_runtime());
  var SettingsGroup = ({
    group,
    settings,
    isLast,
    form,
    selectedId,
    reveal,
    onSelect,
    updateValue,
    focusControl,
    setReveal
  }) => {
    if (settings.length === 0) {
      return null;
    }
    const onKeyDown = (e12) => {
      const ids = settings.map((s8) => s8.id);
      if (!ids.length) return;
      let idxSel = selectedId ? ids.indexOf(selectedId) : -1;
      if (idxSel === -1) idxSel = 0;
      if (e12.key === "ArrowDown") {
        e12.preventDefault();
        const next = Math.min(idxSel + 1, ids.length - 1);
        onSelect(ids[next]);
      } else if (e12.key === "ArrowUp") {
        e12.preventDefault();
        const prev = Math.max(idxSel - 1, 0);
        onSelect(ids[prev]);
      } else if (e12.key === "Enter" || e12.key === " ") {
        e12.preventDefault();
        if (selectedId && ids.includes(selectedId)) focusControl(selectedId);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "settings-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("h2", { className: "settings-subheading", children: [
        group.icon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(VscodeIcon_default, { name: group.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: group.title })
      ] }),
      group.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "section-description", children: group.description }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "settings-list", role: "list", tabIndex: 0, onKeyDown, children: settings.map((meta) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        SettingField_default,
        {
          meta,
          form,
          selectedId,
          reveal,
          onSelect,
          updateValue,
          focusControl,
          setReveal
        },
        meta.id
      )) }),
      !isLast && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(VscodeDivider_default, {})
    ] });
  };
  var SettingsGroup_default = SettingsGroup;

  // src/webview/react/pages/EnvironmentEditor.tsx
  var import_jsx_runtime4 = __toESM(require_jsx_runtime());
  var GROUPS = [
    { id: "connection", title: "Connection", icon: "plug", description: "Base connection details", order: 1 },
    { id: "auth", title: "Authentication", icon: "lock", description: "Credentials & authentication mode", order: 2 },
    { id: "behavior", title: "Behavior", icon: "gear", description: "Operational preferences and client behavior", order: 3 },
    { id: "advanced", title: "Advanced", icon: "server-process", description: "Less frequently adjusted / advanced options", order: 4 }
  ];
  var SETTINGS = [
    // Connection
    { id: "envName", label: "Environment Name", group: "connection", required: true, type: "string", placeholder: "Production, Dev...", description: "Friendly display name for this environment." },
    {
      id: "hostname",
      label: "Hostname / Base URL",
      group: "connection",
      required: true,
      type: "string",
      placeholder: "https://mymaximo.example.com",
      description: "The base URL or host where Maximo is reachable. Include protocol if using a full URL.",
      validate: (v3) => !v3 ? "Hostname is required" : void 0
    },
    { id: "port", label: "Port", group: "connection", type: "number", placeholder: "443", defaultValue: 443, description: "Port to connect to the Maximo server (usually 443 for HTTPS)." },
    { id: "httpProtocol", label: "HTTP Protocol", group: "connection", type: "select", placeholder: "https", defaultValue: "https", options: ["http", "https"], description: "Choose HTTPS for secure connections when supported." },
    { id: "scope", label: "Scope", group: "connection", type: "radio", defaultValue: "global", options: ["global", "workspace"], description: "Whether this environment is stored globally or only for this workspace." },
    // Auth
    { id: "authType", label: "Authentication Type", group: "auth", order: 1, type: "select", defaultValue: "internal", options: ["apikey", "internal", "ldap"], description: "Select how to authenticate with Maximo (API key, internal, or LDAP). Username/Password fields appear for internal/LDAP; API Key appears for apikey." },
    { id: "apikey", label: "API Key", group: "auth", order: 2, type: "password", placeholder: "your-api-key", description: "Required if using API key authentication." },
    { id: "username", label: "Username", group: "auth", order: 3, type: "string", placeholder: "maxadmin", description: "Username for internal/LDAP authentication." },
    { id: "password", label: "Password", group: "auth", order: 4, type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022", description: "Password for internal/LDAP authentication." },
    // Behavior
    { id: "objectStructure", label: "Script Object Structure", group: "behavior", type: "select", placeholder: "MXSCRIPT", defaultValue: "MXSCRIPT", allowCustom: true, options: ["MXSCRIPT", "MXAPIAUTOSCRIPT", "MXCUSTSCR"], description: "Object Structure used for uploading/downloading scripts. You can type any value here" },
    { id: "appxmlObjectStructure", label: "App XML Object Structure", group: "behavior", type: "select", placeholder: "MXL_APPS", defaultValue: "MXL_APPS", allowCustom: true, options: ["MXL_APPS"], description: "Object Structure used for App XML operations. You can type any value here", badges: [{ text: "Upload not working", variant: "warning", title: "Upload not working yet" }] },
    { id: "conditionObjectStructure", label: "Condition Object Structure", group: "behavior", type: "select", placeholder: "MXL_CONDITION", defaultValue: "MXL_CONDITION", allowCustom: true, options: ["MXL_CONDITION"], description: "Object Structure used for Condition operations. You can type any value here" },
    { id: "logLevel", label: "Log Level", group: "behavior", type: "select", defaultValue: "INFO", options: ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"], description: "Controls the verbosity of logs produced by operations." },
    { id: "createPythonFile", label: "Create Python File for Jython Scripts", group: "behavior", type: "boolean", defaultValue: true, description: "When enabled, a Python file will be created for Jython scripts if necessary." },
    { id: "formatXmlOnDownload", label: "Format XML on Download/Compare", group: "behavior", type: "boolean", defaultValue: true, description: "Automatically format XML when downloading or comparing." },
    // Advanced
    { id: "ignoreSsl", label: "Ignore SSL Errors", group: "advanced", type: "boolean", defaultValue: true, description: "When enabled, SSL certificate errors will be ignored. Not recommended for production." },
    { id: "sslcertificate", label: "SSL Certificate (PEM)", group: "advanced", type: "multiline", placeholder: "Paste PEM certificate here", description: "Optional custom CA certificate in PEM format." }
  ];
  var sortByOrder = (arr) => [...arr].sort(
    (a3, b3) => {
      var _a6, _b2;
      return ((_a6 = a3.order) != null ? _a6 : Number.MAX_SAFE_INTEGER) - ((_b2 = b3.order) != null ? _b2 : Number.MAX_SAFE_INTEGER) || a3.id.localeCompare(b3.id);
    }
  );
  var buildInitialState = () => {
    var _a6;
    const state = {};
    for (const s8 of SETTINGS) {
      state[s8.id] = { value: (_a6 = s8.defaultValue) != null ? _a6 : s8.type === "boolean" ? false : "", touched: false };
    }
    return state;
  };
  var EnvironmentEditor = ({
    mode: mode2 = "add",
    initialValues: initialValues2,
    onSave: onSaveExternal,
    heading
  }) => {
    var _a6;
    console.log("[render] EnvironmentEditor rendering...");
    const [form, setForm] = (0, import_react77.useState)(() => buildInitialState());
    const [search, setSearch] = (0, import_react77.useState)("");
    const [showOnlyInvalid, setShowOnlyInvalid] = (0, import_react77.useState)(false);
    const [selectedId, setSelectedId] = (0, import_react77.useState)(null);
    const [saveStatus, setSaveStatus] = (0, import_react77.useState)("idle");
    const [lastError, setLastError] = (0, import_react77.useState)();
    const [verifying, setVerifying] = (0, import_react77.useState)(false);
    const [verifyResult, setVerifyResult] = (0, import_react77.useState)(null);
    const [reveal, setReveal] = (0, import_react77.useState)({});
    const validateFieldWithState = (0, import_react77.useCallback)((meta, value, snapshot) => {
      var _a7;
      const authType = ((_a7 = snapshot["authType"]) == null ? void 0 : _a7.value) || "internal";
      debugger;
      const isVisible = (id) => {
        if (id === "apikey") return authType === "apikey";
        if (id === "username" || id === "password") return authType !== "apikey";
        return true;
      };
      if (meta.id === "apikey") {
        if (authType === "apikey" && (value === void 0 || value === null || value === "")) {
          return "API Key is required";
        }
      }
      if (meta.id === "username" || meta.id === "password") {
        if (authType !== "apikey" && (value === void 0 || value === null || value === "")) {
          return `${meta.label} is required`;
        }
      }
      if (meta.validate) return meta.validate(value);
      if (meta.required && isVisible(meta.id) && (value === void 0 || value === null || value === "")) {
        return `${meta.label} is required`;
      }
      return void 0;
    }, []);
    const validateField = (0, import_react77.useCallback)((meta, value, state) => validateFieldWithState(meta, value, state != null ? state : form), [form, validateFieldWithState]);
    const invalidCount = (0, import_react77.useMemo)(() => SETTINGS.reduce((acc, s8) => {
      var _a7;
      const err = validateField(s8, (_a7 = form[s8.id]) == null ? void 0 : _a7.value);
      return acc + (err ? 1 : 0);
    }, 0), [form, validateField]);
    const filteredSettings = (0, import_react77.useMemo)(() => {
      var _a7;
      const term = search.trim().toLowerCase();
      const authType = ((_a7 = form["authType"]) == null ? void 0 : _a7.value) || "internal";
      return SETTINGS.filter((s8) => {
        var _a8;
        if (s8.id === "authType") return !showOnlyInvalid;
        if (s8.id === "apikey" && authType !== "apikey") return false;
        if ((s8.id === "username" || s8.id === "password") && authType === "apikey") return false;
        if (showOnlyInvalid && !validateField(s8, form[s8.id].value)) return false;
        if (!term) return true;
        return s8.label.toLowerCase().includes(term) || s8.id.toLowerCase().includes(term) || ((_a8 = s8.description) == null ? void 0 : _a8.toLowerCase().includes(term));
      });
    }, [search, showOnlyInvalid, form, validateField]);
    const grouped = (0, import_react77.useMemo)(() => {
      var _a7;
      const map = {};
      for (const s8 of filteredSettings) {
        (map[_a7 = s8.group] || (map[_a7] = [])).push(s8);
      }
      return map;
    }, [filteredSettings]);
    const groupsOrdered = (0, import_react77.useMemo)(() => sortByOrder(GROUPS), []);
    const updateValue = (id, value) => {
      console.log(`[updateValue] id: ${id}, value:`, value);
      setForm((f3) => {
        var _a7;
        const newFormState = { ...f3, [id]: { ...f3[id], value, touched: true } };
        const meta = SETTINGS.find((s8) => s8.id === id);
        const error = validateFieldWithState(meta, value, newFormState);
        newFormState[id].error = error;
        console.log(`[updateValue:setForm] id: ${id}, old value:`, (_a7 = f3[id]) == null ? void 0 : _a7.value, `new value:`, value);
        console.log(`[updateValue:setForm] id: ${id}, new field state:`, newFormState[id]);
        return newFormState;
      });
    };
    (0, import_react77.useEffect)(() => {
      var _a7;
      if (selectedId && filteredSettings.some((s8) => s8.id === selectedId)) return;
      const firstGroup = groupsOrdered.find((g2) => (grouped[g2.id] || []).length);
      const firstId = firstGroup ? (_a7 = grouped[firstGroup.id][0]) == null ? void 0 : _a7.id : void 0;
      setSelectedId(firstId != null ? firstId : null);
    }, [filteredSettings, grouped, groupsOrdered, selectedId]);
    const focusControl = (id) => {
      var _a7, _b2;
      const container = document.querySelector(`[data-control-id="${id}"]`);
      if (!container) return;
      const focusable = container.querySelector('input, textarea, select, button, vscode-textfield, vscode-text-area, vscode-single-select, [tabindex]:not([tabindex="-1"])');
      (_b2 = (_a7 = focusable || container).focus) == null ? void 0 : _b2.call(_a7);
    };
    (0, import_react77.useEffect)(() => {
      const valuesToUse = initialValues2 || (typeof window !== "undefined" ? window.initialValues : null);
      if (!valuesToUse) return;
      setForm((prev) => {
        const next = { ...prev };
        for (const s8 of SETTINGS) {
          if (valuesToUse[s8.id] !== void 0) {
            next[s8.id] = {
              ...next[s8.id],
              value: valuesToUse[s8.id],
              // don't mark as touched yet
              error: validateFieldWithState(s8, valuesToUse[s8.id], next)
              // Pass explicit state snapshot
            };
          }
        }
        return next;
      });
    }, [initialValues2, validateFieldWithState]);
    const collectValues = () => {
      var _a7;
      const result = {};
      for (const s8 of SETTINGS) {
        result[s8.id] = (_a7 = form[s8.id]) == null ? void 0 : _a7.value;
      }
      return result;
    };
    const onSave = async () => {
      setSaveStatus("saving");
      setLastError(void 0);
      const next = { ...form };
      let hasError = false;
      for (const s8 of SETTINGS) {
        const v3 = form[s8.id].value;
        const err = validateField(s8, v3);
        next[s8.id] = { ...next[s8.id], error: err, touched: true };
        if (err) hasError = true;
      }
      setForm(next);
      if (hasError) {
        setSaveStatus("error");
        setLastError("Please resolve validation errors before saving.");
        return;
      }
      const values = collectValues();
      if (onSaveExternal) {
        try {
          await onSaveExternal(values, mode2);
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 1200);
        } catch (e12) {
          setSaveStatus("error");
          setLastError((e12 == null ? void 0 : e12.message) || "Save failed");
        }
        return;
      }
      if (vscodeApi) {
        try {
          const payload = mapToEnvironmentPayload();
          vscodeApi.postMessage({
            type: "save",
            environment: payload
          });
          if (!("acquireVsCodeApi" in window)) {
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 1200);
          }
        } catch (e12) {
          setSaveStatus("error");
          setLastError((e12 == null ? void 0 : e12.message) || "Save failed");
        }
      } else {
        setSaveStatus("error");
        setLastError("VS Code API not available");
      }
    };
    const reset = () => {
      console.log("[reset] Resetting form...");
      const initialState = buildInitialState();
      const valuesToUse = initialValues2 || (typeof window !== "undefined" ? window.initialValues : null);
      if (valuesToUse) {
        for (const s8 of SETTINGS) {
          if (valuesToUse[s8.id] !== void 0) {
            initialState[s8.id] = {
              value: valuesToUse[s8.id],
              touched: false,
              error: validateFieldWithState(s8, valuesToUse[s8.id], initialState)
            };
          }
        }
      }
      setForm(initialState);
      setSaveStatus("idle");
      setLastError(void 0);
      setVerifyResult(null);
    };
    const mapToEnvironmentPayload = () => {
      const v3 = collectValues();
      return {
        // align with EnvironmentEditorPanel expectations
        name: v3.envName,
        hostname: v3.hostname,
        port: v3.port || (v3.httpProtocol === "https" ? 443 : 9080),
        httpProtocol: v3.httpProtocol,
        authenticationType: v3.authType,
        username: v3.username,
        password: v3.password,
        apikey: v3.apikey,
        objectStructure: v3.objectStructure,
        appxml_objectStructure: v3.appxmlObjectStructure,
        condition_objectStructure: v3.conditionObjectStructure,
        logLevel: v3.logLevel,
        createPythonFileForJythonScripts: !!v3.createPythonFile,
        ignoreSslErrors: !!v3.ignoreSsl,
        formatXmlOnDownloadAndCompare: !!v3.formatXmlOnDownload,
        scope: v3.scope,
        sslcertificate: v3.sslcertificate
      };
    };
    const [vscodeApi, setVscodeApi] = (0, import_react77.useState)(null);
    (0, import_react77.useEffect)(() => {
      if (vscodeApi) return;
      try {
        const api = typeof window !== "undefined" && window.acquireVsCodeApi ? window.acquireVsCodeApi() : null;
        if (api) {
          setVscodeApi(api);
        } else {
          const devStub = {
            postMessage: (msg) => console.log("[DEV][webview stub] postMessage ->", msg),
            setState: (_2) => {
            },
            getState: () => void 0
          };
          setVscodeApi(devStub);
          console.warn("[EnvironmentEditor] VS Code webview API not available \u2013 using dev stub. Running outside real VS Code webview?");
        }
      } catch (e12) {
        console.warn("[EnvironmentEditor] Failed to acquire VS Code API", e12);
      }
    }, [vscodeApi]);
    const cancel = () => {
      vscodeApi == null ? void 0 : vscodeApi.postMessage({ type: "cancel" });
    };
    const verify = () => {
      if (verifying) return;
      setVerifying(true);
      setVerifyResult({ success: null, message: "Verifying settings..." });
      vscodeApi == null ? void 0 : vscodeApi.postMessage({ type: "verifySettings", environment: mapToEnvironmentPayload() });
      if (vscodeApi && !("acquireVsCodeApi" in window) && !window.acquireVsCodeApi) {
        setTimeout(() => {
          setVerifying(false);
          setVerifyResult({ success: false, message: "Dev preview: verification requires running inside VS Code webview." });
        }, 400);
      }
    };
    (0, import_react77.useEffect)(() => {
      if (!vscodeApi) return;
      const handler = (event) => {
        const msg = event.data;
        if ((msg == null ? void 0 : msg.type) === "verificationResult") {
          setVerifying(false);
          setVerifyResult({ success: msg.success, message: msg.message });
        }
      };
      window.addEventListener("message", handler);
      return () => window.removeEventListener("message", handler);
    }, [vscodeApi]);
    useSyncSelectValue("authType", (_a6 = form["authType"]) == null ? void 0 : _a6.value, (val) => updateValue("authType", val));
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "env-editor-root", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { className: "page-heading", children: heading || (mode2 === "edit" ? "Edit Environment" : "Add New Environment") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "toolbar-row", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(VscodeTextfield_default, { placeholder: "Search settings", value: search, onInput: (e12) => setSearch(e12.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeIcon_default, { slot: "content-before", name: "search" }),
          !!search && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeIcon_default, { slot: "content-after", name: "close", "action-icon": true, onClick: () => setSearch("") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeCheckbox_default, { checked: showOnlyInvalid, onChange: (e12) => setShowOnlyInvalid(!!e12.target.checked), children: "Show only invalid fields" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(VscodeBadge_default, { variant: invalidCount ? "counter" : "default", children: [
          invalidCount,
          " Invalid"
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "settings-like-layout", children: groupsOrdered.filter((g2) => (grouped[g2.id] || []).length).map((group, idx) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        SettingsGroup_default,
        {
          group,
          settings: grouped[group.id] || [],
          isLast: idx === groupsOrdered.length - 1,
          form,
          selectedId,
          reveal,
          onSelect: setSelectedId,
          updateValue,
          focusControl,
          setReveal
        },
        group.id
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "action-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "left", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(VscodeButton_default, { className: "secondary-btn", onClick: cancel, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeIcon_default, { name: "close", slot: "content-before" }),
            "Cancel"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(VscodeButton_default, { className: "secondary-btn", onClick: reset, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeIcon_default, { name: "discard", slot: "content-before" }),
            "Reset"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(VscodeButton_default, { className: "secondary-btn", onClick: verify, disabled: verifying, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeIcon_default, { name: verifying ? "loading~spin" : (verifyResult == null ? void 0 : verifyResult.success) === true ? "pass-filled" : (verifyResult == null ? void 0 : verifyResult.success) === false ? "error" : "beaker", slot: "content-before" }),
            verifying ? "Verifying..." : "Verify Settings"
          ] })
        ] }),
        lastError && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "status-error", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeIcon_default, { name: "error" }),
          " ",
          lastError
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "right", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(VscodeButton_default, { onClick: onSave, disabled: saveStatus === "saving", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeIcon_default, { name: saveStatus === "saving" ? "loading~spin" : saveStatus === "saved" ? "pass-filled" : "save", slot: "content-before" }),
          saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save"
        ] }) })
      ] }),
      verifyResult && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `verify-status ${verifyResult.success === true ? "ok" : verifyResult.success === false ? "fail" : "pending"}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VscodeIcon_default, { name: verifyResult.success === true ? "pass-filled" : verifyResult.success === false ? "error" : "loading~spin" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: verifyResult.message })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("style", { children: `
        .env-editor-root { display:flex; flex-direction:column; gap:12px; font-size:13px; padding:16px 20px 28px 20px; box-sizing:border-box; }
        .page-heading { font-size:18px; font-weight:600; margin:6px 0 2px; }
        .toolbar-row { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
        .toolbar-row .left { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
        .toolbar-row .left vscode-checkbox { white-space: nowrap; }
        .status-error { color: var(--vscode-errorForeground); display:flex; align-items:center; gap:4px; font-size: 12px; }
  /* grid layout removed */
  .setting-item { display:flex; flex-direction:column; gap:4px; position:relative; }
        .setting-item.invalid .field-label { color: var(--vscode-errorForeground); }
        .field-label { font-weight:500; }
        .error-row { display:flex; align-items:center; gap:4px; color: var(--vscode-errorForeground); font-size:11px; }
        .boolean.setting-item { flex-direction:row; align-items:center; }
        .boolean.setting-item .error-row { margin-left:8px; }
        .multiline textarea { min-height:90px; }
        .toolbar-row vscode-textfield::part(root), .toolbar-row vscode-text-field::part(root) { min-width:260px; }
  /* Sections layout removed */
        .section-description { font-size:12px; opacity:0.7; }
  /* tree layout removed */
        /* --- Helpers --- */
        .form-helper { font-size:11px; opacity:0.65; }
        /* Control sizing: make inputs and dropdowns match */
        vscode-single-select { width:100%; }
        .settings-control vscode-textfield::part(control),
        .settings-control vscode-text-field::part(control),
        .settings-control vscode-single-select::part(control) {
          min-height:26px;
          height:26px;
        }
        .select.setting-item { min-width:200px; }
    /* --- Settings-like Layout --- */
    .settings-like-layout { display:flex; flex-direction:column; gap:24px; }
  .settings-section { display:flex; flex-direction:column; gap:8px; }
    .settings-subheading { font-size:14px; font-weight:600; margin:0; display:flex; align-items:center; gap: 6px; }
  .settings-list { display:flex; flex-direction:column; gap:8px; outline: none; border-radius: 4px; }
  .settings-row { display:grid; grid-template-columns: minmax(220px, 30%) 1fr; gap:16px; align-items:flex-start; padding:8px 6px; border-radius:4px; }
  .settings-row:hover { background: var(--vscode-list-hoverBackground); }
  /* Inactive selection (list not focused) */
  .settings-row.is-selected { background: var(--vscode-list-inactiveSelectionBackground); box-shadow: inset 0 0 0 1px var(--vscode-editorWidget.border); }
  .settings-row.is-selected .label-text { color: var(--vscode-list-inactiveSelectionForeground, inherit); }
  /* Active selection when the list itself is focused */
  .settings-list:focus .settings-row.is-selected { background: var(--vscode-list-activeSelectionBackground); box-shadow: inset 0 0 0 1px var(--vscode-focusBorder); }
  .settings-list:focus .settings-row.is-selected .label-text { color: var(--vscode-list-activeSelectionForeground, inherit); }
    .settings-label { display:flex; flex-direction:column; gap:4px; }
    .settings-label .label-text { font-weight:500; }
  .settings-label .setting-label-text { display:inline-flex; align-items:center; gap:4px; }
  .req-indicator { color: var(--vscode-testing-iconFailed, var(--vscode-errorForeground)); font-weight:600; margin-left:2px; }
  /* Provide tooltip for required fields via title attribute if needed */
  .req-indicator::after { content:''; }
    .settings-label .label-help { font-size:12px; opacity:0.7; }
    .settings-control { display:flex; align-items:center; }
        @media (max-width: 640px){ .settings-grid { grid-template-columns: 1fr; } }
        /* Optional: ensure icon is clickable */
        vscode-textfield [action-icon] { cursor: pointer; }
        .action-row { display:flex; justify-content:space-between; align-items:center; margin-top:16px; padding-top:12px; border-top:1px solid var(--vscode-panel-border, rgba(255,255,255,0.1)); flex-wrap:wrap; gap:12px; }
        .action-row .left, .action-row .right { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .verify-status { display:flex; align-items:center; gap:6px; font-size:12px; padding:4px 6px; border-radius:4px; background: var(--vscode-editorWidget-background); border:1px solid var(--vscode-editorWidget-border); }
        .verify-status.ok { border-color: var(--vscode-testing-iconPassed, #3fb950); }
        .verify-status.fail { border-color: var(--vscode-testing-iconFailed, var(--vscode-errorForeground)); }
        .verify-status.pending { opacity:0.85; }
        /* Secondary button styling mimic */
        .secondary-btn { --btn-bg: var(--vscode-button-secondaryBackground, var(--vscode-button-background)); background: var(--btn-bg); }
        .secondary-btn:hover { background: var(--vscode-button-secondaryHoverBackground, var(--vscode-button-hoverBackground)); }
        
      ` })
    ] });
  };

  // src/webview/react/boot/environmentEditorEntry.tsx
  var import_jsx_runtime5 = __toESM(require_jsx_runtime());
  var bootstrap = window.__ENV_EDITOR_BOOTSTRAP__ || { mode: "add", initialValues: void 0, environment: null };
  var env = bootstrap.environment;
  var mappedFromEnv = env ? {
    envName: env.name,
    hostname: env.hostname,
    port: env.port,
    httpProtocol: env.httpProtocol,
    authType: env.authenticationType,
    username: env.username,
    password: env.password,
    apikey: env.apikey,
    objectStructure: env.objectStructure,
    appxmlObjectStructure: env.appxml_objectStructure,
    conditionExpressionObjectStructure: env.condition_objectStructure,
    logLevel: env.logLevel,
    createPythonFile: env.createPythonFileForJythonScripts,
    ignoreSsl: env.ignoreSslErrors,
    formatXmlOnDownload: env.formatXmlOnDownloadAndCompare,
    scope: env.scope,
    sslcertificate: env.sslcertificate
  } : void 0;
  var initialValues = bootstrap.initialValues || window.initialValues || mappedFromEnv;
  var mode = bootstrap.mode || window.mode || "add";
  (0, import_client.createRoot)(document.getElementById("root")).render(
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      EnvironmentEditor,
      {
        mode,
        initialValues
      }
    )
  );
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@lit/react/create-component.js:
lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
@lit/context/lib/decorators/provide.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
@lit/context/lib/decorators/consume.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/when.js:
@lit/context/lib/context-request-event.js:
@lit/context/lib/create-context.js:
@lit/context/lib/controllers/context-consumer.js:
@lit/context/lib/value-notifier.js:
@lit/context/lib/controllers/context-provider.js:
@lit/context/lib/context-root.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=environmentEditor.js.map
