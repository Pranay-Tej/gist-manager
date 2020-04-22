import React from "react";
import styles from "./usermenu.module.css";
import Emitter from "../../../../services/emitter";
import tagService from "../../../../services/tagService";
import snippetService from "../../../../services/snippetService";
import userService from "../../../../services/userService";
import config from "../../../../services/config";

function Usermenu() {
    const viewAll = () => {
        Emitter.emit("viewAll");
    };

    const createNewTag = () => {
        let username = userService.getUsername();
        if (username === null || username === "") {
            userService.setUsername();
            username = userService.getUsername();
        }
        const new_tag_name = window.prompt("New Tag name: ");
        if (new_tag_name === null || new_tag_name === "") {
            return;
        }
        tagService
            .createNewTag(username, new_tag_name)
            .then((data) => Emitter.emit("refreshTagList"));
    };

    const downloadAllSnippets = () => {
        const API = config.API();
        let username = userService.getUsername();
        if (username === null || username === "") {
            userService.setUsername();
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
            <div className={styles["usermenu-item"]} onClick={() => viewAll()}>
                <div className={styles["usermenu-item-name"]}>
                    Update Library
                </div>
                <ion-icon name="refresh-circle"></ion-icon>
            </div>
            <div
                className={styles["usermenu-item"]}
                onClick={() => createNewTag()}
            >
                <div className={styles["usermenu-item-name"]}>New Tag</div>
                <ion-icon name="add-circle"></ion-icon>
            </div>
            <div
                className={`${styles["usermenu-item"]} ${styles["all"]}`}
                onClick={() => viewAll()}
            >
                <div className={styles["view-all"]}>
                    <div className={styles["usermenu-item-name"]}>All</div>
                    <ion-icon name="library"></ion-icon>
                </div>
                <button
                    className={styles["download-all"]}
                    onClick={() => downloadAllSnippets()}
                >
                    <ion-icon name="arrow-down-circle"></ion-icon>
                </button>
            </div>
        </div>
    );
}

export default Usermenu;
