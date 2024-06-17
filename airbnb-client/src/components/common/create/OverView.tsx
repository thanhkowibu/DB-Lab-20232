export const OverView = () => {
  const mainTitle = "It's easy to get started on Airbnb";
  const data = [
    {
      title: "Tell us about your place",
      description:
        "Share some basic info, such as where it is and how many guests can stay.",
      image: "/images/overview1.webp",
    },
    {
      title: "Make it stand out",
      description:
        "Add 5 or more photos plus a title and description - we'll help you out.",
      image: "/images/overview2.webp",
    },
    {
      title: "Finish up and publish",
      description: "Set a starting price and ready to publish your listing.",
      image: "/images/overview3.webp",
    },
  ];
  return (
    <div className="flex flex-col h-full justify-around items-center px-24">
      <div>
        <strong>
          <h1 className="text-5xl leading-normal text-neutral-800">
            {mainTitle}
          </h1>
        </strong>
      </div>
      <ul className="flex justify-between items-center gap-16">
        {data.map(({ description, image, title }, index) => (
          <li
            key={title}
            className="w-1/3 flex flex-col items-center justify-start gap-6"
          >
            <div className="relative size-36 object-cover">
              <img src={image} alt="overview" />
            </div>
            <div className="flex gap-8 justify-between">
              <strong className="text-2xl pt-5 text-airbnb-light-black">
                <h3>{index + 1}</h3>
              </strong>
              <div className="pt-5">
                <strong className="text-2xl text-airbnb-light-black">
                  <h3>{title}</h3>
                </strong>
                <p className="text-neutral-500 text-justify font-light">
                  {description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
