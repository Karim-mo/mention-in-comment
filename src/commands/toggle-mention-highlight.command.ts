import { triggerUpdateDecorations } from '@utils/update-decorations-trigger.util';
import * as vscode from 'vscode';

export const toggleMentionHighlightCommand = vscode.commands.registerCommand(
	'mentionincomment.toggleMentionHighlight',
	() => {
		const settings = vscode.workspace.getConfiguration('mentionInComment');

		settings.update('isEnabled', !settings.get('isEnabled'), true).then(function () {
			triggerUpdateDecorations();
		});
	}
);
