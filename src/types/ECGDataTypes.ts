import { AxiosError } from 'axios';
import { ParseError } from 'papaparse';

export type ECGDataItem = {
    Time: string | number;
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
};

export type UseECGDataReturnType = {
    ecgData: ECGDataItem[] | null;
    isLoading: boolean;
    isError: boolean;
    error: AxiosError | ParseError;
    hasMore: boolean;
    isFetching: boolean;
    isPreviousData: boolean;
};
