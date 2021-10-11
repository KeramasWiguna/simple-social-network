import { Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  saveDeletedPost,
  selectAllPosts,
  useFetchPostsQuery,
  useRemovePostMutation,
} from "../postSlice";
import { PostCard } from "./PostCard";

export function PostList() {
  const posts = useSelector(selectAllPosts);
  const { error, isLoading } = useFetchPostsQuery();
  const [removePost, { isError }] = useRemovePostMutation();
  const deletedPost = useSelector((state) => state.post.deletedPost);
  const dispatch = useDispatch();

  const handleRemove = async (id) => {
    await removePost(id);
    if (!isError) dispatch(saveDeletedPost(id));
  };

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
