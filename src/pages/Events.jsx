import React from 'react';
import { Box, Container, Flex, Text, VStack, Spinner, Heading } from '@chakra-ui/react';
import { useEvents } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text fontSize="xl" color="red.500">Error loading events: {error.message}</Text>
      </Flex>
    );
  }

  return (
    <Box>
      <Flex
        as="nav"
        bg="blue.500"
        color="white"
        padding="1.5rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          MyApp
        </Text>
        <Flex>
          <Link as={RouterLink} to="/" margin="0 1rem">
            Home
          </Link>
          <Link as={RouterLink} to="/about" margin="0 1rem">
            About
          </Link>
          <Link as={RouterLink} to="/contact" margin="0 1rem">
            Contact
          </Link>
          <Link as={RouterLink} to="/events" margin="0 1rem">
            Events
          </Link>
        </Flex>
      </Flex>
      <Container maxW="container.md" py={8}>
        <VStack spacing={4}>
          <Heading as="h1" size="xl">Events</Heading>
          {events.length === 0 ? (
            <Text>No events available.</Text>
          ) : (
            events.map(event => (
              <Box key={event.id} p={5} shadow="md" borderWidth="1px" width="100%">
                <Heading fontSize="xl">{event.name}</Heading>
                <Text mt={4}>{event.description}</Text>
                <Text mt={2} color="gray.500">{new Date(event.date).toLocaleDateString()}</Text>
              </Box>
            ))
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Events;