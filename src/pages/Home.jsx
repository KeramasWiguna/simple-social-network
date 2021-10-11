import { Box, Grid, GridItem, Heading } from "@chakra-ui/layout";
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
        <GridItem colSpan={[1, 2]}>
          <Heading ml={[0, 4]} size="lg" mb={4}>
            Friend List
          </Heading>
          <Box pl={[0, 4]}>
            <UserList />
          </Box>
        </GridItem>
      </Grid>
    </MainLayout>
  );
};
