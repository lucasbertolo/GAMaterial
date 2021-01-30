import styled from 'styled-components/native';

interface IDynamicColor {
    theme: {
        [key: string]: string;
    };
    textColor: string;
    background: string;
}

function defineBarStyle(theme: { key: string }) {
    if (theme.key === 'light') return 'dark-content';
    if (theme.key === 'dark') return 'light-content';
    return 'dark-content';
}

export const CustomBar = styled.StatusBar.attrs(
    ({ theme }: { theme: { key: string } }) => ({
        barStyle: defineBarStyle(theme)
    })
)`
    background-color: ${(props: IDynamicColor) => props.theme.surfacePrimary};
`;

export const StatusBarSafeArea = styled.SafeAreaView`
    flex: 0;
    background-color: ${(props: IDynamicColor) =>
        props.background === ''
            ? props.theme.surfacePrimary
            : props.background};
    z-index: 4;
`;
