
// ---- DONNÉES ---- //
const SERVICES = [
  {
    id: 'consultation',
    nom: 'Consultation générale',
    desc: 'Médecin généraliste, 7j/7',
    detail: 'Consultation complète avec un médecin généraliste pour tout problème de santé, renouvellement d\'ordonnance ou bilan de santé.',
    prix: '5 000 FCFA',
    duree: '20 – 30 min',
    medecin: 'Dr. Kissal',
    horaires: 'Lun – Sam, 07h30 – 17h00',
    symptomes: ['Fièvre','Douleurs','Toux','Fatigue','Maux de tête','Ordonnance','Certificat médical'],
    icone: 'b',
    color: '#1A5C8A',
    bg: '#E8F4FD'
  },
  {
    id: 'pediatrie',
    nom: 'Pédiatrie',
    desc: 'Soins enfants et nourrissons',
    detail: 'Consultations spécialisées pour les enfants de 0 à 16 ans. Vaccinations, suivi de croissance, maladies infantiles.',
    prix: '6 000 FCFA',
    duree: '25 – 40 min',
    medecin: 'Dr. Fatima Aidara',
    horaires: 'Lun – Ven, 08h00 – 16h00',
    symptomes: ['Fièvre enfant','Vaccination','Croissance','Toux pédiatrique','Allergies','Diarrhée'],
    icone: 'v',
    color: '#2A9D6B',
    bg: '#E6F7F0'
  },
  {
    id: 'cardiologie',
    nom: 'Cardiologie',
    desc: 'ECG et suivi cardiovasculaire',
    detail: 'Consultation spécialisée pour les maladies cardiaques. Électrocardiogramme, suivi tensionnel, diagnostic des douleurs thoraciques.',
    prix: '10 000 FCFA',
    duree: '30 – 45 min',
    medecin: 'Dr. Moussa Ba',
    horaires: 'Mar & Jeu, 09h00 – 15h00',
    symptomes: ['Douleur thoracique','Palpitations','Essoufflement','Hypertension','Contrôle ECG'],
    icone: 'r',
    color: '#DC2626',
    bg: '#FEF2F2'
  },
  {
    id: 'biologie',
    nom: 'Analyses biologiques',
    desc: 'Bilan sanguin, urinaire et plus',
    detail: 'Prélèvement et analyse sur place. Résultats disponibles sous 24h à 48h. Bilan sanguin complet, glycémie, NFS, sérologies.',
    prix: '3 000 – 15 000 FCFA',
    duree: '10 – 15 min',
    medecin: 'Équipe de laboratoire',
    horaires: 'Lun – Sam, 07h00 – 12h30',
    symptomes: ['Bilan sanguin','Glycémie','NFS','Sérologie','Analyse urine','Lipides'],
    icone: 'b',
    color: '#1A5C8A',
    bg: '#E8F4FD'
  },
  {
    id: 'gynecologie',
    nom: 'Gynécologie',
    desc: 'Suivi prénatal et santé féminine',
    detail: 'Consultations gynécologiques, suivi de grossesse, contraception, frottis. Environnement bienveillant et confidentiel.',
    prix: '8 000 FCFA',
    duree: '30 – 40 min',
    medecin: 'Dr. Aïssatou Ndiaye',
    horaires: 'Lun, Mer & Ven, 08h30 – 15h30',
    symptomes: ['Suivi grossesse','Contraception','Frottis','Douleurs pelviennes','Règles irrégulières'],
    icone: 'p',
    color: '#7C3AED',
    bg: '#F5F3FF'
  },
  {
    id: 'echographie',
    nom: 'Échographie',
    desc: 'Imagerie médicale sur place',
    detail: 'Échographie abdominale, obstétricale et pelvienne réalisée par un médecin qualifié avec compte-rendu immédiat.',
    prix: '12 000 FCFA',
    duree: '20 – 30 min',
    medecin: 'Dr. Kissal',
    horaires: 'Mar, Jeu & Sam, 09h00 – 13h00',
    symptomes: ['Grossesse','Abdomen','Thyroïde','Reins','Foie','Vésicule'],
    icone: 'o',
    color: '#EA580C',
    bg: '#FFF7ED'
  }
];

const MEDECINS = [
  { initiales: 'DK', nom: 'Dr. Kissal',          spec: 'Médecin généraliste', jours: 'Lun – Sam',    classe: 'a-bleu',   services: ['consultation','echographie'] },
  { initiales: 'FA', nom: 'Dr. Fatima Aidara',   spec: 'Pédiatre',            jours: 'Lun – Ven',    classe: 'a-vert',   services: ['pediatrie'] },
  { initiales: 'MB', nom: 'Dr. Moussa Ba',        spec: 'Cardiologue',         jours: 'Mar & Jeu',    classe: 'a-rouge',  services: ['cardiologie'] },
  { initiales: 'AN', nom: 'Dr. Aïssatou Ndiaye', spec: 'Gynécologue',         jours: 'Lun, Mer & Ven', classe: 'a-orange', services: ['gynecologie'] }
];

// ---- ÉTAT ---- //
let currentPage     = 'p-accueil';
let rdvServicePreset = null;
let rdvMedecinPreset = null;
let selectedCreneau  = '08h00';

// ---- NAVIGATION ---- //
function switchPage(pageId, navBtn) {
  const pages   = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item');

  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));

  const target = document.getElementById(pageId);
  if (target) { target.classList.add('active'); }

  // Sync nav bar
  const matchNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (matchNav) matchNav.classList.add('active');
  else if (navBtn) navBtn.closest('.nav-item')?.classList.add('active');

  currentPage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Préremplir RDV si preset
  if (pageId === 'p-rdv') { initRDVPage(); }
}

// ---- DRAWER SERVICE ---- //
function openServiceDrawer(serviceId) {
  const svc = SERVICES.find(s => s.id === serviceId);
  if (!svc) return;

  const overlay = document.getElementById('drawer-overlay');
  const drawer  = document.getElementById('service-drawer');

  // Remplir le drawer
  document.getElementById('drawer-icon-wrap').style.background = svc.bg;
  document.getElementById('drawer-icon-svg').style.stroke = svc.color;
  document.getElementById('drawer-nom').textContent = svc.nom;
  document.getElementById('drawer-desc').textContent = svc.detail;
  document.getElementById('drawer-prix').textContent = svc.prix;
  document.getElementById('drawer-duree').textContent = svc.duree;
  document.getElementById('drawer-medecin').textContent = svc.medecin;
  document.getElementById('drawer-horaires').textContent = svc.horaires;

  // Symptômes
  const chips = document.getElementById('drawer-symptomes');
  chips.innerHTML = svc.symptomes.map(s =>
    `<span class="symptome-chip">${s}</span>`
  ).join('');

  // Bouton RDV
  const btnRdv = document.getElementById('drawer-btn-rdv');
  btnRdv.onclick = () => {
    rdvServicePreset = serviceId;
    closeDrawer();
    switchPage('p-rdv');
  };

  overlay.classList.add('open');
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('drawer-overlay').classList.remove('open');
  document.getElementById('service-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

// ---- PAGE RDV ---- //
function initRDVPage() {
  // Remplir sélecteur médecin
  const picker = document.getElementById('medecin-picker');
  picker.innerHTML = '';
  MEDECINS.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'med-option' + (i === 0 && !rdvMedecinPreset ? ' selected' : '');
    el.dataset.index = i;
    el.innerHTML = `
      <div class="med-option-avatar ${m.classe}" style="font-family:'Cormorant Garamond',serif">${m.initiales}</div>
      <div>
        <h4>${m.nom}</h4>
        <p>${m.spec}</p>
      </div>
      <div class="check-icon"></div>
    `;
    el.addEventListener('click', () => selectMedecin(i));
    picker.appendChild(el);
  });

  if (rdvMedecinPreset !== null) { selectMedecin(rdvMedecinPreset); }

  // Service preset
  if (rdvServicePreset) {
    const svc = SERVICES.find(s => s.id === rdvServicePreset);
    if (svc) {
      document.getElementById('motif-input').value = svc.nom;
    }
    rdvServicePreset = null;
  }

  // Date min = aujourd'hui
  const dateInput = document.getElementById('date-input');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  if (!dateInput.value) dateInput.value = today;

  updateRecap();
}

function selectMedecin(idx) {
  document.querySelectorAll('.med-option').forEach(el => el.classList.remove('selected'));
  const target = document.querySelector(`.med-option[data-index="${idx}"]`);
  if (target) target.classList.add('selected');
  rdvMedecinPreset = idx;
  updateRecap();
}

function selectCreneau(el) {
  if (el.classList.contains('indisponible')) return;
  document.querySelectorAll('.creneau').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedCreneau = el.dataset.heure;
  updateRecap();
}

function updateRecap() {
  const med  = MEDECINS[rdvMedecinPreset ?? 0];
  const date = document.getElementById('date-input')?.value;
  const motif = document.getElementById('motif-input')?.value || '—';
  const nom  = document.getElementById('nom-input')?.value || '—';

  if (document.getElementById('recap-nom'))    document.getElementById('recap-nom').textContent    = nom || '—';
  if (document.getElementById('recap-med'))    document.getElementById('recap-med').textContent    = med?.nom || '—';
  if (document.getElementById('recap-date'))   document.getElementById('recap-date').textContent   = date ? formatDate(date) : '—';
  if (document.getElementById('recap-heure'))  document.getElementById('recap-heure').textContent  = selectedCreneau;
  if (document.getElementById('recap-motif'))  document.getElementById('recap-motif').textContent  = motif;
}

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'long' });
}

function confirmerRDV() {
  const nom = document.getElementById('nom-input')?.value;
  const tel = document.getElementById('tel-input')?.value;
  if (!nom || !tel) {
    alert('Veuillez remplir votre nom et numéro de téléphone.');
    return;
  }
  document.getElementById('rdv-form-content').style.display = 'none';
  document.getElementById('rdv-success').classList.add('show');
}

// ---- INIT ---- //
document.addEventListener('DOMContentLoaded', () => {
  // Nav clicks
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const pageId = item.dataset.page;
      switchPage(pageId, item);
    });
  });

  // Fermer drawer en cliquant l'overlay
  document.getElementById('drawer-overlay')?.addEventListener('click', closeDrawer);

  // Inputs RDV live update
  document.getElementById('nom-input')?.addEventListener('input', updateRecap);
  document.getElementById('date-input')?.addEventListener('change', updateRecap);
  document.getElementById('motif-input')?.addEventListener('input', updateRecap);
});
