import type { ITaxOffice } from "~/types/ITaxOffice";
import { BaseService } from "./base-service";

export class TaxOfficeService extends BaseService<ITaxOffice, Partial<ITaxOffice>> {
  constructor() {
    super('/api/tax-office');
  }
}