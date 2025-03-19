import { DataTypes, Model, InferAttributes, InferCreationAttributes, Sequelize, ForeignKey, CreationOptional } from "sequelize";

class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  public id!: CreationOptional<number>;
  public text!: string;
  public upVotes!: CreationOptional<number>;
  public downVotes!: CreationOptional<number>;
  public readonly createdAt!: CreationOptional<Date>;
  public readonly updatedAt!: CreationOptional<Date>;

  // Foreign Keys (store IDs only)
  public feedbackId!: ForeignKey<number>;
  public userId!: ForeignKey<number>;

  // ✅ Define associations
  public static associate(models: any): void {
    Comment.belongsTo(models.Feedback, {
      foreignKey: "feedbackId",
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });
  }

  // ✅ Define initialization separately
  public static initModel(sequelize: Sequelize): void {
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
          field: "up_votes",
        },
        downVotes: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          field: "down_votes",
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
  }
}

export default Comment;