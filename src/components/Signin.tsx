import { Container, CssBaseline, Box, Grid, TextField, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import React from 'react';
import * as yup from 'yup';

let SignupSchema = yup.object().shape({
    firstName: yup.string().required('This field is requried'),
    lastName: yup.string().required('This field is required'),
    email: yup.string().email().required('This field is required.'),
    password: yup.string().min(6, "Password is too short").max(20, "Password is too long.").required('This field is required')
});


const Signin = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" style={{margin: 20}}>
                    Sign in
                </Typography>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: ""
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ errors, handleChange, touched }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.firstName && touched.firstName ? true : false}
                                        autoComplete="off"
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        helperText={
                                            errors.firstName && touched.firstName
                                                ? errors.firstName
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.lastName && touched.lastName ? true : false}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="off"
                                        helperText={
                                            errors.lastName && touched.lastName
                                                ? errors.lastName
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={errors.email && touched.email ? true : false}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="off"
                                        helperText={
                                            errors.email && touched.email ? errors.email : null
                                        }
                                    />
                                </Grid>
                            <Grid item xs={12}>
                                    <TextField
                                        error={errors.password && touched.password ? true : false}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        id="password"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        helperText={
                                            errors.password && touched.password
                                                ? errors.password
                                                : null
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Form>
                    )}

                </Formik>
            </Box>
        </Container>
    )
}

export default Signin
