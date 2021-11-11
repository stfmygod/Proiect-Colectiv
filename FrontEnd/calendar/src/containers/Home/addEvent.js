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
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const clearData = () => {
        setStartTime(null)
        setStopTime(null)
        setDescription(null)
        setStartDate(new Date())
        setTitle(null)
    }

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
                    padding: "30px 120px 30px 120px",
                }}
            >
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control  value={title} onChange={(event) => setTitle(event.target.value)} className="mb-3"/>
                </Form.Group>

                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ClickableInput />}
                />
                <Form.Label>Start hour</Form.Label>
                <TimePicker onChange={setStartTime} value={startTime} className="mb-3 form-control" format="HH:mm"/>

                <Form.Label>End hour</Form.Label>
                <TimePicker onChange={setStopTime} value={stopTime} className="mb-3 form-control" format="HH:mm"/>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control  as="textarea" value={description} onChange={(event) => setDescription(event.target.value)} className="mb-3"/>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {props.onHide(); clearData()}}>
                    Close
                </Button>
                <Button onClick={() => props.onAdd({title, description, startDate, startTime, stopTime})}>Add event</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEvent;
