import React, { useState, useContext, createContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

type ThemeToggleContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

type ThemeProviderProps = {
    children: React.ReactNode;
};

const ThemeToggleContext = createContext<ThemeToggleContextType | undefined>(undefined);

export const useThemeToggle = () => {
    const context = useContext(ThemeToggleContext);
    if (!context) {
        throw new Error('useThemeToggle must be used within a ThemeProvider');
    }
    return context;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        }
    });

    return (
        <ThemeToggleContext.Provider value={{ darkMode, toggleDarkMode: () => setDarkMode(!darkMode) }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeToggleContext.Provider>
    )
};

export default ThemeProvider;
