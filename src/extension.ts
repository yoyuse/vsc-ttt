// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Ttt } from './ttt';
import { doKkt } from './kkt';

// TCAUX
// let ttt: Ttt;
export let ttt: Ttt;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "vsc-ttt" is now active!');

	ttt = new Ttt();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ttt.doTtt', () => {
		// The code you place here will be executed every time your command is executed
		let editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		ttt.doTtt(editor);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('ttt.doTttViaClipboard', () => { ttt.doTttViaClipboard(); });
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('ttt.doKkt', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		doKkt(editor, ttt);
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
