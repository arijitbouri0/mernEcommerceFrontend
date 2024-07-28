import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../Redux/Auth/Action';
import { useEffect } from 'react';

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

const Register = ({ handleClose, open }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            email: data.get('email'),
            password: data.get('password'),
        };

        dispatch(register(userData)).then(()=>{
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
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="firstname"
                                name="firstname"
                                label="First Name"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="lastname"
                                name="lastname"
                                label="Last Name"
                                fullWidth
                                autoComplete="family-name"
                                variant="outlined"
                            />
                        </Grid>
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
                                autoComplete="new-password"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default Register;
