import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback } from 'react';
import { useColorScheme, View } from 'react-native';
import { CustomModal } from '~/components/BaseComponents/CustomModal/CustomModal';
import { parseStringToDateWithTime } from '~/helpers/utils';

export function ModalPickerView({
  value,
  mode,
  display,
  onChange,
  label,
  onClose,
  closeModal,
  maximumDate,
  minimumDate,
  background,
  textColor,
}) {

  const handleChange = date => {
    closeModal();

    setTimeout(() => onChange(date), 0);
  };

  const handleClose = useCallback(() => {
    if (onClose && typeof onClose === 'function') onClose();

    closeModal();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const bgcolor = isDarkMode ? '#0a0a0a' : '#fefefe';

  const actions = [
    {
      title: l('save'),
      onPress: handleChange,
    },
  ];

  const maskPicker = date => {
    if (typeof date === 'string') return parseStringToDateWithTime(value);

    if (!date) return new Date();

    return date;
  };

  return (
    <CustomModal
      visible
      onClose={handleClose}
      background={background}
      textColor={textColor}
      title={label}
      actions={actions}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: bgcolor,
        }}
      >
        <DateTimePicker
          value={maskPicker(value)}
          mode={mode}
          display={display}
          onChange={(event, date) => handleChange(date)}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      </View>
    </CustomModal>
  );
}

export const ModalPickerForIos = React.memo(ModalPickerView, () => true);
