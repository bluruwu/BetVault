import { api } from "../../../lib/api";
import type { BetCreateFormValues } from "../types/betCreateSchema";
import type { BetOut, BetStatsOut, BetUpdate } from "../types/types";

export async function createBet(payload: BetCreateFormValues): Promise<BetOut> {
  const { data } = await api.post<BetOut>("/bets", payload);
  return data;
}

export async function getBets(): Promise<BetOut[]> {
  const { data } = await api.get<BetOut[]>("/bets");
  return data;
}

export async function updateBet(id: number, payload: BetUpdate): Promise<BetOut> {
  const { data } = await api.patch<BetOut>(`/bets/${id}`, payload);
  return data
}

export async function getBetStats(): Promise<BetStatsOut> {
  const { data } = await api.get<BetStatsOut>("/bets/stats");
  return data;
}

export async function deleteBet(id: number): Promise<void> {
  await api.delete(`/bets/${id}`);
}