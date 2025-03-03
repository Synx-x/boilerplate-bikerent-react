import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockedBike } from 'mocks/Bike'
import { SERVICE_FEE_PERCENTAGE } from './BikeDetails.contants'
import { getServicesFee } from './BikeDetails.utils'
import BikeDetails from './BikeDetails.component'

// Mock the API client instead of axios
jest.mock('services/api', () => ({
  post: jest.fn(),
}))

describe('BikeDetails page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BikeDetails bike={mockedBike} />
      </BrowserRouter>,
    )
  })

  it('should has a header', () => {
    const headerElement = screen.getByTestId('header')
    expect(headerElement).toBeInTheDocument()
  })

  it('should has breadcrumbs', () => {
    const breadcrumbsElement = screen.getByTestId('bike-details-breadcrumbs')
    expect(breadcrumbsElement).toBeInTheDocument()
  })

  it('should has the details container with the image selector, bike name, prices and a map', () => {
    const detailsContainerElement = screen.getByTestId('bike-details-container')
    expect(detailsContainerElement).toBeInTheDocument()

    const imageSelectorElement = screen.getByTestId('bike-image-selector')
    expect(imageSelectorElement).toBeInTheDocument()

    const nameElement = screen.getByTestId('bike-name-details')
    expect(nameElement).toBeInTheDocument()

    const pricesElement = screen.getByTestId('bike-prices-details')
    expect(pricesElement).toBeInTheDocument()

    const mapElement = screen.getByTestId('booking-address-map')
    expect(mapElement).toBeInTheDocument()
  })

  it('should have the RentComponent with the pricing details and booking button', () => {
    const rentComponent = screen.getByTestId('rent-component')
    expect(rentComponent).toBeInTheDocument()

    const subtotal = screen.getByTestId('bike-overview-subtotal')
    expect(subtotal).toBeInTheDocument()

    const serviceFee = screen.getByTestId('bike-overview-service-fee')
    expect(serviceFee).toBeInTheDocument()

    const total = screen.getByTestId('bike-overview-total')
    expect(total).toBeInTheDocument()

    const bookingButton = screen.getByRole('button', { name: /add to booking/i })
    expect(bookingButton).toBeInTheDocument()
  })
})

describe('BikeDetails utils', () => {
  it('should gets the services fee properly', () => {
    const amount = 100
    const expectedAmount = amount * SERVICE_FEE_PERCENTAGE

    const result = getServicesFee(amount)
    expect(result).toEqual(expectedAmount)
  })
})
