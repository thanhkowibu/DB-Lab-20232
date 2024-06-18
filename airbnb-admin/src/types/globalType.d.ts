type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
  avatar: Image | null;
};

type UserDetailType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  is_banned: boolean;
  created_at: Date;
  roles: string[];
  phone_number: string | null;
  gender: string | null;
  dob: Date | null;
  avatar: Image | null;
};

type BookingType = {
  id: number;
  check_in_date: string;
  check_out_date: string;
  created_at: string;
  is_confirm: boolean;
  nightly_fee: number;
  clean_fee: number;
  service_fee: number;
  num_alduts: number;
  num_childrens: number;
  num_pets: number;
  status: string;
  issuer_id: number;
  host_id: number;
  property_id: number;
  num_guests: number;
  total_fee: number;
  issuer_email: string;
  issuer_firstname: string;
  is_checked_out: boolean;
  longitude: number;
  latitude: number;
  property_name: string;
  booking_preview_img: string;
};

type BookingLog = {
  type: string;
  time: Date;
  description: string;
};

type DiffReportType = {
  current_month_user: number;
  current_month_booking: number;
  last_month_user: number;
  last_month_booking: number;
};

type BookingStatusReportType = {
  cancel: number;
  checkedOut: number;
  noShow: number;
};

type ReportType = {
  id: number;
  reporter_id: number;
  created_at: string;
  detail: string;
  issue: string;
  is_resolved: boolean;
  reported_id: number;
  total_count: number;
};

type RoleRequestType = {
  id: number;
  user_id: number;
  requested_role: "HOST";
  created_at: Date;
  status: "pending" | "accept" | "reject";
  reviewed_by: number | null;
  reviewed_at: Date | null;
  total_count: number;
};

type PropertyType = {
  id: number;
  nightly_price: number;
  name: string;
  longitude: number;
  latitude: number;
  created_at: string;
  updated_at: string;
  num_beds: number;
  images: Image[];
  average_rating: number;
};

type PaginationType = {
  current_page: number;
  last_page: number;
  page_size: number;
  record_count: number;
  has_next_page: boolean;
};

type Image = {
  name: string;
  path: string;
};

type DailyRevenue = {
  day: number;
  revenue: number;
};

type monthlyRevenue = {
  month: number;
  revenue: number;
};
