'use strict';

const DATA = {
  consultation: {
    nom: 'Consultation générale',
    desc: 'Consultation complète avec un médecin généraliste pour tout problème de santé, renouvellement d\'ordonnance ou bilan de santé général.',
    prix: '5 000 FCFA', duree: '20 – 30 min',
    medecin: 'Dr. Kissal', horaires: 'Lun – Sam · 07h30 – 17h00',
    tags: ['Fièvre','Douleurs','Toux','Fatigue','Maux de tête','Ordonnance','Certificat médical'],
    bg: '#E7F3FC', stroke: '#1558A8'
  },
  pediatrie: {
    nom: 'Pédiatrie',
    desc: 'Soins spécialisés pour les enfants de 0 à 16 ans : vaccinations, maladies infantiles, suivi de croissance et développement.',
    prix: '6 000 FCFA', duree: '25 – 40 min',
    medecin: 'Dr. Fatima Aidara', horaires: 'Lun – Ven · 08h00 – 16h00',
    tags: ['Fièvre enfant','Vaccinations','Croissance','Allergies','Diarrhée','Toux pédiatrique'],
    bg: '#E6F7F1', stroke: '#097A52'
  },
  cardiologie: {
    nom: 'Cardiologie',
    desc: 'Consultations cardiovasculaires, électrocardiogramme (ECG), suivi tensionnel, diagnostic des douleurs thoraciques.',
    prix: '10 000 FCFA', duree: '30 – 45 min',
    medecin: 'Dr. Moussa Ba', horaires: 'Mar & Jeu · 09h00 – 15h00',
    tags: ['Douleur thoracique','Palpitations','Essoufflement','Hypertension','ECG'],
    bg: '#FDE8E7', stroke: '#D93025'
  },
  biologie: {
    nom: 'Analyses biologiques',
    desc: 'Prélèvement et analyse sur place. Bilan sanguin, NFS, glycémie, sérologies. Résultats disponibles sous 24 à 48 heures.',
    prix: 'dès 3 000 FCFA', duree: '10 – 15 min',
    medecin: 'Équipe laboratoire', horaires: 'Lun – Sam · 07h00 – 12h30',
    tags: ['Bilan sanguin','Glycémie','NFS','Sérologie','Analyse urine','Cholestérol'],
    bg: '#EBF3FF', stroke: '#1558A8'
  },
  gynecologie: {
    nom: 'Gynécologie',
    desc: 'Consultations gynécologiques, suivi de grossesse, contraception, frottis, dans un cadre confidentiel et bienveillant.',
    prix: '8 000 FCFA', duree: '30 – 40 min',
    medecin: 'Dr. Aïssatou Ndiaye', horaires: 'Lun, Mer & Ven · 08h30 – 15h30',
    tags: ['Suivi grossesse','Contraception','Frottis','Douleurs pelviennes','Règles irrégulières'],
    bg: '#F0EAFA', stroke: '#6B3FA0'
  },
  echographie: {
    nom: 'Échographie',
    desc: 'Imagerie médicale abdominale, obstétricale et pelvienne réalisée par un médecin qualifié, avec compte-rendu immédiat.',
    prix: '12 000 FCFA', duree: '20 – 30 min',
    medecin: 'Dr. Kissal', horaires: 'Mar, Jeu & Sam · 09h00 – 13h00',
    tags: ['Grossesse','Abdomen','Thyroïde','Reins','Foie','Vésicule biliaire'],
    bg: '#FFF2E5', stroke: '#E06C00'
  }
};

function ouvrirDrawer(id) {
  const s = DATA[id];
  if (!s) return;

  document.getElementById('d-ico').style.background  = s.bg;
  document.getElementById('d-svg').style.stroke       = s.stroke;
  document.getElementById('d-nom').textContent        = s.nom;
  document.getElementById('d-desc').textContent       = s.desc;
  document.getElementById('d-prix').textContent       = s.prix;
  document.getElementById('d-duree').textContent      = s.duree;
  document.getElementById('d-medecin').textContent    = s.medecin;
  document.getElementById('d-horaires').textContent   = s.horaires;
  document.getElementById('d-tags').innerHTML         = s.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('d-btn').href               = `rdv.html?service=${id}`;

  document.getElementById('drawer-fond').classList.add('ouvert');
  document.getElementById('drawer').classList.add('ouvert');
  document.body.style.overflow = 'hidden';
}

function fermerDrawer() {
  document.getElementById('drawer-fond').classList.remove('ouvert');
  document.getElementById('drawer').classList.remove('ouvert');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('drawer-fond').addEventListener('click', fermerDrawer);
  /* Ouvrir depuis ancre URL (#cardiologie) */
  const hash = location.hash.slice(1);
  if (hash && DATA[hash]) ouvrirDrawer(hash);
});
