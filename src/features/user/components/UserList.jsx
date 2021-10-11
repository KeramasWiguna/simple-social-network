import { Spinner } from "@chakra-ui/spinner";
import { useFetchUsersQuery } from "../userSlice";
import { UserAvatar } from "./UserAvatar";

export function UserList() {
  const { data: users, error, isLoading } = useFetchUsersQuery();

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <Spinner size="md" />
      ) : users ? (
        <>
          {users.map((user) => {
            if (user.id !== 1) {
              return (
                <UserAvatar
                  key={user.id}
                  mb="10px"
                  userId={parseInt(user.id)}
                  withLabel
                />
              );
            } else {
              return null;
            }
          })}
        </>
      ) : null}
    </div>
  );
}
