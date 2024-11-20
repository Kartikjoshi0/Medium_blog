import { NextRequest } from "next/server";

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

async function getHuggingFaceSuggestions(content: any) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: content,  
        parameters: {
          max_length: 100,
          temperature: 0.7,
        }
      }),
    });

    const result = await response.json();
    console.log('this is result', result);

 
    const suggestions = result[0]?.summary_text || "No suggestions available at the moment.";
    return suggestions;
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    return getBasicSuggestions(content);
  }
}


function getBasicSuggestions(content: any) {
  const suggestions = [];
  
  // Length check
  if (content.length < 100) {
    suggestions.push("💡 Consider adding more detail to make your post more informative.");
  }

  // Readability checks
  const sentences = content.split(/[.!?]+/);
  if (sentences.some(sentence => sentence.length > 100)) {
    suggestions.push("📖 Consider breaking longer sentences for better readability.");
  }

  // Structure checks
  const paragraphs = content.split('\n\n');
  if (paragraphs.length < 2) {
    suggestions.push("📝 Consider organizing your content into paragraphs.");
  }

  // Engagement checks
  const questionCount = (content.match(/\?/g) || []).length;
  if (questionCount === 0) {
    suggestions.push("💭 Consider adding rhetorical questions to engage readers.");
  }

  return suggestions.join('\n\n');
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    
    // Try Hugging Face API first
    const suggestions = await getHuggingFaceSuggestions(content);

    return new Response(JSON.stringify({ suggestions }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error("API Error:", error);
    // Use fallback if API fails
    const basicSuggestions = getBasicSuggestions(content);
    return new Response(JSON.stringify({ 
      suggestions: basicSuggestions,
      source: 'fallback'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
