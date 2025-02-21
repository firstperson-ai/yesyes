import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resume, jobDescription } = req.body;

  if (!resume || !jobDescription) {
    return res.status(400).json({ error: 'Resume and job description are required' });
  }

  try {
    const openaiResponse = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: `Optimize this resume for ATS based on the following job description: Resume: ${resume}, Job Description: ${jobDescription}. Return the optimized resume text and an ATS score (0-100) as JSON: {"optimizedResume": "text", "atsScore": number}`,
      max_tokens: 500,
      temperature: 0.7,
    }, {
      headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}` },
    });

    const result = JSON.parse(openaiResponse.data.choices[0].text);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to optimize resume' });
  }
}