import React, { useEffect } from 'react'
import { useContext, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import DeleteNote from './DeleteNote'
import Masonry from 'react-masonry-css'
import '../Trash.css';

export default function Trash() {

    const currentDate = new Date();
    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const context = useContext(NoteContext);
    const ref = useRef(null);
    const [deletedNote, setDeletedNote] = useState({
        deletedNoteId: "",
        deletedTitle: "",
        deletedTag: "",
        deletedDescription: "",
        deletedDate: new Date()
    });

    useEffect(() => {
        context.getNotes();
        // eslint-disable-next-line
    }, [])

    const displayNote = (clickedNote) => {
        console.log(clickedNote);
        setDeletedNote({
            deletedNoteId: clickedNote._id,
            deletedTitle: clickedNote.title,
            deletedTag: clickedNote.tag,
            deletedDescription: clickedNote.description,
            deletedDate: new Date(clickedNote.date)
        });
        console.log(deletedNote);
        ref.current.click();
    }

    //function for restoring notes
    const restoreNote = (restoreNoteId) => {
        const updatedData = {
            deleted: false,
            restoreDate: new Date()
        }
        context.updateNote(updatedData, restoreNoteId);
    }

    const deleteClickedNote = (deleteNoteID) => {
        context.deleteNote(deleteNoteID);
    }

    const breakpointColumnsObj = {
        default: 5,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <>
            <button ref={ref} style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    {/* <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div> */}
                    <div className="modal-content">
                        <div className="modal-body">
                            <form>
                                <div className="mt-1">
                                    <input type="text" style={{ fontWeight: "bold" }} className="form-control1" value={deletedNote.deletedTitle} id="editTitle" name="editTitle" readOnly />
                                </div>
                                <hr />
                                <div>
                                    <input type="text" className="form-control1" value={deletedNote.deletedTag} placeholder={(deletedNote.deletedTag) ? " " : "No Tag is given"} id="editTag" name="editTag" readOnly />
                                </div>
                                <hr />
                                <div className="mx-1 mb-2">
                                    <textarea type="text" style={{ height: "260px" }} className="textControl" value={deletedNote.deletedDescription} id="editDescription" name="editDescription" readOnly></textarea>
                                </div>
                                {/* <button type="submit" className="btn btn-dark mx-2 mb-2">Update</button> */}
                            </form>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div className=" d-flex justify-content-around">
                                <button type="submit" className="btn btn-dark mx-2">Delete</button>
                                <button type="submit" className="btn btn-dark mx-2">Restore</button>
                                {/* <button ref={closeBtn} type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button> */}
                            </div>
                            {/* <small>Edited {deletedNote.deletedDate.getHours() + ":" + ((deletedNote.deletedDate.getMinutes()<10)?"0"+deletedNote.deletedDate.getMinutes():deletedNote.deletedDate.getMinutes())}</small> */}
                            <small>Note In Trash &bull; Edited {(currentDate.getDate() > deletedNote.deletedDate.getDate()) ? deletedNote.deletedDate.getDate() + " " + Months[deletedNote.deletedDate.getMonth()] : ((deletedNote.deletedDate.getHours() > 12) ? (deletedNote.deletedDate.getHours() - 12) : deletedNote.deletedDate.getHours()) + ":" + ((deletedNote.deletedDate.getMinutes() < 10) ? "0" + deletedNote.deletedDate.getMinutes() : deletedNote.deletedDate.getMinutes()) + " " + ((deletedNote.deletedDate.getHours() > 11) ? "PM" : "AM")}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container2'>
                {(localStorage.getItem("token") && context.deletedNotes.length !== 0) ?
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {context.deletedNotes.map((storedNote) => {
                            return <div key={storedNote._id} style={{ cursor: "default" }} onClick={() => { displayNote(storedNote) }} >
                                <DeleteNote notes={storedNote} deleteNote={deleteClickedNote} restoreNote={restoreNote} />
                                {/* <Note notes={a} updateNote={updateNote}  */}
                            </div>
                        })}
                    </Masonry>
                    :
                    <div className='text-center centerDelete'>
                        <i style={{color:"rgb(136, 136, 136,0.42)",fontSize:"150px"}} className="fa-solid fa-trash"></i>
                        <h3 style={{ color: "rgb(136, 136, 136,0.90)",paddingTop:"20px" }}>No notes in trash</h3>
                    </div>
                }
            </div>
        </>
    )
}
