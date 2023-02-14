import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Toast,
  useColorModeValue,
  useQuery,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const initialFormData = {
    metadata_url: null,
    url: "",
    title: "",
    img: "",
    description: "",
    price: null,
    user_id: localStorage.getItem("user_id"),
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate: getMetadata } = useMutation(
    (formData) => {
      return axios.post(`http://localhost:4000/metadata`, formData);
    },
    {
      onSuccess: async (formData) => {
        setFormData({
          ...formData,
          title: formData.data.title,
          description: formData.data.description,
        });
      },
      onError: (error) => {
        toast({
          position: "top",
          status: "error",
          description: "URL inválida ou ocorreu um erro interno",
        });
        console.log(error);
      },
    }
  );

  const { mutate: createOffer } = useMutation(
    (formData) => {
      return axios.post(`http://localhost:4000/offers`, formData);
    },
    {
      onSuccess: async (formData) => {
        toast({
          position: "top",
          status: "success",
          description: "Oferta criada com sucesso",
        });
      },
      onError: (error) => {
        toast({
          position: "top",
          status: "error",
          description: "Ocorreu um erro ao criar a oferta",
        });
      },
    }
  );

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (!id) {
      window.location.href = "/admin";
    }
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Adicionar promoção
        </Heading>
        <FormControl id="title" isRequired textAlign={"center"}>
          <FormLabel>Buscar informações atraves de um link da amazon</FormLabel>
          <Input
            type="text"
            value={formData.metadata_url}
            name="metadata_url"
            onChange={handleChange}
            placeholder="Link do produto da amazon"
            _placeholder={{ color: "gray.500" }}
          />
          <Button
            mt={4}
            textAlign={"center"}
            onClick={() => getMetadata(formData)}
          >
            Buscar informações
          </Button>
        </FormControl>
        <FormControl id="title" isRequired>
          <FormLabel>Título</FormLabel>
          <Input
            type="text"
            value={formData.title}
            name="title"
            onChange={handleChange}
            placeholder="Sua senha"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        <FormControl id="url" isRequired>
          <FormLabel>Url</FormLabel>
          <Input
            value={formData.url}
            placeholder="Url da oferta"
            name="url"
            onChange={handleChange}
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="img" isRequired>
          <FormLabel>Url da imagem</FormLabel>
          <Image
            src={formData.img}
            fallbackSrc="https://via.placeholder.com/748x746"
          />
          <br />
          <Input
            value={formData.img}
            placeholder="Url da imagem"
            name="img"
            onChange={handleChange}
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>

        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => createOffer(formData)}
          >
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Dashboard;
