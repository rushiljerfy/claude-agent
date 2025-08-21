/*

Purpose: read file asynchonously

1. Take filepath as input
2. Read content
3. Return content to caller
4. Handle and log errors (file DNE or file fails to read)
*/

import { promises as fs} from 'fs';

async function readFile(filePath) {
    try {
        const content = await fs.readFile(filePath, "utf-8");
        return content;
    } catch (err) {
        console.error(`Error reading file at ${filePath}:`, err.message);
        return null;
    }
}

export default readFile;