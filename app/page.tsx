import { Layout } from "@/components/layout";
import { Dashboard } from "@/components/dashboard";
import { DataTable } from "@/components/data-table";
import { AnimalForm } from "@/components/animal-form";
import { Calendar } from "@/components/calendar";
import { Modal } from "@/components/modal";
import { Toaster } from "@/components/toast";

const columns = [
  {
    accessorKey: "sno",
    header: "S.No",
  },
  {
    accessorKey: "species",
    header: "Species",
  },
  {
    accessorKey: "noOfAnimals",
    header: "Nos",
  },
];

const data = [
  {
    sno: 1,
    species: "Dog",
    noOfAnimals: 15,
  },
  {
    sno: 2,
    species: "Cat",
    noOfAnimals: 13,
  },
  {
    sno: 3,
    species: "Rabbit",
    noOfAnimals: 22,
  },
];

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
  );
}
