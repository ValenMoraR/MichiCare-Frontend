"use client";

import { useState } from "react";
import type { CreateInteractionRequest } from "../domain/interaction";
import * as interactionsService from "../services/interactions.service";

export function useCreateInteraction() {
  const [submitting, setSubmitting] = useState(false);

  async function create(data: CreateInteractionRequest) {
    setSubmitting(true);
    try {
      return await interactionsService.createInteraction(data);
    } finally {
      setSubmitting(false);
    }
  }

  return { create, submitting };
}