import React from "react";
import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { UserAvatar } from "../../features/user/components/UserAvatar";
import { Link } from "@reach/router";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.200"
        pt={20}
        centerContent
        maxW="container.lg"
        minH="100vh"
      >
        {children}
      </Container>
    </>
  );
};

export const Header = () => {
  return (
    <Box
      zIndex="docked"
      mt={0}
      pos="fixed"
      w="100%"
      bg="white"
      boxShadow="sm"
      p="3"
    >
      <Container maxW="container.lg">
        <Flex alignItems="center">
          <Link to="/">
            <Heading size="md">Simple</Heading>
          </Link>
          <Spacer />
          <UserAvatar userId={1} />
        </Flex>
      </Container>
    </Box>
  );
};
