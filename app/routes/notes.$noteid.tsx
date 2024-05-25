import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { getStoredNotes } from "~/data/notes";
import styles from '~/styles/note-details.css';

const NoteDetailsPage = () => {
    const note  = useLoaderData();
    
    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    );
}

export default NoteDetailsPage;

export const links = () => {
    return [{rel: 'stylesheet', href: styles}]
}

export const loader = async ({params}) => {
    const notes = await getStoredNotes();
    const noteId = params.noteid;
    const selectedNote = notes.find(note => note.id === noteId);
    if (!selectedNote) {
        return json({
            message: `Note with id ${noteId} not found`,
        }, {status: 404});
    }
    return selectedNote;
}