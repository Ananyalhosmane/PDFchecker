import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


function checkRule(text, rule) {
  const lowerText = text.toLowerCase();
  const lowerRule = rule.toLowerCase();

  let status = "fail";
  let evidence = "No evidence found";
  let reasoning = "Rule checking not supported, default fail.";
  let confidence = 50;

  
  if (lowerRule.includes("title") && lowerText.includes("title")) {
    status = "pass";
    evidence = 'Found "title" in text';
    reasoning = "Document contains a title.";
    confidence = 90;
  } else if (lowerRule.includes("year")) {
    const match = text.match(/\b\d{4}\b/);
    if (match) {
      status = "pass";
      evidence = `Found year: "${match[0]}"`;
      reasoning = "Document contains a year.";
      confidence = 90;
    }
  } else if (lowerRule.includes("sentence")) {
    const sentences = text.split(/[\n.]/).filter(s => s.trim().length > 0);
    if (sentences.length > 0) {
      status = "pass";
      evidence = `Found sentence: "${sentences[0].trim()}"`;
      reasoning = "Document contains at least one sentence.";
      confidence = 85;
    }
  }

  return { status, evidence, reasoning, confidence };
}


router.post("/check-pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });
    if (!req.body.rules) return res.status(400).json({ error: "No rules provided" });

    const pdfBuffer = req.file.buffer;
    const parsedPdf = await pdfParse(pdfBuffer);
    const text = parsedPdf.text;

    const rules = JSON.parse(req.body.rules);
    const results = rules.map(rule => ({ rule, ...checkRule(text, rule) }));

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;


