import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import kjvBooksRoutes from "./routes/kjvBooksRoutes";
import kjvVersesRoutes from "./routes/kjvVersesRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import translationsRoutes from "./routes/translationsRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", kjvBooksRoutes);
app.use("/api/verses", kjvVersesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/translations", translationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
