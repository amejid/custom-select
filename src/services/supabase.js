import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://iywmgbrtdbstpajayjuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5d21nYnJ0ZGJzdHBhamF5anVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExNTk5MTIsImV4cCI6MjAxNjczNTkxMn0.mTspbF0N3YXcjK-7e5uEJ933jVxaSxPvuc61I5D9EPM";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
