import { useState } from "react"
import styles from "./styles.module.css"
import InstructionsModal from "../../ui/InstructionsModal"

export default function InstructionsNav() {
  const [openModal, setOpenModal] = useState(false)

  function openInstructionsModal() {
    setOpenModal(true)
  }

  function closeInstructionsModal() {
    setOpenModal(false)
  }

  return (
    <div>
      <div className={styles.instructionsNav} onClick={openInstructionsModal}>
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 12V9M9.5 6H9.5075M17 9C17 13.1421 13.6421 16.5 9.5 16.5C5.35786 16.5 2 13.1421 2 9C2 4.85786 5.35786 1.5 9.5 1.5C13.6421 1.5 17 4.85786 17 9Z"
            stroke="#7A5AF8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Instuctions
      </div>
      <InstructionsModal isOpen={openModal} onClose={closeInstructionsModal} />
    </div>
  )
}
