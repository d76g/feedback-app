import { DataTypes, Model, InferAttributes, InferCreationAttributes, Sequelize } from "sequelize";

class Application extends Model<InferAttributes<Application>, InferCreationAttributes<Application>> {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // ✅ Define associations here
  public static associate(models: any): void {
    Application.hasMany(models.Feedback, {
      foreignKey: "applicationId",
      as: "feedback",
    });
  }

  // ✅ Define initialization separately
  public static initModel(sequelize: Sequelize): void {
    Application.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
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
        tableName: "applications",
        timestamps: true,
      }
    );
  }
}

export default Application;