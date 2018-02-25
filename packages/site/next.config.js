require('dotenv').load()

module.exports = {
  webpack (c) {
    const config = c

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.(css|scss|svg)/,
        use: ['babel-loader', 'raw-loader']
      }
    )

    return config
  },

  exportPathMap () {
    return {
      '/': { page: '/' },
      '/help': { page: '/help' },
      '/login': { page: '/login' },
      '/pricing': { page: '/pricing' }
    }
  }
}
