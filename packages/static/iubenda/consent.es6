export default (iubendaId, iubendaPolicyId, { lang, color }) => {
  if (typeof window !== 'undefined') {
    var _iub = _iub || [];
    _iub.csConfiguration = {
      banner: { textColor: 'white', backgroundColor: color },
      lang,
      siteId: iubendaId,
      consentOnScroll: false,
      // startOnDomReady: true,
      cookiePolicyId: iubendaPolicyId
    };
    (window._iub = window._iub || {}),
      (function() {
        _iub.defaultConfig = {
          logger: 'console',
          logLevel: 'nolog',
          raiseOnException: !1,
          autoStart: !0,
          testMode: !1,
          useSSL: !1,
          cookiePolicyId: null,
          siteId: null,
          priorConsent: !0,
          cookiePolicyUrl: null,
          cookiePolicyInOtherWindow: !1,
          skipSaveConsent: !1,
          logViaAlert: !1,
          lang: 'it',
          startOnDomReady: !1,
          banner: {
            content: null,
            cookiePolicyLinkCaption: null,
            zIndex: 99999998,
            backgroundColor: '#000',
            textColor: '#fff',
            fontSize: null,
            fontSizeCloseButton: '20px',
            fontSizeBody: '14px',
            innerHtmlCloseBtn: '&times;',
            applyStyles: !0,
            html: null,
            slideDown: !0,
            consentOnScrollDelay: 500,
            prependOnBody: !1
          },
          rebuildIframe: !0,
          footer: { message: null, btnCaption: null },
          callback: {
            onReady: null,
            onStartupFailed: null,
            onError: null,
            onFatalError: null,
            onBannerShown: null,
            onCookiePolicyShown: null,
            onConsentFirstGiven: null,
            onConsentGiven: null,
            onConsentRead: null,
            onActivationDone: null
          },
          preferenceCookie: { expireAfter: 365 },
          enableRemoteConsent: !1,
          loopbackServer: {
            iframeBridge: {
              host: 'cdn.iubenda.com',
              iframePath: '/cookie_solution/iframe_bridge.html'
            },
            callback: {
              host: 'www.iubenda.com',
              setRemoteCookiePath: '/cookie-consent/cookies/set',
              resetRemoteCookiePath: '/cookie-consent/cookies/reset',
              getRemoteCookiePath: '/cookie-consent/cookies/get'
            }
          },
          consentOnButton: !0,
          consentOnElement: 'input, textarea, form',
          consentOnDocument: !1,
          consentOnScroll: !0,
          consentOnScrollHorizontal: !1,
          consentOnScrollOnElement: void 0,
          hideInIframe: !1,
          reloadOnConsent: !1,
          localConsentDomain: null,
          localConsentPath: '/',
          inlineDelay: 1e3
        };
      })(),
      (window._iub.jlib = window._iub.jlib || {}),
      (function(e) {
        (e.isArray =
          Array.isArray ||
          function(e) {
            return Object.prototype.toString.call(e) === '[object Array]';
          }),
          (e.wrap = function(t) {
            return void 0 === t || t === null ? [] : e.isArray(t) ? t : [t];
          }),
          (e.indexOf = function(e, t, n) {
            if (Array.prototype.indexOf) return e.indexOf(t);
            let r = -1;
            n = n || 0;
            for (let o = n; o < e.length; o++)
              if (e[o] === t) {
                r = o;
                break;
              }
            return r;
          }),
          (e.uniq = function(t) {
            for (var n = [], r = 0, o = t.length; o > r; r++)
              e.indexOf(n, t[r]) === -1 && t[r] !== '' && n.push(t[r]);
            return n;
          }),
          (e.filter = function(e, t, n) {
            for (var r, o = [], i = 0, a = e.length, c = !n; a > i; i++)
              (r = !t(e[i], i)), r !== c && o.push(e[i]);
            return o;
          });
      })((window._iub.jlib.array = {})),
      (function(e, t) {
        let n = (e.DEBUG = 0),
          r = (e.INFO = 1),
          o = (e.WARN = 2),
          i = (e.ERROR = 3),
          a = (e.FATAL = 4),
          c = (e.NOLOG = 5),
          s = (e.LOG_LEVELS = {
            debug: n,
            info: r,
            warn: o,
            error: i,
            fatal: a,
            nolog: c
          }),
          l = [].slice,
          u = {},
          d = [],
          f = !1,
          p = r;
        (e.silence = function() {
          return (f = !0), e;
        }),
          (e.wake = function() {
            return (f = !1), e;
          }),
          (e.registerStrategy = function(t, n) {
            return (u[t] = n), e;
          }),
          (e.configure = function(t, n) {
            const r = u[t];
            return r && 'configure' in r && r.configure(n), e;
          }),
          (e.setLevel = function(t) {
            return (t = t.toLowerCase()), t in s && (p = s[t]), e;
          }),
          (e.log = function(n, r) {
            if (
              !f &&
              ((r = t.wrap(r)), (n = n.toLowerCase()), n in s && s[n] >= p)
            ) {
              for (let o = 0; o < d.length; o++) {
                let i = d[o];
                typeof i === 'function'
                  ? i(n, r)
                  : i in u && ((i = u[i]), i.log(n, r));
              }
              return e;
            }
          }),
          (e.use = function(n) {
            return n && (d = t.wrap(n)), e;
          }),
          (e.debug = function() {
            e.log('debug', l.call(arguments));
          }),
          (e.info = function() {
            e.log('info', l.call(arguments));
          }),
          (e.warn = function() {
            e.log('warn', l.call(arguments));
          }),
          (e.error = function() {
            e.log('error', l.call(arguments));
          }),
          (e.fatal = function() {
            e.log('fatal', l.call(arguments));
          });
      })(
        (window._iub.jlib.logger = window._iub.jlib.logger || {}),
        window._iub.jlib.array
      ),
      (function(e) {
        const t = function(e, t, n) {
          const r = [t].concat(n);
          console[e].apply ? console[e](...r) : console[e](r.join(' '));
        };
        e.registerStrategy('console', {
          configure() {},
          log(n, r) {
            try {
              if (
                'console' in window &&
                'log' in console &&
                'warn' in console &&
                'error' in console
              ) {
                const o = `[IUBCS|${n.toUpperCase()}]:`;
                e.LOG_LEVELS[n] < e.WARN
                  ? t('log', o, r)
                  : e.LOG_LEVELS[n] === e.WARN
                    ? t('warn', o, r)
                    : t('error', o, r);
              }
            } catch (i) {}
          }
        });
      })(window._iub.jlib.logger),
      (function(e) {
        function t(e) {
          const t = e.indexOf(o);
          if (t !== -1) {
            const n = e.indexOf('rv:');
            return parseFloat(
              o === 'Trident' && n !== -1
                ? e.substring(n + 3)
                : e.substring(t + o.length + 1)
            );
          }
        }
        function n(e) {
          for (let t = 0; t < e.length; t++)
            if (e[t].string.indexOf(e[t].subString) !== -1)
              return (o = e[t].subString), e[t].identity;
        }
        var r = navigator.userAgent,
          o = '';
        (e.dataBrowser = [
          { string: r, subString: 'Chrome', identity: 'Chrome' },
          { string: r, subString: 'MSIE', identity: 'Explorer' },
          { string: r, subString: 'Trident', identity: 'Explorer' },
          { string: r, subString: 'Firefox', identity: 'Firefox' },
          { string: r, subString: 'Safari', identity: 'Safari' },
          { string: r, subString: 'Opera', identity: 'Opera' }
        ]),
          (e.browser = n(e.dataBrowser) || 'Other'),
          (e.version = t(r) || t(navigator.appVersion) || 'Unknown'),
          (e.isBot = function() {
            let e = !1;
            return (
              (function(t) {
                let n =
                    '(googlebot/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|hotjar|yahoo|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon|httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)',
                  r = new RegExp(n, 'i');
                r.test(t) && (e = !0);
              })(r),
              e
            );
          }),
          (e.isPhantomJS = function() {
            return /phantomjs/i.test(r.toLowerCase())
              ? !0
              : window.callPhantom || window._phantom
                ? !0
                : Function.prototype.bind &&
                  ((window.Prototype && window.Prototype.Version <= '1.7') ||
                    (window.MooTools && window.MooTools.version < '1.6.0') ||
                    Function.prototype.bind
                      .toString()
                      .replace(/bind/g, 'Error') === Error.toString())
                  ? Function.prototype.toString
                      .toString()
                      .replace(/toString/g, 'Error') !== Error.toString()
                    ? !0
                    : !1
                  : !0;
          }),
          (e.isHeadlessChrome = function() {
            return /HeadlessChrome/i.test(r);
          }),
          (e.isRavenInstalled = function() {
            return (
              typeof Raven !== 'undefined' &&
              typeof Raven.captureException === 'function' &&
              typeof Raven.captureMessage === 'function'
            );
          }),
          (e.isMobile = function() {
            let e = !1;
            return (
              (function(t) {
                (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                  t
                ) ||
                  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    t.substr(0, 4)
                  )) &&
                  (e = !0);
              })(r || navigator.vendor || window.opera),
              e
            );
          }),
          (e.getUserAgent = function() {
            return r;
          }),
          (e.setUserAgent = function(e) {
            r = e;
          });
      })((_iub.jlib.browserDetect = _iub.jlib.browserDetect || {})),
      (window._iub.jlib.dom = window._iub.jlib.dom || {}),
      (function(e, t, n) {
        let r,
          o = function(e) {
            let t,
              n,
              o,
              i,
              a = document.all,
              c = [];
            for (
              r || (r = document.createStyleSheet()),
                e = e.replace(/\[for\b/gi, '[htmlFor').split(/\s*,\s*/),
                t = 0;
              t < a.length;
              t++
            )
              for (o = a[t], n = 0; n < e.length; n++) {
                if (((i = e[n]), r.addRule(i, 'k:v'), o.currentStyle.k)) {
                  c.push(o);
                  break;
                }
                r.removeRule(0);
              }
            return (o = i = null), c;
          };
        (e.all = function(n) {
          let r = [];
          return (
            (r =
              'querySelectorAll' in document
                ? document.querySelectorAll(n)
                : o(n)),
            e.nodeListToArray(t.uniq(r))
          );
        }),
          (e.first = function(t) {
            if ('querySelector' in document)
              return e.nodeListToArray(document.querySelector(t));
            const n = e.all(t);
            return n.length ? n[0] : null;
          }),
          (e.id = function(e) {
            return document.getElementById(e);
          }),
          (e.is = function(e, t) {
            return (
              e && e.tagName && e.tagName.toLowerCase() === t.toLowerCase()
            );
          }),
          (e.nodeListToArray = function(e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
            return t;
          }),
          (e.getElementsByClassNamePolyfill = function(t) {
            let n,
              r,
              o,
              i = [];
            if (document.querySelectorAll)
              i = document.querySelectorAll(`.${t}`);
            else if (document.evaluate)
              for (
                r = `.//*[contains(concat(' ', @class, ' '), ' ${t} ')]`,
                  n = document.evaluate(r, document, null, 0, null);
                (o = n.iterateNext());

              )
                i.push(o);
            else
              for (
                n = document.getElementsByTagName('*'),
                  r = new RegExp(`(^|\\s)${t}(\\s|$)`),
                  o = 0;
                o < n.length;
                o++
              )
                r.test(n[o].className) && i.push(n[o]);
            return e.nodeListToArray(i);
          }),
          (e.getElementsByClassName = function(t) {
            const n = document.getElementsByClassName
              ? document.getElementsByClassName(t)
              : e.getElementsByClassNamePolyfill(t);
            return e.nodeListToArray(n);
          }),
          (e.getElementsByClassNames = function(t) {
            return t && t.length ? e.all(`.${t.join(', .')}`) : [];
          }),
          (e.cls = function(n) {
            const r = t.isArray(n);
            return e.getElementsByClassNames(r ? n : arguments);
          }),
          (e.contains = function(e, t) {
            for (let n = t.parentNode; n !== null && void 0 !== n; ) {
              if (n === e) return !0;
              n = n.parentNode;
            }
            return !1;
          }),
          (e.createIframe = function(e, t) {
            const n = document.createElement('iframe');
            return (
              e && n.setAttribute('src', e),
              typeof t === 'string' && (n.text = t),
              n
            );
          }),
          (e.createScript = function(e, t) {
            const n = document.createElement('script');
            return (
              n.setAttribute('type', 'text/javascript'),
              e && n.setAttribute('src', e),
              typeof t === 'string' && (n.text = t),
              n
            );
          }),
          (e.remove = function(e) {
            e && e.parentNode.removeChild(e);
          }),
          (e.replace = function(t, n) {
            let r = t.nextSibling,
              o = t.parentNode;
            e.remove(t), o.insertBefore(n, r);
          }),
          (e.after = function(e, t) {
            return e.parentNode.insertBefore(t, e.nextSibling);
          }),
          (e.traverse = function(t, n, r) {
            if (t && t.nodeType === 1) {
              let o = !0;
              if ((n && (o = n(t)), o !== !1))
                for (let i = t.children, a = 0; a < i.length; a++) {
                  const c = i[a];
                  e.traverse(c, n, r);
                }
              r && r(t);
            }
          }),
          (e.create = function(e) {
            return document.createElement(e);
          }),
          (e.getAttributes = function(t) {
            for (
              var n = e.nodeListToArray(t.attributes), r = {}, o = 0;
              o < n.length;
              o++
            ) {
              let i = n[o],
                a = i.name,
                c = i.value;
              c !== null &&
                void 0 !== c &&
                c !== 'null' &&
                c !== '' &&
                (r[a] = c);
            }
            return r;
          }),
          (e.setAttributes = function(e, t) {
            for (const n in t)
              t.hasOwnProperty(n) &&
                void 0 !== t[n] &&
                t[n] !== null &&
                e.setAttribute(n, t[n]);
          }),
          (e.attrs = function(t, n) {
            return n && e.setAttributes(t, n), e.getAttributes(t);
          }),
          (e.ready = function(e, t) {
            function r(t) {
              if (t) e.call(a, 'lazy');
              else {
                if (!l && s.doScroll) {
                  try {
                    i = !a.frameElement;
                  } catch (n) {}
                  i && b();
                }
                window[u](`${f}load`, p, !1);
              }
            }
            var o = !1,
              i = !0,
              a = window,
              c = document,
              s = c.documentElement,
              l = c.addEventListener,
              u = l ? 'addEventListener' : 'attachEvent',
              d = l ? 'removeEventListener' : 'detachEvent',
              f = l ? '' : 'on',
              p = function(t) {
                (t.type !== 'readystatechange' ||
                  c.readyState === 'complete') &&
                  ((t.type === 'load' ? a : c)[d](f + t.type, p, !1),
                  !o && (o = !0) && e.call(a, t.type || t));
              },
              b = function() {
                try {
                  s.doScroll('left');
                } catch (e) {
                  return void setTimeout(b, 50);
                }
                p('poll');
              },
              g = null,
              m = !1;
            n.browser === 'Explorer' && n.version < 9 && (t = !1),
              c.readyState === 'loading'
                ? (c.onreadystatechange = function() {
                    m === !1 &&
                      ((g = t
                        ? c.readyState !== 'loading'
                        : c.readyState === 'complete'),
                      r(g),
                      (m = !0));
                  })
                : ((g = t
                    ? c.readyState !== 'loading'
                    : c.readyState === 'complete'),
                  r(g));
          });
        const i = function(e) {
          const t = document.head || document.getElementsByTagName('head')[0];
          n.browser === 'Explorer' && n.version < 9
            ? (t.appendChild(e),
              setTimeout(() => {
                t.removeChild(e);
              }, 200))
            : t.appendChild(e).parentNode.removeChild(e);
        };
        e._runScriptSrc = function(e, t) {
          let n,
            r = 'readyState',
            o = 'onreadystatechange',
            a = document.createElement('script');
          (a.onload = a.onerror = a[o] = function() {
            (a[r] && !/^c|loade/.test(a[r])) ||
              n ||
              ((a.onload = a[o] = null), (n = 1), t && t());
          }),
            (a.async = !1),
            (a.src = e),
            i(a);
        };
        const a = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        (e._runScriptInline = function(t, n) {
          t = t.replace(a, '');
          const r = e.createScript(null, t);
          i(r), n && n();
        }),
          (e.runScript = function(t, n) {
            let r, o;
            typeof t === 'string'
              ? (r = t)
              : ((r = t.getAttribute('src')),
                (o = t.text || t.textContent || t.innerHTML || '')),
              o ? e._runScriptInline(o, n) : r && e._runScriptSrc(r, n);
          }),
          (e.insertScript = function(e) {
            const t = document.createElement('script');
            t.setAttribute('type', 'text/javascript'),
              t.setAttribute('src', e),
              document.getElementsByTagName('head')[0].appendChild(t);
          });
      })(window._iub.jlib.dom, window._iub.jlib.array, _iub.jlib.browserDetect),
      (function(e, t) {
        const n = function(e) {
          let n = this,
            r = (e.jlib.json, e.cs.settings),
            o = r.timeoutLoadConfiguration || 1e3;
          (n.loaded = !1),
            (n.error = !1),
            (n.timeoutOccurred = !1),
            (n.jsRequest = function(r, i) {
              e.cs.info('Loading configuration through javascript file.'),
                (n.script = t.createElement('script')),
                (n.script.async = !0);
              const a = t.getElementsByTagName('script')[0];
              a.parentNode.insertBefore(n.script, a),
                n.script.readyState
                  ? (n.script.onreadystatechange = function() {
                      n.timeoutOccurred ||
                        (n.script.readyState &&
                          n.script.readyState !== 'loaded') ||
                        n.timeoutOccurred ||
                        n.loaded ||
                        ((n.loaded = !0), i());
                    })
                  : (n.script.onload = function() {
                      n.timeoutOccurred ||
                        (e.cs.info('Remote configuration correctly loaded.'),
                        (n.loaded = !0),
                        i());
                    }),
                (n.script.onerror = function() {
                  n.timeoutOccurred ||
                    (e.cs.warn(
                      'Something went wrong within loading remote configuration.'
                    ),
                    (n.error = !0),
                    i());
                }),
                (n.script.src = r),
                setTimeout(() => {
                  n.loaded === !1 &&
                    n.error === !1 &&
                    typeof e.csEnabled === 'undefined' &&
                    ((n.timeoutOccurred = n.error = !0),
                    e.cs.info(
                      'Time out occurred while loading configuration via javascript file. Load default configurations.'
                    ),
                    i());
                }, o);
            });
        };
        e._iub.Loader = n;
      })(window, document),
      (function(e) {
        const t = function(e, t) {
          const n = this;
          (n.cs = e.cs), (t = t || function() {});
          let r = new e.Loader(e),
            o = e.csConfiguration.callback,
            i = e.cs.options,
            a = e.cs.settings,
            c = a.urlForRemoteConf[a.loadConfigurationVia].replace(
              '%{cookie_policy_id}',
              i.cookiePolicyId
            );
          (n.start = function() {
            if (e.cs.settings.avoidRequestRemoteConf) {
              e.cs.info('Loading local configuration.');
              try {
                t();
              } catch (r) {
                o && o.onStartupFailed && o.onStartupFailed(r.message || r);
              }
            } else e.cs.info('Loading remote configurations.'), n.request();
          }),
            (n.request = function() {
              const e = function(e) {
                n.startIubendaAfterRemoteConfs(e);
              };
              r.jsRequest(c, e);
            }),
            (n.checkDataAfterRequest = function() {
              typeof e.csEnabled === 'undefined'
                ? (e.cs.warn(
                    'Remote configuration NOT correctly loaded: enabling Iubenda Cookie Solution ... '
                  ),
                  (e.csEnabled = e.cs.state.enabled = !0))
                : (e.cs.state.enabled = e.csEnabled);
            }),
            (n.startIubendaAfterRemoteConfs = function(r) {
              e.cs.info('Merging remote configuration with default.'),
                (r = r || {}),
                n.checkDataAfterRequest(r);
              const o = new e.CSConfigurationMerger(e.cs.options, e.csRC);
              o.check(e.cs.options, e.csRC), t();
            });
        };
        e._iub.RemoteConfLoader = t;
      })(window, document),
      (function(e) {
        (e.iterateAsyncSeq = function(t, n, r, o) {
          return (
            (o = o || 0),
            o >= n.length
              ? void (r && r())
              : void t(n[o], () => {
                  e.iterateAsyncSeq(t, n, r, o + 1);
                })
          );
        }),
          (e.iterateAsyncParallel = function(e, t, n) {
            for (
              var r = 0,
                o = function() {
                  r++, r === t.length && ((o = null), n && n());
                },
                i = 0;
              i < t.length;
              i++
            )
              e(t[i], o);
          }),
          (e.invokeAll = function(e, t) {
            for (
              var n = 0,
                r = function() {
                  n++, n === e.length && ((r = null), t && t());
                },
                o = 0;
              o < e.length;
              o++
            )
              e[o](r);
          });
      })((window._iub.jlib.async = {})),
      (function(e) {
        e.make = function(e) {
          e = e || {};
          const t = {};
          e.__iubJlibEmitterListeners__ = t;
          let n = function(e) {
              return (t[e] = t[e] || []), t[e];
            },
            r = function(e, t, r) {
              const o = n(e);
              o.unshift({ fn: t, once: !!r });
            };
          return (
            (e.on = function(t, n) {
              return r(t, n), e;
            }),
            (e.once = function(t, n) {
              return r(t, n, !0), e;
            }),
            (e.off = function(t, r) {
              for (let o = n(t), i = o.length - 1; i >= 0; i--)
                o[i].fn === r && o.splice(i, 1);
              return e;
            }),
            (e.emit = function(e) {
              for (let t = n(e), r = t.length - 1; r >= 0; r--) {
                let o = t[r],
                  i = Array.prototype.slice.call(arguments, 1);
                o.fn.apply(null, i), o.once && t.splice(r, 1);
              }
            }),
            e
          );
        };
      })((_iub.jlib.Emitter = {})),
      (function(e, t) {
        function n(e) {
          return !!e.className.match(/\b_iub_cs_activate-inline\b/);
        }
        function r(e) {
          const t =
            e.getAttribute('data-suppressedsrc') ||
            e.getAttribute('suppressedsrc') ||
            e.getAttribute('src');
          return t;
        }
        function o(e, t) {
          if (!e.src) return t(null, e);
          let n,
            r = 'readyState',
            o = 'onreadystatechange';
          e.onload = e.onerror = e[o] = function() {
            (e[r] && !/^c|loade/.test(e[r])) ||
              n ||
              ((e.onload = e[o] = null), (n = 1), t(null, e));
          };
        }
        function i(e, t) {
          let n = r(e),
            i = e.text || e.textContent || e.innerHTML || '';
          i = i.replace(w, '');
          const a = s.attrs(e);
          delete a['data-suppressedsrc'],
            delete a.suppressedsrc,
            delete a.type,
            delete a.src,
            (a.async = !1);
          const c = s.create('div');
          s.after(e, c), s.remove(e);
          const l = s.createScript(n, i);
          s.attrs(l, a), o(l, t), s.replace(c, l);
        }
        function a(e, t) {
          let n = r(e),
            i = e.text || e.textContent || e.innerHTML || '';
          i = i.replace(w, '');
          const a = s.attrs(e);
          delete a['data-suppressedsrc'],
            delete a.suppressedsrc,
            delete a.type,
            delete a.src,
            (a.async = !1);
          const c = s.create('div');
          s.after(e, c), s.remove(e);
          const l = s.createIframe(n, i);
          s.attrs(l, a), o(l, t), s.replace(c, l);
        }
        function c(e, t, r) {
          let o = n(e) ? p : 0,
            i = function(n, r) {
              setTimeout(() => {
                v(),
                  n && u.error('Snippet activation failed', n, r || e),
                  t && t(!n && r),
                  (t = o = e = null);
              }, o);
            };
          m(e), r(i);
        }
        t = t || {};
        var s = e.dom,
          l = e.async,
          u = e.logger,
          d = e.Emitter,
          f =
            void 0 !== t.rebuildIframe
              ? t.rebuildIframe
              : _iub.defaultConfig.rebuildIframe,
          p =
            void 0 !== t.inlineDelay
              ? t.inlineDelay
              : _iub.defaultConfig.inlineDelay,
          b = document.write,
          g = document.writeln,
          m = function(e) {
            const t = document.createElement('div');
            e && s.contains(document.body, e)
              ? s.after(e, t)
              : document.body.appendChild(t),
              (document.write = document.writeln = function(e) {
                e = e || '';
                try {
                  const n = document.createElement('div');
                  (e = e
                    .replace(
                      /<script/g,
                      '<div data-iubscript="iubscript" style="display: none !important;" '
                    )
                    .replace(/script>/g, 'div>')),
                    n.insertAdjacentHTML('afterbegin', e),
                    t.appendChild(n),
                    s.traverse(n, e => {
                      let t = e.nodeName.toLowerCase(),
                        n = e.getAttribute('type'),
                        r = e.getAttribute('data-iubscript') === 'iubscript',
                        o =
                          !n ||
                          n === 'application/javascript' ||
                          n === 'text/javascript';
                      t === 'div' && r && o && s.runScript(e);
                    });
                } catch (r) {
                  u.error(r);
                }
              });
          },
          v = function() {
            (document.write = b), (document.writeln = g);
          },
          y = function() {
            d.make(this);
          };
        (y.CLASSES = [
          '_iub_cs_activate-inline',
          '_iub_cs_activate',
          '_iub_cs_activate_iframe',
          '_iub_cs_activate_notused'
        ]),
          (y.WAIT_FOR_ATTRIBUTE = 'data-iub-cs-wait-for'),
          (y.WAIT_FOR_INTERVAL = 100);
        var w = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
          h = function(e) {
            try {
              return eval.call(window, e);
            } catch (t) {
              return !1;
            }
          },
          S = function(e, t) {
            const n = e.getAttribute(y.WAIT_FOR_ATTRIBUTE);
            if (!n) return t();
            var r = setInterval(() => {
              h(n) && (clearInterval(r), t());
            }, y.WAIT_FOR_INTERVAL);
          },
          A = function(e, t) {
            try {
              if (s.is(e, 'script')) i(e, t);
              else if (s.is(e, 'iframe') && f) a(e, t);
              else {
                const n = r(e);
                e.removeAttribute('type'),
                  e.removeAttribute('suppressedsrc'),
                  (e.src = n),
                  t(null, e);
              }
            } catch (o) {
              t(o);
            }
          };
        (y.prototype.activateSnippet = function(e, t) {
          const n = this;
          c(e, t, t => {
            S(e, () => {
              A(e, (e, r) => {
                n.emit('snippet-activated', r), t(e, r);
              });
            });
          });
        }),
          (y.prototype.activateSnippets = function(e, t) {
            this.emit('before-activate-snippets', e),
              u.debug('Running activateSnippets on', e.length, 'elems'),
              (t = t || function() {}),
              l.iterateAsyncSeq(this.activateSnippet, e, t);
          }),
          (y.prototype.activateAllSnippets = function(e) {
            let t = this,
              n = function() {
                u.debug('activateAllSnippets done, calling done callback...'),
                  t.emit('all-snippets-activated'),
                  e && e();
              };
            u.debug('Running activateAllSnippets');
            const r = s.getElementsByClassNames(y.CLASSES);
            this.activateSnippets(r, n);
          }),
          (_iub.CookieSolutionActivator = y),
          (_iub.csActivator = new y());
      })(_iub.jlib, _iub.csConfiguration),
      (function(e) {
        (e.addParamToUri = function(e, t, n) {
          let r = '?';
          /\?.+/.test(e) ? (r = '&') : (e = e.replace('?', ''));
          let o = '',
            i = e.split('#');
          return (
            i[1] && (o = `#${i[1]}`), `${e.split('#')[0] + r + t}=${n}${o}`
          );
        }),
          (e.addUrlParameter = function(e, t, n) {
            return `${e + (e.indexOf('?') !== -1 ? '&' : '?') + t}=${n}`;
          }),
          (e.getQueryVariable = function(e) {
            for (
              let t = window.location.search.substring(1),
                n = t.split('&'),
                r = 0;
              r < n.length;
              r++
            ) {
              const o = n[r].split('=');
              if (o[0] === e) return o[1];
            }
            return !1;
          });
      })((_iub.jlib.uri = {})),
      (function(e, t, n) {
        (e._origActivateSnippet = e.activateSnippet),
          (e._sanitizeScript = function(e) {
            for (
              var r = t.create('script'),
                o = e.getAttribute('src'),
                i = e.getAttribute('suppressedsrc'),
                a = 0;
              a < e.attributes.length;
              a++
            ) {
              const c = e.attributes[a].name;
              c !== 'src' && r.setAttribute(c, e.getAttribute(c));
            }
            return (
              i && i !== ''
                ? r.setAttribute(
                    'suppressedsrc',
                    n.addParamToUri(i, '_iub_cs_suppressed', 1)
                  )
                : (r.setAttribute(
                    'suppressedsrc',
                    n.addParamToUri(o, '_iub_cs_suppressed', 1)
                  ),
                  r.removeAttribute('src')),
              (r.async = 1),
              t.replace(e, r),
              r
            );
          }),
          (e.activateSnippet = function(n, r) {
            const o = n.getAttribute('src');
            return (
              t.is(n, 'script') && o && (n = e._sanitizeScript(n)),
              e._origActivateSnippet(n, r)
            );
          });
      })(window._iub.csActivator, window._iub.jlib.dom, window._iub.jlib.uri),
      (function(e, t, n, r, o) {
        (_iub.csSafeActivatorVersion = '1.2.0'),
          r.ready(() => {
            const r = _iub.csConfiguration || {};
            if (
              (o.use(r.logger || 'console'),
              o.setLevel(r.logLevel || 'info'),
              t)
            ) {
              if (!_iub.consentGiven) {
                let i = t.siteId || '',
                  a = t.cookiePolicyId || '',
                  c = new RegExp(`\\b_iub_cs-(s${i}|${a})\\b`);
                _iub.consentGiven = !!e.cookie.match(c);
              }
              if (t.forceSafeActivation || _iub.consentGiven) {
                const s = t.safeTimeout || 5e3;
                o.debug('SAFEMODE: Awaiting', s, 'msecs'),
                  setTimeout(() => {
                    if (_iub.csReady)
                      o.debug(
                        'SAFEMODE: activation already done or in progress. Yielding.'
                      );
                    else {
                      o.debug(
                        'SAFEMODE: iubenda_cs is too late: forcing activation.'
                      ),
                        (_iub.csActivationViaSafeMode = !0),
                        (_iub.csReady = !0);
                      const e = t.callback || {};
                      n.activateAllSnippets(e.onActivationDone);
                    }
                  }, s);
              } else o.debug('SAFEMODE: Consent not given.');
            }
          }, _iub.csConfiguration.startOnDomReady || !1);
      })(
        document,
        _iub.csConfiguration,
        _iub.csActivator,
        _iub.jlib.dom,
        _iub.jlib.logger
      );
  }
};
