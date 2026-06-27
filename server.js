const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const client = new Anthropic();

app.post("/api/generate-quiz", async (req, res) => {
  const { topic, difficulty, questionType, numQuestions, notes } = req.body;

  if (!topic && !notes) {
    return res.status(400).json({ error: "Topic or notes required" });
  }

  const difficultyMap = {
    easy: "straightforward, basic understanding",
    medium: "moderate, requires some analysis",
    hard: "challenging, requires deep understanding and application",
  };

  const typeInstructions = {
    mcq: `Generate ${numQuestions} multiple choice questions. Each question must have exactly 4 options (A, B, C, D) and one correct answer.`,
    truefalse: `Generate ${numQuestions} true/false questions. Each question must have answer as either "True" or "False".`,
    shortanswer: `Generate ${numQuestions} short answer questions. Each question must have a concise model answer (1-2 sentences).`,
    mixed: `Generate ${numQuestions} questions mixing MCQ, true/false, and short answer types evenly.`,
  };

  const contentSource = notes
    ? `Based on these notes/content:\n\n${notes}\n\nTopic context: ${topic || "from the notes"}`
    : `Topic: ${topic}`;

  const prompt = `You are an expert quiz generator for students and educators.

${contentSource}

${typeInstructions[questionType]}

Difficulty level: ${difficultyMap[difficulty]}

Return ONLY a valid JSON array with no markdown, no explanation, just the JSON. Format:

For MCQ:
[{"id":1,"type":"mcq","question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"answer":"A","explanation":"..."}]

For True/False:
[{"id":1,"type":"truefalse","question":"...","answer":"True","explanation":"..."}]

For Short Answer:
[{"id":1,"type":"shortanswer","question":"...","answer":"...","explanation":"..."}]

For Mixed: use all three formats above in the same array.

Make questions educational, clear, and relevant to the topic. Add a brief explanation for each answer.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = message.content[0].text.trim();
    
    // Clean any markdown if present
    const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const questions = JSON.parse(cleaned);
    res.json({ questions, topic: topic || "From Notes" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to generate quiz. Try again." });
  }
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
