const translations = {
  zh: {
    skipLink: "跳转至正文",
    navLabel: "主导航",
    navBio: "简介",
    navExperience: "工作经历",
    navProjects: "项目",
    socialProfiles: "社交主页",
    languageLabel: "语言",
    appearanceLabel: "外观",
    lightMode: "浅色",
    darkMode: "深色",
    bioLabel: "简介",
    heroRole: "首席数据科学家 · 副总监",
    heroTeam: "DTCC · 技术、研究与创新",
    bioParagraph1: "我常驻伦敦，从事数据科学工作，关注应用型人工智能研究与工程、预测分析和金融科技。我先学习物理，之后进入金融服务行业，先后从事投资银行技术和量化运营工作，目前专注于金融市场基础设施。",
    bioParagraph2: "工作之余，我会探索智能体系统、大语言模型工具链、知识图谱和实用的开发者工具。家里还有两只猫，Liz 和 Oreo。",
    photoCarousel: "肖像、猫咪和旅行地图",
    photoPortrait: "我的肖像",
    photoPortraitAlt: "我的插画肖像",
    photoCats: "Liz 和 Oreo",
    photoCatsAlt: "Liz 和 Oreo 在沙发上休息",
    photoMap: "我去过的地方",
    photoMapAlt: "标示曾到访地点的世界地图",
    photoNav: "切换照片",
    photoDots: "选择照片",
    previousPhoto: "上一张照片",
    nextPhoto: "下一张照片",
    showPortrait: "显示肖像",
    showCats: "显示 Liz 和 Oreo",
    showMap: "显示旅行地图",
    travelCaption: "我去过的地方",
    experienceTitle: "工作经历",
    dateNow: "目前",
    datePrevious: "此前",
    dateEarlier: "更早经历",
    rolePrincipal: "首席数据科学家",
    roleAssociate: "· 副总监",
    teamName: "技术、研究与创新",
    detailDtcc: "构建用于生产环境的机器学习系统，涵盖预测分析与检索增强生成（RAG）应用；参与 AI 平台建设，并使用 LLM-as-a-Judge 进行评估。",
    roleQrt: "交易运营工程师",
    detailQrt: "在量化研究公司运用 NLP 方法分析交易事件，并参与交易运营平台的建设。",
    roleDb: "数据科学家 / 人工智能工程师",
    detailDb: "从事金融服务领域的技术与数据工作，积累了将数据和人工智能应用于复杂系统的经验。",
    logoDtccAlt: "DTCC 官方标志",
    logoQrtAlt: "Qube Research & Technologies 官方标志",
    logoDbAlt: "Deutsche Bank 官方标志",
    projectsTitle: "项目",
    projectT212: "Trading 212 投资组合助手",
    projectT212Desc: "一个用于处理 Trading 212 投资组合数据的可复用助手技能，让个人理财流程更便于检查和使用。",
    openT212: "打开 Trading 212 项目",
    projectLaser: "脉冲激光优化中的机器学习",
    projectLaserDesc: "探索使用机器学习算法，在实验室实时优化脉冲激光输出。",
    openLaser: "打开脉冲激光优化项目",
    projectLhcb: "在 LHCb 数据中寻找信号",
    projectLhcbDesc: "设计决策树以识别粒子对撞实验中的信号，准确率达到 99%。在 25 人团队中负责每周向课程导师汇报进度。",
    projectPhysicists: "物理学家的复杂网络",
    projectPhysicistsDesc: "使用 BeautifulSoup 从 1,000 个维基百科页面提取文本和链接，通过无监督自然语言处理将物理学家分为五组，再用五种网络指标分析他们之间的联系与相对重要性。",
    openPhysicists: "打开物理学家复杂网络项目",
    openReport: "打开物理学家复杂网络报告",
    repository: "代码库",
    report: "报告",
    certificatesTitle: "专业认证",
    associateCertificate: "Google Cloud Associate Cloud Engineer 认证",
    mlCertificate: "Google Cloud Professional Machine Learning Engineer 认证",
    contactTitle: "联系方式",
    updated: "更新于 2026",
    top: "返回顶部",
    backToTop: "返回顶部",
    pageDescription: "范朝 — DTCC 首席数据科学家，关注数据科学、应用型人工智能与金融科技。"
  }
};

const root = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');
const description = document.querySelector('meta[name="description"]');
const originalDescription = description?.content || "";
const originalText = new WeakMap();
const originalAttributes = new WeakMap();
document.querySelectorAll("[data-i18n], [data-i18n-aria], [data-i18n-alt]").forEach((element) => {
  originalText.set(element, element.textContent);
  originalAttributes.set(element, {
    aria: element.getAttribute("aria-label"),
    alt: element.getAttribute("alt")
  });
});

function applyLanguage(language, save = false) {
  const locale = language === "zh" ? "zh" : "en";
  const words = translations[locale] || {};
  root.lang = locale === "zh" ? "zh-Hans" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = words[element.dataset.i18n];
    element.textContent = locale === "zh" && value ? value : originalText.get(element);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = words[element.dataset.i18nAria];
    const original = originalAttributes.get(element)?.aria;
    if (locale === "zh" && value) element.setAttribute("aria-label", value);
    else if (original !== null && original !== undefined) element.setAttribute("aria-label", original);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = words[element.dataset.i18nAlt];
    const original = originalAttributes.get(element)?.alt;
    if (locale === "zh" && value) element.setAttribute("alt", value);
    else if (original !== null && original !== undefined) element.setAttribute("alt", original);
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === locale));
  });
  if (description) description.setAttribute("content", locale === "zh" ? words.pageDescription : originalDescription);
  if (save) {
    try { localStorage.setItem("language", locale); } catch {}
  }
}

let savedLanguage = "en";
try { savedLanguage = localStorage.getItem("language") || "en"; } catch {}
applyLanguage(savedLanguage);
document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language, true));
});

function setTheme(theme, save = false) {
  const mode = theme === "dark" ? "dark" : "light";
  root.dataset.theme = mode;
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === mode));
  });
  if (themeColor) themeColor.setAttribute("content", mode === "dark" ? "#171a17" : "#f8f7f2");
  if (save) {
    try { localStorage.setItem("theme", mode); } catch {}
  }
}

setTheme(root.dataset.theme || "light");
document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeChoice, true));
});

// Photo stack supports dots and side arrows; automatic rotation pauses on focus/hover.
const carousel = document.getElementById("profile-carousel");
if (carousel) {
  const slides = [...carousel.querySelectorAll(".photo-slide")];
  const dots = [...carousel.querySelectorAll("[data-slide-to]")];
  const arrows = [...carousel.querySelectorAll("[data-slide-step]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = 0;
  let timer;

  function showSlide(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === active);
      slide.setAttribute("aria-hidden", String(i !== active));
    });
    dots.forEach((dot, i) => dot.setAttribute("aria-pressed", String(i === active)));
  }

  function stopRotation() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function startRotation() {
    if (reducedMotion || timer || document.hidden) return;
    timer = window.setInterval(() => showSlide(active + 1), 6000);
  }

  function chooseSlide(index) {
    showSlide(index);
    stopRotation();
    startRotation();
  }

  dots.forEach((dot) => dot.addEventListener("click", () => chooseSlide(Number(dot.dataset.slideTo))));
  arrows.forEach((arrow) => arrow.addEventListener("click", () => chooseSlide(active + Number(arrow.dataset.slideStep))));
  carousel.addEventListener("mouseenter", stopRotation);
  carousel.addEventListener("mouseleave", startRotation);
  carousel.addEventListener("focusin", stopRotation);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startRotation();
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stopRotation() : startRotation());
  showSlide(0);
  startRotation();
}
