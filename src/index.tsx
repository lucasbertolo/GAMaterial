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
