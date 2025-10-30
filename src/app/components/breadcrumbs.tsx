"use client";

import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
    const pathname = usePathname();
    const pathArray = pathname.split("/")

    return (
        <div className="flex items-center gap-2 px-4">
            <BreadcrumbList>
                {pathArray.map((part, i) => (
                    <div key={i} className="flex items-center">

                        {i < pathArray.length - 1 ? (
                            // not last path part

                          
                            <>
                                <BreadcrumbItem>  {/* path cobmining to make url and i+1 because in slice(start,end) not include end */}
                                    <BreadcrumbLink href={
                                        pathArray[0]==="anime"? "/":
                                        "/" + pathArray.slice(2, i + 1).join("/")
                                        }>
                                        {part}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        ) : (
                            // last path part
                            <BreadcrumbItem>
                                <BreadcrumbPage>{part}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                    </div>
                ))}

                {pathArray.length === 0 && (
                    <BreadcrumbItem>
                        <BreadcrumbPage>Home</BreadcrumbPage>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </div>
    );
}
