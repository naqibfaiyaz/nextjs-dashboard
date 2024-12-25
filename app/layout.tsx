import "@/app/ui/global.css"; // Import global styles including Tailwind
import { ReactNode, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/app/uilib/utils";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import Image from "next/image";

export default function RootLayout({ children }: { children: ReactNode }) {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description: "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description: "For sighted users to preview content available behind a link.",
    },
    // Add other components...
  ];

  const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
      return (
        <li>
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
            </a>
          </NavigationMenuLink>
        </li>
      );
    }
  );
  ListItem.displayName = "ListItem";

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b bg-white">
          <div className="hidden sm:block">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
              {/* Logo */}
              <Link href="/" className="flex items-center text-lg font-semibold">
                <Image
                  src="/leasesafely_logo_blue.png"
                  alt="Lease Safely Logo"
                  className="h-8 w-48 mr-2"
                />
              </Link>

              {/* Desktop Navigation */}
              <div>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Beautifully designed components built with Radix UI and Tailwind CSS.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <ListItem href="/docs" title="Introduction">
                            Re-usable components built using Radix UI and Tailwind CSS.
                          </ListItem>
                          <ListItem href="/docs/installation" title="Installation">
                            How to install dependencies and structure your app.
                          </ListItem>
                          <ListItem href="/docs/primitives/typography" title="Typography">
                            Styles for headings, paragraphs, lists...etc.
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {components.map((component) => (
                            <ListItem key={component.title} title={component.title} href={component.href}>
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              {/* CTA Buttons */}
              <div className="space-x-2 flex flex-wrap">
                <Link href="/login" className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600">
                  Landlord Login
                </Link>
                <Link href="/signup" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Landlord Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Hamburger Menu */}

          <div className="sm:hidden">
            <div className="container mx-auto flex justify-between py-4 px-6">
              <Link href="/" className="flex text-lg font-semibold">
                <Image
                  src="/leasesafely_logo_blue.png"
                  alt="Lease Safely Logo"
                  className="h-8 w-48 mr-2"
                />
              </Link>
              {/* <button className="text-gray-700 hover:text-blue-600">☰</button> */}
              <SidebarProvider className="min-h-0 w-auto">
                <AppSidebar />
                <SidebarTrigger className="flex items-end" />
              </SidebarProvider>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto py-6 px-6">{children}</main>

        {/* Footer */}
        <footer className="bg-blue-950 text-white py-6">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Section */}
            <div>
              <h4 className="text-lg font-semibold">For Landlords</h4>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/premium" className="hover:underline">
                    Premium Plan
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:underline">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/academy" className="hover:underline">
                    Academy
                  </Link>
                </li>
                <li>
                  <Link href="/help-center" className="hover:underline">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Middle Section */}
            <div>
              <h4 className="text-lg font-semibold">Lease Safely</h4>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:underline">
                    Lease Safely Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Section */}
            {/* <div> */}
            {/* <p className="text-sm">Created in Sunny Colorado</p> */}
            {/* <ul className="flex mt-4 space-x-4">
                <li>
                  <Link href="/social/twitter" className="hover:underline">
                    <img src="/icons/twitter.svg" alt="Twitter" className="h-5 w-5" />
                  </Link>
                </li>
                <li>
                  <Link href="/social/facebook" className="hover:underline">
                    <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
                  </Link>
                </li>
                <li>
                  <Link href="/social/youtube" className="hover:underline">
                    <img src="/icons/youtube.svg" alt="YouTube" className="h-5 w-5" />
                  </Link>
                </li>
              </ul> */}
            {/* </div> */}
          </div>
        </footer>
      </body>
    </html>
  );
}
