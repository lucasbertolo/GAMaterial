import React from 'react';

import { ThemeProvider } from './theme';

type Props = {
    children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => (
    <ThemeProvider>{children}</ThemeProvider>
);

export default AppProvider;
