import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Fíjate bien que tenga el 'export' al inicio
export const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    // Esto sincroniza tus modelos con la base de datos automáticamente
    await sequelize.sync({ alter: true }); 
    console.log('Connected to MySQL');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    process.exit(1);
  }
};

export default sequelize;