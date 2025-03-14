import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    public id!: number;
    public username!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
    }
);

export default User;