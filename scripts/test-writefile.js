import writeFile from "../tools/writefile.js";

(async () => {
    await writeFile('../test-writefile.txt', "Testing writefile");
    console.log("Done writing");
})();