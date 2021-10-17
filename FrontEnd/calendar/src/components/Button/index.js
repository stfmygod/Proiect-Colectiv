import React from "react";
import { Button } from "react-bootstrap";

const MyButton = (props) => {
    return (
        <Button variant="primary" onClick={props.onClick}>
            {props.title}
        </Button>
    );
};

export default MyButton;
