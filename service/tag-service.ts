import type { ITag } from "~/types/ITag";
import { BaseService } from "./base-service";

// export default OrganizationService;
export class TagService extends BaseService<ITag, { name: string }> {
  constructor() {
    super('/api/tag');
  }
}
