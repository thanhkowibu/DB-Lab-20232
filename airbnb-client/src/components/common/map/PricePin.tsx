type Props = {
  price: number;
};

const PricePin: React.FC<Props> = ({ price }) => {
  return (
    <div className="flex items-center justify-center bg-white rounded-full px-2 py-1 text-lg font-semibold cursor-pointer border shadow-lg">
      $ {price}
    </div>
  );
};

export default PricePin;
