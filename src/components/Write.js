import Masonry from 'react-masonry-css'
import React from 'react'
import { useRef, useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import noteContext from '../context/NoteContext';
import "../Home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

export default function Write() {

    //progress for loading bar
    const [progress, setProgress] = useState(0);

    //state for storing aws urls
    const [awsUrl, setAwsUrl] = useState([]);

    //store url of images
    const [images, setImages] = useState([]);

    //reference of file input
    const inputFile = useRef(null);

    const textareaBtn = useRef(null);

    const submitBtn = useRef(null);

    const navigate = useNavigate();

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

    const context = useContext(noteContext);

    //State for display all title,tag and description in note
    const [toggle, setToggle] = useState("close");

    const redirect = () => {
        navigate("/login");
    }

    const CloseButton = () => (
        <b
            className="material-icons"
            onClick={redirect}
        >
            Log In
        </b>
    );

    const openNote = () => {
        console.log("openNote");
        if (localStorage.getItem("token")) {
            document.getElementById('mainBox').classList.remove('mainBox');
            document.getElementById('mainBox').classList.add('mainBox1');
            // console.log(e.target.parentElement.parentElement);
            setToggle("open");
        }
        else {
            toast("Please login for write a note.", {
                position: toast.POSITION.BOTTOM_LEFT,
                closeButton: CloseButton,
                containerId: "insideHome"
            });
            toast.clearWaitingQueue();
            // navigate("/login");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const elementTitle = document.getElementById("title");
        const elementTag = document.getElementById("tag");
        const elementDescription = document.getElementById("description");

        const title = elementTitle.value;
        const tag = elementTag.value;
        const description = elementDescription.value;

        elementTitle.value = elementTag.value = elementDescription.value = "";
        if (title.length !== 0) {
            let noteData;
            if (onlyNameOfTab === "Home" || onlyNameOfTab === "trash" || onlyNameOfTab === "archive" || onlyNameOfTab === "about") {
                noteData = {
                    title: title,
                    tag: tag,
                    description: description
                }
            }
            else {
                noteData = {
                    title: title,
                    tag: tag,
                    description: description,
                    label: onlyNameOfTab
                }
            }

            context.addNotes(noteData, onlyNameOfTab);
        }
        elementDescription.addEventListener("click", OnInput1, false);
        textareaBtn.current.click();
        document.getElementById('mainBox').classList.remove('mainBox1');
        document.getElementById('mainBox').classList.add('mainBox');
        // console.log(document.getElementById('mainBox'));
        setToggle("close");

    }

    const setArea = () => {
        const tx = document.getElementById("description");
        tx.addEventListener("input", OnInput, false);
    }

    function OnInput1() {
        this.style.height = "45px";
    }

    function OnInput(e) {
        // console.log(">>>>>" + this.scrollHeight);
        this.style.height = "45px";
        this.style.height = (this.scrollHeight) + "px";
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("You clicked outside of me!");
                    submitBtn.current.click();
                    // handleSubmit()
                    // document.getElementById('mainBox').classList.remove('mainBox1');
                    // document.getElementById('mainBox').classList.add('mainBox');

                    // setToggle("close");
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const getSignedRequest = (file) => {
        console.log("getSignedRequest called");
        encodeURIComponent(file.name);
        encodeURIComponent(file.type);
        fetch(`api/note/sign-s3?file-name=${file.name}&file-type=${file.type}`)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
                    alert('Could not get signed URL.');
                }
            }).then((data) => {
                console.log(data);
                setProgress(50);
                uploadFile(file, data.signedRequest, data.url);
                console.log("after calling uploadfile");
            })
    }

    const uploadFile = (file, signedRequest, url) => {
        console.log("uploadFile called.")
        const xhr = new XMLHttpRequest();
        setProgress(80);
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    // document.getElementById('preview').src = url;
                    // document.getElementById('avatar-url').value = url;
                    setAwsUrl(awsUrl.concat(url));
                    setProgress(100);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }

    const onFileChange = (e) => {
        console.log("after calling getSignedRequest");
        
        Array.from(e.target.files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages(images.concat(e.target.result))
            };
            reader.readAsDataURL(file);
        });

        console.log("Init called");
        // document.getElementById('preview').src = "/images/Loading_icon.gif";
        const files = document.getElementById('file-input').files;
        const file = files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        setProgress(10);
        getSignedRequest(file);
    };


    const callInput = () => {
        inputFile.current.click();
    }

    const breakpointColumnsObj = {
        default: 3,
        500: 3,
        400: 2,
        200: 1
    };


    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <>
            <div className={`${(context.mode === "white") ? "" : "darkTheme"}`}>
                <div className={`blankDiv ${(context.mode === "white") ? "lightTheme" : "darkTheme"}`}>

                </div>
                <div className={`${(context.navbarWidth === "unclick") ? "marginForNavbarBefore" : "marginForNavbar"}`}>
                    <div ref={wrapperRef} className='container afterNavbar'>
                        <form style={{ borderRadius: (context.mode === "white") ? "" : "10px" }} className={`${(context.mode === "white") ? "lightThemeWrite" : "darkThemeWrite"}`} action="http://localhost:5000/api/note/createnote" method='post' onSubmit={handleSubmit}>
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
                            <div className={`mainBox mt-4 ${(context.mode === "white") ? "mainBoxBorderLight" : "mainBoxBorderDark"}`} id="mainBox">
                                {/* <div class="images">
                                  {state.images.map(image => (
                                      <img className="imageItem" src={image} alt="preview"/>
                                      ))}
                                    </div> */}
                                <div className="pe-1" onClick={openNote}>
                                    <Masonry
                                        breakpointCols={breakpointColumnsObj}
                                        className="my-masonry-grid"
                                        columnClassName="my-masonry-grid_columnForWrite"
                                    >
                                        {images.map((image) => (
                                            <>
                                                <div className="imageWithDel" key={image}>
                                                    <img className="image-item" alt="new" src={image} />
                                                </div>
                                                <div className='styleCloseBtnOnImage'>
                                                    <small
                                                        style={{
                                                            color: "white",
                                                            position: "relative",
                                                            left: "42%",
                                                            top: "-25%"
                                                        }}
                                                    >
                                                        {" "}
                                                        &times;{" "}
                                                    </small>
                                                </div>
                                            </>
                                        ))}
                                    </Masonry>
                                </div>
                                <LoadingBar
                                    color='#f11946'
                                    progress={progress}
                                    height={5}
                                    onLoaderFinished={() => setProgress(0)}
                                />
                                <div className="mt-1">
                                    <input type="text" className={`form-control1 ${(context.mode === "white") ? "lightThemeWrite" : "darkThemeWrite"}`} placeholder={`${(toggle === "close") ? "Take a note ..." : "Title"}`} id="title" name="title" onClick={openNote} />
                                </div>
                                <hr />
                                <div>
                                    <input type="text" className={`form-control1 ${(context.mode === "white") ? "lightThemeWrite" : "darkThemeWrite"}`} placeholder="Tag" id="tag" name="tag" />
                                </div>
                                <hr />
                                <div>
                                    <textarea ref={textareaBtn} type="text" className={`form-control1 ${(context.mode === "white") ? "lightThemeWrite" : "darkThemeWrite"}`} placeholder="Description" id="description" name="description" onInput={setArea}></textarea>
                                </div>
                                {/* <div>
                                  <input onChange={onFileChange} type="file" multiple />
                                </div> */}
                                <i style={{cursor:"pointer"}} onClick={callInput} className="fa-regular fa-image"></i>
                                <input ref={inputFile} style={{ display: "none" }} onChange={onFileChange} id="file-input" type="file" multiple />
                                <button ref={submitBtn} style={{ display: "none" }} type="submit" className="btn btn-dark mx-2 mb-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer enableMultiContainer containerId={"insideHome"} pauseOnFocusLoss={false} limit={1} toastStyle={{ backgroundColor: "black", color: "white" }} icon={false} hideProgressBar />
            </div>
        </>
    )
}
