import { UserAvatar } from "../../user/components/UserAvatar";
import { useFetchPostsQuery, useRemovePostMutation } from "../postSlice";

export function PostList() {
  const { data: posts, error, isLoading } = useFetchPostsQuery();
  const [removePost] = useRemovePostMutation();

  const handleRemove = async (id) => {
    await removePost(id);
  };

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading</>
      ) : posts ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div>
                <UserAvatar userId={post.userId} />
                {post.title}
                <button onClick={() => handleRemove(post.id)}>x</button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
