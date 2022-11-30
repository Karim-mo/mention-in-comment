import { toggleMentionHighlightCommand } from '@commands/toggle-mention-highlight.command';
import { autoCompleteMentionsInCommentProvider } from '@providers/mentions-auto-completion.provider';

export const subscriptions = [toggleMentionHighlightCommand, autoCompleteMentionsInCommentProvider];
