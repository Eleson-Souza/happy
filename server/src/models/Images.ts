import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Orphanages from './Orphanages';

const Images = sequelize.define("images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    path: {
        type: DataTypes.STRING
    }
});

Orphanages.hasMany(Images, {
    foreignKey: 'orphanage_id',
    // CASCADE: Ao excluir ou alterar um id da tabela de referencia, os dados associados àquele registro serão também excluídos ou alterados.
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//Images.sync();

export default Images;