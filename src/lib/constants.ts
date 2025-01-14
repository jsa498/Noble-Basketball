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
      title: "About",
      href: "#about",
    },
    {
      title: "Contact",
      href: "#contact",
    },
  ],
}

export const programDetails = {
  ageGroups: {
    juniors: {
      name: "Juniors Training Program",
      ageRange: "8-12",
      pricing: {
        oneDay: 100,
        twoDays: 150
      }
    },
    seniors: {
      name: "Seniors Training Program",
      ageRange: "13-18",
      pricing: {
        oneDay: 200,
        twoDays: 250
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

interface Coach {
  name: string;
  title: string;
  bio: string;
  image?: string;
  certifications?: string[];
  social?: {
    linkedin?: string;
    instagram?: string;
  };
}

export const coaches: Coach[] = [
  {
    name: "Jusleen",
    title: "Founder & Coach",
    bio: "Jusleen's journey in basketball is truly inspiring. Starting at the age of 10, she not only developed a deep passion for the game but also honed her skills to become an exceptional point guard. Her leadership on the court was evident as she led her high school team in scoring and earned the Surrey Fire Fighter Team All-Star Award. Now, at 20 years old, Jusleen is committed to giving back to the community by helping youth develop their skills, knowledge, and love for basketball—just as she did throughout her own journey. Her experience and leadership will undoubtedly make a significant impact on the next generation of players.",
    image: "/images/jusleen.jpg",
    certifications: ["NCCP Certified", "First Aid Certified"],
    social: {
      linkedin: "https://linkedin.com/in/jusleen",
      instagram: "https://instagram.com/jusleen.basketball"
    }
  },
  {
    name: "Himat",
    title: "Founder & Coach",
    bio: "Himat is a remarkable individual whose impact goes far beyond his impressive basketball skills. As a natural leader, he has not only excelled on the court, particularly in the point guard position, but also in fostering unity and growth within his community. His ability to dribble past opponents and make clutch shots is matched by his dedication to coaching youth and inspiring his teammates. Himat's influence extends beyond basketball, as he is passionate about bringing communities together, creating positive environments, and ensuring that everyone enjoys the game. His commitment to developing both players and relationships makes him a truly inspiring figure to look up to.",
    image: "/images/himat.jpg",
    certifications: ["NCCP Certified", "First Aid Certified"],
    social: {
      linkedin: "https://linkedin.com/in/himat",
      instagram: "https://instagram.com/himat.basketball"
    }
  }
];

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