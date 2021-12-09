import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Container, Nav , NavDropdown} from "react-bootstrap";
import { PrivateRoutes, PublicRoutes } from "./routes";
import Home from "../containers/Home";
import Login from "../containers/Login";
import { clearToken } from "../utils";
import { useHistory } from "react-router-dom";

const AppRouter = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    const history = useHistory();

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
                            <NavDropdown.Item>Create Groups</NavDropdown.Item>
                            </NavDropdown>
                            <Nav
                                onClick={() => {
                                    clearToken();
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
