import { ISendToMentionArguments } from '@interfaces/send-to-mention-arguments.interface';
import * as vscode from 'vscode';

export const autoCompleteMentionsInCommentProvider = vscode.languages.registerCompletionItemProvider(
	{ scheme: 'file' },
	{
		// eslint-disable-next-line no-unused-vars
		provideCompletionItems(document, position, token, context) {
			const linePrefix = document.lineAt(position).text.substring(0, position.character);
			const doubleSlashIndex = linePrefix.lastIndexOf('//');

			if (
				!linePrefix.endsWith(' @') ||
				doubleSlashIndex === -1 ||
				doubleSlashIndex > linePrefix.lastIndexOf(' @')
			) {
				return undefined;
			}

			const generateCompletionItem = (text: string) => {
				let item = new vscode.CompletionItem(text, vscode.CompletionItemKind.Text);
				item.range = new vscode.Range(position, position);
				item.command = {
					command: 'mentionincomment.sendEmailToMention',
					title: '',
					arguments: [
						{
							mention: text,
							fromCommand: true,
						},
					] as ISendToMentionArguments[],
				};

				return item;
			};

			return [
				generateCompletionItem('mention 1'),
				generateCompletionItem('mention 2'),
				generateCompletionItem('mention 3'),
			];
		},
	},
	'@'
);
