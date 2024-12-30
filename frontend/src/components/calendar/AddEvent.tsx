import { Card, Input } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { FC } from 'react';

export const AddEvent: FC<{}> = () => {
  return (
    <Card.Root>
      <Card.Body>
        <Field label="Name">
          <Input placeholder="Event Name"></Input>
        </Field>
      </Card.Body>
    </Card.Root>
  );
};
