import { Stack } from '@chakra-ui/react';
import {
  SelectContent,
  SelectTrigger,
  SelectRoot,
  SelectLabel,
  SelectItem,
  SelectValueText,
} from '../ui/select.tsx';
import React from 'react';
import { methodVariantsCollections } from '../../lib/postmanData.ts';

type PostmanSelectProps = {
  placeholder: string;
  label?: string;
  defaultValue?: string[];
  value?: string[];
  variant?: 'subtle' | 'outline';
  stackStyle?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PostmanSelect: React.FC<PostmanSelectProps> = ({
  placeholder,
  label,
  defaultValue = ['GET'],
  value = ['GET'],
  variant = 'subtle',
  stackStyle = {},
  onChange = () => {},
}) => {
  const handleSelectChange = (itemValue: string) => {
    onChange({
      target: { value: itemValue } as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <Stack style={stackStyle}>
      <SelectRoot
        collection={methodVariantsCollections}
        variant={variant}
        defaultValue={defaultValue}
        value={value}
      >
        {label && <SelectLabel>{label}</SelectLabel>}
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {methodVariantsCollections.items.map((item) => (
            <SelectItem item={item} key={item.name} onClick={() => handleSelectChange(item.name)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Stack>
  );
};

export default PostmanSelect;
