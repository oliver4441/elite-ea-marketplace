import { createClient } from "./browser";

export const supabase = createClient();

export * from "../utils/helpers";
