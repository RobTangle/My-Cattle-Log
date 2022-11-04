import React from "react";
import DetailDiv from "./DetailDiv";

export default function DetailCard({ animal }) {
  return (
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

      {animal.comments ? <DetailCard text="Comentarios" value={animal.comments} /> : null}
      {animal.is_pregnant ? (
        <DetailCard text="Fecha de parto" value={animal.delivery_date} />
      ) : null}
    </div>
  );
}
