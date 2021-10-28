import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const styles = {
    pageWrapper: {
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "30%",
        minWidth: "400px",
    },
    card: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "0px 20px 0px 20px",
    },
};

const Login = () => {
    const schema = yup.object().shape({
        email: yup.string().required("Email is required").email("Not a valid email"),
        pass: yup.string().required("Password is required"),
    });

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <div style={styles.pageWrapper}>
            <Card>
                <Card.Body style={styles.card}>
                    <h2 className="mb-4">Log in</h2>
                    <Formik
                        validationSchema={schema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={handleSubmit}
                        initialValues={{
                            email: "",
                            pass: "",
                        }}
                    >
                        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
                            <Form style={styles.card} noValidate onSubmit={handleSubmit}>
                                <Form.Group style={styles.input} className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                        name="email"
                                        type="email"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group style={styles.input} className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={values.pass}
                                        onChange={handleChange}
                                        isValid={touched.pass && !errors.pass}
                                        isInvalid={!!errors.pass}
                                        name="pass"
                                        type="password"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.pass}</Form.Control.Feedback>
                                </Form.Group>
                                <Button size="lg" variant="primary" type="submit" className="mb-5 mt-3">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <div style={styles.footer}>
                        <Card.Link href="#">Forgot password?</Card.Link>
                        <Card.Link href="/register">Create an account</Card.Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
