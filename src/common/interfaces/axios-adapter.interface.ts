export interface AxiosAdapterI {
  get<T>(url: string): Promise<T>;
}
