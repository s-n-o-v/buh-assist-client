export abstract class BaseService<T, C = Partial<T>> {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async list(): Promise<T[]> {
    const { data, error } = await useFetch(`${this.baseUrl}/list`);
    if (error.value) {
      throw new Error(error.value?.data?.message || 'Fetch error');
    }
    return data.value as T[];
  }

  async create(body: C): Promise<T> {
    const { data: response } = await useFetch(`${this.baseUrl}/new`, { 
      method: "POST", 
      body 
    });
    return response?.value as T;
  }

  async update(body: T): Promise<T> {
    const { data: response } = await useFetch(`${this.baseUrl}/update`, { 
      method: "POST", 
      body 
    });
    return response?.value as T;
  }

  async remove(id: number): Promise<void> {
    await useFetch(`${this.baseUrl}/remove`, { 
      method: "POST", 
      body: { id } 
    });
  }
}
