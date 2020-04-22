import React from "react";

import styles from "./codemenu.module.css";
import snippetService from "../../../../../services/snippetService";
import Emitter from "../../../../../services/emitter";

function Codemenu(props) {
    const { snippet } = props;

    const downloadSnippet = () => {
        const API = `localhost:8080/gist-service`;

        const link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", `${API}/download/${snippet.id}`);
        link.setAttribute("download", snippet.filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const editTags = () => {
        Emitter.emit("editTags");
    };

    return (
        <div className={styles["code-menu"]}>
            <button
                className={`${styles["code-menu-item"]} ${styles["edit-tags"]}`}
                onClick={() => editTags()}
            >
                <ion-icon name="create"></ion-icon>
            </button>
            <button
                className={`${styles["code-menu-item"]} ${styles["download-tag"]}`}
                onClick={() => downloadSnippet()}
            >
                <ion-icon name="arrow-down-circle"></ion-icon>
            </button>
        </div>
    );
}

export default Codemenu;
