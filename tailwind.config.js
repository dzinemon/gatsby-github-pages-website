/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1e40af',
                textDecoration: 'underline',
              },
              textDecoration: 'none',
              fontWeight: '500',
            },
            blockquote: {
              borderLeftColor: '#2563eb',
              backgroundColor: '#f1f5f9',
              borderRadius: '0.25rem',
              padding: '0.5rem 1rem',
              fontStyle: 'italic',
            },
            ul: {
              li: {
                '&::marker': {
                  color: '#2563eb',
                },
              },
            },
            ol: {
              li: {
                '&::marker': {
                  color: '#2563eb',
                  fontWeight: 'bold',
                },
              },
            },
            h1: {
              color: '#1e293b',
              fontWeight: '800',
            },
            h2: {
              color: '#1e293b',
              fontWeight: '700',
            },
            h3: {
              color: '#1e293b',
              fontWeight: '600',
            },
            h4: {
              color: '#1e293b',
              fontWeight: '600',
            },
            code: {
              backgroundColor: '#f1f5f9',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              borderRadius: '0.5rem',
            },
            hr: {
              borderColor: '#cbd5e1',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            table: {
              thead: {
                borderBottomColor: '#cbd5e1',
              },
              tbody: {
                tr: {
                  borderBottomColor: '#e2e8f0',
                },
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
