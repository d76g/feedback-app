import { DataTypes, Model, InferAttributes, InferCreationAttributes, ForeignKey, CreationOptional } from "sequelize";
import sequelize from "../config/database";
import Feedback from "./feedback.model";
import User from "./user.model";

class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    public id!: CreationOptional<number>;
    public text!: string;
    public upVotes!: CreationOptional<number>;
    public downVotes!: CreationOptional<number>;
    public readonly createdAt!: CreationOptional<Date>;
    public readonly updatedAt!: CreationOptional<Date>;

    // Foreign Keys
    public feedbackId!: ForeignKey<Feedback["id"]>;
    public userId!: ForeignKey<User["id"]>;
}

// Initialize model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        upVotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: "up_votes", // Maps to database field
        },
        downVotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: "down_votes", // Maps to database field
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
        tableName: "comments",
        timestamps: true,
    }
);

// Define associations
Comment.belongsTo(Feedback, { foreignKey: "feedbackId" });
Comment.belongsTo(User, { foreignKey: "userId" });

export default Comment;