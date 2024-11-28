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
  label?: string;
  variant?: 'subtle' | 'outline';
  stackStyle?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  collection,
  placeholder,
  label,
  variant = 'subtle',
  stackStyle = {},
  onChange = () => {},
}) => {
  const formattedCollection = createListCollection({
    items: collection,
  });

  const handleSelectChange = (itemValue: string) => {
    onChange({
      target: { value: itemValue } as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <Stack style={stackStyle}>
      <SelectRoot collection={formattedCollection} variant={variant}>
        {label && <SelectLabel>{label}</SelectLabel>}
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {formattedCollection.items.map((item) => (
            <SelectItem item={item} key={item.value} onClick={() => handleSelectChange(item.value)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Stack>
  );
};

export default CustomSelect;
