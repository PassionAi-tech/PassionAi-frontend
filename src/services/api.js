// ═══════════════════════════════════════════════════════════════════
// API SERVICE LAYER — connects to the deployed PassionAI backend
// ═══════════════════════════════════════════════════════════════════
const API_BASE = import.meta.env.VITE_API_URL || "https://passionai-backend-tqp5.onrender.com/api";

export const API = {
  /** Generate AI lesson using backend (falls back to Claude API directly) */
  generateLesson: async (passion, subject, topic, cls) => {
    try {
      const res = await fetch(`${API_BASE}/lesson/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passion, subject, topic, cls }),
      });
      if (!res.ok) throw new Error("API failed");
      return await res.json();
    } catch {
      return { error: true, quota: false };
    }
  },
  /** Save user progress to backend */
  saveProgress: async (userId, profileData) => {
    try {
      const res = await fetch(`${API_BASE}/progress/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, profileData }),
      });
      return await res.json();
    } catch { return { error: true }; }
  },
  /** Get user profile from backend */
  getProfile: async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/profile/${userId}`);
      return await res.json();
    } catch { return { error: true }; }
  },
};

function cleanJson(raw) {
  const s = raw.replace(/```json|```/gi,"").trim();
  const m = s.match(/\{[\s\S]*\}/);
  return m ? m[0] : s;
}
/**
 * Core Gemini API call with passion-first system prompt
 * The system prompt is injected BEFORE the user prompt to make passion
 * the lens through which the entire lesson is conceived — not added afterward.
 * @param {string} prompt - The lesson generation prompt
 * @param {number} maxTokens - Max tokens in response
 * @param {string} passion - Student passion (used in system prompt)
 * @param {string} topic - Topic being taught
 * @returns {Promise<Object>} Parsed JSON response or null
 */
/**
 * Core Claude API call — enforces a PROCEDURE for passion-based teaching,
 * not just a persona description. The model must derive each scenario from
 * the topic itself, in a fixed order, with a built-in self-check before output.
 * @param {string} prompt - The lesson generation prompt (task-specific instructions)
 * @param {number} maxTokens - Max tokens in response
 * @param {string} passion - Student passion (drives the generation procedure)
 * @param {string} topic - Topic being taught
 * @returns {Promise<Object>} Parsed JSON response or null
 */
export async function callAI(prompt, maxTokens=700, passion="", topic="") {

  // ── PASSION WORLD FACTS ──────────────────────────────────────────
  // Concrete, swappable facts the model can pull real numbers from.
  // Not vocabulary to sprinkle — raw material to build scenarios out of.
  const passionWorld = {
    football: "a match is 90 minutes across two 45-minute halves; a pitch is 105m x 68m; a striker can sprint at 8-9 m/s; a free kick is often taken 20-25m from goal; a season has ~38 league matches; a team has 11 players plus substitutes; a corner arc has radius 1m; transfer fees run into millions; a match ball weighs 410-450g",
    cricket: "an over is 6 balls; a T20 innings is 20 overs, ODI is 50; a pitch is 22 yards (20.12m) long; a fast bowler delivers at 130-150 km/h; a batting average is runs scored divided by times out; a boundary is 4 runs, over the rope is 6; a team has 11 players; a bat weighs around 1.1-1.4 kg",
    music: "a song's tempo is measured in BPM (beats per minute), typically 60-180; a standard scale has 8 notes/12 semitones; a concert setlist runs 90-120 minutes; sound travels at 343 m/s in air; a guitar has 6 strings; an album typically has 10-14 tracks; a chorus repeats 3-4 times in a pop song; frequency of middle C is ~261.6 Hz",
    dance: "a dance routine is often 3-4 minutes long; tempo is measured in BPM matching the music; a stage is typically 12m x 9m for competitions; a pirouette is a 360-degree turn; a group routine might have 6-20 dancers; competition scoring is often out of 100; rehearsal sessions run 1-3 hours",
    gaming: "a game level might have 100-1000 XP to complete; character health is often 100 HP; a match/round lasts 10-40 minutes depending on game; frame rate is measured in FPS (30/60/120); a tournament bracket for 16 players needs 4 rounds; loot drop rates are often percentages like 1-25%; ping/latency measured in milliseconds",
    basketball: "a game is 4 quarters of 10-12 minutes; a court is 28m x 15m (FIBA); a three-point line is 6.75m from the basket; a free throw is worth 1 point, field goal 2, three-pointer 3; a team has 5 players on court; shooting percentage is baskets made divided by attempts; a shot clock is 24 seconds",
    cooking: "a recipe serving 4 might use 500g of a main ingredient; oven temperatures range 150-250°C; baking times run 15-45 minutes; a teaspoon is 5ml, tablespoon 15ml; scaling a recipe from 4 to 6 servings means multiplying by 1.5; water boils at 100°C at sea level; a pinch of salt is about 0.3g",
    swimming: "an Olympic pool is 50m long, 25 lanes across; a 100m freestyle world record is under 47 seconds; stroke rate is measured in strokes per minute, often 30-60; a swimmer might do 10-20 laps in training; split times are recorded every 50m or 100m; water resistance/drag increases with speed",
    chess: "a game has 64 squares, 8x8 grid; standard time control might be 90 minutes + 30 seconds increment; a pawn is worth 1 point, knight/bishop 3, rook 5, queen 9; a tournament might have 7-9 rounds; ELO ratings range from ~800 (beginner) to 2800+ (world champion); an opening has a named sequence of first moves",
    badminton: "a court is 13.4m x 6.1m singles; a shuttlecock can travel at 300+ km/h on a smash; a match is best of 3 games to 21 points; a rally might last 5-15 shots; the net is 1.55m high at the posts; a tournament draw for 32 players needs 5 rounds",
  };

  const world = passionWorld[passion] || `real numbers and situations from ${passion}`;

  // ── FORCED GENERATION PROCEDURE ──────────────────────────────────
  // This is a step order the model must execute, not a personality to adopt.
  const fullSystem =  `You are Champ.

You are NOT a school teacher using passion examples.

You become one of the world's greatest professionals in the student's passion.

If the passion is football, think and speak like an elite football coach, analyst, sports scientist, and former professional player.

If the passion is gaming, think like a professional esports coach, game designer, and strategist.

If the passion is music, think like a music producer, composer, and performer.

If the passion is cooking, think like a Michelin-star chef.

If the passion is cricket, think like an international cricket coach and analyst.

Your expertise in that passion is genuine. You naturally explain every curriculum concept through professional situations from that world.

The student should feel they are learning from a world-class expert in their passion, not from a school teacher giving examples.

RAW MATERIAL — real ${passion} facts and numbers to build from (use these, don't invent implausible ones):
${world}

YOU MUST FOLLOW THIS EXACT PROCEDURE FOR EVERY PIECE OF CONTENT, IN ORDER:

STEP 1 — UNDERSTAND THE TEXTBOOK CONCEPT.
State internally (don't output this step) exactly what the curriculum concept requires: the definition, the formula, the skill being tested.

STEP 1.5 — PASSION MAPPING.
Before inventing any scenario, identify the CORE RELATIONSHIP of the lesson. Decide whether the concept is primarily:
- A formula or calculation
- A process or sequence
- Cause and effect
- Comparison or classification
- Pattern or relationship
- Timeline or historical progression
- Decision making or strategy
- Observation or explanation

Then find where that SAME relationship naturally exists inside the student's passion.

Do NOT simply decorate the lesson with the passion. The passion must be the environment where the curriculum concept genuinely operates.

If the first scenario feels forced or could easily work for a different passion just by changing a few words, reject it and create a better one before continuing.

STEP 2 — BUILD A PASSION-NATIVE SCENARIO.

Create a named professional inside the passion performing a real task where the textbook concept is naturally required.

The concept must be discovered from the professional situation, not attached afterward.

The sequence must show WHY the concept exists.

Weak example (reject):
"Marcus runs at 8.5 m/s. His ball weighs 425g. These are real numbers."

This only lists numbers.

Strong example:
"Football analyst Marcus records a winger's training session. Sprint 1 takes 4.2 seconds, Sprint 2 takes 4.5 seconds, Sprint 3 takes 4.1 seconds. The analyst needs to compare these measurements, including decimals, to evaluate performance. These measurements belong to Real Numbers because professional football uses exact quantities like speed, distance, and time."

The numbers must have a purpose inside the passion.

Do not add random passion facts just to mention the passion.

STEP 3 — SELF-CHECK BEFORE WRITING (do this silently, don't output it):
(a) "Is there a NAMED individual and a SEQUENCE of at least 2-3 numbered events/attempts, not just one generic snapshot?"
(b) "If I replaced ${passion} with a different passion, would this exact sequence of events (not just the numbers) still make sense unchanged?"
If (a) is no, or (b) is yes → go back to Step 2 and build a proper named sequence.
If (a) is yes and (b) is no → proceed.

STEP 3.5 — THINK LIKE A PROFESSIONAL

Before writing, ask:

"If I were one of the best professionals in this passion, how would I naturally teach this concept during real work or training?"

Only after answering this internally may you begin the lesson.

STEP 4 — TEACH THROUGH THE SEQUENCE.
Walk through the named person's sequence of events. Show the numbers as they happen, one by one, like a mini-story. THEN apply the concept/formula directly to that exact data — using the SAME numbers you just introduced, not new ones.
Example of the pattern (topic: averages):
"Ronaldo takes three shots at goal during a training drill. Shot one, he strikes it and it reaches the top corner in 0.6 seconds. Shot two takes 0.7 seconds. Shot three, a bit rushed, takes 0.5 seconds. To find his average shot time, add all three: 0.6 + 0.7 + 0.5 = 1.8 seconds. Divide by the number of shots, 3: 1.8 ÷ 3 = 0.6 seconds average. That's the Mean — add up all the values, divide by how many there are."
Notice: named player, 3 concrete numbered attempts, the formula is calculated live from those exact numbers, not illustrated afterward with different numbers.

STEP 5 — CONNECT BACK TO THE OFFICIAL CURRICULUM TERM.
After teaching through the sequence, explicitly name the textbook term/formula so the student can map it to their syllabus (e.g. "This is exactly how you calculate the Mean/Average — what your chapter calls it").

HARD RULES:
HISTORY LEARNING RULES

For History chapters:
- Do not only explain the passion analogy.
- Always connect the passion scenario back to the exact historical cause, event, person, movement, or concept.
- Include important syllabus keywords naturally so the student can answer exam questions.
- The passion should help the student understand history, not replace historical facts.

PROFESSIONAL IMMERSION RULES

- A passion scenario is invalid if removing the passion leaves the exact same lesson unchanged. The professional must need the concept to make a real decision inside that passion.

- Never say "Imagine football..." or "Let's take football as an example."

- Never announce that you are using the student's passion.

- Speak as if you genuinely belong inside that profession.

- Use authentic terminology from that passion naturally.

- Build lessons around realistic decisions professionals actually make.

- Explain WHY professionals care about the concept.

- Every lesson should feel like real coaching, not classroom teaching.

- The student should forget they are studying and feel they are inside the passion itself.

- Every worked example must have a NAMED professional, a realistic professional situation, and a sequence of at least 3 connected measurements/events. Numbers must come from the professional activity itself, not be randomly inserted. — never a single abstract value.

- Numbers must be plausible for real ${passion} (use the raw material above as a guide for realistic ranges).

- Never use generic filler subjects: no "a car travels", "John has apples", "a ball is thrown" with no name or sequence attached.

- The formula must be calculated using the EXACT same numbers introduced in the story — never introduce new numbers partway through the calculation.

- Curriculum accuracy is non-negotiable — the sequence must produce the CORRECT formula and CORRECT answer for the actual textbook topic.

- Do not output your Step 1/2/3 reasoning — only the final Step 4/5 content, in the JSON format requested by the task.


// === MOBILE UI RULES ===

This lesson will be displayed on a mobile app.

STRICT RULES:

• Maximum 80 words PER PAGE.
• Every lesson stage must follow the page count requested by the task.
• Each page should feel like one swipe/card.
• Each page should feel like one swipe/card.
• Maximum 2 sentences per paragraph.
• Use short paragraphs.
• Never create walls of text.
• Keep explanations conversational.
• Highlight important answers on separate lines.

Use this exact structure:

PAGE 1:
- Title
- Hook
- Real passion scenario
- Explain the first idea naturally

PAGE 2:
- Continue the same concept deeper
- Show professional thinking
- Use real numbers/examples when needed

PAGE 3:
- Apply the concept
- Connect clearly to the textbook term
- End with why this matters in the passion

Each page must feel like a swipe card in a learning app.

Do NOT explain every tiny mathematical step unless absolutely necessary.

Write like an amazing teacher, not like a textbook.
`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  // ── DIAGNOSTIC LOGGING ────────────────────────────────────────────
  // NOTE: this calls OUR backend (API_BASE).
// Backend securely communicates with Gemini API.
  const endpoint = `${API_BASE}/generate`;
  console.log("%c[callAI] Sending request to backend", "color:#FF6B2B;font-weight:bold", {
    endpoint, passion, topic, maxTokens,
    promptPreview: prompt.slice(0, 200) + "...",
    systemPreview: fullSystem.slice(0, 200) + "...",
  });

  try {
    const res = await fetch(endpoint, {
      method:"POST", headers:{"Content-Type":"application/json"},
      signal: controller.signal,
      body: JSON.stringify({
        system: fullSystem,
        prompt: prompt,
        maxTokens: maxTokens,
      }),
    });
    clearTimeout(timeout);

    // Log the raw HTTP outcome BEFORE assuming anything about the body
    console.log("%c[callAI] HTTP response received from backend", "color:#3B9EFF;font-weight:bold", {
      status: res.status, ok: res.ok, statusText: res.statusText,
    });

    if (res.status===429) { console.warn("[callAI] Quota/rate-limit hit (429)"); return { quota:true }; }

    if (!res.ok) {
      // Backend forwards Anthropic's real status/body here, so this now
      // shows the TRUE upstream cause (bad key, bad model name, etc.)
      // instead of a generic browser-side failure.
      const errBody = await res.text();
      console.error("%c[callAI] Non-OK response from backend — check upstreamStatus/upstreamBody below for the real Anthropic-side cause", "color:#EF4444;font-weight:bold", {
        status: res.status, body: errBody,
      });
      return { error: true, status: res.status, body: errBody };
    }

    const d = await res.json();
    console.log("%c[callAI] Raw response body (from Anthropic, via backend)", "color:#22C97A;font-weight:bold", d);

    const rawText =
  (d.content||[]).map(b=>b.text||"").join("") ||
  d.choices?.[0]?.message?.content ||
  "";
    console.log("%c[callAI] Extracted text before JSON parse", "color:#22C97A", rawText.slice(0, 400));

const cleaned = cleanJson(rawText);

console.log("CLEANED JSON:", cleaned);

let parsed;
try {
  parsed = JSON.parse(cleaned);
} catch (err) {
  console.error("[callAI] JSON PARSE FAILED:", err);
  console.error("RAW AI OUTPUT:", rawText);
  return { error: true };
}

console.log("%c[callAI] Successfully parsed lesson JSON — REAL AI-GENERATED CONTENT, not fallback", "color:#22C97A;font-weight:bold", {
      pageCount: parsed?.pages?.length || parsed?.questions?.length || "n/a",
      firstPageTitle: parsed?.pages?.[0]?.title || parsed?.questions?.[0]?.question || "n/a",
    });
    return parsed;

  } catch(e) {
    clearTimeout(timeout);
    console.error("%c[callAI] FETCH THREW — could not reach the backend at all (is it running? is API_BASE correct?)", "color:#EF4444;font-weight:bold", {
      endpoint, name: e.name, message: e.message, stack: e.stack,
    });
    return {
    error: true,
    network: true
};
  }
}

export async function fetchIntro(passion, subject, topic, cls) {
  return callAI(`TASK: Create the INTRODUCTION of "${topic}" for Class ${cls} ${subject}.

IMPORTANT:
This is the first lesson screen.
Do NOT complete the whole chapter.
The goal is to make the student understand the chapter and become curious.

Create EXACTLY 3 mobile pages.

PAGE 1:
Explain what "${topic}" is about.
Use a natural ${passion} situation.

PAGE 2:
Explain the first important idea of "${topic}".
Use a different ${passion} situation.

PAGE 3:
Explain why "${topic}" matters in real ${passion} careers or real life.
Prepare the student for the next stage.

RULES:
- Each page maximum 70 words.
- Short mobile-friendly paragraphs.
- No questions.
- No markdown.
- Do not use "Imagine football" or "Let's take football as an example".
- The passion must naturally be part of the explanation.

Return ONLY valid JSON:

{
  "title": "${topic}",
  "pages": [
    {
      "emoji": "📖",
      "title": "",
      "body": ""
    },
    {
      "emoji": "🔢",
      "title": "",
      "body": ""
    },
    {
      "emoji": "🚀",
      "title": "",
      "body": ""
    }
  ]
}

`, 1400, passion, topic);
}
export async function fetchDeepDive(passion, subject, topic, cls) {
  return callAI(`TASK: Give a DEEP DIVE on "${topic}" in ${subject} for Class ${cls}, following your passion-first teaching procedure.

This is a mobile lesson. Create EXACTLY 3 deep dive pages.

Each page must:
- Use a DIFFERENT specific ${passion} scenario.
- Have a named professional/person.
- Show why the concept is naturally needed in that situation.
- Include real numbers when the concept requires calculation.
- Connect back to the official textbook term.
- Be concise and easy to read.

PAGE 1:
Teach the main concept deeply through a real ${passion} professional situation.

PAGE 2:
Teach a harder application where the student must think like a professional.

PAGE 3:
Show a real-world ${passion} use case or advanced application.

Rules:
- No generic examples.
- No "Imagine football" or "Let's take football as an example".
- The passion must be the environment, not decoration.
- No questions.
- Keep each body under 80 words.
- Return ONLY valid JSON.

Format:

{
  "pages": [
    {
      "emoji": "🤯",
      "title": "",
      "body": ""
    },
    {
      "emoji": "⚡",
      "title": "",
      "body": ""
    },
    {
      "emoji": "🏆",
      "title": "",
      "body": ""
    }
  ]
}

`, 1800, passion, topic);
}
export async function fetchMastery(passion, subject, topic, cls) {
  return callAI(`

TASK:
Create the MASTERY stage for "${topic}".

Create EXACTLY 3 mobile pages.

PAGE 1
• Show a REAL professional ${passion} situation.
• Explain how ${topic} is used.
• Use real numbers.

PAGE 2
• Show a DIFFERENT real career or technology.
• Apply the textbook concept.
• Explain why professionals need it.

PAGE 3
• Finish with one inspiring real-world application.
• Connect back to the textbook term.
• End by congratulating the learner.

Maximum 80 words per page.

Return ONLY JSON:

{
  "pages":[
    {
      "emoji":"🌍",
      "title":"",
      "body":""
    },
    {
      "emoji":"💼",
      "title":"",
      "body":""
    },
    {
      "emoji":"🏆",
      "title":"You've Mastered It!",
      "body":""
    }
  ]
}

`,900,passion,topic);
}

// fallbacks

export const FB_INTRO = (topic,p) => ({
  title: topic,
  pages:[
    {
      emoji:"📖",
      title:`What is ${topic}?`,
      body:`${topic} is the foundation of this chapter. A professional ${p} player learns the basics first before mastering advanced skills.`
    },
    {
      emoji:"🔢",
      title:"The Core Idea",
      body:`Every great ${p} professional looks for patterns and strategies. ${topic} teaches you the same thinking process used to solve problems.`
    },
    {
      emoji:"🚀",
      title:"Why It Matters",
      body:`Understanding ${topic} helps you think faster and make better decisions. This knowledge will power the deeper lessons ahead.`
    }
  ]
});
export const FB_DEEPDIVE = (topic,p) => ({pages:[
  {emoji:"🤯",title:"Mind-blowing Fact",body:`${topic} has been used for thousands of years. Ancient civilisations applied it — even in early versions of ${p}.`},
  {emoji:"📜",title:"The History",body:`Great thinkers spent centuries developing ${topic}. What you learn in one lesson took humans generations to figure out.`},
  {emoji:"🌍",title:"Real Example 1",body:`Every time you watch ${p}, ${topic} is quietly running the show — from scores to strategies.`},
  {emoji:"⚡",title:"Real Example 2",body:`Engineers, doctors, scientists use ${topic} every single day. It's not just school — it's a real-world superpower.`},
  {emoji:"🏆",title:"Expert Insight",body:`Pros who master ${topic} early get a serious edge. You're getting that edge right now.`},
]});
export const FB_CHALLENGE = (topic) => ({questions:[
  {question:`Describe the main idea of ${topic} in one sentence.`,answer:"open",hint:"Think about what you learned in Introduction.",explanation:`${topic} has a core idea that everything else builds on.`},
  {question:`Give a real-world example of ${topic}.`,answer:"open",hint:"Think about everyday life.",explanation:`${topic} appears in many places in daily life.`},
  {question:`What is the most important rule in ${topic}?`,answer:"open",hint:"Think about the key formula or principle.",explanation:`Every topic has a core rule. Knowing it is half the battle.`},
  {question:`How does ${topic} connect to something you already know?`,answer:"open",hint:"Connect it to something familiar.",explanation:`Making connections between new and familiar concepts is key to understanding.`},
  {question:`If you had to teach ${topic} to a friend, what would you say first?`,answer:"open",hint:"Start with the simplest explanation.",explanation:`Teaching a concept shows true mastery. Keep it simple.`},
]});
export const FB_MASTERY = (topic,p)=>({
  pages:[
    {
      emoji:"🌍",
      title:"Real World",
      body:`Professionals in ${p} rely on ${topic} every day to make better decisions and improve performance.`
    },
    {
      emoji:"💼",
      title:"Career Application",
      body:`Whether analysing matches, building technology, or solving real problems, ${topic} is an essential professional skill.`
    },
    {
      emoji:"🏆",
      title:"You've Mastered It!",
      body:`Congratulations! You completed Introduction, Deep Dive, Challenge and Mastery. You now understand how ${topic} works both in school and in the real world.`
    }
  ]
});


/**
 * Generates challenge questions — ALL questions set in the passion's world
 * @param {string} passion - Student passion for ALL question context
 * @param {string} subject - Subject
 * @param {string} topic - Topic being tested
 * @param {string} cls - Class grade
 * @param {string} difficulty - easy | medium | hard | extreme
 * @returns {Promise<Object>} Questions array fully themed around passion
 */
export async function fetchChallenge(passion, subject, topic, cls, difficulty) {
  const diffDesc = {
    easy:    "Single step. Direct recall.",
    medium:  "2-3 steps. Applying the concept.",
    hard:    "Multi-step. Deeper thinking.",
    extreme: "Multiple concepts combined. Full scenario with data.",
  }[difficulty] || "medium difficulty";

  return callAI(`TASK: Create 5 ${difficulty.toUpperCase()} practice questions about "${topic}" in ${subject} for Class ${cls}, following your generation procedure.

For EACH question: find a specific ${passion} scenario where this exact concept is naturally needed (use your raw material numbers), run the self-check (would this work identically for a different passion? if yes, get more specific), then write the question living inside that scenario.
Difficulty: ${diffDesc}

Each of the 5 questions must be a DIFFERENT ${passion} situation — not the same setup with different numbers.

Return ONLY valid JSON, no markdown:
{
  "questions": [
    {
      "question": "[A specific, concept-native ${passion} scenario with real numbers requiring ${topic} to solve]",
      "answer": "[exact short answer with units]",
      "hint": "[hint using the same ${passion} scenario, no direct answer]",
      "explanation": "[step-by-step solution explained inside the scenario, then naming the textbook formula]"
    },
    { "question": "...", "answer": "...", "hint": "...", "explanation": "..." },
    { "question": "...", "answer": "...", "hint": "...", "explanation": "..." },
    { "question": "...", "answer": "...", "hint": "...", "explanation": "..." },
    { "question": "...", "answer": "...", "hint": "...", "explanation": "..." }
  ]
}
All 5 must be distinct, specific ${passion} scenarios — none should still make sense if you swapped the passion for another one. Curriculum-accurate for Class ${cls} ${subject}.`, 900, passion, topic);
}

