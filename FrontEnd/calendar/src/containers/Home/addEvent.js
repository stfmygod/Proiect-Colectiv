import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const styles = {
    errorText: { color: "red" },
    calendar: { color: "#00000070" },
    modalBody: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "30px 120px 30px 120px",
    },
    deleteButton:{
        position: "absolute",
        left: 10,
        
    }
};

const ClickableInput = ({ onClick, ...props }) => (
    <div onClick={onClick} className="mb-3">
        <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control {...props} />
        </Form.Group>
    </div>
);

const AddEvent = ({isEditing, selectedEvent, onAdd, onDelete, onHide, show}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [stopTime, setStopTime] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [showValidation, setShowValidation] = useState(false);

    useEffect( () => {
        if (isEditing) {
            setStartTime(selectedEvent.startHour);
            setStopTime(selectedEvent.endHour);
            setDescription(selectedEvent.description);
            setStartDate(new Date(selectedEvent.date));
            setTitle(selectedEvent.name);
        }
        //console.log(selectedEvent)
    }, [isEditing]) 

    const clearData = () => {
        setStartTime(null);
        setStopTime(null);
        setDescription(null);
        setStartDate(new Date());
        setTitle(null);
    };

    const handleSubmit = () => {
        if (!title || !description || !startDate || !startTime || !stopTime) {
            setShowValidation(true);
            return;
        }

        setShowValidation(false);
        onAdd({ title, description, startDate, startTime, stopTime });
        clearData();
    };

    const getModalTitle = () => {
        if(isEditing) {
            return "Update event"
        }
        return "Add event"

    }

    const getSaveButtonText = () => {
        if(isEditing) {
            return "Save"
        }
        return "Add"
    }

    const handleDelete = () => {
        onDelete(selectedEvent.id)
        clearData()
    }
    return (
        <Modal show={show} onHide={() => {setShowValidation(false); onHide()}} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter"> {getModalTitle()} </Modal.Title>
            </Modal.Header>
            <Modal.Body style={styles.modalBody}>
                <Form.Group className={"mb-3"}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        isInvalid={showValidation && !title}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
                </Form.Group>

                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ClickableInput />}
                />

                <Form.Group className={(!showValidation || startTime) && "mb-3"}>
                    <Form.Label>Start hour</Form.Label>
                    <TimePicker
                        onChange={setStartTime}
                        value={startTime}
                        className={`form-control ${showValidation && !startTime ? "is-invalid" : null}`}
                        format="HH:mm"
                    />
                    <p
                        className="invalid-feedback"
                        style={{ display: showValidation && !startTime ? "block" : "none" }}
                    >
                        Start hour is required
                    </p>
                </Form.Group>

                <Form.Group className={(!showValidation || stopTime) && "mb-3"}>
                    <Form.Label>End hour</Form.Label>
                    <TimePicker
                        onChange={setStopTime}
                        value={stopTime}
                        className={`form-control ${showValidation && !stopTime ? "is-invalid" : null}`}
                        format="HH:mm"
                    />
                    <p className="invalid-feedback" style={{ display: showValidation && !stopTime ? "block" : "none" }}>
                        End hour is required
                    </p>
                </Form.Group>

                <Form.Group className={(!showValidation || description) && "mb-3"}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        isInvalid={showValidation && !description}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        onHide();
                        clearData();
                        setShowValidation(false);
                    }}
                >
                    Close
                </Button>
                <Button onClick={handleSubmit}> {getSaveButtonText()} </Button>
                {isEditing && <Button onClick={handleDelete} variant="danger" style={styles.deleteButton}> Delete </Button> }
            </Modal.Footer>
        </Modal>
    );
};

export default AddEvent;
