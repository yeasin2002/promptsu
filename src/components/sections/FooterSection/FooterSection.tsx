import React from "react";

export const FooterSection = (): JSX.Element => {
  // Navigation links data
  const navigationLinks = {
    column1: [
      "Schedule",
      "Courses",
      "Pricing",
      "Payment",
      "Study In Spain",
      "Books",
    ],
    column2: ["About school", "Gallery", "News", "Contacts"],
  };

  // Contact information data
  const contactInfo = {
    phones: ["+1 (406) 555-0120", "+1 (480) 555-0103"],
    email: "hello@promptverse.com",
  };

  // Social media icons with proper styling
  const socialIcons = [
    { name: "Facebook", color: "bg-blue-600" },
    { name: "Twitter", color: "bg-sky-500" },
    { name: "Instagram", color: "bg-pink-600" },
    { name: "LinkedIn", color: "bg-blue-700" },
  ];

  // Chat icons with proper styling
  const chatIcons = [
    { name: "WhatsApp", color: "bg-green-500" },
    { name: "Telegram", color: "bg-blue-500" },
    { name: "Discord", color: "bg-indigo-600" },
  ];

  return (
    <footer className="flex flex-col lg:flex-row w-full items-start justify-center gap-8 px-4 lg:px-16 py-8 lg:py-12 bg-black border-t border-[#ffffff33]">
      <div className="flex flex-col w-full lg:w-[528px] items-start lg:items-end justify-between gap-8 lg:gap-0 lg:h-[582px] relative">
        <div className="flex items-start gap-6 self-stretch w-full flex-[0_0_auto] flex-col">
          <div className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'Poppins',Helvetica] font-normal text-white text-xs tracking-[0] leading-[18px] whitespace-nowrap">
            Navigation
          </div>

          <div className="flex flex-col lg:inline-flex lg:flex-row items-start gap-8 lg:gap-24 relative flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
              {navigationLinks.column1.map((link, index) => (
                <div
                  key={`nav-link-1-${index}`}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} [font-family:'Poppins',Helvetica] font-normal text-white text-sm tracking-[0] leading-[19.6px] whitespace-nowrap hover:text-gray-300 cursor-pointer transition-colors duration-300`}
                >
                  {link}
                </div>
              ))}
            </div>

            <div className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
              {navigationLinks.column2.map((link, index) => (
                <div
                  key={`nav-link-2-${index}`}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} [font-family:'Poppins',Helvetica] font-normal text-white text-sm tracking-[0] leading-[19.6px] whitespace-nowrap hover:text-gray-300 cursor-pointer transition-colors duration-300`}
                >
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex flex-col items-start gap-[5px] relative flex-[0_0_auto]">
            <div className="leading-[15.6px] relative w-fit mt-[-1.00px] opacity-40 [font-family:'Poppins',Helvetica] font-normal text-white text-xs tracking-[0] whitespace-nowrap">
              Copyright
            </div>

            <div className="relative w-fit opacity-40 [font-family:'Poppins',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px] whitespace-nowrap">
              Privacy
            </div>

            <div className="relative w-fit opacity-40 [font-family:'Poppins',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px] whitespace-nowrap">
              All rights reserved
            </div>
          </div>
        </div>
      </div>

      <div className="inline-flex flex-col items-start gap-8 lg:gap-48 relative flex-[0_0_auto] w-full lg:w-auto">
        <div className="inline-flex flex-col items-start gap-8 lg:gap-16 relative flex-[0_0_auto]">
          <div className="flex w-full lg:w-[752px] items-start justify-start lg:justify-around gap-8 lg:gap-[180px] relative flex-[0_0_auto] flex-col lg:flex-row">
            <div className="flex items-start justify-between flex-1 grow flex-col relative gap-4 lg:gap-0 lg:h-[87px]">
              <div className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'Poppins',Helvetica] font-normal text-white text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                Contact us
              </div>

              <div className="flex flex-col lg:inline-flex lg:flex-row items-start gap-4 lg:gap-24 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start gap-[5px] relative flex-[0_0_auto]">
                  {contactInfo.phones.map((phone, index) => (
                    <div
                      key={`phone-${index}`}
                      className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} opacity-80 [font-family:'Poppins',Helvetica] font-normal text-white text-sm tracking-[0] leading-[19.6px] whitespace-nowrap hover:text-gray-300 cursor-pointer transition-colors duration-300`}
                    >
                      {phone}
                    </div>
                  ))}
                </div>

                <div className="relative w-fit mt-[-1.00px] opacity-80 [font-family:'Poppins',Helvetica] font-normal text-white text-sm tracking-[0] leading-[19.6px] whitespace-nowrap hover:text-gray-300 cursor-pointer transition-colors duration-300">
                  {contactInfo.email}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:inline-flex lg:flex-row items-start gap-8 lg:gap-24 relative flex-[0_0_auto]">
            <div className="inline-flex items-start gap-6 flex-[0_0_auto] flex-col relative">
              <div className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'Poppins',Helvetica] font-normal text-white text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                Follow us
              </div>

              <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
                {socialIcons.map((icon, index) => (
                  <div
                    key={`social-icon-${index}`}
                    className={`relative w-10 h-10 lg:w-[50px] lg:h-[50px] ${icon.color} rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300`}
                  >
                    <span className="text-white text-xs font-bold">
                      {icon.name.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="inline-flex items-start gap-6 flex-[0_0_auto] flex-col relative">
              <div className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'Poppins',Helvetica] font-normal text-white text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                Let&apos;s chat
              </div>

              <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
                {chatIcons.map((icon, index) => (
                  <div
                    key={`chat-icon-${index}`}
                    className={`relative w-10 h-10 lg:w-[50px] lg:h-[50px] ${icon.color} rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300`}
                  >
                    <span className="text-white text-xs font-bold">
                      {icon.name.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="inline-flex items-start gap-6 flex-[0_0_auto] flex-col relative">
            <div className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'Inter',Helvetica] font-normal text-white text-xs tracking-[0] leading-[18px] whitespace-nowrap">
              Location
            </div>

            <div className="relative w-fit opacity-80 [font-family:'Poppins',Helvetica] font-normal text-white text-sm tracking-[0] leading-[19.6px]">
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </div>
          </div>

          {/* Background decoration */}
          <div className="hidden lg:block absolute w-[992px] h-[992px] top-[-1300px] left-[-410px] bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 rounded-full blur-3xl"></div>
        </div>

        <div className="flex flex-col lg:flex-row w-full lg:w-[752px] items-start justify-between relative flex-[0_0_auto] gap-4 lg:gap-0">
          <div className="leading-[18px] relative w-fit mt-[-1.00px] opacity-40 [font-family:'Poppins',Helvetica] font-normal text-white text-xs tracking-[0] whitespace-nowrap">
            © 2024 — Promptverse AI
          </div>

          <div className="inline-flex items-start gap-8 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'Poppins',Helvetica] font-medium text-white text-xs tracking-[0] leading-[18px] whitespace-nowrap cursor-pointer hover:opacity-60 transition-opacity duration-300">
              En
            </div>

            <div className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'Poppins',Helvetica] font-medium text-white text-xs tracking-[0] leading-[18px] whitespace-nowrap cursor-pointer hover:opacity-60 transition-opacity duration-300">
              Es
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};