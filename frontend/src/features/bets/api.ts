import { api } from "../../lib/api";
import type { BetCreateFormValues } from "./betCreateSchema";
import type {BetOut} from "./types.ts";

export async function createBet(payload: BetCreateFormValues): Promise<BetOut[]> {
  const { data } = await api.post<BetOut[]>("/bets", payload);
  return data; // luego si quieres lo validamos con un betOutSchema
}

export async function getBets(): Promise<BetOut[]>{
  const {data} = await api.get<BetOut[]>("/bets");
  return data;
}
