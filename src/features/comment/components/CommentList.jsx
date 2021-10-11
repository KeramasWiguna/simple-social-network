import { Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchPostCommentsQuery } from "../../post/postSlice";
import { selectAllComments } from "../commentSlice";
import { CommentItem } from "./CommentItem";

export function CommentList({ postId, ...props }) {
  const comments = useSelector(selectAllComments);
  const { error, refetch, isLoading } = useFetchPostCommentsQuery(postId);
  const deletedComment = useSelector((state) => state.comment.deletedComment);

  useEffect(() => {
    if (refetch) refetch();
  }, [postId, refetch]);

  return (
    <div>
      {error ? (
        <Heading color="gray.400">Oh no, there was an error</Heading>
      ) : isLoading ? (
        <Spinner size="md" />
      ) : comments ? (
        <>
          {comments.map((comment) => {
            if (!deletedComment.includes(comment.id)) {
              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  editable={comment.email === "Sincere@april.biz"} //in real life it's compare to user session
                />
              );
            }
            return null;
          })}
        </>
      ) : null}
    </div>
  );
}
