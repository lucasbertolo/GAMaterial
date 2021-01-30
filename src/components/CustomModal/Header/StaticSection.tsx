/* eslint-disable react/prop-types */
import React from 'react';
import { IconButton } from '~/components/BaseComponents/IconButton/IconButton';
import { useTheme } from '~/hooks/theme';
import { ButtonArea, HeaderText } from './styles';

function StaticSection({ title, action }) {
  const { theme } = useTheme();
  return (
    <>
      <ButtonArea>
        <IconButton
          icon="close"
          color={theme.onPrimary}
          action={action}
          pr={10}
          pl={10}
        />
      </ButtonArea>

      <HeaderText theme={theme} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </HeaderText>
    </>
  );
}

export default React.memo(StaticSection);
