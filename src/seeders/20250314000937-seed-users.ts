import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("users", [
      { username: "Sven", createdAt: new Date(), updatedAt: new Date() },
      { username: "Bashar", createdAt: new Date(), updatedAt: new Date() },
      { username: "John", createdAt: new Date(), updatedAt: new Date() },
      { username: "Sam", createdAt: new Date(), updatedAt: new Date() },
      { username: "Aluo", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", {}, {}); // Remove all seeded data
  },
};