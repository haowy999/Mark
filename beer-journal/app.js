const STORAGE_KEY = "beer-journal.records.v1";

const statusLabels = {
  wishlist: "想喝",
  done: "已喝",
  avoid: "不想再喝",
};

const beerStyleGroups = [
  {
    name: "IPA 系（India Pale Ale）",
    styles: [
      "English IPA（英式IPA）",
      "American IPA（美式IPA）",
      "West Coast IPA（西海岸IPA）",
      "East Coast IPA（东海岸IPA）",
      "New England IPA / Hazy IPA（新英格兰浑浊IPA）",
      "Double IPA / Imperial IPA（双倍IPA）",
      "Triple IPA（三倍IPA）",
      "Session IPA（低度IPA）",
      "Black IPA（黑IPA）",
      "White IPA（白IPA）",
      "Red IPA（红IPA）",
      "Rye IPA（黑麦IPA）",
      "Brut IPA（香槟IPA）",
      "Cold IPA（冷IPA）",
      "Milkshake IPA（奶昔IPA）",
      "Fruited IPA（水果IPA）",
      "Belgian IPA（比利时IPA）",
    ],
  },
  {
    name: "Pale Ale 系（淡色艾尔）",
    styles: [
      "English Pale Ale（英式淡艾）",
      "American Pale Ale / APA（美式淡艾）",
      "Blonde Ale（金色艾尔）",
      "Golden Ale（金艾尔）",
      "Amber Ale（琥珀艾尔）",
      "Red Ale（红艾尔）",
      "Brown Ale（棕艾尔）",
      "Scottish Ale（苏格兰艾尔）",
      "Irish Red Ale（爱尔兰红艾）",
    ],
  },
  {
    name: "小麦啤酒（Wheat Beer）",
    styles: [
      "Hefeweizen（德式小麦）",
      "Dunkelweizen（深色小麦）",
      "Weizenbock（小麦博克）",
      "Kristallweizen（水晶小麦）",
      "Witbier（比利时白啤）",
      "American Wheat Ale（美式小麦）",
      "Berliner Weisse（柏林酸小麦）",
    ],
  },
  {
    name: "世涛（Stout）",
    styles: [
      "Dry Stout（干世涛）",
      "Oatmeal Stout（燕麦世涛）",
      "Milk Stout / Sweet Stout（牛奶世涛）",
      "Imperial Stout（帝国世涛）",
      "Russian Imperial Stout（俄式帝国世涛）",
      "Pastry Stout（甜品世涛）",
      "Coffee Stout（咖啡世涛）",
      "Chocolate Stout（巧克力世涛）",
      "Oyster Stout（生蚝世涛）",
      "Barrel-aged Stout（桶陈世涛）",
    ],
  },
  {
    name: "波特（Porter）",
    styles: [
      "English Porter（英式波特）",
      "American Porter（美式波特）",
      "Robust Porter（强烈波特）",
      "Baltic Porter（波罗的海波特）",
      "Smoked Porter（烟熏波特）",
    ],
  },
  {
    name: "拉格（Lager）",
    styles: [
      "American Lager（美式拉格）",
      "Pale Lager（淡色拉格）",
      "Premium Lager（高级拉格）",
      "Rice Lager（日式米拉格）",
      "Mexican Lager（墨西哥拉格）",
      "Helles（海勒斯）",
      "Pilsner / Pils（皮尔森）",
      "Czech Pilsner（捷克皮尔森）",
      "German Pilsner（德式皮尔森）",
      "Kellerbier（窖藏啤酒）",
      "Märzen（马增）",
      "Vienna Lager（维也纳拉格）",
      "Dunkel（深色拉格）",
      "Schwarzbier（黑拉格）",
      "Bock（博克）",
      "Doppelbock（双料博克）",
      "Eisbock（冰博克）",
      "Rauchbier（烟熏啤酒）",
    ],
  },
  {
    name: "比利时体系（Belgian Ale）",
    styles: [
      "Belgian Blonde Ale（比利时金艾）",
      "Belgian Pale Ale（比利时淡艾）",
      "Dubbel（双料）",
      "Tripel（三料）",
      "Quadrupel（四料）",
      "Belgian Strong Dark Ale（比利时深色烈性艾尔）",
      "Belgian Strong Golden Ale（比利时金色烈性艾尔）",
      "Saison（赛松）",
      "Farmhouse Ale（农舍艾尔）",
      "Bière de Garde（守护啤酒）",
      "Abbey Ale（修道院艾尔）",
      "Trappist Ale（修道士啤酒）",
    ],
  },
  {
    name: "酸啤（Sour & Wild Ale）",
    styles: [
      "Sour Ale（酸艾尔）",
      "Berliner Weisse（柏林酸小麦）",
      "Gose（古斯）",
      "Lambic（兰比克）",
      "Gueuze（贵兹）",
      "Flanders Red Ale（法兰德斯红艾）",
      "Flanders Brown Ale（法兰德斯棕艾）",
      "Wild Ale（野菌艾尔）",
      "Fruited Sour（水果酸啤）",
      "Pastry Sour（甜品酸）",
    ],
  },
  {
    name: "传统英式风格",
    styles: [
      "Mild Ale（淡味艾尔）",
      "Bitter（苦啤）",
      "Extra Special Bitter / ESB（特苦艾尔）",
      "Old Ale（陈年艾尔）",
      "Barleywine（大麦烈酒）",
      "English Strong Ale（英式烈性艾尔）",
    ],
  },
  {
    name: "烈性/特殊风格",
    styles: [
      "Barleywine（大麦酒）",
      "Scotch Ale（苏格兰烈性艾尔）",
      "Wee Heavy（重型苏格兰艾尔）",
      "Belgian Strong Ale（比利时烈性艾尔）",
      "Strong Ale（烈性艾尔）",
      "Winter Warmer（冬季暖身啤酒）",
    ],
  },
  {
    name: "水果/增味类",
    styles: [
      "Fruited Beer（水果啤酒）",
      "Cherry Beer（樱桃啤酒）",
      "Peach Sour（桃子酸）",
      "Mango IPA（芒果IPA）",
      "Coconut Stout（椰子世涛）",
      "Peanut Butter Stout（花生酱世涛）",
      "Honey Ale（蜂蜜艾尔）",
      "Herb & Spice Beer（香料啤酒）",
    ],
  },
  {
    name: "烟熏/木桶类",
    styles: [
      "Smoked Beer（烟熏啤酒）",
      "Rauchbier（德式烟熏）",
      "Barrel-aged Beer（桶陈啤酒）",
      "Bourbon Barrel Stout（波本桶世涛）",
      "Wine Barrel Ale（红酒桶艾尔）",
    ],
  },
  {
    name: "实验性/现代新派",
    styles: [
      "Pastry Beer（甜品啤酒）",
      "Smoothie Sour（冰沙酸）",
      "Slushy Sour（冰沙酸啤）",
      "Hybrid IPA（混合IPA）",
      "Brut IPA（香槟IPA）",
      "Cold IPA（冷IPA）",
      "India Pale Lager / IPL（印度淡色拉格）",
      "Hard Seltzer（硬气泡酒）",
      "Non-Alcoholic Craft Beer（精酿无醇）",
    ],
  },
  {
    name: "国内 Taproom 常见菜单",
    styles: [
      "日式拉格",
      "德式皮尔森",
      "小麦",
      "Hazy IPA",
      "West Coast IPA",
      "酸啤",
      "帝国世涛",
      "水果增味",
      "桶陈",
    ],
  },
];

let beers = loadBeers().map(normalizeBeer);
let imageData = "";
let activeView = "all";

const elements = {
  totalCount: document.querySelector("#totalCount"),
  doneCount: document.querySelector("#doneCount"),
  wishlistCount: document.querySelector("#wishlistCount"),
  repeatCount: document.querySelector("#repeatCount"),
  searchInput: document.querySelector("#searchInput"),
  sortSelect: document.querySelector("#sortSelect"),
  beerList: document.querySelector("#beerList"),
  emptyPanel: document.querySelector("#emptyPanel"),
  dialog: document.querySelector("#beerDialog"),
  form: document.querySelector("#beerForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  beerId: document.querySelector("#beerId"),
  imageInput: document.querySelector("#imageInput"),
  imagePreview: document.querySelector("#imagePreview"),
  imageHint: document.querySelector("#imageHint"),
  nameInput: document.querySelector("#nameInput"),
  breweryInput: document.querySelector("#breweryInput"),
  formStatusInput: document.querySelector("#formStatusInput"),
  ratingInput: document.querySelector("#ratingInput"),
  ratingPicker: document.querySelector("#ratingPicker"),
  drinkDateInput: document.querySelector("#drinkDateInput"),
  styleGroupInput: document.querySelector("#styleGroupInput"),
  styleInput: document.querySelector("#styleInput"),
  styleOptions: document.querySelector("#styleOptions"),
  abvInput: document.querySelector("#abvInput"),
  ibuInput: document.querySelector("#ibuInput"),
  placeNameInput: document.querySelector("#placeNameInput"),
  addressInput: document.querySelector("#addressInput"),
  tagsInput: document.querySelector("#tagsInput"),
  notesInput: document.querySelector("#notesInput"),
  repeatInput: document.querySelector("#repeatInput"),
  deleteButton: document.querySelector("#deleteButton"),
  importInput: document.querySelector("#importInput"),
};

document.querySelector("#newBeerButton").addEventListener("click", () => openForm());
document.querySelector("#emptyNewButton").addEventListener("click", () => openForm());
document.querySelector("#closeDialogButton").addEventListener("click", closeForm);
document.querySelector("#cancelButton").addEventListener("click", closeForm);
document.querySelector("#exportButton").addEventListener("click", exportData);
elements.importInput.addEventListener("change", importData);
elements.styleGroupInput.addEventListener("change", () => populateStyleOptions());
elements.styleInput.addEventListener("change", matchStyleInput);
elements.styleInput.addEventListener("blur", matchStyleInput);
elements.searchInput.addEventListener("input", render);
elements.sortSelect.addEventListener("change", render);
elements.imageInput.addEventListener("change", handleImage);
elements.deleteButton.addEventListener("click", deleteCurrentBeer);
elements.form.addEventListener("submit", saveBeer);
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeView = button.dataset.view;
    document.querySelectorAll(".tab-button").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    render();
  });
});

populateStyleGroups();
renderRatingPicker();
render();

function loadBeers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(beers));
}

function render() {
  renderStats();
  const visibleBeers = getVisibleBeers();
  elements.beerList.innerHTML = "";
  elements.emptyPanel.classList.toggle("visible", visibleBeers.length === 0);

  renderBeerList(visibleBeers);
}

function renderStats() {
  elements.totalCount.textContent = beers.length;
  elements.doneCount.textContent = beers.filter((beer) => beer.status === "done").length;
  elements.wishlistCount.textContent = beers.filter((beer) => beer.status === "wishlist").length;
  elements.repeatCount.textContent = beers.filter((beer) => beer.wouldRepeat).length;
}

function getVisibleBeers() {
  const keyword = elements.searchInput.value.trim().toLowerCase();
  const sortBy = elements.sortSelect.value;

  return beers
    .filter((beer) => {
      const haystack = [
        beer.name,
        beer.brewery,
        beer.styleGroup,
        beer.style,
        beer.placeName,
        beer.address,
        beer.notes,
        ...(beer.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      const keywordMatch = !keyword || haystack.includes(keyword);
      const viewMatch =
        activeView === "all" ||
        activeView === "brewery" ||
        activeView === "style" ||
        (activeView === "highRating" && Number(beer.rating || 0) >= 4) ||
        (activeView === "repeat" && beer.wouldRepeat);
      return keywordMatch && viewMatch;
    })
    .sort((a, b) => sortBeers(a, b, sortBy));
}

function renderBeerList(visibleBeers) {
  if (activeView === "brewery") {
    renderGroupedBeers(visibleBeers, (beer) => beer.brewery || "未填写酒厂");
    return;
  }
  if (activeView === "style") {
    renderGroupedBeers(visibleBeers, (beer) => beer.styleGroup || beer.style || "未选择风格");
    return;
  }
  visibleBeers.forEach((beer) => {
    elements.beerList.appendChild(createBeerCard(beer));
  });
}

function renderGroupedBeers(visibleBeers, getGroupName) {
  const groups = new Map();
  visibleBeers.forEach((beer) => {
    const groupName = getGroupName(beer);
    if (!groups.has(groupName)) groups.set(groupName, []);
    groups.get(groupName).push(beer);
  });

  [...groups.entries()]
    .sort(([nameA], [nameB]) => nameA.localeCompare(nameB, "zh-CN"))
    .forEach(([groupName, groupBeers]) => {
      const section = document.createElement("section");
      section.className = "beer-group";
      section.innerHTML = `
        <header class="beer-group-header">
          <h2>${escapeHtml(groupName)}</h2>
          <span>${groupBeers.length}</span>
        </header>
        <div class="beer-group-grid"></div>
      `;
      const grid = section.querySelector(".beer-group-grid");
      groupBeers.forEach((beer) => grid.appendChild(createBeerCard(beer)));
      elements.beerList.appendChild(section);
    });
}

function sortBeers(a, b, sortBy) {
  if (sortBy === "name") {
    return (a.name || "").localeCompare(b.name || "", "zh-CN");
  }
  if (sortBy === "rating") {
    return Number(b.rating || 0) - Number(a.rating || 0);
  }
  if (sortBy === "drinkDate") {
    return (b.drinkDate || "").localeCompare(a.drinkDate || "");
  }
  return Number(b.updatedAt || 0) - Number(a.updatedAt || 0);
}

function createBeerCard(beer) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "beer-card";
  button.addEventListener("click", () => openForm(beer.id));

  const cover = beer.image
    ? `<img class="beer-cover" src="${beer.image}" alt="${escapeHtml(beer.name)}" />`
    : `<div class="cover-placeholder" aria-hidden="true">${escapeHtml((beer.name || "啤").slice(0, 1))}</div>`;

  const brewery = beer.brewery ? escapeHtml(beer.brewery) : "未填写酒厂";
  const style = beer.style ? escapeHtml(beer.style) : "未选择风格";
  const details = [
    beer.abv ? `ABV ${escapeHtml(beer.abv)}%` : "",
    beer.ibu ? `IBU ${escapeHtml(beer.ibu)}` : "",
  ].filter(Boolean).join(" · ");

  button.innerHTML = `
    ${cover}
    <div class="beer-card-body">
      <h3>${escapeHtml(beer.name)}</h3>
      <div class="beer-brewery">${brewery}</div>
      <div class="beer-style">${style}</div>
      <div class="beer-bottom">
        <span class="beer-rating">${renderStars(beer.rating)}</span>
        <span class="beer-meta">${details}</span>
      </div>
    </div>
  `;
  return button;
}

function openForm(id) {
  const beer = beers.find((item) => item.id === id);
  elements.form.reset();
  elements.beerId.value = beer?.id || "";
  elements.dialogTitle.textContent = beer ? "编辑啤酒" : "新增啤酒";
  elements.deleteButton.style.display = beer ? "inline-flex" : "none";
  imageData = beer?.image || "";

  elements.nameInput.value = beer?.name || "";
  elements.breweryInput.value = beer?.brewery || "";
  elements.formStatusInput.value = beer?.status || "done";
  setRating(beer?.rating || "");
  elements.drinkDateInput.value = beer?.drinkDate || "";
  setStyleSelection(beer?.styleGroup || "", beer?.style || "");
  elements.abvInput.value = stripPercent(beer?.abv || "");
  elements.ibuInput.value = beer?.ibu || "";
  elements.placeNameInput.value = beer?.placeName || "";
  elements.addressInput.value = beer?.address || "";
  elements.tagsInput.value = (beer?.tags || []).join(", ");
  elements.notesInput.value = beer?.notes || "";
  elements.repeatInput.checked = Boolean(beer?.wouldRepeat);
  updateImagePreview();
  elements.dialog.showModal();
  elements.nameInput.focus();
}

function closeForm() {
  elements.dialog.close();
}

function saveBeer(event) {
  event.preventDefault();
  matchStyleInput();
  const now = Date.now();
  const id = elements.beerId.value || crypto.randomUUID();
  const existing = beers.find((beer) => beer.id === id);
  const nextBeer = {
    id,
    name: elements.nameInput.value.trim(),
    image: imageData,
    status: elements.formStatusInput.value,
    rating: elements.ratingInput.value,
    drinkDate: elements.drinkDateInput.value,
    styleGroup: elements.styleGroupInput.value,
    style: elements.styleInput.value.trim(),
    brewery: elements.breweryInput.value.trim(),
    abv: stripPercent(elements.abvInput.value),
    ibu: elements.ibuInput.value.trim(),
    placeName: elements.placeNameInput.value.trim(),
    address: elements.addressInput.value.trim(),
    tags: parseTags(elements.tagsInput.value),
    notes: elements.notesInput.value.trim(),
    wouldRepeat: elements.repeatInput.checked,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  beers = existing
    ? beers.map((beer) => (beer.id === id ? nextBeer : beer))
    : [nextBeer, ...beers];

  persist();
  closeForm();
  render();
}

function deleteCurrentBeer() {
  const id = elements.beerId.value;
  const beer = beers.find((item) => item.id === id);
  if (!beer) return;
  if (!confirm(`删除「${beer.name}」？`)) return;
  beers = beers.filter((item) => item.id !== id);
  persist();
  closeForm();
  render();
}

function handleImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    imageData = String(reader.result || "");
    updateImagePreview();
  };
  reader.readAsDataURL(file);
}

function updateImagePreview() {
  const wrapper = elements.imagePreview.closest(".cover-picker");
  wrapper.classList.toggle("has-image", Boolean(imageData));
  elements.imagePreview.src = imageData || "";
}

function exportData() {
  const payload = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), beers }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `beer-journal-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const importedBeers = Array.isArray(parsed) ? parsed : parsed.beers;
      if (!Array.isArray(importedBeers)) {
        throw new Error("Invalid data");
      }
      beers = importedBeers.map(normalizeBeer);
      persist();
      render();
      alert("导入完成");
    } catch {
      alert("导入失败，请选择正确的 JSON 文件。");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function normalizeBeer(beer) {
  const now = Date.now();
  return {
    id: beer.id || crypto.randomUUID(),
    name: String(beer.name || "未命名啤酒"),
    image: beer.image || "",
    status: beer.status || "done",
    rating: beer.rating || "",
    drinkDate: beer.drinkDate || "",
    styleGroup: beer.styleGroup || findStyleGroup(beer.style || ""),
    style: beer.style || "",
    brewery: beer.brewery || "",
    abv: stripPercent(beer.abv || ""),
    ibu: beer.ibu || "",
    placeName: beer.placeName || "",
    address: beer.address || "",
    tags: Array.isArray(beer.tags) ? beer.tags : parseTags(beer.tags || ""),
    notes: beer.notes || "",
    wouldRepeat: Boolean(beer.wouldRepeat),
    createdAt: beer.createdAt || now,
    updatedAt: beer.updatedAt || now,
  };
}

function parseTags(value) {
  return String(value || "")
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function populateStyleGroups() {
  elements.styleGroupInput.innerHTML = `<option value="">未选择</option>${beerStyleGroups
    .map((group) => `<option value="${escapeHtml(group.name)}">${escapeHtml(group.name)}</option>`)
    .join("")}`;
  populateStyleOptions();
}

function populateStyleOptions(selectedStyle = "") {
  const group = beerStyleGroups.find((item) => item.name === elements.styleGroupInput.value);
  const styles = [...(group?.styles || getAllStyles())];
  if (selectedStyle && !styles.includes(selectedStyle)) {
    styles.unshift(selectedStyle);
  }
  elements.styleOptions.innerHTML = styles
    .map((style) => `<option value="${escapeHtml(style)}"></option>`)
    .join("");
  elements.styleInput.value = selectedStyle || "";
}

function setStyleSelection(styleGroup, style) {
  const group = styleGroup || findStyleGroup(style);
  elements.styleGroupInput.value = group;
  populateStyleOptions(style);
}

function findStyleGroup(style) {
  return beerStyleGroups.find((group) => group.styles.includes(style))?.name || "";
}

function getAllStyles() {
  return beerStyleGroups.flatMap((group) => group.styles);
}

function matchStyleInput() {
  const rawValue = elements.styleInput.value.trim();
  if (!rawValue) return;

  const normalizedValue = rawValue.toLowerCase();
  const matchedGroup = beerStyleGroups.find((group) =>
    group.styles.some((style) => style.toLowerCase() === normalizedValue)
  );
  const exactStyle = matchedGroup?.styles.find((style) => style.toLowerCase() === normalizedValue);

  if (matchedGroup && exactStyle) {
    elements.styleGroupInput.value = matchedGroup.name;
    populateStyleOptions(exactStyle);
    return;
  }

  const fuzzyMatches = beerStyleGroups.flatMap((group) =>
    group.styles
      .filter((style) => style.toLowerCase().includes(normalizedValue))
      .map((style) => ({ group: group.name, style }))
  );

  if (fuzzyMatches.length === 1) {
    elements.styleGroupInput.value = fuzzyMatches[0].group;
    populateStyleOptions(fuzzyMatches[0].style);
  }
}

function renderRatingPicker() {
  elements.ratingPicker.innerHTML = "";
  for (let value = 0.5; value <= 5; value += 0.5) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "rating-half";
    button.dataset.value = String(value);
    button.setAttribute("aria-label", `${value} stars`);
    button.addEventListener("click", () => setRating(value));
    elements.ratingPicker.appendChild(button);
  }

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "rating-clear";
  clearButton.textContent = "清除";
  clearButton.addEventListener("click", () => setRating(""));
  elements.ratingPicker.appendChild(clearButton);
  updateRatingPicker();
}

function setRating(value) {
  elements.ratingInput.value = value ? String(value) : "";
  updateRatingPicker();
}

function updateRatingPicker() {
  const rating = Number(elements.ratingInput.value || 0);
  elements.ratingPicker.querySelectorAll(".rating-half").forEach((button) => {
    const value = Number(button.dataset.value);
    button.classList.toggle("active", value <= rating);
  });
}

function stripPercent(value) {
  return String(value || "").replace("%", "").trim();
}

function renderStars(value) {
  const rating = Number(value || 0);
  if (!rating) return "未评分";
  return `${"★".repeat(Math.floor(rating))}${rating % 1 ? "½" : ""} ${rating}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
