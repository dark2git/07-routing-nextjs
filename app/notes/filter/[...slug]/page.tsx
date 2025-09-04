import {
  QueryClient,
} from "@tanstack/react-query";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

async function App({ params}: Props) {
  const { slug } = await params;
  const category = slug[0] === 'All' ? undefined : slug[0];
  const searchQuery = "";
  const currentPage = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery,category, currentPage ],
    queryFn: () => fetchNotes(searchQuery, category, currentPage),
  });
  const initData = queryClient.getQueryData<FetchHttpResponse>(["notes", searchQuery,category, currentPage]);
  return (
    <NotesClient initData={ initData} initialPage={currentPage} initialSearch={ searchQuery} tag={category} />
  );
}

export default App
