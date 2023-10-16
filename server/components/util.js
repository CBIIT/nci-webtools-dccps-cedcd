/**
 * general utilities
 */

"use strict";
import moment from "moment";
import { fileURLToPath } from "url";
import { parse } from "csv-parse";
import logger from "./logger.js";
import fs from "fs";
import crypto from "crypto";
import MD5 from "md5";

function file(name) {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  return fs.createWriteStream(dirname + "/" + name);
}

/**
 * id rules:
 * timestamp in milliseconds (last 9 digits) + MMDDYY + random number from 0 to 9
 */
export function generateId() {
  let result = "";
  let ts = Date.now();
  let ds = moment().format("MMDDYY");
  let rd = Math.floor(Math.random() * 10);
  result = "" + ts;
  result = result.substr(4);
  logger.debug(result);

  result += ds + rd;
  return result;
}

//get timestamp in seconds
export function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function castValue(value) {
  if (["NA", "", null, undefined].includes(value)) {
    return null;
  } else if (!isNaN(value)) {
    return +value;
  } else {
    return value;
  }
}

export function getTxtParser(columns, options = {}) {
  return parse({
    delimiter: "\t",
    from_line: 2,
    cast: castValue,
    columns,
    ...options,
  });
}

export function parseChromosome(chromosome) {
  return +String(chromosome).replace("chr", "").replace("X", "23").replace("Y", "24");
}
