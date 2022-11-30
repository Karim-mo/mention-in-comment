import { Timeout } from '@classes/timeout';
import { updateDecorations } from './update-decorations.util';

export function triggerUpdateDecorations() {
	Timeout.trigger(updateDecorations, 0);
}
