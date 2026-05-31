
const express = require("express");
const { Resend } = require("resend");

const router = express.Router();

router.post("/api/contato", async (req, res) => {
  try {
    const { nome, email, assunto, mensagem } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["ds.devstart@gmail.com"],
      replyTo: email,
      subject: `Contato DevStart - ${assunto}`,
      html: `
        <h2>Novo contato DevStart</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `
    });

    return res.status(200).json({
      sucesso: true,
      mensagem: "E-mail enviado com sucesso!",
      id: data?.data?.id
    });
  } catch (error) {
    console.error("ERRO AO ENVIAR EMAIL:", error);

    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
});

module.exports = router;
