import { ParseError } from "papaparse";

export const handlePapaParseError = (errors: ParseError[]): string => {
    const errorMessage = `Error parsing data: ${errors[0]?.message || "Unknown parsing error"}`;
    console.error("Parsing Error:", errorMessage);
    throw new Error(errorMessage);
};
