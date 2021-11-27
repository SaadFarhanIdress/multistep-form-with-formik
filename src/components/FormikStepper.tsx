import React, { useState } from 'react';

import { Form, Formik, FormikConfig, FormikValues } from 'formik'

import { Stepper, Step, StepLabel, Grid, Button, CircularProgress } from '@mui/material';

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string;
}

export const FormikStep = ({ children }: FormikStepProps) => {
    return <>{children}</>;
}

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {

    const [step, setStep] = useState(0);
    const [completed, isCompleted] = useState(false);

    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const currentChild = childrenArray[step];

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                    isCompleted(true);
                } else {
                    setStep((s) => s + 1);
                    helpers.setTouched({});
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form autoComplete="off">

                    <Stepper alternativeLabel activeStep={step} style={{ marginBottom: 20 }}>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.label} completed={step > index || completed}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}

                    <Grid container spacing={2}>

                        {step > 0 ? (
                            <Grid item>
                                <Button
                                    disabled={isSubmitting}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setStep((s) => s - 1)}
                                >
                                    GO BACK
                                </Button>
                            </Grid>
                        ) : null}

                        <Grid item>
                            <Button
                                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                            </Button>
                        </Grid>

                    </Grid>

                </Form>
            )}
        </Formik>
    )

}

export default FormikStepper;