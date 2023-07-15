'use strict';
(self.webpackChunkapp = self.webpackChunkapp || []).push([
  [179],
  {
    622: () => {
      function o2(e) {
        return 'function' == typeof e;
      }
      function q4(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n), n;
      }
      const E6 = q4(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, c) => `${c + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = n);
          },
      );
      function Y4(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class n1 {
        constructor(t) {
          (this.initialTeardown = t), (this.closed = !1), (this._parentage = null), (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n))) for (const a of n) a.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (o2(r))
              try {
                r();
              } catch (a) {
                t = a instanceof E6 ? a.errors : [a];
              }
            const { _finalizers: c } = this;
            if (c) {
              this._finalizers = null;
              for (const a of c)
                try {
                  yo(a);
                } catch (i) {
                  (t = t ?? []), i instanceof E6 ? (t = [...t, ...i.errors]) : t.push(i);
                }
            }
            if (t) throw new E6(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) yo(t);
            else {
              if (t instanceof n1) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t);
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Y4(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Y4(n, t), t instanceof n1 && t._removeParent(this);
        }
      }
      n1.EMPTY = (() => {
        const e = new n1();
        return (e.closed = !0), e;
      })();
      const Ho = n1.EMPTY;
      function Vo(e) {
        return e instanceof n1 || (e && 'closed' in e && o2(e.remove) && o2(e.add) && o2(e.unsubscribe));
      }
      function yo(e) {
        o2(e) ? e() : e.unsubscribe();
      }
      const f3 = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        k6 = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = k6;
            return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = k6;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function zo(e) {
        k6.setTimeout(() => {
          const { onUnhandledError: t } = f3;
          if (!t) throw e;
          t(e);
        });
      }
      function Lo() {}
      const jz = Rr('C', void 0, void 0);
      function Rr(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let u3 = null;
      function T6(e) {
        if (f3.useDeprecatedSynchronousErrorHandling) {
          const t = !u3;
          if ((t && (u3 = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = u3;
            if (((u3 = null), n)) throw r;
          }
        } else e();
      }
      class Fr extends n1 {
        constructor(t) {
          super(), (this.isStopped = !1), t ? ((this.destination = t), Vo(t) && t.add(this)) : (this.destination = Kz);
        }
        static create(t, n, r) {
          return new X4(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Or(
                (function Gz(e) {
                  return Rr('N', e, void 0);
                })(t),
                this,
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Or(
                (function $z(e) {
                  return Rr('E', void 0, e);
                })(t),
                this,
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped ? Or(jz, this) : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const qz = Function.prototype.bind;
      function Pr(e, t) {
        return qz.call(e, t);
      }
      class Yz {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              I6(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              I6(r);
            }
          else I6(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              I6(n);
            }
        }
      }
      class X4 extends Fr {
        constructor(t, n, r) {
          let c;
          if ((super(), o2(t) || !t)) c = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
          else {
            let a;
            this && f3.useDeprecatedNextContext
              ? ((a = Object.create(t)),
                (a.unsubscribe = () => this.unsubscribe()),
                (c = {
                  next: t.next && Pr(t.next, a),
                  error: t.error && Pr(t.error, a),
                  complete: t.complete && Pr(t.complete, a),
                }))
              : (c = t);
          }
          this.destination = new Yz(c);
        }
      }
      function I6(e) {
        f3.useDeprecatedSynchronousErrorHandling
          ? (function Wz(e) {
              f3.useDeprecatedSynchronousErrorHandling && u3 && ((u3.errorThrown = !0), (u3.error = e));
            })(e)
          : zo(e);
      }
      function Or(e, t) {
        const { onStoppedNotification: n } = f3;
        n && k6.setTimeout(() => n(e, t));
      }
      const Kz = {
          closed: !0,
          next: Lo,
          error: function Xz(e) {
            throw e;
          },
          complete: Lo,
        },
        Br = ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function d3(e) {
        return e;
      }
      function wo(e) {
        return 0 === e.length
          ? d3
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, c) => c(r), n);
            };
      }
      let L2 = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, c) {
            const a = (function Jz(e) {
              return (
                (e && e instanceof Fr) ||
                ((function Zz(e) {
                  return e && o2(e.next) && o2(e.error) && o2(e.complete);
                })(e) &&
                  Vo(e))
              );
            })(n)
              ? n
              : new X4(n, r, c);
            return (
              T6(() => {
                const { operator: i, source: s } = this;
                a.add(i ? i.call(a, s) : s ? this._subscribe(a) : this._trySubscribe(a));
              }),
              a
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = bo(r))((c, a) => {
              const i = new X4({
                next: (s) => {
                  try {
                    n(s);
                  } catch (o) {
                    a(o), i.unsubscribe();
                  }
                },
                error: a,
                complete: c,
              });
              this.subscribe(i);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n);
          }
          [Br]() {
            return this;
          }
          pipe(...n) {
            return wo(n)(this);
          }
          toPromise(n) {
            return new (n = bo(n))((r, c) => {
              let a;
              this.subscribe(
                (i) => (a = i),
                (i) => c(i),
                () => r(a),
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function bo(e) {
        var t;
        return null !== (t = e ?? f3.Promise) && void 0 !== t ? t : Promise;
      }
      const eL = q4(
        (e) =>
          function () {
            e(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed');
          },
      );
      let _1 = (() => {
        class e extends L2 {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Do(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new eL();
          }
          next(n) {
            T6(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            T6(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            T6(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0;
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: c, observers: a } = this;
            return r || c
              ? Ho
              : ((this.currentObservers = null),
                a.push(n),
                new n1(() => {
                  (this.currentObservers = null), Y4(a, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: c, isStopped: a } = this;
            r ? n.error(c) : a && n.complete();
          }
          asObservable() {
            const n = new L2();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Do(t, n)), e;
      })();
      class Do extends _1 {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) && void 0 !== r
            ? r
            : Ho;
        }
      }
      function So(e) {
        return o2(e?.lift);
      }
      function O2(e) {
        return (t) => {
          if (So(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
      function T2(e, t, n, r, c) {
        return new tL(e, t, n, r, c);
      }
      class tL extends Fr {
        constructor(t, n, r, c, a, i) {
          super(t),
            (this.onFinalize = a),
            (this.shouldUnsubscribe = i),
            (this._next = n
              ? function (s) {
                  try {
                    n(s);
                  } catch (o) {
                    t.error(o);
                  }
                }
              : super._next),
            (this._error = c
              ? function (s) {
                  try {
                    c(s);
                  } catch (o) {
                    t.error(o);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (s) {
                    t.error(s);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(), !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this));
          }
        }
      }
      function W(e, t) {
        return O2((n, r) => {
          let c = 0;
          n.subscribe(
            T2(r, (a) => {
              r.next(e.call(t, a, c++));
            }),
          );
        });
      }
      function Ue(e) {
        return this instanceof Ue ? ((this.v = e), this) : new Ue(e);
      }
      function Ao(e) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Gr(e) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
                  },
                };
              throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
            })(e)),
            (n = {}),
            r('next'),
            r('throw'),
            r('return'),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(a) {
          n[a] =
            e[a] &&
            function (i) {
              return new Promise(function (s, o) {
                !(function c(a, i, s, o) {
                  Promise.resolve(o).then(function (l) {
                    a({ value: l, done: s });
                  }, i);
                })(s, o, (i = e[a](i)).done, i.value);
              });
            };
        }
      }
      'function' == typeof SuppressedError && SuppressedError;
      const Eo = (e) => e && 'number' == typeof e.length && 'function' != typeof e;
      function ko(e) {
        return o2(e?.then);
      }
      function To(e) {
        return o2(e[Br]);
      }
      function Io(e) {
        return Symbol.asyncIterator && o2(e?.[Symbol.asyncIterator]);
      }
      function Ro(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
        );
      }
      const Fo = (function zL() {
        return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
      })();
      function Po(e) {
        return o2(e?.[Fo]);
      }
      function Oo(e) {
        return (function No(e, t, n) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
          var c,
            r = n.apply(e, t || []),
            a = [];
          return (
            (c = {}),
            i('next'),
            i('throw'),
            i('return'),
            (c[Symbol.asyncIterator] = function () {
              return this;
            }),
            c
          );
          function i(d) {
            r[d] &&
              (c[d] = function (h) {
                return new Promise(function (p, m) {
                  a.push([d, h, p, m]) > 1 || s(d, h);
                });
              });
          }
          function s(d, h) {
            try {
              !(function o(d) {
                d.value instanceof Ue ? Promise.resolve(d.value.v).then(l, f) : u(a[0][2], d);
              })(r[d](h));
            } catch (p) {
              u(a[0][3], p);
            }
          }
          function l(d) {
            s('next', d);
          }
          function f(d) {
            s('throw', d);
          }
          function u(d, h) {
            d(h), a.shift(), a.length && s(a[0][0], a[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: c } = yield Ue(n.read());
              if (c) return yield Ue(void 0);
              yield yield Ue(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Bo(e) {
        return o2(e?.getReader);
      }
      function N1(e) {
        if (e instanceof L2) return e;
        if (null != e) {
          if (To(e))
            return (function LL(e) {
              return new L2((t) => {
                const n = e[Br]();
                if (o2(n.subscribe)) return n.subscribe(t);
                throw new TypeError('Provided object does not correctly implement Symbol.observable');
              });
            })(e);
          if (Eo(e))
            return (function wL(e) {
              return new L2((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (ko(e))
            return (function bL(e) {
              return new L2((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n),
                ).then(null, zo);
              });
            })(e);
          if (Io(e)) return Uo(e);
          if (Po(e))
            return (function DL(e) {
              return new L2((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Bo(e))
            return (function SL(e) {
              return Uo(Oo(e));
            })(e);
        }
        throw Ro(e);
      }
      function Uo(e) {
        return new L2((t) => {
          (function xL(e, t) {
            var n, r, c, a;
            return (function xo(e, t, n, r) {
              return new (n || (n = Promise))(function (a, i) {
                function s(f) {
                  try {
                    l(r.next(f));
                  } catch (u) {
                    i(u);
                  }
                }
                function o(f) {
                  try {
                    l(r.throw(f));
                  } catch (u) {
                    i(u);
                  }
                }
                function l(f) {
                  f.done
                    ? a(f.value)
                    : (function c(a) {
                        return a instanceof n
                          ? a
                          : new n(function (i) {
                              i(a);
                            });
                      })(f.value).then(s, o);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Ao(e); !(r = yield n.next()).done; ) if ((t.next(r.value), t.closed)) return;
              } catch (i) {
                c = { error: i };
              } finally {
                try {
                  r && !r.done && (a = n.return) && (yield a.call(n));
                } finally {
                  if (c) throw c.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function He(e, t, n, r = 0, c = !1) {
        const a = t.schedule(function () {
          n(), c ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(a), !c)) return a;
      }
      function B2(e, t, n = 1 / 0) {
        return o2(t)
          ? B2((r, c) => W((a, i) => t(r, a, c, i))(N1(e(r, c))), n)
          : ('number' == typeof t && (n = t),
            O2((r, c) =>
              (function _L(e, t, n, r, c, a, i, s) {
                const o = [];
                let l = 0,
                  f = 0,
                  u = !1;
                const d = () => {
                    u && !o.length && !l && t.complete();
                  },
                  h = (m) => (l < r ? p(m) : o.push(m)),
                  p = (m) => {
                    a && t.next(m), l++;
                    let v = !1;
                    N1(n(m, f++)).subscribe(
                      T2(
                        t,
                        (C) => {
                          c?.(C), a ? h(C) : t.next(C);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; o.length && l < r; ) {
                                const C = o.shift();
                                i ? He(t, i, () => p(C)) : p(C);
                              }
                              d();
                            } catch (C) {
                              t.error(C);
                            }
                        },
                      ),
                    );
                  };
                return (
                  e.subscribe(
                    T2(t, h, () => {
                      (u = !0), d();
                    }),
                  ),
                  () => {
                    s?.();
                  }
                );
              })(r, c, e, n),
            ));
      }
      function F3(e = 1 / 0) {
        return B2(d3, e);
      }
      const ne = new L2((e) => e.complete());
      function Wr(e) {
        return e[e.length - 1];
      }
      function jo(e) {
        return o2(Wr(e)) ? e.pop() : void 0;
      }
      function K4(e) {
        return (function AL(e) {
          return e && o2(e.schedule);
        })(Wr(e))
          ? e.pop()
          : void 0;
      }
      function $o(e, t = 0) {
        return O2((n, r) => {
          n.subscribe(
            T2(
              r,
              (c) => He(r, e, () => r.next(c), t),
              () => He(r, e, () => r.complete(), t),
              (c) => He(r, e, () => r.error(c), t),
            ),
          );
        });
      }
      function Go(e, t = 0) {
        return O2((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Wo(e, t) {
        if (!e) throw new Error('Iterable cannot be null');
        return new L2((n) => {
          He(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            He(
              n,
              t,
              () => {
                r.next().then((c) => {
                  c.done ? n.complete() : n.next(c.value);
                });
              },
              0,
              !0,
            );
          });
        });
      }
      function N2(e, t) {
        return t
          ? (function PL(e, t) {
              if (null != e) {
                if (To(e))
                  return (function kL(e, t) {
                    return N1(e).pipe(Go(t), $o(t));
                  })(e, t);
                if (Eo(e))
                  return (function IL(e, t) {
                    return new L2((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (ko(e))
                  return (function TL(e, t) {
                    return N1(e).pipe(Go(t), $o(t));
                  })(e, t);
                if (Io(e)) return Wo(e, t);
                if (Po(e))
                  return (function RL(e, t) {
                    return new L2((n) => {
                      let r;
                      return (
                        He(n, t, () => {
                          (r = e[Fo]()),
                            He(
                              n,
                              t,
                              () => {
                                let c, a;
                                try {
                                  ({ value: c, done: a } = r.next());
                                } catch (i) {
                                  return void n.error(i);
                                }
                                a ? n.complete() : n.next(c);
                              },
                              0,
                              !0,
                            );
                        }),
                        () => o2(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Bo(e))
                  return (function FL(e, t) {
                    return Wo(Oo(e), t);
                  })(e, t);
              }
              throw Ro(e);
            })(e, t)
          : N1(e);
      }
      function qr(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new X4({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return N1(t(...n)).subscribe(r);
      }
      function s2(e) {
        for (let t in e) if (e[t] === s2) return t;
        throw Error('Could not find renamed property on target object.');
      }
      function Yr(e, t) {
        for (const n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function l2(e) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) return '[' + e.map(l2).join(', ') + ']';
        if (null == e) return '' + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return '' + t;
        const n = t.indexOf('\n');
        return -1 === n ? t : t.substring(0, n);
      }
      function Xr(e, t) {
        return null == e || '' === e ? (null === t ? '' : t) : null == t || '' === t ? e : e + ' ' + t;
      }
      const UL = s2({ __forward_ref__: s2 });
      function f2(e) {
        return (
          (e.__forward_ref__ = f2),
          (e.toString = function () {
            return l2(this());
          }),
          e
        );
      }
      function k(e) {
        return Kr(e) ? e() : e;
      }
      function Kr(e) {
        return 'function' == typeof e && e.hasOwnProperty(UL) && e.__forward_ref__ === f2;
      }
      function Qr(e) {
        return e && !!e.ɵproviders;
      }
      const R6 = 'https://g.co/ng/security#xss';
      class y extends Error {
        constructor(t, n) {
          super(F6(t, n)), (this.code = t);
        }
      }
      function F6(e, t) {
        return `NG0${Math.abs(e)}${t ? ': ' + t.trim() : ''}`;
      }
      function O(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e);
      }
      function P6(e, t) {
        throw new y(-201, !1);
      }
      function A1(e, t) {
        null == e &&
          (function n2(e, t, n, r) {
            throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? '' : ` [Expected=> ${n} ${r} ${t} <=Actual]`));
          })(t, e, null, '!=');
      }
      function _(e) {
        return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
      }
      function u1(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function O6(e) {
        return qo(e, B6) || qo(e, Xo);
      }
      function qo(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Yo(e) {
        return e && (e.hasOwnProperty(Zr) || e.hasOwnProperty(KL)) ? e[Zr] : null;
      }
      const B6 = s2({ ɵprov: s2 }),
        Zr = s2({ ɵinj: s2 }),
        Xo = s2({ ngInjectableDef: s2 }),
        KL = s2({ ngInjectorDef: s2 });
      var T = (() => (
        ((T = T || {})[(T.Default = 0)] = 'Default'),
        (T[(T.Host = 1)] = 'Host'),
        (T[(T.Self = 2)] = 'Self'),
        (T[(T.SkipSelf = 4)] = 'SkipSelf'),
        (T[(T.Optional = 8)] = 'Optional'),
        T
      ))();
      let Jr;
      function E1(e) {
        const t = Jr;
        return (Jr = e), t;
      }
      function Ko(e, t, n) {
        const r = O6(e);
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & T.Optional
          ? null
          : void 0 !== t
          ? t
          : void P6(l2(e));
      }
      const h2 = (() =>
          (typeof globalThis < 'u' && globalThis) ||
          (typeof global < 'u' && global) ||
          (typeof window < 'u' && window) ||
          (typeof self < 'u' && typeof WorkerGlobalScope < 'u' && self instanceof WorkerGlobalScope && self))(),
        Q4 = {},
        ec = '__NG_DI_FLAG__',
        U6 = 'ngTempTokenPath',
        ZL = 'ngTokenPath',
        JL = /\n/gm,
        ew = '\u0275',
        Qo = '__source';
      let Z4;
      function P3(e) {
        const t = Z4;
        return (Z4 = e), t;
      }
      function tw(e, t = T.Default) {
        if (void 0 === Z4) throw new y(-203, !1);
        return null === Z4 ? Ko(e, void 0, t) : Z4.get(e, t & T.Optional ? null : void 0, t);
      }
      function D(e, t = T.Default) {
        return (
          (function QL() {
            return Jr;
          })() || tw
        )(k(e), t);
      }
      function q(e, t = T.Default) {
        return D(e, j6(t));
      }
      function j6(e) {
        return typeof e > 'u' || 'number' == typeof e
          ? e
          : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
      }
      function tc(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = k(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new y(900, !1);
            let c,
              a = T.Default;
            for (let i = 0; i < r.length; i++) {
              const s = r[i],
                o = nw(s);
              'number' == typeof o ? (-1 === o ? (c = s.token) : (a |= o)) : (c = s);
            }
            t.push(D(c, a));
          } else t.push(D(r));
        }
        return t;
      }
      function J4(e, t) {
        return (e[ec] = t), (e.prototype[ec] = t), e;
      }
      function nw(e) {
        return e[ec];
      }
      function Ve(e) {
        return { toString: e }.toString();
      }
      var re = (() => (((re = re || {})[(re.OnPush = 0)] = 'OnPush'), (re[(re.Default = 1)] = 'Default'), re))(),
        ce = (() => {
          return (
            ((e = ce || (ce = {}))[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            ce
          );
          var e;
        })();
      const ye = {},
        J = [],
        $6 = s2({ ɵcmp: s2 }),
        nc = s2({ ɵdir: s2 }),
        rc = s2({ ɵpipe: s2 }),
        Jo = s2({ ɵmod: s2 }),
        ze = s2({ ɵfac: s2 }),
        et = s2({ __NG_ELEMENT_ID__: s2 });
      let aw = 0;
      function O1(e) {
        return Ve(() => {
          const t = t5(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === re.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || ce.Emulated,
              id: 'c' + aw++,
              styles: e.styles || J,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          n5(n);
          const r = e.dependencies;
          return (n.directiveDefs = G6(r, !1)), (n.pipeDefs = G6(r, !0)), n;
        });
      }
      function sw(e) {
        return r2(e) || q2(e);
      }
      function ow(e) {
        return null !== e;
      }
      function V1(e) {
        return Ve(() => ({
          type: e.type,
          bootstrap: e.bootstrap || J,
          declarations: e.declarations || J,
          imports: e.imports || J,
          exports: e.exports || J,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function e5(e, t) {
        if (null == e) return ye;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let c = e[r],
              a = c;
            Array.isArray(c) && ((a = c[1]), (c = c[0])), (n[c] = r), t && (t[c] = a);
          }
        return n;
      }
      function F(e) {
        return Ve(() => {
          const t = t5(e);
          return n5(t), t;
        });
      }
      function d1(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function r2(e) {
        return e[$6] || null;
      }
      function q2(e) {
        return e[nc] || null;
      }
      function h1(e) {
        return e[rc] || null;
      }
      function y1(e, t) {
        const n = e[Jo] || null;
        if (!n && !0 === t) throw new Error(`Type ${l2(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function t5(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || J,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: e5(e.inputs, t),
          outputs: e5(e.outputs),
        };
      }
      function n5(e) {
        e.features?.forEach((t) => t(e));
      }
      function G6(e, t) {
        if (!e) return null;
        const n = t ? h1 : sw;
        return () => ('function' == typeof e ? e() : e).map((r) => n(r)).filter(ow);
      }
      const Le = 0,
        L = 1,
        $ = 2,
        H2 = 3,
        B1 = 4,
        h3 = 5,
        Y2 = 6,
        B3 = 7,
        w2 = 8,
        W6 = 9,
        q6 = 10,
        Y = 11,
        cc = 12,
        tt = 13,
        r5 = 14,
        U3 = 15,
        X2 = 16,
        nt = 17,
        j3 = 18,
        ae = 19,
        rt = 20,
        c5 = 21,
        p2 = 22,
        ac = 1,
        a5 = 2,
        Y6 = 7,
        X6 = 8,
        $3 = 9,
        r1 = 10;
      function z1(e) {
        return Array.isArray(e) && 'object' == typeof e[ac];
      }
      function U1(e) {
        return Array.isArray(e) && !0 === e[ac];
      }
      function ic(e) {
        return 0 != (4 & e.flags);
      }
      function ct(e) {
        return e.componentOffset > -1;
      }
      function K6(e) {
        return 1 == (1 & e.flags);
      }
      function j1(e) {
        return !!e.template;
      }
      function fw(e) {
        return 0 != (256 & e[$]);
      }
      function p3(e, t) {
        return e.hasOwnProperty(ze) ? e[ze] : null;
      }
      class hw {
        constructor(t, n, r) {
          (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function c1() {
        return o5;
      }
      function o5(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = mw), pw;
      }
      function pw() {
        const e = f5(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === ye) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function mw(e, t, n, r) {
        const c = this.declaredInputs[n],
          a =
            f5(e) ||
            (function gw(e, t) {
              return (e[l5] = t);
            })(e, { previous: ye, current: null }),
          i = a.current || (a.current = {}),
          s = a.previous,
          o = s[c];
        (i[c] = new hw(o && o.currentValue, t, s === ye)), (e[r] = t);
      }
      c1.ngInherit = !0;
      const l5 = '__ngSimpleChanges__';
      function f5(e) {
        return e[l5] || null;
      }
      const k1 = function (e, t, n) {},
        u5 = 'svg';
      function U2(e) {
        for (; Array.isArray(e); ) e = e[Le];
        return e;
      }
      function Q6(e, t) {
        return U2(t[e]);
      }
      function L1(e, t) {
        return U2(t[e.index]);
      }
      function h5(e, t) {
        return e.data[t];
      }
      function p1(e, t) {
        const n = t[e];
        return z1(n) ? n : n[Le];
      }
      function Z6(e) {
        return 64 == (64 & e[$]);
      }
      function $e(e, t) {
        return null == t ? null : e[t];
      }
      function p5(e) {
        e[j3] = 0;
      }
      function oc(e, t) {
        e[h3] += t;
        let n = e,
          r = e[H2];
        for (; null !== r && ((1 === t && 1 === n[h3]) || (-1 === t && 0 === n[h3])); )
          (r[h3] += t), (n = r), (r = r[H2]);
      }
      const B = { lFrame: L5(null), bindingsEnabled: !0 };
      function g5() {
        return B.bindingsEnabled;
      }
      function H() {
        return B.lFrame.lView;
      }
      function Z() {
        return B.lFrame.tView;
      }
      function lc(e) {
        return (B.lFrame.contextLView = e), e[w2];
      }
      function fc(e) {
        return (B.lFrame.contextLView = null), e;
      }
      function j2() {
        let e = v5();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function v5() {
        return B.lFrame.currentTNode;
      }
      function ie(e, t) {
        const n = B.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function uc() {
        return B.lFrame.isParent;
      }
      function dc() {
        B.lFrame.isParent = !1;
      }
      function a1() {
        const e = B.lFrame;
        let t = e.bindingRootIndex;
        return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
      }
      function W3() {
        return B.lFrame.bindingIndex++;
      }
      function xw(e, t) {
        const n = B.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), hc(t);
      }
      function hc(e) {
        B.lFrame.currentDirectiveIndex = e;
      }
      function V5() {
        return B.lFrame.currentQueryIndex;
      }
      function mc(e) {
        B.lFrame.currentQueryIndex = e;
      }
      function Nw(e) {
        const t = e[L];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Y2] : null;
      }
      function y5(e, t, n) {
        if (n & T.SkipSelf) {
          let c = t,
            a = e;
          for (
            ;
            !((c = c.parent), null !== c || n & T.Host || ((c = Nw(a)), null === c || ((a = a[U3]), 10 & c.type)));

          );
          if (null === c) return !1;
          (t = c), (e = a);
        }
        const r = (B.lFrame = z5());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function gc(e) {
        const t = z5(),
          n = e[L];
        (B.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function z5() {
        const e = B.lFrame,
          t = null === e ? null : e.child;
        return null === t ? L5(e) : t;
      }
      function L5(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function w5() {
        const e = B.lFrame;
        return (B.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
      }
      const b5 = w5;
      function vc() {
        const e = w5();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function i1() {
        return B.lFrame.selectedIndex;
      }
      function m3(e) {
        B.lFrame.selectedIndex = e;
      }
      function C2() {
        const e = B.lFrame;
        return h5(e.tView, e.selectedIndex);
      }
      function J6(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const a = e.data[n].type.prototype,
            {
              ngAfterContentInit: i,
              ngAfterContentChecked: s,
              ngAfterViewInit: o,
              ngAfterViewChecked: l,
              ngOnDestroy: f,
            } = a;
          i && (e.contentHooks ?? (e.contentHooks = [])).push(-n, i),
            s &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, s),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, s)),
            o && (e.viewHooks ?? (e.viewHooks = [])).push(-n, o),
            l &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, l)),
            null != f && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, f);
        }
      }
      function en(e, t, n) {
        x5(e, t, 3, n);
      }
      function tn(e, t, n, r) {
        (3 & e[$]) === n && x5(e, t, n, r);
      }
      function Cc(e, t) {
        let n = e[$];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[$] = n));
      }
      function x5(e, t, n, r) {
        const a = r ?? -1,
          i = t.length - 1;
        let s = 0;
        for (let o = void 0 !== r ? 65535 & e[j3] : 0; o < i; o++)
          if ('number' == typeof t[o + 1]) {
            if (((s = t[o]), null != r && s >= r)) break;
          } else
            t[o] < 0 && (e[j3] += 65536),
              (s < a || -1 == a) && (Fw(e, n, t, o), (e[j3] = (4294901760 & e[j3]) + o + 2)),
              o++;
      }
      function Fw(e, t, n, r) {
        const c = n[r] < 0,
          a = n[r + 1],
          s = e[c ? -n[r] : n[r]];
        if (c) {
          if (e[$] >> 11 < e[j3] >> 16 && (3 & e[$]) === t) {
            (e[$] += 2048), k1(4, s, a);
            try {
              a.call(s);
            } finally {
              k1(5, s, a);
            }
          }
        } else {
          k1(4, s, a);
          try {
            a.call(s);
          } finally {
            k1(5, s, a);
          }
        }
      }
      const q3 = -1;
      class it {
        constructor(t, n, r) {
          (this.factory = t), (this.resolving = !1), (this.canSeeViewProviders = n), (this.injectImpl = r);
        }
      }
      function Hc(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const c = n[r];
          if ('number' == typeof c) {
            if (0 !== c) break;
            r++;
            const a = n[r++],
              i = n[r++],
              s = n[r++];
            e.setAttribute(t, i, s, a);
          } else {
            const a = c,
              i = n[++r];
            N5(a) ? e.setProperty(t, a, i) : e.setAttribute(t, a, i), r++;
          }
        }
        return r;
      }
      function _5(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function N5(e) {
        return 64 === e.charCodeAt(0);
      }
      function st(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const c = t[r];
              'number' == typeof c ? (n = c) : 0 === n || A5(e, n, c, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function A5(e, t, n, r, c) {
        let a = 0,
          i = e.length;
        if (-1 === t) i = -1;
        else
          for (; a < e.length; ) {
            const s = e[a++];
            if ('number' == typeof s) {
              if (s === t) {
                i = -1;
                break;
              }
              if (s > t) {
                i = a - 1;
                break;
              }
            }
          }
        for (; a < e.length; ) {
          const s = e[a];
          if ('number' == typeof s) break;
          if (s === n) {
            if (null === r) return void (null !== c && (e[a + 1] = c));
            if (r === e[a + 1]) return void (e[a + 2] = c);
          }
          a++, null !== r && a++, null !== c && a++;
        }
        -1 !== i && (e.splice(i, 0, t), (a = i + 1)),
          e.splice(a++, 0, n),
          null !== r && e.splice(a++, 0, r),
          null !== c && e.splice(a++, 0, c);
      }
      function E5(e) {
        return e !== q3;
      }
      function nn(e) {
        return 32767 & e;
      }
      function rn(e, t) {
        let n = (function Uw(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[U3]), n--;
        return r;
      }
      let Vc = !0;
      function cn(e) {
        const t = Vc;
        return (Vc = e), t;
      }
      const k5 = 255,
        T5 = 5;
      let jw = 0;
      const se = {};
      function an(e, t) {
        const n = I5(e, t);
        if (-1 !== n) return n;
        const r = t[L];
        r.firstCreatePass && ((e.injectorIndex = t.length), yc(r.data, e), yc(t, null), yc(r.blueprint, null));
        const c = zc(e, t),
          a = e.injectorIndex;
        if (E5(c)) {
          const i = nn(c),
            s = rn(c, t),
            o = s[L].data;
          for (let l = 0; l < 8; l++) t[a + l] = s[i + l] | o[i + l];
        }
        return (t[a + 8] = c), a;
      }
      function yc(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function I5(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function zc(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
        let n = 0,
          r = null,
          c = t;
        for (; null !== c; ) {
          if (((r = j5(c)), null === r)) return q3;
          if ((n++, (c = c[U3]), -1 !== r.injectorIndex)) return r.injectorIndex | (n << 16);
        }
        return q3;
      }
      function Lc(e, t, n) {
        !(function $w(e, t, n) {
          let r;
          'string' == typeof n ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(et) && (r = n[et]),
            null == r && (r = n[et] = jw++);
          const c = r & k5;
          t.data[e + (c >> T5)] |= 1 << c;
        })(e, t, n);
      }
      function R5(e, t, n) {
        if (n & T.Optional || void 0 !== e) return e;
        P6();
      }
      function F5(e, t, n, r) {
        if ((n & T.Optional && void 0 === r && (r = null), !(n & (T.Self | T.Host)))) {
          const c = e[W6],
            a = E1(void 0);
          try {
            return c ? c.get(t, r, n & T.Optional) : Ko(t, r, n & T.Optional);
          } finally {
            E1(a);
          }
        }
        return R5(r, 0, n);
      }
      function P5(e, t, n, r = T.Default, c) {
        if (null !== e) {
          if (1024 & t[$]) {
            const i = (function Xw(e, t, n, r, c) {
              let a = e,
                i = t;
              for (; null !== a && null !== i && 1024 & i[$] && !(256 & i[$]); ) {
                const s = O5(a, i, n, r | T.Self, se);
                if (s !== se) return s;
                let o = a.parent;
                if (!o) {
                  const l = i[c5];
                  if (l) {
                    const f = l.get(n, se, r);
                    if (f !== se) return f;
                  }
                  (o = j5(i)), (i = i[U3]);
                }
                a = o;
              }
              return c;
            })(e, t, n, r, se);
            if (i !== se) return i;
          }
          const a = O5(e, t, n, r, se);
          if (a !== se) return a;
        }
        return F5(t, n, r, c);
      }
      function O5(e, t, n, r, c) {
        const a = (function qw(e) {
          if ('string' == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(et) ? e[et] : void 0;
          return 'number' == typeof t ? (t >= 0 ? t & k5 : Yw) : t;
        })(n);
        if ('function' == typeof a) {
          if (!y5(t, e, r)) return r & T.Host ? R5(c, 0, r) : F5(t, n, r, c);
          try {
            const i = a(r);
            if (null != i || r & T.Optional) return i;
            P6();
          } finally {
            b5();
          }
        } else if ('number' == typeof a) {
          let i = null,
            s = I5(e, t),
            o = q3,
            l = r & T.Host ? t[X2][Y2] : null;
          for (
            (-1 === s || r & T.SkipSelf) &&
            ((o = -1 === s ? zc(e, t) : t[s + 8]),
            o !== q3 && U5(r, !1) ? ((i = t[L]), (s = nn(o)), (t = rn(o, t))) : (s = -1));
            -1 !== s;

          ) {
            const f = t[L];
            if (B5(a, s, f.data)) {
              const u = Ww(s, t, n, i, r, l);
              if (u !== se) return u;
            }
            (o = t[s + 8]),
              o !== q3 && U5(r, t[L].data[s + 8] === l) && B5(a, s, t)
                ? ((i = f), (s = nn(o)), (t = rn(o, t)))
                : (s = -1);
          }
        }
        return c;
      }
      function Ww(e, t, n, r, c, a) {
        const i = t[L],
          s = i.data[e + 8],
          f = sn(s, i, n, null == r ? ct(s) && Vc : r != i && 0 != (3 & s.type), c & T.Host && a === s);
        return null !== f ? g3(t, i, f, s) : se;
      }
      function sn(e, t, n, r, c) {
        const a = e.providerIndexes,
          i = t.data,
          s = 1048575 & a,
          o = e.directiveStart,
          f = a >> 20,
          d = c ? s + f : e.directiveEnd;
        for (let h = r ? s : s + f; h < d; h++) {
          const p = i[h];
          if ((h < o && n === p) || (h >= o && p.type === n)) return h;
        }
        if (c) {
          const h = i[o];
          if (h && j1(h) && h.type === n) return o;
        }
        return null;
      }
      function g3(e, t, n, r) {
        let c = e[n];
        const a = t.data;
        if (
          (function Pw(e) {
            return e instanceof it;
          })(c)
        ) {
          const i = c;
          i.resolving &&
            (function jL(e, t) {
              const n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : '';
              throw new y(-200, `Circular dependency in DI detected for ${e}${n}`);
            })(
              (function t2(e) {
                return 'function' == typeof e
                  ? e.name || e.toString()
                  : 'object' == typeof e && null != e && 'function' == typeof e.type
                  ? e.type.name || e.type.toString()
                  : O(e);
              })(a[n]),
            );
          const s = cn(i.canSeeViewProviders);
          i.resolving = !0;
          const o = i.injectImpl ? E1(i.injectImpl) : null;
          y5(e, r, T.Default);
          try {
            (c = e[n] = i.factory(void 0, a, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function Rw(e, t, n) {
                  const { ngOnChanges: r, ngOnInit: c, ngDoCheck: a } = t.type.prototype;
                  if (r) {
                    const i = o5(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])).push(e, i);
                  }
                  c && (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, c),
                    a &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, a),
                      (n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])).push(e, a));
                })(n, a[n], t);
          } finally {
            null !== o && E1(o), cn(s), (i.resolving = !1), b5();
          }
        }
        return c;
      }
      function B5(e, t, n) {
        return !!(n[t + (e >> T5)] & (1 << e));
      }
      function U5(e, t) {
        return !(e & T.Self || (e & T.Host && t));
      }
      class Y3 {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return P5(this._tNode, this._lView, t, j6(r), n);
        }
      }
      function Yw() {
        return new Y3(j2(), H());
      }
      function $2(e) {
        return Ve(() => {
          const t = e.prototype.constructor,
            n = t[ze] || wc(t),
            r = Object.prototype;
          let c = Object.getPrototypeOf(e.prototype).constructor;
          for (; c && c !== r; ) {
            const a = c[ze] || wc(c);
            if (a && a !== n) return a;
            c = Object.getPrototypeOf(c);
          }
          return (a) => new a();
        });
      }
      function wc(e) {
        return Kr(e)
          ? () => {
              const t = wc(k(e));
              return t && t();
            }
          : p3(e);
      }
      function j5(e) {
        const t = e[L],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Y2] : null;
      }
      const K3 = '__parameters__';
      function Z3(e, t, n) {
        return Ve(() => {
          const r = (function bc(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const c in r) this[c] = r[c];
              }
            };
          })(t);
          function c(...a) {
            if (this instanceof c) return r.apply(this, a), this;
            const i = new c(...a);
            return (s.annotation = i), s;
            function s(o, l, f) {
              const u = o.hasOwnProperty(K3) ? o[K3] : Object.defineProperty(o, K3, { value: [] })[K3];
              for (; u.length <= f; ) u.push(null);
              return (u[f] = u[f] || []).push(i), o;
            }
          }
          return (
            n && (c.prototype = Object.create(n.prototype)), (c.prototype.ngMetadataName = e), (c.annotationCls = c), c
          );
        });
      }
      class S {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = _({ token: this, providedIn: n.providedIn || 'root', factory: n.factory }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function v3(e, t) {
        e.forEach((n) => (Array.isArray(n) ? v3(n, t) : t(n)));
      }
      function G5(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function ln(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function ft(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      function w1(e, t, n) {
        let r = J3(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function Jw(e, t, n, r) {
                let c = e.length;
                if (c == t) e.push(n, r);
                else if (1 === c) e.push(r, e[0]), (e[0] = n);
                else {
                  for (c--, e.push(e[c - 1], e[c]); c > t; ) (e[c] = e[c - 2]), c--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Sc(e, t) {
        const n = J3(e, t);
        if (n >= 0) return e[1 | n];
      }
      function J3(e, t) {
        return (function W5(e, t, n) {
          let r = 0,
            c = e.length >> n;
          for (; c !== r; ) {
            const a = r + ((c - r) >> 1),
              i = e[a << n];
            if (t === i) return a << n;
            i > t ? (c = a) : (r = a + 1);
          }
          return ~(c << n);
        })(e, t, 1);
      }
      const ut = J4(Z3('Optional'), 8),
        dt = J4(Z3('SkipSelf'), 4);
      var m1 = (() => (
        ((m1 = m1 || {})[(m1.Important = 1)] = 'Important'), (m1[(m1.DashCase = 2)] = 'DashCase'), m1
      ))();
      const kc = new Map();
      let Vb = 0;
      const Ic = '__ngContext__';
      function K2(e, t) {
        z1(t)
          ? ((e[Ic] = t[rt]),
            (function zb(e) {
              kc.set(e[rt], e);
            })(t))
          : (e[Ic] = t);
      }
      let Rc;
      function Fc(e, t) {
        return Rc(e, t);
      }
      function gt(e) {
        const t = e[H2];
        return U1(t) ? t[H2] : t;
      }
      function Pc(e) {
        return d7(e[tt]);
      }
      function Oc(e) {
        return d7(e[B1]);
      }
      function d7(e) {
        for (; null !== e && !U1(e); ) e = e[B1];
        return e;
      }
      function t4(e, t, n, r, c) {
        if (null != r) {
          let a,
            i = !1;
          U1(r) ? (a = r) : z1(r) && ((i = !0), (r = r[Le]));
          const s = U2(r);
          0 === e && null !== n
            ? null == c
              ? C7(t, n, s)
              : C3(t, n, s, c || null, !0)
            : 1 === e && null !== n
            ? C3(t, n, s, c || null, !0)
            : 2 === e
            ? (function qc(e, t, n) {
                const r = hn(e, t);
                r &&
                  (function jb(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, s, i)
            : 3 === e && t.destroyNode(s),
            null != a &&
              (function Wb(e, t, n, r, c) {
                const a = n[Y6];
                a !== U2(n) && t4(t, e, r, a, c);
                for (let s = r1; s < n.length; s++) {
                  const o = n[s];
                  vt(o[L], o, e, t, r, a);
                }
              })(t, e, a, n, c);
        }
      }
      function Uc(e, t, n) {
        return e.createElement(t, n);
      }
      function p7(e, t) {
        const n = e[$3],
          r = n.indexOf(t),
          c = t[H2];
        512 & t[$] && ((t[$] &= -513), oc(c, -1)), n.splice(r, 1);
      }
      function jc(e, t) {
        if (e.length <= r1) return;
        const n = r1 + t,
          r = e[n];
        if (r) {
          const c = r[nt];
          null !== c && c !== e && p7(c, r), t > 0 && (e[n - 1][B1] = r[B1]);
          const a = ln(e, r1 + t);
          !(function Tb(e, t) {
            vt(e, t, t[Y], 2, null, null), (t[Le] = null), (t[Y2] = null);
          })(r[L], r);
          const i = a[ae];
          null !== i && i.detachView(a[L]), (r[H2] = null), (r[B1] = null), (r[$] &= -65);
        }
        return r;
      }
      function m7(e, t) {
        if (!(128 & t[$])) {
          const n = t[Y];
          n.destroyNode && vt(e, t, n, 3, null, null),
            (function Fb(e) {
              let t = e[tt];
              if (!t) return $c(e[L], e);
              for (; t; ) {
                let n = null;
                if (z1(t)) n = t[tt];
                else {
                  const r = t[r1];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[B1] && t !== e; ) z1(t) && $c(t[L], t), (t = t[H2]);
                  null === t && (t = e), z1(t) && $c(t[L], t), (n = t && t[B1]);
                }
                t = n;
              }
            })(t);
        }
      }
      function $c(e, t) {
        if (!(128 & t[$])) {
          (t[$] &= -65),
            (t[$] |= 128),
            (function Ub(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const c = t[n[r]];
                  if (!(c instanceof it)) {
                    const a = n[r + 1];
                    if (Array.isArray(a))
                      for (let i = 0; i < a.length; i += 2) {
                        const s = c[a[i]],
                          o = a[i + 1];
                        k1(4, s, o);
                        try {
                          o.call(s);
                        } finally {
                          k1(5, s, o);
                        }
                      }
                    else {
                      k1(4, c, a);
                      try {
                        a.call(c);
                      } finally {
                        k1(5, c, a);
                      }
                    }
                  }
                }
            })(e, t),
            (function Bb(e, t) {
              const n = e.cleanup,
                r = t[B3];
              let c = -1;
              if (null !== n)
                for (let a = 0; a < n.length - 1; a += 2)
                  if ('string' == typeof n[a]) {
                    const i = n[a + 3];
                    i >= 0 ? r[(c = i)]() : r[(c = -i)].unsubscribe(), (a += 2);
                  } else {
                    const i = r[(c = n[a + 1])];
                    n[a].call(i);
                  }
              if (null !== r) {
                for (let a = c + 1; a < r.length; a++) (0, r[a])();
                t[B3] = null;
              }
            })(e, t),
            1 === t[L].type && t[Y].destroy();
          const n = t[nt];
          if (null !== n && U1(t[H2])) {
            n !== t[H2] && p7(n, t);
            const r = t[ae];
            null !== r && r.detachView(e);
          }
          !(function Lb(e) {
            kc.delete(e[rt]);
          })(t);
        }
      }
      function g7(e, t, n) {
        return (function v7(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Le];
          {
            const { componentOffset: c } = r;
            if (c > -1) {
              const { encapsulation: a } = e.data[r.directiveStart + c];
              if (a === ce.None || a === ce.Emulated) return null;
            }
            return L1(r, n);
          }
        })(e, t.parent, n);
      }
      function C3(e, t, n, r, c) {
        e.insertBefore(t, n, r, c);
      }
      function C7(e, t, n) {
        e.appendChild(t, n);
      }
      function M7(e, t, n, r, c) {
        null !== r ? C3(e, t, n, r, c) : C7(e, t, n);
      }
      function hn(e, t) {
        return e.parentNode(t);
      }
      function H7(e, t, n) {
        return y7(e, t, n);
      }
      let Gc,
        gn,
        Kc,
        vn,
        y7 = function V7(e, t, n) {
          return 40 & e.type ? L1(e, n) : null;
        };
      function pn(e, t, n, r) {
        const c = g7(e, r, t),
          a = t[Y],
          s = H7(r.parent || t[Y2], r, t);
        if (null != c)
          if (Array.isArray(n)) for (let o = 0; o < n.length; o++) M7(a, c, n[o], s, !1);
          else M7(a, c, n, s, !1);
        void 0 !== Gc && Gc(a, r, t, n, c);
      }
      function mn(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return L1(t, e);
          if (4 & n) return Wc(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return mn(e, r);
            {
              const c = e[t.index];
              return U1(c) ? Wc(-1, c) : U2(c);
            }
          }
          if (32 & n) return Fc(t, e)() || U2(e[t.index]);
          {
            const r = L7(e, t);
            return null !== r ? (Array.isArray(r) ? r[0] : mn(gt(e[X2]), r)) : mn(e, t.next);
          }
        }
        return null;
      }
      function L7(e, t) {
        return null !== t ? e[X2][Y2].projection[t.projection] : null;
      }
      function Wc(e, t) {
        const n = r1 + e + 1;
        if (n < t.length) {
          const r = t[n],
            c = r[L].firstChild;
          if (null !== c) return mn(r, c);
        }
        return t[Y6];
      }
      function Yc(e, t, n, r, c, a, i) {
        for (; null != n; ) {
          const s = r[n.index],
            o = n.type;
          if ((i && 0 === t && (s && K2(U2(s), r), (n.flags |= 2)), 32 != (32 & n.flags)))
            if (8 & o) Yc(e, t, n.child, r, c, a, !1), t4(t, e, c, s, a);
            else if (32 & o) {
              const l = Fc(n, r);
              let f;
              for (; (f = l()); ) t4(t, e, c, f, a);
              t4(t, e, c, s, a);
            } else 16 & o ? w7(e, t, r, n, c, a) : t4(t, e, c, s, a);
          n = i ? n.projectionNext : n.next;
        }
      }
      function vt(e, t, n, r, c, a) {
        Yc(n, r, e.firstChild, t, c, a, !1);
      }
      function w7(e, t, n, r, c, a) {
        const i = n[X2],
          o = i[Y2].projection[r.projection];
        if (Array.isArray(o)) for (let l = 0; l < o.length; l++) t4(t, e, c, o[l], a);
        else Yc(e, t, o, i[H2], c, a, !0);
      }
      function b7(e, t, n) {
        '' === n ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
      }
      function D7(e, t, n) {
        const { mergedAttrs: r, classes: c, styles: a } = n;
        null !== r && Hc(e, t, r),
          null !== c && b7(e, t, c),
          null !== a &&
            (function Yb(e, t, n) {
              e.setAttribute(t, 'style', n);
            })(e, t, a);
      }
      function n4(e) {
        return (
          (function Xc() {
            if (void 0 === gn && ((gn = null), h2.trustedTypes))
              try {
                gn = h2.trustedTypes.createPolicy('angular', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return gn;
          })()?.createHTML(e) || e
        );
      }
      function Qc() {
        if (void 0 === vn && ((vn = null), h2.trustedTypes))
          try {
            vn = h2.trustedTypes.createPolicy('angular#unsafe-bypass', {
              createHTML: (e) => e,
              createScript: (e) => e,
              createScriptURL: (e) => e,
            });
          } catch {}
        return vn;
      }
      function x7(e) {
        return Qc()?.createHTML(e) || e;
      }
      function N7(e) {
        return Qc()?.createScriptURL(e) || e;
      }
      class M3 {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${R6})`;
        }
      }
      class Jb extends M3 {
        getTypeName() {
          return 'HTML';
        }
      }
      class eD extends M3 {
        getTypeName() {
          return 'Style';
        }
      }
      class tD extends M3 {
        getTypeName() {
          return 'Script';
        }
      }
      class nD extends M3 {
        getTypeName() {
          return 'URL';
        }
      }
      class rD extends M3 {
        getTypeName() {
          return 'ResourceURL';
        }
      }
      function b1(e) {
        return e instanceof M3 ? e.changingThisBreaksApplicationSecurity : e;
      }
      function oe(e, t) {
        const n = (function cD(e) {
          return (e instanceof M3 && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ('ResourceURL' === n && 'URL' === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${R6})`);
        }
        return n === t;
      }
      class fD {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t;
          try {
            const n = new window.DOMParser().parseFromString(n4(t), 'text/html').body;
            return null === n ? this.inertDocumentHelper.getInertBodyElement(t) : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class uD {
        constructor(t) {
          (this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument('sanitization-inert'));
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement('template');
          return (n.innerHTML = n4(t)), n;
        }
      }
      const hD = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      function Cn(e) {
        return (e = String(e)).match(hD) ? e : 'unsafe:' + e;
      }
      function De(e) {
        const t = {};
        for (const n of e.split(',')) t[n] = !0;
        return t;
      }
      function Ct(...e) {
        const t = {};
        for (const n of e) for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const E7 = De('area,br,col,hr,img,wbr'),
        k7 = De('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        T7 = De('rp,rt'),
        Zc = Ct(
          E7,
          Ct(
            k7,
            De(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul',
            ),
          ),
          Ct(
            T7,
            De(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video',
            ),
          ),
          Ct(T7, k7),
        ),
        Jc = De('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        I7 = Ct(
          Jc,
          De(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width',
          ),
          De(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext',
          ),
        ),
        pD = De('script,style,template');
      class mD {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let c = this.checkClobberedElement(n, n.nextSibling);
                if (c) {
                  n = c;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join('');
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase();
          if (!Zc.hasOwnProperty(n)) return (this.sanitizedSomething = !0), !pD.hasOwnProperty(n);
          this.buf.push('<'), this.buf.push(n);
          const r = t.attributes;
          for (let c = 0; c < r.length; c++) {
            const a = r.item(c),
              i = a.name,
              s = i.toLowerCase();
            if (!I7.hasOwnProperty(s)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = a.value;
            Jc[s] && (o = Cn(o)), this.buf.push(' ', i, '="', R7(o), '"');
          }
          return this.buf.push('>'), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          Zc.hasOwnProperty(n) && !E7.hasOwnProperty(n) && (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
        }
        chars(t) {
          this.buf.push(R7(t));
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`);
          return n;
        }
      }
      const gD = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        vD = /([^\#-~ |!])/g;
      function R7(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(gD, function (t) {
            return '&#' + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ';';
          })
          .replace(vD, function (t) {
            return '&#' + t.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let Mn;
      function F7(e, t) {
        let n = null;
        try {
          Mn =
            Mn ||
            (function A7(e) {
              const t = new uD(e);
              return (function dD() {
                try {
                  return !!new window.DOMParser().parseFromString(n4(''), 'text/html');
                } catch {
                  return !1;
                }
              })()
                ? new fD(t)
                : t;
            })(e);
          let r = t ? String(t) : '';
          n = Mn.getInertBodyElement(r);
          let c = 5,
            a = r;
          do {
            if (0 === c) throw new Error('Failed to sanitize html because the input is unstable');
            c--, (r = a), (a = n.innerHTML), (n = Mn.getInertBodyElement(r));
          } while (r !== a);
          return n4(new mD().sanitizeChildren(e8(n) || n));
        } finally {
          if (n) {
            const r = e8(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
          }
        }
      }
      function e8(e) {
        return 'content' in e &&
          (function CD(e) {
            return e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName;
          })(e)
          ? e.content
          : null;
      }
      var u2 = (() => (
        ((u2 = u2 || {})[(u2.NONE = 0)] = 'NONE'),
        (u2[(u2.HTML = 1)] = 'HTML'),
        (u2[(u2.STYLE = 2)] = 'STYLE'),
        (u2[(u2.SCRIPT = 3)] = 'SCRIPT'),
        (u2[(u2.URL = 4)] = 'URL'),
        (u2[(u2.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        u2
      ))();
      function P7(e) {
        const t = Mt();
        return t
          ? x7(t.sanitize(u2.HTML, e) || '')
          : oe(e, 'HTML')
          ? x7(b1(e))
          : F7(
              (function S7() {
                return void 0 !== Kc ? Kc : typeof document < 'u' ? document : void 0;
              })(),
              O(e),
            );
      }
      function H3(e) {
        const t = Mt();
        return t ? t.sanitize(u2.URL, e) || '' : oe(e, 'URL') ? b1(e) : Cn(O(e));
      }
      function O7(e) {
        const t = Mt();
        if (t) return N7(t.sanitize(u2.RESOURCE_URL, e) || '');
        if (oe(e, 'ResourceURL')) return N7(b1(e));
        throw new y(904, !1);
      }
      function Mt() {
        const e = H();
        return e && e[cc];
      }
      const Hn = new S('ENVIRONMENT_INITIALIZER'),
        U7 = new S('INJECTOR', -1),
        j7 = new S('INJECTOR_DEF_TYPES');
      class $7 {
        get(t, n = Q4) {
          if (n === Q4) {
            const r = new Error(`NullInjectorError: No provider for ${l2(t)}!`);
            throw ((r.name = 'NullInjectorError'), r);
          }
          return n;
        }
      }
      function wD(...e) {
        return { ɵproviders: G7(0, e), ɵfromNgModule: !0 };
      }
      function G7(e, ...t) {
        const n = [],
          r = new Set();
        let c;
        return (
          v3(t, (a) => {
            const i = a;
            t8(i, n, [], r) && (c || (c = []), c.push(i));
          }),
          void 0 !== c && W7(c, n),
          n
        );
      }
      function W7(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: c } = e[n];
          n8(c, (a) => {
            t.push(a);
          });
        }
      }
      function t8(e, t, n, r) {
        if (!(e = k(e))) return !1;
        let c = null,
          a = Yo(e);
        const i = !a && r2(e);
        if (a || i) {
          if (i && !i.standalone) return !1;
          c = e;
        } else {
          const o = e.ngModule;
          if (((a = Yo(o)), !a)) return !1;
          c = o;
        }
        const s = r.has(c);
        if (i) {
          if (s) return !1;
          if ((r.add(c), i.dependencies)) {
            const o = 'function' == typeof i.dependencies ? i.dependencies() : i.dependencies;
            for (const l of o) t8(l, t, n, r);
          }
        } else {
          if (!a) return !1;
          {
            if (null != a.imports && !s) {
              let l;
              r.add(c);
              try {
                v3(a.imports, (f) => {
                  t8(f, t, n, r) && (l || (l = []), l.push(f));
                });
              } finally {
              }
              void 0 !== l && W7(l, t);
            }
            if (!s) {
              const l = p3(c) || (() => new c());
              t.push(
                { provide: c, useFactory: l, deps: J },
                { provide: j7, useValue: c, multi: !0 },
                { provide: Hn, useValue: () => D(c), multi: !0 },
              );
            }
            const o = a.providers;
            null == o ||
              s ||
              n8(o, (f) => {
                t.push(f);
              });
          }
        }
        return c !== e && void 0 !== e.providers;
      }
      function n8(e, t) {
        for (let n of e) Qr(n) && (n = n.ɵproviders), Array.isArray(n) ? n8(n, t) : t(n);
      }
      const bD = s2({ provide: String, useValue: s2 });
      function r8(e) {
        return null !== e && 'object' == typeof e && bD in e;
      }
      function V3(e) {
        return 'function' == typeof e;
      }
      const c8 = new S('Set Injector scope.'),
        Vn = {},
        SD = {};
      let a8;
      function yn() {
        return void 0 === a8 && (a8 = new $7()), a8;
      }
      class le {}
      class X7 extends le {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, c) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = c),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            s8(t, (i) => this.processProvider(i)),
            this.records.set(U7, r4(void 0, this)),
            c.has('environment') && this.records.set(le, r4(void 0, this));
          const a = this.records.get(c8);
          null != a && 'string' == typeof a.value && this.scopes.add(a.value),
            (this.injectorDefTypes = new Set(this.get(j7.multi, J, T.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = P3(this),
            r = E1(void 0);
          try {
            return t();
          } finally {
            P3(n), E1(r);
          }
        }
        get(t, n = Q4, r = T.Default) {
          this.assertNotDestroyed(), (r = j6(r));
          const c = P3(this),
            a = E1(void 0);
          try {
            if (!(r & T.SkipSelf)) {
              let s = this.records.get(t);
              if (void 0 === s) {
                const o =
                  (function ED(e) {
                    return 'function' == typeof e || ('object' == typeof e && e instanceof S);
                  })(t) && O6(t);
                (s = o && this.injectableDefInScope(o) ? r4(i8(t), Vn) : null), this.records.set(t, s);
              }
              if (null != s) return this.hydrate(t, s);
            }
            return (r & T.Self ? yn() : this.parent).get(t, (n = r & T.Optional && n === Q4 ? null : n));
          } catch (i) {
            if ('NullInjectorError' === i.name) {
              if (((i[U6] = i[U6] || []).unshift(l2(t)), c)) throw i;
              return (function rw(e, t, n, r) {
                const c = e[U6];
                throw (
                  (t[Qo] && c.unshift(t[Qo]),
                  (e.message = (function cw(e, t, n, r = null) {
                    e = e && '\n' === e.charAt(0) && e.charAt(1) == ew ? e.slice(2) : e;
                    let c = l2(t);
                    if (Array.isArray(t)) c = t.map(l2).join(' -> ');
                    else if ('object' == typeof t) {
                      let a = [];
                      for (let i in t)
                        if (t.hasOwnProperty(i)) {
                          let s = t[i];
                          a.push(i + ':' + ('string' == typeof s ? JSON.stringify(s) : l2(s)));
                        }
                      c = `{${a.join(', ')}}`;
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${c}]: ${e.replace(JL, '\n  ')}`;
                  })('\n' + e.message, c, n, r)),
                  (e[ZL] = c),
                  (e[U6] = null),
                  e)
                );
              })(i, t, 'R3InjectorError', this.source);
            }
            throw i;
          } finally {
            E1(a), P3(c);
          }
        }
        resolveInjectorInitializers() {
          const t = P3(this),
            n = E1(void 0);
          try {
            const r = this.get(Hn.multi, J, T.Self);
            for (const c of r) c();
          } finally {
            P3(t), E1(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(l2(r));
          return `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new y(205, !1);
        }
        processProvider(t) {
          let n = V3((t = k(t))) ? t : k(t && t.provide);
          const r = (function _D(e) {
            return r8(e) ? r4(void 0, e.useValue) : r4(K7(e), Vn);
          })(t);
          if (V3(t) || !0 !== t.multi) this.records.get(n);
          else {
            let c = this.records.get(n);
            c || ((c = r4(void 0, Vn, !0)), (c.factory = () => tc(c.multi)), this.records.set(n, c)),
              (n = t),
              c.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Vn && ((n.value = SD), (n.value = n.factory())),
            'object' == typeof n.value &&
              n.value &&
              (function AD(e) {
                return null !== e && 'object' == typeof e && 'function' == typeof e.ngOnDestroy;
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = k(t.providedIn);
          return 'string' == typeof n ? 'any' === n || this.scopes.has(n) : this.injectorDefTypes.has(n);
        }
      }
      function i8(e) {
        const t = O6(e),
          n = null !== t ? t.factory : p3(e);
        if (null !== n) return n;
        if (e instanceof S) throw new y(204, !1);
        if (e instanceof Function)
          return (function xD(e) {
            const t = e.length;
            if (t > 0) throw (ft(t, '?'), new y(204, !1));
            const n = (function XL(e) {
              return (e && (e[B6] || e[Xo])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new y(204, !1);
      }
      function K7(e, t, n) {
        let r;
        if (V3(e)) {
          const c = k(e);
          return p3(c) || i8(c);
        }
        if (r8(e)) r = () => k(e.useValue);
        else if (
          (function Y7(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...tc(e.deps || []));
        else if (
          (function q7(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => D(k(e.useExisting));
        else {
          const c = k(e && (e.useClass || e.provide));
          if (
            !(function ND(e) {
              return !!e.deps;
            })(e)
          )
            return p3(c) || i8(c);
          r = () => new c(...tc(e.deps));
        }
        return r;
      }
      function r4(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function s8(e, t) {
        for (const n of e) Array.isArray(n) ? s8(n, t) : n && Qr(n) ? s8(n.ɵproviders, t) : t(n);
      }
      class kD {}
      class Q7 {}
      class ID {
        resolveComponentFactory(t) {
          throw (function TD(e) {
            const t = Error(`No component factory found for ${l2(e)}. Did you add it to @NgModule.entryComponents?`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ht = (() => {
        class e {}
        return (e.NULL = new ID()), e;
      })();
      function RD() {
        return c4(j2(), H());
      }
      function c4(e, t) {
        return new v1(L1(e, t));
      }
      let v1 = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = RD), e;
      })();
      function FD(e) {
        return e instanceof v1 ? e.nativeElement : e;
      }
      class J7 {}
      let fe = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function PD() {
                const e = H(),
                  n = p1(j2().index, e);
                return (z1(n) ? n : e)[Y];
              })()),
            e
          );
        })(),
        OD = (() => {
          class e {}
          return (e.ɵprov = _({ token: e, providedIn: 'root', factory: () => null })), e;
        })();
      class Vt {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const BD = new Vt('15.2.9'),
        o8 = {},
        l8 = 'ngOriginalError';
      function f8(e) {
        return e[l8];
      }
      class a4 {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error('ERROR', t), n && this._console.error('ORIGINAL ERROR', n);
        }
        _findOriginalError(t) {
          let n = t && f8(t);
          for (; n && f8(n); ) n = f8(n);
          return n || null;
        }
      }
      function Se(e) {
        return e instanceof Function ? e() : e;
      }
      function tl(e, t, n) {
        let r = e.length;
        for (;;) {
          const c = e.indexOf(t, n);
          if (-1 === c) return c;
          if (0 === c || e.charCodeAt(c - 1) <= 32) {
            const a = t.length;
            if (c + a === r || e.charCodeAt(c + a) <= 32) return c;
          }
          n = c + 1;
        }
      }
      const nl = 'ng-template';
      function ZD(e, t, n) {
        let r = 0,
          c = !0;
        for (; r < e.length; ) {
          let a = e[r++];
          if ('string' == typeof a && c) {
            const i = e[r++];
            if (n && 'class' === a && -1 !== tl(i.toLowerCase(), t, 0)) return !0;
          } else {
            if (1 === a) {
              for (; r < e.length && 'string' == typeof (a = e[r++]); ) if (a.toLowerCase() === t) return !0;
              return !1;
            }
            'number' == typeof a && (c = !1);
          }
        }
        return !1;
      }
      function rl(e) {
        return 4 === e.type && e.value !== nl;
      }
      function JD(e, t, n) {
        return t === (4 !== e.type || n ? e.value : nl);
      }
      function eS(e, t, n) {
        let r = 4;
        const c = e.attrs || [],
          a = (function rS(e) {
            for (let t = 0; t < e.length; t++) if (_5(e[t])) return t;
            return e.length;
          })(c);
        let i = !1;
        for (let s = 0; s < t.length; s++) {
          const o = t[s];
          if ('number' != typeof o) {
            if (!i)
              if (4 & r) {
                if (((r = 2 | (1 & r)), ('' !== o && !JD(e, o, n)) || ('' === o && 1 === t.length))) {
                  if ($1(r)) return !1;
                  i = !0;
                }
              } else {
                const l = 8 & r ? o : t[++s];
                if (8 & r && null !== e.attrs) {
                  if (!ZD(e.attrs, l, n)) {
                    if ($1(r)) return !1;
                    i = !0;
                  }
                  continue;
                }
                const u = tS(8 & r ? 'class' : o, c, rl(e), n);
                if (-1 === u) {
                  if ($1(r)) return !1;
                  i = !0;
                  continue;
                }
                if ('' !== l) {
                  let d;
                  d = u > a ? '' : c[u + 1].toLowerCase();
                  const h = 8 & r ? d : null;
                  if ((h && -1 !== tl(h, l, 0)) || (2 & r && l !== d)) {
                    if ($1(r)) return !1;
                    i = !0;
                  }
                }
              }
          } else {
            if (!i && !$1(r) && !$1(o)) return !1;
            if (i && $1(o)) continue;
            (i = !1), (r = o | (1 & r));
          }
        }
        return $1(r) || i;
      }
      function $1(e) {
        return 0 == (1 & e);
      }
      function tS(e, t, n, r) {
        if (null === t) return -1;
        let c = 0;
        if (r || !n) {
          let a = !1;
          for (; c < t.length; ) {
            const i = t[c];
            if (i === e) return c;
            if (3 === i || 6 === i) a = !0;
            else {
              if (1 === i || 2 === i) {
                let s = t[++c];
                for (; 'string' == typeof s; ) s = t[++c];
                continue;
              }
              if (4 === i) break;
              if (0 === i) {
                c += 4;
                continue;
              }
            }
            c += a ? 1 : 2;
          }
          return -1;
        }
        return (function cS(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ('number' == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function cl(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (eS(e, t[r], n)) return !0;
        return !1;
      }
      function aS(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let c = 0; c < e.length; c++) if (e[c] !== r[c]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function al(e, t) {
        return e ? ':not(' + t.trim() + ')' : t;
      }
      function iS(e) {
        let t = e[0],
          n = 1,
          r = 2,
          c = '',
          a = !1;
        for (; n < e.length; ) {
          let i = e[n];
          if ('string' == typeof i)
            if (2 & r) {
              const s = e[++n];
              c += '[' + i + (s.length > 0 ? '="' + s + '"' : '') + ']';
            } else 8 & r ? (c += '.' + i) : 4 & r && (c += ' ' + i);
          else '' !== c && !$1(i) && ((t += al(a, c)), (c = '')), (r = i), (a = a || !$1(r));
          n++;
        }
        return '' !== c && (t += al(a, c)), t;
      }
      const U = {};
      function e2(e) {
        il(Z(), H(), i1() + e, !1);
      }
      function il(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[$])) {
            const a = e.preOrderCheckHooks;
            null !== a && en(t, a, n);
          } else {
            const a = e.preOrderHooks;
            null !== a && tn(t, a, 0, n);
          }
        m3(n);
      }
      function fl(e, t = null, n = null, r) {
        const c = ul(e, t, n, r);
        return c.resolveInjectorInitializers(), c;
      }
      function ul(e, t = null, n = null, r, c = new Set()) {
        const a = [n || J, wD(e)];
        return (r = r || ('object' == typeof e ? void 0 : l2(e))), new X7(a, t || yn(), r || null, c);
      }
      let G1 = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return fl({ name: '' }, r, n, '');
            {
              const c = n.name ?? '';
              return fl({ name: c }, n.parent, n.providers, c);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Q4),
          (e.NULL = new $7()),
          (e.ɵprov = _({ token: e, providedIn: 'any', factory: () => D(U7) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function M(e, t = T.Default) {
        const n = H();
        return null === n ? D(e, t) : P5(j2(), n, k(e), t);
      }
      function Ml(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const a = n[r + 1];
            if (-1 !== a) {
              const i = e.data[a];
              mc(n[r]), i.contentQueries(2, t[a], a);
            }
          }
      }
      function Ln(e, t, n, r, c, a, i, s, o, l, f) {
        const u = t.blueprint.slice();
        return (
          (u[Le] = c),
          (u[$] = 76 | r),
          (null !== f || (e && 1024 & e[$])) && (u[$] |= 1024),
          p5(u),
          (u[H2] = u[U3] = e),
          (u[w2] = n),
          (u[q6] = i || (e && e[q6])),
          (u[Y] = s || (e && e[Y])),
          (u[cc] = o || (e && e[cc]) || null),
          (u[W6] = l || (e && e[W6]) || null),
          (u[Y2] = a),
          (u[rt] = (function yb() {
            return Vb++;
          })()),
          (u[c5] = f),
          (u[X2] = 2 == t.type ? e[X2] : u),
          u
        );
      }
      function o4(e, t, n, r, c) {
        let a = e.data[t];
        if (null === a)
          (a = (function m8(e, t, n, r, c) {
            const a = v5(),
              i = uc(),
              o = (e.data[t] = (function AS(e, t, n, r, c, a) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: c,
                  attrs: a,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, i ? a : a && a.parent, n, t, r, c));
            return (
              null === e.firstChild && (e.firstChild = o),
              null !== a &&
                (i
                  ? null == a.child && null !== o.parent && (a.child = o)
                  : null === a.next && ((a.next = o), (o.prev = a))),
              o
            );
          })(e, t, n, r, c)),
            (function Sw() {
              return B.lFrame.inI18n;
            })() && (a.flags |= 32);
        else if (64 & a.type) {
          (a.type = n), (a.value = r), (a.attrs = c);
          const i = (function at() {
            const e = B.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          a.injectorIndex = null === i ? -1 : i.injectorIndex;
        }
        return ie(a, !0), a;
      }
      function yt(e, t, n, r) {
        if (0 === n) return -1;
        const c = t.length;
        for (let a = 0; a < n; a++) t.push(r), e.blueprint.push(r), e.data.push(null);
        return c;
      }
      function g8(e, t, n) {
        gc(t);
        try {
          const r = e.viewQuery;
          null !== r && w8(1, r, n);
          const c = e.template;
          null !== c && Hl(e, t, c, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Ml(e, t),
            e.staticViewQueries && w8(2, e.viewQuery, n);
          const a = e.components;
          null !== a &&
            (function xS(e, t) {
              for (let n = 0; n < t.length; n++) ZS(e, t[n]);
            })(t, a);
        } catch (r) {
          throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), r);
        } finally {
          (t[$] &= -5), vc();
        }
      }
      function wn(e, t, n, r) {
        const c = t[$];
        if (128 != (128 & c)) {
          gc(t);
          try {
            p5(t),
              (function M5(e) {
                return (B.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Hl(e, t, n, 2, r);
            const i = 3 == (3 & c);
            if (i) {
              const l = e.preOrderCheckHooks;
              null !== l && en(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && tn(t, l, 0, null), Cc(t, 0);
            }
            if (
              ((function KS(e) {
                for (let t = Pc(e); null !== t; t = Oc(t)) {
                  if (!t[a5]) continue;
                  const n = t[$3];
                  for (let r = 0; r < n.length; r++) {
                    const c = n[r];
                    512 & c[$] || oc(c[H2], 1), (c[$] |= 512);
                  }
                }
              })(t),
              (function XS(e) {
                for (let t = Pc(e); null !== t; t = Oc(t))
                  for (let n = r1; n < t.length; n++) {
                    const r = t[n],
                      c = r[L];
                    Z6(r) && wn(c, r, c.template, r[w2]);
                  }
              })(t),
              null !== e.contentQueries && Ml(e, t),
              i)
            ) {
              const l = e.contentCheckHooks;
              null !== l && en(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && tn(t, l, 1), Cc(t, 1);
            }
            !(function DS(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const c = n[r];
                    if (c < 0) m3(~c);
                    else {
                      const a = c,
                        i = n[++r],
                        s = n[++r];
                      xw(i, a), s(2, t[a]);
                    }
                  }
                } finally {
                  m3(-1);
                }
            })(e, t);
            const s = e.components;
            null !== s &&
              (function SS(e, t) {
                for (let n = 0; n < t.length; n++) QS(e, t[n]);
              })(t, s);
            const o = e.viewQuery;
            if ((null !== o && w8(2, o, r), i)) {
              const l = e.viewCheckHooks;
              null !== l && en(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && tn(t, l, 2), Cc(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[$] &= -41),
              512 & t[$] && ((t[$] &= -513), oc(t[H2], -1));
          } finally {
            vc();
          }
        }
      }
      function Hl(e, t, n, r, c) {
        const a = i1(),
          i = 2 & r;
        try {
          m3(-1), i && t.length > p2 && il(e, t, p2, !1), k1(i ? 2 : 0, c), n(r, c);
        } finally {
          m3(a), k1(i ? 3 : 1, c);
        }
      }
      function v8(e, t, n) {
        if (ic(t)) {
          const c = t.directiveEnd;
          for (let a = t.directiveStart; a < c; a++) {
            const i = e.data[a];
            i.contentQueries && i.contentQueries(1, n[a], a);
          }
        }
      }
      function C8(e, t, n) {
        g5() &&
          ((function PS(e, t, n, r) {
            const c = n.directiveStart,
              a = n.directiveEnd;
            ct(n) &&
              (function WS(e, t, n) {
                const r = L1(t, e),
                  c = Vl(n),
                  a = e[q6],
                  i = bn(e, Ln(e, c, null, n.onPush ? 32 : 16, r, t, a, a.createRenderer(r, n), null, null, null));
                e[t.index] = i;
              })(t, n, e.data[c + n.componentOffset]),
              e.firstCreatePass || an(n, t),
              K2(r, t);
            const i = n.initialInputs;
            for (let s = c; s < a; s++) {
              const o = e.data[s],
                l = g3(t, e, s, n);
              K2(l, t), null !== i && qS(0, s - c, l, o, 0, i), j1(o) && (p1(n.index, t)[w2] = g3(t, e, s, n));
            }
          })(e, t, n, L1(n, t)),
          64 == (64 & n.flags) && bl(e, t, n));
      }
      function M8(e, t, n = L1) {
        const r = t.localNames;
        if (null !== r) {
          let c = t.index + 1;
          for (let a = 0; a < r.length; a += 2) {
            const i = r[a + 1],
              s = -1 === i ? n(t, e) : e[i];
            e[c++] = s;
          }
        }
      }
      function Vl(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = H8(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
            ))
          : t;
      }
      function H8(e, t, n, r, c, a, i, s, o, l) {
        const f = p2 + r,
          u = f + c,
          d = (function _S(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : U);
            return n;
          })(f, u),
          h = 'function' == typeof l ? l() : l;
        return (d[L] = {
          type: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: s,
          declTNode: t,
          data: d.slice().fill(null, f),
          bindingStartIndex: f,
          expandoStartIndex: u,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof a ? a() : a,
          pipeRegistry: 'function' == typeof i ? i() : i,
          firstChild: null,
          schemas: o,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function yl(e, t, n, r) {
        const c = Sl(t);
        null === n ? c.push(r) : (c.push(n), e.firstCreatePass && xl(e).push(r, c.length - 1));
      }
      function zl(e, t, n, r) {
        for (let c in e)
          if (e.hasOwnProperty(c)) {
            n = null === n ? {} : n;
            const a = e[c];
            null === r ? Ll(n, t, c, a) : r.hasOwnProperty(c) && Ll(n, t, r[c], a);
          }
        return n;
      }
      function Ll(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function D1(e, t, n, r, c, a, i, s) {
        const o = L1(t, n);
        let f,
          l = t.inputs;
        !s && null != l && (f = l[r])
          ? (b8(e, n, f, r, c),
            ct(t) &&
              (function TS(e, t) {
                const n = p1(t, e);
                16 & n[$] || (n[$] |= 32);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function kS(e) {
              return 'class' === e
                ? 'className'
                : 'for' === e
                ? 'htmlFor'
                : 'formaction' === e
                ? 'formAction'
                : 'innerHtml' === e
                ? 'innerHTML'
                : 'readonly' === e
                ? 'readOnly'
                : 'tabindex' === e
                ? 'tabIndex'
                : e;
            })(r)),
            (c = null != i ? i(c, t.value || '', r) : c),
            a.setProperty(o, r, c));
      }
      function V8(e, t, n, r) {
        if (g5()) {
          const c = null === r ? null : { '': -1 },
            a = (function BS(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                c = null;
              if (n)
                for (let a = 0; a < n.length; a++) {
                  const i = n[a];
                  if (cl(t, i.selectors, !1))
                    if ((r || (r = []), j1(i)))
                      if (null !== i.findHostDirectiveDefs) {
                        const s = [];
                        (c = c || new Map()), i.findHostDirectiveDefs(i, s, c), r.unshift(...s, i), y8(e, t, s.length);
                      } else r.unshift(i), y8(e, t, 0);
                    else (c = c || new Map()), i.findHostDirectiveDefs?.(i, r, c), r.push(i);
                }
              return null === r ? null : [r, c];
            })(e, n);
          let i, s;
          null === a ? (i = s = null) : ([i, s] = a),
            null !== i && wl(e, t, n, i, c, s),
            c &&
              (function US(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let c = 0; c < t.length; c += 2) {
                    const a = n[t[c + 1]];
                    if (null == a) throw new y(-301, !1);
                    r.push(t[c], a);
                  }
                }
              })(n, r, c);
        }
        n.mergedAttrs = st(n.mergedAttrs, n.attrs);
      }
      function wl(e, t, n, r, c, a) {
        for (let l = 0; l < r.length; l++) Lc(an(n, t), e, r[l].type);
        !(function $S(e, t, n) {
          (e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const f = r[l];
          f.providersResolver && f.providersResolver(f);
        }
        let i = !1,
          s = !1,
          o = yt(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const f = r[l];
          (n.mergedAttrs = st(n.mergedAttrs, f.hostAttrs)),
            GS(e, n, t, o, f),
            jS(o, f, c),
            null !== f.contentQueries && (n.flags |= 4),
            (null !== f.hostBindings || null !== f.hostAttrs || 0 !== f.hostVars) && (n.flags |= 64);
          const u = f.type.prototype;
          !i &&
            (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index), (i = !0)),
            !s &&
              (u.ngOnChanges || u.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(n.index), (s = !0)),
            o++;
        }
        !(function ES(e, t, n) {
          const c = t.directiveEnd,
            a = e.data,
            i = t.attrs,
            s = [];
          let o = null,
            l = null;
          for (let f = t.directiveStart; f < c; f++) {
            const u = a[f],
              d = n ? n.get(u) : null,
              p = d ? d.outputs : null;
            (o = zl(u.inputs, f, o, d ? d.inputs : null)), (l = zl(u.outputs, f, l, p));
            const m = null === o || null === i || rl(t) ? null : YS(o, f, i);
            s.push(m);
          }
          null !== o && (o.hasOwnProperty('class') && (t.flags |= 8), o.hasOwnProperty('style') && (t.flags |= 16)),
            (t.initialInputs = s),
            (t.inputs = o),
            (t.outputs = l);
        })(e, n, a);
      }
      function bl(e, t, n) {
        const r = n.directiveStart,
          c = n.directiveEnd,
          a = n.index,
          i = (function _w() {
            return B.lFrame.currentDirectiveIndex;
          })();
        try {
          m3(a);
          for (let s = r; s < c; s++) {
            const o = e.data[s],
              l = t[s];
            hc(s), (null !== o.hostBindings || 0 !== o.hostVars || null !== o.hostAttrs) && OS(o, l);
          }
        } finally {
          m3(-1), hc(i);
        }
      }
      function OS(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function y8(e, t, n) {
        (t.componentOffset = n), (e.components ?? (e.components = [])).push(t.index);
      }
      function jS(e, t, n) {
        if (n) {
          if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          j1(t) && (n[''] = e);
        }
      }
      function GS(e, t, n, r, c) {
        e.data[r] = c;
        const a = c.factory || (c.factory = p3(c.type)),
          i = new it(a, j1(c), M);
        (e.blueprint[r] = i),
          (n[r] = i),
          (function RS(e, t, n, r, c) {
            const a = c.hostBindings;
            if (a) {
              let i = e.hostBindingOpCodes;
              null === i && (i = e.hostBindingOpCodes = []);
              const s = ~t.index;
              (function FS(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ('number' == typeof n && n < 0) return n;
                }
                return 0;
              })(i) != s && i.push(s),
                i.push(n, r, a);
            }
          })(e, t, r, yt(e, n, c.hostVars, U), c);
      }
      function ue(e, t, n, r, c, a) {
        const i = L1(e, t);
        !(function z8(e, t, n, r, c, a, i) {
          if (null == a) e.removeAttribute(t, c, n);
          else {
            const s = null == i ? O(a) : i(a, r || '', c);
            e.setAttribute(t, c, s, n);
          }
        })(t[Y], i, a, e.value, n, r, c);
      }
      function qS(e, t, n, r, c, a) {
        const i = a[t];
        if (null !== i) {
          const s = r.setInput;
          for (let o = 0; o < i.length; ) {
            const l = i[o++],
              f = i[o++],
              u = i[o++];
            null !== s ? r.setInput(n, u, l, f) : (n[f] = u);
          }
        }
      }
      function YS(e, t, n) {
        let r = null,
          c = 0;
        for (; c < n.length; ) {
          const a = n[c];
          if (0 !== a)
            if (5 !== a) {
              if ('number' == typeof a) break;
              if (e.hasOwnProperty(a)) {
                null === r && (r = []);
                const i = e[a];
                for (let s = 0; s < i.length; s += 2)
                  if (i[s] === t) {
                    r.push(a, i[s + 1], n[c + 1]);
                    break;
                  }
              }
              c += 2;
            } else c += 2;
          else c += 4;
        }
        return r;
      }
      function Dl(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function QS(e, t) {
        const n = p1(t, e);
        if (Z6(n)) {
          const r = n[L];
          48 & n[$] ? wn(r, n, r.template, n[w2]) : n[h3] > 0 && L8(n);
        }
      }
      function L8(e) {
        for (let r = Pc(e); null !== r; r = Oc(r))
          for (let c = r1; c < r.length; c++) {
            const a = r[c];
            if (Z6(a))
              if (512 & a[$]) {
                const i = a[L];
                wn(i, a, i.template, a[w2]);
              } else a[h3] > 0 && L8(a);
          }
        const n = e[L].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const c = p1(n[r], e);
            Z6(c) && c[h3] > 0 && L8(c);
          }
      }
      function ZS(e, t) {
        const n = p1(t, e),
          r = n[L];
        (function JS(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
        })(r, n),
          g8(r, n, n[w2]);
      }
      function bn(e, t) {
        return e[tt] ? (e[r5][B1] = t) : (e[tt] = t), (e[r5] = t), t;
      }
      function Dn(e) {
        for (; e; ) {
          e[$] |= 32;
          const t = gt(e);
          if (fw(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Sn(e, t, n, r = !0) {
        const c = t[q6];
        c.begin && c.begin();
        try {
          wn(e, t, e.template, n);
        } catch (i) {
          throw (r && Nl(t, i), i);
        } finally {
          c.end && c.end();
        }
      }
      function w8(e, t, n) {
        mc(0), t(e, n);
      }
      function Sl(e) {
        return e[B3] || (e[B3] = []);
      }
      function xl(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Nl(e, t) {
        const n = e[W6],
          r = n ? n.get(a4, null) : null;
        r && r.handleError(t);
      }
      function b8(e, t, n, r, c) {
        for (let a = 0; a < n.length; ) {
          const i = n[a++],
            s = n[a++],
            o = t[i],
            l = e.data[i];
          null !== l.setInput ? l.setInput(o, c, r, s) : (o[s] = c);
        }
      }
      function xn(e, t, n) {
        let r = n ? e.styles : null,
          c = n ? e.classes : null,
          a = 0;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            'number' == typeof s ? (a = s) : 1 == a ? (c = Xr(c, s)) : 2 == a && (r = Xr(r, s + ': ' + t[++i] + ';'));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r), n ? (e.classes = c) : (e.classesWithoutHost = c);
      }
      function _n(e, t, n, r, c = !1) {
        for (; null !== n; ) {
          const a = t[n.index];
          if ((null !== a && r.push(U2(a)), U1(a)))
            for (let s = r1; s < a.length; s++) {
              const o = a[s],
                l = o[L].firstChild;
              null !== l && _n(o[L], o, l, r);
            }
          const i = n.type;
          if (8 & i) _n(e, t, n.child, r);
          else if (32 & i) {
            const s = Fc(n, t);
            let o;
            for (; (o = s()); ) r.push(o);
          } else if (16 & i) {
            const s = L7(t, n);
            if (Array.isArray(s)) r.push(...s);
            else {
              const o = gt(t[X2]);
              _n(o[L], o, s, r, !0);
            }
          }
          n = c ? n.projectionNext : n.next;
        }
        return r;
      }
      class zt {
        get rootNodes() {
          const t = this._lView,
            n = t[L];
          return _n(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[w2];
        }
        set context(t) {
          this._lView[w2] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[$]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[H2];
            if (U1(t)) {
              const n = t[X6],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (jc(t, r), ln(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          m7(this._lView[L], this._lView);
        }
        onDestroy(t) {
          yl(this._lView[L], this._lView, null, t);
        }
        markForCheck() {
          Dn(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[$] &= -65;
        }
        reattach() {
          this._lView[$] |= 64;
        }
        detectChanges() {
          Sn(this._lView[L], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new y(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Rb(e, t) {
              vt(e, t, t[Y], 2, null, null);
            })(this._lView[L], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new y(902, !1);
          this._appRef = t;
        }
      }
      class ex extends zt {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Sn(t[L], t, t[w2], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Al extends Ht {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = r2(t);
          return new Lt(n, this.ngModule);
        }
      }
      function El(e) {
        const t = [];
        for (let n in e) e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class nx {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = j6(r);
          const c = this.injector.get(t, o8, r);
          return c !== o8 || n === o8 ? c : this.parentInjector.get(t, n, r);
        }
      }
      class Lt extends Q7 {
        get inputs() {
          return El(this.componentDef.inputs);
        }
        get outputs() {
          return El(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function sS(e) {
              return e.map(iS).join(',');
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, c) {
          let a = (c = c || this.ngModule) instanceof le ? c : c?.injector;
          a &&
            null !== this.componentDef.getStandaloneInjector &&
            (a = this.componentDef.getStandaloneInjector(a) || a);
          const i = a ? new nx(t, a) : t,
            s = i.get(J7, null);
          if (null === s) throw new y(407, !1);
          const o = i.get(OD, null),
            l = s.createRenderer(null, this.componentDef),
            f = this.componentDef.selectors[0][0] || 'div',
            u = r
              ? (function NS(e, t, n) {
                  return e.selectRootElement(t, n === ce.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : Uc(
                  l,
                  f,
                  (function tx(e) {
                    const t = e.toLowerCase();
                    return 'svg' === t ? u5 : 'math' === t ? 'math' : null;
                  })(f),
                ),
            d = this.componentDef.onPush ? 288 : 272,
            h = H8(0, null, null, 1, 0, null, null, null, null, null),
            p = Ln(null, h, null, d, null, null, s, l, o, i, null);
          let m, v;
          gc(p);
          try {
            const C = this.componentDef;
            let V,
              g = null;
            C.findHostDirectiveDefs
              ? ((V = []), (g = new Map()), C.findHostDirectiveDefs(C, V, g), V.push(C))
              : (V = [C]);
            const b = (function cx(e, t) {
                const n = e[L],
                  r = p2;
                return (e[r] = t), o4(n, r, 2, '#host', null);
              })(p, u),
              P = (function ax(e, t, n, r, c, a, i, s) {
                const o = c[L];
                !(function ix(e, t, n, r) {
                  for (const c of e) t.mergedAttrs = st(t.mergedAttrs, c.hostAttrs);
                  null !== t.mergedAttrs && (xn(t, t.mergedAttrs, !0), null !== n && D7(r, n, t));
                })(r, e, t, i);
                const l = a.createRenderer(t, n),
                  f = Ln(c, Vl(n), null, n.onPush ? 32 : 16, c[e.index], e, a, l, s || null, null, null);
                return o.firstCreatePass && y8(o, e, r.length - 1), bn(c, f), (c[e.index] = f);
              })(b, u, C, V, p, s, l);
            (v = h5(h, p2)),
              u &&
                (function ox(e, t, n, r) {
                  if (r) Hc(e, n, ['ng-version', BD.full]);
                  else {
                    const { attrs: c, classes: a } = (function oS(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        c = 2;
                      for (; r < e.length; ) {
                        let a = e[r];
                        if ('string' == typeof a) 2 === c ? '' !== a && t.push(a, e[++r]) : 8 === c && n.push(a);
                        else {
                          if (!$1(c)) break;
                          c = a;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    c && Hc(e, n, c), a && a.length > 0 && b7(e, n, a.join(' '));
                  }
                })(l, C, u, r),
              void 0 !== n &&
                (function lx(e, t, n) {
                  const r = (e.projection = []);
                  for (let c = 0; c < t.length; c++) {
                    const a = n[c];
                    r.push(null != a ? Array.from(a) : null);
                  }
                })(v, this.ngContentSelectors, n),
              (m = (function sx(e, t, n, r, c, a) {
                const i = j2(),
                  s = c[L],
                  o = L1(i, c);
                wl(s, c, i, n, null, r);
                for (let f = 0; f < n.length; f++) K2(g3(c, s, i.directiveStart + f, i), c);
                bl(s, c, i), o && K2(o, c);
                const l = g3(c, s, i.directiveStart + i.componentOffset, i);
                if (((e[w2] = c[w2] = l), null !== a)) for (const f of a) f(l, t);
                return v8(s, i, e), l;
              })(P, C, V, g, p, [fx])),
              g8(h, p, null);
          } finally {
            vc();
          }
          return new rx(this.componentType, m, c4(v, p), p, v);
        }
      }
      class rx extends kD {
        constructor(t, n, r, c, a) {
          super(),
            (this.location = r),
            (this._rootLView = c),
            (this._tNode = a),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new ex(c)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let c;
          if (null !== r && (c = r[t])) {
            const a = this._rootLView;
            b8(a[L], a, c, t, n), Dn(p1(this._tNode.index, a));
          }
        }
        get injector() {
          return new Y3(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function fx() {
        const e = j2();
        J6(H()[L], e);
      }
      function c2(e) {
        let t = (function kl(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let c;
          if (j1(e)) c = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new y(903, !1);
            c = t.ɵdir;
          }
          if (c) {
            if (n) {
              r.push(c);
              const i = e;
              (i.inputs = D8(e.inputs)), (i.declaredInputs = D8(e.declaredInputs)), (i.outputs = D8(e.outputs));
              const s = c.hostBindings;
              s && px(e, s);
              const o = c.viewQuery,
                l = c.contentQueries;
              if (
                (o && dx(e, o),
                l && hx(e, l),
                Yr(e.inputs, c.inputs),
                Yr(e.declaredInputs, c.declaredInputs),
                Yr(e.outputs, c.outputs),
                j1(c) && c.data.animation)
              ) {
                const f = e.data;
                f.animation = (f.animation || []).concat(c.data.animation);
              }
            }
            const a = c.features;
            if (a)
              for (let i = 0; i < a.length; i++) {
                const s = a[i];
                s && s.ngInherit && s(e), s === c2 && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function ux(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const c = e[r];
            (c.hostVars = t += c.hostVars), (c.hostAttrs = st(c.hostAttrs, (n = st(n, c.hostAttrs))));
          }
        })(r);
      }
      function D8(e) {
        return e === ye ? {} : e === J ? [] : e;
      }
      function dx(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, c) => {
              t(r, c), n(r, c);
            }
          : t;
      }
      function hx(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, c, a) => {
              t(r, c, a), n(r, c, a);
            }
          : t;
      }
      function px(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, c) => {
              t(r, c), n(r, c);
            }
          : t;
      }
      function Nn(e) {
        return !!S8(e) && (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e));
      }
      function S8(e) {
        return null !== e && ('function' == typeof e || 'object' == typeof e);
      }
      function de(e, t, n) {
        return (e[t] = n);
      }
      function Q2(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function W1(e, t, n, r) {
        const c = H();
        return Q2(c, W3(), t) && (Z(), ue(C2(), c, e, t, n, r)), W1;
      }
      function f4(e, t, n, r) {
        return Q2(e, W3(), n) ? t + O(n) + r : U;
      }
      function bt(e, t, n, r, c, a, i, s) {
        const o = H(),
          l = Z(),
          f = e + p2,
          u = l.firstCreatePass
            ? (function Lx(e, t, n, r, c, a, i, s, o) {
                const l = t.consts,
                  f = o4(t, e, 4, i || null, $e(l, s));
                V8(t, n, f, $e(l, o)), J6(t, f);
                const u = (f.tView = H8(2, f, r, c, a, t.directiveRegistry, t.pipeRegistry, null, t.schemas, l));
                return null !== t.queries && (t.queries.template(t, f), (u.queries = t.queries.embeddedTView(f))), f;
              })(f, l, o, t, n, r, c, a, i)
            : l.data[f];
        ie(u, !1);
        const d = o[Y].createComment('');
        pn(l, o, d, u), K2(d, o), bn(o, (o[f] = Dl(d, o, d, u))), K6(u) && C8(l, o, u), null != i && M8(o, u, s);
      }
      function Z2(e, t, n) {
        const r = H();
        return Q2(r, W3(), t) && D1(Z(), C2(), r, e, t, r[Y], n, !1), Z2;
      }
      function x8(e, t, n, r, c) {
        const i = c ? 'class' : 'style';
        b8(e, n, t.inputs[i], i, r);
      }
      function N(e, t, n, r) {
        const c = H(),
          a = Z(),
          i = p2 + e,
          s = c[Y],
          o = a.firstCreatePass
            ? (function Dx(e, t, n, r, c, a) {
                const i = t.consts,
                  o = o4(t, e, 2, r, $e(i, c));
                return (
                  V8(t, n, o, $e(i, a)),
                  null !== o.attrs && xn(o, o.attrs, !1),
                  null !== o.mergedAttrs && xn(o, o.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, o),
                  o
                );
              })(i, a, c, t, n, r)
            : a.data[i],
          l = (c[i] = Uc(
            s,
            t,
            (function Iw() {
              return B.lFrame.currentNamespace;
            })(),
          )),
          f = K6(o);
        return (
          ie(o, !0),
          D7(s, l, o),
          32 != (32 & o.flags) && pn(a, c, l, o),
          0 ===
            (function yw() {
              return B.lFrame.elementDepthCount;
            })() && K2(l, c),
          (function zw() {
            B.lFrame.elementDepthCount++;
          })(),
          f && (C8(a, c, o), v8(a, o, c)),
          null !== r && M8(c, o),
          N
        );
      }
      function I() {
        let e = j2();
        uc() ? dc() : ((e = e.parent), ie(e, !1));
        const t = e;
        !(function Lw() {
          B.lFrame.elementDepthCount--;
        })();
        const n = Z();
        return (
          n.firstCreatePass && (J6(n, e), ic(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Ow(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            x8(n, t, H(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Bw(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            x8(n, t, H(), t.stylesWithoutHost, !1),
          I
        );
      }
      function b2(e, t, n, r) {
        return N(e, t, n, r), I(), b2;
      }
      function C4(e, t, n) {
        const r = H(),
          c = Z(),
          a = e + p2,
          i = c.firstCreatePass
            ? (function Sx(e, t, n, r, c) {
                const a = t.consts,
                  i = $e(a, r),
                  s = o4(t, e, 8, 'ng-container', i);
                return (
                  null !== i && xn(s, i, !0),
                  V8(t, n, s, $e(a, c)),
                  null !== t.queries && t.queries.elementStart(t, s),
                  s
                );
              })(a, c, r, t, n)
            : c.data[a];
        ie(i, !0);
        const s = (r[a] = r[Y].createComment(''));
        return pn(c, r, s, i), K2(s, r), K6(i) && (C8(c, r, i), v8(c, i, r)), null != n && M8(r, i), C4;
      }
      function M4() {
        let e = j2();
        const t = Z();
        return (
          uc() ? dc() : ((e = e.parent), ie(e, !1)),
          t.firstCreatePass && (J6(t, e), ic(e) && t.queries.elementEnd(e)),
          M4
        );
      }
      function Dt(e) {
        return !!e && 'function' == typeof e.then;
      }
      const _8 = function Xl(e) {
        return !!e && 'function' == typeof e.subscribe;
      };
      function s1(e, t, n, r) {
        const c = H(),
          a = Z(),
          i = j2();
        return (
          (function Ql(e, t, n, r, c, a, i) {
            const s = K6(r),
              l = e.firstCreatePass && xl(e),
              f = t[w2],
              u = Sl(t);
            let d = !0;
            if (3 & r.type || i) {
              const m = L1(r, t),
                v = i ? i(m) : m,
                C = u.length,
                V = i ? (b) => i(U2(b[r.index])) : r.index;
              let g = null;
              if (
                (!i &&
                  s &&
                  (g = (function xx(e, t, n, r) {
                    const c = e.cleanup;
                    if (null != c)
                      for (let a = 0; a < c.length - 1; a += 2) {
                        const i = c[a];
                        if (i === n && c[a + 1] === r) {
                          const s = t[B3],
                            o = c[a + 2];
                          return s.length > o ? s[o] : null;
                        }
                        'string' == typeof i && (a += 2);
                      }
                    return null;
                  })(e, t, c, r.index)),
                null !== g)
              )
                ((g.__ngLastListenerFn__ || g).__ngNextListenerFn__ = a), (g.__ngLastListenerFn__ = a), (d = !1);
              else {
                a = Jl(r, t, f, a, !1);
                const b = n.listen(v, c, a);
                u.push(a, b), l && l.push(c, V, C, C + 1);
              }
            } else a = Jl(r, t, f, a, !1);
            const h = r.outputs;
            let p;
            if (d && null !== h && (p = h[c])) {
              const m = p.length;
              if (m)
                for (let v = 0; v < m; v += 2) {
                  const P = t[p[v]][p[v + 1]].subscribe(a),
                    a2 = u.length;
                  u.push(a, P), l && l.push(c, r.index, a2, -(a2 + 1));
                }
            }
          })(a, c, c[Y], i, e, t, r),
          s1
        );
      }
      function Zl(e, t, n, r) {
        try {
          return k1(6, t, n), !1 !== n(r);
        } catch (c) {
          return Nl(e, c), !1;
        } finally {
          k1(7, t, n);
        }
      }
      function Jl(e, t, n, r, c) {
        return function a(i) {
          if (i === Function) return r;
          Dn(e.componentOffset > -1 ? p1(e.index, t) : t);
          let o = Zl(t, n, r, i),
            l = a.__ngNextListenerFn__;
          for (; l; ) (o = Zl(t, n, l, i) && o), (l = l.__ngNextListenerFn__);
          return c && !1 === o && (i.preventDefault(), (i.returnValue = !1)), o;
        };
      }
      function H4(e = 1) {
        return (function Aw(e) {
          return (B.lFrame.contextLView = (function Ew(e, t) {
            for (; e > 0; ) (t = t[U3]), e--;
            return t;
          })(e, B.lFrame.contextLView))[w2];
        })(e);
      }
      function _x(e, t) {
        let n = null;
        const r = (function nS(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (!(1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let c = 0; c < t.length; c++) {
          const a = t[c];
          if ('*' !== a) {
            if (null === r ? cl(e, a, !0) : aS(r, a)) return c;
          } else n = c;
        }
        return n;
      }
      function V4(e, t, n) {
        return En(e, '', t, '', n), V4;
      }
      function En(e, t, n, r, c) {
        const a = H(),
          i = f4(a, t, n, r);
        return i !== U && D1(Z(), C2(), a, e, i, a[Y], c, !1), En;
      }
      function kn(e, t) {
        return (e << 17) | (t << 2);
      }
      function Ge(e) {
        return (e >> 17) & 32767;
      }
      function N8(e) {
        return 2 | e;
      }
      function z3(e) {
        return (131068 & e) >> 2;
      }
      function A8(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function E8(e) {
        return 1 | e;
      }
      function f9(e, t, n, r, c) {
        const a = e[n + 1],
          i = null === t;
        let s = r ? Ge(a) : z3(a),
          o = !1;
        for (; 0 !== s && (!1 === o || i); ) {
          const f = e[s + 1];
          Ix(e[s], t) && ((o = !0), (e[s + 1] = r ? E8(f) : N8(f))), (s = r ? Ge(f) : z3(f));
        }
        o && (e[n + 1] = r ? N8(a) : E8(a));
      }
      function Ix(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || 'string' != typeof t) && J3(e, t) >= 0)
        );
      }
      function Tn(e, t) {
        return (
          (function q1(e, t, n, r) {
            const c = H(),
              a = Z(),
              i = (function be(e) {
                const t = B.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            a.firstUpdatePass &&
              (function M9(e, t, n, r) {
                const c = e.data;
                if (null === c[n + 1]) {
                  const a = c[i1()],
                    i = (function C9(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function z9(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(a, r) &&
                    null === t &&
                    !i &&
                    (t = !1),
                    (t = (function Gx(e, t, n, r) {
                      const c = (function pc(e) {
                        const t = B.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let a = r ? t.residualClasses : t.residualStyles;
                      if (null === c)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = St((n = k8(null, e, t, n, r)), t.attrs, r)), (a = null));
                      else {
                        const i = t.directiveStylingLast;
                        if (-1 === i || e[i] !== c)
                          if (((n = k8(c, e, t, n, r)), null === a)) {
                            let o = (function Wx(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== z3(r)) return e[Ge(r)];
                            })(e, t, r);
                            void 0 !== o &&
                              Array.isArray(o) &&
                              ((o = k8(null, e, t, o[1], r)),
                              (o = St(o, t.attrs, r)),
                              (function qx(e, t, n, r) {
                                e[Ge(n ? t.classBindings : t.styleBindings)] = r;
                              })(e, t, r, o));
                          } else
                            a = (function Yx(e, t, n) {
                              let r;
                              const c = t.directiveEnd;
                              for (let a = 1 + t.directiveStylingLast; a < c; a++) r = St(r, e[a].hostAttrs, n);
                              return St(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return void 0 !== a && (r ? (t.residualClasses = a) : (t.residualStyles = a)), n;
                    })(c, a, t, r)),
                    (function kx(e, t, n, r, c, a) {
                      let i = a ? t.classBindings : t.styleBindings,
                        s = Ge(i),
                        o = z3(i);
                      e[r] = n;
                      let f,
                        l = !1;
                      if ((Array.isArray(n) ? ((f = n[1]), (null === f || J3(n, f) > 0) && (l = !0)) : (f = n), c))
                        if (0 !== o) {
                          const d = Ge(e[s + 1]);
                          (e[r + 1] = kn(d, s)),
                            0 !== d && (e[d + 1] = A8(e[d + 1], r)),
                            (e[s + 1] = (function Ax(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[s + 1], r));
                        } else (e[r + 1] = kn(s, 0)), 0 !== s && (e[s + 1] = A8(e[s + 1], r)), (s = r);
                      else (e[r + 1] = kn(o, 0)), 0 === s ? (s = r) : (e[o + 1] = A8(e[o + 1], r)), (o = r);
                      l && (e[r + 1] = N8(e[r + 1])),
                        f9(e, f, r, !0),
                        f9(e, f, r, !1),
                        (function Tx(e, t, n, r, c) {
                          const a = c ? e.residualClasses : e.residualStyles;
                          null != a && 'string' == typeof t && J3(a, t) >= 0 && (n[r + 1] = E8(n[r + 1]));
                        })(t, f, e, r, a),
                        (i = kn(s, o)),
                        a ? (t.classBindings = i) : (t.styleBindings = i);
                    })(c, a, t, n, i, r);
                }
              })(a, e, i, r),
              t !== U &&
                Q2(c, i, t) &&
                (function V9(e, t, n, r, c, a, i, s) {
                  if (!(3 & t.type)) return;
                  const o = e.data,
                    l = o[s + 1],
                    f = (function Ex(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? y9(o, t, n, c, z3(l), i)
                      : void 0;
                  In(f) ||
                    (In(a) ||
                      ((function Nx(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (a = y9(o, null, n, c, s, i))),
                    (function qb(e, t, n, r, c) {
                      if (t) c ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let a = -1 === r.indexOf('-') ? void 0 : m1.DashCase;
                        null == c
                          ? e.removeStyle(n, r, a)
                          : ('string' == typeof c &&
                              c.endsWith('!important') &&
                              ((c = c.slice(0, -10)), (a |= m1.Important)),
                            e.setStyle(n, r, c, a));
                      }
                    })(r, i, Q6(i1(), n), c, a));
                })(
                  a,
                  a.data[i1()],
                  c,
                  c[Y],
                  e,
                  (c[i + 1] = (function Zx(e, t) {
                    return (
                      null == e ||
                        '' === e ||
                        ('string' == typeof t ? (e += t) : 'object' == typeof e && (e = l2(b1(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  i,
                );
          })(e, t, null, !0),
          Tn
        );
      }
      function k8(e, t, n, r, c) {
        let a = null;
        const i = n.directiveEnd;
        let s = n.directiveStylingLast;
        for (-1 === s ? (s = n.directiveStart) : s++; s < i && ((a = t[s]), (r = St(r, a.hostAttrs, c)), a !== e); )
          s++;
        return null !== e && (n.directiveStylingLast = s), r;
      }
      function St(e, t, n) {
        const r = n ? 1 : 2;
        let c = -1;
        if (null !== t)
          for (let a = 0; a < t.length; a++) {
            const i = t[a];
            'number' == typeof i
              ? (c = i)
              : c === r && (Array.isArray(e) || (e = void 0 === e ? [] : ['', e]), w1(e, i, !!n || t[++a]));
          }
        return void 0 === e ? null : e;
      }
      function y9(e, t, n, r, c, a) {
        const i = null === t;
        let s;
        for (; c > 0; ) {
          const o = e[c],
            l = Array.isArray(o),
            f = l ? o[1] : o,
            u = null === f;
          let d = n[c + 1];
          d === U && (d = u ? J : void 0);
          let h = u ? Sc(d, r) : f === r ? d : void 0;
          if ((l && !In(h) && (h = Sc(o, r)), In(h) && ((s = h), i))) return s;
          const p = e[c + 1];
          c = i ? Ge(p) : z3(p);
        }
        if (null !== t) {
          let o = a ? t.residualClasses : t.residualStyles;
          null != o && (s = Sc(o, r));
        }
        return s;
      }
      function In(e) {
        return void 0 !== e;
      }
      function X(e, t = '') {
        const n = H(),
          r = Z(),
          c = e + p2,
          a = r.firstCreatePass ? o4(r, c, 1, t, null) : r.data[c],
          i = (n[c] = (function Bc(e, t) {
            return e.createText(t);
          })(n[Y], t));
        pn(r, n, i, a), ie(a, !1);
      }
      function J2(e) {
        return T8('', e, ''), J2;
      }
      function T8(e, t, n) {
        const r = H(),
          c = f4(r, e, t, n);
        return (
          c !== U &&
            (function xe(e, t, n) {
              const r = Q6(t, e);
              !(function h7(e, t, n) {
                e.setValue(t, n);
              })(e[Y], r, n);
            })(r, i1(), c),
          T8
        );
      }
      function I8(e, t, n) {
        const r = H();
        return Q2(r, W3(), t) && D1(Z(), C2(), r, e, t, r[Y], n, !0), I8;
      }
      const L3 = void 0;
      var C_ = [
        'en',
        [['a', 'p'], ['AM', 'PM'], L3],
        [['AM', 'PM'], L3, L3],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        L3,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        L3,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', L3, "{1} 'at' {0}", L3],
        ['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function v_(e) {
          const n = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, '').length;
          return 1 === n && 0 === r ? 1 : 5;
        },
      ];
      let z4 = {};
      function o1(e) {
        const t = (function M_(e) {
          return e.toLowerCase().replace(/_/g, '-');
        })(e);
        let n = j9(t);
        if (n) return n;
        const r = t.split('-')[0];
        if (((n = j9(r)), n)) return n;
        if ('en' === r) return C_;
        throw new y(701, !1);
      }
      function j9(e) {
        return e in z4 || (z4[e] = h2.ng && h2.ng.common && h2.ng.common.locales && h2.ng.common.locales[e]), z4[e];
      }
      var z = (() => (
        ((z = z || {})[(z.LocaleId = 0)] = 'LocaleId'),
        (z[(z.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
        (z[(z.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
        (z[(z.DaysFormat = 3)] = 'DaysFormat'),
        (z[(z.DaysStandalone = 4)] = 'DaysStandalone'),
        (z[(z.MonthsFormat = 5)] = 'MonthsFormat'),
        (z[(z.MonthsStandalone = 6)] = 'MonthsStandalone'),
        (z[(z.Eras = 7)] = 'Eras'),
        (z[(z.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
        (z[(z.WeekendRange = 9)] = 'WeekendRange'),
        (z[(z.DateFormat = 10)] = 'DateFormat'),
        (z[(z.TimeFormat = 11)] = 'TimeFormat'),
        (z[(z.DateTimeFormat = 12)] = 'DateTimeFormat'),
        (z[(z.NumberSymbols = 13)] = 'NumberSymbols'),
        (z[(z.NumberFormats = 14)] = 'NumberFormats'),
        (z[(z.CurrencyCode = 15)] = 'CurrencyCode'),
        (z[(z.CurrencySymbol = 16)] = 'CurrencySymbol'),
        (z[(z.CurrencyName = 17)] = 'CurrencyName'),
        (z[(z.Currencies = 18)] = 'Currencies'),
        (z[(z.Directionality = 19)] = 'Directionality'),
        (z[(z.PluralCase = 20)] = 'PluralCase'),
        (z[(z.ExtraData = 21)] = 'ExtraData'),
        z
      ))();
      const L4 = 'en-US';
      let $9 = L4;
      function P8(e, t, n, r, c) {
        if (((e = k(e)), Array.isArray(e))) for (let a = 0; a < e.length; a++) P8(e[a], t, n, r, c);
        else {
          const a = Z(),
            i = H();
          let s = V3(e) ? e : k(e.provide),
            o = K7(e);
          const l = j2(),
            f = 1048575 & l.providerIndexes,
            u = l.directiveStart,
            d = l.providerIndexes >> 20;
          if (V3(e) || !e.multi) {
            const h = new it(o, c, M),
              p = B8(s, t, c ? f : f + d, u);
            -1 === p
              ? (Lc(an(l, i), a, s),
                O8(a, e, t.length),
                t.push(s),
                l.directiveStart++,
                l.directiveEnd++,
                c && (l.providerIndexes += 1048576),
                n.push(h),
                i.push(h))
              : ((n[p] = h), (i[p] = h));
          } else {
            const h = B8(s, t, f + d, u),
              p = B8(s, t, f, f + d),
              v = p >= 0 && n[p];
            if ((c && !v) || (!c && !(h >= 0 && n[h]))) {
              Lc(an(l, i), a, s);
              const C = (function gN(e, t, n, r, c) {
                const a = new it(e, n, M);
                return (a.multi = []), (a.index = t), (a.componentProviders = 0), vf(a, c, r && !n), a;
              })(c ? mN : pN, n.length, c, r, o);
              !c && v && (n[p].providerFactory = C),
                O8(a, e, t.length, 0),
                t.push(s),
                l.directiveStart++,
                l.directiveEnd++,
                c && (l.providerIndexes += 1048576),
                n.push(C),
                i.push(C);
            } else O8(a, e, h > -1 ? h : p, vf(n[c ? p : h], o, !c && r));
            !c && r && v && n[p].componentProviders++;
          }
        }
      }
      function O8(e, t, n, r) {
        const c = V3(t),
          a = (function DD(e) {
            return !!e.useClass;
          })(t);
        if (c || a) {
          const o = (a ? k(t.useClass) : t).prototype.ngOnDestroy;
          if (o) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!c && t.multi) {
              const f = l.indexOf(n);
              -1 === f ? l.push(n, [r, o]) : l[f + 1].push(r, o);
            } else l.push(n, o);
          }
        }
      }
      function vf(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function B8(e, t, n, r) {
        for (let c = n; c < r; c++) if (t[c] === e) return c;
        return -1;
      }
      function pN(e, t, n, r) {
        return U8(this.multi, []);
      }
      function mN(e, t, n, r) {
        const c = this.multi;
        let a;
        if (this.providerFactory) {
          const i = this.providerFactory.componentProviders,
            s = g3(n, n[L], this.providerFactory.index, r);
          (a = s.slice(0, i)), U8(c, a);
          for (let o = i; o < s.length; o++) a.push(s[o]);
        } else (a = []), U8(c, a);
        return a;
      }
      function U8(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function v2(e, t = []) {
        return (n) => {
          n.providersResolver = (r, c) =>
            (function hN(e, t, n) {
              const r = Z();
              if (r.firstCreatePass) {
                const c = j1(e);
                P8(n, r.data, r.blueprint, c, !0), P8(t, r.data, r.blueprint, c, !1);
              }
            })(r, c ? c(e) : e, t);
        };
      }
      class w4 {}
      class Cf {}
      class Mf extends w4 {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Al(this));
          const r = y1(t);
          (this._bootstrapComponents = Se(r.bootstrap)),
            (this._r3Injector = ul(
              t,
              n,
              [
                { provide: w4, useValue: this },
                { provide: Ht, useValue: this.componentFactoryResolver },
              ],
              l2(t),
              new Set(['environment']),
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(), this.destroyCbs.forEach((n) => n()), (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class j8 extends Cf {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Mf(this.moduleType, t);
        }
      }
      class CN extends w4 {
        constructor(t, n, r) {
          super(), (this.componentFactoryResolver = new Al(this)), (this.instance = null);
          const c = new X7(
            [...t, { provide: w4, useValue: this }, { provide: Ht, useValue: this.componentFactoryResolver }],
            n || yn(),
            r,
            new Set(['environment']),
          );
          (this.injector = c), c.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Bn(e, t, n = null) {
        return new CN(e, t, n).injector;
      }
      let MN = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = G7(0, n.type),
                c = r.length > 0 ? Bn([r], this._injector, `Standalone[${n.type.name}]`) : null;
              this.cachedInjectors.set(n.id, c);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values()) null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (e.ɵprov = _({ token: e, providedIn: 'environment', factory: () => new e(D(le)) })), e;
      })();
      function Hf(e) {
        e.getStandaloneInjector = (t) => t.get(MN).getOrCreateStandaloneInjector(e);
      }
      function Un(e, t, n) {
        const r = a1() + e,
          c = H();
        return c[r] === U
          ? de(c, r, n ? t.call(n) : t())
          : (function wt(e, t) {
              return e[t];
            })(c, r);
      }
      function Df(e, t, n, r) {
        return (function Sf(e, t, n, r, c, a) {
          const i = t + n;
          return Q2(e, i, c) ? de(e, i + 1, a ? r.call(a, c) : r(c)) : kt(e, i + 1);
        })(H(), a1(), e, t, n, r);
      }
      function kt(e, t) {
        const n = e[t];
        return n === U ? void 0 : n;
      }
      function xf(e, t, n, r, c, a, i) {
        const s = t + n;
        return (function y3(e, t, n, r) {
          const c = Q2(e, t, n);
          return Q2(e, t + 1, r) || c;
        })(e, s, c, a)
          ? de(e, s + 2, i ? r.call(i, c, a) : r(c, a))
          : kt(e, s + 2);
      }
      function jn(e, t) {
        const n = Z();
        let r;
        const c = e + p2;
        n.firstCreatePass
          ? ((r = (function IN(e, t) {
              if (t)
                for (let n = t.length - 1; n >= 0; n--) {
                  const r = t[n];
                  if (e === r.name) return r;
                }
            })(t, n.pipeRegistry)),
            (n.data[c] = r),
            r.onDestroy && (n.destroyHooks ?? (n.destroyHooks = [])).push(c, r.onDestroy))
          : (r = n.data[c]);
        const a = r.factory || (r.factory = p3(r.type)),
          i = E1(M);
        try {
          const s = cn(!1),
            o = a();
          return (
            cn(s),
            (function wx(e, t, n, r) {
              n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)), (t[n] = r);
            })(n, H(), c, o),
            o
          );
        } finally {
          E1(i);
        }
      }
      function $n(e, t, n, r) {
        const c = e + p2,
          a = H(),
          i = (function G3(e, t) {
            return e[t];
          })(a, c);
        return (function Tt(e, t) {
          return e[L].data[t].pure;
        })(a, c)
          ? xf(a, a1(), t, i.transform, n, r, i)
          : i.transform(n, r);
      }
      function G8(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const y2 = class BN extends _1 {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let c = t,
            a = n || (() => null),
            i = r;
          if (t && 'object' == typeof t) {
            const o = t;
            (c = o.next?.bind(o)), (a = o.error?.bind(o)), (i = o.complete?.bind(o));
          }
          this.__isAsync && ((a = G8(a)), c && (c = G8(c)), i && (i = G8(i)));
          const s = super.subscribe({ next: c, error: a, complete: i });
          return t instanceof n1 && t.add(s), s;
        }
      };
      function UN() {
        return this._results[Symbol.iterator]();
      }
      class W8 {
        get changes() {
          return this._changes || (this._changes = new y2());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = W8.prototype;
          n[Symbol.iterator] || (n[Symbol.iterator] = UN);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const c = (function T1(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function Qw(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let c = e[r],
                a = t[r];
              if ((n && ((c = n(c)), (a = n(a))), a !== c)) return !1;
            }
            return !0;
          })(r._results, c, n)) &&
            ((r._results = c), (r.length = c.length), (r.last = c[this.length - 1]), (r.first = c[0]));
        }
        notifyOnChanges() {
          this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let _e = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = GN), e;
      })();
      const jN = _e,
        $N = class extends jN {
          constructor(t, n, r) {
            super(), (this._declarationLView = t), (this._declarationTContainer = n), (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              c = Ln(this._declarationLView, r, t, 16, null, r.declTNode, null, null, null, null, n || null);
            c[nt] = this._declarationLView[this._declarationTContainer.index];
            const i = this._declarationLView[ae];
            return null !== i && (c[ae] = i.createEmbeddedView(r)), g8(r, c, t), new zt(c);
          }
        };
      function GN() {
        return Gn(j2(), H());
      }
      function Gn(e, t) {
        return 4 & e.type ? new $N(t, e, c4(e, t)) : null;
      }
      let X1 = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = WN), e;
      })();
      function WN() {
        return Tf(j2(), H());
      }
      const qN = X1,
        Ef = class extends qN {
          constructor(t, n, r) {
            super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = r);
          }
          get element() {
            return c4(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Y3(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = zc(this._hostTNode, this._hostLView);
            if (E5(t)) {
              const n = rn(t, this._hostLView),
                r = nn(t);
              return new Y3(n[L].data[r + 8], n);
            }
            return new Y3(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = kf(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - r1;
          }
          createEmbeddedView(t, n, r) {
            let c, a;
            'number' == typeof r ? (c = r) : null != r && ((c = r.index), (a = r.injector));
            const i = t.createEmbeddedView(n || {}, a);
            return this.insert(i, c), i;
          }
          createComponent(t, n, r, c, a) {
            const i =
              t &&
              !(function lt(e) {
                return 'function' == typeof e;
              })(t);
            let s;
            if (i) s = n;
            else {
              const u = n || {};
              (s = u.index), (r = u.injector), (c = u.projectableNodes), (a = u.environmentInjector || u.ngModuleRef);
            }
            const o = i ? t : new Lt(r2(t)),
              l = r || this.parentInjector;
            if (!a && null == o.ngModule) {
              const d = (i ? l : this.parentInjector).get(le, null);
              d && (a = d);
            }
            const f = o.create(l, c, void 0, a);
            return this.insert(f.hostView, s), f;
          }
          insert(t, n) {
            const r = t._lView,
              c = r[L];
            if (
              (function Vw(e) {
                return U1(e[H2]);
              })(r)
            ) {
              const f = this.indexOf(t);
              if (-1 !== f) this.detach(f);
              else {
                const u = r[H2],
                  d = new Ef(u, u[Y2], u[H2]);
                d.detach(d.indexOf(t));
              }
            }
            const a = this._adjustIndex(n),
              i = this._lContainer;
            !(function Pb(e, t, n, r) {
              const c = r1 + r,
                a = n.length;
              r > 0 && (n[c - 1][B1] = t),
                r < a - r1 ? ((t[B1] = n[c]), G5(n, r1 + r, t)) : (n.push(t), (t[B1] = null)),
                (t[H2] = n);
              const i = t[nt];
              null !== i &&
                n !== i &&
                (function Ob(e, t) {
                  const n = e[$3];
                  t[X2] !== t[H2][H2][X2] && (e[a5] = !0), null === n ? (e[$3] = [t]) : n.push(t);
                })(i, t);
              const s = t[ae];
              null !== s && s.insertView(e), (t[$] |= 64);
            })(c, r, i, a);
            const s = Wc(a, i),
              o = r[Y],
              l = hn(o, i[Y6]);
            return (
              null !== l &&
                (function Ib(e, t, n, r, c, a) {
                  (r[Le] = c), (r[Y2] = t), vt(e, r, n, 1, c, a);
                })(c, i[Y2], o, r, l, s),
              t.attachToViewContainerRef(),
              G5(q8(i), a, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = kf(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = jc(this._lContainer, n);
            r && (ln(q8(this._lContainer), n), m7(r[L], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = jc(this._lContainer, n);
            return r && null != ln(q8(this._lContainer), n) ? new zt(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function kf(e) {
        return e[X6];
      }
      function q8(e) {
        return e[X6] || (e[X6] = []);
      }
      function Tf(e, t) {
        let n;
        const r = t[e.index];
        if (U1(r)) n = r;
        else {
          let c;
          if (8 & e.type) c = U2(r);
          else {
            const a = t[Y];
            c = a.createComment('');
            const i = L1(e, t);
            C3(
              a,
              hn(a, i),
              c,
              (function $b(e, t) {
                return e.nextSibling(t);
              })(a, i),
              !1,
            );
          }
          (t[e.index] = n = Dl(r, t, c, e)), bn(t, n);
        }
        return new Ef(n, e, t);
      }
      class Y8 {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Y8(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class X8 {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r = null !== t.contentQueries ? t.contentQueries[0] : n.length,
              c = [];
            for (let a = 0; a < r; a++) {
              const i = n.getByIndex(a);
              c.push(this.queries[i.indexInDeclarationView].clone());
            }
            return new X8(c);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++) null !== jf(t, n).matches && this.queries[n].setDirty();
        }
      }
      class If {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class K8 {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const c = null !== n ? n.length : 0,
              a = this.getByIndex(r).embeddedTView(t, c);
            a && ((a.indexInDeclarationView = r), null !== n ? n.push(a) : (n = [a]));
          }
          return null !== n ? new K8(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++) this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Q8 {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0), this.addMatch(-t.index, n), new Q8(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let c = 0; c < r.length; c++) {
              const a = r[c];
              this.matchTNodeWithReadOption(t, n, YN(n, a)), this.matchTNodeWithReadOption(t, n, sn(n, t, a, !1, !1));
            }
          else
            r === _e
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, sn(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const c = this.metadata.read;
            if (null !== c)
              if (c === v1 || c === X1 || (c === _e && 4 & n.type)) this.addMatch(n.index, -2);
              else {
                const a = sn(n, t, c, !1, !1);
                null !== a && this.addMatch(n.index, a);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches ? (this.matches = [t, n]) : this.matches.push(t, n);
        }
      }
      function YN(e, t) {
        const n = e.localNames;
        if (null !== n) for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function KN(e, t, n, r) {
        return -1 === n
          ? (function XN(e, t) {
              return 11 & e.type ? c4(e, t) : 4 & e.type ? Gn(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function QN(e, t, n) {
              return n === v1 ? c4(t, e) : n === _e ? Gn(t, e) : n === X1 ? Tf(t, e) : void 0;
            })(e, t, r)
          : g3(e, e[L], n, t);
      }
      function Rf(e, t, n, r) {
        const c = t[ae].queries[r];
        if (null === c.matches) {
          const a = e.data,
            i = n.matches,
            s = [];
          for (let o = 0; o < i.length; o += 2) {
            const l = i[o];
            s.push(l < 0 ? null : KN(t, a[l], i[o + 1], n.metadata.read));
          }
          c.matches = s;
        }
        return c.matches;
      }
      function Z8(e, t, n, r) {
        const c = e.queries.getByIndex(n),
          a = c.matches;
        if (null !== a) {
          const i = Rf(e, t, c, n);
          for (let s = 0; s < a.length; s += 2) {
            const o = a[s];
            if (o > 0) r.push(i[s / 2]);
            else {
              const l = a[s + 1],
                f = t[-o];
              for (let u = r1; u < f.length; u++) {
                const d = f[u];
                d[nt] === d[H2] && Z8(d[L], d, l, r);
              }
              if (null !== f[$3]) {
                const u = f[$3];
                for (let d = 0; d < u.length; d++) {
                  const h = u[d];
                  Z8(h[L], h, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function Ff(e) {
        const t = H(),
          n = Z(),
          r = V5();
        mc(r + 1);
        const c = jf(n, r);
        if (
          e.dirty &&
          (function Hw(e) {
            return 4 == (4 & e[$]);
          })(t) ===
            (2 == (2 & c.metadata.flags))
        ) {
          if (null === c.matches) e.reset([]);
          else {
            const a = c.crossesNgTemplate ? Z8(n, t, r, []) : Rf(n, t, c, r);
            e.reset(a, FD), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Pf(e, t, n, r) {
        const c = Z();
        if (c.firstCreatePass) {
          const a = j2();
          (function Uf(e, t, n) {
            null === e.queries && (e.queries = new K8()), e.queries.track(new Q8(t, n));
          })(c, new If(t, n, r), a.index),
            (function eA(e, t) {
              const n = e.contentQueries || (e.contentQueries = []);
              t !== (n.length ? n[n.length - 1] : -1) && n.push(e.queries.length - 1, t);
            })(c, e),
            2 == (2 & n) && (c.staticContentQueries = !0);
        }
        !(function Bf(e, t, n) {
          const r = new W8(4 == (4 & n));
          yl(e, t, r, r.destroy), null === t[ae] && (t[ae] = new X8()), t[ae].queries.push(new Y8(r));
        })(c, H(), n);
      }
      function jf(e, t) {
        return e.queries.getByIndex(t);
      }
      function qn(...e) {}
      const Yn = new S('Application Initializer');
      let Xn = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = qn),
              (this.reject = qn),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, c) => {
                (this.resolve = r), (this.reject = c);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let c = 0; c < this.appInits.length; c++) {
                const a = this.appInits[c]();
                if (Dt(a)) n.push(a);
                else if (_8(a)) {
                  const i = new Promise((s, o) => {
                    a.subscribe({ complete: s, error: o });
                  });
                  n.push(i);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((c) => {
                this.reject(c);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Yn, 8));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        );
      })();
      const Rt = new S('AppId', {
        providedIn: 'root',
        factory: function su() {
          return `${ca()}${ca()}${ca()}`;
        },
      });
      function ca() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const ou = new S('Platform Initializer'),
        aa = new S('Platform ID', { providedIn: 'platform', factory: () => 'unknown' });
      let VA = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'platform' })),
          e
        );
      })();
      const Ne = new S('LocaleId', {
        providedIn: 'root',
        factory: () =>
          q(Ne, T.Optional | T.SkipSelf) ||
          (function yA() {
            return (typeof $localize < 'u' && $localize.locale) || L4;
          })(),
      });
      class LA {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let lu = (() => {
        class e {
          compileModuleSync(n) {
            return new j8(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              a = Se(y1(n).declarations).reduce((i, s) => {
                const o = r2(s);
                return o && i.push(new Lt(o)), i;
              }, []);
            return new LA(r, a);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        );
      })();
      const DA = (() => Promise.resolve(0))();
      function ia(e) {
        typeof Zone > 'u'
          ? DA.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', e);
      }
      class D2 {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new y2(!1)),
            (this.onMicrotaskEmpty = new y2(!1)),
            (this.onStable = new y2(!1)),
            (this.onError = new y2(!1)),
            typeof Zone > 'u')
          )
            throw new y(908, !1);
          Zone.assertZonePatched();
          const c = this;
          (c._nesting = 0),
            (c._outer = c._inner = Zone.current),
            Zone.TaskTrackingZoneSpec && (c._inner = c._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t && Zone.longStackTraceZoneSpec && (c._inner = c._inner.fork(Zone.longStackTraceZoneSpec)),
            (c.shouldCoalesceEventChangeDetection = !r && n),
            (c.shouldCoalesceRunChangeDetection = r),
            (c.lastRequestAnimationFrameId = -1),
            (c.nativeRequestAnimationFrame = (function SA() {
              let e = h2.requestAnimationFrame,
                t = h2.cancelAnimationFrame;
              if (typeof Zone < 'u' && e && t) {
                const n = e[Zone.__symbol__('OriginalDelegate')];
                n && (e = n);
                const r = t[Zone.__symbol__('OriginalDelegate')];
                r && (t = r);
              }
              return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: t };
            })().nativeRequestAnimationFrame),
            (function NA(e) {
              const t = () => {
                !(function _A(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(h2, () => {
                      e.fakeTopEventTask ||
                        (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                          'fakeTopEventTask',
                          () => {
                            (e.lastRequestAnimationFrameId = -1),
                              oa(e),
                              (e.isCheckStableRunning = !0),
                              sa(e),
                              (e.isCheckStableRunning = !1);
                          },
                          void 0,
                          () => {},
                          () => {},
                        )),
                        e.fakeTopEventTask.invoke();
                    })),
                    oa(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, c, a, i, s) => {
                  try {
                    return du(e), n.invokeTask(c, a, i, s);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection && 'eventTask' === a.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      hu(e);
                  }
                },
                onInvoke: (n, r, c, a, i, s, o) => {
                  try {
                    return du(e), n.invoke(c, a, i, s, o);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), hu(e);
                  }
                },
                onHasTask: (n, r, c, a) => {
                  n.hasTask(c, a),
                    r === c &&
                      ('microTask' == a.change
                        ? ((e._hasPendingMicrotasks = a.microTask), oa(e), sa(e))
                        : 'macroTask' == a.change && (e.hasPendingMacrotasks = a.macroTask));
                },
                onHandleError: (n, r, c, a) => (n.handleError(c, a), e.runOutsideAngular(() => e.onError.emit(a)), !1),
              });
            })(c);
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!D2.isInAngularZone()) throw new y(909, !1);
        }
        static assertNotInAngularZone() {
          if (D2.isInAngularZone()) throw new y(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, c) {
          const a = this._inner,
            i = a.scheduleEventTask('NgZoneEvent: ' + c, t, xA, qn, qn);
          try {
            return a.runTask(i, n, r);
          } finally {
            a.cancelTask(i);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const xA = {};
      function sa(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function oa(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function du(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function hu(e) {
        e._nesting--, sa(e);
      }
      class AA {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new y2()),
            (this.onMicrotaskEmpty = new y2()),
            (this.onStable = new y2()),
            (this.onError = new y2());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, c) {
          return t.apply(n, r);
        }
      }
      const pu = new S(''),
        Kn = new S('');
      let ua,
        la = (() => {
          class e {
            constructor(n, r, c) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                ua ||
                  ((function EA(e) {
                    ua = e;
                  })(c),
                  c.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone = typeof Zone > 'u' ? null : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      D2.assertNotInAngularZone(),
                        ia(() => {
                          (this._isZoneStable = !0), this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ia(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1),
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, c) {
              let a = -1;
              r &&
                r > 0 &&
                (a = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter((i) => i.timeoutId !== a)),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: a, updateCb: c });
            }
            whenStable(n, r, c) {
              if (c && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?',
                );
              this.addCallback(n, r, c), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, c) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(D2), D(fa), D(Kn));
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        fa = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return ua?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'platform' })),
            e
          );
        })();
      const Ae = !1;
      let We = null;
      const mu = new S('AllowMultipleToken'),
        da = new S('PlatformDestroyListeners'),
        gu = new S('appBootstrapListener');
      class vu {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Mu(e, t, n = []) {
        const r = `Platform: ${t}`,
          c = new S(r);
        return (a = []) => {
          let i = ha();
          if (!i || i.injector.get(mu, !1)) {
            const s = [...n, ...a, { provide: c, useValue: !0 }];
            e
              ? e(s)
              : (function IA(e) {
                  if (We && !We.get(mu, !1)) throw new y(400, !1);
                  We = e;
                  const t = e.get(Vu);
                  (function Cu(e) {
                    const t = e.get(ou, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Hu(e = [], t) {
                    return G1.create({
                      name: t,
                      providers: [
                        { provide: c8, useValue: 'platform' },
                        { provide: da, useValue: new Set([() => (We = null)]) },
                        ...e,
                      ],
                    });
                  })(s, r),
                );
          }
          return (function FA(e) {
            const t = ha();
            if (!t) throw new y(401, !1);
            return t;
          })();
        };
      }
      function ha() {
        return We?.get(Vu) ?? null;
      }
      let Vu = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this._modules = []), (this._destroyListeners = []), (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const c = (function zu(e, t) {
                let n;
                return (n = 'noop' === e ? new AA() : ('zone.js' === e ? void 0 : e) || new D2(t)), n;
              })(
                r?.ngZone,
                (function yu(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection: !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection: !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r),
              ),
              a = [{ provide: D2, useValue: c }];
            return c.run(() => {
              const i = G1.create({ providers: a, parent: this.injector, name: n.moduleType.name }),
                s = n.create(i),
                o = s.injector.get(a4, null);
              if (!o) throw new y(402, !1);
              return (
                c.runOutsideAngular(() => {
                  const l = c.onError.subscribe({
                    next: (f) => {
                      o.handleError(f);
                    },
                  });
                  s.onDestroy(() => {
                    Zn(this._modules, s), l.unsubscribe();
                  });
                }),
                (function Lu(e, t, n) {
                  try {
                    const r = n();
                    return Dt(r)
                      ? r.catch((c) => {
                          throw (t.runOutsideAngular(() => e.handleError(c)), c);
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(o, c, () => {
                  const l = s.injector.get(Xn);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function G9(e) {
                          A1(e, 'Expected localeId to be defined'),
                            'string' == typeof e && ($9 = e.toLowerCase().replace(/_/g, '-'));
                        })(s.injector.get(Ne, L4) || L4),
                        this._moduleDoBootstrap(s),
                        s
                      ),
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const c = wu({}, r);
            return (function kA(e, t, n) {
              const r = new j8(n);
              return Promise.resolve(r);
            })(0, 0, n).then((a) => this.bootstrapModuleFactory(a, c));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Qn);
            if (n._bootstrapComponents.length > 0) n._bootstrapComponents.forEach((c) => r.bootstrap(c));
            else {
              if (!n.instance.ngDoBootstrap) throw new y(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new y(404, !1);
            this._modules.slice().forEach((r) => r.destroy()), this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(da, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(G1));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'platform' })),
          e
        );
      })();
      function wu(e, t) {
        return Array.isArray(t) ? t.reduce(wu, e) : { ...e, ...t };
      }
      let Qn = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, c) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = c),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              }));
            const a = new L2((s) => {
                (this._stable =
                  this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    s.next(this._stable), s.complete();
                  });
              }),
              i = new L2((s) => {
                let o;
                this._zone.runOutsideAngular(() => {
                  o = this._zone.onStable.subscribe(() => {
                    D2.assertNotInAngularZone(),
                      ia(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), s.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  D2.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        s.next(!1);
                      }));
                });
                return () => {
                  o.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function OL(...e) {
              const t = K4(e),
                n = (function EL(e, t) {
                  return 'number' == typeof Wr(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length ? (1 === r.length ? N1(r[0]) : F3(n)(N2(r, t))) : ne;
            })(
              a,
              i.pipe(
                (function BL(e = {}) {
                  const {
                    connector: t = () => new _1(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: c = !0,
                  } = e;
                  return (a) => {
                    let i,
                      s,
                      o,
                      l = 0,
                      f = !1,
                      u = !1;
                    const d = () => {
                        s?.unsubscribe(), (s = void 0);
                      },
                      h = () => {
                        d(), (i = o = void 0), (f = u = !1);
                      },
                      p = () => {
                        const m = i;
                        h(), m?.unsubscribe();
                      };
                    return O2((m, v) => {
                      l++, !u && !f && d();
                      const C = (o = o ?? t());
                      v.add(() => {
                        l--, 0 === l && !u && !f && (s = qr(p, c));
                      }),
                        C.subscribe(v),
                        !i &&
                          l > 0 &&
                          ((i = new X4({
                            next: (V) => C.next(V),
                            error: (V) => {
                              (u = !0), d(), (s = qr(h, n, V)), C.error(V);
                            },
                            complete: () => {
                              (f = !0), d(), (s = qr(h, r)), C.complete();
                            },
                          })),
                          N1(m).subscribe(i));
                    })(a);
                  };
                })(),
              ),
            );
          }
          bootstrap(n, r) {
            const c = n instanceof Q7;
            if (!this._injector.get(Xn).done) {
              !c &&
                (function O3(e) {
                  const t = r2(e) || q2(e) || h1(e);
                  return null !== t && t.standalone;
                })(n);
              throw new y(405, Ae);
            }
            let i;
            (i = c ? n : this._injector.get(Ht).resolveComponentFactory(n)), this.componentTypes.push(i.componentType);
            const s = (function TA(e) {
                return e.isBoundToModule;
              })(i)
                ? void 0
                : this._injector.get(w4),
              l = i.create(G1.NULL, [], r || i.selector, s),
              f = l.location.nativeElement,
              u = l.injector.get(pu, null);
            return (
              u?.registerApplication(f),
              l.onDestroy(() => {
                this.detachView(l.hostView), Zn(this.components, l), u?.unregisterApplication(f);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new y(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(n));
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Zn(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(gu, []);
            r.push(...this._bootstrapListeners), r.forEach((c) => c(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return this._destroyListeners.push(n), () => Zn(this._destroyListeners, n);
          }
          destroy() {
            if (this._destroyed) throw new y(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(D2), D(le), D(a4));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        );
      })();
      function Zn(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Jn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = OA), e;
      })();
      function OA(e) {
        return (function BA(e, t, n) {
          if (ct(e) && !n) {
            const r = p1(e.index, t);
            return new zt(r, r);
          }
          return 47 & e.type ? new zt(t[X2], t) : null;
        })(j2(), H(), 16 == (16 & e));
      }
      class _u {
        constructor() {}
        supports(t) {
          return Nn(t);
        }
        create(t) {
          return new qA(t);
        }
      }
      const WA = (e, t) => t;
      class qA {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || WA);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            c = 0,
            a = null;
          for (; n || r; ) {
            const i = !r || (n && n.currentIndex < Au(r, c, a)) ? n : r,
              s = Au(i, c, a),
              o = i.currentIndex;
            if (i === r) c--, (r = r._nextRemoved);
            else if (((n = n._next), null == i.previousIndex)) c++;
            else {
              a || (a = []);
              const l = s - c,
                f = o - c;
              if (l != f) {
                for (let d = 0; d < l; d++) {
                  const h = d < a.length ? a[d] : (a[d] = 0),
                    p = h + d;
                  f <= p && p < l && (a[d] = h + 1);
                }
                a[i.previousIndex] = f - l;
              }
            }
            s !== o && t(i, s, o);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange) t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Nn(t))) throw new y(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let c,
            a,
            i,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let s = 0; s < this.length; s++)
              (a = t[s]),
                (i = this._trackByFn(s, a)),
                null !== n && Object.is(n.trackById, i)
                  ? (r && (n = this._verifyReinsertion(n, a, i, s)),
                    Object.is(n.item, a) || this._addIdentityChange(n, a))
                  : ((n = this._mismatch(n, a, i, s)), (r = !0)),
                (n = n._next);
          } else
            (c = 0),
              (function Vx(e, t) {
                if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (s) => {
                (i = this._trackByFn(c, s)),
                  null !== n && Object.is(n.trackById, i)
                    ? (r && (n = this._verifyReinsertion(n, s, i, c)),
                      Object.is(n.item, s) || this._addIdentityChange(n, s))
                    : ((n = this._mismatch(n, s, i, c)), (r = !0)),
                  (n = n._next),
                  c++;
              }),
              (this.length = c);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
            for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved)
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, c) {
          let a;
          return (
            null === t ? (a = this._itTail) : ((a = t._prev), this._remove(t)),
            null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, a, c))
              : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, c))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, a, c))
              : (t = this._addAfter(new YA(n, r), a, c)),
            t
          );
        }
        _verifyReinsertion(t, n, r, c) {
          let a = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
          return (
            null !== a
              ? (t = this._reinsertAfter(a, t._prev, c))
              : t.currentIndex != c && ((t.currentIndex = c), this._addToMoves(t, c)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const c = t._prevRemoved,
            a = t._nextRemoved;
          return (
            null === c ? (this._removalsHead = a) : (c._nextRemoved = a),
            null === a ? (this._removalsTail = c) : (a._prevRemoved = c),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t;
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail ? (this._additionsHead = t) : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const c = null === n ? this._itHead : n._next;
          return (
            (t._next = c),
            (t._prev = n),
            null === c ? (this._itTail = t) : (c._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Nu()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return null === n ? (this._itHead = r) : (n._next = r), null === r ? (this._itTail = n) : (r._prev = n), t;
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail = null === this._movesTail ? (this._movesHead = t) : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new Nu()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail), (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class YA {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class XA {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
            : ((this._tail._nextDup = t), (t._prevDup = this._tail), (t._nextDup = null), (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Nu {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new XA()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const c = this.map.get(t);
          return c ? c.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Au(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let c = 0;
        return n && r < n.length && (c = n[r]), r + t + c;
      }
      class Eu {
        constructor() {}
        supports(t) {
          return t instanceof Map || S8(t);
        }
        create() {
          return new KA();
        }
      }
      class KA {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || S8(t))) throw new y(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, c) => {
              if (n && n.key === c) this._maybeAddToChanges(n, r), (this._appendAfter = n), (n = n._next);
              else {
                const a = this._getOrCreateRecordForKey(c, r);
                n = this._insertBeforeOrAppend(n, a);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter ? ((this._appendAfter._next = n), (n._prev = this._appendAfter)) : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const c = this._records.get(t);
            this._maybeAddToChanges(c, n);
            const a = c._prev,
              i = c._next;
            return a && (a._next = i), i && (i._prev = a), (c._next = null), (c._prev = null), c;
          }
          const r = new QA(t);
          return this._records.set(t, r), (r.currentValue = n), this._addToAdditions(r), r;
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next)
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue), (t.currentValue = n), this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map ? t.forEach(n) : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class QA {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function ku() {
        return new n0([new _u()]);
      }
      let n0 = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const c = r.factories.slice();
              n = n.concat(c);
            }
            return new e(n);
          }
          static extend(n) {
            return { provide: e, useFactory: (r) => e.create(n, r || ku()), deps: [[e, new dt(), new ut()]] };
          }
          find(n) {
            const r = this.factories.find((c) => c.supports(n));
            if (null != r) return r;
            throw new y(901, !1);
          }
        }
        return (e.ɵprov = _({ token: e, providedIn: 'root', factory: ku })), e;
      })();
      function Tu() {
        return new Ft([new Eu()]);
      }
      let Ft = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const c = r.factories.slice();
              n = n.concat(c);
            }
            return new e(n);
          }
          static extend(n) {
            return { provide: e, useFactory: (r) => e.create(n, r || Tu()), deps: [[e, new dt(), new ut()]] };
          }
          find(n) {
            const r = this.factories.find((c) => c.supports(n));
            if (r) return r;
            throw new y(901, !1);
          }
        }
        return (e.ɵprov = _({ token: e, providedIn: 'root', factory: Tu })), e;
      })();
      const eE = Mu(null, 'core', []);
      let tE = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Qn));
          }),
          (e.ɵmod = V1({ type: e })),
          (e.ɵinj = u1({})),
          e
        );
      })();
      function S4(e) {
        return 'boolean' == typeof e ? e : null != e && 'false' !== e;
      }
      let Ca = null;
      function Ee() {
        return Ca;
      }
      class cE {}
      const G2 = new S('DocumentToken');
      let Ma = (() => {
        class e {
          historyGo(n) {
            throw new Error('Not implemented');
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({
            token: e,
            factory: function () {
              return (function aE() {
                return D(Iu);
              })();
            },
            providedIn: 'platform',
          })),
          e
        );
      })();
      const iE = new S('Location Initialized');
      let Iu = (() => {
        class e extends Ma {
          constructor(n) {
            super(), (this._doc = n), (this._location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Ee().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Ee().getGlobalEventTarget(this._doc, 'window');
            return r.addEventListener('popstate', n, !1), () => r.removeEventListener('popstate', n);
          }
          onHashChange(n) {
            const r = Ee().getGlobalEventTarget(this._doc, 'window');
            return r.addEventListener('hashchange', n, !1), () => r.removeEventListener('hashchange', n);
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, c) {
            Ru() ? this._history.pushState(n, r, c) : (this._location.hash = c);
          }
          replaceState(n, r, c) {
            Ru() ? this._history.replaceState(n, r, c) : (this._location.hash = c);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(G2));
          }),
          (e.ɵprov = _({
            token: e,
            factory: function () {
              return (function sE() {
                return new Iu(D(G2));
              })();
            },
            providedIn: 'platform',
          })),
          e
        );
      })();
      function Ru() {
        return !!window.history.pushState;
      }
      function Ha(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith('/') && n++, t.startsWith('/') && n++, 2 == n ? e + t.substring(1) : 1 == n ? e + t : e + '/' + t
        );
      }
      function Fu(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ('/' === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function ke(e) {
        return e && '?' !== e[0] ? '?' + e : e;
      }
      let b3 = (() => {
        class e {
          historyGo(n) {
            throw new Error('Not implemented');
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({
            token: e,
            factory: function () {
              return q(Ou);
            },
            providedIn: 'root',
          })),
          e
        );
      })();
      const Pu = new S('appBaseHref');
      let Ou = (() => {
          class e extends b3 {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? q(G2).location?.origin ?? '');
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Ha(this._baseHref, n);
            }
            path(n = !1) {
              const r = this._platformLocation.pathname + ke(this._platformLocation.search),
                c = this._platformLocation.hash;
              return c && n ? `${r}${c}` : r;
            }
            pushState(n, r, c, a) {
              const i = this.prepareExternalUrl(c + ke(a));
              this._platformLocation.pushState(n, r, i);
            }
            replaceState(n, r, c, a) {
              const i = this.prepareExternalUrl(c + ke(a));
              this._platformLocation.replaceState(n, r, i);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(Ma), D(Pu, 8));
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          );
        })(),
        oE = (() => {
          class e extends b3 {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = '#'), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Ha(this._baseHref, n);
              return r.length > 0 ? '#' + r : r;
            }
            pushState(n, r, c, a) {
              let i = this.prepareExternalUrl(c + ke(a));
              0 == i.length && (i = this._platformLocation.pathname), this._platformLocation.pushState(n, r, i);
            }
            replaceState(n, r, c, a) {
              let i = this.prepareExternalUrl(c + ke(a));
              0 == i.length && (i = this._platformLocation.pathname), this._platformLocation.replaceState(n, r, i);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(Ma), D(Pu, 8));
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Va = (() => {
          class e {
            constructor(n) {
              (this._subject = new y2()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function uE(e) {
                if (new RegExp('^(https?:)?//').test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(Fu(Bu(r)))),
                this._locationStrategy.onPopState((c) => {
                  this._subject.emit({ url: this.path(!0), pop: !0, state: c.state, type: c.type });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = '') {
              return this.path() == this.normalize(n + ke(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function fE(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return '' === n || ['/', ';', '?', '#'].includes(n[0]) ? n : t;
                })(this._basePath, Bu(n)),
              );
            }
            prepareExternalUrl(n) {
              return n && '/' !== n[0] && (n = '/' + n), this._locationStrategy.prepareExternalUrl(n);
            }
            go(n, r = '', c = null) {
              this._locationStrategy.pushState(c, '', n, r),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(n + ke(r)), c);
            }
            replaceState(n, r = '', c = null) {
              this._locationStrategy.replaceState(c, '', n, r),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(n + ke(r)), c);
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(), (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = '', r) {
              this._urlChangeListeners.forEach((c) => c(n, r));
            }
            subscribe(n, r, c) {
              return this._subject.subscribe({ next: n, error: r, complete: c });
            }
          }
          return (
            (e.normalizeQueryParams = ke),
            (e.joinWithSlash = Ha),
            (e.stripTrailingSlash = Fu),
            (e.ɵfac = function (n) {
              return new (n || e)(D(b3));
            }),
            (e.ɵprov = _({
              token: e,
              factory: function () {
                return (function lE() {
                  return new Va(D(b3));
                })();
              },
              providedIn: 'root',
            })),
            e
          );
        })();
      function Bu(e) {
        return e.replace(/\/index.html$/, '');
      }
      var S2 = (() => (((S2 = S2 || {})[(S2.Format = 0)] = 'Format'), (S2[(S2.Standalone = 1)] = 'Standalone'), S2))(),
        Q = (() => (
          ((Q = Q || {})[(Q.Narrow = 0)] = 'Narrow'),
          (Q[(Q.Abbreviated = 1)] = 'Abbreviated'),
          (Q[(Q.Wide = 2)] = 'Wide'),
          (Q[(Q.Short = 3)] = 'Short'),
          Q
        ))(),
        M2 = (() => (
          ((M2 = M2 || {})[(M2.Short = 0)] = 'Short'),
          (M2[(M2.Medium = 1)] = 'Medium'),
          (M2[(M2.Long = 2)] = 'Long'),
          (M2[(M2.Full = 3)] = 'Full'),
          M2
        ))(),
        E = (() => (
          ((E = E || {})[(E.Decimal = 0)] = 'Decimal'),
          (E[(E.Group = 1)] = 'Group'),
          (E[(E.List = 2)] = 'List'),
          (E[(E.PercentSign = 3)] = 'PercentSign'),
          (E[(E.PlusSign = 4)] = 'PlusSign'),
          (E[(E.MinusSign = 5)] = 'MinusSign'),
          (E[(E.Exponential = 6)] = 'Exponential'),
          (E[(E.SuperscriptingExponent = 7)] = 'SuperscriptingExponent'),
          (E[(E.PerMille = 8)] = 'PerMille'),
          (E[(E.Infinity = 9)] = 'Infinity'),
          (E[(E.NaN = 10)] = 'NaN'),
          (E[(E.TimeSeparator = 11)] = 'TimeSeparator'),
          (E[(E.CurrencyDecimal = 12)] = 'CurrencyDecimal'),
          (E[(E.CurrencyGroup = 13)] = 'CurrencyGroup'),
          E
        ))();
      function r0(e, t) {
        return F1(o1(e)[z.DateFormat], t);
      }
      function c0(e, t) {
        return F1(o1(e)[z.TimeFormat], t);
      }
      function a0(e, t) {
        return F1(o1(e)[z.DateTimeFormat], t);
      }
      function R1(e, t) {
        const n = o1(e),
          r = n[z.NumberSymbols][t];
        if (typeof r > 'u') {
          if (t === E.CurrencyDecimal) return n[z.NumberSymbols][E.Decimal];
          if (t === E.CurrencyGroup) return n[z.NumberSymbols][E.Group];
        }
        return r;
      }
      function ju(e) {
        if (!e[z.ExtraData])
          throw new Error(
            `Missing extra locale data for the locale "${
              e[z.LocaleId]
            }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`,
          );
      }
      function F1(e, t) {
        for (let n = t; n > -1; n--) if (typeof e[n] < 'u') return e[n];
        throw new Error('Locale data API: locale data undefined');
      }
      function za(e) {
        const [t, n] = e.split(':');
        return { hours: +t, minutes: +n };
      }
      const LE =
          /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
        Pt = {},
        wE =
          /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
      var F2 = (() => (
          ((F2 = F2 || {})[(F2.Short = 0)] = 'Short'),
          (F2[(F2.ShortGMT = 1)] = 'ShortGMT'),
          (F2[(F2.Long = 2)] = 'Long'),
          (F2[(F2.Extended = 3)] = 'Extended'),
          F2
        ))(),
        R = (() => (
          ((R = R || {})[(R.FullYear = 0)] = 'FullYear'),
          (R[(R.Month = 1)] = 'Month'),
          (R[(R.Date = 2)] = 'Date'),
          (R[(R.Hours = 3)] = 'Hours'),
          (R[(R.Minutes = 4)] = 'Minutes'),
          (R[(R.Seconds = 5)] = 'Seconds'),
          (R[(R.FractionalSeconds = 6)] = 'FractionalSeconds'),
          (R[(R.Day = 7)] = 'Day'),
          R
        ))(),
        G = (() => (
          ((G = G || {})[(G.DayPeriods = 0)] = 'DayPeriods'),
          (G[(G.Days = 1)] = 'Days'),
          (G[(G.Months = 2)] = 'Months'),
          (G[(G.Eras = 3)] = 'Eras'),
          G
        ))();
      function bE(e, t, n, r) {
        let c = (function TE(e) {
          if (Wu(e)) return e;
          if ('number' == typeof e && !isNaN(e)) return new Date(e);
          if ('string' == typeof e) {
            if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
              const [c, a = 1, i = 1] = e.split('-').map((s) => +s);
              return s0(c, a - 1, i);
            }
            const n = parseFloat(e);
            if (!isNaN(e - n)) return new Date(n);
            let r;
            if ((r = e.match(LE)))
              return (function IE(e) {
                const t = new Date(0);
                let n = 0,
                  r = 0;
                const c = e[8] ? t.setUTCFullYear : t.setFullYear,
                  a = e[8] ? t.setUTCHours : t.setHours;
                e[9] && ((n = Number(e[9] + e[10])), (r = Number(e[9] + e[11]))),
                  c.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
                const i = Number(e[4] || 0) - n,
                  s = Number(e[5] || 0) - r,
                  o = Number(e[6] || 0),
                  l = Math.floor(1e3 * parseFloat('0.' + (e[7] || 0)));
                return a.call(t, i, s, o, l), t;
              })(r);
          }
          const t = new Date(e);
          if (!Wu(t)) throw new Error(`Unable to convert "${e}" into a date`);
          return t;
        })(e);
        t = Te(n, t) || t;
        let s,
          i = [];
        for (; t; ) {
          if (((s = wE.exec(t)), !s)) {
            i.push(t);
            break;
          }
          {
            i = i.concat(s.slice(1));
            const f = i.pop();
            if (!f) break;
            t = f;
          }
        }
        let o = c.getTimezoneOffset();
        r &&
          ((o = Gu(r, o)),
          (c = (function kE(e, t, n) {
            const r = n ? -1 : 1,
              c = e.getTimezoneOffset();
            return (function EE(e, t) {
              return (e = new Date(e.getTime())).setMinutes(e.getMinutes() + t), e;
            })(e, r * (Gu(t, c) - c));
          })(c, r, !0)));
        let l = '';
        return (
          i.forEach((f) => {
            const u = (function AE(e) {
              if (wa[e]) return wa[e];
              let t;
              switch (e) {
                case 'G':
                case 'GG':
                case 'GGG':
                  t = d2(G.Eras, Q.Abbreviated);
                  break;
                case 'GGGG':
                  t = d2(G.Eras, Q.Wide);
                  break;
                case 'GGGGG':
                  t = d2(G.Eras, Q.Narrow);
                  break;
                case 'y':
                  t = E2(R.FullYear, 1, 0, !1, !0);
                  break;
                case 'yy':
                  t = E2(R.FullYear, 2, 0, !0, !0);
                  break;
                case 'yyy':
                  t = E2(R.FullYear, 3, 0, !1, !0);
                  break;
                case 'yyyy':
                  t = E2(R.FullYear, 4, 0, !1, !0);
                  break;
                case 'Y':
                  t = u0(1);
                  break;
                case 'YY':
                  t = u0(2, !0);
                  break;
                case 'YYY':
                  t = u0(3);
                  break;
                case 'YYYY':
                  t = u0(4);
                  break;
                case 'M':
                case 'L':
                  t = E2(R.Month, 1, 1);
                  break;
                case 'MM':
                case 'LL':
                  t = E2(R.Month, 2, 1);
                  break;
                case 'MMM':
                  t = d2(G.Months, Q.Abbreviated);
                  break;
                case 'MMMM':
                  t = d2(G.Months, Q.Wide);
                  break;
                case 'MMMMM':
                  t = d2(G.Months, Q.Narrow);
                  break;
                case 'LLL':
                  t = d2(G.Months, Q.Abbreviated, S2.Standalone);
                  break;
                case 'LLLL':
                  t = d2(G.Months, Q.Wide, S2.Standalone);
                  break;
                case 'LLLLL':
                  t = d2(G.Months, Q.Narrow, S2.Standalone);
                  break;
                case 'w':
                  t = La(1);
                  break;
                case 'ww':
                  t = La(2);
                  break;
                case 'W':
                  t = La(1, !0);
                  break;
                case 'd':
                  t = E2(R.Date, 1);
                  break;
                case 'dd':
                  t = E2(R.Date, 2);
                  break;
                case 'c':
                case 'cc':
                  t = E2(R.Day, 1);
                  break;
                case 'ccc':
                  t = d2(G.Days, Q.Abbreviated, S2.Standalone);
                  break;
                case 'cccc':
                  t = d2(G.Days, Q.Wide, S2.Standalone);
                  break;
                case 'ccccc':
                  t = d2(G.Days, Q.Narrow, S2.Standalone);
                  break;
                case 'cccccc':
                  t = d2(G.Days, Q.Short, S2.Standalone);
                  break;
                case 'E':
                case 'EE':
                case 'EEE':
                  t = d2(G.Days, Q.Abbreviated);
                  break;
                case 'EEEE':
                  t = d2(G.Days, Q.Wide);
                  break;
                case 'EEEEE':
                  t = d2(G.Days, Q.Narrow);
                  break;
                case 'EEEEEE':
                  t = d2(G.Days, Q.Short);
                  break;
                case 'a':
                case 'aa':
                case 'aaa':
                  t = d2(G.DayPeriods, Q.Abbreviated);
                  break;
                case 'aaaa':
                  t = d2(G.DayPeriods, Q.Wide);
                  break;
                case 'aaaaa':
                  t = d2(G.DayPeriods, Q.Narrow);
                  break;
                case 'b':
                case 'bb':
                case 'bbb':
                  t = d2(G.DayPeriods, Q.Abbreviated, S2.Standalone, !0);
                  break;
                case 'bbbb':
                  t = d2(G.DayPeriods, Q.Wide, S2.Standalone, !0);
                  break;
                case 'bbbbb':
                  t = d2(G.DayPeriods, Q.Narrow, S2.Standalone, !0);
                  break;
                case 'B':
                case 'BB':
                case 'BBB':
                  t = d2(G.DayPeriods, Q.Abbreviated, S2.Format, !0);
                  break;
                case 'BBBB':
                  t = d2(G.DayPeriods, Q.Wide, S2.Format, !0);
                  break;
                case 'BBBBB':
                  t = d2(G.DayPeriods, Q.Narrow, S2.Format, !0);
                  break;
                case 'h':
                  t = E2(R.Hours, 1, -12);
                  break;
                case 'hh':
                  t = E2(R.Hours, 2, -12);
                  break;
                case 'H':
                  t = E2(R.Hours, 1);
                  break;
                case 'HH':
                  t = E2(R.Hours, 2);
                  break;
                case 'm':
                  t = E2(R.Minutes, 1);
                  break;
                case 'mm':
                  t = E2(R.Minutes, 2);
                  break;
                case 's':
                  t = E2(R.Seconds, 1);
                  break;
                case 'ss':
                  t = E2(R.Seconds, 2);
                  break;
                case 'S':
                  t = E2(R.FractionalSeconds, 1);
                  break;
                case 'SS':
                  t = E2(R.FractionalSeconds, 2);
                  break;
                case 'SSS':
                  t = E2(R.FractionalSeconds, 3);
                  break;
                case 'Z':
                case 'ZZ':
                case 'ZZZ':
                  t = l0(F2.Short);
                  break;
                case 'ZZZZZ':
                  t = l0(F2.Extended);
                  break;
                case 'O':
                case 'OO':
                case 'OOO':
                case 'z':
                case 'zz':
                case 'zzz':
                  t = l0(F2.ShortGMT);
                  break;
                case 'OOOO':
                case 'ZZZZ':
                case 'zzzz':
                  t = l0(F2.Long);
                  break;
                default:
                  return null;
              }
              return (wa[e] = t), t;
            })(f);
            l += u ? u(c, n, o) : "''" === f ? "'" : f.replace(/(^'|'$)/g, '').replace(/''/g, "'");
          }),
          l
        );
      }
      function s0(e, t, n) {
        const r = new Date(0);
        return r.setFullYear(e, t, n), r.setHours(0, 0, 0), r;
      }
      function Te(e, t) {
        const n = (function dE(e) {
          return o1(e)[z.LocaleId];
        })(e);
        if (((Pt[n] = Pt[n] || {}), Pt[n][t])) return Pt[n][t];
        let r = '';
        switch (t) {
          case 'shortDate':
            r = r0(e, M2.Short);
            break;
          case 'mediumDate':
            r = r0(e, M2.Medium);
            break;
          case 'longDate':
            r = r0(e, M2.Long);
            break;
          case 'fullDate':
            r = r0(e, M2.Full);
            break;
          case 'shortTime':
            r = c0(e, M2.Short);
            break;
          case 'mediumTime':
            r = c0(e, M2.Medium);
            break;
          case 'longTime':
            r = c0(e, M2.Long);
            break;
          case 'fullTime':
            r = c0(e, M2.Full);
            break;
          case 'short':
            const c = Te(e, 'shortTime'),
              a = Te(e, 'shortDate');
            r = o0(a0(e, M2.Short), [c, a]);
            break;
          case 'medium':
            const i = Te(e, 'mediumTime'),
              s = Te(e, 'mediumDate');
            r = o0(a0(e, M2.Medium), [i, s]);
            break;
          case 'long':
            const o = Te(e, 'longTime'),
              l = Te(e, 'longDate');
            r = o0(a0(e, M2.Long), [o, l]);
            break;
          case 'full':
            const f = Te(e, 'fullTime'),
              u = Te(e, 'fullDate');
            r = o0(a0(e, M2.Full), [f, u]);
        }
        return r && (Pt[n][t] = r), r;
      }
      function o0(e, t) {
        return (
          t &&
            (e = e.replace(/\{([^}]+)}/g, function (n, r) {
              return null != t && r in t ? t[r] : n;
            })),
          e
        );
      }
      function Q1(e, t, n = '-', r, c) {
        let a = '';
        (e < 0 || (c && e <= 0)) && (c ? (e = 1 - e) : ((e = -e), (a = n)));
        let i = String(e);
        for (; i.length < t; ) i = '0' + i;
        return r && (i = i.slice(i.length - t)), a + i;
      }
      function E2(e, t, n = 0, r = !1, c = !1) {
        return function (a, i) {
          let s = (function SE(e, t) {
            switch (e) {
              case R.FullYear:
                return t.getFullYear();
              case R.Month:
                return t.getMonth();
              case R.Date:
                return t.getDate();
              case R.Hours:
                return t.getHours();
              case R.Minutes:
                return t.getMinutes();
              case R.Seconds:
                return t.getSeconds();
              case R.FractionalSeconds:
                return t.getMilliseconds();
              case R.Day:
                return t.getDay();
              default:
                throw new Error(`Unknown DateType value "${e}".`);
            }
          })(e, a);
          if (((n > 0 || s > -n) && (s += n), e === R.Hours)) 0 === s && -12 === n && (s = 12);
          else if (e === R.FractionalSeconds)
            return (function DE(e, t) {
              return Q1(e, 3).substring(0, t);
            })(s, t);
          const o = R1(i, E.MinusSign);
          return Q1(s, t, o, r, c);
        };
      }
      function d2(e, t, n = S2.Format, r = !1) {
        return function (c, a) {
          return (function xE(e, t, n, r, c, a) {
            switch (n) {
              case G.Months:
                return (function mE(e, t, n) {
                  const r = o1(e),
                    a = F1([r[z.MonthsFormat], r[z.MonthsStandalone]], t);
                  return F1(a, n);
                })(t, c, r)[e.getMonth()];
              case G.Days:
                return (function pE(e, t, n) {
                  const r = o1(e),
                    a = F1([r[z.DaysFormat], r[z.DaysStandalone]], t);
                  return F1(a, n);
                })(t, c, r)[e.getDay()];
              case G.DayPeriods:
                const i = e.getHours(),
                  s = e.getMinutes();
                if (a) {
                  const l = (function ME(e) {
                      const t = o1(e);
                      return (
                        ju(t),
                        (t[z.ExtraData][2] || []).map((r) => ('string' == typeof r ? za(r) : [za(r[0]), za(r[1])]))
                      );
                    })(t),
                    f = (function HE(e, t, n) {
                      const r = o1(e);
                      ju(r);
                      const a = F1([r[z.ExtraData][0], r[z.ExtraData][1]], t) || [];
                      return F1(a, n) || [];
                    })(t, c, r),
                    u = l.findIndex((d) => {
                      if (Array.isArray(d)) {
                        const [h, p] = d,
                          m = i >= h.hours && s >= h.minutes,
                          v = i < p.hours || (i === p.hours && s < p.minutes);
                        if (h.hours < p.hours) {
                          if (m && v) return !0;
                        } else if (m || v) return !0;
                      } else if (d.hours === i && d.minutes === s) return !0;
                      return !1;
                    });
                  if (-1 !== u) return f[u];
                }
                return (function hE(e, t, n) {
                  const r = o1(e),
                    a = F1([r[z.DayPeriodsFormat], r[z.DayPeriodsStandalone]], t);
                  return F1(a, n);
                })(t, c, r)[i < 12 ? 0 : 1];
              case G.Eras:
                return (function gE(e, t) {
                  return F1(o1(e)[z.Eras], t);
                })(t, r)[e.getFullYear() <= 0 ? 0 : 1];
              default:
                throw new Error(`unexpected translation type ${n}`);
            }
          })(c, a, e, t, n, r);
        };
      }
      function l0(e) {
        return function (t, n, r) {
          const c = -1 * r,
            a = R1(n, E.MinusSign),
            i = c > 0 ? Math.floor(c / 60) : Math.ceil(c / 60);
          switch (e) {
            case F2.Short:
              return (c >= 0 ? '+' : '') + Q1(i, 2, a) + Q1(Math.abs(c % 60), 2, a);
            case F2.ShortGMT:
              return 'GMT' + (c >= 0 ? '+' : '') + Q1(i, 1, a);
            case F2.Long:
              return 'GMT' + (c >= 0 ? '+' : '') + Q1(i, 2, a) + ':' + Q1(Math.abs(c % 60), 2, a);
            case F2.Extended:
              return 0 === r ? 'Z' : (c >= 0 ? '+' : '') + Q1(i, 2, a) + ':' + Q1(Math.abs(c % 60), 2, a);
            default:
              throw new Error(`Unknown zone width "${e}"`);
          }
        };
      }
      const _E = 0,
        f0 = 4;
      function $u(e) {
        return s0(e.getFullYear(), e.getMonth(), e.getDate() + (f0 - e.getDay()));
      }
      function La(e, t = !1) {
        return function (n, r) {
          let c;
          if (t) {
            const a = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
              i = n.getDate();
            c = 1 + Math.floor((i + a) / 7);
          } else {
            const a = $u(n),
              i = (function NE(e) {
                const t = s0(e, _E, 1).getDay();
                return s0(e, 0, 1 + (t <= f0 ? f0 : f0 + 7) - t);
              })(a.getFullYear()),
              s = a.getTime() - i.getTime();
            c = 1 + Math.round(s / 6048e5);
          }
          return Q1(c, e, R1(r, E.MinusSign));
        };
      }
      function u0(e, t = !1) {
        return function (n, r) {
          return Q1($u(n).getFullYear(), e, R1(r, E.MinusSign), t);
        };
      }
      const wa = {};
      function Gu(e, t) {
        e = e.replace(/:/g, '');
        const n = Date.parse('Jan 01, 1970 00:00:00 ' + e) / 6e4;
        return isNaN(n) ? t : n;
      }
      function Wu(e) {
        return e instanceof Date && !isNaN(e.valueOf());
      }
      function Ku(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(';')) {
          const r = n.indexOf('='),
            [c, a] = -1 == r ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
          if (c.trim() === t) return decodeURIComponent(a);
        }
        return null;
      }
      const Na = /\s+/,
        Qu = [];
      let Zu = (() => {
        class e {
          constructor(n, r, c, a) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = c),
              (this._renderer = a),
              (this.initialClasses = Qu),
              (this.stateMap = new Map());
          }
          set klass(n) {
            this.initialClasses = null != n ? n.trim().split(Na) : Qu;
          }
          set ngClass(n) {
            this.rawClass = 'string' == typeof n ? n.trim().split(Na) : n;
          }
          ngDoCheck() {
            for (const r of this.initialClasses) this._updateState(r, !0);
            const n = this.rawClass;
            if (Array.isArray(n) || n instanceof Set) for (const r of n) this._updateState(r, !0);
            else if (null != n) for (const r of Object.keys(n)) this._updateState(r, Boolean(n[r]));
            this._applyStateDiff();
          }
          _updateState(n, r) {
            const c = this.stateMap.get(n);
            void 0 !== c
              ? (c.enabled !== r && ((c.changed = !0), (c.enabled = r)), (c.touched = !0))
              : this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const n of this.stateMap) {
              const r = n[0],
                c = n[1];
              c.changed
                ? (this._toggleClass(r, c.enabled), (c.changed = !1))
                : c.touched || (c.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)),
                (c.touched = !1);
            }
          }
          _toggleClass(n, r) {
            (n = n.trim()).length > 0 &&
              n.split(Na).forEach((c) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, c)
                  : this._renderer.removeClass(this._ngEl.nativeElement, c);
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(n0), M(Ft), M(v1), M(fe));
          }),
          (e.ɵdir = F({
            type: e,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
            standalone: !0,
          })),
          e
        );
      })();
      class XE {
        constructor(t, n, r, c) {
          (this.$implicit = t), (this.ngForOf = n), (this.index = r), (this.count = c);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Aa = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, c) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = c),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ && n && (this._differ = this._differs.find(n).create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((c, a, i) => {
              if (null == c.previousIndex)
                r.createEmbeddedView(this._template, new XE(c.item, this._ngForOf, -1, -1), null === i ? void 0 : i);
              else if (null == i) r.remove(null === a ? void 0 : a);
              else if (null !== a) {
                const s = r.get(a);
                r.move(s, i), td(s, c);
              }
            });
            for (let c = 0, a = r.length; c < a; c++) {
              const s = r.get(c).context;
              (s.index = c), (s.count = a), (s.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((c) => {
              td(r.get(c.currentIndex), c);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(X1), M(_e), M(n0));
          }),
          (e.ɵdir = F({
            type: e,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: { ngForOf: 'ngForOf', ngForTrackBy: 'ngForTrackBy', ngForTemplate: 'ngForTemplate' },
            standalone: !0,
          })),
          e
        );
      })();
      function td(e, t) {
        e.context.$implicit = t.item;
      }
      let Ea = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new QE()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n), this._updateView();
          }
          set ngIfThen(n) {
            nd('ngIfThen', n), (this._thenTemplateRef = n), (this._thenViewRef = null), this._updateView();
          }
          set ngIfElse(n) {
            nd('ngIfElse', n), (this._elseTemplateRef = n), (this._elseViewRef = null), this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context)))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(X1), M(_e));
          }),
          (e.ɵdir = F({
            type: e,
            selectors: [['', 'ngIf', '']],
            inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' },
            standalone: !0,
          })),
          e
        );
      })();
      class QE {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function nd(e, t) {
        if (t && !t.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${l2(t)}'.`);
      }
      const fk = new S('DATE_PIPE_DEFAULT_TIMEZONE'),
        uk = new S('DATE_PIPE_DEFAULT_OPTIONS');
      let Ia = (() => {
          class e {
            constructor(n, r, c) {
              (this.locale = n), (this.defaultTimezone = r), (this.defaultOptions = c);
            }
            transform(n, r, c, a) {
              if (null == n || '' === n || n != n) return null;
              try {
                return bE(
                  n,
                  r ?? this.defaultOptions?.dateFormat ?? 'mediumDate',
                  a || this.locale,
                  c ?? this.defaultOptions?.timezone ?? this.defaultTimezone ?? void 0,
                );
              } catch (i) {
                throw (function Z1(e, t) {
                  return new y(2100, !1);
                })();
              }
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ne, 16), M(fk, 24), M(uk, 24));
            }),
            (e.ɵpipe = d1({ name: 'date', type: e, pure: !0, standalone: !0 })),
            e
          );
        })(),
        Vk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = V1({ type: e })),
            (e.ɵinj = u1({})),
            e
          );
        })();
      let wk = (() => {
        class e {}
        return (e.ɵprov = _({ token: e, providedIn: 'root', factory: () => new bk(D(G2), window) })), e;
      })();
      class bk {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function Dk(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if ('function' == typeof e.createTreeWalker && e.body && (e.body.createShadowRoot || e.body.attachShadow)) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let c = r.currentNode;
              for (; c; ) {
                const a = c.shadowRoot;
                if (a) {
                  const i = a.getElementById(t) || a.querySelector(`[name="${t}"]`);
                  if (i) return i;
                }
                c = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            c = n.top + this.window.pageYOffset,
            a = this.offset();
          this.window.scrollTo(r - a[0], c - a[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t = id(this.window.history) || id(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window;
          } catch {
            return !1;
          }
        }
      }
      function id(e) {
        return Object.getOwnPropertyDescriptor(e, 'scrollRestoration');
      }
      class sd {}
      class eT extends cE {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Ba extends eT {
        static makeCurrent() {
          !(function rE(e) {
            Ca || (Ca = e);
          })(new Ba());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return 'window' === n ? window : 'document' === n ? t : 'body' === n ? t.body : null;
        }
        getBaseHref(t) {
          const n = (function tT() {
            return (Ut = Ut || document.querySelector('base')), Ut ? Ut.getAttribute('href') : null;
          })();
          return null == n
            ? null
            : (function nT(e) {
                (m0 = m0 || document.createElement('a')), m0.setAttribute('href', e);
                const t = m0.pathname;
                return '/' === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Ut = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return Ku(document.cookie, t);
        }
      }
      let m0,
        Ut = null;
      const dd = new S('TRANSITION_ID'),
        cT = [
          {
            provide: Yn,
            useFactory: function rT(e, t, n) {
              return () => {
                n.get(Xn).donePromise.then(() => {
                  const r = Ee(),
                    c = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let a = 0; a < c.length; a++) r.remove(c[a]);
                });
              };
            },
            deps: [dd, G2, G1],
            multi: !0,
          },
        ];
      let iT = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const g0 = new S('EventManagerPlugins');
      let v0 = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((c) => {
                c.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, c) {
            return this._findPluginFor(r).addEventListener(n, r, c);
          }
          addGlobalEventListener(n, r, c) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, c);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const c = this._plugins;
            for (let a = 0; a < c.length; a++) {
              const i = c[a];
              if (i.supports(n)) return this._eventNameToPlugin.set(n, i), i;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(g0), D(D2));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class hd {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const c = Ee().getGlobalEventTarget(this._doc, t);
          if (!c) throw new Error(`Unsupported event target ${c} for event ${n}`);
          return this.addEventListener(c, n, r);
        }
      }
      let pd = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n) 1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n) 0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const c = this.usageCount;
              let a = c.get(n) ?? 0;
              return (a += r), a > 0 ? c.set(n, a) : c.delete(n), a;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        jt = (() => {
          class e extends pd {
            constructor(n) {
              super(), (this.doc = n), (this.styleRef = new Map()), (this.hostNodes = new Set()), this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((a) => a.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const c = this.doc.createElement('style');
              (c.textContent = r), n.appendChild(c);
              const a = this.styleRef.get(r);
              a ? a.push(c) : this.styleRef.set(r, [c]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(G2));
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Ua = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        ja = /%COMP%/g,
        vd = new S('RemoveStylesOnCompDestory', { providedIn: 'root', factory: () => !1 });
      function Cd(e, t) {
        return t.flat(100).map((n) => n.replace(ja, e));
      }
      function Md(e) {
        return (t) => {
          if ('__ngUnwrap__' === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let $a = (() => {
        class e {
          constructor(n, r, c, a) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = c),
              (this.removeStylesOnCompDestory = a),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ga(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const c = this.getOrCreateRenderer(n, r);
            return c instanceof yd ? c.applyToHost(n) : c instanceof Wa && c.applyStyles(), c;
          }
          getOrCreateRenderer(n, r) {
            const c = this.rendererByCompId;
            let a = c.get(r.id);
            if (!a) {
              const i = this.eventManager,
                s = this.sharedStylesHost,
                o = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case ce.Emulated:
                  a = new yd(i, s, r, this.appId, o);
                  break;
                case ce.ShadowDom:
                  return new hT(i, s, n, r);
                default:
                  a = new Wa(i, s, r, o);
              }
              (a.onDestroy = () => c.delete(r.id)), c.set(r.id, a);
            }
            return a;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(v0), D(jt), D(Rt), D(vd));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ga {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null)), (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n ? document.createElementNS(Ua[n] || n, t) : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Vd(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Vd(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = 'string' == typeof t ? document.querySelector(t) : t;
          if (!r) throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ''), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, c) {
          if (c) {
            n = c + ':' + n;
            const a = Ua[c];
            a ? t.setAttributeNS(a, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const c = Ua[r];
            c ? t.removeAttributeNS(c, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, c) {
          c & (m1.DashCase | m1.Important)
            ? t.style.setProperty(n, r, c & m1.Important ? 'important' : '')
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & m1.DashCase ? t.style.removeProperty(n) : (t.style[n] = '');
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, Md(r))
            : this.eventManager.addEventListener(t, n, Md(r));
        }
      }
      function Vd(e) {
        return 'TEMPLATE' === e.tagName && void 0 !== e.content;
      }
      class hT extends Ga {
        constructor(t, n, r, c) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const a = Cd(c.id, c.styles);
          for (const i of a) {
            const s = document.createElement('style');
            (s.textContent = i), this.shadowRoot.appendChild(s);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Wa extends Ga {
        constructor(t, n, r, c, a = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = c),
            (this.rendererUsageCount = 0),
            (this.styles = Cd(a, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles), this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class yd extends Wa {
        constructor(t, n, r, c, a) {
          const i = c + '-' + r.id;
          super(t, n, r, a, i),
            (this.contentAttr = (function fT(e) {
              return '_ngcontent-%COMP%'.replace(ja, e);
            })(i)),
            (this.hostAttr = (function uT(e) {
              return '_nghost-%COMP%'.replace(ja, e);
            })(i));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ''), r;
        }
      }
      let pT = (() => {
        class e extends hd {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, c) {
            return n.addEventListener(r, c, !1), () => this.removeEventListener(n, r, c);
          }
          removeEventListener(n, r, c) {
            return n.removeEventListener(r, c);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(G2));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const zd = ['alt', 'control', 'meta', 'shift'],
        mT = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        gT = { alt: (e) => e.altKey, control: (e) => e.ctrlKey, meta: (e) => e.metaKey, shift: (e) => e.shiftKey };
      let vT = (() => {
        class e extends hd {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, c) {
            const a = e.parseEventName(r),
              i = e.eventCallback(a.fullKey, c, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => Ee().onAndCancel(n, a.domEventName, i));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split('.'),
              c = r.shift();
            if (0 === r.length || ('keydown' !== c && 'keyup' !== c)) return null;
            const a = e._normalizeKey(r.pop());
            let i = '',
              s = r.indexOf('code');
            if (
              (s > -1 && (r.splice(s, 1), (i = 'code.')),
              zd.forEach((l) => {
                const f = r.indexOf(l);
                f > -1 && (r.splice(f, 1), (i += l + '.'));
              }),
              (i += a),
              0 != r.length || 0 === a.length)
            )
              return null;
            const o = {};
            return (o.domEventName = c), (o.fullKey = i), o;
          }
          static matchEventFullKeyCode(n, r) {
            let c = mT[n.key] || n.key,
              a = '';
            return (
              r.indexOf('code.') > -1 && ((c = n.code), (a = 'code.')),
              !(null == c || !c) &&
                ((c = c.toLowerCase()),
                ' ' === c ? (c = 'space') : '.' === c && (c = 'dot'),
                zd.forEach((i) => {
                  i !== c && (0, gT[i])(n) && (a += i + '.');
                }),
                (a += c),
                a === r)
            );
          }
          static eventCallback(n, r, c) {
            return (a) => {
              e.matchEventFullKeyCode(a, n) && c.runGuarded(() => r(a));
            };
          }
          static _normalizeKey(n) {
            return 'esc' === n ? 'escape' : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(G2));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const VT = Mu(eE, 'browser', [
          { provide: aa, useValue: 'browser' },
          {
            provide: ou,
            useValue: function CT() {
              Ba.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: G2,
            useFactory: function HT() {
              return (
                (function Zb(e) {
                  Kc = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        bd = new S(''),
        Dd = [
          {
            provide: Kn,
            useClass: class aT {
              addToWindow(t) {
                (h2.getAngularTestability = (r, c = !0) => {
                  const a = t.findTestabilityInTree(r, c);
                  if (null == a) throw new Error('Could not find testability for element.');
                  return a;
                }),
                  (h2.getAllAngularTestabilities = () => t.getAllTestabilities()),
                  (h2.getAllAngularRootElements = () => t.getAllRootElements()),
                  h2.frameworkStabilizers || (h2.frameworkStabilizers = []),
                  h2.frameworkStabilizers.push((r) => {
                    const c = h2.getAllAngularTestabilities();
                    let a = c.length,
                      i = !1;
                    const s = function (o) {
                      (i = i || o), a--, 0 == a && r(i);
                    };
                    c.forEach(function (o) {
                      o.whenStable(s);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Ee().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: pu, useClass: la, deps: [D2, fa, Kn] },
          { provide: la, useClass: la, deps: [D2, fa, Kn] },
        ],
        Sd = [
          { provide: c8, useValue: 'root' },
          {
            provide: a4,
            useFactory: function MT() {
              return new a4();
            },
            deps: [],
          },
          { provide: g0, useClass: pT, multi: !0, deps: [G2, D2, aa] },
          { provide: g0, useClass: vT, multi: !0, deps: [G2] },
          { provide: $a, useClass: $a, deps: [v0, jt, Rt, vd] },
          { provide: J7, useExisting: $a },
          { provide: pd, useExisting: jt },
          { provide: jt, useClass: jt, deps: [G2] },
          { provide: v0, useClass: v0, deps: [g0, D2] },
          { provide: sd, useClass: iT, deps: [] },
          [],
        ];
      let yT = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [{ provide: Rt, useValue: n.appId }, { provide: dd, useExisting: Rt }, cT],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(bd, 12));
            }),
            (e.ɵmod = V1({ type: e })),
            (e.ɵinj = u1({ providers: [...Sd, ...Dd], imports: [Vk, tE] })),
            e
          );
        })(),
        xd = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || '';
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(G2));
            }),
            (e.ɵprov = _({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function LT() {
                        return new xd(D(G2));
                      })()),
                  r
                );
              },
              providedIn: 'root',
            })),
            e
          );
        })();
      typeof window < 'u' && window;
      let Ad = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({
              token: e,
              factory: function (n) {
                let r = null;
                return (r = n ? new (n || e)() : D(Ed)), r;
              },
              providedIn: 'root',
            })),
            e
          );
        })(),
        Ed = (() => {
          class e extends Ad {
            constructor(n) {
              super(), (this._doc = n);
            }
            sanitize(n, r) {
              if (null == r) return null;
              switch (n) {
                case u2.NONE:
                  return r;
                case u2.HTML:
                  return oe(r, 'HTML') ? b1(r) : F7(this._doc, String(r)).toString();
                case u2.STYLE:
                  return oe(r, 'Style') ? b1(r) : r;
                case u2.SCRIPT:
                  if (oe(r, 'Script')) return b1(r);
                  throw new Error('unsafe value used in a script context');
                case u2.URL:
                  return oe(r, 'URL') ? b1(r) : Cn(String(r));
                case u2.RESOURCE_URL:
                  if (oe(r, 'ResourceURL')) return b1(r);
                  throw new Error(`unsafe value used in a resource URL context (see ${R6})`);
                default:
                  throw new Error(`Unexpected SecurityContext ${n} (see ${R6})`);
              }
            }
            bypassSecurityTrustHtml(n) {
              return (function aD(e) {
                return new Jb(e);
              })(n);
            }
            bypassSecurityTrustStyle(n) {
              return (function iD(e) {
                return new eD(e);
              })(n);
            }
            bypassSecurityTrustScript(n) {
              return (function sD(e) {
                return new tD(e);
              })(n);
            }
            bypassSecurityTrustUrl(n) {
              return (function oD(e) {
                return new nD(e);
              })(n);
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function lD(e) {
                return new rD(e);
              })(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(G2));
            }),
            (e.ɵprov = _({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function xT(e) {
                        return new Ed(e.get(G2));
                      })(D(G1))),
                  r
                );
              },
              providedIn: 'root',
            })),
            e
          );
        })();
      function A(...e) {
        return N2(e, K4(e));
      }
      class J1 extends _1 {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const C0 = q4(
          (e) =>
            function () {
              e(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence');
            },
        ),
        { isArray: _T } = Array,
        { getPrototypeOf: NT, prototype: AT, keys: ET } = Object;
      function kd(e) {
        if (1 === e.length) {
          const t = e[0];
          if (_T(t)) return { args: t, keys: null };
          if (
            (function kT(e) {
              return e && 'object' == typeof e && NT(e) === AT;
            })(t)
          ) {
            const n = ET(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: TT } = Array;
      function Td(e) {
        return W((t) =>
          (function IT(e, t) {
            return TT(t) ? e(...t) : e(t);
          })(e, t),
        );
      }
      function Id(e, t) {
        return e.reduce((n, r, c) => ((n[r] = t[c]), n), {});
      }
      function Rd(...e) {
        const t = K4(e),
          n = jo(e),
          { args: r, keys: c } = kd(e);
        if (0 === r.length) return N2([], t);
        const a = new L2(
          (function RT(e, t, n = d3) {
            return (r) => {
              Fd(
                t,
                () => {
                  const { length: c } = e,
                    a = new Array(c);
                  let i = c,
                    s = c;
                  for (let o = 0; o < c; o++)
                    Fd(
                      t,
                      () => {
                        const l = N2(e[o], t);
                        let f = !1;
                        l.subscribe(
                          T2(
                            r,
                            (u) => {
                              (a[o] = u), f || ((f = !0), s--), s || r.next(n(a.slice()));
                            },
                            () => {
                              --i || r.complete();
                            },
                          ),
                        );
                      },
                      r,
                    );
                },
                r,
              );
            };
          })(r, t, c ? (i) => Id(c, i) : d3),
        );
        return n ? a.pipe(Td(n)) : a;
      }
      function Fd(e, t, n) {
        e ? He(n, e, t) : t();
      }
      function Xa(...e) {
        return (function FT() {
          return F3(1);
        })()(N2(e, K4(e)));
      }
      function Pd(e) {
        return new L2((t) => {
          N1(e()).subscribe(t);
        });
      }
      function $t(e, t) {
        const n = o2(e) ? e : () => e,
          r = (c) => c.error(n());
        return new L2(t ? (c) => t.schedule(r, 0, c) : r);
      }
      function Ka() {
        return O2((e, t) => {
          let n = null;
          e._refCount++;
          const r = T2(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount) return void (n = null);
            const c = e._connection,
              a = n;
            (n = null), c && (!a || c === a) && c.unsubscribe(), t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class Od extends L2 {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            So(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject;
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new n1();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                T2(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown(),
                ),
              ),
            ),
              t.closed && ((this._connection = null), (t = n1.EMPTY));
          }
          return t;
        }
        refCount() {
          return Ka()(this);
        }
      }
      function me(e, t) {
        return O2((n, r) => {
          let c = null,
            a = 0,
            i = !1;
          const s = () => i && !c && r.complete();
          n.subscribe(
            T2(
              r,
              (o) => {
                c?.unsubscribe();
                let l = 0;
                const f = a++;
                N1(e(o, f)).subscribe(
                  (c = T2(
                    r,
                    (u) => r.next(t ? t(o, u, f, l++) : u),
                    () => {
                      (c = null), s();
                    },
                  )),
                );
              },
              () => {
                (i = !0), s();
              },
            ),
          );
        });
      }
      function x4(e) {
        return e <= 0
          ? () => ne
          : O2((t, n) => {
              let r = 0;
              t.subscribe(
                T2(n, (c) => {
                  ++r <= e && (n.next(c), e <= r && n.complete());
                }),
              );
            });
      }
      function Ie(e, t) {
        return O2((n, r) => {
          let c = 0;
          n.subscribe(T2(r, (a) => e.call(t, a, c++) && r.next(a)));
        });
      }
      function M0(e) {
        return O2((t, n) => {
          let r = !1;
          t.subscribe(
            T2(
              n,
              (c) => {
                (r = !0), n.next(c);
              },
              () => {
                r || n.next(e), n.complete();
              },
            ),
          );
        });
      }
      function Bd(e = OT) {
        return O2((t, n) => {
          let r = !1;
          t.subscribe(
            T2(
              n,
              (c) => {
                (r = !0), n.next(c);
              },
              () => (r ? n.complete() : n.error(e())),
            ),
          );
        });
      }
      function OT() {
        return new C0();
      }
      function Ye(e, t) {
        const n = arguments.length >= 2;
        return (r) => r.pipe(e ? Ie((c, a) => e(c, a, r)) : d3, x4(1), n ? M0(t) : Bd(() => new C0()));
      }
      function Xe(e, t) {
        return o2(t) ? B2(e, t, 1) : B2(e, 1);
      }
      function e1(e, t, n) {
        const r = o2(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? O2((c, a) => {
              var i;
              null === (i = r.subscribe) || void 0 === i || i.call(r);
              let s = !0;
              c.subscribe(
                T2(
                  a,
                  (o) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, o), a.next(o);
                  },
                  () => {
                    var o;
                    (s = !1), null === (o = r.complete) || void 0 === o || o.call(r), a.complete();
                  },
                  (o) => {
                    var l;
                    (s = !1), null === (l = r.error) || void 0 === l || l.call(r, o), a.error(o);
                  },
                  () => {
                    var o, l;
                    s && (null === (o = r.unsubscribe) || void 0 === o || o.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  },
                ),
              );
            })
          : d3;
      }
      function Ke(e) {
        return O2((t, n) => {
          let a,
            r = null,
            c = !1;
          (r = t.subscribe(
            T2(n, void 0, void 0, (i) => {
              (a = N1(e(i, Ke(e)(t)))), r ? (r.unsubscribe(), (r = null), a.subscribe(n)) : (c = !0);
            }),
          )),
            c && (r.unsubscribe(), (r = null), a.subscribe(n));
        });
      }
      function Ud(e, t) {
        return O2(
          (function BT(e, t, n, r, c) {
            return (a, i) => {
              let s = n,
                o = t,
                l = 0;
              a.subscribe(
                T2(
                  i,
                  (f) => {
                    const u = l++;
                    (o = s ? e(o, f, u) : ((s = !0), f)), r && i.next(o);
                  },
                  c &&
                    (() => {
                      s && i.next(o), i.complete();
                    }),
                ),
              );
            };
          })(e, t, arguments.length >= 2, !0),
        );
      }
      function Qa(e) {
        return e <= 0
          ? () => ne
          : O2((t, n) => {
              let r = [];
              t.subscribe(
                T2(
                  n,
                  (c) => {
                    r.push(c), e < r.length && r.shift();
                  },
                  () => {
                    for (const c of r) n.next(c);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  },
                ),
              );
            });
      }
      function jd(e, t) {
        const n = arguments.length >= 2;
        return (r) => r.pipe(e ? Ie((c, a) => e(c, a, r)) : d3, Qa(1), n ? M0(t) : Bd(() => new C0()));
      }
      function Za(e) {
        return O2((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const j = 'primary',
        Gt = Symbol('RouteTitle');
      class $T {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function _4(e) {
        return new $T(e);
      }
      function GT(e, t, n) {
        const r = n.path.split('/');
        if (r.length > e.length || ('full' === n.pathMatch && (t.hasChildren() || r.length < e.length))) return null;
        const c = {};
        for (let a = 0; a < r.length; a++) {
          const i = r[a],
            s = e[a];
          if (i.startsWith(':')) c[i.substring(1)] = s;
          else if (i !== s.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: c };
      }
      function ge(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let c;
        for (let a = 0; a < n.length; a++) if (((c = n[a]), !$d(e[c], t[c]))) return !1;
        return !0;
      }
      function $d(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((c, a) => r[a] === c);
        }
        return e === t;
      }
      function Gd(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Wd(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function W2(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Qe(e) {
        return _8(e) ? e : Dt(e) ? N2(Promise.resolve(e)) : A(e);
      }
      const H0 = !1,
        qT = {
          exact: function Xd(e, t, n) {
            if (
              !D3(e.segments, t.segments) ||
              !V0(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children) if (!e.children[r] || !Xd(e.children[r], t.children[r], n)) return !1;
            return !0;
          },
          subset: Kd,
        },
        qd = {
          exact: function YT(e, t) {
            return ge(e, t);
          },
          subset: function XT(e, t) {
            return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every((n) => $d(e[n], t[n]));
          },
          ignored: () => !0,
        };
      function Yd(e, t, n) {
        return (
          qT[n.paths](e.root, t.root, n.matrixParams) &&
          qd[n.queryParams](e.queryParams, t.queryParams) &&
          !('exact' === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Kd(e, t, n) {
        return Qd(e, t, t.segments, n);
      }
      function Qd(e, t, n, r) {
        if (e.segments.length > n.length) {
          const c = e.segments.slice(0, n.length);
          return !(!D3(c, n) || t.hasChildren() || !V0(c, n, r));
        }
        if (e.segments.length === n.length) {
          if (!D3(e.segments, n) || !V0(e.segments, n, r)) return !1;
          for (const c in t.children) if (!e.children[c] || !Kd(e.children[c], t.children[c], r)) return !1;
          return !0;
        }
        {
          const c = n.slice(0, e.segments.length),
            a = n.slice(e.segments.length);
          return !!(D3(e.segments, c) && V0(e.segments, c, r) && e.children[j]) && Qd(e.children[j], t, a, r);
        }
      }
      function V0(e, t, n) {
        return t.every((r, c) => qd[n](e[c].parameters, r.parameters));
      }
      class Ze {
        constructor(t = new K([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = _4(this.queryParams)), this._queryParamMap;
        }
        toString() {
          return ZT.serialize(this);
        }
      }
      class K {
        constructor(t, n) {
          (this.segments = t), (this.children = n), (this.parent = null), W2(n, (r, c) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return y0(this);
        }
      }
      class Wt {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return this._parameterMap || (this._parameterMap = _4(this.parameters)), this._parameterMap;
        }
        toString() {
          return eh(this);
        }
      }
      function D3(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let qt = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({
            token: e,
            factory: function () {
              return new Ja();
            },
            providedIn: 'root',
          })),
          e
        );
      })();
      class Ja {
        parse(t) {
          const n = new sI(t);
          return new Ze(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment());
        }
        serialize(t) {
          const n = `/${Yt(t.root, !0)}`,
            r = (function tI(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r) ? r.map((c) => `${z0(n)}=${z0(c)}`).join('&') : `${z0(n)}=${z0(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join('&')}` : '';
            })(t.queryParams);
          return `${n}${r}${
            'string' == typeof t.fragment
              ? `#${(function JT(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ''
          }`;
        }
      }
      const ZT = new Ja();
      function y0(e) {
        return e.segments.map((t) => eh(t)).join('/');
      }
      function Yt(e, t) {
        if (!e.hasChildren()) return y0(e);
        if (t) {
          const n = e.children[j] ? Yt(e.children[j], !1) : '',
            r = [];
          return (
            W2(e.children, (c, a) => {
              a !== j && r.push(`${a}:${Yt(c, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join('//')})` : n
          );
        }
        {
          const n = (function QT(e, t) {
            let n = [];
            return (
              W2(e.children, (r, c) => {
                c === j && (n = n.concat(t(r, c)));
              }),
              W2(e.children, (r, c) => {
                c !== j && (n = n.concat(t(r, c)));
              }),
              n
            );
          })(e, (r, c) => (c === j ? [Yt(e.children[j], !1)] : [`${c}:${Yt(r, !1)}`]));
          return 1 === Object.keys(e.children).length && null != e.children[j]
            ? `${y0(e)}/${n[0]}`
            : `${y0(e)}/(${n.join('//')})`;
        }
      }
      function Zd(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',');
      }
      function z0(e) {
        return Zd(e).replace(/%3B/gi, ';');
      }
      function ei(e) {
        return Zd(e).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
      }
      function L0(e) {
        return decodeURIComponent(e);
      }
      function Jd(e) {
        return L0(e.replace(/\+/g, '%20'));
      }
      function eh(e) {
        return `${ei(e.path)}${(function eI(e) {
          return Object.keys(e)
            .map((t) => `;${ei(t)}=${ei(e[t])}`)
            .join('');
        })(e.parameters)}`;
      }
      const nI = /^[^\/()?;=#]+/;
      function w0(e) {
        const t = e.match(nI);
        return t ? t[0] : '';
      }
      const rI = /^[^=?&#]+/,
        aI = /^[^&#]+/;
      class sI {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining || this.peekStartsWith('?') || this.peekStartsWith('#')
              ? new K([], {})
              : new K([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional('&'));
          return t;
        }
        parseFragment() {
          return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
        }
        parseChildren() {
          if ('' === this.remaining) return {};
          this.consumeOptional('/');
          const t = [];
          for (
            this.peekStartsWith('(') || t.push(this.parseSegment());
            this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

          )
            this.capture('/'), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith('/(') && (this.capture('/'), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith('(') && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[j] = new K(t, n)),
            r
          );
        }
        parseSegment() {
          const t = w0(this.remaining);
          if ('' === t && this.peekStartsWith(';')) throw new y(4009, H0);
          return this.capture(t), new Wt(L0(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(';'); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = w0(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = '';
          if (this.consumeOptional('=')) {
            const c = w0(this.remaining);
            c && ((r = c), this.capture(r));
          }
          t[L0(n)] = L0(r);
        }
        parseQueryParam(t) {
          const n = (function cI(e) {
            const t = e.match(rI);
            return t ? t[0] : '';
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = '';
          if (this.consumeOptional('=')) {
            const i = (function iI(e) {
              const t = e.match(aI);
              return t ? t[0] : '';
            })(this.remaining);
            i && ((r = i), this.capture(r));
          }
          const c = Jd(n),
            a = Jd(r);
          if (t.hasOwnProperty(c)) {
            let i = t[c];
            Array.isArray(i) || ((i = [i]), (t[c] = i)), i.push(a);
          } else t[c] = a;
        }
        parseParens(t) {
          const n = {};
          for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
            const r = w0(this.remaining),
              c = this.remaining[r.length];
            if ('/' !== c && ')' !== c && ';' !== c) throw new y(4010, H0);
            let a;
            r.indexOf(':') > -1 ? ((a = r.slice(0, r.indexOf(':'))), this.capture(a), this.capture(':')) : t && (a = j);
            const i = this.parseChildren();
            (n[a] = 1 === Object.keys(i).length ? i[j] : new K([], i)), this.consumeOptional('//');
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return !!this.peekStartsWith(t) && ((this.remaining = this.remaining.substring(t.length)), !0);
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new y(4011, H0);
        }
      }
      function ti(e) {
        return e.segments.length > 0 ? new K([], { [j]: e }) : e;
      }
      function b0(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const a = b0(e.children[r]);
          (a.segments.length > 0 || a.hasChildren()) && (t[r] = a);
        }
        return (function oI(e) {
          if (1 === e.numberOfChildren && e.children[j]) {
            const t = e.children[j];
            return new K(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new K(e.segments, t));
      }
      function S3(e) {
        return e instanceof Ze;
      }
      const ni = !1;
      function lI(e, t, n, r, c) {
        if (0 === n.length) return N4(t.root, t.root, t.root, r, c);
        const a = (function ah(e) {
          if ('string' == typeof e[0] && 1 === e.length && '/' === e[0]) return new ch(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((c, a, i) => {
            if ('object' == typeof a && null != a) {
              if (a.outlets) {
                const s = {};
                return (
                  W2(a.outlets, (o, l) => {
                    s[l] = 'string' == typeof o ? o.split('/') : o;
                  }),
                  [...c, { outlets: s }]
                );
              }
              if (a.segmentPath) return [...c, a.segmentPath];
            }
            return 'string' != typeof a
              ? [...c, a]
              : 0 === i
              ? (a.split('/').forEach((s, o) => {
                  (0 == o && '.' === s) || (0 == o && '' === s ? (n = !0) : '..' === s ? t++ : '' != s && c.push(s));
                }),
                c)
              : [...c, a];
          }, []);
          return new ch(n, t, r);
        })(n);
        return a.toRoot()
          ? N4(t.root, t.root, new K([], {}), r, c)
          : (function i(o) {
              const l = (function uI(e, t, n, r) {
                  if (e.isAbsolute) return new A4(t.root, !0, 0);
                  if (-1 === r) return new A4(n, n === t.root, 0);
                  return (function ih(e, t, n) {
                    let r = e,
                      c = t,
                      a = n;
                    for (; a > c; ) {
                      if (((a -= c), (r = r.parent), !r)) throw new y(4005, ni && "Invalid number of '../'");
                      c = r.segments.length;
                    }
                    return new A4(r, !1, c - a);
                  })(n, r + (Xt(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(a, t, e.snapshot?._urlSegment, o),
                f = l.processChildren
                  ? E4(l.segmentGroup, l.index, a.commands)
                  : ri(l.segmentGroup, l.index, a.commands);
              return N4(t.root, l.segmentGroup, f, r, c);
            })(e.snapshot?._lastPathIndex);
      }
      function Xt(e) {
        return 'object' == typeof e && null != e && !e.outlets && !e.segmentPath;
      }
      function Kt(e) {
        return 'object' == typeof e && null != e && e.outlets;
      }
      function N4(e, t, n, r, c) {
        let i,
          a = {};
        r &&
          W2(r, (o, l) => {
            a[l] = Array.isArray(o) ? o.map((f) => `${f}`) : `${o}`;
          }),
          (i = e === t ? n : rh(e, t, n));
        const s = ti(b0(i));
        return new Ze(s, a, c);
      }
      function rh(e, t, n) {
        const r = {};
        return (
          W2(e.children, (c, a) => {
            r[a] = c === t ? n : rh(c, t, n);
          }),
          new K(e.segments, r)
        );
      }
      class ch {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t), (this.numberOfDoubleDots = n), (this.commands = r), t && r.length > 0 && Xt(r[0]))
          )
            throw new y(4003, ni && 'Root segment cannot have matrix parameters');
          const c = r.find(Kt);
          if (c && c !== Wd(r)) throw new y(4004, ni && '{outlets:{}} has to be the last command');
        }
        toRoot() {
          return this.isAbsolute && 1 === this.commands.length && '/' == this.commands[0];
        }
      }
      class A4 {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function ri(e, t, n) {
        if ((e || (e = new K([], {})), 0 === e.segments.length && e.hasChildren())) return E4(e, t, n);
        const r = (function hI(e, t, n) {
            let r = 0,
              c = t;
            const a = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; c < e.segments.length; ) {
              if (r >= n.length) return a;
              const i = e.segments[c],
                s = n[r];
              if (Kt(s)) break;
              const o = `${s}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (c > 0 && void 0 === o) break;
              if (o && l && 'object' == typeof l && void 0 === l.outlets) {
                if (!oh(o, l, i)) return a;
                r += 2;
              } else {
                if (!oh(o, {}, i)) return a;
                r++;
              }
              c++;
            }
            return { match: !0, pathIndex: c, commandIndex: r };
          })(e, t, n),
          c = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const a = new K(e.segments.slice(0, r.pathIndex), {});
          return (a.children[j] = new K(e.segments.slice(r.pathIndex), e.children)), E4(a, 0, c);
        }
        return r.match && 0 === c.length
          ? new K(e.segments, {})
          : r.match && !e.hasChildren()
          ? ci(e, t, n)
          : r.match
          ? E4(e, 0, c)
          : ci(e, t, n);
      }
      function E4(e, t, n) {
        if (0 === n.length) return new K(e.segments, {});
        {
          const r = (function dI(e) {
              return Kt(e[0]) ? e[0].outlets : { [j]: e };
            })(n),
            c = {};
          if (!r[j] && e.children[j] && 1 === e.numberOfChildren && 0 === e.children[j].segments.length) {
            const a = E4(e.children[j], t, n);
            return new K(e.segments, a.children);
          }
          return (
            W2(r, (a, i) => {
              'string' == typeof a && (a = [a]), null !== a && (c[i] = ri(e.children[i], t, a));
            }),
            W2(e.children, (a, i) => {
              void 0 === r[i] && (c[i] = a);
            }),
            new K(e.segments, c)
          );
        }
      }
      function ci(e, t, n) {
        const r = e.segments.slice(0, t);
        let c = 0;
        for (; c < n.length; ) {
          const a = n[c];
          if (Kt(a)) {
            const o = pI(a.outlets);
            return new K(r, o);
          }
          if (0 === c && Xt(n[0])) {
            r.push(new Wt(e.segments[t].path, sh(n[0]))), c++;
            continue;
          }
          const i = Kt(a) ? a.outlets[j] : `${a}`,
            s = c < n.length - 1 ? n[c + 1] : null;
          i && s && Xt(s) ? (r.push(new Wt(i, sh(s))), (c += 2)) : (r.push(new Wt(i, {})), c++);
        }
        return new K(r, {});
      }
      function pI(e) {
        const t = {};
        return (
          W2(e, (n, r) => {
            'string' == typeof n && (n = [n]), null !== n && (t[r] = ci(new K([], {}), 0, n));
          }),
          t
        );
      }
      function sh(e) {
        const t = {};
        return W2(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function oh(e, t, n) {
        return e == n.path && ge(t, n.parameters);
      }
      const Qt = 'imperative';
      class ve {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class ai extends ve {
        constructor(t, n, r = 'imperative', c = null) {
          super(t, n), (this.type = 0), (this.navigationTrigger = r), (this.restoredState = c);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class x3 extends ve {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class D0 extends ve {
        constructor(t, n, r, c) {
          super(t, n), (this.reason = r), (this.code = c), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class S0 extends ve {
        constructor(t, n, r, c) {
          super(t, n), (this.reason = r), (this.code = c), (this.type = 16);
        }
      }
      class ii extends ve {
        constructor(t, n, r, c) {
          super(t, n), (this.error = r), (this.target = c), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class mI extends ve {
        constructor(t, n, r, c) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = c), (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class gI extends ve {
        constructor(t, n, r, c) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = c), (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class vI extends ve {
        constructor(t, n, r, c, a) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = c), (this.shouldActivate = a), (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class CI extends ve {
        constructor(t, n, r, c) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = c), (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class MI extends ve {
        constructor(t, n, r, c) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = c), (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class HI {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class VI {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class yI {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class zI {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class LI {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class wI {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class lh {
        constructor(t, n, r) {
          (this.routerEvent = t), (this.position = n), (this.anchor = r), (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let SI = (() => {
          class e {
            createUrlTree(n, r, c, a, i, s) {
              return lI(n || r.root, c, a, i, s);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        _I = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({
              token: e,
              factory: function (t) {
                return SI.ɵfac(t);
              },
              providedIn: 'root',
            })),
            e
          );
        })();
      class fh {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = si(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = si(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = oi(t, this._root);
          return n.length < 2 ? [] : n[n.length - 2].children.map((c) => c.value).filter((c) => c !== t);
        }
        pathFromRoot(t) {
          return oi(t, this._root).map((n) => n.value);
        }
      }
      function si(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = si(e, n);
          if (r) return r;
        }
        return null;
      }
      function oi(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = oi(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class Re {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function k4(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class uh extends fh {
        constructor(t, n) {
          super(t), (this.snapshot = n), li(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function dh(e, t) {
        const n = (function NI(e, t) {
            const i = new x0([], {}, {}, '', {}, j, t, null, e.root, -1, {});
            return new ph('', new Re(i, []));
          })(e, t),
          r = new J1([new Wt('', {})]),
          c = new J1({}),
          a = new J1({}),
          i = new J1({}),
          s = new J1(''),
          o = new _3(r, c, i, s, a, j, t, n.root);
        return (o.snapshot = n.root), new uh(new Re(o, []), n);
      }
      class _3 {
        constructor(t, n, r, c, a, i, s, o) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = c),
            (this.data = a),
            (this.outlet = i),
            (this.component = s),
            (this.title = this.data?.pipe(W((l) => l[Gt])) ?? A(void 0)),
            (this._futureSnapshot = o);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = this.params.pipe(W((t) => _4(t)))), this._paramMap;
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(W((t) => _4(t)))), this._queryParamMap
          );
        }
        toString() {
          return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
        }
      }
      function hh(e, t = 'emptyOnly') {
        const n = e.pathFromRoot;
        let r = 0;
        if ('always' !== t)
          for (r = n.length - 1; r >= 1; ) {
            const c = n[r],
              a = n[r - 1];
            if (c.routeConfig && '' === c.routeConfig.path) r--;
            else {
              if (a.component) break;
              r--;
            }
          }
        return (function AI(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: { ...n.data, ...t.resolve, ...n.routeConfig?.data, ...n._resolvedData },
            }),
            { params: {}, data: {}, resolve: {} },
          );
        })(n.slice(r));
      }
      class x0 {
        get title() {
          return this.data?.[Gt];
        }
        constructor(t, n, r, c, a, i, s, o, l, f, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = c),
            (this.data = a),
            (this.outlet = i),
            (this.component = s),
            (this.routeConfig = o),
            (this._urlSegment = l),
            (this._lastPathIndex = f),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = _4(this.params)), this._paramMap;
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = _4(this.queryParams)), this._queryParamMap;
        }
        toString() {
          return `Route(url:'${this.url.map((r) => r.toString()).join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`;
        }
      }
      class ph extends fh {
        constructor(t, n) {
          super(n), (this.url = t), li(this, n);
        }
        toString() {
          return mh(this._root);
        }
      }
      function li(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => li(e, n));
      }
      function mh(e) {
        const t = e.children.length > 0 ? ` { ${e.children.map(mh).join(', ')} } ` : '';
        return `${e.value}${t}`;
      }
      function fi(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            ge(t.queryParams, n.queryParams) || e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            ge(t.params, n.params) || e.params.next(n.params),
            (function WT(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!ge(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            ge(t.data, n.data) || e.data.next(n.data);
        } else (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function ui(e, t) {
        const n =
          ge(e.params, t.params) &&
          (function KT(e, t) {
            return D3(e, t) && e.every((n, r) => ge(n.parameters, t[r].parameters));
          })(e.url, t.url);
        return n && !(!e.parent != !t.parent) && (!e.parent || ui(e.parent, t.parent));
      }
      function Zt(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const c = (function kI(e, t, n) {
            return t.children.map((r) => {
              for (const c of n.children) if (e.shouldReuseRoute(r.value, c.value.snapshot)) return Zt(e, r, c);
              return Zt(e, r);
            });
          })(e, t, n);
          return new Re(r, c);
        }
        {
          if (e.shouldAttach(t.value)) {
            const a = e.retrieve(t.value);
            if (null !== a) {
              const i = a.route;
              return (i.value._futureSnapshot = t.value), (i.children = t.children.map((s) => Zt(e, s))), i;
            }
          }
          const r = (function TI(e) {
              return new _3(
                new J1(e.url),
                new J1(e.params),
                new J1(e.queryParams),
                new J1(e.fragment),
                new J1(e.data),
                e.outlet,
                e.component,
                e,
              );
            })(t.value),
            c = t.children.map((a) => Zt(e, a));
          return new Re(r, c);
        }
      }
      const di = 'ngNavigationCancelingError';
      function gh(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = S3(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          c = vh(!1, 0, t);
        return (c.url = n), (c.navigationBehaviorOptions = r), c;
      }
      function vh(e, t, n) {
        const r = new Error('NavigationCancelingError: ' + (e || ''));
        return (r[di] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function Ch(e) {
        return Mh(e) && S3(e.url);
      }
      function Mh(e) {
        return e && e[di];
      }
      class II {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Jt()),
            (this.attachRef = null);
        }
      }
      let Jt = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const c = this.getOrCreateContext(n);
            (c.outlet = r), this.contexts.set(n, c);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new II()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        );
      })();
      const _0 = !1;
      let N0 = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = j),
              (this.activateEvents = new y2()),
              (this.deactivateEvents = new y2()),
              (this.attachEvents = new y2()),
              (this.detachEvents = new y2()),
              (this.parentContexts = q(Jt)),
              (this.location = q(X1)),
              (this.changeDetector = q(Jn)),
              (this.environmentInjector = q(le));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: c } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(c) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(c)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
            const n = this.parentContexts.getContext(this.name);
            n?.route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new y(4012, _0);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new y(4012, _0);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
          }
          detach() {
            if (!this.activated) throw new y(4012, _0);
            this.location.detach();
            const n = this.activated;
            return (this.activated = null), (this._activatedRoute = null), this.detachEvents.emit(n.instance), n;
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new y(4013, _0);
            this._activatedRoute = n;
            const c = this.location,
              i = n.snapshot.component,
              s = this.parentContexts.getOrCreateContext(this.name).children,
              o = new RI(n, s, c.injector);
            if (
              r &&
              (function FI(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(i);
              this.activated = c.createComponent(l, c.length, o);
            } else
              this.activated = c.createComponent(i, {
                index: c.length,
                injector: o,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = F({
            type: e,
            selectors: [['router-outlet']],
            inputs: { name: 'name' },
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach',
            },
            exportAs: ['outlet'],
            standalone: !0,
            features: [c1],
          })),
          e
        );
      })();
      class RI {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === _3 ? this.route : t === Jt ? this.childContexts : this.parent.get(t, n);
        }
      }
      let hi = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = O1({
            type: e,
            selectors: [['ng-component']],
            standalone: !0,
            features: [Hf],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && b2(0, 'router-outlet');
            },
            dependencies: [N0],
            encapsulation: 2,
          })),
          e
        );
      })();
      function Hh(e, t) {
        return e.providers && !e._injector && (e._injector = Bn(e.providers, t, `Route: ${e.path}`)), e._injector ?? t;
      }
      function mi(e) {
        const t = e.children && e.children.map(mi),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== j && (n.component = hi),
          n
        );
      }
      function P1(e) {
        return e.outlet || j;
      }
      function Vh(e, t) {
        const n = e.filter((r) => P1(r) === t);
        return n.push(...e.filter((r) => P1(r) !== t)), n;
      }
      function e6(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class jI {
        constructor(t, n, r, c) {
          (this.routeReuseStrategy = t), (this.futureState = n), (this.currState = r), (this.forwardEvent = c);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t), fi(this.futureState.root), this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const c = k4(n);
          t.children.forEach((a) => {
            const i = a.value.outlet;
            this.deactivateRoutes(a, c[i], r), delete c[i];
          }),
            W2(c, (a, i) => {
              this.deactivateRouteAndItsChildren(a, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const c = t.value,
            a = n ? n.value : null;
          if (c === a)
            if (c.component) {
              const i = r.getContext(c.outlet);
              i && this.deactivateChildRoutes(t, n, i.children);
            } else this.deactivateChildRoutes(t, n, r);
          else a && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            c = r && t.value.component ? r.children : n,
            a = k4(t);
          for (const i of Object.keys(a)) this.deactivateRouteAndItsChildren(a[i], c);
          if (r && r.outlet) {
            const i = r.outlet.detach(),
              s = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, { componentRef: i, route: t, contexts: s });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            c = r && t.value.component ? r.children : n,
            a = k4(t);
          for (const i of Object.keys(a)) this.deactivateRouteAndItsChildren(a[i], c);
          r &&
            (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const c = k4(n);
          t.children.forEach((a) => {
            this.activateRoutes(a, c[a.value.outlet], r), this.forwardEvent(new wI(a.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new zI(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const c = t.value,
            a = n ? n.value : null;
          if ((fi(c), c === a))
            if (c.component) {
              const i = r.getOrCreateContext(c.outlet);
              this.activateChildRoutes(t, n, i.children);
            } else this.activateChildRoutes(t, n, r);
          else if (c.component) {
            const i = r.getOrCreateContext(c.outlet);
            if (this.routeReuseStrategy.shouldAttach(c.snapshot)) {
              const s = this.routeReuseStrategy.retrieve(c.snapshot);
              this.routeReuseStrategy.store(c.snapshot, null),
                i.children.onOutletReAttached(s.contexts),
                (i.attachRef = s.componentRef),
                (i.route = s.route.value),
                i.outlet && i.outlet.attach(s.componentRef, s.route.value),
                fi(s.route.value),
                this.activateChildRoutes(t, null, i.children);
            } else {
              const s = e6(c.snapshot),
                o = s?.get(Ht) ?? null;
              (i.attachRef = null),
                (i.route = c),
                (i.resolver = o),
                (i.injector = s),
                i.outlet && i.outlet.activateWith(c, i.injector),
                this.activateChildRoutes(t, null, i.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class yh {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class A0 {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function $I(e, t, n) {
        const r = e._root;
        return t6(r, t ? t._root : null, n, [r.value]);
      }
      function T4(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? 'function' != typeof e ||
            (function YL(e) {
              return null !== O6(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function t6(e, t, n, r, c = { canDeactivateChecks: [], canActivateChecks: [] }) {
        const a = k4(t);
        return (
          e.children.forEach((i) => {
            (function WI(e, t, n, r, c = { canDeactivateChecks: [], canActivateChecks: [] }) {
              const a = e.value,
                i = t ? t.value : null,
                s = n ? n.getContext(e.value.outlet) : null;
              if (i && a.routeConfig === i.routeConfig) {
                const o = (function qI(e, t, n) {
                  if ('function' == typeof n) return n(e, t);
                  switch (n) {
                    case 'pathParamsChange':
                      return !D3(e.url, t.url);
                    case 'pathParamsOrQueryParamsChange':
                      return !D3(e.url, t.url) || !ge(e.queryParams, t.queryParams);
                    case 'always':
                      return !0;
                    case 'paramsOrQueryParamsChange':
                      return !ui(e, t) || !ge(e.queryParams, t.queryParams);
                    default:
                      return !ui(e, t);
                  }
                })(i, a, a.routeConfig.runGuardsAndResolvers);
                o ? c.canActivateChecks.push(new yh(r)) : ((a.data = i.data), (a._resolvedData = i._resolvedData)),
                  t6(e, t, a.component ? (s ? s.children : null) : n, r, c),
                  o &&
                    s &&
                    s.outlet &&
                    s.outlet.isActivated &&
                    c.canDeactivateChecks.push(new A0(s.outlet.component, i));
              } else
                i && n6(t, s, c),
                  c.canActivateChecks.push(new yh(r)),
                  t6(e, null, a.component ? (s ? s.children : null) : n, r, c);
            })(i, a[i.value.outlet], n, r.concat([i.value]), c),
              delete a[i.value.outlet];
          }),
          W2(a, (i, s) => n6(i, n.getContext(s), c)),
          c
        );
      }
      function n6(e, t, n) {
        const r = k4(e),
          c = e.value;
        W2(r, (a, i) => {
          n6(a, c.component ? (t ? t.children.getContext(i) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new A0(c.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null, c),
          );
      }
      function r6(e) {
        return 'function' == typeof e;
      }
      function gi(e) {
        return e instanceof C0 || 'EmptyError' === e?.name;
      }
      const E0 = Symbol('INITIAL_VALUE');
      function I4() {
        return me((e) =>
          Rd(
            e.map((t) =>
              t.pipe(
                x4(1),
                (function PT(...e) {
                  const t = K4(e);
                  return O2((n, r) => {
                    (t ? Xa(e, n, t) : Xa(e, n)).subscribe(r);
                  });
                })(E0),
              ),
            ),
          ).pipe(
            W((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === E0) return E0;
                  if (!1 === n || n instanceof Ze) return n;
                }
              return !0;
            }),
            Ie((t) => t !== E0),
            x4(1),
          ),
        );
      }
      function zh(e) {
        return (function Qz(...e) {
          return wo(e);
        })(
          e1((t) => {
            if (S3(t)) throw gh(0, t);
          }),
          W((t) => !0 === t),
        );
      }
      const vi = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Lh(e, t, n, r, c) {
        const a = Ci(e, t, n);
        return a.matched
          ? (function fR(e, t, n, r) {
              const c = t.canMatch;
              return c && 0 !== c.length
                ? A(
                    c.map((i) => {
                      const s = T4(i, e);
                      return Qe(
                        (function JI(e) {
                          return e && r6(e.canMatch);
                        })(s)
                          ? s.canMatch(t, n)
                          : e.runInContext(() => s(t, n)),
                      );
                    }),
                  ).pipe(I4(), zh())
                : A(!0);
            })((r = Hh(t, r)), t, n).pipe(W((i) => (!0 === i ? a : { ...vi })))
          : A(a);
      }
      function Ci(e, t, n) {
        if ('' === t.path)
          return 'full' === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...vi }
            : { matched: !0, consumedSegments: [], remainingSegments: n, parameters: {}, positionalParamSegments: {} };
        const c = (t.matcher || GT)(n, e, t);
        if (!c) return { ...vi };
        const a = {};
        W2(c.posParams, (s, o) => {
          a[o] = s.path;
        });
        const i = c.consumed.length > 0 ? { ...a, ...c.consumed[c.consumed.length - 1].parameters } : a;
        return {
          matched: !0,
          consumedSegments: c.consumed,
          remainingSegments: n.slice(c.consumed.length),
          parameters: i,
          positionalParamSegments: c.posParams ?? {},
        };
      }
      function k0(e, t, n, r) {
        if (
          n.length > 0 &&
          (function hR(e, t, n) {
            return n.some((r) => T0(e, t, r) && P1(r) !== j);
          })(e, n, r)
        ) {
          const a = new K(
            t,
            (function dR(e, t, n, r) {
              const c = {};
              (c[j] = r), (r._sourceSegment = e), (r._segmentIndexShift = t.length);
              for (const a of n)
                if ('' === a.path && P1(a) !== j) {
                  const i = new K([], {});
                  (i._sourceSegment = e), (i._segmentIndexShift = t.length), (c[P1(a)] = i);
                }
              return c;
            })(e, t, r, new K(n, e.children)),
          );
          return (a._sourceSegment = e), (a._segmentIndexShift = t.length), { segmentGroup: a, slicedSegments: [] };
        }
        if (
          0 === n.length &&
          (function pR(e, t, n) {
            return n.some((r) => T0(e, t, r));
          })(e, n, r)
        ) {
          const a = new K(
            e.segments,
            (function uR(e, t, n, r, c) {
              const a = {};
              for (const i of r)
                if (T0(e, n, i) && !c[P1(i)]) {
                  const s = new K([], {});
                  (s._sourceSegment = e), (s._segmentIndexShift = t.length), (a[P1(i)] = s);
                }
              return { ...c, ...a };
            })(e, t, n, r, e.children),
          );
          return (a._sourceSegment = e), (a._segmentIndexShift = t.length), { segmentGroup: a, slicedSegments: n };
        }
        const c = new K(e.segments, e.children);
        return (c._sourceSegment = e), (c._segmentIndexShift = t.length), { segmentGroup: c, slicedSegments: n };
      }
      function T0(e, t, n) {
        return (!(e.hasChildren() || t.length > 0) || 'full' !== n.pathMatch) && '' === n.path;
      }
      function wh(e, t, n, r) {
        return !!(P1(e) === r || (r !== j && T0(t, n, e))) && ('**' === e.path || Ci(t, e, n).matched);
      }
      function bh(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const I0 = !1;
      class R0 {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Dh {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function c6(e) {
        return $t(new R0(e));
      }
      function Sh(e) {
        return $t(new Dh(e));
      }
      class CR {
        constructor(t, n, r, c, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = c),
            (this.config = a),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = k0(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new K(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, j)
            .pipe(W((a) => this.createUrlTree(b0(a), this.urlTree.queryParams, this.urlTree.fragment)))
            .pipe(
              Ke((a) => {
                if (a instanceof Dh) return (this.allowRedirects = !1), this.match(a.urlTree);
                throw a instanceof R0 ? this.noMatchError(a) : a;
              }),
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, j)
            .pipe(W((c) => this.createUrlTree(b0(c), t.queryParams, t.fragment)))
            .pipe(
              Ke((c) => {
                throw c instanceof R0 ? this.noMatchError(c) : c;
              }),
            );
        }
        noMatchError(t) {
          return new y(4002, I0);
        }
        createUrlTree(t, n, r) {
          const c = ti(t);
          return new Ze(c, n, r);
        }
        expandSegmentGroup(t, n, r, c) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(W((a) => new K([], a)))
            : this.expandSegment(t, r, n, r.segments, c, !0);
        }
        expandChildren(t, n, r) {
          const c = [];
          for (const a of Object.keys(r.children)) 'primary' === a ? c.unshift(a) : c.push(a);
          return N2(c).pipe(
            Xe((a) => {
              const i = r.children[a],
                s = Vh(n, a);
              return this.expandSegmentGroup(t, s, i, a).pipe(W((o) => ({ segment: o, outlet: a })));
            }),
            Ud((a, i) => ((a[i.outlet] = i.segment), a), {}),
            jd(),
          );
        }
        expandSegment(t, n, r, c, a, i) {
          return N2(r).pipe(
            Xe((s) =>
              this.expandSegmentAgainstRoute(t, n, r, s, c, a, i).pipe(
                Ke((l) => {
                  if (l instanceof R0) return A(null);
                  throw l;
                }),
              ),
            ),
            Ye((s) => !!s),
            Ke((s, o) => {
              if (gi(s)) return bh(n, c, a) ? A(new K([], {})) : c6(n);
              throw s;
            }),
          );
        }
        expandSegmentAgainstRoute(t, n, r, c, a, i, s) {
          return wh(c, n, a, i)
            ? void 0 === c.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, c, a, i)
              : s && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, c, a, i)
              : c6(n)
            : c6(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, c, a, i) {
          return '**' === c.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, c, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, c, a, i);
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, c) {
          const a = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith('/')
            ? Sh(a)
            : this.lineralizeSegments(r, a).pipe(
                B2((i) => {
                  const s = new K(i, {});
                  return this.expandSegment(t, s, n, i, c, !1);
                }),
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, c, a, i) {
          const { matched: s, consumedSegments: o, remainingSegments: l, positionalParamSegments: f } = Ci(n, c, a);
          if (!s) return c6(n);
          const u = this.applyRedirectCommands(o, c.redirectTo, f);
          return c.redirectTo.startsWith('/')
            ? Sh(u)
            : this.lineralizeSegments(c, u).pipe(B2((d) => this.expandSegment(t, n, r, d.concat(l), i, !1)));
        }
        matchSegmentAgainstRoute(t, n, r, c, a) {
          return '**' === r.path
            ? ((t = Hh(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? A({ routes: r._loadedRoutes, injector: r._loadedInjector })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(W((s) => ((r._loadedRoutes = s.routes), (r._loadedInjector = s.injector), new K(c, {}))))
                : A(new K(c, {})))
            : Lh(n, r, c, t).pipe(
                me(({ matched: i, consumedSegments: s, remainingSegments: o }) =>
                  i
                    ? this.getChildConfig((t = r._injector ?? t), r, c).pipe(
                        B2((f) => {
                          const u = f.injector ?? t,
                            d = f.routes,
                            { segmentGroup: h, slicedSegments: p } = k0(n, s, o, d),
                            m = new K(h.segments, h.children);
                          if (0 === p.length && m.hasChildren())
                            return this.expandChildren(u, d, m).pipe(W((g) => new K(s, g)));
                          if (0 === d.length && 0 === p.length) return A(new K(s, {}));
                          const v = P1(r) === a;
                          return this.expandSegment(u, m, d, p, v ? j : a, !0).pipe(
                            W((V) => new K(s.concat(V.segments), V.children)),
                          );
                        }),
                      )
                    : c6(n),
                ),
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function lR(e, t, n, r) {
                  const c = t.canLoad;
                  return void 0 === c || 0 === c.length
                    ? A(!0)
                    : A(
                        c.map((i) => {
                          const s = T4(i, e);
                          return Qe(
                            (function XI(e) {
                              return e && r6(e.canLoad);
                            })(s)
                              ? s.canLoad(t, n)
                              : e.runInContext(() => s(t, n)),
                          );
                        }),
                      ).pipe(I4(), zh());
                })(t, n, r).pipe(
                  B2((c) =>
                    c
                      ? this.configLoader.loadChildren(t, n).pipe(
                          e1((a) => {
                            (n._loadedRoutes = a.routes), (n._loadedInjector = a.injector);
                          }),
                        )
                      : (function gR(e) {
                          return $t(vh(I0, 3));
                        })(),
                  ),
                )
            : A({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            c = n.root;
          for (;;) {
            if (((r = r.concat(c.segments)), 0 === c.numberOfChildren)) return A(r);
            if (c.numberOfChildren > 1 || !c.children[j]) return t.redirectTo, $t(new y(4e3, I0));
            c = c.children[j];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r);
        }
        applyRedirectCreateUrlTree(t, n, r, c) {
          const a = this.createSegmentGroup(t, n.root, r, c);
          return new Ze(a, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment);
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            W2(t, (c, a) => {
              if ('string' == typeof c && c.startsWith(':')) {
                const s = c.substring(1);
                r[a] = n[s];
              } else r[a] = c;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, c) {
          const a = this.createSegments(t, n.segments, r, c);
          let i = {};
          return (
            W2(n.children, (s, o) => {
              i[o] = this.createSegmentGroup(t, s, r, c);
            }),
            new K(a, i)
          );
        }
        createSegments(t, n, r, c) {
          return n.map((a) => (a.path.startsWith(':') ? this.findPosParam(t, a, c) : this.findOrReturn(a, r)));
        }
        findPosParam(t, n, r) {
          const c = r[n.path.substring(1)];
          if (!c) throw new y(4001, I0);
          return c;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const c of n) {
            if (c.path === t.path) return n.splice(r), c;
            r++;
          }
          return t;
        }
      }
      class HR {}
      class zR {
        constructor(t, n, r, c, a, i, s) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = c),
            (this.url = a),
            (this.paramsInheritanceStrategy = i),
            (this.urlSerializer = s);
        }
        recognize() {
          const t = k0(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo),
          ).segmentGroup;
          return this.processSegmentGroup(this.injector, this.config, t, j).pipe(
            W((n) => {
              if (null === n) return null;
              const r = new x0(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  j,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {},
                ),
                c = new Re(r, n),
                a = new ph(this.url, c);
              return this.inheritParamsAndData(a._root), a;
            }),
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = hh(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((c) => this.inheritParamsAndData(c));
        }
        processSegmentGroup(t, n, r, c) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, c);
        }
        processChildren(t, n, r) {
          return N2(Object.keys(r.children)).pipe(
            Xe((c) => {
              const a = r.children[c],
                i = Vh(n, c);
              return this.processSegmentGroup(t, i, a, c);
            }),
            Ud((c, a) => (c && a ? (c.push(...a), c) : null)),
            (function UT(e, t = !1) {
              return O2((n, r) => {
                let c = 0;
                n.subscribe(
                  T2(r, (a) => {
                    const i = e(a, c++);
                    (i || t) && r.next(a), !i && r.complete();
                  }),
                );
              });
            })((c) => null !== c),
            M0(null),
            jd(),
            W((c) => {
              if (null === c) return null;
              const a = _h(c);
              return (
                (function LR(e) {
                  e.sort((t, n) =>
                    t.value.outlet === j ? -1 : n.value.outlet === j ? 1 : t.value.outlet.localeCompare(n.value.outlet),
                  );
                })(a),
                a
              );
            }),
          );
        }
        processSegment(t, n, r, c, a) {
          return N2(n).pipe(
            Xe((i) => this.processSegmentAgainstRoute(i._injector ?? t, i, r, c, a)),
            Ye((i) => !!i),
            Ke((i) => {
              if (gi(i)) return bh(r, c, a) ? A([]) : A(null);
              throw i;
            }),
          );
        }
        processSegmentAgainstRoute(t, n, r, c, a) {
          if (n.redirectTo || !wh(n, r, c, a)) return A(null);
          let i;
          if ('**' === n.path) {
            const s = c.length > 0 ? Wd(c).parameters : {},
              o = Ah(r) + c.length;
            i = A({
              snapshot: new x0(
                c,
                s,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                Eh(n),
                P1(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                Nh(r),
                o,
                kh(n),
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            i = Lh(r, n, c, t).pipe(
              W(({ matched: s, consumedSegments: o, remainingSegments: l, parameters: f }) => {
                if (!s) return null;
                const u = Ah(r) + o.length;
                return {
                  snapshot: new x0(
                    o,
                    f,
                    Object.freeze({ ...this.urlTree.queryParams }),
                    this.urlTree.fragment,
                    Eh(n),
                    P1(n),
                    n.component ?? n._loadedComponent ?? null,
                    n,
                    Nh(r),
                    u,
                    kh(n),
                  ),
                  consumedSegments: o,
                  remainingSegments: l,
                };
              }),
            );
          return i.pipe(
            me((s) => {
              if (null === s) return A(null);
              const { snapshot: o, consumedSegments: l, remainingSegments: f } = s;
              t = n._injector ?? t;
              const u = n._loadedInjector ?? t,
                d = (function wR(e) {
                  return e.children ? e.children : e.loadChildren ? e._loadedRoutes : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = k0(
                  r,
                  l,
                  f,
                  d.filter((v) => void 0 === v.redirectTo),
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(u, d, h).pipe(W((v) => (null === v ? null : [new Re(o, v)])));
              if (0 === d.length && 0 === p.length) return A([new Re(o, [])]);
              const m = P1(n) === a;
              return this.processSegment(u, d, h, p, m ? j : a).pipe(W((v) => (null === v ? null : [new Re(o, v)])));
            }),
          );
        }
      }
      function bR(e) {
        const t = e.value.routeConfig;
        return t && '' === t.path && void 0 === t.redirectTo;
      }
      function _h(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!bR(r)) {
            t.push(r);
            continue;
          }
          const c = t.find((a) => r.value.routeConfig === a.value.routeConfig);
          void 0 !== c ? (c.children.push(...r.children), n.add(c)) : t.push(r);
        }
        for (const r of n) {
          const c = _h(r.children);
          t.push(new Re(r.value, c));
        }
        return t.filter((r) => !n.has(r));
      }
      function Nh(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Ah(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; ) (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function Eh(e) {
        return e.data || {};
      }
      function kh(e) {
        return e.resolve || {};
      }
      function Th(e) {
        return 'string' == typeof e.title || null === e.title;
      }
      function Mi(e) {
        return me((t) => {
          const n = e(t);
          return n ? N2(n).pipe(W(() => t)) : A(t);
        });
      }
      const R4 = new S('ROUTES');
      let Hi = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()), (this.childrenLoaders = new WeakMap()), (this.compiler = q(lu));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
            if (n._loadedComponent) return A(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Qe(n.loadComponent()).pipe(
                W(Rh),
                e1((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(n), (n._loadedComponent = a);
                }),
                Za(() => {
                  this.componentLoaders.delete(n);
                }),
              ),
              c = new Od(r, () => new _1()).pipe(Ka());
            return this.componentLoaders.set(n, c), c;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes) return A({ routes: r._loadedRoutes, injector: r._loadedInjector });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const a = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                W((s) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let o,
                    l,
                    f = !1;
                  Array.isArray(s)
                    ? (l = s)
                    : ((o = s.create(n).injector), (l = Gd(o.get(R4, [], T.Self | T.Optional))));
                  return { routes: l.map(mi), injector: o };
                }),
                Za(() => {
                  this.childrenLoaders.delete(r);
                }),
              ),
              i = new Od(a, () => new _1()).pipe(Ka());
            return this.childrenLoaders.set(r, i), i;
          }
          loadModuleFactoryOrRoutes(n) {
            return Qe(n()).pipe(
              W(Rh),
              B2((r) => (r instanceof Cf || Array.isArray(r) ? A(r) : N2(this.compiler.compileModuleAsync(r)))),
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        );
      })();
      function Rh(e) {
        return (function kR(e) {
          return e && 'object' == typeof e && 'default' in e;
        })(e)
          ? e.default
          : e;
      }
      let P0 = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new _1()),
              (this.configLoader = q(Hi)),
              (this.environmentInjector = q(le)),
              (this.urlSerializer = q(qt)),
              (this.rootContexts = q(Jt)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => A(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (c) => this.events.next(new VI(c))),
              (this.configLoader.onLoadStartListener = (c) => this.events.next(new HI(c)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new J1({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(n.currentUrlTree),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Qt,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                Ie((r) => 0 !== r.id),
                W((r) => ({ ...r, extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl) })),
                me((r) => {
                  let c = !1,
                    a = !1;
                  return A(r).pipe(
                    e1((i) => {
                      this.currentNavigation = {
                        id: i.id,
                        initialUrl: i.rawUrl,
                        extractedUrl: i.extractedUrl,
                        trigger: i.source,
                        extras: i.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? { ...this.lastSuccessfulNavigation, previousNavigation: null }
                          : null,
                      };
                    }),
                    me((i) => {
                      const s = n.browserUrlTree.toString(),
                        o = !n.navigated || i.extractedUrl.toString() !== s || s !== n.currentUrlTree.toString();
                      if (!o && 'reload' !== (i.extras.onSameUrlNavigation ?? n.onSameUrlNavigation)) {
                        const f = '';
                        return (
                          this.events.next(new S0(i.id, n.serializeUrl(r.rawUrl), f, 0)),
                          (n.rawUrlTree = i.rawUrl),
                          i.resolve(null),
                          ne
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(i.rawUrl))
                        return (
                          Fh(i.source) && (n.browserUrlTree = i.extractedUrl),
                          A(i).pipe(
                            me((f) => {
                              const u = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new ai(f.id, this.urlSerializer.serialize(f.extractedUrl), f.source, f.restoredState),
                                ),
                                u !== this.transitions?.getValue() ? ne : Promise.resolve(f)
                              );
                            }),
                            (function MR(e, t, n, r) {
                              return me((c) =>
                                (function vR(e, t, n, r, c) {
                                  return new CR(e, t, n, r, c).apply();
                                })(e, t, n, c.extractedUrl, r).pipe(W((a) => ({ ...c, urlAfterRedirects: a }))),
                              );
                            })(this.environmentInjector, this.configLoader, this.urlSerializer, n.config),
                            e1((f) => {
                              (this.currentNavigation = { ...this.currentNavigation, finalUrl: f.urlAfterRedirects }),
                                (r.urlAfterRedirects = f.urlAfterRedirects);
                            }),
                            (function SR(e, t, n, r, c) {
                              return B2((a) =>
                                (function yR(e, t, n, r, c, a, i = 'emptyOnly') {
                                  return new zR(e, t, n, r, c, i, a).recognize().pipe(
                                    me((s) =>
                                      null === s
                                        ? (function VR(e) {
                                            return new L2((t) => t.error(e));
                                          })(new HR())
                                        : A(s),
                                    ),
                                  );
                                })(e, t, n, a.urlAfterRedirects, r.serialize(a.urlAfterRedirects), r, c).pipe(
                                  W((i) => ({ ...a, targetSnapshot: i })),
                                ),
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy,
                            ),
                            e1((f) => {
                              if (((r.targetSnapshot = f.targetSnapshot), 'eager' === n.urlUpdateStrategy)) {
                                if (!f.extras.skipLocationChange) {
                                  const d = n.urlHandlingStrategy.merge(f.urlAfterRedirects, f.rawUrl);
                                  n.setBrowserUrl(d, f);
                                }
                                n.browserUrlTree = f.urlAfterRedirects;
                              }
                              const u = new mI(
                                f.id,
                                this.urlSerializer.serialize(f.extractedUrl),
                                this.urlSerializer.serialize(f.urlAfterRedirects),
                                f.targetSnapshot,
                              );
                              this.events.next(u);
                            }),
                          )
                        );
                      if (o && n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)) {
                        const { id: f, extractedUrl: u, source: d, restoredState: h, extras: p } = i,
                          m = new ai(f, this.urlSerializer.serialize(u), d, h);
                        this.events.next(m);
                        const v = dh(u, this.rootComponentType).snapshot;
                        return A(
                          (r = {
                            ...i,
                            targetSnapshot: v,
                            urlAfterRedirects: u,
                            extras: { ...p, skipLocationChange: !1, replaceUrl: !1 },
                          }),
                        );
                      }
                      {
                        const f = '';
                        return (
                          this.events.next(new S0(i.id, n.serializeUrl(r.extractedUrl), f, 1)),
                          (n.rawUrlTree = i.rawUrl),
                          i.resolve(null),
                          ne
                        );
                      }
                    }),
                    e1((i) => {
                      const s = new gI(
                        i.id,
                        this.urlSerializer.serialize(i.extractedUrl),
                        this.urlSerializer.serialize(i.urlAfterRedirects),
                        i.targetSnapshot,
                      );
                      this.events.next(s);
                    }),
                    W((i) => (r = { ...i, guards: $I(i.targetSnapshot, i.currentSnapshot, this.rootContexts) })),
                    (function tR(e, t) {
                      return B2((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: c,
                          guards: { canActivateChecks: a, canDeactivateChecks: i },
                        } = n;
                        return 0 === i.length && 0 === a.length
                          ? A({ ...n, guardsResult: !0 })
                          : (function nR(e, t, n, r) {
                              return N2(e).pipe(
                                B2((c) =>
                                  (function oR(e, t, n, r, c) {
                                    const a = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
                                    return a && 0 !== a.length
                                      ? A(
                                          a.map((s) => {
                                            const o = e6(t) ?? c,
                                              l = T4(s, o);
                                            return Qe(
                                              (function ZI(e) {
                                                return e && r6(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, n, r)
                                                : o.runInContext(() => l(e, t, n, r)),
                                            ).pipe(Ye());
                                          }),
                                        ).pipe(I4())
                                      : A(!0);
                                  })(c.component, c.route, n, t, r),
                                ),
                                Ye((c) => !0 !== c, !0),
                              );
                            })(i, r, c, e).pipe(
                              B2((s) =>
                                s &&
                                (function YI(e) {
                                  return 'boolean' == typeof e;
                                })(s)
                                  ? (function rR(e, t, n, r) {
                                      return N2(t).pipe(
                                        Xe((c) =>
                                          Xa(
                                            (function aR(e, t) {
                                              return null !== e && t && t(new yI(e)), A(!0);
                                            })(c.route.parent, r),
                                            (function cR(e, t) {
                                              return null !== e && t && t(new LI(e)), A(!0);
                                            })(c.route, r),
                                            (function sR(e, t, n) {
                                              const r = t[t.length - 1],
                                                a = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((i) =>
                                                    (function GI(e) {
                                                      const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                                                      return t && 0 !== t.length ? { node: e, guards: t } : null;
                                                    })(i),
                                                  )
                                                  .filter((i) => null !== i)
                                                  .map((i) =>
                                                    Pd(() =>
                                                      A(
                                                        i.guards.map((o) => {
                                                          const l = e6(i.node) ?? n,
                                                            f = T4(o, l);
                                                          return Qe(
                                                            (function QI(e) {
                                                              return e && r6(e.canActivateChild);
                                                            })(f)
                                                              ? f.canActivateChild(r, e)
                                                              : l.runInContext(() => f(r, e)),
                                                          ).pipe(Ye());
                                                        }),
                                                      ).pipe(I4()),
                                                    ),
                                                  );
                                              return A(a).pipe(I4());
                                            })(e, c.path, n),
                                            (function iR(e, t, n) {
                                              const r = t.routeConfig ? t.routeConfig.canActivate : null;
                                              if (!r || 0 === r.length) return A(!0);
                                              const c = r.map((a) =>
                                                Pd(() => {
                                                  const i = e6(t) ?? n,
                                                    s = T4(a, i);
                                                  return Qe(
                                                    (function KI(e) {
                                                      return e && r6(e.canActivate);
                                                    })(s)
                                                      ? s.canActivate(t, e)
                                                      : i.runInContext(() => s(t, e)),
                                                  ).pipe(Ye());
                                                }),
                                              );
                                              return A(c).pipe(I4());
                                            })(e, c.route, n),
                                          ),
                                        ),
                                        Ye((c) => !0 !== c, !0),
                                      );
                                    })(r, a, e, t)
                                  : A(s),
                              ),
                              W((s) => ({ ...n, guardsResult: s })),
                            );
                      });
                    })(this.environmentInjector, (i) => this.events.next(i)),
                    e1((i) => {
                      if (((r.guardsResult = i.guardsResult), S3(i.guardsResult))) throw gh(0, i.guardsResult);
                      const s = new vI(
                        i.id,
                        this.urlSerializer.serialize(i.extractedUrl),
                        this.urlSerializer.serialize(i.urlAfterRedirects),
                        i.targetSnapshot,
                        !!i.guardsResult,
                      );
                      this.events.next(s);
                    }),
                    Ie((i) => !!i.guardsResult || (n.restoreHistory(i), this.cancelNavigationTransition(i, '', 3), !1)),
                    Mi((i) => {
                      if (i.guards.canActivateChecks.length)
                        return A(i).pipe(
                          e1((s) => {
                            const o = new CI(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(s.urlAfterRedirects),
                              s.targetSnapshot,
                            );
                            this.events.next(o);
                          }),
                          me((s) => {
                            let o = !1;
                            return A(s).pipe(
                              (function xR(e, t) {
                                return B2((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: c },
                                  } = n;
                                  if (!c.length) return A(n);
                                  let a = 0;
                                  return N2(c).pipe(
                                    Xe((i) =>
                                      (function _R(e, t, n, r) {
                                        const c = e.routeConfig,
                                          a = e._resolve;
                                        return (
                                          void 0 !== c?.title && !Th(c) && (a[Gt] = c.title),
                                          (function NR(e, t, n, r) {
                                            const c = (function AR(e) {
                                              return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
                                            })(e);
                                            if (0 === c.length) return A({});
                                            const a = {};
                                            return N2(c).pipe(
                                              B2((i) =>
                                                (function ER(e, t, n, r) {
                                                  const c = e6(t) ?? r,
                                                    a = T4(e, c);
                                                  return Qe(
                                                    a.resolve ? a.resolve(t, n) : c.runInContext(() => a(t, n)),
                                                  );
                                                })(e[i], t, n, r).pipe(
                                                  Ye(),
                                                  e1((s) => {
                                                    a[i] = s;
                                                  }),
                                                ),
                                              ),
                                              Qa(1),
                                              (function jT(e) {
                                                return W(() => e);
                                              })(a),
                                              Ke((i) => (gi(i) ? ne : $t(i))),
                                            );
                                          })(a, e, t, r).pipe(
                                            W(
                                              (i) => (
                                                (e._resolvedData = i),
                                                (e.data = hh(e, n).resolve),
                                                c && Th(c) && (e.data[Gt] = c.title),
                                                null
                                              ),
                                            ),
                                          )
                                        );
                                      })(i.route, r, e, t),
                                    ),
                                    e1(() => a++),
                                    Qa(1),
                                    B2((i) => (a === c.length ? A(n) : ne)),
                                  );
                                });
                              })(n.paramsInheritanceStrategy, this.environmentInjector),
                              e1({
                                next: () => (o = !0),
                                complete: () => {
                                  o || (n.restoreHistory(s), this.cancelNavigationTransition(s, '', 2));
                                },
                              }),
                            );
                          }),
                          e1((s) => {
                            const o = new MI(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(s.urlAfterRedirects),
                              s.targetSnapshot,
                            );
                            this.events.next(o);
                          }),
                        );
                    }),
                    Mi((i) => {
                      const s = (o) => {
                        const l = [];
                        o.routeConfig?.loadComponent &&
                          !o.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(o.routeConfig).pipe(
                              e1((f) => {
                                o.component = f;
                              }),
                              W(() => {}),
                            ),
                          );
                        for (const f of o.children) l.push(...s(f));
                        return l;
                      };
                      return Rd(s(i.targetSnapshot.root)).pipe(M0(), x4(1));
                    }),
                    Mi(() => this.afterPreactivation()),
                    W((i) => {
                      const s = (function EI(e, t, n) {
                        const r = Zt(e, t._root, n ? n._root : void 0);
                        return new uh(r, t);
                      })(n.routeReuseStrategy, i.targetSnapshot, i.currentRouterState);
                      return (r = { ...i, targetRouterState: s });
                    }),
                    e1((i) => {
                      (n.currentUrlTree = i.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(i.urlAfterRedirects, i.rawUrl)),
                        (n.routerState = i.targetRouterState),
                        'deferred' === n.urlUpdateStrategy &&
                          (i.extras.skipLocationChange || n.setBrowserUrl(n.rawUrlTree, i),
                          (n.browserUrlTree = i.urlAfterRedirects));
                    }),
                    ((e, t, n) => W((r) => (new jI(t, r.targetRouterState, r.currentRouterState, n).activate(e), r)))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (i) => this.events.next(i),
                    ),
                    x4(1),
                    e1({
                      next: (i) => {
                        (c = !0),
                          (this.lastSuccessfulNavigation = this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new x3(
                              i.id,
                              this.urlSerializer.serialize(i.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree),
                            ),
                          ),
                          n.titleStrategy?.updateTitle(i.targetRouterState.snapshot),
                          i.resolve(!0);
                      },
                      complete: () => {
                        c = !0;
                      },
                    }),
                    Za(() => {
                      c || a || this.cancelNavigationTransition(r, '', 1),
                        this.currentNavigation?.id === r.id && (this.currentNavigation = null);
                    }),
                    Ke((i) => {
                      if (((a = !0), Mh(i))) {
                        Ch(i) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const s = new D0(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          i.message,
                          i.cancellationCode,
                        );
                        if ((this.events.next(s), Ch(i))) {
                          const o = n.urlHandlingStrategy.merge(i.url, n.rawUrlTree),
                            l = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl: 'eager' === n.urlUpdateStrategy || Fh(r.source),
                            };
                          n.scheduleNavigation(o, Qt, null, l, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const s = new ii(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          i,
                          r.targetSnapshot ?? void 0,
                        );
                        this.events.next(s);
                        try {
                          r.resolve(n.errorHandler(i));
                        } catch (o) {
                          r.reject(o);
                        }
                      }
                      return ne;
                    }),
                  );
                }),
              )
            );
          }
          cancelNavigationTransition(n, r, c) {
            const a = new D0(n.id, this.urlSerializer.serialize(n.extractedUrl), r, c);
            this.events.next(a), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        );
      })();
      function Fh(e) {
        return e !== Qt;
      }
      let Ph = (() => {
          class e {
            buildTitle(n) {
              let r,
                c = n.root;
              for (; void 0 !== c; )
                (r = this.getResolvedTitleForRoute(c) ?? r), (c = c.children.find((a) => a.outlet === j));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Gt];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({
              token: e,
              factory: function () {
                return q(TR);
              },
              providedIn: 'root',
            })),
            e
          );
        })(),
        TR = (() => {
          class e extends Ph {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(xd));
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          );
        })(),
        IR = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({
              token: e,
              factory: function () {
                return q(FR);
              },
              providedIn: 'root',
            })),
            e
          );
        })();
      class RR {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let FR = (() => {
        class e extends RR {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = $2(e)))(r || e);
            };
          })()),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        );
      })();
      const O0 = new S('', { providedIn: 'root', factory: () => ({}) });
      let OR = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({
              token: e,
              factory: function () {
                return q(BR);
              },
              providedIn: 'root',
            })),
            e
          );
        })(),
        BR = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          );
        })();
      function UR(e) {
        throw e;
      }
      function jR(e, t, n) {
        return t.parse('/');
      }
      const $R = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
        GR = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' };
      let M1 = (() => {
          class e {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              if ('computed' === this.canceledNavigationResolution) return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = q(VA)),
                (this.isNgZoneEnabled = !1),
                (this.options = q(O0, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || UR),
                (this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || jR),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = q(OR)),
                (this.routeReuseStrategy = q(IR)),
                (this.urlCreationStrategy = q(_I)),
                (this.titleStrategy = q(Ph)),
                (this.onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore'),
                (this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || 'emptyOnly'),
                (this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred'),
                (this.canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace'),
                (this.config = Gd(q(R4, { optional: !0 }) ?? [])),
                (this.navigationTransitions = q(P0)),
                (this.urlSerializer = q(qt)),
                (this.location = q(Va)),
                (this.isNgZoneEnabled = q(D2) instanceof D2 && D2.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new Ze()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = dh(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id), (this.currentPageId = this.browserPageId ?? 0);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  },
                );
            }
            resetRootComponentType(n) {
              (this.routerState.root.component = n), (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
              if ((this.setUpLocationChangeListener(), !this.navigationTransitions.hasRequestedNavigation)) {
                const n = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), Qt, n);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((n) => {
                  const r = 'popstate' === n.type ? 'popstate' : 'hashchange';
                  'popstate' === r &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(n.url, r, n.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(n, r, c) {
              const a = { replaceUrl: !0 },
                i = c?.navigationId ? c : null;
              if (c) {
                const o = { ...c };
                delete o.navigationId, delete o.ɵrouterPageId, 0 !== Object.keys(o).length && (a.state = o);
              }
              const s = this.parseUrl(n);
              this.scheduleNavigation(s, r, i, a);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(n) {
              (this.config = n.map(mi)), (this.navigated = !1), (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(), (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(n, r = {}) {
              const { relativeTo: c, queryParams: a, fragment: i, queryParamsHandling: s, preserveFragment: o } = r,
                l = o ? this.currentUrlTree.fragment : i;
              let f = null;
              switch (s) {
                case 'merge':
                  f = { ...this.currentUrlTree.queryParams, ...a };
                  break;
                case 'preserve':
                  f = this.currentUrlTree.queryParams;
                  break;
                default:
                  f = a || null;
              }
              return (
                null !== f && (f = this.removeEmptyProps(f)),
                this.urlCreationStrategy.createUrlTree(c, this.routerState, this.currentUrlTree, n, f, l ?? null)
              );
            }
            navigateByUrl(n, r = { skipLocationChange: !1 }) {
              const c = S3(n) ? n : this.parseUrl(n),
                a = this.urlHandlingStrategy.merge(c, this.rawUrlTree);
              return this.scheduleNavigation(a, Qt, null, r);
            }
            navigate(n, r = { skipLocationChange: !1 }) {
              return (
                (function WR(e) {
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (null == n) throw new y(4008, false);
                  }
                })(n),
                this.navigateByUrl(this.createUrlTree(n, r), r)
              );
            }
            serializeUrl(n) {
              return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
              let r;
              try {
                r = this.urlSerializer.parse(n);
              } catch (c) {
                r = this.malformedUriErrorHandler(c, this.urlSerializer, n);
              }
              return r;
            }
            isActive(n, r) {
              let c;
              if (((c = !0 === r ? { ...$R } : !1 === r ? { ...GR } : r), S3(n))) return Yd(this.currentUrlTree, n, c);
              const a = this.parseUrl(n);
              return Yd(this.currentUrlTree, a, c);
            }
            removeEmptyProps(n) {
              return Object.keys(n).reduce((r, c) => {
                const a = n[c];
                return null != a && (r[c] = a), r;
              }, {});
            }
            scheduleNavigation(n, r, c, a, i) {
              if (this.disposed) return Promise.resolve(!1);
              let s, o, l, f;
              return (
                i
                  ? ((s = i.resolve), (o = i.reject), (l = i.promise))
                  : (l = new Promise((u, d) => {
                      (s = u), (o = d);
                    })),
                (f =
                  'computed' === this.canceledNavigationResolution
                    ? c && c.ɵrouterPageId
                      ? c.ɵrouterPageId
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: f,
                  source: r,
                  restoredState: c,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: n,
                  extras: a,
                  resolve: s,
                  reject: o,
                  promise: l,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                l.catch((u) => Promise.reject(u))
              );
            }
            setBrowserUrl(n, r) {
              const c = this.urlSerializer.serialize(n);
              if (this.location.isCurrentPathEqualTo(c) || r.extras.replaceUrl) {
                const i = { ...r.extras.state, ...this.generateNgRouterState(r.id, this.browserPageId) };
                this.location.replaceState(c, '', i);
              } else {
                const a = { ...r.extras.state, ...this.generateNgRouterState(r.id, r.targetPageId) };
                this.location.go(c, '', a);
              }
            }
            restoreHistory(n, r = !1) {
              if ('computed' === this.canceledNavigationResolution) {
                const a = this.currentPageId - (this.browserPageId ?? this.currentPageId);
                0 !== a
                  ? this.location.historyGo(a)
                  : this.currentUrlTree === this.getCurrentNavigation()?.finalUrl &&
                    0 === a &&
                    (this.resetState(n), (this.browserUrlTree = n.currentUrlTree), this.resetUrlToCurrentUrlTree());
              } else
                'replace' === this.canceledNavigationResolution &&
                  (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
              (this.routerState = n.currentRouterState),
                (this.currentUrlTree = n.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.rawUrl));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                '',
                this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId),
              );
            }
            generateNgRouterState(n, r) {
              return 'computed' === this.canceledNavigationResolution
                ? { navigationId: n, ɵrouterPageId: r }
                : { navigationId: n };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          );
        })(),
        a6 = (() => {
          class e {
            constructor(n, r, c, a, i, s) {
              (this.router = n),
                (this.route = r),
                (this.tabIndexAttribute = c),
                (this.renderer = a),
                (this.el = i),
                (this.locationStrategy = s),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new _1());
              const o = i.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = 'a' === o || 'area' === o),
                this.isAnchorElement
                  ? (this.subscription = n.events.subscribe((l) => {
                      l instanceof x3 && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl('0');
            }
            set preserveFragment(n) {
              this._preserveFragment = S4(n);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(n) {
              this._skipLocationChange = S4(n);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(n) {
              this._replaceUrl = S4(n);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(n) {
              null != this.tabIndexAttribute || this.isAnchorElement || this.applyAttributeValue('tabindex', n);
            }
            ngOnChanges(n) {
              this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
            }
            set routerLink(n) {
              null != n
                ? ((this.commands = Array.isArray(n) ? n : [n]), this.setTabIndexIfNotOnNativeEl('0'))
                : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(n, r, c, a, i) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== n || r || c || a || i || ('string' == typeof this.target && '_self' != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(this.urlTree))
                  : null;
              const n =
                null === this.href
                  ? null
                  : (function B7(e, t, n) {
                      return (function zD(e, t) {
                        return ('src' === t &&
                          ('embed' === e || 'frame' === e || 'iframe' === e || 'media' === e || 'script' === e)) ||
                          ('href' === t && ('base' === e || 'link' === e))
                          ? O7
                          : H3;
                      })(
                        t,
                        n,
                      )(e);
                    })(this.href, this.el.nativeElement.tagName.toLowerCase(), 'href');
              this.applyAttributeValue('href', n);
            }
            applyAttributeValue(n, r) {
              const c = this.renderer,
                a = this.el.nativeElement;
              null !== r ? c.setAttribute(a, n, r) : c.removeAttribute(a, n);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                M(M1),
                M(_3),
                (function on(e) {
                  return (function Gw(e, t) {
                    if ('class' === t) return e.classes;
                    if ('style' === t) return e.styles;
                    const n = e.attrs;
                    if (n) {
                      const r = n.length;
                      let c = 0;
                      for (; c < r; ) {
                        const a = n[c];
                        if (_5(a)) break;
                        if (0 === a) c += 2;
                        else if ('number' == typeof a) for (c++; c < r && 'string' == typeof n[c]; ) c++;
                        else {
                          if (a === t) return n[c + 1];
                          c += 2;
                        }
                      }
                    }
                    return null;
                  })(j2(), e);
                })('tabindex'),
                M(fe),
                M(v1),
                M(b3),
              );
            }),
            (e.ɵdir = F({
              type: e,
              selectors: [['', 'routerLink', '']],
              hostVars: 1,
              hostBindings: function (n, r) {
                1 & n &&
                  s1('click', function (a) {
                    return r.onClick(a.button, a.ctrlKey, a.shiftKey, a.altKey, a.metaKey);
                  }),
                  2 & n && W1('target', r.target);
              },
              inputs: {
                target: 'target',
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                state: 'state',
                relativeTo: 'relativeTo',
                preserveFragment: 'preserveFragment',
                skipLocationChange: 'skipLocationChange',
                replaceUrl: 'replaceUrl',
                routerLink: 'routerLink',
              },
              standalone: !0,
              features: [c1],
            })),
            e
          );
        })(),
        Oh = (() => {
          class e {
            get isActive() {
              return this._isActive;
            }
            constructor(n, r, c, a, i) {
              (this.router = n),
                (this.element = r),
                (this.renderer = c),
                (this.cdr = a),
                (this.link = i),
                (this.classes = []),
                (this._isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new y2()),
                (this.routerEventsSubscription = n.events.subscribe((s) => {
                  s instanceof x3 && this.update();
                }));
            }
            ngAfterContentInit() {
              A(this.links.changes, A(null))
                .pipe(F3())
                .subscribe((n) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const n = [...this.links.toArray(), this.link].filter((r) => !!r).map((r) => r.onChanges);
              this.linkInputChangesSubscription = N2(n)
                .pipe(F3())
                .subscribe((r) => {
                  this._isActive !== this.isLinkActive(this.router)(r) && this.update();
                });
            }
            set routerLinkActive(n) {
              const r = Array.isArray(n) ? n : n.split(' ');
              this.classes = r.filter((c) => !!c);
            }
            ngOnChanges(n) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(), this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.router.navigated ||
                Promise.resolve().then(() => {
                  const n = this.hasActiveLinks();
                  this._isActive !== n &&
                    ((this._isActive = n),
                    this.cdr.markForCheck(),
                    this.classes.forEach((r) => {
                      n
                        ? this.renderer.addClass(this.element.nativeElement, r)
                        : this.renderer.removeClass(this.element.nativeElement, r);
                    }),
                    n && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          'aria-current',
                          this.ariaCurrentWhenActive.toString(),
                        )
                      : this.renderer.removeAttribute(this.element.nativeElement, 'aria-current'),
                    this.isActiveChange.emit(n));
                });
            }
            isLinkActive(n) {
              const r = (function qR(e) {
                return !!e.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return (c) => !!c.urlTree && n.isActive(c.urlTree, r);
            }
            hasActiveLinks() {
              const n = this.isLinkActive(this.router);
              return (this.link && n(this.link)) || this.links.some(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(M1), M(v1), M(fe), M(Jn), M(a6, 8));
            }),
            (e.ɵdir = F({
              type: e,
              selectors: [['', 'routerLinkActive', '']],
              contentQueries: function (n, r, c) {
                if ((1 & n && Pf(c, a6, 5), 2 & n)) {
                  let a;
                  Ff(
                    (a = (function Of() {
                      return (function JN(e, t) {
                        return e[ae].queries[t].queryList;
                      })(H(), V5());
                    })()),
                  ) && (r.links = a);
                }
              },
              inputs: {
                routerLinkActiveOptions: 'routerLinkActiveOptions',
                ariaCurrentWhenActive: 'ariaCurrentWhenActive',
                routerLinkActive: 'routerLinkActive',
              },
              outputs: { isActiveChange: 'isActiveChange' },
              exportAs: ['routerLinkActive'],
              standalone: !0,
              features: [c1],
            })),
            e
          );
        })();
      class Bh {}
      let YR = (() => {
        class e {
          constructor(n, r, c, a, i) {
            (this.router = n), (this.injector = c), (this.preloadingStrategy = a), (this.loader = i);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Ie((n) => n instanceof x3),
                Xe(() => this.preload()),
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const c = [];
            for (const a of r) {
              a.providers && !a._injector && (a._injector = Bn(a.providers, n, `Route: ${a.path}`));
              const i = a._injector ?? n,
                s = a._loadedInjector ?? i;
              ((a.loadChildren && !a._loadedRoutes && void 0 === a.canLoad) ||
                (a.loadComponent && !a._loadedComponent)) &&
                c.push(this.preloadConfig(i, a)),
                (a.children || a._loadedRoutes) && c.push(this.processRoutes(s, a.children ?? a._loadedRoutes));
            }
            return N2(c).pipe(F3());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let c;
              c = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(n, r) : A(null);
              const a = c.pipe(
                B2((i) =>
                  null === i
                    ? A(void 0)
                    : ((r._loadedRoutes = i.routes),
                      (r._loadedInjector = i.injector),
                      this.processRoutes(i.injector ?? n, i.routes)),
                ),
              );
              return r.loadComponent && !r._loadedComponent ? N2([a, this.loader.loadComponent(r)]).pipe(F3()) : a;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(M1), D(lu), D(le), D(Bh), D(Hi));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        );
      })();
      const yi = new S('');
      let Uh = (() => {
        class e {
          constructor(n, r, c, a, i = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = c),
              (this.zone = a),
              (this.options = i),
              (this.lastId = 0),
              (this.lastSource = 'imperative'),
              (this.restoredId = 0),
              (this.store = {}),
              (i.scrollPositionRestoration = i.scrollPositionRestoration || 'disabled'),
              (i.anchorScrolling = i.anchorScrolling || 'disabled');
          }
          init() {
            'disabled' !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration('manual'),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof ai
                ? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState ? n.restoredState.navigationId : 0))
                : n instanceof x3 &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof lh &&
                (n.position
                  ? 'top' === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : 'enabled' === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && 'enabled' === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : 'disabled' !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new lh(n, 'popstate' === this.lastSource ? this.store[this.restoredId] : null, r),
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function Cl() {
              throw new Error('invalid');
            })();
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var S1 = (() => (
        ((S1 = S1 || {})[(S1.COMPLETE = 0)] = 'COMPLETE'),
        (S1[(S1.FAILED = 1)] = 'FAILED'),
        (S1[(S1.REDIRECTING = 2)] = 'REDIRECTING'),
        S1
      ))();
      const F4 = !1;
      function Je(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const zi = new S('', { providedIn: 'root', factory: () => !1 });
      function $h() {
        const e = q(G1);
        return (t) => {
          const n = e.get(Qn);
          if (t !== n.components[0]) return;
          const r = e.get(M1),
            c = e.get(Gh);
          1 === e.get(Li) && r.initialNavigation(),
            e.get(Wh, null, T.Optional)?.setUpPreloading(),
            e.get(yi, null, T.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            c.closed || (c.next(), c.complete(), c.unsubscribe());
        };
      }
      const Gh = new S(F4 ? 'bootstrap done indicator' : '', { factory: () => new _1() }),
        Li = new S(F4 ? 'initial navigation' : '', { providedIn: 'root', factory: () => 1 });
      function JR() {
        let e = [];
        return (
          (e = F4
            ? [
                {
                  provide: Hn,
                  multi: !0,
                  useFactory: () => {
                    const t = q(M1);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function bI(e) {
                              if (!('type' in e)) return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${e.snapshot.routeConfig?.path || ''}')`;
                                case 13:
                                  return `ActivationStart(path: '${e.snapshot.routeConfig?.path || ''}')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${e.snapshot.routeConfig?.path || ''}')`;
                                case 11:
                                  return `ChildActivationStart(path: '${e.snapshot.routeConfig?.path || ''}')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${e.anchor}', position: '${
                                    e.position ? `${e.position[0]}, ${e.position[1]}` : null
                                  }')`;
                              }
                            })(n),
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          Je(1, e)
        );
      }
      const Wh = new S(F4 ? 'router preloader' : '');
      function eF(e) {
        return Je(0, [
          { provide: Wh, useExisting: YR },
          { provide: Bh, useExisting: e },
        ]);
      }
      const i6 = !1,
        qh = new S(i6 ? 'router duplicate forRoot guard' : 'ROUTER_FORROOT_GUARD'),
        tF = [
          Va,
          { provide: qt, useClass: Ja },
          M1,
          Jt,
          {
            provide: _3,
            useFactory: function jh(e) {
              return e.routerState.root;
            },
            deps: [M1],
          },
          Hi,
          i6 ? { provide: zi, useValue: !0 } : [],
        ];
      function nF() {
        return new vu('Router', M1);
      }
      let Yh = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                tF,
                i6 && r?.enableTracing ? JR().ɵproviders : [],
                { provide: R4, multi: !0, useValue: n },
                { provide: qh, useFactory: iF, deps: [[M1, new ut(), new dt()]] },
                { provide: O0, useValue: r || {} },
                r?.useHash ? { provide: b3, useClass: oE } : { provide: b3, useClass: Ou },
                {
                  provide: yi,
                  useFactory: () => {
                    const e = q(wk),
                      t = q(D2),
                      n = q(O0),
                      r = q(P0),
                      c = q(qt);
                    return n.scrollOffset && e.setOffset(n.scrollOffset), new Uh(c, r, e, t, n);
                  },
                },
                r?.preloadingStrategy ? eF(r.preloadingStrategy).ɵproviders : [],
                { provide: vu, multi: !0, useFactory: nF },
                r?.initialNavigation ? sF(r) : [],
                [
                  { provide: Xh, useFactory: $h },
                  { provide: gu, multi: !0, useExisting: Xh },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [{ provide: R4, multi: !0, useValue: n }] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(qh, 8));
          }),
          (e.ɵmod = V1({ type: e })),
          (e.ɵinj = u1({ imports: [hi] })),
          e
        );
      })();
      function iF(e) {
        if (i6 && e)
          throw new y(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead.",
          );
        return 'guarded';
      }
      function sF(e) {
        return [
          'disabled' === e.initialNavigation
            ? Je(3, [
                {
                  provide: Yn,
                  multi: !0,
                  useFactory: () => {
                    const t = q(M1);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Li, useValue: 2 },
              ]).ɵproviders
            : [],
          'enabledBlocking' === e.initialNavigation
            ? Je(2, [
                { provide: Li, useValue: 0 },
                {
                  provide: Yn,
                  multi: !0,
                  deps: [G1],
                  useFactory: (t) => {
                    const n = t.get(iE, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const c = t.get(M1),
                              a = t.get(Gh);
                            (function XR(e, t) {
                              e.events
                                .pipe(
                                  Ie((n) => n instanceof x3 || n instanceof D0 || n instanceof ii || n instanceof S0),
                                  W((n) =>
                                    n instanceof x3 || n instanceof S0
                                      ? S1.COMPLETE
                                      : n instanceof D0 && (0 === n.code || 1 === n.code)
                                      ? S1.REDIRECTING
                                      : S1.FAILED,
                                  ),
                                  Ie((n) => n !== S1.REDIRECTING),
                                  x4(1),
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(c, () => {
                              r(!0);
                            }),
                              (t.get(P0).afterPreactivation = () => (r(!0), a.closed ? A(void 0) : a)),
                              c.initialNavigation();
                          }),
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const Xh = new S(i6 ? 'Router Initializer' : '');
      let lF = (() => {
        class e {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = O1({
            type: e,
            selectors: [['app-dashboard']],
            decls: 7,
            vars: 0,
            consts: [
              [1, 'row'],
              [1, 'col-12'],
              [1, 'mt-5', 'text-center'],
            ],
            template: function (n, r) {
              1 & n &&
                (N(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'h1'),
                X(4, 'URL Shortener Dashboard'),
                I()()()(),
                b2(5, 'br')(6, 'router-outlet'));
            },
            dependencies: [N0],
          })),
          e
        );
      })();
      function Kh(e, t, n, r, c, a, i) {
        try {
          var s = e[a](i),
            o = s.value;
        } catch (l) {
          return void n(l);
        }
        s.done ? t(o) : Promise.resolve(o).then(r, c);
      }
      var s6 = {
          prefix: 'fas',
          iconName: 'rotate-left',
          icon: [
            512,
            512,
            ['rotate-back', 'rotate-backward', 'undo-alt'],
            'f2ea',
            'M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z',
          ],
        },
        Gv = {
          prefix: 'fas',
          iconName: 'eye',
          icon: [
            576,
            512,
            [128065],
            'f06e',
            'M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z',
          ],
        },
        lC = {
          prefix: 'fas',
          iconName: 'trash',
          icon: [
            448,
            512,
            [],
            'f1f8',
            'M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z',
          ],
        },
        Gi = {
          prefix: 'fas',
          iconName: 'up-right-from-square',
          icon: [
            512,
            512,
            ['external-link-alt'],
            'f35d',
            'M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z',
          ],
        };
      class nr {}
      class Cs {}
      class ee {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  'string' == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split('\n').forEach((n) => {
                            const r = n.indexOf(':');
                            if (r > 0) {
                              const c = n.slice(0, r),
                                a = c.toLowerCase(),
                                i = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(c, a),
                                this.headers.has(a) ? this.headers.get(a).push(i) : this.headers.set(a, [i]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.entries(t).forEach(([n, r]) => {
                            let c;
                            if (
                              ((c =
                                'string' == typeof r
                                  ? [r]
                                  : 'number' == typeof r
                                  ? [r.toString()]
                                  : r.map((a) => a.toString())),
                              c.length > 0)
                            ) {
                              const a = n.toLowerCase();
                              this.headers.set(a, c), this.maybeSetNormalizedName(n, a);
                            }
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: 'a' });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: 's' });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: 'd' });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof ee ? this.copyFrom(this.lazyInit) : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate && (this.lazyUpdate.forEach((t) => this.applyUpdate(t)), (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)), this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new ee();
          return (
            (n.lazyInit = this.lazyInit && this.lazyInit instanceof ee ? this.lazyInit : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case 'a':
            case 's':
              let r = t.value;
              if (('string' == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const c = ('a' === t.op ? this.headers.get(n) : void 0) || [];
              c.push(...r), this.headers.set(n, c);
              break;
            case 'd':
              const a = t.value;
              if (a) {
                let i = this.headers.get(n);
                if (!i) return;
                (i = i.filter((s) => -1 === a.indexOf(s))),
                  0 === i.length ? (this.headers.delete(n), this.normalizedNames.delete(n)) : this.headers.set(n, i);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) => t(this.normalizedNames.get(n), this.headers.get(n)));
        }
      }
      class k82 {
        encodeKey(t) {
          return LV(t);
        }
        encodeValue(t) {
          return LV(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const I82 = /%(\d[a-f0-9])/gi,
        R82 = { 40: '@', '3A': ':', 24: '$', '2C': ',', '3B': ';', '3D': '=', '3F': '?', '2F': '/' };
      function LV(e) {
        return encodeURIComponent(e).replace(I82, (t, n) => R82[n] ?? t);
      }
      function rr(e) {
        return `${e}`;
      }
      class e3 {
        constructor(t = {}) {
          if (((this.updates = null), (this.cloneFrom = null), (this.encoder = t.encoder || new k82()), t.fromString)) {
            if (t.fromObject) throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function T82(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((c) => {
                      const a = c.indexOf('='),
                        [i, s] =
                          -1 == a ? [t.decodeKey(c), ''] : [t.decodeKey(c.slice(0, a)), t.decodeValue(c.slice(a + 1))],
                        o = n.get(i) || [];
                      o.push(s), n.set(i, o);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    c = Array.isArray(r) ? r.map(rr) : [rr(r)];
                  this.map.set(n, c);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: 'a' });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const c = t[r];
              Array.isArray(c)
                ? c.forEach((a) => {
                    n.push({ param: r, value: a, op: 'a' });
                  })
                : n.push({ param: r, value: c, op: 'a' });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: 's' });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + '=' + this.encoder.encodeValue(r))
                  .join('&');
              })
              .filter((t) => '' !== t)
              .join('&')
          );
        }
        clone(t) {
          const n = new e3({ encoder: this.encoder });
          return (n.cloneFrom = this.cloneFrom || this), (n.updates = (this.updates || []).concat(t)), n;
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom.keys().forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case 'a':
                  case 's':
                    const n = ('a' === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(rr(t.value)), this.map.set(t.param, n);
                    break;
                  case 'd':
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const c = r.indexOf(rr(t.value));
                      -1 !== c && r.splice(c, 1), r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class F82 {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t);
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function wV(e) {
        return typeof ArrayBuffer < 'u' && e instanceof ArrayBuffer;
      }
      function bV(e) {
        return typeof Blob < 'u' && e instanceof Blob;
      }
      function DV(e) {
        return typeof FormData < 'u' && e instanceof FormData;
      }
      class h6 {
        constructor(t, n, r, c) {
          let a;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = t.toUpperCase()),
            (function P82(e) {
              switch (e) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || c
              ? ((this.body = void 0 !== r ? r : null), (a = c))
              : (a = r),
            a &&
              ((this.reportProgress = !!a.reportProgress),
              (this.withCredentials = !!a.withCredentials),
              a.responseType && (this.responseType = a.responseType),
              a.headers && (this.headers = a.headers),
              a.context && (this.context = a.context),
              a.params && (this.params = a.params)),
            this.headers || (this.headers = new ee()),
            this.context || (this.context = new F82()),
            this.params)
          ) {
            const i = this.params.toString();
            if (0 === i.length) this.urlWithParams = n;
            else {
              const s = n.indexOf('?');
              this.urlWithParams = n + (-1 === s ? '?' : s < n.length - 1 ? '&' : '') + i;
            }
          } else (this.params = new e3()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : wV(this.body) ||
              bV(this.body) ||
              DV(this.body) ||
              (function O82(e) {
                return typeof URLSearchParams < 'u' && e instanceof URLSearchParams;
              })(this.body) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof e3
            ? this.body.toString()
            : 'object' == typeof this.body || 'boolean' == typeof this.body || Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || DV(this.body)
            ? null
            : bV(this.body)
            ? this.body.type || null
            : wV(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof e3
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body || 'number' == typeof this.body || 'boolean' == typeof this.body
            ? 'application/json'
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            c = t.responseType || this.responseType,
            a = void 0 !== t.body ? t.body : this.body,
            i = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
            s = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
          let o = t.headers || this.headers,
            l = t.params || this.params;
          const f = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders && (o = Object.keys(t.setHeaders).reduce((u, d) => u.set(d, t.setHeaders[d]), o)),
            t.setParams && (l = Object.keys(t.setParams).reduce((u, d) => u.set(d, t.setParams[d]), l)),
            new h6(n, r, a, {
              params: l,
              headers: o,
              context: f,
              reportProgress: s,
              responseType: c,
              withCredentials: i,
            })
          );
        }
      }
      var k2 = (() => (
        ((k2 = k2 || {})[(k2.Sent = 0)] = 'Sent'),
        (k2[(k2.UploadProgress = 1)] = 'UploadProgress'),
        (k2[(k2.ResponseHeader = 2)] = 'ResponseHeader'),
        (k2[(k2.DownloadProgress = 3)] = 'DownloadProgress'),
        (k2[(k2.Response = 4)] = 'Response'),
        (k2[(k2.User = 5)] = 'User'),
        k2
      ))();
      class Ms {
        constructor(t, n = 200, r = 'OK') {
          (this.headers = t.headers || new ee()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Hs extends Ms {
        constructor(t = {}) {
          super(t), (this.type = k2.ResponseHeader);
        }
        clone(t = {}) {
          return new Hs({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class cr extends Ms {
        constructor(t = {}) {
          super(t), (this.type = k2.Response), (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new cr({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class SV extends Ms {
        constructor(t) {
          super(t, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || '(unknown url)'}`
                : `Http failure response for ${t.url || '(unknown url)'}: ${t.status} ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Vs(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let xV = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, c = {}) {
            let a;
            if (n instanceof h6) a = n;
            else {
              let o, l;
              (o = c.headers instanceof ee ? c.headers : new ee(c.headers)),
                c.params && (l = c.params instanceof e3 ? c.params : new e3({ fromObject: c.params })),
                (a = new h6(n, r, void 0 !== c.body ? c.body : null, {
                  headers: o,
                  context: c.context,
                  params: l,
                  reportProgress: c.reportProgress,
                  responseType: c.responseType || 'json',
                  withCredentials: c.withCredentials,
                }));
            }
            const i = A(a).pipe(Xe((o) => this.handler.handle(o)));
            if (n instanceof h6 || 'events' === c.observe) return i;
            const s = i.pipe(Ie((o) => o instanceof cr));
            switch (c.observe || 'body') {
              case 'body':
                switch (a.responseType) {
                  case 'arraybuffer':
                    return s.pipe(
                      W((o) => {
                        if (null !== o.body && !(o.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return o.body;
                      }),
                    );
                  case 'blob':
                    return s.pipe(
                      W((o) => {
                        if (null !== o.body && !(o.body instanceof Blob)) throw new Error('Response is not a Blob.');
                        return o.body;
                      }),
                    );
                  case 'text':
                    return s.pipe(
                      W((o) => {
                        if (null !== o.body && 'string' != typeof o.body) throw new Error('Response is not a string.');
                        return o.body;
                      }),
                    );
                  default:
                    return s.pipe(W((o) => o.body));
                }
              case 'response':
                return s;
              default:
                throw new Error(`Unreachable: unhandled observe type ${c.observe}}`);
            }
          }
          delete(n, r = {}) {
            return this.request('DELETE', n, r);
          }
          get(n, r = {}) {
            return this.request('GET', n, r);
          }
          head(n, r = {}) {
            return this.request('HEAD', n, r);
          }
          jsonp(n, r) {
            return this.request('JSONP', n, {
              params: new e3().append(r, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(n, r = {}) {
            return this.request('OPTIONS', n, r);
          }
          patch(n, r, c = {}) {
            return this.request('PATCH', n, Vs(c, r));
          }
          post(n, r, c = {}) {
            return this.request('POST', n, Vs(c, r));
          }
          put(n, r, c = {}) {
            return this.request('PUT', n, Vs(c, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(nr));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function _V(e, t) {
        return t(e);
      }
      function B82(e, t) {
        return (n, r) => t.intercept(n, { handle: (c) => e(c, r) });
      }
      const j82 = new S('HTTP_INTERCEPTORS'),
        p6 = new S('HTTP_INTERCEPTOR_FNS');
      function $82() {
        let e = null;
        return (t, n) => (null === e && (e = (q(j82, { optional: !0 }) ?? []).reduceRight(B82, _V)), e(t, n));
      }
      let NV = (() => {
        class e extends nr {
          constructor(n, r) {
            super(), (this.backend = n), (this.injector = r), (this.chain = null);
          }
          handle(n) {
            if (null === this.chain) {
              const r = Array.from(new Set(this.injector.get(p6)));
              this.chain = r.reduceRight(
                (c, a) =>
                  (function U82(e, t, n) {
                    return (r, c) => n.runInContext(() => t(r, (a) => e(a, c)));
                  })(c, a, this.injector),
                _V,
              );
            }
            return this.chain(n, (r) => this.backend.handle(r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Cs), D(le));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Y82 = /^\)\]\}',?\n/;
      let EV = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ('JSONP' === n.method)
              throw new Error('Attempted to construct Jsonp request without HttpClientJsonpModule installed.');
            return new L2((r) => {
              const c = this.xhrFactory.build();
              if (
                (c.open(n.method, n.urlWithParams),
                n.withCredentials && (c.withCredentials = !0),
                n.headers.forEach((h, p) => c.setRequestHeader(h, p.join(','))),
                n.headers.has('Accept') || c.setRequestHeader('Accept', 'application/json, text/plain, */*'),
                !n.headers.has('Content-Type'))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && c.setRequestHeader('Content-Type', h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                c.responseType = 'json' !== h ? h : 'text';
              }
              const a = n.serializeBody();
              let i = null;
              const s = () => {
                  if (null !== i) return i;
                  const h = c.statusText || 'OK',
                    p = new ee(c.getAllResponseHeaders()),
                    m =
                      (function X82(e) {
                        return 'responseURL' in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader('X-Request-URL')
                          : null;
                      })(c) || n.url;
                  return (i = new Hs({ headers: p, status: c.status, statusText: h, url: m })), i;
                },
                o = () => {
                  let { headers: h, status: p, statusText: m, url: v } = s(),
                    C = null;
                  204 !== p && (C = typeof c.response > 'u' ? c.responseText : c.response),
                    0 === p && (p = C ? 200 : 0);
                  let V = p >= 200 && p < 300;
                  if ('json' === n.responseType && 'string' == typeof C) {
                    const g = C;
                    C = C.replace(Y82, '');
                    try {
                      C = '' !== C ? JSON.parse(C) : null;
                    } catch (b) {
                      (C = g), V && ((V = !1), (C = { error: b, text: C }));
                    }
                  }
                  V
                    ? (r.next(new cr({ body: C, headers: h, status: p, statusText: m, url: v || void 0 })),
                      r.complete())
                    : r.error(new SV({ error: C, headers: h, status: p, statusText: m, url: v || void 0 }));
                },
                l = (h) => {
                  const { url: p } = s(),
                    m = new SV({
                      error: h,
                      status: c.status || 0,
                      statusText: c.statusText || 'Unknown Error',
                      url: p || void 0,
                    });
                  r.error(m);
                };
              let f = !1;
              const u = (h) => {
                  f || (r.next(s()), (f = !0));
                  let p = { type: k2.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    'text' === n.responseType && c.responseText && (p.partialText = c.responseText),
                    r.next(p);
                },
                d = (h) => {
                  let p = { type: k2.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                c.addEventListener('load', o),
                c.addEventListener('error', l),
                c.addEventListener('timeout', l),
                c.addEventListener('abort', l),
                n.reportProgress &&
                  (c.addEventListener('progress', u),
                  null !== a && c.upload && c.upload.addEventListener('progress', d)),
                c.send(a),
                r.next({ type: k2.Sent }),
                () => {
                  c.removeEventListener('error', l),
                    c.removeEventListener('abort', l),
                    c.removeEventListener('load', o),
                    c.removeEventListener('timeout', l),
                    n.reportProgress &&
                      (c.removeEventListener('progress', u),
                      null !== a && c.upload && c.upload.removeEventListener('progress', d)),
                    c.readyState !== c.DONE && c.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(sd));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ys = new S('XSRF_ENABLED'),
        kV = new S('XSRF_COOKIE_NAME', { providedIn: 'root', factory: () => 'XSRF-TOKEN' }),
        TV = new S('XSRF_HEADER_NAME', { providedIn: 'root', factory: () => 'X-XSRF-TOKEN' });
      class IV {}
      let Z82 = (() => {
        class e {
          constructor(n, r, c) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = c),
              (this.lastCookieString = ''),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ('server' === this.platform) return null;
            const n = this.doc.cookie || '';
            return (
              n !== this.lastCookieString &&
                (this.parseCount++, (this.lastToken = Ku(n, this.cookieName)), (this.lastCookieString = n)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(G2), D(aa), D(kV));
          }),
          (e.ɵprov = _({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function J82(e, t) {
        const n = e.url.toLowerCase();
        if (!q(ys) || 'GET' === e.method || 'HEAD' === e.method || n.startsWith('http://') || n.startsWith('https://'))
          return t(e);
        const r = q(IV).getToken(),
          c = q(TV);
        return null != r && !e.headers.has(c) && (e = e.clone({ headers: e.headers.set(c, r) })), t(e);
      }
      var _2 = (() => (
        ((_2 = _2 || {})[(_2.Interceptors = 0)] = 'Interceptors'),
        (_2[(_2.LegacyInterceptors = 1)] = 'LegacyInterceptors'),
        (_2[(_2.CustomXsrfConfiguration = 2)] = 'CustomXsrfConfiguration'),
        (_2[(_2.NoXsrfProtection = 3)] = 'NoXsrfProtection'),
        (_2[(_2.JsonpSupport = 4)] = 'JsonpSupport'),
        (_2[(_2.RequestsMadeViaParent = 5)] = 'RequestsMadeViaParent'),
        _2
      ))();
      function P4(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function ea2(...e) {
        const t = [
          xV,
          EV,
          NV,
          { provide: nr, useExisting: NV },
          { provide: Cs, useExisting: EV },
          { provide: p6, useValue: J82, multi: !0 },
          { provide: ys, useValue: !0 },
          { provide: IV, useClass: Z82 },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function LD(e) {
          return { ɵproviders: e };
        })(t);
      }
      const RV = new S('LEGACY_INTERCEPTOR_FN');
      let na2 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = V1({ type: e })),
            (e.ɵinj = u1({
              providers: [
                ea2(
                  P4(_2.LegacyInterceptors, [
                    { provide: RV, useFactory: $82 },
                    { provide: p6, useExisting: RV, multi: !0 },
                  ]),
                ),
              ],
            })),
            e
          );
        })(),
        zs = (() => {
          class e {
            constructor(n) {
              (this.http = n),
                (this.urls = []),
                (this.selectedUrl = null),
                (this.apiUrl = 'http://localhost:3000/api/urls'),
                (this.lastUrlChangedEvent = new _1()),
                (this.selectedUrlChangedEvent = new _1()),
                (this.urlListChangedEvent = new _1()),
                (this.urls = []);
            }
            shortenUrl(n) {
              if (!n) return;
              const r = new ee({ 'Content-Type': 'application/json' });
              this.http.post(this.apiUrl, { originalUrl: n }, { headers: r }).subscribe({
                next: (c) => {
                  this.urls.push(c.data), this.lastUrlChangedEvent.next(c.data), this.sortAndUpdateUrls();
                },
                error: (c) => {
                  console.error('Error adding URL:', c);
                },
              });
            }
            resetUrlClicks(n) {
              const r = new ee({ 'Content-Type': 'application/json' });
              this.http.put(`${this.apiUrl}/${n.id}`, { clicksCounter: 0 }, { headers: r }).subscribe({
                next: (c) => {
                  (this.selectedUrl = c.data), this.selectedUrlChangedEvent.next(this.selectedUrl);
                },
                error: (c) => {
                  console.error('Error adding URL:', c);
                },
              });
            }
            getUrls() {
              this.http.get(this.apiUrl).subscribe({
                next: (n) => {
                  (this.urls = n.data), this.sortAndUpdateUrls();
                },
              });
            }
            getUrl(n) {
              n &&
                this.http.get(`${this.apiUrl}/${n}`).subscribe({
                  next: (r) => {
                    (this.selectedUrl = r.data), this.selectedUrlChangedEvent.next(this.selectedUrl);
                  },
                  error: (r) => {
                    console.error('An error occurred:', r);
                  },
                });
            }
            deleteUrl(n) {
              this.http.delete(`${this.apiUrl}/${n.id}`).subscribe({
                next: (r) => {
                  (this.selectedUrl = null), this.selectedUrlChangedEvent.next(this.selectedUrl);
                },
                error: (r) => {
                  console.error('An error occurred:', r);
                },
              });
            }
            sortAndUpdateUrls() {
              this.urls.sort((n, r) => new Date(r.createdAt).getTime() - new Date(n.createdAt).getTime()),
                this.urlListChangedEvent.next(this.urls.slice());
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(xV));
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          );
        })();
      function FV(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (c) {
              return Object.getOwnPropertyDescriptor(e, c).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function w(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? FV(Object(n), !0).forEach(function (r) {
                P2(e, r, n[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : FV(Object(n)).forEach(function (r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
              });
        }
        return e;
      }
      function ar(e) {
        return (ar =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                  ? 'symbol'
                  : typeof t;
              })(e);
      }
      function PV(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function P2(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
            : (e[t] = n),
          e
        );
      }
      function Ls(e, t) {
        return (
          (function sa2(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function la2(e, t) {
            var n = null == e ? null : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
            if (null != n) {
              var i,
                s,
                r = [],
                c = !0,
                a = !1;
              try {
                for (n = n.call(e); !(c = (i = n.next()).done) && (r.push(i.value), !t || r.length !== t); c = !0);
              } catch (o) {
                (a = !0), (s = o);
              } finally {
                try {
                  !c && null != n.return && n.return();
                } finally {
                  if (a) throw s;
                }
              }
              return r;
            }
          })(e, t) ||
          OV(e, t) ||
          (function ua2() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function g6(e) {
        return (
          (function ia2(e) {
            if (Array.isArray(e)) return ws(e);
          })(e) ||
          (function oa2(e) {
            if ((typeof Symbol < 'u' && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
          })(e) ||
          OV(e) ||
          (function fa2() {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function OV(e, t) {
        if (e) {
          if ('string' == typeof e) return ws(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          if (('Object' === n && e.constructor && (n = e.constructor.name), 'Map' === n || 'Set' === n))
            return Array.from(e);
          if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ws(e, t);
        }
      }
      function ws(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      var BV = function () {},
        bs = {},
        UV = {},
        jV = null,
        $V = { mark: BV, measure: BV };
      try {
        typeof window < 'u' && (bs = window),
          typeof document < 'u' && (UV = document),
          typeof MutationObserver < 'u' && (jV = MutationObserver),
          typeof performance < 'u' && ($V = performance);
      } catch {}
      var or,
        lr,
        fr,
        ur,
        dr,
        GV = (bs.navigator || {}).userAgent,
        WV = void 0 === GV ? '' : GV,
        t3 = bs,
        m2 = UV,
        qV = jV,
        sr = $V,
        Fe =
          !!m2.documentElement &&
          !!m2.head &&
          'function' == typeof m2.addEventListener &&
          'function' == typeof m2.createElement,
        YV = ~WV.indexOf('MSIE') || ~WV.indexOf('Trident/'),
        Pe = '___FONT_AWESOME___',
        Ds = 16,
        XV = 'fa',
        KV = 'svg-inline--fa',
        N3 = 'data-fa-i2svg',
        Ss = 'data-fa-pseudo-element',
        ha2 = 'data-fa-pseudo-element-pending',
        xs = 'data-prefix',
        _s = 'data-icon',
        QV = 'fontawesome-i2svg',
        pa2 = 'async',
        ma2 = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'],
        ZV = (function () {
          try {
            return !0;
          } catch {
            return !1;
          }
        })(),
        g2 = 'classic',
        z2 = 'sharp',
        Ns = [g2, z2];
      function v6(e) {
        return new Proxy(e, {
          get: function (n, r) {
            return r in n ? n[r] : n[g2];
          },
        });
      }
      var C6 = v6(
          (P2((or = {}), g2, {
            fa: 'solid',
            fas: 'solid',
            'fa-solid': 'solid',
            far: 'regular',
            'fa-regular': 'regular',
            fal: 'light',
            'fa-light': 'light',
            fat: 'thin',
            'fa-thin': 'thin',
            fad: 'duotone',
            'fa-duotone': 'duotone',
            fab: 'brands',
            'fa-brands': 'brands',
            fak: 'kit',
            'fa-kit': 'kit',
          }),
          P2(or, z2, {
            fa: 'solid',
            fass: 'solid',
            'fa-solid': 'solid',
            fasr: 'regular',
            'fa-regular': 'regular',
            fasl: 'light',
            'fa-light': 'light',
          }),
          or),
        ),
        M6 = v6(
          (P2((lr = {}), g2, {
            solid: 'fas',
            regular: 'far',
            light: 'fal',
            thin: 'fat',
            duotone: 'fad',
            brands: 'fab',
            kit: 'fak',
          }),
          P2(lr, z2, { solid: 'fass', regular: 'fasr', light: 'fasl' }),
          lr),
        ),
        H6 = v6(
          (P2((fr = {}), g2, {
            fab: 'fa-brands',
            fad: 'fa-duotone',
            fak: 'fa-kit',
            fal: 'fa-light',
            far: 'fa-regular',
            fas: 'fa-solid',
            fat: 'fa-thin',
          }),
          P2(fr, z2, { fass: 'fa-solid', fasr: 'fa-regular', fasl: 'fa-light' }),
          fr),
        ),
        ga2 = v6(
          (P2((ur = {}), g2, {
            'fa-brands': 'fab',
            'fa-duotone': 'fad',
            'fa-kit': 'fak',
            'fa-light': 'fal',
            'fa-regular': 'far',
            'fa-solid': 'fas',
            'fa-thin': 'fat',
          }),
          P2(ur, z2, { 'fa-solid': 'fass', 'fa-regular': 'fasr', 'fa-light': 'fasl' }),
          ur),
        ),
        va2 = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,
        JV = 'fa-layers-text',
        Ca2 = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,
        Ma2 = v6(
          (P2((dr = {}), g2, { 900: 'fas', 400: 'far', normal: 'far', 300: 'fal', 100: 'fat' }),
          P2(dr, z2, { 900: 'fass', 400: 'fasr', 300: 'fasl' }),
          dr),
        ),
        ey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        Ha2 = ey.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
        Va2 = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'],
        A3 = { GROUP: 'duotone-group', SWAP_OPACITY: 'swap-opacity', PRIMARY: 'primary', SECONDARY: 'secondary' },
        V6 = new Set();
      Object.keys(M6[g2]).map(V6.add.bind(V6)), Object.keys(M6[z2]).map(V6.add.bind(V6));
      var ya2 = []
          .concat(Ns, g6(V6), [
            '2xs',
            'xs',
            'sm',
            'lg',
            'xl',
            '2xl',
            'beat',
            'border',
            'fade',
            'beat-fade',
            'bounce',
            'flip-both',
            'flip-horizontal',
            'flip-vertical',
            'flip',
            'fw',
            'inverse',
            'layers-counter',
            'layers-text',
            'layers',
            'li',
            'pull-left',
            'pull-right',
            'pulse',
            'rotate-180',
            'rotate-270',
            'rotate-90',
            'rotate-by',
            'shake',
            'spin-pulse',
            'spin-reverse',
            'spin',
            'stack-1x',
            'stack-2x',
            'stack',
            'ul',
            A3.GROUP,
            A3.SWAP_OPACITY,
            A3.PRIMARY,
            A3.SECONDARY,
          ])
          .concat(
            ey.map(function (e) {
              return ''.concat(e, 'x');
            }),
          )
          .concat(
            Ha2.map(function (e) {
              return 'w-'.concat(e);
            }),
          ),
        y6 = t3.FontAwesomeConfig || {};
      m2 &&
        'function' == typeof m2.querySelector &&
        [
          ['data-family-prefix', 'familyPrefix'],
          ['data-css-prefix', 'cssPrefix'],
          ['data-family-default', 'familyDefault'],
          ['data-style-default', 'styleDefault'],
          ['data-replacement-class', 'replacementClass'],
          ['data-auto-replace-svg', 'autoReplaceSvg'],
          ['data-auto-add-css', 'autoAddCss'],
          ['data-auto-a11y', 'autoA11y'],
          ['data-search-pseudo-elements', 'searchPseudoElements'],
          ['data-observe-mutations', 'observeMutations'],
          ['data-mutate-approach', 'mutateApproach'],
          ['data-keep-original-source', 'keepOriginalSource'],
          ['data-measure-performance', 'measurePerformance'],
          ['data-show-missing-icons', 'showMissingIcons'],
        ].forEach(function (e) {
          var t = Ls(e, 2),
            r = t[1],
            c = (function La2(e) {
              return '' === e || ('false' !== e && ('true' === e || e));
            })(
              (function za2(e) {
                var t = m2.querySelector('script[' + e + ']');
                if (t) return t.getAttribute(e);
              })(t[0]),
            );
          null != c && (y6[r] = c);
        });
      var ty = {
        styleDefault: 'solid',
        familyDefault: 'classic',
        cssPrefix: XV,
        replacementClass: KV,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        mutateApproach: 'async',
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0,
      };
      y6.familyPrefix && (y6.cssPrefix = y6.familyPrefix);
      var O4 = w(w({}, ty), y6);
      O4.autoReplaceSvg || (O4.observeMutations = !1);
      var x = {};
      Object.keys(ty).forEach(function (e) {
        Object.defineProperty(x, e, {
          enumerable: !0,
          set: function (n) {
            (O4[e] = n),
              z6.forEach(function (r) {
                return r(x);
              });
          },
          get: function () {
            return O4[e];
          },
        });
      }),
        Object.defineProperty(x, 'familyPrefix', {
          enumerable: !0,
          set: function (t) {
            (O4.cssPrefix = t),
              z6.forEach(function (n) {
                return n(x);
              });
          },
          get: function () {
            return O4.cssPrefix;
          },
        }),
        (t3.FontAwesomeConfig = x);
      var z6 = [],
        n3 = Ds,
        Ce = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 },
        Sa2 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      function L6() {
        for (var e = 12, t = ''; e-- > 0; ) t += Sa2[(62 * Math.random()) | 0];
        return t;
      }
      function B4(e) {
        for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
        return t;
      }
      function As(e) {
        return e.classList
          ? B4(e.classList)
          : (e.getAttribute('class') || '').split(' ').filter(function (t) {
              return t;
            });
      }
      function ny(e) {
        return ''
          .concat(e)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      function hr(e) {
        return Object.keys(e || {}).reduce(function (t, n) {
          return t + ''.concat(n, ': ').concat(e[n].trim(), ';');
        }, '');
      }
      function Es(e) {
        return e.size !== Ce.size || e.x !== Ce.x || e.y !== Ce.y || e.rotate !== Ce.rotate || e.flipX || e.flipY;
      }
      var Aa2 =
        ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    -webkit-transition-delay: 0s;\n            transition-delay: 0s;\n    -webkit-transition-duration: 0s;\n            transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
      function ry() {
        var e = XV,
          t = KV,
          n = x.cssPrefix,
          r = x.replacementClass,
          c = Aa2;
        if (n !== e || r !== t) {
          var a = new RegExp('\\.'.concat(e, '\\-'), 'g'),
            i = new RegExp('\\--'.concat(e, '\\-'), 'g'),
            s = new RegExp('\\.'.concat(t), 'g');
          c = c.replace(a, '.'.concat(n, '-')).replace(i, '--'.concat(n, '-')).replace(s, '.'.concat(r));
        }
        return c;
      }
      var cy = !1;
      function ks() {
        x.autoAddCss &&
          !cy &&
          ((function Da2(e) {
            if (e && Fe) {
              var t = m2.createElement('style');
              t.setAttribute('type', 'text/css'), (t.innerHTML = e);
              for (var n = m2.head.childNodes, r = null, c = n.length - 1; c > -1; c--) {
                var a = n[c],
                  i = (a.tagName || '').toUpperCase();
                ['STYLE', 'LINK'].indexOf(i) > -1 && (r = a);
              }
              m2.head.insertBefore(t, r);
            }
          })(ry()),
          (cy = !0));
      }
      var Ea2 = {
          mixout: function () {
            return { dom: { css: ry, insertCss: ks } };
          },
          hooks: function () {
            return {
              beforeDOMElementCreation: function () {
                ks();
              },
              beforeI2svg: function () {
                ks();
              },
            };
          },
        },
        Oe = t3 || {};
      Oe[Pe] || (Oe[Pe] = {}),
        Oe[Pe].styles || (Oe[Pe].styles = {}),
        Oe[Pe].hooks || (Oe[Pe].hooks = {}),
        Oe[Pe].shims || (Oe[Pe].shims = []);
      var te = Oe[Pe],
        ay = [],
        pr = !1;
      function w6(e) {
        var t = e.tag,
          n = e.attributes,
          r = void 0 === n ? {} : n,
          c = e.children,
          a = void 0 === c ? [] : c;
        return 'string' == typeof e
          ? ny(e)
          : '<'
              .concat(t, ' ')
              .concat(
                (function xa2(e) {
                  return Object.keys(e || {})
                    .reduce(function (t, n) {
                      return t + ''.concat(n, '="').concat(ny(e[n]), '" ');
                    }, '')
                    .trim();
                })(r),
                '>',
              )
              .concat(a.map(w6).join(''), '</')
              .concat(t, '>');
      }
      function iy(e, t, n) {
        if (e && e[t] && e[t][n]) return { prefix: t, iconName: n, icon: e[t][n] };
      }
      Fe &&
        ((pr = (m2.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(m2.readyState)) ||
          m2.addEventListener('DOMContentLoaded', function e() {
            m2.removeEventListener('DOMContentLoaded', e),
              (pr = 1),
              ay.map(function (t) {
                return t();
              });
          }));
      var Ts = function (t, n, r, c) {
        var o,
          l,
          f,
          a = Object.keys(t),
          i = a.length,
          s =
            void 0 !== c
              ? (function (t, n) {
                  return function (r, c, a, i) {
                    return t.call(n, r, c, a, i);
                  };
                })(n, c)
              : n;
        for (void 0 === r ? ((o = 1), (f = t[a[0]])) : ((o = 0), (f = r)); o < i; o++) f = s(f, t[(l = a[o])], l, t);
        return f;
      };
      function Is(e) {
        var t = (function Ra2(e) {
          for (var t = [], n = 0, r = e.length; n < r; ) {
            var c = e.charCodeAt(n++);
            if (c >= 55296 && c <= 56319 && n < r) {
              var a = e.charCodeAt(n++);
              56320 == (64512 & a) ? t.push(((1023 & c) << 10) + (1023 & a) + 65536) : (t.push(c), n--);
            } else t.push(c);
          }
          return t;
        })(e);
        return 1 === t.length ? t[0].toString(16) : null;
      }
      function sy(e) {
        return Object.keys(e).reduce(function (t, n) {
          var r = e[n];
          return r.icon ? (t[r.iconName] = r.icon) : (t[n] = r), t;
        }, {});
      }
      function Rs(e, t) {
        var r = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).skipHooks,
          c = void 0 !== r && r,
          a = sy(t);
        'function' != typeof te.hooks.addPack || c
          ? (te.styles[e] = w(w({}, te.styles[e] || {}), a))
          : te.hooks.addPack(e, sy(t)),
          'fas' === e && Rs('fa', t);
      }
      var mr,
        gr,
        vr,
        U4 = te.styles,
        Pa2 = te.shims,
        Oa2 = (P2((mr = {}), g2, Object.values(H6[g2])), P2(mr, z2, Object.values(H6[z2])), mr),
        Fs = null,
        oy = {},
        ly = {},
        fy = {},
        uy = {},
        dy = {},
        Ba2 = (P2((gr = {}), g2, Object.keys(C6[g2])), P2(gr, z2, Object.keys(C6[z2])), gr);
      var hy = function () {
        var t = function (a) {
          return Ts(
            U4,
            function (i, s, o) {
              return (i[o] = Ts(s, a, {})), i;
            },
            {},
          );
        };
        (oy = t(function (c, a, i) {
          return (
            a[3] && (c[a[3]] = i),
            a[2] &&
              a[2]
                .filter(function (o) {
                  return 'number' == typeof o;
                })
                .forEach(function (o) {
                  c[o.toString(16)] = i;
                }),
            c
          );
        })),
          (ly = t(function (c, a, i) {
            return (
              (c[i] = i),
              a[2] &&
                a[2]
                  .filter(function (o) {
                    return 'string' == typeof o;
                  })
                  .forEach(function (o) {
                    c[o] = i;
                  }),
              c
            );
          })),
          (dy = t(function (c, a, i) {
            var s = a[2];
            return (
              (c[i] = i),
              s.forEach(function (o) {
                c[o] = i;
              }),
              c
            );
          }));
        var n = 'far' in U4 || x.autoFetchSvg,
          r = Ts(
            Pa2,
            function (c, a) {
              var i = a[0],
                s = a[1],
                o = a[2];
              return (
                'far' === s && !n && (s = 'fas'),
                'string' == typeof i && (c.names[i] = { prefix: s, iconName: o }),
                'number' == typeof i && (c.unicodes[i.toString(16)] = { prefix: s, iconName: o }),
                c
              );
            },
            { names: {}, unicodes: {} },
          );
        (fy = r.names), (uy = r.unicodes), (Fs = Cr(x.styleDefault, { family: x.familyDefault }));
      };
      function Ps(e, t) {
        return (oy[e] || {})[t];
      }
      function E3(e, t) {
        return (dy[e] || {})[t];
      }
      function py(e) {
        return fy[e] || { prefix: null, iconName: null };
      }
      function r3() {
        return Fs;
      }
      (function ba2(e) {
        z6.push(e);
      })(function (e) {
        Fs = Cr(e.styleDefault, { family: x.familyDefault });
      }),
        hy();
      var Os = function () {
        return { prefix: null, iconName: null, rest: [] };
      };
      function Cr(e) {
        var n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).family,
          r = void 0 === n ? g2 : n;
        return M6[r][e] || M6[r][C6[r][e]] || (e in te.styles ? e : null) || null;
      }
      var my = (P2((vr = {}), g2, Object.keys(H6[g2])), P2(vr, z2, Object.keys(H6[z2])), vr);
      function Mr(e) {
        var t,
          r = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).skipLookups,
          c = void 0 !== r && r,
          a =
            (P2((t = {}), g2, ''.concat(x.cssPrefix, '-').concat(g2)),
            P2(t, z2, ''.concat(x.cssPrefix, '-').concat(z2)),
            t),
          i = null,
          s = g2;
        (e.includes(a[g2]) ||
          e.some(function (l) {
            return my[g2].includes(l);
          })) &&
          (s = g2),
          (e.includes(a[z2]) ||
            e.some(function (l) {
              return my[z2].includes(l);
            })) &&
            (s = z2);
        var o = e.reduce(function (l, f) {
          var u = (function ja2(e, t) {
            var n = t.split('-'),
              r = n[0],
              c = n.slice(1).join('-');
            return r !== e ||
              '' === c ||
              (function Ua2(e) {
                return ~ya2.indexOf(e);
              })(c)
              ? null
              : c;
          })(x.cssPrefix, f);
          if (
            (U4[f]
              ? ((f = Oa2[s].includes(f) ? ga2[s][f] : f), (i = f), (l.prefix = f))
              : Ba2[s].indexOf(f) > -1
              ? ((i = f), (l.prefix = Cr(f, { family: s })))
              : u
              ? (l.iconName = u)
              : f !== x.replacementClass && f !== a[g2] && f !== a[z2] && l.rest.push(f),
            !c && l.prefix && l.iconName)
          ) {
            var d = 'fa' === i ? py(l.iconName) : {},
              h = E3(l.prefix, l.iconName);
            d.prefix && (i = null),
              (l.iconName = d.iconName || h || l.iconName),
              (l.prefix = d.prefix || l.prefix),
              'far' === l.prefix && !U4.far && U4.fas && !x.autoFetchSvg && (l.prefix = 'fas');
          }
          return l;
        }, Os());
        return (
          (e.includes('fa-brands') || e.includes('fab')) && (o.prefix = 'fab'),
          (e.includes('fa-duotone') || e.includes('fad')) && (o.prefix = 'fad'),
          !o.prefix &&
            s === z2 &&
            (U4.fass || x.autoFetchSvg) &&
            ((o.prefix = 'fass'), (o.iconName = E3(o.prefix, o.iconName) || o.iconName)),
          ('fa' === o.prefix || 'fa' === i) && (o.prefix = r3() || 'fas'),
          o
        );
      }
      var Wa2 = (function () {
          function e() {
            (function ra2(e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, e),
              (this.definitions = {});
          }
          return (
            (function ca2(e, t, n) {
              t && PV(e.prototype, t), n && PV(e, n), Object.defineProperty(e, 'prototype', { writable: !1 });
            })(e, [
              {
                key: 'add',
                value: function () {
                  for (var n = this, r = arguments.length, c = new Array(r), a = 0; a < r; a++) c[a] = arguments[a];
                  var i = c.reduce(this._pullDefinitions, {});
                  Object.keys(i).forEach(function (s) {
                    (n.definitions[s] = w(w({}, n.definitions[s] || {}), i[s])), Rs(s, i[s]);
                    var o = H6[g2][s];
                    o && Rs(o, i[s]), hy();
                  });
                },
              },
              {
                key: 'reset',
                value: function () {
                  this.definitions = {};
                },
              },
              {
                key: '_pullDefinitions',
                value: function (n, r) {
                  var c = r.prefix && r.iconName && r.icon ? { 0: r } : r;
                  return (
                    Object.keys(c).map(function (a) {
                      var i = c[a],
                        s = i.prefix,
                        o = i.iconName,
                        l = i.icon,
                        f = l[2];
                      n[s] || (n[s] = {}),
                        f.length > 0 &&
                          f.forEach(function (u) {
                            'string' == typeof u && (n[s][u] = l);
                          }),
                        (n[s][o] = l);
                    }),
                    n
                  );
                },
              },
            ]),
            e
          );
        })(),
        gy = [],
        j4 = {},
        $4 = {},
        qa2 = Object.keys($4);
      function Bs(e, t) {
        for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), c = 2; c < n; c++) r[c - 2] = arguments[c];
        return (
          (j4[e] || []).forEach(function (i) {
            t = i.apply(null, [t].concat(r));
          }),
          t
        );
      }
      function k3(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        (j4[e] || []).forEach(function (a) {
          a.apply(null, n);
        });
      }
      function Be() {
        var e = arguments[0],
          t = Array.prototype.slice.call(arguments, 1);
        return $4[e] ? $4[e].apply(null, t) : void 0;
      }
      function Us(e) {
        'fa' === e.prefix && (e.prefix = 'fas');
        var t = e.iconName,
          n = e.prefix || r3();
        if (t) return (t = E3(n, t) || t), iy(vy.definitions, n, t) || iy(te.styles, n, t);
      }
      var vy = new Wa2(),
        Ka2 = {
          i2svg: function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return Fe
              ? (k3('beforeI2svg', t), Be('pseudoElements2svg', t), Be('i2svg', t))
              : Promise.reject('Operation requires a DOM of some kind.');
          },
          watch: function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = t.autoReplaceSvgRoot;
            !1 === x.autoReplaceSvg && (x.autoReplaceSvg = !0),
              (x.observeMutations = !0),
              (function Ta2(e) {
                Fe && (pr ? setTimeout(e, 0) : ay.push(e));
              })(function () {
                Za2({ autoReplaceSvgRoot: n }), k3('watch', t);
              });
          },
        },
        x1 = {
          noAuto: function () {
            (x.autoReplaceSvg = !1), (x.observeMutations = !1), k3('noAuto');
          },
          config: x,
          dom: Ka2,
          parse: {
            icon: function (t) {
              if (null === t) return null;
              if ('object' === ar(t) && t.prefix && t.iconName)
                return { prefix: t.prefix, iconName: E3(t.prefix, t.iconName) || t.iconName };
              if (Array.isArray(t) && 2 === t.length) {
                var n = 0 === t[1].indexOf('fa-') ? t[1].slice(3) : t[1],
                  r = Cr(t[0]);
                return { prefix: r, iconName: E3(r, n) || n };
              }
              if ('string' == typeof t && (t.indexOf(''.concat(x.cssPrefix, '-')) > -1 || t.match(va2))) {
                var c = Mr(t.split(' '), { skipLookups: !0 });
                return { prefix: c.prefix || r3(), iconName: E3(c.prefix, c.iconName) || c.iconName };
              }
              if ('string' == typeof t) {
                var a = r3();
                return { prefix: a, iconName: E3(a, t) || t };
              }
            },
          },
          library: vy,
          findIconDefinition: Us,
          toHtml: w6,
        },
        Za2 = function () {
          var n = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).autoReplaceSvgRoot,
            r = void 0 === n ? m2 : n;
          (Object.keys(te.styles).length > 0 || x.autoFetchSvg) && Fe && x.autoReplaceSvg && x1.dom.i2svg({ node: r });
        };
      function Hr(e, t) {
        return (
          Object.defineProperty(e, 'abstract', { get: t }),
          Object.defineProperty(e, 'html', {
            get: function () {
              return e.abstract.map(function (r) {
                return w6(r);
              });
            },
          }),
          Object.defineProperty(e, 'node', {
            get: function () {
              if (Fe) {
                var r = m2.createElement('div');
                return (r.innerHTML = e.html), r.children;
              }
            },
          }),
          e
        );
      }
      function js(e) {
        var t = e.icons,
          n = t.main,
          r = t.mask,
          c = e.prefix,
          a = e.iconName,
          i = e.transform,
          s = e.symbol,
          o = e.title,
          l = e.maskId,
          f = e.titleId,
          u = e.extra,
          d = e.watchable,
          h = void 0 !== d && d,
          p = r.found ? r : n,
          m = p.width,
          v = p.height,
          C = 'fak' === c,
          V = [x.replacementClass, a ? ''.concat(x.cssPrefix, '-').concat(a) : '']
            .filter(function (l3) {
              return -1 === u.classes.indexOf(l3);
            })
            .filter(function (l3) {
              return '' !== l3 || !!l3;
            })
            .concat(u.classes)
            .join(' '),
          g = {
            children: [],
            attributes: w(
              w({}, u.attributes),
              {},
              {
                'data-prefix': c,
                'data-icon': a,
                class: V,
                role: u.attributes.role || 'img',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 '.concat(m, ' ').concat(v),
              },
            ),
          },
          b = C && !~u.classes.indexOf('fa-fw') ? { width: ''.concat((m / v) * 16 * 0.0625, 'em') } : {};
        h && (g.attributes[N3] = ''),
          o &&
            (g.children.push({
              tag: 'title',
              attributes: { id: g.attributes['aria-labelledby'] || 'title-'.concat(f || L6()) },
              children: [o],
            }),
            delete g.attributes.title);
        var P = w(
            w({}, g),
            {},
            {
              prefix: c,
              iconName: a,
              main: n,
              mask: r,
              maskId: l,
              transform: i,
              symbol: s,
              styles: w(w({}, b), u.styles),
            },
          ),
          a2 =
            r.found && n.found
              ? Be('generateAbstractMask', P) || { children: [], attributes: {} }
              : Be('generateAbstractIcon', P) || { children: [], attributes: {} },
          Mo = a2.attributes;
        return (
          (P.children = a2.children),
          (P.attributes = Mo),
          s
            ? (function ei2(e) {
                var n = e.iconName,
                  r = e.children,
                  c = e.attributes,
                  a = e.symbol,
                  i = !0 === a ? ''.concat(e.prefix, '-').concat(x.cssPrefix, '-').concat(n) : a;
                return [
                  {
                    tag: 'svg',
                    attributes: { style: 'display: none;' },
                    children: [{ tag: 'symbol', attributes: w(w({}, c), {}, { id: i }), children: r }],
                  },
                ];
              })(P)
            : (function Ja2(e) {
                var t = e.children,
                  n = e.main,
                  r = e.mask,
                  c = e.attributes,
                  a = e.styles,
                  i = e.transform;
                if (Es(i) && n.found && !r.found) {
                  var l = { x: n.width / n.height / 2, y: 0.5 };
                  c.style = hr(
                    w(
                      w({}, a),
                      {},
                      { 'transform-origin': ''.concat(l.x + i.x / 16, 'em ').concat(l.y + i.y / 16, 'em') },
                    ),
                  );
                }
                return [{ tag: 'svg', attributes: c, children: t }];
              })(P)
        );
      }
      function Cy(e) {
        var t = e.content,
          n = e.width,
          r = e.height,
          c = e.transform,
          a = e.title,
          i = e.extra,
          s = e.watchable,
          o = void 0 !== s && s,
          l = w(w(w({}, i.attributes), a ? { title: a } : {}), {}, { class: i.classes.join(' ') });
        o && (l[N3] = '');
        var f = w({}, i.styles);
        Es(c) &&
          ((f.transform = (function Na2(e) {
            var t = e.transform,
              n = e.width,
              c = e.height,
              a = void 0 === c ? Ds : c,
              i = e.startCentered,
              s = void 0 !== i && i,
              o = '';
            return (
              (o +=
                s && YV
                  ? 'translate('.concat(t.x / n3 - (void 0 === n ? Ds : n) / 2, 'em, ').concat(t.y / n3 - a / 2, 'em) ')
                  : s
                  ? 'translate(calc(-50% + '.concat(t.x / n3, 'em), calc(-50% + ').concat(t.y / n3, 'em)) ')
                  : 'translate('.concat(t.x / n3, 'em, ').concat(t.y / n3, 'em) ')),
              (o += 'scale('
                .concat((t.size / n3) * (t.flipX ? -1 : 1), ', ')
                .concat((t.size / n3) * (t.flipY ? -1 : 1), ') ')) + 'rotate('.concat(t.rotate, 'deg) ')
            );
          })({ transform: c, startCentered: !0, width: n, height: r })),
          (f['-webkit-transform'] = f.transform));
        var u = hr(f);
        u.length > 0 && (l.style = u);
        var d = [];
        return (
          d.push({ tag: 'span', attributes: l, children: [t] }),
          a && d.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [a] }),
          d
        );
      }
      var $s = te.styles;
      function Gs(e) {
        var t = e[0],
          n = e[1],
          a = Ls(e.slice(4), 1)[0];
        return {
          found: !0,
          width: t,
          height: n,
          icon: Array.isArray(a)
            ? {
                tag: 'g',
                attributes: { class: ''.concat(x.cssPrefix, '-').concat(A3.GROUP) },
                children: [
                  {
                    tag: 'path',
                    attributes: {
                      class: ''.concat(x.cssPrefix, '-').concat(A3.SECONDARY),
                      fill: 'currentColor',
                      d: a[0],
                    },
                  },
                  {
                    tag: 'path',
                    attributes: {
                      class: ''.concat(x.cssPrefix, '-').concat(A3.PRIMARY),
                      fill: 'currentColor',
                      d: a[1],
                    },
                  },
                ],
              }
            : { tag: 'path', attributes: { fill: 'currentColor', d: a } },
        };
      }
      var ni2 = { found: !1, width: 512, height: 512 };
      function Ws(e, t) {
        var n = t;
        return (
          'fa' === t && null !== x.styleDefault && (t = r3()),
          new Promise(function (r, c) {
            if ((Be('missingIconAbstract'), 'fa' === n)) {
              var i = py(e) || {};
              (e = i.iconName || e), (t = i.prefix || t);
            }
            if (e && t && $s[t] && $s[t][e]) return r(Gs($s[t][e]));
            (function ri2(e, t) {
              !ZV &&
                !x.showMissingIcons &&
                e &&
                console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
            })(e, t),
              r(w(w({}, ni2), {}, { icon: (x.showMissingIcons && e && Be('missingIconAbstract')) || {} }));
          })
        );
      }
      var My = function () {},
        qs = x.measurePerformance && sr && sr.mark && sr.measure ? sr : { mark: My, measure: My },
        b6 = 'FA "6.4.0"',
        Hy = function (t) {
          qs.mark(''.concat(b6, ' ').concat(t, ' ends')),
            qs.measure(
              ''.concat(b6, ' ').concat(t),
              ''.concat(b6, ' ').concat(t, ' begins'),
              ''.concat(b6, ' ').concat(t, ' ends'),
            );
        },
        Ys = {
          begin: function (t) {
            return (
              qs.mark(''.concat(b6, ' ').concat(t, ' begins')),
              function () {
                return Hy(t);
              }
            );
          },
          end: Hy,
        },
        Vr = function () {};
      function Vy(e) {
        return 'string' == typeof (e.getAttribute ? e.getAttribute(N3) : null);
      }
      function oi2(e) {
        return m2.createElementNS('http://www.w3.org/2000/svg', e);
      }
      function li2(e) {
        return m2.createElement(e);
      }
      function yy(e) {
        var n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).ceFn,
          r = void 0 === n ? ('svg' === e.tag ? oi2 : li2) : n;
        if ('string' == typeof e) return m2.createTextNode(e);
        var c = r(e.tag);
        return (
          Object.keys(e.attributes || []).forEach(function (i) {
            c.setAttribute(i, e.attributes[i]);
          }),
          (e.children || []).forEach(function (i) {
            c.appendChild(yy(i, { ceFn: r }));
          }),
          c
        );
      }
      var yr = {
        replace: function (t) {
          var n = t[0];
          if (n.parentNode)
            if (
              (t[1].forEach(function (c) {
                n.parentNode.insertBefore(yy(c), n);
              }),
              null === n.getAttribute(N3) && x.keepOriginalSource)
            ) {
              var r = m2.createComment(
                (function fi2(e) {
                  var t = ' '.concat(e.outerHTML, ' ');
                  return ''.concat(t, 'Font Awesome fontawesome.com ');
                })(n),
              );
              n.parentNode.replaceChild(r, n);
            } else n.remove();
        },
        nest: function (t) {
          var n = t[0],
            r = t[1];
          if (~As(n).indexOf(x.replacementClass)) return yr.replace(t);
          var c = new RegExp(''.concat(x.cssPrefix, '-.*'));
          if ((delete r[0].attributes.id, r[0].attributes.class)) {
            var a = r[0].attributes.class.split(' ').reduce(
              function (s, o) {
                return o === x.replacementClass || o.match(c) ? s.toSvg.push(o) : s.toNode.push(o), s;
              },
              { toNode: [], toSvg: [] },
            );
            (r[0].attributes.class = a.toSvg.join(' ')),
              0 === a.toNode.length ? n.removeAttribute('class') : n.setAttribute('class', a.toNode.join(' '));
          }
          var i = r
            .map(function (s) {
              return w6(s);
            })
            .join('\n');
          n.setAttribute(N3, ''), (n.innerHTML = i);
        },
      };
      function zy(e) {
        e();
      }
      function Ly(e, t) {
        var n = 'function' == typeof t ? t : Vr;
        if (0 === e.length) n();
        else {
          var r = zy;
          x.mutateApproach === pa2 && (r = t3.requestAnimationFrame || zy),
            r(function () {
              var c = (function si2() {
                  return !0 === x.autoReplaceSvg ? yr.replace : yr[x.autoReplaceSvg] || yr.replace;
                })(),
                a = Ys.begin('mutate');
              e.map(c), a(), n();
            });
        }
      }
      var Xs = !1;
      function wy() {
        Xs = !0;
      }
      function Ks() {
        Xs = !1;
      }
      var zr = null;
      function by(e) {
        if (qV && x.observeMutations) {
          var t = e.treeCallback,
            n = void 0 === t ? Vr : t,
            r = e.nodeCallback,
            c = void 0 === r ? Vr : r,
            a = e.pseudoElementsCallback,
            i = void 0 === a ? Vr : a,
            s = e.observeMutationsRoot,
            o = void 0 === s ? m2 : s;
          (zr = new qV(function (l) {
            if (!Xs) {
              var f = r3();
              B4(l).forEach(function (u) {
                if (
                  ('childList' === u.type &&
                    u.addedNodes.length > 0 &&
                    !Vy(u.addedNodes[0]) &&
                    (x.searchPseudoElements && i(u.target), n(u.target)),
                  'attributes' === u.type && u.target.parentNode && x.searchPseudoElements && i(u.target.parentNode),
                  'attributes' === u.type && Vy(u.target) && ~Va2.indexOf(u.attributeName))
                )
                  if (
                    'class' === u.attributeName &&
                    (function ai2(e) {
                      var t = e.getAttribute ? e.getAttribute(xs) : null,
                        n = e.getAttribute ? e.getAttribute(_s) : null;
                      return t && n;
                    })(u.target)
                  ) {
                    var d = Mr(As(u.target)),
                      p = d.iconName;
                    u.target.setAttribute(xs, d.prefix || f), p && u.target.setAttribute(_s, p);
                  } else
                    (function ii2(e) {
                      return e && e.classList && e.classList.contains && e.classList.contains(x.replacementClass);
                    })(u.target) && c(u.target);
              });
            }
          })),
            Fe && zr.observe(o, { childList: !0, attributes: !0, characterData: !0, subtree: !0 });
        }
      }
      function Dy(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { styleParser: !0 },
          n = (function hi2(e) {
            var t = e.getAttribute('data-prefix'),
              n = e.getAttribute('data-icon'),
              r = void 0 !== e.innerText ? e.innerText.trim() : '',
              c = Mr(As(e));
            return (
              c.prefix || (c.prefix = r3()),
              t && n && ((c.prefix = t), (c.iconName = n)),
              (c.iconName && c.prefix) ||
                (c.prefix &&
                  r.length > 0 &&
                  (c.iconName =
                    (function $a2(e, t) {
                      return (ly[e] || {})[t];
                    })(c.prefix, e.innerText) || Ps(c.prefix, Is(e.innerText))),
                !c.iconName &&
                  x.autoFetchSvg &&
                  e.firstChild &&
                  e.firstChild.nodeType === Node.TEXT_NODE &&
                  (c.iconName = e.firstChild.data)),
              c
            );
          })(e),
          r = n.iconName,
          c = n.prefix,
          a = n.rest,
          i = (function pi2(e) {
            var t = B4(e.attributes).reduce(function (c, a) {
                return 'class' !== c.name && 'style' !== c.name && (c[a.name] = a.value), c;
              }, {}),
              n = e.getAttribute('title'),
              r = e.getAttribute('data-fa-title-id');
            return (
              x.autoA11y &&
                (n
                  ? (t['aria-labelledby'] = ''.concat(x.replacementClass, '-title-').concat(r || L6()))
                  : ((t['aria-hidden'] = 'true'), (t.focusable = 'false'))),
              t
            );
          })(e),
          s = Bs('parseNodeAttributes', {}, e),
          o = t.styleParser
            ? (function di2(e) {
                var t = e.getAttribute('style'),
                  n = [];
                return (
                  t &&
                    (n = t.split(';').reduce(function (r, c) {
                      var a = c.split(':'),
                        i = a[0],
                        s = a.slice(1);
                      return i && s.length > 0 && (r[i] = s.join(':').trim()), r;
                    }, {})),
                  n
                );
              })(e)
            : [];
        return w(
          {
            iconName: r,
            title: e.getAttribute('title'),
            titleId: e.getAttribute('data-fa-title-id'),
            prefix: c,
            transform: Ce,
            mask: { iconName: null, prefix: null, rest: [] },
            maskId: null,
            symbol: !1,
            extra: { classes: a, styles: o, attributes: i },
          },
          s,
        );
      }
      var gi2 = te.styles;
      function Sy(e) {
        var t = 'nest' === x.autoReplaceSvg ? Dy(e, { styleParser: !1 }) : Dy(e);
        return ~t.extra.classes.indexOf(JV)
          ? Be('generateLayersText', e, t)
          : Be('generateSvgReplacementMutation', e, t);
      }
      var c3 = new Set();
      function xy(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (!Fe) return Promise.resolve();
        var n = m2.documentElement.classList,
          r = function (u) {
            return n.add(''.concat(QV, '-').concat(u));
          },
          c = function (u) {
            return n.remove(''.concat(QV, '-').concat(u));
          },
          a = x.autoFetchSvg
            ? c3
            : Ns.map(function (f) {
                return 'fa-'.concat(f);
              }).concat(Object.keys(gi2));
        a.includes('fa') || a.push('fa');
        var i = ['.'.concat(JV, ':not([').concat(N3, '])')]
          .concat(
            a.map(function (f) {
              return '.'.concat(f, ':not([').concat(N3, '])');
            }),
          )
          .join(', ');
        if (0 === i.length) return Promise.resolve();
        var s = [];
        try {
          s = B4(e.querySelectorAll(i));
        } catch {}
        if (!(s.length > 0)) return Promise.resolve();
        r('pending'), c('complete');
        var o = Ys.begin('onTree'),
          l = s.reduce(function (f, u) {
            try {
              var d = Sy(u);
              d && f.push(d);
            } catch (h) {
              ZV || ('MissingIcon' === h.name && console.error(h));
            }
            return f;
          }, []);
        return new Promise(function (f, u) {
          Promise.all(l)
            .then(function (d) {
              Ly(d, function () {
                r('active'), r('complete'), c('pending'), 'function' == typeof t && t(), o(), f();
              });
            })
            .catch(function (d) {
              o(), u(d);
            });
        });
      }
      function vi2(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        Sy(e).then(function (n) {
          n && Ly([n], t);
        });
      }
      Ns.map(function (e) {
        c3.add('fa-'.concat(e));
      }),
        Object.keys(C6[g2]).map(c3.add.bind(c3)),
        Object.keys(C6[z2]).map(c3.add.bind(c3)),
        (c3 = g6(c3));
      var Mi2 = function (t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = n.transform,
            c = void 0 === r ? Ce : r,
            a = n.symbol,
            i = void 0 !== a && a,
            s = n.mask,
            o = void 0 === s ? null : s,
            l = n.maskId,
            f = void 0 === l ? null : l,
            u = n.title,
            d = void 0 === u ? null : u,
            h = n.titleId,
            p = void 0 === h ? null : h,
            m = n.classes,
            v = void 0 === m ? [] : m,
            C = n.attributes,
            V = void 0 === C ? {} : C,
            g = n.styles,
            b = void 0 === g ? {} : g;
          if (t) {
            var P = t.prefix,
              a2 = t.iconName,
              o3 = t.icon;
            return Hr(w({ type: 'icon' }, t), function () {
              return (
                k3('beforeDOMElementCreation', { iconDefinition: t, params: n }),
                x.autoA11y &&
                  (d
                    ? (V['aria-labelledby'] = ''.concat(x.replacementClass, '-title-').concat(p || L6()))
                    : ((V['aria-hidden'] = 'true'), (V.focusable = 'false'))),
                js({
                  icons: { main: Gs(o3), mask: o ? Gs(o.icon) : { found: !1, width: null, height: null, icon: {} } },
                  prefix: P,
                  iconName: a2,
                  transform: w(w({}, Ce), c),
                  symbol: i,
                  title: d,
                  maskId: f,
                  titleId: p,
                  extra: { attributes: V, styles: b, classes: v },
                })
              );
            });
          }
        },
        Hi2 = {
          mixout: function () {
            return {
              icon:
                ((e = Mi2),
                function (t) {
                  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = (t || {}).icon ? t : Us(t || {}),
                    c = n.mask;
                  return c && (c = (c || {}).icon ? c : Us(c || {})), e(r, w(w({}, n), {}, { mask: c }));
                }),
            };
            var e;
          },
          hooks: function () {
            return {
              mutationObserverCallbacks: function (n) {
                return (n.treeCallback = xy), (n.nodeCallback = vi2), n;
              },
            };
          },
          provides: function (t) {
            (t.i2svg = function (n) {
              var r = n.node,
                a = n.callback;
              return xy(void 0 === r ? m2 : r, void 0 === a ? function () {} : a);
            }),
              (t.generateSvgReplacementMutation = function (n, r) {
                var c = r.iconName,
                  a = r.title,
                  i = r.titleId,
                  s = r.prefix,
                  o = r.transform,
                  l = r.symbol,
                  f = r.mask,
                  u = r.maskId,
                  d = r.extra;
                return new Promise(function (h, p) {
                  Promise.all([
                    Ws(c, s),
                    f.iconName
                      ? Ws(f.iconName, f.prefix)
                      : Promise.resolve({ found: !1, width: 512, height: 512, icon: {} }),
                  ])
                    .then(function (m) {
                      var v = Ls(m, 2);
                      h([
                        n,
                        js({
                          icons: { main: v[0], mask: v[1] },
                          prefix: s,
                          iconName: c,
                          transform: o,
                          symbol: l,
                          maskId: u,
                          title: a,
                          titleId: i,
                          extra: d,
                          watchable: !0,
                        }),
                      ]);
                    })
                    .catch(p);
                });
              }),
              (t.generateAbstractIcon = function (n) {
                var l,
                  r = n.children,
                  c = n.attributes,
                  a = n.main,
                  i = n.transform,
                  o = hr(n.styles);
                return (
                  o.length > 0 && (c.style = o),
                  Es(i) &&
                    (l = Be('generateAbstractTransformGrouping', {
                      main: a,
                      transform: i,
                      containerWidth: a.width,
                      iconWidth: a.width,
                    })),
                  r.push(l || a.icon),
                  { children: r, attributes: c }
                );
              });
          },
        },
        Vi2 = {
          mixout: function () {
            return {
              layer: function (n) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  c = r.classes,
                  a = void 0 === c ? [] : c;
                return Hr({ type: 'layer' }, function () {
                  k3('beforeDOMElementCreation', { assembler: n, params: r });
                  var i = [];
                  return (
                    n(function (s) {
                      Array.isArray(s)
                        ? s.map(function (o) {
                            i = i.concat(o.abstract);
                          })
                        : (i = i.concat(s.abstract));
                    }),
                    [
                      {
                        tag: 'span',
                        attributes: { class: [''.concat(x.cssPrefix, '-layers')].concat(g6(a)).join(' ') },
                        children: i,
                      },
                    ]
                  );
                });
              },
            };
          },
        },
        yi2 = {
          mixout: function () {
            return {
              counter: function (n) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  c = r.title,
                  a = void 0 === c ? null : c,
                  i = r.classes,
                  s = void 0 === i ? [] : i,
                  o = r.attributes,
                  l = void 0 === o ? {} : o,
                  f = r.styles,
                  u = void 0 === f ? {} : f;
                return Hr({ type: 'counter', content: n }, function () {
                  return (
                    k3('beforeDOMElementCreation', { content: n, params: r }),
                    (function ti2(e) {
                      var t = e.content,
                        n = e.title,
                        r = e.extra,
                        c = w(w(w({}, r.attributes), n ? { title: n } : {}), {}, { class: r.classes.join(' ') }),
                        a = hr(r.styles);
                      a.length > 0 && (c.style = a);
                      var i = [];
                      return (
                        i.push({ tag: 'span', attributes: c, children: [t] }),
                        n && i.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [n] }),
                        i
                      );
                    })({
                      content: n.toString(),
                      title: a,
                      extra: {
                        attributes: l,
                        styles: u,
                        classes: [''.concat(x.cssPrefix, '-layers-counter')].concat(g6(s)),
                      },
                    })
                  );
                });
              },
            };
          },
        },
        zi2 = {
          mixout: function () {
            return {
              text: function (n) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  c = r.transform,
                  a = void 0 === c ? Ce : c,
                  i = r.title,
                  s = void 0 === i ? null : i,
                  o = r.classes,
                  l = void 0 === o ? [] : o,
                  f = r.attributes,
                  u = void 0 === f ? {} : f,
                  d = r.styles,
                  h = void 0 === d ? {} : d;
                return Hr({ type: 'text', content: n }, function () {
                  return (
                    k3('beforeDOMElementCreation', { content: n, params: r }),
                    Cy({
                      content: n,
                      transform: w(w({}, Ce), a),
                      title: s,
                      extra: {
                        attributes: u,
                        styles: h,
                        classes: [''.concat(x.cssPrefix, '-layers-text')].concat(g6(l)),
                      },
                    })
                  );
                });
              },
            };
          },
          provides: function (t) {
            t.generateLayersText = function (n, r) {
              var c = r.title,
                a = r.transform,
                i = r.extra,
                s = null,
                o = null;
              if (YV) {
                var l = parseInt(getComputedStyle(n).fontSize, 10),
                  f = n.getBoundingClientRect();
                (s = f.width / l), (o = f.height / l);
              }
              return (
                x.autoA11y && !c && (i.attributes['aria-hidden'] = 'true'),
                Promise.resolve([
                  n,
                  Cy({ content: n.innerHTML, width: s, height: o, transform: a, title: c, extra: i, watchable: !0 }),
                ])
              );
            };
          },
        },
        Li2 = new RegExp('"', 'ug'),
        _y = [1105920, 1112319];
      function Ny(e, t) {
        var n = ''.concat(ha2).concat(t.replace(':', '-'));
        return new Promise(function (r, c) {
          if (null !== e.getAttribute(n)) return r();
          var i = B4(e.children).filter(function (o3) {
              return o3.getAttribute(Ss) === t;
            })[0],
            s = t3.getComputedStyle(e, t),
            o = s.getPropertyValue('font-family').match(Ca2),
            l = s.getPropertyValue('font-weight'),
            f = s.getPropertyValue('content');
          if (i && !o) return e.removeChild(i), r();
          if (o && 'none' !== f && '' !== f) {
            var u = s.getPropertyValue('content'),
              d = ~['Sharp'].indexOf(o[2]) ? z2 : g2,
              h = ~['Solid', 'Regular', 'Light', 'Thin', 'Duotone', 'Brands', 'Kit'].indexOf(o[2])
                ? M6[d][o[2].toLowerCase()]
                : Ma2[d][l],
              p = (function wi2(e) {
                var t = e.replace(Li2, ''),
                  n = (function Fa2(e, t) {
                    var c,
                      n = e.length,
                      r = e.charCodeAt(t);
                    return r >= 55296 && r <= 56319 && n > t + 1 && (c = e.charCodeAt(t + 1)) >= 56320 && c <= 57343
                      ? 1024 * (r - 55296) + c - 56320 + 65536
                      : r;
                  })(t, 0),
                  r = n >= _y[0] && n <= _y[1],
                  c = 2 === t.length && t[0] === t[1];
                return { value: Is(c ? t[0] : t), isSecondary: r || c };
              })(u),
              m = p.value,
              v = p.isSecondary,
              C = o[0].startsWith('FontAwesome'),
              V = Ps(h, m),
              g = V;
            if (C) {
              var b = (function Ga2(e) {
                var t = uy[e],
                  n = Ps('fas', e);
                return t || (n ? { prefix: 'fas', iconName: n } : null) || { prefix: null, iconName: null };
              })(m);
              b.iconName && b.prefix && ((V = b.iconName), (h = b.prefix));
            }
            if (!V || v || (i && i.getAttribute(xs) === h && i.getAttribute(_s) === g)) r();
            else {
              e.setAttribute(n, g), i && e.removeChild(i);
              var P = (function mi2() {
                  return {
                    iconName: null,
                    title: null,
                    titleId: null,
                    prefix: null,
                    transform: Ce,
                    symbol: !1,
                    mask: { iconName: null, prefix: null, rest: [] },
                    maskId: null,
                    extra: { classes: [], styles: {}, attributes: {} },
                  };
                })(),
                a2 = P.extra;
              (a2.attributes[Ss] = t),
                Ws(V, h)
                  .then(function (o3) {
                    var Mo = js(
                        w(
                          w({}, P),
                          {},
                          { icons: { main: o3, mask: Os() }, prefix: h, iconName: g, extra: a2, watchable: !0 },
                        ),
                      ),
                      l3 = m2.createElement('svg');
                    '::before' === t ? e.insertBefore(l3, e.firstChild) : e.appendChild(l3),
                      (l3.outerHTML = Mo.map(function (do2) {
                        return w6(do2);
                      }).join('\n')),
                      e.removeAttribute(n),
                      r();
                  })
                  .catch(c);
            }
          } else r();
        });
      }
      function bi2(e) {
        return Promise.all([Ny(e, '::before'), Ny(e, '::after')]);
      }
      function Di2(e) {
        return !(
          e.parentNode === document.head ||
          ~ma2.indexOf(e.tagName.toUpperCase()) ||
          e.getAttribute(Ss) ||
          (e.parentNode && 'svg' === e.parentNode.tagName)
        );
      }
      function Ay(e) {
        if (Fe)
          return new Promise(function (t, n) {
            var r = B4(e.querySelectorAll('*')).filter(Di2).map(bi2),
              c = Ys.begin('searchPseudoElements');
            wy(),
              Promise.all(r)
                .then(function () {
                  c(), Ks(), t();
                })
                .catch(function () {
                  c(), Ks(), n();
                });
          });
      }
      var Ey = !1,
        ky = function (t) {
          return t
            .toLowerCase()
            .split(' ')
            .reduce(
              function (r, c) {
                var a = c.toLowerCase().split('-'),
                  i = a[0],
                  s = a.slice(1).join('-');
                if (i && 'h' === s) return (r.flipX = !0), r;
                if (i && 'v' === s) return (r.flipY = !0), r;
                if (((s = parseFloat(s)), isNaN(s))) return r;
                switch (i) {
                  case 'grow':
                    r.size = r.size + s;
                    break;
                  case 'shrink':
                    r.size = r.size - s;
                    break;
                  case 'left':
                    r.x = r.x - s;
                    break;
                  case 'right':
                    r.x = r.x + s;
                    break;
                  case 'up':
                    r.y = r.y - s;
                    break;
                  case 'down':
                    r.y = r.y + s;
                    break;
                  case 'rotate':
                    r.rotate = r.rotate + s;
                }
                return r;
              },
              { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 },
            );
        },
        Qs = { x: 0, y: 0, width: '100%', height: '100%' };
      function Ty(e) {
        return (
          e.attributes &&
            (e.attributes.fill || !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) &&
            (e.attributes.fill = 'black'),
          e
        );
      }
      !(function Ya2(e, t) {
        var n = t.mixoutsTo;
        (gy = e),
          (j4 = {}),
          Object.keys($4).forEach(function (r) {
            -1 === qa2.indexOf(r) && delete $4[r];
          }),
          gy.forEach(function (r) {
            var c = r.mixout ? r.mixout() : {};
            if (
              (Object.keys(c).forEach(function (i) {
                'function' == typeof c[i] && (n[i] = c[i]),
                  'object' === ar(c[i]) &&
                    Object.keys(c[i]).forEach(function (s) {
                      n[i] || (n[i] = {}), (n[i][s] = c[i][s]);
                    });
              }),
              r.hooks)
            ) {
              var a = r.hooks();
              Object.keys(a).forEach(function (i) {
                j4[i] || (j4[i] = []), j4[i].push(a[i]);
              });
            }
            r.provides && r.provides($4);
          });
      })(
        [
          Ea2,
          Hi2,
          Vi2,
          yi2,
          zi2,
          {
            hooks: function () {
              return {
                mutationObserverCallbacks: function (n) {
                  return (n.pseudoElementsCallback = Ay), n;
                },
              };
            },
            provides: function (t) {
              t.pseudoElements2svg = function (n) {
                var r = n.node;
                x.searchPseudoElements && Ay(void 0 === r ? m2 : r);
              };
            },
          },
          {
            mixout: function () {
              return {
                dom: {
                  unwatch: function () {
                    wy(), (Ey = !0);
                  },
                },
              };
            },
            hooks: function () {
              return {
                bootstrap: function () {
                  by(Bs('mutationObserverCallbacks', {}));
                },
                noAuto: function () {
                  !(function ui2() {
                    zr && zr.disconnect();
                  })();
                },
                watch: function (n) {
                  var r = n.observeMutationsRoot;
                  Ey ? Ks() : by(Bs('mutationObserverCallbacks', { observeMutationsRoot: r }));
                },
              };
            },
          },
          {
            mixout: function () {
              return {
                parse: {
                  transform: function (n) {
                    return ky(n);
                  },
                },
              };
            },
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var c = r.getAttribute('data-fa-transform');
                  return c && (n.transform = ky(c)), n;
                },
              };
            },
            provides: function (t) {
              t.generateAbstractTransformGrouping = function (n) {
                var r = n.main,
                  c = n.transform,
                  i = n.iconWidth,
                  s = { transform: 'translate('.concat(n.containerWidth / 2, ' 256)') },
                  o = 'translate('.concat(32 * c.x, ', ').concat(32 * c.y, ') '),
                  l = 'scale('
                    .concat((c.size / 16) * (c.flipX ? -1 : 1), ', ')
                    .concat((c.size / 16) * (c.flipY ? -1 : 1), ') '),
                  f = 'rotate('.concat(c.rotate, ' 0 0)'),
                  h = {
                    outer: s,
                    inner: { transform: ''.concat(o, ' ').concat(l, ' ').concat(f) },
                    path: { transform: 'translate('.concat((i / 2) * -1, ' -256)') },
                  };
                return {
                  tag: 'g',
                  attributes: w({}, h.outer),
                  children: [
                    {
                      tag: 'g',
                      attributes: w({}, h.inner),
                      children: [
                        { tag: r.icon.tag, children: r.icon.children, attributes: w(w({}, r.icon.attributes), h.path) },
                      ],
                    },
                  ],
                };
              };
            },
          },
          {
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var c = r.getAttribute('data-fa-mask'),
                    a = c
                      ? Mr(
                          c.split(' ').map(function (i) {
                            return i.trim();
                          }),
                        )
                      : Os();
                  return a.prefix || (a.prefix = r3()), (n.mask = a), (n.maskId = r.getAttribute('data-fa-mask-id')), n;
                },
              };
            },
            provides: function (t) {
              t.generateAbstractMask = function (n) {
                var e,
                  r = n.children,
                  c = n.attributes,
                  a = n.main,
                  i = n.mask,
                  s = n.maskId,
                  f = a.icon,
                  d = i.icon,
                  h = (function _a2(e) {
                    var t = e.transform,
                      r = e.iconWidth,
                      c = { transform: 'translate('.concat(e.containerWidth / 2, ' 256)') },
                      a = 'translate('.concat(32 * t.x, ', ').concat(32 * t.y, ') '),
                      i = 'scale('
                        .concat((t.size / 16) * (t.flipX ? -1 : 1), ', ')
                        .concat((t.size / 16) * (t.flipY ? -1 : 1), ') '),
                      s = 'rotate('.concat(t.rotate, ' 0 0)');
                    return {
                      outer: c,
                      inner: { transform: ''.concat(a, ' ').concat(i, ' ').concat(s) },
                      path: { transform: 'translate('.concat((r / 2) * -1, ' -256)') },
                    };
                  })({ transform: n.transform, containerWidth: i.width, iconWidth: a.width }),
                  p = { tag: 'rect', attributes: w(w({}, Qs), {}, { fill: 'white' }) },
                  m = f.children ? { children: f.children.map(Ty) } : {},
                  v = {
                    tag: 'g',
                    attributes: w({}, h.inner),
                    children: [Ty(w({ tag: f.tag, attributes: w(w({}, f.attributes), h.path) }, m))],
                  },
                  C = { tag: 'g', attributes: w({}, h.outer), children: [v] },
                  V = 'mask-'.concat(s || L6()),
                  g = 'clip-'.concat(s || L6()),
                  b = {
                    tag: 'mask',
                    attributes: w(
                      w({}, Qs),
                      {},
                      { id: V, maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse' },
                    ),
                    children: [p, C],
                  },
                  P = {
                    tag: 'defs',
                    children: [
                      { tag: 'clipPath', attributes: { id: g }, children: ((e = d), 'g' === e.tag ? e.children : [e]) },
                      b,
                    ],
                  };
                return (
                  r.push(P, {
                    tag: 'rect',
                    attributes: w(
                      { fill: 'currentColor', 'clip-path': 'url(#'.concat(g, ')'), mask: 'url(#'.concat(V, ')') },
                      Qs,
                    ),
                  }),
                  { children: r, attributes: c }
                );
              };
            },
          },
          {
            provides: function (t) {
              var n = !1;
              t3.matchMedia && (n = t3.matchMedia('(prefers-reduced-motion: reduce)').matches),
                (t.missingIconAbstract = function () {
                  var r = [],
                    c = { fill: 'currentColor' },
                    a = { attributeType: 'XML', repeatCount: 'indefinite', dur: '2s' };
                  r.push({
                    tag: 'path',
                    attributes: w(
                      w({}, c),
                      {},
                      {
                        d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z',
                      },
                    ),
                  });
                  var i = w(w({}, a), {}, { attributeName: 'opacity' }),
                    s = { tag: 'circle', attributes: w(w({}, c), {}, { cx: '256', cy: '364', r: '28' }), children: [] };
                  return (
                    n ||
                      s.children.push(
                        {
                          tag: 'animate',
                          attributes: w(w({}, a), {}, { attributeName: 'r', values: '28;14;28;28;14;28;' }),
                        },
                        { tag: 'animate', attributes: w(w({}, i), {}, { values: '1;0;1;1;0;1;' }) },
                      ),
                    r.push(s),
                    r.push({
                      tag: 'path',
                      attributes: w(
                        w({}, c),
                        {},
                        {
                          opacity: '1',
                          d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z',
                        },
                      ),
                      children: n ? [] : [{ tag: 'animate', attributes: w(w({}, i), {}, { values: '1;0;0;0;0;1;' }) }],
                    }),
                    n ||
                      r.push({
                        tag: 'path',
                        attributes: w(
                          w({}, c),
                          {},
                          {
                            opacity: '0',
                            d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z',
                          },
                        ),
                        children: [{ tag: 'animate', attributes: w(w({}, i), {}, { values: '0;0;1;1;0;0;' }) }],
                      }),
                    { tag: 'g', attributes: { class: 'missing' }, children: r }
                  );
                });
            },
          },
          {
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var c = r.getAttribute('data-fa-symbol');
                  return (n.symbol = null !== c && ('' === c || c)), n;
                },
              };
            },
          },
        ],
        { mixoutsTo: x1 },
      );
      var Ii2 = x1.parse,
        Ri2 = x1.icon;
      const Fi2 = ['*'],
        Bi2 = (e) => {
          const t = {
            [`fa-${e.animation}`]: null != e.animation && !e.animation.startsWith('spin'),
            'fa-spin': 'spin' === e.animation || 'spin-reverse' === e.animation,
            'fa-spin-pulse': 'spin-pulse' === e.animation || 'spin-pulse-reverse' === e.animation,
            'fa-spin-reverse': 'spin-reverse' === e.animation || 'spin-pulse-reverse' === e.animation,
            'fa-pulse': 'spin-pulse' === e.animation || 'spin-pulse-reverse' === e.animation,
            'fa-fw': e.fixedWidth,
            'fa-border': e.border,
            'fa-inverse': e.inverse,
            'fa-layers-counter': e.counter,
            'fa-flip-horizontal': 'horizontal' === e.flip || 'both' === e.flip,
            'fa-flip-vertical': 'vertical' === e.flip || 'both' === e.flip,
            [`fa-${e.size}`]: null !== e.size,
            [`fa-rotate-${e.rotate}`]: null !== e.rotate,
            [`fa-pull-${e.pull}`]: null !== e.pull,
            [`fa-stack-${e.stackItemSize}`]: null != e.stackItemSize,
          };
          return Object.keys(t)
            .map((n) => (t[n] ? n : null))
            .filter((n) => n);
        };
      let $i2 = (() => {
          class e {
            constructor() {
              (this.defaultPrefix = 'fas'), (this.fallbackIcon = null);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          );
        })(),
        Gi2 = (() => {
          class e {
            constructor() {
              this.definitions = {};
            }
            addIcons(...n) {
              for (const r of n) {
                r.prefix in this.definitions || (this.definitions[r.prefix] = {}),
                  (this.definitions[r.prefix][r.iconName] = r);
                for (const c of r.icon[2]) 'string' == typeof c && (this.definitions[r.prefix][c] = r);
              }
            }
            addIconPacks(...n) {
              for (const r of n) {
                const c = Object.keys(r).map((a) => r[a]);
                this.addIcons(...c);
              }
            }
            getIconDefinition(n, r) {
              return n in this.definitions && r in this.definitions[n] ? this.definitions[n][r] : null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          );
        })(),
        Wi2 = (() => {
          class e {
            constructor() {
              this.stackItemSize = '1x';
            }
            ngOnChanges(n) {
              if ('size' in n)
                throw new Error(
                  'fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.',
                );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = F({
              type: e,
              selectors: [
                ['fa-icon', 'stackItemSize', ''],
                ['fa-duotone-icon', 'stackItemSize', ''],
              ],
              inputs: { stackItemSize: 'stackItemSize', size: 'size' },
              features: [c1],
            })),
            e
          );
        })(),
        qi2 = (() => {
          class e {
            constructor(n, r) {
              (this.renderer = n), (this.elementRef = r);
            }
            ngOnInit() {
              this.renderer.addClass(this.elementRef.nativeElement, 'fa-stack');
            }
            ngOnChanges(n) {
              'size' in n &&
                (null != n.size.currentValue &&
                  this.renderer.addClass(this.elementRef.nativeElement, `fa-${n.size.currentValue}`),
                null != n.size.previousValue &&
                  this.renderer.removeClass(this.elementRef.nativeElement, `fa-${n.size.previousValue}`));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(fe), M(v1));
            }),
            (e.ɵcmp = O1({
              type: e,
              selectors: [['fa-stack']],
              inputs: { size: 'size' },
              features: [c1],
              ngContentSelectors: Fi2,
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n &&
                  ((function e9(e) {
                    const t = H()[X2][Y2];
                    if (!t.projection) {
                      const r = (t.projection = ft(e ? e.length : 1, null)),
                        c = r.slice();
                      let a = t.child;
                      for (; null !== a; ) {
                        const i = e ? _x(a, e) : 0;
                        null !== i && (c[i] ? (c[i].projectionNext = a) : (r[i] = a), (c[i] = a)), (a = a.next);
                      }
                    }
                  })(),
                  (function t9(e, t = 0, n) {
                    const r = H(),
                      c = Z(),
                      a = o4(c, p2 + e, 16, null, n || null);
                    null === a.projection && (a.projection = t),
                      dc(),
                      32 != (32 & a.flags) &&
                        (function Gb(e, t, n) {
                          w7(t[Y], 0, t, n, g7(e, n, t), H7(n.parent || t[Y2], n, t));
                        })(c, r, a);
                  })(0));
              },
              encapsulation: 2,
            })),
            e
          );
        })(),
        Zs = (() => {
          class e {
            constructor(n, r, c, a, i) {
              (this.sanitizer = n),
                (this.config = r),
                (this.iconLibrary = c),
                (this.stackItem = a),
                (this.classes = []),
                null != i &&
                  null == a &&
                  console.error(
                    'FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.',
                  );
            }
            set spin(n) {
              this.animation = n ? 'spin' : void 0;
            }
            set pulse(n) {
              this.animation = n ? 'spin-pulse' : void 0;
            }
            ngOnChanges(n) {
              if (null != this.icon || null != this.config.fallbackIcon) {
                if (n) {
                  const c = this.findIconDefinition(null != this.icon ? this.icon : this.config.fallbackIcon);
                  if (null != c) {
                    const a = this.buildParams();
                    this.renderIcon(c, a);
                  }
                }
              } else
                (() => {
                  throw new Error('Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.');
                })();
            }
            render() {
              this.ngOnChanges({});
            }
            findIconDefinition(n) {
              const r = ((e, t) =>
                ((e) => void 0 !== e.prefix && void 0 !== e.iconName)(e)
                  ? e
                  : 'string' == typeof e
                  ? { prefix: t, iconName: e }
                  : { prefix: e[0], iconName: e[1] })(n, this.config.defaultPrefix);
              return 'icon' in r
                ? r
                : this.iconLibrary.getIconDefinition(r.prefix, r.iconName) ??
                    (((e) => {
                      throw new Error(
                        `Could not find icon with iconName=${e.iconName} and prefix=${e.prefix} in the icon library.`,
                      );
                    })(r),
                    null);
            }
            buildParams() {
              const n = {
                  flip: this.flip,
                  animation: this.animation,
                  border: this.border,
                  inverse: this.inverse,
                  size: this.size || null,
                  pull: this.pull || null,
                  rotate: this.rotate || null,
                  fixedWidth: 'boolean' == typeof this.fixedWidth ? this.fixedWidth : this.config.fixedWidth,
                  stackItemSize: null != this.stackItem ? this.stackItem.stackItemSize : null,
                },
                r = 'string' == typeof this.transform ? Ii2.transform(this.transform) : this.transform;
              return {
                title: this.title,
                transform: r,
                classes: [...Bi2(n), ...this.classes],
                mask: null != this.mask ? this.findIconDefinition(this.mask) : null,
                styles: null != this.styles ? this.styles : {},
                symbol: this.symbol,
                attributes: { role: this.a11yRole },
              };
            }
            renderIcon(n, r) {
              const c = Ri2(n, r);
              this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(c.html.join('\n'));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ad), M($i2), M(Gi2), M(Wi2, 8), M(qi2, 8));
            }),
            (e.ɵcmp = O1({
              type: e,
              selectors: [['fa-icon']],
              hostAttrs: [1, 'ng-fa-icon'],
              hostVars: 2,
              hostBindings: function (n, r) {
                2 & n && (I8('innerHTML', r.renderedIconHTML, P7), W1('title', r.title));
              },
              inputs: {
                icon: 'icon',
                title: 'title',
                animation: 'animation',
                spin: 'spin',
                pulse: 'pulse',
                mask: 'mask',
                styles: 'styles',
                flip: 'flip',
                size: 'size',
                pull: 'pull',
                border: 'border',
                inverse: 'inverse',
                symbol: 'symbol',
                rotate: 'rotate',
                fixedWidth: 'fixedWidth',
                classes: 'classes',
                transform: 'transform',
                a11yRole: 'a11yRole',
              },
              features: [c1],
              decls: 0,
              vars: 0,
              template: function (n, r) {},
              encapsulation: 2,
            })),
            e
          );
        })(),
        Yi2 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = V1({ type: e })),
            (e.ɵinj = u1({})),
            e
          );
        })();
      function Xi2(e, t) {
        if (
          (1 & e &&
            (C4(0),
            N(1, 'tr')(2, 'td'),
            X(3),
            I(),
            N(4, 'td'),
            X(5),
            I(),
            N(6, 'td'),
            X(7),
            I(),
            N(8, 'td'),
            X(9),
            I(),
            N(10, 'td'),
            X(11),
            jn(12, 'date'),
            I()(),
            M4()),
          2 & e)
        ) {
          const n = t.$implicit;
          e2(3),
            J2(n.platform),
            e2(2),
            J2(n.os),
            e2(2),
            J2(n.browser),
            e2(2),
            J2(n.version),
            e2(2),
            J2($n(12, 5, n.createdAt, 'yyyy-MM-dd HH:mm:ss'));
        }
      }
      function Ki2(e, t) {
        if (1 & e) {
          const n = (function Yl() {
            return H();
          })();
          C4(0),
            N(1, 'div', 1)(2, 'div', 2)(3, 'h2'),
            X(4, 'Details:'),
            I()()(),
            N(5, 'div', 3)(6, 'div', 4)(7, 'h3'),
            X(8, 'Original URL'),
            I(),
            N(9, 'a', 5),
            X(10),
            I()(),
            N(11, 'div', 4)(12, 'h3'),
            X(13, 'Short URL'),
            I(),
            N(14, 'a', 5),
            X(15),
            I()(),
            N(16, 'div', 4)(17, 'h3'),
            X(18, 'Total Clicks'),
            I(),
            N(19, 'p'),
            X(20),
            I()(),
            N(21, 'div', 4)(22, 'h3'),
            X(23, 'Created At'),
            I(),
            N(24, 'p'),
            X(25),
            jn(26, 'date'),
            I()()(),
            b2(27, 'br'),
            N(28, 'div', 1)(29, 'div', 2)(30, 'div', 6)(31, 'button', 7),
            s1('click', function () {
              return lc(n), fc(H4().onResetClicks());
            }),
            b2(32, 'fa-icon', 8),
            X(33, ' Reset Clicks '),
            I(),
            N(34, 'button', 9),
            s1('click', function () {
              return lc(n), fc(H4().onDeleteUrl());
            }),
            b2(35, 'fa-icon', 8),
            X(36, ' Delete URL '),
            I()()()(),
            b2(37, 'br'),
            N(38, 'div', 1)(39, 'div', 2)(40, 'h2'),
            X(41, 'Clicks:'),
            I()()(),
            N(42, 'div', 1)(43, 'div', 2)(44, 'div', 10)(45, 'table', 11)(46, 'thead')(47, 'tr')(48, 'th', 12),
            X(49, 'Platform'),
            I(),
            N(50, 'th', 12),
            X(51, 'OS'),
            I(),
            N(52, 'th', 12),
            X(53, 'Browser'),
            I(),
            N(54, 'th', 12),
            X(55, 'Version'),
            I(),
            N(56, 'th', 12),
            X(57, 'Click Date'),
            I()()(),
            N(58, 'tbody'),
            bt(59, Xi2, 13, 8, 'ng-container', 13),
            I()()()()(),
            M4();
        }
        if (2 & e) {
          const n = H4();
          e2(9),
            V4('href', n.url.originalUrl, H3),
            e2(1),
            J2(n.url.originalUrl),
            e2(4),
            V4('href', n.url.shortUrl, H3),
            e2(1),
            J2(n.url.shortUrl),
            e2(5),
            J2(n.url.clicksCounter),
            e2(5),
            J2($n(26, 9, n.url.createdAt, 'yyyy-MM-dd HH:mm:ss')),
            e2(7),
            Z2('icon', n.faRotateLeft),
            e2(3),
            Z2('icon', n.faTrash),
            e2(24),
            Z2('ngForOf', null == n.url ? null : n.url.clicks);
        }
      }
      let Qi2 = (() => {
        class e {
          constructor(n, r, c) {
            (this.urlService = n),
              (this.route = r),
              (this.router = c),
              (this.subscription = new n1()),
              (this.faTrash = lC),
              (this.faRotateLeft = s6);
          }
          ngOnInit() {
            var n = this;
            this.route.params.subscribe(
              (function () {
                var r = (function fF(e) {
                  return function () {
                    var t = this,
                      n = arguments;
                    return new Promise(function (r, c) {
                      var a = e.apply(t, n);
                      function i(o) {
                        Kh(a, r, c, i, s, 'next', o);
                      }
                      function s(o) {
                        Kh(a, r, c, i, s, 'throw', o);
                      }
                      i(void 0);
                    });
                  };
                })(function* (c) {
                  n.urlService.getUrl(c.id);
                });
                return function (c) {
                  return r.apply(this, arguments);
                };
              })(),
            ),
              (this.subscription = this.urlService.selectedUrlChangedEvent.subscribe((r) => {
                null === r ? this.router.navigate(['/dashboard/urls']) : (this.url = r);
              }));
          }
          onResetClicks() {
            this.url && this.urlService.resetUrlClicks(this.url);
          }
          onDeleteUrl() {
            this.url && this.urlService.deleteUrl(this.url);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(zs), M(_3), M(M1));
          }),
          (e.ɵcmp = O1({
            type: e,
            selectors: [['app-url-item']],
            decls: 1,
            vars: 1,
            consts: [
              [4, 'ngIf'],
              [1, 'row'],
              [1, 'col-12'],
              [1, 'row', 'gap-1', 'text-center'],
              [1, 'col'],
              ['target', '_blank', 3, 'href'],
              ['role', 'group', 'aria-label', 'Basic example', 1, 'btn-group'],
              ['type', 'button', 1, 'btn', 'btn-warning', 3, 'click'],
              [3, 'icon'],
              ['type', 'button', 1, 'btn', 'btn-danger', 3, 'click'],
              [1, 'table-responsive'],
              [1, 'table'],
              ['scope', 'col'],
              [4, 'ngFor', 'ngForOf'],
            ],
            template: function (n, r) {
              1 & n && bt(0, Ki2, 60, 12, 'ng-container', 0), 2 & n && Z2('ngIf', r.url);
            },
            dependencies: [Aa, Ea, Zs, Ia],
          })),
          e
        );
      })();
      const Zi2 = function () {
        return ['/dashboard/urls/'];
      };
      function Ji2(e, t) {
        if (
          (1 & e &&
            (C4(0),
            N(1, 'tr')(2, 'td')(3, 'a', 6),
            X(4),
            I()(),
            N(5, 'td')(6, 'a', 6),
            X(7),
            I()(),
            N(8, 'td'),
            X(9),
            I(),
            N(10, 'td'),
            X(11),
            jn(12, 'date'),
            I(),
            N(13, 'td', 7)(14, 'a', 8),
            b2(15, 'fa-icon', 9),
            I()()(),
            M4()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = H4();
          e2(3),
            V4('href', n.originalUrl, H3),
            e2(1),
            J2(n.originalUrl),
            e2(2),
            V4('href', n.shortUrl, H3),
            e2(1),
            J2(n.shortUrl),
            e2(2),
            J2(n.clicksCounter),
            e2(2),
            J2($n(12, 9, n.createdAt, 'yyyy-MM-dd HH:mm:ss')),
            e2(3),
            En('ariaLabel', 'View details for ', n.shortUrl, ''),
            Z2('routerLink', Un(12, Zi2) + n.id),
            e2(1),
            Z2('icon', r.faEye);
        }
      }
      let es2 = (() => {
          class e {
            constructor(n) {
              (this.urlService = n), (this.urls = []), (this.subscription = new n1()), (this.faEye = Gv);
            }
            ngOnInit() {
              this.urlService.getUrls(),
                (this.subscription = this.urlService.urlListChangedEvent.subscribe((n) => {
                  this.urls = n;
                }));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(zs));
            }),
            (e.ɵcmp = O1({
              type: e,
              selectors: [['app-url-list']],
              decls: 18,
              vars: 1,
              consts: [
                [1, 'row'],
                [1, 'col-12'],
                [1, 'table-responsive'],
                [1, 'table'],
                ['scope', 'col'],
                [4, 'ngFor', 'ngForOf'],
                ['target', '_blank', 3, 'href'],
                [1, 'text-center'],
                [1, 'btn', 'btn-sm', 'btn-outline-secondary', 'btn-outline-accent', 3, 'ariaLabel', 'routerLink'],
                [3, 'icon'],
              ],
              template: function (n, r) {
                1 & n &&
                  (N(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'table', 3)(4, 'thead')(5, 'tr')(6, 'th', 4),
                  X(7, 'Original URL'),
                  I(),
                  N(8, 'th', 4),
                  X(9, 'Short URL'),
                  I(),
                  N(10, 'th', 4),
                  X(11, 'Clicks'),
                  I(),
                  N(12, 'th', 4),
                  X(13, 'Created At'),
                  I(),
                  N(14, 'th', 4),
                  X(15, 'Details'),
                  I()()(),
                  N(16, 'tbody'),
                  bt(17, Ji2, 16, 13, 'ng-container', 5),
                  I()()()()()),
                  2 & n && (e2(17), Z2('ngForOf', r.urls));
              },
              dependencies: [a6, Aa, Zs, Ia],
            })),
            e
          );
        })(),
        Iy = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n), (this._elementRef = r), (this.onChange = (c) => {}), (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty('disabled', n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(fe), M(v1));
            }),
            (e.ɵdir = F({ type: e })),
            e
          );
        })(),
        T3 = (() => {
          class e extends Iy {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = $2(e)))(r || e);
              };
            })()),
            (e.ɵdir = F({ type: e, features: [c2] })),
            e
          );
        })();
      const Me = new S('NgValueAccessor'),
        rs2 = { provide: Me, useExisting: f2(() => Lr), multi: !0 },
        as2 = new S('CompositionEventMode');
      let Lr = (() => {
        class e extends Iy {
          constructor(n, r, c) {
            super(n, r),
              (this._compositionMode = c),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function cs2() {
                  const e = Ee() ? Ee().getUserAgent() : '';
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty('value', n ?? '');
          }
          _handleInput(n) {
            (!this._compositionMode || (this._compositionMode && !this._composing)) && this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(fe), M(v1), M(as2, 8));
          }),
          (e.ɵdir = F({
            type: e,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', ''],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                s1('input', function (a) {
                  return r._handleInput(a.target.value);
                })('blur', function () {
                  return r.onTouched();
                })('compositionstart', function () {
                  return r._compositionStart();
                })('compositionend', function (a) {
                  return r._compositionEnd(a.target.value);
                });
            },
            features: [v2([rs2]), c2],
          })),
          e
        );
      })();
      const is2 = !1;
      function a3(e) {
        return null == e || (('string' == typeof e || Array.isArray(e)) && 0 === e.length);
      }
      function Fy(e) {
        return null != e && 'number' == typeof e.length;
      }
      const t1 = new S('NgValidators'),
        i3 = new S('NgAsyncValidators'),
        ss2 =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class os2 {
        static min(t) {
          return (function Py(e) {
            return (t) => {
              if (a3(t.value) || a3(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n < e ? { min: { min: e, actual: t.value } } : null;
            };
          })(t);
        }
        static max(t) {
          return (function Oy(e) {
            return (t) => {
              if (a3(t.value) || a3(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n > e ? { max: { max: e, actual: t.value } } : null;
            };
          })(t);
        }
        static required(t) {
          return By(t);
        }
        static requiredTrue(t) {
          return (function Uy(e) {
            return !0 === e.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function jy(e) {
            return a3(e.value) || ss2.test(e.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function $y(e) {
            return (t) =>
              a3(t.value) || !Fy(t.value)
                ? null
                : t.value.length < e
                ? { minlength: { requiredLength: e, actualLength: t.value.length } }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function Gy(e) {
            return (t) =>
              Fy(t.value) && t.value.length > e
                ? { maxlength: { requiredLength: e, actualLength: t.value.length } }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function Wy(e) {
            if (!e) return wr;
            let t, n;
            return (
              'string' == typeof e
                ? ((n = ''),
                  '^' !== e.charAt(0) && (n += '^'),
                  (n += e),
                  '$' !== e.charAt(e.length - 1) && (n += '$'),
                  (t = new RegExp(n)))
                : ((n = e.toString()), (t = e)),
              (r) => {
                if (a3(r.value)) return null;
                const c = r.value;
                return t.test(c) ? null : { pattern: { requiredPattern: n, actualValue: c } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return Zy(t);
        }
        static composeAsync(t) {
          return Jy(t);
        }
      }
      function By(e) {
        return a3(e.value) ? { required: !0 } : null;
      }
      function wr(e) {
        return null;
      }
      function qy(e) {
        return null != e;
      }
      function Yy(e) {
        const t = Dt(e) ? N2(e) : e;
        if (is2 && !_8(t)) {
          let n = 'Expected async validator to return Promise or Observable.';
          throw (
            ('object' == typeof e &&
              (n += ' Are you using a synchronous validator where an async validator is expected?'),
            new y(-1101, n))
          );
        }
        return t;
      }
      function Xy(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function Ky(e, t) {
        return t.map((n) => n(e));
      }
      function Qy(e) {
        return e.map((t) =>
          (function ls2(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n),
        );
      }
      function Zy(e) {
        if (!e) return null;
        const t = e.filter(qy);
        return 0 == t.length
          ? null
          : function (n) {
              return Xy(Ky(n, t));
            };
      }
      function Js(e) {
        return null != e ? Zy(Qy(e)) : null;
      }
      function Jy(e) {
        if (!e) return null;
        const t = e.filter(qy);
        return 0 == t.length
          ? null
          : function (n) {
              return (function ts2(...e) {
                const t = jo(e),
                  { args: n, keys: r } = kd(e),
                  c = new L2((a) => {
                    const { length: i } = n;
                    if (!i) return void a.complete();
                    const s = new Array(i);
                    let o = i,
                      l = i;
                    for (let f = 0; f < i; f++) {
                      let u = !1;
                      N1(n[f]).subscribe(
                        T2(
                          a,
                          (d) => {
                            u || ((u = !0), l--), (s[f] = d);
                          },
                          () => o--,
                          void 0,
                          () => {
                            (!o || !u) && (l || a.next(r ? Id(r, s) : s), a.complete());
                          },
                        ),
                      );
                    }
                  });
                return t ? c.pipe(Td(t)) : c;
              })(Ky(n, t).map(Yy)).pipe(W(Xy));
            };
      }
      function eo(e) {
        return null != e ? Jy(Qy(e)) : null;
      }
      function ez(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function tz(e) {
        return e._rawValidators;
      }
      function nz(e) {
        return e._rawAsyncValidators;
      }
      function to(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function br(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function rz(e, t) {
        const n = to(t);
        return (
          to(e).forEach((c) => {
            br(n, c) || n.push(c);
          }),
          n
        );
      }
      function cz(e, t) {
        return to(t).filter((n) => !br(e, n));
      }
      class az {
        constructor() {
          (this._rawValidators = []), (this._rawAsyncValidators = []), (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []), (this._composedValidatorFn = Js(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []), (this._composedAsyncValidatorFn = eo(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()), (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class f1 extends az {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class s3 extends az {
        constructor() {
          super(...arguments), (this._parent = null), (this.name = null), (this.valueAccessor = null);
        }
      }
      class iz {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let sz = (() => {
          class e extends iz {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(s3, 2));
            }),
            (e.ɵdir = F({
              type: e,
              selectors: [
                ['', 'formControlName', ''],
                ['', 'ngModel', ''],
                ['', 'formControl', ''],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  Tn('ng-untouched', r.isUntouched)('ng-touched', r.isTouched)('ng-pristine', r.isPristine)(
                    'ng-dirty',
                    r.isDirty,
                  )('ng-valid', r.isValid)('ng-invalid', r.isInvalid)('ng-pending', r.isPending);
              },
              features: [c2],
            })),
            e
          );
        })(),
        oz = (() => {
          class e extends iz {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(f1, 10));
            }),
            (e.ɵdir = F({
              type: e,
              selectors: [
                ['', 'formGroupName', ''],
                ['', 'formArrayName', ''],
                ['', 'ngModelGroup', ''],
                ['', 'formGroup', ''],
                ['form', 3, 'ngNoForm', ''],
                ['', 'ngForm', ''],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  Tn('ng-untouched', r.isUntouched)('ng-touched', r.isTouched)('ng-pristine', r.isPristine)(
                    'ng-dirty',
                    r.isDirty,
                  )('ng-valid', r.isValid)('ng-invalid', r.isInvalid)('ng-pending', r.isPending)(
                    'ng-submitted',
                    r.isSubmitted,
                  );
              },
              features: [c2],
            })),
            e
          );
        })();
      function lz(e, t) {
        return e ? `with name: '${t}'` : `at index: ${t}`;
      }
      const co = !1,
        D6 = 'VALID',
        Sr = 'INVALID',
        G4 = 'PENDING',
        S6 = 'DISABLED';
      function ao(e) {
        return (xr(e) ? e.validators : e) || null;
      }
      function io(e, t) {
        return (xr(t) ? t.asyncValidators : e) || null;
      }
      function xr(e) {
        return null != e && !Array.isArray(e) && 'object' == typeof e;
      }
      function fz(e, t, n) {
        const r = e.controls;
        if (!(t ? Object.keys(r) : r).length)
          throw new y(
            1e3,
            co
              ? (function hs2(e) {
                  return `\n    There are no form controls registered with this ${
                    e ? 'group' : 'array'
                  } yet. If you're using ngModel,\n    you may want to check next tick (e.g. use setTimeout).\n  `;
                })(t)
              : '',
          );
        if (!r[n])
          throw new y(
            1001,
            co
              ? (function ps2(e, t) {
                  return `Cannot find form control ${lz(e, t)}`;
                })(t, n)
              : '',
          );
      }
      function uz(e, t, n) {
        e._forEachChild((r, c) => {
          if (void 0 === n[c])
            throw new y(
              1002,
              co
                ? (function ms2(e, t) {
                    return `Must supply a value for form control ${lz(e, t)}`;
                  })(t, c)
                : '',
            );
        });
      }
      class _r {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === D6;
        }
        get invalid() {
          return this.status === Sr;
        }
        get pending() {
          return this.status == G4;
        }
        get disabled() {
          return this.status === S6;
        }
        get enabled() {
          return this.status !== S6;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(rz(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(rz(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(cz(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(cz(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return br(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return br(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0), this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }), this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1), this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = G4),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = S6),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = D6),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === D6 || this.status === G4) && this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
            this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? S6 : D6;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = G4), (this._hasOwnPendingAsyncValidator = !0);
            const n = Yy(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1), this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(), (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n || (Array.isArray(n) || (n = n.split('.')), 0 === n.length)
            ? null
            : n.reduce((r, c) => r && r._find(c), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new y2()), (this.statusChanges = new y2());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? S6
            : this.errors
            ? Sr
            : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(G4)
            ? G4
            : this._anyControlsHaveStatus(Sr)
            ? Sr
            : D6;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()), this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()), this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          xr(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty();
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function gs2(e) {
              return Array.isArray(e) ? Js(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function vs2(e) {
              return Array.isArray(e) ? eo(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class x6 extends _r {
        constructor(t, n, r) {
          super(ao(n), io(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n), n.setParent(this), n._registerOnCollectionChange(this._onCollectionChange), n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          uz(this, !0, t),
            Object.keys(t).forEach((r) => {
              fz(this, !0, r), this.controls[r].setValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const c = this.controls[r];
              c && c.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, c) => {
            r.reset(t[c], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren({}, (t, n, r) => ((t[r] = n.getRawValue()), t));
        }
        _syncPendingControls() {
          let t = this._reduceChildren(!1, (n, r) => !!r._syncPendingControls() || n);
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls)) if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren({}, (n, r, c) => ((r.enabled || this.disabled) && (n[c] = r.value), n));
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((c, a) => {
              r = n(r, c, a);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls)) if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      class dz extends x6 {}
      const I3 = new S('CallSetDisabledState', { providedIn: 'root', factory: () => _6 }),
        _6 = 'always';
      function N6(e, t, n = _6) {
        so(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || 'always' === n) && t.valueAccessor.setDisabledState?.(e.disabled),
          (function Ms2(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                'change' === e.updateOn && hz(e, t);
            });
          })(e, t),
          (function Vs2(e, t) {
            const n = (r, c) => {
              t.valueAccessor.writeValue(r), c && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function Hs2(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                'blur' === e.updateOn && e._pendingChange && hz(e, t),
                'submit' !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function Cs2(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function Ar(e, t, n = !0) {
        const r = () => {};
        t.valueAccessor && (t.valueAccessor.registerOnChange(r), t.valueAccessor.registerOnTouched(r)),
          kr(e, t),
          e && (t._invokeOnDestroyCallbacks(), e._registerOnCollectionChange(() => {}));
      }
      function Er(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function so(e, t) {
        const n = tz(e);
        null !== t.validator ? e.setValidators(ez(n, t.validator)) : 'function' == typeof n && e.setValidators([n]);
        const r = nz(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(ez(r, t.asyncValidator))
          : 'function' == typeof r && e.setAsyncValidators([r]);
        const c = () => e.updateValueAndValidity();
        Er(t._rawValidators, c), Er(t._rawAsyncValidators, c);
      }
      function kr(e, t) {
        let n = !1;
        if (null !== e) {
          if (null !== t.validator) {
            const c = tz(e);
            if (Array.isArray(c) && c.length > 0) {
              const a = c.filter((i) => i !== t.validator);
              a.length !== c.length && ((n = !0), e.setValidators(a));
            }
          }
          if (null !== t.asyncValidator) {
            const c = nz(e);
            if (Array.isArray(c) && c.length > 0) {
              const a = c.filter((i) => i !== t.asyncValidator);
              a.length !== c.length && ((n = !0), e.setAsyncValidators(a));
            }
          }
        }
        const r = () => {};
        return Er(t._rawValidators, r), Er(t._rawAsyncValidators, r), n;
      }
      function hz(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function gz(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function vz(e) {
        return 'object' == typeof e && null !== e && 2 === Object.keys(e).length && 'value' in e && 'disabled' in e;
      }
      const W4 = class extends _r {
        constructor(t = null, n, r) {
          super(ao(n), io(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator }),
            xr(n) && (n.nonNullable || n.initialValueIsDefault) && (this.defaultValue = vz(t) ? t.value : t);
        }
        setValue(t, n = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach((r) => r(this.value, !1 !== n.emitViewToModelChange)),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          this.setValue(t, n);
        }
        reset(t = this.defaultValue, n = {}) {
          this._applyFormState(t),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          gz(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          gz(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            'submit' !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, { onlySelf: !0, emitModelToViewChange: !1 }), 0)
          );
        }
        _applyFormState(t) {
          vz(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled ? this.disable({ onlySelf: !0, emitEvent: !1 }) : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      };
      let yz = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = F({
              type: e,
              selectors: [['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', '']],
              hostAttrs: ['novalidate', ''],
            })),
            e
          );
        })(),
        Lz = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = V1({ type: e })),
            (e.ɵinj = u1({})),
            e
          );
        })();
      const ho = new S('NgModelWithFormControlWarning'),
        Ts2 = { provide: f1, useExisting: f2(() => Tr) };
      let Tr = (() => {
        class e extends f1 {
          constructor(n, r, c) {
            super(),
              (this.callSetDisabledState = c),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new y2()),
              this._setValidators(n),
              this._setAsyncValidators(r);
          }
          ngOnChanges(n) {
            this._checkFormPresent(),
              n.hasOwnProperty('form') &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (kr(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(n) {
            const r = this.form.get(n.path);
            return (
              N6(r, n, this.callSetDisabledState),
              r.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(n),
              r
            );
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            Ar(n.control || null, n, !1),
              (function ws2(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1);
              })(this.directives, n);
          }
          addFormGroup(n) {
            this._setUpFormContainer(n);
          }
          removeFormGroup(n) {
            this._cleanUpFormContainer(n);
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          addFormArray(n) {
            this._setUpFormContainer(n);
          }
          removeFormArray(n) {
            this._cleanUpFormContainer(n);
          }
          getFormArray(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            this.form.get(n.path).setValue(r);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function mz(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    'submit' === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue), (r._pendingChange = !1));
                  });
              })(this.form, this.directives),
              this.ngSubmit.emit(n),
              'dialog' === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n) {
            this.form.reset(n), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((n) => {
              const r = n.control,
                c = this.form.get(n.path);
              r !== c &&
                (Ar(r || null, n),
                ((e) => e instanceof W4)(c) && (N6(c, n, this.callSetDisabledState), (n.control = c)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(n) {
            const r = this.form.get(n.path);
            (function pz(e, t) {
              so(e, t);
            })(r, n),
              r.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(n) {
            if (this.form) {
              const r = this.form.get(n.path);
              r &&
                (function ys2(e, t) {
                  return kr(e, t);
                })(r, n) &&
                r.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            so(this.form, this), this._oldForm && kr(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(t1, 10), M(i3, 10), M(I3, 8));
          }),
          (e.ɵdir = F({
            type: e,
            selectors: [['', 'formGroup', '']],
            hostBindings: function (n, r) {
              1 & n &&
                s1('submit', function (a) {
                  return r.onSubmit(a);
                })('reset', function () {
                  return r.onReset();
                });
            },
            inputs: { form: ['formGroup', 'form'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [v2([Ts2]), c2, c1],
          })),
          e
        );
      })();
      const Fs2 = { provide: s3, useExisting: f2(() => go) };
      let go = (() => {
          class e extends s3 {
            set isDisabled(n) {}
            constructor(n, r, c, a, i) {
              super(),
                (this._ngModelWarningConfig = i),
                (this._added = !1),
                (this.update = new y2()),
                (this._ngModelWarningSent = !1),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(c),
                (this.valueAccessor = (function fo(e, t) {
                  if (!t) return null;
                  let n, r, c;
                  return (
                    Array.isArray(t),
                    t.forEach((a) => {
                      a.constructor === Lr
                        ? (n = a)
                        : (function Ls2(e) {
                            return Object.getPrototypeOf(e.constructor) === T3;
                          })(a)
                        ? (r = a)
                        : (c = a);
                    }),
                    c || r || n || null
                  );
                })(0, a));
            }
            ngOnChanges(n) {
              this._added || this._setUpControl(),
                (function lo(e, t) {
                  if (!e.hasOwnProperty('model')) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  ((this.viewModel = this.model), this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            get path() {
              return (function Nr(e, t) {
                return [...t.path, e];
              })(null == this.name ? this.name : this.name.toString(), this._parent);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
              this._checkParentType(), (this.control = this.formDirective.addControl(this)), (this._added = !0);
            }
          }
          return (
            (e._ngModelWarningSentOnce = !1),
            (e.ɵfac = function (n) {
              return new (n || e)(M(f1, 13), M(t1, 10), M(i3, 10), M(Me, 10), M(ho, 8));
            }),
            (e.ɵdir = F({
              type: e,
              selectors: [['', 'formControlName', '']],
              inputs: {
                name: ['formControlName', 'name'],
                isDisabled: ['disabled', 'isDisabled'],
                model: ['ngModel', 'model'],
              },
              outputs: { update: 'ngModelChange' },
              features: [v2([Fs2]), c2, c1],
            })),
            e
          );
        })(),
        R3 = (() => {
          class e {
            constructor() {
              this._validator = wr;
            }
            ngOnChanges(n) {
              if (this.inputName in n) {
                const r = this.normalizeInput(n[this.inputName].currentValue);
                (this._enabled = this.enabled(r)),
                  (this._validator = this._enabled ? this.createValidator(r) : wr),
                  this._onChange && this._onChange();
              }
            }
            validate(n) {
              return this._validator(n);
            }
            registerOnValidatorChange(n) {
              this._onChange = n;
            }
            enabled(n) {
              return null != n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = F({ type: e, features: [c1] })),
            e
          );
        })();
      const qs2 = { provide: t1, useExisting: f2(() => Ir), multi: !0 };
      let Ir = (() => {
          class e extends R3 {
            constructor() {
              super(...arguments),
                (this.inputName = 'required'),
                (this.normalizeInput = S4),
                (this.createValidator = (n) => By);
            }
            enabled(n) {
              return n;
            }
          }
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = $2(e)))(r || e);
              };
            })()),
            (e.ɵdir = F({
              type: e,
              selectors: [
                ['', 'required', '', 'formControlName', '', 3, 'type', 'checkbox'],
                ['', 'required', '', 'formControl', '', 3, 'type', 'checkbox'],
                ['', 'required', '', 'ngModel', '', 3, 'type', 'checkbox'],
              ],
              hostVars: 1,
              hostBindings: function (n, r) {
                2 & n && W1('required', r._enabled ? '' : null);
              },
              inputs: { required: 'required' },
              features: [v2([qs2]), c2],
            })),
            e
          );
        })(),
        Oz = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = V1({ type: e })),
            (e.ɵinj = u1({ imports: [Lz] })),
            e
          );
        })();
      class Bz extends _r {
        constructor(t, n, r) {
          super(ao(n), io(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
        }
        at(t) {
          return this.controls[this._adjustIndex(t)];
        }
        push(t, n = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, n, r = {}) {
          this.controls.splice(t, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(t, n = {}) {
          let r = this._adjustIndex(t);
          r < 0 && (r = 0),
            this.controls[r] && this.controls[r]._registerOnCollectionChange(() => {}),
            this.controls.splice(r, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(t, n, r = {}) {
          let c = this._adjustIndex(t);
          c < 0 && (c = 0),
            this.controls[c] && this.controls[c]._registerOnCollectionChange(() => {}),
            this.controls.splice(c, 1),
            n && (this.controls.splice(c, 0, n), this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, n = {}) {
          uz(this, !1, t),
            t.forEach((r, c) => {
              fz(this, !1, c), this.at(c).setValue(r, { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (t.forEach((r, c) => {
              this.at(c) && this.at(c).patchValue(r, { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = [], n = {}) {
          this._forEachChild((r, c) => {
            r.reset(t[c], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map((t) => t.getRawValue());
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _adjustIndex(t) {
          return t < 0 ? t + this.length : t;
        }
        _syncPendingControls() {
          let t = this.controls.reduce((n, r) => !!r._syncPendingControls() || n, !1);
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          this.controls.forEach((n, r) => {
            t(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls.filter((t) => t.enabled || this.disabled).map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((n) => n.enabled && t(n));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(t) {
          return this.at(t) ?? null;
        }
      }
      function Uz(e) {
        return !!e && (void 0 !== e.asyncValidators || void 0 !== e.validators || void 0 !== e.updateOn);
      }
      let Js2 = (() => {
          class e {
            constructor() {
              this.useNonNullable = !1;
            }
            get nonNullable() {
              const n = new e();
              return (n.useNonNullable = !0), n;
            }
            group(n, r = null) {
              const c = this._reduceControls(n);
              let a = {};
              return (
                Uz(r) ? (a = r) : null !== r && ((a.validators = r.validator), (a.asyncValidators = r.asyncValidator)),
                new x6(c, a)
              );
            }
            record(n, r = null) {
              const c = this._reduceControls(n);
              return new dz(c, r);
            }
            control(n, r, c) {
              let a = {};
              return this.useNonNullable
                ? (Uz(r) ? (a = r) : ((a.validators = r), (a.asyncValidators = c)),
                  new W4(n, { ...a, nonNullable: !0 }))
                : new W4(n, r, c);
            }
            array(n, r, c) {
              const a = n.map((i) => this._createControl(i));
              return new Bz(a, r, c);
            }
            _reduceControls(n) {
              const r = {};
              return (
                Object.keys(n).forEach((c) => {
                  r[c] = this._createControl(n[c]);
                }),
                r
              );
            }
            _createControl(n) {
              return n instanceof W4 || n instanceof _r
                ? n
                : Array.isArray(n)
                ? this.control(n[0], n.length > 1 ? n[1] : null, n.length > 2 ? n[2] : null)
                : this.control(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = _({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          );
        })(),
        eo2 = (() => {
          class e {
            static withConfig(n) {
              return { ngModule: e, providers: [{ provide: I3, useValue: n.callSetDisabledState ?? _6 }] };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = V1({ type: e })),
            (e.ɵinj = u1({ imports: [Oz] })),
            e
          );
        })(),
        to2 = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: ho, useValue: n.warnOnNgModelWithFormControl ?? 'always' },
                  { provide: I3, useValue: n.callSetDisabledState ?? _6 },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = V1({ type: e })),
            (e.ɵinj = u1({ imports: [Oz] })),
            e
          );
        })();
      function no2(e, t) {
        if ((1 & e && (N(0, 'div', 5), X(1, ' Shortened URL: '), N(2, 'a', 6), X(3), I()()), 2 & e)) {
          const n = H4();
          e2(2), Z2('href', n.shortenedUrl, H3), e2(1), J2(n.shortenedUrl);
        }
      }
      const ro2 = function (e) {
        return { 'is-invalid': e };
      };
      let co2 = (() => {
        class e {
          constructor(n, r) {
            (this.urlService = n), (this.formBuilder = r), (this.subscription = new n1());
          }
          ngOnInit() {
            (this.subscription = this.urlService.lastUrlChangedEvent.subscribe((n) => {
              this.shortenedUrl = n.shortUrl;
            })),
              (this.myForm = this.formBuilder.group({ longUrl: new W4('', [os2.required, this.validateLink]) }));
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          isFieldInvalid(n) {
            const r = this.myForm.get(n);
            return Boolean(r?.invalid && (r?.dirty || r?.touched));
          }
          getValidationMessage(n) {
            const r = this.myForm.get(n);
            return r?.hasError('required')
              ? 'This field is required'
              : r?.hasError('invalidLink')
              ? 'Invalid link format'
              : '';
          }
          validateLink(n) {
            return n.value && !/^(http|https):\/\/[^ "]+$/.test(n.value) ? { invalidLink: !0 } : null;
          }
          submitForm() {
            this.myForm.valid ? this.urlService.shortenUrl(this.myForm.value.longUrl) : this.myForm.markAllAsTouched();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(zs), M(Js2));
          }),
          (e.ɵcmp = O1({
            type: e,
            selectors: [['app-url-create']],
            decls: 7,
            vars: 5,
            consts: [
              [3, 'formGroup', 'ngSubmit'],
              [1, 'input-group', 'input-group-lg', 'mb-3'],
              [
                'type',
                'link',
                'placeholder',
                'Enter link here',
                'aria-label',
                'Enter link here',
                'aria-describedby',
                'button-shorten-url',
                'id',
                'longUrl',
                'formControlName',
                'longUrl',
                'name',
                'longUrl',
                'required',
                '',
                1,
                'form-control',
                3,
                'ngClass',
              ],
              ['type', 'submit', 'id', 'button-shorten-url', 1, 'btn', 'btn-outline-secondary', 'btn-outline-accent'],
              ['class', 'alert alert-success', 4, 'ngIf'],
              [1, 'alert', 'alert-success'],
              ['target', '_blank', 3, 'href'],
            ],
            template: function (n, r) {
              1 & n &&
                (N(0, 'form', 0),
                s1('ngSubmit', function () {
                  return r.submitForm();
                }),
                N(1, 'div', 1),
                b2(2, 'input', 2),
                N(3, 'button', 3),
                X(4, ' Shorten URL '),
                I()()(),
                b2(5, 'br'),
                bt(6, no2, 4, 2, 'div', 4)),
                2 & n &&
                  (Z2('formGroup', r.myForm),
                  e2(2),
                  Z2('ngClass', Df(3, ro2, r.isFieldInvalid('longUrl'))),
                  e2(4),
                  Z2('ngIf', r.shortenedUrl));
            },
            dependencies: [Zu, Ea, yz, Lr, sz, oz, Ir, Tr, go],
            styles: [
              '.alert-success[_ngcontent-%COMP%]{--bs-alert-color: var(--color-black);--bs-alert-bg: var(--color-accent);--bs-alert-border-color: var(--color-accent)}.alert-success[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--color-secondary)}',
            ],
          })),
          e
        );
      })();
      const ao2 = [
        {
          path: '',
          component: (() => {
            class e {}
            return (
              (e.ɵfac = function (n) {
                return new (n || e)();
              }),
              (e.ɵcmp = O1({
                type: e,
                selectors: [['app-home']],
                decls: 9,
                vars: 0,
                consts: [
                  [1, 'row'],
                  [1, 'col-12'],
                  [1, 'mt-5', 'text-center'],
                ],
                template: function (n, r) {
                  1 & n &&
                    (N(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'h1'),
                    X(4, 'Free URL Shortener'),
                    I(),
                    N(5, 'p'),
                    X(6, 'Create short links in seconds'),
                    I()()()(),
                    b2(7, 'br')(8, 'app-url-create'));
                },
                dependencies: [co2],
              })),
              e
            );
          })(),
        },
        {
          path: 'dashboard',
          component: lF,
          children: [
            { path: 'urls', component: es2 },
            { path: 'urls/:id', component: Qi2 },
          ],
        },
      ];
      let io2 = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = V1({ type: e })),
          (e.ɵinj = u1({ imports: [Yh.forRoot(ao2), Yh] })),
          e
        );
      })();
      const so2 = function () {
          return ['/'];
        },
        oo2 = function () {
          return ['/dashboard/urls'];
        };
      let lo2 = (() => {
          class e {
            constructor() {
              (this.menuOpen = !1), (this.faUpRightFromSquare = Gi);
            }
            toggleMenu() {
              this.menuOpen = !this.menuOpen;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = O1({
              type: e,
              selectors: [['app-header']],
              decls: 29,
              vars: 5,
              consts: [
                ['role', 'banner', 1, 'bg-accent', 'sticky-top'],
                [1, 'container'],
                ['aria-label', 'Navigation Bar', 1, 'navbar', 'navbar-expand-lg'],
                [1, 'container-fluid'],
                [1, 'navbar-brand', 'logo-container', 3, 'routerLink'],
                ['viewBox', '0 0 422.23546478842604 70.28487085160116'],
                ['id', 'SvgjsDefs5535'],
                [
                  'id',
                  'SvgjsG5536',
                  'featurekey',
                  'hKLqjk-0',
                  'transform',
                  'matrix(0.878628975808623,0,0,0.878628975808623,112.69962909904471,52.37841264303326)',
                  'fill',
                  '#232931',
                ],
                [
                  'd',
                  'M3.42 7.300000000000001 l0 4.42 l3.5 0 c1.86 0 3 -0.56 3 -2.32 c0 -1.34 -0.82 -2.1 -2.98 -2.1 l-3.52 0 z M1.48 20 l0 -14.36 l6.32 0 c2.68 0 4.06 1.66 4.06 3.62 c0 0.94 -0.34 2.26 -1.92 3 c0.94 0.38 2.6 1.04 2.6 3.5 c0 2.3 -1.7 4.24 -4.88 4.24 l-6.18 0 z M3.42 13.3 l0 5.04 l4.14 0 c2.02 0 3.04 -1.02 3.04 -2.62 c0 -2.02 -1.78 -2.42 -3.36 -2.42 l-3.82 0 z M25.978 14.219999999999999 l0 5.78 l-1.94 0 l0 -5.78 l-5.42 -8.58 l2.26 0 l4.12 6.9 l4.12 -6.9 l2.28 0 z M59.454 11.84 c0 -0.98 -0.76 -1.84 -1.64 -1.84 c-1.78 0 -3.02 2.24 -3.02 3.9 c0 1.14 0.68 1.94 1.68 1.94 c1.7 0 2.98 -2.4 2.98 -4 z M60.074 10.12 l0.4 -1.24 l1.36 0 c-0.76 2.8 -1.8 5.98 -1.8 6.52 c0 0.38 0.1 0.58 0.42 0.58 c1.36 0 2.84 -2.18 2.84 -4.32 c0 -3.2 -2.56 -5.16 -5.58 -5.16 c-3.56 0 -6.08 2.86 -6.08 6.4 s2.72 6.24 6.22 6.24 c1.86 0 3.72 -0.88 4.86 -2.28 l1.34 0 c-1.3 2.18 -3.68 3.52 -6.24 3.52 c-4.28 0 -7.64 -3.34 -7.64 -7.6 c0 -4.18 3.42 -7.52 7.54 -7.52 c3.7 0 6.88 2.6 6.88 6.24 c0 3.62 -3 5.78 -4.78 5.78 c-0.68 0 -1.24 -0.4 -1.28 -1.26 l-0.04 0.02 c-0.58 0.62 -1.46 1.24 -2.4 1.24 c-1.72 0 -2.94 -1.46 -2.94 -3.2 c0 -2.7 1.84 -5.52 4.62 -5.52 c0.96 0 1.78 0.44 2.3 1.56 z M81.95200000000001 8.1 l-3.32 11.9 l-2.04 0 l-3.74 -14.36 l2.1 0 l2.68 11.68 l0.04 0 l3.22 -11.68 l2.12 0 l3.22 11.68 l0.04 0 l2.68 -11.68 l2.14 0 l-3.78 14.36 l-2.04 0 l-3.28 -11.9 l-0.04 0 z M111.63000000000001 20 l-1.88 0 l0 -8.48 c0 -0.42 0.04 -2.24 0.04 -3.58 l-0.04 0 l-4.04 12.06 l-1.92 0 l-4.04 -12.04 l-0.04 0 c0 1.32 0.04 3.14 0.04 3.56 l0 8.48 l-1.88 0 l0 -14.36 l2.78 0 l4.1 12.14 l0.04 0 l4.08 -12.14 l2.76 0 l0 14.36 z M130.388 18.28 l0 1.72 l-10.6 0 l0 -14.36 l10.46 0 l0 1.72 l-8.52 0 l0 4.4 l7.86 0 l0 1.72 l-7.86 0 l0 4.8 l8.66 0 z M148.166 18.28 l0 1.72 l-11.3 0 l0 -1.62 l8.8 -11.02 l-8.14 0 l0 -1.72 l10.64 0 l0 1.68 l-8.84 10.96 l8.84 0 z M163.164 15.82 l-5.76 0 l-1.5 4.18 l-2 0 l5.4 -14.36 l2.2 0 l5.2 14.36 l-2.12 0 z M158.004 14.1 l4.46 0 l-2.12 -6.32 l-0.04 0 z M173.582 20 l0 -14.36 l5.82 0 c3.74 0 6.04 2.84 6.04 6.98 c0 3.22 -1.4 7.38 -6.12 7.38 l-5.74 0 z M175.522 7.300000000000001 l0 11.04 l3.76 0 c2.52 0 4.16 -1.98 4.16 -5.6 s-1.66 -5.44 -4.3 -5.44 l-3.62 0 z M203.71999999999997 18.28 l0 1.72 l-10.6 0 l0 -14.36 l10.46 0 l0 1.72 l-8.52 0 l0 4.4 l7.86 0 l0 1.72 l-7.86 0 l0 4.8 l8.66 0 z M216.43799999999996 17.88 l4.06 -12.24 l2.18 0 l-5.24 14.36 l-2.06 0 l-5.24 -14.36 l2.16 0 l4.1 12.24 l0.04 0 z',
                ],
                [
                  'id',
                  'SvgjsG5537',
                  'featurekey',
                  'nameLeftFeature-0',
                  'transform',
                  'matrix(1.968129293119336,0,0,1.968129293119336,-0.5510761457647834,-2.3439179587562347)',
                  'fill',
                  '#232931',
                ],
                [
                  'd',
                  'M1.72 14.84 l0 -5.74 l-1.44 0 l0 -2.32 l6.24 0 l0 2.32 l-1.44 0 l0 5.74 c0 1.28 0.4 2.6 2.54 2.6 s2.64 -1.32 2.64 -2.78 l0 -5.56 l-1.44 0 l0 -2.32 l6.12 0 l0 2.32 l-1.44 0 l0 5.56 c0 3.4 -1.68 5.62 -5.86 5.62 c-4.06 0 -5.92 -2.1 -5.92 -5.44 z M16 20 l0 -2.32 l1.44 0 l0 -8.58 l-1.44 0 l0 -2.32 l6.62 0 c3.66 0 4.96 1.64 4.96 3.76 c0 1.98 -1.12 3.04 -2.34 3.62 c0.52 0.28 0.9 0.8 1.24 1.74 c0.28 0.78 0.4 1.5 1.7 1.5 l0.16 0 l-0.58 2.72 c-0.28 0.04 -0.54 0.06 -0.78 0.06 c-2.52 0 -3.16 -1.82 -3.66 -3.16 c-0.58 -1.82 -0.78 -1.98 -1.9 -1.98 l-0.62 0 l0 2.64 l1.44 0 l0 2.32 l-6.24 0 z M20.8 12.52 l1.74 0 c1.22 0 1.68 -0.76 1.68 -1.54 c0 -1.22 -0.56 -1.68 -1.68 -1.68 l-1.74 0 l0 3.22 z M29.48 20 l0 -2.32 l1.48 0 l0 -8.58 l-1.44 0 l0 -2.32 l6.24 0 l0 2.32 l-1.44 0 l0 8.38 l3.46 0 l0 -2.04 l2.52 0 l0 4.56 l-10.82 0 z',
                ],
                [
                  'id',
                  'SvgjsG5538',
                  'featurekey',
                  'inlineSymbolFeature-0',
                  'transform',
                  'matrix(0.7441346178073455,0,0,0.7441346178073455,95.27932691096328,-13.293964776809329)',
                  'fill',
                  '#232931',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'd',
                  'M5,82.135V46.112h90v36.023H5 M49.104,49.695h-6.48v16.583h-1.792V49.695h-6.48v8.272h-1.83v-8.272h-6.48v16.583H24.25  V49.695h-6.48v8.272h-1.792v-8.272h-6.48v28.819h81.004V49.695h-6.48v8.272h-1.792v-8.272H75.75v16.583h-1.792V49.695h-6.48v8.272  h-1.791v-8.272h-6.519v16.583h-1.792V49.695h-6.48v8.272h-1.792V49.695',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'points',
                  '5,17.865 7.249,17.865 7.249,35.858 5,35.858 5,17.865 ',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'points',
                  '95,17.865 92.751,17.865 92.751,35.858 95,35.858 95,17.865 ',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'points',
                  '82.649,28.005 82.649,35.858 91.646,26.862 82.649,17.865 82.649,25.756 17.351,25.756 17.351,17.865   8.354,26.862 17.351,35.858 17.351,28.005 82.649,28.005 ',
                ],
                [
                  'id',
                  'SvgjsG5539',
                  'featurekey',
                  'nameRightFeature-0',
                  'transform',
                  'matrix(1.9281379085090775,0,0,1.9281379085090775,177.6318811828601,-1.5328954859012036)',
                  'fill',
                  '#232931',
                ],
                [
                  'd',
                  'M4.34 16.34 l3.3 -0.68 c0.02 1.4 1.1 1.84 2.2 1.84 c1.04 0 1.64 -0.38 1.64 -1 c0 -2.1 -6.78 -1.14 -6.78 -5.94 c0 -2.64 2.04 -4.06 5.1 -4.06 c3 0 4.92 1.4 4.92 3.42 l0 0.16 l-3.3 0.68 c-0.02 -0.54 -0.14 -1.48 -1.7 -1.48 c-1.08 0 -1.62 0.44 -1.62 1.04 c0 2.18 6.78 1.04 6.78 5.82 c0 2.4 -1.7 4.14 -5.08 4.14 c-3.5 0 -5.46 -1.84 -5.46 -3.76 l0 -0.18 z  M16.28 20 l0 -2.32 l1.44 0 l0 -8.58 l-1.44 0 l0 -2.32 l6.24 0 l0 2.32 l-1.44 0 l0 2.98 l5.4 0 l0 -2.98 l-1.44 0 l0 -2.32 l6.24 0 l0 2.32 l-1.44 0 l0 8.58 l1.44 0 l0 2.32 l-6.24 0 l0 -2.32 l1.44 0 l0 -3.08 l-5.4 0 l0 3.08 l1.44 0 l0 2.32 l-6.24 0 z M39.2 20.28 c-4.3 0 -6.52 -2.92 -6.52 -6.92 c0 -4.1 2.32 -6.86 6.64 -6.86 c4.08 0 6.54 2.46 6.54 6.7 c0 4.1 -2.32 7.08 -6.66 7.08 z M39.260000000000005 17.5 c1.88 0 3.06 -1.24 3.06 -4.16 c0 -2.88 -1.14 -4.06 -3.02 -4.06 c-1.94 0 -3.08 1.26 -3.08 4.1 c0 2.88 1.16 4.12 3.04 4.12 z M47.260000000000005 20 l0 -2.32 l1.44 0 l0 -8.58 l-1.44 0 l0 -2.32 l6.62 0 c3.66 0 4.96 1.64 4.96 3.76 c0 1.98 -1.12 3.04 -2.34 3.62 c0.52 0.28 0.9 0.8 1.24 1.74 c0.28 0.78 0.4 1.5 1.7 1.5 l0.16 0 l-0.58 2.72 c-0.28 0.04 -0.54 0.06 -0.78 0.06 c-2.52 0 -3.16 -1.82 -3.66 -3.16 c-0.58 -1.82 -0.78 -1.98 -1.9 -1.98 l-0.62 0 l0 2.64 l1.44 0 l0 2.32 l-6.24 0 z M52.06 12.52 l1.74 0 c1.22 0 1.68 -0.76 1.68 -1.54 c0 -1.22 -0.56 -1.68 -1.68 -1.68 l-1.74 0 l0 3.22 z M63.400000000000006 20 l0 -2.32 l1.44 0 l0 -8.38 l-2.02 0 l0 2.04 l-2.52 0 l0 -4.56 l12.44 0 l0 4.56 l-2.52 0 l0 -2.04 l-2.02 0 l0 8.38 l1.44 0 l0 2.32 l-6.24 0 z M73.82000000000001 20 l0 -2.32 l1.48 0 l0 -8.58 l-1.48 0 l0 -2.32 l10.56 0 l0 4.26 l-2.52 0 l0 -1.74 l-3.22 0 l0 2.78 l3.78 0 l0 2.52 l-3.78 0 l0 2.88 l3.34 0 l0 -1.94 l2.52 0 l0 4.46 l-10.68 0 z M86.12 20 l0 -2.32 l1.44 0 l0 -8.58 l-1.44 0 l0 -2.32 l4.7 0 l5.44 8.04 l0 -5.72 l-1.44 0 l0 -2.32 l6.08 0 l0 2.32 l-1.44 0 l0 10.9 l-3.28 0 l-5.42 -7.92 l0 5.6 l1.44 0 l0 2.32 l-6.08 0 z M102.22000000000001 20 l0 -2.32 l1.48 0 l0 -8.58 l-1.48 0 l0 -2.32 l10.56 0 l0 4.26 l-2.52 0 l0 -1.74 l-3.22 0 l0 2.78 l3.78 0 l0 2.52 l-3.78 0 l0 2.88 l3.34 0 l0 -1.94 l2.52 0 l0 4.46 l-10.68 0 z M114.52000000000001 20 l0 -2.32 l1.44 0 l0 -8.58 l-1.44 0 l0 -2.32 l6.62 0 c3.66 0 4.96 1.64 4.96 3.76 c0 1.98 -1.12 3.04 -2.34 3.62 c0.52 0.28 0.9 0.8 1.24 1.74 c0.28 0.78 0.4 1.5 1.7 1.5 l0.16 0 l-0.58 2.72 c-0.28 0.04 -0.54 0.06 -0.78 0.06 c-2.52 0 -3.16 -1.82 -3.66 -3.16 c-0.58 -1.82 -0.78 -1.98 -1.9 -1.98 l-0.62 0 l0 2.64 l1.44 0 l0 2.32 l-6.24 0 z M119.32000000000001 12.52 l1.74 0 c1.22 0 1.68 -0.76 1.68 -1.54 c0 -1.22 -0.56 -1.68 -1.68 -1.68 l-1.74 0 l0 3.22 z',
                ],
                [
                  'type',
                  'button',
                  'data-bs-toggle',
                  'collapse',
                  'data-bs-target',
                  '#urlShortenerNavbar',
                  'aria-controls',
                  'urlShortenerNavbar',
                  'aria-expanded',
                  'false',
                  'aria-label',
                  'Toggle navigation',
                  1,
                  'navbar-toggler',
                  'collapsed',
                ],
                [1, 'navbar-toggler-icon'],
                ['id', 'urlShortenerNavbar', 1, 'navbar-collapse', 'collapse'],
                [1, 'navbar-nav', 'w-100', 'justify-content-end'],
                [1, 'nav-item'],
                ['routerLinkActive', 'active', 1, 'nav-link', 3, 'routerLink'],
                [
                  'href',
                  'https://github.com/wmezadev/wdd430-project',
                  'target',
                  '_blank',
                  'rel',
                  'noopener noreferrer',
                  1,
                  'nav-link',
                ],
                [3, 'icon'],
              ],
              template: function (n, r) {
                1 & n &&
                  (N(0, 'header', 0)(1, 'div', 1)(2, 'nav', 2)(3, 'div', 3)(4, 'a', 4),
                  (function D5() {
                    B.lFrame.currentNamespace = u5;
                  })(),
                  N(5, 'svg', 5),
                  b2(6, 'defs', 6),
                  N(7, 'g', 7),
                  b2(8, 'path', 8),
                  I(),
                  N(9, 'g', 9),
                  b2(10, 'path', 10),
                  I(),
                  N(11, 'g', 11),
                  b2(12, 'path', 12)(13, 'polyline', 13)(14, 'polyline', 14)(15, 'polyline', 15),
                  I(),
                  N(16, 'g', 16),
                  b2(17, 'path', 17),
                  I()()(),
                  (function S5() {
                    !(function Tw() {
                      B.lFrame.currentNamespace = null;
                    })();
                  })(),
                  N(18, 'button', 18),
                  b2(19, 'span', 19),
                  I(),
                  N(20, 'div', 20)(21, 'ul', 21)(22, 'li', 22)(23, 'a', 23),
                  X(24, 'Dashboard'),
                  I()(),
                  N(25, 'li', 22)(26, 'a', 24),
                  X(27, 'Project Repository '),
                  b2(28, 'fa-icon', 25),
                  I()()()()()()()()),
                  2 & n &&
                    (e2(4),
                    Z2('routerLink', Un(3, so2)),
                    e2(19),
                    Z2('routerLink', Un(4, oo2)),
                    e2(5),
                    Z2('icon', r.faUpRightFromSquare));
              },
              dependencies: [a6, Oh, Zs],
              styles: [
                '.logo-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], .logo-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:30px;width:100%}',
              ],
            })),
            e
          );
        })(),
        fo2 = (() => {
          class e {
            constructor() {
              this.title = 'app';
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = O1({
              type: e,
              selectors: [['app-root']],
              decls: 3,
              vars: 0,
              consts: [[1, 'container']],
              template: function (n, r) {
                1 & n && (b2(0, 'app-header'), N(1, 'div', 0), b2(2, 'router-outlet'), I());
              },
              dependencies: [N0, lo2],
            })),
            e
          );
        })(),
        uo2 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = V1({ type: e, bootstrap: [fo2] })),
            (e.ɵinj = u1({ imports: [io2, yT, eo2, na2, to2, Yi2] })),
            e
          );
        })();
      VT()
        .bootstrapModule(uo2)
        .catch((e) => console.error(e));
    },
  },
  (o2) => {
    o2((o2.s = 622));
  },
]);
