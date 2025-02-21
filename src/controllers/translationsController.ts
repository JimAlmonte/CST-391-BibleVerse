import { Request, Response } from "express";
import * as TranslationsModel from "../models/TranslationsModel";

export const getAllTranslations = async (_req: Request, res: Response) => {
  try {
    const translations = await TranslationsModel.getAllTranslations();
    res.status(200).json(translations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching translations" });
  }
};
