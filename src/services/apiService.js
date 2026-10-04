import Axios from "axios";

const explainCode = async (code, language) => {
  try {
    const prompt = `
    You are an expert programming teacher.

    Explain the following ${language} code to a beginner.

    Code:
    ${code}

    Format your response in **Markdown** with these exact sections:

    ## Overview
    A simple 2-3 line summary of what this code does overall.

    ## Line-by-Line Explanation
    Go through the code line by line (or logical block by block for very long code) and explain each part in a numbered list. Format each item like:
    1. \`<the exact line/block of code>\` — explanation of what it does

    ## Key Concepts Used
    A bullet list of important programming concepts used in this code (e.g. loops, functions, recursion, etc.)

    ## Suggestions for Improvement
    A bullet list of practical suggestions to make this code better — cleaner, more efficient, more readable, or following best practices. If the code is already well written, mention that and suggest only minor/optional improvements.

    Keep the language simple and beginner-friendly. Use proper Markdown (headings, code blocks with backticks, bullet points).
    `;

    const response = await Axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,

      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
    );

    const explanation =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return explanation || "No Explanation Recieved";
  } catch (error) {
    console.log(error, "API Call Failed");
  }
};

export default explainCode;
