import { DataTypes, Model, InferAttributes, InferCreationAttributes, ForeignKey, CreationOptional } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import Application from "./application.model";

class Feedback extends Model<InferAttributes<Feedback>, InferCreationAttributes<Feedback>> {
    public id!: CreationOptional<number>; // ✅ Allows Sequelize to auto-generate ID
    public note!: string | null;
    public rating!: number;
    public readonly createdAt!: CreationOptional<Date>; // ✅ Allows Sequelize to auto-generate timestamps
    public readonly updatedAt!: CreationOptional<Date>;

    // Foreign Keys
    public userId!: ForeignKey<User["id"]>;
    public applicationId!: ForeignKey<Application["id"]>;
}

// Initialize model
Feedback.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
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
        tableName: "feedback",
        timestamps: true,
    }
);

// Define associations
Feedback.belongsTo(User, { foreignKey: "userId" });
Feedback.belongsTo(Application, { foreignKey: "applicationId" });

export default Feedback;