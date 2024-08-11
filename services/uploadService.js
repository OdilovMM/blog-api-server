const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class UploadService {
  upload(file) {
    try {
      const filename = uuidv4() + ".jpg";
      const currentPath = __dirname;
      const staticFolder = path.join(currentPath, "..", "public");
      const filePath = path.join(staticFolder, filename);

      if (!fs.existsSync(staticFolder)) {
        fs.mkdirSync(staticFolder, { recursive: true });
      }
      file.mv(filePath);
      return filename;
    } catch (error) {
      throw new Error("Error uploading with file", error);
    }
  }
}

module.exports = new UploadService();
