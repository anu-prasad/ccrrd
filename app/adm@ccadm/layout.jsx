'use client';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Only show sidebar on protected routes
  if (pathname === '/adm@ccadm/login') {
    return <>{children}</>;
  }

  return (
    <div><Sidebar>

     {children}
     </Sidebar>
    </div>
  );
}
