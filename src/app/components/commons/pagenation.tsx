"use client";

import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis
} from "@/shadcncomponents/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function PaginationComponent({
    currentPage,
    hasNextPage,
    lastPage,
}: {
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
}) {

    const router = useRouter();
    const pathname = usePathname();
    // Number of middle pages shown (max page to show )
    const pagesToShow = 3;

    // we show [before , current page , nextpage] so current page-1 is for before page, if current is first page(page 1) So before => currentPage - 1 = 0 so choose 1
    
    const startPage = Math.max(1, currentPage - 1);

    // start page + show page = 4 pages so -1 at end, at last we startPage + pagesToShow - 1 = more  so chose lastpage
    
    const endPage = Math.min(lastPage, startPage + pagesToShow - 1);

    const gotoPage = (p: number) => router.push(`${pathname}?page=${p}`);

    return (
        <Pagination>
            <PaginationContent>

                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && gotoPage(currentPage - 1)}
                        className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                    />
                </PaginationItem>

                {/* First Page */}
                {startPage > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink onClick={() => gotoPage(1)}>1</PaginationLink>
                        </PaginationItem>
                        {startPage > 2 && <PaginationEllipsis />}
                    </>
                )}

                {/* How representing numner of pages on current page :

                   we know : s = max(1, c-1) and  end=min(lastpage, s+pagecount - 1) 
                    
                   Array of length = endpage- startpage + 1
                    
                    if 1 to 11 page
                        at 1: [3]
                       
                            c=1-> s=1 end=3 next=2
                            array[1-3+1]= arrar[3]
                        at 2: [3]
                           c=2-> s=1 mid=2 next=end=3

                        at 10: [2]
                           c=10-> s=9 end=10 
                    
                */}

                {[...Array(endPage - startPage + 1)].map((_, i) => {
                    // what page number will be shown
                    const pageNum = startPage + i;
                    return (
                        <PaginationItem key={pageNum}>
                            <PaginationLink
                                isActive={pageNum === currentPage}
                                onClick={() => gotoPage(pageNum)}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Last Page */}
                {endPage < lastPage && (
                    <>
                        {endPage < lastPage - 1 && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationLink onClick={() => gotoPage(lastPage)}>
                                {lastPage}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => hasNextPage && gotoPage(currentPage + 1)}
                        className={!hasNextPage ? "opacity-50 pointer-events-none" : ""}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
}
