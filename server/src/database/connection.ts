import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("db_happy_nlw3", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00' // Config de fuso horário do Brasil (Brasília).
});

export default sequelize;