import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Padding } from '~/components/BaseComponents/Padding/Padding';
import { Typography } from '../Typography/Typography';
import { ContainerOptions, HeaderMultiSelect, IconArea } from './styles';
import { CultureContext } from '~/hooks/culture';

export class MultiSelectOptions extends PureComponent {
  render() {
    const { l } = this.context;

    const {
      theme,
      selectAll,
      removeAll,
      numSelected,
      disabledSelectAll,
    } = this.props;
    return (
      <HeaderMultiSelect theme={theme}>
        <Padding>
          <Typography variant="overline" color={theme.onSurfaceSecondary}>
            {l('selected')}: {numSelected}
          </Typography>
        </Padding>
        <ContainerOptions>
          {!disabledSelectAll && (
            <Padding valueX={5}>
              <IconArea onPress={selectAll}>
                <Icon name="check-all" size={24} color={theme.success} />
              </IconArea>
            </Padding>
          )}
          <Padding>
            <IconArea onPress={removeAll}>
              <Icon name="trash-can-outline" size={24} color={theme.error} />
            </IconArea>
          </Padding>
        </ContainerOptions>
      </HeaderMultiSelect>
    );
  }
}
MultiSelectOptions.propTypes = {
  theme: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
  numSelected: PropTypes.number,
  selectAll: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
};

MultiSelectOptions.defaultProps = {
  numSelected: 0,
};

MultiSelectOptions.contextType = CultureContext;
