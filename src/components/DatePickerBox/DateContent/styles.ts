import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

export const PickerInput = styled.TextInput`
  flex: 1;
  padding-top: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-left: 10;
  color: ${props =>
    props.isDisabled ? props.theme.disabled : props.theme.onSurfacePrimary};
  text-align: center;
  font-size: 20;
`;

export const StyledIcon = styled(Icon)`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  width: ${props => props.size + 30};
`;

export const WrapperInput = styled.View`
  elevation: 2;
  margin-top: 10;
  margin-bottom: 10;
  margin-left: auto;
  margin-right: auto;
  width: ${props => {
    if (props.size === 'small') return '50%';
    if (props.size === 'default') return '70%';
    if (props.size === 'large') return '90%';
    return '70%';
  }};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.isDisabled ? props.theme.disabled : props.theme.surfacePrimary};
  border-color: ${props => (props.error ? props.theme.error : 'transparent')};
  border-width: ${props => (props.error ? 1.2 : 0)};
`;

export const IconPadding = styled.TouchableOpacity`
  padding-top: 25;
  padding-bottom: 25;
  padding-left: 25;
  padding-right: 25;
`;
