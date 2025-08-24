import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * Global 404 page that automatically redirects users to the home page.
 * This provides a clean user experience by preventing users from seeing
 * error pages and instead taking them back to the main application.
 */
export default async function NotFound() {
  // Get the current path that was trying to be reached
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("referer") ?? "unknown";
  
  // Log the 404 error with the attempted path for monitoring
  console.log(`404 - Page not found: ${pathname}, redirecting to dashboard`);
  
  // Redirect to home page immediately
  redirect("/dashboard");
}
