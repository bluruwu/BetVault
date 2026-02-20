import { api } from "../../lib/api";
import type { BetCreateFormValues } from "./betCreateSchema";
import type {BetOut, BetStatsOut, BetUpdate} from "./types.ts";

export async function createBet(payload: BetCreateFormValues): Promise<BetOut> {
  const { data } = await api.post<BetOut>("/bets", payload);
  return data;
}

export async function getBets(): Promise<BetOut[]>{
  const {data} = await api.get<BetOut[]>("/bets");
  return data;
}

export async function updateBet(id: number, payload: BetUpdate): Promise<BetOut>{
  const { data } = await api.patch<BetOut>(`/bets/${id}`, payload);
  return data
}

export async function getBetStats(): Promise<BetStatsOut>{
  const {data} = await api.get<BetStatsOut>("/bets/stats");
  return data;
}