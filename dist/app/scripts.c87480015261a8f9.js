!(function (N, Le) {
  'use strict';
  'object' == typeof module && 'object' == typeof module.exports
    ? (module.exports = N.document
        ? Le(N, !0)
        : function (Q) {
            if (!Q.document) throw new Error('jQuery requires a window with a document');
            return Le(Q);
          })
    : Le(N);
})(typeof window < 'u' ? window : this, function (N, Le) {
  'use strict';
  var Q = [],
    Ne = Object.getPrototypeOf,
    oe = Q.slice,
    $t = Q.flat
      ? function (t) {
          return Q.flat.call(t);
        }
      : function (t) {
          return Q.concat.apply([], t);
        },
    Ct = Q.push,
    Ce = Q.indexOf,
    de = {},
    je = de.toString,
    Ee = de.hasOwnProperty,
    Oe = Ee.toString,
    Sn = Oe.call(Object),
    P = {},
    O = function (t) {
      return 'function' == typeof t && 'number' != typeof t.nodeType && 'function' != typeof t.item;
    },
    Ye = function (t) {
      return null != t && t === t.window;
    },
    I = N.document,
    fe = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function ce(t, n, e) {
    var i,
      r,
      o = (e = e || I).createElement('script');
    if (((o.text = t), n)) for (i in fe) (r = n[i] || (n.getAttribute && n.getAttribute(i))) && o.setAttribute(i, r);
    e.head.appendChild(o).parentNode.removeChild(o);
  }
  function K(t) {
    return null == t ? t + '' : 'object' == typeof t || 'function' == typeof t ? de[je.call(t)] || 'object' : typeof t;
  }
  var sn = /HTML$/i,
    s = function (t, n) {
      return new s.fn.init(t, n);
    };
  function on(t) {
    var n = !!t && 'length' in t && t.length,
      e = K(t);
    return !O(t) && !Ye(t) && ('array' === e || 0 === n || ('number' == typeof n && 0 < n && n - 1 in t));
  }
  function B(t, n) {
    return t.nodeName && t.nodeName.toLowerCase() === n.toLowerCase();
  }
  (s.fn = s.prototype =
    {
      jquery: '3.7.0',
      constructor: s,
      length: 0,
      toArray: function () {
        return oe.call(this);
      },
      get: function (t) {
        return null == t ? oe.call(this) : t < 0 ? this[t + this.length] : this[t];
      },
      pushStack: function (t) {
        var n = s.merge(this.constructor(), t);
        return (n.prevObject = this), n;
      },
      each: function (t) {
        return s.each(this, t);
      },
      map: function (t) {
        return this.pushStack(
          s.map(this, function (n, e) {
            return t.call(n, e, n);
          }),
        );
      },
      slice: function () {
        return this.pushStack(oe.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      even: function () {
        return this.pushStack(
          s.grep(this, function (t, n) {
            return (n + 1) % 2;
          }),
        );
      },
      odd: function () {
        return this.pushStack(
          s.grep(this, function (t, n) {
            return n % 2;
          }),
        );
      },
      eq: function (t) {
        var n = this.length,
          e = +t + (t < 0 ? n : 0);
        return this.pushStack(0 <= e && e < n ? [this[e]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: Ct,
      sort: Q.sort,
      splice: Q.splice,
    }),
    (s.extend = s.fn.extend =
      function () {
        var t,
          n,
          e,
          i,
          r,
          o,
          a = arguments[0] || {},
          l = 1,
          u = arguments.length,
          h = !1;
        for (
          'boolean' == typeof a && ((h = a), (a = arguments[l] || {}), l++),
            'object' == typeof a || O(a) || (a = {}),
            l === u && ((a = this), l--);
          l < u;
          l++
        )
          if (null != (t = arguments[l]))
            for (n in t)
              (i = t[n]),
                '__proto__' !== n &&
                  a !== i &&
                  (h && i && (s.isPlainObject(i) || (r = Array.isArray(i)))
                    ? ((e = a[n]),
                      (o = r && !Array.isArray(e) ? [] : r || s.isPlainObject(e) ? e : {}),
                      (r = !1),
                      (a[n] = s.extend(h, o, i)))
                    : void 0 !== i && (a[n] = i));
        return a;
      }),
    s.extend({
      expando: 'jQuery' + ('3.7.0' + Math.random()).replace(/\D/g, ''),
      isReady: !0,
      error: function (t) {
        throw new Error(t);
      },
      noop: function () {},
      isPlainObject: function (t) {
        var n, e;
        return !(
          !t ||
          '[object Object]' !== je.call(t) ||
          ((n = Ne(t)) && ('function' != typeof (e = Ee.call(n, 'constructor') && n.constructor) || Oe.call(e) !== Sn))
        );
      },
      isEmptyObject: function (t) {
        var n;
        for (n in t) return !1;
        return !0;
      },
      globalEval: function (t, n, e) {
        ce(t, { nonce: n && n.nonce }, e);
      },
      each: function (t, n) {
        var e,
          i = 0;
        if (on(t)) for (e = t.length; i < e && !1 !== n.call(t[i], i, t[i]); i++);
        else for (i in t) if (!1 === n.call(t[i], i, t[i])) break;
        return t;
      },
      text: function (t) {
        var n,
          e = '',
          i = 0,
          r = t.nodeType;
        if (r) {
          if (1 === r || 9 === r || 11 === r) return t.textContent;
          if (3 === r || 4 === r) return t.nodeValue;
        } else for (; (n = t[i++]); ) e += s.text(n);
        return e;
      },
      makeArray: function (t, n) {
        var e = n || [];
        return null != t && (on(Object(t)) ? s.merge(e, 'string' == typeof t ? [t] : t) : Ct.call(e, t)), e;
      },
      inArray: function (t, n, e) {
        return null == n ? -1 : Ce.call(n, t, e);
      },
      isXMLDoc: function (t) {
        var e = t && (t.ownerDocument || t).documentElement;
        return !sn.test((t && t.namespaceURI) || (e && e.nodeName) || 'HTML');
      },
      merge: function (t, n) {
        for (var e = +n.length, i = 0, r = t.length; i < e; i++) t[r++] = n[i];
        return (t.length = r), t;
      },
      grep: function (t, n, e) {
        for (var i = [], r = 0, o = t.length, a = !e; r < o; r++) !n(t[r], r) !== a && i.push(t[r]);
        return i;
      },
      map: function (t, n, e) {
        var i,
          r,
          o = 0,
          a = [];
        if (on(t)) for (i = t.length; o < i; o++) null != (r = n(t[o], o, e)) && a.push(r);
        else for (o in t) null != (r = n(t[o], o, e)) && a.push(r);
        return $t(a);
      },
      guid: 1,
      support: P,
    }),
    'function' == typeof Symbol && (s.fn[Symbol.iterator] = Q[Symbol.iterator]),
    s.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (t, n) {
      de['[object ' + n + ']'] = n.toLowerCase();
    });
  var an = Q.pop,
    Dn = Q.sort,
    Ln = Q.splice,
    W = '[\\x20\\t\\r\\n\\f]',
    lt = new RegExp('^' + W + '+|((?:^|[^\\\\])(?:\\\\.)*)' + W + '+$', 'g');
  s.contains = function (t, n) {
    var e = n && n.parentNode;
    return (
      t === e ||
      !(
        !e ||
        1 !== e.nodeType ||
        !(t.contains ? t.contains(e) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(e))
      )
    );
  };
  var Nn = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  function jn(t, n) {
    return n
      ? '\0' === t
        ? '\ufffd'
        : t.slice(0, -1) + '\\' + t.charCodeAt(t.length - 1).toString(16) + ' '
      : '\\' + t;
  }
  s.escapeSelector = function (t) {
    return (t + '').replace(Nn, jn);
  };
  var Ae = I,
    Rt = Ct;
  !(function () {
    var t,
      n,
      e,
      i,
      r,
      o,
      a,
      l,
      u,
      h,
      p = Rt,
      m = s.expando,
      f = 0,
      y = 0,
      x = G(),
      D = G(),
      S = G(),
      z = G(),
      V = function (c, d) {
        return c === d && (r = !0), 0;
      },
      Se =
        'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      ie = '(?:\\\\[\\da-fA-F]{1,6}' + W + '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+',
      q =
        '\\[' +
        W +
        '*(' +
        ie +
        ')(?:' +
        W +
        '*([*^$|!~]?=)' +
        W +
        '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
        ie +
        '))|)' +
        W +
        '*\\]',
      Ht =
        ':(' +
        ie +
        ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
        q +
        ')*)|.*)\\)|)',
      $ = new RegExp(W + '+', 'g'),
      Y = new RegExp('^' + W + '*,' + W + '*'),
      An = new RegExp('^' + W + '*([>+~]|' + W + ')' + W + '*'),
      Ci = new RegExp(W + '|>'),
      Ve = new RegExp(Ht),
      kn = new RegExp('^' + ie + '$'),
      at = {
        ID: new RegExp('^#(' + ie + ')'),
        CLASS: new RegExp('^\\.(' + ie + ')'),
        TAG: new RegExp('^(' + ie + '|[*])'),
        ATTR: new RegExp('^' + q),
        PSEUDO: new RegExp('^' + Ht),
        CHILD: new RegExp(
          '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
            W +
            '*(even|odd|(([+-]|)(\\d*)n|)' +
            W +
            '*(?:([+-]|)' +
            W +
            '*(\\d+)|))' +
            W +
            '*\\)|)',
          'i',
        ),
        bool: new RegExp('^(?:' + Se + ')$', 'i'),
        needsContext: new RegExp(
          '^' +
            W +
            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            W +
            '*((?:-\\d)?\\d*)' +
            W +
            '*\\)|)(?=[^-]|$)',
          'i',
        ),
      },
      wt = /^(?:input|select|textarea|button)$/i,
      tn = /^h\d$/i,
      De = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      re = /[+~]/,
      Z = new RegExp('\\\\[\\da-fA-F]{1,6}' + W + '?|\\\\([^\\r\\n\\f])', 'g'),
      ue = function (c, d) {
        var g = '0x' + c.slice(1) - 65536;
        return (
          d || (g < 0 ? String.fromCharCode(g + 65536) : String.fromCharCode((g >> 10) | 55296, (1023 & g) | 56320))
        );
      },
      xt = function () {
        Tt();
      },
      he = si(
        function (c) {
          return !0 === c.disabled && B(c, 'fieldset');
        },
        { dir: 'parentNode', next: 'legend' },
      );
    try {
      p.apply((Q = oe.call(Ae.childNodes)), Ae.childNodes);
    } catch {
      p = {
        apply: function (d, g) {
          Rt.apply(d, oe.call(g));
        },
        call: function (d) {
          Rt.apply(d, oe.call(arguments, 1));
        },
      };
    }
    function L(c, d, g, v) {
      var b,
        T,
        C,
        k,
        w,
        R,
        M,
        H = d && d.ownerDocument,
        F = d ? d.nodeType : 9;
      if (((g = g || []), 'string' != typeof c || !c || (1 !== F && 9 !== F && 11 !== F))) return g;
      if (!v && (Tt(d), (d = d || o), l)) {
        if (11 !== F && (w = De.exec(c)))
          if ((b = w[1])) {
            if (9 === F) {
              if (!(C = d.getElementById(b))) return g;
              if (C.id === b) return p.call(g, C), g;
            } else if (H && (C = H.getElementById(b)) && L.contains(d, C) && C.id === b) return p.call(g, C), g;
          } else {
            if (w[2]) return p.apply(g, d.getElementsByTagName(c)), g;
            if ((b = w[3]) && d.getElementsByClassName) return p.apply(g, d.getElementsByClassName(b)), g;
          }
        if (!(z[c + ' '] || (u && u.test(c)))) {
          if (((M = c), (H = d), 1 === F && (Ci.test(c) || An.test(c)))) {
            for (
              ((H = (re.test(c) && Ei(d.parentNode)) || d) == d && P.scope) ||
                ((k = d.getAttribute('id')) ? (k = s.escapeSelector(k)) : d.setAttribute('id', (k = m))),
                T = (R = ii(c)).length;
              T--;

            )
              R[T] = (k ? '#' + k : ':scope') + ' ' + ri(R[T]);
            M = R.join(',');
          }
          try {
            return p.apply(g, H.querySelectorAll(M)), g;
          } catch {
            z(c, !0);
          } finally {
            k === m && d.removeAttribute('id');
          }
        }
      }
      return Ni(c.replace(lt, '$1'), d, g, v);
    }
    function G() {
      var c = [];
      return function d(g, v) {
        return c.push(g + ' ') > n.cacheLength && delete d[c.shift()], (d[g + ' '] = v);
      };
    }
    function J(c) {
      return (c[m] = !0), c;
    }
    function X(c) {
      var d = o.createElement('fieldset');
      try {
        return !!c(d);
      } catch {
        return !1;
      } finally {
        d.parentNode && d.parentNode.removeChild(d), (d = null);
      }
    }
    function Qe(c) {
      return function (d) {
        return B(d, 'input') && d.type === c;
      };
    }
    function nn(c) {
      return function (d) {
        return (B(d, 'input') || B(d, 'button')) && d.type === c;
      };
    }
    function ni(c) {
      return function (d) {
        return 'form' in d
          ? d.parentNode && !1 === d.disabled
            ? 'label' in d
              ? 'label' in d.parentNode
                ? d.parentNode.disabled === c
                : d.disabled === c
              : d.isDisabled === c || (d.isDisabled !== !c && he(d) === c)
            : d.disabled === c
          : 'label' in d && d.disabled === c;
      };
    }
    function qt(c) {
      return J(function (d) {
        return (
          (d = +d),
          J(function (g, v) {
            for (var b, T = c([], g.length, d), C = T.length; C--; ) g[(b = T[C])] && (g[b] = !(v[b] = g[b]));
          })
        );
      });
    }
    function Ei(c) {
      return c && typeof c.getElementsByTagName < 'u' && c;
    }
    function Tt(c) {
      var d,
        g = c ? c.ownerDocument || c : Ae;
      return (
        g != o &&
          9 === g.nodeType &&
          g.documentElement &&
          ((a = (o = g).documentElement),
          (l = !s.isXMLDoc(o)),
          (h = a.matches || a.webkitMatchesSelector || a.msMatchesSelector),
          Ae != o && (d = o.defaultView) && d.top !== d && d.addEventListener('unload', xt),
          (P.getById = X(function (v) {
            return (a.appendChild(v).id = s.expando), !o.getElementsByName || !o.getElementsByName(s.expando).length;
          })),
          (P.disconnectedMatch = X(function (v) {
            return h.call(v, '*');
          })),
          (P.scope = X(function () {
            return o.querySelectorAll(':scope');
          })),
          (P.cssHas = X(function () {
            try {
              return o.querySelector(':has(*,:jqfake)'), !1;
            } catch {
              return !0;
            }
          })),
          P.getById
            ? ((n.filter.ID = function (v) {
                var b = v.replace(Z, ue);
                return function (T) {
                  return T.getAttribute('id') === b;
                };
              }),
              (n.find.ID = function (v, b) {
                if (typeof b.getElementById < 'u' && l) {
                  var T = b.getElementById(v);
                  return T ? [T] : [];
                }
              }))
            : ((n.filter.ID = function (v) {
                var b = v.replace(Z, ue);
                return function (T) {
                  var C = typeof T.getAttributeNode < 'u' && T.getAttributeNode('id');
                  return C && C.value === b;
                };
              }),
              (n.find.ID = function (v, b) {
                if (typeof b.getElementById < 'u' && l) {
                  var T,
                    C,
                    k,
                    w = b.getElementById(v);
                  if (w) {
                    if ((T = w.getAttributeNode('id')) && T.value === v) return [w];
                    for (k = b.getElementsByName(v), C = 0; (w = k[C++]); )
                      if ((T = w.getAttributeNode('id')) && T.value === v) return [w];
                  }
                  return [];
                }
              })),
          (n.find.TAG = function (v, b) {
            return typeof b.getElementsByTagName < 'u' ? b.getElementsByTagName(v) : b.querySelectorAll(v);
          }),
          (n.find.CLASS = function (v, b) {
            if (typeof b.getElementsByClassName < 'u' && l) return b.getElementsByClassName(v);
          }),
          (u = []),
          X(function (v) {
            var b;
            (a.appendChild(v).innerHTML =
              "<a id='" +
              m +
              "' href='' disabled='disabled'></a><select id='" +
              m +
              "-\r\\' disabled='disabled'><option selected=''></option></select>"),
              v.querySelectorAll('[selected]').length || u.push('\\[' + W + '*(?:value|' + Se + ')'),
              v.querySelectorAll('[id~=' + m + '-]').length || u.push('~='),
              v.querySelectorAll('a#' + m + '+*').length || u.push('.#.+[+~]'),
              v.querySelectorAll(':checked').length || u.push(':checked'),
              (b = o.createElement('input')).setAttribute('type', 'hidden'),
              v.appendChild(b).setAttribute('name', 'D'),
              (a.appendChild(v).disabled = !0),
              2 !== v.querySelectorAll(':disabled').length && u.push(':enabled', ':disabled'),
              (b = o.createElement('input')).setAttribute('name', ''),
              v.appendChild(b),
              v.querySelectorAll("[name='']").length || u.push('\\[' + W + '*name' + W + '*=' + W + '*(?:\'\'|"")');
          }),
          P.cssHas || u.push(':has'),
          (u = u.length && new RegExp(u.join('|'))),
          (V = function (v, b) {
            if (v === b) return (r = !0), 0;
            var T = !v.compareDocumentPosition - !b.compareDocumentPosition;
            return (
              T ||
              (1 & (T = (v.ownerDocument || v) == (b.ownerDocument || b) ? v.compareDocumentPosition(b) : 1) ||
              (!P.sortDetached && b.compareDocumentPosition(v) === T)
                ? v === o || (v.ownerDocument == Ae && L.contains(Ae, v))
                  ? -1
                  : b === o || (b.ownerDocument == Ae && L.contains(Ae, b))
                  ? 1
                  : i
                  ? Ce.call(i, v) - Ce.call(i, b)
                  : 0
                : 4 & T
                ? -1
                : 1)
            );
          })),
        o
      );
    }
    for (t in ((L.matches = function (c, d) {
      return L(c, null, null, d);
    }),
    (L.matchesSelector = function (c, d) {
      if ((Tt(c), l && !z[d + ' '] && (!u || !u.test(d))))
        try {
          var g = h.call(c, d);
          if (g || P.disconnectedMatch || (c.document && 11 !== c.document.nodeType)) return g;
        } catch {
          z(d, !0);
        }
      return 0 < L(d, o, null, [c]).length;
    }),
    (L.contains = function (c, d) {
      return (c.ownerDocument || c) != o && Tt(c), s.contains(c, d);
    }),
    (L.attr = function (c, d) {
      (c.ownerDocument || c) != o && Tt(c);
      var g = n.attrHandle[d.toLowerCase()],
        v = g && Ee.call(n.attrHandle, d.toLowerCase()) ? g(c, d, !l) : void 0;
      return void 0 !== v ? v : c.getAttribute(d);
    }),
    (L.error = function (c) {
      throw new Error('Syntax error, unrecognized expression: ' + c);
    }),
    (s.uniqueSort = function (c) {
      var d,
        g = [],
        v = 0,
        b = 0;
      if (((r = !P.sortStable), (i = !P.sortStable && oe.call(c, 0)), Dn.call(c, V), r)) {
        for (; (d = c[b++]); ) d === c[b] && (v = g.push(b));
        for (; v--; ) Ln.call(c, g[v], 1);
      }
      return (i = null), c;
    }),
    (s.fn.uniqueSort = function () {
      return this.pushStack(s.uniqueSort(oe.apply(this)));
    }),
    ((n = s.expr =
      {
        cacheLength: 50,
        createPseudo: J,
        match: at,
        attrHandle: {},
        find: {},
        relative: {
          '>': { dir: 'parentNode', first: !0 },
          ' ': { dir: 'parentNode' },
          '+': { dir: 'previousSibling', first: !0 },
          '~': { dir: 'previousSibling' },
        },
        preFilter: {
          ATTR: function (c) {
            return (
              (c[1] = c[1].replace(Z, ue)),
              (c[3] = (c[3] || c[4] || c[5] || '').replace(Z, ue)),
              '~=' === c[2] && (c[3] = ' ' + c[3] + ' '),
              c.slice(0, 4)
            );
          },
          CHILD: function (c) {
            return (
              (c[1] = c[1].toLowerCase()),
              'nth' === c[1].slice(0, 3)
                ? (c[3] || L.error(c[0]),
                  (c[4] = +(c[4] ? c[5] + (c[6] || 1) : 2 * ('even' === c[3] || 'odd' === c[3]))),
                  (c[5] = +(c[7] + c[8] || 'odd' === c[3])))
                : c[3] && L.error(c[0]),
              c
            );
          },
          PSEUDO: function (c) {
            var d,
              g = !c[6] && c[2];
            return at.CHILD.test(c[0])
              ? null
              : (c[3]
                  ? (c[2] = c[4] || c[5] || '')
                  : g &&
                    Ve.test(g) &&
                    (d = ii(g, !0)) &&
                    (d = g.indexOf(')', g.length - d) - g.length) &&
                    ((c[0] = c[0].slice(0, d)), (c[2] = g.slice(0, d))),
                c.slice(0, 3));
          },
        },
        filter: {
          TAG: function (c) {
            var d = c.replace(Z, ue).toLowerCase();
            return '*' === c
              ? function () {
                  return !0;
                }
              : function (g) {
                  return B(g, d);
                };
          },
          CLASS: function (c) {
            var d = x[c + ' '];
            return (
              d ||
              ((d = new RegExp('(^|' + W + ')' + c + '(' + W + '|$)')) &&
                x(c, function (g) {
                  return d.test(
                    ('string' == typeof g.className && g.className) ||
                      (typeof g.getAttribute < 'u' && g.getAttribute('class')) ||
                      '',
                  );
                }))
            );
          },
          ATTR: function (c, d, g) {
            return function (v) {
              var b = L.attr(v, c);
              return null == b
                ? '!=' === d
                : !d ||
                    ((b += ''),
                    '=' === d
                      ? b === g
                      : '!=' === d
                      ? b !== g
                      : '^=' === d
                      ? g && 0 === b.indexOf(g)
                      : '*=' === d
                      ? g && -1 < b.indexOf(g)
                      : '$=' === d
                      ? g && b.slice(-g.length) === g
                      : '~=' === d
                      ? -1 < (' ' + b.replace($, ' ') + ' ').indexOf(g)
                      : '|=' === d && (b === g || b.slice(0, g.length + 1) === g + '-'));
            };
          },
          CHILD: function (c, d, g, v, b) {
            var T = 'nth' !== c.slice(0, 3),
              C = 'last' !== c.slice(-4),
              k = 'of-type' === d;
            return 1 === v && 0 === b
              ? function (w) {
                  return !!w.parentNode;
                }
              : function (w, R, M) {
                  var H,
                    F,
                    j,
                    ne,
                    le,
                    se = T !== C ? 'nextSibling' : 'previousSibling',
                    be = w.parentNode,
                    Te = k && w.nodeName.toLowerCase(),
                    qe = !M && !k,
                    U = !1;
                  if (be) {
                    if (T) {
                      for (; se; ) {
                        for (j = w; (j = j[se]); ) if (k ? B(j, Te) : 1 === j.nodeType) return !1;
                        le = se = 'only' === c && !le && 'nextSibling';
                      }
                      return !0;
                    }
                    if (((le = [C ? be.firstChild : be.lastChild]), C && qe)) {
                      for (
                        U = (ne = (H = (F = be[m] || (be[m] = {}))[c] || [])[0] === f && H[1]) && H[2],
                          j = ne && be.childNodes[ne];
                        (j = (++ne && j && j[se]) || (U = ne = 0) || le.pop());

                      )
                        if (1 === j.nodeType && ++U && j === w) {
                          F[c] = [f, ne, U];
                          break;
                        }
                    } else if ((qe && (U = ne = (H = (F = w[m] || (w[m] = {}))[c] || [])[0] === f && H[1]), !1 === U))
                      for (
                        ;
                        (j = (++ne && j && j[se]) || (U = ne = 0) || le.pop()) &&
                        (!(k ? B(j, Te) : 1 === j.nodeType) ||
                          !++U ||
                          (qe && ((F = j[m] || (j[m] = {}))[c] = [f, U]), j !== w));

                      );
                    return (U -= b) === v || (U % v == 0 && 0 <= U / v);
                  }
                };
          },
          PSEUDO: function (c, d) {
            var g,
              v = n.pseudos[c] || n.setFilters[c.toLowerCase()] || L.error('unsupported pseudo: ' + c);
            return v[m]
              ? v(d)
              : 1 < v.length
              ? ((g = [c, c, '', d]),
                n.setFilters.hasOwnProperty(c.toLowerCase())
                  ? J(function (b, T) {
                      for (var C, k = v(b, d), w = k.length; w--; ) b[(C = Ce.call(b, k[w]))] = !(T[C] = k[w]);
                    })
                  : function (b) {
                      return v(b, 0, g);
                    })
              : v;
          },
        },
        pseudos: {
          not: J(function (c) {
            var d = [],
              g = [],
              v = Di(c.replace(lt, '$1'));
            return v[m]
              ? J(function (b, T, C, k) {
                  for (var w, R = v(b, null, k, []), M = b.length; M--; ) (w = R[M]) && (b[M] = !(T[M] = w));
                })
              : function (b, T, C) {
                  return (d[0] = b), v(d, null, C, g), (d[0] = null), !g.pop();
                };
          }),
          has: J(function (c) {
            return function (d) {
              return 0 < L(c, d).length;
            };
          }),
          contains: J(function (c) {
            return (
              (c = c.replace(Z, ue)),
              function (d) {
                return -1 < (d.textContent || s.text(d)).indexOf(c);
              }
            );
          }),
          lang: J(function (c) {
            return (
              kn.test(c || '') || L.error('unsupported lang: ' + c),
              (c = c.replace(Z, ue).toLowerCase()),
              function (d) {
                var g;
                do {
                  if ((g = l ? d.lang : d.getAttribute('xml:lang') || d.getAttribute('lang')))
                    return (g = g.toLowerCase()) === c || 0 === g.indexOf(c + '-');
                } while ((d = d.parentNode) && 1 === d.nodeType);
                return !1;
              }
            );
          }),
          target: function (c) {
            var d = N.location && N.location.hash;
            return d && d.slice(1) === c.id;
          },
          root: function (c) {
            return c === a;
          },
          focus: function (c) {
            return (
              c ===
                (function () {
                  try {
                    return o.activeElement;
                  } catch {}
                })() &&
              o.hasFocus() &&
              !!(c.type || c.href || ~c.tabIndex)
            );
          },
          enabled: ni(!1),
          disabled: ni(!0),
          checked: function (c) {
            return (B(c, 'input') && !!c.checked) || (B(c, 'option') && !!c.selected);
          },
          selected: function (c) {
            return !0 === c.selected;
          },
          empty: function (c) {
            for (c = c.firstChild; c; c = c.nextSibling) if (c.nodeType < 6) return !1;
            return !0;
          },
          parent: function (c) {
            return !n.pseudos.empty(c);
          },
          header: function (c) {
            return tn.test(c.nodeName);
          },
          input: function (c) {
            return wt.test(c.nodeName);
          },
          button: function (c) {
            return (B(c, 'input') && 'button' === c.type) || B(c, 'button');
          },
          text: function (c) {
            var d;
            return (
              B(c, 'input') && 'text' === c.type && (null == (d = c.getAttribute('type')) || 'text' === d.toLowerCase())
            );
          },
          first: qt(function () {
            return [0];
          }),
          last: qt(function (c, d) {
            return [d - 1];
          }),
          eq: qt(function (c, d, g) {
            return [g < 0 ? g + d : g];
          }),
          even: qt(function (c, d) {
            for (var g = 0; g < d; g += 2) c.push(g);
            return c;
          }),
          odd: qt(function (c, d) {
            for (var g = 1; g < d; g += 2) c.push(g);
            return c;
          }),
          lt: qt(function (c, d, g) {
            var v;
            for (v = g < 0 ? g + d : d < g ? d : g; 0 <= --v; ) c.push(v);
            return c;
          }),
          gt: qt(function (c, d, g) {
            for (var v = g < 0 ? g + d : g; ++v < d; ) c.push(v);
            return c;
          }),
        },
      }).pseudos.nth = n.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      n.pseudos[t] = Qe(t);
    for (t in { submit: !0, reset: !0 }) n.pseudos[t] = nn(t);
    function Li() {}
    function ii(c, d) {
      var g,
        v,
        b,
        T,
        C,
        k,
        w,
        R = D[c + ' '];
      if (R) return d ? 0 : R.slice(0);
      for (C = c, k = [], w = n.preFilter; C; ) {
        for (T in ((g && !(v = Y.exec(C))) || (v && (C = C.slice(v[0].length) || C), k.push((b = []))),
        (g = !1),
        (v = An.exec(C)) &&
          ((g = v.shift()), b.push({ value: g, type: v[0].replace(lt, ' ') }), (C = C.slice(g.length))),
        n.filter))
          !(v = at[T].exec(C)) ||
            (w[T] && !(v = w[T](v))) ||
            ((g = v.shift()), b.push({ value: g, type: T, matches: v }), (C = C.slice(g.length)));
        if (!g) break;
      }
      return d ? C.length : C ? L.error(c) : D(c, k).slice(0);
    }
    function ri(c) {
      for (var d = 0, g = c.length, v = ''; d < g; d++) v += c[d].value;
      return v;
    }
    function si(c, d, g) {
      var v = d.dir,
        b = d.next,
        T = b || v,
        C = g && 'parentNode' === T,
        k = y++;
      return d.first
        ? function (w, R, M) {
            for (; (w = w[v]); ) if (1 === w.nodeType || C) return c(w, R, M);
            return !1;
          }
        : function (w, R, M) {
            var H,
              F,
              j = [f, k];
            if (M) {
              for (; (w = w[v]); ) if ((1 === w.nodeType || C) && c(w, R, M)) return !0;
            } else
              for (; (w = w[v]); )
                if (1 === w.nodeType || C)
                  if (((F = w[m] || (w[m] = {})), b && B(w, b))) w = w[v] || w;
                  else {
                    if ((H = F[T]) && H[0] === f && H[1] === k) return (j[2] = H[2]);
                    if (((F[T] = j)[2] = c(w, R, M))) return !0;
                  }
            return !1;
          };
    }
    function Ai(c) {
      return 1 < c.length
        ? function (d, g, v) {
            for (var b = c.length; b--; ) if (!c[b](d, g, v)) return !1;
            return !0;
          }
        : c[0];
    }
    function oi(c, d, g, v, b) {
      for (var T, C = [], k = 0, w = c.length, R = null != d; k < w; k++)
        (T = c[k]) && ((g && !g(T, v, b)) || (C.push(T), R && d.push(k)));
      return C;
    }
    function ki(c, d, g, v, b, T) {
      return (
        v && !v[m] && (v = ki(v)),
        b && !b[m] && (b = ki(b, T)),
        J(function (C, k, w, R) {
          var M,
            H,
            F,
            j,
            ne = [],
            le = [],
            se = k.length,
            be =
              C ||
              (function (qe, U, Ft) {
                for (var Fe = 0, ai = U.length; Fe < ai; Fe++) L(qe, U[Fe], Ft);
                return Ft;
              })(d || '*', w.nodeType ? [w] : w, []),
            Te = !c || (!C && d) ? be : oi(be, ne, c, w, R);
          if ((g ? g(Te, (j = b || (C ? c : se || v) ? [] : k), w, R) : (j = Te), v))
            for (M = oi(j, le), v(M, [], w, R), H = M.length; H--; ) (F = M[H]) && (j[le[H]] = !(Te[le[H]] = F));
          if (C) {
            if (b || c) {
              if (b) {
                for (M = [], H = j.length; H--; ) (F = j[H]) && M.push((Te[H] = F));
                b(null, (j = []), M, R);
              }
              for (H = j.length; H--; ) (F = j[H]) && -1 < (M = b ? Ce.call(C, F) : ne[H]) && (C[M] = !(k[M] = F));
            }
          } else (j = oi(j === k ? j.splice(se, j.length) : j)), b ? b(null, k, j, R) : p.apply(k, j);
        })
      );
    }
    function Si(c) {
      for (
        var d,
          g,
          v,
          b = c.length,
          T = n.relative[c[0].type],
          C = T || n.relative[' '],
          k = T ? 1 : 0,
          w = si(
            function (H) {
              return H === d;
            },
            C,
            !0,
          ),
          R = si(
            function (H) {
              return -1 < Ce.call(d, H);
            },
            C,
            !0,
          ),
          M = [
            function (H, F, j) {
              var ne = (!T && (j || F != e)) || ((d = F).nodeType ? w(H, F, j) : R(H, F, j));
              return (d = null), ne;
            },
          ];
        k < b;
        k++
      )
        if ((g = n.relative[c[k].type])) M = [si(Ai(M), g)];
        else {
          if ((g = n.filter[c[k].type].apply(null, c[k].matches))[m]) {
            for (v = ++k; v < b && !n.relative[c[v].type]; v++);
            return ki(
              1 < k && Ai(M),
              1 < k && ri(c.slice(0, k - 1).concat({ value: ' ' === c[k - 2].type ? '*' : '' })).replace(lt, '$1'),
              g,
              k < v && Si(c.slice(k, v)),
              v < b && Si((c = c.slice(v))),
              v < b && ri(c),
            );
          }
          M.push(g);
        }
      return Ai(M);
    }
    function Di(c, d) {
      var g,
        v,
        b,
        T,
        C,
        k,
        w = [],
        R = [],
        M = S[c + ' '];
      if (!M) {
        for (d || (d = ii(c)), g = d.length; g--; ) (M = Si(d[g]))[m] ? w.push(M) : R.push(M);
        (M = S(
          c,
          ((v = R),
          (T = 0 < (b = w).length),
          (C = 0 < v.length),
          (k = function (H, F, j, ne, le) {
            var se,
              be,
              Te,
              qe = 0,
              U = '0',
              Ft = H && [],
              Fe = [],
              ai = e,
              ji = H || (C && n.find.TAG('*', le)),
              Oi = (f += null == ai ? 1 : Math.random() || 0.1),
              Ii = ji.length;
            for (le && (e = F == o || F || le); U !== Ii && null != (se = ji[U]); U++) {
              if (C && se) {
                for (be = 0, F || se.ownerDocument == o || (Tt(se), (j = !l)); (Te = v[be++]); )
                  if (Te(se, F || o, j)) {
                    p.call(ne, se);
                    break;
                  }
                le && (f = Oi);
              }
              T && ((se = !Te && se) && qe--, H && Ft.push(se));
            }
            if (((qe += U), T && U !== qe)) {
              for (be = 0; (Te = b[be++]); ) Te(Ft, Fe, F, j);
              if (H) {
                if (0 < qe) for (; U--; ) Ft[U] || Fe[U] || (Fe[U] = an.call(ne));
                Fe = oi(Fe);
              }
              p.apply(ne, Fe), le && !H && 0 < Fe.length && 1 < qe + b.length && s.uniqueSort(ne);
            }
            return le && ((f = Oi), (e = ai)), Ft;
          }),
          T ? J(k) : k),
        )).selector = c;
      }
      return M;
    }
    function Ni(c, d, g, v) {
      var b,
        T,
        C,
        k,
        w,
        R = 'function' == typeof c && c,
        M = !v && ii((c = R.selector || c));
      if (((g = g || []), 1 === M.length)) {
        if (
          2 < (T = M[0] = M[0].slice(0)).length &&
          'ID' === (C = T[0]).type &&
          9 === d.nodeType &&
          l &&
          n.relative[T[1].type]
        ) {
          if (!(d = (n.find.ID(C.matches[0].replace(Z, ue), d) || [])[0])) return g;
          R && (d = d.parentNode), (c = c.slice(T.shift().value.length));
        }
        for (b = at.needsContext.test(c) ? 0 : T.length; b-- && !n.relative[(k = (C = T[b]).type)]; )
          if ((w = n.find[k]) && (v = w(C.matches[0].replace(Z, ue), (re.test(T[0].type) && Ei(d.parentNode)) || d))) {
            if ((T.splice(b, 1), !(c = v.length && ri(T)))) return p.apply(g, v), g;
            break;
          }
      }
      return (R || Di(c, M))(v, d, !l, g, !d || (re.test(c) && Ei(d.parentNode)) || d), g;
    }
    (Li.prototype = n.filters = n.pseudos),
      (n.setFilters = new Li()),
      (P.sortStable = m.split('').sort(V).join('') === m),
      Tt(),
      (P.sortDetached = X(function (c) {
        return 1 & c.compareDocumentPosition(o.createElement('fieldset'));
      })),
      (s.find = L),
      (s.expr[':'] = s.expr.pseudos),
      (s.unique = s.uniqueSort),
      (L.compile = Di),
      (L.select = Ni),
      (L.setDocument = Tt),
      (L.escape = s.escapeSelector),
      (L.getText = s.text),
      (L.isXML = s.isXMLDoc),
      (L.selectors = s.expr),
      (L.support = s.support),
      (L.uniqueSort = s.uniqueSort);
  })();
  var $e = function (t, n, e) {
      for (var i = [], r = void 0 !== e; (t = t[n]) && 9 !== t.nodeType; )
        if (1 === t.nodeType) {
          if (r && s(t).is(e)) break;
          i.push(t);
        }
      return i;
    },
    On = function (t, n) {
      for (var e = []; t; t = t.nextSibling) 1 === t.nodeType && t !== n && e.push(t);
      return e;
    },
    ln = s.expr.match.needsContext,
    _ = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function Et(t, n, e) {
    return O(n)
      ? s.grep(t, function (i, r) {
          return !!n.call(i, r, i) !== e;
        })
      : n.nodeType
      ? s.grep(t, function (i) {
          return (i === n) !== e;
        })
      : 'string' != typeof n
      ? s.grep(t, function (i) {
          return -1 < Ce.call(n, i) !== e;
        })
      : s.filter(n, t, e);
  }
  (s.filter = function (t, n, e) {
    var i = n[0];
    return (
      e && (t = ':not(' + t + ')'),
      1 === n.length && 1 === i.nodeType
        ? s.find.matchesSelector(i, t)
          ? [i]
          : []
        : s.find.matches(
            t,
            s.grep(n, function (r) {
              return 1 === r.nodeType;
            }),
          )
    );
  }),
    s.fn.extend({
      find: function (t) {
        var n,
          e,
          i = this.length,
          r = this;
        if ('string' != typeof t)
          return this.pushStack(
            s(t).filter(function () {
              for (n = 0; n < i; n++) if (s.contains(r[n], this)) return !0;
            }),
          );
        for (e = this.pushStack([]), n = 0; n < i; n++) s.find(t, r[n], e);
        return 1 < i ? s.uniqueSort(e) : e;
      },
      filter: function (t) {
        return this.pushStack(Et(this, t || [], !1));
      },
      not: function (t) {
        return this.pushStack(Et(this, t || [], !0));
      },
      is: function (t) {
        return !!Et(this, 'string' == typeof t && ln.test(t) ? s(t) : t || [], !1).length;
      },
    });
  var cn,
    un = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((s.fn.init = function (t, n, e) {
    var i, r;
    if (!t) return this;
    if (((e = e || cn), 'string' == typeof t)) {
      if (
        !(i = '<' === t[0] && '>' === t[t.length - 1] && 3 <= t.length ? [null, t, null] : un.exec(t)) ||
        (!i[1] && n)
      )
        return !n || n.jquery ? (n || e).find(t) : this.constructor(n).find(t);
      if (i[1]) {
        if (
          (s.merge(
            this,
            s.parseHTML(i[1], (n = n instanceof s ? n[0] : n) && n.nodeType ? n.ownerDocument || n : I, !0),
          ),
          _.test(i[1]) && s.isPlainObject(n))
        )
          for (i in n) O(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
        return this;
      }
      return (r = I.getElementById(i[2])) && ((this[0] = r), (this.length = 1)), this;
    }
    return t.nodeType
      ? ((this[0] = t), (this.length = 1), this)
      : O(t)
      ? void 0 !== e.ready
        ? e.ready(t)
        : t(s)
      : s.makeArray(t, this);
  }).prototype = s.fn),
    (cn = s(I));
  var Ie = /^(?:parents|prev(?:Until|All))/,
    At = { children: !0, contents: !0, next: !0, prev: !0 };
  function pe(t, n) {
    for (; (t = t[n]) && 1 !== t.nodeType; );
    return t;
  }
  s.fn.extend({
    has: function (t) {
      var n = s(t, this),
        e = n.length;
      return this.filter(function () {
        for (var i = 0; i < e; i++) if (s.contains(this, n[i])) return !0;
      });
    },
    closest: function (t, n) {
      var e,
        i = 0,
        r = this.length,
        o = [],
        a = 'string' != typeof t && s(t);
      if (!ln.test(t))
        for (; i < r; i++)
          for (e = this[i]; e && e !== n; e = e.parentNode)
            if (e.nodeType < 11 && (a ? -1 < a.index(e) : 1 === e.nodeType && s.find.matchesSelector(e, t))) {
              o.push(e);
              break;
            }
      return this.pushStack(1 < o.length ? s.uniqueSort(o) : o);
    },
    index: function (t) {
      return t
        ? 'string' == typeof t
          ? Ce.call(s(t), this[0])
          : Ce.call(this, t.jquery ? t[0] : t)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (t, n) {
      return this.pushStack(s.uniqueSort(s.merge(this.get(), s(t, n))));
    },
    addBack: function (t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    },
  }),
    s.each(
      {
        parent: function (t) {
          var n = t.parentNode;
          return n && 11 !== n.nodeType ? n : null;
        },
        parents: function (t) {
          return $e(t, 'parentNode');
        },
        parentsUntil: function (t, n, e) {
          return $e(t, 'parentNode', e);
        },
        next: function (t) {
          return pe(t, 'nextSibling');
        },
        prev: function (t) {
          return pe(t, 'previousSibling');
        },
        nextAll: function (t) {
          return $e(t, 'nextSibling');
        },
        prevAll: function (t) {
          return $e(t, 'previousSibling');
        },
        nextUntil: function (t, n, e) {
          return $e(t, 'nextSibling', e);
        },
        prevUntil: function (t, n, e) {
          return $e(t, 'previousSibling', e);
        },
        siblings: function (t) {
          return On((t.parentNode || {}).firstChild, t);
        },
        children: function (t) {
          return On(t.firstChild);
        },
        contents: function (t) {
          return null != t.contentDocument && Ne(t.contentDocument)
            ? t.contentDocument
            : (B(t, 'template') && (t = t.content || t), s.merge([], t.childNodes));
        },
      },
      function (t, n) {
        s.fn[t] = function (e, i) {
          var r = s.map(this, n, e);
          return (
            'Until' !== t.slice(-5) && (i = e),
            i && 'string' == typeof i && (r = s.filter(i, r)),
            1 < this.length && (At[t] || s.uniqueSort(r), Ie.test(t) && r.reverse()),
            this.pushStack(r)
          );
        };
      },
    );
  var ge = /[^\x20\t\r\n\f]+/g;
  function E(t) {
    return t;
  }
  function Ke(t) {
    throw t;
  }
  function ct(t, n, e, i) {
    var r;
    try {
      t && O((r = t.promise))
        ? r.call(t).done(n).fail(e)
        : t && O((r = t.then))
        ? r.call(t, n, e)
        : n.apply(void 0, [t].slice(i));
    } catch (o) {
      e.apply(void 0, [o]);
    }
  }
  (s.Callbacks = function (t) {
    var e;
    t =
      'string' == typeof t
        ? ((e = {}),
          s.each(t.match(ge) || [], function (f, y) {
            e[y] = !0;
          }),
          e)
        : s.extend({}, t);
    var i,
      r,
      o,
      a,
      l = [],
      u = [],
      h = -1,
      p = function () {
        for (a = a || t.once, o = i = !0; u.length; h = -1)
          for (r = u.shift(); ++h < l.length; )
            !1 === l[h].apply(r[0], r[1]) && t.stopOnFalse && ((h = l.length), (r = !1));
        t.memory || (r = !1), (i = !1), a && (l = r ? [] : '');
      },
      m = {
        add: function () {
          return (
            l &&
              (r && !i && ((h = l.length - 1), u.push(r)),
              (function f(y) {
                s.each(y, function (x, D) {
                  O(D) ? (t.unique && m.has(D)) || l.push(D) : D && D.length && 'string' !== K(D) && f(D);
                });
              })(arguments),
              r && !i && p()),
            this
          );
        },
        remove: function () {
          return (
            s.each(arguments, function (f, y) {
              for (var x; -1 < (x = s.inArray(y, l, x)); ) l.splice(x, 1), x <= h && h--;
            }),
            this
          );
        },
        has: function (f) {
          return f ? -1 < s.inArray(f, l) : 0 < l.length;
        },
        empty: function () {
          return l && (l = []), this;
        },
        disable: function () {
          return (a = u = []), (l = r = ''), this;
        },
        disabled: function () {
          return !l;
        },
        lock: function () {
          return (a = u = []), r || i || (l = r = ''), this;
        },
        locked: function () {
          return !!a;
        },
        fireWith: function (f, y) {
          return a || ((y = [f, (y = y || []).slice ? y.slice() : y]), u.push(y), i || p()), this;
        },
        fire: function () {
          return m.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!o;
        },
      };
    return m;
  }),
    s.extend({
      Deferred: function (t) {
        var n = [
            ['notify', 'progress', s.Callbacks('memory'), s.Callbacks('memory'), 2],
            ['resolve', 'done', s.Callbacks('once memory'), s.Callbacks('once memory'), 0, 'resolved'],
            ['reject', 'fail', s.Callbacks('once memory'), s.Callbacks('once memory'), 1, 'rejected'],
          ],
          e = 'pending',
          i = {
            state: function () {
              return e;
            },
            always: function () {
              return r.done(arguments).fail(arguments), this;
            },
            catch: function (o) {
              return i.then(null, o);
            },
            pipe: function () {
              var o = arguments;
              return s
                .Deferred(function (a) {
                  s.each(n, function (l, u) {
                    var h = O(o[u[4]]) && o[u[4]];
                    r[u[1]](function () {
                      var p = h && h.apply(this, arguments);
                      p && O(p.promise)
                        ? p.promise().progress(a.notify).done(a.resolve).fail(a.reject)
                        : a[u[0] + 'With'](this, h ? [p] : arguments);
                    });
                  }),
                    (o = null);
                })
                .promise();
            },
            then: function (o, a, l) {
              var u = 0;
              function h(p, m, f, y) {
                return function () {
                  var x = this,
                    D = arguments,
                    S = function () {
                      var V, Se;
                      if (!(p < u)) {
                        if ((V = f.apply(x, D)) === m.promise()) throw new TypeError('Thenable self-resolution');
                        O((Se = V && ('object' == typeof V || 'function' == typeof V) && V.then))
                          ? y
                            ? Se.call(V, h(u, m, E, y), h(u, m, Ke, y))
                            : (u++, Se.call(V, h(u, m, E, y), h(u, m, Ke, y), h(u, m, E, m.notifyWith)))
                          : (f !== E && ((x = void 0), (D = [V])), (y || m.resolveWith)(x, D));
                      }
                    },
                    z = y
                      ? S
                      : function () {
                          try {
                            S();
                          } catch (V) {
                            s.Deferred.exceptionHook && s.Deferred.exceptionHook(V, z.error),
                              u <= p + 1 && (f !== Ke && ((x = void 0), (D = [V])), m.rejectWith(x, D));
                          }
                        };
                  p
                    ? z()
                    : (s.Deferred.getErrorHook
                        ? (z.error = s.Deferred.getErrorHook())
                        : s.Deferred.getStackHook && (z.error = s.Deferred.getStackHook()),
                      N.setTimeout(z));
                };
              }
              return s
                .Deferred(function (p) {
                  n[0][3].add(h(0, p, O(l) ? l : E, p.notifyWith)),
                    n[1][3].add(h(0, p, O(o) ? o : E)),
                    n[2][3].add(h(0, p, O(a) ? a : Ke));
                })
                .promise();
            },
            promise: function (o) {
              return null != o ? s.extend(o, i) : i;
            },
          },
          r = {};
        return (
          s.each(n, function (o, a) {
            var l = a[2],
              u = a[5];
            (i[a[1]] = l.add),
              u &&
                l.add(
                  function () {
                    e = u;
                  },
                  n[3 - o][2].disable,
                  n[3 - o][3].disable,
                  n[0][2].lock,
                  n[0][3].lock,
                ),
              l.add(a[3].fire),
              (r[a[0]] = function () {
                return r[a[0] + 'With'](this === r ? void 0 : this, arguments), this;
              }),
              (r[a[0] + 'With'] = l.fireWith);
          }),
          i.promise(r),
          t && t.call(r, r),
          r
        );
      },
      when: function (t) {
        var n = arguments.length,
          e = n,
          i = Array(e),
          r = oe.call(arguments),
          o = s.Deferred(),
          a = function (l) {
            return function (u) {
              (i[l] = this), (r[l] = 1 < arguments.length ? oe.call(arguments) : u), --n || o.resolveWith(i, r);
            };
          };
        if (n <= 1 && (ct(t, o.done(a(e)).resolve, o.reject, !n), 'pending' === o.state() || O(r[e] && r[e].then)))
          return o.then();
        for (; e--; ) ct(r[e], a(e), o.reject);
        return o.promise();
      },
    });
  var In = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (s.Deferred.exceptionHook = function (t, n) {
    N.console &&
      N.console.warn &&
      t &&
      In.test(t.name) &&
      N.console.warn('jQuery.Deferred exception: ' + t.message, t.stack, n);
  }),
    (s.readyException = function (t) {
      N.setTimeout(function () {
        throw t;
      });
    });
  var Ge = s.Deferred();
  function Wt() {
    I.removeEventListener('DOMContentLoaded', Wt), N.removeEventListener('load', Wt), s.ready();
  }
  (s.fn.ready = function (t) {
    return (
      Ge.then(t).catch(function (n) {
        s.readyException(n);
      }),
      this
    );
  }),
    s.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (t) {
        (!0 === t ? --s.readyWait : s.isReady) ||
          ((s.isReady = !0) !== t && 0 < --s.readyWait) ||
          Ge.resolveWith(I, [s]);
      },
    }),
    (s.ready.then = Ge.then),
    'complete' === I.readyState || ('loading' !== I.readyState && !I.documentElement.doScroll)
      ? N.setTimeout(s.ready)
      : (I.addEventListener('DOMContentLoaded', Wt), N.addEventListener('load', Wt));
  var Pe = function (t, n, e, i, r, o, a) {
      var l = 0,
        u = t.length,
        h = null == e;
      if ('object' === K(e)) for (l in ((r = !0), e)) Pe(t, n, l, e[l], !0, o, a);
      else if (
        void 0 !== i &&
        ((r = !0),
        O(i) || (a = !0),
        h &&
          (a
            ? (n.call(t, i), (n = null))
            : ((h = n),
              (n = function (p, m, f) {
                return h.call(s(p), f);
              }))),
        n)
      )
        for (; l < u; l++) n(t[l], e, a ? i : i.call(t[l], l, n(t[l], e)));
      return r ? t : h ? n.call(t) : u ? n(t[0], e) : o;
    },
    Bt = /^-ms-/,
    kt = /-([a-z])/g;
  function ut(t, n) {
    return n.toUpperCase();
  }
  function ae(t) {
    return t.replace(Bt, 'ms-').replace(kt, ut);
  }
  var Re = function (t) {
    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
  };
  function Je() {
    this.expando = s.expando + Je.uid++;
  }
  (Je.uid = 1),
    (Je.prototype = {
      cache: function (t) {
        var n = t[this.expando];
        return (
          n ||
            ((n = {}),
            Re(t) &&
              (t.nodeType
                ? (t[this.expando] = n)
                : Object.defineProperty(t, this.expando, { value: n, configurable: !0 }))),
          n
        );
      },
      set: function (t, n, e) {
        var i,
          r = this.cache(t);
        if ('string' == typeof n) r[ae(n)] = e;
        else for (i in n) r[ae(i)] = n[i];
        return r;
      },
      get: function (t, n) {
        return void 0 === n ? this.cache(t) : t[this.expando] && t[this.expando][ae(n)];
      },
      access: function (t, n, e) {
        return void 0 === n || (n && 'string' == typeof n && void 0 === e)
          ? this.get(t, n)
          : (this.set(t, n, e), void 0 !== e ? e : n);
      },
      remove: function (t, n) {
        var e,
          i = t[this.expando];
        if (void 0 !== i) {
          if (void 0 !== n)
            for (e = (n = Array.isArray(n) ? n.map(ae) : ((n = ae(n)) in i) ? [n] : n.match(ge) || []).length; e--; )
              delete i[n[e]];
          (void 0 === n || s.isEmptyObject(i)) && (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
        }
      },
      hasData: function (t) {
        var n = t[this.expando];
        return void 0 !== n && !s.isEmptyObject(n);
      },
    });
  var A = new Je(),
    ee = new Je(),
    li = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    ci = /[A-Z]/g;
  function Pn(t, n, e) {
    var i, r;
    if (void 0 === e && 1 === t.nodeType)
      if (((i = 'data-' + n.replace(ci, '-$&').toLowerCase()), 'string' == typeof (e = t.getAttribute(i)))) {
        try {
          e =
            'true' === (r = e) ||
            ('false' !== r && ('null' === r ? null : r === +r + '' ? +r : li.test(r) ? JSON.parse(r) : r));
        } catch {}
        ee.set(t, n, e);
      } else e = void 0;
    return e;
  }
  s.extend({
    hasData: function (t) {
      return ee.hasData(t) || A.hasData(t);
    },
    data: function (t, n, e) {
      return ee.access(t, n, e);
    },
    removeData: function (t, n) {
      ee.remove(t, n);
    },
    _data: function (t, n, e) {
      return A.access(t, n, e);
    },
    _removeData: function (t, n) {
      A.remove(t, n);
    },
  }),
    s.fn.extend({
      data: function (t, n) {
        var e,
          i,
          r,
          o = this[0],
          a = o && o.attributes;
        if (void 0 === t) {
          if (this.length && ((r = ee.get(o)), 1 === o.nodeType && !A.get(o, 'hasDataAttrs'))) {
            for (e = a.length; e--; )
              a[e] && 0 === (i = a[e].name).indexOf('data-') && ((i = ae(i.slice(5))), Pn(o, i, r[i]));
            A.set(o, 'hasDataAttrs', !0);
          }
          return r;
        }
        return 'object' == typeof t
          ? this.each(function () {
              ee.set(this, t);
            })
          : Pe(
              this,
              function (l) {
                var u;
                if (o && void 0 === l) return void 0 !== (u = ee.get(o, t)) || void 0 !== (u = Pn(o, t)) ? u : void 0;
                this.each(function () {
                  ee.set(this, t, l);
                });
              },
              null,
              n,
              1 < arguments.length,
              null,
              !0,
            );
      },
      removeData: function (t) {
        return this.each(function () {
          ee.remove(this, t);
        });
      },
    }),
    s.extend({
      queue: function (t, n, e) {
        var i;
        if (t)
          return (
            (i = A.get(t, (n = (n || 'fx') + 'queue'))),
            e && (!i || Array.isArray(e) ? (i = A.access(t, n, s.makeArray(e))) : i.push(e)),
            i || []
          );
      },
      dequeue: function (t, n) {
        var e = s.queue(t, (n = n || 'fx')),
          i = e.length,
          r = e.shift(),
          o = s._queueHooks(t, n);
        'inprogress' === r && ((r = e.shift()), i--),
          r &&
            ('fx' === n && e.unshift('inprogress'),
            delete o.stop,
            r.call(
              t,
              function () {
                s.dequeue(t, n);
              },
              o,
            )),
          !i && o && o.empty.fire();
      },
      _queueHooks: function (t, n) {
        var e = n + 'queueHooks';
        return (
          A.get(t, e) ||
          A.access(t, e, {
            empty: s.Callbacks('once memory').add(function () {
              A.remove(t, [n + 'queue', e]);
            }),
          })
        );
      },
    }),
    s.fn.extend({
      queue: function (t, n) {
        var e = 2;
        return (
          'string' != typeof t && ((n = t), (t = 'fx'), e--),
          arguments.length < e
            ? s.queue(this[0], t)
            : void 0 === n
            ? this
            : this.each(function () {
                var i = s.queue(this, t, n);
                s._queueHooks(this, t), 'fx' === t && 'inprogress' !== i[0] && s.dequeue(this, t);
              })
        );
      },
      dequeue: function (t) {
        return this.each(function () {
          s.dequeue(this, t);
        });
      },
      clearQueue: function (t) {
        return this.queue(t || 'fx', []);
      },
      promise: function (t, n) {
        var e,
          i = 1,
          r = s.Deferred(),
          o = this,
          a = this.length,
          l = function () {
            --i || r.resolveWith(o, [o]);
          };
        for ('string' != typeof t && ((n = t), (t = void 0)), t = t || 'fx'; a--; )
          (e = A.get(o[a], t + 'queueHooks')) && e.empty && (i++, e.empty.add(l));
        return l(), r.promise(n);
      },
    });
  var Ze = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    et = new RegExp('^(?:([+-])=|)(' + Ze + ')([a-z%]*)$', 'i'),
    me = ['Top', 'Right', 'Bottom', 'Left'],
    ke = I.documentElement,
    We = function (t) {
      return s.contains(t.ownerDocument, t);
    },
    ui = { composed: !0 };
  ke.getRootNode &&
    (We = function (t) {
      return s.contains(t.ownerDocument, t) || t.getRootNode(ui) === t.ownerDocument;
    });
  var zt = function (t, n) {
    return 'none' === (t = n || t).style.display || ('' === t.style.display && We(t) && 'none' === s.css(t, 'display'));
  };
  function tt(t, n, e, i) {
    var r,
      o,
      a = 20,
      l = i
        ? function () {
            return i.cur();
          }
        : function () {
            return s.css(t, n, '');
          },
      u = l(),
      h = (e && e[3]) || (s.cssNumber[n] ? '' : 'px'),
      p = t.nodeType && (s.cssNumber[n] || ('px' !== h && +u)) && et.exec(s.css(t, n));
    if (p && p[3] !== h) {
      for (h = h || p[3], p = +(u /= 2) || 1; a--; )
        s.style(t, n, p + h), (1 - o) * (1 - (o = l() / u || 0.5)) <= 0 && (a = 0), (p /= o);
      s.style(t, n, (p *= 2) + h), (e = e || []);
    }
    return (
      e &&
        ((p = +p || +u || 0),
        (r = e[1] ? p + (e[1] + 1) * e[2] : +e[2]),
        i && ((i.unit = h), (i.start = p), (i.end = r))),
      r
    );
  }
  var hn = {};
  function ht(t, n) {
    for (var e, i, r, o, a, l, u, h = [], p = 0, m = t.length; p < m; p++)
      (i = t[p]).style &&
        ((e = i.style.display),
        n
          ? ('none' === e && ((h[p] = A.get(i, 'display') || null), h[p] || (i.style.display = '')),
            '' === i.style.display &&
              zt(i) &&
              (h[p] =
                ((u = a = o = void 0),
                (a = (r = i).ownerDocument),
                (u = hn[(l = r.nodeName)]) ||
                  ((o = a.body.appendChild(a.createElement(l))),
                  (u = s.css(o, 'display')),
                  o.parentNode.removeChild(o),
                  'none' === u && (u = 'block'),
                  (hn[l] = u)))))
          : 'none' !== e && ((h[p] = 'none'), A.set(i, 'display', e)));
    for (p = 0; p < m; p++) null != h[p] && (t[p].style.display = h[p]);
    return t;
  }
  s.fn.extend({
    show: function () {
      return ht(this, !0);
    },
    hide: function () {
      return ht(this);
    },
    toggle: function (t) {
      return 'boolean' == typeof t
        ? t
          ? this.show()
          : this.hide()
        : this.each(function () {
            zt(this) ? s(this).show() : s(this).hide();
          });
    },
  });
  var Be,
    St,
    dt = /^(?:checkbox|radio)$/i,
    ft = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    ze = /^$|^module$|\/(?:java|ecma)script/i;
  (Be = I.createDocumentFragment().appendChild(I.createElement('div'))),
    (St = I.createElement('input')).setAttribute('type', 'radio'),
    St.setAttribute('checked', 'checked'),
    St.setAttribute('name', 't'),
    Be.appendChild(St),
    (P.checkClone = Be.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (Be.innerHTML = '<textarea>x</textarea>'),
    (P.noCloneChecked = !!Be.cloneNode(!0).lastChild.defaultValue),
    (Be.innerHTML = '<option></option>'),
    (P.option = !!Be.lastChild);
  var ve = {
    thead: [1, '<table>', '</table>'],
    col: [2, '<table><colgroup>', '</colgroup></table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    _default: [0, '', ''],
  };
  function te(t, n) {
    var e;
    return (
      (e =
        typeof t.getElementsByTagName < 'u'
          ? t.getElementsByTagName(n || '*')
          : typeof t.querySelectorAll < 'u'
          ? t.querySelectorAll(n || '*')
          : []),
      void 0 === n || (n && B(t, n)) ? s.merge([t], e) : e
    );
  }
  function dn(t, n) {
    for (var e = 0, i = t.length; e < i; e++) A.set(t[e], 'globalEval', !n || A.get(n[e], 'globalEval'));
  }
  (ve.tbody = ve.tfoot = ve.colgroup = ve.caption = ve.thead),
    (ve.th = ve.td),
    P.option || (ve.optgroup = ve.option = [1, "<select multiple='multiple'>", '</select>']);
  var hi = /<|&#?\w+;/;
  function Mn(t, n, e, i, r) {
    for (var o, a, l, u, h, p, m = n.createDocumentFragment(), f = [], y = 0, x = t.length; y < x; y++)
      if ((o = t[y]) || 0 === o)
        if ('object' === K(o)) s.merge(f, o.nodeType ? [o] : o);
        else if (hi.test(o)) {
          for (
            a = a || m.appendChild(n.createElement('div')),
              l = (ft.exec(o) || ['', ''])[1].toLowerCase(),
              a.innerHTML = (u = ve[l] || ve._default)[1] + s.htmlPrefilter(o) + u[2],
              p = u[0];
            p--;

          )
            a = a.lastChild;
          s.merge(f, a.childNodes), ((a = m.firstChild).textContent = '');
        } else f.push(n.createTextNode(o));
    for (m.textContent = '', y = 0; (o = f[y++]); )
      if (i && -1 < s.inArray(o, i)) r && r.push(o);
      else if (((h = We(o)), (a = te(m.appendChild(o), 'script')), h && dn(a), e))
        for (p = 0; (o = a[p++]); ) ze.test(o.type || '') && e.push(o);
    return m;
  }
  var Hn = /^([^.]*)(?:\.(.+)|)/;
  function pt() {
    return !0;
  }
  function gt() {
    return !1;
  }
  function fn(t, n, e, i, r, o) {
    var a, l;
    if ('object' == typeof n) {
      for (l in ('string' != typeof e && ((i = i || e), (e = void 0)), n)) fn(t, l, e, i, n[l], o);
      return t;
    }
    if (
      (null == i && null == r
        ? ((r = e), (i = e = void 0))
        : null == r && ('string' == typeof e ? ((r = i), (i = void 0)) : ((r = i), (i = e), (e = void 0))),
      !1 === r)
    )
      r = gt;
    else if (!r) return t;
    return (
      1 === o &&
        ((a = r),
        ((r = function (u) {
          return s().off(u), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = s.guid++))),
      t.each(function () {
        s.event.add(this, n, r, i, e);
      })
    );
  }
  function Xt(t, n, e) {
    e
      ? (A.set(t, n, !1),
        s.event.add(t, n, {
          namespace: !1,
          handler: function (i) {
            var r,
              o = A.get(this, n);
            if (1 & i.isTrigger && this[n]) {
              if (o) (s.event.special[n] || {}).delegateType && i.stopPropagation();
              else if (
                ((o = oe.call(arguments)),
                A.set(this, n, o),
                this[n](),
                (r = A.get(this, n)),
                A.set(this, n, !1),
                o !== r)
              )
                return i.stopImmediatePropagation(), i.preventDefault(), r;
            } else
              o &&
                (A.set(this, n, s.event.trigger(o[0], o.slice(1), this)),
                i.stopPropagation(),
                (i.isImmediatePropagationStopped = pt));
          },
        }))
      : void 0 === A.get(t, n) && s.event.add(t, n, pt);
  }
  (s.event = {
    global: {},
    add: function (t, n, e, i, r) {
      var o,
        a,
        l,
        u,
        h,
        p,
        m,
        f,
        y,
        x,
        D,
        S = A.get(t);
      if (Re(t))
        for (
          e.handler && ((e = (o = e).handler), (r = o.selector)),
            r && s.find.matchesSelector(ke, r),
            e.guid || (e.guid = s.guid++),
            (u = S.events) || (u = S.events = Object.create(null)),
            (a = S.handle) ||
              (a = S.handle =
                function (z) {
                  return typeof s < 'u' && s.event.triggered !== z.type ? s.event.dispatch.apply(t, arguments) : void 0;
                }),
            h = (n = (n || '').match(ge) || ['']).length;
          h--;

        )
          (y = D = (l = Hn.exec(n[h]) || [])[1]),
            (x = (l[2] || '').split('.').sort()),
            y &&
              ((m = s.event.special[y] || {}),
              (m = s.event.special[(y = (r ? m.delegateType : m.bindType) || y)] || {}),
              (p = s.extend(
                {
                  type: y,
                  origType: D,
                  data: i,
                  handler: e,
                  guid: e.guid,
                  selector: r,
                  needsContext: r && s.expr.match.needsContext.test(r),
                  namespace: x.join('.'),
                },
                o,
              )),
              (f = u[y]) ||
                (((f = u[y] = []).delegateCount = 0),
                (m.setup && !1 !== m.setup.call(t, i, x, a)) || (t.addEventListener && t.addEventListener(y, a))),
              m.add && (m.add.call(t, p), p.handler.guid || (p.handler.guid = e.guid)),
              r ? f.splice(f.delegateCount++, 0, p) : f.push(p),
              (s.event.global[y] = !0));
    },
    remove: function (t, n, e, i, r) {
      var o,
        a,
        l,
        u,
        h,
        p,
        m,
        f,
        y,
        x,
        D,
        S = A.hasData(t) && A.get(t);
      if (S && (u = S.events)) {
        for (h = (n = (n || '').match(ge) || ['']).length; h--; )
          if (((y = D = (l = Hn.exec(n[h]) || [])[1]), (x = (l[2] || '').split('.').sort()), y)) {
            for (
              m = s.event.special[y] || {},
                f = u[(y = (i ? m.delegateType : m.bindType) || y)] || [],
                l = l[2] && new RegExp('(^|\\.)' + x.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                a = o = f.length;
              o--;

            )
              (p = f[o]),
                (!r && D !== p.origType) ||
                  (e && e.guid !== p.guid) ||
                  (l && !l.test(p.namespace)) ||
                  (i && i !== p.selector && ('**' !== i || !p.selector)) ||
                  (f.splice(o, 1), p.selector && f.delegateCount--, m.remove && m.remove.call(t, p));
            a &&
              !f.length &&
              ((m.teardown && !1 !== m.teardown.call(t, x, S.handle)) || s.removeEvent(t, y, S.handle), delete u[y]);
          } else for (y in u) s.event.remove(t, y + n[h], e, i, !0);
        s.isEmptyObject(u) && A.remove(t, 'handle events');
      }
    },
    dispatch: function (t) {
      var n,
        e,
        i,
        r,
        o,
        a,
        l = new Array(arguments.length),
        u = s.event.fix(t),
        h = (A.get(this, 'events') || Object.create(null))[u.type] || [],
        p = s.event.special[u.type] || {};
      for (l[0] = u, n = 1; n < arguments.length; n++) l[n] = arguments[n];
      if (((u.delegateTarget = this), !p.preDispatch || !1 !== p.preDispatch.call(this, u))) {
        for (a = s.event.handlers.call(this, u, h), n = 0; (r = a[n++]) && !u.isPropagationStopped(); )
          for (u.currentTarget = r.elem, e = 0; (o = r.handlers[e++]) && !u.isImmediatePropagationStopped(); )
            (u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace)) ||
              ((u.handleObj = o),
              (u.data = o.data),
              void 0 !== (i = ((s.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, l)) &&
                !1 === (u.result = i) &&
                (u.preventDefault(), u.stopPropagation()));
        return p.postDispatch && p.postDispatch.call(this, u), u.result;
      }
    },
    handlers: function (t, n) {
      var e,
        i,
        r,
        o,
        a,
        l = [],
        u = n.delegateCount,
        h = t.target;
      if (u && h.nodeType && !('click' === t.type && 1 <= t.button))
        for (; h !== this; h = h.parentNode || this)
          if (1 === h.nodeType && ('click' !== t.type || !0 !== h.disabled)) {
            for (o = [], a = {}, e = 0; e < u; e++)
              void 0 === a[(r = (i = n[e]).selector + ' ')] &&
                (a[r] = i.needsContext ? -1 < s(r, this).index(h) : s.find(r, this, null, [h]).length),
                a[r] && o.push(i);
            o.length && l.push({ elem: h, handlers: o });
          }
      return (h = this), u < n.length && l.push({ elem: h, handlers: n.slice(u) }), l;
    },
    addProp: function (t, n) {
      Object.defineProperty(s.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: O(n)
          ? function () {
              if (this.originalEvent) return n(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[t];
            },
        set: function (e) {
          Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e });
        },
      });
    },
    fix: function (t) {
      return t[s.expando] ? t : new s.Event(t);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (t) {
          var n = this || t;
          return dt.test(n.type) && n.click && B(n, 'input') && Xt(n, 'click', !0), !1;
        },
        trigger: function (t) {
          var n = this || t;
          return dt.test(n.type) && n.click && B(n, 'input') && Xt(n, 'click'), !0;
        },
        _default: function (t) {
          var n = t.target;
          return (dt.test(n.type) && n.click && B(n, 'input') && A.get(n, 'click')) || B(n, 'a');
        },
      },
      beforeunload: {
        postDispatch: function (t) {
          void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
        },
      },
    },
  }),
    (s.removeEvent = function (t, n, e) {
      t.removeEventListener && t.removeEventListener(n, e);
    }),
    (s.Event = function (t, n) {
      if (!(this instanceof s.Event)) return new s.Event(t, n);
      t && t.type
        ? ((this.originalEvent = t),
          (this.type = t.type),
          (this.isDefaultPrevented =
            t.defaultPrevented || (void 0 === t.defaultPrevented && !1 === t.returnValue) ? pt : gt),
          (this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target),
          (this.currentTarget = t.currentTarget),
          (this.relatedTarget = t.relatedTarget))
        : (this.type = t),
        n && s.extend(this, n),
        (this.timeStamp = (t && t.timeStamp) || Date.now()),
        (this[s.expando] = !0);
    }),
    (s.Event.prototype = {
      constructor: s.Event,
      isDefaultPrevented: gt,
      isPropagationStopped: gt,
      isImmediatePropagationStopped: gt,
      isSimulated: !1,
      preventDefault: function () {
        var t = this.originalEvent;
        (this.isDefaultPrevented = pt), t && !this.isSimulated && t.preventDefault();
      },
      stopPropagation: function () {
        var t = this.originalEvent;
        (this.isPropagationStopped = pt), t && !this.isSimulated && t.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var t = this.originalEvent;
        (this.isImmediatePropagationStopped = pt),
          t && !this.isSimulated && t.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    s.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0,
      },
      s.event.addProp,
    ),
    s.each({ focus: 'focusin', blur: 'focusout' }, function (t, n) {
      function e(i) {
        if (I.documentMode) {
          var r = A.get(this, 'handle'),
            o = s.event.fix(i);
          (o.type = 'focusin' === i.type ? 'focus' : 'blur'),
            (o.isSimulated = !0),
            r(i),
            o.target === o.currentTarget && r(o);
        } else s.event.simulate(n, i.target, s.event.fix(i));
      }
      (s.event.special[t] = {
        setup: function () {
          var i;
          if ((Xt(this, t, !0), !I.documentMode)) return !1;
          (i = A.get(this, n)) || this.addEventListener(n, e), A.set(this, n, (i || 0) + 1);
        },
        trigger: function () {
          return Xt(this, t), !0;
        },
        teardown: function () {
          var i;
          if (!I.documentMode) return !1;
          (i = A.get(this, n) - 1) ? A.set(this, n, i) : (this.removeEventListener(n, e), A.remove(this, n));
        },
        _default: function (i) {
          return A.get(i.target, t);
        },
        delegateType: n,
      }),
        (s.event.special[n] = {
          setup: function () {
            var i = this.ownerDocument || this.document || this,
              r = I.documentMode ? this : i,
              o = A.get(r, n);
            o || (I.documentMode ? this.addEventListener(n, e) : i.addEventListener(t, e, !0)),
              A.set(r, n, (o || 0) + 1);
          },
          teardown: function () {
            var i = this.ownerDocument || this.document || this,
              r = I.documentMode ? this : i,
              o = A.get(r, n) - 1;
            o
              ? A.set(r, n, o)
              : (I.documentMode ? this.removeEventListener(n, e) : i.removeEventListener(t, e, !0), A.remove(r, n));
          },
        });
    }),
    s.each(
      { mouseenter: 'mouseover', mouseleave: 'mouseout', pointerenter: 'pointerover', pointerleave: 'pointerout' },
      function (t, n) {
        s.event.special[t] = {
          delegateType: n,
          bindType: n,
          handle: function (e) {
            var i,
              r = e.relatedTarget,
              o = e.handleObj;
            return (
              (r && (r === this || s.contains(this, r))) ||
                ((e.type = o.origType), (i = o.handler.apply(this, arguments)), (e.type = n)),
              i
            );
          },
        };
      },
    ),
    s.fn.extend({
      on: function (t, n, e, i) {
        return fn(this, t, n, e, i);
      },
      one: function (t, n, e, i) {
        return fn(this, t, n, e, i, 1);
      },
      off: function (t, n, e) {
        var i, r;
        if (t && t.preventDefault && t.handleObj)
          return (
            (i = t.handleObj),
            s(t.delegateTarget).off(i.namespace ? i.origType + '.' + i.namespace : i.origType, i.selector, i.handler),
            this
          );
        if ('object' == typeof t) {
          for (r in t) this.off(r, n, t[r]);
          return this;
        }
        return (
          (!1 !== n && 'function' != typeof n) || ((e = n), (n = void 0)),
          !1 === e && (e = gt),
          this.each(function () {
            s.event.remove(this, t, e, n);
          })
        );
      },
    });
  var _e = /<script|<style|<link/i,
    qn = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Fn = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
  function $n(t, n) {
    return (B(t, 'table') && B(11 !== n.nodeType ? n : n.firstChild, 'tr') && s(t).children('tbody')[0]) || t;
  }
  function di(t) {
    return (t.type = (null !== t.getAttribute('type')) + '/' + t.type), t;
  }
  function Rn(t) {
    return 'true/' === (t.type || '').slice(0, 5) ? (t.type = t.type.slice(5)) : t.removeAttribute('type'), t;
  }
  function pn(t, n) {
    var e, i, r, o, a, l;
    if (1 === n.nodeType) {
      if (A.hasData(t) && (l = A.get(t).events))
        for (r in (A.remove(n, 'handle events'), l))
          for (e = 0, i = l[r].length; e < i; e++) s.event.add(n, r, l[r][e]);
      ee.hasData(t) && ((o = ee.access(t)), (a = s.extend({}, o)), ee.set(n, a));
    }
  }
  function nt(t, n, e, i) {
    n = $t(n);
    var r,
      o,
      a,
      l,
      u,
      h,
      p = 0,
      m = t.length,
      f = m - 1,
      y = n[0],
      x = O(y);
    if (x || (1 < m && 'string' == typeof y && !P.checkClone && qn.test(y)))
      return t.each(function (D) {
        var S = t.eq(D);
        x && (n[0] = y.call(this, D, S.html())), nt(S, n, e, i);
      });
    if (
      m &&
      ((o = (r = Mn(n, t[0].ownerDocument, !1, t, i)).firstChild), 1 === r.childNodes.length && (r = o), o || i)
    ) {
      for (l = (a = s.map(te(r, 'script'), di)).length; p < m; p++)
        (u = r), p !== f && ((u = s.clone(u, !0, !0)), l && s.merge(a, te(u, 'script'))), e.call(t[p], u, p);
      if (l)
        for (h = a[a.length - 1].ownerDocument, s.map(a, Rn), p = 0; p < l; p++)
          ze.test((u = a[p]).type || '') &&
            !A.access(u, 'globalEval') &&
            s.contains(h, u) &&
            (u.src && 'module' !== (u.type || '').toLowerCase()
              ? s._evalUrl && !u.noModule && s._evalUrl(u.src, { nonce: u.nonce || u.getAttribute('nonce') }, h)
              : ce(u.textContent.replace(Fn, ''), u, h));
    }
    return t;
  }
  function Wn(t, n, e) {
    for (var i, r = n ? s.filter(n, t) : t, o = 0; null != (i = r[o]); o++)
      e || 1 !== i.nodeType || s.cleanData(te(i)),
        i.parentNode && (e && We(i) && dn(te(i, 'script')), i.parentNode.removeChild(i));
    return t;
  }
  s.extend({
    htmlPrefilter: function (t) {
      return t;
    },
    clone: function (t, n, e) {
      var i,
        r,
        o,
        a,
        l,
        u,
        h,
        p = t.cloneNode(!0),
        m = We(t);
      if (!(P.noCloneChecked || (1 !== t.nodeType && 11 !== t.nodeType) || s.isXMLDoc(t)))
        for (a = te(p), i = 0, r = (o = te(t)).length; i < r; i++)
          (l = o[i]),
            'input' === (h = (u = a[i]).nodeName.toLowerCase()) && dt.test(l.type)
              ? (u.checked = l.checked)
              : ('input' !== h && 'textarea' !== h) || (u.defaultValue = l.defaultValue);
      if (n)
        if (e) for (o = o || te(t), a = a || te(p), i = 0, r = o.length; i < r; i++) pn(o[i], a[i]);
        else pn(t, p);
      return 0 < (a = te(p, 'script')).length && dn(a, !m && te(t, 'script')), p;
    },
    cleanData: function (t) {
      for (var n, e, i, r = s.event.special, o = 0; void 0 !== (e = t[o]); o++)
        if (Re(e)) {
          if ((n = e[A.expando])) {
            if (n.events) for (i in n.events) r[i] ? s.event.remove(e, i) : s.removeEvent(e, i, n.handle);
            e[A.expando] = void 0;
          }
          e[ee.expando] && (e[ee.expando] = void 0);
        }
    },
  }),
    s.fn.extend({
      detach: function (t) {
        return Wn(this, t, !0);
      },
      remove: function (t) {
        return Wn(this, t);
      },
      text: function (t) {
        return Pe(
          this,
          function (n) {
            return void 0 === n
              ? s.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = n);
                });
          },
          null,
          t,
          arguments.length,
        );
      },
      append: function () {
        return nt(this, arguments, function (t) {
          (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || $n(this, t).appendChild(t);
        });
      },
      prepend: function () {
        return nt(this, arguments, function (t) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var n = $n(this, t);
            n.insertBefore(t, n.firstChild);
          }
        });
      },
      before: function () {
        return nt(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this);
        });
      },
      after: function () {
        return nt(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
        });
      },
      empty: function () {
        for (var t, n = 0; null != (t = this[n]); n++)
          1 === t.nodeType && (s.cleanData(te(t, !1)), (t.textContent = ''));
        return this;
      },
      clone: function (t, n) {
        return (
          (t = null != t && t),
          (n = n ?? t),
          this.map(function () {
            return s.clone(this, t, n);
          })
        );
      },
      html: function (t) {
        return Pe(
          this,
          function (n) {
            var e = this[0] || {},
              i = 0,
              r = this.length;
            if (void 0 === n && 1 === e.nodeType) return e.innerHTML;
            if ('string' == typeof n && !_e.test(n) && !ve[(ft.exec(n) || ['', ''])[1].toLowerCase()]) {
              n = s.htmlPrefilter(n);
              try {
                for (; i < r; i++) 1 === (e = this[i] || {}).nodeType && (s.cleanData(te(e, !1)), (e.innerHTML = n));
                e = 0;
              } catch {}
            }
            e && this.empty().append(n);
          },
          null,
          t,
          arguments.length,
        );
      },
      replaceWith: function () {
        var t = [];
        return nt(
          this,
          arguments,
          function (n) {
            var e = this.parentNode;
            s.inArray(this, t) < 0 && (s.cleanData(te(this)), e && e.replaceChild(n, this));
          },
          t,
        );
      },
    }),
    s.each(
      {
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith',
      },
      function (t, n) {
        s.fn[t] = function (e) {
          for (var i, r = [], o = s(e), a = o.length - 1, l = 0; l <= a; l++)
            (i = l === a ? this : this.clone(!0)), s(o[l])[n](i), Ct.apply(r, i.get());
          return this.pushStack(r);
        };
      },
    );
  var gn = new RegExp('^(' + Ze + ')(?!px)[a-z%]+$', 'i'),
    Ut = /^--/,
    Dt = function (t) {
      var n = t.ownerDocument.defaultView;
      return (n && n.opener) || (n = N), n.getComputedStyle(t);
    },
    mn = function (t, n, e) {
      var i,
        r,
        o = {};
      for (r in n) (o[r] = t.style[r]), (t.style[r] = n[r]);
      for (r in ((i = e.call(t)), n)) t.style[r] = o[r];
      return i;
    },
    Vt = new RegExp(me.join('|'), 'i');
  function mt(t, n, e) {
    var i,
      r,
      o,
      a,
      l = Ut.test(n),
      u = t.style;
    return (
      (e = e || Dt(t)) &&
        ((a = e.getPropertyValue(n) || e[n]),
        l && a && (a = a.replace(lt, '$1') || void 0),
        '' !== a || We(t) || (a = s.style(t, n)),
        !P.pixelBoxStyles() &&
          gn.test(a) &&
          Vt.test(n) &&
          ((i = u.width),
          (r = u.minWidth),
          (o = u.maxWidth),
          (u.minWidth = u.maxWidth = u.width = a),
          (a = e.width),
          (u.width = i),
          (u.minWidth = r),
          (u.maxWidth = o))),
      void 0 !== a ? a + '' : a
    );
  }
  function Qt(t, n) {
    return {
      get: function () {
        if (!t()) return (this.get = n).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function () {
    function t() {
      if (h) {
        (u.style.cssText = 'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
          (h.style.cssText =
            'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
          ke.appendChild(u).appendChild(h);
        var p = N.getComputedStyle(h);
        (e = '1%' !== p.top),
          (l = 12 === n(p.marginLeft)),
          (h.style.right = '60%'),
          (o = 36 === n(p.right)),
          (i = 36 === n(p.width)),
          (h.style.position = 'absolute'),
          (r = 12 === n(h.offsetWidth / 3)),
          ke.removeChild(u),
          (h = null);
      }
    }
    function n(p) {
      return Math.round(parseFloat(p));
    }
    var e,
      i,
      r,
      o,
      a,
      l,
      u = I.createElement('div'),
      h = I.createElement('div');
    h.style &&
      ((h.style.backgroundClip = 'content-box'),
      (h.cloneNode(!0).style.backgroundClip = ''),
      (P.clearCloneStyle = 'content-box' === h.style.backgroundClip),
      s.extend(P, {
        boxSizingReliable: function () {
          return t(), i;
        },
        pixelBoxStyles: function () {
          return t(), o;
        },
        pixelPosition: function () {
          return t(), e;
        },
        reliableMarginLeft: function () {
          return t(), l;
        },
        scrollboxSize: function () {
          return t(), r;
        },
        reliableTrDimensions: function () {
          var p, m, f, y;
          return (
            null == a &&
              ((p = I.createElement('table')),
              (m = I.createElement('tr')),
              (f = I.createElement('div')),
              (p.style.cssText = 'position:absolute;left:-11111px;border-collapse:separate'),
              (m.style.cssText = 'border:1px solid'),
              (m.style.height = '1px'),
              (f.style.height = '9px'),
              (f.style.display = 'block'),
              ke.appendChild(p).appendChild(m).appendChild(f),
              (y = N.getComputedStyle(m)),
              (a =
                parseInt(y.height, 10) + parseInt(y.borderTopWidth, 10) + parseInt(y.borderBottomWidth, 10) ===
                m.offsetHeight),
              ke.removeChild(p)),
            a
          );
        },
      }));
  })();
  var vn = ['Webkit', 'Moz', 'ms'],
    yn = I.createElement('div').style,
    bn = {};
  function Yt(t) {
    return (
      s.cssProps[t] ||
      bn[t] ||
      (t in yn
        ? t
        : (bn[t] =
            (function (e) {
              for (var i = e[0].toUpperCase() + e.slice(1), r = vn.length; r--; ) if ((e = vn[r] + i) in yn) return e;
            })(t) || t))
    );
  }
  var Bn = /^(none|table(?!-c[ea]).+)/,
    _n = { position: 'absolute', visibility: 'hidden', display: 'block' },
    zn = { letterSpacing: '0', fontWeight: '400' };
  function Xn(t, n, e) {
    var i = et.exec(n);
    return i ? Math.max(0, i[2] - (e || 0)) + (i[3] || 'px') : n;
  }
  function Me(t, n, e, i, r, o) {
    var a = 'width' === n ? 1 : 0,
      l = 0,
      u = 0,
      h = 0;
    if (e === (i ? 'border' : 'content')) return 0;
    for (; a < 4; a += 2)
      'margin' === e && (h += s.css(t, e + me[a], !0, r)),
        i
          ? ('content' === e && (u -= s.css(t, 'padding' + me[a], !0, r)),
            'margin' !== e && (u -= s.css(t, 'border' + me[a] + 'Width', !0, r)))
          : ((u += s.css(t, 'padding' + me[a], !0, r)),
            'padding' !== e
              ? (u += s.css(t, 'border' + me[a] + 'Width', !0, r))
              : (l += s.css(t, 'border' + me[a] + 'Width', !0, r)));
    return (
      !i &&
        0 <= o &&
        (u += Math.max(0, Math.ceil(t['offset' + n[0].toUpperCase() + n.slice(1)] - o - u - l - 0.5)) || 0),
      u + h
    );
  }
  function wn(t, n, e) {
    var i = Dt(t),
      r = (!P.boxSizingReliable() || e) && 'border-box' === s.css(t, 'boxSizing', !1, i),
      o = r,
      a = mt(t, n, i),
      l = 'offset' + n[0].toUpperCase() + n.slice(1);
    if (gn.test(a)) {
      if (!e) return a;
      a = 'auto';
    }
    return (
      ((!P.boxSizingReliable() && r) ||
        (!P.reliableTrDimensions() && B(t, 'tr')) ||
        'auto' === a ||
        (!parseFloat(a) && 'inline' === s.css(t, 'display', !1, i))) &&
        t.getClientRects().length &&
        ((r = 'border-box' === s.css(t, 'boxSizing', !1, i)), (o = l in t) && (a = t[l])),
      (a = parseFloat(a) || 0) + Me(t, n, e || (r ? 'border' : 'content'), o, i, a) + 'px'
    );
  }
  function ye(t, n, e, i, r) {
    return new ye.prototype.init(t, n, e, i, r);
  }
  s.extend({
    cssHooks: {
      opacity: {
        get: function (t, n) {
          if (n) {
            var e = mt(t, 'opacity');
            return '' === e ? '1' : e;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageSlice: !0,
      columnCount: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      scale: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
    },
    cssProps: {},
    style: function (t, n, e, i) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var r,
          o,
          a,
          l = ae(n),
          u = Ut.test(n),
          h = t.style;
        if ((u || (n = Yt(l)), (a = s.cssHooks[n] || s.cssHooks[l]), void 0 === e))
          return a && 'get' in a && void 0 !== (r = a.get(t, !1, i)) ? r : h[n];
        'string' == (o = typeof e) && (r = et.exec(e)) && r[1] && ((e = tt(t, n, r)), (o = 'number')),
          null != e &&
            e == e &&
            ('number' !== o || u || (e += (r && r[3]) || (s.cssNumber[l] ? '' : 'px')),
            P.clearCloneStyle || '' !== e || 0 !== n.indexOf('background') || (h[n] = 'inherit'),
            (a && 'set' in a && void 0 === (e = a.set(t, e, i))) || (u ? h.setProperty(n, e) : (h[n] = e)));
      }
    },
    css: function (t, n, e, i) {
      var r,
        o,
        a,
        l = ae(n);
      return (
        Ut.test(n) || (n = Yt(l)),
        (a = s.cssHooks[n] || s.cssHooks[l]) && 'get' in a && (r = a.get(t, !0, e)),
        void 0 === r && (r = mt(t, n, i)),
        'normal' === r && n in zn && (r = zn[n]),
        '' === e || e ? ((o = parseFloat(r)), !0 === e || isFinite(o) ? o || 0 : r) : r
      );
    },
  }),
    s.each(['height', 'width'], function (t, n) {
      s.cssHooks[n] = {
        get: function (e, i, r) {
          if (i)
            return !Bn.test(s.css(e, 'display')) || (e.getClientRects().length && e.getBoundingClientRect().width)
              ? wn(e, n, r)
              : mn(e, _n, function () {
                  return wn(e, n, r);
                });
        },
        set: function (e, i, r) {
          var o,
            a = Dt(e),
            l = !P.scrollboxSize() && 'absolute' === a.position,
            u = (l || r) && 'border-box' === s.css(e, 'boxSizing', !1, a),
            h = r ? Me(e, n, r, u, a) : 0;
          return (
            u &&
              l &&
              (h -= Math.ceil(
                e['offset' + n[0].toUpperCase() + n.slice(1)] - parseFloat(a[n]) - Me(e, n, 'border', !1, a) - 0.5,
              )),
            h && (o = et.exec(i)) && 'px' !== (o[3] || 'px') && ((e.style[n] = i), (i = s.css(e, n))),
            Xn(0, i, h)
          );
        },
      };
    }),
    (s.cssHooks.marginLeft = Qt(P.reliableMarginLeft, function (t, n) {
      if (n)
        return (
          (parseFloat(mt(t, 'marginLeft')) ||
            t.getBoundingClientRect().left -
              mn(t, { marginLeft: 0 }, function () {
                return t.getBoundingClientRect().left;
              })) + 'px'
        );
    })),
    s.each({ margin: '', padding: '', border: 'Width' }, function (t, n) {
      (s.cssHooks[t + n] = {
        expand: function (e) {
          for (var i = 0, r = {}, o = 'string' == typeof e ? e.split(' ') : [e]; i < 4; i++)
            r[t + me[i] + n] = o[i] || o[i - 2] || o[0];
          return r;
        },
      }),
        'margin' !== t && (s.cssHooks[t + n].set = Xn);
    }),
    s.fn.extend({
      css: function (t, n) {
        return Pe(
          this,
          function (e, i, r) {
            var o,
              a,
              l = {},
              u = 0;
            if (Array.isArray(i)) {
              for (o = Dt(e), a = i.length; u < a; u++) l[i[u]] = s.css(e, i[u], !1, o);
              return l;
            }
            return void 0 !== r ? s.style(e, i, r) : s.css(e, i);
          },
          t,
          n,
          1 < arguments.length,
        );
      },
    }),
    (((s.Tween = ye).prototype = {
      constructor: ye,
      init: function (t, n, e, i, r, o) {
        (this.elem = t),
          (this.prop = e),
          (this.easing = r || s.easing._default),
          (this.options = n),
          (this.start = this.now = this.cur()),
          (this.end = i),
          (this.unit = o || (s.cssNumber[e] ? '' : 'px'));
      },
      cur: function () {
        var t = ye.propHooks[this.prop];
        return t && t.get ? t.get(this) : ye.propHooks._default.get(this);
      },
      run: function (t) {
        var n,
          e = ye.propHooks[this.prop];
        return (
          (this.pos = n =
            this.options.duration
              ? s.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration)
              : t),
          (this.now = (this.end - this.start) * n + this.start),
          this.options.step && this.options.step.call(this.elem, this.now, this),
          e && e.set ? e.set(this) : ye.propHooks._default.set(this),
          this
        );
      },
    }).init.prototype = ye.prototype),
    ((ye.propHooks = {
      _default: {
        get: function (t) {
          var n;
          return 1 !== t.elem.nodeType || (null != t.elem[t.prop] && null == t.elem.style[t.prop])
            ? t.elem[t.prop]
            : (n = s.css(t.elem, t.prop, '')) && 'auto' !== n
            ? n
            : 0;
        },
        set: function (t) {
          s.fx.step[t.prop]
            ? s.fx.step[t.prop](t)
            : 1 !== t.elem.nodeType || (!s.cssHooks[t.prop] && null == t.elem.style[Yt(t.prop)])
            ? (t.elem[t.prop] = t.now)
            : s.style(t.elem, t.prop, t.now + t.unit);
        },
      },
    }).scrollTop = ye.propHooks.scrollLeft =
      {
        set: function (t) {
          t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
        },
      }),
    (s.easing = {
      linear: function (t) {
        return t;
      },
      swing: function (t) {
        return 0.5 - Math.cos(t * Math.PI) / 2;
      },
      _default: 'swing',
    }),
    (s.fx = ye.prototype.init),
    (s.fx.step = {});
  var it,
    Lt,
    rt,
    xn,
    fi = /^(?:toggle|show|hide)$/,
    pi = /queueHooks$/;
  function we() {
    Lt &&
      (!1 === I.hidden && N.requestAnimationFrame ? N.requestAnimationFrame(we) : N.setTimeout(we, s.fx.interval),
      s.fx.tick());
  }
  function Tn() {
    return (
      N.setTimeout(function () {
        it = void 0;
      }),
      (it = Date.now())
    );
  }
  function Kt(t, n) {
    var e,
      i = 0,
      r = { height: t };
    for (n = n ? 1 : 0; i < 4; i += 2 - n) r['margin' + (e = me[i])] = r['padding' + e] = t;
    return n && (r.opacity = r.width = t), r;
  }
  function Un(t, n, e) {
    for (var i, r = (xe.tweeners[n] || []).concat(xe.tweeners['*']), o = 0, a = r.length; o < a; o++)
      if ((i = r[o].call(e, n, t))) return i;
  }
  function xe(t, n, e) {
    var i,
      r,
      o = 0,
      a = xe.prefilters.length,
      l = s.Deferred().always(function () {
        delete u.elem;
      }),
      u = function () {
        if (r) return !1;
        for (
          var m = it || Tn(),
            f = Math.max(0, h.startTime + h.duration - m),
            y = 1 - (f / h.duration || 0),
            x = 0,
            D = h.tweens.length;
          x < D;
          x++
        )
          h.tweens[x].run(y);
        return (
          l.notifyWith(t, [h, y, f]), y < 1 && D ? f : (D || l.notifyWith(t, [h, 1, 0]), l.resolveWith(t, [h]), !1)
        );
      },
      h = l.promise({
        elem: t,
        props: s.extend({}, n),
        opts: s.extend(!0, { specialEasing: {}, easing: s.easing._default }, e),
        originalProperties: n,
        originalOptions: e,
        startTime: it || Tn(),
        duration: e.duration,
        tweens: [],
        createTween: function (m, f) {
          var y = s.Tween(t, h.opts, m, f, h.opts.specialEasing[m] || h.opts.easing);
          return h.tweens.push(y), y;
        },
        stop: function (m) {
          var f = 0,
            y = m ? h.tweens.length : 0;
          if (r) return this;
          for (r = !0; f < y; f++) h.tweens[f].run(1);
          return m ? (l.notifyWith(t, [h, 1, 0]), l.resolveWith(t, [h, m])) : l.rejectWith(t, [h, m]), this;
        },
      }),
      p = h.props;
    for (
      (function (m, f) {
        var y, x, D, S, z;
        for (y in m)
          if (
            ((D = f[(x = ae(y))]),
            (S = m[y]),
            Array.isArray(S) && ((D = S[1]), (S = m[y] = S[0])),
            y !== x && ((m[x] = S), delete m[y]),
            (z = s.cssHooks[x]) && ('expand' in z))
          )
            for (y in ((S = z.expand(S)), delete m[x], S)) (y in m) || ((m[y] = S[y]), (f[y] = D));
          else f[x] = D;
      })(p, h.opts.specialEasing);
      o < a;
      o++
    )
      if ((i = xe.prefilters[o].call(h, t, p, h.opts)))
        return O(i.stop) && (s._queueHooks(h.elem, h.opts.queue).stop = i.stop.bind(i)), i;
    return (
      s.map(p, Un, h),
      O(h.opts.start) && h.opts.start.call(t, h),
      h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always),
      s.fx.timer(s.extend(u, { elem: t, anim: h, queue: h.opts.queue })),
      h
    );
  }
  (s.Animation = s.extend(xe, {
    tweeners: {
      '*': [
        function (t, n) {
          var e = this.createTween(t, n);
          return tt(e.elem, t, et.exec(n), e), e;
        },
      ],
    },
    tweener: function (t, n) {
      O(t) ? ((n = t), (t = ['*'])) : (t = t.match(ge));
      for (var e, i = 0, r = t.length; i < r; i++) (xe.tweeners[(e = t[i])] = xe.tweeners[e] || []).unshift(n);
    },
    prefilters: [
      function (t, n, e) {
        var i,
          r,
          o,
          a,
          l,
          u,
          h,
          p,
          m = 'width' in n || 'height' in n,
          f = this,
          y = {},
          x = t.style,
          D = t.nodeType && zt(t),
          S = A.get(t, 'fxshow');
        for (i in (e.queue ||
          (null == (a = s._queueHooks(t, 'fx')).unqueued &&
            ((a.unqueued = 0),
            (l = a.empty.fire),
            (a.empty.fire = function () {
              a.unqueued || l();
            })),
          a.unqueued++,
          f.always(function () {
            f.always(function () {
              a.unqueued--, s.queue(t, 'fx').length || a.empty.fire();
            });
          })),
        n))
          if (fi.test((r = n[i]))) {
            if ((delete n[i], (o = o || 'toggle' === r), r === (D ? 'hide' : 'show'))) {
              if ('show' !== r || !S || void 0 === S[i]) continue;
              D = !0;
            }
            y[i] = (S && S[i]) || s.style(t, i);
          }
        if ((u = !s.isEmptyObject(n)) || !s.isEmptyObject(y))
          for (i in (m &&
            1 === t.nodeType &&
            ((e.overflow = [x.overflow, x.overflowX, x.overflowY]),
            null == (h = S && S.display) && (h = A.get(t, 'display')),
            'none' === (p = s.css(t, 'display')) &&
              (h ? (p = h) : (ht([t], !0), (h = t.style.display || h), (p = s.css(t, 'display')), ht([t]))),
            ('inline' === p || ('inline-block' === p && null != h)) &&
              'none' === s.css(t, 'float') &&
              (u ||
                (f.done(function () {
                  x.display = h;
                }),
                null == h && (h = 'none' === (p = x.display) ? '' : p)),
              (x.display = 'inline-block'))),
          e.overflow &&
            ((x.overflow = 'hidden'),
            f.always(function () {
              (x.overflow = e.overflow[0]), (x.overflowX = e.overflow[1]), (x.overflowY = e.overflow[2]);
            })),
          (u = !1),
          y))
            u ||
              (S ? 'hidden' in S && (D = S.hidden) : (S = A.access(t, 'fxshow', { display: h })),
              o && (S.hidden = !D),
              D && ht([t], !0),
              f.done(function () {
                for (i in (D || ht([t]), A.remove(t, 'fxshow'), y)) s.style(t, i, y[i]);
              })),
              (u = Un(D ? S[i] : 0, i, f)),
              i in S || ((S[i] = u.start), D && ((u.end = u.start), (u.start = 0)));
      },
    ],
    prefilter: function (t, n) {
      n ? xe.prefilters.unshift(t) : xe.prefilters.push(t);
    },
  })),
    (s.speed = function (t, n, e) {
      var i =
        t && 'object' == typeof t
          ? s.extend({}, t)
          : { complete: e || (!e && n) || (O(t) && t), duration: t, easing: (e && n) || (n && !O(n) && n) };
      return (
        s.fx.off
          ? (i.duration = 0)
          : 'number' != typeof i.duration &&
            (i.duration = i.duration in s.fx.speeds ? s.fx.speeds[i.duration] : s.fx.speeds._default),
        (null != i.queue && !0 !== i.queue) || (i.queue = 'fx'),
        (i.old = i.complete),
        (i.complete = function () {
          O(i.old) && i.old.call(this), i.queue && s.dequeue(this, i.queue);
        }),
        i
      );
    }),
    s.fn.extend({
      fadeTo: function (t, n, e, i) {
        return this.filter(zt).css('opacity', 0).show().end().animate({ opacity: n }, t, e, i);
      },
      animate: function (t, n, e, i) {
        var r = s.isEmptyObject(t),
          o = s.speed(n, e, i),
          a = function () {
            var l = xe(this, s.extend({}, t), o);
            (r || A.get(this, 'finish')) && l.stop(!0);
          };
        return (a.finish = a), r || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
      },
      stop: function (t, n, e) {
        var i = function (r) {
          var o = r.stop;
          delete r.stop, o(e);
        };
        return (
          'string' != typeof t && ((e = n), (n = t), (t = void 0)),
          n && this.queue(t || 'fx', []),
          this.each(function () {
            var r = !0,
              o = null != t && t + 'queueHooks',
              a = s.timers,
              l = A.get(this);
            if (o) l[o] && l[o].stop && i(l[o]);
            else for (o in l) l[o] && l[o].stop && pi.test(o) && i(l[o]);
            for (o = a.length; o--; )
              a[o].elem !== this || (null != t && a[o].queue !== t) || (a[o].anim.stop(e), (r = !1), a.splice(o, 1));
            (!r && e) || s.dequeue(this, t);
          })
        );
      },
      finish: function (t) {
        return (
          !1 !== t && (t = t || 'fx'),
          this.each(function () {
            var n,
              e = A.get(this),
              i = e[t + 'queue'],
              r = e[t + 'queueHooks'],
              o = s.timers,
              a = i ? i.length : 0;
            for (e.finish = !0, s.queue(this, t, []), r && r.stop && r.stop.call(this, !0), n = o.length; n--; )
              o[n].elem === this && o[n].queue === t && (o[n].anim.stop(!0), o.splice(n, 1));
            for (n = 0; n < a; n++) i[n] && i[n].finish && i[n].finish.call(this);
            delete e.finish;
          })
        );
      },
    }),
    s.each(['toggle', 'show', 'hide'], function (t, n) {
      var e = s.fn[n];
      s.fn[n] = function (i, r, o) {
        return null == i || 'boolean' == typeof i ? e.apply(this, arguments) : this.animate(Kt(n, !0), i, r, o);
      };
    }),
    s.each(
      {
        slideDown: Kt('show'),
        slideUp: Kt('hide'),
        slideToggle: Kt('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' },
      },
      function (t, n) {
        s.fn[t] = function (e, i, r) {
          return this.animate(n, e, i, r);
        };
      },
    ),
    (s.timers = []),
    (s.fx.tick = function () {
      var t,
        n = 0,
        e = s.timers;
      for (it = Date.now(); n < e.length; n++) (t = e[n])() || e[n] !== t || e.splice(n--, 1);
      e.length || s.fx.stop(), (it = void 0);
    }),
    (s.fx.timer = function (t) {
      s.timers.push(t), s.fx.start();
    }),
    (s.fx.interval = 13),
    (s.fx.start = function () {
      Lt || ((Lt = !0), we());
    }),
    (s.fx.stop = function () {
      Lt = null;
    }),
    (s.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (s.fn.delay = function (t, n) {
      return (
        (t = (s.fx && s.fx.speeds[t]) || t),
        this.queue((n = n || 'fx'), function (e, i) {
          var r = N.setTimeout(e, t);
          i.stop = function () {
            N.clearTimeout(r);
          };
        })
      );
    }),
    (rt = I.createElement('input')),
    (xn = I.createElement('select').appendChild(I.createElement('option'))),
    (rt.type = 'checkbox'),
    (P.checkOn = '' !== rt.value),
    (P.optSelected = xn.selected),
    ((rt = I.createElement('input')).value = 't'),
    (rt.type = 'radio'),
    (P.radioValue = 't' === rt.value);
  var Vn,
    Nt = s.expr.attrHandle;
  s.fn.extend({
    attr: function (t, n) {
      return Pe(this, s.attr, t, n, 1 < arguments.length);
    },
    removeAttr: function (t) {
      return this.each(function () {
        s.removeAttr(this, t);
      });
    },
  }),
    s.extend({
      attr: function (t, n, e) {
        var i,
          r,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return typeof t.getAttribute > 'u'
            ? s.prop(t, n, e)
            : ((1 === o && s.isXMLDoc(t)) ||
                (r = s.attrHooks[n.toLowerCase()] || (s.expr.match.bool.test(n) ? Vn : void 0)),
              void 0 !== e
                ? null === e
                  ? void s.removeAttr(t, n)
                  : r && 'set' in r && void 0 !== (i = r.set(t, e, n))
                  ? i
                  : (t.setAttribute(n, e + ''), e)
                : r && 'get' in r && null !== (i = r.get(t, n))
                ? i
                : null == (i = s.find.attr(t, n))
                ? void 0
                : i);
      },
      attrHooks: {
        type: {
          set: function (t, n) {
            if (!P.radioValue && 'radio' === n && B(t, 'input')) {
              var e = t.value;
              return t.setAttribute('type', n), e && (t.value = e), n;
            }
          },
        },
      },
      removeAttr: function (t, n) {
        var e,
          i = 0,
          r = n && n.match(ge);
        if (r && 1 === t.nodeType) for (; (e = r[i++]); ) t.removeAttribute(e);
      },
    }),
    (Vn = {
      set: function (t, n, e) {
        return !1 === n ? s.removeAttr(t, e) : t.setAttribute(e, e), e;
      },
    }),
    s.each(s.expr.match.bool.source.match(/\w+/g), function (t, n) {
      var e = Nt[n] || s.find.attr;
      Nt[n] = function (i, r, o) {
        var a,
          l,
          u = r.toLowerCase();
        return o || ((l = Nt[u]), (Nt[u] = a), (a = null != e(i, r, o) ? u : null), (Nt[u] = l)), a;
      };
    });
  var gi = /^(?:input|select|textarea|button)$/i,
    mi = /^(?:a|area)$/i;
  function st(t) {
    return (t.match(ge) || []).join(' ');
  }
  function He(t) {
    return (t.getAttribute && t.getAttribute('class')) || '';
  }
  function vt(t) {
    return Array.isArray(t) ? t : ('string' == typeof t && t.match(ge)) || [];
  }
  s.fn.extend({
    prop: function (t, n) {
      return Pe(this, s.prop, t, n, 1 < arguments.length);
    },
    removeProp: function (t) {
      return this.each(function () {
        delete this[s.propFix[t] || t];
      });
    },
  }),
    s.extend({
      prop: function (t, n, e) {
        var i,
          r,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && s.isXMLDoc(t)) || (r = s.propHooks[(n = s.propFix[n] || n)]),
            void 0 !== e
              ? r && 'set' in r && void 0 !== (i = r.set(t, e, n))
                ? i
                : (t[n] = e)
              : r && 'get' in r && null !== (i = r.get(t, n))
              ? i
              : t[n]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (t) {
            var n = s.find.attr(t, 'tabindex');
            return n ? parseInt(n, 10) : gi.test(t.nodeName) || (mi.test(t.nodeName) && t.href) ? 0 : -1;
          },
        },
      },
      propFix: { for: 'htmlFor', class: 'className' },
    }),
    P.optSelected ||
      (s.propHooks.selected = {
        get: function (t) {
          return null;
        },
        set: function (t) {},
      }),
    s.each(
      [
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable',
      ],
      function () {
        s.propFix[this.toLowerCase()] = this;
      },
    ),
    s.fn.extend({
      addClass: function (t) {
        var n, e, i, r, o, a;
        return O(t)
          ? this.each(function (l) {
              s(this).addClass(t.call(this, l, He(this)));
            })
          : (n = vt(t)).length
          ? this.each(function () {
              if (((i = He(this)), (e = 1 === this.nodeType && ' ' + st(i) + ' '))) {
                for (o = 0; o < n.length; o++) e.indexOf(' ' + (r = n[o]) + ' ') < 0 && (e += r + ' ');
                (a = st(e)), i !== a && this.setAttribute('class', a);
              }
            })
          : this;
      },
      removeClass: function (t) {
        var n, e, i, r, o, a;
        return O(t)
          ? this.each(function (l) {
              s(this).removeClass(t.call(this, l, He(this)));
            })
          : arguments.length
          ? (n = vt(t)).length
            ? this.each(function () {
                if (((i = He(this)), (e = 1 === this.nodeType && ' ' + st(i) + ' '))) {
                  for (o = 0; o < n.length; o++)
                    for (r = n[o]; -1 < e.indexOf(' ' + r + ' '); ) e = e.replace(' ' + r + ' ', ' ');
                  (a = st(e)), i !== a && this.setAttribute('class', a);
                }
              })
            : this
          : this.attr('class', '');
      },
      toggleClass: function (t, n) {
        var e,
          i,
          r,
          o,
          a = typeof t,
          l = 'string' === a || Array.isArray(t);
        return O(t)
          ? this.each(function (u) {
              s(this).toggleClass(t.call(this, u, He(this), n), n);
            })
          : 'boolean' == typeof n && l
          ? n
            ? this.addClass(t)
            : this.removeClass(t)
          : ((e = vt(t)),
            this.each(function () {
              if (l)
                for (o = s(this), r = 0; r < e.length; r++) o.hasClass((i = e[r])) ? o.removeClass(i) : o.addClass(i);
              else
                (void 0 !== t && 'boolean' !== a) ||
                  ((i = He(this)) && A.set(this, '__className__', i),
                  this.setAttribute &&
                    this.setAttribute('class', i || !1 === t ? '' : A.get(this, '__className__') || ''));
            }));
      },
      hasClass: function (t) {
        var n,
          e,
          i = 0;
        for (n = ' ' + t + ' '; (e = this[i++]); )
          if (1 === e.nodeType && -1 < (' ' + st(He(e)) + ' ').indexOf(n)) return !0;
        return !1;
      },
    });
  var Qn = /\r/g;
  s.fn.extend({
    val: function (t) {
      var n,
        e,
        i,
        r = this[0];
      return arguments.length
        ? ((i = O(t)),
          this.each(function (o) {
            var a;
            1 === this.nodeType &&
              (null == (a = i ? t.call(this, o, s(this).val()) : t)
                ? (a = '')
                : 'number' == typeof a
                ? (a += '')
                : Array.isArray(a) &&
                  (a = s.map(a, function (l) {
                    return null == l ? '' : l + '';
                  })),
              ((n = s.valHooks[this.type] || s.valHooks[this.nodeName.toLowerCase()]) &&
                'set' in n &&
                void 0 !== n.set(this, a, 'value')) ||
                (this.value = a));
          }))
        : r
        ? (n = s.valHooks[r.type] || s.valHooks[r.nodeName.toLowerCase()]) &&
          'get' in n &&
          void 0 !== (e = n.get(r, 'value'))
          ? e
          : 'string' == typeof (e = r.value)
          ? e.replace(Qn, '')
          : e ?? ''
        : void 0;
    },
  }),
    s.extend({
      valHooks: {
        option: {
          get: function (t) {
            return s.find.attr(t, 'value') ?? st(s.text(t));
          },
        },
        select: {
          get: function (t) {
            var n,
              e,
              i,
              r = t.options,
              o = t.selectedIndex,
              a = 'select-one' === t.type,
              l = a ? null : [],
              u = a ? o + 1 : r.length;
            for (i = o < 0 ? u : a ? o : 0; i < u; i++)
              if (
                ((e = r[i]).selected || i === o) &&
                !e.disabled &&
                (!e.parentNode.disabled || !B(e.parentNode, 'optgroup'))
              ) {
                if (((n = s(e).val()), a)) return n;
                l.push(n);
              }
            return l;
          },
          set: function (t, n) {
            for (var e, i, r = t.options, o = s.makeArray(n), a = r.length; a--; )
              ((i = r[a]).selected = -1 < s.inArray(s.valHooks.option.get(i), o)) && (e = !0);
            return e || (t.selectedIndex = -1), o;
          },
        },
      },
    }),
    s.each(['radio', 'checkbox'], function () {
      (s.valHooks[this] = {
        set: function (t, n) {
          if (Array.isArray(n)) return (t.checked = -1 < s.inArray(s(t).val(), n));
        },
      }),
        P.checkOn ||
          (s.valHooks[this].get = function (t) {
            return null === t.getAttribute('value') ? 'on' : t.value;
          });
    });
  var yt = N.location,
    jt = { guid: Date.now() },
    Gt = /\?/;
  s.parseXML = function (t) {
    var n, e;
    if (!t || 'string' != typeof t) return null;
    try {
      n = new N.DOMParser().parseFromString(t, 'text/xml');
    } catch {}
    return (
      (e = n && n.getElementsByTagName('parsererror')[0]),
      (n && !e) ||
        s.error(
          'Invalid XML: ' +
            (e
              ? s
                  .map(e.childNodes, function (i) {
                    return i.textContent;
                  })
                  .join('\n')
              : t),
        ),
      n
    );
  };
  var Yn = /^(?:focusinfocus|focusoutblur)$/,
    Kn = function (t) {
      t.stopPropagation();
    };
  s.extend(s.event, {
    trigger: function (t, n, e, i) {
      var r,
        o,
        a,
        l,
        u,
        h,
        p,
        m,
        f = [e || I],
        y = Ee.call(t, 'type') ? t.type : t,
        x = Ee.call(t, 'namespace') ? t.namespace.split('.') : [];
      if (
        ((o = m = a = e = e || I),
        3 !== e.nodeType &&
          8 !== e.nodeType &&
          !Yn.test(y + s.event.triggered) &&
          (-1 < y.indexOf('.') && ((y = (x = y.split('.')).shift()), x.sort()),
          (u = y.indexOf(':') < 0 && 'on' + y),
          ((t = t[s.expando] ? t : new s.Event(y, 'object' == typeof t && t)).isTrigger = i ? 2 : 3),
          (t.namespace = x.join('.')),
          (t.rnamespace = t.namespace ? new RegExp('(^|\\.)' + x.join('\\.(?:.*\\.|)') + '(\\.|$)') : null),
          (t.result = void 0),
          t.target || (t.target = e),
          (n = null == n ? [t] : s.makeArray(n, [t])),
          (p = s.event.special[y] || {}),
          i || !p.trigger || !1 !== p.trigger.apply(e, n)))
      ) {
        if (!i && !p.noBubble && !Ye(e)) {
          for (Yn.test((l = p.delegateType || y) + y) || (o = o.parentNode); o; o = o.parentNode) f.push(o), (a = o);
          a === (e.ownerDocument || I) && f.push(a.defaultView || a.parentWindow || N);
        }
        for (r = 0; (o = f[r++]) && !t.isPropagationStopped(); )
          (m = o),
            (t.type = 1 < r ? l : p.bindType || y),
            (h = (A.get(o, 'events') || Object.create(null))[t.type] && A.get(o, 'handle')) && h.apply(o, n),
            (h = u && o[u]) && h.apply && Re(o) && ((t.result = h.apply(o, n)), !1 === t.result && t.preventDefault());
        return (
          (t.type = y),
          i ||
            t.isDefaultPrevented() ||
            (p._default && !1 !== p._default.apply(f.pop(), n)) ||
            !Re(e) ||
            (u &&
              O(e[y]) &&
              !Ye(e) &&
              ((a = e[u]) && (e[u] = null),
              (s.event.triggered = y),
              t.isPropagationStopped() && m.addEventListener(y, Kn),
              e[y](),
              t.isPropagationStopped() && m.removeEventListener(y, Kn),
              (s.event.triggered = void 0),
              a && (e[u] = a))),
          t.result
        );
      }
    },
    simulate: function (t, n, e) {
      var i = s.extend(new s.Event(), e, { type: t, isSimulated: !0 });
      s.event.trigger(i, null, n);
    },
  }),
    s.fn.extend({
      trigger: function (t, n) {
        return this.each(function () {
          s.event.trigger(t, n, this);
        });
      },
      triggerHandler: function (t, n) {
        var e = this[0];
        if (e) return s.event.trigger(t, n, e, !0);
      },
    });
  var vi = /\[\]$/,
    Xe = /\r?\n/g,
    yi = /^(?:submit|button|image|reset|file)$/i,
    bi = /^(?:input|select|textarea|keygen)/i;
  function bt(t, n, e, i) {
    var r;
    if (Array.isArray(n))
      s.each(n, function (o, a) {
        e || vi.test(t) ? i(t, a) : bt(t + '[' + ('object' == typeof a && null != a ? o : '') + ']', a, e, i);
      });
    else if (e || 'object' !== K(n)) i(t, n);
    else for (r in n) bt(t + '[' + r + ']', n[r], e, i);
  }
  (s.param = function (t, n) {
    var e,
      i = [],
      r = function (o, a) {
        var l = O(a) ? a() : a;
        i[i.length] = encodeURIComponent(o) + '=' + encodeURIComponent(l ?? '');
      };
    if (null == t) return '';
    if (Array.isArray(t) || (t.jquery && !s.isPlainObject(t)))
      s.each(t, function () {
        r(this.name, this.value);
      });
    else for (e in t) bt(e, t[e], n, r);
    return i.join('&');
  }),
    s.fn.extend({
      serialize: function () {
        return s.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var t = s.prop(this, 'elements');
          return t ? s.makeArray(t) : this;
        })
          .filter(function () {
            var t = this.type;
            return (
              this.name &&
              !s(this).is(':disabled') &&
              bi.test(this.nodeName) &&
              !yi.test(t) &&
              (this.checked || !dt.test(t))
            );
          })
          .map(function (t, n) {
            var e = s(this).val();
            return null == e
              ? null
              : Array.isArray(e)
              ? s.map(e, function (i) {
                  return { name: n.name, value: i.replace(Xe, '\r\n') };
                })
              : { name: n.name, value: e.replace(Xe, '\r\n') };
          })
          .get();
      },
    });
  var Gn = /%20/g,
    Ot = /#.*$/,
    Jn = /([?&])_=[^&]*/,
    _i = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    wi = /^(?:GET|HEAD)$/,
    It = /^\/\//,
    Zn = {},
    Jt = {},
    ei = '*/'.concat('*'),
    Zt = I.createElement('a');
  function Pt(t) {
    return function (n, e) {
      'string' != typeof n && ((e = n), (n = '*'));
      var i,
        r = 0,
        o = n.toLowerCase().match(ge) || [];
      if (O(e))
        for (; (i = o[r++]); )
          '+' === i[0] ? ((i = i.slice(1) || '*'), (t[i] = t[i] || []).unshift(e)) : (t[i] = t[i] || []).push(e);
    };
  }
  function Cn(t, n, e, i) {
    var r = {},
      o = t === Jt;
    function a(l) {
      var u;
      return (
        (r[l] = !0),
        s.each(t[l] || [], function (h, p) {
          var m = p(n, e, i);
          return 'string' != typeof m || o || r[m] ? (o ? !(u = m) : void 0) : (n.dataTypes.unshift(m), a(m), !1);
        }),
        u
      );
    }
    return a(n.dataTypes[0]) || (!r['*'] && a('*'));
  }
  function Mt(t, n) {
    var e,
      i,
      r = s.ajaxSettings.flatOptions || {};
    for (e in n) void 0 !== n[e] && ((r[e] ? t : i || (i = {}))[e] = n[e]);
    return i && s.extend(!0, t, i), t;
  }
  (Zt.href = yt.href),
    s.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: yt.href,
        type: 'GET',
        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(yt.protocol),
        global: !0,
        processData: !0,
        async: !0,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        accepts: {
          '*': ei,
          text: 'text/plain',
          html: 'text/html',
          xml: 'application/xml, text/xml',
          json: 'application/json, text/javascript',
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' },
        converters: { '* text': String, 'text html': !0, 'text json': JSON.parse, 'text xml': s.parseXML },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (t, n) {
        return n ? Mt(Mt(t, s.ajaxSettings), n) : Mt(s.ajaxSettings, t);
      },
      ajaxPrefilter: Pt(Zn),
      ajaxTransport: Pt(Jt),
      ajax: function (t, n) {
        'object' == typeof t && ((n = t), (t = void 0));
        var e,
          i,
          r,
          o,
          a,
          l,
          u,
          h,
          p,
          m,
          f = s.ajaxSetup({}, (n = n || {})),
          y = f.context || f,
          x = f.context && (y.nodeType || y.jquery) ? s(y) : s.event,
          D = s.Deferred(),
          S = s.Callbacks('once memory'),
          z = f.statusCode || {},
          V = {},
          Se = {},
          ie = 'canceled',
          q = {
            readyState: 0,
            getResponseHeader: function ($) {
              var Y;
              if (u) {
                if (!o)
                  for (o = {}; (Y = _i.exec(r)); )
                    o[Y[1].toLowerCase() + ' '] = (o[Y[1].toLowerCase() + ' '] || []).concat(Y[2]);
                Y = o[$.toLowerCase() + ' '];
              }
              return null == Y ? null : Y.join(', ');
            },
            getAllResponseHeaders: function () {
              return u ? r : null;
            },
            setRequestHeader: function ($, Y) {
              return null == u && (($ = Se[$.toLowerCase()] = Se[$.toLowerCase()] || $), (V[$] = Y)), this;
            },
            overrideMimeType: function ($) {
              return null == u && (f.mimeType = $), this;
            },
            statusCode: function ($) {
              var Y;
              if ($)
                if (u) q.always($[q.status]);
                else for (Y in $) z[Y] = [z[Y], $[Y]];
              return this;
            },
            abort: function ($) {
              var Y = $ || ie;
              return e && e.abort(Y), Ht(0, Y), this;
            },
          };
        if (
          (D.promise(q),
          (f.url = ((t || f.url || yt.href) + '').replace(It, yt.protocol + '//')),
          (f.type = n.method || n.type || f.method || f.type),
          (f.dataTypes = (f.dataType || '*').toLowerCase().match(ge) || ['']),
          null == f.crossDomain)
        ) {
          l = I.createElement('a');
          try {
            (l.href = f.url),
              (l.href = l.href),
              (f.crossDomain = Zt.protocol + '//' + Zt.host != l.protocol + '//' + l.host);
          } catch {
            f.crossDomain = !0;
          }
        }
        if (
          (f.data && f.processData && 'string' != typeof f.data && (f.data = s.param(f.data, f.traditional)),
          Cn(Zn, f, n, q),
          u)
        )
          return q;
        for (p in ((h = s.event && f.global) && 0 == s.active++ && s.event.trigger('ajaxStart'),
        (f.type = f.type.toUpperCase()),
        (f.hasContent = !wi.test(f.type)),
        (i = f.url.replace(Ot, '')),
        f.hasContent
          ? f.data &&
            f.processData &&
            0 === (f.contentType || '').indexOf('application/x-www-form-urlencoded') &&
            (f.data = f.data.replace(Gn, '+'))
          : ((m = f.url.slice(i.length)),
            f.data &&
              (f.processData || 'string' == typeof f.data) &&
              ((i += (Gt.test(i) ? '&' : '?') + f.data), delete f.data),
            !1 === f.cache && ((i = i.replace(Jn, '$1')), (m = (Gt.test(i) ? '&' : '?') + '_=' + jt.guid++ + m)),
            (f.url = i + m)),
        f.ifModified &&
          (s.lastModified[i] && q.setRequestHeader('If-Modified-Since', s.lastModified[i]),
          s.etag[i] && q.setRequestHeader('If-None-Match', s.etag[i])),
        ((f.data && f.hasContent && !1 !== f.contentType) || n.contentType) &&
          q.setRequestHeader('Content-Type', f.contentType),
        q.setRequestHeader(
          'Accept',
          f.dataTypes[0] && f.accepts[f.dataTypes[0]]
            ? f.accepts[f.dataTypes[0]] + ('*' !== f.dataTypes[0] ? ', ' + ei + '; q=0.01' : '')
            : f.accepts['*'],
        ),
        f.headers))
          q.setRequestHeader(p, f.headers[p]);
        if (f.beforeSend && (!1 === f.beforeSend.call(y, q, f) || u)) return q.abort();
        if (((ie = 'abort'), S.add(f.complete), q.done(f.success), q.fail(f.error), (e = Cn(Jt, f, n, q)))) {
          if (((q.readyState = 1), h && x.trigger('ajaxSend', [q, f]), u)) return q;
          f.async &&
            0 < f.timeout &&
            (a = N.setTimeout(function () {
              q.abort('timeout');
            }, f.timeout));
          try {
            (u = !1), e.send(V, Ht);
          } catch ($) {
            if (u) throw $;
            Ht(-1, $);
          }
        } else Ht(-1, 'No Transport');
        function Ht($, Y, An, Ci) {
          var Ve,
            kn,
            at,
            wt,
            tn,
            De = Y;
          u ||
            ((u = !0),
            a && N.clearTimeout(a),
            (e = void 0),
            (r = Ci || ''),
            (q.readyState = 0 < $ ? 4 : 0),
            (Ve = (200 <= $ && $ < 300) || 304 === $),
            An &&
              (wt = (function (re, Z, ue) {
                for (var xt, he, L, G, J = re.contents, X = re.dataTypes; '*' === X[0]; )
                  X.shift(), void 0 === xt && (xt = re.mimeType || Z.getResponseHeader('Content-Type'));
                if (xt)
                  for (he in J)
                    if (J[he] && J[he].test(xt)) {
                      X.unshift(he);
                      break;
                    }
                if (X[0] in ue) L = X[0];
                else {
                  for (he in ue) {
                    if (!X[0] || re.converters[he + ' ' + X[0]]) {
                      L = he;
                      break;
                    }
                    G || (G = he);
                  }
                  L = L || G;
                }
                if (L) return L !== X[0] && X.unshift(L), ue[L];
              })(f, q, An)),
            !Ve &&
              -1 < s.inArray('script', f.dataTypes) &&
              s.inArray('json', f.dataTypes) < 0 &&
              (f.converters['text script'] = function () {}),
            (wt = (function (re, Z, ue, xt) {
              var he,
                L,
                G,
                J,
                X,
                Qe = {},
                nn = re.dataTypes.slice();
              if (nn[1]) for (G in re.converters) Qe[G.toLowerCase()] = re.converters[G];
              for (L = nn.shift(); L; )
                if (
                  (re.responseFields[L] && (ue[re.responseFields[L]] = Z),
                  !X && xt && re.dataFilter && (Z = re.dataFilter(Z, re.dataType)),
                  (X = L),
                  (L = nn.shift()))
                )
                  if ('*' === L) L = X;
                  else if ('*' !== X && X !== L) {
                    if (!(G = Qe[X + ' ' + L] || Qe['* ' + L]))
                      for (he in Qe)
                        if ((J = he.split(' '))[1] === L && (G = Qe[X + ' ' + J[0]] || Qe['* ' + J[0]])) {
                          !0 === G ? (G = Qe[he]) : !0 !== Qe[he] && ((L = J[0]), nn.unshift(J[1]));
                          break;
                        }
                    if (!0 !== G)
                      if (G && re.throws) Z = G(Z);
                      else
                        try {
                          Z = G(Z);
                        } catch (ni) {
                          return { state: 'parsererror', error: G ? ni : 'No conversion from ' + X + ' to ' + L };
                        }
                  }
              return { state: 'success', data: Z };
            })(f, wt, q, Ve)),
            Ve
              ? (f.ifModified &&
                  ((tn = q.getResponseHeader('Last-Modified')) && (s.lastModified[i] = tn),
                  (tn = q.getResponseHeader('etag')) && (s.etag[i] = tn)),
                204 === $ || 'HEAD' === f.type
                  ? (De = 'nocontent')
                  : 304 === $
                  ? (De = 'notmodified')
                  : ((De = wt.state), (kn = wt.data), (Ve = !(at = wt.error))))
              : ((at = De), (!$ && De) || ((De = 'error'), $ < 0 && ($ = 0))),
            (q.status = $),
            (q.statusText = (Y || De) + ''),
            Ve ? D.resolveWith(y, [kn, De, q]) : D.rejectWith(y, [q, De, at]),
            q.statusCode(z),
            (z = void 0),
            h && x.trigger(Ve ? 'ajaxSuccess' : 'ajaxError', [q, f, Ve ? kn : at]),
            S.fireWith(y, [q, De]),
            h && (x.trigger('ajaxComplete', [q, f]), --s.active || s.event.trigger('ajaxStop')));
        }
        return q;
      },
      getJSON: function (t, n, e) {
        return s.get(t, n, e, 'json');
      },
      getScript: function (t, n) {
        return s.get(t, void 0, n, 'script');
      },
    }),
    s.each(['get', 'post'], function (t, n) {
      s[n] = function (e, i, r, o) {
        return (
          O(i) && ((o = o || r), (r = i), (i = void 0)),
          s.ajax(s.extend({ url: e, type: n, dataType: o, data: i, success: r }, s.isPlainObject(e) && e))
        );
      };
    }),
    s.ajaxPrefilter(function (t) {
      var n;
      for (n in t.headers) 'content-type' === n.toLowerCase() && (t.contentType = t.headers[n] || '');
    }),
    (s._evalUrl = function (t, n, e) {
      return s.ajax({
        url: t,
        type: 'GET',
        dataType: 'script',
        cache: !0,
        async: !1,
        global: !1,
        converters: { 'text script': function () {} },
        dataFilter: function (i) {
          s.globalEval(i, n, e);
        },
      });
    }),
    s.fn.extend({
      wrapAll: function (t) {
        var n;
        return (
          this[0] &&
            (O(t) && (t = t.call(this[0])),
            (n = s(t, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && n.insertBefore(this[0]),
            n
              .map(function () {
                for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                return e;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (t) {
        return O(t)
          ? this.each(function (n) {
              s(this).wrapInner(t.call(this, n));
            })
          : this.each(function () {
              var n = s(this),
                e = n.contents();
              e.length ? e.wrapAll(t) : n.append(t);
            });
      },
      wrap: function (t) {
        var n = O(t);
        return this.each(function (e) {
          s(this).wrapAll(n ? t.call(this, e) : t);
        });
      },
      unwrap: function (t) {
        return (
          this.parent(t)
            .not('body')
            .each(function () {
              s(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (s.expr.pseudos.hidden = function (t) {
      return !s.expr.pseudos.visible(t);
    }),
    (s.expr.pseudos.visible = function (t) {
      return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
    }),
    (s.ajaxSettings.xhr = function () {
      try {
        return new N.XMLHttpRequest();
      } catch {}
    });
  var ti = { 0: 200, 1223: 204 },
    ot = s.ajaxSettings.xhr();
  (P.cors = !!ot && 'withCredentials' in ot),
    (P.ajax = ot = !!ot),
    s.ajaxTransport(function (t) {
      var n, e;
      if (P.cors || (ot && !t.crossDomain))
        return {
          send: function (i, r) {
            var o,
              a = t.xhr();
            if ((a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields))
              for (o in t.xhrFields) a[o] = t.xhrFields[o];
            for (o in (t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType),
            t.crossDomain || i['X-Requested-With'] || (i['X-Requested-With'] = 'XMLHttpRequest'),
            i))
              a.setRequestHeader(o, i[o]);
            (n = function (l) {
              return function () {
                n &&
                  ((n = e = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null),
                  'abort' === l
                    ? a.abort()
                    : 'error' === l
                    ? 'number' != typeof a.status
                      ? r(0, 'error')
                      : r(a.status, a.statusText)
                    : r(
                        ti[a.status] || a.status,
                        a.statusText,
                        'text' !== (a.responseType || 'text') || 'string' != typeof a.responseText
                          ? { binary: a.response }
                          : { text: a.responseText },
                        a.getAllResponseHeaders(),
                      ));
              };
            }),
              (a.onload = n()),
              (e = a.onerror = a.ontimeout = n('error')),
              void 0 !== a.onabort
                ? (a.onabort = e)
                : (a.onreadystatechange = function () {
                    4 === a.readyState &&
                      N.setTimeout(function () {
                        n && e();
                      });
                  }),
              (n = n('abort'));
            try {
              a.send((t.hasContent && t.data) || null);
            } catch (l) {
              if (n) throw l;
            }
          },
          abort: function () {
            n && n();
          },
        };
    }),
    s.ajaxPrefilter(function (t) {
      t.crossDomain && (t.contents.script = !1);
    }),
    s.ajaxSetup({
      accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        'text script': function (t) {
          return s.globalEval(t), t;
        },
      },
    }),
    s.ajaxPrefilter('script', function (t) {
      void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = 'GET');
    }),
    s.ajaxTransport('script', function (t) {
      var n, e;
      if (t.crossDomain || t.scriptAttrs)
        return {
          send: function (i, r) {
            (n = s('<script>')
              .attr(t.scriptAttrs || {})
              .prop({ charset: t.scriptCharset, src: t.url })
              .on(
                'load error',
                (e = function (o) {
                  n.remove(), (e = null), o && r('error' === o.type ? 404 : 200, o.type);
                }),
              )),
              I.head.appendChild(n[0]);
          },
          abort: function () {
            e && e();
          },
        };
    });
  var Ue,
    En = [],
    _t = /(=)\?(?=&|$)|\?\?/;
  s.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var t = En.pop() || s.expando + '_' + jt.guid++;
      return (this[t] = !0), t;
    },
  }),
    s.ajaxPrefilter('json jsonp', function (t, n, e) {
      var i,
        r,
        o,
        a =
          !1 !== t.jsonp &&
          (_t.test(t.url)
            ? 'url'
            : 'string' == typeof t.data &&
              0 === (t.contentType || '').indexOf('application/x-www-form-urlencoded') &&
              _t.test(t.data) &&
              'data');
      if (a || 'jsonp' === t.dataTypes[0])
        return (
          (i = t.jsonpCallback = O(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
          a
            ? (t[a] = t[a].replace(_t, '$1' + i))
            : !1 !== t.jsonp && (t.url += (Gt.test(t.url) ? '&' : '?') + t.jsonp + '=' + i),
          (t.converters['script json'] = function () {
            return o || s.error(i + ' was not called'), o[0];
          }),
          (t.dataTypes[0] = 'json'),
          (r = N[i]),
          (N[i] = function () {
            o = arguments;
          }),
          e.always(function () {
            void 0 === r ? s(N).removeProp(i) : (N[i] = r),
              t[i] && ((t.jsonpCallback = n.jsonpCallback), En.push(i)),
              o && O(r) && r(o[0]),
              (o = r = void 0);
          }),
          'script'
        );
    }),
    (P.createHTMLDocument =
      (((Ue = I.implementation.createHTMLDocument('').body).innerHTML = '<form></form><form></form>'),
      2 === Ue.childNodes.length)),
    (s.parseHTML = function (t, n, e) {
      return 'string' != typeof t
        ? []
        : ('boolean' == typeof n && ((e = n), (n = !1)),
          n ||
            (P.createHTMLDocument
              ? (((i = (n = I.implementation.createHTMLDocument('')).createElement('base')).href = I.location.href),
                n.head.appendChild(i))
              : (n = I)),
          (o = !e && []),
          (r = _.exec(t))
            ? [n.createElement(r[1])]
            : ((r = Mn([t], n, o)), o && o.length && s(o).remove(), s.merge([], r.childNodes)));
      var i, r, o;
    }),
    (s.fn.load = function (t, n, e) {
      var i,
        r,
        o,
        a = this,
        l = t.indexOf(' ');
      return (
        -1 < l && ((i = st(t.slice(l))), (t = t.slice(0, l))),
        O(n) ? ((e = n), (n = void 0)) : n && 'object' == typeof n && (r = 'POST'),
        0 < a.length &&
          s
            .ajax({ url: t, type: r || 'GET', dataType: 'html', data: n })
            .done(function (u) {
              (o = arguments), a.html(i ? s('<div>').append(s.parseHTML(u)).find(i) : u);
            })
            .always(
              e &&
                function (u, h) {
                  a.each(function () {
                    e.apply(this, o || [u.responseText, h, u]);
                  });
                },
            ),
        this
      );
    }),
    (s.expr.pseudos.animated = function (t) {
      return s.grep(s.timers, function (n) {
        return t === n.elem;
      }).length;
    }),
    (s.offset = {
      setOffset: function (t, n, e) {
        var i,
          r,
          o,
          a,
          l,
          u,
          h = s.css(t, 'position'),
          p = s(t),
          m = {};
        'static' === h && (t.style.position = 'relative'),
          (l = p.offset()),
          (o = s.css(t, 'top')),
          (u = s.css(t, 'left')),
          ('absolute' === h || 'fixed' === h) && -1 < (o + u).indexOf('auto')
            ? ((a = (i = p.position()).top), (r = i.left))
            : ((a = parseFloat(o) || 0), (r = parseFloat(u) || 0)),
          O(n) && (n = n.call(t, e, s.extend({}, l))),
          null != n.top && (m.top = n.top - l.top + a),
          null != n.left && (m.left = n.left - l.left + r),
          'using' in n ? n.using.call(t, m) : p.css(m);
      },
    }),
    s.fn.extend({
      offset: function (t) {
        if (arguments.length)
          return void 0 === t
            ? this
            : this.each(function (r) {
                s.offset.setOffset(this, t, r);
              });
        var n,
          e,
          i = this[0];
        return i
          ? i.getClientRects().length
            ? {
                top: (n = i.getBoundingClientRect()).top + (e = i.ownerDocument.defaultView).pageYOffset,
                left: n.left + e.pageXOffset,
              }
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var t,
            n,
            e,
            i = this[0],
            r = { top: 0, left: 0 };
          if ('fixed' === s.css(i, 'position')) n = i.getBoundingClientRect();
          else {
            for (
              n = this.offset(), e = i.ownerDocument, t = i.offsetParent || e.documentElement;
              t && (t === e.body || t === e.documentElement) && 'static' === s.css(t, 'position');

            )
              t = t.parentNode;
            t &&
              t !== i &&
              1 === t.nodeType &&
              (((r = s(t).offset()).top += s.css(t, 'borderTopWidth', !0)),
              (r.left += s.css(t, 'borderLeftWidth', !0)));
          }
          return { top: n.top - r.top - s.css(i, 'marginTop', !0), left: n.left - r.left - s.css(i, 'marginLeft', !0) };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (var t = this.offsetParent; t && 'static' === s.css(t, 'position'); ) t = t.offsetParent;
          return t || ke;
        });
      },
    }),
    s.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (t, n) {
      var e = 'pageYOffset' === n;
      s.fn[t] = function (i) {
        return Pe(
          this,
          function (r, o, a) {
            var l;
            if ((Ye(r) ? (l = r) : 9 === r.nodeType && (l = r.defaultView), void 0 === a)) return l ? l[n] : r[o];
            l ? l.scrollTo(e ? l.pageXOffset : a, e ? a : l.pageYOffset) : (r[o] = a);
          },
          t,
          i,
          arguments.length,
        );
      };
    }),
    s.each(['top', 'left'], function (t, n) {
      s.cssHooks[n] = Qt(P.pixelPosition, function (e, i) {
        if (i) return (i = mt(e, n)), gn.test(i) ? s(e).position()[n] + 'px' : i;
      });
    }),
    s.each({ Height: 'height', Width: 'width' }, function (t, n) {
      s.each({ padding: 'inner' + t, content: n, '': 'outer' + t }, function (e, i) {
        s.fn[i] = function (r, o) {
          var a = arguments.length && (e || 'boolean' != typeof r),
            l = e || (!0 === r || !0 === o ? 'margin' : 'border');
          return Pe(
            this,
            function (u, h, p) {
              var m;
              return Ye(u)
                ? 0 === i.indexOf('outer')
                  ? u['inner' + t]
                  : u.document.documentElement['client' + t]
                : 9 === u.nodeType
                ? ((m = u.documentElement),
                  Math.max(
                    u.body['scroll' + t],
                    m['scroll' + t],
                    u.body['offset' + t],
                    m['offset' + t],
                    m['client' + t],
                  ))
                : void 0 === p
                ? s.css(u, h, l)
                : s.style(u, h, p, l);
            },
            n,
            a ? r : void 0,
            a,
          );
        };
      });
    }),
    s.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function (t, n) {
      s.fn[n] = function (e) {
        return this.on(n, e);
      };
    }),
    s.fn.extend({
      bind: function (t, n, e) {
        return this.on(t, null, n, e);
      },
      unbind: function (t, n) {
        return this.off(t, null, n);
      },
      delegate: function (t, n, e, i) {
        return this.on(n, t, e, i);
      },
      undelegate: function (t, n, e) {
        return 1 === arguments.length ? this.off(t, '**') : this.off(n, t || '**', e);
      },
      hover: function (t, n) {
        return this.mouseenter(t).mouseleave(n || t);
      },
    }),
    s.each(
      'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
        ' ',
      ),
      function (t, n) {
        s.fn[n] = function (e, i) {
          return 0 < arguments.length ? this.on(n, null, e, i) : this.trigger(n);
        };
      },
    );
  var en = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  (s.proxy = function (t, n) {
    var e, i, r;
    if (('string' == typeof n && ((e = t[n]), (n = t), (t = e)), O(t)))
      return (
        (i = oe.call(arguments, 2)),
        ((r = function () {
          return t.apply(n || this, i.concat(oe.call(arguments)));
        }).guid = t.guid =
          t.guid || s.guid++),
        r
      );
  }),
    (s.holdReady = function (t) {
      t ? s.readyWait++ : s.ready(!0);
    }),
    (s.isArray = Array.isArray),
    (s.parseJSON = JSON.parse),
    (s.nodeName = B),
    (s.isFunction = O),
    (s.isWindow = Ye),
    (s.camelCase = ae),
    (s.type = K),
    (s.now = Date.now),
    (s.isNumeric = function (t) {
      var n = s.type(t);
      return ('number' === n || 'string' === n) && !isNaN(t - parseFloat(t));
    }),
    (s.trim = function (t) {
      return null == t ? '' : (t + '').replace(en, '$1');
    }),
    'function' == typeof define &&
      define.amd &&
      define('jquery', [], function () {
        return s;
      });
  var xi = N.jQuery,
    Ti = N.$;
  return (
    (s.noConflict = function (t) {
      return N.$ === s && (N.$ = Ti), t && N.jQuery === s && (N.jQuery = xi), s;
    }),
    typeof Le > 'u' && (N.jQuery = N.$ = s),
    s
  );
}),
  (function (N, Le) {
    'object' == typeof exports && typeof module < 'u'
      ? (module.exports = Le(require('@popperjs/core')))
      : 'function' == typeof define && define.amd
      ? define(['@popperjs/core'], Le)
      : ((N = typeof globalThis < 'u' ? globalThis : N || self).bootstrap = Le(N.Popper));
  })(this, function (N) {
    'use strict';
    const Q = (function Le(n) {
        const e = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
        if (n)
          for (const i in n)
            if ('default' !== i) {
              const r = Object.getOwnPropertyDescriptor(n, i);
              Object.defineProperty(e, i, r.get ? r : { enumerable: !0, get: () => n[i] });
            }
        return (e.default = n), Object.freeze(e);
      })(N),
      Ne = new Map(),
      oe = {
        set(n, e, i) {
          Ne.has(n) || Ne.set(n, new Map());
          const r = Ne.get(n);
          r.has(e) || 0 === r.size
            ? r.set(e, i)
            : console.error(
                `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                  Array.from(r.keys())[0]
                }.`,
              );
        },
        get: (n, e) => (Ne.has(n) && Ne.get(n).get(e)) || null,
        remove(n, e) {
          if (!Ne.has(n)) return;
          const i = Ne.get(n);
          i.delete(e), 0 === i.size && Ne.delete(n);
        },
      },
      $t = 'transitionend',
      Ct = (n) => (
        n && window.CSS && window.CSS.escape && (n = n.replace(/#([^\s"#']+)/g, (e, i) => `#${CSS.escape(i)}`)), n
      ),
      Ce = (n) => {
        n.dispatchEvent(new Event($t));
      },
      de = (n) => !(!n || 'object' != typeof n) && (void 0 !== n.jquery && (n = n[0]), void 0 !== n.nodeType),
      je = (n) =>
        de(n) ? (n.jquery ? n[0] : n) : 'string' == typeof n && n.length > 0 ? document.querySelector(Ct(n)) : null,
      Ee = (n) => {
        if (!de(n) || 0 === n.getClientRects().length) return !1;
        const e = 'visible' === getComputedStyle(n).getPropertyValue('visibility'),
          i = n.closest('details:not([open])');
        if (!i) return e;
        if (i !== n) {
          const r = n.closest('summary');
          if ((r && r.parentNode !== i) || null === r) return !1;
        }
        return e;
      },
      Oe = (n) =>
        !n ||
        n.nodeType !== Node.ELEMENT_NODE ||
        !!n.classList.contains('disabled') ||
        (void 0 !== n.disabled ? n.disabled : n.hasAttribute('disabled') && 'false' !== n.getAttribute('disabled')),
      Sn = (n) => {
        if (!document.documentElement.attachShadow) return null;
        if ('function' == typeof n.getRootNode) {
          const e = n.getRootNode();
          return e instanceof ShadowRoot ? e : null;
        }
        return n instanceof ShadowRoot ? n : n.parentNode ? Sn(n.parentNode) : null;
      },
      P = () => {},
      Ye = () => (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery') ? window.jQuery : null),
      I = [],
      fe = () => 'rtl' === document.documentElement.dir,
      ce = (n) => {
        var e;
        (e = () => {
          const i = Ye();
          if (i) {
            const r = n.NAME,
              o = i.fn[r];
            (i.fn[r] = n.jQueryInterface),
              (i.fn[r].Constructor = n),
              (i.fn[r].noConflict = () => ((i.fn[r] = o), n.jQueryInterface));
          }
        }),
          'loading' === document.readyState
            ? (I.length ||
                document.addEventListener('DOMContentLoaded', () => {
                  for (const i of I) i();
                }),
              I.push(e))
            : e();
      },
      K = (n, e = [], i = n) => ('function' == typeof n ? n(...e) : i),
      rn = (n, e, i = !0) => {
        if (!i) return void K(n);
        const r =
          ((l) => {
            if (!l) return 0;
            let { transitionDuration: u, transitionDelay: h } = window.getComputedStyle(l);
            const p = Number.parseFloat(u),
              m = Number.parseFloat(h);
            return p || m
              ? ((u = u.split(',')[0]), (h = h.split(',')[0]), 1e3 * (Number.parseFloat(u) + Number.parseFloat(h)))
              : 0;
          })(e) + 5;
        let o = !1;
        const a = ({ target: l }) => {
          l === e && ((o = !0), e.removeEventListener($t, a), K(n));
        };
        e.addEventListener($t, a),
          setTimeout(() => {
            o || Ce(e);
          }, r);
      },
      sn = (n, e, i, r) => {
        const o = n.length;
        let a = n.indexOf(e);
        return -1 === a
          ? !i && r
            ? n[o - 1]
            : n[0]
          : ((a += i ? 1 : -1), r && (a = (a + o) % o), n[Math.max(0, Math.min(a, o - 1))]);
      },
      s = /[^.]*(?=\..*)\.|.*/,
      on = /\..*/,
      B = /::\d+$/,
      an = {};
    let Dn = 1;
    const Ln = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
      W = new Set([
        'click',
        'dblclick',
        'mouseup',
        'mousedown',
        'contextmenu',
        'mousewheel',
        'DOMMouseScroll',
        'mouseover',
        'mouseout',
        'mousemove',
        'selectstart',
        'selectend',
        'keydown',
        'keypress',
        'keyup',
        'orientationchange',
        'touchstart',
        'touchmove',
        'touchend',
        'touchcancel',
        'pointerdown',
        'pointermove',
        'pointerup',
        'pointerleave',
        'pointercancel',
        'gesturestart',
        'gesturechange',
        'gestureend',
        'focus',
        'blur',
        'change',
        'reset',
        'select',
        'submit',
        'focusin',
        'focusout',
        'load',
        'unload',
        'beforeunload',
        'resize',
        'move',
        'DOMContentLoaded',
        'readystatechange',
        'error',
        'abort',
        'scroll',
      ]);
    function lt(n, e) {
      return (e && `${e}::${Dn++}`) || n.uidEvent || Dn++;
    }
    function Nn(n) {
      const e = lt(n);
      return (n.uidEvent = e), (an[e] = an[e] || {}), an[e];
    }
    function jn(n, e, i = null) {
      return Object.values(n).find((r) => r.callable === e && r.delegationSelector === i);
    }
    function Ae(n, e, i) {
      const r = 'string' == typeof e,
        o = r ? i : e || i;
      let a = ln(n);
      return W.has(a) || (a = n), [r, o, a];
    }
    function Rt(n, e, i, r, o) {
      if ('string' != typeof e || !n) return;
      let [a, l, u] = Ae(e, i, r);
      var D;
      e in Ln &&
        ((D = l),
        (l = function (S) {
          if (!S.relatedTarget || (S.relatedTarget !== S.delegateTarget && !S.delegateTarget.contains(S.relatedTarget)))
            return D.call(this, S);
        }));
      const h = Nn(n),
        p = h[u] || (h[u] = {}),
        m = jn(p, l, a ? i : null);
      if (m) return void (m.oneOff = m.oneOff && o);
      const f = lt(l, e.replace(s, '')),
        y = a
          ? (function (x, D, S) {
              return function z(V) {
                const Se = x.querySelectorAll(D);
                for (let { target: ie } = V; ie && ie !== this; ie = ie.parentNode)
                  for (const q of Se)
                    if (q === ie)
                      return Et(V, { delegateTarget: ie }), z.oneOff && _.off(x, V.type, D, S), S.apply(ie, [V]);
              };
            })(n, i, l)
          : (function (x, D) {
              return function S(z) {
                return Et(z, { delegateTarget: x }), S.oneOff && _.off(x, z.type, D), D.apply(x, [z]);
              };
            })(n, l);
      (y.delegationSelector = a ? i : null),
        (y.callable = l),
        (y.oneOff = o),
        (y.uidEvent = f),
        (p[f] = y),
        n.addEventListener(u, y, a);
    }
    function $e(n, e, i, r, o) {
      const a = jn(e[i], r, o);
      a && (n.removeEventListener(i, a, Boolean(o)), delete e[i][a.uidEvent]);
    }
    function On(n, e, i, r) {
      const o = e[i] || {};
      for (const [a, l] of Object.entries(o)) a.includes(r) && $e(n, e, i, l.callable, l.delegationSelector);
    }
    function ln(n) {
      return (n = n.replace(on, '')), Ln[n] || n;
    }
    const _ = {
      on(n, e, i, r) {
        Rt(n, e, i, r, !1);
      },
      one(n, e, i, r) {
        Rt(n, e, i, r, !0);
      },
      off(n, e, i, r) {
        if ('string' != typeof e || !n) return;
        const [o, a, l] = Ae(e, i, r),
          u = l !== e,
          h = Nn(n),
          p = h[l] || {},
          m = e.startsWith('.');
        if (void 0 === a) {
          if (m) for (const f of Object.keys(h)) On(n, h, f, e.slice(1));
          for (const [f, y] of Object.entries(p)) {
            const x = f.replace(B, '');
            (u && !e.includes(x)) || $e(n, h, l, y.callable, y.delegationSelector);
          }
        } else {
          if (!Object.keys(p).length) return;
          $e(n, h, l, a, o ? i : null);
        }
      },
      trigger(n, e, i) {
        if ('string' != typeof e || !n) return null;
        const r = Ye();
        let o = null,
          a = !0,
          l = !0,
          u = !1;
        e !== ln(e) &&
          r &&
          ((o = r.Event(e, i)),
          r(n).trigger(o),
          (a = !o.isPropagationStopped()),
          (l = !o.isImmediatePropagationStopped()),
          (u = o.isDefaultPrevented()));
        const h = Et(new Event(e, { bubbles: a, cancelable: !0 }), i);
        return u && h.preventDefault(), l && n.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
      },
    };
    function Et(n, e = {}) {
      for (const [i, r] of Object.entries(e))
        try {
          n[i] = r;
        } catch {
          Object.defineProperty(n, i, { configurable: !0, get: () => r });
        }
      return n;
    }
    function cn(n) {
      if ('true' === n) return !0;
      if ('false' === n) return !1;
      if (n === Number(n).toString()) return Number(n);
      if ('' === n || 'null' === n) return null;
      if ('string' != typeof n) return n;
      try {
        return JSON.parse(decodeURIComponent(n));
      } catch {
        return n;
      }
    }
    function un(n) {
      return n.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
    }
    const Ie = {
      setDataAttribute(n, e, i) {
        n.setAttribute(`data-bs-${un(e)}`, i);
      },
      removeDataAttribute(n, e) {
        n.removeAttribute(`data-bs-${un(e)}`);
      },
      getDataAttributes(n) {
        if (!n) return {};
        const e = {},
          i = Object.keys(n.dataset).filter((r) => r.startsWith('bs') && !r.startsWith('bsConfig'));
        for (const r of i) {
          let o = r.replace(/^bs/, '');
          (o = o.charAt(0).toLowerCase() + o.slice(1, o.length)), (e[o] = cn(n.dataset[r]));
        }
        return e;
      },
      getDataAttribute: (n, e) => cn(n.getAttribute(`data-bs-${un(e)}`)),
    };
    class At {
      static get Default() {
        return {};
      }
      static get DefaultType() {
        return {};
      }
      static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!');
      }
      _getConfig(e) {
        return (e = this._mergeConfigObj(e)), (e = this._configAfterMerge(e)), this._typeCheckConfig(e), e;
      }
      _configAfterMerge(e) {
        return e;
      }
      _mergeConfigObj(e, i) {
        const r = de(i) ? Ie.getDataAttribute(i, 'config') : {};
        return {
          ...this.constructor.Default,
          ...('object' == typeof r ? r : {}),
          ...(de(i) ? Ie.getDataAttributes(i) : {}),
          ...('object' == typeof e ? e : {}),
        };
      }
      _typeCheckConfig(e, i = this.constructor.DefaultType) {
        for (const [o, a] of Object.entries(i)) {
          const l = e[o],
            u = de(l)
              ? 'element'
              : null == (r = l)
              ? `${r}`
              : Object.prototype.toString
                  .call(r)
                  .match(/\s([a-z]+)/i)[1]
                  .toLowerCase();
          if (!new RegExp(a).test(u))
            throw new TypeError(
              `${this.constructor.NAME.toUpperCase()}: Option "${o}" provided type "${u}" but expected type "${a}".`,
            );
        }
        var r;
      }
    }
    class pe extends At {
      constructor(e, i) {
        super(),
          (e = je(e)) &&
            ((this._element = e),
            (this._config = this._getConfig(i)),
            oe.set(this._element, this.constructor.DATA_KEY, this));
      }
      dispose() {
        oe.remove(this._element, this.constructor.DATA_KEY), _.off(this._element, this.constructor.EVENT_KEY);
        for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
      }
      _queueCallback(e, i, r = !0) {
        rn(e, i, r);
      }
      _getConfig(e) {
        return (
          (e = this._mergeConfigObj(e, this._element)), (e = this._configAfterMerge(e)), this._typeCheckConfig(e), e
        );
      }
      static getInstance(e) {
        return oe.get(je(e), this.DATA_KEY);
      }
      static getOrCreateInstance(e, i = {}) {
        return this.getInstance(e) || new this(e, 'object' == typeof i ? i : null);
      }
      static get VERSION() {
        return '5.3.0';
      }
      static get DATA_KEY() {
        return `bs.${this.NAME}`;
      }
      static get EVENT_KEY() {
        return `.${this.DATA_KEY}`;
      }
      static eventName(e) {
        return `${e}${this.EVENT_KEY}`;
      }
    }
    const ge = (n) => {
        let e = n.getAttribute('data-bs-target');
        if (!e || '#' === e) {
          let i = n.getAttribute('href');
          if (!i || (!i.includes('#') && !i.startsWith('.'))) return null;
          i.includes('#') && !i.startsWith('#') && (i = `#${i.split('#')[1]}`), (e = i && '#' !== i ? i.trim() : null);
        }
        return Ct(e);
      },
      E = {
        find: (n, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, n)),
        findOne: (n, e = document.documentElement) => Element.prototype.querySelector.call(e, n),
        children: (n, e) => [].concat(...n.children).filter((i) => i.matches(e)),
        parents(n, e) {
          const i = [];
          let r = n.parentNode.closest(e);
          for (; r; ) i.push(r), (r = r.parentNode.closest(e));
          return i;
        },
        prev(n, e) {
          let i = n.previousElementSibling;
          for (; i; ) {
            if (i.matches(e)) return [i];
            i = i.previousElementSibling;
          }
          return [];
        },
        next(n, e) {
          let i = n.nextElementSibling;
          for (; i; ) {
            if (i.matches(e)) return [i];
            i = i.nextElementSibling;
          }
          return [];
        },
        focusableChildren(n) {
          const e = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]']
            .map((i) => `${i}:not([tabindex^="-"])`)
            .join(',');
          return this.find(e, n).filter((i) => !Oe(i) && Ee(i));
        },
        getSelectorFromElement(n) {
          const e = ge(n);
          return e && E.findOne(e) ? e : null;
        },
        getElementFromSelector(n) {
          const e = ge(n);
          return e ? E.findOne(e) : null;
        },
        getMultipleElementsFromSelector(n) {
          const e = ge(n);
          return e ? E.find(e) : [];
        },
      },
      Ke = (n, e = 'hide') => {
        const r = n.NAME;
        _.on(document, `click.dismiss${n.EVENT_KEY}`, `[data-bs-dismiss="${r}"]`, function (o) {
          if ((['A', 'AREA'].includes(this.tagName) && o.preventDefault(), Oe(this))) return;
          const a = E.getElementFromSelector(this) || this.closest(`.${r}`);
          n.getOrCreateInstance(a)[e]();
        });
      };
    class ct extends pe {
      static get NAME() {
        return 'alert';
      }
      close() {
        if (_.trigger(this._element, 'close.bs.alert').defaultPrevented) return;
        this._element.classList.remove('show');
        const e = this._element.classList.contains('fade');
        this._queueCallback(() => this._destroyElement(), this._element, e);
      }
      _destroyElement() {
        this._element.remove(), _.trigger(this._element, 'closed.bs.alert'), this.dispose();
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = ct.getOrCreateInstance(this);
          if ('string' == typeof e) {
            if (void 0 === i[e] || e.startsWith('_') || 'constructor' === e)
              throw new TypeError(`No method named "${e}"`);
            i[e](this);
          }
        });
      }
    }
    Ke(ct, 'close'), ce(ct);
    const In = '[data-bs-toggle="button"]';
    class Ge extends pe {
      static get NAME() {
        return 'button';
      }
      toggle() {
        this._element.setAttribute('aria-pressed', this._element.classList.toggle('active'));
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = Ge.getOrCreateInstance(this);
          'toggle' === e && i[e]();
        });
      }
    }
    _.on(document, 'click.bs.button.data-api', In, (n) => {
      n.preventDefault();
      const e = n.target.closest(In);
      Ge.getOrCreateInstance(e).toggle();
    }),
      ce(Ge);
    const Wt = { endCallback: null, leftCallback: null, rightCallback: null },
      Pe = { endCallback: '(function|null)', leftCallback: '(function|null)', rightCallback: '(function|null)' };
    class Bt extends At {
      constructor(e, i) {
        super(),
          (this._element = e),
          e &&
            Bt.isSupported() &&
            ((this._config = this._getConfig(i)),
            (this._deltaX = 0),
            (this._supportPointerEvents = Boolean(window.PointerEvent)),
            this._initEvents());
      }
      static get Default() {
        return Wt;
      }
      static get DefaultType() {
        return Pe;
      }
      static get NAME() {
        return 'swipe';
      }
      dispose() {
        _.off(this._element, '.bs.swipe');
      }
      _start(e) {
        this._supportPointerEvents
          ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
          : (this._deltaX = e.touches[0].clientX);
      }
      _end(e) {
        this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX),
          this._handleSwipe(),
          K(this._config.endCallback);
      }
      _move(e) {
        this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
      }
      _handleSwipe() {
        const e = Math.abs(this._deltaX);
        if (e <= 40) return;
        const i = e / this._deltaX;
        (this._deltaX = 0), i && K(i > 0 ? this._config.rightCallback : this._config.leftCallback);
      }
      _initEvents() {
        this._supportPointerEvents
          ? (_.on(this._element, 'pointerdown.bs.swipe', (e) => this._start(e)),
            _.on(this._element, 'pointerup.bs.swipe', (e) => this._end(e)),
            this._element.classList.add('pointer-event'))
          : (_.on(this._element, 'touchstart.bs.swipe', (e) => this._start(e)),
            _.on(this._element, 'touchmove.bs.swipe', (e) => this._move(e)),
            _.on(this._element, 'touchend.bs.swipe', (e) => this._end(e)));
      }
      _eventIsPointerPenTouch(e) {
        return this._supportPointerEvents && ('pen' === e.pointerType || 'touch' === e.pointerType);
      }
      static isSupported() {
        return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      }
    }
    const kt = 'next',
      ut = 'prev',
      ae = 'left',
      Re = 'right',
      Je = 'slid.bs.carousel',
      A = 'carousel',
      ee = 'active',
      li = { ArrowLeft: Re, ArrowRight: ae },
      ci = { interval: 5e3, keyboard: !0, pause: 'hover', ride: !1, touch: !0, wrap: !0 },
      Pn = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        pause: '(string|boolean)',
        ride: '(boolean|string)',
        touch: 'boolean',
        wrap: 'boolean',
      };
    class Ze extends pe {
      constructor(e, i) {
        super(e, i),
          (this._interval = null),
          (this._activeElement = null),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this._swipeHelper = null),
          (this._indicatorsElement = E.findOne('.carousel-indicators', this._element)),
          this._addEventListeners(),
          this._config.ride === A && this.cycle();
      }
      static get Default() {
        return ci;
      }
      static get DefaultType() {
        return Pn;
      }
      static get NAME() {
        return 'carousel';
      }
      next() {
        this._slide(kt);
      }
      nextWhenVisible() {
        !document.hidden && Ee(this._element) && this.next();
      }
      prev() {
        this._slide(ut);
      }
      pause() {
        this._isSliding && Ce(this._element), this._clearInterval();
      }
      cycle() {
        this._clearInterval(),
          this._updateInterval(),
          (this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval));
      }
      _maybeEnableCycle() {
        this._config.ride && (this._isSliding ? _.one(this._element, Je, () => this.cycle()) : this.cycle());
      }
      to(e) {
        const i = this._getItems();
        if (e > i.length - 1 || e < 0) return;
        if (this._isSliding) return void _.one(this._element, Je, () => this.to(e));
        const r = this._getItemIndex(this._getActive());
        r !== e && this._slide(e > r ? kt : ut, i[e]);
      }
      dispose() {
        this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
      }
      _configAfterMerge(e) {
        return (e.defaultInterval = e.interval), e;
      }
      _addEventListeners() {
        this._config.keyboard && _.on(this._element, 'keydown.bs.carousel', (e) => this._keydown(e)),
          'hover' === this._config.pause &&
            (_.on(this._element, 'mouseenter.bs.carousel', () => this.pause()),
            _.on(this._element, 'mouseleave.bs.carousel', () => this._maybeEnableCycle())),
          this._config.touch && Bt.isSupported() && this._addTouchEventListeners();
      }
      _addTouchEventListeners() {
        for (const i of E.find('.carousel-item img', this._element))
          _.on(i, 'dragstart.bs.carousel', (r) => r.preventDefault());
        this._swipeHelper = new Bt(this._element, {
          leftCallback: () => this._slide(this._directionToOrder(ae)),
          rightCallback: () => this._slide(this._directionToOrder(Re)),
          endCallback: () => {
            'hover' === this._config.pause &&
              (this.pause(),
              this.touchTimeout && clearTimeout(this.touchTimeout),
              (this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval)));
          },
        });
      }
      _keydown(e) {
        if (/input|textarea/i.test(e.target.tagName)) return;
        const i = li[e.key];
        i && (e.preventDefault(), this._slide(this._directionToOrder(i)));
      }
      _getItemIndex(e) {
        return this._getItems().indexOf(e);
      }
      _setActiveIndicatorElement(e) {
        if (!this._indicatorsElement) return;
        const i = E.findOne('.active', this._indicatorsElement);
        i.classList.remove(ee), i.removeAttribute('aria-current');
        const r = E.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
        r && (r.classList.add(ee), r.setAttribute('aria-current', 'true'));
      }
      _updateInterval() {
        const e = this._activeElement || this._getActive();
        if (!e) return;
        const i = Number.parseInt(e.getAttribute('data-bs-interval'), 10);
        this._config.interval = i || this._config.defaultInterval;
      }
      _slide(e, i = null) {
        if (this._isSliding) return;
        const r = this._getActive(),
          o = e === kt,
          a = i || sn(this._getItems(), r, o, this._config.wrap);
        if (a === r) return;
        const l = this._getItemIndex(a),
          u = (f) =>
            _.trigger(this._element, f, {
              relatedTarget: a,
              direction: this._orderToDirection(e),
              from: this._getItemIndex(r),
              to: l,
            });
        if (u('slide.bs.carousel').defaultPrevented || !r || !a) return;
        const h = Boolean(this._interval);
        this.pause(), (this._isSliding = !0), this._setActiveIndicatorElement(l), (this._activeElement = a);
        const p = o ? 'carousel-item-start' : 'carousel-item-end',
          m = o ? 'carousel-item-next' : 'carousel-item-prev';
        a.classList.add(m),
          r.classList.add(p),
          a.classList.add(p),
          this._queueCallback(
            () => {
              a.classList.remove(p, m),
                a.classList.add(ee),
                r.classList.remove(ee, m, p),
                (this._isSliding = !1),
                u(Je);
            },
            r,
            this._isAnimated(),
          ),
          h && this.cycle();
      }
      _isAnimated() {
        return this._element.classList.contains('slide');
      }
      _getActive() {
        return E.findOne('.active.carousel-item', this._element);
      }
      _getItems() {
        return E.find('.carousel-item', this._element);
      }
      _clearInterval() {
        this._interval && (clearInterval(this._interval), (this._interval = null));
      }
      _directionToOrder(e) {
        return fe() ? (e === ae ? ut : kt) : e === ae ? kt : ut;
      }
      _orderToDirection(e) {
        return fe() ? (e === ut ? ae : Re) : e === ut ? Re : ae;
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = Ze.getOrCreateInstance(this, e);
          if ('number' != typeof e) {
            if ('string' == typeof e) {
              if (void 0 === i[e] || e.startsWith('_') || 'constructor' === e)
                throw new TypeError(`No method named "${e}"`);
              i[e]();
            }
          } else i.to(e);
        });
      }
    }
    _.on(document, 'click.bs.carousel.data-api', '[data-bs-slide], [data-bs-slide-to]', function (n) {
      const e = E.getElementFromSelector(this);
      if (!e || !e.classList.contains(A)) return;
      n.preventDefault();
      const i = Ze.getOrCreateInstance(e),
        r = this.getAttribute('data-bs-slide-to');
      return r
        ? (i.to(r), void i._maybeEnableCycle())
        : 'next' === Ie.getDataAttribute(this, 'slide')
        ? (i.next(), void i._maybeEnableCycle())
        : (i.prev(), void i._maybeEnableCycle());
    }),
      _.on(window, 'load.bs.carousel.data-api', () => {
        const n = E.find('[data-bs-ride="carousel"]');
        for (const e of n) Ze.getOrCreateInstance(e);
      }),
      ce(Ze);
    const et = 'show',
      me = 'collapse',
      ke = 'collapsing',
      We = '[data-bs-toggle="collapse"]',
      ui = { parent: null, toggle: !0 },
      zt = { parent: '(null|element)', toggle: 'boolean' };
    class tt extends pe {
      constructor(e, i) {
        super(e, i), (this._isTransitioning = !1), (this._triggerArray = []);
        const r = E.find(We);
        for (const o of r) {
          const a = E.getSelectorFromElement(o),
            l = E.find(a).filter((u) => u === this._element);
          null !== a && l.length && this._triggerArray.push(o);
        }
        this._initializeChildren(),
          this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
          this._config.toggle && this.toggle();
      }
      static get Default() {
        return ui;
      }
      static get DefaultType() {
        return zt;
      }
      static get NAME() {
        return 'collapse';
      }
      toggle() {
        this._isShown() ? this.hide() : this.show();
      }
      show() {
        if (this._isTransitioning || this._isShown()) return;
        let e = [];
        if (
          (this._config.parent &&
            (e = this._getFirstLevelChildren('.collapse.show, .collapse.collapsing')
              .filter((o) => o !== this._element)
              .map((o) => tt.getOrCreateInstance(o, { toggle: !1 }))),
          (e.length && e[0]._isTransitioning) || _.trigger(this._element, 'show.bs.collapse').defaultPrevented)
        )
          return;
        for (const o of e) o.hide();
        const i = this._getDimension();
        this._element.classList.remove(me),
          this._element.classList.add(ke),
          (this._element.style[i] = 0),
          this._addAriaAndCollapsedClass(this._triggerArray, !0),
          (this._isTransitioning = !0);
        const r = `scroll${i[0].toUpperCase() + i.slice(1)}`;
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(ke),
              this._element.classList.add(me, et),
              (this._element.style[i] = ''),
              _.trigger(this._element, 'shown.bs.collapse');
          },
          this._element,
          !0,
        ),
          (this._element.style[i] = `${this._element[r]}px`);
      }
      hide() {
        if (this._isTransitioning || !this._isShown() || _.trigger(this._element, 'hide.bs.collapse').defaultPrevented)
          return;
        const e = this._getDimension();
        (this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`),
          this._element.classList.add(ke),
          this._element.classList.remove(me, et);
        for (const i of this._triggerArray) {
          const r = E.getElementFromSelector(i);
          r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
        }
        (this._isTransitioning = !0),
          (this._element.style[e] = ''),
          this._queueCallback(
            () => {
              (this._isTransitioning = !1),
                this._element.classList.remove(ke),
                this._element.classList.add(me),
                _.trigger(this._element, 'hidden.bs.collapse');
            },
            this._element,
            !0,
          );
      }
      _isShown(e = this._element) {
        return e.classList.contains(et);
      }
      _configAfterMerge(e) {
        return (e.toggle = Boolean(e.toggle)), (e.parent = je(e.parent)), e;
      }
      _getDimension() {
        return this._element.classList.contains('collapse-horizontal') ? 'width' : 'height';
      }
      _initializeChildren() {
        if (!this._config.parent) return;
        const e = this._getFirstLevelChildren(We);
        for (const i of e) {
          const r = E.getElementFromSelector(i);
          r && this._addAriaAndCollapsedClass([i], this._isShown(r));
        }
      }
      _getFirstLevelChildren(e) {
        const i = E.find(':scope .collapse .collapse', this._config.parent);
        return E.find(e, this._config.parent).filter((r) => !i.includes(r));
      }
      _addAriaAndCollapsedClass(e, i) {
        if (e.length) for (const r of e) r.classList.toggle('collapsed', !i), r.setAttribute('aria-expanded', i);
      }
      static jQueryInterface(e) {
        const i = {};
        return (
          'string' == typeof e && /show|hide/.test(e) && (i.toggle = !1),
          this.each(function () {
            const r = tt.getOrCreateInstance(this, i);
            if ('string' == typeof e) {
              if (void 0 === r[e]) throw new TypeError(`No method named "${e}"`);
              r[e]();
            }
          })
        );
      }
    }
    _.on(document, 'click.bs.collapse.data-api', We, function (n) {
      ('A' === n.target.tagName || (n.delegateTarget && 'A' === n.delegateTarget.tagName)) && n.preventDefault();
      for (const e of E.getMultipleElementsFromSelector(this)) tt.getOrCreateInstance(e, { toggle: !1 }).toggle();
    }),
      ce(tt);
    const hn = 'dropdown',
      ht = 'ArrowUp',
      Be = 'ArrowDown',
      St = 'click.bs.dropdown.data-api',
      dt = 'keydown.bs.dropdown.data-api',
      ft = 'show',
      ze = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
      ve = `${ze}.show`,
      te = '.dropdown-menu',
      dn = fe() ? 'top-end' : 'top-start',
      hi = fe() ? 'top-start' : 'top-end',
      Mn = fe() ? 'bottom-end' : 'bottom-start',
      Hn = fe() ? 'bottom-start' : 'bottom-end',
      pt = fe() ? 'left-start' : 'right-start',
      gt = fe() ? 'right-start' : 'left-start',
      fn = {
        autoClose: !0,
        boundary: 'clippingParents',
        display: 'dynamic',
        offset: [0, 2],
        popperConfig: null,
        reference: 'toggle',
      },
      Xt = {
        autoClose: '(boolean|string)',
        boundary: '(string|element)',
        display: 'string',
        offset: '(array|string|function)',
        popperConfig: '(null|object|function)',
        reference: '(string|element|object)',
      };
    class _e extends pe {
      constructor(e, i) {
        super(e, i),
          (this._popper = null),
          (this._parent = this._element.parentNode),
          (this._menu = E.next(this._element, te)[0] || E.prev(this._element, te)[0] || E.findOne(te, this._parent)),
          (this._inNavbar = this._detectNavbar());
      }
      static get Default() {
        return fn;
      }
      static get DefaultType() {
        return Xt;
      }
      static get NAME() {
        return hn;
      }
      toggle() {
        return this._isShown() ? this.hide() : this.show();
      }
      show() {
        if (Oe(this._element) || this._isShown()) return;
        const e = { relatedTarget: this._element };
        if (!_.trigger(this._element, 'show.bs.dropdown', e).defaultPrevented) {
          if (
            (this._createPopper(), 'ontouchstart' in document.documentElement && !this._parent.closest('.navbar-nav'))
          )
            for (const i of [].concat(...document.body.children)) _.on(i, 'mouseover', P);
          this._element.focus(),
            this._element.setAttribute('aria-expanded', !0),
            this._menu.classList.add(ft),
            this._element.classList.add(ft),
            _.trigger(this._element, 'shown.bs.dropdown', e);
        }
      }
      hide() {
        !Oe(this._element) && this._isShown() && this._completeHide({ relatedTarget: this._element });
      }
      dispose() {
        this._popper && this._popper.destroy(), super.dispose();
      }
      update() {
        (this._inNavbar = this._detectNavbar()), this._popper && this._popper.update();
      }
      _completeHide(e) {
        if (!_.trigger(this._element, 'hide.bs.dropdown', e).defaultPrevented) {
          if ('ontouchstart' in document.documentElement)
            for (const i of [].concat(...document.body.children)) _.off(i, 'mouseover', P);
          this._popper && this._popper.destroy(),
            this._menu.classList.remove(ft),
            this._element.classList.remove(ft),
            this._element.setAttribute('aria-expanded', 'false'),
            Ie.removeDataAttribute(this._menu, 'popper'),
            _.trigger(this._element, 'hidden.bs.dropdown', e);
        }
      }
      _getConfig(e) {
        if (
          'object' == typeof (e = super._getConfig(e)).reference &&
          !de(e.reference) &&
          'function' != typeof e.reference.getBoundingClientRect
        )
          throw new TypeError(
            `${hn.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`,
          );
        return e;
      }
      _createPopper() {
        if (void 0 === Q) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
        let e = this._element;
        'parent' === this._config.reference
          ? (e = this._parent)
          : de(this._config.reference)
          ? (e = je(this._config.reference))
          : 'object' == typeof this._config.reference && (e = this._config.reference);
        const i = this._getPopperConfig();
        this._popper = Q.createPopper(e, this._menu, i);
      }
      _isShown() {
        return this._menu.classList.contains(ft);
      }
      _getPlacement() {
        const e = this._parent;
        if (e.classList.contains('dropend')) return pt;
        if (e.classList.contains('dropstart')) return gt;
        if (e.classList.contains('dropup-center')) return 'top';
        if (e.classList.contains('dropdown-center')) return 'bottom';
        const i = 'end' === getComputedStyle(this._menu).getPropertyValue('--bs-position').trim();
        return e.classList.contains('dropup') ? (i ? hi : dn) : i ? Hn : Mn;
      }
      _detectNavbar() {
        return null !== this._element.closest('.navbar');
      }
      _getOffset() {
        const { offset: e } = this._config;
        return 'string' == typeof e
          ? e.split(',').map((i) => Number.parseInt(i, 10))
          : 'function' == typeof e
          ? (i) => e(i, this._element)
          : e;
      }
      _getPopperConfig() {
        const e = {
          placement: this._getPlacement(),
          modifiers: [
            { name: 'preventOverflow', options: { boundary: this._config.boundary } },
            { name: 'offset', options: { offset: this._getOffset() } },
          ],
        };
        return (
          (this._inNavbar || 'static' === this._config.display) &&
            (Ie.setDataAttribute(this._menu, 'popper', 'static'),
            (e.modifiers = [{ name: 'applyStyles', enabled: !1 }])),
          { ...e, ...K(this._config.popperConfig, [e]) }
        );
      }
      _selectMenuItem({ key: e, target: i }) {
        const r = E.find('.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)', this._menu).filter((o) =>
          Ee(o),
        );
        r.length && sn(r, i, e === Be, !r.includes(i)).focus();
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = _e.getOrCreateInstance(this, e);
          if ('string' == typeof e) {
            if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
            i[e]();
          }
        });
      }
      static clearMenus(e) {
        if (2 === e.button || ('keyup' === e.type && 'Tab' !== e.key)) return;
        const i = E.find(ve);
        for (const r of i) {
          const o = _e.getInstance(r);
          if (!o || !1 === o._config.autoClose) continue;
          const a = e.composedPath(),
            l = a.includes(o._menu);
          if (
            a.includes(o._element) ||
            ('inside' === o._config.autoClose && !l) ||
            ('outside' === o._config.autoClose && l) ||
            (o._menu.contains(e.target) &&
              (('keyup' === e.type && 'Tab' === e.key) || /input|select|option|textarea|form/i.test(e.target.tagName)))
          )
            continue;
          const u = { relatedTarget: o._element };
          'click' === e.type && (u.clickEvent = e), o._completeHide(u);
        }
      }
      static dataApiKeydownHandler(e) {
        const i = /input|textarea/i.test(e.target.tagName),
          r = 'Escape' === e.key,
          o = [ht, Be].includes(e.key);
        if ((!o && !r) || (i && !r)) return;
        e.preventDefault();
        const a = this.matches(ze)
            ? this
            : E.prev(this, ze)[0] || E.next(this, ze)[0] || E.findOne(ze, e.delegateTarget.parentNode),
          l = _e.getOrCreateInstance(a);
        if (o) return e.stopPropagation(), l.show(), void l._selectMenuItem(e);
        l._isShown() && (e.stopPropagation(), l.hide(), a.focus());
      }
    }
    _.on(document, dt, ze, _e.dataApiKeydownHandler),
      _.on(document, dt, te, _e.dataApiKeydownHandler),
      _.on(document, St, _e.clearMenus),
      _.on(document, 'keyup.bs.dropdown.data-api', _e.clearMenus),
      _.on(document, St, ze, function (n) {
        n.preventDefault(), _e.getOrCreateInstance(this).toggle();
      }),
      ce(_e);
    const Fn = 'mousedown.bs.backdrop',
      $n = { className: 'modal-backdrop', clickCallback: null, isAnimated: !1, isVisible: !0, rootElement: 'body' },
      di = {
        className: 'string',
        clickCallback: '(function|null)',
        isAnimated: 'boolean',
        isVisible: 'boolean',
        rootElement: '(element|string)',
      };
    class Rn extends At {
      constructor(e) {
        super(), (this._config = this._getConfig(e)), (this._isAppended = !1), (this._element = null);
      }
      static get Default() {
        return $n;
      }
      static get DefaultType() {
        return di;
      }
      static get NAME() {
        return 'backdrop';
      }
      show(e) {
        if (!this._config.isVisible) return void K(e);
        this._append();
        this._getElement().classList.add('show'),
          this._emulateAnimation(() => {
            K(e);
          });
      }
      hide(e) {
        this._config.isVisible
          ? (this._getElement().classList.remove('show'),
            this._emulateAnimation(() => {
              this.dispose(), K(e);
            }))
          : K(e);
      }
      dispose() {
        this._isAppended && (_.off(this._element, Fn), this._element.remove(), (this._isAppended = !1));
      }
      _getElement() {
        if (!this._element) {
          const e = document.createElement('div');
          (e.className = this._config.className),
            this._config.isAnimated && e.classList.add('fade'),
            (this._element = e);
        }
        return this._element;
      }
      _configAfterMerge(e) {
        return (e.rootElement = je(e.rootElement)), e;
      }
      _append() {
        if (this._isAppended) return;
        const e = this._getElement();
        this._config.rootElement.append(e),
          _.on(e, Fn, () => {
            K(this._config.clickCallback);
          }),
          (this._isAppended = !0);
      }
      _emulateAnimation(e) {
        rn(e, this._getElement(), this._config.isAnimated);
      }
    }
    const pn = '.bs.focustrap',
      nt = 'backward',
      Wn = { autofocus: !0, trapElement: null },
      gn = { autofocus: 'boolean', trapElement: 'element' };
    class Ut extends At {
      constructor(e) {
        super(), (this._config = this._getConfig(e)), (this._isActive = !1), (this._lastTabNavDirection = null);
      }
      static get Default() {
        return Wn;
      }
      static get DefaultType() {
        return gn;
      }
      static get NAME() {
        return 'focustrap';
      }
      activate() {
        this._isActive ||
          (this._config.autofocus && this._config.trapElement.focus(),
          _.off(document, pn),
          _.on(document, 'focusin.bs.focustrap', (e) => this._handleFocusin(e)),
          _.on(document, 'keydown.tab.bs.focustrap', (e) => this._handleKeydown(e)),
          (this._isActive = !0));
      }
      deactivate() {
        this._isActive && ((this._isActive = !1), _.off(document, pn));
      }
      _handleFocusin(e) {
        const { trapElement: i } = this._config;
        if (e.target === document || e.target === i || i.contains(e.target)) return;
        const r = E.focusableChildren(i);
        0 === r.length ? i.focus() : this._lastTabNavDirection === nt ? r[r.length - 1].focus() : r[0].focus();
      }
      _handleKeydown(e) {
        'Tab' === e.key && (this._lastTabNavDirection = e.shiftKey ? nt : 'forward');
      }
    }
    const Dt = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      mn = '.sticky-top',
      Vt = 'padding-right',
      mt = 'margin-right';
    class Qt {
      constructor() {
        this._element = document.body;
      }
      getWidth() {
        const e = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - e);
      }
      hide() {
        const e = this.getWidth();
        this._disableOverFlow(),
          this._setElementAttributes(this._element, Vt, (i) => i + e),
          this._setElementAttributes(Dt, Vt, (i) => i + e),
          this._setElementAttributes(mn, mt, (i) => i - e);
      }
      reset() {
        this._resetElementAttributes(this._element, 'overflow'),
          this._resetElementAttributes(this._element, Vt),
          this._resetElementAttributes(Dt, Vt),
          this._resetElementAttributes(mn, mt);
      }
      isOverflowing() {
        return this.getWidth() > 0;
      }
      _disableOverFlow() {
        this._saveInitialAttribute(this._element, 'overflow'), (this._element.style.overflow = 'hidden');
      }
      _setElementAttributes(e, i, r) {
        const o = this.getWidth();
        this._applyManipulationCallback(e, (a) => {
          if (a !== this._element && window.innerWidth > a.clientWidth + o) return;
          this._saveInitialAttribute(a, i);
          const l = window.getComputedStyle(a).getPropertyValue(i);
          a.style.setProperty(i, `${r(Number.parseFloat(l))}px`);
        });
      }
      _saveInitialAttribute(e, i) {
        const r = e.style.getPropertyValue(i);
        r && Ie.setDataAttribute(e, i, r);
      }
      _resetElementAttributes(e, i) {
        this._applyManipulationCallback(e, (r) => {
          const o = Ie.getDataAttribute(r, i);
          null !== o ? (Ie.removeDataAttribute(r, i), r.style.setProperty(i, o)) : r.style.removeProperty(i);
        });
      }
      _applyManipulationCallback(e, i) {
        if (de(e)) i(e);
        else for (const r of E.find(e, this._element)) i(r);
      }
    }
    const vn = '.bs.modal',
      yn = 'hidden.bs.modal',
      bn = 'show.bs.modal',
      Yt = 'modal-open',
      _n = 'modal-static',
      zn = { backdrop: !0, focus: !0, keyboard: !0 },
      Xn = { backdrop: '(boolean|string)', focus: 'boolean', keyboard: 'boolean' };
    class Me extends pe {
      constructor(e, i) {
        super(e, i),
          (this._dialog = E.findOne('.modal-dialog', this._element)),
          (this._backdrop = this._initializeBackDrop()),
          (this._focustrap = this._initializeFocusTrap()),
          (this._isShown = !1),
          (this._isTransitioning = !1),
          (this._scrollBar = new Qt()),
          this._addEventListeners();
      }
      static get Default() {
        return zn;
      }
      static get DefaultType() {
        return Xn;
      }
      static get NAME() {
        return 'modal';
      }
      toggle(e) {
        return this._isShown ? this.hide() : this.show(e);
      }
      show(e) {
        this._isShown ||
          this._isTransitioning ||
          _.trigger(this._element, bn, { relatedTarget: e }).defaultPrevented ||
          ((this._isShown = !0),
          (this._isTransitioning = !0),
          this._scrollBar.hide(),
          document.body.classList.add(Yt),
          this._adjustDialog(),
          this._backdrop.show(() => this._showElement(e)));
      }
      hide() {
        this._isShown &&
          !this._isTransitioning &&
          (_.trigger(this._element, 'hide.bs.modal').defaultPrevented ||
            ((this._isShown = !1),
            (this._isTransitioning = !0),
            this._focustrap.deactivate(),
            this._element.classList.remove('show'),
            this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())));
      }
      dispose() {
        _.off(window, vn),
          _.off(this._dialog, vn),
          this._backdrop.dispose(),
          this._focustrap.deactivate(),
          super.dispose();
      }
      handleUpdate() {
        this._adjustDialog();
      }
      _initializeBackDrop() {
        return new Rn({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
      }
      _initializeFocusTrap() {
        return new Ut({ trapElement: this._element });
      }
      _showElement(e) {
        document.body.contains(this._element) || document.body.append(this._element),
          (this._element.style.display = 'block'),
          this._element.removeAttribute('aria-hidden'),
          this._element.setAttribute('aria-modal', !0),
          this._element.setAttribute('role', 'dialog'),
          (this._element.scrollTop = 0);
        const i = E.findOne('.modal-body', this._dialog);
        i && (i.scrollTop = 0),
          this._element.classList.add('show'),
          this._queueCallback(
            () => {
              this._config.focus && this._focustrap.activate(),
                (this._isTransitioning = !1),
                _.trigger(this._element, 'shown.bs.modal', { relatedTarget: e });
            },
            this._dialog,
            this._isAnimated(),
          );
      }
      _addEventListeners() {
        _.on(this._element, 'keydown.dismiss.bs.modal', (e) => {
          'Escape' === e.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
        }),
          _.on(window, 'resize.bs.modal', () => {
            this._isShown && !this._isTransitioning && this._adjustDialog();
          }),
          _.on(this._element, 'mousedown.dismiss.bs.modal', (e) => {
            _.one(this._element, 'click.dismiss.bs.modal', (i) => {
              this._element === e.target &&
                this._element === i.target &&
                ('static' !== this._config.backdrop
                  ? this._config.backdrop && this.hide()
                  : this._triggerBackdropTransition());
            });
          });
      }
      _hideModal() {
        (this._element.style.display = 'none'),
          this._element.setAttribute('aria-hidden', !0),
          this._element.removeAttribute('aria-modal'),
          this._element.removeAttribute('role'),
          (this._isTransitioning = !1),
          this._backdrop.hide(() => {
            document.body.classList.remove(Yt),
              this._resetAdjustments(),
              this._scrollBar.reset(),
              _.trigger(this._element, yn);
          });
      }
      _isAnimated() {
        return this._element.classList.contains('fade');
      }
      _triggerBackdropTransition() {
        if (_.trigger(this._element, 'hidePrevented.bs.modal').defaultPrevented) return;
        const e = this._element.scrollHeight > document.documentElement.clientHeight,
          i = this._element.style.overflowY;
        'hidden' === i ||
          this._element.classList.contains(_n) ||
          (e || (this._element.style.overflowY = 'hidden'),
          this._element.classList.add(_n),
          this._queueCallback(() => {
            this._element.classList.remove(_n),
              this._queueCallback(() => {
                this._element.style.overflowY = i;
              }, this._dialog);
          }, this._dialog),
          this._element.focus());
      }
      _adjustDialog() {
        const e = this._element.scrollHeight > document.documentElement.clientHeight,
          i = this._scrollBar.getWidth(),
          r = i > 0;
        if (r && !e) {
          const o = fe() ? 'paddingLeft' : 'paddingRight';
          this._element.style[o] = `${i}px`;
        }
        if (!r && e) {
          const o = fe() ? 'paddingRight' : 'paddingLeft';
          this._element.style[o] = `${i}px`;
        }
      }
      _resetAdjustments() {
        (this._element.style.paddingLeft = ''), (this._element.style.paddingRight = '');
      }
      static jQueryInterface(e, i) {
        return this.each(function () {
          const r = Me.getOrCreateInstance(this, e);
          if ('string' == typeof e) {
            if (void 0 === r[e]) throw new TypeError(`No method named "${e}"`);
            r[e](i);
          }
        });
      }
    }
    _.on(document, 'click.bs.modal.data-api', '[data-bs-toggle="modal"]', function (n) {
      const e = E.getElementFromSelector(this);
      ['A', 'AREA'].includes(this.tagName) && n.preventDefault(),
        _.one(e, bn, (r) => {
          r.defaultPrevented ||
            _.one(e, yn, () => {
              Ee(this) && this.focus();
            });
        });
      const i = E.findOne('.modal.show');
      i && Me.getInstance(i).hide(), Me.getOrCreateInstance(e).toggle(this);
    }),
      Ke(Me),
      ce(Me);
    const ye = 'showing',
      Lt = '.offcanvas.show',
      rt = 'hidePrevented.bs.offcanvas',
      xn = 'hidden.bs.offcanvas',
      fi = { backdrop: !0, keyboard: !0, scroll: !1 },
      pi = { backdrop: '(boolean|string)', keyboard: 'boolean', scroll: 'boolean' };
    class we extends pe {
      constructor(e, i) {
        super(e, i),
          (this._isShown = !1),
          (this._backdrop = this._initializeBackDrop()),
          (this._focustrap = this._initializeFocusTrap()),
          this._addEventListeners();
      }
      static get Default() {
        return fi;
      }
      static get DefaultType() {
        return pi;
      }
      static get NAME() {
        return 'offcanvas';
      }
      toggle(e) {
        return this._isShown ? this.hide() : this.show(e);
      }
      show(e) {
        this._isShown ||
          _.trigger(this._element, 'show.bs.offcanvas', { relatedTarget: e }).defaultPrevented ||
          ((this._isShown = !0),
          this._backdrop.show(),
          this._config.scroll || new Qt().hide(),
          this._element.setAttribute('aria-modal', !0),
          this._element.setAttribute('role', 'dialog'),
          this._element.classList.add(ye),
          this._queueCallback(
            () => {
              (this._config.scroll && !this._config.backdrop) || this._focustrap.activate(),
                this._element.classList.add('show'),
                this._element.classList.remove(ye),
                _.trigger(this._element, 'shown.bs.offcanvas', { relatedTarget: e });
            },
            this._element,
            !0,
          ));
      }
      hide() {
        this._isShown &&
          (_.trigger(this._element, 'hide.bs.offcanvas').defaultPrevented ||
            (this._focustrap.deactivate(),
            this._element.blur(),
            (this._isShown = !1),
            this._element.classList.add('hiding'),
            this._backdrop.hide(),
            this._queueCallback(
              () => {
                this._element.classList.remove('show', 'hiding'),
                  this._element.removeAttribute('aria-modal'),
                  this._element.removeAttribute('role'),
                  this._config.scroll || new Qt().reset(),
                  _.trigger(this._element, xn);
              },
              this._element,
              !0,
            )));
      }
      dispose() {
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
      }
      _initializeBackDrop() {
        const e = Boolean(this._config.backdrop);
        return new Rn({
          className: 'offcanvas-backdrop',
          isVisible: e,
          isAnimated: !0,
          rootElement: this._element.parentNode,
          clickCallback: e
            ? () => {
                'static' !== this._config.backdrop ? this.hide() : _.trigger(this._element, rt);
              }
            : null,
        });
      }
      _initializeFocusTrap() {
        return new Ut({ trapElement: this._element });
      }
      _addEventListeners() {
        _.on(this._element, 'keydown.dismiss.bs.offcanvas', (e) => {
          'Escape' === e.key && (this._config.keyboard ? this.hide() : _.trigger(this._element, rt));
        });
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = we.getOrCreateInstance(this, e);
          if ('string' == typeof e) {
            if (void 0 === i[e] || e.startsWith('_') || 'constructor' === e)
              throw new TypeError(`No method named "${e}"`);
            i[e](this);
          }
        });
      }
    }
    _.on(document, 'click.bs.offcanvas.data-api', '[data-bs-toggle="offcanvas"]', function (n) {
      const e = E.getElementFromSelector(this);
      if ((['A', 'AREA'].includes(this.tagName) && n.preventDefault(), Oe(this))) return;
      _.one(e, xn, () => {
        Ee(this) && this.focus();
      });
      const i = E.findOne(Lt);
      i && i !== e && we.getInstance(i).hide(), we.getOrCreateInstance(e).toggle(this);
    }),
      _.on(window, 'load.bs.offcanvas.data-api', () => {
        for (const n of E.find(Lt)) we.getOrCreateInstance(n).show();
      }),
      _.on(window, 'resize.bs.offcanvas', () => {
        for (const n of E.find('[aria-modal][class*=show][class*=offcanvas-]'))
          'fixed' !== getComputedStyle(n).position && we.getOrCreateInstance(n).hide();
      }),
      Ke(we),
      ce(we);
    const Tn = {
        '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
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
        img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
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
        ul: [],
      },
      Kt = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']),
      Un = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
      xe = (n, e) => {
        const i = n.nodeName.toLowerCase();
        return e.includes(i)
          ? !Kt.has(i) || Boolean(Un.test(n.nodeValue))
          : e.filter((r) => r instanceof RegExp).some((r) => r.test(i));
      },
      Vn = {
        allowList: Tn,
        content: {},
        extraClass: '',
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: '<div></div>',
      },
      Nt = {
        allowList: 'object',
        content: 'object',
        extraClass: '(string|function)',
        html: 'boolean',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        template: 'string',
      },
      gi = { entry: '(string|element|function|null)', selector: '(string|element)' };
    class mi extends At {
      constructor(e) {
        super(), (this._config = this._getConfig(e));
      }
      static get Default() {
        return Vn;
      }
      static get DefaultType() {
        return Nt;
      }
      static get NAME() {
        return 'TemplateFactory';
      }
      getContent() {
        return Object.values(this._config.content)
          .map((e) => this._resolvePossibleFunction(e))
          .filter(Boolean);
      }
      hasContent() {
        return this.getContent().length > 0;
      }
      changeContent(e) {
        return this._checkContent(e), (this._config.content = { ...this._config.content, ...e }), this;
      }
      toHtml() {
        const e = document.createElement('div');
        e.innerHTML = this._maybeSanitize(this._config.template);
        for (const [o, a] of Object.entries(this._config.content)) this._setContent(e, a, o);
        const i = e.children[0],
          r = this._resolvePossibleFunction(this._config.extraClass);
        return r && i.classList.add(...r.split(' ')), i;
      }
      _typeCheckConfig(e) {
        super._typeCheckConfig(e), this._checkContent(e.content);
      }
      _checkContent(e) {
        for (const [i, r] of Object.entries(e)) super._typeCheckConfig({ selector: i, entry: r }, gi);
      }
      _setContent(e, i, r) {
        const o = E.findOne(r, e);
        o &&
          ((i = this._resolvePossibleFunction(i))
            ? de(i)
              ? this._putElementInTemplate(je(i), o)
              : this._config.html
              ? (o.innerHTML = this._maybeSanitize(i))
              : (o.textContent = i)
            : o.remove());
      }
      _maybeSanitize(e) {
        return this._config.sanitize
          ? (function (i, r, o) {
              if (!i.length) return i;
              if (o && 'function' == typeof o) return o(i);
              const a = new window.DOMParser().parseFromString(i, 'text/html'),
                l = [].concat(...a.body.querySelectorAll('*'));
              for (const u of l) {
                const h = u.nodeName.toLowerCase();
                if (!Object.keys(r).includes(h)) {
                  u.remove();
                  continue;
                }
                const p = [].concat(...u.attributes),
                  m = [].concat(r['*'] || [], r[h] || []);
                for (const f of p) xe(f, m) || u.removeAttribute(f.nodeName);
              }
              return a.body.innerHTML;
            })(e, this._config.allowList, this._config.sanitizeFn)
          : e;
      }
      _resolvePossibleFunction(e) {
        return K(e, [this]);
      }
      _putElementInTemplate(e, i) {
        if (this._config.html) return (i.innerHTML = ''), void i.append(e);
        i.textContent = e.textContent;
      }
    }
    const st = new Set(['sanitize', 'allowList', 'sanitizeFn']),
      He = 'fade',
      vt = 'show',
      yt = 'hide.bs.modal',
      jt = 'hover',
      Yn = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: fe() ? 'left' : 'right',
        BOTTOM: 'bottom',
        LEFT: fe() ? 'right' : 'left',
      },
      Kn = {
        allowList: Tn,
        animation: !0,
        boundary: 'clippingParents',
        container: !1,
        customClass: '',
        delay: 0,
        fallbackPlacements: ['top', 'right', 'bottom', 'left'],
        html: !1,
        offset: [0, 6],
        placement: 'top',
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: '',
        trigger: 'hover focus',
      },
      vi = {
        allowList: 'object',
        animation: 'boolean',
        boundary: '(string|element)',
        container: '(string|element|boolean)',
        customClass: '(string|function)',
        delay: '(number|object)',
        fallbackPlacements: 'array',
        html: 'boolean',
        offset: '(array|string|function)',
        placement: '(string|function)',
        popperConfig: '(null|object|function)',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        selector: '(string|boolean)',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
      };
    class Xe extends pe {
      constructor(e, i) {
        if (void 0 === Q) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
        super(e, i),
          (this._isEnabled = !0),
          (this._timeout = 0),
          (this._isHovered = null),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this._templateFactory = null),
          (this._newContent = null),
          (this.tip = null),
          this._setListeners(),
          this._config.selector || this._fixTitle();
      }
      static get Default() {
        return Kn;
      }
      static get DefaultType() {
        return vi;
      }
      static get NAME() {
        return 'tooltip';
      }
      enable() {
        this._isEnabled = !0;
      }
      disable() {
        this._isEnabled = !1;
      }
      toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
      toggle() {
        this._isEnabled &&
          ((this._activeTrigger.click = !this._activeTrigger.click), this._isShown() ? this._leave() : this._enter());
      }
      dispose() {
        clearTimeout(this._timeout),
          _.off(this._element.closest('.modal'), yt, this._hideModalHandler),
          this._element.getAttribute('data-bs-original-title') &&
            this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title')),
          this._disposePopper(),
          super.dispose();
      }
      show() {
        if ('none' === this._element.style.display) throw new Error('Please use show on visible elements');
        if (!this._isWithContent() || !this._isEnabled) return;
        const e = _.trigger(this._element, this.constructor.eventName('show')),
          i = (Sn(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
        if (e.defaultPrevented || !i) return;
        this._disposePopper();
        const r = this._getTipElement();
        this._element.setAttribute('aria-describedby', r.getAttribute('id'));
        const { container: o } = this._config;
        if (
          (this._element.ownerDocument.documentElement.contains(this.tip) ||
            (o.append(r), _.trigger(this._element, this.constructor.eventName('inserted'))),
          (this._popper = this._createPopper(r)),
          r.classList.add(vt),
          'ontouchstart' in document.documentElement)
        )
          for (const a of [].concat(...document.body.children)) _.on(a, 'mouseover', P);
        this._queueCallback(
          () => {
            _.trigger(this._element, this.constructor.eventName('shown')),
              !1 === this._isHovered && this._leave(),
              (this._isHovered = !1);
          },
          this.tip,
          this._isAnimated(),
        );
      }
      hide() {
        if (this._isShown() && !_.trigger(this._element, this.constructor.eventName('hide')).defaultPrevented) {
          if ((this._getTipElement().classList.remove(vt), 'ontouchstart' in document.documentElement))
            for (const e of [].concat(...document.body.children)) _.off(e, 'mouseover', P);
          (this._activeTrigger.click = !1),
            (this._activeTrigger.focus = !1),
            (this._activeTrigger.hover = !1),
            (this._isHovered = null),
            this._queueCallback(
              () => {
                this._isWithActiveTrigger() ||
                  (this._isHovered || this._disposePopper(),
                  this._element.removeAttribute('aria-describedby'),
                  _.trigger(this._element, this.constructor.eventName('hidden')));
              },
              this.tip,
              this._isAnimated(),
            );
        }
      }
      update() {
        this._popper && this._popper.update();
      }
      _isWithContent() {
        return Boolean(this._getTitle());
      }
      _getTipElement() {
        return (
          this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
        );
      }
      _createTipElement(e) {
        const i = this._getTemplateFactory(e).toHtml();
        if (!i) return null;
        i.classList.remove(He, vt), i.classList.add(`bs-${this.constructor.NAME}-auto`);
        const r = ((o) => {
          do {
            o += Math.floor(1e6 * Math.random());
          } while (document.getElementById(o));
          return o;
        })(this.constructor.NAME).toString();
        return i.setAttribute('id', r), this._isAnimated() && i.classList.add(He), i;
      }
      setContent(e) {
        (this._newContent = e), this._isShown() && (this._disposePopper(), this.show());
      }
      _getTemplateFactory(e) {
        return (
          this._templateFactory
            ? this._templateFactory.changeContent(e)
            : (this._templateFactory = new mi({
                ...this._config,
                content: e,
                extraClass: this._resolvePossibleFunction(this._config.customClass),
              })),
          this._templateFactory
        );
      }
      _getContentForTemplate() {
        return { '.tooltip-inner': this._getTitle() };
      }
      _getTitle() {
        return (
          this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title')
        );
      }
      _initializeOnDelegatedTarget(e) {
        return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
      }
      _isAnimated() {
        return this._config.animation || (this.tip && this.tip.classList.contains(He));
      }
      _isShown() {
        return this.tip && this.tip.classList.contains(vt);
      }
      _createPopper(e) {
        const i = K(this._config.placement, [this, e, this._element]),
          r = Yn[i.toUpperCase()];
        return Q.createPopper(this._element, e, this._getPopperConfig(r));
      }
      _getOffset() {
        const { offset: e } = this._config;
        return 'string' == typeof e
          ? e.split(',').map((i) => Number.parseInt(i, 10))
          : 'function' == typeof e
          ? (i) => e(i, this._element)
          : e;
      }
      _resolvePossibleFunction(e) {
        return K(e, [this._element]);
      }
      _getPopperConfig(e) {
        const i = {
          placement: e,
          modifiers: [
            { name: 'flip', options: { fallbackPlacements: this._config.fallbackPlacements } },
            { name: 'offset', options: { offset: this._getOffset() } },
            { name: 'preventOverflow', options: { boundary: this._config.boundary } },
            { name: 'arrow', options: { element: `.${this.constructor.NAME}-arrow` } },
            {
              name: 'preSetPlacement',
              enabled: !0,
              phase: 'beforeMain',
              fn: (r) => {
                this._getTipElement().setAttribute('data-popper-placement', r.state.placement);
              },
            },
          ],
        };
        return { ...i, ...K(this._config.popperConfig, [i]) };
      }
      _setListeners() {
        const e = this._config.trigger.split(' ');
        for (const i of e)
          if ('click' === i)
            _.on(this._element, this.constructor.eventName('click'), this._config.selector, (r) => {
              this._initializeOnDelegatedTarget(r).toggle();
            });
          else if ('manual' !== i) {
            const r = this.constructor.eventName(i === jt ? 'mouseenter' : 'focusin'),
              o = this.constructor.eventName(i === jt ? 'mouseleave' : 'focusout');
            _.on(this._element, r, this._config.selector, (a) => {
              const l = this._initializeOnDelegatedTarget(a);
              (l._activeTrigger['focusin' === a.type ? 'focus' : jt] = !0), l._enter();
            }),
              _.on(this._element, o, this._config.selector, (a) => {
                const l = this._initializeOnDelegatedTarget(a);
                (l._activeTrigger['focusout' === a.type ? 'focus' : jt] = l._element.contains(a.relatedTarget)),
                  l._leave();
              });
          }
        (this._hideModalHandler = () => {
          this._element && this.hide();
        }),
          _.on(this._element.closest('.modal'), yt, this._hideModalHandler);
      }
      _fixTitle() {
        const e = this._element.getAttribute('title');
        e &&
          (this._element.getAttribute('aria-label') ||
            this._element.textContent.trim() ||
            this._element.setAttribute('aria-label', e),
          this._element.setAttribute('data-bs-original-title', e),
          this._element.removeAttribute('title'));
      }
      _enter() {
        this._isShown() || this._isHovered
          ? (this._isHovered = !0)
          : ((this._isHovered = !0),
            this._setTimeout(() => {
              this._isHovered && this.show();
            }, this._config.delay.show));
      }
      _leave() {
        this._isWithActiveTrigger() ||
          ((this._isHovered = !1),
          this._setTimeout(() => {
            this._isHovered || this.hide();
          }, this._config.delay.hide));
      }
      _setTimeout(e, i) {
        clearTimeout(this._timeout), (this._timeout = setTimeout(e, i));
      }
      _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0);
      }
      _getConfig(e) {
        const i = Ie.getDataAttributes(this._element);
        for (const r of Object.keys(i)) st.has(r) && delete i[r];
        return (
          (e = { ...i, ...('object' == typeof e && e ? e : {}) }),
          (e = this._mergeConfigObj(e)),
          (e = this._configAfterMerge(e)),
          this._typeCheckConfig(e),
          e
        );
      }
      _configAfterMerge(e) {
        return (
          (e.container = !1 === e.container ? document.body : je(e.container)),
          'number' == typeof e.delay && (e.delay = { show: e.delay, hide: e.delay }),
          'number' == typeof e.title && (e.title = e.title.toString()),
          'number' == typeof e.content && (e.content = e.content.toString()),
          e
        );
      }
      _getDelegateConfig() {
        const e = {};
        for (const [i, r] of Object.entries(this._config)) this.constructor.Default[i] !== r && (e[i] = r);
        return (e.selector = !1), (e.trigger = 'manual'), e;
      }
      _disposePopper() {
        this._popper && (this._popper.destroy(), (this._popper = null)),
          this.tip && (this.tip.remove(), (this.tip = null));
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = Xe.getOrCreateInstance(this, e);
          if ('string' == typeof e) {
            if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
            i[e]();
          }
        });
      }
    }
    ce(Xe);
    const yi = {
        ...Xe.Default,
        content: '',
        offset: [0, 8],
        placement: 'right',
        template:
          '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        trigger: 'click',
      },
      bi = { ...Xe.DefaultType, content: '(null|string|element|function)' };
    class bt extends Xe {
      static get Default() {
        return yi;
      }
      static get DefaultType() {
        return bi;
      }
      static get NAME() {
        return 'popover';
      }
      _isWithContent() {
        return this._getTitle() || this._getContent();
      }
      _getContentForTemplate() {
        return { '.popover-header': this._getTitle(), '.popover-body': this._getContent() };
      }
      _getContent() {
        return this._resolvePossibleFunction(this._config.content);
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = bt.getOrCreateInstance(this, e);
          if ('string' == typeof e) {
            if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
            i[e]();
          }
        });
      }
    }
    ce(bt);
    const Gn = 'click.bs.scrollspy',
      Ot = 'active',
      _i = { offset: null, rootMargin: '0px 0px -25%', smoothScroll: !1, target: null, threshold: [0.1, 0.5, 1] },
      wi = {
        offset: '(number|null)',
        rootMargin: 'string',
        smoothScroll: 'boolean',
        target: 'element',
        threshold: 'array',
      };
    class It extends pe {
      constructor(e, i) {
        super(e, i),
          (this._targetLinks = new Map()),
          (this._observableSections = new Map()),
          (this._rootElement = 'visible' === getComputedStyle(this._element).overflowY ? null : this._element),
          (this._activeTarget = null),
          (this._observer = null),
          (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
          this.refresh();
      }
      static get Default() {
        return _i;
      }
      static get DefaultType() {
        return wi;
      }
      static get NAME() {
        return 'scrollspy';
      }
      refresh() {
        this._initializeTargetsAndObservables(),
          this._maybeEnableSmoothScroll(),
          this._observer ? this._observer.disconnect() : (this._observer = this._getNewObserver());
        for (const e of this._observableSections.values()) this._observer.observe(e);
      }
      dispose() {
        this._observer.disconnect(), super.dispose();
      }
      _configAfterMerge(e) {
        return (
          (e.target = je(e.target) || document.body),
          (e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin),
          'string' == typeof e.threshold && (e.threshold = e.threshold.split(',').map((i) => Number.parseFloat(i))),
          e
        );
      }
      _maybeEnableSmoothScroll() {
        this._config.smoothScroll &&
          (_.off(this._config.target, Gn),
          _.on(this._config.target, Gn, '[href]', (e) => {
            const i = this._observableSections.get(e.target.hash);
            if (i) {
              e.preventDefault();
              const r = this._rootElement || window,
                o = i.offsetTop - this._element.offsetTop;
              if (r.scrollTo) return void r.scrollTo({ top: o, behavior: 'smooth' });
              r.scrollTop = o;
            }
          }));
      }
      _getNewObserver() {
        return new IntersectionObserver((i) => this._observerCallback(i), {
          root: this._rootElement,
          threshold: this._config.threshold,
          rootMargin: this._config.rootMargin,
        });
      }
      _observerCallback(e) {
        const i = (l) => this._targetLinks.get(`#${l.target.id}`),
          r = (l) => {
            (this._previousScrollData.visibleEntryTop = l.target.offsetTop), this._process(i(l));
          },
          o = (this._rootElement || document.documentElement).scrollTop,
          a = o >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = o;
        for (const l of e) {
          if (!l.isIntersecting) {
            (this._activeTarget = null), this._clearActiveClass(i(l));
            continue;
          }
          const u = l.target.offsetTop >= this._previousScrollData.visibleEntryTop;
          if (a && u) {
            if ((r(l), !o)) return;
          } else a || u || r(l);
        }
      }
      _initializeTargetsAndObservables() {
        (this._targetLinks = new Map()), (this._observableSections = new Map());
        const e = E.find('[href]', this._config.target);
        for (const i of e) {
          if (!i.hash || Oe(i)) continue;
          const r = E.findOne(decodeURI(i.hash), this._element);
          Ee(r) && (this._targetLinks.set(decodeURI(i.hash), i), this._observableSections.set(i.hash, r));
        }
      }
      _process(e) {
        this._activeTarget !== e &&
          (this._clearActiveClass(this._config.target),
          (this._activeTarget = e),
          e.classList.add(Ot),
          this._activateParents(e),
          _.trigger(this._element, 'activate.bs.scrollspy', { relatedTarget: e }));
      }
      _activateParents(e) {
        if (e.classList.contains('dropdown-item'))
          E.findOne('.dropdown-toggle', e.closest('.dropdown')).classList.add(Ot);
        else
          for (const i of E.parents(e, '.nav, .list-group'))
            for (const r of E.prev(i, '.nav-link, .nav-item > .nav-link, .list-group-item')) r.classList.add(Ot);
      }
      _clearActiveClass(e) {
        e.classList.remove(Ot);
        const i = E.find('[href].active', e);
        for (const r of i) r.classList.remove(Ot);
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = It.getOrCreateInstance(this, e);
          if ('string' == typeof e) {
            if (void 0 === i[e] || e.startsWith('_') || 'constructor' === e)
              throw new TypeError(`No method named "${e}"`);
            i[e]();
          }
        });
      }
    }
    _.on(window, 'load.bs.scrollspy.data-api', () => {
      for (const n of E.find('[data-bs-spy="scroll"]')) It.getOrCreateInstance(n);
    }),
      ce(It);
    const Zn = 'ArrowLeft',
      Jt = 'ArrowRight',
      ei = 'ArrowUp',
      Zt = 'ArrowDown',
      Pt = 'active',
      Mt = 'show',
      ti = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
      ot = `.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${ti}`;
    class Ue extends pe {
      constructor(e) {
        super(e),
          (this._parent = this._element.closest('.list-group, .nav, [role="tablist"]')),
          this._parent &&
            (this._setInitialAttributes(this._parent, this._getChildren()),
            _.on(this._element, 'keydown.bs.tab', (i) => this._keydown(i)));
      }
      static get NAME() {
        return 'tab';
      }
      show() {
        const e = this._element;
        if (this._elemIsActive(e)) return;
        const i = this._getActiveElem(),
          r = i ? _.trigger(i, 'hide.bs.tab', { relatedTarget: e }) : null;
        _.trigger(e, 'show.bs.tab', { relatedTarget: i }).defaultPrevented ||
          (r && r.defaultPrevented) ||
          (this._deactivate(i, e), this._activate(e, i));
      }
      _activate(e, i) {
        e &&
          (e.classList.add(Pt),
          this._activate(E.getElementFromSelector(e)),
          this._queueCallback(
            () => {
              'tab' === e.getAttribute('role')
                ? (e.removeAttribute('tabindex'),
                  e.setAttribute('aria-selected', !0),
                  this._toggleDropDown(e, !0),
                  _.trigger(e, 'shown.bs.tab', { relatedTarget: i }))
                : e.classList.add(Mt);
            },
            e,
            e.classList.contains('fade'),
          ));
      }
      _deactivate(e, i) {
        e &&
          (e.classList.remove(Pt),
          e.blur(),
          this._deactivate(E.getElementFromSelector(e)),
          this._queueCallback(
            () => {
              'tab' === e.getAttribute('role')
                ? (e.setAttribute('aria-selected', !1),
                  e.setAttribute('tabindex', '-1'),
                  this._toggleDropDown(e, !1),
                  _.trigger(e, 'hidden.bs.tab', { relatedTarget: i }))
                : e.classList.remove(Mt);
            },
            e,
            e.classList.contains('fade'),
          ));
      }
      _keydown(e) {
        if (![Zn, Jt, ei, Zt].includes(e.key)) return;
        e.stopPropagation(), e.preventDefault();
        const i = [Jt, Zt].includes(e.key),
          r = sn(
            this._getChildren().filter((o) => !Oe(o)),
            e.target,
            i,
            !0,
          );
        r && (r.focus({ preventScroll: !0 }), Ue.getOrCreateInstance(r).show());
      }
      _getChildren() {
        return E.find(ot, this._parent);
      }
      _getActiveElem() {
        return this._getChildren().find((e) => this._elemIsActive(e)) || null;
      }
      _setInitialAttributes(e, i) {
        this._setAttributeIfNotExists(e, 'role', 'tablist');
        for (const r of i) this._setInitialAttributesOnChild(r);
      }
      _setInitialAttributesOnChild(e) {
        e = this._getInnerElement(e);
        const i = this._elemIsActive(e),
          r = this._getOuterElement(e);
        e.setAttribute('aria-selected', i),
          r !== e && this._setAttributeIfNotExists(r, 'role', 'presentation'),
          i || e.setAttribute('tabindex', '-1'),
          this._setAttributeIfNotExists(e, 'role', 'tab'),
          this._setInitialAttributesOnTargetPanel(e);
      }
      _setInitialAttributesOnTargetPanel(e) {
        const i = E.getElementFromSelector(e);
        i &&
          (this._setAttributeIfNotExists(i, 'role', 'tabpanel'),
          e.id && this._setAttributeIfNotExists(i, 'aria-labelledby', `${e.id}`));
      }
      _toggleDropDown(e, i) {
        const r = this._getOuterElement(e);
        if (!r.classList.contains('dropdown')) return;
        const o = (a, l) => {
          const u = E.findOne(a, r);
          u && u.classList.toggle(l, i);
        };
        o('.dropdown-toggle', Pt), o('.dropdown-menu', Mt), r.setAttribute('aria-expanded', i);
      }
      _setAttributeIfNotExists(e, i, r) {
        e.hasAttribute(i) || e.setAttribute(i, r);
      }
      _elemIsActive(e) {
        return e.classList.contains(Pt);
      }
      _getInnerElement(e) {
        return e.matches(ot) ? e : E.findOne(ot, e);
      }
      _getOuterElement(e) {
        return e.closest('.nav-item, .list-group-item') || e;
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = Ue.getOrCreateInstance(this);
          if ('string' == typeof e) {
            if (void 0 === i[e] || e.startsWith('_') || 'constructor' === e)
              throw new TypeError(`No method named "${e}"`);
            i[e]();
          }
        });
      }
    }
    _.on(document, 'click.bs.tab', ti, function (n) {
      ['A', 'AREA'].includes(this.tagName) && n.preventDefault(), Oe(this) || Ue.getOrCreateInstance(this).show();
    }),
      _.on(window, 'load.bs.tab', () => {
        for (const n of E.find(
          '.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]',
        ))
          Ue.getOrCreateInstance(n);
      }),
      ce(Ue);
    const _t = 'show',
      en = 'showing',
      xi = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
      Ti = { animation: !0, autohide: !0, delay: 5e3 };
    class t extends pe {
      constructor(e, i) {
        super(e, i),
          (this._timeout = null),
          (this._hasMouseInteraction = !1),
          (this._hasKeyboardInteraction = !1),
          this._setListeners();
      }
      static get Default() {
        return Ti;
      }
      static get DefaultType() {
        return xi;
      }
      static get NAME() {
        return 'toast';
      }
      show() {
        _.trigger(this._element, 'show.bs.toast').defaultPrevented ||
          (this._clearTimeout(),
          this._config.animation && this._element.classList.add('fade'),
          this._element.classList.remove('hide'),
          this._element.classList.add(_t, en),
          this._queueCallback(
            () => {
              this._element.classList.remove(en), _.trigger(this._element, 'shown.bs.toast'), this._maybeScheduleHide();
            },
            this._element,
            this._config.animation,
          ));
      }
      hide() {
        this.isShown() &&
          (_.trigger(this._element, 'hide.bs.toast').defaultPrevented ||
            (this._element.classList.add(en),
            this._queueCallback(
              () => {
                this._element.classList.add('hide'),
                  this._element.classList.remove(en, _t),
                  _.trigger(this._element, 'hidden.bs.toast');
              },
              this._element,
              this._config.animation,
            )));
      }
      dispose() {
        this._clearTimeout(), this.isShown() && this._element.classList.remove(_t), super.dispose();
      }
      isShown() {
        return this._element.classList.contains(_t);
      }
      _maybeScheduleHide() {
        this._config.autohide &&
          (this._hasMouseInteraction ||
            this._hasKeyboardInteraction ||
            (this._timeout = setTimeout(() => {
              this.hide();
            }, this._config.delay)));
      }
      _onInteraction(e, i) {
        switch (e.type) {
          case 'mouseover':
          case 'mouseout':
            this._hasMouseInteraction = i;
            break;
          case 'focusin':
          case 'focusout':
            this._hasKeyboardInteraction = i;
        }
        if (i) return void this._clearTimeout();
        const r = e.relatedTarget;
        this._element === r || this._element.contains(r) || this._maybeScheduleHide();
      }
      _setListeners() {
        _.on(this._element, 'mouseover.bs.toast', (e) => this._onInteraction(e, !0)),
          _.on(this._element, 'mouseout.bs.toast', (e) => this._onInteraction(e, !1)),
          _.on(this._element, 'focusin.bs.toast', (e) => this._onInteraction(e, !0)),
          _.on(this._element, 'focusout.bs.toast', (e) => this._onInteraction(e, !1));
      }
      _clearTimeout() {
        clearTimeout(this._timeout), (this._timeout = null);
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const i = t.getOrCreateInstance(this, e);
          if ('string' == typeof e) {
            if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
            i[e](this);
          }
        });
      }
    }
    return (
      Ke(t),
      ce(t),
      {
        Alert: ct,
        Button: Ge,
        Carousel: Ze,
        Collapse: tt,
        Dropdown: _e,
        Modal: Me,
        Offcanvas: we,
        Popover: bt,
        ScrollSpy: It,
        Tab: Ue,
        Toast: t,
        Tooltip: Xe,
      }
    );
  });
