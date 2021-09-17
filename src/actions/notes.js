import Swal from 'sweetalert2';
import { doc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import { db, addDoc, collection } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { fileUpload } from '../helpers/fileUpload';


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
        
        dispatch(addNewNote(docRef.id, newNote));
        dispatch(activeNote(docRef.id, newNote));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        if (!note.url) {
            delete note.url;
        }
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
        await updateDoc(noteRef, noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const {active: note} = getState().notes;
        Swal.fire({
            tile: 'uploading',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })
        const fileUrl = await fileUpload(file);
        note.url = fileUrl;
        
        dispatch(startSaveNote(note));
        Swal.close();
    }
}

export const startDeleting = (id) => {
   return async (dispatch, getState) => {
      const uid = getState().auth.uid;
      await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));

      dispatch(deleteNote(id));
   }; 
};

export const addNewNote = (id, note) => ({
   type: types.notesAddNew,
   payload: {
       id,
       ...note
   }
});


export const deleteNote = (id) => ({
   type: types.notesDelete,
   payload: id
});

export const cleanNotes = () => ({
    type: types.notesLogoutCleaning
})