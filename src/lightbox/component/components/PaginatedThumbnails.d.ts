import { Component } from 'react';
export default class PaginatedThumbnails extends Component {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    getFirst(): any;
    setFirst(event: any, newFirst: any): void;
    gotoPrev(event: any): void;
    gotoNext(event: any): void;
    clampFirst(value: any): any;
    renderArrowPrev(): JSX.Element | null;
    renderArrowNext(): JSX.Element | null;
    render(): JSX.Element;
}
