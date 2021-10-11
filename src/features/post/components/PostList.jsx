import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "../../user/components/UserAvatar";
import {
  saveDeletedPost,
  useFetchPostsQuery,
  useRemovePostMutation,
} from "../postSlice";

export function PostList() {
  const { data: posts, error, isLoading } = useFetchPostsQuery();
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
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading</>
      ) : posts ? (
        <ul>
          {posts.map((post) => {
            if (!deletedPost.includes(post.id)) {
              return (
                <li key={post.id}>
                  <div>
                    <UserAvatar userId={post.userId} />
                    {post.title}
                    <button onClick={() => handleRemove(post.id)}>x</button>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      ) : null}
    </div>
  );
}
