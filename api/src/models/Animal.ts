"use strict";
import { Model } from "sequelize";
import { IAnimal, ITypeOfAnimal } from "../types/animal-types";

module.exports = (sequelize: any, DataTypes: any) => {
  class Animal extends Model<IAnimal> implements IAnimal {
    id_senasa!: string;
    type_of_animal!: ITypeOfAnimal;
    weight_kg?: number;
    name!: string;
    device_type!: string;
    device_number!: string;
    comments?: string;
    image?: string;
    birthday?: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Animal.belongsTo(models.User);
    }
  }
  Animal.init(
    {
      id_senasa: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        allowNull: false,
      },
      type_of_animal: {
        type: DataTypes.STRING,
        // type: DataTypes.ENUM("Novillo", "Toro", "Vaquillona"),
        // cuidado acá! También existe el ITypeOfAnimal que se utiliza. Cambiar ambos juntos.
        // type: DataTypes.ENUM(ITypeOfAnimal),
        allowNull: false,
      },
      weight_kg: {
        //peso en kilogramos
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: [1, 200],
        },
      },
      device_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      device_number: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
          len: [8, 8],
        },
      },
      comments: {
        type: DataTypes.STRING(3000),
        allowNull: true,
        validate: {
          len: [1, 3000],
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Animal",
    }
  );
  return Animal;
};
