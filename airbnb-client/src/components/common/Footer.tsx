export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white z-10 shadow-sm flex justify-between items-center px-4 py-2 border-t text-sm text-gray-700">
      <div className="flex space-x-4">
        <span>© 2024 Airbnb, Inc.</span>
        <span className="hover:underline">Privacy</span>
        <span className="hover:underline">Terms</span>
        <span className="hover:underline">Sitemap</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className="material-icons">language</span>
          <span>English (US)</span>
        </div>
        <span>$ USD</span>
        <div className="relative">
          <button className="flex items-center space-x-1 hover:underline">
            <span>Support & Resources</span>
            <span className="material-icons">
              expand_more
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
