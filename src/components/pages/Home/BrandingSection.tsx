"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const BrandingSection = () => {
  const medicines = [
    "https://png.pngtree.com/png-clipart/20241216/original/pngtree-medicine-and-drug-health-tablet-isolated-on-transparent-background-png-image_17920907.png",
    "https://png.pngtree.com/png-clipart/20240319/original/pngtree-3d-illustration-pills-and-medicine-bottles-suitable-for-medical-png-image_14626674.png",
    "https://png.pngtree.com/png-clipart/20240321/original/pngtree-3d-illustration-of-medicine-guide-capsule-png-image_14640448.png",
    "https://png.pngtree.com/png-clipart/20231016/original/pngtree-medical-pill-capsule-cutout-png-file-png-image_13320362.png",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === medicines.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [medicines.length]); // Add `medicines.length` to the dependency array

  return (
    <div className="">
      <div className="container mx-auto px-[10px]">
        <div className="lg:flex justify-between items-center bannerBG p-[30px] border border-[#4a54e1] rounded-lg">
          {/* Left Section - Text Content */}
          <div className="flex-1">
            <h1 className="mb-[20px] leading-[60px] text-[25px] lg:text-5xl font-bold">
              Your Trusted Online Pharmacy
            </h1>
            <p className="mb-[20px]">
              Get high-quality medicines and healthcare products delivered to
              your doorstep.
            </p>

            {/* Shop Now Button */}
            <div>
              <Link href="/shop" className="cursor-pointer">
                <button className="bg-[#4a54e1] cursor-pointer bannerBtn px-[45px] py-[15px] rounded-lg text-white hover:bg-[#3a44d1] transition-colors duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section - Image Slider */}
          <div className="flex-1 flex justify-center items-center">
            <Image
              src={medicines[current]}
              width={400}
              height={600}
              alt="Medicine"
              className="rounded-lg transition-opacity duration-700"
              priority // Ensure the first image loads quickly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection;
