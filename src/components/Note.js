import React from 'react'
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import "../Note.css"

export default function Note(props) {

    const context = useContext(NoteContext);

    let location = useLocation();
    const x = window.matchMedia("(max-width: 500px)");

    const { notes, deleteNote, archiveNote, unArchiveNote, foreverDeleteNote, restoreNote, labelArchive, copyNote } = props;
    // console.log(!x.matches);
    return (
        <>
            <div id="cards" className={`card ${(context.mode === "white")?"card":"cardBlack"}`}>
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    {(notes.label !== "false") && <span className={`badge ${(context.mode === "white")?"text-bg-dark":"text-bg-light"} mb-3`}>{notes.label}</span>}
                    {
                        (location.pathname !== "/trash") ?
                            (x.matches !== true) &&
                            <div className="d-flex justify-content-start">
                                <div id="option">
                                    <i style={{ cursor: "pointer", fontSize: "16px",color:(context.mode === "white")?"black":"white"}} id="delete" title="Delete" className="fa fa-trash-o" onClick={(e) => { deleteNote(notes._id); e.stopPropagation(); }} ></i>
                                </div>
                                {(location.pathname !== "/archive") ?
                                    (!labelArchive)
                                        ?
                                        <div title='Archive' id="option" className='setArchive' onClick={(e) => { archiveNote(notes._id); e.stopPropagation(); }}>
                                            <svg fill={`${(context.mode === "white")?"black":"white"}`} height="21px" viewBox="0 0 24 24" width="21px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z" /><path d="M14 9h-4v3H7l5 5 5-5h-3z" /></svg>
                                        </div>
                                        :
                                        //display unarchive in label archive
                                        <div title='Unarchive' id="option" className='setArchive' onClick={(e) => { unArchiveNote(notes._id); e.stopPropagation(); }}>
                                            <svg fill={`${(context.mode === "white")?"black":"white"}`} height="21px" viewBox="0 0 24 24" width="21px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z"/><path d="M7 14h3v3h4v-3h3l-5-5z"/></svg>
                                        </div>
                                    : <div title='Unarchive' id="option" className='setArchive' onClick={(e) => { unArchiveNote(notes._id); e.stopPropagation(); }}>
                                        <svg fill={`${(context.mode === "white")?"black":"white"}`} height="21px" viewBox="0 0 24 24" width="21px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z"/><path d="M7 14h3v3h4v-3h3l-5-5z"/></svg>
                                    </div>
                                }
                                <div id="option">
                                    <i style={{ cursor: "pointer", fontSize: "16px", color:(context.mode === "white")?"black":"white" }} id="copy" title="Copy Note" className="fa-regular fa-clone" onClick={(e) => { copyNote(notes); e.stopPropagation(); }} ></i>
                                </div>
                            </div>
                            :
                            (x.matches !== true) &&
                            <div className="d-flex justify-content-start">
                                <div id="option">
                                    <i style={{ cursor: "pointer", fontSize: "16px", color:(context.mode === "white")?"black":"white" }} id="delete" title="Delete Forever" className="fa fa-trash-o" onClick={(e) => { foreverDeleteNote(notes._id); e.stopPropagation(); }} ></i>
                                </div>
                                <div id="option">
                                    <i style={{ cursor: "pointer", fontSize: "16px", color:(context.mode === "white")?"black":"white" }} id="restore" title="Restore Note" className="fa-solid fa-trash-arrow-up" onClick={(e) => { restoreNote(notes._id); e.stopPropagation(); }}></i>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}
