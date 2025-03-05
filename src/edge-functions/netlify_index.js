  import { handleGrokRequest } from "../handle_grok.js";

  export default async(req, context) => {
    const url = new URL(req.url);
    console.log('Request URL:', req.url);

    // 处理主页面
    const filePath = url.pathname;
    console.log('filePath:', filePath);
    if (filePath === '/' || filePath === '/index.html') {
        return context.rewrite('/static/index.html');
    }
    if ( filePath === '/how_to_get_cookie.png') {
      return context.rewrite('/static/how_to_get_cookie.png');
    }
    if ( filePath === '/test') {
      try {
        const targetUrl = url.searchParams.get('url');
        const fetchUrl = targetUrl ? `http://smanx.ct.ws/index7.php?url=${encodeURIComponent(targetUrl)}` : 'http://smanx.ct.ws/index7.php';
        const response = await fetch(fetchUrl);
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    //处理grok请求
    return handleGrokRequest(req);
  }

  export const config = {
    path: "/*"
  };
