// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
	// register a command that is invoked when the status bar
	// item is selected
	const myCommandId = 'laziness-alarm.startLazy';
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		vscode.window.showInformationMessage(`작업 시작! Keep going!`);
		startLazyTimer();
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(addTime));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(addTime));
}

let n: number;

function reset() {
	myStatusBarItem.hide();
	n = 10;
}

function statusTime() {
	myStatusBarItem.text = `Current LeftTime: ${n}`;
	myStatusBarItem.show();
}

function startLazyTimer() {
	reset();
	reduceTime();
	vscode.window.showInformationMessage(`Lazy Timer를 시작합니다`);
};

function reduceTime() {
	setTimeout(() => {
		n--;
		statusTime();
		if (n === 0) {
			vscode.window.showInformationMessage(`타이머 종료, 좀더 열심히 하세요`);
		} else {
			reduceTime();
		}
	}, 1000);
}

function addTime() {
	if (n > 0) {
		n += 1;
		statusTime();
	}
}


// this method is called when your extension is deactivated
export function deactivate() {}
