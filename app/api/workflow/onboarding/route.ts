import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

const oneDay = 24 * 60 * 60 * 1000;
const threeDays = 3 * oneDay;
const thirtyDays = 30 * oneDay;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();
  if (timeDifference > threeDays && timeDifference < thirtyDays) {
    return "non-active";
  }
  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: `🎉 Welcome to Bookx, ${fullName}!`,
      message: `
          <p>Hi ${fullName},</p>
          <p>We're thrilled to have you join <strong>Bookx</strong> — your new favorite place to explore, share, and review books with fellow readers.</p>
          <p>Start discovering amazing reads or upload your own recommendations today. 📚</p>
          <p>Need help getting started? Just reply to this email — we're here for you.</p>
          <br/>
          <p>Happy reading,<br/>The Bookx Team</p>
        `,
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: `📚 Still deciding what to read, ${fullName}?`,
          message: `
              <p>Hi ${fullName},</p>
              <p>We noticed you haven’t been around in a while, and we just wanted to check in.</p>
              <p>Bookx is full of great books and friendly readers waiting for you. Whether you're into thrillers, romance, or philosophy — we’ve got something for you.</p>
              <p>Come back and pick up where you left off. 😊</p>
              <br/>
              <p>Warmly,<br/>The Bookx Team</p>
            `,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: `✨ Welcome back to Bookx, ${fullName}!`,
          message: `
              <p>Hey ${fullName},</p>
              <p>It’s great to see you back! We hope you're enjoying your reading journey.</p>
              <p>Don’t forget to share your latest finds and explore trending books loved by the community.</p>
              <p>Keep the pages turning,</p>
              <br/>
              <p>– The Bookx Team</p>
            `,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
