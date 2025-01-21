
'use client'
import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DateRange } from 'react-day-picker'
import { StudyModal } from './study-modal'

export function Calendar() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectRange = (range: DateRange | undefined) => {
    setDateRange(range)
  }

  const handleAddStudy = () => {
    if (dateRange?.from && dateRange?.to) {
      setIsModalOpen(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <CalendarComponent
          mode="range"
          selected={dateRange}
          onSelect={handleSelectRange}
          className="rounded-md border"
          numberOfMonths={2}
        />
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Selected range:{' '}
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, 'PPP')} - ${format(dateRange.to, 'PPP')}`
              : 'No date range selected'}
          </p>
          <Button className="mt-2" onClick={handleAddStudy} disabled={!dateRange?.from || !dateRange?.to}>
            Add Study
          </Button>
        </div>
        <StudyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          dateRange={dateRange}
        />
      </CardContent>
    </Card>
  )
}

