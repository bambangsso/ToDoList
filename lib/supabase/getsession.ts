"use server";

import { createClient } from './server';

export default async function getUserSession() {
  const supabase = await createClient();
  return supabase.auth.getSession();
}