require("dotenv").config();
const {JSDOM} = require("jsdom");


async function printEventsInGermany() {
    let accessToken = await login(process.env.PARKRUN_ID, process.env.PARKRUN_PASSWORD);

    const GERMANY = 32;
    let events = await searchEvents(GERMANY, accessToken);
    let statisticsPromises = events.data.Events
        .map(event => getEventStatistics(event));

    let allStatistics = await Promise.all(statisticsPromises);
    allStatistics
        .sort((s1, s2) => s2.totalEventsStaged - s1.totalEventsStaged)
        .sort((s1, s2) => s1.firstEvent.getTime() - s2.firstEvent.getTime())
        .forEach((eventStatistics, i) => logEventStatistics(i + 1, eventStatistics));

    console.log(`\nRetrieved ${new Date()}`);
}

async function searchEvents(countryId, accessToken) {
    let url = `https://${process.env.PARKRUN_SERVER}/v1/countries/${countryId}/searchEvents?expandedDetails=true&access_token=${accessToken}&scope=app`;
    return fetch(url)
        .then(response => response.json());
}

function getEventStatistics(event) {
    let eventId = event.EventName;
    return fetchEventHistory(eventId)
        .then(eventHistory => extractEventStatistics(event, eventHistory));
}

async function fetchEventHistory(eventId) {
    let url = `https://www.parkrun.com.de/${eventId}/results/eventhistory/`;
    return fetch(url)
        .then(response => response.text());
}

function extractEventStatistics(event, eventHistory) {
    let dom = new JSDOM(eventHistory);
    let eventHappenings = dom.window.document.querySelectorAll("tr.Results-table-row");
    let numberOfHappenings = eventHappenings.length;
    let firstHappening = eventHappenings[numberOfHappenings - 1];
    let dateOfFirstHappening = parseDate(firstHappening.getAttribute("data-date"));

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

function logEventStatistics(i, stats) {
    let formatDate = (date) => date.toLocaleDateString("de-DE", {day: "2-digit", month: "2-digit", year: "numeric"});
    console.log(`${i}. ${stats.longName} (${stats.location}): ${stats.totalEventsStaged} runs since ${formatDate(stats.firstEvent)}`);
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
