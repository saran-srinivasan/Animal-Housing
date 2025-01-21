import { Layout } from '@/components/layout'
import { Dashboard } from '@/components/dashboard'
import { DataTable } from '@/components/data-table'
import { AnimalForm } from '@/components/animal-form'
import { Calendar } from '@/components/calendar'
import { Modal } from '@/components/modal'
import { Toaster } from '@/components/toast'

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'species',
    header: 'Species',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
]

const data = [
  {
    name: 'Max',
    species: 'Dog',
    age: 5,
  },
  {
    name: 'Luna',
    species: 'Cat',
    age: 3,
  },
  {
    name: 'Charlie',
    species: 'Rabbit',
    age: 2,
  },
]

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        <Dashboard />
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Study</h2>
            <DataTable columns={columns} data={data} />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Add Animal</h2>
            <AnimalForm />
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Calendar />
          <div>
            <h2 className="mb-4 text-2xl font-bold">Actions</h2>
            <Modal />
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  )
}

