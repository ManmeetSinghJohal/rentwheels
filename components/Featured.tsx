import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 gap-4">
      <Link href="/search" className="bg-adds1 bg-bottom pl-4 pt-4 flex flex-col justify-between bg-cover bg-no-repeat h-[232px] rounded-[10px]  lg:w-full md:h-[260px] lg:h-[360px]">
        <div className="space-y-2 md:space-y-4 w-3/4">
          <h1 className="paragraph-bold text-white-50 sm:h3-semibold md:text-[26px] md:leading-7  lg:h1-semibold lg:w-4/6">The Best Platform for Car Rental</h1>
          <p className="small-regular md:paragraph-medium lg:text-[20px] lg:leading-6 leading-5 text-white-50">Ease of doing a car rental safely and reliably. Of course at a low price.</p>
        </div>
        <div className="w-full md:w-3/4 md:ml-auto lg:h-[116px] lg:mx-auto ">
          <Image src="/images/adds-car1.png" alt="ads" width={340} height={108} className="w-3/4 mx-auto lg:w-[406px] lg:h-full md:w-full " />
        </div>
      </Link>
      <Link href="/search" className="bg-adds2 hidden pl-4 pt-4 sm:flex flex-col justify-between bg-cover bg-no-repeat h-[232px] rounded-[10px] lg:w-full md:h-[260px] lg:h-[360px]">
        <div className="space-y-2 md:space-y-4 w-3/4">
          <h1 className="paragraph-bold text-white-50 lg:w-4/6 sm:h3-semibold md:text-[26px] md:leading-7  lg:h1-semibold ">Easy way to rent a car at a low price</h1>
          <p className="small-regular md:paragraph-medium lg:text-[20px] lg:leading-6 leading-5 text-white-50">Providing cheap car rental services and safe and comfortable facilities.</p>
        </div>
        <div className="w-full md:w-3/4 md:ml-auto lg:h-[116px] lg:mx-auto mb-1">
          <Image src="/images/adds-car2.png" alt="ads" width={340} height={108} className="w-3/4 mx-auto  lg:w-[406px] lg:h-full md:w-full " />
        </div>
      </Link>
    </div>
  );
};

export default Featured;
