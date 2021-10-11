import { Box, Heading, Text } from "@chakra-ui/layout";

export const CommentItem = ({ comment, ...props }) => {
  return (
    <Box mb={4} bg="gray.100" p={3}>
      <Heading fontSize="sm">{comment.email}</Heading>
      <Text fontSize="lg">{comment.body}</Text>
    </Box>
  );
};
