import React from 'react'

import styles from "./tag.module.css";
import Emitter from '../../../../../services/emitter';


function Tag(props) {
    const {tag} = props

    const sendTag = (tagId) => {
        Emitter.emit("TagId", tagId)
    }

    return (
        <div className={styles['tag']} onClick={() => sendTag(tag.id)}>
            {tag.name}
        </div>
    )
}

export default Tag
