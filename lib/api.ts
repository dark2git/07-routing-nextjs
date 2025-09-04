import axios from "axios";
import type { Note, NoteInputValues } from "../types/note";

export interface FetchHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchParams {
  search?: string;
  tag: string | undefined;
  page: number;
}

export async function fetchNotes(
  searchText: string,
  tag: string | undefined,
  page: number
): Promise<FetchHttpResponse> {
  const params: FetchParams = {
    page,
    tag,
  };

  if (searchText.trim() !== "") {
    params.search = searchText.trim();
  }
  const response = await axios.get<FetchHttpResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        ...params,
        perPage: 12,
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function createNote(note: NoteInputValues): Promise<Note> {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    {
      title: note.title,
      content: note.content,
      tag: note.tag,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function fetchNotesByTag(
  tag?: string
): Promise<FetchHttpResponse> {
  const response = await axios.get<FetchHttpResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        tag,
        perPage: 12,
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}
