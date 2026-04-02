import * as Blockly from 'blockly';
import "./renderers/helios"
import { registerContinuousToolbox } from '@blockly/continuous-toolbox';
import * as Compiler from "./compilier";
import toolbox from './toolbox';
import theme from './theme';
import './index.css';
import * as Serializer from "./serializer"

Object.keys(Blockly.Blocks).forEach(key => delete Blockly.Blocks[key]);

const context = require.context('./blocks', false, /\.ts$/);
context.keys().forEach(context);

const blocklyDiv = document.getElementById('blocklyDiv');

if (!blocklyDiv) {
	throw new Error(`div with id 'blocklyDiv' not found`);
}
const toolboxElement = document.createElement("xml");
toolboxElement.innerHTML = toolbox;
registerContinuousToolbox();
const ws = Blockly.inject(blocklyDiv, {
	toolbox: toolboxElement,
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

const defaultWorkspaceElement = document.createElement("xml")
defaultWorkspaceElement.innerHTML = `<block type="scene" id="scene" deletable="false" editable="false" x="0" y="0">
    <value name="CLEAR_COLOR">
      <shadow type="values_color">
        <field name="COLOR">#bae6f3</field>
      </shadow>
    </value>
    <value name="CAMERA_POSITION">
      <shadow type="values_vector3">
        <field name="X">0</field>
        <field name="Y">1</field>
        <field name="Z">-5</field>
      </shadow>
      <block type="vectors_vector3">
        <value name="X">
          <shadow type="values_float">
            <field name="NUMBER">0</field>
          </shadow>
          <block type="operators_multiply">
            <value name="A">
              <shadow type="values_float">
                <field name="NUMBER">0</field>
              </shadow>
              <block type="operators_trig">
                <field name="OPERATION">sin</field>
                <value name="NUMBER">
                  <shadow type="values_float">
                    <field name="NUMBER">0</field>
                  </shadow>
                  <block type="operators_multiply">
                    <value name="A">
                      <shadow type="values_float">
                        <field name="NUMBER">0</field>
                      </shadow>
                      <block type="sensing_timer"></block>
                    </value>
                    <value name="B">
                      <shadow type="values_float" id="9vJb7^!OtTEGM8lD!l0-">
                        <field name="NUMBER">90</field>
                      </shadow>
                    </value>
                  </block>
                </value>
              </block>
            </value>
            <value name="B">
              <shadow type="values_float">
                <field name="NUMBER">-5</field>
              </shadow>
            </value>
          </block>
        </value>
        <value name="Y">
          <shadow type="values_float">
            <field name="NUMBER">2</field>
          </shadow>
        </value>
        <value name="Z">
          <shadow type="values_float">
            <field name="NUMBER">0</field>
          </shadow>
          <block type="operators_multiply" id="Lj4#-n0~t?w]$,QkVAFV">
            <value name="A">
              <shadow type="values_float">
                <field name="NUMBER">0</field>
              </shadow>
              <block type="operators_trig">
                <field name="OPERATION">cos</field>
                <value name="NUMBER">
                  <shadow type="values_float">
                    <field name="NUMBER">0</field>
                  </shadow>
                  <block type="operators_multiply">
                    <value name="A">
                      <shadow type="values_float">
                        <field name="NUMBER">0</field>
                      </shadow>
                      <block type="sensing_timer"></block>
                    </value>
                    <value name="B">
                      <shadow type="values_float" >
                        <field name="NUMBER">90</field>
                      </shadow>
                    </value>
                  </block>
                </value>
              </block>
            </value>
            <value name="B">
              <shadow type="values_float">
                <field name="NUMBER">-5</field>
              </shadow>
            </value>
          </block>
        </value>
      </block>
    </value>
    <value name="CAMERA_ANGLE">
      <shadow type="values_vector3">
        <field name="X">0</field>
        <field name="Y">0</field>
        <field name="Z">0</field>
      </shadow>
      <block type="vectors_vector3">
        <value name="X">
          <shadow type="values_float">
            <field name="NUMBER">23</field>
          </shadow>
        </value>
        <value name="Y">
          <shadow type="values_float">
            <field name="NUMBER">0</field>
          </shadow>
          <block type="operators_multiply">
            <value name="A">
              <shadow type="values_float">
                <field name="NUMBER">0</field>
              </shadow>
              <block type="sensing_timer"></block>
            </value>
            <value name="B">
              <shadow type="values_float">
                <field name="NUMBER">90</field>
              </shadow>
            </value>
          </block>
        </value>
        <value name="Z">
          <shadow type="values_float">
            <field name="NUMBER">0</field>
          </shadow>
        </value>
      </block>
    </value>
    <value name="FOV">
      <shadow type="values_positive_float">
        <field name="NUMBER">75</field>
      </shadow>
    </value>
    <value name="CONTROLS">
      <shadow type="values_boolean">
        <field name="BOOLEAN">FALSE</field>
      </shadow>
    </value>
    <statement name="SCENE">
      <block type="scene_set_scene">
        <value name="SDF">
          <shadow type="values_sdf"></shadow>
          <block type="primatives_box">
            <value name="SURFACE">
              <shadow type="values_surface"></shadow>
            </value>
            <value name="SIZE">
              <shadow type="values_vector3">
                <field name="X">1</field>
                <field name="Y">1</field>
                <field name="Z">1</field>
              </shadow>
            </value>
            <value name="POSITION">
              <shadow type="values_position"></shadow>
            </value>
          </block>
        </value>
      </block>
    </statement>
  </block>
`

Blockly.Xml.domToWorkspace(defaultWorkspaceElement, ws)

ws.addChangeListener(Blockly.Events.disableOrphans);

// its in a weird spot now because of the floating preview
//ws.centerOnBlock("scene")

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

const canvas = document.querySelector('#raymarcherDiv canvas') as HTMLCanvasElement;

(window as any).Blockly = Blockly;
(window as any).Workspace = ws;
(window as any).Serializer = Serializer;
(window as any).Canvas = canvas;
(window as any).saveAs = function () {
	Serializer.createFile(ws, "Untitled Project", canvas).then(blob => { // temp
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'Untitled Project.mblks';
		a.click();
		URL.revokeObjectURL(a.href);
	});
}

// might replace this with react based UI at some point
// TODO: fix corner resize
// TODO: corner resize icon
// TODO: change the floating thing design a bit, idk if i like how rounded i made it and the padding on the full screen button is weird
// TODO: re-position if the page resizes it off screen
// TODO: fix the startx/starty
// TODO: fix canvas being offset weirdly if the resoltuion is different???
class MarchBlocksUI {
	private widget: HTMLElement;
	private header: HTMLElement;
	private container: HTMLElement;
	private fullscreenBtn: HTMLButtonElement;
	private canvas: HTMLCanvasElement;

	private isDragging = false;
	private isResizing = false;
	private snapMargin = 30;
	private startX = 30;
	private startY = 30;
	private snapThreshold = 25;

	private projectWidth: number = 1920;
	private projectHeight: number = 1280;

	constructor() {
		this.widget = document.getElementById('raymarcherWidget')!;
		this.header = document.getElementById('widgetHeader')!;
		this.container = document.getElementById('pageContainer')!;
		this.fullscreenBtn = document.getElementById('fullscreenBtn') as HTMLButtonElement;
		this.canvas = canvas;

		this.initDraggable();
		this.initFullscreen();
		this.initResizeObserver();
		this.initDropdowns();
		this.applyProjectSettings(this.projectWidth, this.projectHeight);
	}

	// this doesnt work at all :(
	private initDraggable() {
		this.widget.addEventListener('mousedown', (e) => {
			const rect = this.widget.getBoundingClientRect();
			if (e.clientX > rect.right - 30 && e.clientY > rect.bottom - 30) {
				this.isResizing = true;
				return;
			}
		});

		this.header.addEventListener('mousedown', (e) => {
			if (this.isResizing) return;
			this.isDragging = true;
			this.startX = e.clientX - this.widget.offsetLeft;
			this.startY = e.clientY - this.widget.offsetTop;
			this.header.style.cursor = 'grabbing';
			document.getElementById('blocklyDiv')!.style.pointerEvents = 'none';
		});

		window.addEventListener('mousemove', (e) => {
			if (this.isResizing) return;
			if (!this.isDragging) return;

			let newX = e.clientX - this.startX;
			let newY = e.clientY - this.startY;

			const bounds = this.container.getBoundingClientRect();
			const widgetRect = this.widget.getBoundingClientRect();

			if (newX < this.snapThreshold) {
				newX = this.snapMargin;
			} else if (newX + widgetRect.width > bounds.width - this.snapThreshold) {
				newX = bounds.width - widgetRect.width - this.snapMargin;
			}

			if (newY < this.snapThreshold) {
				newY = this.snapMargin;
			} else if (newY + widgetRect.height > bounds.height - this.snapThreshold) {
				newY = bounds.height - widgetRect.height - this.snapMargin;
			}

			this.widget.style.left = `${newX}px`;
			this.widget.style.top = `${newY}px`;
			this.widget.style.right = 'auto';
			this.widget.style.bottom = 'auto';
		});

		window.addEventListener('mouseup', () => {
			this.isDragging = false;
			this.isResizing = false;
			this.header.style.cursor = 'grab';
			document.getElementById('blocklyDiv')!.style.pointerEvents = 'auto';
		});
	}

	private initFullscreen() {
		this.fullscreenBtn.addEventListener('click', () => {
			const canvasArea = document.getElementById('raymarcherDiv')!;
			if (!document.fullscreenElement) {
				canvasArea.requestFullscreen().catch(console.error);
			} else {
				document.exitFullscreen();
			}
		});
	}

	private initResizeObserver() {
		const ro = new ResizeObserver(() => { });
		ro.observe(this.widget);
	}

	private initDropdowns() {
		const dropdowns = document.querySelectorAll('.dropdown');
		dropdowns.forEach(dropdown => {
			const btn = dropdown.querySelector('.dropbtn');
			const content = dropdown.querySelector('.dropdown-content');

			btn?.addEventListener('click', (e) => {
				e.stopPropagation();
				document.querySelectorAll('.dropdown-content').forEach(menu => {
					if (menu !== content) menu.classList.remove('show');
				});
				content?.classList.toggle('show');
			});
		});

		window.addEventListener('click', () => {
			document.querySelectorAll('.dropdown-content').forEach(menu => {
				menu.classList.remove('show');
			});
		});
	}

	public applyProjectSettings(width: number, height: number) {
		this.projectWidth = width;
		this.projectHeight = height;
		if (this.canvas) {
			this.canvas.width = this.projectWidth;
			this.canvas.height = this.projectHeight;
		}
	}
}

window.addEventListener('DOMContentLoaded', () => {
	new MarchBlocksUI();
});