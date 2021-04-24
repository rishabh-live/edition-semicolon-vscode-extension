console.log('Congratulations, your extension "edition-semicolon" is now active!');
const { default: fetch } = require('node-fetch');
const vscode = require('vscode');
// const fetch = require('node-fetch');



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// @ts-ignore

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


    console.log('Congratulations, your extension "edition-semicolon" is now active!');


    const disposable = vscode.commands.registerCommand('edition-semicolon.helloWorld', async() => {
        //IPFS Declaration 

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage(`No Content Found.`);
            return;
        }
        const content = editor.document.getText(editor.selection);
        await fetch("https://edition-semicolon.rishabh.live/api/publish", {

            // Adding method type 
            method: "POST",

            // Adding body or contents to send 
            body: JSON.stringify({
                "cnt": content
            })
        })

        // Converting to JSON 
        .then(response => response.json())

        // Displaying results to console 
        .then(json => {

            vscode.window.showInformationMessage(`Content Published.  Your Content ID : ${json.id}`);
            console.log(`Content Published.  Your Content ID : ${json.id}`);
            vscode.env.openExternal(vscode.Uri.parse(`https://edition-semicolon.rishabh.live/r/${json.id}`));
        });

    });

    context.subscriptions.push(disposable);
}
// exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}