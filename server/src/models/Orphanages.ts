import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection';

export interface IOrphanage extends Model {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    createdAt: Date;
    updatedAt: Date;
    images: {
        id: number,
        path: string,
        createdAt: Date,
        updatedAt: Date,
        orphanage_id: number
    }[];
}
  
const Orphanages = sequelize.define<IOrphanage>('orphanages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 2) 
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 2)
    },
    about: {
        type: DataTypes.TEXT
    },
    instructions: {
        type: DataTypes.TEXT
    },
    opening_hours: {
        type: DataTypes.STRING
    },
    open_on_weekends: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

//Orphanages.sync({alter: true});

export default Orphanages;