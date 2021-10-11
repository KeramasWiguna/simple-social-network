import { Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Link } from "@reach/router";
import { useFetchAlbumsQuery } from "../albumSlice";

export function AlbumList({ userId, ...props }) {
  const { data: albums, error, isLoading } = useFetchAlbumsQuery();

  return (
    <div>
      {error ? (
        <Heading color="gray.400">Oh no, there was an error</Heading>
      ) : isLoading ? (
        <Spinner size="md" />
      ) : albums && userId ? (
        <>
          {albums.map((album) => {
            if (album.userId === parseInt(userId)) {
              return (
                <Link to={`/album/${album.id}`} key={album.id}>
                  <Heading mb={3}>{album.title}</Heading>
                </Link>
              );
            }

            return null;
          })}
        </>
      ) : albums ? (
        <>
          {albums.map((album) => {
            return (
              <Link to={`/album/${album.id}`} key={album.id}>
                <Heading mb={3}>{album.title}</Heading>
              </Link>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
