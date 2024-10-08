import React from 'react'

import ErrorIcon from '@material-ui/icons/Warning'

import Button from '../../../components/Button'
import Modal from '../../../components/Modal'
import ModalActions from '../../../components/Modal/ModalActions'
import ModalIcon from '../../../components/Modal/ModalIcon'
import ModalTitle from '../../../components/Modal/ModalTitle'

const Network = () => {
  return (
    <Modal>
      <ModalIcon>
        <ErrorIcon style={{ fontSize: 48 }} />
      </ModalIcon>
      <ModalTitle>
        Incorrect Network
      </ModalTitle>
      <ModalActions centered={true}>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </ModalActions>
    </Modal>
  )
}

export default Network
