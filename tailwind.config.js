/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", "Sans-serif"],
            },
            colors: {
                mainColor: "#c0ae98",
                textColor: "#A6A6A6",
                titleColor: "#333333",
                bannerColor: "#F4F3EF",
                btncolor: "#B48E61",
                hovermain: "#c0ae98",
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
                fadeIn: {
                    "0%": { opacity: 0, transform: "translateY(100px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
            animation: {
                wiggle: "wiggle 1s ease-in-out infinite",
                fadeIn: "fadeIn 2s ease-in-out forwards",
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light"],
    },
};
