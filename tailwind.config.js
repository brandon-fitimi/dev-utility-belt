/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Ensure all utilities are included
  safelist: [
    {
      pattern: /grid-cols-/,
    },
    {
      pattern: /gap-/,
    },
    {
      pattern: /col-span-/,
    },
    {
      pattern: /row-span-/,
    },
  ],
  important: true, // This ensures our styles take precedence
}