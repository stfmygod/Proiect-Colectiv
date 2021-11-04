import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const styles = {
    errorText: { color: "red" },
    calendar: { color: "#00000070" },
};

const ClickableInput = ({ onClick, ...props }) => (
    <div onClick={onClick} className="mb-3">
        <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control {...props} />
        </Form.Group>
    </div>
);

const AddEvent = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [stopTime, setStopTime] = useState(null);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Add event</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "30px 170px 30px 170px",
                }}
            >
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ClickableInput />}
                />
                <Form.Label>Start hour</Form.Label>
                <TimePicker onChange={setStartTime} value={startTime} className="mb-3 form-control" />

                <Form.Label>End hour</Form.Label>
                <TimePicker onChange={setStopTime} value={stopTime} className="mb-3 form-control" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button onClick={() => props.onAdd(startDate, startTime, stopTime)}>Add event</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEvent;
