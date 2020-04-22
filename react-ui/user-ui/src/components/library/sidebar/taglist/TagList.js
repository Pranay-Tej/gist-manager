import React, { useState, useEffect } from "react";

import styles from "./taglist.module.css";

import tagService from "../../../../services/tagService";
import Tag from "./tag/Tag";
import userService from "../../../../services/userService";
import Emitter from "../../../../services/emitter";

function TagList() {
    const [tags, setTags] = useState([]);

    const refreshTagList = () => {
        const username = userService.getUsername();
        // if (username === null || username === "") {
        //     userService.setUsername()
        // }
        tagService.getUserTags(username).then((data) => setTags(data));
    };

    useEffect(() => {
        refreshTagList();

        Emitter.on("usernameUpdate", () => {
            refreshTagList();
        });

        Emitter.on("refreshTagList", () => {
            refreshTagList();
        });

        return () => {
            Emitter.off("usernameUpdate");
            Emitter.off("refreshTagList");

        };
    }, []);

    // const taglist = tags.map((tag) => <Tag key={tag.id} tag={tag} />);
    // return <div className={styles["taglist"]}>{tags.map((tag) => <Tag key={tag.id} tag={tag} />)}</div>;

    return (
        <div className={styles["taglist"]}>
            {tags.length > 0 ? (
                tags.map((tag) => <Tag key={tag.id} tag={tag} />)
            ) : (
                <div className={styles["emptyBlock"]}>
                    Enter a GitHub username to view tags
                </div>
            )}
        </div>
    );
}

export default TagList;
