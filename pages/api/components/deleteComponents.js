import db from "../../../database/db";

export default async function deleteComp(req, res) {
  const { id } = req.body;
  try {
    await db.query("DELETE FROM components WHERE id=$1", [id]);
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false });
  }
}
