import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, XAxis, YAxis, Circles, Wrapper } from '../src/index';

const days = d3.range(0, 10);
const labels = [
    'toto',
    'tata',
    'tutu',
    'titi',
    'tete',
    'tyty',
    'toutou',
    'kiki',
    'keke',
    'koko'
];

let data = [];
for (const day of days) {
    for (const label of labels) {
        data.push({
            day,
            label,
            value: Math.random() * 20 + 40
        });
    }
}

export default {
    title: 'Scatter plots'
};

export const Basic = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>A simple scatter plot</h3>

            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={data}
                        x={_.get('day')}
                        xRange={[0, w]}
                        y={_.get('value')}
                        yRange={[0, -h]}
                    >
                        <XAxis label="test" />
                        <YAxis label="test" />
                        <Circles r={5} fill="red" stroke="white" />
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};
