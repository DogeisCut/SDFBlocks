import * as Blockly from 'blockly';
import { registerContinuousToolbox } from '@blockly/continuous-toolbox';
import * as Compiler from "./compilier";
import toolbox from './toolbox';
import theme from './theme';
import './index.css';

Object.keys(Blockly.Blocks).forEach(key => delete Blockly.Blocks[key]);

const context = require.context('./blocks', false, /\.ts$/);
context.keys().forEach(context);

const blocklyDiv = document.getElementById('blocklyDiv');

if (!blocklyDiv) {
    throw new Error(`div with id 'blocklyDiv' not found`);
}
const toolboxElement = document.createElement("toolbox");
toolboxElement.innerHTML = toolbox;
registerContinuousToolbox();
const ws = Blockly.inject(blocklyDiv, {
	toolbox: { "kind": "categoryToolbox", "contents": [] },
	collapse: true,
	comments: true,
	css: true,
	disable: true,
	grid: {
		spacing: 20,
		length: 1,
		colour: '#ccc',
		snap: false,
	},
	horizontalLayout: false,
	maxBlocks: Infinity,
	maxTrashcanContents: 0,
	media: 'https://blockly-demo.appspot.com/static/media/',
	modalInputs: true,
	move: {
        scrollbars: {
			horizontal: true,
			vertical: true
        },
        drag: true,
        wheel: true
	},
	oneBasedIndex: false,
	plugins: {
		flyoutsVerticalToolbox: 'ContinuousFlyout',
		metricsManager: 'ContinuousMetrics',
		toolbox: 'ContinuousToolbox',
	},
	readOnly: false,
	renderer: 'zelos',
	rtl: false,
	scrollbars: true,
	sounds: true,
	theme: theme,
	toolboxPosition: 'start',
	trashcan: false,
	zoom: {
		controls: true,
		wheel: true,
		startScale: 0.8,
		maxScale: 3,
		minScale: 0.3,
		scaleSpeed: 1.2,
		pinch: true
	},
});

ws.updateToolbox(toolboxElement);
ws.getToolbox()?.refreshSelection();

const sceneBlock = ws.newBlock('scene');
sceneBlock.initSvg();

ws.addChangeListener(Blockly.Events.disableOrphans);

if (ws) {
    ws.addChangeListener((e: Blockly.Events.Abstract) => {
        if (
            e.isUiEvent ||
            e.type == Blockly.Events.FINISHED_LOADING ||
            ws.isDragging()
        ) {
            return;
        }
        Compiler.compile(ws);
    });
}

(window as any).Blockly = Blockly;
(window as any).Workspace = ws;
