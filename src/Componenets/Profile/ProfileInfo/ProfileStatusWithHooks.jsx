import React, { useEffect, useState } from 'react';




const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                   <b>Status:</b> <span onDoubleClick={activateEditMode} > {props.status} </span>
                </div>
            }

            {editMode &&
                <div>
                    <input onMouseOut={deactivateEditMode} autoFocus={true} onChange={onStatusChange} value={status} />
                </div>
            }


        </div>)

}



export default ProfileStatusWithHooks;