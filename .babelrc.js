module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV === 'development',
      },
    ],
    [
      '@babel/env',
      {
        // modules: process.env.BABEL_ENV === 'es' ? false : undefined,
        modules: false,
      },
    ],
    [
      '@babel/preset-stage-0',
      {
        decoratorsLegacy: true,
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {}],
    [
      'import-7',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
    'lodash',
    [
      'transform-imports',
      {
        antd: {
          transform: 'antd/lib/${member}',
          kebabCase: true,
          preventFullImport: true,
        },
        'date-fns': {
          transform: 'date-fns/${member}',
          preventFullImport: true,
          camelCase: true,
        },
        filou: {
          transform: 'filou/es/${member}',
          kebabCase: true,
          preventFullImport: true,
        },
      },
    ],
  ],
};
