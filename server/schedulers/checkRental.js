import cron from "node-cron";
import dayjs from "dayjs";
import Rental from "../models/Rental.js";
import { sendEmail } from "../utils/sendEmail.js";

// Daily at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const rentals = await Rental.find({ status: "approved" })
      .populate("ownerId")
      .populate("renterId")
      .populate("productId");

    rentals.forEach((rental) => {
      const now = dayjs().startOf("day");
      const endDate = dayjs(rental.endDate).startOf("day");
      const daysLeft = endDate.diff(now, "day");

      if (daysLeft === 1) {
        const ownerEmail = rental.ownerId.email;
        const renterEmail = rental.renterId.email;
        const productTitle = rental.productId.title;

        sendEmail({
          to: ownerEmail,
          subject: `⏰ Rental Ending Soon - ${productTitle}`,
          text: `Reminder: Rental of "${productTitle}" will end in 2 days.`,
        });

        sendEmail({
          to: renterEmail,
          subject: `⏰ Return Reminder - ${productTitle}`,
          text: `Reminder: Please return "${productTitle}" within 2 days.`,
        });
      }
    });

    console.log("✅ Rental reminder job executed.");
  } catch (err) {
    console.error("❌ Rental scheduler error:", err);
  }
});
