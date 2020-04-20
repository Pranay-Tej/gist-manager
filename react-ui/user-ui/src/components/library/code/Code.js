import React, { useState, useEffect } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import styles from "./code.module.css";
import Emitter from "../../../services/emitter";
import Codetoolbar from "./Codetoolbar/Codetoolbar";
import TagEditor from "./TagEditor/TagEditor";

function Code() {
    const [snippet, setSnippet] = useState(null);

    const showCode = (code) => {
        setSnippet(code);
    };

    useEffect(() => {
        Emitter.on("snippetToCode", (snippet) => {
            setSnippet(snippet);
        });
        return () => {
            // unsubscribing on unmount
            Emitter.off("snippetCode");
        };
    }, [snippet]);

    return (
        <div className={styles["code"]}>
            {snippet ? (
                <>
                    <Codetoolbar snippet={snippet} />
                    <SyntaxHighlighter
                        language="javascript"
                        style={atelierCaveDark}
                        className={styles["code-syntax-highlight"]}
                    >
                        {snippet.code}
                    </SyntaxHighlighter>
                    <TagEditor snippet={snippet}/>
                </>
            ) : (
                <div className={styles["emptyBlock"]}>&larr; Select a snippet to view its code</div>
            )}
        </div>
    );
}

export default Code;
