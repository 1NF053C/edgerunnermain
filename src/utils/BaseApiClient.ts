import axios, { AxiosResponse } from 'axios';
import { Assert } from 'ts-runtime-checks';

export class BaseApiClient<T, CreateInput, UpdateInput> {
  protected apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async create(data: Assert<CreateInput>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(this.apiUrl, data);
      return response.data;
    } catch (error) {
      console.error('Create error:', error);
      throw error;
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const response: AxiosResponse<T[]> = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Find all error:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<T | null> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Find one error:', error);
      throw error;
    }
  }

  async update(id: number, data: Assert<UpdateInput>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put(`${this.apiUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
}