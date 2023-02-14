import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
const Feed = ({ data }) => {
  return (
    <Card maxW="sm" m={4}>
      <CardBody>
        <Image
          src={data?.img || "https://via.placeholder.com/748x746"}
          borderRadius="lg"
          w="full"
        />
        <Heading size="lg" textAlign="center" pt="2">
          {data?.title}
        </Heading>
      </CardBody>
      {/* <Divider />
      <CardHeader display={"flex"}>
        <b>Preço: &nbsp;</b>
        <Text>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(data?.price || 0.0)}
        </Text>
      </CardHeader> */}
      <Divider />
      <CardFooter>
        <Button
          variant="solid"
          colorScheme="blue"
          w="full"
          onClick={() => window.open(data?.url)}
        >
          IR PARA A LOJA
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Feed;
