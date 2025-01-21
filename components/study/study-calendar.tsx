"use client";

import { useState, useMemo, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { allStudiesState } from "@/store/store";
import { useRecoilValue } from "recoil";
import { Study } from "../types/Study";

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

type Animal = "Rabbit" | "Rat";

type OccupancyEvent = Study;

const animalColors: Record<Animal, string> = {
  Rabbit: "bg-blue-500",
  Rat: "bg-green-500",
};

type ConsolidatedCalendarProps = {
  data?: Study[];
};

export function ConsolidatedCalendar({ data }: ConsolidatedCalendarProps) {
  const allStudies = useRecoilValue(allStudiesState);
  const studies = data || allStudies;
  //   const [selectedEvent, setSelectedEvent] = useState<OccupancyEvent | null>(
  //     null
  //   );

  //   const eventStyleGetter = (event: OccupancyEvent) => {
  //     return {
  //       style: {
  //         backgroundColor:
  //           event.species === "Rabbit" ? animalColors.Rabbit : animalColors.Rat,
  //       },
  //     };
  //   };
  console.log(animalColors);

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    8
  );
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    17
  );

  const events = useMemo(() => {
    return studies?.map((study) => ({
      ...study,
      title: `${study.studytitle}`,
      start: new Date(study.startingDate),
      end: new Date(study.endDate),
    }));
  }, [studies]);

  const renderTooltip = (event: OccupancyEvent) => {
    return (
      <Tooltip>
        <TooltipTrigger>
          <div className="text-white truncate p-1">{event.studytitle}</div>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            <p>
              <strong>Animal:</strong> {event.species}
            </p>
            <p>
              <strong>Room:</strong> {event.testRoomNo}
            </p>
            <p>
              <strong>Study:</strong> {event.studytitle}
            </p>
            <p>
              <strong>Start:</strong>{" "}
              {moment(event.startingDate).format("MMM D, YYYY")}
            </p>
            <p>
              <strong>End:</strong>{" "}
              {moment(event.endDate).format("MMM D, YYYY")}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Animal Occupancy Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div style={{ height: "500px" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              date={date}
              min={minDate}
              max={maxDate}
              onNavigate={onNavigate}
              onView={onView}
              view={view}
              defaultView="month"
              components={{
                event: ({ event }) => renderTooltip(event),
              }}
            />
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
