// src/components/Card.jsx
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

function CollectionCard({ id, title, price, imageUrl }) {
  return (
    <div
      className={`w-full md:w-[47%] lg:w-[47%] xl:w-[27%] hover:cursor-pointer group relative`}
    >
      <Link to={`/Products/${id}`} className="row-span-3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full min-h-[15rem] lg:min-h-[20rem] max-h-[20rem] object-cover"
        />
      </Link>

      <div>
        <h2 className="text-titleColor text-[1rem] md:text-[1.1rem] lg:text-[1.3rem] font-normal mt-1 hover:text-mainColor transition-all duration-200">
          {title}
        </h2>
        <p className="text-mainColor mt-1 lg:text-[1.2rem]">
          {price} <span className="text-[0.8rem]">EGP</span>
        </p>
      </div>
    </div>
  );
}

export default CollectionCard;
