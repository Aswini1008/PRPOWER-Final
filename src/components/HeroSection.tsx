import { ArrowRight, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-power-infrastructure.jpg";

const HERO_METRICS = [
  { value: "30+", label: "Years Experience" },
  { value: "100+", label: "Projects Completed" },
  { value: "400kV", label: "Turnkey Capability" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      role="banner"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden max-[480px]:min-h-[80svh]"
    >
      <img
        src={heroImage}
        alt="Power transmission and renewable infrastructure"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.25)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_46%,rgba(242,107,29,0.24),rgba(242,107,29,0)_58%)]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[650px] pb-20 pt-[116px] text-center sm:pb-24 sm:pt-[126px] md:pb-24 md:pt-[132px] lg:mx-0 lg:pb-[120px] lg:pt-[140px] lg:text-left">
          <h1
            className="animate-fade-in-up mb-7 opacity-0 text-[30px] font-bold leading-[1.15] tracking-[-0.5px] text-white sm:text-[34px] md:text-[44px] lg:text-[56px]"
            style={{ animationDuration: "0.6s", animationDelay: "0.05s" }}
          >
            <span className="block">
              Powering Tomorrow with
            </span>
            <span className="block">
              Trusted <span className="whitespace-nowrap text-[#F26B1D]">Infrastructure</span>
            </span>
          </h1>

          <p
            className="animate-fade-in-up mx-auto mb-9 max-w-[600px] opacity-0 text-[16px] leading-[1.6] text-white/90 lg:mx-0 lg:text-[18px]"
            style={{ animationDuration: "0.8s", animationDelay: "0.18s" }}
          >
            Delivering AIS/GIS substations, high-voltage transmission systems, and
            renewable energy infrastructure backed by over three decades of
            engineering excellence.
          </p>

          <div
            className="animate-fade-in-up flex flex-wrap items-center justify-center gap-[18px] opacity-0 max-[480px]:flex-col max-[480px]:items-stretch lg:justify-start"
            style={{ animationDuration: "1s", animationDelay: "0.32s" }}
          >
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="inline-flex min-h-[52px] items-center justify-center rounded-[6px] bg-[#F26B1D] px-[26px] py-[14px] text-[15px] font-semibold tracking-[0.3px] text-white shadow-[0_10px_20px_rgba(242,107,29,0.24)] transition-all duration-300 ease-in-out hover:-translate-y-[2px] hover:bg-[#d85c17] hover:shadow-[0_14px_24px_rgba(216,92,23,0.32)] max-[480px]:w-full"
            >
              View Our Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <a
              href="/PR-POWER-BROCHURE.pdf"
              download
              className="inline-flex min-h-[52px] items-center justify-center rounded-[6px] border border-white bg-transparent px-[26px] py-[14px] text-[15px] font-semibold tracking-[0.3px] text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-[#1f2f45] max-[480px]:w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Brochure
            </a>
          </div>

          <div className="mt-14 border-t border-white/30 pt-8">
            <div className="grid grid-cols-1 gap-7 text-center sm:grid-cols-3 sm:gap-9 lg:text-left">
            {HERO_METRICS.map((metric, index) => (
              <div
                key={metric.label}
                className="animate-fade-in-up flex flex-col items-center rounded-md bg-white/[0.06] px-4 py-5 opacity-0 backdrop-blur-[2px] lg:items-start"
                style={{
                  animationDuration: "0.65s",
                  animationDelay: `${0.5 + index * 0.1}s`,
                }}
              >
                <p className="text-[38px] font-bold leading-none text-[#F26B1D] sm:text-[40px] lg:text-[42px]">
                  {metric.value}
                </p>
                <span className="mt-3 h-px w-14 bg-white/45" />
                <p className="mt-3 text-[14px] font-medium uppercase tracking-[1.2px] text-white/75 sm:text-[15px] lg:text-[16px]">
                  {metric.label}
                </p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
