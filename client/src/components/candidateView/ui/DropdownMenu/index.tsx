import { useState } from "react"
import styles from "./styles.module.css"
import miniLogo from "../../../../../public/mini-logo.png"

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div>
      <button className={styles.dropdown} onClick={toggleMenu}>
        <img src={miniLogo} alt="designscout logo" />

        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.97314 1L4.97314 5L0.973145 1"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <ul>
            <li>
              <p
                style={{ color: "red", fontWeight: "700" }}
                onClick={() => (window.location.href = "/")}
              >
                Exit Test
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
