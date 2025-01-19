/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        transitionProperty: {
          height: "height",
        },
        paddingMobile: "var(--paddingMobile)",
        paddingDesktop: "var(--paddingDesktop)",
      },
    },
  },
  plugins: [],
};
