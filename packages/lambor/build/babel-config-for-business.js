exports.babelClientOpts = {
  presets: [
    require.resolve('@babel/preset-typescript'),
    [require.resolve('@babel/preset-env'), { loose: true }],
    [require.resolve('@babel/preset-react'), { useBuiltIns: true }],
  ],
  plugins: [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
    require.resolve('lambor-utils/babel-loadable-plugin')
  ],
}

exports.babelServerOpts = {
  presets: [
    require.resolve('@babel/preset-typescript'),
    [require.resolve('@babel/preset-react'), { useBuiltIns: true }],
    [
      require.resolve('@babel/preset-env'),
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
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
    require.resolve('lambor-utils/babel-loadable-plugin')
  ],

}
