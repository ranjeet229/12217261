import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const logPath = path.join(__dirname, '..', 'logs.txt');

export const logger = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  const entry = `[${timeStamp}] ${req.method} ${req.url}\n`;

  fs.appendFile(logPath, entry, (err) => {
    if (err) {
      console.error('Error writing log:', err.message);
    }
  });

  next();
};
