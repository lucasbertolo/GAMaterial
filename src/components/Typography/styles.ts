import styled from 'styled-components/native';

export const BaseText = styled.Text`
    font-family: ${(props) => {
        if (props.fontStyle === 'regular') return 'Roboto-Regular';
        if (props.fontStyle === 'thin') return 'Roboto-Light';
        if (props.fontStyle === 'light') return 'Roboto-Thin';
        if (props.fontStyle === 'medium') return 'Roboto-Medium';
        if (props.fontStyle === 'bold') return 'Roboto-Bold';
        return 'Roboto-Regular';
    }};

    font-size: ${(props) => {
        if (props.fontSize !== 0) return props.fontSize;
        if (props.variant === 'h1') return 96;
        if (props.variant === 'h2') return 60;
        if (props.variant === 'h3') return 48;
        if (props.variant === 'h4') return 34;
        if (props.variant === 'h5') return 24;
        if (props.variant === 'h6') return 20;
        if (props.variant === 'subtitle1') return 16;
        if (props.variant === 'subtitle2') return 14;
        if (props.variant === 'body1') return 16;
        if (props.variant === 'body2') return 14;
        if (props.variant === 'caption') return 12;
        if (props.variant === 'overline') return 10;
        return 16;
    }};

    letter-spacing: ${(props) => {
        if (props.variant === 'h1') return -1.5;
        if (props.variant === 'h2') return -0.5;
        if (props.variant === 'h3') return 0;
        if (props.variant === 'h4') return 0.25;
        if (props.variant === 'h5') return 0;
        if (props.variant === 'h6') return 0.15;
        if (props.variant === 'subtitle1') return 0.15;
        if (props.variant === 'subtitle2') return 0.1;
        if (props.variant === 'body1') return 0.5;
        if (props.variant === 'body2') return 0.25;
        if (props.variant === 'caption') return 0.4;
        if (props.variant === 'overline') return 1.5;
        return 0.5;
    }};

    text-transform: ${(props) => {
        if (props.variant === 'h1') return 'none';
        if (props.variant === 'h2') return 'none';
        if (props.variant === 'h3') return 'none';
        if (props.variant === 'h4') return 'none';
        if (props.variant === 'h5') return 'none';
        if (props.variant === 'h6') return 'none';
        if (props.variant === 'subtitle1') return 'none';
        if (props.variant === 'subtitle2') return 'none';
        if (props.variant === 'body1') return 'none';
        if (props.variant === 'body2') return 'none';
        if (props.variant === 'caption') return 'none';
        if (props.variant === 'overline') return 'uppercase';
        return 'none';
    }};

    color: ${(props) => props.theme[props.color] || props.color};
    text-align: ${(props) => {
        if (props.textAlign) return props.textAlign;
        return 'left';
    }};
`;
