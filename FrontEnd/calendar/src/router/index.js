import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Container, Nav , NavDropdown} from "react-bootstrap";
import { PrivateRoutes, PublicRoutes } from "./routes";
import Home from "../containers/Home";
import Login from "../containers/Login";
import { clearToken } from "../utils";
import {changeShowAddGroup, changeShowJoinGroup} from "../redux/app/actions";
import {useDispatch, useSelector} from "react-redux";
import {cleanGroup} from "../redux/groups/actions";

const AppRouter = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const groups = useSelector(state => state.group.list);
    const dispatch = useDispatch();

    const getNavbarLinks = () =>
        PrivateRoutes.map((elem) => {
            return elem.displayInTopBar && <Nav.Link href={elem.route}>{elem.title}</Nav.Link>;
        });
    const getPrivateRoutes = () => PrivateRoutes.map((elem) => <Route path={elem.route}>{elem.component}</Route>);
    const getPublicRoutes = () => PublicRoutes.map((elem) => <Route path={elem.route}>{elem.component}</Route>);

    const getGroups = () => groups.map((elem) => <NavDropdown.Item  href="/group" onClick={() => {
        localStorage.setItem("selectedGroup", elem.code)
        }}>{elem.name}</NavDropdown.Item>)

    return (
        <Router>
            {user ? (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="home">Calendar</Navbar.Brand>
                            <Nav className="me-auto">{getNavbarLinks()}</Nav>

                            <NavDropdown title="Groups" id="basic-nav-dropdown">
                                {getGroups()}
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    onClick={() => {dispatch(changeShowAddGroup(true))}}
                                >
                                    Create Group
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {dispatch(changeShowJoinGroup(true))}}
                                >
                                    Join Group
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav
                                onClick={() => {
                                    clearToken();
                                    dispatch(cleanGroup());
                                }}
                            >
                                <Nav.Link href="/">Log out</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>

                    <Switch>
                        {getPrivateRoutes()}
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            ) : (
                <Switch>
                    {getPublicRoutes()}
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            )}
        </Router>
    );
};

export default AppRouter;
