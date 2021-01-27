import React, { createContext, useCallback, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const themes = {
    light: {
        key: 'light',
        primary: '#83B240',
        primaryVariant: '#5b8a2d',
        secondary: '#1063A9',
        secondaryVariant: '#00488A',
        tertiary: '#83B240',
        tertiaryVariant: '#3A681C',
        background: '#ECF0F1',
        snackbar: '#000000dd',
        surfacePrimary: '#FFFFFF',
        surfaceSecondary: '#E8F5E9',
        surfaceTertiary: '#E1F5FE',
        error: '#B00020',
        success: '#4BB543',
        warning: '#FFD24D',
        meta: '#9E9E9E',
        disabled: '#E0E0E0',
        onPrimary: '#FFFFFF',
        onSecondary: '#FFFFFF',
        onBackground: '#121212',
        onSurfacePrimary: '#121212',
        onSurfaceSecondary: '#333',
        onSurfaceTertiary: '#333',
        onError: '#FFFFFF',
        onSuccess: '#FFFFFF',
        onWarning: '#121212',
        onDisabled: '#8B8B8B',
        placeholder: '#bfbfbf',
        modules: {
            gaforms: { background: '#26a65b', onBackground: '#FFFFFF' },
            supply: { background: '#2980C7', onBackground: '#FFFFFF' },
            timesheet: { background: '#7029c7', onBackground: '#FFFFFF' },
            weather: { background: '#cf000f', onBackground: '#FFFFFF' },
            commerce: { background: '#00a792', onBackground: '#FFFFFF' },
            geneticImprovement: {
                background: '#e87e04',
                onBackground: '#FFFFFF'
            },
            motomec: { background: '#139c06', onBackground: '#FFFFFF' },
            payLabour: { background: '#6D4C41', onBackground: '#FFFFFF' },
            draftWorkOrder: { background: '#3949AB', onBackground: '#FFFFFF' }
        }
    },
    dark: {
        key: 'dark',
        primary: '#93deac',
        primaryVariant: '#29c770',
        secondary: '#91C8Eb',
        secondaryVariant: '#2D93D9',
        background: '#333',
        snackbar: '#121212',
        surfacePrimary: '#121212',
        surfaceSecondary: '#706c61',
        surfaceTertiary: '#202124',
        tertiary: '#83B240',
        tertiaryVariant: '#3A681C',
        error: '#CF6679',
        success: '#A6D9A3',
        warning: '#FFDE81',
        meta: '#F1F3F4',
        disabled: '#3C3C3C',
        onPrimary: '#333',
        onSecondary: '#FFFFFF',
        onBackground: '#FFFFFF',
        onSurfacePrimary: '#FFFFFF',
        onSurfaceSecondary: '#FFFFFF',
        onSurfaceTertiary: '#FFFFFF',
        onError: '#333',
        onSuccess: '#333',
        onWarning: '#333',
        onDisabled: '#9E9E9E',
        placeholder: '#2e3131',
        modules: {
            gaforms: { background: '#9EDAB2', onBackground: '#121212' },
            supply: { background: '#3DAEEE', onBackground: '#FFFFFF' },
            timesheet: { background: '#b999e3', onBackground: '#121212' },
            weather: { background: '#f8463d', onBackground: '#121212' },
            commerce: { background: '#00c3b2', onBackground: '#FFFFFF' },
            geneticImprovement: {
                background: '#e87e04',
                onBackground: '#121212'
            },
            motomec: { background: '#66BB6A', onBackground: '#FFFFFF' },
            payLabour: { background: '#8D6E63', onBackground: '#121212' },
            draftWorkOrder: { background: '#5C6BC0', onBackground: '#FFFFFF' }
        }
    },
    sunYellow: {
        key: 'sunYellow',
        primary: '#FF6E01',
        primaryVariant: '#FFB201',
        secondary: '#FFEFBE',
        secondaryVariant: '#FFD141',
        background: '#FDD358',
        snackbar: '#121212',
        surfacePrimary: '#FFC928',
        surfaceSecondary: '#FFEFBE',
        surfaceTertiary: '#FFF8E1',
        tertiary: '#83B240',
        tertiaryVariant: '#3A681C',
        error: '#CF6679',
        success: '#A6D9A3',
        warning: '#FFDE81',
        meta: '#F1F3F4',
        disabled: '#3C3C3C',
        onPrimary: '#121212',
        onSecondary: '#444444',
        onBackground: '#121212',
        onSurfacePrimary: '#121212',
        onSurfaceSecondary: '#121212',
        onSurfaceTertiary: '#121212',
        onError: '#333',
        onSuccess: '#333',
        onWarning: '#333',
        onDisabled: '#9E9E9E',
        placeholder: '#bfbfbf',
        modules: {
            gaforms: { background: '#118343', onBackground: '#FFFFFF' },
            supply: { background: '#1F5090', onBackground: '#FFFFFF' },
            timesheet: { background: '#3300a7', onBackground: '#FFFFFF' },
            weather: { background: '#c10000', onBackground: '#121212' },
            commerce: { background: '#008571', onBackground: '#FFFFFF' },
            geneticImprovement: {
                background: '#e87e04',
                onBackground: '#121212'
            },
            motomec: { background: '#1B5E20', onBackground: '#FFFFFF' },
            payLabour: { background: '#3E2723', onBackground: '#FFFFFF' },
            draftWorkOrder: { background: '#1A237E', onBackground: '#FFFFFF' }
        }
    }
};

interface ThemeState {
    key: string;
    primary: string;
    primaryVariant: string;
    secondary: string;
    secondaryVariant: string;
    tertiary: string;
    tertiaryVariant: string;
    background: string;
    snackbar: string;
    surfacePrimary: string;
    surfaceSecondary: string;
    surfaceTertiary: string;
    error: string;
    success: string;
    warning: string;
    meta: string;
    disabled: string;
    onPrimary: string;
    onSecondary: string;
    onBackground: string;
    onSurfacePrimary: string;
    onSurfaceSecondary: string;
    onSurfaceTertiary: string;
    onError: string;
    onSuccess: string;
    onWarning: string;
    onDisabled: string;
    placeholder: string;
}

interface ThemeContextState {
    toggleTheme(key: string): void;
    theme: object;
}

const ThemeContext = createContext<ThemeContextState>({} as ThemeContextState);

const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<ThemeState>(
        Appearance.getColorScheme() === 'dark' ? themes.dark : themes.light
    );

    const selectTheme = (key: string): ThemeState => {
        switch (key) {
            case 'light':
                return themes.light;
            case 'dark':
                return themes.dark;
            case 'sunYellow':
                return themes.sunYellow;
            default:
                return themes.light;
        }
    };

    const toggleTheme = useCallback((key) => {
        const newTheme = selectTheme(key);

        setTheme(newTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

function useTheme(): ThemeContextState {
    const context = useContext(ThemeContext);

    if (!context) {
        // eslint-disable-next-line no-console
        console.log('Error ao instanciar o contexto Theme!');
    }

    return context;
}

export { ThemeProvider, ThemeContext, useTheme };
