import { AppDataSource } from "./config/data-source";

async function cleanup() {
    try {
        await AppDataSource.initialize();
        console.log("Connected to database...");

        // Delete duplicate products (keep only IDs 1-4)
        await AppDataSource.query("DELETE FROM product WHERE id > 4");
        console.log("Products cleaned up!");

        // Delete duplicate news (keep only IDs 1-3)
        await AppDataSource.query("DELETE FROM news WHERE id > 3");
        console.log("News cleaned up!");

        // Delete duplicate team members (keep only IDs 1-4)
        await AppDataSource.query("DELETE FROM team_member WHERE id > 4");
        console.log("Team members cleaned up!");

        // Delete duplicate contacts (keep only IDs 1-2)
        await AppDataSource.query("DELETE FROM contact WHERE id > 2");
        console.log("Contacts cleaned up!");

        // Verify counts
        const [products] = await AppDataSource.query("SELECT COUNT(*) as count FROM product");
        const [news] = await AppDataSource.query("SELECT COUNT(*) as count FROM news");
        const [team] = await AppDataSource.query("SELECT COUNT(*) as count FROM team_member");
        const [contacts] = await AppDataSource.query("SELECT COUNT(*) as count FROM contact");

        console.log("\n✅ Final record counts:");
        console.log(`  Products:     ${products.count}`);
        console.log(`  News:         ${news.count}`);
        console.log(`  Team Members: ${team.count}`);
        console.log(`  Contacts:     ${contacts.count}`);

        await AppDataSource.destroy();
        console.log("\nCleanup completed successfully!");
    } catch (error) {
        console.error("Error during cleanup:", error);
        if (AppDataSource.isInitialized) await AppDataSource.destroy();
    }
}

cleanup();
