import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

// Import model classes (not initialized yet!)
import Application from './application.model';
import User from './user.model';
import Feedback from './feedback.model';
import Comment from './comment.model';


// Initialize Models
Application.initModel(sequelize);
User.initModel(sequelize);
Feedback.initModel(sequelize);
Comment.initModel(sequelize);

// Build db object
const db = {
  sequelize,
  Sequelize,
  Application,
  User,
  Feedback,
  Comment,
};

// ✅ Associate models - filter only models, skip sequelize keys
[Application, User, Feedback, Comment].forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;