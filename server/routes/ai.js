import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { requireAuth } from "../middleware/auth.js";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Helper function to call Groq API
async function getGroqCompletion(messages, model = "llama-3.1-8b-instant") {
  try {
    const completion = await groq.chat.completions.create({
      messages,
      model,
      temperature: 0.7,
      max_tokens: 1024,
    });
    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to communicate with AI service");
  }
}

function sanitizeResume(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/#+/g, "")
    .replace(/Here's the rewritten content.*?:/gi, "")
    .replace(/\b\d+%\b/g, "") // removes fake percentages
    .trim();
}

// Health check endpoint (no auth required)
router.get("/health", async (req, res) => {
  try {
    const apiKeyExists = !!process.env.GROQ_API_KEY;
    res.json({
      success: true,
      service: "AI API",
      status: "operational",
      apiKeyConfigured: apiKeyExists
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 1. Chat with AI
router.post("/chat", requireAuth, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ success: false, message: "Prompt is required" });

    const messages = [
      { role: "system", content: "You are a helpful and professional career coach and resume expert. Assist the user with their queries related to resume building, career advice, and job interviews." },
      { role: "user", content: prompt }
    ];

    const reply = await getGroqCompletion(messages);
    res.json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Generate Resume Summary
router.post("/generate-summary", requireAuth, async (req, res) => {
  try {
    const data = req.body;

    // Build context from available data
    const contextParts = [];

    if (data.personalDetails?.jobTitle) {
      contextParts.push(`Job Title: ${data.personalDetails.jobTitle}`);
    }

    if (data.experience?.length > 0) {
      const expSummary = data.experience.map(exp =>
        `${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})`
      ).join('; ');
      contextParts.push(`Experience: ${expSummary}`);
    }

    if (data.skills?.length > 0) {
      const skillsList = data.skills.flatMap(cat => cat.items || []).join(', ');
      contextParts.push(`Skills: ${skillsList}`);
    }

    if (data.education?.length > 0) {
      const eduSummary = data.education.map(edu =>
        `${edu.degree} from ${edu.institution}`
      ).join('; ');
      contextParts.push(`Education: ${eduSummary}`);
    }

    const context = contextParts.length > 0
      ? contextParts.join('\n')
      : 'User is creating a resume';

    const messages = [
      {
        role: "system",
        content: `You are a professional resume writer. Generate a compelling professional summary (3-4 sentences, 40-60 words) based on the provided user profile data.

RULES:
- DO NOT use markdown or special formatting
- DO NOT start with "Here is..." or similar phrases
- DO NOT use bullet points
- Write in third person or implied first person (no "I")
- Focus on: years of experience, key skills, notable achievements
- Use action-oriented language
- Keep it concise and impactful
- Include specific skills or technologies if provided

Return ONLY the summary text, nothing else.`
      },
      { role: "user", content: `Generate a professional summary based on:\n\n${context}` }
    ];

    const summary = await getGroqCompletion(messages);
    const cleaned = sanitizeResume(summary);

    res.json({ success: true, summary: cleaned });
  } catch (error) {
    console.error("Summary generation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Enhance Experience
router.post("/enhance-experience", requireAuth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "Text is required" });

    const messages = [
      {
        role: "system",
        content: `You are a professional resume editor.

STRICT RULES:
- Do NOT add fake numbers, percentages, or achievements.
- Do NOT invent new skills or projects.
- Do NOT change company names, job titles, or dates.
- Do NOT use markdown symbols like **, ##, or bullet emojis.
- Do NOT add extra sections.
- Only improve grammar, clarity, and ATS optimization.
- Keep the original meaning 100% same.`
      },
      {
        role: "user",
        content: `Rewrite the following resume content in clean plain text only:

${text}`
      }
    ];

    const result = await getGroqCompletion(messages);
    res.json({ success: true, result: sanitizeResume(result) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. ATS Optimize
router.post("/ats-optimize", requireAuth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "Text is required" });

    const messages = [
      {
        role: "system",
        content: `You are an ATS (Applicant Tracking System) optimization expert.

STRICT RULES:
- Remove special characters that confuse ATS systems
- Use standard fonts and formatting
- Keep all factual information unchanged
- Add relevant keywords ONLY if they relate to the existing content
- Do NOT invent new achievements or skills
- Do NOT use emojis, symbols, or special formatting
- Return plain text only`
      },
      {
        role: "user",
        content: `Optimize the following for ATS systems:

${text}`
      }
    ];

    const result = await getGroqCompletion(messages);
    res.json({ success: true, result: sanitizeResume(result) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Grammar Check
router.post("/grammar-check", requireAuth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "Text is required" });

    const messages = [
      {
        role: "system",
        content: `You are a professional resume editor focused on grammar and clarity.

STRICT RULES:
- Fix ONLY grammar, spelling, and punctuation errors
- Do NOT change the meaning or content
- Do NOT add new information
- Do NOT remove existing details
- Keep all numbers, dates, and facts unchanged
- Return clean plain text without markdown`
      },
      {
        role: "user",
        content: `Fix grammar and spelling errors in:

${text}`
      }
    ];

    const result = await getGroqCompletion(messages);
    res.json({ success: true, result: sanitizeResume(result) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. Format Text
router.post("/format-text", requireAuth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "Text is required" });

    const messages = [
      {
        role: "system",
        content: `You are a professional resume formatter.

STRICT RULES:
- Format text for better readability
- Ensure consistent bullet points (use • only)
- Fix spacing and line breaks
- Do NOT change wording or content
- Do NOT add new information
- Return plain text without markdown`
      },
      {
        role: "user",
        content: `Format and clean up this text:

${text}`
      }
    ];

    const result = await getGroqCompletion(messages);
    res.json({ success: true, result: sanitizeResume(result) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. Analyze Resume
router.post("/analyze-resume", requireAuth, async (req, res) => {
  try {
    const { resumeData } = req.body;
    const context = JSON.stringify(resumeData);

    const messages = [
      { role: "system", content: "Analyze the provided resume data. Provide a detailed critique including: 1. A score out of 100. 2. Key strengths. 3. Areas for improvement (weaknesses). 4. Specific actionable tips to improve the resume for better job prospects. Format the output in Markdown." },
      { role: "user", content: `Resume Data: ${context}` }
    ];

    const analysis = await getGroqCompletion(messages);
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
