import type { Config } from "tailwindcss";
import { withAnimations } from "animated-tailwindcss";

const config: Config = withAnimations({
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    daisyui: {
        themes: ["dark"],
    },

    theme: {
        extend: {
            backgroundImage: {
                landing_bg: "url('/background2.gif')",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("daisyui")],
}) as any as Config;
export default config;
