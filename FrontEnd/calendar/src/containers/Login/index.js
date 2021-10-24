import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";

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
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            localStorage.setItem("token", "tk-123");
        }

        setValidated(true);
    };

    return (
        <div style={styles.pageWrapper}>
            <Card>
                <Card.Body style={styles.card}>
                    <h2 className="mb-4">Log in</h2>
                    <Form style={styles.card} noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group style={styles.input} className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" />
                            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group style={styles.input} className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button size="lg" variant="primary" type="submit" className="mb-5 mt-3">
                            Submit
                        </Button>
                    </Form>
                    <div style={styles.footer}>
                        <Card.Link href="#">Forgot password?</Card.Link>
                        <Card.Link href="#">Create an account</Card.Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
