import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { createContext, useMemo, useState, ReactNode } from 'react';

const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export const useMode = () => useContext(ThemeModeContext);
