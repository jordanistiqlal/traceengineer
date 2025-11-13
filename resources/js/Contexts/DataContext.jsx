import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children, initialData }) => {
    const [selectedData, setSelectedData] = useState(initialData || null);
    
    return (
        <DataContext.Provider value={{ selectedData, setSelectedData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};