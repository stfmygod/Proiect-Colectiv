import Home from "../containers/Home";
import LogIn from "../containers/Login";
import Register from "../containers/Register";
import Group from "../containers/Group";

export const PrivateRoutes = [
  { route: "/home", component: <Home />, title: "Home", displayInTopBar: true },
  { route: "/group", component: <Group />, title: "Group", displayInTopBar: false },
];

export const PublicRoutes = [
  { route: "/login", component: <LogIn />, title: "Log In" },
  { route: "/register", component: <Register />, title: "Register" },
];
