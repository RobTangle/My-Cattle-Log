export interface IAnimal {
  id_senasa: string;
  type_of_animal: ITypeOfAnimal;
  weight_kg?: number;
  name: string;
  device_type: string;
  device_number: string;
  comments?: string;
  image?: string;
  birthday?: string;
}

export enum ITypeOfAnimal {
  Novillo = "Novillo",
  Toro = "Toro",
  Vaquillona = "Vaquillona",
}
