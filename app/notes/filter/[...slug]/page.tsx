import { QueryClient, dehydrate } from "@tanstack/react-query";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: Promise<{ slug: string[] }>;
};

async function App({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];
  const searchQuery = "";
  const currentPage = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, category, currentPage],
    queryFn: () => fetchNotes(searchQuery, category, currentPage),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient
        initialPage={currentPage}
        initialSearch={searchQuery}
        tag={category}
      />
    </HydrationBoundary>
  );
}

export default App;
