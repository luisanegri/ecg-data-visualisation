import Papa from 'papaparse';
import { useQuery } from '@tanstack/react-query';

import { UseECGDataReturnType } from '../types/ECGDataTypes';
import { ECGDataItem } from '../types/ECGDataTypes';
import { handlePapaParseError } from '../utils/errorHandlers';
import { ParsedDataResult } from '../types/ECGDataTypes';

// const sampleECGDataPath = '/data/small_data.txt'
const ECGDataPath = '/data/14-29-05_data_data.txt'

function parseCSVData(page = 0, limit = 1000): Promise<ParsedDataResult> {
    return new Promise((resolve) => {
        const dataChunks: ECGDataItem[] = [];

        const resolveData = (chunks: ECGDataItem[], page: number, limit: number, hasMore: boolean) => {
            const flattenedData = chunks.flat();
            resolve({ data: flattenedData.slice(page * limit, (page + 1) * limit), hasMore });
        };

        Papa.parse(ECGDataPath, {
            download: true,
            header: true,
            dynamicTyping: true,
            chunk: (results, parser) => {
                console.log('Chunk received:', results.data.length, 'rows');
                dataChunks.push(results.data);

                const totalRows = dataChunks.flat().length;
                console.log('Total data received so far:', totalRows);

                if (totalRows >= (page + 1) * limit) {
                    resolveData(dataChunks, page, limit, true);
                    parser.abort();
                }
            },
            complete: () => {
                console.log('Parsing complete');
                resolveData(dataChunks, page, limit, false);
            },
            error: (error) => {
                handlePapaParseError(error.errors);
            }
        });
    });
}

const useECGData = (page = 0): UseECGDataReturnType => {
    const { data, isLoading, isError, error, isFetching, isPreviousData } = useQuery(['ECGData', page], () => parseCSVData(page), {
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        onSuccess: () => {
            console.log('Data fetched successfully', data)
        },
    });

    return {
        ecgData: data?.data as ECGDataItem[] || null,
        isLoading,
        isError,
        error,
        hasMore: data?.hasMore || false,
        isFetching,
        isPreviousData
    };
};

export default useECGData;
