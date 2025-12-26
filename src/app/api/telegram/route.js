export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body;

    const BOT_TOKEN = "7976441237:AAHHwLVIOYWviDcragQ1T887umHzMUBiQ-w";

    const CHAT_IDS = [
      "6685264794",
      "6395602657",
    //   "6685264794"
    ];

    const text = `
🌱 New Query From Happy Greenery

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
💬 Message:
${message || "No message"}
`;

    for (const chatId of CHAT_IDS) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
