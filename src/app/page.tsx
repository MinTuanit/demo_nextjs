import HomePage from "@/components/layout/homepage";
import { auth } from "@/auth"

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <div>
        {JSON.stringify(session)}
      </div>
      <HomePage />
    </div>
  );
}
