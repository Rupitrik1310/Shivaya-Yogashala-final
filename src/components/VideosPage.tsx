import { MandalaWatermark } from "./MandalaWatermark";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import shivaLogo from "figma:asset/dda3bf9d206010d15993d348fc449c47e604a2d7.png";
import yogaWarrior from "figma:asset/73c8fa1f8f1cb562d0c03bb326337a630987ca29.png";
import yogaTree from "figma:asset/4369a3caf13b066b891dde7b26c001c68275cab6.png";
import yogaDownwardDog from "figma:asset/a2bbbb68c70af0b5b11b4e8a82bf9f684299982d.png";
import yogaLotus from "figma:asset/50c28ff418870993acda34b99204a81349461f04.png";
import yogaHeadstand from "figma:asset/ac664e2327f6068407b74a4855ba4d504acb9f07.png";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";

interface Asana {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  benefits: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  image: string;
}

/* ✅ STATIC DATA — ALL 30 ASANAS (UNCHANGED) */
const ASANAS: Asana[] = [
  {
    id: "1",
    name: "Surya Namaskar",
    sanskritName: "सूर्य नमस्कार",
    difficulty: "Beginner",
    category: "Sequence",
    description:
      "A complete body flow for strength and flexibility. The Sun Salutation is a foundational sequence that energizes the entire body.",
    benefits: [
      "Flexibility",
      "Strength",
      "Mental focus",
      "Cardiovascular health",
      "Detoxification",
    ],
    image: yogaWarrior,
  },
  {
    id: "2",
    name: "Vrikshasana",
    sanskritName: "वृक्षासन",
    difficulty: "Beginner",
    category: "Balance",
    description:
      "Tree Pose improves balance and concentration while strengthening the legs and core.",
    benefits: [
      "Balance",
      "Focus",
      "Leg strength",
      "Grounding",
      "Posture",
    ],
    image: yogaTree,
  },
  {
    id: "3",
    name: "Adho Mukha Svanasana",
    sanskritName: "अधो मुख श्वानासन",
    difficulty: "Beginner",
    category: "Inversion",
    description:
      "Downward Dog energizes the body and stretches the spine. A foundational pose in many yoga practices.",
    benefits: [
      "Back stretch",
      "Arm strength",
      "Hamstring flexibility",
      "Shoulder opening",
      "Mental clarity",
    ],
    image: yogaDownwardDog,
  },
  {
    id: "4",
    name: "Padmasana",
    sanskritName: "पद्मासन",
    difficulty: "Intermediate",
    category: "Seated",
    description:
      "Lotus Pose is ideal for meditation and pranayama practice. Opens the hips deeply.",
    benefits: [
      "Calmness",
      "Posture",
      "Hip flexibility",
      "Meditation support",
      "Circulation",
    ],
    image: yogaLotus,
  },
  {
    id: "5",
    name: "Shirshasana",
    sanskritName: "शीर्षासन",
    difficulty: "Advanced",
    category: "Inversion",
    description:
      "Headstand enhances focus and circulation. Known as the king of asanas.",
    benefits: [
      "Mental clarity",
      "Core strength",
      "Upper body strength",
      "Blood circulation",
      "Hormonal balance",
    ],
    image: yogaHeadstand,
  },
  {
    id: "6",
    name: "Tadasana",
    sanskritName: "ताड़ासन",
    difficulty: "Beginner",
    category: "Standing",
    description:
      "Mountain Pose is the foundation for all standing poses. Improves posture and body awareness.",
    benefits: [
      "Posture",
      "Balance",
      "Body awareness",
      "Grounding",
      "Alignment",
    ],
    image: yogaWarrior,
  },
  {
    id: "7",
    name: "Trikonasana",
    sanskritName: "त्रिकोणासन",
    difficulty: "Beginner",
    category: "Standing",
    description:
      "Triangle Pose stretches the sides of the body and strengthens the legs.",
    benefits: [
      "Side body stretch",
      "Leg strength",
      "Hip opening",
      "Digestion",
      "Balance",
    ],
    image: yogaWarrior,
  },
  {
    id: "8",
    name: "Virabhadrasana I",
    sanskritName: "वीरभद्रासन I",
    difficulty: "Beginner",
    category: "Standing",
    description:
      "Warrior I builds strength and confidence. Opens the chest and shoulders.",
    benefits: [
      "Leg strength",
      "Chest opening",
      "Focus",
      "Confidence",
      "Stamina",
    ],
    image: yogaWarrior,
  },
  {
    id: "9",
    name: "Virabhadrasana II",
    sanskritName: "वीरभद्रासन II",
    difficulty: "Beginner",
    category: "Standing",
    description:
      "Warrior II develops stamina and concentration with a powerful stance.",
    benefits: [
      "Endurance",
      "Concentration",
      "Hip opening",
      "Leg strength",
      "Balance",
    ],
    image: yogaWarrior,
  },
  {
    id: "10",
    name: "Balasana",
    sanskritName: "बालासन",
    difficulty: "Beginner",
    category: "Restorative",
    description:
      "Child's Pose is a gentle resting pose that calms the mind and relieves tension.",
    benefits: [
      "Relaxation",
      "Stress relief",
      "Gentle back stretch",
      "Hip release",
      "Mental calm",
    ],
    image: yogaLotus,
  },
  {
    id: "11",
    name: "Bhujangasana",
    sanskritName: "भुजंगासन",
    difficulty: "Beginner",
    category: "Backbend",
    description:
      "Cobra Pose strengthens the spine and opens the chest. Energizes the body.",
    benefits: [
      "Spine flexibility",
      "Chest opening",
      "Lung capacity",
      "Back strength",
      "Mood elevation",
    ],
    image: yogaDownwardDog,
  },
  {
    id: "12",
    name: "Paschimottanasana",
    sanskritName: "पश्चिमोत्तानासन",
    difficulty: "Intermediate",
    category: "Seated",
    description:
      "Seated Forward Bend calms the mind and stretches the entire back body.",
    benefits: [
      "Hamstring stretch",
      "Spine lengthening",
      "Stress relief",
      "Digestion",
      "Mental calm",
    ],
    image: yogaLotus,
  },
  {
    id: "13",
    name: "Setu Bandhasana",
    sanskritName: "सेतु बन्धासन",
    difficulty: "Beginner",
    category: "Backbend",
    description:
      "Bridge Pose strengthens the back and opens the chest. Energizing and rejuvenating.",
    benefits: [
      "Back strength",
      "Chest opening",
      "Hip flexibility",
      "Thyroid stimulation",
      "Energy boost",
    ],
    image: yogaDownwardDog,
  },
  {
    id: "14",
    name: "Halasana",
    sanskritName: "हलासन",
    difficulty: "Intermediate",
    category: "Inversion",
    description:
      "Plow Pose calms the nervous system and stretches the spine deeply.",
    benefits: [
      "Spine flexibility",
      "Thyroid health",
      "Stress relief",
      "Shoulder stretch",
      "Digestion",
    ],
    image: yogaHeadstand,
  },
  {
    id: "15",
    name: "Sarvangasana",
    sanskritName: "सर्वाङगासन",
    difficulty: "Intermediate",
    category: "Inversion",
    description:
      "Shoulder Stand is the queen of asanas. Benefits the entire body and endocrine system.",
    benefits: [
      "Thyroid regulation",
      "Blood circulation",
      "Leg drainage",
      "Mental clarity",
      "Immune boost",
    ],
    image: yogaHeadstand,
  },
  {
    id: "16",
    name: "Matsyasana",
    sanskritName: "मत्स्यासन",
    difficulty: "Intermediate",
    category: "Backbend",
    description:
      "Fish Pose opens the throat and chest. Counter-pose to Shoulder Stand.",
    benefits: [
      "Throat opening",
      "Chest expansion",
      "Hip flexibility",
      "Respiratory health",
      "Thyroid balance",
    ],
    image: yogaDownwardDog,
  },
  {
    id: "17",
    name: "Ustrasana",
    sanskritName: "उष्ट्रासन",
    difficulty: "Intermediate",
    category: "Backbend",
    description:
      "Camel Pose is a deep backbend that opens the heart and improves posture.",
    benefits: [
      "Heart opening",
      "Posture correction",
      "Hip flexor stretch",
      "Emotional release",
      "Energy boost",
    ],
    image: yogaDownwardDog,
  },
  {
    id: "18",
    name: "Dhanurasana",
    sanskritName: "धनुरासन",
    difficulty: "Intermediate",
    category: "Backbend",
    description:
      "Bow Pose strengthens the back muscles and massages the abdominal organs.",
    benefits: [
      "Back strength",
      "Abdominal massage",
      "Posture",
      "Flexibility",
      "Digestion",
    ],
    image: yogaDownwardDog,
  },
  {
    id: "19",
    name: "Ardha Matsyendrasana",
    sanskritName: "अर्ध मत्स्येन्द्रासन",
    difficulty: "Intermediate",
    category: "Twist",
    description:
      "Half Lord of the Fishes Pose detoxifies the body and improves spinal mobility.",
    benefits: [
      "Spinal twist",
      "Detoxification",
      "Digestion",
      "Liver health",
      "Hip flexibility",
    ],
    image: yogaLotus,
  },
  {
    id: "20",
    name: "Garudasana",
    sanskritName: "गरुड़ासन",
    difficulty: "Intermediate",
    category: "Balance",
    description:
      "Eagle Pose improves focus and balance while opening the shoulders and hips.",
    benefits: [
      "Balance",
      "Concentration",
      "Shoulder mobility",
      "Hip opening",
      "Ankle strength",
    ],
    image: yogaTree,
  },
  {
    id: "21",
    name: "Bakasana",
    sanskritName: "बकासन",
    difficulty: "Advanced",
    category: "Arm Balance",
    description:
      "Crow Pose builds arm strength and mental focus. A foundational arm balance.",
    benefits: [
      "Arm strength",
      "Core power",
      "Concentration",
      "Wrist strength",
      "Confidence",
    ],
    image: yogaHeadstand,
  },
  {
    id: "22",
    name: "Mayurasana",
    sanskritName: "मयूरासन",
    difficulty: "Advanced",
    category: "Arm Balance",
    description:
      "Peacock Pose strengthens the wrists and core. Excellent for digestion.",
    benefits: [
      "Core strength",
      "Wrist power",
      "Detoxification",
      "Digestion",
      "Mental focus",
    ],
    image: yogaHeadstand,
  },
  {
    id: "23",
    name: "Pincha Mayurasana",
    sanskritName: "पिञ्च मयूरासन",
    difficulty: "Advanced",
    category: "Inversion",
    description:
      "Forearm Stand builds upper body strength and improves balance.",
    benefits: [
      "Shoulder strength",
      "Core stability",
      "Balance",
      "Confidence",
      "Circulation",
    ],
    image: yogaHeadstand,
  },
  {
    id: "24",
    name: "Hanumanasana",
    sanskritName: "हनुमानासन",
    difficulty: "Advanced",
    category: "Splits",
    description:
      "Monkey God Pose is a deep hamstring and hip flexor stretch.",
    benefits: [
      "Hamstring flexibility",
      "Hip flexor opening",
      "Patience",
      "Groin stretch",
      "Balance",
    ],
    image: yogaWarrior,
  },
  {
    id: "25",
    name: "Natarajasana",
    sanskritName: "नटराजासन",
    difficulty: "Advanced",
    category: "Balance",
    description:
      "Dancer's Pose combines balance, flexibility, and strength in a graceful pose.",
    benefits: [
      "Balance",
      "Back flexibility",
      "Leg strength",
      "Focus",
      "Grace",
    ],
    image: yogaTree,
  },
  {
    id: "26",
    name: "Chakrasana",
    sanskritName: "चक्रासन",
    difficulty: "Advanced",
    category: "Backbend",
    description:
      "Wheel Pose is a powerful heart-opening backbend that energizes the entire body.",
    benefits: [
      "Full spine extension",
      "Heart opening",
      "Arm strength",
      "Energy boost",
      "Emotional release",
    ],
    image: yogaDownwardDog,
  },
  {
    id: "27",
    name: "Savasana",
    sanskritName: "शवासन",
    difficulty: "Beginner",
    category: "Restorative",
    description:
      "Corpse Pose is the final relaxation pose. Essential for integration and rest.",
    benefits: [
      "Deep relaxation",
      "Stress relief",
      "Integration",
      "Mental peace",
      "Body awareness",
    ],
    image: yogaLotus,
  },
  {
    id: "28",
    name: "Sukhasana",
    sanskritName: "सुखासन",
    difficulty: "Beginner",
    category: "Seated",
    description:
      "Easy Pose is a comfortable seated position for meditation and breathing practices.",
    benefits: [
      "Hip opening",
      "Grounding",
      "Meditation support",
      "Posture",
      "Calmness",
    ],
    image: yogaLotus,
  },
  {
    id: "29",
    name: "Anjaneyasana",
    sanskritName: "अञ्जनेयासन",
    difficulty: "Beginner",
    category: "Lunge",
    description:
      "Low Lunge opens the hip flexors and builds leg strength.",
    benefits: [
      "Hip flexor stretch",
      "Quad opening",
      "Balance",
      "Heart opening",
      "Leg strength",
    ],
    image: yogaWarrior,
  },
  {
    id: "30",
    name: "Uttanasana",
    sanskritName: "उत्तानासन",
    difficulty: "Beginner",
    category: "Forward Fold",
    description:
      "Standing Forward Fold calms the mind and stretches the hamstrings.",
    benefits: [
      "Hamstring stretch",
      "Stress relief",
      "Mental calm",
      "Spine lengthening",
      "Digestion",
    ],
    image: yogaDownwardDog,
  },
];

export function VideosPage() {
  const [filter, setFilter] = useState("All");
  const [selectedAsana, setSelectedAsana] = useState<
    number | null
  >(null);

  const displayAsanas =
    filter === "All"
      ? ASANAS
      : ASANAS.filter((a) => a.difficulty === filter);

  return (
    <div className="relative min-h-screen">
      <MandalaWatermark />

      {/* Hero */}
      <section className="py-20 text-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <img src={shivaLogo} className="mx-auto w-28 mb-6" />
        <h1 className="text-primary mb-4">Asana Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore traditional yoga postures with benefits and
          guidance.
        </p>
      </section>

      {/* Filter */}
      <section className="py-6 text-center">
        {["All", "Beginner", "Intermediate", "Advanced"].map(
          (lvl) => (
            <Button
              key={lvl}
              className="mx-2"
              variant={filter === lvl ? "default" : "outline"}
              onClick={() => setFilter(lvl)}
            >
              {lvl}
            </Button>
          ),
        )}
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {displayAsanas.map((asana, index) => {
            const open = selectedAsana === index;

            return (
              <motion.div key={asana.id}>
                <Card
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedAsana(open ? null : index)
                  }
                >
                  <ImageWithFallback
                    src={asana.image}
                    alt={asana.name}
                    className="h-56 w-full object-cover bg-muted"
                    loading="lazy"
                    decoding="async"
                  />

                  <CardContent className="p-4 space-y-3">
                    <h3 className="text-primary text-center">
                      {asana.name}
                    </h3>
                    <p className="text-sm text-center text-secondary">
                      {asana.sanskritName}
                    </p>

                    <Badge className="mx-auto block w-fit">
                      {asana.difficulty}
                    </Badge>

                    <AnimatePresence>
                      {open && (
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm space-y-2"
                        >
                          {asana.benefits.map((b, i) => (
                            <li key={i} className="flex gap-2">
                              <Heart className="w-4 h-4 text-secondary" />
                              {b}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    <Button className="w-full mt-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      {open ? "Close" : "View Benefits"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}