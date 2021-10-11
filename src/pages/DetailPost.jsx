import { useSelector } from "react-redux";
import { PostCard } from "../features/post/components/PostCard";
import { selectPostById } from "../features/post/postSlice";
import { MainLayout } from "./layouts/MainLayout";

export const DetailPost = ({ postId, ...props }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <MainLayout>
      <PostCard post={post} editable={post?.userId === 1} />
    </MainLayout>
  );
};
