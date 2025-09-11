export const FlowingWaveRays = () => {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-25"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Flowing Wave Rays</title>
      <defs>
        <radialGradient cx="50%" cy="50%" id="neonPulse1" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="30%" stopColor="rgba(251,146,60,1)" />
          <stop offset="70%" stopColor="rgba(249,115,22,0.8)" />
          <stop offset="100%" stopColor="rgba(249,115,22,0)" />
        </radialGradient>
        <radialGradient cx="50%" cy="50%" id="neonPulse2" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="25%" stopColor="rgba(251,146,60,0.9)" />
          <stop offset="60%" stopColor="rgba(234,88,12,0.7)" />
          <stop offset="100%" stopColor="rgba(234,88,12,0)" />
        </radialGradient>
        <radialGradient cx="50%" cy="50%" id="neonPulse3" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="35%" stopColor="rgba(251,146,60,1)" />
          <stop offset="75%" stopColor="rgba(234,88,12,0.6)" />
          <stop offset="100%" stopColor="rgba(234,88,12,0)" />
        </radialGradient>
        {/* Adding hero text background gradients and filters */}
        <radialGradient cx="30%" cy="50%" id="heroTextBg" r="70%">
          <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
          <stop offset="40%" stopColor="rgba(251,146,60,0.08)" />
          <stop offset="80%" stopColor="rgba(234,88,12,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter height="200%" id="heroTextBlur" width="200%" x="-50%" y="-50%">
          <feGaussianBlur result="blur" stdDeviation="12" />
          <feTurbulence baseFrequency="0.7" numOctaves="4" result="noise" />
          <feColorMatrix in="noise" result="monoNoise" type="saturate" values="0" />
          <feComponentTransfer in="monoNoise" result="alphaAdjustedNoise">
            <feFuncA tableValues="0.03 0.06 0.09 0.12" type="discrete" />
          </feComponentTransfer>
          <feComposite in="blur" in2="alphaAdjustedNoise" operator="multiply" result="noisyBlur" />
          <feMerge>
            <feMergeNode in="noisyBlur" />
          </feMerge>
        </filter>
        <linearGradient id="backgroundFade1" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="20%" stopColor="rgba(249,115,22,0.15)" />
          <stop offset="80%" stopColor="rgba(249,115,22,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="backgroundFade2" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="15%" stopColor="rgba(251,146,60,0.12)" />
          <stop offset="85%" stopColor="rgba(251,146,60,0.12)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="backgroundFade3" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="25%" stopColor="rgba(234,88,12,0.18)" />
          <stop offset="75%" stopColor="rgba(234,88,12,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="threadFade1" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,1)" />
          <stop offset="15%" stopColor="rgba(249,115,22,0.8)" />
          <stop offset="85%" stopColor="rgba(249,115,22,0.8)" />
          <stop offset="100%" stopColor="rgba(0,0,0,1)" />
        </linearGradient>
        <linearGradient id="threadFade2" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,1)" />
          <stop offset="12%" stopColor="rgba(251,146,60,0.7)" />
          <stop offset="88%" stopColor="rgba(251,146,60,0.7)" />
          <stop offset="100%" stopColor="rgba(0,0,0,1)" />
        </linearGradient>
        <linearGradient id="threadFade3" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,1)" />
          <stop offset="18%" stopColor="rgba(234,88,12,0.8)" />
          <stop offset="82%" stopColor="rgba(234,88,12,0.8)" />
          <stop offset="100%" stopColor="rgba(0,0,0,1)" />
        </linearGradient>
        <filter height="200%" id="backgroundBlur" width="200%" x="-50%" y="-50%">
          <feGaussianBlur result="blur" stdDeviation="8" />
          <feTurbulence baseFrequency="0.9" numOctaves="3" result="noise" />
          <feColorMatrix in="noise" result="monoNoise" type="saturate" values="0" />
          <feComponentTransfer in="monoNoise" result="alphaAdjustedNoise">
            <feFuncA tableValues="0.05 0.1 0.15 0.2" type="discrete" />
          </feComponentTransfer>
          <feComposite in="blur" in2="alphaAdjustedNoise" operator="multiply" result="noisyBlur" />
          <feMerge>
            <feMergeNode in="noisyBlur" />
          </feMerge>
        </filter>
        <filter height="200%" id="neonGlow" width="200%" x="-50%" y="-50%">
          <feGaussianBlur result="coloredBlur" stdDeviation="2" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g>
        {/* Adding hero text background shape */}
        <ellipse
          cx="300"
          cy="350"
          fill="url(#heroTextBg)"
          filter="url(#heroTextBlur)"
          opacity="0.6"
          rx="400"
          ry="200"
        />
        <ellipse
          cx="350"
          cy="320"
          fill="url(#heroTextBg)"
          filter="url(#heroTextBlur)"
          opacity="0.4"
          rx="500"
          ry="250"
        />
        <ellipse
          cx="400"
          cy="300"
          fill="url(#heroTextBg)"
          filter="url(#heroTextBlur)"
          opacity="0.2"
          rx="600"
          ry="300"
        />
        {/* Thread 1 - Smooth S-curve from bottom-left to right */}
        <path
          d="M50 720 Q200 590 350 540 Q500 490 650 520 Q800 550 950 460 Q1100 370 1200 340"
          fill="none"
          id="thread1"
          opacity="0.8"
          stroke="url(#threadFade1)"
          strokeWidth="0.8"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="2">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href="#thread1" />
          </animateMotion>
        </circle>
        {/* Thread 2 - Gentle wave flow */}
        <path
          d="M80 730 Q250 620 400 570 Q550 520 700 550 Q850 580 1000 490 Q1150 400 1300 370"
          fill="none"
          id="thread2"
          opacity="0.7"
          stroke="url(#threadFade2)"
          strokeWidth="1.5"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="3">
          <animateMotion dur="5s" repeatCount="indefinite">
            <mpath href="#thread2" />
          </animateMotion>
        </circle>
        {/* Thread 3 - Organic curve */}
        <path
          d="M20 710 Q180 580 320 530 Q460 480 600 510 Q740 540 880 450 Q1020 360 1200 330"
          fill="none"
          id="thread3"
          opacity="0.8"
          stroke="url(#threadFade3)"
          strokeWidth="1.2"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="2.5">
          <animateMotion dur="4.5s" repeatCount="indefinite">
            <mpath href="#thread3" />
          </animateMotion>
        </circle>
        {/* Thread 4 - Flowing curve */}
        <path
          d="M120 740 Q280 640 450 590 Q620 540 770 570 Q920 600 1070 510 Q1220 420 1350 390"
          fill="none"
          id="thread4"
          opacity="0.6"
          stroke="url(#threadFade1)"
          strokeWidth="0.6"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="1.5">
          <animateMotion dur="5.5s" repeatCount="indefinite">
            <mpath href="#thread4" />
          </animateMotion>
        </circle>
        {/* Thread 5 - Natural wave */}
        <path
          d="M60 725 Q220 600 380 550 Q540 500 680 530 Q820 560 960 470 Q1100 380 1280 350"
          fill="none"
          id="thread5"
          opacity="0.7"
          stroke="url(#threadFade2)"
          strokeWidth="1.0"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="2.2">
          <animateMotion dur="4.2s" repeatCount="indefinite">
            <mpath href="#thread5" />
          </animateMotion>
        </circle>
        {/* Thread 6 - Smooth flow */}
        <path
          d="M150 735 Q300 660 480 610 Q660 560 800 590 Q940 620 1080 530 Q1220 440 1400 410"
          fill="none"
          id="thread6"
          opacity="0.6"
          stroke="url(#threadFade3)"
          strokeWidth="1.3"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="2.8">
          <animateMotion dur="5.2s" repeatCount="indefinite">
            <mpath href="#thread6" />
          </animateMotion>
        </circle>
        {/* Thread 7 - Organic S-curve */}
        <path
          d="M40 715 Q190 585 340 535 Q490 485 630 515 Q770 545 910 455 Q1050 365 1250 335"
          fill="none"
          id="thread7"
          opacity="0.8"
          stroke="url(#threadFade1)"
          strokeWidth="0.9"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="2">
          <animateMotion dur="4.8s" repeatCount="indefinite">
            <mpath href="#thread7" />
          </animateMotion>
        </circle>
        {/* Thread 8 - Gentle wave */}
        <path
          d="M100 728 Q260 630 420 580 Q580 530 720 560 Q860 590 1000 500 Q1140 410 1320 380"
          fill="none"
          id="thread8"
          opacity="0.7"
          stroke="url(#threadFade2)"
          strokeWidth="1.4"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="3">
          <animateMotion dur="5.8s" repeatCount="indefinite">
            <mpath href="#thread8" />
          </animateMotion>
        </circle>
        {/* Thread 9 - Thin flowing curve */}
        <path
          d="M30 722 Q170 595 310 545 Q450 495 590 525 Q730 555 870 465 Q1010 375 1180 345"
          fill="none"
          id="thread9"
          opacity="0.6"
          stroke="url(#threadFade3)"
          strokeWidth="0.5"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="1.2">
          <animateMotion dur="6s" repeatCount="indefinite">
            <mpath href="#thread9" />
          </animateMotion>
        </circle>
        {/* Thread 10 - Medium thick wave */}
        <path
          d="M90 732 Q240 625 390 575 Q540 525 680 555 Q820 585 960 495 Q1100 405 1300 375"
          fill="none"
          id="thread10"
          opacity="0.8"
          stroke="url(#threadFade1)"
          strokeWidth="1.1"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="2.5">
          <animateMotion dur="4.3s" repeatCount="indefinite">
            <mpath href="#thread10" />
          </animateMotion>
        </circle>
        {/* Thread 11 - Very thin thread */}
        <path
          d="M70 727 Q210 605 360 555 Q510 505 650 535 Q790 565 930 475 Q1070 385 1260 355"
          fill="none"
          id="thread11"
          opacity="0.5"
          stroke="url(#threadFade2)"
          strokeWidth="0.4"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="1">
          <animateMotion dur="5.7s" repeatCount="indefinite">
            <mpath href="#thread11" />
          </animateMotion>
        </circle>
        {/* Thread 12 - Thick flowing line */}
        <path
          d="M110 738 Q270 645 430 595 Q590 545 730 575 Q870 605 1010 515 Q1150 425 1380 395"
          fill="none"
          id="thread12"
          opacity="0.7"
          stroke="url(#threadFade3)"
          strokeWidth="1.5"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="3.2">
          <animateMotion dur="4.7s" repeatCount="indefinite">
            <mpath href="#thread12" />
          </animateMotion>
        </circle>
        {/* Thread 13 - Thin organic curve */}
        <path
          d="M45 718 Q185 588 325 538 Q465 488 605 518 Q745 548 885 458 Q1025 368 1220 338"
          fill="none"
          id="thread13"
          opacity="0.6"
          stroke="url(#threadFade1)"
          strokeWidth="0.7"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="1.8">
          <animateMotion dur="5.3s" repeatCount="indefinite">
            <mpath href="#thread13" />
          </animateMotion>
        </circle>
        {/* Thread 14 - Medium wave */}
        <path
          d="M130 721 Q290 630 460 580 Q630 530 770 560 Q910 590 1050 500 Q1190 410 1350 380"
          fill="none"
          id="thread14"
          opacity="0.8"
          stroke="url(#threadFade2)"
          strokeWidth="1.0"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="2.3">
          <animateMotion dur="4.9s" repeatCount="indefinite">
            <mpath href="#thread14" />
          </animateMotion>
        </circle>
        {/* Thread 15 - Very thin delicate line */}
        <path
          d="M25 713 Q165 583 305 533 Q445 483 585 513 Q725 543 865 453 Q1005 363 1200 333"
          fill="none"
          id="thread15"
          opacity="0.4"
          stroke="url(#threadFade3)"
          strokeWidth="0.3"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="0.8">
          <animateMotion dur="6.2s" repeatCount="indefinite">
            <mpath href="#thread15" />
          </animateMotion>
        </circle>
        {/* Thread 16 - Thick prominent thread */}
        <path
          d="M85 719 Q235 605 385 555 Q535 505 675 535 Q815 565 955 475 Q1095 385 1320 355"
          fill="none"
          id="thread16"
          opacity="0.9"
          stroke="url(#threadFade1)"
          strokeWidth="1.5"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="3.2">
          <animateMotion dur="4.1s" repeatCount="indefinite">
            <mpath href="#thread16" />
          </animateMotion>
        </circle>
        {/* Thread 17 */}
        <path
          d="M50 720 Q180 660 320 620 Q460 580 600 600 Q740 620 880 560 Q1020 500 1200 340"
          fill="none"
          id="thread17"
          opacity="0.5"
          stroke="url(#threadFade2)"
          strokeWidth="0.6"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="1.5">
          <animateMotion dur="5.1s" repeatCount="indefinite">
            <mpath href="#thread17" />
          </animateMotion>
        </circle>
        {/* Thread 18 */}
        <path
          d="M50 720 Q200 680 350 640 Q500 600 650 620 Q800 640 950 580 Q1100 520 1200 340"
          fill="none"
          id="thread18"
          opacity="0.7"
          stroke="url(#threadFade3)"
          strokeWidth="1.2"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="2.8">
          <animateMotion dur="4.6s" repeatCount="indefinite">
            <mpath href="#thread18" />
          </animateMotion>
        </circle>
        {/* Thread 19 */}
        <path
          d="M50 720 Q160 670 280 630 Q400 590 540 610 Q680 630 820 570 Q960 510 1200 340"
          fill="none"
          id="thread19"
          opacity="0.6"
          stroke="url(#threadFade1)"
          strokeWidth="0.8"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="2">
          <animateMotion dur="5.4s" repeatCount="indefinite">
            <mpath href="#thread19" />
          </animateMotion>
        </circle>
        {/* Thread 20 */}
        <path
          d="M50 720 Q220 690 380 650 Q540 610 680 630 Q820 650 960 590 Q1100 530 1200 340"
          fill="none"
          id="thread20"
          opacity="0.8"
          stroke="url(#threadFade2)"
          strokeWidth="1.4"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="3">
          <animateMotion dur="4.4s" repeatCount="indefinite">
            <mpath href="#thread20" />
          </animateMotion>
        </circle>
        {/* Thread 21 */}
        <path
          d="M50 720 Q170 675 300 635 Q430 595 570 615 Q710 635 850 575 Q990 515 1200 340"
          fill="none"
          id="thread21"
          opacity="0.4"
          stroke="url(#threadFade3)"
          strokeWidth="0.5"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="1.2">
          <animateMotion dur="5.9s" repeatCount="indefinite">
            <mpath href="#thread21" />
          </animateMotion>
        </circle>
        {/* Thread 22 */}
        <path
          d="M50 720 Q190 745 340 705 Q490 665 630 685 Q770 705 910 645 Q1050 585 1200 340"
          fill="none"
          id="thread22"
          opacity="0.7"
          stroke="url(#threadFade1)"
          strokeWidth="1.1"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="2.5">
          <animateMotion dur="4.8s" repeatCount="indefinite">
            <mpath href="#thread22" />
          </animateMotion>
        </circle>
        {/* Thread 23 */}
        <path
          d="M50 720 Q150 725 270 685 Q390 645 530 665 Q670 685 810 625 Q950 565 1200 340"
          fill="none"
          id="thread23"
          opacity="0.6"
          stroke="url(#threadFade2)"
          strokeWidth="0.9"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="2.2">
          <animateMotion dur="5.2s" repeatCount="indefinite">
            <mpath href="#thread23" />
          </animateMotion>
        </circle>
        {/* Thread 24 */}
        <path
          d="M50 720 Q210 755 370 715 Q530 675 670 695 Q810 715 950 655 Q1090 595 1200 340"
          fill="none"
          id="thread24"
          opacity="0.8"
          stroke="url(#threadFade3)"
          strokeWidth="1.3"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="2.9">
          <animateMotion dur="4.2s" repeatCount="indefinite">
            <mpath href="#thread24" />
          </animateMotion>
        </circle>
        {/* Thread 25 */}
        <path
          d="M50 720 Q165 730 290 690 Q415 650 555 670 Q695 690 835 630 Q975 570 1200 340"
          fill="none"
          id="thread25"
          opacity="0.5"
          stroke="url(#threadFade1)"
          strokeWidth="0.7"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="1.8">
          <animateMotion dur="5.6s" repeatCount="indefinite">
            <mpath href="#thread25" />
          </animateMotion>
        </circle>
        {/* Thread 26 */}
        <path
          d="M50 720 Q230 760 390 720 Q550 680 690 700 Q830 720 970 660 Q1110 600 1200 340"
          fill="none"
          id="thread26"
          opacity="0.7"
          stroke="url(#threadFade2)"
          strokeWidth="1.0"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="2.4">
          <animateMotion dur="4.7s" repeatCount="indefinite">
            <mpath href="#thread26" />
          </animateMotion>
        </circle>
        {/* Thread 27 */}
        <path
          d="M50 720 Q175 740 310 700 Q445 660 585 680 Q725 700 865 640 Q1005 580 1200 340"
          fill="none"
          id="thread27"
          opacity="0.4"
          stroke="url(#threadFade3)"
          strokeWidth="0.4"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="1">
          <animateMotion dur="6.1s" repeatCount="indefinite">
            <mpath href="#thread27" />
          </animateMotion>
        </circle>
        {/* Thread 28 */}
        <path
          d="M50 720 Q195 750 350 710 Q505 670 645 690 Q785 710 925 650 Q1065 590 1200 340"
          fill="none"
          id="thread28"
          opacity="0.9"
          stroke="url(#threadFade1)"
          strokeWidth="1.5"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="3.1">
          <animateMotion dur="4.3s" repeatCount="indefinite">
            <mpath href="#thread28" />
          </animateMotion>
        </circle>
        {/* Thread 29 */}
        <path
          d="M50 720 Q155 735 285 695 Q415 655 555 675 Q695 695 835 635 Q975 575 1200 340"
          fill="none"
          id="thread29"
          opacity="0.6"
          stroke="url(#threadFade2)"
          strokeWidth="0.8"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="2">
          <animateMotion dur="5.3s" repeatCount="indefinite">
            <mpath href="#thread29" />
          </animateMotion>
        </circle>
        {/* Thread 30 */}
        <path
          d="M50 720 Q215 765 375 725 Q535 685 675 705 Q815 725 955 665 Q1095 605 1200 340"
          fill="none"
          id="thread30"
          opacity="0.8"
          stroke="url(#threadFade3)"
          strokeWidth="1.2"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="2.7">
          <animateMotion dur="4.5s" repeatCount="indefinite">
            <mpath href="#thread30" />
          </animateMotion>
        </circle>
        {/* Thread 31 */}
        <path
          d="M50 720 Q185 745 325 705 Q465 665 605 685 Q745 705 885 645 Q1025 585 1200 340"
          fill="none"
          id="thread31"
          opacity="0.5"
          stroke="url(#threadFade1)"
          strokeWidth="0.6"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="1.5">
          <animateMotion dur="5.8s" repeatCount="indefinite">
            <mpath href="#thread31" />
          </animateMotion>
        </circle>
        {/* Thread 32 */}
        <path
          d="M50 720 Q205 755 365 715 Q525 675 665 695 Q805 715 945 655 Q1085 595 1200 340"
          fill="none"
          id="thread32"
          opacity="0.8"
          stroke="url(#threadFade2)"
          strokeWidth="1.4"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="3">
          <animateMotion dur="4.1s" repeatCount="indefinite">
            <mpath href="#thread32" />
          </animateMotion>
        </circle>
        {/* Thread 33 */}
        <path
          d="M50 720 Q160 730 295 690 Q430 650 570 670 Q710 690 850 630 Q990 570 1200 340"
          fill="none"
          id="thread33"
          opacity="0.6"
          stroke="url(#threadFade3)"
          strokeWidth="0.9"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="2.1">
          <animateMotion dur="5.1s" repeatCount="indefinite">
            <mpath href="#thread33" />
          </animateMotion>
        </circle>
        {/* Thread 34 */}
        <path
          d="M50 720 Q225 770 385 730 Q545 690 685 710 Q825 730 965 670 Q1105 610 1200 340"
          fill="none"
          id="thread34"
          opacity="0.7"
          stroke="url(#threadFade1)"
          strokeWidth="1.1"
        />
        <circle fill="url(#neonPulse3)" filter="url(#neonGlow)" opacity="1" r="2.6">
          <animateMotion dur="4.9s" repeatCount="indefinite">
            <mpath href="#thread34" />
          </animateMotion>
        </circle>
        {/* Thread 35 */}
        <path
          d="M50 720 Q170 740 305 700 Q440 660 580 680 Q720 700 860 640 Q1000 580 1200 340"
          fill="none"
          id="thread35"
          opacity="0.4"
          stroke="url(#threadFade2)"
          strokeWidth="0.3"
        />
        <circle fill="url(#neonPulse1)" filter="url(#neonGlow)" opacity="1" r="0.8">
          <animateMotion dur="6.3s" repeatCount="indefinite">
            <mpath href="#thread35" />
          </animateMotion>
        </circle>
        {/* Thread 36 */}
        <path
          d="M50 720 Q240 715 400 675 Q560 635 700 655 Q840 675 980 615 Q1120 555 1200 340"
          fill="none"
          id="thread36"
          opacity="0.9"
          stroke="url(#threadFade3)"
          strokeWidth="1.5"
        />
        <circle fill="url(#neonPulse2)" filter="url(#neonGlow)" opacity="1" r="3.2">
          <animateMotion dur="4.0s" repeatCount="indefinite">
            <mpath href="#thread36" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
};
