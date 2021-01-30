import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { ErrorMessage } from '~/components/BaseComponents/FormComponents/ErrorMessage/ErrorMessage';
import { Padding } from '~/components/BaseComponents/Padding/Padding';
import { buildDisplayTime } from '~/helpers/utils';
import { useTheme } from '~/hooks/theme';
import { Typography } from '../../../Typography/Typography';
import { IconPadding, PickerInput, StyledIcon, WrapperInput } from './styles';

function TimeContent(props) {
  const {
    iconButton,
    displayPicker,
    label,
    size,
    text,
    showSeconds,
    errorLog,
    isDisabled,
    readOnly,
  } = props;

  const { theme } = useTheme();

  const displayText =
    typeof text === 'string' ? text : buildDisplayTime(text, showSeconds) || '';

  const placeholder = buildDisplayTime(new Date());

  return iconButton ? (
    <IconPadding onPress={displayPicker}>
      <StyledIcon name="clock-o" size={40} color={theme.onSurfacePrimary} />
    </IconPadding>
  ) : (
    <>
      {label.length > 0 && (
        <Padding valueY={0} valueX={15}>
          <Typography color={theme.onSurfaceSecondary} variant="body2">
            {label}
          </Typography>
        </Padding>
      )}

      <TouchableOpacity onPress={readOnly ? null : displayPicker}>
        <WrapperInput size={size} theme={theme} isDisabled={isDisabled}>
          <PickerInput
            pointerEvents="none"
            editable={false}
            placeholder={placeholder}
            placeholderTextColor={theme.placeholder}
            value={displayText}
            theme={theme}
            isDisabled={isDisabled}
          />

          <StyledIcon name="clock-o" size={20} color={theme.onSurfacePrimary} />
        </WrapperInput>
      </TouchableOpacity>

      {errorLog.length > 0 && (
        <Padding valueY={0} valueX={10}>
          <ErrorMessage msg={errorLog} />
        </Padding>
      )}
    </>
  );
}

const TimeContentView = memo(TimeContent);

export default TimeContentView;
