"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

export function PaginationComponent({
    handlePage,
    currentPage,
    hasNextPage,
    lastPage,
}: {
    handlePage: (num: number) => void;
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
}) {
    // Number of middle pages shown (max page to show )
    const pagesToShow = 3;
    // we show before , current page , nextpage so current page-1 is for before page, at first we currentPage - 1 =0 so choose 1
    const startPage = Math.max(1, currentPage - 1);
    //start page + show page = 4 pages so -1 at end, at last we startPage + pagesToShow - 1 =more  so chose lastpage
    const endPage = Math.min(lastPage, startPage + pagesToShow - 1);

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => handlePage(currentPage - 1)}
                        className={!hasNextPage && currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {
                    startPage > 1 && (
                        // always show 1 
                        <>
                            <PaginationItem>
                                <PaginationLink href="#" onClick={() => handlePage(1)}>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            {/* gives dotted line if before page greater than 2: Ellipsis */}
                            {startPage > 2 && <PaginationEllipsis />}
                        </>
                    )
                }

                {
                    // Array of 3 page number but when when at last it show 2 page number , because of Endpage 
                    // ex: 5,6,7 s-5 end-7   5-7 =2 +1= 3 
                    // but we calculate endpaage using lastPage which will be min at last
                    //
                    //(latsPage taken) 340 - 339 + 1 = 2
                    [...Array(endPage - startPage + 1)].map((_, i) => {
                        const pageNum = startPage + i; // what page number will be shown
                        return (
                            <PaginationItem key={pageNum}>
                                <PaginationLink
                                    href="#"
                                    isActive={pageNum === currentPage}
                                    onClick={() => handlePage(pageNum)}
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                {
                    // show endpage number till endpage is less than last given page 
                    endPage < lastPage && (
                        <>
                            {endPage < lastPage - 1 && <PaginationEllipsis />}
                            <PaginationItem>
                                <PaginationLink href="#" onClick={() => handlePage(lastPage)}>
                                    {lastPage}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => handlePage(currentPage + 1)}
                        className={!hasNextPage ? "opacity-50 pointer-events-none" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
