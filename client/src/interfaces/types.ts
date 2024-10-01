export interface MockData {
  assessmentName: string
  timeLimit: number
  questions: Question[]
  productBrief: ProductBrief
  comments: any
}

export interface Question {
  question: string
  imageMockups: string[]
}

export interface ProductBrief {
  background: string[]
  targetUsers: string[]
  businessGoals: string[]
  challenges: string[]
  research: string[]
  userInfo: string[]
  team: {
    description: string
    roles: string[]
  }
}

export interface LeftNavProps {
  productBrief: ProductBrief
  questions: Question[]
}

export interface Comment {
  index: number
  displayOrder: number
  x: number //For position of comment on entire canvas
  y: number
  relativePositionTop: number //For position of comment relative to image
  relativePositionLeft: number
  width: number
  height: number
  imageUrl?: string | null
  s3ImageUri?: string | null
  comment: string
  lastUpdated: number
  commentOnImageIndex: number //For index of the image from imageMockups
}

export interface CommentData {
  index: number
  commentData: Comment[]
}

export interface MockCommentData {
  lastUpdated: number
  devicePixelRatio: number
  displayDimensions: {
    width: number
    height: number
  }
  data: CommentData[]
}

// export interface LeaderboardDataType {
//   id: string
//   index: number
//   lastUpdated: string
//   email?: string
//   preferredFirstName: string
//   role: string
//   seniority: string
//   currentCompany: string
//   selectedCountry: string
//   scores: {
//     designStrategy?: number
//     problemSolving?: number
//     customerCentric?: number
//     totalRank: number
//   }
// }

export interface LeaderboardDataType {
  preferredFirstName: string
  role: string
  seniority: string
  currentCompany: string
  selectedCountry: string
  scores: {
    designStrategy?: number
    problemSolving?: number
    customerCentric?: number
    totalScore: number
  }
}

export interface EvaluationResponseType {
  overallScore: number
  overallComment: string
  specificCriteria: EvaluationCriteriaType[]
}

export interface EvaluationCriteriaType {
  criteria: string
  score: number
  positives: string
  negatives: string
}
