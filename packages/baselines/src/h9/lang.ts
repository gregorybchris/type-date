// Month and weekday names in other languages -> English, so h7 reads them. Only fires when such a word is present.
const M: Record<string, string> = {};
const add = (en: string, words: string) => words.split(" ").forEach((w) => (M[w] = en));
add("january", "janvier enero januar gennaio janeiro januari ianuarie tammi");
add("february", "fevrier février febrero februar febbraio fevereiro februarie helmi");
add("march", "mars marzo märz maerz março marco maart martie maalis");
add("april", "avril abril aprile aprilie huhti");
add("may", "mayo maggio maio mei mai touko");
add("june", "juin junio juni giugno junho iunie kesä");
add("july", "juillet julio juli luglio julho iulie heinä");
add("august", "août aout agosto augustus elo");
add("september", "septembre septiembre setiembre settembre setembro septembrie syys");
add("october", "octobre octubre oktober ottobre outubro octombrie loka");
add("november", "novembre noviembre novembro noiembrie marras");
add("december", "décembre decembre diciembre dezember dicembre dezembro decembrie joulu");
add("monday", "lundi lunes montag lunedi lunedì segunda");
add("tuesday", "mardi martes dienstag martedi martedì");
add("wednesday", "mercredi miercoles miércoles mittwoch mercoledi mercoledì");
add("thursday", "jeudi jueves donnerstag giovedi giovedì");
add("friday", "vendredi viernes freitag venerdi venerdì");
add("saturday", "samedi sabado sábado samstag sabato");
add("sunday", "dimanche domingo sonntag domenica");
const SHORT: Record<string, string> = { ven: "friday", jeu: "thursday", sab: "saturday", lun: "monday", dim: "sunday" };
const WORDS = new RegExp(`(?<![\\p{L}])(${Object.keys(M).join("|")})(?![\\p{L}])`, "gu");
const SHORTRE = new RegExp(`(?<![\\p{L}])(${Object.keys(SHORT).join("|")})(?= \\d{1,2}:\\d\\d)`, "gu");
const STOP = /(?<![\p{L}])(?:de|del|le|la|el|en|klo|um|à|a las)(?![\p{L}])/gu;

/** Translate month and weekday names; drop connector words only when a name was found. */
export function foreign(s: string): string {
  let hit = false;
  let r = s.replace(WORDS, (w) => ((hit = true), M[w]!));
  r = r.replace(SHORTRE, (w) => ((hit = true), SHORT[w]!));
  return hit ? r.replace(STOP, " ").replace(/\s+/g, " ").trim() : s;
}
