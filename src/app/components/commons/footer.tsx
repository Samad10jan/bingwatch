import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-t rounded-b-4xl from-accent   mt-16 pt-8 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between gap-8 mb-8">

                    <div className="flex flex-col ">
                        <h3 className="text-2xl self-start font-extrabold bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent mb-3">
                            BingWatch
                        </h3>

                        <div className=" text-sm flex flex-wrap ">

                            <Badge variant={"secondary"} className="cursor-pointer  transition-colors">
                                About Us
                            </Badge>
                            <Badge variant={"secondary"} className="cursor-pointer   transition-colors">
                                Contact
                            </Badge>

                        </div>

                    </div>

                    <div className="flex flex-col justify-center items-center self-end">
                        <h4 className="font-semibold mb-3">Connect</h4>
                        <div className="flex gap-3 mb-4">
                            <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-all">
                                <Github className="w-4 h-4" href="https://github.com/Samad10jan"/>
                            </Button>
                            <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-all">
                                𝕏
                            </Button>

                            <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-all">
                                <Linkedin/>
                            </Button>

                        </div>
                        <p className="text-xs text-muted-foreground">
                            Data provided by{" "}
                            <Link href="https://jikan.moe" target="_blank" className="text-primary hover:underline">
                                Jikan API
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}