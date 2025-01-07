import { HStack } from '@chakra-ui/react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '../../components/ui/pagination';
import { FC } from 'react';

interface PaginationComponentProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
}

export const Pagination: FC<PaginationComponentProps> = ({
  currentPage,
  totalItems,
  pageSize,
  handlePageChange,
}) => {
  return (
    <PaginationRoot
      page={currentPage}
      count={totalItems}
      defaultPage={currentPage}
      pageSize={pageSize}
      onPageChange={(e: { page: number }) => handlePageChange(e.page)}
      variant="outline"
      siblingCount={5}
    >
      <HStack justify="center" mt="2">
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
};
