import db from "../../../database/db";

export default async function updateSetup(req, res) {
  const { ssid, password, host, port } = req.body;
  try {
    await db.query(
      "UPDATE setup SET ssid = $1, password = $2, host = $3, port = $4 WHERE userid = 'abcd'",
      [ssid, password, host, port]
    );
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false });
  }
}
