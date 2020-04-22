import React, { useState, useEffect } from "react";

import styles from "./snippetlist.module.css";

import snippetService from "../../../../services/snippetService";
import Snippet from "./snippet/Snippet";
import Emitter from "../../../../services/emitter";
import userService from "../../../../services/userService";

function SnippetList() {
    const [snippets, setSnippets] = useState([]);

    const snippetlist = snippets.map((snippet) => (
        <Snippet key={snippet.id} snippet={snippet} />
    ));

    const getSnippets = (tagId) => {
        snippetService.getTagSnippets(tagId).then((data) => setSnippets(data));
    };

    const getAllSnippets = () => {
        let username = userService.getUsername();
        if (username === null || username === "") {
            userService.setUsername();
            username = userService.getUsername();
        }
        snippetService
            .getUserSnippets(username)
            .then((data) => setSnippets(data));
    };

    useEffect(() => {
        Emitter.on("tagId", (tagId) => {
            getSnippets(tagId);
        });

        Emitter.on("viewAll", () => {
            getAllSnippets();
        });

        return () => {
            Emitter.off("tagId");
            Emitter.off("viewAll");
        };
    }, []);

    return (
        <div className={styles["snippetlist"]}>
            {/* {snippets.map((snippet) => (
                <Snippet key={snippet.id} snippet={snippet} />
            ))} */}
            {snippetlist.length > 0 ? (
                <div>{snippetlist}</div>
            ) : (
                <div className={styles["emptyBlock"]}>
                    &larr; Select a tag to view its snippets
                </div>
            )}
        </div>
    );
}

export default SnippetList;
