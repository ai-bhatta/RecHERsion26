const { google } = require("googleapis");

function json(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function clean(value, max = 250) {
  return String(value || "").trim().slice(0, max);
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { error: "Method not allowed." });
    return;
  }

  const requiredEnv = ["GOOGLE_CLIENT_EMAIL", "GOOGLE_PRIVATE_KEY", "GOOGLE_SHEET_ID"];
  const missingEnv = requiredEnv.filter((name) => !process.env[name]);
  if (missingEnv.length) {
    json(res, 500, { error: `Missing server env vars: ${missingEnv.join(", ")}` });
    return;
  }

  const body = req.body || {};
  const record = {
    name: clean(body.name, 120),
    email: clean(body.email, 180),
    institute: clean(body.institute, 220),
    degree: clean(body.degree, 120),
    year: clean(body.year, 8),
    dob: clean(body.dob, 20),
    phone: clean(body.phone, 40),
    imProfile: clean(body.imProfile, 300),
    hackerRank: clean(body.hackerRank, 100)
  };

  const requiredFields = ["name", "email", "institute", "degree", "year", "dob", "phone", "hackerRank"];
  const missing = requiredFields.filter((field) => !record[field]);
  if (missing.length) {
    json(res, 400, { error: `Missing required fields: ${missing.join(", ")}` });
    return;
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: "v4", auth });
    const sheetName = process.env.GOOGLE_SHEET_NAME || "Sheet1";
    const values = [[
      new Date().toISOString(),
      record.name,
      record.email,
      record.institute,
      record.degree,
      record.year,
      record.dob,
      record.phone,
      record.imProfile || "",
      record.hackerRank
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A:J`,
      valueInputOption: "RAW",
      requestBody: { values }
    });

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, {
      error: "Could not save registration right now.",
      detail: error?.message || "Unknown error"
    });
  }
};
