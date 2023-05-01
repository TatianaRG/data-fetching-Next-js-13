///THIS IS A SERVER COMPONENT BY DEFAULT UNLESS WE USE 'use client' 
// https://beta.nextjs.org/docs/rendering/server-and-client-components

import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import getAllUsers from '../lib/getAllUsers'

export const metadata : Metadata = {
  title: 'Users Page'
}

async function UsersPage() {
  const userData: Promise<User[]> = getAllUsers()

  const users = await userData

  return (
    <section>
    <h2>
        <Link href="/">Back to Home</Link>
    </h2>
    <br />
    {users.map(user => {
        return (
            <>
                <p key={user.id}>
                    <Link href={`/users/${user.id}`}>{user.name}</Link>
                </p>
                <br />
            </>
        )
    })}
</section>
  )
}

export default UsersPage