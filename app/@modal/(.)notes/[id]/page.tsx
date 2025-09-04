import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:["note", id],
    queryFn: ()=>fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id}/>
    </HydrationBoundary>
    
  );
};

export default NotePreviewPage;