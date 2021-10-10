import { useFetchUsersQuery } from "../userService";

export function UserList() {
  const { data: users, error, isLoading } = useFetchUsersQuery();

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading</>
      ) : users ? (
        <ul>
          {users.map((user) => (
            <li>{user.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
