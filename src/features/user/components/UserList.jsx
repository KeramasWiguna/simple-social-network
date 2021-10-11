import { useNavigate } from "@reach/router";
import { useFetchUsersQuery } from "../userSlice";

export function UserList() {
  const { data: users, error, isLoading } = useFetchUsersQuery();
  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate(`profile/${userId}`);
  };

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading</>
      ) : users ? (
        <ul>
          {users.map((user) => (
            <li onClick={() => handleClick(user.id)} key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
