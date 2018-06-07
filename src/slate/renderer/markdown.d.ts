declare class Markdown {
    constructor(options?: {});
    serialize(state: any): any;
    serializeNode(node: any): any;
    serializeRange(range: any): any;
    serializeString(string: any): any;
    deserialize(markdown: any): any;
}
export default Markdown;
