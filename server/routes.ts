import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, type User } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware pour vérifier le JWT
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès requis' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Route d'inscription
  app.post('/api/register', async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ 
          error: 'Nom d\'utilisateur déjà pris',
          field: 'username'
        });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Créer l'utilisateur
      const user = await storage.createUser({
        username: validatedData.username,
        password: hashedPassword
      });

      // Générer un token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        user: { id: user.id, username: user.username },
        token
      });
    } catch (error: any) {
      if (error.errors) {
        // Erreur de validation Zod
        return res.status(400).json({
          error: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      res.status(500).json({ error: 'Erreur lors de la création du compte' });
    }
  });

  // Route de connexion
  app.post('/api/login', async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Trouver l'utilisateur
      const user = await storage.getUserByUsername(validatedData.username);
      if (!user) {
        return res.status(400).json({ 
          error: 'Nom d\'utilisateur ou mot de passe incorrect',
          field: 'username'
        });
      }

      // Vérifier le mot de passe
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ 
          error: 'Nom d\'utilisateur ou mot de passe incorrect',
          field: 'password'
        });
      }

      // Générer un token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        user: { id: user.id, username: user.username },
        token
      });
    } catch (error: any) {
      if (error.errors) {
        return res.status(400).json({
          error: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  });

  // Route pour récupérer les infos utilisateur
  app.get('/api/user', authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
