import React from "react";
import styles from "./usermenu.module.css";
import Emitter from "../../../../services/emitter";
import tagService from "../../../../services/tagService";
import snippetService from "../../../../services/snippetService";
import userService from "../../../../services/userService";

function Usermenu() {
    const viewAll = () => {
        Emitter.emit("ViewAll");
    };

    const createNewTag = () => {
        let username = userService.getUsername();
        if (username === null || username === "") {
            userService.setUsername()
            username = userService.getUsername();
        }
        const new_tag_name = window.prompt("New Tag name: ");
        if (new_tag_name === null || new_tag_name === "") {
            return;
        }
        tagService
            .createNewTag(username, new_tag_name)
            .then((data) => console.log(data));
    };

    const downloadAllSnippets = () => {
        const API = `localhost:8080/gist-service`;
        let username = userService.getUsername();
        if (username === null || username === "") {
            userService.setUsername()
            username = userService.getUsername();
        }
        const link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", `${API}/download/all/${username}`);
        link.setAttribute("download", username);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    return (
        <div className={styles["usermenu"]}>
            <button
                className={styles["usermenu-item"]}
                onClick={() => viewAll()}
            >
                Update Library
                <ion-icon size="large" name="refresh-circle"></ion-icon>
            </button>
            <div
                className={`${styles["usermenu-item"]} ${styles["all"]}`}
                onClick={() => viewAll()}
            >
                <div className={styles["view-all"]}>
                    All <ion-icon name="library"></ion-icon>
                </div>
                <button
                    className={styles["download-all"]}
                    onClick={() => downloadAllSnippets()}
                >
                    <ion-icon name="arrow-down-circle"></ion-icon>
                </button>
            </div>
            <button
                className={styles["usermenu-item"]}
                onClick={() => createNewTag()}
            >
                New Tag
                <ion-icon name="add-circle"></ion-icon>
            </button>
        </div>
    );
}

export default Usermenu;
