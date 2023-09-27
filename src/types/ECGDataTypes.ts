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
    error: ParseError;
    hasMore: boolean;
    isFetching: boolean;
    isPreviousData: boolean;
};

export type ParsedDataResult = {
    data: ECGDataItem[]; hasMore: boolean
};
