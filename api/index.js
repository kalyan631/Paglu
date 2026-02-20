import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/sms", async (req, res) => {
  const userId = req.query.id;

  if (!userId) {
    return res.json({
      status: false,
      message: "User ID missing"
    });
  }

  try {
    // ORIGINAL API (hidden)
    const url = `https://api.subhxcosmo.in/api?key=NOBITA&type=sms&term=${encodeURIComponent(userId)}`;
    const response = await fetch(url);
    let data = await response.json();

    // 🔁 NAME REPLACEMENT
    let jsonString = JSON.stringify(data);

    // yaha original name ho to wo replace ho jayega
    jsonString = jsonString.replace(/subhxcosmo|subh|owner|admin/gi,
      "@Revenge_mode (Kalyansrinivas)"
    );

    data = JSON.parse(jsonString);

    res.json({
      status: true,
      owner: "@Revenge_mode (Kalyansrinivas)",
      data
    });

  } catch (err) {
    res.json({
      status: false,
      error: "API Failed"
    });
  }
});

export default app;
