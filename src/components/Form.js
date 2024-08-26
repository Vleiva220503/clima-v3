import { useTranslation } from "react-i18next";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import useForm from "../hooks/useForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ newLocation }) => {
  const { t } = useTranslation("global");
  const { value: city, handleChange, reset } = useForm("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) {
      toast.error(t('can')); 
      return;
    }

    newLocation(city.trim());
    reset();
  };

  const inputBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const buttonBg = useColorModeValue("blue.400", "blue.600");

  return (
    <Box mt={4}>
      <form onSubmit={handleSubmit}>
        <InputGroup maxW="500px" mx="auto" borderRadius="full" overflow="hidden">
          <Input
            bg={inputBg}
            color={textColor}
            type="text"
            placeholder={t("city")}
            value={city}
            onChange={handleChange}
            variant="filled"
            borderRadius="full"
            px={4}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="Search"
              bg={buttonBg}
              icon={<SearchIcon />}
              type="submit"
              colorScheme="blue"
              borderRadius="full"
              size="sm"
              px={4}
            />
          </InputRightElement>
        </InputGroup>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Form;
