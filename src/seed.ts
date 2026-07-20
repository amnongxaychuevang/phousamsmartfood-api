import { AppDataSource } from "./config/data-source";
import { Product } from "./domain/entities/Product";
import { News } from "./domain/entities/News";
import { TeamMember } from "./domain/entities/TeamMember";
import { Setting } from "./domain/entities/Setting";
import { Contact } from "./domain/entities/Contact";
import { User } from "./domain/entities/User";
import bcrypt from "bcryptjs";

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log("Data Source initialized for seeding...");

        const productRepo = AppDataSource.getRepository(Product);
        const newsRepo = AppDataSource.getRepository(News);
        const teamRepo = AppDataSource.getRepository(TeamMember);
        const contactRepo = AppDataSource.getRepository(Contact);
        const userRepo = AppDataSource.getRepository(User);

        // 0. Clear existing data to avoid duplicates
        console.log("Cleaning up old data...");
        await productRepo.clear();
        await newsRepo.clear();
        await teamRepo.clear();
        await contactRepo.clear();
        await userRepo.clear();
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

        // Seeding Admin User
        console.log("Seeding Admin User...");
        const hashedPassword = await bcrypt.hash("admin1234", 10);
        const adminUser = userRepo.create({
            username: "admin",
            password: hashedPassword
        });
        await userRepo.save(adminUser);
        console.log("Admin User seeded successfully!");

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
                name_lo: "ທ່ານ ວັນທອງ ທໍ່ຄົວລົວ",
                name_en: "Mr. Vanhthong THORKHOUALOUA",
                name_vi: "Ông Vanhthong THORKHOUALOUA",
                role_lo: "ຜູ້ກໍ່ຕັ້ງ ແລະ ຜູ້ອຳນວຍການໃຫຍ່ (CEO)",
                role_en: "Founder & Chief Executive Officer (CEO)",
                role_vi: "Nhà sáng lập & Giám đốc điều hành (CEO)",
                bio_lo: "ວັນທອງ ນຳພາລິເລີ່ມທຸລະກິດດ້ວຍວິໄສທັດອັນກວ້າງໄກ ເພື່ອການພັດທະນາແບບຍືນຍົງ ແລະ ຈັດການອາຫານແບບສະຫຼາດ. ດ້ວຍພື້ນຖານຄວາມຮູ້ດ້ານການຟື້ນຟູພູມີທັດປ່າໄມ້ ແລະ ການພັດທະນາຕ່ອງໂສ້ມູນຄ່າເພີ່ມ, ທ່ານໄດ້ນຳເອົາທັງຄວາມຮູ້ທາງດ້ານເຕັກນິກ ແລະ ປະສົບການການນຳພາມາບໍລິຫານ.",
                bio_en: "Vanhthong leads the company with a strong vision for sustainable development and smart food innovation. With a background in forestry landscape restoration and value chains development, he brings both technical knowledge and leadership experience.",
                bio_vi: "Vanhthong dẫn dắt công ty với tầm nhìn mạnh mẽ về phát triển bền vững và đổi mới thực phẩm thông minh. Với nền tảng về phục hồi cảnh quan rừng và phát triển chuỗi giá trị, ông mang lại cả kiến thức kỹ thuật và kinh nghiệm lãnh đạo.",
                order: 1
            },
            {
                name_lo: "ທ່ານ ນາງ ອາຊົ້ງ ໄມ້ຈື້ດົວວ່າງ",
                name_en: "Ms. Axong MAICHUEDOUAVANG",
                name_vi: "Bà Axong MAICHUEDOUAVANG",
                role_lo: "ຮອງຜູ້ອຳນວຍການ ແລະ ຫົວໜ້າຝ່າຍການເງິນ (CFO)",
                role_en: "Deputy Director, Chief Financial Officer (CFO)",
                role_vi: "Phó giám đốc, Giám đốc tài chính (CFO)",
                bio_lo: "ອາຊົ້ງ ຮັບຜິດຊອບເບິ່ງແຍງການດຳເນີນທຸລະກິດ ແລະ ການພັດທະນາຜະລິດຕະພັນ. ດ້ວຍຄວາມຜູกພັນກັບທ້ອງຖິ່ນ ແລະ ທັກສະການຄຸ້ມຄອງທີ່ເຂັ້ມແຂງ, ທ່ານນາງຮັບປະກັນວ່າທຸກຜະລິດຕະພັນຈາກ ພູຊໍາ ຕອບສະໜອງມາດຕະຖານຄຸນນະພາບ ແລະ ຄວາມບໍລິສຸດສູງສຸດ.",
                bio_en: "Axong oversees business operations and product development. With deep local roots and strong management skills, she ensures that every product from Phou Sam meets the highest standards of quality and authenticity.",
                bio_vi: "Axong giám sát các hoạt động kinh doanh và phát triển sản phẩm. Với nguồn gốc địa phương sâu sắc và kỹ năng quản lý mạnh mẽ, bà đảm bảo rằng mọi sản phẩm từ Phou Sam đều đáp ứng các tiêu chuẩn cao nhất về chất lượng và tính xác thực.",
                order: 2
            },
            {
                name_lo: "ທ່ານ ຈອນນີ ວິສີສົມບັດ",
                name_en: "Mr. Johnny VISISOMBATH",
                name_vi: "Ông Johnny VISISOMBATH",
                role_lo: "ພະນັກງານຝ່າຍການຕະຫຼາດ ແລະ ຕ່ອງໂສ້ອຸປະທານ",
                role_en: "Marketing & Supply Chain Officer",
                role_vi: "Nhân viên Tiếp thị & Chuỗi cung ứng",
                bio_lo: "ຈອນນີ ຄຸ້ມຄອງການປະສານງານກັບຊາວກະສິກອນ ແລະ ທີມງານປຸງແຕ່ງ. ທ່ານຮັບປະກັນຄວາມສອດຄ່ອງຂອງຜະລິດຕະພັນ, ການຄວບຄຸມຄຸນນະພາບ ແລະ ການດຳເນີນງານທີ່ສະດວກສະບາຍຈາກແຫຼ່ງຜະລິດໄປຫາການບັນຈຸພັນ.",
                bio_en: "Johnny manages coordination with farmers and processing teams. He ensures product consistency, quality control, and smooth operations from sourcing to packaging.",
                bio_vi: "Johnny quản lý việc điều phối với nông dân và các đội chế biến. Ông đảm bảo tính nhất quán của sản phẩm, kiểm soát chất lượng và hoạt động trôi chảy từ khâu thu mua đến đóng gói.",
                order: 3
            },
            {
                name_lo: "ທ່ານ ອຳນົງ ໄຊຈື້ວ່າງ",
                name_en: "Mr. Amnong XAYCHUEVANG",
                name_vi: "Ông Amnong XAYCHUEVANG",
                role_lo: "ພະນັກງານໄອທີ ແລະ ຝ່າຍສື່ສານອົງກອນ",
                role_en: "IT Support & Communication Officer",
                role_vi: "Nhân viên hỗ trợ CNTT & Truyền thông",
                bio_lo: "ອຳນົງ ນຳພາການສ້າງຍຸດທະສາດການສື່ສານຂອງບໍລິສັດ, ການເລົ່າເລື່ອງ ແລະ ກິດຈະກຳການສ້າງແບຣນ. ທ່ານເຮັດວຽກເພື່ອເຊື່ອມຕໍ່ ພູຊໍາ ສະມາດ ຟູດ ກັບລູກຄ້າ, ຄູ່ຮ່ວມງານ ແລະ ຊຸມຊົນ.",
                bio_en: "Amnong leads the company’s communication strategy, storytelling, and branding activities. He works to connect Phou Sam Smart Food with customers, partners, and communities promoting the message of sustainability.",
                bio_vi: "Amnong dẫn dắt chiến lược truyền thông, kể chuyện và các hoạt động xây dựng thương hiệu của công ty. Ông làm việc để kết nối Phou Sam Smart Food với khách hàng, đối tác và cộng đồng.",
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
