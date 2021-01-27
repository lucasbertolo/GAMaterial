import styled from 'styled-components';

export const ContainerLookup = styled.View`
    flex: 1;
`;

export const HeaderMultiSelect = styled.View`
    elevation: 4;
    shadow-color: #000;
    shadow-offset: 0 4px;
    shadow-opacity: 0.3;
    shadow-radius: 4.65;
    background-color: ${(props) => props.theme.surfaceSecondary};
    width: 100%;
    height: 60;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const ContainerOptions = styled.View`
    flex-direction: row;
`;

export const IconArea = styled.TouchableOpacity``;
