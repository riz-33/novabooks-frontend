/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Important: This tells Tailwind where to look
    ],
    theme: {
        extend: {
            colors: {
                novaNavy: '#1e3a8a',
                novaGold: '#d4af37',
            },
        },
    },
    plugins: [],
}