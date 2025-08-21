/*
Purpose: save LLM's respons or modified file

1. Take file path + content
2. Overwrite text (eventually insert)
3. Create file if it DNE
*/

import { promises as fs } from 'fs';

async function writeFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, "utf-8"); // write content to file
        console.log("File written")
    } catch (err) {
        console.error(`Error writing file at ${filePath}:`, err.message);
        return null;
    }
}

export default writeFile;