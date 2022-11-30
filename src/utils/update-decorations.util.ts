import { Decorations } from '@classes/decorations.class';
import * as vscode from 'vscode';

export function updateDecorations() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		// vscode.window.showErrorMessage('No active editor');
		return;
	}

	const document = editor.document;

	// Get all single line comments in current file
	const singleLineComments = document.getText().match(/\/\/.*$/gm);
	if (!singleLineComments) {
		// vscode.window.showErrorMessage('No single line comments found');
		return;
	}

	// Get all mentions in single line comments
	const mentions = singleLineComments
		.map((comment) => {
			const mention = comment.match(/@([a-zA-Z0-9-_]+)/);
			return mention ? mention[1] : null;
		})
		.filter((mention) => mention);

	if (!mentions.length) {
		// vscode.window.showErrorMessage('No mentions found');
		return;
	}

	// Highlight the mentions in the single line comments
	const decorations: vscode.DecorationOptions[] = [];
	mentions.forEach((mention) => {
		const regex = new RegExp(`@${mention}`, 'g');
		let match;
		while ((match = regex.exec(document.getText()))) {
			const startPos = document.positionAt(match.index);
			const endPos = document.positionAt(match.index + match[0].length);

			const decoration: vscode.DecorationOptions = {
				range: new vscode.Range(startPos, endPos),
			};

			decorations.push(decoration);
		}
	});

	editor.setDecorations(Decorations.mentionDecorationType, decorations);
}
