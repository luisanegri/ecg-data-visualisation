/* eslint-disable react-refresh/only-export-components */

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useECGData from '../hooks/useECGData';
import React from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const { ecgData, isLoading, isError, error } = useECGData();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error}</p>;

    const chartData = {
        labels: ecgData?.map(item => item.Time),
        datasets: [
            {
                label: 'ECG Data',
                data: ecgData?.map(item => item['1']),
                borderColor: 'lightgreen',
                borderWidth: 2,
                pointRadius: 0,
            }
        ]
    };

    return (
        <Line data={chartData} />
    )
}


const MemoizedLineChart = React.memo(LineChart);

export default React.memo(MemoizedLineChart);
