import { useForm } from 'react-hook-form';
import React from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Textarea,
  Button,
} from '@chakra-ui/react';

import config from '../../config';

export default function AddMessage({ handleNewUpdate }) {
  const { handleSubmit, errors, register, reset, formState } = useForm();

  const onSubmit = async values => {
    try {
      const message = { message: values.message };
      const result = await fetch(config.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
      if (result.status) {
        handleNewUpdate();
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <FormControl isInvalid={errors.message} maxWidth="100%">
        <FormLabel htmlFor="name">Message</FormLabel>
        <Textarea
          name="message"
          size="lg"
          ref={register({ required: true, minLength: 20 })}
        />
        <FormErrorMessage>
          {errors.message && errors.message.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
