import { Avatar } from "@chakra-ui/avatar";
import { Flex, Heading } from "@chakra-ui/layout";
import { SkeletonCircle } from "@chakra-ui/skeleton";
import { Link } from "@reach/router";
import { useSelector } from "react-redux";
import { selectUserById } from "../userSlice";

export function UserAvatar({ userId, withLabel, ...props }) {
  const user = useSelector((state) => selectUserById(state, userId));

  if (user) {
    return (
      <Link to={`/profile/${user.id}`}>
        <Flex alignItems="center" {...props}>
          <Avatar size="sm" name={user.name} src="" />
          {withLabel && (
            <Heading ml="5px" color="gray.600" fontSize="sm">
              {user.name}
            </Heading>
          )}
        </Flex>
      </Link>
    );
  } else {
    return <SkeletonCircle size="8" />;
  }
}
