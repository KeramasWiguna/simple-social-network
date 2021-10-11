import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useNavigate } from "@reach/router";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { UserAvatar } from "../../user/components/UserAvatar";
import { saveDeletedPost, useRemovePostMutation } from "../postSlice";
import { PostForm } from "./PostForm";

export const PostCard = ({ post, editable, ...props }) => {
  const navigate = useNavigate();
  const [removePost, { isError, isLoading }] = useRemovePostMutation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const onEditClose = () => setIsEdit(false);

  const handleRemove = async (id) => {
    await removePost(id);
    if (!isError) {
      dispatch(saveDeletedPost(id));
      navigate("/");
    }
  };

  if (post) {
    return (
      <Box
        cursor="pointer"
        onClick={() => navigate(`/post/${post.id}`)}
        py="4"
        borderBottom="1px"
        borderColor="gray.200"
        w="100%"
      >
        <Heading>{post.title}</Heading>
        <Text fontSize="lg" mt="10px" mb="20px">
          {post.body}
        </Text>
        <Flex>
          <UserAvatar userId={post.userId} withLabel />
          <Spacer />
          {editable && (
            <ButtonGroup>
              <Button variant="outline" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
              <Button onClick={() => setIsOpen(true)} variant="ghost">
                Delete
              </Button>
            </ButtonGroup>
          )}
        </Flex>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={isLoading ? null : onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Post
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button disabled={isLoading} ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  colorScheme="red"
                  onClick={() => handleRemove(post.id)}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <Modal isOpen={isEdit} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="lg">Edit Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PostForm post={post} onSuccess={onEditClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    );
  } else {
    return null;
  }
};
