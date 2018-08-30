import { curveCardinal } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart2D from './2d/Chart2D';
import Point from './2d/Point';
import Line from './2d/Line';
import Highlight from './operators/Highlight';
import Axis from './2d/Axis';

const data = [
    {
        x: -10,
        y: -30,
        label: 'toto'
    },
    {
        x: 0,
        y: 5,
        label: 'toto'
    },
    {
        x: 10,
        y: 10,
        label: 'toto'
    },
    {
        x: 20,
        y: 20,
        label: 'toto'
    },
    {
        x: -10,
        y: -20,
        label: 'tutu'
    },
    {
        x: 0,
        y: 7,
        label: 'tutu'
    },
    {
        x: 20,
        y: 40,
        label: 'tutu'
    },
    {
        x: 10,
        y: 15,
        label: 'tutu'
    },
    {
        x: -10,
        y: -50,
        label: 'tata'
    },
    {
        x: 0,
        y: 30,
        label: 'tata'
    },
    {
        x: 20,
        y: 10,
        label: 'tata'
    },
    {
        x: 10,
        y: 20,
        label: 'tata'
    }
];

ReactDOM.render(
    <div
        style={{
            width: '100%',
            maxWidth: '600px',
            margin: 'auto',
            fontFamily: 'sans-serif'
        }}
    >
        <h3>scatterplot</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <Point />
        </Chart2D>

        <h3>line chart</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Line by={_.get('label')} size={_.constant(2)} />
        </Chart2D>

        <h3>line chart with points</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Line by={_.get('label')} size={_.constant(2)}>
                <Point size={_.constant(3)} />
            </Line>
        </Chart2D>

        <h3>line chart with highlights</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Highlight by={d => d.label === 'toto'}>
                <Line by={_.get('label')} size={_.constant(2)}>
                    <Point size={_.constant(3)} />
                </Line>
            </Highlight>
        </Chart2D>

        <h3>line chart with a curve</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <Highlight by={d => d.label === 'tata'}>
                <Line
                    by={_.get('label')}
                    size={_.constant(2)}
                    curve={curveCardinal.tension(0.1)}
                >
                    <Point size={_.constant(3)} />
                </Line>
            </Highlight>
        </Chart2D>

        <h3>line chart with no group by</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Line
                size={_.constant(2)}
                curve={curveCardinal.tension(0)}
                order={_.orderBy(() => _.random(0, 2), 'asc')}
            />
        </Chart2D>
    </div>,
    document.querySelector('#root') as HTMLElement
);
