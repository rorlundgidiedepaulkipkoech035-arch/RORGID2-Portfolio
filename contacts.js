export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }


    const { name, email, subject, message } =
        req.body || {};


    if (!name || !email || !subject || !message) {

        return res.status(400).json({
            error: "Please complete all fields."
        });

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        return res.status(400).json({
            error: "Enter a valid email address."
        });

    }


    if (
        !process.env.RESEND_API_KEY ||
        !process.env.CONTACT_EMAIL
    ) {

        return res.status(500).json({
            error: "Contact service is not configured."
        });

    }


    try {

        const response = await fetch(
            "https://api.resend.com/emails",
            {

                method: "POST",

                headers: {

                    "Authorization":
                        `Bearer ${process.env.RESEND_API_KEY}`,

                    "Content-Type": "application/json"

                },


                body: JSON.stringify({

                    from:
                        process.env.RESEND_FROM_EMAIL ||
                        "RORGID <onboarding@resend.dev>",

                    to: [
                        process.env.CONTACT_EMAIL
                    ],

                    subject:
                        `RORGID Website: ${subject}`,

                    reply_to: email,

                    text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
                    `

                })

            }
        );


        if (!response.ok) {

            throw new Error("Email delivery failed.");

        }


        return res.status(200).json({

            success: true,

            message: "Message sent successfully."

        });


    } catch (error) {

        return res.status(500).json({

            error:
                "Unable to send message. Please try again later."

        });

    }

}