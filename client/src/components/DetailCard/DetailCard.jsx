import React from "react";
import DetailDiv from "./DetailDiv";
import ImgDetail from "./ImgDetail";

export default function DetailCard({ animal }) {
  const images = [animal.image_1, animal.image_2, animal.image_3];
  console.log(
    "🚀 ~ file: DetailCard.jsx ~ line 7 ~ DetailCard ~ images",
    images
  );
  const [index, setIndex] = React.useState(0);
  const img = images[index];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:gap-20 gap-10">
      <div className="relative">
        {/* Carousel */}
        <div className=" relative h-56   sm:h-64 xl:h-80 ">
          <ImgDetail img={img} />
        </div>
        {(images[0] === null && images[1] === null && images[2] === null) ? (null): (
        <>
          {/* Slider Controls */ }
        {index > 0 && (
          <button
            type="button"
            className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
            onClick={() => setIndex(index - 1)}
          >
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span class="hidden">Previous</span>
            </span>
          </button>
        )}
        {index < images.length - 1 && (
          <button
            className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
            onClick={() => setIndex(index + 1)}
          >
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span class="hidden">Next</span>
            </span>
          </button>
        )}
        </> ) }
      </div>

      <div className="text-gray">
        <DetailDiv text="Nombre" value={animal.name} />
        <DetailDiv text="ID Senasa " value={animal.id_senasa} />
        <DetailDiv text="Raza" value={animal.breed_name} />
        <DetailDiv text="Tipo de animal" value={animal.type_of_animal} />
        <DetailDiv text="Peso" value={animal.weight_kg + "kg"} />
        <DetailDiv text="Nacimiento" value={animal.birthday} />
        <DetailDiv text="Ubicación" value={animal.location} />
        <DetailDiv text="Tipo de dispositivo " value={animal.device_type} />
        <DetailDiv text="Número de dispositivo " value={animal.device_number} />

        {animal.comments ? (
          <DetailCard text="Comentarios" value={animal.comments} />
        ) : null}
        {animal.is_pregnant ? (
          <DetailCard text="Fecha de parto" value={animal.delivery_date} />
        ) : null}
      </div>
    </div>
  );
}
