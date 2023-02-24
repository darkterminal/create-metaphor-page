const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

async function actionRun() {
    try {
        const githubToken = core.getInput('github-token', { required: true });
        const context = github.context;

        const octokit = new Octokit({
            auth: githubToken,
            userAgent: 'Punk Creator',
            timeZone: 'Asia/Jakarta'
        })
        
        const owner = context.payload.repository.owner
        const repo = context.payload.repository.name
        const issue_number = context.payload.issue.number

        const issue = await octokit.rest.issues.get({
            owner,
            repo,
            issue_number,
        });

        console.log(`Hello Punk!`);
        core.setOutput("message", issue)
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}
actionRun()