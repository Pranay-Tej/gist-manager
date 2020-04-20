import React from "react";

import styles from "./codemenu.module.css";
import snippetService from "../../../../../services/snippetService";
import Emitter from "../../../../../services/emitter";

function Codemenu(props) {
    const { snippet } = props;

    const downloadSnippet = () => {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', `localhost:8080/gist-service/download/${snippet.id}`);
        link.setAttribute('download', snippet.filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const editTags = () => {
        Emitter.emit("editTags")
    }

    return (
        <div className={styles["code-menu"]}>
            <button className={styles["code-menu-item"]} onClick={() => editTags()}>E</button>
            <button
                className={styles["code-menu-item"]}
                onClick={() => downloadSnippet()}
            >
                D
            </button>
        </div>
    );
}

export default Codemenu;
