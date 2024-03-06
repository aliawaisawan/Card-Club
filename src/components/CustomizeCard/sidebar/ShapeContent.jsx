import React from 'react';
import XIcon from '@duyank/icons/regular/X';
import { isMobile } from 'react-device-detect';
import RectangleIcon from '@duyank/icons/shape/Rectangle';
import CircleIcon from '@duyank/icons/shape/Circle';
import TriangleIcon from '@duyank/icons/shape/Triangle';
import RhombusIcon from '@duyank/icons/shape/Rhombus';
import ArrowRightIcon from '@duyank/icons/shape/ArrowRight';
import ArrowLeftIcon from '@duyank/icons/shape/ArrowLeft';
import ArrowTopIcon from '@duyank/icons/shape/ArrowTop';
import ArrowBottomIcon from '@duyank/icons/shape/ArrowBottom';
import ArrowPentagonIcon from '@duyank/icons/shape/ArrowPentagon';
import ChevronIcon from '@duyank/icons/shape/Chevron';
import CrossIcon from '@duyank/icons/shape/Cross';
import ParallelogramIcon from '@duyank/icons/shape/Parallelogram';
import TrapezoidIcon from '@duyank/icons/shape/Trapezoid';
import OctagonIcon from '@duyank/icons/shape/Octagon';
import HexagonIcon from '@duyank/icons/shape/Hexagon';
import PentagonIcon from '@duyank/icons/shape/Pentagon';
import { useEditor } from '@lidojs/editor';

const ShapeContent = ({ onClose }) => {
    const { actions } = useEditor();

    const addShape = (shape) => {
        actions.addShapeLayer({
            type: {
                resolvedName: 'ShapeLayer',
            },
            props: {
                shape: shape.type,
                position: {
                    x: 0,
                    y: 400,
                },
                boxSize: {
                    width: shape.width,
                    height: shape.height,
                },
                rotate: 0,
                color: '#5E6278',
            },
        });

        if (isMobile) {
            onClose();
        }
    };

    const shapes = [
        {
            type: 'rectangle',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <RectangleIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'circle',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <CircleIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'triangle',
            width: 64,
            height: 56,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <TriangleIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'triangleUpsideDown',
            width: 64,
            height: 56,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(180deg)' }}>
                    <TriangleIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'rhombus',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <RhombusIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'arrowRight',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ArrowRightIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'arrowLeft',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ArrowLeftIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'arrowTop',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ArrowTopIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'arrowBottom',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ArrowBottomIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'arrowPentagon',
            width: 64,
            height: 32,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ArrowPentagonIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'chevron',
            width: 64,
            height: 32,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ChevronIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'cross',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <CrossIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'parallelogram',
            width: 64,
            height: 48,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ParallelogramIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'parallelogramUpsideDown',
            width: 64,
            height: 48,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'scaleY(-1)' }}>
                    <ParallelogramIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'trapezoid',
            width: 64,
            height: 48,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <TrapezoidIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'trapezoidUpsideDown',
            width: 64,
            height: 48,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(180deg)' }}>
                    <TrapezoidIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'pentagon',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <PentagonIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'hexagonVertical',
            width: 55,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(90deg)' }}>
                    <HexagonIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'hexagonHorizontal',
            width: 64,
            height: 55,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <HexagonIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
        {
            type: 'octagon',
            width: 64,
            height: 64,
            icon: (
                <div css={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <OctagonIcon width={'100%'} height={'100%'} />
                </div>
            ),
        },
    ];

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                overflowY: 'auto',
                display: 'flex',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    height: 48,
                    borderBottom: '1px solid rgba(57,76,96,.15)',
                    padding: '0 20px',
                }}
            >
                <p
                    style={{
                        lineHeight: '48px',
                        fontWeight: 600,
                        color: '#181C32',
                        flexGrow: 1,
                    }}
                >
                    Shapes
                </p>
                <div
                    style={{
                        fontSize: 20,
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={onClose}
                >
                    <XIcon />
                </div>
            </div>
            <div style={{ padding: '16px' }}>
                <div
                    style={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
                        gridGap: 8,
                    }}
                >
                    {shapes.map((shape) => (
                        <div
                            key={shape.type}
                            style={{ width: '100%', paddingBottom: '100%', position: 'relative', cursor: 'pointer' }}
                            onClick={() => addShape(shape)}
                        >
                            {shape.icon}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShapeContent;
