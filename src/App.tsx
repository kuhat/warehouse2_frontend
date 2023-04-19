import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {createTheme, CssBaseline, MenuItem, Select, SelectChangeEvent, ThemeProvider, Typography} from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import Home from "./components/home";
import Login from "./components/Login";
import {GoogleOAuthProvider} from "@react-oauth/google";

const theme = createTheme({
    palette: {
        mode: 'light',
        contrastThreshold: 23,
    },
});

const clientId = "16263074412-jtkvrdvi39anghqsnk55sbe39n344pbo.apps.googleusercontent.com"

function App() {
    const [isLoggedIn, setLoggedIn] = useState<Boolean>(false)

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {isLoggedIn ? <Home /> : <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
