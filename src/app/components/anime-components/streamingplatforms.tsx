import { Spinner } from "@/components/ui/spinner";
import { PlatformType } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LOGO_DEV_PUBLIC_KEY = "pk_O3rAPU-pT5S16kpLw_WfFQ";

function getLogoDevUrl(name: string) {
    return `https://img.logo.dev/name/${encodeURIComponent(name.toLowerCase())}?token=${LOGO_DEV_PUBLIC_KEY}`;
}

export default function Platforms({ id }: {
    id: string;
}) {
    const [platforms, setPlatforms] = useState<PlatformType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlatforms() {
            try {
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/streaming`);
                const data = await res.json();
                if (Array.isArray(data?.data) && data.data.length > 0) {
                    setPlatforms(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch platforms:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPlatforms();
    }, [id]);

    if (loading) return <p className="text-sm text-muted-foreground flex mb-5 mt-8">Loading platforms <Spinner /></p>;
    if (platforms.length === 0) return null

    return (

        <section className="mb-5 mt-8">

            <h2 className="text-2xl font-semibold mb-6">Streaming On</h2>
            <div className="flex  flex-wrap gap-5">
                {platforms.map((platform, index) => (
                    
                        <Link
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:underline"
                             key={index}
                        >
                            <div className="relative w-20 h-20   ">

                                <Image
                                    src={getLogoDevUrl(platform.name)}
                                    alt={`${platform.name} logo`}
                                    fill
                                    className=" object-cover rounded-full ring-accent-foreground ring-1 hover:ring-3  active:ring-3  transition-all duration-200"
                                />
                            </div>
                          
                        </Link>
                   
                ))}
            </div>
        </section >
    );
}
