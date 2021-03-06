import React from 'react'
import styles from "./loading.module.css";

function Loading() {
    return (
        <div className={styles["loading"]}>
            Please wait while app loads for the first time...
        </div>
    )
}

export default Loading
