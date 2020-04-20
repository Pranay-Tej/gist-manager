import React from "react";
import styles from "./navbar.module.css";
import Emitter from "../../services/emitter";



function Navbar() {

    const openSidebar = () => {
        Emitter.emit("openSidebar")
    }


    return (
        <div className={styles['navbar']}>
            <div className={styles['navbar-section']}>
                <button className={`${styles['navbar-item']} ${styles['open-sidebar']}` } id={"openSidebar"} onClick={() => openSidebar()}>
                    {/* <i className="fab fa-gitlab fa-lg"></i> */}
                    M
                </button>
                <button className={styles['navbar-item']}>
                    {/* <i className="fab fa-gitlab fa-lg"></i> */}
                    H
                </button>
            </div>
            <div className={styles['navbar-section']}>
                <button className={styles['navbar-item']}>
                    {/* <i className="fab fa-gitlab fa-lg"></i> */}
                    U
                </button>
                <button className={styles['navbar-item']}>
                    {/* <i className="fab fa-gitlab fa-lg"></i> */}
                    G
                </button>
            </div>
        </div>
    );
}

export default Navbar;
