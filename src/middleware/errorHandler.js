export const errorHandler = ((err, req, res, next) => {
  console.error('Error:', err)

  const isProdaction = process.env.NODE_ENV === 'prodaction'


  res.status(500).json(
    {
      message: isProdaction ? "Something went wrong. Please try again later." : err.message,
    }
  )
})
