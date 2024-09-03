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

  const senhaPreDefinida = 'Prima@97'; // Defina a senha aqui

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await axios.get('http://192.168.111.95:5000/api/medias');
        setMedias(response.data.medias || []);
      } catch (error) {
        console.error('Erro ao buscar as médias', error);
      }
    };
    fetchMedias();
  }, []);

  const handleChangeGrupo = (e) => {
    setGrupoSelecionado(e.target.value);
  };

  const handleChange = (tema, index, value) => {
    const novasRespostas = { ...respostas };

    // Se a posição já estiver marcada, desmarque-a (toggle)
    if (novasRespostas[tema].respostas[index] === value) {
      novasRespostas[tema].respostas[index] = null;
    } else {
      if (novasRespostas[tema].respostas.includes(value)) {
        setErro(`A posição ${value} já foi escolhida para outra pergunta dentro do ${tema}!`);
        return;
      }
      novasRespostas[tema].respostas[index] = value;
    }

    setRespostas(novasRespostas);
    setErro('');
  };

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
      await axios.post('http://192.168.111.95:5000/api/respostas', dadosEnvio);
      alert('Respostas enviadas com sucesso!');
      setGrupoSelecionado('');
      setRespostas(temas);
  
      const response = await axios.get('http://192.168.111.95:5000/api/medias');
      setMedias(response.data.medias || []);
    } catch (error) {
      console.error('Erro ao enviar respostas', error);
      alert('Erro ao enviar respostas');
    }
  };

  const handleSenhaSubmit = (e) => {
    e.preventDefault();
    if (senha === senhaPreDefinida) {
      setSenhaCorreta(true);
    } else {
      alert('Senha incorreta');
    }
  };

  return (
    <div className="App">
      <h1>Formulário ESG</h1>
      <p>
      Essa pesquisa tem por objetivo definir a Matriz de Materialidade da Cooperativa, trabalhada no Programa ESG, para que seja priorizado os temas e foco da empresa, garantindo 
      que os esforços sejam direcionados ao que é realmente importante.
        Por favor, organize as posições em cada trilha. 
        Você deve selecionar uma posição única (1º, 2º, 3º, etc.) para cada pergunta dentro de cada trilha.
      </p>
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

        {Object.keys(temas).map((tema, temaIndex) => (
          <div key={temaIndex}>
            <h2 className="tema-titulo">{temas[tema].titulo}</h2>
            {temas[tema].perguntas.map((pergunta, index) => (
              <div key={index} className="question-card">
                <h3>{`TEMA: ${pergunta.titulo}`}</h3>
                <p>{`CONCEITO: ${pergunta.conceito}`}</p>
                <div className="options">
                  {[...Array(7)].map((_, i) => (
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
                  <span>Menos importante</span>
                  <span>Muito importante</span>
                </div>
              </div>
            ))}
          </div>
        ))}
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit">Enviar</button>
      </form>

      <h2>Posição Mais Selecionada por Pergunta</h2>
      
      {!senhaCorreta ? (
        <form onSubmit={handleSenhaSubmit}>
          <input
            type="password"
            placeholder="Digite a senha para ver as médias"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Ver Posições</button>
        </form>
      ) : (
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
      )}
    </div>
  );
}

export default App;
