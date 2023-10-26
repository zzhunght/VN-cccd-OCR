import React from "react";
import Image from "next/image";
const Loading = () => {
  return (
    <div className="text-center">
      <div className="w-[20%] mx-auto">
        <Image
          src={"/gif/0_4Gzjgh9Y7Gu8KEtZ.avif"}
          alt="loading"
          width={200}
          height={200}
          className="w-full"
        />
      </div>
      <p className="font-semibold md:text-32 text-20 p-1">Đang xử lí ...</p>
    </div>
  );
};

export default Loading;
