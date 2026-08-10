/**
 * @name lx-玉宁熙-Pro
 * @description 已将核心 API 接口接入自建 Worker 节点 (https://lx.music.maflya.com)
 * @version 1.2.2
 * @author 玉宁熙 & maflya
 */

const DEV_LOG = false;
const CACHE_TTL = 1000 * 60 * 20;
const YuNingXi = ''; // 若在 Worker 中设置了密钥，请在此填写

// 核心修改：定义并锁定你的自建 API 后端域名
const MY_CUSTOM_API = 'https://lx.music.maflya.com/url';

(function () {
  const globalLx = globalThis['lx'];
  if (!globalLx) {
    throw new Error('请在 LX Music 客户端环境中运行此脚本');
  }

  const { EVENT_NAMES, request, on, send, env } = globalLx;

  // URL 缓存与响应处理
  const URL_CACHE = new Map();

  const log = (...args) => {
    if (DEV_LOG) console.log('[lx-玉宁熙-Pro]', ...args);
  };

  const httpFetch = (url, options = {}) => {
    return new Promise((resolve, reject) => {
      request(url, options, (err, resp, body) => {
        if (err) return reject(err);
        resolve(body);
      });
    });
  };

  const cleanCache = () => {
    const now = Date.now();
    for (const [k, v] of URL_CACHE.entries()) {
      if (now - v.time > CACHE_TTL) URL_CACHE.delete(k);
    }
  };

  // 替换后的核心接口调用逻辑
  const handleGetUrl = async (source, musicInfo, quality) => {
    const songId = musicInfo.songmid || musicInfo.copyrightId || musicInfo.id || musicInfo.hash;
    const cacheKey = `${source}_${songId}_${quality}`;

    cleanCache();
    if (URL_CACHE.has(cacheKey)) {
      const cached = URL_CACHE.get(cacheKey);
      return cached.url;
    }

    // 组装发往你自建 API (https://lx.music.maflya.com/url) 的参数
    const queryParams = new URLSearchParams({
      type: source,
      id: songId,
      quality: quality
    });

    if (YuNingXi) {
      queryParams.append('key', YuNingXi);
      queryParams.append('auth', YuNingXi);
    }

    const targetUrl = `${MY_CUSTOM_API}?${queryParams.toString()}`;
    log('正在向自建 API 发起解析请求:', targetUrl);

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

      if (res && res.code === 0 && res.data) {
        const audioUrl = res.data;
        URL_CACHE.set(cacheKey, { url: audioUrl, time: Date.now() });
        return audioUrl;
      } else {
        throw new Error(res.msg || '自建服务端未返回有效的播放直链');
      }
    } catch (err) {
      log('解析失败:', err.message);
      throw err;
    }
  };

  // 绑定 LX 播放事件监听
  on(EVENT_NAMES.request, ({ source, action, info }) => {
    if (action !== 'musicUrl') {
      return Promise.reject(new Error(`不支持的操作类型: ${action}`));
    }

    const { type: quality, musicInfo } = info;

    return handleGetUrl(source, musicInfo, quality)
      .then((audioUrl) => Promise.resolve(audioUrl))
      .catch((err) => Promise.reject(err));
  });

  // 初始化音源与平台声明（原脚本定义的 5 大音乐平台）
  send(EVENT_NAMES.inited, {
    sources: {
      tx: {
        name: 'QQ音乐',
        type: 'music',
        actions: ['musicUrl'],
        qualitys: ['128k', '320k', 'flac', 'flac24bit']
      },
      wy: {
        name: '网易云音乐',
        type: 'music',
        actions: ['musicUrl'],
        qualitys: ['128k', '320k', 'flac', 'flac24bit']
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
})();
