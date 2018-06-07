export declare const getRangeClientRectsChrome: (range: any) => any;
export declare const isChrome: boolean;
export declare const getRangeClientRects: (range: any) => any;
export declare const getRangeBoundingClientRect: (range: any) => {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
};
export declare const getVisibleSelectionRect: () => {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
} | null;
export declare const getCollapsedClientRect: () => any;
