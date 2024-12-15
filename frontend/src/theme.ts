import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      colors: {
        brand: {
          50: { value: '#f7fafc' },
          100: { value: '#edf2f7' },
          200: { value: '#e2e8f0' },
          300: { value: '#cbd5e0' },
          400: { value: '#a0aec0' },
          500: { value: '#718096' },
          600: { value: '#4a5568' },
          700: { value: '#2d3748' },
          800: { value: '#1a202c' },
          900: { value: '#171923' },
        },
        primary: {
          50: { value: '#E3F2FD' },
          100: { value: '#BBDEFB' },
          200: { value: '#90CAF9' },
          300: { value: '#64B5F6' },
          400: { value: '#42A5F5' },
          500: { value: '#2196F3' },
          600: { value: '#1E88E5' },
          700: { value: '#1976D2' },
          800: { value: '#1565C0' },
          900: { value: '#0D47A1' },
        },
        secondary: {
          50: { value: '#FFEBEE' },
          100: { value: '#FFCDD2' },
          200: { value: '#EF9A9A' },
          300: { value: '#E57373' },
          400: { value: '#EF5350' },
          500: { value: '#F44336' },
          600: { value: '#E53935' },
          700: { value: '#D32F2F' },
          800: { value: '#C62828' },
          900: { value: '#B71C1C' },
        },
      },
      spacing: {
        4: { value: '1rem' },
        8: { value: '2rem' },
        12: { value: '3rem' },
      },
    },
  },
});
