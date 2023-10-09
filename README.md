# parkrun

Prints a list of all parkrun events in Germany. :runner:  
This includes the lovely [Aachener Weiher parkrun](https://www.parkrun.com.de/aachenerweiher/) in Cologne. :heart: 

Example output:

```
1. Neckarau parkrun (Neckarau, Mannheim): 237 runs since 02.12.2017
2. Georgengarten parkrun (Georgengarten, Hannover): 237 runs since 02.12.2017
3. Küchenholz parkrun (Küchenholz, Leipzig): 203 runs since 02.12.2017
4. Hasenheide parkrun (Hasenheide Park, Berlin): 227 runs since 06.01.2018
5. Nidda parkrun (Nidda, Frankfurt Main): 222 runs since 06.01.2018
6. Rubbenbruchsee parkrun (Rubbenbruchsee, Osnabrück): 230 runs since 13.01.2018
7. Wöhrder See parkrun (Wöhrder See, Nürnberg): 204 runs since 14.04.2018
8. Kräherwald parkrun (Kräherwald, Stuttgart): 216 runs since 05.05.2018
9. Seewoog parkrun (Seewoog, Ramstein-Miesenbach): 194 runs since 15.09.2018
10. Schwanenteich parkrun (Stadtpark, Giessen): 191 runs since 29.09.2018
11. Leinpfad parkrun (Stadtpark, Merzig): 181 runs since 05.01.2019
12. Alstervorland parkrun (Alstervorland, Hamburg): 175 runs since 12.01.2019
13. Westpark parkrun (Westpark, München): 177 runs since 19.01.2019
14. Rheinaue parkrun (Rheinaue, Bonn): 175 runs since 02.02.2019
15. Aachener Weiher parkrun (Aachener Weiher, Köln): 172 runs since 23.03.2019

[...]

54. Wertwiesen parkrun (Wertwiesen): 13 runs since 15.07.2023
55. Ebenberg parkrun (Ebenberg): 6 runs since 09.09.2023
56. Bahnstadt Promenade parkrun (): 2 runs since 30.09.2023

Retrieved Sun Oct 08 2023 22:24:38 GMT+0200 (Central European Summer Time)
```

## Usage

0. Prerequisite: You must have [Node.js](https://nodejs.org/) installed.
1. Run `npm install`
2. Enter your parkrun credentials in `.env`
3. Finally execute the script: `npm start`

## References

* Swagger [API documentation](https://developer.parkrun.com/) of the parkrun API  
  *Note*: At the moment the API is intended for [internal use](https://www.parkrun.com/api/), only.
* [parkrun.js](https://parkrun.js.org/): (inofficial) library for accessing the parkrun API. This project does not depend on it. But I used it to reverse-engineer the API.
