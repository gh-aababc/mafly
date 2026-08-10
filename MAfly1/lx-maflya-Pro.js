/**
 * @name lx-maflya-Pro
 * @description maflya 自建独立音源插件 (对接 https://lx.music.maflya.com)
 * @version 1.2.2
 * @author maflya
 */

// =======================【全局配置】=======================
// 你的 Cloudflare Worker API 接口地址
const API_URL = 'https://lx.music.maflya.com/url';

// 如果你的 Worker 设置了 API_SECRET_KEY，请在此填写；没设置则保持为空
const API_KEY = '';

// 是否开启控制台调试日志
const DEV_LOG = true;

// 本地播放链接缓存（有效期 20 分钟，减少 Worker 请求次数）
const CACHE_TTL = 1000 * 60 * 20;
const URL_CACHE = new Map();
// =========================================================

const { EVENT_NAMES, request, on, send, env } = globalThis.lx;

const log = (...args) => {
  if (DEV_LOG) console.log('[maflya-Pro]', ...args);
};

// 封装洛雪专用的 HTTP 发包方法
const httpFetch = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    request(url, options, (err, resp, body) => {
      if (err) return reject(err);
      resolve(body);
    });
  });
};

// 过期缓存清理
const cleanCache = () => {
  const now = Date.now();
  for (const [k, v] of URL_CACHE.entries()) {
    if (now - v.time > CACHE_TTL) URL_CACHE.delete(k);
  }
};

// 向 Cloudflare Worker 请求音频直链
const getAudioUrlFromApi = async (source, musicInfo, quality) => {
  const songId = musicInfo.songmid || musicInfo.copyrightId || musicInfo.id || musicInfo.hash;
  const cacheKey = `${source}_${songId}_${quality}`;

  cleanCache();
  if (URL_CACHE.has(cacheKey)) {
    const cached = URL_CACHE.get(cacheKey);
    log(`[命中本地缓存] ${cacheKey} => ${cached.url}`);
    return cached.url;
  }

  const queryParams = new URLSearchParams({
    type: source,
    id: songId,
    quality: quality
  });

  if (API_KEY) queryParams.append('key', API_KEY);

  const targetUrl = `${API_URL}?${queryParams.toString()}`;
  log(`[发起 API 请求] ${targetUrl}`);

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
    log('[API 响应数据]', res);

    if (res && res.code === 0 && res.data) {
      const playUrl = res.data;
      URL_CACHE.set(cacheKey, { url: playUrl, time: Date.now() });
      return playUrl;
    } else {
      throw new Error(res.msg || '自建服务器解析未返回播放直链');
    }
  } catch (error) {
    log(`[解析异常] ${error.message}`);
    throw error;
  }
};

// 绑定洛雪播放请求事件
on(EVENT_NAMES.request, ({ source, action, info }) => {
  if (action !== 'musicUrl') {
    return Promise.reject(new Error(`不支持的操作类型: ${action}`));
  }

  const { type: quality, musicInfo } = info;

  return getAudioUrlFromApi(source, musicInfo, quality)
    .then((audioUrl) => Promise.resolve(audioUrl))
    .catch((err) => Promise.reject(err));
});

// 初始化音源声明（广播支持的平台与音质列表）
send(EVENT_NAMES.inited, {
  sources: {
    tx: {
      name: 'QQ音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    },
    wy: {
      name: '网易云音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    },
    kg: {
      name: '酷狗音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    },
    kw: {
      name: '酷我音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    },
    mg: {
      name: '咪咕音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac']
    }
  }
});

log('自建 Pro 音源脚本已成功加载！目标节点：' + API_URL);
