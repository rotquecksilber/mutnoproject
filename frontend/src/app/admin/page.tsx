import Admin from '@/components/Admin/admin';

import { Metadata } from 'next';
import AuthRedirect from "@/components/HOC/Redirection";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
      <>
        <AuthRedirect />
        <Admin />
      </>
  );
}
