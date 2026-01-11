import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.ts";

// Shivaya Yogashala API Server
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ae7dad4f/health", (c) => {
  return c.json({ status: "ok" });
});

// ========== TEACHER MANAGEMENT ==========

// Get all teachers
app.get("/make-server-ae7dad4f/teachers", async (c) => {
  try {
    const teachers = await kv.getByPrefix("teacher:");
    return c.json({ success: true, teachers });
  } catch (error) {
    console.log("Error fetching teachers:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single teacher
app.get("/make-server-ae7dad4f/teachers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const teacher = await kv.get(`teacher:${id}`);
    if (!teacher) {
      return c.json({ success: false, error: "Teacher not found" }, 404);
    }
    return c.json({ success: true, teacher });
  } catch (error) {
    console.log("Error fetching teacher:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create teacher
app.post("/make-server-ae7dad4f/teachers", async (c) => {
  try {
    const data = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const teacher = {
      id,
      name: data.name,
      photo: data.photo,
      experience: data.experience,
      specialization: data.specialization,
      certifications: data.certifications,
      bio: data.bio,
      socialLinks: data.socialLinks || {},
      createdAt: new Date().toISOString(),
    };
    await kv.set(`teacher:${id}`, teacher);
    return c.json({ success: true, teacher });
  } catch (error) {
    console.log("Error creating teacher:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update teacher
app.put("/make-server-ae7dad4f/teachers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const existing = await kv.get(`teacher:${id}`);
    if (!existing) {
      return c.json({ success: false, error: "Teacher not found" }, 404);
    }
    const teacher = { ...existing, ...data, updatedAt: new Date().toISOString() };
    await kv.set(`teacher:${id}`, teacher);
    return c.json({ success: true, teacher });
  } catch (error) {
    console.log("Error updating teacher:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete teacher
app.delete("/make-server-ae7dad4f/teachers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`teacher:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting teacher:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== COURSE MANAGEMENT ==========

// Get all courses
app.get("/make-server-ae7dad4f/courses", async (c) => {
  try {
    const courses = await kv.getByPrefix("course:");
    return c.json({ success: true, courses });
  } catch (error) {
    console.log("Error fetching courses:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single course
app.get("/make-server-ae7dad4f/courses/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const course = await kv.get(`course:${id}`);
    if (!course) {
      return c.json({ success: false, error: "Course not found" }, 404);
    }
    return c.json({ success: true, course });
  } catch (error) {
    console.log("Error fetching course:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create course
app.post("/make-server-ae7dad4f/courses", async (c) => {
  try {
    const data = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const course = {
      id,
      title: data.title,
      description: data.description,
      syllabus: data.syllabus,
      batches: data.batches || [],
      price: data.price,
      deposit: data.deposit,
      accreditation: data.accreditation,
      teacherId: data.teacherId,
      duration: data.duration,
      image: data.image,
      createdAt: new Date().toISOString(),
    };
    await kv.set(`course:${id}`, course);
    return c.json({ success: true, course });
  } catch (error) {
    console.log("Error creating course:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update course
app.put("/make-server-ae7dad4f/courses/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const existing = await kv.get(`course:${id}`);
    if (!existing) {
      return c.json({ success: false, error: "Course not found" }, 404);
    }
    const course = { ...existing, ...data, updatedAt: new Date().toISOString() };
    await kv.set(`course:${id}`, course);
    return c.json({ success: true, course });
  } catch (error) {
    console.log("Error updating course:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete course
app.delete("/make-server-ae7dad4f/courses/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`course:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting course:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== STUDENT ENROLLMENT ==========

// Submit enrollment
app.post("/make-server-ae7dad4f/enrollment", async (c) => {
  try {
    const data = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const enrollment = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      experience: data.experience,
      courseId: data.courseId,
      message: data.message,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    await kv.set(`enrollment:${id}`, enrollment);
    
    // Log enrollment for admin notification
    console.log("New enrollment received:", enrollment);
    
    // TODO: Send email notification to shivayayogashala09@gmail.com
    // Integration with email service (SendGrid, Mailgun, etc.) can be added here
    // Example email content:
    // To: shivayayogashala09@gmail.com
    // Subject: New Enrollment - ${enrollment.name}
    // Body: Student Details - Name: ${enrollment.name}, Email: ${enrollment.email}, Phone: ${enrollment.phone}
    
    return c.json({ 
      success: true, 
      enrollment,
      message: "Enrollment submitted successfully! We will contact you soon." 
    });
  } catch (error) {
    console.log("Error submitting enrollment:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all enrollments
app.get("/make-server-ae7dad4f/enrollments", async (c) => {
  try {
    const enrollments = await kv.getByPrefix("enrollment:");
    return c.json({ success: true, enrollments });
  } catch (error) {
    console.log("Error fetching enrollments:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== VIDEO/ASANA LIBRARY ==========

// Get all videos/asanas
app.get("/make-server-ae7dad4f/asanas", async (c) => {
  try {
    const asanas = await kv.getByPrefix("asana:");
    return c.json({ success: true, asanas });
  } catch (error) {
    console.log("Error fetching asanas:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create asana/video
app.post("/make-server-ae7dad4f/asanas", async (c) => {
  try {
    const data = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const asana = {
      id,
      name: data.name,
      sanskritName: data.sanskritName,
      description: data.description,
      benefits: data.benefits,
      difficulty: data.difficulty,
      category: data.category,
      image: data.image,
      videoUrl: data.videoUrl,
      createdAt: new Date().toISOString(),
    };
    await kv.set(`asana:${id}`, asana);
    return c.json({ success: true, asana });
  } catch (error) {
    console.log("Error creating asana:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
