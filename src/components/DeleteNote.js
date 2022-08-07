import React from 'react'
import "../DeleteNote.css"

export default function DeleteNote(props) {

    const { notes, deleteNote, restoreNote } = props;

    return (
        <>
            <div id="card" className="card">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <div id="option">
                        <i style={{ cursor: "pointer", fontSize: "16px" }} id="delete" title="Delete Forever" className="fa-solid fa-trash" onClick={(e) => { deleteNote(notes._id) ;e.stopPropagation(); }} ></i>
                        <i style={{ cursor: "pointer", fontSize: "16px" }} id="restore" title="Restore Note" className="fa-solid fa-trash-arrow-up" onClick={(e) => { restoreNote(notes._id);e.stopPropagation(); }}></i>
                        {/* <i style={{cursor:"pointer"}} title="Update" className="fa fa-pencil-square-o" onClick={() => {updateNote(notes)}}></i> */}
                    </div>
                </div>
            </div>
        </>
    )
}
