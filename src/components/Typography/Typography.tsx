import React from 'react';
import { BaseText } from './styles';
import { useTheme } from '../../hooks/theme';

interface TypographyData {
    children: string;
    variant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'overline';
    color?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    fontStyle?: 'regular' | 'thin' | 'light' | 'medium' | 'bold';
    fontSize?: number;
    oneLine?: boolean;
}

export const Typography = ({
    children,
    variant = 'body1',
    color = 'primary',
    textAlign = 'left',
    fontStyle = 'regular',
    fontSize = 0,
    oneLine = false
}: TypographyData) => {
    const { theme } = useTheme();

    return (
        <BaseText
            theme={theme}
            variant={variant}
            color={color}
            textAlign={textAlign}
            numberOfLines={oneLine ? 1 : null}
            ellipsizeMode={oneLine ? 'tail' : null}
            fontStyle={fontStyle}
            fontSize={fontSize}
        >
            {children}
        </BaseText>
    );
};
