import DecorationImage from "../../../assets/Images/Decoration.jpg";

const Banner = ({ title }) => {
  return (
    <div
      className="relative bg-cover bg-center h-72"
      style={{ backgroundImage: `url(${DecorationImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="mt-2 text-sm">Home / {title}</p>
      </div>
    </div>
  );
};

export default Banner;
