"use client";

import { getApi } from "@/components/api/apiCom";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchField = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handelSearch = async () => {
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/search/${search}`
    );
    router.push("/search");
    console.log(res);
  };
  return (
    <div className="py-[30px]">
      <div className="container mx-auto px-[10px]">
        <div>
          <h2 className="text-center text-3xl mb-[20px] font-bold text-black">
            Search Your Medicine
          </h2>
        </div>
        <div className="w-[100%] lg:w-[60%] mx-auto">
          <div className="relative">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[#4a54e1] w-full p-[20px] focus:outline-none rounded-lg"
              type="text"
              placeholder="Search By Category"
            />
            <button
              onClick={handelSearch}
              className="absolute top-2 right-2 btns"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
