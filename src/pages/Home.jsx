import { PostList } from "../features/post/components/PostList";
import { UserList } from "../features/user/components/UserList";

export const Home = () => {
  return (
    <div>
      <PostList />
      <UserList />
    </div>
  );
};
