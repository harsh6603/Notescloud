import React, { useRef, useContext, useState } from 'react'
import '../Navbar.css'
import { Link, useLocation } from "react-router-dom";
import NoteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {

    //Define location
    let location = useLocation();
    let currentTab = location.pathname;
    let onlyNameOfTab;
    if (currentTab === "/") {
        onlyNameOfTab = "Home";
    }
    else {
        onlyNameOfTab = currentTab.slice(1);
    }

    const [changebalContent, setChangebalContent] = useState("");

    const [storeInitialLabel, setStoreInitialLabel] = useState("");

    let navigate = useNavigate();

    let userName = localStorage.getItem("userName");
    let userEmail = localStorage.getItem("userEmail");
    let firstLetterOfUserName;

    if (localStorage.getItem("token")) {
        firstLetterOfUserName = userName.charAt(0).toLowerCase();
    }

    const refOfProfile = useRef(null);

    //for open modal for create new label
    const refOfCreateLabelModal = useRef(null);

    //for close modal for create new label
    const refOfCloseLabelModal = useRef(null);

    //for closing navbar after clicking on onther element
    const navBtn = useRef(null);

    //redirect to login page if press on login button in alert
    const redirect = () => {
        navigate("/login");
    }

    //custom login button inside toast
    const CloseButton = () => (
        <b
            className="material-icons"
            onClick={redirect}
        >
            Log In
        </b>
    );

    const addLabel = () => {
        if (localStorage.getItem("token")) {
            navigate("/");
            if(x.matches)
                closeNavbar();
            else
                navBtn.current.click();
            refOfCreateLabelModal.current.click();
        }
        else {
            toast("Please login for create new label.", {
                position: toast.POSITION.BOTTOM_LEFT,
                closeButton: CloseButton,
                containerId: "insideHome"
            });
            toast.clearWaitingQueue();
        }
    }

    let smallTag = document.getElementsByClassName("getSmall");

    //flag is false if button is clicked for opening navbar
    // const [flag, setFlag] = useState(true);

    // const [ulClass, setUlClass] = useState("vertical-ul");

    const closeNavbar = () => {
        const x = window.matchMedia("(max-width: 500px)");
        const myModalForList = document.getElementById("myModalForList");
        //for mobile view
        if (x.matches) {
            setTimeout(() => {
                myModalForList.style.display = "none";
            }, 300)
            const unorderedList = document.getElementById("unorderedList");
            unorderedList.classList.remove("vertical-ul1");
            unorderedList.classList.add("vertical-ul");
            for (let i = 0; i < smallTag.length; i++) {
                smallTag[i].classList.remove("navbarSmallDisplayVisible");
                smallTag[i].classList.add("navbarSmallDisplayNone");
            }
        }
    }

    //when click on add label
    const handleAddLabel = () => {
        const addLabel = document.getElementById("addLabel");
        context.addUserLabel(addLabel.value, null);
        addLabel.value = "";
        refOfCloseLabelModal.current.click();
    }

    // const expand = () => {
    //     if (flag) {
    //         console.log(smallTag);
    //         const ul = document.getElementById("unorderedList");
    //         console.log(ul.className);
    //         ul.classList.remove('vertical-ul');
    //         ul.classList.add('vertical-ul1');
    //         // setTimeout(() => {
    //         for (let i = 0; i < smallTag.length; i++) {
    //             smallTag[i].classList.remove("navbarSmallDisplayNone");
    //             smallTag[i].classList.add("navbarSmallDisplayVisible");
    //         }
    //         // },50)
    //         // setUlClass("vertical-ul1");
    //         console.log(ul.className);
    //     }
    // }

    // const reduce = () => {
    //     if (flag) {
    //         const ul = document.getElementById("unorderedList");
    //         console.log(ul.className);
    //         // setTimeout(() => {
    //         for (let i = 0; i < smallTag.length; i++) {
    //             smallTag[i].classList.remove("navbarSmallDisplayVisible");
    //             smallTag[i].classList.add("navbarSmallDisplayNone");
    //         }
    //         // },0)
    //         ul.classList.remove('vertical-ul1');
    //         ul.classList.add('vertical-ul');
    //         // setUlClass("vertical-ul");
    //         console.log(ul.className);
    //     }
    // }

    const callChangeNavbarWidth = () => {
        if (x.matches) {

            const myModalForList = document.getElementById("myModalForList");
            myModalForList.style.display = "block";

            const unorderedList = document.getElementById("unorderedList");
            unorderedList.classList.remove("vertical-ul");
            unorderedList.classList.add("vertical-ul1");

            setTimeout(() => {
                for (let i = 0; i < smallTag.length; i++) {
                    smallTag[i].classList.remove("navbarSmallDisplayNone");
                    smallTag[i].classList.add("navbarSmallDisplayVisible");
                }
            }, 150)
        }
        else {

            context.changeNavbarWidth();
            if (context.navbarWidth === "click") {
                // setFlag(true);
                // setUlClass("vertical-ul");
                console.log(smallTag);
                // setTimeout(() => {
                for (let i = 0; i < smallTag.length; i++) {
                    smallTag[i].classList.remove("navbarSmallDisplayVisible");
                    smallTag[i].classList.add("navbarSmallDisplayNone");
                }
                // },150)
            }
            else if (context.navbarWidth === "unclick") {
                // setFlag(false);
                // setUlClass("vertical-ul1")
                setTimeout(() => {
                    for (let i = 0; i < smallTag.length; i++) {
                        smallTag[i].classList.remove("navbarSmallDisplayNone");
                        smallTag[i].classList.add("navbarSmallDisplayVisible");
                    }
                }, 150)
            }
        }
    }

    // const liElement = document.getElementsByClassName("getElement");
    // for (let i = 0; i < liElement.length; i++) {
    //     liElement[i].addEventListener("click", changeClass, false);
    // }

    // function changeClass(e) {
    //     for (let i = 0; i < liElement.length; i++) {
    //         liElement[i].classList.remove("active");
    //         liElement[i].childNodes[0].classList.remove("active");
    //     }
    //     this.classList.add("active");
    //     this.childNodes[0].classList.add("active");
    //     console.log(this.childNodes[0]);
    // }

    // useEffect(() => {
    //     const smallTag = document.getElementsByClassName("navbarSmallDisplayNone");
    //     console.log(smallTag);
    //     if(ulClass === "vertical-ul1")
    //     {
    //         for(let i=0;i<smallTag.length;i++)
    //         {
    //             smallTag[i].style.visibility="visible";
    //         }
    //     }
    //     else if(ulClass === "vertical-ul")
    //     {
    //         for(let i=0;i<smallTag.length;i++)
    //         {
    //             // smallTag[i].style.visibility="hidden";
    //         }
    //     }
    // },[ulClass])

    //when user click on profile button
    const displayProfile = (e) => {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (e) {
        const modal = document.getElementById("myModal");
        const signoutBtn = document.getElementById("signoutBtn");
        const myModalForList = document.getElementById("myModalForList");

        //when user click on signout button
        if (signoutBtn) {
            signoutBtn.onclick = function () {
                modal.style.display = "none";
            }
        }
        if (e.target === modal) {
            modal.style.display = "none";
        }
        if (e.target === myModalForList) {
            setTimeout(() => {
                myModalForList.style.display = "none";
            }, 300)
            const unorderedList = document.getElementById("unorderedList");
            unorderedList.classList.remove("vertical-ul1");
            unorderedList.classList.add("vertical-ul");
            for (let i = 0; i < smallTag.length; i++) {
                smallTag[i].classList.remove("navbarSmallDisplayVisible");
                smallTag[i].classList.add("navbarSmallDisplayNone");
            }
        }
    }

    // // When the user clicks anywhere outside of the menu, close it
    // window.onclick = function (e) {
    //     const myModalForList = document.getElementById("myModalForList");

    //     if (e.target === myModalForList) {
    //         setTimeout(() => {
    //             myModalForList.style.display = "none";
    //         }, 300)
    //         const unorderedList = document.getElementById("unorderedList");
    //         unorderedList.classList.remove("vertical-ul1");
    //         unorderedList.classList.add("vertical-ul");
    //         for (let i = 0; i < smallTag.length; i++) {
    //             smallTag[i].classList.remove("navbarSmallDisplayVisible");
    //             smallTag[i].classList.add("navbarSmallDisplayNone");
    //         }
    //     }
    // }

    const handleSignOut = () => {
        console.log("Inside logout")
        localStorage.clear();
        navigate("/");
    }

    const inputElement = document.getElementsByClassName("getLabelName");
    // console.log(inputElement);

    function changeStyleDiv(e) {
        // console.log(e.target);
        for (let i = 0; i < inputElement.length; i++) {
            inputElement[i].classList.remove("withBorder");
            inputElement[i].classList.add("borderNone");
            inputElement[i].parentElement.children[2].classList.remove("fa-check");
            inputElement[i].parentElement.children[2].classList.add("fa-pen");
            inputElement[i].parentElement.children[0].classList.remove("smallTagNone");
            inputElement[i].parentElement.children[0].classList.add("smallTag");
        }
        // console.log(e.target.parentElement.parentElement.children[1].id);
        console.log(e.target.children[0])
        setChangebalContent(e.target.children[0].value);
        setStoreInitialLabel(e.target.children[0].value);
        e.target.children[0].classList.add("smallTagNone");
        e.target.children[1].classList.add("withBorder");
        e.target.children[2].classList.remove("fa-pen");
        e.target.children[2].classList.add("fa-check");
    }

    function changeStyleSmallTag(e) {
        // console.log(e.target);
        for (let i = 0; i < inputElement.length; i++) {
            inputElement[i].classList.remove("withBorder");
            inputElement[i].classList.add("borderNone");
            inputElement[i].parentElement.children[2].classList.remove("fa-check");
            inputElement[i].parentElement.children[2].classList.add("fa-pen");
            inputElement[i].parentElement.children[0].classList.remove("smallTagNone");
            inputElement[i].parentElement.children[0].classList.add("smallTag");
        }
        // console.log(e.target.parentElement.parentElement.children[1].id);
        setChangebalContent(e.target.value);
        setStoreInitialLabel(e.target.value);
        e.target.parentElement.children[0].classList.add("smallTagNone");
        e.target.parentElement.children[1].classList.add("withBorder");
        e.target.parentElement.children[2].classList.remove("fa-pen");
        e.target.parentElement.children[2].classList.add("fa-check");
    }

    function changeStyleInputTag(e) {
        // console.log(e.target);
        for (let i = 0; i < inputElement.length; i++) {
            inputElement[i].classList.remove("withBorder");
            inputElement[i].classList.add("borderNone");
            inputElement[i].parentElement.children[2].classList.remove("fa-check");
            inputElement[i].parentElement.children[2].classList.add("fa-pen");
            inputElement[i].parentElement.children[0].classList.remove("smallTagNone");
            inputElement[i].parentElement.children[0].classList.add("smallTag");
        }
        // console.log(e.target.parentElement.parentElement.children[1].id);
        setChangebalContent(e.target.value);
        setStoreInitialLabel(e.target.value);
        e.target.parentElement.children[0].classList.add("smallTagNone");
        e.target.parentElement.children[1].classList.add("withBorder");
        e.target.parentElement.children[2].classList.remove("fa-pen");
        e.target.parentElement.children[2].classList.add("fa-check");
    }

    function changeStyleEditIcon(e) {
        // console.log(e.target.classList.contains("fa-pen"));
        if (e.target.classList.contains("fa-pen")) {
            for (let i = 0; i < inputElement.length; i++) {
                inputElement[i].classList.remove("withBorder");
                inputElement[i].classList.add("borderNone");
                inputElement[i].parentElement.children[2].classList.remove("fa-check");
                inputElement[i].parentElement.children[2].classList.add("fa-pen");
                inputElement[i].parentElement.children[0].classList.remove("smallTagNone");
                inputElement[i].parentElement.children[0].classList.add("smallTag");
            }
            // console.log(e.target.parentElement.parentElement.children[1].id);
            setChangebalContent(e.target.parentElement.children[0].value);
            setStoreInitialLabel(e.target.parentElement.children[0].value);
            e.target.parentElement.children[0].classList.add("smallTagNone");
            e.target.parentElement.children[1].classList.add("withBorder");
            e.target.parentElement.children[2].classList.remove("fa-pen");
            e.target.parentElement.children[2].classList.add("fa-check");
        }
        else {
            updateLabel(e);
        }
    }

    const callChange = (e) => {
        // console.log(e.target.value);
        setChangebalContent(e.target.value);
    }

    const updateLabel = (e) => {
        // console.log(e.target.parentElement.children[1].value);
        const newName = e.target.parentElement.children[1].value;
        context.addUserLabel(newName, storeInitialLabel);
        const updatedData = {
            label: newName,
        }
        context.updateManyNote(updatedData, storeInitialLabel, onlyNameOfTab);
        refOfCloseLabelModal.current.click();
    }

    const deleteLabel = (e) => {
        const labelName = e.target.parentElement.parentElement.children[2].children[1];
        // console.log(labelName.value);
        context.addUserLabel(labelName.value, "Delete");
        const updatedData = {
            label: "false",
            restoreDate: new Date()
        }
        context.updateManyNote(updatedData, labelName.value, onlyNameOfTab);
        refOfCloseLabelModal.current.click();
    }

    const storeSearchWords = () => {
        const search = document.getElementById("search");
        context.changeSearchWords(search.value);
        context.changeSearchWordsForLabelArchive(search.value);
    }

    //State for dark and light mode cicle icon
    const [circle, setCircle] = useState("left");
    const shiftCircle = () => {
        if (circle === "right")
            setCircle("left");
        else
            setCircle("right");
        context.changeMode();
    }

    const x = window.matchMedia("(max-width: 500px)");

    const context = useContext(NoteContext);

    return (
        <div>
            <nav style={{ zIndex: "1", borderBottom: "1px solid rgb(211,211,211)" }} className={`navbar navbar-expand-lg navbar-dark fixed-top ${(context.mode === "white") ? "lightTheme" : "darkTheme"}`}>
                {/* <button ref={navBtn} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                <div className="nav-item mx-3">
                    <i ref={navBtn} className="fa-solid fa-bars" style={{ cursor: "pointer", fontSize: "20px", color: (context.mode === "white") ? "black" : "white" }} onClick={callChangeNavbarWidth}></i>
                </div>

                <h6 className={`${(context.mode === "white") ? "text-dark" : "text-white"} currentTab`}>{(onlyNameOfTab === "archive") ? "Archive" : (onlyNameOfTab === "trash") ? "Trash" : (onlyNameOfTab === "Home") ? "Notes" : onlyNameOfTab}</h6>

                {/* <div className='borderSet'>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div> */}
                {!x.matches &&
                    <div className={`${(context.mode === "white") ? "search" : "searchDark"}`}>
                        <i id="searchIcon" className="fa fa-search searchIcon" aria-hidden="true"></i>
                        <input autoComplete='off' className={`${(context.mode === "white") ? "styleInputSearchLight" : "styleInputSearchDark"}`} type="text" id="search" placeholder="Search . . ." onInput={storeSearchWords} />
                    </div>
                }
                {/* <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={context.changeMode} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch</label>
                </div> */}
                <div className='mainBoxForSwitch'>
                    <div className='subBoxForSwitch'>
                        <svg className='sunIcon' data-name="Layer 1" height="18px" width="18px" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title /><circle className="cls-1" cx="32" cy="32" r="17" /><line className="cls-2" x1="32" x2="32" y1="5" y2="11" /><line className="cls-2" x1="32" x2="32" y1="53" y2="59" /><line className="cls-2" x1="59" x2="53" y1="32" y2="32" /><line className="cls-2" x1="11" x2="5" y1="32" y2="32" /><line className="cls-2" x1="51.09" x2="46.85" y1="12.91" y2="17.15" /><line className="cls-2" x1="17.15" x2="12.91" y1="46.85" y2="51.09" /><line className="cls-2" x1="51.09" x2="46.85" y1="51.09" y2="46.85" /><line className="cls-2" x1="17.15" x2="12.91" y1="17.15" y2="12.91" /></svg>
                        <svg className='moonIcon' data-name="Layer 1" height="18px" width="18px" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44.54,41.47A23,23,0,0,1,24.49,11.73,1,1,0,0,0,23,10.59,23,23,0,1,0,54.41,42a1,1,0,0,0-1.14-1.47A23.06,23.06,0,0,1,44.54,41.47Z" /></svg>
                        <i style={{ cursor: "pointer", color: (context.mode === "white") ? "#c1c1c1" : "#c1c1c1" }} id="switchCircle" className={`fa-solid fa-circle ${(circle === "right") ? "circleRight" : "circleLeft"}`} onClick={shiftCircle}></i>
                    </div>
                </div>
                {
                    (localStorage.getItem("token")) ?
                        <div ref={refOfProfile} id="clickedProfile" className="borderSet2" style={{ cursor: "pointer" }} onClick={displayProfile}>
                            <i id="clickedProfile" style={{ cursor: "pointer", color: "white", fontWeight: "bolder", fontSize: "16px" }} className={`fa-solid fa-${(firstLetterOfUserName) && firstLetterOfUserName.toLowerCase()}`} aria-hidden="true"></i>
                        </div> :
                        <div className="borderSet1">
                            <Link style={{ cursor: "pointer" }} to="/login"><i className="fa fa-user-circle" aria-hidden="true"></i></Link>
                        </div>
                }
                {/* <div className="collapse navbar-collapse bg-dark" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto" id="unordered">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/') ? "active" : ""}`} to="/" onClick={closeNavbar} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/about') ? "active" : ""}`} to="/about" onClick={closeNavbar} >About</Link>
                        </li>
                        <li className="nav-item">
                            <small style={{ cursor: "pointer" }} className='nav-link' id="createLabel" onClick={addLabel} >Edit label</small>
                        </li>
                        {(context.label) && context.label.map((storedLabel) => {
                            return <li className='nav-item' key={storedLabel}>
                                <Link className='nav-link' to={`/${storedLabel}`} onClick={closeNavbar} >{storedLabel}</Link>
                            </li>
                        })}
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/trash') ? "active" : ""}`} to="/trash" onClick={closeNavbar} >Trash</Link>
                        </li>
                    </ul>
                </div> */}
            </nav>

            {
                x.matches &&
                <div className={`blankDiv3 ${(context.mode === "white") ? "lightTheme" : "darkTheme"}`}>

                </div>
            }

            {/* //for mobile view  */}
            {x.matches &&
                <div className={`${(context.mode === "white") ? "lightTheme" : "darkTheme"}`} >
                    <div className={`search ${(context.mode === "white") ? "search" : "searchDark"}`}>
                        <i id="searchIcon" className="fa fa-search searchIcon" aria-hidden="true"></i>
                        <input autoComplete='off' className={`${(context.mode === "white") ? "styleInputSearchLight" : "styleInputSearchDark"}`} type="text" id="search" placeholder="Search . . ." onInput={storeSearchWords} />
                    </div>
                </div>
            }

            {/* <!-- Button trigger modal of edit label --> */}
            <button style={{ display: "none" }} ref={refOfCreateLabelModal} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createLabelModal">
                Launch demo modal
            </button>

            {/* <!-- Modal for edit labels --> */}
            <div className="modal fade" id="createLabelModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit labels</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input className='addLabelModal' placeholder='Enter label name' type="text" id='addLabel' name='addLabel' />
                            {
                                (context.label && localStorage.getItem("token")) &&
                                context.label.map((storedLabel) => {
                                    return <div id="labels" key={storedLabel} className='d-flex justify-content-start my-3'>

                                        <div id="withLabel">
                                            <svg style={{ cursor: "pointer", marginRight: "10px" }} enableBackground="new 0 0 32 32" height="25px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M31.697,15.287  c-0.011-0.011-6.947-6.993-6.947-6.993c-0.203-0.203-0.47-0.298-0.735-0.291c-0.008,0-0.015-0.005-0.023-0.005h-23  c-0.88,0-1.32,1.109-0.705,1.727l6.242,6.295l-6.169,6.222C-0.305,22.859-0.009,24,1.203,23.998h22.78  c0.278,0.018,0.561-0.07,0.774-0.284l6.94-6.999C32.09,16.321,32.09,15.681,31.697,15.287z M23.626,21.991L3.439,21.997l5.21-5.254  c0.199-0.2,0.295-0.462,0.293-0.724c0.003-0.262-0.094-0.524-0.293-0.724L3.396,9.998h20.204l5.959,6.01L23.626,21.991z" fill="rgb(99,99,99)" fillRule="evenodd" id="Vintage_Luxury_Arrow_Right" /><g /><g /><g /><g /><g /><g /></svg>
                                            {/* <small style={{ marginLeft: "20px" }}>{storedLabel}</small> */}
                                        </div>
                                        {/* withSelete class is assign when mouse is hover on the div  */}
                                        <div id="withDelete">
                                            <i style={{ paddingRight: "21px", cursor: "pointer", color: "rgb(99,99,99)" }} className="fa-solid fa-trash" onClick={deleteLabel}></i>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{ width: "100%" }} onClick={changeStyleDiv}>
                                            <small className="smallTag" onClick={(e) => { changeStyleSmallTag(e); e.stopPropagation() }}>{storedLabel}</small>
                                            <input className='borderNone getLabelName' type="text" value={changebalContent ? changebalContent : storedLabel} id="labelName" name="labelName" onClick={(e) => { changeStyleInputTag(e); e.stopPropagation() }} onInput={callChange} />
                                            <i style={{ cursor: "pointer", color: "rgb(99,99,99)", outline: "none", marginTop: "5px" }} className="fa-solid fa-pen" onClick={(e) => { changeStyleEditIcon(e); e.stopPropagation() }}></i>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button style={{ display: "none" }} ref={refOfCloseLabelModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark" onClick={handleAddLabel} >Add Label</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                (onlyNameOfTab === "archive" || onlyNameOfTab === "trash") &&
                <div className={`blankDiv2 ${(context.mode === "white") ? "lightTheme" : "darkTheme"}`}>

                </div>
            }

            {
                x.matches
                    ?
                    <>
                        {/* we have set modaal in background such that diplay block occur for modal only  */}
                        <div id="myModalForList" className="modalForVericalNavbar">

                        </div>
                        <ul id="unorderedList" style={{ marginTop: (x.matches) ? ((onlyNameOfTab === "archive" || onlyNameOfTab === "trash")) ? (localStorage.getItem("token")) ? "-36%" : "-36%" : (localStorage.getItem("token")) ? "-34%" : "-34%" : "" }} className={`${(context.mode === "white") ? "lightTheme" : "darkTheme"} ${(context.navbarWidth === "unclick") ? "vertical-ul" : "vertical-ul1"}`}>
                            {/* <li>
                                <Link to="/">
                                    <i className="fa-solid fa-bars marginRightIcon"></i>
                                </Link>
                            </li> */}
                            <li style={{padding:"20px",paddingBottom:"5px",color:(context.mode === "white")?"black":"white"}}>
                                <h5>Notescloud</h5>
                            </li>
                            <li className={`${(location.pathname === '/') ? "active" : ""}`} onClick={closeNavbar}>
                                <Link className={`setIcon ${(location.pathname === '/') ? "active" : ""}`} to="/">
                                    {(context.mode === "white")
                                        ?
                                        <svg className='marginRight' height="25px" version="1.1" width="25px" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m2 4v13.531 2.469c0 1.105 0.8954 2 2 2h4 8l6-6v-12h-20z" fill={`${(onlyNameOfTab === "Home") ? "white" : "rgb(221, 218, 218)"}`} transform="translate(0 1028.4)" /><g fill={`${(onlyNameOfTab === "Home") ? "black" : "rgb(117, 109, 109)"}`}><path d="m5 9v1h14v-1h-14zm0 3v1h14v-1h-14zm0 3v1h7v-1h-7z" transform="translate(0 1028.4)" /><path d="m22 1044.4-6 6v-4c0-1.1 0.895-2 2-2h4z" /><path d="m2 1033.4v-1c0-1.1 0.8954-2 2-2h4 8 4c1.105 0 2 0.9 2 2v1h-20z" /></g></g></svg>
                                        :
                                        <svg className='marginRight' height="25px" version="1.1" width="25px" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m2 4v13.531 2.469c0 1.105 0.8954 2 2 2h4 8l6-6v-12h-20z" fill={`${(onlyNameOfTab === "Home") ? "white" : "#666666"}`} transform="translate(0 1028.4)" /><g fill={`${(onlyNameOfTab === "Home") ? "black" : "rgb(156, 156, 156)"}`}><path d="m5 9v1h14v-1h-14zm0 3v1h14v-1h-14zm0 3v1h7v-1h-7z" transform="translate(0 1028.4)" /><path d="m22 1044.4-6 6v-4c0-1.1 0.895-2 2-2h4z" /><path d="m2 1033.4v-1c0-1.1 0.8954-2 2-2h4 8 4c1.105 0 2 0.9 2 2v1h-20z" /></g></g></svg>
                                    }
                                    {/* {(ulClass === "vertical-ul1")?"Notes":""} */}
                                    <small className='getSmall navbarSmallDisplayNone'>Notes</small>
                                </Link>
                            </li>
                            <li className={`${(location.pathname === '/add') ? "active" : ""}`} onClick={addLabel}>
                                {/* <Link className={`${(location.pathname === '/add') ? "active" : ""}`} to="/"> */}
                                <i className="fa-solid fa-pen marginRightAddIcon"></i>
                                <small style={{ cursor: "pointer", fontWeight: 700, color: "rgb(117, 109, 109)" }} className="getSmall navbarSmallDisplayNone">Edit Label</small>
                                {/* </Link> */}
                                {/* <small style={{ cursor: "pointer" }} className='nav-link' id="createLabel" onClick={addLabel} >Add label</small> */}
                            </li>
                            {(context.label && localStorage.getItem("token")) && context.label.map((storedLabel) => {

                                return <li className={`${(location.pathname === `/${storedLabel}`) ? "active" : ""}`} key={storedLabel} onClick={closeNavbar}>
                                    <Link className={`setIcon ${(location.pathname === `/${storedLabel}`) ? "active" : ""}`} to={`/${storedLabel}`}>
                                        <svg className='marginRight' enableBackground="new 0 0 32 32" height="25px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M31.697,15.287  c-0.011-0.011-6.947-6.993-6.947-6.993c-0.203-0.203-0.47-0.298-0.735-0.291c-0.008,0-0.015-0.005-0.023-0.005h-23  c-0.88,0-1.32,1.109-0.705,1.727l6.242,6.295l-6.169,6.222C-0.305,22.859-0.009,24,1.203,23.998h22.78  c0.278,0.018,0.561-0.07,0.774-0.284l6.94-6.999C32.09,16.321,32.09,15.681,31.697,15.287z M23.626,21.991L3.439,21.997l5.21-5.254  c0.199-0.2,0.295-0.462,0.293-0.724c0.003-0.262-0.094-0.524-0.293-0.724L3.396,9.998h20.204l5.959,6.01L23.626,21.991z" fill="gray" fillRule="evenodd" id="Vintage_Luxury_Arrow_Right" /><g /><g /><g /><g /><g /><g /></svg>
                                        {/* {(ulClass === "vertical-ul1")?storedLabel:""} */}
                                        <small className="getSmall navbarSmallDisplayNone">{storedLabel}</small>
                                    </Link>
                                </li>
                            })}
                            <li className={`${(location.pathname === `/archive`) ? "active" : ""}`} onClick={closeNavbar}>
                                <Link className={`setIcon ${(location.pathname === `/archive`) ? "active" : ""}`} to="/archive">
                                    <svg className='marginRight' fill={`${(onlyNameOfTab === `archive`) ? "#433d3d" : "rgb(117, 109, 109)"}`} height="25px" viewBox="0 0 24 24" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z" /><path d="M14 9h-4v3H7l5 5 5-5h-3z" /></svg>
                                    {/* {(ulClass === "vertical-ul1")?"Archive":""} */}
                                    <small className="getSmall navbarSmallDisplayNone">Archive</small>
                                </Link>
                            </li>
                            <li className={`${(location.pathname === '/trash') ? "active" : ""}`} onClick={closeNavbar}>
                                <Link className={`${(location.pathname === '/trash') ? "active" : ""}`} to="/trash">
                                    <i style={{ fontSize: "20px" }} className="fa fa-trash-o marginRightIcon" aria-hidden="true"></i>
                                    {/* {(ulClass === "vertical-ul1")?"Trash":""} */}
                                    <small className="getSmall navbarSmallDisplayNone">Trash</small>
                                </Link>
                            </li>
                        </ul>
                    </>
                    :

                    <ul id="unorderedList" style={{ marginTop: (x.matches) ? ((onlyNameOfTab === "archive" || onlyNameOfTab === "trash")) ? (localStorage.getItem("token")) ? "-21%" : "-19%" : (localStorage.getItem("token")) ? "-19%" : "-17%" : "" }} className={`${(context.mode === "white") ? "lightTheme" : "darkTheme"} ${(context.navbarWidth === "unclick") ? "vertical-ul" : "vertical-ul1"}`}>
                        {/* <li>
                            <Link to="/">
                                <i className="fa-solid fa-bars marginRightIcon"></i>
                            </Link>
                        </li> */}
                        <li className={`${(location.pathname === '/') ? "active" : ""}`} onClick={closeNavbar}>
                            <Link className={`setIcon ${(location.pathname === '/') ? "active" : ""}`} to="/">
                                {(context.mode === "white")
                                    ?
                                    <svg className='marginRight' height="25px" version="1.1" width="25px" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m2 4v13.531 2.469c0 1.105 0.8954 2 2 2h4 8l6-6v-12h-20z" fill={`${(onlyNameOfTab === "Home") ? "white" : "rgb(221, 218, 218)"}`} transform="translate(0 1028.4)" /><g fill={`${(onlyNameOfTab === "Home") ? "black" : "rgb(117, 109, 109)"}`}><path d="m5 9v1h14v-1h-14zm0 3v1h14v-1h-14zm0 3v1h7v-1h-7z" transform="translate(0 1028.4)" /><path d="m22 1044.4-6 6v-4c0-1.1 0.895-2 2-2h4z" /><path d="m2 1033.4v-1c0-1.1 0.8954-2 2-2h4 8 4c1.105 0 2 0.9 2 2v1h-20z" /></g></g></svg>
                                    :
                                    <svg className='marginRight' height="25px" version="1.1" width="25px" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m2 4v13.531 2.469c0 1.105 0.8954 2 2 2h4 8l6-6v-12h-20z" fill={`${(onlyNameOfTab === "Home") ? "white" : "#666666"}`} transform="translate(0 1028.4)" /><g fill={`${(onlyNameOfTab === "Home") ? "black" : "rgb(156, 156, 156)"}`}><path d="m5 9v1h14v-1h-14zm0 3v1h14v-1h-14zm0 3v1h7v-1h-7z" transform="translate(0 1028.4)" /><path d="m22 1044.4-6 6v-4c0-1.1 0.895-2 2-2h4z" /><path d="m2 1033.4v-1c0-1.1 0.8954-2 2-2h4 8 4c1.105 0 2 0.9 2 2v1h-20z" /></g></g></svg>
                                }
                                {/* {(ulClass === "vertical-ul1")?"Notes":""} */}
                                <small className='getSmall navbarSmallDisplayNone'>Notes</small>
                            </Link>
                        </li>
                        <li className={`${(location.pathname === '/add') ? "active" : ""}`} onClick={addLabel}>
                            {/* <Link className={`${(location.pathname === '/add') ? "active" : ""}`} to="/"> */}
                            <i className="fa-solid fa-pen marginRightAddIcon"></i>
                            <small style={{ cursor: "pointer", fontWeight: 700, color: "rgb(117, 109, 109)" }} className="getSmall navbarSmallDisplayNone">Edit Label</small>
                            {/* </Link> */}
                            {/* <small style={{ cursor: "pointer" }} className='nav-link' id="createLabel" onClick={addLabel} >Add label</small> */}
                        </li>
                        {(context.label && localStorage.getItem("token")) && context.label.map((storedLabel) => {

                            return <li className={`${(location.pathname === `/${storedLabel}`) ? "active" : ""}`} key={storedLabel} onClick={closeNavbar}>
                                <Link className={`setIcon ${(location.pathname === `/${storedLabel}`) ? "active" : ""}`} to={`/${storedLabel}`}>
                                    <svg className='marginRight' enableBackground="new 0 0 32 32" height="25px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M31.697,15.287  c-0.011-0.011-6.947-6.993-6.947-6.993c-0.203-0.203-0.47-0.298-0.735-0.291c-0.008,0-0.015-0.005-0.023-0.005h-23  c-0.88,0-1.32,1.109-0.705,1.727l6.242,6.295l-6.169,6.222C-0.305,22.859-0.009,24,1.203,23.998h22.78  c0.278,0.018,0.561-0.07,0.774-0.284l6.94-6.999C32.09,16.321,32.09,15.681,31.697,15.287z M23.626,21.991L3.439,21.997l5.21-5.254  c0.199-0.2,0.295-0.462,0.293-0.724c0.003-0.262-0.094-0.524-0.293-0.724L3.396,9.998h20.204l5.959,6.01L23.626,21.991z" fill="gray" fillRule="evenodd" id="Vintage_Luxury_Arrow_Right" /><g /><g /><g /><g /><g /><g /></svg>
                                    {/* {(ulClass === "vertical-ul1")?storedLabel:""} */}
                                    <small className="getSmall navbarSmallDisplayNone">{storedLabel}</small>
                                </Link>
                            </li>
                        })}
                        <li className={`${(location.pathname === `/archive`) ? "active" : ""}`} onClick={closeNavbar}>
                            <Link className={`setIcon ${(location.pathname === `/archive`) ? "active" : ""}`} to="/archive">
                                <svg className='marginRight' fill={`${(onlyNameOfTab === `archive`) ? "#433d3d" : "rgb(117, 109, 109)"}`} height="25px" viewBox="0 0 24 24" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z" /><path d="M14 9h-4v3H7l5 5 5-5h-3z" /></svg>
                                {/* {(ulClass === "vertical-ul1")?"Archive":""} */}
                                <small className="getSmall navbarSmallDisplayNone">Archive</small>
                            </Link>
                        </li>
                        <li className={`${(location.pathname === '/trash') ? "active" : ""}`} onClick={closeNavbar}>
                            <Link className={`${(location.pathname === '/trash') ? "active" : ""}`} to="/trash">
                                <i style={{ fontSize: "20px" }} className="fa fa-trash-o marginRightIcon" aria-hidden="true"></i>
                                {/* {(ulClass === "vertical-ul1")?"Trash":""} */}
                                <small className="getSmall navbarSmallDisplayNone">Trash</small>
                            </Link>
                        </li>
                    </ul>
            }

            {/* profile button  */}
            <div id="myModal" className="modalForProfile">
                <div id="profile" className="profileDivShow">
                    <div className='iconUnderProfile'>
                        <i style={{ color: "white", fontWeight: "bolder", fontSize: "50px" }} className={`fa-solid fa-${firstLetterOfUserName}`} aria-hidden="true"></i>
                    </div>
                    <div>
                        <h5>{userName}</h5>
                        <h6 style={{ color: "rgb(117, 109, 109)" }}>{userEmail}</h6>
                    </div>
                    <hr />
                    <div>
                        <button id="signoutBtn" className='signOutBtn' onClick={handleSignOut}>Sign out</button>
                    </div>
                </div>
            </div>
            <ToastContainer enableMultiContainer containerId={"outsideHome"} pauseOnFocusLoss={false} limit={1} toastStyle={{ backgroundColor: "black", color: "white" }} icon={false} hideProgressBar />
        </div >
    )
}
