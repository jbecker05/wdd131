const simpleList = [
  "oranges",
  "grapes",
  "lemons",
  "apples",
  "Bananas",
  "watermelons",
  "coconuts",
  "broccoli",
  "mango"
];

const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Yellowstone", "Waterfall"],
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Tetons"],
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    tags: ["Moderate", "Yellowstone", "Waterfall"],
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "2.2 miles",
    tags: ["Easy"],
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Moderate", "View"],
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

function compareFn(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

function handleSimpleSort() {
  const sorted = simpleList.sort(compareFn);

  console.log("Sorted simpleList:", sorted);

  const display = document.querySelector("#simpleListDisplay");
  if (display) {
    display.textContent = sorted.join(", ");
  }
}


function searchList(list, query) {
  const lowerQuery = query.toLowerCase();

  function searchCallback(item) {
    const lowerItem = item.toLowerCase();
    return lowerItem.includes(lowerQuery);
  }

  return list.filter(searchCallback);
}

function handleStringSearch() {
  const input = document.querySelector("#searchInput");
  const resultsDiv = document.querySelector("#searchResults");

  if (!input || !resultsDiv) return;

  const query = input.value.trim();

  if (query === "") {
    resultsDiv.textContent = "Please type something to search.";
    return;
  }

  const results = searchList(simpleList, query);

  if (results.length === 0) {
    resultsDiv.textContent = `No matches found for "${query}".`;
  } else {
    resultsDiv.textContent = `Matches: ${results.join(", ")}`;
  }
}

function searchHikes(list, query) {
  const lowerQuery = query.toLowerCase();

  return list.filter((hike) => {
    const inName = hike.name.toLowerCase().includes(lowerQuery);
    const inDescription = hike.description
      .toLowerCase()
      .includes(lowerQuery);

    const tagMatch = hike.tags.find((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );

    return inName || inDescription || Boolean(tagMatch);
  });
}

function sortHikesByDistance(list) {
  return list.slice().sort((a, b) => {
    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    return distA - distB;
  });
}

let currentHikeResults = hikes.slice();

function renderHikes(list) {
  const container = document.querySelector("#hikeResults");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = "<p>No hikes match that search.</p>";
    return;
  }

  const html = list
    .map(
      (hike) => `
      <article class="hike">
        <h3>${hike.name}</h3>
        <p><strong>Distance:</strong> ${hike.distance}</p>
        <p><strong>Tags:</strong> ${hike.tags.join(", ")}</p>
        <p>${hike.description}</p>
      </article>
    `
    )
    .join("\n");

  container.innerHTML = html;
}

function handleHikeFilter() {
  const input = document.querySelector("#hikeSearch");
  if (!input) return;

  const query = input.value.trim();

  if (query === "") {
    currentHikeResults = hikes.slice();
  } else {
    currentHikeResults = searchHikes(hikes, query);
  }

  renderHikes(currentHikeResults);
}

function handleHikeSort() {
  currentHikeResults = sortHikesByDistance(currentHikeResults);
  renderHikes(currentHikeResults);
}

document.addEventListener("DOMContentLoaded", () => {
  const simpleDisplay = document.querySelector("#simpleListDisplay");
  if (simpleDisplay) {
    simpleDisplay.textContent = simpleList.join(", ");
  }

  renderHikes(currentHikeResults);

  const sortSimpleBtn = document.querySelector("#sortSimpleBtn");
  const searchBtn = document.querySelector("#searchBtn");
  const filterHikesBtn = document.querySelector("#filterHikesBtn");
  const sortHikesBtn = document.querySelector("#sortHikesBtn");

  if (sortSimpleBtn) {
    sortSimpleBtn.addEventListener("click", handleSimpleSort);
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", handleStringSearch);
  }

  if (filterHikesBtn) {
    filterHikesBtn.addEventListener("click", handleHikeFilter);
  }

  if (sortHikesBtn) {
    sortHikesBtn.addEventListener("click", handleHikeSort);
  }
});