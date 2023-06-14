const vscode = require('vscode');

async function generateFile() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active editor');
    return;
  }

  const document = editor.document;
  const fileName = await vscode.window.showInputBox({ prompt: 'Enter file name' });

  if (!fileName) {
    vscode.window.showErrorMessage('File name is required');
    return;
  }

  const fileContent = await vscode.commands.executeCommand<string>('github.copilot.createFile', {
    fileName,
  });

  if (fileContent) {
    const newFile = await vscode.workspace.openTextDocument({ language: 'plaintext', content: fileContent });
    await vscode.window.showTextDocument(newFile);
  }
}

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.generateFile', generateFile);

  context.subscriptions.push(disposable);
}

exports.activate = activate;
