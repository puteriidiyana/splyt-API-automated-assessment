import request from "supertest";
import { BASE_URL } from "../config";

export const api = request(BASE_URL);
