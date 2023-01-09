const theme = require('./theme.json');
const tailpress = require("@jeffreyvr/tailwindcss-tailpress");

/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
    },
    content: [
        './*.php',
        './*.html',
        './theme.json',
        './safelist.txt',
        './**/*.php',
        './**/*.html',
        './resources/css/*.css',
        './resources/js/*.js',
        // './safelist.txt'
    ],
    theme: {
        extend: {
            colors: tailpress.colorMapper(tailpress.theme('settings.color.palette', theme)),
            fontSize: tailpress.fontSizeMapper(tailpress.theme('settings.typography.fontSizes', theme))
        },
        screens: {
            'xs': '480px',
            'sm': '600px',
            'md': '782px',
            'lg': '976px',
            'xl': '1440px',
            '2xl': '1920px'
        }
    },
    // ...(process.env.NODE_ENV == 'development') && {
    //     safelist: [
    //         { pattern: /.*/ },
    //     ],
    // },
    // plugins: [
    //     tailpress.tailwind
    // ]
};
