# parkrun

Prints a list of all parkrun events in Germany. :runner:  
This includes the lovely [Aachener Weiher parkrun](https://www.parkrun.com.de/aachenerweiher/) in Cologne. :heart: 

Example output:

```
1. Georgengarten parkrun (Georgengarten, Hannover): 248 runs since 02.12.2017 - https://www.parkrun.com.de/georgengarten/
2. Neckarau parkrun (Neckarau, Mannheim): 247 runs since 02.12.2017 - https://www.parkrun.com.de/neckarau/
3. Küchenholz parkrun (Küchenholz, Leipzig): 214 runs since 02.12.2017 - https://www.parkrun.com.de/kuechenholz/
4. Hasenheide parkrun (Hasenheide Park, Berlin): 234 runs since 06.01.2018 - https://www.parkrun.com.de/hasenheide/
5. Nidda parkrun (Nidda, Frankfurt Main): 233 runs since 06.01.2018 - https://www.parkrun.com.de/nidda/
6. Rubbenbruchsee parkrun (Rubbenbruchsee, Osnabrück): 241 runs since 13.01.2018 - https://www.parkrun.com.de/rubbenbruchsee/
7. Wöhrder See parkrun (Wöhrder See, Nürnberg): 215 runs since 14.04.2018 - https://www.parkrun.com.de/woehrdersee/
8. Kräherwald parkrun (Kräherwald, Stuttgart): 227 runs since 05.05.2018 - https://www.parkrun.com.de/kraeherwald/
9. Seewoog parkrun (Seewoog, Ramstein-Miesenbach): 205 runs since 15.09.2018 - https://www.parkrun.com.de/seewoog/
10. Schwanenteich parkrun (Stadtpark, Giessen): 202 runs since 29.09.2018 - https://www.parkrun.com.de/schwanenteich/
11. Leinpfad parkrun (Stadtpark, Merzig): 192 runs since 05.01.2019 - https://www.parkrun.com.de/leinpfad/
12. Alstervorland parkrun (Alstervorland, Hamburg): 186 runs since 12.01.2019 - https://www.parkrun.com.de/alstervorland/
13. Westpark parkrun (Westpark, München): 187 runs since 19.01.2019 - https://www.parkrun.com.de/westpark/
14. Rheinaue parkrun (Rheinaue, Bonn): 185 runs since 02.02.2019 - https://www.parkrun.com.de/rheinaue/
15. Aachener Weiher parkrun (Aachener Weiher, Köln): 183 runs since 23.03.2019 - https://www.parkrun.com.de/aachenerweiher/

[...]

54. Wertwiesen parkrun (Wertwiesen): 24 runs since 15.07.2023 - https://www.parkrun.com.de/wertwiesen/
55. Ebenberg parkrun (Ebenberg): 17 runs since 09.09.2023 - https://www.parkrun.com.de/ebenberg/
56. Bahnstadt Promenade parkrun (): 13 runs since 30.09.2023 - https://www.parkrun.com.de/bahnstadtpromenade/
57. Ehrenbreitstein parkrun (Ehrenbreitstein): 0 runs - https://www.parkrun.com.de/ehrenbreitstein/

Retrieved Wed Dec 27 2023 13:21:09 GMT+0100 (GMT+01:00)
```

## Usage

0. Prerequisite: You must have [Node.js](https://nodejs.org/) installed.
1. Run `npm install`
2. Enter your parkrun credentials in `.env`
3. Finally execute the script: `npm start`

## References

* Swagger [API documentation](https://developer.parkrun.com/) of the parkrun API  
  *Note*: At the moment the API is intended for [internal use](https://www.parkrun.com/api/), only. And the API documentation seems to be outdated.
* [parkrun.js](https://parkrun.js.org/): (inofficial) library for accessing the parkrun API. This project does not depend on it. But I used it to reverse-engineer the API.
