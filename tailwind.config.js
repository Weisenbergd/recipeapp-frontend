/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-veggie",
    "bg-peanuts",
    "bg-vegan",
    "bg-keto",
    "bg-protein",
    "bg-fast",
    "bg-spicy",
  ],
  theme: {
    extend: {
      padding: {
        transitionProperty: {
          height: "height",
        },
        paddingMobile: "var(--paddingMobile)",
        paddingDesktop: "var(--paddingDesktop)",
      },
      backgroundColor: {
        veggie: "var(--veggie)",
        peanuts: "var(--peanuts)",
        vegan: "var(--vegan)",
        keto: "var(--keto)",
        protein: "var(--protein)",
        fast: "var(--fast)",
        spicy: "var(--spicy)",
      },
    },
  },
  plugins: [],
};
