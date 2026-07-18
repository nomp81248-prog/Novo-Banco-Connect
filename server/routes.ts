import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, setupAuth } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  // LOGIN
  app.post(api.auth.login.path, async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Identifiant et mot de passe requis" });
      }

      const user = await storage.getUserByUsername(username.trim());

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
      }

      // Store user in session
      req.session.userId = user.id;

      // Return user immediately — session saves asynchronously
      return res.status(200).json(user);

    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ME
  app.get(api.auth.me.path, async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "Non authentifié" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error("Me error:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // LOGOUT
  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.status(200).json({ success: true });
    });
  });

  return httpServer;
}
