export interface Lead {
  id: string; // This will become the Primary Key in Postgres
  user_id?: string; // To keep your leads private to your account
  companyUrl: string;
  pitch: string;
  refinedValueProp?: string;
  timestamp: string;
  tokenUsage: number;
  processingTime: number;
  created_at?: string;
}