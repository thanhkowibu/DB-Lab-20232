export const StepThreeStarter = () => {
  return (
    <div className="flex items-center h-full mx-20">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 text-neutral-800">
          <h3 className="text-3xl">Step 3</h3>
          <h1 className="text-5xl">
            <strong>Finish up and publish</strong>
          </h1>
          <p className="text-xl font-light">
            Finally, let's decide a starting price, and ready to publish your
            listing.
          </p>
        </div>
        <div className="">
          <video src="/videos/home3.mp4" autoPlay loop controls={false}></video>
        </div>
      </div>
    </div>
  );
};
