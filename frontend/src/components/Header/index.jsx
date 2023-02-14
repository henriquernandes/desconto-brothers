import { Box, Icon, Flex, HStack, Image, Link, Text } from "@chakra-ui/react";
import logo from "../../../public/logo.jpg";
import { BsWhatsapp, BsInstagram } from "react-icons/bs";
import { AiOutlineAmazon } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
const Header = () => {
  return (
    <>
      <Box bg={"gray.700"} px={4}>
        <Flex
          h={20}
          px={14}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Image src={logo} alt="logo" boxSize={"50px"} objectFit="cover" />
          </HStack>
          <HStack spacing={8} alignItems={"center"}>
            <Box textAlign={"center"}>
              <Link
                href="https://chat.whatsapp.com/FjkfWh9Eo7K4r655aSSCW0"
                isExternal
              >
                <Icon as={BsWhatsapp} w={8} h={8} color="green.600" />
                <Text>Entre no grupo!</Text>
              </Link>
            </Box>
            <Box textAlign={"center"}>
              <Link href="https://amzn.to/40tIEij" isExternal>
                <Icon as={AiOutlineAmazon} w={8} h={8} color="blue.600" />
                <Text>Seja Prime!</Text>
              </Link>
            </Box>
            <Box textAlign={"center"}>
              <Link
                href="https://www.instagram.com/desconto.brothers/"
                isExternal
              >
                <Icon as={BsInstagram} w={8} h={8} color="purple.600" />
                <Text>Siga-nos no instagram!</Text>
              </Link>
            </Box>
            <Box textAlign={"center"}>
              <Link href="mailto:desconto.b@hotmail.com" isExternal>
                <Icon as={HiOutlineMail} w={8} h={8} />
                <Text>desconto.b@hotmail.com</Text>
              </Link>
            </Box>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
