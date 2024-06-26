! function(t) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery) }(function(t) {
    "use strict";

    function e(t, e) {
        if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(t);
        this.el = t, this.options = e = D({}, e), t[q] = this;
        var n = { group: Math.random(), sort: !0, disabled: !1, store: null, handle: null, scroll: !0, scrollSensitivity: 30, scrollSpeed: 10, draggable: /[uo]l/i.test(t.nodeName) ? "li" : ">*", ghostClass: "sortable-ghost", chosenClass: "sortable-chosen", dragClass: "sortable-drag", ignore: "a, img", filter: null, preventOnFilter: !0, animation: 0, setData: function(t, e) { t.setData("Text", e.textContent) }, dropBubble: !1, dragoverBubble: !1, dataIdAttr: "data-id", delay: 0, forceFallback: !1, fallbackClass: "sortable-fallback", fallbackOnBody: !1, fallbackTolerance: 0, fallbackOffset: { x: 0, y: 0 } };
        for (var i in n) !(i in e) && (e[i] = n[i]);
        st(e);
        for (var o in this) "_" === o.charAt(0) && "function" == typeof this[o] && (this[o] = this[o].bind(this));
        this.nativeDraggable = !e.forceFallback && $, r(t, "mousedown", this._onTapStart), r(t, "touchstart", this._onTapStart), r(t, "pointerdown", this._onTapStart), this.nativeDraggable && (r(t, "dragover", this), r(t, "dragenter", this)), at.push(this._onDragOver), e.store && this.sort(e.store.get(this))
    }

    function n(t, e) { "clone" !== t.lastPullMode && (e = !0), E && E.state !== e && (c(E, "display", e ? "none" : ""), e || E.state && (t.options.group.revertClone ? (x.insertBefore(E, N), t._animate(w, E)) : x.insertBefore(E, w)), E.state = e) }

    function i(t, e, n) {
        if (t) {
            n = n || G;
            do { if (">*" === e && t.parentNode === n || b(t, e)) return t } while (t = o(t))
        }
        return null
    }

    function o(t) { var e = t.host; return e && e.nodeType ? e : t.parentNode }

    function a(t) { t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.preventDefault() }

    function r(t, e, n) { t.addEventListener(e, n, K) }

    function s(t, e, n) { t.removeEventListener(e, n, K) }

    function l(t, e, n) {
        if (t)
            if (t.classList) t.classList[n ? "add" : "remove"](e);
            else {
                var i = (" " + t.className + " ").replace(W, " ").replace(" " + e + " ", " ");
                t.className = (i + (n ? " " + e : "")).replace(W, " ")
            }
    }

    function c(t, e, n) {
        var i = t && t.style;
        if (i) {
            if (void 0 === n) return G.defaultView && G.defaultView.getComputedStyle ? n = G.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
            e in i || (e = "-webkit-" + e), i[e] = n + ("string" == typeof n ? "" : "px")
        }
    }

    function h(t, e, n) {
        if (t) {
            var i = t.getElementsByTagName(e),
                o = 0,
                a = i.length;
            if (n)
                for (; o < a; o++) n(i[o], o);
            return i
        }
        return []
    }

    function d(t, e, n, i, o, a, r) {
        t = t || e[q];
        var s = G.createEvent("Event"),
            l = t.options,
            c = "on" + n.charAt(0).toUpperCase() + n.substr(1);
        s.initEvent(n, !0, !0), s.to = e, s.from = o || e, s.item = i || e, s.clone = E, s.oldIndex = a, s.newIndex = r, e.dispatchEvent(s), l[c] && l[c].call(t, s)
    }

    function u(t, e, n, i, o, a, r, s) {
        var l, c, h = t[q],
            d = h.options.onMove;
        return (l = G.createEvent("Event")).initEvent("move", !0, !0), l.to = e, l.from = t, l.dragged = n, l.draggedRect = i, l.related = o || e, l.relatedRect = a || e.getBoundingClientRect(), l.willInsertAfter = s, t.dispatchEvent(l), d && (c = d.call(h, l, r)), c
    }

    function f(t) { t.draggable = !1 }

    function p() { et = !1 }

    function g(t, e) { var n = t.lastElementChild.getBoundingClientRect(); return e.clientY - (n.top + n.height) > 5 || e.clientX - (n.left + n.width) > 5 }

    function v(t) { for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, i = 0; n--;) i += e.charCodeAt(n); return i.toString(36) }

    function m(t, e) { var n = 0; if (!t || !t.parentNode) return -1; for (; t && (t = t.previousElementSibling);) "TEMPLATE" === t.nodeName.toUpperCase() || ">*" !== e && !b(t, e) || n++; return n }

    function b(t, e) {
        if (t) {
            var n = (e = e.split(".")).shift().toUpperCase(),
                i = new RegExp("\\s(" + e.join("|") + ")(?=\\s)", "g");
            return !("" !== n && t.nodeName.toUpperCase() != n || e.length && ((" " + t.className + " ").match(i) || []).length != e.length)
        }
        return !1
    }

    function _(t, e) { var n, i; return function() { void 0 === n && (n = arguments, i = this, setTimeout(function() { 1 === n.length ? t.call(i, n[0]) : t.apply(i, n), n = void 0 }, e)) } }

    function D(t, e) {
        if (t && e)
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }

    function y(t) { return Z ? Z(t).clone(!0)[0] : J && J.dom ? J.dom(t).cloneNode(!0) : t.cloneNode(!0) }

    function T(t) {
        for (var e = t.getElementsByTagName("input"), n = e.length; n--;) {
            var i = e[n];
            i.checked && ot.push(i)
        }
    }
    var w, C, S, E, x, N, k, B, O, Y, X, A, M, P, R, I, L, j, F, U, H = {},
        W = /\s+/g,
        V = /left|right|inline/,
        q = "Sortable" + (new Date).getTime(),
        z = window,
        G = z.document,
        Q = z.parseInt,
        Z = z.jQuery || z.Zepto,
        J = z.Polymer,
        K = !1,
        $ = !!("draggable" in G.createElement("div")),
        tt = function(t) { return !navigator.userAgent.match(/Trident.*rv[ :]?11\./) && (t = G.createElement("x"), t.style.cssText = "pointer-events:auto", "auto" === t.style.pointerEvents) }(),
        et = !1,
        nt = Math.abs,
        it = Math.min,
        ot = [],
        at = [],
        rt = _(function(t, e, n) {
            if (n && e.scroll) {
                var i, o, a, r, s, l, c = n[q],
                    h = e.scrollSensitivity,
                    d = e.scrollSpeed,
                    u = t.clientX,
                    f = t.clientY,
                    p = window.innerWidth,
                    g = window.innerHeight;
                if (O !== n && (B = e.scroll, O = n, Y = e.scrollFn, !0 === B)) {
                    B = n;
                    do { if (B.offsetWidth < B.scrollWidth || B.offsetHeight < B.scrollHeight) break } while (B = B.parentNode)
                }
                B && (i = B, o = B.getBoundingClientRect(), a = (nt(o.right - u) <= h) - (nt(o.left - u) <= h), r = (nt(o.bottom - f) <= h) - (nt(o.top - f) <= h)), a || r || (r = (g - f <= h) - (f <= h), ((a = (p - u <= h) - (u <= h)) || r) && (i = z)), H.vx === a && H.vy === r && H.el === i || (H.el = i, H.vx = a, H.vy = r, clearInterval(H.pid), i && (H.pid = setInterval(function() {
                    if (l = r ? r * d : 0, s = a ? a * d : 0, "function" == typeof Y) return Y.call(c, s, l, t);
                    i === z ? z.scrollTo(z.pageXOffset + s, z.pageYOffset + l) : (i.scrollTop += l, i.scrollLeft += s)
                }, 24)))
            }
        }, 30),
        st = function(t) {
            function e(t, e) { return void 0 !== t && !0 !== t || (t = n.name), "function" == typeof t ? t : function(n, i) { var o = i.options.group.name; return e ? t : t && (t.join ? t.indexOf(o) > -1 : o == t) } }
            var n = {},
                i = t.group;
            i && "object" == typeof i || (i = { name: i }), n.name = i.name, n.checkPull = e(i.pull, !0), n.checkPut = e(i.put), n.revertClone = i.revertClone, t.group = n
        };
    e.prototype = {
        constructor: e,
        _onTapStart: function(t) {
            var e, n = this,
                o = this.el,
                a = this.options,
                r = a.preventOnFilter,
                s = t.type,
                l = t.touches && t.touches[0],
                c = (l || t).target,
                h = t.target.shadowRoot && t.path && t.path[0] || c,
                u = a.filter;
            if (T(o), !w && !(/mousedown|pointerdown/.test(s) && 0 !== t.button || a.disabled) && (c = i(c, a.draggable, o)) && k !== c) {
                if (e = m(c, a.draggable), "function" == typeof u) { if (u.call(this, t, c, this)) return d(n, h, "filter", c, o, e), void(r && t.preventDefault()) } else if (u && (u = u.split(",").some(function(t) { if (t = i(h, t.trim(), o)) return d(n, t, "filter", c, o, e), !0 }))) return void(r && t.preventDefault());
                a.handle && !i(h, a.handle, o) || this._prepareDragStart(t, l, c, e)
            }
        },
        _prepareDragStart: function(t, e, n, i) {
            var o, a = this,
                s = a.el,
                c = a.options,
                u = s.ownerDocument;
            n && !w && n.parentNode === s && (j = t, x = s, C = (w = n).parentNode, N = w.nextSibling, k = n, I = c.group, P = i, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, w.style["will-change"] = "transform", o = function() { a._disableDelayedDrag(), w.draggable = a.nativeDraggable, l(w, c.chosenClass, !0), a._triggerDragStart(t, e), d(a, x, "choose", w, x, P) }, c.ignore.split(",").forEach(function(t) { h(w, t.trim(), f) }), r(u, "mouseup", a._onDrop), r(u, "touchend", a._onDrop), r(u, "touchcancel", a._onDrop), r(u, "pointercancel", a._onDrop), r(u, "selectstart", a), c.delay ? (r(u, "mouseup", a._disableDelayedDrag), r(u, "touchend", a._disableDelayedDrag), r(u, "touchcancel", a._disableDelayedDrag), r(u, "mousemove", a._disableDelayedDrag), r(u, "touchmove", a._disableDelayedDrag), r(u, "pointermove", a._disableDelayedDrag), a._dragStartTimer = setTimeout(o, c.delay)) : o())
        },
        _disableDelayedDrag: function() {
            var t = this.el.ownerDocument;
            clearTimeout(this._dragStartTimer), s(t, "mouseup", this._disableDelayedDrag), s(t, "touchend", this._disableDelayedDrag), s(t, "touchcancel", this._disableDelayedDrag), s(t, "mousemove", this._disableDelayedDrag), s(t, "touchmove", this._disableDelayedDrag), s(t, "pointermove", this._disableDelayedDrag)
        },
        _triggerDragStart: function(t, e) {
            (e = e || ("touch" == t.pointerType ? t : null)) ? (j = { target: w, clientX: e.clientX, clientY: e.clientY }, this._onDragStart(j, "touch")) : this.nativeDraggable ? (r(w, "dragend", this), r(x, "dragstart", this._onDragStart)) : this._onDragStart(j, !0);
            try { G.selection ? setTimeout(function() { G.selection.empty() }) : window.getSelection().removeAllRanges() } catch (t) {}
        },
        _dragStarted: function() {
            if (x && w) {
                var t = this.options;
                l(w, t.ghostClass, !0), l(w, t.dragClass, !1), e.active = this, d(this, x, "start", w, x, P)
            } else this._nulling()
        },
        _emulateDragOver: function() {
            if (F) {
                if (this._lastX === F.clientX && this._lastY === F.clientY) return;
                this._lastX = F.clientX, this._lastY = F.clientY, tt || c(S, "display", "none");
                var t = G.elementFromPoint(F.clientX, F.clientY),
                    e = t,
                    n = at.length;
                if (e)
                    do {
                        if (e[q]) { for (; n--;) at[n]({ clientX: F.clientX, clientY: F.clientY, target: t, rootEl: e }); break }
                        t = e
                    } while (e = e.parentNode);
                tt || c(S, "display", "")
            }
        },
        _onTouchMove: function(t) {
            if (j) {
                var n = this.options,
                    i = n.fallbackTolerance,
                    o = n.fallbackOffset,
                    a = t.touches ? t.touches[0] : t,
                    r = a.clientX - j.clientX + o.x,
                    s = a.clientY - j.clientY + o.y,
                    l = t.touches ? "translate3d(" + r + "px," + s + "px,0)" : "translate(" + r + "px," + s + "px)";
                if (!e.active) {
                    if (i && it(nt(a.clientX - this._lastX), nt(a.clientY - this._lastY)) < i) return;
                    this._dragStarted()
                }
                this._appendGhost(), U = !0, F = a, c(S, "webkitTransform", l), c(S, "mozTransform", l), c(S, "msTransform", l), c(S, "transform", l), t.preventDefault()
            }
        },
        _appendGhost: function() {
            if (!S) {
                var t, e = w.getBoundingClientRect(),
                    n = c(w),
                    i = this.options;
                l(S = w.cloneNode(!0), i.ghostClass, !1), l(S, i.fallbackClass, !0), l(S, i.dragClass, !0), c(S, "top", e.top - Q(n.marginTop, 10)), c(S, "left", e.left - Q(n.marginLeft, 10)), c(S, "width", e.width), c(S, "height", e.height), c(S, "opacity", "0.8"), c(S, "position", "fixed"), c(S, "zIndex", "100000"), c(S, "pointerEvents", "none"), i.fallbackOnBody && G.body.appendChild(S) || x.appendChild(S), t = S.getBoundingClientRect(), c(S, "width", 2 * e.width - t.width), c(S, "height", 2 * e.height - t.height)
            }
        },
        _onDragStart: function(t, e) {
            var n = t.dataTransfer,
                i = this.options;
            this._offUpEvents(), I.checkPull(this, this, w, t) && ((E = y(w)).draggable = !1, E.style["will-change"] = "", c(E, "display", "none"), l(E, this.options.chosenClass, !1), x.insertBefore(E, w), d(this, x, "clone", w)), l(w, i.dragClass, !0), e ? ("touch" === e ? (r(G, "touchmove", this._onTouchMove), r(G, "touchend", this._onDrop), r(G, "touchcancel", this._onDrop), r(G, "pointermove", this._onTouchMove), r(G, "pointerup", this._onDrop)) : (r(G, "mousemove", this._onTouchMove), r(G, "mouseup", this._onDrop)), this._loopId = setInterval(this._emulateDragOver, 50)) : (n && (n.effectAllowed = "move", i.setData && i.setData.call(this, n, w)), r(G, "drop", this), setTimeout(this._dragStarted, 0))
        },
        _onDragOver: function(t) {
            var o, a, r, s, l = this.el,
                h = this.options,
                d = h.group,
                f = e.active,
                v = I === d,
                m = !1,
                b = h.sort;
            if (void 0 !== t.preventDefault && (t.preventDefault(), !h.dragoverBubble && t.stopPropagation()), !w.animated && (U = !0, f && !h.disabled && (v ? b || (s = !x.contains(w)) : L === this || (f.lastPullMode = I.checkPull(this, f, w, t)) && d.checkPut(this, f, w, t)) && (void 0 === t.rootEl || t.rootEl === this.el))) {
                if (rt(t, h, this.el), et) return;
                if (o = i(t.target, h.draggable, l), a = w.getBoundingClientRect(), L !== this && (L = this, m = !0), s) return n(f, !0), C = x, void(E || N ? x.insertBefore(w, E || N) : b || x.appendChild(w));
                if (0 === l.children.length || l.children[0] === S || l === t.target && g(l, t)) {
                    if (0 !== l.children.length && l.children[0] !== S && l === t.target && (o = l.lastElementChild), o) {
                        if (o.animated) return;
                        r = o.getBoundingClientRect()
                    }
                    n(f, v), !1 !== u(x, l, w, a, o, r, t) && (w.contains(l) || (l.appendChild(w), C = l), this._animate(a, w), o && this._animate(r, o))
                } else if (o && !o.animated && o !== w && void 0 !== o.parentNode[q]) {
                    X !== o && (X = o, A = c(o), M = c(o.parentNode));
                    var _ = (r = o.getBoundingClientRect()).right - r.left,
                        D = r.bottom - r.top,
                        y = V.test(A.cssFloat + A.display) || "flex" == M.display && 0 === M["flex-direction"].indexOf("row"),
                        T = o.offsetWidth > w.offsetWidth,
                        k = o.offsetHeight > w.offsetHeight,
                        B = (y ? (t.clientX - r.left) / _ : (t.clientY - r.top) / D) > .5,
                        O = o.nextElementSibling,
                        Y = !1;
                    if (y) {
                        var P = w.offsetTop,
                            R = o.offsetTop;
                        Y = P === R ? o.previousElementSibling === w && !T || B && T : o.previousElementSibling === w || w.previousElementSibling === o ? (t.clientY - r.top) / D > .5 : R > P
                    } else m || (Y = O !== w && !k || B && k);
                    var j = u(x, l, w, a, o, r, t, Y);
                    !1 !== j && (1 !== j && -1 !== j || (Y = 1 === j), et = !0, setTimeout(p, 30), n(f, v), w.contains(l) || (Y && !O ? l.appendChild(w) : o.parentNode.insertBefore(w, Y ? O : o)), C = w.parentNode, this._animate(a, w), this._animate(r, o))
                }
            }
        },
        _animate: function(t, e) {
            var n = this.options.animation;
            if (n) {
                var i = e.getBoundingClientRect();
                1 === t.nodeType && (t = t.getBoundingClientRect()), c(e, "transition", "none"), c(e, "transform", "translate3d(" + (t.left - i.left) + "px," + (t.top - i.top) + "px,0)"), e.offsetWidth, c(e, "transition", "all " + n + "ms"), c(e, "transform", "translate3d(0,0,0)"), clearTimeout(e.animated), e.animated = setTimeout(function() { c(e, "transition", ""), c(e, "transform", ""), e.animated = !1 }, n)
            }
        },
        _offUpEvents: function() {
            var t = this.el.ownerDocument;
            s(G, "touchmove", this._onTouchMove), s(G, "pointermove", this._onTouchMove), s(t, "mouseup", this._onDrop), s(t, "touchend", this._onDrop), s(t, "pointerup", this._onDrop), s(t, "touchcancel", this._onDrop), s(t, "pointercancel", this._onDrop), s(t, "selectstart", this)
        },
        _onDrop: function(t) {
            var n = this.el,
                i = this.options;
            clearInterval(this._loopId), clearInterval(H.pid), clearTimeout(this._dragStartTimer), s(G, "mousemove", this._onTouchMove), this.nativeDraggable && (s(G, "drop", this), s(n, "dragstart", this._onDragStart)), this._offUpEvents(), t && (U && (t.preventDefault(), !i.dropBubble && t.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), x !== C && "clone" === e.active.lastPullMode || E && E.parentNode && E.parentNode.removeChild(E), w && (this.nativeDraggable && s(w, "dragend", this), f(w), w.style["will-change"] = "", l(w, this.options.ghostClass, !1), l(w, this.options.chosenClass, !1), d(this, x, "unchoose", w, x, P), x !== C ? (R = m(w, i.draggable)) >= 0 && (d(null, C, "add", w, x, P, R), d(this, x, "remove", w, x, P, R), d(null, C, "sort", w, x, P, R), d(this, x, "sort", w, x, P, R)) : w.nextSibling !== N && (R = m(w, i.draggable)) >= 0 && (d(this, x, "update", w, x, P, R), d(this, x, "sort", w, x, P, R)), e.active && (null != R && -1 !== R || (R = P), d(this, x, "end", w, x, P, R), this.save()))), this._nulling()
        },
        _nulling: function() { x = w = C = S = N = E = k = B = O = j = F = U = R = X = A = L = I = e.active = null, ot.forEach(function(t) { t.checked = !0 }), ot.length = 0 },
        handleEvent: function(t) {
            switch (t.type) {
                case "drop":
                case "dragend":
                    this._onDrop(t);
                    break;
                case "dragover":
                case "dragenter":
                    w && (this._onDragOver(t), a(t));
                    break;
                case "selectstart":
                    t.preventDefault()
            }
        },
        toArray: function() { for (var t, e = [], n = this.el.children, o = 0, a = n.length, r = this.options; o < a; o++) i(t = n[o], r.draggable, this.el) && e.push(t.getAttribute(r.dataIdAttr) || v(t)); return e },
        sort: function(t) {
            var e = {},
                n = this.el;
            this.toArray().forEach(function(t, o) {
                var a = n.children[o];
                i(a, this.options.draggable, n) && (e[t] = a)
            }, this), t.forEach(function(t) { e[t] && (n.removeChild(e[t]), n.appendChild(e[t])) })
        },
        save: function() {
            var t = this.options.store;
            t && t.set(this)
        },
        closest: function(t, e) { return i(t, e || this.options.draggable, this.el) },
        option: function(t, e) {
            var n = this.options;
            if (void 0 === e) return n[t];
            n[t] = e, "group" === t && st(n)
        },
        destroy: function() {
            var t = this.el;
            t[q] = null, s(t, "mousedown", this._onTapStart), s(t, "touchstart", this._onTapStart), s(t, "pointerdown", this._onTapStart), this.nativeDraggable && (s(t, "dragover", this), s(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(t) { t.removeAttribute("draggable") }), at.splice(at.indexOf(this._onDragOver), 1), this._onDrop(), this.el = t = null
        }
    }, r(G, "touchmove", function(t) { e.active && t.preventDefault() });
    try { window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() { K = { capture: !1, passive: !1 } } })) } catch (t) {}
    e.utils = { on: r, off: s, css: c, find: h, is: function(t, e) { return !!i(t, e, t) }, extend: D, throttle: _, closest: i, toggleClass: l, clone: y, index: m }, e.create = function(t, n) { return new e(t, n) }, t.fn.sortable = function(n) {
        var i, o = arguments;
        return this.each(function() {
            var a = t(this),
                r = a.data("sortable");
            r || !(n instanceof Object) && n || (r = new e(this, n), a.data("sortable", r)), r && ("widget" === n ? i = r : "destroy" === n ? (r.destroy(), a.removeData("sortable")) : "function" == typeof r[n] ? i = r[n].apply(r, [].slice.call(o, 1)) : n in r.options && (i = r.option.apply(r, o)))
        }), void 0 === i ? this : i
    }
});