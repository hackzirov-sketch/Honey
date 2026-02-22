import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const user = await storage.createUser(userData);
      // In a real app, set session here
      res.json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await storage.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // In a real app, set session here
    res.json(user);
  });

  app.post("/api/chat", async (req, res) => {
    if (!ai) return res.status(500).json({ message: "Gemini API key not configured" });
    
    const { message, systemInstruction } = req.body;
    try {
        const response = await ai.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            systemInstruction: systemInstruction || "Siz Honey platformasining aqlli yordamchisiz.",
        }).generateContent(message);
        
        res.json({ text: response.response.text() });
    } catch (error: any) {
        console.error("Gemini Error:", error);
        res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/search", async (req, res) => {
    if (!ai) return res.status(500).json({ message: "Gemini API key not configured" });

    const { query } = req.body;
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: `Search for safe, educational content about: ${query}.` }] }],
            tools: [{ googleSearchRetrieval: {} } as any]
        });
        
        res.json({ 
            text: response.response.text(),
            sources: (response.response as any).candidates?.[0]?.groundingMetadata?.groundingChunks || []
        });
    } catch (error: any) {
        console.error("Search Error:", error);
        res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/improve", async (req, res) => {
      if (!ai) return res.status(500).json({ message: "Gemini API key not configured" });
      const { text } = req.body;
      try {
          const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
          const response = await model.generateContent(`Quyidagi matnni tahrirlab ber: "${text}"`);
          res.json({ text: response.response.text() });
      } catch (error: any) {
          res.status(500).json({ message: error.message });
      }
  });

  return httpServer;
}
