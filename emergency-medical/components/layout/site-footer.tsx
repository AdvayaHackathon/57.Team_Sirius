import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-600">EM</h3>
            <p className="text-sm text-gray-600">
              Emergency Medical Aid Platform connecting blood donors, patients, and emergency services across India.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blood-donation" className="text-gray-600 hover:text-red-600 transition-colors">
                  Blood Donation
                </Link>
              </li>
              <li>
                <Link href="/fundraisers" className="text-gray-600 hover:text-red-600 transition-colors">
                  Patient Fundraisers
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-gray-600 hover:text-red-600 transition-colors">
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-red-600 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-red-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">Email: support@em-platform.in</li>
              <li className="text-gray-600">Emergency Helpline: 108</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Emergency Medical Aid Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
