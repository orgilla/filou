/**
 * Slate plugin to ensure a trailing block.
 * @param {Object} [opts] Options for the plugin
 * @param {String|Function} [opts.match='paragraph'] Match last block
 * @param {String} [opts.type] The type of the trailing block to insert
 * @return {Object}
 */
declare function HeadingId(opts: any): {
    validateNode: (node: any) => ((change: any) => any) | undefined;
};
export default HeadingId;
