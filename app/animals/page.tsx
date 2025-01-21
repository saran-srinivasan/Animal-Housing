"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { TestRoomManagement } from "@/components/test-room-management";
import { AnimalCards } from "@/components/animal-cards";
import { AnimalDetailView } from "@/components/animal-detail-view";
import { ConsolidatedCalendar } from "@/components/study/study-calendar";

type Animal = "Rabbit" | "Rat";

const mockAnimals = [
  { animal: "Rabbit" as Animal, availableCount: 20 },
  { animal: "Rat" as Animal, availableCount: 30 },
];

const mockOccupiedRooms = ["Room A", "Room B", "Room C"];

const mockStudies = [
  {
    id: "1",
    name: "Study 1",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 5, 15),
    roomNo: "Room A",
  },
  {
    id: "2",
    name: "Study 2",
    startDate: new Date(2023, 5, 10),
    endDate: new Date(2023, 5, 20),
    roomNo: "Room B",
  },
  {
    id: "3",
    name: "Study 3",
    startDate: new Date(2023, 5, 15),
    endDate: new Date(2023, 5, 30),
    roomNo: "Room C",
  },
];

export default function AnimalsPage() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Animals Management</h1>

        <TestRoomManagement />

        <h2 className="text-2xl font-bold">Available Animals</h2>
        <AnimalCards animals={mockAnimals} onSelectAnimal={setSelectedAnimal} />

        {!selectedAnimal && <ConsolidatedCalendar />}

        {selectedAnimal && (
          <AnimalDetailView
            animal={selectedAnimal}
            occupiedRooms={mockOccupiedRooms}
            studies={mockStudies}
          />
        )}
      </div>
    </Layout>
  );
}
