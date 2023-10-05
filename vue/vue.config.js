module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mp4$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'videos/[name].[ext]', // Output file path and name
              },
            },
          ],
        },
      ],
    },
  },
};
