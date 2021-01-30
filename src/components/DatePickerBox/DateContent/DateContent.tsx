import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { ErrorMessage } from '~/components/BaseComponents/FormComponents/ErrorMessage/ErrorMessage';
import { Padding } from '~/components/BaseComponents/Padding/Padding';
import { Typography } from '../../../Typography/Typography';
import { IconPadding, PickerInput, StyledIcon, WrapperInput } from './styles';
import { useTheme } from '~/hooks/theme';
import { buildDisplayDate, parseStringToDate } from '~/helpers/utils';
import { useCulture } from '~/hooks/culture';
import enums from '~/helpers/enums';

function DateContent(props) {
  const {
    iconButton,
    displayPicker,
    label,
    size,
    text,
    errorLog,
    isDisabled,
    readOnly,
  } = props;

  const { theme } = useTheme();
  const { f } = useCulture();
  const { dateFormat } = enums.unitSystem;

  const displayText = value => {
    if (text instanceof Date) return buildDisplayDate(text, f(dateFormat));

    if (typeof text === 'string')
      return buildDisplayDate(parseStringToDate(text), f(dateFormat));

    return value || '';
  };

  const placeholder = buildDisplayDate(new Date(), f(dateFormat));

  return iconButton ? (
    <IconPadding onPress={displayPicker}>
      <StyledIcon name="calendar" size={40} color={theme.onSurfacePrimary} />
    </IconPadding>
  ) : (
    <>
      {label.length > 0 && (
        <Padding valueY={0} valueX={30}>
          <Typography color={theme.onSurfaceSecondary} variant="body2">
            {label}
          </Typography>
        </Padding>
      )}

      <TouchableOpacity onPress={readOnly ? null : displayPicker}>
        <WrapperInput
          size={size}
          theme={theme}
          error={errorLog.length > 0}
          isDisabled={isDisabled}
        >
          <PickerInput
            pointerEvents="none"
            size={size}
            editable={false}
            placeholderTextColor={theme.placeholder}
            placeholder={placeholder}
            value={displayText(text)}
            theme={theme}
            isDisabled={isDisabled}
          />

          <StyledIcon
            name="calendar"
            size={20}
            color={theme.onSurfacePrimary}
          />
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

const DateContentView = memo(DateContent);

export default DateContentView;
