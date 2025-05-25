import { BaseService } from "./base-service";
import type { ITaxReport } from "~/types/ITaxReport";

export class TaxReportService extends BaseService<ITaxReport, Partial<ITaxReport>> {
  constructor() {
    super('/api/tax-report');
  }
}