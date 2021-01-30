import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { View } from 'react-native';
import { parseStringToDateWithTime } from '~/helpers/utils';
import { useTheme } from '~/hooks/theme';

export function ModalPickerView({
  value,
  mode,
  display,
  onChange,
  onClose,
  closeModal,
  maximumDate,
  minimumDate,
}) {
  const { theme } = useTheme();

  const setDate = (event, date) => {
    if (event.type === 'dismissed') {
      closeModal();

      if (onClose && typeof onClose === 'function') onClose();
    }

    if (event.type === 'set') {
      closeModal();

      setTimeout(() => onChange(date || value), 0);
    }
  };

  const maskPicker = date => {
    if (typeof date === 'string') return parseStringToDateWithTime(value);

    if (!date) return new Date();

    return date;
  };

  return (
    <View>
      <DateTimePicker
        value={maskPicker(value)}
        mode={mode}
        display={display}
        onChange={setDate}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        theme={theme}
      />
    </View>
  );
}

export const ModalPicker = React.memo(ModalPickerView, () => true);
