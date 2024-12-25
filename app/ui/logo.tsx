// import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        className="h-12 w-12 rotate-[15deg]"
        src="leasesafely_logo_blue.png"
        alt="Lease Safely Logo"
      />
      <p className="text-[44px]">Lease Safely</p>
    </div>
  );
}
