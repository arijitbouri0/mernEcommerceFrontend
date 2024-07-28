import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch} from 'react-redux';
import {login} from '../../Redux/Auth/Action'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 400 ,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

const Login = ({ handleClose, open, handleRegisterOpen }) => {
    const dispatch=useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password")
        };
        dispatch(login(userData)).then(() => {
            window.location.reload();
          });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                autoComplete="email"
                                variant="outlined"
                                defaultValue="demo@gmail.com"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                autoComplete="current-password"
                                variant="outlined"
                                 defaultValue="12345678"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Don't have an account?{' '}
                                <Button onClick={handleRegisterOpen}>Register Here</Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default Login;
