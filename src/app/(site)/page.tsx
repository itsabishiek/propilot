import { CustomCard } from "@/components/customCard";
import TitleSection from "@/components/titleSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from "@/lib/constants";
import clsx from "clsx";
import { randomUUID } from "crypto";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <section>
      <section className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity Platform"
        />

        <div className="bg-white p-[2px] mt-6 rounded-xl bg-gradient-to-r from-primary to-brand-primaryBlue sm:w-[300px]">
          <Button
            variant={"btn-secondary"}
            className="w-full  rounded-[10px] p-6 text-2xl bg-background"
          >
            Get Propilot Free
          </Button>
        </div>

        <div className="md:mt-[-90px] max-w-screen-xl sm:w-full w-[750px] min-h-[600px] object-contain flex justify-center items-center mt-[-40px] relative sm:ml-0 ml-[-50px]">
          <Image src="/appBanner.png" alt="Application Banner" fill />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>

      <section className="relative">
        <div className="overflow-hidden flex after:content[''] after:dark:from-brand-dark after:to-transparent after:from-background  after:bg-gradient-to-l after:right-0 after:top-0 after:bottom-0 after:w-20 after:absolute after:z-10  before:content[''] before:dark:from-brand-dark before:to-transparent before:from-background  before:bg-gradient-to-r before:top-0 before:bottom-0 before:w-20 before:left-0 before:absolute before:z-10">
          {[...Array(2)].map((arr) => (
            <div className="flex flex-nowrap animate-slide" key={arr}>
              {CLIENTS.map((client) => (
                <div
                  className="relative w-[200px] m-20 shrink-0 flex items-center"
                  key={client.alt}
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={200}
                    height={150}
                    className="object-contain max-w-none"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 flex justify-center items-center flex-col relative">
        <div className="w-[30%] blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-22"></div>

        <TitleSection
          title="Keep track of your meetings all in one place"
          subHeading="Capture your ideas, thoughts, and meeting notes in a 
          structured and organized manner."
          pill="Features"
        />

        <div className="mt-10 md:max-w-[500px] w-full min-h-[400px] object-contain flex justify-center items-center relative sm:ml-0 rounded-2xl border-8 border-washed-purple-300 border-opacity-10">
          <Image
            src="/cal.png"
            className="rounded-2xl "
            alt="Application Banner"
            fill
          />
        </div>
      </section>

      <section className="relative">
        <div className="w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-56"></div>

        <div className="mt-20 px-4 sm:px-6 flex flex-col overflow-x-hidden overflow-visible">
          <TitleSection
            title="Trusted by all"
            subHeading="Join thousands of satisfied users who rely on our platform for their 
          personal and professional productivity needs."
            pill="Testimonials"
          />

          {[...Array(2)].map((arr, index) => (
            <div
              className={twMerge(
                clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                  "flex-row-reverse": index === 1,
                  "animate-[slide_250s_linear_infinite]": true,
                  "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                  "ml-[100vw]": index === 1,
                }),
                "hover:paused"
              )}
              key={randomUUID()}
            >
              {USERS.map((testimonial, index) => (
                <CustomCard
                  key={testimonial.name}
                  className="w-[500px] shrink-0 rounded-xl  dark:bg-gradient-to-t dark:from-border dark:to-background"
                  cardHeader={
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="" alt={`/avatars/${index + 1}`} />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-foreground">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className=" dark:text-washed-purple-800">
                          @{testimonial.name.toLowerCase()}
                        </CardDescription>
                      </div>
                    </div>
                  }
                  cardContent={
                    <p className="dark:text-washed-purple-800">
                      {testimonial.message}
                    </p>
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="m-20 px-4 sm:px-6">
        <TitleSection
          title="The Perfect Plan For You"
          subHeading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
          pill="Pricing"
        />

        <div className="flex flex-col-reverse sm:flex-row gap-4 justify-center  sm:items-stretch items-center mt-10">
          {PRICING_CARDS.map((card) => (
            <CustomCard
              className={clsx(
                "w-[300px] rounded-2xl dark:bg-black/95 backdrop-blur-3xl relative",
                {
                  "border-brand-primaryPurple/70":
                    card.planType === PRICING_PLANS.proplan,
                }
              )}
              key={card.planType}
              cardHeader={
                <CardTitle className="text-3xl font-semibold">
                  {card.planType === PRICING_PLANS.proplan && (
                    <>
                      <div className="hidden dark:block w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/80 -z-10 top-0" />
                      <Image
                        src="/icons/diamond.svg"
                        alt="Pro Plan Diamond Icon"
                        className="absolute top-6 right-6"
                        width={20}
                        height={20}
                      />
                    </>
                  )}
                  {card.planType}
                </CardTitle>
              }
              cardFooter={
                <ul className="font-normal flex mb-2 flex-col gap-4">
                  <small className="">{card.highlightFeature}</small>
                  {card.freatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Image
                        src="/icons/check.svg"
                        alt="Pro check"
                        width={20}
                        height={20}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              }
              cardContent={
                <CardContent className="p-0 ">
                  <span className="font-normal text-2xl">${card.price}</span>
                  {+card.price > 0 ? (
                    <span className="dark:text-washed-purple-800 ml-1">
                      /mo
                    </span>
                  ) : (
                    ""
                  )}
                  <p className="dark:text-washed-purple-800">
                    {card.description}
                  </p>
                  <Button
                    variant={"btn-primary"}
                    className="whitespace-nowrap w-full mt-4"
                  >
                    {card.planType === PRICING_PLANS.proplan
                      ? "Go Pro"
                      : "Get started"}
                  </Button>
                </CardContent>
              }
            />
          ))}
        </div>
      </section>
    </section>
  );
};
export default Home;
