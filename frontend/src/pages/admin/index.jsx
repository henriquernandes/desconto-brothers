import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Toast,
  useColorModeValue,
  useQuery,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Admin = () => {
  const initialFormData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate: login } = useMutation(
    (formData) => {
      return axios.post(`http://localhost:4000/login`, formData);
    },
    {
      onSuccess: async (data) => {
        console.log(data);
        window.localStorage.setItem("user_id", data.data.id);
        window.location.href = "/dashboard";
      },
      onError: (error) => {
        setFormData({ ...initialFormData });
        toast({
          position: "top",
          status: "error",
          description: "Username ou senha incorretos",
        });
      },
    }
  );

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
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Login
        </Heading>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            value={formData.username}
            placeholder="Seu Usuário"
            name="username"
            onChange={handleChange}
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            placeholder="Sua senha"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => login(formData)}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Admin;
