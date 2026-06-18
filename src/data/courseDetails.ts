import img1 from "../assets/image1.webp";
import img2 from "../assets/image2.webp";
import img3 from "../assets/image3.webp";
import img4 from "../assets/image4.webp";
import img6 from "../assets/image6.webp";
import img7 from "../assets/image7.webp";
import img8 from "../assets/image8.webp";
import rys200Badge from "../assets/rys200Badge.webp";
import rys300Badge from "../assets/rys300Badge.webp";
import rys500Badge from "../assets/rys500Badge.webp";

export type CoursePricing = {
  indian: string;
  international: string;
};

export type CourseScheduleItem = {
  time: string;
  title: string;
  description: string;
};

export type CourseFaq = {
  question: string;
  answer: string;
};

export type CourseDetail = {
  id: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  path: string;
  image: string;
  duration: string;
  level: string;
  accreditation: string;
  badgeImage?: string;
  overview: string;
  highlights: string[];
  curriculum: string[];
  schedule: CourseScheduleItem[];
  accommodation: string[];
  certification: string[];
  pricing: CoursePricing;
  faqs: CourseFaq[];
};

const dailyTrainingSchedule: CourseScheduleItem[] = [
  {
    time: "06:30 - 07:30",
    title: "Pranayama and Meditation",
    description:
      "Begin the day with cleansing breathwork, mantra awareness, and guided stillness.",
  },
  {
    time: "07:45 - 09:15",
    title: "Traditional Asana Practice",
    description:
      "Hatha, Ashtanga, or course-specific practice with alignment and breath focus.",
  },
  {
    time: "10:30 - 12:00",
    title: "Theory and Methodology",
    description:
      "Yoga philosophy, anatomy, sequencing, teaching methods, or modality foundations.",
  },
  {
    time: "15:30 - 17:00",
    title: "Workshop and Practicum",
    description:
      "Hands-on technique, partner work, assisted teaching, and guided feedback.",
  },
  {
    time: "17:15 - 18:15",
    title: "Evening Integration",
    description:
      "Restorative practice, satsang, self-study, journaling, or sound meditation.",
  },
];

const retreatSchedule: CourseScheduleItem[] = [
  {
    time: "07:00 - 08:15",
    title: "Morning Yoga",
    description:
      "Gentle Hatha practice, breath awareness, and grounding meditation.",
  },
  {
    time: "10:30 - 12:00",
    title: "Wellness Session",
    description:
      "Guided relaxation, yogic lifestyle talk, or mindful self-study session.",
  },
  {
    time: "15:30 - 17:00",
    title: "Rishikesh Experience",
    description:
      "Nature walk, temple visit, Ganga time, or quiet personal reflection.",
  },
  {
    time: "17:30 - 18:30",
    title: "Meditation and Sound",
    description:
      "Calming evening practice to settle the nervous system and deepen rest.",
  },
];

const accommodationDetails = [
  "Peaceful accommodation close to the shala in Upper Tapovan, Rishikesh.",
  "Simple, clean rooms designed for rest, study, and yogic routine.",
  "Sattvic vegetarian meals are served during training days.",
  "Wi-Fi, hot water, and basic student support are available.",
  "Private or shared room options can be discussed during application.",
];

const retreatAccommodation = [
  "Comfortable stay in a quiet Rishikesh setting near the practice space.",
  "Daily vegetarian meals planned around yoga and wellness activities.",
  "Space for rest, journaling, and unhurried personal reflection.",
  "Local support for Ganga visits, nature walks, and retreat logistics.",
];

const commonFaqs: CourseFaq[] = [
  {
    question: "Is accommodation included?",
    answer:
      "Accommodation options are available with the program. Final room choice and availability are confirmed during application.",
  },
  {
    question: "Can beginners apply?",
    answer:
      "Yes. Students with sincere interest and regular practice can apply. The mentor team will guide you toward the right course level.",
  },
  {
    question: "How do I reserve my seat?",
    answer:
      "Use Apply Now to contact the shala team. They will confirm availability, room options, and the next steps for enrollment.",
  },
  {
    question: "Are international students welcome?",
    answer:
      "Yes. The school welcomes Indian and international students and displays pricing separately for clarity.",
  },
];

export const courseDetails: CourseDetail[] = [
  {
    id: "100-hour-yoga-ttc",
    title: "100 Hour Yoga TTC",
    shortTitle: "100 Hour TTC",
    eyebrow: "Introductory Yoga Teacher Training",
    path: "/courses/100-hour-yoga-ttc",
    image: img4,
    duration: "Focused introductory training",
    level: "Introductory Level",
    accreditation: "Foundation TTC Certificate",
    overview:
      "A compact teacher training pathway for students who want a sincere introduction to traditional yoga study in Rishikesh before committing to a longer TTC.",
    highlights: [
      "Build a steady foundation in asana, pranayama, and meditation.",
      "Study essential yoga philosophy in a practical, approachable way.",
      "Experience the daily discipline of a traditional yoga shala.",
      "Prepare for the 200 Hour Yoga TTC pathway.",
    ],
    curriculum: [
      "Hatha yoga foundations and posture awareness",
      "Introductory Ashtanga Vinyasa practice",
      "Pranayama, mantra, and meditation basics",
      "Yoga philosophy and yogic lifestyle",
      "Anatomy fundamentals for safe practice",
      "Teaching basics, class presence, and confidence",
    ],
    schedule: dailyTrainingSchedule,
    accommodation: accommodationDetails,
    certification: [
      "Certificate of completion from Shivaya Yogashala.",
      "Foundation pathway for students continuing into 200 Hour Yoga TTC.",
      "Attendance, practice participation, and final evaluation are required.",
    ],
    pricing: {
      indian: "₹19,999",
      international: "$385",
    },
    faqs: [
      {
        question: "Who is the 100 Hour TTC best for?",
        answer:
          "It is best for students who want an introductory training experience or a shorter first step before the 200 Hour TTC.",
      },
      ...commonFaqs,
    ],
  },
  {
    id: "200-hour-yoga-ttc",
    title: "200 Hour Yoga TTC",
    shortTitle: "200 Hour TTC",
    eyebrow: "Yoga Alliance Teacher Training",
    path: "/courses/200-hour-yoga-ttc",
    image: img1,
    duration: "25 Days",
    level: "Introductory Level",
    accreditation: "Yoga Alliance RYT 200",
    badgeImage: rys200Badge,
    overview:
      "The 200 Hour Yoga TTC is the foundational teacher training journey at Shivaya Yogashala, combining traditional Hatha, Ashtanga, pranayama, meditation, anatomy, philosophy, and teaching practice.",
    highlights: [
      "A complete foundation for aspiring yoga teachers.",
      "Traditional practice with modern teaching methodology.",
      "Daily feedback to develop confidence and clarity.",
      "Study in the spiritual atmosphere of Upper Tapovan, Rishikesh.",
    ],
    curriculum: [
      "Hatha yoga alignment, adjustments, and sequencing",
      "Ashtanga Vinyasa primary series foundation",
      "Yoga anatomy, physiology, and safe movement",
      "Pranayama, kriya, mantra, and meditation",
      "Yoga philosophy, ethics, and yogic lifestyle",
      "Teaching methodology and supervised practicum",
    ],
    schedule: dailyTrainingSchedule,
    accommodation: accommodationDetails,
    certification: [
      "Yoga Alliance aligned 200 Hour TTC certificate.",
      "Eligible students can begin teaching after successful completion.",
      "Assessment includes attendance, teaching practice, written work, and conduct.",
    ],
    pricing: {
      indian: "₹29,999",
      international: "$610",
    },
    faqs: [
      {
        question: "Do I need teaching experience?",
        answer:
          "No. The 200 Hour TTC is designed as a foundation course for sincere practitioners and future teachers.",
      },
      ...commonFaqs,
    ],
  },
  {
    id: "300-hour-yoga-ttc",
    title: "300 Hour Yoga TTC",
    shortTitle: "300 Hour TTC",
    eyebrow: "Advanced Yoga Teacher Training",
    path: "/courses/300-hour-yoga-ttc",
    image: img8,
    duration: "28 Days",
    level: "Intermediate to Advanced",
    accreditation: "Yoga Alliance RYT 300",
    badgeImage: rys300Badge,
    overview:
      "The 300 Hour Yoga TTC deepens practice and teaching skills for students who already understand the foundations and want advanced training in alignment, sequencing, philosophy, pranayama, and confident teaching.",
    highlights: [
      "Refine advanced posture work and intelligent sequencing.",
      "Deepen pranayama, meditation, and subtle body study.",
      "Develop a more mature teaching voice.",
      "Strengthen hands-on adjustment and class planning skills.",
    ],
    curriculum: [
      "Advanced Hatha and Ashtanga Vinyasa practice",
      "Sequencing, theming, and class architecture",
      "Adjustment, assists, and prop-supported alignment",
      "Advanced pranayama and meditation techniques",
      "Yoga philosophy, subtle anatomy, and chakras",
      "Mentored teaching practice and feedback",
    ],
    schedule: dailyTrainingSchedule,
    accommodation: accommodationDetails,
    certification: [
      "Yoga Alliance aligned 300 Hour TTC certificate.",
      "Designed for students progressing beyond a 200 Hour foundation.",
      "Successful completion depends on attendance, practice, assignments, and teaching assessment.",
    ],
    pricing: {
      indian: "₹34,999",
      international: "$795",
    },
    faqs: [
      {
        question: "Is a 200 Hour TTC required?",
        answer:
          "A 200 Hour foundation or equivalent experience is recommended so students can receive the full benefit of advanced training.",
      },
      ...commonFaqs,
    ],
  },
  {
    id: "500-hour-yoga-ttc",
    title: "500 Hour Yoga TTC",
    shortTitle: "500 Hour TTC",
    eyebrow: "Complete Yoga Teacher Training Pathway",
    path: "/courses/500-hour-yoga-ttc",
    image: img2,
    duration: "54 Days",
    level: "Introductory to Advanced",
    accreditation: "Yoga Alliance RYT 500",
    badgeImage: rys500Badge,
    overview:
      "The 500 Hour Yoga TTC is the complete training path for committed students who want to move from foundational practice into advanced teaching, deeper philosophy, and refined personal sadhana.",
    highlights: [
      "Integrated foundation and advanced TTC journey.",
      "A deeper immersion into practice, teaching, and yogic discipline.",
      "Strong preparation for professional yoga teaching.",
      "A longer residential experience in Rishikesh.",
    ],
    curriculum: [
      "Complete Hatha, Ashtanga, and Vinyasa training",
      "Foundational and advanced teaching methodology",
      "Anatomy, alignment, safety, and adjustment skills",
      "Pranayama, meditation, mantra, and kriya practices",
      "Yoga philosophy, subtle body, ethics, and lifestyle",
      "Extensive teaching practicum and mentorship",
    ],
    schedule: dailyTrainingSchedule,
    accommodation: accommodationDetails,
    certification: [
      "Yoga Alliance aligned 500 Hour TTC certificate.",
      "Comprehensive training combining foundation and advanced study.",
      "Assessment includes practice, teaching, written work, attendance, and final evaluation.",
    ],
    pricing: {
      indian: "₹64,999",
      international: "$1410",
    },
    faqs: [
      {
        question: "Can I take the 500 Hour TTC as one continuous course?",
        answer:
          "Yes. The 500 Hour TTC is designed as a complete immersion for students ready for a longer and deeper training commitment.",
      },
      ...commonFaqs,
    ],
  },
  {
    id: "aerial-yoga-ttc",
    title: "Aerial Yoga TTC",
    shortTitle: "Aerial Yoga TTC",
    eyebrow: "Specialized Aerial Yoga Training",
    path: "/courses/aerial-yoga-ttc",
    image: img3,
    duration: "Specialized TTC",
    level: "All Levels with Yoga Foundation",
    accreditation: "Aerial Yoga Certificate",
    overview:
      "Aerial Yoga TTC introduces hammock-supported movement, alignment, safety, sequencing, and teaching confidence for students who want to add a creative and therapeutic modality to their practice.",
    highlights: [
      "Learn safe hammock setup, spotting, and class structure.",
      "Explore decompression, strength, mobility, and inversion work.",
      "Understand contraindications and student safety.",
      "Practice cueing and teaching aerial yoga with confidence.",
    ],
    curriculum: [
      "Aerial hammock fundamentals and safety",
      "Warm-ups, conditioning, and mobility drills",
      "Supported postures, inversions, and transitions",
      "Sequencing for beginner-friendly aerial classes",
      "Contraindications, spotting, and class management",
      "Teaching practice and guided feedback",
    ],
    schedule: dailyTrainingSchedule,
    accommodation: accommodationDetails,
    certification: [
      "Aerial Yoga TTC certificate from Shivaya Yogashala.",
      "Certification is awarded after participation, safety practice, and teaching evaluation.",
      "Designed as a specialized add-on for yoga students and teachers.",
    ],
    pricing: {
      indian: "₹18,000",
      international: "$330",
    },
    faqs: [
      {
        question: "Do I need aerial yoga experience?",
        answer:
          "Prior aerial practice is helpful but not mandatory. A basic yoga foundation and willingness to learn safely are recommended.",
      },
      ...commonFaqs,
    ],
  },
  {
    id: "sound-healing-ttc",
    title: "Sound Healing TTC",
    shortTitle: "Sound Healing TTC",
    eyebrow: "Meditation and Vibrational Healing Training",
    path: "/courses/sound-healing-ttc",
    image: img6,
    duration: "Specialized TTC",
    level: "All Levels",
    accreditation: "Sound Healing Certificate",
    overview:
      "Sound Healing TTC is a meditative training path for students who want to understand sound, vibration, intention, and therapeutic relaxation through bowls, rhythm, voice, and guided presence.",
    highlights: [
      "Learn foundational sound healing principles and session flow.",
      "Practice with bowls, voice, rhythm, silence, and guided meditation.",
      "Understand energy, resonance, and nervous system relaxation.",
      "Develop confidence to hold calming sound sessions.",
    ],
    curriculum: [
      "Foundations of sound, vibration, and intention",
      "Singing bowl practice and mindful playing technique",
      "Chakra awareness and meditative session design",
      "Voice, mantra, rhythm, and silence",
      "Holding space, ethics, and client comfort",
      "Practicum, observation, and feedback",
    ],
    schedule: dailyTrainingSchedule,
    accommodation: accommodationDetails,
    certification: [
      "Sound Healing TTC certificate from Shivaya Yogashala.",
      "Certification is awarded after guided practice and final session evaluation.",
      "Designed for meditation teachers, yoga teachers, and wellness practitioners.",
    ],
    pricing: {
      indian: "₹18,000",
      international: "$330",
    },
    faqs: [
      {
        question: "Do I need musical training?",
        answer:
          "No. Musical training is not required. The course focuses on mindful listening, simple technique, and holding a safe meditative space.",
      },
      ...commonFaqs,
    ],
  },
  {
    id: "yoga-retreat",
    title: "Yoga Retreat",
    shortTitle: "Yoga Retreat",
    eyebrow: "Restorative Yoga Retreat in Rishikesh",
    path: "/courses/yoga-retreat",
    image: img7,
    duration: "3 to 5 Days",
    level: "All Levels",
    accreditation: "Retreat Participation",
    overview:
      "The Yoga Retreat is a peaceful Rishikesh experience for rest, practice, meditation, and reconnection. It is designed for students who want yoga without the intensity of a teacher training schedule.",
    highlights: [
      "Daily yoga, meditation, and breathwork in a supportive setting.",
      "Time for rest, self-reflection, and gentle spiritual exploration.",
      "Experience the calm rhythm of Rishikesh and the Ganga.",
      "Suitable for beginners, travelers, and returning practitioners.",
    ],
    curriculum: [
      "Morning Hatha yoga and breath awareness",
      "Guided meditation and relaxation",
      "Yogic lifestyle and wellness sessions",
      "Sound meditation or restorative practice",
      "Rishikesh nature and spiritual experiences",
      "Personal reflection and integration time",
    ],
    schedule: retreatSchedule,
    accommodation: retreatAccommodation,
    certification: [
      "This is a retreat experience, not a teacher training certification.",
      "A participation certificate can be provided on request.",
      "Students seeking teaching certification can continue into TTC programs.",
    ],
    pricing: {
      indian: "Contact for pricing",
      international: "Contact for pricing",
    },
    faqs: [
      {
        question: "Is the retreat suitable for first-time yoga students?",
        answer:
          "Yes. The retreat is gentle and adaptable, making it suitable for new students as well as experienced practitioners seeking rest.",
      },
      ...commonFaqs,
    ],
  },
];

export const courseDetailIds = courseDetails.map((course) => course.id);

export function getCourseDetailById(id: string | undefined) {
  if (!id) return undefined;
  return courseDetails.find((course) => course.id === id);
}

export function getCourseDetailByTitle(title: string | undefined) {
  if (!title) return undefined;
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("aerial")) {
    return getCourseDetailById("aerial-yoga-ttc");
  }

  if (lowerTitle.includes("sound")) {
    return getCourseDetailById("sound-healing-ttc");
  }

  if (lowerTitle.includes("retreat")) {
    return getCourseDetailById("yoga-retreat");
  }

  if (lowerTitle.includes("100")) {
    return getCourseDetailById("100-hour-yoga-ttc");
  }

  if (lowerTitle.includes("200")) {
    return getCourseDetailById("200-hour-yoga-ttc");
  }

  if (lowerTitle.includes("300")) {
    return getCourseDetailById("300-hour-yoga-ttc");
  }

  if (lowerTitle.includes("500")) {
    return getCourseDetailById("500-hour-yoga-ttc");
  }

  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "");

  return courseDetails.find((course) => {
    const normalizedDetailTitle = course.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const normalizedShortTitle = course.shortTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    return (
      normalizedTitle.includes(normalizedDetailTitle) ||
      normalizedTitle.includes(normalizedShortTitle) ||
      normalizedDetailTitle.includes(normalizedTitle)
    );
  });
}
