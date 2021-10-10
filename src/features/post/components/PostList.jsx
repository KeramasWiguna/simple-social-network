import { UserAvatar } from "../../user/components/UserAvatar";
import { useFetchPostsQuery } from "../postSlice";

export function PostList() {
  const { data: posts, error, isLoading } = useFetchPostsQuery();

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading</>
      ) : posts ? (
        <ul>
          {posts.map((post) => (
            <li>
              <div>
                <UserAvatar userId={post.userId} />
                {post.title}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
