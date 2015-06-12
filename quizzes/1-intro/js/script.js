function htmlPrettify(a) {
    var b = "",
        c = /(>)(<)(\/*)/g,
        d = 0;
    return a = a.replace(c, "$1\r\n$2$3"), $.each(a.split("\r\n"), function (a, c) {
        var e = 0;
        c.match(/.+<\/\w[^>]*>$/) ? e = 0 : c.match(/^<\/\w/) ? d !== 0 && (d -= 1) : c.match(/^<\w[^>]*[^\/]>.*$/) ? e = 1 : e = 0;
        var f = "";
        for (var g = 0; g < d; g++) f += "  ";
        b += f + c + "\r\n", d += e
    }), b
}(function (a, b) {
    function c(a) {
        return J.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }
    function d(a) {
        if (!cr[a]) {
            var b = G.body,
                c = J("<" + a + ">").appendTo(b),
                d = c.css("display");
            c.remove();
            if (d === "none" || d === "") {
                cs || (cs = G.createElement("iframe"), cs.frameBorder = cs.width = cs.height = 0), b.appendChild(cs);
                if (!ct || !cs.createElement) ct = (cs.contentWindow || cs.contentDocument).document, ct.write((G.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), ct.close();
                c = ct.createElement(a), ct.body.appendChild(c), d = J.css(c, "display"), b.removeChild(cs)
            }
            cr[a] = d
        }
        return cr[a]
    }
    function e(a, b) {
        var c = {};
        return J.each(cx.concat.apply([], cx.slice(0, b)), function () {
            c[this] = a
        }), c
    }
    function f() {
        cy = b
    }
    function g() {
        return setTimeout(f, 0), cy = J.now()
    }
    function h() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    function i() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }
    function j(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes,
            e = {},
            f, g, h = d.length,
            i, j = d[0],
            k, l, m, n, o;
        for (f = 1; f < h; f++) {
            if (f === 1) for (g in a.converters) typeof g == "string" && (e[g.toLowerCase()] = a.converters[g]);
            k = j, j = d[f];
            if (j === "*") j = k;
            else if (k !== "*" && k !== j) {
                l = k + " " + j, m = e[l] || e["* " + j];
                if (!m) {
                    o = b;
                    for (n in e) {
                        i = n.split(" ");
                        if (i[0] === k || i[0] === "*") {
                            o = e[i[1] + " " + j];
                            if (o) {
                                n = e[n], n === !0 ? m = o : o === !0 && (m = n);
                                break
                            }
                        }
                    }
                }!m && !o && J.error("No conversion from " + l.replace(" ", " to ")), m !== !0 && (c = m ? m(c) : o(n(c)))
            }
        }
        return c
    }
    function k(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) return j !== f[0] && f.unshift(j), d[j]
    }
    function l(a, b, c, d) {
        if (J.isArray(b)) J.each(b, function (b, e) {
            c || bT.test(a) ? d(a, e) : l(a + "[" + (typeof e == "object" || J.isArray(e) ? b : "") + "]", e, c, d)
        });
        else if (!c && b != null && typeof b == "object") for (var e in b) l(a + "[" + e + "]", b[e], c, d);
        else d(a, b)
    }
    function m(a, c) {
        var d, e, f = J.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        e && J.extend(!0, a, e)
    }
    function n(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === cg,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = n(a, c, d, e, l, g)));
        return (k || !l) && !g["*"] && (l = n(a, c, d, e, "*", g)), l
    }
    function o(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (J.isFunction(c)) {
                var d = b.toLowerCase().split(cc),
                    e = 0,
                    f = d.length,
                    g, h, i;
                for (; e < f; e++) g = d[e], i = /^\+/.test(g), i && (g = g.substr(1) || "*"), h = a[g] = a[g] || [], h[i ? "unshift" : "push"](c)
            }
        }
    }
    function p(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight,
            e = b === "width" ? bN : bO;
        if (d > 0) return c !== "border" && J.each(e, function () {
            c || (d -= parseFloat(J.css(a, "padding" + this)) || 0), c === "margin" ? d += parseFloat(J.css(a, c + this)) || 0 : d -= parseFloat(J.css(a, "border" + this + "Width")) || 0
        }), d + "px";
        d = bP(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        return d = parseFloat(d) || 0, c && J.each(e, function () {
            d += parseFloat(J.css(a, "padding" + this)) || 0, c !== "padding" && (d += parseFloat(J.css(a, "border" + this + "Width")) || 0), c === "margin" && (d += parseFloat(J.css(a, c + this)) || 0)
        }), d + "px"
    }
    function q(a, b) {
        b.src ? J.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : J.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bD, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }
    function r(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? s(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && J.grep(a.getElementsByTagName("input"), s)
    }
    function s(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }
    function t(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }
    function u(a, b) {
        var c;
        if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
            if (c === "object") b.outerHTML = a.outerHTML;
            else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                if (c === "option") b.selected = a.defaultSelected;
                else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
            b.removeAttribute(J.expando)
        }
    }
    function v(a, b) {
        if (b.nodeType === 1 && !! J.hasData(a)) {
            var c, d, e, f = J._data(a),
                g = J._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h) for (d = 0, e = h[c].length; d < e; d++) J.event.add(b, c + (h[c][d].namespace ? "." : "") + h[c][d].namespace, h[c][d], h[c][d].data)
            }
            g.data && (g.data = J.extend({}, g.data))
        }
    }
    function w(a, b) {
        return J.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function x(a) {
        var b = br.split(" "),
            c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c
    }
    function y(a, b, c) {
        b = b || 0;
        if (J.isFunction(b)) return J.grep(a, function (a, d) {
            var e = !! b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return J.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = J.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (bn.test(b)) return J.filter(b, d, !c);
            b = J.filter(b, d)
        }
        return J.grep(a, function (a, d) {
            return J.inArray(a, b) >= 0 === c
        })
    }
    function z(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }
    function A() {
        return !0
    }
    function B() {
        return !1
    }
    function C(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            f = b + "mark",
            g = J._data(a, d);
        g && (c === "queue" || !J._data(a, e)) && (c === "mark" || !J._data(a, f)) && setTimeout(function () {
            !J._data(a, e) && !J._data(a, f) && (J.removeData(a, d, !0), g.fire())
        }, 0)
    }
    function D(a) {
        for (var b in a) {
            if (b === "data" && J.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }
    function E(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(N, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : J.isNumeric(d) ? parseFloat(d) : M.test(d) ? J.parseJSON(d) : d
                } catch (f) {}
                J.data(a, c, d)
            } else d = b
        }
        return d
    }
    function F(a) {
        var b = K[a] = {},
            c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }
    var G = a.document,
        H = a.navigator,
        I = a.location,
        J = function () {
            function c() {
                if (!d.isReady) {
                    try {
                        G.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(c, 1);
                        return
                    }
                    d.ready()
                }
            }
            var d = function (a, b) {
                    return new d.fn.init(a, b, g)
                },
                e = a.jQuery,
                f = a.$,
                g, h = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                i = /\S/,
                j = /^\s+/,
                k = /\s+$/,
                l = /\d/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = /-([a-z]|[0-9])/ig,
                w = /^-ms-/,
                x = function (a, b) {
                    return (b + "").toUpperCase()
                },
                y = H.userAgent,
                z, A, B, C = Object.prototype.toString,
                D = Object.prototype.hasOwnProperty,
                E = Array.prototype.push,
                F = Array.prototype.slice,
                I = String.prototype.trim,
                J = Array.prototype.indexOf,
                K = {};
            return d.fn = d.prototype = {
                constructor: d,
                init: function (a, c, e) {
                    var f, g, i, j;
                    if (!a) return this;
                    if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                    if (a === "body" && !c && G.body) return this.context = G, this[0] = G.body, this.selector = a, this.length = 1, this;
                    if (typeof a == "string") {
                        a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? f = h.exec(a) : f = [null, a, null];
                        if (f && (f[1] || !c)) {
                            if (f[1]) return c = c instanceof d ? c[0] : c, j = c ? c.ownerDocument || c : G, i = m.exec(a), i ? d.isPlainObject(c) ? (a = [G.createElement(i[1])], d.fn.attr.call(a, c, !0)) : a = [j.createElement(i[1])] : (i = d.buildFragment([f[1]], [j]), a = (i.cacheable ? d.clone(i.fragment) : i.fragment).childNodes), d.merge(this, a);
                            g = G.getElementById(f[2]);
                            if (g && g.parentNode) {
                                if (g.id !== f[2]) return e.find(a);
                                this.length = 1, this[0] = g
                            }
                            return this.context = G, this.selector = a, this
                        }
                        return !c || c.jquery ? (c || e).find(a) : this.constructor(c).find(a)
                    }
                    return d.isFunction(a) ? e.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), d.makeArray(a, this))
                },
                selector: "",
                jquery: "1.7",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return F.call(this, 0)
                },
                get: function (a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function (a, b, c) {
                    var e = this.constructor();
                    return d.isArray(a) ? E.apply(e, a) : d.merge(e, a), e.prevObject = this, e.context = this.context, b === "find" ? e.selector = this.selector + (this.selector ? " " : "") + c : b && (e.selector = this.selector + "." + b + "(" + c + ")"), e
                },
                each: function (a, b) {
                    return d.each(this, a, b)
                },
                ready: function (a) {
                    return d.bindReady(), A.add(a), this
                },
                eq: function (a) {
                    return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function (a) {
                    return this.pushStack(d.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            }, d.fn.init.prototype = d.fn, d.extend = d.fn.extend = function () {
                var a, c, e, f, g, h, i = arguments[0] || {},
                    j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !d.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                    e = i[c], f = a[c];
                    if (i === f) continue;
                    l && f && (d.isPlainObject(f) || (g = d.isArray(f))) ? (g ? (g = !1, h = e && d.isArray(e) ? e : []) : h = e && d.isPlainObject(e) ? e : {}, i[c] = d.extend(l, h, f)) : f !== b && (i[c] = f)
                }
                return i
            }, d.extend({
                noConflict: function (b) {
                    return a.$ === d && (a.$ = f), b && a.jQuery === d && (a.jQuery = e), d
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function (a) {
                    a ? d.readyWait++ : d.ready(!0)
                },
                ready: function (a) {
                    if (a === !0 && !--d.readyWait || a !== !0 && !d.isReady) {
                        if (!G.body) return setTimeout(d.ready, 1);
                        d.isReady = !0;
                        if (a !== !0 && --d.readyWait > 0) return;
                        A.fireWith(G, [d]), d.fn.trigger && d(G).trigger("ready").unbind("ready")
                    }
                },
                bindReady: function () {
                    if (!A) {
                        A = d.Callbacks("once memory");
                        if (G.readyState === "complete") return setTimeout(d.ready, 1);
                        if (G.addEventListener) G.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", d.ready, !1);
                        else if (G.attachEvent) {
                            G.attachEvent("onreadystatechange", B), a.attachEvent("onload", d.ready);
                            var b = !1;
                            try {
                                b = a.frameElement == null
                            } catch (e) {}
                            G.documentElement.doScroll && b && c()
                        }
                    }
                },
                isFunction: function (a) {
                    return d.type(a) === "function"
                },
                isArray: Array.isArray ||
                function (a) {
                    return d.type(a) === "array"
                },
                isWindow: function (a) {
                    return a && typeof a == "object" && "setInterval" in a
                },
                isNumeric: function (a) {
                    return a != null && l.test(a) && !isNaN(a)
                },
                type: function (a) {
                    return a == null ? String(a) : K[C.call(a)] || "object"
                },
                isPlainObject: function (a) {
                    if (!a || d.type(a) !== "object" || a.nodeType || d.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
                    var e;
                    for (e in a);
                    return e === b || D.call(a, e)
                },
                isEmptyObject: function (a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function (a) {
                    throw a
                },
                parseJSON: function (b) {
                    if (typeof b != "string" || !b) return null;
                    b = d.trim(b);
                    if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                    d.error("Invalid JSON: " + b)
                },
                parseXML: function (c) {
                    var e, f;
                    try {
                        a.DOMParser ? (f = new DOMParser, e = f.parseFromString(c, "text/xml")) : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(c))
                    } catch (g) {
                        e = b
                    }
                    return (!e || !e.documentElement || e.getElementsByTagName("parsererror").length) && d.error("Invalid XML: " + c), e
                },
                noop: function () {},
                globalEval: function (b) {
                    b && i.test(b) && (a.execScript ||
                    function (b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function (a) {
                    return a.replace(w, "ms-").replace(v, x)
                },
                nodeName: function (a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function (a, c, e) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || d.isFunction(a);
                    if (e) {
                        if (i) {
                            for (f in a) if (c.apply(a[f], e) === !1) break
                        } else for (; g < h;) if (c.apply(a[g++], e) === !1) break
                    } else if (i) {
                        for (f in a) if (c.call(a[f], f, a[f]) === !1) break
                    } else for (; g < h;) if (c.call(a[g], g, a[g++]) === !1) break;
                    return a
                },
                trim: I ?
                function (a) {
                    return a == null ? "" : I.call(a)
                } : function (a) {
                    return a == null ? "" : (a + "").replace(j, "").replace(k, "")
                },
                makeArray: function (a, b) {
                    var c = b || [];
                    if (a != null) {
                        var e = d.type(a);
                        a.length == null || e === "string" || e === "function" || e === "regexp" || d.isWindow(a) ? E.call(c, a) : d.merge(c, a)
                    }
                    return c
                },
                inArray: function (a, b, c) {
                    var d;
                    if (b) {
                        if (J) return J.call(b, a, c);
                        d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                        for (; c < d; c++) if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function (a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else while (c[e] !== b) a[d++] = c[e++];
                    return a.length = d, a
                },
                grep: function (a, b, c) {
                    var d = [],
                        e;
                    c = !! c;
                    for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function (a, c, e) {
                    var f, g, h = [],
                        i = 0,
                        j = a.length,
                        k = a instanceof d || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || d.isArray(a));
                    if (k) for (; i < j; i++) f = c(a[i], i, e), f != null && (h[h.length] = f);
                    else for (g in a) f = c(a[g], g, e), f != null && (h[h.length] = f);
                    return h.concat.apply([], h)
                },
                guid: 1,
                proxy: function (a, c) {
                    if (typeof c == "string") {
                        var e = a[c];
                        c = a, a = e
                    }
                    if (!d.isFunction(a)) return b;
                    var f = F.call(arguments, 2),
                        g = function () {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                    return g.guid = a.guid = a.guid || g.guid || d.guid++, g
                },
                access: function (a, c, e, f, g, h) {
                    var i = a.length;
                    if (typeof c == "object") {
                        for (var j in c) d.access(a, j, c[j], f, g, e);
                        return a
                    }
                    if (e !== b) {
                        f = !h && f && d.isFunction(e);
                        for (var k = 0; k < i; k++) g(a[k], c, f ? e.call(a[k], k, g(a[k], c)) : e, h);
                        return a
                    }
                    return i ? g(a[0], c) : b
                },
                now: function () {
                    return (new Date).getTime()
                },
                uaMatch: function (a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function () {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    d.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (c, e) {
                        return e && e instanceof d && !(e instanceof a) && (e = a(e)), d.fn.init.call(this, c, e, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(G);
                    return a
                },
                browser: {}
            }), d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                K["[object " + b + "]"] = b.toLowerCase()
            }), z = d.uaMatch(y), z.browser && (d.browser[z.browser] = !0, d.browser.version = z.version), d.browser.webkit && (d.browser.safari = !0), i.test(" ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g = d(G), G.addEventListener ? B = function () {
                G.removeEventListener("DOMContentLoaded", B, !1), d.ready()
            } : G.attachEvent && (B = function () {
                G.readyState === "complete" && (G.detachEvent("onreadystatechange", B), d.ready())
            }), typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
                return d
            }), d
        }(),
        K = {};
    J.Callbacks = function (a) {
        a = a ? K[a] || F(a) : {};
        var c = [],
            d = [],
            e, f, g, h, i, j = function (b) {
                var d, e, f, g, h;
                for (d = 0, e = b.length; d < e; d++) f = b[d], g = J.type(f), g === "array" ? j(f) : g === "function" && (!a.unique || !l.has(f)) && c.push(f)
            },
            k = function (b, j) {
                j = j || [], e = !a.memory || [b, j], f = !0, i = g || 0, g = 0, h = c.length;
                for (; c && i < h; i++) if (c[i].apply(b, j) === !1 && a.stopOnFalse) {
                    e = !0;
                    break
                }
                f = !1, c && (a.once ? e === !0 ? l.disable() : c = [] : d && d.length && (e = d.shift(), l.fireWith(e[0], e[1])))
            },
            l = {
                add: function () {
                    if (c) {
                        var a = c.length;
                        j(arguments), f ? h = c.length : e && e !== !0 && (g = a, k(e[0], e[1]))
                    }
                    return this
                },
                remove: function () {
                    if (c) {
                        var b = arguments,
                            d = 0,
                            e = b.length;
                        for (; d < e; d++) for (var g = 0; g < c.length; g++) if (b[d] === c[g]) {
                            f && g <= h && (h--, g <= i && i--), c.splice(g--, 1);
                            if (a.unique) break
                        }
                    }
                    return this
                },
                has: function (a) {
                    if (c) {
                        var b = 0,
                            d = c.length;
                        for (; b < d; b++) if (a === c[b]) return !0
                    }
                    return !1
                },
                empty: function () {
                    return c = [], this
                },
                disable: function () {
                    return c = d = e = b, this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    return d = b, (!e || e === !0) && l.disable(), this
                },
                locked: function () {
                    return !d
                },
                fireWith: function (b, c) {
                    return d && (f ? a.once || d.push([b, c]) : (!a.once || !e) && k(b, c)), this
                },
                fire: function () {
                    return l.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!e
                }
            };
        return l
    };
    var L = [].slice;
    J.extend({
        Deferred: function (a) {
            var b = J.Callbacks("once memory"),
                c = J.Callbacks("once memory"),
                d = J.Callbacks("memory"),
                e = "pending",
                f = {
                    resolve: b,
                    reject: c,
                    notify: d
                },
                g = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function () {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function (a, b, c) {
                        return h.done(a).fail(b).progress(c), this
                    },
                    always: function () {
                        return h.done.apply(h, arguments).fail.apply(h, arguments)
                    },
                    pipe: function (a, b, c) {
                        return J.Deferred(function (d) {
                            J.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0],
                                    e = b[1],
                                    f;
                                J.isFunction(c) ? h[a](function () {
                                    f = c.apply(this, arguments), f && J.isFunction(f.promise) ? f.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === h ? d : this, [f])
                                }) : h[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function (a) {
                        if (a == null) a = g;
                        else for (var b in g) a[b] = g[b];
                        return a
                    }
                },
                h = g.promise({}),
                i;
            for (i in f) h[i] = f[i].fire, h[i + "With"] = f[i].fireWith;
            return h.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(h, h), h
        },
        when: function (a) {
            function b(a) {
                return function (b) {
                    g[a] = arguments.length > 1 ? L.call(arguments, 0) : b, j.notifyWith(k, g)
                }
            }
            function c(a) {
                return function (b) {
                    d[a] = arguments.length > 1 ? L.call(arguments, 0) : b, --h || j.resolveWith(j, d)
                }
            }
            var d = L.call(arguments, 0),
                e = 0,
                f = d.length,
                g = Array(f),
                h = f,
                i = f,
                j = f <= 1 && a && J.isFunction(a.promise) ? a : J.Deferred(),
                k = j.promise();
            if (f > 1) {
                for (; e < f; e++) d[e] && d[e].promise && J.isFunction(d[e].promise) ? d[e].promise().then(c(e), j.reject, b(e)) : --h;
                h || j.resolveWith(j, d)
            } else j !== a && j.resolveWith(j, f ? [a] : []);
            return k
        }
    }), J.support = function () {
        var a = G.createElement("div"),
            b = G.documentElement,
            c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
        a.setAttribute("className", "t"), a.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>", c = a.getElementsByTagName("*"), d = a.getElementsByTagName("a")[0];
        if (!c || !c.length || !d) return {};
        e = G.createElement("select"), f = e.appendChild(G.createElement("option")), g = a.getElementsByTagName("input")[0], i = {
            leadingWhitespace: a.firstChild.nodeType === 3,
            tbody: !a.getElementsByTagName("tbody").length,
            htmlSerialize: !! a.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: d.getAttribute("href") === "/a",
            opacity: /^0.55/.test(d.style.opacity),
            cssFloat: !! d.style.cssFloat,
            unknownElems: !! a.getElementsByTagName("nav").length,
            checkOn: g.value === "on",
            optSelected: f.selected,
            getSetAttribute: a.className !== "t",
            enctype: !! G.createElement("form").enctype,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, g.checked = !0, i.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, i.optDisabled = !f.disabled;
        try {
            delete a.test
        } catch (t) {
            i.deleteExpando = !1
        }!a.addEventListener && a.attachEvent && a.fireEvent && (a.attachEvent("onclick", function () {
            i.noCloneEvent = !1
        }), a.cloneNode(!0).fireEvent("onclick")), g = G.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), i.radioValue = g.value === "t", g.setAttribute("checked", "checked"), a.appendChild(g), j = G.createDocumentFragment(), j.appendChild(a.lastChild), i.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, a.innerHTML = "", a.style.width = a.style.paddingLeft = "1px", k = G.getElementsByTagName("body")[0], m = G.createElement(k ? "div" : "body"), n = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, k && J.extend(n, {
            position: "absolute",
            left: "-999px",
            top: "-999px"
        });
        for (r in n) m.style[r] = n[r];
        m.appendChild(a), l = k || b, l.insertBefore(m, l.firstChild), i.appendChecked = g.checked, i.boxModel = a.offsetWidth === 2, "zoom" in a.style && (a.style.display = "inline", a.style.zoom = 1, i.inlineBlockNeedsLayout = a.offsetWidth === 2, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", i.shrinkWrapBlocks = a.offsetWidth !== 2), a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", o = a.getElementsByTagName("td"), s = o[0].offsetHeight === 0, o[0].style.display = "", o[1].style.display = "none", i.reliableHiddenOffsets = s && o[0].offsetHeight === 0, a.innerHTML = "", G.defaultView && G.defaultView.getComputedStyle && (h = G.createElement("div"), h.style.width = "0", h.style.marginRight = "0", a.appendChild(h), i.reliableMarginRight = (parseInt((G.defaultView.getComputedStyle(h, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (a.attachEvent) for (r in {
            submit: 1,
            change: 1,
            focusin: 1
        }) q = "on" + r, s = q in a, s || (a.setAttribute(q, "return;"), s = typeof a[q] == "function"), i[r + "Bubbles"] = s;
        return J(function () {
            var a, b, c, d, e, f, g = 1,
                h = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
                j = "visibility:hidden;border:0;",
                l = "style='" + h + "border:5px solid #000;padding:0;'",
                n = "<div " + l + "><div></div></div>" + "<table " + l + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>";
            k = G.getElementsByTagName("body")[0], !k || (a = G.createElement("div"), a.style.cssText = j + "width:0;height:0;position:static;top:0;margin-top:" + g + "px", k.insertBefore(a, k.firstChild), m = G.createElement("div"), m.style.cssText = h + j, m.innerHTML = n, a.appendChild(m), b = m.firstChild, c = b.firstChild, e = b.nextSibling.firstChild.firstChild, f = {
                doesNotAddBorder: c.offsetTop !== 5,
                doesAddBorderForTableAndCells: e.offsetTop === 5
            }, c.style.position = "fixed", c.style.top = "20px", f.fixedPosition = c.offsetTop === 20 || c.offsetTop === 15, c.style.position = c.style.top = "", b.style.overflow = "hidden", b.style.position = "relative", f.subtractsBorderForOverflowNotVisible = c.offsetTop === -5, f.doesNotIncludeMarginInBodyOffset = k.offsetTop !== g, k.removeChild(a), m = a = null, J.extend(i, f))
        }), m.innerHTML = "", l.removeChild(m), m = j = e = f = k = h = a = g = null, i
    }(), J.boxModel = J.support.boxModel;
    var M = /^(?:\{.*\}|\[.*\])$/,
        N = /([A-Z])/g;
    J.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (J.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (a) {
            return a = a.nodeType ? J.cache[a[J.expando]] : a[J.expando], !! a && !D(a)
        },
        data: function (a, c, d, e) {
            if ( !! J.acceptData(a)) {
                var f, g, h, i = J.expando,
                    j = typeof c == "string",
                    k = a.nodeType,
                    l = k ? J.cache : a,
                    m = k ? a[J.expando] : a[J.expando] && J.expando,
                    n = c === "events";
                if ((!m || !l[m] || !n && !e && !l[m].data) && j && d === b) return;
                m || (k ? a[J.expando] = m = ++J.uuid : m = J.expando), l[m] || (l[m] = {}, k || (l[m].toJSON = J.noop));
                if (typeof c == "object" || typeof c == "function") e ? l[m] = J.extend(l[m], c) : l[m].data = J.extend(l[m].data, c);
                return f = g = l[m], e || (g.data || (g.data = {}), g = g.data), d !== b && (g[J.camelCase(c)] = d), n && !g[c] ? f.events : (j ? (h = g[c], h == null && (h = g[J.camelCase(c)])) : h = g, h)
            }
        },
        removeData: function (a, b, c) {
            if ( !! J.acceptData(a)) {
                var d, e, f, g = J.expando,
                    h = a.nodeType,
                    i = h ? J.cache : a,
                    j = h ? a[J.expando] : J.expando;
                if (!i[j]) return;
                if (b) {
                    d = c ? i[j] : i[j].data;
                    if (d) {
                        J.isArray(b) ? b = b : b in d ? b = [b] : (b = J.camelCase(b), b in d ? b = [b] : b = b.split(" "));
                        for (e = 0, f = b.length; e < f; e++) delete d[b[e]];
                        if (!(c ? D : J.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete i[j].data;
                    if (!D(i[j])) return
                }
                J.support.deleteExpando || !i.setInterval ? delete i[j] : i[j] = null, h && (J.support.deleteExpando ? delete a[J.expando] : a.removeAttribute ? a.removeAttribute(J.expando) : a[J.expando] = null)
            }
        },
        _data: function (a, b, c) {
            return J.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = J.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), J.fn.extend({
        data: function (a, c) {
            var d, e, f, g = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    g = J.data(this[0]);
                    if (this[0].nodeType === 1 && !J._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var h = 0, i = e.length; h < i; h++) f = e[h].name, f.indexOf("data-") === 0 && (f = J.camelCase(f.substring(5)), E(this[0], f, g[f]));
                        J._data(this[0], "parsedAttrs", !0)
                    }
                }
                return g
            }
            return typeof a == "object" ? this.each(function () {
                J.data(this, a)
            }) : (d = a.split("."), d[1] = d[1] ? "." + d[1] : "", c === b ? (g = this.triggerHandler("getData" + d[1] + "!", [d[0]]), g === b && this.length && (g = J.data(this[0], a), g = E(this[0], a, g)), g === b && d[1] ? this.data(d[0]) : g) : this.each(function () {
                var b = J(this),
                    e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e), J.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
            }))
        },
        removeData: function (a) {
            return this.each(function () {
                J.removeData(this, a)
            })
        }
    }), J.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", J._data(a, b, (J._data(a, b) || 0) + 1))
        },
        _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (J._data(b, d) || 1) - 1;
                e ? J._data(b, d, e) : (J.removeData(b, d, !0), C(b, c, "mark"))
            }
        },
        queue: function (a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = J._data(a, b), c && (!d || J.isArray(c) ? d = J._data(a, b, J.makeArray(c)) : d.push(c)), d || []
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = J.queue(a, b),
                d = c.shift(),
                e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), J._data(a, b + ".run", e), d.call(a, function () {
                J.dequeue(a, b)
            }, e)), c.length || (J.removeData(a, b + "queue " + b + ".run", !0), C(a, b, "queue"))
        }
    }), J.fn.extend({
        queue: function (a, c) {
            return typeof a != "string" && (c = a, a = "fx"), c === b ? J.queue(this[0], a) : this.each(function () {
                var b = J.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && J.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                J.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            return a = J.fx ? J.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        },
        promise: function (a, c) {
            function d() {
                --h || e.resolveWith(f, [f])
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var e = J.Deferred(),
                f = this,
                g = f.length,
                h = 1,
                i = a + "defer",
                j = a + "queue",
                k = a + "mark",
                l;
            while (g--) if (l = J.data(f[g], i, b, !0) || (J.data(f[g], j, b, !0) || J.data(f[g], k, b, !0)) && J.data(f[g], i, J.Callbacks("once memory"), !0)) h++, l.add(d);
            return d(), e.promise()
        }
    });
    var O = /[\n\t\r]/g,
        P = /\s+/,
        Q = /\r/g,
        R = /^(?:button|input)$/i,
        S = /^(?:button|input|object|select|textarea)$/i,
        T = /^a(?:rea)?$/i,
        U = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        V = J.support.getSetAttribute,
        W, X, Y;
    J.fn.extend({
        attr: function (a, b) {
            return J.access(this, a, b, !0, J.attr)
        },
        removeAttr: function (a) {
            return this.each(function () {
                J.removeAttr(this, a)
            })
        },
        prop: function (a, b) {
            return J.access(this, a, b, !0, J.prop)
        },
        removeProp: function (a) {
            return a = J.propFix[a] || a, this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function (a) {
            var b, c, d, e, f, g, h;
            if (J.isFunction(a)) return this.each(function (b) {
                J(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(P);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a;
                    else {
                        f = " " + e.className + " ";
                        for (g = 0, h = b.length; g < h; g++)~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
                        e.className = J.trim(f)
                    }
                }
            }
            return this
        },
        removeClass: function (a) {
            var c, d, e, f, g, h, i;
            if (J.isFunction(a)) return this.each(function (b) {
                J(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(P);
                for (d = 0, e = this.length; d < e; d++) {
                    f = this[d];
                    if (f.nodeType === 1 && f.className) if (a) {
                        g = (" " + f.className + " ").replace(O, " ");
                        for (h = 0, i = c.length; h < i; h++) g = g.replace(" " + c[h] + " ", " ");
                        f.className = J.trim(g)
                    } else f.className = ""
                }
            }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a,
                d = typeof b == "boolean";
            return J.isFunction(a) ? this.each(function (c) {
                J(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function () {
                if (c === "string") {
                    var e, f = 0,
                        g = J(this),
                        h = b,
                        i = a.split(P);
                    while (e = i[f++]) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && J._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : J._data(this, "__className__") || ""
            })
        },
        hasClass: function (a) {
            var b = " " + a + " ",
                c = 0,
                d = this.length;
            for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(O, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function (a) {
            var c, d, e, f = this[0];
            if (!arguments.length) return f ? (c = J.valHooks[f.nodeName.toLowerCase()] || J.valHooks[f.type], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, typeof d == "string" ? d.replace(Q, "") : d == null ? "" : d)) : b;
            return e = J.isFunction(a), this.each(function (d) {
                var f = J(this),
                    g;
                if (this.nodeType === 1) {
                    e ? g = a.call(this, d, f.val()) : g = a, g == null ? g = "" : typeof g == "number" ? g += "" : J.isArray(g) && (g = J.map(g, function (a) {
                        return a == null ? "" : a + ""
                    })), c = J.valHooks[this.nodeName.toLowerCase()] || J.valHooks[this.type];
                    if (!c || !("set" in c) || c.set(this, g, "value") === b) this.value = g
                }
            })
        }
    }), J.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function (a) {
                    var b, c, d, e, f = a.selectedIndex,
                        g = [],
                        h = a.options,
                        i = a.type === "select-one";
                    if (f < 0) return null;
                    c = i ? f : 0, d = i ? f + 1 : h.length;
                    for (; c < d; c++) {
                        e = h[c];
                        if (e.selected && (J.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !J.nodeName(e.parentNode, "optgroup"))) {
                            b = J(e).val();
                            if (i) return b;
                            g.push(b)
                        }
                    }
                    return i && !g.length && h.length ? J(h[f]).val() : g
                },
                set: function (a, b) {
                    var c = J.makeArray(b);
                    return J(a).find("option").each(function () {
                        this.selected = J.inArray(J(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1), c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function (a, c, d, e) {
            var f, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2) return b;
            if (e && c in J.attrFn) return J(a)[c](d);
            if ("getAttribute" in a) return h = i !== 1 || !J.isXMLDoc(a), h && (c = c.toLowerCase(), g = J.attrHooks[c] || (U.test(c) ? X : W)), d !== b ? d === null ? (J.removeAttr(a, c), b) : g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d) : g && "get" in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c), f === null ? b : f);
            return J.prop(a, c, d)
        },
        removeAttr: function (a, b) {
            var c, d, e, f, g = 0;
            if (a.nodeType === 1) {
                d = (b || "").split(P), f = d.length;
                for (; g < f; g++) e = d[g].toLowerCase(), c = J.propFix[e] || e, J.attr(a, e, ""), a.removeAttribute(V ? e : c), U.test(e) && c in a && (a[c] = !1)
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (R.test(a.nodeName) && a.parentNode) J.error("type property can't be changed");
                    else if (!J.support.radioValue && b === "radio" && J.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            },
            value: {
                get: function (a, b) {
                    return W && J.nodeName(a, "button") ? W.get(a, b) : b in a ? a.value : null
                },
                set: function (a, b, c) {
                    if (W && J.nodeName(a, "button")) return W.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, f, g, h = a.nodeType;
            return !a || h === 3 || h === 8 || h === 2 ? b : (g = h !== 1 || !J.isXMLDoc(a), g && (c = J.propFix[c] || c, f = J.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c])
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : S.test(a.nodeName) || T.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), J.attrHooks.tabindex = J.propHooks.tabIndex, X = {
        get: function (a, c) {
            var d, e = J.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function (a, b, c) {
            var d;
            return b === !1 ? J.removeAttr(a, c) : (d = J.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
        }
    }, V || (Y = {
        name: !0,
        id: !0
    }, W = J.valHooks.button = {
        get: function (a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (Y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        },
        set: function (a, b, c) {
            var d = a.getAttributeNode(c);
            return d || (d = G.createAttribute(c), a.setAttributeNode(d)), d.nodeValue = b + ""
        }
    }, J.attrHooks.tabindex.set = W.set, J.each(["width", "height"], function (a, b) {
        J.attrHooks[b] = J.extend(J.attrHooks[b], {
            set: function (a, c) {
                if (c === "") return a.setAttribute(b, "auto"), c
            }
        })
    }), J.attrHooks.contenteditable = {
        get: W.get,
        set: function (a, b, c) {
            b === "" && (b = "false"), W.set(a, b, c)
        }
    }), J.support.hrefNormalized || J.each(["href", "src", "width", "height"], function (a, c) {
        J.attrHooks[c] = J.extend(J.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), J.support.style || (J.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), J.support.optSelected || (J.propHooks.selected = J.extend(J.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    })), J.support.enctype || (J.propFix.enctype = "encoding"), J.support.checkOn || J.each(["radio", "checkbox"], function () {
        J.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), J.each(["radio", "checkbox"], function () {
        J.valHooks[this] = J.extend(J.valHooks[this], {
            set: function (a, b) {
                if (J.isArray(b)) return a.checked = J.inArray(J(a).val(), b) >= 0
            }
        })
    });
    var Z = /\.(.*)$/,
        $ = /^(?:textarea|input|select)$/i,
        _ = /\./g,
        ba = / /g,
        bb = /[^\w\s.|`]/g,
        bc = /^([^\.]*)?(?:\.(.+))?$/,
        bd = /\bhover(\.\S+)?/,
        be = /^key/,
        bf = /^(?:mouse|contextmenu)|click/,
        bg = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        bh = function (a) {
            var b = bg.exec(a);
            return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b
        },
        bi = function (a, b) {
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || a.id === b[2]) && (!b[3] || b[3].test(a.className))
        },
        bj = function (a) {
            return J.event.special.hover ? a : a.replace(bd, "mouseenter$1 mouseleave$1")
        };
    J.event = {
        add: function (a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q, r;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = J._data(a)))) {
                d.handler && (o = d, d = o.handler), d.guid || (d.guid = J.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function (a) {
                    return typeof J != "undefined" && (!a || J.event.triggered !== a.type) ? J.event.dispatch.apply(h.elem, arguments) : b
                }, h.elem = a), c = bj(c).split(" ");
                for (j = 0; j < c.length; j++) {
                    k = bc.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), r = J.event.special[l] || {}, l = (f ? r.delegateType : r.bindType) || l, r = J.event.special[l] || {}, n = J.extend({
                        type: l,
                        origType: k[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: f,
                        namespace: m.join(".")
                    }, o), f && (n.quick = bh(f), !n.quick && J.expr.match.POS.test(f) && (n.isPositional = !0)), q = i[l];
                    if (!q) {
                        q = i[l] = [], q.delegateCount = 0;
                        if (!r.setup || r.setup.call(a, e, m, h) === !1) a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h)
                    }
                    r.add && (r.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? q.splice(q.delegateCount++, 0, n) : q.push(n), J.event.global[l] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d) {
            var e = J.hasData(a) && J._data(a),
                f, g, h, i, j, k, l, m, n, o, p;
            if ( !! e && !! (l = e.events)) {
                b = bj(b || "").split(" ");
                for (f = 0; f < b.length; f++) {
                    g = bc.exec(b[f]) || [], h = g[1], i = g[2];
                    if (!h) {
                        i = i ? "." + i : "";
                        for (k in l) J.event.remove(a, k + i, c, d);
                        return
                    }
                    m = J.event.special[h] || {}, h = (d ? m.delegateType : m.bindType) || h, o = l[h] || [], j = o.length, i = i ? new RegExp("(^|\\.)" + i.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    if (c || i || d || m.remove) for (k = 0; k < o.length; k++) {
                        p = o[k];
                        if (!c || c.guid === p.guid) if (!i || i.test(p.namespace)) if (!d || d === p.selector || d === "**" && p.selector) o.splice(k--, 1), p.selector && o.delegateCount--, m.remove && m.remove.call(a, p)
                    } else o.length = 0;
                    o.length === 0 && j !== o.length && ((!m.teardown || m.teardown.call(a, i) === !1) && J.removeEvent(a, h, e.handle), delete l[h])
                }
                J.isEmptyObject(l) && (n = e.handle, n && (n.elem = null), J.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (c, d, e, f) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var g = c.type || c,
                    h = [],
                    i, j, k, l, m, n, o, p, q, r;
                g.indexOf("!") >= 0 && (g = g.slice(0, -1), j = !0), g.indexOf(".") >= 0 && (h = g.split("."), g = h.shift(), h.sort());
                if ((!e || J.event.customEvent[g]) && !J.event.global[g]) return;
                c = typeof c == "object" ? c[J.expando] ? c : new J.Event(g, c) : new J.Event(g), c.type = g, c.isTrigger = !0, c.exclusive = j, c.namespace = h.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, n = g.indexOf(":") < 0 ? "on" + g : "", (f || !e) && c.preventDefault();
                if (!e) {
                    i = J.cache;
                    for (k in i) i[k].events && i[k].events[g] && J.event.trigger(c, d, i[k].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? J.makeArray(d) : [], d.unshift(c), o = J.event.special[g] || {};
                if (o.trigger && o.trigger.apply(e, d) === !1) return;
                q = [
                    [e, o.bindType || g]
                ];
                if (!f && !o.noBubble && !J.isWindow(e)) {
                    r = o.delegateType || g, m = null;
                    for (l = e.parentNode; l; l = l.parentNode) q.push([l, r]), m = l;
                    m && m === e.ownerDocument && q.push([m.defaultView || m.parentWindow || a, r])
                }
                for (k = 0; k < q.length; k++) {
                    l = q[k][0], c.type = q[k][1], p = (J._data(l, "events") || {})[c.type] && J._data(l, "handle"), p && p.apply(l, d), p = n && l[n], p && J.acceptData(l) && p.apply(l, d);
                    if (c.isPropagationStopped()) break
                }
                return c.type = g, c.isDefaultPrevented() || (!o._default || o._default.apply(e.ownerDocument, d) === !1) && (g !== "click" || !J.nodeName(e, "a")) && J.acceptData(e) && n && e[g] && (g !== "focus" && g !== "blur" || c.target.offsetWidth !== 0) && !J.isWindow(e) && (m = e[n], m && (e[n] = null), J.event.triggered = g, e[g](), J.event.triggered = b, m && (e[n] = m)), c.result
            }
        },
        dispatch: function (c) {
            c = J.event.fix(c || a.event);
            var d = (J._data(this, "events") || {})[c.type] || [],
                e = d.delegateCount,
                f = [].slice.call(arguments, 0),
                g = !c.exclusive && !c.namespace,
                h = (J.event.special[c.type] || {}).handle,
                i = [],
                j, k, l, m, n, o, p, q, r, s, t;
            f[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) for (l = c.target; l != this; l = l.parentNode || this) {
                n = {}, p = [];
                for (j = 0; j < e; j++) q = d[j], r = q.selector, s = n[r], q.isPositional ? s = (s || (n[r] = J(r))).index(l) >= 0 : s === b && (s = n[r] = q.quick ? bi(l, q.quick) : J(l).is(r)), s && p.push(q);
                p.length && i.push({
                    elem: l,
                    matches: p
                })
            }
            d.length > e && i.push({
                elem: this,
                matches: d.slice(e)
            });
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                o = i[j], c.currentTarget = o.elem;
                for (k = 0; k < o.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    q = o.matches[k];
                    if (g || !c.namespace && !q.namespace || c.namespace_re && c.namespace_re.test(q.namespace)) c.data = q.data, c.handleObj = q, m = (h || q.handler).apply(o.elem, f), m !== b && (c.result = m, m === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "),
            filter: function (a, c) {
                var d, e, f, g = c.button,
                    h = c.fromElement;
                return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || G, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), a
            }
        },
        fix: function (a) {
            if (a[J.expando]) return a;
            var c, d, e = a,
                f = J.event.fixHooks[a.type] || {},
                g = f.props ? this.props.concat(f.props) : this.props;
            a = J.Event(e);
            for (c = g.length; c;) d = g[--c], a[d] = e[d];
            return a.target || (a.target = e.srcElement || G), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), f.filter ? f.filter(a, e) : a
        },
        special: {
            ready: {
                setup: J.bindReady
            },
            focus: {
                delegateType: "focusin",
                noBubble: !0
            },
            blur: {
                delegateType: "focusout",
                noBubble: !0
            },
            beforeunload: {
                setup: function (a, b, c) {
                    J.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = J.extend(new J.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? J.event.trigger(e, null, b) : J.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, J.event.handle = J.event.dispatch, J.removeEvent = G.removeEventListener ?
    function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, J.Event = function (a, b) {
        if (this instanceof J.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? A : B) : this.type = a, b && J.extend(this, b), this.timeStamp = a && a.timeStamp || J.now(), this[J.expando] = !0;
        else return new J.Event(a, b)
    }, J.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = A;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function () {
            this.isPropagationStopped = A;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = A, this.stopPropagation()
        },
        isDefaultPrevented: B,
        isPropagationStopped: B,
        isImmediatePropagationStopped: B
    }, J.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        J.event.special[a] = J.event.special[b] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var b = this,
                    c = a.relatedTarget,
                    d = a.handleObj,
                    e = d.selector,
                    f, g;
                if (!c || d.origType === a.type || c !== b && !J.contains(b, c)) f = a.type, a.type = d.origType, g = d.handler.apply(this, arguments), a.type = f;
                return g
            }
        }
    }), J.support.submitBubbles || (J.event.special.submit = {
        setup: function () {
            if (J.nodeName(this, "form")) return !1;
            J.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target,
                    d = J.nodeName(c, "input") || J.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (J.event.add(d, "submit._submit", function (a) {
                    this.parentNode && J.event.simulate("submit", this.parentNode, a, !0)
                }), d._submit_attached = !0)
            })
        },
        teardown: function () {
            if (J.nodeName(this, "form")) return !1;
            J.event.remove(this, "._submit")
        }
    }), J.support.changeBubbles || (J.event.special.change = {
        setup: function () {
            if ($.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") J.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), J.event.add(this, "click._change", function (a) {
                    this._just_changed && (this._just_changed = !1, J.event.simulate("change", this, a, !0))
                });
                return !1
            }
            J.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                $.test(b.nodeName) && !b._change_attached && (J.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && J.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        },
        handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function () {
            return J.event.remove(this, "._change"), $.test(this.nodeName)
        }
    }), J.support.focusinBubbles || J.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        var c = 0,
            d = function (a) {
                J.event.simulate(b, a.target, J.event.fix(a), !0)
            };
        J.event.special[b] = {
            setup: function () {
                c++ === 0 && G.addEventListener(a, d, !0)
            },
            teardown: function () {
                --c === 0 && G.removeEventListener(a, d, !0)
            }
        }
    }), J.fn.extend({
        on: function (a, c, d, e, f) {
            var g, h;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (h in a) this.on(h, c, d, a[h], f);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = B;
            else if (!e) return this;
            return f === 1 && (g = e, e = function (a) {
                return J().off(a), g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = J.guid++)), this.each(function () {
                J.event.add(this, a, e, d, c)
            })
        },
        one: function (a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        },
        off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                return J(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler), this
            }
            if (typeof a == "object") {
                for (var f in a) this.off(f, c, a[f]);
                return this
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            return d === !1 && (d = B), this.each(function () {
                J.event.remove(this, a, d, c)
            })
        },
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function (a, b) {
            return this.off(a, null, b)
        },
        live: function (a, b, c) {
            return J(this.context).on(a, this.selector, b, c), this
        },
        die: function (a, b) {
            return J(this.context).off(a, this.selector || "**", b), this
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        },
        trigger: function (a, b) {
            return this.each(function () {
                J.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            if (this[0]) return J.event.trigger(a, b, this[0], !0)
        },
        toggle: function (a) {
            var b = arguments,
                c = a.guid || J.guid++,
                d = 0,
                e = function (c) {
                    var e = (J._data(this, "lastToggle" + a.guid) || 0) % d;
                    return J._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
                };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e)
        },
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        J.fn[b] = function (a, c) {
            return c == null && (c = a, a = null), arguments.length > 0 ? this.bind(b, a, c) : this.trigger(b)
        }, J.attrFn && (J.attrFn[b] = !0), be.test(b) && (J.event.fixHooks[b] = J.event.keyHooks), bf.test(b) && (J.event.fixHooks[b] = J.event.mouseHooks)
    }), function () {
        function a(a, b, c, d, f, g) {
            for (var h = 0, i = d.length; h < i; h++) {
                var j = d[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[e] === c) {
                            k = d[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[e] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    d[h] = k
                }
            }
        }
        function c(a, b, c, d, f, g) {
            for (var h = 0, i = d.length; h < i; h++) {
                var j = d[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[e] === c) {
                            k = d[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[e] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    d[h] = k
                }
            }
        }
        var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            e = "sizcache" + (Math.random() + "").replace(".", ""),
            f = 0,
            g = Object.prototype.toString,
            h = !1,
            i = !0,
            j = /\\/g,
            k = /\r\n/g,
            l = /\W/;
        [0, 0].sort(function () {
            return i = !1, 0
        });
        var m = function (a, b, c, e) {
                c = c || [], b = b || G;
                var f = b;
                if (b.nodeType !== 1 && b.nodeType !== 9) return [];
                if (!a || typeof a != "string") return c;
                var h, i, j, k, l, n, q, r, t = !0,
                    u = m.isXML(b),
                    v = [],
                    x = a;
                do {
                    d.exec(""), h = d.exec(x);
                    if (h) {
                        x = h[3], v.push(h[1]);
                        if (h[2]) {
                            k = h[3];
                            break
                        }
                    }
                } while (h);
                if (v.length > 1 && p.exec(a)) if (v.length === 2 && o.relative[v[0]]) i = w(v[0] + v[1], b, e);
                else {
                    i = o.relative[v[0]] ? [b] : m(v.shift(), b);
                    while (v.length) a = v.shift(), o.relative[a] && (a += v.shift()), i = w(a, i, e)
                } else {
                    !e && v.length > 1 && b.nodeType === 9 && !u && o.match.ID.test(v[0]) && !o.match.ID.test(v[v.length - 1]) && (l = m.find(v.shift(), b, u), b = l.expr ? m.filter(l.expr, l.set)[0] : l.set[0]);
                    if (b) {
                        l = e ? {
                            expr: v.pop(),
                            set: s(e)
                        } : m.find(v.pop(), v.length === 1 && (v[0] === "~" || v[0] === "+") && b.parentNode ? b.parentNode : b, u), i = l.expr ? m.filter(l.expr, l.set) : l.set, v.length > 0 ? j = s(i) : t = !1;
                        while (v.length) n = v.pop(), q = n, o.relative[n] ? q = v.pop() : n = "", q == null && (q = b), o.relative[n](j, q, u)
                    } else j = v = []
                }
                j || (j = i), j || m.error(n || a);
                if (g.call(j) === "[object Array]") if (!t) c.push.apply(c, j);
                else if (b && b.nodeType === 1) for (r = 0; j[r] != null; r++) j[r] && (j[r] === !0 || j[r].nodeType === 1 && m.contains(b, j[r])) && c.push(i[r]);
                else for (r = 0; j[r] != null; r++) j[r] && j[r].nodeType === 1 && c.push(i[r]);
                else s(j, c);
                return k && (m(k, f, c, e), m.uniqueSort(c)), c
            };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
                set: d,
                expr: a
            }
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a,
                r = [],
                s = c,
                t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\") continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f) g = i = !0;
                        else if (f === !0) continue
                    }
                    if (f) for (n = 0;
                    (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g) return [];
                        break
                    }
                }
                if (a === q) if (g == null) m.error(a);
                else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw "Syntax error, unrecognized expression: " + a
        };
        var n = m.getText = function (a) {
                var b, c, d = a.nodeType,
                    e = "";
                if (d) {
                    if (d === 1) {
                        if (typeof a.textContent == "string") return a.textContent;
                        if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                        for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                    } else if (d === 3 || d === 4) return a.nodeValue
                } else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
                return e
            },
            o = m.selectors = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function (a) {
                        return a.getAttribute("href")
                    },
                    type: function (a) {
                        return a.getAttribute("type")
                    }
                },
                relative: {
                    "+": function (a, b) {
                        var c = typeof b == "string",
                            d = c && !l.test(b),
                            e = c && !d;
                        d && (b = b.toLowerCase());
                        for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                            while ((h = h.previousSibling) && h.nodeType !== 1);
                            a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                        }
                        e && m.filter(b, a, !0)
                    },
                    ">": function (a, b) {
                        var c, d = typeof b == "string",
                            e = 0,
                            f = a.length;
                        if (d && !l.test(b)) {
                            b = b.toLowerCase();
                            for (; e < f; e++) {
                                c = a[e];
                                if (c) {
                                    var g = c.parentNode;
                                    a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                }
                            }
                        } else {
                            for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                            d && m.filter(b, a, !0)
                        }
                    },
                    "": function (b, d, e) {
                        var g, h = f++,
                            i = a;
                        typeof d == "string" && !l.test(d) && (d = d.toLowerCase(), g = d, i = c), i("parentNode", d, h, b, g, e)
                    },
                    "~": function (b, d, e) {
                        var g, h = f++,
                            i = a;
                        typeof d == "string" && !l.test(d) && (d = d.toLowerCase(), g = d, i = c), i("previousSibling", d, h, b, g, e)
                    }
                },
                find: {
                    ID: function (a, b, c) {
                        if (typeof b.getElementById != "undefined" && !c) {
                            var d = b.getElementById(a[1]);
                            return d && d.parentNode ? [d] : []
                        }
                    },
                    NAME: function (a, b) {
                        if (typeof b.getElementsByName != "undefined") {
                            var c = [],
                                d = b.getElementsByName(a[1]);
                            for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                            return c.length === 0 ? null : c
                        }
                    },
                    TAG: function (a, b) {
                        if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                    }
                },
                preFilter: {
                    CLASS: function (a, b, c, d, e, f) {
                        a = " " + a[1].replace(j, "") + " ";
                        if (f) return a;
                        for (var g = 0, h;
                        (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                        return !1
                    },
                    ID: function (a) {
                        return a[1].replace(j, "")
                    },
                    TAG: function (a, b) {
                        return a[1].replace(j, "").toLowerCase()
                    },
                    CHILD: function (a) {
                        if (a[1] === "nth") {
                            a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                            var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                            a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                        } else a[2] && m.error(a[0]);
                        return a[0] = f++, a
                    },
                    ATTR: function (a, b, c, d, e, f) {
                        var g = a[1] = a[1].replace(j, "");
                        return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a
                    },
                    PSEUDO: function (a, b, c, e, f) {
                        if (a[1] === "not") if ((d.exec(a[3]) || "").length > 1 || /^\w/.test(a[3])) a[3] = m(a[3], null, null, b);
                        else {
                            var g = m.filter(a[3], b, c, !0 ^ f);
                            return c || e.push.apply(e, g), !1
                        } else if (o.match.POS.test(a[0]) || o.match.CHILD.test(a[0])) return !0;
                        return a
                    },
                    POS: function (a) {
                        return a.unshift(!0), a
                    }
                },
                filters: {
                    enabled: function (a) {
                        return a.disabled === !1 && a.type !== "hidden"
                    },
                    disabled: function (a) {
                        return a.disabled === !0
                    },
                    checked: function (a) {
                        return a.checked === !0
                    },
                    selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },
                    parent: function (a) {
                        return !!a.firstChild
                    },
                    empty: function (a) {
                        return !a.firstChild
                    },
                    has: function (a, b, c) {
                        return !!m(c[3], a).length
                    },
                    header: function (a) {
                        return /h\d/i.test(a.nodeName)
                    },
                    text: function (a) {
                        var b = a.getAttribute("type"),
                            c = a.type;
                        return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                    },
                    radio: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                    },
                    checkbox: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                    },
                    file: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "file" === a.type
                    },
                    password: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "password" === a.type
                    },
                    submit: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return (b === "input" || b === "button") && "submit" === a.type
                    },
                    image: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "image" === a.type
                    },
                    reset: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return (b === "input" || b === "button") && "reset" === a.type
                    },
                    button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return b === "input" && "button" === a.type || b === "button"
                    },
                    input: function (a) {
                        return /input|select|textarea|button/i.test(a.nodeName)
                    },
                    focus: function (a) {
                        return a === a.ownerDocument.activeElement
                    }
                },
                setFilters: {
                    first: function (a, b) {
                        return b === 0
                    },
                    last: function (a, b, c, d) {
                        return b === d.length - 1
                    },
                    even: function (a, b) {
                        return b % 2 === 0
                    },
                    odd: function (a, b) {
                        return b % 2 === 1
                    },
                    lt: function (a, b, c) {
                        return b < c[3] - 0
                    },
                    gt: function (a, b, c) {
                        return b > c[3] - 0
                    },
                    nth: function (a, b, c) {
                        return c[3] - 0 === b
                    },
                    eq: function (a, b, c) {
                        return c[3] - 0 === b
                    }
                },
                filter: {
                    PSEUDO: function (a, b, c, d) {
                        var e = b[1],
                            f = o.filters[e];
                        if (f) return f(a, c, b, d);
                        if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                        if (e === "not") {
                            var g = b[3];
                            for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
                            return !0
                        }
                        m.error(e)
                    },
                    CHILD: function (a, b) {
                        var c, d, f, g, h, i, j, k = b[1],
                            l = a;
                        switch (k) {
                        case "only":
                        case "first":
                            while (l = l.previousSibling) if (l.nodeType === 1) return !1;
                            if (k === "first") return !0;
                            l = a;
                        case "last":
                            while (l = l.nextSibling) if (l.nodeType === 1) return !1;
                            return !0;
                        case "nth":
                            c = b[2], d = b[3];
                            if (c === 1 && d === 0) return !0;
                            f = b[0], g = a.parentNode;
                            if (g && (g[e] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                g[e] = f
                            }
                            return j = a.nodeIndex - d, c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                        }
                    },
                    ID: function (a, b) {
                        return a.nodeType === 1 && a.getAttribute("id") === b
                    },
                    TAG: function (a, b) {
                        return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
                    },
                    CLASS: function (a, b) {
                        return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                    },
                    ATTR: function (a, b) {
                        var c = b[1],
                            d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                            e = d + "",
                            f = b[2],
                            g = b[4];
                        return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                    },
                    POS: function (a, b, c, d) {
                        var e = b[2],
                            f = o.setFilters[e];
                        if (f) return f(a, c, b, d)
                    }
                }
            },
            p = o.match.POS,
            q = function (a, b) {
                return "\\" + (b - 0 + 1)
            };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function (a, b) {
                return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a
            };
        try {
            Array.prototype.slice.call(G.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0,
                    d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]);
                else for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var u, v;
        G.documentElement.compareDocumentPosition ? u = function (a, b) {
            return a === b ? (h = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) return h = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [],
                f = [],
                g = a.parentNode,
                i = b.parentNode,
                j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = G.createElement("div"),
                c = "script" + (new Date).getTime(),
                d = G.documentElement;
            a.innerHTML = "<a name='" + c + "'/>", d.insertBefore(a, d.firstChild), G.getElementById(c) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), d.removeChild(a), d = a = null
        }(), function () {
            var a = G.createElement("div");
            a.appendChild(G.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), G.querySelectorAll &&
        function () {
            var a = m,
                b = G.createElement("div"),
                c = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, d, e, f) {
                    d = d || G;
                    if (!f && !m.isXML(d)) {
                        var g = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (g && (d.nodeType === 1 || d.nodeType === 9)) {
                            if (g[1]) return s(d.getElementsByTagName(b), e);
                            if (g[2] && o.find.CLASS && d.getElementsByClassName) return s(d.getElementsByClassName(g[2]), e)
                        }
                        if (d.nodeType === 9) {
                            if (b === "body" && d.body) return s([d.body], e);
                            if (g && g[3]) {
                                var h = d.getElementById(g[3]);
                                if (!h || !h.parentNode) return s([], e);
                                if (h.id === g[3]) return s([h], e)
                            }
                            try {
                                return s(d.querySelectorAll(b), e)
                            } catch (i) {}
                        } else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
                            var j = d,
                                k = d.getAttribute("id"),
                                l = k || c,
                                n = d.parentNode,
                                p = /^\s*[+~]/.test(b);
                            k ? l = l.replace(/'/g, "\\$&") : d.setAttribute("id", l), p && n && (d = d.parentNode);
                            try {
                                if (!p || n) return s(d.querySelectorAll("[id='" + l + "'] " + b), e)
                            } catch (q) {} finally {
                                k || j.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, d, e, f)
                };
                for (var d in a) m[d] = a[d];
                b = null
            }
        }(), function () {
            var a = G.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var c = !b.call(G.createElement("div"), "div"),
                    d = !1;
                try {
                    b.call(G.documentElement, "[test!='']:sizzle")
                } catch (e) {
                    d = !0
                }
                m.matchesSelector = function (a, e) {
                    e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (d || !o.match.PSEUDO.test(e) && !/!=/.test(e)) {
                            var f = b.call(a, e);
                            if (f || !c || a.document && a.document.nodeType !== 11) return f
                        }
                    } catch (g) {}
                    return m(e, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = G.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1) return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), G.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : G.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return !1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var w = function (a, b, c) {
                var d, e = [],
                    f = "",
                    g = b.nodeType ? [b] : b;
                while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
                a = o.relative[a] ? a + "*" : a;
                for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
                return m.filter(f, e)
            };
        m.attr = J.attr, m.selectors.attrMap = {}, J.find = m, J.expr = m.selectors, J.expr[":"] = J.expr.filters, J.unique = m.uniqueSort, J.text = m.getText, J.isXMLDoc = m.isXML, J.contains = m.contains
    }();
    var bk = /Until$/,
        bl = /^(?:parents|prevUntil|prevAll)/,
        bm = /,/,
        bn = /^.[^:#\[\.,]*$/,
        bo = Array.prototype.slice,
        bp = J.expr.match.POS,
        bq = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    J.fn.extend({
        find: function (a) {
            var b = this,
                c, d;
            if (typeof a != "string") return J(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++) if (J.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a),
                f, g, h;
            for (c = 0, d = this.length; c < d; c++) {
                f = e.length, J.find(a, this[c], e);
                if (c > 0) for (g = f; g < e.length; g++) for (h = 0; h < f; h++) if (e[h] === e[g]) {
                    e.splice(g--, 1);
                    break
                }
            }
            return e
        },
        has: function (a) {
            var b = J(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++) if (J.contains(this, b[a])) return !0
            })
        },
        not: function (a) {
            return this.pushStack(y(this, a, !1), "not", a)
        },
        filter: function (a) {
            return this.pushStack(y(this, a, !0), "filter", a)
        },
        is: function (a) {
            return !!a && (typeof a == "string" ? bp.test(a) ? J(a, this.context).index(this[0]) >= 0 : J.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function (a, b) {
            var c = [],
                d, e, f = this[0];
            if (J.isArray(a)) {
                var g = 1;
                while (f && f.ownerDocument && f !== b) {
                    for (d = 0; d < a.length; d++) J(f).is(a[d]) && c.push({
                        selector: a[d],
                        elem: f,
                        level: g
                    });
                    f = f.parentNode, g++
                }
                return c
            }
            var h = bp.test(a) || typeof a != "string" ? J(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                f = this[d];
                while (f) {
                    if (h ? h.index(f) > -1 : J.find.matchesSelector(f, a)) {
                        c.push(f);
                        break
                    }
                    f = f.parentNode;
                    if (!f || !f.ownerDocument || f === b || f.nodeType === 11) break
                }
            }
            return c = c.length > 1 ? J.unique(c) : c, this.pushStack(c, "closest", a)
        },
        index: function (a) {
            return a ? typeof a == "string" ? J.inArray(this[0], J(a)) : J.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function (a, b) {
            var c = typeof a == "string" ? J(a, b) : J.makeArray(a && a.nodeType ? [a] : a),
                d = J.merge(this.get(), c);
            return this.pushStack(z(c[0]) || z(d[0]) ? d : J.unique(d))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    }), J.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function (a) {
            return J.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, c) {
            return J.dir(a, "parentNode", c)
        },
        next: function (a) {
            return J.nth(a, 2, "nextSibling")
        },
        prev: function (a) {
            return J.nth(a, 2, "previousSibling")
        },
        nextAll: function (a) {
            return J.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return J.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, c) {
            return J.dir(a, "nextSibling", c)
        },
        prevUntil: function (a, b, c) {
            return J.dir(a, "previousSibling", c)
        },
        siblings: function (a) {
            return J.sibling(a.parentNode.firstChild, a)
        },
        children: function (a) {
            return J.sibling(a.firstChild)
        },
        contents: function (a) {
            return J.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : J.makeArray(a.childNodes)
        }
    }, function (a, b) {
        J.fn[a] = function (c, d) {
            var e = J.map(this, b, c),
                f = bo.call(arguments);
            return bk.test(a) || (d = c), d && typeof d == "string" && (e = J.filter(d, e)), e = this.length > 1 && !bq[a] ? J.unique(e) : e, (this.length > 1 || bm.test(d)) && bl.test(a) && (e = e.reverse()), this.pushStack(e, a, f.join(","))
        }
    }), J.extend({
        filter: function (a, b, c) {
            return c && (a = ":not(" + a + ")"), b.length === 1 ? J.find.matchesSelector(b[0], a) ? [b[0]] : [] : J.find.matches(a, b)
        },
        dir: function (a, c, d) {
            var e = [],
                f = a[c];
            while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !J(f).is(d))) f.nodeType === 1 && e.push(f), f = f[c];
            return e
        },
        nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var br = "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        bs = / jQuery\d+="(?:\d+|null)"/g,
        bt = /^\s+/,
        bu = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        bv = /<([\w:]+)/,
        bw = /<tbody/i,
        bx = /<|&#?\w+;/,
        by = /<(?:script|style)/i,
        bz = /<(?:script|object|embed|option|style)/i,
        bA = new RegExp("<(?:" + br.replace(" ", "|") + ")", "i"),
        bB = /checked\s*(?:[^=]|=\s*.checked.)/i,
        bC = /\/(java|ecma)script/i,
        bD = /^\s*<!(?:\[CDATA\[|\-\-)/,
        bE = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        bF = x(G);
    bE.optgroup = bE.option, bE.tbody = bE.tfoot = bE.colgroup = bE.caption = bE.thead, bE.th = bE.td, J.support.htmlSerialize || (bE._default = [1, "div<div>", "</div>"]), J.fn.extend({
        text: function (a) {
            return J.isFunction(a) ? this.each(function (b) {
                var c = J(this);
                c.text(a.call(this, b, c.text()))
            }) : typeof a != "object" && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(a)) : J.text(this)
        },
        wrapAll: function (a) {
            if (J.isFunction(a)) return this.each(function (b) {
                J(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = J(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            return J.isFunction(a) ? this.each(function (b) {
                J(this).wrapInner(a.call(this, b))
            }) : this.each(function () {
                var b = J(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            return this.each(function () {
                J(this).wrapAll(a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = J(arguments[0]);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, J(arguments[0]).toArray()), a
            }
        },
        remove: function (a, b) {
            for (var c = 0, d;
            (d = this[c]) != null; c++) if (!a || J.filter(a, [d]).length)!b && d.nodeType === 1 && (J.cleanData(d.getElementsByTagName("*")), J.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function () {
            for (var a = 0, b;
            (b = this[a]) != null; a++) {
                b.nodeType === 1 && J.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function (a, b) {
            return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function () {
                return J.clone(this, a, b)
            })
        },
        html: function (a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(bs, "") : null;
            if (typeof a == "string" && !by.test(a) && (J.support.leadingWhitespace || !bt.test(a)) && !bE[(bv.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(bu, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (J.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            } else J.isFunction(a) ? this.each(function (b) {
                var c = J(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            return this
        },
        replaceWith: function (a) {
            return this[0] && this[0].parentNode ? J.isFunction(a) ? this.each(function (b) {
                var c = J(this),
                    d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : (typeof a != "string" && (a = J(a).detach()), this.each(function () {
                var b = this.nextSibling,
                    c = this.parentNode;
                J(this).remove(), b ? J(b).before(a) : J(c).append(a)
            })) : this.length ? this.pushStack(J(J.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, c, d) {
            var e, f, g, h, i = a[0],
                j = [];
            if (!J.support.checkClone && arguments.length === 3 && typeof i == "string" && bB.test(i)) return this.each(function () {
                J(this).domManip(a, c, d, !0)
            });
            if (J.isFunction(i)) return this.each(function (e) {
                var f = J(this);
                a[0] = i.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
            });
            if (this[0]) {
                h = i && i.parentNode, J.support.parentNode && h && h.nodeType === 11 && h.childNodes.length === this.length ? e = {
                    fragment: h
                } : e = J.buildFragment(a, this, j), g = e.fragment, g.childNodes.length === 1 ? f = g = g.firstChild : f = g.firstChild;
                if (f) {
                    c = c && J.nodeName(f, "tr");
                    for (var k = 0, l = this.length, m = l - 1; k < l; k++) d.call(c ? w(this[k], f) : this[k], e.cacheable || l > 1 && k < m ? J.clone(g, !0, !0) : g)
                }
                j.length && J.each(j, q)
            }
            return this
        }
    }), J.buildFragment = function (a, b, c) {
        var d, e, f, g, h = a[0];
        return b && b[0] && (g = b[0].ownerDocument || b[0]), g.createDocumentFragment || (g = G), a.length === 1 && typeof h == "string" && h.length < 512 && g === G && h.charAt(0) === "<" && !bz.test(h) && (J.support.checkClone || !bB.test(h)) && !J.support.unknownElems && bA.test(h) && (e = !0, f = J.fragments[h], f && f !== 1 && (d = f)), d || (d = g.createDocumentFragment(), J.clean(a, g, d, c)), e && (J.fragments[h] = f ? d : 1), {
            fragment: d,
            cacheable: e
        }
    }, J.fragments = {}, J.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        J.fn[a] = function (c) {
            var d = [],
                e = J(c),
                f = this.length === 1 && this[0].parentNode;
            if (f && f.nodeType === 11 && f.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
            for (var g = 0, h = e.length; g < h; g++) {
                var i = (g > 0 ? this.clone(!0) : this).get();
                J(e[g])[b](i), d = d.concat(i)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), J.extend({
        clone: function (a, b, c) {
            var d = a.cloneNode(!0),
                e, f, g;
            if ((!J.support.noCloneEvent || !J.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !J.isXMLDoc(a)) {
                u(a, d), e = t(a), f = t(d);
                for (g = 0; e[g]; ++g) f[g] && u(e[g], f[g])
            }
            if (b) {
                v(a, d);
                if (c) {
                    e = t(a), f = t(d);
                    for (g = 0; e[g]; ++g) v(e[g], f[g])
                }
            }
            return e = f = null, d
        },
        clean: function (a, b, c, d) {
            var e;
            b = b || G, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || G);
            var f = [],
                g;
            for (var h = 0, i;
            (i = a[h]) != null; h++) {
                typeof i == "number" && (i += "");
                if (!i) continue;
                if (typeof i == "string") if (!bx.test(i)) i = b.createTextNode(i);
                else {
                    i = i.replace(bu, "<$1></$2>");
                    var j = (bv.exec(i) || ["", ""])[1].toLowerCase(),
                        k = bE[j] || bE._default,
                        l = k[0],
                        m = b.createElement("div");
                    b === G ? bF.appendChild(m) : x(b).appendChild(m), m.innerHTML = k[1] + i + k[2];
                    while (l--) m = m.lastChild;
                    if (!J.support.tbody) {
                        var n = bw.test(i),
                            o = j === "table" && !n ? m.firstChild && m.firstChild.childNodes : k[1] === "<table>" && !n ? m.childNodes : [];
                        for (g = o.length - 1; g >= 0; --g) J.nodeName(o[g], "tbody") && !o[g].childNodes.length && o[g].parentNode.removeChild(o[g])
                    }!J.support.leadingWhitespace && bt.test(i) && m.insertBefore(b.createTextNode(bt.exec(i)[0]), m.firstChild), i = m.childNodes
                }
                var p;
                if (!J.support.appendChecked) if (i[0] && typeof (p = i.length) == "number") for (g = 0; g < p; g++) r(i[g]);
                else r(i);
                i.nodeType ? f.push(i) : f = J.merge(f, i)
            }
            if (c) {
                e = function (a) {
                    return !a.type || bC.test(a.type)
                };
                for (h = 0; f[h]; h++) if (d && J.nodeName(f[h], "script") && (!f[h].type || f[h].type.toLowerCase() === "text/javascript")) d.push(f[h].parentNode ? f[h].parentNode.removeChild(f[h]) : f[h]);
                else {
                    if (f[h].nodeType === 1) {
                        var q = J.grep(f[h].getElementsByTagName("script"), e);
                        f.splice.apply(f, [h + 1, 0].concat(q))
                    }
                    c.appendChild(f[h])
                }
            }
            return f
        },
        cleanData: function (a) {
            var b, c, d = J.cache,
                e = J.event.special,
                f = J.support.deleteExpando;
            for (var g = 0, h;
            (h = a[g]) != null; g++) {
                if (h.nodeName && J.noData[h.nodeName.toLowerCase()]) continue;
                c = h[J.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var i in b.events) e[i] ? J.event.remove(h, i) : J.removeEvent(h, i, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    f ? delete h[J.expando] : h.removeAttribute && h.removeAttribute(J.expando), delete d[c]
                }
            }
        }
    });
    var bG = /alpha\([^)]*\)/i,
        bH = /opacity=([^)]*)/,
        bI = /([A-Z]|^ms)/g,
        bJ = /^-?\d+(?:px)?$/i,
        bK = /^-?\d/,
        bL = /^([\-+])=([\-+.\de]+)/,
        bM = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        bN = ["Left", "Right"],
        bO = ["Top", "Bottom"],
        bP, bQ, bR;
    J.fn.css = function (a, c) {
        return arguments.length === 2 && c === b ? this : J.access(this, a, c, !0, function (a, c, d) {
            return d !== b ? J.style(a, c, d) : J.css(a, c)
        })
    }, J.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = bP(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": J.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (a, c, d, e) {
            if ( !! a && a.nodeType !== 3 && a.nodeType !== 8 && !! a.style) {
                var f, g, h = J.camelCase(c),
                    i = a.style,
                    j = J.cssHooks[h];
                c = J.cssProps[h] || h;
                if (d === b) return j && "get" in j && (f = j.get(a, !1, e)) !== b ? f : i[c];
                g = typeof d, g === "string" && (f = bL.exec(d)) && (d = +(f[1] + 1) * +f[2] + parseFloat(J.css(a, c)), g = "number");
                if (d == null || g === "number" && isNaN(d)) return;
                g === "number" && !J.cssNumber[h] && (d += "px");
                if (!j || !("set" in j) || (d = j.set(a, d)) !== b) try {
                    i[c] = d
                } catch (k) {}
            }
        },
        css: function (a, c, d) {
            var e, f;
            c = J.camelCase(c), f = J.cssHooks[c], c = J.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (f && "get" in f && (e = f.get(a, !0, d)) !== b) return e;
            if (bP) return bP(a, c)
        },
        swap: function (a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        }
    }), J.curCSS = J.css, J.each(["height", "width"], function (a, b) {
        J.cssHooks[b] = {
            get: function (a, c, d) {
                var e;
                if (c) return a.offsetWidth !== 0 ? p(a, b, d) : (J.swap(a, bM, function () {
                    e = p(a, b, d)
                }), e)
            },
            set: function (a, b) {
                if (!bJ.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), J.support.opacity || (J.cssHooks.opacity = {
        get: function (a, b) {
            return bH.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function (a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = J.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && J.trim(f.replace(bG, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = bG.test(f) ? f.replace(bG, e) : f + " " + e
        }
    }), J(function () {
        J.support.reliableMarginRight || (J.cssHooks.marginRight = {
            get: function (a, b) {
                var c;
                return J.swap(a, {
                    display: "inline-block"
                }, function () {
                    b ? c = bP(a, "margin-right", "marginRight") : c = a.style.marginRight
                }), c
            }
        })
    }), G.defaultView && G.defaultView.getComputedStyle && (bQ = function (a, c) {
        var d, e, f;
        c = c.replace(bI, "-$1").toLowerCase();
        if (!(e = a.ownerDocument.defaultView)) return b;
        if (f = e.getComputedStyle(a, null)) d = f.getPropertyValue(c), d === "" && !J.contains(a.ownerDocument.documentElement, a) && (d = J.style(a, c));
        return d
    }), G.documentElement.currentStyle && (bR = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        return f === null && g && (e = g[b]) && (f = e), !bJ.test(f) && bK.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), f === "" ? "auto" : f
    }), bP = bQ || bR, J.expr && J.expr.filters && (J.expr.filters.hidden = function (a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !J.support.reliableHiddenOffsets && (a.style && a.style.display || J.css(a, "display")) === "none"
    }, J.expr.filters.visible = function (a) {
        return !J.expr.filters.hidden(a)
    });
    var bS = /%20/g,
        bT = /\[\]$/,
        bU = /\r?\n/g,
        bV = /#.*$/,
        bW = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bX = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bY = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        bZ = /^(?:GET|HEAD)$/,
        b$ = /^\/\//,
        b_ = /\?/,
        ca = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        cb = /^(?:select|textarea)/i,
        cc = /\s+/,
        cd = /([?&])_=[^&]*/,
        ce = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        cf = J.fn.load,
        cg = {},
        ch = {},
        ci, cj, ck = ["*/"] + ["*"];
    try {
        ci = I.href
    } catch (cl) {
        ci = G.createElement("a"), ci.href = "", ci = ci.href
    }
    cj = ce.exec(ci.toLowerCase()) || [], J.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && cf) return cf.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var f = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var g = "GET";
            c && (J.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = J.param(c, J.ajaxSettings.traditional), g = "POST"));
            var h = this;
            return J.ajax({
                url: a,
                type: g,
                dataType: "html",
                data: c,
                complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), h.html(f ? J("<div>").append(c.replace(ca, "")).find(f) : c)), d && h.each(d, [c, b, a])
                }
            }), this
        },
        serialize: function () {
            return J.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? J.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || cb.test(this.nodeName) || bX.test(this.type))
            }).map(function (a, b) {
                var c = J(this).val();
                return c == null ? null : J.isArray(c) ? J.map(c, function (a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bU, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(bU, "\r\n")
                }
            }).get()
        }
    }), J.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        J.fn[b] = function (a) {
            return this.bind(b, a)
        }
    }), J.each(["get", "post"], function (a, c) {
        J[c] = function (a, d, e, f) {
            return J.isFunction(d) && (f = f || e, e = d, d = b), J.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: f
            })
        }
    }), J.extend({
        getScript: function (a, c) {
            return J.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return J.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            return b ? m(a, J.ajaxSettings) : (b = a, a = J.ajaxSettings), m(a, b), a
        },
        ajaxSettings: {
            url: ci,
            isLocal: bY.test(cj[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": ck
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": J.parseJSON,
                "text xml": J.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: o(cg),
        ajaxTransport: o(ch),
        ajax: function (a, c) {
            function d(a, c, d, n) {
                if (v !== 2) {
                    v = 2, t && clearTimeout(t), s = b, q = n || "", y.readyState = a > 0 ? 4 : 0;
                    var o, p, r, u = c,
                        x = d ? k(e, y, d) : b,
                        z, A;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (e.ifModified) {
                            if (z = y.getResponseHeader("Last-Modified")) J.lastModified[m] = z;
                            if (A = y.getResponseHeader("Etag")) J.etag[m] = A
                        }
                        if (a === 304) u = "notmodified", o = !0;
                        else try {
                            p = j(e, x), u = "success", o = !0
                        } catch (B) {
                            u = "parsererror", r = B
                        }
                    } else {
                        r = u;
                        if (!u || a) u = "error", a < 0 && (a = 0)
                    }
                    y.status = a, y.statusText = "" + (c || u), o ? h.resolveWith(f, [p, u, y]) : h.rejectWith(f, [y, u, r]), y.statusCode(l), l = b, w && g.trigger("ajax" + (o ? "Success" : "Error"), [y, e, o ? p : r]), i.fireWith(f, [y, u]), w && (g.trigger("ajaxComplete", [y, e]), --J.active || J.event.trigger("ajaxStop"))
                }
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var e = J.ajaxSetup({}, c),
                f = e.context || e,
                g = f !== e && (f.nodeType || f instanceof J) ? J(f) : J.event,
                h = J.Deferred(),
                i = J.Callbacks("once memory"),
                l = e.statusCode || {},
                m, o = {},
                p = {},
                q, r, s, t, u, v = 0,
                w, x, y = {
                    readyState: 0,
                    setRequestHeader: function (a, b) {
                        if (!v) {
                            var c = a.toLowerCase();
                            a = p[c] = p[c] || a, o[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return v === 2 ? q : null
                    },
                    getResponseHeader: function (a) {
                        var c;
                        if (v === 2) {
                            if (!r) {
                                r = {};
                                while (c = bW.exec(q)) r[c[1].toLowerCase()] = c[2]
                            }
                            c = r[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function (a) {
                        return v || (e.mimeType = a), this
                    },
                    abort: function (a) {
                        return a = a || "abort", s && s.abort(a), d(0, a), this
                    }
                };
            h.promise(y), y.success = y.done, y.error = y.fail, y.complete = i.add, y.statusCode = function (a) {
                if (a) {
                    var b;
                    if (v < 2) for (b in a) l[b] = [l[b], a[b]];
                    else b = a[y.status], y.then(b, b)
                }
                return this
            }, e.url = ((a || e.url) + "").replace(bV, "").replace(b$, cj[1] + "//"), e.dataTypes = J.trim(e.dataType || "*").toLowerCase().split(cc), e.crossDomain == null && (u = ce.exec(e.url.toLowerCase()), e.crossDomain = !(!u || u[1] == cj[1] && u[2] == cj[2] && (u[3] || (u[1] === "http:" ? 80 : 443)) == (cj[3] || (cj[1] === "http:" ? 80 : 443)))), e.data && e.processData && typeof e.data != "string" && (e.data = J.param(e.data, e.traditional)), n(cg, e, c, y);
            if (v === 2) return !1;
            w = e.global, e.type = e.type.toUpperCase(), e.hasContent = !bZ.test(e.type), w && J.active++ === 0 && J.event.trigger("ajaxStart");
            if (!e.hasContent) {
                e.data && (e.url += (b_.test(e.url) ? "&" : "?") + e.data, delete e.data), m = e.url;
                if (e.cache === !1) {
                    var z = J.now(),
                        A = e.url.replace(cd, "$1_=" + z);
                    e.url = A + (A === e.url ? (b_.test(e.url) ? "&" : "?") + "_=" + z : "")
                }
            }(e.data && e.hasContent && e.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", e.contentType), e.ifModified && (m = m || e.url, J.lastModified[m] && y.setRequestHeader("If-Modified-Since", J.lastModified[m]), J.etag[m] && y.setRequestHeader("If-None-Match", J.etag[m])), y.setRequestHeader("Accept", e.dataTypes[0] && e.accepts[e.dataTypes[0]] ? e.accepts[e.dataTypes[0]] + (e.dataTypes[0] !== "*" ? ", " + ck + "; q=0.01" : "") : e.accepts["*"]);
            for (x in e.headers) y.setRequestHeader(x, e.headers[x]);
            if (!e.beforeSend || e.beforeSend.call(f, y, e) !== !1 && v !== 2) {
                for (x in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) y[x](e[x]);
                s = n(ch, e, c, y);
                if (!s) d(-1, "No Transport");
                else {
                    y.readyState = 1, w && g.trigger("ajaxSend", [y, e]), e.async && e.timeout > 0 && (t = setTimeout(function () {
                        y.abort("timeout")
                    }, e.timeout));
                    try {
                        v = 1, s.send(o, d)
                    } catch (B) {
                        v < 2 ? d(-1, B) : J.error(B)
                    }
                }
                return y
            }
            return y.abort(), !1
        },
        param: function (a, c) {
            var d = [],
                e = function (a, b) {
                    b = J.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = J.ajaxSettings.traditional);
            if (J.isArray(a) || a.jquery && !J.isPlainObject(a)) J.each(a, function () {
                e(this.name, this.value)
            });
            else for (var f in a) l(f, a[f], c, e);
            return d.join("&").replace(bS, "+")
        }
    }), J.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cm = J.now(),
        cn = /(\=)\?(&|$)|\?\?/i;
    J.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return J.expando + "_" + cm++
        }
    }), J.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cn.test(b.url) || e && cn.test(b.data))) {
            var f, g = b.jsonpCallback = J.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                h = a[g],
                i = b.url,
                j = b.data,
                k = "$1" + g + "$2";
            return b.jsonp !== !1 && (i = i.replace(cn, k), b.url === i && (e && (j = j.replace(cn, k)), b.data === j && (i += (/\?/.test(i) ? "&" : "?") + b.jsonp + "=" + g))), b.url = i, b.data = j, a[g] = function (a) {
                f = [a]
            }, d.always(function () {
                a[g] = h, f && J.isFunction(h) && a[g](f[0])
            }), b.converters["script json"] = function () {
                return f || J.error(g + " was not called"), f[0]
            }, b.dataTypes[0] = "json", "script"
        }
    }), J.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (a) {
                return J.globalEval(a), a
            }
        }
    }), J.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), J.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var c, d = G.head || G.getElementsByTagName("head")[0] || G.documentElement;
            return {
                send: function (e, f) {
                    c = G.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) {
                        if (e || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success")
                    }, d.insertBefore(c, d.firstChild)
                },
                abort: function () {
                    c && c.onload(0, 1)
                }
            }
        }
    });
    var co = a.ActiveXObject ?
    function () {
        for (var a in cq) cq[a](0, 1)
    } : !1, cp = 0, cq;
    J.ajaxSettings.xhr = a.ActiveXObject ?
    function () {
        return !this.isLocal && i() || h()
    } : i, function (a) {
        J.extend(J.support, {
            ajax: !! a,
            cors: !! a && "withCredentials" in a
        })
    }(J.ajaxSettings.xhr()), J.support.ajax && J.ajaxTransport(function (c) {
        if (!c.crossDomain || J.support.cors) {
            var d;
            return {
                send: function (e, f) {
                    var g = c.xhr(),
                        h, i;
                    c.username ? g.open(c.type, c.url, c.async, c.username, c.password) : g.open(c.type, c.url, c.async);
                    if (c.xhrFields) for (i in c.xhrFields) g[i] = c.xhrFields[i];
                    c.mimeType && g.overrideMimeType && g.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in e) g.setRequestHeader(i, e[i])
                    } catch (j) {}
                    g.send(c.hasContent && c.data || null), d = function (a, e) {
                        var i, j, k, l, m;
                        try {
                            if (d && (e || g.readyState === 4)) {
                                d = b, h && (g.onreadystatechange = J.noop, co && delete cq[h]);
                                if (e) g.readyState !== 4 && g.abort();
                                else {
                                    i = g.status, k = g.getAllResponseHeaders(), l = {}, m = g.responseXML, m && m.documentElement && (l.xml = m), l.text = g.responseText;
                                    try {
                                        j = g.statusText
                                    } catch (n) {
                                        j = ""
                                    }!i && c.isLocal && !c.crossDomain ? i = l.text ? 200 : 404 : i === 1223 && (i = 204)
                                }
                            }
                        } catch (o) {
                            e || f(-1, o)
                        }
                        l && f(i, j, l, k)
                    }, !c.async || g.readyState === 4 ? d() : (h = ++cp, co && (cq || (cq = {}, J(a).unload(co)), cq[h] = d), g.onreadystatechange = d)
                },
                abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var cr = {},
        cs, ct, cu = /^(?:toggle|show|hide)$/,
        cv = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        cw, cx = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        cy;
    J.fn.extend({
        show: function (a, b, c) {
            var f, g;
            if (a || a === 0) return this.animate(e("show", 3), a, b, c);
            for (var h = 0, i = this.length; h < i; h++) f = this[h], f.style && (g = f.style.display, !J._data(f, "olddisplay") && g === "none" && (g = f.style.display = ""), g === "" && J.css(f, "display") === "none" && J._data(f, "olddisplay", d(f.nodeName)));
            for (h = 0; h < i; h++) {
                f = this[h];
                if (f.style) {
                    g = f.style.display;
                    if (g === "" || g === "none") f.style.display = J._data(f, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function (a, b, c) {
            if (a || a === 0) return this.animate(e("hide", 3), a, b, c);
            var d, f, g = 0,
                h = this.length;
            for (; g < h; g++) d = this[g], d.style && (f = J.css(d, "display"), f !== "none" && !J._data(d, "olddisplay") && J._data(d, "olddisplay", f));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: J.fn.toggle,
        toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            return J.isFunction(a) && J.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : J(this).is(":hidden");
                J(this)[b ? "show" : "hide"]()
            }) : this.animate(e("toggle", 3), a, b, c), this
        },
        fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function (a, b, c, e) {
            function f() {
                g.queue === !1 && J._mark(this);
                var b = J.extend({}, g),
                    c = this.nodeType === 1,
                    e = c && J(this).is(":hidden"),
                    f, h, i, j, k, l, m, n, o;
                b.animatedProperties = {};
                for (i in a) {
                    f = J.camelCase(i), i !== f && (a[f] = a[i], delete a[i]), h = a[f], J.isArray(h) ? (b.animatedProperties[f] = h[1], h = a[f] = h[0]) : b.animatedProperties[f] = b.specialEasing && b.specialEasing[f] || b.easing || "swing";
                    if (h === "hide" && e || h === "show" && !e) return b.complete.call(this);
                    c && (f === "height" || f === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], J.css(this, "display") === "inline" && J.css(this, "float") === "none" && (!J.support.inlineBlockNeedsLayout || d(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new J.fx(this, b, i), h = a[i], cu.test(h) ? (o = J._data(this, "toggle" + i) || (h === "toggle" ? e ? "show" : "hide" : 0), o ? (J._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = cv.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (J.cssNumber[i] ? "" : "px"), n !== "px" && (J.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, J.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0
            }
            var g = J.speed(b, c, e);
            return J.isEmptyObject(a) ? this.each(g.complete, [!1]) : (a = J.extend({}, a), g.queue === !1 ? this.each(f) : this.queue(g.queue, f))
        },
        stop: function (a, c, d) {
            return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                function b(a, b, c) {
                    var e = b[c];
                    J.removeData(a, c, !0), e.stop(d)
                }
                var c, e = !1,
                    f = J.timers,
                    g = J._data(this);
                d || J._unmark(!0, this);
                if (a == null) for (c in g) g[c].stop && c.indexOf(".run") === c.length - 4 && b(this, g, c);
                else g[c = a + ".run"] && g[c].stop && b(this, g, c);
                for (c = f.length; c--;) f[c].elem === this && (a == null || f[c].queue === a) && (d ? f[c](!0) : f[c].saveState(), e = !0, f.splice(c, 1));
                (!d || !e) && J.dequeue(this, a)
            })
        }
    }), J.each({
        slideDown: e("show", 1),
        slideUp: e("hide", 1),
        slideToggle: e("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (a, b) {
        J.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), J.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? J.extend({}, a) : {
                complete: c || !c && b || J.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !J.isFunction(b) && b
            };
            d.duration = J.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in J.fx.speeds ? J.fx.speeds[d.duration] : J.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            return d.old = d.complete, d.complete = function (a) {
                J.isFunction(d.old) && d.old.call(this), d.queue ? J.dequeue(this, d.queue) : a !== !1 && J._unmark(this)
            }, d
        },
        easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            },
            swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        },
        timers: [],
        fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), J.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (J.fx.step[this.prop] || J.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] == null || !! this.elem.style && this.elem.style[this.prop] != null) {
                var a, b = J.css(this.elem, this.prop);
                return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
            }
            return this.elem[this.prop]
        },
        custom: function (a, c, d) {
            function e(a) {
                return f.step(a)
            }
            var f = this,
                h = J.fx;
            this.startTime = cy || g(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (J.cssNumber[this.prop] ? "" : "px"), e.queue = this.options.queue, e.elem = this.elem, e.saveState = function () {
                f.options.hide && J._data(f.elem, "fxshow" + f.prop) === b && J._data(f.elem, "fxshow" + f.prop, f.start)
            }, e() && J.timers.push(e) && !cw && (cw = setInterval(h.tick, h.interval))
        },
        show: function () {
            var a = J._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || J.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), J(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = J._data(this.elem, "fxshow" + this.prop) || J.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function (a) {
            var b, c, d, e = cy || g(),
                f = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (f = !1);
                if (f) {
                    i.overflow != null && !J.support.shrinkWrapBlocks && J.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && J(h).hide();
                    if (i.hide || i.show) for (b in i.animatedProperties) J.style(h, b, i.orig[b]), J.removeData(h, "fxshow" + b, !0), J.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            return i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = J.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
        }
    }, J.extend(J.fx, {
        tick: function () {
            var a, b = J.timers,
                c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || J.fx.stop()
        },
        interval: 13,
        stop: function () {
            clearInterval(cw), cw = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (a) {
                J.style(a.elem, "opacity", a.now)
            },
            _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), J.each(["width", "height"], function (a, b) {
        J.fx.step[b] = function (a) {
            J.style(a.elem, b, Math.max(0, a.now))
        }
    }), J.expr && J.expr.filters && (J.expr.filters.animated = function (a) {
        return J.grep(J.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cz = /^t(?:able|d|h)$/i,
        cA = /^(?:body|html)$/i;
    "getBoundingClientRect" in G.documentElement ? J.fn.offset = function (a) {
        var b = this[0],
            d;
        if (a) return this.each(function (b) {
            J.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return J.offset.bodyOffset(b);
        try {
            d = b.getBoundingClientRect()
        } catch (e) {}
        var f = b.ownerDocument,
            g = f.documentElement;
        if (!d || !J.contains(g, b)) return d ? {
            top: d.top,
            left: d.left
        } : {
            top: 0,
            left: 0
        };
        var h = f.body,
            i = c(f),
            j = g.clientTop || h.clientTop || 0,
            k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || J.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || J.support.boxModel && g.scrollLeft || h.scrollLeft,
            n = d.top + l - j,
            o = d.left + m - k;
        return {
            top: n,
            left: o
        }
    } : J.fn.offset = function (a) {
        var b = this[0];
        if (a) return this.each(function (b) {
            J.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return J.offset.bodyOffset(b);
        var c, d = b.offsetParent,
            e = b,
            f = b.ownerDocument,
            g = f.documentElement,
            h = f.body,
            i = f.defaultView,
            j = i ? i.getComputedStyle(b, null) : b.currentStyle,
            k = b.offsetTop,
            l = b.offsetLeft;
        while ((b = b.parentNode) && b !== h && b !== g) {
            if (J.support.fixedPosition && j.position === "fixed") break;
            c = i ? i.getComputedStyle(b, null) : b.currentStyle, k -= b.scrollTop, l -= b.scrollLeft, b === d && (k += b.offsetTop, l += b.offsetLeft, J.support.doesNotAddBorder && (!J.support.doesAddBorderForTableAndCells || !cz.test(b.nodeName)) && (k += parseFloat(c.borderTopWidth) || 0, l += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), J.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (k += parseFloat(c.borderTopWidth) || 0, l += parseFloat(c.borderLeftWidth) || 0), j = c
        }
        if (j.position === "relative" || j.position === "static") k += h.offsetTop, l += h.offsetLeft;
        return J.support.fixedPosition && j.position === "fixed" && (k += Math.max(g.scrollTop, h.scrollTop), l += Math.max(g.scrollLeft, h.scrollLeft)), {
            top: k,
            left: l
        }
    }, J.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            return J.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(J.css(a, "marginTop")) || 0, c += parseFloat(J.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            }
        },
        setOffset: function (a, b, c) {
            var d = J.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = J(a),
                f = e.offset(),
                g = J.css(a, "top"),
                h = J.css(a, "left"),
                i = (d === "absolute" || d === "fixed") && J.inArray("auto", [g, h]) > -1,
                j = {},
                k = {},
                l, m;
            i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), J.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j)
        }
    }, J.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = cA.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            return c.top -= parseFloat(J.css(a, "marginTop")) || 0, c.left -= parseFloat(J.css(a, "marginLeft")) || 0, d.top += parseFloat(J.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(J.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || G.body;
                while (a && !cA.test(a.nodeName) && J.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), J.each(["Left", "Top"], function (a, d) {
        var e = "scroll" + d;
        J.fn[e] = function (d) {
            var f, g;
            return d === b ? (f = this[0], f ? (g = c(f), g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : J.support.boxModel && g.document.documentElement[e] || g.document.body[e] : f[e]) : null) : this.each(function () {
                g = c(this), g ? g.scrollTo(a ? J(g).scrollLeft() : d, a ? d : J(g).scrollTop()) : this[e] = d
            })
        }
    }), J.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        J.fn["inner" + c] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(J.css(a, d, "padding")) : this[d]() : null
        }, J.fn["outer" + c] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(J.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, J.fn[d] = function (a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (J.isFunction(a)) return this.each(function (b) {
                var c = J(this);
                c[d](a.call(this, b, c[d]()))
            });
            if (J.isWindow(e)) {
                var f = e.document.documentElement["client" + c],
                    g = e.document.body;
                return e.document.compatMode === "CSS1Compat" && f || g && g["client" + c] || f
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var h = J.css(e, d),
                    i = parseFloat(h);
                return J.isNumeric(i) ? i : h
            }
            return this.css(d, typeof a == "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = J
})(window), function (a) {
    function l(b, c, d, g) {
        var h = {
            data: g || (c ? c.data : {}),
            _wrap: c ? c._wrap : null,
            tmpl: null,
            parent: c || null,
            nodes: [],
            calls: t,
            nest: u,
            wrap: v,
            html: w,
            update: x
        };
        return b && a.extend(h, b, {
            nodes: [],
            parent: c
        }), d && (h.tmpl = d, h._ctnt = h._ctnt || h.tmpl(a, h), h.key = ++i, (k.length ? f : e)[i] = h), h
    }
    function m(b, d, e) {
        var f, g = e ? a.map(e, function (a) {
            return typeof a == "string" ? b.key ? a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + c + '="' + b.key + '" $2') : a : m(a, b, a._ctnt)
        }) : b;
        return d ? g : (g = g.join(""), g.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (b, c, d, e) {
            f = a(d).get(), s(f), c && (f = n(c).concat(f)), e && (f = f.concat(n(e)))
        }), f ? f : n(g))
    }
    function n(b) {
        var c = document.createElement("div");
        return c.innerHTML = b, a.makeArray(c.childNodes)
    }
    function o(b) {
        return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + a.trim(b).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (b, c, d, e, f, g, h) {
            var i = a.tmpl.tag[d],
                j, k, l;
            if (!i) throw "Template command not found: " + d;
            return j = i._default || [], g && !/\w$/.test(f) && (f += g, g = ""), f ? (f = q(f), h = h ? "," + q(h) + ")" : g ? ")" : "", k = g ? f.indexOf(".") > -1 ? f + g : "(" + f + ").call($item" + h : f, l = g ? k : "(typeof(" + f + ")==='function'?(" + f + ").call($item):(" + f + "))") : l = k = j.$1 || "null", e = q(e), "');" + i[c ? "close" : "open"].split("$notnull_1").join(f ? "typeof(" + f + ")!=='undefined' && (" + f + ")!=null" : "true").split("$1a").join(l).split("$1").join(k).split("$2").join(e ? e.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function (a, b, c, d) {
                return d = d ? "," + d + ")" : c ? ")" : "", d ? "(" + b + ").call($item" + d : a
            }) : j.$2 || "") + "_.push('"
        }) + "');}return _;")
    }
    function p(b, c) {
        b._wrap = m(b, !0, a.isArray(c) ? c : [d.test(c) ? c : a(c).html()]).join("")
    }
    function q(a) {
        return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }
    function r(a) {
        var b = document.createElement("div");
        return b.appendChild(a.cloneNode(!0)), b.innerHTML
    }
    function s(b) {
        function p(b) {
            function p(a) {
                a = a + d, n = k[a] = k[a] || l(n, e[n.parent.key + d] || n.parent, null, !0)
            }
            var g, h = b,
                m, n, o;
            if (o = b.getAttribute(c)) {
                while (h.parentNode && (h = h.parentNode).nodeType === 1 && !(g = h.getAttribute(c)));
                g !== o && (h = h.parentNode ? h.nodeType === 11 ? 0 : h.getAttribute(c) || 0 : 0, (n = e[o]) || (n = f[o], n = l(n, e[h] || f[h], null, !0), n.key = ++i, e[i] = n), j && p(o)), b.removeAttribute(c)
            } else j && (n = a.data(b, "tmplItem")) && (p(n.key), e[n.key] = n, h = a.data(b.parentNode, "tmplItem"), h = h ? h.key : 0);
            if (n) {
                m = n;
                while (m && m.key != h) m.nodes.push(b), m = m.parent;
                delete n._ctnt, delete n._wrap, a.data(b, "tmplItem", n)
            }
        }
        var d = "_" + j,
            g, h, k = {},
            m, n, o;
        for (m = 0, n = b.length; m < n; m++) {
            if ((g = b[m]).nodeType !== 1) continue;
            h = g.getElementsByTagName("*");
            for (o = h.length - 1; o >= 0; o--) p(h[o]);
            p(g)
        }
    }
    function t(a, b, c, d) {
        if (!a) return k.pop();
        k.push({
            _: a,
            tmpl: b,
            item: this,
            data: c,
            options: d
        })
    }
    function u(b, c, d) {
        return a.tmpl(a.template(b), c, d, this)
    }
    function v(b, c) {
        var d = b.options || {};
        return d.wrapped = c, a.tmpl(a.template(b.tmpl), b.data, d, b.item)
    }
    function w(b, c) {
        var d = this._wrap;
        return a.map(a(a.isArray(d) ? d.join("") : d).filter(b || "*"), function (a) {
            return c ? a.innerText || a.textContent : a.outerHTML || r(a)
        })
    }
    function x() {
        var b = this.nodes;
        a.tmpl(null, null, null, this).insertBefore(b[0]), a(b).remove()
    }
    var b = a.fn.domManip,
        c = "_tmplitem",
        d = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        e = {},
        f = {},
        g, h = {
            key: 0,
            data: {}
        },
        i = 0,
        j = 0,
        k = [];
    a.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (b, c) {
        a.fn[b] = function (d) {
            var f = [],
                h = a(d),
                i, k, l, m, n = this.length === 1 && this[0].parentNode;
            g = e || {};
            if (n && n.nodeType === 11 && n.childNodes.length === 1 && h.length === 1) h[c](this[0]), f = this;
            else {
                for (k = 0, l = h.length; k < l; k++) j = k, i = (k > 0 ? this.clone(!0) : this).get(), a.fn[c].apply(a(h[k]), i), f = f.concat(i);
                j = 0, f = this.pushStack(f, b, h.selector)
            }
            return m = g, g = null, a.tmpl.complete(m), f
        }
    }), a.fn.extend({
        tmpl: function (b, c, d) {
            return a.tmpl(this[0], b, c, d)
        },
        tmplItem: function () {
            return a.tmplItem(this[0])
        },
        template: function (b) {
            return a.template(b, this[0])
        },
        domManip: function (c, d, f) {
            if (c[0] && c[0].nodeType) {
                var h = a.makeArray(arguments),
                    i = c.length,
                    k = 0,
                    l;
                while (k < i && !(l = a.data(c[k++], "tmplItem")));
                i > 1 && (h[0] = [a.makeArray(c)]), l && j && (h[2] = function (b) {
                    a.tmpl.afterManip(this, b, f)
                }), b.apply(this, h)
            } else b.apply(this, arguments);
            return j = 0, !g && a.tmpl.complete(e), this
        }
    }), a.extend({
        tmpl: function (b, c, d, g) {
            var i, j = !g;
            if (j) g = h, b = a.template[b] || a.template(null, b), f = {};
            else if (!b) return b = g.tmpl, e[g.key] = g, g.nodes = [], g.wrapped && p(g, g.wrapped), a(m(g, null, g.tmpl(a, g)));
            return b ? (typeof c == "function" && (c = c.call(g || {})), d && d.wrapped && p(d, d.wrapped), i = a.isArray(c) ? a.map(c, function (a) {
                return a ? l(d, g, b, a) : null
            }) : [l(d, g, b, c)], j ? a(m(g, null, i)) : i) : []
        },
        tmplItem: function (b) {
            var c;
            b instanceof a && (b = b[0]);
            while (b && b.nodeType === 1 && !(c = a.data(b, "tmplItem")) && (b = b.parentNode));
            return c || h
        },
        template: function (b, c) {
            return c ? (typeof c == "string" ? c = o(c) : c instanceof a && (c = c[0] || {}), c.nodeType && (c = a.data(c, "tmpl") || a.data(c, "tmpl", o(c.innerHTML))), typeof b == "string" ? a.template[b] = c : c) : b ? typeof b != "string" ? a.template(null, b) : a.template[b] || a.template(null, d.test(b) ? b : a(b)) : null
        },
        encode: function (a) {
            return ("" + a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    }), a.extend(a.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(_,$1,$2);_=[];",
                close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){_.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){_.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function () {
            e = {}
        },
        afterManip: function (b, c, d) {
            var e = c.nodeType === 11 ? a.makeArray(c.childNodes) : c.nodeType === 1 ? [c] : [];
            d.call(b, c), s(e), j++
        }
    })
}(jQuery);
var CodeMirror = function () {
        function a(c, d) {
            function bN(a) {
                return a >= 0 && a < bm.size
            }
            function bP(a) {
                return t(bm, a)
            }
            function bQ(a, b) {
                bB = !0;
                var c = b - a.height;
                for (var d = a; d; d = d.parent) d.height += c
            }
            function bR(a) {
                var b = {
                    line: 0,
                    ch: 0
                };
                cc(b, {
                    line: bm.size - 1,
                    ch: bP(bm.size - 1).text.length
                }, Y(a), b, b), bv = !0
            }
            function bS(a) {
                var b = [];
                return bm.iter(0, bm.size, function (a) {
                    b.push(a.text)
                }), b.join("\n")
            }
            function bT(a) {
                function j(a) {
                    var b = dw(a, !0);
                    if (b && !Q(b, g)) {
                        bo || ca(), g = b, cD(d, b), bv = !1;
                        var c = cw();
                        if (b.line >= c.to || b.line < c.from) h = setTimeout(dJ(function () {
                            j(a)
                        }), 150)
                    }
                }
                cC(a.shiftKey);
                for (var c = D(a); c != B; c = c.parentNode) if (c.parentNode == _ && c != ba) return;
                for (var c = D(a); c != B; c = c.parentNode) if (c.parentNode == bc) return e.onGutterClick && e.onGutterClick(bO, W(bc.childNodes, c) + bE, a), A(a);
                var d = dw(a);
                switch (E(a)) {
                case 3:
                    I && !b && dx(a);
                    return;
                case 2:
                    d && cG(d.line, d.ch, !0);
                    return
                }
                if (!d) {
                    D(a) == N && A(a);
                    return
                }
                bo || ca();
                var f = +(new Date);
                if (bs && bs.time > f - 400 && Q(bs.pos, d)) return A(a), setTimeout(cs, 20), cP(d.line);
                if (br && br.time > f - 400 && Q(br.pos, d)) return bs = {
                    time: f,
                    pos: d
                }, A(a), cO(d);
                br = {
                    time: f,
                    pos: d
                };
                var g = d,
                    h;
                if (H && !Q(bp.from, bp.to) && !R(d, bp.from) && !R(bp.to, d)) {
                    K && (bd.draggable = !0);
                    var i = F(y, "mouseup", dJ(function (b) {
                        K && (bd.draggable = !1), bt = !1, i(), Math.abs(a.clientX - b.clientX) + Math.abs(a.clientY - b.clientY) < 10 && (A(b), cG(d.line, d.ch, !0), cs())
                    }), !0);
                    bt = !0;
                    return
                }
                A(a), cG(d.line, d.ch, !0);
                var k = F(y, "mousemove", dJ(function (a) {
                    clearTimeout(h), A(a), j(a)
                }), !0),
                    i = F(y, "mouseup", dJ(function (a) {
                        clearTimeout(h);
                        var b = dw(a);
                        b && cD(d, b), A(a), cs(), bv = !0, k(), i()
                    }), !0)
            }
            function bU(a) {
                for (var b = D(a); b != B; b = b.parentNode) if (b.parentNode == bc) return A(a);
                var c = dw(a);
                if (!c) return;
                bs = {
                    time: +(new Date),
                    pos: c
                }, A(a), cO(c)
            }
            function bV(a) {
                a.preventDefault();
                var b = dw(a, !0),
                    c = a.dataTransfer.files;
                if (!b || e.readOnly) return;
                if (c && c.length && window.FileReader && window.File) {
                    function d(a, c) {
                        var d = new FileReader;
                        d.onload = function () {
                            g[c] = d.result, ++h == f && (b = cI(b), dJ(function () {
                                var a = ch(g.join(""), b, b);
                                cD(b, a)
                            })())
                        }, d.readAsText(a)
                    }
                    var f = c.length,
                        g = Array(f),
                        h = 0;
                    for (var i = 0; i < f; ++i) d(c[i], i)
                } else try {
                    var g = a.dataTransfer.getData("Text");
                    if (g) {
                        var j = ch(g, b, b),
                            k = bp.from,
                            l = bp.to;
                        cD(b, j), bt && ch("", k, l), cs()
                    }
                } catch (a) {}
            }
            function bW(a) {
                var b = cl();
                U(b), a.dataTransfer.setDragImage(T, 0, 0), a.dataTransfer.setData("Text", b)
            }
            function bX(a) {
                var b = $[a.keyCode],
                    c = h[e.keyMap].auto,
                    d, f;
                if (b == null || a.altGraphKey) return c && (e.keyMap = c), null;
                a.altKey && (b = "Alt-" + b), a.ctrlKey && (b = "Ctrl-" + b), a.metaKey && (b = "Cmd-" + b), a.shiftKey && (d = i("Shift-" + b, e.extraKeys, e.keyMap)) ? f = !0 : d = i(b, e.extraKeys, e.keyMap), typeof d == "string" && (g.propertyIsEnumerable(d) ? d = g[d] : d = null), c && (d || !j(a)) && (e.keyMap = c);
                if (!d) return !1;
                if (f) {
                    var k = bq;
                    bq = null, d(bO), bq = k
                } else d(bO);
                return A(a), !0
            }
            function bZ(a) {
                bo || ca();
                var c = a.keyCode;
                J && c == 27 && (a.returnValue = !1), cC(c == 16 || a.shiftKey);
                if (e.onKeyEvent && e.onKeyEvent(bO, z(a))) return;
                var d = bX(a);
                window.opera && (bY = d ? a.keyCode : null, !d && (b ? a.metaKey : a.ctrlKey) && a.keyCode == 88 && ci(""))
            }
            function b$(a) {
                if (window.opera && a.keyCode == bY) {
                    bY = null, A(a);
                    return
                }
                if (e.onKeyEvent && e.onKeyEvent(bO, z(a))) return;
                if (window.opera && !a.which && bX(a)) return;
                if (e.electricChars && bl.electricChars) {
                    var b = String.fromCharCode(a.charCode == null ? a.keyCode : a.charCode);
                    bl.electricChars.indexOf(b) > -1 && setTimeout(dJ(function () {
                        cR(bp.to.line, "smart")
                    }), 75)
                }
                co()
            }
            function b_(a) {
                if (e.onKeyEvent && e.onKeyEvent(bO, z(a))) return;
                a.keyCode == 16 && (bq = null)
            }
            function ca() {
                if (e.readOnly) return;
                bo || (e.onFocus && e.onFocus(bO), bo = !0, B.className.search(/\bCodeMirror-focused\b/) == -1 && (B.className += " CodeMirror-focused"), bA || cr(!0)), cn(), dy()
            }
            function cb() {
                bo && (e.onBlur && e.onBlur(bO), bo = !1, B.className = B.className.replace(" CodeMirror-focused", "")), clearInterval(bk), setTimeout(function () {
                    bo || (bq = null)
                }, 150)
            }
            function cc(a, b, c, d, f) {
                if (bL) {
                    var g = [];
                    bm.iter(a.line, b.line + 1, function (a) {
                        g.push(a.text)
                    }), bL.addChange(a.line, c.length, g);
                    while (bL.done.length > e.undoDepth) bL.done.shift()
                }
                cg(a, b, c, d, f)
            }
            function cd(a, b) {
                var c = a.pop();
                if (c) {
                    var d = [],
                        e = c.start + c.added;
                    bm.iter(c.start, e, function (a) {
                        d.push(a.text)
                    }), b.push({
                        start: c.start,
                        added: c.old.length,
                        old: d
                    });
                    var f = cI({
                        line: c.start + c.old.length - 1,
                        ch: V(d[d.length - 1], c.old[c.old.length - 1])
                    });
                    cg({
                        line: c.start,
                        ch: 0
                    }, {
                        line: e - 1,
                        ch: bP(e - 1).text.length
                    }, c.old, f, f), bv = !0
                }
            }
            function ce() {
                cd(bL.done, bL.undone)
            }
            function cf() {
                cd(bL.undone, bL.done)
            }
            function cg(a, b, c, d, f) {
                function y(a) {
                    return a <= Math.min(b.line, b.line + s) ? a : a + s
                }
                var g = !1,
                    h = bI.length;
                e.lineWrapping || bm.iter(a.line, b.line, function (a) {
                    if (a.text.length == h) return g = !0, !0
                });
                if (a.line != b.line || c.length > 1) bB = !0;
                var i = b.line - a.line,
                    j = bP(a.line),
                    k = bP(b.line);
                if (a.ch == 0 && b.ch == 0 && c[c.length - 1] == "") {
                    var l = [],
                        m = null;
                    a.line ? (m = bP(a.line - 1), m.fixMarkEnds(k)) : k.fixMarkStarts();
                    for (var n = 0, o = c.length - 1; n < o; ++n) l.push(p.inheritMarks(c[n], m));
                    i && bm.remove(a.line, i, bC), l.length && bm.insert(a.line, l)
                } else if (j == k) if (c.length == 1) j.replace(a.ch, b.ch, c[0]);
                else {
                    k = j.split(b.ch, c[c.length - 1]), j.replace(a.ch, null, c[0]), j.fixMarkEnds(k);
                    var l = [];
                    for (var n = 1, o = c.length - 1; n < o; ++n) l.push(p.inheritMarks(c[n], j));
                    l.push(k), bm.insert(a.line + 1, l)
                } else if (c.length == 1) j.replace(a.ch, null, c[0]), k.replace(null, b.ch, ""), j.append(k), bm.remove(a.line + 1, i, bC);
                else {
                    var l = [];
                    j.replace(a.ch, null, c[0]), k.replace(null, b.ch, c[c.length - 1]), j.fixMarkEnds(k);
                    for (var n = 1, o = c.length - 1; n < o; ++n) l.push(p.inheritMarks(c[n], j));
                    i > 1 && bm.remove(a.line + 1, i - 1, bC), bm.insert(a.line + 1, l)
                }
                if (e.lineWrapping) {
                    var q = N.clientWidth / dt() - 3;
                    bm.iter(a.line, a.line + c.length, function (a) {
                        if (a.hidden) return;
                        var b = Math.ceil(a.text.length / q) || 1;
                        b != a.height && bQ(a, b)
                    })
                } else bm.iter(a.line, n + c.length, function (a) {
                    var b = a.text;
                    b.length > h && (bI = b, h = b.length, bJ = null, g = !1)
                }), g && (h = 0, bI = "", bJ = null, bm.iter(0, bm.size, function (a) {
                    var b = a.text;
                    b.length > h && (h = b.length, bI = b)
                }));
                var r = [],
                    s = c.length - i - 1;
                for (var n = 0, t = bn.length; n < t; ++n) {
                    var u = bn[n];
                    u < a.line ? r.push(u) : u > b.line && r.push(u + s)
                }
                var v = a.line + Math.min(c.length, 500);
                dD(a.line, v), r.push(v), bn = r, dF(100), bx.push({
                    from: a.line,
                    to: b.line + 1,
                    diff: s
                });
                var w = {
                    from: a,
                    to: b,
                    text: c
                };
                if (by) {
                    for (var x = by; x.next; x = x.next);
                    x.next = w
                } else by = w;
                cE(d, f, y(bp.from.line), y(bp.to.line)), _.style.height = bm.height * dq() + 2 * du() + "px"
            }
            function ch(a, b, c) {
                function d(d) {
                    if (R(d, b)) return d;
                    if (!R(c, d)) return e;
                    var f = d.line + a.length - (c.line - b.line) - 1,
                        g = d.ch;
                    return d.line == c.line && (g += a[a.length - 1].length - (c.ch - (c.line == b.line ? b.ch : 0))), {
                        line: f,
                        ch: g
                    }
                }
                b = cI(b), c ? c = cI(c) : c = b, a = Y(a);
                var e;
                return cj(a, b, c, function (a) {
                    return e = a, {
                        from: d(bp.from),
                        to: d(bp.to)
                    }
                }), e
            }
            function ci(a, b) {
                cj(Y(a), bp.from, bp.to, function (a) {
                    return b == "end" ? {
                        from: a,
                        to: a
                    } : b == "start" ? {
                        from: bp.from,
                        to: bp.from
                    } : {
                        from: bp.from,
                        to: a
                    }
                })
            }
            function cj(a, b, c, d) {
                var e = a.length == 1 ? a[0].length + b.ch : a[a.length - 1].length,
                    f = d({
                        line: b.line + a.length - 1,
                        ch: e
                    });
                cc(b, c, a, f.from, f.to)
            }
            function ck(a, b) {
                var c = a.line,
                    d = b.line;
                if (c == d) return bP(c).text.slice(a.ch, b.ch);
                var e = [bP(c).text.slice(a.ch)];
                return bm.iter(c + 1, d, function (a) {
                    e.push(a.text)
                }), e.push(bP(d).text.slice(0, b.ch)), e.join("\n")
            }
            function cl() {
                return ck(bp.from, bp.to)
            }
            function cn() {
                if (cm) return;
                bi.set(e.pollInterval, function () {
                    dG(), cq(), bo && cn(), dH()
                })
            }
            function co() {
                function b() {
                    dG();
                    var c = cq();
                    !c && !a ? (a = !0, bi.set(60, b)) : (cm = !1, cn()), dH()
                }
                var a = !1;
                cm = !0, bi.set(20, b)
            }
            function cq() {
                if (bA || !bo || Z(M)) return !1;
                var a = M.value;
                if (a == cp) return !1;
                bq = null;
                var b = 0,
                    c = Math.min(cp.length, a.length);
                while (b < c && cp[b] == a[b])++b;
                return b < cp.length ? bp.from = {
                    line: bp.from.line,
                    ch: bp.from.ch - (cp.length - b)
                } : bu && Q(bp.from, bp.to) && (bp.to = {
                    line: bp.to.line,
                    ch: Math.min(bP(bp.to.line).text.length, bp.to.ch + (a.length - b))
                }), ci(a.slice(b), "end"), cp = a, !0
            }
            function cr(a) {
                Q(bp.from, bp.to) ? a && (cp = M.value = "") : (cp = "", M.value = cl(), M.select())
            }
            function cs() {
                e.readOnly || M.focus()
            }
            function ct() {
                if (!bf.getBoundingClientRect) return;
                var a = bf.getBoundingClientRect();
                if (J && a.top == a.bottom) return;
                var b = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
                (a.top < 0 || a.bottom > b) && bf.scrollIntoView()
            }
            function cu() {
                var a = dj(bp.inverted ? bp.from : bp.to),
                    b = e.lineWrapping ? Math.min(a.x, bd.offsetWidth) : a.x;
                return cv(b, a.y, b, a.yBot)
            }
            function cv(a, b, c, d) {
                var f = dv(),
                    g = du(),
                    h = dq();
                b += g, d += g, a += f, c += f;
                var i = N.clientHeight,
                    j = N.scrollTop,
                    k = !1,
                    l = !0;
                b < j ? (N.scrollTop = Math.max(0, b - 2 * h), k = !0) : d > j + i && (N.scrollTop = d + h - i, k = !0);
                var m = N.clientWidth,
                    n = N.scrollLeft,
                    o = e.fixedGutter ? bb.clientWidth : 0;
                return a < n + o ? (a < 50 && (a = 0), N.scrollLeft = Math.max(0, a - 10 - o), k = !0) : c > m + n - 3 && (N.scrollLeft = c + 10 - m, k = !0, c > _.clientWidth && (l = !1)), k && e.onScroll && e.onScroll(bO), l
            }
            function cw() {
                var a = dq(),
                    b = N.scrollTop - du(),
                    c = Math.max(0, Math.floor(b / a)),
                    d = Math.ceil((b + N.clientHeight) / a);
                return {
                    from: v(bm, c),
                    to: v(bm, d)
                }
            }
            function cx(a, b) {
                if (!N.clientWidth) {
                    bE = bF = bD = 0;
                    return
                }
                var c = cw();
                if (a !== !0 && a.length == 0 && c.from >= bE && c.to <= bF) return;
                var d = Math.max(c.from - 100, 0),
                    f = Math.min(bm.size, c.to + 100);
                bE < d && d - bE < 20 && (d = bE), bF > f && bF - f < 20 && (f = Math.min(bm.size, bF));
                var g = a === !0 ? [] : cy([{
                    from: bE,
                    to: bF,
                    domStart: 0
                }], a),
                    h = 0;
                for (var i = 0; i < g.length; ++i) {
                    var j = g[i];
                    j.from < d && (j.domStart += d - j.from, j.from = d), j.to > f && (j.to = f), j.from >= j.to ? g.splice(i--, 1) : h += j.to - j.from
                }
                if (h == f - d) return;
                g.sort(function (a, b) {
                    return a.domStart - b.domStart
                });
                var k = dq(),
                    l = bb.style.display;
                bg.style.display = bb.style.display = "none", cz(d, f, g), bg.style.display = "";
                var m = d != bE || f != bF || bG != N.clientHeight + k;
                m && (bG = N.clientHeight + k), bE = d, bF = f, bD = w(bm, d), ba.style.top = bD * k + "px", _.style.height = bm.height * k + 2 * du() + "px";
                if (bg.childNodes.length != bF - bE) throw new Error("BAD PATCH! " + JSON.stringify(g) + " size=" + (bF - bE) + " nodes=" + bg.childNodes.length);
                if (e.lineWrapping) {
                    bJ = N.clientWidth;
                    var n = bg.firstChild;
                    bm.iter(bE, bF, function (a) {
                        if (!a.hidden) {
                            var b = Math.round(n.offsetHeight / k) || 1;
                            a.height != b && (bQ(a, b), bB = !0)
                        }
                        n = n.nextSibling
                    })
                } else bJ == null && (bJ = df(bI)), bJ > N.clientWidth ? (bd.style.width = bJ + "px", _.style.width = "", _.style.width = N.scrollWidth + "px") : bd.style.width = _.style.width = "";
                return bb.style.display = l, (m || bB) && cA(), cB(), !b && e.onUpdate && e.onUpdate(bO), !0
            }
            function cy(a, b) {
                for (var c = 0, d = b.length || 0; c < d; ++c) {
                    var e = b[c],
                        f = [],
                        g = e.diff || 0;
                    for (var h = 0, i = a.length; h < i; ++h) {
                        var j = a[h];
                        e.to <= j.from && e.diff ? f.push({
                            from: j.from + g,
                            to: j.to + g,
                            domStart: j.domStart
                        }) : e.to <= j.from || e.from >= j.to ? f.push(j) : (e.from > j.from && f.push({
                            from: j.from,
                            to: e.from,
                            domStart: j.domStart
                        }), e.to < j.to && f.push({
                            from: e.to + g,
                            to: j.to + g,
                            domStart: j.domStart + (e.to - j.from)
                        }))
                    }
                    a = f
                }
                return a
            }
            function cz(a, b, c) {
                if (!c.length) bg.innerHTML = "";
                else {
                    function d(a) {
                        var b = a.nextSibling;
                        return a.parentNode.removeChild(a), b
                    }
                    var e = 0,
                        f = bg.firstChild,
                        g;
                    for (var h = 0; h < c.length; ++h) {
                        var i = c[h];
                        while (i.domStart > e) f = d(f), e++;
                        for (var j = 0, k = i.to - i.from; j < k; ++j) f = f.nextSibling, e++
                    }
                    while (f) f = d(f)
                }
                var l = c.shift(),
                    f = bg.firstChild,
                    j = a,
                    m = bp.from.line,
                    n = bp.to.line,
                    o = m < a && n >= a,
                    p = y.createElement("div"),
                    q;
                bm.iter(a, b, function (a) {
                    var b = null,
                        d = null;
                    o ? (b = 0, n == j && (o = !1, d = bp.to.ch)) : m == j && (n == j ? (b = bp.from.ch, d = bp.to.ch) : (o = !0, b = bp.from.ch)), l && l.to == j && (l = c.shift()), !l || l.from > j ? (a.hidden ? p.innerHTML = "<pre></pre>" : p.innerHTML = a.getHTML(b, d, !0, bK), bg.insertBefore(p.firstChild, f)) : f = f.nextSibling, ++j
                })
            }
            function cA() {
                if (!e.gutter && !e.lineNumbers) return;
                var a = ba.offsetHeight,
                    b = N.clientHeight;
                bb.style.height = (a - b < 2 ? b : a) + "px";
                var c = [],
                    d = bE;
                bm.iter(bE, Math.max(bF, bE + 1), function (a) {
                    if (a.hidden) c.push("<pre></pre>");
                    else {
                        var b = a.gutterMarker,
                            f = e.lineNumbers ? d + e.firstLineNumber : null;
                        b && b.text ? f = b.text.replace("%N%", f != null ? f : "") : f == null && (f = " "), c.push(b && b.style ? '<pre class="' + b.style + '">' : "<pre>", f);
                        for (var g = 1; g < a.height; ++g) c.push("<br/>&#160;");
                        c.push("</pre>")
                    }++d
                }), bb.style.display = "none", bc.innerHTML = c.join("");
                var f = String(bm.size).length,
                    g = bc.firstChild,
                    h = P(g),
                    i = "";
                while (h.length + i.length < f) i += " ";
                i && g.insertBefore(y.createTextNode(i), g.firstChild), bb.style.display = "", bd.style.marginLeft = bb.offsetWidth + "px", bB = !1
            }
            function cB() {
                var a = bp.inverted ? bp.from : bp.to,
                    b = dq(),
                    c = dj(a, !0),
                    d = O(B),
                    f = O(bg);
                L.style.top = c.y + f.top - d.top + "px", L.style.left = c.x + f.left - d.left + "px", Q(bp.from, bp.to) ? (bf.style.top = c.y + "px", bf.style.left = (e.lineWrapping ? Math.min(c.x, bd.offsetWidth) : c.x) + "px", bf.style.display = "") : bf.style.display = "none"
            }
            function cC(a) {
                a ? bq = bq || (bp.inverted ? bp.to : bp.from) : bq = null
            }
            function cD(a, b) {
                var c = bq && cI(bq);
                c && (R(c, a) ? a = c : R(b, c) && (b = c)), cE(a, b), bw = !0
            }
            function cE(a, b, c, d) {
                cM = null, c == null && (c = bp.from.line, d = bp.to.line);
                if (Q(bp.from, a) && Q(bp.to, b)) return;
                if (R(b, a)) {
                    var e = b;
                    b = a, a = e
                }
                a.line != c && (a = cF(a, c, bp.from.ch)), b.line != d && (b = cF(b, d, bp.to.ch)), Q(a, b) ? bp.inverted = !1 : Q(a, bp.to) ? bp.inverted = !1 : Q(b, bp.from) && (bp.inverted = !0), Q(a, b) ? Q(bp.from, bp.to) || bx.push({
                    from: c,
                    to: d + 1
                }) : Q(bp.from, bp.to) ? bx.push({
                    from: a.line,
                    to: b.line + 1
                }) : (Q(a, bp.from) || (a.line < c ? bx.push({
                    from: a.line,
                    to: Math.min(b.line, c) + 1
                }) : bx.push({
                    from: c,
                    to: Math.min(d, a.line) + 1
                })), Q(b, bp.to) || (b.line < d ? bx.push({
                    from: Math.max(c, a.line),
                    to: d + 1
                }) : bx.push({
                    from: Math.max(a.line, d),
                    to: b.line + 1
                }))), bp.from = a, bp.to = b, bz = !0
            }
            function cF(a, b, c) {
                function d(b) {
                    var d = a.line + b,
                        e = b == 1 ? bm.size : -1;
                    while (d != e) {
                        var f = bP(d);
                        if (!f.hidden) {
                            var g = a.ch;
                            if (g > c || g > f.text.length) g = f.text.length;
                            return {
                                line: d,
                                ch: g
                            }
                        }
                        d += b
                    }
                }
                var e = bP(a.line);
                return e.hidden ? a.line >= b ? d(1) || d(-1) : d(-1) || d(1) : a
            }
            function cG(a, b, c) {
                var d = cI({
                    line: a,
                    ch: b || 0
                });
                (c ? cD : cE)(d, d)
            }
            function cH(a) {
                return Math.max(0, Math.min(a, bm.size - 1))
            }
            function cI(a) {
                if (a.line < 0) return {
                    line: 0,
                    ch: 0
                };
                if (a.line >= bm.size) return {
                    line: bm.size - 1,
                    ch: bP(bm.size - 1).text.length
                };
                var b = a.ch,
                    c = bP(a.line).text.length;
                return b == null || b > c ? {
                    line: a.line,
                    ch: c
                } : b < 0 ? {
                    line: a.line,
                    ch: 0
                } : a
            }
            function cJ(a, b) {
                function g() {
                    for (var b = d + a, c = a < 0 ? -1 : bm.size; b != c; b += a) {
                        var e = bP(b);
                        if (!e.hidden) return d = b, f = e, !0
                    }
                }
                function h(b) {
                    if (e == (a < 0 ? 0 : f.text.length)) if (!b && g()) e = a < 0 ? f.text.length : 0;
                    else return !1;
                    else e += a;
                    return !0
                }
                var c = bp.inverted ? bp.from : bp.to,
                    d = c.line,
                    e = c.ch,
                    f = bP(d);
                if (b == "char") h();
                else if (b == "column") h(!0);
                else if (b == "word") {
                    var i = !1;
                    for (;;) {
                        if (a < 0 && !h()) break;
                        if (X(f.text.charAt(e))) i = !0;
                        else if (i) {
                            a < 0 && (a = 1, h());
                            break
                        }
                        if (a > 0 && !h()) break
                    }
                }
                return {
                    line: d,
                    ch: e
                }
            }
            function cK(a, b) {
                var c = a < 0 ? bp.from : bp.to;
                if (bq || Q(bp.from, bp.to)) c = cJ(a, b);
                cG(c.line, c.ch, !0)
            }
            function cL(a, b) {
                Q(bp.from, bp.to) ? a < 0 ? ch("", cJ(a, b), bp.to) : ch("", bp.from, cJ(a, b)) : ch("", bp.from, bp.to), bw = !0
            }
            function cN(a, b) {
                var c = 0,
                    d = dj(bp.inverted ? bp.from : bp.to, !0);
                cM != null && (d.x = cM), b == "page" ? c = N.clientHeight : b == "line" && (c = dq());
                var e = dk(d.x, d.y + c * a + 2);
                cG(e.line, e.ch, !0), cM = d.x
            }
            function cO(a) {
                var b = bP(a.line).text,
                    c = a.ch,
                    d = a.ch;
                while (c > 0 && X(b.charAt(c - 1)))--c;
                while (d < b.length && X(b.charAt(d)))++d;
                cD({
                    line: a.line,
                    ch: c
                }, {
                    line: a.line,
                    ch: d
                })
            }
            function cP(a) {
                cD({
                    line: a,
                    ch: 0
                }, {
                    line: a,
                    ch: bP(a).text.length
                })
            }
            function cQ(a) {
                if (Q(bp.from, bp.to)) return cR(bp.from.line, a);
                var b = bp.to.line - (bp.to.ch ? 0 : 1);
                for (var c = bp.from.line; c <= b; ++c) cR(c, a)
            }
            function cR(a, b) {
                b || (b = "add");
                if (b == "smart") if (!bl.indent) b = "prev";
                else var c = dC(a);
                var d = bP(a),
                    f = d.indentation(e.tabSize),
                    g = d.text.match(/^\s*/)[0],
                    h;
                b == "prev" ? a ? h = bP(a - 1).indentation(e.tabSize) : h = 0 : b == "smart" ? h = bl.indent(c, d.text.slice(g.length), d.text) : b == "add" ? h = f + e.indentUnit : b == "subtract" && (h = f - e.indentUnit), h = Math.max(0, h);
                var i = h - f;
                if (!i) {
                    if (bp.from.line != a && bp.to.line != a) return;
                    var j = g
                } else {
                    var j = "",
                        k = 0;
                    if (e.indentWithTabs) for (var l = Math.floor(h / e.tabSize); l; --l) k += e.tabSize, j += "\t";
                    while (k < h)++k, j += " "
                }
                ch(j, {
                    line: a,
                    ch: 0
                }, {
                    line: a,
                    ch: g.length
                })
            }
            function cS() {
                bl = a.getMode(e, e.mode), bm.iter(0, bm.size, function (a) {
                    a.stateAfter = null
                }), bn = [0], dF()
            }
            function cT() {
                var a = e.gutter || e.lineNumbers;
                bb.style.display = a ? "" : "none", a ? bB = !0 : bg.parentNode.style.marginLeft = 0
            }
            function cU(a, b) {
                if (e.lineWrapping) {
                    B.className += " CodeMirror-wrap";
                    var c = N.clientWidth / dt() - 3;
                    bm.iter(0, bm.size, function (a) {
                        if (a.hidden) return;
                        var b = Math.ceil(a.text.length / c) || 1;
                        b != 1 && bQ(a, b)
                    }), bd.style.width = _.style.width = ""
                } else B.className = B.className.replace(" CodeMirror-wrap", ""), bJ = null, bI = "", bm.iter(0, bm.size, function (a) {
                    a.height != 1 && !a.hidden && bQ(a, 1), a.text.length > bI.length && (bI = a.text)
                });
                bx.push({
                    from: 0,
                    to: bm.size
                })
            }
            function cV() {
                for (var a = '<span class="cm-tab">', b = 0; b < e.tabSize; ++b) a += " ";
                return a + "</span>"
            }
            function cW() {
                bK = cV(), cx(!0)
            }
            function cX() {
                N.className = N.className.replace(/\s*cm-s-\w+/g, "") + e.theme.replace(/(^|\s)\s*/g, " cm-s-")
            }
            function cY() {
                this.set = []
            }
            function cZ(a, b, c) {
                function e(a, b, c, e) {
                    bP(a).addMark(new n(b, c, e, d.set))
                }
                a = cI(a), b = cI(b);
                var d = new cY;
                if (a.line == b.line) e(a.line, a.ch, b.ch, c);
                else {
                    e(a.line, a.ch, null, c);
                    for (var f = a.line + 1, g = b.line; f < g; ++f) e(f, null, null, c);
                    e(b.line, null, b.ch, c)
                }
                return bx.push({
                    from: a.line,
                    to: b.line + 1
                }), d
            }
            function c$(a) {
                a = cI(a);
                var b = new o(a.ch);
                return bP(a.line).addMark(b), b
            }
            function c_(a, b, c) {
                return typeof a == "number" && (a = bP(cH(a))), a.gutterMarker = {
                    text: b,
                    style: c
                }, bB = !0, a
            }
            function da(a) {
                typeof a == "number" && (a = bP(cH(a))), a.gutterMarker = null, bB = !0
            }
            function db(a, b) {
                var c = a,
                    d = a;
                typeof a == "number" ? d = bP(cH(a)) : c = u(a);
                if (c == null) return null;
                if (b(d, c)) bx.push({
                    from: c,
                    to: c + 1
                });
                else return null;
                return d
            }
            function dc(a, b) {
                return db(a, function (a) {
                    if (a.className != b) return a.className = b, !0
                })
            }
            function dd(a, b) {
                return db(a, function (a, c) {
                    if (a.hidden != b) return a.hidden = b, bQ(a, b ? 0 : 1), b && (bp.from.line == c || bp.to.line == c) && cE(cF(bp.from, bp.from.line, bp.from.ch), cF(bp.to, bp.to.line, bp.to.ch)), bB = !0
                })
            }
            function de(a) {
                if (typeof a == "number") {
                    if (!bN(a)) return null;
                    var b = a;
                    a = bP(a);
                    if (!a) return null
                } else {
                    var b = u(a);
                    if (b == null) return null
                }
                var c = a.gutterMarker;
                return {
                    line: b,
                    handle: a,
                    text: a.text,
                    markerText: c && c.text,
                    markerClass: c && c.style,
                    lineClass: a.className
                }
            }
            function df(a) {
                return be.innerHTML = "<pre><span>x</span></pre>", be.firstChild.firstChild.firstChild.nodeValue = a, be.firstChild.firstChild.offsetWidth || 10
            }
            function dg(a, b) {
                function e(a) {
                    return be.innerHTML = "<pre><span>" + c.getHTML(null, null, !1, bK, a) + "</span></pre>", be.firstChild.firstChild.offsetWidth
                }
                if (b <= 0) return 0;
                var c = bP(a),
                    d = c.text,
                    f = 0,
                    g = 0,
                    h = d.length,
                    i, j = Math.min(h, Math.ceil(b / dt()));
                for (;;) {
                    var k = e(j);
                    if (k <= b && j < h) j = Math.min(h, Math.ceil(j * 1.2));
                    else {
                        i = k, h = j;
                        break
                    }
                }
                if (b > i) return h;
                j = Math.floor(h * .8), k = e(j), k < b && (f = j, g = k);
                for (;;) {
                    if (h - f <= 1) return i - b > b - g ? f : h;
                    var l = Math.ceil((f + h) / 2),
                        m = e(l);
                    m > b ? (h = l, i = m) : (f = l, g = m)
                }
            }
            function di(a, b) {
                var c = "";
                if (e.lineWrapping) {
                    var d = a.text.indexOf(" ", b + 2);
                    c = U(a.text.slice(b + 1, d < 0 ? a.text.length : d + (J ? 5 : 0)))
                }
                be.innerHTML = "<pre>" + a.getHTML(null, null, !1, bK, b) + '<span id="CodeMirror-temp-' + dh + '">' + U(a.text.charAt(b) || " ") + "</span>" + c + "</pre>";
                var f = document.getElementById("CodeMirror-temp-" + dh),
                    g = f.offsetTop,
                    h = f.offsetLeft;
                if (J && b && g == 0 && h == 0) {
                    var i = document.createElement("span");
                    i.innerHTML = "x", f.parentNode.insertBefore(i, f.nextSibling), g = i.offsetTop
                }
                return {
                    top: g,
                    left: h
                }
            }
            function dj(a, b) {
                var c, d = dq(),
                    f = d * (w(bm, a.line) - (b ? bD : 0));
                if (a.ch == 0) c = 0;
                else {
                    var g = di(bP(a.line), a.ch);
                    c = g.left, e.lineWrapping && (f += Math.max(0, g.top))
                }
                return {
                    x: c,
                    y: f,
                    yBot: f + d
                }
            }
            function dk(a, b) {
                function l(a) {
                    var b = di(h, a);
                    if (j) {
                        var d = Math.round(b.top / c);
                        return Math.max(0, b.left + (d - k) * N.clientWidth)
                    }
                    return b.left
                }
                b < 0 && (b = 0);
                var c = dq(),
                    d = dt(),
                    f = bD + Math.floor(b / c),
                    g = v(bm, f);
                if (g >= bm.size) return {
                    line: bm.size - 1,
                    ch: bP(bm.size - 1).text.length
                };
                var h = bP(g),
                    i = h.text,
                    j = e.lineWrapping,
                    k = j ? f - w(bm, g) : 0;
                if (a <= 0 && k == 0) return {
                    line: g,
                    ch: 0
                };
                var m = 0,
                    n = 0,
                    o = i.length,
                    p, q = Math.min(o, Math.ceil((a + k * N.clientWidth * .9) / d));
                for (;;) {
                    var r = l(q);
                    if (r <= a && q < o) q = Math.min(o, Math.ceil(q * 1.2));
                    else {
                        p = r, o = q;
                        break
                    }
                }
                if (a > p) return {
                    line: g,
                    ch: o
                };
                q = Math.floor(o * .8), r = l(q), r < a && (m = q, n = r);
                for (;;) {
                    if (o - m <= 1) return {
                        line: g,
                        ch: p - a > a - n ? m : o
                    };
                    var s = Math.ceil((m + o) / 2),
                        t = l(s);
                    t > a ? (o = s, p = t) : (m = s, n = t)
                }
            }
            function dl(a) {
                var b = dj(a, !0),
                    c = O(bd);
                return {
                    x: c.left + b.x,
                    y: c.top + b.y,
                    yBot: c.top + b.yBot
                }
            }
            function dq() {
                if (dp == null) {
                    dp = "<pre>";
                    for (var a = 0; a < 49; ++a) dp += "x<br/>";
                    dp += "x</pre>"
                }
                var b = bg.clientHeight;
                return b == dn ? dm : (dn = b, be.innerHTML = dp, dm = be.firstChild.offsetHeight / 50 || 1, be.innerHTML = "", dm)
            }
            function dt() {
                return N.clientWidth == ds ? dr : (ds = N.clientWidth, dr = df("x"))
            }
            function du() {
                return bd.offsetTop
            }
            function dv() {
                return bd.offsetLeft
            }
            function dw(a, b) {
                var c = O(N, !0),
                    d, e;
                try {
                    d = a.clientX, e = a.clientY
                } catch (a) {
                    return null
                }
                if (!b && (d - c.left > N.clientWidth || e - c.top > N.clientHeight)) return null;
                var f = O(bd, !0);
                return dk(d - f.left, e - f.top)
            }
            function dx(a) {
                function e() {
                    var a = Y(M.value).join("\n");
                    a != d && dJ(ci)(a, "end"), L.style.position = "relative", M.style.cssText = c, bA = !1, cr(!0), cn()
                }
                var b = dw(a);
                if (!b || window.opera) return;
                (Q(bp.from, bp.to) || R(b, bp.from) || !R(b, bp.to)) && dJ(cG)(b.line, b.ch);
                var c = M.style.cssText;
                L.style.position = "absolute", M.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (a.clientY - 5) + "px; left: " + (a.clientX - 5) + "px; z-index: 1000; background: white; " + "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", bA = !0;
                var d = M.value = cl();
                cs(), M.select();
                if (I) {
                    C(a);
                    var f = F(window, "mouseup", function () {
                        f(), setTimeout(e, 20)
                    }, !0)
                } else setTimeout(e, 50)
            }
            function dy() {
                clearInterval(bk);
                var a = !0;
                bf.style.visibility = "", bk = setInterval(function () {
                    bf.style.visibility = (a = !a) ? "" : "hidden"
                }, 650)
            }
            function dA(a) {
                function p(a, b, c) {
                    if (!a.text) return;
                    var d = a.styles,
                        e = g ? 0 : a.text.length - 1,
                        f;
                    for (var i = g ? 0 : d.length - 2, j = g ? d.length : -2; i != j; i += 2 * h) {
                        var k = d[i];
                        if (d[i + 1] != null && d[i + 1] != m) {
                            e += h * k.length;
                            continue
                        }
                        for (var l = g ? 0 : k.length - 1, p = g ? k.length : -1; l != p; l += h, e += h) if (e >= b && e < c && o.test(f = k.charAt(l))) {
                            var q = dz[f];
                            if (q.charAt(1) == ">" == g) n.push(f);
                            else {
                                if (n.pop() != q.charAt(0)) return {
                                    pos: e,
                                    match: !1
                                };
                                if (!n.length) return {
                                    pos: e,
                                    match: !0
                                }
                            }
                        }
                    }
                }
                var b = bp.inverted ? bp.from : bp.to,
                    c = bP(b.line),
                    d = b.ch - 1,
                    e = d >= 0 && dz[c.text.charAt(d)] || dz[c.text.charAt(++d)];
                if (!e) return;
                var f = e.charAt(0),
                    g = e.charAt(1) == ">",
                    h = g ? 1 : -1,
                    i = c.styles;
                for (var j = d + 1, k = 0, l = i.length; k < l; k += 2) if ((j -= i[k].length) <= 0) {
                    var m = i[k + 1];
                    break
                }
                var n = [c.text.charAt(d)],
                    o = /[(){}[\]]/;
                for (var k = b.line, l = g ? Math.min(k + 100, bm.size) : Math.max(-1, k - 100); k != l; k += h) {
                    var c = bP(k),
                        q = k == b.line,
                        r = p(c, q && g ? d + 1 : 0, q && !g ? d : c.text.length);
                    if (r) break
                }
                r || (r = {
                    pos: null,
                    match: !1
                });
                var m = r.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket",
                    s = cZ({
                        line: b.line,
                        ch: d
                    }, {
                        line: b.line,
                        ch: d + 1
                    }, m),
                    t = r.pos != null && cZ({
                        line: k,
                        ch: r.pos
                    }, {
                        line: k,
                        ch: r.pos + 1
                    }, m),
                    u = dJ(function () {
                        s.clear(), t && t.clear()
                    });
                a ? setTimeout(u, 800) : bH = u
            }
            function dB(a) {
                var b, c;
                for (var d = a, f = a - 40; d > f; --d) {
                    if (d == 0) return 0;
                    var g = bP(d - 1);
                    if (g.stateAfter) return d;
                    var h = g.indentation(e.tabSize);
                    if (c == null || b > h) c = d - 1, b = h
                }
                return c
            }
            function dC(a) {
                var b = dB(a),
                    c = b && bP(b - 1).stateAfter;
                return c ? c = k(bl, c) : c = l(bl), bm.iter(b, a, function (a) {
                    a.highlight(bl, c, e.tabSize), a.stateAfter = k(bl, c)
                }), b < a && bx.push({
                    from: b,
                    to: a
                }), a < bm.size && !bP(a).stateAfter && bn.push(a), c
            }
            function dD(a, b) {
                var c = dC(a);
                bm.iter(a, b, function (a) {
                    a.highlight(bl, c, e.tabSize), a.stateAfter = k(bl, c)
                })
            }
            function dE() {
                var a = +(new Date) + e.workTime,
                    b = bn.length;
                while (bn.length) {
                    if (!bP(bE).stateAfter) var c = bE;
                    else var c = bn.pop();
                    if (c >= bm.size) continue;
                    var d = dB(c),
                        f = d && bP(d - 1).stateAfter;
                    f ? f = k(bl, f) : f = l(bl);
                    var g = 0,
                        h = bl.compareStates,
                        i = !1,
                        j = d,
                        m = !1;
                    bm.iter(j, bm.size, function (b) {
                        var d = b.stateAfter;
                        if (+(new Date) > a) return bn.push(j), dF(e.workDelay), i && bx.push({
                            from: c,
                            to: j + 1
                        }), m = !0;
                        var l = b.highlight(bl, f, e.tabSize);
                        l && (i = !0), b.stateAfter = k(bl, f);
                        if (h) {
                            if (d && h(d, f)) return !0
                        } else if (l !== !1 || !d) g = 0;
                        else if (++g > 3 && (!bl.indent || bl.indent(d, "") == bl.indent(f, ""))) return !0;
                        ++j
                    });
                    if (m) return;
                    i && bx.push({
                        from: c,
                        to: j + 1
                    })
                }
                b && e.onHighlightComplete && e.onHighlightComplete(bO)
            }
            function dF(a) {
                if (!bn.length) return;
                bj.set(a, dJ(dE))
            }
            function dG() {
                bv = bw = by = null, bx = [], bz = !1, bC = []
            }
            function dH() {
                var a = !1,
                    b;
                bz && (a = !cu()), bx.length ? b = cx(bx, !0) : (bz && cB(), bB && cA()), a && cu(), bz && (ct(), dy()), bo && !bA && (bv === !0 || bv !== !1 && bz) && cr(bw), bz && e.matchBrackets && setTimeout(dJ(function () {
                    bH && (bH(), bH = null), Q(bp.from, bp.to) && dA(!1)
                }), 20);
                var c = by,
                    d = bC;
                bz && e.onCursorActivity && e.onCursorActivity(bO), c && e.onChange && bO && e.onChange(bO, c);
                for (var f = 0; f < d.length; ++f) d[f](bO);
                b && e.onUpdate && e.onUpdate(bO)
            }
            function dJ(a) {
                return function () {
                    dI++ || dG();
                    try {
                        var b = a.apply(this, arguments)
                    } finally {
                        --dI || dH()
                    }
                    return b
                }
            }
            var e = {},
                m = a.defaults;
            for (var q in m) m.hasOwnProperty(q) && (e[q] = (d && d.hasOwnProperty(q) ? d : m)[q]);
            var y = e.document,
                B = y.createElement("div");
            B.className = "CodeMirror" + (e.lineWrapping ? " CodeMirror-wrap" : ""), B.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px;" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden"></div><pre class="CodeMirror-cursor">&#160;</pre><div></div></div></div></div></div></div>', c.appendChild ? c.appendChild(B) : c(B);
            var L = B.firstChild,
                M = L.firstChild,
                N = B.lastChild,
                _ = N.firstChild,
                ba = _.firstChild,
                bb = ba.firstChild,
                bc = bb.firstChild,
                bd = bb.nextSibling.firstChild,
                be = bd.firstChild,
                bf = be.nextSibling,
                bg = bf.nextSibling;
            cX(), /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent) && (M.style.width = "0px"), K || (bd.draggable = !0), e.tabindex != null && (M.tabIndex = e.tabindex), !e.gutter && !e.lineNumbers && (bb.style.display = "none");
            try {
                df("x")
            } catch (bh) {
                throw bh.message.match(/runtime/i) && (bh = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")), bh
            }
            var bi = new G,
                bj = new G,
                bk, bl, bm = new s([new r([new p("")])]),
                bn, bo;
            cS();
            var bp = {
                from: {
                    line: 0,
                    ch: 0
                },
                to: {
                    line: 0,
                    ch: 0
                },
                inverted: !1
            },
                bq, br, bs, bt, bu = !1,
                bv, bw, bx, by, bz, bA, bB, bC, bD = 0,
                bE = 0,
                bF = 0,
                bG = 0,
                bH, bI = "",
                bJ, bK = cV();
            dJ(function () {
                bR(e.value || ""), bv = !1
            })();
            var bL = new x;
            F(N, "mousedown", dJ(bT)), F(N, "dblclick", dJ(bU)), F(bd, "dragstart", bW), F(bd, "selectstart", A), I || F(N, "contextmenu", dx), F(N, "scroll", function () {
                cx([]), e.fixedGutter && (bb.style.left = N.scrollLeft + "px"), e.onScroll && e.onScroll(bO)
            }), F(window, "resize", function () {
                cx(!0)
            }), F(M, "keyup", dJ(b_)), F(M, "input", co), F(M, "keydown", dJ(bZ)), F(M, "keypress", dJ(b$)), F(M, "focus", ca), F(M, "blur", cb), F(N, "dragenter", C), F(N, "dragover", C), F(N, "drop", dJ(bV)), F(N, "paste", function () {
                cs(), co()
            }), F(M, "paste", co), F(M, "cut", dJ(function () {
                ci("")
            }));
            var bM;
            try {
                bM = y.activeElement == M
            } catch (bh) {}
            bM ? setTimeout(ca, 20) : cb();
            var bO = B.CodeMirror = {
                getValue: bS,
                setValue: dJ(bR),
                getSelection: cl,
                replaceSelection: dJ(ci),
                focus: function () {
                    cs(), ca(), co()
                },
                setOption: function (a, b) {
                    var c = e[a];
                    e[a] = b, a == "mode" || a == "indentUnit" ? cS() : a == "readOnly" && b ? (cb(), M.blur()) : a == "theme" ? cX() : a == "lineWrapping" && c != b ? dJ(cU)() : a == "tabSize" && dJ(cW)(), (a == "lineNumbers" || a == "gutter" || a == "firstLineNumber" || a == "theme") && dJ(cT)()
                },
                getOption: function (a) {
                    return e[a]
                },
                undo: dJ(ce),
                redo: dJ(cf),
                indentLine: dJ(function (a, b) {
                    bN(a) && cR(a, b == null ? "smart" : b ? "add" : "subtract")
                }),
                indentSelection: dJ(cQ),
                historySize: function () {
                    return {
                        undo: bL.done.length,
                        redo: bL.undone.length
                    }
                },
                clearHistory: function () {
                    bL = new x
                },
                matchBrackets: dJ(function () {
                    dA(!0)
                }),
                getTokenAt: dJ(function (a) {
                    return a = cI(a), bP(a.line).getTokenAt(bl, dC(a.line), a.ch)
                }),
                getStateAfter: function (a) {
                    return a = cH(a == null ? bm.size - 1 : a), dC(a + 1)
                },
                cursorCoords: function (a) {
                    return a == null && (a = bp.inverted), dl(a ? bp.from : bp.to)
                },
                charCoords: function (a) {
                    return dl(cI(a))
                },
                coordsChar: function (a) {
                    var b = O(bd);
                    return dk(a.x - b.left, a.y - b.top)
                },
                markText: dJ(cZ),
                setBookmark: c$,
                setMarker: dJ(c_),
                clearMarker: dJ(da),
                setLineClass: dJ(dc),
                hideLine: dJ(function (a) {
                    return dd(a, !0)
                }),
                showLine: dJ(function (a) {
                    return dd(a, !1)
                }),
                onDeleteLine: function (a, b) {
                    if (typeof a == "number") {
                        if (!bN(a)) return null;
                        a = bP(a)
                    }
                    return (a.handlers || (a.handlers = [])).push(b), a
                },
                lineInfo: de,
                addWidget: function (a, b, c, d, e) {
                    a = dj(cI(a));
                    var f = a.yBot,
                        g = a.x;
                    b.style.position = "absolute", _.appendChild(b);
                    if (d == "over") f = a.y;
                    else if (d == "near") {
                        var h = Math.max(N.offsetHeight, bm.height * dq()),
                            i = Math.max(_.clientWidth, bd.clientWidth) - dv();
                        a.yBot + b.offsetHeight > h && a.y > b.offsetHeight && (f = a.y - b.offsetHeight), g + b.offsetWidth > i && (g = i - b.offsetWidth)
                    }
                    b.style.top = f + du() + "px", b.style.left = b.style.right = "", e == "right" ? (g = _.clientWidth - b.offsetWidth, b.style.right = "0px") : (e == "left" ? g = 0 : e == "middle" && (g = (_.clientWidth - b.offsetWidth) / 2), b.style.left = g + dv() + "px"), c && cv(g, f, g + b.offsetWidth, f + b.offsetHeight)
                },
                lineCount: function () {
                    return bm.size
                },
                clipPos: cI,
                getCursor: function (a) {
                    return a == null && (a = bp.inverted), S(a ? bp.from : bp.to)
                },
                somethingSelected: function () {
                    return !Q(bp.from, bp.to)
                },
                setCursor: dJ(function (a, b, c) {
                    b == null && typeof a.line == "number" ? cG(a.line, a.ch, c) : cG(a, b, c)
                }),
                setSelection: dJ(function (a, b, c) {
                    (c ? cD : cE)(cI(a), cI(b || a))
                }),
                getLine: function (a) {
                    if (bN(a)) return bP(a).text
                },
                getLineHandle: function (a) {
                    if (bN(a)) return bP(a)
                },
                setLine: dJ(function (a, b) {
                    bN(a) && ch(b, {
                        line: a,
                        ch: 0
                    }, {
                        line: a,
                        ch: bP(a).text.length
                    })
                }),
                removeLine: dJ(function (a) {
                    bN(a) && ch("", {
                        line: a,
                        ch: 0
                    }, cI({
                        line: a + 1,
                        ch: 0
                    }))
                }),
                replaceRange: dJ(ch),
                getRange: function (a, b) {
                    return ck(cI(a), cI(b))
                },
                execCommand: function (a) {
                    return g[a](bO)
                },
                moveH: dJ(cK),
                deleteH: dJ(cL),
                moveV: dJ(cN),
                toggleOverwrite: function () {
                    bu = !bu
                },
                posFromIndex: function (a) {
                    var b = 0,
                        c;
                    return bm.iter(0, bm.size, function (d) {
                        var e = d.text.length + 1;
                        if (e > a) return c = a, !0;
                        a -= e, ++b
                    }), cI({
                        line: b,
                        ch: c
                    })
                },
                indexFromPos: function (a) {
                    if (a.line < 0 || a.ch < 0) return 0;
                    var b = a.ch;
                    return bm.iter(0, a.line, function (a) {
                        b += a.text.length + 1
                    }), b
                },
                operation: function (a) {
                    return dJ(a)()
                },
                refresh: function () {
                    cx(!0)
                },
                getInputField: function () {
                    return M
                },
                getWrapperElement: function () {
                    return B
                },
                getScrollerElement: function () {
                    return N
                },
                getGutterElement: function () {
                    return bb
                }
            },
                bY = null,
                cm = !1,
                cp = "",
                cM = null;
            cY.prototype.clear = dJ(function () {
                var a = Infinity,
                    b = -Infinity;
                for (var c = 0, d = this.set.length; c < d; ++c) {
                    var e = this.set[c],
                        f = e.marked;
                    if (!f || !e.parent) continue;
                    var g = u(e);
                    a = Math.min(a, g), b = Math.max(b, g);
                    for (var h = 0; h < f.length; ++h) f[h].set == this.set && f.splice(h--, 1)
                }
                a != Infinity && bx.push({
                    from: a,
                    to: b + 1
                })
            }), cY.prototype.find = function () {
                var a, b;
                for (var c = 0, d = this.set.length; c < d; ++c) {
                    var e = this.set[c],
                        f = e.marked;
                    for (var g = 0; g < f.length; ++g) {
                        var h = f[g];
                        if (h.set == this.set) if (h.from != null || h.to != null) {
                            var i = u(e);
                            i != null && (h.from != null && (a = {
                                line: i,
                                ch: h.from
                            }), h.to != null && (b = {
                                line: i,
                                ch: h.to
                            }))
                        }
                    }
                }
                return {
                    from: a,
                    to: b
                }
            };
            var dh = Math.floor(Math.random() * 16777215).toString(16),
                dm, dn, dp, dr, ds = 0,
                dz = {
                    "(": ")>",
                    ")": "(<",
                    "[": "]>",
                    "]": "[<",
                    "{": "}>",
                    "}": "{<"
                },
                dI = 0;
            for (var dK in f) f.propertyIsEnumerable(dK) && !bO.propertyIsEnumerable(dK) && (bO[dK] = f[dK]);
            return bO
        }
        function i(a, b, c) {
            function d(a, b, c) {
                var e = b[a];
                if (e != null) return e;
                c == null && (c = b.fallthrough);
                if (c == null) return b.catchall;
                if (typeof c == "string") return d(a, h[c]);
                for (var f = 0, g = c.length; f < g; ++f) {
                    e = d(a, h[c[f]]);
                    if (e != null) return e
                }
                return null
            }
            return b ? d(a, b, c) : d(a, h[c])
        }
        function j(a) {
            var b = $[a.keyCode];
            return b == "Ctrl" || b == "Alt" || b == "Shift" || b == "Mod"
        }
        function k(a, b) {
            if (b === !0) return b;
            if (a.copyState) return a.copyState(b);
            var c = {};
            for (var d in b) {
                var e = b[d];
                e instanceof Array && (e = e.concat([])), c[d] = e
            }
            return c
        }
        function l(a, b, c) {
            return a.startState ? a.startState(b, c) : !0
        }
        function m(a, b) {
            this.pos = this.start = 0, this.string = a, this.tabSize = b || 8
        }
        function n(a, b, c, d) {
            this.from = a, this.to = b, this.style = c, this.set = d
        }
        function o(a) {
            this.from = a, this.to = a, this.line = null
        }
        function p(a, b) {
            this.styles = b || [a, null], this.text = a, this.height = 1, this.marked = this.gutterMarker = this.className = this.handlers = null, this.stateAfter = this.parent = this.hidden = null
        }
        function q(a, b, c, d) {
            for (var e = 0, f = 0, g = 0; f < b; e += 2) {
                var h = c[e],
                    i = f + h.length;
                g == 0 ? (i > a && d.push(h.slice(a - f, Math.min(h.length, b - f)), c[e + 1]), i >= a && (g = 1)) : g == 1 && (i > b ? d.push(h.slice(0, b - f), c[e + 1]) : d.push(h, c[e + 1])), f = i
            }
        }
        function r(a) {
            this.lines = a, this.parent = null;
            for (var b = 0, c = a.length, d = 0; b < c; ++b) a[b].parent = this, d += a[b].height;
            this.height = d
        }
        function s(a) {
            this.children = a;
            var b = 0,
                c = 0;
            for (var d = 0, e = a.length; d < e; ++d) {
                var f = a[d];
                b += f.chunkSize(), c += f.height, f.parent = this
            }
            this.size = b, this.height = c, this.parent = null
        }
        function t(a, b) {
            while (!a.lines) for (var c = 0;; ++c) {
                var d = a.children[c],
                    e = d.chunkSize();
                if (b < e) {
                    a = d;
                    break
                }
                b -= e
            }
            return a.lines[b]
        }
        function u(a) {
            if (a.parent == null) return null;
            var b = a.parent,
                c = W(b.lines, a);
            for (var d = b.parent; d; b = d, d = d.parent) for (var e = 0, f = d.children.length;; ++e) {
                if (d.children[e] == b) break;
                c += d.children[e].chunkSize()
            }
            return c
        }
        function v(a, b) {
            var c = 0;
            d: do {
                for (var e = 0, f = a.children.length; e < f; ++e) {
                    var g = a.children[e],
                        h = g.height;
                    if (b < h) {
                        a = g;
                        continue d
                    }
                    b -= h, c += g.chunkSize()
                }
                return c
            } while (!a.lines);
            for (var e = 0, f = a.lines.length; e < f; ++e) {
                var i = a.lines[e],
                    j = i.height;
                if (b < j) break;
                b -= j
            }
            return c + e
        }
        function w(a, b) {
            var c = 0;
            d: do {
                for (var e = 0, f = a.children.length; e < f; ++e) {
                    var g = a.children[e],
                        h = g.chunkSize();
                    if (b < h) {
                        a = g;
                        continue d
                    }
                    b -= h, c += g.height
                }
                return c
            } while (!a.lines);
            for (var e = 0; e < b; ++e) c += a.lines[e].height;
            return c
        }
        function x() {
            this.time = 0, this.done = [], this.undone = []
        }
        function y() {
            C(this)
        }
        function z(a) {
            return a.stop || (a.stop = y), a
        }
        function A(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        }
        function B(a) {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        }
        function C(a) {
            A(a), B(a)
        }
        function D(a) {
            return a.target || a.srcElement
        }
        function E(a) {
            if (a.which) return a.which;
            if (a.button & 1) return 1;
            if (a.button & 2) return 3;
            if (a.button & 4) return 2
        }
        function F(a, b, c, d) {
            if (typeof a.addEventListener == "function") {
                a.addEventListener(b, c, !1);
                if (d) return function () {
                    a.removeEventListener(b, c, !1)
                }
            } else {
                var e = function (a) {
                        c(a || window.event)
                    };
                a.attachEvent("on" + b, e);
                if (d) return function () {
                    a.detachEvent("on" + b, e)
                }
            }
        }
        function G() {
            this.id = null
        }
        function M(a, b, c) {
            b == null && (b = a.search(/[^\s\u00a0]/), b == -1 && (b = a.length));
            for (var d = 0, e = 0; d < b; ++d) a.charAt(d) == "\t" ? e += c - e % c : ++e;
            return e
        }
        function N(a) {
            return a.currentStyle ? a.currentStyle : window.getComputedStyle(a, null)
        }
        function O(a, b) {
            var c = a.ownerDocument.body,
                d = 0,
                e = 0,
                f = !1;
            for (var g = a; g; g = g.offsetParent) {
                var h = g.offsetLeft,
                    i = g.offsetTop;
                g == c ? (d += Math.abs(h), e += Math.abs(i)) : (d += h, e += i), b && N(g).position == "fixed" && (f = !0)
            }
            var j = b && !f ? null : c;
            for (var g = a.parentNode; g != j; g = g.parentNode) g.scrollLeft != null && (d -= g.scrollLeft, e -= g.scrollTop);
            return {
                left: d,
                top: e
            }
        }
        function P(a) {
            return a.textContent || a.innerText || a.nodeValue || ""
        }
        function Q(a, b) {
            return a.line == b.line && a.ch == b.ch
        }
        function R(a, b) {
            return a.line < b.line || a.line == b.line && a.ch < b.ch
        }
        function S(a) {
            return {
                line: a.line,
                ch: a.ch
            }
        }
        function U(a) {
            return T.textContent = a, T.innerHTML
        }
        function V(a, b) {
            if (!b) return a ? a.length : 0;
            if (!a) return b.length;
            for (var c = a.length, d = b.length; c >= 0 && d >= 0; --c, --d) if (a.charAt(c) != b.charAt(d)) break;
            return d + 1
        }
        function W(a, b) {
            if (a.indexOf) return a.indexOf(b);
            for (var c = 0, d = a.length; c < d; ++c) if (a[c] == b) return c;
            return -1
        }
        function X(a) {
            return /\w/.test(a) || a.toUpperCase() != a.toLowerCase()
        }
        a.defaults = {
            value: "",
            mode: null,
            theme: "default",
            indentUnit: 2,
            indentWithTabs: !1,
            tabSize: 4,
            keyMap: "default",
            extraKeys: null,
            electricChars: !0,
            onKeyEvent: null,
            lineWrapping: !1,
            lineNumbers: !1,
            gutter: !1,
            fixedGutter: !1,
            firstLineNumber: 1,
            readOnly: !1,
            onChange: null,
            onCursorActivity: null,
            onGutterClick: null,
            onHighlightComplete: null,
            onUpdate: null,
            onFocus: null,
            onBlur: null,
            onScroll: null,
            matchBrackets: !1,
            workTime: 100,
            workDelay: 200,
            pollInterval: 100,
            undoDepth: 40,
            tabindex: null,
            document: window.document
        };
        var b = /Mac/.test(navigator.platform),
            c = /Win/.test(navigator.platform),
            d = {},
            e = {};
        a.defineMode = function (b, c) {
            !a.defaults.mode && b != "null" && (a.defaults.mode = b), d[b] = c
        }, a.defineMIME = function (a, b) {
            e[a] = b
        }, a.getMode = function (b, c) {
            typeof c == "string" && e.hasOwnProperty(c) && (c = e[c]);
            if (typeof c == "string") var f = c,
                g = {};
            else if (c != null) var f = c.name,
                g = c;
            var h = d[f];
            return h ? h(b, g || {}) : (window.console && console.warn("No mode " + f + " found, falling back to plain text."), a.getMode(b, "text/plain"))
        }, a.listModes = function () {
            var a = [];
            for (var b in d) d.propertyIsEnumerable(b) && a.push(b);
            return a
        }, a.listMIMEs = function () {
            var a = [];
            for (var b in e) e.propertyIsEnumerable(b) && a.push({
                mime: b,
                mode: e[b]
            });
            return a
        };
        var f = a.extensions = {};
        a.defineExtension = function (a, b) {
            f[a] = b
        };
        var g = a.commands = {
            selectAll: function (a) {
                a.setSelection({
                    line: 0,
                    ch: 0
                }, {
                    line: a.lineCount() - 1
                })
            },
            killLine: function (a) {
                var b = a.getCursor(!0),
                    c = a.getCursor(!1),
                    d = !Q(b, c);
                !d && a.getLine(b.line).length == b.ch ? a.replaceRange("", b, {
                    line: b.line + 1,
                    ch: 0
                }) : a.replaceRange("", b, d ? c : {
                    line: b.line
                })
            },
            deleteLine: function (a) {
                var b = a.getCursor().line;
                a.replaceRange("", {
                    line: b,
                    ch: 0
                }, {
                    line: b
                })
            },
            undo: function (a) {
                a.undo()
            },
            redo: function (a) {
                a.redo()
            },
            goDocStart: function (a) {
                a.setCursor(0, 0, !0)
            },
            goDocEnd: function (a) {
                a.setSelection({
                    line: a.lineCount() - 1
                }, null, !0)
            },
            goLineStart: function (a) {
                a.setCursor(a.getCursor().line, 0, !0)
            },
            goLineStartSmart: function (a) {
                var b = a.getCursor(),
                    c = a.getLine(b.line),
                    d = Math.max(0, c.search(/\S/));
                a.setCursor(b.line, b.ch <= d && b.ch ? 0 : d, !0)
            },
            goLineEnd: function (a) {
                a.setSelection({
                    line: a.getCursor().line
                }, null, !0)
            },
            goLineUp: function (a) {
                a.moveV(-1, "line")
            },
            goLineDown: function (a) {
                a.moveV(1, "line")
            },
            goPageUp: function (a) {
                a.moveV(-1, "page")
            },
            goPageDown: function (a) {
                a.moveV(1, "page")
            },
            goCharLeft: function (a) {
                a.moveH(-1, "char")
            },
            goCharRight: function (a) {
                a.moveH(1, "char")
            },
            goColumnLeft: function (a) {
                a.moveH(-1, "column")
            },
            goColumnRight: function (a) {
                a.moveH(1, "column")
            },
            goWordLeft: function (a) {
                a.moveH(-1, "word")
            },
            goWordRight: function (a) {
                a.moveH(1, "word")
            },
            delCharLeft: function (a) {
                a.deleteH(-1, "char")
            },
            delCharRight: function (a) {
                a.deleteH(1, "char")
            },
            delWordLeft: function (a) {
                a.deleteH(-1, "word")
            },
            delWordRight: function (a) {
                a.deleteH(1, "word")
            },
            indentAuto: function (a) {
                a.indentSelection("smart")
            },
            indentMore: function (a) {
                a.indentSelection("add")
            },
            indentLess: function (a) {
                a.indentSelection("subtract")
            },
            insertTab: function (a) {
                a.replaceSelection("\t", "end")
            },
            transposeChars: function (a) {
                var b = a.getCursor(),
                    c = a.getLine(b.line);
                b.ch > 0 && b.ch < c.length - 1 && a.replaceRange(c.charAt(b.ch) + c.charAt(b.ch - 1), {
                    line: b.line,
                    ch: b.ch - 1
                }, {
                    line: b.line,
                    ch: b.ch + 1
                })
            },
            newlineAndIndent: function (a) {
                a.replaceSelection("\n", "end"), a.indentLine(a.getCursor().line)
            },
            toggleOverwrite: function (a) {
                a.toggleOverwrite()
            }
        },
            h = a.keyMap = {};
        h.basic = {
            Left: "goCharLeft",
            Right: "goCharRight",
            Up: "goLineUp",
            Down: "goLineDown",
            End: "goLineEnd",
            Home: "goLineStartSmart",
            PageUp: "goPageUp",
            PageDown: "goPageDown",
            Delete: "delCharRight",
            Backspace: "delCharLeft",
            Tab: "indentMore",
            "Shift-Tab": "indentLess",
            Enter: "newlineAndIndent",
            Insert: "toggleOverwrite"
        }, h.pcDefault = {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Alt-Up": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Down": "goDocEnd",
            "Ctrl-Left": "goWordLeft",
            "Ctrl-Right": "goWordRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delWordLeft",
            "Ctrl-Delete": "delWordRight",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            fallthrough: "basic"
        }, h.macDefault = {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goWordLeft",
            "Alt-Right": "goWordRight",
            "Cmd-Left": "goLineStart",
            "Cmd-Right": "goLineEnd",
            "Alt-Backspace": "delWordLeft",
            "Ctrl-Alt-Backspace": "delWordRight",
            "Alt-Delete": "delWordRight",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            fallthrough: ["basic", "emacsy"]
        }, h["default"] = b ? h.macDefault : h.pcDefault, h.emacsy = {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Alt-F": "goWordRight",
            "Alt-B": "goWordLeft",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageUp",
            "Shift-Ctrl-V": "goPageDown",
            "Ctrl-D": "delCharRight",
            "Ctrl-H": "delCharLeft",
            "Alt-D": "delWordRight",
            "Alt-Backspace": "delWordLeft",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars"
        }, a.fromTextArea = function (b, c) {
            function d() {
                b.value = h.getValue()
            }
            c || (c = {}), c.value = b.value, !c.tabindex && b.tabindex && (c.tabindex = b.tabindex);
            if (b.form) {
                var e = F(b.form, "submit", d, !0);
                if (typeof b.form.submit == "function") {
                    var f = b.form.submit;

                    function g() {
                        d(), b.form.submit = f, b.form.submit(), b.form.submit = g
                    }
                    b.form.submit = g
                }
            }
            b.style.display = "none";
            var h = a(function (a) {
                b.parentNode.insertBefore(a, b.nextSibling)
            }, c);
            return h.save = d, h.getTextArea = function () {
                return b
            }, h.toTextArea = function () {
                d(), b.parentNode.removeChild(h.getWrapperElement()), b.style.display = "", b.form && (e(), typeof b.form.submit == "function" && (b.form.submit = f))
            }, h
        }, a.copyState = k, a.startState = l, m.prototype = {
            eol: function () {
                return this.pos >= this.string.length
            },
            sol: function () {
                return this.pos == 0
            },
            peek: function () {
                return this.string.charAt(this.pos)
            },
            next: function () {
                if (this.pos < this.string.length) return this.string.charAt(this.pos++)
            },
            eat: function (a) {
                var b = this.string.charAt(this.pos);
                if (typeof a == "string") var c = b == a;
                else var c = b && (a.test ? a.test(b) : a(b));
                if (c) return ++this.pos, b
            },
            eatWhile: function (a) {
                var b = this.pos;
                while (this.eat(a));
                return this.pos > b
            },
            eatSpace: function () {
                var a = this.pos;
                while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;
                return this.pos > a
            },
            skipToEnd: function () {
                this.pos = this.string.length
            },
            skipTo: function (a) {
                var b = this.string.indexOf(a, this.pos);
                if (b > -1) return this.pos = b, !0
            },
            backUp: function (a) {
                this.pos -= a
            },
            column: function () {
                return M(this.string, this.start, this.tabSize)
            },
            indentation: function () {
                return M(this.string, null, this.tabSize)
            },
            match: function (a, b, c) {
                if (typeof a != "string") {
                    var e = this.string.slice(this.pos).match(a);
                    return e && b !== !1 && (this.pos += e[0].length), e
                }
                function d(a) {
                    return c ? a.toLowerCase() : a
                }
                if (d(this.string).indexOf(d(a), this.pos) == this.pos) return b !== !1 && (this.pos += a.length), !0
            },
            current: function () {
                return this.string.slice(this.start, this.pos)
            }
        }, a.StringStream = m, n.prototype = {
            attach: function (a) {
                this.set.push(a)
            },
            detach: function (a) {
                var b = W(this.set, a);
                b > -1 && this.set.splice(b, 1)
            },
            split: function (a, b) {
                if (this.to <= a && this.to != null) return null;
                var c = this.from < a || this.from == null ? null : this.from - a + b,
                    d = this.to == null ? null : this.to - a + b;
                return new n(c, d, this.style, this.set)
            },
            dup: function () {
                return new n(null, null, this.style, this.set)
            },
            clipTo: function (a, b, c, d, e) {
                this.from != null && this.from >= b && (this.from = Math.max(d, this.from) + e), this.to != null && this.to > b && (this.to = d < this.to ? this.to + e : b), a && d > this.from && (d < this.to || this.to == null) && (this.from = null), c && (b < this.to || this.to == null) && (b > this.from || this.from == null) && (this.to = null)
            },
            isDead: function () {
                return this.from != null && this.to != null && this.from >= this.to
            },
            sameSet: function (a) {
                return this.set == a.set
            }
        }, o.prototype = {
            attach: function (a) {
                this.line = a
            },
            detach: function (a) {
                this.line == a && (this.line = null)
            },
            split: function (a, b) {
                if (a < this.from) return this.from = this.to = this.from - a + b, this
            },
            isDead: function () {
                return this.from > this.to
            },
            clipTo: function (a, b, c, d, e) {
                (a || b < this.from) && (c || d > this.to) ? (this.from = 0, this.to = -1) : this.from > b && (this.from = this.to = Math.max(d, this.from) + e)
            },
            sameSet: function (a) {
                return !1
            },
            find: function () {
                return !this.line || !this.line.parent ? null : {
                    line: u(this.line),
                    ch: this.from
                }
            },
            clear: function () {
                if (this.line) {
                    var a = W(this.line.marked, this);
                    a != -1 && this.line.marked.splice(a, 1), this.line = null
                }
            }
        }, p.inheritMarks = function (a, b) {
            var c = new p(a),
                d = b && b.marked;
            if (d) for (var e = 0; e < d.length; ++e) if (d[e].to == null && d[e].style) {
                var f = c.marked || (c.marked = []),
                    g = d[e],
                    h = g.dup();
                f.push(h), h.attach(c)
            }
            return c
        }, p.prototype = {
            replace: function (a, b, c) {
                var d = [],
                    e = this.marked,
                    f = b == null ? this.text.length : b;
                q(0, a, this.styles, d), c && d.push(c, null), q(f, this.text.length, this.styles, d), this.styles = d, this.text = this.text.slice(0, a) + c + this.text.slice(f), this.stateAfter = null;
                if (e) {
                    var g = c.length - (f - a);
                    for (var h = 0, i = e[h]; h < e.length; ++h) i.clipTo(a == null, a || 0, b == null, f, g), i.isDead() && (i.detach(this), e.splice(h--, 1))
                }
            },
            split: function (a, b) {
                var c = [b, null],
                    d = this.marked;
                q(a, this.text.length, this.styles, c);
                var e = new p(b + this.text.slice(a), c);
                if (d) for (var f = 0; f < d.length; ++f) {
                    var g = d[f],
                        h = g.split(a, b.length);
                    h && (e.marked || (e.marked = []), e.marked.push(h), h.attach(e))
                }
                return e
            },
            append: function (a) {
                var b = this.text.length,
                    c = a.marked,
                    d = this.marked;
                this.text += a.text, q(0, a.text.length, a.styles, this.styles);
                if (d) for (var e = 0; e < d.length; ++e) d[e].to == null && (d[e].to = b);
                if (c && c.length) {
                    d || (this.marked = d = []);
                    f: for (var e = 0; e < c.length; ++e) {
                        var g = c[e];
                        if (!g.from) for (var h = 0; h < d.length; ++h) {
                            var i = d[h];
                            if (i.to == b && i.sameSet(g)) {
                                i.to = g.to == null ? null : g.to + b, i.isDead() && (i.detach(this), c.splice(e--, 1));
                                continue f
                            }
                        }
                        d.push(g), g.attach(this), g.from += b, g.to != null && (g.to += b)
                    }
                }
            },
            fixMarkEnds: function (a) {
                var b = this.marked,
                    c = a.marked;
                if (!b) return;
                for (var d = 0; d < b.length; ++d) {
                    var e = b[d],
                        f = e.to == null;
                    if (f && c) for (var g = 0; g < c.length; ++g) if (c[g].sameSet(e)) {
                        f = !1;
                        break
                    }
                    f && (e.to = this.text.length)
                }
            },
            fixMarkStarts: function () {
                var a = this.marked;
                if (!a) return;
                for (var b = 0; b < a.length; ++b) a[b].from == null && (a[b].from = 0)
            },
            addMark: function (a) {
                a.attach(this), this.marked == null && (this.marked = []), this.marked.push(a), this.marked.sort(function (a, b) {
                    return (a.from || 0) - (b.from || 0)
                })
            },
            highlight: function (a, b, c) {
                var d = new m(this.text, c),
                    e = this.styles,
                    f = 0,
                    g = !1,
                    h = e[0],
                    i;
                this.text == "" && a.blankLine && a.blankLine(b);
                while (!d.eol()) {
                    var j = a.token(d, b),
                        k = this.text.slice(d.start, d.pos);
                    d.start = d.pos, f && e[f - 1] == j ? e[f - 2] += k : k && (!g && (e[f + 1] != j || f && e[f - 2] != i) && (g = !0), e[f++] = k, e[f++] = j, i = h, h = e[f]);
                    if (d.pos > 5e3) {
                        e[f++] = this.text.slice(d.pos), e[f++] = null;
                        break
                    }
                }
                return e.length != f && (e.length = f, g = !0), f && e[f - 2] != i && (g = !0), g || (e.length < 5 && this.text.length < 10 ? null : !1)
            },
            getTokenAt: function (a, b, c) {
                var d = this.text,
                    e = new m(d);
                while (e.pos < c && !e.eol()) {
                    e.start = e.pos;
                    var f = a.token(e, b)
                }
                return {
                    start: e.start,
                    end: e.pos,
                    string: e.current(),
                    className: f || null,
                    state: b
                }
            },
            indentation: function (a) {
                return M(this.text, null, a)
            },
            getHTML: function (a, b, c, d, e) {
                function h(a, b) {
                    if (!a) return;
                    g && J && a.charAt(0) == " " && (a = " " + a.slice(1)), g = !1, b ? f.push('<span class="', b, '">', U(a).replace(/\t/g, d), "</span>") : f.push(U(a).replace(/\t/g, d))
                }
                var f = [],
                    g = !0;
                c && f.push(this.className ? '<pre class="' + this.className + '">' : "<pre>");
                var i = this.styles,
                    j = this.text,
                    k = this.marked;
                a == b && (a = null);
                var l = j.length;
                e != null && (l = Math.min(e, l));
                if (!j && e == null) h(" ", a != null && b == null ? "CodeMirror-selected" : null);
                else if (!k && a == null) for (var m = 0, n = 0; n < l; m += 2) {
                    var o = i[m],
                        p = i[m + 1],
                        q = o.length;
                    n + q > l && (o = o.slice(0, l - n)), n += q, h(o, p && "cm-" + p)
                } else {
                    var r = 0,
                        m = 0,
                        s = "",
                        p, t = 0,
                        u = -1,
                        v = null;

                    function w() {
                        k && (u += 1, v = u < k.length ? k[u] : null)
                    }
                    w();
                    while (r < l) {
                        var x = l,
                            y = "";
                        if (a != null) if (a > r) x = a;
                        else if (b == null || b > r) y = " CodeMirror-selected", b != null && (x = Math.min(x, b));
                        while (v && v.to != null && v.to <= r) w();
                        v && (v.from > r ? x = Math.min(x, v.from) : (y += " " + v.style, v.to != null && (x = Math.min(x, v.to))));
                        for (;;) {
                            var z = r + s.length,
                                A = p;
                            y && (A = p ? p + y : y), h(z > x ? s.slice(0, x - r) : s, A);
                            if (z >= x) {
                                s = s.slice(x - r), r = x;
                                break
                            }
                            r = z, s = i[m++], p = "cm-" + i[m++]
                        }
                    }
                    a != null && b == null && h(" ", "CodeMirror-selected")
                }
                return c && f.push("</pre>"), f.join("")
            },
            cleanUp: function () {
                this.parent = null;
                if (this.marked) for (var a = 0, b = this.marked.length; a < b; ++a) this.marked[a].detach(this)
            }
        }, r.prototype = {
            chunkSize: function () {
                return this.lines.length
            },
            remove: function (a, b, c) {
                for (var d = a, e = a + b; d < e; ++d) {
                    var f = this.lines[d];
                    this.height -= f.height, f.cleanUp();
                    if (f.handlers) for (var g = 0; g < f.handlers.length; ++g) c.push(f.handlers[g])
                }
                this.lines.splice(a, b)
            },
            collapse: function (a) {
                a.splice.apply(a, [a.length, 0].concat(this.lines))
            },
            insertHeight: function (a, b, c) {
                this.height += c, this.lines.splice.apply(this.lines, [a, 0].concat(b));
                for (var d = 0, e = b.length; d < e; ++d) b[d].parent = this
            },
            iterN: function (a, b, c) {
                for (var d = a + b; a < d; ++a) if (c(this.lines[a])) return !0
            }
        }, s.prototype = {
            chunkSize: function () {
                return this.size
            },
            remove: function (a, b, c) {
                this.size -= b;
                for (var d = 0; d < this.children.length; ++d) {
                    var e = this.children[d],
                        f = e.chunkSize();
                    if (a < f) {
                        var g = Math.min(b, f - a),
                            h = e.height;
                        e.remove(a, g, c), this.height -= h - e.height, f == g && (this.children.splice(d--, 1), e.parent = null);
                        if ((b -= g) == 0) break;
                        a = 0
                    } else a -= f
                }
                if (this.size - b < 25) {
                    var i = [];
                    this.collapse(i), this.children = [new r(i)]
                }
            },
            collapse: function (a) {
                for (var b = 0, c = this.children.length; b < c; ++b) this.children[b].collapse(a)
            },
            insert: function (a, b) {
                var c = 0;
                for (var d = 0, e = b.length; d < e; ++d) c += b[d].height;
                this.insertHeight(a, b, c)
            },
            insertHeight: function (a, b, c) {
                this.size += b.length, this.height += c;
                for (var d = 0, e = this.children.length; d < e; ++d) {
                    var f = this.children[d],
                        g = f.chunkSize();
                    if (a <= g) {
                        f.insertHeight(a, b, c);
                        if (f.lines && f.lines.length > 50) {
                            while (f.lines.length > 50) {
                                var h = f.lines.splice(f.lines.length - 25, 25),
                                    i = new r(h);
                                f.height -= i.height, this.children.splice(d + 1, 0, i), i.parent = this
                            }
                            this.maybeSpill()
                        }
                        break
                    }
                    a -= g
                }
            },
            maybeSpill: function () {
                if (this.children.length <= 10) return;
                var a = this;
                do {
                    var b = a.children.splice(a.children.length - 5, 5),
                        c = new s(b);
                    if (!a.parent) {
                        var d = new s(a.children);
                        d.parent = a, a.children = [d, c], a = d
                    } else {
                        a.size -= c.size, a.height -= c.height;
                        var e = W(a.parent.children, a);
                        a.parent.children.splice(e + 1, 0, c)
                    }
                    c.parent = a.parent
                } while (a.children.length > 10);
                a.parent.maybeSpill()
            },
            iter: function (a, b, c) {
                this.iterN(a, b - a, c)
            },
            iterN: function (a, b, c) {
                for (var d = 0, e = this.children.length; d < e; ++d) {
                    var f = this.children[d],
                        g = f.chunkSize();
                    if (a < g) {
                        var h = Math.min(b, g - a);
                        if (f.iterN(a, h, c)) return !0;
                        if ((b -= h) == 0) break;
                        a = 0
                    } else a -= g
                }
            }
        }, x.prototype = {
            addChange: function (a, b, c) {
                this.undone.length = 0;
                var d = +(new Date),
                    e = this.done[this.done.length - 1];
                if (d - this.time > 400 || !e || e.start > a + b || e.start + e.added < a - e.added + e.old.length) this.done.push({
                    start: a,
                    added: b,
                    old: c
                });
                else {
                    var f = 0;
                    if (a < e.start) {
                        for (var g = e.start - a - 1; g >= 0; --g) e.old.unshift(c[g]);
                        e.added += e.start - a, e.start = a
                    } else e.start < a && (f = a - e.start, b += f);
                    for (var g = e.added - f, h = c.length; g < h; ++g) e.old.push(c[g]);
                    e.added < b && (e.added = b)
                }
                this.time = d
            }
        }, a.e_stop = C, a.e_preventDefault = A, a.e_stopPropagation = B, a.connect = F, G.prototype = {
            set: function (a, b) {
                clearTimeout(this.id), this.id = setTimeout(b, a)
            }
        };
        var H = function () {
                if (/MSIE [1-8]\b/.test(navigator.userAgent)) return !1;
                var a = document.createElement("div");
                return "draggable" in a
            }(),
            I = /gecko\/\d{7}/i.test(navigator.userAgent),
            J = /MSIE \d/.test(navigator.userAgent),
            K = /WebKit\//.test(navigator.userAgent),
            L = "\n";
        (function () {
            var a = document.createElement("textarea");
            a.value = "foo\nbar", a.value.indexOf("\r") > -1 && (L = "\r\n")
        })(), document.documentElement.getBoundingClientRect != null && (O = function (a, b) {
            try {
                var c = a.getBoundingClientRect();
                c = {
                    top: c.top,
                    left: c.left
                }
            } catch (d) {
                c = {
                    top: 0,
                    left: 0
                }
            }
            if (!b) if (window.pageYOffset == null) {
                var e = document.documentElement || document.body.parentNode;
                e.scrollTop == null && (e = document.body), c.top += e.scrollTop, c.left += e.scrollLeft
            } else c.top += window.pageYOffset, c.left += window.pageXOffset;
            return c
        });
        var T = document.createElement("pre");
        U("a") == "\na" ? U = function (a) {
            return T.textContent = a, T.innerHTML.slice(1)
        } : U("\t") != "\t" && (U = function (a) {
            return T.innerHTML = "", T.appendChild(document.createTextNode(a)), T.innerHTML
        }), a.htmlEscape = U;
        var Y = "\n\nb".split(/\n/).length != 3 ?
        function (a) {
            var b = 0,
                c, d = [];
            while ((c = a.indexOf("\n", b)) > -1) d.push(a.slice(b, a.charAt(c - 1) == "\r" ? c - 1 : c)), b = c + 1;
            return d.push(a.slice(b)), d
        } : function (a) {
            return a.split(/\r?\n/)
        };
        a.splitLines = Y;
        var Z = window.getSelection ?
        function (a) {
            try {
                return a.selectionStart != a.selectionEnd
            } catch (b) {
                return !1
            }
        } : function (a) {
            try {
                var b = a.ownerDocument.selection.createRange()
            } catch (c) {}
            return !b || b.parentElement() != a ? !1 : b.compareEndPoints("StartToEnd", b) != 0
        };
        a.defineMode("null", function () {
            return {
                token: function (a) {
                    a.skipToEnd()
                }
            }
        }), a.defineMIME("text/plain", "null");
        var $ = {
            3: "Enter",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63276: "PageUp",
            63277: "PageDown",
            63275: "End",
            63273: "Home",
            63234: "Left",
            63232: "Up",
            63235: "Right",
            63233: "Down",
            63302: "Insert",
            63272: "Delete"
        };
        return a.keyNames = $, function () {
            for (var a = 0; a < 10; a++) $[a + 48] = String(a);
            for (var a = 65; a <= 90; a++) $[a] = String.fromCharCode(a);
            for (var a = 1; a <= 12; a++) $[a + 111] = $[a + 63235] = "F" + a
        }(), a
    }();
CodeMirror.defineMode("xml", function (a, b) {
    function h(a, b) {
        function c(c) {
            return b.tokenize = c, c(a, b)
        }
        var d = a.next();
        if (d == "<") {
            if (a.eat("!")) return a.eat("[") ? a.match("CDATA[") ? c(k("atom", "]]>")) : null : a.match("--") ? c(k("comment", "-->")) : a.match("DOCTYPE", !0, !0) ? (a.eatWhile(/[\w\._\-]/), c(l(1))) : null;
            if (a.eat("?")) return a.eatWhile(/[\w\._\-]/), b.tokenize = k("meta", "?>"), "meta";
            g = a.eat("/") ? "closeTag" : "openTag", a.eatSpace(), f = "";
            var e;
            while (e = a.eat(/[^\s\u00a0=<>\"\'\/?]/)) f += e;
            return b.tokenize = i, "tag"
        }
        return d == "&" ? (a.eatWhile(/[^;]/), a.eat(";"), "atom") : (a.eatWhile(/[^&<]/), null)
    }
    function i(a, b) {
        var c = a.next();
        return c == ">" || c == "/" && a.eat(">") ? (b.tokenize = h, g = c == ">" ? "endTag" : "selfcloseTag", "tag") : c == "=" ? (g = "equals", null) : /[\'\"]/.test(c) ? (b.tokenize = j(c), b.tokenize(a, b)) : (a.eatWhile(/[^\s\u00a0=<>\"\'\/?]/), "word")
    }
    function j(a) {
        return function (b, c) {
            while (!b.eol()) if (b.next() == a) {
                c.tokenize = i;
                break
            }
            return "string"
        }
    }
    function k(a, b) {
        return function (c, d) {
            while (!c.eol()) {
                if (c.match(b)) {
                    d.tokenize = h;
                    break
                }
                c.next()
            }
            return a
        }
    }
    function l(a) {
        return function (b, c) {
            var d;
            while ((d = b.next()) != null) {
                if (d == "<") return c.tokenize = l(a + 1), c.tokenize(b, c);
                if (d == ">") {
                    if (a == 1) {
                        c.tokenize = h;
                        break
                    }
                    return c.tokenize = l(a - 1), c.tokenize(b, c)
                }
            }
            return "meta"
        }
    }
    function o() {
        for (var a = arguments.length - 1; a >= 0; a--) m.cc.push(arguments[a])
    }
    function p() {
        return o.apply(null, arguments), !0
    }
    function q(a, b) {
        var c = d.doNotIndent.hasOwnProperty(a) || m.context && m.context.noIndent;
        m.context = {
            prev: m.context,
            tagName: a,
            indent: m.indented,
            startOfLine: b,
            noIndent: c
        }
    }
    function r() {
        m.context && (m.context = m.context.prev)
    }
    function s(a) {
        if (a == "openTag") return m.tagName = f, p(v, t(m.startOfLine));
        if (a == "closeTag") {
            var b = !1;
            return m.context ? b = m.context.tagName != f : b = !0, b && (n = "error"), p(u(b))
        }
        return p()
    }
    function t(a) {
        return function (b) {
            return b == "selfcloseTag" || b == "endTag" && d.autoSelfClosers.hasOwnProperty(m.tagName.toLowerCase()) ? p() : b == "endTag" ? (q(m.tagName, a), p()) : p()
        }
    }
    function u(a) {
        return function (b) {
            return a && (n = "error"), b == "endTag" ? (r(), p()) : (n = "error", p(arguments.callee))
        }
    }
    function v(a) {
        return a == "word" ? (n = "attribute", p(v)) : a == "equals" ? p(w, v) : a == "string" ? (n = "error", p(v)) : o()
    }
    function w(a) {
        return a == "word" && d.allowUnquoted ? (n = "string", p()) : a == "string" ? p(x) : o()
    }
    function x(a) {
        return a == "string" ? p(x) : o()
    }
    var c = a.indentUnit,
        d = b.htmlMode ? {
            autoSelfClosers: {
                br: !0,
                img: !0,
                hr: !0,
                link: !0,
                input: !0,
                meta: !0,
                col: !0,
                frame: !0,
                base: !0,
                area: !0
            },
            doNotIndent: {
                pre: !0
            },
            allowUnquoted: !0
        } : {
            autoSelfClosers: {},
            doNotIndent: {},
            allowUnquoted: !1
        },
        e = b.alignCDATA,
        f, g, m, n;
    return {
        startState: function () {
            return {
                tokenize: h,
                cc: [],
                indented: 0,
                startOfLine: !0,
                tagName: null,
                context: null
            }
        },
        token: function (a, b) {
            a.sol() && (b.startOfLine = !0, b.indented = a.indentation());
            if (a.eatSpace()) return null;
            n = g = f = null;
            var c = b.tokenize(a, b);
            b.type = g;
            if ((c || g) && c != "comment") {
                m = b;
                for (;;) {
                    var d = b.cc.pop() || s;
                    if (d(g || c)) break
                }
            }
            return b.startOfLine = !1, n || c
        },
        indent: function (a, b, d) {
            var f = a.context;
            if (a.tokenize != i && a.tokenize != h || f && f.noIndent) return d ? d.match(/^(\s*)/)[0].length : 0;
            if (e && /<!\[CDATA\[/.test(b)) return 0;
            f && /^<\//.test(b) && (f = f.prev);
            while (f && !f.startOfLine) f = f.prev;
            return f ? f.indent + c : 0
        },
        compareStates: function (a, b) {
            if (a.indented != b.indented || a.tokenize != b.tokenize) return !1;
            for (var c = a.context, d = b.context;; c = c.prev, d = d.prev) {
                if (!c || !d) return c == d;
                if (c.tagName != d.tagName) return !1
            }
        },
        electricChars: "/"
    }
}), CodeMirror.defineMIME("application/xml", "xml"), CodeMirror.defineMIME("text/html", {
    name: "xml",
    htmlMode: !0
}), CodeMirror.defineMode("css", function (a) {
    function d(a, b) {
        return c = b, a
    }
    function e(a, b) {
        var c = a.next();
        if (c == "@") return a.eatWhile(/[\w\\\-]/), d("meta", a.current());
        if (c == "/" && a.eat("*")) return b.tokenize = f, f(a, b);
        if (c == "<" && a.eat("!")) return b.tokenize = g, g(a, b);
        if (c == "=") d(null, "compare");
        else return c != "~" && c != "|" || !a.eat("=") ? c == '"' || c == "'" ? (b.tokenize = h(c), b.tokenize(a, b)) : c == "#" ? (a.eatWhile(/[\w\\\-]/), d("atom", "hash")) : c == "!" ? (a.match(/^\s*\w*/), d("keyword", "important")) : /\d/.test(c) ? (a.eatWhile(/[\w.%]/), d("number", "unit")) : /[,.+>*\/]/.test(c) ? d(null, "select-op") : /[;{}:\[\]]/.test(c) ? d(null, c) : (a.eatWhile(/[\w\\\-]/), d("variable", "variable")) : d(null, "compare")
    }
    function f(a, b) {
        var c = !1,
            f;
        while ((f = a.next()) != null) {
            if (c && f == "/") {
                b.tokenize = e;
                break
            }
            c = f == "*"
        }
        return d("comment", "comment")
    }
    function g(a, b) {
        var c = 0,
            f;
        while ((f = a.next()) != null) {
            if (c >= 2 && f == ">") {
                b.tokenize = e;
                break
            }
            c = f == "-" ? c + 1 : 0
        }
        return d("comment", "comment")
    }
    function h(a) {
        return function (b, c) {
            var f = !1,
                g;
            while ((g = b.next()) != null) {
                if (g == a && !f) break;
                f = !f && g == "\\"
            }
            return f || (c.tokenize = e), d("string", "string")
        }
    }
    var b = a.indentUnit,
        c;
    return {
        startState: function (a) {
            return {
                tokenize: e,
                baseIndent: a || 0,
                stack: []
            }
        },
        token: function (a, b) {
            if (a.eatSpace()) return null;
            var d = b.tokenize(a, b),
                e = b.stack[b.stack.length - 1];
            if (c == "hash" && e == "rule") d = "atom";
            else if (d == "variable") if (e == "rule") d = "number";
            else if (!e || e == "@media{") d = "tag";
            return e == "rule" && /^[\{\};]$/.test(c) && b.stack.pop(), c == "{" ? e == "@media" ? b.stack[b.stack.length - 1] = "@media{" : b.stack.push("{") : c == "}" ? b.stack.pop() : c == "@media" ? b.stack.push("@media") : e == "{" && c != "comment" && b.stack.push("rule"), d
        },
        indent: function (a, c) {
            var d = a.stack.length;
            return /^\}/.test(c) && (d -= a.stack[a.stack.length - 1] == "rule" ? 2 : 1), a.baseIndent + d * b
        },
        electricChars: "}"
    }
}), CodeMirror.defineMIME("text/css", "css"), CodeMirror.defineMode("javascript", function (a, b) {
    function g(a, b, c) {
        return b.tokenize = c, c(a, b)
    }
    function h(a, b) {
        var c = !1,
            d;
        while ((d = a.next()) != null) {
            if (d == b && !c) return !1;
            c = !c && d == "\\"
        }
        return c
    }
    function k(a, b, c) {
        return i = a, j = c, b
    }
    function l(a, b) {
        var c = a.next();
        if (c == '"' || c == "'") return g(a, b, m(c));
        if (/[\[\]{}\(\),;\:\.]/.test(c)) return k(c);
        if (c == "0" && a.eat(/x/i)) return a.eatWhile(/[\da-f]/i), k("number", "number");
        if (/\d/.test(c)) return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), k("number", "number");
        if (c == "/") return a.eat("*") ? g(a, b, n) : a.eat("/") ? (a.skipToEnd(), k("comment", "comment")) : b.reAllowed ? (h(a, "/"), a.eatWhile(/[gimy]/), k("regexp", "string")) : (a.eatWhile(f), k("operator", null, a.current()));
        if (c == "#") return a.skipToEnd(), k("error", "error");
        if (f.test(c)) return a.eatWhile(f), k("operator", null, a.current());
        a.eatWhile(/[\w\$_]/);
        var d = a.current(),
            i = e.propertyIsEnumerable(d) && e[d];
        return i ? k(i.type, i.style, d) : k("variable", "variable", d)
    }
    function m(a) {
        return function (b, c) {
            return h(b, a) || (c.tokenize = l), k("string", "string")
        }
    }
    function n(a, b) {
        var c = !1,
            d;
        while (d = a.next()) {
            if (d == "/" && c) {
                b.tokenize = l;
                break
            }
            c = d == "*"
        }
        return k("comment", "comment")
    }
    function p(a, b, c, d, e, f) {
        this.indented = a, this.column = b, this.type = c, this.prev = e, this.info = f, d != null && (this.align = d)
    }
    function q(a, b) {
        for (var c = a.localVars; c; c = c.next) if (c.name == b) return !0
    }
    function r(a, b, c, e, f) {
        var g = a.cc;
        s.state = a, s.stream = f, s.marked = null, s.cc = g, a.lexical.hasOwnProperty("align") || (a.lexical.align = !0);
        for (;;) {
            var h = g.length ? g.pop() : d ? D : C;
            if (h(c, e)) {
                while (g.length && g[g.length - 1].lex) g.pop()();
                return s.marked ? s.marked : c == "variable" && q(a, e) ? "variable-2" : b
            }
        }
    }
    function t() {
        for (var a = arguments.length - 1; a >= 0; a--) s.cc.push(arguments[a])
    }
    function u() {
        return t.apply(null, arguments), !0
    }
    function v(a) {
        var b = s.state;
        if (b.context) {
            s.marked = "def";
            for (var c = b.localVars; c; c = c.next) if (c.name == a) return;
            b.localVars = {
                name: a,
                next: b.localVars
            }
        }
    }
    function x() {
        s.state.context || (s.state.localVars = w), s.state.context = {
            prev: s.state.context,
            vars: s.state.localVars
        }
    }
    function y() {
        s.state.localVars = s.state.context.vars, s.state.context = s.state.context.prev
    }
    function z(a, b) {
        var c = function () {
                var c = s.state;
                c.lexical = new p(c.indented, s.stream.column(), a, null, c.lexical, b)
            };
        return c.lex = !0, c
    }
    function A() {
        var a = s.state;
        a.lexical.prev && (a.lexical.type == ")" && (a.indented = a.lexical.indented), a.lexical = a.lexical.prev)
    }
    function B(a) {
        return function b(b) {
            return b == a ? u() : a == ";" ? t() : u(arguments.callee)
        }
    }
    function C(a) {
        return a == "var" ? u(z("vardef"), K, B(";"), A) : a == "keyword a" ? u(z("form"), D, C, A) : a == "keyword b" ? u(z("form"), C, A) : a == "{" ? u(z("}"), J, A) : a == ";" ? u() : a == "function" ? u(Q) : a == "for" ? u(z("form"), B("("), z(")"), M, B(")"), A, C, A) : a == "variable" ? u(z("stat"), F) : a == "switch" ? u(z("form"), D, z("}", "switch"), B("{"), J, A, A) : a == "case" ? u(D, B(":")) : a == "default" ? u(B(":")) : a == "catch" ? u(z("form"), x, B("("), R, B(")"), C, A, y) : t(z("stat"), D, B(";"), A)
    }
    function D(a) {
        return o.hasOwnProperty(a) ? u(E) : a == "function" ? u(Q) : a == "keyword c" ? u(D) : a == "(" ? u(z(")"), D, B(")"), A, E) : a == "operator" ? u(D) : a == "[" ? u(z("]"), I(D, "]"), A, E) : a == "{" ? u(z("}"), I(H, "}"), A, E) : u()
    }
    function E(a, b) {
        if (a == "operator" && /\+\+|--/.test(b)) return u(E);
        if (a == "operator") return u(D);
        if (a == ";") return;
        if (a == "(") return u(z(")"), I(D, ")"), A, E);
        if (a == ".") return u(G, E);
        if (a == "[") return u(z("]"), D, B("]"), A, E)
    }
    function F(a) {
        return a == ":" ? u(A, C) : t(E, B(";"), A)
    }
    function G(a) {
        if (a == "variable") return s.marked = "property", u()
    }
    function H(a) {
        a == "variable" && (s.marked = "property");
        if (o.hasOwnProperty(a)) return u(B(":"), D)
    }
    function I(a, b) {
        function c(d) {
            return d == "," ? u(a, c) : d == b ? u() : u(B(b))
        }
        return function d(d) {
            return d == b ? u() : t(a, c)
        }
    }
    function J(a) {
        return a == "}" ? u() : t(C, J)
    }
    function K(a, b) {
        return a == "variable" ? (v(b), u(L)) : u()
    }
    function L(a, b) {
        if (b == "=") return u(D, L);
        if (a == ",") return u(K)
    }
    function M(a) {
        return a == "var" ? u(K, O) : a == ";" ? t(O) : a == "variable" ? u(N) : t(O)
    }
    function N(a, b) {
        return b == "in" ? u(D) : u(E, O)
    }
    function O(a, b) {
        return a == ";" ? u(P) : b == "in" ? u(D) : u(D, B(";"), P)
    }
    function P(a) {
        a != ")" && u(D)
    }
    function Q(a, b) {
        if (a == "variable") return v(b), u(Q);
        if (a == "(") return u(z(")"), x, I(R, ")"), A, C, y)
    }
    function R(a, b) {
        if (a == "variable") return v(b), u()
    }
    var c = a.indentUnit,
        d = b.json,
        e = function () {
            function a(a) {
                return {
                    type: a,
                    style: "keyword"
                }
            }
            var b = a("keyword a"),
                c = a("keyword b"),
                d = a("keyword c"),
                e = a("operator"),
                f = {
                    type: "atom",
                    style: "atom"
                };
            return {
                "if": b,
                "while": b,
                "with": b,
                "else": c,
                "do": c,
                "try": c,
                "finally": c,
                "return": d,
                "break": d,
                "continue": d,
                "new": d,
                "delete": d,
                "throw": d,
                "var": a("var"),
                "function": a("function"),
                "catch": a("catch"),
                "for": a("for"),
                "switch": a("switch"),
                "case": a("case"),
                "default": a("default"),
                "in": e,
                "typeof": e,
                "instanceof": e,
                "true": f,
                "false": f,
                "null": f,
                "undefined": f,
                NaN: f,
                Infinity: f
            }
        }(),
        f = /[+\-*&%=<>!?|]/,
        i, j, o = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0
        },
        s = {
            state: null,
            column: null,
            marked: null,
            cc: null
        },
        w = {
            name: "this",
            next: {
                name: "arguments"
            }
        };
    return A.lex = !0, {
        startState: function (a) {
            return {
                tokenize: l,
                reAllowed: !0,
                cc: [],
                lexical: new p((a || 0) - c, 0, "block", !1),
                localVars: null,
                context: null,
                indented: 0
            }
        },
        token: function (a, b) {
            a.sol() && (b.lexical.hasOwnProperty("align") || (b.lexical.align = !1), b.indented = a.indentation());
            if (a.eatSpace()) return null;
            var c = b.tokenize(a, b);
            return i == "comment" ? c : (b.reAllowed = i == "operator" || i == "keyword c" || i.match(/^[\[{}\(,;:]$/), r(b, c, i, j, a))
        },
        indent: function (a, b) {
            if (a.tokenize != l) return 0;
            var d = b && b.charAt(0),
                e = a.lexical,
                f = e.type,
                g = d == f;
            return f == "vardef" ? e.indented + 4 : f == "form" && d == "{" ? e.indented : f == "stat" || f == "form" ? e.indented + c : e.info == "switch" && !g ? e.indented + (/^(?:case|default)\b/.test(b) ? c : 2 * c) : e.align ? e.column + (g ? 0 : 1) : e.indented + (g ? 0 : c)
        },
        electricChars: ":{}"
    }
}), CodeMirror.defineMIME("text/javascript", "javascript"), CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: !0
}), function (a) {
    var b = a({});
    a.each({
        subscribe: "bind",
        unsubscribe: "unbind",
        publish: "trigger"
    }, function (c, d) {
        a[c] = function () {
            b[d].apply(b, arguments)
        }
    })
}(jQuery), window.Quiz = {
    environment: /^(file|localhost):/.test(location) && "testing",
    viewingSolutions: /\?solution/.test(location.search),
    currentQuestion: 0,
    score: 100,
    config: {},
    events: {},
    sandbox: {},
    layout: {}
}, Quiz.engine = {
    reduceScore: function (a, b, c) {
        var d = Math.round(a - 100 / b);
        return function e() {
            Quiz.score > d && Quiz.score >= 1 ? (Quiz.config.SCORE_CONTAINER.text(--Quiz.score + "%"), setTimeout(e, 20)) : typeof c == "function" && c()
        }(), d
    },
    fetchCompletionMessage: function (a) {
        var b = {
            0: "Really? You did not get a single one right?",
            10: "I see very little effort here!",
            20: "Did you watch the lessons?",
            30: "I'm a little embarrassed to post this score!",
            40: "I know you can do better than this!",
            50: "Tsk Tsk Tsk. You missed half.",
            60: "Are you happy with this?",
            70: "Not too bad.",
            80: "Pretty darn good!",
            90: "Well done!",
            100: "Amazing!"
        },
            c = Math.round(a / 10) * 10;
        return c === 0 && a > 0 && (c = 10), b[c]
    },
    assert: function (a, b, c, d) {
        var e, f;
        c = c || !1, typeof Quiz != "undefined" && (d = Quiz.config.QUESTIONS[Quiz.currentQuestion]);
        try {
            function g(b) {
                switch (typeof b) {
                case "string":
                    return a === b;
                case "object":
                    return b.test(a);
                case "function":
                    return b(a);
                case "number":
                    return ~~a === b;
                case "boolean":
                    return a === b + ""
                }
            }
            if (d.sandbox === !1) {
                if ($.isArray(b)) {
                    for (var h = 0, i = b.length; h < i; h++) {
                        e = g(b[h]);
                        if (c && e) return !0;
                        if (!c && !e) return !1
                    }
                    return !c
                }
                return g(b)
            }
            if (!$.isArray(b)) return typeof b == "function" ? (d.prep && Quiz.sandbox.prep(d.prep), Quiz.sandbox.test(b, a), Quiz.sandbox.assertionResults) : g(b)
        } catch (j) {
            return !1
        }
    }
}, Quiz.sandbox = {
    create: function () {
        this.iframe || (this.iframe = $("iframe.sandbox")), setTimeout(function () {
            this.iframeBase || (this.iframeBase = $("iframe.sandbox").contents()[0].documentElement.innerHTML)
        }, 1e3)
    },
    prep: function (a) {
        this.iframe.find("body").append(a)
    },
    test: function (a, b) {
        var c = document.createElement("script");
        c.innerHTML = "try { window.parent.Quiz.sandbox.assertionResults = " + a + '("' + $.trim(escape(b)) + '"); } catch(e) {window.parent.Quiz.sandbox.assertionResults = false;}', this.iframe.contents().find("body")[0].appendChild(c)
    },
    empty: function () {
        this.iframe.contents()[0].documentElement.innerHTML = this.iframeBase
    }
}, window.assert = Quiz.engine.assert;
var questions = [{
    title: "In addition to <code>jQuery()</code>, we can also use a shorter reference to the jQuery function. What is it?",
    choices: ["jQ", "$", "$$", "j"],
    input_type: "radio",
    answer: "$",
    notes: 'If you review the <a href="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js">jQuery source</a> (something you should always do), you will find that <code>jQuery</code> and <code>$</code> can both be used interchangably. The former is most often used in situations when the <code>$</code> can clash with existing code or libraries.',
    sandbox: !0
}, {
    title: "True or False: the <code>jQuery</code> function accepts a CSS selector, which is used to query the DOM for the applicable elements.",
    input_type: "boolean",
    answer: !0,
    notes: 'Remember, you are not limited to mere CSS selectors; you can also pass DOM nodes, and even create elements. For instance, the following code will create a <code>div</code> and append it to the <code>body</code>: <code>$("&lt;div>Hi there&lt;/div>").appendTo("body");</code>'
}, {
    title: 'Query the DOM for the <code>div</code> with an <code>id</code> of <code>container</code> and store a reference to it ("cache it") in a variable, called <code>container</code>.',
    input_type: "textarea",
    prep: '<div id="container">hi from the container</div>',
    answer: 'var container = $("#container");',
    syntax: "javascript",
    validation: function (guess) {
        return guess = unescape(guess), eval(guess), container.is("#container") && container.is("div")
    },
    displayIframe: !1,
    notes: 'Storing the results of a particular query in a variable is often referred to as "caching." This way, we keep from having to dive into the DOM pool over and over to retrieve the same set of elements.'
}, {
    title: "Query the DOM for the <code>ul</code>, and add a class of <code>alternate</code>.",
    input_type: "textarea",
    syntax: "javascript",
    prep: htmlPrettify("<ul><li>Once</li><li>Twice</li><li>Three Times</li><li>A Developer</li></ul>"),
    answer: '$("ul").addClass("alternate");',
    validation: function (a) {
        return $("ul")[0] && $("ul").hasClass("alternate")
    },
    displayIframe: !0,
    notes: "Technically, this code will add a <code>class</code> of <code>alternate</code> to <strong>all</strong> unordered lists in the DOM. If you need to be more specific, you can use an <code>id</code>, or a method like <code>eq()</code> or <code>first()</code> to fine-tune the results."
}, {
    title: "Which of the following is <strong>not</strong> a valid jQuery method?",
    input_type: "radio",
    choices: ["addClass", "next", "prev", "grandparents"],
    answer: "grandparents",
    notes: "Don't take the \"parent-child\" relationship idea too far. <code>grandparents</code> or <code>grandchildren</code> do not exist! Instead, you'd use <code>parents()</code>, <code>closest()</code>, and <code>find()</code>."
}, {
    title: "True or False: We use <code>$(document).ready(fn);</code> to ensure that the DOM has fully loaded before proceeding.",
    input_type: "boolean",
    answer: !0,
    notes: "Alternatively, the same result can be achieved by passing an anonymous function to jQuery."
}, {
    title: 'Use jQuery\'s <code>text</code> method to update the <code>&lt;h1></code> element. Change it to "Updated."',
    input_type: "textarea",
    syntax: "javascript",
    prep: "<h1>jQuery is Amazing</h1>",
    validation: function (a) {
        return /updated/i.test($("h1").text().toLowerCase())
    },
    answer: '$("h1").text("Updated");',
    displayIframe: !0,
    notes: "Should you need to insert actual HTML, you'd instead use the <code>html</code> method."
}, {
    title: "Which method will return the nearest element, moving up the DOM chain, that matches the provided selector?",
    input_type: "radio",
    choices: ["ancestors()", "closest()", "nearest()", "children()"],
    answer: "closest()",
    notes: '<a href="http://api.jquery.com/closest/"><code>closest</code></a> will retrieve the first element that matches a provided selector. It begins at the current element, and works up through the DOM tree.'
}, {
    title: "The box (or <code>div</code>) below has a class of <code>box</code>. Listen for when this box is clicked. When it is, remove the <code>box</code> class. Hint: you will want to use jQuery's <code>on()</code> method.",
    input_type: "textarea",
    syntax: "javascript",
    answer: '$("div.box").on("click", function() { \n   $(this).removeClass("box");\n});',
    prep: "<div class=box>BOX</div>",
    validation: function (a) {
        return $(".box").trigger("click"), $(".box").length === 0
    },
    displayIframe: !0,
    notes: 'In addition to <code>on()</code>, jQuery also provides a handful of "shortcut" methods, such as <code>click()</code> and <code>hover()</code>.'
}, {
    title: "Imagine that you've selected one list item, and now need to select all other list items on that same level. Which method should use to accomplish this?",
    input_type: "text",
    answer: "siblings",
    validation: function (a) {
        return /siblings/i.test(a)
    },
    notes: "Additionally, a selector can be passed to the <code>siblings</code> method. This allows you to filter the matches."
}, {
    title: "Select the fourth list item below, and use the <code>css</code> method to set its background color <br>to 'gray'.",
    input_type: "textarea",
    syntax: "javascript",
    answer: "$('li:nth-child(4)').css('background', 'gray');",
    prep: "<ul><li>one<li>two<li>three<li>four<li>five</ul>",
    validation: function () {
        var a = $("li:nth-child(4)");
        return a.css("background") || a.css("backgroundColor") === "rgb(128, 128, 128)";
    },
    displayIframe: !0,
    notes: 'There were lots of ways to handle this question. In addition to the provided solution, you could also use the <a href="http://api.jquery.com/eq/">eq()</a> method: <code>$("li").eq(3).css("backgroundColor", "gray");</code>. jQuery also allows you to use <code>eq</code> as a custom selectors: <code>$("li:eq(3)");</code>.'
}, {
    title: "True or False: jQuery is just JavaScript.",
    input_type: "boolean",
    answer: !0,
    notes: "Sometimes, it's easy to think of JavaScript and jQuery as entirely separate languages, but they aren't! At its core, jQuery is just JavaScript."
}];
Quiz.config = {
    QUESTIONS: questions,
    SCORE_CONTAINER: $(".score"),
    QUESTIONS_CONTAINER: $("div.primary-content"),
    PERCENTAGE_COMPLETE: $("aside h3.progress"),
    PROGRESS_BAR: $("#progressBar"),
    TEMPLATE: $("#question"),
    RESULTS_CONTAINER: $("#results"),
    EACH_QUESTION: "question",
    CHOICE_CLASS: "choice",
    TRUE_OR_FALSE_CONTAINER: "bool"
}, function () {
    (function () {
        if (typeof Quiz.config.QUESTIONS != "undefined" && !$.isEmptyObject(Quiz.config.QUESTIONS)) $.each(Quiz.config.QUESTIONS, function (a, b) {
            b.syntax || (b.syntax = "xml"), b.displayIframe === undefined && (b.displayIframe = !1), Quiz.config.TEMPLATE.tmpl(b).appendTo(Quiz.config.QUESTIONS_CONTAINER)
        });
        else throw $("<h3>", {
            text: "No questions currently available."
        }).appendTo(Quiz.config.questionsContainer), new Error("No questions provided!")
    })(), Quiz.config.EACH_QUESTION = $("." + Quiz.config.EACH_QUESTION), Quiz.config.TRUE_OR_FALSE_CONTAINER = $("." + Quiz.config.TRUE_OR_FALSE_CONTAINER);
    var a = $("form"),
        b = Quiz.config.EACH_QUESTION.length,
        c = 0,
        d, e = [];
    Quiz.layout = {
        init: function () {
            this.apply_ids(), this.associateLabels(), this.create_number_bubbles(), Quiz.viewingSolutions ? ($(document.documentElement).addClass("solutions"), $.each(a, function (a, b) {
                Quiz.layout.syntaxHighlighting(b)
            }), Modernizr.localstorage && this.attachIncorrectStyling()) : (Quiz.config.EACH_QUESTION.not(":first").hide(), this.syntaxHighlighting()), Quiz.layout.moveIframe(), $.subscribe("iframeReady", function () {
                var a = Quiz.sandbox.iframe,
                    b = questions[Quiz.currentQuestion];
                b.prep && questions[Quiz.currentQuestion].displayIframe && (Quiz.sandbox.prepHTML.html(b.prep), a.show().height(a.contents().find("html").height()), Quiz.sandbox.iframe.delay(300).slideDown(500))
            }), this.formFocus()
        },
        moveIframe: function () {
            $("iframe.sandbox").appendTo(Quiz.config.EACH_QUESTION.eq(Quiz.currentQuestion)).height("auto").hide()
        },
        associateLabels: function () {
            var a;
            Quiz.config.TRUE_OR_FALSE_CONTAINER.each(function (b) {
                $(this).find("input").attr("id", function () {
                    a = this.value + "_" + b, this.id = a, $(this).next("label").attr("for", a)
                })
            })
        },
        attachIncorrectStyling: function () {
            var a;
            Modernizr.localstorage && localStorage.quizResults && (a = localStorage.quizResults.split(","), $.each(a, function (a, b) {
                $("form#" + b).parent(Quiz.config.EACH_QUESTION).addClass("incorrect")
            }))
        },
        formFocus: function () {
            a.click(function () {
                $("textarea", this)[0] && (Quiz.viewingSolutions || d.focus())
            })
        },
        apply_ids: function () {
            a.each(function (a) {
                this.id = a
            })
        },
        update_progress: function () {
            var a = Math.round(++c / b * 100),
                d = parseFloat(Quiz.config.PERCENTAGE_COMPLETE.text(), 10);
            (function e() {
                d <= a && (Quiz.config.PERCENTAGE_COMPLETE.text(d+++"% Complete"), Quiz.config.PROGRESS_BAR.attr("value", d), setTimeout(e, 20))
            })()
        },
        create_number_bubbles: function () {
            Quiz.config.EACH_QUESTION.find("h3").prepend(function () {
                var a = ~~$(this).siblings("form")[0].id + 1;
                return $("<span>", {
                    "class": "count",
                    text: a
                })
            })
        },
        syntaxHighlighting: function (b) {
            var c = $("textarea", b),
                e = c[0] && c.attr("class").replace("choice ", "") || "xml";
            if (!b && !a.first().find("textarea")) return;
            if (c[0]) return d = CodeMirror.fromTextArea(c[0], {
                indentUnit: 3,
                mode: e
            }), d.setOption("onChange", function () {
                d.getValue().length === 0 && questions[Quiz.currentQuestion].syntax === "xml" ? Quiz.sandbox.iframe.hide() : (Quiz.layout.updateIframe(questions[Quiz.currentQuestion].syntax), !questions[Quiz.currentQuestion].displayIframe || Quiz.layout.setIframeHeight(Quiz.sandbox.iframe))
            }), Quiz.viewingSolutions || d.focus(), d
        },
        setIframeHeight: function (a) {
            a.height(a.contents().find("html").height())
        },
        submit: function (a) {
            var b = $(this),
                c = b.find("." + Quiz.config.CHOICE_CLASS),
                e = c.val(),
                f, g = Quiz.config.QUESTIONS[this.id],
                h, i;
            a.preventDefault(), c.is("textarea") && (e = d.getValue()), e = Quiz.layout.fetchGuess(e, b);
            if (!e) return Quiz.layout.pleaseChoose(b), !1;
            h = g.validation ? g.validation : g.answer, f = window.assert(e, h), Quiz.layout.handle_question_result(f, b), Quiz.layout.update_progress(), Quiz.currentQuestion++
        },
        fetchGuess: function (a, b) {
            return a ? a : (a = b.find("input:checked").val(), a)
        },
        pleaseChoose: function (a) {
            a.find("input[type=submit]").val("Please Submit an Answer").prev().css("width", "70%")
        },
        handle_question_result: function (a, c) {
            c.parent().addClass(a ? "correct" : "incorrect"), a ? setTimeout(function () {
                Quiz.layout.nextQuestion(c)
            }, 600) : (Quiz.engine.reduceScore(Quiz.score, b, function () {
                Quiz.layout.nextQuestion(c)
            }), e.push(c.attr("id")))
        },
        nextQuestion: function (a) {
            a.parent(Quiz.config.EACH_QUESTION).fadeOut(500, function () {
                var a = $(this).next(Quiz.config.EACH_QUESTION),
                    b;
                a.length ? (a.show(), a.find("textarea").length ? ($("div.CodeMirror:nth-child(n+1)").remove(), d = Quiz.layout.syntaxHighlighting(a.find("form")), d.focus()) : !(b = a.find("input[type=text]")) || b.focus()) : (Quiz.layout.displayResults(), $.publish("quizComplete")), Quiz.layout.moveIframe()
            })
        },
        displayResults: function () {
            Quiz.config.RESULTS_CONTAINER.find("h2").prepend(Quiz.engine.fetchCompletionMessage(Quiz.score)).show().find("span").text(Quiz.score + "%").end().end().show(), Modernizr.localstorage && (localStorage.quizResults = e)
        },
        updateIframe: function (a) {
            var b = d.getValue(),
                c = {
                    css: function () {
                        Quiz.sandbox.userCSS.html(b)
                    },
                    javascript: function () {
                        Quiz.sandbox.prepHTML.html(Quiz.config.QUESTIONS[Quiz.currentQuestion].prep), Quiz.sandbox.iframe[0].contentWindow.acceptJS(b)
                    },
                    xml: function () {
                        Quiz.sandbox.markup.html(b)
                    }
                };
            if (/css|javascript|xml/i.test(a)) c[a]();
            else return
        },
        iframeReady: function () {
            Quiz.sandbox.iframeContents = Quiz.sandbox.iframe.contents(), Quiz.sandbox.prepHTML = Quiz.sandbox.iframeContents.find("div.prep"), Quiz.sandbox.markup = Quiz.sandbox.iframeContents.find("div.markup"), Quiz.sandbox.userCSS = Quiz.sandbox.iframeContents.find("style#userCSS"), $.publish("iframeReady")
        }
    }, Quiz.events = {
        init: function () {
            $(document).on("keyup", this.keys), a.submit(Quiz.layout.submit)
        },
        keys: function (a) {
            a.ctrlKey && a.keyCode === 13 && a.target.type === "textarea" && $(a.target).trigger("submit")
        }
    }, Quiz.layout.init(), Quiz.sandbox.create(), Quiz.events.init()
}()