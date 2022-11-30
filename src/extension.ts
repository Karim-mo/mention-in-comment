import { Decorations } from '@classes/decorations.class';
import { Timeout } from '@classes/timeout.class';
import { log } from '@utils/logger.util';
import { triggerUpdateDecorations } from '@utils/update-decorations-trigger.util';
import * as vscode from 'vscode';
import { subscriptions } from './subscriptions';

export function activate(context: vscode.ExtensionContext) {
	log('Mentions in comment extension activated');

	initConfigs();

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

			if (!settings.get('isEnabled')) {
				// Decorations.removeDecorationType();
				return;
			}
			initConfigs();

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
	Decorations.removeDecorationType();
}

function initConfigs() {
	const settings = vscode.workspace.getConfiguration('mentionInComment');

	if (settings.get('isEnabled')) Decorations.setDecorationType(settings.get('mentionColor'));
}
