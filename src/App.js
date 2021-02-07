import { useState } from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import AddMessage from './components/AddMessage';
import List from './components/List';

function App() {
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const handleUpdate = () => {
    setLastUpdated(Date.now());
  };
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <AddMessage handleNewUpdate={handleUpdate} />
            <List lastUpdated={lastUpdated} handleUpdate={handleUpdate} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
