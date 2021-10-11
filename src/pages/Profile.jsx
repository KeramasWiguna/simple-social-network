import { UserAvatar } from "../features/user/components/UserAvatar";

export const Porfile = ({ userId, ...props }) => {
  return <UserAvatar userId={parseInt(userId)} />;
};
