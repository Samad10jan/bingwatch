"use client";

import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis
} from "@/components/ui/pagination";
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

    // we show before , current page , nextpage so current page-1 is for before page, at first we currentPage - 1 =0 so choose 1
    const startPage = Math.max(1, currentPage - 1);
    //start page + show page = 4 pages so -1 at end, at last we startPage + pagesToShow - 1 =more  so chose lastpage
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

                {/* Middle Pages 
                    Array of 3 page number but when when at last it show 2 page number , because of Endpage 
                    ex: 5,6,7 s-5 end-7   5-7 =2 +1= 3 
                    but we calculate endpaage using lastPage which will be min at last
                    
                    (latsPage taken) 340 - 339 + 1 = 2
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
