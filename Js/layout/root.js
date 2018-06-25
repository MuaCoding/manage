var apiUrl = "https://api.lhcharity.com"
  , mobileSite = "http://m.lhcharity.com";
jQuery.support.cors = !0;
(function(a) {
    a.method = function(b, c, d, e, f, g, h, k) {
        g = null == g ? "true" : g;
        b = null == b || "" == b || "undefined" == typeof b ? "post" : b;
        d = null == d || "" == d || "undefined" == typeof d ? "json" : d;
        e = null == e || "" == e || "undefined" == typeof e ? {
            date: (new Date).getTime()
        } : e;
        a.ajax({
            type: b,
            async: g,
            contentType: "application/json;charset\x3dUTF-8",
            data: e,
            url: apiUrl + c,
            headers: null == f || "" == f || "undefined" == typeof f ? null : f,
            dataType: d,
            success: function(a) {
                h(a)
            },
            error: function(a) {
                k(a)
            }
        })
    }
    ;
    a.getUrlParam = function(a) {
        a = new RegExp("(^|\x26)" + a + "\x3d([^\x26]*)(\x26|$)");
        a = window.location.search.substr(1).match(a);
        return null != a ? unescape(a[2]) : null
    }
}
)(jQuery);
(function() {
    $("img.lazy").lazy();
    // $("html").hasClass("ua-mobile") && (window.location.href = mobileSite)
}
)();
function setCookie(a, b) {
    var c = new Date;
    c.setTime(new Date(c.getTime() + 6048E5));
    document.cookie = a + "\x3d" + escape(b) + ";expires\x3d" + c.toGMTString() + ";path\x3d/"
}
function getCookie(a) {
    var b;
    return (b = document.cookie.match(new RegExp("(^| )" + a + "\x3d([^;]*)(;|$)"))) ? unescape(b[2]) : null
}
function delCookie(a) {
    var b = new Date;
    b.setTime(b.getTime() - 1);
    var c = getCookie(a);
    null != c && (document.cookie = a + "\x3d" + c + ";expires\x3d" + b.toGMTString())
}
function strTrim(a, b) {
    var c;
    c = a.replace(/(^\s+)|(\s+$)/g, "");
    b && (c = c.replace(/\s/g, ""));
    return c
}
function strFilter(a) {
    for (var b = RegExp("[`~!@#$^\x26*()\x3d|{}':;',\\[\\].\x3c\x3e/?~\uff01@#\u00a5\u2026\u2026\x26*\uff08\uff09\u2014\u2014|{}\u3010\u3011\u2018\uff1b\uff1a\u201d\u201c'\u3002\uff0c\u3001\uff1f]"), c = "", d = 0; d < a.length; d++)
        c += a.substr(d, 1).replace(b, "");
    return c
}
function parseISO8601(a) {
    var b = new Date(NaN)
      , c = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/.exec(a);
    c && (a = +c[2],
    b.setFullYear(c[1], a - 1, c[3]),
    a != b.getMonth() + 1 && b.setTime(NaN));
    return b
}
Date.prototype.format = function(a) {
    var b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var c in b)
        (new RegExp("(" + c + ")")).test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
    return a
}
;
function parseTimeStamp(a) {
    a = a.replace(/-/g, "/");
    a = a.replace("T", " ");
    a = a.replace(/(\+[0-9]{2})(\:)([0-9]{2}$)/, " UTC$1$3");
    return a.split(".")[0].replace(/[/]/g, "-")
}
;