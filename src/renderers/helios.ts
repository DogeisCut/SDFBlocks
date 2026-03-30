// Not basing this off of Zelos because of the empty inputs.
// though https://github.com/RaspberryPiFoundation/blockly/blob/main/packages/blockly/core/renderers/zelos might still be useful

import * as Blockly from 'blockly/core';
import { Shape } from 'blockly/core/renderers/common/constants';
const svgPaths = Blockly.utils.svgPaths;

class HeliosRenderer extends Blockly.blockRendering.Renderer {
    constructor() {
        super("helios");
    }

    makeConstants_() {
        return new HeliosConstantProvider();
    }
}

class HeliosConstantProvider extends Blockly.blockRendering.ConstantProvider {
    GRID_UNIT = 3;

    SQUARE: Shape | null = null;
    ROUND: Shape | null = null;

    MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH: number;

    constructor() {
        super();

        this.SMALL_PADDING = this.GRID_UNIT

        this.MEDIUM_PADDING = 1 * this.GRID_UNIT

        this.MEDIUM_LARGE_PADDING = 2 * this.GRID_UNIT

        this.LARGE_PADDING = 3 * this.GRID_UNIT

        this.CORNER_RADIUS = 2 * this.GRID_UNIT

        this.NOTCH_HEIGHT = 2 * this.GRID_UNIT

        this.NOTCH_WIDTH = 8 * this.GRID_UNIT

        this.NOTCH_OFFSET_LEFT = 4 * this.GRID_UNIT

        this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT

        this.TOP_ROW_MIN_HEIGHT = this.CORNER_RADIUS;

        this.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT = this.LARGE_PADDING;

        this.BOTTOM_ROW_MIN_HEIGHT = this.CORNER_RADIUS;

        this.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = 6 * this.GRID_UNIT;

        this.STATEMENT_BOTTOM_SPACER = -this.NOTCH_HEIGHT;

        this.STATEMENT_INPUT_PADDING_LEFT = 4 * this.GRID_UNIT;

        this.EMPTY_INLINE_INPUT_PADDING = 8 * this.GRID_UNIT;

        this.EMPTY_INLINE_INPUT_HEIGHT = 8 * this.GRID_UNIT;

        this.DUMMY_INPUT_MIN_HEIGHT = 8 * this.GRID_UNIT;

        this.DUMMY_INPUT_SHADOW_MIN_HEIGHT = 6 * this.GRID_UNIT;

        this.CURSOR_WS_WIDTH = 20 * this.GRID_UNIT;

        this.FIELD_TEXT_FONTSIZE = 4 * this.GRID_UNIT;

        this.FIELD_BORDER_RECT_RADIUS = this.CORNER_RADIUS;

        this.FIELD_BORDER_RECT_X_PADDING = 2 * this.GRID_UNIT;

        this.FIELD_BORDER_RECT_Y_PADDING = 1.625 * this.GRID_UNIT;

        this.FIELD_BORDER_RECT_HEIGHT = 8 * this.GRID_UNIT;

        this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = 8 * this.GRID_UNIT;

        this.FIELD_DROPDOWN_SVG_ARROW_PADDING = this.FIELD_BORDER_RECT_X_PADDING;

        this.FIELD_COLOUR_DEFAULT_WIDTH = 6 * this.GRID_UNIT;

        this.FIELD_COLOUR_DEFAULT_HEIGHT = 8 * this.GRID_UNIT;

        this.FIELD_CHECKBOX_X_OFFSET = 1 * this.GRID_UNIT;
        

        this.JAGGED_TEETH_HEIGHT = 0;

        this.JAGGED_TEETH_WIDTH = 0;
        this.START_HAT_HEIGHT = 22;

        this.START_HAT_WIDTH = 96;

        this.SHAPES = { SQUARE: 1, ROUND: 2, NOTCH: 3 };

        this.FULL_BLOCK_FIELDS = false;

        this.FIELD_TEXT_FONTWEIGHT = 'bold';

        this.FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW = true;

        this.FIELD_DROPDOWN_COLOURED_DIV = true;

        this.FIELD_DROPDOWN_SVG_ARROW = true;
        this.FIELD_TEXTINPUT_BOX_SHADOW = true;

        this.FIELD_COLOUR_FULL_BLOCK = true;

        this.FIELD_TEXT_FONTFAMILY =
            '"Helvetica Neue", "Segoe UI", Helvetica, sans-serif';
        
        this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH = 12 * this.GRID_UNIT;
    }

    init() {
        super.init()
        this.SQUARE = this.makeSquare();
        this.ROUND = this.makeRound();
    }

    makeNotch() {
        const width = this.NOTCH_WIDTH;
        const height = this.NOTCH_HEIGHT;

        const innerWidth = width / 3;
        const curveWidth = innerWidth / 3;

        const halfHeight = height / 2;
        const quarterHeight = halfHeight / 2;

        /**
         * Make the main path for the notch.
         *
         * @param dir Direction multiplier to apply to horizontal offsets along the
         *     path. Either 1 or -1.
         * @returns A path fragment describing a notch.
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
        const maxWidth = 6;//this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
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

        /**
         * Make the main path for the squared connection shape out of two corners
         * and a single line in-between (a and v). These are defined in relative
         * positions and require the height of the block.
         * The 'left' and 'right' versions of the paths are the same, but the Y sign
         * flips.  The 'up' and 'down' versions of the path determine where the
         * corner point is placed and in turn the direction of the corners.
         *
         * @param height The height of the block the connection is on.
         * @param up True if the path should be drawn from bottom to top, false
         *     otherwise.
         * @param right True if the path is for the right side of the block.
         * @returns A path fragment describing a squared connection.
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
            // If the block has an output shape set, use that instead.
            if (outputShape !== null) {
                switch (outputShape) {
                    case this.SHAPES.ROUND:
                        return this.ROUND!;
                    case this.SHAPES.SQUARE:
                        return this.SQUARE!;
                }
            }
            // Includes doesn't work in IE.
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
