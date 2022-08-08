import React from 'react';
import NoteContext from './NoteContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteState = (props) => {

    let location = useLocation()

    let navigate = useNavigate();

    const [mode,setMode] = useState("white");

    const [label, setLabel] = useState([]);

    const [navbarWidth, setNavbarWidth] = useState("unclick")

    const [note, setNote] = useState([]);

    const [initialFetchNotes, setInitialFetchNotes] = useState([]);

    const [initialFetchNotesForArchive, setInitialFetchNotesForArchive] = useState([]);

    //store archive notes of label
    const [labelArchiveNotes,setLabelArchiveNotes] = useState([]);

    const changeMode = () => {
        console.log(mode);
        if(mode === "white")
            setMode("dark");
        else
            setMode("white");
    }

    const changeSearchWords = (word) => {
        const find = initialFetchNotes.filter((storedNote) => {
            return (storedNote.title.toUpperCase().indexOf(word.toUpperCase())>=0 || storedNote.description.toUpperCase().indexOf(word.toUpperCase())>=0)?true:false;
        })
        // console.log(find);
        setNote(find);
    }

    const changeSearchWordsForLabelArchive = (word) => {
        const find = initialFetchNotesForArchive.filter((storedNote) => {
            return (storedNote.title.toUpperCase().indexOf(word.toUpperCase())>=0 || storedNote.description.toUpperCase().indexOf(word.toUpperCase())>=0)?true:false;
        })
        // console.log(find);
        setLabelArchiveNotes(find);
    }

    // const [withOutDelete, setWithOutDelete] = useState([]);
    // const [deletedNotes, setDeletedNotes] = useState([]);

    // const findWithOutDelete = (notes) => {
    //     const find = notes.filter((storedNote) => {
    //         return storedNote.deleted === false;
    //     })
    //     setWithOutDelete(find);
    // }

    // const findDeletedNotes = (notes) => {
    //     const find = notes.filter((storedNote) => {
    //         return storedNote.deleted === true;
    //     })
    //     setDeletedNotes(find);
    // }

    const changeNavbarWidth = () => {
        if (navbarWidth === "unclick")
            setNavbarWidth("click");
        else if (navbarWidth === "click")
            setNavbarWidth("unclick");
    }

    const getNotes = (currentTab) => {
        const url = `http://192.168.154.178:5000/api/note/readnote?fetch=${currentTab}`;
        // const url = `http://192.168.154.178:5000/api/note/readnote`;
        fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json();
        }).then((d) => {
            let notes = d;
            setNote(notes);
            setInitialFetchNotes(notes);
            // findWithOutDelete(notes);
            // findDeletedNotes(notes);
        })
    }

    const getArchiveNotesOfLabel = (currentTab) => {
        const url = `http://192.168.154.178:5000/api/note/readArchiveNote?fetch=${currentTab}`;
        // const url = `http://192.168.154.178:5000/api/note/readnote`;
        fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json();
        }).then((d) => {
            let notes = d;
            setLabelArchiveNotes(notes);
            setInitialFetchNotesForArchive(notes);
            // findWithOutDelete(notes);
            // findDeletedNotes(notes);
        })
    }

    const addNotes = (noteData,currentTab) => {
        const url = "http://192.168.154.178:5000/api/note/createnote";
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(noteData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            getNotes(currentTab);
        })
    }

    const updateNote = (updatedData, noteId, currentTab) => {
        console.log(updatedData);
        console.log(noteId);
        const url = `http://192.168.154.178:5000/api/note/updatenote/${noteId}`;
        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(updatedData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            getNotes(currentTab);
            getArchiveNotesOfLabel(currentTab);
        })
    }

    const updateManyNote = (updatedData,labelName,currentTab) => {
        console.log(updatedData);
        const updateFilterAndData = {
            data:updatedData,
            labelName:labelName
        }
        const url = `http://192.168.154.178:5000/api/note/updateManyNote`;
        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(updateFilterAndData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            getNotes(currentTab);
            getArchiveNotesOfLabel(currentTab);
        })
    }

    const deleteNote = (noteId,currentTab) => {
        const url = `http://192.168.154.178:5000/api/note/deletenote/${noteId}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            getNotes(currentTab);
            getArchiveNotesOfLabel(currentTab);
        })
    }

    const addUser = (userData,first,second,third,fourth) => {
        const url = "http://192.168.154.178:5000/api/user/signup";
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            if (d.success) {
                localStorage.setItem('token', d.token);
                localStorage.setItem("userName", d.name);
                localStorage.setItem("userEmail", d.email);
                first.value=second.value=third.value=fourth.value="";
                navigate("/");
            }
            else
            {
                toast(d.errors,{
                    position: toast.POSITION.BOTTOM_LEFT
                });
                toast.clearWaitingQueue();
            }
        })
    }

    const loginUser = (loginUserData,first,second) => {
        const url = "http://192.168.154.178:5000/api/user/login";
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUserData)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            if(d.success)
            {
                first.value=second.value = "";
                localStorage.setItem("token", d.token);
                localStorage.setItem("userName", d.name);
                localStorage.setItem("userEmail", d.email);
                localStorage.setItem("labels",d.labels);
                navigate("/");
            }
            else
            {
                toast(d.errors,{
                    position: toast.POSITION.BOTTOM_LEFT
                });
                toast.clearWaitingQueue();
            }
        })
    }

    const addUserLabel = (labelName,oldName) => {
        const url = "http://192.168.154.178:5000/api/user/createLabel";
        const lName = {
            labels: labelName,
            oldName:oldName
        }
        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(lName)
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            getLabels();
            if(location.pathname === `${labelName}`)
                navigate(`/${labelName}`);
        })
    }

    const getLabels = () => {
        const url = "http://192.168.154.178:5000/api/user/getuser";
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json();
        }).then((d) => {
            // console.log(d);
            localStorage.setItem("labels",d);
            setLabel(d);
            props.checkUserData();
        })
    }

    return (
        <NoteContext.Provider value={{ note, addNotes, getNotes, updateNote, deleteNote, label, navbarWidth, changeNavbarWidth, addUser, loginUser, addUserLabel, getLabels, getArchiveNotesOfLabel, labelArchiveNotes, updateManyNote, changeSearchWords, changeSearchWordsForLabelArchive, changeMode, mode}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;