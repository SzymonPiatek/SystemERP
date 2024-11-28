import { createListCollection, Stack } from '@chakra-ui/react';
import {
  SelectContent,
  SelectTrigger,
  SelectRoot,
  SelectLabel,
  SelectItem,
  SelectValueText,
} from '../ui/select.tsx';
import React from 'react';

type CustomSelectProps = {
  collection: { label: string; value: string }[];
  placeholder: string;
  label: string;
  variant?: 'subtle' | 'outline';
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  collection,
  placeholder,
  label,
  variant = 'subtle',
}) => {
  const formattedCollection = createListCollection({
    items: collection,
  });

  return (
    <Stack>
      <SelectRoot collection={formattedCollection} variant={variant}>
        <SelectLabel>{label}</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {formattedCollection.items.map((item) => (
            <SelectItem item={item} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Stack>
  );
};

export default CustomSelect;
