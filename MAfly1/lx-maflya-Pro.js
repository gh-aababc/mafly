/**
 * @name lx-maflya-Pro
 * @description maflya \u81ea\u50f5\u72ec\u7acb\u97f3\u6e90\u62f2\u4ef6 (https://lx.music.maflya.com)
 * @version 1.2.2
 * @author maflya
 */

// =======================\u3010\u5168\u5c40\u914d\u7f6e\u3011=======================
// 自建 Worker API 地址
const API_URL = 'https://lx.music.maflya.com/url';

// 密钥设置（如 Worker 中未设置请保持为空）
const API_KEY = '';

// 控制台调试日志开关
const DEV_LOG = true;

// 本地链接缓存时间（20 分钟）
const CACHE_TTL = 1000 * 60 * 20;
const URL_CACHE = new Map();
// =========================================================

const { EVENT_NAMES, request, on, send, env } = globalThis.lx;

const log = (...args) => {
  if (DEV_LOG) console.log('[maflya-Pro]', ...args);
};

// 封装洛雪 HTTP 请求方法
const httpFetch = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    request(url, options, (err, resp, body) => {
      if (err) return reject(err);
      resolve(body);
    });
  });
};

// 清理过期缓存
const cleanCache = () => {
  const now = Date.now();
  for (const [k, v] of URL_CACHE.entries()) {
    if (now - v.time > CACHE_TTL) URL_CACHE.delete(k);
  }
};

// 获取音频播放直链
const getAudioUrlFromApi = async (source, musicInfo, quality) => {
  const songId = musicInfo.songmid || musicInfo.copyrightId || musicInfo.id || musicInfo.hash;
  const cacheKey = `${source}_${songId}_${quality}`;

  cleanCache();
  if (URL_CACHE.has(cacheKey)) {
    const cached = URL_CACHE.get(cacheKey);
    log(`[\u547d\u4e2d\u8f6f\u7f13\u5存] ${cacheKey} => ${cached.url}`);
    return cached.url;
  }

  const queryParams = new URLSearchParams({
    type: source,
    id: songId,
    quality: quality
  });

  if (API_KEY) queryParams.append('key', API_KEY);

  const targetUrl = `${API_URL}?${queryParams.toString()}`;
  log(`[\u53d1\u8d77 API \u8fde\u63a5] ${targetUrl}`);

  try {
    const rawBody = await httpFetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': `LX-Music-Client/${env}`,
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    const res = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
    log('[\u54cd\u5e94\u6570\u636e]', res);

    if (res && res.code === 0 && res.data) {
      const playUrl = res.data;
      URL_CACHE.set(cacheKey, { url: playUrl, time: Date.now() });
      return playUrl;
    } else {
      throw new Error(res.msg || '\u81ea\u50f5\u670d\u52a1\u5668\u89e3\u6790\u672a\u8f94\u56de\u64ad\u653e\u76f4\u94fe');
    }
  } catch (error) {
    log(`[\u89e3\u6790\u5f02\u5常] ${error.message}`);
    throw error;
  }
};

// 监听洛雪音频请求事件
on(EVENT_NAMES.request, ({ source, action, info }) => {
  if (action !== 'musicUrl') {
    return Promise.reject(new Error(`\u4e0d\u652f\u6301\u7684\u6 manipulation: ${action}`));
  }

  const { type: quality, musicInfo } = info;

  return getAudioUrlFromApi(source, musicInfo, quality)
    .then((audioUrl) => Promise.resolve(audioUrl))
    .catch((err) => Promise.reject(err));
});

// 初始化音源信息（使用 Unicode 安全转义中文字符）
send(EVENT_NAMES.inited, {
  sources: {
    tx: {
      name: '\u515a\u515a\u97f3\u4e50', // QQ音乐
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    },
    wy: {
      name: '\u7f51\u6613\u4e91\u97f3\u4e50', // 网易云音乐
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    },
    kg: {
      name: '\u9177\u72d7\u97f3\u4e50', // 酷狗音乐
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    },
    kw: {
      name: '\u9177\u6211\u97f3\u4e50', // 酷我音乐
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    },
    mg: {
      name: '\u54aa\u5495\u97f3\u4e50', // 咪咕音乐
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    }
  }
});

log('\u81ea\u50f5\u97f3\u6e90\u811a\u672c\u5df2\u6210\u529f\u52a0\u8f7d\uff01\u76ee\u6807\u8282\u70b9\uff1a' + API_URL);
