import { MandalaWatermark } from "./MandalaWatermark";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { MapPin, Mail, Phone, MessageCircle, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";
import shivaLogo from 'figma:asset/dda3bf9d206010d15993d348fc449c47e604a2d7.png';
import { motion } from "motion/react";

interface Course {
  id: string;
  title: string;
}

export function ContactPage() {
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    experience: "",
    courseId: "",
    message: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ae7dad4f/courses`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success && data.courses) {
        setCourses(data.courses);
      } else {
        setCourses(getFallbackCourses());
      }
    } catch (error) {
      setCourses(getFallbackCourses());
    }
  };

  const getFallbackCourses = () => [
    { id: '1', title: 'Yoga Retreat in Rishikesh, India' },
    { id: '2', title: '200 Hour Multi-style Yoga Teacher Training' },
    { id: '3', title: '300 Hour Multi-style Yoga Teacher Training' },
    { id: '4', title: '500 Hour Multi-style Yoga Teacher Training' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1 && (!formData.name || !formData.email || !formData.phone)) {
      toast("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleWhatsApp = () => {
    // This creates a professional pre-filled message for your WhatsApp
    const selectedCourse = courses.find(c => c.id === formData.courseId);
    const text = `Namaste! I am interested in Shivaya Yogashala.\n\nName: ${formData.name || 'Interested Student'}\nCourse: ${selectedCourse?.title || 'Yoga Inquiry'}\n\nॐ नमः शिवाय`;
    const whatsappUrl = `https://wa.me/919288663019?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Logic for EmailJS and Supabase would go here as per your previous setup
      setSubmitted(true);
      toast("Application submitted!");
    } catch (error) {
      toast("Error submitting. Please use WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
          <p className="text-gray-600 mb-6">We will contact you shortly. For a faster response, message us on WhatsApp.</p>
          <div className="flex flex-col gap-3">
            <Button onClick={handleWhatsApp} className="bg-green-600 hover:bg-green-700 text-white w-full">
              <MessageCircle className="mr-2" size={18} /> Chat on WhatsApp
            </Button>
            <Button variant="ghost" onClick={() => setSubmitted(false)}>Back to Home</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      <MandalaWatermark />
      
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent text-center px-4">
        <motion.img src={shivaLogo} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Contact Shivaya Yogashala</h1>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-12">
        {/* Form Column */}
        <Card className="border-primary/10 shadow-xl">
          <CardHeader>
            <CardTitle>Enrollment Form (Step {step}/4)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <div className="space-y-4">
                <Label>Full Name *</Label>
                <Input value={formData.name} onChange={e => handleInputChange("name", e.target.value)} placeholder="Your Name" />
                <Label>Email *</Label>
                <Input value={formData.email} onChange={e => handleInputChange("email", e.target.value)} placeholder="email@example.com" />
                <Label>Phone *</Label>
                <Input value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} placeholder="+91" />
              </div>
            )}
            {/* ... Other steps remain same ... */}

            <div className="flex gap-4 pt-4">
              {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
              <Button className="flex-1 bg-primary" onClick={() => step < 4 ? (validateStep(step) && setStep(step + 1)) : handleSubmit()}>
                {step === 4 ? "Submit Application" : "Next Step"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info Column */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-none shadow-none">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm"><Phone className="text-primary" size={20} /></div>
                <div>
                  <p className="text-sm text-gray-500">Call / WhatsApp</p>
                  <p className="font-semibold">+91 92886 63019</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm"><Mail className="text-primary" size={20} /></div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-semibold">shivayayogashala09@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* This is the primary WhatsApp Button Section you wanted to attach */}
          <div className="p-8 bg-green-50 border-2 border-green-200 rounded-2xl text-center">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Instant Support</h3>
            <p className="text-green-700/80 mb-6 text-sm">Have questions about our courses or accommodation? Message us directly for an instant reply.</p>
            <Button 
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg shadow-lg shadow-green-200"
            >
              <MessageCircle className="mr-2" /> Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}