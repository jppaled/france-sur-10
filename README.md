# france-sur-10

## Requirement

- nodejs
- yarn

## Install

`yarn install`

## Start
- You must change the `PHPSESSID` in the `getAllCityInfosByDepartement()` function

- `node index.js`

## Caution

- For the moment, only use `getAllCityInfosByDepartement()` with a number between "01" and "95" as a parameter
- comment line 40 `const note = await getNote(link);`. The website will ban you if you call the function `getNote()` too many times
