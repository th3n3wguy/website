module.exports = {
  presets: [
    '@vue/app',
    ['env', { modules: false }],
    'stage-2'
  ],
  plugins: [
    'transform-runtime',
    ['transform-imports', {
      vuetify: {
        transform: 'vuetify/es5/components/${member}',
        preventFullImport: true
      }
    }]
  ]
};
