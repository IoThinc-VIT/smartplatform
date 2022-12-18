import db from "../../../database/db";

export default async function getComp(req, res) {
  try {
    let data = await db.query("SELECT *, id AS key FROM components ORDER BY id");
    res.json({ status: true, data: data.rows });
  } catch (error) {
    res.json({ status: false });
  }
}
