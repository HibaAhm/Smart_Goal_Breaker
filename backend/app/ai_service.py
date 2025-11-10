import google.generativeai as genai
import json
import os
import logging
from dotenv import load_dotenv
logger = logging.getLogger(__name__)

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY environment variable is not set.\n"
        "Please add to your .env file:\n"
        "GEMINI_API_KEY=your_api_key_here\n"
        "Get your free API key from: https://makersuite.google.com/app/apikey"
    )

genai.configure(api_key=GEMINI_API_KEY)

def break_down_goal(goal_text: str) -> dict:
    """
    Uses Gemini AI to break down a goal into 5 actionable steps and calculate complexity.
    Returns a dict with 'tasks' (list of 5 tasks) and 'complexity_score' (1-10).
    """
    # List available models and find one that works
    model = None
    model_name = None
    
    try:
        # Get list of all available models (convert generator to list)
        all_models = list(genai.list_models())
        logger.info(f"Found {len(all_models)} available models")
        
        # Filter models that support generateContent
        available_models = []
        for m in all_models:
            if 'generateContent' in m.supported_generation_methods:
                # Extract model name (remove 'models/' prefix if present)
                name = m.name
                if name.startswith('models/'):
                    name = name.replace('models/', '')
                available_models.append((name, m.name))
                logger.info(f"Available model: {name} (full name: {m.name})")
        
        if not available_models:
            raise ValueError("No models with generateContent support found. Please check your API key.")
        
        # Try models in order of preference (free tier first, avoid experimental)
        preferred_order = [
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-pro',
        ]
        
        # First, try preferred models
        for preferred in preferred_order:
            for short_name, full_name in available_models:
                if preferred in short_name.lower() and 'exp' not in short_name.lower() and '2.5' not in short_name.lower():
                    try:
                        # Try with short name first
                        model = genai.GenerativeModel(short_name)
                        model_name = short_name
                        logger.info(f"Using preferred model: {model_name}")
                        break
                    except:
                        try:
                            # Try with full name
                            model = genai.GenerativeModel(full_name)
                            model_name = short_name
                            logger.info(f"Using preferred model (full name): {full_name}")
                            break
                        except:
                            continue
            if model:
                break
        
        # If no preferred model worked, use the first available
        if model is None:
            for short_name, full_name in available_models:
                # Skip experimental models
                if 'exp' not in short_name.lower() and '2.5' not in short_name.lower():
                    try:
                        model = genai.GenerativeModel(short_name)
                        model_name = short_name
                        logger.info(f"Using available model: {model_name}")
                        break
                    except:
                        try:
                            model = genai.GenerativeModel(full_name)
                            model_name = short_name
                            logger.info(f"Using available model (full name): {full_name}")
                            break
                        except:
                            continue
        
        # Last resort: use any model
        if model is None:
            short_name, full_name = available_models[0]
            try:
                model = genai.GenerativeModel(short_name)
                model_name = short_name
                logger.info(f"Using first available model: {model_name}")
            except:
                model = genai.GenerativeModel(full_name)
                model_name = short_name
                logger.info(f"Using first available model (full name): {full_name}")
        
    except Exception as e:
        logger.error(f"Error finding model: {e}")
        raise ValueError(f"Could not find a working Gemini model. Error: {e}. Please check your API key.")
    
    if model is None:
        raise ValueError("Could not initialize any Gemini model. Please check your API key and model availability.")
    
    prompt = f"""Break down the following goal into exactly 5 actionable, specific steps. 
Also provide a complexity score from 1-10 where 1 is very simple and 10 is extremely complex.

Goal: "{goal_text}"

Return your response as a JSON object with this exact structure:
{{
    "tasks": [
        {{"task_text": "First actionable step", "order": 1}},
        {{"task_text": "Second actionable step", "order": 2}},
        {{"task_text": "Third actionable step", "order": 3}},
        {{"task_text": "Fourth actionable step", "order": 4}},
        {{"task_text": "Fifth actionable step", "order": 5}}
    ],
    "complexity_score": 7.5
}}

Make sure each task is:
- Specific and actionable
- Clear and measurable
- In logical order
- Directly related to achieving the goal

Return ONLY the JSON object, no additional text."""

    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Clean up the response in case there are markdown code blocks
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        result = json.loads(response_text)
        
        # Validate the structure
        if "tasks" not in result or "complexity_score" not in result:
            raise ValueError("Invalid response structure from AI")
        
        if len(result["tasks"]) != 5:
            raise ValueError(f"Expected 5 tasks, got {len(result['tasks'])}")
        
        # Ensure complexity score is between 1 and 10
        complexity = float(result["complexity_score"])
        if complexity < 1:
            complexity = 1.0
        elif complexity > 10:
            complexity = 10.0
        
        result["complexity_score"] = complexity
        
        return result
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse AI response as JSON: {e}")
    except Exception as e:
        raise ValueError(f"Error calling Gemini API: {e}")