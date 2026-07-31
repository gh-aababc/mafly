var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.config.js
var index_config_exports = {};
__export(index_config_exports, {
  default: () => index_config_default
});
module.exports = __toCommonJS(index_config_exports);

var index_config_default = {
  ali: {
    token: "",
    token280: "token280"
  },
  quark: {
    cookie: ""
  },
  uc: {
    cookie: "cookie",
    token: "token",
    ut: "ut"
  },
  y115: {
    cookie: ""
  },
  muou: {
    url: ""
  },
  wogg: {
    url: ""
  },
  leijing: {
    url: ""
  },
  tgsou: {
    tgPic: false,
    count: 0,
    url: "",
    channelUsername: ""
  },
  tgchannel: {},
  sites: {
    list: []
  },
  pans: {
    list: []
  },
  danmu: {
    urls: [
      { address: "https://logo.saodu.work:8888/87654321", name: "默认1" },
      { address: "https://fjj0417.dpdns.org/87654321", name: "默认2" }, 
      { address: "http://127.0.0.1:9321/87654321", name: "默认3" }, 
      { address: "http://47.107.188.112:6008/87654321", name: "默认4" }, 
      { address: "http://ecs.dysobo.cn:9321/87654321", name: "默认5" },
      { address: "https://dm.626258.xyz/87654321", name: "默认6" }
    ],
    autoPush: true
  },
  t4: {
    list: [
      { name: "👖毒舌影视", address: "https://banyeomni.780420.xyz:17777/api/tvbox/source/2070335664116731904?token=banye666" },
      { name: "👖金牌影视", address: "https://banyeomni.780420.xyz:17777/api/tvbox/source/2070335666620731392?token=banye666" },
      { name: "👖瓜子影视", address: "https://banyeomni.780420.xyz:17777/api/tvbox/source/2070335665161113600?token=banye666" },
      { name: "👖热播影视", address: "https://banyeomni.780420.xyz:17777/api/tvbox/source/2070335664787820544?token=banye666" },
      { name: "👖歪比影视", address: "https://banyeomni.780420.xyz:17777/api/tvbox/source/2070335664104148992?token=banye666" },
      { name: "👖星辰影视", address: "https://banyeomni.780420.xyz:17777/api/tvbox/source/2070335663328202752?token=banye666" },
      { name: "✈️TG频道@flymaf", address: "http://bob2.hkt.net.cn/miraplay/dbo.php" },
      { name: "📡Maflya直播", address: "https://t4.maflya.com" },
      { name: "📡裤佬IPTV直播", address: "https://kl.maflya.com" }
    ]
  },
  cms: {
    list: [
      { name: "🎬韩剧短剧", address: "https://www.hanjuzy.com/api.php/provide/vod" },
      { name: "🎬华为短剧源", address: "https://hw8.live/api.php/provide/vod" },
      { name: "👖如意采集", address: "https://cj.rycjapi.com/api.php/provide/vod" },
      { name: "👖爱奇艺采集", address: "https://iqiyizyapi.com/api.php/provide/vod" }
    ]
  },
  alist: [
    {
      name: "LM379 资源库",
      server: "https://pan.lm379.cn/dav/Video",
      username: "public_dav",
      password: "cGFXCWMEbQ2t2BPi7zwWPqeAldc0iA"
    },
    {
      name: "追番网 WebDAV",
      server: "https://zhuifan.link/dav",
      username: "zhuifan",
      password: "zhuifan"
    },
    {
      name: "QSesvick 资源库",
      server: "https://alist.qsesvick.top/dav",
      username: "davguest",
      password: "davguest"
    },
    {
      name: "CLUN 云盘",
      server: "https://pan.clun.top/dav",
      username: "guest",
      password: "guest"
    }
  ],
  color: [
    {
      light: {
        bg: "https://i2.100024.xyz/2024/01/13/pptcej.webp",
        bgMask: "0x50ffffff",
        primary: "0xff446732",
        onPrimary: "0xffffffff",
        primaryContainer: "0xffc5efab",
        onPrimaryContainer: "0xff072100",
        secondary: "0xff55624c",
        onSecondary: "0xffffffff",
        secondaryContainer: "0xffd9e7cb",
        onSecondaryContainer: "0xff131f0d",
        tertiary: "0xff386666",
        onTertiary: "0xffffffff",
        tertiaryContainer: "0xffbbebec",
        onTertiaryContainer: "0xff002020",
        error: "0xffba1a1a",
        onError: "0xffffffff",
        errorContainer: "0xffffdad6",
        onErrorContainer: "0xff410002",
        background: "0xfff8faf0",
        onBackground: "0xff191d16",
        surface: "0xfff8faf0",
        onSurface: "0xff191d16",
        surfaceVariant: "0xffe0e4d6",
        onSurfaceVariant: "0xff191d16",
        inverseSurface: "0xff2e312b",
        inverseOnSurface: "0xfff0f2e7",
        outline: "0xff74796d",
        outlineVariant: "0xffc3c8bb",
        shadow: "0xff000000",
        scrim: "0xff000000",
        inversePrimary: "0xffaad291",
        surfaceTint: "0xff446732"
      },
      dark: {
        bg: "https://i2.100024.xyz/2024/01/13/pptg3z.webp",
        bgMask: "0x50000000",
        primary: "0xffaad291",
        onPrimary: "0xff173807",
        primaryContainer: "0xff2d4f1c",
        onPrimaryContainer: "0xffc5efab",
        secondary: "0xffbdcbb0",
        onSecondary: "0xff283420",
        secondaryContainer: "0xff3e4a35",
        onSecondaryContainer: "0xffd9e7cb",
        tertiary: "0xffa0cfcf",
        onTertiary: "0xff003738",
        tertiaryContainer: "0xff1e4e4e",
        onTertiaryContainer: "0xffbbebec",
        error: "0xffffb4ab",
        onError: "0xff690005",
        errorContainer: "0xff93000a",
        onErrorContainer: "0xffffdad6",
        background: "0xff11140e",
        onBackground: "0xffe1e4d9",
        surface: "0xff11140e",
        onSurface: "0xffe1e4d9",
        surfaceVariant: "0xff43483e",
        onSurfaceVariant: "0xffe1e4d9",
        inverseSurface: "0xffe1e4d9",
        inverseOnSurface: "0xff2e312b",
        outline: "0xff8d9286",
        outlineVariant: "0xff43483e",
        shadow: "0xff000000",
        scrim: "0xff000000",
        inversePrimary: "0xff446732",
        surfaceTint: "0xffaad291"
      }
    }
  ]
};
