import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css"
import { deleteNote } from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
    notes: Note[],
    queryKey: (string | number|undefined)[],
}

export default function NoteList({ notes,queryKey }: NoteListProps) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id:string) => {
            await deleteNote(id);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey});
        }
    });

    return (<ul className={css.list}>
        {notes.map((note) => (
            <li key={note.id} className={css.listItem}>
                <h2 className={css.title}>{ note.title}</h2>
                <p className={css.content}>{ note.content}</p>
            <div className={css.footer}>
                    <span className={css.tag}>{note.tag}</span>
                    <Link href={`/notes/${note.id}`}>
                        View details
                    </Link>
                <button className={css.button} onClick={()=>{mutation.mutate(note.id)}}>Delete</button>
            </div>
        </li>
        ))}
    </ul>);
}