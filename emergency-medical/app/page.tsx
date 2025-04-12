import { Card, CardContent } from "../components/ui/card"
import { AlertTriangle, HeartPulse, Ambulance, Droplet } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: <HeartPulse className="h-8 w-8 text-red-500" />,
    title: "Emergency Services",
    description: "Immediate access to emergency contacts and ambulance services"
  },
  {
    icon: <Droplet className="h-8 w-8 text-red-500" />,
    title: "Blood Donation",
    description: "Connect with blood donors in your area quickly"
  },
  {
    icon: <Ambulance className="h-8 w-8 text-red-500" />,
    title: "Medical Assistance",
    description: "Find nearby hospitals and medical facilities"
  }
]

export default function HomePage() {
  const hero = {
    title: "Emergency Medical Services",
    description: "Quick access to emergency services, hospitals, and blood donors when every second counts",
    image: "/banners/Blood Management.jpg"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-red-50/20">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
        
        <div className="container relative h-full flex flex-col justify-center px-4">
          <div className="max-w-2xl backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              {hero.title}
            </h1>
            <p className="mt-4 text-xl text-white/90">
              {hero.description}
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                Emergency Help
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-white/95 backdrop-blur border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="text-red-500">
                    {feature.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
