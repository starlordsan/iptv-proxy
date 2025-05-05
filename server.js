const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// 🚨 Mude o IP e a porta do seu servidor IPTV aqui:
const targetIPTV = "http://51.83.78.186:80"; // Troque esse IP pelo do seu servidor IPTV real

// Definir o proxy
app.use("/", createProxyMiddleware({
  target: targetIPTV,
  changeOrigin: true,
  ws: true
}));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Proxy funcionando em", listener.address().port);
});
