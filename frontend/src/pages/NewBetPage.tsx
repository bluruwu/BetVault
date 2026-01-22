import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import BetForm from "../features/bets/BetForm";
import type { BetCreateFormValues } from "../features/bets/betCreateSchema";
import { createBet } from "../features/bets/api";

function getApiErrorMessage(err: unknown) {
  // Manejo simple de errores de axios sin importar version
  if (typeof err === "object" && err !== null && "message" in err) {
    const msg = (err as any).message;
    return typeof msg === "string" ? msg : "Error";
  }
  return "Error";
}

export default function NewBetPage() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values: BetCreateFormValues) => {
      // Limpieza antes de enviar
      const payload = {
        ...values,
        // si created_at viene "", el register lo convierte a undefined (por setValueAs),
        // pero igual dejamos el guard por seguridad:
        created_at: values.created_at || undefined,
        // si selection_details viene null, ok. si viene "", mejor null:
        selection_details: values.selection_details ?? null,
      } as BetCreateFormValues;

      return createBet(payload);
    },
    onSuccess: () => {
      navigate("/bets");
    },
  });

  return (
    <div style={{ padding: 24 }}>
      <h2>New bet</h2>
      <p>
        <Link to="/bets">← Back to bets</Link>
      </p>

      {mutation.isError && (
        <div style={{ color: "crimson", marginBottom: 12 }}>
          {getApiErrorMessage(mutation.error)}
        </div>
      )}

      <BetForm
        onSubmit={(values) => mutation.mutate(values)}
        isSubmitting={mutation.isPending}
        submitLabel="Create bet"
      />
    </div>
  );
}
