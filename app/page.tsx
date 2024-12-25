import { Button } from "@/app/components/ui/button"; // Assuming ShadCN's Button component is set up
import Image from "next/image";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselContent,
} from "@/app/components/ui/carousel";
import { Card, CardContent } from "@/app/components/ui/card";

export default function Page() {
  return (
    <>
      {/* First Section */}
      {/* <main className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between"> */}
      <section className="bg-blue-50 py-12 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-600">
            LANDLORD COMPLIANCE AND WORKFLOW SOLUTION
          </h2>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-gray-900">
            Stay {" "}
            <span className="text-blue-600">Legally Covered</span>
            . Enjoy stress-free land lordship
          </h1>
          <Button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium hover:bg-blue-700">
            Sign Up for Free
          </Button>
          <p className="mt-4 text-gray-700">
            Stay compliant with Landlord and Tenant Board (LTB) guidelines, mitigate legal and financial risks, automate important tasks—all in one intuitive platform
          </p>
        </div>

        {/* Right Section */}
        <div className="mt-10 md:mt-0 md:w-1/2 relative">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <video
              controls
              poster="/video-poster.png" // Replace with your actual poster image
              className="w-full h-auto rounded-lg"
            >
              <source src="/video.mp4" type="video/mp4" /> {/* Replace with your actual video */}
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              From Move-In to Move-Out: Your All-in-One Landlord Solution.
            </h2>
            <p className="mt-2 text-gray-700">
              LeaseSafely’s powerful platform empowers landlords of all sizes—whether managing a single unit or an entire portfolio—to simplify their rental process while staying compliant and protected.
              {/* {" "}
              <span className="font-semibold">half a million landlords</span>{" "}
              streamline their entire rental process for{" "}
              <span className="font-semibold">free</span> — whether they have
              one or 1,000 doors. */}
            </p>
            <Button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium hover:bg-blue-700">
              Create My Free Account
            </Button>
          </div>

          {/* Carousel */}
          <div className="mt-10">
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                }}
              // className="w-full max-w-sm"
              >
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-3xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Rental Process */}
      <section className="container mx-auto px-6 py-12 text-center bg-green-50">
        <h2 className="text-3xl font-bold text-gray-900">
          Where are you in your <span className="text-blue-600">landlord journey?</span>
        </h2>
        <p className="mt-2 text-gray-600">
          From first-time landlords to experienced residential investors, we
          help you keep your passive income, passive.
        </p>
        <div className="flex mt-6 justify-center gap-4 flex-col md:flex-row items-center">
          <Button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium hover:bg-blue-700">
            {`I'm Renting Out My Property`}
          </Button>
          <Button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium hover:bg-blue-700">
            {`I'm Managing a Dispute`}
          </Button>
        </div>
      </section>

      {/* Section 2: Marketing */}
      {/* <section className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Property Management Marketing
          </h3>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Post to dozens of <span className="text-blue-600">popular renter sites</span> at once
          </h2>
          <p className="mt-4 text-gray-700">
            Build a listing in less than 10 minutes, then push it across the web
            to collect high-intent leads. Our landlords average 28 leads per
            listing.
          </p>
          <p className="mt-4 text-sm font-medium text-gray-500">
            REPLACES: Print Ads | Manual Posting | Unorganized Leads
          </p>
          <a href="#" className="mt-4 text-blue-600 underline hover:no-underline">
            Explore how rental advertising works »
          </a>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/marketing-dashboard.png" // Replace with your actual image
            alt="Marketing Dashboard"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section> */}

      {/* Section 3: Tenant Screening */}
      <section className="container mx-auto px-6 py-12 flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="lg:w-1/2">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Tenant Screening Services & Reports
          </h3>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Carefully vet renters now to <span className="text-blue-600">prevent evictions</span> later
          </h2>
          <p className="mt-4 text-gray-700">
            Ask the right questions and gain insight into a potential tenant’s
            financial, criminal, and eviction history — $0 for landlords.
          </p>
          <p className="mt-4 text-sm font-medium text-gray-500">
            REPLACES: Google Forms | Paper Apps | Manual Screenings
          </p>
          <div className="mt-4">
            <a href="#" className="text-blue-600 underline hover:no-underline mr-4">
              Learn about online applications »
            </a>
            <a href="#" className="text-blue-600 underline hover:no-underline">
              Learn about tenant screening »
            </a>
          </div>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/tenant-screening.png" // Replace with your actual image
            alt="Tenant Screening Dashboard"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Section 1: Rental Process */}
      <section className="container mx-auto px-6 py-12 text-center bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-900">
          Avoid long vacancies and incompatible tenants. <span className="text-blue-600">{`With Leasesafely, it's easy.`}</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Try our rental property management software today.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium hover:bg-blue-700">
            Create My Free Account
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="lg:w-1/2">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            PROVINCE-SPECIFIC LEASE AGREEMENTS
          </h3>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Stay on the Right Side of <span className="text-blue-600">the Law</span>
          </h2>
          <p className="mt-4 text-gray-700">
            {`Understand the do's and don'ts of tenant interactions with our expert guidance on landlord-tenant laws, helping you avoid costly mistakes and legal disputes.`}
          </p>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/tenant-screening.png" // Replace with your actual image
            alt="Tenant Screening Dashboard"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Section 4: Rent Collection */}
      <section className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12 bg-orange-50">
        <div className="lg:w-1/2">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Rent Collection Software
          </h3>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            A <span className="text-blue-600">professional tool</span> to hold renters accountable
          </h2>
          <p className="mt-4 text-gray-700">
            Track important tenant-related obligations, automate documentation, and store everything securely. Autopay, reminders, custom late fees and receipts. Easy bank connection included
          </p>
          <p className="mt-4 text-sm font-medium text-gray-500">
            REPLACES: Zelle/Venmo | Physical Checks | Spreadsheets
          </p>
          <a href="#" className="mt-4 text-blue-600 underline hover:no-underline">
            Learn more about rent payments »
          </a>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/rent-collection.png" // Replace with your actual image
            alt="Rent Collection Dashboard"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h3 className="text-sm font-semibold text-gray-600 uppercase">
          Rental Property Management Software
        </h3>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          What <span className="text-blue-600">Our Landlords</span> Are Saying
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Jacob Silver",
              review: "Beyond grateful for TurboTenant! I don’t think I’d want to be a landlord if I didn’t have TurboTenant!",
            },
            {
              name: "Mary Franco",
              review:
                "TT is the most information detailed site that I could find. The way it presents every aspect of info needed is clear and accurate.",
            },
            {
              name: "Kathy Cuevas",
              review:
                "Great for finding good candidates for rentals. Makes it easy to advertise and be selective.",
            },
            {
              name: "Jeff Juma",
              review:
                "Customer service is fast and accurate. The tools for landlords are great. The website is easy to use and it’s FREE.",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900">
                {testimonial.name}
              </h4>
              <p className="mt-2 text-sm text-gray-600">{testimonial.review}</p>
            </div>
          ))}
        </div>
        <Button className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-medium hover:bg-blue-700">
          See More Testimonials
        </Button>
      </section>
    </>
  );
}
