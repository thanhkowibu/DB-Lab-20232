const PageBanner = () => {
  return (
    <div className="mt-32 mb-16 pb-16">
      <p className="text-center font-bold text-5xl mb-8">
        Airbnb it easily with Airbnb Setup
      </p>
      <div className="w-full px-2">
        <img src="/images/banner.webp" alt="banner" />
      </div>
      <div className="flex items-center justify-center mt-6 gap-3">
        <div className="px-3 py-3">
          <h2 className="font-bold text-xl mb-2">
            One-to-one guidance from a Superhost
          </h2>
          <p>
            We’ll match you with a Superhost in your area,
            who’ll guide you from your first question to
            your first guest—by phone, video call, or chat.
          </p>
        </div>
        <div className="px-3 py-3">
          <h2 className="font-bold text-xl mb-2">
            An experienced guest for your first booking
          </h2>
          <p>
            For your first booking, you can choose to
            welcome an experienced guest who has at least
            three stays and a good track record on Airbnb.
          </p>
        </div>
        <div className="px-3 py-3">
          <h2 className="font-bold text-xl mb-2">
            Specialized support from Airbnb
          </h2>
          <p>
            New Hosts get one-tap access to specially
            trained Community Support agents who can help
            with everything from account issues to billing
            support.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PageBanner;
