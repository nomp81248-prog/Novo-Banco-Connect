import { storage } from './storage';

async function seed() {
  try {
    // BNP Paribas user
    const existing = await storage.getUserByUsername("Clara-jade01");
    if (!existing) {
      const user = await storage.createUser({
        username: "Clara-jade01",
        password: "1515",
        name: "Alexandra Jade Clara",
        balance: 16700000, // 167 000 €
        isBlocked: true,
        accountNumber: "2345678000000000"
      });
      console.log("Seeded BNP user:", user);
    } else {
      console.log("BNP user already exists.");
    }
  } catch (error) {
    console.error("Seed error:", error);
  }
  process.exit(0);
}

seed();
