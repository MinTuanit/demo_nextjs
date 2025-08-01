'use client';

import { SessionProvider } from 'next-auth/react';

export function NextAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
