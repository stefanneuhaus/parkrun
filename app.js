require("dotenv").config();
const {JSDOM} = require("jsdom");

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';


async function printEventsInGermany() {
    let accessToken = await login(process.env.PARKRUN_ID, process.env.PARKRUN_PASSWORD);

    const GERMANY = 32;
    let events = await searchEvents(GERMANY, accessToken);

    let detailsPromises = events.data.Events
        .map(event => getEventDetails(event));

    let allDetails = await Promise.all(detailsPromises);
    allDetails
        .sort((s1, s2) => s2.totalEventsStaged - s1.totalEventsStaged)
        .sort((s1, s2) => s1.firstEvent - s2.firstEvent)
        .forEach((eventDetails, i) => logEventDetails(i + 1, eventDetails));

    console.log(`\nRetrieved ${new Date()}`);
}

async function searchEvents(countryId, accessToken) {
    let url = `https://${process.env.PARKRUN_SERVER}/v1/countries/${countryId}/searchEvents?expandedDetails=true&access_token=${accessToken}&scope=app`;
    return fetch(url)
        .then(response => response.json());
}

function getEventDetails(event) {
    let eventId = event.EventName;
    return fetchEventHistory(eventId)
        .then(eventHistory => extractEventDetails(event, eventHistory));
}

async function fetchEventHistory(eventId) {
    let url = `https://www.parkrun.com.de/${eventId}/results/eventhistory/`;
    let options = {headers: {"User-Agent": USER_AGENT}};
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fetching event history failed: ${response.statusText}`);
            }
            return response.text();
        });
}

function extractEventDetails(event, eventHistory) {
    let dom = new JSDOM(eventHistory);
    let eventHappenings = dom.window.document.querySelectorAll("tr.Results-table-row");
    let numberOfHappenings = eventHappenings.length;
    let dateOfFirstHappening = numberOfHappenings > 0 ?
        parseDate(eventHappenings[numberOfHappenings - 1].getAttribute("data-date")) :
        new Date();

    return {
        id: event.EventName,
        shortName: event.EventShortName,
        longName: event.EventLongName,
        location: event.EventLocation,
        totalEventsStaged: numberOfHappenings,
        firstEvent: dateOfFirstHappening
    };
}

function parseDate(formattedDate) {
    // example formattedDate: "23/03/2019"
    let parts = formattedDate.split("/");
    let year = parts[2];
    let month = parts[1] - 1;
    let day = parts[0];
    return new Date(year, month, day);
}

function logEventDetails(i, stats) {
    let formatDate = (date) => date ?
        date.toLocaleDateString("de-DE", {day: "2-digit", month: "2-digit", year: "numeric"}) :
        "n.a.";
    let numberOfRunsText = stats.totalEventsStaged > 0 ?
        `${stats.totalEventsStaged} runs since ${formatDate(stats.firstEvent)}` :
        "0 runs";

    console.log(`${i}. ${stats.longName} (${stats.location}): ${numberOfRunsText} - https://www.parkrun.com.de/${stats.id}/`);
}

async function login(username, password) {
    let url = `https://${process.env.PARKRUN_SERVER}/user_auth.php`;

    let details = {
        "username": username,
        "password": password,
        "grant_type": "password",
        "scope": "app"
    };

    let formBody = Object.keys(details)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`)
        .join("&");

    let options = {
        method: "POST",
        body: formBody,
        headers: {
            "Authorization": "Basic bmV0ZHJlYW1zLWlwaG9uZS1zMDE6Z2ZLYkRENk5Ka1lvRm1raXNSKGlWRm9wUUNLV3piUWVRZ1pBWlpLSw==",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    };

    return fetch(url, options)
        .then(response => response.json())
        .then(token => {
            if (token.error) {
                throw new Error(token.error_description);
            }
            return token.access_token;
        });
}


printEventsInGermany();
