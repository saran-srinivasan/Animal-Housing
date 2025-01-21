"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateStudyModal } from "./study/create-study";
import { createTestRoom } from "@/api/testRoomApi";

// const housingOptions = [
//   { label: "Individual", value: "individual" },
//   { label: "Both", value: "both" },
//   { label: "Group", value: "group" },
// ];
// const AnimalOptions = [
//   { label: "Rabbit", value: "Rabbit" },
//   { label: "Rat", value: "Rat" },
//   { label: "GuineaPig", value: "GuineaPig" },
//   { label: "Rabbit-Pyrogen", value: "Rabbit-Pyrogen" },
//   { label: "Hamster", value: "Hamster" },
//   { label: "Mice", value: "Mice" },
// ];

type TestRoom = {
  roomNo: string;
  testRoom: string;
  animal: "Rabbit" | "Rat";
  housing: string;
  max: number;
  maxPerCage: number;
};

export function TestRoomManagement() {
  const [testRooms, setTestRooms] = useState<TestRoom[]>([]);
  const [isCreateStudyModalOpen, setIsCreateStudyModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRoom] = useState<TestRoom | null>(null);

  const handleAddRoom = async (room: TestRoom) => {
    setTestRooms([...testRooms, { ...room }]);

    try {
      const response = await createTestRoom(room);
      console.log("Test room added:", response.data);
      if (response.status === 200) {
        // statusChange({
        //   type: "testroom",
        //   severity: "success",
        //   message: "New Test Room Added!",
        // });

        close();
      }
    } catch (error) {
      console.error("Error adding test room:", error);
      // statusChange({
      //   type: "testroom",
      //   severity: "error",
      //   message: "error saving data",
      // });
    }
    setIsAddModalOpen(false);
  };

  const handleEditRoom = (room: TestRoom) => {
    setTestRooms(testRooms.map((r) => (r.roomNo === room.roomNo ? room : r)));
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end space-x-2 mb-4">
        <Dialog
          open={isCreateStudyModalOpen}
          onOpenChange={setIsCreateStudyModalOpen}
        >
          <DialogTrigger asChild>
            <Button>Create Study</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Test Room</DialogTitle>
            </DialogHeader>
            <CreateStudyModal
              isOpen={isCreateStudyModalOpen}
              onClose={() => setIsCreateStudyModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>Add Test Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Test Room</DialogTitle>
            </DialogHeader>
            <TestRoomForm onSubmit={handleAddRoom} />
          </DialogContent>
        </Dialog>
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Test Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Test Room</DialogTitle>
            </DialogHeader>
            {currentRoom && (
              <TestRoomForm
                onSubmit={handleEditRoom}
                initialData={currentRoom}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
      {/* Display test rooms here */}
    </div>
  );
}

type TestRoomFormProps = {
  onSubmit: (room: Omit<TestRoom, "id">) => void;
  initialData?: TestRoom;
};

function TestRoomForm({ onSubmit, initialData }: TestRoomFormProps) {
  const [formData, setFormData] = useState<Omit<TestRoom, "id">>(
    initialData || {
      roomNo: "",
      testRoom: "",
      animal: "Rabbit",
      housing: "",
      max: 0,
      maxPerCage: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="roomNo">Room Number</Label>
        <Input
          id="roomNo"
          name="roomNo"
          value={formData.roomNo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="testRoom">Test Room</Label>
        <Input
          id="testRoom"
          name="testRoom"
          value={formData.testRoom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="animal">Animal</Label>
        <Select
          name="animal"
          value={formData.animal}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              animal: value as "Rabbit" | "Rat",
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select animal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rabbit">Rabbit</SelectItem>
            <SelectItem value="Rat">Rat</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="housing">Housing</Label>
        <Input
          id="housing"
          name="housing"
          value={formData.housing}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="max">Max Capacity</Label>
        <Input
          id="max"
          name="max"
          type="number"
          value={formData.max}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="maxPerCage">Max Per Cage</Label>
        <Input
          id="maxPerCage"
          name="maxPerCage"
          type="number"
          value={formData.maxPerCage}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
