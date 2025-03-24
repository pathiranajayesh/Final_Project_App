import { CivilStatus } from "./CivilStatusEnum";

export type AgentDataType = {
  image: string | undefined;
  name: string | undefined;
  id: string
  // applicantId: string;
  // image: string;
  // employeeId: number;
  // name: string;
  // section: string;
  // phone: string;
  // presentAddress: string;

  // Full Name Details
  firstName: string;
  lastName: string;
  fullName: string;

  // Personal Details
  nameWithInitials?: string;
  nicNumber?: string;
  passportNumber?: string;
  dob?: Date;
  email?: string;
  civilStatus?: CivilStatus;
  numberOfDependants?: number;
  isActive?: boolean;

  // Address Details
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  area?: string;
  city?: string;
  district?: string;
  province?: string;
  policeArea?: string;
  postalCode?: string;
  phoneMobile?: string;
  phoneMobile2?: string;
  phoneFixed?: string;
  whatsAppMobile?: string;

  // Spouse Details
  spouse_Fullname?: string;
  spouse_NICNumber?: string;
  spouse_PhoneMobile?: string;
  spouse_AddressLine1?: string;
  spouse_AddressLine2?: string;
  spouse_AddressLine3?: string;

  // Mother's Details
  mother_Fullname?: string;
  mother_NICNumber?: string;
  mother_PhoneMobile?: string;
  mother_AddressLine1?: string;
  mother_AddressLine2?: string;
  mother_AddressLine3?: string;

  // Father's Details
  father_Fullname?: string;
  father_NICNumber?: string;
  father_PhoneMobile?: string;
  father_AddressLine1?: string;
  father_AddressLine2?: string;
  father_AddressLine3?: string;

  // Dates
  registerdOn?: Date;
  registerdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Notes
  notes?: string;


};
