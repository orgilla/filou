/**
    Bind multiple component methods:

    * @param {this} context
    * @param {Array} functions

    constructor() {
        ...
        bindFunctions.call(this, ['handleClick', 'handleOther']);
    }
*/
export default function bindFunctions(functions: any): void;
