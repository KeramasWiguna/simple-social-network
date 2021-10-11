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
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveDeletedComment, useRemoveCommentMutation } from "../commentSlice";
import { CommentForm } from "./CommentForm";

export const CommentItem = ({ comment, editable, ...props }) => {
  const [removeComment, { isError, isLoading }] = useRemoveCommentMutation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const onEditClose = () => setIsEdit(false);

  const handleRemove = async (id) => {
    await removeComment(id);
    if (!isError) {
      dispatch(saveDeletedComment(id));
    }
  };

  return (
    <Box mb={4} bg="gray.100" p={3} w="100%">
      <Heading fontSize="sm">{comment.email}</Heading>
      <Flex alignItems="center">
        <Text fontSize="lg">{comment.body}</Text>
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
              Delete Comment
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
                onClick={() => handleRemove(comment.id)}
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
          <ModalHeader fontSize="lg">Edit comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CommentForm userId={1} comment={comment} onSuccess={onEditClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
