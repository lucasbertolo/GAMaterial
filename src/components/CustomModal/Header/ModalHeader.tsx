/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { ThemeContext } from '~/hooks/theme';
import StaticSection from './StaticSection';
import {
  ActionButton,
  ActionText,
  Header,
  TopBarRightActionsWrapper,
} from './styles';

export class ModalHeader extends PureComponent {
  render() {
    const { theme } = this.context;
    const {
      leftAction,
      handleAction,
      title,
      actions,
      background,
      textColor,
    } = this.props;
    return (
      <Header theme={theme} background={background || theme.primary}>
        <StaticSection title={title} action={leftAction} />

        {!!actions && (
          <TopBarRightActionsWrapper>
            {actions.map((item, index) => (
              <ActionButton
                key={`${item.title + index}`}
                onPress={() => {
                  handleAction(item.onPress);
                }}
              >
                <ActionText
                  theme={theme}
                  size={16}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  textColor={textColor}
                >
                  {item.title}
                </ActionText>
              </ActionButton>
            ))}
          </TopBarRightActionsWrapper>
        )}
      </Header>
    );
  }
}
ModalHeader.contextType = ThemeContext;
