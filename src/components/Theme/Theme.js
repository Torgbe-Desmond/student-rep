import { backdropClasses, createTheme } from "@mui/material";

export const AppLightTheme = createTheme({
    palette:{
        background:{
            default:"rgb(243,252,255)",
            paper:'rgb(255,255,255)'
        },
        color:'#000'
    }
})


export const AppDarkTheme = createTheme({
    palette:{
        mode:'dark',
        background:{
            default:"rgb(33,37,39)",
            paper:'rgb(41,44,49)'
        },
        color:'#FFF'
    }
})