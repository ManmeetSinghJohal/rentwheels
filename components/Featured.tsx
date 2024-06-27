import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Link href="/search" className="flex h-[232px] flex-col justify-between rounded-[10px] bg-adds1 bg-cover bg-bottom bg-no-repeat pl-4 pt-4  md:h-[260px] lg:h-[360px] lg:w-full">
        <div className="w-3/4 space-y-2 md:space-y-4">
          <h1 className="paragraph-bold sm:h3-semibold lg:h1-semibold text-white-50 md:text-[26px]  md:leading-7 lg:w-4/6">The Best Platform for Car Rental</h1>
          <p className="small-regular md:paragraph-medium leading-5 text-white-50 lg:text-[20px] lg:leading-6">Ease of doing a car rental safely and reliably. Of course at a low price.</p>
        </div>
        <div className="w-full md:ml-auto md:w-3/4 lg:mx-auto lg:h-[116px] ">
          <Image src="/images/adds-car1.png" alt="ads" width={340} height={108} className="mx-auto w-3/4 md:w-full lg:h-full lg:w-[406px] " />
        </div>
      </Link>
      <Link href="/search" className="hidden h-[232px] flex-col justify-between rounded-[10px] bg-adds2 bg-cover bg-no-repeat pl-4 pt-4 sm:flex md:h-[260px] lg:h-[360px] lg:w-full">
        <div className="w-3/4 space-y-2 md:space-y-4">
          <h1 className="paragraph-bold sm:h3-semibold lg:h1-semibold text-white-50 md:text-[26px] md:leading-7  lg:w-4/6 ">Easy way to rent a car at a low price</h1>
          <p className="small-regular md:paragraph-medium leading-5 text-white-50 lg:text-[20px] lg:leading-6">Providing cheap car rental services and safe and comfortable facilities.</p>
        </div>
        <div className="mb-1 w-full md:ml-auto md:w-3/4 lg:mx-auto lg:h-[116px]">
          <Image src="/images/adds-car2.png" alt="ads" width={340} height={108} className="mx-auto w-3/4  md:w-full lg:h-full lg:w-[406px] " />
        </div>
      </Link>
    </div>
  );
};

export default Featured;
