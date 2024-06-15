export type BookingResProps = {
  id: number;
  check_in_date: Date;
  check_out_date: Date;
  created_at: Date;
  is_confirm: false;
  nightly_fee: number;
  clean_fee: number;
  service_fee: number;
  num_alduts: number;
  num_childrens: number;
  num_pets: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "SUCCESS"
    | "REJECTED"
    | "CHECK_OUT"
    | "NO_SHOW"
    | "CANCEL";
  issuer_id: number;
  host_id: number;
  property_id: number;
  num_guests: number;
  total_fee: number;
  issuer_email: string;
  issuer_firstname: string;
  is_checked_out: false;
  longitude: number;
  latitude: number;
  property_name: string;
  booking_preview_img: string;
  is_rated: boolean;
};

export type BookingLogProps = {
  type:
    | "PENDING"
    | "CONFIRMED"
    | "SUCCESS"
    | "REJECTED"
    | "CHECK_OUT"
    | "NO_SHOW"
    | "CANCEL";
  time: Date;
  description: string;
};
