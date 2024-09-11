// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const grupos = [
    'Colaborador',
    'Comunidade',
    'Cooperado',
    'Cliente',
    'Fornecedor',
    'Prestador de serviço',
    'Órgão regulamentador',
    'Outros',
  ];

  const temas = {
    tema1: {
      titulo: "Trilha Ambiental",
	  descricao: "Selecione uma posição para cara tema (não pode haver repetições).",
	  descricao2: "Para mais informações do tema, clique em ⬇",
      perguntas: [
        {
          titulo: "Práticas de conservação de água.",
          conceito: "Uso racional da água e reuso de água em todas as áreas de negócio da cooperativa. Conservação de nascentes, rios e riachos localizados em propriedades dos nossos cooperados."
        },
        {
          titulo: "Gestão de resíduos sólidos",
          conceito: "Uso consciente de produtos que geram resíduos, coleta seletiva, logística reversa de embalagens das indústrias e destinação correta dos resíduos gerados por todas as áreas da cooperativa e por nossos cooperados."
        },
        {
          titulo: "Gestão de Efluentes",
          conceito: "Coleta e destinação correta para tratamento dos resíduos líquidos, gerados pelas áreas de negócio da cooperativa e seus cooperados."
        },
        {
          titulo: "Gestão de energia (eficiência energética)",
          conceito: "Busca por uma matriz energética limpa, renovável para cooperativa e seus cooperados, por meio de geração de energia elétrica por painéis solares ou biometano, e consumo de combustíveis veiculares renováveis como etanol e biometano."
        },
        {
          titulo: "Gestão do solo",
          conceito: "Uso consciente do solo com objetivo de assegurar sua eficiência, por meio de uma agricultura que fomente o uso sustentável da terra com menores alterações e uso de defensivos."
        },
        {
          titulo: "Mudanças Climáticas (emissões GEE, desmatamento, resiliência na agropecuária)",
          conceito: "Utilização de tecnologias inovadoras, como sistemas integrados, práticas de irrigação eficientes e o plantio direto, com o propósito de mitigar danos causados pelo desmatamento e aumentar a resiliência do setor às variações climáticas."
        },
        {
          titulo: "Economia Circular",
          conceito: "Melhor uso de recursos naturais, otimizando processo de produção e priorizando insumos mais duráveis, recicláveis e renováveis."
        },
      ],
      respostas: Array(7).fill(null)
    },
    tema2: {
      titulo: "Trilha Social",
	  descricao: "Selecione uma posição para cara tema (não pode haver repetições).",
	  descricao2: "Para mais informações do tema, clique em ⬇",
      perguntas: [
        {
          titulo: "Gestão de saúde e segurança do trabalho",
          conceito: "Análise de riscos ocupacionais associados as atividades. Envolvimento dos colaboradores na implementação, monitoramento e melhoria contínua de medidas preventivas no ambiente de trabalho da cooperativa e propriedades de cooperados, visando a qualidade de vida e saúde mental."
        },
        {
          titulo: "Práticas Empregatícias",
          conceito: "Processos transparentes em conformidade com as normas trabalhistas e sindicais, ambiente de trabalho e salários justos, equitativo e produtivo. Recrutamento e seleção baseado em mérito para atrair talentos diversificados."
        },
        {
          titulo: "Desenvolvimento Humano",
          conceito: "Capacitar colaboradores para impactar positivamente a sociedade por meio de programas de treinamentos, cursos e convênios em instituições de ensino, com o objetivo de aprimorar suas competências técnicas e pessoais."
        },
        {
          titulo: "Desenvolvimento dos Cooperados",
          conceito: "Práticas e políticas que visam contribuir com os interesses dos membros da cooperativa, por meio de seu envolvimento ativo na gestão e na tomada de decisões, incluindo participação em comitês."
        },
        {
          titulo: "Engajamento da comunidade local",
          conceito: "Construir um relacionamento de confiança com os moradores, onde a cooperativa está inserida, identificar e abordar suas preocupações, e contribuir para o desenvolvimento sustentável da comunidade."
        },
        {
          titulo: "Diversidade e Inclusão",
          conceito: "Implementar políticas, práticas e uma cultura de cooperativismo que valorizem e respeitem as diferenças de gênero, etnia, orientação sexual, idade, habilidades, origem socioeconômica, religião e outras características pessoais e culturais."
        },
        {
          titulo: "Direitos Humanos na Cadeia de Valor",
          conceito: "Assegurar respeito, proteção dos direitos fundamentais, erradicando o trabalho infantil e análogo à escravidão. Condições adequadas de trabalho, estabelecendo dignidade às pessoas em todas as etapas envolvidas na produção, fornecimento e distribuição de seus produtos ou serviços."
        },
      ],
      respostas: Array(7).fill(null)
    },
    tema3: {
      titulo: "Trilha Governança",
	  descricao: "Selecione uma posição para cara tema (não pode haver repetições).",
	  descricao2: "Para mais informações do tema, clique em ⬇",
      perguntas: [
        {
          titulo: "Segurança alimentar",
          conceito: "Disponibilizar e produzir alimentos saudáveis com qualidade, utilizando de práticas sustentáveis no processo produtivo."
        },
        {
          titulo: "Saúde e bem-estar animal",
          conceito: "Garantir cuidados expressivos com os animais levando em consideração o trato, a ambiência, a saúde e o comportamento animal."
        },
        {
          titulo: "Rastreabilidade de cadeia de fornecedores",
          conceito: "Garantir a procedência dos produtos comercializados em toda a cooperativa, validando as práticas socioambientais e práticas sustentáveis, bem como condições de trabalho adotadas pelo fornecedor."
        },
        {
          titulo: "Ética e Combate à corrupção",
          conceito: "Cumprir as leis, políticas, normas internas e externas promovendo a ética e integridade da cooperativa, por meio da adoção de um conjunto de práticas, controles internos de suas operações e Compliance."
        },
        {
          titulo: "Gestão de Crise",
          conceito: "Gerenciar e controlar ameaças futuras afim de minimizar os impactos, garantindo ação rápida e eficaz por meio de melhorias para o negócio."
        },
        {
          titulo: "Prestação de Contas e Transparência",
          conceito: "Facilitar o acesso à informações aos associados e instituições financeiras criando um ambiente seguro e um relacionamento de confiança."
        },
        {
          titulo: "Comunicação Interna",
          conceito: "Transmitir informações relevantes aos colaboradores com objetivo de orientar, motivar, engajar e tomar ciência dos ideais da empresa."
        },
        {
          titulo: "Relacionamento com Governo",
          conceito: "O relacionamento com o governo dentro da esfera cooperativista envolve a atuação proativa das cooperativas no acompanhamento político e na formulação de estratégias para influenciar políticas públicas."
        },
      ],
      respostas: Array(8).fill(null) // Agora com 8 perguntas
    }
  };

  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [respostas, setRespostas] = useState(temas);
  const [erro, setErro] = useState('');
  const [medias, setMedias] = useState([]);
  const [senha, setSenha] = useState(''); // Estado para armazenar a senha digitada
  const [senhaCorreta, setSenhaCorreta] = useState(false); // Estado para controlar a exibição das médias
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [currentTema, setCurrentTema] = useState(0); // Controla o tema visível
  const [showConcept, setShowConcept] = useState({}); // Controla a exibição do conceito para cada tema

  
  const senhaPreDefinida = 'Prima@97'; // Defina a senha aqui

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await axios.get('http://200.195.186.252:5051/api/medias');
        setMedias(response.data.medias || []);
      } catch (error) {
        console.error('Erro ao buscar as médias', error);
      }
    };
    fetchMedias();
  }, []);
  
  // Função para lidar com a troca de trilha
  const handleNextTema = () => {
    if (currentTema < Object.keys(temas).length - 1) {
      setCurrentTema(currentTema + 1);
    }
  };

  // Verifica se todas as perguntas do tema atual estão respondidas
  const isCurrentTemaComplete = () => {
    const temaAtual = Object.keys(temas)[currentTema];
    return respostas[temaAtual].respostas.every(resposta => resposta !== null);
  };

  const handleChangeGrupo = (e) => {
    setGrupoSelecionado(e.target.value);
  };

  const handleChange = (tema, perguntaIndex, valor) => {
    const novasRespostas = { ...respostas };
    
    // Se a opção já estiver marcada, desmarque-a
    if (novasRespostas[tema].respostas[perguntaIndex] === valor) {
        novasRespostas[tema].respostas[perguntaIndex] = null;  // Desmarca a opção
        setRespostas(novasRespostas);
        setErro('');
        return;
    }

    // Verifica se o valor já foi selecionado em outra pergunta dentro do mesmo tema
    if (novasRespostas[tema].respostas.includes(valor)) {
        setPopupMessage(`A posição ${valor}º já foi escolhida para outra pergunta dentro do ${temas[tema].titulo}!`);
        setShowPopup(true);
        return;
    }

    // Marca a nova opção
    novasRespostas[tema].respostas[perguntaIndex] = valor;
    setRespostas(novasRespostas);
    setErro('');
};
  
  // Fechar o pop-up
  //const closePopup = () => {
  //  setShowPopup(false);
  //};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!grupoSelecionado) {
      setErro('Por favor, selecione um grupo antes de enviar.');
      return;
    }
    
    const dadosEnvio = {
      grupo: grupoSelecionado,
      tema1: respostas.tema1.respostas,
      tema2: respostas.tema2.respostas,
      tema3: respostas.tema3.respostas,
    };
  
    try {
      await axios.post('http://200.195.186.252:5051/api/respostas', dadosEnvio);
	  setPopupMessage('Obrigado por compartilhar sua opnião!');
	  setShowPopup(true);
      alert('Respostas enviadas com sucesso!');
      setGrupoSelecionado('');
      setRespostas(temas);
  
      const response = await axios.get('http://200.195.186.252:5051/api/medias');
      setMedias(response.data.medias || []);
	  
    } catch (error) {
      console.error('Erro ao enviar respostas', error);
	  setPopupMessage('Erro ao enviar respostas. Por favor, tente novamente.');
	  setShowPopup(true);
      alert('Erro ao enviar respostas');
    }
  };

  const handleSenhaSubmit = (e) => {
    e.preventDefault();
    if (senha === senhaPreDefinida) {
      setSenhaCorreta(true);
    } else {
      setPopupMessage('Senha Inválida. Por favor, tente novamente.');
      setShowPopup(true);
    }
  };

  return (
  <div className="App">
    <h1>Formulário ESG</h1>
    <p>
      Nós da Primato Cooperativa queremos saber de você, qual o grau de importância nos temas compostos do ESG (Ambiental, Social e Governança). 
      Vamos montar nossa Matriz de Materialidade, garantindo que os esforços sejam direcionados ao que é realmente importante para a sociedade. 
      Considere uma nota para cada tema, sendo a 1º posição mais importante. 
      Você deve selecionar uma posição única (1º, 2º, 3º, etc.) para cada pergunta dentro de cada trilha.
    </p>
	<p>
	  Para descobrir mais sobre cada tema, basta clicar no ícone ao lado "⬇"
	</p>

    {/* Pop-up */}
    {showPopup && (
      <div className="popup-overlay" onClick={() => setShowPopup(false)}>
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={() => setShowPopup(false)}>Fechar</button>
        </div>
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div className="grupo-selecao">
        <h2>Em qual grupo você está inserido:</h2>
        {grupos.map((grupo, index) => (
          <label key={index} className="grupo-label">
            <input
              type="radio"
              name="grupo"
              value={grupo}
              checked={grupoSelecionado === grupo}
              onChange={handleChangeGrupo}
              required
            />
            {grupo}
          </label>
        ))}
      </div>

      {Object.keys(temas).map((tema, temaIndex) => {
        if (temaIndex !== currentTema) return null; // Mostrar apenas o tema atual

        const temaClass = tema === 'tema1' ? 'tema-ambiental' : tema === 'tema2' ? 'tema-social' : 'tema-governanca';

        return (
          <div key={temaIndex} className={temaClass}>
            <h2 className="tema-titulo">
              {temas[tema].titulo}
            </h2>

            {/* Exibe a descrição da trilha */}
            {temas[tema].descricao && <p className="tema-descricao">{temas[tema].descricao}</p>}
			
			{/* Exibe a descrição(2) da trilha */}
            {temas[tema].descricao2 && <p className="tema-descricao">{temas[tema].descricao2}</p>}

            {temas[tema].perguntas.map((pergunta, index) => (
              <div key={index} className="question-card">
                <h3>{`TEMA: ${pergunta.titulo}`} 
                  <span className="info-icon" onClick={() => setShowConcept(prev => ({...prev, [`${tema}-${index}`]: !prev[`${tema}-${index}`]}))}>
                    ⬇
                  </span>
                </h3>

                {/* Exibe o conceito quando o ícone é clicado */}
                {showConcept[`${tema}-${index}`] && (
                  <p className="conceito">{pergunta.conceito}</p>
                )}

                <div className="options">
                  {[...Array(temas[tema].perguntas.length)].map((_, i) => (
                    <label key={i} className="radio-label">
                      <input
                        type="checkbox"
                        name={`pergunta${temaIndex + 1}-${index + 1}`}
                        value={i + 1}
                        checked={respostas[tema].respostas[index] === i + 1}
                        onChange={() => handleChange(tema, index, i + 1)}
                      />
                      {i + 1}º
                    </label>
                  ))}
                </div>
                <div className="legendas">
                  <span>Muito importante</span>
                  <span>Menos importante</span>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {currentTema < Object.keys(temas).length - 1 && isCurrentTemaComplete() && (
        <button type="button" onClick={handleNextTema}>Próximo</button>
      )}

      {currentTema === Object.keys(temas).length - 1 && (
        <>
          <button type="submit">Enviar</button>
          {senhaCorreta ? (
            <ul>
              {medias.map((mediaTema, indexTema) => (
                <li key={indexTema}>
                  <strong>{temas[`tema${indexTema + 1}`]?.titulo || `Tema ${indexTema + 1}`}</strong>
                  <ul>
                    {mediaTema.map((media, indexPergunta) => (
                      <li key={indexPergunta}>
                        Pergunta {indexPergunta + 1}: {media !== null ? `${media}º` : 'Nenhuma posição selecionada ainda.'}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <form onSubmit={handleSenhaSubmit}>
              <input
                type="password"
                placeholder="Digite a senha para ver as médias"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button type="button" onClick={handleSenhaSubmit}>Ver Posições</button>
            </form>
          )}
        </>
      )}
    </form>
  </div>
);
}

export default App;
