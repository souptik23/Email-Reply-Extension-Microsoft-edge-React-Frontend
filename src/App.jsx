import { useState } from "react";
import "./App.css";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://email-reply-extension-microsoft-edge-ddop.onrender.com/api/mail/generate",
        {
          emailContent,
          tone,
        }
      );
      setGeneratedEmail(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error generating email");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-4 sm:py-8 md:py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="backdrop-blur-lg bg-white bg-opacity-10 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-white border-opacity-20">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Email Reply Generator
                </span>
              </h1>
              <p className="text-sm sm:text-base text-white text-opacity-80 mt-2">
                Create professional email responses in seconds
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* Email Content Input */}
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Email Content"
                variant="outlined"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "0.75rem",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a855f7",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#8b5cf6",
                      borderWidth: "2px",
                    },
                  },
                }}
              />

              {/* Tone Selection */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tone (Optional)</InputLabel>
                <Select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  label="Tone (Optional)"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "0.75rem",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a855f7",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#8b5cf6",
                      borderWidth: "2px",
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Friendly">Friendly</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Casual">Casual</MenuItem>
                  <MenuItem value="Formal">Formal</MenuItem>
                  <MenuItem value="Apologetic">Apologetic</MenuItem>
                  <MenuItem value="Sympathetic">Sympathetic</MenuItem>
                  <MenuItem value="Sympathetic">Sarcasm</MenuItem>

                </Select>
              </FormControl>

              {/* Generate Reply Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading || !emailContent}
                  fullWidth
                  sx={{
                    padding: "0.75rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "#8b5cf6",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { backgroundColor: "#7c3aed" },
                    "&:disabled": {
                      backgroundColor: "rgba(139, 92, 246, 0.5)",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Generate Reply"
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-100"
              >
                {error}
              </motion.div>
            )}

            {/* Generated Email Response */}
            {generatedEmail && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white border-opacity-20"
              >
                <h2 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">
                  Generated Reply
                </h2>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={generatedEmail}
                  InputProps={{ readOnly: true }}
                  sx={{
                    whiteSpace: "pre-line",
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "0.75rem",
                    },
                  }}
                />
                {/* Copy Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigator.clipboard.writeText(generatedEmail)
                    }
                    disabled={!generatedEmail}
                    fullWidth
                    sx={{
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      backgroundColor: "#6366f1", // Indigo background
                      borderColor: "#4f46e5", // Slightly darker border
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "#4f46e5", // Darker on hover
                        borderColor: "#4338ca",
                      },
                      "&:disabled": {
                        backgroundColor: "rgba(99, 102, 241, 0.5)", // Faded when disabled
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      
      <div className="mt-6 md:mt-8 text-center text-white text-opacity-60 text-xs sm:text-sm">
        Made by{" "}
        <span className="font-semibold text-white">@Souptik Karan</span>
      </div>
    </div>
  );
}

export default App;
