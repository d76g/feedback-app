import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "feedback_db",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false,
    }
);

export default sequelize;