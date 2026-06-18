import { useState } from "react";
import { motion } from "framer-motion";

import { MandalaWatermark } from "./MandalaWatermark";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import shivaLogo from "../assets/shivaya-yoga-logo.webp";
import yogiRahul from "../assets/Teachers/yogi-rahul.webp";
import yogiVishal from "../assets/Teachers/yogi-vishal.webp";

import {
  Heart,
  Users,
  Mountain,
  Flower2,
  BookOpen,
  Sun,
  Flame
} from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  photo: string;
  experience: string;
  specialization: string[];
  certifications: string[]; // kept for future use
  bio: string;
}

function AboutPage() {

  const teachers: Teacher[] = [
    {
      id: "1",
      name: "Yogi Rahul Ji",
      experience: "10+ years",
      photo: yogiRahul,
      bio:
        "Yogi Rahul Ji is a young yoga master with a unique ability to attract learners through his dynamic teaching style. He began his yoga journey at a young age at Ganga Darshan Vishwa Yogapeeth (BSY), Bihar. His yogic path has been shaped through extensive study and practice under many renowned Gurus from different yoga ashrams and schools across India. Professionally qualified with multiple certifications and yoga courses, he teaches 200-hour, 300-hour, and 500-hour Yoga Teacher Training programs. He strongly encourages students in the practice of Ashtanga Yoga, inspiring them deeply on their yogic journey.",
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
        <p className="max-w-3xl mx-auto text-muted-foreground px-4 text-lg leading-relaxed">
          A traditional Yoga Teacher Training institute in Rishikesh rooted in Shaivism,
          Himalayan wisdom, and authentic yogic living.
        </p>
        <div className="mt-8 max-w-4xl mx-auto px-4">
          <p className="text-muted-foreground leading-relaxed">
            Nestled in the sacred foothills of the Himalayas in Upper Tapovan, Rishikesh—the world's Yoga Capital—Shivaya Yogashala is more than just a yoga school; it is a sanctuary for spiritual transformation and authentic yogic education. Founded on the principles of classical yoga and the divine energy of Lord Shiva, we offer profound immersion into the ancient science of yoga through Yoga Alliance certified teacher training programs.
          </p>
        </div>
      </section>

      {/* OUR HERITAGE & LOCATION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Mountain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-primary mb-4">Our Sacred Heritage</h2>
              <div className="w-24 h-1 bg-secondary mx-auto" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-primary">Why Rishikesh - the Yoga Capital</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rishikesh is known as the “Yoga Capital of the World” because it has been a center of yoga, meditation, and spiritual learning for thousands of years. Located on the banks of the sacred Ganga River in the foothills of the Himalayas, Rishikesh offers a peaceful environment that supports inner growth and self-discovery.
                </p>

                <h4 className="text-primary mt-4">Why Rishikesh Became the Yoga Capital</h4>
                <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                  <li>Ancient sages and yogis practiced meditation here for centuries.</li>
                  <li>The calm atmosphere, fresh mountain air, and spiritual energy make it ideal for yoga practice.</li>
                  <li>Hundreds of yoga schools and teacher training programs attract students from all over the world.</li>
                  <li>Traditional teachings of Hatha Yoga, Ashtanga Yoga, Pranayama, Meditation, and Yoga Philosophy are still preserved.</li>
                  <li>The city’s spiritual culture encourages a yogic lifestyle based on simplicity, discipline, and self-awareness.</li>
                </ul>

                <p className="text-muted-foreground leading-relaxed">
                  People do not come to Rishikesh only to learn yoga postures. They come to experience a way of life. The sound of the flowing Ganga, the presence of ancient temples and ashrams, daily meditation, and the spiritual atmosphere help students connect with themselves beyond the physical practice of yoga.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Upper Tapovan, where our yogashala resides, offers a serene retreat away from the bustling town center while remaining easily accessible. Surrounded by lush greenery and panoramic mountain views, our location provides the ideal atmosphere for introspective study and spiritual growth.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-secondary">In the Footsteps of Adiyogi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lord Shiva is revered as Adiyogi, the First Yogi, who shared the science of yoga with humanity. It is believed that on the banks of a Himalayan lake, Shiva transmitted the wisdom of yoga to the seven sages (Saptarishis), who carried these teachings across the world. Yoga is therefore not just a physical practice but a path of self-transformation inspired by Shiva’s qualities of stillness, awareness, balance, and inner freedom.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Rishikesh, nestled in the Himalayan foothills and blessed by the sacred Ganga, reflects this spirit of Adiyogi. Many seekers come here to deepen their practice, seeking the same inner peace and higher consciousness that Lord Shiva symbolizes. Through asana, pranayama, meditation, and self-discipline, yoga guides practitioners toward harmony between body, mind, and soul, following the timeless wisdom associated with Lord Shiva. 
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-primary text-2xl font-serif">ॐ नमः शिवाय</p>
            <p className="text-sm text-muted-foreground mt-2">Om Namah Shivaya - Salutations to Lord Shiva</p>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 via-white to-primary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Flower2 className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h2 className="text-primary mb-4">Our Teaching Methodology</h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-4" />
              <p className="text-muted-foreground max-w-3xl mx-auto">
                At Shivaya Yogashala, we follow a comprehensive and traditional approach that balances ancient wisdom with modern teaching techniques
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-primary">Classical Curriculum</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our syllabus strictly adheres to Yoga Alliance standards while integrating traditional teachings from Patanjali's Yoga Sutras, Hatha Yoga Pradipika, Bhagavad Gita, and Upanishads. Students receive comprehensive training in Hatha Yoga, Ashtanga Vinyasa, alignment principles, adjustments, and teaching methodology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="text-primary">Holistic Development</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Beyond asanas, we emphasize pranayama (breath control), meditation, yogic philosophy, anatomy, Ayurveda, and yogic lifestyle. Daily sattvic vegetarian meals, karma yoga sessions, and participation in traditional ceremonies foster complete transformation of body, mind, and spirit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-primary">Personal Attention</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We maintain small batch sizes to ensure personalized guidance from our experienced teachers. Each student receives individual attention, alignment corrections, and mentorship throughout their journey. Our intimate sangha (community) creates lasting bonds and mutual support among fellow practitioners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ASHRAM LIFE & FACILITIES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sun className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h2 className="text-primary mb-4">Ashram Life & Facilities</h2>
              <div className="w-24 h-1 bg-secondary mx-auto" />
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-primary">Authentic Yogic Living</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Life at Shivaya Yogashala follows traditional ashram discipline with space for focused study, self-practice, rest, and reflection. The environment is designed to cultivate clarity, steadiness, and full immersion in the yogic path.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-primary">Facilities & Amenities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our yogashala provides a comfortable and conducive environment for learning and transformation. All facilities are designed with simplicity and cleanliness in mind, reflecting the yogic principles of sattvic living.
                </p>
                <div className="grid md:grid-cols-2 gap-4 pt-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="text-sm"><strong>Spacious Yoga Halls:</strong> Well-ventilated shala with mountain views and natural lighting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="text-sm"><strong>Comfortable Accommodation:</strong> Clean, shared and private rooms with attached bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="text-sm"><strong>Sattvic Dining:</strong> Nutritious vegetarian meals prepared with love and mindfulness</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="text-sm"><strong>Library & Study Area:</strong> Collection of yogic texts and quiet space for contemplation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="text-sm"><strong>Wi-Fi Access:</strong> Stay connected with loved ones during your transformative journey</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="text-sm"><strong>Meditation Spaces:</strong> Peaceful corners for silent practice and inner reflection</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Flame className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-primary mb-4">Our Core Values</h2>
              <div className="w-24 h-1 bg-secondary mx-auto" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center border-primary/20">
              <CardContent className="p-6 space-y-3">
                <div className="text-4xl font-serif text-primary mb-2">ॐ</div>
                <h4 className="text-primary">Authenticity</h4>
                <p className="text-sm text-muted-foreground">
                  We preserve the traditional lineage and authentic teachings of classical yoga without dilution
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardContent className="p-6 space-y-3">
                <div className="text-4xl font-serif text-secondary mb-2">🕉</div>
                <h4 className="text-primary">Integrity</h4>
                <p className="text-sm text-muted-foreground">
                  Our teachers embody the yogic principles they teach, living examples of sattvic lifestyle
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardContent className="p-6 space-y-3">
                <div className="text-4xl font-serif text-primary mb-2">☸</div>
                <h4 className="text-primary">Compassion</h4>
                <p className="text-sm text-muted-foreground">
                  We nurture each student with patience, understanding, and unconditional support
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardContent className="p-6 space-y-3">
                <div className="text-4xl font-serif text-secondary mb-2">⚛</div>
                <h4 className="text-primary">Excellence</h4>
                <p className="text-sm text-muted-foreground">
                  We maintain the highest standards in yogic education and teacher training certification
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-primary/20">
            <p className="text-secondary italic text-xl">योगश्चित्तवृत्तिनिरोधः</p>
            <p className="text-sm text-muted-foreground mt-2">Yogaś Citta-Vṛtti-Nirodhaḥ</p>
            <p className="text-xs text-muted-foreground">Yoga is the cessation of the fluctuations of the mind - Patanjali Yoga Sutra 1.2</p>
          </div>
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
                    className="w-full h-full object-cover"
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

export default AboutPage;
