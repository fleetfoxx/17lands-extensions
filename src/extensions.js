const filterTable = (e) => {
  const tableBodyElement = document.querySelector("div.scrolling-table > table > tbody");
  const filterToken = e.target.value;

  const rows = tableBodyElement.querySelectorAll("tr");

  for (const row of rows) {
    const nameElement = row.querySelector("div.list_card_name");
    const name = nameElement.innerHTML;

    if (!name.toLowerCase().includes(filterToken.toLowerCase())) {
      row.style.display = "none";
    } else {
      row.style.display = "table-row";
    }
  }
};

const injectCardRatingsExtensions = () => {
  const searchBarElement = document.createElement("input");
  searchBarElement.classList.add("form-control");
  searchBarElement.style.marginBottom = "1rem";
  searchBarElement.placeholder = "Filter by Name...";
  searchBarElement.oninput = filterTable;

  const setSelectorElement = document.getElementById("expansion");
  const userFilterElement = setSelectorElement.parentNode.parentNode;

  // const userFilterElement = document.querySelector("div.user-filter");
  userFilterElement.parentNode.insertBefore(searchBarElement, userFilterElement.nextSibling);
};

let timerId = null;

const toggleAutoPlay = (e) => {
  if (e.target.checked) {
    timerId = setInterval(() => {
      const nextButton = document.querySelector("button[data-testid=next]");
      nextButton?.click();
    }, 2000);
  } else {
    clearInterval(timerId);
  }
};

const injectHistoryExtensions = () => {
  const checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";
  checkboxElement.style = "margin-left: 0.25rem;";
  checkboxElement.onchange = toggleAutoPlay;

  const labelElement = document.createElement("label");
  labelElement.innerHTML = "Auto Play";
  labelElement.style = "margin-left: 1rem;";
  labelElement.appendChild(checkboxElement);

  const hintElement = document.querySelector("span.hint");
  hintElement.parentNode.insertBefore(labelElement, hintElement);
};

const injectExtensions = () => {
  const parts = location.pathname.split("/").filter((p) => !!p);
  console.log(parts);

  switch (parts[0]) {
    case "card_ratings":
    case "card_data":
      injectCardRatingsExtensions();
      break;
    case "history":
      injectHistoryExtensions();
      break;
    default:
      // no extensions to inject on this page;
      break;
  }
};

// wait for the page to fully load before injecting extensions
setTimeout(injectExtensions, 1000);
