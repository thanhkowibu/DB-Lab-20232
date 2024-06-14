type Props = {
  id: bigint;
  preview_img: string;
  pname: string;
  lat: number;
  long: number;
  created_at: Date;
  onUpdate: (id: bigint) => void;
};

const HostedPropertyItem: React.FC<Props> = ({}) => {
  return <div>item</div>;
};

export default HostedPropertyItem;
