export type WebDomain = { domain: string; id: string; user: string };

export class WebService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapWebDomain(web: any): WebDomain {
    const webDomain: WebDomain = {
      domain: web.domain,
      id: web._id,
      user: web.user,
    };
    return webDomain;
  }
}
