import { Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useSelector } from "react-redux";
import { selectAllPosts, useFetchPostsQuery } from "../postSlice";
import { PostCard } from "./PostCard";

export function PostList() {
  const posts = useSelector(selectAllPosts);
  const { error, isLoading } = useFetchPostsQuery();
  const deletedPost = useSelector((state) => state.post.deletedPost);

  return (
    <div>
      {error ? (
        <Heading color="gray.400">Oh no, there was an error</Heading>
      ) : isLoading ? (
        <Spinner size="md" />
      ) : posts ? (
        <>
          {posts
            .map((post) => {
              if (!deletedPost.includes(post.id)) {
                return <PostCard key={post.id} post={post} />;
              }
              return null;
            })
            .reverse()}
        </>
      ) : null}
    </div>
  );
}
