interface IProfileResult {
  id: number;
  name: string;
  email: string;
  email_verified_at?: boolean;
  created_at?: string;
  updated_at?: string;
}
export default defineEventHandler(async (event): Promise<IProfileResult> => {

  return await fetchWithAuth<IProfileResult>(event, '/me');
});
