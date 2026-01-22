import { api } from "../../lib/api";
import type { BetCreateFormValues } from "./betCreateSchema";

export async function createBet(payload: BetCreateFormValues) {
  const { data } = await api.post("/bets", payload);
  return data; // luego si quieres lo validamos con un betOutSchema
}
