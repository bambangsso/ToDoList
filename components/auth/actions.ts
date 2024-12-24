"use server";

import { createClient } from "@/lib/supabase/server"; 

export async function signOut() {
    const supabase = await createClient();
    const result = await supabase.auth.signOut();
    console.log('logoutAction: ', result)
}

export async function signUp(email: string, password: string, emailRedirectTo: string) {
    const supabase = await createClient();
    const result = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: emailRedirectTo,
      },
    });
    console.log('--------->:', JSON.stringify(result))
    return JSON.stringify(result);
  }
  
  export async function signInWithPassword(email: string, password: string) {
    const supabase = await createClient();
    const result = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log('--------->:', JSON.stringify(result))
    return JSON.stringify(result);
  }