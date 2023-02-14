import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import Feed from "../../components/Feed";

const Home = ({ props }) => {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["offers"],
  });
  return (
    <Box w="full" h="full">
      <Header />
      <Box as="main" w="full" h="full" padding={16}>
        <Flex flexWrap="wrap" justifyContent={"center"}>
          {data?.map((offer) => <Feed key={offer.id} data={offer} />) || (
            <Text textAlign="center">Nenhuma oferta encontrada</Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
export default Home;
