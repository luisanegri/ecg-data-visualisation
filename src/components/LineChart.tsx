import React, { useState, useRef } from 'react';
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
import zoomPlugin from 'chartjspluginzoom';
import { Button, Container, Grid } from '@mui/material';

import useECGData from '../hooks/useECGData';
import { ECGDataItem } from '../types/ECGDataTypes';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

const LineChart = () => {
    const [page, setPage] = useState(0);
    const chartRef = useRef(null);
    const { ecgData, isLoading, isError, error, hasMore, isFetching, isPreviousData } = useECGData(page);

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

    const chartOptions = {
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                } as const,
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy'
                } as const
            }
        }
    };

    const styles = {
        container: {
            marginTop: 30,
            marginBottom: 30,
        },
    };

    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <>
            <Container maxWidth='lg'>
                <Line
                    data={chartData}
                    options={chartOptions}
                    ref={chartRef}
                />

                <Button onClick={handleResetZoom} variant="outlined">
                    Reset Zoom
                </Button>
            </Container>



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

