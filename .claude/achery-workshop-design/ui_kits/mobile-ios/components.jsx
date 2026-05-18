// Achery Workshop — Mobile field notebook components

const stateColor = (s) => ({
  saved:    'var(--moss)',
  drafting: 'var(--ochre)',
  stopped:  'var(--rust)',
  archived: 'var(--plum)',
}[s] || 'var(--fg-3)');

function MobShell({ children, dark, tab, onTab, onCompose }) {
  return (
    <div className="m-shell">
      <MobHeader />
      <div className="m-body">{children}</div>
      <MobTabBar tab={tab} onTab={onTab} onCompose={onCompose} />
    </div>
  );
}

function MobHeader() {
  return (
    <div className="m-header">
      <div className="m-brand">
        <img src="../../assets/mark.svg" className="m-brand-mark" alt="" />
        <div>
          <div className="m-brand-name">ACHERY</div>
          <div className="m-brand-sub">— W O R K S H O P —</div>
        </div>
      </div>
      <button className="m-icon-btn" aria-label="search">
        <img src="../../assets/glyphs/search.svg" alt="" />
      </button>
    </div>
  );
}

function MobTabBar({ tab, onTab, onCompose }) {
  const tabs = [
    { id: 'entries',  label: 'Entries',  icon: 'book' },
    { id: 'today',    label: 'Today',    icon: 'leaf' },
    { id: 'almanac',  label: 'Almanac',  icon: 'moon' },
    { id: 'settings', label: 'Settings', icon: 'cog' },
  ];
  return (
    <div className="m-tabbar">
      {tabs.slice(0,2).map(t => (
        <button key={t.id} className={`m-tab ${tab===t.id?'act':''}`} onClick={() => onTab(t.id)}>
          <span className="m-tab-dot" />
          <span>{t.label}</span>
        </button>
      ))}
      <button className="m-fab" onClick={onCompose} aria-label="compose">+</button>
      {tabs.slice(2).map(t => (
        <button key={t.id} className={`m-tab ${tab===t.id?'act':''}`} onClick={() => onTab(t.id)}>
          <span className="m-tab-dot" />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function EntriesView({ entries, onOpen }) {
  return (
    <div className="m-list">
      <div className="m-list-head">
        <div className="m-eyebrow">Entries · {entries.length}</div>
        <h1 className="m-list-title">Field<br/>Notebook</h1>
      </div>
      <div className="m-filter-row">
        {['All','Inks','Dyes','Binders','Stains'].map((f,i) => (
          <button key={f} className={`m-chip ${i===0?'act':''}`}>{f}</button>
        ))}
      </div>
      {entries.map(e => (
        <button key={e.id} className="m-row" onClick={() => onOpen(e.id)}>
          <div className="m-row-ch">{e.ch}</div>
          <div className="m-row-body">
            <div className="m-row-title">{e.title}</div>
            <div className="m-row-sub">{e.sub}</div>
          </div>
          <div className="m-row-meta">
            <span className="m-pill" style={{color: stateColor(e.state)}}>
              <span className="m-pill-dot" /> {e.state}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function EntryDetail({ entry, onBack }) {
  if (!entry) return null;
  return (
    <div className="m-detail">
      <div className="m-detail-bar">
        <button className="m-back" onClick={onBack}>← Entries</button>
        <button className="m-icon-btn"><img src="../../assets/glyphs/more.svg" alt="" /></button>
      </div>
      <div className="m-detail-eyebrow">Ch. {entry.ch} · {entry.tag}</div>
      <h1 className="m-detail-title">{entry.title}</h1>
      <div className="m-detail-meta">
        <span className="m-pill" style={{color: stateColor(entry.state)}}>
          <span className="m-pill-dot" /> {entry.state}
        </span>
        <span className="m-sep">·</span>
        <span className="m-mono">edited 16:22</span>
      </div>
      <hr className="m-rule-double" />
      <div className="m-detail-body">
        <p>{entry.sub}.</p>
        <p>Steep at a low simmer; do not boil. The mordant goes in last — a small handful of alum, no more. The colour is a slow argument with the cloth.</p>
        <p className="m-foot">— see also: <a href="#">walnut hull stain</a>, <a href="#">cochineal carmine</a>.</p>
      </div>
      <div className="m-detail-actions">
        <button className="m-btn m-btn-primary">Edit</button>
        <button className="m-btn">Stamp</button>
        <button className="m-btn m-btn-ghost">Archive</button>
      </div>
    </div>
  );
}

function TodayView({ today }) {
  return (
    <div className="m-list">
      <div className="m-list-head">
        <div className="m-eyebrow">Today · 5 entries</div>
        <h1 className="m-list-title">A small<br/>day.</h1>
      </div>
      <div className="m-today">
        {today.map((t,i) => (
          <div key={i} className="m-today-row">
            <div className="m-today-time">{t.time}</div>
            <div className="m-today-body">
              <div className="m-today-text">{t.text}</div>
              <div className="m-today-tag">/{t.tag}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="m-foot-quote">"Three new footnotes." — see margin.</div>
    </div>
  );
}

function AlmanacView({ almanac }) {
  const cycleGlyph = (c) => ({ 'New':'○', 'Waxing':'◐', 'Full':'●', 'Waning':'◑' }[c] || '○');
  return (
    <div className="m-list">
      <div className="m-list-head">
        <div className="m-eyebrow">Week 23 · waxing → new</div>
        <h1 className="m-list-title">Almanac.</h1>
      </div>
      {almanac.map((a,i) => (
        <div key={i} className="m-alm-row">
          <div className="m-alm-day">{a.day}</div>
          <div className="m-alm-cycle"><span className="m-alm-glyph">{cycleGlyph(a.cycle)}</span>{a.cycle}</div>
          <div className="m-alm-note">{a.note}</div>
        </div>
      ))}
    </div>
  );
}

function SettingsView({ dark, onDark, accent, onAccent }) {
  const accents = [
    { id:'terracotta', c:'#c46a3a', n:'Terracotta' },
    { id:'olive',      c:'#6b6b3a', n:'Olive' },
    { id:'plum',       c:'#5d4a6a', n:'Plum' },
    { id:'ochre',      c:'#b8924a', n:'Ochre' },
    { id:'moss',       c:'#4a5a32', n:'Moss' },
    { id:'rust',       c:'#8a3a22', n:'Rust' },
  ];
  return (
    <div className="m-list">
      <div className="m-list-head">
        <div className="m-eyebrow">Settings</div>
        <h1 className="m-list-title">Adjustments.</h1>
      </div>

      <div className="m-set-section">
        <div className="m-eyebrow">Appearance</div>
        <div className="m-set-row">
          <span>Dark mode</span>
          <button className={`m-sw ${dark?'on':''}`} onClick={() => onDark(!dark)}>
            <span className="m-sw-knob" />
          </button>
        </div>
        <div className="m-set-row m-set-row-col">
          <span>Accent</span>
          <div className="m-accent-grid">
            {accents.map(a => (
              <button key={a.id} className={`m-accent-chip ${accent===a.id?'on':''}`} onClick={() => onAccent(a.id)}>
                <span className="m-accent-sw" style={{background: a.c}} />
                <span className="m-accent-name">{a.n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="m-set-section">
        <div className="m-eyebrow">Workshop</div>
        <div className="m-set-row"><span>Tabular figures</span><button className="m-sw on"><span className="m-sw-knob" /></button></div>
        <div className="m-set-row"><span>Marginalia</span><button className="m-sw on"><span className="m-sw-knob" /></button></div>
        <div className="m-set-row"><span>Reduce motion</span><button className="m-sw"><span className="m-sw-knob" /></button></div>
      </div>

      <div className="m-foot-quote">v0.4 · steeping</div>
    </div>
  );
}

function ComposeSheet({ open, onClose, onSave }) {
  const [title, setTitle] = React.useState('');
  const [tag, setTag] = React.useState('inks');
  if (!open) return null;
  return (
    <div className="m-sheet-scrim" onClick={onClose}>
      <div className="m-sheet" onClick={e => e.stopPropagation()}>
        <div className="m-sheet-handle" />
        <div className="m-eyebrow" style={{marginBottom: 6}}>New entry</div>
        <h2 className="m-sheet-title">Begin a new<br/>recipe.</h2>
        <div className="m-fld">
          <label className="m-fld-lbl">Title</label>
          <input className="m-fld-input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Iron-gall ink" />
        </div>
        <div className="m-fld">
          <label className="m-fld-lbl">Category</label>
          <div className="m-chip-row">
            {['inks','dyes','binders','stains','bindings'].map(t => (
              <button key={t} className={`m-chip ${tag===t?'act':''}`} onClick={() => setTag(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="m-fld">
          <label className="m-fld-lbl">First note</label>
          <textarea className="m-fld-input" rows="3" placeholder="What are you steeping today?" />
        </div>
        <div className="m-sheet-actions">
          <button className="m-btn m-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="m-btn m-btn-primary" onClick={() => { onSave({title: title || 'Untitled', tag}); onClose(); }}>Begin</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MobShell, EntriesView, EntryDetail, TodayView, AlmanacView, SettingsView, ComposeSheet });
