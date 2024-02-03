/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '479px',
        sm: '568px',
        md: '768px',
        lg: '992px',
        xl: '1080px',
        '2xl': '1280px',
        '3xl': '1480px',
        '4xl': '1600px',
      },
      colors: {
        primary: {
          120: '#7B6651',
          100: '#BF9D7D',
          80: '#D0B79F',
          60: '#E1D1C2',
          40: '#F1EAE4',
          tint: '#FAF7F5',
        },
        success: {
          120: '#299F65',
          100: '#52DD7E',
          20: '#BCFBBD',
          10: '#E8FEE7',
        },
        info: {
          120: '#1D66AC',
          100: '#3BADEF',
          20: '#B1EFFD',
          10: '#E6FBFE',
        },
        alert: {
          120: '#C22538',
          100: '#DA3E51',
          20: '#F5CCD1',
          10: '#FDECEF',
        },
        dark: '#140F0A',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#BF9D7D',
          secondary: '#FFFFFF',
          info: '#3BADEF',
          success: '#52DD7E',
          warning: '#DA3E51',
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
