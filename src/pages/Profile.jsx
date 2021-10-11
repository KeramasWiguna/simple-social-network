import { UserAvatar } from "../features/user/components/UserAvatar";
import { MainLayout } from "./layouts/MainLayout";

export const Porfile = ({ userId, ...props }) => {
  return (
    <MainLayout>
      <UserAvatar userId={parseInt(userId)} withLabel />
    </MainLayout>
  );
};
