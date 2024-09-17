import React from 'react'

interface Load {
    loading: boolean;
}

const Loading = ({loading}: Load) => {
  return (
    loading && <span className="loader"></span>
  )
}

export default Loading