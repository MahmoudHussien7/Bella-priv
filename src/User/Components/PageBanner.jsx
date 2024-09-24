/* eslint-disable react/prop-types */
export default function PageBanner({
  title,
  bg_image = "/cart-page-header.jpg",
}) {
  return (
    <div className="relative bg-gray-100 h-72 flex items-center justify-center">
      <img
        src={bg_image}
        alt="Cart Banner"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />
      <h1 className=" relative text-5xl md:text-5xl text-gray-700 p-5 font-bold">
        {title}
      </h1>
    </div>
  );
}
