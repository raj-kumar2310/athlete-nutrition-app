import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Camera, X, AlertTriangle, Activity,
  Apple, Dumbbell, Clock, ChevronDown, ChevronUp,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useUserStore } from "../stores/userStore";
import {
  aiConfig,
  buildAiChatUrl,
  getAiErrorMessage,
  getAiHeaders,
  isAiApiKeyConfigured,
} from "../config/aiConfig";
import BottomNav from "../components/BottomNav";

function Section({ title, icon, color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const { bg2, border, text, text3 } = useTheme();
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: bg2, border: `1px solid ${color}33`, borderRadius: 16, marginBottom: 12, overflow: "hidden", transition: "all 0.3s" }}>
      <button onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", padding: "16px 20px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icon}
        </div>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: text, flex: 1, letterSpacing: 0.3 }}>
          {title}
        </span>
        {open ? <ChevronUp size={16} color={text3} /> : <ChevronDown size={16} color={text3} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}>
            <div style={{ padding: "0 20px 20px" }}>
              <div style={{ height: 1, background: `${color}22`, marginBottom: 16 }} />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{ background: `${color}15`, border: `1px solid ${color}33`, borderRadius: 8, padding: "5px 12px", color, fontSize: 12, fontFamily: "'Barlow', sans-serif" }}>
      {label}
    </span>
  );
}

function ExerciseCard({ ex, color, text, text2 }) {
  return (
    <div style={{ background: `${color}08`, border: `1px solid ${color}22`, borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color, letterSpacing: 0.3 }}>{ex.name}</span>
        <span style={{ background: `${color}20`, borderRadius: 6, padding: "2px 8px", color, fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>{ex.sets}</span>
      </div>
      <p style={{ color: text2, fontSize: 12, margin: "0 0 6px", lineHeight: 1.5 }}>{ex.desc}</p>
      {ex.tip && <p style={{ color, fontSize: 11, margin: 0, fontStyle: "italic" }}>💡 {ex.tip}</p>}
    </div>
  );
}

function parseResponse(raw) {
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

export default function InjuryAssistant() {
  const navigate = useNavigate();
  const { name, sport, weight, age, gender } = useUserStore();
  const { bg, bg2, bg3, border, text, text2, text3, input } = useTheme();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const analyse = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const athleteCtx = `Athlete profile: name=${name || "Unknown"}, sport=${sport || "General"}, weight=${weight || "?"}kg, age=${age || "?"}, gender=${gender || "?"}.`;

    const systemPrompt = `You are an expert sports physiotherapist and nutritionist AI assistant inside an athlete nutrition app.
Analyze the athlete's injury description and return a DETAILED recovery plan.
ALWAYS respond with ONLY valid JSON in this exact structure (no markdown, no extra text):
{
  "injuryName": "string",
  "severity": "Mild",
  "severityColor": "#00E676",
  "bodyPart": "string",
  "description": "string - 2-3 sentences",
  "doctorWarning": false,
  "doctorMessage": "string or empty",
  "recoveryDays": { "min": 7, "max": 14 },
  "phases": [
    { "name": "string", "days": "Day 1-3", "focus": "string" }
  ],
  "nutrition": {
    "antiInflammatory": ["food1", "food2"],
    "proteinSources": ["food1", "food2"],
    "vitamins": ["Vitamin C - citrus"],
    "avoid": ["food1"],
    "hydration": "string tip"
  },
  "rehabExercises": [
    {
      "phase": "Phase 1 - Acute",
      "exercises": [
        { "name": "string", "sets": "3x10", "desc": "string", "tip": "string or null" }
      ]
    },
    { "phase": "Phase 2 - Strengthening", "exercises": [] },
    { "phase": "Phase 3 - Return to Sport", "exercises": [] }
  ],
  "doList": ["string"],
  "dontList": ["string"]
}`;

    try {
      if (!isAiApiKeyConfigured()) {
        setError('AI service temporarily unavailable. Please try again later.')
        return
      }

      const res = await fetch(buildAiChatUrl(), {
        method: 'POST',
        headers: getAiHeaders(),
        body: JSON.stringify({
          model: aiConfig.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: athleteCtx + '\n\nInjury description: ' + description }
          ],
          temperature: 0.3,
          response_format: { type: 'json_object' }
        })
      });

      if (!res.ok) {
        let body
        try { body = await res.json() } catch { body = await res.text() }
        console.error('API error response:', res.status, body)

        setError(getAiErrorMessage(res.status, body))
        return
      }

      let data
      try {
        data = await res.json()
      } catch {
        setError('AI service returned an invalid response. Please try again later.')
        return
      }

      const raw = data.choices?.[0]?.message?.content || '';
      const parsed = parseResponse(raw);

      if (parsed) {
        setResult(parsed);
      } else {
        setError('AI service returned an invalid response. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setError('AI service temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: bg, paddingBottom: 100, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "56px 24px 24px" }}>

        <button onClick={() => navigate("/home")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
        </button>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,48,87,0.1)", border: "1px solid rgba(255,48,87,0.3)", borderRadius: 100, padding: "6px 14px", marginBottom: 16 }}>
          <Activity size={12} color="#FF3057" />
          <span style={{ color: "#FF3057", fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>AI PHYSIO ASSISTANT</span>
        </div>

        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: "0 0 8px" }}>
          Injury<br /><span style={{ color: "#FF3057" }}>Analyzer</span>
        </h1>
        <p style={{ color: text3, fontSize: 13, marginBottom: 28, lineHeight: 1.5 }}>
          Describe your injury. Get a full recovery plan with nutrition, rehab exercises & timeline.
        </p>

        {/* Input Card */}
        <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 20, padding: 20, marginBottom: 16, transition: "all 0.3s" }}>
          <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", display: "block", marginBottom: 10 }}>
            Describe Your Injury
          </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. I was running and felt a sharp pain in my hamstring. Pain is moderate, especially when bending my knee..."
            rows={4}
            style={{ width: "100%", background: input, border: `1px solid ${border}`, borderRadius: 12, padding: "14px", color: text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.6, transition: "all 0.3s" }}
            onFocus={(e) => (e.target.style.borderColor = "#FF305766")}
            onBlur={(e) => (e.target.style.borderColor = border)}
          />

          <div style={{ marginTop: 14 }}>
            <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", display: "block", marginBottom: 10 }}>
              Add Photo (Optional)
            </label>
            {imagePreview ? (
              <div style={{ position: "relative" }}>
                <img src={imagePreview} alt="injury" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 12, border: `1px solid ${border}` }} />
                <button onClick={() => { setImage(null); setImagePreview(null); }}
                  style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={14} color="#fff" />
                </button>
              </div>
            ) : (
              <button onClick={() => fileRef.current?.click()}
                style={{ width: "100%", padding: "20px", background: input, border: `2px dashed ${border}`, borderRadius: 12, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FF305766")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}>
                <Camera size={24} color={text3} />
                <span style={{ color: text3, fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>TAP TO ADD PHOTO</span>
                <span style={{ color: text3, fontSize: 11, opacity: 0.6 }}>Photo reference for injury area</span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
          </div>

          <motion.button whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }} onClick={analyse}
            disabled={!description.trim() || loading}
            style={{
              width: "100%", padding: "16px", marginTop: 16,
              background: !description.trim() || loading ? bg3 : "linear-gradient(135deg, #FF3057, #FF6B6B)",
              border: "none", borderRadius: 12,
              cursor: !description.trim() || loading ? "not-allowed" : "pointer",
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800,
              letterSpacing: 2, color: !description.trim() || loading ? text3 : "#fff",
              textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "all 0.3s",
            }}>
            {loading ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff" }} />
                Analyzing Injury...
              </>
            ) : (
              <><Activity size={18} /> Analyze Injury</>
            )}
          </motion.button>
        </div>

        {error && (
          <div style={{ background: "rgba(255,48,87,0.1)", border: "1px solid rgba(255,48,87,0.3)", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
            <span style={{ color: "#FF3057", fontSize: 13 }}>{error}</span>
          </div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Injury Summary */}
              <div style={{ background: bg2, border: `1px solid ${result.severityColor}44`, borderRadius: 20, padding: 20, marginBottom: 12, transition: "all 0.3s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", margin: "0 0 4px" }}>Diagnosed Injury</p>
                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, color: text, margin: "0 0 6px", lineHeight: 1.1 }}>{result.injuryName}</h2>
                    <p style={{ color: text2, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{result.description}</p>
                  </div>
                  <div style={{ background: `${result.severityColor}20`, border: `1px solid ${result.severityColor}44`, borderRadius: 12, padding: "8px 14px", textAlign: "center", marginLeft: 12, flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 900, color: result.severityColor }}>{result.severity}</div>
                    <div style={{ color: text3, fontSize: 10, letterSpacing: 1 }}>SEVERITY</div>
                  </div>
                </div>
                <div style={{ background: bg3, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <Clock size={16} color={result.severityColor} />
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: result.severityColor }}>{result.recoveryDays.min}–{result.recoveryDays.max} days</span>
                  <span style={{ color: text3, fontSize: 12 }}>estimated recovery</span>
                </div>
              </div>

              {result.doctorWarning && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: "rgba(255,48,87,0.08)", border: "1px solid rgba(255,48,87,0.4)", borderRadius: 16, padding: "16px 20px", marginBottom: 12, display: "flex", gap: 12 }}>
                  <AlertTriangle size={20} color="#FF3057" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: "#FF3057", marginBottom: 4 }}>⚠️ See a Doctor</div>
                    <p style={{ color: text2, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{result.doctorMessage}</p>
                  </div>
                </motion.div>
              )}

              <Section title="Recovery Timeline" icon={<Clock size={16} color="#FFB347" />} color="#FFB347" defaultOpen>
                {result.phases.map((phase, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < result.phases.length - 1 ? 14 : 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FFB34720", border: "2px solid #FFB347", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "#FFB347", fontSize: 12, fontWeight: 800 }}>{i + 1}</span>
                      </div>
                      {i < result.phases.length - 1 && <div style={{ width: 2, flex: 1, background: "#FFB34730", marginTop: 4 }} />}
                    </div>
                    <div style={{ paddingBottom: 14 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: text }}>{phase.name}</div>
                      <div style={{ color: "#FFB347", fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>{phase.days}</div>
                      <div style={{ color: text2, fontSize: 13, lineHeight: 1.5 }}>{phase.focus}</div>
                    </div>
                  </div>
                ))}
              </Section>

              <Section title="Recovery Nutrition" icon={<Apple size={16} color="#00E676" />} color="#00E676" defaultOpen>
                {[
                  { label: "Anti-Inflammatory Foods", color: "#00E676", items: result.nutrition.antiInflammatory },
                  { label: "Protein Sources",         color: "#FF4D00", items: result.nutrition.proteinSources },
                  { label: "Vitamins & Supplements",  color: "#4FC3F7", items: result.nutrition.vitamins },
                  { label: "❌ Avoid",                color: "#FF3057", items: result.nutrition.avoid },
                ].map((section) => (
                  <div key={section.label} style={{ marginBottom: 14 }}>
                    <p style={{ color: section.color, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>{section.label}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {section.items.map((f) => <Tag key={f} label={f} color={section.color} />)}
                    </div>
                  </div>
                ))}
                <div style={{ background: "rgba(79,195,247,0.08)", border: "1px solid rgba(79,195,247,0.2)", borderRadius: 10, padding: "10px 14px" }}>
                  <span style={{ color: "#4FC3F7", fontSize: 13 }}>💧 {result.nutrition.hydration}</span>
                </div>
              </Section>

              <Section title="Rehab Exercises" icon={<Dumbbell size={16} color="#FF4D00" />} color="#FF4D00" defaultOpen>
                {result.rehabExercises.map((phase, pi) => (
                  <div key={pi} style={{ marginBottom: pi < result.rehabExercises.length - 1 ? 20 : 0 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: "#FF4D00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{phase.phase}</div>
                    {phase.exercises.map((ex, ei) => <ExerciseCard key={ei} ex={ex} color="#FF4D00" text={text} text2={text2} />)}
                  </div>
                ))}
              </Section>

              <Section title="Do's & Don'ts" icon={<Activity size={16} color="#CE93D8" />} color="#CE93D8">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <p style={{ color: "#00E676", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 10 }}>✅ Do</p>
                    {result.doList.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E676", marginTop: 5, flexShrink: 0 }} />
                        <span style={{ color: text2, fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ color: "#FF3057", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 10 }}>❌ Don't</p>
                    {result.dontList.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF3057", marginTop: 5, flexShrink: 0 }} />
                        <span style={{ color: text2, fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>

              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => { setResult(null); setDescription(""); setImage(null); setImagePreview(null); }}
                style={{ width: "100%", padding: "14px", background: "transparent", border: `1px solid ${border}`, borderRadius: 12, cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: 2, color: text3, textTransform: "uppercase", marginTop: 4 }}>
                Analyze New Injury
              </motion.button>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}