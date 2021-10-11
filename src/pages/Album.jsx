import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/spinner";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAlbumById,
  useFetchAlbumPhotosQuery,
} from "../features/album/albumSlice";
import { MainLayout } from "./layouts/MainLayout";

export const Album = ({ albumId }) => {
  const album = useSelector((state) => selectAlbumById(state, albumId));
  const { data: photos, isLoading } = useFetchAlbumPhotosQuery(albumId);

  const [isOpen, setIsOpen] = useState(0);
  const onClose = () => setIsOpen(false);

  return (
    <MainLayout>
      <Box w="full" mb={2}>
        <Heading>{album?.title}</Heading>
      </Box>
      {isLoading ? (
        <Spinner size="md" />
      ) : photos ? (
        <Grid
          w="full"
          templateColumns={["repeat(3, 1fr)", "repeat(3, 1fr)"]}
          gap={2}
        >
          {photos.map((photo) => (
            <GridItem
              key={photo.id}
              cursor="pointer"
              onClick={() => setIsOpen(photo.id)}
              colSpan={[1, 1]}
            >
              <Image w="full" src={photo.thumbnailUrl} alt={photo.title} />
            </GridItem>
          ))}
        </Grid>
      ) : null}
      <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {photos?.find((photo) => photo.id === isOpen)?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              w="full"
              src={photos?.find((photo) => photo.id === isOpen)?.url}
              alt={photos?.find((photo) => photo.id === isOpen)?.title}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};
