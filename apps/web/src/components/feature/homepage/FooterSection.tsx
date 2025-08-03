import React from 'react';

export const FooterSection = () => {
  // Navigation links data
  const navigationLinks = {
    column1: [
      'Schedule',
      'Courses',
      'Pricing',
      'Payment',
      'Study In Spain',
      'Books',
    ],
    column2: ['About school', 'Gallery', 'News', 'Contacts'],
  };

  // Contact information data
  const contactInfo = {
    phones: ['+1 (406) 555-0120', '+1 (480) 555-0103'],
    email: 'hello@promptverse.com',
  };

  // Social media icons with proper styling
  const socialIcons = [
    { name: 'Facebook', color: 'bg-blue-600' },
    { name: 'Twitter', color: 'bg-sky-500' },
    { name: 'Instagram', color: 'bg-pink-600' },
    { name: 'LinkedIn', color: 'bg-blue-700' },
  ];

  // Chat icons with proper styling
  const chatIcons = [
    { name: 'WhatsApp', color: 'bg-green-500' },
    { name: 'Telegram', color: 'bg-blue-500' },
    { name: 'Discord', color: 'bg-indigo-600' },
  ];

  return (
    <footer className="flex w-full flex-col items-start justify-center gap-8 border-[#ffffff33] border-t bg-black px-4 py-8 lg:flex-row lg:px-16 lg:py-12">
      <div className="relative flex w-full flex-col items-start justify-between gap-8 lg:h-[582px] lg:w-[528px] lg:items-end lg:gap-0">
        <div className="flex w-full flex-[0_0_auto] flex-col items-start gap-6 self-stretch">
          <div className="relative mt-[-1.00px] w-fit whitespace-nowrap font-normal font-poppins text-white text-xs leading-[18px] tracking-[0] opacity-40">
            Navigation
          </div>

          <div className="relative flex flex-[0_0_auto] flex-col items-start gap-8 lg:inline-flex lg:flex-row lg:gap-24">
            <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-1.5">
              {navigationLinks.column1.map((link, index) => (
                <div
                  key={`nav-link-1-${index}`}
                  className={`relative w-fit ${
                    index === 0 ? 'mt-[-1.00px]' : ''
                  } cursor-pointer whitespace-nowrap font-normal font-poppins text-sm text-white leading-[19.6px] tracking-[0] transition-colors duration-300 hover:text-gray-300`}
                >
                  {link}
                </div>
              ))}
            </div>

            <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-1.5">
              {navigationLinks.column2.map((link, index) => (
                <div
                  key={`nav-link-2-${index}`}
                  className={`relative w-fit ${
                    index === 0 ? 'mt-[-1.00px]' : ''
                  } cursor-pointer whitespace-nowrap font-normal font-poppins text-sm text-white leading-[19.6px] tracking-[0] transition-colors duration-300 hover:text-gray-300`}
                >
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-[0_0_auto] flex-col items-start self-stretch">
          <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-[5px]">
            <div className="relative mt-[-1.00px] w-fit whitespace-nowrap font-normal font-poppins text-white text-xs leading-[15.6px] tracking-[0] opacity-40">
              Copyright
            </div>

            <div className="relative w-fit whitespace-nowrap font-normal font-poppins text-white text-xs leading-[15.6px] tracking-[0] opacity-40">
              Privacy
            </div>

            <div className="relative w-fit whitespace-nowrap font-normal font-poppins text-white text-xs leading-[15.6px] tracking-[0] opacity-40">
              All rights reserved
            </div>
          </div>
        </div>
      </div>

      <div className="relative inline-flex w-full flex-[0_0_auto] flex-col items-start gap-8 lg:w-auto lg:gap-48">
        <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-8 lg:gap-16">
          <div className="relative flex w-full flex-[0_0_auto] flex-col items-start justify-start gap-8 lg:w-[752px] lg:flex-row lg:justify-around lg:gap-[180px]">
            <div className="relative flex flex-1 grow flex-col items-start justify-between gap-4 lg:h-[87px] lg:gap-0">
              <div className="relative mt-[-1.00px] w-fit whitespace-nowrap font-normal font-poppins text-white text-xs leading-[18px] tracking-[0] opacity-40">
                Contact us
              </div>

              <div className="relative flex flex-[0_0_auto] flex-col items-start gap-4 lg:inline-flex lg:flex-row lg:gap-24">
                <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-[5px]">
                  {contactInfo.phones.map((phone, index) => (
                    <div
                      key={`phone-${index}`}
                      className={`relative w-fit ${
                        index === 0 ? 'mt-[-1.00px]' : ''
                      } cursor-pointer whitespace-nowrap font-normal font-poppins text-sm text-white leading-[19.6px] tracking-[0] opacity-80 transition-colors duration-300 hover:text-gray-300`}
                    >
                      {phone}
                    </div>
                  ))}
                </div>

                <div className="relative mt-[-1.00px] w-fit cursor-pointer whitespace-nowrap font-normal font-poppins text-sm text-white leading-[19.6px] tracking-[0] opacity-80 transition-colors duration-300 hover:text-gray-300">
                  {contactInfo.email}
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-[0_0_auto] flex-col items-start gap-8 lg:inline-flex lg:flex-row lg:gap-24">
            <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-6">
              <div className="relative mt-[-1.00px] w-fit whitespace-nowrap font-normal font-poppins text-white text-xs leading-[18px] tracking-[0] opacity-40">
                Follow us
              </div>

              <div className="relative inline-flex flex-[0_0_auto] items-center justify-center gap-2.5">
                {socialIcons.map((icon, index) => (
                  <div
                    key={`social-icon-${index}`}
                    className={`relative h-10 w-10 lg:h-[50px] lg:w-[50px] ${icon.color} flex cursor-pointer items-center justify-center rounded-lg transition-opacity duration-300 hover:opacity-80`}
                  >
                    <span className="font-bold text-white text-xs">
                      {icon.name.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-6">
              <div className="relative mt-[-1.00px] w-fit whitespace-nowrap font-normal font-poppins text-white text-xs leading-[18px] tracking-[0] opacity-40">
                Let&apos;s chat
              </div>

              <div className="relative inline-flex flex-[0_0_auto] items-center justify-center gap-2.5">
                {chatIcons.map((icon, index) => (
                  <div
                    key={`chat-icon-${index}`}
                    className={`relative h-10 w-10 lg:h-[50px] lg:w-[50px] ${icon.color} flex cursor-pointer items-center justify-center rounded-lg transition-opacity duration-300 hover:opacity-80`}
                  >
                    <span className="font-bold text-white text-xs">
                      {icon.name.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-6">
            <div className="relative mt-[-1.00px] w-fit whitespace-nowrap font-normal text-white text-xs leading-[18px] tracking-[0] opacity-40 [font-family:'Inter',Helvetica]">
              Location
            </div>

            <div className="relative w-fit font-normal font-poppins text-sm text-white leading-[19.6px] tracking-[0] opacity-80">
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-[-1300px] left-[-410px] hidden h-[992px] w-[992px] rounded-full bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 blur-3xl lg:block" />
        </div>

        <div className="relative flex w-full flex-[0_0_auto] flex-col items-start justify-between gap-4 lg:w-[752px] lg:flex-row lg:gap-0">
          <div className="relative mt-[-1.00px] w-fit whitespace-nowrap font-normal font-poppins text-white text-xs leading-[18px] tracking-[0] opacity-40">
            © 2024 — Promptverse AI
          </div>

          <div className="relative inline-flex flex-[0_0_auto] items-start gap-8">
            <div className="relative mt-[-1.00px] w-fit cursor-pointer whitespace-nowrap font-medium font-poppins text-white text-xs leading-[18px] tracking-[0] opacity-40 transition-opacity duration-300 hover:opacity-60">
              En
            </div>

            <div className="relative mt-[-1.00px] w-fit cursor-pointer whitespace-nowrap font-medium font-poppins text-white text-xs leading-[18px] tracking-[0] opacity-40 transition-opacity duration-300 hover:opacity-60">
              Es
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
