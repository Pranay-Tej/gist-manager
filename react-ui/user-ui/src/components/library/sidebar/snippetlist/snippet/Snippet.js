import React from 'react'

import styles from "./snippet.module.css";
import Emitter from '../../../../../services/emitter';


function Snippet(props) {
    const {snippet} = props

    const sendSnippetCode = (snippet) => {
        Emitter.emit("snippetToCode", snippet)

        Emitter.emit("closeMenu")
    }

    return (
        <div className={styles["snippet"]} onClick={() => sendSnippetCode(snippet)}>
            {snippet.filename}
        </div>
    )
}

export default Snippet
