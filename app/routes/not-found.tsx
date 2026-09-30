import { Container } from "~/components/layout";
import { ButtonLink, Heading } from "~/components/ui";

// Placeholder. The full 404 page, served with a 404 status on Vercel, comes later.
export default function NotFound() {
  return (
    <Container className="py-section">
      <Heading level={1}>Page not found</Heading>
      <ButtonLink to="/" className="mt-10">
        Back to home
      </ButtonLink>
    </Container>
  );
}
