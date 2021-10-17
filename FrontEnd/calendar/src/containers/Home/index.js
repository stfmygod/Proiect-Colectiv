import React from "react";
import MyButton from "../../components/Button";

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Home = () => {
    return (
        <div style={styles.pageWrapper}>
            <MyButton
                title="Test"
                onClick={() => {
                    console.log("Test clicked!!");
                }}
            />
        </div>
    );
};

export default Home;
