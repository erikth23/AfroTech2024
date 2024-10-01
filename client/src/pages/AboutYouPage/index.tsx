import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { setUserData } from "../../features/clientFlow/clientFlowSlice"
import Select, { SingleValue } from "react-select"
import countries from "i18n-iso-countries"
import enLocale from "i18n-iso-countries/langs/en.json"

// Prepare countries
countries.registerLocale(enLocale)

const countryOptions = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([value, label]) => ({ value, label }))

const roleOptions = [
  { value: "ux_designer", label: "UX Designer" },
  { value: "ux_researcher", label: "UX Researcher" },
  { value: "engineer", label: "Engineer" },
  { value: "product_designer", label: "Product Designer" },
  { value: "product_manager", label: "Product Manager" },
  { value: "founder", label: "Founder" },
  { value: "venture_capitalist", label: "VC" },
]

const seniorityOptions = [
  { value: "early_career", label: "Early Career (0-2 years of experience)" },
  { value: "mid_career", label: "Middle Career (3-5 years of experience" },
  { value: "senior_ic", label: "Senior+ Individual contributor" },
  { value: "manager", label: "Manager" },
  { value: "director_plus", label: "Director+" },
]

interface OptionType {
  value: string
  label: string
}

export default function AboutYouPage() {
  const [preferredName, setPreferredName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<OptionType | null>(null)
  const [selectedSeniority, setSelectedSeniority] = useState<OptionType | null>(
    null
  )
  const [currentCompany, setCurrentCompany] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  )
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setPreferredName(event.target.value)
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handleRoleChange(option: SingleValue<OptionType>) {
    setSelectedRole(option)
  }

  function handleSeniorityChange(option: SingleValue<OptionType>) {
    setSelectedSeniority(option)
  }

  function handleCompanyChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentCompany(event.target.value)
  }

  function handleCountryChange(option: SingleValue<OptionType>) {
    setSelectedCountry(option)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // Prevent the default form submission behavior

    // Perform validation or other checks here if needed
    if (event.currentTarget.checkValidity()) {
      navigate("/instructions")
      dispatch(
        setUserData({
          preferredName,
          email,
          role: selectedRole?.label,
          seniority: selectedSeniority?.label,
          currentCompany,
          selectedCountry: selectedCountry?.label,
        })
      )
    } else {
      alert("Please fill in all fields.")
    }
  }

  return (
    <div className={styles.aboutYouPage}>
      <div className={styles.messageSection}>
        <span onClick={() => (window.location.href = "/")}>
          <img
            className="logo"
            src="/DesignScout-Main-Logo.png"
            alt="design scout logo"
          />
        </span>
        <h1>We're excited to have you on board!</h1>
        <p>
          This is your chance to showcase your design skills, tackle real-world
          challenges, and help shape the future of our platform.
        </p>
        <p>
          At the end of the assessment, we'll ask for your feedback to help us
          improve. Your insights are invaluable to us, and we can't wait to see
          what you create. Let's get started!
        </p>
      </div>
      <div className={styles.formSection}>
        <h2>First, tell us a little about yourself.</h2>
        <form className={styles.detailsForm} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.requiredField} htmlFor="user-name">
              Name
            </label>
            <input
              type="text"
              name="preferredName"
              id="user-name"
              value={preferredName}
              onChange={handleNameChange}
              placeholder="Your preferred name"
              required
              pattern=".*\S+.*"
              title="Name must not be empty or just spaces."
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.requiredField} htmlFor="user-email">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="user-email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Work email preferred"
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="user-role">Role</label>
            <Select
              options={roleOptions}
              onChange={handleRoleChange}
              value={selectedRole}
              placeholder="Select a role"
              isClearable={true}
              isSearchable={true}
              name="role"
              id="user-role"
              instanceId="user-role"
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="user-seniority">Level of seniority</label>
            <Select
              options={seniorityOptions}
              onChange={handleSeniorityChange}
              value={selectedSeniority}
              placeholder="Select one"
              isClearable={true}
              isSearchable={true}
              name="seniority"
              id="user-seniority"
              instanceId="user-seniority"
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="user-company">Current Organization</label>
            <input
              type="text"
              name="company"
              id="user-company"
              value={currentCompany}
              onChange={handleCompanyChange}
              placeholder="Who do you work for?"
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="user-country">Select your country</label>
            <Select
              options={countryOptions}
              onChange={handleCountryChange}
              value={selectedCountry}
              placeholder="Select a country"
              isClearable={true}
              isSearchable={true}
              name="country"
              id="user-country"
              instanceId="user-country" // Helpful for accessibility and form labeling
            />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="termsAndConditions"
                name="termsAndConditions"
                required
              />
              <label
                htmlFor="termsAndConditions"
                className={styles.checkboxLabel}
              >
                I have read and agree to the{" "}
                <a
                  target="_blank"
                  href="/DesignScout - Terms and Conditions.pdf"
                >
                  terms and conditions
                </a>{" "}
                and
                <a
                  target="_blank"
                  href="/DesignScout - Data Privacy Policy.pdf"
                >
                  {" "}
                  data privacy policy
                </a>
                .
              </label>
            </div>
          </div>

          <button type="submit" className="primary size-md">
            Next
          </button>
        </form>
      </div>
    </div>
  )
}
