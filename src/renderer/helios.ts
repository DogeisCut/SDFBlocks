import * as Blockly from 'blockly';
import type { Shape } from 'blockly/core/renderers/common/constants';
const svgPaths = Blockly.utils.svgPaths;

class HeliosRenderer extends Blockly.zelos.Renderer {
    constructor() {
        super("helios");
    }

    makeConstants_() {
        return new HeliosConstantProvider();
    }

    makeRenderInfo_(block: Blockly.BlockSvg) {
        return new HeliosRenderInfo(this, block);
    }

    protected makeDrawer_(block: Blockly.BlockSvg, info: Blockly.zelos.RenderInfo) {
        return new HeliosDrawer(block, info);
    }
}

class HeliosRenderInfo extends Blockly.zelos.RenderInfo {
    getInRowSpacing_(prev: any, next: any): number {
        const spacing = super.getInRowSpacing_(prev, next);
        if (this.outputConnection) {
            const outputRightPadding = this.constants_.MEDIUM_LARGE_PADDING + 2;
            if (prev && !next) {
                return Math.max(spacing, outputRightPadding);
            }
            return spacing;
        }

        const edgePadding = this.constants_.LARGE_PADDING + 2;
        if (!prev && next) {
            return Math.max(spacing, edgePadding);
        }
        if (prev && !next) {
            return Math.max(spacing, edgePadding);
        }
        return spacing;
    }

    getSpacerRowHeight_(prev: any, next: any): number {
        const spacing = super.getSpacerRowHeight_(prev, next);
        if (!prev || !next || this.outputConnection) {
            return spacing;
        }

        if (prev.hasStatement && next === this.bottomRow) {
            return Math.max(spacing, this.constants_.MEDIUM_LARGE_PADDING + 1);
        }

        if (prev.hasStatement && next.hasStatement) {
            return Math.max(spacing, this.constants_.LARGE_PADDING + 1);
        }

        if (prev.hasStatement && next.hasDummyInput) {
            return Math.max(spacing, this.constants_.LARGE_PADDING);
        }

        if (prev.hasDummyInput && next.hasStatement) {
            return Math.max(spacing, this.constants_.MEDIUM_LARGE_PADDING + 1);
        }

        return spacing;
    }
}

class HeliosDrawer extends Blockly.zelos.Drawer {
    protected drawRightDynamicConnection_() {
        if (!this.info_.outputConnection) {
            throw Error("Cannot draw the output connection of a block that doesn't have one");
        }
        this.outlinePath_ += svgPaths.lineOnAxis('v', this.info_.outputConnection.height);
    }
}

class HeliosConstantProvider extends Blockly.zelos.ConstantProvider {
    GRID_UNIT = 2;

    SQUARE: Shape | null = null;
    ROUND: Shape | null = null;

    MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH: number;

    constructor() {
        super(2);

        this.SMALL_PADDING = this.GRID_UNIT

        this.MEDIUM_PADDING = 1 * this.GRID_UNIT

        this.MEDIUM_LARGE_PADDING = 2 * this.GRID_UNIT

        this.LARGE_PADDING = 3 * this.GRID_UNIT

        this.CORNER_RADIUS = 3

        this.NOTCH_HEIGHT = 4

        this.NOTCH_WIDTH = 8 * this.GRID_UNIT

        this.NOTCH_OFFSET_LEFT = 3 * this.GRID_UNIT

        this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT

        this.TOP_ROW_MIN_HEIGHT = this.CORNER_RADIUS;

        this.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT = 3;

        this.BOTTOM_ROW_MIN_HEIGHT = this.CORNER_RADIUS;

        this.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = 10;

        this.BETWEEN_STATEMENT_PADDING_Y = 2;

        this.MIN_BLOCK_HEIGHT = 16;

        this.SPACER_DEFAULT_HEIGHT = 5;

        this.EMPTY_BLOCK_SPACER_HEIGHT = 5;

        this.EMPTY_STATEMENT_INPUT_HEIGHT = 13;

        this.STATEMENT_BOTTOM_SPACER = -this.NOTCH_HEIGHT;

        this.STATEMENT_INPUT_PADDING_LEFT = 3 * this.GRID_UNIT;

        this.EMPTY_INLINE_INPUT_PADDING = 8;

        this.EMPTY_INLINE_INPUT_HEIGHT = 12;

        this.DUMMY_INPUT_MIN_HEIGHT = 12;

        this.DUMMY_INPUT_SHADOW_MIN_HEIGHT = 10;

        this.TALL_INPUT_FIELD_OFFSET_Y = 1;

        this.CURSOR_WS_WIDTH = 20 * this.GRID_UNIT;

        this.FIELD_TEXT_FONTSIZE = 9;

        this.FIELD_BORDER_RECT_RADIUS = this.CORNER_RADIUS;

        this.FIELD_BORDER_RECT_X_PADDING = 3;

        this.FIELD_BORDER_RECT_Y_PADDING = 1;

        this.FIELD_BORDER_RECT_HEIGHT = 12;

        this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = 12;

        this.FIELD_DROPDOWN_SVG_ARROW_PADDING = this.FIELD_BORDER_RECT_X_PADDING;

        this.FIELD_COLOUR_DEFAULT_WIDTH = 12;

        this.FIELD_COLOUR_DEFAULT_HEIGHT = 12;

        this.FIELD_CHECKBOX_X_OFFSET = 1;


        this.JAGGED_TEETH_HEIGHT = 0;

        this.JAGGED_TEETH_WIDTH = 0;
        this.START_HAT_HEIGHT = 9;

        this.START_HAT_WIDTH = 70;

        this.SHAPES = {
            HEXAGONAL: 1,
            ROUND: 2,
            SQUARE: 3,
            PUZZLE: 4,
            NOTCH: 5,
        };

        this.FULL_BLOCK_FIELDS = true;

        this.FIELD_TEXT_FONTWEIGHT = 'bold';

        this.FIELD_BORDER_RECT_COLOUR = "#ececf2";

        this.FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW = true;

        this.FIELD_DROPDOWN_COLOURED_DIV = true;

        this.FIELD_DROPDOWN_SVG_ARROW = true;
        this.FIELD_TEXTINPUT_BOX_SHADOW = true;

        this.FIELD_COLOUR_FULL_BLOCK = true;

        this.FIELD_TEXT_FONTFAMILY =
            '"Helvetica Neue", "Segoe UI", Helvetica, sans-serif';

        this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH = 8;
    }

    init() {
        super.init()
        this.SQUARE = this.makeSquare();
        this.ROUND = this.makeRound();
    }

    makeStartHat() {
        const height = this.START_HAT_HEIGHT;
        const width = this.START_HAT_WIDTH;
        const sourceArchWidth = 79.70857;
        const sourceFlatWidth = 33.67084;
        const sourceHeight = 14.57549;
        const archScale = 1.08;
        const archXScale = (width / (sourceArchWidth * archScale + sourceFlatWidth)) * archScale;
        const flatXScale = width / (sourceArchWidth * archScale + sourceFlatWidth);
        const yScale = height / sourceHeight;
        const path =
            svgPaths.curve('c', [
                svgPaths.point(0, -0.63657 * yScale),
                svgPaths.point(8.6391 * archXScale, -14.62972 * yScale),
                svgPaths.point(27.87496 * archXScale, -14.57549 * yScale),
            ]) +
            svgPaths.curve('c', [
                svgPaths.point(17.22452 * archXScale, 0.04855 * yScale),
                svgPaths.point(26.60294 * archXScale, 6.09699 * yScale),
                svgPaths.point(35.98787 * archXScale, 9.7939 * yScale),
            ]) +
            svgPaths.curve('c', [
                svgPaths.point(5.97026 * archXScale, 2.3518 * yScale),
                svgPaths.point(15.84574 * archXScale, 2.28477 * yScale),
                svgPaths.point(15.84574 * archXScale, 2.28477 * yScale),
            ]) +
            svgPaths.lineOnAxis('h', sourceFlatWidth * flatXScale);
        return {
            height,
            width,
            path,
        };
    }

    makeNotch() {
        const width = this.NOTCH_WIDTH;
        const height = this.NOTCH_HEIGHT;

        const innerWidth = width / 3;
        const curveWidth = innerWidth / 3;

        const halfHeight = height / 2;
        const quarterHeight = halfHeight / 2;

        /** i made the main path for the notch connection shape out of two mirrored curves and a single line in between. the positions are defined in relative coordinates and they need the height of the block do be drawn. the 'left' and 'right' versions of the paths are mirrored by applying a direction multiplier to the horizontal coordinates. the 'up' and 'down' versions of the path determine where the curve points are placed and in turn the direction of the curves. yea this is pretty long comment but it is a pretty complex path and i think it deserves an explanation
         * @param dir direction multiplier to apply to horizontal offsets along the
         *     path, either 1 or -1
         * @returns a path fragment describing a notch connection in the specified direction
         */
        function makeMainPath(dir: number): string {
            return (
                svgPaths.curve('c', [
                    svgPaths.point((dir * curveWidth) / 2, 0),
                    svgPaths.point((dir * curveWidth * 3) / 4, quarterHeight / 2),
                    svgPaths.point(dir * curveWidth, quarterHeight),
                ]) +
                svgPaths.line([svgPaths.point(dir * curveWidth, halfHeight)]) +
                svgPaths.curve('c', [
                    svgPaths.point((dir * curveWidth) / 4, quarterHeight / 2),
                    svgPaths.point((dir * curveWidth) / 2, quarterHeight),
                    svgPaths.point(dir * curveWidth, quarterHeight),
                ]) +
                svgPaths.lineOnAxis('h', dir * innerWidth) +
                svgPaths.curve('c', [
                    svgPaths.point((dir * curveWidth) / 2, 0),
                    svgPaths.point((dir * curveWidth * 3) / 4, -(quarterHeight / 2)),
                    svgPaths.point(dir * curveWidth, -quarterHeight),
                ]) +
                svgPaths.line([svgPaths.point(dir * curveWidth, -halfHeight)]) +
                svgPaths.curve('c', [
                    svgPaths.point((dir * curveWidth) / 4, -(quarterHeight / 2)),
                    svgPaths.point((dir * curveWidth) / 2, -quarterHeight),
                    svgPaths.point(dir * curveWidth, -quarterHeight),
                ])
            );
        }

        const pathLeft = makeMainPath(1);
        const pathRight = makeMainPath(-1);

        return {
            type: this.SHAPES.NOTCH,
            width,
            height,
            pathLeft,
            pathRight,
        };
    }

    protected makeRound(): Shape {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
        const maxHeight = maxWidth * 2;

        function makeMainPath(
            blockHeight: number,
            up: boolean,
            right: boolean,
        ): string {
            const remainingHeight =
                blockHeight > maxHeight ? blockHeight - maxHeight : 0;
            const height = blockHeight > maxHeight ? maxHeight : blockHeight;
            const radius = height / 2;
            const sweep = right === up ? '0' : '1';
            return (
                svgPaths.arc(
                    'a',
                    '0 0,' + sweep,
                    radius,
                    svgPaths.point((right ? 1 : -1) * radius, (up ? -1 : 1) * radius),
                ) +
                svgPaths.lineOnAxis('v', (up ? -1 : 1) * remainingHeight) +
                svgPaths.arc(
                    'a',
                    '0 0,' + sweep,
                    radius,
                    svgPaths.point((right ? -1 : 1) * radius, (up ? -1 : 1) * radius),
                )
            );
        }

        return {
            type: this.SHAPES.ROUND,
            isDynamic: true,
            width(height: number): number {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            },
        };
    }

    protected makeSquare(): Shape {
        const radius = this.CORNER_RADIUS;

        /** i made the main path for the squared connection shape out of two rounded corners and a single line in between. the positions are defined in relative coordinates and they need the height of the block to be drawn. the 'left' and 'right' versions of the paths reuse the same logic and just flip the horizontal direction. the 'up' and 'down' versions decide where the corner points land and that ends up controlling which way the shape bends. yea this is also a pretty long comment but this path has a few moving parts and it is easier to read with the extra context
         * @param height the height of the block the connection is on
         * @param up true if the path should be drawn from bottom to top, false
         *     otherwise
         * @param right true if the path is for the right side of the block, false if it is for the left side
         * @returns a path fragment describing a squared connection
         */
        function makeMainPath(height: number, up: boolean, right: boolean): string {
            const innerHeight = height - radius * 2;
            const sweep = right === up ? '0' : '1';
            return (
                svgPaths.arc(
                    'a',
                    '0 0,' + sweep,
                    radius,
                    svgPaths.point((right ? 1 : -1) * radius, (up ? -1 : 1) * radius),
                ) +
                svgPaths.lineOnAxis('v', (up ? -1 : 1) * innerHeight) +
                svgPaths.arc(
                    'a',
                    '0 0,' + sweep,
                    radius,
                    svgPaths.point((right ? -1 : 1) * radius, (up ? -1 : 1) * radius),
                )
            );
        }

        return {
            type: this.SHAPES.SQUARE,
            isDynamic: true,
            width(_height: number): number {
                return radius;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            },
        };
    }

    /** i use this function to decide which connection shape a block should get based on its connection type, explicit output shape, and whatever type checks are attached. it mostly follows Blockly's normal shape selection flow, but it is trimmed down to the square, round, and notch shapes that helios actually uses. yea this one is less geometry-heavy than the others but it still helps to spell out the decision path
     * @param connection the rendered connection we are choosing a shape for
     * @returns the shape definition that should be used for that connection
     */
    shapeFor(connection: Blockly.RenderedConnection) {
        let checks = connection.getCheck();
        if (!checks && connection.targetConnection) {
            checks = connection.targetConnection.getCheck();
        }
        let outputShape;
        switch (connection.type) {
            case Blockly.ConnectionType.INPUT_VALUE:
            case Blockly.ConnectionType.OUTPUT_VALUE:
                outputShape = connection.getSourceBlock().getOutputShape();
                if (outputShape !== null) {
                    switch (outputShape) {
                        case this.SHAPES.ROUND:
                            return this.ROUND!;
                        case this.SHAPES.SQUARE:
                            return this.SQUARE!;
                    }
                }
                if (checks && checks.includes('Number')) {
                    return this.ROUND!;
                }
                if (checks && checks.includes('String')) {
                    return this.SQUARE!;
                }
                return this.ROUND!;
            case Blockly.ConnectionType.PREVIOUS_STATEMENT:
            case Blockly.ConnectionType.NEXT_STATEMENT:
                return this.NOTCH!;
            default:
                throw Error('Unknown type');
        }
    }

    /** i made these inside corner paths so statement inputs can carve into the block body using the same corner radius as the outside shell. each corner is just a small arc, but they have to be returned in all four directional variants so Blockly can draw the slot cleanly on both sides. this one is simpler than the notch and hat paths, but it is still part of the renderer geometry set so i kept the explanation style consistent
     * @returns the inside-corner geometry used around statement input cutouts
     */
    makeInsideCorners() {
        const radius = this.CORNER_RADIUS;

        const innerTopLeftCorner = svgPaths.arc(
            'a',
            '0 0,0',
            radius,
            svgPaths.point(-radius, radius),
        );

        const innerTopRightCorner = svgPaths.arc(
            'a',
            '0 0,1',
            radius,
            svgPaths.point(-radius, radius),
        );

        const innerBottomLeftCorner = svgPaths.arc(
            'a',
            '0 0,0',
            radius,
            svgPaths.point(radius, radius),
        );

        const innerBottomRightCorner = svgPaths.arc(
            'a',
            '0 0,1',
            radius,
            svgPaths.point(radius, radius),
        );

        return {
            width: radius,
            height: radius,
            pathTop: innerTopLeftCorner,
            pathBottom: innerBottomLeftCorner,
            rightWidth: radius,
            rightHeight: radius,
            pathTopRight: innerTopRightCorner,
            pathBottomRight: innerBottomRightCorner,
        };
    }
}

Blockly.blockRendering.register('helios', HeliosRenderer);
