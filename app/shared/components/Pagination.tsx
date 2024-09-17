import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface TypeProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationPage({ totalPages, currentPage, onPageChange }: TypeProps) {
  const generatePageLinks = () => {
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            type="button"
            className="cursor-pointer"
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return links;
  };

  return (
    <Pagination className="mt-5 justify-end">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" type="button" onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}
        {generatePageLinks()}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext className="cursor-pointer" type="button" onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
