import React from "react";
import Logo from "./shared/Logo";

const Footer = () => {
  return (
    <div className="bg-white-50 p-6 xl:px-[60px] dark:bg-gray-900">
      <div className="lg:flex lg:justify-between lg:mt-[72px]">
        <div className="w-[230px] lg:w-[300px]">
          <div className="text-2xl font-bold lg:text-[32px]">
            <Logo extraClasses="fill-gray-900 dark:fill-white-50 ml-[-12px] lg:ml-[-10px]" />
          </div>
          <div className="mt-4 text-xs font-medium text-gray-400 leading-6 lg:text-base dark:text-white-200">Our vision is to provide convenience and help increase your sales business.</div>
        </div>

        <div className="flex flex-wrap gap-x-4 justify-between mt-12 tracking-wider lg:mt-0 lg:gap-x-6 xl:gap-x-[60px]">
          <div className="min-w-[142px] mb-12 lg:min-w-[152px]">
            <h3 className="text-gray-800 text-lg sm:text-xl font-semibold dark:text-white-100">About</h3>
            <ul className="mt-4 text-sm sm:text-base sm:leading-10 font-medium text-gray-400 leading-10 dark:text-white-200">
              <li className="pb-2">How it works</li>
              <li className="pb-2">Featured</li>
              <li className="pb-2">Partnership</li>
              <li className="pb-2">Business Relations</li>
            </ul>
          </div>

          <div className="min-w-[142px] mb-12 lg:min-w-[152px]">
            <h3 className="text-gray-800 text-lg sm:text-xl font-semibold dark:text-white-100">Community</h3>
            <ul className="mt-4 text-sm sm:text-base sm:leading-10 font-medium text-gray-400 leading-10 dark:text-white-200">
              <li className="pb-2">Events</li>
              <li className="pb-2">Blog</li>
              <li className="pb-2">Podcast</li>
              <li className="pb-2">Invite a friend</li>
            </ul>
          </div>

          <div className="min-w-[142px] mb-12 lg:min-w-[101px] xl:min-w-[152px]">
            <h3 className="text-gray-800 text-lg sm:text-xl font-semibold dark:text-white-100">Socials</h3>
            <ul className="mt-4 text-sm sm:text-base sm:leading-10 font-medium text-gray-400 leading-10 dark:text-white-200">
              <li className="pb-2">Discord</li>
              <li className="pb-2">Instagram</li>
              <li className="pb-2">Twitter</li>
              <li className="pb-2">Facebook</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="dark:text-white-100 lg:border-t-[1px] font-semibold text-gray-800 text-xs lg:flex lg:flex-row-reverse lg:justify-between lg:pt-10 lg:py-14 lg:text-base dark:border-gray-850 ">
        <div className=" flex justify-between lg:gap-x-4 xl:gap-x-[60px]">
          <div>Privacy & Policy</div>
          <div>Terms & Condition</div>
        </div>
        <div className="mt-8 lg:my-auto">©2022 MORENT. All rights reserved</div>
      </div>
    </div>
  );
};

export default Footer;
