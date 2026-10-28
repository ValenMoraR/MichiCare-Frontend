"use client";

import { useState } from "react";
import type { ProductInput } from "../domain/product";
import * as productsService from "../services/products.service";

export function useProductMutations() {
  const [busy, setBusy] = useState(false);

  async function run<T>(action: () => Promise<T>): Promise<T> {
    setBusy(true);
    try {
      return await action();
    } finally {
      setBusy(false);
    }
  }

  return {
    busy,
    create: (data: ProductInput) =>
      run(() => productsService.createProduct(data)),
    update: (id: number, data: ProductInput) =>
      run(() => productsService.updateProduct(id, data)),
    remove: (id: number) => run(() => productsService.deleteProduct(id)),
  };
}