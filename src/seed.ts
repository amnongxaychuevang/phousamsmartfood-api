import { AppDataSource } from "./config/data-source";
import { Product } from "./entities/Product";
import { News } from "./entities/News";
import { TeamMember } from "./entities/TeamMember";
import { Contact } from "./entities/Contact";

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log("Data Source initialized for seeding...");

        const productRepo = AppDataSource.getRepository(Product);
        const newsRepo = AppDataSource.getRepository(News);
        const teamRepo = AppDataSource.getRepository(TeamMember);
        const contactRepo = AppDataSource.getRepository(Contact);

        // 0. Clear existing data to avoid duplicates
        console.log("Cleaning up old data...");
        await productRepo.clear();
        await newsRepo.clear();
        await teamRepo.clear();
        await contactRepo.clear();
        console.log("Old data cleared!");

        // 1. Seed Products
        console.log("Seeding Products...");
        const products = [
            {
                name_lo: "ຊາ ພູຊໍາ",
                name_en: "Phou Sam Tea",
                name_vi: "Trà Phou Sam",
                description_lo: "ຊາແດງ ແລະ ຊາຂຽວຈາກຕົ້ນຊາອາຍຸຮ້ອຍປີ",
                description_en: "Red and green tea from century-old trees",
                description_vi: "Trà đỏ và trà xanh từ những cây trà hàng trăm năm tuổi",
                category: "Beverage",
                imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=800",
                isActive: true
            },
            {
                name_lo: "ໜໍ່ໄມ້ພູ ຊໍາ",
                name_en: "Phou Sam Bamboo Shoots",
                name_vi: "Măng Phou Sam",
                description_lo: "ສົດ, ທໍາມະຊາດ ແລະ ພ້ອມສໍາລັບການປຸງແຕ່ງ",
                description_en: "Fresh, natural, and ready to serve",
                description_vi: "Tươi, tự nhiên và sẵn sàng để thưởng thức",
                category: "Fresh Food",
                imageUrl: "https://images.unsplash.com/photo-1599307767316-776533bb941c?auto=format&fit=crop&q=80&w=800",
                isActive: true
            },
            {
                name_lo: "ພິກໄທ ຫົວພັນດຳ ແລະ ໝາກແຂ້ນ",
                name_en: "Houaphanh Black Pepper & Red Chili",
                name_vi: "Tiêu đen & Ớt đỏ Houaphanh",
                description_lo: "ກິ່ນແຮງ, ຫອມ ແລະ ເຕັມໄປດ້ວຍລົດຊາດ",
                description_en: "Bold, aromatic, and full of flavor",
                description_vi: "Đậm đà, thơm nồng và tràn đầy hương vị",
                category: "Spices",
                imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
                isActive: true
            },
            {
                name_lo: "ສ່ວນປະກອບອາຫານລາວແບບດັ້ງເດີມ",
                name_en: "Traditional Lao Ingredients",
                name_vi: "Nguyên liệu truyền thống Lào",
                description_lo: "ມາຈາກທ້ອງຖິ່ນ, ແປຮູບເປັນສິນຄ້າແບບຍືນຍົງ",
                description_en: "Locally sourced, sustainably processed",
                description_vi: "Thu mua địa phương, chế biến bền vững",
                category: "Pantry",
                imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?auto=format&fit=crop&q=80&w=800",
                isActive: true
            }
        ];

        for (const p of products) {
            const product = productRepo.create(p);
            await productRepo.save(product);
        }
        console.log("Products seeded successfully!");

        // 2. Seed News
        console.log("Seeding News...");
        const newsData = [
            {
                title_lo: "ລະດູການເກັບກ່ຽວຊາພູສາມ ປີ 2026 ເລີ່ມຕົ້ນແລ້ວ",
                title_en: "Phou Sam Tea Harvest Season 2026 Begins",
                title_vi: "Mùa thu hoạch Trà Phou Sam năm 2026 bắt đầu",
                content_lo: "ຊາວກະສິກອນທ້ອງຖິ່ນຂອງພວກເຮົາໄດ້ເລີ່ມເກັບກ່ຽວໃບຊາພູສາມຈາກຕົ້ນຊາປ່າເທິງພູເຂົາ.",
                content_en: "Our local farmers have started harvesting the legendary Phou Sam tea leaves from the ancient mountain trees.",
                content_vi: "Các nông dân địa phương của chúng tôi đã bắt đầu thu hoạch những lá trà Phou Sam huyền thoại từ những cây chè cổ thụ trên núi.",
                imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=800",
                isActive: true,
                date: new Date()
            },
            {
                title_lo: "ຂໍ້ລິເລີ່ມການສ້າງວຽກເຮັດງານທຳໃຫ້ຊຸມຊົນໃໝ່ຖືກເປີດຕົວ",
                title_en: "New Community Job Initiative Launched",
                title_vi: "Sáng kiến việc làm cộng đồng mới được khởi xướng",
                content_lo: "ພູສາມ ສະມາດ ຟູດ ພູມໃຈທີ່ໄດ້ປະກາດໂຄງການໃໝ່ທີ່ມີເປົ້າໝາຍສ້າງວຽກເຮັດງານທຳໃໝ່ 50 ຕຳແໜ່ງໃນບ້ານຕ່າງໆຂອງເມືອງຊຳເໜືອ.",
                content_en: "Phou Sam Smart Food is proud to announce a new program aimed at creating 50 new jobs in rural Samneua villages.",
                content_vi: "Phou Sam Smart Food tự hào thông báo một chương trình mới nhằm tạo ra 50 việc làm mới tại các làng bản Samneua nông thôn.",
                imageUrl: "https://images.unsplash.com/photo-1501747315-124a0eaca060?auto=format&fit=crop&q=80&w=800",
                isActive: true,
                date: new Date()
            },
            {
                title_lo: "ການປ່ຽນແປງສູ່ການໃຊ້ບັນຈຸພັນທີ່ຍືນຍົງສຳເລັດແລ້ວ",
                title_en: "Sustainable Packaging Transition Complete",
                title_vi: "Hoàn tất chuyển đổi sang bao bì bền vững",
                content_lo: "ພວກເຮົາໄດ້ປະສົບຜົນສຳເລັດໃນການປ່ຽນໄປໃຊ້ບັນຈຸພັນທີ່ຍ່ອຍສະຫຼາຍໄດ້ 100% ສຳລັບຜະລິດຕະພັນໜໍ່ໄມ້ທັງໝົດຂອງພວກເຮົາ.",
                content_en: "We have successfully moved to 100% biodegradable packaging for all our bamboo shoot products.",
                content_vi: "Chúng tôi đã chuyển đổi thành công sang bao bì phân hủy sinh học 100% cho tất cả các sản phẩm măng của mình.",
                imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
                isActive: true,
                date: new Date()
            }
        ];

        for (const n of newsData) {
            const news = newsRepo.create(n);
            await newsRepo.save(news);
        }
        console.log("News seeded successfully!");

        // 3. Seed Team Members
        console.log("Seeding Team members...");
        const teamData = [
            {
                name: "Mr. Vanhthong THORKHOUALOUA",
                role: "Founder & Chief Executive Officer (CEO)",
                bio: "Vanhthong leads the company with a strong vision for sustainable development and smart food innovation. With a background in forestry landscape restoration and value chains development, he brings both technical knowledge and leadership experience.",
                order: 1
            },
            {
                name: "Ms. Axong MAICHUEDOUAVANG",
                role: "Deputy Director, Chief Financial officer (CFO)",
                bio: "Axong oversees business operations and product development. With deep local roots and strong management skills, she ensures that every product from Phou Sam meets the highest standards of quality and authenticity. She is passionate about supporting women entrepreneurs and promoting local ingredients.",
                order: 2
            },
            {
                name: "Mr. Johnny VISISOMBATH",
                role: "Marketing & Supply Chain Officer",
                bio: "Johnny manages coordination with farmers and processing teams. He ensures product consistency, quality control, and smooth operations from sourcing to packaging. His attention to detail and strong relationships with producers make him a key part of the company’s growth.",
                order: 3
            },
            {
                name: "Mr. Amnong XAYCHUEVANG",
                role: "IT supports & Communication Officer",
                bio: "Amnong leads the company’s communication strategy, storytelling, and branding activities. He works to connect Phou Sam Smart Food with customers, partners, and communities promoting the message of sustainability and smart innovation.",
                order: 4
            }
        ];

        for (const t of teamData) {
            const member = teamRepo.create(t);
            await teamRepo.save(member);
        }
        console.log("Team members seeded successfully!");

        // 4. Seed Contacts (Optional Example Messages)
        console.log("Seeding Example Contacts...");
        const contactData = [
            {
                name: "John Smith",
                email: "johnsmith@example.com",
                phone: "+856 20 12345678",
                subject: "Inquiry about Phou Sam Tea Wholesale",
                message: "Hello, I am interested in distributing Phou Sam Tea in Thailand. Do you have a wholesale price list?",
                createdAt: new Date()
            },
            {
                name: "Somsay",
                email: "somsay@gmail.com",
                phone: "+856 20 99887766",
                subject: "Question about Bamboo Shoots",
                message: "Are your bamboo shoots available for international shipping to Vietnam?",
                createdAt: new Date()
            }
        ];

        for (const c of contactData) {
            const contact = contactRepo.create(c);
            await contactRepo.save(contact);
        }
        console.log("Example contacts seeded successfully!");

        await AppDataSource.destroy();
        console.log("Seeding process completed successfully!");
    } catch (error) {
        console.error("Error during seeding:", error);
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

seed();
