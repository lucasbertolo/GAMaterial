import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import enums from '../../helpers/enums';
import { buildDisplayTime, buildSaveDateTime } from '../../helpers/utils';
import DateContent from './DateContent/DateContent';
import { ModalPicker } from './ModalPicker/ModalPicker';
import { ModalPickerForIos } from './ModalPicker/ModalPickerForIos';
import TimeContent from './TimeContent/TimeContent';
import { DatePickerContainer } from './styles';

interface IDatePickerProps {
    maximumDate?: Date;
    minimumDate?: Date;
    display?: 'default' | 'spinner' | 'calendar' | 'clock';
    mode: 'date' | 'time';
    defaultValue: string | Date;
    onChange: (formattedTime: string, value: Date) => void;
    iconButton?: boolean;
    showSeconds?: boolean;
    size?: 'small' | 'default' | 'large';
    errorLog?: string;
    label?: string;
    onFocus?: boolean;
    onClose?: () => void;
    background?: string;
    textColor?: string;
    isDisabled?: boolean;
    readOnly?: boolean;
}

export const DatePickerBox = (props: IDatePickerProps) => {
    const {
        maximumDate,
        minimumDate,
        mode,
        defaultValue: value,
        onChange,
        iconButton,
        showSeconds,
        errorLog,
        label,
        onFocus,
        onClose,
        background,
        textColor,
        isDisabled,
        readOnly,
        display = 'default',
        size = 'default'
    } = props;

    const [show, showModal] = useState(false);

    const openPicker = useCallback(() => {
        showModal(true);
    }, []);

    const closePicker = useCallback(() => {
        showModal(false);
    }, []);

    const handleChange = useCallback(
        (val) => {
            if (mode === enums.inputPickerType.date) {
                const newDate = buildSaveDateTime(val);

                if (onChange && typeof onChange === 'function')
                    onChange(newDate, val);
            } else {
                const newTime = buildDisplayTime(val, showSeconds);

                if (onChange && typeof onChange === 'function')
                    onChange(newTime, val);
            }
        },
        [onChange, mode, showSeconds]
    );

    const isModalVisible = show || onFocus;

    const picker =
        Platform.OS === 'ios' ? (
            <ModalPickerForIos
                onChange={handleChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                display={display}
                mode={mode}
                onClose={onClose}
                closeModal={closePicker}
                value={value}
                label={label}
                background={background}
                textColor={textColor}
            />
        ) : (
            <ModalPicker
                onChange={handleChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                display={display}
                mode={mode}
                onClose={onClose}
                closeModal={closePicker}
                value={value}
                label={label}
            />
        );

    return (
        <DatePickerContainer>
            {mode === enums.inputPickerType.date && (
                <DateContent
                    readOnly={readOnly}
                    displayPicker={isDisabled ? null : openPicker}
                    isDisabled={isDisabled}
                    label={label}
                    size={size}
                    text={value}
                    errorLog={errorLog}
                    iconButton={iconButton}
                />
            )}

            {mode === enums.inputPickerType.time && (
                <TimeContent
                    readOnly={readOnly}
                    showSeconds={showSeconds}
                    displayPicker={isDisabled ? null : openPicker}
                    isDisabled={isDisabled}
                    label={label}
                    size={size}
                    text={value}
                    errorLog={errorLog}
                    iconButton={iconButton}
                />
            )}

            {isModalVisible && picker}
        </DatePickerContainer>
    );
};
