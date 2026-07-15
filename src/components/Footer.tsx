import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-8 text-center text-xs text-slate-400">
      &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
    </footer>
  );
}
