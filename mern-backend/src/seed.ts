import Product from "./models/Product";
import mongoose from "mongoose";

const businessInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  about: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  address: { type: String },
  whatsapp: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  heroTitle: { type: String },
  heroSubtitle: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

const BusinessInfo =
  mongoose.models.BusinessInfo ||
  mongoose.model("BusinessInfo", businessInfoSchema);

export async function seedDatabase() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("Seeding initial boutique products...");
      await Product.insertMany([
        {
          name: "Adorable Pink Princess Dress",
          price: 29.99,
          image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg",
          category: "Dresses",
          description:
            "A breathtaking princess dress perfect for special occasions. Made with soft, comfortable fabric that is gentle on delicate skin.",
          sizes: ["6M", "12M", "18M", "2T", "3T"],
          colors: ["Pink", "White", "Lavender"],
          inStock: true,
          featured: true,
        },
        {
          name: "Cute Floral Romper Set",
          price: 19.99,
          image: "https://images.pexels.com/photos/1648386/pexels-photo-1648386.jpeg",
          category: "Rompers",
          description:
            "Adorable floral romper set with matching soft-stretch headband. Perfect for playtime and baby milestones.",
          sizes: ["3M", "6M", "9M", "12M"],
          colors: ["Yellow", "Pink", "Mint"],
          inStock: true,
          featured: true,
        },
        {
          name: "Angel Wings Tutu Skirt",
          price: 24.99,
          image: "https://images.pexels.com/photos/1620769/pexels-photo-1620769.jpeg",
          category: "Skirts",
          description:
            "Magical tutu skirt with delicate angel wings. Handcrafted with layers of non-scratchy tulle for the perfect twirl.",
          sizes: ["12M", "18M", "2T", "3T", "4T"],
          colors: ["White", "Pink", "Gold"],
          inStock: true,
          featured: true,
        },
        {
          name: "Sweet Dreams Sleepwear",
          price: 16.99,
          image: "https://images.pexels.com/photos/1648388/pexels-photo-1648388.jpeg",
          category: "Sleepwear",
          description:
            "Cozy pajama set with delicate cloud and star prints. Made from organic breathable cotton for peaceful sleep.",
          sizes: ["6M", "12M", "18M", "2T", "3T"],
          colors: ["Pink", "Blue", "Yellow"],
          inStock: true,
          featured: true,
        },
        {
          name: "Little Angel Hair Accessories",
          price: 12.99,
          image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          category: "Accessories",
          description:
            "Set of 5 adorable gentle hair clips and ribbon headbands in heirloom pastel colors.",
          sizes: ["One Size"],
          colors: ["Pink", "Yellow", "White", "Lavender"],
          inStock: true,
          featured: true,
        },
        {
          name: "Sunshine Summer Dress",
          price: 32.99,
          image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          category: "Dresses",
          description:
            "Bright and cheerful summer dress with flutter sleeves and mother-of-pearl buttons.",
          sizes: ["12M", "18M", "2T", "3T", "4T"],
          colors: ["Yellow", "Coral", "Mint"],
          inStock: true,
          featured: true,
        },
      ]);
      console.log("Products seeded successfully.");
    }

    const info = await BusinessInfo.findOne();
    if (!info) {
      console.log("Seeding business info...");
      await BusinessInfo.create({
        name: "Angel's Paradise",
        tagline: "Little Girl's Boutique & Accessories",
        about:
          "Angel’s Paradise was born from a mother’s search for baby clothing that didn't compromise between beauty and gentleness. We craft tender, heirloom-quality clothing designed for cherished moments and sensitive skin.",
        contactEmail: "hello@angelsparadise.com",
        contactPhone: "+94 71 305 2556",
        address: "Colombo, Sri Lanka",
        whatsapp: "94713052556",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
      });
      console.log("Business info seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
}
