import axios from "axios"

interface UploadResponse {
  result: any
  url: string
  contentType: string
}

const API_URL = "http://ec2-34-216-69-197.us-west-2.compute.amazonaws.com:443/v1"

export const uploadImage = async (imageBlob: Blob): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append("image", imageBlob)
  const config = {
    method: "put",
    url: `${API_URL}/public/image/upload`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }

  let lastError: unknown

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await axios(config)
      return response.data // Successful upload, return the response data
    } catch (error) {
      console.error(`Attempt ${attempt + 1}: Error uploading file`, error)
      lastError = error
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempt))
      ) // Exponential backoff
    }
  }

  // After all attempts fail, throw the last encountered error
  throw lastError
}

export const getImage = async (s3Uri: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/public/image`, {
      params: { s3Uri },
      responseType: "blob"
    });
  
    return URL.createObjectURL(response.data);
  } catch (err) {
    console.error("Failed to retrieve s3 image")
    return ""
  }
}

export const fetchLeaderboardData = async () => {
  let lastError: unknown

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await axios.get(`${API_URL}/public/canidates`)
      console.log(result)

      return convertResponseEvaluations(result.data) // Successful fetch, return the data
    } catch (error) {
      console.error(
        `Attempt ${attempt + 1}: Error retrieving leaderboard data`,
        error
      )
      lastError = error
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempt))
      ) // Exponential backoff
    }
  }

  // After all attempts fail, throw the last encountered error
  throw lastError
}

export const submitTestResponses = async (testResponses: any) => {
  let lastError: unknown

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const timestamp = new Date().toISOString()
      const result = await axios.post(`${API_URL}/public/analyze`, testResponses)
      console.log(`Responses successfully submitted at ${timestamp}`)
      return result // Successful post, return the result
    } catch (error) {
      console.error(
        `Attempt ${attempt + 1}: Error submitting test responses`,
        error
      )
      lastError = error
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempt))
      ) // Exponential backoff
    }
  }

  // After all attempts fail, throw the last encountered error
  throw lastError
}

function convertResponseEvaluations(data: any) {
  return data.map((candidate: { canidateData: { preferredName: string; role: string; seniority: string; currentCompany: string; country: string }; evaluation: { overallScore: any; specificCriteria: { score: any }[] } }) => ({
    // id: candidate.id,
    // index: candidate.index,
    preferredFirstName: formatPreferredName(
      candidate.canidateData?.preferredName
    ),
    // lastUpdated: candidate.lastUpdated,
    role: candidate.canidateData?.role?.trim() || "-",
    seniority: candidate.canidateData?.seniority?.trim() || "-",
    currentCompany: candidate.canidateData?.currentCompany?.trim() || "-",
    selectedCountry: candidate.canidateData?.country?.trim() || "-",
    scores:
      {
        totalScore: candidate?.evaluation.overallScore,
        designStrategy: candidate?.evaluation.specificCriteria[0].score,
        problemSolving: candidate?.evaluation.specificCriteria[1].score,
        customerCentric: candidate?.evaluation.specificCriteria[2].score,
      } || "-",
  }))
}


function formatPreferredName(name: string) {
  if (!name) return "-"
  const [firstName] = name.split(" ")
  const formattedName =
    firstName?.charAt(0)?.toUpperCase() + firstName?.slice(1)?.toLowerCase()
  return formattedName?.trim() || "-"
}