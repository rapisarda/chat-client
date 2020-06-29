import { isArray, isObject, isUndefined, forEach } from "lodash";
import { ENTRYPOINT } from "@/config/entrypoint";
import SubmissionError from "@/error/SubmissionError";
import router from "@/router";

const MIME_TYPE = "application/ld+json";

const transformRelationToIri = (payload: any) => {
  forEach(payload, (value: object|string[], property: string) => {
    // @ts-ignore
    if (isObject(value) && !isUndefined(value["@id"])) {
      // @ts-ignore
      payload[property] = value["@id"];
    }
    if (isArray(value)) payload[property] = transformRelationToIri(value);
  });

  return payload;
};

export default function(id: string, options: any = new Headers()) {

  if ("undefined" === typeof options.headers) options.headers = new Headers();
  if (null === options.headers.get("Accept")) options.headers.set("Accept", MIME_TYPE);

  if (
    "undefined" !== options.body &&
    !(options.body instanceof FormData) &&
    null === options.headers.get("Content-Type")
  )
    options.headers.set("Content-Type", MIME_TYPE);

  if (null !== localStorage.getItem("jwt"))
    options.headers.set("Authorization", `Bearer ${localStorage.getItem("jwt")}`);

  const payload = options.body && JSON.parse(options.body);
  // @ts-ignore
  if (isObject(payload) && payload["@id"])
    options.body = JSON.stringify(transformRelationToIri(payload));

  return fetch(new URL(id, ENTRYPOINT).toString(), options).then(response => {
    if (response.ok) return response;
    if (401 === response.status) router.push("/login");

    return response.json().then(json => {
      const error = json["hydra:description"] || response.statusText;
      if (!json.violations) throw Error(error);

      const errors: any = { _error: error };
      json.violations.map(
        (violation: any): any =>
          (errors[violation.propertyPath] = violation.message)
      );

      throw new SubmissionError(errors);
    });
  });
}
