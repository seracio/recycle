import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, RecycleContext } from '../recycle';

type Props = {
    data: Array<any>;
    children: any;
    width?: number;
    height?: number;
    margins?: [number, number, number, number];
    x?: Function;
    y?: Function;
    xScale?: Function;
    yScale?: Function;
    xTransform?: Function;
    yTransform?: Function;
    color?: Function;
};

const ChartXY = ({
    data,
    children,
    width = 500,
    height = 350,
    margins = [50, 5, 5, 50],
    x = (d: any) => d.x,
    y = (d: any) => d.y,
    xScale: pxScale = undefined,
    yScale: pyScale = undefined,
    xTransform = x => x,
    yTransform = y => -y,
    color = _.constant('#ccc')
}: Props) => {
    let xScale = pxScale;
    if (!xScale) {
        const xExtent = extent(data, x);
        const xDist = Math.abs(xExtent[1] - xExtent[0]);
        xScale = scaleLinear()
            .domain([xExtent[0] - xDist * 0.05, xExtent[1] + xDist * 0.05])
            .rangeRound([0, width]);
    }

    let yScale = pyScale;
    if (!pyScale) {
        const yExtent = extent(data, y).map((val, i) => {
            if (i === 0) {
                return Math.min(0, val);
            } else {
                return Math.max(0, val);
            }
        });
        const yDist = Math.abs(yExtent[1] - yExtent[0]);
        yScale = scaleLinear()
            .domain([yExtent[0] - yDist * 0.05, yExtent[1] + yDist * 0.05])
            .rangeRound([0, height]);
    }

    return (
        // @ts-ignore
        <RecycleContext.Provider
            value={{
                data,
                x,
                y,
                xScale,
                yScale,
                color,
                xTransform,
                yTransform
            }}
        >
            <div>
                <svg
                    preserveAspectRatio="xMidYMid meet"
                    viewBox={`0 0 ${margins[0] +
                        width +
                        margins[2]} ${margins[1] + height + margins[3]}`}
                >
                    <g
                        transform={`translate(${margins[0]} ${margins[1] +
                            height})`}
                    >
                        {children}
                    </g>
                </svg>
            </div>
        </RecycleContext.Provider>
    );
};

export default recycleConnect()(ChartXY);
