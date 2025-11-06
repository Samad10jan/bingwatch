"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CarouselAnimeSlide from "./slider";
import { Spinner } from "@/components/ui/spinner";
import { LazyAnimeSectionsProps } from "@/lib/type";

export default function LazyAnimeSections({ sections }: LazyAnimeSectionsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [dataList, setDataList] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);

          const results = await Promise.all(
            sections.map(section =>
              fetch(section.url)
                .then(res => res.json())
                .then(json => json.data || [])
                .catch(() => [])
            )
          );

          const newData: Record<string, any[]> = {};
          sections.forEach((section, i) => {
            newData[section.type] = results[i];
          });

          setDataList(newData);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasLoaded, sections]);
  

  return (
    <div ref={ref} className="opacity-100 transition-all duration-700">
      {hasLoaded ?
        sections.map(({ title, type }) =>

          dataList[type]?.length > 0 ? (

            <section key={type}>
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <ScrollArea>
                <CarouselAnimeSlide data={dataList[type]} type={type} />
              </ScrollArea>
              <Separator className="my-8" />
            </section>
          ) : null
        ):<Spinner className="mx-auto"/>}
    </div>
  );
}