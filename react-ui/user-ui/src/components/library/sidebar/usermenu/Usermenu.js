import React from 'react'
import styles from "./usermenu.module.css";
import Emitter from '../../../../services/emitter';
import tagService from '../../../../services/tagService';


function Usermenu() {


    const viewAll = () => {
        Emitter.emit("ViewAll")
    }

    const createNewTag = () => {
        const username = "Pranay-Tej"
        const new_tag_name = window.prompt("New Tag name: ")
        tagService.createNewTag(username, new_tag_name)
        .then( data => console.log(data))
    }

    return (
        <div className={styles['usermenu']}>
            <button className={styles['usermenu-item']} onClick={() => viewAll()}>
                All
            </button >
            <button className={styles['usermenu-item']} onClick={() => viewAll()}>
                Update Library
            </button>
            <button className={styles['usermenu-item']} onClick={() => createNewTag()}>
                New Tag
            </button>
        </div>
    )
}

export default Usermenu
