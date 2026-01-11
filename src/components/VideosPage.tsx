import { MandalaWatermark } from "./MandalaWatermark";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import shivaLogo from "../assets/dda3bf9d206010d15993d348fc449c47e604a2d7.png";
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

/* ✅ STATIC DATA — ALL 30 ASANAS (UNCHANGED, ONLY IMAGE PATHS FIXED) */
const ASANAS: Asana[] = [
  {
    id: "1",
    name: "Surya Namaskar",
    sanskritName: "सूर्य नमस्कार",
    difficulty: "Beginner",
    category: "Sequence",
    description:
      "A complete body flow for strength and flexibility.",
    benefits: ["Flexibility", "Strength", "Mental focus"],
    image: "/asanas/beginner/surya-namaskar.jpg",
  },
  {
    id: "2",
    name: "Vrikshasana",
    sanskritName: "वृक्षासन",
    difficulty: "Beginner",
    category: "Balance",
    description: "Tree Pose improves balance.",
    benefits: ["Balance", "Focus"],
    image: "/asanas/beginner/vrikshasana.jpg",
  },
  {
    id: "3",
    name: "Adho Mukha Svanasana",
    sanskritName: "अधो मुख श्वानासन",
    difficulty: "Beginner",
    category: "Inversion",
    description: "Downward Dog stretches the spine.",
    benefits: ["Back stretch", "Energy"],
    image: "/asanas/beginner/adho-mukha-svanasana.jpg",
  },
  {
    id: "4",
    name: "Padmasana",
    sanskritName: "पद्मासन",
    difficulty: "Intermediate",
    category: "Seated",
    description: "Lotus Pose for meditation.",
    benefits: ["Calmness", "Posture"],
    image: "/asanas/intermediate/padmasana.jpg",
  },
  {
    id: "5",
    name: "Shirshasana",
    sanskritName: "शीर्षासन",
    difficulty: "Advanced",
    category: "Inversion",
    description: "King of all asanas.",
    benefits: ["Mental clarity", "Strength"],
    image: "/asanas/advanced/shirshasana.jpg",
  },
  {
    id: "6",
    name: "Tadasana",
    sanskritName: "ताड़ासन",
    difficulty: "Beginner",
    category: "Standing",
    description: "Mountain Pose alignment.",
    benefits: ["Posture", "Balance"],
    image: "/asanas/beginner/tadasana.jpg",
  },
  {
    id: "7",
    name: "Trikonasana",
    sanskritName: "त्रिकोणासन",
    difficulty: "Beginner",
    category: "Standing",
    description: "Triangle Pose stretch.",
    benefits: ["Flexibility", "Digestion"],
    image: "/asanas/beginner/trikonasana.jpg",
  },
  {
    id: "8",
    name: "Virabhadrasana I",
    sanskritName: "वीरभद्रासन I",
    difficulty: "Beginner",
    category: "Standing",
    description: "Warrior I strength.",
    benefits: ["Stamina", "Focus"],
    image: "/asanas/beginner/virabhadrasana-1.jpg",
  },
  {
    id: "9",
    name: "Virabhadrasana II",
    sanskritName: "वीरभद्रासन II",
    difficulty: "Beginner",
    category: "Standing",
    description: "Warrior II endurance.",
    benefits: ["Endurance", "Balance"],
    image: "/asanas/beginner/virabhadrasana-2.jpg",
  },
  {
    id: "10",
    name: "Balasana",
    sanskritName: "बालासन",
    difficulty: "Beginner",
    category: "Restorative",
    description: "Child’s Pose relaxation.",
    benefits: ["Relaxation", "Calm"],
    image: "/asanas/beginner/balasana.jpg",
  },
  {
    id: "11",
    name: "Bhujangasana",
    sanskritName: "भुजंगासन",
    difficulty: "Beginner",
    category: "Backbend",
    description: "Cobra Pose spine opener.",
    benefits: ["Back strength"],
    image: "/asanas/beginner/bhujangasana.jpg",
  },
  {
    id: "12",
    name: "Paschimottanasana",
    sanskritName: "पश्चिमोत्तानासन",
    difficulty: "Intermediate",
    category: "Seated",
    description: "Seated forward bend.",
    benefits: ["Stretch", "Calm"],
    image: "/asanas/intermediate/paschimottanasana.jpg",
  },
  {
    id: "13",
    name: "Setu Bandhasana",
    sanskritName: "सेतु बन्धासन",
    difficulty: "Beginner",
    category: "Backbend",
    description: "Bridge Pose energizing.",
    benefits: ["Strength", "Energy"],
    image: "/asanas/beginner/setu-bandhasana.jpg",
  },
  {
    id: "14",
    name: "Halasana",
    sanskritName: "हलासन",
    difficulty: "Intermediate",
    category: "Inversion",
    description: "Plow Pose calm.",
    benefits: ["Flexibility"],
    image: "/asanas/intermediate/halasana.jpg",
  },
  {
    id: "15",
    name: "Sarvangasana",
    sanskritName: "सर्वाङगासन",
    difficulty: "Intermediate",
    category: "Inversion",
    description: "Shoulder Stand.",
    benefits: ["Circulation"],
    image: "/asanas/intermediate/sarvangasana.jpg",
  },
  {
    id: "16",
    name: "Matsyasana",
    sanskritName: "मत्स्यासन",
    difficulty: "Intermediate",
    category: "Backbend",
    description: "Fish Pose opener.",
    benefits: ["Breathing"],
    image: "/asanas/intermediate/matsyasana.jpg",
  },
  {
    id: "17",
    name: "Ustrasana",
    sanskritName: "उष्ट्रासन",
    difficulty: "Intermediate",
    category: "Backbend",
    description: "Camel Pose heart opening.",
    benefits: ["Energy"],
    image: "/asanas/intermediate/ustrasana.jpg",
  },
  {
    id: "18",
    name: "Dhanurasana",
    sanskritName: "धनुरासन",
    difficulty: "Intermediate",
    category: "Backbend",
    description: "Bow Pose strength.",
    benefits: ["Flexibility"],
    image: "/asanas/intermediate/dhanurasana.jpg",
  },
  {
    id: "19",
    name: "Ardha Matsyendrasana",
    sanskritName: "अर्ध मत्स्येन्द्रासन",
    difficulty: "Intermediate",
    category: "Twist",
    description: "Spinal twist detox.",
    benefits: ["Digestion"],
    image: "/asanas/intermediate/ardha-matsyendrasana.jpg",
  },
  {
    id: "20",
    name: "Garudasana",
    sanskritName: "गरुड़ासन",
    difficulty: "Intermediate",
    category: "Balance",
    description: "Eagle Pose focus.",
    benefits: ["Balance"],
    image: "/asanas/intermediate/garudasana.jpg",
  },
  {
    id: "21",
    name: "Bakasana",
    sanskritName: "बकासन",
    difficulty: "Advanced",
    category: "Arm Balance",
    description: "Crow Pose.",
    benefits: ["Arm strength"],
    image: "/asanas/advanced/bakasana.jpg",
  },
  {
    id: "22",
    name: "Mayurasana",
    sanskritName: "मयूरासन",
    difficulty: "Advanced",
    category: "Arm Balance",
    description: "Peacock Pose.",
    benefits: ["Core strength"],
    image: "/asanas/advanced/mayurasana.jpg",
  },
  {
    id: "23",
    name: "Pincha Mayurasana",
    sanskritName: "पिञ्च मयूरासन",
    difficulty: "Advanced",
    category: "Inversion",
    description: "Forearm Stand.",
    benefits: ["Balance"],
    image: "/asanas/advanced/pincha-mayurasana.jpg",
  },
  {
    id: "24",
    name: "Hanumanasana",
    sanskritName: "हनुमानासन",
    difficulty: "Advanced",
    category: "Splits",
    description: "Full split.",
    benefits: ["Flexibility"],
    image: "/asanas/advanced/hanumanasana.jpg",
  },
  {
    id: "25",
    name: "Natarajasana",
    sanskritName: "नटराजासन",
    difficulty: "Advanced",
    category: "Balance",
    description: "Dancer Pose.",
    benefits: ["Grace"],
    image: "/asanas/advanced/natarajasana.jpg",
  },
  {
    id: "26",
    name: "Chakrasana",
    sanskritName: "चक्रासन",
    difficulty: "Advanced",
    category: "Backbend",
    description: "Wheel Pose.",
    benefits: ["Energy"],
    image: "/asanas/advanced/chakrasana.jpg",
  },
  {
    id: "27",
    name: "Savasana",
    sanskritName: "शवासन",
    difficulty: "Beginner",
    category: "Restorative",
    description: "Final relaxation.",
    benefits: ["Relaxation"],
    image: "/asanas/beginner/savasana.jpg",
  },
  {
    id: "28",
    name: "Sukhasana",
    sanskritName: "सुखासन",
    difficulty: "Beginner",
    category: "Seated",
    description: "Easy Pose.",
    benefits: ["Calm"],
    image: "/asanas/beginner/sukhasana.jpg",
  },
  {
    id: "29",
    name: "Anjaneyasana",
    sanskritName: "अञ्जनेयासन",
    difficulty: "Beginner",
    category: "Lunge",
    description: "Low Lunge.",
    benefits: ["Strength"],
    image: "/asanas/beginner/anjaneyasana.jpg",
  },
  {
    id: "30",
    name: "Uttanasana",
    sanskritName: "उत्तानासन",
    difficulty: "Beginner",
    category: "Forward Fold",
    description: "Standing forward fold.",
    benefits: ["Relaxation"],
    image: "/asanas/beginner/uttanasana.jpg",
  },
];

export function VideosPage() {
  const [filter, setFilter] = useState("All");
  const [selectedAsana, setSelectedAsana] = useState<number | null>(null);

  const displayAsanas =
    filter === "All"
      ? ASANAS
      : ASANAS.filter((a) => a.difficulty === filter);

  return (
    <div className="relative min-h-screen">
      <MandalaWatermark />

      <section className="py-20 text-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <img src={shivaLogo} className="mx-auto w-28 mb-6" />
        <h1 className="text-primary mb-4">Asana Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore traditional yoga postures with benefits and guidance.
        </p>
      </section>

      <section className="py-6 text-center">
        {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
          <Button
            key={lvl}
            className="mx-2"
            variant={filter === lvl ? "default" : "outline"}
            onClick={() => setFilter(lvl)}
          >
            {lvl}
          </Button>
        ))}
      </section>

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
                    className="h-56 w-full object-cover"
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
                        <motion.ul className="text-sm space-y-2">
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