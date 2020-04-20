import React from "react";

import styles from "./codetoolbar.module.css";
import Codemenu from "./Codemenu/Codemenu";

function Codetoolbar(props) {
    const { snippet } = props;

    // console.log(snippet);

    return (
        <div className={styles["code-toolbar"]}>
            <div className={styles["code-info"]}>
                <div className={styles["code-info-item"]}>
                    {snippet.filename}
                </div>
                <div className={styles["code-info-item"]}>
                    user: {snippet.username}
                </div>
            </div>
            <Codemenu snippet={snippet} />
        </div>
    );
}

export default Codetoolbar;
