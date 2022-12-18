import db from "../../../database/db";

export default async function postComp(req, res) {
  const { name, type, topic, pin } = req.body;
  try {
    await db.query(
      "INSERT INTO components(name,type,topic,pin) VALUES($1,$2,$3,$4)",
      [name, type, topic, pin]
    );
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false });
  }
}
