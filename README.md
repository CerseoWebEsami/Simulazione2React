# TVmaze Tracker (React)

Applicazione web sviluppata in React (Vite) per la consultazione e la gestione di serie TV. Il progetto
utilizza la REST API pubblica di [TVmaze](https://www.tvmaze.com/api) ed è il porting in React del
progetto Simulazione1, mantenendo la stessa architettura logica (services, componenti, pagine) tradotta
in componenti funzionali e hook.

### Architettura e Struttura Directory

```text
├── index.html              # Entry point Vite
├── app/
│   ├── main.jsx             # Bootstrap dell'app React
│   ├── App.jsx               # Root component con le rotte
│   ├── App.css                # Foglio di stile globale
│   ├── components/            # Componenti UI riutilizzabili (card, tabella, modale, suggerimenti...)
│   ├── context/                # Context React (modale dettagli serie condivisa tra le pagine)
│   ├── pages/                   # Pagine/rotte dell'app (Home, Ricerca, Visti, Da vedere, Preferiti)
│   └── scripts/                  # Data access layer (API TVmaze) e persistenza localStorage
├── LICENSE
└── README.md
```

### Funzionalità Core

* **Ricerca Serie (`pages/Search.jsx`, `scripts/api.js`):** recupero delle serie tramite TVmaze con gestione della query, suggerimenti e caricamento dei risultati.
* **Dettagli e Schede (`components/ShowDetailsModal.jsx`, `components/ShowCard.jsx`, `components/ShowDetails.jsx`):** apertura di una scheda approfondita con informazioni sulla serie, cast e dati correlati.
* **Persistenza Client-Side (`scripts/storage.js`):** utilizzo di `localStorage` per conservare preferiti, viste, da vedere e cronologia tra sessioni diverse.
* **Rendering Dinamico (`components/ShowCard.jsx`, `components/RecordsTable.jsx`):** rendering React di liste, card e tabelle informative.

### Setup ed Esecuzione

```bash
npm install
npm run dev
```

Il server di sviluppo Vite sarà disponibile tipicamente su `http://localhost:5173`.

# Esercizi da Svolgere

Gli esercizi totali sono suddivisi in 3 macro-aree di intervento, ognuna con un peso specifico in termini di punteggio finale.
I primi due avranno anche dei commenti `TODO` all'interno del codice per guidarvi nei punti esatti in cui intervenire.
Il terzo esercizio richiede invece un'attività di debugging logico, per cui dovrete esplorare autonomamente i file per trovare e risolvere il problema.

### 1. INTEGRAZIONI DATI (60p)

**Obiettivo:** Ripristinare il sistema di recupero e visualizzazione dei dati delle serie TV. Il sito per ora da errore o mostra dati incompleti in praticamente tutte le sezioni chiave.

**Task richiesti:**

1. **Data Fetching in [app/scripts/api.js](app/scripts/api.js)**\
   Completa la logica della funzione `getShowById` in modo che effettui la/le chiamate corrette all'API di TVmaze per recuperare i dettagli di una serie, gestendo eventuali errori e ritornando i risultati attesi. Segui i TODO nel file per i dettagli tecnici.

2. **Data Binding & UI Rendering in [app/components/ShowCard.jsx](app/components/ShowCard.jsx)**\
   Una volta recuperati i dati, completa il componente `ShowCard` in modo che i dettagli della serie vengano visualizzati nella card (titolo, stato, rating, generi, descrizione). Segui i TODO nel file.

### 2. CORREZIONE LAYOUT (30p)

**Obiettivo:** Ripristinare la visualizzazione di alcune sezioni del sito che presentano anomalie strutturali ed estetiche.

**Task richiesti:**

1. **Struttura a Griglia in [app/pages/Search.jsx](app/pages/Search.jsx)**\
   Qualcuno ha rimosso le classi CSS necessarie per mostrare correttamente il pulsante di ricerca. Trova le classi mancanti (guarda negli altri pulsanti simili nell'app) e aggiungile al pulsante `#btn-search-show` per farlo apparire correttamente arancione e ben visibile.

2. **Layout Disallineato in [app/App.css](app/App.css)**\
   Nello stile è presente la regola per `.header-nav ul`, ma è rimasta praticamente vuota. Aggiungi le regole CSS necessarie per allineare correttamente i link del navbar, mantenendo un aspetto coerente con il design generale del sito.

3. **Design del Componente in [app/App.css](app/App.css)**\
   Tutti i pulsanti di eliminazione dei record all'interno delle tabelle (Preferiti, Visti, Da Vedere) sono attualmente privi di stile e poco visibili. Aggiungi una regola CSS per il selettore `.btn-danger` che dia a questi pulsanti un aspetto più evidente e coerente con il tema del sito. Segui le indicazioni specifiche nei TODO del file.

### 3. DEBUGGING LOGICO (10p)

**Obiettivo:** Individuare e risolvere un'anomalia nel flusso esecutivo della user interface.

**Problema riscontrato:**\
Quando viene aperto per la ***prima volta*** il sito, appare in tutte e tre le aree (Preferiti, Visti, Da Vedere) il record di una serie TV (Dark) che non dovrebbe essere presente. Se viene poi eliminato, il record scompare e non appare più.

**Task richiesti:**
1. Esamina il codice, comprendi da dove viene generato questo record e perché viene inserito nelle liste al primo caricamento del sito, nonostante non sia stato aggiunto dall'utente.
2. Correggi il bug in modo che questo record non appaia più al primo caricamento, ma che venga mostrato solo se effettivamente aggiunto dall'utente tramite le funzionalità del sito.
