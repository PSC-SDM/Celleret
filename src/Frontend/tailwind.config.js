module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                wine: {
                    50: '#fdf2f4',
                    100: '#fae5e9',
                    200: '#f4c2cd',
                    300: '#e999ab',
                    400: '#d96a81',
                    500: '#c94560',
                    600: '#a83750',
                    700: '#8b2940',
                    800: '#6b1f2f',
                    900: '#4a1520',
                },
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#1a1a1a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}