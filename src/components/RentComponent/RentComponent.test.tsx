import { render, screen } from '@testing-library/react'
import RentComponent from '.'

// Mock the API client instead of axios
jest.mock('services/api', () => ({
  post: jest.fn(),
}))

describe('RentComponent', () => {
  beforeEach(() => {
    render(<RentComponent bikeId={1} rateByDay={20} serviceFeeRate={0.15} />)
  })

  it('should render the rent component', () => {
    const rentComponent = screen.getByTestId('rent-component')
    expect(rentComponent).toBeInTheDocument()
  })

  it('should display the booking overview section with pricing details', () => {
    const subtotal = screen.getByTestId('bike-overview-subtotal')
    const serviceFee = screen.getByTestId('bike-overview-service-fee')
    const total = screen.getByTestId('bike-overview-total')

    expect(subtotal).toBeInTheDocument()
    expect(serviceFee).toBeInTheDocument()
    expect(total).toBeInTheDocument()
  })

  it('should display the booking button', () => {
    const bookingButton = screen.getByRole('button', { name: /add to booking/i })
    expect(bookingButton).toBeInTheDocument()
  })
})
