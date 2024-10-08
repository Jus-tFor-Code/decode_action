//Tue Oct 08 2024 15:33:17 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("伟人和baby制作聚合直播提取", {
  "logLevel": "silent"
});
var body = $response.body;
(async () => {
  try {
    const l1iIii1 = await loadUtils();
    if (!l1iIii1 || typeof l1iIii1.createCryptoJS !== "function") {
      throw new ReferenceError("Utils 或 createCryptoJS 方法未正确加载");
    }
    const i1IlIll1 = l1iIii1.createCryptoJS(),
      iil11lII = i1IlIll1.enc.Utf8.parse("vEg@fe52!fY(de/d");
    let IIl1IIll = AES_Decrypt(body, iil11lII, i1IlIll1),
      Ill1II1i;
    try {
      Ill1II1i = JSON.parse(IIl1IIll);
    } catch (l1iII1i) {
      $.done({
        "body": body
      });
      return;
    }
    if (!Ill1II1i || !Array.isArray(Ill1II1i.data) || !Ill1II1i.data.some(IIlIIiII => IIlIIiII.rtmp)) {
      $.done({
        "body": body
      });
      return;
    }
    let iII11Il = Ill1II1i.data.filter(lill1Ill => lill1Ill.rtmp && lill1Ill.rtmp.startsWith("http")).map(lIlll1Ii => {
      return {
        "name": lIlll1Ii.name,
        "rtmp": lIlll1Ii.rtmp,
        "image": lIlll1Ii.image
      };
    });
    $.log("所有的播放地址: " + JSON.stringify(iII11Il));
    const lIliIIIl = iII11Il.length;
    $.msg("主播统计", "总共有 " + lIliIIIl + " 个主播可以观看", "请安装SenPlayer播放器");
    const lIIlilI = new Date().getSeconds();
    let i1IIiIII;
    if (lIliIIIl === 0) $.msg("没有可观看的主播", "请稍后再试", "");else lIliIIIl < 10 ? i1IIiIII = iII11Il[Math.min(lIIlilI % lIliIIIl, lIliIIIl - 1)] : i1IIiIII = iII11Il[Math.floor(Math.random() * lIliIIIl)];
    if (i1IIiIII) {
      const Ii1I1il = "SenPlayer://x-callback-url/play?url=" + i1IIiIII.rtmp;
      let i1lII1li = i1IIiIII.image;
      !i1lII1li.endsWith(".jpg") && (i1lII1li = "https://raw.githubusercontent.com/Yu9191/-/main/dingdangmao.jpg");
      $.msg("我是" + i1IIiIII.name, "请安装SenPlayer播放器", "已安装请忽略", {
        "open-url": Ii1I1il,
        "media-url": i1lII1li
      });
    }
    $.done({
      "body": body
    });
  } catch (i1iIiIil) {
    $.logErr(i1iIiIil);
    $.done({
      "body": body
    });
  }
})();
function AES_Decrypt(I11i1I, IlIiil1, lliilIii) {
  var IliIlii = lliilIii.AES.decrypt(I11i1I, IlIiil1, {
    "mode": lliilIii.mode.ECB,
    "padding": lliilIii.pad.Pkcs7
  });
  return IliIlii.toString(lliilIii.enc.Utf8);
}
async function loadUtils() {
  let liliil1 = $.getdata("Utils_Code") || "";
  if (liliil1 && liliil1.length) return console.log("✅ " + $.name + ": 缓存中存在Utils代码, 跳过下载"), eval(liliil1), creatUtils();
  return console.log("🚀 " + $.name + ": 开始下载Utils代码"), new Promise(lill1i1l => {
    $.getScript("https://cdn.jsdelivr.net/gh/xzxxn777/Surge@main/Utils/Utils.js").then(lliiIi => {
      $.setdata(lliiIi, "Utils_Code");
      eval(lliiIi);
      console.log("✅ Utils加载成功, 请继续");
      lill1i1l(creatUtils());
    });
  });
}
function Env(t, s) {
  class e {
    constructor(t) {
      this.env = t;
    }
    send(t, s = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let e = this.get;
      return "POST" === s && (e = this.post), new Promise((s, i) => {
        e.call(this, t, (t, e, r) => {
          t ? i(t) : s(e);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, s) {
      this.name = t;
      this.http = new e(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, s);
      this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $environment && $environment["surge-version"];
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    isShadowrocket() {
      return "undefined" != typeof $rocket;
    }
    isStash() {
      return "undefined" != typeof $environment && $environment["stash-version"];
    }
    toObj(t, s = null) {
      try {
        return JSON.parse(t);
      } catch {
        return s;
      }
    }
    toStr(t, s = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return s;
      }
    }
    getjson(t, s) {
      let e = s;
      const i = this.getdata(t);
      if (i) try {
        e = JSON.parse(this.getdata(t));
      } catch {}
      return e;
    }
    setjson(t, s) {
      try {
        return this.setdata(JSON.stringify(t), s);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(s => {
        this.get({
          url: t
        }, (t, e, i) => s(i));
      });
    }
    runScript(t, s) {
      return new Promise(e => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = s && s.timeout ? s.timeout : r;
        const [o, h] = i.split("@"),
          a = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(a, (t, s, i) => e(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          s = this.path.resolve(process.cwd(), this.dataFile),
          e = this.fs.existsSync(t),
          i = !e && this.fs.existsSync(s);
        if (!e && !i) return {};
        {
          const i = e ? t : s;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          s = this.path.resolve(process.cwd(), this.dataFile),
          e = this.fs.existsSync(t),
          i = !e && this.fs.existsSync(s),
          r = JSON.stringify(this.data);
        e ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(s, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, s, e) {
      const i = s.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) return e;
      return r;
    }
    lodash_set(t, s, e) {
      return Object(t) !== t ? t : (Array.isArray(s) || (s = s.toString().match(/[^.[\]]+/g) || []), s.slice(0, -1).reduce((t, e, i) => Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(s[i + 1]) >> 0 == +s[i + 1] ? [] : {}, t)[s[s.length - 1]] = e, t);
    }
    getdata(t) {
      let s = this.getval(t);
      if (/^@/.test(t)) {
        const [, e, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = e ? this.getval(e) : "";
        if (r) try {
          const t = JSON.parse(r);
          s = t ? this.lodash_get(t, i, "") : s;
        } catch (t) {
          s = "";
        }
      }
      return s;
    }
    setdata(t, s) {
      let e = false;
      if (/^@/.test(s)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(s),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const s = JSON.parse(h);
          this.lodash_set(s, r, t);
          e = this.setval(JSON.stringify(s), i);
        } catch (s) {
          const o = {};
          this.lodash_set(o, r, t);
          e = this.setval(JSON.stringify(o), i);
        }
      } else e = this.setval(t, s);
      return e;
    }
    getval(t) {
      return this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, s) {
      return this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash() ? $persistentStore.write(t, s) : this.isQuanX() ? $prefs.setValueForKey(t, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = t, this.writedata(), !0) : this.data && this.data[s] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, s = () => {}) {
      if (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, e, i) => {
        !t && e && (e.body = i, e.statusCode = e.status ? e.status : e.statusCode, e.status = e.statusCode);
        s(t, e, i);
      });else if (this.isQuanX()) this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: e,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        s(null, {
          status: e,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => s(t && t.error || "UndefinedError"));else if (this.isNode()) {
        let e = require("iconv-lite");
        this.initGotEnv(t);
        this.got(t).on("redirect", (t, s) => {
          try {
            if (t.headers["set-cookie"]) {
              const e = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
              e && this.ckjar.setCookieSync(e, null);
              s.cookieJar = this.ckjar;
            }
          } catch (t) {
            this.logErr(t);
          }
        }).then(t => {
          const {
              statusCode: i,
              statusCode: r,
              headers: o,
              rawBody: h
            } = t,
            a = e.decode(h, this.encoding);
          s(null, {
            status: i,
            statusCode: r,
            headers: o,
            rawBody: h,
            body: a
          }, a);
        }, t => {
          const {
            message: i,
            response: r
          } = t;
          s(i, r, r && e.decode(r.rawBody, this.encoding));
        });
      }
    }
    post(t, s = () => {}) {
      const e = t.method ? t.method.toLocaleLowerCase() : "post";
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient[e](t, (t, e, i) => {
        !t && e && (e.body = i, e.statusCode = e.status ? e.status : e.statusCode, e.status = e.statusCode);
        s(t, e, i);
      });else if (this.isQuanX()) t.method = e, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: e,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        s(null, {
          status: e,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => s(t && t.error || "UndefinedError"));else if (this.isNode()) {
        let i = require("iconv-lite");
        this.initGotEnv(t);
        const {
          url: r,
          ...o
        } = t;
        this.got[e](r, o).then(t => {
          const {
              statusCode: e,
              statusCode: r,
              headers: o,
              rawBody: h
            } = t,
            a = i.decode(h, this.encoding);
          s(null, {
            status: e,
            statusCode: r,
            headers: o,
            rawBody: h,
            body: a
          }, a);
        }, t => {
          const {
            message: e,
            response: r
          } = t;
          s(e, r, r && i.decode(r.rawBody, this.encoding));
        });
      }
    }
    time(t, s = null) {
      const e = s ? new Date(s) : new Date();
      let i = {
        "M+": e.getMonth() + 1,
        "d+": e.getDate(),
        "H+": e.getHours(),
        "m+": e.getMinutes(),
        "s+": e.getSeconds(),
        "q+": Math.floor((e.getMonth() + 3) / 3),
        S: e.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let s in i) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[s] : ("00" + i[s]).substr(("" + i[s]).length)));
      return t;
    }
    queryStr(t) {
      let s = "";
      for (const e in t) {
        let i = t[e];
        null != i && "" !== i && ("object" == typeof i && (i = JSON.stringify(i)), s += `${e}=${i}&`);
      }
      return s = s.substring(0, s.length - 1), s;
    }
    msg(s = t, e = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() || this.isShadowrocket() || this.isStash() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let s = t.openUrl || t.url || t["open-url"],
              e = t.mediaUrl || t["media-url"];
            return {
              openUrl: s,
              mediaUrl: e
            };
          }
          if (this.isQuanX()) {
            let s = t["open-url"] || t.url || t.openUrl,
              e = t["media-url"] || t.mediaUrl,
              i = t["update-pasteboard"] || t.updatePasteboard;
            return {
              "open-url": s,
              "media-url": e,
              "update-pasteboard": i
            };
          }
          if (this.isSurge() || this.isShadowrocket() || this.isStash()) {
            let s = t.url || t.openUrl || t["open-url"];
            return {
              url: s
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash() ? $notification.post(s, e, i, o(r)) : this.isQuanX() && $notify(s, e, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(s);
        e && t.push(e);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, s) {
      const e = !this.isSurge() || this.isShadowrocket() && !this.isQuanX() && !this.isLoon() && !this.isStash();
      e ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t);
    }
    wait(t) {
      return new Promise(s => setTimeout(s, t));
    }
    done(t = {}) {
      const s = new Date().getTime(),
        e = (s - this.startTime) / 1000;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`);
      this.log();
      this.isSurge() || this.isShadowrocket() || this.isQuanX() || this.isLoon() || this.isStash() ? $done(t) : this.isNode() && process.exit(1);
    }
  }(t, s);
}