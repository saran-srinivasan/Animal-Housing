"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { StudyDataTable } from "./study/study-data-table";
import { selectedStudiesState } from "@/store/store";
import { useRecoilValue } from "recoil";
import { ConsolidatedCalendar } from "./study/study-calendar";

type Animal = "Rabbit" | "Rat";

type Study = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  roomNo: string;
};

type AnimalDetailViewProps = {
  animal: Animal;
  occupiedRooms: string[];
  studies: Study[];
};

export function AnimalDetailView({
  animal,
  occupiedRooms,
}: AnimalDetailViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const studies = useRecoilValue(selectedStudiesState);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assigned Rooms for {animal}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-x-5">
            {occupiedRooms.map((room) => (
              <Button key={room}>{room}</Button>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <ConsolidatedCalendar data={studies} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Studies on{" "}
            {selectedDate ? format(selectedDate, "PP") : "Selected Date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StudyDataTable data={studies} />
        </CardContent>
      </Card>
    </div>
  );
}
