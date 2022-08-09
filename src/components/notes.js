import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {getNotes, deleteNote} from '../services/noteService';
import {Modal, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const NotesCollection = () => {

    const [notes, setNotes] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [noteDelId, setNoteDelId] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    const navigate = useNavigate();

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };
    
      const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

    const getAllNotes = (page) => getNotes(page).then(response => {

        setNotes(response.data.notes);
        setNumberOfPages(response.data.totalPages);
    });

    // mounted
     useEffect(() => { 
        getAllNotes(pageNumber);
    }, [pageNumber]);

    const handleEdit = (id) => { 
        navigate("/note", {state: {
           noteId: id 
        }});
    }

    const handleDelete = () => { 
       
        deleteNote(noteDelId).then(response => 
            getAllNotes()
        )
        setShowConfirmDialog(false);

    }

    const handleShowConfirmDialog = (show, id) => {
        setShowConfirmDialog(show)
        setNoteDelId(id);      
    }

    return (<React.Fragment>
        <div className="row">
            <div className="col-md-12 p-0">
                <button className="btn btn-warning float-end mb-4 px-3" onClick={() => navigate("/note")}><span className="h5 pe-2">Create</span><i className="fas fa-plus"></i></button>
            </div>
        </div>
        <div className="row">
        <table className="table table-hover">
            <thead className="table-dark">
                <tr>
                    <td>
                        Title
                    </td>
                    <td>
                        Description
                    </td>
                    <td>
                        Category
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </thead>
            <tbody>
            {
                notes.map((note, i) => {
                    return(
                    <tr key={i}>
                    <td>
                        {note.title}
                    </td>
                    <td>
                        {note.description}
                    </td>
                    <td>
                        {note.category}
                    </td>
                    <td>
                      <button type="button" className="btn btn-success" onClick={() => handleEdit(note._id)}><FontAwesomeIcon icon={faEdit}/></button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-success" onClick={() => handleShowConfirmDialog(true,  note._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                </tr>)
                })
            }
            </tbody>
        </table>
        <div>
            <Modal show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleDelete()}>
                    Yes
                </Button>
                <Button variant="danger" onClick={() => setShowConfirmDialog(false)}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
        </div>
        <div className="row">
           <div className="mt-3">
                    <button className = "btn-success" onClick={gotoPrevious}>Previous</button>
                        {pages.map((pageIndex) => (
                            <button className = "btn-success"  key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                            {pageIndex + 1}
                            </button>
                        ))}
                    <button className = "btn-success" onClick={gotoNext}>Next</button>
            </div>
        </div>
    </React.Fragment>);
}

export default NotesCollection