import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {

    const users = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM "users";`
    );

    if (parseInt((users[0] as any)[0].count, 10) > 0) {
      console.log("📌 Users already seeded, skipping...");
      return;
    }
    await queryInterface.bulkInsert("users", [
      { username: "Sven", createdAt: new Date(), updatedAt: new Date() },
      { username: "Bashar", createdAt: new Date(), updatedAt: new Date() },
      { username: "John", createdAt: new Date(), updatedAt: new Date() },
      { username: "Sam", createdAt: new Date(), updatedAt: new Date() },
      { username: "Aluo", createdAt: new Date(), updatedAt: new Date() },
    ]);

    console.log("✅ Users seeded successfully");
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", {}, {}); // Remove all seeded data
  },
};