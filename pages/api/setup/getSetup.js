import db from "../../../database/db";

export default async function getSetup(req, res) {
  try {
    let data = await db.query("SELECT * FROM setup WHERE userid = 'abcd'");
    res.json({ status: true, data: data.rows[0] });
  } catch (error) {
    res.json({ status: false });
  }
}
