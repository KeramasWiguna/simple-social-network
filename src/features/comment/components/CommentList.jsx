import { Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useSelector } from "react-redux";
import { useFetchPostCommentsQuery } from "../../post/postSlice";
import { CommentItem } from "./CommentItem";

export function CommentList({ postId, ...props }) {
  //   const posts = useSelector(selectAllPosts);
  const {
    data: comments,
    error,
    isLoading,
  } = useFetchPostCommentsQuery(postId);
  const deletedComment = useSelector((state) => state.comment.deletedComment);

  return (
    <div>
      {error ? (
        <Heading color="gray.400">Oh no, there was an error</Heading>
      ) : isLoading ? (
        <Spinner size="md" />
      ) : comments ? (
        <>
          {comments
            .map((comment) => {
              if (!deletedComment.includes(comment.id)) {
                return <CommentItem key={comment.id} comment={comment} />;
              }
              return null;
            })
            .reverse()}
        </>
      ) : null}
    </div>
  );
}
