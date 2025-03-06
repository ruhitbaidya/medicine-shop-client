import Spinner from "@/components/shaired/spinner";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div>
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default Loading;
