import {createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState('light');

    const toggle = () =>
        setTheme(t => {
            t === "light" ? "dark" : "light"
        });

    const value = {theme, toggle};

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) throw new Error("useTheme must be used within a ThemeProvider");
    return useContext(ThemeContext);
}