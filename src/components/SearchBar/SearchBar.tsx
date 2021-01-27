import React, { useRef } from 'react';
import { useTheme } from '../../hooks/theme';
import {
    EraseIcon,
    InputStyleStack,
    RightIconButton,
    SearchContainer,
    SearchIcon,
    SearchIconButton,
    StyledInput
} from './styles';

interface ISearchBar {
    onChange: (arg1: string) => void;
    handleErase?: () => void;
    hasSearchIcon?: boolean;
    hasShadow?: boolean;
    text?: string;
}

interface IDebouncing {
    (): void;
}

interface IInputRef {
    clear(): void;
}

export const SearchBar = ({
    onChange,
    handleErase,
    hasSearchIcon,
    hasShadow = true,
    text = 'Search'
}: ISearchBar) => {
    const { theme } = useTheme();

    const input = useRef<IInputRef>(null);

    let time: undefined | number;

    const debouncing = (func: IDebouncing) => {
        clearTimeout(time);

        time = setTimeout(() => {
            func();
        }, 1000);
    };

    const search = (e: string) => {
        if (onChange && typeof onChange === 'function') {
            debouncing(() => onChange(e));
        }
    };

    const erase = () => {
        if (input.current) {
            const { clear } = input.current;
            clear();
            if (handleErase && typeof handleErase === 'function') handleErase();
        }
    };

    return (
        <SearchContainer theme={theme} hasShadow={!hasShadow}>
            <InputStyleStack>
                <StyledInput
                    theme={theme}
                    onChangeText={search}
                    placeholder={text}
                    returnKeyType="search"
                    ref={input}
                />

                <RightIconButton>
                    <EraseIcon name="close" onPress={erase} theme={theme} />
                </RightIconButton>

                {hasSearchIcon && (
                    <SearchIconButton>
                        <SearchIcon name="search" theme={theme} />
                    </SearchIconButton>
                )}
            </InputStyleStack>
        </SearchContainer>
    );
};
