import readFile from "../tools/readfile.js";


(async () => {
    const result = await readFile('../test.txt');
    console.log(result);
})();