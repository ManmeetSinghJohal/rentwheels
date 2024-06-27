import React from "react";
import Logo from "./shared/Logo";

const Footer = () => {
  return (
    <div className="bg-white-50 p-6 dark:bg-gray-900 xl:px-[60px]">
      <div className="lg:mt-[72px] lg:flex lg:justify-between">
        <div className="w-[230px] lg:w-[300px]">
          <div className="text-2xl font-bold lg:text-[32px]">
            <Logo extraClasses="fill-gray-900 dark:fill-white-50 ml-[-12px] lg:ml-[-10px]" />
          </div>
          <div className="mt-4 text-xs font-medium leading-6 text-gray-400 dark:text-white-200 lg:text-base">Our vision is to provide convenience and help increase your sales business.</div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-x-4 tracking-wider lg:mt-0 lg:gap-x-6 xl:gap-x-[60px]">
          <div className="mb-12 min-w-[142px] lg:min-w-[152px]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white-100 sm:text-xl">About</h3>
            <ul className="mt-4 text-sm font-medium leading-10 text-gray-400 dark:text-white-200 sm:text-base sm:leading-10">
              <li className="pb-2">How it works</li>
              <li className="pb-2">Featured</li>
              <li className="pb-2">Partnership</li>
              <li className="pb-2">Business Relations</li>
            </ul>
          </div>

          <div className="mb-12 min-w-[142px] lg:min-w-[152px]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white-100 sm:text-xl">Community</h3>
            <ul className="mt-4 text-sm font-medium leading-10 text-gray-400 dark:text-white-200 sm:text-base sm:leading-10">
              <li className="pb-2">Events</li>
              <li className="pb-2">Blog</li>
              <li className="pb-2">Podcast</li>
              <li className="pb-2">Invite a friend</li>
            </ul>
          </div>

          <div className="mb-12 min-w-[142px] lg:min-w-[101px] xl:min-w-[152px]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white-100 sm:text-xl">Socials</h3>
            <ul className="mt-4 text-sm font-medium leading-10 text-gray-400 dark:text-white-200 sm:text-base sm:leading-10">
              <li className="pb-2">Discord</li>
              <li className="pb-2">Instagram</li>
              <li className="pb-2">Twitter</li>
              <li className="pb-2">Facebook</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-xs font-semibold text-gray-800 dark:border-gray-850 dark:text-white-100 lg:flex lg:flex-row-reverse lg:justify-between lg:border-t-[1px] lg:py-14 lg:pt-10 lg:text-base ">
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
