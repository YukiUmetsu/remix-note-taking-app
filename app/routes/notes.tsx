import NewNote, {links as newNoteLinks } from "~/components/NewNote";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { redirect, Request, json } from '@remix-run/node';
import { useCatch, useLoaderData } from "@remix-run/react";

export default function Notes() {
    const notes = useLoaderData();
    return (
        <main id="content">
            <NewNote />
            <NoteList notes={notes} />
        </main>
    );
}

// get requests handler
export const loader = async () => {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
        throw json(
            { message: 'No notes found' }, 
            { status: 404, statusText: 'No notes found'});
    }
    return notes;
}

// non get requests handler
export const action = async ({request}: {request: Request}) => {
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);
    // simple validation
    if (noteData.title.toString().trim().length < 3) {
        return { message: 'Title is too short'}
    }

    const existingNote = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNote = await existingNote.concat(noteData);
    await storeNotes(updatedNote);
    return redirect('/notes');
};

export const links = () => {
    return [...newNoteLinks(), ...noteListLinks()]
}

export const CatchBoundary = () => {
    const caughtResponse = useCatch();
    const message = caughtResponse.data?.message || 'Data not found';
    return (
        <main className="info-message">
            <NewNote />
            <h1>{message}</h1>
        </main>
    )
}

export const meta = () => {
    return {
        title: 'All Notes',
        description: 'A list of all notes in the app',
    }
}