import { sendEmailToMentionCommand } from '@commands/send-email-to-mention.command';
import { toggleMentionHighlightCommand } from '@commands/toggle-mention-highlight.command';
import { autoCompleteMentionsInCommentProvider } from '@providers/mentions-auto-completion.provider';

export const subscriptions = [
	toggleMentionHighlightCommand,
	autoCompleteMentionsInCommentProvider,
	sendEmailToMentionCommand,
];
