import ProcessingModalView from './View'

const ProcessingModal = ({ isOpen, closeModal, steps }) => (
  <ProcessingModalView isOpen={isOpen} closeModal={closeModal} steps={steps} />
)

export default ProcessingModal
