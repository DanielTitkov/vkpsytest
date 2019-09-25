import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

export default function RadarChartProfile(props) {
    const { data } = props;
    return (
		<div style={{ width: '100%', height: 300 }}>
			<ResponsiveContainer>
                <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="title" />
                    <PolarRadiusAxis />
                    <Tooltip />
                    <Radar name="Value" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
			</ResponsiveContainer>
		</div>
    )
}


