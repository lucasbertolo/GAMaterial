import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CustomModal } from '~/components/BaseComponents/CustomModal/CustomModal';
import { BaseInput } from '~/components/BaseComponents/FormComponents/Inputs/BaseInput/BaseInput';
import { SearchBar } from '~/components/BaseComponents/FormComponents/SearchBar/SearchBar';
import { RowContent } from '~/components/BaseComponents/Lists/RowContent/RowContent';
import { Padding } from '~/components/BaseComponents/Padding/Padding';
import { useCulture } from '~/hooks/culture';
import { useTheme } from '~/hooks/theme';
import { MultiSelectOptions } from './MultiSelectOptions';
import { ContainerLookup } from './styles';

/**
 *  Cria um input que, ao ser clicado, abre uma tela personalizada para escolha de uma opção dentro de um array.
 *  Possui uma searchbar interna para busca por palavras chaves.
 * @param {array}  options    Opções do select. Deve ser um array de objetos com id e valor.
 * @param {object} value    Valor do input.
 * @param {string} size    Tamanho do input. Opções: `small`, `default`, `large`.
 * @param {string} variant Estilo do input. Opções: `underlined`, `outlined`, `contained`.
 * @param {string} label   Label do input.
 * @param {string} placeholder  Texto exibido quando o valor está em branco dentro do input.
 * @param {function} onChange   Recebe o valor(objeto) do input ao ser selecionado.
 * @param {bool} multiSelect   Permite selecionar mais de uma opção.
 */
export function LookupComponent({
    options,
    value,
    size,
    variant,
    placeholder,
    label,
    disabled,
    onChange,
    errorLog,
    multiSelect,
    icon,
    helperText,
    onFocus,
    onClose,
    background,
    textColor,
    allowAutoDefault,
    allowPreferences,
    fieldPreference,
    multiLine,
    onClear,
    infoIcon,
    disabledSelectAll
}) {
    const { theme } = useTheme();
    const { l } = useCulture();

    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedList, setSelectedList] = useState(value);

    // #region [MULTISELECT]
    const handleMultiSelect = useCallback(
        (val) => {
            try {
                const newList = selectedList.slice(0);
                const existEntry = newList.includes(val);

                if (!existEntry) {
                    newList.push(val);
                } else {
                    const index = newList.indexOf(val);
                    newList.splice(index, 1);
                }
                setSelectedList(newList);
            } catch (error) {
                setSelectedList([]);
            }
        },
        [selectedList]
    );

    const selectAll = () => setSelectedList(options);

    const removeAll = () => setSelectedList([]);

    const hasEntry = (arr, item) => {
        try {
            if (multiSelect) {
                const obj = arr.find((o) => o.Id === item.Id);
                return !!obj;
            }
            return false;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        if (multiSelect) {
            setSelectedList(value);
        }
    }, [value]);

    // #endregion

    // #region [SEARCH_BAR]
    const handleSearch = (e) => {
        setSearch(e);
    };

    const clearSearch = () => setSearch('');

    const filteredOptions =
        options &&
        options.length > 0 &&
        options
            .sort((a, b) =>
                a.Value?.toString()
                    .toLowerCase()
                    .localeCompare(b.Value?.toString().toLowerCase())
            )
            .filter((opt) => {
                let newValue = opt.Value || '';

                if (opt.Label) {
                    newValue += `- ${opt.Label}`;
                }

                return newValue
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
    // #endregion

    // #region [HANDLERS]
    const handleOpen = () => {
        if (!disabled) {
            setModalVisible(true);
        }
    };

    const handleClose = useCallback(() => {
        clearSearch();
        setSelectedList(value);

        if (onClose && typeof onClose === 'function') onClose();
        setModalVisible(false);
    }, [value]);

    // #endregion

    // #region [PREFERENCES]

    const setPreferencesValues = (preferences) => {
        try {
            const hasValue = value ? value.Id : null;
            if (!hasValue && preferences) {
                const getValue = options.find(
                    (s) => s.Id === preferences[fieldPreference]
                );
                const defaultValue = multiSelect ? [getValue] : getValue;
                if (getValue && onChange && typeof onChange === 'function') {
                    onChange(defaultValue);
                    if (multiSelect) setSelectedList(defaultValue);
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('errorPreference', error);
        }
    };

    const loadPreferences = async () => {
        const userId = await AsyncStorage.getItem('UserId');
        if (userId) {
            const preferences = await userProfileController.getByUserId(userId);
            setPreferencesValues(preferences.Data);
        }
    };

    // #endregion

    // #region [HANDLE_VALUE]
    const handleSelect = (val) => {
        clearSearch();
        setModalVisible(false);
        if (onChange && typeof onChange === 'function') onChange(val);
    };

    const defineDefault = () => {
        if (value && value.Id) return;

        const defaultVal = multiSelect ? options : options[0];
        if (typeof onChange === 'function') onChange(defaultVal, true);
        if (multiSelect) setSelectedList(options);
    };

    const defineValue = (item) => {
        if (Number(item)) {
            const getByIndex = options.find((x) => x.Id === item);
            if (getByIndex) {
                return getByIndex.Value;
            }
            return '';
        }
        if (multiSelect && item.length > 0) {
            const newValue = item.map((x) => x.Value);
            return newValue.length > 0 ? newValue.join(', ') : '';
        }

        return `${item.Value || ''}${item.Label ? ` - ${item.Label}` : ''}`;
    };

    useEffect(() => {
        if (allowAutoDefault && options.length === 1) {
            defineDefault();
        } else if (allowPreferences && options.length > 1) {
            loadPreferences();
        }
    }, [options.length]);
    // #endregion

    // #region [ICON_ROWS]
    const rowContent = {
        icon: 'angle-right',
        text: '',
        action: null
    };

    const rowMultiSelect = (isSelected) => ({
        icon: isSelected ? 'check' : 'circle-o',
        text: '',
        action: null
    });
    // #endregion

    // #region [CLEAR]
    const clearIcon =
        onClear !== null && typeof onClear === 'function'
            ? {
                  name: 'trash',
                  action: onClear,
                  color: 'primary'
              }
            : null;
    // #endregion

    return (
        <>
            <TouchableOpacity onPress={handleOpen}>
                <BaseInput
                    pointerEvents="none"
                    readOnly={disabled}
                    value={defineValue(value)}
                    size={size}
                    errorLog={errorLog}
                    variant={variant}
                    placeholder={placeholder}
                    placeholderTextColor={
                        disabled ? theme.onDisabled : theme.placeholder
                    }
                    label={label}
                    leftIcon={!disabled ? icon : null}
                    rightIcon={!disabled ? clearIcon : null}
                    infoIcon={infoIcon}
                    editable={false}
                    helperText={helperText}
                />
            </TouchableOpacity>

            <CustomModal
                visible={modalVisible || onFocus}
                title={placeholder || label}
                onClose={handleClose}
                actions={
                    multiSelect
                        ? [
                              {
                                  title: l('apply'),
                                  onPress: () => handleSelect(selectedList)
                              }
                          ]
                        : []
                }
                background={background}
                textColor={textColor}
            >
                <ContainerLookup>
                    {multiSelect && (
                        <MultiSelectOptions
                            theme={theme}
                            selectAll={selectAll}
                            removeAll={removeAll}
                            numSelected={selectedList.length}
                            disabledSelectAll={disabledSelectAll}
                        />
                    )}
                    <Padding valueX={20}>
                        <SearchBar
                            hideArrow
                            handleSearch={handleSearch}
                            handleErase={clearSearch}
                        />
                    </Padding>

                    {filteredOptions && filteredOptions.length > 0 && (
                        <FlatList
                            data={filteredOptions}
                            initialNumToRender={5}
                            keyExtractor={
                                (item, index) =>
                                    `${item.Id}-${item.Value}-${index}`
                                // eslint-disable-next-line react/jsx-curly-newline
                            }
                            renderItem={({ item }) => {
                                const isSelected = hasEntry(selectedList, item);

                                return (
                                    <RowContent
                                        handleAction={
                                            multiSelect
                                                ? handleMultiSelect
                                                : handleSelect
                                        }
                                        item={item}
                                        text={`${item.Value} ${
                                            item.Label ? `- ${item.Label}` : ''
                                        }`}
                                        backgroundColor={
                                            isSelected
                                                ? theme.surfaceSecondary
                                                : 'transparent'
                                        }
                                        afterContainer={
                                            multiSelect
                                                ? rowMultiSelect(isSelected)
                                                : rowContent
                                        }
                                        key={`${item.Id}-${item.Value}`}
                                        multiLine={multiLine}
                                    />
                                );
                            }}
                        />
                    )}
                </ContainerLookup>
            </CustomModal>
        </>
    );
}

export const Lookup = React.memo(LookupComponent);

LookupComponent.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.number])
        .isRequired,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.number
    ]),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    variant: PropTypes.oneOf(['underlined', 'outlined', 'contained']),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errorLog: PropTypes.string,
    disabled: PropTypes.bool,
    multiSelect: PropTypes.bool,
    icon: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.strsing, PropTypes.func])
    ),
    helperText: PropTypes.string,
    onFocus: PropTypes.bool,
    onClose: PropTypes.func,
    onClear: PropTypes.func,
    background: PropTypes.string,
    textColor: PropTypes.string,
    allowAutoDefault: PropTypes.bool,
    allowPreferences: PropTypes.bool,
    fieldPreference: PropTypes.string,
    multiLine: PropTypes.bool,
    disabledSelectAll: PropTypes.bool
};

LookupComponent.defaultProps = {
    value: { id: 0, value: '' },
    variant: 'contained',
    size: 'default',
    label: '',
    placeholder: '',
    errorLog: '',
    disabled: false,
    multiSelect: false,
    icon: null,
    helperText: '',
    onFocus: false,
    onClose: null,
    onClear: null,
    background: 'primary',
    textColor: 'onPrimary',
    allowAutoDefault: true,
    allowPreferences: false,
    fieldPreference: '',
    multiLine: false,
    disabledSelectAll: false
};
