import { Box, Heading, Text } from "@chakra-ui/layout";
import { UserAvatar } from "../../user/components/UserAvatar";

export const PostCard = ({ post, ...props }) => {
  return (
    <Box py="4" borderBottom="1px" borderColor="gray.200">
      <Heading>{post.title}</Heading>
      <Text fontSize="lg" mt="10px" mb="20px">
        {post.body}
      </Text>
      <UserAvatar userId={post.userId} withLabel />
    </Box>
  );
};
