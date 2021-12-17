import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import {useSelector} from "react-redux";
import {changeShowAddGroup} from "../../redux/app/actions";
import {useDispatch} from "react-redux";
import requestHelper from "../../requestHelper";
import {useHistory} from "react-router-dom";
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

const AddGroup = () => {
    const [groupName, setGroupName] = useState("");

    const addGroupModal = useSelector(state => state.app.addGroupModal);
    const user = JSON.parse(localStorage.getItem("user"));

    const dispatch = useDispatch();
    const history = useHistory();

    const handleCreateGroup = async () => {
        const group = await requestHelper.post("/groups", {
                name: groupName,
                code: "",
            });
        await requestHelper.patch(`/users/add-group/?userId=${user.id}&groupId=${group.data.id}`);
        const res = await requestHalper.get(`/users/groups/${user.id}`);

        localStorage.setItem("groups", JSON.stringify(res.data));
        localStorage.setItem("selectedGroup", group.data.code);

        setGroupName("");
        dispatch(changeShowAddGroup(false));

        //eslint-disable-next-line
        location.reload();
        history.push("/group");
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={addGroupModal}
            onHide={() => {
                dispatch(changeShowAddGroup(false))
                setGroupName("")
            }}
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={styles.modalBody}>
                <Form.Group className={"mb-3"}>
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                    value={groupName}
                    onChange={(event) => setGroupName(event.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    dispatch(changeShowAddGroup(false))
                    setGroupName("")}}
                >
                    Close</Button>
                <Button onClick={handleCreateGroup}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddGroup;