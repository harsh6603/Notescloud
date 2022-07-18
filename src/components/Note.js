import React from 'react'
import "../Note.css"

export default function Note(props) {

    const { notes,deleteNote } = props;
    
    return (
        <>
            <div id="card" className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{notes.title}</h5>
                        <div id="option">
                            <i style={{cursor:"pointer"}} title="Delete" className="fa fa-trash-o mx-2" onClick={() => {deleteNote(notes._id)}}></i>
                            {/* <i style={{cursor:"pointer"}} title="Update" className="fa fa-pencil-square-o" onClick={() => {updateNote(notes)}}></i> */}
                        </div>
                    </div>
                    <p className="card-text">{notes.description}</p>
                </div>
            </div>
        </>
    )
}
