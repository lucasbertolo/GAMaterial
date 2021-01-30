import styled from 'styled-components/native';
import { Platform } from 'react-native';

interface IModalInterface {
    theme: {
        surfacePrimary: string;
    };
}

interface IDynamicColor {
    theme: {
        [key: string]: string;
    };
    textColor: string;
    background: string;
}

interface IText {
    size: number;
    theme: {
        onPrimary: string;
    };
}

export const ModalContainer = styled.View`
    flex: 1;
    background-color: ${(props: IModalInterface) => props.theme.surfacePrimary};
`;

export const ChildrenContainer = styled.View`
    flex: 1;
    width: 100%;
`;

export const ButtonArea = styled.View`
    flex: 0.8;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const Header = styled.View`
    elevation: 12;
    height: 60;
    flex-direction: row;
    align-items: center;

    background-color: ${(props: IDynamicColor) =>
        props.theme[props.background] ||
        props.background ||
        props.theme.primary};

    border-top-right-radius: ${Platform.OS === 'ios' ? 0 : 25};
    border-top-left-radius: ${Platform.OS === 'ios' ? 0 : 25};
`;

export const HeaderText = styled.Text`
    flex: 2;
    padding-left: 16;
    font-family: 'Roboto-Bold';
    font-size: ${(props: IText) => `${props.size || '22'}`};
    color: ${(props: IText) => props.theme.onPrimary};
`;

export const TopBarRightActionsWrapper = styled.View`
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const ActionButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const ActionText = styled.Text`
    color: ${(props: IDynamicColor) =>
        props.theme[props.textColor] ||
        props.textColor ||
        props.theme.onPrimary};

    font-family: 'Roboto-Bold';
    font-size: ${(props: IText) => `${props.size || '22'}`};
`;
