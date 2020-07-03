interface collectionOperations {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": Array<object>;
  "hydra:totalItems": number;
}

export default class Fetcher {
  static defaultHeader = {
    Accept: "application/ld+json",
    "Content-Type": "application/json"
  };

  constructor(private readonly endpoint: string,) {}

  static fetch(
    url: string,
    method = "GET",
    body: object | null = null,
    headers: Record<string, string> = this.defaultHeader
  ) {
    const options: RequestInit = {
      method,
      headers,
    };
    if (localStorage.getItem("jwt")) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
    }
    if (null !== body) options.body = JSON.stringify(body,);
    return fetch(url, options,).catch(err => {
      throw new Error(err,);
    },);
  }

  get(id: number | null = null,): Promise<collectionOperations> {
    const url = `${this.endpoint}${id ? `/${id}` : ""}`;
    return Fetcher.fetch(url,).then(data => data.json());
  }

  // post(body: object) {
  //   return Fetcher.fetch(this.endpoint, "POST", body);
  // }
  //
  // put(id: number, body: object) {
  //   const url = `${this.endpoint}/${id}`;
  //   return Fetcher.fetch(url, "PUT", body).then(response => response.json());
  // }
  //
  // patch(id: number, body: object) {
  //   const url = `${this.endpoint}/${id}`;
  //   return Fetcher.fetch(url, "PATCH", body);
  // }
  //
  // delete(id: number) {
  //   const url = `${this.endpoint}/${id}`;
  //   return Fetcher.fetch(url, "DELETE");
  // }
}
