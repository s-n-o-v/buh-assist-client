export interface ITaxReport {
  id?: number;
  name: string;
  tax_office_id?: number;
  fine?: number;
  is_periodic?: boolean;
  report_date?: Date;
  every_month?: number;
}
