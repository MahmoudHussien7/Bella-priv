// eslint-disable-next-line no-unused-vars
import React from "react";

const servicesData = [
  {
    imgSrc: "/lamba.svg",
    imgAlt: "Icon",
    title: "SHOP",
    subtitle: "Furniture Selections",
    description:
      "Enjoy a stress-free and enjoyable home styling experience, knowing that our team is dedicated to delivering exceptional results.",
  },
  {
    imgSrc: "/home.svg",
    imgAlt: "Icon",
    title: "Design & Development",
    subtitle: "Furniture Selections",
    description:
      "Enjoy a stress-free and enjoyable home styling experience, knowing that our team is dedicated to delivering exceptional results..",
  },
  {
    imgSrc: "/Lampshade.svg",
    imgAlt: "Icon",
    title: "Customization",
    subtitle: "Planning & Conceptualizing",
    description:
      "We do customize furniture where our team of experts works closely with customers to create custom furniture pieces that are both functional.",
  },
];

function Services() {
  return (
    <div
      className="flex justify-center items-center flex-col  lg:flex-row gap-10 p-3 md:p-5 md:py-[3%] md:px-[7%]"
    >
      {servicesData.map((service, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex gap-2">
            <img src={service.imgSrc} alt={service.imgAlt} className="h-12" />
            <div className="flex flex-col">
              <h2 className="text-titleColor text-[1.2rem] font-semibold w-[120%]">
                {service.title}
              </h2>
              <p className="text-textColor text-[1.1rem] mb-2">{service.subtitle}</p>
              <div className="w-[100%] border"></div>
            </div>
          </div>
          <div className="w-full min-h-[100px] max-h-[200px] mt-3">
            <p className="text-textColor text-[1.1rem]">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;

