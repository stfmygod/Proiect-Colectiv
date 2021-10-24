import Home from "../containers/Home";
import LogIn from "../containers/Login";
import Example from "../containers/Example";

export const PrivateRoutes = [
    { route: "/home", component: <Home />, title: "Home", displayInTopBar: true },
    { route: "/example", component: <Example />, title: "Example", displayInTopBar: true },
];

export const PublicRoutes = [{ route: "/login", component: <LogIn />, title: "Log In" }];
