import PropTypes from 'prop-types'
import { useState } from 'react'
import { Box, Typography, Divider, Button } from '@mui/material'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format, differenceInDays } from 'date-fns'
import { Container, BookingButton, StyledCalendar, PriceRow } from './RentComponent.styles'
import apiClient from 'services/api'

interface RentComponentProps {
  bikeId?: number
  rateByDay: number
  serviceFeeRate: number
}

const RentComponent = ({ bikeId, rateByDay, serviceFeeRate }: RentComponentProps) => {
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([null, null])
  const [isLoading, setIsLoading] = useState(false)

  const userId = 1896 // this would be dynamically fetched from global state when a user is logged in

  const handleDateChange = (date: Date) => {
    setSelectedRange(([start]) =>
      !start || (start && selectedRange[1]) || date < start ? [date, null] : [start, date],
    )
  }

  const rentBike = async () => {
    const [start, end] = selectedRange
    if (!start || !end) return alert('Please select a valid date range')
    if (!bikeId) return alert('Invalid bike selection')

    setIsLoading(true)
    try {
      await apiClient.post('/bikes/rent', {
        bikeId,
        userId,
        dateFrom: format(start, 'yyyy-MM-dd'),
        dateTo: format(end, 'yyyy-MM-dd'),
      })
      alert('Bike rented successfully!')
    } catch (error) {
      alert('Failed to rent bike. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const rentalDays =
    selectedRange[0] && selectedRange[1]
      ? differenceInDays(selectedRange[1], selectedRange[0]) + 1
      : 0
  const total = rentalDays * rateByDay + serviceFeeRate

  const priceDetails = [
    { label: 'Subtotal', value: rentalDays * rateByDay },
    { label: 'Service Fee', value: serviceFeeRate },
    { label: 'Total', value: total, isBold: true, isLarge: true },
  ]

  return (
    <Container variant='outlined' data-testid='rent-component'>
      <Typography variant='h5' fontWeight='700' marginBottom={2}>
        Select date and time
      </Typography>

      <StyledCalendar>
        <Calendar
          onClickDay={handleDateChange}
          minDate={new Date()}
          tileClassName={({ date }) => {
            const [start, end] = selectedRange
            if (start && end) {
              if (date.getTime() === start.getTime()) return 'start-date'
              if (date.getTime() === end.getTime()) return 'end-date'
              if (date > start && date < end) return 'selected'
            }
            return ''
          }}
        />
      </StyledCalendar>

      <Divider />

      {priceDetails.map(({ label, value, isBold, isLarge }) => (
        <PriceRow
          key={label}
          marginTop={1.75}
          data-testid={`bike-overview-${label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Box display='flex' alignItems='center'>
            <Typography
              marginRight={1}
              fontWeight={isBold ? 800 : 'normal'}
              fontSize={isLarge ? 16 : 'inherit'}
            >
              {label}
            </Typography>
          </Box>
          <Typography
            variant={isLarge ? 'h2' : 'body1'}
            fontSize={isLarge ? 24 : 'inherit'}
            letterSpacing={isLarge ? 1 : 0}
          >
            {value.toFixed(2)} €
          </Typography>
        </PriceRow>
      ))}

      <BookingButton fullWidth variant='contained' onClick={rentBike} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Add to booking'}
      </BookingButton>
    </Container>
  )
}

RentComponent.propTypes = {
  bikeId: PropTypes.number,
  rateByDay: PropTypes.number.isRequired,
  serviceFeeRate: PropTypes.number.isRequired,
}

export default RentComponent
