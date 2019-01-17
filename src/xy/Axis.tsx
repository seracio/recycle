import { axisBottom, axisLeft } from 'd3-axis';
import * as d3 from 'd3-selection';
import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect } from '../recycle';

type Props = {
    xScale: any;
    yScale: any;
    xTransform: Function;
    yTransform: Function;
    xLabel: Function;
    yLabel: Function;
    xFormat: Function;
    yFormat: Function;
    xTicks: Function;
    yTicks: Function;
};

const Axis = ({
    xScale,
    yScale,
    xTransform,
    yTransform,
    xLabel = _.constant('x axis'),
    yLabel = _.constant('y axis'),
    xFormat = _.identity,
    yFormat = _.identity,
    xTicks = _.constant(10),
    yTicks = _.constant(10)
}: Props) => {
    const [x0, x1] = xScale.range().map(xTransform);
    const [y0, y1] = yScale.range().map(yTransform);

    const refXAxis = g =>
        !!g &&
        d3.select(g).call(
            axisBottom(xScale.range(xScale.range().map(xTransform)))
                .tickFormat(xFormat)
                .ticks(xTicks())
        );
    const refYAxis = g =>
        !!g &&
        d3.select(g).call(
            axisLeft(yScale.range(yScale.range().map(yTransform)))
                .tickFormat(yFormat)
                .ticks(yTicks())
        );

    return (
        <>
            <g className="x-axis" ref={refXAxis} />
            <g className="y-axis" ref={refYAxis} />
            <text
                x={_.mean([x0, x1])}
                y={40}
                style={{
                    textAnchor: 'middle'
                }}
            >
                {xLabel()}
            </text>
            <text
                x={-40}
                y={_.mean([y0, y1])}
                transform={`rotate(-90 ${-40} ${_.mean([y0, y1])})`}
                style={{
                    textAnchor: 'middle'
                }}
            >
                {yLabel()}
            </text>
        </>
    );
};

export default recycleConnect(
    _.pick(['xScale', 'yScale', 'xTransform', 'yTransform'])
)(Axis);