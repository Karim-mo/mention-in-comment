import { Timeout } from '@classes/timeout';
import { triggerUpdateDecorations } from '@utils/update-decorations-trigger.util';
import * as vscode from 'vscode';
import { subscriptions } from './subscriptions';

//Create output channel
let logger = vscode.window.createOutputChannel('Mention In Comment');
let log = logger.appendLine;

export function activate(context: vscode.ExtensionContext) {
	log('Mentions in comment extension activated');

	let activeEditor = vscode.window.activeTextEditor;

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(
		function (editor) {
			activeEditor = editor;
			if (editor) {
				triggerUpdateDecorations();
			}
		},
		null,
		context.subscriptions
	);

	vscode.workspace.onDidChangeTextDocument(
		function (event) {
			if (activeEditor && event.document === activeEditor.document) {
				triggerUpdateDecorations();
			}
		},
		null,
		context.subscriptions
	);
	//

	vscode.workspace.onDidChangeConfiguration(
		function () {
			const settings = vscode.workspace.getConfiguration('mentionInComment');

			if (!settings.get('isEnabled')) return;

			triggerUpdateDecorations();
		},
		null,
		context.subscriptions
	);

	context.subscriptions.push(...subscriptions);
}

export function deactivate() {
	log('Mentions in comment extension deactivated');
	Timeout.clear();
}
