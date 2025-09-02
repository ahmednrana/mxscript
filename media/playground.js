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

  // node_modules/react/cjs/react.production.js
  var require_react_production = __commonJS({
    "node_modules/react/cjs/react.production.js"(exports) {
      "use strict";
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      var ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function() {
        },
        enqueueReplaceState: function() {
        },
        enqueueSetState: function() {
        }
      };
      var assign = Object.assign;
      var emptyObject = {};
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component.prototype;
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent;
      assign(pureComponentPrototype, Component.prototype);
      pureComponentPrototype.isPureReactComponent = true;
      var isArrayImpl = Array.isArray;
      var ReactSharedInternals = { H: null, A: null, T: null, S: null, V: null };
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function ReactElement(type, key, self, source, owner, props) {
        self = props.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== self ? self : null,
          props
        };
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        return ReactElement(
          oldElement.type,
          newKey,
          void 0,
          void 0,
          void 0,
          oldElement.props
        );
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      var userProvidedKeyEscapeRegex = /\/+/g;
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
      }
      function noop$1() {
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback)
          return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c6) {
            return c6;
          })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + invokeCallback
          )), array.push(callback)), 1;
        invokeCallback = 0;
        var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i7 = 0; i7 < children.length; i7++)
            nameSoFar = children[i7], type = nextNamePrefix + getElementKey(nameSoFar, i7), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i7 = getIteratorFn(children), "function" === typeof i7)
          for (children = i7.call(children), i7 = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i7++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ctor = payload._result;
          ctor = ctor();
          ctor.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status)
                payload._status = 1, payload._result = moduleObject;
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status)
                payload._status = 2, payload._result = error;
            }
          );
          -1 === payload._status && (payload._status = 0, payload._result = ctor);
        }
        if (1 === payload._status) return payload._result.default;
        throw payload._result;
      }
      var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      };
      function noop() {
      }
      exports.Children = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n9 = 0;
          mapChildren(children, function() {
            n9++;
          });
          return n9;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(size) {
          return ReactSharedInternals.H.useMemoCache(size);
        }
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = void 0;
        if (null != config)
          for (propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          for (var childArray = Array(propName), i7 = 0; i7 < propName; i7++)
            childArray[i7] = arguments[i7 + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, void 0, void 0, owner, props);
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        var propName, props = {}, key = null;
        if (null != config)
          for (propName in void 0 !== config.key && (key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) props.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), i7 = 0; i7 < childrenLength; i7++)
            childArray[i7] = arguments[i7 + 2];
          props.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === props[propName] && (props[propName] = childrenLength[propName]);
        return ReactElement(type, key, void 0, void 0, null, props);
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(render) {
        return { $$typeof: REACT_FORWARD_REF_TYPE, render };
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        return {
          $$typeof: REACT_LAZY_TYPE,
          _payload: { _status: -1, _result: ctor },
          _init: lazyInitializer
        };
      };
      exports.memo = function(type, compare) {
        return {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
        } catch (error) {
          reportGlobalError(error);
        } finally {
          ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return ReactSharedInternals.H.useCacheRefresh();
      };
      exports.use = function(usable) {
        return ReactSharedInternals.H.use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return ReactSharedInternals.H.useActionState(action, initialState, permalink);
      };
      exports.useCallback = function(callback, deps) {
        return ReactSharedInternals.H.useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        return ReactSharedInternals.H.useContext(Context);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(value, initialValue) {
        return ReactSharedInternals.H.useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, createDeps, update) {
        var dispatcher = ReactSharedInternals.H;
        if ("function" === typeof update)
          throw Error(
            "useEffect CRUD overload is not enabled in this build of React."
          );
        return dispatcher.useEffect(create, createDeps);
      };
      exports.useId = function() {
        return ReactSharedInternals.H.useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        return ReactSharedInternals.H.useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        return ReactSharedInternals.H.useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return ReactSharedInternals.H.useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return ReactSharedInternals.H.useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return ReactSharedInternals.H.useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return ReactSharedInternals.H.useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return ReactSharedInternals.H.useTransition();
      };
      exports.version = "19.1.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.js
  var require_scheduler_production = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.js"(exports) {
      "use strict";
      function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for (; 0 < index; ) {
          var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
          if (0 < compare(parent, node))
            heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
          else break a;
        }
      }
      function peek(heap) {
        return 0 === heap.length ? null : heap[0];
      }
      function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
          heap[0] = last;
          a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
            var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
            if (0 > compare(left, last))
              rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
            else if (rightIndex < length && 0 > compare(right, last))
              heap[index] = right, heap[rightIndex] = last, index = rightIndex;
            else break a;
          }
        }
        return first;
      }
      function compare(a3, b3) {
        var diff = a3.sortIndex - b3.sortIndex;
        return 0 !== diff ? diff : a3.id - b3.id;
      }
      exports.unstable_now = void 0;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        localPerformance = performance;
        exports.unstable_now = function() {
          return localPerformance.now();
        };
      } else {
        localDate = Date, initialTime = localDate.now();
        exports.unstable_now = function() {
          return localDate.now() - initialTime;
        };
      }
      var localPerformance;
      var localDate;
      var initialTime;
      var taskQueue = [];
      var timerQueue = [];
      var taskIdCounter = 1;
      var currentTask = null;
      var currentPriorityLevel = 3;
      var isPerformingWork = false;
      var isHostCallbackScheduled = false;
      var isHostTimeoutScheduled = false;
      var needsPaint = false;
      var localSetTimeout = "function" === typeof setTimeout ? setTimeout : null;
      var localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null;
      var localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
      function advanceTimers(currentTime) {
        for (var timer = peek(timerQueue); null !== timer; ) {
          if (null === timer.callback) pop(timerQueue);
          else if (timer.startTime <= currentTime)
            pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
          else break;
          timer = peek(timerQueue);
        }
      }
      function handleTimeout(currentTime) {
        isHostTimeoutScheduled = false;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled)
          if (null !== peek(taskQueue))
            isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
          else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
          }
      }
      var isMessageLoopRunning = false;
      var taskTimeoutID = -1;
      var frameInterval = 5;
      var startTime = -1;
      function shouldYieldToHost() {
        return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
      }
      function performWorkUntilDeadline() {
        needsPaint = false;
        if (isMessageLoopRunning) {
          var currentTime = exports.unstable_now();
          startTime = currentTime;
          var hasMoreWork = true;
          try {
            a: {
              isHostCallbackScheduled = false;
              isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
              isPerformingWork = true;
              var previousPriorityLevel = currentPriorityLevel;
              try {
                b: {
                  advanceTimers(currentTime);
                  for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                    var callback = currentTask.callback;
                    if ("function" === typeof callback) {
                      currentTask.callback = null;
                      currentPriorityLevel = currentTask.priorityLevel;
                      var continuationCallback = callback(
                        currentTask.expirationTime <= currentTime
                      );
                      currentTime = exports.unstable_now();
                      if ("function" === typeof continuationCallback) {
                        currentTask.callback = continuationCallback;
                        advanceTimers(currentTime);
                        hasMoreWork = true;
                        break b;
                      }
                      currentTask === peek(taskQueue) && pop(taskQueue);
                      advanceTimers(currentTime);
                    } else pop(taskQueue);
                    currentTask = peek(taskQueue);
                  }
                  if (null !== currentTask) hasMoreWork = true;
                  else {
                    var firstTimer = peek(timerQueue);
                    null !== firstTimer && requestHostTimeout(
                      handleTimeout,
                      firstTimer.startTime - currentTime
                    );
                    hasMoreWork = false;
                  }
                }
                break a;
              } finally {
                currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
              }
              hasMoreWork = void 0;
            }
          } finally {
            hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
          }
        }
      }
      var schedulePerformWorkUntilDeadline;
      if ("function" === typeof localSetImmediate)
        schedulePerformWorkUntilDeadline = function() {
          localSetImmediate(performWorkUntilDeadline);
        };
      else if ("undefined" !== typeof MessageChannel) {
        channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
          port.postMessage(null);
        };
      } else
        schedulePerformWorkUntilDeadline = function() {
          localSetTimeout(performWorkUntilDeadline, 0);
        };
      var channel;
      var port;
      function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
          callback(exports.unstable_now());
        }, ms);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(task) {
        task.callback = null;
      };
      exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
      };
      exports.unstable_next = function(eventHandler) {
        switch (currentPriorityLevel) {
          case 1:
          case 2:
          case 3:
            var priorityLevel = 3;
            break;
          default:
            priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_requestPaint = function() {
        needsPaint = true;
      };
      exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch (priorityLevel) {
          case 1:
            var timeout = -1;
            break;
          case 2:
            timeout = 250;
            break;
          case 5:
            timeout = 1073741823;
            break;
          case 4:
            timeout = 1e4;
            break;
          default:
            timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
          id: taskIdCounter++,
          callback,
          priorityLevel,
          startTime: options,
          expirationTime: timeout,
          sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
        return priorityLevel;
      };
      exports.unstable_shouldYield = shouldYieldToHost;
      exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = parentPriorityLevel;
          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
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
        module.exports = require_scheduler_production();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.js
  var require_react_dom_production = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.js"(exports) {
      "use strict";
      var React39 = require_react();
      function formatProdErrorMessage(code) {
        var url = "https://react.dev/errors/" + code;
        if (1 < arguments.length) {
          url += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var i7 = 2; i7 < arguments.length; i7++)
            url += "&args[]=" + encodeURIComponent(arguments[i7]);
        }
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function noop() {
      }
      var Internals = {
        d: {
          f: noop,
          r: function() {
            throw Error(formatProdErrorMessage(522));
          },
          D: noop,
          C: noop,
          L: noop,
          m: noop,
          X: noop,
          S: noop,
          M: noop
        },
        p: 0,
        findDOMNode: null
      };
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      function createPortal$1(children, containerInfo, implementation) {
        var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
          $$typeof: REACT_PORTAL_TYPE,
          key: null == key ? null : "" + key,
          children,
          containerInfo,
          implementation
        };
      }
      var ReactSharedInternals = React39.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      function getCrossOriginStringAs(as, input) {
        if ("font" === as) return "";
        if ("string" === typeof input)
          return "use-credentials" === input ? input : "";
      }
      exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
      exports.createPortal = function(children, container) {
        var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
          throw Error(formatProdErrorMessage(299));
        return createPortal$1(children, container, null, key);
      };
      exports.flushSync = function(fn) {
        var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
        try {
          if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
        } finally {
          ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
        }
      };
      exports.preconnect = function(href, options) {
        "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
      };
      exports.prefetchDNS = function(href) {
        "string" === typeof href && Internals.d.D(href);
      };
      exports.preinit = function(href, options) {
        if ("string" === typeof href && options && "string" === typeof options.as) {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
          "style" === as ? Internals.d.S(
            href,
            "string" === typeof options.precedence ? options.precedence : void 0,
            {
              crossOrigin,
              integrity,
              fetchPriority
            }
          ) : "script" === as && Internals.d.X(href, {
            crossOrigin,
            integrity,
            fetchPriority,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0
          });
        }
      };
      exports.preinitModule = function(href, options) {
        if ("string" === typeof href)
          if ("object" === typeof options && null !== options) {
            if (null == options.as || "script" === options.as) {
              var crossOrigin = getCrossOriginStringAs(
                options.as,
                options.crossOrigin
              );
              Internals.d.M(href, {
                crossOrigin,
                integrity: "string" === typeof options.integrity ? options.integrity : void 0,
                nonce: "string" === typeof options.nonce ? options.nonce : void 0
              });
            }
          } else null == options && Internals.d.M(href);
      };
      exports.preload = function(href, options) {
        if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
          Internals.d.L(href, as, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0,
            type: "string" === typeof options.type ? options.type : void 0,
            fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
            referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
            imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
            imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
            media: "string" === typeof options.media ? options.media : void 0
          });
        }
      };
      exports.preloadModule = function(href, options) {
        if ("string" === typeof href)
          if (options) {
            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
            Internals.d.m(href, {
              as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0
            });
          } else Internals.d.m(href);
      };
      exports.requestFormReset = function(form) {
        Internals.d.r(form);
      };
      exports.unstable_batchedUpdates = function(fn, a3) {
        return fn(a3);
      };
      exports.useFormState = function(action, initialState, permalink) {
        return ReactSharedInternals.H.useFormState(action, initialState, permalink);
      };
      exports.useFormStatus = function() {
        return ReactSharedInternals.H.useHostTransitionStatus();
      };
      exports.version = "19.1.1";
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
        module.exports = require_react_dom_production();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom-client.production.js
  var require_react_dom_client_production = __commonJS({
    "node_modules/react-dom/cjs/react-dom-client.production.js"(exports) {
      "use strict";
      var Scheduler = require_scheduler();
      var React39 = require_react();
      var ReactDOM = require_react_dom();
      function formatProdErrorMessage(code) {
        var url = "https://react.dev/errors/" + code;
        if (1 < arguments.length) {
          url += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var i7 = 2; i7 < arguments.length; i7++)
            url += "&args[]=" + encodeURIComponent(arguments[i7]);
        }
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function isValidContainer(node) {
        return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
      }
      function getNearestMountedFiber(fiber) {
        var node = fiber, nearestMounted = fiber;
        if (fiber.alternate) for (; node.return; ) node = node.return;
        else {
          fiber = node;
          do
            node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
          while (fiber);
        }
        return 3 === node.tag ? nearestMounted : null;
      }
      function getSuspenseInstanceFromFiber(fiber) {
        if (13 === fiber.tag) {
          var suspenseState = fiber.memoizedState;
          null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
          if (null !== suspenseState) return suspenseState.dehydrated;
        }
        return null;
      }
      function assertIsMounted(fiber) {
        if (getNearestMountedFiber(fiber) !== fiber)
          throw Error(formatProdErrorMessage(188));
      }
      function findCurrentFiberUsingSlowPath(fiber) {
        var alternate = fiber.alternate;
        if (!alternate) {
          alternate = getNearestMountedFiber(fiber);
          if (null === alternate) throw Error(formatProdErrorMessage(188));
          return alternate !== fiber ? null : fiber;
        }
        for (var a3 = fiber, b3 = alternate; ; ) {
          var parentA = a3.return;
          if (null === parentA) break;
          var parentB = parentA.alternate;
          if (null === parentB) {
            b3 = parentA.return;
            if (null !== b3) {
              a3 = b3;
              continue;
            }
            break;
          }
          if (parentA.child === parentB.child) {
            for (parentB = parentA.child; parentB; ) {
              if (parentB === a3) return assertIsMounted(parentA), fiber;
              if (parentB === b3) return assertIsMounted(parentA), alternate;
              parentB = parentB.sibling;
            }
            throw Error(formatProdErrorMessage(188));
          }
          if (a3.return !== b3.return) a3 = parentA, b3 = parentB;
          else {
            for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
              if (child$0 === a3) {
                didFindChild = true;
                a3 = parentA;
                b3 = parentB;
                break;
              }
              if (child$0 === b3) {
                didFindChild = true;
                b3 = parentA;
                a3 = parentB;
                break;
              }
              child$0 = child$0.sibling;
            }
            if (!didFindChild) {
              for (child$0 = parentB.child; child$0; ) {
                if (child$0 === a3) {
                  didFindChild = true;
                  a3 = parentB;
                  b3 = parentA;
                  break;
                }
                if (child$0 === b3) {
                  didFindChild = true;
                  b3 = parentB;
                  a3 = parentA;
                  break;
                }
                child$0 = child$0.sibling;
              }
              if (!didFindChild) throw Error(formatProdErrorMessage(189));
            }
          }
          if (a3.alternate !== b3) throw Error(formatProdErrorMessage(190));
        }
        if (3 !== a3.tag) throw Error(formatProdErrorMessage(188));
        return a3.stateNode.current === a3 ? fiber : alternate;
      }
      function findCurrentHostFiberImpl(node) {
        var tag = node.tag;
        if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
        for (node = node.child; null !== node; ) {
          tag = findCurrentHostFiberImpl(node);
          if (null !== tag) return tag;
          node = node.sibling;
        }
        return null;
      }
      var assign = Object.assign;
      var REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.tracing_marker");
      var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
      Symbol.for("react.view_transition");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch (type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x2) {
              }
          }
        return null;
      }
      var isArrayImpl = Array.isArray;
      var ReactSharedInternals = React39.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      var sharedNotPendingObject = {
        pending: false,
        data: null,
        method: null,
        action: null
      };
      var valueStack = [];
      var index = -1;
      function createCursor(defaultValue) {
        return { current: defaultValue };
      }
      function pop(cursor) {
        0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
      }
      function push(cursor, value) {
        index++;
        valueStack[index] = cursor.current;
        cursor.current = value;
      }
      var contextStackCursor = createCursor(null);
      var contextFiberStackCursor = createCursor(null);
      var rootInstanceStackCursor = createCursor(null);
      var hostTransitionProviderCursor = createCursor(null);
      function pushHostContainer(fiber, nextRootInstance) {
        push(rootInstanceStackCursor, nextRootInstance);
        push(contextFiberStackCursor, fiber);
        push(contextStackCursor, null);
        switch (nextRootInstance.nodeType) {
          case 9:
          case 11:
            fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
            break;
          default:
            if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
              nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
            else
              switch (fiber) {
                case "svg":
                  fiber = 1;
                  break;
                case "math":
                  fiber = 2;
                  break;
                default:
                  fiber = 0;
              }
        }
        pop(contextStackCursor);
        push(contextStackCursor, fiber);
      }
      function popHostContainer() {
        pop(contextStackCursor);
        pop(contextFiberStackCursor);
        pop(rootInstanceStackCursor);
      }
      function pushHostContext(fiber) {
        null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
        var context = contextStackCursor.current;
        var JSCompiler_inline_result = getChildHostContextProd(context, fiber.type);
        context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
      }
      function popHostContext(fiber) {
        contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
        hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var scheduleCallback$3 = Scheduler.unstable_scheduleCallback;
      var cancelCallback$1 = Scheduler.unstable_cancelCallback;
      var shouldYield = Scheduler.unstable_shouldYield;
      var requestPaint = Scheduler.unstable_requestPaint;
      var now = Scheduler.unstable_now;
      var getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel;
      var ImmediatePriority = Scheduler.unstable_ImmediatePriority;
      var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
      var NormalPriority$1 = Scheduler.unstable_NormalPriority;
      var LowPriority = Scheduler.unstable_LowPriority;
      var IdlePriority = Scheduler.unstable_IdlePriority;
      var log$1 = Scheduler.log;
      var unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
      var rendererID = null;
      var injectedHook = null;
      function setIsStrictModeForDevtools(newIsStrictMode) {
        "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
        if (injectedHook && "function" === typeof injectedHook.setStrictMode)
          try {
            injectedHook.setStrictMode(rendererID, newIsStrictMode);
          } catch (err) {
          }
      }
      var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
      var log = Math.log;
      var LN2 = Math.LN2;
      function clz32Fallback(x2) {
        x2 >>>= 0;
        return 0 === x2 ? 32 : 31 - (log(x2) / LN2 | 0) | 0;
      }
      var nextTransitionLane = 256;
      var nextRetryLane = 4194304;
      function getHighestPriorityLanes(lanes) {
        var pendingSyncLanes = lanes & 42;
        if (0 !== pendingSyncLanes) return pendingSyncLanes;
        switch (lanes & -lanes) {
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
            return 64;
          case 128:
            return 128;
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
            return lanes & 4194048;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return lanes & 62914560;
          case 67108864:
            return 67108864;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 0;
          default:
            return lanes;
        }
      }
      function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
        var pendingLanes = root2.pendingLanes;
        if (0 === pendingLanes) return 0;
        var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
        root2 = root2.warmLanes;
        var nonIdlePendingLanes = pendingLanes & 134217727;
        0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
        return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
      }
      function checkIfRootIsPrerendering(root2, renderLanes2) {
        return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
      }
      function computeExpirationTime(lane, currentTime) {
        switch (lane) {
          case 1:
          case 2:
          case 4:
          case 8:
          case 64:
            return currentTime + 250;
          case 16:
          case 32:
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
            return currentTime + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return -1;
          case 67108864:
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function claimNextTransitionLane() {
        var lane = nextTransitionLane;
        nextTransitionLane <<= 1;
        0 === (nextTransitionLane & 4194048) && (nextTransitionLane = 256);
        return lane;
      }
      function claimNextRetryLane() {
        var lane = nextRetryLane;
        nextRetryLane <<= 1;
        0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
        return lane;
      }
      function createLaneMap(initial) {
        for (var laneMap = [], i7 = 0; 31 > i7; i7++) laneMap.push(initial);
        return laneMap;
      }
      function markRootUpdated$1(root2, updateLane) {
        root2.pendingLanes |= updateLane;
        268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
      }
      function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
        var previouslyPendingLanes = root2.pendingLanes;
        root2.pendingLanes = remainingLanes;
        root2.suspendedLanes = 0;
        root2.pingedLanes = 0;
        root2.warmLanes = 0;
        root2.expiredLanes &= remainingLanes;
        root2.entangledLanes &= remainingLanes;
        root2.errorRecoveryDisabledLanes &= remainingLanes;
        root2.shellSuspendCounter = 0;
        var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
        for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
          var index$5 = 31 - clz32(remainingLanes), lane = 1 << index$5;
          entanglements[index$5] = 0;
          expirationTimes[index$5] = -1;
          var hiddenUpdatesForLane = hiddenUpdates[index$5];
          if (null !== hiddenUpdatesForLane)
            for (hiddenUpdates[index$5] = null, index$5 = 0; index$5 < hiddenUpdatesForLane.length; index$5++) {
              var update = hiddenUpdatesForLane[index$5];
              null !== update && (update.lane &= -536870913);
            }
          remainingLanes &= ~lane;
        }
        0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
        0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
      }
      function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
        root2.pendingLanes |= spawnedLane;
        root2.suspendedLanes &= ~spawnedLane;
        var spawnedLaneIndex = 31 - clz32(spawnedLane);
        root2.entangledLanes |= spawnedLane;
        root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 4194090;
      }
      function markRootEntangled(root2, entangledLanes) {
        var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
        for (root2 = root2.entanglements; rootEntangledLanes; ) {
          var index$6 = 31 - clz32(rootEntangledLanes), lane = 1 << index$6;
          lane & entangledLanes | root2[index$6] & entangledLanes && (root2[index$6] |= entangledLanes);
          rootEntangledLanes &= ~lane;
        }
      }
      function getBumpedLaneForHydrationByLane(lane) {
        switch (lane) {
          case 2:
            lane = 1;
            break;
          case 8:
            lane = 4;
            break;
          case 32:
            lane = 16;
            break;
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
            lane = 128;
            break;
          case 268435456:
            lane = 134217728;
            break;
          default:
            lane = 0;
        }
        return lane;
      }
      function lanesToEventPriority(lanes) {
        lanes &= -lanes;
        return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
      }
      function resolveUpdatePriority() {
        var updatePriority = ReactDOMSharedInternals.p;
        if (0 !== updatePriority) return updatePriority;
        updatePriority = window.event;
        return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
      }
      function runWithPriority(priority, fn) {
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          return ReactDOMSharedInternals.p = priority, fn();
        } finally {
          ReactDOMSharedInternals.p = previousPriority;
        }
      }
      var randomKey = Math.random().toString(36).slice(2);
      var internalInstanceKey = "__reactFiber$" + randomKey;
      var internalPropsKey = "__reactProps$" + randomKey;
      var internalContainerInstanceKey = "__reactContainer$" + randomKey;
      var internalEventHandlersKey = "__reactEvents$" + randomKey;
      var internalEventHandlerListenersKey = "__reactListeners$" + randomKey;
      var internalEventHandlesSetKey = "__reactHandles$" + randomKey;
      var internalRootNodeResourcesKey = "__reactResources$" + randomKey;
      var internalHoistableMarker = "__reactMarker$" + randomKey;
      function detachDeletedInstance(node) {
        delete node[internalInstanceKey];
        delete node[internalPropsKey];
        delete node[internalEventHandlersKey];
        delete node[internalEventHandlerListenersKey];
        delete node[internalEventHandlesSetKey];
      }
      function getClosestInstanceFromNode(targetNode) {
        var targetInst = targetNode[internalInstanceKey];
        if (targetInst) return targetInst;
        for (var parentNode = targetNode.parentNode; parentNode; ) {
          if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
            parentNode = targetInst.alternate;
            if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
              for (targetNode = getParentSuspenseInstance(targetNode); null !== targetNode; ) {
                if (parentNode = targetNode[internalInstanceKey]) return parentNode;
                targetNode = getParentSuspenseInstance(targetNode);
              }
            return targetInst;
          }
          targetNode = parentNode;
          parentNode = targetNode.parentNode;
        }
        return null;
      }
      function getInstanceFromNode(node) {
        if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
          var tag = node.tag;
          if (5 === tag || 6 === tag || 13 === tag || 26 === tag || 27 === tag || 3 === tag)
            return node;
        }
        return null;
      }
      function getNodeFromInstance(inst) {
        var tag = inst.tag;
        if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
        throw Error(formatProdErrorMessage(33));
      }
      function getResourcesFromRoot(root2) {
        var resources = root2[internalRootNodeResourcesKey];
        resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
        return resources;
      }
      function markNodeAsHoistable(node) {
        node[internalHoistableMarker] = true;
      }
      var allNativeEvents = /* @__PURE__ */ new Set();
      var registrationNameDependencies = {};
      function registerTwoPhaseEvent(registrationName, dependencies) {
        registerDirectEvent(registrationName, dependencies);
        registerDirectEvent(registrationName + "Capture", dependencies);
      }
      function registerDirectEvent(registrationName, dependencies) {
        registrationNameDependencies[registrationName] = dependencies;
        for (registrationName = 0; registrationName < dependencies.length; registrationName++)
          allNativeEvents.add(dependencies[registrationName]);
      }
      var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      );
      var illegalAttributeNameCache = {};
      var validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
          return true;
        if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
        if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
          return validatedAttributeNameCache[attributeName] = true;
        illegalAttributeNameCache[attributeName] = true;
        return false;
      }
      function setValueForAttribute(node, name, value) {
        if (isAttributeNameSafe(name))
          if (null === value) node.removeAttribute(name);
          else {
            switch (typeof value) {
              case "undefined":
              case "function":
              case "symbol":
                node.removeAttribute(name);
                return;
              case "boolean":
                var prefix$8 = name.toLowerCase().slice(0, 5);
                if ("data-" !== prefix$8 && "aria-" !== prefix$8) {
                  node.removeAttribute(name);
                  return;
                }
            }
            node.setAttribute(name, "" + value);
          }
      }
      function setValueForKnownAttribute(node, name, value) {
        if (null === value) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          node.setAttribute(name, "" + value);
        }
      }
      function setValueForNamespacedAttribute(node, namespace, name, value) {
        if (null === value) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          node.setAttributeNS(namespace, name, "" + value);
        }
      }
      var prefix;
      var suffix;
      function describeBuiltInComponentFrame(name) {
        if (void 0 === prefix)
          try {
            throw Error();
          } catch (x2) {
            var match = x2.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || "";
            suffix = -1 < x2.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x2.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return "\n" + prefix + name + suffix;
      }
      var reentry = false;
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) return "";
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          var RunInRootFrame = {
            DetermineComponentFrameRoot: function() {
              try {
                if (construct) {
                  var Fake = function() {
                    throw Error();
                  };
                  Object.defineProperty(Fake.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  });
                  if ("object" === typeof Reflect && Reflect.construct) {
                    try {
                      Reflect.construct(Fake, []);
                    } catch (x2) {
                      var control = x2;
                    }
                    Reflect.construct(fn, [], Fake);
                  } else {
                    try {
                      Fake.call();
                    } catch (x$9) {
                      control = x$9;
                    }
                    fn.call(Fake.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (x$10) {
                    control = x$10;
                  }
                  (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                  });
                }
              } catch (sample) {
                if (sample && control && "string" === typeof sample.stack)
                  return [sample.stack, control.stack];
              }
              return [null, null];
            }
          };
          RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var namePropDescriptor = Object.getOwnPropertyDescriptor(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name"
          );
          namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
          if (sampleStack && controlStack) {
            var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
            for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
              RunInRootFrame++;
            for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
              "DetermineComponentFrameRoot"
            ); )
              namePropDescriptor++;
            if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
              for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
                namePropDescriptor--;
            for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
              if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                  do
                    if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                      var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                      fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                      return frame;
                    }
                  while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
                }
                break;
              }
          }
        } finally {
          reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
        }
        return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
      }
      function describeFiber(fiber) {
        switch (fiber.tag) {
          case 26:
          case 27:
          case 5:
            return describeBuiltInComponentFrame(fiber.type);
          case 16:
            return describeBuiltInComponentFrame("Lazy");
          case 13:
            return describeBuiltInComponentFrame("Suspense");
          case 19:
            return describeBuiltInComponentFrame("SuspenseList");
          case 0:
          case 15:
            return describeNativeComponentFrame(fiber.type, false);
          case 11:
            return describeNativeComponentFrame(fiber.type.render, false);
          case 1:
            return describeNativeComponentFrame(fiber.type, true);
          case 31:
            return describeBuiltInComponentFrame("Activity");
          default:
            return "";
        }
      }
      function getStackByFiberInDevAndProd(workInProgress2) {
        try {
          var info = "";
          do
            info += describeFiber(workInProgress2), workInProgress2 = workInProgress2.return;
          while (workInProgress2);
          return info;
        } catch (x2) {
          return "\nError generating stack: " + x2.message + "\n" + x2.stack;
        }
      }
      function getToStringValue(value) {
        switch (typeof value) {
          case "bigint":
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return value;
          case "object":
            return value;
          default:
            return "";
        }
      }
      function isCheckable(elem) {
        var type = elem.type;
        return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
      }
      function trackValueOnNode(node) {
        var valueField = isCheckable(node) ? "checked" : "value", descriptor = Object.getOwnPropertyDescriptor(
          node.constructor.prototype,
          valueField
        ), currentValue = "" + node[valueField];
        if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
          var get = descriptor.get, set = descriptor.set;
          Object.defineProperty(node, valueField, {
            configurable: true,
            get: function() {
              return get.call(this);
            },
            set: function(value) {
              currentValue = "" + value;
              set.call(this, value);
            }
          });
          Object.defineProperty(node, valueField, {
            enumerable: descriptor.enumerable
          });
          return {
            getValue: function() {
              return currentValue;
            },
            setValue: function(value) {
              currentValue = "" + value;
            },
            stopTracking: function() {
              node._valueTracker = null;
              delete node[valueField];
            }
          };
        }
      }
      function track(node) {
        node._valueTracker || (node._valueTracker = trackValueOnNode(node));
      }
      function updateValueIfChanged(node) {
        if (!node) return false;
        var tracker = node._valueTracker;
        if (!tracker) return true;
        var lastValue = tracker.getValue();
        var value = "";
        node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
        node = value;
        return node !== lastValue ? (tracker.setValue(node), true) : false;
      }
      function getActiveElement(doc) {
        doc = doc || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof doc) return null;
        try {
          return doc.activeElement || doc.body;
        } catch (e12) {
          return doc.body;
        }
      }
      var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
      function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
        return value.replace(
          escapeSelectorAttributeValueInsideDoubleQuotesRegex,
          function(ch) {
            return "\\" + ch.charCodeAt(0).toString(16) + " ";
          }
        );
      }
      function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
        element.name = "";
        null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
        if (null != value)
          if ("number" === type) {
            if (0 === value && "" === element.value || element.value != value)
              element.value = "" + getToStringValue(value);
          } else
            element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
        else
          "submit" !== type && "reset" !== type || element.removeAttribute("value");
        null != value ? setDefaultValue(element, type, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, type, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
        null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
        null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
        null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
      }
      function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
        null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
        if (null != value || null != defaultValue) {
          if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value))
            return;
          defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
          value = null != value ? "" + getToStringValue(value) : defaultValue;
          isHydrating2 || value === element.value || (element.value = value);
          element.defaultValue = value;
        }
        checked = null != checked ? checked : defaultChecked;
        checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
        element.checked = isHydrating2 ? element.checked : !!checked;
        element.defaultChecked = !!checked;
        null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
      }
      function setDefaultValue(node, type, value) {
        "number" === type && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
      }
      function updateOptions(node, multiple, propValue, setDefaultSelected) {
        node = node.options;
        if (multiple) {
          multiple = {};
          for (var i7 = 0; i7 < propValue.length; i7++)
            multiple["$" + propValue[i7]] = true;
          for (propValue = 0; propValue < node.length; propValue++)
            i7 = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i7 && (node[propValue].selected = i7), i7 && setDefaultSelected && (node[propValue].defaultSelected = true);
        } else {
          propValue = "" + getToStringValue(propValue);
          multiple = null;
          for (i7 = 0; i7 < node.length; i7++) {
            if (node[i7].value === propValue) {
              node[i7].selected = true;
              setDefaultSelected && (node[i7].defaultSelected = true);
              return;
            }
            null !== multiple || node[i7].disabled || (multiple = node[i7]);
          }
          null !== multiple && (multiple.selected = true);
        }
      }
      function updateTextarea(element, value, defaultValue) {
        if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
          element.defaultValue !== value && (element.defaultValue = value);
          return;
        }
        element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
      }
      function initTextarea(element, value, defaultValue, children) {
        if (null == value) {
          if (null != children) {
            if (null != defaultValue) throw Error(formatProdErrorMessage(92));
            if (isArrayImpl(children)) {
              if (1 < children.length) throw Error(formatProdErrorMessage(93));
              children = children[0];
            }
            defaultValue = children;
          }
          null == defaultValue && (defaultValue = "");
          value = defaultValue;
        }
        defaultValue = getToStringValue(value);
        element.defaultValue = defaultValue;
        children = element.textContent;
        children === defaultValue && "" !== children && null !== children && (element.value = children);
      }
      function setTextContent(node, text) {
        if (text) {
          var firstChild = node.firstChild;
          if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
            firstChild.nodeValue = text;
            return;
          }
        }
        node.textContent = text;
      }
      var unitlessNumbers = new Set(
        "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
          " "
        )
      );
      function setValueForStyle(style2, styleName, value) {
        var isCustomProperty = 0 === styleName.indexOf("--");
        null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
      }
      function setValueForStyles(node, styles35, prevStyles) {
        if (null != styles35 && "object" !== typeof styles35)
          throw Error(formatProdErrorMessage(62));
        node = node.style;
        if (null != prevStyles) {
          for (var styleName in prevStyles)
            !prevStyles.hasOwnProperty(styleName) || null != styles35 && styles35.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "");
          for (var styleName$16 in styles35)
            styleName = styles35[styleName$16], styles35.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && setValueForStyle(node, styleName$16, styleName);
        } else
          for (var styleName$17 in styles35)
            styles35.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles35[styleName$17]);
      }
      function isCustomElement(tagName) {
        if (-1 === tagName.indexOf("-")) return false;
        switch (tagName) {
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
      var aliases = /* @__PURE__ */ new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"]
      ]);
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
      function sanitizeURL(url) {
        return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
      }
      var currentReplayingEvent = null;
      function getEventTarget(nativeEvent) {
        nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
        nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
        return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
      }
      var restoreTarget = null;
      var restoreQueue = null;
      function restoreStateOfTarget(target) {
        var internalInstance = getInstanceFromNode(target);
        if (internalInstance && (target = internalInstance.stateNode)) {
          var props = target[internalPropsKey] || null;
          a: switch (target = internalInstance.stateNode, internalInstance.type) {
            case "input":
              updateInput(
                target,
                props.value,
                props.defaultValue,
                props.defaultValue,
                props.checked,
                props.defaultChecked,
                props.type,
                props.name
              );
              internalInstance = props.name;
              if ("radio" === props.type && null != internalInstance) {
                for (props = target; props.parentNode; ) props = props.parentNode;
                props = props.querySelectorAll(
                  'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                    "" + internalInstance
                  ) + '"][type="radio"]'
                );
                for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
                  var otherNode = props[internalInstance];
                  if (otherNode !== target && otherNode.form === target.form) {
                    var otherProps = otherNode[internalPropsKey] || null;
                    if (!otherProps) throw Error(formatProdErrorMessage(90));
                    updateInput(
                      otherNode,
                      otherProps.value,
                      otherProps.defaultValue,
                      otherProps.defaultValue,
                      otherProps.checked,
                      otherProps.defaultChecked,
                      otherProps.type,
                      otherProps.name
                    );
                  }
                }
                for (internalInstance = 0; internalInstance < props.length; internalInstance++)
                  otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
              }
              break a;
            case "textarea":
              updateTextarea(target, props.value, props.defaultValue);
              break a;
            case "select":
              internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
          }
        }
      }
      var isInsideEventHandler = false;
      function batchedUpdates$1(fn, a3, b3) {
        if (isInsideEventHandler) return fn(a3, b3);
        isInsideEventHandler = true;
        try {
          var JSCompiler_inline_result = fn(a3);
          return JSCompiler_inline_result;
        } finally {
          if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
            if (flushSyncWork$1(), restoreTarget && (a3 = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a3), fn))
              for (a3 = 0; a3 < fn.length; a3++) restoreStateOfTarget(fn[a3]);
          }
        }
      }
      function getListener(inst, registrationName) {
        var stateNode = inst.stateNode;
        if (null === stateNode) return null;
        var props = stateNode[internalPropsKey] || null;
        if (null === props) return null;
        stateNode = props[registrationName];
        a: switch (registrationName) {
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
            (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
            inst = !props;
            break a;
          default:
            inst = false;
        }
        if (inst) return null;
        if (stateNode && "function" !== typeof stateNode)
          throw Error(
            formatProdErrorMessage(231, registrationName, typeof stateNode)
          );
        return stateNode;
      }
      var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var passiveBrowserEventsSupported = false;
      if (canUseDOM)
        try {
          options = {};
          Object.defineProperty(options, "passive", {
            get: function() {
              passiveBrowserEventsSupported = true;
            }
          });
          window.addEventListener("test", options, options);
          window.removeEventListener("test", options, options);
        } catch (e12) {
          passiveBrowserEventsSupported = false;
        }
      var options;
      var root = null;
      var startText = null;
      var fallbackText = null;
      function getData() {
        if (fallbackText) return fallbackText;
        var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
        for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
        var minEnd = startLength - start;
        for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
        return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
      }
      function getEventCharCode(nativeEvent) {
        var keyCode = nativeEvent.keyCode;
        "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
        10 === nativeEvent && (nativeEvent = 13);
        return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
      }
      function functionThatReturnsTrue() {
        return true;
      }
      function functionThatReturnsFalse() {
        return false;
      }
      function createSyntheticEvent(Interface) {
        function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
          this._reactName = reactName;
          this._targetInst = targetInst;
          this.type = reactEventType;
          this.nativeEvent = nativeEvent;
          this.target = nativeEventTarget;
          this.currentTarget = null;
          for (var propName in Interface)
            Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
          this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
          this.isPropagationStopped = functionThatReturnsFalse;
          return this;
        }
        assign(SyntheticBaseEvent.prototype, {
          preventDefault: function() {
            this.defaultPrevented = true;
            var event = this.nativeEvent;
            event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
          },
          stopPropagation: function() {
            var event = this.nativeEvent;
            event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
          },
          persist: function() {
          },
          isPersistent: functionThatReturnsTrue
        });
        return SyntheticBaseEvent;
      }
      var EventInterface = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(event) {
          return event.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
      };
      var SyntheticEvent = createSyntheticEvent(EventInterface);
      var UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 });
      var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
      var lastMovementX;
      var lastMovementY;
      var lastMouseEvent;
      var MouseEventInterface = assign({}, UIEventInterface, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: getEventModifierState,
        button: 0,
        buttons: 0,
        relatedTarget: function(event) {
          return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
        },
        movementX: function(event) {
          if ("movementX" in event) return event.movementX;
          event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
          return lastMovementX;
        },
        movementY: function(event) {
          return "movementY" in event ? event.movementY : lastMovementY;
        }
      });
      var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
      var DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 });
      var SyntheticDragEvent = createSyntheticEvent(DragEventInterface);
      var FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 });
      var SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface);
      var AnimationEventInterface = assign({}, EventInterface, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      });
      var SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface);
      var ClipboardEventInterface = assign({}, EventInterface, {
        clipboardData: function(event) {
          return "clipboardData" in event ? event.clipboardData : window.clipboardData;
        }
      });
      var SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface);
      var CompositionEventInterface = assign({}, EventInterface, { data: 0 });
      var SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface);
      var normalizeKey = {
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
      var translateToKey = {
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
      var modifierKeyToProp = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      };
      function modifierStateGetter(keyArg) {
        var nativeEvent = this.nativeEvent;
        return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
      }
      function getEventModifierState() {
        return modifierStateGetter;
      }
      var KeyboardEventInterface = assign({}, UIEventInterface, {
        key: function(nativeEvent) {
          if (nativeEvent.key) {
            var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
            if ("Unidentified" !== key) return key;
          }
          return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: getEventModifierState,
        charCode: function(event) {
          return "keypress" === event.type ? getEventCharCode(event) : 0;
        },
        keyCode: function(event) {
          return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
        },
        which: function(event) {
          return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
        }
      });
      var SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface);
      var PointerEventInterface = assign({}, MouseEventInterface, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
      });
      var SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface);
      var TouchEventInterface = assign({}, UIEventInterface, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: getEventModifierState
      });
      var SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface);
      var TransitionEventInterface = assign({}, EventInterface, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      });
      var SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface);
      var WheelEventInterface = assign({}, MouseEventInterface, {
        deltaX: function(event) {
          return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
        },
        deltaY: function(event) {
          return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface);
      var ToggleEventInterface = assign({}, EventInterface, {
        newState: 0,
        oldState: 0
      });
      var SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface);
      var END_KEYCODES = [9, 13, 27, 32];
      var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
      var documentMode = null;
      canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
      var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode;
      var useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode);
      var SPACEBAR_CHAR = String.fromCharCode(32);
      var hasSpaceKeypress = false;
      function isFallbackCompositionEnd(domEventName, nativeEvent) {
        switch (domEventName) {
          case "keyup":
            return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
          case "keydown":
            return 229 !== nativeEvent.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function getDataFromCustomEvent(nativeEvent) {
        nativeEvent = nativeEvent.detail;
        return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
      }
      var isComposing = false;
      function getNativeBeforeInputChars(domEventName, nativeEvent) {
        switch (domEventName) {
          case "compositionend":
            return getDataFromCustomEvent(nativeEvent);
          case "keypress":
            if (32 !== nativeEvent.which) return null;
            hasSpaceKeypress = true;
            return SPACEBAR_CHAR;
          case "textInput":
            return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
          default:
            return null;
        }
      }
      function getFallbackBeforeInputChars(domEventName, nativeEvent) {
        if (isComposing)
          return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
        switch (domEventName) {
          case "paste":
            return null;
          case "keypress":
            if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
              if (nativeEvent.char && 1 < nativeEvent.char.length)
                return nativeEvent.char;
              if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
            }
            return null;
          case "compositionend":
            return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
          default:
            return null;
        }
      }
      var supportedInputTypes = {
        color: true,
        date: true,
        datetime: true,
        "datetime-local": true,
        email: true,
        month: true,
        number: true,
        password: true,
        range: true,
        search: true,
        tel: true,
        text: true,
        time: true,
        url: true,
        week: true
      };
      function isTextInputElement(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
      }
      function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
        restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
        inst = accumulateTwoPhaseListeners(inst, "onChange");
        0 < inst.length && (nativeEvent = new SyntheticEvent(
          "onChange",
          "change",
          null,
          nativeEvent,
          target
        ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
      }
      var activeElement$1 = null;
      var activeElementInst$1 = null;
      function runEventInBatch(dispatchQueue) {
        processDispatchQueue(dispatchQueue, 0);
      }
      function getInstIfValueChanged(targetInst) {
        var targetNode = getNodeFromInstance(targetInst);
        if (updateValueIfChanged(targetNode)) return targetInst;
      }
      function getTargetInstForChangeEvent(domEventName, targetInst) {
        if ("change" === domEventName) return targetInst;
      }
      var isInputEventSupported = false;
      if (canUseDOM) {
        if (canUseDOM) {
          isSupported$jscomp$inline_417 = "oninput" in document;
          if (!isSupported$jscomp$inline_417) {
            element$jscomp$inline_418 = document.createElement("div");
            element$jscomp$inline_418.setAttribute("oninput", "return;");
            isSupported$jscomp$inline_417 = "function" === typeof element$jscomp$inline_418.oninput;
          }
          JSCompiler_inline_result$jscomp$282 = isSupported$jscomp$inline_417;
        } else JSCompiler_inline_result$jscomp$282 = false;
        isInputEventSupported = JSCompiler_inline_result$jscomp$282 && (!document.documentMode || 9 < document.documentMode);
      }
      var JSCompiler_inline_result$jscomp$282;
      var isSupported$jscomp$inline_417;
      var element$jscomp$inline_418;
      function stopWatchingForValueChange() {
        activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
      }
      function handlePropertyChange(nativeEvent) {
        if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
          var dispatchQueue = [];
          createAndAccumulateChangeEvent(
            dispatchQueue,
            activeElementInst$1,
            nativeEvent,
            getEventTarget(nativeEvent)
          );
          batchedUpdates$1(runEventInBatch, dispatchQueue);
        }
      }
      function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
        "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
      }
      function getTargetInstForInputEventPolyfill(domEventName) {
        if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
          return getInstIfValueChanged(activeElementInst$1);
      }
      function getTargetInstForClickEvent(domEventName, targetInst) {
        if ("click" === domEventName) return getInstIfValueChanged(targetInst);
      }
      function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
        if ("input" === domEventName || "change" === domEventName)
          return getInstIfValueChanged(targetInst);
      }
      function is(x2, y3) {
        return x2 === y3 && (0 !== x2 || 1 / x2 === 1 / y3) || x2 !== x2 && y3 !== y3;
      }
      var objectIs = "function" === typeof Object.is ? Object.is : is;
      function shallowEqual(objA, objB) {
        if (objectIs(objA, objB)) return true;
        if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
          return false;
        var keysA = Object.keys(objA), keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) return false;
        for (keysB = 0; keysB < keysA.length; keysB++) {
          var currentKey = keysA[keysB];
          if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
            return false;
        }
        return true;
      }
      function getLeafNode(node) {
        for (; node && node.firstChild; ) node = node.firstChild;
        return node;
      }
      function getNodeForCharacterOffset(root2, offset) {
        var node = getLeafNode(root2);
        root2 = 0;
        for (var nodeEnd; node; ) {
          if (3 === node.nodeType) {
            nodeEnd = root2 + node.textContent.length;
            if (root2 <= offset && nodeEnd >= offset)
              return { node, offset: offset - root2 };
            root2 = nodeEnd;
          }
          a: {
            for (; node; ) {
              if (node.nextSibling) {
                node = node.nextSibling;
                break a;
              }
              node = node.parentNode;
            }
            node = void 0;
          }
          node = getLeafNode(node);
        }
      }
      function containsNode(outerNode, innerNode) {
        return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
      }
      function getActiveElementDeep(containerInfo) {
        containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
        for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
          try {
            var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
          } catch (err) {
            JSCompiler_inline_result = false;
          }
          if (JSCompiler_inline_result) containerInfo = element.contentWindow;
          else break;
          element = getActiveElement(containerInfo.document);
        }
        return element;
      }
      function hasSelectionCapabilities(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
      }
      var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode;
      var activeElement = null;
      var activeElementInst = null;
      var lastSelection = null;
      var mouseDown = false;
      function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
        var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
        mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
          anchorNode: doc.anchorNode,
          anchorOffset: doc.anchorOffset,
          focusNode: doc.focusNode,
          focusOffset: doc.focusOffset
        }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
          "onSelect",
          "select",
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
      }
      function makePrefixMap(styleProp, eventName) {
        var prefixes = {};
        prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
        prefixes["Webkit" + styleProp] = "webkit" + eventName;
        prefixes["Moz" + styleProp] = "moz" + eventName;
        return prefixes;
      }
      var vendorPrefixes = {
        animationend: makePrefixMap("Animation", "AnimationEnd"),
        animationiteration: makePrefixMap("Animation", "AnimationIteration"),
        animationstart: makePrefixMap("Animation", "AnimationStart"),
        transitionrun: makePrefixMap("Transition", "TransitionRun"),
        transitionstart: makePrefixMap("Transition", "TransitionStart"),
        transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
        transitionend: makePrefixMap("Transition", "TransitionEnd")
      };
      var prefixedEventNames = {};
      var style = {};
      canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
      function getVendorPrefixedEventName(eventName) {
        if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
        if (!vendorPrefixes[eventName]) return eventName;
        var prefixMap = vendorPrefixes[eventName], styleProp;
        for (styleProp in prefixMap)
          if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
            return prefixedEventNames[eventName] = prefixMap[styleProp];
        return eventName;
      }
      var ANIMATION_END = getVendorPrefixedEventName("animationend");
      var ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration");
      var ANIMATION_START = getVendorPrefixedEventName("animationstart");
      var TRANSITION_RUN = getVendorPrefixedEventName("transitionrun");
      var TRANSITION_START = getVendorPrefixedEventName("transitionstart");
      var TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel");
      var TRANSITION_END = getVendorPrefixedEventName("transitionend");
      var topLevelEventsToReactNames = /* @__PURE__ */ new Map();
      var simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
      simpleEventPluginEvents.push("scrollEnd");
      function registerSimpleEvent(domEventName, reactName) {
        topLevelEventsToReactNames.set(domEventName, reactName);
        registerTwoPhaseEvent(reactName, [domEventName]);
      }
      var CapturedStacks = /* @__PURE__ */ new WeakMap();
      function createCapturedValueAtFiber(value, source) {
        if ("object" === typeof value && null !== value) {
          var existing = CapturedStacks.get(value);
          if (void 0 !== existing) return existing;
          source = {
            value,
            source,
            stack: getStackByFiberInDevAndProd(source)
          };
          CapturedStacks.set(value, source);
          return source;
        }
        return {
          value,
          source,
          stack: getStackByFiberInDevAndProd(source)
        };
      }
      var concurrentQueues = [];
      var concurrentQueuesIndex = 0;
      var concurrentlyUpdatedLanes = 0;
      function finishQueueingConcurrentUpdates() {
        for (var endIndex = concurrentQueuesIndex, i7 = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i7 < endIndex; ) {
          var fiber = concurrentQueues[i7];
          concurrentQueues[i7++] = null;
          var queue = concurrentQueues[i7];
          concurrentQueues[i7++] = null;
          var update = concurrentQueues[i7];
          concurrentQueues[i7++] = null;
          var lane = concurrentQueues[i7];
          concurrentQueues[i7++] = null;
          if (null !== queue && null !== update) {
            var pending = queue.pending;
            null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
            queue.pending = update;
          }
          0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
        }
      }
      function enqueueUpdate$1(fiber, queue, update, lane) {
        concurrentQueues[concurrentQueuesIndex++] = fiber;
        concurrentQueues[concurrentQueuesIndex++] = queue;
        concurrentQueues[concurrentQueuesIndex++] = update;
        concurrentQueues[concurrentQueuesIndex++] = lane;
        concurrentlyUpdatedLanes |= lane;
        fiber.lanes |= lane;
        fiber = fiber.alternate;
        null !== fiber && (fiber.lanes |= lane);
      }
      function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
        enqueueUpdate$1(fiber, queue, update, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function enqueueConcurrentRenderForLane(fiber, lane) {
        enqueueUpdate$1(fiber, null, null, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
        sourceFiber.lanes |= lane;
        var alternate = sourceFiber.alternate;
        null !== alternate && (alternate.lanes |= lane);
        for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
          parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
        return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
      }
      function getRootForUpdatedFiber(sourceFiber) {
        if (50 < nestedUpdateCount)
          throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
        for (var parent = sourceFiber.return; null !== parent; )
          sourceFiber = parent, parent = sourceFiber.return;
        return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
      }
      var emptyContextObject = {};
      function FiberNode(tag, pendingProps, key, mode) {
        this.tag = tag;
        this.key = key;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.refCleanup = this.ref = null;
        this.pendingProps = pendingProps;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = mode;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function createFiberImplClass(tag, pendingProps, key, mode) {
        return new FiberNode(tag, pendingProps, key, mode);
      }
      function shouldConstruct(Component) {
        Component = Component.prototype;
        return !(!Component || !Component.isReactComponent);
      }
      function createWorkInProgress(current, pendingProps) {
        var workInProgress2 = current.alternate;
        null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
          current.tag,
          pendingProps,
          current.key,
          current.mode
        ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
        workInProgress2.flags = current.flags & 65011712;
        workInProgress2.childLanes = current.childLanes;
        workInProgress2.lanes = current.lanes;
        workInProgress2.child = current.child;
        workInProgress2.memoizedProps = current.memoizedProps;
        workInProgress2.memoizedState = current.memoizedState;
        workInProgress2.updateQueue = current.updateQueue;
        pendingProps = current.dependencies;
        workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
        workInProgress2.sibling = current.sibling;
        workInProgress2.index = current.index;
        workInProgress2.ref = current.ref;
        workInProgress2.refCleanup = current.refCleanup;
        return workInProgress2;
      }
      function resetWorkInProgress(workInProgress2, renderLanes2) {
        workInProgress2.flags &= 65011714;
        var current = workInProgress2.alternate;
        null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
          lanes: renderLanes2.lanes,
          firstContext: renderLanes2.firstContext
        });
        return workInProgress2;
      }
      function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
        var fiberTag = 0;
        owner = type;
        if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
        else if ("string" === typeof type)
          fiberTag = isHostHoistableType(
            type,
            pendingProps,
            contextStackCursor.current
          ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
        else
          a: switch (type) {
            case REACT_ACTIVITY_TYPE:
              return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
            case REACT_FRAGMENT_TYPE:
              return createFiberFromFragment(pendingProps.children, mode, lanes, key);
            case REACT_STRICT_MODE_TYPE:
              fiberTag = 8;
              mode |= 24;
              break;
            case REACT_PROFILER_TYPE:
              return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_TYPE:
              return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_LIST_TYPE:
              return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
            default:
              if ("object" === typeof type && null !== type)
                switch (type.$$typeof) {
                  case REACT_PROVIDER_TYPE:
                  case REACT_CONTEXT_TYPE:
                    fiberTag = 10;
                    break a;
                  case REACT_CONSUMER_TYPE:
                    fiberTag = 9;
                    break a;
                  case REACT_FORWARD_REF_TYPE:
                    fiberTag = 11;
                    break a;
                  case REACT_MEMO_TYPE:
                    fiberTag = 14;
                    break a;
                  case REACT_LAZY_TYPE:
                    fiberTag = 16;
                    owner = null;
                    break a;
                }
              fiberTag = 29;
              pendingProps = Error(
                formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
              );
              owner = null;
          }
        key = createFiberImplClass(fiberTag, pendingProps, key, mode);
        key.elementType = type;
        key.type = owner;
        key.lanes = lanes;
        return key;
      }
      function createFiberFromFragment(elements, mode, lanes, key) {
        elements = createFiberImplClass(7, elements, key, mode);
        elements.lanes = lanes;
        return elements;
      }
      function createFiberFromText(content, mode, lanes) {
        content = createFiberImplClass(6, content, null, mode);
        content.lanes = lanes;
        return content;
      }
      function createFiberFromPortal(portal, mode, lanes) {
        mode = createFiberImplClass(
          4,
          null !== portal.children ? portal.children : [],
          portal.key,
          mode
        );
        mode.lanes = lanes;
        mode.stateNode = {
          containerInfo: portal.containerInfo,
          pendingChildren: null,
          implementation: portal.implementation
        };
        return mode;
      }
      var forkStack = [];
      var forkStackIndex = 0;
      var treeForkProvider = null;
      var treeForkCount = 0;
      var idStack = [];
      var idStackIndex = 0;
      var treeContextProvider = null;
      var treeContextId = 1;
      var treeContextOverflow = "";
      function pushTreeFork(workInProgress2, totalChildren) {
        forkStack[forkStackIndex++] = treeForkCount;
        forkStack[forkStackIndex++] = treeForkProvider;
        treeForkProvider = workInProgress2;
        treeForkCount = totalChildren;
      }
      function pushTreeId(workInProgress2, totalChildren, index2) {
        idStack[idStackIndex++] = treeContextId;
        idStack[idStackIndex++] = treeContextOverflow;
        idStack[idStackIndex++] = treeContextProvider;
        treeContextProvider = workInProgress2;
        var baseIdWithLeadingBit = treeContextId;
        workInProgress2 = treeContextOverflow;
        var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
        baseIdWithLeadingBit &= ~(1 << baseLength);
        index2 += 1;
        var length = 32 - clz32(totalChildren) + baseLength;
        if (30 < length) {
          var numberOfOverflowBits = baseLength - baseLength % 5;
          length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
          baseIdWithLeadingBit >>= numberOfOverflowBits;
          baseLength -= numberOfOverflowBits;
          treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
          treeContextOverflow = length + workInProgress2;
        } else
          treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
      }
      function pushMaterializedTreeId(workInProgress2) {
        null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
      }
      function popTreeContext(workInProgress2) {
        for (; workInProgress2 === treeForkProvider; )
          treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
        for (; workInProgress2 === treeContextProvider; )
          treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
      }
      var hydrationParentFiber = null;
      var nextHydratableInstance = null;
      var isHydrating = false;
      var hydrationErrors = null;
      var rootOrSingletonContext = false;
      var HydrationMismatchException = Error(formatProdErrorMessage(519));
      function throwOnHydrationMismatch(fiber) {
        var error = Error(formatProdErrorMessage(418, ""));
        queueHydrationError(createCapturedValueAtFiber(error, fiber));
        throw HydrationMismatchException;
      }
      function prepareToHydrateHostInstance(fiber) {
        var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
        instance[internalInstanceKey] = fiber;
        instance[internalPropsKey] = props;
        switch (type) {
          case "dialog":
            listenToNonDelegatedEvent("cancel", instance);
            listenToNonDelegatedEvent("close", instance);
            break;
          case "iframe":
          case "object":
          case "embed":
            listenToNonDelegatedEvent("load", instance);
            break;
          case "video":
          case "audio":
            for (type = 0; type < mediaEventTypes.length; type++)
              listenToNonDelegatedEvent(mediaEventTypes[type], instance);
            break;
          case "source":
            listenToNonDelegatedEvent("error", instance);
            break;
          case "img":
          case "image":
          case "link":
            listenToNonDelegatedEvent("error", instance);
            listenToNonDelegatedEvent("load", instance);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", instance);
            break;
          case "input":
            listenToNonDelegatedEvent("invalid", instance);
            initInput(
              instance,
              props.value,
              props.defaultValue,
              props.checked,
              props.defaultChecked,
              props.type,
              props.name,
              true
            );
            track(instance);
            break;
          case "select":
            listenToNonDelegatedEvent("invalid", instance);
            break;
          case "textarea":
            listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children), track(instance);
        }
        type = props.children;
        "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
        instance || throwOnHydrationMismatch(fiber);
      }
      function popToNextHostParent(fiber) {
        for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
          switch (hydrationParentFiber.tag) {
            case 5:
            case 13:
              rootOrSingletonContext = false;
              return;
            case 27:
            case 3:
              rootOrSingletonContext = true;
              return;
            default:
              hydrationParentFiber = hydrationParentFiber.return;
          }
      }
      function popHydrationState(fiber) {
        if (fiber !== hydrationParentFiber) return false;
        if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
        var tag = fiber.tag, JSCompiler_temp;
        if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
          if (JSCompiler_temp = 5 === tag)
            JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
          JSCompiler_temp = !JSCompiler_temp;
        }
        JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
        popToNextHostParent(fiber);
        if (13 === tag) {
          fiber = fiber.memoizedState;
          fiber = null !== fiber ? fiber.dehydrated : null;
          if (!fiber) throw Error(formatProdErrorMessage(317));
          a: {
            fiber = fiber.nextSibling;
            for (tag = 0; fiber; ) {
              if (8 === fiber.nodeType)
                if (JSCompiler_temp = fiber.data, "/$" === JSCompiler_temp) {
                  if (0 === tag) {
                    nextHydratableInstance = getNextHydratable(fiber.nextSibling);
                    break a;
                  }
                  tag--;
                } else
                  "$" !== JSCompiler_temp && "$!" !== JSCompiler_temp && "$?" !== JSCompiler_temp || tag++;
              fiber = fiber.nextSibling;
            }
            nextHydratableInstance = null;
          }
        } else
          27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
        return true;
      }
      function resetHydrationState() {
        nextHydratableInstance = hydrationParentFiber = null;
        isHydrating = false;
      }
      function upgradeHydrationErrorsToRecoverable() {
        var queuedErrors = hydrationErrors;
        null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
          workInProgressRootRecoverableErrors,
          queuedErrors
        ), hydrationErrors = null);
        return queuedErrors;
      }
      function queueHydrationError(error) {
        null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
      }
      var valueCursor = createCursor(null);
      var currentlyRenderingFiber$1 = null;
      var lastContextDependency = null;
      function pushProvider(providerFiber, context, nextValue) {
        push(valueCursor, context._currentValue);
        context._currentValue = nextValue;
      }
      function popProvider(context) {
        context._currentValue = valueCursor.current;
        pop(valueCursor);
      }
      function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
        for (; null !== parent; ) {
          var alternate = parent.alternate;
          (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
          if (parent === propagationRoot) break;
          parent = parent.return;
        }
      }
      function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
        var fiber = workInProgress2.child;
        null !== fiber && (fiber.return = workInProgress2);
        for (; null !== fiber; ) {
          var list = fiber.dependencies;
          if (null !== list) {
            var nextFiber = fiber.child;
            list = list.firstContext;
            a: for (; null !== list; ) {
              var dependency = list;
              list = fiber;
              for (var i7 = 0; i7 < contexts.length; i7++)
                if (dependency.context === contexts[i7]) {
                  list.lanes |= renderLanes2;
                  dependency = list.alternate;
                  null !== dependency && (dependency.lanes |= renderLanes2);
                  scheduleContextWorkOnParentPath(
                    list.return,
                    renderLanes2,
                    workInProgress2
                  );
                  forcePropagateEntireTree || (nextFiber = null);
                  break a;
                }
              list = dependency.next;
            }
          } else if (18 === fiber.tag) {
            nextFiber = fiber.return;
            if (null === nextFiber) throw Error(formatProdErrorMessage(341));
            nextFiber.lanes |= renderLanes2;
            list = nextFiber.alternate;
            null !== list && (list.lanes |= renderLanes2);
            scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
            nextFiber = null;
          } else nextFiber = fiber.child;
          if (null !== nextFiber) nextFiber.return = fiber;
          else
            for (nextFiber = fiber; null !== nextFiber; ) {
              if (nextFiber === workInProgress2) {
                nextFiber = null;
                break;
              }
              fiber = nextFiber.sibling;
              if (null !== fiber) {
                fiber.return = nextFiber.return;
                nextFiber = fiber;
                break;
              }
              nextFiber = nextFiber.return;
            }
          fiber = nextFiber;
        }
      }
      function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
        current = null;
        for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
          if (!isInsidePropagationBailout) {
            if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
            else if (0 !== (parent.flags & 262144)) break;
          }
          if (10 === parent.tag) {
            var currentParent = parent.alternate;
            if (null === currentParent) throw Error(formatProdErrorMessage(387));
            currentParent = currentParent.memoizedProps;
            if (null !== currentParent) {
              var context = parent.type;
              objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
            }
          } else if (parent === hostTransitionProviderCursor.current) {
            currentParent = parent.alternate;
            if (null === currentParent) throw Error(formatProdErrorMessage(387));
            currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
          }
          parent = parent.return;
        }
        null !== current && propagateContextChanges(
          workInProgress2,
          current,
          renderLanes2,
          forcePropagateEntireTree
        );
        workInProgress2.flags |= 262144;
      }
      function checkIfContextChanged(currentDependencies) {
        for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
          if (!objectIs(
            currentDependencies.context._currentValue,
            currentDependencies.memoizedValue
          ))
            return true;
          currentDependencies = currentDependencies.next;
        }
        return false;
      }
      function prepareToReadContext(workInProgress2) {
        currentlyRenderingFiber$1 = workInProgress2;
        lastContextDependency = null;
        workInProgress2 = workInProgress2.dependencies;
        null !== workInProgress2 && (workInProgress2.firstContext = null);
      }
      function readContext(context) {
        return readContextForConsumer(currentlyRenderingFiber$1, context);
      }
      function readContextDuringReconciliation(consumer, context) {
        null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
        return readContextForConsumer(consumer, context);
      }
      function readContextForConsumer(consumer, context) {
        var value = context._currentValue;
        context = { context, memoizedValue: value, next: null };
        if (null === lastContextDependency) {
          if (null === consumer) throw Error(formatProdErrorMessage(308));
          lastContextDependency = context;
          consumer.dependencies = { lanes: 0, firstContext: context };
          consumer.flags |= 524288;
        } else lastContextDependency = lastContextDependency.next = context;
        return value;
      }
      var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
        var listeners = [], signal = this.signal = {
          aborted: false,
          addEventListener: function(type, listener) {
            listeners.push(listener);
          }
        };
        this.abort = function() {
          signal.aborted = true;
          listeners.forEach(function(listener) {
            return listener();
          });
        };
      };
      var scheduleCallback$2 = Scheduler.unstable_scheduleCallback;
      var NormalPriority = Scheduler.unstable_NormalPriority;
      var CacheContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
      };
      function createCache() {
        return {
          controller: new AbortControllerLocal(),
          data: /* @__PURE__ */ new Map(),
          refCount: 0
        };
      }
      function releaseCache(cache) {
        cache.refCount--;
        0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
          cache.controller.abort();
        });
      }
      var currentEntangledListeners = null;
      var currentEntangledPendingCount = 0;
      var currentEntangledLane = 0;
      var currentEntangledActionThenable = null;
      function entangleAsyncAction(transition, thenable) {
        if (null === currentEntangledListeners) {
          var entangledListeners = currentEntangledListeners = [];
          currentEntangledPendingCount = 0;
          currentEntangledLane = requestTransitionLane();
          currentEntangledActionThenable = {
            status: "pending",
            value: void 0,
            then: function(resolve) {
              entangledListeners.push(resolve);
            }
          };
        }
        currentEntangledPendingCount++;
        thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
        return thenable;
      }
      function pingEngtangledActionScope() {
        if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
          null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
          var listeners = currentEntangledListeners;
          currentEntangledListeners = null;
          currentEntangledLane = 0;
          currentEntangledActionThenable = null;
          for (var i7 = 0; i7 < listeners.length; i7++) (0, listeners[i7])();
        }
      }
      function chainThenableValue(thenable, result) {
        var listeners = [], thenableWithOverride = {
          status: "pending",
          value: null,
          reason: null,
          then: function(resolve) {
            listeners.push(resolve);
          }
        };
        thenable.then(
          function() {
            thenableWithOverride.status = "fulfilled";
            thenableWithOverride.value = result;
            for (var i7 = 0; i7 < listeners.length; i7++) (0, listeners[i7])(result);
          },
          function(error) {
            thenableWithOverride.status = "rejected";
            thenableWithOverride.reason = error;
            for (error = 0; error < listeners.length; error++)
              (0, listeners[error])(void 0);
          }
        );
        return thenableWithOverride;
      }
      var prevOnStartTransitionFinish = ReactSharedInternals.S;
      ReactSharedInternals.S = function(transition, returnValue) {
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
        null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
      };
      var resumedCache = createCursor(null);
      function peekCacheFromPool() {
        var cacheResumedFromPreviousRender = resumedCache.current;
        return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
      }
      function pushTransition(offscreenWorkInProgress, prevCachePool) {
        null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
      }
      function getSuspendedCache() {
        var cacheFromPool = peekCacheFromPool();
        return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
      }
      var SuspenseException = Error(formatProdErrorMessage(460));
      var SuspenseyCommitException = Error(formatProdErrorMessage(474));
      var SuspenseActionException = Error(formatProdErrorMessage(542));
      var noopSuspenseyCommitThenable = { then: function() {
      } };
      function isThenableResolved(thenable) {
        thenable = thenable.status;
        return "fulfilled" === thenable || "rejected" === thenable;
      }
      function noop$3() {
      }
      function trackUsedThenable(thenableState2, thenable, index2) {
        index2 = thenableState2[index2];
        void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$3, noop$3), thenable = index2);
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
          default:
            if ("string" === typeof thenable.status) thenable.then(noop$3, noop$3);
            else {
              thenableState2 = workInProgressRoot;
              if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
                throw Error(formatProdErrorMessage(482));
              thenableState2 = thenable;
              thenableState2.status = "pending";
              thenableState2.then(
                function(fulfilledValue) {
                  if ("pending" === thenable.status) {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled";
                    fulfilledThenable.value = fulfilledValue;
                  }
                },
                function(error) {
                  if ("pending" === thenable.status) {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected";
                    rejectedThenable.reason = error;
                  }
                }
              );
            }
            switch (thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
            }
            suspendedThenable = thenable;
            throw SuspenseException;
        }
      }
      var suspendedThenable = null;
      function getSuspendedThenable() {
        if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
        var thenable = suspendedThenable;
        suspendedThenable = null;
        return thenable;
      }
      function checkIfUseWrappedInAsyncCatch(rejectedReason) {
        if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
          throw Error(formatProdErrorMessage(483));
      }
      var hasForceUpdate = false;
      function initializeUpdateQueue(fiber) {
        fiber.updateQueue = {
          baseState: fiber.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, lanes: 0, hiddenCallbacks: null },
          callbacks: null
        };
      }
      function cloneUpdateQueue(current, workInProgress2) {
        current = current.updateQueue;
        workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
          baseState: current.baseState,
          firstBaseUpdate: current.firstBaseUpdate,
          lastBaseUpdate: current.lastBaseUpdate,
          shared: current.shared,
          callbacks: null
        });
      }
      function createUpdate(lane) {
        return { lane, tag: 0, payload: null, callback: null, next: null };
      }
      function enqueueUpdate(fiber, update, lane) {
        var updateQueue = fiber.updateQueue;
        if (null === updateQueue) return null;
        updateQueue = updateQueue.shared;
        if (0 !== (executionContext & 2)) {
          var pending = updateQueue.pending;
          null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
          updateQueue.pending = update;
          update = getRootForUpdatedFiber(fiber);
          markUpdateLaneFromFiberToRoot(fiber, null, lane);
          return update;
        }
        enqueueUpdate$1(fiber, updateQueue, update, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function entangleTransitions(root2, fiber, lane) {
        fiber = fiber.updateQueue;
        if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
          var queueLanes = fiber.lanes;
          queueLanes &= root2.pendingLanes;
          lane |= queueLanes;
          fiber.lanes = lane;
          markRootEntangled(root2, lane);
        }
      }
      function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
        var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
        if (null !== current && (current = current.updateQueue, queue === current)) {
          var newFirst = null, newLast = null;
          queue = queue.firstBaseUpdate;
          if (null !== queue) {
            do {
              var clone = {
                lane: queue.lane,
                tag: queue.tag,
                payload: queue.payload,
                callback: null,
                next: null
              };
              null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
              queue = queue.next;
            } while (null !== queue);
            null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
          } else newFirst = newLast = capturedUpdate;
          queue = {
            baseState: current.baseState,
            firstBaseUpdate: newFirst,
            lastBaseUpdate: newLast,
            shared: current.shared,
            callbacks: current.callbacks
          };
          workInProgress2.updateQueue = queue;
          return;
        }
        workInProgress2 = queue.lastBaseUpdate;
        null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
        queue.lastBaseUpdate = capturedUpdate;
      }
      var didReadFromEntangledAsyncAction = false;
      function suspendIfUpdateReadFromEntangledAsyncAction() {
        if (didReadFromEntangledAsyncAction) {
          var entangledActionThenable = currentEntangledActionThenable;
          if (null !== entangledActionThenable) throw entangledActionThenable;
        }
      }
      function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
        didReadFromEntangledAsyncAction = false;
        var queue = workInProgress$jscomp$0.updateQueue;
        hasForceUpdate = false;
        var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
        if (null !== pendingQueue) {
          queue.shared.pending = null;
          var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
          lastPendingUpdate.next = null;
          null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
          lastBaseUpdate = lastPendingUpdate;
          var current = workInProgress$jscomp$0.alternate;
          null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
        }
        if (null !== firstBaseUpdate) {
          var newState = queue.baseState;
          lastBaseUpdate = 0;
          current = firstPendingUpdate = lastPendingUpdate = null;
          pendingQueue = firstBaseUpdate;
          do {
            var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
            if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
              0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
              null !== current && (current = current.next = {
                lane: 0,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: null,
                next: null
              });
              a: {
                var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
                updateLane = props;
                var instance = instance$jscomp$0;
                switch (update.tag) {
                  case 1:
                    workInProgress2 = update.payload;
                    if ("function" === typeof workInProgress2) {
                      newState = workInProgress2.call(instance, newState, updateLane);
                      break a;
                    }
                    newState = workInProgress2;
                    break a;
                  case 3:
                    workInProgress2.flags = workInProgress2.flags & -65537 | 128;
                  case 0:
                    workInProgress2 = update.payload;
                    updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                    if (null === updateLane || void 0 === updateLane) break a;
                    newState = assign({}, newState, updateLane);
                    break a;
                  case 2:
                    hasForceUpdate = true;
                }
              }
              updateLane = pendingQueue.callback;
              null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
            } else
              isHiddenUpdate = {
                lane: updateLane,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: pendingQueue.callback,
                next: null
              }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
            pendingQueue = pendingQueue.next;
            if (null === pendingQueue)
              if (pendingQueue = queue.shared.pending, null === pendingQueue)
                break;
              else
                isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
          } while (1);
          null === current && (lastPendingUpdate = newState);
          queue.baseState = lastPendingUpdate;
          queue.firstBaseUpdate = firstPendingUpdate;
          queue.lastBaseUpdate = current;
          null === firstBaseUpdate && (queue.shared.lanes = 0);
          workInProgressRootSkippedLanes |= lastBaseUpdate;
          workInProgress$jscomp$0.lanes = lastBaseUpdate;
          workInProgress$jscomp$0.memoizedState = newState;
        }
      }
      function callCallback(callback, context) {
        if ("function" !== typeof callback)
          throw Error(formatProdErrorMessage(191, callback));
        callback.call(context);
      }
      function commitCallbacks(updateQueue, context) {
        var callbacks = updateQueue.callbacks;
        if (null !== callbacks)
          for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
            callCallback(callbacks[updateQueue], context);
      }
      var currentTreeHiddenStackCursor = createCursor(null);
      var prevEntangledRenderLanesCursor = createCursor(0);
      function pushHiddenContext(fiber, context) {
        fiber = entangledRenderLanes;
        push(prevEntangledRenderLanesCursor, fiber);
        push(currentTreeHiddenStackCursor, context);
        entangledRenderLanes = fiber | context.baseLanes;
      }
      function reuseHiddenContextOnStack() {
        push(prevEntangledRenderLanesCursor, entangledRenderLanes);
        push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
      }
      function popHiddenContext() {
        entangledRenderLanes = prevEntangledRenderLanesCursor.current;
        pop(currentTreeHiddenStackCursor);
        pop(prevEntangledRenderLanesCursor);
      }
      var renderLanes = 0;
      var currentlyRenderingFiber = null;
      var currentHook = null;
      var workInProgressHook = null;
      var didScheduleRenderPhaseUpdate = false;
      var didScheduleRenderPhaseUpdateDuringThisPass = false;
      var shouldDoubleInvokeUserFnsInHooksDEV = false;
      var localIdCounter = 0;
      var thenableIndexCounter$1 = 0;
      var thenableState$1 = null;
      var globalClientIdCounter = 0;
      function throwInvalidHookError() {
        throw Error(formatProdErrorMessage(321));
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (null === prevDeps) return false;
        for (var i7 = 0; i7 < prevDeps.length && i7 < nextDeps.length; i7++)
          if (!objectIs(nextDeps[i7], prevDeps[i7])) return false;
        return true;
      }
      function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
        renderLanes = nextRenderLanes;
        currentlyRenderingFiber = workInProgress2;
        workInProgress2.memoizedState = null;
        workInProgress2.updateQueue = null;
        workInProgress2.lanes = 0;
        ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
        shouldDoubleInvokeUserFnsInHooksDEV = false;
        nextRenderLanes = Component(props, secondArg);
        shouldDoubleInvokeUserFnsInHooksDEV = false;
        didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
          workInProgress2,
          Component,
          props,
          secondArg
        ));
        finishRenderingHooks(current);
        return nextRenderLanes;
      }
      function finishRenderingHooks(current) {
        ReactSharedInternals.H = ContextOnlyDispatcher;
        var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
        renderLanes = 0;
        workInProgressHook = currentHook = currentlyRenderingFiber = null;
        didScheduleRenderPhaseUpdate = false;
        thenableIndexCounter$1 = 0;
        thenableState$1 = null;
        if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
        null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
      }
      function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
        currentlyRenderingFiber = workInProgress2;
        var numberOfReRenders = 0;
        do {
          didScheduleRenderPhaseUpdateDuringThisPass && (thenableState$1 = null);
          thenableIndexCounter$1 = 0;
          didScheduleRenderPhaseUpdateDuringThisPass = false;
          if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
          numberOfReRenders += 1;
          workInProgressHook = currentHook = null;
          if (null != workInProgress2.updateQueue) {
            var children = workInProgress2.updateQueue;
            children.lastEffect = null;
            children.events = null;
            children.stores = null;
            null != children.memoCache && (children.memoCache.index = 0);
          }
          ReactSharedInternals.H = HooksDispatcherOnRerender;
          children = Component(props, secondArg);
        } while (didScheduleRenderPhaseUpdateDuringThisPass);
        return children;
      }
      function TransitionAwareHostComponent() {
        var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
        maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
        dispatcher = dispatcher.useState()[0];
        (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
        return maybeThenable;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = 0 !== localIdCounter;
        localIdCounter = 0;
        return didRenderIdHook;
      }
      function bailoutHooks(current, workInProgress2, lanes) {
        workInProgress2.updateQueue = current.updateQueue;
        workInProgress2.flags &= -2053;
        current.lanes &= ~lanes;
      }
      function resetHooksOnUnwind(workInProgress2) {
        if (didScheduleRenderPhaseUpdate) {
          for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
            var queue = workInProgress2.queue;
            null !== queue && (queue.pending = null);
            workInProgress2 = workInProgress2.next;
          }
          didScheduleRenderPhaseUpdate = false;
        }
        renderLanes = 0;
        workInProgressHook = currentHook = currentlyRenderingFiber = null;
        didScheduleRenderPhaseUpdateDuringThisPass = false;
        thenableIndexCounter$1 = localIdCounter = 0;
        thenableState$1 = null;
      }
      function mountWorkInProgressHook() {
        var hook = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null
        };
        null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
        return workInProgressHook;
      }
      function updateWorkInProgressHook() {
        if (null === currentHook) {
          var nextCurrentHook = currentlyRenderingFiber.alternate;
          nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
        } else nextCurrentHook = currentHook.next;
        var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
        if (null !== nextWorkInProgressHook)
          workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
        else {
          if (null === nextCurrentHook) {
            if (null === currentlyRenderingFiber.alternate)
              throw Error(formatProdErrorMessage(467));
            throw Error(formatProdErrorMessage(310));
          }
          currentHook = nextCurrentHook;
          nextCurrentHook = {
            memoizedState: currentHook.memoizedState,
            baseState: currentHook.baseState,
            baseQueue: currentHook.baseQueue,
            queue: currentHook.queue,
            next: null
          };
          null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
        }
        return workInProgressHook;
      }
      function createFunctionComponentUpdateQueue() {
        return { lastEffect: null, events: null, stores: null, memoCache: null };
      }
      function useThenable(thenable) {
        var index2 = thenableIndexCounter$1;
        thenableIndexCounter$1 += 1;
        null === thenableState$1 && (thenableState$1 = []);
        thenable = trackUsedThenable(thenableState$1, thenable, index2);
        index2 = currentlyRenderingFiber;
        null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
        return thenable;
      }
      function use(usable) {
        if (null !== usable && "object" === typeof usable) {
          if ("function" === typeof usable.then) return useThenable(usable);
          if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
        }
        throw Error(formatProdErrorMessage(438, String(usable)));
      }
      function useMemoCache(size) {
        var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
        null !== updateQueue && (memoCache = updateQueue.memoCache);
        if (null == memoCache) {
          var current = currentlyRenderingFiber.alternate;
          null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
            data: current.data.map(function(array) {
              return array.slice();
            }),
            index: 0
          })));
        }
        null == memoCache && (memoCache = { data: [], index: 0 });
        null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
        updateQueue.memoCache = memoCache;
        updateQueue = memoCache.data[memoCache.index];
        if (void 0 === updateQueue)
          for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
            updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
        memoCache.index++;
        return updateQueue;
      }
      function basicStateReducer(state, action) {
        return "function" === typeof action ? action(state) : action;
      }
      function updateReducer(reducer) {
        var hook = updateWorkInProgressHook();
        return updateReducerImpl(hook, currentHook, reducer);
      }
      function updateReducerImpl(hook, current, reducer) {
        var queue = hook.queue;
        if (null === queue) throw Error(formatProdErrorMessage(311));
        queue.lastRenderedReducer = reducer;
        var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
        if (null !== pendingQueue) {
          if (null !== baseQueue) {
            var baseFirst = baseQueue.next;
            baseQueue.next = pendingQueue.next;
            pendingQueue.next = baseFirst;
          }
          current.baseQueue = baseQueue = pendingQueue;
          queue.pending = null;
        }
        pendingQueue = hook.baseState;
        if (null === baseQueue) hook.memoizedState = pendingQueue;
        else {
          current = baseQueue.next;
          var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$32 = false;
          do {
            var updateLane = update.lane & -536870913;
            if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
              var revertLane = update.revertLane;
              if (0 === revertLane)
                null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
                  lane: 0,
                  revertLane: 0,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$32 = true);
              else if ((renderLanes & revertLane) === revertLane) {
                update = update.next;
                revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$32 = true);
                continue;
              } else
                updateLane = {
                  lane: 0,
                  revertLane: update.revertLane,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
              updateLane = update.action;
              shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
              pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
            } else
              revertLane = {
                lane: updateLane,
                revertLane: update.revertLane,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
            update = update.next;
          } while (null !== update && update !== current);
          null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
          if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$32 && (reducer = currentEntangledActionThenable, null !== reducer)))
            throw reducer;
          hook.memoizedState = pendingQueue;
          hook.baseState = baseFirst;
          hook.baseQueue = newBaseQueueLast;
          queue.lastRenderedState = pendingQueue;
        }
        null === baseQueue && (queue.lanes = 0);
        return [hook.memoizedState, queue.dispatch];
      }
      function rerenderReducer(reducer) {
        var hook = updateWorkInProgressHook(), queue = hook.queue;
        if (null === queue) throw Error(formatProdErrorMessage(311));
        queue.lastRenderedReducer = reducer;
        var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
        if (null !== lastRenderPhaseUpdate) {
          queue.pending = null;
          var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
          do
            newState = reducer(newState, update.action), update = update.next;
          while (update !== lastRenderPhaseUpdate);
          objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
          hook.memoizedState = newState;
          null === hook.baseQueue && (hook.baseState = newState);
          queue.lastRenderedState = newState;
        }
        return [newState, dispatch];
      }
      function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
        if (isHydrating$jscomp$0) {
          if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
          getServerSnapshot = getServerSnapshot();
        } else getServerSnapshot = getSnapshot();
        var snapshotChanged = !objectIs(
          (currentHook || hook).memoizedState,
          getServerSnapshot
        );
        snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
        hook = hook.queue;
        var create = subscribeToStore.bind(null, fiber, hook, subscribe);
        updateEffectImpl(2048, 8, create, [subscribe]);
        if (hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
          fiber.flags |= 2048;
          pushSimpleEffect(
            9,
            createEffectInstance(),
            updateStoreInstance.bind(
              null,
              fiber,
              hook,
              getServerSnapshot,
              getSnapshot
            ),
            null
          );
          if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
          isHydrating$jscomp$0 || 0 !== (renderLanes & 124) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
        }
        return getServerSnapshot;
      }
      function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
        fiber.flags |= 16384;
        fiber = { getSnapshot, value: renderedSnapshot };
        getSnapshot = currentlyRenderingFiber.updateQueue;
        null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
      }
      function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
        inst.value = nextSnapshot;
        inst.getSnapshot = getSnapshot;
        checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      }
      function subscribeToStore(fiber, inst, subscribe) {
        return subscribe(function() {
          checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
        });
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function forceStoreRerender(fiber) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 2);
        null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
      }
      function mountStateImpl(initialState) {
        var hook = mountWorkInProgressHook();
        if ("function" === typeof initialState) {
          var initialStateInitializer = initialState;
          initialState = initialStateInitializer();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              initialStateInitializer();
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
        }
        hook.memoizedState = hook.baseState = initialState;
        hook.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialState
        };
        return hook;
      }
      function updateOptimisticImpl(hook, current, passthrough, reducer) {
        hook.baseState = passthrough;
        return updateReducerImpl(
          hook,
          currentHook,
          "function" === typeof reducer ? reducer : basicStateReducer
        );
      }
      function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
        if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
        fiber = actionQueue.action;
        if (null !== fiber) {
          var actionNode = {
            payload,
            action: fiber,
            next: null,
            isTransition: true,
            status: "pending",
            value: null,
            reason: null,
            listeners: [],
            then: function(listener) {
              actionNode.listeners.push(listener);
            }
          };
          null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
          setState(actionNode);
          setPendingState = actionQueue.pending;
          null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
        }
      }
      function runActionStateAction(actionQueue, node) {
        var action = node.action, payload = node.payload, prevState = actionQueue.state;
        if (node.isTransition) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          try {
            var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            handleActionReturnValue(actionQueue, node, returnValue);
          } catch (error) {
            onActionError(actionQueue, node, error);
          } finally {
            ReactSharedInternals.T = prevTransition;
          }
        } else
          try {
            prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
          } catch (error$38) {
            onActionError(actionQueue, node, error$38);
          }
      }
      function handleActionReturnValue(actionQueue, node, returnValue) {
        null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
          function(nextState) {
            onActionSuccess(actionQueue, node, nextState);
          },
          function(error) {
            return onActionError(actionQueue, node, error);
          }
        ) : onActionSuccess(actionQueue, node, returnValue);
      }
      function onActionSuccess(actionQueue, actionNode, nextState) {
        actionNode.status = "fulfilled";
        actionNode.value = nextState;
        notifyActionListeners(actionNode);
        actionQueue.state = nextState;
        actionNode = actionQueue.pending;
        null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
      }
      function onActionError(actionQueue, actionNode, error) {
        var last = actionQueue.pending;
        actionQueue.pending = null;
        if (null !== last) {
          last = last.next;
          do
            actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
          while (actionNode !== last);
        }
        actionQueue.action = null;
      }
      function notifyActionListeners(actionNode) {
        actionNode = actionNode.listeners;
        for (var i7 = 0; i7 < actionNode.length; i7++) (0, actionNode[i7])();
      }
      function actionStateReducer(oldState, newState) {
        return newState;
      }
      function mountActionState(action, initialStateProp) {
        if (isHydrating) {
          var ssrFormState = workInProgressRoot.formState;
          if (null !== ssrFormState) {
            a: {
              var JSCompiler_inline_result = currentlyRenderingFiber;
              if (isHydrating) {
                if (nextHydratableInstance) {
                  b: {
                    var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                    for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                      if (!inRootOrSingleton) {
                        JSCompiler_inline_result$jscomp$0 = null;
                        break b;
                      }
                      JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                        JSCompiler_inline_result$jscomp$0.nextSibling
                      );
                      if (null === JSCompiler_inline_result$jscomp$0) {
                        JSCompiler_inline_result$jscomp$0 = null;
                        break b;
                      }
                    }
                    inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                    JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
                  }
                  if (JSCompiler_inline_result$jscomp$0) {
                    nextHydratableInstance = getNextHydratable(
                      JSCompiler_inline_result$jscomp$0.nextSibling
                    );
                    JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
                    break a;
                  }
                }
                throwOnHydrationMismatch(JSCompiler_inline_result);
              }
              JSCompiler_inline_result = false;
            }
            JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
          }
        }
        ssrFormState = mountWorkInProgressHook();
        ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
        JSCompiler_inline_result = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: actionStateReducer,
          lastRenderedState: initialStateProp
        };
        ssrFormState.queue = JSCompiler_inline_result;
        ssrFormState = dispatchSetState.bind(
          null,
          currentlyRenderingFiber,
          JSCompiler_inline_result
        );
        JSCompiler_inline_result.dispatch = ssrFormState;
        JSCompiler_inline_result = mountStateImpl(false);
        inRootOrSingleton = dispatchOptimisticSetState.bind(
          null,
          currentlyRenderingFiber,
          false,
          JSCompiler_inline_result.queue
        );
        JSCompiler_inline_result = mountWorkInProgressHook();
        JSCompiler_inline_result$jscomp$0 = {
          state: initialStateProp,
          dispatch: null,
          action,
          pending: null
        };
        JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
        ssrFormState = dispatchActionState.bind(
          null,
          currentlyRenderingFiber,
          JSCompiler_inline_result$jscomp$0,
          inRootOrSingleton,
          ssrFormState
        );
        JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
        JSCompiler_inline_result.memoizedState = action;
        return [initialStateProp, ssrFormState, false];
      }
      function updateActionState(action) {
        var stateHook = updateWorkInProgressHook();
        return updateActionStateImpl(stateHook, currentHook, action);
      }
      function updateActionStateImpl(stateHook, currentStateHook, action) {
        currentStateHook = updateReducerImpl(
          stateHook,
          currentStateHook,
          actionStateReducer
        )[0];
        stateHook = updateReducer(basicStateReducer)[0];
        if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
          try {
            var state = useThenable(currentStateHook);
          } catch (x2) {
            if (x2 === SuspenseException) throw SuspenseActionException;
            throw x2;
          }
        else state = currentStateHook;
        currentStateHook = updateWorkInProgressHook();
        var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
        action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
          9,
          createEffectInstance(),
          actionStateActionEffect.bind(null, actionQueue, action),
          null
        ));
        return [state, dispatch, stateHook];
      }
      function actionStateActionEffect(actionQueue, action) {
        actionQueue.action = action;
      }
      function rerenderActionState(action) {
        var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
        if (null !== currentStateHook)
          return updateActionStateImpl(stateHook, currentStateHook, action);
        updateWorkInProgressHook();
        stateHook = stateHook.memoizedState;
        currentStateHook = updateWorkInProgressHook();
        var dispatch = currentStateHook.queue.dispatch;
        currentStateHook.memoizedState = action;
        return [stateHook, dispatch, false];
      }
      function pushSimpleEffect(tag, inst, create, createDeps) {
        tag = { tag, create, deps: createDeps, inst, next: null };
        inst = currentlyRenderingFiber.updateQueue;
        null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
        create = inst.lastEffect;
        null === create ? inst.lastEffect = tag.next = tag : (createDeps = create.next, create.next = tag, tag.next = createDeps, inst.lastEffect = tag);
        return tag;
      }
      function createEffectInstance() {
        return { destroy: void 0, resource: void 0 };
      }
      function updateRef() {
        return updateWorkInProgressHook().memoizedState;
      }
      function mountEffectImpl(fiberFlags, hookFlags, create, createDeps) {
        var hook = mountWorkInProgressHook();
        createDeps = void 0 === createDeps ? null : createDeps;
        currentlyRenderingFiber.flags |= fiberFlags;
        hook.memoizedState = pushSimpleEffect(
          1 | hookFlags,
          createEffectInstance(),
          create,
          createDeps
        );
      }
      function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var inst = hook.memoizedState.inst;
        null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
          1 | hookFlags,
          inst,
          create,
          deps
        ));
      }
      function mountEffect(create, createDeps) {
        mountEffectImpl(8390656, 8, create, createDeps);
      }
      function updateEffect(create, createDeps) {
        updateEffectImpl(2048, 8, create, createDeps);
      }
      function updateInsertionEffect(create, deps) {
        return updateEffectImpl(4, 2, create, deps);
      }
      function updateLayoutEffect(create, deps) {
        return updateEffectImpl(4, 4, create, deps);
      }
      function imperativeHandleEffect(create, ref) {
        if ("function" === typeof ref) {
          create = create();
          var refCleanup = ref(create);
          return function() {
            "function" === typeof refCleanup ? refCleanup() : ref(null);
          };
        }
        if (null !== ref && void 0 !== ref)
          return create = create(), ref.current = create, function() {
            ref.current = null;
          };
      }
      function updateImperativeHandle(ref, create, deps) {
        deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
        updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
      }
      function mountDebugValue() {
      }
      function updateCallback(callback, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var prevState = hook.memoizedState;
        if (null !== deps && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        hook.memoizedState = [callback, deps];
        return callback;
      }
      function updateMemo(nextCreate, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var prevState = hook.memoizedState;
        if (null !== deps && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        prevState = nextCreate();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        hook.memoizedState = [prevState, deps];
        return prevState;
      }
      function mountDeferredValueImpl(hook, value, initialValue) {
        if (void 0 === initialValue || 0 !== (renderLanes & 1073741824))
          return hook.memoizedState = value;
        hook.memoizedState = initialValue;
        hook = requestDeferredLane();
        currentlyRenderingFiber.lanes |= hook;
        workInProgressRootSkippedLanes |= hook;
        return initialValue;
      }
      function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
        if (objectIs(value, prevValue)) return value;
        if (null !== currentTreeHiddenStackCursor.current)
          return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
        if (0 === (renderLanes & 42))
          return didReceiveUpdate = true, hook.memoizedState = value;
        hook = requestDeferredLane();
        currentlyRenderingFiber.lanes |= hook;
        workInProgressRootSkippedLanes |= hook;
        return prevValue;
      }
      function startTransition(fiber, queue, pendingState, finishedState, callback) {
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        dispatchOptimisticSetState(fiber, false, queue, pendingState);
        try {
          var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
            var thenableForFinishedState = chainThenableValue(
              returnValue,
              finishedState
            );
            dispatchSetStateInternal(
              fiber,
              queue,
              thenableForFinishedState,
              requestUpdateLane(fiber)
            );
          } else
            dispatchSetStateInternal(
              fiber,
              queue,
              finishedState,
              requestUpdateLane(fiber)
            );
        } catch (error) {
          dispatchSetStateInternal(
            fiber,
            queue,
            { then: function() {
            }, status: "rejected", reason: error },
            requestUpdateLane()
          );
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function noop$2() {
      }
      function startHostTransition(formFiber, pendingState, action, formData) {
        if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
        var queue = ensureFormComponentIsStateful(formFiber).queue;
        startTransition(
          formFiber,
          queue,
          pendingState,
          sharedNotPendingObject,
          null === action ? noop$2 : function() {
            requestFormReset$1(formFiber);
            return action(formData);
          }
        );
      }
      function ensureFormComponentIsStateful(formFiber) {
        var existingStateHook = formFiber.memoizedState;
        if (null !== existingStateHook) return existingStateHook;
        existingStateHook = {
          memoizedState: sharedNotPendingObject,
          baseState: sharedNotPendingObject,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: sharedNotPendingObject
          },
          next: null
        };
        var initialResetState = {};
        existingStateHook.next = {
          memoizedState: initialResetState,
          baseState: initialResetState,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: initialResetState
          },
          next: null
        };
        formFiber.memoizedState = existingStateHook;
        formFiber = formFiber.alternate;
        null !== formFiber && (formFiber.memoizedState = existingStateHook);
        return existingStateHook;
      }
      function requestFormReset$1(formFiber) {
        var resetStateQueue = ensureFormComponentIsStateful(formFiber).next.queue;
        dispatchSetStateInternal(formFiber, resetStateQueue, {}, requestUpdateLane());
      }
      function useHostTransitionStatus() {
        return readContext(HostTransitionContext);
      }
      function updateId() {
        return updateWorkInProgressHook().memoizedState;
      }
      function updateRefresh() {
        return updateWorkInProgressHook().memoizedState;
      }
      function refreshCache(fiber) {
        for (var provider = fiber.return; null !== provider; ) {
          switch (provider.tag) {
            case 24:
            case 3:
              var lane = requestUpdateLane();
              fiber = createUpdate(lane);
              var root$41 = enqueueUpdate(provider, fiber, lane);
              null !== root$41 && (scheduleUpdateOnFiber(root$41, provider, lane), entangleTransitions(root$41, provider, lane));
              provider = { cache: createCache() };
              fiber.payload = provider;
              return;
          }
          provider = provider.return;
        }
      }
      function dispatchReducerAction(fiber, queue, action) {
        var lane = requestUpdateLane();
        action = {
          lane,
          revertLane: 0,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
      }
      function dispatchSetState(fiber, queue, action) {
        var lane = requestUpdateLane();
        dispatchSetStateInternal(fiber, queue, action, lane);
      }
      function dispatchSetStateInternal(fiber, queue, action, lane) {
        var update = {
          lane,
          revertLane: 0,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
        else {
          var alternate = fiber.alternate;
          if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
            try {
              var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
              update.hasEagerState = true;
              update.eagerState = eagerState;
              if (objectIs(eagerState, currentState))
                return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
            } catch (error) {
            } finally {
            }
          action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
          if (null !== action)
            return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
        }
        return false;
      }
      function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
        action = {
          lane: 2,
          revertLane: requestTransitionLane(),
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber)) {
          if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
        } else
          throwIfDuringRender = enqueueConcurrentHookUpdate(
            fiber,
            queue,
            action,
            2
          ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
      }
      function isRenderPhaseUpdate(fiber) {
        var alternate = fiber.alternate;
        return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
      }
      function enqueueRenderPhaseUpdate(queue, update) {
        didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
        var pending = queue.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue.pending = update;
      }
      function entangleTransitionUpdate(root2, queue, lane) {
        if (0 !== (lane & 4194048)) {
          var queueLanes = queue.lanes;
          queueLanes &= root2.pendingLanes;
          lane |= queueLanes;
          queue.lanes = lane;
          markRootEntangled(root2, lane);
        }
      }
      var ContextOnlyDispatcher = {
        readContext,
        use,
        useCallback: throwInvalidHookError,
        useContext: throwInvalidHookError,
        useEffect: throwInvalidHookError,
        useImperativeHandle: throwInvalidHookError,
        useLayoutEffect: throwInvalidHookError,
        useInsertionEffect: throwInvalidHookError,
        useMemo: throwInvalidHookError,
        useReducer: throwInvalidHookError,
        useRef: throwInvalidHookError,
        useState: throwInvalidHookError,
        useDebugValue: throwInvalidHookError,
        useDeferredValue: throwInvalidHookError,
        useTransition: throwInvalidHookError,
        useSyncExternalStore: throwInvalidHookError,
        useId: throwInvalidHookError,
        useHostTransitionStatus: throwInvalidHookError,
        useFormState: throwInvalidHookError,
        useActionState: throwInvalidHookError,
        useOptimistic: throwInvalidHookError,
        useMemoCache: throwInvalidHookError,
        useCacheRefresh: throwInvalidHookError
      };
      var HooksDispatcherOnMount = {
        readContext,
        use,
        useCallback: function(callback, deps) {
          mountWorkInProgressHook().memoizedState = [
            callback,
            void 0 === deps ? null : deps
          ];
          return callback;
        },
        useContext: readContext,
        useEffect: mountEffect,
        useImperativeHandle: function(ref, create, deps) {
          deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
          mountEffectImpl(
            4194308,
            4,
            imperativeHandleEffect.bind(null, create, ref),
            deps
          );
        },
        useLayoutEffect: function(create, deps) {
          return mountEffectImpl(4194308, 4, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          mountEffectImpl(4, 2, create, deps);
        },
        useMemo: function(nextCreate, deps) {
          var hook = mountWorkInProgressHook();
          deps = void 0 === deps ? null : deps;
          var nextValue = nextCreate();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              nextCreate();
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
          hook.memoizedState = [nextValue, deps];
          return nextValue;
        },
        useReducer: function(reducer, initialArg, init) {
          var hook = mountWorkInProgressHook();
          if (void 0 !== init) {
            var initialState = init(initialArg);
            if (shouldDoubleInvokeUserFnsInHooksDEV) {
              setIsStrictModeForDevtools(true);
              try {
                init(initialArg);
              } finally {
                setIsStrictModeForDevtools(false);
              }
            }
          } else initialState = initialArg;
          hook.memoizedState = hook.baseState = initialState;
          reducer = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: reducer,
            lastRenderedState: initialState
          };
          hook.queue = reducer;
          reducer = reducer.dispatch = dispatchReducerAction.bind(
            null,
            currentlyRenderingFiber,
            reducer
          );
          return [hook.memoizedState, reducer];
        },
        useRef: function(initialValue) {
          var hook = mountWorkInProgressHook();
          initialValue = { current: initialValue };
          return hook.memoizedState = initialValue;
        },
        useState: function(initialState) {
          initialState = mountStateImpl(initialState);
          var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
          queue.dispatch = dispatch;
          return [initialState.memoizedState, dispatch];
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = mountWorkInProgressHook();
          return mountDeferredValueImpl(hook, value, initialValue);
        },
        useTransition: function() {
          var stateHook = mountStateImpl(false);
          stateHook = startTransition.bind(
            null,
            currentlyRenderingFiber,
            stateHook.queue,
            true,
            false
          );
          mountWorkInProgressHook().memoizedState = stateHook;
          return [false, stateHook];
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
          if (isHydrating) {
            if (void 0 === getServerSnapshot)
              throw Error(formatProdErrorMessage(407));
            getServerSnapshot = getServerSnapshot();
          } else {
            getServerSnapshot = getSnapshot();
            if (null === workInProgressRoot)
              throw Error(formatProdErrorMessage(349));
            0 !== (workInProgressRootRenderLanes & 124) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
          }
          hook.memoizedState = getServerSnapshot;
          var inst = { value: getServerSnapshot, getSnapshot };
          hook.queue = inst;
          mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
            subscribe
          ]);
          fiber.flags |= 2048;
          pushSimpleEffect(
            9,
            createEffectInstance(),
            updateStoreInstance.bind(
              null,
              fiber,
              inst,
              getServerSnapshot,
              getSnapshot
            ),
            null
          );
          return getServerSnapshot;
        },
        useId: function() {
          var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
          if (isHydrating) {
            var JSCompiler_inline_result = treeContextOverflow;
            var idWithLeadingBit = treeContextId;
            JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
            identifierPrefix = "\xAB" + identifierPrefix + "R" + JSCompiler_inline_result;
            JSCompiler_inline_result = localIdCounter++;
            0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
            identifierPrefix += "\xBB";
          } else
            JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "\xAB" + identifierPrefix + "r" + JSCompiler_inline_result.toString(32) + "\xBB";
          return hook.memoizedState = identifierPrefix;
        },
        useHostTransitionStatus,
        useFormState: mountActionState,
        useActionState: mountActionState,
        useOptimistic: function(passthrough) {
          var hook = mountWorkInProgressHook();
          hook.memoizedState = hook.baseState = passthrough;
          var queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null
          };
          hook.queue = queue;
          hook = dispatchOptimisticSetState.bind(
            null,
            currentlyRenderingFiber,
            true,
            queue
          );
          queue.dispatch = hook;
          return [passthrough, hook];
        },
        useMemoCache,
        useCacheRefresh: function() {
          return mountWorkInProgressHook().memoizedState = refreshCache.bind(
            null,
            currentlyRenderingFiber
          );
        }
      };
      var HooksDispatcherOnUpdate = {
        readContext,
        use,
        useCallback: updateCallback,
        useContext: readContext,
        useEffect: updateEffect,
        useImperativeHandle: updateImperativeHandle,
        useInsertionEffect: updateInsertionEffect,
        useLayoutEffect: updateLayoutEffect,
        useMemo: updateMemo,
        useReducer: updateReducer,
        useRef: updateRef,
        useState: function() {
          return updateReducer(basicStateReducer);
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = updateWorkInProgressHook();
          return updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
        },
        useTransition: function() {
          var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
          return [
            "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
            start
          ];
        },
        useSyncExternalStore: updateSyncExternalStore,
        useId: updateId,
        useHostTransitionStatus,
        useFormState: updateActionState,
        useActionState: updateActionState,
        useOptimistic: function(passthrough, reducer) {
          var hook = updateWorkInProgressHook();
          return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
        },
        useMemoCache,
        useCacheRefresh: updateRefresh
      };
      var HooksDispatcherOnRerender = {
        readContext,
        use,
        useCallback: updateCallback,
        useContext: readContext,
        useEffect: updateEffect,
        useImperativeHandle: updateImperativeHandle,
        useInsertionEffect: updateInsertionEffect,
        useLayoutEffect: updateLayoutEffect,
        useMemo: updateMemo,
        useReducer: rerenderReducer,
        useRef: updateRef,
        useState: function() {
          return rerenderReducer(basicStateReducer);
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = updateWorkInProgressHook();
          return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
        },
        useTransition: function() {
          var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
          return [
            "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
            start
          ];
        },
        useSyncExternalStore: updateSyncExternalStore,
        useId: updateId,
        useHostTransitionStatus,
        useFormState: rerenderActionState,
        useActionState: rerenderActionState,
        useOptimistic: function(passthrough, reducer) {
          var hook = updateWorkInProgressHook();
          if (null !== currentHook)
            return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
          hook.baseState = passthrough;
          return [passthrough, hook.queue.dispatch];
        },
        useMemoCache,
        useCacheRefresh: updateRefresh
      };
      var thenableState = null;
      var thenableIndexCounter = 0;
      function unwrapThenable(thenable) {
        var index2 = thenableIndexCounter;
        thenableIndexCounter += 1;
        null === thenableState && (thenableState = []);
        return trackUsedThenable(thenableState, thenable, index2);
      }
      function coerceRef(workInProgress2, element) {
        element = element.props.ref;
        workInProgress2.ref = void 0 !== element ? element : null;
      }
      function throwOnInvalidObjectType(returnFiber, newChild) {
        if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
          throw Error(formatProdErrorMessage(525));
        returnFiber = Object.prototype.toString.call(newChild);
        throw Error(
          formatProdErrorMessage(
            31,
            "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
          )
        );
      }
      function resolveLazy(lazyType) {
        var init = lazyType._init;
        return init(lazyType._payload);
      }
      function createChildReconciler(shouldTrackSideEffects) {
        function deleteChild(returnFiber, childToDelete) {
          if (shouldTrackSideEffects) {
            var deletions = returnFiber.deletions;
            null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
          }
        }
        function deleteRemainingChildren(returnFiber, currentFirstChild) {
          if (!shouldTrackSideEffects) return null;
          for (; null !== currentFirstChild; )
            deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return null;
        }
        function mapRemainingChildren(currentFirstChild) {
          for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
            null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return existingChildren;
        }
        function useFiber(fiber, pendingProps) {
          fiber = createWorkInProgress(fiber, pendingProps);
          fiber.index = 0;
          fiber.sibling = null;
          return fiber;
        }
        function placeChild(newFiber, lastPlacedIndex, newIndex) {
          newFiber.index = newIndex;
          if (!shouldTrackSideEffects)
            return newFiber.flags |= 1048576, lastPlacedIndex;
          newIndex = newFiber.alternate;
          if (null !== newIndex)
            return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
          newFiber.flags |= 67108866;
          return lastPlacedIndex;
        }
        function placeSingleChild(newFiber) {
          shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 67108866);
          return newFiber;
        }
        function updateTextNode(returnFiber, current, textContent, lanes) {
          if (null === current || 6 !== current.tag)
            return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
          current = useFiber(current, textContent);
          current.return = returnFiber;
          return current;
        }
        function updateElement(returnFiber, current, element, lanes) {
          var elementType = element.type;
          if (elementType === REACT_FRAGMENT_TYPE)
            return updateFragment(
              returnFiber,
              current,
              element.props.children,
              lanes,
              element.key
            );
          if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
            return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
          current = createFiberFromTypeAndProps(
            element.type,
            element.key,
            element.props,
            null,
            returnFiber.mode,
            lanes
          );
          coerceRef(current, element);
          current.return = returnFiber;
          return current;
        }
        function updatePortal(returnFiber, current, portal, lanes) {
          if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
            return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
          current = useFiber(current, portal.children || []);
          current.return = returnFiber;
          return current;
        }
        function updateFragment(returnFiber, current, fragment, lanes, key) {
          if (null === current || 7 !== current.tag)
            return current = createFiberFromFragment(
              fragment,
              returnFiber.mode,
              lanes,
              key
            ), current.return = returnFiber, current;
          current = useFiber(current, fragment);
          current.return = returnFiber;
          return current;
        }
        function createChild(returnFiber, newChild, lanes) {
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return newChild = createFiberFromText(
              "" + newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild;
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return lanes = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  lanes
                ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
              case REACT_PORTAL_TYPE:
                return newChild = createFiberFromPortal(
                  newChild,
                  returnFiber.mode,
                  lanes
                ), newChild.return = returnFiber, newChild;
              case REACT_LAZY_TYPE:
                var init = newChild._init;
                newChild = init(newChild._payload);
                return createChild(returnFiber, newChild, lanes);
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return newChild = createFiberFromFragment(
                newChild,
                returnFiber.mode,
                lanes,
                null
              ), newChild.return = returnFiber, newChild;
            if ("function" === typeof newChild.then)
              return createChild(returnFiber, unwrapThenable(newChild), lanes);
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return createChild(
                returnFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectType(returnFiber, newChild);
          }
          return null;
        }
        function updateSlot(returnFiber, oldFiber, newChild, lanes) {
          var key = null !== oldFiber ? oldFiber.key : null;
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_PORTAL_TYPE:
                return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_LAZY_TYPE:
                return key = newChild._init, newChild = key(newChild._payload), updateSlot(returnFiber, oldFiber, newChild, lanes);
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
            if ("function" === typeof newChild.then)
              return updateSlot(
                returnFiber,
                oldFiber,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateSlot(
                returnFiber,
                oldFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectType(returnFiber, newChild);
          }
          return null;
        }
        function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return existingChildren = existingChildren.get(
                  null === newChild.key ? newIdx : newChild.key
                ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
              case REACT_PORTAL_TYPE:
                return existingChildren = existingChildren.get(
                  null === newChild.key ? newIdx : newChild.key
                ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
              case REACT_LAZY_TYPE:
                var init = newChild._init;
                newChild = init(newChild._payload);
                return updateFromMap(
                  existingChildren,
                  returnFiber,
                  newIdx,
                  newChild,
                  lanes
                );
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
            if ("function" === typeof newChild.then)
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectType(returnFiber, newChild);
          }
          return null;
        }
        function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(
              returnFiber,
              oldFiber,
              newChildren[newIdx],
              lanes
            );
            if (null === newFiber) {
              null === oldFiber && (oldFiber = nextOldFiber);
              break;
            }
            shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
            currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
            null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
            previousNewFiber = newFiber;
            oldFiber = nextOldFiber;
          }
          if (newIdx === newChildren.length)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (null === oldFiber) {
            for (; newIdx < newChildren.length; newIdx++)
              oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
                oldFiber,
                currentFirstChild,
                newIdx
              ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
            nextOldFiber = updateFromMap(
              oldFiber,
              returnFiber,
              newIdx,
              newChildren[newIdx],
              lanes
            ), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            ), currentFirstChild = placeChild(
              nextOldFiber,
              currentFirstChild,
              newIdx
            ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
          shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          });
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
          if (null == newChildren) throw Error(formatProdErrorMessage(151));
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
            if (null === newFiber) {
              null === oldFiber && (oldFiber = nextOldFiber);
              break;
            }
            shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
            currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
            null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
            previousNewFiber = newFiber;
            oldFiber = nextOldFiber;
          }
          if (step.done)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (null === oldFiber) {
            for (; !step.done; newIdx++, step = newChildren.next())
              step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
            step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
          shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          });
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
          "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (newChild = newChild.props.children);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                a: {
                  for (var key = newChild.key; null !== currentFirstChild; ) {
                    if (currentFirstChild.key === key) {
                      key = newChild.type;
                      if (key === REACT_FRAGMENT_TYPE) {
                        if (7 === currentFirstChild.tag) {
                          deleteRemainingChildren(
                            returnFiber,
                            currentFirstChild.sibling
                          );
                          lanes = useFiber(
                            currentFirstChild,
                            newChild.props.children
                          );
                          lanes.return = returnFiber;
                          returnFiber = lanes;
                          break a;
                        }
                      } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(currentFirstChild, newChild.props);
                        coerceRef(lanes, newChild);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      }
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    } else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                    newChild.props.children,
                    returnFiber.mode,
                    lanes,
                    newChild.key
                  ), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                    newChild.type,
                    newChild.key,
                    newChild.props,
                    null,
                    returnFiber.mode,
                    lanes
                  ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
                }
                return placeSingleChild(returnFiber);
              case REACT_PORTAL_TYPE:
                a: {
                  for (key = newChild.key; null !== currentFirstChild; ) {
                    if (currentFirstChild.key === key)
                      if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(currentFirstChild, newChild.children || []);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      } else {
                        deleteRemainingChildren(returnFiber, currentFirstChild);
                        break;
                      }
                    else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                }
                return placeSingleChild(returnFiber);
              case REACT_LAZY_TYPE:
                return key = newChild._init, newChild = key(newChild._payload), reconcileChildFibersImpl(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                );
            }
            if (isArrayImpl(newChild))
              return reconcileChildrenArray(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
            if (getIteratorFn(newChild)) {
              key = getIteratorFn(newChild);
              if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
              newChild = key.call(newChild);
              return reconcileChildrenIterator(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
            }
            if ("function" === typeof newChild.then)
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectType(returnFiber, newChild);
          }
          return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
        }
        return function(returnFiber, currentFirstChild, newChild, lanes) {
          try {
            thenableIndexCounter = 0;
            var firstChildFiber = reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
            thenableState = null;
            return firstChildFiber;
          } catch (x2) {
            if (x2 === SuspenseException || x2 === SuspenseActionException) throw x2;
            var fiber = createFiberImplClass(29, x2, null, returnFiber.mode);
            fiber.lanes = lanes;
            fiber.return = returnFiber;
            return fiber;
          } finally {
          }
        };
      }
      var reconcileChildFibers = createChildReconciler(true);
      var mountChildFibers = createChildReconciler(false);
      var suspenseHandlerStackCursor = createCursor(null);
      var shellBoundary = null;
      function pushPrimaryTreeSuspenseHandler(handler) {
        var current = handler.alternate;
        push(suspenseStackCursor, suspenseStackCursor.current & 1);
        push(suspenseHandlerStackCursor, handler);
        null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
      }
      function pushOffscreenSuspenseHandler(fiber) {
        if (22 === fiber.tag) {
          if (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary) {
            var current = fiber.alternate;
            null !== current && null !== current.memoizedState && (shellBoundary = fiber);
          }
        } else reuseSuspenseHandlerOnStack(fiber);
      }
      function reuseSuspenseHandlerOnStack() {
        push(suspenseStackCursor, suspenseStackCursor.current);
        push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
      }
      function popSuspenseHandler(fiber) {
        pop(suspenseHandlerStackCursor);
        shellBoundary === fiber && (shellBoundary = null);
        pop(suspenseStackCursor);
      }
      var suspenseStackCursor = createCursor(0);
      function findFirstSuspended(row) {
        for (var node = row; null !== node; ) {
          if (13 === node.tag) {
            var state = node.memoizedState;
            if (null !== state && (state = state.dehydrated, null === state || "$?" === state.data || isSuspenseInstanceFallback(state)))
              return node;
          } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
            if (0 !== (node.flags & 128)) return node;
          } else if (null !== node.child) {
            node.child.return = node;
            node = node.child;
            continue;
          }
          if (node === row) break;
          for (; null === node.sibling; ) {
            if (null === node.return || node.return === row) return null;
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
        return null;
      }
      function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
        ctor = workInProgress2.memoizedState;
        getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
        getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
        workInProgress2.memoizedState = getDerivedStateFromProps;
        0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
      }
      var classComponentUpdater = {
        enqueueSetState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.payload = payload;
          void 0 !== callback && null !== callback && (update.callback = callback);
          payload = enqueueUpdate(inst, update, lane);
          null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
        },
        enqueueReplaceState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.tag = 1;
          update.payload = payload;
          void 0 !== callback && null !== callback && (update.callback = callback);
          payload = enqueueUpdate(inst, update, lane);
          null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
        },
        enqueueForceUpdate: function(inst, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.tag = 2;
          void 0 !== callback && null !== callback && (update.callback = callback);
          callback = enqueueUpdate(inst, update, lane);
          null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
        }
      };
      function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
        workInProgress2 = workInProgress2.stateNode;
        return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
      }
      function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
        workInProgress2 = instance.state;
        "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
        "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
        instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
      }
      function resolveClassComponentProps(Component, baseProps) {
        var newProps = baseProps;
        if ("ref" in baseProps) {
          newProps = {};
          for (var propName in baseProps)
            "ref" !== propName && (newProps[propName] = baseProps[propName]);
        }
        if (Component = Component.defaultProps) {
          newProps === baseProps && (newProps = assign({}, newProps));
          for (var propName$73 in Component)
            void 0 === newProps[propName$73] && (newProps[propName$73] = Component[propName$73]);
        }
        return newProps;
      }
      var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      };
      function defaultOnUncaughtError(error) {
        reportGlobalError(error);
      }
      function defaultOnCaughtError(error) {
        console.error(error);
      }
      function defaultOnRecoverableError(error) {
        reportGlobalError(error);
      }
      function logUncaughtError(root2, errorInfo) {
        try {
          var onUncaughtError = root2.onUncaughtError;
          onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
        } catch (e$74) {
          setTimeout(function() {
            throw e$74;
          });
        }
      }
      function logCaughtError(root2, boundary, errorInfo) {
        try {
          var onCaughtError = root2.onCaughtError;
          onCaughtError(errorInfo.value, {
            componentStack: errorInfo.stack,
            errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
          });
        } catch (e$75) {
          setTimeout(function() {
            throw e$75;
          });
        }
      }
      function createRootErrorUpdate(root2, errorInfo, lane) {
        lane = createUpdate(lane);
        lane.tag = 3;
        lane.payload = { element: null };
        lane.callback = function() {
          logUncaughtError(root2, errorInfo);
        };
        return lane;
      }
      function createClassErrorUpdate(lane) {
        lane = createUpdate(lane);
        lane.tag = 3;
        return lane;
      }
      function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
        var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
        if ("function" === typeof getDerivedStateFromError) {
          var error = errorInfo.value;
          update.payload = function() {
            return getDerivedStateFromError(error);
          };
          update.callback = function() {
            logCaughtError(root2, fiber, errorInfo);
          };
        }
        var inst = fiber.stateNode;
        null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
          logCaughtError(root2, fiber, errorInfo);
          "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
          var stack = errorInfo.stack;
          this.componentDidCatch(errorInfo.value, {
            componentStack: null !== stack ? stack : ""
          });
        });
      }
      function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
        sourceFiber.flags |= 32768;
        if (null !== value && "object" === typeof value && "function" === typeof value.then) {
          returnFiber = sourceFiber.alternate;
          null !== returnFiber && propagateParentContextChanges(
            returnFiber,
            sourceFiber,
            rootRenderLanes,
            true
          );
          sourceFiber = suspenseHandlerStackCursor.current;
          if (null !== sourceFiber) {
            switch (sourceFiber.tag) {
              case 13:
                return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
              case 22:
                return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: /* @__PURE__ */ new Set([value])
                }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
            }
            throw Error(formatProdErrorMessage(435, sourceFiber.tag));
          }
          attachPingListener(root2, value, rootRenderLanes);
          renderDidSuspendDelayIfPossible();
          return false;
        }
        if (isHydrating)
          return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
            cause: value
          }), queueHydrationError(
            createCapturedValueAtFiber(returnFiber, sourceFiber)
          )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
            root2.stateNode,
            value,
            rootRenderLanes
          ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
        var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
        wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
        null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
        4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
        if (null === returnFiber) return true;
        value = createCapturedValueAtFiber(value, sourceFiber);
        sourceFiber = returnFiber;
        do {
          switch (sourceFiber.tag) {
            case 3:
              return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
            case 1:
              if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
                return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
                  rootRenderLanes,
                  root2,
                  sourceFiber,
                  value
                ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
          }
          sourceFiber = sourceFiber.return;
        } while (null !== sourceFiber);
        return false;
      }
      var SelectiveHydrationException = Error(formatProdErrorMessage(461));
      var didReceiveUpdate = false;
      function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
        workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
          workInProgress2,
          current.child,
          nextChildren,
          renderLanes2
        );
      }
      function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
        Component = Component.render;
        var ref = workInProgress2.ref;
        if ("ref" in nextProps) {
          var propsWithoutRef = {};
          for (var key in nextProps)
            "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
        } else propsWithoutRef = nextProps;
        prepareToReadContext(workInProgress2);
        nextProps = renderWithHooks(
          current,
          workInProgress2,
          Component,
          propsWithoutRef,
          ref,
          renderLanes2
        );
        key = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && key && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        return workInProgress2.child;
      }
      function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (null === current) {
          var type = Component.type;
          if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
            return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
              current,
              workInProgress2,
              type,
              nextProps,
              renderLanes2
            );
          current = createFiberFromTypeAndProps(
            Component.type,
            null,
            nextProps,
            workInProgress2,
            workInProgress2.mode,
            renderLanes2
          );
          current.ref = workInProgress2.ref;
          current.return = workInProgress2;
          return workInProgress2.child = current;
        }
        type = current.child;
        if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
          var prevProps = type.memoizedProps;
          Component = Component.compare;
          Component = null !== Component ? Component : shallowEqual;
          if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
            return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        workInProgress2.flags |= 1;
        current = createWorkInProgress(type, nextProps);
        current.ref = workInProgress2.ref;
        current.return = workInProgress2;
        return workInProgress2.child = current;
      }
      function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (null !== current) {
          var prevProps = current.memoizedProps;
          if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
            if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
              0 !== (current.flags & 131072) && (didReceiveUpdate = true);
            else
              return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        return updateFunctionComponent(
          current,
          workInProgress2,
          Component,
          nextProps,
          renderLanes2
        );
      }
      function updateOffscreenComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
        if ("hidden" === nextProps.mode) {
          if (0 !== (workInProgress2.flags & 128)) {
            nextProps = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
            if (null !== current) {
              nextChildren = workInProgress2.child = current.child;
              for (prevState = 0; null !== nextChildren; )
                prevState = prevState | nextChildren.lanes | nextChildren.childLanes, nextChildren = nextChildren.sibling;
              workInProgress2.childLanes = prevState & ~nextProps;
            } else workInProgress2.childLanes = 0, workInProgress2.child = null;
            return deferHiddenOffscreenComponent(
              current,
              workInProgress2,
              nextProps,
              renderLanes2
            );
          }
          if (0 !== (renderLanes2 & 536870912))
            workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
              workInProgress2,
              null !== prevState ? prevState.cachePool : null
            ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
          else
            return workInProgress2.lanes = workInProgress2.childLanes = 536870912, deferHiddenOffscreenComponent(
              current,
              workInProgress2,
              null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
              renderLanes2
            );
        } else
          null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(workInProgress2), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack(workInProgress2));
        reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
        return workInProgress2.child;
      }
      function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2) {
        var JSCompiler_inline_result = peekCacheFromPool();
        JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
        workInProgress2.memoizedState = {
          baseLanes: nextBaseLanes,
          cachePool: JSCompiler_inline_result
        };
        null !== current && pushTransition(workInProgress2, null);
        reuseHiddenContextOnStack();
        pushOffscreenSuspenseHandler(workInProgress2);
        null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
        return null;
      }
      function markRef(current, workInProgress2) {
        var ref = workInProgress2.ref;
        if (null === ref)
          null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
        else {
          if ("function" !== typeof ref && "object" !== typeof ref)
            throw Error(formatProdErrorMessage(284));
          if (null === current || current.ref !== ref)
            workInProgress2.flags |= 4194816;
        }
      }
      function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        prepareToReadContext(workInProgress2);
        Component = renderWithHooks(
          current,
          workInProgress2,
          Component,
          nextProps,
          void 0,
          renderLanes2
        );
        nextProps = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, Component, renderLanes2);
        return workInProgress2.child;
      }
      function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
        prepareToReadContext(workInProgress2);
        workInProgress2.updateQueue = null;
        nextProps = renderWithHooksAgain(
          workInProgress2,
          Component,
          nextProps,
          secondArg
        );
        finishRenderingHooks(current);
        Component = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && Component && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        return workInProgress2.child;
      }
      function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        prepareToReadContext(workInProgress2);
        if (null === workInProgress2.stateNode) {
          var context = emptyContextObject, contextType = Component.contextType;
          "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
          context = new Component(nextProps, context);
          workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
          context.updater = classComponentUpdater;
          workInProgress2.stateNode = context;
          context._reactInternals = workInProgress2;
          context = workInProgress2.stateNode;
          context.props = nextProps;
          context.state = workInProgress2.memoizedState;
          context.refs = {};
          initializeUpdateQueue(workInProgress2);
          contextType = Component.contextType;
          context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
          context.state = workInProgress2.memoizedState;
          contextType = Component.getDerivedStateFromProps;
          "function" === typeof contextType && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            contextType,
            nextProps
          ), context.state = workInProgress2.memoizedState);
          "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
          "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
          nextProps = true;
        } else if (null === current) {
          context = workInProgress2.stateNode;
          var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
          context.props = oldProps;
          var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
          contextType = emptyContextObject;
          "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
          var getDerivedStateFromProps = Component.getDerivedStateFromProps;
          contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
          unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
          contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
            workInProgress2,
            context,
            nextProps,
            contextType
          );
          hasForceUpdate = false;
          var oldState = workInProgress2.memoizedState;
          context.state = oldState;
          processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
          suspendIfUpdateReadFromEntangledAsyncAction();
          oldContext = workInProgress2.memoizedState;
          unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            getDerivedStateFromProps,
            nextProps
          ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            contextType
          )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
        } else {
          context = workInProgress2.stateNode;
          cloneUpdateQueue(current, workInProgress2);
          contextType = workInProgress2.memoizedProps;
          contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
          context.props = contextType$jscomp$0;
          getDerivedStateFromProps = workInProgress2.pendingProps;
          oldState = context.context;
          oldContext = Component.contextType;
          oldProps = emptyContextObject;
          "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
          unresolvedOldProps = Component.getDerivedStateFromProps;
          (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
            workInProgress2,
            context,
            nextProps,
            oldProps
          );
          hasForceUpdate = false;
          oldState = workInProgress2.memoizedState;
          context.state = oldState;
          processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
          suspendIfUpdateReadFromEntangledAsyncAction();
          var newState = workInProgress2.memoizedState;
          contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            unresolvedOldProps,
            nextProps
          ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            contextType$jscomp$0,
            nextProps,
            oldState,
            newState,
            oldProps
          ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
            nextProps,
            newState,
            oldProps
          )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
        }
        context = nextProps;
        markRef(current, workInProgress2);
        nextProps = 0 !== (workInProgress2.flags & 128);
        context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          current.child,
          null,
          renderLanes2
        ), workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          null,
          Component,
          renderLanes2
        )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
          current,
          workInProgress2,
          renderLanes2
        );
        return current;
      }
      function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
        resetHydrationState();
        workInProgress2.flags |= 256;
        reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
        return workInProgress2.child;
      }
      var SUSPENDED_MARKER = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
      };
      function mountSuspenseOffscreenState(renderLanes2) {
        return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
      }
      function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
        current = null !== current ? current.childLanes & ~renderLanes2 : 0;
        primaryTreeDidDefer && (current |= workInProgressDeferredLane);
        return current;
      }
      function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
        (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
        JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
        JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
        workInProgress2.flags &= -33;
        if (null === current) {
          if (isHydrating) {
            showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack(workInProgress2);
            if (isHydrating) {
              var nextInstance = nextHydratableInstance, JSCompiler_temp$jscomp$0;
              if (JSCompiler_temp$jscomp$0 = nextInstance) {
                c: {
                  JSCompiler_temp$jscomp$0 = nextInstance;
                  for (nextInstance = rootOrSingletonContext; 8 !== JSCompiler_temp$jscomp$0.nodeType; ) {
                    if (!nextInstance) {
                      nextInstance = null;
                      break c;
                    }
                    JSCompiler_temp$jscomp$0 = getNextHydratable(
                      JSCompiler_temp$jscomp$0.nextSibling
                    );
                    if (null === JSCompiler_temp$jscomp$0) {
                      nextInstance = null;
                      break c;
                    }
                  }
                  nextInstance = JSCompiler_temp$jscomp$0;
                }
                null !== nextInstance ? (workInProgress2.memoizedState = {
                  dehydrated: nextInstance,
                  treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }, JSCompiler_temp$jscomp$0 = createFiberImplClass(
                  18,
                  null,
                  null,
                  0
                ), JSCompiler_temp$jscomp$0.stateNode = nextInstance, JSCompiler_temp$jscomp$0.return = workInProgress2, workInProgress2.child = JSCompiler_temp$jscomp$0, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, JSCompiler_temp$jscomp$0 = true) : JSCompiler_temp$jscomp$0 = false;
              }
              JSCompiler_temp$jscomp$0 || throwOnHydrationMismatch(workInProgress2);
            }
            nextInstance = workInProgress2.memoizedState;
            if (null !== nextInstance && (nextInstance = nextInstance.dehydrated, null !== nextInstance))
              return isSuspenseInstanceFallback(nextInstance) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912, null;
            popSuspenseHandler(workInProgress2);
          }
          nextInstance = nextProps.children;
          nextProps = nextProps.fallback;
          if (showFallback)
            return reuseSuspenseHandlerOnStack(workInProgress2), showFallback = workInProgress2.mode, nextInstance = mountWorkInProgressOffscreenFiber(
              { mode: "hidden", children: nextInstance },
              showFallback
            ), nextProps = createFiberFromFragment(
              nextProps,
              showFallback,
              renderLanes2,
              null
            ), nextInstance.return = workInProgress2, nextProps.return = workInProgress2, nextInstance.sibling = nextProps, workInProgress2.child = nextInstance, showFallback = workInProgress2.child, showFallback.memoizedState = mountSuspenseOffscreenState(renderLanes2), showFallback.childLanes = getRemainingWorkInPrimaryTree(
              current,
              JSCompiler_temp,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, nextProps;
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          return mountSuspensePrimaryChildren(workInProgress2, nextInstance);
        }
        JSCompiler_temp$jscomp$0 = current.memoizedState;
        if (null !== JSCompiler_temp$jscomp$0 && (nextInstance = JSCompiler_temp$jscomp$0.dehydrated, null !== nextInstance)) {
          if (didSuspend)
            workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            )) : null !== workInProgress2.memoizedState ? (reuseSuspenseHandlerOnStack(workInProgress2), workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(workInProgress2), showFallback = nextProps.fallback, nextInstance = workInProgress2.mode, nextProps = mountWorkInProgressOffscreenFiber(
              { mode: "visible", children: nextProps.children },
              nextInstance
            ), showFallback = createFiberFromFragment(
              showFallback,
              nextInstance,
              renderLanes2,
              null
            ), showFallback.flags |= 2, nextProps.return = workInProgress2, showFallback.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, reconcileChildFibers(
              workInProgress2,
              current.child,
              null,
              renderLanes2
            ), nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
              current,
              JSCompiler_temp,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = showFallback);
          else if (pushPrimaryTreeSuspenseHandler(workInProgress2), isSuspenseInstanceFallback(nextInstance)) {
            JSCompiler_temp = nextInstance.nextSibling && nextInstance.nextSibling.dataset;
            if (JSCompiler_temp) var digest = JSCompiler_temp.dgst;
            JSCompiler_temp = digest;
            nextProps = Error(formatProdErrorMessage(419));
            nextProps.stack = "";
            nextProps.digest = JSCompiler_temp;
            queueHydrationError({ value: nextProps, source: null, stack: null });
            workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), JSCompiler_temp = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
            JSCompiler_temp = workInProgressRoot;
            if (null !== JSCompiler_temp && (nextProps = renderLanes2 & -renderLanes2, nextProps = 0 !== (nextProps & 42) ? 1 : getBumpedLaneForHydrationByLane(nextProps), nextProps = 0 !== (nextProps & (JSCompiler_temp.suspendedLanes | renderLanes2)) ? 0 : nextProps, 0 !== nextProps && nextProps !== JSCompiler_temp$jscomp$0.retryLane))
              throw JSCompiler_temp$jscomp$0.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
            "$?" === nextInstance.data || renderDidSuspendDelayIfPossible();
            workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else
            "$?" === nextInstance.data ? (workInProgress2.flags |= 192, workInProgress2.child = current.child, workInProgress2 = null) : (current = JSCompiler_temp$jscomp$0.treeContext, nextHydratableInstance = getNextHydratable(
              nextInstance.nextSibling
            ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && (idStack[idStackIndex++] = treeContextId, idStack[idStackIndex++] = treeContextOverflow, idStack[idStackIndex++] = treeContextProvider, treeContextId = current.id, treeContextOverflow = current.overflow, treeContextProvider = workInProgress2), workInProgress2 = mountSuspensePrimaryChildren(
              workInProgress2,
              nextProps.children
            ), workInProgress2.flags |= 4096);
          return workInProgress2;
        }
        if (showFallback)
          return reuseSuspenseHandlerOnStack(workInProgress2), showFallback = nextProps.fallback, nextInstance = workInProgress2.mode, JSCompiler_temp$jscomp$0 = current.child, digest = JSCompiler_temp$jscomp$0.sibling, nextProps = createWorkInProgress(JSCompiler_temp$jscomp$0, {
            mode: "hidden",
            children: nextProps.children
          }), nextProps.subtreeFlags = JSCompiler_temp$jscomp$0.subtreeFlags & 65011712, null !== digest ? showFallback = createWorkInProgress(digest, showFallback) : (showFallback = createFiberFromFragment(
            showFallback,
            nextInstance,
            renderLanes2,
            null
          ), showFallback.flags |= 2), showFallback.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, nextProps = showFallback, showFallback = workInProgress2.child, nextInstance = current.child.memoizedState, null === nextInstance ? nextInstance = mountSuspenseOffscreenState(renderLanes2) : (JSCompiler_temp$jscomp$0 = nextInstance.cachePool, null !== JSCompiler_temp$jscomp$0 ? (digest = CacheContext._currentValue, JSCompiler_temp$jscomp$0 = JSCompiler_temp$jscomp$0.parent !== digest ? { parent: digest, pool: digest } : JSCompiler_temp$jscomp$0) : JSCompiler_temp$jscomp$0 = getSuspendedCache(), nextInstance = {
            baseLanes: nextInstance.baseLanes | renderLanes2,
            cachePool: JSCompiler_temp$jscomp$0
          }), showFallback.memoizedState = nextInstance, showFallback.childLanes = getRemainingWorkInPrimaryTree(
            current,
            JSCompiler_temp,
            renderLanes2
          ), workInProgress2.memoizedState = SUSPENDED_MARKER, nextProps;
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        renderLanes2 = current.child;
        current = renderLanes2.sibling;
        renderLanes2 = createWorkInProgress(renderLanes2, {
          mode: "visible",
          children: nextProps.children
        });
        renderLanes2.return = workInProgress2;
        renderLanes2.sibling = null;
        null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
        workInProgress2.child = renderLanes2;
        workInProgress2.memoizedState = null;
        return renderLanes2;
      }
      function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
        primaryChildren = mountWorkInProgressOffscreenFiber(
          { mode: "visible", children: primaryChildren },
          workInProgress2.mode
        );
        primaryChildren.return = workInProgress2;
        return workInProgress2.child = primaryChildren;
      }
      function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
        offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
        offscreenProps.lanes = 0;
        offscreenProps.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        };
        return offscreenProps;
      }
      function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
        reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
        current = mountSuspensePrimaryChildren(
          workInProgress2,
          workInProgress2.pendingProps.children
        );
        current.flags |= 2;
        workInProgress2.memoizedState = null;
        return current;
      }
      function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
        fiber.lanes |= renderLanes2;
        var alternate = fiber.alternate;
        null !== alternate && (alternate.lanes |= renderLanes2);
        scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
      }
      function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode) {
        var renderState = workInProgress2.memoizedState;
        null === renderState ? workInProgress2.memoizedState = {
          isBackwards,
          rendering: null,
          renderingStartTime: 0,
          last: lastContentRow,
          tail,
          tailMode
        } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode);
      }
      function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
        reconcileChildren(current, workInProgress2, nextProps.children, renderLanes2);
        nextProps = suspenseStackCursor.current;
        if (0 !== (nextProps & 2))
          nextProps = nextProps & 1 | 2, workInProgress2.flags |= 128;
        else {
          if (null !== current && 0 !== (current.flags & 128))
            a: for (current = workInProgress2.child; null !== current; ) {
              if (13 === current.tag)
                null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
              else if (19 === current.tag)
                scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
              else if (null !== current.child) {
                current.child.return = current;
                current = current.child;
                continue;
              }
              if (current === workInProgress2) break a;
              for (; null === current.sibling; ) {
                if (null === current.return || current.return === workInProgress2)
                  break a;
                current = current.return;
              }
              current.sibling.return = current.return;
              current = current.sibling;
            }
          nextProps &= 1;
        }
        push(suspenseStackCursor, nextProps);
        switch (revealOrder) {
          case "forwards":
            renderLanes2 = workInProgress2.child;
            for (revealOrder = null; null !== renderLanes2; )
              current = renderLanes2.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
            renderLanes2 = revealOrder;
            null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null);
            initSuspenseListRenderState(
              workInProgress2,
              false,
              revealOrder,
              renderLanes2,
              tailMode
            );
            break;
          case "backwards":
            renderLanes2 = null;
            revealOrder = workInProgress2.child;
            for (workInProgress2.child = null; null !== revealOrder; ) {
              current = revealOrder.alternate;
              if (null !== current && null === findFirstSuspended(current)) {
                workInProgress2.child = revealOrder;
                break;
              }
              current = revealOrder.sibling;
              revealOrder.sibling = renderLanes2;
              renderLanes2 = revealOrder;
              revealOrder = current;
            }
            initSuspenseListRenderState(
              workInProgress2,
              true,
              renderLanes2,
              null,
              tailMode
            );
            break;
          case "together":
            initSuspenseListRenderState(workInProgress2, false, null, null, void 0);
            break;
          default:
            workInProgress2.memoizedState = null;
        }
        return workInProgress2.child;
      }
      function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
        null !== current && (workInProgress2.dependencies = current.dependencies);
        workInProgressRootSkippedLanes |= workInProgress2.lanes;
        if (0 === (renderLanes2 & workInProgress2.childLanes))
          if (null !== current) {
            if (propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              false
            ), 0 === (renderLanes2 & workInProgress2.childLanes))
              return null;
          } else return null;
        if (null !== current && workInProgress2.child !== current.child)
          throw Error(formatProdErrorMessage(153));
        if (null !== workInProgress2.child) {
          current = workInProgress2.child;
          renderLanes2 = createWorkInProgress(current, current.pendingProps);
          workInProgress2.child = renderLanes2;
          for (renderLanes2.return = workInProgress2; null !== current.sibling; )
            current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
          renderLanes2.sibling = null;
        }
        return workInProgress2.child;
      }
      function checkScheduledUpdateOrContext(current, renderLanes2) {
        if (0 !== (current.lanes & renderLanes2)) return true;
        current = current.dependencies;
        return null !== current && checkIfContextChanged(current) ? true : false;
      }
      function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
        switch (workInProgress2.tag) {
          case 3:
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
            resetHydrationState();
            break;
          case 27:
          case 5:
            pushHostContext(workInProgress2);
            break;
          case 4:
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            break;
          case 10:
            pushProvider(
              workInProgress2,
              workInProgress2.type,
              workInProgress2.memoizedProps.value
            );
            break;
          case 13:
            var state = workInProgress2.memoizedState;
            if (null !== state) {
              if (null !== state.dehydrated)
                return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
              if (0 !== (renderLanes2 & workInProgress2.child.childLanes))
                return updateSuspenseComponent(current, workInProgress2, renderLanes2);
              pushPrimaryTreeSuspenseHandler(workInProgress2);
              current = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              );
              return null !== current ? current.sibling : null;
            }
            pushPrimaryTreeSuspenseHandler(workInProgress2);
            break;
          case 19:
            var didSuspendBefore = 0 !== (current.flags & 128);
            state = 0 !== (renderLanes2 & workInProgress2.childLanes);
            state || (propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              false
            ), state = 0 !== (renderLanes2 & workInProgress2.childLanes));
            if (didSuspendBefore) {
              if (state)
                return updateSuspenseListComponent(
                  current,
                  workInProgress2,
                  renderLanes2
                );
              workInProgress2.flags |= 128;
            }
            didSuspendBefore = workInProgress2.memoizedState;
            null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
            push(suspenseStackCursor, suspenseStackCursor.current);
            if (state) break;
            else return null;
          case 22:
          case 23:
            return workInProgress2.lanes = 0, updateOffscreenComponent(current, workInProgress2, renderLanes2);
          case 24:
            pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
        }
        return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      }
      function beginWork(current, workInProgress2, renderLanes2) {
        if (null !== current)
          if (current.memoizedProps !== workInProgress2.pendingProps)
            didReceiveUpdate = true;
          else {
            if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
              return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
                current,
                workInProgress2,
                renderLanes2
              );
            didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
          }
        else
          didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
        workInProgress2.lanes = 0;
        switch (workInProgress2.tag) {
          case 16:
            a: {
              current = workInProgress2.pendingProps;
              var lazyComponent = workInProgress2.elementType, init = lazyComponent._init;
              lazyComponent = init(lazyComponent._payload);
              workInProgress2.type = lazyComponent;
              if ("function" === typeof lazyComponent)
                shouldConstruct(lazyComponent) ? (current = resolveClassComponentProps(lazyComponent, current), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
                  null,
                  workInProgress2,
                  lazyComponent,
                  current,
                  renderLanes2
                )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
                  null,
                  workInProgress2,
                  lazyComponent,
                  current,
                  renderLanes2
                ));
              else {
                if (void 0 !== lazyComponent && null !== lazyComponent) {
                  if (init = lazyComponent.$$typeof, init === REACT_FORWARD_REF_TYPE) {
                    workInProgress2.tag = 11;
                    workInProgress2 = updateForwardRef(
                      null,
                      workInProgress2,
                      lazyComponent,
                      current,
                      renderLanes2
                    );
                    break a;
                  } else if (init === REACT_MEMO_TYPE) {
                    workInProgress2.tag = 14;
                    workInProgress2 = updateMemoComponent(
                      null,
                      workInProgress2,
                      lazyComponent,
                      current,
                      renderLanes2
                    );
                    break a;
                  }
                }
                workInProgress2 = getComponentNameFromType(lazyComponent) || lazyComponent;
                throw Error(formatProdErrorMessage(306, workInProgress2, ""));
              }
            }
            return workInProgress2;
          case 0:
            return updateFunctionComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 1:
            return lazyComponent = workInProgress2.type, init = resolveClassComponentProps(
              lazyComponent,
              workInProgress2.pendingProps
            ), updateClassComponent(
              current,
              workInProgress2,
              lazyComponent,
              init,
              renderLanes2
            );
          case 3:
            a: {
              pushHostContainer(
                workInProgress2,
                workInProgress2.stateNode.containerInfo
              );
              if (null === current) throw Error(formatProdErrorMessage(387));
              lazyComponent = workInProgress2.pendingProps;
              var prevState = workInProgress2.memoizedState;
              init = prevState.element;
              cloneUpdateQueue(current, workInProgress2);
              processUpdateQueue(workInProgress2, lazyComponent, null, renderLanes2);
              var nextState = workInProgress2.memoizedState;
              lazyComponent = nextState.cache;
              pushProvider(workInProgress2, CacheContext, lazyComponent);
              lazyComponent !== prevState.cache && propagateContextChanges(
                workInProgress2,
                [CacheContext],
                renderLanes2,
                true
              );
              suspendIfUpdateReadFromEntangledAsyncAction();
              lazyComponent = nextState.element;
              if (prevState.isDehydrated)
                if (prevState = {
                  element: lazyComponent,
                  isDehydrated: false,
                  cache: nextState.cache
                }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current,
                    workInProgress2,
                    lazyComponent,
                    renderLanes2
                  );
                  break a;
                } else if (lazyComponent !== init) {
                  init = createCapturedValueAtFiber(
                    Error(formatProdErrorMessage(424)),
                    workInProgress2
                  );
                  queueHydrationError(init);
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current,
                    workInProgress2,
                    lazyComponent,
                    renderLanes2
                  );
                  break a;
                } else {
                  current = workInProgress2.stateNode.containerInfo;
                  switch (current.nodeType) {
                    case 9:
                      current = current.body;
                      break;
                    default:
                      current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
                  }
                  nextHydratableInstance = getNextHydratable(current.firstChild);
                  hydrationParentFiber = workInProgress2;
                  isHydrating = true;
                  hydrationErrors = null;
                  rootOrSingletonContext = true;
                  renderLanes2 = mountChildFibers(
                    workInProgress2,
                    null,
                    lazyComponent,
                    renderLanes2
                  );
                  for (workInProgress2.child = renderLanes2; renderLanes2; )
                    renderLanes2.flags = renderLanes2.flags & -3 | 4096, renderLanes2 = renderLanes2.sibling;
                }
              else {
                resetHydrationState();
                if (lazyComponent === init) {
                  workInProgress2 = bailoutOnAlreadyFinishedWork(
                    current,
                    workInProgress2,
                    renderLanes2
                  );
                  break a;
                }
                reconcileChildren(
                  current,
                  workInProgress2,
                  lazyComponent,
                  renderLanes2
                );
              }
              workInProgress2 = workInProgress2.child;
            }
            return workInProgress2;
          case 26:
            return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
              workInProgress2.type,
              null,
              workInProgress2.pendingProps,
              null
            )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (renderLanes2 = workInProgress2.type, current = workInProgress2.pendingProps, lazyComponent = getOwnerDocumentFromRootContainer(
              rootInstanceStackCursor.current
            ).createElement(renderLanes2), lazyComponent[internalInstanceKey] = workInProgress2, lazyComponent[internalPropsKey] = current, setInitialProperties(lazyComponent, renderLanes2, current), markNodeAsHoistable(lazyComponent), workInProgress2.stateNode = lazyComponent) : workInProgress2.memoizedState = getResource(
              workInProgress2.type,
              current.memoizedProps,
              workInProgress2.pendingProps,
              current.memoizedState
            ), null;
          case 27:
            return pushHostContext(workInProgress2), null === current && isHydrating && (lazyComponent = workInProgress2.stateNode = resolveSingletonInstance(
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootInstanceStackCursor.current
            ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, init = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = init, nextHydratableInstance = getNextHydratable(
              lazyComponent.firstChild
            )) : nextHydratableInstance = init), reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
          case 5:
            if (null === current && isHydrating) {
              if (init = lazyComponent = nextHydratableInstance)
                lazyComponent = canHydrateInstance(
                  lazyComponent,
                  workInProgress2.type,
                  workInProgress2.pendingProps,
                  rootOrSingletonContext
                ), null !== lazyComponent ? (workInProgress2.stateNode = lazyComponent, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(
                  lazyComponent.firstChild
                ), rootOrSingletonContext = false, init = true) : init = false;
              init || throwOnHydrationMismatch(workInProgress2);
            }
            pushHostContext(workInProgress2);
            init = workInProgress2.type;
            prevState = workInProgress2.pendingProps;
            nextState = null !== current ? current.memoizedProps : null;
            lazyComponent = prevState.children;
            shouldSetTextContent(init, prevState) ? lazyComponent = null : null !== nextState && shouldSetTextContent(init, nextState) && (workInProgress2.flags |= 32);
            null !== workInProgress2.memoizedState && (init = renderWithHooks(
              current,
              workInProgress2,
              TransitionAwareHostComponent,
              null,
              null,
              renderLanes2
            ), HostTransitionContext._currentValue = init);
            markRef(current, workInProgress2);
            reconcileChildren(current, workInProgress2, lazyComponent, renderLanes2);
            return workInProgress2.child;
          case 6:
            if (null === current && isHydrating) {
              if (current = renderLanes2 = nextHydratableInstance)
                renderLanes2 = canHydrateTextInstance(
                  renderLanes2,
                  workInProgress2.pendingProps,
                  rootOrSingletonContext
                ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
              current || throwOnHydrationMismatch(workInProgress2);
            }
            return null;
          case 13:
            return updateSuspenseComponent(current, workInProgress2, renderLanes2);
          case 4:
            return pushHostContainer(
              workInProgress2,
              workInProgress2.stateNode.containerInfo
            ), lazyComponent = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
              workInProgress2,
              null,
              lazyComponent,
              renderLanes2
            ) : reconcileChildren(
              current,
              workInProgress2,
              lazyComponent,
              renderLanes2
            ), workInProgress2.child;
          case 11:
            return updateForwardRef(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 7:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps,
              renderLanes2
            ), workInProgress2.child;
          case 8:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 12:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 10:
            return lazyComponent = workInProgress2.pendingProps, pushProvider(workInProgress2, workInProgress2.type, lazyComponent.value), reconcileChildren(
              current,
              workInProgress2,
              lazyComponent.children,
              renderLanes2
            ), workInProgress2.child;
          case 9:
            return init = workInProgress2.type._context, lazyComponent = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), init = readContext(init), lazyComponent = lazyComponent(init), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, lazyComponent, renderLanes2), workInProgress2.child;
          case 14:
            return updateMemoComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 15:
            return updateSimpleMemoComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 19:
            return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
          case 31:
            return lazyComponent = workInProgress2.pendingProps, renderLanes2 = workInProgress2.mode, lazyComponent = {
              mode: lazyComponent.mode,
              children: lazyComponent.children
            }, null === current ? (renderLanes2 = mountWorkInProgressOffscreenFiber(
              lazyComponent,
              renderLanes2
            ), renderLanes2.ref = workInProgress2.ref, workInProgress2.child = renderLanes2, renderLanes2.return = workInProgress2, workInProgress2 = renderLanes2) : (renderLanes2 = createWorkInProgress(current.child, lazyComponent), renderLanes2.ref = workInProgress2.ref, workInProgress2.child = renderLanes2, renderLanes2.return = workInProgress2, workInProgress2 = renderLanes2), workInProgress2;
          case 22:
            return updateOffscreenComponent(current, workInProgress2, renderLanes2);
          case 24:
            return prepareToReadContext(workInProgress2), lazyComponent = readContext(CacheContext), null === current ? (init = peekCacheFromPool(), null === init && (init = workInProgressRoot, prevState = createCache(), init.pooledCache = prevState, prevState.refCount++, null !== prevState && (init.pooledCacheLanes |= renderLanes2), init = prevState), workInProgress2.memoizedState = {
              parent: lazyComponent,
              cache: init
            }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, init)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), init = current.memoizedState, prevState = workInProgress2.memoizedState, init.parent !== lazyComponent ? (init = { parent: lazyComponent, cache: lazyComponent }, workInProgress2.memoizedState = init, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = init), pushProvider(workInProgress2, CacheContext, lazyComponent)) : (lazyComponent = prevState.cache, pushProvider(workInProgress2, CacheContext, lazyComponent), lazyComponent !== init.cache && propagateContextChanges(
              workInProgress2,
              [CacheContext],
              renderLanes2,
              true
            ))), reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 29:
            throw workInProgress2.pendingProps;
        }
        throw Error(formatProdErrorMessage(156, workInProgress2.tag));
      }
      function markUpdate(workInProgress2) {
        workInProgress2.flags |= 4;
      }
      function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
        if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
          workInProgress2.flags &= -16777217;
        else if (workInProgress2.flags |= 16777216, !preloadResource(resource)) {
          resource = suspenseHandlerStackCursor.current;
          if (null !== resource && ((workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null !== shellBoundary : (workInProgressRootRenderLanes & 62914560) !== workInProgressRootRenderLanes && 0 === (workInProgressRootRenderLanes & 536870912) || resource !== shellBoundary))
            throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
          workInProgress2.flags |= 8192;
        }
      }
      function scheduleRetryEffect(workInProgress2, retryQueue) {
        null !== retryQueue && (workInProgress2.flags |= 4);
        workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
      }
      function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
        if (!isHydrating)
          switch (renderState.tailMode) {
            case "hidden":
              hasRenderedATailFallback = renderState.tail;
              for (var lastTailNode = null; null !== hasRenderedATailFallback; )
                null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
              null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
              break;
            case "collapsed":
              lastTailNode = renderState.tail;
              for (var lastTailNode$113 = null; null !== lastTailNode; )
                null !== lastTailNode.alternate && (lastTailNode$113 = lastTailNode), lastTailNode = lastTailNode.sibling;
              null === lastTailNode$113 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$113.sibling = null;
          }
      }
      function bubbleProperties(completedWork) {
        var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
        if (didBailout)
          for (var child$114 = completedWork.child; null !== child$114; )
            newChildLanes |= child$114.lanes | child$114.childLanes, subtreeFlags |= child$114.subtreeFlags & 65011712, subtreeFlags |= child$114.flags & 65011712, child$114.return = completedWork, child$114 = child$114.sibling;
        else
          for (child$114 = completedWork.child; null !== child$114; )
            newChildLanes |= child$114.lanes | child$114.childLanes, subtreeFlags |= child$114.subtreeFlags, subtreeFlags |= child$114.flags, child$114.return = completedWork, child$114 = child$114.sibling;
        completedWork.subtreeFlags |= subtreeFlags;
        completedWork.childLanes = newChildLanes;
        return didBailout;
      }
      function completeWork(current, workInProgress2, renderLanes2) {
        var newProps = workInProgress2.pendingProps;
        popTreeContext(workInProgress2);
        switch (workInProgress2.tag) {
          case 31:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return bubbleProperties(workInProgress2), null;
          case 1:
            return bubbleProperties(workInProgress2), null;
          case 3:
            renderLanes2 = workInProgress2.stateNode;
            newProps = null;
            null !== current && (newProps = current.memoizedState.cache);
            workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
            popProvider(CacheContext);
            popHostContainer();
            renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
            if (null === current || null === current.child)
              popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
            bubbleProperties(workInProgress2);
            return null;
          case 26:
            return renderLanes2 = workInProgress2.memoizedState, null === current ? (markUpdate(workInProgress2), null !== renderLanes2 ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, renderLanes2)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217)) : renderLanes2 ? renderLanes2 !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, renderLanes2)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current.memoizedProps !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217), null;
          case 27:
            popHostContext(workInProgress2);
            renderLanes2 = rootInstanceStackCursor.current;
            var type = workInProgress2.type;
            if (null !== current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (null === workInProgress2.stateNode)
                  throw Error(formatProdErrorMessage(166));
                bubbleProperties(workInProgress2);
                return null;
              }
              current = contextStackCursor.current;
              popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2, current) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
            }
            bubbleProperties(workInProgress2);
            return null;
          case 5:
            popHostContext(workInProgress2);
            renderLanes2 = workInProgress2.type;
            if (null !== current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (null === workInProgress2.stateNode)
                  throw Error(formatProdErrorMessage(166));
                bubbleProperties(workInProgress2);
                return null;
              }
              current = contextStackCursor.current;
              if (popHydrationState(workInProgress2))
                prepareToHydrateHostInstance(workInProgress2, current);
              else {
                type = getOwnerDocumentFromRootContainer(
                  rootInstanceStackCursor.current
                );
                switch (current) {
                  case 1:
                    current = type.createElementNS(
                      "http://www.w3.org/2000/svg",
                      renderLanes2
                    );
                    break;
                  case 2:
                    current = type.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      renderLanes2
                    );
                    break;
                  default:
                    switch (renderLanes2) {
                      case "svg":
                        current = type.createElementNS(
                          "http://www.w3.org/2000/svg",
                          renderLanes2
                        );
                        break;
                      case "math":
                        current = type.createElementNS(
                          "http://www.w3.org/1998/Math/MathML",
                          renderLanes2
                        );
                        break;
                      case "script":
                        current = type.createElement("div");
                        current.innerHTML = "<script><\/script>";
                        current = current.removeChild(current.firstChild);
                        break;
                      case "select":
                        current = "string" === typeof newProps.is ? type.createElement("select", { is: newProps.is }) : type.createElement("select");
                        newProps.multiple ? current.multiple = true : newProps.size && (current.size = newProps.size);
                        break;
                      default:
                        current = "string" === typeof newProps.is ? type.createElement(renderLanes2, { is: newProps.is }) : type.createElement(renderLanes2);
                    }
                }
                current[internalInstanceKey] = workInProgress2;
                current[internalPropsKey] = newProps;
                a: for (type = workInProgress2.child; null !== type; ) {
                  if (5 === type.tag || 6 === type.tag)
                    current.appendChild(type.stateNode);
                  else if (4 !== type.tag && 27 !== type.tag && null !== type.child) {
                    type.child.return = type;
                    type = type.child;
                    continue;
                  }
                  if (type === workInProgress2) break a;
                  for (; null === type.sibling; ) {
                    if (null === type.return || type.return === workInProgress2)
                      break a;
                    type = type.return;
                  }
                  type.sibling.return = type.return;
                  type = type.sibling;
                }
                workInProgress2.stateNode = current;
                a: switch (setInitialProperties(current, renderLanes2, newProps), renderLanes2) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    current = !!newProps.autoFocus;
                    break a;
                  case "img":
                    current = true;
                    break a;
                  default:
                    current = false;
                }
                current && markUpdate(workInProgress2);
              }
            }
            bubbleProperties(workInProgress2);
            workInProgress2.flags &= -16777217;
            return null;
          case 6:
            if (current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if ("string" !== typeof newProps && null === workInProgress2.stateNode)
                throw Error(formatProdErrorMessage(166));
              current = rootInstanceStackCursor.current;
              if (popHydrationState(workInProgress2)) {
                current = workInProgress2.stateNode;
                renderLanes2 = workInProgress2.memoizedProps;
                newProps = null;
                type = hydrationParentFiber;
                if (null !== type)
                  switch (type.tag) {
                    case 27:
                    case 5:
                      newProps = type.memoizedProps;
                  }
                current[internalInstanceKey] = workInProgress2;
                current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
                current || throwOnHydrationMismatch(workInProgress2);
              } else
                current = getOwnerDocumentFromRootContainer(current).createTextNode(
                  newProps
                ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
            }
            bubbleProperties(workInProgress2);
            return null;
          case 13:
            newProps = workInProgress2.memoizedState;
            if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
              type = popHydrationState(workInProgress2);
              if (null !== newProps && null !== newProps.dehydrated) {
                if (null === current) {
                  if (!type) throw Error(formatProdErrorMessage(318));
                  type = workInProgress2.memoizedState;
                  type = null !== type ? type.dehydrated : null;
                  if (!type) throw Error(formatProdErrorMessage(317));
                  type[internalInstanceKey] = workInProgress2;
                } else
                  resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
                bubbleProperties(workInProgress2);
                type = false;
              } else
                type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
              if (!type) {
                if (workInProgress2.flags & 256)
                  return popSuspenseHandler(workInProgress2), workInProgress2;
                popSuspenseHandler(workInProgress2);
                return null;
              }
            }
            popSuspenseHandler(workInProgress2);
            if (0 !== (workInProgress2.flags & 128))
              return workInProgress2.lanes = renderLanes2, workInProgress2;
            renderLanes2 = null !== newProps;
            current = null !== current && null !== current.memoizedState;
            if (renderLanes2) {
              newProps = workInProgress2.child;
              type = null;
              null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool);
              var cache$127 = null;
              null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (cache$127 = newProps.memoizedState.cachePool.pool);
              cache$127 !== type && (newProps.flags |= 2048);
            }
            renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
            scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
            bubbleProperties(workInProgress2);
            return null;
          case 4:
            return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), bubbleProperties(workInProgress2), null;
          case 10:
            return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
          case 19:
            pop(suspenseStackCursor);
            type = workInProgress2.memoizedState;
            if (null === type) return bubbleProperties(workInProgress2), null;
            newProps = 0 !== (workInProgress2.flags & 128);
            cache$127 = type.rendering;
            if (null === cache$127)
              if (newProps) cutOffTailIfNeeded(type, false);
              else {
                if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
                  for (current = workInProgress2.child; null !== current; ) {
                    cache$127 = findFirstSuspended(current);
                    if (null !== cache$127) {
                      workInProgress2.flags |= 128;
                      cutOffTailIfNeeded(type, false);
                      current = cache$127.updateQueue;
                      workInProgress2.updateQueue = current;
                      scheduleRetryEffect(workInProgress2, current);
                      workInProgress2.subtreeFlags = 0;
                      current = renderLanes2;
                      for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                        resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                      push(
                        suspenseStackCursor,
                        suspenseStackCursor.current & 1 | 2
                      );
                      return workInProgress2.child;
                    }
                    current = current.sibling;
                  }
                null !== type.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, newProps = true, cutOffTailIfNeeded(type, false), workInProgress2.lanes = 4194304);
              }
            else {
              if (!newProps)
                if (current = findFirstSuspended(cache$127), null !== current) {
                  if (workInProgress2.flags |= 128, newProps = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(type, true), null === type.tail && "hidden" === type.tailMode && !cache$127.alternate && !isHydrating)
                    return bubbleProperties(workInProgress2), null;
                } else
                  2 * now() - type.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, newProps = true, cutOffTailIfNeeded(type, false), workInProgress2.lanes = 4194304);
              type.isBackwards ? (cache$127.sibling = workInProgress2.child, workInProgress2.child = cache$127) : (current = type.last, null !== current ? current.sibling = cache$127 : workInProgress2.child = cache$127, type.last = cache$127);
            }
            if (null !== type.tail)
              return workInProgress2 = type.tail, type.rendering = workInProgress2, type.tail = workInProgress2.sibling, type.renderingStartTime = now(), workInProgress2.sibling = null, current = suspenseStackCursor.current, push(suspenseStackCursor, newProps ? current & 1 | 2 : current & 1), workInProgress2;
            bubbleProperties(workInProgress2);
            return null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
          case 24:
            return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
          case 25:
            return null;
          case 30:
            return null;
        }
        throw Error(formatProdErrorMessage(156, workInProgress2.tag));
      }
      function unwindWork(current, workInProgress2) {
        popTreeContext(workInProgress2);
        switch (workInProgress2.tag) {
          case 1:
            return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 3:
            return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 26:
          case 27:
          case 5:
            return popHostContext(workInProgress2), null;
          case 13:
            popSuspenseHandler(workInProgress2);
            current = workInProgress2.memoizedState;
            if (null !== current && null !== current.dehydrated) {
              if (null === workInProgress2.alternate)
                throw Error(formatProdErrorMessage(340));
              resetHydrationState();
            }
            current = workInProgress2.flags;
            return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 19:
            return pop(suspenseStackCursor), null;
          case 4:
            return popHostContainer(), null;
          case 10:
            return popProvider(workInProgress2.type), null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 24:
            return popProvider(CacheContext), null;
          case 25:
            return null;
          default:
            return null;
        }
      }
      function unwindInterruptedWork(current, interruptedWork) {
        popTreeContext(interruptedWork);
        switch (interruptedWork.tag) {
          case 3:
            popProvider(CacheContext);
            popHostContainer();
            break;
          case 26:
          case 27:
          case 5:
            popHostContext(interruptedWork);
            break;
          case 4:
            popHostContainer();
            break;
          case 13:
            popSuspenseHandler(interruptedWork);
            break;
          case 19:
            pop(suspenseStackCursor);
            break;
          case 10:
            popProvider(interruptedWork.type);
            break;
          case 22:
          case 23:
            popSuspenseHandler(interruptedWork);
            popHiddenContext();
            null !== current && pop(resumedCache);
            break;
          case 24:
            popProvider(CacheContext);
        }
      }
      function commitHookEffectListMount(flags, finishedWork) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
          if (null !== lastEffect) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                lastEffect = void 0;
                var create = updateQueue.create, inst = updateQueue.inst;
                lastEffect = create();
                inst.destroy = lastEffect;
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
          if (null !== lastEffect) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                var inst = updateQueue.inst, destroy = inst.destroy;
                if (void 0 !== destroy) {
                  inst.destroy = void 0;
                  lastEffect = finishedWork;
                  var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
                  try {
                    destroy_();
                  } catch (error) {
                    captureCommitPhaseError(
                      lastEffect,
                      nearestMountedAncestor,
                      error
                    );
                  }
                }
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitClassCallbacks(finishedWork) {
        var updateQueue = finishedWork.updateQueue;
        if (null !== updateQueue) {
          var instance = finishedWork.stateNode;
          try {
            commitCallbacks(updateQueue, instance);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
        instance.props = resolveClassComponentProps(
          current.type,
          current.memoizedProps
        );
        instance.state = current.memoizedState;
        try {
          instance.componentWillUnmount();
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        }
      }
      function safelyAttachRef(current, nearestMountedAncestor) {
        try {
          var ref = current.ref;
          if (null !== ref) {
            switch (current.tag) {
              case 26:
              case 27:
              case 5:
                var instanceToUse = current.stateNode;
                break;
              case 30:
                instanceToUse = current.stateNode;
                break;
              default:
                instanceToUse = current.stateNode;
            }
            "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
          }
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        }
      }
      function safelyDetachRef(current, nearestMountedAncestor) {
        var ref = current.ref, refCleanup = current.refCleanup;
        if (null !== ref)
          if ("function" === typeof refCleanup)
            try {
              refCleanup();
            } catch (error) {
              captureCommitPhaseError(current, nearestMountedAncestor, error);
            } finally {
              current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
            }
          else if ("function" === typeof ref)
            try {
              ref(null);
            } catch (error$143) {
              captureCommitPhaseError(current, nearestMountedAncestor, error$143);
            }
          else ref.current = null;
      }
      function commitHostMount(finishedWork) {
        var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
        try {
          a: switch (type) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              props.autoFocus && instance.focus();
              break a;
            case "img":
              props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHostUpdate(finishedWork, newProps, oldProps) {
        try {
          var domElement = finishedWork.stateNode;
          updateProperties(domElement, finishedWork.type, oldProps, newProps);
          domElement[internalPropsKey] = newProps;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function isHostParent(fiber) {
        return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
      }
      function getHostSibling(fiber) {
        a: for (; ; ) {
          for (; null === fiber.sibling; ) {
            if (null === fiber.return || isHostParent(fiber.return)) return null;
            fiber = fiber.return;
          }
          fiber.sibling.return = fiber.return;
          for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
            if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
            if (fiber.flags & 2) continue a;
            if (null === fiber.child || 4 === fiber.tag) continue a;
            else fiber.child.return = fiber, fiber = fiber.child;
          }
          if (!(fiber.flags & 2)) return fiber.stateNode;
        }
      }
      function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
        var tag = node.tag;
        if (5 === tag || 6 === tag)
          node = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(node, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(node), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1));
        else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, null !== node))
          for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node; )
            insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
      }
      function insertOrAppendPlacementNode(node, before, parent) {
        var tag = node.tag;
        if (5 === tag || 6 === tag)
          node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
        else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, null !== node))
          for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node; )
            insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
      }
      function commitHostSingletonAcquisition(finishedWork) {
        var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
        try {
          for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
            singleton.removeAttributeNode(attributes[0]);
          setInitialProperties(singleton, type, props);
          singleton[internalInstanceKey] = finishedWork;
          singleton[internalPropsKey] = props;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      var offscreenSubtreeIsHidden = false;
      var offscreenSubtreeWasHidden = false;
      var needsFormReset = false;
      var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
      var nextEffect = null;
      function commitBeforeMutationEffects(root2, firstChild) {
        root2 = root2.containerInfo;
        eventsEnabled = _enabled;
        root2 = getActiveElementDeep(root2);
        if (hasSelectionCapabilities(root2)) {
          if ("selectionStart" in root2)
            var JSCompiler_temp = {
              start: root2.selectionStart,
              end: root2.selectionEnd
            };
          else
            a: {
              JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
              var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
              if (selection && 0 !== selection.rangeCount) {
                JSCompiler_temp = selection.anchorNode;
                var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
                selection = selection.focusOffset;
                try {
                  JSCompiler_temp.nodeType, focusNode.nodeType;
                } catch (e$20) {
                  JSCompiler_temp = null;
                  break a;
                }
                var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
                b: for (; ; ) {
                  for (var next; ; ) {
                    node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                    node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                    3 === node.nodeType && (length += node.nodeValue.length);
                    if (null === (next = node.firstChild)) break;
                    parentNode = node;
                    node = next;
                  }
                  for (; ; ) {
                    if (node === root2) break b;
                    parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                    parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                    if (null !== (next = node.nextSibling)) break;
                    node = parentNode;
                    parentNode = node.parentNode;
                  }
                  node = next;
                }
                JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
              } else JSCompiler_temp = null;
            }
          JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
        } else JSCompiler_temp = null;
        selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
        _enabled = false;
        for (nextEffect = firstChild; null !== nextEffect; )
          if (firstChild = nextEffect, root2 = firstChild.child, 0 !== (firstChild.subtreeFlags & 1024) && null !== root2)
            root2.return = firstChild, nextEffect = root2;
          else
            for (; null !== nextEffect; ) {
              firstChild = nextEffect;
              focusNode = firstChild.alternate;
              root2 = firstChild.flags;
              switch (firstChild.tag) {
                case 0:
                  break;
                case 11:
                case 15:
                  break;
                case 1:
                  if (0 !== (root2 & 1024) && null !== focusNode) {
                    root2 = void 0;
                    JSCompiler_temp = firstChild;
                    anchorOffset = focusNode.memoizedProps;
                    focusNode = focusNode.memoizedState;
                    selection = JSCompiler_temp.stateNode;
                    try {
                      var resolvedPrevProps = resolveClassComponentProps(
                        JSCompiler_temp.type,
                        anchorOffset,
                        JSCompiler_temp.elementType === JSCompiler_temp.type
                      );
                      root2 = selection.getSnapshotBeforeUpdate(
                        resolvedPrevProps,
                        focusNode
                      );
                      selection.__reactInternalSnapshotBeforeUpdate = root2;
                    } catch (error) {
                      captureCommitPhaseError(
                        JSCompiler_temp,
                        JSCompiler_temp.return,
                        error
                      );
                    }
                  }
                  break;
                case 3:
                  if (0 !== (root2 & 1024)) {
                    if (root2 = firstChild.stateNode.containerInfo, JSCompiler_temp = root2.nodeType, 9 === JSCompiler_temp)
                      clearContainerSparingly(root2);
                    else if (1 === JSCompiler_temp)
                      switch (root2.nodeName) {
                        case "HEAD":
                        case "HTML":
                        case "BODY":
                          clearContainerSparingly(root2);
                          break;
                        default:
                          root2.textContent = "";
                      }
                  }
                  break;
                case 5:
                case 26:
                case 27:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  if (0 !== (root2 & 1024)) throw Error(formatProdErrorMessage(163));
              }
              root2 = firstChild.sibling;
              if (null !== root2) {
                root2.return = firstChild.return;
                nextEffect = root2;
                break;
              }
              nextEffect = firstChild.return;
            }
      }
      function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitHookEffectListMount(5, finishedWork);
            break;
          case 1:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            if (flags & 4)
              if (finishedRoot = finishedWork.stateNode, null === current)
                try {
                  finishedRoot.componentDidMount();
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              else {
                var prevProps = resolveClassComponentProps(
                  finishedWork.type,
                  current.memoizedProps
                );
                current = current.memoizedState;
                try {
                  finishedRoot.componentDidUpdate(
                    prevProps,
                    current,
                    finishedRoot.__reactInternalSnapshotBeforeUpdate
                  );
                } catch (error$142) {
                  captureCommitPhaseError(
                    finishedWork,
                    finishedWork.return,
                    error$142
                  );
                }
              }
            flags & 64 && commitClassCallbacks(finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 3:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
              current = null;
              if (null !== finishedWork.child)
                switch (finishedWork.child.tag) {
                  case 27:
                  case 5:
                    current = finishedWork.child.stateNode;
                    break;
                  case 1:
                    current = finishedWork.child.stateNode;
                }
              try {
                commitCallbacks(finishedRoot, current);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 27:
            null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
          case 26:
          case 5:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            null === current && flags & 4 && commitHostMount(finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            break;
          case 13:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
            flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
              null,
              finishedWork
            ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
            break;
          case 22:
            flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
            if (!flags) {
              current = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
              prevProps = offscreenSubtreeIsHidden;
              var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
              offscreenSubtreeIsHidden = flags;
              (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                0 !== (finishedWork.subtreeFlags & 8772)
              ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              offscreenSubtreeIsHidden = prevProps;
              offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
            }
            break;
          case 30:
            break;
          default:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        }
      }
      function detachFiberAfterEffects(fiber) {
        var alternate = fiber.alternate;
        null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
        fiber.child = null;
        fiber.deletions = null;
        fiber.sibling = null;
        5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
        fiber.stateNode = null;
        fiber.return = null;
        fiber.dependencies = null;
        fiber.memoizedProps = null;
        fiber.memoizedState = null;
        fiber.pendingProps = null;
        fiber.stateNode = null;
        fiber.updateQueue = null;
      }
      var hostParent = null;
      var hostParentIsContainer = false;
      function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
        for (parent = parent.child; null !== parent; )
          commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
      }
      function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
        if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
          try {
            injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
          } catch (err) {
          }
        switch (deletedFiber.tag) {
          case 26:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
            break;
          case 27:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
            isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            releaseSingletonInstance(deletedFiber.stateNode);
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 5:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          case 6:
            prevHostParent = hostParent;
            prevHostParentIsContainer = hostParentIsContainer;
            hostParent = null;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            if (null !== hostParent)
              if (hostParentIsContainer)
                try {
                  (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode);
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
              else
                try {
                  hostParent.removeChild(deletedFiber.stateNode);
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
            break;
          case 18:
            null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearSuspenseBoundary(
              9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
              deletedFiber.stateNode
            ), retryIfBlockedOn(finishedRoot)) : clearSuspenseBoundary(hostParent, deletedFiber.stateNode));
            break;
          case 4:
            prevHostParent = hostParent;
            prevHostParentIsContainer = hostParentIsContainer;
            hostParent = deletedFiber.stateNode.containerInfo;
            hostParentIsContainer = true;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            offscreenSubtreeWasHidden || commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
            offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 1:
            offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
              deletedFiber,
              nearestMountedAncestor,
              prevHostParent
            ));
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 21:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 22:
            offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            offscreenSubtreeWasHidden = prevHostParent;
            break;
          default:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
        }
      }
      function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
        if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
          try {
            retryIfBlockedOn(finishedRoot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
      }
      function getRetryCache(finishedWork) {
        switch (finishedWork.tag) {
          case 13:
          case 19:
            var retryCache = finishedWork.stateNode;
            null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
            return retryCache;
          case 22:
            return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
          default:
            throw Error(formatProdErrorMessage(435, finishedWork.tag));
        }
      }
      function attachSuspenseRetryListeners(finishedWork, wakeables) {
        var retryCache = getRetryCache(finishedWork);
        wakeables.forEach(function(wakeable) {
          var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
          retryCache.has(wakeable) || (retryCache.add(wakeable), wakeable.then(retry, retry));
        });
      }
      function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
        var deletions = parentFiber.deletions;
        if (null !== deletions)
          for (var i7 = 0; i7 < deletions.length; i7++) {
            var childToDelete = deletions[i7], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
            a: for (; null !== parent; ) {
              switch (parent.tag) {
                case 27:
                  if (isSingletonScope(parent.type)) {
                    hostParent = parent.stateNode;
                    hostParentIsContainer = false;
                    break a;
                  }
                  break;
                case 5:
                  hostParent = parent.stateNode;
                  hostParentIsContainer = false;
                  break a;
                case 3:
                case 4:
                  hostParent = parent.stateNode.containerInfo;
                  hostParentIsContainer = true;
                  break a;
              }
              parent = parent.return;
            }
            if (null === hostParent) throw Error(formatProdErrorMessage(160));
            commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
            hostParent = null;
            hostParentIsContainer = false;
            root2 = childToDelete.alternate;
            null !== root2 && (root2.return = null);
            childToDelete.return = null;
          }
        if (parentFiber.subtreeFlags & 13878)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
      }
      var currentHoistableRoot = null;
      function commitMutationEffectsOnFiber(finishedWork, root2) {
        var current = finishedWork.alternate, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
            break;
          case 1:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current ? flags : current.concat(flags))));
            break;
          case 26:
            var hoistableRoot = currentHoistableRoot;
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            if (flags & 4) {
              var currentResource = null !== current ? current.memoizedState : null;
              flags = finishedWork.memoizedState;
              if (null === current)
                if (null === flags)
                  if (null === finishedWork.stateNode) {
                    a: {
                      flags = finishedWork.type;
                      current = finishedWork.memoizedProps;
                      hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
                      b: switch (flags) {
                        case "title":
                          currentResource = hoistableRoot.getElementsByTagName("title")[0];
                          if (!currentResource || currentResource[internalHoistableMarker] || currentResource[internalInstanceKey] || "http://www.w3.org/2000/svg" === currentResource.namespaceURI || currentResource.hasAttribute("itemprop"))
                            currentResource = hoistableRoot.createElement(flags), hoistableRoot.head.insertBefore(
                              currentResource,
                              hoistableRoot.querySelector("head > title")
                            );
                          setInitialProperties(currentResource, flags, current);
                          currentResource[internalInstanceKey] = finishedWork;
                          markNodeAsHoistable(currentResource);
                          flags = currentResource;
                          break a;
                        case "link":
                          var maybeNodes = getHydratableHoistableCache(
                            "link",
                            "href",
                            hoistableRoot
                          ).get(flags + (current.href || ""));
                          if (maybeNodes) {
                            for (var i7 = 0; i7 < maybeNodes.length; i7++)
                              if (currentResource = maybeNodes[i7], currentResource.getAttribute("href") === (null == current.href || "" === current.href ? null : current.href) && currentResource.getAttribute("rel") === (null == current.rel ? null : current.rel) && currentResource.getAttribute("title") === (null == current.title ? null : current.title) && currentResource.getAttribute("crossorigin") === (null == current.crossOrigin ? null : current.crossOrigin)) {
                                maybeNodes.splice(i7, 1);
                                break b;
                              }
                          }
                          currentResource = hoistableRoot.createElement(flags);
                          setInitialProperties(currentResource, flags, current);
                          hoistableRoot.head.appendChild(currentResource);
                          break;
                        case "meta":
                          if (maybeNodes = getHydratableHoistableCache(
                            "meta",
                            "content",
                            hoistableRoot
                          ).get(flags + (current.content || ""))) {
                            for (i7 = 0; i7 < maybeNodes.length; i7++)
                              if (currentResource = maybeNodes[i7], currentResource.getAttribute("content") === (null == current.content ? null : "" + current.content) && currentResource.getAttribute("name") === (null == current.name ? null : current.name) && currentResource.getAttribute("property") === (null == current.property ? null : current.property) && currentResource.getAttribute("http-equiv") === (null == current.httpEquiv ? null : current.httpEquiv) && currentResource.getAttribute("charset") === (null == current.charSet ? null : current.charSet)) {
                                maybeNodes.splice(i7, 1);
                                break b;
                              }
                          }
                          currentResource = hoistableRoot.createElement(flags);
                          setInitialProperties(currentResource, flags, current);
                          hoistableRoot.head.appendChild(currentResource);
                          break;
                        default:
                          throw Error(formatProdErrorMessage(468, flags));
                      }
                      currentResource[internalInstanceKey] = finishedWork;
                      markNodeAsHoistable(currentResource);
                      flags = currentResource;
                    }
                    finishedWork.stateNode = flags;
                  } else
                    mountHoistable(
                      hoistableRoot,
                      finishedWork.type,
                      finishedWork.stateNode
                    );
                else
                  finishedWork.stateNode = acquireResource(
                    hoistableRoot,
                    flags,
                    finishedWork.memoizedProps
                  );
              else
                currentResource !== flags ? (null === currentResource ? null !== current.stateNode && (current = current.stateNode, current.parentNode.removeChild(current)) : currentResource.count--, null === flags ? mountHoistable(
                  hoistableRoot,
                  finishedWork.type,
                  finishedWork.stateNode
                ) : acquireResource(
                  hoistableRoot,
                  flags,
                  finishedWork.memoizedProps
                )) : null === flags && null !== finishedWork.stateNode && commitHostUpdate(
                  finishedWork,
                  finishedWork.memoizedProps,
                  current.memoizedProps
                );
            }
            break;
          case 27:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            null !== current && flags & 4 && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current.memoizedProps
            );
            break;
          case 5:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            if (finishedWork.flags & 32) {
              hoistableRoot = finishedWork.stateNode;
              try {
                setTextContent(hoistableRoot, "");
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            flags & 4 && null != finishedWork.stateNode && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(
              finishedWork,
              hoistableRoot,
              null !== current ? current.memoizedProps : hoistableRoot
            ));
            flags & 1024 && (needsFormReset = true);
            break;
          case 6:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            if (flags & 4) {
              if (null === finishedWork.stateNode)
                throw Error(formatProdErrorMessage(162));
              flags = finishedWork.memoizedProps;
              current = finishedWork.stateNode;
              try {
                current.nodeValue = flags;
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 3:
            tagCaches = null;
            hoistableRoot = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(root2.containerInfo);
            recursivelyTraverseMutationEffects(root2, finishedWork);
            currentHoistableRoot = hoistableRoot;
            commitReconciliationEffects(finishedWork);
            if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
              try {
                retryIfBlockedOn(root2.containerInfo);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
            break;
          case 4:
            flags = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(
              finishedWork.stateNode.containerInfo
            );
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            currentHoistableRoot = flags;
            break;
          case 12:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            break;
          case 13:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 22:
            hoistableRoot = null !== finishedWork.memoizedState;
            var wasHidden = null !== current && null !== current.memoizedState, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
            recursivelyTraverseMutationEffects(root2, finishedWork);
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
            commitReconciliationEffects(finishedWork);
            if (flags & 8192)
              a: for (root2 = finishedWork.stateNode, root2._visibility = hoistableRoot ? root2._visibility & -2 : root2._visibility | 1, hoistableRoot && (null === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), current = null, root2 = finishedWork; ; ) {
                if (5 === root2.tag || 26 === root2.tag) {
                  if (null === current) {
                    wasHidden = current = root2;
                    try {
                      if (currentResource = wasHidden.stateNode, hoistableRoot)
                        maybeNodes = currentResource.style, "function" === typeof maybeNodes.setProperty ? maybeNodes.setProperty("display", "none", "important") : maybeNodes.display = "none";
                      else {
                        i7 = wasHidden.stateNode;
                        var styleProp = wasHidden.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
                        i7.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
                      }
                    } catch (error) {
                      captureCommitPhaseError(wasHidden, wasHidden.return, error);
                    }
                  }
                } else if (6 === root2.tag) {
                  if (null === current) {
                    wasHidden = root2;
                    try {
                      wasHidden.stateNode.nodeValue = hoistableRoot ? "" : wasHidden.memoizedProps;
                    } catch (error) {
                      captureCommitPhaseError(wasHidden, wasHidden.return, error);
                    }
                  }
                } else if ((22 !== root2.tag && 23 !== root2.tag || null === root2.memoizedState || root2 === finishedWork) && null !== root2.child) {
                  root2.child.return = root2;
                  root2 = root2.child;
                  continue;
                }
                if (root2 === finishedWork) break a;
                for (; null === root2.sibling; ) {
                  if (null === root2.return || root2.return === finishedWork) break a;
                  current === root2 && (current = null);
                  root2 = root2.return;
                }
                current === root2 && (current = null);
                root2.sibling.return = root2.return;
                root2 = root2.sibling;
              }
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current = flags.retryQueue, null !== current && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
            break;
          case 19:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 30:
            break;
          case 21:
            break;
          default:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork);
        }
      }
      function commitReconciliationEffects(finishedWork) {
        var flags = finishedWork.flags;
        if (flags & 2) {
          try {
            for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
              if (isHostParent(parentFiber)) {
                hostParentFiber = parentFiber;
                break;
              }
              parentFiber = parentFiber.return;
            }
            if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
            switch (hostParentFiber.tag) {
              case 27:
                var parent = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(finishedWork, before, parent);
                break;
              case 5:
                var parent$144 = hostParentFiber.stateNode;
                hostParentFiber.flags & 32 && (setTextContent(parent$144, ""), hostParentFiber.flags &= -33);
                var before$145 = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(finishedWork, before$145, parent$144);
                break;
              case 3:
              case 4:
                var parent$146 = hostParentFiber.stateNode.containerInfo, before$147 = getHostSibling(finishedWork);
                insertOrAppendPlacementNodeIntoContainer(
                  finishedWork,
                  before$147,
                  parent$146
                );
                break;
              default:
                throw Error(formatProdErrorMessage(161));
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
          finishedWork.flags &= -3;
        }
        flags & 4096 && (finishedWork.flags &= -4097);
      }
      function recursivelyResetForms(parentFiber) {
        if (parentFiber.subtreeFlags & 1024)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var fiber = parentFiber;
            recursivelyResetForms(fiber);
            5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
            parentFiber = parentFiber.sibling;
          }
      }
      function recursivelyTraverseLayoutEffects(root2, parentFiber) {
        if (parentFiber.subtreeFlags & 8772)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
      }
      function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var finishedWork = parentFiber;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 1:
              safelyDetachRef(finishedWork, finishedWork.return);
              var instance = finishedWork.stateNode;
              "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
                finishedWork,
                finishedWork.return,
                instance
              );
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 27:
              releaseSingletonInstance(finishedWork.stateNode);
            case 26:
            case 5:
              safelyDetachRef(finishedWork, finishedWork.return);
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 22:
              null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 30:
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            default:
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
        includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              commitHookEffectListMount(4, finishedWork);
              break;
            case 1:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              current = finishedWork;
              finishedRoot = current.stateNode;
              if ("function" === typeof finishedRoot.componentDidMount)
                try {
                  finishedRoot.componentDidMount();
                } catch (error) {
                  captureCommitPhaseError(current, current.return, error);
                }
              current = finishedWork;
              finishedRoot = current.updateQueue;
              if (null !== finishedRoot) {
                var instance = current.stateNode;
                try {
                  var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
                  if (null !== hiddenCallbacks)
                    for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                      callCallback(hiddenCallbacks[finishedRoot], instance);
                } catch (error) {
                  captureCommitPhaseError(current, current.return, error);
                }
              }
              includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 27:
              commitHostSingletonAcquisition(finishedWork);
            case 26:
            case 5:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 12:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              break;
            case 13:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
              break;
            case 22:
              null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 30:
              break;
            default:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function commitOffscreenPassiveMountEffects(current, finishedWork) {
        var previousCache = null;
        null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
        current = null;
        null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
        current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
      }
      function commitCachePassiveMountEffect(current, finishedWork) {
        current = null;
        null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
        finishedWork = finishedWork.memoizedState.cache;
        finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
      }
      function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitPassiveMountOnFiber(
              root2,
              parentFiber,
              committedLanes,
              committedTransitions
            ), parentFiber = parentFiber.sibling;
      }
      function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && commitHookEffectListMount(9, finishedWork);
            break;
          case 1:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 3:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && (finishedRoot = null, null !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, null != finishedRoot && releaseCache(finishedRoot)));
            break;
          case 12:
            if (flags & 2048) {
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              finishedRoot = finishedWork.stateNode;
              try {
                var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
                "function" === typeof onPostCommit && onPostCommit(
                  id,
                  null === finishedWork.alternate ? "mount" : "update",
                  finishedRoot.passiveEffectDuration,
                  -0
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            } else
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
            break;
          case 13:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 23:
            break;
          case 22:
            _finishedWork$memoize2 = finishedWork.stateNode;
            id = finishedWork.alternate;
            null !== finishedWork.memoizedState ? _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              0 !== (finishedWork.subtreeFlags & 10256)
            ));
            flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
            break;
          case 24:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
        }
      }
      function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
        includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 10256);
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
              commitHookEffectListMount(8, finishedWork);
              break;
            case 23:
              break;
            case 22:
              var instance = finishedWork.stateNode;
              null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ) : recursivelyTraverseAtomicPassiveEffects(
                finishedRoot,
                finishedWork
              ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ));
              includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
                finishedWork.alternate,
                finishedWork
              );
              break;
            case 24:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
              break;
            default:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
            switch (finishedWork.tag) {
              case 22:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
                flags & 2048 && commitOffscreenPassiveMountEffects(
                  finishedWork.alternate,
                  finishedWork
                );
                break;
              case 24:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
                flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
                break;
              default:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            }
            parentFiber = parentFiber.sibling;
          }
      }
      var suspenseyCommitFlag = 8192;
      function recursivelyAccumulateSuspenseyCommit(parentFiber) {
        if (parentFiber.subtreeFlags & suspenseyCommitFlag)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            accumulateSuspenseyCommitOnFiber(parentFiber), parentFiber = parentFiber.sibling;
      }
      function accumulateSuspenseyCommitOnFiber(fiber) {
        switch (fiber.tag) {
          case 26:
            recursivelyAccumulateSuspenseyCommit(fiber);
            fiber.flags & suspenseyCommitFlag && null !== fiber.memoizedState && suspendResource(
              currentHoistableRoot,
              fiber.memoizedState,
              fiber.memoizedProps
            );
            break;
          case 5:
            recursivelyAccumulateSuspenseyCommit(fiber);
            break;
          case 3:
          case 4:
            var previousHoistableRoot = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
            recursivelyAccumulateSuspenseyCommit(fiber);
            currentHoistableRoot = previousHoistableRoot;
            break;
          case 22:
            null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber));
            break;
          default:
            recursivelyAccumulateSuspenseyCommit(fiber);
        }
      }
      function detachAlternateSiblings(parentFiber) {
        var previousFiber = parentFiber.alternate;
        if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
          previousFiber.child = null;
          do
            previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
          while (null !== parentFiber);
        }
      }
      function recursivelyTraversePassiveUnmountEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if (0 !== (parentFiber.flags & 16)) {
          if (null !== deletions)
            for (var i7 = 0; i7 < deletions.length; i7++) {
              var childToDelete = deletions[i7];
              nextEffect = childToDelete;
              commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
      }
      function commitPassiveUnmountOnFiber(finishedWork) {
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
            break;
          case 3:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          case 12:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          case 22:
            var instance = finishedWork.stateNode;
            null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          default:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
        }
      }
      function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if (0 !== (parentFiber.flags & 16)) {
          if (null !== deletions)
            for (var i7 = 0; i7 < deletions.length; i7++) {
              var childToDelete = deletions[i7];
              nextEffect = childToDelete;
              commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          deletions = parentFiber;
          switch (deletions.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectListUnmount(8, deletions, deletions.return);
              recursivelyTraverseDisconnectPassiveEffects(deletions);
              break;
            case 22:
              i7 = deletions.stateNode;
              i7._visibility & 2 && (i7._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
              break;
            default:
              recursivelyTraverseDisconnectPassiveEffects(deletions);
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
        for (; null !== nextEffect; ) {
          var fiber = nextEffect;
          switch (fiber.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
              break;
            case 23:
            case 22:
              if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
                var cache = fiber.memoizedState.cachePool.pool;
                null != cache && cache.refCount++;
              }
              break;
            case 24:
              releaseCache(fiber.memoizedState.cache);
          }
          cache = fiber.child;
          if (null !== cache) cache.return = fiber, nextEffect = cache;
          else
            a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
              cache = nextEffect;
              var sibling = cache.sibling, returnFiber = cache.return;
              detachFiberAfterEffects(cache);
              if (cache === fiber) {
                nextEffect = null;
                break a;
              }
              if (null !== sibling) {
                sibling.return = returnFiber;
                nextEffect = sibling;
                break a;
              }
              nextEffect = returnFiber;
            }
        }
      }
      var DefaultAsyncDispatcher = {
        getCacheForType: function(resourceType) {
          var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
          void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
          return cacheForType;
        }
      };
      var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
      var executionContext = 0;
      var workInProgressRoot = null;
      var workInProgress = null;
      var workInProgressRootRenderLanes = 0;
      var workInProgressSuspendedReason = 0;
      var workInProgressThrownValue = null;
      var workInProgressRootDidSkipSuspendedSiblings = false;
      var workInProgressRootIsPrerendering = false;
      var workInProgressRootDidAttachPingListener = false;
      var entangledRenderLanes = 0;
      var workInProgressRootExitStatus = 0;
      var workInProgressRootSkippedLanes = 0;
      var workInProgressRootInterleavedUpdatedLanes = 0;
      var workInProgressRootPingedLanes = 0;
      var workInProgressDeferredLane = 0;
      var workInProgressSuspendedRetryLanes = 0;
      var workInProgressRootConcurrentErrors = null;
      var workInProgressRootRecoverableErrors = null;
      var workInProgressRootDidIncludeRecursiveRenderUpdate = false;
      var globalMostRecentFallbackTime = 0;
      var workInProgressRootRenderTargetTime = Infinity;
      var workInProgressTransitions = null;
      var legacyErrorBoundariesThatAlreadyFailed = null;
      var pendingEffectsStatus = 0;
      var pendingEffectsRoot = null;
      var pendingFinishedWork = null;
      var pendingEffectsLanes = 0;
      var pendingEffectsRemainingLanes = 0;
      var pendingPassiveTransitions = null;
      var pendingRecoverableErrors = null;
      var nestedUpdateCount = 0;
      var rootWithNestedUpdates = null;
      function requestUpdateLane() {
        if (0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes)
          return workInProgressRootRenderLanes & -workInProgressRootRenderLanes;
        if (null !== ReactSharedInternals.T) {
          var actionScopeLane = currentEntangledLane;
          return 0 !== actionScopeLane ? actionScopeLane : requestTransitionLane();
        }
        return resolveUpdatePriority();
      }
      function requestDeferredLane() {
        0 === workInProgressDeferredLane && (workInProgressDeferredLane = 0 === (workInProgressRootRenderLanes & 536870912) || isHydrating ? claimNextTransitionLane() : 536870912);
        var suspenseHandler = suspenseHandlerStackCursor.current;
        null !== suspenseHandler && (suspenseHandler.flags |= 32);
        return workInProgressDeferredLane;
      }
      function scheduleUpdateOnFiber(root2, fiber, lane) {
        if (root2 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
          prepareFreshStack(root2, 0), markRootSuspended(
            root2,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          );
        markRootUpdated$1(root2, lane);
        if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
          root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
            root2,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          )), ensureRootIsScheduled(root2);
      }
      function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
        if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
        var shouldTimeSlice = !forceSync && 0 === (lanes & 124) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
        do {
          if (0 === exitStatus) {
            workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
            break;
          } else {
            forceSync = root$jscomp$0.current.alternate;
            if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
              exitStatus = renderRootSync(root$jscomp$0, lanes, false);
              renderWasConcurrent = false;
              continue;
            }
            if (2 === exitStatus) {
              renderWasConcurrent = lanes;
              if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
                var JSCompiler_inline_result = 0;
              else
                JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
              if (0 !== JSCompiler_inline_result) {
                lanes = JSCompiler_inline_result;
                a: {
                  var root2 = root$jscomp$0;
                  exitStatus = workInProgressRootConcurrentErrors;
                  var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
                  wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
                  JSCompiler_inline_result = renderRootSync(
                    root2,
                    JSCompiler_inline_result,
                    false
                  );
                  if (2 !== JSCompiler_inline_result) {
                    if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                      root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                      workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                      exitStatus = 4;
                      break a;
                    }
                    renderWasConcurrent = workInProgressRootRecoverableErrors;
                    workInProgressRootRecoverableErrors = exitStatus;
                    null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                      workInProgressRootRecoverableErrors,
                      renderWasConcurrent
                    ));
                  }
                  exitStatus = JSCompiler_inline_result;
                }
                renderWasConcurrent = false;
                if (2 !== exitStatus) continue;
              }
            }
            if (1 === exitStatus) {
              prepareFreshStack(root$jscomp$0, 0);
              markRootSuspended(root$jscomp$0, lanes, 0, true);
              break;
            }
            a: {
              shouldTimeSlice = root$jscomp$0;
              renderWasConcurrent = exitStatus;
              switch (renderWasConcurrent) {
                case 0:
                case 1:
                  throw Error(formatProdErrorMessage(345));
                case 4:
                  if ((lanes & 4194048) !== lanes) break;
                case 6:
                  markRootSuspended(
                    shouldTimeSlice,
                    lanes,
                    workInProgressDeferredLane,
                    !workInProgressRootDidSkipSuspendedSiblings
                  );
                  break a;
                case 2:
                  workInProgressRootRecoverableErrors = null;
                  break;
                case 3:
                case 5:
                  break;
                default:
                  throw Error(formatProdErrorMessage(329));
              }
              if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
                markRootSuspended(
                  shouldTimeSlice,
                  lanes,
                  workInProgressDeferredLane,
                  !workInProgressRootDidSkipSuspendedSiblings
                );
                if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
                shouldTimeSlice.timeoutHandle = scheduleTimeout(
                  commitRootWhenReady.bind(
                    null,
                    shouldTimeSlice,
                    forceSync,
                    workInProgressRootRecoverableErrors,
                    workInProgressTransitions,
                    workInProgressRootDidIncludeRecursiveRenderUpdate,
                    lanes,
                    workInProgressDeferredLane,
                    workInProgressRootInterleavedUpdatedLanes,
                    workInProgressSuspendedRetryLanes,
                    workInProgressRootDidSkipSuspendedSiblings,
                    renderWasConcurrent,
                    2,
                    -0,
                    0
                  ),
                  exitStatus
                );
                break a;
              }
              commitRootWhenReady(
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                renderWasConcurrent,
                0,
                -0,
                0
              );
            }
          }
          break;
        } while (1);
        ensureRootIsScheduled(root$jscomp$0);
      }
      function commitRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
        root2.timeoutHandle = -1;
        suspendedCommitReason = finishedWork.subtreeFlags;
        if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
          if (suspendedState = { stylesheets: null, count: 0, unsuspend: noop }, accumulateSuspenseyCommitOnFiber(finishedWork), suspendedCommitReason = waitForCommitToBeReady(), null !== suspendedCommitReason) {
            root2.cancelPendingCommit = suspendedCommitReason(
              commitRoot.bind(
                null,
                root2,
                finishedWork,
                lanes,
                recoverableErrors,
                transitions,
                didIncludeRenderPhaseUpdate,
                spawnedLane,
                updatedLanes,
                suspendedRetryLanes,
                exitStatus,
                1,
                completedRenderStartTime,
                completedRenderEndTime
              )
            );
            markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
            return;
          }
        }
        commitRoot(
          root2,
          finishedWork,
          lanes,
          recoverableErrors,
          transitions,
          didIncludeRenderPhaseUpdate,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes
        );
      }
      function isRenderConsistentWithExternalStores(finishedWork) {
        for (var node = finishedWork; ; ) {
          var tag = node.tag;
          if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
            for (var i7 = 0; i7 < tag.length; i7++) {
              var check = tag[i7], getSnapshot = check.getSnapshot;
              check = check.value;
              try {
                if (!objectIs(getSnapshot(), check)) return false;
              } catch (error) {
                return false;
              }
            }
          tag = node.child;
          if (node.subtreeFlags & 16384 && null !== tag)
            tag.return = node, node = tag;
          else {
            if (node === finishedWork) break;
            for (; null === node.sibling; ) {
              if (null === node.return || node.return === finishedWork) return true;
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        return true;
      }
      function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
        suspendedLanes &= ~workInProgressRootPingedLanes;
        suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
        root2.suspendedLanes |= suspendedLanes;
        root2.pingedLanes &= ~suspendedLanes;
        didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
        didAttemptEntireTree = root2.expirationTimes;
        for (var lanes = suspendedLanes; 0 < lanes; ) {
          var index$4 = 31 - clz32(lanes), lane = 1 << index$4;
          didAttemptEntireTree[index$4] = -1;
          lanes &= ~lane;
        }
        0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
      }
      function flushSyncWork$1() {
        return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0, false), false) : true;
      }
      function resetWorkInProgressStack() {
        if (null !== workInProgress) {
          if (0 === workInProgressSuspendedReason)
            var interruptedWork = workInProgress.return;
          else
            interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState = null, thenableIndexCounter = 0, interruptedWork = workInProgress;
          for (; null !== interruptedWork; )
            unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
          workInProgress = null;
        }
      }
      function prepareFreshStack(root2, lanes) {
        var timeoutHandle = root2.timeoutHandle;
        -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
        timeoutHandle = root2.cancelPendingCommit;
        null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
        resetWorkInProgressStack();
        workInProgressRoot = root2;
        workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
        workInProgressRootRenderLanes = lanes;
        workInProgressSuspendedReason = 0;
        workInProgressThrownValue = null;
        workInProgressRootDidSkipSuspendedSiblings = false;
        workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
        workInProgressRootDidAttachPingListener = false;
        workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
        workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
        workInProgressRootDidIncludeRecursiveRenderUpdate = false;
        0 !== (lanes & 8) && (lanes |= lanes & 32);
        var allEntangledLanes = root2.entangledLanes;
        if (0 !== allEntangledLanes)
          for (root2 = root2.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
            var index$2 = 31 - clz32(allEntangledLanes), lane = 1 << index$2;
            lanes |= root2[index$2];
            allEntangledLanes &= ~lane;
          }
        entangledRenderLanes = lanes;
        finishQueueingConcurrentUpdates();
        return timeoutHandle;
      }
      function handleThrow(root2, thrownValue) {
        currentlyRenderingFiber = null;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
        workInProgressThrownValue = thrownValue;
        null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
          root2,
          createCapturedValueAtFiber(thrownValue, root2.current)
        ));
      }
      function pushDispatcher() {
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
      }
      function pushAsyncDispatcher() {
        var prevAsyncDispatcher = ReactSharedInternals.A;
        ReactSharedInternals.A = DefaultAsyncDispatcher;
        return prevAsyncDispatcher;
      }
      function renderDidSuspendDelayIfPossible() {
        workInProgressRootExitStatus = 4;
        workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
        0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
          workInProgressRoot,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          false
        );
      }
      function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
        var prevExecutionContext = executionContext;
        executionContext |= 2;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
          workInProgressTransitions = null, prepareFreshStack(root2, lanes);
        lanes = false;
        var exitStatus = workInProgressRootExitStatus;
        a: do
          try {
            if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
              var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
              switch (workInProgressSuspendedReason) {
                case 8:
                  resetWorkInProgressStack();
                  exitStatus = 6;
                  break a;
                case 3:
                case 2:
                case 9:
                case 6:
                  null === suspenseHandlerStackCursor.current && (lanes = true);
                  var reason = workInProgressSuspendedReason;
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
                  if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                    exitStatus = 0;
                    break a;
                  }
                  break;
                default:
                  reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              }
            }
            workLoopSync();
            exitStatus = workInProgressRootExitStatus;
            break;
          } catch (thrownValue$167) {
            handleThrow(root2, thrownValue$167);
          }
        while (1);
        lanes && root2.shellSuspendCounter++;
        lastContextDependency = currentlyRenderingFiber$1 = null;
        executionContext = prevExecutionContext;
        ReactSharedInternals.H = prevDispatcher;
        ReactSharedInternals.A = prevAsyncDispatcher;
        null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
        return exitStatus;
      }
      function workLoopSync() {
        for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
      }
      function renderRootConcurrent(root2, lanes) {
        var prevExecutionContext = executionContext;
        executionContext |= 2;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
          root2,
          lanes
        );
        a: do
          try {
            if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
              lanes = workInProgress;
              var thrownValue = workInProgressThrownValue;
              b: switch (workInProgressSuspendedReason) {
                case 1:
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
                  break;
                case 2:
                case 9:
                  if (isThenableResolved(thrownValue)) {
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    replaySuspendedUnitOfWork(lanes);
                    break;
                  }
                  lanes = function() {
                    2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
                    ensureRootIsScheduled(root2);
                  };
                  thrownValue.then(lanes, lanes);
                  break a;
                case 3:
                  workInProgressSuspendedReason = 7;
                  break a;
                case 4:
                  workInProgressSuspendedReason = 5;
                  break a;
                case 7:
                  isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
                  break;
                case 5:
                  var resource = null;
                  switch (workInProgress.tag) {
                    case 26:
                      resource = workInProgress.memoizedState;
                    case 5:
                    case 27:
                      var hostFiber = workInProgress;
                      if (resource ? preloadResource(resource) : 1) {
                        workInProgressSuspendedReason = 0;
                        workInProgressThrownValue = null;
                        var sibling = hostFiber.sibling;
                        if (null !== sibling) workInProgress = sibling;
                        else {
                          var returnFiber = hostFiber.return;
                          null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                        }
                        break b;
                      }
                  }
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
                  break;
                case 6:
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
                  break;
                case 8:
                  resetWorkInProgressStack();
                  workInProgressRootExitStatus = 6;
                  break a;
                default:
                  throw Error(formatProdErrorMessage(462));
              }
            }
            workLoopConcurrentByScheduler();
            break;
          } catch (thrownValue$169) {
            handleThrow(root2, thrownValue$169);
          }
        while (1);
        lastContextDependency = currentlyRenderingFiber$1 = null;
        ReactSharedInternals.H = prevDispatcher;
        ReactSharedInternals.A = prevAsyncDispatcher;
        executionContext = prevExecutionContext;
        if (null !== workInProgress) return 0;
        workInProgressRoot = null;
        workInProgressRootRenderLanes = 0;
        finishQueueingConcurrentUpdates();
        return workInProgressRootExitStatus;
      }
      function workLoopConcurrentByScheduler() {
        for (; null !== workInProgress && !shouldYield(); )
          performUnitOfWork(workInProgress);
      }
      function performUnitOfWork(unitOfWork) {
        var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function replaySuspendedUnitOfWork(unitOfWork) {
        var next = unitOfWork;
        var current = next.alternate;
        switch (next.tag) {
          case 15:
          case 0:
            next = replayFunctionComponent(
              current,
              next,
              next.pendingProps,
              next.type,
              void 0,
              workInProgressRootRenderLanes
            );
            break;
          case 11:
            next = replayFunctionComponent(
              current,
              next,
              next.pendingProps,
              next.type.render,
              next.ref,
              workInProgressRootRenderLanes
            );
            break;
          case 5:
            resetHooksOnUnwind(next);
          default:
            unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
        }
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
        lastContextDependency = currentlyRenderingFiber$1 = null;
        resetHooksOnUnwind(unitOfWork);
        thenableState = null;
        thenableIndexCounter = 0;
        var returnFiber = unitOfWork.return;
        try {
          if (throwException(
            root2,
            returnFiber,
            unitOfWork,
            thrownValue,
            workInProgressRootRenderLanes
          )) {
            workInProgressRootExitStatus = 1;
            logUncaughtError(
              root2,
              createCapturedValueAtFiber(thrownValue, root2.current)
            );
            workInProgress = null;
            return;
          }
        } catch (error) {
          if (null !== returnFiber) throw workInProgress = returnFiber, error;
          workInProgressRootExitStatus = 1;
          logUncaughtError(
            root2,
            createCapturedValueAtFiber(thrownValue, root2.current)
          );
          workInProgress = null;
          return;
        }
        if (unitOfWork.flags & 32768) {
          if (isHydrating || 1 === suspendedReason) root2 = true;
          else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
            root2 = false;
          else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
            suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
          unwindUnitOfWork(unitOfWork, root2);
        } else completeUnitOfWork(unitOfWork);
      }
      function completeUnitOfWork(unitOfWork) {
        var completedWork = unitOfWork;
        do {
          if (0 !== (completedWork.flags & 32768)) {
            unwindUnitOfWork(
              completedWork,
              workInProgressRootDidSkipSuspendedSiblings
            );
            return;
          }
          unitOfWork = completedWork.return;
          var next = completeWork(
            completedWork.alternate,
            completedWork,
            entangledRenderLanes
          );
          if (null !== next) {
            workInProgress = next;
            return;
          }
          completedWork = completedWork.sibling;
          if (null !== completedWork) {
            workInProgress = completedWork;
            return;
          }
          workInProgress = completedWork = unitOfWork;
        } while (null !== completedWork);
        0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
      }
      function unwindUnitOfWork(unitOfWork, skipSiblings) {
        do {
          var next = unwindWork(unitOfWork.alternate, unitOfWork);
          if (null !== next) {
            next.flags &= 32767;
            workInProgress = next;
            return;
          }
          next = unitOfWork.return;
          null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
          if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
            workInProgress = unitOfWork;
            return;
          }
          workInProgress = unitOfWork = next;
        } while (null !== unitOfWork);
        workInProgressRootExitStatus = 6;
        workInProgress = null;
      }
      function commitRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
        root2.cancelPendingCommit = null;
        do
          flushPendingEffects();
        while (0 !== pendingEffectsStatus);
        if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
        if (null !== finishedWork) {
          if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
          didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
          didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
          markRootFinished(
            root2,
            lanes,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes
          );
          root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
          pendingFinishedWork = finishedWork;
          pendingEffectsRoot = root2;
          pendingEffectsLanes = lanes;
          pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
          pendingPassiveTransitions = transitions;
          pendingRecoverableErrors = recoverableErrors;
          0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
            flushPassiveEffects(true);
            return null;
          })) : (root2.callbackNode = null, root2.callbackPriority = 0);
          recoverableErrors = 0 !== (finishedWork.flags & 13878);
          if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
            recoverableErrors = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            transitions = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            spawnedLane = executionContext;
            executionContext |= 4;
            try {
              commitBeforeMutationEffects(root2, finishedWork, lanes);
            } finally {
              executionContext = spawnedLane, ReactDOMSharedInternals.p = transitions, ReactSharedInternals.T = recoverableErrors;
            }
          }
          pendingEffectsStatus = 1;
          flushMutationEffects();
          flushLayoutEffects();
          flushSpawnedWork();
        }
      }
      function flushMutationEffects() {
        if (1 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
          if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
            rootMutationHasEffect = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            try {
              commitMutationEffectsOnFiber(finishedWork, root2);
              var priorSelectionInformation = selectionInformation, curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = priorSelectionInformation.focusedElem, priorSelectionRange = priorSelectionInformation.selectionRange;
              if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
                priorFocusedElem.ownerDocument.documentElement,
                priorFocusedElem
              )) {
                if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
                  var start = priorSelectionRange.start, end = priorSelectionRange.end;
                  void 0 === end && (end = start);
                  if ("selectionStart" in priorFocusedElem)
                    priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                      end,
                      priorFocusedElem.value.length
                    );
                  else {
                    var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                    if (win.getSelection) {
                      var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                      !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                      var startMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        start$jscomp$0
                      ), endMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        end$jscomp$0
                      );
                      if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                        var range = doc.createRange();
                        range.setStart(startMarker.node, startMarker.offset);
                        selection.removeAllRanges();
                        start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                      }
                    }
                  }
                }
                doc = [];
                for (selection = priorFocusedElem; selection = selection.parentNode; )
                  1 === selection.nodeType && doc.push({
                    element: selection,
                    left: selection.scrollLeft,
                    top: selection.scrollTop
                  });
                "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
                for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
                  var info = doc[priorFocusedElem];
                  info.element.scrollLeft = info.left;
                  info.element.scrollTop = info.top;
                }
              }
              _enabled = !!eventsEnabled;
              selectionInformation = eventsEnabled = null;
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
            }
          }
          root2.current = finishedWork;
          pendingEffectsStatus = 2;
        }
      }
      function flushLayoutEffects() {
        if (2 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
          if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
            rootHasLayoutEffect = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            try {
              commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
            }
          }
          pendingEffectsStatus = 3;
        }
      }
      function flushSpawnedWork() {
        if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          requestPaint();
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors;
          0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
          var remainingLanes = root2.pendingLanes;
          0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
          lanesToEventPriority(lanes);
          finishedWork = finishedWork.stateNode;
          if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
            try {
              injectedHook.onCommitFiberRoot(
                rendererID,
                finishedWork,
                void 0,
                128 === (finishedWork.current.flags & 128)
              );
            } catch (err) {
            }
          if (null !== recoverableErrors) {
            finishedWork = ReactSharedInternals.T;
            remainingLanes = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            ReactSharedInternals.T = null;
            try {
              for (var onRecoverableError = root2.onRecoverableError, i7 = 0; i7 < recoverableErrors.length; i7++) {
                var recoverableError = recoverableErrors[i7];
                onRecoverableError(recoverableError.value, {
                  componentStack: recoverableError.stack
                });
              }
            } finally {
              ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = remainingLanes;
            }
          }
          0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
          ensureRootIsScheduled(root2);
          remainingLanes = root2.pendingLanes;
          0 !== (lanes & 4194090) && 0 !== (remainingLanes & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : nestedUpdateCount = 0;
          flushSyncWorkAcrossRoots_impl(0, false);
        }
      }
      function releaseRootPooledCache(root2, remainingLanes) {
        0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
      }
      function flushPendingEffects(wasDelayedCommit) {
        flushMutationEffects();
        flushLayoutEffects();
        flushSpawnedWork();
        return flushPassiveEffects(wasDelayedCommit);
      }
      function flushPassiveEffects() {
        if (5 !== pendingEffectsStatus) return false;
        var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
        pendingEffectsRemainingLanes = 0;
        var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
          ReactSharedInternals.T = null;
          renderPriority = pendingPassiveTransitions;
          pendingPassiveTransitions = null;
          var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
          pendingEffectsStatus = 0;
          pendingFinishedWork = pendingEffectsRoot = null;
          pendingEffectsLanes = 0;
          if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          commitPassiveUnmountOnFiber(root$jscomp$0.current);
          commitPassiveMountOnFiber(
            root$jscomp$0,
            root$jscomp$0.current,
            lanes,
            renderPriority
          );
          executionContext = prevExecutionContext;
          flushSyncWorkAcrossRoots_impl(0, false);
          if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
            try {
              injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
            } catch (err) {
            }
          return true;
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
        }
      }
      function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
        sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
        sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
        rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
        null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
      }
      function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
        if (3 === sourceFiber.tag)
          captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
        else
          for (; null !== nearestMountedAncestor; ) {
            if (3 === nearestMountedAncestor.tag) {
              captureCommitPhaseErrorOnRoot(
                nearestMountedAncestor,
                sourceFiber,
                error
              );
              break;
            } else if (1 === nearestMountedAncestor.tag) {
              var instance = nearestMountedAncestor.stateNode;
              if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
                sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
                error = createClassErrorUpdate(2);
                instance = enqueueUpdate(nearestMountedAncestor, error, 2);
                null !== instance && (initializeClassErrorUpdate(
                  error,
                  instance,
                  nearestMountedAncestor,
                  sourceFiber
                ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
                break;
              }
            }
            nearestMountedAncestor = nearestMountedAncestor.return;
          }
      }
      function attachPingListener(root2, wakeable, lanes) {
        var pingCache = root2.pingCache;
        if (null === pingCache) {
          pingCache = root2.pingCache = new PossiblyWeakMap();
          var threadIDs = /* @__PURE__ */ new Set();
          pingCache.set(wakeable, threadIDs);
        } else
          threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
        threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
      }
      function pingSuspendedRoot(root2, wakeable, pingedLanes) {
        var pingCache = root2.pingCache;
        null !== pingCache && pingCache.delete(wakeable);
        root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
        root2.warmLanes &= ~pingedLanes;
        workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
        ensureRootIsScheduled(root2);
      }
      function retryTimedOutBoundary(boundaryFiber, retryLane) {
        0 === retryLane && (retryLane = claimNextRetryLane());
        boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
        null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
      }
      function retryDehydratedSuspenseBoundary(boundaryFiber) {
        var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
        null !== suspenseState && (retryLane = suspenseState.retryLane);
        retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function resolveRetryWakeable(boundaryFiber, wakeable) {
        var retryLane = 0;
        switch (boundaryFiber.tag) {
          case 13:
            var retryCache = boundaryFiber.stateNode;
            var suspenseState = boundaryFiber.memoizedState;
            null !== suspenseState && (retryLane = suspenseState.retryLane);
            break;
          case 19:
            retryCache = boundaryFiber.stateNode;
            break;
          case 22:
            retryCache = boundaryFiber.stateNode._retryCache;
            break;
          default:
            throw Error(formatProdErrorMessage(314));
        }
        null !== retryCache && retryCache.delete(wakeable);
        retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function scheduleCallback$1(priorityLevel, callback) {
        return scheduleCallback$3(priorityLevel, callback);
      }
      var firstScheduledRoot = null;
      var lastScheduledRoot = null;
      var didScheduleMicrotask = false;
      var mightHavePendingSyncWork = false;
      var isFlushingWork = false;
      var currentEventTransitionLane = 0;
      function ensureRootIsScheduled(root2) {
        root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
        mightHavePendingSyncWork = true;
        didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
      }
      function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
        if (!isFlushingWork && mightHavePendingSyncWork) {
          isFlushingWork = true;
          do {
            var didPerformSomeWork = false;
            for (var root$174 = firstScheduledRoot; null !== root$174; ) {
              if (!onlyLegacy)
                if (0 !== syncTransitionLanes) {
                  var pendingLanes = root$174.pendingLanes;
                  if (0 === pendingLanes) var JSCompiler_inline_result = 0;
                  else {
                    var suspendedLanes = root$174.suspendedLanes, pingedLanes = root$174.pingedLanes;
                    JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
                    JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                    JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
                  }
                  0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$174, JSCompiler_inline_result));
                } else
                  JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
                    root$174,
                    root$174 === workInProgressRoot ? JSCompiler_inline_result : 0,
                    null !== root$174.cancelPendingCommit || -1 !== root$174.timeoutHandle
                  ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$174, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$174, JSCompiler_inline_result));
              root$174 = root$174.next;
            }
          } while (didPerformSomeWork);
          isFlushingWork = false;
        }
      }
      function processRootScheduleInImmediateTask() {
        processRootScheduleInMicrotask();
      }
      function processRootScheduleInMicrotask() {
        mightHavePendingSyncWork = didScheduleMicrotask = false;
        var syncTransitionLanes = 0;
        0 !== currentEventTransitionLane && (shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane), currentEventTransitionLane = 0);
        for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
          var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
          if (0 === nextLanes)
            root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
          else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
            mightHavePendingSyncWork = true;
          root2 = next;
        }
        flushSyncWorkAcrossRoots_impl(syncTransitionLanes, false);
      }
      function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
        for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
          var index$3 = 31 - clz32(lanes), lane = 1 << index$3, expirationTime = expirationTimes[index$3];
          if (-1 === expirationTime) {
            if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
              expirationTimes[index$3] = computeExpirationTime(lane, currentTime);
          } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
          lanes &= ~lane;
        }
        currentTime = workInProgressRoot;
        suspendedLanes = workInProgressRootRenderLanes;
        suspendedLanes = getNextLanes(
          root2,
          root2 === currentTime ? suspendedLanes : 0,
          null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
        );
        pingedLanes = root2.callbackNode;
        if (0 === suspendedLanes || root2 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
          return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
        if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
          currentTime = suspendedLanes & -suspendedLanes;
          if (currentTime === root2.callbackPriority) return currentTime;
          null !== pingedLanes && cancelCallback$1(pingedLanes);
          switch (lanesToEventPriority(suspendedLanes)) {
            case 2:
            case 8:
              suspendedLanes = UserBlockingPriority;
              break;
            case 32:
              suspendedLanes = NormalPriority$1;
              break;
            case 268435456:
              suspendedLanes = IdlePriority;
              break;
            default:
              suspendedLanes = NormalPriority$1;
          }
          pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
          suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
          root2.callbackPriority = currentTime;
          root2.callbackNode = suspendedLanes;
          return currentTime;
        }
        null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
        root2.callbackPriority = 2;
        root2.callbackNode = null;
        return 2;
      }
      function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
        if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
          return root2.callbackNode = null, root2.callbackPriority = 0, null;
        var originalCallbackNode = root2.callbackNode;
        if (flushPendingEffects(true) && root2.callbackNode !== originalCallbackNode)
          return null;
        var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
        workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
          root2,
          root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
          null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
        );
        if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
        performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
        scheduleTaskForRootDuringMicrotask(root2, now());
        return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
      }
      function performSyncWorkOnRoot(root2, lanes) {
        if (flushPendingEffects()) return null;
        performWorkOnRoot(root2, lanes, true);
      }
      function scheduleImmediateRootScheduleTask() {
        scheduleMicrotask(function() {
          0 !== (executionContext & 6) ? scheduleCallback$3(
            ImmediatePriority,
            processRootScheduleInImmediateTask
          ) : processRootScheduleInMicrotask();
        });
      }
      function requestTransitionLane() {
        0 === currentEventTransitionLane && (currentEventTransitionLane = claimNextTransitionLane());
        return currentEventTransitionLane;
      }
      function coerceFormActionProp(actionProp) {
        return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL("" + actionProp);
      }
      function createFormDataWithSubmitter(form, submitter) {
        var temp = submitter.ownerDocument.createElement("input");
        temp.name = submitter.name;
        temp.value = submitter.value;
        form.id && temp.setAttribute("form", form.id);
        submitter.parentNode.insertBefore(temp, submitter);
        form = new FormData(form);
        temp.parentNode.removeChild(temp);
        return form;
      }
      function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
        if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
          var action = coerceFormActionProp(
            (nativeEventTarget[internalPropsKey] || null).action
          ), submitter = nativeEvent.submitter;
          submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
          var event = new SyntheticEvent(
            "action",
            "action",
            null,
            nativeEvent,
            nativeEventTarget
          );
          dispatchQueue.push({
            event,
            listeners: [
              {
                instance: null,
                listener: function() {
                  if (nativeEvent.defaultPrevented) {
                    if (0 !== currentEventTransitionLane) {
                      var formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget);
                      startHostTransition(
                        maybeTargetInst,
                        {
                          pending: true,
                          data: formData,
                          method: nativeEventTarget.method,
                          action
                        },
                        null,
                        formData
                      );
                    }
                  } else
                    "function" === typeof action && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget), startHostTransition(
                      maybeTargetInst,
                      {
                        pending: true,
                        data: formData,
                        method: nativeEventTarget.method,
                        action
                      },
                      action,
                      formData
                    ));
                },
                currentTarget: nativeEventTarget
              }
            ]
          });
        }
      }
      for (i$jscomp$inline_1528 = 0; i$jscomp$inline_1528 < simpleEventPluginEvents.length; i$jscomp$inline_1528++) {
        eventName$jscomp$inline_1529 = simpleEventPluginEvents[i$jscomp$inline_1528], domEventName$jscomp$inline_1530 = eventName$jscomp$inline_1529.toLowerCase(), capitalizedEvent$jscomp$inline_1531 = eventName$jscomp$inline_1529[0].toUpperCase() + eventName$jscomp$inline_1529.slice(1);
        registerSimpleEvent(
          domEventName$jscomp$inline_1530,
          "on" + capitalizedEvent$jscomp$inline_1531
        );
      }
      var eventName$jscomp$inline_1529;
      var domEventName$jscomp$inline_1530;
      var capitalizedEvent$jscomp$inline_1531;
      var i$jscomp$inline_1528;
      registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
      registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
      registerSimpleEvent(ANIMATION_START, "onAnimationStart");
      registerSimpleEvent("dblclick", "onDoubleClick");
      registerSimpleEvent("focusin", "onFocus");
      registerSimpleEvent("focusout", "onBlur");
      registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
      registerSimpleEvent(TRANSITION_START, "onTransitionStart");
      registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
      registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
      registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
      registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
      registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
      registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
      registerTwoPhaseEvent(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(" ")
      );
      registerTwoPhaseEvent(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " "
        )
      );
      registerTwoPhaseEvent("onBeforeInput", [
        "compositionend",
        "keypress",
        "textInput",
        "paste"
      ]);
      registerTwoPhaseEvent(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
      );
      var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      );
      var nonDelegatedEvents = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
      );
      function processDispatchQueue(dispatchQueue, eventSystemFlags) {
        eventSystemFlags = 0 !== (eventSystemFlags & 4);
        for (var i7 = 0; i7 < dispatchQueue.length; i7++) {
          var _dispatchQueue$i = dispatchQueue[i7], event = _dispatchQueue$i.event;
          _dispatchQueue$i = _dispatchQueue$i.listeners;
          a: {
            var previousInstance = void 0;
            if (eventSystemFlags)
              for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
                var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
                _dispatchListeners$i = _dispatchListeners$i.listener;
                if (instance !== previousInstance && event.isPropagationStopped())
                  break a;
                previousInstance = _dispatchListeners$i;
                event.currentTarget = currentTarget;
                try {
                  previousInstance(event);
                } catch (error) {
                  reportGlobalError(error);
                }
                event.currentTarget = null;
                previousInstance = instance;
              }
            else
              for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
                _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
                instance = _dispatchListeners$i.instance;
                currentTarget = _dispatchListeners$i.currentTarget;
                _dispatchListeners$i = _dispatchListeners$i.listener;
                if (instance !== previousInstance && event.isPropagationStopped())
                  break a;
                previousInstance = _dispatchListeners$i;
                event.currentTarget = currentTarget;
                try {
                  previousInstance(event);
                } catch (error) {
                  reportGlobalError(error);
                }
                event.currentTarget = null;
                previousInstance = instance;
              }
          }
        }
      }
      function listenToNonDelegatedEvent(domEventName, targetElement) {
        var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
        void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
        var listenerSetKey = domEventName + "__bubble";
        JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
      }
      function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
        var eventSystemFlags = 0;
        isCapturePhaseListener && (eventSystemFlags |= 4);
        addTrappedEventListener(
          target,
          domEventName,
          eventSystemFlags,
          isCapturePhaseListener
        );
      }
      var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
      function listenToAllSupportedEvents(rootContainerElement) {
        if (!rootContainerElement[listeningMarker]) {
          rootContainerElement[listeningMarker] = true;
          allNativeEvents.forEach(function(domEventName) {
            "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
          });
          var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
          null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
        }
      }
      function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
        switch (getEventPriority(domEventName)) {
          case 2:
            var listenerWrapper = dispatchDiscreteEvent;
            break;
          case 8:
            listenerWrapper = dispatchContinuousEvent;
            break;
          default:
            listenerWrapper = dispatchEvent;
        }
        eventSystemFlags = listenerWrapper.bind(
          null,
          domEventName,
          eventSystemFlags,
          targetContainer
        );
        listenerWrapper = void 0;
        !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
        isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          capture: true,
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
      }
      function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
        var ancestorInst = targetInst$jscomp$0;
        if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
          a: for (; ; ) {
            if (null === targetInst$jscomp$0) return;
            var nodeTag = targetInst$jscomp$0.tag;
            if (3 === nodeTag || 4 === nodeTag) {
              var container = targetInst$jscomp$0.stateNode.containerInfo;
              if (container === targetContainer) break;
              if (4 === nodeTag)
                for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
                  var grandTag = nodeTag.tag;
                  if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                    return;
                  nodeTag = nodeTag.return;
                }
              for (; null !== container; ) {
                nodeTag = getClosestInstanceFromNode(container);
                if (null === nodeTag) return;
                grandTag = nodeTag.tag;
                if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
                  targetInst$jscomp$0 = ancestorInst = nodeTag;
                  continue a;
                }
                container = container.parentNode;
              }
            }
            targetInst$jscomp$0 = targetInst$jscomp$0.return;
          }
        batchedUpdates$1(function() {
          var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
          a: {
            var reactName = topLevelEventsToReactNames.get(domEventName);
            if (void 0 !== reactName) {
              var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
              switch (domEventName) {
                case "keypress":
                  if (0 === getEventCharCode(nativeEvent)) break a;
                case "keydown":
                case "keyup":
                  SyntheticEventCtor = SyntheticKeyboardEvent;
                  break;
                case "focusin":
                  reactEventType = "focus";
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "focusout":
                  reactEventType = "blur";
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "beforeblur":
                case "afterblur":
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "click":
                  if (2 === nativeEvent.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  SyntheticEventCtor = SyntheticMouseEvent;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  SyntheticEventCtor = SyntheticDragEvent;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  SyntheticEventCtor = SyntheticTouchEvent;
                  break;
                case ANIMATION_END:
                case ANIMATION_ITERATION:
                case ANIMATION_START:
                  SyntheticEventCtor = SyntheticAnimationEvent;
                  break;
                case TRANSITION_END:
                  SyntheticEventCtor = SyntheticTransitionEvent;
                  break;
                case "scroll":
                case "scrollend":
                  SyntheticEventCtor = SyntheticUIEvent;
                  break;
                case "wheel":
                  SyntheticEventCtor = SyntheticWheelEvent;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  SyntheticEventCtor = SyntheticClipboardEvent;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  SyntheticEventCtor = SyntheticPointerEvent;
                  break;
                case "toggle":
                case "beforetoggle":
                  SyntheticEventCtor = SyntheticToggleEvent;
              }
              var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
              inCapturePhase = [];
              for (var instance = targetInst, lastHostComponent; null !== instance; ) {
                var _instance = instance;
                lastHostComponent = _instance.stateNode;
                _instance = _instance.tag;
                5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
                  createDispatchListener(instance, _instance, lastHostComponent)
                ));
                if (accumulateTargetOnly) break;
                instance = instance.return;
              }
              0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
                reactName,
                reactEventType,
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
            }
          }
          if (0 === (eventSystemFlags & 7)) {
            a: {
              reactName = "mouseover" === domEventName || "pointerover" === domEventName;
              SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
              if (reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
                break a;
              if (SyntheticEventCtor || reactName) {
                reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
                if (SyntheticEventCtor) {
                  if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                    reactEventType = null;
                } else SyntheticEventCtor = null, reactEventType = targetInst;
                if (SyntheticEventCtor !== reactEventType) {
                  inCapturePhase = SyntheticMouseEvent;
                  _instance = "onMouseLeave";
                  reactEventName = "onMouseEnter";
                  instance = "mouse";
                  if ("pointerout" === domEventName || "pointerover" === domEventName)
                    inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
                  accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
                  lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
                  reactName = new inCapturePhase(
                    _instance,
                    instance + "leave",
                    SyntheticEventCtor,
                    nativeEvent,
                    nativeEventTarget
                  );
                  reactName.target = accumulateTargetOnly;
                  reactName.relatedTarget = lastHostComponent;
                  _instance = null;
                  getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                    reactEventName,
                    instance + "enter",
                    reactEventType,
                    nativeEvent,
                    nativeEventTarget
                  ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
                  accumulateTargetOnly = _instance;
                  if (SyntheticEventCtor && reactEventType)
                    b: {
                      inCapturePhase = SyntheticEventCtor;
                      reactEventName = reactEventType;
                      instance = 0;
                      for (lastHostComponent = inCapturePhase; lastHostComponent; lastHostComponent = getParent(lastHostComponent))
                        instance++;
                      lastHostComponent = 0;
                      for (_instance = reactEventName; _instance; _instance = getParent(_instance))
                        lastHostComponent++;
                      for (; 0 < instance - lastHostComponent; )
                        inCapturePhase = getParent(inCapturePhase), instance--;
                      for (; 0 < lastHostComponent - instance; )
                        reactEventName = getParent(reactEventName), lastHostComponent--;
                      for (; instance--; ) {
                        if (inCapturePhase === reactEventName || null !== reactEventName && inCapturePhase === reactEventName.alternate)
                          break b;
                        inCapturePhase = getParent(inCapturePhase);
                        reactEventName = getParent(reactEventName);
                      }
                      inCapturePhase = null;
                    }
                  else inCapturePhase = null;
                  null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    reactName,
                    SyntheticEventCtor,
                    inCapturePhase,
                    false
                  );
                  null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    accumulateTargetOnly,
                    reactEventType,
                    inCapturePhase,
                    true
                  );
                }
              }
            }
            a: {
              reactName = targetInst ? getNodeFromInstance(targetInst) : window;
              SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
              if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
                var getTargetInstFunc = getTargetInstForChangeEvent;
              else if (isTextInputElement(reactName))
                if (isInputEventSupported)
                  getTargetInstFunc = getTargetInstForInputOrChangeEvent;
                else {
                  getTargetInstFunc = getTargetInstForInputEventPolyfill;
                  var handleEventFunc = handleEventsForInputEventPolyfill;
                }
              else
                SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
              if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
                createAndAccumulateChangeEvent(
                  dispatchQueue,
                  getTargetInstFunc,
                  nativeEvent,
                  nativeEventTarget
                );
                break a;
              }
              handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
              "focusout" === domEventName && targetInst && "number" === reactName.type && null != targetInst.memoizedProps.value && setDefaultValue(reactName, "number", reactName.value);
            }
            handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
            switch (domEventName) {
              case "focusin":
                if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
                  activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
                break;
              case "focusout":
                lastSelection = activeElementInst = activeElement = null;
                break;
              case "mousedown":
                mouseDown = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                mouseDown = false;
                constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
                break;
              case "selectionchange":
                if (skipSelectionChangeEvent) break;
              case "keydown":
              case "keyup":
                constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
            }
            var fallbackData;
            if (canUseCompositionEvent)
              b: {
                switch (domEventName) {
                  case "compositionstart":
                    var eventType = "onCompositionStart";
                    break b;
                  case "compositionend":
                    eventType = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    eventType = "onCompositionUpdate";
                    break b;
                }
                eventType = void 0;
              }
            else
              isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
            eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
              eventType,
              domEventName,
              null,
              nativeEvent,
              nativeEventTarget
            ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
            if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
              eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
                "onBeforeInput",
                "beforeinput",
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({
                event: handleEventFunc,
                listeners: eventType
              }), handleEventFunc.data = fallbackData);
            extractEvents$1(
              dispatchQueue,
              domEventName,
              targetInst,
              nativeEvent,
              nativeEventTarget
            );
          }
          processDispatchQueue(dispatchQueue, eventSystemFlags);
        });
      }
      function createDispatchListener(instance, listener, currentTarget) {
        return {
          instance,
          listener,
          currentTarget
        };
      }
      function accumulateTwoPhaseListeners(targetFiber, reactName) {
        for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
          var _instance2 = targetFiber, stateNode = _instance2.stateNode;
          _instance2 = _instance2.tag;
          5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
            createDispatchListener(targetFiber, _instance2, stateNode)
          ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
            createDispatchListener(targetFiber, _instance2, stateNode)
          ));
          if (3 === targetFiber.tag) return listeners;
          targetFiber = targetFiber.return;
        }
        return [];
      }
      function getParent(inst) {
        if (null === inst) return null;
        do
          inst = inst.return;
        while (inst && 5 !== inst.tag && 27 !== inst.tag);
        return inst ? inst : null;
      }
      function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
        for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
          var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
          _instance3 = _instance3.tag;
          if (null !== alternate && alternate === common) break;
          5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
            createDispatchListener(target, stateNode, alternate)
          )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
            createDispatchListener(target, stateNode, alternate)
          )));
          target = target.return;
        }
        0 !== listeners.length && dispatchQueue.push({ event, listeners });
      }
      var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
      var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
      function normalizeMarkupForTextOrAttribute(markup) {
        return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
      }
      function checkForUnmatchedText(serverText, clientText) {
        clientText = normalizeMarkupForTextOrAttribute(clientText);
        return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
      }
      function noop$1() {
      }
      function setProp(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "children":
            "string" === typeof value ? "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && "body" !== tag && setTextContent(domElement, "" + value);
            break;
          case "className":
            setValueForKnownAttribute(domElement, "class", value);
            break;
          case "tabIndex":
            setValueForKnownAttribute(domElement, "tabindex", value);
            break;
          case "dir":
          case "role":
          case "viewBox":
          case "width":
          case "height":
            setValueForKnownAttribute(domElement, key, value);
            break;
          case "style":
            setValueForStyles(domElement, value, prevValue);
            break;
          case "data":
            if ("object" !== tag) {
              setValueForKnownAttribute(domElement, "data", value);
              break;
            }
          case "src":
          case "href":
            if ("" === value && ("a" !== tag || "href" !== key)) {
              domElement.removeAttribute(key);
              break;
            }
            if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
              domElement.removeAttribute(key);
              break;
            }
            value = sanitizeURL("" + value);
            domElement.setAttribute(key, value);
            break;
          case "action":
          case "formAction":
            if ("function" === typeof value) {
              domElement.setAttribute(
                key,
                "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
              );
              break;
            } else
              "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
                domElement,
                tag,
                "formEncType",
                props.formEncType,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formMethod",
                props.formMethod,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formTarget",
                props.formTarget,
                props,
                null
              )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
            if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
              domElement.removeAttribute(key);
              break;
            }
            value = sanitizeURL("" + value);
            domElement.setAttribute(key, value);
            break;
          case "onClick":
            null != value && (domElement.onclick = noop$1);
            break;
          case "onScroll":
            null != value && listenToNonDelegatedEvent("scroll", domElement);
            break;
          case "onScrollEnd":
            null != value && listenToNonDelegatedEvent("scrollend", domElement);
            break;
          case "dangerouslySetInnerHTML":
            if (null != value) {
              if ("object" !== typeof value || !("__html" in value))
                throw Error(formatProdErrorMessage(61));
              key = value.__html;
              if (null != key) {
                if (null != props.children) throw Error(formatProdErrorMessage(60));
                domElement.innerHTML = key;
              }
            }
            break;
          case "multiple":
            domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
            break;
          case "muted":
            domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "ref":
            break;
          case "autoFocus":
            break;
          case "xlinkHref":
            if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
              domElement.removeAttribute("xlink:href");
              break;
            }
            key = sanitizeURL("" + value);
            domElement.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "xlink:href",
              key
            );
            break;
          case "contentEditable":
          case "spellCheck":
          case "draggable":
          case "value":
          case "autoReverse":
          case "externalResourcesRequired":
          case "focusable":
          case "preserveAlpha":
            null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "" + value) : domElement.removeAttribute(key);
            break;
          case "inert":
          case "allowFullScreen":
          case "async":
          case "autoPlay":
          case "controls":
          case "default":
          case "defer":
          case "disabled":
          case "disablePictureInPicture":
          case "disableRemotePlayback":
          case "formNoValidate":
          case "hidden":
          case "loop":
          case "noModule":
          case "noValidate":
          case "open":
          case "playsInline":
          case "readOnly":
          case "required":
          case "reversed":
          case "scoped":
          case "seamless":
          case "itemScope":
            value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
            break;
          case "capture":
          case "download":
            true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "cols":
          case "rows":
          case "size":
          case "span":
            null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "rowSpan":
          case "start":
            null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
            break;
          case "popover":
            listenToNonDelegatedEvent("beforetoggle", domElement);
            listenToNonDelegatedEvent("toggle", domElement);
            setValueForAttribute(domElement, "popover", value);
            break;
          case "xlinkActuate":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:actuate",
              value
            );
            break;
          case "xlinkArcrole":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:arcrole",
              value
            );
            break;
          case "xlinkRole":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:role",
              value
            );
            break;
          case "xlinkShow":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:show",
              value
            );
            break;
          case "xlinkTitle":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:title",
              value
            );
            break;
          case "xlinkType":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:type",
              value
            );
            break;
          case "xmlBase":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:base",
              value
            );
            break;
          case "xmlLang":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:lang",
              value
            );
            break;
          case "xmlSpace":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:space",
              value
            );
            break;
          case "is":
            setValueForAttribute(domElement, "is", value);
            break;
          case "innerText":
          case "textContent":
            break;
          default:
            if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
              key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
        }
      }
      function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "style":
            setValueForStyles(domElement, value, prevValue);
            break;
          case "dangerouslySetInnerHTML":
            if (null != value) {
              if ("object" !== typeof value || !("__html" in value))
                throw Error(formatProdErrorMessage(61));
              key = value.__html;
              if (null != key) {
                if (null != props.children) throw Error(formatProdErrorMessage(60));
                domElement.innerHTML = key;
              }
            }
            break;
          case "children":
            "string" === typeof value ? setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && setTextContent(domElement, "" + value);
            break;
          case "onScroll":
            null != value && listenToNonDelegatedEvent("scroll", domElement);
            break;
          case "onScrollEnd":
            null != value && listenToNonDelegatedEvent("scrollend", domElement);
            break;
          case "onClick":
            null != value && (domElement.onclick = noop$1);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "innerHTML":
          case "ref":
            break;
          case "innerText":
          case "textContent":
            break;
          default:
            if (!registrationNameDependencies.hasOwnProperty(key))
              a: {
                if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = null != prevValue ? prevValue[key] : null, "function" === typeof prevValue && domElement.removeEventListener(tag, prevValue, props), "function" === typeof value)) {
                  "function" !== typeof prevValue && null !== prevValue && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
                  domElement.addEventListener(tag, value, props);
                  break a;
                }
                key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
              }
        }
      }
      function setInitialProperties(domElement, tag, props) {
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "img":
            listenToNonDelegatedEvent("error", domElement);
            listenToNonDelegatedEvent("load", domElement);
            var hasSrc = false, hasSrcSet = false, propKey;
            for (propKey in props)
              if (props.hasOwnProperty(propKey)) {
                var propValue = props[propKey];
                if (null != propValue)
                  switch (propKey) {
                    case "src":
                      hasSrc = true;
                      break;
                    case "srcSet":
                      hasSrcSet = true;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw Error(formatProdErrorMessage(137, tag));
                    default:
                      setProp(domElement, tag, propKey, propValue, props, null);
                  }
              }
            hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
            hasSrc && setProp(domElement, tag, "src", props.src, props, null);
            return;
          case "input":
            listenToNonDelegatedEvent("invalid", domElement);
            var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
            for (hasSrc in props)
              if (props.hasOwnProperty(hasSrc)) {
                var propValue$188 = props[hasSrc];
                if (null != propValue$188)
                  switch (hasSrc) {
                    case "name":
                      hasSrcSet = propValue$188;
                      break;
                    case "type":
                      propValue = propValue$188;
                      break;
                    case "checked":
                      checked = propValue$188;
                      break;
                    case "defaultChecked":
                      defaultChecked = propValue$188;
                      break;
                    case "value":
                      propKey = propValue$188;
                      break;
                    case "defaultValue":
                      defaultValue = propValue$188;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      if (null != propValue$188)
                        throw Error(formatProdErrorMessage(137, tag));
                      break;
                    default:
                      setProp(domElement, tag, hasSrc, propValue$188, props, null);
                  }
              }
            initInput(
              domElement,
              propKey,
              defaultValue,
              checked,
              defaultChecked,
              propValue,
              hasSrcSet,
              false
            );
            track(domElement);
            return;
          case "select":
            listenToNonDelegatedEvent("invalid", domElement);
            hasSrc = propValue = propKey = null;
            for (hasSrcSet in props)
              if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
                switch (hasSrcSet) {
                  case "value":
                    propKey = defaultValue;
                    break;
                  case "defaultValue":
                    propValue = defaultValue;
                    break;
                  case "multiple":
                    hasSrc = defaultValue;
                  default:
                    setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
                }
            tag = propKey;
            props = propValue;
            domElement.multiple = !!hasSrc;
            null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
            return;
          case "textarea":
            listenToNonDelegatedEvent("invalid", domElement);
            propKey = hasSrcSet = hasSrc = null;
            for (propValue in props)
              if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
                switch (propValue) {
                  case "value":
                    hasSrc = defaultValue;
                    break;
                  case "defaultValue":
                    hasSrcSet = defaultValue;
                    break;
                  case "children":
                    propKey = defaultValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != defaultValue) throw Error(formatProdErrorMessage(91));
                    break;
                  default:
                    setProp(domElement, tag, propValue, defaultValue, props, null);
                }
            initTextarea(domElement, hasSrc, hasSrcSet, propKey);
            track(domElement);
            return;
          case "option":
            for (checked in props)
              if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
                switch (checked) {
                  case "selected":
                    domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                    break;
                  default:
                    setProp(domElement, tag, checked, hasSrc, props, null);
                }
            return;
          case "dialog":
            listenToNonDelegatedEvent("beforetoggle", domElement);
            listenToNonDelegatedEvent("toggle", domElement);
            listenToNonDelegatedEvent("cancel", domElement);
            listenToNonDelegatedEvent("close", domElement);
            break;
          case "iframe":
          case "object":
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "video":
          case "audio":
            for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
              listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
            break;
          case "image":
            listenToNonDelegatedEvent("error", domElement);
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", domElement);
            break;
          case "embed":
          case "source":
          case "link":
            listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
          case "area":
          case "base":
          case "br":
          case "col":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "track":
          case "wbr":
          case "menuitem":
            for (defaultChecked in props)
              if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
                switch (defaultChecked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(formatProdErrorMessage(137, tag));
                  default:
                    setProp(domElement, tag, defaultChecked, hasSrc, props, null);
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (propValue$188 in props)
                props.hasOwnProperty(propValue$188) && (hasSrc = props[propValue$188], void 0 !== hasSrc && setPropOnCustomElement(
                  domElement,
                  tag,
                  propValue$188,
                  hasSrc,
                  props,
                  void 0
                ));
              return;
            }
        }
        for (defaultValue in props)
          props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
      }
      function updateProperties(domElement, tag, lastProps, nextProps) {
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "input":
            var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
            for (propKey in lastProps) {
              var lastProp = lastProps[propKey];
              if (lastProps.hasOwnProperty(propKey) && null != lastProp)
                switch (propKey) {
                  case "checked":
                    break;
                  case "value":
                    break;
                  case "defaultValue":
                    lastDefaultValue = lastProp;
                  default:
                    nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
                }
            }
            for (var propKey$205 in nextProps) {
              var propKey = nextProps[propKey$205];
              lastProp = lastProps[propKey$205];
              if (nextProps.hasOwnProperty(propKey$205) && (null != propKey || null != lastProp))
                switch (propKey$205) {
                  case "type":
                    type = propKey;
                    break;
                  case "name":
                    name = propKey;
                    break;
                  case "checked":
                    checked = propKey;
                    break;
                  case "defaultChecked":
                    defaultChecked = propKey;
                    break;
                  case "value":
                    value = propKey;
                    break;
                  case "defaultValue":
                    defaultValue = propKey;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != propKey)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    propKey !== lastProp && setProp(
                      domElement,
                      tag,
                      propKey$205,
                      propKey,
                      nextProps,
                      lastProp
                    );
                }
            }
            updateInput(
              domElement,
              value,
              defaultValue,
              lastDefaultValue,
              checked,
              defaultChecked,
              type,
              name
            );
            return;
          case "select":
            propKey = value = defaultValue = propKey$205 = null;
            for (type in lastProps)
              if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
                switch (type) {
                  case "value":
                    break;
                  case "multiple":
                    propKey = lastDefaultValue;
                  default:
                    nextProps.hasOwnProperty(type) || setProp(
                      domElement,
                      tag,
                      type,
                      null,
                      nextProps,
                      lastDefaultValue
                    );
                }
            for (name in nextProps)
              if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
                switch (name) {
                  case "value":
                    propKey$205 = type;
                    break;
                  case "defaultValue":
                    defaultValue = type;
                    break;
                  case "multiple":
                    value = type;
                  default:
                    type !== lastDefaultValue && setProp(
                      domElement,
                      tag,
                      name,
                      type,
                      nextProps,
                      lastDefaultValue
                    );
                }
            tag = defaultValue;
            lastProps = value;
            nextProps = propKey;
            null != propKey$205 ? updateOptions(domElement, !!lastProps, propKey$205, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
            return;
          case "textarea":
            propKey = propKey$205 = null;
            for (defaultValue in lastProps)
              if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
                switch (defaultValue) {
                  case "value":
                    break;
                  case "children":
                    break;
                  default:
                    setProp(domElement, tag, defaultValue, null, nextProps, name);
                }
            for (value in nextProps)
              if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
                switch (value) {
                  case "value":
                    propKey$205 = name;
                    break;
                  case "defaultValue":
                    propKey = name;
                    break;
                  case "children":
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != name) throw Error(formatProdErrorMessage(91));
                    break;
                  default:
                    name !== type && setProp(domElement, tag, value, name, nextProps, type);
                }
            updateTextarea(domElement, propKey$205, propKey);
            return;
          case "option":
            for (var propKey$221 in lastProps)
              if (propKey$205 = lastProps[propKey$221], lastProps.hasOwnProperty(propKey$221) && null != propKey$205 && !nextProps.hasOwnProperty(propKey$221))
                switch (propKey$221) {
                  case "selected":
                    domElement.selected = false;
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      propKey$221,
                      null,
                      nextProps,
                      propKey$205
                    );
                }
            for (lastDefaultValue in nextProps)
              if (propKey$205 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$205 !== propKey && (null != propKey$205 || null != propKey))
                switch (lastDefaultValue) {
                  case "selected":
                    domElement.selected = propKey$205 && "function" !== typeof propKey$205 && "symbol" !== typeof propKey$205;
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      lastDefaultValue,
                      propKey$205,
                      nextProps,
                      propKey
                    );
                }
            return;
          case "img":
          case "link":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
          case "menuitem":
            for (var propKey$226 in lastProps)
              propKey$205 = lastProps[propKey$226], lastProps.hasOwnProperty(propKey$226) && null != propKey$205 && !nextProps.hasOwnProperty(propKey$226) && setProp(domElement, tag, propKey$226, null, nextProps, propKey$205);
            for (checked in nextProps)
              if (propKey$205 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$205 !== propKey && (null != propKey$205 || null != propKey))
                switch (checked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != propKey$205)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      checked,
                      propKey$205,
                      nextProps,
                      propKey
                    );
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (var propKey$231 in lastProps)
                propKey$205 = lastProps[propKey$231], lastProps.hasOwnProperty(propKey$231) && void 0 !== propKey$205 && !nextProps.hasOwnProperty(propKey$231) && setPropOnCustomElement(
                  domElement,
                  tag,
                  propKey$231,
                  void 0,
                  nextProps,
                  propKey$205
                );
              for (defaultChecked in nextProps)
                propKey$205 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$205 === propKey || void 0 === propKey$205 && void 0 === propKey || setPropOnCustomElement(
                  domElement,
                  tag,
                  defaultChecked,
                  propKey$205,
                  nextProps,
                  propKey
                );
              return;
            }
        }
        for (var propKey$236 in lastProps)
          propKey$205 = lastProps[propKey$236], lastProps.hasOwnProperty(propKey$236) && null != propKey$205 && !nextProps.hasOwnProperty(propKey$236) && setProp(domElement, tag, propKey$236, null, nextProps, propKey$205);
        for (lastProp in nextProps)
          propKey$205 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$205 === propKey || null == propKey$205 && null == propKey || setProp(domElement, tag, lastProp, propKey$205, nextProps, propKey);
      }
      var eventsEnabled = null;
      var selectionInformation = null;
      function getOwnerDocumentFromRootContainer(rootContainerElement) {
        return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
      }
      function getOwnHostContext(namespaceURI) {
        switch (namespaceURI) {
          case "http://www.w3.org/2000/svg":
            return 1;
          case "http://www.w3.org/1998/Math/MathML":
            return 2;
          default:
            return 0;
        }
      }
      function getChildHostContextProd(parentNamespace, type) {
        if (0 === parentNamespace)
          switch (type) {
            case "svg":
              return 1;
            case "math":
              return 2;
            default:
              return 0;
          }
        return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
      }
      function shouldSetTextContent(type, props) {
        return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
      }
      var currentPopstateTransitionEvent = null;
      function shouldAttemptEagerTransition() {
        var event = window.event;
        if (event && "popstate" === event.type) {
          if (event === currentPopstateTransitionEvent) return false;
          currentPopstateTransitionEvent = event;
          return true;
        }
        currentPopstateTransitionEvent = null;
        return false;
      }
      var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0;
      var cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var localPromise = "function" === typeof Promise ? Promise : void 0;
      var scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
        return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
      } : scheduleTimeout;
      function handleErrorInNextTick(error) {
        setTimeout(function() {
          throw error;
        });
      }
      function isSingletonScope(type) {
        return "head" === type;
      }
      function clearSuspenseBoundary(parentInstance, suspenseInstance) {
        var node = suspenseInstance, possiblePreambleContribution = 0, depth = 0;
        do {
          var nextNode = node.nextSibling;
          parentInstance.removeChild(node);
          if (nextNode && 8 === nextNode.nodeType)
            if (node = nextNode.data, "/$" === node) {
              if (0 < possiblePreambleContribution && 8 > possiblePreambleContribution) {
                node = possiblePreambleContribution;
                var ownerDocument = parentInstance.ownerDocument;
                node & 1 && releaseSingletonInstance(ownerDocument.documentElement);
                node & 2 && releaseSingletonInstance(ownerDocument.body);
                if (node & 4)
                  for (node = ownerDocument.head, releaseSingletonInstance(node), ownerDocument = node.firstChild; ownerDocument; ) {
                    var nextNode$jscomp$0 = ownerDocument.nextSibling, nodeName = ownerDocument.nodeName;
                    ownerDocument[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === ownerDocument.rel.toLowerCase() || node.removeChild(ownerDocument);
                    ownerDocument = nextNode$jscomp$0;
                  }
              }
              if (0 === depth) {
                parentInstance.removeChild(nextNode);
                retryIfBlockedOn(suspenseInstance);
                return;
              }
              depth--;
            } else
              "$" === node || "$?" === node || "$!" === node ? depth++ : possiblePreambleContribution = node.charCodeAt(0) - 48;
          else possiblePreambleContribution = 0;
          node = nextNode;
        } while (node);
        retryIfBlockedOn(suspenseInstance);
      }
      function clearContainerSparingly(container) {
        var nextNode = container.firstChild;
        nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
        for (; nextNode; ) {
          var node = nextNode;
          nextNode = nextNode.nextSibling;
          switch (node.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
              clearContainerSparingly(node);
              detachDeletedInstance(node);
              continue;
            case "SCRIPT":
            case "STYLE":
              continue;
            case "LINK":
              if ("stylesheet" === node.rel.toLowerCase()) continue;
          }
          container.removeChild(node);
        }
      }
      function canHydrateInstance(instance, type, props, inRootOrSingleton) {
        for (; 1 === instance.nodeType; ) {
          var anyProps = props;
          if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
            if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
              break;
          } else if (!inRootOrSingleton)
            if ("input" === type && "hidden" === instance.type) {
              var name = null == anyProps.name ? null : "" + anyProps.name;
              if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
                return instance;
            } else return instance;
          else if (!instance[internalHoistableMarker])
            switch (type) {
              case "meta":
                if (!instance.hasAttribute("itemprop")) break;
                return instance;
              case "link":
                name = instance.getAttribute("rel");
                if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
                  break;
                else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
                  break;
                return instance;
              case "style":
                if (instance.hasAttribute("data-precedence")) break;
                return instance;
              case "script":
                name = instance.getAttribute("src");
                if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
                  break;
                return instance;
              default:
                return instance;
            }
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance) break;
        }
        return null;
      }
      function canHydrateTextInstance(instance, text, inRootOrSingleton) {
        if ("" === text) return null;
        for (; 3 !== instance.nodeType; ) {
          if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
            return null;
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance) return null;
        }
        return instance;
      }
      function isSuspenseInstanceFallback(instance) {
        return "$!" === instance.data || "$?" === instance.data && "complete" === instance.ownerDocument.readyState;
      }
      function registerSuspenseInstanceRetry(instance, callback) {
        var ownerDocument = instance.ownerDocument;
        if ("$?" !== instance.data || "complete" === ownerDocument.readyState)
          callback();
        else {
          var listener = function() {
            callback();
            ownerDocument.removeEventListener("DOMContentLoaded", listener);
          };
          ownerDocument.addEventListener("DOMContentLoaded", listener);
          instance._reactRetry = listener;
        }
      }
      function getNextHydratable(node) {
        for (; null != node; node = node.nextSibling) {
          var nodeType = node.nodeType;
          if (1 === nodeType || 3 === nodeType) break;
          if (8 === nodeType) {
            nodeType = node.data;
            if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "F!" === nodeType || "F" === nodeType)
              break;
            if ("/$" === nodeType) return null;
          }
        }
        return node;
      }
      var previousHydratableOnEnteringScopedSingleton = null;
      function getParentSuspenseInstance(targetInstance) {
        targetInstance = targetInstance.previousSibling;
        for (var depth = 0; targetInstance; ) {
          if (8 === targetInstance.nodeType) {
            var data = targetInstance.data;
            if ("$" === data || "$!" === data || "$?" === data) {
              if (0 === depth) return targetInstance;
              depth--;
            } else "/$" === data && depth++;
          }
          targetInstance = targetInstance.previousSibling;
        }
        return null;
      }
      function resolveSingletonInstance(type, props, rootContainerInstance) {
        props = getOwnerDocumentFromRootContainer(rootContainerInstance);
        switch (type) {
          case "html":
            type = props.documentElement;
            if (!type) throw Error(formatProdErrorMessage(452));
            return type;
          case "head":
            type = props.head;
            if (!type) throw Error(formatProdErrorMessage(453));
            return type;
          case "body":
            type = props.body;
            if (!type) throw Error(formatProdErrorMessage(454));
            return type;
          default:
            throw Error(formatProdErrorMessage(451));
        }
      }
      function releaseSingletonInstance(instance) {
        for (var attributes = instance.attributes; attributes.length; )
          instance.removeAttributeNode(attributes[0]);
        detachDeletedInstance(instance);
      }
      var preloadPropsMap = /* @__PURE__ */ new Map();
      var preconnectsSet = /* @__PURE__ */ new Set();
      function getHoistableRoot(container) {
        return "function" === typeof container.getRootNode ? container.getRootNode() : 9 === container.nodeType ? container : container.ownerDocument;
      }
      var previousDispatcher = ReactDOMSharedInternals.d;
      ReactDOMSharedInternals.d = {
        f: flushSyncWork,
        r: requestFormReset,
        D: prefetchDNS,
        C: preconnect,
        L: preload,
        m: preloadModule,
        X: preinitScript,
        S: preinitStyle,
        M: preinitModuleScript
      };
      function flushSyncWork() {
        var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
        return previousWasRendering || wasRendering;
      }
      function requestFormReset(form) {
        var formInst = getInstanceFromNode(form);
        null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
      }
      var globalDocument = "undefined" === typeof document ? null : document;
      function preconnectAs(rel, href, crossOrigin) {
        var ownerDocument = globalDocument;
        if (ownerDocument && "string" === typeof href && href) {
          var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
          limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
          "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
          preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
        }
      }
      function prefetchDNS(href) {
        previousDispatcher.D(href);
        preconnectAs("dns-prefetch", href, null);
      }
      function preconnect(href, crossOrigin) {
        previousDispatcher.C(href, crossOrigin);
        preconnectAs("preconnect", href, crossOrigin);
      }
      function preload(href, as, options2) {
        previousDispatcher.L(href, as, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href && as) {
          var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
          "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
            options2.imageSrcSet
          ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
            options2.imageSizes
          ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
          var key = preloadSelector;
          switch (as) {
            case "style":
              key = getStyleKey(href);
              break;
            case "script":
              key = getScriptKey(href);
          }
          preloadPropsMap.has(key) || (href = assign(
            {
              rel: "preload",
              href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
              as
            },
            options2
          ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
        }
      }
      function preloadModule(href, options2) {
        previousDispatcher.m(href, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
          switch (as) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              key = getScriptKey(href);
          }
          if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
            switch (as) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                  return;
            }
            as = ownerDocument.createElement("link");
            setInitialProperties(as, "link", href);
            markNodeAsHoistable(as);
            ownerDocument.head.appendChild(as);
          }
        }
      }
      function preinitStyle(href, precedence, options2) {
        previousDispatcher.S(href, precedence, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var styles35 = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
          precedence = precedence || "default";
          var resource = styles35.get(key);
          if (!resource) {
            var state = { loading: 0, preload: null };
            if (resource = ownerDocument.querySelector(
              getStylesheetSelectorFromKey(key)
            ))
              state.loading = 5;
            else {
              href = assign(
                { rel: "stylesheet", href, "data-precedence": precedence },
                options2
              );
              (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
              var link = resource = ownerDocument.createElement("link");
              markNodeAsHoistable(link);
              setInitialProperties(link, "link", href);
              link._p = new Promise(function(resolve, reject) {
                link.onload = resolve;
                link.onerror = reject;
              });
              link.addEventListener("load", function() {
                state.loading |= 1;
              });
              link.addEventListener("error", function() {
                state.loading |= 2;
              });
              state.loading |= 4;
              insertStylesheet(resource, precedence, ownerDocument);
            }
            resource = {
              type: "stylesheet",
              instance: resource,
              count: 1,
              state
            };
            styles35.set(key, resource);
          }
        }
      }
      function preinitScript(src, options2) {
        previousDispatcher.X(src, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
          resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
            type: "script",
            instance: resource,
            count: 1,
            state: null
          }, scripts.set(key, resource));
        }
      }
      function preinitModuleScript(src, options2) {
        previousDispatcher.M(src, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
          resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
            type: "script",
            instance: resource,
            count: 1,
            state: null
          }, scripts.set(key, resource));
        }
      }
      function getResource(type, currentProps, pendingProps, currentResource) {
        var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
        if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
        switch (type) {
          case "meta":
          case "title":
            return null;
          case "style":
            return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (currentProps = getStyleKey(pendingProps.href), pendingProps = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableStyles, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
              type: "style",
              instance: null,
              count: 0,
              state: null
            }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          case "link":
            if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
              type = getStyleKey(pendingProps.href);
              var styles$244 = getResourcesFromRoot(
                JSCompiler_inline_result
              ).hoistableStyles, resource$245 = styles$244.get(type);
              resource$245 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$245 = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null }
              }, styles$244.set(type, resource$245), (styles$244 = JSCompiler_inline_result.querySelector(
                getStylesheetSelectorFromKey(type)
              )) && !styles$244._p && (resource$245.instance = styles$244, resource$245.state.loading = 5), preloadPropsMap.has(type) || (pendingProps = {
                rel: "preload",
                as: "style",
                href: pendingProps.href,
                crossOrigin: pendingProps.crossOrigin,
                integrity: pendingProps.integrity,
                media: pendingProps.media,
                hrefLang: pendingProps.hrefLang,
                referrerPolicy: pendingProps.referrerPolicy
              }, preloadPropsMap.set(type, pendingProps), styles$244 || preloadStylesheet(
                JSCompiler_inline_result,
                type,
                pendingProps,
                resource$245.state
              )));
              if (currentProps && null === currentResource)
                throw Error(formatProdErrorMessage(528, ""));
              return resource$245;
            }
            if (currentProps && null !== currentResource)
              throw Error(formatProdErrorMessage(529, ""));
            return null;
          case "script":
            return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (currentProps = getScriptKey(pendingProps), pendingProps = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableScripts, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
              type: "script",
              instance: null,
              count: 0,
              state: null
            }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          default:
            throw Error(formatProdErrorMessage(444, type));
        }
      }
      function getStyleKey(href) {
        return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
      }
      function getStylesheetSelectorFromKey(key) {
        return 'link[rel="stylesheet"][' + key + "]";
      }
      function stylesheetPropsFromRawProps(rawProps) {
        return assign({}, rawProps, {
          "data-precedence": rawProps.precedence,
          precedence: null
        });
      }
      function preloadStylesheet(ownerDocument, key, preloadProps, state) {
        ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]") ? state.loading = 1 : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
          return state.loading |= 1;
        }), key.addEventListener("error", function() {
          return state.loading |= 2;
        }), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
      }
      function getScriptKey(src) {
        return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
      }
      function getScriptSelectorFromKey(key) {
        return "script[async]" + key;
      }
      function acquireResource(hoistableRoot, resource, props) {
        resource.count++;
        if (null === resource.instance)
          switch (resource.type) {
            case "style":
              var instance = hoistableRoot.querySelector(
                'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
              );
              if (instance)
                return resource.instance = instance, markNodeAsHoistable(instance), instance;
              var styleProps = assign({}, props, {
                "data-href": props.href,
                "data-precedence": props.precedence,
                href: null,
                precedence: null
              });
              instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
                "style"
              );
              markNodeAsHoistable(instance);
              setInitialProperties(instance, "style", styleProps);
              insertStylesheet(instance, props.precedence, hoistableRoot);
              return resource.instance = instance;
            case "stylesheet":
              styleProps = getStyleKey(props.href);
              var instance$250 = hoistableRoot.querySelector(
                getStylesheetSelectorFromKey(styleProps)
              );
              if (instance$250)
                return resource.state.loading |= 4, resource.instance = instance$250, markNodeAsHoistable(instance$250), instance$250;
              instance = stylesheetPropsFromRawProps(props);
              (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
              instance$250 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
              markNodeAsHoistable(instance$250);
              var linkInstance = instance$250;
              linkInstance._p = new Promise(function(resolve, reject) {
                linkInstance.onload = resolve;
                linkInstance.onerror = reject;
              });
              setInitialProperties(instance$250, "link", instance);
              resource.state.loading |= 4;
              insertStylesheet(instance$250, props.precedence, hoistableRoot);
              return resource.instance = instance$250;
            case "script":
              instance$250 = getScriptKey(props.src);
              if (styleProps = hoistableRoot.querySelector(
                getScriptSelectorFromKey(instance$250)
              ))
                return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
              instance = props;
              if (styleProps = preloadPropsMap.get(instance$250))
                instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
              hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
              styleProps = hoistableRoot.createElement("script");
              markNodeAsHoistable(styleProps);
              setInitialProperties(styleProps, "link", instance);
              hoistableRoot.head.appendChild(styleProps);
              return resource.instance = styleProps;
            case "void":
              return null;
            default:
              throw Error(formatProdErrorMessage(443, resource.type));
          }
        else
          "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
        return resource.instance;
      }
      function insertStylesheet(instance, precedence, root2) {
        for (var nodes = root2.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i7 = 0; i7 < nodes.length; i7++) {
          var node = nodes[i7];
          if (node.dataset.precedence === precedence) prior = node;
          else if (prior !== last) break;
        }
        prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
      }
      function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
        null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
        null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
        null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
      }
      function adoptPreloadPropsForScript(scriptProps, preloadProps) {
        null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
        null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
        null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
      }
      var tagCaches = null;
      function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
        if (null === tagCaches) {
          var cache = /* @__PURE__ */ new Map();
          var caches = tagCaches = /* @__PURE__ */ new Map();
          caches.set(ownerDocument, cache);
        } else
          caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
        if (cache.has(type)) return cache;
        cache.set(type, null);
        ownerDocument = ownerDocument.getElementsByTagName(type);
        for (caches = 0; caches < ownerDocument.length; caches++) {
          var node = ownerDocument[caches];
          if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
            var nodeKey = node.getAttribute(keyAttribute) || "";
            nodeKey = type + nodeKey;
            var existing = cache.get(nodeKey);
            existing ? existing.push(node) : cache.set(nodeKey, [node]);
          }
        }
        return cache;
      }
      function mountHoistable(hoistableRoot, type, instance) {
        hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
        hoistableRoot.head.insertBefore(
          instance,
          "title" === type ? hoistableRoot.querySelector("head > title") : null
        );
      }
      function isHostHoistableType(type, props, hostContext) {
        if (1 === hostContext || null != props.itemProp) return false;
        switch (type) {
          case "meta":
          case "title":
            return true;
          case "style":
            if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
              break;
            return true;
          case "link":
            if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
              break;
            switch (props.rel) {
              case "stylesheet":
                return type = props.disabled, "string" === typeof props.precedence && null == type;
              default:
                return true;
            }
          case "script":
            if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
              return true;
        }
        return false;
      }
      function preloadResource(resource) {
        return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
      }
      var suspendedState = null;
      function noop() {
      }
      function suspendResource(hoistableRoot, resource, props) {
        if (null === suspendedState) throw Error(formatProdErrorMessage(475));
        var state = suspendedState;
        if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
          if (null === resource.instance) {
            var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
              getStylesheetSelectorFromKey(key)
            );
            if (instance) {
              hoistableRoot = instance._p;
              null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
              resource.state.loading |= 4;
              resource.instance = instance;
              markNodeAsHoistable(instance);
              return;
            }
            instance = hoistableRoot.ownerDocument || hoistableRoot;
            props = stylesheetPropsFromRawProps(props);
            (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
            instance = instance.createElement("link");
            markNodeAsHoistable(instance);
            var linkInstance = instance;
            linkInstance._p = new Promise(function(resolve, reject) {
              linkInstance.onload = resolve;
              linkInstance.onerror = reject;
            });
            setInitialProperties(instance, "link", props);
            resource.instance = instance;
          }
          null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
          state.stylesheets.set(resource, hoistableRoot);
          (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
        }
      }
      function waitForCommitToBeReady() {
        if (null === suspendedState) throw Error(formatProdErrorMessage(475));
        var state = suspendedState;
        state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
        return 0 < state.count ? function(commit) {
          var stylesheetTimer = setTimeout(function() {
            state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
            if (state.unsuspend) {
              var unsuspend = state.unsuspend;
              state.unsuspend = null;
              unsuspend();
            }
          }, 6e4);
          state.unsuspend = commit;
          return function() {
            state.unsuspend = null;
            clearTimeout(stylesheetTimer);
          };
        } : null;
      }
      function onUnsuspend() {
        this.count--;
        if (0 === this.count) {
          if (this.stylesheets) insertSuspendedStylesheets(this, this.stylesheets);
          else if (this.unsuspend) {
            var unsuspend = this.unsuspend;
            this.unsuspend = null;
            unsuspend();
          }
        }
      }
      var precedencesByRoot = null;
      function insertSuspendedStylesheets(state, resources) {
        state.stylesheets = null;
        null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
      }
      function insertStylesheetIntoRoot(root2, resource) {
        if (!(resource.state.loading & 4)) {
          var precedences = precedencesByRoot.get(root2);
          if (precedences) var last = precedences.get(null);
          else {
            precedences = /* @__PURE__ */ new Map();
            precedencesByRoot.set(root2, precedences);
            for (var nodes = root2.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ), i7 = 0; i7 < nodes.length; i7++) {
              var node = nodes[i7];
              if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
                precedences.set(node.dataset.precedence, node), last = node;
            }
            last && precedences.set(null, last);
          }
          nodes = resource.instance;
          node = nodes.getAttribute("data-precedence");
          i7 = precedences.get(node) || last;
          i7 === last && precedences.set(null, nodes);
          precedences.set(node, nodes);
          this.count++;
          last = onUnsuspend.bind(this);
          nodes.addEventListener("load", last);
          nodes.addEventListener("error", last);
          i7 ? i7.parentNode.insertBefore(nodes, i7.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
          resource.state.loading |= 4;
        }
      }
      var HostTransitionContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Provider: null,
        Consumer: null,
        _currentValue: sharedNotPendingObject,
        _currentValue2: sharedNotPendingObject,
        _threadCount: 0
      };
      function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, formState) {
        this.tag = 1;
        this.containerInfo = containerInfo;
        this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
        this.callbackPriority = 0;
        this.expirationTimes = createLaneMap(-1);
        this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = createLaneMap(0);
        this.hiddenUpdates = createLaneMap(null);
        this.identifierPrefix = identifierPrefix;
        this.onUncaughtError = onUncaughtError;
        this.onCaughtError = onCaughtError;
        this.onRecoverableError = onRecoverableError;
        this.pooledCache = null;
        this.pooledCacheLanes = 0;
        this.formState = formState;
        this.incompleteTransitions = /* @__PURE__ */ new Map();
      }
      function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, transitionCallbacks, formState) {
        containerInfo = new FiberRootNode(
          containerInfo,
          tag,
          hydrate,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          formState
        );
        tag = 1;
        true === isStrictMode && (tag |= 24);
        isStrictMode = createFiberImplClass(3, null, null, tag);
        containerInfo.current = isStrictMode;
        isStrictMode.stateNode = containerInfo;
        tag = createCache();
        tag.refCount++;
        containerInfo.pooledCache = tag;
        tag.refCount++;
        isStrictMode.memoizedState = {
          element: initialChildren,
          isDehydrated: hydrate,
          cache: tag
        };
        initializeUpdateQueue(isStrictMode);
        return containerInfo;
      }
      function getContextForSubtree(parentComponent) {
        if (!parentComponent) return emptyContextObject;
        parentComponent = emptyContextObject;
        return parentComponent;
      }
      function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
        parentComponent = getContextForSubtree(parentComponent);
        null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
        container = createUpdate(lane);
        container.payload = { element };
        callback = void 0 === callback ? null : callback;
        null !== callback && (container.callback = callback);
        element = enqueueUpdate(rootFiber, container, lane);
        null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
      }
      function markRetryLaneImpl(fiber, retryLane) {
        fiber = fiber.memoizedState;
        if (null !== fiber && null !== fiber.dehydrated) {
          var a3 = fiber.retryLane;
          fiber.retryLane = 0 !== a3 && a3 < retryLane ? a3 : retryLane;
        }
      }
      function markRetryLaneIfNotHydrated(fiber, retryLane) {
        markRetryLaneImpl(fiber, retryLane);
        (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
      }
      function attemptContinuousHydration(fiber) {
        if (13 === fiber.tag) {
          var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
          null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
          markRetryLaneIfNotHydrated(fiber, 67108864);
        }
      }
      var _enabled = true;
      function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (_enabled) {
          var blockedOn = findInstanceBlockingEvent(nativeEvent);
          if (null === blockedOn)
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              return_targetInst,
              targetContainer
            ), clearIfContinuousEvent(domEventName, nativeEvent);
          else if (queueIfContinuousEvent(
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          ))
            nativeEvent.stopPropagation();
          else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
            for (; null !== blockedOn; ) {
              var fiber = getInstanceFromNode(blockedOn);
              if (null !== fiber)
                switch (fiber.tag) {
                  case 3:
                    fiber = fiber.stateNode;
                    if (fiber.current.memoizedState.isDehydrated) {
                      var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                      if (0 !== lanes) {
                        var root2 = fiber;
                        root2.pendingLanes |= 2;
                        for (root2.entangledLanes |= 2; lanes; ) {
                          var lane = 1 << 31 - clz32(lanes);
                          root2.entanglements[1] |= lane;
                          lanes &= ~lane;
                        }
                        ensureRootIsScheduled(fiber);
                        0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, false));
                      }
                    }
                    break;
                  case 13:
                    root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
                }
              fiber = findInstanceBlockingEvent(nativeEvent);
              null === fiber && dispatchEventForPluginEventSystem(
                domEventName,
                eventSystemFlags,
                nativeEvent,
                return_targetInst,
                targetContainer
              );
              if (fiber === blockedOn) break;
              blockedOn = fiber;
            }
            null !== blockedOn && nativeEvent.stopPropagation();
          } else
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              null,
              targetContainer
            );
        }
      }
      function findInstanceBlockingEvent(nativeEvent) {
        nativeEvent = getEventTarget(nativeEvent);
        return findInstanceBlockingTarget(nativeEvent);
      }
      var return_targetInst = null;
      function findInstanceBlockingTarget(targetNode) {
        return_targetInst = null;
        targetNode = getClosestInstanceFromNode(targetNode);
        if (null !== targetNode) {
          var nearestMounted = getNearestMountedFiber(targetNode);
          if (null === nearestMounted) targetNode = null;
          else {
            var tag = nearestMounted.tag;
            if (13 === tag) {
              targetNode = getSuspenseInstanceFromFiber(nearestMounted);
              if (null !== targetNode) return targetNode;
              targetNode = null;
            } else if (3 === tag) {
              if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
                return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
              targetNode = null;
            } else nearestMounted !== targetNode && (targetNode = null);
          }
        }
        return_targetInst = targetNode;
        return null;
      }
      function getEventPriority(domEventName) {
        switch (domEventName) {
          case "beforetoggle":
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
          case "toggle":
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
            return 2;
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
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 8;
          case "message":
            switch (getCurrentPriorityLevel()) {
              case ImmediatePriority:
                return 2;
              case UserBlockingPriority:
                return 8;
              case NormalPriority$1:
              case LowPriority:
                return 32;
              case IdlePriority:
                return 268435456;
              default:
                return 32;
            }
          default:
            return 32;
        }
      }
      var hasScheduledReplayAttempt = false;
      var queuedFocus = null;
      var queuedDrag = null;
      var queuedMouse = null;
      var queuedPointers = /* @__PURE__ */ new Map();
      var queuedPointerCaptures = /* @__PURE__ */ new Map();
      var queuedExplicitHydrationTargets = [];
      var discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
      function clearIfContinuousEvent(domEventName, nativeEvent) {
        switch (domEventName) {
          case "focusin":
          case "focusout":
            queuedFocus = null;
            break;
          case "dragenter":
          case "dragleave":
            queuedDrag = null;
            break;
          case "mouseover":
          case "mouseout":
            queuedMouse = null;
            break;
          case "pointerover":
          case "pointerout":
            queuedPointers.delete(nativeEvent.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            queuedPointerCaptures.delete(nativeEvent.pointerId);
        }
      }
      function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
          return existingQueuedEvent = {
            blockedOn,
            domEventName,
            eventSystemFlags,
            nativeEvent,
            targetContainers: [targetContainer]
          }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
        existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
        blockedOn = existingQueuedEvent.targetContainers;
        null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
        return existingQueuedEvent;
      }
      function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        switch (domEventName) {
          case "focusin":
            return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedFocus,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "dragenter":
            return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedDrag,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "mouseover":
            return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedMouse,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "pointerover":
            var pointerId = nativeEvent.pointerId;
            queuedPointers.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointers.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            );
            return true;
          case "gotpointercapture":
            return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointerCaptures.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            ), true;
        }
        return false;
      }
      function attemptExplicitHydrationTarget(queuedTarget) {
        var targetInst = getClosestInstanceFromNode(queuedTarget.target);
        if (null !== targetInst) {
          var nearestMounted = getNearestMountedFiber(targetInst);
          if (null !== nearestMounted) {
            if (targetInst = nearestMounted.tag, 13 === targetInst) {
              if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
                queuedTarget.blockedOn = targetInst;
                runWithPriority(queuedTarget.priority, function() {
                  if (13 === nearestMounted.tag) {
                    var lane = requestUpdateLane();
                    lane = getBumpedLaneForHydrationByLane(lane);
                    var root2 = enqueueConcurrentRenderForLane(nearestMounted, lane);
                    null !== root2 && scheduleUpdateOnFiber(root2, nearestMounted, lane);
                    markRetryLaneIfNotHydrated(nearestMounted, lane);
                  }
                });
                return;
              }
            } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
              queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
              return;
            }
          }
        }
        queuedTarget.blockedOn = null;
      }
      function attemptReplayContinuousQueuedEvent(queuedEvent) {
        if (null !== queuedEvent.blockedOn) return false;
        for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
          var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
          if (null === nextBlockedOn) {
            nextBlockedOn = queuedEvent.nativeEvent;
            var nativeEventClone = new nextBlockedOn.constructor(
              nextBlockedOn.type,
              nextBlockedOn
            );
            currentReplayingEvent = nativeEventClone;
            nextBlockedOn.target.dispatchEvent(nativeEventClone);
            currentReplayingEvent = null;
          } else
            return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
          targetContainers.shift();
        }
        return true;
      }
      function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
        attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
      }
      function replayUnblockedEvents() {
        hasScheduledReplayAttempt = false;
        null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
        null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
        null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
        queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
        queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
      }
      function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
        queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          replayUnblockedEvents
        )));
      }
      var lastScheduledReplayQueue = null;
      function scheduleReplayQueueIfNeeded(formReplayingQueue) {
        lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          function() {
            lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
            for (var i7 = 0; i7 < formReplayingQueue.length; i7 += 3) {
              var form = formReplayingQueue[i7], submitterOrAction = formReplayingQueue[i7 + 1], formData = formReplayingQueue[i7 + 2];
              if ("function" !== typeof submitterOrAction)
                if (null === findInstanceBlockingTarget(submitterOrAction || form))
                  continue;
                else break;
              var formInst = getInstanceFromNode(form);
              null !== formInst && (formReplayingQueue.splice(i7, 3), i7 -= 3, startHostTransition(
                formInst,
                {
                  pending: true,
                  data: formData,
                  method: form.method,
                  action: submitterOrAction
                },
                submitterOrAction,
                formData
              ));
            }
          }
        ));
      }
      function retryIfBlockedOn(unblocked) {
        function unblock(queuedEvent) {
          return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
        }
        null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
        null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
        null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
        queuedPointers.forEach(unblock);
        queuedPointerCaptures.forEach(unblock);
        for (var i7 = 0; i7 < queuedExplicitHydrationTargets.length; i7++) {
          var queuedTarget = queuedExplicitHydrationTargets[i7];
          queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
        }
        for (; 0 < queuedExplicitHydrationTargets.length && (i7 = queuedExplicitHydrationTargets[0], null === i7.blockedOn); )
          attemptExplicitHydrationTarget(i7), null === i7.blockedOn && queuedExplicitHydrationTargets.shift();
        i7 = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
        if (null != i7)
          for (queuedTarget = 0; queuedTarget < i7.length; queuedTarget += 3) {
            var form = i7[queuedTarget], submitterOrAction = i7[queuedTarget + 1], formProps = form[internalPropsKey] || null;
            if ("function" === typeof submitterOrAction)
              formProps || scheduleReplayQueueIfNeeded(i7);
            else if (formProps) {
              var action = null;
              if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
                if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
                  action = formProps.formAction;
                else {
                  if (null !== findInstanceBlockingTarget(form)) continue;
                }
              else action = formProps.action;
              "function" === typeof action ? i7[queuedTarget + 1] = action : (i7.splice(queuedTarget, 3), queuedTarget -= 3);
              scheduleReplayQueueIfNeeded(i7);
            }
          }
      }
      function ReactDOMRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
        var root2 = this._internalRoot;
        if (null === root2) throw Error(formatProdErrorMessage(409));
        var current = root2.current, lane = requestUpdateLane();
        updateContainerImpl(current, lane, children, root2, null, null);
      };
      ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
        var root2 = this._internalRoot;
        if (null !== root2) {
          this._internalRoot = null;
          var container = root2.containerInfo;
          updateContainerImpl(root2.current, 2, null, root2, null, null);
          flushSyncWork$1();
          container[internalContainerInstanceKey] = null;
        }
      };
      function ReactDOMHydrationRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
        if (target) {
          var updatePriority = resolveUpdatePriority();
          target = { blockedOn: null, target, priority: updatePriority };
          for (var i7 = 0; i7 < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i7].priority; i7++) ;
          queuedExplicitHydrationTargets.splice(i7, 0, target);
          0 === i7 && attemptExplicitHydrationTarget(target);
        }
      };
      var isomorphicReactPackageVersion$jscomp$inline_1785 = React39.version;
      if ("19.1.1" !== isomorphicReactPackageVersion$jscomp$inline_1785)
        throw Error(
          formatProdErrorMessage(
            527,
            isomorphicReactPackageVersion$jscomp$inline_1785,
            "19.1.1"
          )
        );
      ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
        var fiber = componentOrElement._reactInternals;
        if (void 0 === fiber) {
          if ("function" === typeof componentOrElement.render)
            throw Error(formatProdErrorMessage(188));
          componentOrElement = Object.keys(componentOrElement).join(",");
          throw Error(formatProdErrorMessage(268, componentOrElement));
        }
        componentOrElement = findCurrentFiberUsingSlowPath(fiber);
        componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
        componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
        return componentOrElement;
      };
      var internals$jscomp$inline_2256 = {
        bundleType: 0,
        version: "19.1.1",
        rendererPackageName: "react-dom",
        currentDispatcherRef: ReactSharedInternals,
        reconcilerVersion: "19.1.1"
      };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        hook$jscomp$inline_2257 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!hook$jscomp$inline_2257.isDisabled && hook$jscomp$inline_2257.supportsFiber)
          try {
            rendererID = hook$jscomp$inline_2257.inject(
              internals$jscomp$inline_2256
            ), injectedHook = hook$jscomp$inline_2257;
          } catch (err) {
          }
      }
      var hook$jscomp$inline_2257;
      exports.createRoot = function(container, options2) {
        if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
        var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, transitionCallbacks = null;
        null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.unstable_transitionCallbacks && (transitionCallbacks = options2.unstable_transitionCallbacks));
        options2 = createFiberRoot(
          container,
          1,
          false,
          null,
          null,
          isStrictMode,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          transitionCallbacks,
          null
        );
        container[internalContainerInstanceKey] = options2.current;
        listenToAllSupportedEvents(container);
        return new ReactDOMRoot(options2);
      };
      exports.hydrateRoot = function(container, initialChildren, options2) {
        if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
        var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, transitionCallbacks = null, formState = null;
        null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.unstable_transitionCallbacks && (transitionCallbacks = options2.unstable_transitionCallbacks), void 0 !== options2.formState && (formState = options2.formState));
        initialChildren = createFiberRoot(
          container,
          1,
          true,
          initialChildren,
          null != options2 ? options2 : null,
          isStrictMode,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          transitionCallbacks,
          formState
        );
        initialChildren.context = getContextForSubtree(null);
        options2 = initialChildren.current;
        isStrictMode = requestUpdateLane();
        isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
        identifierPrefix = createUpdate(isStrictMode);
        identifierPrefix.callback = null;
        enqueueUpdate(options2, identifierPrefix, isStrictMode);
        options2 = isStrictMode;
        initialChildren.current.lanes = options2;
        markRootUpdated$1(initialChildren, options2);
        ensureRootIsScheduled(initialChildren);
        container[internalContainerInstanceKey] = initialChildren.current;
        listenToAllSupportedEvents(container);
        return new ReactDOMHydrationRoot(initialChildren);
      };
      exports.version = "19.1.1";
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports, module) {
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
        module.exports = require_react_dom_client_production();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.js
  var require_react_jsx_runtime_production = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
      "use strict";
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      function jsxProd(type, config, maybeKey) {
        var key = null;
        void 0 !== maybeKey && (key = "" + maybeKey);
        void 0 !== config.key && (key = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        config = maybeKey.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== config ? config : null,
          props: maybeKey
        };
      }
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = jsxProd;
      exports.jsxs = jsxProd;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production();
      } else {
        module.exports = null;
      }
    }
  });

  // src/webview/react/playground/index.tsx
  var import_react75 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeBadge.js
  var import_react = __toESM(require_react(), 1);

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
    react: import_react.default,
    displayName: "VscodeBadge"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeButton.js
  var import_react3 = __toESM(require_react(), 1);

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
    react: import_react3.default,
    displayName: "VscodeButton"
  });
  var VscodeButton_default = VscodeButton3;

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCheckbox.js
  var import_react5 = __toESM(require_react(), 1);

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
    react: import_react5.default,
    displayName: "VscodeCheckbox",
    events: {
      onChange: "change"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCheckboxGroup.js
  var import_react7 = __toESM(require_react(), 1);

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
    react: import_react7.default,
    displayName: "VscodeCheckboxGroup"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeCollapsible.js
  var import_react9 = __toESM(require_react(), 1);

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
    react: import_react9.default,
    displayName: "VscodeCollapsible"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeContextMenu.js
  var import_react11 = __toESM(require_react(), 1);

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
    react: import_react11.default,
    displayName: "VscodeContextMenu",
    events: {
      onVscContextMenuSelect: "vsc-context-menu-select"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeContextMenuItem.js
  var import_react13 = __toESM(require_react(), 1);
  var VscodeContextMenuItem3 = o({
    tagName: "vscode-context-menu-item",
    elementClass: VscodeContextMenuItem,
    react: import_react13.default,
    displayName: "VscodeContextMenuItem"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeDivider.js
  var import_react15 = __toESM(require_react(), 1);

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
    react: import_react15.default,
    displayName: "VscodeDivider"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormContainer.js
  var import_react17 = __toESM(require_react(), 1);

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
    react: import_react17.default,
    displayName: "VscodeFormContainer"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormGroup.js
  var import_react19 = __toESM(require_react(), 1);

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
    react: import_react19.default,
    displayName: "VscodeFormGroup"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeFormHelper.js
  var import_react21 = __toESM(require_react(), 1);

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
    react: import_react21.default,
    displayName: "VscodeFormHelper"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeIcon.js
  var import_react23 = __toESM(require_react(), 1);
  var VscodeIcon3 = o({
    tagName: "vscode-icon",
    elementClass: VscodeIcon,
    react: import_react23.default,
    displayName: "VscodeIcon"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeLabel.js
  var import_react25 = __toESM(require_react(), 1);

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
    react: import_react25.default,
    displayName: "VscodeLabel"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeMultiSelect.js
  var import_react27 = __toESM(require_react(), 1);

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
    react: import_react27.default,
    displayName: "VscodeMultiSelect",
    events: {
      onChange: "change",
      onInvalid: "invalid",
      onVscMultiSelectCreateOption: "vsc-multi-select-create-option"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeOption.js
  var import_react29 = __toESM(require_react(), 1);
  var VscodeOption3 = o({
    tagName: "vscode-option",
    elementClass: VscodeOption,
    react: import_react29.default,
    displayName: "VscodeOption"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeProgressBar.js
  var import_react31 = __toESM(require_react(), 1);

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
    react: import_react31.default,
    displayName: "VscodeProgressBar"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeProgressRing.js
  var import_react33 = __toESM(require_react(), 1);

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
    react: import_react33.default,
    displayName: "VscodeProgressRing"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeRadio.js
  var import_react35 = __toESM(require_react(), 1);

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
    react: import_react35.default,
    displayName: "VscodeRadio",
    events: {
      onChange: "change",
      onInvalid: "invalid"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeRadioGroup.js
  var import_react37 = __toESM(require_react(), 1);

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
    react: import_react37.default,
    displayName: "VscodeRadioGroup",
    events: {
      onChange: "change"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeScrollable.js
  var import_react39 = __toESM(require_react(), 1);
  var VscodeScrollable3 = o({
    tagName: "vscode-scrollable",
    elementClass: VscodeScrollable,
    react: import_react39.default,
    displayName: "VscodeScrollable"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeSingleSelect.js
  var import_react41 = __toESM(require_react(), 1);

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
    react: import_react41.default,
    displayName: "VscodeSingleSelect",
    events: {
      onChange: "change",
      onInvalid: "invalid",
      onVscSingleSelectCreateOption: "vsc-single-select-create-option"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeSplitLayout.js
  var import_react43 = __toESM(require_react(), 1);

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
    react: import_react43.default,
    displayName: "VscodeSplitLayout",
    events: {
      onVscSplitLayoutChange: "vsc-split-layout-change"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabHeader.js
  var import_react45 = __toESM(require_react(), 1);

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
    react: import_react45.default,
    displayName: "VscTabHeader"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTable.js
  var import_react47 = __toESM(require_react(), 1);

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
    react: import_react47.default,
    displayName: "VscodeTable"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableBody.js
  var import_react49 = __toESM(require_react(), 1);

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
    react: import_react49.default,
    displayName: "VscodeTableBody"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableCell.js
  var import_react51 = __toESM(require_react(), 1);

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
    react: import_react51.default,
    displayName: "VscodeTableCell"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableHeader.js
  var import_react53 = __toESM(require_react(), 1);

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
    react: import_react53.default,
    displayName: "VscodeTableHeader"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableHeaderCell.js
  var import_react55 = __toESM(require_react(), 1);

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
    react: import_react55.default,
    displayName: "VscodeTableHeaderCell"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTableRow.js
  var import_react57 = __toESM(require_react(), 1);

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
    react: import_react57.default,
    displayName: "VscodeTableRow"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabPanel.js
  var import_react59 = __toESM(require_react(), 1);

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
    react: import_react59.default,
    displayName: "VscodeTabPanel"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTabs.js
  var import_react61 = __toESM(require_react(), 1);

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
    react: import_react61.default,
    events: {
      onVscTabsSelect: "vsc-tabs-select"
    },
    displayName: "VscodeTabs"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTextarea.js
  var import_react63 = __toESM(require_react(), 1);

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
    react: import_react63.default,
    displayName: "VscodeTextarea",
    events: {
      onChange: "change",
      onInput: "input",
      onInvalid: "invalid"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTextfield.js
  var import_react65 = __toESM(require_react(), 1);

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
    react: import_react65.default,
    displayName: "VscodeTextfield",
    events: {
      onChange: "change",
      onInput: "input",
      onInvalid: "invalid"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeToolbarButton.js
  var import_react67 = __toESM(require_react(), 1);

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
    react: import_react67.default,
    displayName: "VscodeToolbarButton",
    events: {
      onChange: "change"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeToolbarContainer.js
  var import_react69 = __toESM(require_react(), 1);

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
    react: import_react69.default,
    displayName: "VscodeToolbarContainer"
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTree.js
  var import_react71 = __toESM(require_react(), 1);

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
    react: import_react71.default,
    displayName: "VscodeTree",
    events: {
      onVscTreeSelect: "vsc-tree-select"
    }
  });

  // node_modules/@vscode-elements/react-elements/dist/components/VscodeTreeItem.js
  var import_react73 = __toESM(require_react(), 1);

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
    react: import_react73.default,
    displayName: "VscodeTreeItem"
  });

  // src/webview/react/playground/index.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var vscode = acquireVsCodeApi == null ? void 0 : acquireVsCodeApi();
  var App = () => {
    const [count, setCount] = (0, import_react75.useState)(0);
    const [messages, setMessages] = (0, import_react75.useState)([]);
    (0, import_react75.useEffect)(() => {
      const listener = (event) => {
        const msg = event.data;
        setMessages((m3) => [...m3, JSON.stringify(msg)]);
      };
      window.addEventListener("message", listener);
      return () => window.removeEventListener("message", listener);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: 12, fontFamily: "var(--vscode-font-family)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: { marginTop: 0 }, children: "VSCode Elements Playground" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { style: { color: "var(--vscode-editor-foreground)" }, children: "Hello World" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "Minimal React test view using ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "vscode-elements" }),
        ". Increment the counter and post a message back to the extension."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VscodeButton_default, { onClick: () => setCount((c6) => c6 + 1), children: [
          "Count: ",
          count
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VscodeButton_default, { onClick: () => vscode == null ? void 0 : vscode.postMessage({ type: "ping", count }), children: "Send Ping" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { style: { marginTop: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Incoming Messages" }),
        messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "No messages yet." }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { style: { fontSize: 12, maxHeight: 120, overflow: "auto", border: "1px solid var(--vscode-panel-border)", padding: 8 }, children: messages.map((m3, i7) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { style: { marginBottom: 4 }, children: m3 }, i7)) })
      ] })
    ] });
  };
  var rootEl = document.getElementById("root");
  if (rootEl) {
    (0, import_client.createRoot)(rootEl).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}));
  }
})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
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
//# sourceMappingURL=playground.js.map
