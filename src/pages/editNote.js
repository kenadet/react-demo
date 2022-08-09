import React, { useEffect, useState } from 'react';
import {getNote, createNote, updateNote} from '../services/noteService';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Note from '../models/note';

const EditPage = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const noteId = location.state?.noteId;

    const [note, setNote] = useState(new Note('','',''));

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

      //mounted
     useEffect(() => {
        if (noteId) {
            getNote(noteId).then(response => {
                setNote(response.data.note);
              }); 
        }
    }, []);

    const handleSave = (e) => {

             e.preventDefault();

             setSubmitted(true);
             setLoading(true);

             if (!note.title || !note.description || !note.category) {
                return;
            }

             if(noteId){
                updateNote(noteId, note).then(response => {
                    navigate('/notes');
                 });
             }else{
             createNote(note).then(response => {
                navigate('/notes');
             });
            
             }
    }

       //<input name="x" value="y" onChange=(event) => handleChange(event)>
       const handleChange = (e) => {
        const {name, value} = e.target;

        setLoading(false);

        setNote((prevState => {
            //e.g: prevState ({user: x, pass: x}) + newKeyValue ({user: xy}) => ({user: xy, pass: x})
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    return(
     <React.Fragment>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6">
                <Link to="/notes" className="float-end mb-4">View Notes</Link>
             </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-4">{noteId ? "Edit Note" : "Create Note"}</h2>
            <form noValidate onSubmit={(e) => handleSave(e)} className={submitted ? 'was-validated' : ''}>
                <div className='mb-3'>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input noValidate id="title" type="title" name="title" value={note.title}
                    placeholder="Title"
                    onChange={(e) => handleChange(e)}
                    className="form-control" required
                    maxLength="50"/>
                    <div className="invalid-feedback">
                            Title is required.
                     </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="description" className="form-label">Description</label>
                    <input noValidate id="description1" type="Description" name="description" value={note.description}
                    placeholder="description"
                    onChange={(e) => handleChange(e)}
                    className="form-control" required
                    maxLength="70"/>
                    <div className="invalid-feedback">
                            Description is required.
                     </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="category" className="form-label">Category</label>
                    <select noValidate id="category" type="category" name="category" value={note.category}
                    placeholder="category"
                    onChange={(e) => handleChange(e)}
                    className="form-control" required>
                        <option value="">--Select Category--</option>
                        <option value="GENERAL">General</option>
                        <option value="PROFESSIONAL">Professional</option>
                    </select>
                    <div className="invalid-feedback">
                            Category is required.
                     </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    Save | <i className="fas fa-save"></i>
                </button>
            </form>
            </div>
        </div>
    </React.Fragment>
    )
};
 
 export default EditPage;