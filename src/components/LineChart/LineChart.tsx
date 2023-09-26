import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Container, Grid } from '@mui/material';

import useECGData from '../../hooks/useECGData';
import { getChartData, chartOptions } from '../../utils/chart';
import Loading from '../Loading';
import Error from '../Error';
import PaginationControls from '../PaginationControls';
import styles from './index.module.css'
import { ZoomableChartComponent } from '../../types/chartTypes';

const LineChart = () => {
    const [page, setPage] = useState(0);
    const chartRef = useRef<ZoomableChartComponent>(null);
    const { ecgData, isLoading, isError, error, hasMore, isFetching, isPreviousData } = useECGData(page);

    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    if (isLoading) return <Loading />
    if (isError) return <Error message={error.message} />

    return (
        <>
            <Container maxWidth='lg'>
                <Line
                    data={getChartData(ecgData || [])}
                    options={chartOptions}
                    // TODO: fix issue with typescript notrecognising the resetZoom method.
                    ref={chartRef as any}
                />

                <Button onClick={handleResetZoom} variant="outlined">
                    Reset Zoom
                </Button>
            </Container>

            <Container maxWidth="sm" className={styles.container}>
                <PaginationControls isPreviousData={isPreviousData} page={page} hasMore={hasMore} setPage={setPage} />
                <Grid container justifyContent="center">
                    {isFetching && <span>Loading...</span>}
                </Grid>
            </Container>
        </>
    );

}

const MemoizedLineChart = React.memo(LineChart);

export default MemoizedLineChart;

