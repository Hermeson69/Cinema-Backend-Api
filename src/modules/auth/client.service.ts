import JWTservice from "../../core/jwt.service";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

import {
  ClientCreate,
  ClientResponse,
  LoginData,
  SignupData,
  AuthResponse,
  CreateClient,
  LoginSchema,
  SignupSchema,
  ClentResponseSchema,
  AuthResponseSchema,
} from "./client.schema";
import SecurityUtils from "../../core/security";

export default class ClientService {
  private clientRepository: ClientRepository;
  private jwtService: JWTservice;

  constructor(clientRepository: ClientRepository, jwtService: JWTservice) {
    this.clientRepository = clientRepository;
    this.jwtService = jwtService;
  }

  async createClient(data: ClientCreate): Promise<ClientResponse> {
    const validatedData = CreateClient.parse(data);
    const existingClient = await this.clientRepository.getByEmail(
      validatedData.email,
    );
    if (existingClient) {
      throw new Error("Email already in use");
    }

    validatedData.password = await SecurityUtils.hashPassword(
      validatedData.password,
    );

    const model = ClientModel.fromCreateData(validatedData);
    const createdClient = await this.clientRepository.create(model);
    return ClentResponseSchema.parse(createdClient);
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const validateData = CreateClient.parse(data);
    const client = await this.clientRepository.getByEmail(validateData.email);

    if (!client) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await SecurityUtils.comparePassword(
      validateData.password,
      client.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = this.jwtService.generateToken({
      id: client.id,
      email: client.email,
    });

    return AuthResponseSchema.parse({
      token,
      client: { id: client.id, email: client.email },
    });
  }

  async getAllClients(): Promise<ClientResponse[]> {
    const clients = await this.clientRepository.getall();
    return clients.map((client: ClientModel) =>
      ClentResponseSchema.parse(client),
    );
  }

  async getClientById(id: number): Promise<ClientResponse> {
    const client = await this.clientRepository.getById(id);
    if (!client) {
      throw new Error("Client not found");
    }
    return ClentResponseSchema.parse(client);
  }

  async getClientByEmail(email: string): Promise<ClientResponse> {
    const client = await this.clientRepository.getByEmail(email);
    if (!client) {
      throw new Error("Client not found");
    }
    return ClentResponseSchema.parse(client);
  }

  async updateClient(
    id: number,
    data: Partial<ClientCreate>,
  ): Promise<ClientResponse> {
    const client = await this.clientRepository.getById(id);
    if (!client) {
      throw new Error("Client not found");
    }

    if (data.password) {
      data.password = await SecurityUtils.hashPassword(data.password);
    }

    if (data.email) client.email = data.email;
    if (data.name) client.name = data.name;
    if (data.password) client.password = data.password;
    client.updatedAt = new Date().toISOString();
    const updatedClient = await this.clientRepository.update(client);
    return ClentResponseSchema.parse(updatedClient);
  }

  async deleteClient(id: number): Promise<void> {
    const client = await this.clientRepository.getById(id);
    if (!client) {
      throw new Error("Client not found");
    }
    await this.clientRepository.delete(id);
  }
}
