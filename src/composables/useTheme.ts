import { ref, onMounted } from 'vue';

type Theme = 'light' | 'dark';

// Initialize from document attribute (set in main.ts) or default to light
const getInitialTheme = (): Theme => {
  const docTheme = document.documentElement.getAttribute('data-theme') as Theme | null;
  if (docTheme === 'light' || docTheme === 'dark') {
    return docTheme;
  }
  return 'light';
};

const theme = ref<Theme>(getInitialTheme());

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light');
  };

  onMounted(() => {
    // Sync with document attribute in case it was set before component mount
    const docTheme = document.documentElement.getAttribute('data-theme') as Theme | null;
    if (docTheme === 'light' || docTheme === 'dark') {
      theme.value = docTheme;
    }
  });

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
