# Time zone tables for labeling and h13

Source of truth: `packages/baselines/src/h13/zones.json`. A zone is written in the DSL as an IANA name (`@America/New_York`), `@UTC`, or a fixed offset (`@+05:30`).

## Abbreviations

The first zone is the default when nothing else says which one is meant. Other candidates are listed with the country (ISO code) they belong to.

| Abbreviation | Default | Other candidates |
|---|---|---|
| UTC | UTC |  |
| GMT | UTC |  |
| UT | UTC |  |
| Z | UTC |  |
| ZULU | UTC |  |
| EST | America/New_York (US) | Australia/Sydney (AU) |
| EDT | America/New_York (US) |  |
| ET | America/New_York (US) |  |
| CST | America/Chicago (US) | Asia/Shanghai (CN), America/Havana (CU) |
| CDT | America/Chicago (US) |  |
| CT | America/Chicago (US) |  |
| MST | America/Denver (US) |  |
| MDT | America/Denver (US) |  |
| MT | America/Denver (US) |  |
| PST | America/Los_Angeles (US) | Asia/Manila (PH) |
| PDT | America/Los_Angeles (US) |  |
| PT | America/Los_Angeles (US) |  |
| AKST | America/Anchorage (US) |  |
| AKDT | America/Anchorage (US) |  |
| HST | Pacific/Honolulu (US) |  |
| HDT | Pacific/Honolulu (US) |  |
| HAST | Pacific/Honolulu (US) |  |
| HADT | Pacific/Honolulu (US) |  |
| AST | America/Halifax (CA) | Asia/Riyadh (SA) |
| ADT | America/Halifax (CA) |  |
| NST | America/St_Johns (CA) |  |
| NDT | America/St_Johns (CA) |  |
| BST | Europe/London (GB) | Asia/Dhaka (BD) |
| CET | Europe/Berlin |  |
| CEST | Europe/Berlin |  |
| MEZ | Europe/Berlin |  |
| MESZ | Europe/Berlin |  |
| EET | Europe/Athens |  |
| EEST | Europe/Athens |  |
| WET | Europe/Lisbon |  |
| WEST | Europe/Lisbon |  |
| IST | Asia/Kolkata (IN) | Europe/Dublin (IE), Asia/Jerusalem (IL) |
| JST | Asia/Tokyo |  |
| KST | Asia/Seoul |  |
| SGT | Asia/Singapore |  |
| HKT | Asia/Hong_Kong |  |
| PKT | Asia/Karachi |  |
| PHT | Asia/Manila (PH) |  |
| PHST | Asia/Manila (PH) |  |
| MSK | Europe/Moscow |  |
| SAST | Africa/Johannesburg |  |
| WAT | Africa/Lagos |  |
| CAT | Africa/Maputo |  |
| EAT | Africa/Nairobi |  |
| AEST | Australia/Sydney (AU) |  |
| AEDT | Australia/Sydney (AU) |  |
| AET | Australia/Sydney (AU) |  |
| ACST | Australia/Adelaide |  |
| ACDT | Australia/Adelaide |  |
| AWST | Australia/Perth |  |
| NZST | Pacific/Auckland |  |
| NZDT | Pacific/Auckland |  |
| NZT | Pacific/Auckland |  |
| BRT | America/Sao_Paulo |  |
| BRST | America/Sao_Paulo |  |
| ART | America/Argentina/Buenos_Aires |  |
| WIB | Asia/Jakarta |  |
| WITA | Asia/Makassar |  |
| WIT | Asia/Jayapura |  |
| GST | Asia/Dubai |  |
| IRST | Asia/Tehran |  |
| NPT | Asia/Kathmandu |  |
| ICT | Asia/Bangkok |  |
| MYT | Asia/Kuala_Lumpur |  |

`AoE` (anywhere on Earth) is the fixed offset `@-12:00`. `GMT`, `UT`, `Z` and `ZULU` are `@UTC`.

## Zone words (with "time", "standard time" or "daylight time", or right next to a clock time)

| Word | Zone |
|---|---|
| pacific | America/Los_Angeles |
| mountain | America/Denver |
| central | America/Chicago |
| eastern | America/New_York |
| atlantic | America/Halifax |
| alaska | America/Anchorage |
| alaskan | America/Anchorage |
| hawaii | Pacific/Honolulu |
| hawaiian | Pacific/Honolulu |
| hawaii-aleutian | Pacific/Honolulu |
| newfoundland | America/St_Johns |
| greenwich | UTC |
| greenwich mean | UTC |
| coordinated universal | UTC |
| universal | UTC |
| british summer | Europe/London |
| british | Europe/London |
| central european | Europe/Berlin |
| eastern european | Europe/Athens |
| western european | Europe/Lisbon |
| india | Asia/Kolkata |
| india standard | Asia/Kolkata |
| indian standard | Asia/Kolkata |
| japan standard | Asia/Tokyo |
| japan | Asia/Tokyo |
| korea standard | Asia/Seoul |
| china standard | Asia/Shanghai |
| singapore | Asia/Singapore |
| hong kong | Asia/Hong_Kong |
| moscow | Europe/Moscow |
| australian eastern | Australia/Sydney |
| australian central | Australia/Adelaide |
| australian western | Australia/Perth |
| new zealand | Pacific/Auckland |
| east africa | Africa/Nairobi |
| west africa | Africa/Lagos |
| central africa | Africa/Maputo |
| south africa | Africa/Johannesburg |
| gulf | Asia/Dubai |
| pakistan | Asia/Karachi |
| philippine | Asia/Manila |
| brasilia | America/Sao_Paulo |
| argentina | America/Argentina/Buenos_Aires |

## Places (only as "<place> time" or "in <place>" right after a time)

| Place | Zone |
|---|---|
| london | Europe/London |
| uk | Europe/London |
| britain | Europe/London |
| england | Europe/London |
| scotland | Europe/London |
| u.k. | Europe/London |
| paris | Europe/Paris |
| france | Europe/Paris |
| berlin | Europe/Berlin |
| germany | Europe/Berlin |
| munich | Europe/Berlin |
| frankfurt | Europe/Berlin |
| hamburg | Europe/Berlin |
| madrid | Europe/Madrid |
| spain | Europe/Madrid |
| barcelona | Europe/Madrid |
| rome | Europe/Rome |
| italy | Europe/Rome |
| milan | Europe/Rome |
| amsterdam | Europe/Amsterdam |
| netherlands | Europe/Amsterdam |
| holland | Europe/Amsterdam |
| stockholm | Europe/Stockholm |
| sweden | Europe/Stockholm |
| oslo | Europe/Oslo |
| norway | Europe/Oslo |
| copenhagen | Europe/Copenhagen |
| denmark | Europe/Copenhagen |
| helsinki | Europe/Helsinki |
| finland | Europe/Helsinki |
| dublin | Europe/Dublin |
| ireland | Europe/Dublin |
| lisbon | Europe/Lisbon |
| portugal | Europe/Lisbon |
| zurich | Europe/Zurich |
| switzerland | Europe/Zurich |
| vienna | Europe/Vienna |
| austria | Europe/Vienna |
| brussels | Europe/Brussels |
| belgium | Europe/Brussels |
| prague | Europe/Prague |
| warsaw | Europe/Warsaw |
| poland | Europe/Warsaw |
| athens | Europe/Athens |
| greece | Europe/Athens |
| istanbul | Europe/Istanbul |
| turkey | Europe/Istanbul |
| moscow | Europe/Moscow |
| russia | Europe/Moscow |
| kyiv | Europe/Kyiv |
| kiev | Europe/Kyiv |
| ukraine | Europe/Kyiv |
| cairo | Africa/Cairo |
| egypt | Africa/Cairo |
| lagos | Africa/Lagos |
| nigeria | Africa/Lagos |
| abuja | Africa/Lagos |
| nairobi | Africa/Nairobi |
| kenya | Africa/Nairobi |
| johannesburg | Africa/Johannesburg |
| cape town | Africa/Johannesburg |
| south africa | Africa/Johannesburg |
| accra | Africa/Accra |
| ghana | Africa/Accra |
| casablanca | Africa/Casablanca |
| morocco | Africa/Casablanca |
| dubai | Asia/Dubai |
| abu dhabi | Asia/Dubai |
| uae | Asia/Dubai |
| riyadh | Asia/Riyadh |
| saudi arabia | Asia/Riyadh |
| doha | Asia/Qatar |
| qatar | Asia/Qatar |
| tehran | Asia/Tehran |
| iran | Asia/Tehran |
| karachi | Asia/Karachi |
| lahore | Asia/Karachi |
| islamabad | Asia/Karachi |
| pakistan | Asia/Karachi |
| mumbai | Asia/Kolkata |
| delhi | Asia/Kolkata |
| new delhi | Asia/Kolkata |
| bangalore | Asia/Kolkata |
| bengaluru | Asia/Kolkata |
| kolkata | Asia/Kolkata |
| chennai | Asia/Kolkata |
| hyderabad | Asia/Kolkata |
| india | Asia/Kolkata |
| dhaka | Asia/Dhaka |
| bangladesh | Asia/Dhaka |
| kathmandu | Asia/Kathmandu |
| nepal | Asia/Kathmandu |
| colombo | Asia/Colombo |
| sri lanka | Asia/Colombo |
| bangkok | Asia/Bangkok |
| thailand | Asia/Bangkok |
| jakarta | Asia/Jakarta |
| indonesia | Asia/Jakarta |
| singapore | Asia/Singapore |
| kuala lumpur | Asia/Kuala_Lumpur |
| malaysia | Asia/Kuala_Lumpur |
| manila | Asia/Manila |
| philippines | Asia/Manila |
| ho chi minh | Asia/Ho_Chi_Minh |
| saigon | Asia/Ho_Chi_Minh |
| hanoi | Asia/Ho_Chi_Minh |
| vietnam | Asia/Ho_Chi_Minh |
| hong kong | Asia/Hong_Kong |
| taipei | Asia/Taipei |
| taiwan | Asia/Taipei |
| shanghai | Asia/Shanghai |
| beijing | Asia/Shanghai |
| shenzhen | Asia/Shanghai |
| china | Asia/Shanghai |
| seoul | Asia/Seoul |
| korea | Asia/Seoul |
| south korea | Asia/Seoul |
| tokyo | Asia/Tokyo |
| osaka | Asia/Tokyo |
| japan | Asia/Tokyo |
| sydney | Australia/Sydney |
| melbourne | Australia/Sydney |
| canberra | Australia/Sydney |
| aus east | Australia/Sydney |
| brisbane | Australia/Brisbane |
| perth | Australia/Perth |
| adelaide | Australia/Adelaide |
| auckland | Pacific/Auckland |
| wellington | Pacific/Auckland |
| new zealand | Pacific/Auckland |
| nz | Pacific/Auckland |
| honolulu | Pacific/Honolulu |
| hawaii | Pacific/Honolulu |
| anchorage | America/Anchorage |
| alaska | America/Anchorage |
| los angeles | America/Los_Angeles |
| la | America/Los_Angeles |
| l.a. | America/Los_Angeles |
| san francisco | America/Los_Angeles |
| sf | America/Los_Angeles |
| bay area | America/Los_Angeles |
| silicon valley | America/Los_Angeles |
| seattle | America/Los_Angeles |
| portland | America/Los_Angeles |
| san diego | America/Los_Angeles |
| las vegas | America/Los_Angeles |
| phoenix | America/Phoenix |
| arizona | America/Phoenix |
| denver | America/Denver |
| salt lake city | America/Denver |
| boise | America/Denver |
| albuquerque | America/Denver |
| chicago | America/Chicago |
| dallas | America/Chicago |
| houston | America/Chicago |
| austin | America/Chicago |
| minneapolis | America/Chicago |
| st louis | America/Chicago |
| kansas city | America/Chicago |
| nashville | America/Chicago |
| new york | America/New_York |
| nyc | America/New_York |
| new york city | America/New_York |
| boston | America/New_York |
| washington | America/New_York |
| washington dc | America/New_York |
| dc | America/New_York |
| atlanta | America/New_York |
| miami | America/New_York |
| philadelphia | America/New_York |
| detroit | America/New_York |
| toronto | America/Toronto |
| ottawa | America/Toronto |
| montreal | America/Toronto |
| vancouver | America/Vancouver |
| calgary | America/Edmonton |
| edmonton | America/Edmonton |
| winnipeg | America/Winnipeg |
| halifax | America/Halifax |
| mexico city | America/Mexico_City |
| mexico | America/Mexico_City |
| bogota | America/Bogota |
| colombia | America/Bogota |
| lima | America/Lima |
| peru | America/Lima |
| santiago | America/Santiago |
| chile | America/Santiago |
| buenos aires | America/Argentina/Buenos_Aires |
| sao paulo | America/Sao_Paulo |
| rio | America/Sao_Paulo |
| rio de janeiro | America/Sao_Paulo |
| brasilia | America/Sao_Paulo |
| brazil | America/Sao_Paulo |
| caracas | America/Caracas |
| havana | America/Havana |
| cuba | America/Havana |
