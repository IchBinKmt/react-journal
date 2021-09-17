import { getDocs, collection } from 'firebase/firestore/lite';
import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
    const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`));

    const notes = [];
    notesSnap.forEach(doc => {
        notes.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return notes;
}