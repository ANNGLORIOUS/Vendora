/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        'primary-dark': '#047857',
        'primary-light': '#ecfdf5',
        bg: '#f8fafc',
        panel: '#ffffff',
        border: '#e2e8f0',
        text: '#0f172a',
        muted: '#475569',
        success: '#16a34a',
        warning: '#d97706',
        danger: '#dc2626',
        info: '#2563eb',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15,23,42,0.06)',
        card: '0 18px 42px rgba(15,23,42,0.08)'
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '20px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
}
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        panel: 'var(--panel)',
        bg: 'var(--bg)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },
  plugins: [],
}
