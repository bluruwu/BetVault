import {z} from "zod";

export const betCreateSchema = z.object({
    home_team: z.string().min(1).max(80),
    away_team: z.string().min(1).max(80),

    market_type: z.enum([
        "MATCH_RESULT",
        "HANDICAP",
        "CORNERS",
        "CARDS",
        "PLAYER_SHOTS",
        "GOALS",
        "PLAYER_SHOTS_TARGET",
        "PLAYER_GOALS",
    ]),

    target_scope: z
        .enum(["MATCH", "HOME_TEAM", "AWAY_TEAM"])
        .default("MATCH"),

    selection: z.string().min(1).max(120),
    selection_details: z.string().nullish(),

    odds: z.coerce.number().gt(1.0, "Odds must be > 1.0"),

    line: z
    .union([z.coerce.number(), z.nan()])
    .optional()
    .transform((v) => (typeof v === "number" && !Number.isNaN(v) ? v : null))
    .default(null),

    stake: z.coerce.number().gt(0, "Stake must be > 0"),

    status: z.enum(["PENDING", "WON", "LOST", "VOID"]).default("PENDING"),
    created_at: z.string().optional(),

});

export type BetCreateFormValues = z.output<typeof betCreateSchema>
