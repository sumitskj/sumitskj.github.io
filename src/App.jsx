/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Hero from "./components/hero/Hero";

function App() {
  const [screenDim, setScreenDim] = useState(null);
  const horizontalWrapperRef = useRef(null);
  const scrollSpacerRef = useRef(null);
  const component3Ref = useRef(null);
  const [currentHorizontalIndex, setCurrentHorizontalIndex] = useState(0);
  const [scrollMode, setScrollMode] = useState("vertical");
  const [localTime, setLocalTime] = useState(null);

  // Horizontal scroll items data
  const horizontalItems = [
    "Intro",
    "TruthSuite",
    "THB",
    "upGrad",
    "Here",
    "GL",
    "College",
  ];

  useEffect(() => {
    initPage();
  }, []);

  const initPage = () => {
    updateClock();
    setInterval(updateClock, 1000);
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    setScreenDim({ height: screenHeight, width: screenWidth });

    const handleResize = () => {
      let screenHeight = window.innerHeight;
      let screenWidth = window.innerWidth;
      setScreenDim({ height: screenHeight, width: screenWidth });
      console.log("Updated Height after Resize:", screenHeight, screenWidth);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hero opacity effect
      let opacity = 1 - (scrollTop * 1) / screenHeight;
      opacity = Math.max(opacity, 0);
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        heroElement.style.opacity = opacity;
      }

      // Handle horizontal scroll transition
      if(window.innerWidth >= 1024){
        handleHorizontalScrollTransition(scrollTop, screenHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  };

  const handleHorizontalScrollTransition = (scrollTop, screenHeight) => {
    // Component boundaries
    const component1Height = screenHeight;
    const component2Height = screenHeight;
    const component3Start = component1Height + component2Height;

    // Calculate spacer height based on number of horizontal items (n-1 because first item shows immediately)
    const spacerHeight = (horizontalItems.length - 1) * screenHeight;
    const component3End = component3Start + spacerHeight;

    // Check if we're in the horizontal scrolling zone (component 3)
    if (scrollTop >= component3Start && scrollTop < component3End) {
      setScrollMode("horizontal");

      // Calculate horizontal scroll progress
      const horizontalScrollProgress =
        (scrollTop - component3Start) / spacerHeight;
      const clampedProgress = Math.max(
        0,
        Math.min(1, horizontalScrollProgress)
      );

      // Calculate which horizontal item should be shown
      const totalSteps = horizontalItems.length - 1;
      const step = clampedProgress * totalSteps;
      const currentIndex = Math.floor(step);
      const stepProgress = step - currentIndex;

      setCurrentHorizontalIndex(
        Math.min(currentIndex, horizontalItems.length - 1)
      );

      // Apply horizontal translation
      if (horizontalWrapperRef.current) {
        const translateX = -(currentIndex * 100 + stepProgress * 100);
        horizontalWrapperRef.current.style.transform = `translateX(${translateX}vw)`;
      }
    } else {
      setScrollMode("vertical");

      // Reset horizontal scroll if not in horizontal zone
      if (scrollTop < component3Start) {
        setCurrentHorizontalIndex(0);
        if (horizontalWrapperRef.current) {
          horizontalWrapperRef.current.style.transform = "translateX(0vw)";
        }
      }
    }
  };

  function getFormattedLocalTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const tz =
      Intl.DateTimeFormat(undefined, {
        timeZoneName: "short",
      })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value || "";

    return `${hours}:${minutes}:${seconds} ${ampm}, ${tz}`;
  }

  function updateClock() {
    document.getElementById("clock").textContent = getFormattedLocalTime();
  }

  return (
    <>
      {/* Progress Indicator */}
      {/* <div className="fixed top-5 right-5 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md text-sm z-50">
        Mode: {scrollMode}{" "}
        {scrollMode === "horizontal" &&
          `| Item: ${currentHorizontalIndex + 1}/${horizontalItems.length}`}
      </div> */}

      <div className="flex flex-col font-montserrat w-screen min-h-screen h-full bg-white text-black justify-start items-start relative">
        {/* Component 1 - Hero */}
        <div
          id="component1"
          className="font-rubik hero-transparent-layer h-screen bg-gradient-to-br from-purple-600 to-blue-600"
        >
          <div id="hero">
            <Hero />
          </div>
        </div>

        {/* Component 2 - About */}
        <div
          id="component2"
          className="h-screen text-[#FEFCE1] bg-black flex justify-start items-center w-full z-10 rounded-t-[2rem] gap-10 relative"
        >
          <div className="flex flex-col justify-start items-start w-full h-full px-10 lg:px-52 pt-28 gap-20 relative">
            <div className="flex justify-start items-center gap-2">
              <div className="text-5xl font-medium">{`{`}</div>
              <div className="flex flex-col items-baseline justify-center font-medium">
                <div className="text-2xl whitespace-nowrap">{`Who am I ?`}</div>
              </div>
              <div className="text-5xl font-medium">{`}`}</div>
            </div>
            <div className="flex justify-center items-start w-full">
              <div className="w-full text-justify text-lg md:text-2xl lg:text-4xl">{`This is Sumit, I'm a full-stack developer with over 6 years of experience. Right now, I'm working as a Founding Engineer at TruthSuite (YC W23), where I built almost the entire product by myself. I'm a quick learner, fast developer, and I enjoy taking on new challenges, even outside my comfort zone.`}</div>
            </div>
          </div>
        </div>

        {/* Horizontal scroll wrapper containing both component 3 and spacer */}
        <div className="relative">
          {/* Component 3 - Horizontal Scroll Section */}
          <div
            id="component3"
            ref={component3Ref}
            className="relative lg:sticky lg:top-0 lg:h-screen bg-black w-full border-t border-t-[#FEFCE1] overflow-hidden z-10"
          >
            <div
              ref={horizontalWrapperRef}
              className="flex flex-col lg:flex-row h-full transition-transform duration-100 ease-out gap-40 lg:gap-0 py-10 lg:py-0"
            >
              <div
                id="component3-intro"
                className="flex-shrink-0 w-screen h-full flex flex-col lg:flex-row items-center justify-center text-white px-10 lg:px-52 gap-10"
              >
                <div className="flex flex-col justify-start items-start w-full lg:pt-0">
                  <div className="bg-[#FEC5FB] z-10 text-black text-2xl font-extrabold px-6 py-4 rounded-xl relative shadow-2xl shadow-gray-600">
                    What my journey have been upto
                  </div>
                  <div className="pl-10">
                    <div className="bg-[#FE8708] w-fit text-black text-2xl font-extrabold px-6 py-4 rounded-xl -rotate-12">
                      My Career
                    </div>
                  </div>
                  <div className="text-[#FEFCE1] text-2xl pt-24">
                    I have a Bachelor's degree in Computer Science and
                    Engineering. And have worked with 4 different organisations
                    till now and have also tried starting my own company.
                  </div>
                </div>
                <div className="hidden lg:flex justify-center items-center relative w-full">
                  <div className="pt-40 relative">
                    <img src="./semicircle.svg" />
                    <img
                      className="absolute -top-16 right-0"
                      src="./butterfly.svg"
                    />
                    <img
                      className="absolute bottom-10 -right-20"
                      src="./diamond.svg"
                    />
                    <img
                      className="absolute top-24 left-0"
                      src="./sandclock.svg"
                    />
                  </div>
                </div>
              </div>
              <div
                id="component3-truthsuite"
                className="flex-shrink-0 w-screen h-full flex flex-col lg:flex-row items-center justify-center text-white px-10 lg:px-52 gap-10"
              >
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex justify-start items-center gap-8 w-full">
                    <div className="bg-white rounded-full px-4 py-2 font-extrabold text-black text-xl lg:text-4xl">
                      #1
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-300 z-10 text-black text-xl lg:text-2xl font-extrabold px-6 py-4 rounded-xl relative shadow-2xl shadow-gray-600">
                      {`TruthSuite (YCombinator W23)`}
                    </div>
                  </div>
                  <div className="text-[#FEFCE1] text-xl lg:text-2xl pt-20 font-extrabold lg:whitespace-nowrap">
                    Founding Engineer
                    <span className="font-light px-4 lg:whitespace-nowrap">{`(Feb 2024 - Present)`}</span>
                  </div>
                  <ul className="list-disc list-outside text-xl lg:text-2xl text-[#FEFCE1] pt-10 pl-6">
                    <li>
                      Building a platform to speed up searching through cases of
                      Law Firms.
                    </li>
                    <li>
                      {`Built a platform from scratch for fine-tuning open-source LLM models, running inferences, and
managing datasets which got us our initial 10 customers. Developed a chatbot capable of
interacting with any webpage.`}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-start items-center relative w-full gap-4">
                  <div className="relative bg-white py-10">
                    <img src="./yc-logo.webp" className="w-[360px]" />
                  </div>
                  <div className="relative bg-white">
                    <img src="./truthsuite-logo.png" className="w-[160px]" />
                  </div>
                </div>
              </div>
              <div
                id="component3-hyperbrand"
                className="flex-shrink-0 w-screen h-full flex flex-col lg:flex-row items-center justify-center text-white px-10 lg:px-52 gap-10"
              >
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex justify-start items-center gap-8 w-full">
                    <div className="bg-white rounded-full px-4 py-2 font-extrabold text-black text-xl lg:text-4xl">
                      #2
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-300 z-10 text-black text-xl lg:text-2xl font-extrabold px-6 py-4 rounded-xl relative shadow-2xl shadow-gray-600">
                      TopTime Club and TheHyperBrand
                    </div>
                  </div>
                  <div className="text-[#FEFCE1] text-xl lg:text-2xl pt-20 font-extrabold lg:whitespace-nowrap">
                    Co-Founder and CTO
                    <span className="font-light px-4 lg:whitespace-nowrap">{`(Apr 2023 - Jan 2024)`}</span>
                  </div>
                  <ul className="list-disc list-outside text-xl lg:text-2xl text-[#FEFCE1] pt-10 pl-6">
                    <li>
                      Platform to create SEO-optimized AI-generated blogs and
                      social media posts to drive more traffic, and hotter leads
                      with keyword and backlink research. Reduced the SEO costs
                      by 40% compared to agencies doing SEO.
                    </li>
                    <li>
                      {`Developed all components (Backend, Frontend, Mobile, and DevOps) for TopTime and
TheHyperBrand.`}
                    </li>
                    <li>
                      {`Onboarded over 10+ paid customers for TheHyperBrand.`}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-start items-center relative w-full gap-4">
                  <div className="relative bg-white">
                    <img src="./toptime-logo.png" className="w-[360px]" />
                  </div>
                  <div className="relative bg-white py-10">
                    <img src="./thb-logo.svg" className="w-[360px]" />
                  </div>
                </div>
              </div>
              <div
                id="component3-upgrad"
                className="flex-shrink-0 w-screen h-full flex flex-col lg:flex-row items-center justify-center text-white px-10 lg:px-52 gap-10"
              >
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex justify-start items-center gap-8 w-full">
                    <div className="bg-white rounded-full px-4 py-2 font-extrabold text-black text-xl lg:text-4xl">
                      #3
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-300 z-10 text-black text-xl lg:text-2xl font-extrabold px-6 py-4 rounded-xl relative shadow-2xl shadow-gray-600">
                      upGrad
                    </div>
                  </div>
                  <div className="text-[#FEFCE1] text-xl lg:text-2xl pt-20 font-extrabold lg:whitespace-nowrap">
                    Software Engineer 2
                    <span className="font-light px-4 lg:whitespace-nowrap">{`(Oct 2022 - Mar 2023)`}</span>
                  </div>
                  <ul className="list-disc list-outside text-xl lg:text-2xl text-[#FEFCE1] pt-10 pl-6">
                    <li>
                      Transitioned a monolithic service to microservices,
                      reducing average latency by 40% to 120ms.
                    </li>
                    <li>
                      {`Managed migration of 100M+ data, including the creation of validation utilities.`}
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center relative w-full">
                  <div className="relative bg-white">
                    <img src="./upgrad-logo.jpg" className="h-[160px] lg:h-[260px]" />
                  </div>
                </div>
              </div>
              <div
                id="component3-here"
                className="flex-shrink-0 w-screen h-full flex flex-col lg:flex-row items-center justify-center text-white px-10 lg:px-52 gap-10"
              >
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex justify-start items-center gap-8 w-full">
                    <div className="bg-white rounded-full px-4 py-2 font-extrabold text-black text-xl lg:text-4xl">
                      #4
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-300 z-10 text-black text-xl lg:text-2xl font-extrabold px-6 py-4 rounded-xl relative shadow-2xl shadow-gray-600">
                      Here Technologies
                    </div>
                  </div>
                  <div className="text-[#FEFCE1] text-xl lg:text-2xl pt-20 font-extrabold lg:whitespace-nowrap">
                    Software Engineer 2
                    <span className="font-light px-4 lg:whitespace-nowrap">{`(Oct 2021 - Oct 2022)`}</span>
                  </div>
                  <ul className="list-disc list-outside text-xl lg:text-2xl text-[#FEFCE1] pt-10 pl-6">
                    <li>
                      Worked on a project displaying real-time dynamic incident
                      content on HERE Maps.
                    </li>
                    <li>
                      {`Designed an interactive dashboard that visualised alarms and alerts for application verification,
enabling immediate access to critical data and improving overall operational efficiency.`}
                    </li>
                    <li>
                      {`Enhanced map matching of incidents, resulting in a nearly 20% improvement.`}
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center relative w-full">
                  <div className="relative bg-white">
                    <img src="./here-logo.png" className="h-[220px] lg:h-[320px]" />
                  </div>
                </div>
              </div>
              <div
                id="component3-globallogic"
                className="flex-shrink-0 w-screen h-full flex flex-col lg:flex-row items-center justify-center text-white px-10 lg:px-52 gap-10"
              >
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex justify-start items-center gap-8 w-full">
                    <div className="bg-white rounded-full px-4 py-2 font-extrabold text-black text-xl lg:text-4xl">
                      #5
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-300 z-10 text-black text-xl lg:text-2xl font-extrabold px-6 py-4 rounded-xl relative shadow-2xl shadow-gray-600">
                      GlobalLogic
                    </div>
                  </div>
                  <div className="text-[#FEFCE1] text-xl lg:text-2xl pt-20 font-extrabold lg:whitespace-nowrap">
                    Software Engineer
                    <span className="font-light px-4 lg:whitespace-nowrap">{`(July 2019 - Oct 2021)`}</span>
                  </div>
                  <ul className="list-disc list-outside text-xl lg:text-2xl text-[#FEFCE1] pt-10 pl-6">
                    <li>My first company right out from college.</li>
                    <li>
                      {`Worked on multiple projects as a backend engineer. One of
                      them was developing & integrating the purchase flow of
                      addon services for an automobile company’s portal.`}
                    </li>
                    <li>
                      {`Mostly worked on SpringBoot, Java, MySql and AWS technologies.`}
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center relative w-full">
                  <div className="relative bg-white">
                    <img src="./gl-logo.svg" className="h-[200px]" />
                  </div>
                </div>
              </div>
              <div
                id="component3-college"
                className="flex-shrink-0 w-screen h-full flex flex-col lg:flex-row items-center justify-center text-white px-10 lg:px-52 gap-10"
              >
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex justify-start items-center gap-8 w-full">
                    <div className="bg-white rounded-full px-4 py-2 font-extrabold text-black text-xl lg:text-4xl">
                      #6
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-300 z-10 text-black text-xl lg:text-2xl font-extrabold px-6 py-4 rounded-xl relative shadow-2xl shadow-gray-600">
                      College
                    </div>
                  </div>
                  <div className="text-[#FEFCE1] text-xl lg:text-2xl pt-20 font-extrabold">
                    Bachelor of Technology{" "}
                    <span className="font-light px-4">in</span> Computer Science
                    and Engineering{" "}
                    <span className="font-light px-4">from</span>
                  </div>
                  <div className="text-[#FEFCE1] text-xl lg:text-2xl  font-extrabold pt-10 underline">
                    Government College of Engineering, Amravati
                  </div>
                  <div className="text-[#FEFCE1] text-xl lg:text-2xl  font-extrabold pt-10">
                    CGPA{" "}
                    <span className="p-4 bg-[#FEFCE1] text-black rounded-lg">
                      7.80
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center relative w-full">
                  <div className="relative">
                    <img src="./college.svg" className="h-[460px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer for horizontal scrolling */}
          <div
            ref={scrollSpacerRef}
            className="pointer-events-none hidden lg:block"
            style={{ height: `${(horizontalItems.length - 1) * 100}vh` }}
          />
        </div>

        {/* Component 4 - Next Vertical Section */}
        <div
          id="component4"
          className="w-full bg-[black] flex flex-col items-start justify-start text-4xl font-bold relative z-0 px-10 lg:px-52 py-28 gap-20 border-t border-t-[#FEFCE1]"
        >
          <div className="text-[#FEFCE1] flex justify-start items-center gap-2">
            <div className="text-5xl font-medium">{`{`}</div>
            <div className="flex flex-col items-baseline justify-center font-medium">
              <div className="text-2xl">{`My Projects`}</div>
            </div>
            <div className="text-5xl font-medium">{`}`}</div>
          </div>
          <div
            onClick={() =>
              window.open("https://thb-frontend.azurewebsites.net/", "_blank")
            }
            className="flex flex-col lg:flex-row justify-start items-start w-full border-2 border-[#FEFCE1] rounded-xl p-10 cursor-pointer hover:border-4 gap-10"
          >
            <div className="flex flex-col justify-start items-start w-full gap-10">
              <div className="text-[#FEFCE1] text-xl lg:text-2xl font-extrabold">
                TheHyperBrand
              </div>
              <div className="text-[#FEFCE1] text-xl lg:text-2xl font-light">
                Platform to create SEO-optimized AI-generated blogs and social
                media posts to drive more traffic, and hotter leads. You can
                also create backlinks and do keyword research. <br />
                Everything that one needs to do for SEO such as keyword
                analysis, blog writing & publishing, guest posting,
                back-linking, and more all under one roof at 1/10th of the
                market price.
                <br />
                All brands have to do is give us their website link, a
                description of their business, and their top competitors.
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full">
              <img src="thb.gif" className="h-[400px] rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-start items-start w-full border-2 border-[#FEFCE1] rounded-xl p-10 cursor-pointer hover:border-4 gap-10">
            <div className="flex flex-col justify-start items-start w-full gap-10">
              <div className="text-[#FEFCE1] text-xl lg:text-2xl font-extrabold">
                TopTime Club
              </div>
              <div className="text-[#FEFCE1] text-xl lg:text-2xl font-light">
                Platform where people can offer 1-1 calls for their expert
                services to the users who need them by charging them on per
                minute basis. So it will be like a marketplace of experts and
                people who need help can come and book them to resolve their
                doubts. Other than experts if some famous youtube, Instagram,
                etc creator onboard and is ready to talk live with their
                followers will be a good revenue stream for them.
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full">
              <img src="thb.gif" className="h-[400px] rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-start items-start w-full border-2 border-[#FEFCE1] rounded-xl p-10 cursor-pointer hover:border-4 gap-10">
            <div className="flex flex-col justify-start items-start w-full gap-10">
              <div className="text-[#FEFCE1] text-xl lg:text-2xl font-extrabold">
                GuideKaka
              </div>
              <div className="text-[#FEFCE1] text-xl lg:text-2xl font-light">
                Platform where people can offer 1-1 calls for their expert
                services to the users who need them by charging them on per
                minute basis. So it will be like a marketplace of experts and
                people who need help can come and book them to resolve their
                doubts. Other than experts if some famous youtube, Instagram,
                etc creator onboard and is ready to talk live with their
                followers will be a good revenue stream for them.
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full">
              <img src="thb.gif" className="h-[400px] rounded-xl" />
            </div>
          </div>
        </div>
        <div
          id="component4"
          className="w-full bg-[black] flex flex-col items-start justify-start text-4xl font-bold relative z-0 px-10 lg:px-52 py-28 gap-20 border-t border-t-[#FEFCE1]"
        >
          <div className="text-[#FEFCE1] flex justify-start items-center gap-2">
            <div className="text-5xl font-medium">{`{`}</div>
            <div className="flex flex-col items-baseline justify-center font-medium">
              <div className="text-2xl">{`Skills`}</div>
            </div>
            <div className="text-5xl font-medium">{`}`}</div>
          </div>
          <div className="text-[#FEFCE1] flex flex-col justify-start items-start w-full relative gap-10">
            <div className="flex flex-col justify-start items-start w-full gap-4">
              <div className="text-xl lg:text-2xl font-extrabold whitespace-nowrap">
                Languages, Tools & Concepts
              </div>
              <span className="text-xl lg:text-2xl font-light w-full">{`Java, Python, Javascript, SQL, UNIX, HTML, RabbitMQ, Kafka, AWS, Docker, LLM, RAG, WebRTC, SEO`}</span>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-4">
              <div className="text-xl lg:text-2xl font-extrabold whitespace-nowrap">
                Frameworks & Libraries
              </div>
              <span className="text-xl lg:text-2xl font-light">{`Spring Boot, NodeJs, ReactJs, FastAPI`}</span>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-4">
              <div className="text-xl lg:text-2xl font-extrabold whitespace-nowrap">
                Databases
              </div>
              <span className="text-xl lg:text-2xl font-light">{`MySQL, PostgreSQL, MongoDB, Cassandra, Redis, Vector Databases (Weaviate)`}</span>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-4">
              <div className="text-xl lg:text-2xl font-extrabold whitespace-nowrap">
                Fun Fact
              </div>
              <span className="text-xl lg:text-2xl font-light">{`I can do a Handstand.`}</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-black h-screen flex justify-center items-center">
          <img src="flex.png" className="h-full"/>
        </div>
        <div
          id="footer"
          className="w-full bg-white flex flex-col items-start justify-start text-xl lg:text-2xl font-bold relative z-0 px-10 lg:px-52 py-28 gap-20"
        >
          <div className="text-black flex justify-start items-center gap-2">
            <div className="text-5xl font-medium">{`{`}</div>
            <div className="flex flex-col items-baseline justify-center font-medium">
              <div className="text-2xl">{`Contact`}</div>
            </div>
            <div className="text-5xl font-medium">{`}`}</div>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-start w-full">
            <div className="text-xl font-light flex flex-col gap-4 w-full items-start justify-start">
              <div
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/sumit-jangir/",
                    "_blank"
                  )
                }
                className="cursor-pointer hover:underline"
              >
                LinkedIn
              </div>
              <div
                onClick={() =>
                  window.open("https://github.com/sumitskj", "_blank")
                }
                className="cursor-pointer hover:underline"
              >
                GitHub
              </div>
              <div
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/sumit-jangir/",
                    "_blank"
                  )
                }
                className="hover:underline"
              >
                Email: sumitjangirdss.1@gmail.com
              </div>
            </div>
            <div className="text-xl font-light flex flex-col gap-4 w-full items-start justify-start">
              <div
                onClick={() => window.open("./resume.pdf", "_blank")}
                className="cursor-pointer hover:underline"
              >
                Resume
              </div>
            </div>
            <div className="text-xl font-light flex flex-col gap-4 w-full items-start justify-start">
              <div className="font-medium">LOCAL TIME</div>
              <span id="clock">-----</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
