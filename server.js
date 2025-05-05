const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Altere para o endereço do seu servidor IPTV protegido
const target = "http://51.83.78.186:80";

app.use(
  "/",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    ws: true,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Referer": "https://www.google.com/",
      "Origin": "https://www.google.com/",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Upgrade-Insecure-Requests": "1",
    },
    onProxyReq: (proxyReq, req, res) => {
      // remove headers que denunciam o proxy
      proxyReq.removeHeader("x-forwarded-for");
      proxyReq.removeHeader("x-forwarded-host");
      proxyReq.removeHeader("x-forwarded-proto");
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy iniciado na porta", PORT);
});
