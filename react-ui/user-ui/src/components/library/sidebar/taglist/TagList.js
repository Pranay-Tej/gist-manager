import React, { useState, useEffect } from "react";

import styles from "./taglist.module.css";

import tagService from "../../../../services/tagService";
import Tag from "./tag/Tag";

function TagList() {
    const [tags, setTags] = useState([]);

    const taglist = tags.map((tag) => <Tag key={tag.id} tag={tag} />);
    useEffect(() => {
        const username = "Pranay-Tej";
        tagService.getUserTags(username).then((data) => setTags(data));
        // return () => {
        //     cleanup
        // }
    }, []);

    // return <div className={styles["taglist"]}>{tags.map((tag) => <Tag key={tag.id} tag={tag} />)}</div>;
    return <div className={styles["taglist"]}>{taglist}</div>;

}

export default TagList;
