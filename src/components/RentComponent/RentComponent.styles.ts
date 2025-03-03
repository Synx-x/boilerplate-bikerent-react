import { styled } from '@mui/material/styles'
import { Paper, Typography, Button, Box, BoxProps } from '@mui/material'

export const Container = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: theme.spacing(3),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  margin: 'auto',
  marginTop: '0',
  textAlign: 'center',
}))

export const StyledCalendar = styled('div')({
  '.react-calendar': {
    width: '100%',
    maxWidth: '100%',
    background: '#0057FF',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    border: 'none',
    color: '#fff',
  },
  '.react-calendar__navigation': {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  '.react-calendar__month-view__days__day': {
    borderRadius: '50%',
    transition: 'all 0.2s ease-in-out',
  },
  '.selected': {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '0',
  },
  '.start-date, .end-date': {
    background: '#fff !important',
    color: '#0057FF !important',
    borderRadius: '0% !important',
    fontWeight: 'bold',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.3) !important',
    zIndex: '1',
  },
  '.start-date::after, .end-date::after': {
    content: '""',
    inset: '0',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'blue',
    zIndex: '-1',
  },
  '.react-calendar__tile:hover': {
    background: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
  },
})

export const RentTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '18px',
  marginBottom: '10px',
})

export const RentText = styled(Typography)({
  fontSize: '16px',
  fontWeight: 400,
})

export const BookingButton = styled(Button)({
  marginTop: '20px',
  padding: '12px 0',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  textTransform: 'none',
  backgroundColor: '#0057FF',
  '&:hover': { backgroundColor: '#0046CC' },
})

export const PriceRow = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))
