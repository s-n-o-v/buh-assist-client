import type { IOrganization } from "~/types/IOrganization";
import { BaseService } from "./base-service";

// export default OrganizationService;
export class OrganizationService extends BaseService<IOrganization, { name: string }> {
  constructor() {
    super('/api/org');
  }
}