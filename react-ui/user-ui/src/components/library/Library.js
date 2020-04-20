import React, { useEffect } from "react";
import Code from "./code/Code";

import styles from "./library.module.css";
import Sidebar from "./sidebar/Sidebar";

function Library() {
    return (
        <div className={`${styles["library"]}`}>
            <Sidebar />
            <Code />
        </div>
    );
}

export default Library;
