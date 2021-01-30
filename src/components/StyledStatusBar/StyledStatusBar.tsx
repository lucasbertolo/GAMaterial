import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useTheme } from '../../hooks/theme';
import { StatusBarSafeArea } from './styles';

interface IStyledBarProps {
    background: string;
}

export const StyledStatusBar = ({ background }: IStyledBarProps) => {
    const { theme } = useTheme();

    return (
        <>
            {Platform.OS === 'ios' && (
                <StatusBarSafeArea theme={theme} background={background}>
                    <StatusBar
                        barStyle={
                            theme.key === 'light'
                                ? 'dark-content'
                                : 'light-content'
                        }
                        backgroundColor={
                            background === ''
                                ? theme.surfacePrimary
                                : background
                        }
                    />
                </StatusBarSafeArea>
            )}

            {Platform.OS === 'android' && (
                <StatusBar
                    barStyle={
                        theme.key === 'light' ? 'dark-content' : 'light-content'
                    }
                    backgroundColor={
                        background === '' ? theme.surfacePrimary : background
                    }
                />
            )}
        </>
    );
};
