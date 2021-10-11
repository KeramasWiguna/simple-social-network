import { UserAvatar } from "../features/user/components/UserAvatar";
import { MainLayout } from "./layouts/MainLayout";

export const Profile = ({ userId, ...props }) => {
  return (
    <MainLayout>
      <UserAvatar userId={parseInt(userId)} withLabel />
    </MainLayout>
  );
};
