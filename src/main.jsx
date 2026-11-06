import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import YAML from 'yaml';
import contentText from '../content.yaml?raw';
import './style.css';

const c=YAML.parse(contentText);
function Visual({kind='hero',label}) {
  return <div className={'visual '+kind} role="img" aria-label={label||'Illustration conceptuelle de mode urbaine'}>
    <div className="architect a1"/><div className="architect a2"/>
    <div className="figure"><div className="head"/><div className="torso"/><div className="arm left"/><div className="arm right"/><div className="leg left"/><div className="leg right"/></div>
    <span className="visual-index">H/C — STUDY 001</span><span className="visual-disclaimer">VISUEL CONCEPTUEL · NON CONTRACTUEL</span>
  </div>;
}
function App() {
  const [submitted,setSubmitted]=useState(false);
  const [menu,setMenu]=useState(false);
  function submit(e){e.preventDefault();setSubmitted(true);e.currentTarget.reset();}
  return <>
    <div className="announcement">{c.announcement.text}<span>PARIS / FR</span></div>
    <header className="header">
      <a href="#top" className="logo">HORS<span>CHAMP</span><b>®</b></a>
      <button className="menu-button" aria-label="Ouvrir le menu" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?'FERMER':'MENU +'}</button>
      <nav className={menu?'open':''}>{c.navigation.links.map(x=><a key={x.href} href={x.href} onClick={()=>setMenu(false)}>{x.label}</a>)}</nav>
      <span className="header-mark">HC—001</span>
    </header>
    <main id="top">
      <section className="hero-section">
        <Visual kind="hero" label={c.hero.visual.description}/>
        <div className="hero-content">
          <div className="eyebrow"><span className="dot"/> {c.hero.eyebrow}</div>
          <h1>OUTSIDE<br/><em>SYSTEM</em><span className="asterisk">✳</span></h1>
          <p>{c.hero.subtitle}</p>
          <div className="actions">
            <a className="btn primary" href={c.drop.primary_cta.href}>{c.drop.primary_cta.label} <span>↗</span></a>
            <a className="btn ghost" href={c.drop.secondary_cta.href}>{c.drop.secondary_cta.label} <span>↘</span></a>
          </div>
        </div>
        <div className="hero-bottom"><span>01 / 04 — {c.drop.status}</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <section className="manifesto section" id="manifesto">
        <div className="section-kicker">[ 01 / MANIFESTE ]</div>
        <div><h2>NOT A SEASON.<br/><span>A SYSTEM.</span></h2><p>{c.manifesto.text}</p><div className="manifesto-footer">BUILT FOR THE OUTSIDE <span>↗</span></div></div>
      </section>
      <section className="lookbook section">
        <div className="section-head"><span className="section-kicker">[ 02 / LOOKBOOK ]</span><h2>IN MOTION<span className="signal">.</span></h2><p>{c.lookbook.description}</p></div>
        <div className="lookbook-grid"><Visual kind="look-one" label={c.lookbook.visuals[0].description}/><Visual kind="look-two" label={c.lookbook.visuals[1].description}/></div>
        <div className="lookbook-caption"><span>OUTSIDE SYSTEM / VISUAL STUDIES</span><span>01 — 02</span></div>
      </section>
      <section className="collection section" id="collection">
        <div className="section-head"><span className="section-kicker">[ 03 / THE COLLECTION ]</span><h2>THE FIRST<br/>FOUR<span className="signal">.</span></h2><p>{c.collection.subtitle}</p></div>
        <div className="products">{c.products.map((p,i)=><article className="product" key={p.id}>
          <div className={'product-art product-'+i}><div className="product-symbol">{['◢','▰','▱','◠'][i]}</div><span>HC / 0{i+1}</span><span>CONCEPT VISUAL</span></div>
          <div className="product-info"><div><span className="product-number">0{i+1} / 04</span><h3>{p.name}</h3><p>{p.description}</p></div><span className="product-status">{p.status}</span></div>
        </article>)}</div>
      </section>
      <section className="construction section">
        <span className="section-kicker">[ 04 / CONSTRUCTION ]</span><h2>BUILT TO<br/><span>BE WORN.</span></h2>
        <p className="construction-intro">{c.construction.introduction}</p>
        <div className="details">{c.construction.details.map((d,i)=><div key={d.title}><span>0{i+1}</span><h3>{d.title}</h3><p>{d.description}</p></div>)}</div>
        <small>{c.construction.note}</small>
      </section>
      <section className="access section" id="access">
        <div className="access-side"><span className="section-kicker">[ 05 / EARLY ACCESS ]</span><div className="big-asterisk">✳</div><span>DROP 01 / {c.drop.launch_date}</span></div>
        <div className="access-main">
          <h2>GET IN<br/><span>BEFORE.</span></h2><p>{c.access.text}</p>
          <form onSubmit={submit}><label htmlFor="email">{c.access.input_label}</label><div className="email-row"><input id="email" type="email" placeholder={c.access.input_placeholder} required autoComplete="email"/><button type="submit">{c.access.button_label} ↗</button></div></form>
          {submitted&&<div role="status" className="confirmation">{c.access.confirmation_message}</div>}
          <small>{c.access.disclaimer}</small>
        </div>
      </section>
    </main>
    <footer><div className="footer-top"><div className="logo footer-logo">HORS<span>CHAMP</span><b>®</b></div><div className="footer-links">{c.footer.links.map(x=>x.href?<a key={x.label} href={x.href}>{x.label}</a>:<span key={x.label} title={x.status}>{x.label} — à venir</span>)}</div></div><div className="footer-bottom"><span>{c.footer.copyright}</span><span>{c.footer.legal.map(x=>x.label).join(' · ')} — à compléter</span><a href="#top">RETOUR EN HAUT ↑</a></div></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
