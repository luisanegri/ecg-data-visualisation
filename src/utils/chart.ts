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
    scales: {
        x: {
            title: {
                display: true,
                text: 'Time (s)',
                color: '#333',
                font: {
                    size: 14,
                }
            },
        },
        y: {
            title: {
                display: true,
                text: 'Voltage (mV)',
                color: '#333',
                font: {
                    size: 14,
                }
            },
        }
    },
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
