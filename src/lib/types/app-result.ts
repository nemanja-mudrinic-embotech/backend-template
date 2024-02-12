import { InternalException } from "../exceptions/internal.exception";
import type { Result } from "../utils/result/result.ts";

export type AppResult<T> = Result<InternalException, T>;

export type AppPromise<T> = Promise<AppResult<T>>;