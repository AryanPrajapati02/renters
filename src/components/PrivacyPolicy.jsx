import React from "react"
import { X } from "lucide-react"

const PrivacyPolicy = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="prose prose-gray max-w-none">
            <h3 className="text-xl font-semibold mb-4">1. Information We Collect</h3>
            <p className="mb-4">
              We collect information that you provide directly to us, including: - Personal information (name, email
              address, phone number) - Payment information - Communication preferences
            </p>

            <h3 className="text-xl font-semibold mb-4">2. How We Use Your Information</h3>
            <p className="mb-4">
              We use the information we collect to: - Process your bookings - Send you important updates - Improve our
              services - Comply with legal obligations
            </p>

            <h3 className="text-xl font-semibold mb-4">3. Information Sharing</h3>
            <p className="mb-4">
              We do not sell or rent your personal information to third parties. We may share your information with: -
              Service providers - Legal authorities when required by law - Business partners with your consent
            </p>

            <h3 className="text-xl font-semibold mb-4">4. Data Security</h3>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, or disclosure.
            </p>

            <h3 className="text-xl font-semibold mb-4">5. Your Rights</h3>
            <p className="mb-4">
              You have the right to: - Access your personal information - Correct inaccurate information - Request
              deletion of your information - Opt-out of marketing communications
            </p>

            <h3 className="text-xl font-semibold mb-4">6. Contact Us</h3>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@studentstay.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

