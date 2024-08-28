import { useState, useEffect } from "react";
import Card from "../Components/Card";

const RelatedProducts = () => {
  const [relatedProducts, setProducts] = useState([]);
  // const [newProduct, setNewProduct] = useState([]);
  // const FillterProduct = () => {
  //   for (let i = 0; i < relatedProducts.length - 1; i++) {
  //     const element = relatedProducts[i];
  //     // product.push(element);
  //     // setNewProduct(...product);
  //   }
  // };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../public/db.json");
        const data = await response.json();
        // const products = [...data];
        let products = data.slice(0, 4);

        setProducts(products);

        console.log("Fetched pro:", products); // Log fetched data
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-col lg:flex-row gap-2 ">
      {relatedProducts.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
          link=""
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
