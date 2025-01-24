import React from "react"
import { X } from "lucide-react"

const TermsConditions = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="prose prose-gray max-w-none">
            <h3 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h3>
            <p className="mb-4">
              By accessing and using StudentStay's services, you agree to be bound by these Terms and Conditions.
            </p>

            <h3 className="text-xl font-semibold mb-4">2. Booking and Payment</h3>
            <p className="mb-4">
              - All bookings are subject to availability - Full payment is required to confirm booking - Cancellation
              policies apply as specified - Security deposits may be required
            </p>

            <h3 className="text-xl font-semibold mb-4">3. House Rules</h3>
            <p className="mb-4">
              - Quiet hours must be observed - No unauthorized guests - No smoking in rooms - Keep common areas clean -
              Report maintenance issues promptly
            </p>

            <h3 className="text-xl font-semibold mb-4">4. Liability</h3>
            <p className="mb-4">
              StudentStay is not liable for: - Personal injury - Loss of personal property - Service interruptions -
              Force majeure events
            </p>

            <h3 className="text-xl font-semibold mb-4">5. Termination</h3>
            <p className="mb-4">
              We reserve the right to terminate any booking if: - Terms are violated - Payment is not received - False
              information is provided - Property is damaged
            </p>

            <h3 className="text-xl font-semibold mb-4">6. Changes to Terms</h3>
            <p className="mb-4">
              We may modify these terms at any time. Continued use of our services constitutes acceptance of updated
              terms.
            </p>

            <h3 className="text-xl font-semibold mb-4">7. Contact</h3>
            <p className="mb-4">For questions about these Terms & Conditions, please contact legal@studentstay.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions

