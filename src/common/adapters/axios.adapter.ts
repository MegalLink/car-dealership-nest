import axios, { AxiosInstance } from 'axios';
import { AxiosAdapterI } from '../interfaces/axios-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements AxiosAdapterI {
  private _axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this._axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This as error - check logs');
    }
  }
}
