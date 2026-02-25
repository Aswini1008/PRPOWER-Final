import { motion } from "framer-motion";
import {
  Zap,
  Settings,
  Package,
  TestTube,
  Wrench,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Zap,
    title: "Engineering Services",
    description:
      "Complete electrical engineering including SLDs, layouts, cable designs, and protection coordination.",
    features: [
      "System Design",
      "Foundation Engineering",
      "Relay Settings",
      "Cable Scheduling"
    ]
  },
  {
    icon: Settings,
    title: "Installation Services",
    description:
      "Expert installation of AIS/GIS substations and renewable energy infrastructure projects.",
    features: [
      "AIS/GIS Substations",
      "Solar EPC",
      "Wind EPC",
      "Up to 400kV Capability"
    ]
  },
  {
    icon: TestTube,
    title: "Testing & Commissioning",
    description:
      "Comprehensive testing and commissioning of high-voltage electrical systems.",
    features: [
      "CT/PT Testing",
      "Isolator Testing",
      "CVT Testing",
      "Relay Coordination"
    ]
  },
  {
    icon: Package,
    title: "Supply Services",
    description:
      "Procurement and delivery of transformers, control panels, and protection equipment.",
    features: [
      "Transformers",
      "Control Panels",
      "Cable Trays",
      "Protection Equipment"
    ]
  },
  {
    icon: Wrench,
    title: "O&M Services",
    description:
      "Operations & Maintenance support with preventive and predictive strategies.",
    features: [
      "24/7 Operations",
      "Preventive Maintenance",
      "Predictive Analysis",
      "Emergency Support"
    ]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-[#f8fafc] text-[#1f2f45]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-widest uppercase text-gray-500 mb-6">
            Our Services
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-6">
            Comprehensive Infrastructure Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            End-to-end electrical infrastructure solutions delivered with technical precision and execution excellence.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-white border border-[#e5e9ef] p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Icon className="w-8 h-8 text-[#F26B1D] mb-6" />

                <h3 className="text-xl font-semibold mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#F26B1D] mt-1" />
                      <span className="text-sm text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Button
            size="lg"
            className="bg-[#F26B1D] hover:bg-[#d85c17] text-white rounded-md px-8 py-3"
          >
            View All Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;