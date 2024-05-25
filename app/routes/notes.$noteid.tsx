import { Link, useLoaderData } from "@remix-run/react";
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
            </header>
            <p id="note-details-content">{note.title}</p>
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
    return notes.find(note => note.id === noteId);
}