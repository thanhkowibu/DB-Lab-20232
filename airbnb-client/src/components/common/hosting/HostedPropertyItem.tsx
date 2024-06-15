type Props = {
  id: bigint;
  preview_img: string;
  pname: string;
  lat: number;
  long: number;
  created_at: Date;
  onUpdate: (id: bigint) => void;
};

const HostedPropertyItem: React.FC<Props> = ({
  id,
  preview_img,
  pname,
  lat,
  long,
  created_at,
  onUpdate,
}) => {
  return <div>item {pname}</div>;
};

export default HostedPropertyItem;
