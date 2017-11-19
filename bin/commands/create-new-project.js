"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sh = require("shelljs");
const path = require("path");
const fs = require("fs");
const utils = require("../lib/utils");
const data_types_1 = require("../data-types/data-types");
const commit_message = `
This Project was generated using Dev Mentor Tools (${data_types_1.VERSION}).
Initial Commit.
`;
function createNewProject(cmd, options) {
    if (fs.existsSync(options.project)) {
        console.log(`Folder ${options.project} already exists!`);
        return;
    }
    if (cmd.type === undefined || cmd.type === "ts") {
        console.log("DM-Tools is generating a new default TypeScript project...");
        sh.cp("-r", path.resolve(__dirname, "../../.templates/default/"), `${options.project}`);
    }
    else if (cmd.type === "node") {
        console.log("DM-Tools is generating a TypeScript Node.js project...");
        sh.cp("-r", path.resolve(__dirname, "../../.templates/node/"), `${options.project}`);
    }
    else if (cmd.type === "js") {
        console.log("DM-Tools is generating a JavaScript Node.js project...");
        sh.cp("-r", path.resolve(__dirname, "../../.templates/javascript/"), `${options.project}`);
    }
    sh.pushd(`${options.project}`);
    sh.mkdir("docs", "logs");
    sh.exec("git init");
    sh.exec("git add -A");
    sh.exec(`git commit -q -m "${commit_message}"`);
    sh.exec("git checkout -b dev");
    if (data_types_1.YARN) {
        sh.exec("yarn");
    }
    else {
        sh.exec("npm install");
    }
    // Also need to take into consideration different platforms: Win, MacOS, Linux 32/64.
    // Set up end to end testing.
    if (!cmd.e2e) {
        sh.mkdir("bin_tools");
        // Download Chromedriver.
        utils.downloadFileHttps("https://chromedriver.storage.googleapis.com/2.33/chromedriver_mac64.zip", "./bin_tools/chromedriver_mac64.zip", function (err) {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log("Downloaded Chromedriver.");
                sh.pushd(`${options.project}/bin_tools`);
                sh.exec("unzip chromedriver_mac64.zip");
                sh.rm("chromedriver_mac64.zip");
                sh.popd();
            }
        });
        // Download standalone selenium-server.
        utils.downloadFileHttp("http://selenium-release.storage.googleapis.com/3.7/selenium-server-standalone-3.7.1.jar", "./bin_tools/selenium-server-standalone-3.7.1.jar", function (err) {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log("Downloaded Selenium server.");
            }
        });
    }
    sh.popd();
    console.log(`Project ${options.project} created successfully.`);
}
exports.createNewProject = createNewProject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5ldy1wcm9qZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NyZWF0ZS1uZXctcHJvamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHNDQUFzQztBQUV0Qyx5REFBeUQ7QUFFekQsTUFBTSxjQUFjLEdBQVc7cURBQ3VCLG9CQUFROztDQUU3RCxDQUFDO0FBRUYsMEJBQWtDLEdBQVEsRUFBRSxPQUFZO0lBRXRELEVBQUUsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFFLFVBQVcsT0FBTyxDQUFDLE9BQVEsa0JBQWtCLENBQUUsQ0FBQztRQUM3RCxNQUFNLENBQUM7SUFDVCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxJQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUUsNERBQTRELENBQUUsQ0FBQztRQUM1RSxFQUFFLENBQUMsRUFBRSxDQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFFLFNBQVMsRUFBRSwyQkFBMkIsQ0FBRSxFQUFFLEdBQUksT0FBTyxDQUFDLE9BQVEsRUFBRSxDQUFFLENBQUM7SUFDaEcsQ0FBQztJQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsSUFBSSxLQUFLLE1BQU8sQ0FBQyxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBRSx3REFBd0QsQ0FBRSxDQUFDO1FBQ3hFLEVBQUUsQ0FBQyxFQUFFLENBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsU0FBUyxFQUFFLHdCQUF3QixDQUFFLEVBQUUs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