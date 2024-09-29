'use client';
import { useState } from 'react';
import { AdminHeader } from '@/components/AdminHeader/AdminHeader';
import styles from './page.module.css';
import cn from 'classnames';
import { jura } from '@/fonts/fonts';
import addStore from '@/functions/stores/addStore.function';
import { useRouter } from 'next/navigation';

function AddStore() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const storeData = {
            name,
            description,
            link,
            isActive,
        };

        try {
            await addStore(storeData);
            router.push('/admin/panel/stores'); // Перенаправление после успешного добавления
        } catch (error) {
            setError('Failed to add store');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminHeader />
            <section className={cn(styles.add_store_section)}>
                <h2 className={cn(styles.add_store_title)}>Добавить новый магазин</h2>
                <form onSubmit={handleSubmit} className={cn(styles.add_store_form)}>
                    <div className={cn(styles.form_group)}>
                        <label htmlFor="name">Название магазина</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={cn(styles.form_group)}>
                        <label htmlFor="description">Описание магазина</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className={cn(styles.form_group)}>
                        <label htmlFor="link">Ссылка на магазин</label>
                        <input
                            type="url"
                            id="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                    </div>
                    <div className={cn(styles.form_group)}>
                        <label>
                            Активен:
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                            />
                        </label>
                    </div>

                    {error && <p className={cn(styles.error_message)}>{error}</p>}

                    <button type="submit" className={cn(styles.submit_button, jura.className)} disabled={loading}>
                        {loading ? 'Добавление...' : 'Добавить магазин'}
                    </button>
                </form>
            </section>
        </>
    );
}

export default AddStore;
