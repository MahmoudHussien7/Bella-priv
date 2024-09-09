import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Category() {
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const res = await fetch("data.json");
      const data = await res.json();
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.log("Failed to fetch data: " + error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center content-center gap-5 lg:px-[3.8%]">
      {category.length > 0 &&
        category.map((c) => (
          <Link
            to={`/shop`}
            key={c.id}
            className="relative w-full md:w-[48%] lg:w-[30%] px-[7%] cursor-pointer bg-center bg-cover min-h-[25rem] max-h-[30rem] 
            lg:min-h-[25rem] lg:max-h-[70rem] xl:min-h-[35rem] xl:max-h-[60rem] group overflow-hidden"
            style={{ backgroundImage: `url(${c.image})` }}
          >
            <div
              className="absolute inset-0 transition-transform duration-300 group-hover:scale-110 bg-cover bg-center"
              style={{ backgroundImage: `url(${c.image})` }}
            ></div>
            <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity duration-300">
              {/* Add a gradient to ensure text visibility */}
              <div className="absolute inset-0 hover:bg-gradient-to-t from-black to-transparent"></div>
              <h3 className="text-white text-center lg:text-left text-[1.5rem] font-light leading-4 font-montserrat absolute bottom-0 px-5 py-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {c.name}
              </h3>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Category;
