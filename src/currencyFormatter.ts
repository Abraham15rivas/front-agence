
const currencyFormatter = ({ currency, value }: { currency: string, value: number }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency
  })
  return formatter.format(value)
}

export default currencyFormatter