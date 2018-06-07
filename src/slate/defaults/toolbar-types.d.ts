/// <reference types="react" />
declare const _default: ({
    type: string[];
    label: JSX.Element;
    description: string[];
    onClick?: undefined;
} | {
    type: string;
    label: JSX.Element;
    description?: undefined;
    onClick?: undefined;
} | {
    type: string;
    label: JSX.Element;
    onClick: ({ value, onChange }: {
        value: any;
        onChange: any;
    }) => void;
    description?: undefined;
})[];
export default _default;
