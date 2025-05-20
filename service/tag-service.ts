import type { ITag } from "~/types/ITag";
import { BaseService } from "./base-service";

// export default OrganizationService;
export class TagService extends BaseService<ITag, { name: string }> {
  constructor() {
    super('/api/tag');
  }
}
// const TagService = () => {
//   const baseUrl: string = "/api/tag";

//   const list = async () => { // no reload for list
//     const { data, error } = await useFetch(`/api/tag/list`);
//     if (error.value) {
//       throw new Error(error.value?.data?.message || 'Fetch error');
//     }

//     return data.value;
//   };

//   const create = async (name: string) => {
//     const { data: response } = await useFetch("/api/tag/new", { method: "POST", body: { name} });
//     return response?.value;
//   };

//   const update = async (body: ITag) => {
//     const { data: response } = await useFetch(`/api/tag/update`, { method: "POST", body });
//     return response?.value;
//   };

//   const remove = async (id: number) => {
//     return await useFetch(`/api/tag/remove`, { method: "POST", body: { id } });
//   };

//   return {
//     list,
//     create,
//     update,
//     remove,
//   };
// };

// export default TagService;
