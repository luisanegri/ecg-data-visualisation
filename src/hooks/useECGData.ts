import Papa from 'papaparse';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const sampleECGDataPath = '/data/small_data.txt'
// const ECGDataPath = '/data/14-29-05_data_data.txt'

const fetchData = async () => {
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
            return parsedData.data;
        }
    } catch (error) {
        throw new Error('Error fetching or parsing data');
    }
};

const useECGData = () => {
    const { data: ecgData, isLoading, isError, error } = useQuery(['ECGData'], fetchData, {
        onSuccess: () => {
            console.log('Data fetched successfully')
        },
        onError: (error) => {
            console.log('Error fetching data', error)
        }
    });

    return { ecgData, isLoading, isError, error };
};

export default useECGData;
