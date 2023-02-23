const core = require('@actions/core');
const github = require('@actions/github');

try {
    console.log(`Hello Punk!`);
    const message = "Time: " + (new Date()).toTimeString();
    core.setOutput("message", message);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}