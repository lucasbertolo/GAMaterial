/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import AppProvider from './hooks';

const App = () => (
    <AppProvider>
        <SearchBar
            onChange={(value) => console.log('value', value)}
            hasSearchIcon
        />
    </AppProvider>
);

export default App;
