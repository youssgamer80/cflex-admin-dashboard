
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#f6b26b',
            'link-color': '#f6b26b',
            'border-radius-base': '10px',
            'box-shadow': '11px 10px 5px -4px rgba(0,0,0,0.75)',
            'shadow-color': '#000000',
            'card-shadow': '-16px 8px 15px -3px rgba(0,0,0,0.1)',

          },
          javascriptEnabled: true,
        },
      },
    },
  },
};