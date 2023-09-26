import React from "react";

type ErrorProps = {
    message: string
}

const Error: React.FC<ErrorProps> = ({ message }) => <p>Error: {message}</p>;

export default Error;
