import { Suspense } from 'react'
import { Navbar } from '@/components/shared/navbar'
import { GoogleProvider } from '@/provider/goole-provider'
import { getMe } from '@/service/getme'
import React from 'react'

async function NavbarWithUser() {
  const user = await getMe()
  return <Navbar user={user} /> 
}

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<div className="h-16" />}>
        <NavbarWithUser />
      </Suspense>
      <GoogleProvider>{children}</GoogleProvider>
    </div>
  )
}

export default PublicLayout