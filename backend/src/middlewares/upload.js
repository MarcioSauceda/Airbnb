import multer from "multer";
import fs from "fs";
import path from "path";

const UPLOAD_ROOT = process.env.UPLOAD_DIR || path.resolve("uploads");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const { id } = req.params;
    const dir = path.join(UPLOAD_ROOT, "listings", String(id));
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const ext = path.extname(file.originalname || "").toLowerCase();
    cb(null, `${ts}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)/.test(file.mimetype);
    cb(ok ? null : new Error("Formato no permitido"), ok);
  },
});
