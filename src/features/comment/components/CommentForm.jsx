import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { CheckIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUserById } from "../../user/userSlice";
import {
  useCreateCommentMutation,
  usePatchCommentMutation,
} from "../commentSlice";

export const CommentForm = ({ comment, userId, onSuccess, ...props }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => selectUserById(state, userId));
  const toast = useToast();

  const [createComment, { isLoading, isError }] = useCreateCommentMutation();
  const [patchComment, { isLoading: patchLoading, isError: patchError }] =
    usePatchCommentMutation();

  const onSubmit = async (data) => {
    const { body } = data;
    const { email, name } = user;
    if (comment) {
      await patchComment({
        id: comment.id,
        email,
        name,
        body,
      });

      if (!patchError) reset();
    } else {
      await createComment({
        email,
        name,
        body,
      });

      if (!isError) reset();
    }

    if (isError || patchError) {
      toast({
        title: "Oh no",
        description: "There was an error",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (onSuccess) onSuccess();
  };

  return (
    <Box
      py="4"
      borderTop={!!comment ? 0 : "1px"}
      borderColor="gray.200"
      w="100%"
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt="3" isInvalid={errors.body}>
          <Textarea
            id="body"
            name="body"
            resize="none"
            size="md"
            placeholder="Comment"
            {...register("body", {
              required: "This is required",
            })}
            defaultValue={comment ? comment.body : ""}
          />
          <FormErrorMessage>
            {errors.body && errors.body.message}
          </FormErrorMessage>
        </FormControl>
        <Box textAlign="right">
          <Button
            isLoading={isLoading || patchLoading}
            leftIcon={<CheckIcon />}
            type="submit"
            mt="3"
            bg="cyan.500"
            color="white"
          >
            {comment ? "SAVE" : "SEND"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
