import * as vscode from 'vscode';

//Create output channel
const logger = vscode.window.createOutputChannel('Mention In Comment');
export const log = logger.appendLine;
