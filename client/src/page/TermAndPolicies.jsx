import React from "react";
import "./TermAndPolicies.css"; // optional for styling

const TermsAndConditions = () => {
  return (
    <div className="terms-container" style={{ padding: "2rem", color: "#fff", backgroundColor: "#000" }}>
      <h1>Terms and Conditions</h1>

      <p>
        Welcome to <strong>Rentit.pk</strong>. By creating an account and using our services, you agree to the following terms and conditions.
      </p>

      <h3>1. User Responsibility</h3>
      <p>
        If any rented item is damaged, lost, or stolen during your rental period, you will be held fully responsible for the cost of repair or replacement as determined by the owner.
      </p>

      <h3>2. CNIC Verification</h3>
      <p>
        Your submitted CNIC image may be used to verify your identity. In case of dispute or legal issue, we reserve the right to trace your identity using your CNIC details.
      </p>

      <h3>3. Legal Action</h3>
      <p>
        If you fail to return a product, or return it in damaged condition, <strong>legal action may be taken against you</strong> under the Pakistan Penal Code. Your CNIC and contact details may be shared with legal authorities if necessary.
      </p>

      <h3>4. Payment Responsibility</h3>
      <p>
        You are obligated to pay all agreed rental fees. Any violation may lead to account suspension and legal action.
      </p>

      <h3>5. Acceptance</h3>
      <p>
        By checking the agreement box during signup, you acknowledge that you have read, understood, and accepted these terms in full.
      </p>
    </div>
  );
};

export default TermsAndConditions;
