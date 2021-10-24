import React from "react";
import { useSelector } from "react-redux";

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Home = () => {
    const user = useSelector((state) => state.user);
    console.log(user);
    return (
        <div style={styles.pageWrapper}>
            <h1>Home</h1>
        </div>
    );
};

export default Home;
