import { z } from 'zod';

export const createCurrencySwapSchema = (availableBalance: Record<string, number>) =>
  z
    .object({
      fromCurrencyInfo: z.object({
        currency: z.string(),
        date: z.string(),
        price: z.number()
      }),
      fromCurrencyAmt: z.coerce.number().gt(0, 'Amount must be greater than 0') as z.ZodNumber,
      toCurrencyInfo: z.object({
        currency: z.string(),
        date: z.string(),
        price: z.number()
      }),
      toCurrencyAmt: z.number().optional()
    })
    .refine(
      data => {
        const balance = availableBalance[data.fromCurrencyInfo.currency] || 0;
        return data.fromCurrencyAmt <= balance;
      },
      {
        message: 'Amount cannot exceed balance',
        path: ['fromCurrencyAmt']
      }
    );

export type TCurrencySwapFormData = z.infer<ReturnType<typeof createCurrencySwapSchema>>;
