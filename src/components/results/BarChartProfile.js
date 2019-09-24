import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartProfile(props) {
	const { data } = props;
    return (
		<div style={{ width: '100%', height: 300 }}>
			<ResponsiveContainer>
				<BarChart
				data={data}
				margin={{
					top: 5, right: 30, left: 20, bottom: 5,
				}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="title" />
					<YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
					<YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
					<Tooltip />
					<Legend />
					<Bar yAxisId="left" dataKey="value" fill="#8884d8" />
					<Bar yAxisId="right" dataKey="raw" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</div>
    )
}
