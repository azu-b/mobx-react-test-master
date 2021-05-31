import React from 'react';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props) => (
    <p style={{ color: "red"}}>{props.message}</p>
);