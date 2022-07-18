import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const [note,setNote]=useState([]);
    const getNotes = () => {
        const url="http://localhost:5000/api/note/readnote";
        fetch(url,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2MwNGM0MGRiYTkyZmMyNmZlYmYxYyIsImlhdCI6MTY1NzUzNzc5M30.e6HCPqB2tRRb4kzH-1ZUeNzgBcvln2Hxpu9ALzYEpSc"
            }
        }).then((res) => {
            return res.json();
        }).then((d) => {
            let notes=d;
            setNote(notes);
        })
    }
    const addNotes = (noteData) => {
        const url = "http://localhost:5000/api/note/createnote";
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2MwNGM0MGRiYTkyZmMyNmZlYmYxYyIsImlhdCI6MTY1NzUzNzc5M30.e6HCPqB2tRRb4kzH-1ZUeNzgBcvln2Hxpu9ALzYEpSc"
            },
            body: JSON.stringify(noteData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            getNotes();
        })
    }

    const updateNote = (updatedData,noteId) => {
        console.log(updatedData);
        console.log(noteId);
        const url=`http://localhost:5000/api/note/updatenote/${noteId}`;
        fetch(url,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2MwNGM0MGRiYTkyZmMyNmZlYmYxYyIsImlhdCI6MTY1NzUzNzc5M30.e6HCPqB2tRRb4kzH-1ZUeNzgBcvln2Hxpu9ALzYEpSc"
            },
            body:JSON.stringify(updatedData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            getNotes();
        })
    }

    return(
        <NoteContext.Provider value={{note,addNotes,getNotes,updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;