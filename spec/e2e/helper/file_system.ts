import * as fs from 'fs';

export function waitForExistFile(filePath: string) {
  return new Promise((resolve, _reject) => {
    const timer = setInterval(() => {
      if (fs.existsSync(filePath)) {
        resolve();
        clearInterval(timer);
      }
    }, 1000);
  });
} 

export function waitForExistFileText(filePath: string, text: string) {
  return new Promise((resolve, _reject) => {
    const timer = setInterval(() => {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent === text) {
          resolve();
          clearInterval(timer);
        }
      }
    }, 1000);
  });
}