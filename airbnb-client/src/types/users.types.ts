import { ImageProps } from "./global.types";
import { PropertyOverviewProps } from "./properties.types";

export type UserProps = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
  avatar?: ImageProps;
  is_banned?: boolean;
  roles?: string[];
  phone_number?: string;
  gender?: "Male" | "Female";
  dob?: Date;
};

export type RegisterReqProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
export type LoginReqProps = {
  email: string;
  password: string;
};

export type LoginInfoProps = {
  access_token: string;
  user_info: UserProps;
  favorites: number[];
};

export type UserDetailProps = {
  user_info: UserProps;
  top_properties: PropertyOverviewProps[];
};

export enum ReportIssue {
  INAPPROPRIATE_CONTENT_OR_PHOTOS = "Inappropriate Content or Photos",
  MISLEADING_CONTENT_OR_PHOTOS = "Misleading Content or Photos",
  NOT_A_REAL_PLACE_TO_STAY = "Not a Real Place to Stay",
  SCAM_OR_PHISHING_ATTEMPTS = "Scam or Phishing Attempts",
  VIOLATION_OF_POLICIES = "Violation of Policies",
  FAKE_REVIEWS_OR_RATINGS = "Fake Reviews or Ratings",
  HARASSMENT_OR_HATE_SPEECH = "Harassment or Hate Speech",
  COPYRIGHT_OR_TRADEMARK_INFRINGEMENT = "Copyright or Trademark Infringement",
  PRIVACY_VIOLATION = "Privacy Violation",
  TECHNICAL_ISSUES = "Technical Issues",
}
