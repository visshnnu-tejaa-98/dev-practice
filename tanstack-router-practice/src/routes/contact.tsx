import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Contact Page</h1>
      <button onClick={() => navigate({ to: "/about" })}>
        Navigate to About
      </button>
    </div>
  );
}
