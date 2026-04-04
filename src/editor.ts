import * as Blockly from 'blockly';
import "./renderers/helios"
import { registerContinuousToolbox } from '@blockly/continuous-toolbox';
import * as Compiler from "./compilier";
import toolbox from './toolbox';
import theme from './theme';
import './index.css';
import * as Serializer from "./serializer"

Object.keys(Blockly.Blocks).forEach(key => delete Blockly.Blocks[key]);
const context = (require as any).context('./blocks', false, /\.ts$/);
context.keys().forEach(context);

registerContinuousToolbox();

export { Serializer, Compiler };

// might replace this with react based UI at some point
// TODO: fix corner resize
// TODO: corner resize icon
// TODO: change the floating thing design a bit, idk if i like how rounded i made it and the padding on the full screen button is weird
// TODO: re-position if the page resizes it off screen
// TODO: fix the startx/starty
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
		this.canvas = null as any;

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