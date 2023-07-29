module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'], // This sets the root directory for the aliases
        alias: {
          '@': './', // Replace this with your actual root path
        },
      },
    ],
  ],
};
