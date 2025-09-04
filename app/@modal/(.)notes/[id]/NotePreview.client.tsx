"use client";
import ModalNote from "@/components/ModalNote/ModalNote"
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
    id: string;
};

const NotePreview = ({ id }: Props) => {
const router = useRouter();
  
  const { data: note , isLoading, isError} = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false  
  });

  const close = () => router.back();

  if (isLoading) {
    return (
      <ModalNote onClose={close}>
        <p>Loading note...</p>
      </ModalNote>
    );
  }

  if (isError || !note) {
    return (
      <ModalNote onClose={close}>
        <p>Failed to load note. Please try again.</p>
      </ModalNote>
    );
  }

  return (
    <ModalNote onClose={close}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.tag}</p>
      <p>{note.createdAt}</p>
    </ModalNote>
  );
};

export default NotePreview;