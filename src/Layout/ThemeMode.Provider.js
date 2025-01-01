import { createContext } from "react";



export const ThemeContext = createContext(null);

 
export const ThemeContextProvider =({children})=>{
    return <ThemeContext.Provider value={{}}></ThemeContext.Provider>
}