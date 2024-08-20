import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
  try {
    const extname = path.extname(file.originalname).toString();
    return parser.format(extname, file.buffer).content;
  } catch (e) {
    console.error(`Error reading file: ${file.originalname}`, e);
    return null; 
  }
};

export default getDataUri;
