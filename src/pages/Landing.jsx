import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import {
  Heart,
  Users,
  BookOpen,
  Shield,
  Phone,
  Mail,
  Target,
  Award,
  TrendingUp,
  ChevronRight,
  Lightbulb,
  HandHeart,
  Brain,
  DollarSign,
  UserCheck,
  MessageCircle,
  CheckCircle,
  Menu,
  X,
  Activity,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Landing = () => {
  // Main container ref for scoping
  const containerRef = useRef();
  
  // Refs for GSAP animations
  const heroRef = useRef();
  const storyRef = useRef();
  const missionRef = useRef();
  const servicesRef = useRef();
  const statsRef = useRef();
  const whyUsRef = useRef();
  const quoteRef = useRef();
  const impactRef = useRef();
  const programsRef = useRef();
  const ctaRef = useRef();
  const formRef = useRef();

  // State management
  const [quote, setQuote] = useState({ 
    text: "Hope is being able to see that there is light despite all the darkness.", 
    author: "Desmond Tutu" 
  });
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  // Services data
  const services = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Patient Advocacy",
      description: "Comprehensive support navigating treatment options, healthcare systems, and medical decisions with expert guidance.",
      details: ["Treatment navigation", "Hospital coordination", "Medical decision support", "Insurance assistance"],
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-600" />,
      title: "Access To Treatment",
      description: "Connecting patients with quality care facilities and facilitating access to specialized treatments for gallbladder and biliary tract cancers.",
      details: ["Hospital referrals", "Treatment coordination", "Second opinion facilitation", "Clinical trial access"],
    },
    {
      icon: <DollarSign className="w-12 h-12 text-blue-600" />,
      title: "Financial Assistance",
      description: "Providing critical financial support for treatments, medications, and care expenses for families in need.",
      details: ["Treatment cost support", "Medicine assistance", "Travel aid", "Emergency funding"],
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-blue-600" />,
      title: "Emotional Support",
      description: "24/7 counseling and peer support through our Hope AI chatbot and trained counselors for patients and caregivers.",
      details: ["24/7 AI chatbot support", "Professional counseling", "Peer mentoring", "Caregiver support groups"],
    },
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: "Educational Resources",
      description: "Comprehensive information about gallbladder and biliary tract cancers, treatments, and care management.",
      details: ["Disease information", "Treatment guides", "Webinars & workshops", "Research updates"],
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Community Building",
      description: "Creating India's first focused ecosystem connecting GBC/BTC patients, caregivers, and healthcare professionals.",
      details: ["Support group meetings", "Survivor networks", "Virtual town halls", "Community events"],
    },
  ];

  // Programs data
  const programs = [
    {
      icon: <Brain className="w-10 h-10 text-white" />,
      title: "Hope AI Chatbot",
      description: "24/7 AI-powered guidance answering 200+ queries monthly about cancer care and support.",
      color: "bg-blue-600",
    },
    {
      icon: <HandHeart className="w-10 h-10 text-white" />,
      title: "Peer Mentoring",
      description: "Survivor advocacy program connecting patients with those who've walked the same path.",
      color: "bg-purple-600",
    },
    {
      icon: <Target className="w-10 h-10 text-white" />,
      title: "Targeted Research",
      description: "Conducting research in high-risk areas where GBC cases are double the national average.",
      color: "bg-green-600",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-white" />,
      title: "Awareness Campaigns",
      description: "Raising awareness about gallbladder and biliary tract cancers across India.",
      color: "bg-orange-600",
    },
  ];

  // Why choose us data
  const whyChooseUs = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Specialized Focus",
      description: "India's first focused ecosystem for gallbladder and biliary tract cancers (GBC/BTC).",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Comprehensive Care",
      description: "From diagnosis to recovery, we support every step of your cancer journey.",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Expert Network",
      description: "Connected with leading oncologists and healthcare facilities across India.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Proven Impact",
      description: "Over 150+ patients assisted with 95% early treatment initiation rate.",
    },
  ];

  // FIXED: Fetch inspirational quote from Quotable API
  const fetchQuote = async () => {
    try {
      setLoadingQuote(true);
      const res = await axios.get("https://api.quotable.io/random?tags=inspirational");
      
      if (res.data && res.data.content) {
        setQuote({ 
          text: res.data.content, 
          author: res.data.author 
        });
      }
    } catch (err) {
      console.error("Quote API error:", err);
      setQuote({
        text: "Hope is being able to see that there is light despite all the darkness.",
        author: "Desmond Tutu",
      });
    } finally {
      setLoadingQuote(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // GSAP animations with proper cleanup
  useGSAP(
    () => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            clearProps: "all",
          }
        );
      }

      // Story section
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          { opacity: 0, y: 60 },
          {
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }

      // Mission section
      if (missionRef.current) {
        gsap.fromTo(
          missionRef.current,
          { opacity: 0, x: -80 },
          {
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }

      // Services cards
      const serviceCards = gsap.utils.toArray(".service-card");
      if (serviceCards.length > 0) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 60 },
          {
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          }
        );
      }

      // Stats animation
      const statItems = gsap.utils.toArray(".stat-item");
      if (statItems.length > 0) {
        gsap.fromTo(
          statItems,
          { opacity: 0, scale: 0.5 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          }
        );
      }

      // Why us cards
      const whyCards = gsap.utils.toArray(".why-card");
      if (whyCards.length > 0) {
        gsap.fromTo(
          whyCards,
          { opacity: 0, x: -50 },
          {
            scrollTrigger: {
              trigger: whyUsRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          }
        );
      }

      // Quote section
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }
        );
      }

      // Programs
      const programCards = gsap.utils.toArray(".program-card");
      if (programCards.length > 0) {
        gsap.fromTo(
          programCards,
          { opacity: 0, rotateY: 90 },
          {
            scrollTrigger: {
              trigger: programsRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          }
        );
      }

      // Impact section
      if (impactRef.current) {
        gsap.fromTo(
          impactRef.current,
          { opacity: 0, y: 60 },
          {
            scrollTrigger: {
              trigger: impactRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }

      // CTA section
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          }
        );
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 80 },
          {
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }
    },
    { scope: containerRef }
  );

  // Form handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main ref={containerRef} className="w-full overflow-x-hidden font-sans text-gray-800 bg-white">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Jarurat Care</span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition font-medium">
                About
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Services
              </a>
              <a href="#programs" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Programs
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Contact
              </a>
            </div>

            <button className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold">
              Donate Now
            </button>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
              <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Services
              </a>
              <a href="#programs" className="block py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Programs
              </a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold">
                Donate Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION - FIXED WITH WHITE TEXT ON BLUE BACKGROUND */}
      <section className="w-full min-h-screen flex flex-col justify-center items-center text-center bg-linear-to-tr from-blue-600 via-blue-500 to-blue-400 px-4 pt-20">
        <div ref={heroRef} className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full flex items-center space-x-2">
              <Activity className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Cancer Awareness & Support</span>
            </div>
          </div>
          
          {/* Main Heading - WHITE TEXT */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl mb-6 leading-tight">
            Bringing Hope & Healing to Cancer Warriors
          </h1>
          
          {/* Subheading - WHITE TEXT */}
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-8 leading-relaxed">
            India's first focused ecosystem for Gallbladder & Biliary Tract Cancers. Providing emotional,
            financial, and practical support through every step of your journey.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Get Support Now</span>
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-700 transition shadow-xl flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Learn Our Story</span>
            </button>
          </div>
          
          {/* Feature Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">150+ Patients Assisted</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Expert Care Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="about" ref={storyRef} className="w-full py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Where It All Started</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our story commenced in <span className="font-bold text-blue-600">December 2023</span>, marking a
                pivotal moment in our lives. It was then that we faced the profound loss of our cherished mother,
                who bravely battled Cholangiocarcinoma for seven months.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Motivated by our experiences and driven by determination, we established the{" "}
                <span className="font-bold text-blue-600">Jarurat Care Foundation</span> to rectify systemic
                shortcomings and improve the healthcare landscape for others facing similar battles.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We understand that facing cancer can be overwhelming, and{" "}
                <span className="font-bold text-blue-600">no one should have to go through it alone</span>. That's
                why we've made it our mission to stand by those affected by cancer, offering unwavering support
                every step of the way.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl shadow-xl">
              <blockquote className="text-2xl md:text-3xl font-bold text-blue-700 italic mb-6 leading-relaxed">
                "Alone we can do so little; together we can do so much."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  P
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Priyanka Joshi</p>
                  <p className="text-gray-600">Founder, Jarurat Care Foundation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section ref={missionRef} className="w-full py-20 bg-linear-to-bl from-blue-50 to-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Our Mission & Vision</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <Target className="w-12 h-12 text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To support and empower cancer patients and their families through comprehensive programs that
                provide emotional, financial, and practical assistance. We focus on gallbladder and biliary tract
                cancers, offering vital support to help patients navigate their cancer journey with dignity and
                hope.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-12 h-12 text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create an all-inclusive community of cancer warriors, caregivers, and doctors in India,
                fostering support, knowledge sharing, and solidarity in the fight against cancer. We envision a
                world where no family faces cancer alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" ref={servicesRef} className="w-full py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">How We Help</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services designed to address every aspect of your cancer journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-600 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-600 transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <ChevronRight className="w-5 h-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} className="w-full py-20 bg-blue-600 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100">Making a real difference in the lives of cancer warriors</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-item text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <p className="text-5xl md:text-6xl font-extrabold text-white mb-2">150+</p>
              <p className="text-lg text-blue-100 font-medium">Patients Assisted</p>
            </div>
            <div className="stat-item text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <p className="text-5xl md:text-6xl font-extrabold text-white mb-2">2000+</p>
              <p className="text-lg text-blue-100 font-medium">People Reached</p>
            </div>
            <div className="stat-item text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <p className="text-5xl md:text-6xl font-extrabold text-white mb-2">95%</p>
              <p className="text-lg text-blue-100 font-medium">Early Treatments Initiated</p>
            </div>
            <div className="stat-item text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <p className="text-5xl md:text-6xl font-extrabold text-white mb-2">200+</p>
              <p className="text-lg text-blue-100 font-medium">Monthly AI Chatbot Queries</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section ref={whyUsRef} className="w-full py-20 bg-linear-to-r from-white to-blue-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Why Choose Jarurat Care</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="why-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-start space-x-6"
              >
                <div className="shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" ref={programsRef} className="w-full py-20 bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Key Programs</h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Innovative initiatives addressing the unique needs of GBC/BTC patients
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`program-card ${program.color} p-8 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300`}
              >
                <div className="flex justify-center mb-6">{program.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">{program.title}</h3>
                <p className="text-white/90 text-center leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION - FIXED WITH QUOTABLE API */}
      <section ref={quoteRef} className="w-full py-20 bg-linear-to-b from-blue-50 to-white px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h3 className="text-3xl font-bold text-blue-700">Daily Inspiration</h3>
          </div>
          <div className="bg-white p-12 rounded-3xl shadow-2xl border-2 border-blue-100">
            <blockquote className="italic text-2xl md:text-3xl text-gray-800 leading-relaxed mb-6">
              "{quote.text}"
            </blockquote>
            <p className="text-blue-600 font-bold text-xl mb-8">— {quote.author}</p>
            <button
              onClick={fetchQuote}
              disabled={loadingQuote}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed font-semibold shadow-lg flex items-center space-x-2 mx-auto"
            >
              {loadingQuote ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Get New Quote</span>
                </>
              )}
            </button>
            <p className="text-xs text-gray-500 mt-4">Powered by Quotable API</p>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section ref={impactRef} className="w-full py-20 bg-blue-600 px-6">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Cancer? Why Now?</h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-8">
            Cancer remains one of the leading causes of death worldwide, affecting millions of lives each year.
            Despite advancements in research and treatment, many people still lack access to the care and support
            they need.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12">
            By focusing on gallbladder and biliary tract cancers, we aim to{" "}
            <span className="font-bold">raise awareness</span>, provide{" "}
            <span className="font-bold">vital resources</span>, and drive efforts toward{" "}
            <span className="font-bold">early detection</span> and <span className="font-bold">effective treatment</span>
            .
          </p>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl inline-block">
            <p className="text-2xl font-bold mb-2">1 in 5 people may face cancer</p>
            <p className="text-xl">But everyone has the power to care</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section ref={ctaRef} className="w-full py-20 bg-linear-to-r from-purple-600 to-blue-600 px-6">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">You Don't Have to Face This Alone</h2>
          <p className="text-xl md:text-2xl mb-10 leading-relaxed">
            Join our community of cancer warriors, survivors, and caregivers. Get the support you deserve — we're
            here 24/7 to help you through every step of your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105">
              Get Support Today
            </button>
            <button className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition">
              Become a Volunteer
            </button>
            <button className="px-10 py-4 bg-yellow-400 text-purple-900 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105">
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="w-full py-24 bg-linear-to-b from-blue-50 to-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Reach Out To Us</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600">We're here to listen, support, and help you every step of the way</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">24/7 Helpline</p>
                  <p className="text-gray-600">Call us anytime for immediate support</p>
                  <p className="text-blue-600 font-semibold mt-1">+91 98765 43210</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Email Support</p>
                  <p className="text-gray-600">We respond within 24 hours</p>
                  <p className="text-blue-600 font-semibold mt-1">support@jaruratcare.org</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Hope AI Chatbot</p>
                  <p className="text-gray-600">Instant answers to 200+ common questions</p>
                </div>
              </div>

              <div className="bg-linear-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="mb-6">
                  If you're facing a medical emergency or need urgent assistance, please don't hesitate to call our
                  24/7 helpline or visit the nearest emergency room.
                </p>
                <button className="w-full py-3 bg-white text-blue-700 rounded-lg font-bold hover:shadow-xl transition">
                  Emergency Contact
                </button>
              </div>
            </div>

            <form
              ref={formRef}
              className="bg-white p-10 rounded-3xl shadow-2xl"
              onSubmit={handleSubmit}
            >
              <h3 className="text-3xl font-bold text-blue-700 mb-6">Send Us a Message</h3>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded">
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows="5"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition resize-none"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Message</span>
                </button>

                {submitted && (
                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                    <p className="text-green-700 font-medium flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Thank you! We'll reach out to you within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="w-10 h-10 text-blue-400" />
                <span className="text-2xl font-bold">Jarurat Care</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                India's first focused ecosystem for gallbladder and biliary tract cancers, bringing hope and
                healing to cancer warriors across the nation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition" aria-label="Facebook">
                  F
                </a>
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition" aria-label="Twitter">
                  T
                </a>
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition" aria-label="Instagram">
                  I
                </a>
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition" aria-label="LinkedIn">
                  L
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#about" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#programs" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Get Involved</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Donate Now
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Volunteer With Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Become a Mentor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Corporate Partnerships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Fundraise For Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Stay Connected</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for inspiring stories, updates, and cancer awareness resources.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  aria-label="Newsletter email"
                />
                <button className="w-full py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Jarurat Care Foundation. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition">
                  Cookie Policy
                </a>
              </div>
            </div>
            <p className="text-center text-gray-500 text-xs mt-6">
              Made with <Heart className="w-3 h-3 inline text-red-500" /> for cancer warriors everywhere
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
