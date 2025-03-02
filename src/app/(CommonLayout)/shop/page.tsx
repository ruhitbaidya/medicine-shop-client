"use client";

import Link from "next/link";

const Shop = () => {
  return (
    <>
      <div className="mt-[30px]">
        <div className="container mx-auto px-[10px]">
          <div className="grid grid-cols-4 gap-[25px]">
            <div className="col-span-1 bg-gray-50 h-screen p-[20px] border rounded-lg border-[#4a54e1]">
              <h4 className="text-center">Filter</h4>
              <p>Sorting</p>
              <div>
                <select
                  className="border border-[#4a54e1] w-full rounded-lg p-[8px]"
                  name=""
                  id=""
                >
                  <option value="">Low To Hight</option>
                  <option value="">Heigh To Low</option>
                </select>
              </div>
              <p>Category</p>
              <div>
                <select
                  className="border border-[#4a54e1] w-full rounded-lg p-[8px]"
                  name=""
                  id=""
                >
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">Heigh To Low</option>
                </select>
              </div>
              <p>Price</p>
              <div>
                <p>Low To Hight</p>
                <input type="range" className="w-full" />
              </div>
              <div>
                <p>heigh To Low</p>
                <input type="range" className="w-full" />
              </div>
              <div>
                <p>Prescription</p>
                <div className="">
                  <input type="checkbox" id="presc" className="mr-[10px]" />
                  <label htmlFor="presc">Checked Prescripption</label>
                </div>
              </div>
            </div>
            <div className="col-span-3 bg-gray-50 h-screen p-[20px] border rounded-lg border-[#4a54e1]">
              <div className="grid grid-cols-3">
                <div>
                  <h2>This is Header</h2>
                  <Link href="/shop/adlkjfladjf">See More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
