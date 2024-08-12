import getAllResults from "@/lib/getAllResults";
import Item from "./components/Item";

type Props = {
  params: {
    searchTerm: string;
  };
};

// export async function generateMetaData({ params: { searchTerm } }: Props) {
//   const WikiData: Promise<SearchResult> = getAllResults(searchTerm);
//   const data = await WikiData;
//   const displayTerm = searchTerm.replaceAll("20%", " ");
//   if (data?.query?.pages) {
//     return {
//       title: `${displayTerm} not found`,
//     };
//   }

//   return {
//     title: `${displayTerm}`,
//     description: `Search results for ${displayTerm}`,
//   };
// }

export default async function SearchResult({ params: { searchTerm } }: Props) {
  const WikiData: Promise<SearchResult> = getAllResults(searchTerm);
  const data = await WikiData;
  const results: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-white mx-auto max-w-screen-2xl py-1 min-h-screen text-black">
      {results ? (
        Object.values(results).map((result) => {
          return <Item key={result.pageid} result={result} />;
        })
      ) : (
        <h2 className="p-2 text-xl font-bold">{`${searchTerm} not found`}</h2>
      )}
    </main>
  );

  return content;
}