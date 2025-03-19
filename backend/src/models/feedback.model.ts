import { DataTypes, Model, InferAttributes, InferCreationAttributes, Sequelize, ForeignKey, CreationOptional } from "sequelize";

class Feedback extends Model<InferAttributes<Feedback>, InferCreationAttributes<Feedback>> {
    public id!: CreationOptional<number>;
    public note!: string | null;
    public rating!: number;
    public readonly createdAt!: CreationOptional<Date>;
    public readonly updatedAt!: CreationOptional<Date>;

    // Foreign Keys
    public userId!: ForeignKey<number>;
    public applicationId!: ForeignKey<number>;

    static associate(models: any) {
        Feedback.belongsTo(models.User, { foreignKey: "userId"});
        Feedback.belongsTo(models.Application, { foreignKey: "applicationId" });
        Feedback.hasMany(models.Comment, { foreignKey: "feedbackId" });
    }

    static initModel(sequelize: Sequelize) {
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
        return Feedback;
    }
}

export default Feedback;