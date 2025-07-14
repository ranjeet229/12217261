import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFile = path.join(__dirname, '..', 'logs.txt');

export const logger = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync(logFile, log);
  next();
};
