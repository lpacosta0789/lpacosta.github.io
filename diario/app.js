(() => {
  'use strict';

  // Cada estado de ánimo: etiqueta, palabras clave (sin acentos, como raíces) y una reflexión breve.
  const MOODS = {
    ansiedad:   { label: 'Ansiedad',     chip: 'Ansioso',      words: ['ansie', 'ansio', 'preocup', 'estres', 'nervio', 'angust', 'agobi', 'inquiet', 'panico', 'intranquil', 'insomni', 'no puedo dormir', 'abrumad', 'presion', 'tension', 'afan'], reflection: 'No tienes que cargarlo todo hoy. Respira y entrega una cosa a la vez.' },
    miedo:      { label: 'Miedo',        chip: 'Con miedo',    words: ['miedo', 'temo', 'temor', 'asust', 'aterr', 'insegur', 'peligro', 'amenaz', 'terror', 'cobard'], reflection: 'El valor no es no sentir miedo, sino saber que no caminas solo.' },
    tristeza:   { label: 'Tristeza',     chip: 'Triste',       words: ['trist', 'deprim', 'llor', 'lagrim', 'dolor', 'roto', 'rota', 'vacio', 'vacia', 'desanim', 'decepcion', 'herid', 'sufr', 'mal dia', 'bajon', 'melancol', 'desconsol'], reflection: 'Está bien no estar bien. Tus lágrimas también son vistas.' },
    soledad:    { label: 'Soledad',      chip: 'Solo',         words: ['me siento solo', 'me siento sola', 'estoy solo', 'estoy sola', 'soledad', 'nadie', 'abandon', 'aislad', 'olvidad', 'rechaz', 'ignor', 'extran', 'lejos de'], reflection: 'Aunque te sientas lejos de todos, no estás fuera de su alcance.' },
    cansancio:  { label: 'Cansancio',    chip: 'Cansado',      words: ['cansad', 'cansanc', 'agotad', 'exhaust', 'sin fuerza', 'no puedo mas', 'rendir', 'quemad', 'fatig', 'debil', 'harto', 'harta'], reflection: 'Descansar también es un acto de fe. Hoy puedes bajar el ritmo.' },
    culpa:      { label: 'Culpa',        chip: 'Con culpa',    words: ['culpa', 'arrepent', 'pecad', 'pecado', 'falle', 'falla', 'error', 'verguenza', 'avergonz', 'perdon', 'remordim', 'me equivoque'], reflection: 'Tu error no es tu identidad. Hay gracia para empezar de nuevo.' },
    enojo:      { label: 'Enojo',        chip: 'Enojado',      words: ['enoj', 'molest', 'ira', 'rabia', 'furi', 'odio', 'resent', 'irrit', 'injust', 'coraje', 'frustr'], reflection: 'Nombrar lo que te enoja es el primer paso para soltarlo.' },
    confusion:  { label: 'Confusión',    chip: 'Confundido',   words: ['confund', 'confusi', 'duda', 'dudo', 'no se que hacer', 'no se', 'decision', 'decidir', 'perdid', 'rumbo', 'direccion', 'indecis', 'camino'], reflection: 'No necesitas ver todo el camino, solo el siguiente paso.' },
    espera:     { label: 'Espera',       chip: 'Esperando',    words: ['esper', 'paciencia', 'impacien', 'futuro', 'tarda', 'promesa', 'sueno', 'meta', 'oportunidad', 'incertidumbre'], reflection: 'Lo que esperas no está olvidado. Los tiempos de Dios no llegan tarde.' },
    gratitud:   { label: 'Gratitud',     chip: 'Agradecido',   words: ['gracias', 'agradec', 'bendecid', 'bendicion', 'afortunad', 'gratitud'], reflection: 'Guarda este momento. La gratitud de hoy será fuerza mañana.' },
    alegria:    { label: 'Alegría',      chip: 'Feliz',        words: ['feliz', 'alegr', 'content', 'gozo', 'emocionad', 'buen dia', 'bien hoy', 'celebr', 'logre', 'en paz'], reflection: 'Disfruta este día. La alegría también es un regalo para compartir.' },
    duelo:      { label: 'Duelo',        chip: 'De duelo',     words: ['murio', 'muerte', 'fallec', 'perdi a', 'duelo', 'luto', 'extrano a', 'se fue', 'funeral', 'partio'], reflection: 'El amor no termina con la ausencia. Tu dolor es la medida de tu amor.' },
    salud:      { label: 'Salud',        chip: 'Enfermo',      words: ['enferm', 'salud', 'hospital', 'doctor', 'medic', 'diagnost', 'cirugia', 'operacion', 'cancer', 'sanar', 'sanidad', 'dolor de'], reflection: 'Cuida tu cuerpo y deja que alguien cuide de ti. No estás solo en esto.' },
    provision:  { label: 'Provisión',    chip: 'Por dinero o trabajo', words: ['dinero', 'trabajo', 'empleo', 'deuda', 'pagar', 'renta', 'despid', 'econom', 'finanz', 'negocio', 'jefe', 'sueldo', 'quincena', 'gastos'], reflection: 'Haz tu parte con calma. Tu valor no depende de tu cuenta bancaria.' },
    relaciones: { label: 'Relaciones',   chip: 'Por alguien',  words: ['pareja', 'novi', 'espos', 'matrimonio', 'familia', 'mama', 'papa', 'hijo', 'hija', 'herman', 'amig', 'pelea', 'discut', 'ruptura', 'termin', 'amor', 'relacion'], reflection: 'Las relaciones se sanan con paciencia. Empieza por lo que sí depende de ti.' },
    fortaleza:  { label: 'Ánimo',        chip: 'Necesito ánimo', words: ['animo', 'fuerza', 'fortalez', 'valor', 'reto', 'dificil', 'lucha', 'prueba', 'batalla', 'no puedo'], reflection: 'Eres más fuerte de lo que hoy sientes, y no lo haces solo.' },
  };

  const STORE = 'selah.entries.v1';

  // Enlaces a YouVersion (bible.com): id numérico y abreviatura de cada versión.
  const YV_VERSIONS = [
    { name: 'RVR1960', id: 149, abbr: 'RVR1960' },
    { name: 'NVI', id: 128, abbr: 'NVI' },
    { name: 'NTV', id: 127, abbr: 'NTV' },
    { name: 'TLA', id: 176, abbr: 'TLA' },
  ];
  const USFM = {
    'Filipenses': 'PHP', '1 Pedro': '1PE', 'Mateo': 'MAT', 'Salmos': 'PSA', 'Juan': 'JHN', 'Isaías': 'ISA', 'Josué': 'JOS',
    '2 Timoteo': '2TI', 'Deuteronomio': 'DEU', 'Apocalipsis': 'REV', 'Hebreos': 'HEB', 'Gálatas': 'GAL', '2 Corintios': '2CO',
    '1 Juan': '1JN', 'Romanos': 'ROM', 'Lamentaciones': 'LAM', 'Efesios': 'EPH', 'Santiago': 'JAS', 'Proverbios': 'PRO',
    'Colosenses': 'COL', 'Jeremías': 'JER', 'Eclesiastés': 'ECC', 'Habacuc': 'HAB', '1 Tesalonicenses': '1TH',
    'Nehemías': 'NEH', 'Sofonías': 'ZEP', 'Números': 'NUM', '3 Juan': '3JN', '1 Corintios': '1CO', 'Miqueas': 'MIC',
  };
  function yvLink(ref, v) {
    const m = ref.match(/^(.+) (\d+):([\d-]+)$/);
    if (!m || !USFM[m[1]]) return null;
    return `https://www.bible.com/bible/${v.id}/${USFM[m[1]]}.${m[2]}.${m[3]}.${v.abbr}`;
  }
  const $ = (id) => document.getElementById(id);
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zñ\s]/g, ' ');

  const state = { mood: null, chosenMood: null, verse: null, shown: {} };

  // ---------- Fecha ----------
  const _d = new Date().toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });
  $('today').textContent = _d.charAt(0).toUpperCase() + _d.slice(1);

  // ---------- Chips ----------
  const moodsEl = $('moods');
  Object.entries(MOODS).forEach(([key, m]) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = m.chip;
    b.dataset.mood = key; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      state.chosenMood = state.chosenMood === key ? null : key;
      moodsEl.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.mood === state.chosenMood)));
    });
    moodsEl.appendChild(b);
  });

  // ---------- Detección del estado de ánimo ----------
  function detectMood(text) {
    const t = ' ' + norm(text) + ' ';
    let best = null, bestScore = 0;
    for (const [key, m] of Object.entries(MOODS)) {
      let score = 0;
      for (const w of m.words) {
        const re = new RegExp('(^|\\s)' + w.replace(/ /g, '\\s+'), 'g');
        const hits = t.match(re);
        if (hits) score += hits.length * (w.includes(' ') ? 2 : 1);
      }
      if (score > bestScore) { best = key; bestScore = score; }
    }
    return best || 'fortaleza';
  }

  function pickVerse(mood) {
    const list = window.VERSES[mood];
    const seen = state.shown[mood] || (state.shown[mood] = []);
    if (seen.length >= list.length) seen.length = 0;
    const options = list.filter((v) => !seen.includes(v.ref));
    const v = options[Math.floor(Math.random() * options.length)];
    seen.push(v.ref);
    return v;
  }

  function show(mood) {
    const v = pickVerse(mood);
    state.mood = mood; state.verse = v;
    $('r-mood').textContent = MOODS[mood].label;
    $('r-text').textContent = v.text;
    $('r-ref').textContent = v.ref + ' · RV1909';
    $('r-reflection').textContent = MOODS[mood].reflection;
    const links = $('r-links'); links.innerHTML = '';
    for (const ver of YV_VERSIONS) {
      const href = yvLink(v.ref, ver); if (!href) continue;
      const a = document.createElement('a');
      a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = ver.name;
      links.appendChild(a);
    }
    const card = $('result');
    card.hidden = false;
    card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  $('find').addEventListener('click', () => {
    const text = $('entry').value.trim();
    if (!text && !state.chosenMood) { toast('Escribe algo o elige cómo te sientes'); $('entry').focus(); return; }
    show(state.chosenMood || detectMood(text));
  });
  $('another').addEventListener('click', () => state.mood && show(state.mood));

  $('copy').addEventListener('click', async () => {
    const s = `“${state.verse.text}” — ${state.verse.ref}`;
    try { await navigator.clipboard.writeText(s); toast('Versículo copiado'); }
    catch { toast('No se pudo copiar'); }
  });

  // ---------- Diario ----------
  function load() { try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch { return []; } }
  function persist(list) { try { localStorage.setItem(STORE, JSON.stringify(list)); return true; } catch { return false; } }

  $('save').addEventListener('click', () => {
    const list = load();
    list.unshift({ id: Date.now(), date: new Date().toISOString(), text: $('entry').value.trim(), mood: state.mood, ref: state.verse.ref, verse: state.verse.text });
    if (!persist(list)) { toast('No se pudo guardar en este navegador'); return; }
    toast('Guardado en tu diario');
    $('entry').value = ''; state.chosenMood = null;
    moodsEl.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', 'false'));
    $('result').hidden = true;
    render();
  });

  function render() {
    const list = load(), ol = $('entries');
    ol.innerHTML = '';
    $('empty').hidden = list.length > 0;
    $('export').hidden = list.length === 0;
    for (const e of list) {
      const li = document.createElement('li'); li.className = 'entry';
      const d = new Date(e.date).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      li.innerHTML = `<div class="entry-meta"><span></span><button class="delete" type="button">Borrar</button></div>
        ${e.text ? '<p class="entry-text"></p>' : ''}
        <p class="entry-verse"><span></span><b></b></p>`;
      li.querySelector('.entry-meta span').textContent = `${d} · ${MOODS[e.mood]?.label || ''}`;
      if (e.text) li.querySelector('.entry-text').textContent = e.text;
      li.querySelector('.entry-verse span').textContent = `“${e.verse}”`;
      li.querySelector('.entry-verse b').textContent = e.ref;
      li.querySelector('.delete').addEventListener('click', () => {
        if (!confirm('¿Borrar esta entrada?')) return;
        persist(load().filter((x) => x.id !== e.id)); render();
      });
      ol.appendChild(li);
    }
  }

  $('export').addEventListener('click', () => {
    const txt = load().map((e) => `${new Date(e.date).toLocaleString('es')} — ${MOODS[e.mood]?.label || ''}\n${e.text || '(sin texto)'}\n“${e.verse}” — ${e.ref}\n`).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }));
    a.download = 'mi-diario-selah.txt'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  // ---------- Pestañas ----------
  document.querySelectorAll('.tabs button').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    document.querySelectorAll('.view').forEach((v) => v.classList.toggle('active', v.id === btn.dataset.view));
    if (btn.dataset.view === 'view-journal') render();
    window.scrollTo({ top: 0 });
  }));

  let tId;
  function toast(msg) {
    const t = $('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(tId); tId = setTimeout(() => t.classList.remove('show'), 2000);
  }

  render();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
