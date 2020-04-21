import React from "react";

import styles from "./tag.module.css";
import Emitter from "../../../../../services/emitter";
import tagService from "../../../../../services/tagService";

function Tag(props) {
    const { tag } = props;

    const sendTag = () => {
        Emitter.emit("TagId", tag.id);
    };

    const deleteTag = () => {
        const delete_confirmation = window.confirm(`Delete Tag: ${tag.name}?`);
        if (delete_confirmation) {
            tagService.deleteTag(tag.id).then((data) => {
                console.log(data);
            });
        }
    };

    const downloadTag = () => {
        const API = `localhost:8080/gist-service`;

        const link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", `${API}/download/tag/${tag.id}`);
        link.setAttribute("download", tag.name);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className={styles["tag"]}>
            <div className={styles["tag-name"]} onClick={() => sendTag()}>
                {tag.name}
            </div>
            <button
                className={styles["download-tag"]}
                onClick={() => downloadTag()}
            >
                <ion-icon name="arrow-down-circle"></ion-icon>
            </button>
            <button
                className={styles["delete-tag"]}
                onClick={() => deleteTag()}
            >
                <ion-icon name="trash-bin"></ion-icon>
            </button>
        </div>
    );
}

export default Tag;
