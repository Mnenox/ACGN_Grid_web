import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


app.get("/api/search/subject/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const url = `https://api.bgm.tv/search/subject/${encodeURIComponent(keyword)}?type=2&responseGroup=medium`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.use("/pic", express.static("public"));

app.listen(port, () => console.log(`Proxy Server running on port ${port}`));
