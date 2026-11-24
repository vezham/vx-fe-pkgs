// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid } from '@vezham/react-pro-v3'
import { Button, Link } from '@vezham/react-v3'

interface User {
  id: number
  name: string
  title: string
  email: string
  role: 'Owner' | 'Admin' | 'Member'
}

const users: User[] = [
  {
    email: 'lindsay.walton@example.com',
    id: 1,
    name: 'Lindsay Walton',
    role: 'Member',
    title: 'Front-end Developer'
  },
  {
    email: 'courtney.henry@example.com',
    id: 2,
    name: 'Courtney Henry',
    role: 'Admin',
    title: 'Designer'
  },
  {
    email: 'tom.cook@example.com',
    id: 3,
    name: 'Tom Cook',
    role: 'Member',
    title: 'Director of Product'
  },
  {
    email: 'whitney.francis@example.com',
    id: 4,
    name: 'Whitney Francis',
    role: 'Admin',
    title: 'Copywriter'
  },
  {
    email: 'leonard.krasner@example.com',
    id: 5,
    name: 'Leonard Krasner',
    role: 'Owner',
    title: 'Senior Designer'
  },
  {
    email: 'floyd.miles@example.com',
    id: 6,
    name: 'Floyd Miles',
    role: 'Member',
    title: 'Principal Designer'
  }
]

const columns: DataGridColumn<User>[] = [
  {
    accessorKey: 'name',
    cellClassName: 'font-medium',
    header: 'Name',
    id: 'name',
    isRowHeader: true
  },
  {
    accessorKey: 'title',
    header: 'Title',
    id: 'title'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    id: 'email'
  },
  {
    accessorKey: 'role',
    header: 'Role',
    id: 'role'
  },
  {
    align: 'end',
    cell: () => <Link className="text-sm">Edit</Link>,
    header: '',
    id: 'edit'
  }
]

export function Users() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-muted text-sm">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <Button size="sm" variant="secondary">
          Add user
        </Button>
      </div>
      <DataGrid
        aria-label="Users"
        columns={columns}
        data={users}
        getRowId={item => item.id}
        variant="secondary"
      />
    </div>
  )
}
