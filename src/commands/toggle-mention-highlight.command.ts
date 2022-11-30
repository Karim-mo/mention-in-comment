import { Decorations } from '@classes/decorations.class';
import { log } from '@utils/logger.util';
import { triggerUpdateDecorations } from '@utils/update-decorations-trigger.util';
import * as vscode from 'vscode';

export const toggleMentionHighlightCommand = vscode.commands.registerCommand(
	'mentionincomment.toggleMentionHighlight',
	() => {
		const settings = vscode.workspace.getConfiguration('mentionInComment');

		const isEnabled = settings.get('isEnabled');

		if (isEnabled) Decorations.removeDecorationType(); // It's about to be disabled, so remove the decoration type.

		settings.update('isEnabled', !isEnabled, true).then(function () {
			triggerUpdateDecorations();
		});
	}
);
