import ClientService from "./client.service";

import {
  ClientCreate,
  ClientResponse,
  LoginData,
  SignupData,
  AuthResponse,
  LoginSchema,
} from "./client.schema";
import { Request, Response } from "express";
import { string } from "zod";

export default class ClientController {
  private clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  async createClient(req: Request, res: Response): Promise<void> {
    try {
      const data: ClientCreate = req.body;
      const clientResponse: ClientResponse =
        await this.clientService.createClient(data);
      res.status(201).json(clientResponse);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = LoginSchema.parse(req.body);
      const authResponse: AuthResponse =
        await this.clientService.login(validatedData);
      res.status(200).json(authResponse);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAllClients(req: Request, res: Response): Promise<void> {
    try {
      const clients: ClientResponse[] =
        await this.clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getClientById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const client: ClientResponse = await this.clientService.getClientById(id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      res.status(200).json(client);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateClient(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const data: ClientCreate = req.body;
      const updatedClient: ClientResponse =
        await this.clientService.updateClient(id, data);
      res.status(200).json(updatedClient);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteClient(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await this.clientService.deleteClient(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
