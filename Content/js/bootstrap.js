/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
    (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
  }(this, function (exports, $, Popper) { 'use strict';
  
    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
    Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;
  
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
  
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
  
      return obj;
    }
  
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
  
        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
  
        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }
  
      return target;
    }
  
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ar y  a nn ag a r27 | ar y an n a g ar
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
  
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  
    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }
  
    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }
  
          return undefined; // eslint-disable-line no-undefined
        }
      };
    }
  
    function transitionEndEmulator(duration) {
      var _this = this;
  
      var called = false;
      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }
  
    function setTransitionEndSupport() {
      $.fn.emulateTransitionEnd = transitionEndEmulator;
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */
  
  
    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));
  
        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');
  
        if (!selector || selector === '#') {
          var hrefAttr = element.getAttribute('href');
          selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
        }
  
        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element
  
  
        var transitionDuration = $(element).css('transition-duration');
        var transitionDelay = $(element).css('transition-delay');
        var floatTransitionDuration = parseFloat(transitionDuration);
        var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found
  
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        } // If multiple durations are defined, take the first
  
  
        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);
  
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      },
      findShadowRoot: function findShadowRoot(element) {
        if (!document.documentElement.attachShadow) {
          return null;
        } // Can find the shadow root otherwise it'll return the document
  
  
        if (typeof element.getRootNode === 'function') {
          var root = element.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }
  
        if (element instanceof ShadowRoot) {
          return element;
        } // when we don't find a shadow root
  
  
        if (!element.parentNode) {
          return null;
        }
  
        return Util.findShadowRoot(element.parentNode);
      }
    };
    setTransitionEndSupport();
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME = 'alert';
    var VERSION = '4.3.1';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters
  
  
      var _proto = Alert.prototype;
  
      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;
  
        if (element) {
          rootElement = this._getRootElement(element);
        }
  
        var customEvent = this._triggerCloseEvent(rootElement);
  
        if (customEvent.isDefaultPrevented()) {
          return;
        }
  
        this._removeElement(rootElement);
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      } // Private
      ;
  
      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;
    /* designed & created by: ar ya n na g a r | ar ya nn  a g ar 27 */
        if (selector) {
          parent = document.querySelector(selector);
        }
  
        if (!parent) {
          parent = $(element).closest("." + ClassName.ALERT)[0];
        }
  
        return parent;
      };
  
      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);
        $(element).trigger(closeEvent);
        return closeEvent;
      };
  
      _proto._removeElement = function _removeElement(element) {
        var _this = this;
  
        $(element).removeClass(ClassName.SHOW);
  
        if (!$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
  
          return;
        }
  
        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };
  
      _proto._destroyElement = function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      } // Static
      ;
  
      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
  
          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }
  
          if (config === 'close') {
            data[config](this);
          }
        });
      };
  
      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }
  
          alertInstance.close(this);
        };
      };
  
      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
  
      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
  
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$1 = 'button';
    var VERSION$1 = '4.3.1';
    var DATA_KEY$1 = 'bs.button';
    var EVENT_KEY$1 = "." + DATA_KEY$1;
    var DATA_API_KEY$1 = '.data-api';
    var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
    var ClassName$1 = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector$1 = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input:not([type="hidden"])',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event$1 = {
      CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters
  
  
      var _proto = Button.prototype;
  
      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];
  
        if (rootElement) {
          var input = this._element.querySelector(Selector$1.INPUT);
  
          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector$1.ACTIVE);
  
                if (activeElement) {
                  $(activeElement).removeClass(ClassName$1.ACTIVE);
                }
              }
            }
  
            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }
  
              input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
              $(input).trigger('change');
            }
  
            input.focus();
            addAriaPressed = false;
          }
        }
  
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));        
          /* a r ya n na ga r | a r ya n n a g a r 27 */
        }
  
        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName$1.ACTIVE);
        }
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$1);
        this._element = null;
      } // Static
      ;
  
      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$1);
  
          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY$1, data);
          }
  
          if (config === 'toggle') {
            data[config]();
          }
        });
      };
  
      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$1;
        }
      }]);
  
      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;
  
      if (!$(button).hasClass(ClassName$1.BUTTON)) {
        button = $(button).closest(Selector$1.BUTTON);
      }
  
      Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
      var button = $(event.target).closest(Selector$1.BUTTON)[0];
      $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME$1] = Button._jQueryInterface;
    $.fn[NAME$1].Constructor = Button;
  
    $.fn[NAME$1].noConflict = function () {
      $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Button._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$2 = 'carousel';
    var VERSION$2 = '4.3.1';
    var DATA_KEY$2 = 'bs.carousel';
    var EVENT_KEY$2 = "." + DATA_KEY$2;
    var DATA_API_KEY$2 = '.data-api';
    var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  
    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  
    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
  
    var SWIPE_THRESHOLD = 40;
    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true,
      touch: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean',
      touch: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event$2 = {
      SLIDE: "slide" + EVENT_KEY$2,
      SLID: "slid" + EVENT_KEY$2,
      KEYDOWN: "keydown" + EVENT_KEY$2,
      MOUSEENTER: "mouseenter" + EVENT_KEY$2,
      MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
      TOUCHSTART: "touchstart" + EVENT_KEY$2,
      TOUCHMOVE: "touchmove" + EVENT_KEY$2,
      TOUCHEND: "touchend" + EVENT_KEY$2,
      POINTERDOWN: "pointerdown" + EVENT_KEY$2,
      POINTERUP: "pointerup" + EVENT_KEY$2,
      DRAG_START: "dragstart" + EVENT_KEY$2,
      LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
      CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
    };
    var ClassName$2 = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item',
      POINTER_EVENT: 'pointer-event'
    };
    var Selector$2 = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      ITEM_IMG: '.carousel-item img',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
    };
    var PointerType = {
      TOUCH: 'touch',
      PEN: 'pen'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this.touchStartX = 0;
        this.touchDeltaX = 0;
        this._config = this._getConfig(config);
        this._element = element;
        this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
        this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
        this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
  
        this._addEventListeners();
      } // Getters
  
  
      var _proto = Carousel.prototype;
  
      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };
  
      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };
  
      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };
  
      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }
  
        if (this._element.querySelector(Selector$2.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }
  
        clearInterval(this._interval);
        this._interval = null;
      };
  
      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }
  
        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }
  
        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };
  
      _proto.to = function to(index) {
        var _this = this;
  
        this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);
  
        var activeIndex = this._getItemIndex(this._activeElement);
  
        if (index > this._items.length - 1 || index < 0) {
          return;
        }
  
        if (this._isSliding) {
          $(this._element).one(Event$2.SLID, function () {
            return _this.to(index);
          });
          return;
        }
  
        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }
  
        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;
  
        this._slide(direction, this._items[index]);
      };
  
      _proto.dispose = function dispose() {
        $(this._element).off(EVENT_KEY$2);
        $.removeData(this._element, DATA_KEY$2);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      } // Private
      ;
  
      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME$2, config, DefaultType);
        return config;
      };
  
      _proto._handleSwipe = function _handleSwipe() {
        var absDeltax = Math.abs(this.touchDeltaX);
  
        if (absDeltax <= SWIPE_THRESHOLD) {
          return;
        }
  
        var direction = absDeltax / this.touchDeltaX; // swipe left
  
        if (direction > 0) {
          this.prev();
        } // swipe right
  
  
        if (direction < 0) {
          this.next();
        }
      };
  
      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;
  
        if (this._config.keyboard) {
          $(this._element).on(Event$2.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }
  
        if (this._config.pause === 'hover') {
          $(this._element).on(Event$2.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event$2.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });
        }
  
        if (this._config.touch) {
          this._addTouchEventListeners();
        }
      };
  
      _proto._addTouchEventListeners = function _addTouchEventListeners() {
        var _this3 = this;
  
        if (!this._touchSupported) {
          return;
        }
  
        var start = function start(event) {
          if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
            _this3.touchStartX = event.originalEvent.clientX;
          } else if (!_this3._pointerEvent) {
            _this3.touchStartX = event.originalEvent.touches[0].clientX;
          }
        };
  
        var move = function move(event) {
          // ensure swiping with one touch and not pinching
          if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
            _this3.touchDeltaX = 0;
          } else {
            _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
          }
        };
  
        var end = function end(event) {
          if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
            _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
          }
  
          _this3._handleSwipe();
  
          if (_this3._config.pause === 'hover') {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // created by: a r y a n n a g a r |   ar  ya  n na  ga r2 7
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            _this3.pause();
  
            if (_this3.touchTimeout) {
              clearTimeout(_this3.touchTimeout);
            }
  
            _this3.touchTimeout = setTimeout(function (event) {
              return _this3.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
          }
        };
  
        $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
          return e.preventDefault();
        });
  
        if (this._pointerEvent) {
          $(this._element).on(Event$2.POINTERDOWN, function (event) {
            return start(event);
          });
          $(this._element).on(Event$2.POINTERUP, function (event) {
            return end(event);
          });
  
          this._element.classList.add(ClassName$2.POINTER_EVENT);
        } else {
          $(this._element).on(Event$2.TOUCHSTART, function (event) {
            return start(event);
          });
          $(this._element).on(Event$2.TOUCHMOVE, function (event) {
            return move(event);
          });
          $(this._element).on(Event$2.TOUCHEND, function (event) {
            return end(event);
          });
        }
      };
  
      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }
  
        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;
  
          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;
  
          default:
        }
      };
  
      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
        return this._items.indexOf(element);
      };
  
      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;
  
        var activeIndex = this._getItemIndex(activeElement);
  
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;
  
        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }
  
        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };
  
      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {  
      /* designed & created by: a r ya n n  a g ar | a r y a n n a g a r 27 */
        var targetIndex = this._getItemIndex(relatedTarget);
  
        var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));
  
        var slideEvent = $.Event(Event$2.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $(this._element).trigger(slideEvent);
        return slideEvent;
      };
  
      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
          $(indicators).removeClass(ClassName$2.ACTIVE);
  
          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];
  
          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName$2.ACTIVE);
          }
        }
      };
  
      _proto._slide = function _slide(direction, element) {
        var _this4 = this;
  
        var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);
  
        var activeElementIndex = this._getItemIndex(activeElement);
  
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
  
        var nextElementIndex = this._getItemIndex(nextElement);
  
        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;
  
        if (direction === Direction.NEXT) {
          directionalClassName = ClassName$2.LEFT;
          orderClassName = ClassName$2.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName$2.RIGHT;
          orderClassName = ClassName$2.PREV;
          eventDirectionName = Direction.RIGHT;
        }
  
        if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
          this._isSliding = false;
          return;
        }
  
        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
  
        if (slideEvent.isDefaultPrevented()) {
          return;
        }
  
        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }
  
        this._isSliding = true;
  
        if (isCycling) {
          this.pause();
        }
  
        this._setActiveIndicatorElement(nextElement);
  
        var slidEvent = $.Event(Event$2.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
          /**
     * ------------------------------------------------------------------------
     * a r y a n n a g a r 27
     * ------------------------------------------------------------------------
     */
  
        if ($(this._element).hasClass(ClassName$2.SLIDE)) {
          $(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);
          var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);
  
          if (nextElementInterval) {
            this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
            this._config.interval = nextElementInterval;
          } else {
            this._config.interval = this._config.defaultInterval || this._config.interval;
          }
  
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
            $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this4._isSliding = false;
            setTimeout(function () {
              return $(_this4._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $(activeElement).removeClass(ClassName$2.ACTIVE);
          $(nextElement).addClass(ClassName$2.ACTIVE);
          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }
  
        if (isCycling) {
          this.cycle();
        }
      } // Static
      ;
  
      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$2);
  
          var _config = _objectSpread({}, Default, $(this).data());
  
          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }
  
          var action = typeof config === 'string' ? config : _config.slide;
  
          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY$2, data);
          }
  
          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }
  
            data[action]();
          } else if (_config.interval && _config.ride) {
            data.pause();
            data.cycle();
          }
        });
      };
  
      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);
  
        if (!selector) {
          return;
        }
  
        var target = $(selector)[0];
  
        if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
          return;
        }
  
        var config = _objectSpread({}, $(target).data(), $(this).data());
  
        var slideIndex = this.getAttribute('data-slide-to');
  
        if (slideIndex) {
          config.interval = false;
        }
  
        Carousel._jQueryInterface.call($(target), config);
  
        if (slideIndex) {
          $(target).data(DATA_KEY$2).to(slideIndex);
        }
  
        event.preventDefault();
      };
  
      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$2;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);
  
      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * ar y an Data Api implementation na g ar
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
    $(window).on(Event$2.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));
  
      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $(carousels[i]);
  
        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
    * designed & created by: ar ya n na g a r | a r y an na ga r2 7 
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME$2] = Carousel._jQueryInterface;
    $.fn[NAME$2].Constructor = Carousel;
  
    $.fn[NAME$2].noConflict = function () {
      $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
      return Carousel._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$3 = 'collapse';
    var VERSION$3 = '4.3.1';
    var DATA_KEY$3 = 'bs.collapse';
    var EVENT_KEY$3 = "." + DATA_KEY$3;
    var DATA_API_KEY$3 = '.data-api';
    var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
    var Default$1 = {
      toggle: true,
      parent: ''
    };
    var DefaultType$1 = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event$3 = {
      SHOW: "show" + EVENT_KEY$3,
      SHOWN: "shown" + EVENT_KEY$3,
      HIDE: "hide" + EVENT_KEY$3,
      HIDDEN: "hidden" + EVENT_KEY$3,
      CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
    };
    var ClassName$3 = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector$3 = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));
  
        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });
  
          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;
  
            this._triggerArray.push(elem);
          }
        }
  
        this._parent = this._config.parent ? this._getParent() : null;
  
        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }
  
        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters
  
  
      var _proto = Collapse.prototype;
  
      // Public
      _proto.toggle = function toggle() {
        if ($(this._element).hasClass(ClassName$3.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };
  
      _proto.show = function show() {
        var _this = this;
  
        if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
          return;
        }
  
        var actives;
        var activesData;
  
        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
            if (typeof _this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === _this._config.parent;
            }
  
            return elem.classList.contains(ClassName$3.COLLAPSE);
          });
  
          if (actives.length === 0) {
            actives = null;
          }
        }
  
        if (actives) {
          activesData = $(actives).not(this._selector).data(DATA_KEY$3);
  
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }
  
        var startEvent = $.Event(Event$3.SHOW);
        $(this._element).trigger(startEvent);
  
        if (startEvent.isDefaultPrevented()) {
          return;
        }
  
        if (actives) {
          Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');
  
          if (!activesData) {
            $(actives).data(DATA_KEY$3, null);
          }
        }
  
        var dimension = this._getDimension();
  
        $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
        this._element.style[dimension] = 0;
  
        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
        }
  
        this.setTransitioning(true);
  
        var complete = function complete() {
          $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
          _this._element.style[dimension] = '';
  
          _this.setTransitioning(false);
  
          $(_this._element).trigger(Event$3.SHOWN);
        };
  
        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };
  
      _proto.hide = function hide() {
        var _this2 = this;
  
        if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
          return;
        }
  
        var startEvent = $.Event(Event$3.HIDE);
        $(this._element).trigger(startEvent);
  
        if (startEvent.isDefaultPrevented()) {
          return;
        }
  
        var dimension = this._getDimension();
  
        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
        var triggerArrayLength = this._triggerArray.length;
  
        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);
  
            if (selector !== null) {
              var $elem = $([].slice.call(document.querySelectorAll(selector)));
  
              if (!$elem.hasClass(ClassName$3.SHOW)) {
                $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }
  
        this.setTransitioning(true);
  
        var complete = function complete() {
          _this2.setTransitioning(false);
  
          $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
        };
  
        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };
  
      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$3);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      } // Private
      ;
  
      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default$1, config);
        config.toggle = Boolean(config.toggle); // Coerce string values
  
        Util.typeCheckConfig(NAME$3, config, DefaultType$1);
        return config;
      };
  
      _proto._getDimension = function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };
  
      _proto._getParent = function _getParent() {
        var _this3 = this;
  
        var parent;
  
        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object
  
          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }
  
        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };
  
      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        var isOpen = $(element).hasClass(ClassName$3.SHOW);
  
        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      } // Static
      ;
  
      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };
  
      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY$3);
  
          var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});
  
          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }
  
          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY$3, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config]();
          }
        });
      };
  
      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$3;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$1;
        }
      }]);
  
      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements a r ya nn ag ar  27 | a r y a n n a  g a r (which change the URL) not inside the collapsible element    
      /* designed & created by: a r y an n a ga r | ar y an  n ag ar 2 7 */
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }
  
      var $trigger = $(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $(selectors).each(function () {
        var $target = $(this);
        var data = $target.data(DATA_KEY$3);
        var config = data ? 'toggle' : $trigger.data();
  
        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME$3] = Collapse._jQueryInterface;
    $.fn[NAME$3].Constructor = Collapse;
  
    $.fn[NAME$3].noConflict = function () {
      $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
      return Collapse._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$4 = 'dropdown';
    var VERSION$4 = '4.3.1';
    var DATA_KEY$4 = 'bs.dropdown';
    var EVENT_KEY$4 = "." + DATA_KEY$4;
    var DATA_API_KEY$4 = '.data-api';
    var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  
    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  
    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  
    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  
    var ARROW_DOWN_KEYCODE = 40; //  a r ya n n a ga r 2 7 KeyboardEvent.which value for down arrow key
  
    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  
    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event$4 = {
      HIDE: "hide" + EVENT_KEY$4,
      HIDDEN: "hidden" + EVENT_KEY$4,
      SHOW: "show" + EVENT_KEY$4,
      SHOWN: "shown" + EVENT_KEY$4,
      CLICK: "click" + EVENT_KEY$4,
      CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
      KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
    };
    var ClassName$4 = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector$4 = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default$2 = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType$2 = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();
  
        this._addEventListeners();
      } // Getters
  
  
      var _proto = Dropdown.prototype;
  
      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
          return;
        }
  
        var parent = Dropdown._getParentFromElement(this._element);
  
        var isActive = $(this._menu).hasClass(ClassName$4.SHOW);
  
        Dropdown._clearMenus();
  
        if (isActive) {
          return;
        }
  
        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $.Event(Event$4.SHOW, relatedTarget);
        $(parent).trigger(showEvent);
  
        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar
  
  
        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           * a  r y a n n a ga r ar  ya n n ag ar2 7
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
          }
  
          var referenceElement = this._element;
  
          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element
  
            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251
  
  
          if (this._config.boundary !== 'scrollParent') {
            $(parent).addClass(ClassName$4.POSITION_STATIC);
          }
  
          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // created by: ar yan n a g ar 27 | a r ya n n a g ar
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
  
  
        if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
          $(document.body).children().on('mouseover', null, $.noop);
        }
  
        this._element.focus();
  
        this._element.setAttribute('aria-expanded', true);
  
        $(this._menu).toggleClass(ClassName$4.SHOW);
        $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
      };
  
      _proto.show = function show() {
        if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
          return;
        }
  
        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $.Event(Event$4.SHOW, relatedTarget);
  
        var parent = Dropdown._getParentFromElement(this._element);
  
        $(parent).trigger(showEvent);
  
        if (showEvent.isDefaultPrevented()) {
          return;
        }
  
        $(this._menu).toggleClass(ClassName$4.SHOW);
        $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
      };
  
      _proto.hide = function hide() {
        if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
          return;
        }
  
        var relatedTarget = {
          relatedTarget: this._element
        };
        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
  
        var parent = Dropdown._getParentFromElement(this._element);
  
        $(parent).trigger(hideEvent);
  
        if (hideEvent.isDefaultPrevented()) {
          return;
        }
  
        $(this._menu).toggleClass(ClassName$4.SHOW);
        $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$4);
        $(this._element).off(EVENT_KEY$4);
        this._element = null;
        this._menu = null;
  
        if (this._popper !== null) {
          this._popper.destroy();
  
          this._popper = null;
        }
      };
  
      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();
  
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // Private
      ;
  
      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;
  
        $(this._element).on(Event$4.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();
  
          _this.toggle();
        });
      };
  
      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
        Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
        return config;
      };
  
      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);
  
          if (parent) {
            this._menu = parent.querySelector(Selector$4.MENU);
          }
        }
  
        return this._menu;
      };
  
      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup
  
        if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
          placement = AttachmentMap.TOP;
  
          if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }
  
        return placement;
      };
  
      _proto._detectNavbar = function _detectNavbar() {
        return $(this._element).closest('.navbar').length > 0;
      };
  
      _proto._getOffset = function _getOffset() {
        var _this2 = this;
  
        var offset = {};
  
        if (typeof this._config.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
            return data;
          };
        } else {
          offset.offset = this._config.offset;
        }
  
        return offset;
      };
  
      _proto._getPopperConfig = function _getPopperConfig() {
        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: this._getOffset(),
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display
  
        };
  
        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }
  
        return popperConfig;
      } // Static
      ;
  
      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$4);
  
          var _config = typeof config === 'object' ? config : null;
  
          if (!data) {
            data = new Dropdown(this, _config);
            $(this).data(DATA_KEY$4, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config]();
          }
        });
      };
  
      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }
  
        var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));
  
        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);
  
          var context = $(toggles[i]).data(DATA_KEY$4);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };
  
          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
  
          if (!context) {
            continue;
          }
  
          var dropdownMenu = context._menu;
  
          if (!$(parent).hasClass(ClassName$4.SHOW)) {
            continue;
          }
  
          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
            continue;
          }
  
          var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);
  
          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support
  
  
          if ('ontouchstart' in document.documentElement) {
            $(document.body).children().off('mouseover', null, $.noop);
          }
  
          toggles[i].setAttribute('aria-expanded', 'false');
          $(dropdownMenu).removeClass(ClassName$4.SHOW);
          $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
        }
      };
  
      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);
  
        if (selector) {
          parent = document.querySelector(selector);
        }
  
        return parent || element.parentNode;
      } // eslint-disable-next-line complexity
      ;
  
      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  = designed by: a r y a n n a g a r - a r y a n na g a  r2 7
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }
  
        event.preventDefault();
        event.stopPropagation();
  
        if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
          return;
        }
  
        var parent = Dropdown._getParentFromElement(this);
  
        var isActive = $(parent).hasClass(ClassName$4.SHOW);
  
        if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
            $(toggle).trigger('focus');
          }
  
          $(this).trigger('click');
          return;
        }
  
        var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));
  
        if (items.length === 0) {
          return;
        }
  
        var index = items.indexOf(event.target);
  
        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }
  
        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }
  
        if (index < 0) {
          index = 0;
        }
  
        items[index].focus();
      };
  /**
     * ------------------------------------------------------------------------
     * a r y a n n a g a r 27
     * ------------------------------------------------------------------------
     */
      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$4;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$2;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType$2;
        }
      }]);
  
      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();
  
      Dropdown._jQueryInterface.call($(this), 'toggle');
    }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME$4] = Dropdown._jQueryInterface;
    $.fn[NAME$4].Constructor = Dropdown;
  
    $.fn[NAME$4].noConflict = function () {
      $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
      return Dropdown._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$5 = 'modal';
    var VERSION$5 = '4.3.1';
    var DATA_KEY$5 = 'bs.modal';
    var EVENT_KEY$5 = "." + DATA_KEY$5;
    var DATA_API_KEY$5 = '.data-api';
    var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
    var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key  
    /* designed & created by: ar y a n  n a g a r  | a ry a n na g a r2 7  */
  
    var Default$3 = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType$3 = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event$5 = {
      HIDE: "hide" + EVENT_KEY$5,
      HIDDEN: "hidden" + EVENT_KEY$5,
      SHOW: "show" + EVENT_KEY$5,
      SHOWN: "shown" + EVENT_KEY$5,
      FOCUSIN: "focusin" + EVENT_KEY$5,
      RESIZE: "resize" + EVENT_KEY$5,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
      CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
    };
    var ClassName$5 = {
      SCROLLABLE: 'modal-dialog-scrollable',
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector$5 = {
      DIALOG: '.modal-dialog',
      MODAL_BODY: '.modal-body',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector$5.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._isTransitioning = false;
        this._scrollbarWidth = 0;
      } // Getters
  
  
      var _proto = Modal.prototype;
  
      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };
  
      _proto.show = function show(relatedTarget) {
        var _this = this;
  
        if (this._isShown || this._isTransitioning) {
          return;
        }
  
        if ($(this._element).hasClass(ClassName$5.FADE)) {
          this._isTransitioning = true;
        }
  
        var showEvent = $.Event(Event$5.SHOW, {
          relatedTarget: relatedTarget
        });
        $(this._element).trigger(showEvent);
  
        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }
  
        this._isShown = true;
  
        this._checkScrollbar();
  
        this._setScrollbar();
  
        this._adjustDialog();
  
        this._setEscapeEvent();
  
        this._setResizeEvent();
  
        $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
          $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });
  
        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };
  
      _proto.hide = function hide(event) {
        var _this2 = this;
  
        if (event) {
          event.preventDefault();
        }
  
        if (!this._isShown || this._isTransitioning) {
          return;
        }
  
        var hideEvent = $.Event(Event$5.HIDE);
        $(this._element).trigger(hideEvent);
  
        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }
  
        this._isShown = false;
        var transition = $(this._element).hasClass(ClassName$5.FADE);
  
        if (transition) {
          this._isTransitioning = true;
        }
  
        this._setEscapeEvent();
  
        this._setResizeEvent();
  
        $(document).off(Event$5.FOCUSIN);
        $(this._element).removeClass(ClassName$5.SHOW);
        $(this._element).off(Event$5.CLICK_DISMISS);
        $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);
  
        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };
  
      _proto.dispose = function dispose() {
        [window, this._element, this._dialog].forEach(function (htmlElement) {
          return $(htmlElement).off(EVENT_KEY$5);
        });
        /**
         * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
         * Do not move `document` in `htmlElements` array = a ry a nn a g a r 27 
         * It will remove `Event.CLICK_DATA_API` event that should remain
         */
  
        $(document).off(Event$5.FOCUSIN);
        $.removeData(this._element, DATA_KEY$5);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._isTransitioning = null;
        this._scrollbarWidth = null;
      };
  
      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      } // Private
      ;
  
      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default$3, config);
        Util.typeCheckConfig(NAME$5, config, DefaultType$3);
        return config;
      };
  
      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;
  
        var transition = $(this._element).hasClass(ClassName$5.FADE);
  
        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }
  
        this._element.style.display = 'block';
  
        this._element.removeAttribute('aria-hidden');
  
        this._element.setAttribute('aria-modal', true);
  
        if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
          this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
        } else {
          this._element.scrollTop = 0;
        }
  
        if (transition) {
          Util.reflow(this._element);
        }
  
        $(this._element).addClass(ClassName$5.SHOW);
  
        if (this._config.focus) {
          this._enforceFocus();
        }
  
        var shownEvent = $.Event(Event$5.SHOWN, {
          relatedTarget: relatedTarget
        });
  
        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }
  
          _this3._isTransitioning = false;
          $(_this3._element).trigger(shownEvent);
        };
  
        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };
  
      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;
  
        $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
        .on(Event$5.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };
  
      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;
  
        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE$1) {
              event.preventDefault();
  
              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event$5.KEYDOWN_DISMISS);
        }
      };
  
      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;
  
        if (this._isShown) {
          $(window).on(Event$5.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $(window).off(Event$5.RESIZE);
        }
      };
  
      _proto._hideModal = function _hideModal() {
        var _this7 = this;
  
        this._element.style.display = 'none';
  
        this._element.setAttribute('aria-hidden', true);
  
        this._element.removeAttribute('aria-modal');
  
        this._isTransitioning = false;
  
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName$5.OPEN);
  
          _this7._resetAdjustments();
  
          _this7._resetScrollbar();
  
          $(_this7._element).trigger(Event$5.HIDDEN);
        });
      };
  
      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      };
  
      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;
  
        var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';
  
        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName$5.BACKDROP;
  
          if (animate) {
            this._backdrop.classList.add(animate);
          }
  
          $(this._backdrop).appendTo(document.body);
          $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }
  
            if (event.target !== event.currentTarget) {
              return;
            }
  
            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });
  
          if (animate) {
            Util.reflow(this._backdrop);
          }
  
          $(this._backdrop).addClass(ClassName$5.SHOW);
  
          if (!callback) {
            return;
          }
  
          if (!animate) {
            callback();
            return;
          }
  
          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName$5.SHOW);
  
          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();
  
            if (callback) {
              callback();
            }
          };
  
          if ($(this._element).hasClass(ClassName$5.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
  
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      } // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------
      ;
  
      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
  
        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }
  
        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };
  
      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };
  
      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };
  
      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;
  
        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding
  
          $(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $(element).css('padding-right');
            $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin
  
          $(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $(element).css('margin-right');
            $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding
  
          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $(document.body).css('padding-right');
          $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
  
        $(document.body).addClass(ClassName$5.OPEN);
      };
  
      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        $(fixedContent).each(function (index, element) {
          var padding = $(element).data('padding-right');
          $(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content
  
        var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
        $(elements).each(function (index, element) {
          var margin = $(element).data('margin-right');
  
          if (typeof margin !== 'undefined') {
            $(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding
  
        var padding = $(document.body).data('padding-right');
        $(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };
  
      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      } // Static
      ;
  
      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$5);
  
          var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});
  
          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY$5, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };
  
      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$5;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$3;
        }
      }]);
  
      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
      var _this10 = this;
  
      var target;
      var selector = Util.getSelectorFromElement(this);
  
      if (selector) {
        target = document.querySelector(selector);
      }
  
      var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());
  
      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }
  
      var $target = $(target).one(Event$5.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }
  
        $target.one(Event$5.HIDDEN, function () {
          if ($(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });
  
      Modal._jQueryInterface.call($(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME$5] = Modal._jQueryInterface;
    $.fn[NAME$5].Constructor = Modal;
  
    $.fn[NAME$5].noConflict = function () {
      $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
      return Modal._jQueryInterface;
    };
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): tools/sanitizer.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DefaultWhitelist = {
      // Global attributes allowed on any supplied element below.
      '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
      a: ['target', 'href', 'title', 'rel'],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['src', 'alt', 'title', 'width', 'height'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
      /**
       * A pattern that recognizes a commonly useful subset of URLs that are safe.
       *
       * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
       */
  
    };
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
    /**
     * A pattern that matches safe data URLs. Only matches image, video and audio types.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */
  
    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
  
    function allowedAttribute(attr, allowedAttributeList) {
      var attrName = attr.nodeName.toLowerCase();
  
      if (allowedAttributeList.indexOf(attrName) !== -1) {
        if (uriAttrs.indexOf(attrName) !== -1) {
          return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
        }
  
        return true;
      }
  
      var regExp = allowedAttributeList.filter(function (attrRegex) {
        return attrRegex instanceof RegExp;
      }); // Check if a regular expression validates the attribute.
  
      for (var i = 0, l = regExp.length; i < l; i++) {
        if (attrName.match(regExp[i])) {
          return true;
        }
      }
  
      return false;
    }
  
    function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
      if (unsafeHtml.length === 0) {
        return unsafeHtml;
      }
  
      if (sanitizeFn && typeof sanitizeFn === 'function') {
        return sanitizeFn(unsafeHtml);
      }
  
      var domParser = new window.DOMParser();
      var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
      var whitelistKeys = Object.keys(whiteList);
      var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));
  
      var _loop = function _loop(i, len) {
        var el = elements[i];
        var elName = el.nodeName.toLowerCase();
  
        if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
          el.parentNode.removeChild(el);
          return "continue";
        }
  
        var attributeList = [].slice.call(el.attributes);
        var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
        attributeList.forEach(function (attr) {
          if (!allowedAttribute(attr, whitelistedAttributes)) {
            el.removeAttribute(attr.nodeName);
          }
        });
      };
  
      for (var i = 0, len = elements.length; i < len; i++) {
        var _ret = _loop(i, len);
  
        if (_ret === "continue") continue;
      }
  
      return createdDocument.body.innerHTML;
    }
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$6 = 'tooltip';
    var VERSION$6 = '4.3.1';
    var DATA_KEY$6 = 'bs.tooltip';
    var EVENT_KEY$6 = "." + DATA_KEY$6;
    var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
    var DefaultType$4 = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string|function)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      whiteList: 'object'
    };
    var AttachmentMap$1 = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default$4 = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent',
      sanitize: true,
      sanitizeFn: null,
      whiteList: DefaultWhitelist
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event$6 = {
      HIDE: "hide" + EVENT_KEY$6,
      HIDDEN: "hidden" + EVENT_KEY$6,
      SHOW: "show" + EVENT_KEY$6,
      SHOWN: "shown" + EVENT_KEY$6,
      INSERTED: "inserted" + EVENT_KEY$6,
      CLICK: "click" + EVENT_KEY$6,
      FOCUSIN: "focusin" + EVENT_KEY$6,
      FOCUSOUT: "focusout" + EVENT_KEY$6,
      MOUSEENTER: "mouseenter" + EVENT_KEY$6,
      MOUSELEAVE: "mouseleave" + EVENT_KEY$6
    };
    var ClassName$6 = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector$6 = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
        } // private
  
  
        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected
  
        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;
  
        this._setListeners();
      } // Getters
  
  
      var _proto = Tooltip.prototype;
  
      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };
  
      _proto.disable = function disable() {
        this._isEnabled = false;
      };
  
      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };
  
      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }
  
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);
  
          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }
  
          context._activeTrigger.click = !context._activeTrigger.click;
  
          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
            this._leave(null, this);
  
            return;
          }
  
          this._enter(null, this);
        }
      };
  
      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $.removeData(this.element, this.constructor.DATA_KEY);
        $(this.element).off(this.constructor.EVENT_KEY);
        $(this.element).closest('.modal').off('hide.bs.modal');
  
        if (this.tip) {
          $(this.tip).remove();
        }
  
        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
  
        if (this._popper !== null) {
          this._popper.destroy();
        }
  
        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };
  
      _proto.show = function show() {
        var _this = this;
  
        if ($(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }
  
        var showEvent = $.Event(this.constructor.Event.SHOW);
  
        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);
          var shadowRoot = Util.findShadowRoot(this.element);
          var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);
  
          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }
  
          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();
  
          if (this.config.animation) {
            $(tip).addClass(ClassName$6.FADE);
          }
  
          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;
  
          var attachment = this._getAttachment(placement);
  
          this.addAttachmentClass(attachment);
  
          var container = this._getContainer();
  
          $(tip).data(this.constructor.DATA_KEY, this);
  
          if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $(tip).appendTo(container);
          }
  /**
     * ------------------------------------------------------------------------
     * a r y a n n a g a r 27
     * ------------------------------------------------------------------------
     */
          $(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: this._getOffset(),
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector$6.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              return _this._handlePopperPlacementChange(data);
            }
          });
          $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
  
          if ('ontouchstart' in document.documentElement) {
            $(document.body).children().on('mouseover', null, $.noop);
          }
  
          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }
  
            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $(_this.element).trigger(_this.constructor.Event.SHOWN);
  
            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };
  
          if ($(this.tip).hasClass(ClassName$6.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };
  
      _proto.hide = function hide(callback) {
        var _this2 = this;
  
        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
  
        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }
  
          _this2._cleanTipClass();
  
          _this2.element.removeAttribute('aria-describedby');
  
          $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
  
          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }
  
          if (callback) {
            callback();
          }
        };
  
        $(this.element).trigger(hideEvent);
  
        if (hideEvent.isDefaultPrevented()) {
          return;
        }
  
        $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
  
        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }
  
        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;
  
        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
  
        this._hoverState = '';
      };
  
      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // Protected
      ;
  
      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };
  
      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };
  
      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $(this.config.template)[0];
        return this.tip;
      };
  
      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
        $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
      };
  
      _proto.setElementContent = function setElementContent($element, content) {
        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (this.config.html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
  
          return;
        }
  
        if (this.config.html) {
          if (this.config.sanitize) {
            content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
          }
  
          $element.html(content);
        } else {
          $element.text(content);
        }
      };
  
      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');
  
        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }
  
        return title;
      } // Private
      ;
  
      _proto._getOffset = function _getOffset() {
        var _this3 = this;
  
        var offset = {};
  
        if (typeof this.config.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
            return data;
          };
        } else {
          offset.offset = this.config.offset;
        }
  
        return offset;
      };
  
      _proto._getContainer = function _getContainer() {
        if (this.config.container === false) {
          return document.body;
        }
  
        if (Util.isElement(this.config.container)) {
          return $(this.config.container);
        }
  
        return $(document).find(this.config.container);
      };
  
      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap$1[placement.toUpperCase()];
      };
  
      _proto._setListeners = function _setListeners() {
        var _this4 = this;
  
        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
              return _this4.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
            $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
              return _this4._enter(event);
            }).on(eventOut, _this4.config.selector, function (event) {
              return _this4._leave(event);
            });
          }
        });
        $(this.element).closest('.modal').on('hide.bs.modal', function () {
          if (_this4.element) {
            _this4.hide();
          }
        });
  
        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };
  
      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');
  
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };
  
      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $(event.currentTarget).data(dataKey);
  
        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }
  
        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }
  
        if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }
  
        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;
  
        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }
  
        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };
  
      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $(event.currentTarget).data(dataKey);
  
        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }
  
        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }
  
        if (context._isWithActiveTrigger()) {
          return;
        }
  
        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;
  
        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }
  
        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };
  
      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }
  
        return false;
      };
  
      _proto._getConfig = function _getConfig(config) {
        var dataAttributes = $(this.element).data();
        Object.keys(dataAttributes).forEach(function (dataAttr) {
          if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
            delete dataAttributes[dataAttr];
          }
        });
        config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});
  
        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }
  
        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }
  
        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }
  
        Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);
  
        if (config.sanitize) {
          config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
        }
  
        return config;
      };
  
      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};
  
        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }
  
        return config;
      };
  
      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
  
        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };
  
      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;
  
        this._cleanTipClass();
  
        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };
  
      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;
  
        if (tip.getAttribute('x-placement') !== null) {
          return;
        }
  
        $(tip).removeClass(ClassName$6.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      } // Static
      ;
  
      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$6);
  
          var _config = typeof config === 'object' && config;
  
          if (!data && /dispose|hide/.test(config)) {
            return;
          }
  
          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY$6, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config]();
          }
        });
      };
  
      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$6;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$4;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME$6;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY$6;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event$6;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY$6;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType$4;
        }
      }]);
  
      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
  
    $.fn[NAME$6] = Tooltip._jQueryInterface;
    $.fn[NAME$6].Constructor = Tooltip;
  
    $.fn[NAME$6].noConflict = function () {
      $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
      return Tooltip._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$7 = 'popover';
    var VERSION$7 = '4.3.1';
    var DATA_KEY$7 = 'bs.popover';
    var EVENT_KEY$7 = "." + DATA_KEY$7;
    var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
    var CLASS_PREFIX$1 = 'bs-popover';
    var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');
  
    var Default$5 = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });
  
    var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });
  
    var ClassName$7 = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector$7 = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event$7 = {
      HIDE: "hide" + EVENT_KEY$7,
      HIDDEN: "hidden" + EVENT_KEY$7,
      SHOW: "show" + EVENT_KEY$7,
      SHOWN: "shown" + EVENT_KEY$7,
      INSERTED: "inserted" + EVENT_KEY$7,
      CLICK: "click" + EVENT_KEY$7,
      FOCUSIN: "focusin" + EVENT_KEY$7,
      FOCUSOUT: "focusout" + EVENT_KEY$7,
      MOUSEENTER: "mouseenter" + EVENT_KEY$7,
      MOUSELEAVE: "mouseleave" + EVENT_KEY$7
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);
  
      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }
  
      var _proto = Popover.prototype;
  
      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };
  
      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
      };
  
      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $(this.config.template)[0];
        return this.tip;
      };
  
      _proto.setContent = function setContent() {
        var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events
  
        this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());
  
        var content = this._getContent();
  
        if (typeof content === 'function') {
          content = content.call(this.element);
        }
  
        this.setElementContent($tip.find(Selector$7.CONTENT), content);
        $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
      } // Private
      ;
  
      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };
  
      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);
  
        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      } // Static
      ;
  
      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$7);
  
          var _config = typeof config === 'object' ? config : null;
  
          if (!data && /dispose|hide/.test(config)) {
            return;
          }
  
          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY$7, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config]();
          }
        });
      };
  
      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION$7;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$5;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME$7;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY$7;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event$7;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY$7;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType$5;
        }
      }]);
  
      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
  
    $.fn[NAME$7] = Popover._jQueryInterface;
    $.fn[NAME$7].Constructor = Popover;
  
    $.fn[NAME$7].noConflict = function () {
      $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
      return Popover._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$8 = 'scrollspy';
    var VERSION$8 = '4.3.1';
    var DATA_KEY$8 = 'bs.scrollspy';
    var EVENT_KEY$8 = "." + DATA_KEY$8;
    var DATA_API_KEY$6 = '.data-api';
    var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
    var Default$6 = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType$6 = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event$8 = {
      ACTIVATE: "activate" + EVENT_KEY$8,
      SCROLL: "scroll" + EVENT_KEY$8,
      LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
    };
    var ClassName$8 = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector$8 = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;
  
        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $(this._scrollElement).on(Event$8.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();
  
        this._process();
      } // Getters
  
  
      var _proto = ScrollSpy.prototype;
  
      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;
  
        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);
  
          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }
  
          if (target) {
            var targetBCR = target.getBoundingClientRect();
  
            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }
  
          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);
  
          _this2._targets.push(item[1]);
        });
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$8);
        $(this._scrollElement).off(EVENT_KEY$8);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      } // Private
      ;
  
      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});
  
        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
  
          if (!id) {
            id = Util.getUID(NAME$8);
            $(config.target).attr('id', id);
          }
  
          config.target = "#" + id;
        }
  
        Util.typeCheckConfig(NAME$8, config, DefaultType$6);
        return config;
      };
  
      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };
  
      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };
  
      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };
  
      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
  
        var scrollHeight = this._getScrollHeight();
  
        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
  
        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }
  
        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];
  
          if (this._activeTarget !== target) {
            this._activate(target);
          }
  
          return;
        }
  
        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;
  
          this._clear();
  
          return;
        }
  
        var offsetLength = this._offsets.length;
  
        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);
  
          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };
  
      _proto._activate = function _activate(target) {
        this._activeTarget = target;
  
        this._clear();
  
        var queries = this._selector.split(',').map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
        });
  
        var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));
  
        if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
          $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
          $link.addClass(ClassName$8.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
  
          $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item
  
          $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
        }
  
        $(this._scrollElement).trigger(Event$8.ACTIVATE, {
          relatedTarget: target
        });
      };
  
      _proto._clear = function _clear() {
        [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
          return node.classList.contains(ClassName$8.ACTIVE);
        }).forEach(function (node) {
          return node.classList.remove(ClassName$8.ACTIVE);
        });
      } // Static
      ;
  
      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$8);
  
          var _config = typeof config === 'object' && config;
  
          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY$8, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config]();
          }
        });
      };
  
      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$8;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$6;
        }
      }]);
  
      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(window).on(Event$8.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;
  
      for (var i = scrollSpysLength; i--;) {
        var $spy = $(scrollSpys[i]);
  
        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME$8] = ScrollSpy._jQueryInterface;
    $.fn[NAME$8].Constructor = ScrollSpy;
  
    $.fn[NAME$8].noConflict = function () {
      $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
      return ScrollSpy._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$9 = 'tab';
    var VERSION$9 = '4.3.1';
    var DATA_KEY$9 = 'bs.tab';
    var EVENT_KEY$9 = "." + DATA_KEY$9;
    var DATA_API_KEY$7 = '.data-api';
    var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
    var Event$9 = {
      HIDE: "hide" + EVENT_KEY$9,
      HIDDEN: "hidden" + EVENT_KEY$9,
      SHOW: "show" + EVENT_KEY$9,
      SHOWN: "shown" + EVENT_KEY$9,
      CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
    };
    var ClassName$9 = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector$9 = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  /**
     * ------------------------------------------------------------------------
     * a r y a n n a g a r 27
     * ------------------------------------------------------------------------
     */
    };
  
    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters
  
  
      var _proto = Tab.prototype;
  
      // Public
      _proto.show = function show() {
        var _this = this;
  
        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
          return;
        }
  
        var target;
        var previous;
        var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);
  
        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
          previous = $.makeArray($(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }
  
        var hideEvent = $.Event(Event$9.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $.Event(Event$9.SHOW, {
          relatedTarget: previous
        });
  
        if (previous) {
          $(previous).trigger(hideEvent);
        }
  
        $(this._element).trigger(showEvent);
  
        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }
  
        if (selector) {
          target = document.querySelector(selector);
        }
  
        this._activate(this._element, listElement);
  
        var complete = function complete() {
          var hiddenEvent = $.Event(Event$9.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $.Event(Event$9.SHOWN, {
            relatedTarget: previous
          });
          $(previous).trigger(hiddenEvent);
          $(_this._element).trigger(shownEvent);
        };
  
        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$9);
        this._element = null;
      } // Private
      ;
  
      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;
  
        var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
        var active = activeElements[0];
        var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);
  
        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };
  
        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };
  
      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $(active).removeClass(ClassName$9.ACTIVE);
          var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];
  
          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName$9.ACTIVE);
          }
  
          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }
  
        $(element).addClass(ClassName$9.ACTIVE);
  
        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }
  
        Util.reflow(element);
  
        if (element.classList.contains(ClassName$9.FADE)) {
          element.classList.add(ClassName$9.SHOW);
        }
  
        if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
          var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];
  
          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
            $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
          }
  
          element.setAttribute('aria-expanded', true);
        }
  
        if (callback) {
          callback();
        }
      } // Static
      ;
  
      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY$9);
  
          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY$9, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config]();
          }
        });
      };
  
      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$9;
        }
      }]);
  
      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
      event.preventDefault();
  
      Tab._jQueryInterface.call($(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME$9] = Tab._jQueryInterface;
    $.fn[NAME$9].Constructor = Tab;
  
    $.fn[NAME$9].noConflict = function () {
      $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
      return Tab._jQueryInterface;
    };
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$a = 'toast';
    var VERSION$a = '4.3.1';
    var DATA_KEY$a = 'bs.toast';
    var EVENT_KEY$a = "." + DATA_KEY$a;
    var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
    var Event$a = {
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
      HIDE: "hide" + EVENT_KEY$a,
      HIDDEN: "hidden" + EVENT_KEY$a,
      SHOW: "show" + EVENT_KEY$a,
      SHOWN: "shown" + EVENT_KEY$a
    };
    var ClassName$a = {
      FADE: 'fade',
      HIDE: 'hide',
      SHOW: 'show',
      SHOWING: 'showing'
    };
    var DefaultType$7 = {
      animation: 'boolean',
      autohide: 'boolean',
      delay: 'number'
    };
    var Default$7 = {
      animation: true,
      autohide: true,
      delay: 500
    };
    var Selector$a = {
      DATA_DISMISS: '[data-dismiss="toast"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Toast =
    /*#__PURE__*/
    function () {
      function Toast(element, config) {
        this._element = element;
        this._config = this._getConfig(config);
        this._timeout = null;
  
        this._setListeners();
      } // Getters
  
  
      var _proto = Toast.prototype;
  
      // Public
      _proto.show = function show() {
        var _this = this;
  
        $(this._element).trigger(Event$a.SHOW);
  
        if (this._config.animation) {
          this._element.classList.add(ClassName$a.FADE);
        }
  
        var complete = function complete() {
          _this._element.classList.remove(ClassName$a.SHOWING);
  
          _this._element.classList.add(ClassName$a.SHOW);
  
          $(_this._element).trigger(Event$a.SHOWN);
  
          if (_this._config.autohide) {
            _this.hide();
          }
        };
  
        this._element.classList.remove(ClassName$a.HIDE);
  
        this._element.classList.add(ClassName$a.SHOWING);
  
        if (this._config.animation) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };
  
      _proto.hide = function hide(withoutTimeout) {
        var _this2 = this;
  
        if (!this._element.classList.contains(ClassName$a.SHOW)) {
          return;
        }
  
        $(this._element).trigger(Event$a.HIDE);
  
        if (withoutTimeout) {
          this._close();
        } else {
          this._timeout = setTimeout(function () {
            _this2._close();
          }, this._config.delay);
        }
      };
  
      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        this._timeout = null;
  
        if (this._element.classList.contains(ClassName$a.SHOW)) {
          this._element.classList.remove(ClassName$a.SHOW);
        }
  
        $(this._element).off(Event$a.CLICK_DISMISS);
        $.removeData(this._element, DATA_KEY$a);
        this._element = null;
        this._config = null;
      } // Private
      ;
  
      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
        Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
        return config;
      };
  
      _proto._setListeners = function _setListeners() {
        var _this3 = this;
  
        $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
          return _this3.hide(true);
        });
      };
  
      _proto._close = function _close() {
        var _this4 = this;
  
        var complete = function complete() {
          _this4._element.classList.add(ClassName$a.HIDE);
  
          $(_this4._element).trigger(Event$a.HIDDEN);
        };
  
        this._element.classList.remove(ClassName$a.SHOW);
  
        if (this._config.animation) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      } // Static
      ;
  
      Toast._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY$a);
  
          var _config = typeof config === 'object' && config;
  
          if (!data) {
            data = new Toast(this, _config);
            $element.data(DATA_KEY$a, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config](this);
          }
        });
      };
  
      _createClass(Toast, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$a;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType$7;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$7;
        }
      }]);
  
      return Toast;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
  
    $.fn[NAME$a] = Toast._jQueryInterface;
    $.fn[NAME$a].Constructor = Toast;
  
    $.fn[NAME$a].noConflict = function () {
      $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
      return Toast._jQueryInterface;
    };
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    (function () {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }
  
      var version = $.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;
  
      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    })();
  
    exports.Util = Util;
    exports.Alert = Alert;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
    exports.Modal = Modal;
    exports.Popover = Popover;
    exports.Scrollspy = ScrollSpy;
    exports.Tab = Tab;
    exports.Toast = Toast;
    exports.Tooltip = Tooltip;
  
    Object.defineProperty(exports, '__esModule', { value: true });
  
  }));
  //# sourceMappingURL=bootstrap.js.map
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*!
   * Material Design for Bootstrap 4
   * Version: MDB Landing Page 4.8.11
   *
   *
   * Copyright: Material Design for Bootstrap
   * https://mdbootstrap.com/
   *
   * Read the license: https://mdbootstrap.com/general/license/
   *
   *
   * Documentation: https://mdbootstrap.com/
   *
   * Getting started: https://mdbootstrap.com/docs/jquery/getting-started/download/
   *
   * Tutorials: https://mdbootstrap.com/education/bootstrap/
   * designed By: a r y an   n a g ar   |   a ry a n n a g a r 27
   *
   * Templates: https://mdbootstrap.com/templates/
   *
   * Support: https://mdbootstrap.com/forums/forum/support/
   *
   * Contact: office@mdbootstrap.com
   *
   * Attribution: Animate CSS, Twitter Bootstrap, Materialize CSS, Normalize CSS, Waves JS, WOW JS, Toastr, Chart.js
   *
   */
  
  
  /*
  
  jquery-easing.js
  global.js
  velocity.min.js
  wow.js
  scrolling-nav.js
  waves.js
  preloading.js
  smooth-scroll.js
  dropdown.js
  ar y an n ag a r 2 7
  buttons.js
  forms.js
  lightbox.js
  animations.js
  enhanced-modals
  treeview.js
  ar ya n . n a ga r
  
  */
  
  /*
   * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
   *
   * Uses the built in easing capabilities added In jQuery 1.1
   * to offer multiple easing options
   *
   * TERMS OF USE - jQuery Easing
   *
   * Open source under the BSD License.
   *
   * Copyright © 2008 George McGinley Smith
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * designed BY : a ry a n  n a g ar   |   a ry a n na g a r 2 7 
   *
   * Redistributions of source code must retain the above copyright notice, this list of
   * conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list
   * of conditions and the following disclaimer in the documentation and/or other materials
   * provided with the distribution.
   *
   * Neither the name of the author nor the names of contributors may be used to endorse
   * or promote products derived from this software without specific prior written permission.
   * designed & created by:  ar y a n  n a g a r  |   a r y a nn a g a r 27 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
   * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   *  a r ya n  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
   *  GOODS OR SERVICES; LOSS OF USE, a r y an n a g ar 2 7  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY a  ry a n  n a ga r WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   *
  */
  
  // t: current time, b: begInnIng value, c: change In value, d: duration
  jQuery.easing['jswing'] = jQuery.easing['swing'];
  
  jQuery.extend( jQuery.easing,
  {
      def: 'easeOutQuad',
      swing: function (x, t, b, c, d) {
          //alert(jQuery.easing.default);
          return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
      },
      easeInQuad: function (x, t, b, c, d) {
          return c*(t/=d)*t + b;
      },
      easeOutQuad: function (x, t, b, c, d) {
          return -c *(t/=d)*(t-2) + b;
      },
      easeInOutQuad: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t + b;
          return -c/2 * ((--t)*(t-2) - 1) + b;
      },
      easeInCubic: function (x, t, b, c, d) {
          return c*(t/=d)*t*t + b;
      },
      easeOutCubic: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t + 1) + b;
      },
      easeInOutCubic: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t + b;
          return c/2*((t-=2)*t*t + 2) + b;
      },
      easeInQuart: function (x, t, b, c, d) {
          return c*(t/=d)*t*t*t + b;
      },
      easeOutQuart: function (x, t, b, c, d) {
          return -c * ((t=t/d-1)*t*t*t - 1) + b;
      },
      easeInOutQuart: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
          return -c/2 * ((t-=2)*t*t*t - 2) + b;
      },
      easeInQuint: function (x, t, b, c, d) {
          return c*(t/=d)*t*t*t*t + b;
      },
      easeOutQuint: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t*t*t + 1) + b;
      },
      easeInOutQuint: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
          return c/2*((t-=2)*t*t*t*t + 2) + b;
      },
      easeInSine: function (x, t, b, c, d) {
          return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
      },
      easeOutSine: function (x, t, b, c, d) {
          return c * Math.sin(t/d * (Math.PI/2)) + b;
      },
      easeInOutSine: function (x, t, b, c, d) {
          return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
      },
      easeInExpo: function (x, t, b, c, d) {
          return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
      },
      easeOutExpo: function (x, t, b, c, d) {
          return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
      },
      easeInOutExpo: function (x, t, b, c, d) {
          if (t==0) return b;
          if (t==d) return b+c;
          if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
          return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
      },
      easeInCirc: function (x, t, b, c, d) {
          return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
      },
      easeOutCirc: function (x, t, b, c, d) {
          return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
      },
      easeInOutCirc: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
          return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
      },
      easeInElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      },
      easeOutElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
      },
      easeInOutElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
          return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
      },
      easeInBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          return c*(t/=d)*t*((s+1)*t - s) + b;
      },
      easeOutBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
      },
      easeInOutBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
          return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
      },
      easeInBounce: function (x, t, b, c, d) {
          return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
      },
      easeOutBounce: function (x, t, b, c, d) {
          if ((t/=d) < (1/2.75)) {
              return c*(7.5625*t*t) + b;
          } else if (t < (2/2.75)) {
              return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
          } else if (t < (2.5/2.75)) {
              return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
          } else {
              return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
          }
      },
      easeInOutBounce: function (x, t, b, c, d) {
          if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
          return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
      }
  });
  
  /*
   *
   * TERMS OF USE - EASING EQUATIONS
   *
   * Open source under the BSD License.
   *
   * Copyright © 2001 Robert Penner
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   *
   * Redistributions of ar y an  nagar 27source code must retain the above copyright notice, this list of
   * conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list
   * of conditions and the following disclaimer in the documentation and/or other materials
   * provided with the distribution.
   *
   * Neither the name of the author nor the names of contributors may be used to endorse
   * or promote products derived from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
   * EXPRESS OR IMPLIED ar y a n  nagar WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
   *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   */
  /*! VelocityJS.org (1.2.3). (C) 2014 a r y an  nagar 27 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
  /*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
  /*! Note that this has been modified by Materialize to confirm that Velocity is not already being imported. */
  jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(!function(e){function t(e){var t=e.length,a=r.type(e);return"function"===a||r.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===a||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var r=function(e,t){return new r.fn.init(e,t)};r.isWindow=function(e){return null!=e&&e==e.window},r.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[i.call(e)]||"object":typeof e},r.isArray=Array.isArray||function(e){return"array"===r.type(e)},r.isPlainObject=function(e){var t;if(!e||"object"!==r.type(e)||e.nodeType||r.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(a){return!1}for(t in e);return void 0===t||o.call(e,t)},r.each=function(e,r,a){var n,o=0,i=e.length,s=t(e);if(a){if(s)for(;i>o&&(n=r.apply(e[o],a),n!==!1);o++);else for(o in e)if(n=r.apply(e[o],a),n===!1)break}else if(s)for(;i>o&&(n=r.call(e[o],o,e[o]),n!==!1);o++);else for(o in e)if(n=r.call(e[o],o,e[o]),n===!1)break;return e},r.data=function(e,t,n){if(void 0===n){var o=e[r.expando],i=o&&a[o];if(void 0===t)return i;if(i&&t in i)return i[t]}else if(void 0!==t){var o=e[r.expando]||(e[r.expando]=++r.uuid);return a[o]=a[o]||{},a[o][t]=n,n}},r.removeData=function(e,t){var n=e[r.expando],o=n&&a[n];o&&r.each(t,function(e,t){delete o[t]})},r.extend=function(){var e,t,a,n,o,i,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[l]||{},l++),"object"!=typeof s&&"function"!==r.type(s)&&(s={}),l===u&&(s=this,l--);u>l;l++)if(null!=(o=arguments[l]))for(n in o)e=s[n],a=o[n],s!==a&&(c&&a&&(r.isPlainObject(a)||(t=r.isArray(a)))?(t?(t=!1,i=e&&r.isArray(e)?e:[]):i=e&&r.isPlainObject(e)?e:{},s[n]=r.extend(c,i,a)):void 0!==a&&(s[n]=a));return s},r.queue=function(e,a,n){function o(e,r){var a=r||[];return null!=e&&(t(Object(e))?!function(e,t){for(var r=+t.length,a=0,n=e.length;r>a;)e[n++]=t[a++];if(r!==r)for(;void 0!==t[a];)e[n++]=t[a++];return e.length=n,e}(a,"string"==typeof e?[e]:e):[].push.call(a,e)),a}if(e){a=(a||"fx")+"queue";var i=r.data(e,a);return n?(!i||r.isArray(n)?i=r.data(e,a,o(n)):i.push(n),i):i||[]}},r.dequeue=function(e,t){r.each(e.nodeType?[e]:e,function(e,a){t=t||"fx";var n=r.queue(a,t),o=n.shift();"inprogress"===o&&(o=n.shift()),o&&("fx"===t&&n.unshift("inprogress"),o.call(a,function(){r.dequeue(a,t)}))})},r.fn=r.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),a=this.offset(),n=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:r(e).offset();return a.top-=parseFloat(t.style.marginTop)||0,a.left-=parseFloat(t.style.marginLeft)||0,e.style&&(n.top+=parseFloat(e.style.borderTopWidth)||0,n.left+=parseFloat(e.style.borderLeftWidth)||0),{top:a.top-n.top,left:a.left-n.left}}};var a={};r.expando="velocity"+(new Date).getTime(),r.uuid=0;for(var n={},o=n.hasOwnProperty,i=n.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<s.length;l++)n["[object "+s[l]+"]"]=s[l].toLowerCase();r.fn.init.prototype=r.fn,e.Velocity={Utilities:r}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,r,a){function n(e){for(var t=-1,r=e?e.length:0,a=[];++t<r;){var n=e[t];n&&a.push(n)}return a}function o(e){return m.isWrapped(e)?e=[].slice.call(e):m.isNode(e)&&(e=[e]),e}function i(e){var t=f.data(e,"velocity");return null===t?a:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,r,a,n){function o(e,t){return 1-3*t+3*e}function i(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,r){return((o(t,r)*e+i(t,r))*e+s(t))*e}function u(e,t,r){return 3*o(t,r)*e*e+2*i(t,r)*e+s(t)}function c(t,r){for(var n=0;m>n;++n){var o=u(r,e,a);if(0===o)return r;var i=l(r,e,a)-t;r-=i/o}return r}function p(){for(var t=0;b>t;++t)w[t]=l(t*x,e,a)}function f(t,r,n){var o,i,s=0;do i=r+(n-r)/2,o=l(i,e,a)-t,o>0?n=i:r=i;while(Math.abs(o)>h&&++s<v);return i}function d(t){for(var r=0,n=1,o=b-1;n!=o&&w[n]<=t;++n)r+=x;--n;var i=(t-w[n])/(w[n+1]-w[n]),s=r+i*x,l=u(s,e,a);return l>=y?c(t,s):0==l?s:f(t,r,r+x)}function g(){V=!0,(e!=r||a!=n)&&p()}var m=4,y=.001,h=1e-7,v=10,b=11,x=1/(b-1),S="Float32Array"in t;if(4!==arguments.length)return!1;for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1;e=Math.min(e,1),a=Math.min(a,1),e=Math.max(e,0),a=Math.max(a,0);var w=S?new Float32Array(b):new Array(b),V=!1,C=function(t){return V||g(),e===r&&a===n?t:0===t?0:1===t?1:l(d(t),r,n)};C.getControlPoints=function(){return[{x:e,y:r},{x:a,y:n}]};var T="generateBezier("+[e,r,a,n]+")";return C.toString=function(){return T},C}function u(e,t){var r=e;return m.isString(e)?b.Easings[e]||(r=!1):r=m.isArray(e)&&1===e.length?s.apply(null,e):m.isArray(e)&&2===e.length?x.apply(null,e.concat([t])):m.isArray(e)&&4===e.length?l.apply(null,e):!1,r===!1&&(r=b.Easings[b.defaults.easing]?b.defaults.easing:v),r}function c(e){if(e){var t=(new Date).getTime(),r=b.State.calls.length;r>1e4&&(b.State.calls=n(b.State.calls));for(var o=0;r>o;o++)if(b.State.calls[o]){var s=b.State.calls[o],l=s[0],u=s[2],d=s[3],g=!!d,y=null;d||(d=b.State.calls[o][3]=t-16);for(var h=Math.min((t-d)/u.duration,1),v=0,x=l.length;x>v;v++){var P=l[v],V=P.element;if(i(V)){var C=!1;if(u.display!==a&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var T=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];f.each(T,function(e,t){S.setPropertyValue(V,"display",t)})}S.setPropertyValue(V,"display",u.display)}u.visibility!==a&&"hidden"!==u.visibility&&S.setPropertyValue(V,"visibility",u.visibility);for(var k in P)if("element"!==k){var A,F=P[k],j=m.isString(F.easing)?b.Easings[F.easing]:F.easing;if(1===h)A=F.endValue;else{var E=F.endValue-F.startValue;if(A=F.startValue+E*j(h,u,E),!g&&A===F.currentValue)continue}if(F.currentValue=A,"tween"===k)y=A;else{if(S.Hooks.registered[k]){var H=S.Hooks.getRoot(k),N=i(V).rootPropertyValueCache[H];N&&(F.rootPropertyValue=N)}var L=S.setPropertyValue(V,k,F.currentValue+(0===parseFloat(A)?"":F.unitType),F.rootPropertyValue,F.scrollData);S.Hooks.registered[k]&&(i(V).rootPropertyValueCache[H]=S.Normalizations.registered[H]?S.Normalizations.registered[H]("extract",null,L[1]):L[1]),"transform"===L[0]&&(C=!0)}}u.mobileHA&&i(V).transformCache.translate3d===a&&(i(V).transformCache.translate3d="(0px, 0px, 0px)",C=!0),C&&S.flushTransformCache(V)}}u.display!==a&&"none"!==u.display&&(b.State.calls[o][2].display=!1),u.visibility!==a&&"hidden"!==u.visibility&&(b.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],h,Math.max(0,d+u.duration-t),d,y),1===h&&p(o)}}b.State.isTicking&&w(c)}function p(e,t){if(!b.State.calls[e])return!1;for(var r=b.State.calls[e][0],n=b.State.calls[e][1],o=b.State.calls[e][2],s=b.State.calls[e][4],l=!1,u=0,c=r.length;c>u;u++){var p=r[u].element;if(t||o.loop||("none"===o.display&&S.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&S.setPropertyValue(p,"visibility",o.visibility)),o.loop!==!0&&(f.queue(p)[1]===a||!/\.velocityQueueEntryFlag/i.test(f.queue(p)[1]))&&i(p)){i(p).isAnimating=!1,i(p).rootPropertyValueCache={};var d=!1;f.each(S.Lists.transforms3D,function(e,t){var r=/^scale/.test(t)?1:0,n=i(p).transformCache[t];i(p).transformCache[t]!==a&&new RegExp("^\\("+r+"[^.]").test(n)&&(d=!0,delete i(p).transformCache[t])}),o.mobileHA&&(d=!0,delete i(p).transformCache.translate3d),d&&S.flushTransformCache(p),S.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(n,n)}catch(g){setTimeout(function(){throw g},1)}s&&o.loop!==!0&&s(n),i(p)&&o.loop===!0&&!t&&(f.each(i(p).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&f.dequeue(p,o.queue)}b.State.calls[e]=!1;for(var m=0,y=b.State.calls.length;y>m;m++)if(b.State.calls[m]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var f,d=function(){if(r.documentMode)return r.documentMode;for(var e=7;e>4;e--){var t=r.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return a}(),g=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var r,a=(new Date).getTime();return r=Math.max(0,16-(a-e)),e=a+r,setTimeout(function(){t(a+r)},r)}}(),m={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==a&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},y=!1;if(e.fn&&e.fn.jquery?(f=e,y=!0):f=t.Velocity.Utilities,8>=d&&!y)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=d)return void(jQuery.fn.velocity=jQuery.fn.animate);var h=400,v="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:r.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:f,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:h,easing:v,begin:a,complete:a,progress:a,display:a,visibility:a,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){f.data(e,"velocity",{isSVG:m.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==a?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=r.documentElement||r.body.parentNode||r.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var x=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,a){var n={x:t.x+a.dx*r,v:t.v+a.dv*r,tension:t.tension,friction:t.friction};return{dx:n.v,dv:e(n)}}function r(r,a){var n={dx:r.v,dv:e(r)},o=t(r,.5*a,n),i=t(r,.5*a,o),s=t(r,a,i),l=1/6*(n.dx+2*(o.dx+i.dx)+s.dx),u=1/6*(n.dv+2*(o.dv+i.dv)+s.dv);return r.x=r.x+l*a,r.v=r.v+u*a,r}return function a(e,t,n){var o,i,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0,p=1e-4,f=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,n=n||null,l.tension=e,l.friction=t,o=null!==n,o?(c=a(e,t),i=c/n*f):i=f;s=r(s||l,i),u.push(1+s.x),c+=16,Math.abs(s.x)>p&&Math.abs(s.v)>p;);return o?function(e){return u[e*(u.length-1)|0]}:c}}();b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},f.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=l.apply(null,t[1])});var S=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<S.Lists.colors.length;e++){var t="color"===S.Lists.colors[e]?"0 0 0 1":"255 255 255 1";S.Hooks.templates[S.Lists.colors[e]]=["Red Green Blue Alpha",t]}var r,a,n;if(d)for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");var o=a[1].match(S.RegEx.valueSplit);"Color"===n[0]&&(n.push(n.shift()),o.push(o.shift()),S.Hooks.templates[r]=[n.join(" "),o.join(" ")])}for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");for(var e in n){var i=r+n[e],s=e;S.Hooks.registered[i]=[r,s]}}},getRoot:function(e){var t=S.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return S.RegEx.valueUnwrap.test(t)&&(t=t.match(S.RegEx.valueUnwrap)[1]),S.Values.isCSSNullValue(t)&&(t=S.Hooks.templates[e][1]),t},extractValue:function(e,t){var r=S.Hooks.registered[e];if(r){var a=r[0],n=r[1];return t=S.Hooks.cleanRootPropertyValue(a,t),t.toString().match(S.RegEx.valueSplit)[n]}return t},injectValue:function(e,t,r){var a=S.Hooks.registered[e];if(a){var n,o,i=a[0],s=a[1];return r=S.Hooks.cleanRootPropertyValue(i,r),n=r.toString().match(S.RegEx.valueSplit),n[s]=t,o=n.join(" ")}return r}},Normalizations:{registered:{clip:function(e,t,r){switch(e){case"name":return"clip";case"extract":var a;return S.RegEx.wrappedValueAlreadyExtracted.test(r)?a=r:(a=r.toString().match(S.RegEx.valueUnwrap),a=a?a[1].replace(/,(\s+)?/g," "):r),a;case"inject":return"rect("+r+")"}},blur:function(e,t,r){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var a=parseFloat(r);if(!a&&0!==a){var n=r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a=n?n[1]:0}return a;case"inject":return parseFloat(r)?"blur("+r+")":"none"}},opacity:function(e,t,r){if(8>=d)switch(e){case"name":return"filter";case"extract":var a=r.toString().match(/alpha\(opacity=(.*)\)/i);return r=a?a[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(r)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(r),10)+")"}else switch(e){case"name":return"opacity";case"extract":return r;case"inject":return r}}},register:function(){9>=d||b.State.isGingerbread||(S.Lists.transformsBase=S.Lists.transformsBase.concat(S.Lists.transforms3D));for(var e=0;e<S.Lists.transformsBase.length;e++)!function(){var t=S.Lists.transformsBase[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return"transform";case"extract":return i(r)===a||i(r).transformCache[t]===a?/^scale/i.test(t)?1:0:i(r).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case"scal":case"scale":b.State.isAndroid&&i(r).transformCache[t]===a&&1>n&&(n=1),o=!/(\d)$/i.test(n);break;case"skew":o=!/(deg|\d)$/i.test(n);break;case"rotate":o=!/(deg|\d)$/i.test(n)}return o||(i(r).transformCache[t]="("+n+")"),i(r).transformCache[t]}}}();for(var e=0;e<S.Lists.colors.length;e++)!function(){var t=S.Lists.colors[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return t;case"extract":var o;if(S.RegEx.wrappedValueAlreadyExtracted.test(n))o=n;else{var i,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(n)?i=s[n]!==a?s[n]:s.black:S.RegEx.isHex.test(n)?i="rgb("+S.Values.hexToRgb(n).join(" ")+")":/^rgba?\(/i.test(n)||(i=s.black),o=(i||n).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=d||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=d?4===n.split(" ").length&&(n=n.split(/\s+/).slice(0,3).join(" ")):3===n.split(" ").length&&(n+=" 1"),(8>=d?"rgb":"rgba")+"("+n.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(d||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],r=0,a=t.length;a>r;r++){var n;if(n=0===r?e:t[r]+e.replace(/^\w/,function(e){return e.toUpperCase()}),m.isString(b.State.prefixElement.style[n]))return b.State.prefixMatches[e]=n,[n,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(r,function(e,t,r,a){return t+t+r+r+a+a}),t=a.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,r,n,o){function s(e,r){function n(){u&&S.setPropertyValue(e,"display","none")}var l=0;if(8>=d)l=f.css(e,r);else{var u=!1;if(/^(width|height)$/.test(r)&&0===S.getPropertyValue(e,"display")&&(u=!0,S.setPropertyValue(e,"display",S.Values.getDisplayType(e))),!o){if("height"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(S.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(S.getPropertyValue(e,"paddingBottom"))||0);return n(),c}if("width"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(S.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(S.getPropertyValue(e,"paddingRight"))||0);return n(),p}}var g;g=i(e)===a?t.getComputedStyle(e,null):i(e).computedStyle?i(e).computedStyle:i(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===r&&(r="borderTopColor"),l=9===d&&"filter"===r?g.getPropertyValue(r):g[r],(""===l||null===l)&&(l=e.style[r]),n()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(r)){var m=s(e,"position");("fixed"===m||"absolute"===m&&/top|left/i.test(r))&&(l=f(e).position()[r]+"px")}return l}var l;if(S.Hooks.registered[r]){var u=r,c=S.Hooks.getRoot(u);n===a&&(n=S.getPropertyValue(e,S.Names.prefixCheck(c)[0])),S.Normalizations.registered[c]&&(n=S.Normalizations.registered[c]("extract",e,n)),l=S.Hooks.extractValue(u,n)}else if(S.Normalizations.registered[r]){var p,g;p=S.Normalizations.registered[r]("name",e),"transform"!==p&&(g=s(e,S.Names.prefixCheck(p)[0]),S.Values.isCSSNullValue(g)&&S.Hooks.templates[r]&&(g=S.Hooks.templates[r][1])),l=S.Normalizations.registered[r]("extract",e,g)}if(!/^[\d-]/.test(l))if(i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r))if(/^(height|width)$/i.test(r))try{l=e.getBBox()[r]}catch(m){l=0}else l=e.getAttribute(r);else l=s(e,S.Names.prefixCheck(r)[0]);return S.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+r+": "+l),l},setPropertyValue:function(e,r,a,n,o){var s=r;if("scroll"===r)o.container?o.container["scroll"+o.direction]=a:"Left"===o.direction?t.scrollTo(a,o.alternateValue):t.scrollTo(o.alternateValue,a);else if(S.Normalizations.registered[r]&&"transform"===S.Normalizations.registered[r]("name",e))S.Normalizations.registered[r]("inject",e,a),s="transform",a=i(e).transformCache[r];else{if(S.Hooks.registered[r]){var l=r,u=S.Hooks.getRoot(r);n=n||S.getPropertyValue(e,u),a=S.Hooks.injectValue(l,a,n),r=u}if(S.Normalizations.registered[r]&&(a=S.Normalizations.registered[r]("inject",e,a),r=S.Normalizations.registered[r]("name",e)),s=S.Names.prefixCheck(r)[0],8>=d)try{e.style[s]=a}catch(c){b.debug&&console.log("Browser does not support ["+a+"] for ["+s+"]")}else i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r)?e.setAttribute(r,a):e.style[s]=a;b.debug>=2&&console.log("Set "+r+" ("+s+"): "+a)}return[s,a]},flushTransformCache:function(e){function t(t){return parseFloat(S.getPropertyValue(e,t))}var r="";if((d||b.State.isAndroid&&!b.State.isChrome)&&i(e).isSVG){var a={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};f.each(i(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),a[e]&&(r+=e+"("+a[e].join(" ")+") ",delete a[e])})}else{var n,o;f.each(i(e).transformCache,function(t){return n=i(e).transformCache[t],"transformPerspective"===t?(o=n,!0):(9===d&&"rotateZ"===t&&(t="rotate"),void(r+=t+n+" "))}),o&&(r="perspective"+o+" "+r)}S.setPropertyValue(e,"transform",r)}};S.Hooks.register(),S.Normalizations.register(),b.hook=function(e,t,r){var n=a;return e=o(e),f.each(e,function(e,o){if(i(o)===a&&b.init(o),r===a)n===a&&(n=b.CSS.getPropertyValue(o,t));else{var s=b.CSS.setPropertyValue(o,t,r);"transform"===s[0]&&b.CSS.flushTransformCache(o),n=s}}),n};var P=function(){function e(){return s?k.promise||null:l}function n(){function e(e){function p(e,t){var r=a,n=a,i=a;return m.isArray(e)?(r=e[0],!m.isArray(e[1])&&/^[\d-]/.test(e[1])||m.isFunction(e[1])||S.RegEx.isHex.test(e[1])?i=e[1]:(m.isString(e[1])&&!S.RegEx.isHex.test(e[1])||m.isArray(e[1]))&&(n=t?e[1]:u(e[1],s.duration),e[2]!==a&&(i=e[2]))):r=e,t||(n=n||s.easing),m.isFunction(r)&&(r=r.call(o,V,w)),m.isFunction(i)&&(i=i.call(o,V,w)),[r||0,n,i]}function d(e,t){var r,a;return a=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return r=e,""}),r||(r=S.Values.getUnitType(e)),[a,r]}function h(){var e={myParent:o.parentNode||r.body,position:S.getPropertyValue(o,"position"),fontSize:S.getPropertyValue(o,"fontSize")},a=e.position===L.lastPosition&&e.myParent===L.lastParent,n=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var s=100,l={};if(n&&a)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var u=i(o).isSVG?r.createElementNS("http://www.w3.org/2000/svg","rect"):r.createElement("div");b.init(u),e.myParent.appendChild(u),f.each(["overflow","overflowX","overflowY"],function(e,t){b.CSS.setPropertyValue(u,t,"hidden")}),b.CSS.setPropertyValue(u,"position",e.position),b.CSS.setPropertyValue(u,"fontSize",e.fontSize),b.CSS.setPropertyValue(u,"boxSizing","content-box"),f.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(u,t,s+"%")}),b.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(S.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(S.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=L.lastEmToPx=(parseFloat(S.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===L.remToPx&&(L.remToPx=parseFloat(S.getPropertyValue(r.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(s.begin&&0===V)try{s.begin.call(g,g)}catch(x){setTimeout(function(){throw x},1)}if("scroll"===A){var P,C,T,F=/^x$/i.test(s.axis)?"Left":"Top",j=parseFloat(s.offset)||0;s.container?m.isWrapped(s.container)||m.isNode(s.container)?(s.container=s.container[0]||s.container,P=s.container["scroll"+F],T=P+f(o).position()[F.toLowerCase()]+j):s.container=null:(P=b.State.scrollAnchor[b.State["scrollProperty"+F]],C=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===F?"Top":"Left")]],T=f(o).offset()[F.toLowerCase()]+j),l={scroll:{rootPropertyValue:!1,startValue:P,currentValue:P,endValue:T,unitType:"",easing:s.easing,scrollData:{container:s.container,direction:F,alternateValue:C}},element:o},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===A){if(!i(o).tweensContainer)return void f.dequeue(o,s.queue);"none"===i(o).opts.display&&(i(o).opts.display="auto"),"hidden"===i(o).opts.visibility&&(i(o).opts.visibility="visible"),i(o).opts.loop=!1,i(o).opts.begin=null,i(o).opts.complete=null,v.easing||delete s.easing,v.duration||delete s.duration,s=f.extend({},i(o).opts,s);var E=f.extend(!0,{},i(o).tweensContainer);for(var H in E)if("element"!==H){var N=E[H].startValue;E[H].startValue=E[H].currentValue=E[H].endValue,E[H].endValue=N,m.isEmptyObject(v)||(E[H].easing=s.easing),b.debug&&console.log("reverse tweensContainer ("+H+"): "+JSON.stringify(E[H]),o)}l=E}else if("start"===A){var E;i(o).tweensContainer&&i(o).isAnimating===!0&&(E=i(o).tweensContainer),f.each(y,function(e,t){if(RegExp("^"+S.Lists.colors.join("$|^")+"$").test(e)){var r=p(t,!0),n=r[0],o=r[1],i=r[2];if(S.RegEx.isHex.test(n)){for(var s=["Red","Green","Blue"],l=S.Values.hexToRgb(n),u=i?S.Values.hexToRgb(i):a,c=0;c<s.length;c++){var f=[l[c]];o&&f.push(o),u!==a&&f.push(u[c]),y[e+s[c]]=f}delete y[e]}}});for(var z in y){var O=p(y[z]),q=O[0],$=O[1],M=O[2];z=S.Names.camelCase(z);var I=S.Hooks.getRoot(z),B=!1;if(i(o).isSVG||"tween"===I||S.Names.prefixCheck(I)[1]!==!1||S.Normalizations.registered[I]!==a){(s.display!==a&&null!==s.display&&"none"!==s.display||s.visibility!==a&&"hidden"!==s.visibility)&&/opacity|filter/.test(z)&&!M&&0!==q&&(M=0),s._cacheValues&&E&&E[z]?(M===a&&(M=E[z].endValue+E[z].unitType),B=i(o).rootPropertyValueCache[I]):S.Hooks.registered[z]?M===a?(B=S.getPropertyValue(o,I),M=S.getPropertyValue(o,z,B)):B=S.Hooks.templates[I][1]:M===a&&(M=S.getPropertyValue(o,z));var W,G,Y,D=!1;if(W=d(z,M),M=W[0],Y=W[1],W=d(z,q),q=W[0].replace(/^([+-\/*])=/,function(e,t){return D=t,""}),G=W[1],M=parseFloat(M)||0,q=parseFloat(q)||0,"%"===G&&(/^(fontSize|lineHeight)$/.test(z)?(q/=100,G="em"):/^scale/.test(z)?(q/=100,G=""):/(Red|Green|Blue)$/i.test(z)&&(q=q/100*255,G="")),/[\/*]/.test(D))G=Y;else if(Y!==G&&0!==M)if(0===q)G=Y;else{n=n||h();var Q=/margin|padding|left|right|width|text|word|letter/i.test(z)||/X$/.test(z)||"x"===z?"x":"y";switch(Y){case"%":M*="x"===Q?n.percentToPxWidth:n.percentToPxHeight;break;case"px":break;default:M*=n[Y+"ToPx"]}switch(G){case"%":M*=1/("x"===Q?n.percentToPxWidth:n.percentToPxHeight);break;case"px":break;default:M*=1/n[G+"ToPx"]}}switch(D){case"+":q=M+q;break;case"-":q=M-q;break;case"*":q=M*q;break;case"/":q=M/q}l[z]={rootPropertyValue:B,startValue:M,currentValue:M,endValue:q,unitType:G,easing:$},b.debug&&console.log("tweensContainer ("+z+"): "+JSON.stringify(l[z]),o)}else b.debug&&console.log("Skipping ["+I+"] due to a lack of browser support.")}l.element=o}l.element&&(S.Values.addClass(o,"velocity-animating"),R.push(l),""===s.queue&&(i(o).tweensContainer=l,i(o).opts=s),i(o).isAnimating=!0,V===w-1?(b.State.calls.push([R,g,s,null,k.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,c())):V++)}var n,o=this,s=f.extend({},b.defaults,v),l={};switch(i(o)===a&&b.init(o),parseFloat(s.delay)&&s.queue!==!1&&f.queue(o,s.queue,function(e){b.velocityQueueEntryFlag=!0,i(o).delayTimer={setTimeout:setTimeout(e,parseFloat(s.delay)),next:e}}),s.duration.toString().toLowerCase()){case"fast":s.duration=200;break;case"normal":s.duration=h;break;case"slow":s.duration=600;break;default:s.duration=parseFloat(s.duration)||1}b.mock!==!1&&(b.mock===!0?s.duration=s.delay=1:(s.duration*=parseFloat(b.mock)||1,s.delay*=parseFloat(b.mock)||1)),s.easing=u(s.easing,s.duration),s.begin&&!m.isFunction(s.begin)&&(s.begin=null),s.progress&&!m.isFunction(s.progress)&&(s.progress=null),s.complete&&!m.isFunction(s.complete)&&(s.complete=null),s.display!==a&&null!==s.display&&(s.display=s.display.toString().toLowerCase(),"auto"===s.display&&(s.display=b.CSS.Values.getDisplayType(o))),s.visibility!==a&&null!==s.visibility&&(s.visibility=s.visibility.toString().toLowerCase()),s.mobileHA=s.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,s.queue===!1?s.delay?setTimeout(e,s.delay):e():f.queue(o,s.queue,function(t,r){return r===!0?(k.promise&&k.resolver(g),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==s.queue&&"fx"!==s.queue||"inprogress"===f.queue(o)[0]||f.dequeue(o)}var s,l,d,g,y,v,x=arguments[0]&&(arguments[0].p||f.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||m.isString(arguments[0].properties));if(m.isWrapped(this)?(s=!1,d=0,g=this,l=this):(s=!0,d=1,g=x?arguments[0].elements||arguments[0].e:arguments[0]),g=o(g)){x?(y=arguments[0].properties||arguments[0].p,v=arguments[0].options||arguments[0].o):(y=arguments[d],v=arguments[d+1]);var w=g.length,V=0;if(!/^(stop|finish)$/i.test(y)&&!f.isPlainObject(v)){var C=d+1;v={};for(var T=C;T<arguments.length;T++)m.isArray(arguments[T])||!/^(fast|normal|slow)$/i.test(arguments[T])&&!/^\d/.test(arguments[T])?m.isString(arguments[T])||m.isArray(arguments[T])?v.easing=arguments[T]:m.isFunction(arguments[T])&&(v.complete=arguments[T]):v.duration=arguments[T]}var k={promise:null,resolver:null,rejecter:null};s&&b.Promise&&(k.promise=new b.Promise(function(e,t){k.resolver=e,k.rejecter=t}));var A;switch(y){case"scroll":A="scroll";break;case"reverse":A="reverse";break;case"finish":case"stop":f.each(g,function(e,t){i(t)&&i(t).delayTimer&&(clearTimeout(i(t).delayTimer.setTimeout),i(t).delayTimer.next&&i(t).delayTimer.next(),delete i(t).delayTimer)});var F=[];return f.each(b.State.calls,function(e,t){t&&f.each(t[1],function(r,n){var o=v===a?"":v;return o===!0||t[2].queue===o||v===a&&t[2].queue===!1?void f.each(g,function(r,a){a===n&&((v===!0||m.isString(v))&&(f.each(f.queue(a,m.isString(v)?v:""),function(e,t){
  m.isFunction(t)&&t(null,!0)}),f.queue(a,m.isString(v)?v:"",[])),"stop"===y?(i(a)&&i(a).tweensContainer&&o!==!1&&f.each(i(a).tweensContainer,function(e,t){t.endValue=t.currentValue}),F.push(e)):"finish"===y&&(t[2].duration=1))}):!0})}),"stop"===y&&(f.each(F,function(e,t){p(t,!0)}),k.promise&&k.resolver(g)),e();default:if(!f.isPlainObject(y)||m.isEmptyObject(y)){if(m.isString(y)&&b.Redirects[y]){var j=f.extend({},v),E=j.duration,H=j.delay||0;return j.backwards===!0&&(g=f.extend(!0,[],g).reverse()),f.each(g,function(e,t){parseFloat(j.stagger)?j.delay=H+parseFloat(j.stagger)*e:m.isFunction(j.stagger)&&(j.delay=H+j.stagger.call(t,e,w)),j.drag&&(j.duration=parseFloat(E)||(/^(callout|transition)/.test(y)?1e3:h),j.duration=Math.max(j.duration*(j.backwards?1-e/w:(e+1)/w),.75*j.duration,200)),b.Redirects[y].call(t,t,j||{},e,w,g,k.promise?k:a)}),e()}var N="Velocity: First argument ("+y+") was not a property map, a known action, or a registered redirect. Aborting.";return k.promise?k.rejecter(new Error(N)):console.log(N),e()}A="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},R=[];f.each(g,function(e,t){m.isNode(t)&&n.call(t)});var z,j=f.extend({},b.defaults,v);if(j.loop=parseInt(j.loop),z=2*j.loop-1,j.loop)for(var O=0;z>O;O++){var q={delay:j.delay,progress:j.progress};O===z-1&&(q.display=j.display,q.visibility=j.visibility,q.complete=j.complete),P(g,"reverse",q)}return e()}};b=f.extend(P,b),b.animate=P;var w=t.requestAnimationFrame||g;return b.State.isMobile||r.hidden===a||r.addEventListener("visibilitychange",function(){r.hidden?(w=function(e){return setTimeout(function(){e(!0)},16)},c()):w=t.requestAnimationFrame||g}),e.Velocity=b,e!==t&&(e.fn.velocity=P,e.fn.velocity.defaults=b.defaults),f.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u=l.begin,c=l.complete,p={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},d={};l.display===a&&(l.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(i,i);for(var r in p){d[r]=e.style[r];var a=b.CSS.getPropertyValue(e,r);p[r]="Down"===t?[a,0]:[0,a]}d.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in d)e.style[t]=d[t];c&&c.call(i,i),s&&s.resolver(i)},b(e,p,l)}}),f.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u={opacity:"In"===t?1:0},c=l.complete;l.complete=n!==o-1?l.begin=null:function(){c&&c.call(i,i),s&&s.resolver(i)},l.display===a&&(l.display="In"===t?"auto":"none"),b(this,u,l)}}),b}(window.jQuery||window.Zepto||window,window,document)}));
  
  'use strict';
  
  var WOW;
  
  (function ($) {
  
    WOW = function WOW() {
  
      return {
  
        init: function init() {
  
          var animationName = [];
  
          var once = 1;
  
          function mdbWow() {
  
            var windowHeight = window.innerHeight;
            var scroll = window.scrollY;
  
            $('.wow').each(function () {
  
              if ($(this).css('visibility') == 'visible') {
                return;
              }
  
              if (windowHeight + scroll - 100 > getOffset(this) && scroll < getOffset(this) || windowHeight + scroll - 100 > getOffset(this) + $(this).height() && scroll < getOffset(this) + $(this).height() || windowHeight + scroll == $(document).height() && getOffset(this) + 100 > $(document).height()) {
  
                var index = $(this).index('.wow');
  
                var delay = $(this).attr('data-wow-delay');
  
                if (delay) {
  
                  delay = $(this).attr('data-wow-delay').slice(0, -1
  
                  );
                  var self = this;
  
                  var timeout = parseFloat(delay) * 1000;
  
                  $(self).addClass('animated');
                  $(self).css({
                    'visibility': 'visible'
                  });
                  $(self).css({
                    'animation-delay': delay
                  });
                  $(self).css({
                    'animation-name': animationName[index]
                  });
  
                  var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;
  
                  if ($(this).attr('data-wow-delay')) {
  
                    removeTime += $(this).attr('data-wow-delay').slice(0, -1) * 1000;
                  }
  
                  var self = this;
  
                  setTimeout(function () {
  
                    $(self).removeClass('animated');
                  }, removeTime);
                } else {
  
                  $(this).addClass('animated');
                  $(this).css({
                    'visibility': 'visible'
                  });
                  $(this).css({
                    'animation-name': animationName[index]
                  });
  
                  var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;
  
                  var self = this;
  
                  setTimeout(function () {
  
                    $(self).removeClass('animated');
                  }, removeTime);
                }
              }
            });
          }
  
          function appear() {
  
            $('.wow').each(function () {
  
              var index = $(this).index('.wow');
  
              var delay = $(this).attr('data-wow-delay');
  
              if (delay) {
  
                delay = $(this).attr('data-wow-delay').slice(0, -1);
  
                var timeout = parseFloat(delay) * 1000;
  
                $(this).addClass('animated');
                $(this).css({
                  'visibility': 'visible'
                });
                $(this).css({
                  'animation-delay': delay + 's'
                });
                $(this).css({
                  'animation-name': animationName[index]
                });
              } else {
  
                $(this).addClass('animated');
                $(this).css({
                  'visibility': 'visible'
                });
                $(this).css({
                  'animation-name': animationName[index]
                });
              }
            });
          }
  
          function hide() {
  
            var windowHeight = window.innerHeight;
            var scroll = window.scrollY;
  
            $('.wow.animated').each(function () {
  
              if (windowHeight + scroll - 100 > getOffset(this) && scroll > getOffset(this) + 100 || windowHeight + scroll - 100 < getOffset(this) && scroll < getOffset(this) + 100 || getOffset(this) + $(this).height > $(document).height() - 100) {
  
                $(this).removeClass('animated');
                $(this).css({
                  'animation-name': 'none'
                });
                $(this).css({
                  'visibility': 'hidden'
                });
              } else {
  
                var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;
  
                if ($(this).attr('data-wow-delay')) {
  
                  removeTime += $(this).attr('data-wow-delay').slice(0, -1) * 1000;
                }
  
                var self = this;
  
                setTimeout(function () {
  
                  $(self).removeClass('animated');
                }, removeTime);
              }
            });
  
            mdbWow();
  
            once--;
          }
  
          function getOffset(elem) {
  
            var box = elem.getBoundingClientRect();
  
            var body = document.body;
            var docEl = document.documentElement;
  
            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  
            var clientTop = docEl.clientTop || body.clientTop || 0;
  
            var top = box.top + scrollTop - clientTop;
  
            return Math.round(top);
          }
  
          $('.wow').each(function () {
  
            $(this).css({
              'visibility': 'hidden'
            });
            animationName[$(this).index('.wow')] = $(this).css('animation-name');
            $(this).css({
              'animation-name': 'none'
            });
          });
  
          $(window).scroll(function () {
  
            if (once) {
  
              hide();
            } else {
  
              mdbWow();
            }
          });
  
          appear();
        }
      };
    };
  })(jQuery);
  
  "use strict";
  
  (function ($) {
    var SCROLLING_NAVBAR_OFFSET_TOP = 50;
    $(window).on('scroll', function () {
      var $navbar = $('.navbar');
  
      if ($navbar.length) {
        if ($navbar.offset().top > SCROLLING_NAVBAR_OFFSET_TOP) {
          $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
          $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
      }
    });
  })(jQuery);
  /*!
   * Waves v0.7.6
   * http://fian.my.id/Waves
   *
   * Copyright 2014-2018 Alfiana E. Sibuea and other contributors
   * Released under the MIT license
   * https://github.com/fians/Waves/blob/master/LICENSE
   */
    /* designed & created by: ar y an   n ag a r  | a r ya n n a g ar 2 7  */
  
  
  (function (window, factory) {
    'use strict';
  
    // AMD. Register as an anonymous module.  Wrap in function so we have access
    // to root via `this`.
    if (typeof define === 'function' && define.amd) {
      define([], function () {
        window.Waves = factory.call(window);
        return window.Waves;
      });
    }
  
    // Node. Does not work with strict CommonJS, but only Com mo n JS -like
    // environments that support module.exports, like Node. ar y a nn a ga r 27
    else if (typeof exports === 'object') {
      module.exports = factory.call(window);
    }
  /**
     * ------------------------------------------------------------------------
     * a r y a n n a g a r 27
     * ------------------------------------------------------------------------
     */
    // Browser globals.
    else {
      window.Waves = factory.call(window);
    }
  })(typeof window === 'object' ? window : this, function () {
    'use strict';
  
    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);
    var toString = Object.prototype.toString;
    var isTouchAvailable = 'ontouchstart' in window;
  
  
    // Find exact position of element
    function isWindow(obj) {
      return obj !== null && obj === obj.window;
    }
  
    function getWindow(elem) {
      return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }
  
    function isObject(value) {
      var type = typeof value;
      return type === 'function' || type === 'object' && !!value;
    }
  
    function isDOMNode(obj) {
      return isObject(obj) && obj.nodeType > 0;
    }
  
    function getWavesElements(nodes) {
      var stringRepr = toString.call(nodes);
  
      if (stringRepr === '[object String]') {
        return $$(nodes);
      } else if (isObject(nodes) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
        return nodes;
      } else if (isDOMNode(nodes)) {
        return [nodes];
      }
  
      return [];
    }
  
    function offset(elem) {
      var docElem, win,
        box = {
          top: 0,
          left: 0
        },
        doc = elem && elem.ownerDocument;
  
      docElem = doc.documentElement;
  
      if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    }
  
    function convertStyle(styleObj) {
      var style = '';
  
      for (var prop in styleObj) {
        if (styleObj.hasOwnProperty(prop)) {
          style += (prop + ':' + styleObj[prop] + ';');
        }
      }
  
      return style;
    }
  
    var Effect = {
  
      // Effect duration
      duration: 750,
  
      // Effect delay (check for scroll before showing effect)
      delay: 200,
  
      show: function (e, element, velocity) {
  
        // Disable right click
        if (e.button === 2) {
          return false;
        }
  
        element = element || this;
  
        // Create ripple
        var ripple = document.createElement('div');
        ripple.className = 'waves-ripple waves-rippling';
        element.appendChild(ripple);
  
        // Get click coordinate and element width
        var pos = offset(element);
        var relativeY = 0;
        var relativeX = 0;
        // Support for touch devices
        if ('touches' in e && e.touches.length) {
          relativeY = (e.touches[0].pageY - pos.top);
          relativeX = (e.touches[0].pageX - pos.left);
        }
        //Normal case
        else {
          relativeY = (e.pageY - pos.top);
          relativeX = (e.pageX - pos.left);
        }
        // Support for synthetic events
        relativeX = relativeX >= 0 ? relativeX : 0;
        relativeY = relativeY >= 0 ? relativeY : 0;
  
        var scale = 'scale(' + ((element.clientWidth / 100) * 3) + ')';
        var translate = 'translate(0,0)';
  
        if (velocity) {
          translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
        }
  
        // Attach data to element
        ripple.setAttribute('data-hold', Date.now());
        ripple.setAttribute('data-x', relativeX);
        ripple.setAttribute('data-y', relativeY);
        ripple.setAttribute('data-scale', scale);
        ripple.setAttribute('data-translate', translate);
  
        // Set ripple position
        var rippleStyle = {
          top: relativeY + 'px',
          left: relativeX + 'px'
        };
  
        ripple.classList.add('waves-notransition');
        ripple.setAttribute('style', convertStyle(rippleStyle));
        ripple.classList.remove('waves-notransition');
  
        // Scale the ripple
        rippleStyle['-webkit-transform'] = scale + ' ' + translate;
        rippleStyle['-moz-transform'] = scale + ' ' + translate;
        rippleStyle['-ms-transform'] = scale + ' ' + translate;
        rippleStyle['-o-transform'] = scale + ' ' + translate;
        rippleStyle.transform = scale + ' ' + translate;
        rippleStyle.opacity = '1';
  
        var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
        rippleStyle['-webkit-transition-duration'] = duration + 'ms';
        rippleStyle['-moz-transition-duration'] = duration + 'ms';
        rippleStyle['-o-transition-duration'] = duration + 'ms';
        rippleStyle['transition-duration'] = duration + 'ms';
  
        ripple.setAttribute('style', convertStyle(rippleStyle));
      },
  
      hide: function (e, element) {
        element = element || this;
  
        var ripples = element.getElementsByClassName('waves-rippling');
  
        for (var i = 0, len = ripples.length; i < len; i++) {
          removeRipple(e, element, ripples[i]);
        }
  
        if (isTouchAvailable) {
          element.removeEventListener('touchend', Effect.hide);
          element.removeEventListener('touchcancel', Effect.hide);
        }
  
        element.removeEventListener('mouseup', Effect.hide);
        element.removeEventListener('mouseleave', Effect.hide);
      }
    };
  
    /**
     * Collection of wrapper for HTML element that only have single tag
     * like <input> and <img>
     */
    var TagWrapper = {
  
      // Wrap <input> tag so it can perform the effect
      input: function (element) {
  
        var parent = element.parentNode;
  
        // If input already have parent just pass through
        if (parent.tagName.toLowerCase() === 'span' && parent.classList.contains('waves-effect')) {
          return;
        }
  
        // Put element class and style to the specified parent      
    /* designed & created by: a r ya n   na g a r  |   a r ya n n ag a r 2 7 */
        var wrapper = document.createElement('span');
        wrapper.className = 'waves-input-wrapper';
        // element.className = 'waves-button-input';
  
        // Put element as child
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
  
      },
  
      // Wrap <img> tag so it can perform the effect
      img: function (element) {
  
        var parent = element.parentNode;
  
        // If input already have parent just pass through
        if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
          return;
        }
  
        // Put element as child
        var wrapper = document.createElement('i');
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
  
      }
    };
  
    /**
     * Hide the effect and remove the ripple. Must be
     * a separate function to pass the JSLint...
     */
    function removeRipple(e, el, ripple) {
  
      // Check if the ripple still exist
      if (!ripple) {
        return;
      }
  
      ripple.classList.remove('waves-rippling');
  
      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');
      var translate = ripple.getAttribute('data-translate');
  
      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;
  
      if (delay < 0) {
        delay = 0;
      }
  
      if (e.type === 'mousemove') {
        delay = 150;
      }
  
      // Fade out ripple after delay
      var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
  
      setTimeout(function () {
  
        var style = {
          top: relativeY + 'px',
          left: relativeX + 'px',
          opacity: '0',
  
          // Duration
          '-webkit-transition-duration': duration + 'ms',
          '-moz-transition-duration': duration + 'ms',
          '-o-transition-duration': duration + 'ms',
          'transition-duration': duration + 'ms',
          '-webkit-transform': scale + ' ' + translate,
          '-moz-transform': scale + ' ' + translate,
          '-ms-transform': scale + ' ' + translate,
          '-o-transform': scale + ' ' + translate,
          'transform': scale + ' ' + translate
        };
  
        ripple.setAttribute('style', convertStyle(style));
  
        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, duration);
  
      }, delay);
    }
  
  
    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
  
      /* uses an integer rather than bool so there's no issues with
       * needing to clear timeouts if another touch event occurred
       * within the 500ms. Cannot mouseup between touchstart and
       * touchend, nor in the 500ms after touchend. */
      touches: 0,
  
      allowEvent: function (e) {
  
        var allow = true;
  
        if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
          allow = false;
        }
  
        return allow;
      },
      registerEvent: function (e) {
        var eType = e.type;
  
        if (eType === 'touchstart') {
  
          TouchHandler.touches += 1; // push
  
        } else if (/^(touchend|touchcancel)$/.test(eType)) {
  
          setTimeout(function () {
            if (TouchHandler.touches) {
              TouchHandler.touches -= 1; // pop after 500ms
            }
          }, 500);
  
        }
      }
    };
  
  
    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {
  
      if (TouchHandler.allowEvent(e) === false) {
        return null;
      }
  
      var element = null;
      var target = e.target || e.srcElement;
  
      while (target.parentElement) {
        if ((!(target instanceof SVGElement)) && target.classList.contains('waves-effect')) {
          element = target;
          break;
        }
        target = target.parentElement;
      }
  
      return element;
    }
  
    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {
  
      // Disable effect if element has "disabled" property on it
      // In some cases, the ar y a n  n ag a r event is not triggered by the current element
      // if (e.target.getAttribute('disabled') !== null) {
      //     return;
      // }
  
      var element = getWavesEffectElement(e);
  
      if (element !== null) {
  
        // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
        if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
          return;
        }
  
        TouchHandler.registerEvent(e);
  
        if (e.type === 'touchstart' && Effect.delay) {
  
          var hidden = false;
  
          var timer = setTimeout(function () {
            timer = null;
            Effect.show(e, element);
          }, Effect.delay);
  
          var hideEffect = function (hideEvent) {
  
            // if touch hasn't moved, and effect not yet started: start effect now
            if (timer) {
              clearTimeout(timer);
              timer = null;
              Effect.show(e, element);
            }
            if (!hidden) {
              hidden = true;
              Effect.hide(hideEvent, element);
            }
  
            removeListeners();
          };
  
          var touchMove = function (moveEvent) {
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }
            hideEffect(moveEvent);
  
            removeListeners();
          };
  
          element.addEventListener('touchmove', touchMove, false);
          element.addEventListener('touchend', hideEffect, false);
          element.addEventListener('touchcancel', hideEffect, false);
  
          var removeListeners = function () {
            element.removeEventListener('touchmove', touchMove);
            element.removeEventListener('touchend', hideEffect);
            element.removeEventListener('touchcancel', hideEffect);
          };
        } else {
  
          Effect.show(e, element);
  
          if (isTouchAvailable) {
            element.addEventListener('touchend', Effect.hide, false);
            element.addEventListener('touchcancel', Effect.hide, false);
          }
  
          element.addEventListener('mouseup', Effect.hide, false);
          element.addEventListener('mouseleave', Effect.hide, false);
        }
      }
    }
  
    Waves.init = function (options) {
      var body = document.body;
  
      options = options || {};
  
      if ('duration' in options) {
        Effect.duration = options.duration;
      }
  
      if ('delay' in options) {
        Effect.delay = options.delay;
      }
  
      if (isTouchAvailable) {
        body.addEventListener('touchstart', showEffect, false);
        body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
        body.addEventListener('touchend', TouchHandler.registerEvent, false);
      }
  
      body.addEventListener('mousedown', showEffect, false);
    };
  
  
    /**
     * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
     * waves classes to a set of elements. Set drag to true if the ripple mouseover
     * or skimming effect should be applied to the elements.
     */
    Waves.attach = function (elements, classes) {
  
      elements = getWavesElements(elements);
  
      if (toString.call(classes) === '[object Array]') {
        classes = classes.join(' ');
      }
  
      classes = classes ? ' ' + classes : '';
  
      var element, tagName;
  
      for (var i = 0, len = elements.length; i < len; i++) {
  
        element = elements[i];
        tagName = element.tagName.toLowerCase();
  
        if (['input', 'img'].indexOf(tagName) !== -1) {
          TagWrapper[tagName](element);
          element = element.parentElement;
        }
  
        if (element.className.indexOf('waves-effect') === -1) {
          element.className += ' waves-effect' + classes;
        }
      }
    };
  
  
    /**
     * Cause a ripple to appear in an element via code.
     */
    Waves.ripple = function (elements, options) {
      elements = getWavesElements(elements);
      var elementsLen = elements.length;
  
      options = options || {};
      options.wait = options.wait || 0;
      options.position = options.position || null; // default = centre of element
  
  
      if (elementsLen) {
        var element, pos, off, centre = {},
          i = 0;
        var mousedown = {
          type: 'mousedown',
          button: 1
        };
        var hideRipple = function (mouseup, element) {
          return function () {
            Effect.hide(mouseup, element);
          };
        };
  
        for (; i < elementsLen; i++) {
          element = elements[i];
          pos = options.position || {
            x: element.clientWidth / 2,
            y: element.clientHeight / 2
          };
  
          off = offset(element);
          centre.x = off.left + pos.x;
          centre.y = off.top + pos.y;
  
          mousedown.pageX = centre.x;
          mousedown.pageY = centre.y;
  
          Effect.show(mousedown, element);
  
          if (options.wait >= 0 && options.wait !== null) {
            var mouseup = {
              type: 'mouseup',
              button: 1
            };
  
            setTimeout(hideRipple(mouseup, element), options.wait);
          }
        }
      }
    };
  
    /**
     * Remove all ripples from an element.
     */
    Waves.calm = function (elements) {
      elements = getWavesElements(elements);
      var mouseup = {
        type: 'mouseup',
        button: 1
      };
  
      for (var i = 0, len = elements.length; i < len; i++) {
        Effect.hide(mouseup, elements[i]);
      }
    };
  
    /**
     * Deprecated API fallback
     */
    Waves.displayEffect = function (options) {
      console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
      Waves.init(options);
    };
  
    return Waves;
  });
  $(document).ready(function () {
    //Initialization
    Waves.attach('.btn:not(.btn-flat), .btn-floating', ['waves-light']);
    Waves.attach('.btn-flat', ['waves-effect']);
    Waves.attach('.chip', ['waves-effect']);
    Waves.attach('.view a .mask', ['waves-light']);
    Waves.attach('.waves-light', ['waves-light']);
    Waves.attach('.navbar-nav a:not(.navbar-brand), .nav-icons li a, .nav-tabs .nav-item:not(.dropdown)', ['waves-light']);
    Waves.attach('.pager li a', ['waves-light']);
    Waves.attach('.pagination .page-item .page-link', ['waves-effect']);
    Waves.init();
  });
  
  "use strict";
  
  var _this = void 0;
  
  (function ($) {
    var inputSelector = "".concat(['text', 'password', 'email', 'url', 'tel', 'number', 'search', 'search-md'].map(function (selector) {
      return "input[type=".concat(selector, "]");
    }).join(', '), ", textarea");
    var textAreaSelector = '.materialize-textarea';
  
    var updateTextFields = function updateTextFields($input) {
      var $labelAndIcon = $input.siblings('label, i');
      var hasValue = $input.val().length;
      var hasPlaceholder = $input.attr('placeholder');
      var addOrRemove = "".concat(hasValue || hasPlaceholder ? 'add' : 'remove', "Class");
      $labelAndIcon[addOrRemove]('active');
    };
  
    var validateField = function validateField($input) {
      if ($input.hasClass('validate')) {
        var value = $input.val();
        var noValue = !value.length;
        var isValid = !$input[0].validity.badInput;
  
        if (noValue && isValid) {
          $input.removeClass('valid').removeClass('invalid');
        } else {
          var valid = $input.is(':valid');
          var length = Number($input.attr('length')) || 0;
  
          if (valid && (!length || length > value.length)) {
            $input.removeClass('invalid').addClass('valid');
          } else {
            $input.removeClass('valid').addClass('invalid');
          }
        }
      }
    };
  
    var textAreaAutoResize = function textAreaAutoResize() {
      var $textarea = $(_this);
  
      if ($textarea.val().length) {
        var $hiddenDiv = $('.hiddendiv');
        var fontFamily = $textarea.css('font-family');
        var fontSize = $textarea.css('font-size');
  
        if (fontSize) {
          $hiddenDiv.css('font-size', fontSize);
        }
  
        if (fontFamily) {
          $hiddenDiv.css('font-family', fontFamily);
        }
  
        if ($textarea.attr('wrap') === 'off') {
          $hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
        }
  
        $hiddenDiv.text("".concat($textarea.val(), "\n"));
        var content = $hiddenDiv.html().replace(/\n/g, '<br>');
        $hiddenDiv.html(content); // When textarea is hidden, width goes crazy.
        // Approximate with half of window size
  
        $hiddenDiv.css('width', $textarea.is(':visible') ? $textarea.width() : $(window).width() / 2);
        $textarea.css('height', $hiddenDiv.height());
      }
    };
  
    $(inputSelector).each(function (index, input) {
      var $this = $(input);
      var $labelAndIcon = $this.siblings('label, i');
      updateTextFields($this);
      var isValid = input.validity.badInput;
  
      if (isValid) {
        $labelAndIcon.addClass('active');
      }
    });
    $(document).on('focus', inputSelector, function (e) {
      $(e.target).siblings('label, i').addClass('active');
    });
    $(document).on('blur', inputSelector, function (e) {
      var $this = $(e.target);
      var noValue = !$this.val();
      var invalid = !e.target.validity.badInput;
      var noPlaceholder = $this.attr('placeholder') === undefined;
  
      if (noValue && invalid && noPlaceholder) {
        $this.siblings('label, i').removeClass('active');
      }
  
      validateField($this);
    });
    $(document).on('change', inputSelector, function (e) {
      var $this = $(e.target);
      updateTextFields($this);
      validateField($this);
    });
    $('input[autofocus]').siblings('label, i').addClass('active');
    $(document).on('reset', function (e) {
      var $formReset = $(e.target);
  
      if ($formReset.is('form')) {
        var $formInputs = $formReset.find(inputSelector);
        $formInputs.removeClass('valid').removeClass('invalid').each(function (index, input) {
          var $this = $(input);
          var noDefaultValue = !$this.val();
          var noPlaceholder = !$this.attr('placeholder');
  
          if (noDefaultValue && noPlaceholder) {
            $this.siblings('label, i').removeClass('active');
          }
        });
        $formReset.find('select.initialized').each(function (index, select) {
          var $select = $(select);
          var $visibleInput = $select.siblings('input.select-dropdown');
          var defaultValue = $select.children('[selected]').val();
          $select.val(defaultValue);
          $visibleInput.val(defaultValue);
        });
      }
    });
  
    function init() {
      var $text = $('.md-textarea-auto');
  
      if ($text.length) {
        var observe;
  
        if (window.attachEvent) {
          observe = function observe(element, event, handler) {
            element.attachEvent("on".concat(event), handler);
          };
        } else {
          observe = function observe(element, event, handler) {
            element.addEventListener(event, handler, false);
          };
        }
  
        $text.each(function () {
          var self = this;
  
          function resize() {
            self.style.height = 'auto';
            self.style.height = "".concat(self.scrollHeight, "px");
          }
  
          function delayedResize() {
            window.setTimeout(resize, 0);
          }
  
          observe(self, 'change', resize);
          observe(self, 'cut', delayedResize);
          observe(self, 'paste', delayedResize);
          observe(self, 'drop', delayedResize);
          observe(self, 'keydown', delayedResize);
          resize();
        });
      }
    }
  
    init();
    var $body = $('body');
  
    if (!$('.hiddendiv').first().length) {
      var $hiddenDiv = $('<div class="hiddendiv common"></div>');
      $body.append($hiddenDiv);
    }
  
    $(textAreaSelector).each(textAreaAutoResize);
    $body.on('keyup keydown', textAreaSelector, textAreaAutoResize);
  })(jQuery);
  "use strict";
  
  (function ($) {
    $(document).on('click.card', '.card', function (e) {
      var $reveal = $(this).find('.card-reveal');
  
      if ($reveal.length) {
        var $clicked = $(e.target);
        var isTitle = $clicked.is('.card-reveal .card-title');
        var isTitleIcon = $clicked.is('.card-reveal .card-title i');
        var isActivator = $clicked.is('.card .activator');
        var isActivatorIcon = $clicked.is('.card .activator i');
  
        if (isTitle || isTitleIcon) {
          // down
          $(this).find('.card-reveal').velocity({
            translateY: 0
          }, {
            duration: 225,
            queue: false,
            easing: 'easeInOutQuad',
            complete: function complete() {
              $(this).css({
                display: 'none'
              });
            }
          });
        } else if (isActivator || isActivatorIcon) {
          // up
          $(this).find('.card-reveal').css({
            display: 'block'
          }).velocity('stop', false).velocity({
            translateY: '-100%'
          }, {
            duration: 300,
            queue: false,
            easing: 'easeInOutQuad'
          });
        }
      }
    });
    $('.rotate-btn').on('click', function () {
      var cardId = $(this).attr('data-card');
      $("#".concat(cardId)).toggleClass('flipped');
    });
    $(window).on('load', function () {
      var frontHeight = $('.front').outerHeight();
      var backHeight = $('.back').outerHeight();
  
      if (frontHeight > backHeight) {
        $('.card-wrapper, .back').height(frontHeight);
      } else if (frontHeight > backHeight) {
        $('.card-wrapper, .front').height(backHeight);
      } else {
        $('.card-wrapper').height(backHeight);
      }
    });
    $('.card-share > a').on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('share-expanded').parent().find('div').toggleClass('social-reveal-active');
    });
  })(jQuery);
  
  $('.map-card').click(function () {
    $('.card-body').toggleClass('closed');
  });
  "use strict";
  
  var SMOOTH_SCROLL_DURATION = 700;
  $('.smooth-scroll').on('click', 'a', function () {
    var elAttr = $(this).attr('href');
  
    if (typeof elAttr !== typeof undefined && elAttr.indexOf('#') === 0) {
      var offset = $(this).attr('data-offset') ? $(this).attr('data-offset') : 0;
      var setHash = $(this).parentsUntil('.smooth-scroll').last().parent().attr('data-allow-hashes');
      $('body,html').animate({
        scrollTop: $(elAttr).offset().top - offset
      }, SMOOTH_SCROLL_DURATION);
  
      if (typeof setHash !== typeof undefined && setHash !== false) {
        history.replaceState(null, null, elAttr);
      }
  
      return false;
    }
  });
  "use strict";
  
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  (function ($) {
    $.fn.scrollTo = function (elem) {
      $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
      return this;
    };
  
    $.fn.dropdown = function (option) {
      var options = $.extend({}, $.fn.dropdown.defaults, option);
  
      function updatePosition(origin, activates) {
        // Offscreen detection
        var windowHeight = window.innerHeight;
        var originHeight = origin.innerHeight();
        var offsetLeft = origin.offset().left;
        var offsetTop = origin.offset().top - $(window).scrollTop();
        var currAlignment = options.alignment;
        var gutterSpacing = 0;
        var leftPosition = 0; // Below Origin
  
        var verticalOffset = 0;
  
        if (options.belowOrigin === true) {
          verticalOffset = originHeight;
        } // Check for scrolling positioned container.
  
  
        var scrollOffset = 0;
        var wrapper = origin.parent();
  
        if (!wrapper.is('body') && wrapper[0].scrollHeight > wrapper[0].clientHeight) {
          scrollOffset = wrapper[0].scrollTop;
        }
  
        if (offsetLeft + activates.innerWidth() > $(window).width()) {
          // Dropdown goes past screen on right, force right alignment
          currAlignment = 'right';
        } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
          // Dropdown goes past screen on left, force left alignment
          currAlignment = 'left';
        } // Vertical bottom offscreen detection
  
  
        if (offsetTop + activates.innerHeight() > windowHeight) {
          // If going upwards still goes offscreen, just crop height of dropdown.
          if (offsetTop + originHeight - activates.innerHeight() < 0) {
            var adjustedHeight = windowHeight - offsetTop - verticalOffset;
            activates.css('max-height', adjustedHeight);
          } else {
            // Flow upwards.
            if (!verticalOffset) {
              verticalOffset += originHeight;
            }
  
            verticalOffset -= activates.innerHeight();
          }
        } // Handle edge alignment
  
  
        if (currAlignment === 'left') {
          gutterSpacing = options.gutter;
          leftPosition = origin.position().left + gutterSpacing;
        } else if (currAlignment === 'right') {
          var offsetRight = origin.position().left + origin.outerWidth() - activates.outerWidth();
          gutterSpacing = -options.gutter;
          leftPosition = offsetRight + gutterSpacing;
        } // Position dropdown
  
  
        activates.css({
          position: 'absolute',
          top: origin.position().top + verticalOffset + scrollOffset,
          left: leftPosition
        });
      }
  
      this.each(function () {
        var origin = $(this);
        var isFocused = false; // Dropdown menu
  
        var activates = $("#".concat(origin.attr('data-activates')));
  
        function updateOptions() {
          if (origin.data('induration') !== undefined) {
            options.inDuration = origin.data('inDuration');
          }
  
          if (origin.data('outduration') !== undefined) {
            options.outDuration = origin.data('outDuration');
          }
  
          if (origin.data('constrainwidth') !== undefined) {
            options.constrain_width = origin.data('constrainwidth');
          }
  
          if (origin.data('hover') !== undefined) {
            options.hover = origin.data('hover');
          }
  
          if (origin.data('gutter') !== undefined) {
            options.gutter = origin.data('gutter');
          }
  
          if (origin.data('beloworigin') !== undefined) {
            options.belowOrigin = origin.data('beloworigin');
          }
  
          if (origin.data('alignment') !== undefined) {
            options.alignment = origin.data('alignment');
          }
  
          if (origin.data('maxheight') !== undefined) {
            options.maxHeight = origin.data('maxheight');
          }
  
          if (origin.data('resetscroll') !== undefined) {
            options.resetScroll = origin.data('resetscroll') === 'true';
          }
        }
  
        updateOptions(); // Attach dropdown to its activator
  
        origin.after(activates);
        /*
          Helper function to position and resize dropdown.
          Used in hover and click handler.
        */
  
        function placeDropdown(eventType) {
          // Check for simultaneous focus and click events.
          if (eventType === 'focus') {
            isFocused = true;
          } // Check html data attributes
  
  
          updateOptions(); // Set Dropdown state
  
          activates.addClass('active');
          origin.addClass('active'); // Constrain width
  
          if (options.constrain_width === true) {
            activates.css('width', origin.outerWidth());
          } else {
            activates.css('white-space', 'nowrap');
          }
  
          updatePosition(origin, activates); // Show dropdown
  
  /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
          activates.stop(true, true).css('opacity', 0).slideDown({
            queue: false,
            duration: options.inDuration,
            easing: 'easeOutCubic',
            complete: function complete() {
              $(this).css('height', '');
            }
          }).animate(_objectSpread({
            opacity: 1
          }, options.resetScroll && {
            scrollTop: 0
          }), {
            queue: false,
            duration: options.inDuration,
            easing: 'easeOutSine'
          });
        }
  
        function hideDropdown() {
          // Check for simultaneous focus and click events.
          isFocused = false;
          activates.fadeOut(options.outDuration);
          activates.removeClass('active');
          origin.removeClass('active');
          setTimeout(function () {
            activates.css('max-height', options.maxHeight);
          }, options.outDuration);
        } // Hover
  
  
        if (options.hover) {
          var open = false;
          origin.unbind("click.".concat(origin.attr('id'))); // Hover handler to show dropdown
  
          origin.on('mouseenter', function () {
            // Mouse over
            if (open === false) {
              placeDropdown();
              open = true;
            }
          });
          origin.on('mouseleave', function (e) {
            // If hover on origin then to something other than dropdown content, then close
            var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
  
            if (!$(toEl).closest('.dropdown-content').is(activates)) {
              activates.stop(true, true);
              hideDropdown();
              open = false;
            }
          });
          activates.on('mouseleave', function (e) {
            // Mouse out
            var toEl = e.toElement || e.relatedTarget;
  
            if (!$(toEl).closest('.dropdown-button').is(origin)) {
              activates.stop(true, true);
              hideDropdown();
              open = false;
            }
          }); // Click
        } else {
          // Click handler to show dropdown
          origin.unbind("click.".concat(origin.attr('id')));
          origin.bind("click.".concat(origin.attr('id')), function (e) {
            if (!isFocused) {
              if (origin[0] === e.currentTarget && !origin.hasClass('active') && $(e.target).closest('.dropdown-content').length === 0) {
                e.preventDefault(); // Prevents button click from moving window
  
                placeDropdown('click');
              } else if (origin.hasClass('active')) {
                // If origin is clicked and menu is open, close menu
                hideDropdown();
                $(document).unbind("click.".concat(activates.attr('id'), " touchstart.").concat(activates.attr('id')));
              } // If menu open, add click close handler to document
  
  
              if (activates.hasClass('active')) {
                $(document).bind("click.".concat(activates.attr('id'), " touchstart.").concat(activates.attr('id')), function (e) {
                  if (!activates.is(e.target) && !origin.is(e.target) && !origin.find(e.target).length) {
                    hideDropdown();
                    $(document).unbind("click.".concat(activates.attr('id'), " touchstart.").concat(activates.attr('id')));
                  }
                });
              }
            }
          });
        }
  
        origin.on('open', function (e, eventType) {
          placeDropdown(eventType);
        });
        origin.on('close', hideDropdown);
      });
      return {
        updatePosition: updatePosition
      };
    };
  
    $.fn.dropdown.defaults = {
      inDuration: 300,
      outDuration: 225,
      constrain_width: true,
      hover: false,
      gutter: 0,
      belowOrigin: false,
      alignment: 'left',
      maxHeight: '',
      resetScroll: true
    };
    $('.dropdown-button').dropdown();
  
    $.fn.mdbDropSearch = function (options) {
      var $mdbInput = $(this).find('input');
      this.filter(function (value, index) {
        $(index).on('keyup', function () {
          var $linksInDropMenu = $mdbInput.closest('div[id]').find('a, li');
  
          for (var i = 0; i < $linksInDropMenu.length; i++) {
            if ($linksInDropMenu.eq(i).html().toUpperCase().indexOf($mdbInput.val().toUpperCase()) > -1) {
              $linksInDropMenu.eq(i).css({
                display: ''
              });
            } else {
              $linksInDropMenu.eq(i).css({
                display: 'none'
              });
            }
          }
        });
      });
      var settings = $.extend({
        color: '#000',
        backgroundColor: '',
        fontSize: '.9rem',
        fontWeight: '400',
        borderRadius: '',
        borderColor: ''
      }, options);
      return this.css({
        color: settings.color,
        backgroundColor: settings.backgroundColor,
        fontSize: settings.fontSize,
        fontWeight: settings.fontWeight,
        borderRadius: settings.borderRadius,
        border: settings.border,
        margin: settings.margin
      });
    };
  })(jQuery);
  
  var dropdownSelectors = $('.dropdown, .dropup'); // Custom function to read dropdown data
  
  function dropdownEffectData(target) {
    // TODO - page level global?
    var effectInDefault = 'fadeIn';
    var effectOutDefault = 'fadeOut';
    var dropdown = $(target);
    var dropdownMenu = $('.dropdown-menu', target);
    var parentUl = dropdown.parents('ul.nav'); // If parent is ul.nav allow global effect settings
  
    if (parentUl.height > 0) {
      effectInDefault = parentUl.data('dropdown-in') || null;
      effectOutDefault = parentUl.data('dropdown-out') || null;
    }
  
    return {
      target: target,
      dropdown: dropdown,
      dropdownMenu: dropdownMenu,
      effectIn: dropdownMenu.data('dropdown-in') || effectInDefault,
      effectOut: dropdownMenu.data('dropdown-out') || effectOutDefault
    };
  } // Custom function to start effect (in or out)
  
  
  function dropdownEffectStart(data, effectToStart) {
    if (effectToStart) {
      data.dropdown.addClass('dropdown-animating');
      data.dropdownMenu.addClass(['animated', effectToStart].join(' '));
    }
  } // Custom function to read when animation is over
  
  
  function dropdownEffectEnd(data, callbackFunc) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    data.dropdown.one(animationEnd, function () {
      data.dropdown.removeClass('dropdown-animating');
      data.dropdownMenu.removeClass(['animated', data.effectIn, data.effectOut].join(' ')); // Custom callback option, used to remove open class in out effect
  
      if (typeof callbackFunc === 'function') {
        callbackFunc();
      }
    });
  } // Bootstrap API hooks
  
  
  dropdownSelectors.on({
    'show.bs.dropdown': function showBsDropdown() {
      // On show, start in effect
      var dropdown = dropdownEffectData(this);
      dropdownEffectStart(dropdown, dropdown.effectIn);
    },
    'shown.bs.dropdown': function shownBsDropdown() {
      // On shown, remove in effect once complete
      var dropdown = dropdownEffectData(this);
  
      if (dropdown.effectIn && dropdown.effectOut) {
        dropdownEffectEnd(dropdown);
      }
    },
    'hide.bs.dropdown': function hideBsDropdown(e) {
      // On hide, start out effect
      var dropdown = dropdownEffectData(this);
  
      if (dropdown.effectOut) {
        e.preventDefault();
        dropdownEffectStart(dropdown, dropdown.effectOut);
        dropdownEffectEnd(dropdown, function () {
          dropdown.dropdown.removeClass('show');
          dropdown.dropdownMenu.removeClass('show');
        });
      }
    }
  });
  $('.multi-level-dropdown .dropdown-submenu > a').on("mouseenter", function (e) {
    var submenu = $(this);
    $('.multi-level-dropdown .dropdown-submenu .dropdown-menu').removeClass('show');
    submenu.next('.dropdown-menu').addClass('show');
    e.stopPropagation();
  });
  $('.multi-level-dropdown .dropdown').on("hidden.bs.dropdown", function () {
    // hide any open menus when parent closes
    $('.multi-level-dropdown .dropdown-menu.show').removeClass('show');
  });
  "use strict";
  
  (function ($) {
    var _this = this;
  
    $(document).ready(function () {
      $(document).on('mouseenter', '.fixed-action-btn', function () {
        var $this = $(this);
        openFABMenu($this);
      });
      $(document).on('mouseleave', '.fixed-action-btn', function () {
        var $this = $(this);
        closeFABMenu($this);
      });
      $(document).on('click', '.fixed-action-btn > a', function () {
        var $this = $(this);
        var $menu = $this.parent();
        $menu.hasClass('active') ? openFABMenu($menu) : closeFABMenu($menu);
  
        if ($menu.hasClass('active')) {
          closeFABMenu($menu);
        } else {
          openFABMenu($menu);
        }
      });
    });
    $.fn.extend({
      openFAB: function openFAB() {
        openFABMenu($(this));
      },
      closeFAB: function closeFAB() {
        closeFABMenu($(this));
      }
    });
  
    var openFABMenu = function openFABMenu(btn) {
      var fab = btn;
  
      if (!fab.hasClass('active')) {
        fab.addClass('active');
        var btnList = document.querySelectorAll('ul .btn-floating');
        btnList.forEach(function (el) {
          el.classList.add('shown');
        });
      }
    };
  
    var closeFABMenu = function closeFABMenu(btn) {
      var fab = btn;
      fab.removeClass('active');
      var btnList = document.querySelectorAll('ul .btn-floating');
      btnList.forEach(function (el) {
        el.classList.remove('shown');
      });
    };
  
    $('.fixed-action-btn:not(.smooth-scroll) > .btn-floating').on('click', function (e) {
      if (!$(_this).hasClass('smooth-scroll')) {
        e.preventDefault();
        toggleFABMenu($('.fixed-action-btn'));
        return false;
      }
    });
  
    function toggleFABMenu(btn) {
      var elem = btn;
  
      if (elem.hasClass('active')) {
        closeFABMenu(elem);
      } else {
        openFABMenu(elem);
      }
    }
  })(jQuery);
  "use strict";
  
  (function ($) {
    $.fn.collapsible = function (options) {
      var defaults = {
        accordion: undefined
      };
      options = $.extend(defaults, options);
  
      function accordionOpen($collapsible, object) {
        $panelHeaders = $collapsible.find('> li > .collapsible-header');
  
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
  
        if (object.parent().hasClass('active')) {
          object.siblings('.collapsible-body').stop(true, false).slideDown({
            duration: 350,
            easing: 'easeOutQuart',
            queue: false,
            complete: function complete() {
              $(this).css('height', '');
            }
          });
        } else {
          object.siblings('.collapsible-body').stop(true, false).slideUp({
            duration: 350,
            easing: 'easeOutQuart',
            queue: false,
            complete: function complete() {
              $(this).css('height', '');
            }
          });
        }
  
        $panelHeaders.not(object).removeClass('active').parent().removeClass('active');
        $panelHeaders.not(object).parent().children('.collapsible-body').stop(true, false).slideUp({
          duration: 350,
          easing: 'easeOutQuart',
          queue: false,
          complete: function complete() {
            $(this).css('height', '');
          }
        });
      }
  
      function expandableOpen(object) {
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
  
        if (object.parent().hasClass('active')) {
          object.siblings('.collapsible-body').stop(true, false).slideDown({
            duration: 350,
            easing: 'easeOutQuart',
            queue: false,
            complete: function complete() {
              $(this).css('height', '');
            }
          });
        } else {
          object.siblings('.collapsible-body').stop(true, false).slideUp({
            duration: 350,
            easing: 'easeOutQuart',
            queue: false,
            complete: function complete() {
              $(this).css('height', '');
            }
          });
        }
      }
  
      function isChildrenOfPanelHeader(object) {
        var panelHeader = getPanelHeader(object);
        return panelHeader.length > 0;
      }
  
      function getPanelHeader(object) {
        return object.closest('li > .collapsible-header');
      }
  
      return this.each(function () {
        var $this = $(this);
        var $panelHeaders = $(this).find('> li > .collapsible-header');
        var collapsibleType = $this.data('collapsible'); // Turn off any existing event handlers
  
        $this.off('click.collapse', '.collapsible-header');
        $panelHeaders.off('click.collapse');
  
        if (options.accordion || collapsibleType === 'accordion' || collapsibleType === undefined) {
          $panelHeaders = $this.find('> li > .collapsible-header');
          $panelHeaders.on('click.collapse', function (e) {
            var element = $(e.target);
  
            if (isChildrenOfPanelHeader(element)) {
              element = getPanelHeader(element);
            }
  
            element.toggleClass('active');
            accordionOpen($this, element);
          });
          accordionOpen($this, $panelHeaders.filter('.active').first());
        } else {
          $panelHeaders.each(function () {
            $(this).on('click.collapse', function (e) {
              var element = $(e.target);
  
              if (isChildrenOfPanelHeader(element)) {
                element = getPanelHeader(element);
              }
  
              element.toggleClass('active');
              expandableOpen(element);
            });
  
            if ($(this).hasClass('active')) {
              expandableOpen($(this));
            }
          });
        }
      });
    };
  
    $('.collapsible').collapsible();
  })(jQuery);
  "use strict";
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
  
  // eslint-disable-next-line no-unused-vars
  var MaterialSelectViewRenderer =
  /*#__PURE__*/
  function () {
    function MaterialSelectViewRenderer(view) {
      _classCallCheck(this, MaterialSelectViewRenderer);
  
      this.view = view;
    }
  
    _createClass(MaterialSelectViewRenderer, [{
      key: "destroy",
      value: function destroy() {
        var currentUuid = this.view.$nativeSelect.data('select-id');
        this.view.$nativeSelect.data('select-id', null).removeClass('initialized');
        this.view.$nativeSelect.parent().find('span.caret').remove();
        this.view.$nativeSelect.parent().find('input').remove();
        this.view.$nativeSelect.unwrap();
        $("ul#select-options-".concat(currentUuid)).remove();
      }
    }, {
      key: "render",
      value: function render() {
        this.setWrapperClasses();
        this.setMaterialSelectInitialValue();
        this.view.$nativeSelect.data('select-id', this.view.properties.id);
        this.view.$nativeSelect.before(this.view.$selectWrapper);
        this.appendDropdownIcon();
        this.appendMaterialSelect();
        this.appendMaterialOptionsList();
        this.appendNativeSelect();
        this.appendSelectLabel();
        this.appendCustomTemplateParts();
  
        if (this.shouldValidate) {
          this.appendValidationFeedbackElements();
        }
  
        if (this.isRequired) {
          this.enableValidation();
        }
  
        if (!this.isDisabled) {
          this.setMaterialOptionsListMaxHeight();
          this.view.dropdown = this.view.$materialSelect.dropdown({
            hover: false,
            closeOnClick: false,
            resetScroll: false
          });
        }
  
        if (this.shouldInheritTabindex) {
          this.view.$materialSelect.attr('tabindex', this.view.$nativeSelect.attr('tabindex'));
        }
  
        if (this.isDefaultMaterialInput) {
          this.view.$mainLabel.css('top', '-7px');
        }
  
        if (this.isCustomSelect) {
          this.view.$materialSelect.css({
            display: 'inline-block',
            width: '100%',
            height: 'calc(1.5em + .75rem + 2px)',
            padding: '.375rem 1.75rem .375rem .75rem',
            fontSize: '1rem',
            lineHeight: '1.5',
            backgroundColor: '#fff',
            border: '1px solid #ced4da'
          });
        }
  
        this.addAccessibilityAttributes();
        this.markInitialized();
      }
    }, {
      key: "setWrapperClasses",
      value: function setWrapperClasses() {
        if (this.isDefaultMaterialInput) {
          this.view.$selectWrapper.addClass(this.view.$nativeSelect.attr('class').split(' ').filter(function (el) {
            return el !== 'md-form';
          }).join(' ')).css({
            marginTop: '1.5rem',
            marginBottom: '1.5rem'
          });
        } else {
          this.view.$selectWrapper.addClass(this.view.$nativeSelect.attr('class'));
        }
      }
    }, {
      key: "setMaterialSelectInitialValue",
      value: function setMaterialSelectInitialValue() {
        if (!this.view.options.placeholder) {
          var sanitizedLabelHtml = this.view.$materialSelectInitialOption.replace(/"/g, '&quot;').replace(/  +/g, ' ').trim();
          this.view.$materialSelect.val(sanitizedLabelHtml);
        } else {
          this.view.$materialSelect.attr('placeholder', this.view.options.placeholder);
  
          if (!this.view.$nativeSelect.find('option[value=""][selected][disabled][data-mdb-placeholder]').length) {
            this.view.$nativeSelect.prepend('<option value="" selected disabled data-mdb-placeholder></option>');
          }
        }
      }
    }, {
      key: "appendDropdownIcon",
      value: function appendDropdownIcon() {
        if (this.isDisabled) {
          this.view.$dropdownIcon.addClass('disabled');
        }
  
        this.view.$selectWrapper.append(this.view.$dropdownIcon);
      }
    }, {
      key: "appendMaterialSelect",
      value: function appendMaterialSelect() {
        this.view.$selectWrapper.append(this.view.$materialSelect);
      }
    }, {
      key: "appendMaterialOptionsList",
      value: function appendMaterialOptionsList() {
        if (this.isSearchable) {
          this.appendSearchInputOption();
        }
  
        if (this.isEditable && this.isSearchable) {
          this.appendAddOptionBtn();
        }
  
        this.buildMaterialOptions();
  
        if (this.isMultiple) {
          this.appendToggleAllCheckbox();
        }
  
        this.view.$selectWrapper.append(this.view.$materialOptionsList);
      }
    }, {
      key: "appendNativeSelect",
      value: function appendNativeSelect() {
        this.view.$nativeSelect.appendTo(this.view.$selectWrapper);
      }
    }, {
      key: "appendSelectLabel",
      value: function appendSelectLabel() {
        if (this.view.$materialSelect.val() || this.view.options.placeholder) {
          this.view.$mainLabel.addClass('active');
        }
  
        this.view.$mainLabel[this.isDisabled ? 'addClass' : 'removeClass']('disabled');
        this.view.$mainLabel.appendTo(this.view.$selectWrapper);
      }
    }, {
      key: "appendCustomTemplateParts",
      value: function appendCustomTemplateParts() {
        var _this = this;
  
        this.view.$customTemplateParts.each(function (_, element) {
          var $templatePart = $(element);
          $templatePart.appendTo(_this.view.$materialOptionsList).wrap('<li></li>');
        });
        this.view.$btnSave.appendTo(this.view.$materialOptionsList); // @Depreciated
      }
    }, {
      key: "appendValidationFeedbackElements",
      value: function appendValidationFeedbackElements() {
        this.view.$validFeedback.insertAfter(this.view.$selectWrapper);
        this.view.$invalidFeedback.insertAfter(this.view.$selectWrapper);
      }
    }, {
      key: "enableValidation",
      value: function enableValidation() {
        this.view.$nativeSelect.css({
          position: 'absolute',
          top: '1rem',
          left: '0',
          height: '0',
          width: '0',
          opacity: '0',
          padding: '0',
          'pointer-events': 'none'
        });
  
        if (this.view.$nativeSelect.attr('style').indexOf('inline!important') === -1) {
          this.view.$nativeSelect.attr('style', "".concat(this.view.$nativeSelect.attr('style'), " display: inline!important;"));
        }
  
        this.view.$nativeSelect.attr('tabindex', -1);
        this.view.$nativeSelect.data('inherit-tabindex', false);
      }
    }, {
      key: "setMaterialOptionsListMaxHeight",
      value: function setMaterialOptionsListMaxHeight() {
        var multiplier = this.view.options.visibleOptions;
        var additionalHeight = 0;
        this.view.$materialOptionsList.show();
        var $materialOptions = this.view.$materialOptionsList.find('li').not('.disabled');
        var optionHeight = $materialOptions.first().height();
        var optionsCount = $materialOptions.length;
  
        if (this.isSearchable) {
          additionalHeight += this.view.$searchInput.height();
        }
  
        if (this.isMultiple) {
          additionalHeight += this.view.$toggleAll.height();
        }
  
        this.view.$materialOptionsList.hide();
  
        if (multiplier >= 0 && multiplier < optionsCount) {
          var maxHeight = optionHeight * multiplier + additionalHeight;
          this.view.$materialOptionsList.css('max-height', maxHeight);
          this.view.$materialSelect.data('maxheight', maxHeight);
        }
      }
    }, {
      key: "addAccessibilityAttributes",
      value: function addAccessibilityAttributes() {
        this.view.$materialSelect.attr({
          role: this.isSearchable ? 'combobox' : 'listbox',
          'aria-multiselectable': this.isMultiple,
          'aria-disabled': this.isDisabled,
          'aria-required': this.isRequired,
          'aria-labelledby': this.view.$mainLabel.attr('id'),
          'aria-haspopup': true,
          'aria-expanded': false
        });
  
        if (this.view.$searchInput) {
          this.view.$searchInput.attr('role', 'searchbox');
        }
  
        this.view.$materialOptionsList.find('li').each(function () {
          var $this = $(this);
          $this.attr({
            role: 'option',
            'aria-selected': $this.hasClass('active'),
            'aria-disabled': $this.hasClass('disabled')
          });
        });
      }
    }, {
      key: "markInitialized",
      value: function markInitialized() {
        this.view.$nativeSelect.addClass('initialized');
      }
    }, {
      key: "appendSearchInputOption",
      value: function appendSearchInputOption() {
        var placeholder = this.view.$nativeSelect.attr('searchable');
        var divClass = this.isDefaultMaterialInput ? '' : 'md-form';
        var inputClass = this.isDefaultMaterialInput ? 'select-default mb-2' : '';
        this.view.$searchInput = $("<span class=\"search-wrap ml-2\"><div class=\"".concat(divClass, " mt-0\"><input type=\"text\" class=\"search w-100 d-block ").concat(inputClass, "\" tabindex=\"-1\" placeholder=\"").concat(placeholder, "\"></div></span>"));
        this.view.$materialOptionsList.append(this.view.$searchInput);
        this.view.$searchInput.on('click', function (e) {
          return e.stopPropagation();
        });
      }
    }, {
      key: "appendAddOptionBtn",
      value: function appendAddOptionBtn() {
        this.view.$searchInput.append(this.view.$addOptionBtn);
        this.view.$addOptionBtn.on('click', this.addNewOption.bind(this));
      }
    }, {
      key: "buildMaterialOptions",
      value: function buildMaterialOptions() {
        var _this2 = this;
  
        this.view.$nativeSelectChildren.each(function (index, option) {
          var $this = $(option);
  
          if ($this.is('option')) {
            _this2.buildSingleOption($this, _this2.isMultiple ? 'multiple' : '');
          } else if ($this.is('optgroup')) {
            var $materialOptgroup = $("<li class=\"optgroup\"><span>".concat($this.attr('label'), "</span></li>"));
  
            _this2.view.$materialOptionsList.append($materialOptgroup);
  
            var $optgroupOptions = $this.children('option');
            $optgroupOptions.each(function (index, optgroupOption) {
              _this2.buildSingleOption($(optgroupOption), 'optgroup-option');
            });
          }
        });
      }
    }, {
      key: "appendToggleAllCheckbox",
      value: function appendToggleAllCheckbox() {
        var firstOption = this.view.$materialOptionsList.find('li').first();
  
        if (firstOption.hasClass('disabled') && firstOption.find('input').prop('disabled')) {
          firstOption.after(this.view.$toggleAll);
        } else {
          this.view.$materialOptionsList.find('li').first().before(this.view.$toggleAll);
        }
      }
    }, {
      key: "addNewOption",
      value: function addNewOption() {
        var val = this.view.$searchInput.find('input').val();
        var $newOption = $("<option value=\"".concat(val.toLowerCase(), "\" selected>").concat(val, "</option>")).prop('selected', true);
  
        if (!this.isMultiple) {
          this.view.$nativeSelectChildren.each(function (index, option) {
            $(option).attr('selected', false);
          });
        }
  
        this.view.$nativeSelect.append($newOption);
      }
    }, {
      key: "buildSingleOption",
      value: function buildSingleOption($nativeSelectChild, type) {
        var disabled = $nativeSelectChild.is(':disabled') ? 'disabled' : '';
        var active = $nativeSelectChild.is(':selected') ? 'active' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option' : '';
        var iconUrl = $nativeSelectChild.data('icon');
        var fas = $nativeSelectChild.data('fas') ? "<i class=\"fa-pull-right m-2 fas fa-".concat($nativeSelectChild.data('fas'), " ").concat(this.view.options.fasClasses, "\"></i> ") : '';
        var far = $nativeSelectChild.data('far') ? "<i class=\"fa-pull-right m-2 far fa-".concat($nativeSelectChild.data('far'), " ").concat(this.view.options.farClasses, "\"></i> ") : '';
        var fab = $nativeSelectChild.data('fab') ? "<i class=\"fa-pull-right m-2 fab fa-".concat($nativeSelectChild.data('fab'), " ").concat(this.view.options.fabClasses, "\"></i> ") : '';
        var classes = $nativeSelectChild.attr('class');
        var iconHtml = iconUrl ? "<img alt=\"\" src=\"".concat(iconUrl, "\" class=\"").concat(classes, "\">") : '';
        var checkboxHtml = this.isMultiple ? "<input type=\"checkbox\" class=\"form-check-input\" ".concat(disabled, "/><label></label>") : '';
        this.view.$materialOptionsList.append($("<li class=\"".concat(disabled, " ").concat(active, " ").concat(optgroupClass, " ").concat(this.view.options.copyClassesOption ? classes : '', " \">").concat(iconHtml, "<span class=\"filtrable\">").concat(checkboxHtml, " ").concat($nativeSelectChild.html(), " ").concat(fas, " ").concat(far, " ").concat(fab, "</span></li>")));
      }
    }, {
      key: "shouldValidate",
      get: function get() {
        return this.view.options.validate;
      }
    }, {
      key: "shouldInheritTabindex",
      get: function get() {
        return this.view.$nativeSelect.data('inherit-tabindex') !== false;
      }
    }, {
      key: "isMultiple",
      get: function get() {
        return this.view.isMultiple;
      }
    }, {
      key: "isSearchable",
      get: function get() {
        return this.view.isSearchable;
      }
    }, {
      key: "isRequired",
      get: function get() {
        return this.view.isRequired;
      }
    }, {
      key: "isEditable",
      get: function get() {
        return this.view.isEditable;
      }
    }, {
      key: "isDisabled",
      get: function get() {
        return this.view.isDisabled;
      }
    }, {
      key: "isDefaultMaterialInput",
      get: function get() {
        return this.view.options.defaultMaterialInput;
      }
    }, {
      key: "isCustomSelect",
      get: function get() {
        return this.view.$materialSelect.hasClass('custom-select') && this.view.$materialSelect.hasClass('select-dropdown');
      }
    }]);
  
    return MaterialSelectViewRenderer;
  }();
  "use strict";
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
  
  // eslint-disable-next-line no-unused-vars
  var MaterialSelectView =
  /*#__PURE__*/
  function () {
    // eslint-disable-next-line object-curly-newline
    function MaterialSelectView($nativeSelect, _ref) {
      var {
        options: options,
        properties: {
          id: id
        }
      } = _ref;
  
      _classCallCheck(this, MaterialSelectView);
  
      this.properties = {
        id: id,
        isMultiple: Boolean($nativeSelect.attr('multiple')),
        isSearchable: Boolean($nativeSelect.attr('searchable')),
        isRequired: Boolean($nativeSelect.attr('required')),
        isEditable: Boolean($nativeSelect.attr('editable'))
      };
      this.options = this._copyOptions(options);
      this.$nativeSelect = $nativeSelect;
      this.$selectWrapper = $('<div class="select-wrapper"></div>');
      this.$materialOptionsList = $("<ul id=\"select-options-".concat(this.properties.id, "\" class=\"dropdown-content select-dropdown w-100 ").concat(this.properties.isMultiple ? 'multiple-select-dropdown' : '', "\"></ul>"));
      this.$materialSelectInitialOption = $nativeSelect.find('option:selected').text() || $nativeSelect.find('option:first').text() || '';
      this.$nativeSelectChildren = this.$nativeSelect.children('option, optgroup');
      this.$materialSelect = $("<input type=\"text\" class=\"".concat(this.options.defaultMaterialInput ? 'browser-default custom-select multi-bs-select select-dropdown form-control' : 'select-dropdown form-control', "\" ").concat(!this.options.validate && 'readonly="true"', " required=\"").concat(this.options.validate ? 'true' : 'false', "\" ").concat(this.$nativeSelect.is(' :disabled') ? 'disabled' : '', " data-activates=\"select-options-").concat(this.properties.id, "\" value=\"\"/>"));
      this.$dropdownIcon = this.options.defaultMaterialInput ? '' : $('<span class="caret">&#9660;</span>');
      this.$searchInput = null;
      this.$noSearchResultsInfo = $("<li><span><i>".concat(this.options.labels.noSearchResults, "</i></span></li>"));
      this.$toggleAll = $("<li class=\"select-toggle-all\"><span><input type=\"checkbox\" class=\"form-check-input\"><label>".concat(this.options.labels.selectAll, "</label></span></li>"));
      this.$addOptionBtn = $('<i class="select-add-option fas fa-plus"></i>');
      this.$mainLabel = this._jQueryFallback(this.$nativeSelect.next('label.mdb-main-label'), $("label[for='".concat(this.properties.id, "']")));
      this.$customTemplateParts = this._jQueryFallback(this.$nativeSelect.nextUntil('select', '.mdb-select-template-part'), $("[data-mdb-select-template-part-for='".concat(this.properties.id, "']")));
      this.$btnSave = this.$nativeSelect.nextUntil('select', '.btn-save'); // @Depreciated
  
      this.$validFeedback = $("<div class=\"valid-feedback\">".concat(this.options.labels.validFeedback, "</div>"));
      this.$invalidFeedback = $("<div class=\"invalid-feedback\">".concat(this.options.labels.invalidFeedback, "</div>"));
      this.keyCodes = {
        tab: 9,
        esc: 27,
        enter: 13,
        arrowUp: 38,
        arrowDown: 40
      }; // eslint-disable-next-line no-undef
  
      this.renderer = new MaterialSelectViewRenderer(this);
      this.dropdown = null;
    }
  
    _createClass(MaterialSelectView, [{
      key: "destroy",
      value: function destroy() {
        this.renderer.destroy();
      }
    }, {
      key: "render",
      value: function render() {
        this.renderer.render();
      }
    }, {
      key: "selectPreselectedOptions",
      value: function selectPreselectedOptions(handler) {
        var _this = this;
  
        if (this.isMultiple) {
          this.$nativeSelect.find('option:selected:not(:disabled)').each(function (i, element) {
            var index = element.index;
  
            _this.$materialOptionsList.find('li:not(.optgroup):not(.select-toggle-all)').eq(index).addClass('selected active').find(':checkbox').prop('checked', true);
  
            handler(index);
          });
        } else {
          var $preselectedOption = this.$nativeSelect.find('option:selected').first();
          var indexOfPreselectedOption = this.$nativeSelect.find('option').index($preselectedOption.get(0));
  
          if ($preselectedOption.get(0) && $preselectedOption.attr('disabled') !== 'disabled') {
            handler(indexOfPreselectedOption);
          }
        }
      }
    }, {
      key: "bindMaterialSelectFocus",
      value: function bindMaterialSelectFocus() {
        var _this2 = this;
  
        this.$materialSelect.on('focus', function (e) {
          var $this = $(e.target);
  
          if ($('ul.select-dropdown').not(_this2.$materialOptionsList.get(0)).is(':visible')) {
            $('input.select-dropdown').trigger('close');
          }
  
          _this2.$mainLabel.addClass('active');
  
          if (!_this2.$materialOptionsList.is(':visible')) {
            $this.trigger('open', ['focus']);
            var label = $this.val();
  
            var $selectedOption = _this2.$materialOptionsList.find('li').filter(function () {
              return $(this).text().toLowerCase() === label.toLowerCase();
            }).get(0);
  
            _this2._selectSingleOption($selectedOption);
  
            _this2._updateDropdownScrollTop();
          }
  
          if (!_this2.isMultiple) {
            _this2.$mainLabel.addClass('active');
          }
        });
      }
    }, {
      key: "bindMaterialSelectClick",
      value: function bindMaterialSelectClick() {
        var _this3 = this;
  
        this.$materialSelect.on('mousedown', function (e) {
          if (e.which === 3) {
            e.preventDefault();
          }
        });
        this.$materialSelect.on('click', function (e) {
          _this3.$mainLabel.addClass('active');
  
          e.stopPropagation();
        });
      }
    }, {
      key: "bindMaterialSelectBlur",
      value: function bindMaterialSelectBlur() {
        var _this4 = this;
  
        this.$materialSelect.on('blur', function (e) {
          var $this = $(e);
  
          if (!_this4.isMultiple && !_this4.isSearchable) {
            $this.trigger('close');
          }
  
          _this4.$materialOptionsList.find('li.selected').removeClass('selected');
        });
      }
    }, {
      key: "bindMaterialSelectKeydown",
      value: function bindMaterialSelectKeydown() {
        var _this5 = this;
  
        this.$materialSelect.on('keydown', function (e) {
          var $this = $(e.target);
          var isTab = e.which === _this5.keyCodes.tab;
          var isEsc = e.which === _this5.keyCodes.esc;
          var isEnter = e.which === _this5.keyCodes.enter;
          var isEnterWithShift = isEnter && e.shiftKey;
          var isArrowUp = e.which === _this5.keyCodes.arrowUp;
          var isArrowDown = e.which === _this5.keyCodes.arrowDown;
  
          var isMaterialSelectVisible = _this5.$materialOptionsList.is(':visible');
  
          if (isTab) {
            _this5._handleTabKey($this);
          /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
            return;
          } else if (isArrowDown && !isMaterialSelectVisible) {
            $this.trigger('open');
            return;
          } else if (isEnter && !isMaterialSelectVisible) {
            return;
          }
  
          e.preventDefault();
          /* eslint-disable consistent-return */
          /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  
          switch (true) {
            case isEnterWithShift:
              return _this5._handleEnterWithShiftKey($this);
  
            case isEnter:
              return _this5._handleEnterKey($this);
  
            case isArrowDown || isArrowUp:
              return _this5._handleArrowUpDownKey(e.which);
  
            case isEsc:
              return _this5._handleEscKey($this);
  
            default:
              return _this5._handleLetterKey(e);
          }
          /* eslint-disable consistent-return */
  
        });
      }
    }, {
      key: "bindMaterialSelectDropdownToggle",
      value: function bindMaterialSelectDropdownToggle() {
        var _this6 = this;
  
        this.$materialSelect.on('open', function () {
          return _this6.$materialSelect.attr('aria-expanded', 'true');
        });
        this.$materialSelect.on('close', function () {
          return _this6.$materialSelect.attr('aria-expanded', 'false');
        });
      }
    }, {
      key: "bindToggleAllClick",
      value: function bindToggleAllClick(handler) {
        var _this7 = this;
  
        this.$toggleAll.on('click', function (e) {
          var checkbox = $(_this7.$toggleAll).find('input[type="checkbox"]').first();
          var currentState = Boolean($(checkbox).prop('checked'));
          var isToggleChecked = !currentState;
          $(checkbox).prop('checked', !currentState);
  
          _this7.$materialOptionsList.find('li:not(.optgroup):not(.select-toggle-all)').each(function (materialOptionIndex, materialOption) {
            var $materialOption = $(materialOption);
            var $optionCheckbox = $materialOption.find('input[type="checkbox"]');
            $materialOption.attr('aria-selected', isToggleChecked);
  
            if (isToggleChecked && $optionCheckbox.is(':checked') || !isToggleChecked && !$optionCheckbox.is(':checked') || $(materialOption).is(':hidden') || $(materialOption).is('.disabled')) {
              return;
            }
  
            $optionCheckbox.prop('checked', isToggleChecked);
  
            _this7.$nativeSelect.find('option').eq(materialOptionIndex).prop('selected', isToggleChecked);
  
            $materialOption.toggleClass('active');
  
            _this7._selectOption(materialOption);
  
            handler(materialOptionIndex);
          });
  
          _this7.$nativeSelect.data('stop-refresh', true);
  
          _this7._triggerChangeOnNativeSelect();
  
          _this7.$nativeSelect.removeData('stop-refresh');
  
          e.stopPropagation();
        });
      }
    }, {
      key: "bindMaterialOptionMousedown",
      value: function bindMaterialOptionMousedown() {
        var _this8 = this;
  
        this.$materialOptionsList.on('mousedown', function (e) {
          var option = e.target;
          var inModal = $('.modal-content').find(_this8.$materialOptionsList).length;
  
          if (inModal && option.scrollHeight > option.offsetHeight) {
            e.preventDefault();
          }
        });
      }
    }, {
      key: "bindMaterialOptionClick",
      value: function bindMaterialOptionClick(handler) {
        var _this9 = this;
  
        this.$materialOptionsList.find('li:not(.optgroup)').not(this.$toggleAll).each(function (materialOptionIndex, materialOption) {
          $(materialOption).on('click', function (e) {
            e.stopPropagation();
            var $this = $(materialOption);
  
            if ($this.hasClass('disabled') || $this.hasClass('optgroup')) {
              return;
            }
  
            var selected = true;
  
            if (_this9.isMultiple) {
              $this.find('input[type="checkbox"]').prop('checked', function (index, oldPropertyValue) {
                return !oldPropertyValue;
              });
              var hasOptgroup = Boolean(_this9.$nativeSelect.find('optgroup').length);
              var thisIndex = _this9._isToggleAllPresent() ? $this.index() - 1 : $this.index();
              /* eslint-disable max-statements-per-line */
  
              switch (true) {
                case _this9.isSearchable && hasOptgroup:
                  selected = handler(thisIndex - $this.prevAll('.optgroup').length - 1);
                  break;
  
                case _this9.isSearchable:
                  selected = handler(thisIndex - 1);
                  break;
  
                case hasOptgroup:
                  selected = handler(thisIndex - $this.prevAll('.optgroup').length);
                  break;
  
                default:
                  selected = handler(thisIndex);
                  break;
              }
              /* eslint-disable max-statements-per-line */
  
  
              if (_this9._isToggleAllPresent()) {
                _this9._updateToggleAllOption();
              }
  
              _this9.$materialSelect.trigger('focus');
            } else {
              _this9.$materialOptionsList.find('li').removeClass('active').attr('aria-selected', 'false');
  
              _this9.$materialSelect.val($this.text().replace(/  +/g, ' ').trim());
  
              _this9.$materialSelect.trigger('close');
            }
  
            $this.toggleClass('active');
            var ariaSelected = $this.attr('aria-selected');
            $this.attr('aria-selected', ariaSelected === 'true' ? 'false' : 'true');
  
            _this9._selectSingleOption($this);
  
            _this9.$nativeSelect.data('stop-refresh', true);
  
            _this9.$nativeSelect.find('option').eq(materialOptionIndex).prop('selected', selected);
  
            _this9.$nativeSelect.removeData('stop-refresh');
  
            _this9._triggerChangeOnNativeSelect();
  
            if (_this9.$materialSelect.val()) {
              _this9.$mainLabel.addClass('active');
            }
  
            if ($this.hasClass('li-added')) {
              _this9.renderer.buildSingleOption($this, '');
            }
          });
        });
      }
    }, {
      key: "bindSingleMaterialOptionClick",
      value: function bindSingleMaterialOptionClick() {
        var _this10 = this;
  
        this.$materialOptionsList.find('li').on('click', function () {
          _this10.$materialSelect.trigger('close');
        });
      }
    }, {
      key: "bindSearchInputKeyup",
      value: function bindSearchInputKeyup() {
        var _this11 = this;
  
        this.$searchInput.find('.search').on('keyup', function (e) {
          var $this = $(e.target);
          var isTab = e.which === _this11.keyCodes.tab;
          var isEsc = e.which === _this11.keyCodes.esc;
          var isEnter = e.which === _this11.keyCodes.enter;
          var isEnterWithShift = isEnter && e.shiftKey;
          var isArrowUp = e.which === _this11.keyCodes.arrowUp;
          var isArrowDown = e.which === _this11.keyCodes.arrowDown;
  
          if (isArrowDown || isTab || isEsc || isArrowUp) {
            _this11.$materialSelect.focus();
  
            _this11._handleArrowUpDownKey(e.which);
  
            return;
          }
  
          var $ul = $this.closest('ul');
          var searchValue = $this.val();
          var $options = $ul.find('li span.filtrable');
          var isOptionInList = false;
          $options.each(function () {
            var $option = $(this);
  
            if (typeof this.outerHTML === 'string') {
              var liValue = this.textContent.toLowerCase();
  
              if (liValue.includes(searchValue.toLowerCase())) {
                $option.show().parent().show();
              } else {
                $option.hide().parent().hide();
              }
  
              if (liValue.trim() === searchValue.toLowerCase()) {
                isOptionInList = true;
              }
            }
          });
  
          if (isEnter) {
            if (_this11.isEditable && !isOptionInList) {
              _this11.renderer.addNewOption();
  
              return;
            }
  
            if (isEnterWithShift) {
              _this11._handleEnterWithShiftKey($this);
            }
  
            _this11.$materialSelect.trigger('open');
  
            return;
          }
  
          _this11.$addOptionBtn[searchValue && _this11.isEditable && !isOptionInList ? 'show' : 'hide']();
  
          var anyOptionMatch = $options.filter(function (_, e) {
            return $(e).is(':visible') && !$(e).parent().hasClass('disabled');
          }).length !== 0;
  
          if (!anyOptionMatch) {
            _this11.$toggleAll.hide();
  
            _this11.$materialOptionsList.append(_this11.$noSearchResultsInfo);
          } else {
            _this11.$toggleAll.show();
  
            _this11.$materialOptionsList.find(_this11.$noSearchResultsInfo).remove();
  
            _this11._updateToggleAllOption();
          }
  
          _this11.dropdown.updatePosition(_this11.$materialSelect, _this11.$materialOptionsList);
        });
      }
    }, {
      key: "bindHtmlClick",
      value: function bindHtmlClick() {
        var _this12 = this;
  
        $('html').on('click', function (e) {
          if (!$(e.target).closest("#select-options-".concat(_this12.properties.id)).length && !$(e.target).hasClass('mdb-select') && $("#select-options-".concat(_this12.properties.id)).hasClass('active')) {
            _this12.$materialSelect.trigger('close');
  
            if (!_this12.$materialSelect.val() && !_this12.options.placeholder) {
              _this12.$mainLabel.removeClass('active');
            }
          }
  
          if (_this12.isSearchable && _this12.$searchInput !== null && _this12.$materialOptionsList.hasClass('active')) {
            _this12.$materialOptionsList.find('.search-wrap input.search').focus();
          }
        });
      }
    }, {
      key: "bindMobileDevicesMousedown",
      value: function bindMobileDevicesMousedown() {
        $('select').siblings('input.select-dropdown', 'input.multi-bs-select').on('mousedown', function (e) {
          if (MaterialSelectView.isMobileDevice && (e.clientX >= e.target.clientWidth || e.clientY >= e.target.clientHeight)) {
            e.preventDefault();
          }
        });
      }
    }, {
      key: "bindSaveBtnClick",
      value: function bindSaveBtnClick() {
        var _this13 = this;
  
        // @Depreciated
        this.$btnSave.on('click', function () {
          _this13.$materialSelect.trigger('close');
        });
      }
    }, {
      key: "_isToggleAllPresent",
      value: function _isToggleAllPresent() {
        return this.$materialOptionsList.find(this.$toggleAll).length;
      }
    }, {
      key: "_updateToggleAllOption",
      value: function _updateToggleAllOption() {
        var $allOptionsButToggleAll = this.$materialOptionsList.find('li').not('.select-toggle-all, .disabled, :hidden').find('[type=checkbox]');
        var $checkedOptionsButToggleAll = $allOptionsButToggleAll.filter(':checked');
        var isToggleAllChecked = this.$toggleAll.find('[type=checkbox]').is(':checked');
  
        if ($checkedOptionsButToggleAll.length === $allOptionsButToggleAll.length && !isToggleAllChecked) {
          this.$toggleAll.find('[type=checkbox]').prop('checked', true);
        } else if ($checkedOptionsButToggleAll.length < $allOptionsButToggleAll.length && isToggleAllChecked) {
          this.$toggleAll.find('[type=checkbox]').prop('checked', false);
        }
      }
    }, {
      key: "_handleTabKey",
      value: function _handleTabKey($materialSelect) {
        this._handleEscKey($materialSelect);
      }
    }, {
      key: "_handleEnterWithShiftKey",
      value: function _handleEnterWithShiftKey($materialSelect) {
        if (!this.isMultiple) {
          this._handleEnterKey($materialSelect);
        } else {
          this.$toggleAll.trigger('click');
        }
      }
    }, {
      key: "_handleEnterKey",
      value: function _handleEnterKey($materialSelect) {
        var $activeOption = this.$materialOptionsList.find('li.selected:not(.disabled)');
        $activeOption.trigger('click').addClass('active');
  
        if (!this.isMultiple) {
          $materialSelect.trigger('close');
        }
      }
    }, {
      key: "_handleArrowUpDownKey",
      value: function _handleArrowUpDownKey(keyCode) {
        var _this14 = this;
  
        var $availableOptions = this.$materialOptionsList.find('li:visible').not('.disabled, .select-toggle-all');
        var $firstOption = $availableOptions.first();
        var $lastOption = $availableOptions.last();
        var anySelected = this.$materialOptionsList.find('li.selected').length > 0;
        var $matchedMaterialOption = null;
        var $activeOption = null;
        var isArrowUp = keyCode === this.keyCodes.arrowUp;
  
        if (isArrowUp) {
          var $currentOption = anySelected ? this.$materialOptionsList.find('li.selected').first() : $lastOption;
          var $prevOption = $currentOption.prev('li:visible:not(.disabled, .select-toggle-all)');
          $activeOption = $prevOption;
          $availableOptions.each(function (key, el) {
            if ($(el).hasClass(_this14.options.keyboardActiveClass)) {
              $prevOption = $availableOptions.eq(key - 1);
              $activeOption = $availableOptions.eq(key);
            }
          });
          $matchedMaterialOption = $currentOption.is($firstOption) || !anySelected ? $currentOption : $prevOption;
        } else {
          var _$currentOption = anySelected ? this.$materialOptionsList.find('li.selected').first() : $firstOption;
  
          var $nextOption = _$currentOption.next('li:visible:not(.disabled, .select-toggle-all)');
  
          $activeOption = $nextOption;
          $availableOptions.each(function (key, el) {
            if ($(el).hasClass(_this14.options.keyboardActiveClass)) {
              $nextOption = $availableOptions.eq(key + 1);
              $activeOption = $availableOptions.eq(key);
            }
          });
          $matchedMaterialOption = _$currentOption.is($lastOption) || !anySelected ? _$currentOption : $nextOption;
        }
  
        this._selectSingleOption($matchedMaterialOption);
  
        this._removeKeyboardActiveClass();
  
        if (!$matchedMaterialOption.find('input').is(':checked')) {
          $matchedMaterialOption.removeClass(this.options.keyboardActiveClass);
        }
  
        if (!$activeOption.hasClass('selected') && !$activeOption.find('input').is(':checked') && this.isMultiple) {
          $activeOption.removeClass('active', this.options.keyboardActiveClass);
        }
  
        $matchedMaterialOption.addClass(this.options.keyboardActiveClass);
  
        if ($matchedMaterialOption.position()) {
          this.$materialOptionsList.scrollTop(this.$materialOptionsList.scrollTop() + $matchedMaterialOption.position().top);
        }
      }
    }, {
      key: "_handleEscKey",
      value: function _handleEscKey($materialSelect) {
        this._removeKeyboardActiveClass();
  
        $materialSelect.trigger('close');
      }
    }, {
      key: "_handleLetterKey",
      value: function _handleLetterKey(e) {
        var _this15 = this;
  
        this._removeKeyboardActiveClass();
  
        if (this.isSearchable) {
          var isLetter = e.which > 46 && e.which < 91;
          var isNumber = e.which > 93 && e.which < 106;
          var isBackspace = e.which === 8;
  
          if (isLetter || isNumber) {
            this.$searchInput.find('input').val(e.key).focus();
          }
  
          if (isBackspace) {
            this.$searchInput.find('input').val('').focus();
          }
        } else {
          var filterQueryString = '';
          var letter = String.fromCharCode(e.which).toLowerCase();
          var nonLetters = Object.keys(this.keyCodes).map(function (key) {
            return _this15.keyCodes[key];
          });
          var isLetterSearchable = letter && nonLetters.indexOf(e.which) === -1;
  
          if (isLetterSearchable) {
            filterQueryString += letter;
            var $matchedMaterialOption = this.$materialOptionsList.find('li').filter(function (index, element) {
              return $(element).text().toLowerCase().includes(filterQueryString);
            }).first();
  
            if (!this.isMultiple) {
              this.$materialOptionsList.find('li').removeClass('active');
            }
  
            $matchedMaterialOption.addClass('active');
  
            this._selectSingleOption($matchedMaterialOption);
          }
        }
      }
    }, {
      key: "_removeKeyboardActiveClass",
      value: function _removeKeyboardActiveClass() {
        this.$materialOptionsList.find('li').removeClass(this.options.keyboardActiveClass);
      }
    }, {
      key: "_triggerChangeOnNativeSelect",
      value: function _triggerChangeOnNativeSelect() {
        var keyboardEvt = new KeyboardEvent('change', {
          bubbles: true,
          cancelable: true
        });
        this.$nativeSelect.get(0).dispatchEvent(keyboardEvt);
      }
    }, {
      key: "_selectSingleOption",
      value: function _selectSingleOption(newOption) {
        this.$materialOptionsList.find('li.selected').removeClass('selected');
  
        this._selectOption(newOption);
      }
    }, {
      key: "_updateDropdownScrollTop",
      value: function _updateDropdownScrollTop() {
        var $preselected = this.$materialOptionsList.find('li.active').first();
  
        if ($preselected.length) {
          this.$materialOptionsList.scrollTo($preselected);
        } else {
          this.$materialOptionsList.scrollTop(0);
        }
      }
    }, {
      key: "_selectOption",
      value: function _selectOption(newOption) {
        var option = $(newOption);
        option.addClass('selected');
      }
    }, {
      key: "_copyOptions",
      value: function _copyOptions(options) {
        return $.extend({}, options);
      }
    }, {
      key: "_jQueryFallback",
      value: function _jQueryFallback() {
        var $lastElem = null;
  
        for (var i = 0; i < arguments.length; i++) {
          $lastElem = i < 0 || arguments.length <= i ? undefined : arguments[i];
  
          if ($lastElem.length) {
            return $lastElem;
          }
        }
  
        return $lastElem;
      }
    }, {
      key: "isMultiple",
      get: function get() {
        return this.properties.isMultiple;
      }
    }, {
      key: "isSearchable",
      get: function get() {
        return this.properties.isSearchable;
      }
    }, {
      key: "isRequired",
      get: function get() {
        return this.properties.isRequired;
      }
    }, {
      key: "isEditable",
      get: function get() {
        return this.properties.isEditable;
      }
    }, {
      key: "isDisabled",
      get: function get() {
        return this.$nativeSelect.is(':disabled');
      }
    }], [{
      key: "isMobileDevice",
      get: function get() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }
    }]);
  
    return MaterialSelectView;
  }();
  "use strict";
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
  
  jQuery(function ($) {
    var MaterialSelect =
    /*#__PURE__*/
    function () {
      function MaterialSelect($nativeSelect) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  
        _classCallCheck(this, MaterialSelect);
  
        this.options = {
          destroy: this.fallback().or(options.destroy).or(false).value(),
          validate: this.fallback().or($nativeSelect.attr('data-validate')).or(options.validate).or(false).value(),
          selectId: this.fallback().or($nativeSelect.attr('data-native-id')).or(options.selectId).or(null).value(),
          defaultMaterialInput: this.fallback().or($nativeSelect.attr('data-default-material-input')).or(options.defaultMaterialInput).or(false).value(),
          fasClasses: this.fallback().or($nativeSelect.attr('data-fas-classes')).or(options.fasClasses).or('').value(),
          farClasses: this.fallback().or($nativeSelect.attr('data-far-classes')).or(options.farClasses).or('').value(),
          fabClasses: this.fallback().or($nativeSelect.attr('data-fab-classes')).or(options.fabClasses).or('').value(),
          copyClassesOption: this.fallback().or($nativeSelect.attr('data-copy-classes-option')).or(options.copyClassesOption).or(false).value(),
          labels: {
            selectAll: this.fallback().or($nativeSelect.attr('data-label-select-all')).or((options.labels || {}).selectAll).or('Select all').value(),
            optionsSelected: this.fallback().or($nativeSelect.attr('data-label-options-selected')).or((options.labels || {}).optionsSelected).or('options selected').value(),
            validFeedback: this.fallback().or($nativeSelect.attr('data-label-valid-feedback')).or((options.labels || {}).validFeedback).or('Ok').value(),
            invalidFeedback: this.fallback().or($nativeSelect.attr('data-label-invalid-feedback')).or((options.labels || {}).invalidFeedback).or('Incorrect value').value(),
            noSearchResults: this.fallback().or($nativeSelect.attr('data-label-no-search-results')).or((options.labels || {}).noSearchResults).or('No results').value()
          },
          keyboardActiveClass: this.fallback().or($nativeSelect.attr('data-keyboard-active-class')).or(options.keyboardActiveClass).or('heavy-rain-gradient').value(),
          placeholder: this.fallback().or($nativeSelect.attr('data-placeholder')).or(options.placeholder).or(null).value(),
          visibleOptions: this.fallback().or($nativeSelect.attr('data-visible-options')).or(options.visibleOptions).or(5).value(),
          maxSelectedOptions: this.fallback().or($nativeSelect.attr('data-max-selected-options')).or(options.maxSelectedOptions).or(5).value()
        };
        this.uuid = $nativeSelect.attr('id') || this.options.selectId || this._randomUUID(); // eslint-disable-next-line no-undef
  
        this.view = new MaterialSelectView($nativeSelect, {
          options: this.options,
          properties: {
            id: this.uuid
          }
        });
        this.selectedOptionsIndexes = []; // jQuery indexes; `.eq()` is operating on these
  
        MaterialSelect.mutationObservers = [];
      }
  
      _createClass(MaterialSelect, [{
        key: "init",
        value: function init() {
          var _this = this;
  
          if (this.options.destroy) {
            this.view.destroy();
            return;
          }
  
          if (this.isInitialized) {
            this.view.destroy();
          }
  
          this.view.render();
          this.view.selectPreselectedOptions(function (optionIndex) {
            return _this._toggleSelectedValue(optionIndex);
          });
          this.bindEvents();
        }
      }, {
        key: "bindEvents",
        value: function bindEvents() {
          var _this2 = this;
  
          this.bindMutationObserverChange();
          this.view.bindMaterialSelectFocus();
          this.view.bindMaterialSelectClick();
          this.view.bindMaterialSelectBlur();
          this.view.bindMaterialSelectKeydown();
          this.view.bindMaterialSelectDropdownToggle();
          this.view.bindToggleAllClick(function (materialOptionIndex) {
            return _this2._toggleSelectedValue(materialOptionIndex);
          });
          this.view.bindMaterialOptionMousedown();
          this.view.bindMaterialOptionClick(function (optionIndex) {
            return _this2._toggleSelectedValue(optionIndex);
          });
  
          if (!this.view.isMultiple && this.view.isSearchable) {
            this.view.bindSingleMaterialOptionClick();
          }
  
          if (this.view.isSearchable) {
            this.view.bindSearchInputKeyup();
          }
  
          this.view.bindHtmlClick();
          this.view.bindMobileDevicesMousedown();
          this.view.bindSaveBtnClick(); // @Depreciated
        }
      }, {
        key: "bindMutationObserverChange",
        value: function bindMutationObserverChange() {
          var config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          };
          var observer = new MutationObserver(this._onMutationObserverChange.bind(this));
          observer.observe(this.view.$nativeSelect.get(0), config);
          observer.customId = this.uuid;
          observer.customStatus = 'observing';
          MaterialSelect.clearMutationObservers();
          MaterialSelect.mutationObservers.push(observer);
        }
      }, {
        key: "_onMutationObserverChange",
        value: function _onMutationObserverChange(mutationsList) {
          mutationsList.forEach(function (mutation) {
            var $select = $(mutation.target).closest('select');
  
            if ($select.data('stop-refresh') !== true && (mutation.type === 'childList' || mutation.type === 'attributes' && $(mutation.target).is('option'))) {
              MaterialSelect.clearMutationObservers(); // eslint-disable-next-line object-curly-newline
  
              $select.materialSelect({
                destroy: true
              });
              $select.materialSelect();
            }
          });
        }
      }, {
        key: "_toggleSelectedValue",
        value: function _toggleSelectedValue(optionIndex) {
          var selectedValueIndex = this.selectedOptionsIndexes.indexOf(optionIndex);
          var isSelected = selectedValueIndex !== -1;
  
          if (!isSelected) {
            this.selectedOptionsIndexes.push(optionIndex);
          } else {
            this.selectedOptionsIndexes.splice(selectedValueIndex, 1);
          }
  
          this.view.$nativeSelect.find('option').eq(optionIndex).prop('selected', !isSelected);
  
          this._setValueToMaterialSelect();
  
          return !isSelected;
        }
      }, {
        key: "_setValueToMaterialSelect",
        value: function _setValueToMaterialSelect() {
          var _this3 = this;
  
          var value = '';
          var selectedValuesCount = this.selectedOptionsIndexes.length;
          this.selectedOptionsIndexes.forEach(function (index) {
            return value += ", ".concat(_this3.view.$nativeSelect.find('option').eq(index).text().replace(/  +/g, ' ').trim());
          });
  
          if (this.options.maxSelectedOptions >= 0 && selectedValuesCount > this.options.maxSelectedOptions) {
            value = "".concat(selectedValuesCount, " ").concat(this.options.labels.optionsSelected);
          } else {
            value = value.substring(2);
          }
  
          if (value.length === 0) {
            value = this.view.$nativeSelect.find('option:disabled').eq(0).text();
          }
  
          this.view.$nativeSelect.siblings("".concat(this.options.defaultMaterialInput ? 'input.multi-bs-select' : 'input.select-dropdown')).val(value);
        }
      }, {
        key: "_randomUUID",
        value: function _randomUUID() {
          var d = new Date().getTime();
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // eslint-disable-next-line no-bitwise
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16); // eslint-disable-next-line no-bitwise
  
            return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
          });
        }
      }, {
        key: "fallback",
        value: function fallback() {
          return {
            _value: undefined,
            or: function or(value) {
              if (typeof value !== 'undefined' && typeof this._value === 'undefined') {
                this._value = value;
              }
  
              return this;
            },
            value: function value() {
              return this._value;
            }
          };
        }
      }, {
        key: "isInitialized",
        get: function get() {
          return Boolean(this.view.$nativeSelect.data('select-id')) && this.view.$nativeSelect.hasClass('initialized');
        }
      }], [{
        key: "clearMutationObservers",
        value: function clearMutationObservers() {
          MaterialSelect.mutationObservers.forEach(function (observer) {
            observer.disconnect();
            observer.customStatus = 'stopped';
          });
        }
      }]);
  
      return MaterialSelect;
    }();
  
    $.fn.materialSelect = function (options) {
      $(this).not('.browser-default').not('.custom-select').each(function () {
        var materialSelect = new MaterialSelect($(this), options);
        materialSelect.init();
      });
    };
  
    (function (originalVal) {
      $.fn.val = function (value) {
        if (!arguments.length) {
          return originalVal.call(this);
        }
  
        if (this.data('stop-refresh') !== true && this.hasClass('mdb-select') && this.hasClass('initialized')) {
          MaterialSelect.clearMutationObservers();
          this.materialSelect({
            destroy: true
          });
          var ret = originalVal.call(this, value);
          this.materialSelect();
          return ret;
        }
  
        return originalVal.call(this, value);
      };
    })($.fn.val);
  });
  /*!
   * pickadate.js v3.6.3, 2019/04/03
   * By Amsul, http://amsul.ca
   * Hosted on http://amsul.github.io/pickadate.js
   * Licensed under MIT
   */
  
  (function ( factory ) {
  
      // AMD.
      if ( typeof define == 'function' && define.amd )
          define( 'picker', ['jquery'], factory )
    
      // Node.js/browserify.
      else if ( typeof exports == 'object' )
          module.exports = factory( require('jquery') )
    
      // Browser globals.
      else this.Picker = factory( jQuery )
    
    }(function( $ ) {
    
    var $window = $( window )
    var $document = $( document )
    var $html = $( document.documentElement )
    var supportsTransitions = document.documentElement.style.transition != null
    
    
    /**
    * The picker constructor that creates a blank picker.
    */
    function PickerConstructor( ELEMENT, NAME, COMPONENT, OPTIONS ) {
    
      // If there’s no element, return the picker constructor.
      if ( !ELEMENT ) return PickerConstructor
    
      var IS_DEFAULT_THEME = false,
    
          // The state of the picker.
          STATE = {
              id: ELEMENT.id || 'P' + Math.abs( ~~(Math.random() * new Date()) ),
              handlingOpen: false,
          },
    
          // Merge the defaults and options passed.
          SETTINGS = COMPONENT ? $.extend( true, {}, COMPONENT.defaults, OPTIONS ) : OPTIONS || {},
    
          // Merge the default classes with the settings classes.
          CLASSES = $.extend( {}, PickerConstructor.klasses(), SETTINGS.klass ),
    
          // The element node wrapper into a jQuery object.
          $ELEMENT = $( ELEMENT ),
    
          // On editable:true checks if should open
          OPENCOUNTER = 2,
    
          // Pseudo picker constructor.
          PickerInstance = function() {
              return this.start()
          },
    
          // The picker prototype.
          P = PickerInstance.prototype = {
    
              constructor: PickerInstance,
    
              $node: $ELEMENT,
    
              /**
               * Initialize everything
               */
              start: function() {
    
                  // If it’s already started, do nothing.
                  if ( STATE && STATE.start ) return P
    
                  // Update the picker states.
                  STATE.methods = {}
                  STATE.start = true
                  STATE.open = false
                  STATE.type = ELEMENT.type
    
    
                  // Confirm focus state, convert into text input to remove UA stylings,
                  // and set as readonly to prevent keyboard popup.
                  ELEMENT.autofocus = ELEMENT == getActiveElement()
                  ELEMENT.readOnly = !SETTINGS.editable
                  ELEMENT.id = ELEMENT.id || STATE.id
                  if ( ELEMENT.type != 'text' ) {
                      ELEMENT.type = 'text'
                  }
    
    
                  // Create a new picker component with the settings.
                  P.component = new COMPONENT(P, SETTINGS)
    
    
                  // Create the picker root and then prepare it.
                  P.$root = $( '<div class="' + CLASSES.picker + '" id="' + ELEMENT.id + '_root" />' )
                  prepareElementRoot()
    
    
                  // Create the picker holder and then prepare it.
                  P.$holder = $( createWrappedComponent() ).appendTo( P.$root )
                  prepareElementHolder()
    
    
                  // If there’s a format for the hidden input element, create the element.
                  if ( SETTINGS.formatSubmit ) {
                      prepareElementHidden()
                  }
    
    
                  // Prepare the input element.
                  prepareElement()
    
    
                  // Insert the hidden input as specified in the settings.
                  /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
                  if ( SETTINGS.containerHidden ) $( SETTINGS.containerHidden ).append( P._hidden )
                  else $ELEMENT.after( P._hidden )
    
    
                  // Insert the root as specified in the settings.
                  if ( SETTINGS.container ) $( SETTINGS.container ).append( P.$root )
                  else $ELEMENT.after( P.$root )
    
    
                  // Bind the default component and settings events.
                  P.on({
                      start: P.component.onStart,
                      render: P.component.onRender,
                      stop: P.component.onStop,
                      open: P.component.onOpen,
                      close: P.component.onClose,
                      set: P.component.onSet
                  }).on({
                      start: SETTINGS.onStart,
                      render: SETTINGS.onRender,
                      stop: SETTINGS.onStop,
                      open: SETTINGS.onOpen,
                      close: SETTINGS.onClose,
                      set: SETTINGS.onSet
                  })
    
    
                  // Once we’re all set, check the theme in use.
                  IS_DEFAULT_THEME = isUsingDefaultTheme( P.$holder[0] )
    
    
                  // If the element has autofocus, open the picker.
                  if ( ELEMENT.autofocus ) {
                      P.open()
                  }
    
    
                  // Trigger queued the “start” and “render” events.
                  return P.trigger( 'start' ).trigger( 'render' )
              }, //start
    
    
              /**
               * Render a new picker
               */
              render: function( entireComponent ) {
    
                  // Insert a new component holder in the root or box.
                  if ( entireComponent ) {
                      P.$holder = $( createWrappedComponent() )
                      prepareElementHolder()
                      P.$root.html( P.$holder )
                  }
                  else P.$root.find( '.' + CLASSES.box ).html( P.component.nodes( STATE.open ) )
    
                  // Trigger the queued “render” events.
                  return P.trigger( 'render' )
              }, //render
    
    
              /**
               * Destroy everything
               */
              stop: function() {
    
                  // If it’s already stopped, do nothing.
                  if ( !STATE.start ) return P
    
                  // Then close the picker.
                  P.close()
    
                  // Remove the hidden field.
                  if ( P._hidden ) {
                      P._hidden.parentNode.removeChild( P._hidden )
                  }
    
                  // Remove the root.
                  P.$root.remove()
    
                  // Remove the input class, remove the stored data, and unbind
                  // the events (after a tick for IE - see `P.close`).
                  $ELEMENT.removeClass( CLASSES.input ).removeData( NAME )
                  setTimeout( function() {
                      $ELEMENT.off( '.' + STATE.id )
                  }, 0)
                    /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
                  // Restore the element state
                  ELEMENT.type = STATE.type
                  ELEMENT.readOnly = false
    
                  // Trigger the queued “stop” events.
                  P.trigger( 'stop' )
    
                  // Reset the picker states.
                  STATE.methods = {}
                  STATE.start = false
    
                  return P
              }, //stop
    
    
              /**
               * Open up the picker
               */
              open: function( dontGiveFocus ) {
                  OPENCOUNTER++
                  // If it’s already open, do nothing.
                  if ( STATE.open ) return P
      
                  // If it’s editable and already opened, do nothing.
                  if (OPENCOUNTER<4 && SETTINGS.editable) return P
                
                  // * A Firefox bug, when `html` has `overflow:hidden`, results in
                  //   killing transitions :(. So add the “opened” state on the next tick.
                  //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                  setTimeout( function() {
    
                      // Add the “opened” class to the picker root.
                      P.$root.addClass( CLASSES.opened )
                      aria( P.$root[0], 'hidden', false )
    
                  }, 0 )
    
                  // If we have to give focus, bind the element and doc events.
                  if ( dontGiveFocus !== false ) {
    
                      // Set it as open.
                      STATE.open = true
    
                      // Prevent the page from scrolling.
                      if ( IS_DEFAULT_THEME ) {
                          $('body').
                              css( 'overflow', 'hidden' ).
                              css( 'padding-right', '+=' + getScrollbarWidth() )
                      }
    
                      // Pass focus to the root element’s jQuery object.
                      focusPickerOnceOpened()
    
                      // Bind the document events.
                      $document.on( 'click.' + STATE.id + ' focusin.' + STATE.id, function( event ) {
                          // If the picker is currently midway through processing
                          // the opening sequence of events then don't handle clicks
                          // on any part of the DOM. This is caused by a bug in Chrome 73
                          // where a click event is being generated with the incorrect
                          // path in it.
                          // In short, if someone does a click that finishes after the
                          // new element is created then the path contains only the
                          // parent element and not the input element itself.
                          /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
                          if (STATE.handlingOpen) {
                            return;
                          }
    
                          var target = getRealEventTarget( event, ELEMENT )
    
                          // If the target of the event is not the element, close the picker picker.
                          // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
                          //   Also, for Firefox, a click on an `option` element bubbles up directly
                          //   to the doc. So make sure the target wasn't the doc.
                          // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
                          //   which causes the picker to unexpectedly close when right-clicking it. So make
                          //   sure the event wasn’t a right-click.
                          // * In Chrome 62 and up, password autofill causes a simulated focusin event which
                          //   closes the picker.
                          /* a r y a n n a g a r 2 7 | */
                          if ( ! event.isSimulated && target != ELEMENT && target != document && event.which != 3 ) {
    
                              // If the target was the holder that covers the screen,
                              // keep the element focused to maintain tabindex.
                              P.close( target === P.$holder[0] )
                          }
    
                      }).on( 'keydown.' + STATE.id, function( event ) {
    
                          var
                              // Get the keycode.
                              keycode = event.keyCode,
    
                              // Translate that to a selection change.
                              keycodeToMove = P.component.key[ keycode ],
    
                              // Grab the target.
                              target = getRealEventTarget( event, ELEMENT )
    
    
                          // On escape, close the picker and give focus.
                          if ( keycode == 27 ) {
                              P.close( true )
                          }
    
    
                          // Check if there is a key movement or “enter” keypress on the element.
                          else if ( target == P.$holder[0] && ( keycodeToMove || keycode == 13 ) ) {
    
                              // Prevent the default action to stop page movement.
                              event.preventDefault()
    
                              // Trigger the key movement action.
                              if ( keycodeToMove ) {
                                  PickerConstructor._.trigger( P.component.key.go, P, [ PickerConstructor._.trigger( keycodeToMove ) ] )
                              }
    
                              // On “enter”, if the highlighted item isn’t disabled, set the value and close.
                              else if ( !P.$root.find( '.' + CLASSES.highlighted ).hasClass( CLASSES.disabled ) ) {
                                  P.set( 'select', P.component.item.highlight )
                                  if ( SETTINGS.closeOnSelect ) {
                                      P.close( true )
                                  }
                              }
                          }
    
    
                          // If the target is within the root and “enter” is pressed,
                          // prevent the default action and trigger a click on the target instead.
                          else if ( $.contains( P.$root[0], target ) && keycode == 13 ) {
                              event.preventDefault()
                              target.click()
                          }
                      })
                  }
    
                  // Trigger the queued “open” events.
                  return P.trigger( 'open' )
              }, //open
    
    
              /**
               * Close the picker
               */
              close: function( giveFocus ) {
                  OPENCOUNTER = 0;
    
                  // If it’s already closed, do nothing more.
                  if ( !STATE.open ) return P
  
                  // If we need to give focus, do it before changing states.
                  if ( giveFocus ) {
                      if ( SETTINGS.editable ) {
                          ELEMENT.click();
                      }
                      else {
                          // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
                          // The focus is triggered *after* the close has completed - causing it
                          // to open again. So unbind and rebind the event at the next tick.
                          P.$holder.off( 'focus.toOpen' ).focus()
                          setTimeout( function() {
                              P.$holder.on( 'focus.toOpen', handleFocusToOpenEvent )
                          }, 0 )
                      }
                  }
    
                  // Remove the “active” class.
                  $ELEMENT.removeClass( CLASSES.active )
                  aria( ELEMENT, 'expanded', false )
    
                  // * A Firefox bug, when `html` has `overflow:hidden`, results in
                  //   killing transitions :(. So remove the “opened” state on the next tick.
                  //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                  setTimeout( function() {
    
                      // Remove the “opened” and “focused” class from the picker root.
                      P.$root.removeClass( CLASSES.opened + ' ' + CLASSES.focused )
                      aria( P.$root[0], 'hidden', true )
    
                  }, 0 )
    
                  // Allow the page to scroll.
                  if ( IS_DEFAULT_THEME ) {
                      $('body').
                          css( 'overflow', '' ).
                          css( 'padding-right', '-=' + getScrollbarWidth() )
                  }
    
                  document.activeElement.blur();
                  // Unbind the document events.
                  $document.off( '.' + STATE.id )
                  // Set it as closed.
                  STATE.open = false
                  // Trigger the queued “close” events.
                  return P.trigger( 'close' )
              }, //close
    
    
              /**
               * Clear the values
               */
              clear: function( options ) {
                  document.activeElement.blur();
                  return P.set( 'clear', null, options )
              }, //clear
    
    
              /**
               * Set something
               */
              set: function( thing, value, options ) {
    
                  var thingItem, thingValue,
                      thingIsObject = $.isPlainObject( thing ),
                      thingObject = thingIsObject ? thing : {}
    
                  // Make sure we have usable options.
                  options = thingIsObject && $.isPlainObject( value ) ? value : options || {}
    
                  if ( thing ) {
    
                      // If the thing isn’t an object, make it one.
                      if ( !thingIsObject ) {
                          thingObject[ thing ] = value
                      }
    
                      // Go through the things of items to set.
                      for ( thingItem in thingObject ) {
    
                          // Grab the value of the thing.
                          thingValue = thingObject[ thingItem ]
    
                          // First, if the item exists and there’s a value, set it.
                          if ( thingItem in P.component.item ) {
                              if ( thingValue === undefined ) thingValue = null
                              P.component.set( thingItem, thingValue, options )
                          }
    
                          // Then, check to update the element value and broadcast a change.
                          if ( ( thingItem == 'select' || thingItem == 'clear' ) && SETTINGS.updateInput ) {
                              $ELEMENT.
                                  val( thingItem == 'clear' ? '' : P.get( thingItem, SETTINGS.format ) ).
                                  trigger( 'change' )
                          }
                      }
    
                      // Render a new picker.
                      P.render()
                  }
    
                  // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
                  return options.muted ? P : P.trigger( 'set', thingObject )
              }, //set
    
    
              /**
               * Get something
               */
              get: function( thing, format ) {
    
                  // Make sure there’s something to get.
                  thing = thing || 'value'
    
                  // If a picker state exists, return that.
                  if ( STATE[ thing ] != null ) {
                      return STATE[ thing ]
                  }
    
                  // Return the submission value, if that.
                  if ( thing == 'valueSubmit' ) {
                      if ( P._hidden ) {
                          return P._hidden.value
                      }
                      thing = 'value'
                  }
    
                  // Return the value, if that.
                  if ( thing == 'value' ) {
                      return ELEMENT.value
                  }
    
                  // Check if a component item exists, return that.
                  if ( thing in P.component.item ) {
                      if ( typeof format == 'string' ) {
                          var thingValue = P.component.get( thing )
                          return thingValue ?
                              PickerConstructor._.trigger(
                                  P.component.formats.toString,
                                  P.component,
                                  [ format, thingValue ]
                              ) : ''
                      }
                      return P.component.get( thing )
                  }
              }, //get
    
    
    
              /**
               * Bind events on the things.
               */
              on: function( thing, method, internal ) {
    
                  var thingName, thingMethod,
                      thingIsObject = $.isPlainObject( thing ),
                      thingObject = thingIsObject ? thing : {}
    
                  if ( thing ) {
    
                      // If the thing isn’t an object, make it one.
                      if ( !thingIsObject ) {
                          thingObject[ thing ] = method
                      }
    
                      // Go through the things to bind to.
                      for ( thingName in thingObject ) {
    
                          // Grab the method of the thing.
                          thingMethod = thingObject[ thingName ]
    
                          // If it was an internal binding, prefix it.
                          if ( internal ) {
                              thingName = '_' + thingName
                          }
    
                          // Make sure the thing methods collection exists.
                          STATE.methods[ thingName ] = STATE.methods[ thingName ] || []
    
                          // Add the method to the relative method collection.
                          STATE.methods[ thingName ].push( thingMethod )
                      }
                  }
    
                  return P
              }, //on
    
    
    
              /**
               * Unbind events on the things.
               */
              off: function() {
                  var i, thingName,
                      names = arguments;
                  for ( i = 0, namesCount = names.length; i < namesCount; i += 1 ) {
                      thingName = names[i]
                      if ( thingName in STATE.methods ) {
                          delete STATE.methods[thingName]
                      }
                  }
                  return P
              },
    
    
              /**
               * Fire off method events.
               */
              trigger: function( name, data ) {
                  var _trigger = function( name ) {
                      var methodList = STATE.methods[ name ]
                      if ( methodList ) {
                          methodList.map( function( method ) {
                              PickerConstructor._.trigger( method, P, [ data ] )
                          })
                      }
                  }
                  _trigger( '_' + name )
                  _trigger( name )
                  return P
              } //trigger
          } //PickerInstance.prototype
    
    
      /**
       * Wrap the picker holder components together.
       */
      function createWrappedComponent() {
    
          // Create a picker wrapper holder
          return PickerConstructor._.node( 'div',
    
              // Create a picker wrapper node
              PickerConstructor._.node( 'div',
    
                  // Create a picker frame
                  PickerConstructor._.node( 'div',
    
                      // Create a picker box node
                      PickerConstructor._.node( 'div',
    
                          // Create the components nodes.
                          P.component.nodes( STATE.open ),
    
                          // The picker box class
                          CLASSES.box
                      ),
    
                      // Picker wrap class
                      CLASSES.wrap
                  ),
    
                  // Picker frame class
                  CLASSES.frame
              ),
    
              // Picker holder class
              CLASSES.holder,
    
              'tabindex="-1"'
          ) //endreturn
      } //createWrappedComponent
    
      /**
       * Prepare the input element with all bindings.
       */
      function prepareElement() {
    
          $ELEMENT.
    
              // Store the picker data by component name.
              data(NAME, P).
    
              // Add the “input” class name.
              addClass(CLASSES.input).
    
              // If there’s a `data-value`, update the value of the element.
              val( $ELEMENT.data('value') ?
                  P.get('select', SETTINGS.format) :
                  ELEMENT.value
              ).
    
              // On focus/click, open the picker.
              on( 'focus.' + STATE.id + ' click.' + STATE.id,
              debounce(function(event) {
                  event.preventDefault()
                  P.open()
              }, 100))
    
              // Mousedown handler to capture when the user starts interacting
              // with the picker. This is used in working around a bug in Chrome 73.
              .on('mousedown', function() {
                STATE.handlingOpen = true;
                var handler = function() {
                  // By default mouseup events are fired before a click event.
                  // By using a timeout we can force the mouseup to be handled
                  // after the corresponding click event is handled.
                  setTimeout(function() {
                    $(document).off('mouseup', handler);
                    STATE.handlingOpen = false;
                  }, 0);
                };
                $(document).on('mouseup', handler);
              });
    
    
          // Only bind keydown events if the element isn’t editable.
          if ( !SETTINGS.editable ) {
    
              $ELEMENT.
    
                  // Handle keyboard event based on the picker being opened or not.
                  on( 'keydown.' + STATE.id, handleKeydownEvent )
          }
    
    
          // Update the aria attributes.
          aria(ELEMENT, {
              haspopup: true,
              expanded: false,
              readonly: false,
              owns: ELEMENT.id + '_root'
          })
      }
    
    
      /**
       * Prepare the root picker element with all bindings.
       */
      function prepareElementRoot() {
          aria( P.$root[0], 'hidden', true )
      }
    
    
       /**
        * Prepare the holder picker element with all bindings.
        */
      function prepareElementHolder() {
    
          P.$holder.
    
              on({
    
                  // For iOS8.
                  keydown: handleKeydownEvent,
    
                  'focus.toOpen': handleFocusToOpenEvent,
    
                  blur: function() {
                      // Remove the “target” class.
                      $ELEMENT.removeClass( CLASSES.target )
                  },
    
                  // When something within the holder is focused, stop from bubbling
                  // to the doc and remove the “focused” state from the root.
                  focusin: function( event ) {
                      P.$root.removeClass( CLASSES.focused )
                      event.stopPropagation()
                  },
    
                  // When something within the holder is clicked, stop it
                  // from bubbling to the doc.
                  'mousedown click': function( event ) {
    
                      var target = getRealEventTarget( event, ELEMENT )
    
                      // Make sure the target isn’t the root holder so it can bubble up.
                      if ( target != P.$holder[0] ) {
    
                          event.stopPropagation()
    
                          // * For mousedown events, cancel the default action in order to
                          //   prevent cases where focus is shifted onto external elements
                          //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
                          //   Also, for Firefox, don’t prevent action on the `option` element.
                          if ( event.type == 'mousedown' && !$( target ).is( 'input, select, textarea, button, option' )) {
    
                              event.preventDefault()
    
                              // Re-focus onto the holder so that users can click away
                              // from elements focused within the picker.
                              P.$holder.eq(0).focus()
                          }
                      }
                  }
    
              }).
    
              // If there’s a click on an actionable element, carry out the actions.
              on( 'click', '[data-pick], [data-nav], [data-clear], [data-close]', function() {
    
                  var $target = $( this ),
                      targetData = $target.data(),
                      targetDisabled = $target.hasClass( CLASSES.navDisabled ) || $target.hasClass( CLASSES.disabled ),
    
                      // * For IE, non-focusable elements can be active elements as well
                      //   (http://stackoverflow.com/a/2684561).
                      activeElement = getActiveElement()
                      activeElement = activeElement && ( (activeElement.type || activeElement.href ) ? activeElement : null);
    
                  // If it’s disabled or nothing inside is actively focused, re-focus the element.
                  if ( targetDisabled || activeElement && !$.contains( P.$root[0], activeElement ) ) {
                      P.$holder.eq(0).focus()
                  }
    
                  // If something is superficially changed, update the `highlight` based on the `nav`.
                  if ( !targetDisabled && targetData.nav ) {
                      P.set( 'highlight', P.component.item.highlight, { nav: targetData.nav } )
                  }
    
                  // If something is picked, set `select` then close with focus.
                  else if ( !targetDisabled && 'pick' in targetData ) {
                      P.set( 'select', targetData.pick )
                      if ( SETTINGS.closeOnSelect ) {
                          P.close( true )
                      }
                  }
    
                  // If a “clear” button is pressed, empty the values and close with focus.
                  else if ( targetData.clear ) {
                      P.clear()
                      if ( SETTINGS.closeOnClear ) {
                          P.close( true )
                      }
                  }
    
                  else if ( targetData.close ) {
                      P.close( true )
                  }
    
              }) //P.$holder
    
      }
    
    
       /**
        * Prepare the hidden input element along with all bindings.
        */
      function prepareElementHidden() {
    
          var name
    
          if ( SETTINGS.hiddenName === true ) {
              name = ELEMENT.name
              ELEMENT.name = ''
          }
          else {
              name = [
                  typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',
                  typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'
              ]
              name = name[0] + ELEMENT.name + name[1]
          }
    
          P._hidden = $(
              '<input ' +
              'type=hidden ' +
    
              // Create the name using the original input’s with a prefix and suffix.
              'name="' + name + '"' +
    
              // If the element has a value, set the hidden value as well.
              (
                  $ELEMENT.data('value') || ELEMENT.value ?
                      ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' :
                      ''
              ) +
              '>'
          )[0]
    
          $ELEMENT.
    
              // If the value changes, update the hidden input with the correct format.
              on('change.' + STATE.id, function() {
                  P._hidden.value = ELEMENT.value ?
                      P.get('select', SETTINGS.formatSubmit) :
                      ''
              })
      }
    
    
      // Wait for transitions to end before focusing the holder. Otherwise, while
      // using the `container` option, the view jumps to the container.
      function focusPickerOnceOpened() {
    
          if (IS_DEFAULT_THEME && supportsTransitions) {
              P.$holder.find('.' + CLASSES.frame).one('transitionend', function() {
                  P.$holder.eq(0).focus()
              })
          }
          else {
              setTimeout(function() {
                  P.$holder.eq(0).focus()
              }, 0)
          }
      }
    
    
      function handleFocusToOpenEvent(event) {
    
          // Stop the event from propagating to the doc.
          event.stopPropagation()
    
          // Add the “target” class.
          $ELEMENT.addClass( CLASSES.target )
    
          // Add the “focused” class to the root.
          P.$root.addClass( CLASSES.focused )
    
          // And then finally open the picker.
          P.open()
      }
    
    
      // For iOS8.
      function handleKeydownEvent( event ) {
    
          var keycode = event.keyCode,
    
              // Check if one of the delete keys was pressed.
              isKeycodeDelete = /^(8|46)$/.test(keycode)
    
          // For some reason IE clears the input value on “escape”.
          if ( keycode == 27 ) {
              P.close( true )
              return false
          }
    
          // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
          if ( keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode] ) {
    
              // Prevent it from moving the page and bubbling to doc.
              event.preventDefault()
              event.stopPropagation()
    
              // If `delete` was pressed, clear the values and close the picker.
              // Otherwise open the picker.
              if ( isKeycodeDelete ) { P.clear().close() }
              else { P.open() }
          }
      }
    
    
      // Return a new picker instance.
      return new PickerInstance()
    } //PickerConstructor
    
    
    
    /**
    * The default classes and prefix to use for the HTML classes.
    */
    PickerConstructor.klasses = function( prefix ) {
      prefix = prefix || 'picker'
      return {
    
          picker: prefix,
          opened: prefix + '--opened',
          focused: prefix + '--focused',
    
          input: prefix + '__input',
          active: prefix + '__input--active',
          target: prefix + '__input--target',
    
          holder: prefix + '__holder',
    
          frame: prefix + '__frame',
          wrap: prefix + '__wrap',
    
          box: prefix + '__box'
      }
    } //PickerConstructor.klasses
    
    
    
    /**
    * Check if the default theme is being used.
    */
    function isUsingDefaultTheme( element ) {
    
      var theme,
          prop = 'position'
    
      // For IE.
      if ( element.currentStyle ) {
          theme = element.currentStyle[prop]
      }
    
      // For normal browsers.
      else if ( window.getComputedStyle ) {
          theme = getComputedStyle( element )[prop]
      }
    
      return theme == 'fixed'
    }
    
    /**
    * Get the width of the browser’s scrollbar.
    * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
    */
    function getScrollbarWidth() {
    
      if ( $html.height() <= $window.height() ) {
          return 0
      }
    
      var $outer = $( '<div style="visibility:hidden;width:100px" />' ).
          appendTo( 'body' )
    
      // Get the width without scrollbars.
      var widthWithoutScroll = $outer[0].offsetWidth
    
      // Force adding scrollbars.
      $outer.css( 'overflow', 'scroll' )
    
      // Add the inner div.
      var $inner = $( '<div style="width:100%" />' ).appendTo( $outer )
    
      // Get the width with scrollbars.
      var widthWithScroll = $inner[0].offsetWidth
    
      // Remove the divs.
      $outer.remove()
    
      // Return the difference between the widths.
      return widthWithoutScroll - widthWithScroll
    }
    
    
    
    /**
    * Get the target element from the event.
    * If ELEMENT is supplied and present in the event path (ELEMENT is ancestor of the target),
    * returns ELEMENT instead
    */
    function getRealEventTarget( event, ELEMENT ) {
    
      var path = []
    
      if ( event.path ) {
          path = event.path
      }
    
      if ( event.originalEvent && event.originalEvent.path ) {
          path = event.originalEvent.path
      }
    
      if ( path && path.length > 0 ) {
          if ( ELEMENT && path.indexOf( ELEMENT ) >= 0 ) {
              return ELEMENT
          } else {
              return path[0]
          }
      }
    
      return event.target
    }
    
    // taken from https://davidwalsh.name/javascript-debounce-function
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
    }
    
    /**
    * PickerConstructor helper methods.
    */
    PickerConstructor._ = {
    
      /**
       * Create a group of nodes. Expects:
       * `
          {
              min:    {Integer},
              max:    {Integer},
              i:      {Integer},
              node:   {String},
              item:   {Function}
          }
       * `
       */
      group: function( groupObject ) {
    
          var
              // Scope for the looped object
              loopObjectScope,
    
              // Create the nodes list
              nodesList = '',
    
              // The counter starts from the `min`
              counter = PickerConstructor._.trigger( groupObject.min, groupObject )
    
    
          // Loop from the `min` to `max`, incrementing by `i`
          for ( ; counter <= PickerConstructor._.trigger( groupObject.max, groupObject, [ counter ] ); counter += groupObject.i ) {
    
              // Trigger the `item` function within scope of the object
              loopObjectScope = PickerConstructor._.trigger( groupObject.item, groupObject, [ counter ] )
    
              // Splice the subgroup and create nodes out of the sub nodes
              nodesList += PickerConstructor._.node(
                  groupObject.node,
                  loopObjectScope[ 0 ],   // the node
                  loopObjectScope[ 1 ],   // the classes
                  loopObjectScope[ 2 ]    // the attributes
              )
          }
    
          // Return the list of nodes
          return nodesList
      }, //group
    
    
      /**
       * Create a dom node string
       */
      node: function( wrapper, item, klass, attribute ) {
    
          // If the item is false-y, just return an empty string
          if ( !item ) return ''
    
          // If the item is an array, do a join
          item = $.isArray( item ) ? item.join( '' ) : item
    
          // Check for the class
          klass = klass ? ' class="' + klass + '"' : ''
    
          // Check for any attributes
          attribute = attribute ? ' ' + attribute : ''
    
          // Return the wrapped item
          return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'
      }, //node
    
    
      /**
       * Lead numbers below 10 with a zero.
       */
      lead: function( number ) {
          return ( number < 10 ? '0': '' ) + number
      },
    
    
      /**
       * Trigger a function otherwise return the value.
       */
      trigger: function( callback, scope, args ) {
          return typeof callback == 'function' ? callback.apply( scope, args || [] ) : callback
      },
    
    
      /**
       * If the second character is a digit, length is 2 otherwise 1.
       */
      digits: function( string ) {
          return ( /\d/ ).test( string[ 1 ] ) ? 2 : 1
      },
    
    
      /**
       * Tell if something is a date object.
       */
      isDate: function( value ) {
          return {}.toString.call( value ).indexOf( 'Date' ) > -1 && this.isInteger( value.getDate() )
      },
    
    
      /**
       * Tell if something is an integer.
       */
      isInteger: function( value ) {
          return {}.toString.call( value ).indexOf( 'Number' ) > -1 && value % 1 === 0
      },
    
    
      /**
       * Create ARIA attribute strings.
       */
      ariaAttr: ariaAttr
    } //PickerConstructor._
    
    
    
    /**
    * Extend the picker with a component and defaults.
    */
    PickerConstructor.extend = function( name, Component ) {
    
      // Extend jQuery.
      $.fn[ name ] = function( options, action ) {
    
          // Grab the component data.
          var componentData = this.data( name )
    
          // If the picker is requested, return the data object.
          if ( options == 'picker' ) {
              return componentData
          }
    
          // If the component data exists and `options` is a string, carry out the action.
          if ( componentData && typeof options == 'string' ) {
              return PickerConstructor._.trigger( componentData[ options ], componentData, [ action ] )
          }
    
          // Otherwise go through each matched element and if the component
          // doesn’t exist, create a new picker using `this` element
          // and merging the defaults and options with a deep copy.
          return this.each( function() {
              var $this = $( this )
              if ( !$this.data( name ) ) {
                  new PickerConstructor( this, name, Component, options )
              }
          })
      }
    
      // Set the defaults.
      $.fn[ name ].defaults = Component.defaults
    } //PickerConstructor.extend
    
    
    
    function aria(element, attribute, value) {
      if ( $.isPlainObject(attribute) ) {
          for ( var key in attribute ) {
              ariaSet(element, key, attribute[key])
          }
      }
      else {
          ariaSet(element, attribute, value)
      }
    }
    function ariaSet(element, attribute, value) {
      element.setAttribute(
          (attribute == 'role' ? '' : 'aria-') + attribute,
          value
      )
    }
    function ariaAttr(attribute, data) {
      if ( !$.isPlainObject(attribute) ) {
          attribute = { attribute: data }
      }/* a r y a n n a g a r 2 7 | */
      data = ''
      for ( var key in attribute ) {
          var attr = (key == 'role' ? '' : 'aria-') + key,
              attrVal = attribute[key]
          data += attrVal == null ? '' : attr + '="' + attribute[key] + '"'
      }
      return data
    }
    
    // IE8 bug throws an error for activeElements within iframes.
    function getActiveElement() {
      try {
          return document.activeElement
      } catch ( err ) { }
    }
    
    
    
    // Expose the picker constructor.
    return PickerConstructor
    
    
    }));
    
  
  /*!
   * Date picker for pickadate.js v3.6.3
   * http://amsul.github.io/pickadate.js/date.htm
   */
  
  (function (factory) {
  
    // AMD.
    if (typeof define == 'function' && define.amd)
      define(['picker', 'jquery'], factory)
  
    // Node.js/browserify.
    else if (typeof exports == 'object')
      module.exports = factory(require('./picker.js'), require('jquery'))
  
    // Browser globals.
    else factory(Picker, jQuery)
  
  }(function (Picker, $) {
  
  
    /**
     * Globals and constants
     */
    var DAYS_IN_WEEK = 7,
      WEEKS_IN_CALENDAR = 6,
      _ = Picker._
  
  
  
    /**
     * The date picker constructor
     */
    function DatePicker(picker, settings) {
  
      var calendar = this,
        element = picker.$node[0],
        elementValue = element.value,
        elementDataValue = picker.$node.data('value'),
        valueString = elementDataValue || elementValue,
        formatString = elementDataValue ? settings.formatSubmit : settings.format,
        isRTL = function () {
  
          return element.currentStyle ?
  
            // For IE.
            element.currentStyle.direction == 'rtl' :
  
            // For normal browsers.
            getComputedStyle(picker.$root[0]).direction == 'rtl'
        }
  
      calendar.settings = settings
      calendar.$node = picker.$node
  
      // The queue of methods that will be used to build item objects.
      calendar.queue = {
        min: 'measure create',
        max: 'measure create',
        now: 'now create',
        select: 'parse create validate',
        highlight: 'parse navigate create validate',
        view: 'parse create validate viewset',
        disable: 'deactivate',
        enable: 'activate'
      }
  
      // The component's item object.
      calendar.item = {}
  
      calendar.item.clear = null
      calendar.item.disable = (settings.disable || []).slice(0)
      calendar.item.enable = -(function (collectionDisabled) {
        return collectionDisabled[0] === true ? collectionDisabled.shift() : -1
      })(calendar.item.disable)
  
      calendar.
      set('min', settings.min).
      set('max', settings.max).
      set('now')
  
      // When there’s a value, set the `select`, which in turn
      // also sets the `highlight` and `view`.
      if (valueString) {
        calendar.set('select', valueString, {
          format: formatString,
          defaultValue: true
        })
      }
  
      // If there’s no value, default to highlighting “today”.
      else {
        calendar.
        set('select', null).
        set('highlight', calendar.item.now)
      }
  
  
      // The keycode to movement mapping.
      calendar.key = {
        40: 7, // Down
        38: -7, // Up
        39: function () {
          return isRTL() ? -1 : 1
        }, // Right
        37: function () {
          return isRTL() ? 1 : -1
        }, // Left
        go: function (timeChange) {
          var highlightedObject = calendar.item.highlight,
            targetDate = new Date(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange)
          calendar.set(
            'highlight',
            targetDate, {
              interval: timeChange
            }
          )
          this.render()
        }
      }
  
  
      // Bind some picker events.
      picker.
      on('render', function () {
        picker.$root.find('.' + settings.klass.selectMonth).on('change', function () {
          var value = this.value
          if (value) {
            picker.set('highlight', [picker.get('view').year, value, picker.get('highlight').date])
            picker.$root.find('.' + settings.klass.selectMonth).trigger('focus')
          }
        })
        picker.$root.find('.' + settings.klass.selectYear).on('change', function () {
          var value = this.value
          if (value) {
            picker.set('highlight', [value, picker.get('view').month, picker.get('highlight').date])
            picker.$root.find('.' + settings.klass.selectYear).trigger('focus')
          }
        })
      }, 1).
      on('open', function () {
        var includeToday = ''
        if (calendar.disabled(calendar.get('now'))) {
          includeToday = ':not(.' + settings.klass.buttonToday + ')'
        }
        picker.$root.find('button' + includeToday + ', select').attr('disabled', false)
      }, 1).
      on('close', function () {
        picker.$root.find('button, select').attr('disabled', true)
      }, 1)
  
    } //DatePicker
  
  
    /**
     * Set a datepicker item object.
     */
    DatePicker.prototype.set = function (type, value, options) {
  
      var calendar = this,
        calendarItem = calendar.item
  
      // If the value is `null` just set it immediately.
      if (value === null) {
        if (type == 'clear') type = 'select'
        calendarItem[type] = value
        return calendar
      }
  
      // Otherwise go through the queue of methods, and invoke the functions.
      // Update this as the time unit, and set the final value as this item.
      // * In the case of `enable`, keep the queue but set `disable` instead.
      //   And in the case of `flip`, keep the queue but set `enable` instead.
      calendarItem[(type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type)] = calendar.queue[type].split(' ').map(function (method) {
        value = calendar[method](type, value, options)
        return value
      }).pop()
  
      // Check if we need to cascade through more updates.
      if (type == 'select') {
        calendar.set('highlight', calendarItem.select, options)
      } else if (type == 'highlight') {
        calendar.set('view', calendarItem.highlight, options)
      } else if (type.match(/^(flip|min|max|disable|enable)$/)) {
        if (calendarItem.select && calendar.disabled(calendarItem.select)) {
          calendar.set('select', calendarItem.select, options)
        }
        if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
          calendar.set('highlight', calendarItem.highlight, options)
        }
      }
  
      return calendar
    } //DatePicker.prototype.set
  
  
    /**
     * Get a datepicker item object.
     */
    DatePicker.prototype.get = function (type) {
      return this.item[type]
    } //DatePicker.prototype.get
  
  
    /**
     * Create a picker date object.
     */
    DatePicker.prototype.create = function (type, value, options) {
  
      var isInfiniteValue,
        calendar = this
  
      // If there’s no value, use the type as the value.
      value = value === undefined ? type : value
  
  
      // If it’s infinity, update the value.
      if (value == -Infinity || value == Infinity) {
        isInfiniteValue = value
      }
  
      // If it’s an object, use the native date object.
      else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
        value = value.obj
      }
  
      // If it’s an array, convert it into a date and make sure
      // that it’s a valid date – otherwise default to today.
      else if ($.isArray(value)) {
        value = new Date(value[0], value[1], value[2])
        value = _.isDate(value) ? value : calendar.create().obj
      }
  
      // If it’s a number or date object, make a normalized date.
      else if (_.isInteger(value) || _.isDate(value)) {
        value = calendar.normalize(new Date(value), options)
      }
  
      // If it’s a literal true or any other case, set it to now.
      else /*if ( value === true )*/ {
        value = calendar.now(type, value, options)
      }
  
      // Return the compiled object.
      return {
        year: isInfiniteValue || value.getFullYear(),
        month: isInfiniteValue || value.getMonth(),
        date: isInfiniteValue || value.getDate(),
        day: isInfiniteValue || value.getDay(),
        obj: isInfiniteValue || value,
        pick: isInfiniteValue || value.getTime()
      }
    } //DatePicker.prototype.create
  
  
    /**
     * Create a range limit object using an array, date object,
     * literal “true”, or integer relative to another time.
     */
    DatePicker.prototype.createRange = function (from, to) {
  
      var calendar = this,
        createDate = function (date) {
          if (date === true || $.isArray(date) || _.isDate(date)) {
            return calendar.create(date)
          }
          return date
        }
  
      // Create objects if possible.
      if (!_.isInteger(from)) {
        from = createDate(from)
      }
      if (!_.isInteger(to)) {
        to = createDate(to)
      }
  
      // Create relative dates.
      if (_.isInteger(from) && $.isPlainObject(to)) {
        from = [to.year, to.month, to.date + from];
      } else if (_.isInteger(to) && $.isPlainObject(from)) {
        to = [from.year, from.month, from.date + to];
      }
  
      return {
        from: createDate(from),
        to: createDate(to)
      }
    } //DatePicker.prototype.createRange
  
  
    /**
     * Check if a date unit falls within a date range object.
     */
    DatePicker.prototype.withinRange = function (range, dateUnit) {
      range = this.createRange(range.from, range.to)
      return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick
    }
  
  
    /**
     * Check if two date range objects overlap.
     */
    DatePicker.prototype.overlapRanges = function (one, two) {
  
      var calendar = this
  
      // Convert the ranges into comparable dates.
      one = calendar.createRange(one.from, one.to)
      two = calendar.createRange(two.from, two.to)
  
      return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) ||
        calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to)
    }
  
  
    /**
     * Get the date today.
     */
    DatePicker.prototype.now = function (type, value, options) {
      value = new Date()
      if (options && options.rel) {
        value.setDate(value.getDate() + options.rel)
      }
      return this.normalize(value, options)
    }
  
  
    /**
     * Navigate to next/prev month.
     */
    DatePicker.prototype.navigate = function (type, value, options) {
  
      var targetDateObject,
        targetYear,
        targetMonth,
        targetDate,
        isTargetArray = $.isArray(value),
        isTargetObject = $.isPlainObject(value),
        viewsetObject = this.item.view
      /*,
            safety = 100*/
  
  
      if (isTargetArray || isTargetObject) {
  
        if (isTargetObject) {
          targetYear = value.year
          targetMonth = value.month
          targetDate = value.date
        } else {
          targetYear = +value[0]
          targetMonth = +value[1]
          targetDate = +value[2]
        }
  
        // If we’re navigating months but the view is in a different
        // month, navigate to the view’s year and month.
        if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
          targetYear = viewsetObject.year
          targetMonth = viewsetObject.month
        }
  
        // Figure out the expected target year and month.
        targetDateObject = new Date(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1)
        targetYear = targetDateObject.getFullYear()
        targetMonth = targetDateObject.getMonth()
  
        // If the month we’re going to doesn’t have enough days,
        // keep decreasing the date until we reach the month’s last date.
        while ( /*safety &&*/ new Date(targetYear, targetMonth, targetDate).getMonth() !== targetMonth) {
          targetDate -= 1
          /*safety -= 1
          if ( !safety ) {
              throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
          }*/
        }
  
        value = [targetYear, targetMonth, targetDate]
      }
  
      return value
    } //DatePicker.prototype.navigate
  
  
    /**
     * Normalize a date by setting the hours to midnight.
     */
    DatePicker.prototype.normalize = function (value /*, options*/ ) {
      value.setHours(0, 0, 0, 0)
      return value
    }
  
  
    /**
     * Measure the range of dates.
     */
    DatePicker.prototype.measure = function (type, value /*, options*/ ) {
  
      var calendar = this
  
      // If it's an integer, get a date relative to today.
      if (_.isInteger(value)) {
        value = calendar.now(type, value, {
          rel: value
        })
      }
  
      // If it’s anything false-y, remove the limits.
      else if (!value) {
        value = type == 'min' ? -Infinity : Infinity
      }
  
      // If it’s a string, parse it.
      else if (typeof value == 'string') {
        value = calendar.parse(type, value)
      }
  
      return value
    } ///DatePicker.prototype.measure
  
  
    /**
     * Create a viewset object based on navigation.
     */
    DatePicker.prototype.viewset = function (type, dateObject /*, options*/ ) {
      return this.create([dateObject.year, dateObject.month, 1])
    }
  
  
    /**
     * Validate a date as enabled and shift if needed.
     */
    DatePicker.prototype.validate = function (type, dateObject, options) {
  
      var calendar = this,
  
        // Keep a reference to the original date.
        originalDateObject = dateObject,
  
        // Make sure we have an interval.
        interval = options && options.interval ? options.interval : 1,
  
        // Check if the calendar enabled dates are inverted.
        isFlippedBase = calendar.item.enable === -1,
  
        // Check if we have any enabled dates after/before now.
        hasEnabledBeforeTarget, hasEnabledAfterTarget,
  
        // The min & max limits.
        minLimitObject = calendar.item.min,
        maxLimitObject = calendar.item.max,
  
        // Check if we’ve reached the limit during shifting.
        reachedMin, reachedMax,
  
        // Check if the calendar is inverted and at least one weekday is enabled.
        hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function (value) {
  
          // If there’s a date, check where it is relative to the target.
          if ($.isArray(value)) {
            var dateTime = calendar.create(value).pick
            if (dateTime < dateObject.pick) hasEnabledBeforeTarget = true
            else if (dateTime > dateObject.pick) hasEnabledAfterTarget = true
          }
  
          // Return only integers for enabled weekdays.
          return _.isInteger(value)
        }).length
      /*,
  
            safety = 100*/
  
  
  
      // Cases to validate for:
      // [1] Not inverted and date disabled.
      // [2] Inverted and some dates enabled.
      // [3] Not inverted and out of range.
      //
      // Cases to **not** validate for:
      // • Navigating months.
      // • Not inverted and date enabled.
      // • Inverted and all dates disabled.
      // • ..and anything else.
      if (!options || (!options.nav && !options.defaultValue))
        if (
          /* 1 */
          (!isFlippedBase && calendar.disabled(dateObject)) ||
          /* 2 */
          (isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget)) ||
          /* 3 */
          (!isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick))
        ) {
  
  
          // When inverted, flip the direction if there aren’t any enabled weekdays
          // and there are no enabled dates in the direction of the interval.
          if (isFlippedBase && !hasEnabledWeekdays && ((!hasEnabledAfterTarget && interval > 0) || (!hasEnabledBeforeTarget && interval < 0))) {
            interval *= -1
          }
  
  
          // Keep looping until we reach an enabled date.
          while ( /*safety &&*/ calendar.disabled(dateObject)) {
  
            /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
            }*/
  
  
            // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
            if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
              dateObject = originalDateObject
              interval = interval > 0 ? 1 : -1
            }
  
  
            // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
            if (dateObject.pick <= minLimitObject.pick) {
              reachedMin = true
              interval = 1
              dateObject = calendar.create([
                minLimitObject.year,
                minLimitObject.month,
                minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)
              ])
            } else if (dateObject.pick >= maxLimitObject.pick) {
              reachedMax = true
              interval = -1
              dateObject = calendar.create([
                maxLimitObject.year,
                maxLimitObject.month,
                maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)
              ])
            }
  
  
            // If we’ve reached both limits, just break out of the loop.
            if (reachedMin && reachedMax) {
              break
            }
  
  
            // Finally, create the shifted date using the interval and keep looping.
            dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval])
          }
  
        } //endif
  
  
      // Return the date object settled on.
      return dateObject
    } //DatePicker.prototype.validate
  
  
    /**
     * Check if a date is disabled.
     */
    DatePicker.prototype.disabled = function (dateToVerify) {
  
      var
        calendar = this,
  
        // Filter through the disabled dates to check if this is one.
        isDisabledMatch = calendar.item.disable.filter(function (dateToDisable) {
  
          // If the date is a number, match the weekday with 0index and `firstDay` check.
          if (_.isInteger(dateToDisable)) {
            return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7
          }
  
          // If it’s an array or a native JS date, create and match the exact date.
          if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
            return dateToVerify.pick === calendar.create(dateToDisable).pick
          }
  
          // If it’s an object, match a date within the “from” and “to” range.
          if ($.isPlainObject(dateToDisable)) {
            return calendar.withinRange(dateToDisable, dateToVerify)
          }
        })
  
      // If this date matches a disabled date, confirm it’s not inverted.
      isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (dateToDisable) {
        return $.isArray(dateToDisable) && dateToDisable[3] == 'inverted' ||
          $.isPlainObject(dateToDisable) && dateToDisable.inverted
      }).length
  
      // Check the calendar “enabled” flag and respectively flip the
      // disabled state. Then also check if it’s beyond the min/max limits.
      return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
        dateToVerify.pick < calendar.item.min.pick ||
        dateToVerify.pick > calendar.item.max.pick
  
    } //DatePicker.prototype.disabled
  
  
    /**
     * Parse a string into a usable type.
     */
    DatePicker.prototype.parse = function (type, value, options) {
  
      var calendar = this,
        parsingObject = {}
  
      // If it’s already parsed, we’re good.
      if (!value || typeof value != 'string') {
        return value
      }
  
      // We need a `.format` to parse the value with.
      if (!(options && options.format)) {
        options = options || {}
        options.format = calendar.settings.format
      }
  
      // Convert the format into an array and then map through it.
      calendar.formats.toArray(options.format).map(function (label) {
  
        var
          // Grab the formatting label.
          formattingLabel = calendar.formats[label],
  
          // The format length is from the formatting label function or the
          // label length without the escaping exclamation (!) mark.
          formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, '').length
  
        // If there's a format label, split the value up to the format length.
        // Then add it to the parsing object with appropriate label.
        if (formattingLabel) {
          parsingObject[label] = value.substr(0, formatLength)
        }
  
        // Update the value as the substring from format length to end.
        value = value.substr(formatLength)
      })
  
      // Compensate for month 0index.
      return [
        parsingObject.yyyy || parsingObject.yy,
        +(parsingObject.mm || parsingObject.m) - 1,
        parsingObject.dd || parsingObject.d
      ]
    } //DatePicker.prototype.parse
  
  
    /**
     * Various formats to display the object in.
     */
    DatePicker.prototype.formats = (function () {
  
      // Return the length of the first word in a collection.
      function getWordLengthFromCollection(string, collection, dateObject) {
  
        // Grab the first word from the string.
        // Regex pattern from http://stackoverflow.com/q/150033
        var word = string.match(/[^\x00-\x7F]+|\w+/)[0]
  
        // If there's no month index, add it to the date object
        if (!dateObject.mm && !dateObject.m) {
          dateObject.m = collection.indexOf(word) + 1
        }
  
        // Return the length of the word.
        return word.length
      }
  
      // Get the length of the first word in a string.
      function getFirstWordLength(string) {
        return string.match(/\w+/)[0].length
      }
  
      return {
  
        d: function (string, dateObject) {
  
          // If there's string, then get the digits length.
          // Otherwise return the selected date.
          return string ? _.digits(string) : dateObject.date
        },
        dd: function (string, dateObject) {
  
          // If there's a string, then the length is always 2.
          // Otherwise return the selected date with a leading zero.
          return string ? 2 : _.lead(dateObject.date)
        },
        ddd: function (string, dateObject) {
  
          // If there's a string, then get the length of the first word.
          // Otherwise return the short selected weekday.
          return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day]
        },
        dddd: function (string, dateObject) {
  
          // If there's a string, then get the length of the first word.
          // Otherwise return the full selected weekday.
          return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day]
        },
        m: function (string, dateObject) {
  
          // If there's a string, then get the length of the digits
          // Otherwise return the selected month with 0index compensation.
          return string ? _.digits(string) : dateObject.month + 1
        },
        mm: function (string, dateObject) {
  
          // If there's a string, then the length is always 2.
          // Otherwise return the selected month with 0index and leading zero.
          return string ? 2 : _.lead(dateObject.month + 1)
        },
        mmm: function (string, dateObject) {
  
          var collection = this.settings.monthsShort
  
          // If there's a string, get length of the relevant month from the short
          // months collection. Otherwise return the selected month from that collection.
          return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month]
        },
        mmmm: function (string, dateObject) {
  
          var collection = this.settings.monthsFull
  
          // If there's a string, get length of the relevant month from the full
          // months collection. Otherwise return the selected month from that collection.
          return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month]
        },
        yy: function (string, dateObject) {
  
          // If there's a string, then the length is always 2.
          // Otherwise return the selected year by slicing out the first 2 digits.
          return string ? 2 : ('' + dateObject.year).slice(2)
        },
        yyyy: function (string, dateObject) {
  
          // If there's a string, then the length is always 4.
          // Otherwise return the selected year.
          return string ? 4 : dateObject.year
        },
  
        // Create an array by splitting the formatting string passed.
        toArray: function (formatString) {
          return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)
        },
  
        // Format an object into a string using the formatting options.
        toString: function (formatString, itemObject) {
          var calendar = this
          return calendar.formats.toArray(formatString).map(function (label) {
            return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, '')
          }).join('')
        }
      }
    })() //DatePicker.prototype.formats
    /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  
  
  
  
    /**
     * Check if two date units are the exact.
     * /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar 
     */
    DatePicker.prototype.isDateExact = function (one, two) {
  
      var calendar = this
  
      // When we’re working with weekdays, do a direct comparison.
      if (
        (_.isInteger(one) && _.isInteger(two)) ||
        (typeof one == 'boolean' && typeof two == 'boolean')
      ) {
        return one === two
      }
  
      // When we’re working with date representations, compare the “pick” value.
      if (
        (_.isDate(one) || $.isArray(one)) &&
        (_.isDate(two) || $.isArray(two))
      ) {
        return calendar.create(one).pick === calendar.create(two).pick
      }
  
      // When we’re working with range objects, compare the “from” and “to”.
      if ($.isPlainObject(one) && $.isPlainObject(two)) {
        return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to)
      }
  
      return false
    }
  
  
    /**
     * Check if two date units overlap.
     */
    DatePicker.prototype.isDateOverlap = function (one, two) {
  
      var calendar = this,
        firstDay = calendar.settings.firstDay ? 1 : 0
  
      // When we’re working with a weekday index, compare the days.
      if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
        one = one % 7 + firstDay
        return one === calendar.create(two).day + 1
      }
      if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
        two = two % 7 + firstDay
        return two === calendar.create(one).day + 1
      }
  
      // When we’re working with range objects, check if the ranges overlap.
      if ($.isPlainObject(one) && $.isPlainObject(two)) {
        return calendar.overlapRanges(one, two)
      }
  
      return false
    }
  
  
    /**
     * Flip the “enabled” state.
     */
    DatePicker.prototype.flipEnable = function (val) {
      var itemObject = this.item
      itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)
    }
  
  
    /**
     * Mark a collection of dates as “disabled”.
     */
    DatePicker.prototype.deactivate = function (type, datesToDisable) {
  
      var calendar = this,
        disabledItems = calendar.item.disable.slice(0)
  
  
      // If we’re flipping, that’s all we need to do.
      if (datesToDisable == 'flip') {
        calendar.flipEnable()
      } else if (datesToDisable === false) {
        calendar.flipEnable(1)
        disabledItems = []
      } else if (datesToDisable === true) {
        calendar.flipEnable(-1)
        disabledItems = []
      }
  
      // Otherwise go through the dates to disable.
      else {
  
        datesToDisable.map(function (unitToDisable) {
  
          var matchFound
  
          // When we have disabled items, check for matches.
          // If something is matched, immediately break out.
          for (var index = 0; index < disabledItems.length; index += 1) {
            if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
              matchFound = true
              break
            }
          }
  
          // If nothing was found, add the validated unit to the collection.
          if (!matchFound) {
            if (
              _.isInteger(unitToDisable) ||
              _.isDate(unitToDisable) ||
              $.isArray(unitToDisable) ||
              ($.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to)
            ) {
              disabledItems.push(unitToDisable)
            }
          }
        })
      }
  
      // Return the updated collection.
      return disabledItems
    } //DatePicker.prototype.deactivate
  
  
    /**
     * Mark a collection of dates as “enabled”.
     */
    DatePicker.prototype.activate = function (type, datesToEnable) {
  
      var calendar = this,
        disabledItems = calendar.item.disable,
        disabledItemsCount = disabledItems.length
  
      // If we’re flipping, that’s all we need to do.
      if (datesToEnable == 'flip') {
        calendar.flipEnable()
      } else if (datesToEnable === true) {
        calendar.flipEnable(1)
        disabledItems = []
      } else if (datesToEnable === false) {
        calendar.flipEnable(-1)
        disabledItems = []
      }
  
      // Otherwise go through the disabled dates.
      else {
  
        datesToEnable.map(function (unitToEnable) {
  
          var matchFound,
            disabledUnit,
            index,
            isExactRange
  
          // Go through the disabled items and try to find a match.
          for (index = 0; index < disabledItemsCount; index += 1) {
  
            disabledUnit = disabledItems[index]
  
            // When an exact match is found, remove it from the collection.
            if (calendar.isDateExact(disabledUnit, unitToEnable)) {
              matchFound = disabledItems[index] = null
              isExactRange = true
              break
            }
  
            // When an overlapped match is found, add the “inverted” state to it.
            else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
              if ($.isPlainObject(unitToEnable)) {
                unitToEnable.inverted = true
                matchFound = unitToEnable
              } else if ($.isArray(unitToEnable)) {
                matchFound = unitToEnable
                if (!matchFound[3]) matchFound.push('inverted')
              } else if (_.isDate(unitToEnable)) {
                matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted']
              }
              break
            }
          }
  
          // If a match was found, remove a previous duplicate entry.
          if (matchFound)
            for (index = 0; index < disabledItemsCount; index += 1) {
              if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
                disabledItems[index] = null
                break
              }
            }
  
          // In the event that we’re dealing with an exact range of dates,
          // make sure there are no “inverted” dates because of it.
          if (isExactRange)
            for (index = 0; index < disabledItemsCount; index += 1) {
              if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
                disabledItems[index] = null
                break
              }
            }
  
          // If something is still matched, add it into the collection.
          if (matchFound) {
            disabledItems.push(matchFound)
          }
        })
      }
  
      // Return the updated collection.
      return disabledItems.filter(function (val) {
        return val != null
      })
    } //DatePicker.prototype.activate
  
     /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  
    /**
     * Create a string for the nodes in the picker.
     */
    DatePicker.prototype.nodes = function (isOpen) {
  
      var
        calendar = this,
        settings = calendar.settings,
        calendarItem = calendar.item,
        nowObject = calendarItem.now,
        selectedObject = calendarItem.select,
        highlightedObject = calendarItem.highlight,
        viewsetObject = calendarItem.view,
        disabledCollection = calendarItem.disable,
        minLimitObject = calendarItem.min,
        maxLimitObject = calendarItem.max,
  
  
        // Create the calendar table head using a copy of weekday labels collection.
        // * We do a copy so we don't mutate the original array.
        tableHead = (function (collection, fullCollection) {
  
          // If the first day should be Monday, move Sunday to the end.
          if (settings.firstDay) {
            collection.push(collection.shift())
            fullCollection.push(fullCollection.shift())
          }
  
          // Create and return the table head group.
          return _.node(
            'thead',
            _.node(
              'tr',
              _.group({
                min: 0,
                max: DAYS_IN_WEEK - 1,
                i: 1,
                node: 'th',
                item: function (counter) {
                  return [
                    collection[counter],
                    settings.klass.weekdays,
                    'scope=col title="' + fullCollection[counter] + '"'
                  ]
                }
              })
            )
          ) //endreturn
        })((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysShort).slice(0), settings.weekdaysFull.slice(0)), //tableHead
  
  
        // Create the nav for next/prev month.
        createMonthNav = function (next) {
  
          // Otherwise, return the created month tag.
          return _.node(
            'button',
            ' ',
            settings.klass['nav' + (next ? 'Next' : 'Prev')] + (
  
              // If the focused month is outside the range, disabled the button.
              (next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month) ||
              (!next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month) ?
              ' ' + settings.klass.navDisabled : ''
            ),
            'data-nav=' + (next || -1) + ' ' +
            _.ariaAttr({
              role: 'button',
  
              controls: calendar.$node[0].id + '_table'
            }) + ' ' +
            'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev) + '"'
          ) //endreturn
        }, //createMonthNav n a g a r 
  
  
        // Create the month label.
        createMonthLabel = function () {
  
          var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull
  
          // If there are months to select, add a dropdown menu.
          if (settings.selectMonths) {
  
            return _.node('select',
              _.group({
                min: 0,
                max: 11,
                i: 1,
                node: 'option',
                item: function (loopedMonth) {
  
                  return [
  
                    // The looped month and no classes.
                    monthsCollection[loopedMonth], 0,
  
                    // Set the value and selected index.
                    'value=' + loopedMonth +
                    (viewsetObject.month == loopedMonth ? ' selected' : '') +
                    (
                      (
                        (viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month) ||
                        (viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month)
                      ) ?
                      ' disabled' : ''
                    )
                  ]
                }
              }),
              settings.klass.selectMonth,
              (isOpen ? '' : 'disabled') + ' ' +
              _.ariaAttr({
                controls: calendar.$node[0].id + '_table'
              }) + ' ' +
              'title="' + settings.labelMonthSelect + '"'
            )
          }
  
          // If there's a need for a month selector
          return _.node('div', monthsCollection[viewsetObject.month], settings.klass.month)
        }, //createMonthLabel
  
  
        // Create the year label.
        createYearLabel = function () {
  
          var focusedYear = viewsetObject.year,
  
            // If years selector is set to a literal "true", set it to 5. Otherwise
            // divide in half to get half before and half after focused year.
            numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2)
  
          // If there are years to select, add a dropdown menu.
          if (numberYears) {
  
            var
              minYear = minLimitObject.year,
              maxYear = maxLimitObject.year,
              lowestYear = focusedYear - numberYears,
              highestYear = focusedYear + numberYears
  
            // If the min year is greater than the lowest year, increase the highest year
            // by the difference and set the lowest year to the min year.
             /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  
            if (minYear > lowestYear) {
              highestYear += minYear - lowestYear
              lowestYear = minYear
            }
  
            // If the max year is less than the highest year, decrease the lowest year
            // by the lower of the two: available and needed years. Then set the
            // highest year to the max year.  a r y a n n a g a r 2 7 
            if (maxYear < highestYear) {
  
              var availableYears = lowestYear - minYear,
                neededYears = highestYear - maxYear
  
              lowestYear -= availableYears > neededYears ? neededYears : availableYears
              highestYear = maxYear
            }
  
            return _.node('select',
              _.group({
                min: lowestYear,
                max: highestYear,
                i: 1,
                node: 'option',
                item: function (loopedYear) {
                  return [
  
                    // The looped year and no classes.
                    loopedYear, 0,
  
                    // Set the value and selected index.
                    'value=' + loopedYear + (focusedYear == loopedYear ? ' selected' : '')
                  ]
                }
              }),
              settings.klass.selectYear,
              (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({
                controls: calendar.$node[0].id + '_table'
              }) + ' ' +
              'title="' + settings.labelYearSelect + '"'
            )
          }
  
          // Otherwise just return the year focused
          return _.node('div', focusedYear, settings.klass.year)
        } //createYearLabel
  
  
      // Create and return the entire calendar.
      return _.node(
          'div',
          (settings.selectYears ? createYearLabel() + createMonthLabel() : createMonthLabel() + createYearLabel()) +
          createMonthNav() + createMonthNav(1),
          settings.klass.header
        ) + _.node(
          'table',
          tableHead +
          _.node(
            'tbody',
            _.group({
              min: 0,
              max: WEEKS_IN_CALENDAR - 1,
              i: 1,
              node: 'tr',
              item: function (rowCounter) {
  
                // If Monday is the first day and the month starts on Sunday, shift the date back a week.
                var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0
  
                return [
                  _.group({
                    min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
                    max: function () {
                      return this.min + DAYS_IN_WEEK - 1
                    },
                    i: 1,
                    node: 'td',
                    item: function (targetDate) {
  
                      // Convert the time date from a relative date to a target date.
                      targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)])
  
                      var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
                        isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
                        isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
                        formattedDate = _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate])
  
                      return [
                        _.node(
                          'div',
                          targetDate.date,
                          (function (klasses) {
  
                            // Add the `infocus` or `outfocus` classes based on month in view.
                            klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus)
  
                            // Add the `today` class if needed.
                            if (nowObject.pick == targetDate.pick) {
                              klasses.push(settings.klass.now)
                            }
  
                            // Add the `selected` class if something's selected and the time matches.
                            if (isSelected) {
                              klasses.push(settings.klass.selected)
                            }
  
                            // Add the `highlighted` class if something's highlighted and the time matches.
                            if (isHighlighted) {
                              klasses.push(settings.klass.highlighted)
                            }
  
                            // Add the `disabled` class if something's disabled and the object matches.
                            if (isDisabled) {
                              klasses.push(settings.klass.disabled)
                            }
  
                            return klasses.join(' ')
                          })([settings.klass.day]),
                          'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
                            role: 'gridcell',
                            label: formattedDate,
                            selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
                            activedescendant: isHighlighted ? true : null,
                            disabled: isDisabled ? true : null
                          })
                        ),
                        '',
                        _.ariaAttr({
                          role: 'presentation'
                        })
                      ] //endreturn
                    }
                  })
                ] //endreturn
              }
            })
          ),
          settings.klass.table,
          'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
            role: 'grid',
            controls: calendar.$node[0].id,
            readonly: true
          })
        ) +
  
        // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
        _.node(
          'div',
          _.node('button', settings.today, settings.klass.buttonToday,
            'type=button data-pick=' + nowObject.pick +
            (isOpen && !calendar.disabled(nowObject) ? '' : ' disabled') + ' ' +
            _.ariaAttr({
              controls: calendar.$node[0].id
            })) +
          _.node('button', settings.clear, settings.klass.buttonClear,
            'type=button data-clear=1' +
            (isOpen ? '' : ' disabled') + ' ' +
            _.ariaAttr({
              controls: calendar.$node[0].id
            })) +
          _.node('button', settings.close, settings.klass.buttonClose,
            'type=button data-close=true ' +
            (isOpen ? '' : ' disabled') + ' ' +
            _.ariaAttr({
              controls: calendar.$node[0].id
            })),
          settings.klass.footer
        ) //endreturn
    } //DatePicker.prototype.nodes
  
  
  
  
    /**
     * The date picker defaults.
     */
    DatePicker.defaults = (function (prefix) {
  
      return {
  
        // The title label to use for the month nav buttons
        labelMonthNext: 'Next month',
        labelMonthPrev: 'Previous month',
  
        // The title label to use for the dropdown selectors
        labelMonthSelect: 'Select a month',
        labelYearSelect: 'Select a year',
  
        // Months and weekdays
        monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  
        // Today and clear
        today: 'Today',
        clear: 'Clear',
        close: 'Close',
  
        // Picker close behavior
        closeOnSelect: true,
        closeOnClear: true,
  
        // Update input value on select/clear
        updateInput: true,
  
        // The format to show on the `input` element
        format: 'd mmmm, yyyy',
  
        // Classes
        klass: {
  
          table: prefix + 'table',
  
          header: prefix + 'header',
  
          navPrev: prefix + 'nav--prev btn btn-flat',
          navNext: prefix + 'nav--next btn btn-flat',
          navDisabled: prefix + 'nav--disabled',
  
          month: prefix + 'month',
          year: prefix + 'year',
  
          selectMonth: prefix + 'select--month',
          selectYear: prefix + 'select--year',
  
          weekdays: prefix + 'weekday',
  
          day: prefix + 'day',
          disabled: prefix + 'day--disabled',
          selected: prefix + 'day--selected',
          highlighted: prefix + 'day--highlighted',
          now: prefix + 'day--today',
          infocus: prefix + 'day--infocus',
          outfocus: prefix + 'day--outfocus',
  
          footer: prefix + 'footer',
  
          buttonClear: prefix + 'button--clear',
          buttonToday: prefix + 'button--today',
          buttonClose: prefix + 'button--close'
        }
      }
    })(Picker.klasses().picker + '__')
  
  
  
  
  
    /**
     * Extend the picker to add the date picker.
     */
    Picker.extend('pickadate', DatePicker)
  
  
  }));
  
  $.extend($.fn.pickadate.defaults, {
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
  
    onRender: function () {
      var $pickerInstance = this.$root;
  
      var year = this.get('highlight', 'yyyy');
      var day = this.get('highlight', 'dd');
      var month = this.get('highlight', 'mmm');
      var labeldayFirstThreeLetters = this.get('highlight', 'dddd').slice(0, 3);
      var monthFirstUC = month.charAt(0).toUpperCase() + month.slice(1)
  
      $pickerInstance.find('.picker__header').prepend('<div class="picker__date-display"><div class="picker__weekday-display">' + labeldayFirstThreeLetters + ', </div><div class="picker__month-display"><div>' + monthFirstUC + '</div></div><div class="picker__day-display"><div>' + day + '</div></div><div    class="picker__year-display"><div>' + year + '</div></div></div>');
    }
  });
  
  /*!
   * ClockPicker v0.0.7 (http://weareoutman.github.io/clockpicker/)
   * Copyright 2014 Wang Shenwei.
   * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
   *
   * Further modified
   * Copyright 2015 Ching Yaw Hao.
   */
  
  ;(function(){
      var $ = window.jQuery,
              $win = $(window),
              $doc = $(document);
  
      // Can I use inline svg ?
      var svgNS = 'http://www.w3.org/2000/svg',
            svgSupported = 'SVGAngle' in window && (function() {
                var supported,
                  el = document.createElement('div');
                  el.innerHTML = '<svg/>';
                  supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
                  el.innerHTML = '';
                  return supported;
              })();
  
      // Can I use transition ?
      var transitionSupported = (function() {
          var style = document.createElement('div').style;
          return 'transition' in style ||
                       'WebkitTransition' in style ||
                     'MozTransition' in style ||
                       'msTransition' in style ||
                       'OTransition' in style;
      })();
  
      // Listen touch events in touch screen device, instead of mouse events in desktop.
      var touchSupported = 'ontouchstart' in window,
              mousedownEvent = 'mousedown' + ( touchSupported ? ' touchstart' : ''),
              mousemoveEvent = 'mousemove.clockpicker' + ( touchSupported ? ' touchmove.clockpicker' : ''),
              mouseupEvent = 'mouseup.clockpicker' + ( touchSupported ? ' touchend.clockpicker' : '');
  
      // Vibrate the device if supported
      var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;
  
      function createSvgElement(name) {
          return document.createElementNS(svgNS, name);
      }
  
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  }
  
      function leadingZero(num) {
          return (num < 10 ? '0' : '') + num;
      }
  
      // Get a unique id
      var idCounter = 0;
      function uniqueId(prefix) {
          var id = ++idCounter + '';
          return prefix ? prefix + id : id;
      }
  
      // Clock size
      var dialRadius = 135,
              outerRadius = 110,
              // innerRadius = 80 on 12 hour clock
              innerRadius = 80,
              tickRadius = 20,
              diameter = dialRadius * 2,
              duration = transitionSupported ? 350 : 1;
  
      // Popover template
      var tpl = [
          '<div class="clockpicker picker">',
              '<div class="picker__holder">',
                  '<div class="picker__frame">',
                      '<div class="picker__wrap">',
                          '<div class="picker__box">',
                              '<div class="picker__date-display">',
                                  '<div class="clockpicker-display">',
                                      '<div class="clockpicker-display-column">',
                                          '<span class="clockpicker-span-hours text-primary"></span>',
                                          ':',
                                          '<span class="clockpicker-span-minutes"></span>',
                                      '</div>',
                                      '<div class="clockpicker-display-column clockpicker-display-am-pm">',
                                          '<div class="clockpicker-span-am-pm"></div>',
                                      '</div>',
                                  '</div>',
                              '</div>',
                              '<div class="picker__calendar-container">',
                                  '<div class="clockpicker-plate">',
                                      '<div class="clockpicker-canvas"></div>',
                                      '<div class="clockpicker-dial clockpicker-hours"></div>',
                                      '<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>',
                                  '</div>',
                                  '<div class="clockpicker-am-pm-block">',
                                  '</div>',
                              '</div>',
                              '<div class="picker__footer">',
                              '</div>',
                          '</div>',
                      '</div>',
                  '</div>',
              '</div>',
          '</div>'
      ].join('');
  
      // ClockPicker
      function ClockPicker(element, options) {
          var popover = $(tpl),
                  plate = popover.find('.clockpicker-plate'),
                  holder = popover.find('.picker__holder'),
                  hoursView = popover.find('.clockpicker-hours'),
                  minutesView = popover.find('.clockpicker-minutes'),
                  amPmBlock = popover.find('.clockpicker-am-pm-block'),
                  isInput = element.prop('tagName') === 'INPUT',
          input = isInput ? element : element.find('input'),
          isHTML5 = input.prop('type') === 'time',
                  label = $("label[for=" + input.attr("id") + "]"),
                  self = this,
                  timer;
  
          this.id = uniqueId('cp');
          this.element = element;
          this.holder = holder;
          this.options = options;
          this.isAppended = false;
          this.isShown = false;
          this.currentView = 'hours';
          this.isInput = isInput;
          this.input = input;
          this.label = label;
          this.popover = popover;
          this.plate = plate;
          this.hoursView = hoursView;
          this.minutesView = minutesView;
          this.amPmBlock = amPmBlock;
          this.spanHours = popover.find('.clockpicker-span-hours');
          this.spanMinutes = popover.find('.clockpicker-span-minutes');
          this.spanAmPm = popover.find('.clockpicker-span-am-pm');
          this.footer = popover.find('.picker__footer');
          this.amOrPm = "";
  
          // Setup for for 12 hour clock if option is selected
          if (options.twelvehour) {
              var  amPmButtonsTemplate = [
                  '<div class="clockpicker-am-pm-block">',
                      '<button type="button" class="btn-floating btn-flat clockpicker-button clockpicker-am-button">',
                          'AM',
                      '</button>',
                      '<button type="button" class="btn-floating btn-flat clockpicker-button clockpicker-pm-button">',
                          'PM',
                      '</button>',
                  '</div>'
              ].join('');
  
              var amPmButtons = $(amPmButtonsTemplate);
  
              if (!options.ampmclickable) {
                  $('<button type="button" class="btn-floating btn-flat clockpicker-button am-button" tabindex="1">' + "AM" + '</button>').on("click", function() {
                      self.amOrPm = "AM";
                      self.amPmBlock.children('.pm-button').removeClass('active');
                      self.amPmBlock.children('.am-button').addClass('active');
                      self.spanAmPm.empty().append('AM');
                  }).appendTo(this.amPmBlock);
                  $('<button type="button" class="btn-floating btn-flat clockpicker-button pm-button" tabindex="2">' + "PM" + '</button>').on("click", function() {
                      self.amOrPm = 'PM';
                      self.amPmBlock.children('.am-button').removeClass('active');
                      self.amPmBlock.children('.pm-button').addClass('active');
                      self.spanAmPm.empty().append('PM');
                  }).appendTo(this.amPmBlock);
              }
              else {
                  this.spanAmPm.empty();
                  $('<div id="click-am">AM</div>').on("click", function() {
                      self.spanAmPm.children('#click-am').addClass("text-primary");
                      self.spanAmPm.children('#click-pm').removeClass("text-primary");
                      self.amOrPm = "AM";
                  }).appendTo(this.spanAmPm);
                  $('<div id="click-pm">PM</div>').on("click", function() {
                      self.spanAmPm.children('#click-pm').addClass("text-primary");
                      self.spanAmPm.children('#click-am').removeClass("text-primary");
                      self.amOrPm = 'PM';
                  }).appendTo(this.spanAmPm);
              }
          }
  
          if(options.darktheme)
              popover.addClass('darktheme');
  
              // If autoclose is not setted, append a button
          $('<button type="button" class="btn btn-flat clockpicker-button" tabindex="' + (options.twelvehour? '3' : '1') + '">' + options.donetext + '</button>').click($.proxy(this.done, this)).appendTo(this.footer);
  
          $('<button type="button" class="btn btn-flat clockpicker-button" tabindex="' + (options.twelvehour? '4' : '2') + '">' + options.cleartext + '</button>').click($.proxy(this.clearInput, this)).appendTo(this.footer);
          this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
          this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));
  
          // Show or toggle
          input.on('click.clockpicker', debounce( $.proxy(this.show, this), 100));
  
          // Build ticks
          var tickTpl = $('<div class="clockpicker-tick"></div>'),
                  i, tick, radian, radius;
  
          // Hours view
      if (options.twelvehour) {
        for (i = 0; i < 12; i += options.hourstep) {
            tick = tickTpl.clone();
            radian = i / 6 * Math.PI;
            radius = outerRadius;
            tick.css('font-size', '140%');
            tick.css({
                left: dialRadius + Math.sin(radian) * radius - tickRadius,
                top: dialRadius - Math.cos(radian) * radius - tickRadius
            });
            tick.html(i === 0 ? 12 : i);
            hoursView.append(tick);
            tick.on(mousedownEvent, mousedown);
        }
          } else {
        for (i = 0; i < 24; i += options.hourstep) {
          tick = tickTpl.clone();
          radian = i / 6 * Math.PI;
          var inner = i > 0 && i < 13;
          radius = inner ? innerRadius : outerRadius;
          tick.css({
              left: dialRadius + Math.sin(radian) * radius - tickRadius,
              top: dialRadius - Math.cos(radian) * radius - tickRadius
          });
          if (inner) {
              tick.css('font-size', '120%');
          }
          tick.html(i === 0 ? '00' : i);
          hoursView.append(tick);
          tick.on(mousedownEvent, mousedown);
              }
          }
  
      // Minutes view
      var incrementValue = Math.max(options.minutestep, 5);
      for (i = 0; i < 60; i += incrementValue) {
        for (i = 0; i < 60; i += 5) {
          tick = tickTpl.clone();
          radian = i / 30 * Math.PI;
          tick.css({
            left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
            top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
          });
          tick.css('font-size', '140%');
          tick.html(leadingZero(i));
          minutesView.append(tick);
          tick.on(mousedownEvent, mousedown);
        }
      }
  
          // Clicking on minutes view space
          plate.on(mousedownEvent, function(e) {
              if ($(e.target).closest('.clockpicker-tick').length === 0)
                  mousedown(e, true);
          });
  
          // Mousedown or touchstart
          function mousedown(e, space) {
              var offset = plate.offset(),
                      isTouch = /^touch/.test(e.type),
                      x0 = offset.left + dialRadius,
                      y0 = offset.top + dialRadius,
                      dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                      dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
                      z = Math.sqrt(dx * dx + dy * dy),
                      moved = false;
  
              // When clicking on minutes view space, check the mouse position
              if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius))
                  return;
              e.preventDefault();
  
              // Set cursor style of body after 200ms
              var movingTimer = setTimeout(function(){
                  self.popover.addClass('clockpicker-moving');
              }, 200);
  
              // Place the canvas to top
              if (svgSupported)
                  plate.append(self.canvas);
  
              // Clock
              self.setHand(dx, dy, !space, true);
  
              // Mousemove on document
              $doc.off(mousemoveEvent).on(mousemoveEvent, function(e){
                  e.preventDefault();
                  var isTouch = /^touch/.test(e.type),
                          x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                          y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
                  if (! moved && x === dx && y === dy)
                      // Clicking in chrome on windows will trigger a mousemove event
                      return;
                  moved = true;
                  self.setHand(x, y, false, true);
              });
  
              // Mouseup on document
              $doc.off(mouseupEvent).on(mouseupEvent, function(e) {
                  $doc.off(mouseupEvent);
                  e.preventDefault();
                  var isTouch = /^touch/.test(e.type),
                          x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
                          y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
                  if ((space || moved) && x === dx && y === dy)
                      self.setHand(x, y);
                  if (self.currentView === 'hours')
                      self.toggleView('minutes', duration / 2);
                  else
                      if (options.autoclose) {
                          self.minutesView.addClass('clockpicker-dial-out');
                          setTimeout(function(){
                              self.done();
                          }, duration / 2);
                      }
                  plate.prepend(canvas);
  
                  // Reset cursor style of body
                  clearTimeout(movingTimer);
                  self.popover.removeClass('clockpicker-moving');
  
                  // Unbind mousemove event
                  $doc.off(mousemoveEvent);
              });
          }
  
          if (svgSupported) {
              // Draw clock hands and others
              var canvas = popover.find('.clockpicker-canvas'),
                      svg = createSvgElement('svg');
              svg.setAttribute('class', 'clockpicker-svg');
              svg.setAttribute('width', diameter);
              svg.setAttribute('height', diameter);
              var g = createSvgElement('g');
              g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
              var bearing = createSvgElement('circle');
              bearing.setAttribute('class', 'clockpicker-canvas-bearing');
              bearing.setAttribute('cx', 0);
              bearing.setAttribute('cy', 0);
              bearing.setAttribute('r', 2);
              var hand = createSvgElement('line');
              hand.setAttribute('x1', 0);
        hand.setAttribute('y1', 0);
              var bg = createSvgElement('circle');
              bg.setAttribute('class', 'clockpicker-canvas-bg');
              bg.setAttribute('r', tickRadius);
              var fg = createSvgElement('circle');
              fg.setAttribute('class', 'clockpicker-canvas-fg');
              fg.setAttribute('r', 5);
              g.appendChild(hand);
              g.appendChild(bg);
              g.appendChild(fg);
              g.appendChild(bearing);
              svg.appendChild(g);
              canvas.append(svg);
  
              this.hand = hand;
              this.bg = bg;
              this.fg = fg;
              this.bearing = bearing;
              this.g = g;
              this.canvas = canvas;
          }
  
          raiseCallback(this.options.init);
      }
  
      function raiseCallback(callbackFunction) {
          if(callbackFunction && typeof callbackFunction === "function")
              callbackFunction();
      }
  
      // Default options
      ClockPicker.DEFAULTS = {
          'default': '',         // default time, 'now' or '13:14' e.g.
          fromnow: 0,            // set default time to * milliseconds from now (using with default = 'now')
      donetext: 'Done',      // done button text
      cleartext: 'Clear',    // clear button text
          autoclose: false,      // auto close when minute is selected
          ampmclickable: false,  // set am/pm button on itself
          darktheme: false,			 // set to dark theme
          twelvehour: false,     // change to 12 hour AM/PM clock from 24 hour
      vibrate: true,         // vibrate the device when dragging clock hand
      hourstep: 1,           // allow to multi increment the hour
      minutestep: 1,         // allow to multi increment the minute
          ampmSubmit: false,     // allow submit with AM and PM buttons instead of the minute selection/picker
          container: 'body',  	 // set the container selector
      };
  
      // Show or hide popover
      ClockPicker.prototype.toggle = function() {
          this[this.isShown ? 'hide' : 'show']();
      };
  
      // Set popover position
      ClockPicker.prototype.locate = function() {
          var element = this.element,
                  popover = $(this.options.container).append(this.popover),
                  offset = element.offset(),
                  width = element.outerWidth(),
                  height = element.outerHeight(),
                  align = this.options.align,
                  self = this;
  
          this.popover.show();
    };
  
      // The input can be changed by the user
      // So before we can use this.hours/this.minutes we must update it
  ClockPicker.prototype.parseInputValue = function(){
    var value = this.input.prop('value') || this.options['default'] || '';
  
    if (value === 'now') {
        value = new Date(+ new Date() + this.options.fromnow);
    }
    if (value instanceof Date) {
        value = value.getHours() + ':' + value.getMinutes();
    }
  
    value = value.split(':');
  
    // Minutes can have AM/PM that needs to be removed
    this.hours = + value[0] || 0;
    this.minutes = + (value[1] + '').replace(/\D/g, '') || 0;
  
    this.hours = Math.round(this.hours / this.options.hourstep) * this.options.hourstep;
    this.minutes = Math.round(this.minutes / this.options.minutestep) * this.options.minutestep;
  
    if (this.options.twelvehour) {
        var period = (value[1] + '').replace(/\d+/g, '').toLowerCase();
        this.amOrPm = this.hours > 12 || period === 'pm' ? 'PM' : 'AM';
    }
  };
  
      // Show popover
      ClockPicker.prototype.show = function(e){
          // Not show again
          if (this.isShown) {
              return;
          }
          raiseCallback(this.options.beforeShow);
          $(':input').each(function() {
              $(this).attr('tabindex', -1);
          })
          var self = this;
          // Initialize
          this.input.blur();
          this.popover.addClass('picker--opened');
          this.input.addClass('picker__input picker__input--active');
          $(document.body).css('overflow', 'hidden');
          if (!this.isAppended) {
              // Append popover to body
              this.popover.insertAfter(this.input);
              if(this.options.twelvehour) {
                  this.amOrPm = 'PM';
                  if(!this.options.ampmclickable) {
                      this.amPmBlock.children('.am-button').removeClass('active');
                      this.amPmBlock.children('.pm-button').addClass('active');
                      this.spanAmPm.empty().append('PM');
                  }
                  else {
                      this.spanAmPm.children('#click-pm').addClass("text-primary");
                      this.spanAmPm.children('#click-am').removeClass("text-primary");
                  }
              }
              // Reset position when resize
              $win.on('resize.clockpicker' + this.id, function() {
                  if (self.isShown) {
                      self.locate();
                  }
              });
              this.isAppended = true;
          }
          // Get the time
          this.parseInputValue();
          this.spanHours.html(leadingZero(this.hours));
      this.spanMinutes.html(leadingZero(this.minutes));
  
      if (this.options.twelvehour) {
        this.spanAmPm.empty().append(this.amOrPm);
      }
  
          // Toggle to hours view
          this.toggleView('hours');
          // Set position
          this.locate();
          this.isShown = true;
          // Hide when clicking or tabbing on any element except the clock and input
          $doc.on('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id, debounce(function(e) {
              var target = $(e.target);
              if (target.closest(self.popover.find('.picker__wrap')).length === 0 && target.closest(self.input).length === 0)
                  self.hide();
          }, 100));
          // Hide when ESC is pressed
          $doc.on('keyup.clockpicker.' + this.id, debounce( function(e){
              if (e.keyCode === 27)
                  self.hide();
          },100));
          raiseCallback(this.options.afterShow);
      };
      // Hide popover
      ClockPicker.prototype.hide = function() {
          raiseCallback(this.options.beforeHide);
          this.input.removeClass('picker__input picker__input--active');
          this.popover.removeClass('picker--opened');
          $(document.body).css('overflow', 'visible');
          this.isShown = false;
          $(':input').each(function(index) {
              $(this).attr('tabindex', index + 1);
          });
          // Unbinding events on document
          $doc.off('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id);
          $doc.off('keyup.clockpicker.' + this.id);
          this.popover.hide();
          raiseCallback(this.options.afterHide);
      };
      // Toggle to hours or minutes view
      ClockPicker.prototype.toggleView = function(view, delay) {
          var raiseAfterHourSelect = false;
          if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
              raiseCallback(this.options.beforeHourSelect);
              raiseAfterHourSelect = true;
          }
          var isHours = view === 'hours',
                  nextView = isHours ? this.hoursView : this.minutesView,
                  hideView = isHours ? this.minutesView : this.hoursView;
          this.currentView = view;
  
          this.spanHours.toggleClass('text-primary', isHours);
          this.spanMinutes.toggleClass('text-primary', ! isHours);
  
          // Let's make transitions
          hideView.addClass('clockpicker-dial-out');
          nextView.css('visibility', 'visible').removeClass('clockpicker-dial-out');
  
          // Reset clock hand
          this.resetClock(delay);
  
          // After transitions ended
          clearTimeout(this.toggleViewTimer);
          this.toggleViewTimer = setTimeout(function() {
              hideView.css('visibility', 'hidden');
          }, duration);
  
          if (raiseAfterHourSelect)
              raiseCallback(this.options.afterHourSelect);
      };
  
      // Reset clock hand
      ClockPicker.prototype.resetClock = function(delay) {
          var view = this.currentView,
                  value = this[view],
                  isHours = view === 'hours',
                  unit = Math.PI / (isHours ? 6 : 30),
                  radian = value * unit,
                  radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
                  x = Math.sin(radian) * radius,
                  y = - Math.cos(radian) * radius,
                  self = this;
        /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  
          if(svgSupported && delay) {
              self.canvas.addClass('clockpicker-canvas-out');
              setTimeout(function(){
                  self.canvas.removeClass('clockpicker-canvas-out');
                  self.setHand(x, y);
              }, delay);
          } else
              this.setHand(x, y);
      };
  
      // Set clock hand to (x, y)
      ClockPicker.prototype.setHand = function(x, y, roundBy5, dragging) {
          var radian = Math.atan2(x, - y),
                  isHours = this.currentView === 'hours',
                  z = Math.sqrt(x * x + y * y),
                  options = this.options,
                  inner = isHours && z < (outerRadius + innerRadius) / 2,
                  radius = inner ? innerRadius : outerRadius,
                  unit,
          value;
  
          // Calculate the unit
          if (isHours) {
              unit = options.hourstep / 6 * Math.PI
          } else {
              unit = options.minutestep / 30 * Math.PI
          }
  
          if (options.twelvehour)
              radius = outerRadius;
  
          // Radian should in range [0, 2PI]
          if (radian < 0)
              radian = Math.PI * 2 + radian;
  
          // Get the round value
          value = Math.round(radian / unit);
  
          // Get the round radian
          radian = value * unit;
  
          // Correct the hours or minutes
      if (isHours) {
        value *= options.hourstep;
        if (! options.twelvehour && (!inner)==(value>0)) {
            value += 12;
        }
        if (options.twelvehour && value === 0) {
            value = 12;
        }
        if (value === 24) {
            value = 0;
        }
      } else {
        value *= options.minutestep;
        if (value === 60) {
            value = 0;
        }
      }
          if (isHours)
              this.fg.setAttribute('class', 'clockpicker-canvas-fg');
          else {
              if(value % 5 == 0)
                  this.fg.setAttribute('class', 'clockpicker-canvas-fg');
              else
                  this.fg.setAttribute('class', 'clockpicker-canvas-fg active');
          }
  
          // Once hours or minutes changed, vibrate the device
          if (this[this.currentView] !== value)
              if (vibrate && this.options.vibrate)
                  // Do not vibrate too frequently
                  if (! this.vibrateTimer) {
                      navigator[vibrate](10);
                      this.vibrateTimer = setTimeout($.proxy(function(){
                          this.vibrateTimer = null;
                      }, this), 100);
                  }
  
          this[this.currentView] = value;
          this[isHours ? 'spanHours' : 'spanMinutes'].html(leadingZero(value));
  
          // If svg is not supported, just add an active class to the tick
          if (! svgSupported) {
              this[isHours ? 'hoursView' : 'minutesView'].find('.clockpicker-tick').each(function(){
                  var tick = $(this);
                  tick.toggleClass('active', value === + tick.html());
              });
              return;
          }
  
          // Place clock hand at the top when dragging
          if (dragging || (! isHours && value % 5)) {
              this.g.insertBefore(this.hand, this.bearing);
              this.g.insertBefore(this.bg, this.fg);
              this.bg.setAttribute('class', 'clockpicker-canvas-bg clockpicker-canvas-bg-trans');
          } else {
              // Or place it at the bottom
              this.g.insertBefore(this.hand, this.bg);
              this.g.insertBefore(this.fg, this.bg);
              this.bg.setAttribute('class', 'clockpicker-canvas-bg');
          }
  
          // Set clock hand and others' position
      var cx = Math.sin(radian) * radius,
        cy = - Math.cos(radian) * radius;
      this.hand.setAttribute('x2', cx);
      this.hand.setAttribute('y2', cy);
      this.bg.setAttribute('cx', cx);
      this.bg.setAttribute('cy', cy);
      this.fg.setAttribute('cx', cx);
      this.fg.setAttribute('cy', cy);
    };
  
        // Clear clock text
    ClockPicker.prototype.clearInput = function() {
          this.input.val('');
          this.hide();
  
          if(this.options.afterDone && typeof this.options.afterDone === 'function')
              this.options.afterDone(this.input, null);
      };
  
      // Allow user to get time as Date object
      ClockPicker.prototype.getTime = function(callback) {
        this.parseInputValue();
  
        var hours = this.hours;
        if (this.options.twelvehour && hours < 12 && this.amOrPm === 'PM') {
            hours += 12;
        }
  
        var selectedTime = new Date();
        selectedTime.setMinutes(this.minutes)
        selectedTime.setHours(hours);
        selectedTime.setSeconds(0);
  
        return callback && callback.apply(this.element, selectedTime) || selectedTime;
    }
  
      // Hours and minutes are selected
      ClockPicker.prototype.done = function() {
          raiseCallback(this.options.beforeDone);
          this.hide();
          this.label.addClass('active');
  
          var last = this.input.prop('value'),
        outHours = this.hours,
        value = ':' + leadingZero(this.minutes);
  
      if (this.isHTML5 && this.options.twelvehour) {
          if (this.hours < 12 && this.amOrPm === 'PM') {
              outHours += 12;
          }
          if (this.hours === 12 && this.amOrPm === 'AM') {
              outHours = 0;
          }
      }
  
      value = leadingZero(outHours) + value;
  
      if (!this.isHTML5 && this.options.twelvehour) {
            value = value + this.amOrPm;
      }
  
          this.input.prop('value', value);
          if(value !== last) {
              this.input.trigger('change');
              if(!this.isInput)
                  this.element.trigger('change');
          }
  
          if(this.options.autoclose)
              this.input.trigger('blur');
  
          raiseCallback(this.options.afterDone);
      };
  
      // Remove clockpicker from input
      ClockPicker.prototype.remove = function() {
          this.element.removeData('clockpicker');
          this.input.off('focus.clockpicker click.clockpicker');
          if (this.isShown)
              this.hide();
          if (this.isAppended) {
              $win.off('resize.clockpicker' + this.id);
              this.popover.remove();
          }
      };
  
      // Extends $.fn.clockpicker
      $.fn.pickatime = function(option){
          var args = Array.prototype.slice.call(arguments, 1);
          function handleClockPickerRequest(){
              var $this = $(this),
                      data = $this.data('clockpicker');
              if (!data) {
                  var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
                  $this.data('clockpicker', new ClockPicker($this, options));
              } else {
                  // Manual operations. show, hide, remove, e.g.
                  if (typeof data[option] === 'function')
                      data[option].apply(data, args);
              }
      }
      // If we explicitly do a call on a single element then we can return the value (if needed)
      // This allows us, for example, to return the value of getTime
      if (this.length == 1) {
        var returnValue = handleClockPickerRequest.apply(this[0]);
  
        // If we do not have any return value then return the object itself so you can chain
        return returnValue !== undefined ? returnValue : this;
      }
  
      // If we do have a list then we do not care about return values
      return this.each(handleClockPickerRequest);
      };
  }());
  
  /*! PhotoSwipe - v4.1.1 - 2015-12-24
   * http://photoswipe.com
   * Copyright (c) 2015 Dmitry Semenov; */
  ! function (a, b) {
      "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipe = b()
  }(this, function () {
      "use strict";
      var a = function (a, b, c, d) {
          var e = {
              features: null,
              bind: function (a, b, c, d) {
                  var e = (d ? "remove" : "add") + "EventListener";
                  b = b.split(" ");
                  for (var f = 0; f < b.length; f++) b[f] && a[e](b[f], c, !1)
              },
              isArray: function (a) {
                  return a instanceof Array
              },
              createEl: function (a, b) {
                  var c = document.createElement(b || "div");
                  return a && (c.className = a), c
              },
              getScrollY: function () {
                  var a = window.pageYOffset;
                  return void 0 !== a ? a : document.documentElement.scrollTop
              },
              unbind: function (a, b, c) {
                  e.bind(a, b, c, !0)
              },
              removeClass: function (a, b) {
                  var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                  a.className = a.className.replace(c, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
              },
              addClass: function (a, b) {
                  e.hasClass(a, b) || (a.className += (a.className ? " " : "") + b)
              },
              hasClass: function (a, b) {
                  return a.className && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
              },
              getChildByClass: function (a, b) {
                  for (var c = a.firstChild; c;) {
                      if (e.hasClass(c, b)) return c;
                      c = c.nextSibling
                  }
              },
              arraySearch: function (a, b, c) {
                  for (var d = a.length; d--;)
                      if (a[d][c] === b) return d;
                  return -1
              },
              extend: function (a, b, c) {
                  for (var d in b)
                      if (b.hasOwnProperty(d)) {
                          if (c && a.hasOwnProperty(d)) continue;
                          a[d] = b[d]
                      }
              },
              easing: {
                  sine: {
                      out: function (a) {
                          return Math.sin(a * (Math.PI / 2))
                      },
                      inOut: function (a) {
                          return -(Math.cos(Math.PI * a) - 1) / 2
                      }
                  },
                  cubic: {
                      out: function (a) {
                          return --a * a * a + 1
                      }
                  }
              },
              detectFeatures: function () {
                  if (e.features) return e.features;
                  var a = e.createEl(),
                      b = a.style,
                      c = "",
                      d = {};
                  if (d.oldIE = document.all && !document.addEventListener, d.touch = "ontouchstart" in window, window.requestAnimationFrame && (d.raf = window.requestAnimationFrame, d.caf = window.cancelAnimationFrame), d.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !d.pointerEvent) {
                      var f = navigator.userAgent;
                      if (/iP(hone|od)/.test(navigator.platform)) {
                          var g = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                          g && g.length > 0 && (g = parseInt(g[1], 10), g >= 1 && 8 > g && (d.isOldIOSPhone = !0))
                      }
                      var h = f.match(/Android\s([0-9\.]*)/),
                          i = h ? h[1] : 0;
                      i = parseFloat(i), i >= 1 && (4.4 > i && (d.isOldAndroid = !0), d.androidVersion = i), d.isMobileOpera = /opera mini|opera mobi/i.test(f)
                  }
                  for (var j, k, l = ["transform", "perspective", "animationName"], m = ["", "webkit", "Moz", "ms", "O"], n = 0; 4 > n; n++) {
                      c = m[n];
                      for (var o = 0; 3 > o; o++) j = l[o], k = c + (c ? j.charAt(0).toUpperCase() + j.slice(1) : j), !d[j] && k in b && (d[j] = k);
                      c && !d.raf && (c = c.toLowerCase(), d.raf = window[c + "RequestAnimationFrame"], d.raf && (d.caf = window[c + "CancelAnimationFrame"] || window[c + "CancelRequestAnimationFrame"]))
                  }
                  if (!d.raf) {
                      var p = 0;
                      d.raf = function (a) {
                          var b = (new Date).getTime(),
                              c = Math.max(0, 16 - (b - p)),
                              d = window.setTimeout(function () {
                                  a(b + c)
                              }, c);
                          return p = b + c, d
                      }, d.caf = function (a) {
                          clearTimeout(a)
                      }
                  }
                  return d.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, e.features = d, d
              }
          };
          e.detectFeatures(), e.features.oldIE && (e.bind = function (a, b, c, d) {
              b = b.split(" ");
              for (var e, f = (d ? "detach" : "attach") + "Event", g = function () {
                      c.handleEvent.call(c)
                  }, h = 0; h < b.length; h++)
                  if (e = b[h])
                      if ("object" == typeof c && c.handleEvent) {
                          if (d) {
                              if (!c["oldIE" + e]) return !1
                          } else c["oldIE" + e] = g;
                          a[f]("on" + e, c["oldIE" + e])
                      } else a[f]("on" + e, c)
          });
          var f = this,
              g = 25,
              h = 3,
              i = {
                  allowPanToNext: !0,
                  spacing: .12,
                  bgOpacity: 1,
                  mouseUsed: !1,
                  loop: !0,
                  pinchToClose: !0,
                  closeOnScroll: !0,
                  closeOnVerticalDrag: !0,
                  verticalDragRange: .75,
                  hideAnimationDuration: 333,
                  showAnimationDuration: 333,
                  showHideOpacity: !1,
                  focus: !0,
                  escKey: !0,
                  arrowKeys: !0,
                  mainScrollEndFriction: .35,
                  panEndFriction: .35,
                  isClickableElement: function (a) {
                      return "A" === a.tagName
                  },
                  getDoubleTapZoom: function (a, b) {
                      return a ? 1 : b.initialZoomLevel < .7 ? 1 : 1.33
                  },
                  maxSpreadZoom: 1.33,
                  modal: !0,
                  scaleMode: "fit"
              };
          e.extend(i, d);
          var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la = function () {
                  return {
                      x: 0,
                      y: 0
                  }
              },
              ma = la(),
              na = la(),
              oa = la(),
              pa = {},
              qa = 0,
              ra = {},
              sa = la(),
              ta = 0,
              ua = !0,
              va = [],
              wa = {},
              xa = !1,
              ya = function (a, b) {
                  e.extend(f, b.publicMethods), va.push(a)
              },
              za = function (a) {
                  var b = _b();
                  return a > b - 1 ? a - b : 0 > a ? b + a : a
              },
              Aa = {},
              Ba = function (a, b) {
                  return Aa[a] || (Aa[a] = []), Aa[a].push(b)
              },
              Ca = function (a) {
                  var b = Aa[a];
                  if (b) {
                      var c = Array.prototype.slice.call(arguments);
                      c.shift();
                      for (var d = 0; d < b.length; d++) b[d].apply(f, c)
                  }
              },
              Da = function () {
                  return (new Date).getTime()
              },
              Ea = function (a) {
                  ia = a, f.bg.style.opacity = a * i.bgOpacity
              },
              Fa = function (a, b, c, d, e) {
                  (!xa || e && e !== f.currItem) && (d /= e ? e.fitRatio : f.currItem.fitRatio), a[E] = u + b + "px, " + c + "px" + v + " scale(" + d + ")"
              },
              Ga = function (a) {
                  da && (a && (s > f.currItem.fitRatio ? xa || (lc(f.currItem, !1, !0), xa = !0) : xa && (lc(f.currItem), xa = !1)), Fa(da, oa.x, oa.y, s))
              },
              Ha = function (a) {
                  a.container && Fa(a.container.style, a.initialPosition.x, a.initialPosition.y, a.initialZoomLevel, a)
              },
              Ia = function (a, b) {
                  b[E] = u + a + "px, 0px" + v
              },
              Ja = function (a, b) {
                  if (!i.loop && b) {
                      var c = m + (sa.x * qa - a) / sa.x,
                          d = Math.round(a - sb.x);
                      (0 > c && d > 0 || c >= _b() - 1 && 0 > d) && (a = sb.x + d * i.mainScrollEndFriction)
                  }
                  sb.x = a, Ia(a, n)
              },
              Ka = function (a, b) {
                  var c = tb[a] - ra[a];
                  return na[a] + ma[a] + c - c * (b / t)
              },
              La = function (a, b) {
                  a.x = b.x, a.y = b.y, b.id && (a.id = b.id)
              },
              Ma = function (a) {
                  a.x = Math.round(a.x), a.y = Math.round(a.y)
              },
              Na = null,
              Oa = function () {
                  Na && (e.unbind(document, "mousemove", Oa), e.addClass(a, "pswp--has_mouse"), i.mouseUsed = !0, Ca("mouseUsed")), Na = setTimeout(function () {
                      Na = null
                  }, 100)
              },
              Pa = function () {
                  e.bind(document, "keydown", f), N.transform && e.bind(f.scrollWrap, "click", f), i.mouseUsed || e.bind(document, "mousemove", Oa), e.bind(window, "resize scroll", f), Ca("bindEvents")
              },
              Qa = function () {
                  e.unbind(window, "resize", f), e.unbind(window, "scroll", r.scroll), e.unbind(document, "keydown", f), e.unbind(document, "mousemove", Oa), N.transform && e.unbind(f.scrollWrap, "click", f), U && e.unbind(window, p, f), Ca("unbindEvents")
              },
              Ra = function (a, b) {
                  var c = hc(f.currItem, pa, a);
                  return b && (ca = c), c
              },
              Sa = function (a) {
                  return a || (a = f.currItem), a.initialZoomLevel
              },
              Ta = function (a) {
                  return a || (a = f.currItem), a.w > 0 ? i.maxSpreadZoom : 1
              },
              Ua = function (a, b, c, d) {
                  return d === f.currItem.initialZoomLevel ? (c[a] = f.currItem.initialPosition[a], !0) : (c[a] = Ka(a, d), c[a] > b.min[a] ? (c[a] = b.min[a], !0) : c[a] < b.max[a] ? (c[a] = b.max[a], !0) : !1)
              },
              Va = function () {
                  if (E) {
                      var b = N.perspective && !G;
                      return u = "translate" + (b ? "3d(" : "("), void(v = N.perspective ? ", 0px)" : ")")
                  }
                  E = "left", e.addClass(a, "pswp--ie"), Ia = function (a, b) {
                      b.left = a + "px"
                  }, Ha = function (a) {
                      var b = a.fitRatio > 1 ? 1 : a.fitRatio,
                          c = a.container.style,
                          d = b * a.w,
                          e = b * a.h;
                      c.width = d + "px", c.height = e + "px", c.left = a.initialPosition.x + "px", c.top = a.initialPosition.y + "px"
                  }, Ga = function () {
                      if (da) {
                          var a = da,
                              b = f.currItem,
                              c = b.fitRatio > 1 ? 1 : b.fitRatio,
                              d = c * b.w,
                              e = c * b.h;
                          a.width = d + "px", a.height = e + "px", a.left = oa.x + "px", a.top = oa.y + "px"
                      }
                  }
              },
              Wa = function (a) {
                  var b = "";
                  i.escKey && 27 === a.keyCode ? b = "close" : i.arrowKeys && (37 === a.keyCode ? b = "prev" : 39 === a.keyCode && (b = "next")), b && (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault ? a.preventDefault() : a.returnValue = !1, f[b]()))
              },
              Xa = function (a) {
                  a && (X || W || ea || S) && (a.preventDefault(), a.stopPropagation())
              },
              Ya = function () {
                  f.setScrollOffset(0, e.getScrollY())
              },
              Za = {},
              $a = 0,
              _a = function (a) {
                  Za[a] && (Za[a].raf && I(Za[a].raf), $a--, delete Za[a])
              },
              ab = function (a) {
                  Za[a] && _a(a), Za[a] || ($a++, Za[a] = {})
              },
              bb = function () {
                  for (var a in Za) Za.hasOwnProperty(a) && _a(a)
              },
              cb = function (a, b, c, d, e, f, g) {
                  var h, i = Da();
                  ab(a);
                  var j = function () {
                      if (Za[a]) {
                          if (h = Da() - i, h >= d) return _a(a), f(c), void(g && g());
                          f((c - b) * e(h / d) + b), Za[a].raf = H(j)
                      }
                  };
                  j()
              },
              db = {
                  shout: Ca,
                  listen: Ba,
                  viewportSize: pa,
                  options: i,
                  isMainScrollAnimating: function () {
                      return ea
                  },
                  getZoomLevel: function () {
                      return s
                  },
                  getCurrentIndex: function () {
                      return m
                  },
                  isDragging: function () {
                      return U
                  },
                  isZooming: function () {
                      return _
                  },
                  setScrollOffset: function (a, b) {
                      ra.x = a, M = ra.y = b, Ca("updateScrollOffset", ra)
                  },
                  applyZoomPan: function (a, b, c, d) {
                      oa.x = b, oa.y = c, s = a, Ga(d)
                  },
                  init: function () {
                      if (!j && !k) {
                          var c;
                          f.framework = e, f.template = a, f.bg = e.getChildByClass(a, "pswp__bg"), J = a.className, j = !0, N = e.detectFeatures(), H = N.raf, I = N.caf, E = N.transform, L = N.oldIE, f.scrollWrap = e.getChildByClass(a, "pswp__scroll-wrap"), f.container = e.getChildByClass(f.scrollWrap, "pswp__container"), n = f.container.style, f.itemHolders = y = [{
                              el: f.container.children[0],
                              wrap: 0,
                              index: -1
                          }, {
                              el: f.container.children[1],
                              wrap: 0,
                              index: -1
                          }, {
                              el: f.container.children[2],
                              wrap: 0,
                              index: -1
                          }], y[0].el.style.display = y[2].el.style.display = "none", Va(), r = {
                              resize: f.updateSize,
                              scroll: Ya,
                              keydown: Wa,
                              click: Xa
                          };
                          var d = N.isOldIOSPhone || N.isOldAndroid || N.isMobileOpera;
                          for (N.animationName && N.transform && !d || (i.showAnimationDuration = i.hideAnimationDuration = 0), c = 0; c < va.length; c++) f["init" + va[c]]();
                          if (b) {
                              var g = f.ui = new b(f, e);
                              g.init()
                          }
                          Ca("firstUpdate"), m = m || i.index || 0, (isNaN(m) || 0 > m || m >= _b()) && (m = 0), f.currItem = $b(m), (N.isOldIOSPhone || N.isOldAndroid) && (ua = !1), a.setAttribute("aria-hidden", "false"), i.modal && (ua ? a.style.position = "fixed" : (a.style.position = "absolute", a.style.top = e.getScrollY() + "px")), void 0 === M && (Ca("initialLayout"), M = K = e.getScrollY());
                          var l = "pswp--open ";
                          for (i.mainClass && (l += i.mainClass + " "), i.showHideOpacity && (l += "pswp--animate_opacity "), l += G ? "pswp--touch" : "pswp--notouch", l += N.animationName ? " pswp--css_animation" : "", l += N.svg ? " pswp--svg" : "", e.addClass(a, l), f.updateSize(), o = -1, ta = null, c = 0; h > c; c++) Ia((c + o) * sa.x, y[c].el.style);
                          L || e.bind(f.scrollWrap, q, f), Ba("initialZoomInEnd", function () {
                              f.setContent(y[0], m - 1), f.setContent(y[2], m + 1), y[0].el.style.display = y[2].el.style.display = "block", i.focus && a.focus(), Pa()
                          }), f.setContent(y[1], m), f.updateCurrItem(), Ca("afterInit"), ua || (w = setInterval(function () {
                              $a || U || _ || s !== f.currItem.initialZoomLevel || f.updateSize()
                          }, 1e3)), e.addClass(a, "pswp--visible")
                      }
                  },
                  close: function () {
                      j && (j = !1, k = !0, Ca("close"), Qa(), bc(f.currItem, null, !0, f.destroy))
                  },
                  destroy: function () {
                      Ca("destroy"), Wb && clearTimeout(Wb), a.setAttribute("aria-hidden", "true"), a.className = J, w && clearInterval(w), e.unbind(f.scrollWrap, q, f), e.unbind(window, "scroll", f), yb(), bb(), Aa = null
                  },
                  panTo: function (a, b, c) {
                      c || (a > ca.min.x ? a = ca.min.x : a < ca.max.x && (a = ca.max.x), b > ca.min.y ? b = ca.min.y : b < ca.max.y && (b = ca.max.y)), oa.x = a, oa.y = b, Ga()
                  },
                  handleEvent: function (a) {
                      a = a || window.event, r[a.type] && r[a.type](a)
                  },
                  goTo: function (a) {
                      a = za(a);
                      var b = a - m;
                      ta = b, m = a, f.currItem = $b(m), qa -= b, Ja(sa.x * qa), bb(), ea = !1, f.updateCurrItem()
                  },
                  next: function () {
                      f.goTo(m + 1)
                  },
                  prev: function () {
                      f.goTo(m - 1)
                  },
                  updateCurrZoomItem: function (a) {
                      if (a && Ca("beforeChange", 0), y[1].el.children.length) {
                          var b = y[1].el.children[0];
                          da = e.hasClass(b, "pswp__zoom-wrap") ? b.style : null
                      } else da = null;
                      ca = f.currItem.bounds, t = s = f.currItem.initialZoomLevel, oa.x = ca.center.x, oa.y = ca.center.y, a && Ca("afterChange")
                  },
                  invalidateCurrItems: function () {
                      x = !0;
                      for (var a = 0; h > a; a++) y[a].item && (y[a].item.needsUpdate = !0)
                  },
                  updateCurrItem: function (a) {
                      if (0 !== ta) {
                          var b, c = Math.abs(ta);
                          if (!(a && 2 > c)) {
                              f.currItem = $b(m), xa = !1, Ca("beforeChange", ta), c >= h && (o += ta + (ta > 0 ? -h : h), c = h);
                              for (var d = 0; c > d; d++) ta > 0 ? (b = y.shift(), y[h - 1] = b, o++, Ia((o + 2) * sa.x, b.el.style), f.setContent(b, m - c + d + 1 + 1)) : (b = y.pop(), y.unshift(b), o--, Ia(o * sa.x, b.el.style), f.setContent(b, m + c - d - 1 - 1));
                              if (da && 1 === Math.abs(ta)) {
                                  var e = $b(z);
                                  e.initialZoomLevel !== s && (hc(e, pa), lc(e), Ha(e))
                              }
                              ta = 0, f.updateCurrZoomItem(), z = m, Ca("afterChange")
                          }
                      }
                  },
                  updateSize: function (b) {
                      if (!ua && i.modal) {
                          var c = e.getScrollY();
                          if (M !== c && (a.style.top = c + "px", M = c), !b && wa.x === window.innerWidth && wa.y === window.innerHeight) return;
                          wa.x = window.innerWidth, wa.y = window.innerHeight, a.style.height = wa.y + "px"
                      }
                      if (pa.x = f.scrollWrap.clientWidth, pa.y = f.scrollWrap.clientHeight, Ya(), sa.x = pa.x + Math.round(pa.x * i.spacing), sa.y = pa.y, Ja(sa.x * qa), Ca("beforeResize"), void 0 !== o) {
                          for (var d, g, j, k = 0; h > k; k++) d = y[k], Ia((k + o) * sa.x, d.el.style), j = m + k - 1, i.loop && _b() > 2 && (j = za(j)), g = $b(j), g && (x || g.needsUpdate || !g.bounds) ? (f.cleanSlide(g), f.setContent(d, j), 1 === k && (f.currItem = g, f.updateCurrZoomItem(!0)), g.needsUpdate = !1) : -1 === d.index && j >= 0 && f.setContent(d, j), g && g.container && (hc(g, pa), lc(g), Ha(g));
                          x = !1
                      }
                      t = s = f.currItem.initialZoomLevel, ca = f.currItem.bounds, ca && (oa.x = ca.center.x, oa.y = ca.center.y, Ga(!0)), Ca("resize")
                  },
                  zoomTo: function (a, b, c, d, f) {
                      b && (t = s, tb.x = Math.abs(b.x) - oa.x, tb.y = Math.abs(b.y) - oa.y, La(na, oa));
                      var g = Ra(a, !1),
                          h = {};
                      Ua("x", g, h, a), Ua("y", g, h, a);
                      var i = s,
                          j = {
                              x: oa.x,
                              y: oa.y
                          };
                      Ma(h);
                      var k = function (b) {
                          1 === b ? (s = a, oa.x = h.x, oa.y = h.y) : (s = (a - i) * b + i, oa.x = (h.x - j.x) * b + j.x, oa.y = (h.y - j.y) * b + j.y), f && f(b), Ga(1 === b)
                      };
                      c ? cb("customZoomTo", 0, 1, c, d || e.easing.sine.inOut, k) : k(1)
                  }
              },
              eb = 30,
              fb = 10,
              gb = {},
              hb = {},
              ib = {},
              jb = {},
              kb = {},
              lb = [],
              mb = {},
              nb = [],
              ob = {},
              pb = 0,
              qb = la(),
              rb = 0,
              sb = la(),
              tb = la(),
              ub = la(),
              vb = function (a, b) {
                  return a.x === b.x && a.y === b.y
              },
              wb = function (a, b) {
                  return Math.abs(a.x - b.x) < g && Math.abs(a.y - b.y) < g
              },
              xb = function (a, b) {
                  return ob.x = Math.abs(a.x - b.x), ob.y = Math.abs(a.y - b.y), Math.sqrt(ob.x * ob.x + ob.y * ob.y)
              },
              yb = function () {
                  Y && (I(Y), Y = null)
              },
              zb = function () {
                  U && (Y = H(zb), Pb())
              },
              Ab = function () {
                  return !("fit" === i.scaleMode && s === f.currItem.initialZoomLevel)
              },
              Bb = function (a, b) {
                  return a && a !== document ? a.getAttribute("class") && a.getAttribute("class").indexOf("pswp__scroll-wrap") > -1 ? !1 : b(a) ? a : Bb(a.parentNode, b) : !1
              },
              Cb = {},
              Db = function (a, b) {
                  return Cb.prevent = !Bb(a.target, i.isClickableElement), Ca("preventDragEvent", a, b, Cb), Cb.prevent
              },
              Eb = function (a, b) {
                  return b.x = a.pageX, b.y = a.pageY, b.id = a.identifier, b
              },
              Fb = function (a, b, c) {
                  c.x = .5 * (a.x + b.x), c.y = .5 * (a.y + b.y)
              },
              Gb = function (a, b, c) {
                  if (a - P > 50) {
                      var d = nb.length > 2 ? nb.shift() : {};
                      d.x = b, d.y = c, nb.push(d), P = a
                  }
              },
              Hb = function () {
                  var a = oa.y - f.currItem.initialPosition.y;
                  return 1 - Math.abs(a / (pa.y / 2))
              },
              Ib = {},
              Jb = {},
              Kb = [],
              Lb = function (a) {
                  for (; Kb.length > 0;) Kb.pop();
                  return F ? (ka = 0, lb.forEach(function (a) {
                      0 === ka ? Kb[0] = a : 1 === ka && (Kb[1] = a), ka++
                  })) : a.type.indexOf("touch") > -1 ? a.touches && a.touches.length > 0 && (Kb[0] = Eb(a.touches[0], Ib), a.touches.length > 1 && (Kb[1] = Eb(a.touches[1], Jb))) : (Ib.x = a.pageX, Ib.y = a.pageY, Ib.id = "", Kb[0] = Ib), Kb
              },
              Mb = function (a, b) {
                  var c, d, e, g, h = 0,
                      j = oa[a] + b[a],
                      k = b[a] > 0,
                      l = sb.x + b.x,
                      m = sb.x - mb.x;
                  return c = j > ca.min[a] || j < ca.max[a] ? i.panEndFriction : 1, j = oa[a] + b[a] * c, !i.allowPanToNext && s !== f.currItem.initialZoomLevel || (da ? "h" !== fa || "x" !== a || W || (k ? (j > ca.min[a] && (c = i.panEndFriction, h = ca.min[a] - j, d = ca.min[a] - na[a]), (0 >= d || 0 > m) && _b() > 1 ? (g = l, 0 > m && l > mb.x && (g = mb.x)) : ca.min.x !== ca.max.x && (e = j)) : (j < ca.max[a] && (c = i.panEndFriction, h = j - ca.max[a], d = na[a] - ca.max[a]), (0 >= d || m > 0) && _b() > 1 ? (g = l, m > 0 && l < mb.x && (g = mb.x)) : ca.min.x !== ca.max.x && (e = j))) : g = l, "x" !== a) ? void(ea || Z || s > f.currItem.fitRatio && (oa[a] += b[a] * c)) : (void 0 !== g && (Ja(g, !0), Z = g === mb.x ? !1 : !0), ca.min.x !== ca.max.x && (void 0 !== e ? oa.x = e : Z || (oa.x += b.x * c)), void 0 !== g)
              },
              Nb = function (a) {
                  if (!("mousedown" === a.type && a.button > 0)) {
                      if (Zb) return void a.preventDefault();
                      if (!T || "mousedown" !== a.type) {
                          if (Db(a, !0) && a.preventDefault(), Ca("pointerDown"), F) {
                              var b = e.arraySearch(lb, a.pointerId, "id");
                              0 > b && (b = lb.length), lb[b] = {
                                  x: a.pageX,
                                  y: a.pageY,
                                  id: a.pointerId
                              }
                          }
                          var c = Lb(a),
                              d = c.length;
                          $ = null, bb(), U && 1 !== d || (U = ga = !0, e.bind(window, p, f), R = ja = ha = S = Z = X = V = W = !1, fa = null, Ca("firstTouchStart", c), La(na, oa), ma.x = ma.y = 0, La(jb, c[0]), La(kb, jb), mb.x = sa.x * qa, nb = [{
                              x: jb.x,
                              y: jb.y
                          }], P = O = Da(), Ra(s, !0), yb(), zb()), !_ && d > 1 && !ea && !Z && (t = s, W = !1, _ = V = !0, ma.y = ma.x = 0, La(na, oa), La(gb, c[0]), La(hb, c[1]), Fb(gb, hb, ub), tb.x = Math.abs(ub.x) - oa.x, tb.y = Math.abs(ub.y) - oa.y, aa = ba = xb(gb, hb))
                      }
                  }
              },
              Ob = function (a) {
                  if (a.preventDefault(), F) {
                      var b = e.arraySearch(lb, a.pointerId, "id");
                      if (b > -1) {
                          var c = lb[b];
                          c.x = a.pageX, c.y = a.pageY
                      }
                  }
                  if (U) {
                      var d = Lb(a);
                      if (fa || X || _) $ = d;
                      else if (sb.x !== sa.x * qa) fa = "h";
                      else {
                          var f = Math.abs(d[0].x - jb.x) - Math.abs(d[0].y - jb.y);
                          Math.abs(f) >= fb && (fa = f > 0 ? "h" : "v", $ = d)
                      }
                  }
              },
              Pb = function () {
                  if ($) {
                      var a = $.length;
                      if (0 !== a)
                          if (La(gb, $[0]), ib.x = gb.x - jb.x, ib.y = gb.y - jb.y, _ && a > 1) {
                              if (jb.x = gb.x, jb.y = gb.y, !ib.x && !ib.y && vb($[1], hb)) return;
                              La(hb, $[1]), W || (W = !0, Ca("zoomGestureStarted"));
                              var b = xb(gb, hb),
                                  c = Ub(b);
                              c > f.currItem.initialZoomLevel + f.currItem.initialZoomLevel / 15 && (ja = !0);
                              var d = 1,
                                  e = Sa(),
                                  g = Ta();
                              if (e > c)
                                  if (i.pinchToClose && !ja && t <= f.currItem.initialZoomLevel) {
                                      var h = e - c,
                                          j = 1 - h / (e / 1.2);
                                      Ea(j), Ca("onPinchClose", j), ha = !0
                                  } else d = (e - c) / e, d > 1 && (d = 1), c = e - d * (e / 3);
                              else c > g && (d = (c - g) / (6 * e), d > 1 && (d = 1), c = g + d * e);
                              0 > d && (d = 0), aa = b, Fb(gb, hb, qb), ma.x += qb.x - ub.x, ma.y += qb.y - ub.y, La(ub, qb), oa.x = Ka("x", c), oa.y = Ka("y", c), R = c > s, s = c, Ga()
                          } else {
                              if (!fa) return;
                              if (ga && (ga = !1, Math.abs(ib.x) >= fb && (ib.x -= $[0].x - kb.x), Math.abs(ib.y) >= fb && (ib.y -= $[0].y - kb.y)), jb.x = gb.x, jb.y = gb.y, 0 === ib.x && 0 === ib.y) return;
                              if ("v" === fa && i.closeOnVerticalDrag && !Ab()) {
                                  ma.y += ib.y, oa.y += ib.y;
                                  var k = Hb();
                                  return S = !0, Ca("onVerticalDrag", k), Ea(k), void Ga()
                              }
                              Gb(Da(), gb.x, gb.y), X = !0, ca = f.currItem.bounds;
                              var l = Mb("x", ib);
                              l || (Mb("y", ib), Ma(oa), Ga())
                          }
                  }
              },
              Qb = function (a) {
                  if (N.isOldAndroid) {
                      if (T && "mouseup" === a.type) return;
                      a.type.indexOf("touch") > -1 && (clearTimeout(T), T = setTimeout(function () {
                          T = 0
                      }, 600))
                  }
                  Ca("pointerUp"), Db(a, !1) && a.preventDefault();
                  var b;
                  if (F) {
                      var c = e.arraySearch(lb, a.pointerId, "id");
                      if (c > -1)
                          if (b = lb.splice(c, 1)[0], navigator.pointerEnabled) b.type = a.pointerType || "mouse";
                          else {
                              var d = {
                                  4: "mouse",
                                  2: "touch",
                                  3: "pen"
                              };
                              b.type = d[a.pointerType], b.type || (b.type = a.pointerType || "mouse")
                          }
                  }
                  var g, h = Lb(a),
                      j = h.length;
                  if ("mouseup" === a.type && (j = 0), 2 === j) return $ = null, !0;
                  1 === j && La(kb, h[0]), 0 !== j || fa || ea || (b || ("mouseup" === a.type ? b = {
                      x: a.pageX,
                      y: a.pageY,
                      type: "mouse"
                  } : a.changedTouches && a.changedTouches[0] && (b = {
                      x: a.changedTouches[0].pageX,
                      y: a.changedTouches[0].pageY,
                      type: "touch"
                  })), Ca("touchRelease", a, b));
                  var k = -1;
                  if (0 === j && (U = !1, e.unbind(window, p, f), yb(), _ ? k = 0 : -1 !== rb && (k = Da() - rb)), rb = 1 === j ? Da() : -1, g = -1 !== k && 150 > k ? "zoom" : "swipe", _ && 2 > j && (_ = !1, 1 === j && (g = "zoomPointerUp"), Ca("zoomGestureEnded")), $ = null, X || W || ea || S)
                      if (bb(), Q || (Q = Rb()), Q.calculateSwipeSpeed("x"), S) {
                          var l = Hb();
                          if (l < i.verticalDragRange) f.close();
                          else {
                              var m = oa.y,
                                  n = ia;
                              cb("verticalDrag", 0, 1, 300, e.easing.cubic.out, function (a) {
                                  oa.y = (f.currItem.initialPosition.y - m) * a + m, Ea((1 - n) * a + n), Ga()
                              }), Ca("onVerticalDrag", 1)
                          }
                      } else {
                          if ((Z || ea) && 0 === j) {
                              var o = Tb(g, Q);
                              if (o) return;
                              g = "zoomPointerUp"
                          }
                          if (!ea) return "swipe" !== g ? void Vb() : void(!Z && s > f.currItem.fitRatio && Sb(Q))
                      }
              },
              Rb = function () {
                  var a, b, c = {
                      lastFlickOffset: {},
                      lastFlickDist: {},
                      lastFlickSpeed: {},
                      slowDownRatio: {},
                      slowDownRatioReverse: {},
                      speedDecelerationRatio: {},
                      speedDecelerationRatioAbs: {},
                      distanceOffset: {},
                      backAnimDestination: {},
                      backAnimStarted: {},
                      calculateSwipeSpeed: function (d) {
                          nb.length > 1 ? (a = Da() - P + 50, b = nb[nb.length - 2][d]) : (a = Da() - O, b = kb[d]), c.lastFlickOffset[d] = jb[d] - b, c.lastFlickDist[d] = Math.abs(c.lastFlickOffset[d]), c.lastFlickDist[d] > 20 ? c.lastFlickSpeed[d] = c.lastFlickOffset[d] / a : c.lastFlickSpeed[d] = 0, Math.abs(c.lastFlickSpeed[d]) < .1 && (c.lastFlickSpeed[d] = 0), c.slowDownRatio[d] = .95, c.slowDownRatioReverse[d] = 1 - c.slowDownRatio[d], c.speedDecelerationRatio[d] = 1
                      },
                      calculateOverBoundsAnimOffset: function (a, b) {
                          c.backAnimStarted[a] || (oa[a] > ca.min[a] ? c.backAnimDestination[a] = ca.min[a] : oa[a] < ca.max[a] && (c.backAnimDestination[a] = ca.max[a]), void 0 !== c.backAnimDestination[a] && (c.slowDownRatio[a] = .7, c.slowDownRatioReverse[a] = 1 - c.slowDownRatio[a], c.speedDecelerationRatioAbs[a] < .05 && (c.lastFlickSpeed[a] = 0, c.backAnimStarted[a] = !0, cb("bounceZoomPan" + a, oa[a], c.backAnimDestination[a], b || 300, e.easing.sine.out, function (b) {
                              oa[a] = b, Ga()
                          }))))
                      },
                      calculateAnimOffset: function (a) {
                          c.backAnimStarted[a] || (c.speedDecelerationRatio[a] = c.speedDecelerationRatio[a] * (c.slowDownRatio[a] + c.slowDownRatioReverse[a] - c.slowDownRatioReverse[a] * c.timeDiff / 10), c.speedDecelerationRatioAbs[a] = Math.abs(c.lastFlickSpeed[a] * c.speedDecelerationRatio[a]), c.distanceOffset[a] = c.lastFlickSpeed[a] * c.speedDecelerationRatio[a] * c.timeDiff, oa[a] += c.distanceOffset[a])
                      },
                      panAnimLoop: function () {
                          return Za.zoomPan && (Za.zoomPan.raf = H(c.panAnimLoop), c.now = Da(), c.timeDiff = c.now - c.lastNow, c.lastNow = c.now, c.calculateAnimOffset("x"), c.calculateAnimOffset("y"), Ga(), c.calculateOverBoundsAnimOffset("x"), c.calculateOverBoundsAnimOffset("y"), c.speedDecelerationRatioAbs.x < .05 && c.speedDecelerationRatioAbs.y < .05) ? (oa.x = Math.round(oa.x), oa.y = Math.round(oa.y), Ga(), void _a("zoomPan")) : void 0
                      }
                  };
                  return c
              },
              Sb = function (a) {
                  return a.calculateSwipeSpeed("y"), ca = f.currItem.bounds, a.backAnimDestination = {}, a.backAnimStarted = {}, Math.abs(a.lastFlickSpeed.x) <= .05 && Math.abs(a.lastFlickSpeed.y) <= .05 ? (a.speedDecelerationRatioAbs.x = a.speedDecelerationRatioAbs.y = 0, a.calculateOverBoundsAnimOffset("x"), a.calculateOverBoundsAnimOffset("y"), !0) : (ab("zoomPan"), a.lastNow = Da(), void a.panAnimLoop())
              },
              Tb = function (a, b) {
                  var c;
                  ea || (pb = m);
                  var d;
                  if ("swipe" === a) {
                      var g = jb.x - kb.x,
                          h = b.lastFlickDist.x < 10;
                      g > eb && (h || b.lastFlickOffset.x > 20) ? d = -1 : -eb > g && (h || b.lastFlickOffset.x < -20) && (d = 1)
                  }
                  var j;
                  d && (m += d, 0 > m ? (m = i.loop ? _b() - 1 : 0, j = !0) : m >= _b() && (m = i.loop ? 0 : _b() - 1, j = !0), (!j || i.loop) && (ta += d, qa -= d, c = !0));
                  var k, l = sa.x * qa,
                      n = Math.abs(l - sb.x);
                  return c || l > sb.x == b.lastFlickSpeed.x > 0 ? (k = Math.abs(b.lastFlickSpeed.x) > 0 ? n / Math.abs(b.lastFlickSpeed.x) : 333, k = Math.min(k, 400), k = Math.max(k, 250)) : k = 333, pb === m && (c = !1), ea = !0, Ca("mainScrollAnimStart"), cb("mainScroll", sb.x, l, k, e.easing.cubic.out, Ja, function () {
                      bb(), ea = !1, pb = -1, (c || pb !== m) && f.updateCurrItem(), Ca("mainScrollAnimComplete")
                  }), c && f.updateCurrItem(!0), c
              },
              Ub = function (a) {
                  return 1 / ba * a * t
              },
              Vb = function () {
                  var a = s,
                      b = Sa(),
                      c = Ta();
                  b > s ? a = b : s > c && (a = c);
                  var d, g = 1,
                      h = ia;
                  return ha && !R && !ja && b > s ? (f.close(), !0) : (ha && (d = function (a) {
                      Ea((g - h) * a + h)
                  }), f.zoomTo(a, 0, 200, e.easing.cubic.out, d), !0)
              };
          ya("Gestures", {
              publicMethods: {
                  initGestures: function () {
                      var a = function (a, b, c, d, e) {
                          A = a + b, B = a + c, C = a + d, D = e ? a + e : ""
                      };
                      F = N.pointerEvent, F && N.touch && (N.touch = !1), F ? navigator.pointerEnabled ? a("pointer", "down", "move", "up", "cancel") : a("MSPointer", "Down", "Move", "Up", "Cancel") : N.touch ? (a("touch", "start", "move", "end", "cancel"), G = !0) : a("mouse", "down", "move", "up"), p = B + " " + C + " " + D, q = A, F && !G && (G = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), f.likelyTouchDevice = G, r[A] = Nb, r[B] = Ob, r[C] = Qb, D && (r[D] = r[C]), N.touch && (q += " mousedown", p += " mousemove mouseup", r.mousedown = r[A], r.mousemove = r[B], r.mouseup = r[C]), G || (i.allowPanToNext = !1)
                  }
              }
          });
          var Wb, Xb, Yb, Zb, $b, _b, ac, bc = function (b, c, d, g) {
                  Wb && clearTimeout(Wb), Zb = !0, Yb = !0;
                  var h;
                  b.initialLayout ? (h = b.initialLayout, b.initialLayout = null) : h = i.getThumbBoundsFn && i.getThumbBoundsFn(m);
                  var j = d ? i.hideAnimationDuration : i.showAnimationDuration,
                      k = function () {
                          _a("initialZoom"), d ? (f.template.removeAttribute("style"), f.bg.removeAttribute("style")) : (Ea(1), c && (c.style.display = "block"), e.addClass(a, "pswp--animated-in"), Ca("initialZoom" + (d ? "OutEnd" : "InEnd"))), g && g(), Zb = !1
                      };
                  if (!j || !h || void 0 === h.x) return Ca("initialZoom" + (d ? "Out" : "In")), s = b.initialZoomLevel, La(oa, b.initialPosition), Ga(), a.style.opacity = d ? 0 : 1, Ea(1), void(j ? setTimeout(function () {
                      k()
                  }, j) : k());
                  var n = function () {
                      var c = l,
                          g = !f.currItem.src || f.currItem.loadError || i.showHideOpacity;
                      b.miniImg && (b.miniImg.style.webkitBackfaceVisibility = "hidden"), d || (s = h.w / b.w, oa.x = h.x, oa.y = h.y - K, f[g ? "template" : "bg"].style.opacity = .001, Ga()), ab("initialZoom"), d && !c && e.removeClass(a, "pswp--animated-in"), g && (d ? e[(c ? "remove" : "add") + "Class"](a, "pswp--animate_opacity") : setTimeout(function () {
                          e.addClass(a, "pswp--animate_opacity")
                      }, 30)), Wb = setTimeout(function () {
                          if (Ca("initialZoom" + (d ? "Out" : "In")), d) {
                              var f = h.w / b.w,
                                  i = {
                                      x: oa.x,
                                      y: oa.y
                                  },
                                  l = s,
                                  m = ia,
                                  n = function (b) {
                                      1 === b ? (s = f, oa.x = h.x, oa.y = h.y - M) : (s = (f - l) * b + l, oa.x = (h.x - i.x) * b + i.x, oa.y = (h.y - M - i.y) * b + i.y), Ga(), g ? a.style.opacity = 1 - b : Ea(m - b * m)
                                  };
                              c ? cb("initialZoom", 0, 1, j, e.easing.cubic.out, n, k) : (n(1), Wb = setTimeout(k, j + 20))
                          } else s = b.initialZoomLevel, La(oa, b.initialPosition), Ga(), Ea(1), g ? a.style.opacity = 1 : Ea(1), Wb = setTimeout(k, j + 20)
                      }, d ? 25 : 90)
                  };
                  n()
              },
              cc = {},
              dc = [],
              ec = {
                  index: 0,
                  errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                  forceProgressiveLoading: !1,
                  preload: [1, 1],
                  getNumItemsFn: function () {
                      return Xb.length
                  }
              },
              fc = function () {
                  return {
                      center: {
                          x: 0,
                          y: 0
                      },
                      max: {
                          x: 0,
                          y: 0
                      },
                      min: {
                          x: 0,
                          y: 0
                      }
                  }
              },
              gc = function (a, b, c) {
                  var d = a.bounds;
                  d.center.x = Math.round((cc.x - b) / 2), d.center.y = Math.round((cc.y - c) / 2) + a.vGap.top, d.max.x = b > cc.x ? Math.round(cc.x - b) : d.center.x, d.max.y = c > cc.y ? Math.round(cc.y - c) + a.vGap.top : d.center.y, d.min.x = b > cc.x ? 0 : d.center.x, d.min.y = c > cc.y ? a.vGap.top : d.center.y
              },
              hc = function (a, b, c) {
                  if (a.src && !a.loadError) {
                      var d = !c;
                      if (d && (a.vGap || (a.vGap = {
                              top: 0,
                              bottom: 0
                          }), Ca("parseVerticalMargin", a)), cc.x = b.x, cc.y = b.y - a.vGap.top - a.vGap.bottom, d) {
                          var e = cc.x / a.w,
                              f = cc.y / a.h;
                          a.fitRatio = f > e ? e : f;
                          var g = i.scaleMode;
                          "orig" === g ? c = 1 : "fit" === g && (c = a.fitRatio), c > 1 && (c = 1), a.initialZoomLevel = c, a.bounds || (a.bounds = fc())
                      }
                      if (!c) return;
                      return gc(a, a.w * c, a.h * c), d && c === a.initialZoomLevel && (a.initialPosition = a.bounds.center), a.bounds
                  }
                  return a.w = a.h = 0, a.initialZoomLevel = a.fitRatio = 1, a.bounds = fc(), a.initialPosition = a.bounds.center, a.bounds
              },
              ic = function (a, b, c, d, e, g) {
                  b.loadError || d && (b.imageAppended = !0, lc(b, d, b === f.currItem && xa), c.appendChild(d), g && setTimeout(function () {
     /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  
                      b && b.loaded && b.placeholder && (b.placeholder.style.display = "none", b.placeholder = null)
                  }, 500))
              },
              jc = function (a) {
                  a.loading = !0, a.loaded = !1;
                  var b = a.img = e.createEl("pswp__img", "img"),
                      c = function () {
                          a.loading = !1, a.loaded = !0, a.loadComplete ? a.loadComplete(a) : a.img = null, b.onload = b.onerror = null, b = null
                      };
                  return b.onload = c, b.onerror = function () {
                      a.loadError = !0, c()
                  }, b.src = a.src, b
              },
              kc = function (a, b) {
                  return a.src && a.loadError && a.container ? (b && (a.container.innerHTML = ""), a.container.innerHTML = i.errorMsg.replace("%url%", a.src), !0) : void 0
              },
              lc = function (a, b, c) {
                  if (a.src) {
                      b || (b = a.container.lastChild);
                      var d = c ? a.w : Math.round(a.w * a.fitRatio),
                          e = c ? a.h : Math.round(a.h * a.fitRatio);
                      a.placeholder && !a.loaded && (a.placeholder.style.width = d + "px", a.placeholder.style.height = e + "px"), b.style.width = d + "px", b.style.height = e + "px"
                  }
              },
              mc = function () {
                  if (dc.length) {
                      for (var a, b = 0; b < dc.length; b++) a = dc[b], a.holder.index === a.index && ic(a.index, a.item, a.baseDiv, a.img, !1, a.clearPlaceholder);
                      dc = []
                  }
              };
          ya("Controller", {
              publicMethods: {
                  lazyLoadItem: function (a) {
                      a = za(a);
                      var b = $b(a);
                      b && (!b.loaded && !b.loading || x) && (Ca("gettingData", a, b), b.src && jc(b))
                  },
                  initController: function () {
                      e.extend(i, ec, !0), f.items = Xb = c, $b = f.getItemAt, _b = i.getNumItemsFn, ac = i.loop, _b() < 3 && (i.loop = !1), Ba("beforeChange", function (a) {
                          var b, c = i.preload,
                              d = null === a ? !0 : a >= 0,
                              e = Math.min(c[0], _b()),
                              g = Math.min(c[1], _b());
                          for (b = 1;
                              (d ? g : e) >= b; b++) f.lazyLoadItem(m + b);
                          for (b = 1;
                              (d ? e : g) >= b; b++) f.lazyLoadItem(m - b)
                      }), Ba("initialLayout", function () {
                          f.currItem.initialLayout = i.getThumbBoundsFn && i.getThumbBoundsFn(m)
                      }), Ba("mainScrollAnimComplete", mc), Ba("initialZoomInEnd", mc), Ba("destroy", function () {
                          for (var a, b = 0; b < Xb.length; b++) a = Xb[b], a.container && (a.container = null), a.placeholder && (a.placeholder = null), a.img && (a.img = null), a.preloader && (a.preloader = null), a.loadError && (a.loaded = a.loadError = !1);
                          dc = null
                      })
                  },
                  getItemAt: function (a) {
                      return a >= 0 && void 0 !== Xb[a] ? Xb[a] : !1
                  },
                  allowProgressiveImg: function () {
                      return i.forceProgressiveLoading || !G || i.mouseUsed || screen.width > 1200
                  },
                  setContent: function (a, b) {
                      i.loop && (b = za(b));
                      var c = f.getItemAt(a.index);
                      c && (c.container = null);
                      var d, g = f.getItemAt(b);
                      if (!g) return void(a.el.innerHTML = "");
                      Ca("gettingData", b, g), a.index = b, a.item = g;
                      var h = g.container = e.createEl("pswp__zoom-wrap");
                      if (!g.src && g.html && (g.html.tagName ? h.appendChild(g.html) : h.innerHTML = g.html), kc(g), hc(g, pa), !g.src || g.loadError || g.loaded) g.src && !g.loadError && (d = e.createEl("pswp__img", "img"), d.style.opacity = 1, d.src = g.src, lc(g, d), ic(b, g, h, d, !0));
                      else {
                          if (g.loadComplete = function (c) {
                                  if (j) {
                                      if (a && a.index === b) {
                                          if (kc(c, !0)) return c.loadComplete = c.img = null, hc(c, pa), Ha(c), void(a.index === m && f.updateCurrZoomItem());
                                          c.imageAppended ? !Zb && c.placeholder && (c.placeholder.style.display = "none", c.placeholder = null) : N.transform && (ea || Zb) ? dc.push({
                                              item: c,
                                              baseDiv: h,
                                              img: c.img,
                                              index: b,
                                              holder: a,
                                              clearPlaceholder: !0
                                          }) : ic(b, c, h, c.img, ea || Zb, !0)
                                      }
                                      c.loadComplete = null, c.img = null, Ca("imageLoadComplete", b, c)
                                  }
                              }, e.features.transform) {
                              var k = "pswp__img pswp__img--placeholder";
                              k += g.msrc ? "" : " pswp__img--placeholder--blank";
                              var l = e.createEl(k, g.msrc ? "img" : "");
                              g.msrc && (l.src = g.msrc), lc(g, l), h.appendChild(l), g.placeholder = l
                          }
                          g.loading || jc(g), f.allowProgressiveImg() && (!Yb && N.transform ? dc.push({
                              item: g,
                              baseDiv: h,
                              img: g.img,
                              index: b,
                              holder: a
                          }) : ic(b, g, h, g.img, !0, !0))
                      }
                      Yb || b !== m ? Ha(g) : (da = h.style, bc(g, d || g.img)), a.el.innerHTML = "", a.el.appendChild(h)
                  },
                  cleanSlide: function (a) {
                      a.img && (a.img.onload = a.img.onerror = null), a.loaded = a.loading = a.img = a.imageAppended = !1
                  }
              }
          });
          var nc, oc = {},
              pc = function (a, b, c) {
                  var d = document.createEvent("CustomEvent"),
                      e = {
                          origEvent: a,
                          target: a.target,
                          releasePoint: b,
                          pointerType: c || "touch"
                      };
                  d.initCustomEvent("pswpTap", !0, !0, e), a.target.dispatchEvent(d)
              };
          ya("Tap", {
              publicMethods: {
                  initTap: function () {
                      Ba("firstTouchStart", f.onTapStart), Ba("touchRelease", f.onTapRelease), Ba("destroy", function () {
                          oc = {}, nc = null
                      })
                  },
                  onTapStart: function (a) {
                      a.length > 1 && (clearTimeout(nc), nc = null)
                  },
                  onTapRelease: function (a, b) {
                      if (b && !X && !V && !$a) {
                          var c = b;
                          if (nc && (clearTimeout(nc), nc = null, wb(c, oc))) return void Ca("doubleTap", c);
                          if ("mouse" === b.type) return void pc(a, b, "mouse");
                          var d = a.target.tagName.toUpperCase();
                          if ("BUTTON" === d || e.hasClass(a.target, "pswp__single-tap")) return void pc(a, b);
                          La(oc, c), nc = setTimeout(function () {
                              pc(a, b), nc = null
                          }, 300)
                      }
                  }
              }
   /* a r y a n n a g a r 2 7 |  */
    });
          var qc;
          ya("DesktopZoom", {
              publicMethods: {
                  initDesktopZoom: function () {
                      L || (G ? Ba("mouseUsed", function () {
                          f.setupDesktopZoom()
                      }) : f.setupDesktopZoom(!0))
                  },
                  setupDesktopZoom: function (b) {
                      qc = {};
                      var c = "wheel mousewheel DOMMouseScroll";
                      Ba("bindEvents", function () {
                          e.bind(a, c, f.handleMouseWheel)
                      }), Ba("unbindEvents", function () {
                          qc && e.unbind(a, c, f.handleMouseWheel)
                      }), f.mouseZoomedIn = !1;
                      var d, g = function () {
                              f.mouseZoomedIn && (e.removeClass(a, "pswp--zoomed-in"), f.mouseZoomedIn = !1), 1 > s ? e.addClass(a, "pswp--zoom-allowed") : e.removeClass(a, "pswp--zoom-allowed"), h()
                          },
                          h = function () {
                              d && (e.removeClass(a, "pswp--dragging"), d = !1)
                          };
                      Ba("resize", g), Ba("afterChange", g), Ba("pointerDown", function () {
                          f.mouseZoomedIn && (d = !0, e.addClass(a, "pswp--dragging"))
                      }), Ba("pointerUp", h), b || g()
                  },
                  handleMouseWheel: function (a) {
                      if (s <= f.currItem.fitRatio) return i.modal && (!i.closeOnScroll || $a || U ? a.preventDefault() : E && Math.abs(a.deltaY) > 2 && (l = !0, f.close())), !0;
                      if (a.stopPropagation(), qc.x = 0, "deltaX" in a) 1 === a.deltaMode ? (qc.x = 18 * a.deltaX, qc.y = 18 * a.deltaY) : (qc.x = a.deltaX, qc.y = a.deltaY);
                      else if ("wheelDelta" in a) a.wheelDeltaX && (qc.x = -.16 * a.wheelDeltaX), a.wheelDeltaY ? qc.y = -.16 * a.wheelDeltaY : qc.y = -.16 * a.wheelDelta;
                      else {
                          if (!("detail" in a)) return;
                          qc.y = a.detail
                      }
                      Ra(s, !0);
                      var b = oa.x - qc.x,
                          c = oa.y - qc.y;
                      (i.modal || b <= ca.min.x && b >= ca.max.x && c <= ca.min.y && c >= ca.max.y) && a.preventDefault(), f.panTo(b, c)
                  },
                  toggleDesktopZoom: function (b) {
                      b = b || {
                          x: pa.x / 2 + ra.x,
                          y: pa.y / 2 + ra.y
                      };
                      var c = i.getDoubleTapZoom(!0, f.currItem),
                          d = s === c;
                      f.mouseZoomedIn = !d, f.zoomTo(d ? f.currItem.initialZoomLevel : c, b, 333), e[(d ? "remove" : "add") + "Class"](a, "pswp--zoomed-in")
                  }
              }
   /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
    });
          var rc, sc, tc, uc, vc, wc, xc, yc, zc, Ac, Bc, Cc, Dc = {
                  history: !0,
                  galleryUID: 1
              },
              Ec = function () {
                  return Bc.hash.substring(1)
              },
              Fc = function () {
                  rc && clearTimeout(rc), tc && clearTimeout(tc)
              },
              Gc = function () {
                  var a = Ec(),
                      b = {};
                  if (a.length < 5) return b;
                  var c, d = a.split("&");
                  for (c = 0; c < d.length; c++)
                      if (d[c]) {
                          var e = d[c].split("=");
                          e.length < 2 || (b[e[0]] = e[1])
                      }
                  if (i.galleryPIDs) {
                      var f = b.pid;
                      for (b.pid = 0, c = 0; c < Xb.length; c++)
                          if (Xb[c].pid === f) {
                              b.pid = c;
                              break
                          }
                  } else b.pid = parseInt(b.pid, 10) - 1;
                  return b.pid < 0 && (b.pid = 0), b
              },
              Hc = function () {
                  if (tc && clearTimeout(tc), $a || U) return void(tc = setTimeout(Hc, 500));
                  uc ? clearTimeout(sc) : uc = !0;
                  var a = m + 1,
                      b = $b(m);
                  b.hasOwnProperty("pid") && (a = b.pid);
                  var c = xc + "&gid=" + i.galleryUID + "&pid=" + a;
                  yc || -1 === Bc.hash.indexOf(c) && (Ac = !0);
                  var d = Bc.href.split("#")[0] + "#" + c;
                  Cc ? "#" + c !== window.location.hash && history[yc ? "replaceState" : "pushState"]("", document.title, d) : yc ? Bc.replace(d) : Bc.hash = c, yc = !0, sc = setTimeout(function () {
                      uc = !1
                  }, 60)
              };
          ya("History", {
              publicMethods: {
                  initHistory: function () {
                      if (e.extend(i, Dc, !0), i.history) {
                          Bc = window.location, Ac = !1, zc = !1, yc = !1, xc = Ec(), Cc = "pushState" in history, xc.indexOf("gid=") > -1 && (xc = xc.split("&gid=")[0], xc = xc.split("?gid=")[0]), Ba("afterChange", f.updateURL), Ba("unbindEvents", function () {
                              e.unbind(window, "hashchange", f.onHashChange)
                          });
                          var a = function () {
                              wc = !0, zc || (Ac ? history.back() : xc ? Bc.hash = xc : Cc ? history.pushState("", document.title, Bc.pathname + Bc.search) : Bc.hash = ""), Fc()
                          };
                          Ba("unbindEvents", function () {
                              l && a()
                          }), Ba("destroy", function () {
                              wc || a()
                          }), Ba("firstUpdate", function () {
                              m = Gc().pid
                          });
                          var b = xc.indexOf("pid=");
                          b > -1 && (xc = xc.substring(0, b), "&" === xc.slice(-1) && (xc = xc.slice(0, -1))), setTimeout(function () {
                              j && e.bind(window, "hashchange", f.onHashChange)
                          }, 40)
                      }
                  },
                  onHashChange: function () {
                      return Ec() === xc ? (zc = !0, void f.close()) : void(uc || (vc = !0, f.goTo(Gc().pid), vc = !1))
                  },
                  updateURL: function () {
                      Fc(), vc || (yc ? rc = setTimeout(Hc, 800) : Hc())
                  }
              }
          }), e.extend(f, db)
      };
      return a
  });
  
  /*! PhotoSwipe Default UI - 4.1.1 - 2015-12-24
   * http://photoswipe.com
   * Copyright (c) 2015 Dmitry Semenov; */
  ! function (a, b) {
      "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipeUI_Default = b()
  }(this, function () {
      "use strict";
      var a = function (a, b) {
          var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = this,
              w = !1,
              x = !0,
              y = !0,
              z = {
                  barsSize: {
                      top: 44,
                      bottom: "auto"
                  },
                  closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                  timeToIdle: 4e3,
                  timeToIdleOutside: 1e3,
                  loadingIndicatorDelay: 1e3,
                  addCaptionHTMLFn: function (a, b) {
                      return a.title ? (b.children[0].innerHTML = a.title, !0) : (b.children[0].innerHTML = "", !1)
                  },
                  closeEl: !0,
                  captionEl: !0,
                  fullscreenEl: !0,
                  zoomEl: !0,
                  shareEl: !0,
                  counterEl: !0,
                  arrowEl: !0,
                  preloaderEl: !0,
                  tapToClose: !1,
                  tapToToggleControls: !0,
                  clickToCloseNonZoomable: !0,
                  shareButtons: [{
                      id: "facebook",
                      label: "Share on Facebook",
                      url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                  }, {
                      id: "twitter",
                      label: "Tweet",
                      url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                  }, {
                      id: "pinterest",
                      label: "Pin it",
                      url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                  }, {
                      id: "download",
                      label: "Download image",
                      url: "{{raw_image_url}}",
                      download: !0
                  }],
                  getImageURLForShare: function () {
                      return a.currItem.src || ""
                  },
                  getPageURLForShare: function () {
                      return window.location.href
                  },
                  getTextForShare: function () {
                      return a.currItem.title || ""
                  },
                  indexIndicatorSep: " / ",
                  fitControlsWidth: 1200
              },
              A = function (a) {
                  if (r) return !0;
                  a = a || window.event, q.timeToIdle && q.mouseUsed && !k && K();
                  for (var c, d, e = a.target || a.srcElement, f = e.getAttribute("class") || "", g = 0; g < S.length; g++) c = S[g], c.onTap && f.indexOf("pswp__" + c.name) > -1 && (c.onTap(), d = !0);
                  if (d) {
                      a.stopPropagation && a.stopPropagation(), r = !0;
                      var h = b.features.isOldAndroid ? 600 : 30;
                      s = setTimeout(function () {
                          r = !1
                      }, h)
                  }
              },
              B = function () {
                  return !a.likelyTouchDevice || q.mouseUsed || screen.width > q.fitControlsWidth
              },
              C = function (a, c, d) {
                  b[(d ? "add" : "remove") + "Class"](a, "pswp__" + c)
              },
              D = function () {
                  var a = 1 === q.getNumItemsFn();
                  a !== p && (C(d, "ui--one-slide", a), p = a)
              },
              E = function () {
                  C(i, "share-modal--hidden", y)
              },
              F = function () {
                  return y = !y, y ? (b.removeClass(i, "pswp__share-modal--fade-in"), setTimeout(function () {
                      y && E()
                  }, 300)) : (E(), setTimeout(function () {
                      y || b.addClass(i, "pswp__share-modal--fade-in")
                  }, 30)), y || H(), !1
              },
              G = function (b) {
                  b = b || window.event;
                  var c = b.target || b.srcElement;
                  return a.shout("shareLinkClick", b, c), c.href ? c.hasAttribute("download") ? !0 : (window.open(c.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), y || F(), !1) : !1
              },
              H = function () {
                  for (var a, b, c, d, e, f = "", g = 0; g < q.shareButtons.length; g++) a = q.shareButtons[g], c = q.getImageURLForShare(a), d = q.getPageURLForShare(a), e = q.getTextForShare(a), b = a.url.replace("{{url}}", encodeURIComponent(d)).replace("{{image_url}}", encodeURIComponent(c)).replace("{{raw_image_url}}", c).replace("{{text}}", encodeURIComponent(e)), f += '<a href="' + b + '" target="_blank" class="pswp__share--' + a.id + '"' + (a.download ? "download" : "") + ">" + a.label + "</a>", q.parseShareButtonOut && (f = q.parseShareButtonOut(a, f));
                  i.children[0].innerHTML = f, i.children[0].onclick = G
              },
              I = function (a) {
                  for (var c = 0; c < q.closeElClasses.length; c++)
                      if (b.hasClass(a, "pswp__" + q.closeElClasses[c])) return !0
              },
              J = 0,
              K = function () {
                  clearTimeout(u), J = 0, k && v.setIdle(!1)
              },
              L = function (a) {
                  a = a ? a : window.event;
                  var b = a.relatedTarget || a.toElement;
                  b && "HTML" !== b.nodeName || (clearTimeout(u), u = setTimeout(function () {
                      v.setIdle(!0)
                  }, q.timeToIdleOutside))
              },
              M = function () {
                  q.fullscreenEl && !b.features.isOldAndroid && (c || (c = v.getFullscreenAPI()), c ? (b.bind(document, c.eventK, v.updateFullscreen), v.updateFullscreen(), b.addClass(a.template, "pswp--supports-fs")) : b.removeClass(a.template, "pswp--supports-fs"))
              },
              N = function () {
                  q.preloaderEl && (O(!0), l("beforeChange", function () {
                      clearTimeout(o), o = setTimeout(function () {
                          a.currItem && a.currItem.loading ? (!a.allowProgressiveImg() || a.currItem.img && !a.currItem.img.naturalWidth) && O(!1) : O(!0)
                      }, q.loadingIndicatorDelay)
                  }), l("imageLoadComplete", function (b, c) {
                      a.currItem === c && O(!0)
                  }))
              },
              O = function (a) {
                  n !== a && (C(m, "preloader--active", !a), n = a)
              },
              P = function (a) {
                  var c = a.vGap;
                  if (B()) {
                      var g = q.barsSize;
                      if (q.captionEl && "auto" === g.bottom)
                          if (f || (f = b.createEl("pswp__caption pswp__caption--fake"), f.appendChild(b.createEl("pswp__caption__center")), d.insertBefore(f, e), b.addClass(d, "pswp__ui--fit")), q.addCaptionHTMLFn(a, f, !0)) {
                              var h = f.clientHeight;
                              c.bottom = parseInt(h, 10) || 44
                          } else c.bottom = g.top;
                      else c.bottom = "auto" === g.bottom ? 0 : g.bottom;
                      c.top = g.top
                  } else c.top = c.bottom = 0
              },
              Q = function () {
                  q.timeToIdle && l("mouseUsed", function () {
                      b.bind(document, "mousemove", K), b.bind(document, "mouseout", L), t = setInterval(function () {
                          J++, 2 === J && v.setIdle(!0)
                      }, q.timeToIdle / 2)
                  })
              },
              R = function () {
                  l("onVerticalDrag", function (a) {
                      x && .95 > a ? v.hideControls() : !x && a >= .95 && v.showControls()
                  });
                  var a;
                  l("onPinchClose", function (b) {
                      x && .9 > b ? (v.hideControls(), a = !0) : a && !x && b > .9 && v.showControls()
                  }), l("zoomGestureEnded", function () {
                      a = !1, a && !x && v.showControls()
                  })
              },
              S = [{
                  name: "caption",
                  option: "captionEl",
                  onInit: function (a) {
                      e = a
                  }
              }, {
                  name: "share-modal",
                  option: "shareEl",
                  onInit: function (a) {
                      i = a
                  },
                  onTap: function () {
                      F()
                  }
              }, {
                  name: "button--share",
                  option: "shareEl",
                  onInit: function (a) {
                      h = a
                  },
                  onTap: function () {
                      F()
                  }
              }, {
                  name: "button--zoom",
                  option: "zoomEl",
                  onTap: a.toggleDesktopZoom
              }, {
                  name: "counter",
                  option: "counterEl",
                  onInit: function (a) {
                      g = a
                  }
              }, {
                  name: "button--close",
                  option: "closeEl",
                  onTap: a.close
              }, {
                  name: "button--arrow--left",
                  option: "arrowEl",
                  onTap: a.prev
              }, {
                  name: "button--arrow--right",
                  option: "arrowEl",
                  onTap: a.next
              }, {
                  name: "button--fs",
                  option: "fullscreenEl",
                  onTap: function () {
                      c.isFullscreen() ? c.exit() : c.enter()
                  }
              }, {
                  name: "preloader",
                  option: "preloaderEl",
                  onInit: function (a) {
                      m = a
                  }
              }],
              T = function () {
                  var a, c, e, f = function (d) {
                      if (d)
                          for (var f = d.length, g = 0; f > g; g++) {
                              a = d[g], c = a.className;
                              for (var h = 0; h < S.length; h++) e = S[h], c.indexOf("pswp__" + e.name) > -1 && (q[e.option] ? (b.removeClass(a, "pswp__element--disabled"), e.onInit && e.onInit(a)) : b.addClass(a, "pswp__element--disabled"))
                          }
                  };
                  f(d.children);
                  var g = b.getChildByClass(d, "pswp__top-bar");
                  g && f(g.children)
              };
          v.init = function () {
              b.extend(a.options, z, !0), q = a.options, d = b.getChildByClass(a.scrollWrap, "pswp__ui"), l = a.listen, R(), l("beforeChange", v.update), l("doubleTap", function (b) {
                  var c = a.currItem.initialZoomLevel;
                  a.getZoomLevel() !== c ? a.zoomTo(c, b, 333) : a.zoomTo(q.getDoubleTapZoom(!1, a.currItem), b, 333)
              }), l("preventDragEvent", function (a, b, c) {
                  var d = a.target || a.srcElement;
                  d && d.getAttribute("class") && a.type.indexOf("mouse") > -1 && (d.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(d.tagName)) && (c.prevent = !1)
              }), l("bindEvents", function () {
                  b.bind(d, "pswpTap click", A), b.bind(a.scrollWrap, "pswpTap", v.onGlobalTap), a.likelyTouchDevice || b.bind(a.scrollWrap, "mouseover", v.onMouseOver)
              }), l("unbindEvents", function () {
                  y || F(), t && clearInterval(t), b.unbind(document, "mouseout", L), b.unbind(document, "mousemove", K), b.unbind(d, "pswpTap click", A), b.unbind(a.scrollWrap, "pswpTap", v.onGlobalTap), b.unbind(a.scrollWrap, "mouseover", v.onMouseOver), c && (b.unbind(document, c.eventK, v.updateFullscreen), c.isFullscreen() && (q.hideAnimationDuration = 0, c.exit()), c = null)
              }), l("destroy", function () {
                  q.captionEl && (f && d.removeChild(f), b.removeClass(e, "pswp__caption--empty")), i && (i.children[0].onclick = null), b.removeClass(d, "pswp__ui--over-close"), b.addClass(d, "pswp__ui--hidden"), v.setIdle(!1)
              }), q.showAnimationDuration || b.removeClass(d, "pswp__ui--hidden"), l("initialZoomIn", function () {
                  q.showAnimationDuration && b.removeClass(d, "pswp__ui--hidden")
              }), l("initialZoomOut", function () {
                  b.addClass(d, "pswp__ui--hidden")
              }), l("parseVerticalMargin", P), T(), q.shareEl && h && i && (y = !0), D(), Q(), M(), N()
          }, v.setIdle = function (a) {
              k = a, C(d, "ui--idle", a)
          }, v.update = function () {
              x && a.currItem ? (v.updateIndexIndicator(), q.captionEl && (q.addCaptionHTMLFn(a.currItem, e), C(e, "caption--empty", !a.currItem.title)), w = !0) : w = !1, y || F(), D()
          }, v.updateFullscreen = function (d) {
              d && setTimeout(function () {
                  a.setScrollOffset(0, b.getScrollY())
              }, 50), b[(c.isFullscreen() ? "add" : "remove") + "Class"](a.template, "pswp--fs")
          }, v.updateIndexIndicator = function () {
              q.counterEl && (g.innerHTML = a.getCurrentIndex() + 1 + q.indexIndicatorSep + q.getNumItemsFn())
          }, v.onGlobalTap = function (c) {
              c = c || window.event;
              var d = c.target || c.srcElement;
              if (!r)
                  if (c.detail && "mouse" === c.detail.pointerType) {
                      if (I(d)) return void a.close();
                      b.hasClass(d, "pswp__img") && (1 === a.getZoomLevel() && a.getZoomLevel() <= a.currItem.fitRatio ? q.clickToCloseNonZoomable && a.close() : a.toggleDesktopZoom(c.detail.releasePoint))
                  } else if (q.tapToToggleControls && (x ? v.hideControls() : v.showControls()), q.tapToClose && (b.hasClass(d, "pswp__img") || I(d))) return void a.close()
          }, v.onMouseOver = function (a) {
              a = a || window.event;
              var b = a.target || a.srcElement;
              C(d, "ui--over-close", I(b))
          }, v.hideControls = function () {
              b.addClass(d, "pswp__ui--hidden"), x = !1
          }, v.showControls = function () {
              x = !0, w || v.update(), b.removeClass(d, "pswp__ui--hidden")
          }, v.supportsFullscreen = function () {
              var a = document;
              return !!(a.exitFullscreen || a.mozCancelFullScreen || a.webkitExitFullscreen || a.msExitFullscreen)
          }, v.getFullscreenAPI = function () {
              var b, c = document.documentElement,
                  d = "fullscreenchange";
              return c.requestFullscreen ? b = {
                  enterK: "requestFullscreen",
                  exitK: "exitFullscreen",
                  elementK: "fullscreenElement",
                  eventK: d
              } : c.mozRequestFullScreen ? b = {
                  enterK: "mozRequestFullScreen",
                  exitK: "mozCancelFullScreen",
                  elementK: "mozFullScreenElement",
                  eventK: "moz" + d
              } : c.webkitRequestFullscreen ? b = {
                  enterK: "webkitRequestFullscreen",
                  exitK: "webkitExitFullscreen",
                  elementK: "webkitFullscreenElement",
                  eventK: "webkit" + d
              } : c.msRequestFullscreen && (b = {
                  enterK: "msRequestFullscreen",
                  exitK: "msExitFullscreen",
                  elementK: "msFullscreenElement",
                  eventK: "MSFullscreenChange"
              }), b && (b.enter = function () {
                  return j = q.closeOnScroll, q.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK ? a.template[this.enterK]() : void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
              }, b.exit = function () {
                  return q.closeOnScroll = j, document[this.exitK]()
              }, b.isFullscreen = function () {
                  return document[this.elementK]
              }), b
          }
      };
      return a
  });
  
  var initPhotoSwipeFromDOM = function (gallerySelector) {
  
      // parse slide data (url, title, size ...) from DOM elements 
      // (children of gallerySelector)
      var parseThumbnailElements = function (el) {
          var thumbElements = el.childNodes,
              numNodes = thumbElements.length,
              items = [],
              figureEl,
              linkEl,
              size,
              item;
  
          for (var i = 0; i < numNodes; i++) {
  
              figureEl = thumbElements[i]; // <figure> element
  
              // include only element nodes 
              if (figureEl.nodeType !== 1) {
                  continue;
              }
  
              linkEl = figureEl.children[0]; // <a> element
  
              size = linkEl.getAttribute('data-size').split('x');
  
              // create slide object
              item = {
                  src: linkEl.getAttribute('href'),
                  w: parseInt(size[0], 10),
                  h: parseInt(size[1], 10)
              };
  
  
  
              if (figureEl.children.length > 1) {
                  // <figcaption> content
                  item.title = figureEl.children[1].innerHTML;
              }
  
              if (linkEl.children.length > 0) {
                  // <img> thumbnail element, retrieving thumbnail url
                  item.msrc = linkEl.children[0].getAttribute('src');
              }
  
              item.el = figureEl; // save link to element for getThumbBoundsFn
              items.push(item);
          }
  
          return items;
      };
  
      // find nearest parent element
      var closest = function closest(el, fn) {
          return el && (fn(el) ? el : closest(el.parentNode, fn));
      };
  
      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function (e) {
          e = e || window.event;
          e.preventDefault ? e.preventDefault() : e.returnValue = false;
  
          var eTarget = e.target || e.srcElement;
  
          // find root element of slide
          var clickedListItem = closest(eTarget, function (el) {
              return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
          });
  
          if (!clickedListItem) {
              return;
          }
  
          // find index of clicked item by looping through all child nodes
          // alternatively, you may define index via data- attribute
          var clickedGallery = clickedListItem.parentNode,
              childNodes = clickedListItem.parentNode.childNodes,
              numChildNodes = childNodes.length,
              nodeIndex = 0,
              index;
  
          for (var i = 0; i < numChildNodes; i++) {
              if (childNodes[i].nodeType !== 1) {
                  continue;
              }
  
              if (childNodes[i] === clickedListItem) {
                  index = nodeIndex;
                  break;
              }
              nodeIndex++;
          }
  
  
  
          if (index >= 0) {
              // open PhotoSwipe if valid index found
              openPhotoSwipe(index, clickedGallery);
          }
          return false;
      };
  
      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      var photoswipeParseHash = function () {
          var hash = window.location.hash.substring(1),
              params = {};
  
          if (hash.length < 5) {
              return params;
          }
  
          var vars = hash.split('&');
          for (var i = 0; i < vars.length; i++) {
              if (!vars[i]) {
                  continue;
              }
              var pair = vars[i].split('=');
              if (pair.length < 2) {
                  continue;
              }
              params[pair[0]] = pair[1];
          }
  
          if (params.gid) {
              params.gid = parseInt(params.gid, 10);
          }
  
          return params;
      };
  
      var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
          var pswpElement = document.querySelectorAll('.pswp')[0],
              gallery,
              options,
              items;
  
          items = parseThumbnailElements(galleryElement);
  
          // define options (if needed)
          options = {
  
              // define gallery index (for URL)
              galleryUID: galleryElement.getAttribute('data-pswp-uid'),
  
              getThumbBoundsFn: function (index) {
                  // See Options -> getThumbBoundsFn section of documentation for more info
                  var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                      pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                      rect = thumbnail.getBoundingClientRect();
  
                  return {
                      x: rect.left,
                      y: rect.top + pageYScroll,
                      w: rect.width
                  };
              }
  
          };
  
          // PhotoSwipe opened from URL
          if (fromURL) {
              if (options.galleryPIDs) {
                  // parse real index when custom PIDs are used 
                  // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                  for (var j = 0; j < items.length; j++) {
                      if (items[j].pid == index) {
                          options.index = j;
                          break;
                      }
                  }
              } else {
                  // in URL indexes start from 1
                  options.index = parseInt(index, 10) - 1;
              }
          } else {
              options.index = parseInt(index, 10);
          }
  
          // exit if index not found
          if (isNaN(options.index)) {
              return;
          }
  
          if (disableAnimation) {
              options.showAnimationDuration = 0;
          }
  
          // Pass data to PhotoSwipe and initialize it
          gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
          gallery.init();
      };
  
      // loop through all gallery elements and bind events
      var galleryElements = document.querySelectorAll(gallerySelector);
  
      for (var i = 0, l = galleryElements.length; i < l; i++) {
          galleryElements[i].setAttribute('data-pswp-uid', i + 1);
          galleryElements[i].onclick = onThumbnailsClick;
      }
  
      // Parse URL and open gallery if it contains #&pid=3&gid=1
      var hashData = photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
          openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
      }
  };
  
  // execute above function
  initPhotoSwipeFromDOM('.mdb-lightbox');
  /* jSticky Plugin
   * =============
   * Author: Andrew Henderson (@AndrewHenderson)
   * Contributor: Mike Street (@mikestreety)
   * Date: 9/7/2012
   * Update: 09/20/2016
   * Website: http://github.com/andrewhenderson/jsticky/
   * Description: A jQuery plugin that keeps select DOM
   * element(s) in view while scrolling the page.
   */
   /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  
  
  ;(function($) {
  
    $.fn.sticky = function(options) {
      var defaults = {
        topSpacing: 0, // No spacing by default
        zIndex: '', // No default z-index
        stopper: '.sticky-stopper', // Default stopper class, also accepts number value a r y a n  na g a r 2 7 
        stickyClass: false // Class applied to element when it's stuck
      };
      var settings = $.extend({}, defaults, options); // Accepts custom stopper id or class
  
      // Checks if custom z-index was defined
      function checkIndex() {
        if (typeof settings.zIndex == 'number') {
          return true;
        } else {
          return false;
        }
      }
  
      var hasIndex = checkIndex(); // True or false
  
      // Checks if a stopper exists in the DOM or number defined
      function checkStopper() {
        if (0 < $(settings.stopper).length || typeof settings.stopper === 'number') {
          return true;
        } else {
          return false;
        }
      }
      var hasStopper = checkStopper(); // True or false
  
      return this.each(function() {
  
        var $this = $(this);
        var thisHeight = $this.outerHeight();
        var thisWidth = $this.outerWidth();
        var topSpacing = settings.topSpacing;
        var zIndex = settings.zIndex;
        var pushPoint = $this.offset().top - topSpacing; // Point at which the sticky element starts pushing
        var placeholder = $('<div></div>').width(thisWidth).height(thisHeight).addClass('sticky-placeholder'); // Cache a clone sticky element
        var stopper = settings.stopper;
        var $window = $(window);
  
        function stickyScroll() {
  
          var windowTop  = $window.scrollTop(); // Check window's scroll position
          var stopPoint = stopper;
          var parentWidth = $this.parent().width();
  
          placeholder.width(parentWidth)
  
          if ( hasStopper && typeof stopper === 'string' ) {
            var stopperTop = $(stopper).offset().top;
            stopPoint  = (stopperTop - thisHeight) - topSpacing;
          }
  
          if (pushPoint < windowTop) {
            // Create a placeholder for sticky element to occupy vertical real estate
  /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  
            if(settings.stickyClass)
              $this.addClass(settings.stickyClass);
  
            $this.after(placeholder).css({
              position: 'fixed',
              top: topSpacing,
              width: parentWidth
            });
  
            if (hasIndex) {
              $this.css({
                zIndex: zIndex
              });
            }
  
            if (hasStopper) {
              if (stopPoint < windowTop) {
                var diff = (stopPoint - windowTop) + topSpacing;
                $this.css({
                  top: diff
                });
              }
            }
          } else {
            if(settings.stickyClass)
              $this.removeClass(settings.stickyClass);
  
            $this.css({
              position: 'static',
              top: null,
              left: null,
              width: 'auto'
            });
  
            placeholder.remove();
          }
        }
  
        if($window.innerHeight() > thisHeight) {
  
          $window.bind('scroll', stickyScroll);
          $window.bind('load', stickyScroll);
          $window.bind('resize', stickyScroll);
        }
      });
    };
  })(jQuery);
  /*!
   * perfect-scrollbar v1.4.0
   * (c) 2018 Hyunje Jun
   * @license MIT
   */
  !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.PerfectScrollbar=e()}(this,function(){"use strict";function t(t){return getComputedStyle(t)}function e(t,e){for(var i in e){var r=e[i];"number"==typeof r&&(r+="px"),t.style[i]=r}return t}function i(t){var e=document.createElement("div");return e.className=t,e}function r(t,e){if(!v)throw new Error("No element matching method supported");return v.call(t,e)}function l(t){t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)}function n(t,e){return Array.prototype.filter.call(t.children,function(t){return r(t,e)})}function o(t,e){var i=t.element.classList,r=m.state.scrolling(e);i.contains(r)?clearTimeout(Y[e]):i.add(r)}function s(t,e){Y[e]=setTimeout(function(){return t.isAlive&&t.element.classList.remove(m.state.scrolling(e))},t.settings.scrollingThreshold)}function a(t,e){o(t,e),s(t,e)}function c(t){if("function"==typeof window.CustomEvent)return new CustomEvent(t);var e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,void 0),e}function h(t,e,i,r,l){var n=i[0],o=i[1],s=i[2],h=i[3],u=i[4],d=i[5];void 0===r&&(r=!0),void 0===l&&(l=!1);var f=t.element;t.reach[h]=null,f[s]<1&&(t.reach[h]="start"),f[s]>t[n]-t[o]-1&&(t.reach[h]="end"),e&&(f.dispatchEvent(c("ps-scroll-"+h)),e<0?f.dispatchEvent(c("ps-scroll-"+u)):e>0&&f.dispatchEvent(c("ps-scroll-"+d)),r&&a(t,h)),t.reach[h]&&(e||l)&&f.dispatchEvent(c("ps-"+h+"-reach-"+t.reach[h]))}function u(t){return parseInt(t,10)||0}function d(t){return r(t,"input,[contenteditable]")||r(t,"select,[contenteditable]")||r(t,"textarea,[contenteditable]")||r(t,"button,[contenteditable]")}function f(e){var i=t(e);return u(i.width)+u(i.paddingLeft)+u(i.paddingRight)+u(i.borderLeftWidth)+u(i.borderRightWidth)}function p(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function b(t,i){var r={width:i.railXWidth},l=Math.floor(t.scrollTop);i.isRtl?r.left=i.negativeScrollAdjustment+t.scrollLeft+i.containerWidth-i.contentWidth:r.left=t.scrollLeft,i.isScrollbarXUsingBottom?r.bottom=i.scrollbarXBottom-l:r.top=i.scrollbarXTop+l,e(i.scrollbarXRail,r);var n={top:l,height:i.railYHeight};i.isScrollbarYUsingRight?i.isRtl?n.right=i.contentWidth-(i.negativeScrollAdjustment+t.scrollLeft)-i.scrollbarYRight-i.scrollbarYOuterWidth:n.right=i.scrollbarYRight-t.scrollLeft:i.isRtl?n.left=i.negativeScrollAdjustment+t.scrollLeft+2*i.containerWidth-i.contentWidth-i.scrollbarYLeft-i.scrollbarYOuterWidth:n.left=i.scrollbarYLeft+t.scrollLeft,e(i.scrollbarYRail,n),e(i.scrollbarX,{left:i.scrollbarXLeft,width:i.scrollbarXWidth-i.railBorderXWidth}),e(i.scrollbarY,{top:i.scrollbarYTop,height:i.scrollbarYHeight-i.railBorderYWidth})}function g(t,e){function i(e){b[d]=g+Y*(e[a]-v),o(t,f),R(t),e.stopPropagation(),e.preventDefault()}function r(){s(t,f),t[p].classList.remove(m.state.clicking),t.event.unbind(t.ownerDocument,"mousemove",i)}var l=e[0],n=e[1],a=e[2],c=e[3],h=e[4],u=e[5],d=e[6],f=e[7],p=e[8],b=t.element,g=null,v=null,Y=null;t.event.bind(t[h],"mousedown",function(e){g=b[d],v=e[a],Y=(t[n]-t[l])/(t[c]-t[u]),t.event.bind(t.ownerDocument,"mousemove",i),t.event.once(t.ownerDocument,"mouseup",r),t[p].classList.add(m.state.clicking),e.stopPropagation(),e.preventDefault()})}var v="undefined"!=typeof Element&&(Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector),m={main:"ps",element:{thumb:function(t){return"ps__thumb-"+t},rail:function(t){return"ps__rail-"+t},consuming:"ps__child--consume"},state:{focus:"ps--focus",clicking:"ps--clicking",active:function(t){return"ps--active-"+t},scrolling:function(t){return"ps--scrolling-"+t}}},Y={x:null,y:null},X=function(t){this.element=t,this.handlers={}},w={isEmpty:{configurable:!0}};X.prototype.bind=function(t,e){void 0===this.handlers[t]&&(this.handlers[t]=[]),this.handlers[t].push(e),this.element.addEventListener(t,e,!1)},X.prototype.unbind=function(t,e){var i=this;this.handlers[t]=this.handlers[t].filter(function(r){return!(!e||r===e)||(i.element.removeEventListener(t,r,!1),!1)})},X.prototype.unbindAll=function(){var t=this;for(var e in t.handlers)t.unbind(e)},w.isEmpty.get=function(){var t=this;return Object.keys(this.handlers).every(function(e){return 0===t.handlers[e].length})},Object.defineProperties(X.prototype,w);var y=function(){this.eventElements=[]};y.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return e||(e=new X(t),this.eventElements.push(e)),e},y.prototype.bind=function(t,e,i){this.eventElement(t).bind(e,i)},y.prototype.unbind=function(t,e,i){var r=this.eventElement(t);r.unbind(e,i),r.isEmpty&&this.eventElements.splice(this.eventElements.indexOf(r),1)},y.prototype.unbindAll=function(){this.eventElements.forEach(function(t){return t.unbindAll()}),this.eventElements=[]},y.prototype.once=function(t,e,i){var r=this.eventElement(t),l=function(t){r.unbind(e,l),i(t)};r.bind(e,l)};var W=function(t,e,i,r,l){void 0===r&&(r=!0),void 0===l&&(l=!1);var n;if("top"===e)n=["contentHeight","containerHeight","scrollTop","y","up","down"];else{if("left"!==e)throw new Error("A proper axis should be provided");n=["contentWidth","containerWidth","scrollLeft","x","left","right"]}h(t,i,n,r,l)},L={isWebKit:"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style,supportsTouch:"undefined"!=typeof window&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),supportsIePointer:"undefined"!=typeof navigator&&navigator.msMaxTouchPoints,isChrome:"undefined"!=typeof navigator&&/Chrome/i.test(navigator&&navigator.userAgent)},R=function(t){var e=t.element,i=Math.floor(e.scrollTop);t.containerWidth=e.clientWidth,t.containerHeight=e.clientHeight,t.contentWidth=e.scrollWidth,t.contentHeight=e.scrollHeight,e.contains(t.scrollbarXRail)||(n(e,m.element.rail("x")).forEach(function(t){return l(t)}),e.appendChild(t.scrollbarXRail)),e.contains(t.scrollbarYRail)||(n(e,m.element.rail("y")).forEach(function(t){return l(t)}),e.appendChild(t.scrollbarYRail)),!t.settings.suppressScrollX&&t.containerWidth+t.settings.scrollXMarginOffset<t.contentWidth?(t.scrollbarXActive=!0,t.railXWidth=t.containerWidth-t.railXMarginWidth,t.railXRatio=t.containerWidth/t.railXWidth,t.scrollbarXWidth=p(t,u(t.railXWidth*t.containerWidth/t.contentWidth)),t.scrollbarXLeft=u((t.negativeScrollAdjustment+e.scrollLeft)*(t.railXWidth-t.scrollbarXWidth)/(t.contentWidth-t.containerWidth))):t.scrollbarXActive=!1,!t.settings.suppressScrollY&&t.containerHeight+t.settings.scrollYMarginOffset<t.contentHeight?(t.scrollbarYActive=!0,t.railYHeight=t.containerHeight-t.railYMarginHeight,t.railYRatio=t.containerHeight/t.railYHeight,t.scrollbarYHeight=p(t,u(t.railYHeight*t.containerHeight/t.contentHeight)),t.scrollbarYTop=u(i*(t.railYHeight-t.scrollbarYHeight)/(t.contentHeight-t.containerHeight))):t.scrollbarYActive=!1,t.scrollbarXLeft>=t.railXWidth-t.scrollbarXWidth&&(t.scrollbarXLeft=t.railXWidth-t.scrollbarXWidth),t.scrollbarYTop>=t.railYHeight-t.scrollbarYHeight&&(t.scrollbarYTop=t.railYHeight-t.scrollbarYHeight),b(e,t),t.scrollbarXActive?e.classList.add(m.state.active("x")):(e.classList.remove(m.state.active("x")),t.scrollbarXWidth=0,t.scrollbarXLeft=0,e.scrollLeft=0),t.scrollbarYActive?e.classList.add(m.state.active("y")):(e.classList.remove(m.state.active("y")),t.scrollbarYHeight=0,t.scrollbarYTop=0,e.scrollTop=0)},T={"click-rail":function(t){t.event.bind(t.scrollbarY,"mousedown",function(t){return t.stopPropagation()}),t.event.bind(t.scrollbarYRail,"mousedown",function(e){var i=e.pageY-window.pageYOffset-t.scrollbarYRail.getBoundingClientRect().top>t.scrollbarYTop?1:-1;t.element.scrollTop+=i*t.containerHeight,R(t),e.stopPropagation()}),t.event.bind(t.scrollbarX,"mousedown",function(t){return t.stopPropagation()}),t.event.bind(t.scrollbarXRail,"mousedown",function(e){var i=e.pageX-window.pageXOffset-t.scrollbarXRail.getBoundingClientRect().left>t.scrollbarXLeft?1:-1;t.element.scrollLeft+=i*t.containerWidth,R(t),e.stopPropagation()})},"drag-thumb":function(t){g(t,["containerWidth","contentWidth","pageX","railXWidth","scrollbarX","scrollbarXWidth","scrollLeft","x","scrollbarXRail"]),g(t,["containerHeight","contentHeight","pageY","railYHeight","scrollbarY","scrollbarYHeight","scrollTop","y","scrollbarYRail"])},keyboard:function(t){function e(e,r){var l=Math.floor(i.scrollTop);if(0===e){if(!t.scrollbarYActive)return!1;if(0===l&&r>0||l>=t.contentHeight-t.containerHeight&&r<0)return!t.settings.wheelPropagation}var n=i.scrollLeft;if(0===r){if(!t.scrollbarXActive)return!1;if(0===n&&e<0||n>=t.contentWidth-t.containerWidth&&e>0)return!t.settings.wheelPropagation}return!0}var i=t.element,l=function(){return r(i,":hover")},n=function(){return r(t.scrollbarX,":focus")||r(t.scrollbarY,":focus")};t.event.bind(t.ownerDocument,"keydown",function(r){if(!(r.isDefaultPrevented&&r.isDefaultPrevented()||r.defaultPrevented)&&(l()||n())){var o=document.activeElement?document.activeElement:t.ownerDocument.activeElement;if(o){if("IFRAME"===o.tagName)o=o.contentDocument.activeElement;else for(;o.shadowRoot;)o=o.shadowRoot.activeElement;if(d(o))return}var s=0,a=0;switch(r.which){case 37:s=r.metaKey?-t.contentWidth:r.altKey?-t.containerWidth:-30;break;case 38:a=r.metaKey?t.contentHeight:r.altKey?t.containerHeight:30;break;case 39:s=r.metaKey?t.contentWidth:r.altKey?t.containerWidth:30;break;case 40:a=r.metaKey?-t.contentHeight:r.altKey?-t.containerHeight:-30;break;case 32:a=r.shiftKey?t.containerHeight:-t.containerHeight;break;case 33:a=t.containerHeight;break;case 34:a=-t.containerHeight;break;case 36:a=t.contentHeight;break;case 35:a=-t.contentHeight;break;default:return}t.settings.suppressScrollX&&0!==s||t.settings.suppressScrollY&&0!==a||(i.scrollTop-=a,i.scrollLeft+=s,R(t),e(s,a)&&r.preventDefault())}})},wheel:function(e){function i(t,i){var r=Math.floor(o.scrollTop),l=0===o.scrollTop,n=r+o.offsetHeight===o.scrollHeight,s=0===o.scrollLeft,a=o.scrollLeft+o.offsetWidth===o.scrollWidth;return!(Math.abs(i)>Math.abs(t)?l||n:s||a)||!e.settings.wheelPropagation}function r(t){var e=t.deltaX,i=-1*t.deltaY;return void 0!==e&&void 0!==i||(e=-1*t.wheelDeltaX/6,i=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,i*=10),e!==e&&i!==i&&(e=0,i=t.wheelDelta),t.shiftKey?[-i,-e]:[e,i]}function l(e,i,r){if(!L.isWebKit&&o.querySelector("select:focus"))return!0;if(!o.contains(e))return!1;for(var l=e;l&&l!==o;){if(l.classList.contains(m.element.consuming))return!0;var n=t(l);if([n.overflow,n.overflowX,n.overflowY].join("").match(/(scroll|auto)/)){var s=l.scrollHeight-l.clientHeight;if(s>0&&!(0===l.scrollTop&&r>0||l.scrollTop===s&&r<0))return!0;var a=l.scrollWidth-l.clientWidth;if(a>0&&!(0===l.scrollLeft&&i<0||l.scrollLeft===a&&i>0))return!0}l=l.parentNode}return!1}function n(t){var n=r(t),s=n[0],a=n[1];if(!l(t.target,s,a)){var c=!1;e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(a?o.scrollTop-=a*e.settings.wheelSpeed:o.scrollTop+=s*e.settings.wheelSpeed,c=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(s?o.scrollLeft+=s*e.settings.wheelSpeed:o.scrollLeft-=a*e.settings.wheelSpeed,c=!0):(o.scrollTop-=a*e.settings.wheelSpeed,o.scrollLeft+=s*e.settings.wheelSpeed),R(e),(c=c||i(s,a))&&!t.ctrlKey&&(t.stopPropagation(),t.preventDefault())}}var o=e.element;void 0!==window.onwheel?e.event.bind(o,"wheel",n):void 0!==window.onmousewheel&&e.event.bind(o,"mousewheel",n)},touch:function(e){function i(t,i){var r=Math.floor(h.scrollTop),l=h.scrollLeft,n=Math.abs(t),o=Math.abs(i);if(o>n){if(i<0&&r===e.contentHeight-e.containerHeight||i>0&&0===r)return 0===window.scrollY&&i>0&&L.isChrome}else if(n>o&&(t<0&&l===e.contentWidth-e.containerWidth||t>0&&0===l))return!0;return!0}function r(t,i){h.scrollTop-=i,h.scrollLeft-=t,R(e)}function l(t){return t.targetTouches?t.targetTouches[0]:t}function n(t){return!(t.pointerType&&"pen"===t.pointerType&&0===t.buttons||(!t.targetTouches||1!==t.targetTouches.length)&&(!t.pointerType||"mouse"===t.pointerType||t.pointerType===t.MSPOINTER_TYPE_MOUSE))}function o(t){if(n(t)){var e=l(t);u.pageX=e.pageX,u.pageY=e.pageY,d=(new Date).getTime(),null!==p&&clearInterval(p)}}function s(e,i,r){if(!h.contains(e))return!1;for(var l=e;l&&l!==h;){if(l.classList.contains(m.element.consuming))return!0;var n=t(l);if([n.overflow,n.overflowX,n.overflowY].join("").match(/(scroll|auto)/)){var o=l.scrollHeight-l.clientHeight;if(o>0&&!(0===l.scrollTop&&r>0||l.scrollTop===o&&r<0))return!0;var s=l.scrollLeft-l.clientWidth;if(s>0&&!(0===l.scrollLeft&&i<0||l.scrollLeft===s&&i>0))return!0}l=l.parentNode}return!1}function a(t){if(n(t)){var e=l(t),o={pageX:e.pageX,pageY:e.pageY},a=o.pageX-u.pageX,c=o.pageY-u.pageY;if(s(t.target,a,c))return;r(a,c),u=o;var h=(new Date).getTime(),p=h-d;p>0&&(f.x=a/p,f.y=c/p,d=h),i(a,c)&&t.preventDefault()}}function c(){e.settings.swipeEasing&&(clearInterval(p),p=setInterval(function(){e.isInitialized?clearInterval(p):f.x||f.y?Math.abs(f.x)<.01&&Math.abs(f.y)<.01?clearInterval(p):(r(30*f.x,30*f.y),f.x*=.8,f.y*=.8):clearInterval(p)},10))}if(L.supportsTouch||L.supportsIePointer){var h=e.element,u={},d=0,f={},p=null;L.supportsTouch?(e.event.bind(h,"touchstart",o),e.event.bind(h,"touchmove",a),e.event.bind(h,"touchend",c)):L.supportsIePointer&&(window.PointerEvent?(e.event.bind(h,"pointerdown",o),e.event.bind(h,"pointermove",a),e.event.bind(h,"pointerup",c)):window.MSPointerEvent&&(e.event.bind(h,"MSPointerDown",o),e.event.bind(h,"MSPointerMove",a),e.event.bind(h,"MSPointerUp",c)))}}},H=function(r,l){var n=this;if(void 0===l&&(l={}),"string"==typeof r&&(r=document.querySelector(r)),!r||!r.nodeName)throw new Error("no element is specified to initialize PerfectScrollbar");this.element=r,r.classList.add(m.main),this.settings={handlers:["click-rail","drag-thumb","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollingThreshold:1e3,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipeEasing:!0,useBothWheelAxes:!1,wheelPropagation:!0,wheelSpeed:1};for(var o in l)n.settings[o]=l[o];this.containerWidth=null,this.containerHeight=null,this.contentWidth=null,this.contentHeight=null;var s=function(){return r.classList.add(m.state.focus)},a=function(){return r.classList.remove(m.state.focus)};this.isRtl="rtl"===t(r).direction,this.isNegativeScroll=function(){var t=r.scrollLeft,e=null;return r.scrollLeft=-1,e=r.scrollLeft<0,r.scrollLeft=t,e}(),this.negativeScrollAdjustment=this.isNegativeScroll?r.scrollWidth-r.clientWidth:0,this.event=new y,this.ownerDocument=r.ownerDocument||document,this.scrollbarXRail=i(m.element.rail("x")),r.appendChild(this.scrollbarXRail),this.scrollbarX=i(m.element.thumb("x")),this.scrollbarXRail.appendChild(this.scrollbarX),this.scrollbarX.setAttribute("tabindex",0),this.event.bind(this.scrollbarX,"focus",s),this.event.bind(this.scrollbarX,"blur",a),this.scrollbarXActive=null,this.scrollbarXWidth=null,this.scrollbarXLeft=null;var c=t(this.scrollbarXRail);this.scrollbarXBottom=parseInt(c.bottom,10),isNaN(this.scrollbarXBottom)?(this.isScrollbarXUsingBottom=!1,this.scrollbarXTop=u(c.top)):this.isScrollbarXUsingBottom=!0,this.railBorderXWidth=u(c.borderLeftWidth)+u(c.borderRightWidth),e(this.scrollbarXRail,{display:"block"}),this.railXMarginWidth=u(c.marginLeft)+u(c.marginRight),e(this.scrollbarXRail,{display:""}),this.railXWidth=null,this.railXRatio=null,this.scrollbarYRail=i(m.element.rail("y")),r.appendChild(this.scrollbarYRail),this.scrollbarY=i(m.element.thumb("y")),this.scrollbarYRail.appendChild(this.scrollbarY),this.scrollbarY.setAttribute("tabindex",0),this.event.bind(this.scrollbarY,"focus",s),this.event.bind(this.scrollbarY,"blur",a),this.scrollbarYActive=null,this.scrollbarYHeight=null,this.scrollbarYTop=null;var h=t(this.scrollbarYRail);this.scrollbarYRight=parseInt(h.right,10),isNaN(this.scrollbarYRight)?(this.isScrollbarYUsingRight=!1,this.scrollbarYLeft=u(h.left)):this.isScrollbarYUsingRight=!0,this.scrollbarYOuterWidth=this.isRtl?f(this.scrollbarY):null,this.railBorderYWidth=u(h.borderTopWidth)+u(h.borderBottomWidth),e(this.scrollbarYRail,{display:"block"}),this.railYMarginHeight=u(h.marginTop)+u(h.marginBottom),e(this.scrollbarYRail,{display:""}),this.railYHeight=null,this.railYRatio=null,this.reach={x:r.scrollLeft<=0?"start":r.scrollLeft>=this.contentWidth-this.containerWidth?"end":null,y:r.scrollTop<=0?"start":r.scrollTop>=this.contentHeight-this.containerHeight?"end":null},this.isAlive=!0,this.settings.handlers.forEach(function(t){return T[t](n)}),this.lastScrollTop=Math.floor(r.scrollTop),this.lastScrollLeft=r.scrollLeft,this.event.bind(this.element,"scroll",function(t){return n.onScroll(t)}),R(this)};return H.prototype.update=function(){this.isAlive&&(this.negativeScrollAdjustment=this.isNegativeScroll?this.element.scrollWidth-this.element.clientWidth:0,e(this.scrollbarXRail,{display:"block"}),e(this.scrollbarYRail,{display:"block"}),this.railXMarginWidth=u(t(this.scrollbarXRail).marginLeft)+u(t(this.scrollbarXRail).marginRight),this.railYMarginHeight=u(t(this.scrollbarYRail).marginTop)+u(t(this.scrollbarYRail).marginBottom),e(this.scrollbarXRail,{display:"none"}),e(this.scrollbarYRail,{display:"none"}),R(this),W(this,"top",0,!1,!0),W(this,"left",0,!1,!0),e(this.scrollbarXRail,{display:""}),e(this.scrollbarYRail,{display:""}))},H.prototype.onScroll=function(t){this.isAlive&&(R(this),W(this,"top",this.element.scrollTop-this.lastScrollTop),W(this,"left",this.element.scrollLeft-this.lastScrollLeft),this.lastScrollTop=Math.floor(this.element.scrollTop),this.lastScrollLeft=this.element.scrollLeft)},H.prototype.destroy=function(){this.isAlive&&(this.event.unbindAll(),l(this.scrollbarX),l(this.scrollbarY),l(this.scrollbarXRail),l(this.scrollbarYRail),this.removePsClasses(),this.element=null,this.scrollbarX=null,this.scrollbarY=null,this.scrollbarXRail=null,this.scrollbarYRail=null,this.isAlive=!1)},H.prototype.removePsClasses=function(){this.element.className=this.element.className.split(" ").filter(function(t){return!t.match(/^ps([-_].+|)$/)}).join(" ")},H});
  /*!
   * Name    : Just Another Parallax [Jarallax]
   * Version : 1.10.4
   * Author  : nK <https://nkdev.info>
   * GitHub  : https://github.com/nk-o/jarallax
   */
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
   /* a r y a n n a g a r 2 7 | a ry = an *n a g3 ar */
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
  /******/ 		if(mode & 1) value = __webpack_require__(value);
  /******/ 		if(mode & 8) return value;
  /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  /******/ 		var ns = Object.create(null);
  /******/ 		__webpack_require__.r(ns);
  /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  /******/ 		return ns;
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 11);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */,
  /* 1 */,
  /* 2 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  module.exports = function (callback) {
  
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
          // Already ready or interactive, execute callback
          callback.call();
      } else if (document.attachEvent) {
          // Old browsers
          document.attachEvent('onreadystatechange', function () {
              if (document.readyState === 'interactive') callback.call();
          });
      } else if (document.addEventListener) {
          // Modern browsers
          document.addEventListener('DOMContentLoaded', callback);
      }
  };
  
  /***/ }),
  /* 3 */,
  /* 4 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  /* WEBPACK VAR INJECTION */(function(global) {
  
  var win;
  
  if (typeof window !== "undefined") {
      win = window;
  } else if (typeof global !== "undefined") {
      win = global;
  } else if (typeof self !== "undefined") {
      win = self;
  } else {
      win = {};
  }
  
  module.exports = win;
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))
  
  /***/ }),
  /* 5 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
  var g;
  
  // This works in non-strict mode
  g = function () {
      return this;
  }();
  
  try {
      // This works if eval is allowed (see CSP)
      g = g || Function("return this")() || (1, eval)("this");
  } catch (e) {
      // This works if the window reference is available
      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
  }
  
  // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}
  
  module.exports = g;
  
  /***/ }),
  /* 6 */,
  /* 7 */,
  /* 8 */,
  /* 9 */,
  /* 10 */,
  /* 11 */
  /***/ (function(module, exports, __webpack_require__) {
  
  module.exports = __webpack_require__(12);
  
  
  /***/ }),
  /* 12 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
  var _liteReady = __webpack_require__(2);
  
  var _liteReady2 = _interopRequireDefault(_liteReady);
  
  var _global = __webpack_require__(4);
  
  var _jarallax = __webpack_require__(13);
  
  var _jarallax2 = _interopRequireDefault(_jarallax);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // no conflict
  var oldPlugin = _global.window.jarallax;
  _global.window.jarallax = _jarallax2.default;
  _global.window.jarallax.noConflict = function () {
      _global.window.jarallax = oldPlugin;
      return this;
  };
  
  // jQuery support
  if (typeof _global.jQuery !== 'undefined') {
      var jQueryPlugin = function jQueryPlugin() {
          var args = arguments || [];
          Array.prototype.unshift.call(args, this);
          var res = _jarallax2.default.apply(_global.window, args);
          return (typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object' ? res : this;
      };
      jQueryPlugin.constructor = _jarallax2.default.constructor;
  
      // no conflict
      var oldJqPlugin = _global.jQuery.fn.jarallax;
      _global.jQuery.fn.jarallax = jQueryPlugin;
      _global.jQuery.fn.jarallax.noConflict = function () {
          _global.jQuery.fn.jarallax = oldJqPlugin;
          return this;
      };
  }
  
  // data-jarallax initialization
  (0, _liteReady2.default)(function () {
      (0, _jarallax2.default)(document.querySelectorAll('[data-jarallax]'));
  });
  
  /***/ }),
  /* 13 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  /* WEBPACK VAR INJECTION */(function(global) {
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
  
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
  var _liteReady = __webpack_require__(2);
  
  var _liteReady2 = _interopRequireDefault(_liteReady);
  
  var _rafl = __webpack_require__(14);
  
  var _rafl2 = _interopRequireDefault(_rafl);
  
  var _global = __webpack_require__(4);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var isIE = navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1 || navigator.userAgent.indexOf('Edge/') > -1;
  
  var supportTransform = function () {
      var prefixes = 'transform WebkitTransform MozTransform'.split(' ');
      var div = document.createElement('div');
      for (var i = 0; i < prefixes.length; i++) {
          if (div && div.style[prefixes[i]] !== undefined) {
              return prefixes[i];
          }
      }
      return false;
  }();
  
  // Window data
  var wndW = void 0;
  var wndH = void 0;
  var wndY = void 0;
  var forceResizeParallax = false;
  var forceScrollParallax = false;
  function updateWndVars(e) {
      wndW = _global.window.innerWidth || document.documentElement.clientWidth;
      wndH = _global.window.innerHeight || document.documentElement.clientHeight;
      if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && (e.type === 'load' || e.type === 'dom-loaded')) {
          forceResizeParallax = true;
      }
  }
  updateWndVars();
  _global.window.addEventListener('resize', updateWndVars);
  _global.window.addEventListener('orientationchange', updateWndVars);
  _global.window.addEventListener('load', updateWndVars);
  (0, _liteReady2.default)(function () {
      updateWndVars({
          type: 'dom-loaded'
      });
  });
  
  // list with all jarallax instances
  // need to render all in one scroll/resize event
  var jarallaxList = [];
  
  // Animate if changed window size or scrolled page
  var oldPageData = false;
  function updateParallax() {
      if (!jarallaxList.length) {
          return;
      }
  
      if (_global.window.pageYOffset !== undefined) {
          wndY = _global.window.pageYOffset;
      } else {
          wndY = (document.documentElement || document.body.parentNode || document.body).scrollTop;
      }
  
      var isResized = forceResizeParallax || !oldPageData || oldPageData.width !== wndW || oldPageData.height !== wndH;
      var isScrolled = forceScrollParallax || isResized || !oldPageData || oldPageData.y !== wndY;
  
      forceResizeParallax = false;
      forceScrollParallax = false;
  
      if (isResized || isScrolled) {
          jarallaxList.forEach(function (item) {
              if (isResized) {
                  item.onResize();
              }
              if (isScrolled) {
                  item.onScroll();
              }
          });
  
          oldPageData = {
              width: wndW,
              height: wndH,
              y: wndY
          };
      }
  
      (0, _rafl2.default)(updateParallax);
  }
  
  // ResizeObserver
  var resizeObserver = global.ResizeObserver ? new global.ResizeObserver(function (entry) {
      if (entry && entry.length) {
          (0, _rafl2.default)(function () {
              entry.forEach(function (item) {
                  if (item.target && item.target.jarallax) {
                      if (!forceResizeParallax) {
                          item.target.jarallax.onResize();
                      }
                      forceScrollParallax = true;
                  }
              });
          });
      }
  }) : false;
  
  var instanceID = 0;
  
  // Jarallax class
  
  var Jarallax = function () {
      function Jarallax(item, userOptions) {
          _classCallCheck(this, Jarallax);
  
          var self = this;
  
          self.instanceID = instanceID++;
  
          self.$item = item;
  
          self.defaults = {
              type: 'scroll', // type of parallax: scroll, scale, opacity, scale-opacity, scroll-opacity
              speed: 0.5, // supported value from -1 to 2
              imgSrc: null,
              imgElement: '.jarallax-img',
              imgSize: 'cover',
              imgPosition: '50% 50%',
              imgRepeat: 'no-repeat', // supported only for background, not for <img> tag
              keepImg: false, // keep <img> tag in it's default place
              elementInViewport: null,
              zIndex: -100,
              disableParallax: false,
              disableVideo: false,
              automaticResize: true, // use ResizeObserver to recalculate position and size of parallax image
  
              // video
              videoSrc: null,
              videoStartTime: 0,
              videoEndTime: 0,
              videoVolume: 0,
              videoPlayOnlyVisible: true,
  
              // events
              onScroll: null, // function(calculations) {}
              onInit: null, // function() {}
              onDestroy: null, // function() {}
              onCoverImage: null // function() {}
          };
  
          // DEPRECATED: old data-options
          var deprecatedDataAttribute = self.$item.getAttribute('data-jarallax');
          var oldDataOptions = JSON.parse(deprecatedDataAttribute || '{}');
          if (deprecatedDataAttribute) {
              // eslint-disable-next-line no-console
              console.warn('Detected usage of deprecated data-jarallax JSON options, you should use pure data-attribute options. See info here - https://github.com/nk-o/jarallax/issues/53');
          }
  
          // prepare data-options
          var dataOptions = self.$item.dataset || {};
          var pureDataOptions = {};
          Object.keys(dataOptions).forEach(function (key) {
              var loweCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);
              if (loweCaseOption && typeof self.defaults[loweCaseOption] !== 'undefined') {
                  pureDataOptions[loweCaseOption] = dataOptions[key];
              }
          });
  
          self.options = self.extend({}, self.defaults, oldDataOptions, pureDataOptions, userOptions);
          self.pureOptions = self.extend({}, self.options);
  
          // prepare 'true' and 'false' strings to boolean
          Object.keys(self.options).forEach(function (key) {
              if (self.options[key] === 'true') {
                  self.options[key] = true;
              } else if (self.options[key] === 'false') {
                  self.options[key] = false;
              }
          });
  
          // fix speed option [-1.0, 2.0]
          self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed)));
  
          // deprecated noAndroid and noIos options
          if (self.options.noAndroid || self.options.noIos) {
              // eslint-disable-next-line no-console
              console.warn('Detected usage of deprecated noAndroid or noIos options, you should use disableParallax option. See info here - https://github.com/nk-o/jarallax/#disable-on-mobile-devices');
  
              // prepare fallback if disableParallax option is not used
              if (!self.options.disableParallax) {
                  if (self.options.noIos && self.options.noAndroid) {
                      self.options.disableParallax = /iPad|iPhone|iPod|Android/;
                  } else if (self.options.noIos) {
                      self.options.disableParallax = /iPad|iPhone|iPod/;
                  } else if (self.options.noAndroid) {
                      self.options.disableParallax = /Android/;
                  }
              }
          }
  
          // prepare disableParallax callback
          if (typeof self.options.disableParallax === 'string') {
              self.options.disableParallax = new RegExp(self.options.disableParallax);
          }
          if (self.options.disableParallax instanceof RegExp) {
              var disableParallaxRegexp = self.options.disableParallax;
              self.options.disableParallax = function () {
                  return disableParallaxRegexp.test(navigator.userAgent);
              };
          }
          if (typeof self.options.disableParallax !== 'function') {
              self.options.disableParallax = function () {
                  return false;
              };
          }
  
          // prepare disableVideo callback
          if (typeof self.options.disableVideo === 'string') {
              self.options.disableVideo = new RegExp(self.options.disableVideo);
          }
          if (self.options.disableVideo instanceof RegExp) {
              var disableVideoRegexp = self.options.disableVideo;
              self.options.disableVideo = function () {
                  return disableVideoRegexp.test(navigator.userAgent);
              };
          }
          if (typeof self.options.disableVideo !== 'function') {
              self.options.disableVideo = function () {
                  return false;
              };
          }
  
          // custom element to check if parallax in viewport
          var elementInVP = self.options.elementInViewport;
          // get first item from array
          if (elementInVP && (typeof elementInVP === 'undefined' ? 'undefined' : _typeof(elementInVP)) === 'object' && typeof elementInVP.length !== 'undefined') {
              var _elementInVP = elementInVP;
  
              var _elementInVP2 = _slicedToArray(_elementInVP, 1);
  
              elementInVP = _elementInVP2[0];
          }
          // check if dom element
          if (!(elementInVP instanceof Element)) {
              elementInVP = null;
          }
          self.options.elementInViewport = elementInVP;
  
          self.image = {
              src: self.options.imgSrc || null,
              $container: null,
              useImgTag: false,
  
              // position fixed is needed for the most of browsers because absolute position have glitches
              // on MacOS with smooth scroll there is a huge lags with absolute position - https://github.com/nk-o/jarallax/issues/75
              // on mobile devices better scrolled with absolute position
              position: /iPad|iPhone|iPod|Android/.test(navigator.userAgent) ? 'absolute' : 'fixed'
          };
  
          if (self.initImg() && self.canInitParallax()) {
              self.init();
          }
      }
  
      // add styles to element
  
  
      _createClass(Jarallax, [{
          key: 'css',
          value: function css(el, styles) {
              if (typeof styles === 'string') {
                  return _global.window.getComputedStyle(el).getPropertyValue(styles);
              }
  
              // add transform property with vendor prefix
              if (styles.transform && supportTransform) {
                  styles[supportTransform] = styles.transform;
              }
  
              Object.keys(styles).forEach(function (key) {
                  el.style[key] = styles[key];
              });
              return el;
          }
  
          // Extend like jQuery.extend
  
      }, {
          key: 'extend',
          value: function extend(out) {
              var _arguments = arguments;
  
              out = out || {};
              Object.keys(arguments).forEach(function (i) {
                  if (!_arguments[i]) {
                      return;
                  }
                  Object.keys(_arguments[i]).forEach(function (key) {
                      out[key] = _arguments[i][key];
                  });
              });
              return out;
          }
  
          // get window size and scroll position. Useful for extensions
  
      }, {
          key: 'getWindowData',
          value: function getWindowData() {
              return {
                  width: wndW,
                  height: wndH,
                  y: wndY
              };
          }
  
          // Jarallax functions
  
      }, {
          key: 'initImg',
          value: function initImg() {
              var self = this;
  
              // find image element
              var $imgElement = self.options.imgElement;
              if ($imgElement && typeof $imgElement === 'string') {
                  $imgElement = self.$item.querySelector($imgElement);
              }
              // check if dom element
              if (!($imgElement instanceof Element)) {
                  $imgElement = null;
              }
  
              if ($imgElement) {
                  if (self.options.keepImg) {
                      self.image.$item = $imgElement.cloneNode(true);
                  } else {
                      self.image.$item = $imgElement;
                      self.image.$itemParent = $imgElement.parentNode;
                  }
                  self.image.useImgTag = true;
              }
  
              // true if there is img tag
              if (self.image.$item) {
                  return true;
              }
  
              // get image src
              if (self.image.src === null) {
                  self.image.src = self.css(self.$item, 'background-image').replace(/^url\(['"]?/g, '').replace(/['"]?\)$/g, '');
              }
              return !(!self.image.src || self.image.src === 'none');
          }
      }, {
          key: 'canInitParallax',
          value: function canInitParallax() {
              return supportTransform && !this.options.disableParallax();
          }
      }, {
          key: 'init',
          value: function init() {
              var self = this;
              var containerStyles = {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  pointerEvents: 'none'
              };
              var imageStyles = {};
  
              if (!self.options.keepImg) {
                  // save default user styles
                  var curStyle = self.$item.getAttribute('style');
                  if (curStyle) {
                      self.$item.setAttribute('data-jarallax-original-styles', curStyle);
                  }
                  if (self.image.useImgTag) {
                      var curImgStyle = self.image.$item.getAttribute('style');
                      if (curImgStyle) {
                          self.image.$item.setAttribute('data-jarallax-original-styles', curImgStyle);
                      }
                  }
              }
  
              // set relative position and z-index to the parent
              if (self.css(self.$item, 'position') === 'static') {
                  self.css(self.$item, {
                      position: 'relative'
                  });
              }
              if (self.css(self.$item, 'z-index') === 'auto') {
                  self.css(self.$item, {
                      zIndex: 0
                  });
              }
  
              // container for parallax image
              self.image.$container = document.createElement('div');
              self.css(self.image.$container, containerStyles);
              self.css(self.image.$container, {
                  'z-index': self.options.zIndex
              });
  
              // fix for IE https://github.com/nk-o/jarallax/issues/110
              if (isIE) {
                  self.css(self.image.$container, {
                      opacity: 0.9999
                  });
              }
  
              self.image.$container.setAttribute('id', 'jarallax-container-' + self.instanceID);
              self.$item.appendChild(self.image.$container);
  
              // use img tag
              if (self.image.useImgTag) {
                  imageStyles = self.extend({
                      'object-fit': self.options.imgSize,
                      'object-position': self.options.imgPosition,
                      // support for plugin https://github.com/bfred-it/object-fit-images
                      'font-family': 'object-fit: ' + self.options.imgSize + '; object-position: ' + self.options.imgPosition + ';',
                      'max-width': 'none'
                  }, containerStyles, imageStyles);
  
                  // use div with background image
              } else {
                  self.image.$item = document.createElement('div');
                  if (self.image.src) {
                      imageStyles = self.extend({
                          'background-position': self.options.imgPosition,
                          'background-size': self.options.imgSize,
                          'background-repeat': self.options.imgRepeat,
                          'background-image': 'url("' + self.image.src + '")'
                      }, containerStyles, imageStyles);
                  }
              }
  
              if (self.options.type === 'opacity' || self.options.type === 'scale' || self.options.type === 'scale-opacity' || self.options.speed === 1) {
                  self.image.position = 'absolute';
              }
  
              // check if one of parents have transform style (without this check, scroll transform will be inverted if used parallax with position fixed)
              // discussion - https://github.com/nk-o/jarallax/issues/9
              if (self.image.position === 'fixed') {
                  var parentWithTransform = 0;
                  var $itemParents = self.$item;
                  while ($itemParents !== null && $itemParents !== document && parentWithTransform === 0) {
                      var parentTransform = self.css($itemParents, '-webkit-transform') || self.css($itemParents, '-moz-transform') || self.css($itemParents, 'transform');
                      if (parentTransform && parentTransform !== 'none') {
                          parentWithTransform = 1;
                          self.image.position = 'absolute';
                      }
                      $itemParents = $itemParents.parentNode;
                  }
              }
  
              // add position to parallax block
              imageStyles.position = self.image.position;
  
              // insert parallax image
              self.css(self.image.$item, imageStyles);
              self.image.$container.appendChild(self.image.$item);
  
              // set initial position and size
              self.onResize();
              self.onScroll(true);
  
              // ResizeObserver
              if (self.options.automaticResize && resizeObserver) {
                  resizeObserver.observe(self.$item);
              }
  
              // call onInit event
              if (self.options.onInit) {
                  self.options.onInit.call(self);
              }
  
              // remove default user background
              if (self.css(self.$item, 'background-image') !== 'none') {
                  self.css(self.$item, {
                      'background-image': 'none'
                  });
              }
  
              self.addToParallaxList();
          }
  
          // add to parallax instances list
  
      }, {
          key: 'addToParallaxList',
          value: function addToParallaxList() {
              jarallaxList.push(this);
  
              if (jarallaxList.length === 1) {
                  updateParallax();
              }
          }
  
          // remove from parallax instances list
  
      }, {
          key: 'removeFromParallaxList',
          value: function removeFromParallaxList() {
              var self = this;
  
              jarallaxList.forEach(function (item, key) {
                  if (item.instanceID === self.instanceID) {
                      jarallaxList.splice(key, 1);
                  }
              });
          }
      }, {
          key: 'destroy',
          value: function destroy() {
              var self = this;
  
              self.removeFromParallaxList();
  
              // return styles on container as before jarallax init
              var originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
              self.$item.removeAttribute('data-jarallax-original-styles');
              // null occurs if there is no style tag before jarallax init
              if (!originalStylesTag) {
                  self.$item.removeAttribute('style');
              } else {
                  self.$item.setAttribute('style', originalStylesTag);
              }
  
              if (self.image.useImgTag) {
                  // return styles on img tag as before jarallax init
                  var originalStylesImgTag = self.image.$item.getAttribute('data-jarallax-original-styles');
                  self.image.$item.removeAttribute('data-jarallax-original-styles');
                  // null occurs if there is no style tag before jarallax init
                  if (!originalStylesImgTag) {
                      self.image.$item.removeAttribute('style');
                  } else {
                      self.image.$item.setAttribute('style', originalStylesTag);
                  }
  
                  // move img tag to its default position
                  if (self.image.$itemParent) {
                      self.image.$itemParent.appendChild(self.image.$item);
                  }
              }
  
              // remove additional dom elements
              if (self.$clipStyles) {
                  self.$clipStyles.parentNode.removeChild(self.$clipStyles);
              }
              if (self.image.$container) {
                  self.image.$container.parentNode.removeChild(self.image.$container);
              }
  
              // call onDestroy event
              if (self.options.onDestroy) {
                  self.options.onDestroy.call(self);
              }
  
              // delete jarallax from item
              delete self.$item.jarallax;
          }
  
          // it will remove some image overlapping
          // overlapping occur due to an image position fixed inside absolute position element
  
      }, {
          key: 'clipContainer',
          value: function clipContainer() {
              // needed only when background in fixed position
              if (this.image.position !== 'fixed') {
                  return;
              }
  
              var self = this;
              var rect = self.image.$container.getBoundingClientRect();
              var width = rect.width,
                  height = rect.height;
  
  
              if (!self.$clipStyles) {
                  self.$clipStyles = document.createElement('style');
                  self.$clipStyles.setAttribute('type', 'text/css');
                  self.$clipStyles.setAttribute('id', 'jarallax-clip-' + self.instanceID);
                  var head = document.head || document.getElementsByTagName('head')[0];
                  head.appendChild(self.$clipStyles);
              }
  
              var styles = '#jarallax-container-' + self.instanceID + ' {\n           clip: rect(0 ' + width + 'px ' + height + 'px 0);\n           clip: rect(0, ' + width + 'px, ' + height + 'px, 0);\n        }';
  
              // add clip styles inline (this method need for support IE8 and less browsers)
              if (self.$clipStyles.styleSheet) {
                  self.$clipStyles.styleSheet.cssText = styles;
              } else {
                  self.$clipStyles.innerHTML = styles;
              }
          }
      }, {
          key: 'coverImage',
          value: function coverImage() {
              var self = this;
  
              var rect = self.image.$container.getBoundingClientRect();
              var contH = rect.height;
              var speed = self.options.speed;
  
              var isScroll = self.options.type === 'scroll' || self.options.type === 'scroll-opacity';
              var scrollDist = 0;
              var resultH = contH;
              var resultMT = 0;
  
              // scroll parallax
              if (isScroll) {
                  // scroll distance and height for image
                  if (speed < 0) {
                      scrollDist = speed * Math.max(contH, wndH);
                  } else {
                      scrollDist = speed * (contH + wndH);
                  }
  
                  // size for scroll parallax
                  if (speed > 1) {
                      resultH = Math.abs(scrollDist - wndH);
                  } else if (speed < 0) {
                      resultH = scrollDist / speed + Math.abs(scrollDist);
                  } else {
                      resultH += Math.abs(wndH - contH) * (1 - speed);
                  }
  
                  scrollDist /= 2;
              }
  
              // store scroll distance
              self.parallaxScrollDistance = scrollDist;
  
              // vertical center
              if (isScroll) {
                  resultMT = (wndH - resultH) / 2;
              } else {
                  resultMT = (contH - resultH) / 2;
              }
  
              // apply result to item
              self.css(self.image.$item, {
                  height: resultH + 'px',
                  marginTop: resultMT + 'px',
                  left: self.image.position === 'fixed' ? rect.left + 'px' : '0',
                  width: rect.width + 'px'
              });
  
              // call onCoverImage event
              if (self.options.onCoverImage) {
                  self.options.onCoverImage.call(self);
              }
  
              // return some useful data. Used in the video cover function
              return {
                  image: {
                      height: resultH,
                      marginTop: resultMT
                  },
                  container: rect
              };
          }
      }, {
          key: 'isVisible',
          value: function isVisible() {
              return this.isElementInViewport || false;
          }
      }, {
          key: 'onScroll',
          value: function onScroll(force) {
              var self = this;
  
              var rect = self.$item.getBoundingClientRect();
              var contT = rect.top;
              var contH = rect.height;
              var styles = {};
  
              // check if in viewport
              var viewportRect = rect;
              if (self.options.elementInViewport) {
                  viewportRect = self.options.elementInViewport.getBoundingClientRect();
              }
              self.isElementInViewport = viewportRect.bottom >= 0 && viewportRect.right >= 0 && viewportRect.top <= wndH && viewportRect.left <= wndW;
  
              // stop calculations if item is not in viewport
              if (force ? false : !self.isElementInViewport) {
                  return;
              }
  
              // calculate parallax helping variables
              var beforeTop = Math.max(0, contT);
              var beforeTopEnd = Math.max(0, contH + contT);
              var afterTop = Math.max(0, -contT);
              var beforeBottom = Math.max(0, contT + contH - wndH);
              var beforeBottomEnd = Math.max(0, contH - (contT + contH - wndH));
              var afterBottom = Math.max(0, -contT + wndH - contH);
              var fromViewportCenter = 1 - 2 * (wndH - contT) / (wndH + contH);
  
              // calculate on how percent of section is visible
              var visiblePercent = 1;
              if (contH < wndH) {
                  visiblePercent = 1 - (afterTop || beforeBottom) / contH;
              } else if (beforeTopEnd <= wndH) {
                  visiblePercent = beforeTopEnd / wndH;
              } else if (beforeBottomEnd <= wndH) {
                  visiblePercent = beforeBottomEnd / wndH;
              }
  
              // opacity
              if (self.options.type === 'opacity' || self.options.type === 'scale-opacity' || self.options.type === 'scroll-opacity') {
                  styles.transform = 'translate3d(0,0,0)';
                  styles.opacity = visiblePercent;
              }
  
              // scale
              if (self.options.type === 'scale' || self.options.type === 'scale-opacity') {
                  var scale = 1;
                  if (self.options.speed < 0) {
                      scale -= self.options.speed * visiblePercent;
                  } else {
                      scale += self.options.speed * (1 - visiblePercent);
                  }
                  styles.transform = 'scale(' + scale + ') translate3d(0,0,0)';
              }
  
              // scroll
              if (self.options.type === 'scroll' || self.options.type === 'scroll-opacity') {
                  var positionY = self.parallaxScrollDistance * fromViewportCenter;
  
                  // fix if parallax block in absolute position
                  if (self.image.position === 'absolute') {
                      positionY -= contT;
                  }
  
                  styles.transform = 'translate3d(0,' + positionY + 'px,0)';
              }
  
              self.css(self.image.$item, styles);
  
              // call onScroll event
              if (self.options.onScroll) {
                  self.options.onScroll.call(self, {
                      section: rect,
  
                      beforeTop: beforeTop,
                      beforeTopEnd: beforeTopEnd,
                      afterTop: afterTop,
                      beforeBottom: beforeBottom,
                      beforeBottomEnd: beforeBottomEnd,
                      afterBottom: afterBottom,
  
                      visiblePercent: visiblePercent,
                      fromViewportCenter: fromViewportCenter
                  });
              }
          }
      }, {
          key: 'onResize',
          value: function onResize() {
              this.coverImage();
              this.clipContainer();
          }
      }]);
  
      return Jarallax;
  }();
  
  // global definition
  
  
  var plugin = function plugin(items) {
      // check for dom element
      // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
      if ((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? items instanceof HTMLElement : items && (typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items !== null && items.nodeType === 1 && typeof items.nodeName === 'string') {
          items = [items];
      }
  
      var options = arguments[1];
      var args = Array.prototype.slice.call(arguments, 2);
      var len = items.length;
      var k = 0;
      var ret = void 0;
  
      for (k; k < len; k++) {
          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' || typeof options === 'undefined') {
              if (!items[k].jarallax) {
                  items[k].jarallax = new Jarallax(items[k], options);
              }
          } else if (items[k].jarallax) {
              // eslint-disable-next-line prefer-spread
              ret = items[k].jarallax[options].apply(items[k].jarallax, args);
          }
          if (typeof ret !== 'undefined') {
              return ret;
          }
      }
  
      return items;
  };
  plugin.constructor = Jarallax;
  
  exports.default = plugin;
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))
  
  /***/ }),
  /* 14 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  var global = __webpack_require__(4);
  
  /**
   * `requestAnimationFrame()`
   */
  
  var request = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || fallback;
  
  var prev = +new Date();
  function fallback(fn) {
    var curr = +new Date();
    var ms = Math.max(0, 16 - (curr - prev));
    var req = setTimeout(fn, ms);
    return prev = curr, req;
  }
  
  /**
   * `cancelAnimationFrame()`
   */
  
  var cancel = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || clearTimeout;
  
  if (Function.prototype.bind) {
    request = request.bind(global);
    cancel = cancel.bind(global);
  }
  
  exports = module.exports = request;
  exports.cancel = cancel;
  
  /***/ })
  /******/ ]);
  
  /*!
   * Name    : Video Background Extension for Jarallax
   * Version : 1.0.1
   * Author  : nK <https://nkdev.info>
   * GitHub  : https://github.com/nk-o/jarallax
   */
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
  /******/ 		if(mode & 1) value = __webpack_require__(value);
  /******/ 		if(mode & 8) return value;
  /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  /******/ 		var ns = Object.create(null);
  /******/ 		__webpack_require__.r(ns);
  /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  /******/ 		return ns;
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 6);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */,
  /* 1 */,
  /* 2 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  module.exports = function (callback) {
  
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
          // Already ready or interactive, execute callback
          callback.call();
      } else if (document.attachEvent) {
          // Old browsers
          document.attachEvent('onreadystatechange', function () {
              if (document.readyState === 'interactive') callback.call();
          });
      } else if (document.addEventListener) {
          // Modern browsers
          document.addEventListener('DOMContentLoaded', callback);
      }
  };
  
  /***/ }),
  /* 3 */,
  /* 4 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  /* WEBPACK VAR INJECTION */(function(global) {
  
  var win;
  
  if (typeof window !== "undefined") {
      win = window;
  } else if (typeof global !== "undefined") {
      win = global;
  } else if (typeof self !== "undefined") {
      win = self;
  } else {
      win = {};
  }
  
  module.exports = win;
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))
  
  /***/ }),
  /* 5 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
  var g;
  
  // This works in non-strict mode
  g = function () {
      return this;
  }();
  
  try {
      // This works if eval is allowed (see CSP)
      g = g || Function("return this")() || (1, eval)("this");
  } catch (e) {
      // This works if the window reference is available
      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
  }
  
  // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}
  
  module.exports = g;
  
  /***/ }),
  /* 6 */
  /***/ (function(module, exports, __webpack_require__) {
  
  module.exports = __webpack_require__(7);
  
  
  /***/ }),
  /* 7 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  var _videoWorker = __webpack_require__(8);
  
  var _videoWorker2 = _interopRequireDefault(_videoWorker);
  
  var _global = __webpack_require__(4);
  
  var _global2 = _interopRequireDefault(_global);
  
  var _liteReady = __webpack_require__(2);
  
  var _liteReady2 = _interopRequireDefault(_liteReady);
  
  var _jarallaxVideo = __webpack_require__(10);
  
  var _jarallaxVideo2 = _interopRequireDefault(_jarallaxVideo);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // add video worker globally to fallback jarallax < 1.10 versions
  _global2.default.VideoWorker = _global2.default.VideoWorker || _videoWorker2.default;
  
  (0, _jarallaxVideo2.default)();
  
  // data-jarallax-video initialization
  (0, _liteReady2.default)(function () {
      if (typeof jarallax !== 'undefined') {
          jarallax(document.querySelectorAll('[data-jarallax-video]'));
      }
  });
  
  /***/ }),
  /* 8 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  module.exports = __webpack_require__(9);
  
  /***/ }),
  /* 9 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  // Deferred
  // thanks http://stackoverflow.com/questions/18096715/implement-deferred-object-without-using-jquery
  function Deferred() {
      this._done = [];
      this._fail = [];
  }
  Deferred.prototype = {
      execute: function execute(list, args) {
          var i = list.length;
          args = Array.prototype.slice.call(args);
          while (i--) {
              list[i].apply(null, args);
          }
      },
      resolve: function resolve() {
          this.execute(this._done, arguments);
      },
      reject: function reject() {
          this.execute(this._fail, arguments);
      },
      done: function done(callback) {
          this._done.push(callback);
      },
      fail: function fail(callback) {
          this._fail.push(callback);
      }
  };
  
  var ID = 0;
  var YoutubeAPIadded = 0;
  var VimeoAPIadded = 0;
  var loadingYoutubePlayer = 0;
  var loadingVimeoPlayer = 0;
  var loadingYoutubeDefer = new Deferred();
  var loadingVimeoDefer = new Deferred();
  
  var VideoWorker = function () {
      function VideoWorker(url, options) {
          _classCallCheck(this, VideoWorker);
  
          var self = this;
  
          self.url = url;
  
          self.options_default = {
              autoplay: false,
              loop: false,
              mute: false,
              volume: 100,
              showContols: true,
  
              // start / end video time in seconds
              startTime: 0,
              endTime: 0
          };
  
          self.options = self.extend({}, self.options_default, options);
  
          // check URL
          self.videoID = self.parseURL(url);
  
          // init
          if (self.videoID) {
              self.ID = ID++;
              self.loadAPI();
              self.init();
          }
      }
  
      // Extend like jQuery.extend
  
  
      _createClass(VideoWorker, [{
          key: 'extend',
          value: function extend(out) {
              var _arguments = arguments;
  
              out = out || {};
              Object.keys(arguments).forEach(function (i) {
                  if (!_arguments[i]) {
                      return;
                  }
                  Object.keys(_arguments[i]).forEach(function (key) {
                      out[key] = _arguments[i][key];
                  });
              });
              return out;
          }
      }, {
          key: 'parseURL',
          value: function parseURL(url) {
              // parse youtube ID
              function getYoutubeID(ytUrl) {
                  // eslint-disable-next-line no-useless-escape
                  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
                  var match = ytUrl.match(regExp);
                  return match && match[1].length === 11 ? match[1] : false;
              }
  
              // parse vimeo ID
              function getVimeoID(vmUrl) {
                  // eslint-disable-next-line no-useless-escape n a g a r a r y a n 
                  var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
                  var match = vmUrl.match(regExp);
                  return match && match[3] ? match[3] : false;
              }
  
              // parse local string
              function getLocalVideos(locUrl) {
                  // eslint-disable-next-line no-useless-escape
                  var videoFormats = locUrl.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/);
                  var result = {};
                  var ready = 0;
                  videoFormats.forEach(function (val) {
                      // eslint-disable-next-line no-useless-escape
                      var match = val.match(/^(mp4|webm|ogv|ogg)\:(.*)/);
                      if (match && match[1] && match[2]) {
                          // eslint-disable-next-line prefer-destructuring
                          result[match[1] === 'ogv' ? 'ogg' : match[1]] = match[2];
                          ready = 1;
                      }
                  });
                  return ready ? result : false;
              }
  
              var Youtube = getYoutubeID(url);
              var Vimeo = getVimeoID(url);
              var Local = getLocalVideos(url);
  
              if (Youtube) {
                  this.type = 'youtube';
                  return Youtube;
              } else if (Vimeo) {
                  this.type = 'vimeo';
                  return Vimeo;
              } else if (Local) {
                  this.type = 'local';
                  return Local;
              }
  
              return false;
          }
      }, {
          key: 'isValid',
          value: function isValid() {
              return !!this.videoID;
          }
  
          // events
  
      }, {
          key: 'on',
          value: function on(name, callback) {
              this.userEventsList = this.userEventsList || [];
  
              // add new callback in events list
              (this.userEventsList[name] || (this.userEventsList[name] = [])).push(callback);
          }
      }, {
          key: 'off',
          value: function off(name, callback) {
              var _this = this;
  
              if (!this.userEventsList || !this.userEventsList[name]) {
                  return;
              }
  
              if (!callback) {
                  delete this.userEventsList[name];
              } else {
                  this.userEventsList[name].forEach(function (val, key) {
                      if (val === callback) {
                          _this.userEventsList[name][key] = false;
                      }
                  });
              }
          }
      }, {
          key: 'fire',
          value: function fire(name) {
              var _this2 = this;
  
              var args = [].slice.call(arguments, 1);
              if (this.userEventsList && typeof this.userEventsList[name] !== 'undefined') {
                  this.userEventsList[name].forEach(function (val) {
                      // call with all arguments
                      if (val) {
                          val.apply(_this2, args);
                      }
                  });
              }
          }
      }, {
          key: 'play',
          value: function play(start) {
              var self = this;
              if (!self.player) {
                  return;
              }
  
              if (self.type === 'youtube' && self.player.playVideo) {
                  if (typeof start !== 'undefined') {
                      self.player.seekTo(start || 0);
                  }
                  if (YT.PlayerState.PLAYING !== self.player.getPlayerState()) {
                      self.player.playVideo();
                  }
              }
  
              if (self.type === 'vimeo') {
                  if (typeof start !== 'undefined') {
                      self.player.setCurrentTime(start);
                  }
                  self.player.getPaused().then(function (paused) {
                      if (paused) {
                          self.player.play();
                      }
                  });
              }
  
              if (self.type === 'local') {
                  if (typeof start !== 'undefined') {
                      self.player.currentTime = start;
                  }
                  if (self.player.paused) {
                      self.player.play();
                  }
              }
          }
      }, {
          key: 'pause',
          value: function pause() {
              var self = this;
              if (!self.player) {
                  return;
              }
  
              if (self.type === 'youtube' && self.player.pauseVideo) {
                  if (YT.PlayerState.PLAYING === self.player.getPlayerState()) {
                      self.player.pauseVideo();
                  }
              }
  
              if (self.type === 'vimeo') {
                  self.player.getPaused().then(function (paused) {
                      if (!paused) {
                          self.player.pause();
                      }
                  });
              }
  
              if (self.type === 'local') {
                  if (!self.player.paused) {
                      self.player.pause();
                  }
              }
          }
      }, {
          key: 'mute',
          value: function mute() {
              var self = this;
              if (!self.player) {
                  return;
              }
  
              if (self.type === 'youtube' && self.player.mute) {
                  self.player.mute();
              }
  
              if (self.type === 'vimeo' && self.player.setVolume) {
                  self.player.setVolume(0);
              }
  
              if (self.type === 'local') {
                  self.$video.muted = true;
              }
          }
      }, {
          key: 'unmute',
          value: function unmute() {
              var self = this;
              if (!self.player) {
                  return;
              }
  
              if (self.type === 'youtube' && self.player.mute) {
                  self.player.unMute();
              }
  
              if (self.type === 'vimeo' && self.player.setVolume) {
                  self.player.setVolume(self.options.volume);
              }
  
              if (self.type === 'local') {
                  self.$video.muted = false;
              }
          }
      }, {
          key: 'setVolume',
          value: function setVolume() {
              var volume = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  
              var self = this;
              if (!self.player || !volume) {
                  return;
              }
  
              if (self.type === 'youtube' && self.player.setVolume) {
                  self.player.setVolume(volume);
              }
  
              if (self.type === 'vimeo' && self.player.setVolume) {
                  self.player.setVolume(volume);
              }
  
              if (self.type === 'local') {
                  self.$video.volume = volume / 100;
              }
          }
      }, {
          key: 'getVolume',
          value: function getVolume(callback) {
              var self = this;
              if (!self.player) {
                  callback(false);
                  return;
              }
  
              if (self.type === 'youtube' && self.player.getVolume) {
                  callback(self.player.getVolume());
              }
  
              if (self.type === 'vimeo' && self.player.getVolume) {
                  self.player.getVolume().then(function (volume) {
                      callback(volume);
                  });
              }
  
              if (self.type === 'local') {
                  callback(self.$video.volume * 100);
              }
          }
      }, {
          key: 'getMuted',
          value: function getMuted(callback) {
              var self = this;
              if (!self.player) {
                  callback(null);
                  return;
              }
  
              if (self.type === 'youtube' && self.player.isMuted) {
                  callback(self.player.isMuted());
              }
  
              if (self.type === 'vimeo' && self.player.getVolume) {
                  self.player.getVolume().then(function (volume) {
                      callback(!!volume);
                  });
              }
  
              if (self.type === 'local') {
                  callback(self.$video.muted);
              }
          }
      }, {
          key: 'getImageURL',
          value: function getImageURL(callback) {
              var self = this;
  
              if (self.videoImage) {
                  callback(self.videoImage);
                  return;
              }
  
              if (self.type === 'youtube') {
                  var availableSizes = ['maxresdefault', 'sddefault', 'hqdefault', '0'];
                  var step = 0;
  
                  var tempImg = new Image();
                  tempImg.onload = function () {
                      // if no thumbnail, youtube add their own image with width = 120px
                      if ((this.naturalWidth || this.width) !== 120 || step === availableSizes.length - 1) {
                          // ok
                          self.videoImage = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
                          callback(self.videoImage);
                      } else {
                          // try another size
                          step++;
                          this.src = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
                      }
                  };
                  tempImg.src = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
              }
  
              if (self.type === 'vimeo') {
                  var request = new XMLHttpRequest();
                  request.open('GET', 'https://vimeo.com/api/v2/video/' + self.videoID + '.json', true);
                  request.onreadystatechange = function () {
                      if (this.readyState === 4) {
                          if (this.status >= 200 && this.status < 400) {
                              // Success!
                              var response = JSON.parse(this.responseText);
                              self.videoImage = response[0].thumbnail_large;
                              callback(self.videoImage);
                          } else {
                              // Error :(
                          }
                      }
                  };
                  request.send();
                  request = null;
              }
          }
  
          // fallback to the old version.
  
      }, {
          key: 'getIframe',
          value: function getIframe(callback) {
              this.getVideo(callback);
          }
      }, {
          key: 'getVideo',
          value: function getVideo(callback) {
              var self = this;
  
              // return generated video block
              if (self.$video) {
                  callback(self.$video);
                  return;
              }
  
              // generate new video block
              self.onAPIready(function () {
                  var hiddenDiv = void 0;
                  if (!self.$video) {
                      hiddenDiv = document.createElement('div');
                      hiddenDiv.style.display = 'none';
                  }
  
                  // Youtube
                  if (self.type === 'youtube') {
                      self.playerOptions = {};
                      self.playerOptions.videoId = self.videoID;
                      self.playerOptions.playerVars = {
                          autohide: 1,
                          rel: 0,
                          autoplay: 0,
                          // autoplay enable on mobile devices
                          playsinline: 1
                      };
  
                      // hide controls
                      if (!self.options.showContols) {
                          self.playerOptions.playerVars.iv_load_policy = 3;
                          self.playerOptions.playerVars.modestbranding = 1;
                          self.playerOptions.playerVars.controls = 0;
                          self.playerOptions.playerVars.showinfo = 0;
                          self.playerOptions.playerVars.disablekb = 1;
                      }
  
                      // events
                      var ytStarted = void 0;
                      var ytProgressInterval = void 0;
                      self.playerOptions.events = {
                          onReady: function onReady(e) {
                              // mute
                              if (self.options.mute) {
                                  e.target.mute();
                              } else if (self.options.volume) {
                                  e.target.setVolume(self.options.volume);
                              }
  
                              // autoplay
                              if (self.options.autoplay) {
                                  self.play(self.options.startTime);
                              }
                              self.fire('ready', e);
  
                              // volumechange
                              setInterval(function () {
                                  self.getVolume(function (volume) {
                                      if (self.options.volume !== volume) {
                                          self.options.volume = volume;
                                          self.fire('volumechange', e);
                                      }
                                  });
                              }, 150);
                          },
                          onStateChange: function onStateChange(e) {
                              // loop
                              if (self.options.loop && e.data === YT.PlayerState.ENDED) {
                                  self.play(self.options.startTime);
                              }
                              if (!ytStarted && e.data === YT.PlayerState.PLAYING) {
                                  ytStarted = 1;
                                  self.fire('started', e);
                              }
                              if (e.data === YT.PlayerState.PLAYING) {
                                  self.fire('play', e);
                              }
                              if (e.data === YT.PlayerState.PAUSED) {
                                  self.fire('pause', e);
                              }
                              if (e.data === YT.PlayerState.ENDED) {
                                  self.fire('ended', e);
                              }
  
                              // progress check
                              if (e.data === YT.PlayerState.PLAYING) {
                                  ytProgressInterval = setInterval(function () {
                                      self.fire('timeupdate', e);
  
                                      // check for end of video and play again or stop
                                      if (self.options.endTime && self.player.getCurrentTime() >= self.options.endTime) {
                                          if (self.options.loop) {
                                              self.play(self.options.startTime);
                                          } else {
                                              self.pause();
                                          }
                                      }
                                  }, 150);
                              } else {
                                  clearInterval(ytProgressInterval);
                              }
                          }
                      };
  
                      var firstInit = !self.$video;
                      if (firstInit) {
                          var div = document.createElement('div');
                          div.setAttribute('id', self.playerID);
                          hiddenDiv.appendChild(div);
                          document.body.appendChild(hiddenDiv);
                      }
                      self.player = self.player || new window.YT.Player(self.playerID, self.playerOptions);
                      if (firstInit) {
                          self.$video = document.getElementById(self.playerID);
  
                          // get video width and height
                          self.videoWidth = parseInt(self.$video.getAttribute('width'), 10) || 1280;
                          self.videoHeight = parseInt(self.$video.getAttribute('height'), 10) || 720;
                      }
                  }
  
                  // Vimeo
                  if (self.type === 'vimeo') {
                      self.playerOptions = '';
  
                      self.playerOptions += 'player_id=' + self.playerID;
                      self.playerOptions += '&autopause=0';
                      self.playerOptions += '&transparent=0';
  
                      // hide controls
                      if (!self.options.showContols) {
                          self.playerOptions += '&badge=0&byline=0&portrait=0&title=0';
                      }
  
                      // autoplay
                      self.playerOptions += '&autoplay=' + (self.options.autoplay ? '1' : '0');
  
                      // loop
                      self.playerOptions += '&loop=' + (self.options.loop ? 1 : 0);
  
                      if (!self.$video) {
                          self.$video = document.createElement('iframe');
                          self.$video.setAttribute('id', self.playerID);
                          self.$video.setAttribute('src', 'https://player.vimeo.com/video/' + self.videoID + '?' + self.playerOptions);
                          self.$video.setAttribute('frameborder', '0');
                          hiddenDiv.appendChild(self.$video);
                          document.body.appendChild(hiddenDiv);
                      }
  
                      self.player = self.player || new Vimeo.Player(self.$video);
  
                      // get video width and height
                      self.player.getVideoWidth().then(function (width) {
                          self.videoWidth = width || 1280;
                      });
                      self.player.getVideoHeight().then(function (height) {
                          self.videoHeight = height || 720;
                      });
  
                      // set current time for autoplay
                      if (self.options.startTime && self.options.autoplay) {
                          self.player.setCurrentTime(self.options.startTime);
                      }
  
                      // mute
                      if (self.options.mute) {
                          self.player.setVolume(0);
                      } else if (self.options.volume) {
                          self.player.setVolume(self.options.volume);
                      }
  
                      var vmStarted = void 0;
                      self.player.on('timeupdate', function (e) {
                          if (!vmStarted) {
                              self.fire('started', e);
                              vmStarted = 1;
                          }
  
                          self.fire('timeupdate', e);
  
                          // check for end of video and play again or stop
                          if (self.options.endTime) {
                              if (self.options.endTime && e.seconds >= self.options.endTime) {
                                  if (self.options.loop) {
                                      self.play(self.options.startTime);
                                  } else {
                                      self.pause();
                                  }
                              }
                          }
                      });
                      self.player.on('play', function (e) {
                          self.fire('play', e);
  
                          // check for the start time and start with it
                          if (self.options.startTime && e.seconds === 0) {
                              self.play(self.options.startTime);
                          }
                      });
                      self.player.on('pause', function (e) {
                          self.fire('pause', e);
                      });
                      self.player.on('ended', function (e) {
                          self.fire('ended', e);
                      });
                      self.player.on('loaded', function (e) {
                          self.fire('ready', e);
                      });
                      self.player.on('volumechange', function (e) {
                          self.fire('volumechange', e);
                      });
                  }
  
                  // Local
                  function addSourceToLocal(element, src, type) {
                      var source = document.createElement('source');
                      source.src = src;
                      source.type = type;
                      element.appendChild(source);
                  }
                  if (self.type === 'local') {
                      if (!self.$video) {
                          self.$video = document.createElement('video');
  
                          // show controls
                          if (self.options.showContols) {
                              self.$video.controls = true;
                          }
  
                          // mute
                          if (self.options.mute) {
                              self.$video.muted = true;
                          } else if (self.$video.volume) {
                              self.$video.volume = self.options.volume / 100;
                          }
  
                          // loop
                          if (self.options.loop) {
                              self.$video.loop = true;
                          }
  
                          // autoplay enable on mobile devices
                          self.$video.setAttribute('playsinline', '');
                          self.$video.setAttribute('webkit-playsinline', '');
  
                          self.$video.setAttribute('id', self.playerID);
                          hiddenDiv.appendChild(self.$video);
                          document.body.appendChild(hiddenDiv);
  
                          Object.keys(self.videoID).forEach(function (key) {
                              addSourceToLocal(self.$video, self.videoID[key], 'video/' + key);
                          });
                      }
  
                      self.player = self.player || self.$video;
  
                      var locStarted = void 0;
                      self.player.addEventListener('playing', function (e) {
                          if (!locStarted) {
                              self.fire('started', e);
                          }
                          locStarted = 1;
                      });
                      self.player.addEventListener('timeupdate', function (e) {
                          self.fire('timeupdate', e);
  
                          // check for end of video and play again or stop
                          if (self.options.endTime) {
                              if (self.options.endTime && this.currentTime >= self.options.endTime) {
                                  if (self.options.loop) {
                                      self.play(self.options.startTime);
                                  } else {
                                      self.pause();
                                  }
                              }
                          }
                      });
                      self.player.addEventListener('play', function (e) {
                          self.fire('play', e);
                      });
                      self.player.addEventListener('pause', function (e) {
                          self.fire('pause', e);
                      });
                      self.player.addEventListener('ended', function (e) {
                          self.fire('ended', e);
                      });
                      self.player.addEventListener('loadedmetadata', function () {
                          // get video width and height
                          self.videoWidth = this.videoWidth || 1280;
                          self.videoHeight = this.videoHeight || 720;
  
                          self.fire('ready');
  
                          // autoplay
                          if (self.options.autoplay) {
                              self.play(self.options.startTime);
                          }
                      });
                      self.player.addEventListener('volumechange', function (e) {
                          self.getVolume(function (volume) {
                              self.options.volume = volume;
                          });
                          self.fire('volumechange', e);
                      });
                  }
  
                  callback(self.$video);
              });
          }
      }, {
          key: 'init',
          value: function init() {
              var self = this;
  
              self.playerID = 'VideoWorker-' + self.ID;
          }
      }, {
          key: 'loadAPI',
          value: function loadAPI() {
              var self = this;
  
              if (YoutubeAPIadded && VimeoAPIadded) {
                  return;
              }
  
              var src = '';
  
              // load Youtube API
              if (self.type === 'youtube' && !YoutubeAPIadded) {
                  YoutubeAPIadded = 1;
                  src = 'https://www.youtube.com/iframe_api';
              }
  
              // load Vimeo API
              if (self.type === 'vimeo' && !VimeoAPIadded) {
                  VimeoAPIadded = 1;
                  src = 'https://player.vimeo.com/api/player.js';
              }
  
              if (!src) {
                  return;
              }
  
              // add script in head section
              var tag = document.createElement('script');
              var head = document.getElementsByTagName('head')[0];
              tag.src = src;
  
              head.appendChild(tag);
  
              head = null;
              tag = null;
          }
      }, {
          key: 'onAPIready',
          value: function onAPIready(callback) {
              var self = this;
  
              // Youtube
              if (self.type === 'youtube') {
                  // Listen for global YT player callback
                  if ((typeof YT === 'undefined' || YT.loaded === 0) && !loadingYoutubePlayer) {
                      // Prevents Ready event from being called twice
                      loadingYoutubePlayer = 1;
  
                      // Creates deferred so, other players know when to wait.
                      window.onYouTubeIframeAPIReady = function () {
                          window.onYouTubeIframeAPIReady = null;
                          loadingYoutubeDefer.resolve('done');
                          callback();
                      };
                  } else if ((typeof YT === 'undefined' ? 'undefined' : _typeof(YT)) === 'object' && YT.loaded === 1) {
                      callback();
                  } else {
                      loadingYoutubeDefer.done(function () {
                          callback();
                      });
                  }
              }
  
              // Vimeo
              if (self.type === 'vimeo') {
                  if (typeof Vimeo === 'undefined' && !loadingVimeoPlayer) {
                      loadingVimeoPlayer = 1;
                      var vimeoInterval = setInterval(function () {
                          if (typeof Vimeo !== 'undefined') {
                              clearInterval(vimeoInterval);
                              loadingVimeoDefer.resolve('done');
                              callback();
                          }
                      }, 20);
                  } else if (typeof Vimeo !== 'undefined') {
                      callback();
                  } else {
                      loadingVimeoDefer.done(function () {
                          callback();
                      });
                  }
              }
  
              // Local
              if (self.type === 'local') {
                  callback();
              }
          }
      }]);
  
      return VideoWorker;
  }();
  
  exports.default = VideoWorker;
  
  /***/ }),
  /* 10 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.default = jarallaxVideo;
  
  var _videoWorker = __webpack_require__(8);
  
  var _videoWorker2 = _interopRequireDefault(_videoWorker);
  
  var _global = __webpack_require__(4);
  
  var _global2 = _interopRequireDefault(_global);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function jarallaxVideo() {
      var jarallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _global2.default.jarallax;
  
      if (typeof jarallax === 'undefined') {
          return;
      }
  
      var Jarallax = jarallax.constructor;
  
      // append video after init Jarallax
      var defInit = Jarallax.prototype.init;
      Jarallax.prototype.init = function () {
          var self = this;
  
          defInit.apply(self);
  
          if (self.video && !self.options.disableVideo()) {
              self.video.getVideo(function (video) {
                  var $parent = video.parentNode;
                  self.css(video, {
                      position: self.image.position,
                      top: '0px',
                      left: '0px',
                      right: '0px',
                      bottom: '0px',
                      width: '100%',
                      height: '100%',
                      maxWidth: 'none',
                      maxHeight: 'none',
                      margin: 0,
                      zIndex: -1
                  });
                  self.$video = video;
                  self.image.$container.appendChild(video);
  
                  // remove parent video element (created by VideoWorker)
                  $parent.parentNode.removeChild($parent);
              });
          }
      };
  
      // cover video
      var defCoverImage = Jarallax.prototype.coverImage;
      Jarallax.prototype.coverImage = function () {
          var self = this;
          var imageData = defCoverImage.apply(self);
          var node = self.image.$item ? self.image.$item.nodeName : false;
  
          if (imageData && self.video && node && (node === 'IFRAME' || node === 'VIDEO')) {
              var h = imageData.image.height;
              var w = h * self.image.width / self.image.height;
              var ml = (imageData.container.width - w) / 2;
              var mt = imageData.image.marginTop;
  
              if (imageData.container.width > w) {
                  w = imageData.container.width;
                  h = w * self.image.height / self.image.width;
                  ml = 0;
                  mt += (imageData.image.height - h) / 2;
              }
  
              // add video height over than need to hide controls
              if (node === 'IFRAME') {
                  h += 400;
                  mt -= 200;
              }
  
              self.css(self.$video, {
                  width: w + 'px',
                  marginLeft: ml + 'px',
                  height: h + 'px',
                  marginTop: mt + 'px'
              });
          }
  
          return imageData;
      };
  
      // init video
      var defInitImg = Jarallax.prototype.initImg;
      Jarallax.prototype.initImg = function () {
          var self = this;
          var defaultResult = defInitImg.apply(self);
  
          if (!self.options.videoSrc) {
              self.options.videoSrc = self.$item.getAttribute('data-jarallax-video') || null;
          }
  
          if (self.options.videoSrc) {
              self.defaultInitImgResult = defaultResult;
              return true;
          }
  
          return defaultResult;
      };
  
      var defCanInitParallax = Jarallax.prototype.canInitParallax;
      Jarallax.prototype.canInitParallax = function () {
          var self = this;
          var defaultResult = defCanInitParallax.apply(self);
  
          if (!self.options.videoSrc) {
              return defaultResult;
          }
  
          var video = new _videoWorker2.default(self.options.videoSrc, {
              autoplay: true,
              loop: true,
              showContols: false,
              startTime: self.options.videoStartTime || 0,
              endTime: self.options.videoEndTime || 0,
              mute: self.options.videoVolume ? 0 : 1,
              volume: self.options.videoVolume || 0
          });
  
          if (video.isValid()) {
              // if parallax will not be inited, we can add thumbnail on background.
              if (!defaultResult) {
                  if (!self.defaultInitImgResult) {
                      video.getImageURL(function (url) {
                          // save default user styles
                          var curStyle = self.$item.getAttribute('style');
                          if (curStyle) {
                              self.$item.setAttribute('data-jarallax-original-styles', curStyle);
                          }
  
                          // set new background
                          self.css(self.$item, {
                              'background-image': 'url("' + url + '")',
                              'background-position': 'center',
                              'background-size': 'cover'
                          });
                      });
                  }
  
                  // init video
              } else {
                  video.on('ready', function () {
                      if (self.options.videoPlayOnlyVisible) {
                          var oldOnScroll = self.onScroll;
                          self.onScroll = function () {
                              oldOnScroll.apply(self);
                              if (self.isVisible()) {
                                  video.play();
                              } else {
                                  video.pause();
                              }
                          };
                      } else {
                          video.play();
                      }
                  });
  
                  video.on('started', function () {
                      self.image.$default_item = self.image.$item;
                      self.image.$item = self.$video;
  
                      // set video width and height
                      self.image.width = self.video.videoWidth || 1280;
                      self.image.height = self.video.videoHeight || 720;
                      self.options.imgWidth = self.image.width;
                      self.options.imgHeight = self.image.height;
                      self.coverImage();
                      self.clipContainer();
                      self.onScroll();
  
                      // hide image
                      if (self.image.$default_item) {
                          self.image.$default_item.style.display = 'none';
                      }
                  });
  
                  self.video = video;
  
                  // set image if not exists
                  if (!self.defaultInitImgResult) {
                      if (video.type !== 'local') {
                          video.getImageURL(function (url) {
                              self.image.src = url;
                              self.init();
                          });
  
                          return false;
                      }
  
                      // set empty image on local video if not defined
                      self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                      return true;
                  }
              }
          }
  
          return defaultResult;
      };
  
      // Destroy video parallax
      var defDestroy = Jarallax.prototype.destroy;
      Jarallax.prototype.destroy = function () {
          var self = this;
  
          if (self.image.$default_item) {
              self.image.$item = self.image.$default_item;
              delete self.image.$default_item;
          }
  
          defDestroy.apply(self);
      };
  }
  
  /***/ })
  /******/ ]);
  "use strict";
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
  
  (function ($) {
    var inputData = {};
    var dataColor = '';
    var buttonCloseColor = '';
    var buttonCloseBlurColor = '#ced4da';
    var inputFocus = '1px solid #4285f4';
    var inputBlur = '1px solid #ced4da';
    var inputFocusShadow = '0 1px 0 0 #4285f4';
    var inputBlurShadow = '';
    var enterCharCode = 13;
    var arrowUpCharCode = 38;
    var arrowDownCharCode = 40;
    var count = -1;
    var nextScrollHeight = -45;
  
    var mdbAutocomplete =
    /*#__PURE__*/
    function () {
      function mdbAutocomplete(input, options) {
        _classCallCheck(this, mdbAutocomplete);
  
        this.defaults = {
          data: inputData,
          dataColor: dataColor,
          closeColor: buttonCloseColor,
          closeBlurColor: buttonCloseBlurColor,
          inputFocus: inputFocus,
          inputBlur: inputBlur,
          inputFocusShadow: inputFocusShadow,
          inputBlurShadow: inputBlurShadow
        };
        this.$input = input;
        this.options = this.assignOptions(options);
        this.$clearButton = $('.mdb-autocomplete-clear');
        this.$autocompleteWrap = $('<ul class="mdb-autocomplete-wrap"></ul>');
        this.init();
      }
  
      _createClass(mdbAutocomplete, [{
        key: "init",
        value: function init() {
          this.setData();
          this.inputFocus();
          this.inputBlur();
          this.inputKeyupData();
          this.inputLiClick();
          this.clearAutocomplete();
        }
      }, {
        key: "assignOptions",
        value: function assignOptions(options) {
          return $.extend({}, this.defaults, options);
        }
      }, {
        key: "setData",
        value: function setData() {
          if (Object.keys(this.options.data).length) {
            this.$autocompleteWrap.insertAfter(this.$input);
          }
        }
      }, {
        key: "inputFocus",
        value: function inputFocus() {
          var _this = this;
  
          this.$input.on('focus', function () {
            _this.$input.css('border-bottom', _this.options.inputFocus);
  
            _this.$input.css('box-shadow', _this.options.inputFocusShadow);
          });
        }
      }, {
        key: "inputBlur",
        value: function inputBlur() {
          var _this2 = this;
  
          this.$input.on('blur', function () {
            _this2.$input.css('border-bottom', _this2.options.inputBlur);
  
            _this2.$input.css('box-shadow', _this2.options.inputBlurShadow);
          });
        }
      }, {
        key: "inputKeyupData",
        value: function inputKeyupData() {
          var _this3 = this;
  
          this.$input.on('keyup', function (e) {
            if (e.which === enterCharCode) {
              if (!_this3.options.data.includes(_this3.$input.val())) {
                _this3.options.data.push(_this3.$input.val());
              }
  
              _this3.$autocompleteWrap.find('.selected').trigger('click');
  
              _this3.$autocompleteWrap.empty();
  
              _this3.inputBlur();
  
              count = -1;
              nextScrollHeight = -45;
              return count;
            }
  
            var $inputValue = _this3.$input.val();
  
            _this3.$autocompleteWrap.empty();
  
            if ($inputValue.length) {
              for (var item in _this3.options.data) {
                if (_this3.options.data[item].toLowerCase().indexOf($inputValue.toLowerCase()) !== -1) {
                  var option = $("<li>".concat(_this3.options.data[item], "</li>"));
  
                  _this3.$autocompleteWrap.append(option);
                }
              }
  
              var $ulList = _this3.$autocompleteWrap;
  
              var $ulItems = _this3.$autocompleteWrap.find('li');
  
              var nextItemHeight = $ulItems.eq(count).outerHeight();
              var previousItemHeight = $ulItems.eq(count - 1).outerHeight();
  
              if (e.which === arrowDownCharCode) {
                if (count > $ulItems.length - 2) {
                  count = -1;
                  $ulItems.scrollTop(0);
                  nextScrollHeight = -45;
                  return;
                } else {
                  count++;
                }
  
                nextScrollHeight += nextItemHeight;
                $ulList.scrollTop(nextScrollHeight);
                $ulItems.eq(count).addClass('selected');
              } else if (e.which === arrowUpCharCode) {
                if (count < 1) {
                  count = $ulItems.length;
                  $ulList.scrollTop($ulList.prop('scrollHeight'));
                  nextScrollHeight = $ulList.prop('scrollHeight') - nextItemHeight;
                } else {
                  count--;
                }
  
                nextScrollHeight -= previousItemHeight;
                $ulList.scrollTop(nextScrollHeight);
                $ulItems.eq(count).addClass('selected');
              }
  
              if ($inputValue.length === 0) {
                _this3.$clearButton.css('visibility', 'hidden');
              } else {
                _this3.$clearButton.css('visibility', 'visible');
              }
  
              _this3.$autocompleteWrap.children().css('color', _this3.options.dataColor);
            } else {
              _this3.$clearButton.css('visibility', 'hidden');
            }
          });
        }
      }, {
        key: "inputLiClick",
        value: function inputLiClick() {
          var _this4 = this;
  
          this.$autocompleteWrap.on('click', 'li', function (e) {
            e.preventDefault();
  
            _this4.$input.val($(e.target).text());
  
            _this4.$autocompleteWrap.empty();
          });
        }
      }, {
        key: "clearAutocomplete",
        value: function clearAutocomplete() {
          var _this5 = this;
  
          this.$clearButton.on('click', function (e) {
            count = -1;
            nextScrollHeight = -45;
            e.preventDefault();
            var $this = $(e.currentTarget);
            $this.parent().find('.mdb-autocomplete').val('');
            $this.css('visibility', 'hidden');
  
            _this5.$autocompleteWrap.empty();
  
            $this.parent().find('label').removeClass('active');
          });
        }
      }, {
        key: "changeSVGcolors",
        value: function changeSVGcolors() {
          var _this6 = this;
  
          if (this.$input.hasClass('mdb-autocomplete')) {
            this.$input.on('click keyup', function (e) {
              e.preventDefault();
              $(e.target).parent().find('.mdb-autocomplete-clear').find('svg').css('fill', _this6.options.closeColor);
            });
            this.$input.on('blur', function (e) {
              e.preventDefault();
              $(e.target).parent().find('.mdb-autocomplete-clear').find('svg').css('fill', _this6.options.closeBlurColor);
            });
          }
        }
      }]);
  
      return mdbAutocomplete;
    }();
  
    $.fn.mdbAutocomplete = function (options) {
      return this.each(function () {
        new mdbAutocomplete($(this), options);
      });
    };
  })(jQuery);
  /*
      Enhanced Bootstrap Modals
      https://mdbootstrap.com
      office@mdbootstrap.com
  */
  
  (function($){
    $('body').on('shown.bs.modal', '.modal', function() {
      if(!$('.modal-backdrop').length) {
  
        $modal_dialog = $(this).children('.modal-dialog')
  
        if($modal_dialog.hasClass('modal-side')) {
          $(this).addClass('modal-scrolling');
          $('body').addClass('scrollable');
        }
  
        if($modal_dialog.hasClass('modal-frame')) {
          $(this).addClass('modal-content-clickable');
          $('body').addClass('scrollable');
        }
      }
    });
    $('body').on('hidden.bs.modal', '.modal', function() {
      $('body').removeClass('scrollable');
    });
  })(jQuery);
  
  /*!
   * bsCustomFileInput v1.3.2 (https://github.com/Johann-S/bs-custom-file-input)
   * Copyright 2018 - 2019 Johann-S <johann.servoire@gmail.com>
   * Licensed under MIT (https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
      (global = global || self, global.bsCustomFileInput = factory());
  }(this, function () {
    'use strict';
  
    var Selector = {
      CUSTOMFILE: '.custom-file input[type="file"]',
      CUSTOMFILELABEL: '.custom-file-label',
      FORM: 'form',
      INPUT: 'input'
    };
  
    var textNodeType = 3;
  
    var getDefaultText = function getDefaultText(input) {
      var defaultText = '';
      var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);
  
      if (label) {
        defaultText = label.innerHTML;
      }
  
      return defaultText;
    };
  
    var findFirstChildNode = function findFirstChildNode(element) {
      if (element.childNodes.length > 0) {
        var childNodes = [].slice.call(element.childNodes);
  
        for (var i = 0; i < childNodes.length; i++) {
          var node = childNodes[i];
  
          if (node.nodeType !== textNodeType) {
            return node;
          }
        }
      }
  
      return element;
    };
  
    var restoreDefaultText = function restoreDefaultText(input) {
      var defaultText = input.bsCustomFileInput.defaultText;
      var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);
  
      if (label) {
        var element = findFirstChildNode(label);
        element.innerHTML = defaultText;
      }
    };
  
    var fileApi = !!window.File;
    var FAKE_PATH = 'fakepath';
    var FAKE_PATH_SEPARATOR = '\\';
  
    var getSelectedFiles = function getSelectedFiles(input) {
      if (input.hasAttribute('multiple') && fileApi) {
        return [].slice.call(input.files).map(function (file) {
          return file.name;
        }).join(', ');
      }
  
      if (input.value.indexOf(FAKE_PATH) !== -1) {
        var splittedValue = input.value.split(FAKE_PATH_SEPARATOR);
        return splittedValue[splittedValue.length - 1];
      }
  
      return input.value;
    };
  
    function handleInputChange() {
      var label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL);
  
      if (label) {
        var element = findFirstChildNode(label);
        var inputValue = getSelectedFiles(this);
  
        if (inputValue.length) {
          element.innerHTML = inputValue;
        } else {
          restoreDefaultText(this);
        }
      }
    }
  
    function handleFormReset() {
      var customFileList = [].slice.call(this.querySelectorAll(Selector.INPUT)).filter(function (input) {
        return !!input.bsCustomFileInput;
      });
  
      for (var i = 0, len = customFileList.length; i < len; i++) {
        restoreDefaultText(customFileList[i]);
      }
    }
  
    var customProperty = 'bsCustomFileInput';
    var Event = {
      FORMRESET: 'reset',
      INPUTCHANGE: 'change'
    };
    var bsCustomFileInput = {
      init: function init(inputSelector, formSelector) {
        if (inputSelector === void 0) {
          inputSelector = Selector.CUSTOMFILE;
        }
  
        if (formSelector === void 0) {
          formSelector = Selector.FORM;
        }
  
        var customFileInputList = [].slice.call(document.querySelectorAll(inputSelector));
        var formList = [].slice.call(document.querySelectorAll(formSelector));
  
        for (var i = 0, len = customFileInputList.length; i < len; i++) {
          var input = customFileInputList[i];
          Object.defineProperty(input, customProperty, {
            value: {
              defaultText: getDefaultText(input)
            },
            writable: true
          });
          handleInputChange.call(input);
          input.addEventListener(Event.INPUTCHANGE, handleInputChange);
        }
  
        for (var _i = 0, _len = formList.length; _i < _len; _i++) {
          formList[_i].addEventListener(Event.FORMRESET, handleFormReset);
  
          Object.defineProperty(formList[_i], customProperty, {
            value: true,
            writable: true
          });
        }
      },
      destroy: function destroy() {
        var formList = [].slice.call(document.querySelectorAll(Selector.FORM)).filter(function (form) {
          return !!form.bsCustomFileInput;
        });
        var customFileInputList = [].slice.call(document.querySelectorAll(Selector.INPUT)).filter(function (input) {
          return !!input.bsCustomFileInput;
        });
  
        for (var i = 0, len = customFileInputList.length; i < len; i++) {
          var input = customFileInputList[i];
          restoreDefaultText(input);
          input[customProperty] = undefined;
          input.removeEventListener(Event.INPUTCHANGE, handleInputChange);
        }
  
        for (var _i2 = 0, _len2 = formList.length; _i2 < _len2; _i2++) {
          formList[_i2].removeEventListener(Event.FORMRESET, handleFormReset);
  
          formList[_i2][customProperty] = undefined;
        }
      }
    };
  
    return bsCustomFileInput;
  
  }));
  //# sourceMappingURL=bs-custom-file-input.js.map
  
  document.addEventListener("DOMContentLoaded", function () {
  
    bsCustomFileInput.init()
  });
  
  "use strict";
  
  var toggler = document.getElementsByClassName("rotate");
  var i;
  
  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("down");
    });
  }