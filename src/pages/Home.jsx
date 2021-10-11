import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { PostForm } from "../features/post/components/PostForm";
import { PostList } from "../features/post/components/PostList";
import { UserList } from "../features/user/components/UserList";
import { MainLayout } from "./layouts/MainLayout";

export const Home = () => {
  return (
    <MainLayout>
      <Grid
        minH="100vh"
        templateColumns={["repeat(1, 1fr)", "repeat(6, 1fr)"]}
        gap={6}
      >
        <GridItem colSpan={[1, 4]}>
          <PostForm />
          <PostList />
        </GridItem>
        <GridItem borderLeft={[0, 1]} borderColor="gray.200" colSpan={[1, 2]}>
          <Box pl={[0, 4]}>
            <UserList />
          </Box>
        </GridItem>
      </Grid>
    </MainLayout>
  );
};
