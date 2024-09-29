'use client';
import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/AdminHeader/AdminHeader";
import styles from './page.module.css';
import cn from 'classnames';
import React from "react";
import { Contact } from "@/functions/contacts/contact.interface";
import getContacts from "@/functions/contacts/getContacts.function";

function AdminContact() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const fetchedContacts = await getContacts();

                setContacts(fetchedContacts);
            } catch (error) {
                setError("Failed to load contacts");
            } finally {
                setLoading(false);
            }
        }

        fetchContacts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <AdminHeader/>
            <h2 className={cn(styles.admin_contacts_title)}>Контакты</h2>
            <section className={cn(styles.admin_contacts_section)}>

                <ul className={cn(styles.admin_contact_list)}>
                    {contacts.map(contact => (
                        <li key={contact.id} className={cn(styles.admin_contact_item)}>
                            <div className={cn(styles.product_div)}>
                                <p className={cn(styles.product_p)}>Имя</p>
                                <strong className={cn(styles.admin_contact_content)}>{contact.name}</strong>
                            </div>

                            <div className={cn(styles.product_div)}>
                                <p className={cn(styles.product_p)}>Email</p>
                                <span className={cn(styles.admin_contact_content)}>{contact.email}</span>
                            </div>

                            <div className={cn(styles.product_div)}>
                                <p className={cn(styles.product_p)}>Телеграм</p>
                                <span className={cn(styles.admin_contact_content)}>@{contact.tg}</span>
                            </div>
                            <div className={cn(styles.product_div)}>
                                <p className={cn(styles.product_p)}>Комментарий</p>
                                <p className={cn(styles.admin_contact_content)}>{contact.comment}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default AdminContact;
