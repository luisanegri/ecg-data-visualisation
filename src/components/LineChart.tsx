import React, { useState } from 'react';
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
import { Line } from 'reactchartjs2';

import useECGData from '../hooks/useECGData';
import { ECGDataItem } from '../types/ECGDataTypes';

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
    const [page, setPage] = useState(0);
    const { ecgData, isLoading, isError, error, hasMore, isFetching, isPreviousData } = useECGData(page);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const chartData = {
        labels: (ecgData as ECGDataItem[])?.map(item => item.Time),
        datasets: [
            {
                label: 'ECG Data',
                data: ecgData?.map((item: ECGDataItem) => item['1']),
                borderColor: 'lightgreen',
                borderWidth: 2,
                pointRadius: 0,
            }
        ]
    };

    return (
        <div>
            <Line data={chartData} />
            <div>
                <button
                    onClick={() => setPage(prev => Math.max(prev  1, 0))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <button
                    onClick={() => {
                        if (!isPreviousData && hasMore) {
                            setPage(prev => prev + 1);
                        }
                    }}
                    disabled={isPreviousData || !hasMore}
                >
                    Next
                </button>
                {isFetching ? <span> Loading...</span> : null}{' '}
            </div>
        </div>
    );
}

const MemoizedLineChart = React.memo(LineChart);

export default MemoizedLineChart;
