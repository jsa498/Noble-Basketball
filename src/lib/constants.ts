//src//lib//constants.ts
export const siteConfig = {
  name: "Noble Basketball",
  description: "Comprehensive youth training and skill development programs for basketball enthusiasts.",
  mainNav: [
    {
      title: "Home",
      href: "#home",
    },
    {
      title: "Programs",
      href: "#program-pricing",
    },
    {
      title: "Location",
      href: "#location",
    },
    {
      title: "About",
      href: "#about",
    },
    {
      title: "Contact",
      href: "#contact",
    },
  ],
}

export const locationInfo = {
  name: "Khalsa School Old Yale Elementary",
  address: "10677 124 St",
  city: "Surrey",
  province: "BC",
  postalCode: "V3V 0B1",
  mapUrl: "https://maps.google.com/?q=10677+124+St,+Surrey,+BC+V3V+0B1",
  fullAddress: "10677 124 St, Surrey, BC V3V 0B1"
};

export const practiceTimes = {
  all: {
    day: "Thursday",
    time: "5:30-6:30 PM",
    groups: "All age groups"
  },
  girls: {
    day: "Saturday",
    time: "1:00-2:00 PM",
    groups: "U13-U18 girls"
  },
  boys: {
    day: "Saturday",
    time: "2:00-3:00 PM",
    groups: "U13-U18 boys"
  }
};

export const programDetails = {
  ageGroups: {
    juniors: {
      name: "U8-U12 Boys & Girls Training",
      ageRange: "8-12",
      pricing: {
        monthly: {
          oneDay: 100,
          twoDays: 150
        },
        threeMonth: {
          oneDay: 300,
          twoDays: 450
        }
      }
    },
    seniors: {
      name: "U13-U18 Boys & Girls Training",
      ageRange: "13-18",
      pricing: {
        monthly: {
          oneDay: 150,
          twoDays: 200
        },
        threeMonth: {
          oneDay: 450,
          twoDays: 550
        }
      }
    }
  },
  maxGroupSize: 12,
  features: [
    "High level coaching",
    "Age-appropriate skill development",
    "Regular progress assessments",
    "Group training",
    "Flexible scheduling options"
  ]
};

export const clubTeams = {
  maxSpotsPerTeam: 10,
  seasonPrice: 825,
  seasonIncludes: [
    "2 practices per week",
    "6 tournaments",
    "24 practices (3 months)",
    "Jerseys"
  ],
  teams: [
    {
      name: "Junior Boys",
      ageGroup: "U13-U15",
      gender: "boys"
    },
    {
      name: "Senior Boys",
      ageGroup: "U16-U18",
      gender: "boys"
    },
    {
      name: "Junior Girls",
      ageGroup: "U13-U15",
      gender: "girls"
    },
    {
      name: "Senior Girls",
      ageGroup: "U16-U18",
      gender: "girls"
    }
  ]
};

export const coaches = [
  {
    name: "Jusleen",
    title: "Founder & Coach",
    bio: "Jusleen's journey in basketball is truly inspiring. Starting at the age of 10, she not only developed a deep passion for the game but also honed her skills to become an exceptional point guard. Her leadership on the court was evident as she led her high school team in scoring and earned the Surrey Fire Fighter Team All-Star Award. Now, at 20 years old, Jusleen is committed to giving back to the community by helping youth develop their skills, knowledge, and love for basketball—just as she did throughout her own journey. Her experience and leadership will undoubtedly make a significant impact on the next generation of players.",
  },
  {
    name: "Himat",
    title: "Founder & Coach",
    bio: "Himat is a remarkable individual whose impact goes far beyond his impressive basketball skills. As a natural leader, he has not only excelled on the court, particularly in the point guard position, but also in fostering unity and growth within his community. His ability to dribble past opponents and make clutch shots is matched by his dedication to coaching youth and inspiring his teammates. Himat's influence extends beyond basketball, as he is passionate about bringing communities together, creating positive environments, and ensuring that everyone enjoys the game. His commitment to developing both players and relationships makes him a truly inspiring figure to look up to.",
  },
]

export const trainingFocus = [
  "Strong shooting form",
  "Quick finishing",
  "Perimeter shooting",
  "Advanced dribbling",
  "Court vision",
  "Stamina building",
  "Mental alertness",
  "Game situations",
  "Team play",
  "Leadership on/off court",
  "Vertical training",
  "Body Strength and Conditioning"
] 