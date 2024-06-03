export const StepTwoStarter = () => {
  return (
    <div className="flex items-center h-full mx-20">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 text-neutral-800">
          <h3 className="text-3xl">Step 2</h3>
          <h1 className="text-5xl">
            <strong>Make your place stand out</strong>
          </h1>
          <p className="text-xl font-light">
            In this step, you'll add some of the amenities your place offers,
            plus 5 or more photos. Then you'll create a title and description.
          </p>
        </div>
        <div className="">
          <video src="/videos/home2.mp4" autoPlay loop controls={false}></video>
        </div>
      </div>
    </div>
  );
};
