import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col  items-center p-4 overflow-hidden ">
      <div className="relative w-full max-w-2xl aspect-video mb-5 ">
        <Image
          src="/notfound.gif"
          fill
          alt="not found"
          className="object-contain "
          priority
          unoptimized
        />
      </div>

      <h1 className="text-3xl font-bold text-center mb-4">Page Not Found</h1>
      <p className="text-lg text-center text-gray-600 mb-6">
        Sorry, we couldn’t find the page you were looking for.
      </p>
     
    </div>
  );
}