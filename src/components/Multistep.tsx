import React from 'react';

import { Card, Box, Container, CardContent } from '@mui/material';

import { Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

import FormikStepper, { FormikStep } from './FormikStepper';

import { mixed, number, object } from 'yup';
import * as yup from 'yup'

let PersonalDataSchema = yup.object().shape({
    firstName: yup.string().required('This field is requried.'),
    lastName: yup.string().required('This field is required.'),
});

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const Multistep = () => {
    return (
        <Container>
            <Box marginTop={10}>
                <Card>
                    <CardContent>
                        <FormikStepper
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                millionaire: false,
                                money: 0,
                                description: '',
                            }}
                            onSubmit={async (values) => {
                                await sleep(3000);
                                console.log('Values => ', values);
                            }}
                        >

                            <FormikStep label="Personal Data" validationSchema={PersonalDataSchema}>
                                <Box paddingBottom={2}>
                                    <Field fullWidth name="firstName" component={TextField} label="First Name" />
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field fullWidth name="lastName" component={TextField} label="Last Name" />
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field fullWidth name="millionaire" type="checkbox" component={CheckboxWithLabel} Label={{ label: 'I am a millionaire' }} />
                                </Box>
                            </FormikStep>

                            <FormikStep
                                label="Bank Accounts"
                                validationSchema={object({
                                    money: mixed().when('millionaire', {
                                        is: true,
                                        then: number()
                                            .required()
                                            .min(
                                                1_000_000,
                                                'Because you said you are a millionaire, you need to have 1 million'
                                            ),
                                        otherwise: number().required(),
                                    }),
                                })}
                            >
                                <Box paddingBottom={2}>
                                    <Field
                                        fullWidth
                                        name="money"
                                        type="number"
                                        component={TextField}
                                        label="All the money, I have."
                                    />
                                </Box>
                            </FormikStep>

                            <FormikStep
                                label="More Info"
                            >
                                <Box paddingBottom={2}>
                                    <Field fullWidth name="description" component={TextField} label="Description" />
                                </Box>
                            </FormikStep>

                        </FormikStepper>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

export default Multistep
