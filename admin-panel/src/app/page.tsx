import { Button } from "@/components/ui/button"; // Adjust import path if needed

export default function HomePage() {
  return (
    <div className="p-4"> {/* Using a Tailwind utility class */}
      <h1 className="text-xl font-bold mb-4">Welcome</h1> {/* More Tailwind */}
      <Button>Click Me (Shadcn Button)</Button> {/* Using Shadcn component */}
    </div>
  );
}