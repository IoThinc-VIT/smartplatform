// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../database/db";

export default async function handler(req, res) {
  let data = "";
  try {
    data = await db.query("select * from components");
    console.log("Sa");
    res.status(200).json({ name: data.rows });
  } catch (error) {
    res.status(200).json({ name: "data.rows" });
    
  }
}
