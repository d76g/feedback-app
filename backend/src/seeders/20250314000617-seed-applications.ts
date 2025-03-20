import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    // 🔥 Check if applications table has data
    const apps = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM "applications";`
    );
    
    const count = parseInt((apps[0] as any)[0].count, 10);

    if (count > 0) {
      console.log("📌 Applications already seeded, skipping...");
      return;
    }

    // ✅ Seed only if table is empty
    await queryInterface.bulkInsert("applications", [
      { name: "Facebook", createdAt: new Date(), updatedAt: new Date() },
      { name: "Twitter", createdAt: new Date(), updatedAt: new Date() },
      { name: "Instagram", createdAt: new Date(), updatedAt: new Date() },
      { name: "WhatsApp", createdAt: new Date(), updatedAt: new Date() },
      { name: "LinkedIn", createdAt: new Date(), updatedAt: new Date() },
    ]);

    console.log("✅ Applications seeded successfully");
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("applications", {}, {}); // Remove all seeded data
  },
};