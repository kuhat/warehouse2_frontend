import React ,{useState}from 'react';
// import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useGoogleLogin } from '@react-oauth/google';

function Login(props : any){
    console.log(props.login)
    const isLogged = props.isLoggedIn
    const setLoggedIn = props.setLoggedIn
    const login: any = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            setLoggedIn(!isLogged)
        },
    });
    return(<>
            <Box sx={{
                width: '80%',
                display: 'flex',
                height: '95vh',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant="h1" >
                    warehouse 2
                </Typography>
                <Button variant="contained" onClick={login} >
                    Sign in with google
                </Button>
            </Box>
        </>
    );

}
export default Login;