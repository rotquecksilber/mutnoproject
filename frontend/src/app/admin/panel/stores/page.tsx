'use client';
import ProtectedRoute from '@/components/HOC/ProtectedRoute';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './page.module.css';
import { AdminHeader } from '@/components/AdminHeader/AdminHeader';
import Link from 'next/link';
import { jura } from '@/fonts/fonts';
import getStores from '@/functions/stores/getStores.function';
import { Store } from '@/functions/stores/store.interface';

function AdminStores() {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStores() {
            try {
                const fetchedStores = await getStores();
                setStores(fetchedStores);
            } catch (error) {
                setError('Failed to load stores');
            } finally {
                setLoading(false);
            }
        }

        fetchStores();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <AdminHeader />
            <section className={cn(styles.admin_products)}>
                <h2 className={cn(styles.admin_products_title)}>Управление магазинами</h2>
                <ul className={cn(styles.admin_store_list)}>
                    {stores.map((store) => (
                        <li key={store.id} className={cn(styles.admin_store_item)}>

                                <div className={cn(styles.product_div)}>
                                    <p className={cn(styles.product_p)}>Название</p>
                                    <div className={cn(styles.product_content)}>{store.name}</div>
                                </div>
                                <div className={cn(styles.product_div)}>
                                    <p className={cn(styles.product_p)}>Описание</p>
                                    <div className={cn(styles.product_content)}>{store.description}</div>
                                </div>
                                <div className={cn(styles.product_div)}>
                                    <p className={cn(styles.product_p)}>Ссылка</p>
                                    <Link href={store.link} className={cn(styles.store_link)} target="_blank"
                                          rel="noopener noreferrer">
                                        Посетить магазин
                                    </Link>
                                </div>

                            <div className={cn(styles.product_div)}>
                                    <p className={cn(styles.product_p)}>Активен</p>
                                    <div
                                        className={styles.product_content}>
                                        {store.isActive ? 'Да' : 'Нет'}
                                    </div>
                                </div>
                        </li>
                        ))}
                </ul>

                <Link href={'/admin/panel/stores/add'}>
                    <button className={cn(styles.new_product_button, jura.className)}>НОВЫЙ МАГАЗИН</button>
                </Link>
            </section>
        </>
    );
}

export default ProtectedRoute(AdminStores);
