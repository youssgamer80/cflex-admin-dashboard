
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#FB5A00',
            'link-color': '#FB5A00',
            'border-radius-base': '10px',
            'box-shadow': '11px 10px 5px -4px rgba(0,0,0,0.75)',
            'shadow-color': '#000000',
            'card-shadow': '-9px 9px 5px -8px rgba(0,0,0,0.61)',

          },
          javascriptEnabled: true,
        },
      },
    },
  },
};