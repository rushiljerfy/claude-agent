/*
Purpose: standardize task input so agent always knows what to do regardless of how or where user specified task
*/
import readFile from './readfile.js';

function getTaskFromCLI() {

    const args = process.argv; // check if user gave --task flag
    const taskIndex = args.indexOf("--task");

    if (taskIndex !== -1 && taskIndex + 1 < args.length) {
        return { task: args[taskIndex + 1], source: "cli" }
    }

    return null;
}

async function getTaskFromFile(filePath = "../task.txt") {
    try {
        const rawText = await readFile(filePath, "utf-8");
        const normalized = (rawText ?? "").trim();
        if (normalized) {
            return { task: normalized, source: "file"}
        }
    } catch(err) {
        console.warn(`Could not read from file ${filePath}`);
    }
    return null;
}

/*
Can use below want task input from somewhere else
*/
async function getTaskFromStdin() {
    if (process.stdin.isTTY) {
        return null;
    }
    const pieces = []
    for await (const piece of process.stdin) {
        pieces.push(piece)
    }

    const text = Buffer.concat(pieces).toString("utf-8").trim();
    if (text) {
        return { task: text, source: "stdin"};
    }
    
    return null;

}

async function getTaskInput() {
    try {

        const cliTask = getTaskFromCLI();
        if (cliTask) return cliTask;

        const fileTask = await getTaskFromFile();
        if (fileTask) return fileTask;

        const stdinTask = await getTaskFromStdin();
        if (stdinTask) return stdinTask;
    } catch (err) {
        return { task: null, source: null, error: "No task provided"};
    }
}

export default getTaskInput;