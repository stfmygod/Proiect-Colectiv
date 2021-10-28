import React from "react";
import { Form, Card, Button, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

const styles = {
    pageWrapper: {
        height: "100vh",
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
        width: 600,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    row: {
        width: "30%",
        minWidth: "425px",
    },
};

const Register = () => {
    const history = useHistory();

    const schema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        username: yup
            .string()
            .required("Username is required")
            .matches(/^\s*\S+\s*$/, "Username must not have whitespace")
            .matches(/^[a-zA-Z0-9!@#$%^&*]{1,20}$/, "Username must not be longer than 20 characters"),
        email: yup.string().required("Email is required").email("Not a valid email"),
        pass: yup
            .string()
            .required("Password is required")
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/,
                "Password must be between 8 and 30 characters and have at least one uppercase letter, one number and one special character"
            ),
        confirmPass: yup
            .string()
            .required("Password confirmation is required")
            .test("passwords-match", "Passwords must match", function (value) {
                return this.parent.pass === value;
            }),
    });

    const handleSubmit = (values) => {
        localStorage.setItem("user", true);
        history.push("/home");
        document.location.reload();
    };

    return (
        <div style={styles.pageWrapper}>
            <Card>
                <Card.Body style={styles.card}>
                    <h2 className="mb-4">Register</h2>
                    <Formik
                        validationSchema={schema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={handleSubmit}
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            username: "",
                            email: "",
                            pass: "",
                            confirmPass: "",
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

                                <Form.Group style={styles.input} className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        isValid={touched.username && !errors.username}
                                        isInvalid={!!errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                                </Form.Group>

                                <Row className="mb-3" style={styles.row}>
                                    <Form.Group as={Col} md="6" controlId="formFisrtName">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            isValid={touched.firstName && !errors.firstName}
                                            isInvalid={!!errors.firstName}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="formLastName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            isValid={touched.lastName && !errors.lastName}
                                            isInvalid={!!errors.lastName}
                                        />

                                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Form.Group style={styles.input} className="mb-3" controlId="formPassword1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="pass"
                                        value={values.pass}
                                        onChange={handleChange}
                                        isValid={touched.pass && !errors.pass}
                                        isInvalid={!!errors.pass}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.pass}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style={styles.input} className="mb-3">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPass"
                                        value={values.confirmPass}
                                        onChange={handleChange}
                                        isValid={touched.confirmPass && !errors.confirmPass}
                                        isInvalid={!!errors.confirmPass}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPass}</Form.Control.Feedback>
                                </Form.Group>
                                <Button size="lg" variant="primary" type="submit" className="mb-5 mt-3">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Card.Link href="/login">I already have an account.</Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;
