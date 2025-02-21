import db from "../config/db";

export interface Translation {
  translation: string;
  title: string;
  license: string;
}

export const getAllTranslations = async () => {
  const [rows] = await db.query("SELECT * FROM translations");
  return rows;
};
