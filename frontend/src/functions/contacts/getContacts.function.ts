
import {Contact} from "@/functions/contacts/contact.interface";
import apiClient from "../../../configs/axios.config";


export default async function getContacts( ): Promise<Contact[]> {
    try {
        const response = await apiClient.get(`${process.env.NEXT_PUBLIC_API_URL}/contacts`);
        return response.data;
    } catch (error) {
        console.error('Error getting contacts:', error);
        throw error;
    }
}
