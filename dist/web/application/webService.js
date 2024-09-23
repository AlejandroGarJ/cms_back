"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebService = void 0;
class WebService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapWebDomain(web) {
        const webDomain = {
            domain: web.domain,
            id: web._id,
            user: web.user,
        };
        return webDomain;
    }
}
exports.WebService = WebService;
