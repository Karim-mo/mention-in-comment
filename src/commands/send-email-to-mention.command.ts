import { ISendToMentionArguments } from '@interfaces/send-to-mention-arguments.interface';
import { log } from '@utils/logger.util';
import * as vscode from 'vscode';

export const sendEmailToMentionCommand = vscode.commands.registerCommand(
	'mentionincomment.sendEmailToMention',
	(args: ISendToMentionArguments) => {
		const settings = vscode.workspace.getConfiguration('mentionInComment');

		log(JSON.stringify(args, null, 2));
	}
);
