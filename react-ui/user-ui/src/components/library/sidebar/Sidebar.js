import React, { useEffect } from "react";
import styles from "./sidebar.module.css";
import TagList from "./taglist/TagList";
import SnippetList from "./snippetlist/SnippetList";
import Emitter from "../../../services/emitter";
import Usermenu from "./usermenu/Usermenu";


function Sidebar() {
    const closeSideBar = () => {
        let sideBar = document.getElementById("sideBar");
        sideBar.classList.remove(styles["active"]);
    };

    const openSidebar = () => {
        let sideBar = document.getElementById("sideBar");
        sideBar.classList.add(styles["active"]);
    };

    useEffect(() => {
        // subscribing
        Emitter.on("openSidebar", () => {
            openSidebar();
        });

        // subscribing
        Emitter.on("closeMenu", () => {
            closeSideBar();
        });

        return () => {
            // unsubscribing on unmount
            Emitter.off("openSidebar");
            Emitter.off("closeMenu");
        };
    }, []);

    return (
        <div id={"sideBar"} className={`${styles["sidebar"]} `}>
            <div className={styles["close-sidebar"]} onClick={() => closeSideBar()}>
                X
            </div>
            <Usermenu />
            <TagList />
            <SnippetList />
        </div>
    );
}

export default Sidebar;
