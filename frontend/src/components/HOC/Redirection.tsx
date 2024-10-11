'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// Интерфейс для структуры данных токена JWT
interface DecodedToken {
    exp: number; // Время истечения токена в формате Unix Timestamp
}

const AuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Если токен отсутствует, перенаправляем на страницу входа
            router.push('/admin');
            return;
        }

        try {
            const decoded: DecodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Текущее время в формате Unix Timestamp

            if (decoded.exp < currentTime) {
                // Если токен истек, удаляем его и перенаправляем
                localStorage.removeItem('token');
                router.push('/admin');
            } else {
                // Если токен валиден, перенаправляем на панель
                router.push('/admin/panel/products');
            }
        } catch (error) {
            // Если произошла ошибка при декодировании, перенаправляем на вход
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            router.push('/admin');
        }
    }, [router]);

    // Возвращаем null, так как мы не рендерим никаких компонентов
    return null;
};

export default AuthRedirect;
