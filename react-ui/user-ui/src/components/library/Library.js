import React, { useEffect } from "react";
import Code from "./code/Code";

import styles from "./library.module.css";
import Sidebar from "./sidebar/Sidebar";
import userService from "../../services/userService";

function Library() {
    // ***************************************************************
    // PRESENTATION PURPOSE ONLY
    // Asking username by default until routing and userpage is added

    if (
        userService.getUsername() === null ||
        userService.getUsername() === ""
    ) {
        userService.setUsername();
    }

    // **************************************************************

    return (
        <div className={`${styles["library"]}`}>
            <Sidebar />
            <Code />
        </div>
    );
}

export default Library;
