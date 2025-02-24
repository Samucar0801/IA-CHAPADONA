// Modificação para server.js - Substitua a chamada da API por respostas locais
// Adicione isso antes da rota /chat

// Array de respostas pré-definidas no estilo "Chapadona"
const respostasAleatorias = [
    "Eita, meu consagrado! Essa pergunta aí deu um nó nos meus neurônios cósmicos!",
    "Tô viajando legal nessa dimensão aí! A resposta tá nas estrelas, meu chapa!",
    "Mano do céu! Tua pergunta é tipo um portal pra outra galáxia. Tô flutuando só de pensar!",
    "Sabe o que é, parça? A vida é tipo uma onda quântica e a gente só surfa na vibração!",
    "Caceta, meu bom! Essa pergunta é mais complexa que entender o universo depois de um barato!",
    "Carai, véi! Tô muito chapado pra responder isso agora, mas a vibe tá incrível!",
    "É sobre isso, meu mano! A resposta tá dentro de você, só precisa sintonizar a frequência certa!",
    "Putz, maluco! Tô tão chapadão que até esqueci qual era a pergunta. Cola comigo nessa viagem!",
    "É o seguinte, consagrado: a verdade é relativa e depende do ângulo que você observa o cosmos!",
    "Meu parceiro, essa pergunta aí foi de cair o côco! Tô em outra dimensão só de pensar!"
  ];
  
  // Modifique a rota /chat para usar as respostas locais
  app.post("/chat", async (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: "Mensagem vazia não é permitida." });
    }
  
    try {
      // Em vez de chamar a API, escolha uma resposta aleatória
      const respostaAleatoria = respostasAleatorias[Math.floor(Math.random() * respostasAleatorias.length)];
      
      // Adicione um pequeno delay para simular o processamento
      setTimeout(() => {
        res.json({ reply: respostaAleatoria });
      }, 1000);
      
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      res.status(500).json({
        error: "Erro ao processar mensagem.",
        message: error.message,
      });
    }
  });