import { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import config from '../../config';

function List({ lastUpdated, handleUpdate }) {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(config.API_URL, {
        headers: { 'Content-Type': 'application/json' },
      });
      const messages = await response.json();
      setMessageList(messages?.data);
    };
    fetchMessages();
  }, [lastUpdated]);

  const deleteMessage = async id => {
    try {
      const response = await fetch(
        `${config.API_URL}?id=${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 200) handleUpdate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {messageList &&
        messageList.map(message => (
          <Box
            bg="tomato"
            w="100%"
            p={4}
            key={message._id}
            shadow="md"
            rounded="md"
          >
            <Text fontSize="lg">{message.message}</Text>
            <IconButton
              onClick={() => deleteMessage(message._id)}
              aria-label="delete message"
              isRound
              icon={<DeleteIcon />}
            />
          </Box>
        ))}
    </>
  );
}

export default List;
