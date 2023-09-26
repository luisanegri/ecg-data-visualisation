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
import { Button, Container, Grid } from '@mui/material';

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
    const [zoomLevel, setZoomLevel] = useState(50);
    const { ecgData, isLoading, isError, error, hasMore, isFetching, isPreviousData } = useECGData(page);

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.max(prev  10, 10));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => prev + 10);
    };

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

    const styles = {
        container: {
            marginTop: 30,
            marginBottom: 30,
        },
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <>
            <Container maxWidth="xs" style={styles.container}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Button onClick={handleZoomIn} variant="outlined">
                        Zoom In
                    </Button>
                    <Button onClick={handleZoomOut} variant="outlined">
                        Zoom Out
                    </Button>
                </Grid>
            </Container>

            <Line
                data={chartData}
                options={{
                    scales: {
                        x: {
                            ticks: {
                                maxTicksLimit: zoomLevel
                            }
                        }
                    }
                }}
            />

            <Container maxWidth="sm" style={styles.container}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <Button
                            onClick={() => setPage(prev => Math.max(prev  1, 0))}
                            disabled={page === 0}
                            variant="outlined"
                        >
                            Previous
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => {
                                if (!isPreviousData && hasMore) {
                                    setPage(prev => prev + 1);
                                }
                            }}
                            disabled={isPreviousData || !hasMore}
                            variant="contained"
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    {isFetching ? <span>Loading...</span> : null}
                </Grid>
            </Container>
        </>
    );

}

const MemoizedLineChart = React.memo(LineChart);

export default MemoizedLineChart;
