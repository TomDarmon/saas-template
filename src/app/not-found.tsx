import { redirect } from "next/navigation";

/**
 * Global 404 page that automatically redirects users to the home page.
 * This provides a clean user experience by preventing users from seeing
 * error pages and instead taking them back to the main application.
 */
export default function NotFound() {
  // Redirect to home page immediately
  redirect("/dashboard");
}
