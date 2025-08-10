export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  category: string;
  description: string;
  sizes: string[];
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Adorable Pink Princess Dress',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
    ],
    category: 'Dresses',
    description: 'A beautiful pink princess dress perfect for special occasions. Made with soft, comfortable fabric that\'s gentle on delicate skin.',
    sizes: ['6M', '12M', '18M', '2T', '3T'],
    colors: ['Pink', 'White', 'Lavender'],
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Cute Floral Romper Set',
    price: 19.99,
    image: 'https://images.pexels.com/photos/1648386/pexels-photo-1648386.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1648386/pexels-photo-1648386.jpeg',
      'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg'
    ],
    category: 'Rompers',
    description: 'Adorable floral romper set with matching headband. Perfect for playtime and photo sessions.',
    sizes: ['3M', '6M', '9M', '12M'],
    colors: ['Yellow', 'Pink', 'Mint'],
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Angel Wings Tutu Skirt',
    price: 24.99,
    image: 'https://images.pexels.com/photos/1620769/pexels-photo-1620769.jpeg',
    category: 'Skirts',
    description: 'Magical tutu skirt with delicate angel wings. Made with layers of soft tulle for the perfect twirl.',
    sizes: ['12M', '18M', '2T', '3T', '4T'],
    colors: ['White', 'Pink', 'Gold'],
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Sweet Dreams Sleepwear',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1648388/pexels-photo-1648388.jpeg',
    category: 'Sleepwear',
    description: 'Cozy pajama set with cute cloud and star prints. Made from organic cotton for comfortable sleep.',
    sizes: ['6M', '12M', '18M', '2T', '3T'],
    colors: ['Pink', 'Blue', 'Yellow'],
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Little Angel Hair Accessories',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    category: 'Accessories',
    description: 'Set of 5 adorable hair clips and headbands in pastel colors. Perfect for completing any outfit.',
    sizes: ['One Size'],
    colors: ['Pink', 'Yellow', 'White', 'Lavender'],
    inStock: true,
    featured: true
  },
  {
    id: '6',
    name: 'Sunshine Yellow Summer Dress',
    price: 32.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    category: 'Dresses',
    description: 'Bright and cheerful summer dress with flutter sleeves. Perfect for sunny days and special moments.',
    sizes: ['12M', '18M', '2T', '3T', '4T'],
    colors: ['Yellow', 'Coral', 'Mint'],
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: 'Cozy Knit Cardigan',
    price: 28.99,
    image: 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg',
    category: 'Outerwear',
    description: 'Soft knit cardigan perfect for layering. Features pearl buttons and a sweet bow detail.',
    sizes: ['6M', '12M', '18M', '2T', '3T'],
    colors: ['Cream', 'Pink', 'Lavender'],
    inStock: true
  },
  {
    id: '8',
    name: 'Ballerina Inspired Outfit',
    price: 35.99,
    image: 'https://images.pexels.com/photos/1620769/pexels-photo-1620769.jpeg',
    category: 'Sets',
    description: 'Complete ballerina outfit with tulle skirt, bodysuit, and leg warmers. Dance-ready and adorable.',
    sizes: ['18M', '2T', '3T', '4T'],
    colors: ['Pink', 'White', 'Lavender'],
    inStock: true
  }
];

export const categories = [
  'All',
  'Dresses',
  'Rompers',
  'Skirts',
  'Sleepwear',
  'Accessories',
  'Outerwear',
  'Sets'
];

export const sizes = [
  '3M', '6M', '9M', '12M', '18M', '2T', '3T', '4T', '5T'
];