import { ECGDataItem } from '../types/ECGDataTypes';

export const getChartData = (ecgData: ECGDataItem[]) => ({
    labels: ecgData.map((item: ECGDataItem) => item.Time),
    datasets: [{
        label: 'ECG Data',
        data: ecgData?.map((item: ECGDataItem) => item['1']),
        borderColor: 'lightgreen',
        borderWidth: 2,
        pointRadius: 0,
    }]
});

export const chartOptions = {
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
