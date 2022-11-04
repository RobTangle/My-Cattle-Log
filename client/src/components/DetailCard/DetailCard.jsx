import React from 'react'

export default function DetailCard({animal }) {
  return (
    <div>
      <p>Nombre {animal.name}</p>
      <p>ID Senasa {animal.id_senasa}</p>
      <p>Raza {animal.breed_name}</p>
      <p>Tipo de animal {animal.type_of_animal}</p>
      <p>Peso {animal.weight_kg} kg</p>
      <p>Nacimiento {animal.birthday} kg</p>
      <p>Ubicación {animal.location}</p>
      <p>Tipo de dispositivo {animal.device_type}</p>
      <p>Número de dispositivo {animal.device_number}</p>
      {animal.comments ? <p>Comentarios {animal.comments}</p> : null}
      {animal.is_pregnant ? <p>Fecha estimada de parto {animal.delivery_date}</p> : null}
    </div>
  );
}
