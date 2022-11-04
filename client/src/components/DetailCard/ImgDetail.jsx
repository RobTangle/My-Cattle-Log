import React from "react";

export default function ImgDetail({ img }) {
  return (
    <img
      src={
        img
          ? img
          : "https://res.cloudinary.com/dfbxjt69z/image/upload/v1667154572/cattle/pexels-tobi-457447_n4w5ee.jpg"
      }
      class="w-full h-full object-cover "
      alt="..."
    />
  );
}
