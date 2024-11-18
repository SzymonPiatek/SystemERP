import { FC } from "react";
import { Text } from "@chakra-ui/react";

export type BrandLogoProps = {};

export const BrandLogo: FC<BrandLogoProps> = (props) => {
  return (
    <div {...props}>
      <Text fontWeight="700" textTransform="uppercase" lineHeight="1">
        System erp
        <br />
        <small>Manager</small>
      </Text>
    </div>
  );
};
