import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        oy: "#f9593a",
        gw: "#38DC60",
      },
      colors: {
        oy: "#f9593a",
        gw: "#38DC60",
        g: "#40a459",
        bb: "#007bff",
      },
      boxShadow: {
        "1": "0 0 40px 2px rgba(128, 128, 128, 0.8)",
        "2": "0px 4px 27px rgba(0, 0, 0, 0.07)",
        "3": "0 2 5px 10px rgba(0,0,0,0.1)",
      },
      fontSize: {
        "16": "16px",
        "20": "20px",
        "24": "24px",
        "32": "32px",
      },
      lineHeight: {
        "16": "16px",
        "20": "20px",
        "24": "24px",
        "32": "32px",
      },
    },
  },
  plugins: [],
};
export default config;
