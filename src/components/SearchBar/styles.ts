import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const InputHeight = 52;

interface ISearchProps {
    hasShadow: boolean;
}

export const SearchContainer = styled.View`
    elevation: ${(props: ISearchProps) => (props.hasShadow ? 0 : 4)};
    shadow-color: #000;
    shadow-offset: ${(props: ISearchProps) =>
        props.hasShadow ? '0 2px' : '0 0'};
    shadow-opacity: 0.23;
    shadow-radius: 2.62;
    width: 100%;
    height: ${InputHeight};
    margin-top: 10;
    margin-bottom: 10;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10;
`;

export const InputStyleStack = styled.View`
    flex: 1;
    flex-direction: row;
    height: ${InputHeight};
`;

export const StyledInput = styled.TextInput`
    flex: 3;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${InputHeight};
    font-size: 22;
`;

export const RightIconButton = styled.TouchableOpacity`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const EraseIcon = styled(Icon)`
    background-color: transparent;
    font-size: 24;
`;

export const SearchIconButton = styled.TouchableOpacity`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SearchIcon = styled(MaterialIcon)`
    background-color: transparent;
    font-size: 24;
`;
