import React from "react";
import styles from "./usermenu.module.css";
import Emitter from "../../../../services/emitter";
import tagService from "../../../../services/tagService";
import snippetService from "../../../../services/snippetService";

function Usermenu() {
    const viewAll = () => {
        Emitter.emit("ViewAll");
    };

    const createNewTag = () => {
        const username = "Pranay-Tej";
        const new_tag_name = window.prompt("New Tag name: ");
        if (new_tag_name === null || new_tag_name === "") {
            return;
        }
        tagService
            .createNewTag(username, new_tag_name)
            .then((data) => console.log(data));
    };

    const downloadAllSnippets = () => {
        const API = `localhost:8080/gist-service`
        const username = "Pranay-Tej"
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', `${API}/download/all/${username}`);
        link.setAttribute('download', username);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    return (
        <div className={styles["usermenu"]}>
            <button
                className={styles["usermenu-item"]}
                onClick={() => viewAll()}
            >
                Update Library
            </button>
            <div className={`${styles["usermenu-item"]} ${styles["all"]}`} onClick={() => viewAll()}>
                <div className={styles["view-all"]}>All</div>
                <button className={styles["download-all"]} onClick={() => downloadAllSnippets()}>D</button>
            </div>
            <button
                className={styles["usermenu-item"]}
                onClick={() => createNewTag()}
            >
                New Tag
            </button>
        </div>
    );
}

export default Usermenu;
