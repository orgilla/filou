import { Component } from 'react';
declare class Lightbox extends Component {
    constructor(props: any);
    getChildContext(): {
        theme: any;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    preloadImage(idx: any): void;
    gotoNext(event: any): void;
    gotoPrev(event: any): void;
    closeBackdrop(event: any): void;
    handleKeyboardInput(event: any): boolean;
    renderArrowPrev(): JSX.Element | null;
    renderArrowNext(): JSX.Element | null;
    renderDialog(): JSX.Element;
    renderImages(): JSX.Element | null;
    renderThumbnails(): JSX.Element | undefined;
    render(): JSX.Element;
}
export default Lightbox;
