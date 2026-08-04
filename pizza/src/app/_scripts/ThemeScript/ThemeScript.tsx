import { COOKIES } from '@/shared/constants'

export const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function() {
        try {
          const root = document.documentElement;
          root.classList.remove('light', 'dark');

          const getSystemTheme = () => {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          };
          
          const getCookie = (name) => {
            const value = \`; \${document.cookie}\`;
            const parts = value.split(\`; \${name}=\`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
          };
          
          const theme = getCookie('${COOKIES.THEME}') || 'system';
          const activeTheme = theme === 'system' ? getSystemTheme() : theme;
          
          root.classList.add(activeTheme)
          root.style.colorScheme = activeTheme;
        } catch (e) {}
      })();
    `,
    }}
  />
)
