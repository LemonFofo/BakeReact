export const colors = {
  primary: '#FF6B6B',
  accent: '#4ECDC4',
  background: '#F7F7F7',
  text: '#2D3436',
  textLight: '#636E72',
  white: '#FFFFFF',
  border: '#DFE6E9',
  error: '#FF7675',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  small: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
};

export const shadows = {
  card: {
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
}; 