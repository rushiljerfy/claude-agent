import getTaskInput from "../tools/gettask.js";

(async () => {
    const taskInput = await getTaskInput();
    console.log("Task received:", taskInput)
})();