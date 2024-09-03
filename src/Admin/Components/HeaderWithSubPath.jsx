import { AiFillHome } from "react-icons/ai";

const HeaderWithSubPath = ({ title, breadcrumb }) => {
  return (
    <div>
      {/* Main Header */}
      <h1 className="text-2xl font-bold text-titleColor">{title}</h1>

      {/* Optional Breadcrumb */}
      {breadcrumb && (
        <span className="mt-2 text-sm flex gap-2 items-center">
          <AiFillHome className="text-titleColor" />
          <span className="text-titleColor">{breadcrumb}</span>
        </span>
      )}
    </div>
  );
};

export default HeaderWithSubPath;
