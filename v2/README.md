# /inVISIBLE — site

Musée numérique de la santé mentale. Parcours : **landing → hall central → 4 dômes**, aligné sur le design system (dégradé organique, Chestuh Script, IBM Plex).

## Pages

| Fichier | Page |
|---|---|
| `index.html` | Landing — « L'empreinte de nos silences » |
| `hall.html` | Hall central — « Prenez le temps de la Maison » |
| `dome-disparition.html` | Dôme · La disparition (Léa) |
| `dome-etau.html` | Dôme · L'Étau (Mateo) |
| `dome-derive.html` | Dôme · La Dérive (Aïcha) |
| `dome-veille.html` | Dôme · La Veille (Wren) |

## Deux formats

- **Racine** — code source multi-fichiers. Les pages référencent les dossiers partagés `shared/` (CSS, i18n) et `assets/` (polices, images). C'est la version à éditer / versionner.
- **`standalone/`** — mêmes pages, mais chaque fichier est **autonome** : polices, images et CSS encodés à l'intérieur du HTML. Aucun dossier requis, fonctionne hors-ligne. Idéal pour partage direct ou ouverture sans serveur.

## Structure

```
site/
├─ index.html              ← landing
├─ hall.html               ← hall central
├─ dome-disparition.html
├─ dome-etau.html
├─ dome-derive.html
├─ dome-veille.html
├─ shared/                 ← brand.css · tokens.css · i18n.js
├─ assets/                 ← polices (.otf) · images (.png)
└─ standalone/             ← 6 pages 100 % autonomes (assets embarqués)
```

## Lancer en local

Ouvrir `index.html` directement, ou servir le dossier :

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

## Navigation

`index` → `hall` → les dômes. Les dômes renvoient au hall ; *Dérive* ↔ *Veille* sont liés entre eux.
