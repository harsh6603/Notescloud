import Masonry from 'react-masonry-css'
import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../context/NoteContext'
import Note from './Note';
import "../Home.css"
import { useLocation } from 'react-router-dom';
import Write from './Write';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

    //Define location
    let location = useLocation()
    let currentTab = location.pathname;
    let onlyNameOfTab;
    if (currentTab === "/") {
        onlyNameOfTab = "Home";
    }
    else {
        onlyNameOfTab = currentTab.slice(1);
    }

    //reference of close button of modal in mobile view
    const backBtn = useRef(null);

    const currentDate = new Date();
    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const x = window.matchMedia("(max-width: 500px)");

    // let navigate = useNavigate();

    //access context from NoteContext
    const context = useContext(NoteContext);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            context.getNotes(onlyNameOfTab);
            context.getArchiveNotesOfLabel(onlyNameOfTab);
            context.getLabels();
        }
        // eslint-disable-next-line
    }, [onlyNameOfTab])

    // //State for display all title,tag and description in note
    // const [toggle, setToggle] = useState("close");

    //State for storing note which want to update
    const [wantToUpdate, setWantToUpdate] = useState({
        editNoteId: "",
        editTitle: "",
        editTag: "",
        editDescription: "",
        editDate: new Date(),
        editLabel: "",
        editArchive: false,
        editDeleted: false,
        editRestoreDate: new Date(),
    });

    //State for storing note which want to delete
    const [deletedNote, setDeletedNote] = useState({
        deletedNoteId: "",
        deletedTitle: "",
        deletedTag: "",
        deletedDescription: "",
        deletedDate: new Date()
    });

    //function call when user create a new note
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const elementTitle = document.getElementById("title");
    //     const elementTag = document.getElementById("tag");
    //     const elementDescription = document.getElementById("description");

    //     const title = elementTitle.value;
    //     const tag = elementTag.value;
    //     const description = elementDescription.value;

    //     elementTitle.value = elementTag.value = elementDescription.value = "";
    //     let noteData;
    //     if (onlyNameOfTab === "Home" || onlyNameOfTab === "trash" || onlyNameOfTab === "archive" || onlyNameOfTab === "about") {
    //         noteData = {
    //             title: title,
    //             tag: tag,
    //             description: description
    //         }
    //     }
    //     else {
    //         noteData = {
    //             title: title,
    //             tag: tag,
    //             description: description,
    //             label: onlyNameOfTab
    //         }
    //     }

    //     context.addNotes(noteData, onlyNameOfTab);
    //     document.getElementById('mainBox').classList.remove('mainBox1');
    //     document.getElementById('mainBox').classList.add('mainBox');
    //     // console.log(document.getElementById('mainBox'));
    //     setToggle("close");

    // }

    //function call when update button is press
    const handleUpdate = (e) => {
        const updatedTitle = document.getElementById("editTitle");
        const updatedTag = document.getElementById("editTag");
        const updatedDescription = document.getElementById("editDescription");
        const updatedData = {
            title: updatedTitle.value,
            tag: updatedTag.value,
            description: updatedDescription.value,
            date: Date.now()
        }
        context.updateNote(updatedData, wantToUpdate.editNoteId, onlyNameOfTab);
        if (x.matches)
            backBtn.current.click();
        else
            closeBtn.current.click();
    }

    //for open and close writeing note div
    // window.addEventListener('click', (e) => {
    //     if (document.getElementById('mainBox').contains(e.target)) {
    //         if (localStorage.getItem("token")) {
    //             document.getElementById('mainBox').classList.remove('mainBox');
    //             document.getElementById('mainBox').classList.add('mainBox1');
    //             // console.log(e.target.parentElement.parentElement);
    //             setToggle("open");
    //         }
    //         else {
    //             navigate("/login");
    //         }
    //     } else {
    //         document.getElementById('mainBox').classList.remove('mainBox1');
    //         document.getElementById('mainBox').classList.add('mainBox');
    //         // console.log(document.getElementById('mainBox'));
    //         setToggle("close");
    //     }
    // });

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
            editDate: new Date(clickedNote.date),
            editLabel: clickedNote.label,
            editDeleted: clickedNote.deleted,
            editRestoreDate: new Date(),
            editArchive: clickedNote.archive
        });
        console.log(wantToUpdate);
        ref.current.click();
    }

    //update archive value to true for that note in database
    const archiveNote = (archiveNoteId) => {
        const updatedData = {
            archive: true,
            restoreDate: new Date()
        }
        context.updateNote(updatedData, archiveNoteId, onlyNameOfTab);
        x.matches && backBtn.current.click()
    }

    //update archive value to false for that note in database
    const unArchiveNote = (archiveNoteId) => {
        const updatedData = {
            archive: false,
            restoreDate: new Date()
        }
        context.updateNote(updatedData, archiveNoteId, onlyNameOfTab);
        x.matches && backBtn.current.click()
    }

    //update deleted value to true for that note in database
    const deleteNote = (deleteNoteId) => {
        const updatedData = {
            deleted: true
        }
        context.updateNote(updatedData, deleteNoteId, onlyNameOfTab);
        x.matches && backBtn.current.click()
    }

    //delete note forever
    const deleteClickedNote = (deleteNoteID) => {
        context.deleteNote(deleteNoteID, onlyNameOfTab);
        x.matches && backBtn.current.click()
    }

    //function for restoring notes 
    const restoreNote = (restoreNoteId) => {
        const updatedData = {
            deleted: false,
            restoreDate: new Date()
        }
        context.updateNote(updatedData, restoreNoteId, onlyNameOfTab);
        x.matches && backBtn.current.click()
    }

    //copy note
    const copyNote = (copyNoteData) => {
        console.log(copyNoteData);
        const data = {
            title: copyNoteData.title,
            description: copyNoteData.description,
            tag: copyNoteData.tag,
            deleted: copyNoteData.deleted,
            archive: copyNoteData.archive,
            label: copyNoteData.label,
            date: new Date(),
            restoreDate: new Date()
        }
        const dataForMobileView = {
            title: copyNoteData.editTitle,
            description: copyNoteData.editDescription,
            tag: copyNoteData.editTag,
            deleted: copyNoteData.editDeleted,
            archive: copyNoteData.editArchive,
            label: copyNoteData.editLabel,
            date: new Date(),
            restoreDate: new Date()
        }
        context.addNotes(data, onlyNameOfTab);
        if (x.matches) {
            context.addNotes(dataForMobileView, onlyNameOfTab);
            backBtn.current.click();
        }
    }

    //Display note in trash
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

    const assignNewValue = (e) => {
        setWantToUpdate({ ...wantToUpdate, [e.target.name]: e.target.value });
    }


    // const setArea = () => {
    //     const tx = document.getElementById("description");
    //     tx.addEventListener("input", OnInput, false);
    // }
    //for not showing scrollbar in textearea
    // const tx = document.getElementsByTagName("textarea");
    // for (let i = 0; i < tx.length; i++) {
    //     if (tx[i].value === '') {
    //         tx[i].setAttribute("style", "height:60px;overflow-y:hidden;");
    //     } else {
    //         if(i===0)
    //         {
    //             console.log("Inside else");
    //             tx[i].setAttribute("style", "height:" + ((tx[i].scrollHeight) ? (tx[i].scrollHeight < 200) ? "200" : tx[i].scrollHeight : "200") + "px;overflow-y:hidden;");
    //         }
    //     }
    //     tx[i].addEventListener("input", OnInput, false);
    // }

    // function OnInput(e) {
    //     console.log(">>>>>" + this.scrollHeight);
    //     // this.style.height = "auto";
    //     this.style.height = (this.scrollHeight) + "px";
    // }

    const breakpointColumnsObj = {
        default: 5,
        500: 3,
        400: 2,
        200: 1
    };

    // const [state, setState] = useState({
    //     images: [],
    // })

    // const onFileChange = (e) => {
    //     Array.from(e.target.files).forEach(file => {
    //         const reader = new FileReader();
    //         console.log(reader)
    //         reader.onload = (e) => {
    //             setState({
    //                 images:state.images.concat(e.target.result),
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     })
    // }

    const displayAlert = () => {
        toast("Can not edit in Trash", {
            position: toast.POSITION.BOTTOM_LEFT,
            containerId:"outsideHome"
        })
    }

    return (
        <>
            {(location.pathname !== "/archive" && location.pathname !== "/trash") &&
                <Write />
                // <div className={`${(context.navbarWidth === "unclick") ? "" : "marginForNavbar"}`}>
                //     <div className='container afterNavbar'>
                //         <form action="http://localhost:5000/api/note/createnote" method='post' onSubmit={handleSubmit}>
                //             {/* <h2>Add Note</h2>
                //                 <div className="mb-3">
                //                 <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                //                 <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                //                 </div>
                //                 <div className="mb-3">
                //                 <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                //                 <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" />
                //                 </div>
                //                 <div className="mb-3">
                //                 <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                //                 <input type="text" className="form-control" id="description" name="description" />
                //             </div> */}
                //             <div className="mainBox mt-4" id="mainBox">
                //                 {/* <div class="images">
                //                     {state.images.map(image => (
                //                         <img className="imageItem" src={image} alt="preview"/>
                //                     ))}
                //                 </div> */}
                //                 <div className="mt-1">
                //                     <input type="text" className="form-control1" placeholder={`${(toggle === "close") ? "Take a note ..." : "Title"}`} id="title" name="title" />
                //                 </div>
                //                 <hr />
                //                 <div>
                //                     <input type="text" className="form-control1" placeholder="Tag" id="tag" name="tag" />
                //                 </div>
                //                 <hr />
                //                 <div>
                //                     <textarea type="text" className="form-control1" placeholder="Description" id="description" name="description" onInput={setArea}></textarea>
                //                 </div>
                //                 {/* <div>
                //                     <input onChange={onFileChange} type="file" multiple />
                //                 </div> */}
                //                 <button type="submit" className="btn btn-dark mx-2 mb-2">Submit</button>
                //             </div>
                //         </form>
                //     </div>
                // </div>
            }

            <button ref={ref} style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
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
                        {x.matches &&
                            <div className="modal-header">
                                <div className='d-flex justify-content-between'>
                                    <i ref={backBtn} style={{fontSize:"17px"}} data-bs-dismiss="modal" className="fa-solid fa-arrow-left"></i>
                                    <div style={{ marginLeft: "196%" }} className='d-flex justify-content-start'>
                                        <i style={{ cursor: "pointer", fontSize: "16px", margin: "0 10px" }} id="copy" title="Copy Note" className="fa-regular fa-clone" onClick={(e) => { copyNote(wantToUpdate); e.stopPropagation(); }} ></i>
                                        {
                                            (onlyNameOfTab === "trash")
                                                ?
                                                <i style={{ cursor: "pointer", fontSize: "16px", margin: "0 10px" }} id="delete" title="Delete Forever" className="fa fa-trash-o" onClick={(e) => { deleteClickedNote(wantToUpdate.editNoteId); e.stopPropagation(); }} ></i>
                                                :
                                                <i style={{ cursor: "pointer", fontSize: "16px", margin: "0 10px" }} id="delete" title="Delete" className="fa fa-trash-o" onClick={(e) => { deleteNote(wantToUpdate.editNoteId); e.stopPropagation(); }} ></i>
                                        }

                                        {
                                            (onlyNameOfTab === "archive")
                                                ?
                                                <svg style={{ margin: "-3px 10px" }} onClick={(e) => { unArchiveNote(wantToUpdate.editNoteId); e.stopPropagation(); }} fill="black" height="22px" viewBox="0 0 24 24" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z"/><path d="M7 14h3v3h4v-3h3l-5-5z"/></svg>
                                                :
                                                (onlyNameOfTab === "trash")
                                                    ?
                                                    <i style={{ cursor: "pointer", fontSize: "16px", margin: "0 10px" }} id="restore" title="Restore Note" className="fa-solid fa-trash-arrow-up" onClick={(e) => { restoreNote(wantToUpdate.editNoteId); e.stopPropagation(); }}></i>
                                                    :
                                                    (wantToUpdate.editLabel !== "false" && wantToUpdate.editArchive === true)
                                                        ?
                                                        <svg style={{ margin: "-3px 10px" }} onClick={(e) => { unArchiveNote(wantToUpdate.editNoteId); e.stopPropagation(); }} fill="black" height="22px" viewBox="0 0 24 24" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z"/><path d="M7 14h3v3h4v-3h3l-5-5z"/></svg>
                                                        :
                                                        <svg style={{ margin: "-3px 10px" }} onClick={(e) => { archiveNote(wantToUpdate.editNoteId); e.stopPropagation(); }} fill="black" height="22px" viewBox="0 0 24 24" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z" /><path d="M14 9h-4v3H7l5 5 5-5h-3z" /></svg>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="modal-body">
                            <form>
                                <div className="mt-1">
                                    {
                                        onlyNameOfTab !== "trash" ?
                                            <input type="text" style={{ fontWeight: "bold" }} className="form-control1" value={wantToUpdate.editTitle} id="editTitle" name="editTitle" onInput={assignNewValue} />
                                            :
                                            <input type="text" style={{ fontWeight: "bold" }} className="form-control1" value={deletedNote.deletedTitle} id="deletedTitle" name="deletedTitle" readOnly onClick={displayAlert} />
                                    }
                                </div>
                                <hr />
                                <div>
                                    {
                                        onlyNameOfTab !== "trash" ?
                                            <input type="text" className="form-control1" value={wantToUpdate.editTag} placeholder={(wantToUpdate.editTag) ? " " : "Tag"} id="editTag" name="editTag" onInput={assignNewValue} />
                                            :
                                            <input type="text" className="form-control1" value={deletedNote.deletedTag} placeholder={(deletedNote.deletedTag) ? " " : "No Tag is given"} id="deletedTag" name="deletedTag" readOnly onClick={displayAlert} />
                                    }
                                </div>
                                <hr />
                                <div className="mx-1 mb-2">
                                    {
                                        onlyNameOfTab !== "trash" ?
                                            <textarea type="text" className="textControl" value={wantToUpdate.editDescription} id="editDescription" name="editDescription" onChange={assignNewValue}></textarea>
                                            :
                                            <textarea type="text" style={{ height: "260px" }} className="textControl" value={deletedNote.deletedDescription} id="deletedDescription" name="deletedDescription" readOnly onClick={displayAlert}></textarea>
                                    }
                                    {/* <ToastContainer toastStyle={{backgroundColor:"black",color:"white"}} icon={false} hideProgressBar closeButton={false} /> */}
                                </div>
                                {/* <button type="submit" className="btn btn-dark mx-2 mb-2">Update</button> */}
                            </form>
                        </div>
                        {
                            onlyNameOfTab !== "trash" ?
                                <div className="modal-footer d-flex justify-content-between">
                                    <div className=" d-flex justify-content-around">
                                        <button type="submit" className="btn btn-dark mx-2" onClick={handleUpdate}>Update</button>
                                        {(!x.matches) && <button ref={closeBtn} type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>}
                                    </div>
                                    {/* <small>Edited {wantToUpdate.editDate.getHours() + ":" + ((wantToUpdate.editDate.getMinutes()<10)?"0"+wantToUpdate.editDate.getMinutes():wantToUpdate.editDate.getMinutes())}</small> */}
                                    <small>Edited {(currentDate.getFullYear() > wantToUpdate.editDate.getFullYear()) ? Months[wantToUpdate.editDate.getMonth()] + " " + wantToUpdate.editDate.getFullYear() : (currentDate.getMonth() > wantToUpdate.editDate.getMonth()) ? wantToUpdate.editDate.getDate() + " " + Months[wantToUpdate.editDate.getMonth()] : (currentDate.getDate() > wantToUpdate.editDate.getDate()) ? wantToUpdate.editDate.getDate() + " " + Months[wantToUpdate.editDate.getMonth()] : ((wantToUpdate.editDate.getHours() > 12) ? (wantToUpdate.editDate.getHours() - 12) : wantToUpdate.editDate.getHours()) + ":" + ((wantToUpdate.editDate.getMinutes() < 10) ? "0" + wantToUpdate.editDate.getMinutes() : wantToUpdate.editDate.getMinutes()) + " " + ((wantToUpdate.editDate.getHours() > 11) ? "PM" : "AM")}</small>
                                </div>
                                :
                                <div className="modal-footer d-flex justify-content-between">
                                    <div className=" d-flex justify-content-around">
                                        {!x.matches && <button type="submit" className="btn btn-dark mx-2">Delete</button>}
                                        {/* <button type="submit" className="btn btn-dark mx-2">Restore</button> */}
                                        {/* <button ref={closeBtn} type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button> */}
                                    </div>
                                    {/* <small>Edited {deletedNote.deletedDate.getHours() + ":" + ((deletedNote.deletedDate.getMinutes()<10)?"0"+deletedNote.deletedDate.getMinutes():deletedNote.deletedDate.getMinutes())}</small> */}
                                    <small>Note In Trash &bull; Edited {(currentDate.getFullYear() > wantToUpdate.editDate.getFullYear()) ? Months[wantToUpdate.editDate.getMonth()] + " " + wantToUpdate.editDate.getFullYear() : (currentDate.getMonth() > wantToUpdate.editDate.getMonth()) ? wantToUpdate.editDate.getDate() + " " + Months[wantToUpdate.editDate.getMonth()] : (currentDate.getDate() > wantToUpdate.editDate.getDate()) ? wantToUpdate.editDate.getDate() + " " + Months[wantToUpdate.editDate.getMonth()] : ((wantToUpdate.editDate.getHours() > 12) ? (wantToUpdate.editDate.getHours() - 12) : wantToUpdate.editDate.getHours()) + ":" + ((wantToUpdate.editDate.getMinutes() < 10) ? "0" + wantToUpdate.editDate.getMinutes() : wantToUpdate.editDate.getMinutes()) + " " + ((wantToUpdate.editDate.getHours() > 11) ? "PM" : "AM")}</small>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer enableMultiContainer containerId={"outsideHome"} pauseOnFocusLoss={false} limit={1} toastStyle={{ backgroundColor: "black", color: "white" }} icon={false} hideProgressBar/>
            <div className={`${(context.mode === "white")?"lightTheme":"darkTheme"} ${(context.navbarWidth === "unclick") ? "marginForNavbarBefore" : "marginForNavbar"}`}>
                <div className={`blankDiv1 ${(context.mode === "white")?"lightTheme":"darkTheme"}`}>

                </div>
                <div className={`${(location.pathname === "/archive" || location.pathname === "/trash") ? "afterNavbarWithoutTakeNote" : (context.mode === "white")?"container1":"containerBlack"}`}>
                    {/* <h2 className='text-center mb-4' >Your Notes</h2> */}
                    {/* {console.log(onlyNameOfTab)} */}
                    {(localStorage.getItem("token") && (context.note.length !== 0 || context.labelArchiveNotes.length !== 0))
                        ?
                        (onlyNameOfTab === "Home" || onlyNameOfTab === "trash" || onlyNameOfTab === "about" || onlyNameOfTab === "archive")
                            ?
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                {
                                    context.note.map((storedNote) => {
                                        return <div className='getDiv' key={storedNote._id} style={{ cursor: "default" }} onClick={(onlyNameOfTab !== "trash") ? () => { updateNote(storedNote) } : () => { displayNote(storedNote) }} >
                                            <Note notes={storedNote} deleteNote={deleteNote} archiveNote={archiveNote} unArchiveNote={unArchiveNote} foreverDeleteNote={deleteClickedNote} restoreNote={restoreNote} copyNote={copyNote} />
                                            {/* <Note notes={a} updateNote={updateNote}  */}
                                        </div>
                                    })
                                }
                            </Masonry>
                            :
                            //Display content inside label
                            <div>
                                <Masonry
                                    breakpointCols={breakpointColumnsObj}
                                    className="my-masonry-grid"
                                    columnClassName="my-masonry-grid_column"
                                >
                                    {
                                        context.note.map((storedNote) => {
                                            return <div key={storedNote._id} style={{ cursor: "default" }} onClick={(onlyNameOfTab !== "trash") ? () => { updateNote(storedNote) } : () => { displayNote(storedNote) }} >
                                                <Note label={onlyNameOfTab} notes={storedNote} deleteNote={deleteNote} archiveNote={archiveNote} unArchiveNote={unArchiveNote} foreverDeleteNote={deleteClickedNote} restoreNote={restoreNote} copyNote={copyNote} />
                                            </div>
                                        })
                                    }
                                </Masonry>
                                <div className='mx-4'>
                                    <p style={{ fontWeight: "bold",color:(context.mode === "white")?"black":"white" }}>Archive</p>
                                </div>
                                <Masonry
                                    breakpointCols={breakpointColumnsObj}
                                    className="my-masonry-grid"
                                    columnClassName="my-masonry-grid_column"
                                >
                                    {
                                        context.labelArchiveNotes.map((storedNote) => {
                                            return <div key={storedNote._id} style={{ cursor: "default" }} onClick={(onlyNameOfTab !== "trash") ? () => { updateNote(storedNote) } : () => { displayNote(storedNote) }} >
                                                <Note labelArchive={true} label={onlyNameOfTab} notes={storedNote} deleteNote={deleteNote} archiveNote={archiveNote} unArchiveNote={unArchiveNote} foreverDeleteNote={deleteClickedNote} restoreNote={restoreNote} copyNote={copyNote} />
                                            </div>
                                        })
                                    }
                                </Masonry>
                            </div>
                        :
                        (location.pathname === "/archive") ?
                            <div className='text-center centerHome'>
                                <svg fill="rgb(136, 136, 136,0.42)" height="250px" viewBox="0 0 24 24" width="250px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z"/><path d="M14 9h-4v3H7l5 5 5-5h-3z"/></svg>
                                <h3 style={{ color: "rgb(136, 136, 136,0.90)" }}>Your archived notes are appear here</h3>
                            </div>
                            :
                            (location.pathname === "/trash") ?
                                <div className='text-center centerDelete'>
                                    <i style={{ color: "rgb(136, 136, 136,0.42)", fontSize: "200px" }} className="fa fa-trash-o"></i>
                                    <h3 style={{ color: "rgb(136, 136, 136,0.90)", paddingTop: "20px" }}>No notes in trash</h3>
                                </div>
                                :
                                (location.pathname === "/") ?
                                    <div className='text-center centerHome'>
                                        <svg enableBackground="new 0 0 64 64" height="250px" version="1.1" viewBox="0 0 64 64" width="250px" xmlns="http://www.w3.org/2000/svg"><g id="important_note"><g><polygon fill="rgb(136, 136, 136,0.42)" points="15,27 28.586,27 29.586,26 15,26   " /><polygon fill="rgb(136, 136, 136,0.42)" points="44.586,11 15,11 15,12 43.586,12   " /><polygon fill="rgb(136, 136, 136,0.42)" points="39.586,16 15,16 15,17 38.586,17   " /><polygon fill="rgb(136, 136, 136,0.42)" points="33.713,21.873 34.586,21 15,21 15,22 33.586,22   " /><path d="M57.172,18.173l-6.344-6.344c-0.777-0.778-1.803-1.167-2.828-1.167s-2.051,0.389-2.828,1.167L44,13.001    L32.228,24.773L20,37.001l-2,2c0,0,1.958,5.042-3,10l0.5,0.5l-2,1.999C11.567,53.434,11.791,55,14,55h3.001    c0.552,0,1.315-0.316,1.706-0.707l0.793-0.792l0.5,0.5c2.77-2.77,5.566-3.381,7.495-3.381c1.523,0,2.505,0.381,2.505,0.381l2-2    l12.505-12.505L52,29.001V58H10V6h42v5.587l1,1V5H9v54h44V28.001l3-3l1.172-1.172C58.728,22.273,58.728,19.729,57.172,18.173z     M18,53.586C17.799,53.787,17.285,54,17.001,54H14c-0.632,0-0.807-0.158-0.812-0.158c-0.029-0.092,0.06-0.675,1.019-1.634l2-2    l2.586,2.586L18,53.586z M29.713,49.874c-0.5-0.122-1.264-0.254-2.218-0.254c-1.9,0-4.676,0.539-7.472,2.989l-3.631-3.631    c3.608-4.109,3.114-8.147,2.735-9.69L20,38.415l10.586,10.586L29.713,49.874z M31.293,48.294L20.707,37.708L44,14.415    l10.586,10.586L31.293,48.294z M56.465,23.122l-1.172,1.172L44.707,13.708l1.172-1.172c0.563-0.563,1.316-0.874,2.121-0.874    s1.558,0.311,2.121,0.874l6.344,6.344C57.635,20.05,57.635,21.952,56.465,23.122z" fill="rgb(136, 136, 136,0.42)" /></g><rect fill="rgb(136, 136, 136,0.42)" height="30.552" transform="matrix(0.7071 0.7071 -0.7071 0.7071 36.6311 -18.9567)" width="1" x="40.698" y="19.463" /></g></svg>
                                        <h3 style={{ color: "rgb(136, 136, 136,0.90)" }}>Your notes are appear here</h3>
                                    </div>
                                    :
                                    <div className='text-center centerHome'>
                                        <svg enableBackground="new 0 0 32 32" height="250px" version="1.1" viewBox="0 0 32 32" width="250px" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M31.697,15.287  c-0.011-0.011-6.947-6.993-6.947-6.993c-0.203-0.203-0.47-0.298-0.735-0.291c-0.008,0-0.015-0.005-0.023-0.005h-23  c-0.88,0-1.32,1.109-0.705,1.727l6.242,6.295l-6.169,6.222C-0.305,22.859-0.009,24,1.203,23.998h22.78  c0.278,0.018,0.561-0.07,0.774-0.284l6.94-6.999C32.09,16.321,32.09,15.681,31.697,15.287z M23.626,21.991L3.439,21.997l5.21-5.254  c0.199-0.2,0.295-0.462,0.293-0.724c0.003-0.262-0.094-0.524-0.293-0.724L3.396,9.998h20.204l5.959,6.01L23.626,21.991z" fill="rgb(136, 136, 136,0.42)" fillRule="evenodd" id="Vintage_Luxury_Arrow_Right" /><g /><g /><g /><g /><g /><g /></svg>
                                        <h3 style={{ color: "rgb(136, 136, 136,0.90)" }}>No notes with this label yet</h3>
                                    </div>
                    }
                </div>
            </div>
        </>
    )
}
