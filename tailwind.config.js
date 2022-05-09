module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: 'rgb(16 185 129)',
          'primary-focus': 'rgb(5 150 105)',
          'base-100': 'rgb(250 250 250)',
          'base-200': 'rgb(244 244 245)',
          'base-300': 'rgb(228 228 231)',
          'base-content': 'rgb(24 24 27)'
        }
      },
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: 'rgb(16 185 129)',
          'primary-focus': 'rgb(5 150 105)',
          'base-100': 'rgb(24 24 27)',
          'base-200': 'rgb(39 39 42)',
          'base-300': 'rgb(63 63 70)',
          'base-content': 'rgb(250 250 250)'
        }
      }
    ]
  }
}
