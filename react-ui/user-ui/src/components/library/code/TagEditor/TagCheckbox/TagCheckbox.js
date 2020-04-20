import React,{useState, useEffect} from "react";

import styles from "./tagCheckbox.module.css";

function TagCheckbox(props) {
    const { tag, checked, addToTagSet, removeFromTagSet } = props;


    const updateTagSet = (event) => {
        if(event.target.checked === true){
            addToTagSet(tag.id)
        }else{
            removeFromTagSet(tag.id)
        }
    }

    return (
        <div className={styles["tag-checkbox"]}>
            <input type="checkbox" checked={checked} onChange={updateTagSet}/>
            <div className={styles["tag-name"]}>{tag.name}</div>
        </div>
    );
}

export default TagCheckbox;
