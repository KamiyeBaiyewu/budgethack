import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/database/entities/*.js'],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource; 
