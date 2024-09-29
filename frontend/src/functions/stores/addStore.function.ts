
import {CreateStore, Store} from '@/functions/stores/store.interface';
import apiClient from "../../../configs/axios.config";

export default async function addStore(storeData: CreateStore): Promise<Store> {
    try {
        const response = await apiClient.post(`${process.env.NEXT_PUBLIC_API_URL}/stores`, storeData);
        return response.data;
    } catch (error) {
        console.error('Error adding store:', error);
        throw error;
    }
}
