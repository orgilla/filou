import * as React from 'react';
import { debounce } from 'lodash';

export default class AutoSizer extends React.PureComponent {
  static defaultProps = {
    onResize: () => {},
    disableHeight: true,
    disableWidth: false,
    style: {},
  };

  state = {
    height: this.props.defaultHeight || 0,
    width: this.props.defaultWidth || 0,
  };

  componentDidMount() {
    const { nonce } = this.props;
    if (
      this._autoSizer &&
      this._autoSizer.parentNode &&
      this._autoSizer.parentNode.ownerDocument &&
      this._autoSizer.parentNode.ownerDocument.defaultView &&
      this._autoSizer.parentNode instanceof
        this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement
    ) {
      // Delay access of parentNode until mount.
      // This handles edge-cases where the component has already been unmounted before its ref has been set,
      // As well as libraries like react-lite which have a slightly different lifecycle.
      this._parentNode = this._autoSizer.parentNode;

      // Defer requiring resize handler in order to support server-side rendering.
      // See issue #41
      this._detectElementResize = createDetectElementResize(nonce);
      this._detectElementResize.addResizeListener(
        this._parentNode,
        this._onResize
      );

      this.onResize();
    }
  }

  componentWillUnmount() {
    if (this._detectElementResize && this._parentNode) {
      this._detectElementResize.removeResizeListener(
        this._parentNode,
        this._onResize
      );
    }
  }

  render() {
    const {
      children,
      className,
      disableHeight,
      disableWidth,
      style,
      steps,
    } = this.props;
    const { height, width, step } = this.state;

    // Outer div should not force width/height since that may prevent containers from shrinking.
    // Inner component should overflow and use calculated width/height.
    // See issue #68 for more information.
    const outerStyle = { overflow: 'visible' };
    const childParams = {};

    // childParams.height = height;
    childParams.width = width;
    childParams.step = step || steps[0];

    /**
     * TODO: Avoid rendering children before the initial measurements have been collected.
     * At best this would just be wasting cycles.
     * Add this check into version 10 though as it could break too many ref callbacks in version 9.
     * Note that if default width/height props were provided this would still work with SSR.
    if (
      height !== 0 &&
      width !== 0
    ) {
      child = children({ height, width })
    }
    */

    return (
      <div
        className={className}
        ref={this._setRef}
        style={{
          ...outerStyle,
          ...style,
        }}
      >
        {children(childParams)}
      </div>
    );
  }

  _onResize = debounce((...args) => this.onResize(...args), 100, {
    trailing: true,
    leading: false,
  });

  onResize = () => {
    const { disableHeight, disableWidth, onResize, steps = [] } = this.props;

    if (this._parentNode) {
      // Guard against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      // const height = this._parentNode.offsetHeight || 0;
      const width = this._parentNode.offsetWidth || 0;

      const style = window.getComputedStyle(this._parentNode) || {};
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      const paddingRight = parseInt(style.paddingRight, 10) || 0;
      // const paddingTop = parseInt(style.paddingTop, 10) || 0;
      // const paddingBottom = parseInt(style.paddingBottom, 10) || 0;

      // const newHeight = height - paddingTop - paddingBottom;
      const newWidth = width - paddingLeft - paddingRight;

      if (
        // (!disableHeight && this.state.height !== newHeight) ||
        !disableWidth &&
        this.state.width !== newWidth
      ) {
        if (!steps.length) {
          this.setState({
            // height: height - paddingTop - paddingBottom,
            width: width - paddingLeft - paddingRight,
          });
          // onResize({ height, width });
          onResize({ width });
        } else {
          const lastStep = [...steps]
            .reverse()
            .filter(x => x < this.state.width);
          const step = [...steps].reverse().filter(x => x < width);
          if (lastStep[0] !== step[0]) {
            this.setState({
              // height: height - paddingTop - paddingBottom,
              width: width - paddingLeft - paddingRight,
              step: step[0] || steps[0],
            });
            // onResize({ height, width });
            onResize({ width });
          }
        }
      }
    }
  };

  _setRef = autoSizer => {
    this._autoSizer = autoSizer;
  };
}

/**
 * Detect Element Resize.
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * Forked from version 0.5.3; includes the following modifications:
 * 1) Guard against unsafe 'window' and 'document' references (to support SSR).
 * 2) Defer initialization code via a top-level function wrapper (to support SSR).
 * 3) Avoid unnecessary reflows by not measuring size for scroll events bubbling from children.
 * 4) Add nonce for style element.
 * */

function createDetectElementResize(nonce) {
  // Check `document` and `window` in case of server-side rendering
  let _window;
  if (typeof window !== 'undefined') {
    _window = window;
  } else if (typeof self !== 'undefined') {
    _window = self;
  } else {
    _window = global;
  }

  const attachEvent = typeof document !== 'undefined' && document.attachEvent;

  if (!attachEvent) {
    const requestFrame = (function() {
      const raf =
        _window.requestAnimationFrame ||
        _window.mozRequestAnimationFrame ||
        _window.webkitRequestAnimationFrame ||
        function(fn) {
          return _window.setTimeout(fn, 20);
        };
      return function(fn) {
        return raf(fn);
      };
    })();

    const cancelFrame = (function() {
      const cancel =
        _window.cancelAnimationFrame ||
        _window.mozCancelAnimationFrame ||
        _window.webkitCancelAnimationFrame ||
        _window.clearTimeout;
      return function(id) {
        return cancel(id);
      };
    })();

    var resetTriggers = function(element) {
      let triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;
      contract.scrollLeft = contract.scrollWidth;
      contract.scrollTop = contract.scrollHeight;
      expandChild.style.width = `${expand.offsetWidth + 1}px`;
      expandChild.style.height = `${expand.offsetHeight + 1}px`;
      expand.scrollLeft = expand.scrollWidth;
      expand.scrollTop = expand.scrollHeight;
    };

    const checkTriggers = function(element) {
      return (
        element.offsetWidth != element.__resizeLast__.width ||
        element.offsetHeight != element.__resizeLast__.height
      );
    };

    var scrollListener = function(e) {
      // Don't measure (which forces) reflow for scrolls that happen inside of children!
      if (
        e.target.className.indexOf('contract-trigger') < 0 &&
        e.target.className.indexOf('expand-trigger') < 0
      ) {
        return;
      }

      const element = this;
      resetTriggers(this);
      if (this.__resizeRAF__) {
        cancelFrame(this.__resizeRAF__);
      }
      this.__resizeRAF__ = requestFrame(() => {
        if (checkTriggers(element)) {
          element.__resizeLast__.width = element.offsetWidth;
          element.__resizeLast__.height = element.offsetHeight;
          element.__resizeListeners__.forEach(fn => {
            fn.call(element, e);
          });
        }
      });
    };

    /* Detect CSS Animations support to detect element display/re-attach */
    var animation = false,
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(
        ' '
      ),
      pfx = '';
    {
      const elm = document.createElement('fakeelement');
      if (elm.style.animationName !== undefined) {
        animation = true;
      }

      if (animation === false) {
        for (let i = 0; i < domPrefixes.length; i++) {
          if (elm.style[`${domPrefixes[i]}AnimationName`] !== undefined) {
            pfx = domPrefixes[i];
            keyframeprefix = `-${pfx.toLowerCase()}-`;
            animationstartevent = startEvents[i];
            animation = true;
            break;
          }
        }
      }
    }

    var animationName = 'resizeanim';
    var animationKeyframes = `@${keyframeprefix}keyframes ${animationName} { from { opacity: 0; } to { opacity: 0; } } `;
    var animationStyle = `${keyframeprefix}animation: 1ms ${animationName}; `;
  }

  const createStyles = function(doc) {
    if (!doc.getElementById('detectElementResize')) {
      // opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
      let css =
          `${animationKeyframes || ''}.resize-triggers { ${animationStyle ||
            ''}visibility: hidden; opacity: 0; } ` +
          `.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }`,
        head = doc.head || doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

      style.id = 'detectElementResize';
      style.type = 'text/css';

      if (nonce != null) {
        style.setAttribute('nonce', nonce);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(doc.createTextNode(css));
      }

      head.appendChild(style);
    }
  };

  const addResizeListener = function(element, fn) {
    if (attachEvent) {
      element.attachEvent('onresize', fn);
    } else {
      if (!element.__resizeTriggers__) {
        const doc = element.ownerDocument;
        const elementStyle = _window.getComputedStyle(element);
        if (elementStyle && elementStyle.position == 'static') {
          element.style.position = 'relative';
        }
        createStyles(doc);
        element.__resizeLast__ = {};
        element.__resizeListeners__ = [];
        (element.__resizeTriggers__ = doc.createElement('div')).className =
          'resize-triggers';
        element.__resizeTriggers__.innerHTML =
          '<div class="expand-trigger"><div></div></div>' +
          '<div class="contract-trigger"></div>';
        element.appendChild(element.__resizeTriggers__);
        resetTriggers(element);
        element.addEventListener('scroll', scrollListener, true);

        /* Listen for a css animation to detect element display/re-attach */
        if (animationstartevent) {
          element.__resizeTriggers__.__animationListener__ = function animationListener(
            e
          ) {
            if (e.animationName == animationName) {
              resetTriggers(element);
            }
          };
          element.__resizeTriggers__.addEventListener(
            animationstartevent,
            element.__resizeTriggers__.__animationListener__
          );
        }
      }
      element.__resizeListeners__.push(fn);
    }
  };

  const removeResizeListener = function(element, fn) {
    if (attachEvent) {
      element.detachEvent('onresize', fn);
    } else {
      element.__resizeListeners__.splice(
        element.__resizeListeners__.indexOf(fn),
        1
      );
      if (!element.__resizeListeners__.length) {
        element.removeEventListener('scroll', scrollListener, true);
        if (element.__resizeTriggers__.__animationListener__) {
          element.__resizeTriggers__.removeEventListener(
            animationstartevent,
            element.__resizeTriggers__.__animationListener__
          );
          element.__resizeTriggers__.__animationListener__ = null;
        }
        try {
          element.__resizeTriggers__ = !element.removeChild(
            element.__resizeTriggers__
          );
        } catch (e) {
          // Preact compat; see developit/preact-compat/issues/228
        }
      }
    }
  };

  return {
    addResizeListener,
    removeResizeListener,
  };
}
