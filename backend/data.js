import bcrypt from 'bcryptjs';

const data = {
    users: [
      {
        name:'Akash',
        email: 'admin@example.com',
        password: bcrypt.hashSync('1234'),
        isAdmin: true,
      },
      {
        name: 'Rahul',
        email: 'user@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
      }  

    ],
  products: [
    {
      name: "Nike Slim shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image: "/images/d1.jpg", //697px * 829px
      price: 450,
      countStock: 1,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      name: "Adidas fit shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image: "/images/d2.jpg",
      price: 450,
      countStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
    {
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image: "/images/p1.jpg",
      price: 750,
      countStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality shirt",
    },
    {
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image: "/images/p2.jpg",
      price: 450,
      countStock: 0,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 12,
      description: "high quality pant",
    },
  ],
};
export default data;
