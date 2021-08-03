import Loader from "react-loader-spinner";
import React from 'react'

const Spinner = () => {
  return (
      <Loader
        type="Puff"
        color="#fff346"
        height={100}
        width={100}
        timeout={3000}
      />
  )
}

export default Spinner
