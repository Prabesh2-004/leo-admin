import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export default async function Logout(req: NextRequest) {
  const supabase = await createClient();

  const { data: claimsData } = await supabase.auth.getClaims();

  if (claimsData?.claims) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/login", req.nextUrl), {
    status: 302,
  });
}
