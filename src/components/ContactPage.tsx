import { MandalaWatermark } from "./MandalaWatermark";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState, useEffect } from "react";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import shivaLogo from "figma:asset/dda3bf9d206010d15993d348fc449c47e604a2d7.png";
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
        },
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();
      if (data.success && data.courses) {
        setCourses(data.courses);
      } else {
        // Use fallback courses if API doesn't return expected format
        setCourses(getFallbackCourses());
      }
    } catch (error) {
      console.log(
        "Using fallback courses data (backend unavailable)",
      );
      // Use fallback courses on error
      setCourses(getFallbackCourses());
    }
  };

  const getFallbackCourses = () => {
    return [
      { id: "1", title: "Yoga Retreat in Rishikesh, India" },
      {
        id: "2",
        title: "200 Hour Multi-style Yoga Teacher Training",
      },
      {
        id: "3",
        title: "300 Hour Multi-style Yoga Teacher Training",
      },
      {
        id: "4",
        title: "500 Hour Multi-style Yoga Teacher Training",
      },
    ];
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        if (
          !formData.name ||
          !formData.email ||
          !formData.phone
        ) {
          toast("Please fill in all required fields");
          return false;
        }
        if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
          toast("Please enter a valid email address");
          return false;
        }
        return true;
      case 2:
        if (!formData.country || !formData.experience) {
          toast("Please complete all fields");
          return false;
        }
        return true;
      case 3:
        if (!formData.courseId) {
          toast("Please select a course");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setSubmitting(true);
    let emailSent = false;
    let backendSaved = false;

    try {
      // Get selected course title
      const selectedCourse = displayCourses.find(
        (c) => c.id === formData.courseId,
      );
      const courseTitle =
        selectedCourse?.title || "Course not specified";

      // Send email notification using EmailJS
      try {
        await sendEmailNotification(formData, courseTitle);
        emailSent = true;
        console.log("✅ Email notification process completed");
      } catch (emailError) {
        console.error(
          "⚠️ Email notification failed, but continuing with enrollment:",
          emailError,
        );
        // Continue with database save even if email fails
      }

      // Save to database (with fallback)
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ae7dad4f/enrollment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(formData),
          },
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}`,
          );
        }

        const data = await response.json();

        if (data.success) {
          backendSaved = true;
          console.log("✅ Enrollment saved to database");
        } else {
          console.log("⚠️ Backend returned error:", data.error);
        }
      } catch (backendError) {
        console.log(
          "⚠️ Backend unavailable, enrollment saved locally only:",
          backendError,
        );
        // Continue without backend - email is the primary notification method
      }

      // Mark as submitted regardless of backend status
      setSubmitted(true);

      // Show appropriate success message
      if (emailSent && backendSaved) {
        toast(
          "Application submitted successfully! Email notification sent and data saved.",
        );
      } else if (emailSent) {
        toast(
          "Application submitted! Email notification sent. (Backend database unavailable but your application was received via email)",
        );
      } else if (backendSaved) {
        toast(
          "Application submitted and saved! (Email notification may have failed - we'll contact you soon)",
        );
      } else {
        toast(
          "Application received! Please also contact us via WhatsApp to confirm your enrollment.",
        );
      }
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      toast(
        "Please contact us directly via WhatsApp or email to complete your enrollment.",
      );
      // Still allow submission via WhatsApp as fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const sendEmailNotification = async (
    data: typeof formData,
    courseTitle: string,
  ) => {
    try {
      // ⚠️ IMPORTANT: Replace these with your actual EmailJS credentials
      // See QUICK_EMAIL_SETUP.md for step-by-step instructions (takes 5 minutes)
      // Get your credentials from: https://dashboard.emailjs.com/

      const serviceId = "service_7540czn"; // Replace with YOUR Service ID from EmailJS
      const templateId = "template_oum21q7"; // Replace with YOUR Template ID from EmailJS
      const publicKey = "KEHHKmbHIPRKjPpLm"; // Replace with YOUR Public Key from EmailJS

      const templateParams = {
        to_email: "shivayayogashala09@gmail.com",
        student_name: data.name,
        student_email: data.email,
        student_phone: data.phone,
        student_country: data.country,
        student_experience: data.experience,
        course_title: courseTitle,
        student_message: data.message || "No message provided",
        submission_date: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "short",
        }),
      };

      // EmailJS send function
      const emailJsUrl = `https://api.emailjs.com/api/v1.0/email/send`;

      const emailResponse = await fetch(emailJsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: templateParams,
        }),
      });

      const emailResult = await emailResponse.text();

      if (emailResponse.ok) {
        console.log(
          "✅ Email notification sent successfully",
          emailResult,
        );
      } else {
        console.error(
          "❌ Email sending failed:",
          emailResponse.status,
          emailResult,
        );
        throw new Error(`EmailJS error: ${emailResult}`);
      }
    } catch (error) {
      console.error("Error sending email notification:", error);
      // Don't fail the enrollment if email fails
    }
  };

  const handleWhatsApp = () => {
    const selectedCourse = courses.find(
      (c) => c.id === formData.courseId,
    );
    const message = `Namaste!\n\nI'm interested in joining Shivaya Yogashala.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.country}\nYoga Experience: ${formData.experience}\nInterested Course: ${selectedCourse?.title || "Not specified"}\n\nMessage: ${formData.message}\n\nॐ नमः शिवाय (Om Namah Shivaya)`;

    const whatsappUrl = `https://wa.me/919288663019?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 relative">
        <MandalaWatermark />
        <Card className="max-w-2xl mx-4 relative z-10">
          <CardContent className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-primary">
              Application Submitted Successfully!
            </h2>
            <p className="text-muted-foreground">
              Thank you for your interest in Shivaya Yogashala.
              We have received your application and will contact
              you within 24-48 hours via email or WhatsApp.
            </p>
            <div className="space-y-3 pt-4 border-t border-primary/20 mt-6">
              <p className="text-lg text-secondary">
                ॐ नमः शिवाय
              </p>
              <p className="text-sm text-muted-foreground italic">
                Om Namaḥ Śivāya
              </p>
              <p className="text-xs text-muted-foreground">
                May Lord Shiva bless your yoga journey
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
              <Button
                variant="default"
                className="bg-primary"
                onClick={() => window.location.reload()}
              >
                Submit Another Application
              </Button>
              <Button
                variant="outline"
                onClick={handleWhatsApp}
                className="flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayCourses =
    courses.length > 0 ? courses : getFallbackCourses();

  return (
    <div className="relative min-h-screen">
      <MandalaWatermark />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
          >
            <img
              src={shivaLogo}
              alt="Shiva Logo"
              className="w-32 h-32 object-contain drop-shadow-2xl"
            />
          </motion.div>
          <motion.h1
            className="text-primary mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Apply Now
          </motion.h1>
          <motion.p
            className="text-lg max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Begin your transformative yoga journey with us. Fill
            out the application form or reach out directly via
            WhatsApp or email. We are located in Rishikesh.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Multi-Step Form */}
            <div>
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">
                    Enrollment Application
                  </CardTitle>
                  <div className="flex gap-2 mt-4">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className={`h-2 flex-1 rounded-full transition-all ${
                          s <= step
                            ? "bg-primary"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Step {step} of 4
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3>Personal Information</h3>
                      <div>
                        <Label htmlFor="name">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange(
                              "name",
                              e.target.value,
                            )
                          }
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange(
                              "email",
                              e.target.value,
                            )
                          }
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange(
                              "phone",
                              e.target.value,
                            )
                          }
                          placeholder="+91 92886 63019"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Background */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3>Background Information</h3>
                      <div>
                        <Label htmlFor="country">
                          Country *
                        </Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange(
                              "country",
                              e.target.value,
                            )
                          }
                          placeholder="Your country"
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">
                          Yoga Experience *
                        </Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) =>
                            handleInputChange(
                              "experience",
                              value,
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Complete Beginner">
                              Complete Beginner (0-6 months)
                            </SelectItem>
                            <SelectItem value="Beginner">
                              Beginner (6 months - 1 year)
                            </SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate (1-3 years)
                            </SelectItem>
                            <SelectItem value="Advanced">
                              Advanced (3+ years)
                            </SelectItem>
                            <SelectItem value="Teacher">
                              Certified Teacher
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Course Selection */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3>Course Selection</h3>
                      <div>
                        <Label htmlFor="course">
                          Select Course *
                        </Label>
                        <Select
                          value={formData.courseId}
                          onValueChange={(value) =>
                            handleInputChange("courseId", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your desired course" />
                          </SelectTrigger>
                          <SelectContent>
                            {displayCourses.map((course) => (
                              <SelectItem
                                key={course.id}
                                value={course.id}
                              >
                                {course.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Additional Info */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <h3>Additional Information</h3>
                      <div>
                        <Label htmlFor="message">
                          Message (Optional)
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange(
                              "message",
                              e.target.value,
                            )
                          }
                          placeholder="Tell us about your goals, health conditions, or any questions..."
                          rows={6}
                        />
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg text-sm">
                        <p className="mb-2">
                          <strong>
                            Review Your Application:
                          </strong>
                        </p>
                        <p className="text-muted-foreground">
                          Name: {formData.name}
                        </p>
                        <p className="text-muted-foreground">
                          Email: {formData.email}
                        </p>
                        <p className="text-muted-foreground">
                          Experience: {formData.experience}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 pt-4">
                    {step > 1 && (
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1"
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Back
                      </Button>
                    )}
                    {step < 4 ? (
                      <Button
                        onClick={handleNext}
                        className="flex-1 bg-primary"
                      >
                        Next
                        <ArrowRight
                          size={16}
                          className="ml-2"
                        />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex-1 bg-secondary"
                      >
                        {submitting
                          ? "Submitting..."
                          : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-2 border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-secondary">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        Upper Tapovan, Rishikesh
                        <br />
                        Uttarakhand 249192
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        +91 92886 63019
                      </p>
                      <p className="text-xs text-muted-foreground">
                        WhatsApp Available 24/7
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:shivayayogashala09@gmail.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        shivayayogashala09@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-primary mb-2">
                      Quick Contact via WhatsApp
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get instant response to your queries
                    </p>
                    <Button
                      onClick={handleWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle
                        size={18}
                        className="mr-2"
                      />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <h4 className="text-primary">
                    Why Choose Us?
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>
                        Yoga Alliance Certified Programs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>
                        Experienced Teachers (10+ years)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>
                        Authentic Traditional Training
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Healthy Evironment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Beautiful Rishikesh Location</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-primary mb-4">
              Visit Our Ashram
            </h2>
            <p className="text-muted-foreground">
              Located in the spiritual heart of Rishikesh
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3333.8815726891194!2d78.32066669999999!3d30.131333299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA3JzUyLjgiTiA3OMKwMTknMTQuNCJF!5e1!3m2!1sen!2sin!4v1769847784573!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}