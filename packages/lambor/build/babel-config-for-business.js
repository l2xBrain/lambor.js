exports.babelClientOpts = {
  presets: [
    require('@babel/preset-typescript'),
    [require('@babel/preset-env'), { loose: true }],
    [require('@babel/preset-react'), { useBuiltIns: true }],
  ],
  plugins: [
    require('@babel/plugin-syntax-dynamic-import'),
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    require('lambor-utils/babel-loadable-plugin')
  ],
}

exports.babelServerOpts = {
  presets: [
    require('@babel/preset-typescript'),
    [require('@babel/preset-react'), { useBuiltIns: true }],
    [
      require('@babel/preset-env'),
      {
        modules: 'commonjs',
        targets: {
          node: '8.3',
        },
        loose: true,
      },
    ],
  ],
  plugins: [
    require('@babel/plugin-syntax-dynamic-import'),
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    require('lambor-utils/babel-loadable-plugin')
  ],

}
