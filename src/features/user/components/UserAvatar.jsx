import { useSelector } from "react-redux";
import { selectUserById } from "../userSlice";

export function UserAvatar({ userId, ...props }) {
  const user = useSelector((state) => selectUserById(state, userId));
  return <div>{user?.name}</div>;
}
