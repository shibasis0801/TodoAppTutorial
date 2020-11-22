const scripts = require('package.json').scripts
const spawn = require("child_process").spawn



function startProcesses() {
    return Object.entries(scripts)
        .map(([script, command]) => {
            let child_process;

            if (/build/.test(script) || /start/.test(script)) {
                child_process = spawn(command);
            }
            if (/start/.test(script)) {
                child_process.stdout.pipe(process.stdout);
            }

            return child_process;
        })
        .filter(i => i != null)
}

const processes = startProcesses()

process.on("SIGINT", () => {
    processes.forEach(child_process => child_process.kill("SIGKILL"))
    console.log("Killed all processes");
    process.exit()
})


