import React from "react";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";
import { Box, Flex, Text, Image, Stack, Heading, Icon, Divider } from '@chakra-ui/react';
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from 'react-icons/fa';
import useCard from "../hooks/useCard";

const Card = ({ loadingData, showData, weather, forecast }) => {
  const { t } = useTranslation("global");
  const { formatDate, iconUrl, forecastItems } = useCard(weather, forecast);

  if (loadingData) {
    return <Spinner />;
  }

  if (!showData || !weather) {
    return <h1>{t("not")}</h1>;
  }

  return (
    <Box
      mt={5}
      width="100%"
      maxWidth="600px"
      mx="auto"
      p={4}
      boxShadow="lg"
      borderRadius="xl"
      bg="gray.50"
      _dark={{ bg: "gray.800", color: "white" }}
    >
      {showData && (
        <Stack spacing={4}>
          <Flex direction="column" alignItems="center">
            <Heading as="h1" size="lg">{weather.name}</Heading>
            <Text fontSize="md">{formatDate(new Date())}</Text>
          </Flex>

          <Flex
            direction={["column", "row"]}
            justifyContent="space-around"
            alignItems="center"
          >
            <Text fontSize="5xl" color="blue.500">{(weather.main.temp - 273.15).toFixed(1)}ºC</Text>
            <Flex alignItems="center">
              <Image src={iconUrl} alt="weather icon" boxSize={16} mr={2} />
              <Text fontSize="lg">{weather.weather[0].description}</Text>
            </Flex>
          </Flex>

          <Divider />

          <Flex justifyContent="space-around" wrap="wrap">
            <Box textAlign="center" my={2}>
              <Flex alignItems="center" justifyContent="center" mb={2}>
                <Icon as={FaTemperatureHigh} boxSize={6} mr={2} color="red.400" />
                <Text fontWeight="semibold">{t("Maximum")}</Text>
              </Flex>
              <Text fontSize="lg">{(weather.main.temp_max - 273.15).toFixed(1)}ºC</Text>
            </Box>

            <Box textAlign="center" my={2}>
              <Flex alignItems="center" justifyContent="center" mb={2}>
                <Icon as={FaTemperatureLow} boxSize={6} mr={2} color="blue.400" />
                <Text fontWeight="semibold">{t("Minimum")}</Text>
              </Flex>
              <Text fontSize="lg">{(weather.main.temp_min - 273.15).toFixed(1)}ºC</Text>
            </Box>

            <Box textAlign="center" my={2}>
              <Flex alignItems="center" justifyContent="center" mb={2}>
                <Icon as={FaWind} boxSize={6} mr={2} color="green.400" />
                <Text fontWeight="semibold">{t("Wind")}</Text>
              </Flex>
              <Text fontSize="lg">{(weather.main.feels_like - 273.15).toFixed(1)}ºC</Text>
            </Box>
          </Flex>

          <Divider />

          <Flex wrap="wrap" justifyContent="space-around">
            {forecastItems.map((item, index) => (
              <Box key={index} textAlign="center" mb={4}>
                <Text fontSize="md" fontWeight="medium">{item.date}</Text>
                <Flex alignItems="center" justifyContent="center" my={2}>
                  <Image src={item.iconUrl} alt="forecast icon" boxSize={12} />
                  <Text fontSize="md" fontWeight="medium" ml={2}>{item.description}</Text>
                </Flex>
                <Text fontWeight="bold" fontSize="lg" color="blue.500">{item.temp}ºC</Text>
              </Box>
            ))}
          </Flex>
        </Stack>
      )}
    </Box>
  );
};

export default Card;
