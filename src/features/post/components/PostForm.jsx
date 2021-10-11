import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "../postSlice";
import { CheckIcon } from "@chakra-ui/icons";

export const PostForm = ({ post, ...props }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createPost, { isLoading, isError }] = useCreatePostMutation();

  const onSubmit = async (data) => {
    const { title, body } = data;
    await createPost({
      userId: 1,
      title,
      body,
    });
    if (!isError) reset();
  };

  return (
    <Box py="4" borderBottom="1px" borderColor="gray.200" {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.title}>
          <Input
            id="title"
            placeholder="Title"
            {...register("title", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
              maxLength: { value: 20, message: "Maximum length should be 20" },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt="3" isInvalid={errors.body}>
          <Textarea
            id="body"
            name="body"
            resize="none"
            size="md"
            placeholder="What's Happening?"
            {...register("body", {
              required: "This is required",
              minLength: { value: 10, message: "Minimum length should be 10" },
            })}
          />
          <FormErrorMessage>
            {errors.body && errors.body.message}
          </FormErrorMessage>
        </FormControl>
        <Box textAlign="right">
          <Button
            isLoading={isLoading}
            leftIcon={<CheckIcon />}
            type="submit"
            mt="3"
            bg="cyan.500"
            color="white"
          >
            SEND
          </Button>
        </Box>
      </form>
    </Box>
  );
};
