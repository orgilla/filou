import { Component } from 'react';
declare class Blocks extends Component {
    dragStart: (type: any) => (ev: any) => any;
    applyTemplate: (type: any) => void;
    getItems: (block: any) => JSX.Element[];
    render(): JSX.Element;
}
export default Blocks;
