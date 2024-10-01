export const recruiterProfileResponse = {
  profileId: "1hwidufhi34241",
  displayName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  lastLogin: new Date().toISOString(),
  assessmentsList: {
    activeAssessments: [
      {
        assessmentId: "123456",
        createdOn: new Date("2022-01-01").toISOString(),
        lastUpdated: new Date().toISOString(),
        index: 1,
        title: "Product Design Intern",
        tags: "Most Popular",
        role: "Intern",
        teamName: "Payments team",
        organization: "AirBnB",
        thumbnail: "image-url",
        skills: ["Critical thinking", "communication", "visual design"],
        experience: ["Graduate student", "1 year experience"],
        assessmentInfo: {
          timeLimit: 60,
          lastUpdated: new Date().toISOString(),
          productBrief: {
            background: [
              "Airbnb is a global online marketplace for lodging, primarily home stays for vacation rentals, and tourism activities.",
            ],
            targetUsers: [
              "Demographics: Users aged between 25-45 years, primarily consisting of millennial travellers and small families.",
              "Psychographics: Users who value unique travel experiences, convenience, and value for money.",
              "Behavioural Characteristics: Users who prefer online bookings, are tech-savvy, and often rely on mobile devices for travel planning.",
            ],
            businessGoals: [
              "Increase the booking conversion rate.",
              "Enhance user engagement by improving the ease of use and functionality of the mobile app.",
              "Retain existing customers and attract new ones by ensuring a seamless user experience.",
            ],
            challenges: [
              "Managing Multiple Projects: Prioritising tasks across multiple projects to ensure deadlines are met.",
              "Communication gaps",
            ],
          },
          questions: [
            {
              question: "What would you change to increase user engagement?",
              imageMockups: [
                "./img-mockup.png",
                "https://cdsassets.apple.com/live/7WUAS350/images/ios/ios-17-iphone-15-pro-app-library.png",
                "https://play-lh.googleusercontent.com/z1ynNM1nPd7JOOGYRK16qcrX7KZpK0CrnNUUyQXOCxfuxtVcA5lu3qPKWK7ZR_Pp4Q",
              ],
            },
            {
              question:
                "How would you implement A/B testing to evaluate new features?",
              imageMockups: ["https://example.com/ab-testing-mockup.png"],
            },
          ],
        },
      },
      {
        assessmentId: "654321",
        createdOn: new Date("2022-02-01").toISOString(),
        lastUpdated: new Date().toISOString(),
        index: 2,
        title: "UI/UX Designer",
        tags: "Urgent Hiring",
        role: "Full-time",
        teamName: "Marketing",
        organization: "Spotify",
        thumbnail: "another-image-url",
        skills: ["User research", "Prototyping", "UI/UX design"],
        experience: ["2+ years in UI/UX", "Familiar with Sketch and Figma"],
        assessmentInfo: {
          timeLimit: 90,
          lastUpdated: new Date().toISOString(),
          productBrief: {
            background: [
              "Spotify is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world.",
            ],
            targetUsers: [
              "Demographics: Wide range of users, predominantly 18-34 year olds.",
              "Psychographics: Music lovers, podcast listeners, tech-savvy individuals.",
              "Behavioural Characteristics: Frequent users of streaming services, highly engaged with playlists and sharing content.",
            ],
            businessGoals: [
              "Increase monthly active users.",
              "Boost premium subscription rates.",
              "Enhance personalized experience to increase user retention.",
            ],
            challenges: [
              "Enhancing personalization algorithms to better suit user tastes.",
              "Improving user interface for better accessibility and usability.",
            ],
          },
          questions: [
            {
              question:
                "What strategies would you propose to increase premium subscriptions?",
              imageMockups: [
                "https://example.com/premium-subscription-strategies.png",
              ],
            },
          ],
        },
      },
    ],
    draftedAssessments: [
      {
        assessmentId: "789012",
        createdOn: new Date("2022-02-01").toISOString(),
        lastUpdated: new Date().toISOString(),
        index: 2,
        title: "Backend Developer Intern",
        tags: "New",
        role: "Intern",
        teamName: "Infrastructure",
        organization: "Google",
        thumbnail: "another-image-url",
        skills: ["Python", "API development", "Google Cloud"],
        experience: ["Any level", "Python proficiency"],
        assessmentInfo: {
          timeLimit: 90,
          lastUpdated: new Date().toISOString(),
          productBrief: {
            background: [
              "Google Cloud services offer a broad set of tools for data storage, processing, and analytics.",
            ],
            targetUsers: [
              "Demographics: Enterprise clients and developers.",
              "Psychographics: Users looking for scalable, reliable cloud solutions.",
              "Behavioural Characteristics: High technical proficiency and dependence on robust cloud solutions.",
            ],
            businessGoals: [
              "Expand market share within the cloud services industry.",
              "Reduce latency and increase reliability of Google Cloud services.",
              "Improve client onboarding and training resources.",
            ],
            challenges: [
              "Integration with legacy systems.",
              "Data security and privacy concerns.",
            ],
          },
          questions: [
            {
              question:
                "How would you optimize cloud resource usage for cost efficiency?",
              imageMockups: ["https://example.com/cloud-optimization.png"],
            },
          ],
        },
      },
    ],
    closedAssessments: [
      {
        assessmentId: "345678",
        createdOn: new Date("2021-12-01").toISOString(),
        lastUpdated: new Date().toISOString(),
        index: 3,
        title: "Frontend Developer Intern",
        tags: "Closed",
        role: "Intern",
        teamName: "User Experience",
        organization: "Facebook",
        thumbnail: "closed-image-url",
        skills: ["JavaScript", "React", "CSS"],
        experience: ["2+ years experience", "Strong design portfolio"],
      },
      {
        assessmentId: "987654",
        createdOn: new Date("2022-03-01").toISOString(),
        lastUpdated: new Date().toISOString(),
        index: 4,
        title: "Data Analyst",
        tags: "Closed",
        role: "Contract",
        teamName: "Business Intelligence",
        organization: "Microsoft",
        thumbnail: "data-analyst-image-url",
        skills: ["SQL", "PowerBI", "Data Warehousing"],
        experience: ["3+ years experience", "Advanced analytics skills"],
      },
    ],
  },
}
