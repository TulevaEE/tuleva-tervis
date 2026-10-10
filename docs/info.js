// Väike „i"-nupp, mis avab lihtsa inimliku selgituse modaalaknas.
// Sisu elab ühes kohas (DRY). Kasutus lehel:
//   <button class="info-dot" data-info="koloskoopia" aria-label="Mis on koloskoopia?">i</button>
//   <script src="info.js?v=1"></script>
// Uue teema lisamiseks pane kirje TOPICS-i ja viita data-info kaudu.
(function () {
  const TOPICS = {
    koloskoopia: {
      title: "Mis on koloskoopia?",
      html: `
        <p><strong>Koloskoopia on pärasoole kaudu tehtav uuring.</strong> Arst vaatab õhukese painduva kaameraga kogu su jämesoole üle. See on kõige täpsem viis soolt kontrollida.</p>
        <p><strong>Kuidas see käib?</strong></p>
        <ul>
          <li><strong>Ettevalmistus.</strong> Päev enne uuringut tuleb soolestik spetsiaalse joogiga (lahtistiga) tühjaks puhastada — seda teed kodus. Kui broneerid, antakse sulle täpsed juhised; midagi keerulist selles pole.</li>
          <li><strong>Uuring ise</strong> kestab tavaliselt umbes pool tundi. Soovi korral saad rahustit, nii et enamik inimesi ei tunne suurt midagi.</li>
          <li><strong>Vastuse</strong> saad arstilt kohe pärast uuringut — ta räägib sulle, mida nägi. Kui eemaldati polüüp, tuleb selle täpsem analüüs mõne nädala pärast.</li>
        </ul>
        <p>See on tavaline igapäevane uuring. Paljud kardavad seda ette rohkem, kui kogemus tegelikult on — enamik ütleb pärast, et midagi hullu polnud.</p>
      `,
    },
  };

  const style = document.createElement("style");
  style.textContent = `
    .info-dot{display:inline-flex;align-items:center;justify-content:center;width:1.2rem;height:1.2rem;margin:0 0.1rem 0 0.3rem;border-radius:999px;border:1px solid var(--blue,#006ce6);background:#fff;color:var(--blue,#006ce6);font-size:0.78rem;font-weight:700;font-style:normal;line-height:1;font-family:inherit;cursor:pointer;vertical-align:middle;padding:0;}
    .info-dot:hover{background:var(--blue,#006ce6);color:#fff;}
    .info-dot:focus-visible{outline:2px solid var(--blue,#006ce6);outline-offset:2px;}
    dialog.info-modal{max-width:33rem;width:calc(100% - 2rem);border:none;border-radius:0.6rem;padding:0;color:var(--text-primary,#293036);box-shadow:0 12px 44px rgba(0,47,99,.28);}
    dialog.info-modal::backdrop{background:rgba(0,47,99,.4);}
    .info-modal .info-inner{position:relative;padding:1.7rem 1.8rem;}
    .info-modal h3{font-size:1.3rem;color:var(--navy-blue,#002f63);margin:0 2rem 0.9rem 0;line-height:1.25;}
    .info-modal p,.info-modal ul{margin-bottom:0.8rem;line-height:1.55;}
    .info-modal ul{padding-left:1.25rem;}
    .info-modal li{margin-bottom:0.45rem;}
    .info-modal p:last-child,.info-modal ul:last-child{margin-bottom:0;}
    .info-modal .info-close{position:absolute;top:0.5rem;right:0.7rem;background:none;border:none;font-size:1.6rem;line-height:1;color:var(--text-secondary,#6b7074);cursor:pointer;padding:0.2rem 0.4rem;border-radius:0.3rem;}
    .info-modal .info-close:hover{color:var(--navy-blue,#002f63);background:var(--bg-soft,#f5f8fb);}
  `;
  document.head.appendChild(style);

  const dialog = document.createElement("dialog");
  dialog.className = "info-modal";
  dialog.innerHTML = `<div class="info-inner"><button type="button" class="info-close" aria-label="Sulge">×</button><div class="info-content"></div></div>`;
  document.body.appendChild(dialog);
  const content = dialog.querySelector(".info-content");

  dialog.querySelector(".info-close").addEventListener("click", () => dialog.close());
  // Taustale (backdrop) klõps sulgeb.
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

  document.querySelectorAll(".info-dot[data-info]").forEach((btn) => {
    const topic = TOPICS[btn.getAttribute("data-info")];
    if (!topic) return;
    btn.addEventListener("click", () => {
      content.innerHTML = `<h3>${topic.title}</h3>${topic.html}`;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  });
})();
