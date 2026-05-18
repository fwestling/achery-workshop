// Workbench — UI kit components
const { useState, useMemo, useEffect, useRef } = React;

// ───────── Primitives ─────────────────────────────────────────────────────
function Glyph({ name, size = 14, className = '', style }) {
  return <img src={`../../assets/glyphs/${name}.svg`} style={{ width: size, height: size, display: 'inline-block', verticalAlign: 'middle', ...style }} className={className} alt="" />;
}

function Eyebrow({ children, count, after }) {
  return <div className="wb-eye">{children}{count != null && <span className="wb-eye-ct">{count}</span>}{after}</div>;
}

function Button({ variant = 'secondary', size = 'md', children, onClick, glyph, kbd, ...rest }) {
  return (
    <button className={`wb-btn wb-btn-${variant} wb-btn-${size}`} onClick={onClick} {...rest}>
      {glyph && <Glyph name={glyph} size={size === 'sm' ? 12 : 14} />}
      <span>{children}</span>
      {kbd && <span className="wb-kbd">{kbd}</span>}
    </button>
  );
}

function Field({ label, value, onChange, placeholder, hint, type = 'text', as = 'input', children, ...rest }) {
  const Tag = as;
  return (
    <label className="wb-fld">
      {label && <span className="wb-fld-lbl">{label}</span>}
      <Tag className="wb-fld-input" value={value} onChange={onChange} placeholder={placeholder} type={type} {...rest}>{children}</Tag>
      {hint && <span className="wb-fld-hint">{hint}</span>}
    </label>
  );
}

function Pill({ tone = 'neutral', children, dot = true }) {
  return <span className={`wb-pill wb-pill-${tone}`}>{dot && <span className="wb-pill-dot" />}{children}</span>;
}

function Marginalia({ glyph = 'fern', size = 120, accent = false }) {
  return <div className="wb-marg" style={{ width: size, height: size, color: accent ? 'var(--accent)' : 'var(--olive)' }}>
    <Glyph name={glyph} size={size} />
  </div>;
}

// ───────── App bar ────────────────────────────────────────────────────────
function AppBar({ dark, onToggleDark, accent, onAccentChange, onOpenComposer }) {
  return (
    <header className="wb-appbar">
      <div className="wb-brand">
        <Glyph name="hex" size={20} />
        <span className="wb-brand-mark">ACHERY</span>
        <span className="wb-brand-divider" />
        <span className="wb-brand-sub">workbench</span>
      </div>
      <div className="wb-search">
        <Glyph name="circle" size={12} />
        <input placeholder="Find a recipe, note, or page…" />
        <span className="wb-kbd">⌘K</span>
      </div>
      <div className="wb-appbar-right">
        <div className="wb-accent-row">
          {['terracotta','olive','plum','ochre','moss','rust'].map(c => (
            <button key={c} className={`wb-accent-chip ${accent === c ? 'on' : ''}`} style={{ background: `var(--${c === 'terracotta' ? 'terracotta' : c === 'olive' ? 'olive' : c === 'plum' ? 'plum' : c === 'ochre' ? 'ochre' : c === 'moss' ? 'moss' : 'rust'})` }} onClick={() => onAccentChange(c)} title={c} />
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={onToggleDark} glyph={dark ? 'sun' : 'moon'}>{dark ? 'Day' : 'Night'}</Button>
        <Button variant="accent" size="sm" onClick={onOpenComposer} glyph="plus" kbd="N">New recipe</Button>
        <div className="wb-avatar">A</div>
      </div>
    </header>
  );
}

// ───────── Sidebar ────────────────────────────────────────────────────────
function Sidebar({ section, onSection, counts }) {
  const groups = [
    { name: 'Working', items: [
      { id: 'workbench',   label: 'Workbench',   glyph: 'flask',   ct: counts.workbench },
      { id: 'field-guide', label: 'Field guide', glyph: 'book',    ct: counts.fieldGuide },
      { id: 'almanac',     label: 'Almanac',     glyph: 'moon',    ct: counts.almanac },
    ]},
    { name: 'Collection', items: [
      { id: 'pigments',  label: 'Pigments',  glyph: 'leaf',  ct: 12 },
      { id: 'bindings',  label: 'Bindings',  glyph: 'sprig', ct: 6 },
      { id: 'inks',      label: 'Inks',      glyph: 'feather', ct: 8 },
      { id: 'archive',   label: 'Archive',   glyph: 'scroll', ct: 204 },
    ]},
  ];
  return (
    <nav className="wb-sidebar">
      {groups.map((g, gi) => (
        <div key={gi} className="wb-side-group">
          <Eyebrow>{g.name}</Eyebrow>
          {g.items.map(it => (
            <button key={it.id} className={`wb-side-item ${section === it.id ? 'act' : ''}`} onClick={() => onSection(it.id)}>
              <Glyph name={it.glyph} size={14} />
              <span>{it.label}</span>
              <span className="wb-side-ct">{it.ct}</span>
            </button>
          ))}
        </div>
      ))}
      <div className="wb-side-footer">
        <Glyph name="compass" size={14} />
        <span>v 0·14 · field office</span>
      </div>
    </nav>
  );
}

// ───────── Recipe list ────────────────────────────────────────────────────
function RecipeList({ recipes, selectedId, onSelect, filter, onFilter }) {
  const filtered = useMemo(() => {
    if (filter === 'all') return recipes;
    return recipes.filter(r => r.state === filter);
  }, [recipes, filter]);

  return (
    <section className="wb-list">
      <div className="wb-list-head">
        <div>
          <Eyebrow>Workbench · open recipes</Eyebrow>
          <h1 className="wb-list-title">Eight current</h1>
        </div>
        <div className="wb-tabs">
          {['all','saved','drafting','stopped','archived'].map(f =>
            <button key={f} className={`wb-tab ${filter === f ? 'act' : ''}`} onClick={() => onFilter(f)}>{f}</button>
          )}
        </div>
      </div>
      <table className="wb-table">
        <thead>
          <tr>
            <th style={{width: 44}}>Ch.</th>
            <th>Recipe</th>
            <th>Chapter</th>
            <th>Yield</th>
            <th>Updated</th>
            <th style={{textAlign:'right'}}>State</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id} className={selectedId === r.id ? 'act' : ''} onClick={() => onSelect(r.id)}>
              <td className="wb-num">{r.ch}</td>
              <td><strong>{r.name}</strong></td>
              <td>{r.chapter}</td>
              <td className="wb-num">{r.yield}</td>
              <td className="wb-num">{r.updated}</td>
              <td style={{textAlign:'right'}}><Pill tone={r.state}>{r.state}</Pill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// ───────── Recipe detail ──────────────────────────────────────────────────
function RecipeDetail({ recipe, onClose }) {
  if (!recipe) {
    return (
      <aside className="wb-detail wb-detail-empty">
        <Glyph name="sigil" size={64} style={{ opacity: 0.5, color: 'var(--olive)' }} />
        <h4>Nothing selected</h4>
        <p>Pick a recipe to see the notes.</p>
      </aside>
    );
  }
  return (
    <aside className="wb-detail">
      <div className="wb-detail-head">
        <Eyebrow>Chapter {recipe.ch} · {recipe.chapter}</Eyebrow>
        <button className="wb-icon-btn" onClick={onClose} title="Close"><Glyph name="cross" size={14} /></button>
      </div>
      <h2 className="wb-detail-title">{recipe.name}</h2>
      <div className="wb-detail-meta">
        <Pill tone={recipe.state}>{recipe.state}</Pill>
        <span className="wb-meta-sep">·</span>
        <span>yield {recipe.yield}</span>
        <span className="wb-meta-sep">·</span>
        <span>updated {recipe.updated}</span>
      </div>
      <hr className="wb-rule-double" />
      <p className="wb-detail-body">{recipe.body}</p>
      <div className="wb-detail-tags">
        {recipe.tags.map(t => <span key={t} className="wb-tag">#{t}</span>)}
      </div>
      <hr />
      <div className="wb-detail-actions">
        <Button variant="primary" size="sm" glyph="feather">Edit</Button>
        <Button variant="secondary" size="sm" glyph="book">Open chapter</Button>
        <Button variant="ghost" size="sm" glyph="scroll">Archive</Button>
      </div>
      <div className="wb-detail-footnote">
        <Glyph name="asterism" size={36} style={{ opacity: 0.6 }} />
        <span>Field guide · ed. III · {recipe.ch}</span>
      </div>
    </aside>
  );
}

// ───────── Composer modal ─────────────────────────────────────────────────
function Composer({ open, onClose, onSave }) {
  const [name, setName] = useState('');
  const [chapter, setChapter] = useState('Pigments');
  const [yieldVal, setYieldVal] = useState('');
  const [body, setBody] = useState('');
  if (!open) return null;
  return (
    <div className="wb-modal-scrim" onClick={onClose}>
      <div className="wb-modal" onClick={e => e.stopPropagation()}>
        <div className="wb-modal-head">
          <Eyebrow>New recipe · draft</Eyebrow>
          <button className="wb-icon-btn" onClick={onClose}><Glyph name="cross" size={14} /></button>
        </div>
        <h2 className="wb-modal-title">A new entry for the field guide.</h2>
        <div className="wb-modal-grid">
          <Field label="Name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Saffron tincture" />
          <Field label="Chapter" as="select" value={chapter} onChange={e => setChapter(e.target.value)}>
            <option>Pigments</option><option>Inks</option><option>Stains</option><option>Bindings</option><option>Adhesives</option>
          </Field>
          <Field label="Expected yield" value={yieldVal} onChange={e => setYieldVal(e.target.value)} placeholder="ml / g / leaves" />
        </div>
        <Field label="Notes" as="textarea" value={body} onChange={e => setBody(e.target.value)} placeholder="Method, timing, weather, what to watch for." rows={5} />
        <div className="wb-modal-actions">
          <Button variant="ghost" onClick={onClose}>Discard</Button>
          <Button variant="primary" onClick={() => { onSave({ name, chapter, yield: yieldVal, body }); onClose(); }} glyph="tick" kbd="⌘↵">Save draft</Button>
        </div>
        <Marginalia glyph="flask" size={88} />
      </div>
    </div>
  );
}

Object.assign(window, { Glyph, Eyebrow, Button, Field, Pill, Marginalia, AppBar, Sidebar, RecipeList, RecipeDetail, Composer });
