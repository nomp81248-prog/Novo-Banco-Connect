import { storage } from './storage';

async function seed() {
  try {
    const existing = await storage.getUserByUsername("Manoel11");
    if (!existing) {
      const user = await storage.createUser({
        username: "Manoel11",
        password: "1515",
        name: "Vieira Manoel",
        balance: 180000000, // 1 800 000 €
        isBlocked: true,
        accountNumber: "00056006910"
      });
      console.log("Seeded user:", user);
    } else {
      console.log("User already exists.");
    }
  } catch (error) {
    console.error("Seed error:", error);
  }
  process.exit(0);
}

seed();