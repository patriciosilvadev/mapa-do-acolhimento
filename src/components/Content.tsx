import React from 'react'
import GlobalContext from 'context'
import { useStateLink } from '@hookstate/core'
import { CONTENT_STATE } from 'context/content'
import Axios from 'axios'
import Map from './Map'
import Table from './Table'

const Content = () => {
  const {
    visualization: { contentStateRef },
  } = GlobalContext

  const contentState = useStateLink(contentStateRef)

  if (contentState.value === CONTENT_STATE.SHOW_TABLE) {
    return (
      <Map />
    )
  } if (contentState.value === CONTENT_STATE.SHOW_MAP) {
    return (
      <Table />
    )
  }

  return null
}

export default Content
