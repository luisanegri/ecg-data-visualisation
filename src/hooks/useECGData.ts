import Papa from 'papaparse';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UseECGDataReturnType } from '../types/ECGDataTypes';
import { ECGDataItem } from '../types/ECGDataTypes';

const sampleECGDataPath = '/data/small_data.txt'
// const ECGDataPath = '/data/14-29-05_data_data.txt'

const fetchData = async (page = 0, limit = 50) => {
    try {
        const response = await axios.get(sampleECGDataPath);

        // Parse the CSV data using PapaParse
        const parsedData = Papa.parse(response.data, {
            header: true,
            dynamicTyping: true,
        });

        if (parsedData.errors.length > 0) {
            throw new Error('Error parsing data');
        } else {
            // Slice data for pagination
            const startIdx = page * limit;
            const endIdx = startIdx + limit;
            const pageData = parsedData.data.slice(startIdx, endIdx);

            // Determine if there's more data for the next page
            const hasMore = parsedData.data.length > endIdx;

            return { data: pageData, hasMore: hasMore };
        }
    } catch (error) {
        throw new Error('Error fetching or parsing data');
    }
};

const useECGData = (page = 0): UseECGDataReturnType => {
    const { data, isLoading, isError, error, isFetching, isPreviousData } = useQuery(['ECGData', page], () => fetchData(page), {
        keepPreviousData: true,
        onSuccess: () => {
            console.log('Data fetched successfully')
        },
        onError: (error) => {
            console.log('Error fetching data', error)
        }
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
