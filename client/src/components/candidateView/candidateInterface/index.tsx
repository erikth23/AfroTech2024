import CanvasArea from "../canvas-area"
import { MockData } from "../../../interfaces/types"
import styles from "./styles.module.css"
import HeadingNav from "../nav/HeadingNav"
import LeftNav from "../nav/LeftNav"
import Timer from "../ui/Timer"
import CommentNav from "../nav/CommentNav"
import ToolBarNav from "../nav/ToolBarNav"
import InstructionsNav from "../nav/Instructions"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { useState } from "react"

export default function CandidateInterface() {
  const { currentQuestion } = useSelector(
    (state: RootState) => state.clientFlow
  )
  const [commentMode, setCommentMode] = useState<boolean>(true)

  const mockData: MockData = {
    assessmentName: "AirBnB",
    timeLimit: 25,
    productBrief: {
      background: [
        "Airbnb is a global online marketplace that connects travelers with unique lodging experiences, primarily focusing on home stays for vacation rentals and tourism activities. The platform offers a range of accommodation options worldwide, from apartments and villas to unique stays like treehouses and houseboats.",
      ],
      targetUsers: [
        "Demographics: Users aged between 25-45 years, primarily consisting of millennial travellers and small families.",
        "Psychographics: Users who seek unique travel experiences, value convenience, and prioritize affordability.",
        "Behavioural Characteristics: Tech-savvy users who prefer online bookings and frequently rely on mobile devices for planning and managing their travel itineraries.",
      ],
      businessGoals: [
        "Increase Booking Conversion Rate: Drive higher conversions by optimizing the booking process and reducing friction points.",
        "Enhance User Engagement: Improve the ease of use and functionality of the mobile app to keep users engaged and active.",
        "Retain and Attract Customers: Strengthen customer retention and acquisition strategies by delivering a seamless and delightful user experience.",
      ],
      challenges: [
        "Adapting to Diverse User Needs: Balancing the platform’s offerings to cater to both casual users looking for quick getaways and frequent travelers seeking unique and extended stays.",
        "Ensuring Consistent Quality: Maintaining consistent quality and experience standards across a vast range of hosts and locations.",
        "Integrating Feedback Loops: Creating efficient ways to collect, analyze, and implement user feedback to continuously improve the product.",
        "Competing in a Crowded Market: Differentiating the platform in an increasingly competitive travel marketplace with emerging players and new service models.",
      ],
      research: [
        "Usability Studies: Conducted usability studies on the mobile app to identify friction points in the booking process. Findings showed that users often struggled with navigating the booking flow, leading to cart abandonment.",
        "User Surveys: Surveys indicated that users value unique and authentic experiences but are concerned about the reliability of the listed properties and hosts.",
        "A/B Testing: Implemented A/B testing to optimize the search and filter functionalities. Results showed a 15% increase in user engagement with refined filter options.",
        "User Feedback Analysis: Analyzed feedback from customer support interactions and online reviews, highlighting areas for improvement in communication with hosts and enhancing property descriptions.",
      ],
      userInfo: [
        "Primary Needs: Users desire a seamless, reliable, and transparent booking experience that offers diverse accommodation choices and provides value for money.",
        "Pain Points: Common user frustrations include inconsistent property quality, lack of clarity in property descriptions, difficulty navigating the mobile app, and insufficient customer support during booking issues.",
        "User Behavior Patterns: Users are most active during weekends and holidays, with peak booking times occurring in the evening hours. A significant proportion of users access the platform via the mobile app.",
      ],
      team: {
        description:
          "The Product Team at Airbnb is dedicated to enhancing the user experience and achieving the company’s strategic objectives. The team is composed of various roles, each with distinct focuses:",
        roles: [
          "Product Manager: Focuses on defining the product vision and strategy, setting priorities, and managing the product roadmap. Ensures alignment across teams and balances user needs with business goals to drive product success.",
          "UX Designer (You): Focuses on creating intuitive, user-centered designs for web and mobile platforms. Responsible for crafting wireframes, prototypes, and high-fidelity designs, conducting user research, and collaborating closely with other team members to refine and implement design solutions.",
          "UX Researcher: Focuses on understanding user behaviors, needs, and motivations through various research methods. Conducts usability studies, surveys, and interviews to provide actionable insights that inform design decisions and improve overall user experience.",
          "Data Analyst: Focuses on analyzing user data and key performance metrics to identify trends, measure the impact of design changes, and provide data-driven recommendations. Works closely with designers and product managers to optimize the product based on quantitative insights.",
          "Content Strategist: Focuses on developing and managing content across the platform, ensuring it is clear, engaging, and aligned with the brand voice. Collaborates with designers and product managers to create user-friendly copy that enhances the user experience.",
          "Front-End Developer: Focuses on implementing and maintaining the user interface based on design specifications. Works closely with UX designers to ensure design fidelity, responsiveness, and performance, translating design assets into functional code.",
        ],
      },
    },
    questions: [
      {
        question: "What would you change to increase user engagement?",
        imageMockups: ["/IMG_1054.PNG", "/IMG_1055.PNG", "/IMG_1056.PNG"],
      },
    ],
    comments: [],
  }

  function updateCommentState(newState: boolean) {
    setCommentMode(newState)
  }

  return (
    <div className={styles.candidateInterface}>
      {/* 
      Check state of question selection here. 
      Props to pass: 
        - product brief and question for left nav,
        - image for canvas area
        - all comments for right nav   
    */}

      <HeadingNav assessmentName={mockData.assessmentName} />
      <LeftNav
        questions={mockData.questions}
        productBrief={mockData.productBrief}
      />
      <InstructionsNav />
      <Timer timerMinutes={mockData.timeLimit} />
      <CommentNav commentMode={commentMode} />
      <ToolBarNav
        commentMode={commentMode}
        updateCommentState={updateCommentState}
      />
      <CanvasArea
        commentMode={commentMode}
        imageMockups={mockData.questions[currentQuestion].imageMockups}
      />
    </div>
  )
}
