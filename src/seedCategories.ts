import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { Category } from "./domain/entities/Category";

const categories = [
    {
        code: "BEVERAGE",
        name_en: "Beverage",
        name_lo: "ເຄື່ອງດື່ມ",
        name_vi: "Đồ uống",
        isActive: true
    },
    {
        code: "FRESH FOOD",
        name_en: "Fresh Food",
        name_lo: "ອາຫານສົດ",
        name_vi: "Thực phẩm tươi sống",
        isActive: true
    },
    {
        code: "SPICE",
        name_en: "Spice",
        name_lo: "ເຄື່ອງເທດ",
        name_vi: "Gia vị",
        isActive: true
    },
    {
        code: "PANTRY",
        name_en: "Pantry",
        name_lo: "ອາຫານແຫ້ງ",
        name_vi: "Đồ khô",
        isActive: true
    }
];

async function seed() {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const categoryRepo = AppDataSource.getRepository(Category);

    for (const catData of categories) {
        let category = await categoryRepo.findOneBy({ code: catData.code });
        if (!category) {
            category = categoryRepo.create(catData);
            await categoryRepo.save(category);
            console.log(`Saved category: ${category.code}`);
        } else {
            console.log(`Category already exists: ${category.code}`);
        }
    }

    console.log("Seed completed");
    process.exit(0);
}

seed().catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
});
