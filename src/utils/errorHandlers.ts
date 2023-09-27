import { AxiosError } from "axios";
import { ParseError } from "papaparse";

export const handleAxiosError = (error: AxiosError): string => {
    // Handling file reading errors
    if (error.message.includes("Network Error")) {
        console.error("File Reading Error:", error);
        throw new Error('There was an issue reading the local file. Please check if the file exists and is accessible.');
    }
    // Handling other general errors
    else {
        console.error("General Error:", error.message);
        throw new Error('An unexpected error occurred while reading the file. Please try again.');
    }
};

export const handlePapaParseError = (errors: ParseError[]): string => {
    const errorMessage = `Error parsing data: ${errors[0]?.message || "Unknown parsing error"}`;
    console.error("Parsing Error:", errorMessage);
    throw new Error(errorMessage);
};
