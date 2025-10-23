import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/Layout/Layout';

import * as styles from './business-intelligence.module.css';

const navigationItems = [
  { id: 'bienvenida', label: 'Inicio' },
  { id: 'que-es-bi', label: '¿Qué es BI?' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'metodologias', label: 'Metodologías' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'quiz', label: 'Quiz' },
];

const componentList = [
  {
    icon: 'fa-solid fa-lightbulb',
    title: 'Definición conceptual',
    description:
      'La Inteligencia de Negocios (Business Intelligence - BI) reúne estrategias, aplicaciones, datos, productos y tecnologías orientadas a administrar y generar conocimiento mediante el análisis de datos existentes en una organización.',
    highlight: {
      text: 'Definición técnica (Gartner): "BI es un término paraguas que incluye las aplicaciones, infraestructura, herramientas y mejores prácticas que permiten el acceso y análisis de información para mejorar decisiones y desempeño."',
    },
  },
  {
    icon: 'fa-solid fa-puzzle-piece',
    title: 'Componentes fundamentales de BI',
    description:
      'Los componentes esenciales cubren el ciclo de datos a decisiones: datos confiables, tecnología apropiada, análisis profundo, visualización comprensible y acción basada en insights.',
    orderedList: [
      'Datos: materia prima proveniente de múltiples fuentes (bases de datos, sistemas ERP, CRM, redes sociales, IoT).',
      'Tecnología: herramientas de extracción, transformación y carga (ETL) que integran y preparan la información.',
      'Análisis: procesamiento y modelado de datos mediante técnicas estadísticas y de minería de datos.',
      'Visualización: dashboards, reportes y gráficos interactivos que facilitan la comprensión.',
      'Acción: toma de decisiones respaldada por hallazgos del análisis.',
    ],
  },
  {
    icon: 'fa-solid fa-diagram-project',
    title: 'Arquitectura básica de un sistema BI',
    description:
      'La arquitectura de BI organiza el flujo de datos desde las fuentes hasta la acción. Cada capa tiene responsabilidades definidas que garantizan consistencia y confianza.',
    codeBlock: '[Fuentes de Datos] → [ETL] → [Data Warehouse] → [OLAP/Analytics] → [Visualización] → [Usuarios]',
    list: [
      'Fuentes de datos: sistemas transaccionales, archivos, APIs y sensores.',
      'ETL (Extract, Transform, Load): procesos que limpian y estructuran los datos.',
      'Data Warehouse: almacén centralizado optimizado para análisis.',
      'OLAP: análisis multidimensional mediante cubos OLAP.',
      'Capa de presentación: herramientas de visualización y reporteo.',
    ],
  },
];

const industryExamples = [
  {
    heading: 'Retail',
    outcomes:
      'Una cadena de supermercados analiza patrones de compra, optimiza inventarios y personaliza ofertas, logrando un aumento del 15% en ventas y reducción del 20% en merma.',
  },
  {
    heading: 'Banca',
    outcomes:
      'Un banco detecta transacciones fraudulentas en tiempo real, segmenta clientes y predice riesgo crediticio, reduciendo 40% los fraudes y mejorando la aprobación de créditos.',
  },
  {
    heading: 'Salud',
    outcomes:
      'Un hospital reduce tiempos de espera, optimiza recursos médicos y predice readmisiones mediante machine learning, obteniendo 30% más satisfacción y menores costos operativos.',
  },
];

const recommendedVideos = [
  {
    label: 'Business Intelligence Explained in 5 Minutes',
    url: 'https://www.youtube.com/watch?v=8V8vx5gY8BY',
  },
  {
    label: 'Introducción a Business Intelligence (Español)',
    url: 'https://www.youtube.com/watch?v=VVkBm8hXUVc',
  },
];

const referenceDocs = [
  {
    label: 'Microsoft: "The Modern Data Warehouse"',
    url: 'https://azure.microsoft.com/en-us/resources/',
  },
  {
    label: 'Gartner Research (requiere registro gratuito)',
    url: 'https://www.gartner.com/en/research',
  },
  {
    label: 'Business Intelligence Guidebook - Tableau',
    url: 'https://www.tableau.com/learn/articles/business-intelligence',
  },
];

const benefitsTableRows = [
  {
    title: 'ROI (3 años)',
    description: 'Retorno de la inversión en proyectos BI',
    impact: '+350%',
  },
  {
    title: 'Reducción tiempo de reportes',
    description: 'Automatización de informes recurrentes',
    impact: '-70%',
  },
  {
    title: 'Mejora en precisión',
    description: 'Decisiones con menos errores',
    impact: '+37.5%',
  },
  {
    title: 'Satisfacción del cliente',
    description: 'Experiencias mejoradas con análisis predictivo',
    impact: '+27.5%',
  },
  {
    title: 'Reducción de costos operativos',
    description: 'Procesos optimizados y mejor uso de recursos',
    impact: '-20%',
  },
];

const successStories = [
  {
    title: 'Netflix',
    details: [
      'Personaliza recomendaciones: el algoritmo impulsa el 80% de las visualizaciones.',
      'Define producciones basadas en datos de audiencia.',
      'Optimiza la calidad del streaming según el ancho de banda del usuario.',
    ],
  },
  {
    title: 'Amazon',
    details: [
      'El sistema de recomendación genera el 35% de las ventas.',
      'Gestiona inventarios y rutas en tiempo real.',
      'Predice demanda para acelerar entregas.',
    ],
  },
];

const methodologies = [
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Metodología de Kimball',
    focus: 'Enfoque bottom-up orientado a las necesidades del negocio.',
    phases: [
      'Planificación del proyecto: alcance, objetivos y recursos.',
      'Definición de requerimientos con stakeholders.',
      'Modelado dimensional con esquemas estrella/copo de nieve.',
      'Diseño físico de bases de datos y procesos ETL.',
      'Desarrollo de ETL y automatizaciones.',
      'Aplicaciones BI: reportes, dashboards y análisis ad-hoc.',
      'Despliegue con capacitación a usuarios.',
      'Mantenimiento y evolución continua.',
    ],
    highlight: 'Ventaja clave: resultados rápidos mediante implementación incremental por áreas de negocio.',
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Metodología de Inmon',
    focus: 'Enfoque top-down con arquitectura empresarial centralizada.',
    features: [
      'Enterprise Data Warehouse (EDW) normalizado como fuente única de verdad.',
      'Data marts dependientes que consumen el EDW.',
      'Integración de datos a nivel empresarial antes de soluciones departamentales.',
      'Arquitectura más compleja pero consistente en el largo plazo.',
    ],
    highlight: 'Ventaja clave: mayor consistencia y escalabilidad empresarial.',
  },
];

const comparisonRows = [
  {
    aspect: 'Enfoque',
    kimball: 'Orientado a procesos de negocio',
    inmon: 'Orientado a datos empresariales',
  },
  {
    aspect: 'Implementación',
    kimball: 'Incremental mediante data marts',
    inmon: 'EDW central y luego data marts',
  },
  {
    aspect: 'Tiempo al valor',
    kimball: 'Corto (3-6 meses)',
    inmon: 'Largo (12-18 meses)',
  },
  {
    aspect: 'Modelado',
    kimball: 'Dimensional (estrella/copo de nieve)',
    inmon: 'Normalizado (3NF) y luego dimensional',
  },
  {
    aspect: 'Mejor para',
    kimball: 'Proyectos ágiles con necesidades específicas',
    inmon: 'Visión empresarial a largo plazo',
  },
];

const platformDetails = [
  {
    name: 'Tableau',
    description: [
      'Fortaleza: visualización intuitiva y poderosa.',
      'Ideal para: análisis exploratorio y storytelling.',
      'Modelo: licenciamiento por usuario (Desktop, Server, Cloud).',
    ],
  },
  {
    name: 'Power BI (Microsoft)',
    description: [
      'Fortaleza: integración con el ecosistema Microsoft y excelente relación precio-valor.',
      'Ideal para: organizaciones que usan Microsoft 365 y Azure.',
      'Modelo: suscripción mensual desde $10/usuario (Pro) y $20/usuario (Premium).',
    ],
  },
  {
    name: 'Qlik Sense',
    description: [
      'Fortaleza: motor asociativo para analizar relaciones complejas.',
      'Ideal para: análisis ad-hoc y descubrimiento de datos.',
      'Modelo: licenciamiento por usuario y capacidad.',
    ],
  },
  {
    name: 'Looker (Google Cloud)',
    description: [
      'Fortaleza: modelado semántico con LookML y arquitectura cloud-native.',
      'Ideal para: organizaciones data-driven con equipos técnicos fuertes.',
      'Modelo: basado en consumo dentro de Google Cloud.',
    ],
  },
];

const selectionCriteria = [
  { label: 'Facilidad de uso', value: 25 },
  { label: 'Escalabilidad', value: 20 },
  { label: 'Integración', value: 20 },
  { label: 'Costo total de propiedad (TCO)', value: 15 },
  { label: 'Soporte y comunidad', value: 10 },
  { label: 'Capacidades avanzadas', value: 10 },
];

const cfoMetrics = [
  { label: 'Revenue', actual: 5.2, target: 5.0 },
  { label: 'COGS', actual: 2.1, target: 2.0 },
  { label: 'OPEX', actual: 2.5, target: 2.4 },
  { label: 'EBITDA', actual: 0.6, target: 0.6 },
];

const quizQuestions = [
  {
    question: '¿Cuál es la definición más precisa de Business Intelligence según Gartner?',
    options: [
      'Un software para crear gráficos vistosos.',
      'Un término paraguas que incluye aplicaciones, infraestructura, herramientas y mejores prácticas para el acceso y análisis de información.',
      'Una base de datos grande para almacenar información.',
      'Un sistema de contabilidad automatizado.',
    ],
    answer:
      'Un término paraguas que incluye aplicaciones, infraestructura, herramientas y mejores prácticas para el acceso y análisis de información.',
    feedback:
      'Gartner describe BI como un término paraguas que reúne procesos y tecnologías para mejorar decisiones y desempeño.',
  },
  {
    question: '¿Cuál NO es un componente fundamental de BI?',
    options: ['Datos', 'Análisis', 'Recursos Humanos', 'Visualización'],
    answer: 'Recursos Humanos',
    feedback:
      'Los pilares técnicos son datos, tecnología, análisis, visualización y acción. Recursos Humanos es un área del negocio.',
  },
  {
    question: 'En la arquitectura básica de BI, ¿qué significa ETL?',
    options: [
      'Enterprise Technology Layer',
      'Extract, Transform, Load',
      'Electronic Transfer Link',
      'Enhanced Table Logic',
    ],
    answer: 'Extract, Transform, Load',
    feedback: 'ETL agrupa los procesos de extracción, transformación y carga que preparan los datos para análisis.',
  },
  {
    question: 'Según estudios, ¿cuál es el ROI promedio de una implementación BI a 3 años?',
    options: ['+50%', '+150%', '+350%', '+500%'],
    answer: '+350%',
    feedback:
      'Los proyectos de BI bien gestionados alcanzan un retorno de inversión promedio del 350% en tres años.',
  },
  {
    question:
      '¿Qué porcentaje de las visualizaciones de Netflix se atribuyen a su sistema de recomendación basado en BI?',
    options: ['40%', '60%', '80%', '95%'],
    answer: '80%',
    feedback:
      'El motor de recomendaciones de Netflix explica aproximadamente el 80% de las visualizaciones en la plataforma.',
  },
  {
    question: '¿Cuál es la principal diferencia entre la metodología de Kimball y la de Inmon?',
    options: [
      'Kimball usa SQL y Inmon usa NoSQL.',
      'Kimball es bottom-up orientado al negocio; Inmon es top-down con arquitectura empresarial.',
      'Kimball es para empresas grandes e Inmon para pequeñas.',
      'No existen diferencias significativas.',
    ],
    answer:
      'Kimball es bottom-up orientado al negocio; Inmon es top-down con arquitectura empresarial.',
    feedback:
      'Kimball prioriza data marts con resultados rápidos, mientras Inmon construye primero un EDW centralizado.',
  },
  {
    question: '¿Qué modelo de datos utiliza principalmente la metodología de Kimball?',
    options: [
      'Relacional normalizado',
      'Dimensional (esquema estrella/copo de nieve)',
      'Orientado a objetos',
      'Jerárquico',
    ],
    answer: 'Dimensional (esquema estrella/copo de nieve)',
    feedback:
      'El modelado dimensional es la base del enfoque de Kimball para consultas analíticas eficientes.',
  },
  {
    question: '¿Cuál es el criterio con mayor peso en la selección de una herramienta BI?',
    options: [
      'Costo total de propiedad (TCO)',
      'Facilidad de uso',
      'Capacidades de Machine Learning',
      'Soporte y comunidad',
    ],
    answer: 'Facilidad de uso',
    feedback:
      'La facilidad de uso pesa un 25% porque reduce la curva de adopción y acelera el valor.',
  },
  {
    question: '¿Qué plataforma BI está más integrada con el ecosistema Microsoft?',
    options: ['Tableau', 'Qlik Sense', 'Power BI', 'Looker'],
    answer: 'Power BI',
    feedback:
      'Power BI ofrece integración nativa con Microsoft 365, Azure y herramientas de productividad de Microsoft.',
  },
  {
    question: 'En un dashboard CFO, ¿qué significa EBITDA?',
    options: [
      'Earnings Before Interest, Taxes, Depreciation and Amortization',
      'Electronic Business Intelligence Data Analysis',
      'Enterprise Budget In Total Digital Assets',
      'Estimated Balance In The Database Application',
    ],
    answer: 'Earnings Before Interest, Taxes, Depreciation and Amortization',
    feedback:
      'EBITDA mide el beneficio operativo antes de intereses, impuestos, depreciación y amortización.',
  },
];

const Quiz = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const total = questions.length;

  const progressValue = useMemo(() => {
    if (showResults) {
      return 100;
    }
    return Math.round((currentIndex / total) * 100);
  }, [currentIndex, showResults, total]);

  const handleOptionClick = useCallback(
    (option) => {
      if (selectedOption !== null) {
        return;
      }

      setSelectedOption(option);

      const isCorrect = option === questions[currentIndex].answer;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setFeedbackState({
        isCorrect,
        message: isCorrect
          ? questions[currentIndex].feedback
          : `Incorrecto. ${questions[currentIndex].feedback}`,
      });
    },
    [currentIndex, questions, selectedOption],
  );

  const handleNext = useCallback(() => {
    if (selectedOption === null) {
      return;
    }

    if (currentIndex === total - 1) {
      setShowResults(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }

    setSelectedOption(null);
    setFeedbackState(null);
  }, [currentIndex, selectedOption, total]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setFeedbackState(null);
    setShowResults(false);
  }, []);

  const resultMessage = useMemo(() => {
    const percentage = Math.round((score / total) * 100);
    if (percentage === 100) {
      return '🎉 ¡Excelente! Dominas completamente los conceptos clave.';
    }
    if (percentage >= 80) {
      return '👍 ¡Muy bien! Comprendes la mayoría de los conceptos de BI.';
    }
    if (percentage >= 60) {
      return '📚 Buen avance. Revisa algunos temas y vuelve a intentarlo.';
    }
    return '📖 Sigue practicando. Repasa el módulo y realiza el quiz nuevamente.';
  }, [score, total]);

  if (showResults) {
    return (
      <div className={styles.quizCard}>
        <div className={styles.quizResults}>
          <span className={styles.badge}>Evaluación completada</span>
          <h3 className={styles.sectionTitle}>Tu puntaje: {score} de {total}</h3>
          <p>{resultMessage}</p>
          <button type="button" className={styles.primaryButton} onClick={handleRestart}>
            Reintentar quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className={styles.quizCard}>
      <div className={styles.quizHeader}>
        <span className={styles.badge}>Pregunta {currentIndex + 1} de {total}</span>
        <div className={styles.quizProgress}>
          <div className={styles.quizProgressValue} style={{ width: `${progressValue}%` }} />
        </div>
        <p className={styles.quizQuestion}>{currentQuestion.question}</p>
      </div>

      <div className={styles.optionList}>
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrectOption =
            selectedOption !== null && option === currentQuestion.answer;
          const isIncorrectOption = isSelected && !isCorrectOption;

          return (
            <button
              key={option}
              type="button"
              className={`${styles.optionButton} ${
                isCorrectOption ? styles.optionCorrect : ''
              } ${isIncorrectOption ? styles.optionIncorrect : ''}`}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      {feedbackState && (
        <div
          className={`${styles.quizFeedback} ${
            feedbackState.isCorrect ? styles.feedbackPositive : styles.feedbackNegative
          }`}
          role="status"
        >
          <i
            className={`fa-solid ${
              feedbackState.isCorrect ? 'fa-check-circle' : 'fa-times-circle'
            }`}
            aria-hidden="true"
          />
          <span>{feedbackState.message}</span>
        </div>
      )}

      <div className={styles.quizActions}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          {currentIndex === total - 1 ? 'Ver resultados' : 'Siguiente pregunta'}
        </button>
      </div>
    </div>
  );
};

const ScrollToTopButton = ({ isVisible }) => {
  const handleClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <button
      type="button"
      className={`${styles.scrollTopButton} ${isVisible ? styles.scrollTopButtonVisible : ''}`}
      onClick={handleClick}
      aria-label="Volver arriba"
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
    </button>
  );
};

const BusinessIntelligencePage = () => {
  const [activeSection, setActiveSection] = useState('bienvenida');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target?.id) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const handleNavClick = useCallback((event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsNavOpen(false);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Módulo I: Aspectos Generales de Inteligencia de Negocios</title>
        <meta
          name="description"
          content="Curso interactivo de Business Intelligence: conceptos, beneficios, metodologías, tecnologías y quiz de evaluación."
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Helmet>

      <div className={styles.page}>
        <div className={styles.navWrapper}>
          <div className={styles.navInner}>
            <a href="#bienvenida" className={styles.brand} onClick={(event) => handleNavClick(event, 'bienvenida')}>
              <i className={`fa-solid fa-chart-line ${styles.brandIcon}`} aria-hidden="true" />
              <span>BI Academy</span>
            </a>
            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={isNavOpen}
              aria-controls="bi-page-navigation"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <i className={`fa-solid ${isNavOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
              <span className={styles.srOnly}>Abrir menú</span>
            </button>
            <nav
              id="bi-page-navigation"
              className={`${styles.nav} ${isNavOpen ? styles.navOpen : ''}`}
              aria-label="Navegación de la página"
            >
              <ul>
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleNavClick(event, item.id)}
                      className={activeSection === item.id ? styles.navActive : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <section id="bienvenida" className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.badge}>Módulo I</p>
              <h1 className={styles.heroTitle}>Aspectos Generales de Inteligencia de Negocios</h1>
              <p className={styles.heroDescription}>
                Descubre cómo transformar datos en decisiones estratégicas. Explora conceptos, metodologías y
                tecnologías que están revolucionando el mundo empresarial.
              </p>
              <a className={styles.ctaButton} href="#que-es-bi" onClick={(event) => handleNavClick(event, 'que-es-bi')}>
                Comenzar el aprendizaje
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </a>
              <div className={styles.authorCard}>
                <p>
                  <strong>Creado por:</strong> Johan Tapia
                </p>
                <div className={styles.authorList}>
                  <a
                    className={styles.authorLink}
                    href="https://www.linkedin.com/in/johan-tapia-192183281/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn de Johan Tapia"
                  >
                    <i className="fa-brands fa-linkedin" aria-hidden="true" />
                  </a>
                  <a className={styles.authorLink} href="mailto:johan.tapia@example.com" aria-label="Enviar correo">
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                  </a>
                  <a
                    className={`${styles.authorLink} ${styles.mobileOnly}`}
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <i className="fa-brands fa-github" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="que-es-bi" className={styles.section}>
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>¿Qué es la Inteligencia de Negocios?</h2>
              <p className={styles.sectionSubtitle}>Fundamentos y conceptos clave de Business Intelligence</p>
            </header>

            <div className={styles.cardGrid}>
              {componentList.map((item) => (
                <article key={item.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    <i className={item.icon} aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p>{item.description}</p>

                  {item.highlight && (
                    <div className={styles.highlightBox}>
                      <i className={`fa-solid fa-quote-left ${styles.highlightIcon}`} aria-hidden="true" />
                      <span>{item.highlight.text}</span>
                    </div>
                  )}

                  {item.orderedList && (
                    <ol className={styles.inlineList}>
                      {item.orderedList.map((listItem) => (
                        <li key={listItem}>{listItem}</li>
                      ))}
                    </ol>
                  )}

                  {item.codeBlock && (
                    <pre className={styles.codeBlock}>
                      <code>{item.codeBlock}</code>
                    </pre>
                  )}

                  {item.list && (
                    <ul className={styles.inlineList}>
                      {item.list.map((listItem) => (
                        <li key={listItem}>{listItem}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}

              <article className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <i className="fa-solid fa-building" aria-hidden="true" />
                  Casos por industria
                </h3>
                <div className={styles.metricList}>
                  {industryExamples.map((example) => (
                    <div key={example.heading} className={styles.metricItem}>
                      <div className={styles.metricLabel}>
                        <span>{example.heading}</span>
                        <i className="fa-solid fa-circle-info" aria-hidden="true" />
                      </div>
                      <p>{example.outcomes}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <i className="fa-solid fa-video" aria-hidden="true" />
                  Recursos complementarios
                </h3>
                <div className={styles.videoWrapper}>
                  <iframe
                    src="https://www.youtube.com/embed/qHNsFwbsU_Q"
                    title="What is Business Intelligence - IBM Technology"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <h4>Videos recomendados</h4>
                <ul className={styles.inlineList}>
                  {recommendedVideos.map((video) => (
                    <li key={video.url}>
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        {video.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <h4>Documentos y guías</h4>
                <ul className={styles.inlineList}>
                  {referenceDocs.map((doc) => (
                    <li key={doc.url}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        {doc.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="beneficios" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Beneficios cuantificables de BI</h2>
              <p className={styles.sectionSubtitle}>Impacto medible en las organizaciones</p>
            </header>

            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                <i className="fa-solid fa-chart-line" aria-hidden="true" />
                Ventajas estratégicas
              </h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th scope="col">Beneficio</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Impacto promedio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benefitsTableRows.map((row) => (
                      <tr key={row.title}>
                        <th scope="row">{row.title}</th>
                        <td>{row.description}</td>
                        <td>{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                <i className="fa-solid fa-trophy" aria-hidden="true" />
                Casos de éxito
              </h3>
              {successStories.map((story) => (
                <div key={story.title} className={styles.metricItem}>
                  <div className={styles.metricLabel}>
                    <span>{story.title}</span>
                    <i className="fa-solid fa-arrow-trend-up" aria-hidden="true" />
                  </div>
                  <ul className={styles.inlineList}>
                    {story.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          </div>
        </section>

        <section id="metodologias" className={styles.section}>
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Metodologías de implementación BI</h2>
              <p className={styles.sectionSubtitle}>Frameworks probados para proyectos exitosos</p>
            </header>

            <div className={styles.cardGrid}>
              {methodologies.map((method) => (
                <article key={method.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    <i className={method.icon} aria-hidden="true" />
                    {method.title}
                  </h3>
                  <p>
                    <strong>Enfoque:</strong> {method.focus}
                  </p>
                  {method.phases && (
                    <ol className={styles.inlineList}>
                      {method.phases.map((phase) => (
                        <li key={phase}>{phase}</li>
                      ))}
                    </ol>
                  )}
                  {method.features && (
                    <ul className={styles.inlineList}>
                      {method.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  <div className={styles.alertInfo}>
                    <strong>Ventaja clave:</strong> {method.highlight}
                  </div>
                </article>
              ))}

              <article className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <i className="fa-solid fa-rotate" aria-hidden="true" />
                  Comparación: Kimball vs Inmon
                </h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th scope="col">Aspecto</th>
                        <th scope="col">Kimball (Bottom-up)</th>
                        <th scope="col">Inmon (Top-down)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row.aspect}>
                          <th scope="row">{row.aspect}</th>
                          <td>{row.kimball}</td>
                          <td>{row.inmon}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="tecnologias" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Tecnologías y herramientas BI</h2>
              <p className={styles.sectionSubtitle}>Ecosistema tecnológico para decisiones data-driven</p>
            </header>

            <div className={styles.cardGrid}>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <i className="fa-solid fa-laptop-code" aria-hidden="true" />
                  Plataformas destacadas
                </h3>
                <div className={styles.metricList}>
                  {platformDetails.map((platform) => (
                    <div key={platform.name} className={styles.metricItem}>
                      <div className={styles.metricLabel}>
                        <span>{platform.name}</span>
                        <i className="fa-solid fa-star" aria-hidden="true" />
                      </div>
                      <ul className={styles.inlineList}>
                        {platform.description.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <i className="fa-solid fa-list-check" aria-hidden="true" />
                  Criterios de selección
                </h3>
                <div className={styles.metricList}>
                  {selectionCriteria.map((criterion) => (
                    <div key={criterion.label} className={styles.metricItem}>
                      <div className={styles.metricLabel}>
                        <span>{criterion.label}</span>
                        <span>{criterion.value}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressValue}
                          style={{ width: `${criterion.value}%` }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <i className="fa-solid fa-chart-column" aria-hidden="true" />
                  Dashboard CFO (Actual vs Budget)
                </h3>
                <div className={styles.metricList}>
                  {cfoMetrics.map((metric) => (
                    <div key={metric.label} className={styles.metricItem}>
                      <div className={styles.metricLabel}>
                        <span>{metric.label}</span>
                        <span>
                          {`$${metric.actual.toFixed(1)}M`}{' '}
                          <i className="fa-solid fa-arrow-right" aria-hidden="true" />{' '}
                          {`$${metric.target.toFixed(1)}M`}
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressValue}
                          style={{ width: `${Math.min((metric.actual / metric.target) * 100, 100)}%` }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="quiz" className={styles.section}>
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Quiz de evaluación</h2>
              <p className={styles.sectionSubtitle}>Pon a prueba tus conocimientos sobre Business Intelligence</p>
            </header>

            <Quiz questions={quizQuestions} />
          </div>
        </section>

        <footer className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionSubtitle}>
                &copy; 2025 BI Academy — Módulo I: Aspectos Generales de Inteligencia de Negocios
              </p>
              <p className={styles.sectionFooter}>
                Creado por <strong>Johan Tapia</strong>. Este material educativo se distribuye bajo licencia Creative Commons.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <ScrollToTopButton isVisible={showScrollTop} />
    </Layout>
  );
};

export default BusinessIntelligencePage;
