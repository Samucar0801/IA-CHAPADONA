const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();

// Configuração do CORS mais específica
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve arquivos estáticos da pasta atual

// Rota para a página principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const API_KEY = process.env.OPENAI_API_KEY; // Pegando a chave do .env

// Verificar se a API key está presente
if (!API_KEY) {
  console.error("ERRO: API Key não encontrada! Verifique seu arquivo .env");
  process.exit(1);
}

console.log(
  "API Key carregada:",
  API_KEY
    ? "Sim (primeiros caracteres: " + API_KEY.substring(0, 10) + "...)"
    : "Não"
);

// Inicializar cliente OpenAI com a biblioteca mais recente
const openai = new OpenAI({ apiKey: API_KEY });

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem vazia não é permitida." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é a IA Chapadona, que dá respostas engraçadas e aleatórias usando uma linguagem jovem, cheia de gírias brasileiras. Você está sempre 'chapado' e suas respostas são divertidas, imprevisíveis e um pouco loucas.",
        },
        { role: "user", content: message },
      ],
      temperature: 1.2,
      max_tokens: 100,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Erro ao chamar a API:", error);

    // Log mais detalhado do erro
    if (error.response) {
      console.error("Detalhes da resposta:", error.response.data);
    }

    res.status(500).json({
      error: "Erro ao obter resposta da IA.",
      message: error.message,
    });
  }
});

// Tratamento de erro para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err);
  res
    .status(500)
    .json({ error: "Erro interno do servidor", message: err.message });
});

// Rodar servidor na porta 5500
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} - API pronta para uso!`);
  console.log(`Acesse http://localhost:${PORT} no seu navegador`);
});
