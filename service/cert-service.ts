import { BaseService } from "./base-service";
import type { ICert } from "~/types/ICert";

// export default OrganizationService;
export class CertService extends BaseService<ICert, Partial<ICert>> {
  constructor() {
    super('/api/cert');
  }
}
