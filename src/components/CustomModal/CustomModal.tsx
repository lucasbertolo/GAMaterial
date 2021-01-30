import React from 'react';
import { Modal, Platform, View } from 'react-native';
import { useTheme } from '../../hooks/theme';
import { StyledStatusBar } from '../StyledStatusBar/StyledStatusBar';
import { ModalHeader } from './Header/ModalHeader';
import { ChildrenContainer, ModalContainer } from './styles';

interface IModalProps {
    children: string;
    visible?: boolean;
    onClose?: () => void;
    title?: string;
    actions?: Array<object>;
    background?: string;
    textColor?: string;
}

export function CustomModal({
    children,
    visible,
    onClose,
    title,
    actions,
    textColor,
    background = 'primary'
}: IModalProps) {
    const { theme } = useTheme();

    const handleAction = (action: () => void) => {
        if (action && typeof action === 'function') action();
    };

    const handleClose = () => {
        if (onClose) onClose();
    };

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={handleClose}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor:
                        theme.key === 'dark' ? 'black' : 'rgba(0, 0, 0, 0.47)'
                }}
            >
                {Platform.OS === 'ios' && (
                    <StyledStatusBar
                        background={
                            theme[background] || background || theme.primary
                        }
                    />
                )}

                <ModalHeader
                    leftAction={onClose}
                    handleAction={handleAction}
                    title={title}
                    actions={actions}
                    background={background}
                    textColor={textColor}
                />
                <ModalContainer theme={theme}>
                    <ChildrenContainer>{children}</ChildrenContainer>
                </ModalContainer>
            </View>
        </Modal>
    );
}
