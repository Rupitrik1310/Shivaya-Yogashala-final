import { MandalaWatermark } from "./MandalaWatermark";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import shivaLogo from "figma:asset/dda3bf9d206010d15993d348fc449c47e604a2d7.png";
import { Target, Eye } from "lucide-react";
import { motion } from "motion/react";

/* ✅ TEACHER IMAGES (LOCAL ASSETS) */
import yogiRahul from "../assets/Teachers/yogi-rahul.jpg";
import yogiVishal from "../assets/Teachers/yogi-vishal.jpg";

interface Teacher {
  id: string;
  name: string;
  photo: string;
  experience: string;
  specialization: string[];
  certifications: string[];
  bio: string;
}

export function AboutPage() {
  const [activePath] = useState("hatha");

  const teachers: Teacher[] = [
    {
      id: "1",
      name: "Yogi Rahul Ji",
      experience: "10+ years",
      photo: yogiRahul,
      bio:
        "Yogi Rahul Ji is a young yoga master with a unique ability to attract learners through his dynamic teaching style. He began his yoga journey at a young age at Ganga Darshan Vishwa Yogapeeth (BSY). His yogic path has been shaped through extensive study and practice under many renowned Gurus from different yoga ashrams and schools across India. Professionally qualified with multiple certifications and yoga courses, he teaches 200-hour, 300-hour, and 500-hour Yoga Teacher Training programs. He strongly encourages students in the practice of Ashtanga Yoga, inspiring them deeply on their yogic journey.",
      specialization: ["Founder", "Ashtanga Yoga", "Pranayama"],
      certifications: [],
    },
    {
      id: "2",
      name: "Yogi Vishal Ji",
      experience: "12+ years",
      photo: yogiVishal,
      bio:
        "Yogi Vishal Ji was born in Haridwar, Uttarakhand (India). He has strong experience in the field of Hatha Yoga. He completed both his Bachelor’s and Master’s degrees in Yoga from Gurukul Kangri Vishwavidyalaya. He started his yoga journey at a very young age, and his classes are known to challenge students, make them sweat, and push them to the next level. As a Yoga Alliance 500-hour certified teacher, his teachings inspire and motivate students to understand yoga education in greater depth.",
      specialization: ["Hatha Yoga", "Strength", "Traditional Practices"],
      certifications: [],
    },
  ];

  return (
    <div className="relative">
      <MandalaWatermark />

      {/* HERO */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
        <motion.img
          src={shivaLogo}
          alt="Shiva Logo"
          className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-6 drop-shadow-2xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        />
        <h1 className="text-primary mb-4">About Shivaya Yogashala</h1>
        <p className="max-w-3xl mx-auto text-muted-foreground">
          A traditional Yoga Teacher Training institute in Rishikesh rooted in Shaivism,
          Himalayan wisdom, and authentic yogic living.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="mission">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="vision">Vision</TabsTrigger>
            </TabsList>

            <TabsContent value="mission">
              <Card>
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-7 h-7 text-primary" />
                    <h3 className="text-primary">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Shivaya Yogashala’s mission is to preserve and transmit the authentic wisdom of classical yoga while nurturing skilled, conscious, and compassionate yoga teachers.
                  </p>
                  <p className="italic text-primary pt-3">तद्योगानुशासनम्</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vision">
              <Card>
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Eye className="w-7 h-7 text-secondary" />
                    <h3 className="text-secondary">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground">
                    To cultivate authentic yoga teachers who carry yogic wisdom with humility, depth, and devotion.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* TEACHERS */}
      <section className="py-20 bg-white">
        <h2 className="text-center text-primary mb-12">Our Experienced Teachers</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          {teachers.map((t) => (
            <Card key={t.id}>
              <div className="flex justify-center pt-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                  <ImageWithFallback
                    src={t.photo}
                    alt={t.name}
                    className={`w-full h-full object-cover ${
                      t.name === "Yogi Rahul Ji"
                        ? "object-[center_20%]"
                        : "object-center"
                    }`}
                  />
                </div>
              </div>

              <CardContent className="p-6 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {t.specialization.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>

                <h3>{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}