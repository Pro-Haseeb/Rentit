// testEmail.js
import dotenv from "dotenv";
dotenv.config();

import { sendEmail } from "./utils/sendEmail.js"; // path adjust karo agar different hai

(async () => {
  try {
    await sendEmail({
      to: "haseebmushtaq333@gmail.com",  // 🔁 Yahan apni Gmail likho
      subject: "📬 Rentit.pk Test Email",
      html: "<h2>✅ SMTP is working fine!</h2><p>This is a test email sent manually.</p>",
    });

    console.log("✅ Test email sent successfully.");
  } catch (error) {
    console.error("❌ Error sending test email:", error);
  }
})();
