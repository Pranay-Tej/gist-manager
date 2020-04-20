import React, { useState, useEffect } from "react";

import styles from "./snippetlist.module.css";

import snippetService from "../../../../services/snippetService";
import Snippet from "./snippet/Snippet";
import Emitter from "../../../../services/emitter";

function SnippetList() {
    const [snippets, setSnippets] = useState([]);

    const snippetlist = snippets.map((snippet) => (
        <Snippet key={snippet.id} snippet={snippet} />
    ));

    const getSnippets = (tagId) => {
        snippetService.getTagSnippets(tagId).then((data) => setSnippets(data));
    };

    const getAllSnippets = () => {
        let username = "Pranay-Tej";
        snippetService
            .getUserSnippets(username)
            .then((data) => setSnippets(data));
    };

    useEffect(() => {
        // let username = "Pranay-Tej";
        // snippetService
        //     .getUserSnippets(username)
        //     .then((data) => setSnippets(data));

        Emitter.on("TagId", (tagId) => {
            getSnippets(tagId);
        });

        Emitter.on("ViewAll", () => {
            getAllSnippets();
        });

        return () => {
            Emitter.off("TagId");
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
