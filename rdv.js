'use strict';

const MEDECINS = [
  { initiales: 'DK', nom: 'Dr. Kissal',          spec: 'Médecin généraliste', ava: 'ava-b' },
  { initiales: 'FA', nom: 'Dr. Fatima Aidara',   spec: 'Pédiatre',            ava: 'ava-v' },
  { initiales: 'MB', nom: 'Dr. Moussa Ba',        spec: 'Cardiologue',         ava: 'ava-r' },
  { initiales: 'AN', nom: 'Dr. Aïssatou Ndiaye', spec: 'Gynécologue',         ava: 'ava-o' }
];

const MOTIFS = {
  consultation: 'Consultation générale',
  pediatrie:    'Pédiatrie',
  cardiologie:  'Cardiologie',
  biologie:     'Analyses biologiques',
  gynecologie:  'Gynécologie',
  echographie:  'Échographie'
};

let medActif = 0;

/* ---- Construire le picker médecin ---- */
function construirePicker() {
  const params = new URLSearchParams(location.search);
  const medParam = parseInt(params.get('med'));
  const svcParam = params.get('service');

  if (!isNaN(medParam) && medParam >= 0 && medParam < MEDECINS.length) medActif = medParam;
  if (svcParam && MOTIFS[svcParam]) document.getElementById('rdv-motif').value = MOTIFS[svcParam];

  const picker = document.getElementById('med-picker');
  picker.innerHTML = '';

  MEDECINS.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'med-opt' + (i === medActif ? ' sel' : '');
    el.dataset.index = i;
    el.innerHTML = `
      <div class="ava ${m.ava}" style="width:40px;height:40px;font-size:14px;">${m.initiales}</div>
      <div>
        <h4>${m.nom}</h4>
        <p>${m.spec}</p>
      </div>
      <div class="check"></div>`;
    el.addEventListener('click', () => choisirMedecin(i));
    picker.appendChild(el);
  });

  /* Date min = aujourd'hui */
  const di = document.getElementById('rdv-date');
  const today = new Date().toISOString().split('T')[0];
  di.min = today;
  if (!di.value) di.value = today;

  majRecap();
}

/* ---- Choisir médecin ---- */
function choisirMedecin(i) {
  medActif = i;
  document.querySelectorAll('.med-opt').forEach((el, idx) =>
    el.classList.toggle('sel', idx === i));
  majRecap();
}

/* ---- Mise à jour récap ---- */
function majRecap() {
  const nom   = document.getElementById('rdv-nom')?.value   || '—';
  const date  = document.getElementById('rdv-date')?.value  || '';
  const motif = document.getElementById('rdv-motif')?.value || '—';
  const heure = document.getElementById('rdv-heure')?.value || '—';
  const med   = MEDECINS[medActif];

  ecrire('recap-nom',   nom);
  ecrire('recap-med',   med?.nom || '—');
  ecrire('recap-date',  date ? formatDate(date) : '—');
  ecrire('recap-heure', heure);
  ecrire('recap-motif', motif || '—');
}

function ecrire(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function formatDate(s) {
  return new Date(s).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' });
}

/* ---- Confirmer RDV ---- */
function confirmerRDV() {
  const nom = document.getElementById('rdv-nom')?.value?.trim();
  const tel = document.getElementById('rdv-tel')?.value?.trim();
  if (!nom || !tel) {
    alert('Veuillez saisir votre nom complet et votre numéro de téléphone.');
    return;
  }
  document.getElementById('rdv-form-inner').style.display = 'none';
  const succes = document.getElementById('rdv-succes');
  succes.classList.add('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  construirePicker();
  ['rdv-nom','rdv-date','rdv-motif','rdv-heure'].forEach(id => {
    document.getElementById(id)?.addEventListener('input',  majRecap);
    document.getElementById(id)?.addEventListener('change', majRecap);
  });
});
