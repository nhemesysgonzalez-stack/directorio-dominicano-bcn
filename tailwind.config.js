/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dr-blue': '#003893',
                'dr-red': '#CE1126',
                'dr-white': '#FFFFFF',
            },
        },
    },
    plugins: [],
}
