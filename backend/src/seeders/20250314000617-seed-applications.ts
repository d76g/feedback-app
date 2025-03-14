import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("applications", [
      { name: "Facebook", createdAt: new Date(), updatedAt: new Date() },
      { name: "Twitter", createdAt: new Date(), updatedAt: new Date() },
      { name: "Instagram", createdAt: new Date(), updatedAt: new Date() },
      { name: "WhatsApp", createdAt: new Date(), updatedAt: new Date() },
      { name: "LinkedIn", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("applications", {}, {}); // Remove all seeded data
  },
};