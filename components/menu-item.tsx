'use client';
import Image, { StaticImageData } from "next/image";
import { useRouter } from 'next/navigation';


export default function MenuItem({
  profileName,
  title,
  imgMenu,
  destination
}: {
   profileName: string | undefined;
   title?: string;
   imgMenu : StaticImageData;
   destination : string;
}) {
  const router = useRouter();
  router.prefetch(destination);

  const handleNavigation = () => {
    router.push(destination);
  };

  return (
    <div className="flex grid grid-rows-3 content-center justify-center items-center bg-white shadow-lg rounded-lg h-96">
      <h1 className="font-bold text-xl">{profileName}</h1>
      <div className="relative w-full h-40">
        <Image 
                      src={imgMenu}
                      alt="logo"
                      className="object-contain"
                      priority
                      fill
                      />
      </div>
      <button onClick={handleNavigation} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {title}
      </button>
    </div>
  );
}
