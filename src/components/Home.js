import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../context/NoteContext'
import Note from './Note';
import "../Home.css"

export default function Home() {
    const currentDate = new Date();
    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //access context from NoteContext
    const context = useContext(NoteContext);

    useEffect(() => {
        context.getNotes();
        // eslint-disable-next-line
    }, [])

    //State for display all title,tag and description in note
    const [toggle, setToggle] = useState("close");

    //State for storing note which want to update
    const [wantToUpdate, setWantToUpdate] = useState({
        editNoteId: "",
        editTitle: "",
        editTag: "",
        editDescription: "",
        editDate: new Date()
    });

    //function call when user create a new note
    const handleSubmit = (e) => {
        e.preventDefault();
        const elementTitle = document.getElementById("title");
        const elementTag = document.getElementById("tag");
        const elementDescription = document.getElementById("description");

        const title = elementTitle.value;
        const tag = elementTag.value;
        const description = elementDescription.value;

        elementTitle.value = elementTag.value = elementDescription.value = "";

        const noteData = {
            title: title,
            tag: tag,
            description: description
        }
        context.addNotes(noteData);
    }

    //function call when update button is press
    const handleUpdate = (e) => {
        const updatedTitle = document.getElementById("editTitle");
        const updatedTag = document.getElementById("editTag");
        const updatedDescription = document.getElementById("editDescription");
        const updatedData = {
            title: updatedTitle.value,
            tag: updatedTag.value,
            description: updatedDescription.value,
            date:Date.now()
        }
        context.updateNote(updatedData, wantToUpdate.editNoteId);
        closeBtn.current.click();
    }

    //for open and close writeing note div
    window.addEventListener('click', (e) => {
        if (document.getElementById('mainBox').contains(e.target)) {
            document.getElementById('mainBox').classList.remove('mainBox');
            document.getElementById('mainBox').classList.add('mainBox1');
            // console.log(e.target.parentElement.parentElement);
            setToggle("open");
        } else {
            document.getElementById('mainBox').classList.remove('mainBox1');
            document.getElementById('mainBox').classList.add('mainBox');
            // console.log(document.getElementById('mainBox'));
            setToggle("close");
        }
    });

    //reference of button which open modal and for button display is none
    const ref = useRef(null);

    //reference of button which close modal and for button display is none
    const closeBtn = useRef(null);

    //function call when user clicked on div for update
    const updateNote = (clickedNote) => {
        console.log(clickedNote);
        setWantToUpdate({
            editNoteId: clickedNote._id,
            editTitle: clickedNote.title,
            editTag: clickedNote.tag,
            editDescription: clickedNote.description,
            editDate: new Date(clickedNote.date)
        });
        console.log(wantToUpdate);
        ref.current.click();
    }

    const deleteNote =(deleteNoteId) => {
        
    }

    const assignNewValue = (e) => {
        setWantToUpdate({ ...wantToUpdate, [e.target.name]: e.target.value });
    }

    //for not showing scrollbar in textearea
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        if (tx[i].value === '') {
            tx[i].setAttribute("style", "height:60px;overflow-y:hidden;");
        } else {
            console.log("Inside else");
            tx[i].setAttribute("style", "height:" + ((tx[i].scrollHeight) ? (tx[i].scrollHeight < 200) ? "200" : tx[i].scrollHeight : "200") + "px;overflow-y:hidden;");
        }
        tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
        console.log(">>>>>" + this.scrollHeight);
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }

    return (
        <>
            <div className='container afterNavbar'>
                <form action="http://localhost:5000/api/note/createnote" method='post' onSubmit={handleSubmit}>
                    {/* <h2>Add Note</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" />
                    </div> */}
                    <div className="mainBox mt-4" id="mainBox">
                        <div className="mt-1">
                            <input type="text" className="form-control1" placeholder={`${(toggle === "close") ? "Take a note ..." : "Title"}`} id="title" name="title" />
                        </div>
                        <hr />
                        <div>
                            <input type="text" className="form-control1" placeholder="Tag" id="tag" name="tag" />
                        </div>
                        <hr />
                        <div>
                            <textarea type="text" className="form-control1" placeholder="Description" id="description" name="description"></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark mx-2 mb-2">Submit</button>
                    </div>
                </form>
            </div>

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
                                    <input type="text" style={{ fontWeight: "bold" }} className="form-control1" value={wantToUpdate.editTitle} id="editTitle" name="editTitle" onInput={assignNewValue} />
                                </div>
                                <hr />
                                <div>
                                    <input type="text" className="form-control1" value={wantToUpdate.editTag} placeholder={(wantToUpdate.editTag) ? " " : "Tag"} id="editTag" name="editTag" onInput={assignNewValue} />
                                </div>
                                <hr />
                                <div className="mx-1 mb-2">
                                    <textarea type="text" className="textControl" value={wantToUpdate.editDescription} id="editDescription" name="editDescription" onChange={assignNewValue}></textarea>
                                </div>
                                {/* <button type="submit" className="btn btn-dark mx-2 mb-2">Update</button> */}
                            </form>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div className=" d-flex justify-content-around">
                                <button type="submit" className="btn btn-dark mx-2" onClick={handleUpdate}>Update</button>
                                <button ref={closeBtn} type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                            </div>
                            {/* <small>Edited {wantToUpdate.editDate.getHours() + ":" + ((wantToUpdate.editDate.getMinutes()<10)?"0"+wantToUpdate.editDate.getMinutes():wantToUpdate.editDate.getMinutes())}</small> */}
                            <small>Edited {(currentDate.getDate() > wantToUpdate.editDate.getDate()) ? wantToUpdate.editDate.getDate() + " " + Months[wantToUpdate.editDate.getMonth()] : ((wantToUpdate.editDate.getHours() > 12) ? (wantToUpdate.editDate.getHours() - 12) : wantToUpdate.editDate.getHours()) + ":" + ((wantToUpdate.editDate.getMinutes() < 10) ? "0" + wantToUpdate.editDate.getMinutes() : wantToUpdate.editDate.getMinutes()) + " " + ((wantToUpdate.editDate.getHours() > 11) ? "PM" : "AM")}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container1'>
                <h2 className='text-center mb-4' >Your Notes</h2>
                {console.log(context.note)}
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1050: 4, 1200: 5 }}
                >
                    <Masonry columnsCount={3} gutter="10px">
                        {context.note.map((storedNote) => {
                            return <div key={storedNote._id} style={{ cursor: "default" }} onClick={() => { updateNote(storedNote) }} >
                                <Note notes={storedNote} deleteNote={deleteNote}/>
                                {/* <Note notes={a} updateNote={updateNote}  */}
                            </div>
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </>
    )
}
