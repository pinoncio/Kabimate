import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";

export const Institucion = sequelize.define('institucion',{
    'ID_INSTITUCION': {type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    'NOMBRE_INSTITUCION': {type: DataTypes.STRING},
    'TIPO_INSTITUCION': {type: DataTypes.STRING}
},
{
    timestamps: false,
    freezeTableName: true
})
