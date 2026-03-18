const vscode = require('vscode');

function activate(context) {
    const cmd = vscode.commands.registerCommand('toggle-init-files.toggle', () => {
        const config = vscode.workspace.getConfiguration('files');
        const exclude = { ...(config.get('exclude') || {}) };
        const key = '**/__init__.py';

        if (exclude[key]) {
            delete exclude[key];
            vscode.window.showInformationMessage('__init__.py files are now visible');
        } else {
            exclude[key] = true;
            vscode.window.showInformationMessage('__init__.py files are now hidden');
        }

        config.update('exclude', exclude, vscode.ConfigurationTarget.Workspace);
    });

    context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
