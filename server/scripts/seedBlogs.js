import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/blog.js";
import path from "path";
import { fileURLToPath } from "url";

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const mockBlogs = [
    {
        title: "10 Resume Tips That Will Get You Hired in 2024",
        excerpt: "Discover the essential strategies to make your resume stand out from the competition and land your dream job.",
        content: `# 10 Resume Tips That Will Get You Hired in 2024

In today's competitive job market, your resume needs to be more than just a list of your experiences. Here are the top 10 tips to make your resume stand out:

## 1. Tailor Your Resume to Each Job
Never send the same resume to every employer. Customize your resume to match the job description and highlight relevant skills.

## 2. Use Action Verbs
Start bullet points with strong action verbs like "Led," "Developed," "Implemented," or "Achieved" to demonstrate impact.

## 3. Quantify Your Achievements
Numbers speak louder than words. Include metrics like "Increased sales by 30%" or "Managed a team of 15."

## 4. Keep It Concise
Aim for one page if you have less than 10 years of experience, two pages maximum for seasoned professionals.

## 5. Use a Professional Format
Choose a clean, modern design that's ATS-friendly. Avoid excessive graphics or unusual fonts.

## 6. Highlight Your Skills
Create a dedicated skills section showcasing both technical and soft skills relevant to the position.

## 7. Include Keywords
Use keywords from the job description to pass Applicant Tracking Systems (ATS).

## 8. Proofread Thoroughly
Spelling or grammar errors can instantly disqualify you. Have someone else review your resume.

## 9. Add a Professional Summary
A compelling 2-3 sentence summary at the top can grab the recruiter's attention immediately.

## 10. Update Regularly
Keep your resume current with new skills, certifications, and accomplishments.

Following these tips will significantly improve your chances of getting noticed by recruiters and landing interviews.`,
        category: "Career Tips",
        author: "Career Coach",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
        published: true
    },
    {
        title: "How to Write a Compelling Professional Summary",
        excerpt: "Learn how to craft a powerful professional summary that captures recruiters' attention in seconds.",
        content: `# How to Write a Compelling Professional Summary

Your professional summary is the first thing recruiters read. Make it count!

## What is a Professional Summary?
A professional summary is a 2-4 sentence overview of your career highlighting your most impressive achievements and skills.

## Key Components:
1. **Your Title/Role**: Start with who you are professionally
2. **Years of Experience**: Mention your experience level
3. **Key Skills**: Highlight 2-3 most relevant skills
4. **Value Proposition**: What makes you unique?

## Example:
"Results-driven Software Engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture. Proven track record of reducing load times by 40% and increasing user engagement by 60%."

## Tips:
- Keep it concise (3-4 lines maximum)
- Use industry-specific keywords
- Focus on achievements, not responsibilities
- Tailor it to each job application

A well-crafted professional summary can be the difference between getting interviewed or overlooked.`,
        category: "Resume Writing",
        author: "Resume Expert",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
        published: true
    },
    {
        title: "Common Resume Mistakes to Avoid",
        excerpt: "Don't let these common mistakes ruin your chances. Learn what to avoid when creating your resume.",
        content: `# Common Resume Mistakes to Avoid

Even experienced professionals make resume mistakes. Here's what to watch out for:

## 1. Typos and Grammatical Errors
Nothing says "unprofessional" faster than spelling mistakes. Always proofread multiple times.

## 2. Using an Unprofessional Email Address
dude123@email.com won't impress anyone. Use firstname.lastname@email.com instead.

## 3. Including Irrelevant Information
Your hobbies, age, or photo (in most countries) don't belong on your resume.

## 4. Making It Too Long
Recruiters spend 6-7 seconds scanning resumes. Keep it concise and relevant.

## 5. Poor Formatting
Inconsistent fonts, spacing, or alignment make your resume hard to read.

## 6. Lying or Exaggerating
Always be truthful. Background checks will catch dishonesty.

## 7. Using Generic Descriptions
"Responsible for customer service" is boring. Try "Resolved 95% of customer issues on first contact."

## 8. Omitting Keywords
Many companies use ATS software. Include relevant keywords from the job posting.

## 9. Outdated Contact Information
Ensure your phone number and email are current and professional.

## 10. No Measurable Achievements
Always quantify your accomplishments with numbers, percentages, or dollar amounts.

Avoid these mistakes, and you'll be well on your way to landing more interviews!`,
        category: "Resume Writing",
        author: "HR Professional",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
        published: true
    },
    {
        title: "The Power of ATS-Friendly Resumes",
        excerpt: "Understand Applicant Tracking Systems and how to optimize your resume to pass automated screening.",
        content: `# The Power of ATS-Friendly Resumes

Did you know that 75% of resumes never reach human eyes? They're filtered out by Applicant Tracking Systems (ATS).

## What is an ATS?
An Applicant Tracking System is software that scans resumes for keywords, skills, and qualifications before a human reviews them.

## How to Make Your Resume ATS-Friendly:

### 1. Use Standard Headings
Stick to conventional section titles like "Work Experience," "Education," and "Skills."

### 2. Avoid Graphics and Tables
ATS software can't read images, charts, or complex tables. Use simple formatting.

### 3. Use Standard Fonts
Arial, Calibri, or Times New Roman work best. Avoid decorative fonts.

### 4. Include Keywords
Mirror the language from the job description. If they say "project management," use that exact phrase.

### 5. Save as .docx or PDF
Most ATS systems prefer these formats over others.

### 6. Spell Out Acronyms
Write "Search Engine Optimization (SEO)" the first time you use it.

## Test Your Resume
Tools like Jobscan can show you how ATS-friendly your resume is.

## The Bottom Line
An ATS-optimized resume increases your chances of getting past the initial screening and into the hands of a hiring manager.`,
        category: "Job Search",
        author: "Tech Recruiter",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        published: true
    },
    {
        title: "How to Showcase Your Skills Effectively",
        excerpt: "Master the art of presenting your skills in a way that resonates with employers and highlights your strengths.",
        content: `# How to Showcase Your Skills Effectively

Your skills section can make or break your resume. Here's how to do it right.

## Types of Skills to Include:

### Hard Skills (Technical)
- Programming languages
- Software proficiency
- Data analysis
- Foreign languages
- Certifications

### Soft Skills (Interpersonal)
- Leadership
- Communication
- Problem-solving
- Teamwork
- Time management

## Best Practices:

### 1. Create a Dedicated Section
Make your skills easy to find with a clear "Skills" heading.

### 2. Prioritize Relevance
List skills that match the job description first.

### 3. Provide Context
Don't just list "Excel." Say "Advanced Excel (Pivot Tables, VLOOKUP, Macros)."

### 4. Be Honest
Only list skills you can confidently demonstrate in an interview.

### 5. Update Regularly
Technology changes fast. Keep your skills current.

## Skill Rating Systems
Consider using proficiency levels:
- Expert / Advanced
- Intermediate
- Beginner

## Example Skills Section:
**Technical Skills:** Python, JavaScript, React, SQL, AWS
**Tools:** Git, Docker, Jira, Figma
**Soft Skills:** Team Leadership, Agile Methodology, Client Communication

Remember: skills without context are just words. Demonstrate them in your experience section!`,
        category: "Career Tips",
        author: "Career Advisor",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        published: true
    },
    {
        title: "Transitioning Careers? How to Position Your Experience",
        excerpt: "Changing industries? Learn how to leverage transferable skills and reframe your experience for a new career path.",
        content: `# Transitioning Careers? How to Position Your Experience

Career transitions are increasingly common. Here's how to make your experience relevant to a new field.

## 1. Identify Transferable Skills
Focus on skills that apply across industries:
- Project management
- Leadership
- Communication
- Problem-solving
- Budget management

## 2. Reframe Your Experience
Instead of job-specific jargon, use universal language.

❌ "Managed restaurant operations"
✅ "Led team of 20, optimized workflows, reduced costs by 15%"

## 3. Use a Functional Resume Format
Group skills by category rather than chronological work history.

## 4. Write a Strong Summary
Explain your transition briefly:
"Marketing professional transitioning to UX Design with a passion for user-centered solutions and proven track record in consumer research."

## 5. Highlight Relevant Achievements
Even if from a different field, show how your accomplishments demonstrate valuable skills.

## 6. Get Certified
Take courses or earn certifications in your new field to show commitment.

## 7. Network Strategically
Connect with professionals in your target industry and seek informational interviews.

## 8. Address the Gap
In your cover letter or interview, explain your passion for the new field and how your unique background adds value.

## Example:
A teacher transitioning to corporate training might emphasize:
- Curriculum development → Training program design
- Classroom management → Facilitation skills
- Student assessment → Performance evaluation

Remember: your diverse background is an asset, not a liability!`,
        category: "Career Change",
        author: "Career Transition Coach",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
        published: true
    }
];

// Helper function to generate slug from title
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

const seedBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");

        // Clear existing blogs
        await Blog.deleteMany({});
        console.log("🗑️  Cleared existing blog posts");

        // Add slugs to blogs
        const blogsWithSlugs = mockBlogs.map(blog => ({
            ...blog,
            slug: generateSlug(blog.title)
        }));

        // Insert mock blogs
        const createdBlogs = await Blog.insertMany(blogsWithSlugs);
        console.log(`✅ Successfully created ${createdBlogs.length} blog posts!`);

        console.log("\nCreated posts:");
        createdBlogs.forEach((blog, idx) => {
            console.log(`   ${idx + 1}. ${blog.title} (${blog.category})`);
        });

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding blogs:", err);
        process.exit(1);
    }
};

seedBlogs();
