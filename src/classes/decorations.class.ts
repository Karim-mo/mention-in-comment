import { log } from '@utils/logger.util';
import * as vscode from 'vscode';

export class Decorations {
	public static mentionDecorationType: vscode.TextEditorDecorationType;

	constructor() {}

	public static setDecorationType(mentionColor: string) {
		this.mentionDecorationType = vscode.window.createTextEditorDecorationType({
			color: '#000000',
			backgroundColor: mentionColor,
			isWholeLine: false,
			rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
			overviewRulerLane: vscode.OverviewRulerLane.Right,
			overviewRulerColor: mentionColor,
		});
	}

	public static removeDecorationType() {
		this.mentionDecorationType.dispose();
	}
}
