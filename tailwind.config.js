/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        info: "#85cbf8",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        sky: {
          primary: "#8795a1",
          "primary-focus": "#faad63",
          secondary: "#9CD1C6",
          "secondary-focus": "#7eaf9c",
          accent: "#3d4852",
          neutral: "#1f2529",
          "base-100": "#9aacb8",
          "base-content": "#3d4852",
        },
      },
      "dark",
      "dracula",
      "winter",
      "forest",
      "garden",
    ],
  },
};
