import { Box } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { AlbumList } from "../features/album/components/AlbumList";
import { PostList } from "../features/post/components/PostList";
import { UserAvatar } from "../features/user/components/UserAvatar";
import { MainLayout } from "./layouts/MainLayout";

export const Profile = ({ userId, ...props }) => {
  return (
    <MainLayout>
      <Box mb={5} w="100%">
        <UserAvatar userId={parseInt(userId)} withLabel />
      </Box>
      <Tabs w="full">
        <TabList>
          <Tab>Posts</Tab>
          <Tab>Albums</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PostList userId={userId} />
          </TabPanel>
          <TabPanel>
            <AlbumList userId={userId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
};
