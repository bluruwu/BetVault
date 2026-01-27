import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import BetForm from "../features/bets/BetForm";
import type { BetCreateFormValues } from "../features/bets/betCreateSchema";
import { createBet } from "../features/bets/api";

function getApiErrorMessage(err: unknown) {
  if (typeof err === "object" && err !== null && "message" in err) {
    const msg = (err as any).message;
    return typeof msg === "string" ? msg : "Unknown Error";
  }
  return "Connection Error";
}

export default function NewBetPage() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values: BetCreateFormValues) => {
      // 1. Handle Date + Time logic
      let finalDateString: string | undefined = undefined;

      if (values.created_at) {
        // User selected a date (YYYY-MM-DD string from input type="date")
        const selectedDate = new Date(values.created_at);
        const now = new Date();
        // Merge: Selected Date + Current Time
        selectedDate.setHours(now.getHours());
        selectedDate.setMinutes(now.getMinutes());
        selectedDate.setSeconds(now.getSeconds());
        finalDateString = selectedDate.toISOString();
      }

      // 2. Prepare Payload
      const payload = {
        ...values,
        created_at: finalDateString,
        selection_details: values.selection_details ?? null,
      } as BetCreateFormValues;
      return createBet(payload);
    },
    onSuccess: () => {
      navigate("/bets");
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto">

        {/* Navigation & Title */}
        <div className="mb-8">
          <Link
            to="/bets"
            className="inline-flex items-center text-sm text-gray-400 hover:text-emerald-400 transition-colors mb-4 group"
          >
            <svg
              className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to list
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create New Bet
          </h1>
        </div>

        {/* Error Banner */}
        {mutation.isError && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-800 flex items-center gap-3">
            <svg className="h-5 w-5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-200">Save Failed</h3>
              <p className="text-sm text-red-300 mt-1">
                {getApiErrorMessage(mutation.error)}
              </p>
            </div>
          </div>
        )}

        {/* Form Component */}
        <BetForm
          onSubmit={(values) => mutation.mutate(values)}
          isSubmitting={mutation.isPending}
          submitLabel="Save Bet"
        />
      </div>
    </div>
  );
}