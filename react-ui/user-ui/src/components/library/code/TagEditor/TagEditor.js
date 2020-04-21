import React, { useState, useEffect } from "react";

import styles from "./tagEditor.module.css";
import Emitter from "../../../../services/emitter";
import tagService from "../../../../services/tagService";
import TagCheckbox from "./TagCheckbox/TagCheckbox";

function TagEditor(props) {
    const { snippet } = props;
    const [all_user_tags, setAll_user_tags] = useState([]);

    const [snippet_tags, setSnippet_tags] = useState();

    // console.log(snippet_tags);

    const openTagEditor = () => {
        const tagEditor = document.getElementById("tagEditor");
        tagEditor.classList.add(styles["active"]);
    };

    const closeTagEditor = () => {
        const tagEditor = document.getElementById("tagEditor");
        tagEditor.classList.remove(styles["active"]);
    };

    const cancel = () => {
        closeTagEditor();
        const default_tags_set = new Set(snippet.tags);
        setSnippet_tags(default_tags_set);
    };

    const addToTagSet = (tag_id) => {
        const snippet_tags_copy = new Set(snippet_tags);
        snippet_tags_copy.add(tag_id);
        setSnippet_tags(snippet_tags_copy);
    };

    const removeFromTagSet = (tag_id) => {
        const snippet_tags_copy = new Set(snippet_tags);
        snippet_tags_copy.delete(tag_id);
        setSnippet_tags(snippet_tags_copy);
    };

    const submitTagListUpdate = () => {
        closeTagEditor();
        const final_tag_set = Array.from(snippet_tags.values());
        tagService
            .updateTagsOfSnippet(snippet.id, final_tag_set)
            .then((data) => {
                console.log(data);
            });
    };

    useEffect(() => {
        const username = "Pranay-Tej";
        // subscribing
        tagService.getUserTags(username).then((data) => {
            setAll_user_tags(data);
        });

        Emitter.on("editTags", () => {
            openTagEditor();

        });


        return () => {
            // unsubscribing on unmount
            Emitter.off("editTags");
        };
    }, []);

    useEffect(() => {
        setSnippet_tags(new Set(snippet.tags))
    }, [snippet])

    const tag_checklist = all_user_tags.map((tag) => (
        <TagCheckbox
            key={tag.id}
            tag={tag}
            checked={snippet_tags.has(tag.id)}
            addToTagSet={addToTagSet}
            removeFromTagSet={removeFromTagSet}
        />
    ));

    return (
        <div id="tagEditor" className={styles["tag-editor"]}>
            {all_user_tags.length > 0 ? (
                <div className={styles["tag-checklist"]}>
                    {tag_checklist}
                </div>
            ) : (
                <div>
                    Create Tags using New-Tag option in the left side menu
                </div>
            )}
            <div className={`${styles["tag-editor-actions"]}`}>
                <button
                    className={`${styles["tag-editor-action-item"]}`}
                    onClick={() => submitTagListUpdate()}
                >
                    <ion-icon name="checkmark-circle"></ion-icon>
                </button>
                <button
                    className={`${styles["tag-editor-action-item"]}`}
                    onClick={() => cancel()}
                >
                    <ion-icon name="close-circle"></ion-icon>
                </button>
            </div>
        </div>
    );
}

export default TagEditor;
