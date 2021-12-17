import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import {useSelector} from "react-redux";
import {changeShowJoinGroup} from "../../redux/app/actions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const styles = {
    errorText: { color: "red" },
    calendar: { color: "#00000070" },
    modalBody: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "30px 120px 30px 120px",
    },
};

const JoinGroup = () => {
    const [groupCode, setGroupCode] = useState("");

    const joinGroupModal = useSelector(state => state.app.joinGroupModal);

    const dispatch = useDispatch();

    const handleJoinGroup = () => {
        console.log("Join Group!");

        setGroupCode("");
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={joinGroupModal}
            onHide={() => {
                dispatch(changeShowJoinGroup(false))
                setGroupCode("");
            }}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Join Group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={styles.modalBody}>
                <Form.Group className={"mb-3"}>
                    <Form.Label>Enter group code</Form.Label>
                    <Form.Control
                    value={groupCode}
                    onChange={(event) => {
                        setGroupCode(event.target.value)
                    }}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        dispatch(changeShowJoinGroup(false))
                        setGroupCode("");}}
                >
                    Close</Button>
                <Button onClick={handleJoinGroup}>Join</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default JoinGroup;