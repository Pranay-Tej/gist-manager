import React from "react";
import styles from "./navbar.module.css";
import Emitter from "../../services/emitter";
import userService from "../../services/userService";

function Navbar() {
    const openSidebar = () => {
        Emitter.emit("openSidebar");
    };

    const viewAllSnippets = () => {
        Emitter.emit("viewAll");
    };

    const setUsername = () => {
        userService.setUsername();
    };

    return (
        <div className={styles["navbar"]}>
            <div className={styles["navbar-section"]}>
                <button
                    className={`${styles["navbar-item"]} ${styles["open-sidebar"]}`}
                    id={"openSidebar"}
                    onClick={() => openSidebar()}
                >
                    {/* <i className="fab fa-gitlab fa-lg"></i> */}
                    <ion-icon name="menu"></ion-icon>
                </button>
                <button
                    className={styles["navbar-item"]}
                    onClick={() => viewAllSnippets()}
                >
                    <ion-icon name="home"></ion-icon>
                </button>
            </div>
            <div className={styles["navbar-section"]}>
                <button
                    className={styles["navbar-item"]}
                    onClick={() => setUsername()}
                >
                    {/* <i className="fab fa-gitlab fa-lg"></i> */}
                    <ion-icon name="person"></ion-icon>
                </button>
                <button
                    className={styles["navbar-item"]}
                    onClick={() =>
                        window.open(
                            "https://gitlab.com/pranay_teja/gist-manager",
                            "_blank"
                        )
                    }
                >
                    {/* <i className="fab fa-gitlab fa-lg"></i> */}
                    <ion-icon name="logo-github"></ion-icon>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
