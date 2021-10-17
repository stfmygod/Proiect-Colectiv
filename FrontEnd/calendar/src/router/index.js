import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import RouteList from "./routes";
import Home from "../containers/Home";

const AppRouter = () => {
    const getNavbarLinks = () => RouteList.map((elem) => <Nav.Link href={elem.route}>{elem.title}</Nav.Link>);
    const getRoutes = () => RouteList.map((elem) => <Route path={elem.route}>{elem.component}</Route>);

    return (
        <Router>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="home">Calendar</Navbar.Brand>
                        <Nav className="me-auto">{getNavbarLinks()}</Nav>
                    </Container>
                </Navbar>

                <Switch>
                    {getRoutes()}
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
