import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import {useSelector} from "react-redux";
import {changeShowAddGroup, changeShowJoinGroup} from "../../redux/app/actions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import requestHelper from "../../requestHelper";
import requestHalper from "../../requestHelper";

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
    const user = JSON.parse(localStorage.getItem("user"));

    const dispatch = useDispatch();
    const history = useHistory();

    const handleJoinGroup = async () => {
        await requestHelper.patch(`/users/add-group/?userId=${user.id}&groupId=-1&code=${groupCode}`);

        const res = await requestHalper.get(`/users/groups/${user.id}`);

        localStorage.setItem("groups", JSON.stringify(res.data));
        localStorage.setItem("selectedGroup", groupCode);

        setGroupCode("");
        dispatch(changeShowJoinGroup(false));

        //eslint-disable-next-line
        location.reload();
        history.push("/group");
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